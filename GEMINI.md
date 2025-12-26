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
- **State Management**: Use `@lit-labs/signals` for fine-grained reactivity (nodes, edges, transform) to avoid unnecessary full-graph re-renders.
- **Styling**: Adhere to **Material 3** design principles. Use M3 design tokens for colors, typography, and elevation.
- **Dynamic Components**: Use `lit/static-html.js` (`unsafeStatic`) when rendering components based on dynamic `nodeTypes` to allow user-defined WebComponents.
- **Handle Measurement**: Always measure handles in the `_updateNodeDimensions` cycle and store them in `node.internals.handleBounds`. This ensures edges connect correctly to specific ports.
- **Shell Scripts**: Provide `.sh` scripts for common developer tasks (e.g., starting servers, running tests) to improve DX.
- **Example Structure**: Each example should reside in its own subdirectory within `examples/` and include an `index.html` or a dedicated entry point.

### Technical Insights & Lessons Learned
- **Headless Core**: `@xyflow/system` is truly headless but requires manual orchestration of `XYPanZoom` and `XYDrag`.
- **Signal Typing**: Use `ReturnType<typeof signal<T>>` for store properties to ensure robust TypeScript support with `@lit-labs/signals`.
- **Unwrapping Signals**: Always unwrap signals (e.g., `this._state.nodes.get()`) when passing state to `@xyflow/system` instances like `XYDrag` or `XYPanZoom`, as they expect raw values.
- **Attribute Mapping**: Use `attribute: 'kebab-case'` in `@property` decorators to ensure HTML attributes (e.g., `show-controls`) correctly sync with camelCase properties.
- **Dimension Tracking**: Use `ResizeObserver` on the host component to track its own dimensions and provide them to child components (like MiniMap) that require absolute pixel values.
- **Host Styling**: Always include `display: block` (or similar) in `:host` styles for custom elements to ensure they occupy space correctly in the layout.
- **Node & Handle Measurement**: Accurate dragging and edge positioning depend on `measured` dimensions. Use `ResizeObserver` for nodes and manual measurement for handles to populate `node.internals.handleBounds`.
- **Shadow DOM Timing**: When measuring elements inside Shadow DOM (like handles), always `await element.updateComplete` to ensure Lit has finished rendering before measurement occurs.
- **Edge Rendering**: Custom elements (like `<lit-edge>`) do not render correctly inside `<svg>` tags. Use Lit's `svg` template literal directly within the parent component to render `<path>` elements in the correct namespace.
- **Edge Positioning**: Use `getHandlePosition` from `@xyflow/system` combined with `handleBounds` to calculate precise connection points for edges.
- **Selection Management**: Selection state (toggling `node.selected`) is currently handled manually in the `<lit-flow>` wrapper via click listeners.
- **State Syncing**: Sync `measured` dimensions and `position` data back from internal lookups to the user-facing `nodes` array. This prevents data loss when `adoptUserNodes` is called (which clears internal state).
- **Non-Destructive Updates**: Use `updateAbsolutePositions` for routine updates (like resizing or dragging) instead of `adoptUserNodes` to avoid clearing the internal node lookup.
- **Dynamic Cleanup**: When removing nodes, the `edges` signal must be manually filtered to remove connections to the deleted nodes.
- **DOM Management**: `XYDrag` requires direct DOM references; use Lit's `@query` or `shadowRoot` to provide these after the first render.
- **SVG Layering**: Edges must be rendered in an SVG element that is a sibling to the nodes container within the viewport div to ensure correct coordinate alignment.
- **DX (Developer Experience)**: Use Vite for fast development and hot module replacement. Provide a `start-server.sh` (using `pnpm`) for quick access.

### Proposed Components
- `<lit-flow>`: The main viewport and container.
- `<lit-node>`: Base component for nodes.
- `<lit-edge>`: Base component for edges.
- `<lit-handle>`: Connection port component for nodes.

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
