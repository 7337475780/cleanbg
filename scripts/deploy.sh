#!/bin/bash
set -e

echo "Starting CleanBG Oracle Cloud Deployment..."

# Check if environment files exist
if [ ! -f .env.production ] || [ ! -f backend/.env.production ]; then
    echo "ERROR: Environment files missing. Please copy .env.production.example to .env.production and backend/.env.production.example to backend/.env.production, then fill in your secrets."
    exit 1
fi

echo "Pulling latest Docker images and building..."
docker compose -f docker-compose.production.yml build --pull

echo "Starting services in detached mode..."
docker compose -f docker-compose.production.yml up -d

echo "Pruning dangling images to save space..."
docker image prune -f

echo "Deployment successful! Check health status with ./scripts/healthcheck.sh"
