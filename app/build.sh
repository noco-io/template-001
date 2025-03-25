#!/bin/bash
set -e

echo "🔨 Building noco-nextjs Docker image..."

# # Navigate to the next_minimal directory
# cd "$(dirname "$0")/next_minimal"

# Build the Docker image
docker build -t noco-nextjs .

echo "✅ Successfully built noco-nextjs Docker image"

# Optional: List the newly created image
echo "📋 Docker images:"
docker images | grep noco-nextjs