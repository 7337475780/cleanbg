from pathlib import Path
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, BackgroundTasks
from fastapi.responses import FileResponse, Response, StreamingResponse
from sqlalchemy.orm import Session
from app.db.session import get_db, SessionLocal
from app.repositories.job import JobRepository
from app.services.processing import ProcessingService
from app.services.storage import StorageService
from app.storage.factory import get_storage_provider
from app.config.settings import settings
import uuid
import magic
from PIL import Image

router = APIRouter()
storage_provider = get_storage_provider()
storage_service = StorageService(storage_provider)

ALLOWED_MIMES = {"image/jpeg", "image/png", "image/webp"}

def delete_job_files(job_id: str, input_image: str, output_image: str):
    if settings.DELETE_AFTER_DOWNLOAD:
        try:
            if input_image:
                storage_provider.delete(input_image)
            if output_image:
                storage_provider.delete(output_image)
            
            if output_image:
                thumb_name = Path(output_image).name.replace("processed_", "thumb_processed_")
                thumb_path = f"processed/{thumb_name}"
                storage_provider.delete(thumb_path)
            
            # Also nullify them in the DB to strictly adhere to Rule 3 (no permanent local paths)
            db = SessionLocal()
            try:
                repo = JobRepository(db)
                job = repo.get_by_uuid(job_id)
                if job:
                    job.input_image = None
                    job.output_image = None
                    db.commit()
            finally:
                db.close()
        except Exception as e:
            from loguru import logger
            logger.error(f"Failed to delete files for job {job_id} after download: {e}")

@router.post("/upload")
async def upload_image(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Validation: Mime and Size
    file_bytes = await file.read()
    if len(file_bytes) > settings.MAX_UPLOAD_SIZE:
        raise HTTPException(status_code=413, detail="File too large")
        
    # Validation: Magic bytes
    mime = magic.from_buffer(file_bytes, mime=True)
    if mime not in ALLOWED_MIMES:
        raise HTTPException(status_code=400, detail="Invalid file type")
        
    # Validation: Image dimension and corruption
    try:
        from io import BytesIO
        with Image.open(BytesIO(file_bytes)) as img:
            img.verify()
            if img.width > settings.MAX_IMAGE_DIMENSION or img.height > settings.MAX_IMAGE_DIMENSION:
                raise HTTPException(status_code=400, detail="Image dimensions exceed maximum allowed")
            
            # Animated image rejection
            if getattr(img, "is_animated", False):
                raise HTTPException(status_code=400, detail="Animated images not supported")
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=400, detail="Corrupted image file")

    # Reset file cursor for saving
    await file.seek(0)
    ext = file.filename.split(".")[-1].lower()
    if ext not in ["jpg", "jpeg", "png", "webp"]:
        ext = "png"
    
    # Virus-safe filename
    temp_filename = f"{uuid.uuid4().hex}.{ext}"
    saved_uri = storage_service.save_file(file.file, f"uploads/{temp_filename}")
    
    processing_service = ProcessingService(db)
    job = processing_service.create_and_enqueue_job(user_id=None, input_image_path=saved_uri)
    
    return {"job_id": job.uuid, "status": job.status, "progress": job.progress}

