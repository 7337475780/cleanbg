from abc import ABC, abstractmethod
from typing import Any

class AIEngine(ABC):
    @abstractmethod
    async def load_model(self) -> None:
        pass

    @abstractmethod
    async def warmup(self) -> None:
        pass

    @abstractmethod
    async def preprocess(self, image: Any) -> Any:
        pass

    @abstractmethod
    async def predict(self, tensor: Any) -> Any:
        pass

    @abstractmethod
    async def postprocess(self, prediction: Any) -> Any:
        pass

    @abstractmethod
    async def process(self, image: Any) -> Any:
        pass
