import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Position } from '@xyflow/system';
import './lit-handle';

@customElement('lit-gemini-image-node')
export class LitGeminiImageNode extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: String, attribute: 'data-id', reflect: true })
  nodeId = '';

  @property({ type: Object })
  set data(val: any) {
    this._data = val;
    if (val.imageUrl) this.imageUrl = val.imageUrl;
    if (val.status) this.status = val.status;
  }
  get data() { return this._data; }
  private _data: any = {};

  @property({ type: String })
  imageUrl = '';

  @property({ type: String })
  status: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  render() {
    return html`
      <div class="gemini-node image-node" style="
        padding: 12px;
        background: var(--md-sys-color-surface-container-high);
        border-radius: 12px;
        width: 220px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 8px;
        border: 1px solid var(--md-sys-color-outline-variant);
        text-align: left;
      ">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <span style="font-size: 18px;">🖼️</span>
          <span style="font-size: 12px; font-weight: bold; color: var(--md-sys-color-secondary);">GEMINI IMAGE</span>
        </div>
        
        <div style="
          width: 100%;
          height: 150px;
          background: var(--md-sys-color-surface-container-lowest);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border: 1px dashed var(--md-sys-color-outline);
        ">
          ${this.status === 'loading' 
            ? html`<div style="font-size: 12px; color: var(--md-sys-color-outline);">Generating...</div>`
            : this.imageUrl 
              ? html`<img src="${this.imageUrl}" style="width: 100%; height: 100%; object-fit: cover;" />`
              : html`<div style="font-size: 12px; color: var(--md-sys-color-outline);">No image generated</div>`
          }
        </div>

        <lit-handle type="target" data-handlepos="${Position.Top}" data-nodeid="${this.nodeId}"></lit-handle>
      </div>
    `;
  }
}
