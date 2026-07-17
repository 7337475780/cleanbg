#!/bin/bash
set -e

BACKUP_DIR="./backups"
mkdir -p "$BACKUP_DIR"

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/cleanbg_db_$TIMESTAMP.sql"

echo "Backing up PostgreSQL database..."
docker compose -f docker-compose.production.yml exec -T postgres pg_dump -U postgres cleanbg > "$BACKUP_FILE"

echo "Backup successful! Saved to $BACKUP_FILE"
