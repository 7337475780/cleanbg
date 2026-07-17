from azure.storage.blob import BlobServiceClient
from typing import BinaryIO
import io
from app.storage.provider import StorageProvider
from app.config.settings import settings
from loguru import logger

class AzureStorageProvider(StorageProvider):
    def __init__(self):
        if not settings.AZURE_STORAGE_CONNECTION_STRING or not settings.AZURE_CONTAINER_NAME:
            raise ValueError("Azure storage configuration is missing")
            
        self.blob_service_client = BlobServiceClient.from_connection_string(settings.AZURE_STORAGE_CONNECTION_STRING)
        self.container_name = settings.AZURE_CONTAINER_NAME
        self.container_client = self.blob_service_client.get_container_client(self.container_name)
        
        logger.info(f"Initialized AzureStorageProvider with container {self.container_name}")

    def save(self, file_obj: BinaryIO, destination: str) -> str:
        file_obj.seek(0)
        blob_client = self.container_client.get_blob_client(destination)
        blob_client.upload_blob(file_obj, overwrite=True)
        return destination

    def download(self, uri: str) -> BinaryIO:
        blob_client = self.container_client.get_blob_client(uri)
        download_stream = blob_client.download_blob()
        file_obj = io.BytesIO(download_stream.readall())
        return file_obj

    def delete(self, uri: str) -> bool:
        try:
            blob_client = self.container_client.get_blob_client(uri)
            blob_client.delete_blob()
            return True
        except Exception as e:
            logger.error(f"Failed to delete {uri} from Azure: {e}")
            return False

    def exists(self, uri: str) -> bool:
        try:
            blob_client = self.container_client.get_blob_client(uri)
            return blob_client.exists()
        except Exception:
            return False

    def generate_presigned_url(self, uri: str, expiration: int = 3600) -> str:
        from azure.storage.blob import generate_blob_sas, BlobSasPermissions
        from datetime import datetime, timedelta
        
        try:
            sas_token = generate_blob_sas(
                account_name=self.blob_service_client.account_name,
                container_name=self.container_name,
                blob_name=uri,
                account_key=self.blob_service_client.credential.account_key,
                permission=BlobSasPermissions(read=True),
                expiry=datetime.utcnow() + timedelta(seconds=expiration)
            )
            blob_client = self.container_client.get_blob_client(uri)
            return f"{blob_client.url}?{sas_token}"
        except Exception as e:
            logger.error(f"Failed to generate presigned URL for {uri}: {e}")
            return ""

    def list(self, prefix: str = "") -> list[str]:
        try:
            return [blob.name for blob in self.container_client.list_blobs(name_starts_with=prefix)]
        except Exception as e:
            logger.error(f"Failed to list objects with prefix {prefix}: {e}")
            return []
