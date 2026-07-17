#!/bin/bash
set -e
echo "Stopping CleanBG services..."
docker compose -f docker-compose.production.yml down
echo "Services stopped successfully."
