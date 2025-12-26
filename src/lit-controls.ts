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
      gap: 4px;
      background: var(--md-sys-color-surface);
      padding: 4px;
      border-radius: var(--md-sys-shape-corner-extra-small);
      box-shadow: var(--md-sys-elevation-1);
      border: 1px solid var(--md-sys-color-outline-variant);
    }

    button {
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      border-radius: var(--md-sys-shape-corner-extra-small);
      cursor: pointer;
      padding: 0;
      color: var(--md-sys-color-on-surface);
      transition: background-color 0.2s ease;
    }

    button:hover {
      background: var(--md-sys-color-surface-variant);
    }

    button svg {
      width: 18px;
      height: 18px;
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
