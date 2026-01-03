# Pragmatic Use Findings: Tasker Integration

This document records the findings, friction points, and opportunities identified during the integration of `litflow` into the Tasker project (Jan 2026).

## 1. Overview
The integration involved using `litflow` to visualize task dependencies (DAGs) in a "Dependency Intelligence" feature. Specifically, it was used for an **Impact Graph Modal** that shows the downstream reach of a specific task.

## 2. Findings & Friction Points

### A. Geography vs. Topology
- **Finding:** `litflow` currently treats "position" as a required primitive for every node.
- **Friction:** In Tasker, the data is purely topological (relationships). Requiring the consumer to implement a layout algorithm (BFS layering) is a high barrier to entry.
- **Opportunity:** `litflow` should provide a "Zero-Config" layout mode where it calculates positions automatically if they aren't provided.

### B. Sub-Graph Extraction
- **Finding:** Visualizing "Impact" required isolating a specific sub-graph from a global project list.
- **Friction:** The consumer had to manually traverse the graph (BFS) to identify reachable nodes before passing them to `lit-flow`.
- **Opportunity:** A native `focus` or `isolate` API would allow consumers to simply pass the full graph and a target node ID.

### C. Visual Scent & Consistency
- **Finding:** Tasker uses Material 3 (M3) heavily. 
- **Friction:** Customizing `litflow` nodes to match the "headline/supporting-text" pattern of `@material/web` requires significant custom CSS or node templates.
- **Opportunity:** Providing "Standard Node Slots" would improve out-of-the-box consistency for M3 applications.

### D. TypeScript Integration
- **Finding:** Consuming the local package in a separate Vite/TS project resulted in resolution errors.
- **Friction:** Required `@ts-ignore` for imports.
- **Opportunity:** Flatten and audit the `types` export in `package.json` to ensure clean resolution.

## 3. Recommended Roadmap Adjustments
1. **Automated Layout Engine (High Priority)**
2. **Native Sub-Graph Filtering (Medium Priority)**
3. **M3 Template Compatibility (Low Priority)**

## 4. Implementation & Resolutions (v0.4.0)

Based on the roadmap adjustments, the following features were implemented to address the friction points in the v0.4.0 release:

-   **Automated Layout Engine (`hf4.1`):**
    -   **Resolution:** A `layout-enabled` boolean attribute was added to the `<lit-flow>` component. When set to `true`, `litflow` now uses the `dagre` library to automatically calculate a hierarchical layout. This directly fulfills the "Zero-Config" opportunity and allowed Tasker to delete its custom layout logic.

-   **Native Sub-Graph Filtering (`hf4.2`):**
    -   **Resolution:** New `isolateSubgraph(nodeId, direction)` and `clearIsolation()` methods were added to the `<lit-flow>` component. This removes the need for manual graph traversal in consuming apps.

-   **M3 Template Compatibility (`hf4.5`):**
    -   **Resolution:** The default `<lit-node>` component was updated to include named slots: `<slot name="headline">` and `<slot name="supporting-text">`.

-   **TypeScript Integration (`hf4.3`):**
    -   **Resolution:** Updated `tsconfig.types.json` and `package.json` exports to ensure clean type resolution.

## 5. Postmortem: Runtime Regression (v0.4.0 Integration)

### Issue: Style Inheritance Crash
During the integration into Tasker, a runtime crash occurred because the consumer attempted to inherit styles via `static styles = [...LitNode.styles]`.

### Root Cause:
`LitNode` was implemented without an explicit static `styles` property (using inline styles in `render` instead). This violated standard Lit component inheritance expectations and caused a `TypeError` in the consumer's bundle.

### Lesson Learned:
Base components in a library should explicitly define a `static styles` property—even if empty—to ensure safe extensibility for consumers who wish to theme or override them. formalizing this property is recommended for the next `litflow` patch.