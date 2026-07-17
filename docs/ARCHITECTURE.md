# System Architecture & Privacy Guarantees

CleanBG is explicitly designed to solve a major problem with online image processing tools: **Data Retention**. Most free tools permanently store your uploaded images to train future AI models or sell data. CleanBG operates on a strict zero-retention, ephemeral data pipeline.

## 🏗️ High-Level Architecture

CleanBG is composed of five strictly isolated microservices communicating securely over an internal Docker bridge network (`cleanbg_net`).

1. **Next.js 15 Frontend**: Handles the UI, client-side validation, and the highly optimized `ImageComparisonSlider`.
2. **FastAPI Backend**: Provides the REST API interface, handles file uploads, and issues UUID tokens for job tracking.
3. **Redis**: Acts as the high-speed message broker between the web API and the background inference worker.
4. **PostgreSQL**: Stores strictly the metadata (Job UUID, status, created_at, finished_at). **It never stores image BLOBS or file paths.**
5. **Celery/RQ Worker**: An isolated Python process dedicated solely to running the heavy PyTorch AI inference (BiRefNet) without blocking web traffic.

---

## 🔒 The Zero-Retention Lifecycle

To guarantee privacy, an image follows this exact lifecycle:

### Phase 1: Ingestion
1. The user uploads an image via the Next.js frontend.
2. The FastAPI backend receives the stream and writes a temporary file to `/app/uploads/{UUID}.png`.
3. A job metadata record containing *only* the UUID is inserted into PostgreSQL.
4. The UUID is pushed to the Redis queue.

### Phase 2: AI Inference
1. The RQ Worker pulls the UUID from Redis.
2. The Worker reads `/app/uploads/{UUID}.png` directly into RAM as a PyTorch tensor.
3. The BiRefNet model processes the tensor.
4. The output tensor is written to `/app/processed/{UUID}.png`.
5. The Worker deletes the original input file (`/app/uploads/{UUID}.png`).
6. Python garbage collection (`gc.collect()`) is aggressively invoked to scrub the tensors from RAM.

### Phase 3: Delivery & Scrubbing
1. The frontend continuously polls the API and receives a `completed` status.
2. The user downloads the processed image via the `/api/v1/download/{UUID}` endpoint.
3. A background asynchronous scheduler (running every 60 seconds) scans the `/app/processed/` directory. Any file older than `TEMP_FILE_TTL` (default 5 minutes) is permanently unlinked (`os.remove()`) from the SSD.

**Result**: After 5 minutes, absolutely no trace of the image exists on the server's disk, in the database, or in RAM.

---

## ⚙️ AI Engine Flexibility (BiRefNet vs rembg)

CleanBG uses a dynamic `AIEngineFactory`. While it defaults to `BiRefNet` (which offers vastly superior sub-pixel matting for hair and transparent objects), it can gracefully fallback to the lighter `rembg` (U-Net) engine if hardware constraints require it.

To toggle engines, simply change the environment variable:
```env
AI_ENGINE=birefnet  # Or 'rembg'
DEVICE=cpu          # Or 'cuda'
```
