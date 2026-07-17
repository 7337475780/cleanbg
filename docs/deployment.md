# CleanBG Deployment Guide

## Architecture

CleanBG uses a scalable, microservices-oriented architecture suitable for enterprise deployment:
1.  **Nginx Reverse Proxy:** Handles HTTPS termination, request routing, caching, and payload buffering.
2.  **Next.js Frontend:** A server-side rendered application built as a standalone Node.js process.
3.  **FastAPI Backend:** Provides REST endpoints, utilizing Gunicorn + Uvicorn workers for asynchronous performance.
4.  **PostgreSQL:** Relational database for structured data.
5.  **Redis:** In-memory store for background task queues and token blocklisting.
6.  **RQ Workers:** Background workers handling AI inference tasks.
7.  **Object Storage:** Cloud-native storage abstraction supporting Local, AWS S3, Azure Blob, and Google Cloud Storage.

## Prerequisites

- Docker and Docker Compose
- Environment variables configured in `.env` (Frontend) and `backend/.env` (Backend)

## Deployment Steps

1.  **Configure Environment Variables:** 
    Ensure `.env` in the root and `backend/.env` are populated with production credentials. See `app/config/settings.py` for required variables.
    
2.  **Build and Run with Docker Compose:**
    ```bash
    docker compose -f docker-compose.production.yml up -d --build
    ```
    
3.  **Verify Deployment:**
    Check the health endpoints to verify the system is operational:
    - `/api/v1/health`
    - `/api/v1/ready`
    - `/api/v1/live`

## Scaling

- **Backend:** Increase the number of API replicas or Gunicorn workers in `docker-compose.production.yml` and `Dockerfile`.
- **Workers:** Increase the number of RQ worker replicas to process more images concurrently. Ensure your GPU resources can handle the load.
- **Database:** Utilize a managed PostgreSQL instance (e.g., AWS RDS, Azure Database for PostgreSQL) for high availability and automatic backups.

## Security

CleanBG implements several security best practices:
- Multi-stage Docker builds to minimize image size and attack surface.
- Non-root users inside containers.
- Strong Content Security Policies (CSP) and security headers via Nginx.
- Token revocation and strict JWT validation.
- Sanitized file uploads and magic byte verification.
