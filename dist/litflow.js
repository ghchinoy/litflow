import { css as se, LitElement as ae, html as Vt, svg as lr } from "lit";
import { html as we, unsafeStatic as cr } from "lit/static-html.js";
import { property as L, customElement as ue, query as bn, state as fr } from "lit/decorators.js";
var hr = { value: () => {
} };
function le() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new Zt(n);
}
function Zt(t) {
  this._ = t;
}
function dr(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
Zt.prototype = le.prototype = {
  constructor: Zt,
  on: function(t, e) {
    var n = this._, r = dr(t + "", n), i, o = -1, s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; ) if ((i = (t = r[o]).type) && (i = pr(n[i], t.name))) return i;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++o < s; )
      if (i = (t = r[o]).type) n[i] = Ge(n[i], t.name, e);
      else if (e == null) for (i in n) n[i] = Ge(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new Zt(t);
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
function pr(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function Ge(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = hr, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var Pe = "http://www.w3.org/1999/xhtml";
const Ue = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Pe,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function ce(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), Ue.hasOwnProperty(e) ? { space: Ue[e], local: t } : t;
}
function gr(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === Pe && e.documentElement.namespaceURI === Pe ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function yr(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Nn(t) {
  var e = ce(t);
  return (e.local ? yr : gr)(e);
}
function mr() {
}
function Be(t) {
  return t == null ? mr : function() {
    return this.querySelector(t);
  };
}
function xr(t) {
  typeof t != "function" && (t = Be(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], s = o.length, a = r[i] = new Array(s), c, u, l = 0; l < s; ++l)
      (c = o[l]) && (u = t.call(c, c.__data__, l, o)) && ("__data__" in c && (u.__data__ = c.__data__), a[l] = u);
  return new U(r, this._parents);
}
function _r(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function wr() {
  return [];
}
function En(t) {
  return t == null ? wr : function() {
    return this.querySelectorAll(t);
  };
}
function vr(t) {
  return function() {
    return _r(t.apply(this, arguments));
  };
}
function br(t) {
  typeof t == "function" ? t = vr(t) : t = En(t);
  for (var e = this._groups, n = e.length, r = [], i = [], o = 0; o < n; ++o)
    for (var s = e[o], a = s.length, c, u = 0; u < a; ++u)
      (c = s[u]) && (r.push(t.call(c, c.__data__, u, s)), i.push(c));
  return new U(r, i);
}
function Tn(t) {
  return function() {
    return this.matches(t);
  };
}
function $n(t) {
  return function(e) {
    return e.matches(t);
  };
}
var Nr = Array.prototype.find;
function Er(t) {
  return function() {
    return Nr.call(this.children, t);
  };
}
function Tr() {
  return this.firstElementChild;
}
function $r(t) {
  return this.select(t == null ? Tr : Er(typeof t == "function" ? t : $n(t)));
}
var Ar = Array.prototype.filter;
function Mr() {
  return Array.from(this.children);
}
function Pr(t) {
  return function() {
    return Ar.call(this.children, t);
  };
}
function kr(t) {
  return this.selectAll(t == null ? Mr : Pr(typeof t == "function" ? t : $n(t)));
}
function Sr(t) {
  typeof t != "function" && (t = Tn(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], s = o.length, a = r[i] = [], c, u = 0; u < s; ++u)
      (c = o[u]) && t.call(c, c.__data__, u, o) && a.push(c);
  return new U(r, this._parents);
}
function An(t) {
  return new Array(t.length);
}
function zr() {
  return new U(this._enter || this._groups.map(An), this._parents);
}
function Jt(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
Jt.prototype = {
  constructor: Jt,
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
function Cr(t) {
  return function() {
    return t;
  };
}
function Ir(t, e, n, r, i, o) {
  for (var s = 0, a, c = e.length, u = o.length; s < u; ++s)
    (a = e[s]) ? (a.__data__ = o[s], r[s] = a) : n[s] = new Jt(t, o[s]);
  for (; s < c; ++s)
    (a = e[s]) && (i[s] = a);
}
function Dr(t, e, n, r, i, o, s) {
  var a, c, u = /* @__PURE__ */ new Map(), l = e.length, h = o.length, d = new Array(l), y;
  for (a = 0; a < l; ++a)
    (c = e[a]) && (d[a] = y = s.call(c, c.__data__, a, e) + "", u.has(y) ? i[a] = c : u.set(y, c));
  for (a = 0; a < h; ++a)
    y = s.call(t, o[a], a, o) + "", (c = u.get(y)) ? (r[a] = c, c.__data__ = o[a], u.delete(y)) : n[a] = new Jt(t, o[a]);
  for (a = 0; a < l; ++a)
    (c = e[a]) && u.get(d[a]) === c && (i[a] = c);
}
function Or(t) {
  return t.__data__;
}
function Rr(t, e) {
  if (!arguments.length) return Array.from(this, Or);
  var n = e ? Dr : Ir, r = this._parents, i = this._groups;
  typeof t != "function" && (t = Cr(t));
  for (var o = i.length, s = new Array(o), a = new Array(o), c = new Array(o), u = 0; u < o; ++u) {
    var l = r[u], h = i[u], d = h.length, y = Br(t.call(l, l && l.__data__, u, r)), w = y.length, $ = a[u] = new Array(w), I = s[u] = new Array(w), b = c[u] = new Array(d);
    n(l, h, $, I, b, y, e);
    for (var R = 0, H = 0, m, P; R < w; ++R)
      if (m = $[R]) {
        for (R >= H && (H = R + 1); !(P = I[H]) && ++H < w; ) ;
        m._next = P || null;
      }
  }
  return s = new U(s, r), s._enter = a, s._exit = c, s;
}
function Br(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Hr() {
  return new U(this._exit || this._groups.map(An), this._parents);
}
function Xr(t, e, n) {
  var r = this.enter(), i = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? o.remove() : n(o), r && i ? r.merge(i).order() : i;
}
function Yr(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, o = r.length, s = Math.min(i, o), a = new Array(i), c = 0; c < s; ++c)
    for (var u = n[c], l = r[c], h = u.length, d = a[c] = new Array(h), y, w = 0; w < h; ++w)
      (y = u[w] || l[w]) && (d[w] = y);
  for (; c < i; ++c)
    a[c] = n[c];
  return new U(a, this._parents);
}
function Fr() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) && (o && s.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(s, o), o = s);
  return this;
}
function qr(t) {
  t || (t = Lr);
  function e(h, d) {
    return h && d ? t(h.__data__, d.__data__) : !h - !d;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), o = 0; o < r; ++o) {
    for (var s = n[o], a = s.length, c = i[o] = new Array(a), u, l = 0; l < a; ++l)
      (u = s[l]) && (c[l] = u);
    c.sort(e);
  }
  return new U(i, this._parents).order();
}
function Lr(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Vr() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Zr() {
  return Array.from(this);
}
function Gr() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s) return s;
    }
  return null;
}
function Ur() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function Wr() {
  return !this.node();
}
function Kr(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], o = 0, s = i.length, a; o < s; ++o)
      (a = i[o]) && t.call(a, a.__data__, o, i);
  return this;
}
function Qr(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Jr(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function jr(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function ti(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function ei(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function ni(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function ri(t, e) {
  var n = ce(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? Jr : Qr : typeof e == "function" ? n.local ? ni : ei : n.local ? ti : jr)(n, e));
}
function Mn(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function ii(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function oi(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function si(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function ai(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? ii : typeof e == "function" ? si : oi)(t, e, n ?? "")) : _t(this.node(), t);
}
function _t(t, e) {
  return t.style.getPropertyValue(e) || Mn(t).getComputedStyle(t, null).getPropertyValue(e);
}
function ui(t) {
  return function() {
    delete this[t];
  };
}
function li(t, e) {
  return function() {
    this[t] = e;
  };
}
function ci(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function fi(t, e) {
  return arguments.length > 1 ? this.each((e == null ? ui : typeof e == "function" ? ci : li)(t, e)) : this.node()[t];
}
function Pn(t) {
  return t.trim().split(/^|\s+/);
}
function He(t) {
  return t.classList || new kn(t);
}
function kn(t) {
  this._node = t, this._names = Pn(t.getAttribute("class") || "");
}
kn.prototype = {
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
function Sn(t, e) {
  for (var n = He(t), r = -1, i = e.length; ++r < i; ) n.add(e[r]);
}
function zn(t, e) {
  for (var n = He(t), r = -1, i = e.length; ++r < i; ) n.remove(e[r]);
}
function hi(t) {
  return function() {
    Sn(this, t);
  };
}
function di(t) {
  return function() {
    zn(this, t);
  };
}
function pi(t, e) {
  return function() {
    (e.apply(this, arguments) ? Sn : zn)(this, t);
  };
}
function gi(t, e) {
  var n = Pn(t + "");
  if (arguments.length < 2) {
    for (var r = He(this.node()), i = -1, o = n.length; ++i < o; ) if (!r.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? pi : e ? hi : di)(n, e));
}
function yi() {
  this.textContent = "";
}
function mi(t) {
  return function() {
    this.textContent = t;
  };
}
function xi(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function _i(t) {
  return arguments.length ? this.each(t == null ? yi : (typeof t == "function" ? xi : mi)(t)) : this.node().textContent;
}
function wi() {
  this.innerHTML = "";
}
function vi(t) {
  return function() {
    this.innerHTML = t;
  };
}
function bi(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function Ni(t) {
  return arguments.length ? this.each(t == null ? wi : (typeof t == "function" ? bi : vi)(t)) : this.node().innerHTML;
}
function Ei() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Ti() {
  return this.each(Ei);
}
function $i() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Ai() {
  return this.each($i);
}
function Mi(t) {
  var e = typeof t == "function" ? t : Nn(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Pi() {
  return null;
}
function ki(t, e) {
  var n = typeof t == "function" ? t : Nn(t), r = e == null ? Pi : typeof e == "function" ? e : Be(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function Si() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function zi() {
  return this.each(Si);
}
function Ci() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Ii() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Di(t) {
  return this.select(t ? Ii : Ci);
}
function Oi(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Ri(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function Bi(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function Hi(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, o; n < i; ++n)
        o = e[n], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : e[++r] = o;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function Xi(t, e, n) {
  return function() {
    var r = this.__on, i, o = Ri(e);
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
function Yi(t, e, n) {
  var r = Bi(t + ""), i, o = r.length, s;
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
  for (a = e ? Xi : Hi, i = 0; i < o; ++i) this.each(a(r[i], e, n));
  return this;
}
function Cn(t, e, n) {
  var r = Mn(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function Fi(t, e) {
  return function() {
    return Cn(this, t, e);
  };
}
function qi(t, e) {
  return function() {
    return Cn(this, t, e.apply(this, arguments));
  };
}
function Li(t, e) {
  return this.each((typeof e == "function" ? qi : Fi)(t, e));
}
function* Vi() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var In = [null];
function U(t, e) {
  this._groups = t, this._parents = e;
}
function Ot() {
  return new U([[document.documentElement]], In);
}
function Zi() {
  return this;
}
U.prototype = Ot.prototype = {
  constructor: U,
  select: xr,
  selectAll: br,
  selectChild: $r,
  selectChildren: kr,
  filter: Sr,
  data: Rr,
  enter: zr,
  exit: Hr,
  join: Xr,
  merge: Yr,
  selection: Zi,
  order: Fr,
  sort: qr,
  call: Vr,
  nodes: Zr,
  node: Gr,
  size: Ur,
  empty: Wr,
  each: Kr,
  attr: ri,
  style: ai,
  property: fi,
  classed: gi,
  text: _i,
  html: Ni,
  raise: Ti,
  lower: Ai,
  append: Mi,
  insert: ki,
  remove: zi,
  clone: Di,
  datum: Oi,
  on: Yi,
  dispatch: Li,
  [Symbol.iterator]: Vi
};
function K(t) {
  return typeof t == "string" ? new U([[document.querySelector(t)]], [document.documentElement]) : new U([[t]], In);
}
function Gi(t) {
  let e;
  for (; e = t.sourceEvent; ) t = e;
  return t;
}
function j(t, e) {
  if (t = Gi(t), e === void 0 && (e = t.currentTarget), e) {
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
const Ui = { passive: !1 }, kt = { capture: !0, passive: !1 };
function ve(t) {
  t.stopImmediatePropagation();
}
function yt(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Dn(t) {
  var e = t.document.documentElement, n = K(t).on("dragstart.drag", yt, kt);
  "onselectstart" in e ? n.on("selectstart.drag", yt, kt) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function On(t, e) {
  var n = t.document.documentElement, r = K(t).on("dragstart.drag", null);
  e && (r.on("click.drag", yt, kt), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const Ht = (t) => () => t;
function ke(t, {
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
ke.prototype.on = function() {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function Wi(t) {
  return !t.ctrlKey && !t.button;
}
function Ki() {
  return this.parentNode;
}
function Qi(t, e) {
  return e ?? { x: t.x, y: t.y };
}
function Ji() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function ji() {
  var t = Wi, e = Ki, n = Qi, r = Ji, i = {}, o = le("start", "drag", "end"), s = 0, a, c, u, l, h = 0;
  function d(m) {
    m.on("mousedown.drag", y).filter(r).on("touchstart.drag", I).on("touchmove.drag", b, Ui).on("touchend.drag touchcancel.drag", R).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function y(m, P) {
    if (!(l || !t.call(this, m, P))) {
      var T = H(this, e.call(this, m, P), m, P, "mouse");
      T && (K(m.view).on("mousemove.drag", w, kt).on("mouseup.drag", $, kt), Dn(m.view), ve(m), u = !1, a = m.clientX, c = m.clientY, T("start", m));
    }
  }
  function w(m) {
    if (yt(m), !u) {
      var P = m.clientX - a, T = m.clientY - c;
      u = P * P + T * T > h;
    }
    i.mouse("drag", m);
  }
  function $(m) {
    K(m.view).on("mousemove.drag mouseup.drag", null), On(m.view, u), yt(m), i.mouse("end", m);
  }
  function I(m, P) {
    if (t.call(this, m, P)) {
      var T = m.changedTouches, z = e.call(this, m, P), X = T.length, q, V;
      for (q = 0; q < X; ++q)
        (V = H(this, z, m, P, T[q].identifier, T[q])) && (ve(m), V("start", m, T[q]));
    }
  }
  function b(m) {
    var P = m.changedTouches, T = P.length, z, X;
    for (z = 0; z < T; ++z)
      (X = i[P[z].identifier]) && (yt(m), X("drag", m, P[z]));
  }
  function R(m) {
    var P = m.changedTouches, T = P.length, z, X;
    for (l && clearTimeout(l), l = setTimeout(function() {
      l = null;
    }, 500), z = 0; z < T; ++z)
      (X = i[P[z].identifier]) && (ve(m), X("end", m, P[z]));
  }
  function H(m, P, T, z, X, q) {
    var V = o.copy(), A = j(q || T, P), _, M, f;
    if ((f = n.call(m, new ke("beforestart", {
      sourceEvent: T,
      target: d,
      identifier: X,
      active: s,
      x: A[0],
      y: A[1],
      dx: 0,
      dy: 0,
      dispatch: V
    }), z)) != null)
      return _ = f.x - A[0] || 0, M = f.y - A[1] || 0, function g(p, x, v) {
        var N = A, E;
        switch (p) {
          case "start":
            i[X] = g, E = s++;
            break;
          case "end":
            delete i[X], --s;
          // falls through
          case "drag":
            A = j(v || x, P), E = s;
            break;
        }
        V.call(
          p,
          m,
          new ke(p, {
            sourceEvent: x,
            subject: f,
            target: d,
            identifier: X,
            active: E,
            x: A[0] + _,
            y: A[1] + M,
            dx: A[0] - N[0],
            dy: A[1] - N[1],
            dispatch: V
          }),
          z
        );
      };
  }
  return d.filter = function(m) {
    return arguments.length ? (t = typeof m == "function" ? m : Ht(!!m), d) : t;
  }, d.container = function(m) {
    return arguments.length ? (e = typeof m == "function" ? m : Ht(m), d) : e;
  }, d.subject = function(m) {
    return arguments.length ? (n = typeof m == "function" ? m : Ht(m), d) : n;
  }, d.touchable = function(m) {
    return arguments.length ? (r = typeof m == "function" ? m : Ht(!!m), d) : r;
  }, d.on = function() {
    var m = o.on.apply(o, arguments);
    return m === o ? d : m;
  }, d.clickDistance = function(m) {
    return arguments.length ? (h = (m = +m) * m, d) : Math.sqrt(h);
  }, d;
}
function Xe(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function Rn(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e) n[r] = e[r];
  return n;
}
function Rt() {
}
var St = 0.7, jt = 1 / St, mt = "\\s*([+-]?\\d+)\\s*", zt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", et = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", to = /^#([0-9a-f]{3,8})$/, eo = new RegExp(`^rgb\\(${mt},${mt},${mt}\\)$`), no = new RegExp(`^rgb\\(${et},${et},${et}\\)$`), ro = new RegExp(`^rgba\\(${mt},${mt},${mt},${zt}\\)$`), io = new RegExp(`^rgba\\(${et},${et},${et},${zt}\\)$`), oo = new RegExp(`^hsl\\(${zt},${et},${et}\\)$`), so = new RegExp(`^hsla\\(${zt},${et},${et},${zt}\\)$`), We = {
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
Xe(Rt, ht, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Ke,
  // Deprecated! Use color.formatHex.
  formatHex: Ke,
  formatHex8: ao,
  formatHsl: uo,
  formatRgb: Qe,
  toString: Qe
});
function Ke() {
  return this.rgb().formatHex();
}
function ao() {
  return this.rgb().formatHex8();
}
function uo() {
  return Bn(this).formatHsl();
}
function Qe() {
  return this.rgb().formatRgb();
}
function ht(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = to.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? Je(e) : n === 3 ? new G(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? Xt(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? Xt(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = eo.exec(t)) ? new G(e[1], e[2], e[3], 1) : (e = no.exec(t)) ? new G(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = ro.exec(t)) ? Xt(e[1], e[2], e[3], e[4]) : (e = io.exec(t)) ? Xt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = oo.exec(t)) ? en(e[1], e[2] / 100, e[3] / 100, 1) : (e = so.exec(t)) ? en(e[1], e[2] / 100, e[3] / 100, e[4]) : We.hasOwnProperty(t) ? Je(We[t]) : t === "transparent" ? new G(NaN, NaN, NaN, 0) : null;
}
function Je(t) {
  return new G(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Xt(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new G(t, e, n, r);
}
function lo(t) {
  return t instanceof Rt || (t = ht(t)), t ? (t = t.rgb(), new G(t.r, t.g, t.b, t.opacity)) : new G();
}
function Se(t, e, n, r) {
  return arguments.length === 1 ? lo(t) : new G(t, e, n, r ?? 1);
}
function G(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
Xe(G, Se, Rn(Rt, {
  brighter(t) {
    return t = t == null ? jt : Math.pow(jt, t), new G(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? St : Math.pow(St, t), new G(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new G(ft(this.r), ft(this.g), ft(this.b), te(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: je,
  // Deprecated! Use color.formatHex.
  formatHex: je,
  formatHex8: co,
  formatRgb: tn,
  toString: tn
}));
function je() {
  return `#${ct(this.r)}${ct(this.g)}${ct(this.b)}`;
}
function co() {
  return `#${ct(this.r)}${ct(this.g)}${ct(this.b)}${ct((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function tn() {
  const t = te(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${ft(this.r)}, ${ft(this.g)}, ${ft(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function te(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function ft(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function ct(t) {
  return t = ft(t), (t < 16 ? "0" : "") + t.toString(16);
}
function en(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new Q(t, e, n, r);
}
function Bn(t) {
  if (t instanceof Q) return new Q(t.h, t.s, t.l, t.opacity);
  if (t instanceof Rt || (t = ht(t)), !t) return new Q();
  if (t instanceof Q) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), o = Math.max(e, n, r), s = NaN, a = o - i, c = (o + i) / 2;
  return a ? (e === o ? s = (n - r) / a + (n < r) * 6 : n === o ? s = (r - e) / a + 2 : s = (e - n) / a + 4, a /= c < 0.5 ? o + i : 2 - o - i, s *= 60) : a = c > 0 && c < 1 ? 0 : s, new Q(s, a, c, t.opacity);
}
function fo(t, e, n, r) {
  return arguments.length === 1 ? Bn(t) : new Q(t, e, n, r ?? 1);
}
function Q(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
Xe(Q, fo, Rn(Rt, {
  brighter(t) {
    return t = t == null ? jt : Math.pow(jt, t), new Q(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? St : Math.pow(St, t), new Q(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new G(
      be(t >= 240 ? t - 240 : t + 120, i, r),
      be(t, i, r),
      be(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new Q(nn(this.h), Yt(this.s), Yt(this.l), te(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = te(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${nn(this.h)}, ${Yt(this.s) * 100}%, ${Yt(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function nn(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function Yt(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function be(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const Ye = (t) => () => t;
function ho(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function po(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function go(t) {
  return (t = +t) == 1 ? Hn : function(e, n) {
    return n - e ? po(e, n, t) : Ye(isNaN(e) ? n : e);
  };
}
function Hn(t, e) {
  var n = e - t;
  return n ? ho(t, n) : Ye(isNaN(t) ? e : t);
}
const ee = (function t(e) {
  var n = go(e);
  function r(i, o) {
    var s = n((i = Se(i)).r, (o = Se(o)).r), a = n(i.g, o.g), c = n(i.b, o.b), u = Hn(i.opacity, o.opacity);
    return function(l) {
      return i.r = s(l), i.g = a(l), i.b = c(l), i.opacity = u(l), i + "";
    };
  }
  return r.gamma = t, r;
})(1);
function yo(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, r = e.slice(), i;
  return function(o) {
    for (i = 0; i < n; ++i) r[i] = t[i] * (1 - o) + e[i] * o;
    return r;
  };
}
function mo(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function xo(t, e) {
  var n = e ? e.length : 0, r = t ? Math.min(n, t.length) : 0, i = new Array(r), o = new Array(n), s;
  for (s = 0; s < r; ++s) i[s] = Pt(t[s], e[s]);
  for (; s < n; ++s) o[s] = e[s];
  return function(a) {
    for (s = 0; s < r; ++s) o[s] = i[s](a);
    return o;
  };
}
function _o(t, e) {
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
function wo(t, e) {
  var n = {}, r = {}, i;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (i in e)
    i in t ? n[i] = Pt(t[i], e[i]) : r[i] = e[i];
  return function(o) {
    for (i in n) r[i] = n[i](o);
    return r;
  };
}
var ze = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Ne = new RegExp(ze.source, "g");
function vo(t) {
  return function() {
    return t;
  };
}
function bo(t) {
  return function(e) {
    return t(e) + "";
  };
}
function Xn(t, e) {
  var n = ze.lastIndex = Ne.lastIndex = 0, r, i, o, s = -1, a = [], c = [];
  for (t = t + "", e = e + ""; (r = ze.exec(t)) && (i = Ne.exec(e)); )
    (o = i.index) > n && (o = e.slice(n, o), a[s] ? a[s] += o : a[++s] = o), (r = r[0]) === (i = i[0]) ? a[s] ? a[s] += i : a[++s] = i : (a[++s] = null, c.push({ i: s, x: tt(r, i) })), n = Ne.lastIndex;
  return n < e.length && (o = e.slice(n), a[s] ? a[s] += o : a[++s] = o), a.length < 2 ? c[0] ? bo(c[0].x) : vo(e) : (e = c.length, function(u) {
    for (var l = 0, h; l < e; ++l) a[(h = c[l]).i] = h.x(u);
    return a.join("");
  });
}
function Pt(t, e) {
  var n = typeof e, r;
  return e == null || n === "boolean" ? Ye(e) : (n === "number" ? tt : n === "string" ? (r = ht(e)) ? (e = r, ee) : Xn : e instanceof ht ? ee : e instanceof Date ? _o : mo(e) ? yo : Array.isArray(e) ? xo : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? wo : tt)(t, e);
}
var rn = 180 / Math.PI, Ce = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Yn(t, e, n, r, i, o) {
  var s, a, c;
  return (s = Math.sqrt(t * t + e * e)) && (t /= s, e /= s), (c = t * n + e * r) && (n -= t * c, r -= e * c), (a = Math.sqrt(n * n + r * r)) && (n /= a, r /= a, c /= a), t * r < e * n && (t = -t, e = -e, c = -c, s = -s), {
    translateX: i,
    translateY: o,
    rotate: Math.atan2(e, t) * rn,
    skewX: Math.atan(c) * rn,
    scaleX: s,
    scaleY: a
  };
}
var Ft;
function No(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? Ce : Yn(e.a, e.b, e.c, e.d, e.e, e.f);
}
function Eo(t) {
  return t == null || (Ft || (Ft = document.createElementNS("http://www.w3.org/2000/svg", "g")), Ft.setAttribute("transform", t), !(t = Ft.transform.baseVal.consolidate())) ? Ce : (t = t.matrix, Yn(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Fn(t, e, n, r) {
  function i(u) {
    return u.length ? u.pop() + " " : "";
  }
  function o(u, l, h, d, y, w) {
    if (u !== h || l !== d) {
      var $ = y.push("translate(", null, e, null, n);
      w.push({ i: $ - 4, x: tt(u, h) }, { i: $ - 2, x: tt(l, d) });
    } else (h || d) && y.push("translate(" + h + e + d + n);
  }
  function s(u, l, h, d) {
    u !== l ? (u - l > 180 ? l += 360 : l - u > 180 && (u += 360), d.push({ i: h.push(i(h) + "rotate(", null, r) - 2, x: tt(u, l) })) : l && h.push(i(h) + "rotate(" + l + r);
  }
  function a(u, l, h, d) {
    u !== l ? d.push({ i: h.push(i(h) + "skewX(", null, r) - 2, x: tt(u, l) }) : l && h.push(i(h) + "skewX(" + l + r);
  }
  function c(u, l, h, d, y, w) {
    if (u !== h || l !== d) {
      var $ = y.push(i(y) + "scale(", null, ",", null, ")");
      w.push({ i: $ - 4, x: tt(u, h) }, { i: $ - 2, x: tt(l, d) });
    } else (h !== 1 || d !== 1) && y.push(i(y) + "scale(" + h + "," + d + ")");
  }
  return function(u, l) {
    var h = [], d = [];
    return u = t(u), l = t(l), o(u.translateX, u.translateY, l.translateX, l.translateY, h, d), s(u.rotate, l.rotate, h, d), a(u.skewX, l.skewX, h, d), c(u.scaleX, u.scaleY, l.scaleX, l.scaleY, h, d), u = l = null, function(y) {
      for (var w = -1, $ = d.length, I; ++w < $; ) h[(I = d[w]).i] = I.x(y);
      return h.join("");
    };
  };
}
var To = Fn(No, "px, ", "px)", "deg)"), $o = Fn(Eo, ", ", ")", ")"), Ao = 1e-12;
function on(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function Mo(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function Po(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const Gt = (function t(e, n, r) {
  function i(o, s) {
    var a = o[0], c = o[1], u = o[2], l = s[0], h = s[1], d = s[2], y = l - a, w = h - c, $ = y * y + w * w, I, b;
    if ($ < Ao)
      b = Math.log(d / u) / e, I = function(z) {
        return [
          a + z * y,
          c + z * w,
          u * Math.exp(e * z * b)
        ];
      };
    else {
      var R = Math.sqrt($), H = (d * d - u * u + r * $) / (2 * u * n * R), m = (d * d - u * u - r * $) / (2 * d * n * R), P = Math.log(Math.sqrt(H * H + 1) - H), T = Math.log(Math.sqrt(m * m + 1) - m);
      b = (T - P) / e, I = function(z) {
        var X = z * b, q = on(P), V = u / (n * R) * (q * Po(e * X + P) - Mo(P));
        return [
          a + V * y,
          c + V * w,
          u * q / on(e * X + P)
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
var wt = 0, At = 0, Tt = 0, qn = 1e3, ne, Mt, re = 0, dt = 0, fe = 0, Ct = typeof performance == "object" && performance.now ? performance : Date, Ln = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Fe() {
  return dt || (Ln(ko), dt = Ct.now() + fe);
}
function ko() {
  dt = 0;
}
function ie() {
  this._call = this._time = this._next = null;
}
ie.prototype = Vn.prototype = {
  constructor: ie,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Fe() : +n) + (e == null ? 0 : +e), !this._next && Mt !== this && (Mt ? Mt._next = this : ne = this, Mt = this), this._call = t, this._time = n, Ie();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Ie());
  }
};
function Vn(t, e, n) {
  var r = new ie();
  return r.restart(t, e, n), r;
}
function So() {
  Fe(), ++wt;
  for (var t = ne, e; t; )
    (e = dt - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --wt;
}
function sn() {
  dt = (re = Ct.now()) + fe, wt = At = 0;
  try {
    So();
  } finally {
    wt = 0, Co(), dt = 0;
  }
}
function zo() {
  var t = Ct.now(), e = t - re;
  e > qn && (fe -= e, re = t);
}
function Co() {
  for (var t, e = ne, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : ne = n);
  Mt = t, Ie(r);
}
function Ie(t) {
  if (!wt) {
    At && (At = clearTimeout(At));
    var e = t - dt;
    e > 24 ? (t < 1 / 0 && (At = setTimeout(sn, t - Ct.now() - fe)), Tt && (Tt = clearInterval(Tt))) : (Tt || (re = Ct.now(), Tt = setInterval(zo, qn)), wt = 1, Ln(sn));
  }
}
function an(t, e, n) {
  var r = new ie();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var Io = le("start", "end", "cancel", "interrupt"), Do = [], Zn = 0, un = 1, De = 2, Ut = 3, ln = 4, Oe = 5, Wt = 6;
function he(t, e, n, r, i, o) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (n in s) return;
  Oo(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Io,
    tween: Do,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Zn
  });
}
function qe(t, e) {
  var n = J(t, e);
  if (n.state > Zn) throw new Error("too late; already scheduled");
  return n;
}
function it(t, e) {
  var n = J(t, e);
  if (n.state > Ut) throw new Error("too late; already running");
  return n;
}
function J(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function Oo(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = Vn(o, 0, n.time);
  function o(u) {
    n.state = un, n.timer.restart(s, n.delay, n.time), n.delay <= u && s(u - n.delay);
  }
  function s(u) {
    var l, h, d, y;
    if (n.state !== un) return c();
    for (l in r)
      if (y = r[l], y.name === n.name) {
        if (y.state === Ut) return an(s);
        y.state === ln ? (y.state = Wt, y.timer.stop(), y.on.call("interrupt", t, t.__data__, y.index, y.group), delete r[l]) : +l < e && (y.state = Wt, y.timer.stop(), y.on.call("cancel", t, t.__data__, y.index, y.group), delete r[l]);
      }
    if (an(function() {
      n.state === Ut && (n.state = ln, n.timer.restart(a, n.delay, n.time), a(u));
    }), n.state = De, n.on.call("start", t, t.__data__, n.index, n.group), n.state === De) {
      for (n.state = Ut, i = new Array(d = n.tween.length), l = 0, h = -1; l < d; ++l)
        (y = n.tween[l].value.call(t, t.__data__, n.index, n.group)) && (i[++h] = y);
      i.length = h + 1;
    }
  }
  function a(u) {
    for (var l = u < n.duration ? n.ease.call(null, u / n.duration) : (n.timer.restart(c), n.state = Oe, 1), h = -1, d = i.length; ++h < d; )
      i[h].call(t, l);
    n.state === Oe && (n.on.call("end", t, t.__data__, n.index, n.group), c());
  }
  function c() {
    n.state = Wt, n.timer.stop(), delete r[e];
    for (var u in r) return;
    delete t.__transition;
  }
}
function Kt(t, e) {
  var n = t.__transition, r, i, o = !0, s;
  if (n) {
    e = e == null ? null : e + "";
    for (s in n) {
      if ((r = n[s]).name !== e) {
        o = !1;
        continue;
      }
      i = r.state > De && r.state < Oe, r.state = Wt, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[s];
    }
    o && delete t.__transition;
  }
}
function Ro(t) {
  return this.each(function() {
    Kt(this, t);
  });
}
function Bo(t, e) {
  var n, r;
  return function() {
    var i = it(this, t), o = i.tween;
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
function Ho(t, e, n) {
  var r, i;
  if (typeof n != "function") throw new Error();
  return function() {
    var o = it(this, t), s = o.tween;
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
function Xo(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = J(this.node(), n).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? Bo : Ho)(n, t, e));
}
function Le(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = it(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return J(i, r).value[e];
  };
}
function Gn(t, e) {
  var n;
  return (typeof e == "number" ? tt : e instanceof ht ? ee : (n = ht(e)) ? (e = n, ee) : Xn)(t, e);
}
function Yo(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Fo(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function qo(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? o : o = e(r = s, n);
  };
}
function Lo(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? o : o = e(r = s, n);
  };
}
function Vo(t, e, n) {
  var r, i, o;
  return function() {
    var s, a = n(this), c;
    return a == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), c = a + "", s === c ? null : s === r && c === i ? o : (i = c, o = e(r = s, a)));
  };
}
function Zo(t, e, n) {
  var r, i, o;
  return function() {
    var s, a = n(this), c;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), c = a + "", s === c ? null : s === r && c === i ? o : (i = c, o = e(r = s, a)));
  };
}
function Go(t, e) {
  var n = ce(t), r = n === "transform" ? $o : Gn;
  return this.attrTween(t, typeof e == "function" ? (n.local ? Zo : Vo)(n, r, Le(this, "attr." + t, e)) : e == null ? (n.local ? Fo : Yo)(n) : (n.local ? Lo : qo)(n, r, e));
}
function Uo(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function Wo(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function Ko(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && Wo(t, o)), n;
  }
  return i._value = e, i;
}
function Qo(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && Uo(t, o)), n;
  }
  return i._value = e, i;
}
function Jo(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var r = ce(t);
  return this.tween(n, (r.local ? Ko : Qo)(r, e));
}
function jo(t, e) {
  return function() {
    qe(this, t).delay = +e.apply(this, arguments);
  };
}
function ts(t, e) {
  return e = +e, function() {
    qe(this, t).delay = e;
  };
}
function es(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? jo : ts)(e, t)) : J(this.node(), e).delay;
}
function ns(t, e) {
  return function() {
    it(this, t).duration = +e.apply(this, arguments);
  };
}
function rs(t, e) {
  return e = +e, function() {
    it(this, t).duration = e;
  };
}
function is(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? ns : rs)(e, t)) : J(this.node(), e).duration;
}
function os(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    it(this, t).ease = e;
  };
}
function ss(t) {
  var e = this._id;
  return arguments.length ? this.each(os(e, t)) : J(this.node(), e).ease;
}
function as(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    it(this, t).ease = n;
  };
}
function us(t) {
  if (typeof t != "function") throw new Error();
  return this.each(as(this._id, t));
}
function ls(t) {
  typeof t != "function" && (t = Tn(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], s = o.length, a = r[i] = [], c, u = 0; u < s; ++u)
      (c = o[u]) && t.call(c, c.__data__, u, o) && a.push(c);
  return new at(r, this._parents, this._name, this._id);
}
function cs(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, o = Math.min(r, i), s = new Array(r), a = 0; a < o; ++a)
    for (var c = e[a], u = n[a], l = c.length, h = s[a] = new Array(l), d, y = 0; y < l; ++y)
      (d = c[y] || u[y]) && (h[y] = d);
  for (; a < r; ++a)
    s[a] = e[a];
  return new at(s, this._parents, this._name, this._id);
}
function fs(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function hs(t, e, n) {
  var r, i, o = fs(e) ? qe : it;
  return function() {
    var s = o(this, t), a = s.on;
    a !== r && (i = (r = a).copy()).on(e, n), s.on = i;
  };
}
function ds(t, e) {
  var n = this._id;
  return arguments.length < 2 ? J(this.node(), n).on.on(t) : this.each(hs(n, t, e));
}
function ps(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function gs() {
  return this.on("end.remove", ps(this._id));
}
function ys(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Be(t));
  for (var r = this._groups, i = r.length, o = new Array(i), s = 0; s < i; ++s)
    for (var a = r[s], c = a.length, u = o[s] = new Array(c), l, h, d = 0; d < c; ++d)
      (l = a[d]) && (h = t.call(l, l.__data__, d, a)) && ("__data__" in l && (h.__data__ = l.__data__), u[d] = h, he(u[d], e, n, d, u, J(l, n)));
  return new at(o, this._parents, e, n);
}
function ms(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = En(t));
  for (var r = this._groups, i = r.length, o = [], s = [], a = 0; a < i; ++a)
    for (var c = r[a], u = c.length, l, h = 0; h < u; ++h)
      if (l = c[h]) {
        for (var d = t.call(l, l.__data__, h, c), y, w = J(l, n), $ = 0, I = d.length; $ < I; ++$)
          (y = d[$]) && he(y, e, n, $, d, w);
        o.push(d), s.push(l);
      }
  return new at(o, s, e, n);
}
var xs = Ot.prototype.constructor;
function _s() {
  return new xs(this._groups, this._parents);
}
function ws(t, e) {
  var n, r, i;
  return function() {
    var o = _t(this, t), s = (this.style.removeProperty(t), _t(this, t));
    return o === s ? null : o === n && s === r ? i : i = e(n = o, r = s);
  };
}
function Un(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function vs(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var s = _t(this, t);
    return s === i ? null : s === r ? o : o = e(r = s, n);
  };
}
function bs(t, e, n) {
  var r, i, o;
  return function() {
    var s = _t(this, t), a = n(this), c = a + "";
    return a == null && (c = a = (this.style.removeProperty(t), _t(this, t))), s === c ? null : s === r && c === i ? o : (i = c, o = e(r = s, a));
  };
}
function Ns(t, e) {
  var n, r, i, o = "style." + e, s = "end." + o, a;
  return function() {
    var c = it(this, t), u = c.on, l = c.value[o] == null ? a || (a = Un(e)) : void 0;
    (u !== n || i !== l) && (r = (n = u).copy()).on(s, i = l), c.on = r;
  };
}
function Es(t, e, n) {
  var r = (t += "") == "transform" ? To : Gn;
  return e == null ? this.styleTween(t, ws(t, r)).on("end.style." + t, Un(t)) : typeof e == "function" ? this.styleTween(t, bs(t, r, Le(this, "style." + t, e))).each(Ns(this._id, t)) : this.styleTween(t, vs(t, r, e), n).on("end.style." + t, null);
}
function Ts(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function $s(t, e, n) {
  var r, i;
  function o() {
    var s = e.apply(this, arguments);
    return s !== i && (r = (i = s) && Ts(t, s, n)), r;
  }
  return o._value = e, o;
}
function As(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (e == null) return this.tween(r, null);
  if (typeof e != "function") throw new Error();
  return this.tween(r, $s(t, e, n ?? ""));
}
function Ms(t) {
  return function() {
    this.textContent = t;
  };
}
function Ps(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function ks(t) {
  return this.tween("text", typeof t == "function" ? Ps(Le(this, "text", t)) : Ms(t == null ? "" : t + ""));
}
function Ss(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function zs(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && Ss(i)), e;
  }
  return r._value = t, r;
}
function Cs(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, zs(t));
}
function Is() {
  for (var t = this._name, e = this._id, n = Wn(), r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], a = s.length, c, u = 0; u < a; ++u)
      if (c = s[u]) {
        var l = J(c, e);
        he(c, t, n, u, s, {
          time: l.time + l.delay + l.duration,
          delay: 0,
          duration: l.duration,
          ease: l.ease
        });
      }
  return new at(r, this._parents, t, n);
}
function Ds() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(o, s) {
    var a = { value: s }, c = { value: function() {
      --i === 0 && o();
    } };
    n.each(function() {
      var u = it(this, r), l = u.on;
      l !== t && (e = (t = l).copy(), e._.cancel.push(a), e._.interrupt.push(a), e._.end.push(c)), u.on = e;
    }), i === 0 && o();
  });
}
var Os = 0;
function at(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function Wn() {
  return ++Os;
}
var ot = Ot.prototype;
at.prototype = {
  constructor: at,
  select: ys,
  selectAll: ms,
  selectChild: ot.selectChild,
  selectChildren: ot.selectChildren,
  filter: ls,
  merge: cs,
  selection: _s,
  transition: Is,
  call: ot.call,
  nodes: ot.nodes,
  node: ot.node,
  size: ot.size,
  empty: ot.empty,
  each: ot.each,
  on: ds,
  attr: Go,
  attrTween: Jo,
  style: Es,
  styleTween: As,
  text: ks,
  textTween: Cs,
  remove: gs,
  tween: Xo,
  delay: es,
  duration: is,
  ease: ss,
  easeVarying: us,
  end: Ds,
  [Symbol.iterator]: ot[Symbol.iterator]
};
function Rs(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Bs = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Rs
};
function Hs(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function Xs(t) {
  var e, n;
  t instanceof at ? (e = t._id, t = t._name) : (e = Wn(), (n = Bs).time = Fe(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], a = s.length, c, u = 0; u < a; ++u)
      (c = s[u]) && he(c, t, e, u, s, n || Hs(c, e));
  return new at(r, this._parents, t, e);
}
Ot.prototype.interrupt = Ro;
Ot.prototype.transition = Xs;
const qt = (t) => () => t;
function Ys(t, {
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
function st(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
st.prototype = {
  constructor: st,
  scale: function(t) {
    return t === 1 ? this : new st(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new st(this.k, this.x + this.k * t, this.y + this.k * e);
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
var de = new st(1, 0, 0);
Kn.prototype = st.prototype;
function Kn(t) {
  for (; !t.__zoom; ) if (!(t = t.parentNode)) return de;
  return t.__zoom;
}
function Ee(t) {
  t.stopImmediatePropagation();
}
function $t(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Fs(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function qs() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function cn() {
  return this.__zoom || de;
}
function Ls(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function Vs() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Zs(t, e, n) {
  var r = t.invertX(e[0][0]) - n[0][0], i = t.invertX(e[1][0]) - n[1][0], o = t.invertY(e[0][1]) - n[0][1], s = t.invertY(e[1][1]) - n[1][1];
  return t.translate(
    i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i),
    s > o ? (o + s) / 2 : Math.min(0, o) || Math.max(0, s)
  );
}
function Gs() {
  var t = Fs, e = qs, n = Zs, r = Ls, i = Vs, o = [0, 1 / 0], s = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, c = Gt, u = le("start", "zoom", "end"), l, h, d, y = 500, w = 150, $ = 0, I = 10;
  function b(f) {
    f.property("__zoom", cn).on("wheel.zoom", X, { passive: !1 }).on("mousedown.zoom", q).on("dblclick.zoom", V).filter(i).on("touchstart.zoom", A).on("touchmove.zoom", _).on("touchend.zoom touchcancel.zoom", M).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  b.transform = function(f, g, p, x) {
    var v = f.selection ? f.selection() : f;
    v.property("__zoom", cn), f !== v ? P(f, g, p, x) : v.interrupt().each(function() {
      T(this, arguments).event(x).start().zoom(null, typeof g == "function" ? g.apply(this, arguments) : g).end();
    });
  }, b.scaleBy = function(f, g, p, x) {
    b.scaleTo(f, function() {
      var v = this.__zoom.k, N = typeof g == "function" ? g.apply(this, arguments) : g;
      return v * N;
    }, p, x);
  }, b.scaleTo = function(f, g, p, x) {
    b.transform(f, function() {
      var v = e.apply(this, arguments), N = this.__zoom, E = p == null ? m(v) : typeof p == "function" ? p.apply(this, arguments) : p, k = N.invert(E), S = typeof g == "function" ? g.apply(this, arguments) : g;
      return n(H(R(N, S), E, k), v, s);
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
      var N = e.apply(this, arguments), E = this.__zoom, k = x == null ? m(N) : typeof x == "function" ? x.apply(this, arguments) : x;
      return n(de.translate(k[0], k[1]).scale(E.k).translate(
        typeof g == "function" ? -g.apply(this, arguments) : -g,
        typeof p == "function" ? -p.apply(this, arguments) : -p
      ), N, s);
    }, x, v);
  };
  function R(f, g) {
    return g = Math.max(o[0], Math.min(o[1], g)), g === f.k ? f : new st(g, f.x, f.y);
  }
  function H(f, g, p) {
    var x = g[0] - p[0] * f.k, v = g[1] - p[1] * f.k;
    return x === f.x && v === f.y ? f : new st(f.k, x, v);
  }
  function m(f) {
    return [(+f[0][0] + +f[1][0]) / 2, (+f[0][1] + +f[1][1]) / 2];
  }
  function P(f, g, p, x) {
    f.on("start.zoom", function() {
      T(this, arguments).event(x).start();
    }).on("interrupt.zoom end.zoom", function() {
      T(this, arguments).event(x).end();
    }).tween("zoom", function() {
      var v = this, N = arguments, E = T(v, N).event(x), k = e.apply(v, N), S = p == null ? m(k) : typeof p == "function" ? p.apply(v, N) : p, Y = Math.max(k[1][0] - k[0][0], k[1][1] - k[0][1]), D = v.__zoom, B = typeof g == "function" ? g.apply(v, N) : g, Z = c(D.invert(S).concat(Y / D.k), B.invert(S).concat(Y / B.k));
      return function(F) {
        if (F === 1) F = B;
        else {
          var O = Z(F), W = Y / O[2];
          F = new st(W, S[0] - O[0] * W, S[1] - O[1] * W);
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
        new Ys(f, {
          sourceEvent: this.sourceEvent,
          target: b,
          transform: this.that.__zoom,
          dispatch: u
        }),
        g
      );
    }
  };
  function X(f, ...g) {
    if (!t.apply(this, arguments)) return;
    var p = T(this, g).event(f), x = this.__zoom, v = Math.max(o[0], Math.min(o[1], x.k * Math.pow(2, r.apply(this, arguments)))), N = j(f);
    if (p.wheel)
      (p.mouse[0][0] !== N[0] || p.mouse[0][1] !== N[1]) && (p.mouse[1] = x.invert(p.mouse[0] = N)), clearTimeout(p.wheel);
    else {
      if (x.k === v) return;
      p.mouse = [N, x.invert(N)], Kt(this), p.start();
    }
    $t(f), p.wheel = setTimeout(E, w), p.zoom("mouse", n(H(R(x, v), p.mouse[0], p.mouse[1]), p.extent, s));
    function E() {
      p.wheel = null, p.end();
    }
  }
  function q(f, ...g) {
    if (d || !t.apply(this, arguments)) return;
    var p = f.currentTarget, x = T(this, g, !0).event(f), v = K(f.view).on("mousemove.zoom", S, !0).on("mouseup.zoom", Y, !0), N = j(f, p), E = f.clientX, k = f.clientY;
    Dn(f.view), Ee(f), x.mouse = [N, this.__zoom.invert(N)], Kt(this), x.start();
    function S(D) {
      if ($t(D), !x.moved) {
        var B = D.clientX - E, Z = D.clientY - k;
        x.moved = B * B + Z * Z > $;
      }
      x.event(D).zoom("mouse", n(H(x.that.__zoom, x.mouse[0] = j(D, p), x.mouse[1]), x.extent, s));
    }
    function Y(D) {
      v.on("mousemove.zoom mouseup.zoom", null), On(D.view, x.moved), $t(D), x.event(D).end();
    }
  }
  function V(f, ...g) {
    if (t.apply(this, arguments)) {
      var p = this.__zoom, x = j(f.changedTouches ? f.changedTouches[0] : f, this), v = p.invert(x), N = p.k * (f.shiftKey ? 0.5 : 2), E = n(H(R(p, N), x, v), e.apply(this, g), s);
      $t(f), a > 0 ? K(this).transition().duration(a).call(P, E, x, f) : K(this).call(b.transform, E, x, f);
    }
  }
  function A(f, ...g) {
    if (t.apply(this, arguments)) {
      var p = f.touches, x = p.length, v = T(this, g, f.changedTouches.length === x).event(f), N, E, k, S;
      for (Ee(f), E = 0; E < x; ++E)
        k = p[E], S = j(k, this), S = [S, this.__zoom.invert(S), k.identifier], v.touch0 ? !v.touch1 && v.touch0[2] !== S[2] && (v.touch1 = S, v.taps = 0) : (v.touch0 = S, N = !0, v.taps = 1 + !!l);
      l && (l = clearTimeout(l)), N && (v.taps < 2 && (h = S[0], l = setTimeout(function() {
        l = null;
      }, y)), Kt(this), v.start());
    }
  }
  function _(f, ...g) {
    if (this.__zooming) {
      var p = T(this, g).event(f), x = f.changedTouches, v = x.length, N, E, k, S;
      for ($t(f), N = 0; N < v; ++N)
        E = x[N], k = j(E, this), p.touch0 && p.touch0[2] === E.identifier ? p.touch0[0] = k : p.touch1 && p.touch1[2] === E.identifier && (p.touch1[0] = k);
      if (E = p.that.__zoom, p.touch1) {
        var Y = p.touch0[0], D = p.touch0[1], B = p.touch1[0], Z = p.touch1[1], F = (F = B[0] - Y[0]) * F + (F = B[1] - Y[1]) * F, O = (O = Z[0] - D[0]) * O + (O = Z[1] - D[1]) * O;
        E = R(E, Math.sqrt(F / O)), k = [(Y[0] + B[0]) / 2, (Y[1] + B[1]) / 2], S = [(D[0] + Z[0]) / 2, (D[1] + Z[1]) / 2];
      } else if (p.touch0) k = p.touch0[0], S = p.touch0[1];
      else return;
      p.zoom("touch", n(H(E, k, S), p.extent, s));
    }
  }
  function M(f, ...g) {
    if (this.__zooming) {
      var p = T(this, g).event(f), x = f.changedTouches, v = x.length, N, E;
      for (Ee(f), d && clearTimeout(d), d = setTimeout(function() {
        d = null;
      }, y), N = 0; N < v; ++N)
        E = x[N], p.touch0 && p.touch0[2] === E.identifier ? delete p.touch0 : p.touch1 && p.touch1[2] === E.identifier && delete p.touch1;
      if (p.touch1 && !p.touch0 && (p.touch0 = p.touch1, delete p.touch1), p.touch0) p.touch0[1] = this.__zoom.invert(p.touch0[0]);
      else if (p.end(), p.taps === 2 && (E = j(E, this), Math.hypot(h[0] - E[0], h[1] - E[1]) < I)) {
        var k = K(this).on("dblclick.zoom");
        k && k.apply(this, arguments);
      }
    }
  }
  return b.wheelDelta = function(f) {
    return arguments.length ? (r = typeof f == "function" ? f : qt(+f), b) : r;
  }, b.filter = function(f) {
    return arguments.length ? (t = typeof f == "function" ? f : qt(!!f), b) : t;
  }, b.touchable = function(f) {
    return arguments.length ? (i = typeof f == "function" ? f : qt(!!f), b) : i;
  }, b.extent = function(f) {
    return arguments.length ? (e = typeof f == "function" ? f : qt([[+f[0][0], +f[0][1]], [+f[1][0], +f[1][1]]]), b) : e;
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
    return arguments.length ? ($ = (f = +f) * f, b) : Math.sqrt($);
  }, b.tapDistance = function(f) {
    return arguments.length ? (I = +f, b) : I;
  }, b;
}
const fn = {
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
}, Qn = [
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
];
var hn;
(function(t) {
  t.Strict = "strict", t.Loose = "loose";
})(hn || (hn = {}));
var xt;
(function(t) {
  t.Free = "free", t.Vertical = "vertical", t.Horizontal = "horizontal";
})(xt || (xt = {}));
var dn;
(function(t) {
  t.Partial = "partial", t.Full = "full";
})(dn || (dn = {}));
var pn;
(function(t) {
  t.Bezier = "default", t.Straight = "straight", t.Step = "step", t.SmoothStep = "smoothstep", t.SimpleBezier = "simplebezier";
})(pn || (pn = {}));
var gn;
(function(t) {
  t.Arrow = "arrow", t.ArrowClosed = "arrowclosed";
})(gn || (gn = {}));
var C;
(function(t) {
  t.Left = "left", t.Top = "top", t.Right = "right", t.Bottom = "bottom";
})(C || (C = {}));
C.Left + "", C.Right, C.Right + "", C.Left, C.Top + "", C.Bottom, C.Bottom + "", C.Top;
const Us = (t) => "id" in t && "internals" in t && !("source" in t) && !("target" in t), Ve = (t, e = [0, 0]) => {
  const { width: n, height: r } = Bt(t), i = t.origin ?? e, o = n * i[0], s = r * i[1];
  return {
    x: t.position.x - o,
    y: t.position.y - s
  };
}, Ws = (t, e = {}) => {
  let n = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 }, r = !1;
  return t.forEach((i) => {
    (e.filter === void 0 || e.filter(i)) && (n = js(n, na(i)), r = !0);
  }), r ? ea(n) : { x: 0, y: 0, width: 0, height: 0 };
};
function Ks({ nodeId: t, nextPosition: e, nodeLookup: n, nodeOrigin: r = [0, 0], nodeExtent: i, onError: o }) {
  const s = n.get(t), a = s.parentId ? n.get(s.parentId) : void 0, { x: c, y: u } = a ? a.internals.positionAbsolute : { x: 0, y: 0 }, l = s.origin ?? r;
  let h = s.extent || i;
  if (s.extent === "parent" && !s.expandParent)
    if (!a)
      o?.("005", fn.error005());
    else {
      const y = a.measured.width, w = a.measured.height;
      y && w && (h = [
        [c, u],
        [c + y, u + w]
      ]);
    }
  else a && oe(s.extent) && (h = [
    [s.extent[0][0] + c, s.extent[0][1] + u],
    [s.extent[1][0] + c, s.extent[1][1] + u]
  ]);
  const d = oe(h) ? Dt(e, h, s.measured) : e;
  return (s.measured.width === void 0 || s.measured.height === void 0) && o?.("015", fn.error015()), {
    position: {
      x: d.x - c + (s.measured.width ?? 0) * l[0],
      y: d.y - u + (s.measured.height ?? 0) * l[1]
    },
    positionAbsolute: d
  };
}
const It = (t, e = 0, n = 1) => Math.min(Math.max(t, e), n), Dt = (t = { x: 0, y: 0 }, e, n) => ({
  x: It(t.x, e[0][0], e[1][0] - (n?.width ?? 0)),
  y: It(t.y, e[0][1], e[1][1] - (n?.height ?? 0))
});
function Qs(t, e, n) {
  const { width: r, height: i } = Bt(n), { x: o, y: s } = n.internals.positionAbsolute;
  return Dt(t, [
    [o, s],
    [o + r, s + i]
  ], e);
}
const yn = (t, e, n) => t < e ? It(Math.abs(t - e), 1, e) / e : t > n ? -It(Math.abs(t - n), 1, e) / e : 0, Js = (t, e, n = 15, r = 40) => {
  const i = yn(t.x, r, e.width - r) * n, o = yn(t.y, r, e.height - r) * n;
  return [i, o];
}, js = (t, e) => ({
  x: Math.min(t.x, e.x),
  y: Math.min(t.y, e.y),
  x2: Math.max(t.x2, e.x2),
  y2: Math.max(t.y2, e.y2)
}), ta = ({ x: t, y: e, width: n, height: r }) => ({
  x: t,
  y: e,
  x2: t + n,
  y2: e + r
}), ea = ({ x: t, y: e, x2: n, y2: r }) => ({
  x: t,
  y: e,
  width: n - t,
  height: r - e
}), na = (t, e = [0, 0]) => {
  const { x: n, y: r } = Us(t) ? t.internals.positionAbsolute : Ve(t, e);
  return {
    x: n,
    y: r,
    x2: n + (t.measured?.width ?? t.width ?? t.initialWidth ?? 0),
    y2: r + (t.measured?.height ?? t.height ?? t.initialHeight ?? 0)
  };
}, Re = (t) => !isNaN(t) && isFinite(t), pe = (t, e = [1, 1]) => ({
  x: e[0] * Math.round(t.x / e[0]),
  y: e[1] * Math.round(t.y / e[1])
}), ra = ({ x: t, y: e }, [n, r, i], o = !1, s = [1, 1]) => {
  const a = {
    x: (t - n) / i,
    y: (e - r) / i
  };
  return o ? pe(a, s) : a;
}, Jn = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function oe(t) {
  return t != null && t !== "parent";
}
function Bt(t) {
  return {
    width: t.measured?.width ?? t.width ?? t.initialWidth ?? 0,
    height: t.measured?.height ?? t.height ?? t.initialHeight ?? 0
  };
}
function Te(t, { snapGrid: e = [0, 0], snapToGrid: n = !1, transform: r, containerBounds: i }) {
  const { x: o, y: s } = Qt(t), a = ra({ x: o - (i?.left ?? 0), y: s - (i?.top ?? 0) }, r), { x: c, y: u } = n ? pe(a, e) : a;
  return {
    xSnapped: c,
    ySnapped: u,
    ...a
  };
}
const ia = (t) => "clientX" in t, Qt = (t, e) => {
  const n = ia(t), r = n ? t.clientX : t.touches?.[0].clientX, i = n ? t.clientY : t.touches?.[0].clientY;
  return {
    x: r - (e?.left ?? 0),
    y: i - (e?.top ?? 0)
  };
};
function oa({ sourceX: t, sourceY: e, targetX: n, targetY: r, sourceControlX: i, sourceControlY: o, targetControlX: s, targetControlY: a }) {
  const c = t * 0.125 + i * 0.375 + s * 0.375 + n * 0.125, u = e * 0.125 + o * 0.375 + a * 0.375 + r * 0.125, l = Math.abs(c - t), h = Math.abs(u - e);
  return [c, u, l, h];
}
function Lt(t, e) {
  return t >= 0 ? 0.5 * t : e * 25 * Math.sqrt(-t);
}
function mn({ pos: t, x1: e, y1: n, x2: r, y2: i, c: o }) {
  switch (t) {
    case C.Left:
      return [e - Lt(e - r, o), n];
    case C.Right:
      return [e + Lt(r - e, o), n];
    case C.Top:
      return [e, n - Lt(n - i, o)];
    case C.Bottom:
      return [e, n + Lt(i - n, o)];
  }
}
function sa({ sourceX: t, sourceY: e, sourcePosition: n = C.Bottom, targetX: r, targetY: i, targetPosition: o = C.Top, curvature: s = 0.25 }) {
  const [a, c] = mn({
    pos: n,
    x1: t,
    y1: e,
    x2: r,
    y2: i,
    c: s
  }), [u, l] = mn({
    pos: o,
    x1: r,
    y1: i,
    x2: t,
    y2: e,
    c: s
  }), [h, d, y, w] = oa({
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
    y,
    w
  ];
}
C.Left + "", C.Right + "", C.Top + "", C.Bottom + "";
function xn(t, e, n = C.Left, r = !1) {
  const i = (e?.x ?? 0) + t.internals.positionAbsolute.x, o = (e?.y ?? 0) + t.internals.positionAbsolute.y, { width: s, height: a } = e ?? Bt(t);
  if (r)
    return { x: i + s / 2, y: o + a / 2 };
  switch (e?.position ?? n) {
    case C.Top:
      return { x: i + s / 2, y: o };
    case C.Right:
      return { x: i + s, y: o + a / 2 };
    case C.Bottom:
      return { x: i + s / 2, y: o + a };
    case C.Left:
      return { x: i, y: o + a / 2 };
  }
}
const jn = 1e3, aa = 10, tr = {
  nodeOrigin: [0, 0],
  nodeExtent: Qn,
  elevateNodesOnSelect: !0,
  zIndexMode: "basic",
  defaults: {}
}, ua = {
  ...tr,
  checkEquality: !0
};
function er(t, e) {
  const n = { ...t };
  for (const r in e)
    e[r] !== void 0 && (n[r] = e[r]);
  return n;
}
function la(t, e) {
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
function Ze(t) {
  return t === "manual";
}
function _n(t, e, n, r = {}) {
  const i = er(ua, r), o = { i: 0 }, s = new Map(e), a = i?.elevateNodesOnSelect && !Ze(i.zIndexMode) ? jn : 0;
  let c = t.length > 0;
  e.clear(), n.clear();
  for (const u of t) {
    let l = s.get(u.id);
    if (i.checkEquality && u === l?.internals.userNode)
      e.set(u.id, l);
    else {
      const h = Ve(u, i.nodeOrigin), d = oe(u.extent) ? u.extent : i.nodeExtent, y = Dt(h, d, Bt(u));
      l = {
        ...i.defaults,
        ...u,
        measured: {
          width: u.measured?.width,
          height: u.measured?.height
        },
        internals: {
          positionAbsolute: y,
          // if user re-initializes the node or removes `measured` for whatever reason, we reset the handleBounds so that the node gets re-measured
          handleBounds: la(u, l),
          z: nr(u, a, i.zIndexMode),
          userNode: u
        }
      }, e.set(u.id, l);
    }
    (l.measured === void 0 || l.measured.width === void 0 || l.measured.height === void 0) && !l.hidden && (c = !1), u.parentId && fa(l, e, n, r, o);
  }
  return c;
}
function ca(t, e) {
  if (!t.parentId)
    return;
  const n = e.get(t.parentId);
  n ? n.set(t.id, t) : e.set(t.parentId, /* @__PURE__ */ new Map([[t.id, t]]));
}
function fa(t, e, n, r, i) {
  const { elevateNodesOnSelect: o, nodeOrigin: s, nodeExtent: a, zIndexMode: c } = er(tr, r), u = t.parentId, l = e.get(u);
  if (!l) {
    console.warn(`Parent node ${u} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
    return;
  }
  ca(t, n), i && !l.parentId && l.internals.rootParentIndex === void 0 && c === "auto" && (l.internals.rootParentIndex = ++i.i, l.internals.z = l.internals.z + i.i * aa), i && l.internals.rootParentIndex !== void 0 && (i.i = l.internals.rootParentIndex);
  const h = o && !Ze(c) ? jn : 0, { x: d, y, z: w } = ha(t, l, s, a, h, c), { positionAbsolute: $ } = t.internals, I = d !== $.x || y !== $.y;
  (I || w !== t.internals.z) && e.set(t.id, {
    ...t,
    internals: {
      ...t.internals,
      positionAbsolute: I ? { x: d, y } : $,
      z: w
    }
  });
}
function nr(t, e, n) {
  const r = Re(t.zIndex) ? t.zIndex : 0;
  return Ze(n) ? r : r + (t.selected ? e : 0);
}
function ha(t, e, n, r, i, o) {
  const { x: s, y: a } = e.internals.positionAbsolute, c = Bt(t), u = Ve(t, n), l = oe(t.extent) ? Dt(u, t.extent, c) : u;
  let h = Dt({ x: s + l.x, y: a + l.y }, r, c);
  t.extent === "parent" && (h = Qs(h, c, e));
  const d = nr(t, i, o), y = e.internals.z ?? 0;
  return {
    x: h.x,
    y: h.y,
    z: y >= d ? y + 1 : d
  };
}
function rr(t, e) {
  if (!t.parentId)
    return !1;
  const n = e.get(t.parentId);
  return n ? n.selected ? !0 : rr(n, e) : !1;
}
function wn(t, e, n) {
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
function da(t, e, n, r) {
  const i = /* @__PURE__ */ new Map();
  for (const [o, s] of t)
    if ((s.selected || s.id === r) && (!s.parentId || !rr(s, t)) && (s.draggable || e && typeof s.draggable > "u")) {
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
function $e({ nodeId: t, dragItems: e, nodeLookup: n, dragging: r = !0 }) {
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
function pa({ dragItems: t, snapGrid: e, x: n, y: r }) {
  const i = t.values().next().value;
  if (!i)
    return null;
  const o = {
    x: n - i.distance.x,
    y: r - i.distance.y
  }, s = pe(o, e);
  return {
    x: s.x - o.x,
    y: s.y - o.y
  };
}
function ga({ onNodeMouseDown: t, getStoreItems: e, onDragStart: n, onDrag: r, onDragStop: i }) {
  let o = { x: null, y: null }, s = 0, a = /* @__PURE__ */ new Map(), c = !1, u = { x: 0, y: 0 }, l = null, h = !1, d = null, y = !1, w = !1, $ = null;
  function I({ noDragClassName: R, handleSelector: H, domNode: m, isSelectable: P, nodeId: T, nodeClickDistance: z = 0 }) {
    d = K(m);
    function X({ x: _, y: M }) {
      const { nodeLookup: f, nodeExtent: g, snapGrid: p, snapToGrid: x, nodeOrigin: v, onNodeDrag: N, onSelectionDrag: E, onError: k, updateNodePositions: S } = e();
      o = { x: _, y: M };
      let Y = !1;
      const D = a.size > 1, B = D && g ? ta(Ws(a)) : null, Z = D && x ? pa({
        dragItems: a,
        snapGrid: p,
        x: _,
        y: M
      }) : null;
      for (const [F, O] of a) {
        if (!f.has(F))
          continue;
        let W = { x: _ - O.distance.x, y: M - O.distance.y };
        x && (W = Z ? {
          x: Math.round(W.x + Z.x),
          y: Math.round(W.y + Z.y)
        } : pe(W, p));
        let Nt = null;
        if (D && g && !O.extent && B) {
          const { positionAbsolute: pt } = O.internals, _e = pt.x - B.x + g[0][0], sr = pt.x + O.measured.width - B.x2 + g[1][0], ar = pt.y - B.y + g[0][1], ur = pt.y + O.measured.height - B.y2 + g[1][1];
          Nt = [
            [_e, ar],
            [sr, ur]
          ];
        }
        const { position: Et, positionAbsolute: xe } = Ks({
          nodeId: F,
          nextPosition: W,
          nodeLookup: f,
          nodeExtent: Nt || g,
          nodeOrigin: v,
          onError: k
        });
        Y = Y || O.position.x !== Et.x || O.position.y !== Et.y, O.position = Et, O.internals.positionAbsolute = xe;
      }
      if (w = w || Y, !!Y && (S(a, !0), $ && (r || N || !T && E))) {
        const [F, O] = $e({
          nodeId: T,
          dragItems: a,
          nodeLookup: f
        });
        r?.($, a, F, O), N?.($, F, O), T || E?.($, O);
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
      const [p, x] = Js(u, l, f);
      (p !== 0 || x !== 0) && (o.x = (o.x ?? 0) - p / _[2], o.y = (o.y ?? 0) - x / _[2], await M({ x: p, y: x }) && X(o)), s = requestAnimationFrame(q);
    }
    function V(_) {
      const { nodeLookup: M, multiSelectionActive: f, nodesDraggable: g, transform: p, snapGrid: x, snapToGrid: v, selectNodesOnDrag: N, onNodeDragStart: E, onSelectionDragStart: k, unselectNodesAndEdges: S } = e();
      h = !0, (!N || !P) && !f && T && (M.get(T)?.selected || S()), P && N && T && t?.(T);
      const Y = Te(_.sourceEvent, { transform: p, snapGrid: x, snapToGrid: v, containerBounds: l });
      if (o = Y, a = da(M, g, Y, T), a.size > 0 && (n || E || !T && k)) {
        const [D, B] = $e({
          nodeId: T,
          dragItems: a,
          nodeLookup: M
        });
        n?.(_.sourceEvent, a, D, B), E?.(_.sourceEvent, D, B), T || k?.(_.sourceEvent, B);
      }
    }
    const A = ji().clickDistance(z).on("start", (_) => {
      const { domNode: M, nodeDragThreshold: f, transform: g, snapGrid: p, snapToGrid: x } = e();
      l = M?.getBoundingClientRect() || null, y = !1, w = !1, $ = _.sourceEvent, f === 0 && V(_), o = Te(_.sourceEvent, { transform: g, snapGrid: p, snapToGrid: x, containerBounds: l }), u = Qt(_.sourceEvent, l);
    }).on("drag", (_) => {
      const { autoPanOnNodeDrag: M, transform: f, snapGrid: g, snapToGrid: p, nodeDragThreshold: x, nodeLookup: v } = e(), N = Te(_.sourceEvent, { transform: f, snapGrid: g, snapToGrid: p, containerBounds: l });
      if ($ = _.sourceEvent, (_.sourceEvent.type === "touchmove" && _.sourceEvent.touches.length > 1 || // if user deletes a node while dragging, we need to abort the drag to prevent errors
      T && !v.has(T)) && (y = !0), !y) {
        if (!c && M && h && (c = !0, q()), !h) {
          const E = Qt(_.sourceEvent, l), k = E.x - u.x, S = E.y - u.y;
          Math.sqrt(k * k + S * S) > x && V(_);
        }
        (o.x !== N.xSnapped || o.y !== N.ySnapped) && a && h && (u = Qt(_.sourceEvent, l), X(N));
      }
    }).on("end", (_) => {
      if (!(!h || y) && (c = !1, h = !1, cancelAnimationFrame(s), a.size > 0)) {
        const { nodeLookup: M, updateNodePositions: f, onNodeDragStop: g, onSelectionDragStop: p } = e();
        if (w && (f(a, !1), w = !1), i || g || !T && p) {
          const [x, v] = $e({
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
      return !_.button && (!R || !wn(M, `.${R}`, m)) && (!H || wn(M, H, m));
    });
    d.call(A);
  }
  function b() {
    d?.on(".drag", null);
  }
  return {
    update: I,
    destroy: b
  };
}
const ge = (t) => ({
  x: t.x,
  y: t.y,
  zoom: t.k
}), Ae = ({ x: t, y: e, zoom: n }) => de.translate(t, e).scale(n), gt = (t, e) => t.target.closest(`.${e}`), ir = (t, e) => e === 2 && Array.isArray(t) && t.includes(2), ya = (t) => ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2, Me = (t, e = 0, n = ya, r = () => {
}) => {
  const i = typeof e == "number" && e > 0;
  return i || r(), i ? t.transition().duration(e).ease(n).on("end", r) : t;
}, or = (t) => {
  const e = t.ctrlKey && Jn() ? 10 : 1;
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * e;
};
function ma({ zoomPanValues: t, noWheelClassName: e, d3Selection: n, d3Zoom: r, panOnScrollMode: i, panOnScrollSpeed: o, zoomOnPinch: s, onPanZoomStart: a, onPanZoom: c, onPanZoomEnd: u }) {
  return (l) => {
    if (gt(l, e))
      return l.ctrlKey && l.preventDefault(), !1;
    l.preventDefault(), l.stopImmediatePropagation();
    const h = n.property("__zoom").k || 1;
    if (l.ctrlKey && s) {
      const I = j(l), b = or(l), R = h * Math.pow(2, b);
      r.scaleTo(n, R, I, l);
      return;
    }
    const d = l.deltaMode === 1 ? 20 : 1;
    let y = i === xt.Vertical ? 0 : l.deltaX * d, w = i === xt.Horizontal ? 0 : l.deltaY * d;
    !Jn() && l.shiftKey && i !== xt.Vertical && (y = l.deltaY * d, w = 0), r.translateBy(
      n,
      -(y / h) * o,
      -(w / h) * o,
      // @ts-ignore
      { internal: !0 }
    );
    const $ = ge(n.property("__zoom"));
    clearTimeout(t.panScrollTimeout), t.isPanScrolling ? (c?.(l, $), t.panScrollTimeout = setTimeout(() => {
      u?.(l, $), t.isPanScrolling = !1;
    }, 150)) : (t.isPanScrolling = !0, a?.(l, $));
  };
}
function xa({ noWheelClassName: t, preventScrolling: e, d3ZoomHandler: n }) {
  return function(r, i) {
    const o = r.type === "wheel", s = !e && o && !r.ctrlKey, a = gt(r, t);
    if (r.ctrlKey && o && a && r.preventDefault(), s || a)
      return null;
    r.preventDefault(), n.call(this, r, i);
  };
}
function _a({ zoomPanValues: t, onDraggingChange: e, onPanZoomStart: n }) {
  return (r) => {
    if (r.sourceEvent?.internal)
      return;
    const i = ge(r.transform);
    t.mouseButton = r.sourceEvent?.button || 0, t.isZoomingOrPanning = !0, t.prevViewport = i, r.sourceEvent?.type, n && n?.(r.sourceEvent, i);
  };
}
function wa({ zoomPanValues: t, panOnDrag: e, onPaneContextMenu: n, onTransformChange: r, onPanZoom: i }) {
  return (o) => {
    t.usedRightMouseButton = !!(n && ir(e, t.mouseButton ?? 0)), o.sourceEvent?.sync || r([o.transform.x, o.transform.y, o.transform.k]), i && !o.sourceEvent?.internal && i?.(o.sourceEvent, ge(o.transform));
  };
}
function va({ zoomPanValues: t, panOnDrag: e, panOnScroll: n, onDraggingChange: r, onPanZoomEnd: i, onPaneContextMenu: o }) {
  return (s) => {
    if (!s.sourceEvent?.internal && (t.isZoomingOrPanning = !1, o && ir(e, t.mouseButton ?? 0) && !t.usedRightMouseButton && s.sourceEvent && o(s.sourceEvent), t.usedRightMouseButton = !1, i)) {
      const a = ge(s.transform);
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
function ba({ zoomActivationKeyPressed: t, zoomOnScroll: e, zoomOnPinch: n, panOnDrag: r, panOnScroll: i, zoomOnDoubleClick: o, userSelectionActive: s, noWheelClassName: a, noPanClassName: c, lib: u, connectionInProgress: l }) {
  return (h) => {
    const d = t || e, y = n && h.ctrlKey, w = h.type === "wheel";
    if (h.button === 1 && h.type === "mousedown" && (gt(h, `${u}-flow__node`) || gt(h, `${u}-flow__edge`)))
      return !0;
    if (!r && !d && !i && !o && !n || s || l && !w || gt(h, a) && w || gt(h, c) && (!w || i && w && !t) || !n && h.ctrlKey && w)
      return !1;
    if (!n && h.type === "touchstart" && h.touches?.length > 1)
      return h.preventDefault(), !1;
    if (!d && !i && !y && w || !r && (h.type === "mousedown" || h.type === "touchstart") || Array.isArray(r) && !r.includes(h.button) && h.type === "mousedown")
      return !1;
    const $ = Array.isArray(r) && r.includes(h.button) || !h.button || h.button <= 1;
    return (!h.ctrlKey || w) && $;
  };
}
function Na({ domNode: t, minZoom: e, maxZoom: n, translateExtent: r, viewport: i, onPanZoom: o, onPanZoomStart: s, onPanZoomEnd: a, onDraggingChange: c }) {
  const u = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: {},
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, l = t.getBoundingClientRect(), h = Gs().scaleExtent([e, n]).translateExtent(r), d = K(t).call(h);
  R({
    x: i.x,
    y: i.y,
    zoom: It(i.zoom, e, n)
  }, [
    [0, 0],
    [l.width, l.height]
  ], r);
  const y = d.on("wheel.zoom"), w = d.on("dblclick.zoom");
  h.wheelDelta(or);
  function $(A, _) {
    return d ? new Promise((M) => {
      h?.interpolate(_?.interpolate === "linear" ? Pt : Gt).transform(Me(d, _?.duration, _?.ease, () => M(!0)), A);
    }) : Promise.resolve(!1);
  }
  function I({ noWheelClassName: A, noPanClassName: _, onPaneContextMenu: M, userSelectionActive: f, panOnScroll: g, panOnDrag: p, panOnScrollMode: x, panOnScrollSpeed: v, preventScrolling: N, zoomOnPinch: E, zoomOnScroll: k, zoomOnDoubleClick: S, zoomActivationKeyPressed: Y, lib: D, onTransformChange: B, connectionInProgress: Z, paneClickDistance: F, selectionOnDrag: O }) {
    f && !u.isZoomingOrPanning && b();
    const W = g && !Y && !f;
    h.clickDistance(O ? 1 / 0 : !Re(F) || F < 0 ? 0 : F);
    const Nt = W ? ma({
      zoomPanValues: u,
      noWheelClassName: A,
      d3Selection: d,
      d3Zoom: h,
      panOnScrollMode: x,
      panOnScrollSpeed: v,
      zoomOnPinch: E,
      onPanZoomStart: s,
      onPanZoom: o,
      onPanZoomEnd: a
    }) : xa({
      noWheelClassName: A,
      preventScrolling: N,
      d3ZoomHandler: y
    });
    if (d.on("wheel.zoom", Nt, { passive: !1 }), !f) {
      const xe = _a({
        zoomPanValues: u,
        onDraggingChange: c,
        onPanZoomStart: s
      });
      h.on("start", xe);
      const pt = wa({
        zoomPanValues: u,
        panOnDrag: p,
        onPaneContextMenu: !!M,
        onPanZoom: o,
        onTransformChange: B
      });
      h.on("zoom", pt);
      const _e = va({
        zoomPanValues: u,
        panOnDrag: p,
        panOnScroll: g,
        onPaneContextMenu: M,
        onPanZoomEnd: a,
        onDraggingChange: c
      });
      h.on("end", _e);
    }
    const Et = ba({
      zoomActivationKeyPressed: Y,
      panOnDrag: p,
      zoomOnScroll: k,
      panOnScroll: g,
      zoomOnDoubleClick: S,
      zoomOnPinch: E,
      userSelectionActive: f,
      noPanClassName: _,
      noWheelClassName: A,
      lib: D,
      connectionInProgress: Z
    });
    h.filter(Et), S ? d.on("dblclick.zoom", w) : d.on("dblclick.zoom", null);
  }
  function b() {
    h.on("zoom", null);
  }
  async function R(A, _, M) {
    const f = Ae(A), g = h?.constrain()(f, _, M);
    return g && await $(g), new Promise((p) => p(g));
  }
  async function H(A, _) {
    const M = Ae(A);
    return await $(M, _), new Promise((f) => f(M));
  }
  function m(A) {
    if (d) {
      const _ = Ae(A), M = d.property("__zoom");
      (M.k !== A.zoom || M.x !== A.x || M.y !== A.y) && h?.transform(d, _, null, { sync: !0 });
    }
  }
  function P() {
    const A = d ? Kn(d.node()) : { x: 0, y: 0, k: 1 };
    return { x: A.x, y: A.y, zoom: A.k };
  }
  function T(A, _) {
    return d ? new Promise((M) => {
      h?.interpolate(_?.interpolate === "linear" ? Pt : Gt).scaleTo(Me(d, _?.duration, _?.ease, () => M(!0)), A);
    }) : Promise.resolve(!1);
  }
  function z(A, _) {
    return d ? new Promise((M) => {
      h?.interpolate(_?.interpolate === "linear" ? Pt : Gt).scaleBy(Me(d, _?.duration, _?.ease, () => M(!0)), A);
    }) : Promise.resolve(!1);
  }
  function X(A) {
    h?.scaleExtent(A);
  }
  function q(A) {
    h?.translateExtent(A);
  }
  function V(A) {
    const _ = !Re(A) || A < 0 ? 0 : A;
    h?.clickDistance(_);
  }
  return {
    update: I,
    destroy: b,
    setViewport: H,
    setViewportConstrained: R,
    getViewport: P,
    scaleTo: T,
    scaleBy: z,
    setScaleExtent: X,
    setTranslateExtent: q,
    syncViewport: m,
    setClickDistance: V
  };
}
var vn;
(function(t) {
  t.Line = "line", t.Handle = "handle";
})(vn || (vn = {}));
function Ea() {
  return {
    nodes: [],
    edges: [],
    nodeLookup: /* @__PURE__ */ new Map(),
    parentLookup: /* @__PURE__ */ new Map(),
    nodeExtent: Qn,
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
var Ta = Object.defineProperty, $a = Object.getOwnPropertyDescriptor, ye = (t, e, n, r) => {
  for (var i = r > 1 ? void 0 : r ? $a(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (r ? s(e, n, i) : s(i)) || i);
  return r && i && Ta(e, n, i), i;
};
let vt = class extends ae {
  constructor() {
    super(...arguments), this.label = "", this.type = "default", this.selected = !1;
  }
  render() {
    return Vt`
      ${this.type === "input" || this.type === "default" ? Vt`<lit-handle type="source" position="bottom"></lit-handle>` : ""}
      ${this.type === "output" || this.type === "default" ? Vt`<lit-handle type="target" position="top"></lit-handle>` : ""}
      <div class="label">${this.label}</div>
      <slot></slot>
    `;
  }
};
vt.styles = se`
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
ye([
  L({ type: String })
], vt.prototype, "label", 2);
ye([
  L({ type: String, reflect: !0 })
], vt.prototype, "type", 2);
ye([
  L({ type: Boolean, reflect: !0 })
], vt.prototype, "selected", 2);
vt = ye([
  ue("lit-node")
], vt);
var Aa = Object.defineProperty, Ma = Object.getOwnPropertyDescriptor, ut = (t, e, n, r) => {
  for (var i = r > 1 ? void 0 : r ? Ma(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (r ? s(e, n, i) : s(i)) || i);
  return r && i && Aa(e, n, i), i;
};
let nt = class extends ae {
  constructor() {
    super(...arguments), this.sourceX = 0, this.sourceY = 0, this.targetX = 0, this.targetY = 0, this.sourcePosition = C.Right, this.targetPosition = C.Left, this.selected = !1;
  }
  render() {
    const [t] = sa({
      sourceX: this.sourceX,
      sourceY: this.sourceY,
      sourcePosition: this.sourcePosition,
      targetX: this.targetX,
      targetY: this.targetY,
      targetPosition: this.targetPosition
    });
    return lr`
      <path d="${t}" />
    `;
  }
};
nt.styles = se`
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
  L({ type: Number })
], nt.prototype, "sourceX", 2);
ut([
  L({ type: Number })
], nt.prototype, "sourceY", 2);
ut([
  L({ type: Number })
], nt.prototype, "targetX", 2);
ut([
  L({ type: Number })
], nt.prototype, "targetY", 2);
ut([
  L({ type: String })
], nt.prototype, "sourcePosition", 2);
ut([
  L({ type: String })
], nt.prototype, "targetPosition", 2);
ut([
  L({ type: Boolean, reflect: !0 })
], nt.prototype, "selected", 2);
nt = ut([
  ue("lit-edge")
], nt);
var Pa = Object.defineProperty, ka = Object.getOwnPropertyDescriptor, lt = (t, e, n, r) => {
  for (var i = r > 1 ? void 0 : r ? ka(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (r ? s(e, n, i) : s(i)) || i);
  return r && i && Pa(e, n, i), i;
};
let rt = class extends ae {
  constructor() {
    super(...arguments), this._drags = /* @__PURE__ */ new Map(), this._state = Ea(), this.nodeTypes = {
      default: "lit-node",
      input: "lit-node",
      output: "lit-node"
    }, this.edges = [], this.viewport = { x: 0, y: 0, zoom: 1 };
  }
  set nodes(t) {
    const e = this._state.nodes;
    this._state.nodes = t, _n(t, this._state.nodeLookup, this._state.parentLookup, {
      nodeOrigin: this._state.nodeOrigin,
      nodeExtent: this._state.nodeExtent
    }), this.requestUpdate("nodes", e);
  }
  get nodes() {
    return this._state.nodes;
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
      const { width: r, height: i } = e.getBoundingClientRect(), o = this._state.transform[2];
      n.measured = {
        width: r / o,
        height: i / o
      };
      const s = e.shadowRoot?.querySelectorAll("lit-handle");
      if (s) {
        const a = [], c = [];
        s.forEach((u) => {
          const l = u.getBoundingClientRect(), h = e.getBoundingClientRect(), d = {
            id: u.handleId || null,
            type: u.type,
            position: u.position,
            x: (l.left - h.left) / o,
            y: (l.top - h.top) / o,
            width: l.width / o,
            height: l.height / o
          };
          u.type === "source" ? a.push(d) : c.push(d);
        }), n.internals.handleBounds = {
          source: a,
          target: c
        };
      }
      _n(this.nodes, this._state.nodeLookup, this._state.parentLookup, {
        nodeOrigin: this._state.nodeOrigin,
        nodeExtent: this._state.nodeExtent
      }), this.requestUpdate();
    }
  }
  firstUpdated() {
    this._renderer && (this._state.domNode = this._renderer, this._resizeObserver?.observe(this._renderer), this._panZoom = Na({
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
      if (n && (this._resizeObserver?.observe(e), !this._drags.has(n))) {
        const r = ga({
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
                if (a) {
                  a.position = o.position;
                  const c = this.nodes.find((u) => u.id === s);
                  c && (c.position = o.position);
                }
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
    return we`
      <div class="xyflow__renderer">
        <div
          class="xyflow__viewport"
          style="transform: translate(${this.viewport.x}px, ${this.viewport.y}px) scale(${this.viewport.zoom})"
        >
          <svg class="xyflow__edges">
            ${this.edges.map((t) => {
      const e = this._state.nodeLookup.get(t.source), n = this._state.nodeLookup.get(t.target);
      if (!e || !n) return null;
      const r = (e.internals.handleBounds?.source || []).find(
        (a) => a.id === (t.sourceHandle || null)
      ) || e.internals.handleBounds?.source?.[0], i = (n.internals.handleBounds?.target || []).find(
        (a) => a.id === (t.targetHandle || null)
      ) || n.internals.handleBounds?.target?.[0];
      if (!r || !i) return null;
      const o = xn(e, r, r.position, !0), s = xn(n, i, i.position, !0);
      return we`
                <lit-edge
                  .sourceX="${o.x}"
                  .sourceY="${o.y}"
                  .targetX="${s.x}"
                  .targetY="${s.y}"
                  .sourcePosition="${r.position}"
                  .targetPosition="${i.position}"
                  ?selected="${t.selected}"
                ></lit-edge>
              `;
    })}
          </svg>
          <div class="xyflow__nodes">
            ${this.nodes.map((t) => {
      const n = this._state.nodeLookup.get(t.id)?.position || t.position, r = this.nodeTypes[t.type || "default"] || this.nodeTypes.default, i = cr(r);
      return we`
                <${i}
                  class="xyflow__node"
                  data-id="${t.id}"
                  style="transform: translate(${n.x}px, ${n.y}px)"
                  .label="${t.data.label}"
                  .type="${t.type || "default"}"
                  ?selected="${t.selected}"
                >
                </${i}>
              `;
    })}
          </div>
        </div>
      </div>
    `;
  }
};
rt.styles = se`
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
lt([
  bn(".xyflow__renderer")
], rt.prototype, "_renderer", 2);
lt([
  bn(".xyflow__viewport")
], rt.prototype, "_viewport", 2);
lt([
  fr()
], rt.prototype, "_state", 2);
lt([
  L({ type: Object })
], rt.prototype, "nodeTypes", 2);
lt([
  L({ type: Array })
], rt.prototype, "nodes", 1);
lt([
  L({ type: Array })
], rt.prototype, "edges", 2);
lt([
  L({ type: Object })
], rt.prototype, "viewport", 2);
rt = lt([
  ue("lit-flow")
], rt);
var Sa = Object.defineProperty, za = Object.getOwnPropertyDescriptor, me = (t, e, n, r) => {
  for (var i = r > 1 ? void 0 : r ? za(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (r ? s(e, n, i) : s(i)) || i);
  return r && i && Sa(e, n, i), i;
};
let bt = class extends ae {
  constructor() {
    super(...arguments), this.type = "source", this.position = C.Top;
  }
  render() {
    return Vt``;
  }
};
bt.styles = se`
    :host {
      position: absolute;
      width: 8px;
      height: 8px;
      background: #555;
      border: 1px solid white;
      border-radius: 50%;
      z-index: 10;
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
me([
  L({ type: String, reflect: !0 })
], bt.prototype, "type", 2);
me([
  L({ type: String, reflect: !0 })
], bt.prototype, "position", 2);
me([
  L({ type: String })
], bt.prototype, "handleId", 2);
bt = me([
  ue("lit-handle")
], bt);
