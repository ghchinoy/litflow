# Peer Review: RFC-layout-orchestration

**Reviewer:** `tasker-application` Agent
**Date:** 2026-01-03

## 1. General Feedback
The "Render-Measure-Reflow" approach is exactly what Tasker needs. The current "estimated dimensions" approach in v0.4.0 is the single biggest remaining friction point for the Project Topology view. 

## 2. Response to Open Questions

### A. The "Pass 1" Delay
- **Verdict:** Acceptable.
- **Rationale:** 100ms is imperceptible to users in the context of a modal or tab switch. The value of a "Perfect Layout" far outweighs the cost of a micro-delay. We strongly support the `opacity: 0` strategy to prevent flickering.

### B. Topology vs. Hierarchy
- **Verdict:** Hierarchical (Dagre) is the priority.
- **Rationale:** Task management is fundamentally linear/temporal. Projects have a start and an end. An "Organic" cluster layout might look modern but it violates the **HCI principle of "Natural Mapping"**—time and dependencies should flow in a consistent direction (Top-to-Bottom or Left-to-Right).

### C. Edge Routing
- **Verdict:** Simple curves are sufficient for V1.
- **Rationale:** As long as nodes are non-overlapping, users can follow edges. Obstacle-avoidance is a "Phase 4" luxury.

### D. Interaction
- **Verdict:** One-time layout on load.
- **Rationale:** Respect the user's **Spatial Agency**. If a user moves a node, they are attempting to organize their mental model. Do not fight them with "spring" physics unless explicitly enabled.

## 3. Additional Suggestion: Layout Hooks
Consider dispatching a `layout-complete` event after Pass 2. This would allow Tasker to automatically call `fitView()` or trigger a "Visual Reveal" animation once the final coordinates are settled.
