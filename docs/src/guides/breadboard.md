---
layout: base.njk
title: Breadboard Integration (Graph OS)
---

# LitFlow User Guide: From Visualization to Execution

**Date:** 2025-12-29
**Subject:** Building Graph Applications with LitFlow

LitFlow supports two distinct modes of operation. You can start with **Mode 1 (Visual)** and graduate to **Mode 2 (Executable)** as your needs grow.

---

## Mode 1: The Visualizer (Basic)
**Best for**: Documentation, diagrams, simple prototypes, static UIs.

In this mode, you define nodes using standard HTML templates. You manually place handles where you want them.

### Key Concepts
*   **Template-First**: The UI drives the node structure.
*   **Static Ports**: You decide "I want a handle here".
*   **No Engine**: It's just a drawing tool.

### Example Code
```javascript
// Register a custom visual node
@customElement('my-node')
class MyNode extends LitElement {
  render() {
    return html`
      <div class="card">
        <h3>My Node</h3>
        <lit-handle type="target" position="left"></lit-handle>
        <lit-handle type="source" position="right"></lit-handle>
      </div>
    `;
  }
}

// Use it in LitFlow
flow.nodeTypes = { custom: 'my-node' };
flow.nodes = [{ id: '1', type: 'custom', position: { x: 0, y: 0 } }];
```

---

## Mode 2: The Graph OS (Advanced)
**Best for**: Generative AI tools, Data Processing, "No-Code" Editors.

In this mode, you define nodes using **Data Schemas**. LitFlow automatically generates the UI (handles, inputs, outputs) based on the schema. The graph can then be executed by the **Breadboard Engine**.

### Key Concepts
*   **Schema-First**: The Data defines the UI. A node with an `image` input automatically gets an image uploader or handle.
*   **Execution**: The graph is a program. It has state (`working`, `error`) and data flow.
*   **Chiclets**: Data on the node surface is visualized as interactive pills ("Chiclets").

### How to Transition
1.  **Switch to `LitSchemaNode`**: Instead of writing HTML, define a JSON Schema.
2.  **Use `LitFlowRunner`**: Pass your graph to the runner to execute it.

### Example Code

**1. Define the Schema (The Contract)**
```javascript
const promptSchema = {
  type: 'object',
  properties: {
    // Behavior: 'llm-content' tells LitFlow this is rich AI data
    prompt: { title: 'Prompt', type: 'string', behavior: ['llm-content'] }
  }
};
```

**2. Configure the Node**
```javascript
flow.nodes = [{ 
  id: 'gemini', 
  type: 'schema', // Uses the built-in LitSchemaNode
  data: { 
    label: 'Gemini 3',
    inputSchema: promptSchema
  }
}];
```

**3. Execute (The Engine)**
```javascript
import { LitFlowRunner } from 'litflow/breadboard';

const runner = new LitFlowRunner(graph);

// Bind UI to Engine Events
runner.addEventListener('nodestart', (e) => {
  const node = flow.querySelector(`[data-id="${e.detail.node.id}"]`);
  node.status = 'working'; // Visual "Glow"
});

await runner.run();
```

### Prototyping with Mocks
Before you have a full backend, you can use `MockRunner` to simulate execution. This allows you to design the UI and interactions without waiting for the engine.

```javascript
import { MockRunner } from 'litflow/breadboard/runner';
const runner = new MockRunner({});
// ... same API as real runner
```

### Critical: State Persistence
When updating nodes based on execution events (e.g. showing a result Chiclet), you must update the **LitFlow State**, not just the DOM element.

**Incorrect (DOM only)**:
```javascript
nodeElement.data = newData; // Will be lost on next re-render!
```

**Correct (State update)**:
```javascript
// Update the central state to persist changes
flow.nodes = flow.nodes.map(n => 
  n.id === targetId ? { ...n, data: { ...n.data, ...newData } } : n
);
```

---

## Summary Comparison

| | **Visualizer Mode** | **Graph OS Mode** |
| :--- | :--- | :--- |
| **Node Definition** | HTML / CSS Templates | JSON Schema |
| **Ports** | Manual `<lit-handle>` | Auto-generated from Schema |
| **Data** | Static Attributes | Dynamic "Chiclets" |
| **Runtime** | None (Drag & Drop only) | Breadboard Engine (Real-time) |

**Recommendation**: Start with Mode 1 to learn the library. Move to Mode 2 when you need to build a functional AI application.
