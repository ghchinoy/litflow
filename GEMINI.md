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
- **Importing Tasks**: Use `bd sync --import-only` if the task database (`.beads/issues.jsonl`) has changed externally (e.g., after a git pull) to update your local state without overwriting.
- See [AGENTS.md](./AGENTS.md) for the mandatory session completion workflow and critical rules for AI agents.

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
- **Edge Markers**: SVG markers (arrowheads) must be defined in a `<defs>` section within the `<svg>` element. To support color changes (e.g., for selection), define separate markers for different states (e.g., `lit-flow__arrow` and `lit-flow__arrow-selected`).
- **Marquee Selection**: To implement marquee selection, disable `XYPanZoom` panning (`userSelectionActive: true`) during the drag. Use the `project()` method to translate the screen-space selection rectangle into canvas-space coordinates for intersection testing against `nodeLookup`. For better UX, perform "live" selection by updating the state during `pointermove` rather than only on `pointerup`.
- **Keyboard Interactivity**: To support keyboard shortcuts (e.g., Delete, Arrow keys), the main renderer must have a `tabindex="0"` and an `outline: none` (or custom focus style). Always check `e.target` to ensure shortcuts don't trigger while the user is typing in an input or textarea.
- **Custom Node Data Sync**: Custom nodes should dispatch a bubbling, composed `node-data-change` event when their internal state changes. The parent `<lit-flow>` should listen for this and update the `nodes` array to ensure the change persists across re-renders.
- **Selection Performance**: When implementing marquee selection or bulk updates, check if the selection state actually changed before updating the `nodes` or `edges` signals. Use a `Map` for node selection status to avoid O(N) lookups when determining if an edge's source and target are both selected.
- **Global Event Observability**: To support external tools (like a JSON inspector) that need to react to any graph change (dragging, connecting, deleting), dispatch a generic `change` event from the central `<lit-flow>` component. Use a helper method like `_notifyChange()` and call it in property setters, drag handlers (`updateNodePositions`), and dimension updaters to ensure no mutation path is missed.
- **Example Complexity (Gap Analysis)**: When implementing complex examples (e.g., a "Designer"), perform a gap analysis against the desired end-state (e.g., "Minimal Viable Designer"). Create separate `bd` tasks for missing features (Creation, Modification, Deletion) rather than building everything in one go.
- **Documentation Patterns**: For complex examples with custom layouts or CSS, embed them in documentation markdown files using an `iframe` pointing to the standalone example (e.g., `/examples/designer/index.html`). This avoids style conflicts and ensures the example works exactly as developed.
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

### Feature Implementation Workflow
When adding new features to LitFlow, follow this sequence:
1.  **Core Support**: Update `src/lit-flow.ts` (and other core components) to support the new properties/logic.
2.  **Visual States**: Ensure the feature respects selection and theme states (e.g., separate SVG markers for selected edges).
3.  **Example Integration**: Update existing examples (e.g., `basic`, `subflows`) to demonstrate the feature.
4.  **Dedicated Showcase**: If the feature has many options, create a dedicated example in `examples/`.
5.  **Documentation**: Update `README.md`, Diataxis docs in `docs/src/`, and `GEMINI.md` technical insights.
6.  **Versioning**: Increment the version in `package.json` (see below).

### Verification & Testing
Currently, the project relies on visual verification via the `examples/` directory.
- **Manual Verification**: Run `pnpm dev` and navigate to `examples/overview/index.html` to verify core features (dragging, selection, AI nodes, subflows).
- **Build Check**: Always run `pnpm run build` before committing major changes to catch TypeScript errors.
- **Linting**: (Future) Integrate ESLint/Prettier for code style consistency.

### Publishing Workflow
To release a new version of `@ghchinoy/litflow`:
1.  **Verify**: Run `pnpm run build` to ensure no TypeScript or build errors.
2.  **Update Changelog**: Fully regenerate `CHANGELOG.md` from closed tasks:
    ```bash
    echo -e "# Changelog\n\nAll notable changes to this project will be documented in this file.\n" > CHANGELOG.md && bd list --status closed --json | jq -r 'sort_by(.closed_at) | reverse | map(select(.closed_at != null)) | group_by(.closed_at[0:10]) | .[] | "## " + (.[0].closed_at[0:10]) + "\n" + (map("- " + .title + " (" + .id + ")") | join("\n")) + "\n"' >> CHANGELOG.md
    ```
    *Review and commit the changelog.*
3.  **Version Bump**: 
    - `pnpm version patch`: For bug fixes and small, non-breaking features.
    - `pnpm version minor`: For significant new features or architectural changes.
    *Note: This creates a local git commit and tag.*
4.  **Push**: `git push origin main --tags` to sync the version bump and tag to GitHub.
5.  **Publish**: `pnpm publish --access public`.
    *Note: If `pnpm` reports an "Unclean working tree" due to ignored files (like `bd` artifacts), use `pnpm publish --access public --no-git-checks` after verifying the build and git status manually.*
*Note: The `prepublishOnly` script in `package.json` ensures a fresh build before every publish.*

### Proposed Components
- `<lit-flow>`: The main viewport and container.
- `<lit-node>`: Base component for nodes.
- `<lit-edge>`: Base component for edges.
- `<lit-handle>`: Connection port component for nodes.

## 📖 Documentation
- [Tutorials](./docs/src/tutorials/index.md): Step-by-step guides.
- [Guides](./docs/src/guides/index.md): Practical instructions.
- [Explanation](./docs/src/explanation/index.md): Architectural deep dives.
- [Reference](./docs/src/reference/index.md): API documentation.
- [Examples](./docs/src/examples/index.md): Interactive showcases.
- [GEMINI.md](./GEMINI.md): Project conventions and technical insights for AI agents.

### Development Plan (High-Level)
The project follows a phased approach to replicate and extend `xyflow` capabilities for Lit:
- **Phase 1: Core Infrastructure**: Basic nodes, edges, and viewport management.
- **Phase 2: Interactivity**: Selection, dragging, and manual connections.
- **Phase 3: Advanced Features**: Subflows, custom nodes, and utility components (MiniMap/Controls).
- **Phase 4: Visual Polish & DX**: Material 3 styling, packaging for reuse, and AI-specific nodes.
- **Phase 5: Integration**: Graphviz parsing and persistence.

*Detailed task tracking is managed via `bd` (beads).*
