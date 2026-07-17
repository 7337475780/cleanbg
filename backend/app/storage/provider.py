from abc import ABC, abstractmethod
from typing import BinaryIO

class StorageProvider(ABC):
    @abstractmethod
    def save(self, file_obj: BinaryIO, destination: str) -> str:
        """Save a file and return its URI/Path."""
        pass

    @abstractmethod
    def download(self, uri: str) -> BinaryIO:
        """Retrieve a file as a stream."""
        pass

    @abstractmethod
    def delete(self, uri: str) -> bool:
        """Delete a file."""
        pass

    @abstractmethod
    def exists(self, uri: str) -> bool:
        """Check if a file exists."""
        pass

    @abstractmethod
    def generate_presigned_url(self, uri: str, expiration: int = 3600) -> str:
        """Generate a presigned URL for downloading a file."""
        pass

    @abstractmethod
    def list(self, prefix: str = "") -> list[str]:
        """List files with the given prefix."""
        pass
