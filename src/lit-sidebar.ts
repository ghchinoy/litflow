import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { m3Tokens } from './theme';

@customElement('lit-sidebar')
export class LitSidebar extends LitElement {
  static styles = [
    m3Tokens,
    css`
    :host {
      display: block;
      width: 200px;
      background: var(--md-sys-color-surface);
      border-right: 1px solid var(--md-sys-color-outline-variant);
      padding: 16px;
      box-sizing: border-box;
      height: 100%;
    }

    .sidebar-title {
      font-family: var(--md-sys-typescale-body-medium-font);
      font-size: var(--md-sys-typescale-label-medium-size);
      color: var(--md-sys-color-on-surface-variant);
      text-transform: uppercase;
      font-weight: bold;
      margin-bottom: 16px;
    }

    .node-palette {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .palette-item {
      padding: 12px;
      background: var(--md-sys-color-surface-container-low);
      border: 1px solid var(--md-sys-color-outline-variant);
      border-radius: var(--md-sys-shape-corner-small);
      cursor: grab;
      font-family: var(--md-sys-typescale-body-medium-font);
      font-size: var(--md-sys-typescale-body-medium-size);
      color: var(--md-sys-color-on-surface);
      user-select: none;
      transition: background-color 0.2s ease;
    }

    .palette-item:hover {
      background: var(--md-sys-color-surface-container-high);
    }

    .palette-item:active {
      cursor: grabbing;
    }
  `
  ];

  @property({ type: Array })
  nodeTypes = [
    { type: 'default', label: 'Default Node' },
    { type: 'input', label: 'Input Node' },
    { type: 'output', label: 'Output Node' },
  ];

  private _onDragStart(e: DragEvent, nodeType: string) {
    if (e.dataTransfer) {
      e.dataTransfer.setData('application/litflow', nodeType);
      e.dataTransfer.effectAllowed = 'move';
    }
  }

  render() {
    return html`
      <div class="sidebar-title">Node Palette</div>
      <div class="node-palette">
        ${this.nodeTypes.map(
          (node) => html`
            <div
              class="palette-item"
              draggable="true"
              @dragstart="${(e: DragEvent) => this._onDragStart(e, node.type)}"
            >
              ${node.label}
            </div>
          `
        )}
      </div>
    `;
  }
}
