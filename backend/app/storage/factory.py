from app.config.settings import settings
from app.storage.provider import StorageProvider
from app.storage.local import LocalStorageProvider
from loguru import logger

def get_storage_provider() -> StorageProvider:
    provider = settings.STORAGE_PROVIDER.lower()
    if provider == "s3":
        from app.storage.s3 import S3StorageProvider
        return S3StorageProvider()
    elif provider == "r2":
        from app.storage.s3 import S3StorageProvider
        # R2 uses S3 API, but requires an endpoint URL
        # For simplicity, assuming endpoint_url is configured via env if R2 is used, or hardcoded for now
        # You'd typically add a setting for R2_ENDPOINT_URL
        return S3StorageProvider()
    elif provider == "azure":
        from app.storage.azure import AzureStorageProvider
        return AzureStorageProvider()
    elif provider == "gcs":
        from app.storage.gcs import GCSStorageProvider
        return GCSStorageProvider()
    else:
        logger.info("Using LocalStorageProvider")
        return LocalStorageProvider()
