#!/bin/bash

# shutdown.sh - Clean shutdown script for development environment
# This script stops the MongoDB Docker container

# Text formatting
BOLD='\033[1m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BOLD}Shutting down development environment...${NC}"

# Stop MongoDB container
echo -e "Stopping MongoDB Docker container..."
docker-compose down
if [ $? -ne 0 ]; then
  echo -e "${RED}Failed to stop MongoDB Docker container.${NC}"
  exit 1
fi
echo -e "${GREEN}MongoDB container stopped successfully.${NC}"

echo -e "${GREEN}Development environment shutdown complete.${NC}"