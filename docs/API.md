# CleanBG API Reference

The CleanBG API is built on FastAPI and follows standard RESTful principles. All endpoints are prefixed with `/api/v1`.

## Endpoints

### `POST /api/v1/upload`
Initiates a new background removal job.

**Request:**
- `Content-Type: multipart/form-data`
- `file`: The image file (JPEG, PNG, WebP). Max 25MB.

**Response (202 Accepted):**
```json
{
  "job_id": "808f2583-cca9-484e-946f-069b6e0e6f9f",
  "status": "queued",
  "message": "Image queued for processing"
}
```

---

### `GET /api/v1/status/{job_id}`
Polls the current status of the AI inference job.

**Response (200 OK):**
```json
{
  "job_id": "808f2583-cca9-484e-946f-069b6e0e6f9f",
  "status": "completed", // "queued", "processing", "completed", "error"
  "created_at": "2026-07-17T10:15:30Z",
  "error_message": null
}
```

---

### `GET /api/v1/preview/{job_id}`
Returns the processed image payload for rendering in the web UI.

**Response (200 OK):**
- `Content-Type: image/png`
- *Raw binary image data*

---

### `GET /api/v1/download/{job_id}`
Triggers a file download in the browser.

**Response (200 OK):**
- `Content-Type: image/png`
- `Content-Disposition: attachment; filename="cleanbg_808f2583.png"`
- *Raw binary image data*

---

## Health & Monitoring

### `GET /api/v1/health`
Returns granular health metrics for the Docker orchestrator.

**Response (200 OK):**
```json
{
  "status": "ok",
  "environment": "production",
  "ai": {
    "device": "cpu",
    "engine": "birefnet",
    "cpu_usage_percent": 12.5,
    "ram_used_gb": 1.2
  },
  "postgres": "ok",
  "redis": "ok",
  "storage": {
    "status": "ok",
    "provider": "LocalStorageProvider"
  }
}
```
