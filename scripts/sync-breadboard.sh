#!/bin/bash

# scripts/sync-breadboard.sh
# Usage: ./scripts/sync-breadboard.sh <path-to-breadboard-repo>

set -e

BREADBOARD_PATH=$1

if [ -z "$BREADBOARD_PATH" ]; then
  echo "Error: Please provide the path to the breadboard repository."
  echo "Usage: ./scripts/sync-breadboard.sh ../breadboard"
  exit 1
fi

if [ ! -d "$BREADBOARD_PATH/packages/visual-editor/src/engine" ]; then
  echo "Error: Could not find packages/visual-editor/src/engine in $BREADBOARD_PATH"
  exit 1
fi

DEST_DIR="src/breadboard/engine"

echo "🧹 Cleaning destination: $DEST_DIR"
rm -rf $DEST_DIR
mkdir -p $DEST_DIR

echo "📦 Copying Engine Source..."

# Copy Engine directories
# We need: runtime/harness, runtime/static, runtime/run, runtime/traversal, file-system
# We copy the whole 'engine' folder structure to maintain imports
cp -r "$BREADBOARD_PATH/packages/visual-editor/src/engine"/* "$DEST_DIR/"

echo "🔧 Patching Imports..."
# Since we copied the whole structure, relative imports inside 'engine' should still work!
# e.g. import { ... } from '../static/orchestrator.js' inside runtime/harness/plan-runner.ts

# However, imports that go OUTSIDE engine (../../) need checking.
# Breadboard code imports from '@breadboard-ai/types' which we have installed.
# But it might import from '../../utils/...' or other internal paths.

# Check for internal imports
grep -r "\.\./\.\./" "$DEST_DIR" || echo "No deep relative imports found (Good)."

echo "✅ Sync Complete."
echo "   Engine located at: $DEST_DIR"
echo "   Please run 'pnpm test' to verify integration."
