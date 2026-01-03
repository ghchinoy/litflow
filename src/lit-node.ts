import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { SignalWatcher } from '@lit-labs/signals';

type Constructor<T> = new (...args: any[]) => T;

@customElement('lit-node')
export class LitNode extends (SignalWatcher as <T extends Constructor<LitElement>>(base: T) => T)(LitElement) {
  createRenderRoot() {
    return this;
  }

  @property({ type: String })
  label = '';

  @property({ type: String, reflect: true })
  type = 'default';

  @property({ type: Object })
  data: any = {};

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property({ type: Boolean, reflect: true })
  resizable = false;

  @property({ type: String, attribute: 'data-id', reflect: true })
  nodeId = '';

  @property({ type: Number, attribute: 'position-x' })
  positionX = 0;

  @property({ type: Number, attribute: 'position-y' })
  positionY = 0;

  render() {
    return html`
      <style>
        lit-node {
          display: block;
        }
        .content-wrapper {
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          pointer-events: none;
        }
        .headline {
          font-size: var(--md-sys-typescale-title-small-size);
          font-weight: var(--md-sys-typescale-title-small-weight);
          color: var(--md-sys-color-on-surface);
          font-family: var(--md-sys-typescale-title-small-font);
        }
        .supporting-text {
          font-size: var(--md-sys-typescale-body-medium-size);
          color: var(--md-sys-color-on-surface-variant);
          font-family: var(--md-sys-typescale-body-medium-font);
        }
        .node-toolbar-container {
          position: absolute;
          top: -45px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 100;
        }
        .resize-handle {
          position: absolute;
          right: 4px;
          bottom: 4px;
          width: 10px;
          height: 10px;
          border-right: 2px solid var(--md-sys-color-primary);
          border-bottom: 2px solid var(--md-sys-color-primary);
          cursor: nwse-resize;
          pointer-events: all;
          z-index: 100;
        }
      </style>
      <div 
        class="node-toolbar-container"
        style="display: ${this.selected ? 'block' : 'none'};"
      >
        <slot name="toolbar"></slot>
      </div>
      <div class="content-wrapper">
        <div class="headline">
          <slot name="headline">${this.label}</slot>
        </div>
        <div class="supporting-text">
          <slot name="supporting-text"></slot>
        </div>
        <slot></slot>
      </div>
      ${this.resizable && this.selected
        ? html`<div class="resize-handle" @pointerdown="${this._onResizeStart}"></div>` 
        : ''}
      ${this.type === 'input' || this.type === 'default'
        ? html`<lit-handle type="source" data-handlepos="bottom" data-nodeid="${this.nodeId}"></lit-handle>`
        : ''}
      ${this.type === 'output' || this.type === 'default'
        ? html`<lit-handle type="target" data-handlepos="top" data-nodeid="${this.nodeId}"></lit-handle>`
        : ''}
    `;
  }

  private _onResizeStart(e: PointerEvent) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('node-resize-start', {
      detail: { nodeId: this.nodeId, event: e },
      bubbles: true,
      composed: true
    }));
  }
}
