import { LitElement as P, html as x, svg as D, css as R } from "lit";
import { unsafeStatic as q, html as N } from "lit/static-html.js";
import { property as l, customElement as O, query as X, state as L } from "lit/decorators.js";
import { signal as S, SignalWatcher as E } from "@lit-labs/signals";
import { infiniteExtent as F, Position as C, getBezierPath as j, adoptUserNodes as K, updateAbsolutePositions as H, XYPanZoom as G, PanOnScrollMode as U, XYDrag as J, getHandlePosition as M, getSmoothStepPath as A, getStraightPath as Q, XYHandle as tt, ConnectionMode as et, XYMinimap as ot, getBoundsOfRects as st, getInternalNodesBounds as nt } from "@xyflow/system";
import { m3Tokens as it } from "./theme.js";
function rt() {
  return {
    nodes: S([]),
    edges: S([]),
    nodeLookup: /* @__PURE__ */ new Map(),
    parentLookup: /* @__PURE__ */ new Map(),
    nodeExtent: F,
    snapGrid: [15, 15],
    snapToGrid: !1,
    nodeOrigin: [0, 0],
    multiSelectionActive: !1,
    transform: S([0, 0, 1]),
    autoPanOnNodeDrag: !0,
    nodesDraggable: !0,
    selectNodesOnDrag: !0,
    nodeDragThreshold: 0,
    panZoom: null,
    domNode: null,
    connectionInProgress: S(null)
  };
}
var at = Object.defineProperty, dt = Object.getOwnPropertyDescriptor, k = (t, o, e, n) => {
  for (var s = n > 1 ? void 0 : n ? dt(o, e) : o, i = t.length - 1, r; i >= 0; i--)
    (r = t[i]) && (s = (n ? r(o, e, s) : r(s)) || s);
  return n && s && at(o, e, s), s;
};
let b = class extends E(P) {
  constructor() {
    super(...arguments), this.label = "", this.type = "default", this.data = {}, this.selected = !1, this.nodeId = "";
  }
  createRenderRoot() {
    return this;
  }
  render() {
    return x`
      <div class="label" style="font-size: 12px; color: #222; pointer-events: none;">${this.label}</div>
      <slot></slot>
      ${this.type === "input" || this.type === "default" ? x`<lit-handle type="source" data-handlepos="bottom" data-nodeid="${this.nodeId}"></lit-handle>` : ""}
      ${this.type === "output" || this.type === "default" ? x`<lit-handle type="target" data-handlepos="top" data-nodeid="${this.nodeId}"></lit-handle>` : ""}
    `;
  }
};
k([
  l({ type: String })
], b.prototype, "label", 2);
k([
  l({ type: String, reflect: !0 })
], b.prototype, "type", 2);
k([
  l({ type: Object })
], b.prototype, "data", 2);
k([
  l({ type: Boolean, reflect: !0 })
], b.prototype, "selected", 2);
k([
  l({ type: String, attribute: "data-id", reflect: !0 })
], b.prototype, "nodeId", 2);
b = k([
  O("lit-node")
], b);
var lt = Object.defineProperty, ht = Object.getOwnPropertyDescriptor, _ = (t, o, e, n) => {
  for (var s = n > 1 ? void 0 : n ? ht(o, e) : o, i = t.length - 1, r; i >= 0; i--)
    (r = t[i]) && (s = (n ? r(o, e, s) : r(s)) || s);
  return n && s && lt(o, e, s), s;
};
let m = class extends E(P) {
  constructor() {
    super(...arguments), this.sourceX = 0, this.sourceY = 0, this.targetX = 0, this.targetY = 0, this.sourcePosition = C.Right, this.targetPosition = C.Left, this.selected = !1;
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
    return D`
      <path d="${t}" />
    `;
  }
};
m.styles = R`
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
  l({ type: Number })
], m.prototype, "sourceX", 2);
_([
  l({ type: Number })
], m.prototype, "sourceY", 2);
_([
  l({ type: Number })
], m.prototype, "targetX", 2);
_([
  l({ type: Number })
], m.prototype, "targetY", 2);
_([
  l({ type: String })
], m.prototype, "sourcePosition", 2);
_([
  l({ type: String })
], m.prototype, "targetPosition", 2);
_([
  l({ type: Boolean, reflect: !0 })
], m.prototype, "selected", 2);
m = _([
  O("lit-edge")
], m);
var pt = Object.defineProperty, ct = Object.getOwnPropertyDescriptor, f = (t, o, e, n) => {
  for (var s = n > 1 ? void 0 : n ? ct(o, e) : o, i = t.length - 1, r; i >= 0; i--)
    (r = t[i]) && (s = (n ? r(o, e, s) : r(s)) || s);
  return n && s && pt(o, e, s), s;
};
let g = class extends E(P) {
  constructor() {
    super(...arguments), this._drags = /* @__PURE__ */ new Map(), this._state = rt(), this.nodeTypes = {
      default: "lit-node",
      input: "lit-node",
      output: "lit-node"
    }, this.showControls = !1, this.showMinimap = !1, this._width = 0, this._height = 0, this.viewport = { x: 0, y: 0, zoom: 1 };
  }
  set nodes(t) {
    this._state.nodes.set(t), K(t, this._state.nodeLookup, this._state.parentLookup, {
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
      const { width: n, height: s } = o.getBoundingClientRect(), i = this._state.transform.get()[2];
      e.measured = {
        width: n / i,
        height: s / i
      };
      const r = this.nodes.find((p) => p.id === t);
      r && (r.measured = e.measured);
      const h = o.querySelectorAll("lit-handle");
      if (h && h.length > 0) {
        const p = [], a = [];
        h.forEach((c) => {
          const d = c.getBoundingClientRect(), u = o.getBoundingClientRect(), v = {
            id: c.handleId || null,
            type: c.type,
            position: c.position,
            x: (d.left - u.left) / i,
            y: (d.top - u.top) / i,
            width: d.width / i,
            height: d.height / i
          };
          c.type === "source" ? p.push(v) : a.push(v);
        }), e.internals.handleBounds = {
          source: p,
          target: a
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
    }, this._panZoom = G({
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
      panOnDrag: !0,
      panOnScrollMode: U.Free,
      panOnScrollSpeed: 0.5,
      userSelectionActive: !1,
      zoomOnPinch: !0,
      zoomOnScroll: !0,
      zoomOnDoubleClick: !0,
      zoomActivationKeyPressed: !1,
      lib: "lit",
      onTransformChange: () => {
      },
      connectionInProgress: !1,
      paneClickDistance: 0
    }), this._state.panZoom = this._panZoom);
  }
  updated(t) {
    t.has("nodes") && this._setupDrags();
  }
  _setupDrags() {
    const t = this.shadowRoot?.querySelectorAll(".xyflow__node"), o = /* @__PURE__ */ new Set();
    t?.forEach((e) => {
      const n = e.dataset.id;
      if (n) {
        o.add(n), this._resizeObserver?.observe(e), e.onclick = (i) => {
          i.stopPropagation(), this._selectNode(n, i.shiftKey || i.metaKey);
        };
        let s = this._drags.get(n);
        s || (s = J({
          getStoreItems: () => ({
            ...this._state,
            nodes: this._state.nodes.get(),
            edges: this._state.edges.get(),
            transform: this._state.transform.get(),
            panBy: async (i) => {
              const { panZoom: r, nodeExtent: h } = this._state, p = this._state.transform.get();
              return r ? !!await r.setViewportConstrained(
                {
                  x: p[0] + i.x,
                  y: p[1] + i.y,
                  zoom: p[2]
                },
                [[0, 0], [this.offsetWidth, this.offsetHeight]],
                h
              ) : !1;
            },
            updateNodePositions: (i) => {
              i.forEach((r, h) => {
                const p = this._state.nodeLookup.get(h);
                if (p) {
                  p.position = r.position, p.internals.positionAbsolute = r.internals.positionAbsolute;
                  const a = this.nodes.find((c) => c.id === h);
                  a && (a.position = r.position);
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
    const n = this.nodes.find((d) => d.id === t.source), s = this.nodes.find((d) => d.id === t.target);
    if (n?.hidden || s?.hidden) return null;
    const i = (o.internals.handleBounds?.source || []).find(
      (d) => d.id === (t.sourceHandle || null)
    ) || o.internals.handleBounds?.source?.[0] || {
      id: null,
      type: "source",
      nodeId: t.source,
      position: C.Bottom,
      x: (o.measured.width || 0) / 2,
      y: o.measured.height || 0,
      width: 1,
      height: 1
    }, r = (e.internals.handleBounds?.target || []).find(
      (d) => d.id === (t.targetHandle || null)
    ) || e.internals.handleBounds?.target?.[0] || {
      id: null,
      type: "target",
      nodeId: t.target,
      position: C.Top,
      x: (e.measured.width || 0) / 2,
      y: 0,
      width: 1,
      height: 1
    }, h = M(o, i, i.position, !0), p = M(e, r, r.position, !0);
    let a = "";
    const c = {
      sourceX: h.x,
      sourceY: h.y,
      sourcePosition: i.position,
      targetX: p.x,
      targetY: p.y,
      targetPosition: r.position
    };
    switch (t.type) {
      case "straight":
        [a] = Q(c);
        break;
      case "smoothstep":
        [a] = A(c);
        break;
      case "step":
        [a] = A({ ...c, borderRadius: 0 });
        break;
      default:
        [a] = j(c);
        break;
    }
    return D`
      <path
        d="${a}"
        fill="none"
        stroke="${t.selected ? "var(--md-sys-color-primary)" : "var(--md-sys-color-outline-variant)"}"
        stroke-width="2"
        style="pointer-events: none;"
      />
    `;
  }
  _onHandlePointerDown(t) {
    const { event: o, handleId: e, nodeId: n, type: s, handleDomNode: i } = t.detail, r = s === "target";
    if (this._state.connectionInProgress.get())
      return;
    const h = i.getBoundingClientRect(), p = i.parentElement?.getBoundingClientRect(), a = this._state.transform.get()[2], c = {
      id: e,
      nodeId: n,
      type: s,
      position: i.position,
      x: (h.left - (p?.left ?? 0)) / a,
      y: (h.top - (p?.top ?? 0)) / a,
      width: h.width / a,
      height: h.height / a
    };
    tt.onPointerDown(o, {
      handleId: e,
      nodeId: n,
      isTarget: r,
      domNode: this._renderer,
      handleDomNode: i,
      nodeLookup: this._state.nodeLookup,
      connectionMode: et.Strict,
      lib: "lit",
      autoPanOnConnect: !0,
      flowId: "lit-flow",
      dragThreshold: 0,
      panBy: async (d) => {
        const u = this._panZoom?.getViewport();
        return u ? (await this._panZoom?.setViewport({
          x: u.x + d.x,
          y: u.y + d.y,
          zoom: u.zoom
        }), !0) : !1;
      },
      getTransform: () => this._state.transform.get(),
      getFromHandle: () => c,
      updateConnection: (d) => {
        d.inProgress ? this._state.connectionInProgress.set(d) : this._state.connectionInProgress.set(null);
      },
      cancelConnection: () => {
        this._state.connectionInProgress.set(null);
      },
      onConnect: (d) => {
        this.dispatchEvent(new CustomEvent("connect", {
          detail: d
        }));
        const u = `e-${d.source}${d.sourceHandle || ""}-${d.target}${d.targetHandle || ""}`;
        this.edges = [...this.edges, { ...d, id: u }];
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
    return D`
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
    return N`
      <div class="xyflow__renderer">
        <div
          class="xyflow__viewport"
          style="transform: translate(${t[0]}px, ${t[1]}px) scale(${t[2]})"
        >
          <div class="xyflow__nodes" @handle-pointer-down="${this._onHandlePointerDown}">
            ${this.nodes.map((e) => {
      if (e.hidden) return null;
      const s = this._state.nodeLookup.get(e.id)?.internals.positionAbsolute || e.position, i = this.nodeTypes[e.type || "default"] || this.nodeTypes.default, r = q(i), h = e.style || {}, p = Object.entries(h).map(([I, z]) => `${I.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${typeof z == "number" ? `${z}px` : z}`).join("; "), a = e.width || h.width, c = e.height || h.height, d = a ? `width: ${typeof a == "number" ? `${a}px` : a};` : "", u = c ? `height: ${typeof c == "number" ? `${c}px` : c};` : "", v = e.zIndex ? `z-index: ${e.zIndex};` : "";
      return N`
                <${r}
                  class="xyflow__node"
                  data-id="${e.id}"
                  type="${e.type || "default"}"
                  .nodeId="${e.id}"
                  style="transform: translate(${s.x}px, ${s.y}px); ${p} ${d} ${u} ${v}"
                  .data="${e.data}"
                  .label="${e.data.label}"
                  .type="${e.type || "default"}"
                  ?selected="${e.selected}"
                >
                </${r}>
              `;
    })}
          </div>
          <svg class="xyflow__edges">
            ${this.edges.map((e) => this._renderEdge(e))}
            ${this._renderConnectionLine(o)}
          </svg>
        </div>
      </div>
      ${this.showControls ? N`<lit-controls .panZoom="${this._panZoom}"></lit-controls>` : ""}
      ${this.showMinimap ? N`
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
g.styles = [
  it,
  R`
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
f([
  X(".xyflow__renderer")
], g.prototype, "_renderer", 2);
f([
  X(".xyflow__viewport")
], g.prototype, "_viewport", 2);
f([
  L()
], g.prototype, "_panZoom", 2);
f([
  L()
], g.prototype, "_state", 2);
f([
  l({ type: Object })
], g.prototype, "nodeTypes", 2);
f([
  l({ type: Boolean, attribute: "show-controls", reflect: !0 })
], g.prototype, "showControls", 2);
f([
  l({ type: Boolean, attribute: "show-minimap", reflect: !0 })
], g.prototype, "showMinimap", 2);
f([
  L()
], g.prototype, "_width", 2);
f([
  L()
], g.prototype, "_height", 2);
f([
  l({ type: Array })
], g.prototype, "nodes", 1);
f([
  l({ type: Array })
], g.prototype, "edges", 1);
f([
  l({ type: Object })
], g.prototype, "viewport", 2);
g = f([
  O("lit-flow")
], g);
var ut = Object.defineProperty, gt = Object.getOwnPropertyDescriptor, B = (t, o, e, n) => {
  for (var s = n > 1 ? void 0 : n ? gt(o, e) : o, i = t.length - 1, r; i >= 0; i--)
    (r = t[i]) && (s = (n ? r(o, e, s) : r(s)) || s);
  return n && s && ut(o, e, s), s;
};
let $ = class extends P {
  constructor() {
    super(), this.type = "source", this.position = C.Top, this.addEventListener("mousedown", (t) => this._onPointerDown(t)), this.addEventListener("touchstart", (t) => this._onPointerDown(t));
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
    return x`
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
B([
  l({ type: String, reflect: !0 })
], $.prototype, "type", 2);
B([
  l({ type: String, reflect: !0, attribute: "data-handlepos" })
], $.prototype, "position", 2);
B([
  l({ type: String, reflect: !0, attribute: "data-handleid" })
], $.prototype, "handleId", 2);
B([
  l({ type: String, reflect: !0, attribute: "data-nodeid" })
], $.prototype, "nodeId", 2);
$ = B([
  O("lit-handle")
], $);
var ft = Object.defineProperty, mt = Object.getOwnPropertyDescriptor, Y = (t, o, e, n) => {
  for (var s = n > 1 ? void 0 : n ? mt(o, e) : o, i = t.length - 1, r; i >= 0; i--)
    (r = t[i]) && (s = (n ? r(o, e, s) : r(s)) || s);
  return n && s && ft(o, e, s), s;
};
let Z = class extends E(P) {
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
    return x`
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
Z.styles = R`
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
Y([
  l({ type: Object })
], Z.prototype, "panZoom", 2);
Z = Y([
  O("lit-controls")
], Z);
var yt = Object.defineProperty, _t = Object.getOwnPropertyDescriptor, w = (t, o, e, n) => {
  for (var s = n > 1 ? void 0 : n ? _t(o, e) : o, i = t.length - 1, r; i >= 0; i--)
    (r = t[i]) && (s = (n ? r(o, e, s) : r(s)) || s);
  return n && s && yt(o, e, s), s;
};
let y = class extends E(P) {
  constructor() {
    super(...arguments), this.nodeLookup = /* @__PURE__ */ new Map(), this.transform = [0, 0, 1], this.translateExtent = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], this.width = 0, this.height = 0;
  }
  updated(t) {
    if (!this._minimapInstance && this.panZoom) {
      const o = this.shadowRoot?.querySelector("svg");
      o && (this._minimapInstance = ot({
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
    return this.nodeLookup.size > 0 ? st(nt(this.nodeLookup), t) : t;
  }
  render() {
    const t = this._getBoundingRect(), o = {
      x: -this.transform[0] / this.transform[2],
      y: -this.transform[1] / this.transform[2],
      width: this.width / this.transform[2],
      height: this.height / this.transform[2]
    }, e = 200, n = 150, s = t.width / e, i = t.height / n, r = Math.max(s, i), h = r * e, p = r * n, a = 5 * r, c = t.x - (h - t.width) / 2 - a, d = t.y - (p - t.height) / 2 - a, u = h + a * 2, v = p + a * 2;
    return x`
      <svg
        width="${e}"
        height="${n}"
        viewBox="${c} ${d} ${u} ${v}"
      >
        ${Array.from(this.nodeLookup.values()).map((I) => {
      const { x: z, y: T } = I.internals.positionAbsolute, V = I.measured.width || 0, W = I.measured.height || 0;
      return D`
            <rect
              class="minimap-node"
              x="${z}"
              y="${T}"
              width="${V}"
              height="${W}"
              rx="2"
              ry="2"
            />
          `;
    })}
        <path
          class="minimap-mask"
          d="M${c - a},${d - a}h${u + a * 2}v${v + a * 2}h${-u - a * 2}z
             M${o.x},${o.y}h${o.width}v${o.height}h${-o.width}z"
        />
      </svg>
    `;
  }
};
y.styles = R`
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
  l({ type: Object })
], y.prototype, "panZoom", 2);
w([
  l({ type: Object })
], y.prototype, "nodeLookup", 2);
w([
  l({ type: Array })
], y.prototype, "transform", 2);
w([
  l({ type: Array })
], y.prototype, "translateExtent", 2);
w([
  l({ type: Number })
], y.prototype, "width", 2);
w([
  l({ type: Number })
], y.prototype, "height", 2);
w([
  L()
], y.prototype, "_minimapInstance", 2);
y = w([
  O("lit-minimap")
], y);
export {
  Z as LitControls,
  m as LitEdge,
  g as LitFlow,
  $ as LitHandle,
  y as LitMinimap,
  b as LitNode,
  rt as createInitialState,
  it as m3Tokens
};
//# sourceMappingURL=litflow.js.map
