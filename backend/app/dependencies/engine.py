from app.ai.engine import AIEngine
from app.ai.mock_engine import MockEngine

def get_ai_engine() -> AIEngine:
    """Dependency injection factory for the active AI Engine."""
    # In the future:
    # if settings.AI_MODEL == "RMBG": return RMBGEngine()
    # if settings.AI_MODEL == "BiRefNet": return BiRefNetEngine()
    
    return MockEngine()
