# Monitoring & Metrics

CleanBG exposes extensive system and application-level metrics via the `/api/v1/metrics` endpoint.

## Prometheus Integration

When `PROMETHEUS_ENABLED=True`, the metrics endpoint returns data in the standard Prometheus exposition format.

### Available Metrics

**API Metrics:**
- `api_requests_total`: Counter of all HTTP requests.
- `api_request_duration_seconds`: Histogram of request latencies.

**AI / Worker Metrics:**
- `job_processing_duration_seconds`: Histogram measuring the full end-to-end processing pipeline inside the worker.
- `inference_duration_seconds`: Histogram measuring strictly the AI model inference phase.
- `jobs_processed_total`: Counter of successfully completed vs failed jobs.
- `active_jobs`: Gauge of currently processing jobs.

**Hardware Metrics:**
- `system_cpu_usage`: Gauge of CPU %.
- `system_ram_usage`: Gauge of RAM %.
- `gpu_memory_allocated_bytes`: Gauge of current VRAM usage (if CUDA is available).

## Grafana

These metrics can be seamlessly scraped by a Prometheus server and visualized in Grafana dashboards to monitor queue lengths, worker health, and inference times.
