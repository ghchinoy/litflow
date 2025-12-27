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

  @property({ type: String, attribute: 'data-id', reflect: true })
  nodeId = '';

  @property({ type: Number, attribute: 'position-x' })
  positionX = 0;

  @property({ type: Number, attribute: 'position-y' })
  positionY = 0;

  render() {
    return html`
      <div class="label" style="font-size: var(--md-sys-typescale-body-medium-size); color: var(--md-sys-color-on-surface); pointer-events: none; font-family: var(--md-sys-typescale-body-medium-font);">${this.label}</div>
      <slot></slot>
      ${this.type === 'input' || this.type === 'default'
        ? html`<lit-handle type="source" data-handlepos="bottom" data-nodeid="${this.nodeId}"></lit-handle>`
        : ''}
      ${this.type === 'output' || this.type === 'default'
        ? html`<lit-handle type="target" data-handlepos="top" data-nodeid="${this.nodeId}"></lit-handle>`
        : ''}
    `;
  }
}
