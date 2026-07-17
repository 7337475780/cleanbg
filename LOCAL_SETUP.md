# Local Setup Guide (Manual)

If you prefer not to use the automated `start.bat` or `start.sh` scripts, follow these instructions to set up the environment manually.

## 1. Environment Configuration

Copy the example environments:

**Frontend**:
```bash
cp .env.example .env.local
```

**Backend**:
```bash
cd backend
cp .env.example .env
```

## 2. Infrastructure dependencies

The backend requires PostgreSQL (database) and Redis (job queue).

Using Docker Compose:
```bash
docker compose up postgres redis -d
```

*Note: Verify they are running via `docker ps`.*

## 3. Backend Setup

Open a new terminal.

```bash
cd backend

# Create Virtual Environment
python -m venv .venv

# Activate (Windows)
.venv\Scripts\activate
# Activate (Linux/Mac)
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations to setup PostgreSQL tables
alembic upgrade head

# Start FastAPI server
uvicorn app.main:app --reload
```

## 4. Worker Setup

Open a new terminal. The worker is required to process AI jobs.

```bash
cd backend

# Activate (Windows)
.venv\Scripts\activate
# Activate (Linux/Mac)
source .venv/bin/activate

# Start RQ worker
rq worker default
```

## 5. Frontend Setup

Open a new terminal.

```bash
# Install Node dependencies
npm install

# Start Next.js development server
npm run dev
```

You can now visit `http://localhost:3000` to interact with CleanBG.
