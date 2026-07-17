from app.storage.provider import StorageProvider
from typing import BinaryIO

class StorageService:
    def __init__(self, provider: StorageProvider):
        self.provider = provider

    def save_file(self, file_obj: BinaryIO, destination: str) -> str:
        return self.provider.save(file_obj, destination)

    def download_file(self, uri: str) -> BinaryIO:
        return self.provider.download(uri)

    def file_exists(self, uri: str) -> bool:
        return self.provider.exists(uri)

    def delete_file(self, uri: str) -> bool:
        return self.provider.delete(uri)
