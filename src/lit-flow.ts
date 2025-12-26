import { LitElement, css, svg } from 'lit';
import { html, unsafeStatic } from 'lit/static-html.js';
import { customElement, property, query, state } from 'lit/decorators.js';
import { SignalWatcher } from '@lit-labs/signals';
import {
  XYPanZoom,
  XYDrag,
  PanOnScrollMode,
  type PanZoomInstance,
  type XYDragInstance,
  type Viewport,
  type NodeBase,
  adoptUserNodes,
  updateAbsolutePositions,
  getHandlePosition,
  getBezierPath,
} from '@xyflow/system';
import { createInitialState, type FlowState } from './store';
import './lit-node';
import './lit-edge';

@customElement('lit-flow')
export class LitFlow extends SignalWatcher(LitElement) {
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

  @state()
  private _panZoom?: PanZoomInstance;

  private _drags = new Map<string, XYDragInstance>();
  private _resizeObserver?: ResizeObserver;

  @state()
  private _state: FlowState = createInitialState();

  @property({ type: Object })
  nodeTypes: Record<string, string> = {
    default: 'lit-node',
    input: 'lit-node',
    output: 'lit-node',
  };

  @property({ type: Boolean, attribute: 'show-controls', reflect: true })
  showControls = false;

  @property({ type: Boolean, attribute: 'show-minimap', reflect: true })
  showMinimap = false;

  @state()
  private _width = 0;

  @state()
  private _height = 0;

  @property({ type: Array })
  set nodes(nodes: NodeBase[]) {
    this._state.nodes.set(nodes);
    adoptUserNodes(nodes, this._state.nodeLookup, this._state.parentLookup, {
      nodeOrigin: this._state.nodeOrigin,
      nodeExtent: this._state.nodeExtent,
    });
  }

  get nodes() {
    return this._state.nodes.get();
  }

  @property({ type: Array })
  set edges(edges: any[]) {
    this._state.edges.set(edges);
  }

  get edges() {
    return this._state.edges.get();
  }

  @property({ type: Object })
  viewport: Viewport = { x: 0, y: 0, zoom: 1 };

