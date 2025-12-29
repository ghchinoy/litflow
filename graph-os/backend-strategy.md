# Backend & Execution Strategy

**Date:** 2025-12-29
**Subject:** The Universal Runtime & Polyglot Integration

## 1. The Core Decision: TypeScript as the "OS"
We prioritize **TypeScript** as the execution engine language for both Client (Browser) and Server (Cloud Run).

### Why TypeScript?
1.  **Isomorphism**: The *exact same* code (`HarnessRunner`, `NodeHandler`) runs in the browser and on the server.
    *   **Pro**: "Write once, run anywhere". Testing locally in the browser provides high confidence for server deployment.
    *   **Pro**: Single codebase maintenance for the Runner.
2.  **Breadboard Alignment**: The reference implementation of the Breadboard Protocol is TypeScript. Re-implementing the protocol (parsing, races, input bubbling) in Go or Python is high effort and risk.

## 2. The "Smooth Transition" Strategy
LitFlow enables users to start with local prototyping and graduate to enterprise deployment without changing their graph.

| Feature | **Client-Side (Prototyping)** | **Server-Side (Enterprise)** |
| :--- | :--- | :--- |
| **Engine** | TypeScript (`HarnessRunner`) | TypeScript (`HarnessRunner`) |
| **Secrets** | User Provided (LocalStorage). | Managed (Service Account / Secret Manager). |
| **Latency** | Zero (Local). | Network Round-trip. |
| **Use Case** | Personal Tools, Education. | Multi-user Apps, heavy compute. |

**Mechanism**: The UI simply switches the "Runner Context". The `GraphDescriptor` (JSON) remains identical.

## 3. Polyglot Integration (Go/Python)
We support existing Go/Python backends not by replacing the *OS* (Runner), but by treating them as **Applications** (Nodes).

*   **Scenario**: You have an existing Go backend doing heavy processing.
*   **Integration**:
    1.  Expose the Go logic as an HTTP API.
    2.  Use a generic `fetch` node (or a custom `GoService` node) in the Breadboard graph to call it.
*   **Result**: The graph orchestration logic stays in the TypeScript engine (managing control flow, parallelism), while the heavy lifting happens in your optimized Go service.

**Opal ADK Note**: Opal uses Python as its OS. This limits it to server-side only. By sticking to Breadboard (TS), LitFlow retains browser-native capabilities while still being able to call Opal agents as external services.

## 4. Verdict
*   **Roadmap Priority**: Focus 100% on the **TypeScript Runtime**. It gives us the full Client/Server spectrum for free.
*   **Legacy/Polyglot**: Integrate via API calls from the graph, keeping the orchestration logic unified.