# Running CleanBG Locally

CleanBG offers multiple ways to run the platform locally, prioritizing ease-of-use via single-command scripts, or fully manual containerized runs.

## Method 1: Easy Startup Scripts (Recommended)

1. **Windows**: Double-click or run `start.bat` from the root directory.
2. **Linux/Mac**: Run `./start.sh` from the terminal.

These scripts will automatically:
- Start the Postgres and Redis Docker containers.
- Create virtual environments and install backend dependencies.
- Run database migrations.
- Spin up the backend API, RQ worker, and Next.js frontend concurrently.

**Access Points**:
- Frontend: `http://localhost:3000`
- API / Swagger: `http://localhost:8000/docs`

## Method 2: Docker Compose (Full Containerization)

If you prefer to run the entire stack (including the frontend and worker) entirely within Docker containers:

1. Create a `.env` in `backend/.env` using the provided `.env.example`.
2. Run the development compose file:
```bash
docker compose -f docker-compose.dev.yml up --build
```
*Note: This will still expose the frontend at port 3000 and backend at port 8000.*

## Method 3: Manual Execution

For granular control, refer to [LOCAL_SETUP.md](LOCAL_SETUP.md) for step-by-step commands to spin up each service individually.
