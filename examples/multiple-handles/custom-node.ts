import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Position } from '@xyflow/system';
import '../../src/lit-handle';

@customElement('multiple-handles-node')
export class MultipleHandlesNode extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: String })
  label = 'Multi Handle Node';

  @property({ type: String, attribute: 'data-id', reflect: true })
  nodeId = '';

  connectedCallback() {
    super.connectedCallback();
    this.classList.add('xyflow__node');
    this.style.minWidth = '150px';
  }

  render() {
    return html`
      <div class="container" style="display: flex; flex-direction: column; gap: 10px; width: 100%;">
        <div class="row" style="display: flex; justify-content: space-between; align-items: center; position: relative; padding: 5px 10px; width: 100%; box-sizing: border-box;">
          <lit-handle type="target" data-handlepos="${Position.Left}" handleId="a" data-nodeid="${this.nodeId}"></lit-handle>
          <span class="label" style="font-size: 12px; pointer-events: none;">Input A</span>
        </div>
        <div class="row" style="display: flex; justify-content: space-between; align-items: center; position: relative; padding: 5px 10px; width: 100%; box-sizing: border-box;">
          <lit-handle type="target" data-handlepos="${Position.Left}" handleId="b" data-nodeid="${this.nodeId}"></lit-handle>
          <span class="label" style="font-size: 12px; pointer-events: none;">Input B</span>
        </div>
        <hr style="width: 100%; border: 0; border-top: 1px solid #eee; margin: 0;">
        <div class="row" style="display: flex; justify-content: space-between; align-items: center; position: relative; padding: 5px 10px; width: 100%; box-sizing: border-box;">
          <span class="label" style="font-size: 12px; pointer-events: none;">Output</span>
          <lit-handle type="source" data-handlepos="${Position.Right}" handleId="out" data-nodeid="${this.nodeId}"></lit-handle>
        </div>
      </div>
    `;
  }
}
