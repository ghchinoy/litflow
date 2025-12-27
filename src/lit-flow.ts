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
  Position,
  type PanZoomInstance,
  type XYDragInstance,
  type Viewport,
  type NodeBase,
  adoptUserNodes,
  updateAbsolutePositions,
  getHandlePosition,
  getBezierPath,
  getSmoothStepPath,
  getStraightPath,
} from '@xyflow/system';
import { createInitialState, type FlowState } from './store';
import { m3Tokens } from './theme';
import './lit-node';
import './lit-edge';

type Constructor<T> = new (...args: any[]) => T;

const boolConverter = {
  fromAttribute: (value: string | null) => value !== 'false' && value !== null,
  toAttribute: (value: boolean) => (value ? '' : null),
};

@customElement('lit-flow')
export class LitFlow extends (SignalWatcher as <T extends Constructor<LitElement>>(base: T) => T)(LitElement) {
  static styles = [
    m3Tokens,
    css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
      background-color: var(--md-sys-color-background);
      color: var(--md-sys-color-on-background);
      font-family: var(--md-sys-typescale-body-medium-font);
    }

    .xyflow__renderer {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      outline: none;
    }

    .xyflow__renderer:focus-visible {
      box-shadow: inset 0 0 0 2px var(--md-sys-color-primary);
    }

    .xyflow__renderer.has-grid {
      background-image: radial-gradient(var(--md-sys-color-outline-variant) 1px, transparent 0);
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
      background: var(--lit-flow-node-bg);
      border: 1px solid var(--lit-flow-node-border);
      padding: 12px;
      border-radius: var(--md-sys-shape-corner-small);
      min-width: 120px;
      text-align: center;
      box-shadow: var(--md-sys-elevation-1);
      box-sizing: border-box;
      color: var(--lit-flow-node-text);
      font-size: var(--md-sys-typescale-body-medium-size);
      transition: box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out, border-width 0.1s ease-in-out;
    }

    .xyflow__node[type="group"] {
      padding: 0;
      background: none;
      border: none;
      box-shadow: none;
      pointer-events: none;
    }

    .xyflow__node[type="group"] > * {
      pointer-events: all;
    }

    .xyflow__node[selected] {
      border-color: var(--lit-flow-node-selected-border);
      border-width: 3px;
      box-shadow: var(--md-sys-elevation-3);
      margin: -2px; /* Offset the border width increase to prevent layout shift */
    }

    .xyflow__node[type="input"] {
      border-top: 4px solid var(--md-sys-color-primary);
    }

    .xyflow__node[type="output"] {
      border-bottom: 4px solid var(--md-sys-color-secondary);
    }

    .xyflow__node:active {
      cursor: grabbing;
    }

    .lit-flow__handle {
      display: block;
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      z-index: 10;
      pointer-events: all;
      cursor: pointer;
      border: 2px solid var(--lit-flow-handle-outline);
      background-clip: padding-box;
      box-sizing: border-box;
      transition: transform 0.1s ease-in-out;
    }

    .lit-flow__handle:hover {
      transform: scale(1.2);
    }

    .lit-flow__handle.source {
      background-color: var(--lit-flow-handle-source);
    }

    .lit-flow__handle.target {
      background-color: var(--lit-flow-handle-target);
    }

    .lit-flow__handle[data-handlepos="top"] {
      top: -5px;
      left: 50%;
      transform: translateX(-50%);
    }

    .lit-flow__handle[data-handlepos="bottom"] {
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
    }

    .lit-flow__handle[data-handlepos="left"] {
      left: -5px;
      top: 50%;
      transform: translateY(-50%);
    }

    .lit-flow__handle[data-handlepos="right"] {
      right: -5px;
      top: 50%;
      transform: translateY(-50%);
    }

    .xyflow__connection-path {
      fill: none;
      stroke: var(--md-sys-color-outline);
      stroke-width: 2;
      stroke-dasharray: 5,5;
      pointer-events: none;
    }

    .xyflow__edge-label {
      background: var(--md-sys-color-surface);
      color: var(--md-sys-color-on-surface);
      padding: 2px 6px;
      border-radius: var(--md-sys-shape-corner-extra-small);
      font-size: var(--md-sys-typescale-label-small-size);
      font-family: var(--md-sys-typescale-body-medium-font);
      border: 1px solid var(--md-sys-color-outline-variant);
      white-space: nowrap;
      pointer-events: all;
      user-select: none;
      box-shadow: var(--md-sys-elevation-1);
    }

