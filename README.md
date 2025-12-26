# LitFlow: xyflow + Lit WebComponents

[![npm version](https://img.shields.io/npm/v/@ghchinoy/litflow.svg)](https://www.npmjs.com/package/@ghchinoy/litflow)
[![license](https://img.shields.io/npm/l/@ghchinoy/litflow.svg)](https://github.com/ghchinoy/litflow/blob/main/LICENSE)

LitFlow is a demonstration and starter kit for using the [xyflow](https://xyflow.com/) core system with [Lit](https://lit.dev/) WebComponents. It provides a lightweight, framework-agnostic way to build node-based UIs.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- npm or pnpm

### Installation
```bash
pnpm install
```

### Development
```bash
./start-server.sh
```
This will start the Vite development server and open the examples runner.

## 📖 Usage Guide

### 1. Installation
```bash
pnpm add @ghchinoy/litflow
```

### 2. Basic Usage
Import the library in your main entry point to register the custom elements:

```javascript
import '@ghchinoy/litflow';
```

Then use the `<lit-flow>` component in your HTML or framework template:

```html
<lit-flow id="my-flow" show-controls show-minimap show-grid="false"></lit-flow>

<script>
  const flow = document.getElementById('my-flow');
  
  // Interactivity controls
  flow.nodesDraggable = false;
  flow.panOnDrag = false;
  flow.showGrid = false;
  
  flow.nodes = [
    { id: '1', position: { x: 100, y: 100 }, data: { label: 'Hello' } },
    { id: '2', position: { x: 300, y: 100 }, data: { label: 'World' } }
  ];
  
  flow.edges = [
    { id: 'e1-2', source: '1', target: '2' }
  ];
</script>
```

### 3. Interactivity & Display
You can control the flow's behavior using attributes or properties:

| Attribute | Property | Default | Description |
|-----------|----------|---------|-------------|
| `show-controls` | `showControls` | `false` | Show zoom/fit controls |
| `show-minimap` | `showMinimap` | `false` | Show the minimap |
| `show-grid` | `showGrid` | `true` | Show the background grid |
| `nodes-draggable` | `nodesDraggable` | `true` | Allow dragging nodes |
| `nodes-connectable` | `nodesConnectable` | `true` | Allow creating new edges |
| `pan-on-drag` | `panOnDrag` | `true` | Allow panning the canvas |
| `zoom-on-scroll` | `zoomOnScroll` | `true` | Allow zooming with mouse wheel |

### 4. Custom Nodes
To create a custom node, define a Lit component using **Light DOM** and register it with the flow:

```javascript
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('my-custom-node')
class MyNode extends LitElement {
  createRenderRoot() { return this; } // Required for xyflow compatibility
  render() {
    return html`<div>${this.data.label}</div>`;
  }
}

// Register the type
const flow = document.querySelector('lit-flow');
flow.nodeTypes = {
  ...flow.nodeTypes,
  'special': 'my-custom-node'
};
```

### 4. Styling (Material 3)
LitFlow comes with a built-in Material 3 theme. You can import the design tokens and apply them to your flow:

```javascript
import { m3Tokens } from '@ghchinoy/litflow/theme';

// These tokens are automatically applied to <lit-flow>
// but you can also use them in your own custom nodes.
```

## 🏗️ Architecture

LitFlow leverages `@xyflow/system`, the same headless core that powers React Flow and Svelte Flow.

- **`examples/`**: Contains various implementation examples.
  - `examples/index.html`: The main entry point to browse examples.
  - `examples/basic/`: A simple graph implementation.
  - `examples/multiple-handles/`: Nodes with multiple input/output ports.
  - `examples/dynamic-interactivity/`: Adding/removing nodes and edges at runtime.
  - `examples/subflows/`: Nested nodes and parent-child relationships.
- **`<lit-flow>`**: The root component. It initializes the `XYPanZoom` instance for the viewport and manages the collection of nodes and edges.
- **`<lit-node>`**: A reactive Lit component for individual nodes. Uses **Light DOM** to ensure compatibility with xyflow's system utilities (like hit-testing).
- **`<lit-handle>`**: A connection port component. Also uses **Light DOM** to ensure discoverability during connection dragging.
- **`<lit-controls>`**: A UI overlay providing zoom and fit-view controls.
- **`<lit-minimap>`**: A live overview of the flow with viewport tracking.
- **`store.ts`**: A state container using `@lit-labs/signals` for fine-grained, high-performance reactivity.

## 🛠️ Key Features
- **Panning & Zooming**: Full support for viewport manipulation via d3-zoom (via xyflow).
- **Node Dragging**: Individual nodes can be dragged, with positions synced back to the state.
- **Manual Connections**: Drag-to-connect functionality between handles with a live connection line.
- **Controls & MiniMap**: Built-in utility components for navigation and overview.
- **Reactive Updates**: Powered by `@lit-labs/signals` for efficient, targeted re-renders.
- **Light DOM Architecture**: Optimized for `@xyflow/system` compatibility while maintaining Lit's reactive benefits.
- **Custom Node Support**: Easily build complex nodes with internal state and custom Lit templates.

## 📖 Documentation
- [Lit vs React for xyflow](./LIT_VS_REACT.md): A comparison of using Lit WebComponents vs React for building flow-based UIs.
- [Creating Custom Nodes](./CUSTOM_NODES.md): A primer on building complex, data-driven nodes in LitFlow.
- [GEMINI.md](./GEMINI.md): Project conventions and technical insights for AI agents.

## 🛠️ Development & Publishing

### Build
To build the library and generate type definitions:
```bash
pnpm run build
```
This will output the compiled files and types to the `dist/` directory.

### Publishing to npm
The package is published under the `@ghchinoy` scope. To publish a new version:

1. **Update the version**:
   ```bash
   pnpm version patch # or minor, major
   ```
2. **Build the project**:
   ```bash
   pnpm run build
   ```
3. **Publish**:
   ```bash
   pnpm publish --access public
   ```

## 🤝 Contributing
This project is an exploration of xyflow's headless capabilities. Feel free to open issues or submit PRs to improve the Lit integration!