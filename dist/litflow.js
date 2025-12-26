import { css as te, html as Tt, LitElement as Ht, svg as $e } from "lit";
import { unsafeStatic as go, html as ue } from "lit/static-html.js";
import { property as X, customElement as Bt, query as pr, state as ee } from "lit/decorators.js";
import { directive as yo } from "lit/directive.js";
import { AsyncDirective as xo } from "lit/async-directive.js";
import "lit/html.js";
var wo = Object.defineProperty, _o = (t, e, n) => e in t ? wo(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, qe = (t, e, n) => (_o(t, typeof e != "symbol" ? e + "" : e, n), n), vo = (t, e, n) => {
  if (!e.has(t))
    throw TypeError("Cannot " + n);
}, Fe = (t, e) => {
  if (Object(e) !== e)
    throw TypeError('Cannot use the "in" operator on this value');
  return t.has(e);
}, ce = (t, e, n) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, n);
}, Dn = (t, e, n) => (vo(t, e, "access private method"), n);
function mr(t, e) {
  return Object.is(t, e);
}
let Z = null, Ft = !1, ye = 1;
const Ne = /* @__PURE__ */ Symbol("SIGNAL");
function St(t) {
  const e = Z;
  return Z = t, e;
}
function bo() {
  return Z;
}
function $o() {
  return Ft;
}
const vn = {
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
function Oe(t) {
  if (Ft)
    throw new Error(
      typeof ngDevMode < "u" && ngDevMode ? "Assertion error: signal read during notification phase" : ""
    );
  if (Z === null)
    return;
  Z.consumerOnSignalRead(t);
  const e = Z.nextProducerIndex++;
  if (kt(Z), e < Z.producerNode.length && Z.producerNode[e] !== t && an(Z)) {
    const n = Z.producerNode[e];
    ze(n, Z.producerIndexOfThis[e]);
  }
  Z.producerNode[e] !== t && (Z.producerNode[e] = t, Z.producerIndexOfThis[e] = an(Z) ? xr(t, Z, e) : 0), Z.producerLastReadVersion[e] = t.version;
}
function No() {
  ye++;
}
function gr(t) {
  if (!(!t.dirty && t.lastCleanEpoch === ye)) {
    if (!t.producerMustRecompute(t) && !Io(t)) {
      t.dirty = !1, t.lastCleanEpoch = ye;
      return;
    }
    t.producerRecomputeValue(t), t.dirty = !1, t.lastCleanEpoch = ye;
  }
}
function yr(t) {
  if (t.liveConsumerNode === void 0)
    return;
  const e = Ft;
  Ft = !0;
  try {
    for (const n of t.liveConsumerNode)
      n.dirty || So(n);
  } finally {
    Ft = e;
  }
}
function Eo() {
  return Z?.consumerAllowSignalWrites !== !1;
}
function So(t) {
  var e;
  t.dirty = !0, yr(t), (e = t.consumerMarkedDirty) == null || e.call(t.wrapper ?? t);
}
function Co(t) {
  return t && (t.nextProducerIndex = 0), St(t);
}
function To(t, e) {
  if (St(e), !(!t || t.producerNode === void 0 || t.producerIndexOfThis === void 0 || t.producerLastReadVersion === void 0)) {
    if (an(t))
      for (let n = t.nextProducerIndex; n < t.producerNode.length; n++)
        ze(t.producerNode[n], t.producerIndexOfThis[n]);
    for (; t.producerNode.length > t.nextProducerIndex; )
      t.producerNode.pop(), t.producerLastReadVersion.pop(), t.producerIndexOfThis.pop();
  }
}
function Io(t) {
  kt(t);
  for (let e = 0; e < t.producerNode.length; e++) {
    const n = t.producerNode[e], r = t.producerLastReadVersion[e];
    if (r !== n.version || (gr(n), r !== n.version))
      return !0;
  }
  return !1;
}
function xr(t, e, n) {
  var r;
  if (bn(t), kt(t), t.liveConsumerNode.length === 0) {
    (r = t.watched) == null || r.call(t.wrapper);
    for (let o = 0; o < t.producerNode.length; o++)
      t.producerIndexOfThis[o] = xr(t.producerNode[o], t, o);
  }
  return t.liveConsumerIndexOfThis.push(n), t.liveConsumerNode.push(e) - 1;
}
function ze(t, e) {
  var n;
  if (bn(t), kt(t), typeof ngDevMode < "u" && ngDevMode && e >= t.liveConsumerNode.length)
    throw new Error(
      `Assertion error: active consumer index ${e} is out of bounds of ${t.liveConsumerNode.length} consumers)`
    );
  if (t.liveConsumerNode.length === 1) {
    (n = t.unwatched) == null || n.call(t.wrapper);
    for (let o = 0; o < t.producerNode.length; o++)
      ze(t.producerNode[o], t.producerIndexOfThis[o]);
  }
  const r = t.liveConsumerNode.length - 1;
  if (t.liveConsumerNode[e] = t.liveConsumerNode[r], t.liveConsumerIndexOfThis[e] = t.liveConsumerIndexOfThis[r], t.liveConsumerNode.length--, t.liveConsumerIndexOfThis.length--, e < t.liveConsumerNode.length) {
    const o = t.liveConsumerIndexOfThis[e], i = t.liveConsumerNode[e];
    kt(i), i.producerIndexOfThis[o] = e;
  }
}
function an(t) {
  var e;
  return t.consumerIsAlwaysLive || (((e = t?.liveConsumerNode) == null ? void 0 : e.length) ?? 0) > 0;
}
function kt(t) {
  t.producerNode ?? (t.producerNode = []), t.producerIndexOfThis ?? (t.producerIndexOfThis = []), t.producerLastReadVersion ?? (t.producerLastReadVersion = []);
}
function bn(t) {
  t.liveConsumerNode ?? (t.liveConsumerNode = []), t.liveConsumerIndexOfThis ?? (t.liveConsumerIndexOfThis = []);
}
function wr(t) {
  if (gr(t), Oe(t), t.value === un)
    throw t.error;
  return t.value;
}
function Mo(t) {
  const e = Object.create(Po);
  e.computation = t;
  const n = () => wr(e);
  return n[Ne] = e, n;
}
const Ze = /* @__PURE__ */ Symbol("UNSET"), Ge = /* @__PURE__ */ Symbol("COMPUTING"), un = /* @__PURE__ */ Symbol("ERRORED"), Po = {
  ...vn,
  value: Ze,
  dirty: !0,
  error: null,
  equal: mr,
  producerMustRecompute(t) {
    return t.value === Ze || t.value === Ge;
  },
  producerRecomputeValue(t) {
    if (t.value === Ge)
      throw new Error("Detected cycle in computations.");
    const e = t.value;
    t.value = Ge;
    const n = Co(t);
    let r, o = !1;
    try {
      r = t.computation.call(t.wrapper), o = e !== Ze && e !== un && t.equal.call(t.wrapper, e, r);
    } catch (i) {
      r = un, t.error = i;
    } finally {
      To(t, n);
    }
    if (o) {
      t.value = e;
      return;
    }
    t.value = r, t.version++;
  }
};
function ko() {
  throw new Error();
}
let Ao = ko;
function Oo() {
  Ao();
}
function zo(t) {
  const e = Object.create(Ho);
  e.value = t;
  const n = () => (Oe(e), e.value);
  return n[Ne] = e, n;
}
function Do() {
  return Oe(this), this.value;
}
function Ro(t, e) {
  Eo() || Oo(), t.equal.call(t.wrapper, t.value, e) || (t.value = e, Bo(t));
}
const Ho = {
  ...vn,
  equal: mr,
  value: void 0
};
function Bo(t) {
  t.version++, No(), yr(t);
}
const K = /* @__PURE__ */ Symbol("node");
var G;
((t) => {
  var e, n, r, o;
  class i {
    constructor(l, u = {}) {
      ce(this, n), qe(this, e);
      const f = zo(l)[Ne];
      if (this[K] = f, f.wrapper = this, u) {
        const h = u.equals;
        h && (f.equal = h), f.watched = u[t.subtle.watched], f.unwatched = u[t.subtle.unwatched];
      }
    }
    get() {
      if (!(0, t.isState)(this))
        throw new TypeError("Wrong receiver type for Signal.State.prototype.get");
      return Do.call(this[K]);
    }
    set(l) {
      if (!(0, t.isState)(this))
        throw new TypeError("Wrong receiver type for Signal.State.prototype.set");
      if ($o())
        throw new Error("Writes to signals not permitted during Watcher callback");
      const u = this[K];
      Ro(u, l);
    }
  }
  e = K, n = /* @__PURE__ */ new WeakSet(), t.isState = (a) => typeof a == "object" && Fe(n, a), t.State = i;
  class s {
    // Create a Signal which evaluates to the value returned by the callback.
    // Callback is called with this signal as the parameter.
    constructor(l, u) {
      ce(this, o), qe(this, r);
      const f = Mo(l)[Ne];
      if (f.consumerAllowSignalWrites = !0, this[K] = f, f.wrapper = this, u) {
        const h = u.equals;
        h && (f.equal = h), f.watched = u[t.subtle.watched], f.unwatched = u[t.subtle.unwatched];
      }
    }
    get() {
      if (!(0, t.isComputed)(this))
        throw new TypeError("Wrong receiver type for Signal.Computed.prototype.get");
      return wr(this[K]);
    }
  }
  r = K, o = /* @__PURE__ */ new WeakSet(), t.isComputed = (a) => typeof a == "object" && Fe(o, a), t.Computed = s, ((a) => {
    var l, u, c, f;
    function h(w) {
      let p, x = null;
      try {
        x = St(null), p = w();
      } finally {
        St(x);
      }
      return p;
    }
    a.untrack = h;
    function g(w) {
      var p;
      if (!(0, t.isComputed)(w) && !(0, t.isWatcher)(w))
        throw new TypeError("Called introspectSources without a Computed or Watcher argument");
      return ((p = w[K].producerNode) == null ? void 0 : p.map((x) => x.wrapper)) ?? [];
    }
    a.introspectSources = g;
    function _(w) {
      var p;
      if (!(0, t.isComputed)(w) && !(0, t.isState)(w))
        throw new TypeError("Called introspectSinks without a Signal argument");
      return ((p = w[K].liveConsumerNode) == null ? void 0 : p.map((x) => x.wrapper)) ?? [];
    }
    a.introspectSinks = _;
    function N(w) {
      if (!(0, t.isComputed)(w) && !(0, t.isState)(w))
        throw new TypeError("Called hasSinks without a Signal argument");
      const p = w[K].liveConsumerNode;
      return p ? p.length > 0 : !1;
    }
    a.hasSinks = N;
    function M(w) {
      if (!(0, t.isComputed)(w) && !(0, t.isWatcher)(w))
        throw new TypeError("Called hasSources without a Computed or Watcher argument");
      const p = w[K].producerNode;
      return p ? p.length > 0 : !1;
    }
    a.hasSources = M;
    class $ {
      // When a (recursive) source of Watcher is written to, call this callback,
      // if it hasn't already been called since the last `watch` call.
      // No signals may be read or written during the notify.
      constructor(p) {
        ce(this, u), ce(this, c), qe(this, l);
        let x = Object.create(vn);
        x.wrapper = this, x.consumerMarkedDirty = p, x.consumerIsAlwaysLive = !0, x.consumerAllowSignalWrites = !1, x.producerNode = [], this[K] = x;
      }
      // Add these signals to the Watcher's set, and set the watcher to run its
      // notify callback next time any signal in the set (or one of its dependencies) changes.
      // Can be called with no arguments just to reset the "notified" state, so that
      // the notify callback will be invoked again.
      watch(...p) {
        if (!(0, t.isWatcher)(this))
          throw new TypeError("Called unwatch without Watcher receiver");
        Dn(this, c, f).call(this, p);
        const x = this[K];
        x.dirty = !1;
        const v = St(x);
        for (const I of p)
          Oe(I[K]);
        St(v);
      }
      // Remove these signals from the watched set (e.g., for an effect which is disposed)
      unwatch(...p) {
        if (!(0, t.isWatcher)(this))
          throw new TypeError("Called unwatch without Watcher receiver");
        Dn(this, c, f).call(this, p);
        const x = this[K];
        kt(x);
        for (let v = x.producerNode.length - 1; v >= 0; v--)
          if (p.includes(x.producerNode[v].wrapper)) {
            ze(x.producerNode[v], x.producerIndexOfThis[v]);
            const I = x.producerNode.length - 1;
            if (x.producerNode[v] = x.producerNode[I], x.producerIndexOfThis[v] = x.producerIndexOfThis[I], x.producerNode.length--, x.producerIndexOfThis.length--, x.nextProducerIndex--, v < x.producerNode.length) {
              const R = x.producerIndexOfThis[v], z = x.producerNode[v];
              bn(z), z.liveConsumerIndexOfThis[R] = v;
            }
          }
      }
      // Returns the set of computeds in the Watcher's set which are still yet
      // to be re-evaluated
      getPending() {
        if (!(0, t.isWatcher)(this))
          throw new TypeError("Called getPending without Watcher receiver");
        return this[K].producerNode.filter((x) => x.dirty).map((x) => x.wrapper);
      }
    }
    l = K, u = /* @__PURE__ */ new WeakSet(), c = /* @__PURE__ */ new WeakSet(), f = function(w) {
      for (const p of w)
        if (!(0, t.isComputed)(p) && !(0, t.isState)(p))
          throw new TypeError("Called watch/unwatch without a Computed or State argument");
    }, t.isWatcher = (w) => Fe(u, w), a.Watcher = $;
    function A() {
      var w;
      return (w = bo()) == null ? void 0 : w.wrapper;
    }
    a.currentComputed = A, a.watched = /* @__PURE__ */ Symbol("watched"), a.unwatched = /* @__PURE__ */ Symbol("unwatched");
  })(t.subtle || (t.subtle = {}));
})(G || (G = {}));
let Ue = !1;
const Rn = new G.subtle.Watcher(() => {
  Ue || (Ue = !0, queueMicrotask(() => {
    Ue = !1;
    for (const t of Rn.getPending()) t.get();
    Rn.watch();
  }));
}), Lo = /* @__PURE__ */ Symbol("SignalWatcherBrand"), Vo = new FinalizationRegistry((t) => {
  t.unwatch(...G.subtle.introspectSources(t));
}), Hn = /* @__PURE__ */ new WeakMap();
function ne(t) {
  return t[Lo] === !0 ? (console.warn("SignalWatcher should not be applied to the same class more than once."), t) : class extends t {
    constructor() {
      super(...arguments), this._$St = /* @__PURE__ */ new Map(), this._$So = new G.State(0), this._$Si = !1;
    }
    _$Sl() {
      var e, n;
      const r = [], o = [];
      this._$St.forEach((s, a) => {
        (s?.beforeUpdate ? r : o).push(a);
      });
      const i = (e = this.h) === null || e === void 0 ? void 0 : e.getPending().filter((s) => s !== this._$Su && !this._$St.has(s));
      r.forEach((s) => s.get()), (n = this._$Su) === null || n === void 0 || n.get(), i.forEach((s) => s.get()), o.forEach((s) => s.get());
    }
    _$Sv() {
      this.isUpdatePending || queueMicrotask(() => {
        this.isUpdatePending || this._$Sl();
      });
    }
    _$S_() {
      if (this.h !== void 0) return;
      this._$Su = new G.Computed(() => {
        this._$So.get(), super.performUpdate();
      });
      const e = this.h = new G.subtle.Watcher(function() {
        const n = Hn.get(this);
        n !== void 0 && (n._$Si === !1 && (new Set(this.getPending()).has(n._$Su) ? n.requestUpdate() : n._$Sv()), this.watch());
      });
      Hn.set(e, this), Vo.register(this, e), e.watch(this._$Su), e.watch(...Array.from(this._$St).map(([n]) => n));
    }
    _$Sp() {
      if (this.h === void 0) return;
      let e = !1;
      this.h.unwatch(...G.subtle.introspectSources(this.h).filter((n) => {
        var r;
        const o = ((r = this._$St.get(n)) === null || r === void 0 ? void 0 : r.manualDispose) !== !0;
        return o && this._$St.delete(n), e || (e = !o), o;
      })), e || (this._$Su = void 0, this.h = void 0, this._$St.clear());
    }
    updateEffect(e, n) {
      var r;
      this._$S_();
      const o = new G.Computed(() => {
        e();
      });
      return this.h.watch(o), this._$St.set(o, n), (r = n?.beforeUpdate) !== null && r !== void 0 && r ? G.subtle.untrack(() => o.get()) : this.updateComplete.then(() => G.subtle.untrack(() => o.get())), () => {
        this._$St.delete(o), this.h.unwatch(o), this.isConnected === !1 && this._$Sp();
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
let Ke = !1;
const cn = new G.subtle.Watcher(async () => {
  Ke || (Ke = !0, queueMicrotask(() => {
    Ke = !1;
    for (const t of cn.getPending()) t.get();
    cn.watch();
  }));
});
let Xo = class extends xo {
  _$S_() {
    var e, n;
    this._$Sm === void 0 && (this._$Sj = new G.Computed(() => {
      var r;
      const o = (r = this._$SW) === null || r === void 0 ? void 0 : r.get();
      return this.setValue(o), o;
    }), this._$Sm = (n = (e = this._$Sk) === null || e === void 0 ? void 0 : e.h) !== null && n !== void 0 ? n : cn, this._$Sm.watch(this._$Sj), G.subtle.untrack(() => {
      var r;
      return (r = this._$Sj) === null || r === void 0 ? void 0 : r.get();
    }));
  }
  _$Sp() {
    this._$Sm !== void 0 && (this._$Sm.unwatch(this._$SW), this._$Sm = void 0);
  }
  render(e) {
    return G.subtle.untrack(() => e.get());
  }
  update(e, [n]) {
    var r, o;
    return (r = this._$Sk) !== null && r !== void 0 || (this._$Sk = (o = e.options) === null || o === void 0 ? void 0 : o.host), n !== this._$SW && this._$SW !== void 0 && this._$Sp(), this._$SW = n, this._$S_(), G.subtle.untrack(() => this._$SW.get());
  }
  disconnected() {
    this._$Sp();
  }
  reconnected() {
    this._$S_();
  }
};
yo(Xo);
G.State;
G.Computed;
const le = (t, e) => new G.State(t, e);
var Yo = { value: () => {
} };
function De() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new xe(n);
}
function xe(t) {
  this._ = t;
}
function Wo(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", o = n.indexOf(".");
    if (o >= 0 && (r = n.slice(o + 1), n = n.slice(0, o)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
xe.prototype = De.prototype = {
  constructor: xe,
  on: function(t, e) {
    var n = this._, r = Wo(t + "", n), o, i = -1, s = r.length;
    if (arguments.length < 2) {
      for (; ++i < s; ) if ((o = (t = r[i]).type) && (o = qo(n[o], t.name))) return o;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++i < s; )
      if (o = (t = r[i]).type) n[o] = Bn(n[o], t.name, e);
      else if (e == null) for (o in n) n[o] = Bn(n[o], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new xe(t);
  },
  call: function(t, e) {
    if ((o = arguments.length - 2) > 0) for (var n = new Array(o), r = 0, o, i; r < o; ++r) n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (i = this._[t], r = 0, o = i.length; r < o; ++r) i[r].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var r = this._[t], o = 0, i = r.length; o < i; ++o) r[o].value.apply(e, n);
  }
};
function qo(t, e) {
  for (var n = 0, r = t.length, o; n < r; ++n)
    if ((o = t[n]).name === e)
      return o.value;
}
function Bn(t, e, n) {
  for (var r = 0, o = t.length; r < o; ++r)
    if (t[r].name === e) {
      t[r] = Yo, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var ln = "http://www.w3.org/1999/xhtml";
const Ln = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: ln,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Re(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), Ln.hasOwnProperty(e) ? { space: Ln[e], local: t } : t;
}
function Fo(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === ln && e.documentElement.namespaceURI === ln ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function Zo(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function _r(t) {
  var e = Re(t);
  return (e.local ? Zo : Fo)(e);
}
function Go() {
}
function $n(t) {
  return t == null ? Go : function() {
    return this.querySelector(t);
  };
}
function Uo(t) {
  typeof t != "function" && (t = $n(t));
  for (var e = this._groups, n = e.length, r = new Array(n), o = 0; o < n; ++o)
    for (var i = e[o], s = i.length, a = r[o] = new Array(s), l, u, c = 0; c < s; ++c)
      (l = i[c]) && (u = t.call(l, l.__data__, c, i)) && ("__data__" in l && (u.__data__ = l.__data__), a[c] = u);
  return new et(r, this._parents);
}
function Ko(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Qo() {
  return [];
}
function vr(t) {
  return t == null ? Qo : function() {
    return this.querySelectorAll(t);
  };
}
function Jo(t) {
  return function() {
    return Ko(t.apply(this, arguments));
  };
}
function jo(t) {
  typeof t == "function" ? t = Jo(t) : t = vr(t);
  for (var e = this._groups, n = e.length, r = [], o = [], i = 0; i < n; ++i)
    for (var s = e[i], a = s.length, l, u = 0; u < a; ++u)
      (l = s[u]) && (r.push(t.call(l, l.__data__, u, s)), o.push(l));
  return new et(r, o);
}
function br(t) {
  return function() {
    return this.matches(t);
  };
}
function $r(t) {
  return function(e) {
    return e.matches(t);
  };
}
var ti = Array.prototype.find;
function ei(t) {
  return function() {
    return ti.call(this.children, t);
  };
}
function ni() {
  return this.firstElementChild;
}
function ri(t) {
  return this.select(t == null ? ni : ei(typeof t == "function" ? t : $r(t)));
}
var oi = Array.prototype.filter;
function ii() {
  return Array.from(this.children);
}
function si(t) {
  return function() {
    return oi.call(this.children, t);
  };
}
function ai(t) {
  return this.selectAll(t == null ? ii : si(typeof t == "function" ? t : $r(t)));
}
function ui(t) {
  typeof t != "function" && (t = br(t));
  for (var e = this._groups, n = e.length, r = new Array(n), o = 0; o < n; ++o)
    for (var i = e[o], s = i.length, a = r[o] = [], l, u = 0; u < s; ++u)
      (l = i[u]) && t.call(l, l.__data__, u, i) && a.push(l);
  return new et(r, this._parents);
}
function Nr(t) {
  return new Array(t.length);
}
function ci() {
  return new et(this._enter || this._groups.map(Nr), this._parents);
}
function Ee(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
Ee.prototype = {
  constructor: Ee,
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
function li(t) {
  return function() {
    return t;
  };
}
function fi(t, e, n, r, o, i) {
  for (var s = 0, a, l = e.length, u = i.length; s < u; ++s)
    (a = e[s]) ? (a.__data__ = i[s], r[s] = a) : n[s] = new Ee(t, i[s]);
  for (; s < l; ++s)
    (a = e[s]) && (o[s] = a);
}
function hi(t, e, n, r, o, i, s) {
  var a, l, u = /* @__PURE__ */ new Map(), c = e.length, f = i.length, h = new Array(c), g;
  for (a = 0; a < c; ++a)
    (l = e[a]) && (h[a] = g = s.call(l, l.__data__, a, e) + "", u.has(g) ? o[a] = l : u.set(g, l));
  for (a = 0; a < f; ++a)
    g = s.call(t, i[a], a, i) + "", (l = u.get(g)) ? (r[a] = l, l.__data__ = i[a], u.delete(g)) : n[a] = new Ee(t, i[a]);
  for (a = 0; a < c; ++a)
    (l = e[a]) && u.get(h[a]) === l && (o[a] = l);
}
function di(t) {
  return t.__data__;
}
function pi(t, e) {
  if (!arguments.length) return Array.from(this, di);
  var n = e ? hi : fi, r = this._parents, o = this._groups;
  typeof t != "function" && (t = li(t));
  for (var i = o.length, s = new Array(i), a = new Array(i), l = new Array(i), u = 0; u < i; ++u) {
    var c = r[u], f = o[u], h = f.length, g = mi(t.call(c, c && c.__data__, u, r)), _ = g.length, N = a[u] = new Array(_), M = s[u] = new Array(_), $ = l[u] = new Array(h);
    n(c, f, N, M, $, g, e);
    for (var A = 0, w = 0, p, x; A < _; ++A)
      if (p = N[A]) {
        for (A >= w && (w = A + 1); !(x = M[w]) && ++w < _; ) ;
        p._next = x || null;
      }
  }
  return s = new et(s, r), s._enter = a, s._exit = l, s;
}
function mi(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function gi() {
  return new et(this._exit || this._groups.map(Nr), this._parents);
}
function yi(t, e, n) {
  var r = this.enter(), o = this, i = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (o = e(o), o && (o = o.selection())), n == null ? i.remove() : n(i), r && o ? r.merge(o).order() : o;
}
function xi(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, o = n.length, i = r.length, s = Math.min(o, i), a = new Array(o), l = 0; l < s; ++l)
    for (var u = n[l], c = r[l], f = u.length, h = a[l] = new Array(f), g, _ = 0; _ < f; ++_)
      (g = u[_] || c[_]) && (h[_] = g);
  for (; l < o; ++l)
    a[l] = n[l];
  return new et(a, this._parents);
}
function wi() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], o = r.length - 1, i = r[o], s; --o >= 0; )
      (s = r[o]) && (i && s.compareDocumentPosition(i) ^ 4 && i.parentNode.insertBefore(s, i), i = s);
  return this;
}
function _i(t) {
  t || (t = vi);
  function e(f, h) {
    return f && h ? t(f.__data__, h.__data__) : !f - !h;
  }
  for (var n = this._groups, r = n.length, o = new Array(r), i = 0; i < r; ++i) {
    for (var s = n[i], a = s.length, l = o[i] = new Array(a), u, c = 0; c < a; ++c)
      (u = s[c]) && (l[c] = u);
    l.sort(e);
  }
  return new et(o, this._parents).order();
}
function vi(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function bi() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function $i() {
  return Array.from(this);
}
function Ni() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], o = 0, i = r.length; o < i; ++o) {
      var s = r[o];
      if (s) return s;
    }
  return null;
}
function Ei() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function Si() {
  return !this.node();
}
function Ci(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var o = e[n], i = 0, s = o.length, a; i < s; ++i)
      (a = o[i]) && t.call(a, a.__data__, i, o);
  return this;
}
function Ti(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Ii(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Mi(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Pi(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function ki(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function Ai(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function Oi(t, e) {
  var n = Re(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? Ii : Ti : typeof e == "function" ? n.local ? Ai : ki : n.local ? Pi : Mi)(n, e));
}
function Er(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function zi(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Di(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function Ri(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function Hi(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? zi : typeof e == "function" ? Ri : Di)(t, e, n ?? "")) : At(this.node(), t);
}
function At(t, e) {
  return t.style.getPropertyValue(e) || Er(t).getComputedStyle(t, null).getPropertyValue(e);
}
function Bi(t) {
  return function() {
    delete this[t];
  };
}
function Li(t, e) {
  return function() {
    this[t] = e;
  };
}
function Vi(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function Xi(t, e) {
  return arguments.length > 1 ? this.each((e == null ? Bi : typeof e == "function" ? Vi : Li)(t, e)) : this.node()[t];
}
function Sr(t) {
  return t.trim().split(/^|\s+/);
}
function Nn(t) {
  return t.classList || new Cr(t);
}
function Cr(t) {
  this._node = t, this._names = Sr(t.getAttribute("class") || "");
}
Cr.prototype = {
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
function Tr(t, e) {
  for (var n = Nn(t), r = -1, o = e.length; ++r < o; ) n.add(e[r]);
}
function Ir(t, e) {
  for (var n = Nn(t), r = -1, o = e.length; ++r < o; ) n.remove(e[r]);
}
function Yi(t) {
  return function() {
    Tr(this, t);
  };
}
function Wi(t) {
  return function() {
    Ir(this, t);
  };
}
function qi(t, e) {
  return function() {
    (e.apply(this, arguments) ? Tr : Ir)(this, t);
  };
}
function Fi(t, e) {
  var n = Sr(t + "");
  if (arguments.length < 2) {
    for (var r = Nn(this.node()), o = -1, i = n.length; ++o < i; ) if (!r.contains(n[o])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? qi : e ? Yi : Wi)(n, e));
}
function Zi() {
  this.textContent = "";
}
function Gi(t) {
  return function() {
    this.textContent = t;
  };
}
function Ui(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function Ki(t) {
  return arguments.length ? this.each(t == null ? Zi : (typeof t == "function" ? Ui : Gi)(t)) : this.node().textContent;
}
function Qi() {
  this.innerHTML = "";
}
function Ji(t) {
  return function() {
    this.innerHTML = t;
  };
}
function ji(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function ts(t) {
  return arguments.length ? this.each(t == null ? Qi : (typeof t == "function" ? ji : Ji)(t)) : this.node().innerHTML;
}
function es() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function ns() {
  return this.each(es);
}
function rs() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function os() {
  return this.each(rs);
}
function is(t) {
  var e = typeof t == "function" ? t : _r(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function ss() {
  return null;
}
function as(t, e) {
  var n = typeof t == "function" ? t : _r(t), r = e == null ? ss : typeof e == "function" ? e : $n(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function us() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function cs() {
  return this.each(us);
}
function ls() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function fs() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function hs(t) {
  return this.select(t ? fs : ls);
}
function ds(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function ps(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function ms(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function gs(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, o = e.length, i; n < o; ++n)
        i = e[n], (!t.type || i.type === t.type) && i.name === t.name ? this.removeEventListener(i.type, i.listener, i.options) : e[++r] = i;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function ys(t, e, n) {
  return function() {
    var r = this.__on, o, i = ps(e);
    if (r) {
      for (var s = 0, a = r.length; s < a; ++s)
        if ((o = r[s]).type === t.type && o.name === t.name) {
          this.removeEventListener(o.type, o.listener, o.options), this.addEventListener(o.type, o.listener = i, o.options = n), o.value = e;
          return;
        }
    }
    this.addEventListener(t.type, i, n), o = { type: t.type, name: t.name, value: e, listener: i, options: n }, r ? r.push(o) : this.__on = [o];
  };
}
function xs(t, e, n) {
  var r = ms(t + ""), o, i = r.length, s;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var l = 0, u = a.length, c; l < u; ++l)
        for (o = 0, c = a[l]; o < i; ++o)
          if ((s = r[o]).type === c.type && s.name === c.name)
            return c.value;
    }
    return;
  }
  for (a = e ? ys : gs, o = 0; o < i; ++o) this.each(a(r[o], e, n));
  return this;
}
function Mr(t, e, n) {
  var r = Er(t), o = r.CustomEvent;
  typeof o == "function" ? o = new o(e, n) : (o = r.document.createEvent("Event"), n ? (o.initEvent(e, n.bubbles, n.cancelable), o.detail = n.detail) : o.initEvent(e, !1, !1)), t.dispatchEvent(o);
}
function ws(t, e) {
  return function() {
    return Mr(this, t, e);
  };
}
function _s(t, e) {
  return function() {
    return Mr(this, t, e.apply(this, arguments));
  };
}
function vs(t, e) {
  return this.each((typeof e == "function" ? _s : ws)(t, e));
}
function* bs() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], o = 0, i = r.length, s; o < i; ++o)
      (s = r[o]) && (yield s);
}
var Pr = [null];
function et(t, e) {
  this._groups = t, this._parents = e;
}
function re() {
  return new et([[document.documentElement]], Pr);
}
function $s() {
  return this;
}
et.prototype = re.prototype = {
  constructor: et,
  select: Uo,
  selectAll: jo,
  selectChild: ri,
  selectChildren: ai,
  filter: ui,
  data: pi,
  enter: ci,
  exit: gi,
  join: yi,
  merge: xi,
  selection: $s,
  order: wi,
  sort: _i,
  call: bi,
  nodes: $i,
  node: Ni,
  size: Ei,
  empty: Si,
  each: Ci,
  attr: Oi,
  style: Hi,
  property: Xi,
  classed: Fi,
  text: Ki,
  html: ts,
  raise: ns,
  lower: os,
  append: is,
  insert: as,
  remove: cs,
  clone: hs,
  datum: ds,
  on: xs,
  dispatch: vs,
  [Symbol.iterator]: bs
};
function rt(t) {
  return typeof t == "string" ? new et([[document.querySelector(t)]], [document.documentElement]) : new et([[t]], Pr);
}
function Ns(t) {
  let e;
  for (; e = t.sourceEvent; ) t = e;
  return t;
}
function it(t, e) {
  if (t = Ns(t), e === void 0 && (e = t.currentTarget), e) {
    var n = e.ownerSVGElement || e;
    if (n.createSVGPoint) {
      var r = n.createSVGPoint();
      return r.x = t.clientX, r.y = t.clientY, r = r.matrixTransform(e.getScreenCTM().inverse()), [r.x, r.y];
    }
    if (e.getBoundingClientRect) {
      var o = e.getBoundingClientRect();
      return [t.clientX - o.left - e.clientLeft, t.clientY - o.top - e.clientTop];
    }
  }
  return [t.pageX, t.pageY];
}
const Es = { passive: !1 }, Gt = { capture: !0, passive: !1 };
function Qe(t) {
  t.stopImmediatePropagation();
}
function It(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function kr(t) {
  var e = t.document.documentElement, n = rt(t).on("dragstart.drag", It, Gt);
  "onselectstart" in e ? n.on("selectstart.drag", It, Gt) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function Ar(t, e) {
  var n = t.document.documentElement, r = rt(t).on("dragstart.drag", null);
  e && (r.on("click.drag", It, Gt), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const fe = (t) => () => t;
function fn(t, {
  sourceEvent: e,
  subject: n,
  target: r,
  identifier: o,
  active: i,
  x: s,
  y: a,
  dx: l,
  dy: u,
  dispatch: c
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: e, enumerable: !0, configurable: !0 },
    subject: { value: n, enumerable: !0, configurable: !0 },
    target: { value: r, enumerable: !0, configurable: !0 },
    identifier: { value: o, enumerable: !0, configurable: !0 },
    active: { value: i, enumerable: !0, configurable: !0 },
    x: { value: s, enumerable: !0, configurable: !0 },
    y: { value: a, enumerable: !0, configurable: !0 },
    dx: { value: l, enumerable: !0, configurable: !0 },
    dy: { value: u, enumerable: !0, configurable: !0 },
    _: { value: c }
  });
}
fn.prototype.on = function() {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function Ss(t) {
  return !t.ctrlKey && !t.button;
}
function Cs() {
  return this.parentNode;
}
function Ts(t, e) {
  return e ?? { x: t.x, y: t.y };
}
function Is() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Ms() {
  var t = Ss, e = Cs, n = Ts, r = Is, o = {}, i = De("start", "drag", "end"), s = 0, a, l, u, c, f = 0;
  function h(p) {
    p.on("mousedown.drag", g).filter(r).on("touchstart.drag", M).on("touchmove.drag", $, Es).on("touchend.drag touchcancel.drag", A).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function g(p, x) {
    if (!(c || !t.call(this, p, x))) {
      var v = w(this, e.call(this, p, x), p, x, "mouse");
      v && (rt(p.view).on("mousemove.drag", _, Gt).on("mouseup.drag", N, Gt), kr(p.view), Qe(p), u = !1, a = p.clientX, l = p.clientY, v("start", p));
    }
  }
  function _(p) {
    if (It(p), !u) {
      var x = p.clientX - a, v = p.clientY - l;
      u = x * x + v * v > f;
    }
    o.mouse("drag", p);
  }
  function N(p) {
    rt(p.view).on("mousemove.drag mouseup.drag", null), Ar(p.view, u), It(p), o.mouse("end", p);
  }
  function M(p, x) {
    if (t.call(this, p, x)) {
      var v = p.changedTouches, I = e.call(this, p, x), R = v.length, z, q;
      for (z = 0; z < R; ++z)
        (q = w(this, I, p, x, v[z].identifier, v[z])) && (Qe(p), q("start", p, v[z]));
    }
  }
  function $(p) {
    var x = p.changedTouches, v = x.length, I, R;
    for (I = 0; I < v; ++I)
      (R = o[x[I].identifier]) && (It(p), R("drag", p, x[I]));
  }
  function A(p) {
    var x = p.changedTouches, v = x.length, I, R;
    for (c && clearTimeout(c), c = setTimeout(function() {
      c = null;
    }, 500), I = 0; I < v; ++I)
      (R = o[x[I].identifier]) && (Qe(p), R("end", p, x[I]));
  }
  function w(p, x, v, I, R, z) {
    var q = i.copy(), P = it(z || v, x), E, k, d;
    if ((d = n.call(p, new fn("beforestart", {
      sourceEvent: v,
      target: h,
      identifier: R,
      active: s,
      x: P[0],
      y: P[1],
      dx: 0,
      dy: 0,
      dispatch: q
    }), I)) != null)
      return E = d.x - P[0] || 0, k = d.y - P[1] || 0, function y(m, b, S) {
        var T = P, C;
        switch (m) {
          case "start":
            o[R] = y, C = s++;
            break;
          case "end":
            delete o[R], --s;
          // falls through
          case "drag":
            P = it(S || b, x), C = s;
            break;
        }
        q.call(
          m,
          p,
          new fn(m, {
            sourceEvent: b,
            subject: d,
            target: h,
            identifier: R,
            active: C,
            x: P[0] + E,
            y: P[1] + k,
            dx: P[0] - T[0],
            dy: P[1] - T[1],
            dispatch: q
          }),
          I
        );
      };
  }
  return h.filter = function(p) {
    return arguments.length ? (t = typeof p == "function" ? p : fe(!!p), h) : t;
  }, h.container = function(p) {
    return arguments.length ? (e = typeof p == "function" ? p : fe(p), h) : e;
  }, h.subject = function(p) {
    return arguments.length ? (n = typeof p == "function" ? p : fe(p), h) : n;
  }, h.touchable = function(p) {
    return arguments.length ? (r = typeof p == "function" ? p : fe(!!p), h) : r;
  }, h.on = function() {
    var p = i.on.apply(i, arguments);
    return p === i ? h : p;
  }, h.clickDistance = function(p) {
    return arguments.length ? (f = (p = +p) * p, h) : Math.sqrt(f);
  }, h;
}
function En(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function Or(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e) n[r] = e[r];
  return n;
}
function oe() {
}
var Ut = 0.7, Se = 1 / Ut, Mt = "\\s*([+-]?\\d+)\\s*", Kt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ct = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Ps = /^#([0-9a-f]{3,8})$/, ks = new RegExp(`^rgb\\(${Mt},${Mt},${Mt}\\)$`), As = new RegExp(`^rgb\\(${ct},${ct},${ct}\\)$`), Os = new RegExp(`^rgba\\(${Mt},${Mt},${Mt},${Kt}\\)$`), zs = new RegExp(`^rgba\\(${ct},${ct},${ct},${Kt}\\)$`), Ds = new RegExp(`^hsl\\(${Kt},${ct},${ct}\\)$`), Rs = new RegExp(`^hsla\\(${Kt},${ct},${ct},${Kt}\\)$`), Vn = {
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
En(oe, $t, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Xn,
  // Deprecated! Use color.formatHex.
  formatHex: Xn,
  formatHex8: Hs,
  formatHsl: Bs,
  formatRgb: Yn,
  toString: Yn
});
function Xn() {
  return this.rgb().formatHex();
}
function Hs() {
  return this.rgb().formatHex8();
}
function Bs() {
  return zr(this).formatHsl();
}
function Yn() {
  return this.rgb().formatRgb();
}
function $t(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = Ps.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? Wn(e) : n === 3 ? new tt(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? he(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? he(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = ks.exec(t)) ? new tt(e[1], e[2], e[3], 1) : (e = As.exec(t)) ? new tt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = Os.exec(t)) ? he(e[1], e[2], e[3], e[4]) : (e = zs.exec(t)) ? he(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = Ds.exec(t)) ? Zn(e[1], e[2] / 100, e[3] / 100, 1) : (e = Rs.exec(t)) ? Zn(e[1], e[2] / 100, e[3] / 100, e[4]) : Vn.hasOwnProperty(t) ? Wn(Vn[t]) : t === "transparent" ? new tt(NaN, NaN, NaN, 0) : null;
}
function Wn(t) {
  return new tt(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function he(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new tt(t, e, n, r);
}
function Ls(t) {
  return t instanceof oe || (t = $t(t)), t ? (t = t.rgb(), new tt(t.r, t.g, t.b, t.opacity)) : new tt();
}
function hn(t, e, n, r) {
  return arguments.length === 1 ? Ls(t) : new tt(t, e, n, r ?? 1);
}
function tt(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
En(tt, hn, Or(oe, {
  brighter(t) {
    return t = t == null ? Se : Math.pow(Se, t), new tt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Ut : Math.pow(Ut, t), new tt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new tt(bt(this.r), bt(this.g), bt(this.b), Ce(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: qn,
  // Deprecated! Use color.formatHex.
  formatHex: qn,
  formatHex8: Vs,
  formatRgb: Fn,
  toString: Fn
}));
function qn() {
  return `#${vt(this.r)}${vt(this.g)}${vt(this.b)}`;
}
function Vs() {
  return `#${vt(this.r)}${vt(this.g)}${vt(this.b)}${vt((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Fn() {
  const t = Ce(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${bt(this.r)}, ${bt(this.g)}, ${bt(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Ce(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function bt(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function vt(t) {
  return t = bt(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Zn(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new st(t, e, n, r);
}
function zr(t) {
  if (t instanceof st) return new st(t.h, t.s, t.l, t.opacity);
  if (t instanceof oe || (t = $t(t)), !t) return new st();
  if (t instanceof st) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, o = Math.min(e, n, r), i = Math.max(e, n, r), s = NaN, a = i - o, l = (i + o) / 2;
  return a ? (e === i ? s = (n - r) / a + (n < r) * 6 : n === i ? s = (r - e) / a + 2 : s = (e - n) / a + 4, a /= l < 0.5 ? i + o : 2 - i - o, s *= 60) : a = l > 0 && l < 1 ? 0 : s, new st(s, a, l, t.opacity);
}
function Xs(t, e, n, r) {
  return arguments.length === 1 ? zr(t) : new st(t, e, n, r ?? 1);
}
function st(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
En(st, Xs, Or(oe, {
  brighter(t) {
    return t = t == null ? Se : Math.pow(Se, t), new st(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Ut : Math.pow(Ut, t), new st(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, o = 2 * n - r;
    return new tt(
      Je(t >= 240 ? t - 240 : t + 120, o, r),
      Je(t, o, r),
      Je(t < 120 ? t + 240 : t - 120, o, r),
      this.opacity
    );
  },
  clamp() {
    return new st(Gn(this.h), de(this.s), de(this.l), Ce(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Ce(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Gn(this.h)}, ${de(this.s) * 100}%, ${de(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Gn(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function de(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Je(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const Sn = (t) => () => t;
function Ys(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function Ws(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function qs(t) {
  return (t = +t) == 1 ? Dr : function(e, n) {
    return n - e ? Ws(e, n, t) : Sn(isNaN(e) ? n : e);
  };
}
function Dr(t, e) {
  var n = e - t;
  return n ? Ys(t, n) : Sn(isNaN(t) ? e : t);
}
const Te = (function t(e) {
  var n = qs(e);
  function r(o, i) {
    var s = n((o = hn(o)).r, (i = hn(i)).r), a = n(o.g, i.g), l = n(o.b, i.b), u = Dr(o.opacity, i.opacity);
    return function(c) {
      return o.r = s(c), o.g = a(c), o.b = l(c), o.opacity = u(c), o + "";
    };
  }
  return r.gamma = t, r;
})(1);
function Fs(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, r = e.slice(), o;
  return function(i) {
    for (o = 0; o < n; ++o) r[o] = t[o] * (1 - i) + e[o] * i;
    return r;
  };
}
function Zs(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function Gs(t, e) {
  var n = e ? e.length : 0, r = t ? Math.min(n, t.length) : 0, o = new Array(r), i = new Array(n), s;
  for (s = 0; s < r; ++s) o[s] = Zt(t[s], e[s]);
  for (; s < n; ++s) i[s] = e[s];
  return function(a) {
    for (s = 0; s < r; ++s) i[s] = o[s](a);
    return i;
  };
}
function Us(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(r) {
    return n.setTime(t * (1 - r) + e * r), n;
  };
}
function ut(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function Ks(t, e) {
  var n = {}, r = {}, o;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (o in e)
    o in t ? n[o] = Zt(t[o], e[o]) : r[o] = e[o];
  return function(i) {
    for (o in n) r[o] = n[o](i);
    return r;
  };
}
var dn = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, je = new RegExp(dn.source, "g");
function Qs(t) {
  return function() {
    return t;
  };
}
function Js(t) {
  return function(e) {
    return t(e) + "";
  };
}
function Rr(t, e) {
  var n = dn.lastIndex = je.lastIndex = 0, r, o, i, s = -1, a = [], l = [];
  for (t = t + "", e = e + ""; (r = dn.exec(t)) && (o = je.exec(e)); )
    (i = o.index) > n && (i = e.slice(n, i), a[s] ? a[s] += i : a[++s] = i), (r = r[0]) === (o = o[0]) ? a[s] ? a[s] += o : a[++s] = o : (a[++s] = null, l.push({ i: s, x: ut(r, o) })), n = je.lastIndex;
  return n < e.length && (i = e.slice(n), a[s] ? a[s] += i : a[++s] = i), a.length < 2 ? l[0] ? Js(l[0].x) : Qs(e) : (e = l.length, function(u) {
    for (var c = 0, f; c < e; ++c) a[(f = l[c]).i] = f.x(u);
    return a.join("");
  });
}
function Zt(t, e) {
  var n = typeof e, r;
  return e == null || n === "boolean" ? Sn(e) : (n === "number" ? ut : n === "string" ? (r = $t(e)) ? (e = r, Te) : Rr : e instanceof $t ? Te : e instanceof Date ? Us : Zs(e) ? Fs : Array.isArray(e) ? Gs : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? Ks : ut)(t, e);
}
var Un = 180 / Math.PI, pn = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Hr(t, e, n, r, o, i) {
  var s, a, l;
  return (s = Math.sqrt(t * t + e * e)) && (t /= s, e /= s), (l = t * n + e * r) && (n -= t * l, r -= e * l), (a = Math.sqrt(n * n + r * r)) && (n /= a, r /= a, l /= a), t * r < e * n && (t = -t, e = -e, l = -l, s = -s), {
    translateX: o,
    translateY: i,
    rotate: Math.atan2(e, t) * Un,
    skewX: Math.atan(l) * Un,
    scaleX: s,
    scaleY: a
  };
}
var pe;
function js(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? pn : Hr(e.a, e.b, e.c, e.d, e.e, e.f);
}
function ta(t) {
  return t == null || (pe || (pe = document.createElementNS("http://www.w3.org/2000/svg", "g")), pe.setAttribute("transform", t), !(t = pe.transform.baseVal.consolidate())) ? pn : (t = t.matrix, Hr(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Br(t, e, n, r) {
  function o(u) {
    return u.length ? u.pop() + " " : "";
  }
  function i(u, c, f, h, g, _) {
    if (u !== f || c !== h) {
      var N = g.push("translate(", null, e, null, n);
      _.push({ i: N - 4, x: ut(u, f) }, { i: N - 2, x: ut(c, h) });
    } else (f || h) && g.push("translate(" + f + e + h + n);
  }
  function s(u, c, f, h) {
    u !== c ? (u - c > 180 ? c += 360 : c - u > 180 && (u += 360), h.push({ i: f.push(o(f) + "rotate(", null, r) - 2, x: ut(u, c) })) : c && f.push(o(f) + "rotate(" + c + r);
  }
  function a(u, c, f, h) {
    u !== c ? h.push({ i: f.push(o(f) + "skewX(", null, r) - 2, x: ut(u, c) }) : c && f.push(o(f) + "skewX(" + c + r);
  }
  function l(u, c, f, h, g, _) {
    if (u !== f || c !== h) {
      var N = g.push(o(g) + "scale(", null, ",", null, ")");
      _.push({ i: N - 4, x: ut(u, f) }, { i: N - 2, x: ut(c, h) });
    } else (f !== 1 || h !== 1) && g.push(o(g) + "scale(" + f + "," + h + ")");
  }
  return function(u, c) {
    var f = [], h = [];
    return u = t(u), c = t(c), i(u.translateX, u.translateY, c.translateX, c.translateY, f, h), s(u.rotate, c.rotate, f, h), a(u.skewX, c.skewX, f, h), l(u.scaleX, u.scaleY, c.scaleX, c.scaleY, f, h), u = c = null, function(g) {
      for (var _ = -1, N = h.length, M; ++_ < N; ) f[(M = h[_]).i] = M.x(g);
      return f.join("");
    };
  };
}
var ea = Br(js, "px, ", "px)", "deg)"), na = Br(ta, ", ", ")", ")"), ra = 1e-12;
function Kn(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function oa(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function ia(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const we = (function t(e, n, r) {
  function o(i, s) {
    var a = i[0], l = i[1], u = i[2], c = s[0], f = s[1], h = s[2], g = c - a, _ = f - l, N = g * g + _ * _, M, $;
    if (N < ra)
      $ = Math.log(h / u) / e, M = function(I) {
        return [
          a + I * g,
          l + I * _,
          u * Math.exp(e * I * $)
        ];
      };
    else {
      var A = Math.sqrt(N), w = (h * h - u * u + r * N) / (2 * u * n * A), p = (h * h - u * u - r * N) / (2 * h * n * A), x = Math.log(Math.sqrt(w * w + 1) - w), v = Math.log(Math.sqrt(p * p + 1) - p);
      $ = (v - x) / e, M = function(I) {
        var R = I * $, z = Kn(x), q = u / (n * A) * (z * ia(e * R + x) - oa(x));
        return [
          a + q * g,
          l + q * _,
          u * z / Kn(e * R + x)
        ];
      };
    }
    return M.duration = $ * 1e3 * e / Math.SQRT2, M;
  }
  return o.rho = function(i) {
    var s = Math.max(1e-3, +i), a = s * s, l = a * a;
    return t(s, a, l);
  }, o;
})(Math.SQRT2, 2, 4);
var Ot = 0, Wt = 0, Xt = 0, Lr = 1e3, Ie, qt, Me = 0, Nt = 0, He = 0, Qt = typeof performance == "object" && performance.now ? performance : Date, Vr = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Cn() {
  return Nt || (Vr(sa), Nt = Qt.now() + He);
}
function sa() {
  Nt = 0;
}
function Pe() {
  this._call = this._time = this._next = null;
}
Pe.prototype = Xr.prototype = {
  constructor: Pe,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Cn() : +n) + (e == null ? 0 : +e), !this._next && qt !== this && (qt ? qt._next = this : Ie = this, qt = this), this._call = t, this._time = n, mn();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, mn());
  }
};
function Xr(t, e, n) {
  var r = new Pe();
  return r.restart(t, e, n), r;
}
function aa() {
  Cn(), ++Ot;
  for (var t = Ie, e; t; )
    (e = Nt - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --Ot;
}
function Qn() {
  Nt = (Me = Qt.now()) + He, Ot = Wt = 0;
  try {
    aa();
  } finally {
    Ot = 0, ca(), Nt = 0;
  }
}
function ua() {
  var t = Qt.now(), e = t - Me;
  e > Lr && (He -= e, Me = t);
}
function ca() {
  for (var t, e = Ie, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : Ie = n);
  qt = t, mn(r);
}
function mn(t) {
  if (!Ot) {
    Wt && (Wt = clearTimeout(Wt));
    var e = t - Nt;
    e > 24 ? (t < 1 / 0 && (Wt = setTimeout(Qn, t - Qt.now() - He)), Xt && (Xt = clearInterval(Xt))) : (Xt || (Me = Qt.now(), Xt = setInterval(ua, Lr)), Ot = 1, Vr(Qn));
  }
}
function Jn(t, e, n) {
  var r = new Pe();
  return e = e == null ? 0 : +e, r.restart((o) => {
    r.stop(), t(o + e);
  }, e, n), r;
}
var la = De("start", "end", "cancel", "interrupt"), fa = [], Yr = 0, jn = 1, gn = 2, _e = 3, tr = 4, yn = 5, ve = 6;
function Be(t, e, n, r, o, i) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (n in s) return;
  ha(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: o,
    // For context during callback.
    on: la,
    tween: fa,
    time: i.time,
    delay: i.delay,
    duration: i.duration,
    ease: i.ease,
    timer: null,
    state: Yr
  });
}
function Tn(t, e) {
  var n = at(t, e);
  if (n.state > Yr) throw new Error("too late; already scheduled");
  return n;
}
function ht(t, e) {
  var n = at(t, e);
  if (n.state > _e) throw new Error("too late; already running");
  return n;
}
function at(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function ha(t, e, n) {
  var r = t.__transition, o;
  r[e] = n, n.timer = Xr(i, 0, n.time);
  function i(u) {
    n.state = jn, n.timer.restart(s, n.delay, n.time), n.delay <= u && s(u - n.delay);
  }
  function s(u) {
    var c, f, h, g;
    if (n.state !== jn) return l();
    for (c in r)
      if (g = r[c], g.name === n.name) {
        if (g.state === _e) return Jn(s);
        g.state === tr ? (g.state = ve, g.timer.stop(), g.on.call("interrupt", t, t.__data__, g.index, g.group), delete r[c]) : +c < e && (g.state = ve, g.timer.stop(), g.on.call("cancel", t, t.__data__, g.index, g.group), delete r[c]);
      }
    if (Jn(function() {
      n.state === _e && (n.state = tr, n.timer.restart(a, n.delay, n.time), a(u));
    }), n.state = gn, n.on.call("start", t, t.__data__, n.index, n.group), n.state === gn) {
      for (n.state = _e, o = new Array(h = n.tween.length), c = 0, f = -1; c < h; ++c)
        (g = n.tween[c].value.call(t, t.__data__, n.index, n.group)) && (o[++f] = g);
      o.length = f + 1;
    }
  }
  function a(u) {
    for (var c = u < n.duration ? n.ease.call(null, u / n.duration) : (n.timer.restart(l), n.state = yn, 1), f = -1, h = o.length; ++f < h; )
      o[f].call(t, c);
    n.state === yn && (n.on.call("end", t, t.__data__, n.index, n.group), l());
  }
  function l() {
    n.state = ve, n.timer.stop(), delete r[e];
    for (var u in r) return;
    delete t.__transition;
  }
}
function be(t, e) {
  var n = t.__transition, r, o, i = !0, s;
  if (n) {
    e = e == null ? null : e + "";
    for (s in n) {
      if ((r = n[s]).name !== e) {
        i = !1;
        continue;
      }
      o = r.state > gn && r.state < yn, r.state = ve, r.timer.stop(), r.on.call(o ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[s];
    }
    i && delete t.__transition;
  }
}
function da(t) {
  return this.each(function() {
    be(this, t);
  });
}
function pa(t, e) {
  var n, r;
  return function() {
    var o = ht(this, t), i = o.tween;
    if (i !== n) {
      r = n = i;
      for (var s = 0, a = r.length; s < a; ++s)
        if (r[s].name === e) {
          r = r.slice(), r.splice(s, 1);
          break;
        }
    }
    o.tween = r;
  };
}
function ma(t, e, n) {
  var r, o;
  if (typeof n != "function") throw new Error();
  return function() {
    var i = ht(this, t), s = i.tween;
    if (s !== r) {
      o = (r = s).slice();
      for (var a = { name: e, value: n }, l = 0, u = o.length; l < u; ++l)
        if (o[l].name === e) {
          o[l] = a;
          break;
        }
      l === u && o.push(a);
    }
    i.tween = o;
  };
}
function ga(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = at(this.node(), n).tween, o = 0, i = r.length, s; o < i; ++o)
      if ((s = r[o]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? pa : ma)(n, t, e));
}
function In(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var o = ht(this, r);
    (o.value || (o.value = {}))[e] = n.apply(this, arguments);
  }), function(o) {
    return at(o, r).value[e];
  };
}
function Wr(t, e) {
  var n;
  return (typeof e == "number" ? ut : e instanceof $t ? Te : (n = $t(e)) ? (e = n, Te) : Rr)(t, e);
}
function ya(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function xa(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function wa(t, e, n) {
  var r, o = n + "", i;
  return function() {
    var s = this.getAttribute(t);
    return s === o ? null : s === r ? i : i = e(r = s, n);
  };
}
function _a(t, e, n) {
  var r, o = n + "", i;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === o ? null : s === r ? i : i = e(r = s, n);
  };
}
function va(t, e, n) {
  var r, o, i;
  return function() {
    var s, a = n(this), l;
    return a == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), l = a + "", s === l ? null : s === r && l === o ? i : (o = l, i = e(r = s, a)));
  };
}
function ba(t, e, n) {
  var r, o, i;
  return function() {
    var s, a = n(this), l;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), l = a + "", s === l ? null : s === r && l === o ? i : (o = l, i = e(r = s, a)));
  };
}
function $a(t, e) {
  var n = Re(t), r = n === "transform" ? na : Wr;
  return this.attrTween(t, typeof e == "function" ? (n.local ? ba : va)(n, r, In(this, "attr." + t, e)) : e == null ? (n.local ? xa : ya)(n) : (n.local ? _a : wa)(n, r, e));
}
function Na(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function Ea(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function Sa(t, e) {
  var n, r;
  function o() {
    var i = e.apply(this, arguments);
    return i !== r && (n = (r = i) && Ea(t, i)), n;
  }
  return o._value = e, o;
}
function Ca(t, e) {
  var n, r;
  function o() {
    var i = e.apply(this, arguments);
    return i !== r && (n = (r = i) && Na(t, i)), n;
  }
  return o._value = e, o;
}
function Ta(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var r = Re(t);
  return this.tween(n, (r.local ? Sa : Ca)(r, e));
}
function Ia(t, e) {
  return function() {
    Tn(this, t).delay = +e.apply(this, arguments);
  };
}
function Ma(t, e) {
  return e = +e, function() {
    Tn(this, t).delay = e;
  };
}
function Pa(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Ia : Ma)(e, t)) : at(this.node(), e).delay;
}
function ka(t, e) {
  return function() {
    ht(this, t).duration = +e.apply(this, arguments);
  };
}
function Aa(t, e) {
  return e = +e, function() {
    ht(this, t).duration = e;
  };
}
function Oa(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? ka : Aa)(e, t)) : at(this.node(), e).duration;
}
function za(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    ht(this, t).ease = e;
  };
}
function Da(t) {
  var e = this._id;
  return arguments.length ? this.each(za(e, t)) : at(this.node(), e).ease;
}
function Ra(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    ht(this, t).ease = n;
  };
}
function Ha(t) {
  if (typeof t != "function") throw new Error();
  return this.each(Ra(this._id, t));
}
function Ba(t) {
  typeof t != "function" && (t = br(t));
  for (var e = this._groups, n = e.length, r = new Array(n), o = 0; o < n; ++o)
    for (var i = e[o], s = i.length, a = r[o] = [], l, u = 0; u < s; ++u)
      (l = i[u]) && t.call(l, l.__data__, u, i) && a.push(l);
  return new xt(r, this._parents, this._name, this._id);
}
function La(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, o = n.length, i = Math.min(r, o), s = new Array(r), a = 0; a < i; ++a)
    for (var l = e[a], u = n[a], c = l.length, f = s[a] = new Array(c), h, g = 0; g < c; ++g)
      (h = l[g] || u[g]) && (f[g] = h);
  for (; a < r; ++a)
    s[a] = e[a];
  return new xt(s, this._parents, this._name, this._id);
}
function Va(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function Xa(t, e, n) {
  var r, o, i = Va(e) ? Tn : ht;
  return function() {
    var s = i(this, t), a = s.on;
    a !== r && (o = (r = a).copy()).on(e, n), s.on = o;
  };
}
function Ya(t, e) {
  var n = this._id;
  return arguments.length < 2 ? at(this.node(), n).on.on(t) : this.each(Xa(n, t, e));
}
function Wa(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function qa() {
  return this.on("end.remove", Wa(this._id));
}
function Fa(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = $n(t));
  for (var r = this._groups, o = r.length, i = new Array(o), s = 0; s < o; ++s)
    for (var a = r[s], l = a.length, u = i[s] = new Array(l), c, f, h = 0; h < l; ++h)
      (c = a[h]) && (f = t.call(c, c.__data__, h, a)) && ("__data__" in c && (f.__data__ = c.__data__), u[h] = f, Be(u[h], e, n, h, u, at(c, n)));
  return new xt(i, this._parents, e, n);
}
function Za(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = vr(t));
  for (var r = this._groups, o = r.length, i = [], s = [], a = 0; a < o; ++a)
    for (var l = r[a], u = l.length, c, f = 0; f < u; ++f)
      if (c = l[f]) {
        for (var h = t.call(c, c.__data__, f, l), g, _ = at(c, n), N = 0, M = h.length; N < M; ++N)
          (g = h[N]) && Be(g, e, n, N, h, _);
        i.push(h), s.push(c);
      }
  return new xt(i, s, e, n);
}
var Ga = re.prototype.constructor;
function Ua() {
  return new Ga(this._groups, this._parents);
}
function Ka(t, e) {
  var n, r, o;
  return function() {
    var i = At(this, t), s = (this.style.removeProperty(t), At(this, t));
    return i === s ? null : i === n && s === r ? o : o = e(n = i, r = s);
  };
}
function qr(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Qa(t, e, n) {
  var r, o = n + "", i;
  return function() {
    var s = At(this, t);
    return s === o ? null : s === r ? i : i = e(r = s, n);
  };
}
function Ja(t, e, n) {
  var r, o, i;
  return function() {
    var s = At(this, t), a = n(this), l = a + "";
    return a == null && (l = a = (this.style.removeProperty(t), At(this, t))), s === l ? null : s === r && l === o ? i : (o = l, i = e(r = s, a));
  };
}
function ja(t, e) {
  var n, r, o, i = "style." + e, s = "end." + i, a;
  return function() {
    var l = ht(this, t), u = l.on, c = l.value[i] == null ? a || (a = qr(e)) : void 0;
    (u !== n || o !== c) && (r = (n = u).copy()).on(s, o = c), l.on = r;
  };
}
function tu(t, e, n) {
  var r = (t += "") == "transform" ? ea : Wr;
  return e == null ? this.styleTween(t, Ka(t, r)).on("end.style." + t, qr(t)) : typeof e == "function" ? this.styleTween(t, Ja(t, r, In(this, "style." + t, e))).each(ja(this._id, t)) : this.styleTween(t, Qa(t, r, e), n).on("end.style." + t, null);
}
function eu(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function nu(t, e, n) {
  var r, o;
  function i() {
    var s = e.apply(this, arguments);
    return s !== o && (r = (o = s) && eu(t, s, n)), r;
  }
  return i._value = e, i;
}
function ru(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (e == null) return this.tween(r, null);
  if (typeof e != "function") throw new Error();
  return this.tween(r, nu(t, e, n ?? ""));
}
function ou(t) {
  return function() {
    this.textContent = t;
  };
}
function iu(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function su(t) {
  return this.tween("text", typeof t == "function" ? iu(In(this, "text", t)) : ou(t == null ? "" : t + ""));
}
function au(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function uu(t) {
  var e, n;
  function r() {
    var o = t.apply(this, arguments);
    return o !== n && (e = (n = o) && au(o)), e;
  }
  return r._value = t, r;
}
function cu(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, uu(t));
}
function lu() {
  for (var t = this._name, e = this._id, n = Fr(), r = this._groups, o = r.length, i = 0; i < o; ++i)
    for (var s = r[i], a = s.length, l, u = 0; u < a; ++u)
      if (l = s[u]) {
        var c = at(l, e);
        Be(l, t, n, u, s, {
          time: c.time + c.delay + c.duration,
          delay: 0,
          duration: c.duration,
          ease: c.ease
        });
      }
  return new xt(r, this._parents, t, n);
}
function fu() {
  var t, e, n = this, r = n._id, o = n.size();
  return new Promise(function(i, s) {
    var a = { value: s }, l = { value: function() {
      --o === 0 && i();
    } };
    n.each(function() {
      var u = ht(this, r), c = u.on;
      c !== t && (e = (t = c).copy(), e._.cancel.push(a), e._.interrupt.push(a), e._.end.push(l)), u.on = e;
    }), o === 0 && i();
  });
}
var hu = 0;
function xt(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function Fr() {
  return ++hu;
}
var mt = re.prototype;
xt.prototype = {
  constructor: xt,
  select: Fa,
  selectAll: Za,
  selectChild: mt.selectChild,
  selectChildren: mt.selectChildren,
  filter: Ba,
  merge: La,
  selection: Ua,
  transition: lu,
  call: mt.call,
  nodes: mt.nodes,
  node: mt.node,
  size: mt.size,
  empty: mt.empty,
  each: mt.each,
  on: Ya,
  attr: $a,
  attrTween: Ta,
  style: tu,
  styleTween: ru,
  text: su,
  textTween: cu,
  remove: qa,
  tween: ga,
  delay: Pa,
  duration: Oa,
  ease: Da,
  easeVarying: Ha,
  end: fu,
  [Symbol.iterator]: mt[Symbol.iterator]
};
function du(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var pu = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: du
};
function mu(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function gu(t) {
  var e, n;
  t instanceof xt ? (e = t._id, t = t._name) : (e = Fr(), (n = pu).time = Cn(), t = t == null ? null : t + "");
  for (var r = this._groups, o = r.length, i = 0; i < o; ++i)
    for (var s = r[i], a = s.length, l, u = 0; u < a; ++u)
      (l = s[u]) && Be(l, t, e, u, s, n || mu(l, e));
  return new xt(r, this._parents, t, e);
}
re.prototype.interrupt = da;
re.prototype.transition = gu;
const me = (t) => () => t;
function yu(t, {
  sourceEvent: e,
  target: n,
  transform: r,
  dispatch: o
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: e, enumerable: !0, configurable: !0 },
    target: { value: n, enumerable: !0, configurable: !0 },
    transform: { value: r, enumerable: !0, configurable: !0 },
    _: { value: o }
  });
}
function gt(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
gt.prototype = {
  constructor: gt,
  scale: function(t) {
    return t === 1 ? this : new gt(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new gt(this.k, this.x + this.k * t, this.y + this.k * e);
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
var Le = new gt(1, 0, 0);
Zr.prototype = gt.prototype;
function Zr(t) {
  for (; !t.__zoom; ) if (!(t = t.parentNode)) return Le;
  return t.__zoom;
}
function tn(t) {
  t.stopImmediatePropagation();
}
function Yt(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function xu(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function wu() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function er() {
  return this.__zoom || Le;
}
function _u(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function vu() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function bu(t, e, n) {
  var r = t.invertX(e[0][0]) - n[0][0], o = t.invertX(e[1][0]) - n[1][0], i = t.invertY(e[0][1]) - n[0][1], s = t.invertY(e[1][1]) - n[1][1];
  return t.translate(
    o > r ? (r + o) / 2 : Math.min(0, r) || Math.max(0, o),
    s > i ? (i + s) / 2 : Math.min(0, i) || Math.max(0, s)
  );
}
function Gr() {
  var t = xu, e = wu, n = bu, r = _u, o = vu, i = [0, 1 / 0], s = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, l = we, u = De("start", "zoom", "end"), c, f, h, g = 500, _ = 150, N = 0, M = 10;
  function $(d) {
    d.property("__zoom", er).on("wheel.zoom", R, { passive: !1 }).on("mousedown.zoom", z).on("dblclick.zoom", q).filter(o).on("touchstart.zoom", P).on("touchmove.zoom", E).on("touchend.zoom touchcancel.zoom", k).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  $.transform = function(d, y, m, b) {
    var S = d.selection ? d.selection() : d;
    S.property("__zoom", er), d !== S ? x(d, y, m, b) : S.interrupt().each(function() {
      v(this, arguments).event(b).start().zoom(null, typeof y == "function" ? y.apply(this, arguments) : y).end();
    });
  }, $.scaleBy = function(d, y, m, b) {
    $.scaleTo(d, function() {
      var S = this.__zoom.k, T = typeof y == "function" ? y.apply(this, arguments) : y;
      return S * T;
    }, m, b);
  }, $.scaleTo = function(d, y, m, b) {
    $.transform(d, function() {
      var S = e.apply(this, arguments), T = this.__zoom, C = m == null ? p(S) : typeof m == "function" ? m.apply(this, arguments) : m, O = T.invert(C), H = typeof y == "function" ? y.apply(this, arguments) : y;
      return n(w(A(T, H), C, O), S, s);
    }, m, b);
  }, $.translateBy = function(d, y, m, b) {
    $.transform(d, function() {
      return n(this.__zoom.translate(
        typeof y == "function" ? y.apply(this, arguments) : y,
        typeof m == "function" ? m.apply(this, arguments) : m
      ), e.apply(this, arguments), s);
    }, null, b);
  }, $.translateTo = function(d, y, m, b, S) {
    $.transform(d, function() {
      var T = e.apply(this, arguments), C = this.__zoom, O = b == null ? p(T) : typeof b == "function" ? b.apply(this, arguments) : b;
      return n(Le.translate(O[0], O[1]).scale(C.k).translate(
        typeof y == "function" ? -y.apply(this, arguments) : -y,
        typeof m == "function" ? -m.apply(this, arguments) : -m
      ), T, s);
    }, b, S);
  };
  function A(d, y) {
    return y = Math.max(i[0], Math.min(i[1], y)), y === d.k ? d : new gt(y, d.x, d.y);
  }
  function w(d, y, m) {
    var b = y[0] - m[0] * d.k, S = y[1] - m[1] * d.k;
    return b === d.x && S === d.y ? d : new gt(d.k, b, S);
  }
  function p(d) {
    return [(+d[0][0] + +d[1][0]) / 2, (+d[0][1] + +d[1][1]) / 2];
  }
  function x(d, y, m, b) {
    d.on("start.zoom", function() {
      v(this, arguments).event(b).start();
    }).on("interrupt.zoom end.zoom", function() {
      v(this, arguments).event(b).end();
    }).tween("zoom", function() {
      var S = this, T = arguments, C = v(S, T).event(b), O = e.apply(S, T), H = m == null ? p(O) : typeof m == "function" ? m.apply(S, T) : m, W = Math.max(O[1][0] - O[0][0], O[1][1] - O[0][1]), B = S.__zoom, Y = typeof y == "function" ? y.apply(S, T) : y, Q = l(B.invert(H).concat(W / B.k), Y.invert(H).concat(W / Y.k));
      return function(L) {
        if (L === 1) L = Y;
        else {
          var V = Q(L), J = W / V[2];
          L = new gt(J, H[0] - V[0] * J, H[1] - V[1] * J);
        }
        C.zoom(null, L);
      };
    });
  }
  function v(d, y, m) {
    return !m && d.__zooming || new I(d, y);
  }
  function I(d, y) {
    this.that = d, this.args = y, this.active = 0, this.sourceEvent = null, this.extent = e.apply(d, y), this.taps = 0;
  }
  I.prototype = {
    event: function(d) {
      return d && (this.sourceEvent = d), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(d, y) {
      return this.mouse && d !== "mouse" && (this.mouse[1] = y.invert(this.mouse[0])), this.touch0 && d !== "touch" && (this.touch0[1] = y.invert(this.touch0[0])), this.touch1 && d !== "touch" && (this.touch1[1] = y.invert(this.touch1[0])), this.that.__zoom = y, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(d) {
      var y = rt(this.that).datum();
      u.call(
        d,
        this.that,
        new yu(d, {
          sourceEvent: this.sourceEvent,
          target: $,
          transform: this.that.__zoom,
          dispatch: u
        }),
        y
      );
    }
  };
  function R(d, ...y) {
    if (!t.apply(this, arguments)) return;
    var m = v(this, y).event(d), b = this.__zoom, S = Math.max(i[0], Math.min(i[1], b.k * Math.pow(2, r.apply(this, arguments)))), T = it(d);
    if (m.wheel)
      (m.mouse[0][0] !== T[0] || m.mouse[0][1] !== T[1]) && (m.mouse[1] = b.invert(m.mouse[0] = T)), clearTimeout(m.wheel);
    else {
      if (b.k === S) return;
      m.mouse = [T, b.invert(T)], be(this), m.start();
    }
    Yt(d), m.wheel = setTimeout(C, _), m.zoom("mouse", n(w(A(b, S), m.mouse[0], m.mouse[1]), m.extent, s));
    function C() {
      m.wheel = null, m.end();
    }
  }
  function z(d, ...y) {
    if (h || !t.apply(this, arguments)) return;
    var m = d.currentTarget, b = v(this, y, !0).event(d), S = rt(d.view).on("mousemove.zoom", H, !0).on("mouseup.zoom", W, !0), T = it(d, m), C = d.clientX, O = d.clientY;
    kr(d.view), tn(d), b.mouse = [T, this.__zoom.invert(T)], be(this), b.start();
    function H(B) {
      if (Yt(B), !b.moved) {
        var Y = B.clientX - C, Q = B.clientY - O;
        b.moved = Y * Y + Q * Q > N;
      }
      b.event(B).zoom("mouse", n(w(b.that.__zoom, b.mouse[0] = it(B, m), b.mouse[1]), b.extent, s));
    }
    function W(B) {
      S.on("mousemove.zoom mouseup.zoom", null), Ar(B.view, b.moved), Yt(B), b.event(B).end();
    }
  }
  function q(d, ...y) {
    if (t.apply(this, arguments)) {
      var m = this.__zoom, b = it(d.changedTouches ? d.changedTouches[0] : d, this), S = m.invert(b), T = m.k * (d.shiftKey ? 0.5 : 2), C = n(w(A(m, T), b, S), e.apply(this, y), s);
      Yt(d), a > 0 ? rt(this).transition().duration(a).call(x, C, b, d) : rt(this).call($.transform, C, b, d);
    }
  }
  function P(d, ...y) {
    if (t.apply(this, arguments)) {
      var m = d.touches, b = m.length, S = v(this, y, d.changedTouches.length === b).event(d), T, C, O, H;
      for (tn(d), C = 0; C < b; ++C)
        O = m[C], H = it(O, this), H = [H, this.__zoom.invert(H), O.identifier], S.touch0 ? !S.touch1 && S.touch0[2] !== H[2] && (S.touch1 = H, S.taps = 0) : (S.touch0 = H, T = !0, S.taps = 1 + !!c);
      c && (c = clearTimeout(c)), T && (S.taps < 2 && (f = H[0], c = setTimeout(function() {
        c = null;
      }, g)), be(this), S.start());
    }
  }
  function E(d, ...y) {
    if (this.__zooming) {
      var m = v(this, y).event(d), b = d.changedTouches, S = b.length, T, C, O, H;
      for (Yt(d), T = 0; T < S; ++T)
        C = b[T], O = it(C, this), m.touch0 && m.touch0[2] === C.identifier ? m.touch0[0] = O : m.touch1 && m.touch1[2] === C.identifier && (m.touch1[0] = O);
      if (C = m.that.__zoom, m.touch1) {
        var W = m.touch0[0], B = m.touch0[1], Y = m.touch1[0], Q = m.touch1[1], L = (L = Y[0] - W[0]) * L + (L = Y[1] - W[1]) * L, V = (V = Q[0] - B[0]) * V + (V = Q[1] - B[1]) * V;
        C = A(C, Math.sqrt(L / V)), O = [(W[0] + Y[0]) / 2, (W[1] + Y[1]) / 2], H = [(B[0] + Q[0]) / 2, (B[1] + Q[1]) / 2];
      } else if (m.touch0) O = m.touch0[0], H = m.touch0[1];
      else return;
      m.zoom("touch", n(w(C, O, H), m.extent, s));
    }
  }
  function k(d, ...y) {
    if (this.__zooming) {
      var m = v(this, y).event(d), b = d.changedTouches, S = b.length, T, C;
      for (tn(d), h && clearTimeout(h), h = setTimeout(function() {
        h = null;
      }, g), T = 0; T < S; ++T)
        C = b[T], m.touch0 && m.touch0[2] === C.identifier ? delete m.touch0 : m.touch1 && m.touch1[2] === C.identifier && delete m.touch1;
      if (m.touch1 && !m.touch0 && (m.touch0 = m.touch1, delete m.touch1), m.touch0) m.touch0[1] = this.__zoom.invert(m.touch0[0]);
      else if (m.end(), m.taps === 2 && (C = it(C, this), Math.hypot(f[0] - C[0], f[1] - C[1]) < M)) {
        var O = rt(this).on("dblclick.zoom");
        O && O.apply(this, arguments);
      }
    }
  }
  return $.wheelDelta = function(d) {
    return arguments.length ? (r = typeof d == "function" ? d : me(+d), $) : r;
  }, $.filter = function(d) {
    return arguments.length ? (t = typeof d == "function" ? d : me(!!d), $) : t;
  }, $.touchable = function(d) {
    return arguments.length ? (o = typeof d == "function" ? d : me(!!d), $) : o;
  }, $.extent = function(d) {
    return arguments.length ? (e = typeof d == "function" ? d : me([[+d[0][0], +d[0][1]], [+d[1][0], +d[1][1]]]), $) : e;
  }, $.scaleExtent = function(d) {
    return arguments.length ? (i[0] = +d[0], i[1] = +d[1], $) : [i[0], i[1]];
  }, $.translateExtent = function(d) {
    return arguments.length ? (s[0][0] = +d[0][0], s[1][0] = +d[1][0], s[0][1] = +d[0][1], s[1][1] = +d[1][1], $) : [[s[0][0], s[0][1]], [s[1][0], s[1][1]]];
  }, $.constrain = function(d) {
    return arguments.length ? (n = d, $) : n;
  }, $.duration = function(d) {
    return arguments.length ? (a = +d, $) : a;
  }, $.interpolate = function(d) {
    return arguments.length ? (l = d, $) : l;
  }, $.on = function() {
    var d = u.on.apply(u, arguments);
    return d === u ? $ : d;
  }, $.clickDistance = function(d) {
    return arguments.length ? (N = (d = +d) * d, $) : Math.sqrt(N);
  }, $.tapDistance = function(d) {
    return arguments.length ? (M = +d, $) : M;
  }, $;
}
const nr = {
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
}, Ur = [
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
];
var ke;
(function(t) {
  t.Strict = "strict", t.Loose = "loose";
})(ke || (ke = {}));
var Pt;
(function(t) {
  t.Free = "free", t.Vertical = "vertical", t.Horizontal = "horizontal";
})(Pt || (Pt = {}));
var rr;
(function(t) {
  t.Partial = "partial", t.Full = "full";
})(rr || (rr = {}));
var or;
(function(t) {
  t.Bezier = "default", t.Straight = "straight", t.Step = "step", t.SmoothStep = "smoothstep", t.SimpleBezier = "simplebezier";
})(or || (or = {}));
var ir;
(function(t) {
  t.Arrow = "arrow", t.ArrowClosed = "arrowclosed";
})(ir || (ir = {}));
var D;
(function(t) {
  t.Left = "left", t.Top = "top", t.Right = "right", t.Bottom = "bottom";
})(D || (D = {}));
const sr = {
  [D.Left]: D.Right,
  [D.Right]: D.Left,
  [D.Top]: D.Bottom,
  [D.Bottom]: D.Top
}, Kr = (t) => "id" in t && "internals" in t && !("source" in t) && !("target" in t), ie = (t, e = [0, 0]) => {
  const { width: n, height: r } = Lt(t), o = t.origin ?? e, i = n * o[0], s = r * o[1];
  return {
    x: t.position.x - i,
    y: t.position.y - s
  };
}, Qr = (t, e = {}) => {
  let n = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 }, r = !1;
  return t.forEach((o) => {
    (e.filter === void 0 || e.filter(o)) && (n = jr(n, Su(o)), r = !0);
  }), r ? to(n) : { x: 0, y: 0, width: 0, height: 0 };
};
function $u({ nodeId: t, nextPosition: e, nodeLookup: n, nodeOrigin: r = [0, 0], nodeExtent: o, onError: i }) {
  const s = n.get(t), a = s.parentId ? n.get(s.parentId) : void 0, { x: l, y: u } = a ? a.internals.positionAbsolute : { x: 0, y: 0 }, c = s.origin ?? r;
  let f = s.extent || o;
  if (s.extent === "parent" && !s.expandParent)
    if (!a)
      i?.("005", nr.error005());
    else {
      const g = a.measured.width, _ = a.measured.height;
      g && _ && (f = [
        [l, u],
        [l + g, u + _]
      ]);
    }
  else a && jt(s.extent) && (f = [
    [s.extent[0][0] + l, s.extent[0][1] + u],
    [s.extent[1][0] + l, s.extent[1][1] + u]
  ]);
  const h = jt(f) ? zt(e, f, s.measured) : e;
  return (s.measured.width === void 0 || s.measured.height === void 0) && i?.("015", nr.error015()), {
    position: {
      x: h.x - l + (s.measured.width ?? 0) * c[0],
      y: h.y - u + (s.measured.height ?? 0) * c[1]
    },
    positionAbsolute: h
  };
}
const Jt = (t, e = 0, n = 1) => Math.min(Math.max(t, e), n), zt = (t = { x: 0, y: 0 }, e, n) => ({
  x: Jt(t.x, e[0][0], e[1][0] - (n?.width ?? 0)),
  y: Jt(t.y, e[0][1], e[1][1] - (n?.height ?? 0))
});
function Nu(t, e, n) {
  const { width: r, height: o } = Lt(n), { x: i, y: s } = n.internals.positionAbsolute;
  return zt(t, [
    [i, s],
    [i + r, s + o]
  ], e);
}
const ar = (t, e, n) => t < e ? Jt(Math.abs(t - e), 1, e) / e : t > n ? -Jt(Math.abs(t - n), 1, e) / e : 0, Jr = (t, e, n = 15, r = 40) => {
  const o = ar(t.x, r, e.width - r) * n, i = ar(t.y, r, e.height - r) * n;
  return [o, i];
}, jr = (t, e) => ({
  x: Math.min(t.x, e.x),
  y: Math.min(t.y, e.y),
  x2: Math.max(t.x2, e.x2),
  y2: Math.max(t.y2, e.y2)
}), xn = ({ x: t, y: e, width: n, height: r }) => ({
  x: t,
  y: e,
  x2: t + n,
  y2: e + r
}), to = ({ x: t, y: e, x2: n, y2: r }) => ({
  x: t,
  y: e,
  width: n - t,
  height: r - e
}), Eu = (t, e = [0, 0]) => {
  const { x: n, y: r } = Kr(t) ? t.internals.positionAbsolute : ie(t, e);
  return {
    x: n,
    y: r,
    width: t.measured?.width ?? t.width ?? t.initialWidth ?? 0,
    height: t.measured?.height ?? t.height ?? t.initialHeight ?? 0
  };
}, Su = (t, e = [0, 0]) => {
  const { x: n, y: r } = Kr(t) ? t.internals.positionAbsolute : ie(t, e);
  return {
    x: n,
    y: r,
    x2: n + (t.measured?.width ?? t.width ?? t.initialWidth ?? 0),
    y2: r + (t.measured?.height ?? t.height ?? t.initialHeight ?? 0)
  };
}, Cu = (t, e) => to(jr(xn(t), xn(e))), Tu = (t, e) => {
  const n = Math.max(0, Math.min(t.x + t.width, e.x + e.width) - Math.max(t.x, e.x)), r = Math.max(0, Math.min(t.y + t.height, e.y + e.height) - Math.max(t.y, e.y));
  return Math.ceil(n * r);
}, wn = (t) => !isNaN(t) && isFinite(t), Ve = (t, e = [1, 1]) => ({
  x: e[0] * Math.round(t.x / e[0]),
  y: e[1] * Math.round(t.y / e[1])
}), eo = ({ x: t, y: e }, [n, r, o], i = !1, s = [1, 1]) => {
  const a = {
    x: (t - n) / o,
    y: (e - r) / o
  };
  return i ? Ve(a, s) : a;
}, Iu = ({ x: t, y: e }, [n, r, o]) => ({
  x: t * o + n,
  y: e * o + r
}), Mn = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function jt(t) {
  return t != null && t !== "parent";
}
function Lt(t) {
  return {
    width: t.measured?.width ?? t.width ?? t.initialWidth ?? 0,
    height: t.measured?.height ?? t.height ?? t.initialHeight ?? 0
  };
}
function en(t, { snapGrid: e = [0, 0], snapToGrid: n = !1, transform: r, containerBounds: o }) {
  const { x: i, y: s } = yt(t), a = eo({ x: i - (o?.left ?? 0), y: s - (o?.top ?? 0) }, r), { x: l, y: u } = n ? Ve(a, e) : a;
  return {
    xSnapped: l,
    ySnapped: u,
    ...a
  };
}
const Mu = (t) => t?.getRootNode?.() || window?.document, Pu = (t) => "clientX" in t, yt = (t, e) => {
  const n = Pu(t), r = n ? t.clientX : t.touches?.[0].clientX, o = n ? t.clientY : t.touches?.[0].clientY;
  return {
    x: r - (e?.left ?? 0),
    y: o - (e?.top ?? 0)
  };
};
function ku({ sourceX: t, sourceY: e, targetX: n, targetY: r, sourceControlX: o, sourceControlY: i, targetControlX: s, targetControlY: a }) {
  const l = t * 0.125 + o * 0.375 + s * 0.375 + n * 0.125, u = e * 0.125 + i * 0.375 + a * 0.375 + r * 0.125, c = Math.abs(l - t), f = Math.abs(u - e);
  return [l, u, c, f];
}
function ge(t, e) {
  return t >= 0 ? 0.5 * t : e * 25 * Math.sqrt(-t);
}
function ur({ pos: t, x1: e, y1: n, x2: r, y2: o, c: i }) {
  switch (t) {
    case D.Left:
      return [e - ge(e - r, i), n];
    case D.Right:
      return [e + ge(r - e, i), n];
    case D.Top:
      return [e, n - ge(n - o, i)];
    case D.Bottom:
      return [e, n + ge(o - n, i)];
  }
}
function _n({ sourceX: t, sourceY: e, sourcePosition: n = D.Bottom, targetX: r, targetY: o, targetPosition: i = D.Top, curvature: s = 0.25 }) {
  const [a, l] = ur({
    pos: n,
    x1: t,
    y1: e,
    x2: r,
    y2: o,
    c: s
  }), [u, c] = ur({
    pos: i,
    x1: r,
    y1: o,
    x2: t,
    y2: e,
    c: s
  }), [f, h, g, _] = ku({
    sourceX: t,
    sourceY: e,
    targetX: r,
    targetY: o,
    sourceControlX: a,
    sourceControlY: l,
    targetControlX: u,
    targetControlY: c
  });
  return [
    `M${t},${e} C${a},${l} ${u},${c} ${r},${o}`,
    f,
    h,
    g,
    _
  ];
}
function no({ sourceX: t, sourceY: e, targetX: n, targetY: r }) {
  const o = Math.abs(n - t) / 2, i = n < t ? n + o : n - o, s = Math.abs(r - e) / 2, a = r < e ? r + s : r - s;
  return [i, a, o, s];
}
function Au({ sourceX: t, sourceY: e, targetX: n, targetY: r }) {
  const [o, i, s, a] = no({
    sourceX: t,
    sourceY: e,
    targetX: n,
    targetY: r
  });
  return [`M ${t},${e}L ${n},${r}`, o, i, s, a];
}
const cr = {
  [D.Left]: { x: -1, y: 0 },
  [D.Right]: { x: 1, y: 0 },
  [D.Top]: { x: 0, y: -1 },
  [D.Bottom]: { x: 0, y: 1 }
}, Ou = ({ source: t, sourcePosition: e = D.Bottom, target: n }) => e === D.Left || e === D.Right ? t.x < n.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : t.y < n.y ? { x: 0, y: 1 } : { x: 0, y: -1 }, lr = (t, e) => Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
function zu({ source: t, sourcePosition: e = D.Bottom, target: n, targetPosition: r = D.Top, center: o, offset: i, stepPosition: s }) {
  const a = cr[e], l = cr[r], u = { x: t.x + a.x * i, y: t.y + a.y * i }, c = { x: n.x + l.x * i, y: n.y + l.y * i }, f = Ou({
    source: u,
    sourcePosition: e,
    target: c
  }), h = f.x !== 0 ? "x" : "y", g = f[h];
  let _ = [], N, M;
  const $ = { x: 0, y: 0 }, A = { x: 0, y: 0 }, [, , w, p] = no({
    sourceX: t.x,
    sourceY: t.y,
    targetX: n.x,
    targetY: n.y
  });
  if (a[h] * l[h] === -1) {
    h === "x" ? (N = o.x ?? u.x + (c.x - u.x) * s, M = o.y ?? (u.y + c.y) / 2) : (N = o.x ?? (u.x + c.x) / 2, M = o.y ?? u.y + (c.y - u.y) * s);
    const v = [
      { x: N, y: u.y },
      { x: N, y: c.y }
    ], I = [
      { x: u.x, y: M },
      { x: c.x, y: M }
    ];
    a[h] === g ? _ = h === "x" ? v : I : _ = h === "x" ? I : v;
  } else {
    const v = [{ x: u.x, y: c.y }], I = [{ x: c.x, y: u.y }];
    if (h === "x" ? _ = a.x === g ? I : v : _ = a.y === g ? v : I, e === r) {
      const E = Math.abs(t[h] - n[h]);
      if (E <= i) {
        const k = Math.min(i - 1, i - E);
        a[h] === g ? $[h] = (u[h] > t[h] ? -1 : 1) * k : A[h] = (c[h] > n[h] ? -1 : 1) * k;
      }
    }
    if (e !== r) {
      const E = h === "x" ? "y" : "x", k = a[h] === l[E], d = u[E] > c[E], y = u[E] < c[E];
      (a[h] === 1 && (!k && d || k && y) || a[h] !== 1 && (!k && y || k && d)) && (_ = h === "x" ? v : I);
    }
    const R = { x: u.x + $.x, y: u.y + $.y }, z = { x: c.x + A.x, y: c.y + A.y }, q = Math.max(Math.abs(R.x - _[0].x), Math.abs(z.x - _[0].x)), P = Math.max(Math.abs(R.y - _[0].y), Math.abs(z.y - _[0].y));
    q >= P ? (N = (R.x + z.x) / 2, M = _[0].y) : (N = _[0].x, M = (R.y + z.y) / 2);
  }
  return [[
    t,
    { x: u.x + $.x, y: u.y + $.y },
    ..._,
    { x: c.x + A.x, y: c.y + A.y },
    n
  ], N, M, w, p];
}
function Du(t, e, n, r) {
  const o = Math.min(lr(t, e) / 2, lr(e, n) / 2, r), { x: i, y: s } = e;
  if (t.x === i && i === n.x || t.y === s && s === n.y)
    return `L${i} ${s}`;
  if (t.y === s) {
    const u = t.x < n.x ? -1 : 1, c = t.y < n.y ? 1 : -1;
    return `L ${i + o * u},${s}Q ${i},${s} ${i},${s + o * c}`;
  }
  const a = t.x < n.x ? 1 : -1, l = t.y < n.y ? -1 : 1;
  return `L ${i},${s + o * l}Q ${i},${s} ${i + o * a},${s}`;
}
function fr({ sourceX: t, sourceY: e, sourcePosition: n = D.Bottom, targetX: r, targetY: o, targetPosition: i = D.Top, borderRadius: s = 5, centerX: a, centerY: l, offset: u = 20, stepPosition: c = 0.5 }) {
  const [f, h, g, _, N] = zu({
    source: { x: t, y: e },
    sourcePosition: n,
    target: { x: r, y: o },
    targetPosition: i,
    center: { x: a, y: l },
    offset: u,
    stepPosition: c
  });
  return [f.reduce(($, A, w) => {
    let p = "";
    return w > 0 && w < f.length - 1 ? p = Du(f[w - 1], A, f[w + 1], s) : p = `${w === 0 ? "M" : "L"}${A.x} ${A.y}`, $ += p, $;
  }, ""), h, g, _, N];
}
function Dt(t, e, n = D.Left, r = !1) {
  const o = (e?.x ?? 0) + t.internals.positionAbsolute.x, i = (e?.y ?? 0) + t.internals.positionAbsolute.y, { width: s, height: a } = e ?? Lt(t);
  if (r)
    return { x: o + s / 2, y: i + a / 2 };
  switch (e?.position ?? n) {
    case D.Top:
      return { x: o + s / 2, y: i };
    case D.Right:
      return { x: o + s, y: i + a / 2 };
    case D.Bottom:
      return { x: o + s / 2, y: i + a };
    case D.Left:
      return { x: o, y: i + a / 2 };
  }
}
const ro = 1e3, Ru = 10, Pn = {
  nodeOrigin: [0, 0],
  nodeExtent: Ur,
  elevateNodesOnSelect: !0,
  zIndexMode: "basic",
  defaults: {}
}, Hu = {
  ...Pn,
  checkEquality: !0
};
function kn(t, e) {
  const n = { ...t };
  for (const r in e)
    e[r] !== void 0 && (n[r] = e[r]);
  return n;
}
function nn(t, e, n) {
  const r = kn(Pn, n);
  for (const o of t.values())
    if (o.parentId)
      oo(o, t, e, r);
    else {
      const i = ie(o, r.nodeOrigin), s = jt(o.extent) ? o.extent : r.nodeExtent, a = zt(i, s, Lt(o));
      o.internals.positionAbsolute = a;
    }
}
function Bu(t, e) {
  if (!t.handles)
    return t.measured ? e?.internals.handleBounds : void 0;
  const n = [], r = [];
  for (const o of t.handles) {
    const i = {
      id: o.id,
      width: o.width ?? 1,
      height: o.height ?? 1,
      nodeId: t.id,
      x: o.x,
      y: o.y,
      position: o.position,
      type: o.type
    };
    o.type === "source" ? n.push(i) : o.type === "target" && r.push(i);
  }
  return {
    source: n,
    target: r
  };
}
function An(t) {
  return t === "manual";
}
function Lu(t, e, n, r = {}) {
  const o = kn(Hu, r), i = { i: 0 }, s = new Map(e), a = o?.elevateNodesOnSelect && !An(o.zIndexMode) ? ro : 0;
  let l = t.length > 0;
  e.clear(), n.clear();
  for (const u of t) {
    let c = s.get(u.id);
    if (o.checkEquality && u === c?.internals.userNode)
      e.set(u.id, c);
    else {
      const f = ie(u, o.nodeOrigin), h = jt(u.extent) ? u.extent : o.nodeExtent, g = zt(f, h, Lt(u));
      c = {
        ...o.defaults,
        ...u,
        measured: {
          width: u.measured?.width,
          height: u.measured?.height
        },
        internals: {
          positionAbsolute: g,
          // if user re-initializes the node or removes `measured` for whatever reason, we reset the handleBounds so that the node gets re-measured
          handleBounds: Bu(u, c),
          z: io(u, a, o.zIndexMode),
          userNode: u
        }
      }, e.set(u.id, c);
    }
    (c.measured === void 0 || c.measured.width === void 0 || c.measured.height === void 0) && !c.hidden && (l = !1), u.parentId && oo(c, e, n, r, i);
  }
  return l;
}
function Vu(t, e) {
  if (!t.parentId)
    return;
  const n = e.get(t.parentId);
  n ? n.set(t.id, t) : e.set(t.parentId, /* @__PURE__ */ new Map([[t.id, t]]));
}
function oo(t, e, n, r, o) {
  const { elevateNodesOnSelect: i, nodeOrigin: s, nodeExtent: a, zIndexMode: l } = kn(Pn, r), u = t.parentId, c = e.get(u);
  if (!c) {
    console.warn(`Parent node ${u} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
    return;
  }
  Vu(t, n), o && !c.parentId && c.internals.rootParentIndex === void 0 && l === "auto" && (c.internals.rootParentIndex = ++o.i, c.internals.z = c.internals.z + o.i * Ru), o && c.internals.rootParentIndex !== void 0 && (o.i = c.internals.rootParentIndex);
  const f = i && !An(l) ? ro : 0, { x: h, y: g, z: _ } = Xu(t, c, s, a, f, l), { positionAbsolute: N } = t.internals, M = h !== N.x || g !== N.y;
  (M || _ !== t.internals.z) && e.set(t.id, {
    ...t,
    internals: {
      ...t.internals,
      positionAbsolute: M ? { x: h, y: g } : N,
      z: _
    }
  });
}
function io(t, e, n) {
  const r = wn(t.zIndex) ? t.zIndex : 0;
  return An(n) ? r : r + (t.selected ? e : 0);
}
function Xu(t, e, n, r, o, i) {
  const { x: s, y: a } = e.internals.positionAbsolute, l = Lt(t), u = ie(t, n), c = jt(t.extent) ? zt(u, t.extent, l) : u;
  let f = zt({ x: s + c.x, y: a + c.y }, r, l);
  t.extent === "parent" && (f = Nu(f, l, e));
  const h = io(t, o, i), g = e.internals.z ?? 0;
  return {
    x: f.x,
    y: f.y,
    z: g >= h ? g + 1 : h
  };
}
function so(t, e) {
  if (!t.parentId)
    return !1;
  const n = e.get(t.parentId);
  return n ? n.selected ? !0 : so(n, e) : !1;
}
function hr(t, e, n) {
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
function Yu(t, e, n, r) {
  const o = /* @__PURE__ */ new Map();
  for (const [i, s] of t)
    if ((s.selected || s.id === r) && (!s.parentId || !so(s, t)) && (s.draggable || e && typeof s.draggable > "u")) {
      const a = t.get(i);
      a && o.set(i, {
        id: i,
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
  return o;
}
function rn({ nodeId: t, dragItems: e, nodeLookup: n, dragging: r = !0 }) {
  const o = [];
  for (const [s, a] of e) {
    const l = n.get(s)?.internals.userNode;
    l && o.push({
      ...l,
      position: a.position,
      dragging: r
    });
  }
  if (!t)
    return [o[0], o];
  const i = n.get(t)?.internals.userNode;
  return [
    i ? {
      ...i,
      position: e.get(t)?.position || i.position,
      dragging: r
    } : o[0],
    o
  ];
}
function Wu({ dragItems: t, snapGrid: e, x: n, y: r }) {
  const o = t.values().next().value;
  if (!o)
    return null;
  const i = {
    x: n - o.distance.x,
    y: r - o.distance.y
  }, s = Ve(i, e);
  return {
    x: s.x - i.x,
    y: s.y - i.y
  };
}
function qu({ onNodeMouseDown: t, getStoreItems: e, onDragStart: n, onDrag: r, onDragStop: o }) {
  let i = { x: null, y: null }, s = 0, a = /* @__PURE__ */ new Map(), l = !1, u = { x: 0, y: 0 }, c = null, f = !1, h = null, g = !1, _ = !1, N = null;
  function M({ noDragClassName: A, handleSelector: w, domNode: p, isSelectable: x, nodeId: v, nodeClickDistance: I = 0 }) {
    h = rt(p);
    function R({ x: E, y: k }) {
      const { nodeLookup: d, nodeExtent: y, snapGrid: m, snapToGrid: b, nodeOrigin: S, onNodeDrag: T, onSelectionDrag: C, onError: O, updateNodePositions: H } = e();
      i = { x: E, y: k };
      let W = !1;
      const B = a.size > 1, Y = B && y ? xn(Qr(a)) : null, Q = B && b ? Wu({
        dragItems: a,
        snapGrid: m,
        x: E,
        y: k
      }) : null;
      for (const [L, V] of a) {
        if (!d.has(L))
          continue;
        let J = { x: E - V.distance.x, y: k - V.distance.y };
        b && (J = Q ? {
          x: Math.round(J.x + Q.x),
          y: Math.round(J.y + Q.y)
        } : Ve(J, m));
        let ot = null;
        if (B && y && !V.extent && Y) {
          const { positionAbsolute: F } = V.internals, pt = F.x - Y.x + y[0][0], Ye = F.x + V.measured.width - Y.x2 + y[1][0], ae = F.y - Y.y + y[0][1], We = F.y + V.measured.height - Y.y2 + y[1][1];
          ot = [
            [pt, ae],
            [Ye, We]
          ];
        }
        const { position: U, positionAbsolute: dt } = $u({
          nodeId: L,
          nextPosition: J,
          nodeLookup: d,
          nodeExtent: ot || y,
          nodeOrigin: S,
          onError: O
        });
        W = W || V.position.x !== U.x || V.position.y !== U.y, V.position = U, V.internals.positionAbsolute = dt;
      }
      if (_ = _ || W, !!W && (H(a, !0), N && (r || T || !v && C))) {
        const [L, V] = rn({
          nodeId: v,
          dragItems: a,
          nodeLookup: d
        });
        r?.(N, a, L, V), T?.(N, L, V), v || C?.(N, V);
      }
    }
    async function z() {
      if (!c)
        return;
      const { transform: E, panBy: k, autoPanSpeed: d, autoPanOnNodeDrag: y } = e();
      if (!y) {
        l = !1, cancelAnimationFrame(s);
        return;
      }
      const [m, b] = Jr(u, c, d);
      (m !== 0 || b !== 0) && (i.x = (i.x ?? 0) - m / E[2], i.y = (i.y ?? 0) - b / E[2], await k({ x: m, y: b }) && R(i)), s = requestAnimationFrame(z);
    }
    function q(E) {
      const { nodeLookup: k, multiSelectionActive: d, nodesDraggable: y, transform: m, snapGrid: b, snapToGrid: S, selectNodesOnDrag: T, onNodeDragStart: C, onSelectionDragStart: O, unselectNodesAndEdges: H } = e();
      f = !0, (!T || !x) && !d && v && (k.get(v)?.selected || H()), x && T && v && t?.(v);
      const W = en(E.sourceEvent, { transform: m, snapGrid: b, snapToGrid: S, containerBounds: c });
      if (i = W, a = Yu(k, y, W, v), a.size > 0 && (n || C || !v && O)) {
        const [B, Y] = rn({
          nodeId: v,
          dragItems: a,
          nodeLookup: k
        });
        n?.(E.sourceEvent, a, B, Y), C?.(E.sourceEvent, B, Y), v || O?.(E.sourceEvent, Y);
      }
    }
    const P = Ms().clickDistance(I).on("start", (E) => {
      const { domNode: k, nodeDragThreshold: d, transform: y, snapGrid: m, snapToGrid: b } = e();
      c = k?.getBoundingClientRect() || null, g = !1, _ = !1, N = E.sourceEvent, d === 0 && q(E), i = en(E.sourceEvent, { transform: y, snapGrid: m, snapToGrid: b, containerBounds: c }), u = yt(E.sourceEvent, c);
    }).on("drag", (E) => {
      const { autoPanOnNodeDrag: k, transform: d, snapGrid: y, snapToGrid: m, nodeDragThreshold: b, nodeLookup: S } = e(), T = en(E.sourceEvent, { transform: d, snapGrid: y, snapToGrid: m, containerBounds: c });
      if (N = E.sourceEvent, (E.sourceEvent.type === "touchmove" && E.sourceEvent.touches.length > 1 || // if user deletes a node while dragging, we need to abort the drag to prevent errors
      v && !S.has(v)) && (g = !0), !g) {
        if (!l && k && f && (l = !0, z()), !f) {
          const C = yt(E.sourceEvent, c), O = C.x - u.x, H = C.y - u.y;
          Math.sqrt(O * O + H * H) > b && q(E);
        }
        (i.x !== T.xSnapped || i.y !== T.ySnapped) && a && f && (u = yt(E.sourceEvent, c), R(T));
      }
    }).on("end", (E) => {
      if (!(!f || g) && (l = !1, f = !1, cancelAnimationFrame(s), a.size > 0)) {
        const { nodeLookup: k, updateNodePositions: d, onNodeDragStop: y, onSelectionDragStop: m } = e();
        if (_ && (d(a, !1), _ = !1), o || y || !v && m) {
          const [b, S] = rn({
            nodeId: v,
            dragItems: a,
            nodeLookup: k,
            dragging: !1
          });
          o?.(E.sourceEvent, a, b, S), y?.(E.sourceEvent, b, S), v || m?.(E.sourceEvent, S);
        }
      }
    }).filter((E) => {
      const k = E.target;
      return !E.button && (!A || !hr(k, `.${A}`, p)) && (!w || hr(k, w, p));
    });
    h.call(P);
  }
  function $() {
    h?.on(".drag", null);
  }
  return {
    update: M,
    destroy: $
  };
}
function Fu(t, e, n) {
  const r = [], o = {
    x: t.x - n,
    y: t.y - n,
    width: n * 2,
    height: n * 2
  };
  for (const i of e.values())
    Tu(o, Eu(i)) > 0 && r.push(i);
  return r;
}
const Zu = 250;
function Gu(t, e, n, r) {
  let o = [], i = 1 / 0;
  const s = Fu(t, n, e + Zu);
  for (const a of s) {
    const l = [...a.internals.handleBounds?.source ?? [], ...a.internals.handleBounds?.target ?? []];
    for (const u of l) {
      if (r.nodeId === u.nodeId && r.type === u.type && r.id === u.id)
        continue;
      const { x: c, y: f } = Dt(a, u, u.position, !0), h = Math.sqrt(Math.pow(c - t.x, 2) + Math.pow(f - t.y, 2));
      h > e || (h < i ? (o = [{ ...u, x: c, y: f }], i = h) : h === i && o.push({ ...u, x: c, y: f }));
    }
  }
  if (!o.length)
    return null;
  if (o.length > 1) {
    const a = r.type === "source" ? "target" : "source";
    return o.find((l) => l.type === a) ?? o[0];
  }
  return o[0];
}
function ao(t, e, n, r, o, i = !1) {
  const s = r.get(t);
  if (!s)
    return null;
  const a = o === "strict" ? s.internals.handleBounds?.[e] : [...s.internals.handleBounds?.source ?? [], ...s.internals.handleBounds?.target ?? []], l = (n ? a?.find((u) => u.id === n) : a?.[0]) ?? null;
  return l && i ? { ...l, ...Dt(s, l, l.position, !0) } : l;
}
function uo(t, e) {
  return t || (e?.classList.contains("target") ? "target" : e?.classList.contains("source") ? "source" : null);
}
function Uu(t, e) {
  let n = null;
  return e ? n = !0 : t && !e && (n = !1), n;
}
const co = () => !0;
function Ku(t, { connectionMode: e, connectionRadius: n, handleId: r, nodeId: o, edgeUpdaterType: i, isTarget: s, domNode: a, nodeLookup: l, lib: u, autoPanOnConnect: c, flowId: f, panBy: h, cancelConnection: g, onConnectStart: _, onConnect: N, onConnectEnd: M, isValidConnection: $ = co, onReconnectEnd: A, updateConnection: w, getTransform: p, getFromHandle: x, autoPanSpeed: v, dragThreshold: I = 1, handleDomNode: R }) {
  const z = Mu(t.target);
  let q = 0, P;
  const { x: E, y: k } = yt(t), d = uo(i, R), y = a?.getBoundingClientRect();
  let m = !1;
  if (!y || !d)
    return;
  const b = ao(o, d, r, l, e);
  if (!b)
    return;
  let S = yt(t, y), T = !1, C = null, O = !1, H = null;
  function W() {
    if (!c || !y)
      return;
    const [U, dt] = Jr(S, y, v);
    h({ x: U, y: dt }), q = requestAnimationFrame(W);
  }
  const B = {
    ...b,
    nodeId: o,
    type: d,
    position: b.position
  }, Y = l.get(o);
  let L = {
    inProgress: !0,
    isValid: null,
    from: Dt(Y, B, D.Left, !0),
    fromHandle: B,
    fromPosition: B.position,
    fromNode: Y,
    to: S,
    toHandle: null,
    toPosition: sr[B.position],
    toNode: null,
    pointer: S
  };
  function V() {
    m = !0, w(L), _?.(t, { nodeId: o, handleId: r, handleType: d });
  }
  I === 0 && V();
  function J(U) {
    if (!m) {
      const { x: We, y: mo } = yt(U), On = We - E, zn = mo - k;
      if (!(On * On + zn * zn > I * I))
        return;
      V();
    }
    if (!x() || !B) {
      ot(U);
      return;
    }
    const dt = p();
    S = yt(U, y), P = Gu(eo(S, dt, !1, [1, 1]), n, l, B), T || (W(), T = !0);
    const F = lo(U, {
      handle: P,
      connectionMode: e,
      fromNodeId: o,
      fromHandleId: r,
      fromType: s ? "target" : "source",
      isValidConnection: $,
      doc: z,
      lib: u,
      flowId: f,
      nodeLookup: l
    });
    H = F.handleDomNode, C = F.connection, O = Uu(!!P, F.isValid);
    const pt = l.get(o), Ye = pt ? Dt(pt, B, D.Left, !0) : L.from, ae = {
      ...L,
      from: Ye,
      isValid: O,
      to: F.toHandle && O ? Iu({ x: F.toHandle.x, y: F.toHandle.y }, dt) : S,
      toHandle: F.toHandle,
      toPosition: O && F.toHandle ? F.toHandle.position : sr[B.position],
      toNode: F.toHandle ? l.get(F.toHandle.nodeId) : null,
      pointer: S
    };
    w(ae), L = ae;
  }
  function ot(U) {
    if (!("touches" in U && U.touches.length > 0)) {
      if (m) {
        (P || H) && C && O && N?.(C);
        const { inProgress: dt, ...F } = L, pt = {
          ...F,
          toPosition: L.toHandle ? L.toPosition : null
        };
        M?.(U, pt), i && A?.(U, pt);
      }
      g(), cancelAnimationFrame(q), T = !1, O = !1, C = null, H = null, z.removeEventListener("mousemove", J), z.removeEventListener("mouseup", ot), z.removeEventListener("touchmove", J), z.removeEventListener("touchend", ot);
    }
  }
  z.addEventListener("mousemove", J), z.addEventListener("mouseup", ot), z.addEventListener("touchmove", J), z.addEventListener("touchend", ot);
}
function lo(t, { handle: e, connectionMode: n, fromNodeId: r, fromHandleId: o, fromType: i, doc: s, lib: a, flowId: l, isValidConnection: u = co, nodeLookup: c }) {
  const f = i === "target", h = e ? s.querySelector(`.${a}-flow__handle[data-id="${l}-${e?.nodeId}-${e?.id}-${e?.type}"]`) : null, { x: g, y: _ } = yt(t), N = s.elementFromPoint(g, _), M = N?.classList.contains(`${a}-flow__handle`) ? N : h, $ = {
    handleDomNode: M,
    isValid: !1,
    connection: null,
    toHandle: null
  };
  if (M) {
    const A = uo(void 0, M), w = M.getAttribute("data-nodeid"), p = M.getAttribute("data-handleid"), x = M.classList.contains("connectable"), v = M.classList.contains("connectableend");
    if (!w || !A)
      return $;
    const I = {
      source: f ? w : r,
      sourceHandle: f ? p : o,
      target: f ? r : w,
      targetHandle: f ? o : p
    };
    $.connection = I;
    const z = x && v && (n === ke.Strict ? f && A === "source" || !f && A === "target" : w !== r || p !== o);
    $.isValid = z && u(I), $.toHandle = ao(w, A, p, c, n, !0);
  }
  return $;
}
const Qu = {
  onPointerDown: Ku,
  isValid: lo
};
function Ju({ domNode: t, panZoom: e, getTransform: n, getViewScale: r }) {
  const o = rt(t);
  function i({ translateExtent: a, width: l, height: u, zoomStep: c = 1, pannable: f = !0, zoomable: h = !0, inversePan: g = !1 }) {
    const _ = (w) => {
      if (w.sourceEvent.type !== "wheel" || !e)
        return;
      const p = n(), x = w.sourceEvent.ctrlKey && Mn() ? 10 : 1, v = -w.sourceEvent.deltaY * (w.sourceEvent.deltaMode === 1 ? 0.05 : w.sourceEvent.deltaMode ? 1 : 2e-3) * c, I = p[2] * Math.pow(2, v * x);
      e.scaleTo(I);
    };
    let N = [0, 0];
    const M = (w) => {
      (w.sourceEvent.type === "mousedown" || w.sourceEvent.type === "touchstart") && (N = [
        w.sourceEvent.clientX ?? w.sourceEvent.touches[0].clientX,
        w.sourceEvent.clientY ?? w.sourceEvent.touches[0].clientY
      ]);
    }, $ = (w) => {
      const p = n();
      if (w.sourceEvent.type !== "mousemove" && w.sourceEvent.type !== "touchmove" || !e)
        return;
      const x = [
        w.sourceEvent.clientX ?? w.sourceEvent.touches[0].clientX,
        w.sourceEvent.clientY ?? w.sourceEvent.touches[0].clientY
      ], v = [x[0] - N[0], x[1] - N[1]];
      N = x;
      const I = r() * Math.max(p[2], Math.log(p[2])) * (g ? -1 : 1), R = {
        x: p[0] - v[0] * I,
        y: p[1] - v[1] * I
      }, z = [
        [0, 0],
        [l, u]
      ];
      e.setViewportConstrained({
        x: R.x,
        y: R.y,
        zoom: p[2]
      }, z, a);
    }, A = Gr().on("start", M).on("zoom", f ? $ : null).on("zoom.wheel", h ? _ : null);
    o.call(A, {});
  }
  function s() {
    o.on("zoom", null);
  }
  return {
    update: i,
    destroy: s,
    pointer: it
  };
}
const Xe = (t) => ({
  x: t.x,
  y: t.y,
  zoom: t.k
}), on = ({ x: t, y: e, zoom: n }) => Le.translate(t, e).scale(n), Ct = (t, e) => t.target.closest(`.${e}`), fo = (t, e) => e === 2 && Array.isArray(t) && t.includes(2), ju = (t) => ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2, sn = (t, e = 0, n = ju, r = () => {
}) => {
  const o = typeof e == "number" && e > 0;
  return o || r(), o ? t.transition().duration(e).ease(n).on("end", r) : t;
}, ho = (t) => {
  const e = t.ctrlKey && Mn() ? 10 : 1;
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * e;
};
function tc({ zoomPanValues: t, noWheelClassName: e, d3Selection: n, d3Zoom: r, panOnScrollMode: o, panOnScrollSpeed: i, zoomOnPinch: s, onPanZoomStart: a, onPanZoom: l, onPanZoomEnd: u }) {
  return (c) => {
    if (Ct(c, e))
      return c.ctrlKey && c.preventDefault(), !1;
    c.preventDefault(), c.stopImmediatePropagation();
    const f = n.property("__zoom").k || 1;
    if (c.ctrlKey && s) {
      const M = it(c), $ = ho(c), A = f * Math.pow(2, $);
      r.scaleTo(n, A, M, c);
      return;
    }
    const h = c.deltaMode === 1 ? 20 : 1;
    let g = o === Pt.Vertical ? 0 : c.deltaX * h, _ = o === Pt.Horizontal ? 0 : c.deltaY * h;
    !Mn() && c.shiftKey && o !== Pt.Vertical && (g = c.deltaY * h, _ = 0), r.translateBy(
      n,
      -(g / f) * i,
      -(_ / f) * i,
      // @ts-ignore
      { internal: !0 }
    );
    const N = Xe(n.property("__zoom"));
    clearTimeout(t.panScrollTimeout), t.isPanScrolling ? (l?.(c, N), t.panScrollTimeout = setTimeout(() => {
      u?.(c, N), t.isPanScrolling = !1;
    }, 150)) : (t.isPanScrolling = !0, a?.(c, N));
  };
}
function ec({ noWheelClassName: t, preventScrolling: e, d3ZoomHandler: n }) {
  return function(r, o) {
    const i = r.type === "wheel", s = !e && i && !r.ctrlKey, a = Ct(r, t);
    if (r.ctrlKey && i && a && r.preventDefault(), s || a)
      return null;
    r.preventDefault(), n.call(this, r, o);
  };
}
function nc({ zoomPanValues: t, onDraggingChange: e, onPanZoomStart: n }) {
  return (r) => {
    if (r.sourceEvent?.internal)
      return;
    const o = Xe(r.transform);
    t.mouseButton = r.sourceEvent?.button || 0, t.isZoomingOrPanning = !0, t.prevViewport = o, r.sourceEvent?.type, n && n?.(r.sourceEvent, o);
  };
}
function rc({ zoomPanValues: t, panOnDrag: e, onPaneContextMenu: n, onTransformChange: r, onPanZoom: o }) {
  return (i) => {
    t.usedRightMouseButton = !!(n && fo(e, t.mouseButton ?? 0)), i.sourceEvent?.sync || r([i.transform.x, i.transform.y, i.transform.k]), o && !i.sourceEvent?.internal && o?.(i.sourceEvent, Xe(i.transform));
  };
}
function oc({ zoomPanValues: t, panOnDrag: e, panOnScroll: n, onDraggingChange: r, onPanZoomEnd: o, onPaneContextMenu: i }) {
  return (s) => {
    if (!s.sourceEvent?.internal && (t.isZoomingOrPanning = !1, i && fo(e, t.mouseButton ?? 0) && !t.usedRightMouseButton && s.sourceEvent && i(s.sourceEvent), t.usedRightMouseButton = !1, o)) {
      const a = Xe(s.transform);
      t.prevViewport = a, clearTimeout(t.timerId), t.timerId = setTimeout(
        () => {
          o?.(s.sourceEvent, a);
        },
        // we need a setTimeout for panOnScroll to supress multiple end events fired during scroll
        n ? 150 : 0
      );
    }
  };
}
function ic({ zoomActivationKeyPressed: t, zoomOnScroll: e, zoomOnPinch: n, panOnDrag: r, panOnScroll: o, zoomOnDoubleClick: i, userSelectionActive: s, noWheelClassName: a, noPanClassName: l, lib: u, connectionInProgress: c }) {
  return (f) => {
    const h = t || e, g = n && f.ctrlKey, _ = f.type === "wheel";
    if (f.button === 1 && f.type === "mousedown" && (Ct(f, `${u}-flow__node`) || Ct(f, `${u}-flow__edge`)))
      return !0;
    if (!r && !h && !o && !i && !n || s || c && !_ || Ct(f, a) && _ || Ct(f, l) && (!_ || o && _ && !t) || !n && f.ctrlKey && _)
      return !1;
    if (!n && f.type === "touchstart" && f.touches?.length > 1)
      return f.preventDefault(), !1;
    if (!h && !o && !g && _ || !r && (f.type === "mousedown" || f.type === "touchstart") || Array.isArray(r) && !r.includes(f.button) && f.type === "mousedown")
      return !1;
    const N = Array.isArray(r) && r.includes(f.button) || !f.button || f.button <= 1;
    return (!f.ctrlKey || _) && N;
  };
}
function sc({ domNode: t, minZoom: e, maxZoom: n, translateExtent: r, viewport: o, onPanZoom: i, onPanZoomStart: s, onPanZoomEnd: a, onDraggingChange: l }) {
  const u = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: {},
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, c = t.getBoundingClientRect(), f = Gr().scaleExtent([e, n]).translateExtent(r), h = rt(t).call(f);
  A({
    x: o.x,
    y: o.y,
    zoom: Jt(o.zoom, e, n)
  }, [
    [0, 0],
    [c.width, c.height]
  ], r);
  const g = h.on("wheel.zoom"), _ = h.on("dblclick.zoom");
  f.wheelDelta(ho);
  function N(P, E) {
    return h ? new Promise((k) => {
      f?.interpolate(E?.interpolate === "linear" ? Zt : we).transform(sn(h, E?.duration, E?.ease, () => k(!0)), P);
    }) : Promise.resolve(!1);
  }
  function M({ noWheelClassName: P, noPanClassName: E, onPaneContextMenu: k, userSelectionActive: d, panOnScroll: y, panOnDrag: m, panOnScrollMode: b, panOnScrollSpeed: S, preventScrolling: T, zoomOnPinch: C, zoomOnScroll: O, zoomOnDoubleClick: H, zoomActivationKeyPressed: W, lib: B, onTransformChange: Y, connectionInProgress: Q, paneClickDistance: L, selectionOnDrag: V }) {
    d && !u.isZoomingOrPanning && $();
    const J = y && !W && !d;
    f.clickDistance(V ? 1 / 0 : !wn(L) || L < 0 ? 0 : L);
    const ot = J ? tc({
      zoomPanValues: u,
      noWheelClassName: P,
      d3Selection: h,
      d3Zoom: f,
      panOnScrollMode: b,
      panOnScrollSpeed: S,
      zoomOnPinch: C,
      onPanZoomStart: s,
      onPanZoom: i,
      onPanZoomEnd: a
    }) : ec({
      noWheelClassName: P,
      preventScrolling: T,
      d3ZoomHandler: g
    });
    if (h.on("wheel.zoom", ot, { passive: !1 }), !d) {
      const dt = nc({
        zoomPanValues: u,
        onDraggingChange: l,
        onPanZoomStart: s
      });
      f.on("start", dt);
      const F = rc({
        zoomPanValues: u,
        panOnDrag: m,
        onPaneContextMenu: !!k,
        onPanZoom: i,
        onTransformChange: Y
      });
      f.on("zoom", F);
      const pt = oc({
        zoomPanValues: u,
        panOnDrag: m,
        panOnScroll: y,
        onPaneContextMenu: k,
        onPanZoomEnd: a,
        onDraggingChange: l
      });
      f.on("end", pt);
    }
    const U = ic({
      zoomActivationKeyPressed: W,
      panOnDrag: m,
      zoomOnScroll: O,
      panOnScroll: y,
      zoomOnDoubleClick: H,
      zoomOnPinch: C,
      userSelectionActive: d,
      noPanClassName: E,
      noWheelClassName: P,
      lib: B,
      connectionInProgress: Q
    });
    f.filter(U), H ? h.on("dblclick.zoom", _) : h.on("dblclick.zoom", null);
  }
  function $() {
    f.on("zoom", null);
  }
  async function A(P, E, k) {
    const d = on(P), y = f?.constrain()(d, E, k);
    return y && await N(y), new Promise((m) => m(y));
  }
  async function w(P, E) {
    const k = on(P);
    return await N(k, E), new Promise((d) => d(k));
  }
  function p(P) {
    if (h) {
      const E = on(P), k = h.property("__zoom");
      (k.k !== P.zoom || k.x !== P.x || k.y !== P.y) && f?.transform(h, E, null, { sync: !0 });
    }
  }
  function x() {
    const P = h ? Zr(h.node()) : { x: 0, y: 0, k: 1 };
    return { x: P.x, y: P.y, zoom: P.k };
  }
  function v(P, E) {
    return h ? new Promise((k) => {
      f?.interpolate(E?.interpolate === "linear" ? Zt : we).scaleTo(sn(h, E?.duration, E?.ease, () => k(!0)), P);
    }) : Promise.resolve(!1);
  }
  function I(P, E) {
    return h ? new Promise((k) => {
      f?.interpolate(E?.interpolate === "linear" ? Zt : we).scaleBy(sn(h, E?.duration, E?.ease, () => k(!0)), P);
    }) : Promise.resolve(!1);
  }
  function R(P) {
    f?.scaleExtent(P);
  }
  function z(P) {
    f?.translateExtent(P);
  }
  function q(P) {
    const E = !wn(P) || P < 0 ? 0 : P;
    f?.clickDistance(E);
  }
  return {
    update: M,
    destroy: $,
    setViewport: w,
    setViewportConstrained: A,
    getViewport: x,
    scaleTo: v,
    scaleBy: I,
    setScaleExtent: R,
    setTranslateExtent: z,
    syncViewport: p,
    setClickDistance: q
  };
}
var dr;
(function(t) {
  t.Line = "line", t.Handle = "handle";
})(dr || (dr = {}));
function ac() {
  return {
    nodes: le([]),
    edges: le([]),
    nodeLookup: /* @__PURE__ */ new Map(),
    parentLookup: /* @__PURE__ */ new Map(),
    nodeExtent: Ur,
    snapGrid: [15, 15],
    snapToGrid: !1,
    nodeOrigin: [0, 0],
    multiSelectionActive: !1,
    transform: le([0, 0, 1]),
    autoPanOnNodeDrag: !0,
    nodesDraggable: !0,
    selectNodesOnDrag: !0,
    nodeDragThreshold: 0,
    panZoom: null,
    domNode: null,
    connectionInProgress: le(null)
  };
}
const uc = te`
  :host {
    /* Colors - Light Theme Defaults */
    --md-sys-color-primary: #005ac1;
    --md-sys-color-on-primary: #ffffff;
    --md-sys-color-primary-container: #d8e2ff;
    --md-sys-color-on-primary-container: #001a41;
    
    --md-sys-color-secondary: #575e71;
    --md-sys-color-on-secondary: #ffffff;
    --md-sys-color-secondary-container: #dbe2f9;
    --md-sys-color-on-secondary-container: #141b2c;
    
    --md-sys-color-surface: #fefbff;
    --md-sys-color-on-surface: #1b1b1f;
    --md-sys-color-surface-variant: #e1e2ec;
    --md-sys-color-on-surface-variant: #44474f;
    
    --md-sys-color-outline: #74777f;
    --md-sys-color-outline-variant: #c4c6d0;
    
    --md-sys-color-background: #fefbff;
    --md-sys-color-on-background: #1b1b1f;

    --md-sys-color-error: #ba1a1a;
    --md-sys-color-on-error: #ffffff;

    /* Typography */
    --md-sys-typescale-body-medium-font: Roboto, sans-serif;
    --md-sys-typescale-body-medium-size: 14px;
    --md-sys-typescale-label-small-size: 11px;
    --md-sys-typescale-label-medium-size: 12px;

    /* Elevation */
    --md-sys-elevation-1: 0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3);
    --md-sys-elevation-2: 0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3);
    
    /* Shape */
    --md-sys-shape-corner-small: 8px;
    --md-sys-shape-corner-medium: 12px;
    --md-sys-shape-corner-extra-small: 4px;

    /* LitFlow Specific Tokens (mapped to M3) */
    --lit-flow-node-bg: var(--md-sys-color-surface);
    --lit-flow-node-border: var(--md-sys-color-outline-variant);
    --lit-flow-node-selected-border: var(--md-sys-color-primary);
    --lit-flow-node-text: var(--md-sys-color-on-surface);
    
    --lit-flow-handle-source: var(--md-sys-color-secondary);
    --lit-flow-handle-target: var(--md-sys-color-primary);
    --lit-flow-handle-outline: var(--md-sys-color-surface);

    --lit-flow-controls-bg: var(--md-sys-color-surface);
    --lit-flow-controls-button-text: var(--md-sys-color-on-surface);
    
    --lit-flow-minimap-bg: var(--md-sys-color-surface);
    --lit-flow-minimap-mask: rgba(0, 0, 0, 0.08);
  }
`;
var cc = Object.defineProperty, lc = Object.getOwnPropertyDescriptor, Vt = (t, e, n, r) => {
  for (var o = r > 1 ? void 0 : r ? lc(e, n) : e, i = t.length - 1, s; i >= 0; i--)
    (s = t[i]) && (o = (r ? s(e, n, o) : s(o)) || o);
  return r && o && cc(e, n, o), o;
};
let Et = class extends ne(Ht) {
  constructor() {
    super(...arguments), this.label = "", this.type = "default", this.data = {}, this.selected = !1, this.nodeId = "";
  }
  createRenderRoot() {
    return this;
  }
  render() {
    return Tt`
      <div class="label" style="font-size: 12px; color: #222; pointer-events: none;">${this.label}</div>
      <slot></slot>
      ${this.type === "input" || this.type === "default" ? Tt`<lit-handle type="source" data-handlepos="bottom" data-nodeid="${this.nodeId}"></lit-handle>` : ""}
      ${this.type === "output" || this.type === "default" ? Tt`<lit-handle type="target" data-handlepos="top" data-nodeid="${this.nodeId}"></lit-handle>` : ""}
    `;
  }
};
Vt([
  X({ type: String })
], Et.prototype, "label", 2);
Vt([
  X({ type: String, reflect: !0 })
], Et.prototype, "type", 2);
Vt([
  X({ type: Object })
], Et.prototype, "data", 2);
Vt([
  X({ type: Boolean, reflect: !0 })
], Et.prototype, "selected", 2);
Vt([
  X({ type: String, attribute: "data-id", reflect: !0 })
], Et.prototype, "nodeId", 2);
Et = Vt([
  Bt("lit-node")
], Et);
var fc = Object.defineProperty, hc = Object.getOwnPropertyDescriptor, wt = (t, e, n, r) => {
  for (var o = r > 1 ? void 0 : r ? hc(e, n) : e, i = t.length - 1, s; i >= 0; i--)
    (s = t[i]) && (o = (r ? s(e, n, o) : s(o)) || o);
  return r && o && fc(e, n, o), o;
};
let lt = class extends ne(Ht) {
  constructor() {
    super(...arguments), this.sourceX = 0, this.sourceY = 0, this.targetX = 0, this.targetY = 0, this.sourcePosition = D.Right, this.targetPosition = D.Left, this.selected = !1;
  }
  render() {
    const [t] = _n({
      sourceX: this.sourceX,
      sourceY: this.sourceY,
      sourcePosition: this.sourcePosition,
      targetX: this.targetX,
      targetY: this.targetY,
      targetPosition: this.targetPosition
    });
    return $e`
      <path d="${t}" />
    `;
  }
};
lt.styles = te`
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
wt([
  X({ type: Number })
], lt.prototype, "sourceX", 2);
wt([
  X({ type: Number })
], lt.prototype, "sourceY", 2);
wt([
  X({ type: Number })
], lt.prototype, "targetX", 2);
wt([
  X({ type: Number })
], lt.prototype, "targetY", 2);
wt([
  X({ type: String })
], lt.prototype, "sourcePosition", 2);
wt([
  X({ type: String })
], lt.prototype, "targetPosition", 2);
wt([
  X({ type: Boolean, reflect: !0 })
], lt.prototype, "selected", 2);
lt = wt([
  Bt("lit-edge")
], lt);
var dc = Object.defineProperty, pc = Object.getOwnPropertyDescriptor, nt = (t, e, n, r) => {
  for (var o = r > 1 ? void 0 : r ? pc(e, n) : e, i = t.length - 1, s; i >= 0; i--)
    (s = t[i]) && (o = (r ? s(e, n, o) : s(o)) || o);
  return r && o && dc(e, n, o), o;
};
let j = class extends ne(Ht) {
  constructor() {
    super(...arguments), this._drags = /* @__PURE__ */ new Map(), this._state = ac(), this.nodeTypes = {
      default: "lit-node",
      input: "lit-node",
      output: "lit-node"
    }, this.showControls = !1, this.showMinimap = !1, this._width = 0, this._height = 0, this.viewport = { x: 0, y: 0, zoom: 1 };
  }
  set nodes(t) {
    this._state.nodes.set(t), Lu(t, this._state.nodeLookup, this._state.parentLookup, {
      nodeOrigin: this._state.nodeOrigin,
      nodeExtent: this._state.nodeExtent
    }), nn(this._state.nodeLookup, this._state.parentLookup, {
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
      const { width: r, height: o } = e.getBoundingClientRect(), i = this._state.transform.get()[2];
      n.measured = {
        width: r / i,
        height: o / i
      };
      const s = this.nodes.find((l) => l.id === t);
      s && (s.measured = n.measured);
      const a = e.querySelectorAll("lit-handle");
      if (a && a.length > 0) {
        const l = [], u = [];
        a.forEach((c) => {
          const f = c.getBoundingClientRect(), h = e.getBoundingClientRect(), g = {
            id: c.handleId || null,
            type: c.type,
            position: c.position,
            x: (f.left - h.left) / i,
            y: (f.top - h.top) / i,
            width: f.width / i,
            height: f.height / i
          };
          c.type === "source" ? l.push(g) : u.push(g);
        }), n.internals.handleBounds = {
          source: l,
          target: u
        }, console.log(`Node ${t} handleBounds:`, n.internals.handleBounds);
      }
      nn(this._state.nodeLookup, this._state.parentLookup, {
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
    }, this._panZoom = sc({
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
      panOnScrollMode: Pt.Free,
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
    const t = this.shadowRoot?.querySelectorAll(".xyflow__node"), e = /* @__PURE__ */ new Set();
    t?.forEach((n) => {
      const r = n.dataset.id;
      if (r) {
        e.add(r), this._resizeObserver?.observe(n), n.onclick = (i) => {
          i.stopPropagation(), this._selectNode(r, i.shiftKey || i.metaKey);
        };
        let o = this._drags.get(r);
        o || (o = qu({
          getStoreItems: () => ({
            ...this._state,
            nodes: this._state.nodes.get(),
            edges: this._state.edges.get(),
            transform: this._state.transform.get(),
            panBy: async (i) => {
              const { panZoom: s, nodeExtent: a } = this._state, l = this._state.transform.get();
              return s ? !!await s.setViewportConstrained(
                {
                  x: l[0] + i.x,
                  y: l[1] + i.y,
                  zoom: l[2]
                },
                [[0, 0], [this.offsetWidth, this.offsetHeight]],
                a
              ) : !1;
            },
            updateNodePositions: (i) => {
              i.forEach((s, a) => {
                const l = this._state.nodeLookup.get(a);
                if (l) {
                  l.position = s.position, l.internals.positionAbsolute = s.internals.positionAbsolute;
                  const u = this.nodes.find((c) => c.id === a);
                  u && (u.position = s.position);
                }
              }), nn(this._state.nodeLookup, this._state.parentLookup, {
                nodeOrigin: this._state.nodeOrigin,
                nodeExtent: this._state.nodeExtent
              }), this._state.nodes.set([...this.nodes]);
            },
            unselectNodesAndEdges: () => {
            }
          })
        }), this._drags.set(r, o)), o.update({
          domNode: n,
          nodeId: r
        });
      }
    });
    for (const n of this._drags.keys())
      e.has(n) || this._drags.delete(n);
  }
  _renderEdge(t) {
    const e = this._state.nodeLookup.get(t.source), n = this._state.nodeLookup.get(t.target);
    if (!e || !n) return null;
    const r = this.nodes.find((f) => f.id === t.source), o = this.nodes.find((f) => f.id === t.target);
    if (r?.hidden || o?.hidden) return null;
    const i = (e.internals.handleBounds?.source || []).find(
      (f) => f.id === (t.sourceHandle || null)
    ) || e.internals.handleBounds?.source?.[0] || {
      nodeId: t.source,
      position: D.Bottom,
      x: (e.measured.width || 0) / 2,
      y: e.measured.height || 0,
      width: 1,
      height: 1
    }, s = (n.internals.handleBounds?.target || []).find(
      (f) => f.id === (t.targetHandle || null)
    ) || n.internals.handleBounds?.target?.[0] || {
      nodeId: t.target,
      position: D.Top,
      x: (n.measured.width || 0) / 2,
      y: 0,
      width: 1,
      height: 1
    }, a = Dt(e, i, i.position, !0), l = Dt(n, s, s.position, !0);
    let u = "";
    const c = {
      sourceX: a.x,
      sourceY: a.y,
      sourcePosition: i.position,
      targetX: l.x,
      targetY: l.y,
      targetPosition: s.position
    };
    switch (t.type) {
      case "straight":
        [u] = Au(c);
        break;
      case "smoothstep":
        [u] = fr(c);
        break;
      case "step":
        [u] = fr({ ...c, borderRadius: 0 });
        break;
      default:
        [u] = _n(c);
        break;
    }
    return $e`
      <path
        d="${u}"
        fill="none"
        stroke="${t.selected ? "var(--md-sys-color-primary)" : "var(--md-sys-color-outline-variant)"}"
        stroke-width="2"
        style="pointer-events: none;"
      />
    `;
  }
  _onHandlePointerDown(t) {
    const { event: e, handleId: n, nodeId: r, type: o, handleDomNode: i } = t.detail, s = o === "target";
    if (this._state.connectionInProgress.get())
      return;
    const a = i.getBoundingClientRect(), l = i.parentElement?.getBoundingClientRect(), u = this._state.transform.get()[2], c = {
      id: n,
      nodeId: r,
      type: o,
      position: i.position,
      x: (a.left - (l?.left ?? 0)) / u,
      y: (a.top - (l?.top ?? 0)) / u,
      width: a.width / u,
      height: a.height / u
    };
    Qu.onPointerDown(e, {
      handleId: n,
      nodeId: r,
      isTarget: s,
      domNode: this._renderer,
      handleDomNode: i,
      nodeLookup: this._state.nodeLookup,
      connectionMode: ke.Strict,
      lib: "lit",
      autoPanOnConnect: !0,
      flowId: "lit-flow",
      dragThreshold: 0,
      panBy: async (f) => {
        const h = this._panZoom?.getViewport();
        return h ? (await this._panZoom?.setViewport({
          x: h.x + f.x,
          y: h.y + f.y,
          zoom: h.zoom
        }), !0) : !1;
      },
      getTransform: () => this._state.transform.get(),
      getFromHandle: () => c,
      updateConnection: (f) => {
        f.inProgress ? this._state.connectionInProgress.set(f) : this._state.connectionInProgress.set(null);
      },
      cancelConnection: () => {
        this._state.connectionInProgress.set(null);
      },
      onConnect: (f) => {
        this.dispatchEvent(new CustomEvent("connect", {
          detail: f
        }));
        const h = `e-${f.source}${f.sourceHandle || ""}-${f.target}${f.targetHandle || ""}`;
        this.edges = [...this.edges, { ...f, id: h }];
      },
      connectionRadius: 20
    });
  }
  _renderConnectionLine(t) {
    if (!t) return null;
    const [e] = _n({
      sourceX: t.from.x,
      sourceY: t.from.y,
      sourcePosition: t.fromPosition,
      targetX: t.to.x,
      targetY: t.to.y,
      targetPosition: t.toPosition
    });
    return $e`
      <path
        class="xyflow__connection-path"
        d="${e}"
        fill="none"
        stroke="#b1b1b7"
        stroke-width="2"
        stroke-dasharray="5,5"
      />
    `;
  }
  render() {
    const t = this._state.transform.get(), e = this._state.connectionInProgress.get();
    return ue`
      <div class="xyflow__renderer">
        <div
          class="xyflow__viewport"
          style="transform: translate(${t[0]}px, ${t[1]}px) scale(${t[2]})"
        >
          <div class="xyflow__nodes" @handle-pointer-down="${this._onHandlePointerDown}">
            ${this.nodes.map((n) => {
      if (n.hidden) return null;
      const o = this._state.nodeLookup.get(n.id)?.internals.positionAbsolute || n.position, i = this.nodeTypes[n.type || "default"] || this.nodeTypes.default, s = go(i), a = n.style || {}, l = Object.entries(a).map(([_, N]) => `${_.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${typeof N == "number" ? `${N}px` : N}`).join("; "), u = n.width || a.width, c = n.height || a.height, f = u ? `width: ${typeof u == "number" ? `${u}px` : u};` : "", h = c ? `height: ${typeof c == "number" ? `${c}px` : c};` : "", g = n.zIndex ? `z-index: ${n.zIndex};` : "";
      return ue`
                <${s}
                  class="xyflow__node"
                  data-id="${n.id}"
                  type="${n.type || "default"}"
                  .nodeId="${n.id}"
                  style="transform: translate(${o.x}px, ${o.y}px); ${l} ${f} ${h} ${g}"
                  .data="${n.data}"
                  .label="${n.data.label}"
                  .type="${n.type || "default"}"
                  ?selected="${n.selected}"
                >
                </${s}>
              `;
    })}
          </div>
          <svg class="xyflow__edges">
            ${this.edges.map((n) => this._renderEdge(n))}
            ${this._renderConnectionLine(e)}
          </svg>
        </div>
      </div>
      ${this.showControls ? ue`<lit-controls .panZoom="${this._panZoom}"></lit-controls>` : ""}
      ${this.showMinimap ? ue`
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
j.styles = [
  uc,
  te`
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
nt([
  pr(".xyflow__renderer")
], j.prototype, "_renderer", 2);
nt([
  pr(".xyflow__viewport")
], j.prototype, "_viewport", 2);
nt([
  ee()
], j.prototype, "_panZoom", 2);
nt([
  ee()
], j.prototype, "_state", 2);
nt([
  X({ type: Object })
], j.prototype, "nodeTypes", 2);
nt([
  X({ type: Boolean, attribute: "show-controls", reflect: !0 })
], j.prototype, "showControls", 2);
nt([
  X({ type: Boolean, attribute: "show-minimap", reflect: !0 })
], j.prototype, "showMinimap", 2);
nt([
  ee()
], j.prototype, "_width", 2);
nt([
  ee()
], j.prototype, "_height", 2);
nt([
  X({ type: Array })
], j.prototype, "nodes", 1);
nt([
  X({ type: Array })
], j.prototype, "edges", 1);
nt([
  X({ type: Object })
], j.prototype, "viewport", 2);
j = nt([
  Bt("lit-flow")
], j);
var mc = Object.defineProperty, gc = Object.getOwnPropertyDescriptor, se = (t, e, n, r) => {
  for (var o = r > 1 ? void 0 : r ? gc(e, n) : e, i = t.length - 1, s; i >= 0; i--)
    (s = t[i]) && (o = (r ? s(e, n, o) : s(o)) || o);
  return r && o && mc(e, n, o), o;
};
let Rt = class extends Ht {
  constructor() {
    super(), this.type = "source", this.position = D.Top, this.addEventListener("mousedown", (t) => this._onPointerDown(t)), this.addEventListener("touchstart", (t) => this._onPointerDown(t));
  }
  createRenderRoot() {
    return this;
  }
  _onPointerDown(t) {
    t.stopPropagation();
    const e = this.getAttribute("data-nodeid");
    this.dispatchEvent(new CustomEvent("handle-pointer-down", {
      bubbles: !0,
      composed: !0,
      detail: {
        event: t,
        handleId: this.handleId,
        nodeId: e,
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
    return Tt`
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
se([
  X({ type: String, reflect: !0 })
], Rt.prototype, "type", 2);
se([
  X({ type: String, reflect: !0, attribute: "data-handlepos" })
], Rt.prototype, "position", 2);
se([
  X({ type: String, reflect: !0, attribute: "data-handleid" })
], Rt.prototype, "handleId", 2);
se([
  X({ type: String, reflect: !0, attribute: "data-nodeid" })
], Rt.prototype, "nodeId", 2);
Rt = se([
  Bt("lit-handle")
], Rt);
var yc = Object.defineProperty, xc = Object.getOwnPropertyDescriptor, po = (t, e, n, r) => {
  for (var o = r > 1 ? void 0 : r ? xc(e, n) : e, i = t.length - 1, s; i >= 0; i--)
    (s = t[i]) && (o = (r ? s(e, n, o) : s(o)) || o);
  return r && o && yc(e, n, o), o;
};
let Ae = class extends ne(Ht) {
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
    return Tt`
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
Ae.styles = te`
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
po([
  X({ type: Object })
], Ae.prototype, "panZoom", 2);
Ae = po([
  Bt("lit-controls")
], Ae);
var wc = Object.defineProperty, _c = Object.getOwnPropertyDescriptor, _t = (t, e, n, r) => {
  for (var o = r > 1 ? void 0 : r ? _c(e, n) : e, i = t.length - 1, s; i >= 0; i--)
    (s = t[i]) && (o = (r ? s(e, n, o) : s(o)) || o);
  return r && o && wc(e, n, o), o;
};
let ft = class extends ne(Ht) {
  constructor() {
    super(...arguments), this.nodeLookup = /* @__PURE__ */ new Map(), this.transform = [0, 0, 1], this.translateExtent = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], this.width = 0, this.height = 0;
  }
  updated(t) {
    if (!this._minimapInstance && this.panZoom) {
      const e = this.shadowRoot?.querySelector("svg");
      e && (this._minimapInstance = Ju({
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
    return this.nodeLookup.size > 0 ? Cu(Qr(this.nodeLookup), t) : t;
  }
  render() {
    const t = this._getBoundingRect(), e = {
      x: -this.transform[0] / this.transform[2],
      y: -this.transform[1] / this.transform[2],
      width: this.width / this.transform[2],
      height: this.height / this.transform[2]
    }, n = 200, r = 150, o = t.width / n, i = t.height / r, s = Math.max(o, i), a = s * n, l = s * r, u = 5 * s, c = t.x - (a - t.width) / 2 - u, f = t.y - (l - t.height) / 2 - u, h = a + u * 2, g = l + u * 2;
    return Tt`
      <svg
        width="${n}"
        height="${r}"
        viewBox="${c} ${f} ${h} ${g}"
      >
        ${Array.from(this.nodeLookup.values()).map((_) => {
      const { x: N, y: M } = _.internals.positionAbsolute, $ = _.measured.width || 0, A = _.measured.height || 0;
      return $e`
            <rect
              class="minimap-node"
              x="${N}"
              y="${M}"
              width="${$}"
              height="${A}"
              rx="2"
              ry="2"
            />
          `;
    })}
        <path
          class="minimap-mask"
          d="M${c - u},${f - u}h${h + u * 2}v${g + u * 2}h${-h - u * 2}z
             M${e.x},${e.y}h${e.width}v${e.height}h${-e.width}z"
        />
      </svg>
    `;
  }
};
ft.styles = te`
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
_t([
  X({ type: Object })
], ft.prototype, "panZoom", 2);
_t([
  X({ type: Object })
], ft.prototype, "nodeLookup", 2);
_t([
  X({ type: Array })
], ft.prototype, "transform", 2);
_t([
  X({ type: Array })
], ft.prototype, "translateExtent", 2);
_t([
  X({ type: Number })
], ft.prototype, "width", 2);
_t([
  X({ type: Number })
], ft.prototype, "height", 2);
_t([
  ee()
], ft.prototype, "_minimapInstance", 2);
ft = _t([
  Bt("lit-minimap")
], ft);
