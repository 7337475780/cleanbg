from sqlalchemy.orm import Session
from app.db.models.user import User
from app.schemas.user import UserCreate, UserUpdate
from typing import Optional

class UserRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, user_id: str) -> Optional[User]:
        return self.db.query(User).filter(User.id == user_id).first()

    def get_by_email(self, email: str) -> Optional[User]:
        return self.db.query(User).filter(User.email == email).first()

    def create(self, user_in: UserCreate, password_hash: str) -> User:
        user = User(
            email=user_in.email,
            name=user_in.name,
            password_hash=password_hash
        )
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user

    def update(self, user: User, user_in: UserUpdate) -> User:
        if user_in.name is not None:
            user.name = user_in.name
        if user_in.email is not None:
            user.email = user_in.email
            
        self.db.commit()
        self.db.refresh(user)
        return user
