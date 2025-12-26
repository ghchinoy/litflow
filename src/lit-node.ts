import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { SignalWatcher } from '@lit-labs/signals';

@customElement('lit-node')
export class LitNode extends SignalWatcher(LitElement) {
  static styles = css`
    :host {
      display: block;
      background: white;
      border: 1px solid #1a192b;
      padding: 10px;
      border-radius: 3px;
      min-width: 100px;
      text-align: center;
      box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    }

    :host([selected]) {
      border-color: #0041d0;
      border-width: 2px;
      box-shadow: 0 0 0 1px #0041d0;
    }

    :host([type="input"]) {
      border-color: #0041d0;
    }

    :host([type="output"]) {
      border-color: #ff0072;
    }

    :host([selected][type="output"]) {
      border-color: #ff0072;
      box-shadow: 0 0 0 1px #ff0072;
    }

    .label {
      font-size: 12px;
      color: #222;
    }
  `;

  @property({ type: String })
  label = '';

  @property({ type: String, reflect: true })
  type = 'default';

  @property({ type: Boolean, reflect: true })
  selected = false;

  render() {
    return html`
      <div class="label">${this.label}</div>
      <slot></slot>
      ${this.type === 'input' || this.type === 'default'
        ? html`<lit-handle type="source" position="bottom"></lit-handle>`
        : ''}
      ${this.type === 'output' || this.type === 'default'
        ? html`<lit-handle type="target" position="top"></lit-handle>`
        : ''}
    `;
  }
}
