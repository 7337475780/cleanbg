# Troubleshooting CleanBG

## Common Issues

### 1. Database Connection Fails
**Error**: `asyncpg.exceptions.CannotConnectNowError: role "postgres" does not exist` or `ConnectionRefusedError`
**Solution**: Ensure your PostgreSQL container is running via Docker.
Run:
```bash
docker ps
```
If not running, execute `docker compose up postgres redis -d`.

### 2. Jobs are stuck in "QUEUED" status
**Error**: The frontend shows 0% progress indefinitely, and the `/jobs/{id}` returns `status: queued`.
**Solution**: This happens when the AI worker is not running. 
Ensure you have run `rq worker default` in a new terminal with the backend `.venv` activated.

### 3. Out of Memory (OOM) / CUDA Error
**Error**: `torch.cuda.OutOfMemoryError` in worker logs.
**Solution**: 
The worker has strict GPU memory configurations. Try:
1. Ensuring no other heavy VRAM applications are running.
2. In `backend/.env`, lower `GPU_MEMORY_LIMIT=0.9` to `0.7`.
3. Restart the worker.

### 4. API Returns 413 Payload Too Large
**Error**: Frontend rejects file upload immediately.
**Solution**: The image exceeds `MAX_UPLOAD_SIZE` (default is 10MB). Modify `.env` to increase this limit if necessary.

### 5. Frontend Fails to Fetch
**Error**: Blank screen or `TypeError: fetch failed`.
**Solution**: Ensure `uvicorn` backend is running and `NEXT_PUBLIC_API_URL` in `.env.local` accurately points to `http://localhost:8000/api/v1`.

### 6. Missing Dependencies
**Error**: `ModuleNotFoundError: No module named 'app'`
**Solution**: You are likely missing the `PYTHONPATH` or running Python outside the virtual environment. Always execute API and worker commands from the `backend/` directory while the virtual environment is activated (`.venv\Scripts\activate`).
