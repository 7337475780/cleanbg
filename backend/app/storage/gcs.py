from google.cloud import storage
from typing import BinaryIO
import io
from app.storage.provider import StorageProvider
from app.config.settings import settings
from loguru import logger

class GCSStorageProvider(StorageProvider):
    def __init__(self):
        if not settings.GCS_BUCKET_NAME:
            raise ValueError("GCS_BUCKET_NAME is not set")
            
        # Defaults to using google application credentials from environment
        self.client = storage.Client(project=settings.GCS_PROJECT_ID)
        self.bucket = self.client.bucket(settings.GCS_BUCKET_NAME)
        
        logger.info(f"Initialized GCSStorageProvider with bucket {settings.GCS_BUCKET_NAME}")

    def save(self, file_obj: BinaryIO, destination: str) -> str:
        file_obj.seek(0)
        blob = self.bucket.blob(destination)
        blob.upload_from_file(file_obj)
        return destination

    def download(self, uri: str) -> BinaryIO:
        blob = self.bucket.blob(uri)
        file_obj = io.BytesIO()
        blob.download_to_file(file_obj)
        file_obj.seek(0)
        return file_obj

    def delete(self, uri: str) -> bool:
        try:
            blob = self.bucket.blob(uri)
            blob.delete()
            return True
        except Exception as e:
            logger.error(f"Failed to delete {uri} from GCS: {e}")
            return False

    def exists(self, uri: str) -> bool:
        try:
            blob = self.bucket.blob(uri)
            return blob.exists()
        except Exception:
            return False

    def generate_presigned_url(self, uri: str, expiration: int = 3600) -> str:
        from datetime import timedelta
        try:
            blob = self.bucket.blob(uri)
            return blob.generate_signed_url(
                version="v4",
                expiration=timedelta(seconds=expiration),
                method="GET"
            )
        except Exception as e:
            logger.error(f"Failed to generate presigned URL for {uri}: {e}")
            return ""

    def list(self, prefix: str = "") -> list[str]:
        try:
            blobs = self.bucket.list_blobs(prefix=prefix)
            return [blob.name for blob in blobs]
        except Exception as e:
            logger.error(f"Failed to list objects with prefix {prefix}: {e}")
            return []
