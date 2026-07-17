import uuid
from contextvars import ContextVar
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

request_id_ctx_var: ContextVar[str] = ContextVar("request_id", default="")

class RequestIDMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next) -> Response:
        request_id = request.headers.get("X-Request-ID") or str(uuid.uuid4())
        
        # Set the context variable
        request_id_ctx_var.set(request_id)
        
        # Process the request
        response = await call_next(request)
        
        # Add the request ID to the response headers
        response.headers["X-Request-ID"] = request_id
        
        return response
