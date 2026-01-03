# Pragmatic Use Findings (Part 2): Full Project Topology

This document records second-phase findings from implementing a full-project Directed Acyclic Graph (DAG) view in Tasker using `litflow` v0.4.0.

## 1. Overview
Phase 2 integration involved visualizing the *entire* task dependency network for a project, rather than just isolated subgraphs. This tested `litflow`'s automated layout and state management under higher node counts (50+ nodes).

## 2. Findings & Performance

### A. Auto-Layout Success
- **Finding:** The native `dagre` integration in v0.4.0 is a resounding success.
- **Impact:** It allowed for the complete removal of custom geometric logic in the consuming application.
- **Friction:** None. The `layout-enabled` attribute worked exactly as intended.

### B. Viewport Management (Gather/Fit)
- **Finding:** For large graphs, the `fitView()` behavior is critical.
- **Friction:** When switching tabs or filtering nodes (e.g., toggling "Show Closed"), the graph can sometimes become off-center or requires manual zooming to find the new bounds.
- **Opportunity:** Consider an optional `auto-fit` attribute that triggers `fitView()` whenever the `nodes` or `edges` properties change significantly.

### C. Large Graph Navigation
- **Finding:** `show-controls` provides essential UX for navigating dense networks.
- **Opportunity:** The native control buttons (zoom/fit) could benefit from more granular styling control (CSS parts) to better match custom application headers.

### D. Component State Sync
- **Finding:** The `isolateSubgraph` API is excellent for modals, but for persistent tabs, the ability to "clear" isolation and return to a global view must be perfectly synchronized with the internal state.
- **Observation:** `litflow` correctly handles state resets, but the consumer must be careful with timing (using `setTimeout` or `requestAnimationFrame`) to ensure the DOM is ready before calling imperative methods.

## 3. Recommended Roadmap Adjustments (Phase 3)
1. **Auto-fit on Update (Medium Priority):** Automatic bounds calculation on node change.
2. **CSS Parts for Controls (Low Priority):** Standardizing internal element exposure for theming.
3. **Reactive Isolation (Medium Priority):** Exploring a declarative way to isolate subgraphs via attributes rather than just imperative methods.
