from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger

from app.config.settings import settings

import sentry_sdk
from fastapi.middleware.trustedhost import TrustedHostMiddleware

from app.core.logging import setup_logging
from contextlib import asynccontextmanager
from app.middleware.request_id import RequestIDMiddleware
from app.api.v1.api import router as api_router

# Setup centralized logging
setup_logging()

# Register SQLAlchemy models
import app.db.base

if settings.SENTRY_DSN:
    sentry_sdk.init(
        dsn=settings.SENTRY_DSN,
        traces_sample_rate=1.0,
        environment=settings.ENVIRONMENT,
    )


@asynccontextmanager
async def lifespan(app: FastAPI):
    from app.core.model_manager import ModelManager
    from app.storage.factory import get_storage_provider
    
    # Initialize storage directories
    logger.info("Initializing storage provider...")
    get_storage_provider()
    
    # Initialize and warm up AI model
    logger.info("Initializing ModelManager...")
    await ModelManager.initialize()
    
    # Start cleanup scheduler
    import asyncio
    from app.core.cleanup import cleanup_task
    cleanup_bg_task = asyncio.create_task(cleanup_task())
    
    yield
    
    logger.info("Shutting down...")
    cleanup_bg_task.cancel()

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan
)

# Request ID Middleware
if settings.ENABLE_REQUEST_LOGGING:
    app.add_middleware(RequestIDMiddleware)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if settings.ENVIRONMENT == "development" else ["https://yourproductiondomain.com"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Trusted Hosts
app.add_middleware(
    TrustedHostMiddleware, allowed_hosts=["*"] if settings.ENVIRONMENT == "development" else ["yourproductiondomain.com", "*.yourproductiondomain.com", "localhost", "127.0.0.1"]
)

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/health", tags=["System"])
async def health_check():
    from app.core.model_manager import ModelManager
    from app.db.session import SessionLocal
    from sqlalchemy import text
    import redis
    
    health_status = {
        "status": "ok", 
        "environment": settings.ENVIRONMENT,
        "ai": ModelManager.get_health(),
        "postgres": "unknown",
        "redis": "unknown",
        "storage": "unknown",
        "gpu": "unknown"
    }
    
    # Check GPU
    import torch
    if torch.cuda.is_available():
        health_status["gpu"] = {
            "available": True,
            "device_count": torch.cuda.device_count(),
            "device_name": torch.cuda.get_device_name(0) if torch.cuda.device_count() > 0 else "unknown",
            "allocated_gb": round(torch.cuda.memory_allocated() / (1024**3), 2)
        }
    else:
        health_status["gpu"] = {"available": False}
        
    # Check Storage
    try:
        from app.storage.factory import get_storage_provider
        provider = get_storage_provider()
        health_status["storage"] = {
            "status": "ok",
            "provider": type(provider).__name__
        }
    except Exception as e:
        health_status["storage"] = {"status": "error", "message": str(e)}
        health_status["status"] = "degraded"
        logger.error(f"Storage health check failed: {e}")

    # Check Postgres
    try:
        db = SessionLocal()
        db.execute(text("SELECT 1"))
        health_status["postgres"] = "ok"
    except Exception as e:
        health_status["postgres"] = "error"
        health_status["status"] = "degraded"
        logger.error(f"Postgres health check failed: {e}")
    finally:
        db.close()
        
    # Check Redis
    try:
        r = redis.from_url(settings.REDIS_URL)
        r.ping()
        health_status["redis"] = "ok"
    except Exception as e:
        health_status["redis"] = "error"
        health_status["status"] = "degraded"
        logger.error(f"Redis health check failed: {e}")
        
    return health_status

@app.get("/ready", tags=["System"])
async def readiness_check():
    health = await health_check()
    if health["status"] == "degraded":
        from fastapi import Response
        return Response(status_code=503, content="Service Unavailable")
    return {"status": "ready"}

@app.get("/live", tags=["System"])
async def liveness_check():
    return {"status": "alive"}

@app.get("/metrics", tags=["System"])
async def get_metrics():
    from app.core.metrics import metrics_tracker
    from fastapi import Response
    if settings.PROMETHEUS_ENABLED:
        data, content_type = metrics_tracker.get_metrics_prometheus()
        return Response(content=data, media_type=content_type)
    return metrics_tracker.get_metrics()
