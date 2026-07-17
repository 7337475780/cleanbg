import torch
from torchvision import transforms
from PIL import Image
from typing import Tuple

def get_transform(image_size: Tuple[int, int] = (1024, 1024)):
    """Returns standard torchvision transforms for image segmentation."""
    return transforms.Compose([
        transforms.Resize(image_size),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[1.0, 1.0, 1.0])
    ])

def preprocess_for_rmbg(image: Image.Image, device: torch.device, use_fp16: bool = False) -> Tuple[torch.Tensor, Tuple[int, int]]:
    """
    Preprocess image for RMBG-2.0.
    Returns:
        - tensor of shape [1, 3, 1024, 1024]
        - original image size
    """
    from app.utils.image import ensure_rgb, fix_exif_orientation
    
    img = fix_exif_orientation(image)
    orig_size = img.size
    img = ensure_rgb(img)
    
    transform = get_transform((1024, 1024))
    tensor = transform(img).unsqueeze(0).to(device)
    
    if use_fp16:
        tensor = tensor.half()
        
    return tensor, orig_size

def preprocess_for_birefnet(image: Image.Image, device: torch.device, use_fp16: bool = False) -> Tuple[torch.Tensor, Tuple[int, int]]:
    """
    Preprocess image for BiRefNet.
    Returns:
        - tensor of shape [1, 3, 1024, 1024]
        - original image size
    """
    from app.utils.image import ensure_rgb, fix_exif_orientation
    
    img = fix_exif_orientation(image)
    orig_size = img.size
    img = ensure_rgb(img)
    
    transform = transforms.Compose([
        transforms.Resize((1024, 1024)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    tensor = transform(img).unsqueeze(0).to(device)
    
    if use_fp16:
        tensor = tensor.half()
        
    return tensor, orig_size
