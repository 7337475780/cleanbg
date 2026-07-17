# Enterprise Logging

CleanBG utilizes `Loguru` for centralized, robust, and async-capable logging suitable for production enterprise environments.

## Features

- **Structured JSON Logging:** When `LOG_JSON=True`, all logs are emitted as single-line JSON objects, ideal for aggregation tools like Datadog, ELK, or Splunk.
- **Request Tracking:** A unique `X-Request-ID` is generated for every HTTP request and automatically injected into the logging context, allowing end-to-end tracing across services.
- **File Rotation:** In production, logs are automatically rotated at 100MB and retained for 14 days with ZIP compression.

## Configuration

Control the logging behavior via environment variables:
- `LOG_LEVEL`: Adjust the verbosity (DEBUG, INFO, WARNING, ERROR). Default: INFO.
- `LOG_JSON`: Enable structured JSON formatting. Default: False.
- `ENABLE_REQUEST_LOGGING`: Toggle the request ID middleware. Default: True.

## Implementation

Logs are formatted via a custom patcher in `app.core.logging.setup_logging()` that extracts the `request_id` from standard `contextvars`.
