#!/bin/bash
echo "Starting CleanBG Development Environment..."

echo "[1] Starting PostgreSQL and Redis via Docker..."
docker compose up postgres redis -d

echo "[2] Installing backend dependencies..."
cd backend
if [ ! -d ".venv" ]; then
    python3 -m venv .venv
fi
source .venv/bin/activate
pip install -r requirements.txt

echo "[3] Running database migrations..."
alembic upgrade head

echo "[4] Starting backend API and Worker in background..."
uvicorn app.main:app --reload > api.log 2>&1 &
API_PID=$!

rq worker default > worker.log 2>&1 &
WORKER_PID=$!

cd ..

echo "[5] Installing frontend dependencies..."
if [ ! -d "node_modules" ]; then
    npm install
fi

echo "[6] Starting frontend..."
npm run dev &
FRONTEND_PID=$!

echo "All services started!"
echo "API: http://localhost:8000"
echo "Frontend: http://localhost:3000"
echo "Logs are written to backend/api.log and backend/worker.log"
echo "Press Ctrl+C to stop all services..."

trap "echo 'Stopping services...'; kill $API_PID; kill $WORKER_PID; kill $FRONTEND_PID; docker compose stop postgres redis; exit" SIGINT SIGTERM

wait