@router.get("/jobs/{job_id}")
async def get_job_status(job_id: str, db: Session = Depends(get_db)):
    repo = JobRepository(db)
    job = repo.get_by_uuid(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
        
    return {
        "id": job.uuid,
        "status": job.status,
        "progress": job.progress,
        "output_image": job.output_image
    }

@router.get("/download/{job_id}")
async def download_image(job_id: str, background_tasks: BackgroundTasks, format: str = "png", db: Session = Depends(get_db)):
    repo = JobRepository(db)
    job = repo.get_by_uuid(job_id)
    if not job or job.status != "COMPLETED":
        raise HTTPException(status_code=404, detail="Job not ready")
        
    if not job.output_image:
        raise HTTPException(status_code=410, detail="Image has been permanently deleted from temporary storage")
        
    if not storage_provider.exists(job.output_image):
        raise HTTPException(status_code=410, detail="File missing or expired")
        
    # Schedule deletion after response
    background_tasks.add_task(delete_job_files, job_id, job.input_image, job.output_image)
        
    def iter_file():
        with storage_provider.download(job.output_image) as f:
            while chunk := f.read(8192):
                yield chunk
                
    if format.lower() == "png":
        return StreamingResponse(
            iter_file(),
            media_type="image/png",
            headers={"Content-Disposition": f"attachment; filename={job_id}.png"}
        )
        
    # Convert format on the fly if needed
    file_path = Path(storage_provider.base_dir) / job.output_image
    from app.utils.image import optimize_image
    with Image.open(file_path) as img:
        img_bytes = optimize_image(img, format=format)
        
    media_type = f"image/{format.lower()}"
    if format.lower() == "jpg":
        media_type = "image/jpeg"
    return Response(
        content=img_bytes, 
        media_type=media_type,
        headers={"Content-Disposition": f"attachment; filename={job_id}.{format.lower()}"}
    )

@router.get("/preview/{job_id}")
async def get_preview(job_id: str, format: str = "webp", db: Session = Depends(get_db)):
    repo = JobRepository(db)
    job = repo.get_by_uuid(job_id)
    if not job or job.status != "COMPLETED":
        raise HTTPException(status_code=404, detail="Job not ready")
        
    if not job.output_image:
        raise HTTPException(status_code=410, detail="Image has been permanently deleted from temporary storage")
        
    if not storage_provider.exists(job.output_image):
        raise HTTPException(status_code=410, detail="File missing or expired")
        
    def iter_file():
        with storage_provider.download(job.output_image) as f:
            while chunk := f.read(8192):
                yield chunk
                
    if format.lower() == "png":
        return StreamingResponse(
            iter_file(),
            media_type="image/png"
        )
        
    # Convert format on the fly if needed
    file_path = Path(storage_provider.base_dir) / job.output_image
    from app.utils.image import optimize_image
    with Image.open(file_path) as img:
        img_bytes = optimize_image(img, format=format)
        
    media_type = f"image/{format.lower()}"
    if format.lower() == "jpg":
        media_type = "image/jpeg"
    return Response(
        content=img_bytes, 
        media_type=media_type
    )

@router.get("/thumbnail/{job_id}")
async def get_thumbnail(job_id: str, db: Session = Depends(get_db)):
    repo = JobRepository(db)
    job = repo.get_by_uuid(job_id)
    if not job or job.status != "COMPLETED":
        raise HTTPException(status_code=404, detail="Job not ready")
        
    # Assuming output_image is like processed/processed_UUID.png
    if not job.output_image:
        raise HTTPException(status_code=410, detail="Thumbnail deleted")
        
    filename = Path(job.output_image).name
    thumb_path = Path(storage_provider.base_dir) / settings.PROCESSED_DIR / f"thumb_{filename}"
    
    if not thumb_path.exists():
        raise HTTPException(status_code=404, detail="Thumbnail missing")
        
    return FileResponse(thumb_path, media_type="image/png")

@router.post("/jobs/{job_id}/retry")
async def retry_job(job_id: str, db: Session = Depends(get_db)):
    repo = JobRepository(db)
    job = repo.get_by_uuid(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    if job.status not in ["FAILED", "CANCELLED"]:
        raise HTTPException(status_code=400, detail="Only failed or cancelled jobs can be retried")
        
    processing_service = ProcessingService(db)
    new_job = processing_service.create_and_enqueue_job(user_id=job.user_id, input_image_path=job.input_image, priority="high")
    
    return {"message": "Job retried", "new_job_id": new_job.uuid}

@router.post("/jobs/{job_id}/cancel")
async def cancel_job(job_id: str, db: Session = Depends(get_db)):
    repo = JobRepository(db)
    job = repo.get_by_uuid(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    if job.status in ["COMPLETED", "FAILED"]:
        raise HTTPException(status_code=400, detail="Cannot cancel finished job")
        
    job = repo.update_progress(job_id, "CANCELLED", job.progress)
    return {"message": "Job cancelled"}
