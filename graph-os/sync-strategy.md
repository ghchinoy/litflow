# Breadboard Sync Strategy

**Date:** 2025-12-29
**Subject:** Vendoring the Execution Engine

## 1. The Problem
The Breadboard Execution Engine (`Harness`, `Orchestrator`, `NodeInvoker`) is currently embedded inside the `@breadboard-ai/visual-editor` package and is not published as a standalone library (`@breadboard-ai/core` is missing/legacy).

## 2. The Solution: Vendor & Sync
We copy the source code from `breadboard/packages/visual-editor/src/engine` into `litflow/src/breadboard`.

### The Script: `scripts/sync-breadboard.sh`
We maintain a shell script that automates this copy process to ensure reproducibility.

**Usage:**
```bash
./scripts/sync-breadboard.sh ../breadboard
```

**What it does:**
1.  Cleans `src/breadboard/engine`.
2.  Copies `packages/visual-editor/src/engine/runtime` -> `src/breadboard/engine/runtime`.
3.  Copies `packages/visual-editor/src/engine/static` -> `src/breadboard/engine/static`.
4.  Copies `packages/visual-editor/src/engine/run` -> `src/breadboard/engine/run`.
5.  **Patches Imports**: Uses `sed` to fix import paths if directory structure depth changes.

## 3. Long Term
When Breadboard publishes a standalone `@breadboard-ai/engine` or `@breadboard-ai/core` package, we will:
1.  Delete `src/breadboard/engine`.
2.  `pnpm add @breadboard-ai/engine`.
3.  Update imports in `LitFlowRunner`.
