import asyncio
from loguru import logger
from app.config.settings import settings
from app.storage.factory import get_storage_provider

async def cleanup_task():
    """Background task to periodically scan and delete orphaned temp files."""
    logger.info("Cleanup scheduler started.")
    try:
        # Get the storage provider, but we only really care if it's local
        # If it's local, we clean up the base directories
        provider = get_storage_provider()
        
        # Check if it has a cleanup_expired method (we will add this to LocalStorageProvider)
        if hasattr(provider, 'cleanup_expired'):
            while True:
                try:
                    deleted_count = provider.cleanup_expired(ttl_seconds=settings.TEMP_FILE_TTL)
                    if deleted_count > 0:
                        logger.info(f"Cleanup scheduler removed {deleted_count} expired files.")
                except Exception as e:
                    logger.error(f"Error during scheduled cleanup: {e}")
                
                # Run every minute
                await asyncio.sleep(60)
        else:
            logger.info("Active storage provider does not support local background cleanup.")
    except asyncio.CancelledError:
        logger.info("Cleanup scheduler stopped.")
