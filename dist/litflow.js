import { html as bt, css as kt, LitElement as Pt, svg as dn } from "lit";
import { unsafeStatic as jr, html as te } from "lit/static-html.js";
import { property as W, customElement as Ot, query as rr, state as Kt } from "lit/decorators.js";
import { directive as ti } from "lit/directive.js";
import { AsyncDirective as ei } from "lit/async-directive.js";
import "lit/html.js";
var ni = Object.defineProperty, ri = (t, e, n) => e in t ? ni(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, Be = (t, e, n) => (ri(t, typeof e != "symbol" ? e + "" : e, n), n), ii = (t, e, n) => {
  if (!e.has(t))
    throw TypeError("Cannot " + n);
}, He = (t, e) => {
  if (Object(e) !== e)
    throw TypeError('Cannot use the "in" operator on this value');
  return t.has(e);
}, ee = (t, e, n) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, n);
}, Cn = (t, e, n) => (ii(t, e, "access private method"), n);
function ir(t, e) {
  return Object.is(t, e);
}
let q = null, Xt = !1, ue = 1;
const ge = /* @__PURE__ */ Symbol("SIGNAL");
function xt(t) {
  const e = q;
  return q = t, e;
}
function oi() {
  return q;
}
function si() {
  return Xt;
}
const pn = {
  version: 0,
  lastCleanEpoch: 0,
  dirty: !1,
  producerNode: void 0,
  producerLastReadVersion: void 0,
  producerIndexOfThis: void 0,
  nextProducerIndex: 0,
  liveConsumerNode: void 0,
  liveConsumerIndexOfThis: void 0,
  consumerAllowSignalWrites: !1,
  consumerIsAlwaysLive: !1,
  producerMustRecompute: () => !1,
  producerRecomputeValue: () => {
  },
  consumerMarkedDirty: () => {
  },
  consumerOnSignalRead: () => {
  }
};
function Ee(t) {
  if (Xt)
    throw new Error(
      typeof ngDevMode < "u" && ngDevMode ? "Assertion error: signal read during notification phase" : ""
    );
  if (q === null)
    return;
  q.consumerOnSignalRead(t);
  const e = q.nextProducerIndex++;
  if (St(q), e < q.producerNode.length && q.producerNode[e] !== t && je(q)) {
    const n = q.producerNode[e];
    $e(n, q.producerIndexOfThis[e]);
  }
  q.producerNode[e] !== t && (q.producerNode[e] = t, q.producerIndexOfThis[e] = je(q) ? ar(t, q, e) : 0), q.producerLastReadVersion[e] = t.version;
}
function ai() {
  ue++;
}
function or(t) {
  if (!(!t.dirty && t.lastCleanEpoch === ue)) {
    if (!t.producerMustRecompute(t) && !hi(t)) {
      t.dirty = !1, t.lastCleanEpoch = ue;
      return;
    }
    t.producerRecomputeValue(t), t.dirty = !1, t.lastCleanEpoch = ue;
  }
}
function sr(t) {
  if (t.liveConsumerNode === void 0)
    return;
  const e = Xt;
  Xt = !0;
  try {
    for (const n of t.liveConsumerNode)
      n.dirty || ci(n);
  } finally {
    Xt = e;
  }
}
function ui() {
  return q?.consumerAllowSignalWrites !== !1;
}
function ci(t) {
  var e;
  t.dirty = !0, sr(t), (e = t.consumerMarkedDirty) == null || e.call(t.wrapper ?? t);
}
function li(t) {
  return t && (t.nextProducerIndex = 0), xt(t);
}
function fi(t, e) {
  if (xt(e), !(!t || t.producerNode === void 0 || t.producerIndexOfThis === void 0 || t.producerLastReadVersion === void 0)) {
    if (je(t))
      for (let n = t.nextProducerIndex; n < t.producerNode.length; n++)
        $e(t.producerNode[n], t.producerIndexOfThis[n]);
    for (; t.producerNode.length > t.nextProducerIndex; )
      t.producerNode.pop(), t.producerLastReadVersion.pop(), t.producerIndexOfThis.pop();
  }
}
function hi(t) {
  St(t);
  for (let e = 0; e < t.producerNode.length; e++) {
    const n = t.producerNode[e], r = t.producerLastReadVersion[e];
    if (r !== n.version || (or(n), r !== n.version))
      return !0;
  }
  return !1;
}
function ar(t, e, n) {
  var r;
  if (gn(t), St(t), t.liveConsumerNode.length === 0) {
    (r = t.watched) == null || r.call(t.wrapper);
    for (let i = 0; i < t.producerNode.length; i++)
      t.producerIndexOfThis[i] = ar(t.producerNode[i], t, i);
  }
  return t.liveConsumerIndexOfThis.push(n), t.liveConsumerNode.push(e) - 1;
}
function $e(t, e) {
  var n;
  if (gn(t), St(t), typeof ngDevMode < "u" && ngDevMode && e >= t.liveConsumerNode.length)
    throw new Error(
      `Assertion error: active consumer index ${e} is out of bounds of ${t.liveConsumerNode.length} consumers)`
    );
  if (t.liveConsumerNode.length === 1) {
    (n = t.unwatched) == null || n.call(t.wrapper);
    for (let i = 0; i < t.producerNode.length; i++)
      $e(t.producerNode[i], t.producerIndexOfThis[i]);
  }
  const r = t.liveConsumerNode.length - 1;
  if (t.liveConsumerNode[e] = t.liveConsumerNode[r], t.liveConsumerIndexOfThis[e] = t.liveConsumerIndexOfThis[r], t.liveConsumerNode.length--, t.liveConsumerIndexOfThis.length--, e < t.liveConsumerNode.length) {
    const i = t.liveConsumerIndexOfThis[e], o = t.liveConsumerNode[e];
    St(o), o.producerIndexOfThis[i] = e;
  }
}
function je(t) {
  var e;
  return t.consumerIsAlwaysLive || (((e = t?.liveConsumerNode) == null ? void 0 : e.length) ?? 0) > 0;
}
function St(t) {
  t.producerNode ?? (t.producerNode = []), t.producerIndexOfThis ?? (t.producerIndexOfThis = []), t.producerLastReadVersion ?? (t.producerLastReadVersion = []);
}
function gn(t) {
  t.liveConsumerNode ?? (t.liveConsumerNode = []), t.liveConsumerIndexOfThis ?? (t.liveConsumerIndexOfThis = []);
}
function ur(t) {
  if (or(t), Ee(t), t.value === tn)
    throw t.error;
  return t.value;
}
function di(t) {
  const e = Object.create(pi);
  e.computation = t;
  const n = () => ur(e);
  return n[ge] = e, n;
}
const We = /* @__PURE__ */ Symbol("UNSET"), Le = /* @__PURE__ */ Symbol("COMPUTING"), tn = /* @__PURE__ */ Symbol("ERRORED"), pi = {
  ...pn,
  value: We,
  dirty: !0,
  error: null,
  equal: ir,
  producerMustRecompute(t) {
    return t.value === We || t.value === Le;
  },
  producerRecomputeValue(t) {
    if (t.value === Le)
      throw new Error("Detected cycle in computations.");
    const e = t.value;
    t.value = Le;
    const n = li(t);
    let r, i = !1;
    try {
      r = t.computation.call(t.wrapper), i = e !== We && e !== tn && t.equal.call(t.wrapper, e, r);
    } catch (o) {
      r = tn, t.error = o;
    } finally {
      fi(t, n);
    }
    if (i) {
      t.value = e;
      return;
    }
    t.value = r, t.version++;
  }
};
function gi() {
  throw new Error();
}
let mi = gi;
function yi() {
  mi();
}
function wi(t) {
  const e = Object.create(vi);
  e.value = t;
  const n = () => (Ee(e), e.value);
  return n[ge] = e, n;
}
function _i() {
  return Ee(this), this.value;
}
function xi(t, e) {
  ui() || yi(), t.equal.call(t.wrapper, t.value, e) || (t.value = e, bi(t));
}
const vi = {
  ...pn,
  equal: ir,
  value: void 0
};
function bi(t) {
  t.version++, ai(), sr(t);
}
const Z = /* @__PURE__ */ Symbol("node");
var F;
((t) => {
  var e, n, r, i;
  class o {
    constructor(c, u = {}) {
      ee(this, n), Be(this, e);
      const f = wi(c)[ge];
      if (this[Z] = f, f.wrapper = this, u) {
        const d = u.equals;
        d && (f.equal = d), f.watched = u[t.subtle.watched], f.unwatched = u[t.subtle.unwatched];
      }
    }
    get() {
      if (!(0, t.isState)(this))
        throw new TypeError("Wrong receiver type for Signal.State.prototype.get");
      return _i.call(this[Z]);
    }
    set(c) {
      if (!(0, t.isState)(this))
        throw new TypeError("Wrong receiver type for Signal.State.prototype.set");
      if (si())
        throw new Error("Writes to signals not permitted during Watcher callback");
      const u = this[Z];
      xi(u, c);
    }
  }
  e = Z, n = /* @__PURE__ */ new WeakSet(), t.isState = (a) => typeof a == "object" && He(n, a), t.State = o;
  class s {
    // Create a Signal which evaluates to the value returned by the callback.
    // Callback is called with this signal as the parameter.
    constructor(c, u) {
      ee(this, i), Be(this, r);
      const f = di(c)[ge];
      if (f.consumerAllowSignalWrites = !0, this[Z] = f, f.wrapper = this, u) {
        const d = u.equals;
        d && (f.equal = d), f.watched = u[t.subtle.watched], f.unwatched = u[t.subtle.unwatched];
      }
    }
    get() {
      if (!(0, t.isComputed)(this))
        throw new TypeError("Wrong receiver type for Signal.Computed.prototype.get");
      return ur(this[Z]);
    }
  }
  r = Z, i = /* @__PURE__ */ new WeakSet(), t.isComputed = (a) => typeof a == "object" && He(i, a), t.Computed = s, ((a) => {
    var c, u, l, f;
    function d(x) {
      let p, w = null;
      try {
        w = xt(null), p = x();
      } finally {
        xt(w);
      }
      return p;
    }
    a.untrack = d;
    function m(x) {
      var p;
      if (!(0, t.isComputed)(x) && !(0, t.isWatcher)(x))
        throw new TypeError("Called introspectSources without a Computed or Watcher argument");
      return ((p = x[Z].producerNode) == null ? void 0 : p.map((w) => w.wrapper)) ?? [];
    }
    a.introspectSources = m;
    function b(x) {
      var p;
      if (!(0, t.isComputed)(x) && !(0, t.isState)(x))
        throw new TypeError("Called introspectSinks without a Signal argument");
      return ((p = x[Z].liveConsumerNode) == null ? void 0 : p.map((w) => w.wrapper)) ?? [];
    }
    a.introspectSinks = b;
    function $(x) {
      if (!(0, t.isComputed)(x) && !(0, t.isState)(x))
        throw new TypeError("Called hasSinks without a Signal argument");
      const p = x[Z].liveConsumerNode;
      return p ? p.length > 0 : !1;
    }
    a.hasSinks = $;
    function P(x) {
      if (!(0, t.isComputed)(x) && !(0, t.isWatcher)(x))
        throw new TypeError("Called hasSources without a Computed or Watcher argument");
      const p = x[Z].producerNode;
      return p ? p.length > 0 : !1;
    }
    a.hasSources = P;
    class N {
      // When a (recursive) source of Watcher is written to, call this callback,
      // if it hasn't already been called since the last `watch` call.
      // No signals may be read or written during the notify.
      constructor(p) {
        ee(this, u), ee(this, l), Be(this, c);
        let w = Object.create(pn);
        w.wrapper = this, w.consumerMarkedDirty = p, w.consumerIsAlwaysLive = !0, w.consumerAllowSignalWrites = !1, w.producerNode = [], this[Z] = w;
      }
      // Add these signals to the Watcher's set, and set the watcher to run its
      // notify callback next time any signal in the set (or one of its dependencies) changes.
      // Can be called with no arguments just to reset the "notified" state, so that
      // the notify callback will be invoked again.
      watch(...p) {
        if (!(0, t.isWatcher)(this))
          throw new TypeError("Called unwatch without Watcher receiver");
        Cn(this, l, f).call(this, p);
        const w = this[Z];
        w.dirty = !1;
        const v = xt(w);
        for (const I of p)
          Ee(I[Z]);
        xt(v);
      }
      // Remove these signals from the watched set (e.g., for an effect which is disposed)
      unwatch(...p) {
        if (!(0, t.isWatcher)(this))
          throw new TypeError("Called unwatch without Watcher receiver");
        Cn(this, l, f).call(this, p);
        const w = this[Z];
        St(w);
        for (let v = w.producerNode.length - 1; v >= 0; v--)
          if (p.includes(w.producerNode[v].wrapper)) {
            $e(w.producerNode[v], w.producerIndexOfThis[v]);
            const I = w.producerNode.length - 1;
            if (w.producerNode[v] = w.producerNode[I], w.producerIndexOfThis[v] = w.producerIndexOfThis[I], w.producerNode.length--, w.producerIndexOfThis.length--, w.nextProducerIndex--, v < w.producerNode.length) {
              const R = w.producerIndexOfThis[v], L = w.producerNode[v];
              gn(L), L.liveConsumerIndexOfThis[R] = v;
            }
          }
      }
      // Returns the set of computeds in the Watcher's set which are still yet
      // to be re-evaluated
      getPending() {
        if (!(0, t.isWatcher)(this))
          throw new TypeError("Called getPending without Watcher receiver");
        return this[Z].producerNode.filter((w) => w.dirty).map((w) => w.wrapper);
      }
    }
    c = Z, u = /* @__PURE__ */ new WeakSet(), l = /* @__PURE__ */ new WeakSet(), f = function(x) {
      for (const p of x)
        if (!(0, t.isComputed)(p) && !(0, t.isState)(p))
          throw new TypeError("Called watch/unwatch without a Computed or State argument");
    }, t.isWatcher = (x) => He(u, x), a.Watcher = N;
    function z() {
      var x;
      return (x = oi()) == null ? void 0 : x.wrapper;
    }
    a.currentComputed = z, a.watched = /* @__PURE__ */ Symbol("watched"), a.unwatched = /* @__PURE__ */ Symbol("unwatched");
  })(t.subtle || (t.subtle = {}));
})(F || (F = {}));
let Xe = !1;
const Tn = new F.subtle.Watcher(() => {
  Xe || (Xe = !0, queueMicrotask(() => {
    Xe = !1;
    for (const t of Tn.getPending()) t.get();
    Tn.watch();
  }));
}), Ni = /* @__PURE__ */ Symbol("SignalWatcherBrand"), Ei = new FinalizationRegistry((t) => {
  t.unwatch(...F.subtle.introspectSources(t));
}), Mn = /* @__PURE__ */ new WeakMap();
function Qt(t) {
  return t[Ni] === !0 ? (console.warn("SignalWatcher should not be applied to the same class more than once."), t) : class extends t {
    constructor() {
      super(...arguments), this._$St = /* @__PURE__ */ new Map(), this._$So = new F.State(0), this._$Si = !1;
    }
    _$Sl() {
      var e, n;
      const r = [], i = [];
      this._$St.forEach((s, a) => {
        (s?.beforeUpdate ? r : i).push(a);
      });
      const o = (e = this.h) === null || e === void 0 ? void 0 : e.getPending().filter((s) => s !== this._$Su && !this._$St.has(s));
      r.forEach((s) => s.get()), (n = this._$Su) === null || n === void 0 || n.get(), o.forEach((s) => s.get()), i.forEach((s) => s.get());
    }
    _$Sv() {
      this.isUpdatePending || queueMicrotask(() => {
        this.isUpdatePending || this._$Sl();
      });
    }
    _$S_() {
      if (this.h !== void 0) return;
      this._$Su = new F.Computed(() => {
        this._$So.get(), super.performUpdate();
      });
      const e = this.h = new F.subtle.Watcher(function() {
        const n = Mn.get(this);
        n !== void 0 && (n._$Si === !1 && (new Set(this.getPending()).has(n._$Su) ? n.requestUpdate() : n._$Sv()), this.watch());
      });
      Mn.set(e, this), Ei.register(this, e), e.watch(this._$Su), e.watch(...Array.from(this._$St).map(([n]) => n));
    }
    _$Sp() {
      if (this.h === void 0) return;
      let e = !1;
      this.h.unwatch(...F.subtle.introspectSources(this.h).filter((n) => {
        var r;
        const i = ((r = this._$St.get(n)) === null || r === void 0 ? void 0 : r.manualDispose) !== !0;
        return i && this._$St.delete(n), e || (e = !i), i;
      })), e || (this._$Su = void 0, this.h = void 0, this._$St.clear());
    }
    updateEffect(e, n) {
      var r;
      this._$S_();
      const i = new F.Computed(() => {
        e();
      });
      return this.h.watch(i), this._$St.set(i, n), (r = n?.beforeUpdate) !== null && r !== void 0 && r ? F.subtle.untrack(() => i.get()) : this.updateComplete.then(() => F.subtle.untrack(() => i.get())), () => {
        this._$St.delete(i), this.h.unwatch(i), this.isConnected === !1 && this._$Sp();
      };
    }
    performUpdate() {
      this.isUpdatePending && (this._$S_(), this._$Si = !0, this._$So.set(this._$So.get() + 1), this._$Si = !1, this._$Sl());
    }
    connectedCallback() {
      super.connectedCallback(), this.requestUpdate();
    }
    disconnectedCallback() {
      super.disconnectedCallback(), queueMicrotask(() => {
        this.isConnected === !1 && this._$Sp();
      });
    }
  };
}
let Ye = !1;
const en = new F.subtle.Watcher(async () => {
  Ye || (Ye = !0, queueMicrotask(() => {
    Ye = !1;
    for (const t of en.getPending()) t.get();
    en.watch();
  }));
});
let $i = class extends ei {
  _$S_() {
    var e, n;
    this._$Sm === void 0 && (this._$Sj = new F.Computed(() => {
      var r;
      const i = (r = this._$SW) === null || r === void 0 ? void 0 : r.get();
      return this.setValue(i), i;
    }), this._$Sm = (n = (e = this._$Sk) === null || e === void 0 ? void 0 : e.h) !== null && n !== void 0 ? n : en, this._$Sm.watch(this._$Sj), F.subtle.untrack(() => {
      var r;
      return (r = this._$Sj) === null || r === void 0 ? void 0 : r.get();
    }));
  }
  _$Sp() {
    this._$Sm !== void 0 && (this._$Sm.unwatch(this._$SW), this._$Sm = void 0);
  }
  render(e) {
    return F.subtle.untrack(() => e.get());
  }
  update(e, [n]) {
    var r, i;
    return (r = this._$Sk) !== null && r !== void 0 || (this._$Sk = (i = e.options) === null || i === void 0 ? void 0 : i.host), n !== this._$SW && this._$SW !== void 0 && this._$Sp(), this._$SW = n, this._$S_(), F.subtle.untrack(() => this._$SW.get());
  }
  disconnected() {
    this._$Sp();
  }
  reconnected() {
    this._$S_();
  }
};
ti($i);
F.State;
F.Computed;
const Ve = (t, e) => new F.State(t, e);
var Si = { value: () => {
} };
function Se() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new ce(n);
}
function ce(t) {
  this._ = t;
}
function Ci(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
ce.prototype = Se.prototype = {
  constructor: ce,
  on: function(t, e) {
    var n = this._, r = Ci(t + "", n), i, o = -1, s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; ) if ((i = (t = r[o]).type) && (i = Ti(n[i], t.name))) return i;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++o < s; )
      if (i = (t = r[o]).type) n[i] = An(n[i], t.name, e);
      else if (e == null) for (i in n) n[i] = An(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new ce(t);
  },
  call: function(t, e) {
    if ((i = arguments.length - 2) > 0) for (var n = new Array(i), r = 0, i, o; r < i; ++r) n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (o = this._[t], r = 0, i = o.length; r < i; ++r) o[r].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var r = this._[t], i = 0, o = r.length; i < o; ++i) r[i].value.apply(e, n);
  }
};
function Ti(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function An(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = Si, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var nn = "http://www.w3.org/1999/xhtml";
const In = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: nn,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Ce(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), In.hasOwnProperty(e) ? { space: In[e], local: t } : t;
}
function Mi(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === nn && e.documentElement.namespaceURI === nn ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function Ai(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function cr(t) {
  var e = Ce(t);
  return (e.local ? Ai : Mi)(e);
}
function Ii() {
}
function mn(t) {
  return t == null ? Ii : function() {
    return this.querySelector(t);
  };
}
function ki(t) {
  typeof t != "function" && (t = mn(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], s = o.length, a = r[i] = new Array(s), c, u, l = 0; l < s; ++l)
      (c = o[l]) && (u = t.call(c, c.__data__, l, o)) && ("__data__" in c && (u.__data__ = c.__data__), a[l] = u);
  return new J(r, this._parents);
}
function Pi(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Oi() {
  return [];
}
function lr(t) {
  return t == null ? Oi : function() {
    return this.querySelectorAll(t);
  };
}
function zi(t) {
  return function() {
    return Pi(t.apply(this, arguments));
  };
}
function Di(t) {
  typeof t == "function" ? t = zi(t) : t = lr(t);
  for (var e = this._groups, n = e.length, r = [], i = [], o = 0; o < n; ++o)
    for (var s = e[o], a = s.length, c, u = 0; u < a; ++u)
      (c = s[u]) && (r.push(t.call(c, c.__data__, u, s)), i.push(c));
  return new J(r, i);
}
function fr(t) {
  return function() {
    return this.matches(t);
  };
}
function hr(t) {
  return function(e) {
    return e.matches(t);
  };
}
var Ri = Array.prototype.find;
function Bi(t) {
  return function() {
    return Ri.call(this.children, t);
  };
}
function Hi() {
  return this.firstElementChild;
}
function Wi(t) {
  return this.select(t == null ? Hi : Bi(typeof t == "function" ? t : hr(t)));
}
var Li = Array.prototype.filter;
function Xi() {
  return Array.from(this.children);
}
function Yi(t) {
  return function() {
    return Li.call(this.children, t);
  };
}
function Vi(t) {
  return this.selectAll(t == null ? Xi : Yi(typeof t == "function" ? t : hr(t)));
}
function qi(t) {
  typeof t != "function" && (t = fr(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], s = o.length, a = r[i] = [], c, u = 0; u < s; ++u)
      (c = o[u]) && t.call(c, c.__data__, u, o) && a.push(c);
  return new J(r, this._parents);
}
function dr(t) {
  return new Array(t.length);
}
function Fi() {
  return new J(this._enter || this._groups.map(dr), this._parents);
}
function me(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
me.prototype = {
  constructor: me,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, e) {
    return this._parent.insertBefore(t, e);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function Zi(t) {
  return function() {
    return t;
  };
}
function Ui(t, e, n, r, i, o) {
  for (var s = 0, a, c = e.length, u = o.length; s < u; ++s)
    (a = e[s]) ? (a.__data__ = o[s], r[s] = a) : n[s] = new me(t, o[s]);
  for (; s < c; ++s)
    (a = e[s]) && (i[s] = a);
}
function Gi(t, e, n, r, i, o, s) {
  var a, c, u = /* @__PURE__ */ new Map(), l = e.length, f = o.length, d = new Array(l), m;
  for (a = 0; a < l; ++a)
    (c = e[a]) && (d[a] = m = s.call(c, c.__data__, a, e) + "", u.has(m) ? i[a] = c : u.set(m, c));
  for (a = 0; a < f; ++a)
    m = s.call(t, o[a], a, o) + "", (c = u.get(m)) ? (r[a] = c, c.__data__ = o[a], u.delete(m)) : n[a] = new me(t, o[a]);
  for (a = 0; a < l; ++a)
    (c = e[a]) && u.get(d[a]) === c && (i[a] = c);
}
function Ki(t) {
  return t.__data__;
}
function Qi(t, e) {
  if (!arguments.length) return Array.from(this, Ki);
  var n = e ? Gi : Ui, r = this._parents, i = this._groups;
  typeof t != "function" && (t = Zi(t));
  for (var o = i.length, s = new Array(o), a = new Array(o), c = new Array(o), u = 0; u < o; ++u) {
    var l = r[u], f = i[u], d = f.length, m = Ji(t.call(l, l && l.__data__, u, r)), b = m.length, $ = a[u] = new Array(b), P = s[u] = new Array(b), N = c[u] = new Array(d);
    n(l, f, $, P, N, m, e);
    for (var z = 0, x = 0, p, w; z < b; ++z)
      if (p = $[z]) {
        for (z >= x && (x = z + 1); !(w = P[x]) && ++x < b; ) ;
        p._next = w || null;
      }
  }
  return s = new J(s, r), s._enter = a, s._exit = c, s;
}
function Ji(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function ji() {
  return new J(this._exit || this._groups.map(dr), this._parents);
}
function to(t, e, n) {
  var r = this.enter(), i = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? o.remove() : n(o), r && i ? r.merge(i).order() : i;
}
function eo(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, o = r.length, s = Math.min(i, o), a = new Array(i), c = 0; c < s; ++c)
    for (var u = n[c], l = r[c], f = u.length, d = a[c] = new Array(f), m, b = 0; b < f; ++b)
      (m = u[b] || l[b]) && (d[b] = m);
  for (; c < i; ++c)
    a[c] = n[c];
  return new J(a, this._parents);
}
function no() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) && (o && s.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(s, o), o = s);
  return this;
}
function ro(t) {
  t || (t = io);
  function e(f, d) {
    return f && d ? t(f.__data__, d.__data__) : !f - !d;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), o = 0; o < r; ++o) {
    for (var s = n[o], a = s.length, c = i[o] = new Array(a), u, l = 0; l < a; ++l)
      (u = s[l]) && (c[l] = u);
    c.sort(e);
  }
  return new J(i, this._parents).order();
}
function io(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function oo() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function so() {
  return Array.from(this);
}
function ao() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s) return s;
    }
  return null;
}
function uo() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function co() {
  return !this.node();
}
function lo(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], o = 0, s = i.length, a; o < s; ++o)
      (a = i[o]) && t.call(a, a.__data__, o, i);
  return this;
}
function fo(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function ho(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function po(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function go(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function mo(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function yo(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function wo(t, e) {
  var n = Ce(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? ho : fo : typeof e == "function" ? n.local ? yo : mo : n.local ? go : po)(n, e));
}
function pr(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function _o(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function xo(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function vo(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function bo(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? _o : typeof e == "function" ? vo : xo)(t, e, n ?? "")) : Ct(this.node(), t);
}
function Ct(t, e) {
  return t.style.getPropertyValue(e) || pr(t).getComputedStyle(t, null).getPropertyValue(e);
}
function No(t) {
  return function() {
    delete this[t];
  };
}
function Eo(t, e) {
  return function() {
    this[t] = e;
  };
}
function $o(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function So(t, e) {
  return arguments.length > 1 ? this.each((e == null ? No : typeof e == "function" ? $o : Eo)(t, e)) : this.node()[t];
}
function gr(t) {
  return t.trim().split(/^|\s+/);
}
function yn(t) {
  return t.classList || new mr(t);
}
function mr(t) {
  this._node = t, this._names = gr(t.getAttribute("class") || "");
}
mr.prototype = {
  add: function(t) {
    var e = this._names.indexOf(t);
    e < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var e = this._names.indexOf(t);
    e >= 0 && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function yr(t, e) {
  for (var n = yn(t), r = -1, i = e.length; ++r < i; ) n.add(e[r]);
}
function wr(t, e) {
  for (var n = yn(t), r = -1, i = e.length; ++r < i; ) n.remove(e[r]);
}
function Co(t) {
  return function() {
    yr(this, t);
  };
}
function To(t) {
  return function() {
    wr(this, t);
  };
}
function Mo(t, e) {
  return function() {
    (e.apply(this, arguments) ? yr : wr)(this, t);
  };
}
function Ao(t, e) {
  var n = gr(t + "");
  if (arguments.length < 2) {
    for (var r = yn(this.node()), i = -1, o = n.length; ++i < o; ) if (!r.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Mo : e ? Co : To)(n, e));
}
function Io() {
  this.textContent = "";
}
function ko(t) {
  return function() {
    this.textContent = t;
  };
}
function Po(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function Oo(t) {
  return arguments.length ? this.each(t == null ? Io : (typeof t == "function" ? Po : ko)(t)) : this.node().textContent;
}
function zo() {
  this.innerHTML = "";
}
function Do(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Ro(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function Bo(t) {
  return arguments.length ? this.each(t == null ? zo : (typeof t == "function" ? Ro : Do)(t)) : this.node().innerHTML;
}
function Ho() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Wo() {
  return this.each(Ho);
}
function Lo() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Xo() {
  return this.each(Lo);
}
function Yo(t) {
  var e = typeof t == "function" ? t : cr(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Vo() {
  return null;
}
function qo(t, e) {
  var n = typeof t == "function" ? t : cr(t), r = e == null ? Vo : typeof e == "function" ? e : mn(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function Fo() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Zo() {
  return this.each(Fo);
}
function Uo() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Go() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Ko(t) {
  return this.select(t ? Go : Uo);
}
function Qo(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Jo(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function jo(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function ts(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, o; n < i; ++n)
        o = e[n], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : e[++r] = o;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function es(t, e, n) {
  return function() {
    var r = this.__on, i, o = Jo(e);
    if (r) {
      for (var s = 0, a = r.length; s < a; ++s)
        if ((i = r[s]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = o, i.options = n), i.value = e;
          return;
        }
    }
    this.addEventListener(t.type, o, n), i = { type: t.type, name: t.name, value: e, listener: o, options: n }, r ? r.push(i) : this.__on = [i];
  };
}
function ns(t, e, n) {
  var r = jo(t + ""), i, o = r.length, s;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var c = 0, u = a.length, l; c < u; ++c)
        for (i = 0, l = a[c]; i < o; ++i)
          if ((s = r[i]).type === l.type && s.name === l.name)
            return l.value;
    }
    return;
  }
  for (a = e ? es : ts, i = 0; i < o; ++i) this.each(a(r[i], e, n));
  return this;
}
function _r(t, e, n) {
  var r = pr(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function rs(t, e) {
  return function() {
    return _r(this, t, e);
  };
}
function is(t, e) {
  return function() {
    return _r(this, t, e.apply(this, arguments));
  };
}
function os(t, e) {
  return this.each((typeof e == "function" ? is : rs)(t, e));
}
function* ss() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var xr = [null];
function J(t, e) {
  this._groups = t, this._parents = e;
}
function Jt() {
  return new J([[document.documentElement]], xr);
}
function as() {
  return this;
}
J.prototype = Jt.prototype = {
  constructor: J,
  select: ki,
  selectAll: Di,
  selectChild: Wi,
  selectChildren: Vi,
  filter: qi,
  data: Qi,
  enter: Fi,
  exit: ji,
  join: to,
  merge: eo,
  selection: as,
  order: no,
  sort: ro,
  call: oo,
  nodes: so,
  node: ao,
  size: uo,
  empty: co,
  each: lo,
  attr: wo,
  style: bo,
  property: So,
  classed: Ao,
  text: Oo,
  html: Bo,
  raise: Wo,
  lower: Xo,
  append: Yo,
  insert: qo,
  remove: Zo,
  clone: Ko,
  datum: Qo,
  on: ns,
  dispatch: os,
  [Symbol.iterator]: ss
};
function tt(t) {
  return typeof t == "string" ? new J([[document.querySelector(t)]], [document.documentElement]) : new J([[t]], xr);
}
function us(t) {
  let e;
  for (; e = t.sourceEvent; ) t = e;
  return t;
}
function nt(t, e) {
  if (t = us(t), e === void 0 && (e = t.currentTarget), e) {
    var n = e.ownerSVGElement || e;
    if (n.createSVGPoint) {
      var r = n.createSVGPoint();
      return r.x = t.clientX, r.y = t.clientY, r = r.matrixTransform(e.getScreenCTM().inverse()), [r.x, r.y];
    }
    if (e.getBoundingClientRect) {
      var i = e.getBoundingClientRect();
      return [t.clientX - i.left - e.clientLeft, t.clientY - i.top - e.clientTop];
    }
  }
  return [t.pageX, t.pageY];
}
const cs = { passive: !1 }, Vt = { capture: !0, passive: !1 };
function qe(t) {
  t.stopImmediatePropagation();
}
function Nt(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function vr(t) {
  var e = t.document.documentElement, n = tt(t).on("dragstart.drag", Nt, Vt);
  "onselectstart" in e ? n.on("selectstart.drag", Nt, Vt) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function br(t, e) {
  var n = t.document.documentElement, r = tt(t).on("dragstart.drag", null);
  e && (r.on("click.drag", Nt, Vt), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const ne = (t) => () => t;
function rn(t, {
  sourceEvent: e,
  subject: n,
  target: r,
  identifier: i,
  active: o,
  x: s,
  y: a,
  dx: c,
  dy: u,
  dispatch: l
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: e, enumerable: !0, configurable: !0 },
    subject: { value: n, enumerable: !0, configurable: !0 },
    target: { value: r, enumerable: !0, configurable: !0 },
    identifier: { value: i, enumerable: !0, configurable: !0 },
    active: { value: o, enumerable: !0, configurable: !0 },
    x: { value: s, enumerable: !0, configurable: !0 },
    y: { value: a, enumerable: !0, configurable: !0 },
    dx: { value: c, enumerable: !0, configurable: !0 },
    dy: { value: u, enumerable: !0, configurable: !0 },
    _: { value: l }
  });
}
rn.prototype.on = function() {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function ls(t) {
  return !t.ctrlKey && !t.button;
}
function fs() {
  return this.parentNode;
}
function hs(t, e) {
  return e ?? { x: t.x, y: t.y };
}
function ds() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function ps() {
  var t = ls, e = fs, n = hs, r = ds, i = {}, o = Se("start", "drag", "end"), s = 0, a, c, u, l, f = 0;
  function d(p) {
    p.on("mousedown.drag", m).filter(r).on("touchstart.drag", P).on("touchmove.drag", N, cs).on("touchend.drag touchcancel.drag", z).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function m(p, w) {
    if (!(l || !t.call(this, p, w))) {
      var v = x(this, e.call(this, p, w), p, w, "mouse");
      v && (tt(p.view).on("mousemove.drag", b, Vt).on("mouseup.drag", $, Vt), vr(p.view), qe(p), u = !1, a = p.clientX, c = p.clientY, v("start", p));
    }
  }
  function b(p) {
    if (Nt(p), !u) {
      var w = p.clientX - a, v = p.clientY - c;
      u = w * w + v * v > f;
    }
    i.mouse("drag", p);
  }
  function $(p) {
    tt(p.view).on("mousemove.drag mouseup.drag", null), br(p.view, u), Nt(p), i.mouse("end", p);
  }
  function P(p, w) {
    if (t.call(this, p, w)) {
      var v = p.changedTouches, I = e.call(this, p, w), R = v.length, L, U;
      for (L = 0; L < R; ++L)
        (U = x(this, I, p, w, v[L].identifier, v[L])) && (qe(p), U("start", p, v[L]));
    }
  }
  function N(p) {
    var w = p.changedTouches, v = w.length, I, R;
    for (I = 0; I < v; ++I)
      (R = i[w[I].identifier]) && (Nt(p), R("drag", p, w[I]));
  }
  function z(p) {
    var w = p.changedTouches, v = w.length, I, R;
    for (l && clearTimeout(l), l = setTimeout(function() {
      l = null;
    }, 500), I = 0; I < v; ++I)
      (R = i[w[I].identifier]) && (qe(p), R("end", p, w[I]));
  }
  function x(p, w, v, I, R, L) {
    var U = o.copy(), M = nt(L || v, w), E, A, h;
    if ((h = n.call(p, new rn("beforestart", {
      sourceEvent: v,
      target: d,
      identifier: R,
      active: s,
      x: M[0],
      y: M[1],
      dx: 0,
      dy: 0,
      dispatch: U
    }), I)) != null)
      return E = h.x - M[0] || 0, A = h.y - M[1] || 0, function y(g, _, S) {
        var C = M, T;
        switch (g) {
          case "start":
            i[R] = y, T = s++;
            break;
          case "end":
            delete i[R], --s;
          // falls through
          case "drag":
            M = nt(S || _, w), T = s;
            break;
        }
        U.call(
          g,
          p,
          new rn(g, {
            sourceEvent: _,
            subject: h,
            target: d,
            identifier: R,
            active: T,
            x: M[0] + E,
            y: M[1] + A,
            dx: M[0] - C[0],
            dy: M[1] - C[1],
            dispatch: U
          }),
          I
        );
      };
  }
  return d.filter = function(p) {
    return arguments.length ? (t = typeof p == "function" ? p : ne(!!p), d) : t;
  }, d.container = function(p) {
    return arguments.length ? (e = typeof p == "function" ? p : ne(p), d) : e;
  }, d.subject = function(p) {
    return arguments.length ? (n = typeof p == "function" ? p : ne(p), d) : n;
  }, d.touchable = function(p) {
    return arguments.length ? (r = typeof p == "function" ? p : ne(!!p), d) : r;
  }, d.on = function() {
    var p = o.on.apply(o, arguments);
    return p === o ? d : p;
  }, d.clickDistance = function(p) {
    return arguments.length ? (f = (p = +p) * p, d) : Math.sqrt(f);
  }, d;
}
function wn(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function Nr(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e) n[r] = e[r];
  return n;
}
function jt() {
}
var qt = 0.7, ye = 1 / qt, Et = "\\s*([+-]?\\d+)\\s*", Ft = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", st = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", gs = /^#([0-9a-f]{3,8})$/, ms = new RegExp(`^rgb\\(${Et},${Et},${Et}\\)$`), ys = new RegExp(`^rgb\\(${st},${st},${st}\\)$`), ws = new RegExp(`^rgba\\(${Et},${Et},${Et},${Ft}\\)$`), _s = new RegExp(`^rgba\\(${st},${st},${st},${Ft}\\)$`), xs = new RegExp(`^hsl\\(${Ft},${st},${st}\\)$`), vs = new RegExp(`^hsla\\(${Ft},${st},${st},${Ft}\\)$`), kn = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
wn(jt, yt, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Pn,
  // Deprecated! Use color.formatHex.
  formatHex: Pn,
  formatHex8: bs,
  formatHsl: Ns,
  formatRgb: On,
  toString: On
});
function Pn() {
  return this.rgb().formatHex();
}
function bs() {
  return this.rgb().formatHex8();
}
function Ns() {
  return Er(this).formatHsl();
}
function On() {
  return this.rgb().formatRgb();
}
function yt(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = gs.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? zn(e) : n === 3 ? new Q(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? re(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? re(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = ms.exec(t)) ? new Q(e[1], e[2], e[3], 1) : (e = ys.exec(t)) ? new Q(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = ws.exec(t)) ? re(e[1], e[2], e[3], e[4]) : (e = _s.exec(t)) ? re(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = xs.exec(t)) ? Bn(e[1], e[2] / 100, e[3] / 100, 1) : (e = vs.exec(t)) ? Bn(e[1], e[2] / 100, e[3] / 100, e[4]) : kn.hasOwnProperty(t) ? zn(kn[t]) : t === "transparent" ? new Q(NaN, NaN, NaN, 0) : null;
}
function zn(t) {
  return new Q(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function re(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new Q(t, e, n, r);
}
function Es(t) {
  return t instanceof jt || (t = yt(t)), t ? (t = t.rgb(), new Q(t.r, t.g, t.b, t.opacity)) : new Q();
}
function on(t, e, n, r) {
  return arguments.length === 1 ? Es(t) : new Q(t, e, n, r ?? 1);
}
function Q(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
wn(Q, on, Nr(jt, {
  brighter(t) {
    return t = t == null ? ye : Math.pow(ye, t), new Q(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? qt : Math.pow(qt, t), new Q(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Q(mt(this.r), mt(this.g), mt(this.b), we(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Dn,
  // Deprecated! Use color.formatHex.
  formatHex: Dn,
  formatHex8: $s,
  formatRgb: Rn,
  toString: Rn
}));
function Dn() {
  return `#${gt(this.r)}${gt(this.g)}${gt(this.b)}`;
}
function $s() {
  return `#${gt(this.r)}${gt(this.g)}${gt(this.b)}${gt((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Rn() {
  const t = we(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${mt(this.r)}, ${mt(this.g)}, ${mt(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function we(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function mt(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function gt(t) {
  return t = mt(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Bn(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new rt(t, e, n, r);
}
function Er(t) {
  if (t instanceof rt) return new rt(t.h, t.s, t.l, t.opacity);
  if (t instanceof jt || (t = yt(t)), !t) return new rt();
  if (t instanceof rt) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), o = Math.max(e, n, r), s = NaN, a = o - i, c = (o + i) / 2;
  return a ? (e === o ? s = (n - r) / a + (n < r) * 6 : n === o ? s = (r - e) / a + 2 : s = (e - n) / a + 4, a /= c < 0.5 ? o + i : 2 - o - i, s *= 60) : a = c > 0 && c < 1 ? 0 : s, new rt(s, a, c, t.opacity);
}
function Ss(t, e, n, r) {
  return arguments.length === 1 ? Er(t) : new rt(t, e, n, r ?? 1);
}
function rt(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
wn(rt, Ss, Nr(jt, {
  brighter(t) {
    return t = t == null ? ye : Math.pow(ye, t), new rt(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? qt : Math.pow(qt, t), new rt(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new Q(
      Fe(t >= 240 ? t - 240 : t + 120, i, r),
      Fe(t, i, r),
      Fe(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new rt(Hn(this.h), ie(this.s), ie(this.l), we(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = we(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Hn(this.h)}, ${ie(this.s) * 100}%, ${ie(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Hn(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function ie(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Fe(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const _n = (t) => () => t;
function Cs(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function Ts(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function Ms(t) {
  return (t = +t) == 1 ? $r : function(e, n) {
    return n - e ? Ts(e, n, t) : _n(isNaN(e) ? n : e);
  };
}
function $r(t, e) {
  var n = e - t;
  return n ? Cs(t, n) : _n(isNaN(t) ? e : t);
}
const _e = (function t(e) {
  var n = Ms(e);
  function r(i, o) {
    var s = n((i = on(i)).r, (o = on(o)).r), a = n(i.g, o.g), c = n(i.b, o.b), u = $r(i.opacity, o.opacity);
    return function(l) {
      return i.r = s(l), i.g = a(l), i.b = c(l), i.opacity = u(l), i + "";
    };
  }
  return r.gamma = t, r;
})(1);
function As(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, r = e.slice(), i;
  return function(o) {
    for (i = 0; i < n; ++i) r[i] = t[i] * (1 - o) + e[i] * o;
    return r;
  };
}
function Is(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function ks(t, e) {
  var n = e ? e.length : 0, r = t ? Math.min(n, t.length) : 0, i = new Array(r), o = new Array(n), s;
  for (s = 0; s < r; ++s) i[s] = Yt(t[s], e[s]);
  for (; s < n; ++s) o[s] = e[s];
  return function(a) {
    for (s = 0; s < r; ++s) o[s] = i[s](a);
    return o;
  };
}
function Ps(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(r) {
    return n.setTime(t * (1 - r) + e * r), n;
  };
}
function ot(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function Os(t, e) {
  var n = {}, r = {}, i;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (i in e)
    i in t ? n[i] = Yt(t[i], e[i]) : r[i] = e[i];
  return function(o) {
    for (i in n) r[i] = n[i](o);
    return r;
  };
}
var sn = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Ze = new RegExp(sn.source, "g");
function zs(t) {
  return function() {
    return t;
  };
}
function Ds(t) {
  return function(e) {
    return t(e) + "";
  };
}
function Sr(t, e) {
  var n = sn.lastIndex = Ze.lastIndex = 0, r, i, o, s = -1, a = [], c = [];
  for (t = t + "", e = e + ""; (r = sn.exec(t)) && (i = Ze.exec(e)); )
    (o = i.index) > n && (o = e.slice(n, o), a[s] ? a[s] += o : a[++s] = o), (r = r[0]) === (i = i[0]) ? a[s] ? a[s] += i : a[++s] = i : (a[++s] = null, c.push({ i: s, x: ot(r, i) })), n = Ze.lastIndex;
  return n < e.length && (o = e.slice(n), a[s] ? a[s] += o : a[++s] = o), a.length < 2 ? c[0] ? Ds(c[0].x) : zs(e) : (e = c.length, function(u) {
    for (var l = 0, f; l < e; ++l) a[(f = c[l]).i] = f.x(u);
    return a.join("");
  });
}
function Yt(t, e) {
  var n = typeof e, r;
  return e == null || n === "boolean" ? _n(e) : (n === "number" ? ot : n === "string" ? (r = yt(e)) ? (e = r, _e) : Sr : e instanceof yt ? _e : e instanceof Date ? Ps : Is(e) ? As : Array.isArray(e) ? ks : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? Os : ot)(t, e);
}
var Wn = 180 / Math.PI, an = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Cr(t, e, n, r, i, o) {
  var s, a, c;
  return (s = Math.sqrt(t * t + e * e)) && (t /= s, e /= s), (c = t * n + e * r) && (n -= t * c, r -= e * c), (a = Math.sqrt(n * n + r * r)) && (n /= a, r /= a, c /= a), t * r < e * n && (t = -t, e = -e, c = -c, s = -s), {
    translateX: i,
    translateY: o,
    rotate: Math.atan2(e, t) * Wn,
    skewX: Math.atan(c) * Wn,
    scaleX: s,
    scaleY: a
  };
}
var oe;
function Rs(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? an : Cr(e.a, e.b, e.c, e.d, e.e, e.f);
}
function Bs(t) {
  return t == null || (oe || (oe = document.createElementNS("http://www.w3.org/2000/svg", "g")), oe.setAttribute("transform", t), !(t = oe.transform.baseVal.consolidate())) ? an : (t = t.matrix, Cr(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Tr(t, e, n, r) {
  function i(u) {
    return u.length ? u.pop() + " " : "";
  }
  function o(u, l, f, d, m, b) {
    if (u !== f || l !== d) {
      var $ = m.push("translate(", null, e, null, n);
      b.push({ i: $ - 4, x: ot(u, f) }, { i: $ - 2, x: ot(l, d) });
    } else (f || d) && m.push("translate(" + f + e + d + n);
  }
  function s(u, l, f, d) {
    u !== l ? (u - l > 180 ? l += 360 : l - u > 180 && (u += 360), d.push({ i: f.push(i(f) + "rotate(", null, r) - 2, x: ot(u, l) })) : l && f.push(i(f) + "rotate(" + l + r);
  }
  function a(u, l, f, d) {
    u !== l ? d.push({ i: f.push(i(f) + "skewX(", null, r) - 2, x: ot(u, l) }) : l && f.push(i(f) + "skewX(" + l + r);
  }
  function c(u, l, f, d, m, b) {
    if (u !== f || l !== d) {
      var $ = m.push(i(m) + "scale(", null, ",", null, ")");
      b.push({ i: $ - 4, x: ot(u, f) }, { i: $ - 2, x: ot(l, d) });
    } else (f !== 1 || d !== 1) && m.push(i(m) + "scale(" + f + "," + d + ")");
  }
  return function(u, l) {
    var f = [], d = [];
    return u = t(u), l = t(l), o(u.translateX, u.translateY, l.translateX, l.translateY, f, d), s(u.rotate, l.rotate, f, d), a(u.skewX, l.skewX, f, d), c(u.scaleX, u.scaleY, l.scaleX, l.scaleY, f, d), u = l = null, function(m) {
      for (var b = -1, $ = d.length, P; ++b < $; ) f[(P = d[b]).i] = P.x(m);
      return f.join("");
    };
  };
}
var Hs = Tr(Rs, "px, ", "px)", "deg)"), Ws = Tr(Bs, ", ", ")", ")"), Ls = 1e-12;
function Ln(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function Xs(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function Ys(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const le = (function t(e, n, r) {
  function i(o, s) {
    var a = o[0], c = o[1], u = o[2], l = s[0], f = s[1], d = s[2], m = l - a, b = f - c, $ = m * m + b * b, P, N;
    if ($ < Ls)
      N = Math.log(d / u) / e, P = function(I) {
        return [
          a + I * m,
          c + I * b,
          u * Math.exp(e * I * N)
        ];
      };
    else {
      var z = Math.sqrt($), x = (d * d - u * u + r * $) / (2 * u * n * z), p = (d * d - u * u - r * $) / (2 * d * n * z), w = Math.log(Math.sqrt(x * x + 1) - x), v = Math.log(Math.sqrt(p * p + 1) - p);
      N = (v - w) / e, P = function(I) {
        var R = I * N, L = Ln(w), U = u / (n * z) * (L * Ys(e * R + w) - Xs(w));
        return [
          a + U * m,
          c + U * b,
          u * L / Ln(e * R + w)
        ];
      };
    }
    return P.duration = N * 1e3 * e / Math.SQRT2, P;
  }
  return i.rho = function(o) {
    var s = Math.max(1e-3, +o), a = s * s, c = a * a;
    return t(s, a, c);
  }, i;
})(Math.SQRT2, 2, 4);
var Tt = 0, Wt = 0, Bt = 0, Mr = 1e3, xe, Lt, ve = 0, wt = 0, Te = 0, Zt = typeof performance == "object" && performance.now ? performance : Date, Ar = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function xn() {
  return wt || (Ar(Vs), wt = Zt.now() + Te);
}
function Vs() {
  wt = 0;
}
function be() {
  this._call = this._time = this._next = null;
}
be.prototype = Ir.prototype = {
  constructor: be,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? xn() : +n) + (e == null ? 0 : +e), !this._next && Lt !== this && (Lt ? Lt._next = this : xe = this, Lt = this), this._call = t, this._time = n, un();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, un());
  }
};
function Ir(t, e, n) {
  var r = new be();
  return r.restart(t, e, n), r;
}
function qs() {
  xn(), ++Tt;
  for (var t = xe, e; t; )
    (e = wt - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --Tt;
}
function Xn() {
  wt = (ve = Zt.now()) + Te, Tt = Wt = 0;
  try {
    qs();
  } finally {
    Tt = 0, Zs(), wt = 0;
  }
}
function Fs() {
  var t = Zt.now(), e = t - ve;
  e > Mr && (Te -= e, ve = t);
}
function Zs() {
  for (var t, e = xe, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : xe = n);
  Lt = t, un(r);
}
function un(t) {
  if (!Tt) {
    Wt && (Wt = clearTimeout(Wt));
    var e = t - wt;
    e > 24 ? (t < 1 / 0 && (Wt = setTimeout(Xn, t - Zt.now() - Te)), Bt && (Bt = clearInterval(Bt))) : (Bt || (ve = Zt.now(), Bt = setInterval(Fs, Mr)), Tt = 1, Ar(Xn));
  }
}
function Yn(t, e, n) {
  var r = new be();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var Us = Se("start", "end", "cancel", "interrupt"), Gs = [], kr = 0, Vn = 1, cn = 2, fe = 3, qn = 4, ln = 5, he = 6;
function Me(t, e, n, r, i, o) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (n in s) return;
  Ks(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Us,
    tween: Gs,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: kr
  });
}
function vn(t, e) {
  var n = it(t, e);
  if (n.state > kr) throw new Error("too late; already scheduled");
  return n;
}
function ct(t, e) {
  var n = it(t, e);
  if (n.state > fe) throw new Error("too late; already running");
  return n;
}
function it(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function Ks(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = Ir(o, 0, n.time);
  function o(u) {
    n.state = Vn, n.timer.restart(s, n.delay, n.time), n.delay <= u && s(u - n.delay);
  }
  function s(u) {
    var l, f, d, m;
    if (n.state !== Vn) return c();
    for (l in r)
      if (m = r[l], m.name === n.name) {
        if (m.state === fe) return Yn(s);
        m.state === qn ? (m.state = he, m.timer.stop(), m.on.call("interrupt", t, t.__data__, m.index, m.group), delete r[l]) : +l < e && (m.state = he, m.timer.stop(), m.on.call("cancel", t, t.__data__, m.index, m.group), delete r[l]);
      }
    if (Yn(function() {
      n.state === fe && (n.state = qn, n.timer.restart(a, n.delay, n.time), a(u));
    }), n.state = cn, n.on.call("start", t, t.__data__, n.index, n.group), n.state === cn) {
      for (n.state = fe, i = new Array(d = n.tween.length), l = 0, f = -1; l < d; ++l)
        (m = n.tween[l].value.call(t, t.__data__, n.index, n.group)) && (i[++f] = m);
      i.length = f + 1;
    }
  }
  function a(u) {
    for (var l = u < n.duration ? n.ease.call(null, u / n.duration) : (n.timer.restart(c), n.state = ln, 1), f = -1, d = i.length; ++f < d; )
      i[f].call(t, l);
    n.state === ln && (n.on.call("end", t, t.__data__, n.index, n.group), c());
  }
  function c() {
    n.state = he, n.timer.stop(), delete r[e];
    for (var u in r) return;
    delete t.__transition;
  }
}
function de(t, e) {
  var n = t.__transition, r, i, o = !0, s;
  if (n) {
    e = e == null ? null : e + "";
    for (s in n) {
      if ((r = n[s]).name !== e) {
        o = !1;
        continue;
      }
      i = r.state > cn && r.state < ln, r.state = he, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[s];
    }
    o && delete t.__transition;
  }
}
function Qs(t) {
  return this.each(function() {
    de(this, t);
  });
}
function Js(t, e) {
  var n, r;
  return function() {
    var i = ct(this, t), o = i.tween;
    if (o !== n) {
      r = n = o;
      for (var s = 0, a = r.length; s < a; ++s)
        if (r[s].name === e) {
          r = r.slice(), r.splice(s, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function js(t, e, n) {
  var r, i;
  if (typeof n != "function") throw new Error();
  return function() {
    var o = ct(this, t), s = o.tween;
    if (s !== r) {
      i = (r = s).slice();
      for (var a = { name: e, value: n }, c = 0, u = i.length; c < u; ++c)
        if (i[c].name === e) {
          i[c] = a;
          break;
        }
      c === u && i.push(a);
    }
    o.tween = i;
  };
}
function ta(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = it(this.node(), n).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? Js : js)(n, t, e));
}
function bn(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = ct(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return it(i, r).value[e];
  };
}
function Pr(t, e) {
  var n;
  return (typeof e == "number" ? ot : e instanceof yt ? _e : (n = yt(e)) ? (e = n, _e) : Sr)(t, e);
}
function ea(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function na(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function ra(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? o : o = e(r = s, n);
  };
}
function ia(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? o : o = e(r = s, n);
  };
}
function oa(t, e, n) {
  var r, i, o;
  return function() {
    var s, a = n(this), c;
    return a == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), c = a + "", s === c ? null : s === r && c === i ? o : (i = c, o = e(r = s, a)));
  };
}
function sa(t, e, n) {
  var r, i, o;
  return function() {
    var s, a = n(this), c;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), c = a + "", s === c ? null : s === r && c === i ? o : (i = c, o = e(r = s, a)));
  };
}
function aa(t, e) {
  var n = Ce(t), r = n === "transform" ? Ws : Pr;
  return this.attrTween(t, typeof e == "function" ? (n.local ? sa : oa)(n, r, bn(this, "attr." + t, e)) : e == null ? (n.local ? na : ea)(n) : (n.local ? ia : ra)(n, r, e));
}
function ua(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function ca(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function la(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && ca(t, o)), n;
  }
  return i._value = e, i;
}
function fa(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && ua(t, o)), n;
  }
  return i._value = e, i;
}
function ha(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var r = Ce(t);
  return this.tween(n, (r.local ? la : fa)(r, e));
}
function da(t, e) {
  return function() {
    vn(this, t).delay = +e.apply(this, arguments);
  };
}
function pa(t, e) {
  return e = +e, function() {
    vn(this, t).delay = e;
  };
}
function ga(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? da : pa)(e, t)) : it(this.node(), e).delay;
}
function ma(t, e) {
  return function() {
    ct(this, t).duration = +e.apply(this, arguments);
  };
}
function ya(t, e) {
  return e = +e, function() {
    ct(this, t).duration = e;
  };
}
function wa(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? ma : ya)(e, t)) : it(this.node(), e).duration;
}
function _a(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    ct(this, t).ease = e;
  };
}
function xa(t) {
  var e = this._id;
  return arguments.length ? this.each(_a(e, t)) : it(this.node(), e).ease;
}
function va(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    ct(this, t).ease = n;
  };
}
function ba(t) {
  if (typeof t != "function") throw new Error();
  return this.each(va(this._id, t));
}
function Na(t) {
  typeof t != "function" && (t = fr(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], s = o.length, a = r[i] = [], c, u = 0; u < s; ++u)
      (c = o[u]) && t.call(c, c.__data__, u, o) && a.push(c);
  return new ht(r, this._parents, this._name, this._id);
}
function Ea(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, o = Math.min(r, i), s = new Array(r), a = 0; a < o; ++a)
    for (var c = e[a], u = n[a], l = c.length, f = s[a] = new Array(l), d, m = 0; m < l; ++m)
      (d = c[m] || u[m]) && (f[m] = d);
  for (; a < r; ++a)
    s[a] = e[a];
  return new ht(s, this._parents, this._name, this._id);
}
function $a(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function Sa(t, e, n) {
  var r, i, o = $a(e) ? vn : ct;
  return function() {
    var s = o(this, t), a = s.on;
    a !== r && (i = (r = a).copy()).on(e, n), s.on = i;
  };
}
function Ca(t, e) {
  var n = this._id;
  return arguments.length < 2 ? it(this.node(), n).on.on(t) : this.each(Sa(n, t, e));
}
function Ta(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function Ma() {
  return this.on("end.remove", Ta(this._id));
}
function Aa(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = mn(t));
  for (var r = this._groups, i = r.length, o = new Array(i), s = 0; s < i; ++s)
    for (var a = r[s], c = a.length, u = o[s] = new Array(c), l, f, d = 0; d < c; ++d)
      (l = a[d]) && (f = t.call(l, l.__data__, d, a)) && ("__data__" in l && (f.__data__ = l.__data__), u[d] = f, Me(u[d], e, n, d, u, it(l, n)));
  return new ht(o, this._parents, e, n);
}
function Ia(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = lr(t));
  for (var r = this._groups, i = r.length, o = [], s = [], a = 0; a < i; ++a)
    for (var c = r[a], u = c.length, l, f = 0; f < u; ++f)
      if (l = c[f]) {
        for (var d = t.call(l, l.__data__, f, c), m, b = it(l, n), $ = 0, P = d.length; $ < P; ++$)
          (m = d[$]) && Me(m, e, n, $, d, b);
        o.push(d), s.push(l);
      }
  return new ht(o, s, e, n);
}
var ka = Jt.prototype.constructor;
function Pa() {
  return new ka(this._groups, this._parents);
}
function Oa(t, e) {
  var n, r, i;
  return function() {
    var o = Ct(this, t), s = (this.style.removeProperty(t), Ct(this, t));
    return o === s ? null : o === n && s === r ? i : i = e(n = o, r = s);
  };
}
function Or(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function za(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var s = Ct(this, t);
    return s === i ? null : s === r ? o : o = e(r = s, n);
  };
}
function Da(t, e, n) {
  var r, i, o;
  return function() {
    var s = Ct(this, t), a = n(this), c = a + "";
    return a == null && (c = a = (this.style.removeProperty(t), Ct(this, t))), s === c ? null : s === r && c === i ? o : (i = c, o = e(r = s, a));
  };
}
function Ra(t, e) {
  var n, r, i, o = "style." + e, s = "end." + o, a;
  return function() {
    var c = ct(this, t), u = c.on, l = c.value[o] == null ? a || (a = Or(e)) : void 0;
    (u !== n || i !== l) && (r = (n = u).copy()).on(s, i = l), c.on = r;
  };
}
function Ba(t, e, n) {
  var r = (t += "") == "transform" ? Hs : Pr;
  return e == null ? this.styleTween(t, Oa(t, r)).on("end.style." + t, Or(t)) : typeof e == "function" ? this.styleTween(t, Da(t, r, bn(this, "style." + t, e))).each(Ra(this._id, t)) : this.styleTween(t, za(t, r, e), n).on("end.style." + t, null);
}
function Ha(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function Wa(t, e, n) {
  var r, i;
  function o() {
    var s = e.apply(this, arguments);
    return s !== i && (r = (i = s) && Ha(t, s, n)), r;
  }
  return o._value = e, o;
}
function La(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (e == null) return this.tween(r, null);
  if (typeof e != "function") throw new Error();
  return this.tween(r, Wa(t, e, n ?? ""));
}
function Xa(t) {
  return function() {
    this.textContent = t;
  };
}
function Ya(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function Va(t) {
  return this.tween("text", typeof t == "function" ? Ya(bn(this, "text", t)) : Xa(t == null ? "" : t + ""));
}
function qa(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function Fa(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && qa(i)), e;
  }
  return r._value = t, r;
}
function Za(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, Fa(t));
}
function Ua() {
  for (var t = this._name, e = this._id, n = zr(), r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], a = s.length, c, u = 0; u < a; ++u)
      if (c = s[u]) {
        var l = it(c, e);
        Me(c, t, n, u, s, {
          time: l.time + l.delay + l.duration,
          delay: 0,
          duration: l.duration,
          ease: l.ease
        });
      }
  return new ht(r, this._parents, t, n);
}
function Ga() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(o, s) {
    var a = { value: s }, c = { value: function() {
      --i === 0 && o();
    } };
    n.each(function() {
      var u = ct(this, r), l = u.on;
      l !== t && (e = (t = l).copy(), e._.cancel.push(a), e._.interrupt.push(a), e._.end.push(c)), u.on = e;
    }), i === 0 && o();
  });
}
var Ka = 0;
function ht(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function zr() {
  return ++Ka;
}
var lt = Jt.prototype;
ht.prototype = {
  constructor: ht,
  select: Aa,
  selectAll: Ia,
  selectChild: lt.selectChild,
  selectChildren: lt.selectChildren,
  filter: Na,
  merge: Ea,
  selection: Pa,
  transition: Ua,
  call: lt.call,
  nodes: lt.nodes,
  node: lt.node,
  size: lt.size,
  empty: lt.empty,
  each: lt.each,
  on: Ca,
  attr: aa,
  attrTween: ha,
  style: Ba,
  styleTween: La,
  text: Va,
  textTween: Za,
  remove: Ma,
  tween: ta,
  delay: ga,
  duration: wa,
  ease: xa,
  easeVarying: ba,
  end: Ga,
  [Symbol.iterator]: lt[Symbol.iterator]
};
function Qa(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Ja = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Qa
};
function ja(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function tu(t) {
  var e, n;
  t instanceof ht ? (e = t._id, t = t._name) : (e = zr(), (n = Ja).time = xn(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], a = s.length, c, u = 0; u < a; ++u)
      (c = s[u]) && Me(c, t, e, u, s, n || ja(c, e));
  return new ht(r, this._parents, t, e);
}
Jt.prototype.interrupt = Qs;
Jt.prototype.transition = tu;
const se = (t) => () => t;
function eu(t, {
  sourceEvent: e,
  target: n,
  transform: r,
  dispatch: i
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: e, enumerable: !0, configurable: !0 },
    target: { value: n, enumerable: !0, configurable: !0 },
    transform: { value: r, enumerable: !0, configurable: !0 },
    _: { value: i }
  });
}
function ft(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
ft.prototype = {
  constructor: ft,
  scale: function(t) {
    return t === 1 ? this : new ft(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new ft(this.k, this.x + this.k * t, this.y + this.k * e);
  },
  apply: function(t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function(t) {
    return t * this.k + this.x;
  },
  applyY: function(t) {
    return t * this.k + this.y;
  },
  invert: function(t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function(t) {
    return (t - this.x) / this.k;
  },
  invertY: function(t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function(t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function(t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var Ae = new ft(1, 0, 0);
Dr.prototype = ft.prototype;
function Dr(t) {
  for (; !t.__zoom; ) if (!(t = t.parentNode)) return Ae;
  return t.__zoom;
}
function Ue(t) {
  t.stopImmediatePropagation();
}
function Ht(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function nu(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function ru() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function Fn() {
  return this.__zoom || Ae;
}
function iu(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function ou() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function su(t, e, n) {
  var r = t.invertX(e[0][0]) - n[0][0], i = t.invertX(e[1][0]) - n[1][0], o = t.invertY(e[0][1]) - n[0][1], s = t.invertY(e[1][1]) - n[1][1];
  return t.translate(
    i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i),
    s > o ? (o + s) / 2 : Math.min(0, o) || Math.max(0, s)
  );
}
function Rr() {
  var t = nu, e = ru, n = su, r = iu, i = ou, o = [0, 1 / 0], s = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, c = le, u = Se("start", "zoom", "end"), l, f, d, m = 500, b = 150, $ = 0, P = 10;
  function N(h) {
    h.property("__zoom", Fn).on("wheel.zoom", R, { passive: !1 }).on("mousedown.zoom", L).on("dblclick.zoom", U).filter(i).on("touchstart.zoom", M).on("touchmove.zoom", E).on("touchend.zoom touchcancel.zoom", A).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  N.transform = function(h, y, g, _) {
    var S = h.selection ? h.selection() : h;
    S.property("__zoom", Fn), h !== S ? w(h, y, g, _) : S.interrupt().each(function() {
      v(this, arguments).event(_).start().zoom(null, typeof y == "function" ? y.apply(this, arguments) : y).end();
    });
  }, N.scaleBy = function(h, y, g, _) {
    N.scaleTo(h, function() {
      var S = this.__zoom.k, C = typeof y == "function" ? y.apply(this, arguments) : y;
      return S * C;
    }, g, _);
  }, N.scaleTo = function(h, y, g, _) {
    N.transform(h, function() {
      var S = e.apply(this, arguments), C = this.__zoom, T = g == null ? p(S) : typeof g == "function" ? g.apply(this, arguments) : g, k = C.invert(T), O = typeof y == "function" ? y.apply(this, arguments) : y;
      return n(x(z(C, O), T, k), S, s);
    }, g, _);
  }, N.translateBy = function(h, y, g, _) {
    N.transform(h, function() {
      return n(this.__zoom.translate(
        typeof y == "function" ? y.apply(this, arguments) : y,
        typeof g == "function" ? g.apply(this, arguments) : g
      ), e.apply(this, arguments), s);
    }, null, _);
  }, N.translateTo = function(h, y, g, _, S) {
    N.transform(h, function() {
      var C = e.apply(this, arguments), T = this.__zoom, k = _ == null ? p(C) : typeof _ == "function" ? _.apply(this, arguments) : _;
      return n(Ae.translate(k[0], k[1]).scale(T.k).translate(
        typeof y == "function" ? -y.apply(this, arguments) : -y,
        typeof g == "function" ? -g.apply(this, arguments) : -g
      ), C, s);
    }, _, S);
  };
  function z(h, y) {
    return y = Math.max(o[0], Math.min(o[1], y)), y === h.k ? h : new ft(y, h.x, h.y);
  }
  function x(h, y, g) {
    var _ = y[0] - g[0] * h.k, S = y[1] - g[1] * h.k;
    return _ === h.x && S === h.y ? h : new ft(h.k, _, S);
  }
  function p(h) {
    return [(+h[0][0] + +h[1][0]) / 2, (+h[0][1] + +h[1][1]) / 2];
  }
  function w(h, y, g, _) {
    h.on("start.zoom", function() {
      v(this, arguments).event(_).start();
    }).on("interrupt.zoom end.zoom", function() {
      v(this, arguments).event(_).end();
    }).tween("zoom", function() {
      var S = this, C = arguments, T = v(S, C).event(_), k = e.apply(S, C), O = g == null ? p(k) : typeof g == "function" ? g.apply(S, C) : g, Y = Math.max(k[1][0] - k[0][0], k[1][1] - k[0][1]), B = S.__zoom, X = typeof y == "function" ? y.apply(S, C) : y, G = c(B.invert(O).concat(Y / B.k), X.invert(O).concat(Y / X.k));
      return function(V) {
        if (V === 1) V = X;
        else {
          var H = G(V), et = Y / H[2];
          V = new ft(et, O[0] - H[0] * et, O[1] - H[1] * et);
        }
        T.zoom(null, V);
      };
    });
  }
  function v(h, y, g) {
    return !g && h.__zooming || new I(h, y);
  }
  function I(h, y) {
    this.that = h, this.args = y, this.active = 0, this.sourceEvent = null, this.extent = e.apply(h, y), this.taps = 0;
  }
  I.prototype = {
    event: function(h) {
      return h && (this.sourceEvent = h), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(h, y) {
      return this.mouse && h !== "mouse" && (this.mouse[1] = y.invert(this.mouse[0])), this.touch0 && h !== "touch" && (this.touch0[1] = y.invert(this.touch0[0])), this.touch1 && h !== "touch" && (this.touch1[1] = y.invert(this.touch1[0])), this.that.__zoom = y, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(h) {
      var y = tt(this.that).datum();
      u.call(
        h,
        this.that,
        new eu(h, {
          sourceEvent: this.sourceEvent,
          target: N,
          transform: this.that.__zoom,
          dispatch: u
        }),
        y
      );
    }
  };
  function R(h, ...y) {
    if (!t.apply(this, arguments)) return;
    var g = v(this, y).event(h), _ = this.__zoom, S = Math.max(o[0], Math.min(o[1], _.k * Math.pow(2, r.apply(this, arguments)))), C = nt(h);
    if (g.wheel)
      (g.mouse[0][0] !== C[0] || g.mouse[0][1] !== C[1]) && (g.mouse[1] = _.invert(g.mouse[0] = C)), clearTimeout(g.wheel);
    else {
      if (_.k === S) return;
      g.mouse = [C, _.invert(C)], de(this), g.start();
    }
    Ht(h), g.wheel = setTimeout(T, b), g.zoom("mouse", n(x(z(_, S), g.mouse[0], g.mouse[1]), g.extent, s));
    function T() {
      g.wheel = null, g.end();
    }
  }
  function L(h, ...y) {
    if (d || !t.apply(this, arguments)) return;
    var g = h.currentTarget, _ = v(this, y, !0).event(h), S = tt(h.view).on("mousemove.zoom", O, !0).on("mouseup.zoom", Y, !0), C = nt(h, g), T = h.clientX, k = h.clientY;
    vr(h.view), Ue(h), _.mouse = [C, this.__zoom.invert(C)], de(this), _.start();
    function O(B) {
      if (Ht(B), !_.moved) {
        var X = B.clientX - T, G = B.clientY - k;
        _.moved = X * X + G * G > $;
      }
      _.event(B).zoom("mouse", n(x(_.that.__zoom, _.mouse[0] = nt(B, g), _.mouse[1]), _.extent, s));
    }
    function Y(B) {
      S.on("mousemove.zoom mouseup.zoom", null), br(B.view, _.moved), Ht(B), _.event(B).end();
    }
  }
  function U(h, ...y) {
    if (t.apply(this, arguments)) {
      var g = this.__zoom, _ = nt(h.changedTouches ? h.changedTouches[0] : h, this), S = g.invert(_), C = g.k * (h.shiftKey ? 0.5 : 2), T = n(x(z(g, C), _, S), e.apply(this, y), s);
      Ht(h), a > 0 ? tt(this).transition().duration(a).call(w, T, _, h) : tt(this).call(N.transform, T, _, h);
    }
  }
  function M(h, ...y) {
    if (t.apply(this, arguments)) {
      var g = h.touches, _ = g.length, S = v(this, y, h.changedTouches.length === _).event(h), C, T, k, O;
      for (Ue(h), T = 0; T < _; ++T)
        k = g[T], O = nt(k, this), O = [O, this.__zoom.invert(O), k.identifier], S.touch0 ? !S.touch1 && S.touch0[2] !== O[2] && (S.touch1 = O, S.taps = 0) : (S.touch0 = O, C = !0, S.taps = 1 + !!l);
      l && (l = clearTimeout(l)), C && (S.taps < 2 && (f = O[0], l = setTimeout(function() {
        l = null;
      }, m)), de(this), S.start());
    }
  }
  function E(h, ...y) {
    if (this.__zooming) {
      var g = v(this, y).event(h), _ = h.changedTouches, S = _.length, C, T, k, O;
      for (Ht(h), C = 0; C < S; ++C)
        T = _[C], k = nt(T, this), g.touch0 && g.touch0[2] === T.identifier ? g.touch0[0] = k : g.touch1 && g.touch1[2] === T.identifier && (g.touch1[0] = k);
      if (T = g.that.__zoom, g.touch1) {
        var Y = g.touch0[0], B = g.touch0[1], X = g.touch1[0], G = g.touch1[1], V = (V = X[0] - Y[0]) * V + (V = X[1] - Y[1]) * V, H = (H = G[0] - B[0]) * H + (H = G[1] - B[1]) * H;
        T = z(T, Math.sqrt(V / H)), k = [(Y[0] + X[0]) / 2, (Y[1] + X[1]) / 2], O = [(B[0] + G[0]) / 2, (B[1] + G[1]) / 2];
      } else if (g.touch0) k = g.touch0[0], O = g.touch0[1];
      else return;
      g.zoom("touch", n(x(T, k, O), g.extent, s));
    }
  }
  function A(h, ...y) {
    if (this.__zooming) {
      var g = v(this, y).event(h), _ = h.changedTouches, S = _.length, C, T;
      for (Ue(h), d && clearTimeout(d), d = setTimeout(function() {
        d = null;
      }, m), C = 0; C < S; ++C)
        T = _[C], g.touch0 && g.touch0[2] === T.identifier ? delete g.touch0 : g.touch1 && g.touch1[2] === T.identifier && delete g.touch1;
      if (g.touch1 && !g.touch0 && (g.touch0 = g.touch1, delete g.touch1), g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
      else if (g.end(), g.taps === 2 && (T = nt(T, this), Math.hypot(f[0] - T[0], f[1] - T[1]) < P)) {
        var k = tt(this).on("dblclick.zoom");
        k && k.apply(this, arguments);
      }
    }
  }
  return N.wheelDelta = function(h) {
    return arguments.length ? (r = typeof h == "function" ? h : se(+h), N) : r;
  }, N.filter = function(h) {
    return arguments.length ? (t = typeof h == "function" ? h : se(!!h), N) : t;
  }, N.touchable = function(h) {
    return arguments.length ? (i = typeof h == "function" ? h : se(!!h), N) : i;
  }, N.extent = function(h) {
    return arguments.length ? (e = typeof h == "function" ? h : se([[+h[0][0], +h[0][1]], [+h[1][0], +h[1][1]]]), N) : e;
  }, N.scaleExtent = function(h) {
    return arguments.length ? (o[0] = +h[0], o[1] = +h[1], N) : [o[0], o[1]];
  }, N.translateExtent = function(h) {
    return arguments.length ? (s[0][0] = +h[0][0], s[1][0] = +h[1][0], s[0][1] = +h[0][1], s[1][1] = +h[1][1], N) : [[s[0][0], s[0][1]], [s[1][0], s[1][1]]];
  }, N.constrain = function(h) {
    return arguments.length ? (n = h, N) : n;
  }, N.duration = function(h) {
    return arguments.length ? (a = +h, N) : a;
  }, N.interpolate = function(h) {
    return arguments.length ? (c = h, N) : c;
  }, N.on = function() {
    var h = u.on.apply(u, arguments);
    return h === u ? N : h;
  }, N.clickDistance = function(h) {
    return arguments.length ? ($ = (h = +h) * h, N) : Math.sqrt($);
  }, N.tapDistance = function(h) {
    return arguments.length ? (P = +h, N) : P;
  }, N;
}
const Zn = {
  error001: () => "[React Flow]: Seems like you have not used zustand provider as an ancestor. Help: https://reactflow.dev/error#001",
  error002: () => "It looks like you've created a new nodeTypes or edgeTypes object. If this wasn't on purpose please define the nodeTypes/edgeTypes outside of the component or memoize them.",
  error003: (t) => `Node type "${t}" not found. Using fallback type "default".`,
  error004: () => "The React Flow parent container needs a width and a height to render the graph.",
  error005: () => "Only child nodes can use a parent extent.",
  error006: () => "Can't create edge. An edge needs a source and a target.",
  error007: (t) => `The old edge with id=${t} does not exist.`,
  error009: (t) => `Marker type "${t}" doesn't exist.`,
  error008: (t, { id: e, sourceHandle: n, targetHandle: r }) => `Couldn't create edge for ${t} handle id: "${t === "source" ? n : r}", edge id: ${e}.`,
  error010: () => "Handle: No node id found. Make sure to only use a Handle inside a custom Node.",
  error011: (t) => `Edge type "${t}" not found. Using fallback type "default".`,
  error012: (t) => `Node with id "${t}" does not exist, it may have been removed. This can happen when a node is deleted before the "onNodeClick" handler is called.`,
  error013: (t = "react") => `It seems that you haven't loaded the styles. Please import '@xyflow/${t}/dist/style.css' or base.css to make sure everything is working properly.`,
  error014: () => "useNodeConnections: No node ID found. Call useNodeConnections inside a custom Node or provide a node ID.",
  error015: () => "It seems that you are trying to drag a node that is not initialized. Please use onNodesChange as explained in the docs."
}, Br = [
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
];
var Un;
(function(t) {
  t.Strict = "strict", t.Loose = "loose";
})(Un || (Un = {}));
var $t;
(function(t) {
  t.Free = "free", t.Vertical = "vertical", t.Horizontal = "horizontal";
})($t || ($t = {}));
var Gn;
(function(t) {
  t.Partial = "partial", t.Full = "full";
})(Gn || (Gn = {}));
var Kn;
(function(t) {
  t.Bezier = "default", t.Straight = "straight", t.Step = "step", t.SmoothStep = "smoothstep", t.SimpleBezier = "simplebezier";
})(Kn || (Kn = {}));
var Qn;
(function(t) {
  t.Arrow = "arrow", t.ArrowClosed = "arrowclosed";
})(Qn || (Qn = {}));
var D;
(function(t) {
  t.Left = "left", t.Top = "top", t.Right = "right", t.Bottom = "bottom";
})(D || (D = {}));
D.Left + "", D.Right, D.Right + "", D.Left, D.Top + "", D.Bottom, D.Bottom + "", D.Top;
const au = (t) => "id" in t && "internals" in t && !("source" in t) && !("target" in t), Ie = (t, e = [0, 0]) => {
  const { width: n, height: r } = zt(t), i = t.origin ?? e, o = n * i[0], s = r * i[1];
  return {
    x: t.position.x - o,
    y: t.position.y - s
  };
}, Hr = (t, e = {}) => {
  let n = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 }, r = !1;
  return t.forEach((i) => {
    (e.filter === void 0 || e.filter(i)) && (n = Wr(n, fu(i)), r = !0);
  }), r ? Lr(n) : { x: 0, y: 0, width: 0, height: 0 };
};
function uu({ nodeId: t, nextPosition: e, nodeLookup: n, nodeOrigin: r = [0, 0], nodeExtent: i, onError: o }) {
  const s = n.get(t), a = s.parentId ? n.get(s.parentId) : void 0, { x: c, y: u } = a ? a.internals.positionAbsolute : { x: 0, y: 0 }, l = s.origin ?? r;
  let f = s.extent || i;
  if (s.extent === "parent" && !s.expandParent)
    if (!a)
      o?.("005", Zn.error005());
    else {
      const m = a.measured.width, b = a.measured.height;
      m && b && (f = [
        [c, u],
        [c + m, u + b]
      ]);
    }
  else a && Gt(s.extent) && (f = [
    [s.extent[0][0] + c, s.extent[0][1] + u],
    [s.extent[1][0] + c, s.extent[1][1] + u]
  ]);
  const d = Gt(f) ? Mt(e, f, s.measured) : e;
  return (s.measured.width === void 0 || s.measured.height === void 0) && o?.("015", Zn.error015()), {
    position: {
      x: d.x - c + (s.measured.width ?? 0) * l[0],
      y: d.y - u + (s.measured.height ?? 0) * l[1]
    },
    positionAbsolute: d
  };
}
const Ut = (t, e = 0, n = 1) => Math.min(Math.max(t, e), n), Mt = (t = { x: 0, y: 0 }, e, n) => ({
  x: Ut(t.x, e[0][0], e[1][0] - (n?.width ?? 0)),
  y: Ut(t.y, e[0][1], e[1][1] - (n?.height ?? 0))
});
function cu(t, e, n) {
  const { width: r, height: i } = zt(n), { x: o, y: s } = n.internals.positionAbsolute;
  return Mt(t, [
    [o, s],
    [o + r, s + i]
  ], e);
}
const Jn = (t, e, n) => t < e ? Ut(Math.abs(t - e), 1, e) / e : t > n ? -Ut(Math.abs(t - n), 1, e) / e : 0, lu = (t, e, n = 15, r = 40) => {
  const i = Jn(t.x, r, e.width - r) * n, o = Jn(t.y, r, e.height - r) * n;
  return [i, o];
}, Wr = (t, e) => ({
  x: Math.min(t.x, e.x),
  y: Math.min(t.y, e.y),
  x2: Math.max(t.x2, e.x2),
  y2: Math.max(t.y2, e.y2)
}), fn = ({ x: t, y: e, width: n, height: r }) => ({
  x: t,
  y: e,
  x2: t + n,
  y2: e + r
}), Lr = ({ x: t, y: e, x2: n, y2: r }) => ({
  x: t,
  y: e,
  width: n - t,
  height: r - e
}), fu = (t, e = [0, 0]) => {
  const { x: n, y: r } = au(t) ? t.internals.positionAbsolute : Ie(t, e);
  return {
    x: n,
    y: r,
    x2: n + (t.measured?.width ?? t.width ?? t.initialWidth ?? 0),
    y2: r + (t.measured?.height ?? t.height ?? t.initialHeight ?? 0)
  };
}, hu = (t, e) => Lr(Wr(fn(t), fn(e))), hn = (t) => !isNaN(t) && isFinite(t), ke = (t, e = [1, 1]) => ({
  x: e[0] * Math.round(t.x / e[0]),
  y: e[1] * Math.round(t.y / e[1])
}), du = ({ x: t, y: e }, [n, r, i], o = !1, s = [1, 1]) => {
  const a = {
    x: (t - n) / i,
    y: (e - r) / i
  };
  return o ? ke(a, s) : a;
}, Nn = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function Gt(t) {
  return t != null && t !== "parent";
}
function zt(t) {
  return {
    width: t.measured?.width ?? t.width ?? t.initialWidth ?? 0,
    height: t.measured?.height ?? t.height ?? t.initialHeight ?? 0
  };
}
function Ge(t, { snapGrid: e = [0, 0], snapToGrid: n = !1, transform: r, containerBounds: i }) {
  const { x: o, y: s } = pe(t), a = du({ x: o - (i?.left ?? 0), y: s - (i?.top ?? 0) }, r), { x: c, y: u } = n ? ke(a, e) : a;
  return {
    xSnapped: c,
    ySnapped: u,
    ...a
  };
}
const pu = (t) => "clientX" in t, pe = (t, e) => {
  const n = pu(t), r = n ? t.clientX : t.touches?.[0].clientX, i = n ? t.clientY : t.touches?.[0].clientY;
  return {
    x: r - (e?.left ?? 0),
    y: i - (e?.top ?? 0)
  };
};
function gu({ sourceX: t, sourceY: e, targetX: n, targetY: r, sourceControlX: i, sourceControlY: o, targetControlX: s, targetControlY: a }) {
  const c = t * 0.125 + i * 0.375 + s * 0.375 + n * 0.125, u = e * 0.125 + o * 0.375 + a * 0.375 + r * 0.125, l = Math.abs(c - t), f = Math.abs(u - e);
  return [c, u, l, f];
}
function ae(t, e) {
  return t >= 0 ? 0.5 * t : e * 25 * Math.sqrt(-t);
}
function jn({ pos: t, x1: e, y1: n, x2: r, y2: i, c: o }) {
  switch (t) {
    case D.Left:
      return [e - ae(e - r, o), n];
    case D.Right:
      return [e + ae(r - e, o), n];
    case D.Top:
      return [e, n - ae(n - i, o)];
    case D.Bottom:
      return [e, n + ae(i - n, o)];
  }
}
function Xr({ sourceX: t, sourceY: e, sourcePosition: n = D.Bottom, targetX: r, targetY: i, targetPosition: o = D.Top, curvature: s = 0.25 }) {
  const [a, c] = jn({
    pos: n,
    x1: t,
    y1: e,
    x2: r,
    y2: i,
    c: s
  }), [u, l] = jn({
    pos: o,
    x1: r,
    y1: i,
    x2: t,
    y2: e,
    c: s
  }), [f, d, m, b] = gu({
    sourceX: t,
    sourceY: e,
    targetX: r,
    targetY: i,
    sourceControlX: a,
    sourceControlY: c,
    targetControlX: u,
    targetControlY: l
  });
  return [
    `M${t},${e} C${a},${c} ${u},${l} ${r},${i}`,
    f,
    d,
    m,
    b
  ];
}
D.Left + "", D.Right + "", D.Top + "", D.Bottom + "";
function tr(t, e, n = D.Left, r = !1) {
  const i = (e?.x ?? 0) + t.internals.positionAbsolute.x, o = (e?.y ?? 0) + t.internals.positionAbsolute.y, { width: s, height: a } = e ?? zt(t);
  if (r)
    return { x: i + s / 2, y: o + a / 2 };
  switch (e?.position ?? n) {
    case D.Top:
      return { x: i + s / 2, y: o };
    case D.Right:
      return { x: i + s, y: o + a / 2 };
    case D.Bottom:
      return { x: i + s / 2, y: o + a };
    case D.Left:
      return { x: i, y: o + a / 2 };
  }
}
const Yr = 1e3, mu = 10, En = {
  nodeOrigin: [0, 0],
  nodeExtent: Br,
  elevateNodesOnSelect: !0,
  zIndexMode: "basic",
  defaults: {}
}, yu = {
  ...En,
  checkEquality: !0
};
function $n(t, e) {
  const n = { ...t };
  for (const r in e)
    e[r] !== void 0 && (n[r] = e[r]);
  return n;
}
function wu(t, e, n) {
  const r = $n(En, n);
  for (const i of t.values())
    if (i.parentId)
      Vr(i, t, e, r);
    else {
      const o = Ie(i, r.nodeOrigin), s = Gt(i.extent) ? i.extent : r.nodeExtent, a = Mt(o, s, zt(i));
      i.internals.positionAbsolute = a;
    }
}
function _u(t, e) {
  if (!t.handles)
    return t.measured ? e?.internals.handleBounds : void 0;
  const n = [], r = [];
  for (const i of t.handles) {
    const o = {
      id: i.id,
      width: i.width ?? 1,
      height: i.height ?? 1,
      nodeId: t.id,
      x: i.x,
      y: i.y,
      position: i.position,
      type: i.type
    };
    i.type === "source" ? n.push(o) : i.type === "target" && r.push(o);
  }
  return {
    source: n,
    target: r
  };
}
function Sn(t) {
  return t === "manual";
}
function xu(t, e, n, r = {}) {
  const i = $n(yu, r), o = { i: 0 }, s = new Map(e), a = i?.elevateNodesOnSelect && !Sn(i.zIndexMode) ? Yr : 0;
  let c = t.length > 0;
  e.clear(), n.clear();
  for (const u of t) {
    let l = s.get(u.id);
    if (i.checkEquality && u === l?.internals.userNode)
      e.set(u.id, l);
    else {
      const f = Ie(u, i.nodeOrigin), d = Gt(u.extent) ? u.extent : i.nodeExtent, m = Mt(f, d, zt(u));
      l = {
        ...i.defaults,
        ...u,
        measured: {
          width: u.measured?.width,
          height: u.measured?.height
        },
        internals: {
          positionAbsolute: m,
          // if user re-initializes the node or removes `measured` for whatever reason, we reset the handleBounds so that the node gets re-measured
          handleBounds: _u(u, l),
          z: qr(u, a, i.zIndexMode),
          userNode: u
        }
      }, e.set(u.id, l);
    }
    (l.measured === void 0 || l.measured.width === void 0 || l.measured.height === void 0) && !l.hidden && (c = !1), u.parentId && Vr(l, e, n, r, o);
  }
  return c;
}
function vu(t, e) {
  if (!t.parentId)
    return;
  const n = e.get(t.parentId);
  n ? n.set(t.id, t) : e.set(t.parentId, /* @__PURE__ */ new Map([[t.id, t]]));
}
function Vr(t, e, n, r, i) {
  const { elevateNodesOnSelect: o, nodeOrigin: s, nodeExtent: a, zIndexMode: c } = $n(En, r), u = t.parentId, l = e.get(u);
  if (!l) {
    console.warn(`Parent node ${u} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
    return;
  }
  vu(t, n), i && !l.parentId && l.internals.rootParentIndex === void 0 && c === "auto" && (l.internals.rootParentIndex = ++i.i, l.internals.z = l.internals.z + i.i * mu), i && l.internals.rootParentIndex !== void 0 && (i.i = l.internals.rootParentIndex);
  const f = o && !Sn(c) ? Yr : 0, { x: d, y: m, z: b } = bu(t, l, s, a, f, c), { positionAbsolute: $ } = t.internals, P = d !== $.x || m !== $.y;
  (P || b !== t.internals.z) && e.set(t.id, {
    ...t,
    internals: {
      ...t.internals,
      positionAbsolute: P ? { x: d, y: m } : $,
      z: b
    }
  });
}
function qr(t, e, n) {
  const r = hn(t.zIndex) ? t.zIndex : 0;
  return Sn(n) ? r : r + (t.selected ? e : 0);
}
function bu(t, e, n, r, i, o) {
  const { x: s, y: a } = e.internals.positionAbsolute, c = zt(t), u = Ie(t, n), l = Gt(t.extent) ? Mt(u, t.extent, c) : u;
  let f = Mt({ x: s + l.x, y: a + l.y }, r, c);
  t.extent === "parent" && (f = cu(f, c, e));
  const d = qr(t, i, o), m = e.internals.z ?? 0;
  return {
    x: f.x,
    y: f.y,
    z: m >= d ? m + 1 : d
  };
}
function Fr(t, e) {
  if (!t.parentId)
    return !1;
  const n = e.get(t.parentId);
  return n ? n.selected ? !0 : Fr(n, e) : !1;
}
function er(t, e, n) {
  let r = t;
  do {
    if (r?.matches?.(e))
      return !0;
    if (r === n)
      return !1;
    r = r?.parentElement;
  } while (r);
  return !1;
}
function Nu(t, e, n, r) {
  const i = /* @__PURE__ */ new Map();
  for (const [o, s] of t)
    if ((s.selected || s.id === r) && (!s.parentId || !Fr(s, t)) && (s.draggable || e && typeof s.draggable > "u")) {
      const a = t.get(o);
      a && i.set(o, {
        id: o,
        position: a.position || { x: 0, y: 0 },
        distance: {
          x: n.x - a.internals.positionAbsolute.x,
          y: n.y - a.internals.positionAbsolute.y
        },
        extent: a.extent,
        parentId: a.parentId,
        origin: a.origin,
        expandParent: a.expandParent,
        internals: {
          positionAbsolute: a.internals.positionAbsolute || { x: 0, y: 0 }
        },
        measured: {
          width: a.measured.width ?? 0,
          height: a.measured.height ?? 0
        }
      });
    }
  return i;
}
function Ke({ nodeId: t, dragItems: e, nodeLookup: n, dragging: r = !0 }) {
  const i = [];
  for (const [s, a] of e) {
    const c = n.get(s)?.internals.userNode;
    c && i.push({
      ...c,
      position: a.position,
      dragging: r
    });
  }
  if (!t)
    return [i[0], i];
  const o = n.get(t)?.internals.userNode;
  return [
    o ? {
      ...o,
      position: e.get(t)?.position || o.position,
      dragging: r
    } : i[0],
    i
  ];
}
function Eu({ dragItems: t, snapGrid: e, x: n, y: r }) {
  const i = t.values().next().value;
  if (!i)
    return null;
  const o = {
    x: n - i.distance.x,
    y: r - i.distance.y
  }, s = ke(o, e);
  return {
    x: s.x - o.x,
    y: s.y - o.y
  };
}
function $u({ onNodeMouseDown: t, getStoreItems: e, onDragStart: n, onDrag: r, onDragStop: i }) {
  let o = { x: null, y: null }, s = 0, a = /* @__PURE__ */ new Map(), c = !1, u = { x: 0, y: 0 }, l = null, f = !1, d = null, m = !1, b = !1, $ = null;
  function P({ noDragClassName: z, handleSelector: x, domNode: p, isSelectable: w, nodeId: v, nodeClickDistance: I = 0 }) {
    d = tt(p);
    function R({ x: E, y: A }) {
      const { nodeLookup: h, nodeExtent: y, snapGrid: g, snapToGrid: _, nodeOrigin: S, onNodeDrag: C, onSelectionDrag: T, onError: k, updateNodePositions: O } = e();
      o = { x: E, y: A };
      let Y = !1;
      const B = a.size > 1, X = B && y ? fn(Hr(a)) : null, G = B && _ ? Eu({
        dragItems: a,
        snapGrid: g,
        x: E,
        y: A
      }) : null;
      for (const [V, H] of a) {
        if (!h.has(V))
          continue;
        let et = { x: E - H.distance.x, y: A - H.distance.y };
        _ && (et = G ? {
          x: Math.round(et.x + G.x),
          y: Math.round(et.y + G.y)
        } : ke(et, g));
        let Dt = null;
        if (B && y && !H.extent && X) {
          const { positionAbsolute: _t } = H.internals, Re = _t.x - X.x + y[0][0], Kr = _t.x + H.measured.width - X.x2 + y[1][0], Qr = _t.y - X.y + y[0][1], Jr = _t.y + H.measured.height - X.y2 + y[1][1];
          Dt = [
            [Re, Qr],
            [Kr, Jr]
          ];
        }
        const { position: Rt, positionAbsolute: De } = uu({
          nodeId: V,
          nextPosition: et,
          nodeLookup: h,
          nodeExtent: Dt || y,
          nodeOrigin: S,
          onError: k
        });
        Y = Y || H.position.x !== Rt.x || H.position.y !== Rt.y, H.position = Rt, H.internals.positionAbsolute = De;
      }
      if (b = b || Y, !!Y && (O(a, !0), $ && (r || C || !v && T))) {
        const [V, H] = Ke({
          nodeId: v,
          dragItems: a,
          nodeLookup: h
        });
        r?.($, a, V, H), C?.($, V, H), v || T?.($, H);
      }
    }
    async function L() {
      if (!l)
        return;
      const { transform: E, panBy: A, autoPanSpeed: h, autoPanOnNodeDrag: y } = e();
      if (!y) {
        c = !1, cancelAnimationFrame(s);
        return;
      }
      const [g, _] = lu(u, l, h);
      (g !== 0 || _ !== 0) && (o.x = (o.x ?? 0) - g / E[2], o.y = (o.y ?? 0) - _ / E[2], await A({ x: g, y: _ }) && R(o)), s = requestAnimationFrame(L);
    }
    function U(E) {
      const { nodeLookup: A, multiSelectionActive: h, nodesDraggable: y, transform: g, snapGrid: _, snapToGrid: S, selectNodesOnDrag: C, onNodeDragStart: T, onSelectionDragStart: k, unselectNodesAndEdges: O } = e();
      f = !0, (!C || !w) && !h && v && (A.get(v)?.selected || O()), w && C && v && t?.(v);
      const Y = Ge(E.sourceEvent, { transform: g, snapGrid: _, snapToGrid: S, containerBounds: l });
      if (o = Y, a = Nu(A, y, Y, v), a.size > 0 && (n || T || !v && k)) {
        const [B, X] = Ke({
          nodeId: v,
          dragItems: a,
          nodeLookup: A
        });
        n?.(E.sourceEvent, a, B, X), T?.(E.sourceEvent, B, X), v || k?.(E.sourceEvent, X);
      }
    }
    const M = ps().clickDistance(I).on("start", (E) => {
      const { domNode: A, nodeDragThreshold: h, transform: y, snapGrid: g, snapToGrid: _ } = e();
      l = A?.getBoundingClientRect() || null, m = !1, b = !1, $ = E.sourceEvent, h === 0 && U(E), o = Ge(E.sourceEvent, { transform: y, snapGrid: g, snapToGrid: _, containerBounds: l }), u = pe(E.sourceEvent, l);
    }).on("drag", (E) => {
      const { autoPanOnNodeDrag: A, transform: h, snapGrid: y, snapToGrid: g, nodeDragThreshold: _, nodeLookup: S } = e(), C = Ge(E.sourceEvent, { transform: h, snapGrid: y, snapToGrid: g, containerBounds: l });
      if ($ = E.sourceEvent, (E.sourceEvent.type === "touchmove" && E.sourceEvent.touches.length > 1 || // if user deletes a node while dragging, we need to abort the drag to prevent errors
      v && !S.has(v)) && (m = !0), !m) {
        if (!c && A && f && (c = !0, L()), !f) {
          const T = pe(E.sourceEvent, l), k = T.x - u.x, O = T.y - u.y;
          Math.sqrt(k * k + O * O) > _ && U(E);
        }
        (o.x !== C.xSnapped || o.y !== C.ySnapped) && a && f && (u = pe(E.sourceEvent, l), R(C));
      }
    }).on("end", (E) => {
      if (!(!f || m) && (c = !1, f = !1, cancelAnimationFrame(s), a.size > 0)) {
        const { nodeLookup: A, updateNodePositions: h, onNodeDragStop: y, onSelectionDragStop: g } = e();
        if (b && (h(a, !1), b = !1), i || y || !v && g) {
          const [_, S] = Ke({
            nodeId: v,
            dragItems: a,
            nodeLookup: A,
            dragging: !1
          });
          i?.(E.sourceEvent, a, _, S), y?.(E.sourceEvent, _, S), v || g?.(E.sourceEvent, S);
        }
      }
    }).filter((E) => {
      const A = E.target;
      return !E.button && (!z || !er(A, `.${z}`, p)) && (!x || er(A, x, p));
    });
    d.call(M);
  }
  function N() {
    d?.on(".drag", null);
  }
  return {
    update: P,
    destroy: N
  };
}
function Su({ domNode: t, panZoom: e, getTransform: n, getViewScale: r }) {
  const i = tt(t);
  function o({ translateExtent: a, width: c, height: u, zoomStep: l = 1, pannable: f = !0, zoomable: d = !0, inversePan: m = !1 }) {
    const b = (x) => {
      if (x.sourceEvent.type !== "wheel" || !e)
        return;
      const p = n(), w = x.sourceEvent.ctrlKey && Nn() ? 10 : 1, v = -x.sourceEvent.deltaY * (x.sourceEvent.deltaMode === 1 ? 0.05 : x.sourceEvent.deltaMode ? 1 : 2e-3) * l, I = p[2] * Math.pow(2, v * w);
      e.scaleTo(I);
    };
    let $ = [0, 0];
    const P = (x) => {
      (x.sourceEvent.type === "mousedown" || x.sourceEvent.type === "touchstart") && ($ = [
        x.sourceEvent.clientX ?? x.sourceEvent.touches[0].clientX,
        x.sourceEvent.clientY ?? x.sourceEvent.touches[0].clientY
      ]);
    }, N = (x) => {
      const p = n();
      if (x.sourceEvent.type !== "mousemove" && x.sourceEvent.type !== "touchmove" || !e)
        return;
      const w = [
        x.sourceEvent.clientX ?? x.sourceEvent.touches[0].clientX,
        x.sourceEvent.clientY ?? x.sourceEvent.touches[0].clientY
      ], v = [w[0] - $[0], w[1] - $[1]];
      $ = w;
      const I = r() * Math.max(p[2], Math.log(p[2])) * (m ? -1 : 1), R = {
        x: p[0] - v[0] * I,
        y: p[1] - v[1] * I
      }, L = [
        [0, 0],
        [c, u]
      ];
      e.setViewportConstrained({
        x: R.x,
        y: R.y,
        zoom: p[2]
      }, L, a);
    }, z = Rr().on("start", P).on("zoom", f ? N : null).on("zoom.wheel", d ? b : null);
    i.call(z, {});
  }
  function s() {
    i.on("zoom", null);
  }
  return {
    update: o,
    destroy: s,
    pointer: nt
  };
}
const Pe = (t) => ({
  x: t.x,
  y: t.y,
  zoom: t.k
}), Qe = ({ x: t, y: e, zoom: n }) => Ae.translate(t, e).scale(n), vt = (t, e) => t.target.closest(`.${e}`), Zr = (t, e) => e === 2 && Array.isArray(t) && t.includes(2), Cu = (t) => ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2, Je = (t, e = 0, n = Cu, r = () => {
}) => {
  const i = typeof e == "number" && e > 0;
  return i || r(), i ? t.transition().duration(e).ease(n).on("end", r) : t;
}, Ur = (t) => {
  const e = t.ctrlKey && Nn() ? 10 : 1;
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * e;
};
function Tu({ zoomPanValues: t, noWheelClassName: e, d3Selection: n, d3Zoom: r, panOnScrollMode: i, panOnScrollSpeed: o, zoomOnPinch: s, onPanZoomStart: a, onPanZoom: c, onPanZoomEnd: u }) {
  return (l) => {
    if (vt(l, e))
      return l.ctrlKey && l.preventDefault(), !1;
    l.preventDefault(), l.stopImmediatePropagation();
    const f = n.property("__zoom").k || 1;
    if (l.ctrlKey && s) {
      const P = nt(l), N = Ur(l), z = f * Math.pow(2, N);
      r.scaleTo(n, z, P, l);
      return;
    }
    const d = l.deltaMode === 1 ? 20 : 1;
    let m = i === $t.Vertical ? 0 : l.deltaX * d, b = i === $t.Horizontal ? 0 : l.deltaY * d;
    !Nn() && l.shiftKey && i !== $t.Vertical && (m = l.deltaY * d, b = 0), r.translateBy(
      n,
      -(m / f) * o,
      -(b / f) * o,
      // @ts-ignore
      { internal: !0 }
    );
    const $ = Pe(n.property("__zoom"));
    clearTimeout(t.panScrollTimeout), t.isPanScrolling ? (c?.(l, $), t.panScrollTimeout = setTimeout(() => {
      u?.(l, $), t.isPanScrolling = !1;
    }, 150)) : (t.isPanScrolling = !0, a?.(l, $));
  };
}
function Mu({ noWheelClassName: t, preventScrolling: e, d3ZoomHandler: n }) {
  return function(r, i) {
    const o = r.type === "wheel", s = !e && o && !r.ctrlKey, a = vt(r, t);
    if (r.ctrlKey && o && a && r.preventDefault(), s || a)
      return null;
    r.preventDefault(), n.call(this, r, i);
  };
}
function Au({ zoomPanValues: t, onDraggingChange: e, onPanZoomStart: n }) {
  return (r) => {
    if (r.sourceEvent?.internal)
      return;
    const i = Pe(r.transform);
    t.mouseButton = r.sourceEvent?.button || 0, t.isZoomingOrPanning = !0, t.prevViewport = i, r.sourceEvent?.type, n && n?.(r.sourceEvent, i);
  };
}
function Iu({ zoomPanValues: t, panOnDrag: e, onPaneContextMenu: n, onTransformChange: r, onPanZoom: i }) {
  return (o) => {
    t.usedRightMouseButton = !!(n && Zr(e, t.mouseButton ?? 0)), o.sourceEvent?.sync || r([o.transform.x, o.transform.y, o.transform.k]), i && !o.sourceEvent?.internal && i?.(o.sourceEvent, Pe(o.transform));
  };
}
function ku({ zoomPanValues: t, panOnDrag: e, panOnScroll: n, onDraggingChange: r, onPanZoomEnd: i, onPaneContextMenu: o }) {
  return (s) => {
    if (!s.sourceEvent?.internal && (t.isZoomingOrPanning = !1, o && Zr(e, t.mouseButton ?? 0) && !t.usedRightMouseButton && s.sourceEvent && o(s.sourceEvent), t.usedRightMouseButton = !1, i)) {
      const a = Pe(s.transform);
      t.prevViewport = a, clearTimeout(t.timerId), t.timerId = setTimeout(
        () => {
          i?.(s.sourceEvent, a);
        },
        // we need a setTimeout for panOnScroll to supress multiple end events fired during scroll
        n ? 150 : 0
      );
    }
  };
}
function Pu({ zoomActivationKeyPressed: t, zoomOnScroll: e, zoomOnPinch: n, panOnDrag: r, panOnScroll: i, zoomOnDoubleClick: o, userSelectionActive: s, noWheelClassName: a, noPanClassName: c, lib: u, connectionInProgress: l }) {
  return (f) => {
    const d = t || e, m = n && f.ctrlKey, b = f.type === "wheel";
    if (f.button === 1 && f.type === "mousedown" && (vt(f, `${u}-flow__node`) || vt(f, `${u}-flow__edge`)))
      return !0;
    if (!r && !d && !i && !o && !n || s || l && !b || vt(f, a) && b || vt(f, c) && (!b || i && b && !t) || !n && f.ctrlKey && b)
      return !1;
    if (!n && f.type === "touchstart" && f.touches?.length > 1)
      return f.preventDefault(), !1;
    if (!d && !i && !m && b || !r && (f.type === "mousedown" || f.type === "touchstart") || Array.isArray(r) && !r.includes(f.button) && f.type === "mousedown")
      return !1;
    const $ = Array.isArray(r) && r.includes(f.button) || !f.button || f.button <= 1;
    return (!f.ctrlKey || b) && $;
  };
}
function Ou({ domNode: t, minZoom: e, maxZoom: n, translateExtent: r, viewport: i, onPanZoom: o, onPanZoomStart: s, onPanZoomEnd: a, onDraggingChange: c }) {
  const u = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: {},
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, l = t.getBoundingClientRect(), f = Rr().scaleExtent([e, n]).translateExtent(r), d = tt(t).call(f);
  z({
    x: i.x,
    y: i.y,
    zoom: Ut(i.zoom, e, n)
  }, [
    [0, 0],
    [l.width, l.height]
  ], r);
  const m = d.on("wheel.zoom"), b = d.on("dblclick.zoom");
  f.wheelDelta(Ur);
  function $(M, E) {
    return d ? new Promise((A) => {
      f?.interpolate(E?.interpolate === "linear" ? Yt : le).transform(Je(d, E?.duration, E?.ease, () => A(!0)), M);
    }) : Promise.resolve(!1);
  }
  function P({ noWheelClassName: M, noPanClassName: E, onPaneContextMenu: A, userSelectionActive: h, panOnScroll: y, panOnDrag: g, panOnScrollMode: _, panOnScrollSpeed: S, preventScrolling: C, zoomOnPinch: T, zoomOnScroll: k, zoomOnDoubleClick: O, zoomActivationKeyPressed: Y, lib: B, onTransformChange: X, connectionInProgress: G, paneClickDistance: V, selectionOnDrag: H }) {
    h && !u.isZoomingOrPanning && N();
    const et = y && !Y && !h;
    f.clickDistance(H ? 1 / 0 : !hn(V) || V < 0 ? 0 : V);
    const Dt = et ? Tu({
      zoomPanValues: u,
      noWheelClassName: M,
      d3Selection: d,
      d3Zoom: f,
      panOnScrollMode: _,
      panOnScrollSpeed: S,
      zoomOnPinch: T,
      onPanZoomStart: s,
      onPanZoom: o,
      onPanZoomEnd: a
    }) : Mu({
      noWheelClassName: M,
      preventScrolling: C,
      d3ZoomHandler: m
    });
    if (d.on("wheel.zoom", Dt, { passive: !1 }), !h) {
      const De = Au({
        zoomPanValues: u,
        onDraggingChange: c,
        onPanZoomStart: s
      });
      f.on("start", De);
      const _t = Iu({
        zoomPanValues: u,
        panOnDrag: g,
        onPaneContextMenu: !!A,
        onPanZoom: o,
        onTransformChange: X
      });
      f.on("zoom", _t);
      const Re = ku({
        zoomPanValues: u,
        panOnDrag: g,
        panOnScroll: y,
        onPaneContextMenu: A,
        onPanZoomEnd: a,
        onDraggingChange: c
      });
      f.on("end", Re);
    }
    const Rt = Pu({
      zoomActivationKeyPressed: Y,
      panOnDrag: g,
      zoomOnScroll: k,
      panOnScroll: y,
      zoomOnDoubleClick: O,
      zoomOnPinch: T,
      userSelectionActive: h,
      noPanClassName: E,
      noWheelClassName: M,
      lib: B,
      connectionInProgress: G
    });
    f.filter(Rt), O ? d.on("dblclick.zoom", b) : d.on("dblclick.zoom", null);
  }
  function N() {
    f.on("zoom", null);
  }
  async function z(M, E, A) {
    const h = Qe(M), y = f?.constrain()(h, E, A);
    return y && await $(y), new Promise((g) => g(y));
  }
  async function x(M, E) {
    const A = Qe(M);
    return await $(A, E), new Promise((h) => h(A));
  }
  function p(M) {
    if (d) {
      const E = Qe(M), A = d.property("__zoom");
      (A.k !== M.zoom || A.x !== M.x || A.y !== M.y) && f?.transform(d, E, null, { sync: !0 });
    }
  }
  function w() {
    const M = d ? Dr(d.node()) : { x: 0, y: 0, k: 1 };
    return { x: M.x, y: M.y, zoom: M.k };
  }
  function v(M, E) {
    return d ? new Promise((A) => {
      f?.interpolate(E?.interpolate === "linear" ? Yt : le).scaleTo(Je(d, E?.duration, E?.ease, () => A(!0)), M);
    }) : Promise.resolve(!1);
  }
  function I(M, E) {
    return d ? new Promise((A) => {
      f?.interpolate(E?.interpolate === "linear" ? Yt : le).scaleBy(Je(d, E?.duration, E?.ease, () => A(!0)), M);
    }) : Promise.resolve(!1);
  }
  function R(M) {
    f?.scaleExtent(M);
  }
  function L(M) {
    f?.translateExtent(M);
  }
  function U(M) {
    const E = !hn(M) || M < 0 ? 0 : M;
    f?.clickDistance(E);
  }
  return {
    update: P,
    destroy: N,
    setViewport: x,
    setViewportConstrained: z,
    getViewport: w,
    scaleTo: v,
    scaleBy: I,
    setScaleExtent: R,
    setTranslateExtent: L,
    syncViewport: p,
    setClickDistance: U
  };
}
var nr;
(function(t) {
  t.Line = "line", t.Handle = "handle";
})(nr || (nr = {}));
function zu() {
  return {
    nodes: Ve([]),
    edges: Ve([]),
    nodeLookup: /* @__PURE__ */ new Map(),
    parentLookup: /* @__PURE__ */ new Map(),
    nodeExtent: Br,
    snapGrid: [15, 15],
    snapToGrid: !1,
    nodeOrigin: [0, 0],
    multiSelectionActive: !1,
    transform: Ve([0, 0, 1]),
    autoPanOnNodeDrag: !0,
    nodesDraggable: !0,
    selectNodesOnDrag: !0,
    nodeDragThreshold: 0,
    panZoom: null,
    domNode: null
  };
}
var Du = Object.defineProperty, Ru = Object.getOwnPropertyDescriptor, Oe = (t, e, n, r) => {
  for (var i = r > 1 ? void 0 : r ? Ru(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (r ? s(e, n, i) : s(i)) || i);
  return r && i && Du(e, n, i), i;
};
let At = class extends Qt(Pt) {
  constructor() {
    super(...arguments), this.label = "", this.type = "default", this.selected = !1;
  }
  render() {
    return bt`
      <div class="label">${this.label}</div>
      <slot></slot>
      ${this.type === "input" || this.type === "default" ? bt`<lit-handle type="source" position="bottom"></lit-handle>` : ""}
      ${this.type === "output" || this.type === "default" ? bt`<lit-handle type="target" position="top"></lit-handle>` : ""}
    `;
  }
};
At.styles = kt`
    :host {
      display: block;
      background: white;
      border: 1px solid #1a192b;
      padding: 10px;
      border-radius: 3px;
      min-width: 100px;
      text-align: center;
      box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    }

    :host([selected]) {
      border-color: #0041d0;
      border-width: 2px;
      box-shadow: 0 0 0 1px #0041d0;
    }

    :host([type="input"]) {
      border-color: #0041d0;
    }

    :host([type="output"]) {
      border-color: #ff0072;
    }

    :host([selected][type="output"]) {
      border-color: #ff0072;
      box-shadow: 0 0 0 1px #ff0072;
    }

    .label {
      font-size: 12px;
      color: #222;
    }
  `;
Oe([
  W({ type: String })
], At.prototype, "label", 2);
Oe([
  W({ type: String, reflect: !0 })
], At.prototype, "type", 2);
Oe([
  W({ type: Boolean, reflect: !0 })
], At.prototype, "selected", 2);
At = Oe([
  Ot("lit-node")
], At);
var Bu = Object.defineProperty, Hu = Object.getOwnPropertyDescriptor, dt = (t, e, n, r) => {
  for (var i = r > 1 ? void 0 : r ? Hu(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (r ? s(e, n, i) : s(i)) || i);
  return r && i && Bu(e, n, i), i;
};
let at = class extends Qt(Pt) {
  constructor() {
    super(...arguments), this.sourceX = 0, this.sourceY = 0, this.targetX = 0, this.targetY = 0, this.sourcePosition = D.Right, this.targetPosition = D.Left, this.selected = !1;
  }
  render() {
    const [t] = Xr({
      sourceX: this.sourceX,
      sourceY: this.sourceY,
      sourcePosition: this.sourcePosition,
      targetX: this.targetX,
      targetY: this.targetY,
      targetPosition: this.targetPosition
    });
    return dn`
      <path d="${t}" />
    `;
  }
};
at.styles = kt`
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
dt([
  W({ type: Number })
], at.prototype, "sourceX", 2);
dt([
  W({ type: Number })
], at.prototype, "sourceY", 2);
dt([
  W({ type: Number })
], at.prototype, "targetX", 2);
dt([
  W({ type: Number })
], at.prototype, "targetY", 2);
dt([
  W({ type: String })
], at.prototype, "sourcePosition", 2);
dt([
  W({ type: String })
], at.prototype, "targetPosition", 2);
dt([
  W({ type: Boolean, reflect: !0 })
], at.prototype, "selected", 2);
at = dt([
  Ot("lit-edge")
], at);
var Wu = Object.defineProperty, Lu = Object.getOwnPropertyDescriptor, j = (t, e, n, r) => {
  for (var i = r > 1 ? void 0 : r ? Lu(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (r ? s(e, n, i) : s(i)) || i);
  return r && i && Wu(e, n, i), i;
};
let K = class extends Qt(Pt) {
  constructor() {
    super(...arguments), this._drags = /* @__PURE__ */ new Map(), this._state = zu(), this.nodeTypes = {
      default: "lit-node",
      input: "lit-node",
      output: "lit-node"
    }, this.showControls = !1, this.showMinimap = !1, this._width = 0, this._height = 0, this.viewport = { x: 0, y: 0, zoom: 1 };
  }
  set nodes(t) {
    this._state.nodes.set(t), xu(t, this._state.nodeLookup, this._state.parentLookup, {
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
      for (const e of t)
        if (e.target === this)
          this._width = e.contentRect.width, this._height = e.contentRect.height;
        else if (e.target !== this._renderer) {
          const n = e.target.dataset.id;
          n && this._updateNodeDimensions(n, e.target);
        }
    }), this._resizeObserver.observe(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._resizeObserver?.disconnect();
  }
  async _updateNodeDimensions(t, e) {
    const n = this._state.nodeLookup.get(t);
    if (n) {
      "updateComplete" in e && await e.updateComplete;
      const { width: r, height: i } = e.getBoundingClientRect(), o = this._state.transform.get()[2];
      n.measured = {
        width: r / o,
        height: i / o
      };
      const s = this.nodes.find((c) => c.id === t);
      s && (s.measured = n.measured);
      const a = e.shadowRoot?.querySelectorAll("lit-handle");
      if (a && a.length > 0) {
        const c = [], u = [];
        a.forEach((l) => {
          const f = l.getBoundingClientRect(), d = e.getBoundingClientRect(), m = {
            id: l.handleId || null,
            type: l.type,
            position: l.position,
            x: (f.left - d.left) / o,
            y: (f.top - d.top) / o,
            width: f.width / o,
            height: f.height / o
          };
          l.type === "source" ? c.push(m) : u.push(m);
        }), n.internals.handleBounds = {
          source: c,
          target: u
        };
      }
      wu(this._state.nodeLookup, this._state.parentLookup, {
        nodeOrigin: this._state.nodeOrigin,
        nodeExtent: this._state.nodeExtent
      }), this._state.nodes.set([...this.nodes]);
    }
  }
  _selectNode(t, e) {
    const n = this.nodes.map((r) => r.id === t ? { ...r, selected: !r.selected } : e ? r : { ...r, selected: !1 });
    this.nodes = n;
  }
  firstUpdated() {
    this._renderer && (this._state.domNode = this._renderer, this._resizeObserver?.observe(this._renderer), this._renderer.onclick = () => {
      this.nodes = this.nodes.map((t) => ({ ...t, selected: !1 }));
    }, this._panZoom = Ou({
      domNode: this._renderer,
      minZoom: 0.5,
      maxZoom: 2,
      translateExtent: this._state.nodeExtent,
      viewport: this.viewport,
      onDraggingChange: () => {
      },
      onPanZoom: (t, { x: e, y: n, zoom: r }) => {
        this.viewport = { x: e, y: n, zoom: r }, this._state.transform.set([e, n, r]), this._viewport && (this._viewport.style.transform = `translate(${e}px,${n}px) scale(${r})`);
      }
    }), this._panZoom.update({
      noWheelClassName: "nowheel",
      noPanClassName: "nopan",
      preventScrolling: !0,
      panOnScroll: !1,
      panOnDrag: !0,
      panOnScrollMode: $t.Free,
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
    this.shadowRoot?.querySelectorAll(".xyflow__node")?.forEach((e) => {
      const n = e.dataset.id;
      if (n && (this._resizeObserver?.observe(e), e.onclick = (r) => {
        r.stopPropagation(), this._selectNode(n, r.shiftKey || r.metaKey);
      }, !this._drags.has(n))) {
        const r = $u({
          getStoreItems: () => ({
            ...this._state,
            nodes: this._state.nodes.get(),
            edges: this._state.edges.get(),
            transform: this._state.transform.get(),
            panBy: async (i) => {
              const { panZoom: o, nodeExtent: s } = this._state, a = this._state.transform.get();
              return o ? !!await o.setViewportConstrained(
                {
                  x: a[0] + i.x,
                  y: a[1] + i.y,
                  zoom: a[2]
                },
                [[0, 0], [this.offsetWidth, this.offsetHeight]],
                s
              ) : !1;
            },
            updateNodePositions: (i) => {
              i.forEach((o, s) => {
                const a = this._state.nodeLookup.get(s);
                if (a) {
                  a.position = o.position, a.internals.positionAbsolute = o.internals.positionAbsolute;
                  const c = this.nodes.find((u) => u.id === s);
                  c && (c.position = o.position);
                }
              }), this._state.nodes.set([...this.nodes]);
            },
            unselectNodesAndEdges: () => {
            }
          })
        });
        r.update({
          domNode: e,
          nodeId: n
        }), this._drags.set(n, r);
      }
    });
  }
  _renderEdge(t) {
    const e = this._state.nodeLookup.get(t.source), n = this._state.nodeLookup.get(t.target);
    if (!e || !n) return null;
    const r = (e.internals.handleBounds?.source || []).find(
      (c) => c.id === (t.sourceHandle || null)
    ) || e.internals.handleBounds?.source?.[0], i = (n.internals.handleBounds?.target || []).find(
      (c) => c.id === (t.targetHandle || null)
    ) || n.internals.handleBounds?.target?.[0];
    if (!r || !i) return null;
    const o = tr(e, r, r.position, !0), s = tr(n, i, i.position, !0), [a] = Xr({
      sourceX: o.x,
      sourceY: o.y,
      sourcePosition: r.position,
      targetX: s.x,
      targetY: s.y,
      targetPosition: i.position
    });
    return dn`
      <path
        d="${a}"
        fill="none"
        stroke="${t.selected ? "#555" : "#b1b1b7"}"
        stroke-width="2"
      />
    `;
  }
  render() {
    const t = this._state.transform.get();
    return te`
      <div class="xyflow__renderer">
        <div
          class="xyflow__viewport"
          style="transform: translate(${t[0]}px, ${t[1]}px) scale(${t[2]})"
        >
          <svg class="xyflow__edges">
            ${this.edges.map((e) => this._renderEdge(e))}
          </svg>
          <div class="xyflow__nodes">
            ${this.nodes.map((e) => {
      const r = this._state.nodeLookup.get(e.id)?.position || e.position, i = this.nodeTypes[e.type || "default"] || this.nodeTypes.default, o = jr(i);
      return te`
                <${o}
                  class="xyflow__node"
                  data-id="${e.id}"
                  style="transform: translate(${r.x}px, ${r.y}px)"
                  .label="${e.data.label}"
                  .type="${e.type || "default"}"
                  ?selected="${e.selected}"
                >
                </${o}>
              `;
    })}
          </div>
        </div>
      </div>
      ${this.showControls ? te`<lit-controls .panZoom="${this._panZoom}"></lit-controls>` : ""}
      ${this.showMinimap ? te`
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
K.styles = kt`
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
j([
  rr(".xyflow__renderer")
], K.prototype, "_renderer", 2);
j([
  rr(".xyflow__viewport")
], K.prototype, "_viewport", 2);
j([
  Kt()
], K.prototype, "_panZoom", 2);
j([
  Kt()
], K.prototype, "_state", 2);
j([
  W({ type: Object })
], K.prototype, "nodeTypes", 2);
j([
  W({ type: Boolean, attribute: "show-controls", reflect: !0 })
], K.prototype, "showControls", 2);
j([
  W({ type: Boolean, attribute: "show-minimap", reflect: !0 })
], K.prototype, "showMinimap", 2);
j([
  Kt()
], K.prototype, "_width", 2);
j([
  Kt()
], K.prototype, "_height", 2);
j([
  W({ type: Array })
], K.prototype, "nodes", 1);
j([
  W({ type: Array })
], K.prototype, "edges", 1);
j([
  W({ type: Object })
], K.prototype, "viewport", 2);
K = j([
  Ot("lit-flow")
], K);
var Xu = Object.defineProperty, Yu = Object.getOwnPropertyDescriptor, ze = (t, e, n, r) => {
  for (var i = r > 1 ? void 0 : r ? Yu(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (r ? s(e, n, i) : s(i)) || i);
  return r && i && Xu(e, n, i), i;
};
let It = class extends Pt {
  constructor() {
    super(...arguments), this.type = "source", this.position = D.Top;
  }
  render() {
    return bt``;
  }
};
It.styles = kt`
    :host {
      position: absolute;
      width: 8px;
      height: 8px;
      background: #555;
      border: 4px solid transparent;
      background-clip: padding-box;
      border-radius: 50%;
      z-index: 10;
      pointer-events: all;
      cursor: pointer;
    }

    :host::after {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      border: 1px solid white;
      border-radius: 50%;
    }

    :host([type="source"]) {
      background-color: #555;
    }

    :host([type="target"]) {
      background-color: #555;
    }

    :host([position="top"]) {
      top: -8px;
      left: 50%;
      transform: translateX(-50%);
    }

    :host([position="bottom"]) {
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
    }

    :host([position="left"]) {
      left: -8px;
      top: 50%;
      transform: translateY(-50%);
    }

    :host([position="right"]) {
      right: -8px;
      top: 50%;
      transform: translateY(-50%);
    }
  `;
ze([
  W({ type: String, reflect: !0 })
], It.prototype, "type", 2);
ze([
  W({ type: String, reflect: !0 })
], It.prototype, "position", 2);
ze([
  W({ type: String })
], It.prototype, "handleId", 2);
It = ze([
  Ot("lit-handle")
], It);
var Vu = Object.defineProperty, qu = Object.getOwnPropertyDescriptor, Gr = (t, e, n, r) => {
  for (var i = r > 1 ? void 0 : r ? qu(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (r ? s(e, n, i) : s(i)) || i);
  return r && i && Vu(e, n, i), i;
};
let Ne = class extends Qt(Pt) {
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
    return bt`
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
Ne.styles = kt`
    :host {
      display: block;
      position: absolute;
      left: 10px;
      bottom: 10px;
      z-index: 5;
      display: flex;
      flex-direction: column;
      gap: 5px;
      background: white;
      padding: 5px;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      border: 1px solid #ccc;
    }

    button {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: 1px solid #eee;
      border-radius: 3px;
      cursor: pointer;
      padding: 0;
      color: #333;
    }

    button:hover {
      background: #f4f4f4;
    }

    button svg {
      width: 16px;
      height: 16px;
      fill: currentColor;
    }
  `;
Gr([
  W({ type: Object })
], Ne.prototype, "panZoom", 2);
Ne = Gr([
  Ot("lit-controls")
], Ne);
var Fu = Object.defineProperty, Zu = Object.getOwnPropertyDescriptor, pt = (t, e, n, r) => {
  for (var i = r > 1 ? void 0 : r ? Zu(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (r ? s(e, n, i) : s(i)) || i);
  return r && i && Fu(e, n, i), i;
};
let ut = class extends Qt(Pt) {
  constructor() {
    super(...arguments), this.nodeLookup = /* @__PURE__ */ new Map(), this.transform = [0, 0, 1], this.translateExtent = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], this.width = 0, this.height = 0;
  }
  updated(t) {
    if (!this._minimapInstance && this.panZoom) {
      const e = this.shadowRoot?.querySelector("svg");
      e && (this._minimapInstance = Su({
        domNode: e,
        panZoom: this.panZoom,
        getTransform: () => this.transform,
        getViewScale: () => {
          const n = this._getBoundingRect();
          return Math.max(n.width / 200, n.height / 150);
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
    return this.nodeLookup.size > 0 ? hu(Hr(this.nodeLookup), t) : t;
  }
  render() {
    const t = this._getBoundingRect(), e = {
      x: -this.transform[0] / this.transform[2],
      y: -this.transform[1] / this.transform[2],
      width: this.width / this.transform[2],
      height: this.height / this.transform[2]
    }, n = 200, r = 150, i = t.width / n, o = t.height / r, s = Math.max(i, o), a = s * n, c = s * r, u = 5 * s, l = t.x - (a - t.width) / 2 - u, f = t.y - (c - t.height) / 2 - u, d = a + u * 2, m = c + u * 2;
    return bt`
      <svg
        width="${n}"
        height="${r}"
        viewBox="${l} ${f} ${d} ${m}"
      >
        ${Array.from(this.nodeLookup.values()).map((b) => {
      const { x: $, y: P } = b.internals.positionAbsolute, N = b.measured.width || 0, z = b.measured.height || 0;
      return dn`
            <rect
              class="minimap-node"
              x="${$}"
              y="${P}"
              width="${N}"
              height="${z}"
              rx="2"
              ry="2"
            />
          `;
    })}
        <path
          class="minimap-mask"
          d="M${l - u},${f - u}h${d + u * 2}v${m + u * 2}h${-d - u * 2}z
             M${e.x},${e.y}h${e.width}v${e.height}h${-e.width}z"
        />
      </svg>
    `;
  }
};
ut.styles = kt`
    :host {
      display: block;
      position: absolute;
      right: 10px;
      bottom: 10px;
      z-index: 5;
      background: white;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      overflow: hidden;
    }

    svg {
      display: block;
    }

    .minimap-node {
      fill: #eee;
      stroke: #ccc;
      stroke-width: 1;
    }

    .minimap-mask {
      fill: rgba(0, 0, 0, 0.05);
      fill-rule: evenodd;
    }
  `;
pt([
  W({ type: Object })
], ut.prototype, "panZoom", 2);
pt([
  W({ type: Object })
], ut.prototype, "nodeLookup", 2);
pt([
  W({ type: Array })
], ut.prototype, "transform", 2);
pt([
  W({ type: Array })
], ut.prototype, "translateExtent", 2);
pt([
  W({ type: Number })
], ut.prototype, "width", 2);
pt([
  W({ type: Number })
], ut.prototype, "height", 2);
pt([
  Kt()
], ut.prototype, "_minimapInstance", 2);
ut = pt([
  Ot("lit-minimap")
], ut);
