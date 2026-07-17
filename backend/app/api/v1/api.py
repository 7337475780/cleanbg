from fastapi import APIRouter
from app.api.v1 import jobs, auth, users, history, settings

router = APIRouter()

router.include_router(auth.router, prefix="/auth", tags=["auth"])
router.include_router(users.router, prefix="/users", tags=["users"])
router.include_router(jobs.router, tags=["jobs"])
router.include_router(history.router, prefix="/history", tags=["history"])
router.include_router(settings.router, prefix="/settings", tags=["settings"])
