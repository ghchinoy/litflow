import { html as Tt, LitElement as Ht, svg as be, css as ke } from "lit";
import { unsafeStatic as li, html as ae } from "lit/static-html.js";
import { property as X, customElement as Bt, query as lr, state as te } from "lit/decorators.js";
import { directive as fi } from "lit/directive.js";
import { AsyncDirective as hi } from "lit/async-directive.js";
import "lit/html.js";
var di = Object.defineProperty, pi = (t, e, n) => e in t ? di(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, qe = (t, e, n) => (pi(t, typeof e != "symbol" ? e + "" : e, n), n), gi = (t, e, n) => {
  if (!e.has(t))
    throw TypeError("Cannot " + n);
}, Fe = (t, e) => {
  if (Object(e) !== e)
    throw TypeError('Cannot use the "in" operator on this value');
  return t.has(e);
}, ue = (t, e, n) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, n);
}, zn = (t, e, n) => (gi(t, e, "access private method"), n);
function fr(t, e) {
  return Object.is(t, e);
}
let F = null, Ft = !1, me = 1;
const Ne = /* @__PURE__ */ Symbol("SIGNAL");
function St(t) {
  const e = F;
  return F = t, e;
}
function mi() {
  return F;
}
function yi() {
  return Ft;
}
const xn = {
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
  if (F === null)
    return;
  F.consumerOnSignalRead(t);
  const e = F.nextProducerIndex++;
  if (At(F), e < F.producerNode.length && F.producerNode[e] !== t && sn(F)) {
    const n = F.producerNode[e];
    ze(n, F.producerIndexOfThis[e]);
  }
  F.producerNode[e] !== t && (F.producerNode[e] = t, F.producerIndexOfThis[e] = sn(F) ? pr(t, F, e) : 0), F.producerLastReadVersion[e] = t.version;
}
function wi() {
  me++;
}
function hr(t) {
  if (!(!t.dirty && t.lastCleanEpoch === me)) {
    if (!t.producerMustRecompute(t) && !Ni(t)) {
      t.dirty = !1, t.lastCleanEpoch = me;
      return;
    }
    t.producerRecomputeValue(t), t.dirty = !1, t.lastCleanEpoch = me;
  }
}
function dr(t) {
  if (t.liveConsumerNode === void 0)
    return;
  const e = Ft;
  Ft = !0;
  try {
    for (const n of t.liveConsumerNode)
      n.dirty || xi(n);
  } finally {
    Ft = e;
  }
}
function _i() {
  return F?.consumerAllowSignalWrites !== !1;
}
function xi(t) {
  var e;
  t.dirty = !0, dr(t), (e = t.consumerMarkedDirty) == null || e.call(t.wrapper ?? t);
}
function vi(t) {
  return t && (t.nextProducerIndex = 0), St(t);
}
function bi(t, e) {
  if (St(e), !(!t || t.producerNode === void 0 || t.producerIndexOfThis === void 0 || t.producerLastReadVersion === void 0)) {
    if (sn(t))
      for (let n = t.nextProducerIndex; n < t.producerNode.length; n++)
        ze(t.producerNode[n], t.producerIndexOfThis[n]);
    for (; t.producerNode.length > t.nextProducerIndex; )
      t.producerNode.pop(), t.producerLastReadVersion.pop(), t.producerIndexOfThis.pop();
  }
}
function Ni(t) {
  At(t);
  for (let e = 0; e < t.producerNode.length; e++) {
    const n = t.producerNode[e], r = t.producerLastReadVersion[e];
    if (r !== n.version || (hr(n), r !== n.version))
      return !0;
  }
  return !1;
}
function pr(t, e, n) {
  var r;
  if (vn(t), At(t), t.liveConsumerNode.length === 0) {
    (r = t.watched) == null || r.call(t.wrapper);
    for (let i = 0; i < t.producerNode.length; i++)
      t.producerIndexOfThis[i] = pr(t.producerNode[i], t, i);
  }
  return t.liveConsumerIndexOfThis.push(n), t.liveConsumerNode.push(e) - 1;
}
function ze(t, e) {
  var n;
  if (vn(t), At(t), typeof ngDevMode < "u" && ngDevMode && e >= t.liveConsumerNode.length)
    throw new Error(
      `Assertion error: active consumer index ${e} is out of bounds of ${t.liveConsumerNode.length} consumers)`
    );
  if (t.liveConsumerNode.length === 1) {
    (n = t.unwatched) == null || n.call(t.wrapper);
    for (let i = 0; i < t.producerNode.length; i++)
      ze(t.producerNode[i], t.producerIndexOfThis[i]);
  }
  const r = t.liveConsumerNode.length - 1;
  if (t.liveConsumerNode[e] = t.liveConsumerNode[r], t.liveConsumerIndexOfThis[e] = t.liveConsumerIndexOfThis[r], t.liveConsumerNode.length--, t.liveConsumerIndexOfThis.length--, e < t.liveConsumerNode.length) {
    const i = t.liveConsumerIndexOfThis[e], o = t.liveConsumerNode[e];
    At(o), o.producerIndexOfThis[i] = e;
  }
}
function sn(t) {
  var e;
  return t.consumerIsAlwaysLive || (((e = t?.liveConsumerNode) == null ? void 0 : e.length) ?? 0) > 0;
}
function At(t) {
  t.producerNode ?? (t.producerNode = []), t.producerIndexOfThis ?? (t.producerIndexOfThis = []), t.producerLastReadVersion ?? (t.producerLastReadVersion = []);
}
function vn(t) {
  t.liveConsumerNode ?? (t.liveConsumerNode = []), t.liveConsumerIndexOfThis ?? (t.liveConsumerIndexOfThis = []);
}
function gr(t) {
  if (hr(t), Oe(t), t.value === an)
    throw t.error;
  return t.value;
}
function $i(t) {
  const e = Object.create(Ei);
  e.computation = t;
  const n = () => gr(e);
  return n[Ne] = e, n;
}
const Ze = /* @__PURE__ */ Symbol("UNSET"), Ue = /* @__PURE__ */ Symbol("COMPUTING"), an = /* @__PURE__ */ Symbol("ERRORED"), Ei = {
  ...xn,
  value: Ze,
  dirty: !0,
  error: null,
  equal: fr,
  producerMustRecompute(t) {
    return t.value === Ze || t.value === Ue;
  },
  producerRecomputeValue(t) {
    if (t.value === Ue)
      throw new Error("Detected cycle in computations.");
    const e = t.value;
    t.value = Ue;
    const n = vi(t);
    let r, i = !1;
    try {
      r = t.computation.call(t.wrapper), i = e !== Ze && e !== an && t.equal.call(t.wrapper, e, r);
    } catch (o) {
      r = an, t.error = o;
    } finally {
      bi(t, n);
    }
    if (i) {
      t.value = e;
      return;
    }
    t.value = r, t.version++;
  }
};
function Si() {
  throw new Error();
}
let Ci = Si;
function Ti() {
  Ci();
}
function Ii(t) {
  const e = Object.create(Ai);
  e.value = t;
  const n = () => (Oe(e), e.value);
  return n[Ne] = e, n;
}
function Pi() {
  return Oe(this), this.value;
}
function Mi(t, e) {
  _i() || Ti(), t.equal.call(t.wrapper, t.value, e) || (t.value = e, ki(t));
}
const Ai = {
  ...xn,
  equal: fr,
  value: void 0
};
function ki(t) {
  t.version++, wi(), dr(t);
}
const K = /* @__PURE__ */ Symbol("node");
var U;
((t) => {
  var e, n, r, i;
  class o {
    constructor(c, u = {}) {
      ue(this, n), qe(this, e);
      const f = Ii(c)[Ne];
      if (this[K] = f, f.wrapper = this, u) {
        const d = u.equals;
        d && (f.equal = d), f.watched = u[t.subtle.watched], f.unwatched = u[t.subtle.unwatched];
      }
    }
    get() {
      if (!(0, t.isState)(this))
        throw new TypeError("Wrong receiver type for Signal.State.prototype.get");
      return Pi.call(this[K]);
    }
    set(c) {
      if (!(0, t.isState)(this))
        throw new TypeError("Wrong receiver type for Signal.State.prototype.set");
      if (yi())
        throw new Error("Writes to signals not permitted during Watcher callback");
      const u = this[K];
      Mi(u, c);
    }
  }
  e = K, n = /* @__PURE__ */ new WeakSet(), t.isState = (a) => typeof a == "object" && Fe(n, a), t.State = o;
  class s {
    // Create a Signal which evaluates to the value returned by the callback.
    // Callback is called with this signal as the parameter.
    constructor(c, u) {
      ue(this, i), qe(this, r);
      const f = $i(c)[Ne];
      if (f.consumerAllowSignalWrites = !0, this[K] = f, f.wrapper = this, u) {
        const d = u.equals;
        d && (f.equal = d), f.watched = u[t.subtle.watched], f.unwatched = u[t.subtle.unwatched];
      }
    }
    get() {
      if (!(0, t.isComputed)(this))
        throw new TypeError("Wrong receiver type for Signal.Computed.prototype.get");
      return gr(this[K]);
    }
  }
  r = K, i = /* @__PURE__ */ new WeakSet(), t.isComputed = (a) => typeof a == "object" && Fe(i, a), t.Computed = s, ((a) => {
    var c, u, l, f;
    function d(x) {
      let p, w = null;
      try {
        w = St(null), p = x();
      } finally {
        St(w);
      }
      return p;
    }
    a.untrack = d;
    function m(x) {
      var p;
      if (!(0, t.isComputed)(x) && !(0, t.isWatcher)(x))
        throw new TypeError("Called introspectSources without a Computed or Watcher argument");
      return ((p = x[K].producerNode) == null ? void 0 : p.map((w) => w.wrapper)) ?? [];
    }
    a.introspectSources = m;
    function b(x) {
      var p;
      if (!(0, t.isComputed)(x) && !(0, t.isState)(x))
        throw new TypeError("Called introspectSinks without a Signal argument");
      return ((p = x[K].liveConsumerNode) == null ? void 0 : p.map((w) => w.wrapper)) ?? [];
    }
    a.introspectSinks = b;
    function E(x) {
      if (!(0, t.isComputed)(x) && !(0, t.isState)(x))
        throw new TypeError("Called hasSinks without a Signal argument");
      const p = x[K].liveConsumerNode;
      return p ? p.length > 0 : !1;
    }
    a.hasSinks = E;
    function M(x) {
      if (!(0, t.isComputed)(x) && !(0, t.isWatcher)(x))
        throw new TypeError("Called hasSources without a Computed or Watcher argument");
      const p = x[K].producerNode;
      return p ? p.length > 0 : !1;
    }
    a.hasSources = M;
    class N {
      // When a (recursive) source of Watcher is written to, call this callback,
      // if it hasn't already been called since the last `watch` call.
      // No signals may be read or written during the notify.
      constructor(p) {
        ue(this, u), ue(this, l), qe(this, c);
        let w = Object.create(xn);
        w.wrapper = this, w.consumerMarkedDirty = p, w.consumerIsAlwaysLive = !0, w.consumerAllowSignalWrites = !1, w.producerNode = [], this[K] = w;
      }
      // Add these signals to the Watcher's set, and set the watcher to run its
      // notify callback next time any signal in the set (or one of its dependencies) changes.
      // Can be called with no arguments just to reset the "notified" state, so that
      // the notify callback will be invoked again.
      watch(...p) {
        if (!(0, t.isWatcher)(this))
          throw new TypeError("Called unwatch without Watcher receiver");
        zn(this, l, f).call(this, p);
        const w = this[K];
        w.dirty = !1;
        const v = St(w);
        for (const P of p)
          Oe(P[K]);
        St(v);
      }
      // Remove these signals from the watched set (e.g., for an effect which is disposed)
      unwatch(...p) {
        if (!(0, t.isWatcher)(this))
          throw new TypeError("Called unwatch without Watcher receiver");
        zn(this, l, f).call(this, p);
        const w = this[K];
        At(w);
        for (let v = w.producerNode.length - 1; v >= 0; v--)
          if (p.includes(w.producerNode[v].wrapper)) {
            ze(w.producerNode[v], w.producerIndexOfThis[v]);
            const P = w.producerNode.length - 1;
            if (w.producerNode[v] = w.producerNode[P], w.producerIndexOfThis[v] = w.producerIndexOfThis[P], w.producerNode.length--, w.producerIndexOfThis.length--, w.nextProducerIndex--, v < w.producerNode.length) {
              const H = w.producerIndexOfThis[v], z = w.producerNode[v];
              vn(z), z.liveConsumerIndexOfThis[H] = v;
            }
          }
      }
      // Returns the set of computeds in the Watcher's set which are still yet
      // to be re-evaluated
      getPending() {
        if (!(0, t.isWatcher)(this))
          throw new TypeError("Called getPending without Watcher receiver");
        return this[K].producerNode.filter((w) => w.dirty).map((w) => w.wrapper);
      }
    }
    c = K, u = /* @__PURE__ */ new WeakSet(), l = /* @__PURE__ */ new WeakSet(), f = function(x) {
      for (const p of x)
        if (!(0, t.isComputed)(p) && !(0, t.isState)(p))
          throw new TypeError("Called watch/unwatch without a Computed or State argument");
    }, t.isWatcher = (x) => Fe(u, x), a.Watcher = N;
    function O() {
      var x;
      return (x = mi()) == null ? void 0 : x.wrapper;
    }
    a.currentComputed = O, a.watched = /* @__PURE__ */ Symbol("watched"), a.unwatched = /* @__PURE__ */ Symbol("unwatched");
  })(t.subtle || (t.subtle = {}));
})(U || (U = {}));
let Ge = !1;
const Dn = new U.subtle.Watcher(() => {
  Ge || (Ge = !0, queueMicrotask(() => {
    Ge = !1;
    for (const t of Dn.getPending()) t.get();
    Dn.watch();
  }));
}), Oi = /* @__PURE__ */ Symbol("SignalWatcherBrand"), zi = new FinalizationRegistry((t) => {
  t.unwatch(...U.subtle.introspectSources(t));
}), Rn = /* @__PURE__ */ new WeakMap();
function ee(t) {
  return t[Oi] === !0 ? (console.warn("SignalWatcher should not be applied to the same class more than once."), t) : class extends t {
    constructor() {
      super(...arguments), this._$St = /* @__PURE__ */ new Map(), this._$So = new U.State(0), this._$Si = !1;
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
      this._$Su = new U.Computed(() => {
        this._$So.get(), super.performUpdate();
      });
      const e = this.h = new U.subtle.Watcher(function() {
        const n = Rn.get(this);
        n !== void 0 && (n._$Si === !1 && (new Set(this.getPending()).has(n._$Su) ? n.requestUpdate() : n._$Sv()), this.watch());
      });
      Rn.set(e, this), zi.register(this, e), e.watch(this._$Su), e.watch(...Array.from(this._$St).map(([n]) => n));
    }
    _$Sp() {
      if (this.h === void 0) return;
      let e = !1;
      this.h.unwatch(...U.subtle.introspectSources(this.h).filter((n) => {
        var r;
        const i = ((r = this._$St.get(n)) === null || r === void 0 ? void 0 : r.manualDispose) !== !0;
        return i && this._$St.delete(n), e || (e = !i), i;
      })), e || (this._$Su = void 0, this.h = void 0, this._$St.clear());
    }
    updateEffect(e, n) {
      var r;
      this._$S_();
      const i = new U.Computed(() => {
        e();
      });
      return this.h.watch(i), this._$St.set(i, n), (r = n?.beforeUpdate) !== null && r !== void 0 && r ? U.subtle.untrack(() => i.get()) : this.updateComplete.then(() => U.subtle.untrack(() => i.get())), () => {
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
let Ke = !1;
const un = new U.subtle.Watcher(async () => {
  Ke || (Ke = !0, queueMicrotask(() => {
    Ke = !1;
    for (const t of un.getPending()) t.get();
    un.watch();
  }));
});
let Di = class extends hi {
  _$S_() {
    var e, n;
    this._$Sm === void 0 && (this._$Sj = new U.Computed(() => {
      var r;
      const i = (r = this._$SW) === null || r === void 0 ? void 0 : r.get();
      return this.setValue(i), i;
    }), this._$Sm = (n = (e = this._$Sk) === null || e === void 0 ? void 0 : e.h) !== null && n !== void 0 ? n : un, this._$Sm.watch(this._$Sj), U.subtle.untrack(() => {
      var r;
      return (r = this._$Sj) === null || r === void 0 ? void 0 : r.get();
    }));
  }
  _$Sp() {
    this._$Sm !== void 0 && (this._$Sm.unwatch(this._$SW), this._$Sm = void 0);
  }
  render(e) {
    return U.subtle.untrack(() => e.get());
  }
  update(e, [n]) {
    var r, i;
    return (r = this._$Sk) !== null && r !== void 0 || (this._$Sk = (i = e.options) === null || i === void 0 ? void 0 : i.host), n !== this._$SW && this._$SW !== void 0 && this._$Sp(), this._$SW = n, this._$S_(), U.subtle.untrack(() => this._$SW.get());
  }
  disconnected() {
    this._$Sp();
  }
  reconnected() {
    this._$S_();
  }
};
fi(Di);
U.State;
U.Computed;
const ce = (t, e) => new U.State(t, e);
var Ri = { value: () => {
} };
function De() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new ye(n);
}
function ye(t) {
  this._ = t;
}
function Hi(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
ye.prototype = De.prototype = {
  constructor: ye,
  on: function(t, e) {
    var n = this._, r = Hi(t + "", n), i, o = -1, s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; ) if ((i = (t = r[o]).type) && (i = Bi(n[i], t.name))) return i;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++o < s; )
      if (i = (t = r[o]).type) n[i] = Hn(n[i], t.name, e);
      else if (e == null) for (i in n) n[i] = Hn(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new ye(t);
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
function Bi(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function Hn(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = Ri, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var cn = "http://www.w3.org/1999/xhtml";
const Bn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: cn,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Re(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), Bn.hasOwnProperty(e) ? { space: Bn[e], local: t } : t;
}
function Li(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === cn && e.documentElement.namespaceURI === cn ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function Vi(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function mr(t) {
  var e = Re(t);
  return (e.local ? Vi : Li)(e);
}
function Xi() {
}
function bn(t) {
  return t == null ? Xi : function() {
    return this.querySelector(t);
  };
}
function Wi(t) {
  typeof t != "function" && (t = bn(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], s = o.length, a = r[i] = new Array(s), c, u, l = 0; l < s; ++l)
      (c = o[l]) && (u = t.call(c, c.__data__, l, o)) && ("__data__" in c && (u.__data__ = c.__data__), a[l] = u);
  return new et(r, this._parents);
}
function Yi(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function qi() {
  return [];
}
function yr(t) {
  return t == null ? qi : function() {
    return this.querySelectorAll(t);
  };
}
function Fi(t) {
  return function() {
    return Yi(t.apply(this, arguments));
  };
}
function Zi(t) {
  typeof t == "function" ? t = Fi(t) : t = yr(t);
  for (var e = this._groups, n = e.length, r = [], i = [], o = 0; o < n; ++o)
    for (var s = e[o], a = s.length, c, u = 0; u < a; ++u)
      (c = s[u]) && (r.push(t.call(c, c.__data__, u, s)), i.push(c));
  return new et(r, i);
}
function wr(t) {
  return function() {
    return this.matches(t);
  };
}
function _r(t) {
  return function(e) {
    return e.matches(t);
  };
}
var Ui = Array.prototype.find;
function Gi(t) {
  return function() {
    return Ui.call(this.children, t);
  };
}
function Ki() {
  return this.firstElementChild;
}
function Qi(t) {
  return this.select(t == null ? Ki : Gi(typeof t == "function" ? t : _r(t)));
}
var Ji = Array.prototype.filter;
function ji() {
  return Array.from(this.children);
}
function to(t) {
  return function() {
    return Ji.call(this.children, t);
  };
}
function eo(t) {
  return this.selectAll(t == null ? ji : to(typeof t == "function" ? t : _r(t)));
}
function no(t) {
  typeof t != "function" && (t = wr(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], s = o.length, a = r[i] = [], c, u = 0; u < s; ++u)
      (c = o[u]) && t.call(c, c.__data__, u, o) && a.push(c);
  return new et(r, this._parents);
}
function xr(t) {
  return new Array(t.length);
}
function ro() {
  return new et(this._enter || this._groups.map(xr), this._parents);
}
function $e(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
$e.prototype = {
  constructor: $e,
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
function io(t) {
  return function() {
    return t;
  };
}
function oo(t, e, n, r, i, o) {
  for (var s = 0, a, c = e.length, u = o.length; s < u; ++s)
    (a = e[s]) ? (a.__data__ = o[s], r[s] = a) : n[s] = new $e(t, o[s]);
  for (; s < c; ++s)
    (a = e[s]) && (i[s] = a);
}
function so(t, e, n, r, i, o, s) {
  var a, c, u = /* @__PURE__ */ new Map(), l = e.length, f = o.length, d = new Array(l), m;
  for (a = 0; a < l; ++a)
    (c = e[a]) && (d[a] = m = s.call(c, c.__data__, a, e) + "", u.has(m) ? i[a] = c : u.set(m, c));
  for (a = 0; a < f; ++a)
    m = s.call(t, o[a], a, o) + "", (c = u.get(m)) ? (r[a] = c, c.__data__ = o[a], u.delete(m)) : n[a] = new $e(t, o[a]);
  for (a = 0; a < l; ++a)
    (c = e[a]) && u.get(d[a]) === c && (i[a] = c);
}
function ao(t) {
  return t.__data__;
}
function uo(t, e) {
  if (!arguments.length) return Array.from(this, ao);
  var n = e ? so : oo, r = this._parents, i = this._groups;
  typeof t != "function" && (t = io(t));
  for (var o = i.length, s = new Array(o), a = new Array(o), c = new Array(o), u = 0; u < o; ++u) {
    var l = r[u], f = i[u], d = f.length, m = co(t.call(l, l && l.__data__, u, r)), b = m.length, E = a[u] = new Array(b), M = s[u] = new Array(b), N = c[u] = new Array(d);
    n(l, f, E, M, N, m, e);
    for (var O = 0, x = 0, p, w; O < b; ++O)
      if (p = E[O]) {
        for (O >= x && (x = O + 1); !(w = M[x]) && ++x < b; ) ;
        p._next = w || null;
      }
  }
  return s = new et(s, r), s._enter = a, s._exit = c, s;
}
function co(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function lo() {
  return new et(this._exit || this._groups.map(xr), this._parents);
}
function fo(t, e, n) {
  var r = this.enter(), i = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? o.remove() : n(o), r && i ? r.merge(i).order() : i;
}
function ho(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, o = r.length, s = Math.min(i, o), a = new Array(i), c = 0; c < s; ++c)
    for (var u = n[c], l = r[c], f = u.length, d = a[c] = new Array(f), m, b = 0; b < f; ++b)
      (m = u[b] || l[b]) && (d[b] = m);
  for (; c < i; ++c)
    a[c] = n[c];
  return new et(a, this._parents);
}
function po() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) && (o && s.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(s, o), o = s);
  return this;
}
function go(t) {
  t || (t = mo);
  function e(f, d) {
    return f && d ? t(f.__data__, d.__data__) : !f - !d;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), o = 0; o < r; ++o) {
    for (var s = n[o], a = s.length, c = i[o] = new Array(a), u, l = 0; l < a; ++l)
      (u = s[l]) && (c[l] = u);
    c.sort(e);
  }
  return new et(i, this._parents).order();
}
function mo(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function yo() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function wo() {
  return Array.from(this);
}
function _o() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s) return s;
    }
  return null;
}
function xo() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function vo() {
  return !this.node();
}
function bo(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], o = 0, s = i.length, a; o < s; ++o)
      (a = i[o]) && t.call(a, a.__data__, o, i);
  return this;
}
function No(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function $o(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Eo(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function So(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function Co(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function To(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function Io(t, e) {
  var n = Re(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? $o : No : typeof e == "function" ? n.local ? To : Co : n.local ? So : Eo)(n, e));
}
function vr(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Po(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Mo(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function Ao(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function ko(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? Po : typeof e == "function" ? Ao : Mo)(t, e, n ?? "")) : kt(this.node(), t);
}
function kt(t, e) {
  return t.style.getPropertyValue(e) || vr(t).getComputedStyle(t, null).getPropertyValue(e);
}
function Oo(t) {
  return function() {
    delete this[t];
  };
}
function zo(t, e) {
  return function() {
    this[t] = e;
  };
}
function Do(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function Ro(t, e) {
  return arguments.length > 1 ? this.each((e == null ? Oo : typeof e == "function" ? Do : zo)(t, e)) : this.node()[t];
}
function br(t) {
  return t.trim().split(/^|\s+/);
}
function Nn(t) {
  return t.classList || new Nr(t);
}
function Nr(t) {
  this._node = t, this._names = br(t.getAttribute("class") || "");
}
Nr.prototype = {
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
function $r(t, e) {
  for (var n = Nn(t), r = -1, i = e.length; ++r < i; ) n.add(e[r]);
}
function Er(t, e) {
  for (var n = Nn(t), r = -1, i = e.length; ++r < i; ) n.remove(e[r]);
}
function Ho(t) {
  return function() {
    $r(this, t);
  };
}
function Bo(t) {
  return function() {
    Er(this, t);
  };
}
function Lo(t, e) {
  return function() {
    (e.apply(this, arguments) ? $r : Er)(this, t);
  };
}
function Vo(t, e) {
  var n = br(t + "");
  if (arguments.length < 2) {
    for (var r = Nn(this.node()), i = -1, o = n.length; ++i < o; ) if (!r.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Lo : e ? Ho : Bo)(n, e));
}
function Xo() {
  this.textContent = "";
}
function Wo(t) {
  return function() {
    this.textContent = t;
  };
}
function Yo(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function qo(t) {
  return arguments.length ? this.each(t == null ? Xo : (typeof t == "function" ? Yo : Wo)(t)) : this.node().textContent;
}
function Fo() {
  this.innerHTML = "";
}
function Zo(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Uo(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function Go(t) {
  return arguments.length ? this.each(t == null ? Fo : (typeof t == "function" ? Uo : Zo)(t)) : this.node().innerHTML;
}
function Ko() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Qo() {
  return this.each(Ko);
}
function Jo() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function jo() {
  return this.each(Jo);
}
function ts(t) {
  var e = typeof t == "function" ? t : mr(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function es() {
  return null;
}
function ns(t, e) {
  var n = typeof t == "function" ? t : mr(t), r = e == null ? es : typeof e == "function" ? e : bn(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function rs() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function is() {
  return this.each(rs);
}
function os() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function ss() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function as(t) {
  return this.select(t ? ss : os);
}
function us(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function cs(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function ls(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function fs(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, o; n < i; ++n)
        o = e[n], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : e[++r] = o;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function hs(t, e, n) {
  return function() {
    var r = this.__on, i, o = cs(e);
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
function ds(t, e, n) {
  var r = ls(t + ""), i, o = r.length, s;
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
  for (a = e ? hs : fs, i = 0; i < o; ++i) this.each(a(r[i], e, n));
  return this;
}
function Sr(t, e, n) {
  var r = vr(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function ps(t, e) {
  return function() {
    return Sr(this, t, e);
  };
}
function gs(t, e) {
  return function() {
    return Sr(this, t, e.apply(this, arguments));
  };
}
function ms(t, e) {
  return this.each((typeof e == "function" ? gs : ps)(t, e));
}
function* ys() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var Cr = [null];
function et(t, e) {
  this._groups = t, this._parents = e;
}
function ne() {
  return new et([[document.documentElement]], Cr);
}
function ws() {
  return this;
}
et.prototype = ne.prototype = {
  constructor: et,
  select: Wi,
  selectAll: Zi,
  selectChild: Qi,
  selectChildren: eo,
  filter: no,
  data: uo,
  enter: ro,
  exit: lo,
  join: fo,
  merge: ho,
  selection: ws,
  order: po,
  sort: go,
  call: yo,
  nodes: wo,
  node: _o,
  size: xo,
  empty: vo,
  each: bo,
  attr: Io,
  style: ko,
  property: Ro,
  classed: Vo,
  text: qo,
  html: Go,
  raise: Qo,
  lower: jo,
  append: ts,
  insert: ns,
  remove: is,
  clone: as,
  datum: us,
  on: ds,
  dispatch: ms,
  [Symbol.iterator]: ys
};
function rt(t) {
  return typeof t == "string" ? new et([[document.querySelector(t)]], [document.documentElement]) : new et([[t]], Cr);
}
function _s(t) {
  let e;
  for (; e = t.sourceEvent; ) t = e;
  return t;
}
function ot(t, e) {
  if (t = _s(t), e === void 0 && (e = t.currentTarget), e) {
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
const xs = { passive: !1 }, Ut = { capture: !0, passive: !1 };
function Qe(t) {
  t.stopImmediatePropagation();
}
function It(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Tr(t) {
  var e = t.document.documentElement, n = rt(t).on("dragstart.drag", It, Ut);
  "onselectstart" in e ? n.on("selectstart.drag", It, Ut) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function Ir(t, e) {
  var n = t.document.documentElement, r = rt(t).on("dragstart.drag", null);
  e && (r.on("click.drag", It, Ut), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const le = (t) => () => t;
function ln(t, {
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
ln.prototype.on = function() {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function vs(t) {
  return !t.ctrlKey && !t.button;
}
function bs() {
  return this.parentNode;
}
function Ns(t, e) {
  return e ?? { x: t.x, y: t.y };
}
function $s() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Es() {
  var t = vs, e = bs, n = Ns, r = $s, i = {}, o = De("start", "drag", "end"), s = 0, a, c, u, l, f = 0;
  function d(p) {
    p.on("mousedown.drag", m).filter(r).on("touchstart.drag", M).on("touchmove.drag", N, xs).on("touchend.drag touchcancel.drag", O).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function m(p, w) {
    if (!(l || !t.call(this, p, w))) {
      var v = x(this, e.call(this, p, w), p, w, "mouse");
      v && (rt(p.view).on("mousemove.drag", b, Ut).on("mouseup.drag", E, Ut), Tr(p.view), Qe(p), u = !1, a = p.clientX, c = p.clientY, v("start", p));
    }
  }
  function b(p) {
    if (It(p), !u) {
      var w = p.clientX - a, v = p.clientY - c;
      u = w * w + v * v > f;
    }
    i.mouse("drag", p);
  }
  function E(p) {
    rt(p.view).on("mousemove.drag mouseup.drag", null), Ir(p.view, u), It(p), i.mouse("end", p);
  }
  function M(p, w) {
    if (t.call(this, p, w)) {
      var v = p.changedTouches, P = e.call(this, p, w), H = v.length, z, Z;
      for (z = 0; z < H; ++z)
        (Z = x(this, P, p, w, v[z].identifier, v[z])) && (Qe(p), Z("start", p, v[z]));
    }
  }
  function N(p) {
    var w = p.changedTouches, v = w.length, P, H;
    for (P = 0; P < v; ++P)
      (H = i[w[P].identifier]) && (It(p), H("drag", p, w[P]));
  }
  function O(p) {
    var w = p.changedTouches, v = w.length, P, H;
    for (l && clearTimeout(l), l = setTimeout(function() {
      l = null;
    }, 500), P = 0; P < v; ++P)
      (H = i[w[P].identifier]) && (Qe(p), H("end", p, w[P]));
  }
  function x(p, w, v, P, H, z) {
    var Z = o.copy(), I = ot(z || v, w), S, A, h;
    if ((h = n.call(p, new ln("beforestart", {
      sourceEvent: v,
      target: d,
      identifier: H,
      active: s,
      x: I[0],
      y: I[1],
      dx: 0,
      dy: 0,
      dispatch: Z
    }), P)) != null)
      return S = h.x - I[0] || 0, A = h.y - I[1] || 0, function y(g, _, $) {
        var T = I, C;
        switch (g) {
          case "start":
            i[H] = y, C = s++;
            break;
          case "end":
            delete i[H], --s;
          // falls through
          case "drag":
            I = ot($ || _, w), C = s;
            break;
        }
        Z.call(
          g,
          p,
          new ln(g, {
            sourceEvent: _,
            subject: h,
            target: d,
            identifier: H,
            active: C,
            x: I[0] + S,
            y: I[1] + A,
            dx: I[0] - T[0],
            dy: I[1] - T[1],
            dispatch: Z
          }),
          P
        );
      };
  }
  return d.filter = function(p) {
    return arguments.length ? (t = typeof p == "function" ? p : le(!!p), d) : t;
  }, d.container = function(p) {
    return arguments.length ? (e = typeof p == "function" ? p : le(p), d) : e;
  }, d.subject = function(p) {
    return arguments.length ? (n = typeof p == "function" ? p : le(p), d) : n;
  }, d.touchable = function(p) {
    return arguments.length ? (r = typeof p == "function" ? p : le(!!p), d) : r;
  }, d.on = function() {
    var p = o.on.apply(o, arguments);
    return p === o ? d : p;
  }, d.clickDistance = function(p) {
    return arguments.length ? (f = (p = +p) * p, d) : Math.sqrt(f);
  }, d;
}
function $n(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function Pr(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e) n[r] = e[r];
  return n;
}
function re() {
}
var Gt = 0.7, Ee = 1 / Gt, Pt = "\\s*([+-]?\\d+)\\s*", Kt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ct = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Ss = /^#([0-9a-f]{3,8})$/, Cs = new RegExp(`^rgb\\(${Pt},${Pt},${Pt}\\)$`), Ts = new RegExp(`^rgb\\(${ct},${ct},${ct}\\)$`), Is = new RegExp(`^rgba\\(${Pt},${Pt},${Pt},${Kt}\\)$`), Ps = new RegExp(`^rgba\\(${ct},${ct},${ct},${Kt}\\)$`), Ms = new RegExp(`^hsl\\(${Kt},${ct},${ct}\\)$`), As = new RegExp(`^hsla\\(${Kt},${ct},${ct},${Kt}\\)$`), Ln = {
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
$n(re, Nt, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Vn,
  // Deprecated! Use color.formatHex.
  formatHex: Vn,
  formatHex8: ks,
  formatHsl: Os,
  formatRgb: Xn,
  toString: Xn
});
function Vn() {
  return this.rgb().formatHex();
}
function ks() {
  return this.rgb().formatHex8();
}
function Os() {
  return Mr(this).formatHsl();
}
function Xn() {
  return this.rgb().formatRgb();
}
function Nt(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = Ss.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? Wn(e) : n === 3 ? new tt(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? fe(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? fe(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = Cs.exec(t)) ? new tt(e[1], e[2], e[3], 1) : (e = Ts.exec(t)) ? new tt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = Is.exec(t)) ? fe(e[1], e[2], e[3], e[4]) : (e = Ps.exec(t)) ? fe(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = Ms.exec(t)) ? Fn(e[1], e[2] / 100, e[3] / 100, 1) : (e = As.exec(t)) ? Fn(e[1], e[2] / 100, e[3] / 100, e[4]) : Ln.hasOwnProperty(t) ? Wn(Ln[t]) : t === "transparent" ? new tt(NaN, NaN, NaN, 0) : null;
}
function Wn(t) {
  return new tt(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function fe(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new tt(t, e, n, r);
}
function zs(t) {
  return t instanceof re || (t = Nt(t)), t ? (t = t.rgb(), new tt(t.r, t.g, t.b, t.opacity)) : new tt();
}
function fn(t, e, n, r) {
  return arguments.length === 1 ? zs(t) : new tt(t, e, n, r ?? 1);
}
function tt(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
$n(tt, fn, Pr(re, {
  brighter(t) {
    return t = t == null ? Ee : Math.pow(Ee, t), new tt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Gt : Math.pow(Gt, t), new tt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new tt(bt(this.r), bt(this.g), bt(this.b), Se(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Yn,
  // Deprecated! Use color.formatHex.
  formatHex: Yn,
  formatHex8: Ds,
  formatRgb: qn,
  toString: qn
}));
function Yn() {
  return `#${vt(this.r)}${vt(this.g)}${vt(this.b)}`;
}
function Ds() {
  return `#${vt(this.r)}${vt(this.g)}${vt(this.b)}${vt((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function qn() {
  const t = Se(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${bt(this.r)}, ${bt(this.g)}, ${bt(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Se(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function bt(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function vt(t) {
  return t = bt(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Fn(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new st(t, e, n, r);
}
function Mr(t) {
  if (t instanceof st) return new st(t.h, t.s, t.l, t.opacity);
  if (t instanceof re || (t = Nt(t)), !t) return new st();
  if (t instanceof st) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), o = Math.max(e, n, r), s = NaN, a = o - i, c = (o + i) / 2;
  return a ? (e === o ? s = (n - r) / a + (n < r) * 6 : n === o ? s = (r - e) / a + 2 : s = (e - n) / a + 4, a /= c < 0.5 ? o + i : 2 - o - i, s *= 60) : a = c > 0 && c < 1 ? 0 : s, new st(s, a, c, t.opacity);
}
function Rs(t, e, n, r) {
  return arguments.length === 1 ? Mr(t) : new st(t, e, n, r ?? 1);
}
function st(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
$n(st, Rs, Pr(re, {
  brighter(t) {
    return t = t == null ? Ee : Math.pow(Ee, t), new st(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Gt : Math.pow(Gt, t), new st(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new tt(
      Je(t >= 240 ? t - 240 : t + 120, i, r),
      Je(t, i, r),
      Je(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new st(Zn(this.h), he(this.s), he(this.l), Se(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Se(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Zn(this.h)}, ${he(this.s) * 100}%, ${he(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Zn(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function he(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Je(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const En = (t) => () => t;
function Hs(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function Bs(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function Ls(t) {
  return (t = +t) == 1 ? Ar : function(e, n) {
    return n - e ? Bs(e, n, t) : En(isNaN(e) ? n : e);
  };
}
function Ar(t, e) {
  var n = e - t;
  return n ? Hs(t, n) : En(isNaN(t) ? e : t);
}
const Ce = (function t(e) {
  var n = Ls(e);
  function r(i, o) {
    var s = n((i = fn(i)).r, (o = fn(o)).r), a = n(i.g, o.g), c = n(i.b, o.b), u = Ar(i.opacity, o.opacity);
    return function(l) {
      return i.r = s(l), i.g = a(l), i.b = c(l), i.opacity = u(l), i + "";
    };
  }
  return r.gamma = t, r;
})(1);
function Vs(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, r = e.slice(), i;
  return function(o) {
    for (i = 0; i < n; ++i) r[i] = t[i] * (1 - o) + e[i] * o;
    return r;
  };
}
function Xs(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function Ws(t, e) {
  var n = e ? e.length : 0, r = t ? Math.min(n, t.length) : 0, i = new Array(r), o = new Array(n), s;
  for (s = 0; s < r; ++s) i[s] = Zt(t[s], e[s]);
  for (; s < n; ++s) o[s] = e[s];
  return function(a) {
    for (s = 0; s < r; ++s) o[s] = i[s](a);
    return o;
  };
}
function Ys(t, e) {
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
function qs(t, e) {
  var n = {}, r = {}, i;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (i in e)
    i in t ? n[i] = Zt(t[i], e[i]) : r[i] = e[i];
  return function(o) {
    for (i in n) r[i] = n[i](o);
    return r;
  };
}
var hn = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, je = new RegExp(hn.source, "g");
function Fs(t) {
  return function() {
    return t;
  };
}
function Zs(t) {
  return function(e) {
    return t(e) + "";
  };
}
function kr(t, e) {
  var n = hn.lastIndex = je.lastIndex = 0, r, i, o, s = -1, a = [], c = [];
  for (t = t + "", e = e + ""; (r = hn.exec(t)) && (i = je.exec(e)); )
    (o = i.index) > n && (o = e.slice(n, o), a[s] ? a[s] += o : a[++s] = o), (r = r[0]) === (i = i[0]) ? a[s] ? a[s] += i : a[++s] = i : (a[++s] = null, c.push({ i: s, x: ut(r, i) })), n = je.lastIndex;
  return n < e.length && (o = e.slice(n), a[s] ? a[s] += o : a[++s] = o), a.length < 2 ? c[0] ? Zs(c[0].x) : Fs(e) : (e = c.length, function(u) {
    for (var l = 0, f; l < e; ++l) a[(f = c[l]).i] = f.x(u);
    return a.join("");
  });
}
function Zt(t, e) {
  var n = typeof e, r;
  return e == null || n === "boolean" ? En(e) : (n === "number" ? ut : n === "string" ? (r = Nt(e)) ? (e = r, Ce) : kr : e instanceof Nt ? Ce : e instanceof Date ? Ys : Xs(e) ? Vs : Array.isArray(e) ? Ws : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? qs : ut)(t, e);
}
var Un = 180 / Math.PI, dn = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Or(t, e, n, r, i, o) {
  var s, a, c;
  return (s = Math.sqrt(t * t + e * e)) && (t /= s, e /= s), (c = t * n + e * r) && (n -= t * c, r -= e * c), (a = Math.sqrt(n * n + r * r)) && (n /= a, r /= a, c /= a), t * r < e * n && (t = -t, e = -e, c = -c, s = -s), {
    translateX: i,
    translateY: o,
    rotate: Math.atan2(e, t) * Un,
    skewX: Math.atan(c) * Un,
    scaleX: s,
    scaleY: a
  };
}
var de;
function Us(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? dn : Or(e.a, e.b, e.c, e.d, e.e, e.f);
}
function Gs(t) {
  return t == null || (de || (de = document.createElementNS("http://www.w3.org/2000/svg", "g")), de.setAttribute("transform", t), !(t = de.transform.baseVal.consolidate())) ? dn : (t = t.matrix, Or(t.a, t.b, t.c, t.d, t.e, t.f));
}
function zr(t, e, n, r) {
  function i(u) {
    return u.length ? u.pop() + " " : "";
  }
  function o(u, l, f, d, m, b) {
    if (u !== f || l !== d) {
      var E = m.push("translate(", null, e, null, n);
      b.push({ i: E - 4, x: ut(u, f) }, { i: E - 2, x: ut(l, d) });
    } else (f || d) && m.push("translate(" + f + e + d + n);
  }
  function s(u, l, f, d) {
    u !== l ? (u - l > 180 ? l += 360 : l - u > 180 && (u += 360), d.push({ i: f.push(i(f) + "rotate(", null, r) - 2, x: ut(u, l) })) : l && f.push(i(f) + "rotate(" + l + r);
  }
  function a(u, l, f, d) {
    u !== l ? d.push({ i: f.push(i(f) + "skewX(", null, r) - 2, x: ut(u, l) }) : l && f.push(i(f) + "skewX(" + l + r);
  }
  function c(u, l, f, d, m, b) {
    if (u !== f || l !== d) {
      var E = m.push(i(m) + "scale(", null, ",", null, ")");
      b.push({ i: E - 4, x: ut(u, f) }, { i: E - 2, x: ut(l, d) });
    } else (f !== 1 || d !== 1) && m.push(i(m) + "scale(" + f + "," + d + ")");
  }
  return function(u, l) {
    var f = [], d = [];
    return u = t(u), l = t(l), o(u.translateX, u.translateY, l.translateX, l.translateY, f, d), s(u.rotate, l.rotate, f, d), a(u.skewX, l.skewX, f, d), c(u.scaleX, u.scaleY, l.scaleX, l.scaleY, f, d), u = l = null, function(m) {
      for (var b = -1, E = d.length, M; ++b < E; ) f[(M = d[b]).i] = M.x(m);
      return f.join("");
    };
  };
}
var Ks = zr(Us, "px, ", "px)", "deg)"), Qs = zr(Gs, ", ", ")", ")"), Js = 1e-12;
function Gn(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function js(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function ta(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const we = (function t(e, n, r) {
  function i(o, s) {
    var a = o[0], c = o[1], u = o[2], l = s[0], f = s[1], d = s[2], m = l - a, b = f - c, E = m * m + b * b, M, N;
    if (E < Js)
      N = Math.log(d / u) / e, M = function(P) {
        return [
          a + P * m,
          c + P * b,
          u * Math.exp(e * P * N)
        ];
      };
    else {
      var O = Math.sqrt(E), x = (d * d - u * u + r * E) / (2 * u * n * O), p = (d * d - u * u - r * E) / (2 * d * n * O), w = Math.log(Math.sqrt(x * x + 1) - x), v = Math.log(Math.sqrt(p * p + 1) - p);
      N = (v - w) / e, M = function(P) {
        var H = P * N, z = Gn(w), Z = u / (n * O) * (z * ta(e * H + w) - js(w));
        return [
          a + Z * m,
          c + Z * b,
          u * z / Gn(e * H + w)
        ];
      };
    }
    return M.duration = N * 1e3 * e / Math.SQRT2, M;
  }
  return i.rho = function(o) {
    var s = Math.max(1e-3, +o), a = s * s, c = a * a;
    return t(s, a, c);
  }, i;
})(Math.SQRT2, 2, 4);
var Ot = 0, Yt = 0, Xt = 0, Dr = 1e3, Te, qt, Ie = 0, $t = 0, He = 0, Qt = typeof performance == "object" && performance.now ? performance : Date, Rr = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Sn() {
  return $t || (Rr(ea), $t = Qt.now() + He);
}
function ea() {
  $t = 0;
}
function Pe() {
  this._call = this._time = this._next = null;
}
Pe.prototype = Hr.prototype = {
  constructor: Pe,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Sn() : +n) + (e == null ? 0 : +e), !this._next && qt !== this && (qt ? qt._next = this : Te = this, qt = this), this._call = t, this._time = n, pn();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, pn());
  }
};
function Hr(t, e, n) {
  var r = new Pe();
  return r.restart(t, e, n), r;
}
function na() {
  Sn(), ++Ot;
  for (var t = Te, e; t; )
    (e = $t - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --Ot;
}
function Kn() {
  $t = (Ie = Qt.now()) + He, Ot = Yt = 0;
  try {
    na();
  } finally {
    Ot = 0, ia(), $t = 0;
  }
}
function ra() {
  var t = Qt.now(), e = t - Ie;
  e > Dr && (He -= e, Ie = t);
}
function ia() {
  for (var t, e = Te, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : Te = n);
  qt = t, pn(r);
}
function pn(t) {
  if (!Ot) {
    Yt && (Yt = clearTimeout(Yt));
    var e = t - $t;
    e > 24 ? (t < 1 / 0 && (Yt = setTimeout(Kn, t - Qt.now() - He)), Xt && (Xt = clearInterval(Xt))) : (Xt || (Ie = Qt.now(), Xt = setInterval(ra, Dr)), Ot = 1, Rr(Kn));
  }
}
function Qn(t, e, n) {
  var r = new Pe();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var oa = De("start", "end", "cancel", "interrupt"), sa = [], Br = 0, Jn = 1, gn = 2, _e = 3, jn = 4, mn = 5, xe = 6;
function Be(t, e, n, r, i, o) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (n in s) return;
  aa(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: oa,
    tween: sa,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Br
  });
}
function Cn(t, e) {
  var n = at(t, e);
  if (n.state > Br) throw new Error("too late; already scheduled");
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
function aa(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = Hr(o, 0, n.time);
  function o(u) {
    n.state = Jn, n.timer.restart(s, n.delay, n.time), n.delay <= u && s(u - n.delay);
  }
  function s(u) {
    var l, f, d, m;
    if (n.state !== Jn) return c();
    for (l in r)
      if (m = r[l], m.name === n.name) {
        if (m.state === _e) return Qn(s);
        m.state === jn ? (m.state = xe, m.timer.stop(), m.on.call("interrupt", t, t.__data__, m.index, m.group), delete r[l]) : +l < e && (m.state = xe, m.timer.stop(), m.on.call("cancel", t, t.__data__, m.index, m.group), delete r[l]);
      }
    if (Qn(function() {
      n.state === _e && (n.state = jn, n.timer.restart(a, n.delay, n.time), a(u));
    }), n.state = gn, n.on.call("start", t, t.__data__, n.index, n.group), n.state === gn) {
      for (n.state = _e, i = new Array(d = n.tween.length), l = 0, f = -1; l < d; ++l)
        (m = n.tween[l].value.call(t, t.__data__, n.index, n.group)) && (i[++f] = m);
      i.length = f + 1;
    }
  }
  function a(u) {
    for (var l = u < n.duration ? n.ease.call(null, u / n.duration) : (n.timer.restart(c), n.state = mn, 1), f = -1, d = i.length; ++f < d; )
      i[f].call(t, l);
    n.state === mn && (n.on.call("end", t, t.__data__, n.index, n.group), c());
  }
  function c() {
    n.state = xe, n.timer.stop(), delete r[e];
    for (var u in r) return;
    delete t.__transition;
  }
}
function ve(t, e) {
  var n = t.__transition, r, i, o = !0, s;
  if (n) {
    e = e == null ? null : e + "";
    for (s in n) {
      if ((r = n[s]).name !== e) {
        o = !1;
        continue;
      }
      i = r.state > gn && r.state < mn, r.state = xe, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[s];
    }
    o && delete t.__transition;
  }
}
function ua(t) {
  return this.each(function() {
    ve(this, t);
  });
}
function ca(t, e) {
  var n, r;
  return function() {
    var i = ht(this, t), o = i.tween;
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
function la(t, e, n) {
  var r, i;
  if (typeof n != "function") throw new Error();
  return function() {
    var o = ht(this, t), s = o.tween;
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
function fa(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = at(this.node(), n).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? ca : la)(n, t, e));
}
function Tn(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = ht(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return at(i, r).value[e];
  };
}
function Lr(t, e) {
  var n;
  return (typeof e == "number" ? ut : e instanceof Nt ? Ce : (n = Nt(e)) ? (e = n, Ce) : kr)(t, e);
}
function ha(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function da(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function pa(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? o : o = e(r = s, n);
  };
}
function ga(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? o : o = e(r = s, n);
  };
}
function ma(t, e, n) {
  var r, i, o;
  return function() {
    var s, a = n(this), c;
    return a == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), c = a + "", s === c ? null : s === r && c === i ? o : (i = c, o = e(r = s, a)));
  };
}
function ya(t, e, n) {
  var r, i, o;
  return function() {
    var s, a = n(this), c;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), c = a + "", s === c ? null : s === r && c === i ? o : (i = c, o = e(r = s, a)));
  };
}
function wa(t, e) {
  var n = Re(t), r = n === "transform" ? Qs : Lr;
  return this.attrTween(t, typeof e == "function" ? (n.local ? ya : ma)(n, r, Tn(this, "attr." + t, e)) : e == null ? (n.local ? da : ha)(n) : (n.local ? ga : pa)(n, r, e));
}
function _a(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function xa(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function va(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && xa(t, o)), n;
  }
  return i._value = e, i;
}
function ba(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && _a(t, o)), n;
  }
  return i._value = e, i;
}
function Na(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var r = Re(t);
  return this.tween(n, (r.local ? va : ba)(r, e));
}
function $a(t, e) {
  return function() {
    Cn(this, t).delay = +e.apply(this, arguments);
  };
}
function Ea(t, e) {
  return e = +e, function() {
    Cn(this, t).delay = e;
  };
}
function Sa(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? $a : Ea)(e, t)) : at(this.node(), e).delay;
}
function Ca(t, e) {
  return function() {
    ht(this, t).duration = +e.apply(this, arguments);
  };
}
function Ta(t, e) {
  return e = +e, function() {
    ht(this, t).duration = e;
  };
}
function Ia(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Ca : Ta)(e, t)) : at(this.node(), e).duration;
}
function Pa(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    ht(this, t).ease = e;
  };
}
function Ma(t) {
  var e = this._id;
  return arguments.length ? this.each(Pa(e, t)) : at(this.node(), e).ease;
}
function Aa(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    ht(this, t).ease = n;
  };
}
function ka(t) {
  if (typeof t != "function") throw new Error();
  return this.each(Aa(this._id, t));
}
function Oa(t) {
  typeof t != "function" && (t = wr(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], s = o.length, a = r[i] = [], c, u = 0; u < s; ++u)
      (c = o[u]) && t.call(c, c.__data__, u, o) && a.push(c);
  return new wt(r, this._parents, this._name, this._id);
}
function za(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, o = Math.min(r, i), s = new Array(r), a = 0; a < o; ++a)
    for (var c = e[a], u = n[a], l = c.length, f = s[a] = new Array(l), d, m = 0; m < l; ++m)
      (d = c[m] || u[m]) && (f[m] = d);
  for (; a < r; ++a)
    s[a] = e[a];
  return new wt(s, this._parents, this._name, this._id);
}
function Da(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function Ra(t, e, n) {
  var r, i, o = Da(e) ? Cn : ht;
  return function() {
    var s = o(this, t), a = s.on;
    a !== r && (i = (r = a).copy()).on(e, n), s.on = i;
  };
}
function Ha(t, e) {
  var n = this._id;
  return arguments.length < 2 ? at(this.node(), n).on.on(t) : this.each(Ra(n, t, e));
}
function Ba(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function La() {
  return this.on("end.remove", Ba(this._id));
}
function Va(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = bn(t));
  for (var r = this._groups, i = r.length, o = new Array(i), s = 0; s < i; ++s)
    for (var a = r[s], c = a.length, u = o[s] = new Array(c), l, f, d = 0; d < c; ++d)
      (l = a[d]) && (f = t.call(l, l.__data__, d, a)) && ("__data__" in l && (f.__data__ = l.__data__), u[d] = f, Be(u[d], e, n, d, u, at(l, n)));
  return new wt(o, this._parents, e, n);
}
function Xa(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = yr(t));
  for (var r = this._groups, i = r.length, o = [], s = [], a = 0; a < i; ++a)
    for (var c = r[a], u = c.length, l, f = 0; f < u; ++f)
      if (l = c[f]) {
        for (var d = t.call(l, l.__data__, f, c), m, b = at(l, n), E = 0, M = d.length; E < M; ++E)
          (m = d[E]) && Be(m, e, n, E, d, b);
        o.push(d), s.push(l);
      }
  return new wt(o, s, e, n);
}
var Wa = ne.prototype.constructor;
function Ya() {
  return new Wa(this._groups, this._parents);
}
function qa(t, e) {
  var n, r, i;
  return function() {
    var o = kt(this, t), s = (this.style.removeProperty(t), kt(this, t));
    return o === s ? null : o === n && s === r ? i : i = e(n = o, r = s);
  };
}
function Vr(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Fa(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var s = kt(this, t);
    return s === i ? null : s === r ? o : o = e(r = s, n);
  };
}
function Za(t, e, n) {
  var r, i, o;
  return function() {
    var s = kt(this, t), a = n(this), c = a + "";
    return a == null && (c = a = (this.style.removeProperty(t), kt(this, t))), s === c ? null : s === r && c === i ? o : (i = c, o = e(r = s, a));
  };
}
function Ua(t, e) {
  var n, r, i, o = "style." + e, s = "end." + o, a;
  return function() {
    var c = ht(this, t), u = c.on, l = c.value[o] == null ? a || (a = Vr(e)) : void 0;
    (u !== n || i !== l) && (r = (n = u).copy()).on(s, i = l), c.on = r;
  };
}
function Ga(t, e, n) {
  var r = (t += "") == "transform" ? Ks : Lr;
  return e == null ? this.styleTween(t, qa(t, r)).on("end.style." + t, Vr(t)) : typeof e == "function" ? this.styleTween(t, Za(t, r, Tn(this, "style." + t, e))).each(Ua(this._id, t)) : this.styleTween(t, Fa(t, r, e), n).on("end.style." + t, null);
}
function Ka(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function Qa(t, e, n) {
  var r, i;
  function o() {
    var s = e.apply(this, arguments);
    return s !== i && (r = (i = s) && Ka(t, s, n)), r;
  }
  return o._value = e, o;
}
function Ja(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (e == null) return this.tween(r, null);
  if (typeof e != "function") throw new Error();
  return this.tween(r, Qa(t, e, n ?? ""));
}
function ja(t) {
  return function() {
    this.textContent = t;
  };
}
function tu(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function eu(t) {
  return this.tween("text", typeof t == "function" ? tu(Tn(this, "text", t)) : ja(t == null ? "" : t + ""));
}
function nu(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function ru(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && nu(i)), e;
  }
  return r._value = t, r;
}
function iu(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, ru(t));
}
function ou() {
  for (var t = this._name, e = this._id, n = Xr(), r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], a = s.length, c, u = 0; u < a; ++u)
      if (c = s[u]) {
        var l = at(c, e);
        Be(c, t, n, u, s, {
          time: l.time + l.delay + l.duration,
          delay: 0,
          duration: l.duration,
          ease: l.ease
        });
      }
  return new wt(r, this._parents, t, n);
}
function su() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(o, s) {
    var a = { value: s }, c = { value: function() {
      --i === 0 && o();
    } };
    n.each(function() {
      var u = ht(this, r), l = u.on;
      l !== t && (e = (t = l).copy(), e._.cancel.push(a), e._.interrupt.push(a), e._.end.push(c)), u.on = e;
    }), i === 0 && o();
  });
}
var au = 0;
function wt(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function Xr() {
  return ++au;
}
var gt = ne.prototype;
wt.prototype = {
  constructor: wt,
  select: Va,
  selectAll: Xa,
  selectChild: gt.selectChild,
  selectChildren: gt.selectChildren,
  filter: Oa,
  merge: za,
  selection: Ya,
  transition: ou,
  call: gt.call,
  nodes: gt.nodes,
  node: gt.node,
  size: gt.size,
  empty: gt.empty,
  each: gt.each,
  on: Ha,
  attr: wa,
  attrTween: Na,
  style: Ga,
  styleTween: Ja,
  text: eu,
  textTween: iu,
  remove: La,
  tween: fa,
  delay: Sa,
  duration: Ia,
  ease: Ma,
  easeVarying: ka,
  end: su,
  [Symbol.iterator]: gt[Symbol.iterator]
};
function uu(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var cu = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: uu
};
function lu(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function fu(t) {
  var e, n;
  t instanceof wt ? (e = t._id, t = t._name) : (e = Xr(), (n = cu).time = Sn(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], a = s.length, c, u = 0; u < a; ++u)
      (c = s[u]) && Be(c, t, e, u, s, n || lu(c, e));
  return new wt(r, this._parents, t, e);
}
ne.prototype.interrupt = ua;
ne.prototype.transition = fu;
const pe = (t) => () => t;
function hu(t, {
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
function mt(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
mt.prototype = {
  constructor: mt,
  scale: function(t) {
    return t === 1 ? this : new mt(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new mt(this.k, this.x + this.k * t, this.y + this.k * e);
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
var Le = new mt(1, 0, 0);
Wr.prototype = mt.prototype;
function Wr(t) {
  for (; !t.__zoom; ) if (!(t = t.parentNode)) return Le;
  return t.__zoom;
}
function tn(t) {
  t.stopImmediatePropagation();
}
function Wt(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function du(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function pu() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function tr() {
  return this.__zoom || Le;
}
function gu(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function mu() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function yu(t, e, n) {
  var r = t.invertX(e[0][0]) - n[0][0], i = t.invertX(e[1][0]) - n[1][0], o = t.invertY(e[0][1]) - n[0][1], s = t.invertY(e[1][1]) - n[1][1];
  return t.translate(
    i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i),
    s > o ? (o + s) / 2 : Math.min(0, o) || Math.max(0, s)
  );
}
function Yr() {
  var t = du, e = pu, n = yu, r = gu, i = mu, o = [0, 1 / 0], s = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, c = we, u = De("start", "zoom", "end"), l, f, d, m = 500, b = 150, E = 0, M = 10;
  function N(h) {
    h.property("__zoom", tr).on("wheel.zoom", H, { passive: !1 }).on("mousedown.zoom", z).on("dblclick.zoom", Z).filter(i).on("touchstart.zoom", I).on("touchmove.zoom", S).on("touchend.zoom touchcancel.zoom", A).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  N.transform = function(h, y, g, _) {
    var $ = h.selection ? h.selection() : h;
    $.property("__zoom", tr), h !== $ ? w(h, y, g, _) : $.interrupt().each(function() {
      v(this, arguments).event(_).start().zoom(null, typeof y == "function" ? y.apply(this, arguments) : y).end();
    });
  }, N.scaleBy = function(h, y, g, _) {
    N.scaleTo(h, function() {
      var $ = this.__zoom.k, T = typeof y == "function" ? y.apply(this, arguments) : y;
      return $ * T;
    }, g, _);
  }, N.scaleTo = function(h, y, g, _) {
    N.transform(h, function() {
      var $ = e.apply(this, arguments), T = this.__zoom, C = g == null ? p($) : typeof g == "function" ? g.apply(this, arguments) : g, k = T.invert(C), D = typeof y == "function" ? y.apply(this, arguments) : y;
      return n(x(O(T, D), C, k), $, s);
    }, g, _);
  }, N.translateBy = function(h, y, g, _) {
    N.transform(h, function() {
      return n(this.__zoom.translate(
        typeof y == "function" ? y.apply(this, arguments) : y,
        typeof g == "function" ? g.apply(this, arguments) : g
      ), e.apply(this, arguments), s);
    }, null, _);
  }, N.translateTo = function(h, y, g, _, $) {
    N.transform(h, function() {
      var T = e.apply(this, arguments), C = this.__zoom, k = _ == null ? p(T) : typeof _ == "function" ? _.apply(this, arguments) : _;
      return n(Le.translate(k[0], k[1]).scale(C.k).translate(
        typeof y == "function" ? -y.apply(this, arguments) : -y,
        typeof g == "function" ? -g.apply(this, arguments) : -g
      ), T, s);
    }, _, $);
  };
  function O(h, y) {
    return y = Math.max(o[0], Math.min(o[1], y)), y === h.k ? h : new mt(y, h.x, h.y);
  }
  function x(h, y, g) {
    var _ = y[0] - g[0] * h.k, $ = y[1] - g[1] * h.k;
    return _ === h.x && $ === h.y ? h : new mt(h.k, _, $);
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
      var $ = this, T = arguments, C = v($, T).event(_), k = e.apply($, T), D = g == null ? p(k) : typeof g == "function" ? g.apply($, T) : g, Y = Math.max(k[1][0] - k[0][0], k[1][1] - k[0][1]), R = $.__zoom, W = typeof y == "function" ? y.apply($, T) : y, Q = c(R.invert(D).concat(Y / R.k), W.invert(D).concat(Y / W.k));
      return function(L) {
        if (L === 1) L = W;
        else {
          var V = Q(L), J = Y / V[2];
          L = new mt(J, D[0] - V[0] * J, D[1] - V[1] * J);
        }
        C.zoom(null, L);
      };
    });
  }
  function v(h, y, g) {
    return !g && h.__zooming || new P(h, y);
  }
  function P(h, y) {
    this.that = h, this.args = y, this.active = 0, this.sourceEvent = null, this.extent = e.apply(h, y), this.taps = 0;
  }
  P.prototype = {
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
      var y = rt(this.that).datum();
      u.call(
        h,
        this.that,
        new hu(h, {
          sourceEvent: this.sourceEvent,
          target: N,
          transform: this.that.__zoom,
          dispatch: u
        }),
        y
      );
    }
  };
  function H(h, ...y) {
    if (!t.apply(this, arguments)) return;
    var g = v(this, y).event(h), _ = this.__zoom, $ = Math.max(o[0], Math.min(o[1], _.k * Math.pow(2, r.apply(this, arguments)))), T = ot(h);
    if (g.wheel)
      (g.mouse[0][0] !== T[0] || g.mouse[0][1] !== T[1]) && (g.mouse[1] = _.invert(g.mouse[0] = T)), clearTimeout(g.wheel);
    else {
      if (_.k === $) return;
      g.mouse = [T, _.invert(T)], ve(this), g.start();
    }
    Wt(h), g.wheel = setTimeout(C, b), g.zoom("mouse", n(x(O(_, $), g.mouse[0], g.mouse[1]), g.extent, s));
    function C() {
      g.wheel = null, g.end();
    }
  }
  function z(h, ...y) {
    if (d || !t.apply(this, arguments)) return;
    var g = h.currentTarget, _ = v(this, y, !0).event(h), $ = rt(h.view).on("mousemove.zoom", D, !0).on("mouseup.zoom", Y, !0), T = ot(h, g), C = h.clientX, k = h.clientY;
    Tr(h.view), tn(h), _.mouse = [T, this.__zoom.invert(T)], ve(this), _.start();
    function D(R) {
      if (Wt(R), !_.moved) {
        var W = R.clientX - C, Q = R.clientY - k;
        _.moved = W * W + Q * Q > E;
      }
      _.event(R).zoom("mouse", n(x(_.that.__zoom, _.mouse[0] = ot(R, g), _.mouse[1]), _.extent, s));
    }
    function Y(R) {
      $.on("mousemove.zoom mouseup.zoom", null), Ir(R.view, _.moved), Wt(R), _.event(R).end();
    }
  }
  function Z(h, ...y) {
    if (t.apply(this, arguments)) {
      var g = this.__zoom, _ = ot(h.changedTouches ? h.changedTouches[0] : h, this), $ = g.invert(_), T = g.k * (h.shiftKey ? 0.5 : 2), C = n(x(O(g, T), _, $), e.apply(this, y), s);
      Wt(h), a > 0 ? rt(this).transition().duration(a).call(w, C, _, h) : rt(this).call(N.transform, C, _, h);
    }
  }
  function I(h, ...y) {
    if (t.apply(this, arguments)) {
      var g = h.touches, _ = g.length, $ = v(this, y, h.changedTouches.length === _).event(h), T, C, k, D;
      for (tn(h), C = 0; C < _; ++C)
        k = g[C], D = ot(k, this), D = [D, this.__zoom.invert(D), k.identifier], $.touch0 ? !$.touch1 && $.touch0[2] !== D[2] && ($.touch1 = D, $.taps = 0) : ($.touch0 = D, T = !0, $.taps = 1 + !!l);
      l && (l = clearTimeout(l)), T && ($.taps < 2 && (f = D[0], l = setTimeout(function() {
        l = null;
      }, m)), ve(this), $.start());
    }
  }
  function S(h, ...y) {
    if (this.__zooming) {
      var g = v(this, y).event(h), _ = h.changedTouches, $ = _.length, T, C, k, D;
      for (Wt(h), T = 0; T < $; ++T)
        C = _[T], k = ot(C, this), g.touch0 && g.touch0[2] === C.identifier ? g.touch0[0] = k : g.touch1 && g.touch1[2] === C.identifier && (g.touch1[0] = k);
      if (C = g.that.__zoom, g.touch1) {
        var Y = g.touch0[0], R = g.touch0[1], W = g.touch1[0], Q = g.touch1[1], L = (L = W[0] - Y[0]) * L + (L = W[1] - Y[1]) * L, V = (V = Q[0] - R[0]) * V + (V = Q[1] - R[1]) * V;
        C = O(C, Math.sqrt(L / V)), k = [(Y[0] + W[0]) / 2, (Y[1] + W[1]) / 2], D = [(R[0] + Q[0]) / 2, (R[1] + Q[1]) / 2];
      } else if (g.touch0) k = g.touch0[0], D = g.touch0[1];
      else return;
      g.zoom("touch", n(x(C, k, D), g.extent, s));
    }
  }
  function A(h, ...y) {
    if (this.__zooming) {
      var g = v(this, y).event(h), _ = h.changedTouches, $ = _.length, T, C;
      for (tn(h), d && clearTimeout(d), d = setTimeout(function() {
        d = null;
      }, m), T = 0; T < $; ++T)
        C = _[T], g.touch0 && g.touch0[2] === C.identifier ? delete g.touch0 : g.touch1 && g.touch1[2] === C.identifier && delete g.touch1;
      if (g.touch1 && !g.touch0 && (g.touch0 = g.touch1, delete g.touch1), g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
      else if (g.end(), g.taps === 2 && (C = ot(C, this), Math.hypot(f[0] - C[0], f[1] - C[1]) < M)) {
        var k = rt(this).on("dblclick.zoom");
        k && k.apply(this, arguments);
      }
    }
  }
  return N.wheelDelta = function(h) {
    return arguments.length ? (r = typeof h == "function" ? h : pe(+h), N) : r;
  }, N.filter = function(h) {
    return arguments.length ? (t = typeof h == "function" ? h : pe(!!h), N) : t;
  }, N.touchable = function(h) {
    return arguments.length ? (i = typeof h == "function" ? h : pe(!!h), N) : i;
  }, N.extent = function(h) {
    return arguments.length ? (e = typeof h == "function" ? h : pe([[+h[0][0], +h[0][1]], [+h[1][0], +h[1][1]]]), N) : e;
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
    return arguments.length ? (E = (h = +h) * h, N) : Math.sqrt(E);
  }, N.tapDistance = function(h) {
    return arguments.length ? (M = +h, N) : M;
  }, N;
}
const er = {
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
}, qr = [
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
];
var Me;
(function(t) {
  t.Strict = "strict", t.Loose = "loose";
})(Me || (Me = {}));
var Mt;
(function(t) {
  t.Free = "free", t.Vertical = "vertical", t.Horizontal = "horizontal";
})(Mt || (Mt = {}));
var nr;
(function(t) {
  t.Partial = "partial", t.Full = "full";
})(nr || (nr = {}));
var rr;
(function(t) {
  t.Bezier = "default", t.Straight = "straight", t.Step = "step", t.SmoothStep = "smoothstep", t.SimpleBezier = "simplebezier";
})(rr || (rr = {}));
var ir;
(function(t) {
  t.Arrow = "arrow", t.ArrowClosed = "arrowclosed";
})(ir || (ir = {}));
var B;
(function(t) {
  t.Left = "left", t.Top = "top", t.Right = "right", t.Bottom = "bottom";
})(B || (B = {}));
const or = {
  [B.Left]: B.Right,
  [B.Right]: B.Left,
  [B.Top]: B.Bottom,
  [B.Bottom]: B.Top
}, Fr = (t) => "id" in t && "internals" in t && !("source" in t) && !("target" in t), ie = (t, e = [0, 0]) => {
  const { width: n, height: r } = Lt(t), i = t.origin ?? e, o = n * i[0], s = r * i[1];
  return {
    x: t.position.x - o,
    y: t.position.y - s
  };
}, Zr = (t, e = {}) => {
  let n = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 }, r = !1;
  return t.forEach((i) => {
    (e.filter === void 0 || e.filter(i)) && (n = Gr(n, vu(i)), r = !0);
  }), r ? Kr(n) : { x: 0, y: 0, width: 0, height: 0 };
};
function wu({ nodeId: t, nextPosition: e, nodeLookup: n, nodeOrigin: r = [0, 0], nodeExtent: i, onError: o }) {
  const s = n.get(t), a = s.parentId ? n.get(s.parentId) : void 0, { x: c, y: u } = a ? a.internals.positionAbsolute : { x: 0, y: 0 }, l = s.origin ?? r;
  let f = s.extent || i;
  if (s.extent === "parent" && !s.expandParent)
    if (!a)
      o?.("005", er.error005());
    else {
      const m = a.measured.width, b = a.measured.height;
      m && b && (f = [
        [c, u],
        [c + m, u + b]
      ]);
    }
  else a && jt(s.extent) && (f = [
    [s.extent[0][0] + c, s.extent[0][1] + u],
    [s.extent[1][0] + c, s.extent[1][1] + u]
  ]);
  const d = jt(f) ? zt(e, f, s.measured) : e;
  return (s.measured.width === void 0 || s.measured.height === void 0) && o?.("015", er.error015()), {
    position: {
      x: d.x - c + (s.measured.width ?? 0) * l[0],
      y: d.y - u + (s.measured.height ?? 0) * l[1]
    },
    positionAbsolute: d
  };
}
const Jt = (t, e = 0, n = 1) => Math.min(Math.max(t, e), n), zt = (t = { x: 0, y: 0 }, e, n) => ({
  x: Jt(t.x, e[0][0], e[1][0] - (n?.width ?? 0)),
  y: Jt(t.y, e[0][1], e[1][1] - (n?.height ?? 0))
});
function _u(t, e, n) {
  const { width: r, height: i } = Lt(n), { x: o, y: s } = n.internals.positionAbsolute;
  return zt(t, [
    [o, s],
    [o + r, s + i]
  ], e);
}
const sr = (t, e, n) => t < e ? Jt(Math.abs(t - e), 1, e) / e : t > n ? -Jt(Math.abs(t - n), 1, e) / e : 0, Ur = (t, e, n = 15, r = 40) => {
  const i = sr(t.x, r, e.width - r) * n, o = sr(t.y, r, e.height - r) * n;
  return [i, o];
}, Gr = (t, e) => ({
  x: Math.min(t.x, e.x),
  y: Math.min(t.y, e.y),
  x2: Math.max(t.x2, e.x2),
  y2: Math.max(t.y2, e.y2)
}), yn = ({ x: t, y: e, width: n, height: r }) => ({
  x: t,
  y: e,
  x2: t + n,
  y2: e + r
}), Kr = ({ x: t, y: e, x2: n, y2: r }) => ({
  x: t,
  y: e,
  width: n - t,
  height: r - e
}), xu = (t, e = [0, 0]) => {
  const { x: n, y: r } = Fr(t) ? t.internals.positionAbsolute : ie(t, e);
  return {
    x: n,
    y: r,
    width: t.measured?.width ?? t.width ?? t.initialWidth ?? 0,
    height: t.measured?.height ?? t.height ?? t.initialHeight ?? 0
  };
}, vu = (t, e = [0, 0]) => {
  const { x: n, y: r } = Fr(t) ? t.internals.positionAbsolute : ie(t, e);
  return {
    x: n,
    y: r,
    x2: n + (t.measured?.width ?? t.width ?? t.initialWidth ?? 0),
    y2: r + (t.measured?.height ?? t.height ?? t.initialHeight ?? 0)
  };
}, bu = (t, e) => Kr(Gr(yn(t), yn(e))), Nu = (t, e) => {
  const n = Math.max(0, Math.min(t.x + t.width, e.x + e.width) - Math.max(t.x, e.x)), r = Math.max(0, Math.min(t.y + t.height, e.y + e.height) - Math.max(t.y, e.y));
  return Math.ceil(n * r);
}, wn = (t) => !isNaN(t) && isFinite(t), Ve = (t, e = [1, 1]) => ({
  x: e[0] * Math.round(t.x / e[0]),
  y: e[1] * Math.round(t.y / e[1])
}), Qr = ({ x: t, y: e }, [n, r, i], o = !1, s = [1, 1]) => {
  const a = {
    x: (t - n) / i,
    y: (e - r) / i
  };
  return o ? Ve(a, s) : a;
}, $u = ({ x: t, y: e }, [n, r, i]) => ({
  x: t * i + n,
  y: e * i + r
}), In = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function jt(t) {
  return t != null && t !== "parent";
}
function Lt(t) {
  return {
    width: t.measured?.width ?? t.width ?? t.initialWidth ?? 0,
    height: t.measured?.height ?? t.height ?? t.initialHeight ?? 0
  };
}
function en(t, { snapGrid: e = [0, 0], snapToGrid: n = !1, transform: r, containerBounds: i }) {
  const { x: o, y: s } = yt(t), a = Qr({ x: o - (i?.left ?? 0), y: s - (i?.top ?? 0) }, r), { x: c, y: u } = n ? Ve(a, e) : a;
  return {
    xSnapped: c,
    ySnapped: u,
    ...a
  };
}
const Eu = (t) => t?.getRootNode?.() || window?.document, Su = (t) => "clientX" in t, yt = (t, e) => {
  const n = Su(t), r = n ? t.clientX : t.touches?.[0].clientX, i = n ? t.clientY : t.touches?.[0].clientY;
  return {
    x: r - (e?.left ?? 0),
    y: i - (e?.top ?? 0)
  };
};
function Cu({ sourceX: t, sourceY: e, targetX: n, targetY: r, sourceControlX: i, sourceControlY: o, targetControlX: s, targetControlY: a }) {
  const c = t * 0.125 + i * 0.375 + s * 0.375 + n * 0.125, u = e * 0.125 + o * 0.375 + a * 0.375 + r * 0.125, l = Math.abs(c - t), f = Math.abs(u - e);
  return [c, u, l, f];
}
function ge(t, e) {
  return t >= 0 ? 0.5 * t : e * 25 * Math.sqrt(-t);
}
function ar({ pos: t, x1: e, y1: n, x2: r, y2: i, c: o }) {
  switch (t) {
    case B.Left:
      return [e - ge(e - r, o), n];
    case B.Right:
      return [e + ge(r - e, o), n];
    case B.Top:
      return [e, n - ge(n - i, o)];
    case B.Bottom:
      return [e, n + ge(i - n, o)];
  }
}
function _n({ sourceX: t, sourceY: e, sourcePosition: n = B.Bottom, targetX: r, targetY: i, targetPosition: o = B.Top, curvature: s = 0.25 }) {
  const [a, c] = ar({
    pos: n,
    x1: t,
    y1: e,
    x2: r,
    y2: i,
    c: s
  }), [u, l] = ar({
    pos: o,
    x1: r,
    y1: i,
    x2: t,
    y2: e,
    c: s
  }), [f, d, m, b] = Cu({
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
B.Left + "", B.Right + "", B.Top + "", B.Bottom + "";
function Dt(t, e, n = B.Left, r = !1) {
  const i = (e?.x ?? 0) + t.internals.positionAbsolute.x, o = (e?.y ?? 0) + t.internals.positionAbsolute.y, { width: s, height: a } = e ?? Lt(t);
  if (r)
    return { x: i + s / 2, y: o + a / 2 };
  switch (e?.position ?? n) {
    case B.Top:
      return { x: i + s / 2, y: o };
    case B.Right:
      return { x: i + s, y: o + a / 2 };
    case B.Bottom:
      return { x: i + s / 2, y: o + a };
    case B.Left:
      return { x: i, y: o + a / 2 };
  }
}
const Jr = 1e3, Tu = 10, Pn = {
  nodeOrigin: [0, 0],
  nodeExtent: qr,
  elevateNodesOnSelect: !0,
  zIndexMode: "basic",
  defaults: {}
}, Iu = {
  ...Pn,
  checkEquality: !0
};
function Mn(t, e) {
  const n = { ...t };
  for (const r in e)
    e[r] !== void 0 && (n[r] = e[r]);
  return n;
}
function Pu(t, e, n) {
  const r = Mn(Pn, n);
  for (const i of t.values())
    if (i.parentId)
      jr(i, t, e, r);
    else {
      const o = ie(i, r.nodeOrigin), s = jt(i.extent) ? i.extent : r.nodeExtent, a = zt(o, s, Lt(i));
      i.internals.positionAbsolute = a;
    }
}
function Mu(t, e) {
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
function An(t) {
  return t === "manual";
}
function Au(t, e, n, r = {}) {
  const i = Mn(Iu, r), o = { i: 0 }, s = new Map(e), a = i?.elevateNodesOnSelect && !An(i.zIndexMode) ? Jr : 0;
  let c = t.length > 0;
  e.clear(), n.clear();
  for (const u of t) {
    let l = s.get(u.id);
    if (i.checkEquality && u === l?.internals.userNode)
      e.set(u.id, l);
    else {
      const f = ie(u, i.nodeOrigin), d = jt(u.extent) ? u.extent : i.nodeExtent, m = zt(f, d, Lt(u));
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
          handleBounds: Mu(u, l),
          z: ti(u, a, i.zIndexMode),
          userNode: u
        }
      }, e.set(u.id, l);
    }
    (l.measured === void 0 || l.measured.width === void 0 || l.measured.height === void 0) && !l.hidden && (c = !1), u.parentId && jr(l, e, n, r, o);
  }
  return c;
}
function ku(t, e) {
  if (!t.parentId)
    return;
  const n = e.get(t.parentId);
  n ? n.set(t.id, t) : e.set(t.parentId, /* @__PURE__ */ new Map([[t.id, t]]));
}
function jr(t, e, n, r, i) {
  const { elevateNodesOnSelect: o, nodeOrigin: s, nodeExtent: a, zIndexMode: c } = Mn(Pn, r), u = t.parentId, l = e.get(u);
  if (!l) {
    console.warn(`Parent node ${u} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
    return;
  }
  ku(t, n), i && !l.parentId && l.internals.rootParentIndex === void 0 && c === "auto" && (l.internals.rootParentIndex = ++i.i, l.internals.z = l.internals.z + i.i * Tu), i && l.internals.rootParentIndex !== void 0 && (i.i = l.internals.rootParentIndex);
  const f = o && !An(c) ? Jr : 0, { x: d, y: m, z: b } = Ou(t, l, s, a, f, c), { positionAbsolute: E } = t.internals, M = d !== E.x || m !== E.y;
  (M || b !== t.internals.z) && e.set(t.id, {
    ...t,
    internals: {
      ...t.internals,
      positionAbsolute: M ? { x: d, y: m } : E,
      z: b
    }
  });
}
function ti(t, e, n) {
  const r = wn(t.zIndex) ? t.zIndex : 0;
  return An(n) ? r : r + (t.selected ? e : 0);
}
function Ou(t, e, n, r, i, o) {
  const { x: s, y: a } = e.internals.positionAbsolute, c = Lt(t), u = ie(t, n), l = jt(t.extent) ? zt(u, t.extent, c) : u;
  let f = zt({ x: s + l.x, y: a + l.y }, r, c);
  t.extent === "parent" && (f = _u(f, c, e));
  const d = ti(t, i, o), m = e.internals.z ?? 0;
  return {
    x: f.x,
    y: f.y,
    z: m >= d ? m + 1 : d
  };
}
function ei(t, e) {
  if (!t.parentId)
    return !1;
  const n = e.get(t.parentId);
  return n ? n.selected ? !0 : ei(n, e) : !1;
}
function ur(t, e, n) {
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
function zu(t, e, n, r) {
  const i = /* @__PURE__ */ new Map();
  for (const [o, s] of t)
    if ((s.selected || s.id === r) && (!s.parentId || !ei(s, t)) && (s.draggable || e && typeof s.draggable > "u")) {
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
function nn({ nodeId: t, dragItems: e, nodeLookup: n, dragging: r = !0 }) {
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
function Du({ dragItems: t, snapGrid: e, x: n, y: r }) {
  const i = t.values().next().value;
  if (!i)
    return null;
  const o = {
    x: n - i.distance.x,
    y: r - i.distance.y
  }, s = Ve(o, e);
  return {
    x: s.x - o.x,
    y: s.y - o.y
  };
}
function Ru({ onNodeMouseDown: t, getStoreItems: e, onDragStart: n, onDrag: r, onDragStop: i }) {
  let o = { x: null, y: null }, s = 0, a = /* @__PURE__ */ new Map(), c = !1, u = { x: 0, y: 0 }, l = null, f = !1, d = null, m = !1, b = !1, E = null;
  function M({ noDragClassName: O, handleSelector: x, domNode: p, isSelectable: w, nodeId: v, nodeClickDistance: P = 0 }) {
    d = rt(p);
    function H({ x: S, y: A }) {
      const { nodeLookup: h, nodeExtent: y, snapGrid: g, snapToGrid: _, nodeOrigin: $, onNodeDrag: T, onSelectionDrag: C, onError: k, updateNodePositions: D } = e();
      o = { x: S, y: A };
      let Y = !1;
      const R = a.size > 1, W = R && y ? yn(Zr(a)) : null, Q = R && _ ? Du({
        dragItems: a,
        snapGrid: g,
        x: S,
        y: A
      }) : null;
      for (const [L, V] of a) {
        if (!h.has(L))
          continue;
        let J = { x: S - V.distance.x, y: A - V.distance.y };
        _ && (J = Q ? {
          x: Math.round(J.x + Q.x),
          y: Math.round(J.y + Q.y)
        } : Ve(J, g));
        let it = null;
        if (R && y && !V.extent && W) {
          const { positionAbsolute: q } = V.internals, pt = q.x - W.x + y[0][0], We = q.x + V.measured.width - W.x2 + y[1][0], se = q.y - W.y + y[0][1], Ye = q.y + V.measured.height - W.y2 + y[1][1];
          it = [
            [pt, se],
            [We, Ye]
          ];
        }
        const { position: G, positionAbsolute: dt } = wu({
          nodeId: L,
          nextPosition: J,
          nodeLookup: h,
          nodeExtent: it || y,
          nodeOrigin: $,
          onError: k
        });
        Y = Y || V.position.x !== G.x || V.position.y !== G.y, V.position = G, V.internals.positionAbsolute = dt;
      }
      if (b = b || Y, !!Y && (D(a, !0), E && (r || T || !v && C))) {
        const [L, V] = nn({
          nodeId: v,
          dragItems: a,
          nodeLookup: h
        });
        r?.(E, a, L, V), T?.(E, L, V), v || C?.(E, V);
      }
    }
    async function z() {
      if (!l)
        return;
      const { transform: S, panBy: A, autoPanSpeed: h, autoPanOnNodeDrag: y } = e();
      if (!y) {
        c = !1, cancelAnimationFrame(s);
        return;
      }
      const [g, _] = Ur(u, l, h);
      (g !== 0 || _ !== 0) && (o.x = (o.x ?? 0) - g / S[2], o.y = (o.y ?? 0) - _ / S[2], await A({ x: g, y: _ }) && H(o)), s = requestAnimationFrame(z);
    }
    function Z(S) {
      const { nodeLookup: A, multiSelectionActive: h, nodesDraggable: y, transform: g, snapGrid: _, snapToGrid: $, selectNodesOnDrag: T, onNodeDragStart: C, onSelectionDragStart: k, unselectNodesAndEdges: D } = e();
      f = !0, (!T || !w) && !h && v && (A.get(v)?.selected || D()), w && T && v && t?.(v);
      const Y = en(S.sourceEvent, { transform: g, snapGrid: _, snapToGrid: $, containerBounds: l });
      if (o = Y, a = zu(A, y, Y, v), a.size > 0 && (n || C || !v && k)) {
        const [R, W] = nn({
          nodeId: v,
          dragItems: a,
          nodeLookup: A
        });
        n?.(S.sourceEvent, a, R, W), C?.(S.sourceEvent, R, W), v || k?.(S.sourceEvent, W);
      }
    }
    const I = Es().clickDistance(P).on("start", (S) => {
      const { domNode: A, nodeDragThreshold: h, transform: y, snapGrid: g, snapToGrid: _ } = e();
      l = A?.getBoundingClientRect() || null, m = !1, b = !1, E = S.sourceEvent, h === 0 && Z(S), o = en(S.sourceEvent, { transform: y, snapGrid: g, snapToGrid: _, containerBounds: l }), u = yt(S.sourceEvent, l);
    }).on("drag", (S) => {
      const { autoPanOnNodeDrag: A, transform: h, snapGrid: y, snapToGrid: g, nodeDragThreshold: _, nodeLookup: $ } = e(), T = en(S.sourceEvent, { transform: h, snapGrid: y, snapToGrid: g, containerBounds: l });
      if (E = S.sourceEvent, (S.sourceEvent.type === "touchmove" && S.sourceEvent.touches.length > 1 || // if user deletes a node while dragging, we need to abort the drag to prevent errors
      v && !$.has(v)) && (m = !0), !m) {
        if (!c && A && f && (c = !0, z()), !f) {
          const C = yt(S.sourceEvent, l), k = C.x - u.x, D = C.y - u.y;
          Math.sqrt(k * k + D * D) > _ && Z(S);
        }
        (o.x !== T.xSnapped || o.y !== T.ySnapped) && a && f && (u = yt(S.sourceEvent, l), H(T));
      }
    }).on("end", (S) => {
      if (!(!f || m) && (c = !1, f = !1, cancelAnimationFrame(s), a.size > 0)) {
        const { nodeLookup: A, updateNodePositions: h, onNodeDragStop: y, onSelectionDragStop: g } = e();
        if (b && (h(a, !1), b = !1), i || y || !v && g) {
          const [_, $] = nn({
            nodeId: v,
            dragItems: a,
            nodeLookup: A,
            dragging: !1
          });
          i?.(S.sourceEvent, a, _, $), y?.(S.sourceEvent, _, $), v || g?.(S.sourceEvent, $);
        }
      }
    }).filter((S) => {
      const A = S.target;
      return !S.button && (!O || !ur(A, `.${O}`, p)) && (!x || ur(A, x, p));
    });
    d.call(I);
  }
  function N() {
    d?.on(".drag", null);
  }
  return {
    update: M,
    destroy: N
  };
}
function Hu(t, e, n) {
  const r = [], i = {
    x: t.x - n,
    y: t.y - n,
    width: n * 2,
    height: n * 2
  };
  for (const o of e.values())
    Nu(i, xu(o)) > 0 && r.push(o);
  return r;
}
const Bu = 250;
function Lu(t, e, n, r) {
  let i = [], o = 1 / 0;
  const s = Hu(t, n, e + Bu);
  for (const a of s) {
    const c = [...a.internals.handleBounds?.source ?? [], ...a.internals.handleBounds?.target ?? []];
    for (const u of c) {
      if (r.nodeId === u.nodeId && r.type === u.type && r.id === u.id)
        continue;
      const { x: l, y: f } = Dt(a, u, u.position, !0), d = Math.sqrt(Math.pow(l - t.x, 2) + Math.pow(f - t.y, 2));
      d > e || (d < o ? (i = [{ ...u, x: l, y: f }], o = d) : d === o && i.push({ ...u, x: l, y: f }));
    }
  }
  if (!i.length)
    return null;
  if (i.length > 1) {
    const a = r.type === "source" ? "target" : "source";
    return i.find((c) => c.type === a) ?? i[0];
  }
  return i[0];
}
function ni(t, e, n, r, i, o = !1) {
  const s = r.get(t);
  if (!s)
    return null;
  const a = i === "strict" ? s.internals.handleBounds?.[e] : [...s.internals.handleBounds?.source ?? [], ...s.internals.handleBounds?.target ?? []], c = (n ? a?.find((u) => u.id === n) : a?.[0]) ?? null;
  return c && o ? { ...c, ...Dt(s, c, c.position, !0) } : c;
}
function ri(t, e) {
  return t || (e?.classList.contains("target") ? "target" : e?.classList.contains("source") ? "source" : null);
}
function Vu(t, e) {
  let n = null;
  return e ? n = !0 : t && !e && (n = !1), n;
}
const ii = () => !0;
function Xu(t, { connectionMode: e, connectionRadius: n, handleId: r, nodeId: i, edgeUpdaterType: o, isTarget: s, domNode: a, nodeLookup: c, lib: u, autoPanOnConnect: l, flowId: f, panBy: d, cancelConnection: m, onConnectStart: b, onConnect: E, onConnectEnd: M, isValidConnection: N = ii, onReconnectEnd: O, updateConnection: x, getTransform: p, getFromHandle: w, autoPanSpeed: v, dragThreshold: P = 1, handleDomNode: H }) {
  const z = Eu(t.target);
  let Z = 0, I;
  const { x: S, y: A } = yt(t), h = ri(o, H), y = a?.getBoundingClientRect();
  let g = !1;
  if (!y || !h)
    return;
  const _ = ni(i, h, r, c, e);
  if (!_)
    return;
  let $ = yt(t, y), T = !1, C = null, k = !1, D = null;
  function Y() {
    if (!l || !y)
      return;
    const [G, dt] = Ur($, y, v);
    d({ x: G, y: dt }), Z = requestAnimationFrame(Y);
  }
  const R = {
    ..._,
    nodeId: i,
    type: h,
    position: _.position
  }, W = c.get(i);
  let L = {
    inProgress: !0,
    isValid: null,
    from: Dt(W, R, B.Left, !0),
    fromHandle: R,
    fromPosition: R.position,
    fromNode: W,
    to: $,
    toHandle: null,
    toPosition: or[R.position],
    toNode: null,
    pointer: $
  };
  function V() {
    g = !0, x(L), b?.(t, { nodeId: i, handleId: r, handleType: h });
  }
  P === 0 && V();
  function J(G) {
    if (!g) {
      const { x: Ye, y: ci } = yt(G), kn = Ye - S, On = ci - A;
      if (!(kn * kn + On * On > P * P))
        return;
      V();
    }
    if (!w() || !R) {
      it(G);
      return;
    }
    const dt = p();
    $ = yt(G, y), I = Lu(Qr($, dt, !1, [1, 1]), n, c, R), T || (Y(), T = !0);
    const q = oi(G, {
      handle: I,
      connectionMode: e,
      fromNodeId: i,
      fromHandleId: r,
      fromType: s ? "target" : "source",
      isValidConnection: N,
      doc: z,
      lib: u,
      flowId: f,
      nodeLookup: c
    });
    D = q.handleDomNode, C = q.connection, k = Vu(!!I, q.isValid);
    const pt = c.get(i), We = pt ? Dt(pt, R, B.Left, !0) : L.from, se = {
      ...L,
      from: We,
      isValid: k,
      to: q.toHandle && k ? $u({ x: q.toHandle.x, y: q.toHandle.y }, dt) : $,
      toHandle: q.toHandle,
      toPosition: k && q.toHandle ? q.toHandle.position : or[R.position],
      toNode: q.toHandle ? c.get(q.toHandle.nodeId) : null,
      pointer: $
    };
    x(se), L = se;
  }
  function it(G) {
    if (!("touches" in G && G.touches.length > 0)) {
      if (g) {
        (I || D) && C && k && E?.(C);
        const { inProgress: dt, ...q } = L, pt = {
          ...q,
          toPosition: L.toHandle ? L.toPosition : null
        };
        M?.(G, pt), o && O?.(G, pt);
      }
      m(), cancelAnimationFrame(Z), T = !1, k = !1, C = null, D = null, z.removeEventListener("mousemove", J), z.removeEventListener("mouseup", it), z.removeEventListener("touchmove", J), z.removeEventListener("touchend", it);
    }
  }
  z.addEventListener("mousemove", J), z.addEventListener("mouseup", it), z.addEventListener("touchmove", J), z.addEventListener("touchend", it);
}
function oi(t, { handle: e, connectionMode: n, fromNodeId: r, fromHandleId: i, fromType: o, doc: s, lib: a, flowId: c, isValidConnection: u = ii, nodeLookup: l }) {
  const f = o === "target", d = e ? s.querySelector(`.${a}-flow__handle[data-id="${c}-${e?.nodeId}-${e?.id}-${e?.type}"]`) : null, { x: m, y: b } = yt(t), E = s.elementFromPoint(m, b), M = E?.classList.contains(`${a}-flow__handle`) ? E : d, N = {
    handleDomNode: M,
    isValid: !1,
    connection: null,
    toHandle: null
  };
  if (M) {
    const O = ri(void 0, M), x = M.getAttribute("data-nodeid"), p = M.getAttribute("data-handleid"), w = M.classList.contains("connectable"), v = M.classList.contains("connectableend");
    if (!x || !O)
      return N;
    const P = {
      source: f ? x : r,
      sourceHandle: f ? p : i,
      target: f ? r : x,
      targetHandle: f ? i : p
    };
    N.connection = P;
    const z = w && v && (n === Me.Strict ? f && O === "source" || !f && O === "target" : x !== r || p !== i);
    N.isValid = z && u(P), N.toHandle = ni(x, O, p, l, n, !0);
  }
  return N;
}
const Wu = {
  onPointerDown: Xu,
  isValid: oi
};
function Yu({ domNode: t, panZoom: e, getTransform: n, getViewScale: r }) {
  const i = rt(t);
  function o({ translateExtent: a, width: c, height: u, zoomStep: l = 1, pannable: f = !0, zoomable: d = !0, inversePan: m = !1 }) {
    const b = (x) => {
      if (x.sourceEvent.type !== "wheel" || !e)
        return;
      const p = n(), w = x.sourceEvent.ctrlKey && In() ? 10 : 1, v = -x.sourceEvent.deltaY * (x.sourceEvent.deltaMode === 1 ? 0.05 : x.sourceEvent.deltaMode ? 1 : 2e-3) * l, P = p[2] * Math.pow(2, v * w);
      e.scaleTo(P);
    };
    let E = [0, 0];
    const M = (x) => {
      (x.sourceEvent.type === "mousedown" || x.sourceEvent.type === "touchstart") && (E = [
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
      ], v = [w[0] - E[0], w[1] - E[1]];
      E = w;
      const P = r() * Math.max(p[2], Math.log(p[2])) * (m ? -1 : 1), H = {
        x: p[0] - v[0] * P,
        y: p[1] - v[1] * P
      }, z = [
        [0, 0],
        [c, u]
      ];
      e.setViewportConstrained({
        x: H.x,
        y: H.y,
        zoom: p[2]
      }, z, a);
    }, O = Yr().on("start", M).on("zoom", f ? N : null).on("zoom.wheel", d ? b : null);
    i.call(O, {});
  }
  function s() {
    i.on("zoom", null);
  }
  return {
    update: o,
    destroy: s,
    pointer: ot
  };
}
const Xe = (t) => ({
  x: t.x,
  y: t.y,
  zoom: t.k
}), rn = ({ x: t, y: e, zoom: n }) => Le.translate(t, e).scale(n), Ct = (t, e) => t.target.closest(`.${e}`), si = (t, e) => e === 2 && Array.isArray(t) && t.includes(2), qu = (t) => ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2, on = (t, e = 0, n = qu, r = () => {
}) => {
  const i = typeof e == "number" && e > 0;
  return i || r(), i ? t.transition().duration(e).ease(n).on("end", r) : t;
}, ai = (t) => {
  const e = t.ctrlKey && In() ? 10 : 1;
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * e;
};
function Fu({ zoomPanValues: t, noWheelClassName: e, d3Selection: n, d3Zoom: r, panOnScrollMode: i, panOnScrollSpeed: o, zoomOnPinch: s, onPanZoomStart: a, onPanZoom: c, onPanZoomEnd: u }) {
  return (l) => {
    if (Ct(l, e))
      return l.ctrlKey && l.preventDefault(), !1;
    l.preventDefault(), l.stopImmediatePropagation();
    const f = n.property("__zoom").k || 1;
    if (l.ctrlKey && s) {
      const M = ot(l), N = ai(l), O = f * Math.pow(2, N);
      r.scaleTo(n, O, M, l);
      return;
    }
    const d = l.deltaMode === 1 ? 20 : 1;
    let m = i === Mt.Vertical ? 0 : l.deltaX * d, b = i === Mt.Horizontal ? 0 : l.deltaY * d;
    !In() && l.shiftKey && i !== Mt.Vertical && (m = l.deltaY * d, b = 0), r.translateBy(
      n,
      -(m / f) * o,
      -(b / f) * o,
      // @ts-ignore
      { internal: !0 }
    );
    const E = Xe(n.property("__zoom"));
    clearTimeout(t.panScrollTimeout), t.isPanScrolling ? (c?.(l, E), t.panScrollTimeout = setTimeout(() => {
      u?.(l, E), t.isPanScrolling = !1;
    }, 150)) : (t.isPanScrolling = !0, a?.(l, E));
  };
}
function Zu({ noWheelClassName: t, preventScrolling: e, d3ZoomHandler: n }) {
  return function(r, i) {
    const o = r.type === "wheel", s = !e && o && !r.ctrlKey, a = Ct(r, t);
    if (r.ctrlKey && o && a && r.preventDefault(), s || a)
      return null;
    r.preventDefault(), n.call(this, r, i);
  };
}
function Uu({ zoomPanValues: t, onDraggingChange: e, onPanZoomStart: n }) {
  return (r) => {
    if (r.sourceEvent?.internal)
      return;
    const i = Xe(r.transform);
    t.mouseButton = r.sourceEvent?.button || 0, t.isZoomingOrPanning = !0, t.prevViewport = i, r.sourceEvent?.type, n && n?.(r.sourceEvent, i);
  };
}
function Gu({ zoomPanValues: t, panOnDrag: e, onPaneContextMenu: n, onTransformChange: r, onPanZoom: i }) {
  return (o) => {
    t.usedRightMouseButton = !!(n && si(e, t.mouseButton ?? 0)), o.sourceEvent?.sync || r([o.transform.x, o.transform.y, o.transform.k]), i && !o.sourceEvent?.internal && i?.(o.sourceEvent, Xe(o.transform));
  };
}
function Ku({ zoomPanValues: t, panOnDrag: e, panOnScroll: n, onDraggingChange: r, onPanZoomEnd: i, onPaneContextMenu: o }) {
  return (s) => {
    if (!s.sourceEvent?.internal && (t.isZoomingOrPanning = !1, o && si(e, t.mouseButton ?? 0) && !t.usedRightMouseButton && s.sourceEvent && o(s.sourceEvent), t.usedRightMouseButton = !1, i)) {
      const a = Xe(s.transform);
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
function Qu({ zoomActivationKeyPressed: t, zoomOnScroll: e, zoomOnPinch: n, panOnDrag: r, panOnScroll: i, zoomOnDoubleClick: o, userSelectionActive: s, noWheelClassName: a, noPanClassName: c, lib: u, connectionInProgress: l }) {
  return (f) => {
    const d = t || e, m = n && f.ctrlKey, b = f.type === "wheel";
    if (f.button === 1 && f.type === "mousedown" && (Ct(f, `${u}-flow__node`) || Ct(f, `${u}-flow__edge`)))
      return !0;
    if (!r && !d && !i && !o && !n || s || l && !b || Ct(f, a) && b || Ct(f, c) && (!b || i && b && !t) || !n && f.ctrlKey && b)
      return !1;
    if (!n && f.type === "touchstart" && f.touches?.length > 1)
      return f.preventDefault(), !1;
    if (!d && !i && !m && b || !r && (f.type === "mousedown" || f.type === "touchstart") || Array.isArray(r) && !r.includes(f.button) && f.type === "mousedown")
      return !1;
    const E = Array.isArray(r) && r.includes(f.button) || !f.button || f.button <= 1;
    return (!f.ctrlKey || b) && E;
  };
}
function Ju({ domNode: t, minZoom: e, maxZoom: n, translateExtent: r, viewport: i, onPanZoom: o, onPanZoomStart: s, onPanZoomEnd: a, onDraggingChange: c }) {
  const u = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: {},
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, l = t.getBoundingClientRect(), f = Yr().scaleExtent([e, n]).translateExtent(r), d = rt(t).call(f);
  O({
    x: i.x,
    y: i.y,
    zoom: Jt(i.zoom, e, n)
  }, [
    [0, 0],
    [l.width, l.height]
  ], r);
  const m = d.on("wheel.zoom"), b = d.on("dblclick.zoom");
  f.wheelDelta(ai);
  function E(I, S) {
    return d ? new Promise((A) => {
      f?.interpolate(S?.interpolate === "linear" ? Zt : we).transform(on(d, S?.duration, S?.ease, () => A(!0)), I);
    }) : Promise.resolve(!1);
  }
  function M({ noWheelClassName: I, noPanClassName: S, onPaneContextMenu: A, userSelectionActive: h, panOnScroll: y, panOnDrag: g, panOnScrollMode: _, panOnScrollSpeed: $, preventScrolling: T, zoomOnPinch: C, zoomOnScroll: k, zoomOnDoubleClick: D, zoomActivationKeyPressed: Y, lib: R, onTransformChange: W, connectionInProgress: Q, paneClickDistance: L, selectionOnDrag: V }) {
    h && !u.isZoomingOrPanning && N();
    const J = y && !Y && !h;
    f.clickDistance(V ? 1 / 0 : !wn(L) || L < 0 ? 0 : L);
    const it = J ? Fu({
      zoomPanValues: u,
      noWheelClassName: I,
      d3Selection: d,
      d3Zoom: f,
      panOnScrollMode: _,
      panOnScrollSpeed: $,
      zoomOnPinch: C,
      onPanZoomStart: s,
      onPanZoom: o,
      onPanZoomEnd: a
    }) : Zu({
      noWheelClassName: I,
      preventScrolling: T,
      d3ZoomHandler: m
    });
    if (d.on("wheel.zoom", it, { passive: !1 }), !h) {
      const dt = Uu({
        zoomPanValues: u,
        onDraggingChange: c,
        onPanZoomStart: s
      });
      f.on("start", dt);
      const q = Gu({
        zoomPanValues: u,
        panOnDrag: g,
        onPaneContextMenu: !!A,
        onPanZoom: o,
        onTransformChange: W
      });
      f.on("zoom", q);
      const pt = Ku({
        zoomPanValues: u,
        panOnDrag: g,
        panOnScroll: y,
        onPaneContextMenu: A,
        onPanZoomEnd: a,
        onDraggingChange: c
      });
      f.on("end", pt);
    }
    const G = Qu({
      zoomActivationKeyPressed: Y,
      panOnDrag: g,
      zoomOnScroll: k,
      panOnScroll: y,
      zoomOnDoubleClick: D,
      zoomOnPinch: C,
      userSelectionActive: h,
      noPanClassName: S,
      noWheelClassName: I,
      lib: R,
      connectionInProgress: Q
    });
    f.filter(G), D ? d.on("dblclick.zoom", b) : d.on("dblclick.zoom", null);
  }
  function N() {
    f.on("zoom", null);
  }
  async function O(I, S, A) {
    const h = rn(I), y = f?.constrain()(h, S, A);
    return y && await E(y), new Promise((g) => g(y));
  }
  async function x(I, S) {
    const A = rn(I);
    return await E(A, S), new Promise((h) => h(A));
  }
  function p(I) {
    if (d) {
      const S = rn(I), A = d.property("__zoom");
      (A.k !== I.zoom || A.x !== I.x || A.y !== I.y) && f?.transform(d, S, null, { sync: !0 });
    }
  }
  function w() {
    const I = d ? Wr(d.node()) : { x: 0, y: 0, k: 1 };
    return { x: I.x, y: I.y, zoom: I.k };
  }
  function v(I, S) {
    return d ? new Promise((A) => {
      f?.interpolate(S?.interpolate === "linear" ? Zt : we).scaleTo(on(d, S?.duration, S?.ease, () => A(!0)), I);
    }) : Promise.resolve(!1);
  }
  function P(I, S) {
    return d ? new Promise((A) => {
      f?.interpolate(S?.interpolate === "linear" ? Zt : we).scaleBy(on(d, S?.duration, S?.ease, () => A(!0)), I);
    }) : Promise.resolve(!1);
  }
  function H(I) {
    f?.scaleExtent(I);
  }
  function z(I) {
    f?.translateExtent(I);
  }
  function Z(I) {
    const S = !wn(I) || I < 0 ? 0 : I;
    f?.clickDistance(S);
  }
  return {
    update: M,
    destroy: N,
    setViewport: x,
    setViewportConstrained: O,
    getViewport: w,
    scaleTo: v,
    scaleBy: P,
    setScaleExtent: H,
    setTranslateExtent: z,
    syncViewport: p,
    setClickDistance: Z
  };
}
var cr;
(function(t) {
  t.Line = "line", t.Handle = "handle";
})(cr || (cr = {}));
function ju() {
  return {
    nodes: ce([]),
    edges: ce([]),
    nodeLookup: /* @__PURE__ */ new Map(),
    parentLookup: /* @__PURE__ */ new Map(),
    nodeExtent: qr,
    snapGrid: [15, 15],
    snapToGrid: !1,
    nodeOrigin: [0, 0],
    multiSelectionActive: !1,
    transform: ce([0, 0, 1]),
    autoPanOnNodeDrag: !0,
    nodesDraggable: !0,
    selectNodesOnDrag: !0,
    nodeDragThreshold: 0,
    panZoom: null,
    domNode: null,
    connectionInProgress: ce(null)
  };
}
var tc = Object.defineProperty, ec = Object.getOwnPropertyDescriptor, Vt = (t, e, n, r) => {
  for (var i = r > 1 ? void 0 : r ? ec(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (r ? s(e, n, i) : s(i)) || i);
  return r && i && tc(e, n, i), i;
};
let Et = class extends ee(Ht) {
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
var nc = Object.defineProperty, rc = Object.getOwnPropertyDescriptor, _t = (t, e, n, r) => {
  for (var i = r > 1 ? void 0 : r ? rc(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (r ? s(e, n, i) : s(i)) || i);
  return r && i && nc(e, n, i), i;
};
let lt = class extends ee(Ht) {
  constructor() {
    super(...arguments), this.sourceX = 0, this.sourceY = 0, this.targetX = 0, this.targetY = 0, this.sourcePosition = B.Right, this.targetPosition = B.Left, this.selected = !1;
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
    return be`
      <path d="${t}" />
    `;
  }
};
lt.styles = ke`
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
_t([
  X({ type: Number })
], lt.prototype, "sourceX", 2);
_t([
  X({ type: Number })
], lt.prototype, "sourceY", 2);
_t([
  X({ type: Number })
], lt.prototype, "targetX", 2);
_t([
  X({ type: Number })
], lt.prototype, "targetY", 2);
_t([
  X({ type: String })
], lt.prototype, "sourcePosition", 2);
_t([
  X({ type: String })
], lt.prototype, "targetPosition", 2);
_t([
  X({ type: Boolean, reflect: !0 })
], lt.prototype, "selected", 2);
lt = _t([
  Bt("lit-edge")
], lt);
var ic = Object.defineProperty, oc = Object.getOwnPropertyDescriptor, nt = (t, e, n, r) => {
  for (var i = r > 1 ? void 0 : r ? oc(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (r ? s(e, n, i) : s(i)) || i);
  return r && i && ic(e, n, i), i;
};
let j = class extends ee(Ht) {
  constructor() {
    super(...arguments), this._drags = /* @__PURE__ */ new Map(), this._state = ju(), this.nodeTypes = {
      default: "lit-node",
      input: "lit-node",
      output: "lit-node"
    }, this.showControls = !1, this.showMinimap = !1, this._width = 0, this._height = 0, this.viewport = { x: 0, y: 0, zoom: 1 };
  }
  set nodes(t) {
    this._state.nodes.set(t), Au(t, this._state.nodeLookup, this._state.parentLookup, {
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
      const a = e.querySelectorAll("lit-handle");
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
        }, console.log(`Node ${t} handleBounds:`, n.internals.handleBounds);
      }
      Pu(this._state.nodeLookup, this._state.parentLookup, {
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
    }, this._panZoom = Ju({
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
      panOnScrollMode: Mt.Free,
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
        const r = Ru({
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
    const o = Dt(e, r, r.position, !0), s = Dt(n, i, i.position, !0), [a] = _n({
      sourceX: o.x,
      sourceY: o.y,
      sourcePosition: r.position,
      targetX: s.x,
      targetY: s.y,
      targetPosition: i.position
    });
    return be`
      <path
        d="${a}"
        fill="none"
        stroke="${t.selected ? "#555" : "#b1b1b7"}"
        stroke-width="2"
      />
    `;
  }
  _onHandlePointerDown(t) {
    const { event: e, handleId: n, nodeId: r, type: i, handleDomNode: o } = t.detail, s = i === "target";
    if (this._state.connectionInProgress.get())
      return;
    const a = o.getBoundingClientRect(), c = o.parentElement?.getBoundingClientRect(), u = this._state.transform.get()[2], l = {
      id: n,
      nodeId: r,
      type: i,
      position: o.position,
      x: (a.left - (c?.left ?? 0)) / u,
      y: (a.top - (c?.top ?? 0)) / u,
      width: a.width / u,
      height: a.height / u
    };
    Wu.onPointerDown(e, {
      handleId: n,
      nodeId: r,
      isTarget: s,
      domNode: this._renderer,
      handleDomNode: o,
      nodeLookup: this._state.nodeLookup,
      connectionMode: Me.Strict,
      lib: "lit",
      autoPanOnConnect: !0,
      flowId: "lit-flow",
      dragThreshold: 0,
      panBy: async (f) => {
        const d = this._panZoom?.getViewport();
        return d ? (await this._panZoom?.setViewport({
          x: d.x + f.x,
          y: d.y + f.y,
          zoom: d.zoom
        }), !0) : !1;
      },
      getTransform: () => this._state.transform.get(),
      getFromHandle: () => l,
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
        const d = `e-${f.source}${f.sourceHandle || ""}-${f.target}${f.targetHandle || ""}`;
        this.edges = [...this.edges, { ...f, id: d }];
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
    return be`
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
    return ae`
      <div class="xyflow__renderer">
        <div
          class="xyflow__viewport"
          style="transform: translate(${t[0]}px, ${t[1]}px) scale(${t[2]})"
        >
          <svg class="xyflow__edges">
            ${this.edges.map((n) => this._renderEdge(n))}
            ${this._renderConnectionLine(e)}
          </svg>
          <div class="xyflow__nodes" @handle-pointer-down="${this._onHandlePointerDown}">
            ${this.nodes.map((n) => {
      const i = this._state.nodeLookup.get(n.id)?.position || n.position, o = this.nodeTypes[n.type || "default"] || this.nodeTypes.default, s = li(o);
      return ae`
                <${s}
                  class="xyflow__node"
                  data-id="${n.id}"
                  .nodeId="${n.id}"
                  style="transform: translate(${i.x}px, ${i.y}px)"
                  .data="${n.data}"
                  .label="${n.data.label}"
                  .type="${n.type || "default"}"
                  ?selected="${n.selected}"
                >
                </${s}>
              `;
    })}
          </div>
        </div>
      </div>
      ${this.showControls ? ae`<lit-controls .panZoom="${this._panZoom}"></lit-controls>` : ""}
      ${this.showMinimap ? ae`
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
j.styles = ke`
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
nt([
  lr(".xyflow__renderer")
], j.prototype, "_renderer", 2);
nt([
  lr(".xyflow__viewport")
], j.prototype, "_viewport", 2);
nt([
  te()
], j.prototype, "_panZoom", 2);
nt([
  te()
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
  te()
], j.prototype, "_width", 2);
nt([
  te()
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
var sc = Object.defineProperty, ac = Object.getOwnPropertyDescriptor, oe = (t, e, n, r) => {
  for (var i = r > 1 ? void 0 : r ? ac(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (r ? s(e, n, i) : s(i)) || i);
  return r && i && sc(e, n, i), i;
};
let Rt = class extends Ht {
  constructor() {
    super(), this.type = "source", this.position = B.Top, this.addEventListener("mousedown", (t) => this._onPointerDown(t)), this.addEventListener("touchstart", (t) => this._onPointerDown(t));
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
oe([
  X({ type: String, reflect: !0 })
], Rt.prototype, "type", 2);
oe([
  X({ type: String, reflect: !0, attribute: "data-handlepos" })
], Rt.prototype, "position", 2);
oe([
  X({ type: String, reflect: !0, attribute: "data-handleid" })
], Rt.prototype, "handleId", 2);
oe([
  X({ type: String, reflect: !0, attribute: "data-nodeid" })
], Rt.prototype, "nodeId", 2);
Rt = oe([
  Bt("lit-handle")
], Rt);
var uc = Object.defineProperty, cc = Object.getOwnPropertyDescriptor, ui = (t, e, n, r) => {
  for (var i = r > 1 ? void 0 : r ? cc(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (r ? s(e, n, i) : s(i)) || i);
  return r && i && uc(e, n, i), i;
};
let Ae = class extends ee(Ht) {
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
Ae.styles = ke`
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
ui([
  X({ type: Object })
], Ae.prototype, "panZoom", 2);
Ae = ui([
  Bt("lit-controls")
], Ae);
var lc = Object.defineProperty, fc = Object.getOwnPropertyDescriptor, xt = (t, e, n, r) => {
  for (var i = r > 1 ? void 0 : r ? fc(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (r ? s(e, n, i) : s(i)) || i);
  return r && i && lc(e, n, i), i;
};
let ft = class extends ee(Ht) {
  constructor() {
    super(...arguments), this.nodeLookup = /* @__PURE__ */ new Map(), this.transform = [0, 0, 1], this.translateExtent = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], this.width = 0, this.height = 0;
  }
  updated(t) {
    if (!this._minimapInstance && this.panZoom) {
      const e = this.shadowRoot?.querySelector("svg");
      e && (this._minimapInstance = Yu({
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
    return this.nodeLookup.size > 0 ? bu(Zr(this.nodeLookup), t) : t;
  }
  render() {
    const t = this._getBoundingRect(), e = {
      x: -this.transform[0] / this.transform[2],
      y: -this.transform[1] / this.transform[2],
      width: this.width / this.transform[2],
      height: this.height / this.transform[2]
    }, n = 200, r = 150, i = t.width / n, o = t.height / r, s = Math.max(i, o), a = s * n, c = s * r, u = 5 * s, l = t.x - (a - t.width) / 2 - u, f = t.y - (c - t.height) / 2 - u, d = a + u * 2, m = c + u * 2;
    return Tt`
      <svg
        width="${n}"
        height="${r}"
        viewBox="${l} ${f} ${d} ${m}"
      >
        ${Array.from(this.nodeLookup.values()).map((b) => {
      const { x: E, y: M } = b.internals.positionAbsolute, N = b.measured.width || 0, O = b.measured.height || 0;
      return be`
            <rect
              class="minimap-node"
              x="${E}"
              y="${M}"
              width="${N}"
              height="${O}"
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
ft.styles = ke`
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
xt([
  X({ type: Object })
], ft.prototype, "panZoom", 2);
xt([
  X({ type: Object })
], ft.prototype, "nodeLookup", 2);
xt([
  X({ type: Array })
], ft.prototype, "transform", 2);
xt([
  X({ type: Array })
], ft.prototype, "translateExtent", 2);
xt([
  X({ type: Number })
], ft.prototype, "width", 2);
xt([
  X({ type: Number })
], ft.prototype, "height", 2);
xt([
  te()
], ft.prototype, "_minimapInstance", 2);
ft = xt([
  Bt("lit-minimap")
], ft);
