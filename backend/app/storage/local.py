import os
import shutil
import uuid
import hashlib
import time
from typing import BinaryIO
from pathlib import Path
from app.storage.provider import StorageProvider
from app.config.settings import settings
import tempfile
from loguru import logger

class LocalStorageProvider(StorageProvider):
    def __init__(self, base_dir: str = "temp"):
        self.base_dir = Path(base_dir)
        self.uploads_dir = self.base_dir / "uploads"
        self.processed_dir = self.base_dir / "processed"
        self.temp_dir = self.base_dir / "temp"
        
        for directory in [self.uploads_dir, self.processed_dir, self.temp_dir]:
            directory.mkdir(parents=True, exist_ok=True)

    def _generate_uuid_filename(self, original_filename: str) -> str:
        ext = Path(original_filename).suffix
        return f"{uuid.uuid4().hex}{ext}"

    def save(self, file_obj: BinaryIO, destination: str, verify_checksum: bool = False) -> str:
        full_path = self.base_dir / destination
        if full_path.exists():
            # Allow overwriting in temporary storage context or raise error
            pass
            
        full_path.parent.mkdir(parents=True, exist_ok=True)
        
        # Atomic write: write to temp file then move
        fd, temp_path = tempfile.mkstemp(dir=self.temp_dir)
        checksum = hashlib.md5()
        
        with os.fdopen(fd, 'wb') as temp_file:
            while chunk := file_obj.read(8192):
                if verify_checksum:
                    checksum.update(chunk)
                temp_file.write(chunk)
                
        shutil.move(temp_path, full_path)
        return str(destination)

    def download(self, uri: str) -> BinaryIO:
        full_path = self.base_dir / uri
        if not full_path.exists():
            raise FileNotFoundError(f"File not found: {uri}")
        return open(full_path, "rb")

    def delete(self, uri: str) -> bool:
        full_path = self.base_dir / uri
        if full_path.exists():
            full_path.unlink()
            return True
        return False

    def exists(self, uri: str) -> bool:
        return (self.base_dir / uri).exists()
        
    def generate_presigned_url(self, uri: str, expiration: int = 3600) -> str:
        return f"{settings.API_V1_STR}/download/{uri}"

    def list(self, prefix: str = "") -> list[str]:
        results = []
        target_dir = self.base_dir
        if prefix:
            target_dir = self.base_dir / prefix
            
        if not target_dir.exists() or not target_dir.is_dir():
            return []
            
        for path in target_dir.rglob("*"):
            if path.is_file():
                results.append(str(path.relative_to(self.base_dir)))
        return results
        
    def cleanup_expired(self, ttl_seconds: int = 300) -> int:
        """Scan and remove expired temp files."""
        now = time.time()
        count = 0
        for directory in [self.uploads_dir, self.processed_dir, self.temp_dir, self.base_dir]:
            if not directory.exists():
                continue
            for item in directory.iterdir():
                if item.is_file():
                    age = now - item.stat().st_mtime
                    if age > ttl_seconds:
                        try:
                            item.unlink()
                            count += 1
                        except Exception as e:
                            logger.error(f"Failed to delete expired file {item}: {e}")
        return count
