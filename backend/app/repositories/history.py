from sqlalchemy.orm import Session
from app.db.models.history import History
from typing import List, Optional

class HistoryRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_user_history(self, user_id: str, skip: int = 0, limit: int = 20) -> List[History]:
        return self.db.query(History).filter(History.user_id == user_id).order_by(History.created_at.desc()).offset(skip).limit(limit).all()

    def count_user_history(self, user_id: str) -> int:
        return self.db.query(History).filter(History.user_id == user_id).count()

    def get_by_id(self, history_id: str) -> Optional[History]:
        return self.db.query(History).filter(History.id == history_id).first()

    def delete(self, history_id: str) -> bool:
        history = self.get_by_id(history_id)
        if history:
            self.db.delete(history)
            self.db.commit()
            return True
        return False
