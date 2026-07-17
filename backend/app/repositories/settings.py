from sqlalchemy.orm import Session
from app.db.models.settings import Settings
from app.schemas.settings import SettingsUpdate
from typing import Optional

class SettingsRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_user_id(self, user_id: str) -> Optional[Settings]:
        return self.db.query(Settings).filter(Settings.user_id == user_id).first()

    def create_default(self, user_id: str) -> Settings:
        settings = Settings(user_id=user_id)
        self.db.add(settings)
        self.db.commit()
        self.db.refresh(settings)
        return settings

    def update(self, settings: Settings, settings_in: SettingsUpdate) -> Settings:
        if settings_in.theme is not None:
            settings.theme = settings_in.theme
        if settings_in.download_quality is not None:
            settings.download_quality = settings_in.download_quality
        if settings_in.default_format is not None:
            settings.default_format = settings_in.default_format
        if settings_in.notifications is not None:
            settings.notifications = settings_in.notifications
        if settings_in.privacy is not None:
            settings.privacy = settings_in.privacy
            
        self.db.commit()
        self.db.refresh(settings)
        return settings
