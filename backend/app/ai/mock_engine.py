import time
from pathlib import Path
from PIL import Image, ImageFilter
from app.ai.engine import AIEngine
from loguru import logger

class MockEngine(AIEngine):
    def __init__(self):
        self.is_loaded = False
        self.name = "MockEngine"

    def load_model(self) -> None:
        logger.info(f"[{self.name}] Loading simulated model weights...")
        time.sleep(1) 
        self.is_loaded = True
        logger.info(f"[{self.name}] Model loaded successfully.")

    def predict(self, image_path: Path) -> dict:
        logger.info(f"[{self.name}] Running inference on {image_path.name}")
        time.sleep(1.5) 
        
        # Simulate creating an alpha mask by generating a radial gradient or basic threshold
        try:
            with Image.open(image_path) as img:
                img = img.convert("RGBA")
                mask = Image.new("L", img.size, 0)
                # Create a simple elliptical mask in the center
                from PIL import ImageDraw
                draw = ImageDraw.Draw(mask)
                w, h = img.size
                padding = int(min(w, h) * 0.1)
                draw.ellipse((padding, padding, w-padding, h-padding), fill=255)
                # Blur the mask to simulate soft edges
                mask = mask.filter(ImageFilter.GaussianBlur(10))
                return {"mask": mask, "original_size": img.size}
        except Exception as e:
            logger.error(f"[{self.name}] Inference failed: {e}")
            raise e

    def postprocess(self, prediction: dict, original_path: Path, output_path: Path) -> None:
        logger.info(f"[{self.name}] Refining mask and generating output for {output_path.name}")
        time.sleep(1)
        
        mask = prediction["mask"]
        with Image.open(original_path) as img:
            img = img.convert("RGBA")
            # Apply alpha mask
            img.putalpha(mask)
            
            # Simulate edge refinement and sharpening
            img = img.filter(ImageFilter.UnsharpMask(radius=2, percent=150, threshold=3))
            
            # Save transparent PNG
            img.save(output_path, format="PNG", optimize=True)
            logger.info(f"[{self.name}] Saved processed image to {output_path}")

    def warmup(self) -> None:
        if not self.is_loaded:
            self.load_model()
        logger.info(f"[{self.name}] Running warmup pass...")
        time.sleep(0.5)

    def shutdown(self) -> None:
        logger.info(f"[{self.name}] Releasing GPU resources...")
        self.is_loaded = False

    def health(self) -> bool:
        return self.is_loaded
