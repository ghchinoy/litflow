import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Position } from '@xyflow/system';
import '../../src/lit-handle';

@customElement('multiple-handles-node')
export class MultipleHandlesNode extends LitElement {
  static styles = css`
    :host {
      display: block;
      background: white;
      border: 1px solid #1a192b;
      padding: 10px;
      border-radius: 3px;
      min-width: 150px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    }

    .container {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      padding: 5px 0;
    }

    .label {
      font-size: 12px;
    }
  `;

  @property({ type: String })
  label = 'Multi Handle Node';

  render() {
    return html`
      <div class="container">
        <div class="row">
          <lit-handle type="target" position="${Position.Left}" handleId="a"></lit-handle>
          <span class="label">Input A</span>
        </div>
        <div class="row">
          <lit-handle type="target" position="${Position.Left}" handleId="b"></lit-handle>
          <span class="label">Input B</span>
        </div>
        <hr>
        <div class="row">
          <span class="label">Output</span>
          <lit-handle type="source" position="${Position.Right}" handleId="out"></lit-handle>
        </div>
      </div>
    `;
  }
}
