import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Position } from '@xyflow/system';
import '../../src/lit-handle';

@customElement('color-picker-node')
export class ColorPickerNode extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: String, attribute: 'data-id', reflect: true })
  nodeId = '';

  @property({ type: Object })
  set data(val: any) {
    this._data = val;
    if (val.color) this.color = val.color;
    if (val.label) this.label = val.label;
  }

  get data() {
    return this._data;
  }

  private _data: any = {};

  @property({ type: String })
  color = '#0041d0';

  @property({ type: String })
  label = 'Color Picker';

  private _onColorChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.color = target.value;
    
    // Dispatch a custom event to notify the flow of the data change
    this.dispatchEvent(new CustomEvent('node-data-change', {
      bubbles: true,
      composed: true,
      detail: {
        id: this.nodeId,
        data: { color: this.color }
      }
    }));
  }

  render() {
    return html`
      <div class="color-picker-container" style="
        padding: 10px;
        background: white;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 150px;
        box-sizing: border-box;
      ">
        <div style="font-size: 10px; color: #888; text-transform: uppercase; font-weight: bold;">
          ${this.label}
        </div>
        
        <div style="display: flex; align-items: center; gap: 10px;">
          <input 
            type="color" 
            .value="${this.color}" 
            @input="${this._onColorChange}"
            style="width: 30px; height: 30px; border: none; padding: 0; cursor: pointer; background: none;"
          />
          <span style="font-family: monospace; font-size: 12px;">${this.color}</span>
        </div>

        <div style="
          height: 4px; 
          width: 100%; 
          background: ${this.color}; 
          border-radius: 2px;
        "></div>

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
