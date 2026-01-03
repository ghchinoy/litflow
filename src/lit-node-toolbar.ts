import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('lit-node-toolbar')
export class LitNodeToolbar extends LitElement {
  static styles = css`
    :host {
      display: flex;
      gap: 4px;
      padding: 4px;
      background-color: var(--md-sys-color-surface-container-high);
      border: 1px solid var(--md-sys-color-outline-variant);
      border-radius: var(--md-sys-shape-corner-small);
      box-shadow: var(--md-sys-elevation-2);
      pointer-events: all;
    }

    ::slotted(button) {
      background: none;
      border: none;
      padding: 4px 8px;
      cursor: pointer;
      color: var(--md-sys-color-on-surface);
      font-family: var(--md-sys-typescale-label-medium-font);
      font-size: var(--md-sys-typescale-label-medium-size);
      border-radius: var(--md-sys-shape-corner-extra-small);
      transition: background-color 0.2s;
    }

    ::slotted(button:hover) {
      background-color: var(--md-sys-color-surface-container-highest);
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}
