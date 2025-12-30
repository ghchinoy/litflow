import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { m3Tokens } from './theme';

@customElement('lit-chiclet')
export class LitChiclet extends LitElement {
  static styles = [
    m3Tokens,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px 10px;
        background: var(--md-sys-color-secondary-container);
        color: var(--md-sys-color-on-secondary-container);
        border-radius: 16px;
        font-family: var(--md-sys-typescale-body-medium-font);
        font-size: 11px;
        line-height: 1;
        border: 1px solid var(--md-sys-color-outline-variant);
        white-space: nowrap;
        user-select: none;
      }

      .icon {
        font-size: 14px;
      }

      .value {
        font-weight: 500;
        max-width: 120px;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      :host([type="generative"]) {
        background: #f3e5f5; /* Light Purple fallback */
        color: #4a148c;
        border-color: #ce93d8;
      }

      :host([type="input"]) {
        background: var(--md-sys-color-primary-container);
        color: var(--md-sys-color-on-primary-container);
      }
    `
  ];

  @property({ type: String })
  label = '';

  @property({ type: String })
  value = '';

  @property({ type: String, reflect: true })
  type: 'default' | 'generative' | 'input' | 'output' = 'default';

  @property({ type: String })
  icon = '📄';

  render() {
    return html`
      ${this.icon ? html`<span class="icon">${this.icon}</span>` : ''}
      ${this.label ? html`<span class="label">${this.label}:</span>` : ''}
      <span class="value">${this.value || '...'}</span>
    `;
  }
}
