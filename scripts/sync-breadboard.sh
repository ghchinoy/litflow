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

# Also copy data directory (needed by harness)
DATA_DIR="src/breadboard/data"
mkdir -p "$DATA_DIR"
cp -r "$BREADBOARD_PATH/packages/visual-editor/src/data"/* "$DATA_DIR/"

echo "🛡️  Adding @ts-nocheck to vendored files..."
find "$DEST_DIR" "$DATA_DIR" -name "*.ts" -exec sed -i '1i// @ts-nocheck' {} +

echo "🔧 Patching Imports..."
# Since we copied the whole structure, relative imports inside 'engine' should still work!
# e.g. import { ... } from '../static/orchestrator.js' inside runtime/harness/plan-runner.ts

# However, imports that go OUTSIDE engine (../../) need checking.
# Breadboard code imports from '@breadboard-ai/types' which we have installed.
# But it might import from '../../utils/...' or other internal paths.

# Check for internal imports
grep -r "\.\./\.\./" "$DEST_DIR" || echo "No deep relative imports found (Good)."

echo "🩹 Patching private identifiers and decorators..."
PLAN_RUNNER="$DEST_DIR/runtime/harness/plan-runner.ts"
if [ -f "$PLAN_RUNNER" ]; then
  # 1. Add Signal import
  sed -i 's|import { asyncGen, err, ok, timestamp } from "@breadboard-ai/utils";|import { asyncGen, err, ok, timestamp } from "@breadboard-ai/utils";\nimport { Signal } from "signal-polyfill";|' "$PLAN_RUNNER"
  
  # 2. Replace private accessor _orchestrator with manual signal
  # This is a bit complex for sed, so we might need perl or just a simple replace if the lines match exactly
  # Note: The previous patch changed #orchestrator to _orchestrator already
  sed -i 's|@signal|/* @signal */|g' "$PLAN_RUNNER"
  sed -i 's|accessor _orchestrator: Orchestrator;|#orchestratorState = new Signal.State<Orchestrator>(null!);\n  get _orchestrator() { return this.#orchestratorState.get(); }\n  set _orchestrator(value) { this.#orchestratorState.set(value); }|' "$PLAN_RUNNER"
  
  echo "   Patched $PLAN_RUNNER"
fi

echo "✅ Sync Complete."
echo "   Engine located at: $DEST_DIR"
echo "   Please run 'pnpm test' to verify integration."
