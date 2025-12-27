---
layout: base.njk
title: Building Static Documentation with LitFlow
---

# Tutorial: Building Static Documentation with LitFlow

This tutorial walks you through creating a read-only, interactive graph for documentation using LitFlow.

## 1. Basic Setup

First, ensure you have LitFlow installed in your project:

```bash
npm install @ghchinoy/litflow
```

In your HTML or Markdown file (if it supports custom elements), import the library:

```html
<script type="module">
  import '@ghchinoy/litflow';
</script>
```

## 2. Disabling Interactivity

For documentation, you usually want to prevent users from accidentally moving nodes or panning the canvas. Use the following attributes on the `<lit-flow>` element:

```html
<lit-flow 
  id="my-doc-flow"
  show-grid="false"
  nodes-draggable="false"
  nodes-connectable="false"
  pan-on-drag="false"
  zoom-on-scroll="false"
  zoom-on-pinch="false"
  zoom-on-double-click="false"
  style="width: 100%; height: 400px; border: 1px solid #eee;"
></lit-flow>
```

### Key Attributes:
- `show-grid="false"`: Removes the background grid for a cleaner look.
- `nodes-draggable="false"`: Prevents users from moving nodes.
- `pan-on-drag="false"`: Locks the canvas position.
- `zoom-*="false"`: Disables all zooming methods.

## 3. Adding Data

Now, populate the graph with nodes and edges. Since it's a WebComponent, you can do this imperatively:

```javascript
const flow = document.getElementById('my-doc-flow');

flow.nodes = [
  { id: '1', position: { x: 50, y: 50 }, data: { label: 'Input Source' } },
  { id: '2', position: { x: 250, y: 50 }, data: { label: 'Processing Engine' } },
  { id: '3', position: { x: 450, y: 50 }, data: { label: 'Output Sink' } }
];

flow.edges = [
  { id: 'e1-2', source: '1', target: '2', type: 'smoothstep' },
  { id: 'e2-3', source: '2', target: '3', type: 'smoothstep' }
];
```

## 4. Maintaining Custom Interactivity (Groups)

Even in a "static" graph, you might want users to be able to explore details. A common pattern is the **Collapse/Expand** toggle for groups.

### Register the Group Node
If you are using a custom group node (like the one in our examples):

```javascript
import './path/to/group-node.js';

flow.nodeTypes = {
  ...flow.nodeTypes,
  'group': 'group-node'
};
```

### Handle the Collapse Event
Add a listener to handle the resizing and edge re-routing when a group is toggled:

```javascript
flow.addEventListener('group-collapse', (e) => {
  const { id, collapsed } = e.detail;
  
  flow.nodes = flow.nodes.map(node => {
    if (node.id === id) {
      return { 
        ...node, 
        data: { ...node.data, collapsed },
        width: collapsed ? 150 : 400, 
        height: collapsed ? 80 : 250 
      };
    }
    if (node.parentId === id) {
      return { ...node, hidden: collapsed };
    }
    return node;
  });
});
```

## 5. Summary

By combining **declarative attributes** (to lock the UI) with **imperative data updates** (to handle custom logic), you can create powerful, interactive diagrams that fit perfectly into any documentation site.
