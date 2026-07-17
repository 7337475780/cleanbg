import time
from pathlib import Path
from app.config.settings import settings
from loguru import logger

def cleanup_old_files(max_age_hours: int = 24):
    """
    Cleans up files in uploads and temp directories older than max_age_hours.
    """
    directories_to_clean = [
        Path(settings.UPLOAD_DIR),
        Path(settings.PROCESSED_DIR)
    ]
    
    current_time = time.time()
    max_age_seconds = max_age_hours * 3600
    
    deleted_count = 0
    for directory in directories_to_clean:
        if not directory.exists():
            continue
            
        for filepath in directory.glob("*"):
            if filepath.is_file():
                # Check modification time
                mtime = filepath.stat().st_mtime
                if current_time - mtime > max_age_seconds:
                    try:
                        filepath.unlink()
                        deleted_count += 1
                        logger.debug(f"Cleaned up old file: {filepath.name}")
                    except Exception as e:
                        logger.warning(f"Failed to delete {filepath.name}: {e}")
                        
    if deleted_count > 0:
        logger.info(f"Cleanup complete. Removed {deleted_count} old files.")

if __name__ == "__main__":
    cleanup_old_files()
