import { LitElement, html, css, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { SignalWatcher } from '@lit-labs/signals';
import {
  getInternalNodesBounds,
  getBoundsOfRects,
  XYMinimap,
  type Rect,
  type XYMinimapInstance,
  type PanZoomInstance,
  type InternalNodeBase,
  type Transform,
} from '@xyflow/system';

@customElement('lit-minimap')
export class LitMinimap extends SignalWatcher(LitElement) {
  static styles = css`
    :host {
      display: block;
      position: absolute;
      right: 10px;
      bottom: 10px;
      z-index: 5;
      background: var(--md-sys-color-surface);
      border: 1px solid var(--md-sys-color-outline-variant);
      border-radius: var(--md-sys-shape-corner-extra-small);
      box-shadow: var(--md-sys-elevation-1);
      overflow: hidden;
    }

    svg {
      display: block;
    }

    .minimap-node {
      fill: var(--md-sys-color-surface-variant);
      stroke: var(--md-sys-color-outline-variant);
      stroke-width: 1;
    }

    .minimap-mask {
      fill: var(--lit-flow-minimap-mask);
      fill-rule: evenodd;
    }
  `;

  @property({ type: Object })
  panZoom?: PanZoomInstance;

  @property({ type: Object })
  nodeLookup = new Map<string, InternalNodeBase>();

  @property({ type: Array })
  transform: Transform = [0, 0, 1];

  @property({ type: Array })
  translateExtent: [[number, number], [number, number]] = [[-Infinity, -Infinity], [Infinity, Infinity]];

  @property({ type: Number })
  width = 0;

  @property({ type: Number })
  height = 0;

  @state()
  private _minimapInstance?: XYMinimapInstance;

  updated(changedProperties: Map<string, any>) {
    if (!this._minimapInstance && this.panZoom) {
      const svgEl = this.shadowRoot?.querySelector('svg');
      if (svgEl) {
        this._minimapInstance = XYMinimap({
          domNode: svgEl,
          panZoom: this.panZoom,
          getTransform: () => this.transform,
          getViewScale: () => {
            const boundingRect = this._getBoundingRect();
            return Math.max(boundingRect.width / 200, boundingRect.height / 150);
          },
        });
      }
    }

    if (this._minimapInstance && (changedProperties.has('width') || changedProperties.has('height') || changedProperties.has('translateExtent'))) {
      this._minimapInstance.update({
        width: this.width,
        height: this.height,
        translateExtent: this.translateExtent,
      });
    }
  }

  private _getBoundingRect(): Rect {
    const viewBB: Rect = {
      x: -this.transform[0] / this.transform[2],
      y: -this.transform[1] / this.transform[2],
      width: this.width / this.transform[2],
      height: this.height / this.transform[2],
    };

    return this.nodeLookup.size > 0
      ? getBoundsOfRects(getInternalNodesBounds(this.nodeLookup), viewBB)
      : viewBB;
  }

  render() {
    const boundingRect = this._getBoundingRect();
    const viewBB: Rect = {
      x: -this.transform[0] / this.transform[2],
      y: -this.transform[1] / this.transform[2],
      width: this.width / this.transform[2],
      height: this.height / this.transform[2],
    };

    const elementWidth = 200;
    const elementHeight = 150;
    const scaledWidth = boundingRect.width / elementWidth;
    const scaledHeight = boundingRect.height / elementHeight;
    const viewScale = Math.max(scaledWidth, scaledHeight);
    const viewWidth = viewScale * elementWidth;
    const viewHeight = viewScale * elementHeight;
    const offset = 5 * viewScale;

    const x = boundingRect.x - (viewWidth - boundingRect.width) / 2 - offset;
    const y = boundingRect.y - (viewHeight - boundingRect.height) / 2 - offset;
    const width = viewWidth + offset * 2;
    const height = viewHeight + offset * 2;

    return html`
      <svg
        width="${elementWidth}"
        height="${elementHeight}"
        viewBox="${x} ${y} ${width} ${height}"
      >
        ${Array.from(this.nodeLookup.values()).map((node) => {
          const { x, y } = node.internals.positionAbsolute;
          const w = node.measured.width || 0;
          const h = node.measured.height || 0;
          return svg`
            <rect
              class="minimap-node"
              x="${x}"
              y="${y}"
              width="${w}"
              height="${h}"
              rx="2"
              ry="2"
            />
          `;
        })}
        <path
          class="minimap-mask"
          d="M${x - offset},${y - offset}h${width + offset * 2}v${height + offset * 2}h${-width - offset * 2}z
             M${viewBB.x},${viewBB.y}h${viewBB.width}v${viewBB.height}h${-viewBB.width}z"
        />
      </svg>
    `;
  }
}
