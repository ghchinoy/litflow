# LitFlow Integration Test Plan

**Date:** 2025-12-29
**Scope:** Verification of Breadboard Integration (Schema Nodes & Execution Engine)

## 1. Automated Verification
We have established a Vitest test suite that verifies the core integration points without needing a browser UI.

**Command:**
```bash
pnpm test
```

**What it verifies:**
1.  **Engine Integrity**: `src/breadboard/engine/tests/orchestrator.test.ts`
    *   Confirms the vendored Breadboard engine (`createPlan`, `Orchestrator`) was copied correctly and runs in our environment.
    *   Tests that a simple JSON graph (`input -> echo -> output`) produces a valid execution plan.
2.  **Runner Logic**: `src/breadboard/lit-flow-runner.test.ts`
    *   Confirms `LitFlowRunner` correctly wraps the `HarnessRunner`.
    *   Tests a multi-step graph execution (`echo -> echo`) ensuring events (`nodestart`, `nodeend`) fire in sequence.
3.  **Component Rendering**: `src/lit-schema-node.test.ts`
    *   Confirms `LitSchemaNode` correctly parses a JSON Schema and renders the appropriate handles (inputs/outputs).

---

## 2. Manual Verification (The "Schema Node" Example)
This is the primary proof-of-concept for the integration.

**Setup:**
```bash
./start-server.sh
```
Navigate to: `http://localhost:5173/examples/schema-node/`

### Test Case A: Visual Rendering
1.  **Check Node Structure**:
    *   Verify you see two nodes: "User Input" and "Gemini 3 Flash Preview".
    *   **User Input Node**: Should have an output handle "Prompt Text".
    *   **Gemini Node**: Should have input handles "Model Name", "Prompt", "Context" and output handle "Response".
2.  **Check Styling**:
    *   Nodes should look like clean cards (M3 styling).
    *   Handles should be aligned to the edges (Input on Left, Output on Right).
    *   Connection arrow should point from `User Input` -> `Gemini` (Prompt handle).

### Test Case B: Execution Simulation
1.  **Action**: Click the **"Run Flow"** button (top right).
2.  **Expected Behavior**:
    *   **Start**: "User Input" node should highlight (blue border/glow).
    *   **Transition**: After a delay, "User Input" finishes, and "Gemini" node highlights (working state).
    *   **Output**: After ~1.5s, the "Gemini" node should finish.
    *   **Data**: A "Response" **Chiclet** (pill) should appear on the Gemini node containing the mock text ("Hello from Gemini!").

### Test Case C: Dynamic Data
1.  **Verify Inputs**: The "Gemini" node should show chiclets for "Model Name" (gemini-3-flash-preview).
2.  **Verify Outputs**: The "User Input" node should show a chiclet for "Prompt Text" (if configured in data).

---

## 3. Regression Testing (The Designer)
Ensure we haven't broken the existing visual tools.

**Navigate to:** `http://localhost:5173/examples/designer/`

1.  **Drag & Drop**: Drag a "Default Node" from the sidebar to the canvas. It should appear.
2.  **Selection**: Click the node. It should highlight.
3.  **JSON Sync**: The right-hand panel should update to show the new node in the JSON structure.
4.  **Wiring**: Drag a handle from one node to another. An edge should form.

## 4. Troubleshooting
*   **"Node not found"**: Check console. Ensure `data-id` on the DOM matches the ID in the graph.
*   **No Glow**: Check console for `nodestart` logs. If logs appear but no glow, check CSS (`.node-container.working`).
*   **Missing Handles**: Ensure `lit-handle` uses `data-handleid`.
