import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-node')
export class LitNode extends LitElement {
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
      border-color: #555;
      box-shadow: 0 0 0 0.5px #1a192b;
    }

    :host([type="input"]) {
      border-color: #0041d0;
    }

    :host([type="output"]) {
      border-color: #ff0072;
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
    `;
  }
}
