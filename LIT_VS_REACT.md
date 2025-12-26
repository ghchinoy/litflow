# Lit WebComponents vs. React for xyflow

Building node-based UIs with `xyflow` can be done using its framework-specific wrappers (React Flow, Svelte Flow) or by using the headless `@xyflow/system` core with other libraries like Lit. This document explores the benefits and trade-offs of using Lit WebComponents compared to the standard React implementation.

## 🌟 Why Lit?

Lit is a lightweight library for building fast, lightweight WebComponents. When paired with `xyflow`, it offers a unique set of advantages:

### 1. Framework Agnosticism
WebComponents are a web standard. A `<lit-flow>` component can be used in **any** environment:
- Plain HTML/JS
- React
- Vue
- Angular
- CMS platforms (WordPress, etc.)

This makes Lit an excellent choice for building a flow editor that needs to be embedded in diverse technical stacks.

### 2. Performance & Bundle Size
- **Minimal Overhead**: Lit has a very small runtime (around 5KB minified/gzipped).
- **Direct DOM Manipulation**: `xyflow` relies heavily on direct DOM updates for performance (e.g., during dragging). Lit's efficient update cycle and proximity to the native DOM API make this integration very snappy.
- **No Virtual DOM**: Unlike React, Lit doesn't maintain a full Virtual DOM, which can reduce memory usage in extremely large graphs.

### 3. Encapsulation (Shadow DOM)
- **Scoped Styles**: Shadow DOM ensures that flow styles don't leak out and external styles don't break the flow UI.
- **DOM Isolation**: The internal structure of the flow is hidden, providing a clean API to the consumer.

### 4. Documentation & Static Usage
One of the standout use cases for the Lit implementation is **embedded documentation**.
- **Read-Only Mode**: By simply setting attributes like `nodes-draggable="false"` and `pan-on-drag="false"`, you can turn a complex editor into a static diagram.
- **Zero-Config Embedding**: Since it's a WebComponent, you can drop a `<lit-flow>` tag into a Markdown-based documentation site (like Docusaurus, VitePress, or Hugo) without needing a complex React build pipeline for that specific page.
- **Clean Aesthetic**: The ability to toggle the grid (`show-grid="false"`) allows the graph to blend seamlessly into the document's background.

---

## ⚡ State Management & Lit Signals

One of the most significant differences between the React and Lit implementations is how state changes propagate through the graph.

### React Flow (Zustand)
React Flow uses `zustand` for state management. While highly efficient, React's top-down rendering model often means that a change in one part of the graph (like moving a node) can trigger re-renders or reconciliation checks across many components unless carefully optimized with `memo` and specific selectors.

### Lit + xyflow (Lit Signals)
By using `@lit-labs/signals`, we achieve **fine-grained reactivity**:
- **Direct Subscriptions**: Components subscribe directly to specific data signals. When a node moves, *only* that node and its connected edges re-render.
- **Viewport Optimization**: UI overlays (like MiniMap or Zoom controls) react to the transform signal without triggering a re-render of the entire canvas.
- **Light DOM Strategy**: By using Light DOM for child components, we maintain high performance and full compatibility with `@xyflow/system`'s native DOM utilities (like `elementFromPoint` for connection targets).

---

## 🛠️ Declarative vs. Imperative Interactivity

### React Flow
Interactivity is largely declarative through props. If you want to disable dragging, you pass `nodesDraggable={false}`. React Flow handles the internal state and event listener cleanup.

### Lit + xyflow
The Lit implementation mirrors this declarative approach with attributes (`nodes-draggable="false"`), but it also provides a more **imperative-friendly API**. Because the component is a real DOM element, you can interact with it directly via JavaScript:
```javascript
const flow = document.querySelector('lit-flow');
flow.nodes = [...]; // Direct property access
flow.addEventListener('connect', (e) => { ... }); // Standard DOM events
```
This makes it much easier to integrate with non-React tools or legacy systems.

---

## 📊 Comparison Table

## ✅ Pros & ❌ Cons

### Lit + xyflow
**Pros:**
- **Portability**: Build once, use anywhere (React, Vue, Angular, or plain HTML).
- **Speed**: Extremely fast boot time and low memory footprint.
- **Fine-Grained Reactivity**: Signals minimize unnecessary re-renders in large graphs.
- **Standards-based**: Leverages native browser features (WebComponents).

**Cons:**
- **Manual Setup**: Requires manual orchestration of `XYPanZoom` and `XYDrag`.
- **Styling Complexity**: Light DOM children require styles to be managed in the parent ShadowRoot or globally.
- **Smaller Community**: Fewer pre-built "custom node" libraries compared to React Flow.

### React Flow
**Pros:**
- **Feature Rich**: Includes many built-in components (MiniMap, Controls, Background).
- **Developer Experience**: Excellent hooks API (`useReactFlow`, `useNodes`).
- **Huge Community**: Thousands of examples and community-made nodes.
- **Battle Tested**: Used in production by major companies.

**Cons:**
- **Locked to React**: Cannot be used in other frameworks without a bridge.
- **Bundle Size**: Larger due to React and its dependencies.
- **Virtual DOM Overhead**: Can become a bottleneck for thousands of nodes if not optimized.

## 🎯 Conclusion

Use **Lit + xyflow** if you are building a library that needs to be shared across different teams/frameworks, or if you are extremely sensitive to bundle size and performance.

Use **React Flow** if you are already in a React environment and want to move fast by leveraging a mature, feature-complete ecosystem.
