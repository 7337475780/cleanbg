import psutil
import torch
import logging
from typing import Dict, Any

from app.config.settings import settings
from app.ai.factory import AIEngineFactory

logger = logging.getLogger(__name__)

class ModelManager:
    """
    Manages downloading, caching, warming, and health checks for AI models.
    """
    
    @classmethod
    async def initialize(cls) -> None:
        """
        Runs during FastAPI startup to prepare the AI engine.
        """
        logger.info(f"Initializing ModelManager with engine: {settings.AI_ENGINE}")
        
        # Instantiate the engine
        engine = AIEngineFactory.create()
        
        # Warm up the model if enabled
        if getattr(settings, "ENABLE_WARMUP", True):
            logger.info("Warming up the model...")
            await engine.warmup()
            logger.info("Model warmup complete.")
            
    @classmethod
    def get_health(cls) -> Dict[str, Any]:
        """
        Returns health and metrics information regarding the models and system.
        """
        device = "cuda" if torch.cuda.is_available() else "cpu"
        
        metrics = {
            "device": device,
            "engine": settings.AI_ENGINE,
            "cpu_usage_percent": psutil.cpu_percent(),
            "ram_usage_percent": psutil.virtual_memory().percent,
            "ram_used_gb": round(psutil.virtual_memory().used / (1024**3), 2),
        }
        
        if device == "cuda":
            metrics["gpu_memory_allocated_gb"] = round(torch.cuda.memory_allocated() / (1024**3), 2)
            metrics["gpu_memory_reserved_gb"] = round(torch.cuda.memory_reserved() / (1024**3), 2)
            
        return metrics

    @classmethod
    def clear_memory(cls) -> None:
        """
        Attempt to free unused memory on the GPU.
        """
        if torch.cuda.is_available():
            torch.cuda.empty_cache()
