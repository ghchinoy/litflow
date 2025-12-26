import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Position } from '@xyflow/system';

@customElement('lit-handle')
export class LitHandle extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: String, reflect: true })
  type: 'source' | 'target' = 'source';

  @property({ type: String, reflect: true, attribute: 'data-handlepos' })
  position: Position = Position.Top;

  @property({ type: String, reflect: true, attribute: 'data-handleid' })
  handleId?: string;

  @property({ type: String, reflect: true, attribute: 'data-nodeid' })
  nodeId?: string;

  constructor() {
    super();
    this.addEventListener('mousedown', (e) => this._onPointerDown(e));
    this.addEventListener('touchstart', (e) => this._onPointerDown(e));
  }

  private _onPointerDown(e: MouseEvent | TouchEvent) {
    e.stopPropagation();
    const nodeId = this.getAttribute('data-nodeid');
    
    this.dispatchEvent(new CustomEvent('handle-pointer-down', {
      bubbles: true,
      composed: true,
      detail: {
        event: e,
        handleId: this.handleId,
        nodeId,
        type: this.type,
        handleDomNode: this,
      }
    }));
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add('lit-flow__handle');
    this.classList.add(this.type);
    this.classList.add('connectable');
    this.classList.add('connectableend');
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('nodeId') || changedProperties.has('handleId') || changedProperties.has('type')) {
      this.setAttribute('data-id', `lit-flow-${this.nodeId || ''}-${this.handleId || ''}-${this.type}`);
    }
  }

  render() {
    return html`
      <div style="
        width: 100%;
        height: 100%;
        background: inherit;
        border-radius: inherit;
        pointer-events: none;
      "></div>
    `;
  }
}