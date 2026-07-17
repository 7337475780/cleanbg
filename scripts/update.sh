#!/bin/bash
set -e

echo "Fetching latest changes from Git..."
git pull origin main

echo "Running deployment script..."
./scripts/deploy.sh
