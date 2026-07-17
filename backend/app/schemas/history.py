from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from uuid import UUID

class HistoryItemBase(BaseModel):
    original_image_url: str
    processed_image_url: Optional[str] = None
    status: str
    job_id: str

class HistoryItemCreate(HistoryItemBase):
    pass

class HistoryItem(HistoryItemBase):
    id: UUID
    created_at: datetime
    
    class Config:
        from_attributes = True

class HistoryResponse(BaseModel):
    items: List[HistoryItem]
    total: int
    page: int
    page_size: int
