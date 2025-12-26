import { css as ke, LitElement as ze, html as qt, svg as ir } from "lit";
import { property as U, customElement as Ie, query as yn, state as or } from "lit/decorators.js";
var sr = { value: () => {
} };
function ie() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new Vt(n);
}
function Vt(t) {
  this._ = t;
}
function ar(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
Vt.prototype = ie.prototype = {
  constructor: Vt,
  on: function(t, e) {
    var n = this._, r = ar(t + "", n), i, o = -1, s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; ) if ((i = (t = r[o]).type) && (i = ur(n[i], t.name))) return i;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++o < s; )
      if (i = (t = r[o]).type) n[i] = Ve(n[i], t.name, e);
      else if (e == null) for (i in n) n[i] = Ve(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new Vt(t);
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
function ur(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function Ve(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = sr, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var be = "http://www.w3.org/1999/xhtml";
const Le = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: be,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function oe(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), Le.hasOwnProperty(e) ? { space: Le[e], local: t } : t;
}
function lr(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === be && e.documentElement.namespaceURI === be ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function cr(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function xn(t) {
  var e = oe(t);
  return (e.local ? cr : lr)(e);
}
function fr() {
}
function Ce(t) {
  return t == null ? fr : function() {
    return this.querySelector(t);
  };
}
function hr(t) {
  typeof t != "function" && (t = Ce(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], s = o.length, a = r[i] = new Array(s), c, u, l = 0; l < s; ++l)
      (c = o[l]) && (u = t.call(c, c.__data__, l, o)) && ("__data__" in c && (u.__data__ = c.__data__), a[l] = u);
  return new G(r, this._parents);
}
function dr(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function pr() {
  return [];
}
function _n(t) {
  return t == null ? pr : function() {
    return this.querySelectorAll(t);
  };
}
function gr(t) {
  return function() {
    return dr(t.apply(this, arguments));
  };
}
function mr(t) {
  typeof t == "function" ? t = gr(t) : t = _n(t);
  for (var e = this._groups, n = e.length, r = [], i = [], o = 0; o < n; ++o)
    for (var s = e[o], a = s.length, c, u = 0; u < a; ++u)
      (c = s[u]) && (r.push(t.call(c, c.__data__, u, s)), i.push(c));
  return new G(r, i);
}
function wn(t) {
  return function() {
    return this.matches(t);
  };
}
function vn(t) {
  return function(e) {
    return e.matches(t);
  };
}
var yr = Array.prototype.find;
function xr(t) {
  return function() {
    return yr.call(this.children, t);
  };
}
function _r() {
  return this.firstElementChild;
}
function wr(t) {
  return this.select(t == null ? _r : xr(typeof t == "function" ? t : vn(t)));
}
var vr = Array.prototype.filter;
function br() {
  return Array.from(this.children);
}
function Nr(t) {
  return function() {
    return vr.call(this.children, t);
  };
}
function Er(t) {
  return this.selectAll(t == null ? br : Nr(typeof t == "function" ? t : vn(t)));
}
function Tr(t) {
  typeof t != "function" && (t = wn(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], s = o.length, a = r[i] = [], c, u = 0; u < s; ++u)
      (c = o[u]) && t.call(c, c.__data__, u, o) && a.push(c);
  return new G(r, this._parents);
}
function bn(t) {
  return new Array(t.length);
}
function Ar() {
  return new G(this._enter || this._groups.map(bn), this._parents);
}
function Kt(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
Kt.prototype = {
  constructor: Kt,
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
function $r(t) {
  return function() {
    return t;
  };
}
function Mr(t, e, n, r, i, o) {
  for (var s = 0, a, c = e.length, u = o.length; s < u; ++s)
    (a = e[s]) ? (a.__data__ = o[s], r[s] = a) : n[s] = new Kt(t, o[s]);
  for (; s < c; ++s)
    (a = e[s]) && (i[s] = a);
}
function Pr(t, e, n, r, i, o, s) {
  var a, c, u = /* @__PURE__ */ new Map(), l = e.length, h = o.length, d = new Array(l), m;
  for (a = 0; a < l; ++a)
    (c = e[a]) && (d[a] = m = s.call(c, c.__data__, a, e) + "", u.has(m) ? i[a] = c : u.set(m, c));
  for (a = 0; a < h; ++a)
    m = s.call(t, o[a], a, o) + "", (c = u.get(m)) ? (r[a] = c, c.__data__ = o[a], u.delete(m)) : n[a] = new Kt(t, o[a]);
  for (a = 0; a < l; ++a)
    (c = e[a]) && u.get(d[a]) === c && (i[a] = c);
}
function Sr(t) {
  return t.__data__;
}
function kr(t, e) {
  if (!arguments.length) return Array.from(this, Sr);
  var n = e ? Pr : Mr, r = this._parents, i = this._groups;
  typeof t != "function" && (t = $r(t));
  for (var o = i.length, s = new Array(o), a = new Array(o), c = new Array(o), u = 0; u < o; ++u) {
    var l = r[u], h = i[u], d = h.length, m = zr(t.call(l, l && l.__data__, u, r)), w = m.length, A = a[u] = new Array(w), I = s[u] = new Array(w), b = c[u] = new Array(d);
    n(l, h, A, I, b, m, e);
    for (var R = 0, X = 0, y, P; R < w; ++R)
      if (y = A[R]) {
        for (R >= X && (X = R + 1); !(P = I[X]) && ++X < w; ) ;
        y._next = P || null;
      }
  }
  return s = new G(s, r), s._enter = a, s._exit = c, s;
}
function zr(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Ir() {
  return new G(this._exit || this._groups.map(bn), this._parents);
}
function Cr(t, e, n) {
  var r = this.enter(), i = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? o.remove() : n(o), r && i ? r.merge(i).order() : i;
}
function Dr(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, o = r.length, s = Math.min(i, o), a = new Array(i), c = 0; c < s; ++c)
    for (var u = n[c], l = r[c], h = u.length, d = a[c] = new Array(h), m, w = 0; w < h; ++w)
      (m = u[w] || l[w]) && (d[w] = m);
  for (; c < i; ++c)
    a[c] = n[c];
  return new G(a, this._parents);
}
function Rr() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) && (o && s.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(s, o), o = s);
  return this;
}
function Or(t) {
  t || (t = Xr);
  function e(h, d) {
    return h && d ? t(h.__data__, d.__data__) : !h - !d;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), o = 0; o < r; ++o) {
    for (var s = n[o], a = s.length, c = i[o] = new Array(a), u, l = 0; l < a; ++l)
      (u = s[l]) && (c[l] = u);
    c.sort(e);
  }
  return new G(i, this._parents).order();
}
function Xr(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Br() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Yr() {
  return Array.from(this);
}
function Hr() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s) return s;
    }
  return null;
}
function Fr() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function qr() {
  return !this.node();
}
function Vr(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], o = 0, s = i.length, a; o < s; ++o)
      (a = i[o]) && t.call(a, a.__data__, o, i);
  return this;
}
function Lr(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Zr(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Gr(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Ur(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function Wr(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function Kr(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function Qr(t, e) {
  var n = oe(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? Zr : Lr : typeof e == "function" ? n.local ? Kr : Wr : n.local ? Ur : Gr)(n, e));
}
function Nn(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Jr(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function jr(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function ti(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function ei(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? Jr : typeof e == "function" ? ti : jr)(t, e, n ?? "")) : _t(this.node(), t);
}
function _t(t, e) {
  return t.style.getPropertyValue(e) || Nn(t).getComputedStyle(t, null).getPropertyValue(e);
}
function ni(t) {
  return function() {
    delete this[t];
  };
}
function ri(t, e) {
  return function() {
    this[t] = e;
  };
}
function ii(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function oi(t, e) {
  return arguments.length > 1 ? this.each((e == null ? ni : typeof e == "function" ? ii : ri)(t, e)) : this.node()[t];
}
function En(t) {
  return t.trim().split(/^|\s+/);
}
function De(t) {
  return t.classList || new Tn(t);
}
function Tn(t) {
  this._node = t, this._names = En(t.getAttribute("class") || "");
}
Tn.prototype = {
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
function An(t, e) {
  for (var n = De(t), r = -1, i = e.length; ++r < i; ) n.add(e[r]);
}
function $n(t, e) {
  for (var n = De(t), r = -1, i = e.length; ++r < i; ) n.remove(e[r]);
}
function si(t) {
  return function() {
    An(this, t);
  };
}
function ai(t) {
  return function() {
    $n(this, t);
  };
}
function ui(t, e) {
  return function() {
    (e.apply(this, arguments) ? An : $n)(this, t);
  };
}
function li(t, e) {
  var n = En(t + "");
  if (arguments.length < 2) {
    for (var r = De(this.node()), i = -1, o = n.length; ++i < o; ) if (!r.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? ui : e ? si : ai)(n, e));
}
function ci() {
  this.textContent = "";
}
function fi(t) {
  return function() {
    this.textContent = t;
  };
}
function hi(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function di(t) {
  return arguments.length ? this.each(t == null ? ci : (typeof t == "function" ? hi : fi)(t)) : this.node().textContent;
}
function pi() {
  this.innerHTML = "";
}
function gi(t) {
  return function() {
    this.innerHTML = t;
  };
}
function mi(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function yi(t) {
  return arguments.length ? this.each(t == null ? pi : (typeof t == "function" ? mi : gi)(t)) : this.node().innerHTML;
}
function xi() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function _i() {
  return this.each(xi);
}
function wi() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function vi() {
  return this.each(wi);
}
function bi(t) {
  var e = typeof t == "function" ? t : xn(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Ni() {
  return null;
}
function Ei(t, e) {
  var n = typeof t == "function" ? t : xn(t), r = e == null ? Ni : typeof e == "function" ? e : Ce(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function Ti() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Ai() {
  return this.each(Ti);
}
function $i() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Mi() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Pi(t) {
  return this.select(t ? Mi : $i);
}
function Si(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function ki(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function zi(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function Ii(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, o; n < i; ++n)
        o = e[n], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : e[++r] = o;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function Ci(t, e, n) {
  return function() {
    var r = this.__on, i, o = ki(e);
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
function Di(t, e, n) {
  var r = zi(t + ""), i, o = r.length, s;
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
  for (a = e ? Ci : Ii, i = 0; i < o; ++i) this.each(a(r[i], e, n));
  return this;
}
function Mn(t, e, n) {
  var r = Nn(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function Ri(t, e) {
  return function() {
    return Mn(this, t, e);
  };
}
function Oi(t, e) {
  return function() {
    return Mn(this, t, e.apply(this, arguments));
  };
}
function Xi(t, e) {
  return this.each((typeof e == "function" ? Oi : Ri)(t, e));
}
function* Bi() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var Pn = [null];
function G(t, e) {
  this._groups = t, this._parents = e;
}
function Dt() {
  return new G([[document.documentElement]], Pn);
}
function Yi() {
  return this;
}
G.prototype = Dt.prototype = {
  constructor: G,
  select: hr,
  selectAll: mr,
  selectChild: wr,
  selectChildren: Er,
  filter: Tr,
  data: kr,
  enter: Ar,
  exit: Ir,
  join: Cr,
  merge: Dr,
  selection: Yi,
  order: Rr,
  sort: Or,
  call: Br,
  nodes: Yr,
  node: Hr,
  size: Fr,
  empty: qr,
  each: Vr,
  attr: Qr,
  style: ei,
  property: oi,
  classed: li,
  text: di,
  html: yi,
  raise: _i,
  lower: vi,
  append: bi,
  insert: Ei,
  remove: Ai,
  clone: Pi,
  datum: Si,
  on: Di,
  dispatch: Xi,
  [Symbol.iterator]: Bi
};
function K(t) {
  return typeof t == "string" ? new G([[document.querySelector(t)]], [document.documentElement]) : new G([[t]], Pn);
}
function Hi(t) {
  let e;
  for (; e = t.sourceEvent; ) t = e;
  return t;
}
function j(t, e) {
  if (t = Hi(t), e === void 0 && (e = t.currentTarget), e) {
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
const Fi = { passive: !1 }, Mt = { capture: !0, passive: !1 };
function pe(t) {
  t.stopImmediatePropagation();
}
function mt(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Sn(t) {
  var e = t.document.documentElement, n = K(t).on("dragstart.drag", mt, Mt);
  "onselectstart" in e ? n.on("selectstart.drag", mt, Mt) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function kn(t, e) {
  var n = t.document.documentElement, r = K(t).on("dragstart.drag", null);
  e && (r.on("click.drag", mt, Mt), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const Ot = (t) => () => t;
function Ne(t, {
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
Ne.prototype.on = function() {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function qi(t) {
  return !t.ctrlKey && !t.button;
}
function Vi() {
  return this.parentNode;
}
function Li(t, e) {
  return e ?? { x: t.x, y: t.y };
}
function Zi() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Gi() {
  var t = qi, e = Vi, n = Li, r = Zi, i = {}, o = ie("start", "drag", "end"), s = 0, a, c, u, l, h = 0;
  function d(y) {
    y.on("mousedown.drag", m).filter(r).on("touchstart.drag", I).on("touchmove.drag", b, Fi).on("touchend.drag touchcancel.drag", R).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function m(y, P) {
    if (!(l || !t.call(this, y, P))) {
      var T = X(this, e.call(this, y, P), y, P, "mouse");
      T && (K(y.view).on("mousemove.drag", w, Mt).on("mouseup.drag", A, Mt), Sn(y.view), pe(y), u = !1, a = y.clientX, c = y.clientY, T("start", y));
    }
  }
  function w(y) {
    if (mt(y), !u) {
      var P = y.clientX - a, T = y.clientY - c;
      u = P * P + T * T > h;
    }
    i.mouse("drag", y);
  }
  function A(y) {
    K(y.view).on("mousemove.drag mouseup.drag", null), kn(y.view, u), mt(y), i.mouse("end", y);
  }
  function I(y, P) {
    if (t.call(this, y, P)) {
      var T = y.changedTouches, z = e.call(this, y, P), B = T.length, q, V;
      for (q = 0; q < B; ++q)
        (V = X(this, z, y, P, T[q].identifier, T[q])) && (pe(y), V("start", y, T[q]));
    }
  }
  function b(y) {
    var P = y.changedTouches, T = P.length, z, B;
    for (z = 0; z < T; ++z)
      (B = i[P[z].identifier]) && (mt(y), B("drag", y, P[z]));
  }
  function R(y) {
    var P = y.changedTouches, T = P.length, z, B;
    for (l && clearTimeout(l), l = setTimeout(function() {
      l = null;
    }, 500), z = 0; z < T; ++z)
      (B = i[P[z].identifier]) && (pe(y), B("end", y, P[z]));
  }
  function X(y, P, T, z, B, q) {
    var V = o.copy(), $ = j(q || T, P), _, M, f;
    if ((f = n.call(y, new Ne("beforestart", {
      sourceEvent: T,
      target: d,
      identifier: B,
      active: s,
      x: $[0],
      y: $[1],
      dx: 0,
      dy: 0,
      dispatch: V
    }), z)) != null)
      return _ = f.x - $[0] || 0, M = f.y - $[1] || 0, function g(p, x, v) {
        var N = $, E;
        switch (p) {
          case "start":
            i[B] = g, E = s++;
            break;
          case "end":
            delete i[B], --s;
          // falls through
          case "drag":
            $ = j(v || x, P), E = s;
            break;
        }
        V.call(
          p,
          y,
          new Ne(p, {
            sourceEvent: x,
            subject: f,
            target: d,
            identifier: B,
            active: E,
            x: $[0] + _,
            y: $[1] + M,
            dx: $[0] - N[0],
            dy: $[1] - N[1],
            dispatch: V
          }),
          z
        );
      };
  }
  return d.filter = function(y) {
    return arguments.length ? (t = typeof y == "function" ? y : Ot(!!y), d) : t;
  }, d.container = function(y) {
    return arguments.length ? (e = typeof y == "function" ? y : Ot(y), d) : e;
  }, d.subject = function(y) {
    return arguments.length ? (n = typeof y == "function" ? y : Ot(y), d) : n;
  }, d.touchable = function(y) {
    return arguments.length ? (r = typeof y == "function" ? y : Ot(!!y), d) : r;
  }, d.on = function() {
    var y = o.on.apply(o, arguments);
    return y === o ? d : y;
  }, d.clickDistance = function(y) {
    return arguments.length ? (h = (y = +y) * y, d) : Math.sqrt(h);
  }, d;
}
function Re(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function zn(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e) n[r] = e[r];
  return n;
}
function Rt() {
}
var Pt = 0.7, Qt = 1 / Pt, yt = "\\s*([+-]?\\d+)\\s*", St = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", et = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Ui = /^#([0-9a-f]{3,8})$/, Wi = new RegExp(`^rgb\\(${yt},${yt},${yt}\\)$`), Ki = new RegExp(`^rgb\\(${et},${et},${et}\\)$`), Qi = new RegExp(`^rgba\\(${yt},${yt},${yt},${St}\\)$`), Ji = new RegExp(`^rgba\\(${et},${et},${et},${St}\\)$`), ji = new RegExp(`^hsl\\(${St},${et},${et}\\)$`), to = new RegExp(`^hsla\\(${St},${et},${et},${St}\\)$`), Ze = {
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
Re(Rt, ft, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Ge,
  // Deprecated! Use color.formatHex.
  formatHex: Ge,
  formatHex8: eo,
  formatHsl: no,
  formatRgb: Ue,
  toString: Ue
});
function Ge() {
  return this.rgb().formatHex();
}
function eo() {
  return this.rgb().formatHex8();
}
function no() {
  return In(this).formatHsl();
}
function Ue() {
  return this.rgb().formatRgb();
}
function ft(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = Ui.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? We(e) : n === 3 ? new Z(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? Xt(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? Xt(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = Wi.exec(t)) ? new Z(e[1], e[2], e[3], 1) : (e = Ki.exec(t)) ? new Z(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = Qi.exec(t)) ? Xt(e[1], e[2], e[3], e[4]) : (e = Ji.exec(t)) ? Xt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = ji.exec(t)) ? Je(e[1], e[2] / 100, e[3] / 100, 1) : (e = to.exec(t)) ? Je(e[1], e[2] / 100, e[3] / 100, e[4]) : Ze.hasOwnProperty(t) ? We(Ze[t]) : t === "transparent" ? new Z(NaN, NaN, NaN, 0) : null;
}
function We(t) {
  return new Z(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Xt(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new Z(t, e, n, r);
}
function ro(t) {
  return t instanceof Rt || (t = ft(t)), t ? (t = t.rgb(), new Z(t.r, t.g, t.b, t.opacity)) : new Z();
}
function Ee(t, e, n, r) {
  return arguments.length === 1 ? ro(t) : new Z(t, e, n, r ?? 1);
}
function Z(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
Re(Z, Ee, zn(Rt, {
  brighter(t) {
    return t = t == null ? Qt : Math.pow(Qt, t), new Z(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Pt : Math.pow(Pt, t), new Z(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Z(ct(this.r), ct(this.g), ct(this.b), Jt(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Ke,
  // Deprecated! Use color.formatHex.
  formatHex: Ke,
  formatHex8: io,
  formatRgb: Qe,
  toString: Qe
}));
function Ke() {
  return `#${lt(this.r)}${lt(this.g)}${lt(this.b)}`;
}
function io() {
  return `#${lt(this.r)}${lt(this.g)}${lt(this.b)}${lt((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Qe() {
  const t = Jt(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${ct(this.r)}, ${ct(this.g)}, ${ct(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Jt(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function ct(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function lt(t) {
  return t = ct(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Je(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new Q(t, e, n, r);
}
function In(t) {
  if (t instanceof Q) return new Q(t.h, t.s, t.l, t.opacity);
  if (t instanceof Rt || (t = ft(t)), !t) return new Q();
  if (t instanceof Q) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), o = Math.max(e, n, r), s = NaN, a = o - i, c = (o + i) / 2;
  return a ? (e === o ? s = (n - r) / a + (n < r) * 6 : n === o ? s = (r - e) / a + 2 : s = (e - n) / a + 4, a /= c < 0.5 ? o + i : 2 - o - i, s *= 60) : a = c > 0 && c < 1 ? 0 : s, new Q(s, a, c, t.opacity);
}
function oo(t, e, n, r) {
  return arguments.length === 1 ? In(t) : new Q(t, e, n, r ?? 1);
}
function Q(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
Re(Q, oo, zn(Rt, {
  brighter(t) {
    return t = t == null ? Qt : Math.pow(Qt, t), new Q(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Pt : Math.pow(Pt, t), new Q(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new Z(
      ge(t >= 240 ? t - 240 : t + 120, i, r),
      ge(t, i, r),
      ge(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new Q(je(this.h), Bt(this.s), Bt(this.l), Jt(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Jt(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${je(this.h)}, ${Bt(this.s) * 100}%, ${Bt(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function je(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function Bt(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function ge(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const Oe = (t) => () => t;
function so(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function ao(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function uo(t) {
  return (t = +t) == 1 ? Cn : function(e, n) {
    return n - e ? ao(e, n, t) : Oe(isNaN(e) ? n : e);
  };
}
function Cn(t, e) {
  var n = e - t;
  return n ? so(t, n) : Oe(isNaN(t) ? e : t);
}
const jt = (function t(e) {
  var n = uo(e);
  function r(i, o) {
    var s = n((i = Ee(i)).r, (o = Ee(o)).r), a = n(i.g, o.g), c = n(i.b, o.b), u = Cn(i.opacity, o.opacity);
    return function(l) {
      return i.r = s(l), i.g = a(l), i.b = c(l), i.opacity = u(l), i + "";
    };
  }
  return r.gamma = t, r;
})(1);
function lo(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, r = e.slice(), i;
  return function(o) {
    for (i = 0; i < n; ++i) r[i] = t[i] * (1 - o) + e[i] * o;
    return r;
  };
}
function co(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function fo(t, e) {
  var n = e ? e.length : 0, r = t ? Math.min(n, t.length) : 0, i = new Array(r), o = new Array(n), s;
  for (s = 0; s < r; ++s) i[s] = $t(t[s], e[s]);
  for (; s < n; ++s) o[s] = e[s];
  return function(a) {
    for (s = 0; s < r; ++s) o[s] = i[s](a);
    return o;
  };
}
function ho(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(r) {
    return n.setTime(t * (1 - r) + e * r), n;
  };
}
function tt(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function po(t, e) {
  var n = {}, r = {}, i;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (i in e)
    i in t ? n[i] = $t(t[i], e[i]) : r[i] = e[i];
  return function(o) {
    for (i in n) r[i] = n[i](o);
    return r;
  };
}
var Te = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, me = new RegExp(Te.source, "g");
function go(t) {
  return function() {
    return t;
  };
}
function mo(t) {
  return function(e) {
    return t(e) + "";
  };
}
function Dn(t, e) {
  var n = Te.lastIndex = me.lastIndex = 0, r, i, o, s = -1, a = [], c = [];
  for (t = t + "", e = e + ""; (r = Te.exec(t)) && (i = me.exec(e)); )
    (o = i.index) > n && (o = e.slice(n, o), a[s] ? a[s] += o : a[++s] = o), (r = r[0]) === (i = i[0]) ? a[s] ? a[s] += i : a[++s] = i : (a[++s] = null, c.push({ i: s, x: tt(r, i) })), n = me.lastIndex;
  return n < e.length && (o = e.slice(n), a[s] ? a[s] += o : a[++s] = o), a.length < 2 ? c[0] ? mo(c[0].x) : go(e) : (e = c.length, function(u) {
    for (var l = 0, h; l < e; ++l) a[(h = c[l]).i] = h.x(u);
    return a.join("");
  });
}
function $t(t, e) {
  var n = typeof e, r;
  return e == null || n === "boolean" ? Oe(e) : (n === "number" ? tt : n === "string" ? (r = ft(e)) ? (e = r, jt) : Dn : e instanceof ft ? jt : e instanceof Date ? ho : co(e) ? lo : Array.isArray(e) ? fo : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? po : tt)(t, e);
}
var tn = 180 / Math.PI, Ae = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Rn(t, e, n, r, i, o) {
  var s, a, c;
  return (s = Math.sqrt(t * t + e * e)) && (t /= s, e /= s), (c = t * n + e * r) && (n -= t * c, r -= e * c), (a = Math.sqrt(n * n + r * r)) && (n /= a, r /= a, c /= a), t * r < e * n && (t = -t, e = -e, c = -c, s = -s), {
    translateX: i,
    translateY: o,
    rotate: Math.atan2(e, t) * tn,
    skewX: Math.atan(c) * tn,
    scaleX: s,
    scaleY: a
  };
}
var Yt;
function yo(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? Ae : Rn(e.a, e.b, e.c, e.d, e.e, e.f);
}
function xo(t) {
  return t == null || (Yt || (Yt = document.createElementNS("http://www.w3.org/2000/svg", "g")), Yt.setAttribute("transform", t), !(t = Yt.transform.baseVal.consolidate())) ? Ae : (t = t.matrix, Rn(t.a, t.b, t.c, t.d, t.e, t.f));
}
function On(t, e, n, r) {
  function i(u) {
    return u.length ? u.pop() + " " : "";
  }
  function o(u, l, h, d, m, w) {
    if (u !== h || l !== d) {
      var A = m.push("translate(", null, e, null, n);
      w.push({ i: A - 4, x: tt(u, h) }, { i: A - 2, x: tt(l, d) });
    } else (h || d) && m.push("translate(" + h + e + d + n);
  }
  function s(u, l, h, d) {
    u !== l ? (u - l > 180 ? l += 360 : l - u > 180 && (u += 360), d.push({ i: h.push(i(h) + "rotate(", null, r) - 2, x: tt(u, l) })) : l && h.push(i(h) + "rotate(" + l + r);
  }
  function a(u, l, h, d) {
    u !== l ? d.push({ i: h.push(i(h) + "skewX(", null, r) - 2, x: tt(u, l) }) : l && h.push(i(h) + "skewX(" + l + r);
  }
  function c(u, l, h, d, m, w) {
    if (u !== h || l !== d) {
      var A = m.push(i(m) + "scale(", null, ",", null, ")");
      w.push({ i: A - 4, x: tt(u, h) }, { i: A - 2, x: tt(l, d) });
    } else (h !== 1 || d !== 1) && m.push(i(m) + "scale(" + h + "," + d + ")");
  }
  return function(u, l) {
    var h = [], d = [];
    return u = t(u), l = t(l), o(u.translateX, u.translateY, l.translateX, l.translateY, h, d), s(u.rotate, l.rotate, h, d), a(u.skewX, l.skewX, h, d), c(u.scaleX, u.scaleY, l.scaleX, l.scaleY, h, d), u = l = null, function(m) {
      for (var w = -1, A = d.length, I; ++w < A; ) h[(I = d[w]).i] = I.x(m);
      return h.join("");
    };
  };
}
var _o = On(yo, "px, ", "px)", "deg)"), wo = On(xo, ", ", ")", ")"), vo = 1e-12;
function en(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function bo(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function No(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const Lt = (function t(e, n, r) {
  function i(o, s) {
    var a = o[0], c = o[1], u = o[2], l = s[0], h = s[1], d = s[2], m = l - a, w = h - c, A = m * m + w * w, I, b;
    if (A < vo)
      b = Math.log(d / u) / e, I = function(z) {
        return [
          a + z * m,
          c + z * w,
          u * Math.exp(e * z * b)
        ];
      };
    else {
      var R = Math.sqrt(A), X = (d * d - u * u + r * A) / (2 * u * n * R), y = (d * d - u * u - r * A) / (2 * d * n * R), P = Math.log(Math.sqrt(X * X + 1) - X), T = Math.log(Math.sqrt(y * y + 1) - y);
      b = (T - P) / e, I = function(z) {
        var B = z * b, q = en(P), V = u / (n * R) * (q * No(e * B + P) - bo(P));
        return [
          a + V * m,
          c + V * w,
          u * q / en(e * B + P)
        ];
      };
    }
    return I.duration = b * 1e3 * e / Math.SQRT2, I;
  }
  return i.rho = function(o) {
    var s = Math.max(1e-3, +o), a = s * s, c = a * a;
    return t(s, a, c);
  }, i;
})(Math.SQRT2, 2, 4);
var wt = 0, Tt = 0, Nt = 0, Xn = 1e3, te, At, ee = 0, ht = 0, se = 0, kt = typeof performance == "object" && performance.now ? performance : Date, Bn = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Xe() {
  return ht || (Bn(Eo), ht = kt.now() + se);
}
function Eo() {
  ht = 0;
}
function ne() {
  this._call = this._time = this._next = null;
}
ne.prototype = Yn.prototype = {
  constructor: ne,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Xe() : +n) + (e == null ? 0 : +e), !this._next && At !== this && (At ? At._next = this : te = this, At = this), this._call = t, this._time = n, $e();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, $e());
  }
};
function Yn(t, e, n) {
  var r = new ne();
  return r.restart(t, e, n), r;
}
function To() {
  Xe(), ++wt;
  for (var t = te, e; t; )
    (e = ht - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --wt;
}
function nn() {
  ht = (ee = kt.now()) + se, wt = Tt = 0;
  try {
    To();
  } finally {
    wt = 0, $o(), ht = 0;
  }
}
function Ao() {
  var t = kt.now(), e = t - ee;
  e > Xn && (se -= e, ee = t);
}
function $o() {
  for (var t, e = te, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : te = n);
  At = t, $e(r);
}
function $e(t) {
  if (!wt) {
    Tt && (Tt = clearTimeout(Tt));
    var e = t - ht;
    e > 24 ? (t < 1 / 0 && (Tt = setTimeout(nn, t - kt.now() - se)), Nt && (Nt = clearInterval(Nt))) : (Nt || (ee = kt.now(), Nt = setInterval(Ao, Xn)), wt = 1, Bn(nn));
  }
}
function rn(t, e, n) {
  var r = new ne();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var Mo = ie("start", "end", "cancel", "interrupt"), Po = [], Hn = 0, on = 1, Me = 2, Zt = 3, sn = 4, Pe = 5, Gt = 6;
function ae(t, e, n, r, i, o) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (n in s) return;
  So(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Mo,
    tween: Po,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Hn
  });
}
function Be(t, e) {
  var n = J(t, e);
  if (n.state > Hn) throw new Error("too late; already scheduled");
  return n;
}
function rt(t, e) {
  var n = J(t, e);
  if (n.state > Zt) throw new Error("too late; already running");
  return n;
}
function J(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function So(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = Yn(o, 0, n.time);
  function o(u) {
    n.state = on, n.timer.restart(s, n.delay, n.time), n.delay <= u && s(u - n.delay);
  }
  function s(u) {
    var l, h, d, m;
    if (n.state !== on) return c();
    for (l in r)
      if (m = r[l], m.name === n.name) {
        if (m.state === Zt) return rn(s);
        m.state === sn ? (m.state = Gt, m.timer.stop(), m.on.call("interrupt", t, t.__data__, m.index, m.group), delete r[l]) : +l < e && (m.state = Gt, m.timer.stop(), m.on.call("cancel", t, t.__data__, m.index, m.group), delete r[l]);
      }
    if (rn(function() {
      n.state === Zt && (n.state = sn, n.timer.restart(a, n.delay, n.time), a(u));
    }), n.state = Me, n.on.call("start", t, t.__data__, n.index, n.group), n.state === Me) {
      for (n.state = Zt, i = new Array(d = n.tween.length), l = 0, h = -1; l < d; ++l)
        (m = n.tween[l].value.call(t, t.__data__, n.index, n.group)) && (i[++h] = m);
      i.length = h + 1;
    }
  }
  function a(u) {
    for (var l = u < n.duration ? n.ease.call(null, u / n.duration) : (n.timer.restart(c), n.state = Pe, 1), h = -1, d = i.length; ++h < d; )
      i[h].call(t, l);
    n.state === Pe && (n.on.call("end", t, t.__data__, n.index, n.group), c());
  }
  function c() {
    n.state = Gt, n.timer.stop(), delete r[e];
    for (var u in r) return;
    delete t.__transition;
  }
}
function Ut(t, e) {
  var n = t.__transition, r, i, o = !0, s;
  if (n) {
    e = e == null ? null : e + "";
    for (s in n) {
      if ((r = n[s]).name !== e) {
        o = !1;
        continue;
      }
      i = r.state > Me && r.state < Pe, r.state = Gt, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[s];
    }
    o && delete t.__transition;
  }
}
function ko(t) {
  return this.each(function() {
    Ut(this, t);
  });
}
function zo(t, e) {
  var n, r;
  return function() {
    var i = rt(this, t), o = i.tween;
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
function Io(t, e, n) {
  var r, i;
  if (typeof n != "function") throw new Error();
  return function() {
    var o = rt(this, t), s = o.tween;
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
function Co(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = J(this.node(), n).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? zo : Io)(n, t, e));
}
function Ye(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = rt(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return J(i, r).value[e];
  };
}
function Fn(t, e) {
  var n;
  return (typeof e == "number" ? tt : e instanceof ft ? jt : (n = ft(e)) ? (e = n, jt) : Dn)(t, e);
}
function Do(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Ro(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Oo(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? o : o = e(r = s, n);
  };
}
function Xo(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? o : o = e(r = s, n);
  };
}
function Bo(t, e, n) {
  var r, i, o;
  return function() {
    var s, a = n(this), c;
    return a == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), c = a + "", s === c ? null : s === r && c === i ? o : (i = c, o = e(r = s, a)));
  };
}
function Yo(t, e, n) {
  var r, i, o;
  return function() {
    var s, a = n(this), c;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), c = a + "", s === c ? null : s === r && c === i ? o : (i = c, o = e(r = s, a)));
  };
}
function Ho(t, e) {
  var n = oe(t), r = n === "transform" ? wo : Fn;
  return this.attrTween(t, typeof e == "function" ? (n.local ? Yo : Bo)(n, r, Ye(this, "attr." + t, e)) : e == null ? (n.local ? Ro : Do)(n) : (n.local ? Xo : Oo)(n, r, e));
}
function Fo(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function qo(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function Vo(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && qo(t, o)), n;
  }
  return i._value = e, i;
}
function Lo(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && Fo(t, o)), n;
  }
  return i._value = e, i;
}
function Zo(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var r = oe(t);
  return this.tween(n, (r.local ? Vo : Lo)(r, e));
}
function Go(t, e) {
  return function() {
    Be(this, t).delay = +e.apply(this, arguments);
  };
}
function Uo(t, e) {
  return e = +e, function() {
    Be(this, t).delay = e;
  };
}
function Wo(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Go : Uo)(e, t)) : J(this.node(), e).delay;
}
function Ko(t, e) {
  return function() {
    rt(this, t).duration = +e.apply(this, arguments);
  };
}
function Qo(t, e) {
  return e = +e, function() {
    rt(this, t).duration = e;
  };
}
function Jo(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Ko : Qo)(e, t)) : J(this.node(), e).duration;
}
function jo(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    rt(this, t).ease = e;
  };
}
function ts(t) {
  var e = this._id;
  return arguments.length ? this.each(jo(e, t)) : J(this.node(), e).ease;
}
function es(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    rt(this, t).ease = n;
  };
}
function ns(t) {
  if (typeof t != "function") throw new Error();
  return this.each(es(this._id, t));
}
function rs(t) {
  typeof t != "function" && (t = wn(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], s = o.length, a = r[i] = [], c, u = 0; u < s; ++u)
      (c = o[u]) && t.call(c, c.__data__, u, o) && a.push(c);
  return new st(r, this._parents, this._name, this._id);
}
function is(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, o = Math.min(r, i), s = new Array(r), a = 0; a < o; ++a)
    for (var c = e[a], u = n[a], l = c.length, h = s[a] = new Array(l), d, m = 0; m < l; ++m)
      (d = c[m] || u[m]) && (h[m] = d);
  for (; a < r; ++a)
    s[a] = e[a];
  return new st(s, this._parents, this._name, this._id);
}
function os(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function ss(t, e, n) {
  var r, i, o = os(e) ? Be : rt;
  return function() {
    var s = o(this, t), a = s.on;
    a !== r && (i = (r = a).copy()).on(e, n), s.on = i;
  };
}
function as(t, e) {
  var n = this._id;
  return arguments.length < 2 ? J(this.node(), n).on.on(t) : this.each(ss(n, t, e));
}
function us(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function ls() {
  return this.on("end.remove", us(this._id));
}
function cs(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Ce(t));
  for (var r = this._groups, i = r.length, o = new Array(i), s = 0; s < i; ++s)
    for (var a = r[s], c = a.length, u = o[s] = new Array(c), l, h, d = 0; d < c; ++d)
      (l = a[d]) && (h = t.call(l, l.__data__, d, a)) && ("__data__" in l && (h.__data__ = l.__data__), u[d] = h, ae(u[d], e, n, d, u, J(l, n)));
  return new st(o, this._parents, e, n);
}
function fs(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = _n(t));
  for (var r = this._groups, i = r.length, o = [], s = [], a = 0; a < i; ++a)
    for (var c = r[a], u = c.length, l, h = 0; h < u; ++h)
      if (l = c[h]) {
        for (var d = t.call(l, l.__data__, h, c), m, w = J(l, n), A = 0, I = d.length; A < I; ++A)
          (m = d[A]) && ae(m, e, n, A, d, w);
        o.push(d), s.push(l);
      }
  return new st(o, s, e, n);
}
var hs = Dt.prototype.constructor;
function ds() {
  return new hs(this._groups, this._parents);
}
function ps(t, e) {
  var n, r, i;
  return function() {
    var o = _t(this, t), s = (this.style.removeProperty(t), _t(this, t));
    return o === s ? null : o === n && s === r ? i : i = e(n = o, r = s);
  };
}
function qn(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function gs(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var s = _t(this, t);
    return s === i ? null : s === r ? o : o = e(r = s, n);
  };
}
function ms(t, e, n) {
  var r, i, o;
  return function() {
    var s = _t(this, t), a = n(this), c = a + "";
    return a == null && (c = a = (this.style.removeProperty(t), _t(this, t))), s === c ? null : s === r && c === i ? o : (i = c, o = e(r = s, a));
  };
}
function ys(t, e) {
  var n, r, i, o = "style." + e, s = "end." + o, a;
  return function() {
    var c = rt(this, t), u = c.on, l = c.value[o] == null ? a || (a = qn(e)) : void 0;
    (u !== n || i !== l) && (r = (n = u).copy()).on(s, i = l), c.on = r;
  };
}
function xs(t, e, n) {
  var r = (t += "") == "transform" ? _o : Fn;
  return e == null ? this.styleTween(t, ps(t, r)).on("end.style." + t, qn(t)) : typeof e == "function" ? this.styleTween(t, ms(t, r, Ye(this, "style." + t, e))).each(ys(this._id, t)) : this.styleTween(t, gs(t, r, e), n).on("end.style." + t, null);
}
function _s(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function ws(t, e, n) {
  var r, i;
  function o() {
    var s = e.apply(this, arguments);
    return s !== i && (r = (i = s) && _s(t, s, n)), r;
  }
  return o._value = e, o;
}
function vs(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (e == null) return this.tween(r, null);
  if (typeof e != "function") throw new Error();
  return this.tween(r, ws(t, e, n ?? ""));
}
function bs(t) {
  return function() {
    this.textContent = t;
  };
}
function Ns(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function Es(t) {
  return this.tween("text", typeof t == "function" ? Ns(Ye(this, "text", t)) : bs(t == null ? "" : t + ""));
}
function Ts(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function As(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && Ts(i)), e;
  }
  return r._value = t, r;
}
function $s(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, As(t));
}
function Ms() {
  for (var t = this._name, e = this._id, n = Vn(), r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], a = s.length, c, u = 0; u < a; ++u)
      if (c = s[u]) {
        var l = J(c, e);
        ae(c, t, n, u, s, {
          time: l.time + l.delay + l.duration,
          delay: 0,
          duration: l.duration,
          ease: l.ease
        });
      }
  return new st(r, this._parents, t, n);
}
function Ps() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(o, s) {
    var a = { value: s }, c = { value: function() {
      --i === 0 && o();
    } };
    n.each(function() {
      var u = rt(this, r), l = u.on;
      l !== t && (e = (t = l).copy(), e._.cancel.push(a), e._.interrupt.push(a), e._.end.push(c)), u.on = e;
    }), i === 0 && o();
  });
}
var Ss = 0;
function st(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function Vn() {
  return ++Ss;
}
var it = Dt.prototype;
st.prototype = {
  constructor: st,
  select: cs,
  selectAll: fs,
  selectChild: it.selectChild,
  selectChildren: it.selectChildren,
  filter: rs,
  merge: is,
  selection: ds,
  transition: Ms,
  call: it.call,
  nodes: it.nodes,
  node: it.node,
  size: it.size,
  empty: it.empty,
  each: it.each,
  on: as,
  attr: Ho,
  attrTween: Zo,
  style: xs,
  styleTween: vs,
  text: Es,
  textTween: $s,
  remove: ls,
  tween: Co,
  delay: Wo,
  duration: Jo,
  ease: ts,
  easeVarying: ns,
  end: Ps,
  [Symbol.iterator]: it[Symbol.iterator]
};
function ks(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var zs = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: ks
};
function Is(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function Cs(t) {
  var e, n;
  t instanceof st ? (e = t._id, t = t._name) : (e = Vn(), (n = zs).time = Xe(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], a = s.length, c, u = 0; u < a; ++u)
      (c = s[u]) && ae(c, t, e, u, s, n || Is(c, e));
  return new st(r, this._parents, t, e);
}
Dt.prototype.interrupt = ko;
Dt.prototype.transition = Cs;
const Ht = (t) => () => t;
function Ds(t, {
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
function ot(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
ot.prototype = {
  constructor: ot,
  scale: function(t) {
    return t === 1 ? this : new ot(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new ot(this.k, this.x + this.k * t, this.y + this.k * e);
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
var ue = new ot(1, 0, 0);
Ln.prototype = ot.prototype;
function Ln(t) {
  for (; !t.__zoom; ) if (!(t = t.parentNode)) return ue;
  return t.__zoom;
}
function ye(t) {
  t.stopImmediatePropagation();
}
function Et(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Rs(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function Os() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function an() {
  return this.__zoom || ue;
}
function Xs(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function Bs() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Ys(t, e, n) {
  var r = t.invertX(e[0][0]) - n[0][0], i = t.invertX(e[1][0]) - n[1][0], o = t.invertY(e[0][1]) - n[0][1], s = t.invertY(e[1][1]) - n[1][1];
  return t.translate(
    i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i),
    s > o ? (o + s) / 2 : Math.min(0, o) || Math.max(0, s)
  );
}
function Hs() {
  var t = Rs, e = Os, n = Ys, r = Xs, i = Bs, o = [0, 1 / 0], s = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, c = Lt, u = ie("start", "zoom", "end"), l, h, d, m = 500, w = 150, A = 0, I = 10;
  function b(f) {
    f.property("__zoom", an).on("wheel.zoom", B, { passive: !1 }).on("mousedown.zoom", q).on("dblclick.zoom", V).filter(i).on("touchstart.zoom", $).on("touchmove.zoom", _).on("touchend.zoom touchcancel.zoom", M).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  b.transform = function(f, g, p, x) {
    var v = f.selection ? f.selection() : f;
    v.property("__zoom", an), f !== v ? P(f, g, p, x) : v.interrupt().each(function() {
      T(this, arguments).event(x).start().zoom(null, typeof g == "function" ? g.apply(this, arguments) : g).end();
    });
  }, b.scaleBy = function(f, g, p, x) {
    b.scaleTo(f, function() {
      var v = this.__zoom.k, N = typeof g == "function" ? g.apply(this, arguments) : g;
      return v * N;
    }, p, x);
  }, b.scaleTo = function(f, g, p, x) {
    b.transform(f, function() {
      var v = e.apply(this, arguments), N = this.__zoom, E = p == null ? y(v) : typeof p == "function" ? p.apply(this, arguments) : p, S = N.invert(E), k = typeof g == "function" ? g.apply(this, arguments) : g;
      return n(X(R(N, k), E, S), v, s);
    }, p, x);
  }, b.translateBy = function(f, g, p, x) {
    b.transform(f, function() {
      return n(this.__zoom.translate(
        typeof g == "function" ? g.apply(this, arguments) : g,
        typeof p == "function" ? p.apply(this, arguments) : p
      ), e.apply(this, arguments), s);
    }, null, x);
  }, b.translateTo = function(f, g, p, x, v) {
    b.transform(f, function() {
      var N = e.apply(this, arguments), E = this.__zoom, S = x == null ? y(N) : typeof x == "function" ? x.apply(this, arguments) : x;
      return n(ue.translate(S[0], S[1]).scale(E.k).translate(
        typeof g == "function" ? -g.apply(this, arguments) : -g,
        typeof p == "function" ? -p.apply(this, arguments) : -p
      ), N, s);
    }, x, v);
  };
  function R(f, g) {
    return g = Math.max(o[0], Math.min(o[1], g)), g === f.k ? f : new ot(g, f.x, f.y);
  }
  function X(f, g, p) {
    var x = g[0] - p[0] * f.k, v = g[1] - p[1] * f.k;
    return x === f.x && v === f.y ? f : new ot(f.k, x, v);
  }
  function y(f) {
    return [(+f[0][0] + +f[1][0]) / 2, (+f[0][1] + +f[1][1]) / 2];
  }
  function P(f, g, p, x) {
    f.on("start.zoom", function() {
      T(this, arguments).event(x).start();
    }).on("interrupt.zoom end.zoom", function() {
      T(this, arguments).event(x).end();
    }).tween("zoom", function() {
      var v = this, N = arguments, E = T(v, N).event(x), S = e.apply(v, N), k = p == null ? y(S) : typeof p == "function" ? p.apply(v, N) : p, Y = Math.max(S[1][0] - S[0][0], S[1][1] - S[0][1]), C = v.__zoom, O = typeof g == "function" ? g.apply(v, N) : g, L = c(C.invert(k).concat(Y / C.k), O.invert(k).concat(Y / O.k));
      return function(F) {
        if (F === 1) F = O;
        else {
          var D = L(F), W = Y / D[2];
          F = new ot(W, k[0] - D[0] * W, k[1] - D[1] * W);
        }
        E.zoom(null, F);
      };
    });
  }
  function T(f, g, p) {
    return !p && f.__zooming || new z(f, g);
  }
  function z(f, g) {
    this.that = f, this.args = g, this.active = 0, this.sourceEvent = null, this.extent = e.apply(f, g), this.taps = 0;
  }
  z.prototype = {
    event: function(f) {
      return f && (this.sourceEvent = f), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(f, g) {
      return this.mouse && f !== "mouse" && (this.mouse[1] = g.invert(this.mouse[0])), this.touch0 && f !== "touch" && (this.touch0[1] = g.invert(this.touch0[0])), this.touch1 && f !== "touch" && (this.touch1[1] = g.invert(this.touch1[0])), this.that.__zoom = g, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(f) {
      var g = K(this.that).datum();
      u.call(
        f,
        this.that,
        new Ds(f, {
          sourceEvent: this.sourceEvent,
          target: b,
          transform: this.that.__zoom,
          dispatch: u
        }),
        g
      );
    }
  };
  function B(f, ...g) {
    if (!t.apply(this, arguments)) return;
    var p = T(this, g).event(f), x = this.__zoom, v = Math.max(o[0], Math.min(o[1], x.k * Math.pow(2, r.apply(this, arguments)))), N = j(f);
    if (p.wheel)
      (p.mouse[0][0] !== N[0] || p.mouse[0][1] !== N[1]) && (p.mouse[1] = x.invert(p.mouse[0] = N)), clearTimeout(p.wheel);
    else {
      if (x.k === v) return;
      p.mouse = [N, x.invert(N)], Ut(this), p.start();
    }
    Et(f), p.wheel = setTimeout(E, w), p.zoom("mouse", n(X(R(x, v), p.mouse[0], p.mouse[1]), p.extent, s));
    function E() {
      p.wheel = null, p.end();
    }
  }
  function q(f, ...g) {
    if (d || !t.apply(this, arguments)) return;
    var p = f.currentTarget, x = T(this, g, !0).event(f), v = K(f.view).on("mousemove.zoom", k, !0).on("mouseup.zoom", Y, !0), N = j(f, p), E = f.clientX, S = f.clientY;
    Sn(f.view), ye(f), x.mouse = [N, this.__zoom.invert(N)], Ut(this), x.start();
    function k(C) {
      if (Et(C), !x.moved) {
        var O = C.clientX - E, L = C.clientY - S;
        x.moved = O * O + L * L > A;
      }
      x.event(C).zoom("mouse", n(X(x.that.__zoom, x.mouse[0] = j(C, p), x.mouse[1]), x.extent, s));
    }
    function Y(C) {
      v.on("mousemove.zoom mouseup.zoom", null), kn(C.view, x.moved), Et(C), x.event(C).end();
    }
  }
  function V(f, ...g) {
    if (t.apply(this, arguments)) {
      var p = this.__zoom, x = j(f.changedTouches ? f.changedTouches[0] : f, this), v = p.invert(x), N = p.k * (f.shiftKey ? 0.5 : 2), E = n(X(R(p, N), x, v), e.apply(this, g), s);
      Et(f), a > 0 ? K(this).transition().duration(a).call(P, E, x, f) : K(this).call(b.transform, E, x, f);
    }
  }
  function $(f, ...g) {
    if (t.apply(this, arguments)) {
      var p = f.touches, x = p.length, v = T(this, g, f.changedTouches.length === x).event(f), N, E, S, k;
      for (ye(f), E = 0; E < x; ++E)
        S = p[E], k = j(S, this), k = [k, this.__zoom.invert(k), S.identifier], v.touch0 ? !v.touch1 && v.touch0[2] !== k[2] && (v.touch1 = k, v.taps = 0) : (v.touch0 = k, N = !0, v.taps = 1 + !!l);
      l && (l = clearTimeout(l)), N && (v.taps < 2 && (h = k[0], l = setTimeout(function() {
        l = null;
      }, m)), Ut(this), v.start());
    }
  }
  function _(f, ...g) {
    if (this.__zooming) {
      var p = T(this, g).event(f), x = f.changedTouches, v = x.length, N, E, S, k;
      for (Et(f), N = 0; N < v; ++N)
        E = x[N], S = j(E, this), p.touch0 && p.touch0[2] === E.identifier ? p.touch0[0] = S : p.touch1 && p.touch1[2] === E.identifier && (p.touch1[0] = S);
      if (E = p.that.__zoom, p.touch1) {
        var Y = p.touch0[0], C = p.touch0[1], O = p.touch1[0], L = p.touch1[1], F = (F = O[0] - Y[0]) * F + (F = O[1] - Y[1]) * F, D = (D = L[0] - C[0]) * D + (D = L[1] - C[1]) * D;
        E = R(E, Math.sqrt(F / D)), S = [(Y[0] + O[0]) / 2, (Y[1] + O[1]) / 2], k = [(C[0] + L[0]) / 2, (C[1] + L[1]) / 2];
      } else if (p.touch0) S = p.touch0[0], k = p.touch0[1];
      else return;
      p.zoom("touch", n(X(E, S, k), p.extent, s));
    }
  }
  function M(f, ...g) {
    if (this.__zooming) {
      var p = T(this, g).event(f), x = f.changedTouches, v = x.length, N, E;
      for (ye(f), d && clearTimeout(d), d = setTimeout(function() {
        d = null;
      }, m), N = 0; N < v; ++N)
        E = x[N], p.touch0 && p.touch0[2] === E.identifier ? delete p.touch0 : p.touch1 && p.touch1[2] === E.identifier && delete p.touch1;
      if (p.touch1 && !p.touch0 && (p.touch0 = p.touch1, delete p.touch1), p.touch0) p.touch0[1] = this.__zoom.invert(p.touch0[0]);
      else if (p.end(), p.taps === 2 && (E = j(E, this), Math.hypot(h[0] - E[0], h[1] - E[1]) < I)) {
        var S = K(this).on("dblclick.zoom");
        S && S.apply(this, arguments);
      }
    }
  }
  return b.wheelDelta = function(f) {
    return arguments.length ? (r = typeof f == "function" ? f : Ht(+f), b) : r;
  }, b.filter = function(f) {
    return arguments.length ? (t = typeof f == "function" ? f : Ht(!!f), b) : t;
  }, b.touchable = function(f) {
    return arguments.length ? (i = typeof f == "function" ? f : Ht(!!f), b) : i;
  }, b.extent = function(f) {
    return arguments.length ? (e = typeof f == "function" ? f : Ht([[+f[0][0], +f[0][1]], [+f[1][0], +f[1][1]]]), b) : e;
  }, b.scaleExtent = function(f) {
    return arguments.length ? (o[0] = +f[0], o[1] = +f[1], b) : [o[0], o[1]];
  }, b.translateExtent = function(f) {
    return arguments.length ? (s[0][0] = +f[0][0], s[1][0] = +f[1][0], s[0][1] = +f[0][1], s[1][1] = +f[1][1], b) : [[s[0][0], s[0][1]], [s[1][0], s[1][1]]];
  }, b.constrain = function(f) {
    return arguments.length ? (n = f, b) : n;
  }, b.duration = function(f) {
    return arguments.length ? (a = +f, b) : a;
  }, b.interpolate = function(f) {
    return arguments.length ? (c = f, b) : c;
  }, b.on = function() {
    var f = u.on.apply(u, arguments);
    return f === u ? b : f;
  }, b.clickDistance = function(f) {
    return arguments.length ? (A = (f = +f) * f, b) : Math.sqrt(A);
  }, b.tapDistance = function(f) {
    return arguments.length ? (I = +f, b) : I;
  }, b;
}
const un = {
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
}, Zn = [
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
];
var ln;
(function(t) {
  t.Strict = "strict", t.Loose = "loose";
})(ln || (ln = {}));
var xt;
(function(t) {
  t.Free = "free", t.Vertical = "vertical", t.Horizontal = "horizontal";
})(xt || (xt = {}));
var cn;
(function(t) {
  t.Partial = "partial", t.Full = "full";
})(cn || (cn = {}));
var fn;
(function(t) {
  t.Bezier = "default", t.Straight = "straight", t.Step = "step", t.SmoothStep = "smoothstep", t.SimpleBezier = "simplebezier";
})(fn || (fn = {}));
var hn;
(function(t) {
  t.Arrow = "arrow", t.ArrowClosed = "arrowclosed";
})(hn || (hn = {}));
var H;
(function(t) {
  t.Left = "left", t.Top = "top", t.Right = "right", t.Bottom = "bottom";
})(H || (H = {}));
H.Left + "", H.Right, H.Right + "", H.Left, H.Top + "", H.Bottom, H.Bottom + "", H.Top;
const Fs = (t) => "id" in t && "internals" in t && !("source" in t) && !("target" in t), He = (t, e = [0, 0]) => {
  const { width: n, height: r } = ce(t), i = t.origin ?? e, o = n * i[0], s = r * i[1];
  return {
    x: t.position.x - o,
    y: t.position.y - s
  };
}, qs = (t, e = {}) => {
  let n = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 }, r = !1;
  return t.forEach((i) => {
    (e.filter === void 0 || e.filter(i)) && (n = Gs(n, Ks(i)), r = !0);
  }), r ? Ws(n) : { x: 0, y: 0, width: 0, height: 0 };
};
function Vs({ nodeId: t, nextPosition: e, nodeLookup: n, nodeOrigin: r = [0, 0], nodeExtent: i, onError: o }) {
  const s = n.get(t), a = s.parentId ? n.get(s.parentId) : void 0, { x: c, y: u } = a ? a.internals.positionAbsolute : { x: 0, y: 0 }, l = s.origin ?? r;
  let h = s.extent || i;
  if (s.extent === "parent" && !s.expandParent)
    if (!a)
      o?.("005", un.error005());
    else {
      const m = a.measured.width, w = a.measured.height;
      m && w && (h = [
        [c, u],
        [c + m, u + w]
      ]);
    }
  else a && re(s.extent) && (h = [
    [s.extent[0][0] + c, s.extent[0][1] + u],
    [s.extent[1][0] + c, s.extent[1][1] + u]
  ]);
  const d = re(h) ? It(e, h, s.measured) : e;
  return (s.measured.width === void 0 || s.measured.height === void 0) && o?.("015", un.error015()), {
    position: {
      x: d.x - c + (s.measured.width ?? 0) * l[0],
      y: d.y - u + (s.measured.height ?? 0) * l[1]
    },
    positionAbsolute: d
  };
}
const zt = (t, e = 0, n = 1) => Math.min(Math.max(t, e), n), It = (t = { x: 0, y: 0 }, e, n) => ({
  x: zt(t.x, e[0][0], e[1][0] - (n?.width ?? 0)),
  y: zt(t.y, e[0][1], e[1][1] - (n?.height ?? 0))
});
function Ls(t, e, n) {
  const { width: r, height: i } = ce(n), { x: o, y: s } = n.internals.positionAbsolute;
  return It(t, [
    [o, s],
    [o + r, s + i]
  ], e);
}
const dn = (t, e, n) => t < e ? zt(Math.abs(t - e), 1, e) / e : t > n ? -zt(Math.abs(t - n), 1, e) / e : 0, Zs = (t, e, n = 15, r = 40) => {
  const i = dn(t.x, r, e.width - r) * n, o = dn(t.y, r, e.height - r) * n;
  return [i, o];
}, Gs = (t, e) => ({
  x: Math.min(t.x, e.x),
  y: Math.min(t.y, e.y),
  x2: Math.max(t.x2, e.x2),
  y2: Math.max(t.y2, e.y2)
}), Us = ({ x: t, y: e, width: n, height: r }) => ({
  x: t,
  y: e,
  x2: t + n,
  y2: e + r
}), Ws = ({ x: t, y: e, x2: n, y2: r }) => ({
  x: t,
  y: e,
  width: n - t,
  height: r - e
}), Ks = (t, e = [0, 0]) => {
  const { x: n, y: r } = Fs(t) ? t.internals.positionAbsolute : He(t, e);
  return {
    x: n,
    y: r,
    x2: n + (t.measured?.width ?? t.width ?? t.initialWidth ?? 0),
    y2: r + (t.measured?.height ?? t.height ?? t.initialHeight ?? 0)
  };
}, Se = (t) => !isNaN(t) && isFinite(t), le = (t, e = [1, 1]) => ({
  x: e[0] * Math.round(t.x / e[0]),
  y: e[1] * Math.round(t.y / e[1])
}), Qs = ({ x: t, y: e }, [n, r, i], o = !1, s = [1, 1]) => {
  const a = {
    x: (t - n) / i,
    y: (e - r) / i
  };
  return o ? le(a, s) : a;
}, Gn = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function re(t) {
  return t != null && t !== "parent";
}
function ce(t) {
  return {
    width: t.measured?.width ?? t.width ?? t.initialWidth ?? 0,
    height: t.measured?.height ?? t.height ?? t.initialHeight ?? 0
  };
}
function xe(t, { snapGrid: e = [0, 0], snapToGrid: n = !1, transform: r, containerBounds: i }) {
  const { x: o, y: s } = Wt(t), a = Qs({ x: o - (i?.left ?? 0), y: s - (i?.top ?? 0) }, r), { x: c, y: u } = n ? le(a, e) : a;
  return {
    xSnapped: c,
    ySnapped: u,
    ...a
  };
}
const Js = (t) => "clientX" in t, Wt = (t, e) => {
  const n = Js(t), r = n ? t.clientX : t.touches?.[0].clientX, i = n ? t.clientY : t.touches?.[0].clientY;
  return {
    x: r - (e?.left ?? 0),
    y: i - (e?.top ?? 0)
  };
};
function js({ sourceX: t, sourceY: e, targetX: n, targetY: r, sourceControlX: i, sourceControlY: o, targetControlX: s, targetControlY: a }) {
  const c = t * 0.125 + i * 0.375 + s * 0.375 + n * 0.125, u = e * 0.125 + o * 0.375 + a * 0.375 + r * 0.125, l = Math.abs(c - t), h = Math.abs(u - e);
  return [c, u, l, h];
}
function Ft(t, e) {
  return t >= 0 ? 0.5 * t : e * 25 * Math.sqrt(-t);
}
function pn({ pos: t, x1: e, y1: n, x2: r, y2: i, c: o }) {
  switch (t) {
    case H.Left:
      return [e - Ft(e - r, o), n];
    case H.Right:
      return [e + Ft(r - e, o), n];
    case H.Top:
      return [e, n - Ft(n - i, o)];
    case H.Bottom:
      return [e, n + Ft(i - n, o)];
  }
}
function ta({ sourceX: t, sourceY: e, sourcePosition: n = H.Bottom, targetX: r, targetY: i, targetPosition: o = H.Top, curvature: s = 0.25 }) {
  const [a, c] = pn({
    pos: n,
    x1: t,
    y1: e,
    x2: r,
    y2: i,
    c: s
  }), [u, l] = pn({
    pos: o,
    x1: r,
    y1: i,
    x2: t,
    y2: e,
    c: s
  }), [h, d, m, w] = js({
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
    h,
    d,
    m,
    w
  ];
}
H.Left + "", H.Right + "", H.Top + "", H.Bottom + "";
const Un = 1e3, ea = 10, Wn = {
  nodeOrigin: [0, 0],
  nodeExtent: Zn,
  elevateNodesOnSelect: !0,
  zIndexMode: "basic",
  defaults: {}
}, na = {
  ...Wn,
  checkEquality: !0
};
function Kn(t, e) {
  const n = { ...t };
  for (const r in e)
    e[r] !== void 0 && (n[r] = e[r]);
  return n;
}
function ra(t, e) {
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
function Fe(t) {
  return t === "manual";
}
function ia(t, e, n, r = {}) {
  const i = Kn(na, r), o = { i: 0 }, s = new Map(e), a = i?.elevateNodesOnSelect && !Fe(i.zIndexMode) ? Un : 0;
  let c = t.length > 0;
  e.clear(), n.clear();
  for (const u of t) {
    let l = s.get(u.id);
    if (i.checkEquality && u === l?.internals.userNode)
      e.set(u.id, l);
    else {
      const h = He(u, i.nodeOrigin), d = re(u.extent) ? u.extent : i.nodeExtent, m = It(h, d, ce(u));
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
          handleBounds: ra(u, l),
          z: Qn(u, a, i.zIndexMode),
          userNode: u
        }
      }, e.set(u.id, l);
    }
    (l.measured === void 0 || l.measured.width === void 0 || l.measured.height === void 0) && !l.hidden && (c = !1), u.parentId && sa(l, e, n, r, o);
  }
  return c;
}
function oa(t, e) {
  if (!t.parentId)
    return;
  const n = e.get(t.parentId);
  n ? n.set(t.id, t) : e.set(t.parentId, /* @__PURE__ */ new Map([[t.id, t]]));
}
function sa(t, e, n, r, i) {
  const { elevateNodesOnSelect: o, nodeOrigin: s, nodeExtent: a, zIndexMode: c } = Kn(Wn, r), u = t.parentId, l = e.get(u);
  if (!l) {
    console.warn(`Parent node ${u} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
    return;
  }
  oa(t, n), i && !l.parentId && l.internals.rootParentIndex === void 0 && c === "auto" && (l.internals.rootParentIndex = ++i.i, l.internals.z = l.internals.z + i.i * ea), i && l.internals.rootParentIndex !== void 0 && (i.i = l.internals.rootParentIndex);
  const h = o && !Fe(c) ? Un : 0, { x: d, y: m, z: w } = aa(t, l, s, a, h, c), { positionAbsolute: A } = t.internals, I = d !== A.x || m !== A.y;
  (I || w !== t.internals.z) && e.set(t.id, {
    ...t,
    internals: {
      ...t.internals,
      positionAbsolute: I ? { x: d, y: m } : A,
      z: w
    }
  });
}
function Qn(t, e, n) {
  const r = Se(t.zIndex) ? t.zIndex : 0;
  return Fe(n) ? r : r + (t.selected ? e : 0);
}
function aa(t, e, n, r, i, o) {
  const { x: s, y: a } = e.internals.positionAbsolute, c = ce(t), u = He(t, n), l = re(t.extent) ? It(u, t.extent, c) : u;
  let h = It({ x: s + l.x, y: a + l.y }, r, c);
  t.extent === "parent" && (h = Ls(h, c, e));
  const d = Qn(t, i, o), m = e.internals.z ?? 0;
  return {
    x: h.x,
    y: h.y,
    z: m >= d ? m + 1 : d
  };
}
function Jn(t, e) {
  if (!t.parentId)
    return !1;
  const n = e.get(t.parentId);
  return n ? n.selected ? !0 : Jn(n, e) : !1;
}
function gn(t, e, n) {
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
function ua(t, e, n, r) {
  const i = /* @__PURE__ */ new Map();
  for (const [o, s] of t)
    if ((s.selected || s.id === r) && (!s.parentId || !Jn(s, t)) && (s.draggable || e && typeof s.draggable > "u")) {
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
function _e({ nodeId: t, dragItems: e, nodeLookup: n, dragging: r = !0 }) {
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
function la({ dragItems: t, snapGrid: e, x: n, y: r }) {
  const i = t.values().next().value;
  if (!i)
    return null;
  const o = {
    x: n - i.distance.x,
    y: r - i.distance.y
  }, s = le(o, e);
  return {
    x: s.x - o.x,
    y: s.y - o.y
  };
}
function ca({ onNodeMouseDown: t, getStoreItems: e, onDragStart: n, onDrag: r, onDragStop: i }) {
  let o = { x: null, y: null }, s = 0, a = /* @__PURE__ */ new Map(), c = !1, u = { x: 0, y: 0 }, l = null, h = !1, d = null, m = !1, w = !1, A = null;
  function I({ noDragClassName: R, handleSelector: X, domNode: y, isSelectable: P, nodeId: T, nodeClickDistance: z = 0 }) {
    d = K(y);
    function B({ x: _, y: M }) {
      const { nodeLookup: f, nodeExtent: g, snapGrid: p, snapToGrid: x, nodeOrigin: v, onNodeDrag: N, onSelectionDrag: E, onError: S, updateNodePositions: k } = e();
      o = { x: _, y: M };
      let Y = !1;
      const C = a.size > 1, O = C && g ? Us(qs(a)) : null, L = C && x ? la({
        dragItems: a,
        snapGrid: p,
        x: _,
        y: M
      }) : null;
      for (const [F, D] of a) {
        if (!f.has(F))
          continue;
        let W = { x: _ - D.distance.x, y: M - D.distance.y };
        x && (W = L ? {
          x: Math.round(W.x + L.x),
          y: Math.round(W.y + L.y)
        } : le(W, p));
        let vt = null;
        if (C && g && !D.extent && O) {
          const { positionAbsolute: pt } = D.internals, de = pt.x - O.x + g[0][0], er = pt.x + D.measured.width - O.x2 + g[1][0], nr = pt.y - O.y + g[0][1], rr = pt.y + D.measured.height - O.y2 + g[1][1];
          vt = [
            [de, nr],
            [er, rr]
          ];
        }
        const { position: bt, positionAbsolute: he } = Vs({
          nodeId: F,
          nextPosition: W,
          nodeLookup: f,
          nodeExtent: vt || g,
          nodeOrigin: v,
          onError: S
        });
        Y = Y || D.position.x !== bt.x || D.position.y !== bt.y, D.position = bt, D.internals.positionAbsolute = he;
      }
      if (w = w || Y, !!Y && (k(a, !0), A && (r || N || !T && E))) {
        const [F, D] = _e({
          nodeId: T,
          dragItems: a,
          nodeLookup: f
        });
        r?.(A, a, F, D), N?.(A, F, D), T || E?.(A, D);
      }
    }
    async function q() {
      if (!l)
        return;
      const { transform: _, panBy: M, autoPanSpeed: f, autoPanOnNodeDrag: g } = e();
      if (!g) {
        c = !1, cancelAnimationFrame(s);
        return;
      }
      const [p, x] = Zs(u, l, f);
      (p !== 0 || x !== 0) && (o.x = (o.x ?? 0) - p / _[2], o.y = (o.y ?? 0) - x / _[2], await M({ x: p, y: x }) && B(o)), s = requestAnimationFrame(q);
    }
    function V(_) {
      const { nodeLookup: M, multiSelectionActive: f, nodesDraggable: g, transform: p, snapGrid: x, snapToGrid: v, selectNodesOnDrag: N, onNodeDragStart: E, onSelectionDragStart: S, unselectNodesAndEdges: k } = e();
      h = !0, (!N || !P) && !f && T && (M.get(T)?.selected || k()), P && N && T && t?.(T);
      const Y = xe(_.sourceEvent, { transform: p, snapGrid: x, snapToGrid: v, containerBounds: l });
      if (o = Y, a = ua(M, g, Y, T), a.size > 0 && (n || E || !T && S)) {
        const [C, O] = _e({
          nodeId: T,
          dragItems: a,
          nodeLookup: M
        });
        n?.(_.sourceEvent, a, C, O), E?.(_.sourceEvent, C, O), T || S?.(_.sourceEvent, O);
      }
    }
    const $ = Gi().clickDistance(z).on("start", (_) => {
      const { domNode: M, nodeDragThreshold: f, transform: g, snapGrid: p, snapToGrid: x } = e();
      l = M?.getBoundingClientRect() || null, m = !1, w = !1, A = _.sourceEvent, f === 0 && V(_), o = xe(_.sourceEvent, { transform: g, snapGrid: p, snapToGrid: x, containerBounds: l }), u = Wt(_.sourceEvent, l);
    }).on("drag", (_) => {
      const { autoPanOnNodeDrag: M, transform: f, snapGrid: g, snapToGrid: p, nodeDragThreshold: x, nodeLookup: v } = e(), N = xe(_.sourceEvent, { transform: f, snapGrid: g, snapToGrid: p, containerBounds: l });
      if (A = _.sourceEvent, (_.sourceEvent.type === "touchmove" && _.sourceEvent.touches.length > 1 || // if user deletes a node while dragging, we need to abort the drag to prevent errors
      T && !v.has(T)) && (m = !0), !m) {
        if (!c && M && h && (c = !0, q()), !h) {
          const E = Wt(_.sourceEvent, l), S = E.x - u.x, k = E.y - u.y;
          Math.sqrt(S * S + k * k) > x && V(_);
        }
        (o.x !== N.xSnapped || o.y !== N.ySnapped) && a && h && (u = Wt(_.sourceEvent, l), B(N));
      }
    }).on("end", (_) => {
      if (!(!h || m) && (c = !1, h = !1, cancelAnimationFrame(s), a.size > 0)) {
        const { nodeLookup: M, updateNodePositions: f, onNodeDragStop: g, onSelectionDragStop: p } = e();
        if (w && (f(a, !1), w = !1), i || g || !T && p) {
          const [x, v] = _e({
            nodeId: T,
            dragItems: a,
            nodeLookup: M,
            dragging: !1
          });
          i?.(_.sourceEvent, a, x, v), g?.(_.sourceEvent, x, v), T || p?.(_.sourceEvent, v);
        }
      }
    }).filter((_) => {
      const M = _.target;
      return !_.button && (!R || !gn(M, `.${R}`, y)) && (!X || gn(M, X, y));
    });
    d.call($);
  }
  function b() {
    d?.on(".drag", null);
  }
  return {
    update: I,
    destroy: b
  };
}
const fe = (t) => ({
  x: t.x,
  y: t.y,
  zoom: t.k
}), we = ({ x: t, y: e, zoom: n }) => ue.translate(t, e).scale(n), gt = (t, e) => t.target.closest(`.${e}`), jn = (t, e) => e === 2 && Array.isArray(t) && t.includes(2), fa = (t) => ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2, ve = (t, e = 0, n = fa, r = () => {
}) => {
  const i = typeof e == "number" && e > 0;
  return i || r(), i ? t.transition().duration(e).ease(n).on("end", r) : t;
}, tr = (t) => {
  const e = t.ctrlKey && Gn() ? 10 : 1;
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * e;
};
function ha({ zoomPanValues: t, noWheelClassName: e, d3Selection: n, d3Zoom: r, panOnScrollMode: i, panOnScrollSpeed: o, zoomOnPinch: s, onPanZoomStart: a, onPanZoom: c, onPanZoomEnd: u }) {
  return (l) => {
    if (gt(l, e))
      return l.ctrlKey && l.preventDefault(), !1;
    l.preventDefault(), l.stopImmediatePropagation();
    const h = n.property("__zoom").k || 1;
    if (l.ctrlKey && s) {
      const I = j(l), b = tr(l), R = h * Math.pow(2, b);
      r.scaleTo(n, R, I, l);
      return;
    }
    const d = l.deltaMode === 1 ? 20 : 1;
    let m = i === xt.Vertical ? 0 : l.deltaX * d, w = i === xt.Horizontal ? 0 : l.deltaY * d;
    !Gn() && l.shiftKey && i !== xt.Vertical && (m = l.deltaY * d, w = 0), r.translateBy(
      n,
      -(m / h) * o,
      -(w / h) * o,
      // @ts-ignore
      { internal: !0 }
    );
    const A = fe(n.property("__zoom"));
    clearTimeout(t.panScrollTimeout), t.isPanScrolling ? (c?.(l, A), t.panScrollTimeout = setTimeout(() => {
      u?.(l, A), t.isPanScrolling = !1;
    }, 150)) : (t.isPanScrolling = !0, a?.(l, A));
  };
}
function da({ noWheelClassName: t, preventScrolling: e, d3ZoomHandler: n }) {
  return function(r, i) {
    const o = r.type === "wheel", s = !e && o && !r.ctrlKey, a = gt(r, t);
    if (r.ctrlKey && o && a && r.preventDefault(), s || a)
      return null;
    r.preventDefault(), n.call(this, r, i);
  };
}
function pa({ zoomPanValues: t, onDraggingChange: e, onPanZoomStart: n }) {
  return (r) => {
    if (r.sourceEvent?.internal)
      return;
    const i = fe(r.transform);
    t.mouseButton = r.sourceEvent?.button || 0, t.isZoomingOrPanning = !0, t.prevViewport = i, r.sourceEvent?.type, n && n?.(r.sourceEvent, i);
  };
}
function ga({ zoomPanValues: t, panOnDrag: e, onPaneContextMenu: n, onTransformChange: r, onPanZoom: i }) {
  return (o) => {
    t.usedRightMouseButton = !!(n && jn(e, t.mouseButton ?? 0)), o.sourceEvent?.sync || r([o.transform.x, o.transform.y, o.transform.k]), i && !o.sourceEvent?.internal && i?.(o.sourceEvent, fe(o.transform));
  };
}
function ma({ zoomPanValues: t, panOnDrag: e, panOnScroll: n, onDraggingChange: r, onPanZoomEnd: i, onPaneContextMenu: o }) {
  return (s) => {
    if (!s.sourceEvent?.internal && (t.isZoomingOrPanning = !1, o && jn(e, t.mouseButton ?? 0) && !t.usedRightMouseButton && s.sourceEvent && o(s.sourceEvent), t.usedRightMouseButton = !1, i)) {
      const a = fe(s.transform);
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
function ya({ zoomActivationKeyPressed: t, zoomOnScroll: e, zoomOnPinch: n, panOnDrag: r, panOnScroll: i, zoomOnDoubleClick: o, userSelectionActive: s, noWheelClassName: a, noPanClassName: c, lib: u, connectionInProgress: l }) {
  return (h) => {
    const d = t || e, m = n && h.ctrlKey, w = h.type === "wheel";
    if (h.button === 1 && h.type === "mousedown" && (gt(h, `${u}-flow__node`) || gt(h, `${u}-flow__edge`)))
      return !0;
    if (!r && !d && !i && !o && !n || s || l && !w || gt(h, a) && w || gt(h, c) && (!w || i && w && !t) || !n && h.ctrlKey && w)
      return !1;
    if (!n && h.type === "touchstart" && h.touches?.length > 1)
      return h.preventDefault(), !1;
    if (!d && !i && !m && w || !r && (h.type === "mousedown" || h.type === "touchstart") || Array.isArray(r) && !r.includes(h.button) && h.type === "mousedown")
      return !1;
    const A = Array.isArray(r) && r.includes(h.button) || !h.button || h.button <= 1;
    return (!h.ctrlKey || w) && A;
  };
}
function xa({ domNode: t, minZoom: e, maxZoom: n, translateExtent: r, viewport: i, onPanZoom: o, onPanZoomStart: s, onPanZoomEnd: a, onDraggingChange: c }) {
  const u = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: {},
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, l = t.getBoundingClientRect(), h = Hs().scaleExtent([e, n]).translateExtent(r), d = K(t).call(h);
  R({
    x: i.x,
    y: i.y,
    zoom: zt(i.zoom, e, n)
  }, [
    [0, 0],
    [l.width, l.height]
  ], r);
  const m = d.on("wheel.zoom"), w = d.on("dblclick.zoom");
  h.wheelDelta(tr);
  function A($, _) {
    return d ? new Promise((M) => {
      h?.interpolate(_?.interpolate === "linear" ? $t : Lt).transform(ve(d, _?.duration, _?.ease, () => M(!0)), $);
    }) : Promise.resolve(!1);
  }
  function I({ noWheelClassName: $, noPanClassName: _, onPaneContextMenu: M, userSelectionActive: f, panOnScroll: g, panOnDrag: p, panOnScrollMode: x, panOnScrollSpeed: v, preventScrolling: N, zoomOnPinch: E, zoomOnScroll: S, zoomOnDoubleClick: k, zoomActivationKeyPressed: Y, lib: C, onTransformChange: O, connectionInProgress: L, paneClickDistance: F, selectionOnDrag: D }) {
    f && !u.isZoomingOrPanning && b();
    const W = g && !Y && !f;
    h.clickDistance(D ? 1 / 0 : !Se(F) || F < 0 ? 0 : F);
    const vt = W ? ha({
      zoomPanValues: u,
      noWheelClassName: $,
      d3Selection: d,
      d3Zoom: h,
      panOnScrollMode: x,
      panOnScrollSpeed: v,
      zoomOnPinch: E,
      onPanZoomStart: s,
      onPanZoom: o,
      onPanZoomEnd: a
    }) : da({
      noWheelClassName: $,
      preventScrolling: N,
      d3ZoomHandler: m
    });
    if (d.on("wheel.zoom", vt, { passive: !1 }), !f) {
      const he = pa({
        zoomPanValues: u,
        onDraggingChange: c,
        onPanZoomStart: s
      });
      h.on("start", he);
      const pt = ga({
        zoomPanValues: u,
        panOnDrag: p,
        onPaneContextMenu: !!M,
        onPanZoom: o,
        onTransformChange: O
      });
      h.on("zoom", pt);
      const de = ma({
        zoomPanValues: u,
        panOnDrag: p,
        panOnScroll: g,
        onPaneContextMenu: M,
        onPanZoomEnd: a,
        onDraggingChange: c
      });
      h.on("end", de);
    }
    const bt = ya({
      zoomActivationKeyPressed: Y,
      panOnDrag: p,
      zoomOnScroll: S,
      panOnScroll: g,
      zoomOnDoubleClick: k,
      zoomOnPinch: E,
      userSelectionActive: f,
      noPanClassName: _,
      noWheelClassName: $,
      lib: C,
      connectionInProgress: L
    });
    h.filter(bt), k ? d.on("dblclick.zoom", w) : d.on("dblclick.zoom", null);
  }
  function b() {
    h.on("zoom", null);
  }
  async function R($, _, M) {
    const f = we($), g = h?.constrain()(f, _, M);
    return g && await A(g), new Promise((p) => p(g));
  }
  async function X($, _) {
    const M = we($);
    return await A(M, _), new Promise((f) => f(M));
  }
  function y($) {
    if (d) {
      const _ = we($), M = d.property("__zoom");
      (M.k !== $.zoom || M.x !== $.x || M.y !== $.y) && h?.transform(d, _, null, { sync: !0 });
    }
  }
  function P() {
    const $ = d ? Ln(d.node()) : { x: 0, y: 0, k: 1 };
    return { x: $.x, y: $.y, zoom: $.k };
  }
  function T($, _) {
    return d ? new Promise((M) => {
      h?.interpolate(_?.interpolate === "linear" ? $t : Lt).scaleTo(ve(d, _?.duration, _?.ease, () => M(!0)), $);
    }) : Promise.resolve(!1);
  }
  function z($, _) {
    return d ? new Promise((M) => {
      h?.interpolate(_?.interpolate === "linear" ? $t : Lt).scaleBy(ve(d, _?.duration, _?.ease, () => M(!0)), $);
    }) : Promise.resolve(!1);
  }
  function B($) {
    h?.scaleExtent($);
  }
  function q($) {
    h?.translateExtent($);
  }
  function V($) {
    const _ = !Se($) || $ < 0 ? 0 : $;
    h?.clickDistance(_);
  }
  return {
    update: I,
    destroy: b,
    setViewport: X,
    setViewportConstrained: R,
    getViewport: P,
    scaleTo: T,
    scaleBy: z,
    setScaleExtent: B,
    setTranslateExtent: q,
    syncViewport: y,
    setClickDistance: V
  };
}
var mn;
(function(t) {
  t.Line = "line", t.Handle = "handle";
})(mn || (mn = {}));
function _a() {
  return {
    nodes: [],
    edges: [],
    nodeLookup: /* @__PURE__ */ new Map(),
    parentLookup: /* @__PURE__ */ new Map(),
    nodeExtent: Zn,
    snapGrid: [15, 15],
    snapToGrid: !1,
    nodeOrigin: [0, 0],
    multiSelectionActive: !1,
    transform: [0, 0, 1],
    autoPanOnNodeDrag: !0,
    nodesDraggable: !0,
    selectNodesOnDrag: !0,
    nodeDragThreshold: 0,
    panZoom: null,
    domNode: null
  };
}
var wa = Object.defineProperty, va = Object.getOwnPropertyDescriptor, qe = (t, e, n, r) => {
  for (var i = r > 1 ? void 0 : r ? va(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (r ? s(e, n, i) : s(i)) || i);
  return r && i && wa(e, n, i), i;
};
let Ct = class extends ze {
  constructor() {
    super(...arguments), this.label = "", this.selected = !1;
  }
  render() {
    return qt`
      <div class="label">${this.label}</div>
      <slot></slot>
    `;
  }
};
Ct.styles = ke`
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

    .label {
      font-size: 12px;
      color: #222;
    }
  `;
qe([
  U({ type: String })
], Ct.prototype, "label", 2);
qe([
  U({ type: Boolean, reflect: !0 })
], Ct.prototype, "selected", 2);
Ct = qe([
  Ie("lit-node")
], Ct);
var ba = Object.defineProperty, Na = Object.getOwnPropertyDescriptor, ut = (t, e, n, r) => {
  for (var i = r > 1 ? void 0 : r ? Na(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (r ? s(e, n, i) : s(i)) || i);
  return r && i && ba(e, n, i), i;
};
let nt = class extends ze {
  constructor() {
    super(...arguments), this.sourceX = 0, this.sourceY = 0, this.targetX = 0, this.targetY = 0, this.sourcePosition = H.Right, this.targetPosition = H.Left, this.selected = !1;
  }
  render() {
    const [t] = ta({
      sourceX: this.sourceX,
      sourceY: this.sourceY,
      sourcePosition: this.sourcePosition,
      targetX: this.targetX,
      targetY: this.targetY,
      targetPosition: this.targetPosition
    });
    return ir`
      <path d="${t}" />
    `;
  }
};
nt.styles = ke`
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
ut([
  U({ type: Number })
], nt.prototype, "sourceX", 2);
ut([
  U({ type: Number })
], nt.prototype, "sourceY", 2);
ut([
  U({ type: Number })
], nt.prototype, "targetX", 2);
ut([
  U({ type: Number })
], nt.prototype, "targetY", 2);
ut([
  U({ type: String })
], nt.prototype, "sourcePosition", 2);
ut([
  U({ type: String })
], nt.prototype, "targetPosition", 2);
ut([
  U({ type: Boolean, reflect: !0 })
], nt.prototype, "selected", 2);
nt = ut([
  Ie("lit-edge")
], nt);
var Ea = Object.defineProperty, Ta = Object.getOwnPropertyDescriptor, dt = (t, e, n, r) => {
  for (var i = r > 1 ? void 0 : r ? Ta(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (r ? s(e, n, i) : s(i)) || i);
  return r && i && Ea(e, n, i), i;
};
let at = class extends ze {
  constructor() {
    super(...arguments), this._drags = /* @__PURE__ */ new Map(), this._state = _a(), this.edges = [], this.viewport = { x: 0, y: 0, zoom: 1 };
  }
  set nodes(t) {
    const e = this._state.nodes;
    this._state.nodes = t, ia(t, this._state.nodeLookup, this._state.parentLookup, {
      nodeOrigin: this._state.nodeOrigin,
      nodeExtent: this._state.nodeExtent
    }), this.requestUpdate("nodes", e);
  }
  get nodes() {
    return this._state.nodes;
  }
  firstUpdated() {
    this._renderer && (this._state.domNode = this._renderer, this._panZoom = xa({
      domNode: this._renderer,
      minZoom: 0.5,
      maxZoom: 2,
      translateExtent: this._state.nodeExtent,
      viewport: this.viewport,
      onDraggingChange: () => {
      },
      onPanZoom: (t, { x: e, y: n, zoom: r }) => {
        this.viewport = { x: e, y: n, zoom: r }, this._state.transform = [e, n, r], this._viewport && (this._viewport.style.transform = `translate(${e}px,${n}px) scale(${r})`);
      }
    }), this._panZoom.update({
      noWheelClassName: "nowheel",
      noPanClassName: "nopan",
      preventScrolling: !0,
      panOnScroll: !1,
      panOnDrag: !0,
      panOnScrollMode: xt.Free,
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
      if (n && !this._drags.has(n)) {
        const r = ca({
          getStoreItems: () => ({
            ...this._state,
            panBy: async (i) => {
              const { transform: o, panZoom: s, nodeExtent: a } = this._state;
              return s ? !!await s.setViewportConstrained(
                {
                  x: o[0] + i.x,
                  y: o[1] + i.y,
                  zoom: o[2]
                },
                [[0, 0], [this.offsetWidth, this.offsetHeight]],
                a
              ) : !1;
            },
            updateNodePositions: (i) => {
              i.forEach((o, s) => {
                const a = this._state.nodeLookup.get(s);
                a && (a.position = o.position);
              }), this.requestUpdate();
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
    return qt`
      <div class="xyflow__renderer">
        <div
          class="xyflow__viewport"
          style="transform: translate(${this.viewport.x}px, ${this.viewport.y}px) scale(${this.viewport.zoom})"
        >
          <svg class="xyflow__edges">
            ${this.edges.map((t) => {
      const e = this._state.nodeLookup.get(t.source), n = this._state.nodeLookup.get(t.target);
      if (!e || !n) return null;
      const r = e.internals.positionAbsolute.x + (e.measured.width || 0), i = e.internals.positionAbsolute.y + (e.measured.height || 0) / 2, o = n.internals.positionAbsolute.x, s = n.internals.positionAbsolute.y + (n.measured.height || 0) / 2;
      return qt`
                <lit-edge
                  .sourceX="${r}"
                  .sourceY="${i}"
                  .targetX="${o}"
                  .targetY="${s}"
                  ?selected="${t.selected}"
                ></lit-edge>
              `;
    })}
          </svg>
          <div class="xyflow__nodes">
            ${this.nodes.map((t) => {
      const n = this._state.nodeLookup.get(t.id)?.position || t.position;
      return qt`
                <lit-node
                  class="xyflow__node"
                  data-id="${t.id}"
                  style="transform: translate(${n.x}px, ${n.y}px)"
                  .label="${t.data.label}"
                  ?selected="${t.selected}"
                >
                </lit-node>
              `;
    })}
          </div>
        </div>
      </div>
    `;
  }
};
at.styles = ke`
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
dt([
  yn(".xyflow__renderer")
], at.prototype, "_renderer", 2);
dt([
  yn(".xyflow__viewport")
], at.prototype, "_viewport", 2);
dt([
  or()
], at.prototype, "_state", 2);
dt([
  U({ type: Array })
], at.prototype, "nodes", 1);
dt([
  U({ type: Array })
], at.prototype, "edges", 2);
dt([
  U({ type: Object })
], at.prototype, "viewport", 2);
at = dt([
  Ie("lit-flow")
], at);