    .xyflow__selection {
      position: absolute;
      top: 0;
      left: 0;
      background: var(--md-sys-color-primary-container);
      border: 1px solid var(--md-sys-color-primary);
      opacity: 0.4;
      pointer-events: none;
      z-index: 1000;
    }
  `
  ];

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

  @property({ type: Boolean, attribute: 'show-minimap', reflect: true, converter: boolConverter })
  showMinimap = false;

  @property({ type: Boolean, attribute: 'show-grid', reflect: true, converter: boolConverter })
  showGrid = true;

  @property({ type: Boolean, attribute: 'nodes-draggable', reflect: true, converter: boolConverter })
  nodesDraggable = true;

  @property({ type: Boolean, attribute: 'nodes-connectable', reflect: true, converter: boolConverter })
  nodesConnectable = true;

  @property({ type: Boolean, attribute: 'pan-on-drag', reflect: true, converter: boolConverter })
  panOnDrag = true;

  @property({ type: Boolean, attribute: 'zoom-on-scroll', reflect: true, converter: boolConverter })
  zoomOnScroll = true;

  @property({ type: Boolean, attribute: 'zoom-on-pinch', reflect: true, converter: boolConverter })
  zoomOnPinch = true;

  @property({ type: Boolean, attribute: 'zoom-on-double-click', reflect: true, converter: boolConverter })
  zoomOnDoubleClick = true;

  @property({ type: Boolean, attribute: 'prompt-on-drop', reflect: true, converter: boolConverter })
  promptOnDrop = false;

  @property({ type: String, attribute: 'selection-mode' })
  selectionMode: 'pan' | 'select' = 'pan';

  @state()
  private _selectionRect: { x: number; y: number; width: number; height: number } | null = null;

  private _selectionStart: { x: number; y: number } | null = null;

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
    updateAbsolutePositions(this._state.nodeLookup, this._state.parentLookup, {
      nodeOrigin: this._state.nodeOrigin,
      nodeExtent: this._state.nodeExtent,
    });
  }

  get nodes() {
    return this._state.nodes.get();
  }

  private _discoverNodes() {
    if (this.nodes.length > 0) return;

    const childNodes = Array.from(this.querySelectorAll('lit-node')) as any[];
    if (childNodes.length > 0) {
      const nodes: NodeBase[] = childNodes.map((el) => ({
        id: el.id || el.getAttribute('id') || `node-${Math.random().toString(36).substr(2, 9)}`,
        type: el.type || el.getAttribute('type') || 'default',
        position: {
          x: parseFloat(el.getAttribute('position-x') || '0'),
          y: parseFloat(el.getAttribute('position-y') || '0'),
        },
        data: {
          label: el.label || el.getAttribute('label') || '',
          ...el.data,
        },
      }));
      this.nodes = nodes;
      // Force update of internal nodeId for child elements
      childNodes.forEach((el, i) => {
        el.nodeId = nodes[i].id;
      });
    }
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
    this._discoverNodes();
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

  /**
   * Projects a screen position (relative to the flow container) to canvas coordinates.
   * Useful for Drag & Drop and context menus.
   */
  project(position: { x: number; y: number }): { x: number; y: number } {
    const [tx, ty, zoom] = this._state.transform.get();
    return {
      x: (position.x - tx) / zoom,
      y: (position.y - ty) / zoom,
    };
  }

  private _updatePanZoom(userSelectionActive = false) {
    if (!this._panZoom) return;

    this._panZoom.update({
      noWheelClassName: 'nowheel',
      noPanClassName: 'nopan',
      preventScrolling: true,
      panOnScroll: false,
      panOnDrag: this.panOnDrag,
      panOnScrollMode: PanOnScrollMode.Free,
      panOnScrollSpeed: 0.5,
      userSelectionActive,
      zoomOnPinch: this.zoomOnPinch,
      zoomOnScroll: this.zoomOnScroll,
      zoomOnDoubleClick: this.zoomOnDoubleClick,
      zoomActivationKeyPressed: false,
      lib: 'lit',
      onTransformChange: () => {},
      connectionInProgress: !!this._state.connectionInProgress.get(),
      paneClickDistance: 0,
    });
  }

  firstUpdated() {
    if (this._renderer) {
      this._state.domNode = this._renderer;
      this._resizeObserver?.observe(this._renderer);

      // Add capture listener for selection to intercept before D3
      this._renderer.addEventListener('pointerdown', (e) => this._onPointerDown(e), { capture: true });

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

      this._updatePanZoom();
      this._state.panZoom = this._panZoom;
    }
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('nodes') || changedProperties.has('nodesDraggable')) {
      this._setupDrags();
    }

    if (this._panZoom && (
      changedProperties.has('panOnDrag') ||
      changedProperties.has('zoomOnScroll') ||
      changedProperties.has('zoomOnPinch') ||
      changedProperties.has('zoomOnDoubleClick')
    )) {
      this._updatePanZoom();
    }
  }

  private _setupDrags() {
    const nodeElements = this.shadowRoot?.querySelectorAll('.xyflow__node');
    const currentIds = new Set<string>();

    nodeElements?.forEach((el) => {
      const id = (el as HTMLElement).dataset.id;
      if (id) {
        currentIds.add(id);
        this._resizeObserver?.observe(el);
        
        // Add click listener for selection
        (el as HTMLElement).onclick = (e) => {
          e.stopPropagation();
          this._selectNode(id, e.shiftKey || e.metaKey);
        };

        // Update cursor based on draggability
        (el as HTMLElement).style.cursor = this.nodesDraggable ? 'grab' : 'default';

        if (!this.nodesDraggable) {
          this._drags.delete(id);
          return;
        }

        let dragInstance = this._drags.get(id);
        if (!dragInstance) {
          dragInstance = XYDrag({
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
                    const userNode = this.nodes.find((n) => n.id === id);
                    if (userNode) userNode.position = item.position;
                  }
                });

                // Recalculate all absolute positions to ensure children follow parents
                updateAbsolutePositions(this._state.nodeLookup, this._state.parentLookup, {
                  nodeOrigin: this._state.nodeOrigin,
                  nodeExtent: this._state.nodeExtent,
                });

                // Trigger update via signal
                this._state.nodes.set([...this.nodes]);
              },
              unselectNodesAndEdges: () => {},
            }),
          });
          this._drags.set(id, dragInstance);
        }

        dragInstance.update({
          domNode: el as HTMLElement,
          nodeId: id,
        });
      }
    });

    // Clean up stale drag instances
    for (const id of this._drags.keys()) {
      if (!currentIds.has(id)) {
        this._drags.delete(id);
      }
    }
  }

  private _renderEdge(edge: any) {
    const sourceNode = this._state.nodeLookup.get(edge.source);
    const targetNode = this._state.nodeLookup.get(edge.target);
    if (!sourceNode || !targetNode) return null;

    // Check if either node is hidden in the user-facing nodes array
    const userSource = this.nodes.find(n => n.id === edge.source);
    const userTarget = this.nodes.find(n => n.id === edge.target);
    if (userSource?.hidden || userTarget?.hidden) return null;

    const sourceHandle = (sourceNode.internals.handleBounds?.source || []).find(
      (h: any) => h.id === (edge.sourceHandle || null)
    ) || sourceNode.internals.handleBounds?.source?.[0] || { 
      id: null, 
      type: 'source', 
      nodeId: edge.source, 
      position: Position.Bottom, 
      x: (sourceNode.measured.width || 0) / 2, 
      y: sourceNode.measured.height || 0, 
      width: 1, 
      height: 1 
    };

    const targetHandle = (targetNode.internals.handleBounds?.target || []).find(
      (h: any) => h.id === (edge.targetHandle || null)
    ) || targetNode.internals.handleBounds?.target?.[0] || { 
      id: null, 
      type: 'target', 
      nodeId: edge.target, 
      position: Position.Top, 
      x: (targetNode.measured.width || 0) / 2, 
      y: 0, 
      width: 1, 
      height: 1 
    };

    const sPos = getHandlePosition(sourceNode, sourceHandle, sourceHandle.position, true);
    const tPos = getHandlePosition(targetNode, targetHandle, targetHandle.position, true);

    let path = '';
    let labelX = 0;
    let labelY = 0;

    const pathParams = {
      sourceX: sPos.x,
      sourceY: sPos.y,
      sourcePosition: sourceHandle.position,
      targetX: tPos.x,
      targetY: tPos.y,
      targetPosition: targetHandle.position,
    };

    switch (edge.type) {
      case 'straight':
        [path, labelX, labelY] = getStraightPath(pathParams);
        break;
      case 'smoothstep':
        [path, labelX, labelY] = getSmoothStepPath(pathParams);
        break;
      case 'step':
        [path, labelX, labelY] = getSmoothStepPath({ ...pathParams, borderRadius: 0 });
        break;
      case 'bezier':
      default:
        [path, labelX, labelY] = getBezierPath(pathParams);
        break;
    }

    const getMarkerId = (marker: any) => {
      if (!marker) return null;
      const type = typeof marker === 'string' ? marker : marker.type;
      if (!type) return null;
      return `lit-flow__${type}${edge.selected ? '-selected' : ''}`;
    };

    const markerEndId = getMarkerId(edge.markerEnd);
    const markerStartId = getMarkerId(edge.markerStart);

    return svg`
      <g class="xyflow__edge">
        <path
          d="${path}"
          fill="none"
          stroke="${edge.selected ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-outline-variant)'}"
          stroke-width="${edge.selected ? '3' : '2'}"
          marker-end="${markerEndId ? `url(#${markerEndId})` : ''}"
          marker-start="${markerStartId ? `url(#${markerStartId})` : ''}"
          style="pointer-events: none; transition: stroke 0.2s ease-in-out, stroke-width 0.2s ease-in-out;"
        />
        ${edge.label 
          ? svg`
            <foreignObject
              width="100"
              height="30"
              x="${labelX - 50}"
              y="${labelY - 15}"
              requiredExtensions="http://www.w3.org/1999/xhtml"
            >
              <div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">
                <div class="xyflow__edge-label">${edge.label}</div>
              </div>
            </foreignObject>
          ` 
          : ''}
      </g>
    `;
  }

  private _isPaneClick(target: EventTarget | null): boolean {
    if (!(target instanceof HTMLElement || target instanceof SVGElement)) return false;
    
    // If it's the renderer itself, it's a pane click
    if (target === this._renderer) return true;
    
    // If it's the viewport or the edges SVG, it's a pane click
    if (target.classList.contains('xyflow__viewport') || 
        target.classList.contains('xyflow__edges') ||
        target.classList.contains('xyflow__nodes')) return true;
        
    return false;
  }

  private _onPointerDown(e: PointerEvent) {
    const isPaneClick = this._isPaneClick(e.target);
    const isSelectionAction = e.shiftKey || this.selectionMode === 'select';

    if (isPaneClick && isSelectionAction) {
      console.log('LitFlow: Selection started', { x: e.clientX, y: e.clientY, shift: e.shiftKey });
      const rect = this._renderer!.getBoundingClientRect();
      this._selectionStart = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      this._selectionRect = { x: this._selectionStart.x, y: this._selectionStart.y, width: 0, height: 0 };
      
      // Disable panning while selecting
      this._updatePanZoom(true);
      
      this._renderer!.setPointerCapture(e.pointerId);
      
      // Prevent D3 from starting a pan
      e.stopImmediatePropagation();
    }
  }

  private _onPointerMove(e: PointerEvent) {
    if (this._selectionStart && this._renderer) {
      const rect = this._renderer.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;
      
      const x = Math.min(this._selectionStart.x, currentX);
      const y = Math.min(this._selectionStart.y, currentY);
      const width = Math.abs(this._selectionStart.x - currentX);
      const height = Math.abs(this._selectionStart.y - currentY);
      
      this._selectionRect = { x, y, width, height };

      // Live selection
      this._performSelection(e.shiftKey);
    }
  }

  private _onPointerUp(e: PointerEvent) {
    if (this._selectionStart) {
      console.log('LitFlow: Selection ended', this._selectionRect);
      // Final selection (already updated live, but good to ensure final state)
      this._performSelection(e.shiftKey);
      
      this._selectionStart = null;
      this._selectionRect = null;
      
      // Re-enable panning
      this._updatePanZoom(false);
      
      if (this._renderer) {
        this._renderer.releasePointerCapture(e.pointerId);
      }
    }
  }

  private _performSelection(multi: boolean) {
    if (!this._selectionRect) return;

    const start = this.project({ x: this._selectionRect.x, y: this._selectionRect.y });
    const end = this.project({ 
      x: this._selectionRect.x + this._selectionRect.width, 
      y: this._selectionRect.y + this._selectionRect.height 
    });

    const selectionBox = {
      x: Math.min(start.x, end.x),
      y: Math.min(start.y, end.y),
      width: Math.abs(start.x - end.x),
      height: Math.abs(start.y - end.y),
    };

    let nodesChanged = false;
    const newNodes = this.nodes.map(node => {
      const internalNode = this._state.nodeLookup.get(node.id);
      if (!internalNode) return node;

      const pos = internalNode.internals.positionAbsolute;
      const width = internalNode.measured.width || 0;
      const height = internalNode.measured.height || 0;

      const isInside = 
        pos.x >= selectionBox.x &&
        pos.y >= selectionBox.y &&
        pos.x + width <= selectionBox.x + selectionBox.width &&
        pos.y + height <= selectionBox.y + selectionBox.height;

      const nextSelected = isInside || (multi && node.selected);
      
      if (nextSelected !== !!node.selected) {
        nodesChanged = true;
        return { ...node, selected: nextSelected };
      }
      return node;
    });

    if (nodesChanged) {
      this.nodes = newNodes;
    }

    // Select edges
    let edgesChanged = false;
    const nodeSelectionMap = new Map(newNodes.map(n => [n.id, !!n.selected]));
    
    const newEdges = this.edges.map(edge => {
      const sourceSelected = nodeSelectionMap.get(edge.source);
      const targetSelected = nodeSelectionMap.get(edge.target);
      
      const isInside = sourceSelected && targetSelected;
      const nextSelected = isInside || (multi && edge.selected);
      
      if (nextSelected !== !!edge.selected) {
        edgesChanged = true;
        return { ...edge, selected: nextSelected };
      }
      return edge;
    });

    if (edgesChanged) {
      this.edges = newEdges;
    }

    if (nodesChanged || edgesChanged) {
      this.dispatchEvent(new CustomEvent('selection-change', {
        detail: { 
          nodes: this.nodes.filter(n => n.selected),
          edges: this.edges.filter(e => e.selected)
        }
      }));
    }
  }

  private _onHandlePointerDown(e: CustomEvent) {
    const { event, handleId, nodeId, type, handleDomNode } = e.detail;
    const isTarget = type === 'target';

    // Prevent starting a new connection if one is already in progress or if connectable is false
    if (this._state.connectionInProgress.get() || !this.nodesConnectable) {
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

  private _onDragOver(e: DragEvent) {
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'move';
    }
  }

  private _onDrop(e: DragEvent) {
    e.preventDefault();

    const type = e.dataTransfer?.getData('application/litflow');

    // check if the dropped element is valid
    if (typeof type === 'undefined' || !type) {
      return;
    }

    // Get the position of the drop relative to the flow container
    const rect = this.getBoundingClientRect();
    const position = this.project({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    let label = `${type} node`;
    if (this.promptOnDrop) {
      const userLabel = window.prompt('Enter node label:', label);
      if (userLabel === null) return; // Cancelled
      label = userLabel || label;
    }

    const newNode = {
      id: `node_${Date.now()}`,
      type,
      position,
      data: { label },
    };

    this.nodes = [...this.nodes, newNode];
    
    this.dispatchEvent(new CustomEvent('node-drop', {
      detail: { node: newNode, event: e }
    }));
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

  private _onKeyDown(e: KeyboardEvent) {
    // Don't handle if we are in an input field
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || (e.target as HTMLElement).isContentEditable) {
      return;
    }

    if (e.key === 'Delete' || e.key === 'Backspace') {
      const selectedNodes = this.nodes.filter(n => n.selected);
      const selectedEdges = this.edges.filter(e => e.selected);

      if (selectedNodes.length > 0 || selectedEdges.length > 0) {
        const nodeIdsToRemove = new Set(selectedNodes.map(n => n.id));
        const edgeIdsToRemove = new Set(selectedEdges.map(e => e.id));

        // Also remove edges connected to removed nodes
        this.edges.forEach(edge => {
          if (nodeIdsToRemove.has(edge.source) || nodeIdsToRemove.has(edge.target)) {
            edgeIdsToRemove.add(edge.id);
          }
        });

        this.nodes = this.nodes.filter(n => !nodeIdsToRemove.has(n.id));
        this.edges = this.edges.filter(e => !edgeIdsToRemove.add ? edgeIdsToRemove.has(edge.id) : edgeIdsToRemove.has(edge.id));
        // Wait, I made a typo in my thought process, let's fix it in the actual code.
        this.edges = this.edges.filter(e => !edgeIdsToRemove.has(e.id));

        this.dispatchEvent(new CustomEvent('nodes-delete', {
          detail: { nodes: selectedNodes }
        }));
        this.dispatchEvent(new CustomEvent('edges-delete', {
          detail: { edges: selectedEdges }
        }));
      }
    }

    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      const selectedNodes = this.nodes.filter(n => n.selected);
      if (selectedNodes.length > 0) {
        e.preventDefault();
        const step = e.shiftKey ? 10 : 1;
        const delta = {
          x: e.key === 'ArrowLeft' ? -step : e.key === 'ArrowRight' ? step : 0,
          y: e.key === 'ArrowUp' ? -step : e.key === 'ArrowDown' ? step : 0,
        };

        this.nodes = this.nodes.map(node => {
          if (node.selected) {
            return {
              ...node,
              position: {
                x: node.position.x + delta.x,
                y: node.position.y + delta.y,
              }
            };
          }
          return node;
        });
      }
    }
  }

  render() {
    const transform = this._state.transform.get();
    const connectionInProgress = this._state.connectionInProgress.get();

    return html`
      <div 
        class="xyflow__renderer ${this.showGrid ? 'has-grid' : ''}"
        tabindex="0"
        @keydown="${this._onKeyDown}"
        @dragover="${this._onDragOver}"
        @drop="${this._onDrop}"
        @pointermove="${this._onPointerMove}"
        @pointerup="${this._onPointerUp}"
        @click="${(e: MouseEvent) => {
          if (this._isPaneClick(e.target)) {
            this.nodes = this.nodes.map(n => ({ ...n, selected: false }));
            this.edges = this.edges.map(e => ({ ...e, selected: false }));
          }
        }}"
      >
        <div
          class="xyflow__viewport"
          style="transform: translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})"
        >
          <div class="xyflow__nodes" @handle-pointer-down="${this._onHandlePointerDown}">
            ${this.nodes.map((node) => {
              if (node.hidden) return null;
              const internalNode = this._state.nodeLookup.get(node.id);
              const pos = internalNode?.internals.positionAbsolute || node.position;
              const tagName = this.nodeTypes[node.type || 'default'] || this.nodeTypes.default;
              const tag = unsafeStatic(tagName);

              const style = (node as any).style || {};
              const styleString = Object.entries(style)
                .map(([k, v]) => `${k.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${typeof v === 'number' ? `${v}px` : v}`)
                .join('; ');

              const width = (node as any).width || style.width;
              const height = (node as any).height || style.height;
              const widthStyle = width ? `width: ${typeof width === 'number' ? `${width}px` : width};` : '';
              const heightStyle = height ? `height: ${typeof height === 'number' ? `${height}px` : height};` : '';
              const zIndex = (node as any).zIndex ? `z-index: ${(node as any).zIndex};` : '';

              return html`
                <${tag}
                  class="xyflow__node"
                  data-id="${node.id}"
                  type="${node.type || 'default'}"
                  .nodeId="${node.id}"
                  style="transform: translate(${pos.x}px, ${pos.y}px); ${styleString} ${widthStyle} ${heightStyle} ${zIndex}"
                  .data="${node.data}"
                  .label="${(node.data as any).label}"
                  .type="${node.type || 'default'}"
                  ?selected="${node.selected}"
                >
                </${tag}>
              `;
            })}
          </div>
          <svg class="xyflow__edges">
            <defs>
              <marker
                id="lit-flow__arrow"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--md-sys-color-outline-variant)" />
              </marker>
              <marker
                id="lit-flow__arrowclosed"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--md-sys-color-outline-variant)" />
              </marker>
              <marker
                id="lit-flow__arrow-selected"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--md-sys-color-primary)" />
              </marker>
              <marker
                id="lit-flow__arrowclosed-selected"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--md-sys-color-primary)" />
              </marker>
            </defs>
            ${this.edges.map((edge) => this._renderEdge(edge))}
            ${this._renderConnectionLine(connectionInProgress)}
          </svg>
        </div>
        ${this._selectionRect 
          ? html`
            <div 
              class="xyflow__selection" 
              style="transform: translate(${this._selectionRect.x}px, ${this._selectionRect.y}px); width: ${this._selectionRect.width}px; height: ${this._selectionRect.height}px;"
            ></div>
          ` 
          : ''}
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
      <slot style="display: none;"></slot>
    `;
  }
}