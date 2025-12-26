import { LitElement as P, html as $, svg as Z, css as A } from "lit";
import { unsafeStatic as F, html as E } from "lit/static-html.js";
import { property as a, customElement as z, query as T, state as S } from "lit/decorators.js";
import { signal as N, SignalWatcher as B } from "@lit-labs/signals";
import { infiniteExtent as K, Position as I, getBezierPath as j, adoptUserNodes as U, updateAbsolutePositions as H, XYPanZoom as J, PanOnScrollMode as M, XYDrag as Q, getHandlePosition as X, getSmoothStepPath as Y, getStraightPath as tt, XYHandle as et, ConnectionMode as ot, XYMinimap as st, getBoundsOfRects as nt, getInternalNodesBounds as rt } from "@xyflow/system";
import { m3Tokens as it } from "./theme.js";
function at() {
  return {
    nodes: N([]),
    edges: N([]),
    nodeLookup: /* @__PURE__ */ new Map(),
    parentLookup: /* @__PURE__ */ new Map(),
    nodeExtent: K,
    snapGrid: [15, 15],
    snapToGrid: !1,
    nodeOrigin: [0, 0],
    multiSelectionActive: !1,
    transform: N([0, 0, 1]),
    autoPanOnNodeDrag: !0,
    nodesDraggable: !0,
    selectNodesOnDrag: !0,
    nodeDragThreshold: 0,
    panZoom: null,
    domNode: null,
    connectionInProgress: N(null)
  };
}
var dt = Object.defineProperty, lt = Object.getOwnPropertyDescriptor, k = (t, o, e, n) => {
  for (var s = n > 1 ? void 0 : n ? lt(o, e) : o, r = t.length - 1, i; r >= 0; r--)
    (i = t[r]) && (s = (n ? i(o, e, s) : i(s)) || s);
  return n && s && dt(o, e, s), s;
};
let x = class extends B(P) {
  constructor() {
    super(...arguments), this.label = "", this.type = "default", this.data = {}, this.selected = !1, this.nodeId = "";
  }
  createRenderRoot() {
    return this;
  }
  render() {
    return $`
      <div class="label" style="font-size: 12px; color: #222; pointer-events: none;">${this.label}</div>
      <slot></slot>
      ${this.type === "input" || this.type === "default" ? $`<lit-handle type="source" data-handlepos="bottom" data-nodeid="${this.nodeId}"></lit-handle>` : ""}
      ${this.type === "output" || this.type === "default" ? $`<lit-handle type="target" data-handlepos="top" data-nodeid="${this.nodeId}"></lit-handle>` : ""}
    `;
  }
};
k([
  a({ type: String })
], x.prototype, "label", 2);
k([
  a({ type: String, reflect: !0 })
], x.prototype, "type", 2);
k([
  a({ type: Object })
], x.prototype, "data", 2);
k([
  a({ type: Boolean, reflect: !0 })
], x.prototype, "selected", 2);
k([
  a({ type: String, attribute: "data-id", reflect: !0 })
], x.prototype, "nodeId", 2);
x = k([
  z("lit-node")
], x);
var ht = Object.defineProperty, pt = Object.getOwnPropertyDescriptor, _ = (t, o, e, n) => {
  for (var s = n > 1 ? void 0 : n ? pt(o, e) : o, r = t.length - 1, i; r >= 0; r--)
    (i = t[r]) && (s = (n ? i(o, e, s) : i(s)) || s);
  return n && s && ht(o, e, s), s;
};
let m = class extends B(P) {
  constructor() {
    super(...arguments), this.sourceX = 0, this.sourceY = 0, this.targetX = 0, this.targetY = 0, this.sourcePosition = I.Right, this.targetPosition = I.Left, this.selected = !1;
  }
  render() {
    const [t] = j({
      sourceX: this.sourceX,
      sourceY: this.sourceY,
      sourcePosition: this.sourcePosition,
      targetX: this.targetX,
      targetY: this.targetY,
      targetPosition: this.targetPosition
    });
    return Z`
      <path d="${t}" />
    `;
  }
};
m.styles = A`
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
_([
  a({ type: Number })
], m.prototype, "sourceX", 2);
_([
  a({ type: Number })
], m.prototype, "sourceY", 2);
_([
  a({ type: Number })
], m.prototype, "targetX", 2);
_([
  a({ type: Number })
], m.prototype, "targetY", 2);
_([
  a({ type: String })
], m.prototype, "sourcePosition", 2);
_([
  a({ type: String })
], m.prototype, "targetPosition", 2);
_([
  a({ type: Boolean, reflect: !0 })
], m.prototype, "selected", 2);
m = _([
  z("lit-edge")
], m);
var ct = Object.defineProperty, ut = Object.getOwnPropertyDescriptor, g = (t, o, e, n) => {
  for (var s = n > 1 ? void 0 : n ? ut(o, e) : o, r = t.length - 1, i; r >= 0; r--)
    (i = t[r]) && (s = (n ? i(o, e, s) : i(s)) || s);
  return n && s && ct(o, e, s), s;
};
const b = {
  fromAttribute: (t) => t !== "false" && t !== null,
  toAttribute: (t) => t ? "" : null
};
let u = class extends B(P) {
  constructor() {
    super(...arguments), this._drags = /* @__PURE__ */ new Map(), this._state = at(), this.nodeTypes = {
      default: "lit-node",
      input: "lit-node",
      output: "lit-node"
    }, this.showControls = !1, this.showMinimap = !1, this.showGrid = !0, this.nodesDraggable = !0, this.nodesConnectable = !0, this.panOnDrag = !0, this.zoomOnScroll = !0, this.zoomOnPinch = !0, this.zoomOnDoubleClick = !0, this._width = 0, this._height = 0, this.viewport = { x: 0, y: 0, zoom: 1 };
  }
  set nodes(t) {
    this._state.nodes.set(t), U(t, this._state.nodeLookup, this._state.parentLookup, {
      nodeOrigin: this._state.nodeOrigin,
      nodeExtent: this._state.nodeExtent
    }), H(this._state.nodeLookup, this._state.parentLookup, {
      nodeOrigin: this._state.nodeOrigin,
      nodeExtent: this._state.nodeExtent
    });
  }
  get nodes() {
    return this._state.nodes.get();
  }
  set edges(t) {
    this._state.edges.set(t);
  }
  get edges() {
    return this._state.edges.get();
  }
  connectedCallback() {
    super.connectedCallback(), this._resizeObserver = new ResizeObserver((t) => {
      for (const o of t)
        if (o.target === this)
          this._width = o.contentRect.width, this._height = o.contentRect.height;
        else if (o.target !== this._renderer) {
          const e = o.target.dataset.id;
          e && this._updateNodeDimensions(e, o.target);
        }
    }), this._resizeObserver.observe(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._resizeObserver?.disconnect();
  }
  async _updateNodeDimensions(t, o) {
    const e = this._state.nodeLookup.get(t);
    if (e) {
      "updateComplete" in o && await o.updateComplete;
      const { width: n, height: s } = o.getBoundingClientRect(), r = this._state.transform.get()[2];
      e.measured = {
        width: n / r,
        height: s / r
      };
      const i = this.nodes.find((p) => p.id === t);
      i && (i.measured = e.measured);
      const h = o.querySelectorAll("lit-handle");
      if (h && h.length > 0) {
        const p = [], d = [];
        h.forEach((c) => {
          const l = c.getBoundingClientRect(), f = o.getBoundingClientRect(), v = {
            id: c.handleId || null,
            type: c.type,
            position: c.position,
            x: (l.left - f.left) / r,
            y: (l.top - f.top) / r,
            width: l.width / r,
            height: l.height / r
          };
          c.type === "source" ? p.push(v) : d.push(v);
        }), e.internals.handleBounds = {
          source: p,
          target: d
        }, console.log(`Node ${t} handleBounds:`, e.internals.handleBounds);
      }
      H(this._state.nodeLookup, this._state.parentLookup, {
        nodeOrigin: this._state.nodeOrigin,
        nodeExtent: this._state.nodeExtent
      }), this._state.nodes.set([...this.nodes]);
    }
  }
  _selectNode(t, o) {
    const e = this.nodes.map((n) => n.id === t ? { ...n, selected: !n.selected } : o ? n : { ...n, selected: !1 });
    this.nodes = e;
  }
  firstUpdated() {
    this._renderer && (this._state.domNode = this._renderer, this._resizeObserver?.observe(this._renderer), this._renderer.onclick = () => {
      this.nodes = this.nodes.map((t) => ({ ...t, selected: !1 }));
    }, this._panZoom = J({
      domNode: this._renderer,
      minZoom: 0.5,
      maxZoom: 2,
      translateExtent: this._state.nodeExtent,
      viewport: this.viewport,
      onDraggingChange: () => {
      },
      onPanZoom: (t, { x: o, y: e, zoom: n }) => {
        this.viewport = { x: o, y: e, zoom: n }, this._state.transform.set([o, e, n]), this._viewport && (this._viewport.style.transform = `translate(${o}px,${e}px) scale(${n})`);
      }
    }), this._panZoom.update({
      noWheelClassName: "nowheel",
      noPanClassName: "nopan",
      preventScrolling: !0,
      panOnScroll: !1,
      panOnDrag: this.panOnDrag,
      panOnScrollMode: M.Free,
      panOnScrollSpeed: 0.5,
      userSelectionActive: !1,
      zoomOnPinch: this.zoomOnPinch,
      zoomOnScroll: this.zoomOnScroll,
      zoomOnDoubleClick: this.zoomOnDoubleClick,
      zoomActivationKeyPressed: !1,
      lib: "lit",
      onTransformChange: () => {
      },
      connectionInProgress: !1,
      paneClickDistance: 0
    }), this._state.panZoom = this._panZoom);
  }
  updated(t) {
    (t.has("nodes") || t.has("nodesDraggable")) && this._setupDrags(), this._panZoom && (t.has("panOnDrag") || t.has("zoomOnScroll") || t.has("zoomOnPinch") || t.has("zoomOnDoubleClick")) && this._panZoom.update({
      noWheelClassName: "nowheel",
      noPanClassName: "nopan",
      preventScrolling: !0,
      panOnScroll: !1,
      panOnDrag: this.panOnDrag,
      panOnScrollMode: M.Free,
      panOnScrollSpeed: 0.5,
      userSelectionActive: !1,
      zoomOnPinch: this.zoomOnPinch,
      zoomOnScroll: this.zoomOnScroll,
      zoomOnDoubleClick: this.zoomOnDoubleClick,
      zoomActivationKeyPressed: !1,
      lib: "lit",
      onTransformChange: () => {
      },
      connectionInProgress: !1,
      paneClickDistance: 0
    });
  }
  _setupDrags() {
    const t = this.shadowRoot?.querySelectorAll(".xyflow__node"), o = /* @__PURE__ */ new Set();
    t?.forEach((e) => {
      const n = e.dataset.id;
      if (n) {
        if (o.add(n), this._resizeObserver?.observe(e), e.onclick = (r) => {
          r.stopPropagation(), this._selectNode(n, r.shiftKey || r.metaKey);
        }, e.style.cursor = this.nodesDraggable ? "grab" : "default", !this.nodesDraggable) {
          this._drags.delete(n);
          return;
        }
        let s = this._drags.get(n);
        s || (s = Q({
          getStoreItems: () => ({
            ...this._state,
            nodes: this._state.nodes.get(),
            edges: this._state.edges.get(),
            transform: this._state.transform.get(),
            panBy: async (r) => {
              const { panZoom: i, nodeExtent: h } = this._state, p = this._state.transform.get();
              return i ? !!await i.setViewportConstrained(
                {
                  x: p[0] + r.x,
                  y: p[1] + r.y,
                  zoom: p[2]
                },
                [[0, 0], [this.offsetWidth, this.offsetHeight]],
                h
              ) : !1;
            },
            updateNodePositions: (r) => {
              r.forEach((i, h) => {
                const p = this._state.nodeLookup.get(h);
                if (p) {
                  p.position = i.position, p.internals.positionAbsolute = i.internals.positionAbsolute;
                  const d = this.nodes.find((c) => c.id === h);
                  d && (d.position = i.position);
                }
              }), H(this._state.nodeLookup, this._state.parentLookup, {
                nodeOrigin: this._state.nodeOrigin,
                nodeExtent: this._state.nodeExtent
              }), this._state.nodes.set([...this.nodes]);
            },
            unselectNodesAndEdges: () => {
            }
          })
        }), this._drags.set(n, s)), s.update({
          domNode: e,
          nodeId: n
        });
      }
    });
    for (const e of this._drags.keys())
      o.has(e) || this._drags.delete(e);
  }
  _renderEdge(t) {
    const o = this._state.nodeLookup.get(t.source), e = this._state.nodeLookup.get(t.target);
    if (!o || !e) return null;
    const n = this.nodes.find((l) => l.id === t.source), s = this.nodes.find((l) => l.id === t.target);
    if (n?.hidden || s?.hidden) return null;
    const r = (o.internals.handleBounds?.source || []).find(
      (l) => l.id === (t.sourceHandle || null)
    ) || o.internals.handleBounds?.source?.[0] || {
      id: null,
      type: "source",
      nodeId: t.source,
      position: I.Bottom,
      x: (o.measured.width || 0) / 2,
      y: o.measured.height || 0,
      width: 1,
      height: 1
    }, i = (e.internals.handleBounds?.target || []).find(
      (l) => l.id === (t.targetHandle || null)
    ) || e.internals.handleBounds?.target?.[0] || {
      id: null,
      type: "target",
      nodeId: t.target,
      position: I.Top,
      x: (e.measured.width || 0) / 2,
      y: 0,
      width: 1,
      height: 1
    }, h = X(o, r, r.position, !0), p = X(e, i, i.position, !0);
    let d = "";
    const c = {
      sourceX: h.x,
      sourceY: h.y,
      sourcePosition: r.position,
      targetX: p.x,
      targetY: p.y,
      targetPosition: i.position
    };
    switch (t.type) {
      case "straight":
        [d] = tt(c);
        break;
      case "smoothstep":
        [d] = Y(c);
        break;
      case "step":
        [d] = Y({ ...c, borderRadius: 0 });
        break;
      default:
        [d] = j(c);
        break;
    }
    return Z`
      <path
        d="${d}"
        fill="none"
        stroke="${t.selected ? "var(--md-sys-color-primary)" : "var(--md-sys-color-outline-variant)"}"
        stroke-width="2"
        style="pointer-events: none;"
      />
    `;
  }
  _onHandlePointerDown(t) {
    const { event: o, handleId: e, nodeId: n, type: s, handleDomNode: r } = t.detail, i = s === "target";
    if (this._state.connectionInProgress.get() || !this.nodesConnectable)
      return;
    const h = r.getBoundingClientRect(), p = r.parentElement?.getBoundingClientRect(), d = this._state.transform.get()[2], c = {
      id: e,
      nodeId: n,
      type: s,
      position: r.position,
      x: (h.left - (p?.left ?? 0)) / d,
      y: (h.top - (p?.top ?? 0)) / d,
      width: h.width / d,
      height: h.height / d
    };
    et.onPointerDown(o, {
      handleId: e,
      nodeId: n,
      isTarget: i,
      domNode: this._renderer,
      handleDomNode: r,
      nodeLookup: this._state.nodeLookup,
      connectionMode: ot.Strict,
      lib: "lit",
      autoPanOnConnect: !0,
      flowId: "lit-flow",
      dragThreshold: 0,
      panBy: async (l) => {
        const f = this._panZoom?.getViewport();
        return f ? (await this._panZoom?.setViewport({
          x: f.x + l.x,
          y: f.y + l.y,
          zoom: f.zoom
        }), !0) : !1;
      },
      getTransform: () => this._state.transform.get(),
      getFromHandle: () => c,
      updateConnection: (l) => {
        l.inProgress ? this._state.connectionInProgress.set(l) : this._state.connectionInProgress.set(null);
      },
      cancelConnection: () => {
        this._state.connectionInProgress.set(null);
      },
      onConnect: (l) => {
        this.dispatchEvent(new CustomEvent("connect", {
          detail: l
        }));
        const f = `e-${l.source}${l.sourceHandle || ""}-${l.target}${l.targetHandle || ""}`;
        this.edges = [...this.edges, { ...l, id: f }];
      },
      connectionRadius: 20
    });
  }
  _renderConnectionLine(t) {
    if (!t) return null;
    const [o] = j({
      sourceX: t.from.x,
      sourceY: t.from.y,
      sourcePosition: t.fromPosition,
      targetX: t.to.x,
      targetY: t.to.y,
      targetPosition: t.toPosition
    });
    return Z`
      <path
        class="xyflow__connection-path"
        d="${o}"
        fill="none"
        stroke="#b1b1b7"
        stroke-width="2"
        stroke-dasharray="5,5"
      />
    `;
  }
  render() {
    const t = this._state.transform.get(), o = this._state.connectionInProgress.get();
    return E`
      <div class="xyflow__renderer ${this.showGrid ? "has-grid" : ""}">
        <div
          class="xyflow__viewport"
          style="transform: translate(${t[0]}px, ${t[1]}px) scale(${t[2]})"
        >
          <div class="xyflow__nodes" @handle-pointer-down="${this._onHandlePointerDown}">
            ${this.nodes.map((e) => {
      if (e.hidden) return null;
      const s = this._state.nodeLookup.get(e.id)?.internals.positionAbsolute || e.position, r = this.nodeTypes[e.type || "default"] || this.nodeTypes.default, i = F(r), h = e.style || {}, p = Object.entries(h).map(([C, D]) => `${C.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${typeof D == "number" ? `${D}px` : D}`).join("; "), d = e.width || h.width, c = e.height || h.height, l = d ? `width: ${typeof d == "number" ? `${d}px` : d};` : "", f = c ? `height: ${typeof c == "number" ? `${c}px` : c};` : "", v = e.zIndex ? `z-index: ${e.zIndex};` : "";
      return E`
                <${i}
                  class="xyflow__node"
                  data-id="${e.id}"
                  type="${e.type || "default"}"
                  .nodeId="${e.id}"
                  style="transform: translate(${s.x}px, ${s.y}px); ${p} ${l} ${f} ${v}"
                  .data="${e.data}"
                  .label="${e.data.label}"
                  .type="${e.type || "default"}"
                  ?selected="${e.selected}"
                >
                </${i}>
              `;
    })}
          </div>
          <svg class="xyflow__edges">
            ${this.edges.map((e) => this._renderEdge(e))}
            ${this._renderConnectionLine(o)}
          </svg>
        </div>
      </div>
      ${this.showControls ? E`<lit-controls .panZoom="${this._panZoom}"></lit-controls>` : ""}
      ${this.showMinimap ? E`
            <lit-minimap
              .panZoom="${this._panZoom}"
              .nodeLookup="${this._state.nodeLookup}"
              .transform="${this._state.transform.get()}"
              .translateExtent="${this._state.nodeExtent}"
              .width="${this._width}"
              .height="${this._height}"
            ></lit-minimap>
          ` : ""}
    `;
  }
};
u.styles = [
  it,
  A`
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
      transition: box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out;
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
      border-width: 2px;
      box-shadow: var(--md-sys-elevation-2);
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
  `
];
g([
  T(".xyflow__renderer")
], u.prototype, "_renderer", 2);
g([
  T(".xyflow__viewport")
], u.prototype, "_viewport", 2);
g([
  S()
], u.prototype, "_panZoom", 2);
g([
  S()
], u.prototype, "_state", 2);
g([
  a({ type: Object })
], u.prototype, "nodeTypes", 2);
g([
  a({ type: Boolean, attribute: "show-controls", reflect: !0 })
], u.prototype, "showControls", 2);
g([
  a({ type: Boolean, attribute: "show-minimap", reflect: !0, converter: b })
], u.prototype, "showMinimap", 2);
g([
  a({ type: Boolean, attribute: "show-grid", reflect: !0, converter: b })
], u.prototype, "showGrid", 2);
g([
  a({ type: Boolean, attribute: "nodes-draggable", reflect: !0, converter: b })
], u.prototype, "nodesDraggable", 2);
g([
  a({ type: Boolean, attribute: "nodes-connectable", reflect: !0, converter: b })
], u.prototype, "nodesConnectable", 2);
g([
  a({ type: Boolean, attribute: "pan-on-drag", reflect: !0, converter: b })
], u.prototype, "panOnDrag", 2);
g([
  a({ type: Boolean, attribute: "zoom-on-scroll", reflect: !0, converter: b })
], u.prototype, "zoomOnScroll", 2);
g([
  a({ type: Boolean, attribute: "zoom-on-pinch", reflect: !0, converter: b })
], u.prototype, "zoomOnPinch", 2);
g([
  a({ type: Boolean, attribute: "zoom-on-double-click", reflect: !0, converter: b })
], u.prototype, "zoomOnDoubleClick", 2);
g([
  S()
], u.prototype, "_width", 2);
g([
  S()
], u.prototype, "_height", 2);
g([
  a({ type: Array })
], u.prototype, "nodes", 1);
g([
  a({ type: Array })
], u.prototype, "edges", 1);
g([
  a({ type: Object })
], u.prototype, "viewport", 2);
u = g([
  z("lit-flow")
], u);
var gt = Object.defineProperty, ft = Object.getOwnPropertyDescriptor, L = (t, o, e, n) => {
  for (var s = n > 1 ? void 0 : n ? ft(o, e) : o, r = t.length - 1, i; r >= 0; r--)
    (i = t[r]) && (s = (n ? i(o, e, s) : i(s)) || s);
  return n && s && gt(o, e, s), s;
};
let O = class extends P {
  constructor() {
    super(), this.type = "source", this.position = I.Top, this.addEventListener("mousedown", (t) => this._onPointerDown(t)), this.addEventListener("touchstart", (t) => this._onPointerDown(t));
  }
  createRenderRoot() {
    return this;
  }
  _onPointerDown(t) {
    t.stopPropagation();
    const o = this.getAttribute("data-nodeid");
    this.dispatchEvent(new CustomEvent("handle-pointer-down", {
      bubbles: !0,
      composed: !0,
      detail: {
        event: t,
        handleId: this.handleId,
        nodeId: o,
        type: this.type,
        handleDomNode: this
      }
    }));
  }
  connectedCallback() {
    super.connectedCallback(), this.classList.add("lit-flow__handle"), this.classList.add(this.type), this.classList.add("connectable"), this.classList.add("connectableend");
  }
  updated(t) {
    (t.has("nodeId") || t.has("handleId") || t.has("type")) && this.setAttribute("data-id", `lit-flow-${this.nodeId || ""}-${this.handleId || ""}-${this.type}`);
  }
  render() {
    return $`
      <div style="
        width: 100%;
        height: 100%;
        background: inherit;
        border-radius: inherit;
        pointer-events: none;
      "></div>
    `;
  }
};
L([
  a({ type: String, reflect: !0 })
], O.prototype, "type", 2);
L([
  a({ type: String, reflect: !0, attribute: "data-handlepos" })
], O.prototype, "position", 2);
L([
  a({ type: String, reflect: !0, attribute: "data-handleid" })
], O.prototype, "handleId", 2);
L([
  a({ type: String, reflect: !0, attribute: "data-nodeid" })
], O.prototype, "nodeId", 2);
O = L([
  z("lit-handle")
], O);
var mt = Object.defineProperty, yt = Object.getOwnPropertyDescriptor, V = (t, o, e, n) => {
  for (var s = n > 1 ? void 0 : n ? yt(o, e) : o, r = t.length - 1, i; r >= 0; r--)
    (i = t[r]) && (s = (n ? i(o, e, s) : i(s)) || s);
  return n && s && mt(o, e, s), s;
};
let R = class extends B(P) {
  _zoomIn() {
    this.panZoom?.scaleBy(1.2);
  }
  _zoomOut() {
    this.panZoom?.scaleBy(1 / 1.2);
  }
  _fitView() {
    this.panZoom?.setViewport({ x: 0, y: 0, zoom: 1 });
  }
  render() {
    return $`
      <button @click="${this._zoomIn}" title="Zoom In">
        <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
      </button>
      <button @click="${this._zoomOut}" title="Zoom Out">
        <svg viewBox="0 0 24 24"><path d="M19 13H5v-2h14v2z"/></svg>
      </button>
      <button @click="${this._fitView}" title="Reset View">
        <svg viewBox="0 0 24 24"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg>
      </button>
    `;
  }
};
R.styles = A`
    :host {
      display: block;
      position: absolute;
      left: 10px;
      bottom: 10px;
      z-index: 5;
      display: flex;
      flex-direction: column;
      gap: 4px;
      background: var(--md-sys-color-surface);
      padding: 4px;
      border-radius: var(--md-sys-shape-corner-extra-small);
      box-shadow: var(--md-sys-elevation-1);
      border: 1px solid var(--md-sys-color-outline-variant);
    }

    button {
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      border-radius: var(--md-sys-shape-corner-extra-small);
      cursor: pointer;
      padding: 0;
      color: var(--md-sys-color-on-surface);
      transition: background-color 0.2s ease;
    }

    button:hover {
      background: var(--md-sys-color-surface-variant);
    }

    button svg {
      width: 18px;
      height: 18px;
      fill: currentColor;
    }
  `;
V([
  a({ type: Object })
], R.prototype, "panZoom", 2);
R = V([
  z("lit-controls")
], R);
var _t = Object.defineProperty, bt = Object.getOwnPropertyDescriptor, w = (t, o, e, n) => {
  for (var s = n > 1 ? void 0 : n ? bt(o, e) : o, r = t.length - 1, i; r >= 0; r--)
    (i = t[r]) && (s = (n ? i(o, e, s) : i(s)) || s);
  return n && s && _t(o, e, s), s;
};
let y = class extends B(P) {
  constructor() {
    super(...arguments), this.nodeLookup = /* @__PURE__ */ new Map(), this.transform = [0, 0, 1], this.translateExtent = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], this.width = 0, this.height = 0;
  }
  updated(t) {
    if (!this._minimapInstance && this.panZoom) {
      const o = this.shadowRoot?.querySelector("svg");
      o && (this._minimapInstance = st({
        domNode: o,
        panZoom: this.panZoom,
        getTransform: () => this.transform,
        getViewScale: () => {
          const e = this._getBoundingRect();
          return Math.max(e.width / 200, e.height / 150);
        }
      }));
    }
    this._minimapInstance && (t.has("width") || t.has("height") || t.has("translateExtent")) && this._minimapInstance.update({
      width: this.width,
      height: this.height,
      translateExtent: this.translateExtent
    });
  }
  _getBoundingRect() {
    const t = {
      x: -this.transform[0] / this.transform[2],
      y: -this.transform[1] / this.transform[2],
      width: this.width / this.transform[2],
      height: this.height / this.transform[2]
    };
    return this.nodeLookup.size > 0 ? nt(rt(this.nodeLookup), t) : t;
  }
  render() {
    const t = this._getBoundingRect(), o = {
      x: -this.transform[0] / this.transform[2],
      y: -this.transform[1] / this.transform[2],
      width: this.width / this.transform[2],
      height: this.height / this.transform[2]
    }, e = 200, n = 150, s = t.width / e, r = t.height / n, i = Math.max(s, r), h = i * e, p = i * n, d = 5 * i, c = t.x - (h - t.width) / 2 - d, l = t.y - (p - t.height) / 2 - d, f = h + d * 2, v = p + d * 2;
    return $`
      <svg
        width="${e}"
        height="${n}"
        viewBox="${c} ${l} ${f} ${v}"
      >
        ${Array.from(this.nodeLookup.values()).map((C) => {
      const { x: D, y: W } = C.internals.positionAbsolute, G = C.measured.width || 0, q = C.measured.height || 0;
      return Z`
            <rect
              class="minimap-node"
              x="${D}"
              y="${W}"
              width="${G}"
              height="${q}"
              rx="2"
              ry="2"
            />
          `;
    })}
        <path
          class="minimap-mask"
          d="M${c - d},${l - d}h${f + d * 2}v${v + d * 2}h${-f - d * 2}z
             M${o.x},${o.y}h${o.width}v${o.height}h${-o.width}z"
        />
      </svg>
    `;
  }
};
y.styles = A`
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
w([
  a({ type: Object })
], y.prototype, "panZoom", 2);
w([
  a({ type: Object })
], y.prototype, "nodeLookup", 2);
w([
  a({ type: Array })
], y.prototype, "transform", 2);
w([
  a({ type: Array })
], y.prototype, "translateExtent", 2);
w([
  a({ type: Number })
], y.prototype, "width", 2);
w([
  a({ type: Number })
], y.prototype, "height", 2);
w([
  S()
], y.prototype, "_minimapInstance", 2);
y = w([
  z("lit-minimap")
], y);
export {
  R as LitControls,
  m as LitEdge,
  u as LitFlow,
  O as LitHandle,
  y as LitMinimap,
  x as LitNode,
  at as createInitialState,
  it as m3Tokens
};
//# sourceMappingURL=litflow.js.map
