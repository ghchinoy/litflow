import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { SignalWatcher } from '@lit-labs/signals';
import { type PanZoomInstance } from '@xyflow/system';

@customElement('lit-controls')
export class LitControls extends SignalWatcher(LitElement) {
  static styles = css`
    :host {
      display: block;
      position: absolute;
      left: 10px;
      bottom: 10px;
      z-index: 5;
      display: flex;
      flex-direction: column;
      gap: 5px;
      background: white;
      padding: 5px;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      border: 1px solid #ccc;
    }

    button {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: 1px solid #eee;
      border-radius: 3px;
      cursor: pointer;
      padding: 0;
      color: #333;
    }

    button:hover {
      background: #f4f4f4;
    }

    button svg {
      width: 16px;
      height: 16px;
      fill: currentColor;
    }
  `;

  @property({ type: Object })
  panZoom?: PanZoomInstance;

  private _zoomIn() {
    this.panZoom?.scaleBy(1.2);
  }

  private _zoomOut() {
    this.panZoom?.scaleBy(1 / 1.2);
  }

  private _fitView() {
    // fitView implementation will need more data from the flow
    // for now just a placeholder or simple zoom reset
    this.panZoom?.setViewport({ x: 0, y: 0, zoom: 1 });
  }

  render() {
    return html`
      <button @click="${this._zoomIn}" title="Zoom In">
        <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
      </button>
      <button @click="${this._zoomOut}" title="Zoom Out">
        <svg viewBox="0 0 24 24"><path d="M19 13H5v-2h14v2z"/></svg>
      </button>
      <button @click="${this._fitView}" title="Reset View">
        <svg viewBox="0 0 24 24"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg>
      </button>
    `;
  }
}
