---
layout: base.njk
title: API Reference
---

# Reference

Technical documentation for the LitFlow API, components, and properties.

<lit-flow style="height: 300px; display: block; border: 1px solid #eee; border-radius: 8px;" pan-on-drag="false" zoom-on-scroll="false">
  <lit-node id="api" type="default" label="lit-flow" position-x="250" position-y="120" style="background: var(--md-sys-color-primary-container)"></lit-node>
  <lit-node id="props" type="default" label="Properties" position-x="100" position-y="50"></lit-node>
  <lit-node id="events" type="default" label="Events" position-x="400" position-y="50"></lit-node>
  <lit-node id="methods" type="default" label="Methods" position-x="250" position-y="220"></lit-node>
</lit-flow>

## Component API

- `<lit-flow>`
- `<lit-node>`
- `<lit-handle>`
- `<lit-edge>`

## Edge Properties

Edges in LitFlow support the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique identifier for the edge. |
| `source` | `string` | ID of the source node. |
| `target` | `string` | ID of the target node. |
| `type` | `string` | Edge type: `bezier`, `straight`, `step`, `smoothstep`. |
| `markerEnd` | `string \| object` | Marker at the end of the edge (e.g., `arrowclosed`). |
| `markerStart` | `string \| object` | Marker at the start of the edge. |
| `label` | `string` | (Coming soon) Text label for the edge. |
| `selected` | `boolean` | Whether the edge is currently selected. |
