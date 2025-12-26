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

### Coding Conventions
- **Language**: TypeScript is used for core logic and components.
- **Framework**: [Lit](https://lit.dev/) for WebComponents.
- **Issue Tracking**: Use `bd` (beads) for all task management.
- **Shell Scripts**: Provide `.sh` scripts for common developer tasks (e.g., starting servers, running tests) to improve DX.
- **Example Structure**: Each example should reside in its own subdirectory within `examples/` and include an `index.html` or a dedicated entry point.

### Technical Insights & Lessons Learned
- **Headless Core**: `@xyflow/system` is truly headless but requires manual orchestration of `XYPanZoom` and `XYDrag`.
- **Node Measurement**: Accurate dragging and edge positioning depend on `measured` dimensions. Use `ResizeObserver` to track node size changes and update the `nodeLookup` accordingly.
- **State Syncing**: Lit's `@state` and `@property` must be carefully synced with `adoptUserNodes` and internal lookups. Ensure `updateNodePositions` updates both internal internals and user-facing node objects to maintain reactivity.
- **DOM Management**: `XYDrag` requires direct DOM references; use Lit's `@query` or `shadowRoot` to provide these after the first render.
- **SVG Layering**: Edges must be rendered in an SVG element that is a sibling to the nodes container within the viewport div to ensure correct coordinate alignment.
- **Event Handling**: `XYPanZoom` handles its own event listeners on the provided `domNode`, but `XYDrag` instances must be created/updated for each node element.
- **DX (Developer Experience)**: Use Vite for fast development and hot module replacement. Provide a `start-server.sh` for quick access.

### Proposed Components
- `<lit-flow>`: The main viewport and container.
- `<lit-node>`: Base component for nodes.
- `<lit-edge>`: Base component for edges.

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

### Phase 4: Logic & Persistence
- **Save & Restore** (`litflow-tfx`): JSON serialization.
- **Validation** (`litflow-2fr`): Connection logic.
- **Interactivity** (`litflow-4bd`): Dynamic add/remove.
