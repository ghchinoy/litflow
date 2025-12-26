import { LitElement, html, css } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import {
  XYPanZoom,
  XYDrag,
  PanOnScrollMode,
  type PanZoomInstance,
  type XYDragInstance,
  type Viewport,
  type NodeBase,
  adoptUserNodes,
} from '@xyflow/system';
import { createInitialState, type FlowState } from './store';
import './lit-node';
import './lit-edge';

@customElement('lit-flow')
export class LitFlow extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
      background-color: #f8f8f8;
      font-family: sans-serif;
    }

    .xyflow__renderer {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-image: radial-gradient(#e1e1e1 1px, transparent 0);
      background-size: 20px 20px;
    }

    .xyflow__viewport {
      transform-origin: 0 0;
      width: 100%;
      height: 100%;
    }

    .xyflow__edges {
      position: absolute;
      width: 100%;
      height: 100%;
      pointer-events: none;
      overflow: visible;
    }

    .xyflow__nodes {
      position: absolute;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .xyflow__node {
      position: absolute;
      pointer-events: all;
      cursor: grab;
      user-select: none;
    }

    .xyflow__node:active {
      cursor: grabbing;
    }
  `;

  @query('.xyflow__renderer')
  _renderer?: HTMLElement;

  @query('.xyflow__viewport')
  _viewport?: HTMLElement;

  private _panZoom?: PanZoomInstance;
  private _drags = new Map<string, XYDragInstance>();
  private _resizeObserver?: ResizeObserver;

  @state()
  private _state: FlowState = createInitialState();

  @property({ type: Array })
  set nodes(nodes: NodeBase[]) {
    const oldNodes = this._state.nodes;
    this._state.nodes = nodes;
    adoptUserNodes(nodes, this._state.nodeLookup, this._state.parentLookup, {
      nodeOrigin: this._state.nodeOrigin,
      nodeExtent: this._state.nodeExtent,
    });
    this.requestUpdate('nodes', oldNodes);
  }

  get nodes() {
    return this._state.nodes;
  }

  @property({ type: Array })
  edges: any[] = [];

  @property({ type: Object })
  viewport: Viewport = { x: 0, y: 0, zoom: 1 };

  connectedCallback() {
    super.connectedCallback();
    this._resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === this._renderer) {
          // Handle renderer resize if needed
        } else {
          const id = (entry.target as HTMLElement).dataset.id;
          if (id) {
            this._updateNodeDimensions(id, entry.target as HTMLElement);
          }
        }
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
  }

  private _updateNodeDimensions(id: string, element: HTMLElement) {
    const node = this._state.nodeLookup.get(id);
    if (node) {
      const { width, height } = element.getBoundingClientRect();
      const zoom = this._state.transform[2];
      node.measured = {
        width: width / zoom,
        height: height / zoom,
      };
      // Update absolute positions after dimension change
      adoptUserNodes(this.nodes, this._state.nodeLookup, this._state.parentLookup, {
        nodeOrigin: this._state.nodeOrigin,
        nodeExtent: this._state.nodeExtent,
      });
      this.requestUpdate();
    }
  }

  firstUpdated() {
    if (this._renderer) {
      this._state.domNode = this._renderer;
      this._resizeObserver?.observe(this._renderer);

      this._panZoom = XYPanZoom({
        domNode: this._renderer,
        minZoom: 0.5,
        maxZoom: 2,
        translateExtent: this._state.nodeExtent,
        viewport: this.viewport,
        onDraggingChange: () => {},
        onPanZoom: (_, { x, y, zoom }) => {
          this.viewport = { x, y, zoom };
          this._state.transform = [x, y, zoom];
          if (this._viewport) {
            this._viewport.style.transform = `translate(${x}px,${y}px) scale(${zoom})`;
          }
        },
      });

      this._panZoom.update({
        noWheelClassName: 'nowheel',
        noPanClassName: 'nopan',
        preventScrolling: true,
        panOnScroll: false,
        panOnDrag: true,
        panOnScrollMode: PanOnScrollMode.Free,
        panOnScrollSpeed: 0.5,
        userSelectionActive: false,
        zoomOnPinch: true,
        zoomOnScroll: true,
        zoomOnDoubleClick: true,
        zoomActivationKeyPressed: false,
        lib: 'lit',
        onTransformChange: () => {},
        connectionInProgress: false,
        paneClickDistance: 0,
      });

      this._state.panZoom = this._panZoom;
    }
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('nodes')) {
      this._setupDrags();
    }
  }

  private _setupDrags() {
    const nodeElements = this.shadowRoot?.querySelectorAll('.xyflow__node');
    nodeElements?.forEach((el) => {
      const id = (el as HTMLElement).dataset.id;
      if (id) {
        this._resizeObserver?.observe(el);
        if (!this._drags.has(id)) {
          const dragInstance = XYDrag({
            getStoreItems: () => ({
              ...this._state,
              panBy: async (delta) => {
                const { transform, panZoom, nodeExtent } = this._state;
                if (!panZoom) return false;
                const nextViewport = await panZoom.setViewportConstrained(
                  {
                    x: transform[0] + delta.x,
                    y: transform[1] + delta.y,
                    zoom: transform[2],
                  },
                  [[0, 0], [this.offsetWidth, this.offsetHeight]],
                  nodeExtent
                );
                return !!nextViewport;
              },
              updateNodePositions: (dragItems) => {
                dragItems.forEach((item, id) => {
                  const node = this._state.nodeLookup.get(id);
                  if (node) {
                    node.position = item.position;
                    // Also update the user-facing nodes array if possible
                    const userNode = this.nodes.find(n => n.id === id);
                    if (userNode) userNode.position = item.position;
                  }
                });
                this.requestUpdate();
              },
              unselectNodesAndEdges: () => {},
            }),
          });
          dragInstance.update({
            domNode: el,
            nodeId: id,
          });
          this._drags.set(id, dragInstance);
        }
      }
    });
  }

  render() {
    return html`
      <div class="xyflow__renderer">
        <div
          class="xyflow__viewport"
          style="transform: translate(${this.viewport.x}px, ${this.viewport.y}px) scale(${this.viewport.zoom})"
        >
          <svg class="xyflow__edges">
            ${this.edges.map((edge) => {
              const sourceNode = this._state.nodeLookup.get(edge.source);
              const targetNode = this._state.nodeLookup.get(edge.target);
              if (!sourceNode || !targetNode) return null;

              const sPos = sourceNode.sourcePosition || 'right';
              const tPos = targetNode.targetPosition || 'left';

              // Calculate handle positions based on node dimensions and positions
              let sX = sourceNode.internals.positionAbsolute.x;
              let sY = sourceNode.internals.positionAbsolute.y;
              if (sPos === 'right') {
                sX += sourceNode.measured.width || 0;
                sY += (sourceNode.measured.height || 0) / 2;
              } else if (sPos === 'bottom') {
                sX += (sourceNode.measured.width || 0) / 2;
                sY += sourceNode.measured.height || 0;
              }

              let tX = targetNode.internals.positionAbsolute.x;
              let tY = targetNode.internals.positionAbsolute.y;
              if (tPos === 'left') {
                tY += (targetNode.measured.height || 0) / 2;
              } else if (tPos === 'top') {
                tX += (targetNode.measured.width || 0) / 2;
              }

              return html`
                <lit-edge
                  .sourceX="${sX}"
                  .sourceY="${sY}"
                  .targetX="${tX}"
                  .targetY="${tY}"
                  .sourcePosition="${sPos}"
                  .targetPosition="${tPos}"
                  ?selected="${edge.selected}"
                ></lit-edge>
              `;
            })}
          </svg>
          <div class="xyflow__nodes">
            ${this.nodes.map((node) => {
              const internalNode = this._state.nodeLookup.get(node.id);
              const pos = internalNode?.position || node.position;
              return html`
                <lit-node
                  class="xyflow__node"
                  data-id="${node.id}"
                  style="transform: translate(${pos.x}px, ${pos.y}px)"
                  .label="${(node.data as any).label}"
                  .type="${node.type || 'default'}"
                  ?selected="${node.selected}"
                >
                </lit-node>
              `;
            })}
          </div>
        </div>
      </div>
    `;
  }
}
