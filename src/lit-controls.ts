import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { SignalWatcher } from '@lit-labs/signals';
import { type PanZoomInstance } from '@xyflow/system';

type Constructor<T> = new (...args: any[]) => T;

@customElement('lit-controls')
export class LitControls extends (SignalWatcher as <T extends Constructor<LitElement>>(base: T) => T)(LitElement) {
  static styles = css`
    :host {
      display: block;
      position: absolute;
      left: 16px;
      bottom: 16px;
      z-index: 5;
      display: flex;
      flex-direction: column;
      gap: 2px;
      background: var(--md-sys-color-surface);
      padding: 4px;
      border-radius: var(--md-sys-shape-corner-small);
      box-shadow: var(--md-sys-elevation-1);
      border: 1px solid var(--md-sys-color-outline-variant);
    }

    button {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      border-radius: var(--md-sys-shape-corner-extra-small);
      cursor: pointer;
      padding: 0;
      color: var(--md-sys-color-on-surface-variant);
      transition: background-color 0.2s ease, color 0.2s ease;
    }

    button:hover {
      background: var(--md-sys-color-secondary-container);
      color: var(--md-sys-color-on-secondary-container);
    }

    button svg {
      width: 20px;
      height: 20px;
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
    this.dispatchEvent(new CustomEvent('fit-view', {
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <button @click="${this._zoomIn}" title="Zoom In">
        <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
      </button>
      <button @click="${this._zoomOut}" title="Zoom Out">
        <svg viewBox="0 0 24 24"><path d="M19 13H5v-2h14v2z"/></svg>
      </button>
      <button @click="${this._fitView}" title="Fit View">
        <svg viewBox="0 0 24 24"><path d="M6 16h12V8H6v8zm2-6h8v4H8v-4zM4 4h16v16H4V4zm2 2v12h12V6H6z"/></svg>
      </button>
    `;
  }
}
