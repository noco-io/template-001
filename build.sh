#!/bin/bash
set -e

echo "🔨 Building template-001 Docker image..."

mkdir -p manager
cp -R ../manager/* ./manager/

docker build -f Dockerfile.internal -t us-central1-docker.pkg.dev/noco-455300/noco/template-001:latest .
docker push us-central1-docker.pkg.dev/noco-455300/noco/template-001:latest

echo "✅ Successfully built template-001 Docker image"

echo "🔄 Triggering deployment update by deleting all 'user-project-pod' pods..."

# Find pod names using the specific label selector
POD_NAMES=$(kubectl get pods -n user-projects -l role=user-project-pod --no-headers -o custom-columns=":metadata.name")

# Check if we found any pod names
if [ -z "$POD_NAMES" ]; then
  echo "⚠️ No pods found in namespace user-projects with label 'role=user-project-pod'."
  # Depending on requirements, you might want to exit here or continue
  # exit 1
else
  echo "   Found pod(s) with label 'role=user-project-pod':"
  # Use xargs to handle multiple pod names safely, even if they contain spaces (unlikely but possible)
  # Use printf to add newlines, ensuring xargs gets one pod name per line
  printf "%s\n" "$POD_NAMES" | while IFS= read -r POD_NAME; do
    if [ -n "$POD_NAME" ]; then # Ensure the line is not empty
        echo "   Deleting pod $POD_NAME to trigger rollout..."
        kubectl delete pod "$POD_NAME" -n user-projects
    fi
  done
  echo "✅ All found 'user-project-pod' pods deleted."
fi

echo "🚀 Deployment process complete."

