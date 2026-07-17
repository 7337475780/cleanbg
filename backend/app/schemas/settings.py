from pydantic import BaseModel

class SettingsBase(BaseModel):
    theme: str = "system"
    download_quality: str = "high"
    default_format: str = "png"
    notifications: bool = True
    privacy: bool = True

class SettingsUpdate(BaseModel):
    theme: str | None = None
    download_quality: str | None = None
    default_format: str | None = None
    notifications: bool | None = None
    privacy: bool | None = None

class Settings(SettingsBase):
    id: str

    class Config:
        from_attributes = True
