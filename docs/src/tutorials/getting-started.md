---
layout: base.njk
title: Getting Started
---

# Getting Started

Welcome to LitFlow! This tutorial will show you the fastest way to get a graph up and running using the **Zero-Config Automatic Layout** feature.

## 1. Installation

Install LitFlow using pnpm (or your preferred package manager):

```bash
pnpm add @ghchinoy/litflow
```

## 2. Basic HTML Structure

Create an HTML file and import the LitFlow library. Adding the `<lit-flow>` tag is all you need to get started.

```html
<!DOCTYPE html>
<html>
<body>
  <div style="width: 100vw; height: 100vh;">
    <lit-flow id="my-flow" layout-enabled show-controls></lit-flow>
  </div>

  <script type="module">
    import '@ghchinoy/litflow';
    
    const flow = document.getElementById('my-flow');
    
    // Define your nodes without needing to worry about X/Y positions!
    flow.nodes = [
      { id: 'start', type: 'input', data: { label: 'Start' } },
      { id: 'a', data: { label: 'Process A' } },
      { id: 'b', data: { label: 'Process B' } },
      { id: 'end', type: 'output', data: { label: 'End' } },
    ];

    // Define your connections
    flow.edges = [
      { id: 'e1', source: 'start', target: 'a', markerEnd: 'arrowclosed' },
      { id: 'e2', source: 'a', target: 'b', markerEnd: 'arrowclosed' },
      { id: 'e3', source: 'b', target: 'end', markerEnd: 'arrowclosed' },
    ];
  </script>
</body>
</html>
```

## 3. Key Concepts

### Automatic Layout
By adding the `layout-enabled` attribute, LitFlow will automatically calculate the positions of your nodes. This is ideal for dependency graphs or any data where the relationships (topology) are more important than the specific coordinates.

### Declarative vs. Programmatic
You can define nodes and edges programmatically via the `.nodes` and `.edges` properties (as shown above), or declaratively using HTML tags inside the `<lit-flow>` component.

### Material 3 Integration
LitFlow nodes are designed to be compatible with Material 3. You can use the `headline` and `supporting-text` slots to easily style your nodes:

```html
<lit-node id="m3-node">
  <div slot="headline">M3 Node</div>
  <div slot="supporting-text">Beautifully integrated slots.</div>
</lit-node>
```

## Next Steps

Now that you have your first graph, check out the [Examples](/examples/) to see more advanced features like subgraph isolation, custom nodes, and Breadboard integration.
