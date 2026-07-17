import torch
import torch.nn.functional as F
from PIL import Image
from typing import Tuple

def refine_mask(tensor_mask: torch.Tensor) -> torch.Tensor:
    """Applies basic morphological cleanup (optional/placeholder for edge feathering)."""
    # For now, simply clamp and return. Advanced morphology could be done here.
    return torch.clamp(tensor_mask, 0.0, 1.0)

def postprocess_rmbg(prediction_tuple: Tuple[torch.Tensor, Tuple[int, int]]) -> Image.Image:
    """
    Postprocess RMBG-2.0 output.
    """
    prediction, orig_size = prediction_tuple
    
    # RMBG returns a tensor of shape [1, 1, H, W]
    ma = torch.max(prediction)
    mi = torch.min(prediction)
    prediction = (prediction - mi) / (ma - mi)
    
    prediction = F.interpolate(prediction, size=(orig_size[1], orig_size[0]), mode='bilinear', align_corners=False)
    prediction = refine_mask(prediction)
    
    mask_np = (prediction.squeeze().cpu().numpy() * 255).astype('uint8')
    return Image.fromarray(mask_np, mode='L')

def postprocess_birefnet(prediction_tuple: Tuple[torch.Tensor, Tuple[int, int]]) -> Image.Image:
    """
    Postprocess BiRefNet output.
    """
    prediction, orig_size = prediction_tuple
    
    # BiRefNet returns logits, we need sigmoid
    prediction = torch.sigmoid(prediction)
    
    prediction = F.interpolate(prediction, size=(orig_size[1], orig_size[0]), mode='bilinear', align_corners=False)
    prediction = refine_mask(prediction)
    
    mask_np = (prediction.squeeze().cpu().numpy() * 255).astype('uint8')
    return Image.fromarray(mask_np, mode='L')
