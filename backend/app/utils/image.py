import io
from PIL import Image, ImageOps
from typing import Tuple

def fix_exif_orientation(image: Image.Image) -> Image.Image:
    """Corrects image orientation using EXIF data."""
    try:
        return ImageOps.exif_transpose(image)
    except Exception:
        return image

def ensure_rgba(image: Image.Image) -> Image.Image:
    """Converts image to RGBA if not already."""
    if image.mode != "RGBA":
        return image.convert("RGBA")
    return image

def ensure_rgb(image: Image.Image) -> Image.Image:
    """Converts image to RGB, flattening transparency to white."""
    if image.mode in ("RGBA", "LA") or (image.mode == "P" and "transparency" in image.info):
        background = Image.new("RGB", image.size, (255, 255, 255))
        if image.mode == "P":
            image = image.convert("RGBA")
        background.paste(image, mask=image.split()[3])
        return background
    return image.convert("RGB")

def apply_transparent_mask(original: Image.Image, mask: Image.Image) -> Image.Image:
    """Applies a grayscale mask as the alpha channel of the original image."""
    original = ensure_rgba(original)
    mask = mask.convert("L").resize(original.size, Image.Resampling.LANCZOS)
    original.putalpha(mask)
    return original

def apply_white_background(image: Image.Image) -> Image.Image:
    """Replaces transparent background with white."""
    return ensure_rgb(image)

def generate_thumbnail(image: Image.Image, size: Tuple[int, int] = (256, 256)) -> Image.Image:
    """Generates a thumbnail of the specified size."""
    thumb = image.copy()
    thumb.thumbnail(size, Image.Resampling.LANCZOS)
    return thumb

def optimize_image(image: Image.Image, format: str = "PNG", quality: int = 85) -> bytes:
    """Saves image to bytes with optimization and metadata stripping."""
    output = io.BytesIO()
    save_kwargs = {}
    
    format_upper = format.upper()
    if format_upper == "JPEG" or format_upper == "JPG":
        image = ensure_rgb(image)
        save_kwargs = {"quality": quality, "optimize": True}
        format_upper = "JPEG"
    elif format_upper == "WEBP":
        save_kwargs = {"quality": quality, "method": 6}
    elif format_upper == "PNG":
        save_kwargs = {"optimize": True}
        
    # Exclude exif to strip metadata
    image.save(output, format=format_upper, **save_kwargs)
    return output.getvalue()
