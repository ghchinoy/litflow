# Creating Custom Nodes in LitFlow

Custom nodes allow you to build complex, interactive, and data-driven elements within your flow. Since LitFlow uses **Light DOM** for nodes, your custom components integrate seamlessly with the `@xyflow/system` core.

## 1. Basic Structure

A custom node is a standard Lit component that follows a few conventions:

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Position } from '@xyflow/system';
import '../src/lit-handle'; // Import the handle component

@customElement('my-custom-node')
export class MyCustomNode extends LitElement {
  // 1. Use Light DOM for xyflow compatibility
  createRenderRoot() {
    return this;
  }

  // 2. Required properties passed by <lit-flow>
  @property({ type: String, attribute: 'data-id', reflect: true })
  nodeId = '';

  @property({ type: Object })
  data: any = {};

  @property({ type: Boolean, reflect: true })
  selected = false;

  render() {
    return html`
      <div class="node-container">
        <div>${this.data.label}</div>
        
        <!-- 3. Add handles with data-nodeid -->
        <lit-handle 
          type="target" 
          data-handlepos="${Position.Top}" 
          data-nodeid="${this.nodeId}"
        ></lit-handle>
        
        <lit-handle 
          type="source" 
          data-handlepos="${Position.Bottom}" 
          data-nodeid="${this.nodeId}"
        ></lit-handle>
      </div>
    `;
  }
}
```

## 2. Defining Schemas (Data Contracts)

While TypeScript provides type safety, you can define a "schema" for your node's data to ensure consistency.

### Example: Prompt Node Schema
```typescript
interface PromptNodeData {
  label: string;
  prompt: string;
  temperature: number;
  model: 'gemini-1.5-flash' | 'gemini-1.5-pro';
}
```

In your component, you can use a setter to validate or transform this data:

```typescript
@property({ type: Object })
set data(val: PromptNodeData) {
  this._data = val;
  // Perform internal updates based on new data
  this.requestUpdate();
}
```

## 3. Communicating with the Flow

Custom nodes should be "dumb" regarding the overall graph state. To update data, dispatch a custom event that the parent application can listen to.

```typescript
private _onInputChange(e: Event) {
  const newValue = (e.target as HTMLInputElement).value;
  
  this.dispatchEvent(new CustomEvent('node-data-change', {
    bubbles: true,
    composed: true,
    detail: {
      id: this.nodeId,
      data: { prompt: newValue }
    }
  }));
}
```

## 4. Registering the Node

In your main application, map a type string to your custom element tag:

```javascript
const flow = document.querySelector('lit-flow');

flow.nodeTypes = {
  ...flow.nodeTypes,
  'promptNode': 'my-custom-node'
};

flow.nodes = [
  { 
    id: '1', 
    type: 'promptNode', 
    data: { label: 'AI Prompt', prompt: 'Hello world' },
    position: { x: 100, y: 100 }
  }
];
```

## 5. Interactive State & Syncing

If your custom node has internal interactive state (e.g., a collapsed/expanded toggle), you must sync this state back to the `data` property. This ensures the state is preserved when the parent flow re-renders the `nodes` array.

```typescript
@property({ type: Object })
set data(val: any) {
  this._data = val;
  // Sync internal state from data
  this.collapsed = !!val.collapsed;
}

private _toggleCollapse() {
  // Dispatch event to parent to update the global nodes array
  this.dispatchEvent(new CustomEvent('group-collapse', {
    bubbles: true,
    composed: true,
    detail: {
      id: this.nodeId,
      collapsed: !this.collapsed
    }
  }));
}
```

## 6. Styling

Since custom nodes use Light DOM, their styles should be defined:
1.  **Globally** in your page's `<style>` tag.
2.  **Inlined** in the `render()` method.
3.  **In the parent** `<lit-flow>` component's styles (if you are extending the library).

The `.xyflow__node` class is automatically applied to all nodes for base positioning and selection borders.
