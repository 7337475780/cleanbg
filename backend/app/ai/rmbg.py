import asyncio
import threading
from typing import Any
import torch
from transformers import AutoModelForImageSegmentation

from app.ai.base import AIEngine

class RMBGEngine(AIEngine):
    _instance = None
    _lock = threading.Lock()
    
    def __new__(cls, *args, **kwargs):
        with cls._lock:
            if cls._instance is None:
                cls._instance = super(RMBGEngine, cls).__new__(cls)
                cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if self._initialized:
            return
        
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.use_fp16 = self.device.type == "cuda"
        self.model = None
        self._load_lock = asyncio.Lock()
        self._initialized = True

    async def load_model(self) -> None:
        if self.model is not None:
            return
            
        async with self._load_lock:
            if self.model is not None:
                return
            
            # Use asyncio.to_thread for blocking load
            def _load():
                dtype = torch.float16 if self.use_fp16 else torch.float32
                model = AutoModelForImageSegmentation.from_pretrained(
                    'briaai/RMBG-2.0', 
                    trust_remote_code=True
                )
                model.to(self.device, dtype=dtype)
                model.eval()
                return model
                
            self.model = await asyncio.to_thread(_load)

    async def warmup(self) -> None:
        await self.load_model()
        
        def _warmup():
            # Dummy tensor to warmup CUDA
            dummy_input = torch.randn(1, 3, 1024, 1024, device=self.device)
            if self.use_fp16:
                dummy_input = dummy_input.half()
            with torch.inference_mode():
                self.model(dummy_input)
                
        await asyncio.to_thread(_warmup)

    async def preprocess(self, image: Any) -> Any:
        # Preprocessing handled by utils/preprocessing.py, delegating if necessary
        # We will keep this here just in case, but rely on preprocessing utils later.
        from app.utils.preprocessing import preprocess_for_rmbg
        return await asyncio.to_thread(preprocess_for_rmbg, image, self.device, self.use_fp16)

    async def predict(self, tensor: Any) -> Any:
        def _predict():
            with torch.inference_mode():
                return self.model(tensor)
        return await asyncio.to_thread(_predict)

    async def postprocess(self, prediction: Any) -> Any:
        from app.utils.postprocessing import postprocess_rmbg
        return await asyncio.to_thread(postprocess_rmbg, prediction)

    async def process(self, image: Any) -> Any:
        await self.load_model()
        tensor, orig_size = await self.preprocess(image)
        prediction = await self.predict(tensor)
        mask = await self.postprocess((prediction, orig_size))
        
        from app.utils.image import apply_transparent_mask
        return await asyncio.to_thread(apply_transparent_mask, image, mask)
