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
      border: 1px solid white;
      border-radius: 50%;
      z-index: 10;
      pointer-events: all;
      cursor: crosshair;
    }

    :host([type="source"]) {
      background: #555;
    }

    :host([type="target"]) {
      background: #555;
    }

    :host([position="top"]) {
      top: -4px;
      left: 50%;
      transform: translateX(-50%);
    }

    :host([position="bottom"]) {
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%);
    }

    :host([position="left"]) {
      left: -4px;
      top: 50%;
      transform: translateY(-50%);
    }

    :host([position="right"]) {
      right: -4px;
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
