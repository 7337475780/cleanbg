from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db.models.user import User
from app.schemas.settings import Settings as SettingsSchema, SettingsUpdate
from app.repositories.settings import SettingsRepository
from app.dependencies.auth import get_current_user

router = APIRouter()

@router.get("/", response_model=SettingsSchema)
async def get_settings(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    repo = SettingsRepository(db)
    settings = repo.get_by_user_id(str(current_user.id))
    if not settings:
        settings = repo.create_default(str(current_user.id))
    return settings

@router.patch("/", response_model=SettingsSchema)
async def update_settings(
    settings_in: SettingsUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    repo = SettingsRepository(db)
    settings = repo.get_by_user_id(str(current_user.id))
    if not settings:
        settings = repo.create_default(str(current_user.id))
        
    updated = repo.update(settings, settings_in)
    return updated
