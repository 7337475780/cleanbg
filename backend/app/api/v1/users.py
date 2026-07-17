from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db.models.user import User
from app.schemas.user import User as UserSchema, UserUpdate, DashboardStats
from app.repositories.user import UserRepository
from app.repositories.history import HistoryRepository
from app.dependencies.auth import get_current_user

router = APIRouter()

@router.get("/me", response_model=UserSchema)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.patch("/me/profile", response_model=UserSchema)
async def update_profile(
    user_in: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    repo = UserRepository(db)
    updated = repo.update(current_user, user_in)
    return updated

@router.get("/me/dashboard", response_model=DashboardStats)
async def get_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    history_repo = HistoryRepository(db)
    total_processed = history_repo.count_user_history(str(current_user.id))
    recent_jobs = history_repo.get_user_history(str(current_user.id), limit=5)
    
    return {
        "images_processed": total_processed,
        "credits": current_user.credits,
        "storage_used": 0, # Placeholder
        "storage_limit": 5368709120, # 5GB
        "downloads": total_processed, # Simplified
        "recent_jobs": [
            {
                "id": str(job.id),
                "original_image_url": job.original_image_url,
                "processed_image_url": job.processed_image_url,
                "status": job.status,
                "job_id": job.job_id
            } for job in recent_jobs
        ]
    }
