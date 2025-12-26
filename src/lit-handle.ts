import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Position } from '@xyflow/system';

@customElement('lit-handle')
export class LitHandle extends LitElement {
  static styles = css`
    :host {
      position: absolute;
      width: 8px;
      height: 8px;
      background: #555;
      border: 4px solid transparent;
      background-clip: padding-box;
      border-radius: 50%;
      z-index: 10;
      pointer-events: all;
      cursor: pointer;
    }

    :host::after {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      border: 1px solid white;
      border-radius: 50%;
    }

    :host([type="source"]) {
      background-color: #555;
    }

    :host([type="target"]) {
      background-color: #555;
    }

    :host([position="top"]) {
      top: -8px;
      left: 50%;
      transform: translateX(-50%);
    }

    :host([position="bottom"]) {
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
    }

    :host([position="left"]) {
      left: -8px;
      top: 50%;
      transform: translateY(-50%);
    }

    :host([position="right"]) {
      right: -8px;
      top: 50%;
      transform: translateY(-50%);
    }
  `;

  @property({ type: String, reflect: true })
  type: 'source' | 'target' = 'source';

  @property({ type: String, reflect: true })
  position: Position = Position.Top;

  @property({ type: String })
  handleId?: string;

  render() {
    return html``;
  }
}
