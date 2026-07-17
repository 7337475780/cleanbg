from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.security import verify_password, get_password_hash, create_access_token, create_refresh_token
from app.repositories.user import UserRepository
from app.repositories.settings import SettingsRepository
from app.schemas.auth import LoginRequest, SignupRequest, Token, RefreshRequest
from app.schemas.user import UserCreate
from jose import jwt, JWTError
from app.config.settings import settings
from app.core import security

router = APIRouter()

@router.post("/login", response_model=Token)
async def login(req: LoginRequest, db: Session = Depends(get_db)):
    repo = UserRepository(db)
    user = repo.get_by_email(req.email)
    if not user or not verify_password(req.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    return {
        "access_token": create_access_token(user.id),
        "refresh_token": create_refresh_token(user.id),
        "token_type": "bearer"
    }

@router.post("/signup", response_model=Token)
async def signup(req: SignupRequest, db: Session = Depends(get_db)):
    repo = UserRepository(db)
    if repo.get_by_email(req.email):
        raise HTTPException(
            status_code=400,
            detail="Email already registered",
        )
    user_in = UserCreate(email=req.email, name=req.name, password=req.password)
    user = repo.create(user_in, get_password_hash(req.password))
    
    settings_repo = SettingsRepository(db)
    settings_repo.create_default(str(user.id))
    
    return {
        "access_token": create_access_token(user.id),
        "refresh_token": create_refresh_token(user.id),
        "token_type": "bearer"
    }

@router.post("/refresh", response_model=Token)
async def refresh_token(req: RefreshRequest, db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )
    try:
        payload = jwt.decode(req.refresh_token, settings.SECRET_KEY, algorithms=[security.ALGORITHM])
        if payload.get("type") != "refresh":
            raise credentials_exception
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
        
    return {
        "access_token": create_access_token(user_id),
        "refresh_token": create_refresh_token(user_id),
        "token_type": "bearer"
    }

@router.post("/logout")
async def logout():
    return {"message": "Logged out successfully"}
