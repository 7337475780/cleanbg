import psutil
import torch
from typing import Dict, Any
from prometheus_client import Counter, Histogram, Gauge, generate_latest, CONTENT_TYPE_LATEST

# --- Prometheus Metrics Definitions ---

# API Metrics
api_requests_total = Counter('api_requests_total', 'Total API requests', ['method', 'endpoint', 'status'])
api_request_duration_seconds = Histogram('api_request_duration_seconds', 'API request duration', ['endpoint'])

# AI / Worker Metrics
job_processing_duration_seconds = Histogram('job_processing_duration_seconds', 'Full job processing duration')
inference_duration_seconds = Histogram('inference_duration_seconds', 'AI model inference duration')
jobs_processed_total = Counter('jobs_processed_total', 'Total jobs processed', ['status']) # success, failure
active_jobs = Gauge('active_jobs', 'Currently active jobs processing')

# Hardware Metrics
system_cpu_usage = Gauge('system_cpu_usage', 'System CPU usage percentage')
system_ram_usage = Gauge('system_ram_usage', 'System RAM usage percentage')
gpu_memory_allocated_bytes = Gauge('gpu_memory_allocated_bytes', 'GPU memory allocated')

class MetricsTracker:
    def __init__(self):
        pass

    def record_job(self, success: bool, inference_time: float = 0, processing_time: float = 0, upload_size: int = 0):
        status = "success" if success else "failure"
        jobs_processed_total.labels(status=status).inc()
        if success:
            if inference_time:
                inference_duration_seconds.observe(inference_time)
            if processing_time:
                job_processing_duration_seconds.observe(processing_time)

    def update_hardware_metrics(self):
        system_cpu_usage.set(psutil.cpu_percent())
        system_ram_usage.set(psutil.virtual_memory().percent)
        if torch.cuda.is_available():
            gpu_memory_allocated_bytes.set(torch.cuda.memory_allocated())

    def get_metrics_prometheus(self):
        self.update_hardware_metrics()
        return generate_latest(), CONTENT_TYPE_LATEST
        
    def get_metrics(self) -> Dict[str, Any]:
        """Fallback for basic JSON metrics if prometheus is disabled"""
        device = "cuda" if torch.cuda.is_available() else "cpu"
        metrics = {
            "hardware": {
                "cpu_percent": psutil.cpu_percent(),
                "ram_percent": psutil.virtual_memory().percent,
                "device": device
            }
        }
        if device == "cuda":
            metrics["hardware"]["gpu_allocated_gb"] = round(torch.cuda.memory_allocated() / (1024**3), 2)
        return metrics

metrics_tracker = MetricsTracker()
