from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, Any, List
from datetime import datetime
from uuid import UUID

class UsageBase(BaseModel):
    processedImages: int = 0
    remainingCredits: int = 0
    storageUsed: int = 0
    storageLimit: int = 0

class UserBase(BaseModel):
    email: EmailStr
    name: str

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None

class UserInDBBase(UserBase):
    id: UUID
    plan: str
    credits: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class User(UserInDBBase):
    pass

class DashboardStats(BaseModel):
    images_processed: int
    credits: int
    storage_used: int
    storage_limit: int
    downloads: int
    recent_jobs: List[Dict[str, Any]]
