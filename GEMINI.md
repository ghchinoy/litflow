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
- **Boolean Attribute Conversion**: Lit's default boolean converter treats any present attribute as `true`. Use a custom `boolConverter` to correctly handle `attribute="false"` strings from HTML.
- **Static Display Mode**: Disable `XYPanZoom` and `XYDrag` via properties (`pan-on-drag="false"`, etc.) to create read-only documentation graphs while maintaining custom interactivity (like group toggles).
- **Edge Re-routing**: When collapsing groups, manually re-route edges from children to the parent group node in the event handler to maintain visual connectivity.
- **Signal Typing**: Use `ReturnType<typeof signal<T>>` for store properties to ensure robust TypeScript support.
- **SignalWatcher Type Fix**: To avoid `TS4020` errors during type generation, use a type cast for `SignalWatcher(LitElement)` to hide private internal types from the exported class.
- **Z-Index Layering**: Avoid negative `zIndex` values for nodes, as they can be hidden behind the canvas background in a WebComponent environment. Use positive relative values (e.g., 0 for groups, 1 for children).
- **Custom Node State**: Custom nodes with interactive state (like collapse/expand) must sync that state through the `data` property. This ensures the state persists when the parent flow re-renders the nodes array.
- **Subflow Coordinates**: Always call `updateAbsolutePositions` immediately after `adoptUserNodes` to ensure nested nodes have correct canvas-relative coordinates for the initial render.
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

### Development Plan (High-Level)
The project follows a phased approach to replicate and extend `xyflow` capabilities for Lit:
- **Phase 1: Core Infrastructure**: Basic nodes, edges, and viewport management.
- **Phase 2: Interactivity**: Selection, dragging, and manual connections.
- **Phase 3: Advanced Features**: Subflows, custom nodes, and utility components (MiniMap/Controls).
- **Phase 4: Visual Polish & DX**: Material 3 styling, packaging for reuse, and AI-specific nodes.
- **Phase 5: Integration**: Graphviz parsing and persistence.

*Detailed task tracking is managed via `bd` (beads).*
