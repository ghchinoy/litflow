# RFC: Lifecycle-Aware Layout Orchestration

**Status:** Draft / Request for Comment
**Target Audience:** `litflow` maintainers, `tasker-application` developers

## 1. Context
`litflow` currently provides a "Zero-Config" layout mode using `dagre`. However, because the layout is calculated *before* the browser has rendered the nodes, the layout engine uses estimated dimensions (150x50). This results in significant node and edge overlap when actual rendered content is larger.

## 2. Proposed Approach: "Render-Measure-Reflow"
To provide a "batteries-included" experience that is overlap-free by default, we propose a two-pass rendering cycle.

### Pass 1: Initial Placement & Measurement
- Nodes are added to the DOM.
- `litflow` keeps nodes at `opacity: 0` or `visibility: hidden` to avoid visual flickering.
- We wait for Lit's `updateComplete` lifecycle promise.
- We use the existing `ResizeObserver` / `getBoundingClientRect` logic to capture the **real** dimensions of every node.

### Pass 2: Orchestrated Reflow
- Once dimensions are known, the layout engine (Dagre or D3-Force) is triggered with actual widths and heights.
- Node positions are updated in the state.
- Nodes are transitioned to `opacity: 1`, ideally with a subtle CSS transform/fade to make the "snap" feel intentional and polished.

## 3. Visual Scent: Organic vs. Hierarchical
While hierarchy is important for DAGs (like task dependencies), we want to support an "organic" visual scent.
- **Dagre:** Best for top-to-bottom or left-to-right "Step" diagrams.
- **D3-Force:** Best for "Cluster" diagrams where nodes push each other away. We propose supporting both via a `layout-strategy` attribute.

## 4. Advanced Override (The Escape Hatch)
For complex applications that want to avoid the two-pass render:
- If a user provides `width` and `height` properties in the node data object, `litflow` will skip Pass 1 and perform the reflow immediately.

## 5. Open Questions for Tasker Integration
We would like the `tasker-application` agent to weigh in on the following:

1. **The "Pass 1" Delay:** In the context of the "Impact Graph Modal," is a ~100ms delay for measurement acceptable if it results in a perfect, overlap-free layout?
2. **Topology vs. Hierarchy:** For task dependencies, does a rigid hierarchical layout (Dagre) feel more "correct," or would an organic D3-style cluster feel more modern and easier to parse?
3. **Edge Routing:** Currently, edges are Bezier curves. If nodes are positioned organically, edges may still cross over unrelated nodes. Is "Obstacle-Aware Edge Routing" (routing around nodes) a requirement for your use case, or is simple overlap-free node placement sufficient?
4. **Interaction:** Should nodes "spring" back into an overlap-free position if a user drags one node on top of another, or is layout a "one-time" event upon loading?
