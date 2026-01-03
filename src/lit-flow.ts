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
import dagre from 'dagre';
import * as d3 from 'd3-force';
import * as d3h from 'd3-hierarchy';

type Constructor<T> = new (...args: any[]) => T;

const boolConverter = {
  fromAttribute: (value: string | null) => value !== 'false' && value !== null,
  toAttribute: (value: boolean) => (value ? '' : null),
};

interface LayoutNode extends NodeBase {
  position: { x: number; y: number };
}

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
      transition: transform 0.4s ease-out, opacity 0.4s ease-in, box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out, border-width 0.1s ease-in-out;
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

    /* Remove default styling for schema nodes which handle their own layout */
    .xyflow__node[type="schema"],
    .xyflow__node[type="gemini-prompt"],
    .xyflow__node[type="gemini-image"] {
      padding: 0;
      border: none;
      background: none;
      box-shadow: none;
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

  @property({ type: Boolean, attribute: 'layout-enabled', reflect: true, converter: boolConverter })
  layoutEnabled = false;

  @property({ type: Number, attribute: 'layout-padding' })
  layoutPadding = 40;

  @property({ type: String, attribute: 'layout-strategy' })
  layoutStrategy: 'hierarchical' | 'organic' | 'tree' = 'hierarchical';

  @property({ type: Boolean, attribute: 'auto-fit', reflect: true, converter: boolConverter })
  autoFit = false;

  @property({ type: String, attribute: 'focus-node' })
  focusNode: string | null = null;

  @property({ type: String, attribute: 'focus-direction' })
  focusDirection: 'downstream' | 'upstream' | 'both' = 'downstream';

  @state()
  private _isMeasuring = false;

  @state()
  private _selectionRect: { x: number; y: number; width: number; height: number } | null = null;

  private _selectionStart: { x: number; y: number } | null = null;

  @state()
  private _width = 0;

  @state()
  private _height = 0;

  @property({ type: Array })
  set nodes(nodes: NodeBase[]) {
    if (!Array.isArray(nodes)) return;

    // Filter out any null/undefined entries and ensure all nodes have a position
    const validNodes = nodes.filter(n => n !== null && n !== undefined);
    const nodesWithPosition = validNodes.map(node => ({
      ...node,
      position: node.position || { x: 0, y: 0 }
    }));

    // If layout is enabled and any node is missing measurement, enter measuring mode
    const needsMeasurement = this.layoutEnabled && nodesWithPosition.some(node => !node.measured || !node.measured.width);
    
    if (needsMeasurement) {
      this._isMeasuring = true;
    }

    this._state.nodes.set(nodesWithPosition);
    adoptUserNodes(nodesWithPosition, this._state.nodeLookup, this._state.parentLookup, {
      nodeOrigin: this._state.nodeOrigin,
      nodeExtent: this._state.nodeExtent,
    });
    updateAbsolutePositions(this._state.nodeLookup, this._state.parentLookup, {
      nodeOrigin: this._state.nodeOrigin,
      nodeExtent: this._state.nodeExtent,
    });
    this._notifyChange();
  }

  get nodes() {
    return this._state.nodes.get() || [];
  }

  private _notifyChange() {
    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        nodes: this.nodes,
        edges: this.edges,
      },
      bubbles: true,
      composed: true,
    }));
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

  private _performLayout(nodesToLayout: NodeBase[], edgesToLayout: any[]): LayoutNode[] {
    if (nodesToLayout.length === 0) return [];
    console.log(`LitFlow: Performing layout using ${this.layoutStrategy}`, { 
      nodes: nodesToLayout.length, 
      edges: edgesToLayout.length,
      measuring: this._isMeasuring
    });

    if (this.layoutStrategy === 'tree') {
      try {
        const stratifier = d3h.stratify()
          .id((d: any) => d.id)
          .parentId((d: any) => {
            const edge = edgesToLayout.find(e => e.target === d.id);
            return edge ? edge.source : undefined;
          });

        const root = stratifier(nodesToLayout);
        
        // Use nodeSize to maintain consistent spacing regardless of tree size
        // We swap width and height in nodeSize because we want a horizontal tree
        const verticalSpacing = this.layoutPadding * 2;
        const horizontalSpacing = 250; 
        const treeLayout = d3h.tree().nodeSize([verticalSpacing, horizontalSpacing]);
        
        treeLayout(root);

        const nodeMap = new Map();
        root.descendants().forEach(d => {
          // d.x is vertical, d.y is horizontal in d3.tree() when using nodeSize
          nodeMap.set(d.id, { x: d.y, y: d.x });
        });

        return nodesToLayout.map(node => {
          const pos = nodeMap.get(node.id) || { x: 0, y: 0 };
          return {
            ...node,
            position: pos
          } as LayoutNode;
        });
      } catch (e) {
        console.warn('Tree layout failed (multiple parents or cycles detected). Falling back to hierarchical.', e);
        // Fallback to dagre below
      }
    }

    if (this.layoutStrategy === 'organic') {
      // Organic Layout (D3-Force)
      const simulationNodes = nodesToLayout.map(n => ({
        id: n.id,
        type: n.type,
        x: n.position?.x ?? 0,
        y: n.position?.y ?? 0,
        width: n.measured?.width || 150,
        height: n.measured?.height || 50
      }));

      // Only include links where both source and target exist in the current set
      const nodeIds = new Set(nodesToLayout.map(n => n.id));
      const validLinks = edgesToLayout
        .filter(e => nodeIds.has(e.source) && nodeIds.has(e.target))
        .map(e => ({
          source: e.source,
          target: e.target
        }));

      const simulation = d3.forceSimulation(simulationNodes as any)
        .force('link', d3.forceLink(validLinks).id((d: any) => d.id).distance(this.layoutPadding * 4))
        .force('charge', d3.forceManyBody().strength(-800))
        .force('collide', d3.forceCollide().radius((d: any) => Math.max(d.width, d.height) / 2 + this.layoutPadding))
        .force('center', d3.forceCenter(400, 300))
        // Add horizontal bias to prevent tangling: 
        // pull inputs to the left, outputs to the right, and others to the center
        .force('x', d3.forceX().x((d: any) => {
          if (d.type === 'input') return 100;
          if (d.type === 'output') return 700;
          return 400;
        }).strength(0.1))
        .stop();

      // Run simulation synchronously
      for (let i = 0; i < 300; ++i) simulation.tick();

      return nodesToLayout.map((node, i) => {
        const simNode = simulationNodes[i];
        return {
          ...node,
          position: {
            x: simNode.x - (simNode.width / 2),
            y: simNode.y - (simNode.height / 2)
          }
        } as LayoutNode;
      });
    }

    // Hierarchical Layout (Dagre) - Default
    const g = new dagre.graphlib.Graph({ multigraph: true });
    g.setGraph({});

    g.graph().rankdir = 'LR';
    g.graph().nodesep = this.layoutPadding;
    g.graph().edgesep = this.layoutPadding;
    g.graph().ranksep = this.layoutPadding * 2;

    nodesToLayout.forEach((node) => {
      const width = node.measured?.width || 150;
      const height = node.measured?.height || 50;
      g.setNode(String(node.id), { label: node.id, width, height });
    });

    // CRITICAL STABILITY CHECK:
    // Only add edges if all nodes have been added to the graph.
    const allNodesHaveDimensions = nodesToLayout.every(n => n.measured?.width && n.measured.width > 0);
    
    if (allNodesHaveDimensions && edgesToLayout.length > 0) {
      edgesToLayout.forEach((edge) => {
        const v = String(edge.source);
        const w = String(edge.target);
        const name = String(edge.id);
        // Ensure BOTH nodes exist in Dagre graph before adding edge
        if (g.hasNode(v) && g.hasNode(w)) {
          // Providing {} as the value is required for some dagre versions to avoid 'points' error
          g.setEdge(v, w, {}, name);
        }
      });
    }

    try {
      dagre.layout(g);
    } catch (e) {
      console.error('LitFlow: Dagre layout engine failed', e);
      return nodesToLayout as LayoutNode[];
    }

    return nodesToLayout.map((node) => {
      const graphNode = g.node(String(node.id));
      // Fallback if dagre didn't position the node
      if (!graphNode || graphNode.x === undefined) {
        return { ...node, position: node.position || { x: 0, y: 0 } } as LayoutNode;
      }
      
      return {
        ...node,
        position: {
          x: graphNode.x - graphNode.width / 2,
          y: graphNode.y - graphNode.height / 2,
        },
      } as LayoutNode;
    });
  }

  @property({ type: Array })
  set edges(edges: any[]) {
    this._state.edges.set(edges);
    this._notifyChange();
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
            id: h.handleId || h.getAttribute('data-handleid') || null,
            type: h.type || h.getAttribute('type'),
            position: h.position || h.getAttribute('data-handlepos'),
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
      this._notifyChange();
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

  /**
   * Fits the view to the current nodes.
   * @param padding Optional padding in pixels (default: 50)
   * @param duration Optional animation duration in ms (default: 400)
   */
  async fitView(padding = 50, duration = 400) {
    if (!this._panZoom || this.nodes.length === 0) return;

    const visibleNodes = Array.from(this._state.nodeLookup.values()).filter(n => !n.hidden);
    if (visibleNodes.length === 0) return;

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    visibleNodes.forEach((node) => {
      const { x, y } = node.internals.positionAbsolute;
      const width = node.measured.width || 0;
      const height = node.measured.height || 0;

      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x + width);
      maxY = Math.max(maxY, y + height);
    });

    const graphWidth = maxX - minX;
    const graphHeight = maxY - minY;
    const containerWidth = this.offsetWidth;
    const containerHeight = this.offsetHeight;

    if (containerWidth === 0 || containerHeight === 0) return;

    const zoomX = (containerWidth - padding * 2) / graphWidth;
    const zoomY = (containerHeight - padding * 2) / graphHeight;
    
    // Smart Zoom: Only zoom out if it doesn't fit at 1:1. Never zoom in past 1:1.
    const zoom = Math.min(zoomX, zoomY, 1);

    const x = (containerWidth - graphWidth * zoom) / 2 - minX * zoom;
    const y = (containerHeight - graphHeight * zoom) / 2 - minY * zoom;

    await this._panZoom.setViewport({ x, y, zoom }, { duration });
  }

  /**
   * Isolates a subgraph by hiding all nodes and edges not connected to the specified node.
   * @param nodeId The ID of the node to focus on.
   * @param direction The direction of the traversal ('downstream', 'upstream', or 'both').
   */
  isolateSubgraph(nodeId: string, direction: 'downstream' | 'upstream' | 'both' = 'downstream') {
    const allNodes = this._state.nodes.get();
    const allEdges = this._state.edges.get();
    const nodesToKeep = new Set<string>();
    const queue: string[] = [nodeId];

    nodesToKeep.add(nodeId);

    let head = 0;
    while (head < queue.length) {
      const currentId = queue[head++];

      if (direction === 'downstream' || direction === 'both') {
        allEdges.forEach(edge => {
          if (edge.source === currentId && !nodesToKeep.has(edge.target)) {
            nodesToKeep.add(edge.target);
            queue.push(edge.target);
          }
        });
      }

      if (direction === 'upstream' || direction === 'both') {
        allEdges.forEach(edge => {
          if (edge.target === currentId && !nodesToKeep.has(edge.source)) {
            nodesToKeep.add(edge.source);
            queue.push(edge.source);
          }
        });
      }
    }

    this.nodes = allNodes.map(node => ({
      ...node,
      hidden: !nodesToKeep.has(node.id),
    }));

    this.edges = allEdges.map(edge => ({
      ...edge,
      hidden: !(nodesToKeep.has(edge.source) && nodesToKeep.has(edge.target)),
    }));

    // Fit view to the isolated subgraph after a short delay to allow for rendering
    setTimeout(() => this.fitView(), 100);
  }

  /**
   * Clears any subgraph isolation, showing all nodes and edges.
   */
  clearIsolation() {
    this.nodes = this.nodes.map(node => ({ ...node, hidden: false }));
    this.edges = this.edges.map(edge => ({ ...edge, hidden: false }));
    setTimeout(() => this.fitView(), 100);
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

    // Handle Render-Measure-Reflow completion
    if (this._isMeasuring) {
      // Use double rAF to ensure browser has painted and ResizeObserver has updated
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const allMeasured = this.nodes.every(n => n.measured?.width && n.measured.width > 0);
          if (allMeasured) {
            this._isMeasuring = false;
            const newNodes = this._performLayout(this.nodes, this.edges);
            this.nodes = newNodes; 
            
            if (this.autoFit) {
              setTimeout(() => this.fitView(), 50);
            }
            
            this.dispatchEvent(new CustomEvent('layout-complete', {
              detail: { strategy: this.layoutStrategy }
            }));
          }
        });
      });
      return;
    }

    // Trigger layout if layout properties change (and we aren't already measuring)
    if (!this._isMeasuring && this.layoutEnabled && (
      changedProperties.has('layoutEnabled') ||
      changedProperties.has('layoutPadding') ||
      changedProperties.has('layoutStrategy')
    )) {
      const newNodes = this._performLayout(this.nodes, this.edges);
      this.nodes = newNodes;
      
      if (this.autoFit) {
        setTimeout(() => this.fitView(), 50);
      }

      this.dispatchEvent(new CustomEvent('layout-complete', {
        detail: { strategy: this.layoutStrategy }
      }));
    }

    // Handle Auto-Fit on graph changes
    if (this.autoFit && !this._isMeasuring && (changedProperties.has('nodes') || changedProperties.has('edges'))) {
      // Use a small delay to ensure rendering is stable
      setTimeout(() => this.fitView(), 100);
    }

    // Reactive Subgraph Isolation
    if (changedProperties.has('focusNode') || changedProperties.has('focusDirection')) {
      if (this.focusNode) {
        this.isolateSubgraph(this.focusNode, this.focusDirection);
      } else if (changedProperties.get('focusNode')) {
        // Only clear if it was previously set
        this.clearIsolation();
      }
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

                    // Performance: Directly update DOM transform to eliminate lag vs edges
                    const el = this.shadowRoot?.querySelector(`.xyflow__node[data-id="${id}"]`) as HTMLElement;
                    if (el) {
                      el.style.transform = `translate(${item.position.x}px, ${item.position.y}px)`;
                    }
                  }
                });

                // Recalculate all absolute positions to ensure children follow parents
                updateAbsolutePositions(this._state.nodeLookup, this._state.parentLookup, {
                  nodeOrigin: this._state.nodeOrigin,
                  nodeExtent: this._state.nodeExtent,
                });

                // Trigger update via signal (asynchronously)
                this._state.nodes.set([...this.nodes]);
                this._notifyChange();
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

  private _onNodeResizeStart(e: CustomEvent) {
    const { nodeId, event } = e.detail;
    const startX = event.clientX;
    const startY = event.clientY;
    
    const node = this._state.nodeLookup.get(nodeId);
    if (!node) return;

    const startWidth = node.measured.width || 150;
    const startHeight = node.measured.height || 50;
    const zoom = this._state.transform.get()[2];

    const onPointerMove = (moveEvent: PointerEvent) => {
      const deltaX = (moveEvent.clientX - startX) / zoom;
      const deltaY = (moveEvent.clientY - startY) / zoom;
      
      const newWidth = Math.max(50, startWidth + deltaX);
      const newHeight = Math.max(30, startHeight + deltaY);

      // Update node dimensions
      node.measured = { width: newWidth, height: newHeight };
      
      // Sync back to user node
      const userNode = this.nodes.find(n => n.id === nodeId) as any;
      if (userNode) {
        userNode.width = newWidth;
        userNode.height = newHeight;
        if (!userNode.style) userNode.style = {};
        userNode.style.width = `${newWidth}px`;
        userNode.style.height = `${newHeight}px`;
      }

      // Update absolute positions and signal
      updateAbsolutePositions(this._state.nodeLookup, this._state.parentLookup, {
        nodeOrigin: this._state.nodeOrigin,
        nodeExtent: this._state.nodeExtent,
      });
      this._state.nodes.set([...this.nodes]);
      this._notifyChange();
    };

    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      
      this.dispatchEvent(new CustomEvent('node-resize-end', {
        detail: { nodeId, width: node.measured.width, height: node.measured.height }
      }));
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
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
          class="xyflow__reveal-container"
          style="width: 100%; height: 100%; transition: opacity 0.4s ease-in-out, transform 0.4s ease-out; opacity: ${this._isMeasuring ? '0' : '1'}; transform: ${this._isMeasuring ? 'scale(0.98)' : 'scale(1)'};"
        >
          <div class="xyflow__viewport"
            style="transform: translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})"
          >
          <div class="xyflow__nodes" @handle-pointer-down="${this._onHandlePointerDown}" @node-resize-start="${this._onNodeResizeStart}">
            ${this.nodes.map((node) => {
              if (node.hidden) return null;
              const internalNode = this._state.nodeLookup.get(node.id);
              const pos = internalNode?.internals.positionAbsolute || node.position || { x: 0, y: 0 };
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
                  ?resizable="${(node as any).resizable}"
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
                refX="9"
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
                refX="9"
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
                refX="9"
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
                refX="9"
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
        ? html`<lit-controls .panZoom="${this._panZoom}" @fit-view="${() => this.fitView()}"></lit-controls>`
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