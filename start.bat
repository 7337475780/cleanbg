@echo off
echo Starting CleanBG Development Environment...

echo [1] Starting PostgreSQL and Redis via Docker...
docker compose up postgres redis -d

echo [2] Installing backend dependencies...
cd backend
if not exist ".venv" (
    python -m venv .venv
)
call .venv\Scripts\activate.bat
pip install -r requirements.txt

echo [3] Running database migrations...
alembic upgrade head

echo [4] Starting backend API...
start "CleanBG Backend API" cmd /k "call .venv\Scripts\activate.bat && uvicorn app.main:app --reload"

echo [5] Starting Redis Worker...
start "CleanBG RQ Worker" cmd /k "call .venv\Scripts\activate.bat && rq worker -w rq.SimpleWorker default --url redis://localhost:6380/0"

cd ..

echo [6] Installing frontend dependencies...
if not exist "node_modules" (
    npm install
)

echo [7] Starting frontend...
start "CleanBG Frontend" cmd /k "npm run dev"

echo All services started!
echo API: http://localhost:8000
echo Frontend: http://localhost:3000
