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
<lit-flow id="my-flow" show-controls show-minimap layout-direction="LR"></lit-flow>

<script>
  const flow = document.getElementById('my-flow');
  
  flow.nodes = [
    { id: '1', type: 'input', position: { x: 100, y: 100 }, data: { label: 'Hello' } },
    { id: '2', position: { x: 300, y: 100 }, data: { label: 'World' } }
  ];
  
  flow.edges = [
    { id: 'e1-2', source: '1', target: '2', markerEnd: 'arrow' }
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
| `layout-direction` | `layoutDirection` | `'LR'` | Default handle orientation (`'LR'` or `'TB'`) |
| `layout-strategy` | `layoutStrategy` | `null` | Automatic layout engine (`'hierarchical'`, `'organic'`, `'tree'`) |
| `selection-mode` | `selectionMode` | `'select'` | Interaction mode (`'select'`, `'marquee'`, `'disabled'`) |
| `nodes-draggable` | `nodesDraggable` | `true` | Allow dragging nodes |
| `pan-on-drag` | `panOnDrag` | `true` | Allow panning the canvas |
| `auto-fit` | `autoFit` | `false` | Automatically fit view on graph changes |

### 4. Custom Nodes
To create a custom node, define a Lit component using **Light DOM** and register it with the flow:

```javascript
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('my-custom-node')
class MyNode extends LitElement {
  createRenderRoot() { return this; } // Required for xyflow compatibility
  render() {
    return html`
      <div class="my-node-content">
        ${this.data.label}
        <lit-handle type="target" position="left"></lit-handle>
        <lit-handle type="source" position="right"></lit-handle>
      </div>
    `;
  }
}

// Register the type
const flow = document.querySelector('lit-flow');
flow.nodeTypes = {
  ...flow.nodeTypes,
  'special': 'my-custom-node'
};
```

## 🏗️ Architecture

LitFlow leverages `@xyflow/system`, the same headless core that powers React Flow and Svelte Flow.

- **`examples/`**: Comprehensive implementation showcase.
  - `auto-layout/`: Zero-config topological layout engines.
  - `designer/`: A dual-pane authoring tool with live JSON sync.
  - `subgraph-isolation/`: API for focusing on specific graph sections.
  - `schema-node/`: UI generation from JSON Schema (Breadboard compatible).
  - `org-chart/`: Specialized tree layouts using D3-Hierarchy.
  - `subflows/`: Nested nodes and parent-child relationships.
  - `marquee-selection/`: Bulk selection and viewport interaction patterns.
- **`<lit-flow>`**: The root component. Manages the `XYPanZoom` instance, layout engines, and graph state.
- **`<lit-node>`**: Base reactive component for nodes. Uses **Light DOM** for xyflow utility compatibility.
- **`<lit-handle>`**: Connection port component.
- **`<lit-minimap>` & `<lit-controls>`**: Built-in utility components for navigation and overview.
- **`store.ts`**: High-performance state container powered by `@lit-labs/signals`.

## 🛠️ Key Features
- **Automatic Layout Engines**: Built-in support for Hierarchical (Dagre), Organic (D3-Force), and Tree (D3-Hierarchy) layouts.
- **Subgraph Isolation**: Focus and isolate specific parts of the graph programmatically.
- **Reactive UI-from-Schema**: `lit-schema-node` for generating complex node UIs from JSON Schema.
- **Panning & Zooming**: Full viewport manipulation support via d3-zoom (via xyflow).
- **Global Change Observability**: A robust `change` event for external state syncing and persistence.
- **Marquee Selection**: Bulk select nodes and edges (Shift + Drag).
- **Manual Connections**: Interactive drag-to-connect with live connection lines.
- **Material 3 Design**: Integrated M3 tokens and styling principles.
- **Light DOM Architecture**: Optimized for `@xyflow/system` compatibility.

## 📖 Documentation

Explore our comprehensive documentation following the [Diataxis](https://diataxis.fr/) framework:

- **[Tutorials](./docs/src/tutorials/index.md)**: Step-by-step guides to get you started.
- **[Guides](./docs/src/guides/index.md)**: Practical instructions for common tasks.
- **[Explanation](./docs/src/explanation/index.md)**: Deep dives into the architecture and concepts.
- **[Reference](./docs/src/reference/index.md)**: Technical API documentation.
- **[Examples](./docs/src/examples/index.md)**: Live interactive showcases.

- [GEMINI.md](./GEMINI.md): 🤖 Project conventions and technical insights for AI agents.

## License

LitFlow is [MIT licensed](./LICENSE).