import { LitElement, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getBezierPath, Position } from '@xyflow/system';

@customElement('lit-edge')
export class LitEdge extends LitElement {
  static styles = css`
    :host {
      display: contents;
    }

    path {
      fill: none;
      stroke: #b1b1b7;
      stroke-width: 2;
    }

    :host([selected]) path {
      stroke: #555;
    }
  `;

  @property({ type: Number }) sourceX = 0;
  @property({ type: Number }) sourceY = 0;
  @property({ type: Number }) targetX = 0;
  @property({ type: Number }) targetY = 0;
  @property({ type: String }) sourcePosition = Position.Right;
  @property({ type: String }) targetPosition = Position.Left;
  @property({ type: Boolean, reflect: true }) selected = false;

  render() {
    const [path] = getBezierPath({
      sourceX: this.sourceX,
      sourceY: this.sourceY,
      sourcePosition: this.sourcePosition as Position,
      targetX: this.targetX,
      targetY: this.targetY,
      targetPosition: this.targetPosition as Position,
    });

    return svg`
      <path d="${path}" />
    `;
  }
}