  connectedCallback() {
    super.connectedCallback();
    this._resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === this) {
          this._width = entry.contentRect.width;
          this._height = entry.contentRect.height;
        } else if (entry.target === this._renderer) {
          // Handle renderer resize if needed
        } else {
          const id = (entry.target as HTMLElement).dataset.id;
          if (id) {
            this._updateNodeDimensions(id, entry.target as HTMLElement);
          }
        }
      }
    });
    this._resizeObserver.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
  }

  private async _updateNodeDimensions(id: string, element: HTMLElement) {
    const node = this._state.nodeLookup.get(id);
    if (node) {
      // Wait for Lit element to finish rendering its shadow DOM
      if ('updateComplete' in element) {
        await (element as any).updateComplete;
      }

      const { width, height } = element.getBoundingClientRect();
      const zoom = this._state.transform.get()[2];
      node.measured = {
        width: width / zoom,
        height: height / zoom,
      };

      // Sync back to user node to preserve dimensions across adoptUserNodes calls
      const userNode = this.nodes.find((n) => n.id === id);
      if (userNode) {
        userNode.measured = node.measured;
      }

      // Update handle bounds
      const handles = element.shadowRoot?.querySelectorAll('lit-handle');
      if (handles && handles.length > 0) {
        const sourceBounds: any[] = [];
        const targetBounds: any[] = [];

        handles.forEach((h: any) => {
          const bounds = h.getBoundingClientRect();
          const nodeRect = element.getBoundingClientRect();
          const handleData = {
            id: h.handleId || null,
            type: h.type,
            position: h.position,
            x: (bounds.left - nodeRect.left) / zoom,
            y: (bounds.top - nodeRect.top) / zoom,
            width: bounds.width / zoom,
            height: bounds.height / zoom,
          };

          if (h.type === 'source') sourceBounds.push(handleData);
          else targetBounds.push(handleData);
        });

        node.internals.handleBounds = {
          source: sourceBounds,
          target: targetBounds,
        };
      }

      // Update absolute positions without clearing the lookup
      updateAbsolutePositions(this._state.nodeLookup, this._state.parentLookup, {
        nodeOrigin: this._state.nodeOrigin,
        nodeExtent: this._state.nodeExtent,
      });

      // Trigger update via signal
      this._state.nodes.set([...this.nodes]);
    }
  }

  private _selectNode(id: string, multi: boolean) {
    const newNodes = this.nodes.map((node) => {
      if (node.id === id) {
        return { ...node, selected: !node.selected };
      }
      return multi ? node : { ...node, selected: false };
    });
    this.nodes = newNodes;
  }

  firstUpdated() {
    if (this._renderer) {
      this._state.domNode = this._renderer;
      this._resizeObserver?.observe(this._renderer);

      // Clear selection on background click
      this._renderer.onclick = () => {
        this.nodes = this.nodes.map(n => ({ ...n, selected: false }));
      };

      this._panZoom = XYPanZoom({
        domNode: this._renderer,
        minZoom: 0.5,
        maxZoom: 2,
        translateExtent: this._state.nodeExtent,
        viewport: this.viewport,
        onDraggingChange: () => {},
        onPanZoom: (_, { x, y, zoom }) => {
          this.viewport = { x, y, zoom };
          this._state.transform.set([x, y, zoom]);
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
        
        // Add click listener for selection
        (el as HTMLElement).onclick = (e) => {
          e.stopPropagation();
          this._selectNode(id, e.shiftKey || e.metaKey);
        };

        if (!this._drags.has(id)) {
          const dragInstance = XYDrag({
            getStoreItems: () => ({
              ...this._state,
              nodes: this._state.nodes.get(),
              edges: this._state.edges.get(),
              transform: this._state.transform.get(),
              panBy: async (delta) => {
                const { panZoom, nodeExtent } = this._state;
                const transform = this._state.transform.get();
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
                    node.internals.positionAbsolute = item.internals.positionAbsolute;
                    const userNode = this.nodes.find(n => n.id === id);
                    if (userNode) userNode.position = item.position;
                  }
                });
                // Trigger update via signal
                this._state.nodes.set([...this.nodes]);
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

  private _renderEdge(edge: any) {
    const sourceNode = this._state.nodeLookup.get(edge.source);
    const targetNode = this._state.nodeLookup.get(edge.target);
    if (!sourceNode || !targetNode) return null;

    const sourceHandle = (sourceNode.internals.handleBounds?.source || []).find(
      (h: any) => h.id === (edge.sourceHandle || null)
    ) || sourceNode.internals.handleBounds?.source?.[0];

    const targetHandle = (targetNode.internals.handleBounds?.target || []).find(
      (h: any) => h.id === (edge.targetHandle || null)
    ) || targetNode.internals.handleBounds?.target?.[0];

    if (!sourceHandle || !targetHandle) return null;

    const sPos = getHandlePosition(sourceNode, sourceHandle, sourceHandle.position, true);
    const tPos = getHandlePosition(targetNode, targetHandle, targetHandle.position, true);

    const [path] = getBezierPath({
      sourceX: sPos.x,
      sourceY: sPos.y,
      sourcePosition: sourceHandle.position,
      targetX: tPos.x,
      targetY: tPos.y,
      targetPosition: targetHandle.position,
    });

    return svg`
      <path
        d="${path}"
        fill="none"
        stroke="${edge.selected ? '#555' : '#b1b1b7'}"
        stroke-width="2"
      />
    `;
  }

  render() {
    const transform = this._state.transform.get();
    return html`
      <div class="xyflow__renderer">
        <div
          class="xyflow__viewport"
          style="transform: translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})"
        >
          <svg class="xyflow__edges">
            ${this.edges.map((edge) => this._renderEdge(edge))}
          </svg>
          <div class="xyflow__nodes">
            ${this.nodes.map((node) => {
              const internalNode = this._state.nodeLookup.get(node.id);
              const pos = internalNode?.position || node.position;
              const tagName = this.nodeTypes[node.type || 'default'] || this.nodeTypes.default;
              const tag = unsafeStatic(tagName);

              return html`
                <${tag}
                  class="xyflow__node"
                  data-id="${node.id}"
                  style="transform: translate(${pos.x}px, ${pos.y}px)"
                  .label="${(node.data as any).label}"
                  .type="${node.type || 'default'}"
                  ?selected="${node.selected}"
                >
                </${tag}>
              `;
            })}
          </div>
        </div>
      </div>
      ${this.showControls
        ? html`<lit-controls .panZoom="${this._panZoom}"></lit-controls>`
        : ''}
      ${this.showMinimap
        ? html`
            <lit-minimap
              .panZoom="${this._panZoom}"
              .nodeLookup="${this._state.nodeLookup}"
              .transform="${this._state.transform.get()}"
              .translateExtent="${this._state.nodeExtent}"
              .width="${this._width}"
              .height="${this._height}"
            ></lit-minimap>
          `
        : ''}
    `;
  }
}

