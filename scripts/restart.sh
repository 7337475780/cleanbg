#!/bin/bash
set -e
echo "Restarting CleanBG services..."
docker compose -f docker-compose.production.yml restart
echo "Services restarted successfully."
