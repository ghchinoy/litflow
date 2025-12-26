import { LitElement, css, svg } from 'lit';
import { html, unsafeStatic } from 'lit/static-html.js';
import { customElement, property, query, state } from 'lit/decorators.js';
import { SignalWatcher } from '@lit-labs/signals';
import {
  XYPanZoom,
  XYDrag,
  XYHandle,
  ConnectionMode,
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
      display: block;
      background: white;
      border: 1px solid #1a192b;
      padding: 10px;
      border-radius: 3px;
      min-width: 100px;
      text-align: center;
      box-shadow: 0 1px 2px rgba(0,0,0,0.1);
      box-sizing: border-box;
    }

    .xyflow__node[selected] {
      border-color: #0041d0;
      border-width: 2px;
      box-shadow: 0 0 0 1px #0041d0;
    }

    .xyflow__node[type="input"] {
      border-color: #0041d0;
    }

    .xyflow__node[type="output"] {
      border-color: #ff0072;
    }

    .xyflow__node[selected][type="output"] {
      border-color: #ff0072;
      box-shadow: 0 0 0 1px #ff0072;
    }

    .xyflow__node:active {
      cursor: grabbing;
    }

    .lit-flow__handle {
      display: block;
      position: absolute;
      width: 8px;
      height: 8px;
      background: #555;
      border-radius: 50%;
      z-index: 10;
      pointer-events: all;
      cursor: pointer;
      border: 4px solid transparent;
      background-clip: padding-box;
      box-sizing: content-box;
    }

    .lit-flow__handle::after {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      border: 1px solid white;
      border-radius: 50%;
      pointer-events: none;
    }

    .lit-flow__handle.source {
      background-color: #555;
    }

    .lit-flow__handle.target {
      background-color: #0041d0;
    }

    .lit-flow__handle[data-handlepos="top"] {
      top: -8px;
      left: 50%;
      transform: translateX(-50%);
    }

    .lit-flow__handle[data-handlepos="bottom"] {
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
    }

    .lit-flow__handle[data-handlepos="left"] {
      left: -8px;
      top: 50%;
      transform: translateY(-50%);
    }

    .lit-flow__handle[data-handlepos="right"] {
      right: -8px;
      top: 50%;
      transform: translateY(-50%);
    }

    .xyflow__connection-path {
      fill: none;
      stroke: #b1b1b7;
      stroke-width: 2;
      stroke-dasharray: 5,5;
      pointer-events: none;
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
      // Since lit-node is now light-DOM, we look in the element itself, not shadowRoot
      const handles = element.querySelectorAll('lit-handle');
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
        console.log(`Node ${id} handleBounds:`, node.internals.handleBounds);
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

  private _onHandlePointerDown(e: CustomEvent) {
    const { event, handleId, nodeId, type, handleDomNode } = e.detail;
    const isTarget = type === 'target';

    // Prevent starting a new connection if one is already in progress
    if (this._state.connectionInProgress.get()) {
      return;
    }

    const bounds = handleDomNode.getBoundingClientRect();
    const nodeRect = handleDomNode.parentElement?.getBoundingClientRect();
    const zoom = this._state.transform.get()[2];

    const fromHandle = {
      id: handleId,
      nodeId,
      type,
      position: handleDomNode.position,
      x: (bounds.left - (nodeRect?.left ?? 0)) / zoom,
      y: (bounds.top - (nodeRect?.top ?? 0)) / zoom,
      width: bounds.width / zoom,
      height: bounds.height / zoom,
    };

    XYHandle.onPointerDown(event, {
      handleId,
      nodeId,
      isTarget,
      domNode: this._renderer as HTMLDivElement,
      handleDomNode,
      nodeLookup: this._state.nodeLookup,
      connectionMode: ConnectionMode.Strict,
      lib: 'lit',
      autoPanOnConnect: true,
      flowId: 'lit-flow',
      dragThreshold: 0,
      panBy: async (delta) => {
        const viewport = this._panZoom?.getViewport();
        if (!viewport) return false;
        await this._panZoom?.setViewport({
          x: viewport.x + delta.x,
          y: viewport.y + delta.y,
          zoom: viewport.zoom,
        });
        return true;
      },
      getTransform: () => this._state.transform.get(),
      getFromHandle: () => fromHandle,
      updateConnection: (conn) => {
        if (conn.inProgress) {
          this._state.connectionInProgress.set(conn);
        } else {
          this._state.connectionInProgress.set(null);
        }
      },
      cancelConnection: () => {
        this._state.connectionInProgress.set(null);
      },
      onConnect: (connection) => {
        this.dispatchEvent(new CustomEvent('connect', {
          detail: connection
        }));
        // Default behavior: add the edge
        const id = `e-${connection.source}${connection.sourceHandle || ''}-${connection.target}${connection.targetHandle || ''}`;
        this.edges = [...this.edges, { ...connection, id }];
      },
      connectionRadius: 20,
    });
  }

  private _renderConnectionLine(conn: any) {
    if (!conn) return null;

    const [path] = getBezierPath({
      sourceX: conn.from.x,
      sourceY: conn.from.y,
      sourcePosition: conn.fromPosition,
      targetX: conn.to.x,
      targetY: conn.to.y,
      targetPosition: conn.toPosition,
    });

    return svg`
      <path
        class="xyflow__connection-path"
        d="${path}"
        fill="none"
        stroke="#b1b1b7"
        stroke-width="2"
        stroke-dasharray="5,5"
      />
    `;
  }

  render() {
    const transform = this._state.transform.get();
    const connectionInProgress = this._state.connectionInProgress.get();

    return html`
      <div class="xyflow__renderer">
        <div
          class="xyflow__viewport"
          style="transform: translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})"
        >
          <svg class="xyflow__edges">
            ${this.edges.map((edge) => this._renderEdge(edge))}
            ${this._renderConnectionLine(connectionInProgress)}
          </svg>
          <div class="xyflow__nodes" @handle-pointer-down="${this._onHandlePointerDown}">
            ${this.nodes.map((node) => {
              const internalNode = this._state.nodeLookup.get(node.id);
              const pos = internalNode?.position || node.position;
              const tagName = this.nodeTypes[node.type || 'default'] || this.nodeTypes.default;
              const tag = unsafeStatic(tagName);

              return html`
                <${tag}
                  class="xyflow__node"
                  data-id="${node.id}"
                  .nodeId="${node.id}"
                  style="transform: translate(${pos.x}px, ${pos.y}px)"
                  .data="${node.data}"
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

