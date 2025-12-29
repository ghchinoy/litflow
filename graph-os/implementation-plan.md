# Implementation Plan: LitFlow + Breadboard

**Date:** 2025-12-29
**Subject:** Integration Roadmap

## 1. Dependencies
The "Core" of Breadboard is split across packages. We cannot simply `npm install breadboard`.

*   **Primary**: `@breadboard-ai/types`. This gives us `GraphDescriptor`, `NodeDescriptor`, `Schema`, `LLMContent`.
*   **Secondary**: `@breadboard-ai/utils`. Useful helpers.
*   **Engine**: Currently inside `@breadboard-ai/visual-editor`.
    *   *Action*: **Vendor** (Copy) the `harness/` directory into `src/breadboard/harness`. This isolates the execution logic without pulling in the entire Visual Editor UI.

## 2. Component: `LitSchemaNode`
A new node type that renders itself based on a Schema, not a template.

*   **Inputs**: `node: NodeDescriptor`, `schema: Schema`.
*   **Rendering**:
    *   Iterate `schema.properties`.
    *   Check `behavior` (`llm-content`, `image`, etc.).
    *   Render appropriate input (Text Area, Image Uploader, Chiclet).
*   **Outputs**: Generate `<lit-handle>` for each output port.

## 3. Runner: `LitFlowRunner` (The Adapter)
A class that bridges `LitFlow` (UI) and `Harness` (Engine).

*   **Interface**:
    ```typescript
    class LitFlowRunner extends EventTarget {
      load(graph: GraphDescriptor);
      run();
      stop();
    }
    ```
*   **Mapping**:
    *   `harness.addEventListener('nodestart', ...)` -> Update LitFlow Node Status.
    *   `harness.addEventListener('input', ...)` -> Show Input Modal.
    *   `harness.addEventListener('output', ...)` -> Update LitFlow Chiclets.

## 4. Example: "GenAI Workflow"
A proof-of-concept in `examples/genai/`.
1.  **Nodes**:
    *   `Prompt Node` (Schema: `input: string`, `context: string`).
    *   `Gemini Node` (Schema: `model: string`, `stream: boolean`).
2.  **Execution**:
    *   Use a **Mock Runner** initially to simulate latency and events (prove the UI).
    *   Swap with **Vendored Runner** to execute real Breadboard code.
