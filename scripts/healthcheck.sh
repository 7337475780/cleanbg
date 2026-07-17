#!/bin/bash
set -e

echo "Checking health of CleanBG services..."
echo "----------------------------------------"

# Check Docker containers
echo "Docker Containers Status:"
docker compose -f docker-compose.production.yml ps

echo "----------------------------------------"
echo "API Health Endpoint:"
curl -s http://localhost:8000/health | python3 -m json.tool || echo "API is not reachable or Python is not installed."
echo ""
