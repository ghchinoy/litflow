---
layout: base.njk
title: Layouts & Lenses
---

# Layouts & Lenses

One of LitFlow's most powerful features is its ability to automatically position nodes based on their relationships. This guide explains how to use the different layout strategies (Lenses) available in the library.

## Enabling Automatic Layout

To enable automatic layout, add the `layout-enabled` attribute to your `<lit-flow>` element. When enabled, any node provided without an explicit `position` will be arranged automatically.

```html
<lit-flow layout-enabled></lit-flow>
```

## Selecting a Layout Strategy

LitFlow supports three primary layout strategies, each suited for different types of data. You can switch between them using the `layout-strategy` attribute.

### 1. Hierarchical (Dagre)
**Default strategy.** Best for Directed Acyclic Graphs (DAGs) and complex workflows.

- **Usage:** `layout-strategy="hierarchical"`
- **Strengths:** Handles nodes with multiple parents and complex interconnectivity.
- **Direction:** Can be controlled via `layout-direction="LR"` (Left-to-Right) or `"TB"` (Top-to-Bottom).

### 2. Organic (D3-Force)
Best for discovering relationships and identifying clusters in dense networks.

- **Usage:** `layout-strategy="organic"`
- **Strengths:** Provides a "living" feel where nodes push each other away until they find an overlap-free equilibrium. It naturally separates independent clusters.
- **Visual Scent:** Organic and fluid.

### 3. Tree (D3-Hierarchy)
Best for strict parent-child relationships like Organizational Charts or File Systems.

- **Usage:** `layout-strategy="tree"`
- **Strengths:** Produces perfectly symmetrical and aesthetically pleasing tree structures.
- **Restriction:** Fails if cycles or multiple parents are detected (falls back to hierarchical).

## Controlling Direction

For Hierarchical and Tree layouts, you can control the primary flow direction using the `layout-direction` attribute.

```html
<!-- Top-to-Bottom flow -->
<lit-flow layout-enabled layout-direction="TB"></lit-flow>

<!-- Left-to-Right flow -->
<lit-flow layout-enabled layout-direction="LR"></lit-flow>
```

When you switch the direction, LitFlow automatically updates the handle orientation (side vs top/bottom) to ensure edges follow the cleanest possible path.

## Viewport Stability (Auto-Fit)

When the graph changes significantly (e.g., switching strategies or loading new data), the nodes may move outside the current viewport. Enable `auto-fit` to keep the graph centered and visible.

```html
<lit-flow layout-enabled auto-fit></lit-flow>
```

## The "Render-Measure-Reflow" Cycle

To provide a "Zero-Config" experience, LitFlow performs a two-pass render:
1. **Pass 1:** Nodes are rendered invisibly so the browser can calculate their real width and height.
2. **Pass 2:** The layout engine is triggered with these exact dimensions, and nodes "slide" into their perfect positions.

This ensures that nodes never overlap, even if they have dynamic content or custom styling.
