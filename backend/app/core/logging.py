import sys
from loguru import logger
from app.config.settings import settings
from app.middleware.request_id import request_id_ctx_var

def setup_logging():
    # Remove default logger
    logger.remove()
    
    # Custom format function that injects request_id
    def add_context(record):
        req_id = request_id_ctx_var.get()
        record["extra"]["request_id"] = req_id
        return True

    logger.configure(patcher=add_context)

    log_level = settings.LOG_LEVEL

    # Console logging
    if settings.LOG_JSON:
        logger.add(
            sys.stdout, 
            format="{message}", 
            serialize=True, 
            level=log_level,
            enqueue=True
        )
    else:
        logger.add(
            sys.stdout,
            format="<green>{time:YYYY-MM-DD HH:mm:ss}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> | <yellow>[{extra[request_id]}]</yellow> - <level>{message}</level>",
            level=log_level,
            enqueue=True
        )

    # File logging (rotating, compressed)
    if settings.ENVIRONMENT == "production":
        logger.add(
            "logs/app.json" if settings.LOG_JSON else "logs/app.log",
            rotation="100 MB",
            retention="14 days",
            compression="zip",
            serialize=settings.LOG_JSON,
            level=log_level,
            enqueue=True
        )
