# LitFlow: xyflow + Lit WebComponents

LitFlow is a demonstration and starter kit for using the [xyflow](https://xyflow.com/) core system with [Lit](https://lit.dev/) WebComponents. It provides a lightweight, framework-agnostic way to build node-based UIs.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- npm or pnpm

### Installation
```bash
npm install
```

### Development
```bash
./start-server.sh
```
This will start the Vite development server and open the examples runner.

## 🏗️ Architecture

LitFlow leverages `@xyflow/system`, the same headless core that powers React Flow and Svelte Flow.

- **`examples/`**: Contains various implementation examples.
  - `examples/index.html`: The main entry point to browse examples.
  - `examples/basic/`: A simple graph implementation.
- **`<lit-flow>`**: The root component. It initializes the `XYPanZoom` instance for the viewport and manages the collection of nodes and edges.
- **`<lit-node>`**: A reactive Lit component for individual nodes. It handles its own styling and selection state.
- **`<lit-edge>`**: An SVG-based component that uses xyflow's path utilities (like `getBezierPath`) to render connections.
- **`store.ts`**: A minimal state container that bridges Lit's reactivity with xyflow's internal data structures.

## 🛠️ Key Features
- **Panning & Zooming**: Full support for viewport manipulation via d3-zoom (via xyflow).
- **Node Dragging**: Individual nodes can be dragged, with positions synced back to the state.
- **Reactive Updates**: Changing the `nodes` or `edges` properties on `<lit-flow>` automatically updates the UI.
- **Shadow DOM Encapsulation**: Styles are scoped to the components, preventing leaks.

## 📖 Documentation
- [Lit vs React for xyflow](./LIT_VS_REACT.md): A comparison of using Lit WebComponents vs React for building flow-based UIs.
- [GEMINI.md](./GEMINI.md): Project conventions and technical insights for AI agents.

## 🤝 Contributing
This project is an exploration of xyflow's headless capabilities. Feel free to open issues or submit PRs to improve the Lit integration!