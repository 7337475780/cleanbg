import asyncio
import threading
from typing import Any
import torch
from transformers import AutoModelForImageSegmentation

from app.ai.base import AIEngine

class BiRefNetEngine(AIEngine):
    _instance = None
    _lock = threading.Lock()
    
    def __new__(cls, *args, **kwargs):
        with cls._lock:
            if cls._instance is None:
                cls._instance = super(BiRefNetEngine, cls).__new__(cls)
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
            
            def _load():
                dtype = torch.float16 if self.use_fp16 else torch.float32
                model = AutoModelForImageSegmentation.from_pretrained(
                    'ZhengPeng7/BiRefNet', 
                    trust_remote_code=True
                )
                model.to(self.device, dtype=dtype)
                model.eval()
                return model
                
            self.model = await asyncio.to_thread(_load)

    async def warmup(self) -> None:
        await self.load_model()
        
        def _warmup():
            dummy_input = torch.randn(1, 3, 1024, 1024, device=self.device)
            if self.use_fp16:
                dummy_input = dummy_input.half()
            with torch.inference_mode():
                self.model(dummy_input)
                
        await asyncio.to_thread(_warmup)

    async def preprocess(self, image: Any) -> Any:
        from app.utils.preprocessing import preprocess_for_birefnet
        return await asyncio.to_thread(preprocess_for_birefnet, image, self.device, self.use_fp16)

    async def predict(self, tensor: Any) -> Any:
        def _predict():
            with torch.inference_mode():
                # BiRefNet might return a list or tuple of outputs
                preds = self.model(tensor)
                if isinstance(preds, (list, tuple)):
                    return preds[0]
                return preds
        return await asyncio.to_thread(_predict)

    async def postprocess(self, prediction: Any) -> Any:
        from app.utils.postprocessing import postprocess_birefnet
        return await asyncio.to_thread(postprocess_birefnet, prediction)

    async def process(self, image: Any) -> Any:
        import gc
        await self.load_model()
        tensor, orig_size = await self.preprocess(image)
        prediction = await self.predict(tensor)
        mask = await self.postprocess((prediction, orig_size))
        
        from app.utils.image import apply_transparent_mask
        result = await asyncio.to_thread(apply_transparent_mask, image, mask)
        
        # Cleanup tensors from memory (crucial for CPU-only environments)
        del tensor
        del prediction
        del mask
        gc.collect()
        
        return result
