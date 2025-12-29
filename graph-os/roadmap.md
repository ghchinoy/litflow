# LitFlow Roadmap: Towards a Graph OS Interface

**Date:** 2025-12-29
**Status:** Draft / Proposal

## 1. Vision
LitFlow aims to be the **lightweight, web-standard interface** for graph-based applications. It bridges the gap between:
1.  **Documentation Tools**: Simple, template-based graphs for explaining concepts (Visual).
2.  **AI IDEs**: Powerful, schema-driven environments for executing Generative AI flows (Functional).

**Core Philosophy: "Visual First, Execution Optional"**
Users should be able to draw a graph just for documentation (using simple HTML templates) without needing a complex runtime. However, when they need power, they can "upgrade" nodes to be Schema-driven and executable via the Breadboard Core.

---

## 2. Milestone 1: The Schema Foundation
*Focus: Bridging the UI gap between static HTML and dynamic Data.*

- [ ] **`lit-schema-node`**: Create a new node component that renders inputs/outputs dynamically based on a Breadboard `NodeDescriptor`.
- [ ] **`lit-chiclet`**: Implement the visual "pill" component for displaying typed data (Text, Image, Audio) on node surfaces.
- [ ] **Hybrid Palette**: Update the Designer palette to support both "Static Nodes" (current) and "Schema Nodes" (new).

## 3. Milestone 2: The Runtime Adapter
*Focus: Connecting LitFlow to the Breadboard Execution Engine.*

- [ ] **`LitFlowGraphStore`**: A light wrapper around `MutableGraphStore` that syncs Breadboard's data model to LitFlow's `nodes`/`edges` array.
- [ ] **`LitFlowRunner`**: A class that wraps the Breadboard `HarnessRunner`. It listens for events (`nodestart`, `nodeend`) and dispatches them to LitFlow.
- [ ] **Visual State Mapping**: Update `lit-node` (and `lit-schema-node`) to react to execution states (`status="working"`, `status="error"`).

## 4. Milestone 3: The AI Experience
*Focus: Enabling multimodal Generative AI workflows.*

- [ ] **Streaming Support**: enhance `lit-chiclet` to handle streaming text updates from the runner.
- [ ] **Input Bubbling**: Implement a UI (Inspector or Modal) to handle `input` events from the harness (Human-in-the-loop).
- [ ] **GenAI Styling**: Adopt the "Generative" visual language (colors, icons) for AI-capable nodes.

## 5. Milestone 4: The Full IDE
*Focus: Turning the "Designer" example into a robust tool.*

- [ ] **Subgraphs**: Support expanding/collapsing subgraphs (driven by Breadboard's graph nesting).
- [ ] **History**: Integrate Breadboard's Undo/Redo stack with the LitFlow designer.
- [ ] **Persistence**: Save/Load graphs to local storage or file system.

---

## 6. Strategic FAQ

**Q: How do we retain approachability?**
**A:** We keep the current `lit-node` architecture. If a user just wants to draw a diagram, they write HTML. They don't need schemas. The "Runtime" features are strictly opt-in.

**Q: Why use Breadboard's Core?**
**A:** It solves the hardest problems of GenAI: serialization, execution order, multimodal data handling, and backend integration. Re-implementing this in LitFlow would be redundant.

**Q: What about xyflow?**
**A:** We keep it. `xyflow` handles the physics (zoom, pan, drag) perfectly. We focus our innovation on the **Node Surface** (what happens *inside* the box) and the **Runtime Bridge** (what happens *between* the boxes).

## 7. Architecture Mapping (The Rosetta Stone)

| Concept | xyflow (The Physics) | Breadboard (The Brains) | LitFlow (The Interface) |
| :--- | :--- | :--- | :--- |
| **The Graph** | `nodes[]`, `edges[]` | `GraphDescriptor` | `GraphStore` (Reactive Adapter) |
| **The Unit** | `<Node>` Component | `NodeDescriptor` | `<lit-schema-node>` |
| **Inputs/Outputs** | `<Handle>` Component | `Schema` / `Ports` | `<lit-handle>` (Dynamic) |
| **Data Flow** | Edges (Visual) | Harness Events | `LitFlowRunner` |
| **Rich Data** | Custom HTML | `LLMContent` / Behaviors | `<lit-chiclet>` |

*   **xyflow Users**: Think of Breadboard as a "State Management Library" for your graph.
*   **Breadboard Users**: Think of LitFlow as a "Native Web Component Renderer" for your graphs.
