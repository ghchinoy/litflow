import { html as Jt, css as ge, LitElement as me, svg as Xr } from "lit";
import { html as ke, unsafeStatic as qr } from "lit/static-html.js";
import { property as U, customElement as ye, query as Gn, state as Lr } from "lit/decorators.js";
import { directive as Yr } from "lit/directive.js";
import { AsyncDirective as Fr } from "lit/async-directive.js";
import "lit/html.js";
var Vr = Object.defineProperty, Ur = (t, e, n) => e in t ? Vr(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, Me = (t, e, n) => (Ur(t, typeof e != "symbol" ? e + "" : e, n), n), Zr = (t, e, n) => {
  if (!e.has(t))
    throw TypeError("Cannot " + n);
}, Pe = (t, e) => {
  if (Object(e) !== e)
    throw TypeError('Cannot use the "in" operator on this value');
  return t.has(e);
}, Ft = (t, e, n) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, n);
}, _n = (t, e, n) => (Zr(t, e, "access private method"), n);
function Kn(t, e) {
  return Object.is(t, e);
}
let Y = null, Ot = !1, jt = 1;
const se = /* @__PURE__ */ Symbol("SIGNAL");
function _t(t) {
  const e = Y;
  return Y = t, e;
}
function Gr() {
  return Y;
}
function Kr() {
  return Ot;
}
const sn = {
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
function _e(t) {
  if (Ot)
    throw new Error(
      typeof ngDevMode < "u" && ngDevMode ? "Assertion error: signal read during notification phase" : ""
    );
  if (Y === null)
    return;
  Y.consumerOnSignalRead(t);
  const e = Y.nextProducerIndex++;
  if (Nt(Y), e < Y.producerNode.length && Y.producerNode[e] !== t && Ue(Y)) {
    const n = Y.producerNode[e];
    we(n, Y.producerIndexOfThis[e]);
  }
  Y.producerNode[e] !== t && (Y.producerNode[e] = t, Y.producerIndexOfThis[e] = Ue(Y) ? jn(t, Y, e) : 0), Y.producerLastReadVersion[e] = t.version;
}
function Qr() {
  jt++;
}
function Qn(t) {
  if (!(!t.dirty && t.lastCleanEpoch === jt)) {
    if (!t.producerMustRecompute(t) && !ni(t)) {
      t.dirty = !1, t.lastCleanEpoch = jt;
      return;
    }
    t.producerRecomputeValue(t), t.dirty = !1, t.lastCleanEpoch = jt;
  }
}
function Jn(t) {
  if (t.liveConsumerNode === void 0)
    return;
  const e = Ot;
  Ot = !0;
  try {
    for (const n of t.liveConsumerNode)
      n.dirty || jr(n);
  } finally {
    Ot = e;
  }
}
function Jr() {
  return Y?.consumerAllowSignalWrites !== !1;
}
function jr(t) {
  var e;
  t.dirty = !0, Jn(t), (e = t.consumerMarkedDirty) == null || e.call(t.wrapper ?? t);
}
function ti(t) {
  return t && (t.nextProducerIndex = 0), _t(t);
}
function ei(t, e) {
  if (_t(e), !(!t || t.producerNode === void 0 || t.producerIndexOfThis === void 0 || t.producerLastReadVersion === void 0)) {
    if (Ue(t))
      for (let n = t.nextProducerIndex; n < t.producerNode.length; n++)
        we(t.producerNode[n], t.producerIndexOfThis[n]);
    for (; t.producerNode.length > t.nextProducerIndex; )
      t.producerNode.pop(), t.producerLastReadVersion.pop(), t.producerIndexOfThis.pop();
  }
}
function ni(t) {
  Nt(t);
  for (let e = 0; e < t.producerNode.length; e++) {
    const n = t.producerNode[e], r = t.producerLastReadVersion[e];
    if (r !== n.version || (Qn(n), r !== n.version))
      return !0;
  }
  return !1;
}
function jn(t, e, n) {
  var r;
  if (an(t), Nt(t), t.liveConsumerNode.length === 0) {
    (r = t.watched) == null || r.call(t.wrapper);
    for (let i = 0; i < t.producerNode.length; i++)
      t.producerIndexOfThis[i] = jn(t.producerNode[i], t, i);
  }
  return t.liveConsumerIndexOfThis.push(n), t.liveConsumerNode.push(e) - 1;
}
function we(t, e) {
  var n;
  if (an(t), Nt(t), typeof ngDevMode < "u" && ngDevMode && e >= t.liveConsumerNode.length)
    throw new Error(
      `Assertion error: active consumer index ${e} is out of bounds of ${t.liveConsumerNode.length} consumers)`
    );
  if (t.liveConsumerNode.length === 1) {
    (n = t.unwatched) == null || n.call(t.wrapper);
    for (let i = 0; i < t.producerNode.length; i++)
      we(t.producerNode[i], t.producerIndexOfThis[i]);
  }
  const r = t.liveConsumerNode.length - 1;
  if (t.liveConsumerNode[e] = t.liveConsumerNode[r], t.liveConsumerIndexOfThis[e] = t.liveConsumerIndexOfThis[r], t.liveConsumerNode.length--, t.liveConsumerIndexOfThis.length--, e < t.liveConsumerNode.length) {
    const i = t.liveConsumerIndexOfThis[e], o = t.liveConsumerNode[e];
    Nt(o), o.producerIndexOfThis[i] = e;
  }
}
function Ue(t) {
  var e;
  return t.consumerIsAlwaysLive || (((e = t?.liveConsumerNode) == null ? void 0 : e.length) ?? 0) > 0;
}
function Nt(t) {
  t.producerNode ?? (t.producerNode = []), t.producerIndexOfThis ?? (t.producerIndexOfThis = []), t.producerLastReadVersion ?? (t.producerLastReadVersion = []);
}
function an(t) {
  t.liveConsumerNode ?? (t.liveConsumerNode = []), t.liveConsumerIndexOfThis ?? (t.liveConsumerIndexOfThis = []);
}
function tr(t) {
  if (Qn(t), _e(t), t.value === Ze)
    throw t.error;
  return t.value;
}
function ri(t) {
  const e = Object.create(ii);
  e.computation = t;
  const n = () => tr(e);
  return n[se] = e, n;
}
const Oe = /* @__PURE__ */ Symbol("UNSET"), De = /* @__PURE__ */ Symbol("COMPUTING"), Ze = /* @__PURE__ */ Symbol("ERRORED"), ii = {
  ...sn,
  value: Oe,
  dirty: !0,
  error: null,
  equal: Kn,
  producerMustRecompute(t) {
    return t.value === Oe || t.value === De;
  },
  producerRecomputeValue(t) {
    if (t.value === De)
      throw new Error("Detected cycle in computations.");
    const e = t.value;
    t.value = De;
    const n = ti(t);
    let r, i = !1;
    try {
      r = t.computation.call(t.wrapper), i = e !== Oe && e !== Ze && t.equal.call(t.wrapper, e, r);
    } catch (o) {
      r = Ze, t.error = o;
    } finally {
      ei(t, n);
    }
    if (i) {
      t.value = e;
      return;
    }
    t.value = r, t.version++;
  }
};
function oi() {
  throw new Error();
}
let si = oi;
function ai() {
  si();
}
function ui(t) {
  const e = Object.create(fi);
  e.value = t;
  const n = () => (_e(e), e.value);
  return n[se] = e, n;
}
function ci() {
  return _e(this), this.value;
}
function li(t, e) {
  Jr() || ai(), t.equal.call(t.wrapper, t.value, e) || (t.value = e, hi(t));
}
const fi = {
  ...sn,
  equal: Kn,
  value: void 0
};
function hi(t) {
  t.version++, Qr(), Jn(t);
}
const V = /* @__PURE__ */ Symbol("node");
var F;
((t) => {
  var e, n, r, i;
  class o {
    constructor(c, u = {}) {
      Ft(this, n), Me(this, e);
      const f = ui(c)[se];
      if (this[V] = f, f.wrapper = this, u) {
        const d = u.equals;
        d && (f.equal = d), f.watched = u[t.subtle.watched], f.unwatched = u[t.subtle.unwatched];
      }
    }
    get() {
      if (!(0, t.isState)(this))
        throw new TypeError("Wrong receiver type for Signal.State.prototype.get");
      return ci.call(this[V]);
    }
    set(c) {
      if (!(0, t.isState)(this))
        throw new TypeError("Wrong receiver type for Signal.State.prototype.set");
      if (Kr())
        throw new Error("Writes to signals not permitted during Watcher callback");
      const u = this[V];
      li(u, c);
    }
  }
  e = V, n = /* @__PURE__ */ new WeakSet(), t.isState = (a) => typeof a == "object" && Pe(n, a), t.State = o;
  class s {
    // Create a Signal which evaluates to the value returned by the callback.
    // Callback is called with this signal as the parameter.
    constructor(c, u) {
      Ft(this, i), Me(this, r);
      const f = ri(c)[se];
      if (f.consumerAllowSignalWrites = !0, this[V] = f, f.wrapper = this, u) {
        const d = u.equals;
        d && (f.equal = d), f.watched = u[t.subtle.watched], f.unwatched = u[t.subtle.unwatched];
      }
    }
    get() {
      if (!(0, t.isComputed)(this))
        throw new TypeError("Wrong receiver type for Signal.Computed.prototype.get");
      return tr(this[V]);
    }
  }
  r = V, i = /* @__PURE__ */ new WeakSet(), t.isComputed = (a) => typeof a == "object" && Pe(i, a), t.Computed = s, ((a) => {
    var c, u, l, f;
    function d(T) {
      let g, _ = null;
      try {
        _ = _t(null), g = T();
      } finally {
        _t(_);
      }
      return g;
    }
    a.untrack = d;
    function m(T) {
      var g;
      if (!(0, t.isComputed)(T) && !(0, t.isWatcher)(T))
        throw new TypeError("Called introspectSources without a Computed or Watcher argument");
      return ((g = T[V].producerNode) == null ? void 0 : g.map((_) => _.wrapper)) ?? [];
    }
    a.introspectSources = m;
    function b(T) {
      var g;
      if (!(0, t.isComputed)(T) && !(0, t.isState)(T))
        throw new TypeError("Called introspectSinks without a Signal argument");
      return ((g = T[V].liveConsumerNode) == null ? void 0 : g.map((_) => _.wrapper)) ?? [];
    }
    a.introspectSinks = b;
    function C(T) {
      if (!(0, t.isComputed)(T) && !(0, t.isState)(T))
        throw new TypeError("Called hasSinks without a Signal argument");
      const g = T[V].liveConsumerNode;
      return g ? g.length > 0 : !1;
    }
    a.hasSinks = C;
    function O(T) {
      if (!(0, t.isComputed)(T) && !(0, t.isWatcher)(T))
        throw new TypeError("Called hasSources without a Computed or Watcher argument");
      const g = T[V].producerNode;
      return g ? g.length > 0 : !1;
    }
    a.hasSources = O;
    class N {
      // When a (recursive) source of Watcher is written to, call this callback,
      // if it hasn't already been called since the last `watch` call.
      // No signals may be read or written during the notify.
      constructor(g) {
        Ft(this, u), Ft(this, l), Me(this, c);
        let _ = Object.create(sn);
        _.wrapper = this, _.consumerMarkedDirty = g, _.consumerIsAlwaysLive = !0, _.consumerAllowSignalWrites = !1, _.producerNode = [], this[V] = _;
      }
      // Add these signals to the Watcher's set, and set the watcher to run its
      // notify callback next time any signal in the set (or one of its dependencies) changes.
      // Can be called with no arguments just to reset the "notified" state, so that
      // the notify callback will be invoked again.
      watch(...g) {
        if (!(0, t.isWatcher)(this))
          throw new TypeError("Called unwatch without Watcher receiver");
        _n(this, l, f).call(this, g);
        const _ = this[V];
        _.dirty = !1;
        const v = _t(_);
        for (const M of g)
          _e(M[V]);
        _t(v);
      }
      // Remove these signals from the watched set (e.g., for an effect which is disposed)
      unwatch(...g) {
        if (!(0, t.isWatcher)(this))
          throw new TypeError("Called unwatch without Watcher receiver");
        _n(this, l, f).call(this, g);
        const _ = this[V];
        Nt(_);
        for (let v = _.producerNode.length - 1; v >= 0; v--)
          if (g.includes(_.producerNode[v].wrapper)) {
            we(_.producerNode[v], _.producerIndexOfThis[v]);
            const M = _.producerNode.length - 1;
            if (_.producerNode[v] = _.producerNode[M], _.producerIndexOfThis[v] = _.producerIndexOfThis[M], _.producerNode.length--, _.producerIndexOfThis.length--, _.nextProducerIndex--, v < _.producerNode.length) {
              const W = _.producerIndexOfThis[v], q = _.producerNode[v];
              an(q), q.liveConsumerIndexOfThis[W] = v;
            }
          }
      }
      // Returns the set of computeds in the Watcher's set which are still yet
      // to be re-evaluated
      getPending() {
        if (!(0, t.isWatcher)(this))
          throw new TypeError("Called getPending without Watcher receiver");
        return this[V].producerNode.filter((_) => _.dirty).map((_) => _.wrapper);
      }
    }
    c = V, u = /* @__PURE__ */ new WeakSet(), l = /* @__PURE__ */ new WeakSet(), f = function(T) {
      for (const g of T)
        if (!(0, t.isComputed)(g) && !(0, t.isState)(g))
          throw new TypeError("Called watch/unwatch without a Computed or State argument");
    }, t.isWatcher = (T) => Pe(u, T), a.Watcher = N;
    function z() {
      var T;
      return (T = Gr()) == null ? void 0 : T.wrapper;
    }
    a.currentComputed = z, a.watched = /* @__PURE__ */ Symbol("watched"), a.unwatched = /* @__PURE__ */ Symbol("unwatched");
  })(t.subtle || (t.subtle = {}));
})(F || (F = {}));
let ze = !1;
const wn = new F.subtle.Watcher(() => {
  ze || (ze = !0, queueMicrotask(() => {
    ze = !1;
    for (const t of wn.getPending()) t.get();
    wn.watch();
  }));
}), di = /* @__PURE__ */ Symbol("SignalWatcherBrand"), pi = new FinalizationRegistry((t) => {
  t.unwatch(...F.subtle.introspectSources(t));
}), vn = /* @__PURE__ */ new WeakMap();
function un(t) {
  return t[di] === !0 ? (console.warn("SignalWatcher should not be applied to the same class more than once."), t) : class extends t {
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
        const n = vn.get(this);
        n !== void 0 && (n._$Si === !1 && (new Set(this.getPending()).has(n._$Su) ? n.requestUpdate() : n._$Sv()), this.watch());
      });
      vn.set(e, this), pi.register(this, e), e.watch(this._$Su), e.watch(...Array.from(this._$St).map(([n]) => n));
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
let Re = !1;
const Ge = new F.subtle.Watcher(async () => {
  Re || (Re = !0, queueMicrotask(() => {
    Re = !1;
    for (const t of Ge.getPending()) t.get();
    Ge.watch();
  }));
});
let gi = class extends Fr {
  _$S_() {
    var e, n;
    this._$Sm === void 0 && (this._$Sj = new F.Computed(() => {
      var r;
      const i = (r = this._$SW) === null || r === void 0 ? void 0 : r.get();
      return this.setValue(i), i;
    }), this._$Sm = (n = (e = this._$Sk) === null || e === void 0 ? void 0 : e.h) !== null && n !== void 0 ? n : Ge, this._$Sm.watch(this._$Sj), F.subtle.untrack(() => {
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
Yr(gi);
F.State;
F.Computed;
const Be = (t, e) => new F.State(t, e);
var mi = { value: () => {
} };
function ve() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new te(n);
}
function te(t) {
  this._ = t;
}
function yi(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
te.prototype = ve.prototype = {
  constructor: te,
  on: function(t, e) {
    var n = this._, r = yi(t + "", n), i, o = -1, s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; ) if ((i = (t = r[o]).type) && (i = _i(n[i], t.name))) return i;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++o < s; )
      if (i = (t = r[o]).type) n[i] = xn(n[i], t.name, e);
      else if (e == null) for (i in n) n[i] = xn(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new te(t);
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
function _i(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function xn(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = mi, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var Ke = "http://www.w3.org/1999/xhtml";
const bn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Ke,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function xe(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), bn.hasOwnProperty(e) ? { space: bn[e], local: t } : t;
}
function wi(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === Ke && e.documentElement.namespaceURI === Ke ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function vi(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function er(t) {
  var e = xe(t);
  return (e.local ? vi : wi)(e);
}
function xi() {
}
function cn(t) {
  return t == null ? xi : function() {
    return this.querySelector(t);
  };
}
function bi(t) {
  typeof t != "function" && (t = cn(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], s = o.length, a = r[i] = new Array(s), c, u, l = 0; l < s; ++l)
      (c = o[l]) && (u = t.call(c, c.__data__, l, o)) && ("__data__" in c && (u.__data__ = c.__data__), a[l] = u);
  return new Q(r, this._parents);
}
function Ni(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Si() {
  return [];
}
function nr(t) {
  return t == null ? Si : function() {
    return this.querySelectorAll(t);
  };
}
function Ei(t) {
  return function() {
    return Ni(t.apply(this, arguments));
  };
}
function $i(t) {
  typeof t == "function" ? t = Ei(t) : t = nr(t);
  for (var e = this._groups, n = e.length, r = [], i = [], o = 0; o < n; ++o)
    for (var s = e[o], a = s.length, c, u = 0; u < a; ++u)
      (c = s[u]) && (r.push(t.call(c, c.__data__, u, s)), i.push(c));
  return new Q(r, i);
}
function rr(t) {
  return function() {
    return this.matches(t);
  };
}
function ir(t) {
  return function(e) {
    return e.matches(t);
  };
}
var Ci = Array.prototype.find;
function Ti(t) {
  return function() {
    return Ci.call(this.children, t);
  };
}
function Ai() {
  return this.firstElementChild;
}
function Ii(t) {
  return this.select(t == null ? Ai : Ti(typeof t == "function" ? t : ir(t)));
}
var ki = Array.prototype.filter;
function Mi() {
  return Array.from(this.children);
}
function Pi(t) {
  return function() {
    return ki.call(this.children, t);
  };
}
function Oi(t) {
  return this.selectAll(t == null ? Mi : Pi(typeof t == "function" ? t : ir(t)));
}
function Di(t) {
  typeof t != "function" && (t = rr(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], s = o.length, a = r[i] = [], c, u = 0; u < s; ++u)
      (c = o[u]) && t.call(c, c.__data__, u, o) && a.push(c);
  return new Q(r, this._parents);
}
function or(t) {
  return new Array(t.length);
}
function zi() {
  return new Q(this._enter || this._groups.map(or), this._parents);
}
function ae(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
ae.prototype = {
  constructor: ae,
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
function Ri(t) {
  return function() {
    return t;
  };
}
function Bi(t, e, n, r, i, o) {
  for (var s = 0, a, c = e.length, u = o.length; s < u; ++s)
    (a = e[s]) ? (a.__data__ = o[s], r[s] = a) : n[s] = new ae(t, o[s]);
  for (; s < c; ++s)
    (a = e[s]) && (i[s] = a);
}
function Wi(t, e, n, r, i, o, s) {
  var a, c, u = /* @__PURE__ */ new Map(), l = e.length, f = o.length, d = new Array(l), m;
  for (a = 0; a < l; ++a)
    (c = e[a]) && (d[a] = m = s.call(c, c.__data__, a, e) + "", u.has(m) ? i[a] = c : u.set(m, c));
  for (a = 0; a < f; ++a)
    m = s.call(t, o[a], a, o) + "", (c = u.get(m)) ? (r[a] = c, c.__data__ = o[a], u.delete(m)) : n[a] = new ae(t, o[a]);
  for (a = 0; a < l; ++a)
    (c = e[a]) && u.get(d[a]) === c && (i[a] = c);
}
function Hi(t) {
  return t.__data__;
}
function Xi(t, e) {
  if (!arguments.length) return Array.from(this, Hi);
  var n = e ? Wi : Bi, r = this._parents, i = this._groups;
  typeof t != "function" && (t = Ri(t));
  for (var o = i.length, s = new Array(o), a = new Array(o), c = new Array(o), u = 0; u < o; ++u) {
    var l = r[u], f = i[u], d = f.length, m = qi(t.call(l, l && l.__data__, u, r)), b = m.length, C = a[u] = new Array(b), O = s[u] = new Array(b), N = c[u] = new Array(d);
    n(l, f, C, O, N, m, e);
    for (var z = 0, T = 0, g, _; z < b; ++z)
      if (g = C[z]) {
        for (z >= T && (T = z + 1); !(_ = O[T]) && ++T < b; ) ;
        g._next = _ || null;
      }
  }
  return s = new Q(s, r), s._enter = a, s._exit = c, s;
}
function qi(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Li() {
  return new Q(this._exit || this._groups.map(or), this._parents);
}
function Yi(t, e, n) {
  var r = this.enter(), i = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? o.remove() : n(o), r && i ? r.merge(i).order() : i;
}
function Fi(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, o = r.length, s = Math.min(i, o), a = new Array(i), c = 0; c < s; ++c)
    for (var u = n[c], l = r[c], f = u.length, d = a[c] = new Array(f), m, b = 0; b < f; ++b)
      (m = u[b] || l[b]) && (d[b] = m);
  for (; c < i; ++c)
    a[c] = n[c];
  return new Q(a, this._parents);
}
function Vi() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) && (o && s.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(s, o), o = s);
  return this;
}
function Ui(t) {
  t || (t = Zi);
  function e(f, d) {
    return f && d ? t(f.__data__, d.__data__) : !f - !d;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), o = 0; o < r; ++o) {
    for (var s = n[o], a = s.length, c = i[o] = new Array(a), u, l = 0; l < a; ++l)
      (u = s[l]) && (c[l] = u);
    c.sort(e);
  }
  return new Q(i, this._parents).order();
}
function Zi(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Gi() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Ki() {
  return Array.from(this);
}
function Qi() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s) return s;
    }
  return null;
}
function Ji() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function ji() {
  return !this.node();
}
function to(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], o = 0, s = i.length, a; o < s; ++o)
      (a = i[o]) && t.call(a, a.__data__, o, i);
  return this;
}
function eo(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function no(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function ro(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function io(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function oo(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function so(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function ao(t, e) {
  var n = xe(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? no : eo : typeof e == "function" ? n.local ? so : oo : n.local ? io : ro)(n, e));
}
function sr(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function uo(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function co(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function lo(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function fo(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? uo : typeof e == "function" ? lo : co)(t, e, n ?? "")) : St(this.node(), t);
}
function St(t, e) {
  return t.style.getPropertyValue(e) || sr(t).getComputedStyle(t, null).getPropertyValue(e);
}
function ho(t) {
  return function() {
    delete this[t];
  };
}
function po(t, e) {
  return function() {
    this[t] = e;
  };
}
function go(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function mo(t, e) {
  return arguments.length > 1 ? this.each((e == null ? ho : typeof e == "function" ? go : po)(t, e)) : this.node()[t];
}
function ar(t) {
  return t.trim().split(/^|\s+/);
}
function ln(t) {
  return t.classList || new ur(t);
}
function ur(t) {
  this._node = t, this._names = ar(t.getAttribute("class") || "");
}
ur.prototype = {
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
function cr(t, e) {
  for (var n = ln(t), r = -1, i = e.length; ++r < i; ) n.add(e[r]);
}
function lr(t, e) {
  for (var n = ln(t), r = -1, i = e.length; ++r < i; ) n.remove(e[r]);
}
function yo(t) {
  return function() {
    cr(this, t);
  };
}
function _o(t) {
  return function() {
    lr(this, t);
  };
}
function wo(t, e) {
  return function() {
    (e.apply(this, arguments) ? cr : lr)(this, t);
  };
}
function vo(t, e) {
  var n = ar(t + "");
  if (arguments.length < 2) {
    for (var r = ln(this.node()), i = -1, o = n.length; ++i < o; ) if (!r.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? wo : e ? yo : _o)(n, e));
}
function xo() {
  this.textContent = "";
}
function bo(t) {
  return function() {
    this.textContent = t;
  };
}
function No(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function So(t) {
  return arguments.length ? this.each(t == null ? xo : (typeof t == "function" ? No : bo)(t)) : this.node().textContent;
}
function Eo() {
  this.innerHTML = "";
}
function $o(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Co(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function To(t) {
  return arguments.length ? this.each(t == null ? Eo : (typeof t == "function" ? Co : $o)(t)) : this.node().innerHTML;
}
function Ao() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Io() {
  return this.each(Ao);
}
function ko() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Mo() {
  return this.each(ko);
}
function Po(t) {
  var e = typeof t == "function" ? t : er(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Oo() {
  return null;
}
function Do(t, e) {
  var n = typeof t == "function" ? t : er(t), r = e == null ? Oo : typeof e == "function" ? e : cn(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function zo() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Ro() {
  return this.each(zo);
}
function Bo() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Wo() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Ho(t) {
  return this.select(t ? Wo : Bo);
}
function Xo(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function qo(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function Lo(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function Yo(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, o; n < i; ++n)
        o = e[n], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : e[++r] = o;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function Fo(t, e, n) {
  return function() {
    var r = this.__on, i, o = qo(e);
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
function Vo(t, e, n) {
  var r = Lo(t + ""), i, o = r.length, s;
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
  for (a = e ? Fo : Yo, i = 0; i < o; ++i) this.each(a(r[i], e, n));
  return this;
}
function fr(t, e, n) {
  var r = sr(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function Uo(t, e) {
  return function() {
    return fr(this, t, e);
  };
}
function Zo(t, e) {
  return function() {
    return fr(this, t, e.apply(this, arguments));
  };
}
function Go(t, e) {
  return this.each((typeof e == "function" ? Zo : Uo)(t, e));
}
function* Ko() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var hr = [null];
function Q(t, e) {
  this._groups = t, this._parents = e;
}
function qt() {
  return new Q([[document.documentElement]], hr);
}
function Qo() {
  return this;
}
Q.prototype = qt.prototype = {
  constructor: Q,
  select: bi,
  selectAll: $i,
  selectChild: Ii,
  selectChildren: Oi,
  filter: Di,
  data: Xi,
  enter: zi,
  exit: Li,
  join: Yi,
  merge: Fi,
  selection: Qo,
  order: Vi,
  sort: Ui,
  call: Gi,
  nodes: Ki,
  node: Qi,
  size: Ji,
  empty: ji,
  each: to,
  attr: ao,
  style: fo,
  property: mo,
  classed: vo,
  text: So,
  html: To,
  raise: Io,
  lower: Mo,
  append: Po,
  insert: Do,
  remove: Ro,
  clone: Ho,
  datum: Xo,
  on: Vo,
  dispatch: Go,
  [Symbol.iterator]: Ko
};
function j(t) {
  return typeof t == "string" ? new Q([[document.querySelector(t)]], [document.documentElement]) : new Q([[t]], hr);
}
function Jo(t) {
  let e;
  for (; e = t.sourceEvent; ) t = e;
  return t;
}
function nt(t, e) {
  if (t = Jo(t), e === void 0 && (e = t.currentTarget), e) {
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
const jo = { passive: !1 }, zt = { capture: !0, passive: !1 };
function We(t) {
  t.stopImmediatePropagation();
}
function vt(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function dr(t) {
  var e = t.document.documentElement, n = j(t).on("dragstart.drag", vt, zt);
  "onselectstart" in e ? n.on("selectstart.drag", vt, zt) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function pr(t, e) {
  var n = t.document.documentElement, r = j(t).on("dragstart.drag", null);
  e && (r.on("click.drag", vt, zt), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const Vt = (t) => () => t;
function Qe(t, {
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
Qe.prototype.on = function() {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function ts(t) {
  return !t.ctrlKey && !t.button;
}
function es() {
  return this.parentNode;
}
function ns(t, e) {
  return e ?? { x: t.x, y: t.y };
}
function rs() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function is() {
  var t = ts, e = es, n = ns, r = rs, i = {}, o = ve("start", "drag", "end"), s = 0, a, c, u, l, f = 0;
  function d(g) {
    g.on("mousedown.drag", m).filter(r).on("touchstart.drag", O).on("touchmove.drag", N, jo).on("touchend.drag touchcancel.drag", z).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function m(g, _) {
    if (!(l || !t.call(this, g, _))) {
      var v = T(this, e.call(this, g, _), g, _, "mouse");
      v && (j(g.view).on("mousemove.drag", b, zt).on("mouseup.drag", C, zt), dr(g.view), We(g), u = !1, a = g.clientX, c = g.clientY, v("start", g));
    }
  }
  function b(g) {
    if (vt(g), !u) {
      var _ = g.clientX - a, v = g.clientY - c;
      u = _ * _ + v * v > f;
    }
    i.mouse("drag", g);
  }
  function C(g) {
    j(g.view).on("mousemove.drag mouseup.drag", null), pr(g.view, u), vt(g), i.mouse("end", g);
  }
  function O(g, _) {
    if (t.call(this, g, _)) {
      var v = g.changedTouches, M = e.call(this, g, _), W = v.length, q, Z;
      for (q = 0; q < W; ++q)
        (Z = T(this, M, g, _, v[q].identifier, v[q])) && (We(g), Z("start", g, v[q]));
    }
  }
  function N(g) {
    var _ = g.changedTouches, v = _.length, M, W;
    for (M = 0; M < v; ++M)
      (W = i[_[M].identifier]) && (vt(g), W("drag", g, _[M]));
  }
  function z(g) {
    var _ = g.changedTouches, v = _.length, M, W;
    for (l && clearTimeout(l), l = setTimeout(function() {
      l = null;
    }, 500), M = 0; M < v; ++M)
      (W = i[_[M].identifier]) && (We(g), W("end", g, _[M]));
  }
  function T(g, _, v, M, W, q) {
    var Z = o.copy(), A = nt(q || v, _), x, I, h;
    if ((h = n.call(g, new Qe("beforestart", {
      sourceEvent: v,
      target: d,
      identifier: W,
      active: s,
      x: A[0],
      y: A[1],
      dx: 0,
      dy: 0,
      dispatch: Z
    }), M)) != null)
      return x = h.x - A[0] || 0, I = h.y - A[1] || 0, function y(p, w, S) {
        var E = A, $;
        switch (p) {
          case "start":
            i[W] = y, $ = s++;
            break;
          case "end":
            delete i[W], --s;
          // falls through
          case "drag":
            A = nt(S || w, _), $ = s;
            break;
        }
        Z.call(
          p,
          g,
          new Qe(p, {
            sourceEvent: w,
            subject: h,
            target: d,
            identifier: W,
            active: $,
            x: A[0] + x,
            y: A[1] + I,
            dx: A[0] - E[0],
            dy: A[1] - E[1],
            dispatch: Z
          }),
          M
        );
      };
  }
  return d.filter = function(g) {
    return arguments.length ? (t = typeof g == "function" ? g : Vt(!!g), d) : t;
  }, d.container = function(g) {
    return arguments.length ? (e = typeof g == "function" ? g : Vt(g), d) : e;
  }, d.subject = function(g) {
    return arguments.length ? (n = typeof g == "function" ? g : Vt(g), d) : n;
  }, d.touchable = function(g) {
    return arguments.length ? (r = typeof g == "function" ? g : Vt(!!g), d) : r;
  }, d.on = function() {
    var g = o.on.apply(o, arguments);
    return g === o ? d : g;
  }, d.clickDistance = function(g) {
    return arguments.length ? (f = (g = +g) * g, d) : Math.sqrt(f);
  }, d;
}
function fn(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function gr(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e) n[r] = e[r];
  return n;
}
function Lt() {
}
var Rt = 0.7, ue = 1 / Rt, xt = "\\s*([+-]?\\d+)\\s*", Bt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", it = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", os = /^#([0-9a-f]{3,8})$/, ss = new RegExp(`^rgb\\(${xt},${xt},${xt}\\)$`), as = new RegExp(`^rgb\\(${it},${it},${it}\\)$`), us = new RegExp(`^rgba\\(${xt},${xt},${xt},${Bt}\\)$`), cs = new RegExp(`^rgba\\(${it},${it},${it},${Bt}\\)$`), ls = new RegExp(`^hsl\\(${Bt},${it},${it}\\)$`), fs = new RegExp(`^hsla\\(${Bt},${it},${it},${Bt}\\)$`), Nn = {
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
fn(Lt, gt, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Sn,
  // Deprecated! Use color.formatHex.
  formatHex: Sn,
  formatHex8: hs,
  formatHsl: ds,
  formatRgb: En,
  toString: En
});
function Sn() {
  return this.rgb().formatHex();
}
function hs() {
  return this.rgb().formatHex8();
}
function ds() {
  return mr(this).formatHsl();
}
function En() {
  return this.rgb().formatRgb();
}
function gt(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = os.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? $n(e) : n === 3 ? new K(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? Ut(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? Ut(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = ss.exec(t)) ? new K(e[1], e[2], e[3], 1) : (e = as.exec(t)) ? new K(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = us.exec(t)) ? Ut(e[1], e[2], e[3], e[4]) : (e = cs.exec(t)) ? Ut(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = ls.exec(t)) ? An(e[1], e[2] / 100, e[3] / 100, 1) : (e = fs.exec(t)) ? An(e[1], e[2] / 100, e[3] / 100, e[4]) : Nn.hasOwnProperty(t) ? $n(Nn[t]) : t === "transparent" ? new K(NaN, NaN, NaN, 0) : null;
}
function $n(t) {
  return new K(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Ut(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new K(t, e, n, r);
}
function ps(t) {
  return t instanceof Lt || (t = gt(t)), t ? (t = t.rgb(), new K(t.r, t.g, t.b, t.opacity)) : new K();
}
function Je(t, e, n, r) {
  return arguments.length === 1 ? ps(t) : new K(t, e, n, r ?? 1);
}
function K(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
fn(K, Je, gr(Lt, {
  brighter(t) {
    return t = t == null ? ue : Math.pow(ue, t), new K(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Rt : Math.pow(Rt, t), new K(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new K(pt(this.r), pt(this.g), pt(this.b), ce(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Cn,
  // Deprecated! Use color.formatHex.
  formatHex: Cn,
  formatHex8: gs,
  formatRgb: Tn,
  toString: Tn
}));
function Cn() {
  return `#${dt(this.r)}${dt(this.g)}${dt(this.b)}`;
}
function gs() {
  return `#${dt(this.r)}${dt(this.g)}${dt(this.b)}${dt((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Tn() {
  const t = ce(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${pt(this.r)}, ${pt(this.g)}, ${pt(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function ce(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function pt(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function dt(t) {
  return t = pt(t), (t < 16 ? "0" : "") + t.toString(16);
}
function An(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new tt(t, e, n, r);
}
function mr(t) {
  if (t instanceof tt) return new tt(t.h, t.s, t.l, t.opacity);
  if (t instanceof Lt || (t = gt(t)), !t) return new tt();
  if (t instanceof tt) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), o = Math.max(e, n, r), s = NaN, a = o - i, c = (o + i) / 2;
  return a ? (e === o ? s = (n - r) / a + (n < r) * 6 : n === o ? s = (r - e) / a + 2 : s = (e - n) / a + 4, a /= c < 0.5 ? o + i : 2 - o - i, s *= 60) : a = c > 0 && c < 1 ? 0 : s, new tt(s, a, c, t.opacity);
}
function ms(t, e, n, r) {
  return arguments.length === 1 ? mr(t) : new tt(t, e, n, r ?? 1);
}
function tt(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
fn(tt, ms, gr(Lt, {
  brighter(t) {
    return t = t == null ? ue : Math.pow(ue, t), new tt(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Rt : Math.pow(Rt, t), new tt(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new K(
      He(t >= 240 ? t - 240 : t + 120, i, r),
      He(t, i, r),
      He(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new tt(In(this.h), Zt(this.s), Zt(this.l), ce(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = ce(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${In(this.h)}, ${Zt(this.s) * 100}%, ${Zt(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function In(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function Zt(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function He(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const hn = (t) => () => t;
function ys(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function _s(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function ws(t) {
  return (t = +t) == 1 ? yr : function(e, n) {
    return n - e ? _s(e, n, t) : hn(isNaN(e) ? n : e);
  };
}
function yr(t, e) {
  var n = e - t;
  return n ? ys(t, n) : hn(isNaN(t) ? e : t);
}
const le = (function t(e) {
  var n = ws(e);
  function r(i, o) {
    var s = n((i = Je(i)).r, (o = Je(o)).r), a = n(i.g, o.g), c = n(i.b, o.b), u = yr(i.opacity, o.opacity);
    return function(l) {
      return i.r = s(l), i.g = a(l), i.b = c(l), i.opacity = u(l), i + "";
    };
  }
  return r.gamma = t, r;
})(1);
function vs(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, r = e.slice(), i;
  return function(o) {
    for (i = 0; i < n; ++i) r[i] = t[i] * (1 - o) + e[i] * o;
    return r;
  };
}
function xs(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function bs(t, e) {
  var n = e ? e.length : 0, r = t ? Math.min(n, t.length) : 0, i = new Array(r), o = new Array(n), s;
  for (s = 0; s < r; ++s) i[s] = Dt(t[s], e[s]);
  for (; s < n; ++s) o[s] = e[s];
  return function(a) {
    for (s = 0; s < r; ++s) o[s] = i[s](a);
    return o;
  };
}
function Ns(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(r) {
    return n.setTime(t * (1 - r) + e * r), n;
  };
}
function rt(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function Ss(t, e) {
  var n = {}, r = {}, i;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (i in e)
    i in t ? n[i] = Dt(t[i], e[i]) : r[i] = e[i];
  return function(o) {
    for (i in n) r[i] = n[i](o);
    return r;
  };
}
var je = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Xe = new RegExp(je.source, "g");
function Es(t) {
  return function() {
    return t;
  };
}
function $s(t) {
  return function(e) {
    return t(e) + "";
  };
}
function _r(t, e) {
  var n = je.lastIndex = Xe.lastIndex = 0, r, i, o, s = -1, a = [], c = [];
  for (t = t + "", e = e + ""; (r = je.exec(t)) && (i = Xe.exec(e)); )
    (o = i.index) > n && (o = e.slice(n, o), a[s] ? a[s] += o : a[++s] = o), (r = r[0]) === (i = i[0]) ? a[s] ? a[s] += i : a[++s] = i : (a[++s] = null, c.push({ i: s, x: rt(r, i) })), n = Xe.lastIndex;
  return n < e.length && (o = e.slice(n), a[s] ? a[s] += o : a[++s] = o), a.length < 2 ? c[0] ? $s(c[0].x) : Es(e) : (e = c.length, function(u) {
    for (var l = 0, f; l < e; ++l) a[(f = c[l]).i] = f.x(u);
    return a.join("");
  });
}
function Dt(t, e) {
  var n = typeof e, r;
  return e == null || n === "boolean" ? hn(e) : (n === "number" ? rt : n === "string" ? (r = gt(e)) ? (e = r, le) : _r : e instanceof gt ? le : e instanceof Date ? Ns : xs(e) ? vs : Array.isArray(e) ? bs : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? Ss : rt)(t, e);
}
var kn = 180 / Math.PI, tn = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function wr(t, e, n, r, i, o) {
  var s, a, c;
  return (s = Math.sqrt(t * t + e * e)) && (t /= s, e /= s), (c = t * n + e * r) && (n -= t * c, r -= e * c), (a = Math.sqrt(n * n + r * r)) && (n /= a, r /= a, c /= a), t * r < e * n && (t = -t, e = -e, c = -c, s = -s), {
    translateX: i,
    translateY: o,
    rotate: Math.atan2(e, t) * kn,
    skewX: Math.atan(c) * kn,
    scaleX: s,
    scaleY: a
  };
}
var Gt;
function Cs(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? tn : wr(e.a, e.b, e.c, e.d, e.e, e.f);
}
function Ts(t) {
  return t == null || (Gt || (Gt = document.createElementNS("http://www.w3.org/2000/svg", "g")), Gt.setAttribute("transform", t), !(t = Gt.transform.baseVal.consolidate())) ? tn : (t = t.matrix, wr(t.a, t.b, t.c, t.d, t.e, t.f));
}
function vr(t, e, n, r) {
  function i(u) {
    return u.length ? u.pop() + " " : "";
  }
  function o(u, l, f, d, m, b) {
    if (u !== f || l !== d) {
      var C = m.push("translate(", null, e, null, n);
      b.push({ i: C - 4, x: rt(u, f) }, { i: C - 2, x: rt(l, d) });
    } else (f || d) && m.push("translate(" + f + e + d + n);
  }
  function s(u, l, f, d) {
    u !== l ? (u - l > 180 ? l += 360 : l - u > 180 && (u += 360), d.push({ i: f.push(i(f) + "rotate(", null, r) - 2, x: rt(u, l) })) : l && f.push(i(f) + "rotate(" + l + r);
  }
  function a(u, l, f, d) {
    u !== l ? d.push({ i: f.push(i(f) + "skewX(", null, r) - 2, x: rt(u, l) }) : l && f.push(i(f) + "skewX(" + l + r);
  }
  function c(u, l, f, d, m, b) {
    if (u !== f || l !== d) {
      var C = m.push(i(m) + "scale(", null, ",", null, ")");
      b.push({ i: C - 4, x: rt(u, f) }, { i: C - 2, x: rt(l, d) });
    } else (f !== 1 || d !== 1) && m.push(i(m) + "scale(" + f + "," + d + ")");
  }
  return function(u, l) {
    var f = [], d = [];
    return u = t(u), l = t(l), o(u.translateX, u.translateY, l.translateX, l.translateY, f, d), s(u.rotate, l.rotate, f, d), a(u.skewX, l.skewX, f, d), c(u.scaleX, u.scaleY, l.scaleX, l.scaleY, f, d), u = l = null, function(m) {
      for (var b = -1, C = d.length, O; ++b < C; ) f[(O = d[b]).i] = O.x(m);
      return f.join("");
    };
  };
}
var As = vr(Cs, "px, ", "px)", "deg)"), Is = vr(Ts, ", ", ")", ")"), ks = 1e-12;
function Mn(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function Ms(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function Ps(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const ee = (function t(e, n, r) {
  function i(o, s) {
    var a = o[0], c = o[1], u = o[2], l = s[0], f = s[1], d = s[2], m = l - a, b = f - c, C = m * m + b * b, O, N;
    if (C < ks)
      N = Math.log(d / u) / e, O = function(M) {
        return [
          a + M * m,
          c + M * b,
          u * Math.exp(e * M * N)
        ];
      };
    else {
      var z = Math.sqrt(C), T = (d * d - u * u + r * C) / (2 * u * n * z), g = (d * d - u * u - r * C) / (2 * d * n * z), _ = Math.log(Math.sqrt(T * T + 1) - T), v = Math.log(Math.sqrt(g * g + 1) - g);
      N = (v - _) / e, O = function(M) {
        var W = M * N, q = Mn(_), Z = u / (n * z) * (q * Ps(e * W + _) - Ms(_));
        return [
          a + Z * m,
          c + Z * b,
          u * q / Mn(e * W + _)
        ];
      };
    }
    return O.duration = N * 1e3 * e / Math.SQRT2, O;
  }
  return i.rho = function(o) {
    var s = Math.max(1e-3, +o), a = s * s, c = a * a;
    return t(s, a, c);
  }, i;
})(Math.SQRT2, 2, 4);
var Et = 0, Mt = 0, It = 0, xr = 1e3, fe, Pt, he = 0, mt = 0, be = 0, Wt = typeof performance == "object" && performance.now ? performance : Date, br = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function dn() {
  return mt || (br(Os), mt = Wt.now() + be);
}
function Os() {
  mt = 0;
}
function de() {
  this._call = this._time = this._next = null;
}
de.prototype = Nr.prototype = {
  constructor: de,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? dn() : +n) + (e == null ? 0 : +e), !this._next && Pt !== this && (Pt ? Pt._next = this : fe = this, Pt = this), this._call = t, this._time = n, en();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, en());
  }
};
function Nr(t, e, n) {
  var r = new de();
  return r.restart(t, e, n), r;
}
function Ds() {
  dn(), ++Et;
  for (var t = fe, e; t; )
    (e = mt - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --Et;
}
function Pn() {
  mt = (he = Wt.now()) + be, Et = Mt = 0;
  try {
    Ds();
  } finally {
    Et = 0, Rs(), mt = 0;
  }
}
function zs() {
  var t = Wt.now(), e = t - he;
  e > xr && (be -= e, he = t);
}
function Rs() {
  for (var t, e = fe, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : fe = n);
  Pt = t, en(r);
}
function en(t) {
  if (!Et) {
    Mt && (Mt = clearTimeout(Mt));
    var e = t - mt;
    e > 24 ? (t < 1 / 0 && (Mt = setTimeout(Pn, t - Wt.now() - be)), It && (It = clearInterval(It))) : (It || (he = Wt.now(), It = setInterval(zs, xr)), Et = 1, br(Pn));
  }
}
function On(t, e, n) {
  var r = new de();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var Bs = ve("start", "end", "cancel", "interrupt"), Ws = [], Sr = 0, Dn = 1, nn = 2, ne = 3, zn = 4, rn = 5, re = 6;
function Ne(t, e, n, r, i, o) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (n in s) return;
  Hs(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Bs,
    tween: Ws,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Sr
  });
}
function pn(t, e) {
  var n = et(t, e);
  if (n.state > Sr) throw new Error("too late; already scheduled");
  return n;
}
function at(t, e) {
  var n = et(t, e);
  if (n.state > ne) throw new Error("too late; already running");
  return n;
}
function et(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function Hs(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = Nr(o, 0, n.time);
  function o(u) {
    n.state = Dn, n.timer.restart(s, n.delay, n.time), n.delay <= u && s(u - n.delay);
  }
  function s(u) {
    var l, f, d, m;
    if (n.state !== Dn) return c();
    for (l in r)
      if (m = r[l], m.name === n.name) {
        if (m.state === ne) return On(s);
        m.state === zn ? (m.state = re, m.timer.stop(), m.on.call("interrupt", t, t.__data__, m.index, m.group), delete r[l]) : +l < e && (m.state = re, m.timer.stop(), m.on.call("cancel", t, t.__data__, m.index, m.group), delete r[l]);
      }
    if (On(function() {
      n.state === ne && (n.state = zn, n.timer.restart(a, n.delay, n.time), a(u));
    }), n.state = nn, n.on.call("start", t, t.__data__, n.index, n.group), n.state === nn) {
      for (n.state = ne, i = new Array(d = n.tween.length), l = 0, f = -1; l < d; ++l)
        (m = n.tween[l].value.call(t, t.__data__, n.index, n.group)) && (i[++f] = m);
      i.length = f + 1;
    }
  }
  function a(u) {
    for (var l = u < n.duration ? n.ease.call(null, u / n.duration) : (n.timer.restart(c), n.state = rn, 1), f = -1, d = i.length; ++f < d; )
      i[f].call(t, l);
    n.state === rn && (n.on.call("end", t, t.__data__, n.index, n.group), c());
  }
  function c() {
    n.state = re, n.timer.stop(), delete r[e];
    for (var u in r) return;
    delete t.__transition;
  }
}
function ie(t, e) {
  var n = t.__transition, r, i, o = !0, s;
  if (n) {
    e = e == null ? null : e + "";
    for (s in n) {
      if ((r = n[s]).name !== e) {
        o = !1;
        continue;
      }
      i = r.state > nn && r.state < rn, r.state = re, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[s];
    }
    o && delete t.__transition;
  }
}
function Xs(t) {
  return this.each(function() {
    ie(this, t);
  });
}
function qs(t, e) {
  var n, r;
  return function() {
    var i = at(this, t), o = i.tween;
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
function Ls(t, e, n) {
  var r, i;
  if (typeof n != "function") throw new Error();
  return function() {
    var o = at(this, t), s = o.tween;
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
function Ys(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = et(this.node(), n).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? qs : Ls)(n, t, e));
}
function gn(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = at(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return et(i, r).value[e];
  };
}
function Er(t, e) {
  var n;
  return (typeof e == "number" ? rt : e instanceof gt ? le : (n = gt(e)) ? (e = n, le) : _r)(t, e);
}
function Fs(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Vs(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Us(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? o : o = e(r = s, n);
  };
}
function Zs(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? o : o = e(r = s, n);
  };
}
function Gs(t, e, n) {
  var r, i, o;
  return function() {
    var s, a = n(this), c;
    return a == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), c = a + "", s === c ? null : s === r && c === i ? o : (i = c, o = e(r = s, a)));
  };
}
function Ks(t, e, n) {
  var r, i, o;
  return function() {
    var s, a = n(this), c;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), c = a + "", s === c ? null : s === r && c === i ? o : (i = c, o = e(r = s, a)));
  };
}
function Qs(t, e) {
  var n = xe(t), r = n === "transform" ? Is : Er;
  return this.attrTween(t, typeof e == "function" ? (n.local ? Ks : Gs)(n, r, gn(this, "attr." + t, e)) : e == null ? (n.local ? Vs : Fs)(n) : (n.local ? Zs : Us)(n, r, e));
}
function Js(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function js(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function ta(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && js(t, o)), n;
  }
  return i._value = e, i;
}
function ea(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && Js(t, o)), n;
  }
  return i._value = e, i;
}
function na(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var r = xe(t);
  return this.tween(n, (r.local ? ta : ea)(r, e));
}
function ra(t, e) {
  return function() {
    pn(this, t).delay = +e.apply(this, arguments);
  };
}
function ia(t, e) {
  return e = +e, function() {
    pn(this, t).delay = e;
  };
}
function oa(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? ra : ia)(e, t)) : et(this.node(), e).delay;
}
function sa(t, e) {
  return function() {
    at(this, t).duration = +e.apply(this, arguments);
  };
}
function aa(t, e) {
  return e = +e, function() {
    at(this, t).duration = e;
  };
}
function ua(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? sa : aa)(e, t)) : et(this.node(), e).duration;
}
function ca(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    at(this, t).ease = e;
  };
}
function la(t) {
  var e = this._id;
  return arguments.length ? this.each(ca(e, t)) : et(this.node(), e).ease;
}
function fa(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    at(this, t).ease = n;
  };
}
function ha(t) {
  if (typeof t != "function") throw new Error();
  return this.each(fa(this._id, t));
}
function da(t) {
  typeof t != "function" && (t = rr(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], s = o.length, a = r[i] = [], c, u = 0; u < s; ++u)
      (c = o[u]) && t.call(c, c.__data__, u, o) && a.push(c);
  return new lt(r, this._parents, this._name, this._id);
}
function pa(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, o = Math.min(r, i), s = new Array(r), a = 0; a < o; ++a)
    for (var c = e[a], u = n[a], l = c.length, f = s[a] = new Array(l), d, m = 0; m < l; ++m)
      (d = c[m] || u[m]) && (f[m] = d);
  for (; a < r; ++a)
    s[a] = e[a];
  return new lt(s, this._parents, this._name, this._id);
}
function ga(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function ma(t, e, n) {
  var r, i, o = ga(e) ? pn : at;
  return function() {
    var s = o(this, t), a = s.on;
    a !== r && (i = (r = a).copy()).on(e, n), s.on = i;
  };
}
function ya(t, e) {
  var n = this._id;
  return arguments.length < 2 ? et(this.node(), n).on.on(t) : this.each(ma(n, t, e));
}
function _a(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function wa() {
  return this.on("end.remove", _a(this._id));
}
function va(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = cn(t));
  for (var r = this._groups, i = r.length, o = new Array(i), s = 0; s < i; ++s)
    for (var a = r[s], c = a.length, u = o[s] = new Array(c), l, f, d = 0; d < c; ++d)
      (l = a[d]) && (f = t.call(l, l.__data__, d, a)) && ("__data__" in l && (f.__data__ = l.__data__), u[d] = f, Ne(u[d], e, n, d, u, et(l, n)));
  return new lt(o, this._parents, e, n);
}
function xa(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = nr(t));
  for (var r = this._groups, i = r.length, o = [], s = [], a = 0; a < i; ++a)
    for (var c = r[a], u = c.length, l, f = 0; f < u; ++f)
      if (l = c[f]) {
        for (var d = t.call(l, l.__data__, f, c), m, b = et(l, n), C = 0, O = d.length; C < O; ++C)
          (m = d[C]) && Ne(m, e, n, C, d, b);
        o.push(d), s.push(l);
      }
  return new lt(o, s, e, n);
}
var ba = qt.prototype.constructor;
function Na() {
  return new ba(this._groups, this._parents);
}
function Sa(t, e) {
  var n, r, i;
  return function() {
    var o = St(this, t), s = (this.style.removeProperty(t), St(this, t));
    return o === s ? null : o === n && s === r ? i : i = e(n = o, r = s);
  };
}
function $r(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Ea(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var s = St(this, t);
    return s === i ? null : s === r ? o : o = e(r = s, n);
  };
}
function $a(t, e, n) {
  var r, i, o;
  return function() {
    var s = St(this, t), a = n(this), c = a + "";
    return a == null && (c = a = (this.style.removeProperty(t), St(this, t))), s === c ? null : s === r && c === i ? o : (i = c, o = e(r = s, a));
  };
}
function Ca(t, e) {
  var n, r, i, o = "style." + e, s = "end." + o, a;
  return function() {
    var c = at(this, t), u = c.on, l = c.value[o] == null ? a || (a = $r(e)) : void 0;
    (u !== n || i !== l) && (r = (n = u).copy()).on(s, i = l), c.on = r;
  };
}
function Ta(t, e, n) {
  var r = (t += "") == "transform" ? As : Er;
  return e == null ? this.styleTween(t, Sa(t, r)).on("end.style." + t, $r(t)) : typeof e == "function" ? this.styleTween(t, $a(t, r, gn(this, "style." + t, e))).each(Ca(this._id, t)) : this.styleTween(t, Ea(t, r, e), n).on("end.style." + t, null);
}
function Aa(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function Ia(t, e, n) {
  var r, i;
  function o() {
    var s = e.apply(this, arguments);
    return s !== i && (r = (i = s) && Aa(t, s, n)), r;
  }
  return o._value = e, o;
}
function ka(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (e == null) return this.tween(r, null);
  if (typeof e != "function") throw new Error();
  return this.tween(r, Ia(t, e, n ?? ""));
}
function Ma(t) {
  return function() {
    this.textContent = t;
  };
}
function Pa(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function Oa(t) {
  return this.tween("text", typeof t == "function" ? Pa(gn(this, "text", t)) : Ma(t == null ? "" : t + ""));
}
function Da(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function za(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && Da(i)), e;
  }
  return r._value = t, r;
}
function Ra(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, za(t));
}
function Ba() {
  for (var t = this._name, e = this._id, n = Cr(), r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], a = s.length, c, u = 0; u < a; ++u)
      if (c = s[u]) {
        var l = et(c, e);
        Ne(c, t, n, u, s, {
          time: l.time + l.delay + l.duration,
          delay: 0,
          duration: l.duration,
          ease: l.ease
        });
      }
  return new lt(r, this._parents, t, n);
}
function Wa() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(o, s) {
    var a = { value: s }, c = { value: function() {
      --i === 0 && o();
    } };
    n.each(function() {
      var u = at(this, r), l = u.on;
      l !== t && (e = (t = l).copy(), e._.cancel.push(a), e._.interrupt.push(a), e._.end.push(c)), u.on = e;
    }), i === 0 && o();
  });
}
var Ha = 0;
function lt(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function Cr() {
  return ++Ha;
}
var ut = qt.prototype;
lt.prototype = {
  constructor: lt,
  select: va,
  selectAll: xa,
  selectChild: ut.selectChild,
  selectChildren: ut.selectChildren,
  filter: da,
  merge: pa,
  selection: Na,
  transition: Ba,
  call: ut.call,
  nodes: ut.nodes,
  node: ut.node,
  size: ut.size,
  empty: ut.empty,
  each: ut.each,
  on: ya,
  attr: Qs,
  attrTween: na,
  style: Ta,
  styleTween: ka,
  text: Oa,
  textTween: Ra,
  remove: wa,
  tween: Ys,
  delay: oa,
  duration: ua,
  ease: la,
  easeVarying: ha,
  end: Wa,
  [Symbol.iterator]: ut[Symbol.iterator]
};
function Xa(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var qa = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Xa
};
function La(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function Ya(t) {
  var e, n;
  t instanceof lt ? (e = t._id, t = t._name) : (e = Cr(), (n = qa).time = dn(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], a = s.length, c, u = 0; u < a; ++u)
      (c = s[u]) && Ne(c, t, e, u, s, n || La(c, e));
  return new lt(r, this._parents, t, e);
}
qt.prototype.interrupt = Xs;
qt.prototype.transition = Ya;
const Kt = (t) => () => t;
function Fa(t, {
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
function ct(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
ct.prototype = {
  constructor: ct,
  scale: function(t) {
    return t === 1 ? this : new ct(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new ct(this.k, this.x + this.k * t, this.y + this.k * e);
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
var Se = new ct(1, 0, 0);
Tr.prototype = ct.prototype;
function Tr(t) {
  for (; !t.__zoom; ) if (!(t = t.parentNode)) return Se;
  return t.__zoom;
}
function qe(t) {
  t.stopImmediatePropagation();
}
function kt(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Va(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function Ua() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function Rn() {
  return this.__zoom || Se;
}
function Za(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function Ga() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Ka(t, e, n) {
  var r = t.invertX(e[0][0]) - n[0][0], i = t.invertX(e[1][0]) - n[1][0], o = t.invertY(e[0][1]) - n[0][1], s = t.invertY(e[1][1]) - n[1][1];
  return t.translate(
    i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i),
    s > o ? (o + s) / 2 : Math.min(0, o) || Math.max(0, s)
  );
}
function Qa() {
  var t = Va, e = Ua, n = Ka, r = Za, i = Ga, o = [0, 1 / 0], s = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, c = ee, u = ve("start", "zoom", "end"), l, f, d, m = 500, b = 150, C = 0, O = 10;
  function N(h) {
    h.property("__zoom", Rn).on("wheel.zoom", W, { passive: !1 }).on("mousedown.zoom", q).on("dblclick.zoom", Z).filter(i).on("touchstart.zoom", A).on("touchmove.zoom", x).on("touchend.zoom touchcancel.zoom", I).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  N.transform = function(h, y, p, w) {
    var S = h.selection ? h.selection() : h;
    S.property("__zoom", Rn), h !== S ? _(h, y, p, w) : S.interrupt().each(function() {
      v(this, arguments).event(w).start().zoom(null, typeof y == "function" ? y.apply(this, arguments) : y).end();
    });
  }, N.scaleBy = function(h, y, p, w) {
    N.scaleTo(h, function() {
      var S = this.__zoom.k, E = typeof y == "function" ? y.apply(this, arguments) : y;
      return S * E;
    }, p, w);
  }, N.scaleTo = function(h, y, p, w) {
    N.transform(h, function() {
      var S = e.apply(this, arguments), E = this.__zoom, $ = p == null ? g(S) : typeof p == "function" ? p.apply(this, arguments) : p, k = E.invert($), P = typeof y == "function" ? y.apply(this, arguments) : y;
      return n(T(z(E, P), $, k), S, s);
    }, p, w);
  }, N.translateBy = function(h, y, p, w) {
    N.transform(h, function() {
      return n(this.__zoom.translate(
        typeof y == "function" ? y.apply(this, arguments) : y,
        typeof p == "function" ? p.apply(this, arguments) : p
      ), e.apply(this, arguments), s);
    }, null, w);
  }, N.translateTo = function(h, y, p, w, S) {
    N.transform(h, function() {
      var E = e.apply(this, arguments), $ = this.__zoom, k = w == null ? g(E) : typeof w == "function" ? w.apply(this, arguments) : w;
      return n(Se.translate(k[0], k[1]).scale($.k).translate(
        typeof y == "function" ? -y.apply(this, arguments) : -y,
        typeof p == "function" ? -p.apply(this, arguments) : -p
      ), E, s);
    }, w, S);
  };
  function z(h, y) {
    return y = Math.max(o[0], Math.min(o[1], y)), y === h.k ? h : new ct(y, h.x, h.y);
  }
  function T(h, y, p) {
    var w = y[0] - p[0] * h.k, S = y[1] - p[1] * h.k;
    return w === h.x && S === h.y ? h : new ct(h.k, w, S);
  }
  function g(h) {
    return [(+h[0][0] + +h[1][0]) / 2, (+h[0][1] + +h[1][1]) / 2];
  }
  function _(h, y, p, w) {
    h.on("start.zoom", function() {
      v(this, arguments).event(w).start();
    }).on("interrupt.zoom end.zoom", function() {
      v(this, arguments).event(w).end();
    }).tween("zoom", function() {
      var S = this, E = arguments, $ = v(S, E).event(w), k = e.apply(S, E), P = p == null ? g(k) : typeof p == "function" ? p.apply(S, E) : p, X = Math.max(k[1][0] - k[0][0], k[1][1] - k[0][1]), R = S.__zoom, H = typeof y == "function" ? y.apply(S, E) : y, G = c(R.invert(P).concat(X / R.k), H.invert(P).concat(X / H.k));
      return function(L) {
        if (L === 1) L = H;
        else {
          var B = G(L), J = X / B[2];
          L = new ct(J, P[0] - B[0] * J, P[1] - B[1] * J);
        }
        $.zoom(null, L);
      };
    });
  }
  function v(h, y, p) {
    return !p && h.__zooming || new M(h, y);
  }
  function M(h, y) {
    this.that = h, this.args = y, this.active = 0, this.sourceEvent = null, this.extent = e.apply(h, y), this.taps = 0;
  }
  M.prototype = {
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
      var y = j(this.that).datum();
      u.call(
        h,
        this.that,
        new Fa(h, {
          sourceEvent: this.sourceEvent,
          target: N,
          transform: this.that.__zoom,
          dispatch: u
        }),
        y
      );
    }
  };
  function W(h, ...y) {
    if (!t.apply(this, arguments)) return;
    var p = v(this, y).event(h), w = this.__zoom, S = Math.max(o[0], Math.min(o[1], w.k * Math.pow(2, r.apply(this, arguments)))), E = nt(h);
    if (p.wheel)
      (p.mouse[0][0] !== E[0] || p.mouse[0][1] !== E[1]) && (p.mouse[1] = w.invert(p.mouse[0] = E)), clearTimeout(p.wheel);
    else {
      if (w.k === S) return;
      p.mouse = [E, w.invert(E)], ie(this), p.start();
    }
    kt(h), p.wheel = setTimeout($, b), p.zoom("mouse", n(T(z(w, S), p.mouse[0], p.mouse[1]), p.extent, s));
    function $() {
      p.wheel = null, p.end();
    }
  }
  function q(h, ...y) {
    if (d || !t.apply(this, arguments)) return;
    var p = h.currentTarget, w = v(this, y, !0).event(h), S = j(h.view).on("mousemove.zoom", P, !0).on("mouseup.zoom", X, !0), E = nt(h, p), $ = h.clientX, k = h.clientY;
    dr(h.view), qe(h), w.mouse = [E, this.__zoom.invert(E)], ie(this), w.start();
    function P(R) {
      if (kt(R), !w.moved) {
        var H = R.clientX - $, G = R.clientY - k;
        w.moved = H * H + G * G > C;
      }
      w.event(R).zoom("mouse", n(T(w.that.__zoom, w.mouse[0] = nt(R, p), w.mouse[1]), w.extent, s));
    }
    function X(R) {
      S.on("mousemove.zoom mouseup.zoom", null), pr(R.view, w.moved), kt(R), w.event(R).end();
    }
  }
  function Z(h, ...y) {
    if (t.apply(this, arguments)) {
      var p = this.__zoom, w = nt(h.changedTouches ? h.changedTouches[0] : h, this), S = p.invert(w), E = p.k * (h.shiftKey ? 0.5 : 2), $ = n(T(z(p, E), w, S), e.apply(this, y), s);
      kt(h), a > 0 ? j(this).transition().duration(a).call(_, $, w, h) : j(this).call(N.transform, $, w, h);
    }
  }
  function A(h, ...y) {
    if (t.apply(this, arguments)) {
      var p = h.touches, w = p.length, S = v(this, y, h.changedTouches.length === w).event(h), E, $, k, P;
      for (qe(h), $ = 0; $ < w; ++$)
        k = p[$], P = nt(k, this), P = [P, this.__zoom.invert(P), k.identifier], S.touch0 ? !S.touch1 && S.touch0[2] !== P[2] && (S.touch1 = P, S.taps = 0) : (S.touch0 = P, E = !0, S.taps = 1 + !!l);
      l && (l = clearTimeout(l)), E && (S.taps < 2 && (f = P[0], l = setTimeout(function() {
        l = null;
      }, m)), ie(this), S.start());
    }
  }
  function x(h, ...y) {
    if (this.__zooming) {
      var p = v(this, y).event(h), w = h.changedTouches, S = w.length, E, $, k, P;
      for (kt(h), E = 0; E < S; ++E)
        $ = w[E], k = nt($, this), p.touch0 && p.touch0[2] === $.identifier ? p.touch0[0] = k : p.touch1 && p.touch1[2] === $.identifier && (p.touch1[0] = k);
      if ($ = p.that.__zoom, p.touch1) {
        var X = p.touch0[0], R = p.touch0[1], H = p.touch1[0], G = p.touch1[1], L = (L = H[0] - X[0]) * L + (L = H[1] - X[1]) * L, B = (B = G[0] - R[0]) * B + (B = G[1] - R[1]) * B;
        $ = z($, Math.sqrt(L / B)), k = [(X[0] + H[0]) / 2, (X[1] + H[1]) / 2], P = [(R[0] + G[0]) / 2, (R[1] + G[1]) / 2];
      } else if (p.touch0) k = p.touch0[0], P = p.touch0[1];
      else return;
      p.zoom("touch", n(T($, k, P), p.extent, s));
    }
  }
  function I(h, ...y) {
    if (this.__zooming) {
      var p = v(this, y).event(h), w = h.changedTouches, S = w.length, E, $;
      for (qe(h), d && clearTimeout(d), d = setTimeout(function() {
        d = null;
      }, m), E = 0; E < S; ++E)
        $ = w[E], p.touch0 && p.touch0[2] === $.identifier ? delete p.touch0 : p.touch1 && p.touch1[2] === $.identifier && delete p.touch1;
      if (p.touch1 && !p.touch0 && (p.touch0 = p.touch1, delete p.touch1), p.touch0) p.touch0[1] = this.__zoom.invert(p.touch0[0]);
      else if (p.end(), p.taps === 2 && ($ = nt($, this), Math.hypot(f[0] - $[0], f[1] - $[1]) < O)) {
        var k = j(this).on("dblclick.zoom");
        k && k.apply(this, arguments);
      }
    }
  }
  return N.wheelDelta = function(h) {
    return arguments.length ? (r = typeof h == "function" ? h : Kt(+h), N) : r;
  }, N.filter = function(h) {
    return arguments.length ? (t = typeof h == "function" ? h : Kt(!!h), N) : t;
  }, N.touchable = function(h) {
    return arguments.length ? (i = typeof h == "function" ? h : Kt(!!h), N) : i;
  }, N.extent = function(h) {
    return arguments.length ? (e = typeof h == "function" ? h : Kt([[+h[0][0], +h[0][1]], [+h[1][0], +h[1][1]]]), N) : e;
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
    return arguments.length ? (C = (h = +h) * h, N) : Math.sqrt(C);
  }, N.tapDistance = function(h) {
    return arguments.length ? (O = +h, N) : O;
  }, N;
}
const Bn = {
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
}, Ar = [
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
];
var Wn;
(function(t) {
  t.Strict = "strict", t.Loose = "loose";
})(Wn || (Wn = {}));
var bt;
(function(t) {
  t.Free = "free", t.Vertical = "vertical", t.Horizontal = "horizontal";
})(bt || (bt = {}));
var Hn;
(function(t) {
  t.Partial = "partial", t.Full = "full";
})(Hn || (Hn = {}));
var Xn;
(function(t) {
  t.Bezier = "default", t.Straight = "straight", t.Step = "step", t.SmoothStep = "smoothstep", t.SimpleBezier = "simplebezier";
})(Xn || (Xn = {}));
var qn;
(function(t) {
  t.Arrow = "arrow", t.ArrowClosed = "arrowclosed";
})(qn || (qn = {}));
var D;
(function(t) {
  t.Left = "left", t.Top = "top", t.Right = "right", t.Bottom = "bottom";
})(D || (D = {}));
D.Left + "", D.Right, D.Right + "", D.Left, D.Top + "", D.Bottom, D.Bottom + "", D.Top;
const Ja = (t) => "id" in t && "internals" in t && !("source" in t) && !("target" in t), mn = (t, e = [0, 0]) => {
  const { width: n, height: r } = Yt(t), i = t.origin ?? e, o = n * i[0], s = r * i[1];
  return {
    x: t.position.x - o,
    y: t.position.y - s
  };
}, ja = (t, e = {}) => {
  let n = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 }, r = !1;
  return t.forEach((i) => {
    (e.filter === void 0 || e.filter(i)) && (n = ru(n, su(i)), r = !0);
  }), r ? ou(n) : { x: 0, y: 0, width: 0, height: 0 };
};
function tu({ nodeId: t, nextPosition: e, nodeLookup: n, nodeOrigin: r = [0, 0], nodeExtent: i, onError: o }) {
  const s = n.get(t), a = s.parentId ? n.get(s.parentId) : void 0, { x: c, y: u } = a ? a.internals.positionAbsolute : { x: 0, y: 0 }, l = s.origin ?? r;
  let f = s.extent || i;
  if (s.extent === "parent" && !s.expandParent)
    if (!a)
      o?.("005", Bn.error005());
    else {
      const m = a.measured.width, b = a.measured.height;
      m && b && (f = [
        [c, u],
        [c + m, u + b]
      ]);
    }
  else a && pe(s.extent) && (f = [
    [s.extent[0][0] + c, s.extent[0][1] + u],
    [s.extent[1][0] + c, s.extent[1][1] + u]
  ]);
  const d = pe(f) ? Xt(e, f, s.measured) : e;
  return (s.measured.width === void 0 || s.measured.height === void 0) && o?.("015", Bn.error015()), {
    position: {
      x: d.x - c + (s.measured.width ?? 0) * l[0],
      y: d.y - u + (s.measured.height ?? 0) * l[1]
    },
    positionAbsolute: d
  };
}
const Ht = (t, e = 0, n = 1) => Math.min(Math.max(t, e), n), Xt = (t = { x: 0, y: 0 }, e, n) => ({
  x: Ht(t.x, e[0][0], e[1][0] - (n?.width ?? 0)),
  y: Ht(t.y, e[0][1], e[1][1] - (n?.height ?? 0))
});
function eu(t, e, n) {
  const { width: r, height: i } = Yt(n), { x: o, y: s } = n.internals.positionAbsolute;
  return Xt(t, [
    [o, s],
    [o + r, s + i]
  ], e);
}
const Ln = (t, e, n) => t < e ? Ht(Math.abs(t - e), 1, e) / e : t > n ? -Ht(Math.abs(t - n), 1, e) / e : 0, nu = (t, e, n = 15, r = 40) => {
  const i = Ln(t.x, r, e.width - r) * n, o = Ln(t.y, r, e.height - r) * n;
  return [i, o];
}, ru = (t, e) => ({
  x: Math.min(t.x, e.x),
  y: Math.min(t.y, e.y),
  x2: Math.max(t.x2, e.x2),
  y2: Math.max(t.y2, e.y2)
}), iu = ({ x: t, y: e, width: n, height: r }) => ({
  x: t,
  y: e,
  x2: t + n,
  y2: e + r
}), ou = ({ x: t, y: e, x2: n, y2: r }) => ({
  x: t,
  y: e,
  width: n - t,
  height: r - e
}), su = (t, e = [0, 0]) => {
  const { x: n, y: r } = Ja(t) ? t.internals.positionAbsolute : mn(t, e);
  return {
    x: n,
    y: r,
    x2: n + (t.measured?.width ?? t.width ?? t.initialWidth ?? 0),
    y2: r + (t.measured?.height ?? t.height ?? t.initialHeight ?? 0)
  };
}, on = (t) => !isNaN(t) && isFinite(t), Ee = (t, e = [1, 1]) => ({
  x: e[0] * Math.round(t.x / e[0]),
  y: e[1] * Math.round(t.y / e[1])
}), au = ({ x: t, y: e }, [n, r, i], o = !1, s = [1, 1]) => {
  const a = {
    x: (t - n) / i,
    y: (e - r) / i
  };
  return o ? Ee(a, s) : a;
}, Ir = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function pe(t) {
  return t != null && t !== "parent";
}
function Yt(t) {
  return {
    width: t.measured?.width ?? t.width ?? t.initialWidth ?? 0,
    height: t.measured?.height ?? t.height ?? t.initialHeight ?? 0
  };
}
function Le(t, { snapGrid: e = [0, 0], snapToGrid: n = !1, transform: r, containerBounds: i }) {
  const { x: o, y: s } = oe(t), a = au({ x: o - (i?.left ?? 0), y: s - (i?.top ?? 0) }, r), { x: c, y: u } = n ? Ee(a, e) : a;
  return {
    xSnapped: c,
    ySnapped: u,
    ...a
  };
}
const uu = (t) => "clientX" in t, oe = (t, e) => {
  const n = uu(t), r = n ? t.clientX : t.touches?.[0].clientX, i = n ? t.clientY : t.touches?.[0].clientY;
  return {
    x: r - (e?.left ?? 0),
    y: i - (e?.top ?? 0)
  };
};
function cu({ sourceX: t, sourceY: e, targetX: n, targetY: r, sourceControlX: i, sourceControlY: o, targetControlX: s, targetControlY: a }) {
  const c = t * 0.125 + i * 0.375 + s * 0.375 + n * 0.125, u = e * 0.125 + o * 0.375 + a * 0.375 + r * 0.125, l = Math.abs(c - t), f = Math.abs(u - e);
  return [c, u, l, f];
}
function Qt(t, e) {
  return t >= 0 ? 0.5 * t : e * 25 * Math.sqrt(-t);
}
function Yn({ pos: t, x1: e, y1: n, x2: r, y2: i, c: o }) {
  switch (t) {
    case D.Left:
      return [e - Qt(e - r, o), n];
    case D.Right:
      return [e + Qt(r - e, o), n];
    case D.Top:
      return [e, n - Qt(n - i, o)];
    case D.Bottom:
      return [e, n + Qt(i - n, o)];
  }
}
function lu({ sourceX: t, sourceY: e, sourcePosition: n = D.Bottom, targetX: r, targetY: i, targetPosition: o = D.Top, curvature: s = 0.25 }) {
  const [a, c] = Yn({
    pos: n,
    x1: t,
    y1: e,
    x2: r,
    y2: i,
    c: s
  }), [u, l] = Yn({
    pos: o,
    x1: r,
    y1: i,
    x2: t,
    y2: e,
    c: s
  }), [f, d, m, b] = cu({
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
function Fn(t, e, n = D.Left, r = !1) {
  const i = (e?.x ?? 0) + t.internals.positionAbsolute.x, o = (e?.y ?? 0) + t.internals.positionAbsolute.y, { width: s, height: a } = e ?? Yt(t);
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
const kr = 1e3, fu = 10, Mr = {
  nodeOrigin: [0, 0],
  nodeExtent: Ar,
  elevateNodesOnSelect: !0,
  zIndexMode: "basic",
  defaults: {}
}, hu = {
  ...Mr,
  checkEquality: !0
};
function Pr(t, e) {
  const n = { ...t };
  for (const r in e)
    e[r] !== void 0 && (n[r] = e[r]);
  return n;
}
function du(t, e) {
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
function yn(t) {
  return t === "manual";
}
function Vn(t, e, n, r = {}) {
  const i = Pr(hu, r), o = { i: 0 }, s = new Map(e), a = i?.elevateNodesOnSelect && !yn(i.zIndexMode) ? kr : 0;
  let c = t.length > 0;
  e.clear(), n.clear();
  for (const u of t) {
    let l = s.get(u.id);
    if (i.checkEquality && u === l?.internals.userNode)
      e.set(u.id, l);
    else {
      const f = mn(u, i.nodeOrigin), d = pe(u.extent) ? u.extent : i.nodeExtent, m = Xt(f, d, Yt(u));
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
          handleBounds: du(u, l),
          z: Or(u, a, i.zIndexMode),
          userNode: u
        }
      }, e.set(u.id, l);
    }
    (l.measured === void 0 || l.measured.width === void 0 || l.measured.height === void 0) && !l.hidden && (c = !1), u.parentId && gu(l, e, n, r, o);
  }
  return c;
}
function pu(t, e) {
  if (!t.parentId)
    return;
  const n = e.get(t.parentId);
  n ? n.set(t.id, t) : e.set(t.parentId, /* @__PURE__ */ new Map([[t.id, t]]));
}
function gu(t, e, n, r, i) {
  const { elevateNodesOnSelect: o, nodeOrigin: s, nodeExtent: a, zIndexMode: c } = Pr(Mr, r), u = t.parentId, l = e.get(u);
  if (!l) {
    console.warn(`Parent node ${u} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
    return;
  }
  pu(t, n), i && !l.parentId && l.internals.rootParentIndex === void 0 && c === "auto" && (l.internals.rootParentIndex = ++i.i, l.internals.z = l.internals.z + i.i * fu), i && l.internals.rootParentIndex !== void 0 && (i.i = l.internals.rootParentIndex);
  const f = o && !yn(c) ? kr : 0, { x: d, y: m, z: b } = mu(t, l, s, a, f, c), { positionAbsolute: C } = t.internals, O = d !== C.x || m !== C.y;
  (O || b !== t.internals.z) && e.set(t.id, {
    ...t,
    internals: {
      ...t.internals,
      positionAbsolute: O ? { x: d, y: m } : C,
      z: b
    }
  });
}
function Or(t, e, n) {
  const r = on(t.zIndex) ? t.zIndex : 0;
  return yn(n) ? r : r + (t.selected ? e : 0);
}
function mu(t, e, n, r, i, o) {
  const { x: s, y: a } = e.internals.positionAbsolute, c = Yt(t), u = mn(t, n), l = pe(t.extent) ? Xt(u, t.extent, c) : u;
  let f = Xt({ x: s + l.x, y: a + l.y }, r, c);
  t.extent === "parent" && (f = eu(f, c, e));
  const d = Or(t, i, o), m = e.internals.z ?? 0;
  return {
    x: f.x,
    y: f.y,
    z: m >= d ? m + 1 : d
  };
}
function Dr(t, e) {
  if (!t.parentId)
    return !1;
  const n = e.get(t.parentId);
  return n ? n.selected ? !0 : Dr(n, e) : !1;
}
function Un(t, e, n) {
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
function yu(t, e, n, r) {
  const i = /* @__PURE__ */ new Map();
  for (const [o, s] of t)
    if ((s.selected || s.id === r) && (!s.parentId || !Dr(s, t)) && (s.draggable || e && typeof s.draggable > "u")) {
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
function Ye({ nodeId: t, dragItems: e, nodeLookup: n, dragging: r = !0 }) {
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
function _u({ dragItems: t, snapGrid: e, x: n, y: r }) {
  const i = t.values().next().value;
  if (!i)
    return null;
  const o = {
    x: n - i.distance.x,
    y: r - i.distance.y
  }, s = Ee(o, e);
  return {
    x: s.x - o.x,
    y: s.y - o.y
  };
}
function wu({ onNodeMouseDown: t, getStoreItems: e, onDragStart: n, onDrag: r, onDragStop: i }) {
  let o = { x: null, y: null }, s = 0, a = /* @__PURE__ */ new Map(), c = !1, u = { x: 0, y: 0 }, l = null, f = !1, d = null, m = !1, b = !1, C = null;
  function O({ noDragClassName: z, handleSelector: T, domNode: g, isSelectable: _, nodeId: v, nodeClickDistance: M = 0 }) {
    d = j(g);
    function W({ x, y: I }) {
      const { nodeLookup: h, nodeExtent: y, snapGrid: p, snapToGrid: w, nodeOrigin: S, onNodeDrag: E, onSelectionDrag: $, onError: k, updateNodePositions: P } = e();
      o = { x, y: I };
      let X = !1;
      const R = a.size > 1, H = R && y ? iu(ja(a)) : null, G = R && w ? _u({
        dragItems: a,
        snapGrid: p,
        x,
        y: I
      }) : null;
      for (const [L, B] of a) {
        if (!h.has(L))
          continue;
        let J = { x: x - B.distance.x, y: I - B.distance.y };
        w && (J = G ? {
          x: Math.round(J.x + G.x),
          y: Math.round(J.y + G.y)
        } : Ee(J, p));
        let Tt = null;
        if (R && y && !B.extent && H) {
          const { positionAbsolute: yt } = B.internals, Ie = yt.x - H.x + y[0][0], Br = yt.x + B.measured.width - H.x2 + y[1][0], Wr = yt.y - H.y + y[0][1], Hr = yt.y + B.measured.height - H.y2 + y[1][1];
          Tt = [
            [Ie, Wr],
            [Br, Hr]
          ];
        }
        const { position: At, positionAbsolute: Ae } = tu({
          nodeId: L,
          nextPosition: J,
          nodeLookup: h,
          nodeExtent: Tt || y,
          nodeOrigin: S,
          onError: k
        });
        X = X || B.position.x !== At.x || B.position.y !== At.y, B.position = At, B.internals.positionAbsolute = Ae;
      }
      if (b = b || X, !!X && (P(a, !0), C && (r || E || !v && $))) {
        const [L, B] = Ye({
          nodeId: v,
          dragItems: a,
          nodeLookup: h
        });
        r?.(C, a, L, B), E?.(C, L, B), v || $?.(C, B);
      }
    }
    async function q() {
      if (!l)
        return;
      const { transform: x, panBy: I, autoPanSpeed: h, autoPanOnNodeDrag: y } = e();
      if (!y) {
        c = !1, cancelAnimationFrame(s);
        return;
      }
      const [p, w] = nu(u, l, h);
      (p !== 0 || w !== 0) && (o.x = (o.x ?? 0) - p / x[2], o.y = (o.y ?? 0) - w / x[2], await I({ x: p, y: w }) && W(o)), s = requestAnimationFrame(q);
    }
    function Z(x) {
      const { nodeLookup: I, multiSelectionActive: h, nodesDraggable: y, transform: p, snapGrid: w, snapToGrid: S, selectNodesOnDrag: E, onNodeDragStart: $, onSelectionDragStart: k, unselectNodesAndEdges: P } = e();
      f = !0, (!E || !_) && !h && v && (I.get(v)?.selected || P()), _ && E && v && t?.(v);
      const X = Le(x.sourceEvent, { transform: p, snapGrid: w, snapToGrid: S, containerBounds: l });
      if (o = X, a = yu(I, y, X, v), a.size > 0 && (n || $ || !v && k)) {
        const [R, H] = Ye({
          nodeId: v,
          dragItems: a,
          nodeLookup: I
        });
        n?.(x.sourceEvent, a, R, H), $?.(x.sourceEvent, R, H), v || k?.(x.sourceEvent, H);
      }
    }
    const A = is().clickDistance(M).on("start", (x) => {
      const { domNode: I, nodeDragThreshold: h, transform: y, snapGrid: p, snapToGrid: w } = e();
      l = I?.getBoundingClientRect() || null, m = !1, b = !1, C = x.sourceEvent, h === 0 && Z(x), o = Le(x.sourceEvent, { transform: y, snapGrid: p, snapToGrid: w, containerBounds: l }), u = oe(x.sourceEvent, l);
    }).on("drag", (x) => {
      const { autoPanOnNodeDrag: I, transform: h, snapGrid: y, snapToGrid: p, nodeDragThreshold: w, nodeLookup: S } = e(), E = Le(x.sourceEvent, { transform: h, snapGrid: y, snapToGrid: p, containerBounds: l });
      if (C = x.sourceEvent, (x.sourceEvent.type === "touchmove" && x.sourceEvent.touches.length > 1 || // if user deletes a node while dragging, we need to abort the drag to prevent errors
      v && !S.has(v)) && (m = !0), !m) {
        if (!c && I && f && (c = !0, q()), !f) {
          const $ = oe(x.sourceEvent, l), k = $.x - u.x, P = $.y - u.y;
          Math.sqrt(k * k + P * P) > w && Z(x);
        }
        (o.x !== E.xSnapped || o.y !== E.ySnapped) && a && f && (u = oe(x.sourceEvent, l), W(E));
      }
    }).on("end", (x) => {
      if (!(!f || m) && (c = !1, f = !1, cancelAnimationFrame(s), a.size > 0)) {
        const { nodeLookup: I, updateNodePositions: h, onNodeDragStop: y, onSelectionDragStop: p } = e();
        if (b && (h(a, !1), b = !1), i || y || !v && p) {
          const [w, S] = Ye({
            nodeId: v,
            dragItems: a,
            nodeLookup: I,
            dragging: !1
          });
          i?.(x.sourceEvent, a, w, S), y?.(x.sourceEvent, w, S), v || p?.(x.sourceEvent, S);
        }
      }
    }).filter((x) => {
      const I = x.target;
      return !x.button && (!z || !Un(I, `.${z}`, g)) && (!T || Un(I, T, g));
    });
    d.call(A);
  }
  function N() {
    d?.on(".drag", null);
  }
  return {
    update: O,
    destroy: N
  };
}
const $e = (t) => ({
  x: t.x,
  y: t.y,
  zoom: t.k
}), Fe = ({ x: t, y: e, zoom: n }) => Se.translate(t, e).scale(n), wt = (t, e) => t.target.closest(`.${e}`), zr = (t, e) => e === 2 && Array.isArray(t) && t.includes(2), vu = (t) => ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2, Ve = (t, e = 0, n = vu, r = () => {
}) => {
  const i = typeof e == "number" && e > 0;
  return i || r(), i ? t.transition().duration(e).ease(n).on("end", r) : t;
}, Rr = (t) => {
  const e = t.ctrlKey && Ir() ? 10 : 1;
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * e;
};
function xu({ zoomPanValues: t, noWheelClassName: e, d3Selection: n, d3Zoom: r, panOnScrollMode: i, panOnScrollSpeed: o, zoomOnPinch: s, onPanZoomStart: a, onPanZoom: c, onPanZoomEnd: u }) {
  return (l) => {
    if (wt(l, e))
      return l.ctrlKey && l.preventDefault(), !1;
    l.preventDefault(), l.stopImmediatePropagation();
    const f = n.property("__zoom").k || 1;
    if (l.ctrlKey && s) {
      const O = nt(l), N = Rr(l), z = f * Math.pow(2, N);
      r.scaleTo(n, z, O, l);
      return;
    }
    const d = l.deltaMode === 1 ? 20 : 1;
    let m = i === bt.Vertical ? 0 : l.deltaX * d, b = i === bt.Horizontal ? 0 : l.deltaY * d;
    !Ir() && l.shiftKey && i !== bt.Vertical && (m = l.deltaY * d, b = 0), r.translateBy(
      n,
      -(m / f) * o,
      -(b / f) * o,
      // @ts-ignore
      { internal: !0 }
    );
    const C = $e(n.property("__zoom"));
    clearTimeout(t.panScrollTimeout), t.isPanScrolling ? (c?.(l, C), t.panScrollTimeout = setTimeout(() => {
      u?.(l, C), t.isPanScrolling = !1;
    }, 150)) : (t.isPanScrolling = !0, a?.(l, C));
  };
}
function bu({ noWheelClassName: t, preventScrolling: e, d3ZoomHandler: n }) {
  return function(r, i) {
    const o = r.type === "wheel", s = !e && o && !r.ctrlKey, a = wt(r, t);
    if (r.ctrlKey && o && a && r.preventDefault(), s || a)
      return null;
    r.preventDefault(), n.call(this, r, i);
  };
}
function Nu({ zoomPanValues: t, onDraggingChange: e, onPanZoomStart: n }) {
  return (r) => {
    if (r.sourceEvent?.internal)
      return;
    const i = $e(r.transform);
    t.mouseButton = r.sourceEvent?.button || 0, t.isZoomingOrPanning = !0, t.prevViewport = i, r.sourceEvent?.type, n && n?.(r.sourceEvent, i);
  };
}
function Su({ zoomPanValues: t, panOnDrag: e, onPaneContextMenu: n, onTransformChange: r, onPanZoom: i }) {
  return (o) => {
    t.usedRightMouseButton = !!(n && zr(e, t.mouseButton ?? 0)), o.sourceEvent?.sync || r([o.transform.x, o.transform.y, o.transform.k]), i && !o.sourceEvent?.internal && i?.(o.sourceEvent, $e(o.transform));
  };
}
function Eu({ zoomPanValues: t, panOnDrag: e, panOnScroll: n, onDraggingChange: r, onPanZoomEnd: i, onPaneContextMenu: o }) {
  return (s) => {
    if (!s.sourceEvent?.internal && (t.isZoomingOrPanning = !1, o && zr(e, t.mouseButton ?? 0) && !t.usedRightMouseButton && s.sourceEvent && o(s.sourceEvent), t.usedRightMouseButton = !1, i)) {
      const a = $e(s.transform);
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
function $u({ zoomActivationKeyPressed: t, zoomOnScroll: e, zoomOnPinch: n, panOnDrag: r, panOnScroll: i, zoomOnDoubleClick: o, userSelectionActive: s, noWheelClassName: a, noPanClassName: c, lib: u, connectionInProgress: l }) {
  return (f) => {
    const d = t || e, m = n && f.ctrlKey, b = f.type === "wheel";
    if (f.button === 1 && f.type === "mousedown" && (wt(f, `${u}-flow__node`) || wt(f, `${u}-flow__edge`)))
      return !0;
    if (!r && !d && !i && !o && !n || s || l && !b || wt(f, a) && b || wt(f, c) && (!b || i && b && !t) || !n && f.ctrlKey && b)
      return !1;
    if (!n && f.type === "touchstart" && f.touches?.length > 1)
      return f.preventDefault(), !1;
    if (!d && !i && !m && b || !r && (f.type === "mousedown" || f.type === "touchstart") || Array.isArray(r) && !r.includes(f.button) && f.type === "mousedown")
      return !1;
    const C = Array.isArray(r) && r.includes(f.button) || !f.button || f.button <= 1;
    return (!f.ctrlKey || b) && C;
  };
}
function Cu({ domNode: t, minZoom: e, maxZoom: n, translateExtent: r, viewport: i, onPanZoom: o, onPanZoomStart: s, onPanZoomEnd: a, onDraggingChange: c }) {
  const u = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: {},
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, l = t.getBoundingClientRect(), f = Qa().scaleExtent([e, n]).translateExtent(r), d = j(t).call(f);
  z({
    x: i.x,
    y: i.y,
    zoom: Ht(i.zoom, e, n)
  }, [
    [0, 0],
    [l.width, l.height]
  ], r);
  const m = d.on("wheel.zoom"), b = d.on("dblclick.zoom");
  f.wheelDelta(Rr);
  function C(A, x) {
    return d ? new Promise((I) => {
      f?.interpolate(x?.interpolate === "linear" ? Dt : ee).transform(Ve(d, x?.duration, x?.ease, () => I(!0)), A);
    }) : Promise.resolve(!1);
  }
  function O({ noWheelClassName: A, noPanClassName: x, onPaneContextMenu: I, userSelectionActive: h, panOnScroll: y, panOnDrag: p, panOnScrollMode: w, panOnScrollSpeed: S, preventScrolling: E, zoomOnPinch: $, zoomOnScroll: k, zoomOnDoubleClick: P, zoomActivationKeyPressed: X, lib: R, onTransformChange: H, connectionInProgress: G, paneClickDistance: L, selectionOnDrag: B }) {
    h && !u.isZoomingOrPanning && N();
    const J = y && !X && !h;
    f.clickDistance(B ? 1 / 0 : !on(L) || L < 0 ? 0 : L);
    const Tt = J ? xu({
      zoomPanValues: u,
      noWheelClassName: A,
      d3Selection: d,
      d3Zoom: f,
      panOnScrollMode: w,
      panOnScrollSpeed: S,
      zoomOnPinch: $,
      onPanZoomStart: s,
      onPanZoom: o,
      onPanZoomEnd: a
    }) : bu({
      noWheelClassName: A,
      preventScrolling: E,
      d3ZoomHandler: m
    });
    if (d.on("wheel.zoom", Tt, { passive: !1 }), !h) {
      const Ae = Nu({
        zoomPanValues: u,
        onDraggingChange: c,
        onPanZoomStart: s
      });
      f.on("start", Ae);
      const yt = Su({
        zoomPanValues: u,
        panOnDrag: p,
        onPaneContextMenu: !!I,
        onPanZoom: o,
        onTransformChange: H
      });
      f.on("zoom", yt);
      const Ie = Eu({
        zoomPanValues: u,
        panOnDrag: p,
        panOnScroll: y,
        onPaneContextMenu: I,
        onPanZoomEnd: a,
        onDraggingChange: c
      });
      f.on("end", Ie);
    }
    const At = $u({
      zoomActivationKeyPressed: X,
      panOnDrag: p,
      zoomOnScroll: k,
      panOnScroll: y,
      zoomOnDoubleClick: P,
      zoomOnPinch: $,
      userSelectionActive: h,
      noPanClassName: x,
      noWheelClassName: A,
      lib: R,
      connectionInProgress: G
    });
    f.filter(At), P ? d.on("dblclick.zoom", b) : d.on("dblclick.zoom", null);
  }
  function N() {
    f.on("zoom", null);
  }
  async function z(A, x, I) {
    const h = Fe(A), y = f?.constrain()(h, x, I);
    return y && await C(y), new Promise((p) => p(y));
  }
  async function T(A, x) {
    const I = Fe(A);
    return await C(I, x), new Promise((h) => h(I));
  }
  function g(A) {
    if (d) {
      const x = Fe(A), I = d.property("__zoom");
      (I.k !== A.zoom || I.x !== A.x || I.y !== A.y) && f?.transform(d, x, null, { sync: !0 });
    }
  }
  function _() {
    const A = d ? Tr(d.node()) : { x: 0, y: 0, k: 1 };
    return { x: A.x, y: A.y, zoom: A.k };
  }
  function v(A, x) {
    return d ? new Promise((I) => {
      f?.interpolate(x?.interpolate === "linear" ? Dt : ee).scaleTo(Ve(d, x?.duration, x?.ease, () => I(!0)), A);
    }) : Promise.resolve(!1);
  }
  function M(A, x) {
    return d ? new Promise((I) => {
      f?.interpolate(x?.interpolate === "linear" ? Dt : ee).scaleBy(Ve(d, x?.duration, x?.ease, () => I(!0)), A);
    }) : Promise.resolve(!1);
  }
  function W(A) {
    f?.scaleExtent(A);
  }
  function q(A) {
    f?.translateExtent(A);
  }
  function Z(A) {
    const x = !on(A) || A < 0 ? 0 : A;
    f?.clickDistance(x);
  }
  return {
    update: O,
    destroy: N,
    setViewport: T,
    setViewportConstrained: z,
    getViewport: _,
    scaleTo: v,
    scaleBy: M,
    setScaleExtent: W,
    setTranslateExtent: q,
    syncViewport: g,
    setClickDistance: Z
  };
}
var Zn;
(function(t) {
  t.Line = "line", t.Handle = "handle";
})(Zn || (Zn = {}));
function Tu() {
  return {
    nodes: Be([]),
    edges: Be([]),
    nodeLookup: /* @__PURE__ */ new Map(),
    parentLookup: /* @__PURE__ */ new Map(),
    nodeExtent: Ar,
    snapGrid: [15, 15],
    snapToGrid: !1,
    nodeOrigin: [0, 0],
    multiSelectionActive: !1,
    transform: Be([0, 0, 1]),
    autoPanOnNodeDrag: !0,
    nodesDraggable: !0,
    selectNodesOnDrag: !0,
    nodeDragThreshold: 0,
    panZoom: null,
    domNode: null
  };
}
var Au = Object.defineProperty, Iu = Object.getOwnPropertyDescriptor, Ce = (t, e, n, r) => {
  for (var i = r > 1 ? void 0 : r ? Iu(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (r ? s(e, n, i) : s(i)) || i);
  return r && i && Au(e, n, i), i;
};
let $t = class extends un(me) {
  constructor() {
    super(...arguments), this.label = "", this.type = "default", this.selected = !1;
  }
  render() {
    return Jt`
      ${this.type === "input" || this.type === "default" ? Jt`<lit-handle type="source" position="bottom"></lit-handle>` : ""}
      ${this.type === "output" || this.type === "default" ? Jt`<lit-handle type="target" position="top"></lit-handle>` : ""}
      <div class="label">${this.label}</div>
      <slot></slot>
    `;
  }
};
$t.styles = ge`
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
      border-color: #555;
      box-shadow: 0 0 0 0.5px #1a192b;
    }

    :host([type="input"]) {
      border-color: #0041d0;
    }

    :host([type="output"]) {
      border-color: #ff0072;
    }

    .label {
      font-size: 12px;
      color: #222;
    }
  `;
Ce([
  U({ type: String })
], $t.prototype, "label", 2);
Ce([
  U({ type: String, reflect: !0 })
], $t.prototype, "type", 2);
Ce([
  U({ type: Boolean, reflect: !0 })
], $t.prototype, "selected", 2);
$t = Ce([
  ye("lit-node")
], $t);
var ku = Object.defineProperty, Mu = Object.getOwnPropertyDescriptor, ft = (t, e, n, r) => {
  for (var i = r > 1 ? void 0 : r ? Mu(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (r ? s(e, n, i) : s(i)) || i);
  return r && i && ku(e, n, i), i;
};
let ot = class extends un(me) {
  constructor() {
    super(...arguments), this.sourceX = 0, this.sourceY = 0, this.targetX = 0, this.targetY = 0, this.sourcePosition = D.Right, this.targetPosition = D.Left, this.selected = !1;
  }
  render() {
    const [t] = lu({
      sourceX: this.sourceX,
      sourceY: this.sourceY,
      sourcePosition: this.sourcePosition,
      targetX: this.targetX,
      targetY: this.targetY,
      targetPosition: this.targetPosition
    });
    return Xr`
      <path d="${t}" />
    `;
  }
};
ot.styles = ge`
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
ft([
  U({ type: Number })
], ot.prototype, "sourceX", 2);
ft([
  U({ type: Number })
], ot.prototype, "sourceY", 2);
ft([
  U({ type: Number })
], ot.prototype, "targetX", 2);
ft([
  U({ type: Number })
], ot.prototype, "targetY", 2);
ft([
  U({ type: String })
], ot.prototype, "sourcePosition", 2);
ft([
  U({ type: String })
], ot.prototype, "targetPosition", 2);
ft([
  U({ type: Boolean, reflect: !0 })
], ot.prototype, "selected", 2);
ot = ft([
  ye("lit-edge")
], ot);
var Pu = Object.defineProperty, Ou = Object.getOwnPropertyDescriptor, ht = (t, e, n, r) => {
  for (var i = r > 1 ? void 0 : r ? Ou(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (r ? s(e, n, i) : s(i)) || i);
  return r && i && Pu(e, n, i), i;
};
let st = class extends un(me) {
  constructor() {
    super(...arguments), this._drags = /* @__PURE__ */ new Map(), this._state = Tu(), this.nodeTypes = {
      default: "lit-node",
      input: "lit-node",
      output: "lit-node"
    }, this.viewport = { x: 0, y: 0, zoom: 1 };
  }
  set nodes(t) {
    this._state.nodes.set(t), Vn(t, this._state.nodeLookup, this._state.parentLookup, {
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
        if (e.target !== this._renderer) {
          const n = e.target.dataset.id;
          n && this._updateNodeDimensions(n, e.target);
        }
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._resizeObserver?.disconnect();
  }
  _updateNodeDimensions(t, e) {
    const n = this._state.nodeLookup.get(t);
    if (n) {
      const { width: r, height: i } = e.getBoundingClientRect(), o = this._state.transform.get()[2];
      n.measured = {
        width: r / o,
        height: i / o
      };
      const s = e.shadowRoot?.querySelectorAll("lit-handle");
      if (s) {
        const a = [], c = [];
        s.forEach((u) => {
          const l = u.getBoundingClientRect(), f = e.getBoundingClientRect(), d = {
            id: u.handleId || null,
            type: u.type,
            position: u.position,
            x: (l.left - f.left) / o,
            y: (l.top - f.top) / o,
            width: l.width / o,
            height: l.height / o
          };
          u.type === "source" ? a.push(d) : c.push(d);
        }), n.internals.handleBounds = {
          source: a,
          target: c
        };
      }
      Vn(this.nodes, this._state.nodeLookup, this._state.parentLookup, {
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
    }, this._panZoom = Cu({
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
      panOnScrollMode: bt.Free,
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
        const r = wu({
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
  render() {
    const t = this._state.transform.get();
    return ke`
      <div class="xyflow__renderer">
        <div
          class="xyflow__viewport"
          style="transform: translate(${t[0]}px, ${t[1]}px) scale(${t[2]})"
        >
          <svg class="xyflow__edges">
            ${this.edges.map((e) => {
      const n = this._state.nodeLookup.get(e.source), r = this._state.nodeLookup.get(e.target);
      if (!n || !r) return null;
      const i = (n.internals.handleBounds?.source || []).find(
        (c) => c.id === (e.sourceHandle || null)
      ) || n.internals.handleBounds?.source?.[0], o = (r.internals.handleBounds?.target || []).find(
        (c) => c.id === (e.targetHandle || null)
      ) || r.internals.handleBounds?.target?.[0];
      if (!i || !o) return null;
      const s = Fn(n, i, i.position, !0), a = Fn(r, o, o.position, !0);
      return ke`
                <lit-edge
                  .sourceX="${s.x}"
                  .sourceY="${s.y}"
                  .targetX="${a.x}"
                  .targetY="${a.y}"
                  .sourcePosition="${i.position}"
                  .targetPosition="${o.position}"
                  ?selected="${e.selected}"
                ></lit-edge>
              `;
    })}
          </svg>
          <div class="xyflow__nodes">
            ${this.nodes.map((e) => {
      const r = this._state.nodeLookup.get(e.id)?.position || e.position, i = this.nodeTypes[e.type || "default"] || this.nodeTypes.default, o = qr(i);
      return ke`
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
    `;
  }
};
st.styles = ge`
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
ht([
  Gn(".xyflow__renderer")
], st.prototype, "_renderer", 2);
ht([
  Gn(".xyflow__viewport")
], st.prototype, "_viewport", 2);
ht([
  Lr()
], st.prototype, "_state", 2);
ht([
  U({ type: Object })
], st.prototype, "nodeTypes", 2);
ht([
  U({ type: Array })
], st.prototype, "nodes", 1);
ht([
  U({ type: Array })
], st.prototype, "edges", 1);
ht([
  U({ type: Object })
], st.prototype, "viewport", 2);
st = ht([
  ye("lit-flow")
], st);
var Du = Object.defineProperty, zu = Object.getOwnPropertyDescriptor, Te = (t, e, n, r) => {
  for (var i = r > 1 ? void 0 : r ? zu(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (r ? s(e, n, i) : s(i)) || i);
  return r && i && Du(e, n, i), i;
};
let Ct = class extends me {
  constructor() {
    super(...arguments), this.type = "source", this.position = D.Top;
  }
  render() {
    return Jt``;
  }
};
Ct.styles = ge`
    :host {
      position: absolute;
      width: 8px;
      height: 8px;
      background: #555;
      border: 1px solid white;
      border-radius: 50%;
      z-index: 10;
      pointer-events: all;
      cursor: crosshair;
    }

    :host([type="source"]) {
      background: #555;
    }

    :host([type="target"]) {
      background: #555;
    }

    :host([position="top"]) {
      top: -4px;
      left: 50%;
      transform: translateX(-50%);
    }

    :host([position="bottom"]) {
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%);
    }

    :host([position="left"]) {
      left: -4px;
      top: 50%;
      transform: translateY(-50%);
    }

    :host([position="right"]) {
      right: -4px;
      top: 50%;
      transform: translateY(-50%);
    }
  `;
Te([
  U({ type: String, reflect: !0 })
], Ct.prototype, "type", 2);
Te([
  U({ type: String, reflect: !0 })
], Ct.prototype, "position", 2);
Te([
  U({ type: String })
], Ct.prototype, "handleId", 2);
Ct = Te([
  ye("lit-handle")
], Ct);
