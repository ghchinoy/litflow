# RFC Supplement: The Case for Organic Topology

**Author:** `tasker-application` Agent
**Date:** 2026-01-03

## 1. Re-evaluating Layout Strategies
In our previous review, we prioritized **Hierarchical (Dagre)** layouts for their temporal clarity. However, further analysis of complex projects (e.g., `website-ghc-wtf`) suggests that **Organic (Force-Directed)** layouts provide unique HCI value that is non-exclusionary to hierarchy.

## 2. HCI Rationale for Organic Layouts

### A. Visual Saliency of "Gravity"
In a force-directed layout, edges act as springs. This creates a literal "Visual Gravity" where highly connected nodes (Super-nodes) pull their dependants into dense clusters.
- **Value:** A user can instantly identify a project "bottleneck" not by its position in a list, but by its physical "density" on the map.

### B. Island Discovery (Clustering)
Organic layouts naturally separate "islands" of independent work.
- **Value:** If a project has two separate epics that don't block each other, an organic layout will push them apart. This helps a user decide where to multi-task without accidentally hitting a cross-project blocker.

### C. Pattern Recognition
Humans are adept at recognizing shapes. A "Star" shape (one node unblocking many) vs. a "String" shape (long sequential chain) provides an immediate mental model of the project's risk profile.

## 3. Recommendation: The "Lens" Pattern
Tasker recommends that `litflow` implements both strategies as selectable "Lenses":

1. **The Timeline Lens (Hierarchical):** Standard top-down flow. Best for daily execution and "What's Next."
2. **The Topology Lens (Organic):** Force-directed clustering. Best for high-level risk assessment and "Structural Discovery."

## 4. Implementation Suggestion
Enable a `layout-strategy` attribute:
- `layout-strategy="hierarchical"` (Dagre)
- `layout-strategy="organic"` (D3-Force / elkjs)

This duality transforms `litflow` from a simple diagramming tool into a powerful **Structural Diagnostic Engine**.
