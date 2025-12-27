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

## `<lit-flow>` Properties

| Property | Attribute | Type | Default | Description |
|----------|-----------|------|---------|-------------|
| `nodes` | - | `Node[]` | `[]` | Array of node objects. |
| `edges` | - | `Edge[]` | `[]` | Array of edge objects. |
| `nodeTypes` | - | `Record` | `{...}` | Mapping of node types to tag names. |
| `showControls` | `show-controls` | `boolean` | `false` | Show/hide the control panel. |
| `showMinimap` | `show-minimap` | `boolean` | `false` | Show/hide the minimap. |
| `showGrid` | `show-grid` | `boolean` | `true` | Show/hide the background grid. |
| `nodesDraggable` | `nodes-draggable` | `boolean` | `true` | Enable/disable node dragging. |
| `nodesConnectable` | `nodes-connectable` | `boolean` | `true` | Enable/disable manual connections. |
| `panOnDrag` | `pan-on-drag` | `boolean` | `true` | Enable/disable canvas panning. |
| `zoomOnScroll` | `zoom-on-scroll` | `boolean` | `true` | Enable/disable zoom on scroll. |
| `zoomOnPinch` | `zoom-on-pinch` | `boolean` | `true` | Enable/disable zoom on pinch. |
| `zoomOnDoubleClick` | `zoom-on-double-click` | `boolean` | `true` | Enable/disable zoom on double click. |
| `selectionMode` | `selection-mode` | `'pan' \| 'select'` | `'pan'` | Default interaction mode for background dragging. |
| `promptOnDrop` | `prompt-on-drop` | `boolean` | `false` | Whether to prompt for a label when a node is dropped. |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `connect` | `Connection` | Fired when a new connection is made. |
| `node-drop` | `{ node, event }` | Fired when a node is dropped onto the canvas. |
| `selection-change` | `{ nodes, edges }` | Fired when the selection changes via marquee. |
| `group-collapse` | `{ id, collapsed }` | Fired when a group node is collapsed or expanded. |

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
| `label` | `string` | Text label rendered at the path midpoint. |
| `selected` | `boolean` | Whether the edge is currently selected. |
