# Phase 2: Graph Execution Architecture (The Core)

**Date:** 2025-12-29
**Subject:** Breadboard Runtime & Harness vs. LitFlow

## 1. Executive Summary
Breadboard's power lies in its **"Graph Operating System"** architecture. It doesn't just "run" a graph; it provides a persistent runtime environment (`Runtime` class) with a virtual file system, authentication providers, and backend servers. The execution itself is handled by a **Harness Runner**, which emits granular events that drive the UI state via Signals.

**Strategic Goal:** LitFlow should become a lightweight **View Layer** for this robust Core. We can reuse Breadboard's `HarnessRunner` and `MutableGraphStore` while keeping `xyflow` for rendering.

## 2. Execution Architecture

### The Runtime (`runtime.ts`)
The `Runtime` class orchestrates the entire application lifecycle. It initializes:
*   **`MutableGraphStore`**: The database of all loaded graphs.
*   **`FileSystem`**: A virtual file system for assets (images, text) and streams.
*   **`Identity`**: Google Drive / OAuth adapters.

### The Runner (`run.ts` & `project-run.ts`)
Execution is decoupled from the UI.
1.  **Harness**: The `createPlanRunner` function creates a headless runner.
2.  **Events**: The harness emits lifecycle events: `nodestart`, `nodeend`, `input`, `output`, `error`.
3.  **State Bridge**: `ReactiveProjectRun` listens to these events and updates **Signals** (e.g., `renderer.nodes`).
4.  **UI Reaction**: The visual components (nodes) observe these signals and update their appearance (e.g., turning green when `status="working"`).

### Input Bubbling (Human-in-the-loop)
Breadboard supports interactive nodes (like "Human Input"). The runner pauses execution, emits an `input` event, and waits. The UI must:
1.  Detect the "Waiting" state.
2.  Render an input form (based on the input schema).
3.  Submit the user's value back to the runner to resume execution.

## 3. Maturity Gap Analysis

| Feature | Breadboard (Reference) | LitFlow (Current) | Maturity Gap |
| :--- | :--- | :--- | :--- |
| **Runtime** | Full OS (Auth, FS, Servers) | None | **HIGH**. We need a minimal `LitFlowRuntime`. |
| **Harness** | Event-driven Runner | None | **HIGH**. We should wrap Breadboard's harness. |
| **State Sync** | Signals (`ReactiveProjectRun`) | None | **HIGH**. We need to map runner events to LitFlow node data. |
| **Input Bubbling** | "Waiting" state + UI Input | None | **CRITICAL**. Essential for "Human in the loop" flows. |

## 4. Implementation Strategy: "LitFlow Runtime Adapter"

We should not rebuild the execution engine. Instead, we should build an **Adapter Layer**:

1.  **`LitFlowGraphStore`**: A wrapper around Breadboard's `MutableGraphStore` that syncs changes to the `lit-flow` `nodes` array.
2.  **`LitFlowRunner`**: A class that instantiates Breadboard's `HarnessRunner` with a given graph.
3.  **Visual State Mapping**:
    *   Breadboard Event: `nodestart` (Node ID: "node-1")
    *   LitFlow Action: `flow.updateNodeData("node-1", { status: "working" })`
    *   LitFlow Node: Renders a spinner.

## 5. Next Steps (Phase 3)
Investigate **GenAI Integration**:
*   How `isLLMContentBehavior` drives rendering.
*   How "Chiclets" visualize multimodal data (Images, Audio).
*   How to build a `<lit-gemini-node>` that supports these behaviors.
