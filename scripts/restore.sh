#!/bin/bash
set -e

if [ -z "$1" ]; then
    echo "Usage: ./scripts/restore.sh <path_to_sql_file>"
    exit 1
fi

BACKUP_FILE=$1

if [ ! -f "$BACKUP_FILE" ]; then
    echo "ERROR: File $BACKUP_FILE does not exist."
    exit 1
fi

echo "Restoring PostgreSQL database from $BACKUP_FILE..."
# Drop and recreate schema to ensure clean slate, then restore
docker compose -f docker-compose.production.yml exec -T postgres psql -U postgres -d cleanbg -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
cat "$BACKUP_FILE" | docker compose -f docker-compose.production.yml exec -T postgres psql -U postgres -d cleanbg

echo "Restore successful!"
