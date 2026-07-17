from abc import ABC, abstractmethod
from typing import Any
from pathlib import Path

class AIEngine(ABC):
    @abstractmethod
    def load_model(self) -> None:
        """Load the model weights into memory."""
        pass

    @abstractmethod
    def predict(self, image_path: Path) -> Any:
        """Run inference on the image."""
        pass

    @abstractmethod
    def postprocess(self, prediction: Any, original_path: Path, output_path: Path) -> None:
        """Process the prediction and save the final image."""
        pass

    @abstractmethod
    def warmup(self) -> None:
        """Execute a dummy pass to initialize the GPU pipeline."""
        pass

    @abstractmethod
    def shutdown(self) -> None:
        """Release resources."""
        pass

    @abstractmethod
    def health(self) -> bool:
        """Check if the engine is ready and healthy."""
        pass
