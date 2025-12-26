# Gemini Project Context & Conventions - LitFlow

This document provides context and conventions for the `litflow` project, which aims to integrate `xyflow` with Lit WebComponents.

## Project Overview
`litflow` is a project dedicated to creating Lit WebComponent examples and potentially a library wrapper for `xyflow`. It leverages the core logic from the `xyflow` project.

## Issue Tracking (Beads)
This project uses **bd (beads)** for issue tracking.
- `bd ready` - Find unblocked work
- `bd create "Title" --type task --priority 2` - Create issue
- `bd close <id>` - Complete work
- `bd sync` - Sync with git (run at session end)

## Package Management
- **Package Manager**: [pnpm](https://pnpm.io/) is used for dependency management. Use `pnpm install` and `pnpm dev`.

### Coding Conventions
- **Language**: TypeScript is used for core logic and components.
- **Framework**: [Lit](https://lit.dev/) for WebComponents.
- **Issue Tracking**: Use `bd` (beads) for all task management.
- **State Management**: Use `@lit-labs/signals` for fine-grained reactivity. Components must use the `SignalWatcher` mixin.
- **DOM Strategy**: Use **Light DOM** for child components (`<lit-node>`, `<lit-handle>`) by overriding `createRenderRoot`. This ensures compatibility with `@xyflow/system` utilities like `elementFromPoint`.
- **Styling**: Define styles for Light DOM children within the parent `<lit-flow>` ShadowRoot or via global CSS variables (design tokens).
- **Handle Measurement**: Always measure handles in the `_updateNodeDimensions` cycle and store them in `node.internals.handleBounds`.
- **Shell Scripts**: Provide `.sh` scripts for common developer tasks to improve DX.

### Technical Insights & Lessons Learned
- **Headless Core**: `@xyflow/system` is truly headless but requires manual orchestration of `XYPanZoom` and `XYDrag`.
- **Light DOM Necessity**: Child components must be in Light DOM for `@xyflow/system` to perform hit-testing and handle discovery across the graph.
- **Z-Index Layering**: Avoid negative `zIndex` values for nodes, as they can be hidden behind the canvas background in a WebComponent environment. Use positive relative values (e.g., 0 for groups, 1 for children).
- **Custom Node State**: Custom nodes with interactive state (like collapse/expand) must sync that state through the `data` property. This ensures the state persists when the parent flow re-renders the nodes array.
- **Subflow Coordinates**: Always call `updateAbsolutePositions` immediately after `adoptUserNodes` to ensure nested nodes have correct canvas-relative coordinates for the initial render.
- **Edge Re-routing**: When collapsing groups, manually re-route edges from children to the parent group node to maintain visual connectivity.
- **Signal Typing**: Use `ReturnType<typeof signal<T>>` for store properties to ensure robust TypeScript support.
- **Unwrapping Signals**: Always unwrap signals (e.g., `this._state.nodes.get()`) when passing state to `@xyflow/system` instances.
- **Shadow DOM Timing**: When measuring elements (especially in Light DOM children), always `await element.updateComplete` to ensure rendering is finished.
- **Edge Rendering**: Use Lit's `svg` template literal directly within the parent component to render `<path>` elements in the correct SVG namespace.
- **State Syncing**: Sync `measured` dimensions and `position` data back from internal lookups to user-facing node objects to prevent data loss during `adoptUserNodes` calls.
- **Non-Destructive Updates**: Use `updateAbsolutePositions` for routine updates (resizing/dragging) instead of `adoptUserNodes` to avoid clearing the internal node lookup.
- **Event Propagation**: Stop propagation of `mousedown` and `touchstart` in `<lit-handle>` to prevent node dragging during connection attempts.
- **DX (Developer Experience)**: Use Vite for fast development. Provide a `start-server.sh` (using `pnpm`) for quick access.

### Proposed Components
- `<lit-flow>`: The main viewport and container.
- `<lit-node>`: Base component for nodes.
- `<lit-edge>`: Base component for edges.
- `<lit-handle>`: Connection port component for nodes.

## 📖 Documentation
- [Lit vs React for xyflow](./LIT_VS_REACT.md): A comparison of using Lit WebComponents vs React for building flow-based UIs.
- [Creating Custom Nodes](./CUSTOM_NODES.md): A primer on building complex, data-driven nodes in LitFlow.
- [GEMINI.md](./GEMINI.md): Project conventions and technical insights for AI agents.

### Development Plan (Phased Examples)
The project follows a phased approach to mirror `xyflow` examples for Lit:

### Phase 1: Core Infrastructure
- **Setup** (`litflow-8oj`): Create `examples/` directory and base runner.
- **Basic Flow** (`litflow-xzk`): Standard nodes and edges.
- **Overview** (`litflow-59h`): Comprehensive example with controls and minimap.

### Phase 2: Customization
- **Custom Nodes** (`litflow-aop`): Lit-based node templates.
- **Edge Types** (`litflow-8zz`): Step, SmoothStep, etc.
- **Multiple Handles** (`litflow-e6c`): Nodes with multiple ports.
- **Controls & MiniMap** (`litflow-04c`): Reusable Lit components.

### Phase 3: Advanced Features
- **Subflows** (`litflow-2lt`): Parent-child relationships.
- **Drag & Drop** (`litflow-lyd`): Sidebar to canvas interaction.
- **Node Resizer & Toolbar** (`litflow-p3c`): Utility components.
- **Gemini AI Nodes** (`litflow-ln0`): Prompt and Image generation nodes.

### Phase 4: Logic & Persistence
- **Save & Restore** (`litflow-tfx`): JSON serialization.
- **Validation** (`litflow-2fr`): Connection logic.
- **Graphviz to LitFlow** (`litflow-48p`): DOT file parsing and layout.
- **Interactivity** (`litflow-4bd`): Dynamic add/remove.
