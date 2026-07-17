import time
import os
import asyncio
import tempfile
from PIL import Image
from app.db.session import SessionLocal
import app.db.base
from app.services.processing import ProcessingService
from app.ai.factory import AIEngineFactory
from app.config.settings import settings
from app.utils.image import generate_thumbnail
from app.core.metrics import metrics_tracker
from app.core.logging import logger
from app.storage.factory import get_storage_provider
from app.services.storage import StorageService

_engine = None

def get_engine():
    global _engine
    if _engine is None:
        start = time.time()
        _engine = AIEngineFactory.create()
        logger.info(f"AI Engine loaded in {time.time() - start:.2f}s")
    return _engine

async def async_process(engine, input_path: str):
    with Image.open(input_path) as img:
        return await engine.process(img)

def process_image_task(job_uuid: str, input_image: str):
    db = SessionLocal()
    processing_service = ProcessingService(db)
    storage_provider = get_storage_provider()
    storage_service = StorageService(storage_provider)
    
    start_time = time.time()
    logger.info(f"Job {job_uuid} | QUEUED -> VALIDATING")
    
    output_filename = f"processed_{job_uuid}.png"
    thumb_filename = f"thumb_{output_filename}"
    
    # Track sub-durations
    prep_time = 0
    inf_time = 0
    post_time = 0
    
    tmp_input_path = None
    tmp_output_path = None
    tmp_thumb_path = None
    
    try:
        # VALIDATING & DOWNLOADING
        logger.info(f"Job {job_uuid} | VALIDATING -> PREPROCESSING")
        processing_service.update_job_progress(job_uuid, "PREPROCESSING", 10.0)
        
        t0 = time.time()
        input_stream = storage_service.download_file(input_image)
        with tempfile.NamedTemporaryFile(delete=False, suffix=".png") as tmp_in:
            tmp_in.write(input_stream.read())
            tmp_input_path = tmp_in.name
            
        engine = get_engine()
        prep_time = time.time() - t0
        
        # INFERENCE
        logger.info(f"Job {job_uuid} | PREPROCESSING -> INFERENCE")
        processing_service.update_job_progress(job_uuid, "INFERENCE", 30.0)
        t0 = time.time()
        
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        processed_img = loop.run_until_complete(async_process(engine, tmp_input_path))
        
        inf_time = time.time() - t0
        
        # POSTPROCESSING & OPTIMIZATION
        logger.info(f"Job {job_uuid} | INFERENCE -> POSTPROCESSING")
        processing_service.update_job_progress(job_uuid, "POSTPROCESSING", 70.0)
        t0 = time.time()
        
        logger.info(f"Job {job_uuid} | POSTPROCESSING -> OPTIMIZATION")
        processing_service.update_job_progress(job_uuid, "OPTIMIZATION", 80.0)
        
        with tempfile.NamedTemporaryFile(delete=False, suffix=".png") as tmp_out:
            processed_img.save(tmp_out.name, format="PNG", optimize=True)
            tmp_output_path = tmp_out.name
            
        with tempfile.NamedTemporaryFile(delete=False, suffix=".png") as tmp_thumb:
            if getattr(settings, "ENABLE_THUMBNAILS", True):
                thumb = generate_thumbnail(processed_img)
                thumb.save(tmp_thumb.name, format="PNG", optimize=True)
            tmp_thumb_path = tmp_thumb.name
            
        post_time = time.time() - t0
        
        # UPLOADING
        logger.info(f"Job {job_uuid} | OPTIMIZATION -> UPLOADING")
        processing_service.update_job_progress(job_uuid, "UPLOADING", 90.0)
        
        with open(tmp_output_path, "rb") as f_out:
            out_uri = storage_service.save_file(f_out, f"{settings.PROCESSED_DIR}/{output_filename}")
            upload_size = os.path.getsize(tmp_output_path)
            
        with open(tmp_thumb_path, "rb") as f_thumb:
            thumb_uri = storage_service.save_file(f_thumb, f"{settings.PROCESSED_DIR}/{thumb_filename}")
        
        # COMPLETED
        total_time = time.time() - start_time
        logger.info(f"Job {job_uuid} | UPLOADING -> COMPLETED | Duration: {total_time:.2f}s")
        processing_service.finalize_job(
            job_uuid=job_uuid, 
            output_path=out_uri, 
            thumbnail_path=thumb_uri,
            processing_time=total_time
        )
        
        metrics_tracker.record_job(True, inference_time=inf_time, processing_time=total_time, upload_size=upload_size)
        
    except Exception as e:
        logger.error(f"Job {job_uuid} | FAILED | Error: {e}")
        processing_service.mark_job_failed(job_uuid, str(e))
        metrics_tracker.record_job(False)
        raise e
    finally:
        db.close()
        # Ensure temporary files are deleted
        for p in [tmp_input_path, tmp_output_path, tmp_thumb_path]:
            if p and os.path.exists(p):
                try:
                    os.unlink(p)
                except Exception as e:
                    logger.error(f"Failed to delete temp file {p}: {e}")
                    
        # Memory Optimization
        import gc
        import torch
        if 'processed_img' in locals():
            del processed_img
        if 'engine' in locals():
            del engine
        gc.collect()
        if torch.cuda.is_available():
            torch.cuda.empty_cache()
