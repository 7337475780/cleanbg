import boto3
from typing import BinaryIO
import io
from app.storage.provider import StorageProvider
from app.config.settings import settings
from loguru import logger

class S3StorageProvider(StorageProvider):
    def __init__(self, endpoint_url: str = None):
        if not settings.AWS_BUCKET_NAME:
            raise ValueError("AWS_BUCKET_NAME is not set")
            
        self.bucket = settings.AWS_BUCKET_NAME
        
        # We can use endpoint_url for Cloudflare R2 or other S3-compatible APIs
        self.s3 = boto3.client(
            's3',
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_REGION,
            endpoint_url=endpoint_url
        )
        logger.info(f"Initialized S3StorageProvider with bucket {self.bucket}")

    def save(self, file_obj: BinaryIO, destination: str) -> str:
        file_obj.seek(0)
        self.s3.upload_fileobj(file_obj, self.bucket, destination)
        return destination

    def download(self, uri: str) -> BinaryIO:
        file_obj = io.BytesIO()
        self.s3.download_fileobj(self.bucket, uri, file_obj)
        file_obj.seek(0)
        return file_obj

    def delete(self, uri: str) -> bool:
        try:
            self.s3.delete_object(Bucket=self.bucket, Key=uri)
            return True
        except Exception as e:
            logger.error(f"Failed to delete {uri} from S3: {e}")
            return False

    def exists(self, uri: str) -> bool:
        try:
            self.s3.head_object(Bucket=self.bucket, Key=uri)
            return True
        except Exception:
            return False

    def generate_presigned_url(self, uri: str, expiration: int = 3600) -> str:
        try:
            return self.s3.generate_presigned_url(
                'get_object',
                Params={'Bucket': self.bucket, 'Key': uri},
                ExpiresIn=expiration
            )
        except Exception as e:
            logger.error(f"Failed to generate presigned URL for {uri}: {e}")
            return ""

    def list(self, prefix: str = "") -> list[str]:
        try:
            response = self.s3.list_objects_v2(Bucket=self.bucket, Prefix=prefix)
            if 'Contents' not in response:
                return []
            return [obj['Key'] for obj in response['Contents']]
        except Exception as e:
            logger.error(f"Failed to list objects with prefix {prefix}: {e}")
            return []
