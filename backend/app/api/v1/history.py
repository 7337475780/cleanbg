from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db.models.user import User
from app.schemas.history import HistoryResponse
from app.repositories.history import HistoryRepository
from app.dependencies.auth import get_current_user

router = APIRouter()

@router.get("/", response_model=HistoryResponse)
async def get_history(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    repo = HistoryRepository(db)
    skip = (page - 1) * page_size
    items = repo.get_user_history(str(current_user.id), skip=skip, limit=page_size)
    total = repo.count_user_history(str(current_user.id))
    
    return {
        "items": items,
        "total": total,
        "page": page,
        "page_size": page_size
    }

@router.delete("/{history_id}")
async def delete_history(
    history_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    repo = HistoryRepository(db)
    item = repo.get_by_id(history_id)
    if not item or str(item.user_id) != str(current_user.id):
        raise HTTPException(status_code=404, detail="History not found")
        
    repo.delete(history_id)
    return {"message": "History deleted"}

@router.post("/{history_id}/duplicate")
async def duplicate_history(
    history_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    repo = HistoryRepository(db)
    item = repo.get_by_id(history_id)
    if not item or str(item.user_id) != str(current_user.id):
        raise HTTPException(status_code=404, detail="History not found")
        
    # Simplified duplicate for now
    return {"message": "Duplicated", "new_id": str(item.id)}
