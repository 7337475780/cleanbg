# Environment Configuration

CleanBG supports comprehensive configuration via environment variables to adapt to any deployment scenario.

## Observability
- `SENTRY_DSN`: Endpoint for Sentry error tracking.
- `LOG_LEVEL`: Configures Loguru verbosity (e.g., `DEBUG`, `INFO`).
- `LOG_JSON`: Set to `True` for structured JSON logs in production.
- `ENABLE_METRICS`: Set to `True` to track application metrics.
- `PROMETHEUS_ENABLED`: Set to `True` to format `/metrics` output for Prometheus.
- `ENABLE_REQUEST_LOGGING`: Set to `True` to inject `X-Request-ID` into logs and responses.

## Storage
- `STORAGE_PROVIDER`: Determines the active storage backend (`local`, `s3`, `azure`, `gcs`).
- `AWS_REGION`, `AWS_BUCKET_NAME`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`: Required when using `s3`.
- `AZURE_CONTAINER_NAME`, `AZURE_STORAGE_CONNECTION_STRING`: Required when using `azure`.
- `GCS_BUCKET_NAME`, `GCS_PROJECT_ID`: Required when using `gcs`.

## Performance Limits
- `REQUEST_TIMEOUT`: Global request timeout in seconds.
- `MAX_UPLOADS`: Maximum number of active uploads permitted.
- `WORKER_CONCURRENCY`: Adjust the number of parallel RQ worker threads depending on GPU/CPU resources.
