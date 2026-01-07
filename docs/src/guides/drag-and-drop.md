---
layout: base.njk
title: Drag & Drop Guide
---

# Drag & Drop (Palette to Canvas)

This guide explains how to implement a "palette-to-canvas" interaction, allowing users to drag node types from an external sidebar and drop them onto the flow.

## 1. The Sidebar (Palette)

Your sidebar elements must have the `draggable="true"` attribute and handle the `dragstart` event.

```javascript
const onDragStart = (event, nodeType) => {
  event.dataTransfer.setData('application/litflow', nodeType);
  event.dataTransfer.effectAllowed = 'move';
};
```

In Lit:

```javascript
render() {
  return html`
    <div 
      draggable="true" 
      @dragstart="${(e) => onDragStart(e, 'input')}"
    >
      Input Node
    </div>
  `;
}
```

## 2. The Flow Component

The `<lit-flow>` component automatically handles `dragover` and `drop` events if the data type is `application/litflow`.

```html
<lit-flow id="my-flow"></lit-flow>
```

### Coordinate Projection
When a node is dropped, LitFlow uses its internal `project` method to convert the mouse screen coordinates into canvas coordinates, accounting for the current zoom and pan.

## 3. Customizing the Drop

You can listen for the `node-drop` event to perform custom logic after a node is added.

```javascript
const flow = document.getElementById('my-flow');

flow.addEventListener('node-drop', (event) => {
  const { node, event: originalEvent } = event.detail;
  console.log('New node added:', node);
});
```

## 4. Prompt for Naming

You can enable an automatic prompt for the node label by setting the `prompt-on-drop` attribute:

```html
<lit-flow prompt-on-drop="true"></lit-flow>
```

## 5. Example

Check out the [Drag & Drop Example](../../examples/drag-and-drop/) to see this in action.
