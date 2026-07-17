from typing import Optional
from app.ai.base import AIEngine
from app.config.settings import settings

class AIEngineFactory:
    _instance: Optional[AIEngine] = None

    @classmethod
    def create(cls, engine_name: Optional[str] = None) -> AIEngine:
        if cls._instance is not None:
            return cls._instance

        engine = engine_name or settings.AI_ENGINE
        
        if engine.lower() == "rmbg":
            from app.ai.rmbg import RMBGEngine
            cls._instance = RMBGEngine()
        elif engine.lower() == "birefnet":
            from app.ai.birefnet import BiRefNetEngine
            cls._instance = BiRefNetEngine()
        else:
            raise ValueError(f"Unsupported AI_ENGINE: {engine}")
            
        return cls._instance

    @classmethod
    def reset(cls) -> None:
        cls._instance = None
