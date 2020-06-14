var JASE = null;//JASE.emit("data", 'hello');//term
var JAUE = null;//JAUE.on("data", function(data) {})//socket
!function(t) {
    var e = {};
    function r(n) {
        if (e[n])
            return e[n].exports;
        var i = e[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return t[n].call(i.exports, i, i.exports, r),
        i.l = !0,
        i.exports
    }
    r.m = t,
    r.c = e,
    r.d = function(t, e, n) {
        r.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: n
        })
    }
    ,
    r.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }
    ,
    r.t = function(t, e) {
        if (1 & e && (t = r(t)),
        8 & e)
            return t;
        if (4 & e && "object" == typeof t && t && t.__esModule)
            return t;
        var n = Object.create(null);
        if (r.r(n),
        Object.defineProperty(n, "default", {
            enumerable: !0,
            value: t
        }),
        2 & e && "string" != typeof t)
            for (var i in t)
                r.d(n, i, function(e) {
                    return t[e]
                }
                .bind(null, i));
        return n
    }
    ,
    r.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        }
        : function() {
            return t
        }
        ;
        return r.d(e, "a", e),
        e
    }
    ,
    r.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }
    ,
    r.p = "",
    r(r.s = 52)
}([function(t, e, r) {
    function n(t) {
        if (t)
            return function(t) {
                for (var e in n.prototype)
                    t[e] = n.prototype[e];
                return t
            }(t)
    }
    (t.exports = n).prototype.on = n.prototype.addEventListener = function(t, e) {
        return this._callbacks = this._callbacks || {},
        (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e),
        this
    }
    ,
    n.prototype.once = function(t, e) {
        function r() {
            this.off(t, r),
            e.apply(this, arguments)
        }
        return r.fn = e,
        this.on(t, r),
        this
    }
    ,
    n.prototype.off = n.prototype.removeListener = n.prototype.removeAllListeners = n.prototype.removeEventListener = function(t, e) {
        if (this._callbacks = this._callbacks || {},
        0 == arguments.length)
            return this._callbacks = {},
            this;
        var r, n = this._callbacks["$" + t];
        if (!n)
            return this;
        if (1 == arguments.length)
            return delete this._callbacks["$" + t],
            this;
        for (var i = 0; i < n.length; i++)
            if ((r = n[i]) === e || r.fn === e) {
                n.splice(i, 1);
                break
            }
        return this
    }
    ,
    n.prototype.emit = function(t) {
        this._callbacks = this._callbacks || {};
        var e = [].slice.call(arguments, 1)
          , r = this._callbacks["$" + t];
        if (r)
            for (var n = 0, i = (r = r.slice(0)).length; n < i; ++n)
                r[n].apply(this, e);
        return this
    }
    ,
    n.prototype.listeners = function(t) {
        return this._callbacks = this._callbacks || {},
        this._callbacks["$" + t] || []
    }
    ,
    n.prototype.hasListeners = function(t) {
        return !!this.listeners(t).length
    }
}
, function(t, e, r) {
    var n, i = r(40), o = r(21), s = r(41), a = r(42), l = r(43);
    "undefined" != typeof ArrayBuffer && (n = r(44));
    var c = "undefined" != typeof navigator && /Android/i.test(navigator.userAgent)
      , h = "undefined" != typeof navigator && /PhantomJS/i.test(navigator.userAgent)
      , u = c || h;
    e.protocol = 3;
    var f = e.packets = {
        open: 0,
        close: 1,
        ping: 2,
        pong: 3,
        message: 4,
        upgrade: 5,
        noop: 6
    }
      , p = i(f)
      , d = {
        type: "error",
        data: "parser error"
    }
      , _ = r(45);
    function m(t, e, r) {
        for (var n = new Array(t.length), i = a(t.length, r), o = function(t, r, i) {
            e(r, function(e, r) {
                n[t] = r,
                i(e, n)
            })
        }, s = 0; s < t.length; s++)
            o(s, t[s], i)
    }
    e.encodePacket = function(t, r, n, i) {
        "function" == typeof r && (i = r,
        r = !1),
        "function" == typeof n && (i = n,
        n = null);
        var o, s = void 0 === t.data ? void 0 : t.data.buffer || t.data;
        if ("undefined" != typeof ArrayBuffer && s instanceof ArrayBuffer)
            return function(t, r, n) {
                if (!r)
                    return e.encodeBase64Packet(t, n);
                var i = t.data
                  , o = new Uint8Array(i)
                  , s = new Uint8Array(1 + i.byteLength);
                s[0] = f[t.type];
                for (var a = 0; a < o.length; a++)
                    s[a + 1] = o[a];
                return n(s.buffer)
            }(t, r, i);
        if (void 0 !== _ && s instanceof _)
            return function(t, r, n) {
                if (!r)
                    return e.encodeBase64Packet(t, n);
                if (u)
                    return function(t, r, n) {
                        if (!r)
                            return e.encodeBase64Packet(t, n);
                        var i = new FileReader;
                        return i.onload = function() {
                            e.encodePacket({
                                type: t.type,
                                data: i.result
                            }, r, !0, n)
                        }
                        ,
                        i.readAsArrayBuffer(t.data)
                    }(t, r, n);
                var i = new Uint8Array(1);
                return i[0] = f[t.type],
                n(new _([i.buffer, t.data]))
            }(t, r, i);
        if (s && s.base64)
            return o = t,
            i("b" + e.packets[o.type] + o.data.data);
        var a = f[t.type];
        return void 0 !== t.data && (a += n ? l.encode(String(t.data), {
            strict: !1
        }) : String(t.data)),
        i("" + a)
    }
    ,
    e.encodeBase64Packet = function(t, r) {
        var n, i = "b" + e.packets[t.type];
        if (void 0 !== _ && t.data instanceof _) {
            var o = new FileReader;
            return o.onload = function() {
                var t = o.result.split(",")[1];
                r(i + t)
            }
            ,
            o.readAsDataURL(t.data)
        }
        try {
            n = String.fromCharCode.apply(null, new Uint8Array(t.data))
        } catch (e) {
            for (var s = new Uint8Array(t.data), a = new Array(s.length), l = 0; l < s.length; l++)
                a[l] = s[l];
            n = String.fromCharCode.apply(null, a)
        }
        return i += btoa(n),
        r(i)
    }
    ,
    e.decodePacket = function(t, r, n) {
        if (void 0 === t)
            return d;
        if ("string" == typeof t) {
            if ("b" === t.charAt(0))
                return e.decodeBase64Packet(t.substr(1), r);
            if (n && !1 === (t = function(t) {
                try {
                    t = l.decode(t, {
                        strict: !1
                    })
                } catch (t) {
                    return !1
                }
                return t
            }(t)))
                return d;
            var i = t.charAt(0);
            return Number(i) == i && p[i] ? 1 < t.length ? {
                type: p[i],
                data: t.substring(1)
            } : {
                type: p[i]
            } : d
        }
        i = new Uint8Array(t)[0];
        var o = s(t, 1);
        return _ && "blob" === r && (o = new _([o])),
        {
            type: p[i],
            data: o
        }
    }
    ,
    e.decodeBase64Packet = function(t, e) {
        var r = p[t.charAt(0)];
        if (!n)
            return {
                type: r,
                data: {
                    base64: !0,
                    data: t.substr(1)
                }
            };
        var i = n.decode(t.substr(1));
        return "blob" === e && _ && (i = new _([i])),
        {
            type: r,
            data: i
        }
    }
    ,
    e.encodePayload = function(t, r, n) {
        "function" == typeof r && (n = r,
        r = null);
        var i = o(t);
        return r && i ? _ && !u ? e.encodePayloadAsBlob(t, n) : e.encodePayloadAsArrayBuffer(t, n) : t.length ? void m(t, function(t, n) {
            e.encodePacket(t, !!i && r, !1, function(t) {
                var e;
                n(null, (e = t).length + ":" + e)
            })
        }, function(t, e) {
            return n(e.join(""))
        }) : n("0:")
    }
    ,
    e.decodePayload = function(t, r, n) {
        if ("string" != typeof t)
            return e.decodePayloadAsBinary(t, r, n);
        var i;
        if ("function" == typeof r && (n = r,
        r = null),
        "" === t)
            return n(d, 0, 1);
        for (var o, s, a = "", l = 0, c = t.length; l < c; l++) {
            var h = t.charAt(l);
            if (":" === h) {
                if ("" === a || a != (o = Number(a)))
                    return n(d, 0, 1);
                if (a != (s = t.substr(l + 1, o)).length)
                    return n(d, 0, 1);
                if (s.length) {
                    if (i = e.decodePacket(s, r, !1),
                    d.type === i.type && d.data === i.data)
                        return n(d, 0, 1);
                    if (!1 === n(i, l + o, c))
                        return
                }
                l += o,
                a = ""
            } else
                a += h
        }
        return "" !== a ? n(d, 0, 1) : void 0
    }
    ,
    e.encodePayloadAsArrayBuffer = function(t, r) {
        if (!t.length)
            return r(new ArrayBuffer(0));
        m(t, function(t, r) {
            e.encodePacket(t, !0, !0, function(t) {
                return r(null, t)
            })
        }, function(t, e) {
            var n = e.reduce(function(t, e) {
                var r;
                return t + (r = "string" == typeof e ? e.length : e.byteLength).toString().length + r + 2
            }, 0)
              , i = new Uint8Array(n)
              , o = 0;
            return e.forEach(function(t) {
                var e = "string" == typeof t
                  , r = t;
                if (e) {
                    for (var n = new Uint8Array(t.length), s = 0; s < t.length; s++)
                        n[s] = t.charCodeAt(s);
                    r = n.buffer
                }
                i[o++] = e ? 0 : 1;
                var a = r.byteLength.toString();
                for (s = 0; s < a.length; s++)
                    i[o++] = parseInt(a[s]);
                for (i[o++] = 255,
                n = new Uint8Array(r),
                s = 0; s < n.length; s++)
                    i[o++] = n[s]
            }),
            r(i.buffer)
        })
    }
    ,
    e.encodePayloadAsBlob = function(t, r) {
        m(t, function(t, r) {
            e.encodePacket(t, !0, !0, function(t) {
                var e = new Uint8Array(1);
                if (e[0] = 1,
                "string" == typeof t) {
                    for (var n = new Uint8Array(t.length), i = 0; i < t.length; i++)
                        n[i] = t.charCodeAt(i);
                    t = n.buffer,
                    e[0] = 0
                }
                var o = (t instanceof ArrayBuffer ? t.byteLength : t.size).toString()
                  , s = new Uint8Array(o.length + 1);
                for (i = 0; i < o.length; i++)
                    s[i] = parseInt(o[i]);
                if (s[o.length] = 255,
                _) {
                    var a = new _([e.buffer, s.buffer, t]);
                    r(null, a)
                }
            })
        }, function(t, e) {
            return r(new _(e))
        })
    }
    ,
    e.decodePayloadAsBinary = function(t, r, n) {
        "function" == typeof r && (n = r,
        r = null);
        for (var i = t, o = []; 0 < i.byteLength; ) {
            for (var a = new Uint8Array(i), l = 0 === a[0], c = "", h = 1; 255 !== a[h]; h++) {
                if (310 < c.length)
                    return n(d, 0, 1);
                c += a[h]
            }
            i = s(i, 2 + c.length),
            c = parseInt(c);
            var u = s(i, 0, c);
            if (l)
                try {
                    u = String.fromCharCode.apply(null, new Uint8Array(u))
                } catch (t) {
                    var f = new Uint8Array(u);
                    for (u = "",
                    h = 0; h < f.length; h++)
                        u += String.fromCharCode(f[h])
                }
            o.push(u),
            i = s(i, c)
        }
        var p = o.length;
        o.forEach(function(t, i) {
            n(e.decodePacket(t, r, !0), i, p)
        })
    }
}
, function(t, e, r) {
    (function(n) {
        function i() {
            var t;
            try {
                t = e.storage.debug
            } catch (t) {}
            return !t && void 0 !== n && "env"in n && (t = n.env.DEBUG),
            t
        }
        (e = t.exports = r(29)).log = function() {
            return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
        }
        ,
        e.formatArgs = function(t) {
            var r = this.useColors;
            if (t[0] = (r ? "%c" : "") + this.namespace + (r ? " %c" : " ") + t[0] + (r ? "%c " : " ") + "+" + e.humanize(this.diff),
            r) {
                var n = "color: " + this.color;
                t.splice(1, 0, n, "color: inherit");
                var i = 0
                  , o = 0;
                t[0].replace(/%[a-zA-Z%]/g, function(t) {
                    "%%" !== t && (i++,
                    "%c" === t && (o = i))
                }),
                t.splice(o, 0, n)
            }
        }
        ,
        e.save = function(t) {
            try {
                null == t ? e.storage.removeItem("debug") : e.storage.debug = t
            } catch (t) {}
        }
        ,
        e.load = i,
        e.useColors = function() {
            return !("undefined" == typeof window || !window.process || "renderer" !== window.process.type) || ("undefined" == typeof navigator || !navigator.userAgent || !navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) && ("undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && 31 <= parseInt(RegExp.$1, 10) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
        }
        ,
        e.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : function() {
            try {
                return window.localStorage
            } catch (t) {}
        }(),
        e.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"],
        e.formatters.j = function(t) {
            try {
                return JSON.stringify(t)
            } catch (t) {
                return "[UnexpectedJSONParseError]: " + t.message
            }
        }
        ,
        e.enable(i())
    }
    ).call(this, r(6))
}
, function(t, e) {
    e.encode = function(t) {
        var e = "";
        for (var r in t)
            t.hasOwnProperty(r) && (e.length && (e += "&"),
            e += encodeURIComponent(r) + "=" + encodeURIComponent(t[r]));
        return e
    }
    ,
    e.decode = function(t) {
        for (var e = {}, r = t.split("&"), n = 0, i = r.length; n < i; n++) {
            var o = r[n].split("=");
            e[decodeURIComponent(o[0])] = decodeURIComponent(o[1])
        }
        return e
    }
}
, function(t, e) {
    t.exports = function(t, e) {
        var r = function() {};
        r.prototype = e.prototype,
        t.prototype = new r,
        t.prototype.constructor = t
    }
}
, function(t, e, r) {
    (function(n) {
        function i() {
            var t;
            try {
                t = e.storage.debug
            } catch (t) {}
            return !t && void 0 !== n && "env"in n && (t = n.env.DEBUG),
            t
        }
        (e = t.exports = r(46)).log = function() {
            return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
        }
        ,
        e.formatArgs = function(t) {
            var r = this.useColors;
            if (t[0] = (r ? "%c" : "") + this.namespace + (r ? " %c" : " ") + t[0] + (r ? "%c " : " ") + "+" + e.humanize(this.diff),
            r) {
                var n = "color: " + this.color;
                t.splice(1, 0, n, "color: inherit");
                var i = 0
                  , o = 0;
                t[0].replace(/%[a-zA-Z%]/g, function(t) {
                    "%%" !== t && (i++,
                    "%c" === t && (o = i))
                }),
                t.splice(o, 0, n)
            }
        }
        ,
        e.save = function(t) {
            try {
                null == t ? e.storage.removeItem("debug") : e.storage.debug = t
            } catch (t) {}
        }
        ,
        e.load = i,
        e.useColors = function() {
            return !("undefined" == typeof window || !window.process || "renderer" !== window.process.type) || ("undefined" == typeof navigator || !navigator.userAgent || !navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) && ("undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && 31 <= parseInt(RegExp.$1, 10) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
        }
        ,
        e.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : function() {
            try {
                return window.localStorage
            } catch (t) {}
        }(),
        e.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"],
        e.formatters.j = function(t) {
            try {
                return JSON.stringify(t)
            } catch (t) {
                return "[UnexpectedJSONParseError]: " + t.message
            }
        }
        ,
        e.enable(i())
    }
    ).call(this, r(6))
}
, function(t, e) {
    var r, n, i = t.exports = {};
    function o() {
        throw new Error("setTimeout has not been defined")
    }
    function s() {
        throw new Error("clearTimeout has not been defined")
    }
    function a(t) {
        if (r === setTimeout)
            return setTimeout(t, 0);
        if ((r === o || !r) && setTimeout)
            return r = setTimeout,
            setTimeout(t, 0);
        try {
            return r(t, 0)
        } catch (e) {
            try {
                return r.call(null, t, 0)
            } catch (e) {
                return r.call(this, t, 0)
            }
        }
    }
    !function() {
        try {
            r = "function" == typeof setTimeout ? setTimeout : o
        } catch (t) {
            r = o
        }
        try {
            n = "function" == typeof clearTimeout ? clearTimeout : s
        } catch (t) {
            n = s
        }
    }();
    var l, c = [], h = !1, u = -1;
    function f() {
        h && l && (h = !1,
        l.length ? c = l.concat(c) : u = -1,
        c.length && p())
    }
    function p() {
        if (!h) {
            var t = a(f);
            h = !0;
            for (var e = c.length; e; ) {
                for (l = c,
                c = []; ++u < e; )
                    l && l[u].run();
                u = -1,
                e = c.length
            }
            l = null,
            h = !1,
            function(t) {
                if (n === clearTimeout)
                    return clearTimeout(t);
                if ((n === s || !n) && clearTimeout)
                    return n = clearTimeout,
                    clearTimeout(t);
                try {
                    n(t)
                } catch (e) {
                    try {
                        return n.call(null, t)
                    } catch (e) {
                        return n.call(this, t)
                    }
                }
            }(t)
        }
    }
    function d(t, e) {
        this.fun = t,
        this.array = e
    }
    function _() {}
    i.nextTick = function(t) {
        var e = new Array(arguments.length - 1);
        if (1 < arguments.length)
            for (var r = 1; r < arguments.length; r++)
                e[r - 1] = arguments[r];
        c.push(new d(t,e)),
        1 !== c.length || h || a(p)
    }
    ,
    d.prototype.run = function() {
        this.fun.apply(null, this.array)
    }
    ,
    i.title = "browser",
    i.browser = !0,
    i.env = {},
    i.argv = [],
    i.version = "",
    i.versions = {},
    i.on = _,
    i.addListener = _,
    i.once = _,
    i.off = _,
    i.removeListener = _,
    i.removeAllListeners = _,
    i.emit = _,
    i.prependListener = _,
    i.prependOnceListener = _,
    i.listeners = function(t) {
        return []
    }
    ,
    i.binding = function(t) {
        throw new Error("process.binding is not supported")
    }
    ,
    i.cwd = function() {
        return "/"
    }
    ,
    i.chdir = function(t) {
        throw new Error("process.chdir is not supported")
    }
    ,
    i.umask = function() {
        return 0
    }
}
, function(t, e) {
    var r = 36e5
      , n = 864e5;
    function i(t, e, r) {
        if (!(t < e))
            return t < 1.5 * e ? Math.floor(t / e) + " " + r : Math.ceil(t / e) + " " + r + "s"
    }
    t.exports = function(t, e) {
        e = e || {};
        var o, s = typeof t;
        if ("string" === s && 0 < t.length)
            return function(t) {
                if (!(100 < (t = String(t)).length)) {
                    var e = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(t);
                    if (e) {
                        var i = parseFloat(e[1]);
                        switch ((e[2] || "ms").toLowerCase()) {
                        case "years":
                        case "year":
                        case "yrs":
                        case "yr":
                        case "y":
                            return 315576e5 * i;
                        case "days":
                        case "day":
                        case "d":
                            return i * n;
                        case "hours":
                        case "hour":
                        case "hrs":
                        case "hr":
                        case "h":
                            return i * r;
                        case "minutes":
                        case "minute":
                        case "mins":
                        case "min":
                        case "m":
                            return 6e4 * i;
                        case "seconds":
                        case "second":
                        case "secs":
                        case "sec":
                        case "s":
                            return 1e3 * i;
                        case "milliseconds":
                        case "millisecond":
                        case "msecs":
                        case "msec":
                        case "ms":
                            return i;
                        default:
                            return
                        }
                    }
                }
            }(t);
        if ("number" === s && !1 === isNaN(t))
            return e.long ? i(o = t, n, "day") || i(o, r, "hour") || i(o, 6e4, "minute") || i(o, 1e3, "second") || o + " ms" : function(t) {
                return n <= t ? Math.round(t / n) + "d" : r <= t ? Math.round(t / r) + "h" : 6e4 <= t ? Math.round(t / 6e4) + "m" : 1e3 <= t ? Math.round(t / 1e3) + "s" : t + "ms"
            }(t);
        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(t))
    }
}
, function(t, e, r) {
    var n = r(30)("socket.io-parser")
      , i = r(0)
      , o = r(32)
      , s = r(9)
      , a = r(16);
    function l() {}
    e.protocol = 4,
    e.types = ["CONNECT", "DISCONNECT", "EVENT", "ACK", "ERROR", "BINARY_EVENT", "BINARY_ACK"],
    e.CONNECT = 0,
    e.DISCONNECT = 1,
    e.EVENT = 2,
    e.ACK = 3,
    e.ERROR = 4,
    e.BINARY_EVENT = 5,
    e.BINARY_ACK = 6,
    e.Encoder = l,
    e.Decoder = u;
    var c = e.ERROR + '"encode error"';
    function h(t) {
        var r = "" + t.type;
        if (e.BINARY_EVENT !== t.type && e.BINARY_ACK !== t.type || (r += t.attachments + "-"),
        t.nsp && "/" !== t.nsp && (r += t.nsp + ","),
        null != t.id && (r += t.id),
        null != t.data) {
            var i = function(t) {
                try {
                    return JSON.stringify(t)
                } catch (t) {
                    return !1
                }
            }(t.data);
            if (!1 === i)
                return c;
            r += i
        }
        return n("encoded %j as %s", t, r),
        r
    }
    function u() {
        this.reconstructor = null
    }
    function f(t) {
        this.reconPack = t,
        this.buffers = []
    }
    function p(t) {
        return {
            type: e.ERROR,
            data: "parser error: " + t
        }
    }
    l.prototype.encode = function(t, r) {
        var i, s;
        n("encoding packet %j", t),
        e.BINARY_EVENT === t.type || e.BINARY_ACK === t.type ? (i = t,
        s = r,
        o.removeBlobs(i, function(t) {
            var e = o.deconstructPacket(t)
              , r = h(e.packet)
              , n = e.buffers;
            n.unshift(r),
            s(n)
        })) : r([h(t)])
    }
    ,
    i(u.prototype),
    u.prototype.add = function(t) {
        var r;
        if ("string" == typeof t)
            r = function(t) {
                var r = 0
                  , i = {
                    type: Number(t.charAt(0))
                };
                if (null == e.types[i.type])
                    return p("unknown packet type " + i.type);
                if (e.BINARY_EVENT === i.type || e.BINARY_ACK === i.type) {
                    for (var o = ""; "-" !== t.charAt(++r) && (o += t.charAt(r),
                    r != t.length); )
                        ;
                    if (o != Number(o) || "-" !== t.charAt(r))
                        throw new Error("Illegal attachments");
                    i.attachments = Number(o)
                }
                if ("/" === t.charAt(r + 1))
                    for (i.nsp = ""; ++r; ) {
                        if ("," === (l = t.charAt(r)))
                            break;
                        if (i.nsp += l,
                        r === t.length)
                            break
                    }
                else
                    i.nsp = "/";
                var a = t.charAt(r + 1);
                if ("" !== a && Number(a) == a) {
                    for (i.id = ""; ++r; ) {
                        var l;
                        if (null == (l = t.charAt(r)) || Number(l) != l) {
                            --r;
                            break
                        }
                        if (i.id += t.charAt(r),
                        r === t.length)
                            break
                    }
                    i.id = Number(i.id)
                }
                if (t.charAt(++r)) {
                    var c = function(t) {
                        try {
                            return JSON.parse(t)
                        } catch (t) {
                            return !1
                        }
                    }(t.substr(r));
                    if (!(!1 !== c && (i.type === e.ERROR || s(c))))
                        return p("invalid payload");
                    i.data = c
                }
                return n("decoded %s as %j", t, i),
                i
            }(t),
            e.BINARY_EVENT === r.type || e.BINARY_ACK === r.type ? (this.reconstructor = new f(r),
            0 === this.reconstructor.reconPack.attachments && this.emit("decoded", r)) : this.emit("decoded", r);
        else {
            if (!a(t) && !t.base64)
                throw new Error("Unknown type: " + t);
            if (!this.reconstructor)
                throw new Error("got binary data when not reconstructing a packet");
            (r = this.reconstructor.takeBinaryData(t)) && (this.reconstructor = null,
            this.emit("decoded", r))
        }
    }
    ,
    u.prototype.destroy = function() {
        this.reconstructor && this.reconstructor.finishedReconstruction()
    }
    ,
    f.prototype.takeBinaryData = function(t) {
        if (this.buffers.push(t),
        this.buffers.length !== this.reconPack.attachments)
            return null;
        var e = o.reconstructPacket(this.reconPack, this.buffers);
        return this.finishedReconstruction(),
        e
    }
    ,
    f.prototype.finishedReconstruction = function() {
        this.reconPack = null,
        this.buffers = []
    }
}
, function(t, e) {
    var r = {}.toString;
    t.exports = Array.isArray || function(t) {
        return "[object Array]" == r.call(t)
    }
}
, function(t, e, r) {
    "use strict";
    (function(t) {
        var n = r(33)
          , i = r(34)
          , o = r(35);
        function s() {
            return l.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
        }
        function a(t, e) {
            if (s() < e)
                throw new RangeError("Invalid typed array length");
            return l.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e)).__proto__ = l.prototype : (null === t && (t = new l(e)),
            t.length = e),
            t
        }
        function l(t, e, r) {
            if (!(l.TYPED_ARRAY_SUPPORT || this instanceof l))
                return new l(t,e,r);
            if ("number" != typeof t)
                return c(this, t, e, r);
            if ("string" == typeof e)
                throw new Error("If encoding is specified then the first argument must be a string");
            return u(this, t)
        }
        function c(t, e, r, n) {
            if ("number" == typeof e)
                throw new TypeError('"value" argument must not be a number');
            return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? function(t, e, r, n) {
                if (e.byteLength,
                r < 0 || e.byteLength < r)
                    throw new RangeError("'offset' is out of bounds");
                if (e.byteLength < r + (n || 0))
                    throw new RangeError("'length' is out of bounds");
                return e = void 0 === r && void 0 === n ? new Uint8Array(e) : void 0 === n ? new Uint8Array(e,r) : new Uint8Array(e,r,n),
                l.TYPED_ARRAY_SUPPORT ? (t = e).__proto__ = l.prototype : t = f(t, e),
                t
            }(t, e, r, n) : "string" == typeof e ? function(t, e, r) {
                if ("string" == typeof r && "" !== r || (r = "utf8"),
                !l.isEncoding(r))
                    throw new TypeError('"encoding" must be a valid string encoding');
                var n = 0 | d(e, r)
                  , i = (t = a(t, n)).write(e, r);
                return i !== n && (t = t.slice(0, i)),
                t
            }(t, e, r) : function(t, e) {
                if (l.isBuffer(e)) {
                    var r = 0 | p(e.length);
                    return 0 === (t = a(t, r)).length || e.copy(t, 0, 0, r),
                    t
                }
                if (e) {
                    if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length"in e)
                        return "number" != typeof e.length || (n = e.length) != n ? a(t, 0) : f(t, e);
                    if ("Buffer" === e.type && o(e.data))
                        return f(t, e.data)
                }
                var n;
                throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
            }(t, e)
        }
        function h(t) {
            if ("number" != typeof t)
                throw new TypeError('"size" argument must be a number');
            if (t < 0)
                throw new RangeError('"size" argument must not be negative')
        }
        function u(t, e) {
            if (h(e),
            t = a(t, e < 0 ? 0 : 0 | p(e)),
            !l.TYPED_ARRAY_SUPPORT)
                for (var r = 0; r < e; ++r)
                    t[r] = 0;
            return t
        }
        function f(t, e) {
            var r = e.length < 0 ? 0 : 0 | p(e.length);
            t = a(t, r);
            for (var n = 0; n < r; n += 1)
                t[n] = 255 & e[n];
            return t
        }
        function p(t) {
            if (t >= s())
                throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s().toString(16) + " bytes");
            return 0 | t
        }
        function d(t, e) {
            if (l.isBuffer(t))
                return t.length;
            if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer))
                return t.byteLength;
            "string" != typeof t && (t = "" + t);
            var r = t.length;
            if (0 === r)
                return 0;
            for (var n = !1; ; )
                switch (e) {
                case "ascii":
                case "latin1":
                case "binary":
                    return r;
                case "utf8":
                case "utf-8":
                case void 0:
                    return F(t).length;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return 2 * r;
                case "hex":
                    return r >>> 1;
                case "base64":
                    return I(t).length;
                default:
                    if (n)
                        return F(t).length;
                    e = ("" + e).toLowerCase(),
                    n = !0
                }
        }
        function _(t, e, r) {
            var n = t[e];
            t[e] = t[r],
            t[r] = n
        }
        function m(t, e, r, n, i) {
            if (0 === t.length)
                return -1;
            if ("string" == typeof r ? (n = r,
            r = 0) : 2147483647 < r ? r = 2147483647 : r < -2147483648 && (r = -2147483648),
            r = +r,
            isNaN(r) && (r = i ? 0 : t.length - 1),
            r < 0 && (r = t.length + r),
            r >= t.length) {
                if (i)
                    return -1;
                r = t.length - 1
            } else if (r < 0) {
                if (!i)
                    return -1;
                r = 0
            }
            if ("string" == typeof e && (e = l.from(e, n)),
            l.isBuffer(e))
                return 0 === e.length ? -1 : y(t, e, r, n, i);
            if ("number" == typeof e)
                return e &= 255,
                l.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype.indexOf.call(t, e, r) : Uint8Array.prototype.lastIndexOf.call(t, e, r) : y(t, [e], r, n, i);
            throw new TypeError("val must be string, number or Buffer")
        }
        function y(t, e, r, n, i) {
            var o, s = 1, a = t.length, l = e.length;
            if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                if (t.length < 2 || e.length < 2)
                    return -1;
                a /= s = 2,
                l /= 2,
                r /= 2
            }
            function c(t, e) {
                return 1 === s ? t[e] : t.readUInt16BE(e * s)
            }
            if (i) {
                var h = -1;
                for (o = r; o < a; o++)
                    if (c(t, o) === c(e, -1 === h ? 0 : o - h)) {
                        if (-1 === h && (h = o),
                        o - h + 1 === l)
                            return h * s
                    } else
                        -1 !== h && (o -= o - h),
                        h = -1
            } else
                for (a < r + l && (r = a - l),
                o = r; 0 <= o; o--) {
                    for (var u = !0, f = 0; f < l; f++)
                        if (c(t, o + f) !== c(e, f)) {
                            u = !1;
                            break
                        }
                    if (u)
                        return o
                }
            return -1
        }
        function g(t, e, r, n) {
            r = Number(r) || 0;
            var i = t.length - r;
            n ? i < (n = Number(n)) && (n = i) : n = i;
            var o = e.length;
            if (o % 2 != 0)
                throw new TypeError("Invalid hex string");
            o / 2 < n && (n = o / 2);
            for (var s = 0; s < n; ++s) {
                var a = parseInt(e.substr(2 * s, 2), 16);
                if (isNaN(a))
                    return s;
                t[r + s] = a
            }
            return s
        }
        function v(t, e, r, n) {
            return P(function(t) {
                for (var e = [], r = 0; r < t.length; ++r)
                    e.push(255 & t.charCodeAt(r));
                return e
            }(e), t, r, n)
        }
        function C(t, e, r) {
            return 0 === e && r === t.length ? n.fromByteArray(t) : n.fromByteArray(t.slice(e, r))
        }
        function b(t, e, r) {
            r = Math.min(t.length, r);
            for (var n = [], i = e; i < r; ) {
                var o, s, a, l, c = t[i], h = null, u = 239 < c ? 4 : 223 < c ? 3 : 191 < c ? 2 : 1;
                if (i + u <= r)
                    switch (u) {
                    case 1:
                        c < 128 && (h = c);
                        break;
                    case 2:
                        128 == (192 & (o = t[i + 1])) && 127 < (l = (31 & c) << 6 | 63 & o) && (h = l);
                        break;
                    case 3:
                        o = t[i + 1],
                        s = t[i + 2],
                        128 == (192 & o) && 128 == (192 & s) && 2047 < (l = (15 & c) << 12 | (63 & o) << 6 | 63 & s) && (l < 55296 || 57343 < l) && (h = l);
                        break;
                    case 4:
                        o = t[i + 1],
                        s = t[i + 2],
                        a = t[i + 3],
                        128 == (192 & o) && 128 == (192 & s) && 128 == (192 & a) && 65535 < (l = (15 & c) << 18 | (63 & o) << 12 | (63 & s) << 6 | 63 & a) && l < 1114112 && (h = l)
                    }
                null === h ? (h = 65533,
                u = 1) : 65535 < h && (h -= 65536,
                n.push(h >>> 10 & 1023 | 55296),
                h = 56320 | 1023 & h),
                n.push(h),
                i += u
            }
            return function(t) {
                var e = t.length;
                if (e <= w)
                    return String.fromCharCode.apply(String, t);
                for (var r = "", n = 0; n < e; )
                    r += String.fromCharCode.apply(String, t.slice(n, n += w));
                return r
            }(n)
        }
        e.Buffer = l,
        e.SlowBuffer = function(t) {
            return +t != t && (t = 0),
            l.alloc(+t)
        }
        ,
        e.INSPECT_MAX_BYTES = 50,
        l.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : function() {
            try {
                var t = new Uint8Array(1);
                return t.__proto__ = {
                    __proto__: Uint8Array.prototype,
                    foo: function() {
                        return 42
                    }
                },
                42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength
            } catch (t) {
                return !1
            }
        }(),
        e.kMaxLength = s(),
        l.poolSize = 8192,
        l._augment = function(t) {
            return t.__proto__ = l.prototype,
            t
        }
        ,
        l.from = function(t, e, r) {
            return c(null, t, e, r)
        }
        ,
        l.TYPED_ARRAY_SUPPORT && (l.prototype.__proto__ = Uint8Array.prototype,
        l.__proto__ = Uint8Array,
        "undefined" != typeof Symbol && Symbol.species && l[Symbol.species] === l && Object.defineProperty(l, Symbol.species, {
            value: null,
            configurable: !0
        })),
        l.alloc = function(t, e, r) {
            return n = null,
            o = e,
            s = r,
            h(i = t),
            i <= 0 ? a(n, i) : void 0 !== o ? "string" == typeof s ? a(n, i).fill(o, s) : a(n, i).fill(o) : a(n, i);
            var n, i, o, s
        }
        ,
        l.allocUnsafe = function(t) {
            return u(null, t)
        }
        ,
        l.allocUnsafeSlow = function(t) {
            return u(null, t)
        }
        ,
        l.isBuffer = function(t) {
            return !(null == t || !t._isBuffer)
        }
        ,
        l.compare = function(t, e) {
            if (!l.isBuffer(t) || !l.isBuffer(e))
                throw new TypeError("Arguments must be Buffers");
            if (t === e)
                return 0;
            for (var r = t.length, n = e.length, i = 0, o = Math.min(r, n); i < o; ++i)
                if (t[i] !== e[i]) {
                    r = t[i],
                    n = e[i];
                    break
                }
            return r < n ? -1 : n < r ? 1 : 0
        }
        ,
        l.isEncoding = function(t) {
            switch (String(t).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return !0;
            default:
                return !1
            }
        }
        ,
        l.concat = function(t, e) {
            if (!o(t))
                throw new TypeError('"list" argument must be an Array of Buffers');
            if (0 === t.length)
                return l.alloc(0);
            var r;
            if (void 0 === e)
                for (r = e = 0; r < t.length; ++r)
                    e += t[r].length;
            var n = l.allocUnsafe(e)
              , i = 0;
            for (r = 0; r < t.length; ++r) {
                var s = t[r];
                if (!l.isBuffer(s))
                    throw new TypeError('"list" argument must be an Array of Buffers');
                s.copy(n, i),
                i += s.length
            }
            return n
        }
        ,
        l.byteLength = d,
        l.prototype._isBuffer = !0,
        l.prototype.swap16 = function() {
            var t = this.length;
            if (t % 2 != 0)
                throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (var e = 0; e < t; e += 2)
                _(this, e, e + 1);
            return this
        }
        ,
        l.prototype.swap32 = function() {
            var t = this.length;
            if (t % 4 != 0)
                throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (var e = 0; e < t; e += 4)
                _(this, e, e + 3),
                _(this, e + 1, e + 2);
            return this
        }
        ,
        l.prototype.swap64 = function() {
            var t = this.length;
            if (t % 8 != 0)
                throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (var e = 0; e < t; e += 8)
                _(this, e, e + 7),
                _(this, e + 1, e + 6),
                _(this, e + 2, e + 5),
                _(this, e + 3, e + 4);
            return this
        }
        ,
        l.prototype.toString = function() {
            var t = 0 | this.length;
            return 0 === t ? "" : 0 === arguments.length ? b(this, 0, t) : function(t, e, r) {
                var n = !1;
                if ((void 0 === e || e < 0) && (e = 0),
                e > this.length)
                    return "";
                if ((void 0 === r || r > this.length) && (r = this.length),
                r <= 0)
                    return "";
                if ((r >>>= 0) <= (e >>>= 0))
                    return "";
                for (t || (t = "utf8"); ; )
                    switch (t) {
                    case "hex":
                        return S(this, e, r);
                    case "utf8":
                    case "utf-8":
                        return b(this, e, r);
                    case "ascii":
                        return E(this, e, r);
                    case "latin1":
                    case "binary":
                        return A(this, e, r);
                    case "base64":
                        return C(this, e, r);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return L(this, e, r);
                    default:
                        if (n)
                            throw new TypeError("Unknown encoding: " + t);
                        t = (t + "").toLowerCase(),
                        n = !0
                    }
            }
            .apply(this, arguments)
        }
        ,
        l.prototype.equals = function(t) {
            if (!l.isBuffer(t))
                throw new TypeError("Argument must be a Buffer");
            return this === t || 0 === l.compare(this, t)
        }
        ,
        l.prototype.inspect = function() {
            var t = ""
              , r = e.INSPECT_MAX_BYTES;
            return 0 < this.length && (t = this.toString("hex", 0, r).match(/.{2}/g).join(" "),
            this.length > r && (t += " ... ")),
            "<Buffer " + t + ">"
        }
        ,
        l.prototype.compare = function(t, e, r, n, i) {
            if (!l.isBuffer(t))
                throw new TypeError("Argument must be a Buffer");
            if (void 0 === e && (e = 0),
            void 0 === r && (r = t ? t.length : 0),
            void 0 === n && (n = 0),
            void 0 === i && (i = this.length),
            e < 0 || r > t.length || n < 0 || i > this.length)
                throw new RangeError("out of range index");
            if (i <= n && r <= e)
                return 0;
            if (i <= n)
                return -1;
            if (r <= e)
                return 1;
            if (this === t)
                return 0;
            for (var o = (i >>>= 0) - (n >>>= 0), s = (r >>>= 0) - (e >>>= 0), a = Math.min(o, s), c = this.slice(n, i), h = t.slice(e, r), u = 0; u < a; ++u)
                if (c[u] !== h[u]) {
                    o = c[u],
                    s = h[u];
                    break
                }
            return o < s ? -1 : s < o ? 1 : 0
        }
        ,
        l.prototype.includes = function(t, e, r) {
            return -1 !== this.indexOf(t, e, r)
        }
        ,
        l.prototype.indexOf = function(t, e, r) {
            return m(this, t, e, r, !0)
        }
        ,
        l.prototype.lastIndexOf = function(t, e, r) {
            return m(this, t, e, r, !1)
        }
        ,
        l.prototype.write = function(t, e, r, n) {
            if (void 0 === e)
                n = "utf8",
                r = this.length,
                e = 0;
            else if (void 0 === r && "string" == typeof e)
                n = e,
                r = this.length,
                e = 0;
            else {
                if (!isFinite(e))
                    throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                e |= 0,
                isFinite(r) ? (r |= 0,
                void 0 === n && (n = "utf8")) : (n = r,
                r = void 0)
            }
            var i = this.length - e;
            if ((void 0 === r || i < r) && (r = i),
            0 < t.length && (r < 0 || e < 0) || e > this.length)
                throw new RangeError("Attempt to write outside buffer bounds");
            n || (n = "utf8");
            for (var o, s, a, l, c, h, u = !1; ; )
                switch (n) {
                case "hex":
                    return g(this, t, e, r);
                case "utf8":
                case "utf-8":
                    return c = e,
                    h = r,
                    P(F(t, this.length - c), this, c, h);
                case "ascii":
                    return v(this, t, e, r);
                case "latin1":
                case "binary":
                    return v(this, t, e, r);
                case "base64":
                    return this,
                    a = e,
                    l = r,
                    P(I(t), this, a, l);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return o = e,
                    s = r,
                    P(function(t, e) {
                        for (var r, n, i, o = [], s = 0; s < t.length && !((e -= 2) < 0); ++s)
                            n = (r = t.charCodeAt(s)) >> 8,
                            i = r % 256,
                            o.push(i),
                            o.push(n);
                        return o
                    }(t, this.length - o), this, o, s);
                default:
                    if (u)
                        throw new TypeError("Unknown encoding: " + n);
                    n = ("" + n).toLowerCase(),
                    u = !0
                }
        }
        ,
        l.prototype.toJSON = function() {
            return {
                type: "Buffer",
                data: Array.prototype.slice.call(this._arr || this, 0)
            }
        }
        ;
        var w = 4096;
        function E(t, e, r) {
            var n = "";
            r = Math.min(t.length, r);
            for (var i = e; i < r; ++i)
                n += String.fromCharCode(127 & t[i]);
            return n
        }
        function A(t, e, r) {
            var n = "";
            r = Math.min(t.length, r);
            for (var i = e; i < r; ++i)
                n += String.fromCharCode(t[i]);
            return n
        }
        function S(t, e, r) {
            var n = t.length;
            (!e || e < 0) && (e = 0),
            (!r || r < 0 || n < r) && (r = n);
            for (var i = "", o = e; o < r; ++o)
                i += B(t[o]);
            return i
        }
        function L(t, e, r) {
            for (var n = t.slice(e, r), i = "", o = 0; o < n.length; o += 2)
                i += String.fromCharCode(n[o] + 256 * n[o + 1]);
            return i
        }
        function x(t, e, r) {
            if (t % 1 != 0 || t < 0)
                throw new RangeError("offset is not uint");
            if (r < t + e)
                throw new RangeError("Trying to access beyond buffer length")
        }
        function k(t, e, r, n, i, o) {
            if (!l.isBuffer(t))
                throw new TypeError('"buffer" argument must be a Buffer instance');
            if (i < e || e < o)
                throw new RangeError('"value" argument is out of bounds');
            if (r + n > t.length)
                throw new RangeError("Index out of range")
        }
        function T(t, e, r, n) {
            e < 0 && (e = 65535 + e + 1);
            for (var i = 0, o = Math.min(t.length - r, 2); i < o; ++i)
                t[r + i] = (e & 255 << 8 * (n ? i : 1 - i)) >>> 8 * (n ? i : 1 - i)
        }
        function R(t, e, r, n) {
            e < 0 && (e = 4294967295 + e + 1);
            for (var i = 0, o = Math.min(t.length - r, 4); i < o; ++i)
                t[r + i] = e >>> 8 * (n ? i : 3 - i) & 255
        }
        function M(t, e, r, n, i, o) {
            if (r + n > t.length)
                throw new RangeError("Index out of range");
            if (r < 0)
                throw new RangeError("Index out of range")
        }
        function D(t, e, r, n, o) {
            return o || M(t, 0, r, 4),
            i.write(t, e, r, n, 23, 4),
            r + 4
        }
        function H(t, e, r, n, o) {
            return o || M(t, 0, r, 8),
            i.write(t, e, r, n, 52, 8),
            r + 8
        }
        l.prototype.slice = function(t, e) {
            var r, n = this.length;
            if ((t = ~~t) < 0 ? (t += n) < 0 && (t = 0) : n < t && (t = n),
            (e = void 0 === e ? n : ~~e) < 0 ? (e += n) < 0 && (e = 0) : n < e && (e = n),
            e < t && (e = t),
            l.TYPED_ARRAY_SUPPORT)
                (r = this.subarray(t, e)).__proto__ = l.prototype;
            else {
                var i = e - t;
                r = new l(i,void 0);
                for (var o = 0; o < i; ++o)
                    r[o] = this[o + t]
            }
            return r
        }
        ,
        l.prototype.readUIntLE = function(t, e, r) {
            t |= 0,
            e |= 0,
            r || x(t, e, this.length);
            for (var n = this[t], i = 1, o = 0; ++o < e && (i *= 256); )
                n += this[t + o] * i;
            return n
        }
        ,
        l.prototype.readUIntBE = function(t, e, r) {
            t |= 0,
            e |= 0,
            r || x(t, e, this.length);
            for (var n = this[t + --e], i = 1; 0 < e && (i *= 256); )
                n += this[t + --e] * i;
            return n
        }
        ,
        l.prototype.readUInt8 = function(t, e) {
            return e || x(t, 1, this.length),
            this[t]
        }
        ,
        l.prototype.readUInt16LE = function(t, e) {
            return e || x(t, 2, this.length),
            this[t] | this[t + 1] << 8
        }
        ,
        l.prototype.readUInt16BE = function(t, e) {
            return e || x(t, 2, this.length),
            this[t] << 8 | this[t + 1]
        }
        ,
        l.prototype.readUInt32LE = function(t, e) {
            return e || x(t, 4, this.length),
            (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
        }
        ,
        l.prototype.readUInt32BE = function(t, e) {
            return e || x(t, 4, this.length),
            16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
        }
        ,
        l.prototype.readIntLE = function(t, e, r) {
            t |= 0,
            e |= 0,
            r || x(t, e, this.length);
            for (var n = this[t], i = 1, o = 0; ++o < e && (i *= 256); )
                n += this[t + o] * i;
            return (i *= 128) <= n && (n -= Math.pow(2, 8 * e)),
            n
        }
        ,
        l.prototype.readIntBE = function(t, e, r) {
            t |= 0,
            e |= 0,
            r || x(t, e, this.length);
            for (var n = e, i = 1, o = this[t + --n]; 0 < n && (i *= 256); )
                o += this[t + --n] * i;
            return (i *= 128) <= o && (o -= Math.pow(2, 8 * e)),
            o
        }
        ,
        l.prototype.readInt8 = function(t, e) {
            return e || x(t, 1, this.length),
            128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
        }
        ,
        l.prototype.readInt16LE = function(t, e) {
            e || x(t, 2, this.length);
            var r = this[t] | this[t + 1] << 8;
            return 32768 & r ? 4294901760 | r : r
        }
        ,
        l.prototype.readInt16BE = function(t, e) {
            e || x(t, 2, this.length);
            var r = this[t + 1] | this[t] << 8;
            return 32768 & r ? 4294901760 | r : r
        }
        ,
        l.prototype.readInt32LE = function(t, e) {
            return e || x(t, 4, this.length),
            this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
        }
        ,
        l.prototype.readInt32BE = function(t, e) {
            return e || x(t, 4, this.length),
            this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
        }
        ,
        l.prototype.readFloatLE = function(t, e) {
            return e || x(t, 4, this.length),
            i.read(this, t, !0, 23, 4)
        }
        ,
        l.prototype.readFloatBE = function(t, e) {
            return e || x(t, 4, this.length),
            i.read(this, t, !1, 23, 4)
        }
        ,
        l.prototype.readDoubleLE = function(t, e) {
            return e || x(t, 8, this.length),
            i.read(this, t, !0, 52, 8)
        }
        ,
        l.prototype.readDoubleBE = function(t, e) {
            return e || x(t, 8, this.length),
            i.read(this, t, !1, 52, 8)
        }
        ,
        l.prototype.writeUIntLE = function(t, e, r, n) {
            t = +t,
            e |= 0,
            r |= 0,
            n || k(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
            var i = 1
              , o = 0;
            for (this[e] = 255 & t; ++o < r && (i *= 256); )
                this[e + o] = t / i & 255;
            return e + r
        }
        ,
        l.prototype.writeUIntBE = function(t, e, r, n) {
            t = +t,
            e |= 0,
            r |= 0,
            n || k(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
            var i = r - 1
              , o = 1;
            for (this[e + i] = 255 & t; 0 <= --i && (o *= 256); )
                this[e + i] = t / o & 255;
            return e + r
        }
        ,
        l.prototype.writeUInt8 = function(t, e, r) {
            return t = +t,
            e |= 0,
            r || k(this, t, e, 1, 255, 0),
            l.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
            this[e] = 255 & t,
            e + 1
        }
        ,
        l.prototype.writeUInt16LE = function(t, e, r) {
            return t = +t,
            e |= 0,
            r || k(this, t, e, 2, 65535, 0),
            l.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t,
            this[e + 1] = t >>> 8) : T(this, t, e, !0),
            e + 2
        }
        ,
        l.prototype.writeUInt16BE = function(t, e, r) {
            return t = +t,
            e |= 0,
            r || k(this, t, e, 2, 65535, 0),
            l.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8,
            this[e + 1] = 255 & t) : T(this, t, e, !1),
            e + 2
        }
        ,
        l.prototype.writeUInt32LE = function(t, e, r) {
            return t = +t,
            e |= 0,
            r || k(this, t, e, 4, 4294967295, 0),
            l.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24,
            this[e + 2] = t >>> 16,
            this[e + 1] = t >>> 8,
            this[e] = 255 & t) : R(this, t, e, !0),
            e + 4
        }
        ,
        l.prototype.writeUInt32BE = function(t, e, r) {
            return t = +t,
            e |= 0,
            r || k(this, t, e, 4, 4294967295, 0),
            l.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24,
            this[e + 1] = t >>> 16,
            this[e + 2] = t >>> 8,
            this[e + 3] = 255 & t) : R(this, t, e, !1),
            e + 4
        }
        ,
        l.prototype.writeIntLE = function(t, e, r, n) {
            if (t = +t,
            e |= 0,
            !n) {
                var i = Math.pow(2, 8 * r - 1);
                k(this, t, e, r, i - 1, -i)
            }
            var o = 0
              , s = 1
              , a = 0;
            for (this[e] = 255 & t; ++o < r && (s *= 256); )
                t < 0 && 0 === a && 0 !== this[e + o - 1] && (a = 1),
                this[e + o] = (t / s >> 0) - a & 255;
            return e + r
        }
        ,
        l.prototype.writeIntBE = function(t, e, r, n) {
            if (t = +t,
            e |= 0,
            !n) {
                var i = Math.pow(2, 8 * r - 1);
                k(this, t, e, r, i - 1, -i)
            }
            var o = r - 1
              , s = 1
              , a = 0;
            for (this[e + o] = 255 & t; 0 <= --o && (s *= 256); )
                t < 0 && 0 === a && 0 !== this[e + o + 1] && (a = 1),
                this[e + o] = (t / s >> 0) - a & 255;
            return e + r
        }
        ,
        l.prototype.writeInt8 = function(t, e, r) {
            return t = +t,
            e |= 0,
            r || k(this, t, e, 1, 127, -128),
            l.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
            t < 0 && (t = 255 + t + 1),
            this[e] = 255 & t,
            e + 1
        }
        ,
        l.prototype.writeInt16LE = function(t, e, r) {
            return t = +t,
            e |= 0,
            r || k(this, t, e, 2, 32767, -32768),
            l.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t,
            this[e + 1] = t >>> 8) : T(this, t, e, !0),
            e + 2
        }
        ,
        l.prototype.writeInt16BE = function(t, e, r) {
            return t = +t,
            e |= 0,
            r || k(this, t, e, 2, 32767, -32768),
            l.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8,
            this[e + 1] = 255 & t) : T(this, t, e, !1),
            e + 2
        }
        ,
        l.prototype.writeInt32LE = function(t, e, r) {
            return t = +t,
            e |= 0,
            r || k(this, t, e, 4, 2147483647, -2147483648),
            l.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t,
            this[e + 1] = t >>> 8,
            this[e + 2] = t >>> 16,
            this[e + 3] = t >>> 24) : R(this, t, e, !0),
            e + 4
        }
        ,
        l.prototype.writeInt32BE = function(t, e, r) {
            return t = +t,
            e |= 0,
            r || k(this, t, e, 4, 2147483647, -2147483648),
            t < 0 && (t = 4294967295 + t + 1),
            l.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24,
            this[e + 1] = t >>> 16,
            this[e + 2] = t >>> 8,
            this[e + 3] = 255 & t) : R(this, t, e, !1),
            e + 4
        }
        ,
        l.prototype.writeFloatLE = function(t, e, r) {
            return D(this, t, e, !0, r)
        }
        ,
        l.prototype.writeFloatBE = function(t, e, r) {
            return D(this, t, e, !1, r)
        }
        ,
        l.prototype.writeDoubleLE = function(t, e, r) {
            return H(this, t, e, !0, r)
        }
        ,
        l.prototype.writeDoubleBE = function(t, e, r) {
            return H(this, t, e, !1, r)
        }
        ,
        l.prototype.copy = function(t, e, r, n) {
            if (r || (r = 0),
            n || 0 === n || (n = this.length),
            e >= t.length && (e = t.length),
            e || (e = 0),
            0 < n && n < r && (n = r),
            n === r)
                return 0;
            if (0 === t.length || 0 === this.length)
                return 0;
            if (e < 0)
                throw new RangeError("targetStart out of bounds");
            if (r < 0 || r >= this.length)
                throw new RangeError("sourceStart out of bounds");
            if (n < 0)
                throw new RangeError("sourceEnd out of bounds");
            n > this.length && (n = this.length),
            t.length - e < n - r && (n = t.length - e + r);
            var i, o = n - r;
            if (this === t && r < e && e < n)
                for (i = o - 1; 0 <= i; --i)
                    t[i + e] = this[i + r];
            else if (o < 1e3 || !l.TYPED_ARRAY_SUPPORT)
                for (i = 0; i < o; ++i)
                    t[i + e] = this[i + r];
            else
                Uint8Array.prototype.set.call(t, this.subarray(r, r + o), e);
            return o
        }
        ,
        l.prototype.fill = function(t, e, r, n) {
            if ("string" == typeof t) {
                if ("string" == typeof e ? (n = e,
                e = 0,
                r = this.length) : "string" == typeof r && (n = r,
                r = this.length),
                1 === t.length) {
                    var i = t.charCodeAt(0);
                    i < 256 && (t = i)
                }
                if (void 0 !== n && "string" != typeof n)
                    throw new TypeError("encoding must be a string");
                if ("string" == typeof n && !l.isEncoding(n))
                    throw new TypeError("Unknown encoding: " + n)
            } else
                "number" == typeof t && (t &= 255);
            if (e < 0 || this.length < e || this.length < r)
                throw new RangeError("Out of range index");
            if (r <= e)
                return this;
            var o;
            if (e >>>= 0,
            r = void 0 === r ? this.length : r >>> 0,
            t || (t = 0),
            "number" == typeof t)
                for (o = e; o < r; ++o)
                    this[o] = t;
            else {
                var s = l.isBuffer(t) ? t : F(new l(t,n).toString())
                  , a = s.length;
                for (o = 0; o < r - e; ++o)
                    this[o + e] = s[o % a]
            }
            return this
        }
        ;
        var O = /[^+\/0-9A-Za-z-_]/g;
        function B(t) {
            return t < 16 ? "0" + t.toString(16) : t.toString(16)
        }
        function F(t, e) {
            var r;
            e = e || 1 / 0;
            for (var n = t.length, i = null, o = [], s = 0; s < n; ++s) {
                if (55295 < (r = t.charCodeAt(s)) && r < 57344) {
                    if (!i) {
                        if (56319 < r) {
                            -1 < (e -= 3) && o.push(239, 191, 189);
                            continue
                        }
                        if (s + 1 === n) {
                            -1 < (e -= 3) && o.push(239, 191, 189);
                            continue
                        }
                        i = r;
                        continue
                    }
                    if (r < 56320) {
                        -1 < (e -= 3) && o.push(239, 191, 189),
                        i = r;
                        continue
                    }
                    r = 65536 + (i - 55296 << 10 | r - 56320)
                } else
                    i && -1 < (e -= 3) && o.push(239, 191, 189);
                if (i = null,
                r < 128) {
                    if ((e -= 1) < 0)
                        break;
                    o.push(r)
                } else if (r < 2048) {
                    if ((e -= 2) < 0)
                        break;
                    o.push(r >> 6 | 192, 63 & r | 128)
                } else if (r < 65536) {
                    if ((e -= 3) < 0)
                        break;
                    o.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
                } else {
                    if (!(r < 1114112))
                        throw new Error("Invalid code point");
                    if ((e -= 4) < 0)
                        break;
                    o.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
                }
            }
            return o
        }
        function I(t) {
            return n.toByteArray(function(t) {
                var e;
                if ((t = (e = t,
                e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")).replace(O, "")).length < 2)
                    return "";
                for (; t.length % 4 != 0; )
                    t += "=";
                return t
            }(t))
        }
        function P(t, e, r, n) {
            for (var i = 0; i < n && !(i + r >= e.length || i >= t.length); ++i)
                e[i + r] = t[i];
            return i
        }
    }
    ).call(this, r(17))
}
, function(t, e, r) {
    var n = r(38);
    t.exports = function(t) {
        var e = t.xdomain
          , r = t.xscheme
          , i = t.enablesXDR;
        try {
            if ("undefined" != typeof XMLHttpRequest && (!e || n))
                return new XMLHttpRequest
        } catch (t) {}
        try {
            if ("undefined" != typeof XDomainRequest && !r && i)
                return new XDomainRequest
        } catch (t) {}
        if (!e)
            try {
                return new (self[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")
            } catch (t) {}
    }
}
, function(t, e, r) {
    var n = r(1);
    function i(t) {
        this.path = t.path,
        this.hostname = t.hostname,
        this.port = t.port,
        this.secure = t.secure,
        this.query = t.query,
        this.timestampParam = t.timestampParam,
        this.timestampRequests = t.timestampRequests,
        this.readyState = "",
        this.agent = t.agent || !1,
        this.socket = t.socket,
        this.enablesXDR = t.enablesXDR,
        this.pfx = t.pfx,
        this.key = t.key,
        this.passphrase = t.passphrase,
        this.cert = t.cert,
        this.ca = t.ca,
        this.ciphers = t.ciphers,
        this.rejectUnauthorized = t.rejectUnauthorized,
        this.forceNode = t.forceNode,
        this.isReactNative = t.isReactNative,
        this.extraHeaders = t.extraHeaders,
        this.localAddress = t.localAddress
    }
    r(0)((t.exports = i).prototype),
    i.prototype.onError = function(t, e) {
        var r = new Error(t);
        return r.type = "TransportError",
        r.description = e,
        this.emit("error", r),
        this
    }
    ,
    i.prototype.open = function() {
        return "closed" !== this.readyState && "" !== this.readyState || (this.readyState = "opening",
        this.doOpen()),
        this
    }
    ,
    i.prototype.close = function() {
        return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(),
        this.onClose()),
        this
    }
    ,
    i.prototype.send = function(t) {
        if ("open" !== this.readyState)
            throw new Error("Transport not open");
        this.write(t)
    }
    ,
    i.prototype.onOpen = function() {
        this.readyState = "open",
        this.writable = !0,
        this.emit("open")
    }
    ,
    i.prototype.onData = function(t) {
        var e = n.decodePacket(t, this.socket.binaryType);
        this.onPacket(e)
    }
    ,
    i.prototype.onPacket = function(t) {
        this.emit("packet", t)
    }
    ,
    i.prototype.onClose = function() {
        this.readyState = "closed",
        this.emit("close")
    }
}
, function(t, e, r) {
    var n = r(28)
      , i = r(8)
      , o = r(18)
      , s = r(2)("socket.io-client");
    t.exports = e = l;
    var a = e.managers = {};
    function l(t, e) {
        "object" == typeof t && (e = t,
        t = void 0),
        e = e || {};
        var r, i = n(t), l = i.source, c = i.id, h = i.path, u = a[c] && h in a[c].nsps;
        return r = e.forceNew || e["force new connection"] || !1 === e.multiplex || u ? (s("ignoring socket cache for %s", l),
        o(l, e)) : (a[c] || (s("new io instance for %s", l),
        a[c] = o(l, e)),
        a[c]),
        i.query && !e.query && (e.query = i.query),
        r.socket(i.path, e)
    }
    e.protocol = i.protocol,
    e.connect = l,
    e.Manager = r(18),
    e.Socket = r(24)
}
, function(t, e, r) {
    t.exports = function t(e, r, n) {
        function i(s, a) {
            if (!r[s]) {
                if (!e[s]) {
                    if (o)
                        return o(s, !0);
                    var l = new Error("Cannot find module '" + s + "'");
                    throw l.code = "MODULE_NOT_FOUND",
                    l
                }
                var c = r[s] = {
                    exports: {}
                };
                e[s][0].call(c.exports, function(t) {
                    return i(e[s][1][t] || t)
                }, c, c.exports, t, e, r, n)
            }
            return r[s].exports
        }
        for (var o = !1, s = 0; s < n.length; s++)
            i(n[s]);
        return i
    }({
        1: [function(t, e, r) {
            "use strict";
            var n, i = this && this.__extends || (n = function(t, e) {
                return (n = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(t, e) {
                    t.__proto__ = e
                }
                || function(t, e) {
                    for (var r in e)
                        e.hasOwnProperty(r) && (t[r] = e[r])
                }
                )(t, e)
            }
            ,
            function(t, e) {
                function r() {
                    this.constructor = t
                }
                n(t, e),
                t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype,
                new r)
            }
            );
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = t("./Strings")
              , s = t("./core/Platform")
              , a = t("./ui/RenderDebouncer")
              , l = t("./ui/Lifecycle")
              , c = function(t) {
                function e(e) {
                    var r = t.call(this) || this;
                    r._terminal = e,
                    r._liveRegionLineCount = 0,
                    r._charsToConsume = [],
                    r._accessibilityTreeRoot = document.createElement("div"),
                    r._accessibilityTreeRoot.classList.add("xterm-accessibility"),
                    r._rowContainer = document.createElement("div"),
                    r._rowContainer.classList.add("xterm-accessibility-tree"),
                    r._rowElements = [];
                    for (var n = 0; n < r._terminal.rows; n++)
                        r._rowElements[n] = r._createAccessibilityTreeNode(),
                        r._rowContainer.appendChild(r._rowElements[n]);
                    return r._topBoundaryFocusListener = function(t) {
                        return r._onBoundaryFocus(t, 0)
                    }
                    ,
                    r._bottomBoundaryFocusListener = function(t) {
                        return r._onBoundaryFocus(t, 1)
                    }
                    ,
                    r._rowElements[0].addEventListener("focus", r._topBoundaryFocusListener),
                    r._rowElements[r._rowElements.length - 1].addEventListener("focus", r._bottomBoundaryFocusListener),
                    r._refreshRowsDimensions(),
                    r._accessibilityTreeRoot.appendChild(r._rowContainer),
                    r._renderRowsDebouncer = new a.RenderDebouncer(r._terminal,r._renderRows.bind(r)),
                    r._refreshRows(),
                    r._liveRegion = document.createElement("div"),
                    r._liveRegion.classList.add("live-region"),
                    r._liveRegion.setAttribute("aria-live", "assertive"),
                    r._accessibilityTreeRoot.appendChild(r._liveRegion),
                    r._terminal.element.insertAdjacentElement("afterbegin", r._accessibilityTreeRoot),
                    r.register(r._renderRowsDebouncer),
                    r.register(r._terminal.addDisposableListener("resize", function(t) {
                        return r._onResize(t.rows)
                    })),
                    r.register(r._terminal.addDisposableListener("refresh", function(t) {
                        return r._refreshRows(t.start, t.end)
                    })),
                    r.register(r._terminal.addDisposableListener("scroll", function(t) {
                        return r._refreshRows()
                    })),
                    r.register(r._terminal.addDisposableListener("a11y.char", function(t) {
                        return r._onChar(t)
                    })),
                    r.register(r._terminal.addDisposableListener("linefeed", function() {
                        return r._onChar("\n")
                    })),
                    r.register(r._terminal.addDisposableListener("a11y.tab", function(t) {
                        return r._onTab(t)
                    })),
                    r.register(r._terminal.addDisposableListener("key", function(t) {
                        return r._onKey(t)
                    })),
                    r.register(r._terminal.addDisposableListener("blur", function() {
                        return r._clearLiveRegion()
                    })),
                    r.register(r._terminal.addDisposableListener("dprchange", function() {
                        return r._refreshRowsDimensions()
                    })),
                    r.register(r._terminal.renderer.addDisposableListener("resize", function() {
                        return r._refreshRowsDimensions()
                    })),
                    r.register(l.addDisposableDomListener(window, "resize", function() {
                        return r._refreshRowsDimensions()
                    })),
                    r
                }
                return i(e, t),
                e.prototype.dispose = function() {
                    t.prototype.dispose.call(this),
                    this._terminal.element.removeChild(this._accessibilityTreeRoot),
                    this._rowElements.length = 0
                }
                ,
                e.prototype._onBoundaryFocus = function(t, e) {
                    var r = t.target
                      , n = this._rowElements[0 === e ? 1 : this._rowElements.length - 2];
                    if (r.getAttribute("aria-posinset") !== (0 === e ? "1" : "" + this._terminal.buffer.lines.length) && t.relatedTarget === n) {
                        var i, o;
                        if (0 === e ? (i = r,
                        o = this._rowElements.pop(),
                        this._rowContainer.removeChild(o)) : (i = this._rowElements.shift(),
                        o = r,
                        this._rowContainer.removeChild(i)),
                        i.removeEventListener("focus", this._topBoundaryFocusListener),
                        o.removeEventListener("focus", this._bottomBoundaryFocusListener),
                        0 === e) {
                            var s = this._createAccessibilityTreeNode();
                            this._rowElements.unshift(s),
                            this._rowContainer.insertAdjacentElement("afterbegin", s)
                        } else {
                            s = this._createAccessibilityTreeNode();
                            this._rowElements.push(s),
                            this._rowContainer.appendChild(s)
                        }
                        this._rowElements[0].addEventListener("focus", this._topBoundaryFocusListener),
                        this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener),
                        this._terminal.scrollLines(0 === e ? -1 : 1),
                        this._rowElements[0 === e ? 1 : this._rowElements.length - 2].focus(),
                        t.preventDefault(),
                        t.stopImmediatePropagation()
                    }
                }
                ,
                e.prototype._onResize = function(t) {
                    this._rowElements[this._rowElements.length - 1].removeEventListener("focus", this._bottomBoundaryFocusListener);
                    for (var e = this._rowContainer.children.length; e < this._terminal.rows; e++)
                        this._rowElements[e] = this._createAccessibilityTreeNode(),
                        this._rowContainer.appendChild(this._rowElements[e]);
                    for (; this._rowElements.length > t; )
                        this._rowContainer.removeChild(this._rowElements.pop());
                    this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener),
                    this._refreshRowsDimensions()
                }
                ,
                e.prototype._createAccessibilityTreeNode = function() {
                    var t = document.createElement("div");
                    return t.setAttribute("role", "listitem"),
                    t.tabIndex = -1,
                    this._refreshRowDimensions(t),
                    t
                }
                ,
                e.prototype._onTab = function(t) {
                    for (var e = 0; e < t; e++)
                        this._onChar(" ")
                }
                ,
                e.prototype._onChar = function(t) {
                    var e = this;
                    if (this._liveRegionLineCount < 21) {
                        if (0 < this._charsToConsume.length)
                            this._charsToConsume.shift() !== t && this._announceCharacter(t);
                        else
                            this._announceCharacter(t);
                        "\n" === t && (this._liveRegionLineCount++,
                        21 === this._liveRegionLineCount && (this._liveRegion.textContent += o.tooMuchOutput)),
                        s.isMac && this._liveRegion.textContent && 0 < this._liveRegion.textContent.length && !this._liveRegion.parentNode && setTimeout(function() {
                            e._accessibilityTreeRoot.appendChild(e._liveRegion)
                        }, 0)
                    }
                }
                ,
                e.prototype._clearLiveRegion = function() {
                    this._liveRegion.textContent = "",
                    this._liveRegionLineCount = 0,
                    s.isMac && this._liveRegion.parentNode && this._accessibilityTreeRoot.removeChild(this._liveRegion)
                }
                ,
                e.prototype._onKey = function(t) {
                    this._clearLiveRegion(),
                    this._charsToConsume.push(t)
                }
                ,
                e.prototype._refreshRows = function(t, e) {
                    this._renderRowsDebouncer.refresh(t, e)
                }
                ,
                e.prototype._renderRows = function(t, e) {
                    for (var r = this._terminal.buffer, n = r.lines.length.toString(), i = t; i <= e; i++) {
                        var s = r.translateBufferLineToString(r.ydisp + i, !0)
                          , a = (r.ydisp + i + 1).toString()
                          , l = this._rowElements[i];
                        l.textContent = 0 === s.length ? o.blankLine : s,
                        l.setAttribute("aria-posinset", a),
                        l.setAttribute("aria-setsize", n)
                    }
                }
                ,
                e.prototype._refreshRowsDimensions = function() {
                    if (this._terminal.renderer.dimensions.actualCellHeight) {
                        this._rowElements.length !== this._terminal.rows && this._onResize(this._terminal.rows);
                        for (var t = 0; t < this._terminal.rows; t++)
                            this._refreshRowDimensions(this._rowElements[t])
                    }
                }
                ,
                e.prototype._refreshRowDimensions = function(t) {
                    t.style.height = this._terminal.renderer.dimensions.actualCellHeight + "px"
                }
                ,
                e.prototype._announceCharacter = function(t) {
                    " " === t ? this._liveRegion.innerHTML += "&nbsp;" : this._liveRegion.textContent += t
                }
                ,
                e
            }(t("./common/Lifecycle").Disposable);
            r.AccessibilityManager = c
        }
        , {
            "./Strings": 13,
            "./common/Lifecycle": 19,
            "./core/Platform": 22,
            "./ui/Lifecycle": 49,
            "./ui/RenderDebouncer": 52
        }],
        2: [function(t, e, r) {
            "use strict";
            var n, i = this && this.__extends || (n = function(t, e) {
                return (n = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(t, e) {
                    t.__proto__ = e
                }
                || function(t, e) {
                    for (var r in e)
                        e.hasOwnProperty(r) && (t[r] = e[r])
                }
                )(t, e)
            }
            ,
            function(t, e) {
                function r() {
                    this.constructor = t
                }
                n(t, e),
                t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype,
                new r)
            }
            );
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = t("./common/CircularList")
              , s = t("./common/EventEmitter")
              , a = t("./BufferLine")
              , l = t("./renderer/atlas/Types");
            r.DEFAULT_ATTR = 256 | l.DEFAULT_COLOR << 9,
            r.CHAR_DATA_ATTR_INDEX = 0,
            r.CHAR_DATA_CHAR_INDEX = 1,
            r.CHAR_DATA_WIDTH_INDEX = 2,
            r.CHAR_DATA_CODE_INDEX = 3,
            r.MAX_BUFFER_SIZE = 4294967295,
            r.NULL_CELL_CHAR = "",
            r.NULL_CELL_WIDTH = 1,
            r.NULL_CELL_CODE = 0,
            r.WHITESPACE_CELL_CHAR = " ",
            r.WHITESPACE_CELL_WIDTH = 1,
            r.WHITESPACE_CELL_CODE = 32;
            var c = function() {
                function t(t, e) {
                    this._terminal = t,
                    this._hasScrollback = e,
                    this.markers = [],
                    this.clear()
                }
                return t.prototype.setBufferLineFactory = function(t) {
                    "JsArray" === t ? this._bufferLineConstructor !== a.BufferLineJSArray && (this._bufferLineConstructor = a.BufferLineJSArray,
                    this._recreateLines()) : this._bufferLineConstructor !== a.BufferLine && (this._bufferLineConstructor = a.BufferLine,
                    this._recreateLines())
                }
                ,
                t.prototype._recreateLines = function() {
                    if (this.lines)
                        for (var t = 0; t < this.lines.length; ++t) {
                            for (var e = this.lines.get(t), r = new this._bufferLineConstructor(e.length), n = 0; n < e.length; ++n)
                                r.set(n, e.get(n));
                            this.lines.set(t, r)
                        }
                }
                ,
                t.prototype.getBlankLine = function(t, e) {
                    var n = [t, r.NULL_CELL_CHAR, r.NULL_CELL_WIDTH, r.NULL_CELL_CODE];
                    return new this._bufferLineConstructor(this._terminal.cols,n,e)
                }
                ,
                Object.defineProperty(t.prototype, "hasScrollback", {
                    get: function() {
                        return this._hasScrollback && this.lines.maxLength > this._terminal.rows
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(t.prototype, "isCursorInViewport", {
                    get: function() {
                        var t = this.ybase + this.y - this.ydisp;
                        return 0 <= t && t < this._terminal.rows
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                t.prototype._getCorrectBufferLength = function(t) {
                    if (!this._hasScrollback)
                        return t;
                    var e = t + this._terminal.options.scrollback;
                    return e > r.MAX_BUFFER_SIZE ? r.MAX_BUFFER_SIZE : e
                }
                ,
                t.prototype.fillViewportRows = function(t) {
                    if (0 === this.lines.length) {
                        void 0 === t && (t = r.DEFAULT_ATTR);
                        for (var e = this._terminal.rows; e--; )
                            this.lines.push(this.getBlankLine(t))
                    }
                }
                ,
                t.prototype.clear = function() {
                    this.setBufferLineFactory(this._terminal.options.experimentalBufferLineImpl),
                    this.ydisp = 0,
                    this.ybase = 0,
                    this.y = 0,
                    this.x = 0,
                    this.lines = new o.CircularList(this._getCorrectBufferLength(this._terminal.rows)),
                    this.scrollTop = 0,
                    this.scrollBottom = this._terminal.rows - 1,
                    this.setupTabStops()
                }
                ,
                t.prototype.resize = function(t, e) {
                    var n = this._getCorrectBufferLength(e);
                    if (n > this.lines.maxLength && (this.lines.maxLength = n),
                    0 < this.lines.length) {
                        if (this._terminal.cols < t)
                            for (var i = [r.DEFAULT_ATTR, r.NULL_CELL_CHAR, r.NULL_CELL_WIDTH, r.NULL_CELL_CODE], o = 0; o < this.lines.length; o++)
                                this.lines.get(o).resize(t, i);
                        var s = 0;
                        if (this._terminal.rows < e) {
                            for (var a = this._terminal.rows; a < e; a++)
                                if (this.lines.length < e + this.ybase)
                                    if (0 < this.ybase && this.lines.length <= this.ybase + this.y + s + 1)
                                        this.ybase--,
                                        s++,
                                        0 < this.ydisp && this.ydisp--;
                                    else {
                                        var l = [r.DEFAULT_ATTR, r.NULL_CELL_CHAR, r.NULL_CELL_WIDTH, r.NULL_CELL_CODE];
                                        this.lines.push(new this._bufferLineConstructor(t,l))
                                    }
                        } else
                            for (a = this._terminal.rows; e < a; a--)
                                this.lines.length > e + this.ybase && (this.lines.length > this.ybase + this.y + 1 ? this.lines.pop() : (this.ybase++,
                                this.ydisp++));
                        if (n < this.lines.maxLength) {
                            var c = this.lines.length - n;
                            0 < c && (this.lines.trimStart(c),
                            this.ybase = Math.max(this.ybase - c, 0),
                            this.ydisp = Math.max(this.ydisp - c, 0)),
                            this.lines.maxLength = n
                        }
                        this.x = Math.min(this.x, t - 1),
                        this.y = Math.min(this.y, e - 1),
                        s && (this.y += s),
                        this.savedY = Math.min(this.savedY, e - 1),
                        this.savedX = Math.min(this.savedX, t - 1),
                        this.scrollTop = 0
                    }
                    this.scrollBottom = e - 1
                }
                ,
                t.prototype.stringIndexToBufferIndex = function(t, e) {
                    for (; e; ) {
                        var n = this.lines.get(t);
                        if (!n)
                            return [-1, -1];
                        for (var i = 0; i < n.length; ++i)
                            if ((e -= n.get(i)[r.CHAR_DATA_CHAR_INDEX].length) < 0)
                                return [t, i];
                        t++
                    }
                    return [t, 0]
                }
                ,
                t.prototype.translateBufferLineToString = function(t, e, r, n) {
                    void 0 === r && (r = 0);
                    var i = this.lines.get(t);
                    return i ? i.translateToString(e, r, n) : ""
                }
                ,
                t.prototype.getWrappedRangeForLine = function(t) {
                    for (var e = t, r = t; 0 < e && this.lines.get(e).isWrapped; )
                        e--;
                    for (; r + 1 < this.lines.length && this.lines.get(r + 1).isWrapped; )
                        r++;
                    return {
                        first: e,
                        last: r
                    }
                }
                ,
                t.prototype.setupTabStops = function(t) {
                    for (null != t ? this.tabs[t] || (t = this.prevStop(t)) : (this.tabs = {},
                    t = 0); t < this._terminal.cols; t += this._terminal.options.tabStopWidth)
                        this.tabs[t] = !0
                }
                ,
                t.prototype.prevStop = function(t) {
                    for (null == t && (t = this.x); !this.tabs[--t] && 0 < t; )
                        ;
                    return t >= this._terminal.cols ? this._terminal.cols - 1 : t < 0 ? 0 : t
                }
                ,
                t.prototype.nextStop = function(t) {
                    for (null == t && (t = this.x); !this.tabs[++t] && t < this._terminal.cols; )
                        ;
                    return t >= this._terminal.cols ? this._terminal.cols - 1 : t < 0 ? 0 : t
                }
                ,
                t.prototype.addMarker = function(t) {
                    var e = this
                      , r = new h(t);
                    return this.markers.push(r),
                    r.register(this.lines.addDisposableListener("trim", function(t) {
                        r.line -= t,
                        r.line < 0 && r.dispose()
                    })),
                    r.register(r.addDisposableListener("dispose", function() {
                        return e._removeMarker(r)
                    })),
                    r
                }
                ,
                t.prototype._removeMarker = function(t) {
                    this.markers.splice(this.markers.indexOf(t), 1)
                }
                ,
                t.prototype.iterator = function(t, e, r, n, i) {
                    return new u(this,t,e,r,n,i)
                }
                ,
                t
            }();
            r.Buffer = c;
            var h = function(t) {
                function e(r) {
                    var n = t.call(this) || this;
                    return n.line = r,
                    n._id = e._nextId++,
                    n.isDisposed = !1,
                    n
                }
                return i(e, t),
                Object.defineProperty(e.prototype, "id", {
                    get: function() {
                        return this._id
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                e.prototype.dispose = function() {
                    this.isDisposed || (this.isDisposed = !0,
                    this.emit("dispose"),
                    t.prototype.dispose.call(this))
                }
                ,
                e._nextId = 1,
                e
            }(s.EventEmitter);
            r.Marker = h;
            var u = function() {
                function t(t, e, r, n, i, o) {
                    void 0 === r && (r = 0),
                    void 0 === n && (n = t.lines.length),
                    void 0 === i && (i = 0),
                    void 0 === o && (o = 0),
                    this._buffer = t,
                    this._trimRight = e,
                    this._startIndex = r,
                    this._endIndex = n,
                    this._startOverscan = i,
                    this._endOverscan = o,
                    this._startIndex < 0 && (this._startIndex = 0),
                    this._endIndex > this._buffer.lines.length && (this._endIndex = this._buffer.lines.length),
                    this._current = this._startIndex
                }
                return t.prototype.hasNext = function() {
                    return this._current < this._endIndex
                }
                ,
                t.prototype.next = function() {
                    var t = this._buffer.getWrappedRangeForLine(this._current);
                    t.first < this._startIndex - this._startOverscan && (t.first = this._startIndex - this._startOverscan),
                    t.last > this._endIndex + this._endOverscan && (t.last = this._endIndex + this._endOverscan),
                    t.first = Math.max(t.first, 0),
                    t.last = Math.min(t.last, this._buffer.lines.length);
                    for (var e = "", r = t.first; r <= t.last; ++r)
                        e += this._buffer.translateBufferLineToString(r, this._trimRight);
                    return this._current = t.last + 1,
                    {
                        range: t,
                        content: e
                    }
                }
                ,
                t
            }();
            r.BufferStringIterator = u
        }
        , {
            "./BufferLine": 3,
            "./common/CircularList": 16,
            "./common/EventEmitter": 18,
            "./renderer/atlas/Types": 44
        }],
        3: [function(t, e, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = t("./Buffer")
              , i = function() {
                function t(t, e, r) {
                    this.isWrapped = !1,
                    this._data = [],
                    e || (e = [0, n.NULL_CELL_CHAR, n.NULL_CELL_WIDTH, n.NULL_CELL_CODE]);
                    for (var i = 0; i < t; i++)
                        this._push(e);
                    r && (this.isWrapped = !0),
                    this.length = this._data.length
                }
                return t.prototype._pop = function() {
                    var t = this._data.pop();
                    return this.length = this._data.length,
                    t
                }
                ,
                t.prototype._push = function(t) {
                    this._data.push(t),
                    this.length = this._data.length
                }
                ,
                t.prototype._splice = function(t, e) {
                    for (var r, n = [], i = 2; i < arguments.length; i++)
                        n[i - 2] = arguments[i];
                    var o = (r = this._data).splice.apply(r, [t, e].concat(n));
                    return this.length = this._data.length,
                    o
                }
                ,
                t.prototype.get = function(t) {
                    return this._data[t]
                }
                ,
                t.prototype.set = function(t, e) {
                    this._data[t] = e
                }
                ,
                t.prototype.insertCells = function(t, e, r) {
                    for (; e--; )
                        this._splice(t, 0, r),
                        this._pop()
                }
                ,
                t.prototype.deleteCells = function(t, e, r) {
                    for (; e--; )
                        this._splice(t, 1),
                        this._push(r)
                }
                ,
                t.prototype.replaceCells = function(t, e, r) {
                    for (; t < e && t < this.length; )
                        this.set(t++, r)
                }
                ,
                t.prototype.resize = function(t, e, r) {
                    for (void 0 === r && (r = !1); this._data.length < t; )
                        this._data.push(e);
                    if (r)
                        for (; this._data.length > t; )
                            this._data.pop();
                    this.length = this._data.length
                }
                ,
                t.prototype.fill = function(t) {
                    for (var e = 0; e < this.length; ++e)
                        this.set(e, t)
                }
                ,
                t.prototype.copyFrom = function(t) {
                    this._data = t._data.slice(0),
                    this.length = t.length,
                    this.isWrapped = t.isWrapped
                }
                ,
                t.prototype.clone = function() {
                    var e = new t(0);
                    return e.copyFrom(this),
                    e
                }
                ,
                t.prototype.getTrimmedLength = function() {
                    for (var t = this.length - 1; 0 <= t; --t) {
                        var e = this.get(t);
                        if ("" !== e[n.CHAR_DATA_CHAR_INDEX])
                            return t + e[n.CHAR_DATA_WIDTH_INDEX]
                    }
                    return 0
                }
                ,
                t.prototype.translateToString = function(t, e, r) {
                    void 0 === t && (t = !1),
                    void 0 === e && (e = 0),
                    void 0 === r && (r = this.length),
                    t && (r = Math.min(r, this.getTrimmedLength()));
                    for (var i = ""; e < r; )
                        i += this.get(e)[n.CHAR_DATA_CHAR_INDEX] || n.WHITESPACE_CELL_CHAR,
                        e += this.get(e)[n.CHAR_DATA_WIDTH_INDEX] || 1;
                    return i
                }
                ,
                t
            }();
            r.BufferLineJSArray = i;
            var o = 2147483648
              , s = function() {
                function t(t, e, r) {
                    if (void 0 === r && (r = !1),
                    this.isWrapped = r,
                    this._data = null,
                    this._combined = {},
                    e || (e = [0, n.NULL_CELL_CHAR, n.NULL_CELL_WIDTH, n.NULL_CELL_CODE]),
                    t) {
                        this._data = new Uint32Array(3 * t);
                        for (var i = 0; i < t; ++i)
                            this.set(i, e)
                    }
                    this.length = t
                }
                return t.prototype.get = function(t) {
                    var e = this._data[3 * t + 1];
                    return [this._data[3 * t + 0], e & o ? this._combined[t] : e ? String.fromCharCode(e) : "", this._data[3 * t + 2], e & o ? this._combined[t].charCodeAt(this._combined[t].length - 1) : e]
                }
                ,
                t.prototype.set = function(t, e) {
                    this._data[3 * t + 0] = e[0],
                    1 < e[1].length ? (this._combined[t] = e[1],
                    this._data[3 * t + 1] = t | o) : this._data[3 * t + 1] = e[1].charCodeAt(0),
                    this._data[3 * t + 2] = e[2]
                }
                ,
                t.prototype.insertCells = function(t, e, r) {
                    if (t %= this.length,
                    e < this.length - t) {
                        for (var n = this.length - t - e - 1; 0 <= n; --n)
                            this.set(t + e + n, this.get(t + n));
                        for (n = 0; n < e; ++n)
                            this.set(t + n, r)
                    } else
                        for (n = t; n < this.length; ++n)
                            this.set(n, r)
                }
                ,
                t.prototype.deleteCells = function(t, e, r) {
                    if (t %= this.length,
                    e < this.length - t) {
                        for (var n = 0; n < this.length - t - e; ++n)
                            this.set(t + n, this.get(t + e + n));
                        for (n = this.length - e; n < this.length; ++n)
                            this.set(n, r)
                    } else
                        for (n = t; n < this.length; ++n)
                            this.set(n, r)
                }
                ,
                t.prototype.replaceCells = function(t, e, r) {
                    for (; t < e && t < this.length; )
                        this.set(t++, r)
                }
                ,
                t.prototype.resize = function(t, e, r) {
                    if (void 0 === r && (r = !1),
                    !(t === this.length || !r && t < this.length)) {
                        if (t > this.length) {
                            var n = new Uint32Array(3 * t);
                            this.length && (3 * t < this._data.length ? n.set(this._data.subarray(0, 3 * t)) : n.set(this._data)),
                            this._data = n;
                            for (var i = this.length; i < t; ++i)
                                this.set(i, e)
                        } else if (r)
                            if (t) {
                                (n = new Uint32Array(3 * t)).set(this._data.subarray(0, 3 * t)),
                                this._data = n
                            } else
                                this._data = null;
                        this.length = t
                    }
                }
                ,
                t.prototype.fill = function(t) {
                    this._combined = {};
                    for (var e = 0; e < this.length; ++e)
                        this.set(e, t)
                }
                ,
                t.prototype.copyFrom = function(t) {
                    for (var e in this.length !== t.length ? this._data = new Uint32Array(t._data) : this._data.set(t._data),
                    this.length = t.length,
                    this._combined = {},
                    t._combined)
                        this._combined[e] = t._combined[e];
                    this.isWrapped = t.isWrapped
                }
                ,
                t.prototype.clone = function() {
                    var e = new t(0);
                    for (var r in e._data = new Uint32Array(this._data),
                    e.length = this.length,
                    this._combined)
                        e._combined[r] = this._combined[r];
                    return e.isWrapped = this.isWrapped,
                    e
                }
                ,
                t.prototype.getTrimmedLength = function() {
                    for (var t = this.length - 1; 0 <= t; --t)
                        if (0 !== this._data[3 * t + 1])
                            return t + this._data[3 * t + 2];
                    return 0
                }
                ,
                t.prototype.translateToString = function(t, e, r) {
                    void 0 === t && (t = !1),
                    void 0 === e && (e = 0),
                    void 0 === r && (r = this.length),
                    t && (r = Math.min(r, this.getTrimmedLength()));
                    for (var i = ""; e < r; ) {
                        var s = this._data[3 * e + 1];
                        i += s & o ? this._combined[e] : s ? String.fromCharCode(s) : n.WHITESPACE_CELL_CHAR,
                        e += this._data[3 * e + 2] || 1
                    }
                    return i
                }
                ,
                t
            }();
            r.BufferLine = s
        }
        , {
            "./Buffer": 2
        }],
        4: [function(t, e, r) {
            "use strict";
            var n, i = this && this.__extends || (n = function(t, e) {
                return (n = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(t, e) {
                    t.__proto__ = e
                }
                || function(t, e) {
                    for (var r in e)
                        e.hasOwnProperty(r) && (t[r] = e[r])
                }
                )(t, e)
            }
            ,
            function(t, e) {
                function r() {
                    this.constructor = t
                }
                n(t, e),
                t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype,
                new r)
            }
            );
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = t("./Buffer")
              , s = function(t) {
                function e(e) {
                    var r = t.call(this) || this;
                    return r._terminal = e,
                    r._normal = new o.Buffer(r._terminal,!0),
                    r._normal.fillViewportRows(),
                    r._alt = new o.Buffer(r._terminal,!1),
                    r._activeBuffer = r._normal,
                    r.setupTabStops(),
                    r
                }
                return i(e, t),
                Object.defineProperty(e.prototype, "alt", {
                    get: function() {
                        return this._alt
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(e.prototype, "active", {
                    get: function() {
                        return this._activeBuffer
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(e.prototype, "normal", {
                    get: function() {
                        return this._normal
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                e.prototype.activateNormalBuffer = function() {
                    this._activeBuffer !== this._normal && (this._normal.x = this._alt.x,
                    this._normal.y = this._alt.y,
                    this._alt.clear(),
                    this._activeBuffer = this._normal,
                    this.emit("activate", {
                        activeBuffer: this._normal,
                        inactiveBuffer: this._alt
                    }))
                }
                ,
                e.prototype.activateAltBuffer = function(t) {
                    this._activeBuffer !== this._alt && (this._alt.fillViewportRows(t),
                    this._alt.x = this._normal.x,
                    this._alt.y = this._normal.y,
                    this._activeBuffer = this._alt,
                    this.emit("activate", {
                        activeBuffer: this._alt,
                        inactiveBuffer: this._normal
                    }))
                }
                ,
                e.prototype.resize = function(t, e) {
                    this._normal.resize(t, e),
                    this._alt.resize(t, e)
                }
                ,
                e.prototype.setupTabStops = function(t) {
                    this._normal.setupTabStops(t),
                    this._alt.setupTabStops(t)
                }
                ,
                e
            }(t("./common/EventEmitter").EventEmitter);
            r.BufferSet = s
        }
        , {
            "./Buffer": 2,
            "./common/EventEmitter": 18
        }],
        5: [function(t, e, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = t("./common/TypedArrayUtils");
            r.wcwidth = function(t) {
                var e = [[768, 879], [1155, 1158], [1160, 1161], [1425, 1469], [1471, 1471], [1473, 1474], [1476, 1477], [1479, 1479], [1536, 1539], [1552, 1557], [1611, 1630], [1648, 1648], [1750, 1764], [1767, 1768], [1770, 1773], [1807, 1807], [1809, 1809], [1840, 1866], [1958, 1968], [2027, 2035], [2305, 2306], [2364, 2364], [2369, 2376], [2381, 2381], [2385, 2388], [2402, 2403], [2433, 2433], [2492, 2492], [2497, 2500], [2509, 2509], [2530, 2531], [2561, 2562], [2620, 2620], [2625, 2626], [2631, 2632], [2635, 2637], [2672, 2673], [2689, 2690], [2748, 2748], [2753, 2757], [2759, 2760], [2765, 2765], [2786, 2787], [2817, 2817], [2876, 2876], [2879, 2879], [2881, 2883], [2893, 2893], [2902, 2902], [2946, 2946], [3008, 3008], [3021, 3021], [3134, 3136], [3142, 3144], [3146, 3149], [3157, 3158], [3260, 3260], [3263, 3263], [3270, 3270], [3276, 3277], [3298, 3299], [3393, 3395], [3405, 3405], [3530, 3530], [3538, 3540], [3542, 3542], [3633, 3633], [3636, 3642], [3655, 3662], [3761, 3761], [3764, 3769], [3771, 3772], [3784, 3789], [3864, 3865], [3893, 3893], [3895, 3895], [3897, 3897], [3953, 3966], [3968, 3972], [3974, 3975], [3984, 3991], [3993, 4028], [4038, 4038], [4141, 4144], [4146, 4146], [4150, 4151], [4153, 4153], [4184, 4185], [4448, 4607], [4959, 4959], [5906, 5908], [5938, 5940], [5970, 5971], [6002, 6003], [6068, 6069], [6071, 6077], [6086, 6086], [6089, 6099], [6109, 6109], [6155, 6157], [6313, 6313], [6432, 6434], [6439, 6440], [6450, 6450], [6457, 6459], [6679, 6680], [6912, 6915], [6964, 6964], [6966, 6970], [6972, 6972], [6978, 6978], [7019, 7027], [7616, 7626], [7678, 7679], [8203, 8207], [8234, 8238], [8288, 8291], [8298, 8303], [8400, 8431], [12330, 12335], [12441, 12442], [43014, 43014], [43019, 43019], [43045, 43046], [64286, 64286], [65024, 65039], [65056, 65059], [65279, 65279], [65529, 65531]]
                  , r = [[68097, 68099], [68101, 68102], [68108, 68111], [68152, 68154], [68159, 68159], [119143, 119145], [119155, 119170], [119173, 119179], [119210, 119213], [119362, 119364], [917505, 917505], [917536, 917631], [917760, 917999]];
                var i = 0 | t.control
                  , o = new Uint8Array(65536);
                n.fill(o, 1),
                o[0] = t.nul,
                n.fill(o, t.control, 1, 32),
                n.fill(o, t.control, 127, 160),
                n.fill(o, 2, 4352, 4448),
                o[9001] = 2,
                o[9002] = 2,
                n.fill(o, 2, 11904, 42192),
                o[12351] = 1,
                n.fill(o, 2, 44032, 55204),
                n.fill(o, 2, 63744, 64256),
                n.fill(o, 2, 65040, 65050),
                n.fill(o, 2, 65072, 65136),
                n.fill(o, 2, 65280, 65377),
                n.fill(o, 2, 65504, 65511);
                for (var s = 0; s < e.length; ++s)
                    n.fill(o, 0, e[s][0], e[s][1] + 1);
                return function(t) {
                    return t < 32 ? 0 | i : t < 127 ? 1 : t < 65536 ? o[t] : function(t, e) {
                        var r, n = 0, i = e.length - 1;
                        if (t < e[0][0] || t > e[i][1])
                            return !1;
                        for (; n <= i; )
                            if (t > e[r = n + i >> 1][1])
                                n = r + 1;
                            else {
                                if (!(t < e[r][0]))
                                    return !0;
                                i = r - 1
                            }
                        return !1
                    }(e = t, r) ? 0 : 131072 <= e && e <= 196605 || 196608 <= e && e <= 262141 ? 2 : 1;
                    var e
                }
            }({
                nul: 0,
                control: 0
            }),
            r.getStringCellWidth = function(t) {
                for (var e = 0, n = t.length, i = 0; i < n; ++i) {
                    var o = t.charCodeAt(i);
                    if (55296 <= o && o <= 56319) {
                        if (++i >= n)
                            return e + r.wcwidth(o);
                        var s = t.charCodeAt(i);
                        56320 <= s && s <= 57343 ? o = 1024 * (o - 55296) + s - 56320 + 65536 : e += r.wcwidth(s)
                    }
                    e += r.wcwidth(o)
                }
                return e
            }
        }
        , {
            "./common/TypedArrayUtils": 20
        }],
        6: [function(t, e, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = function() {
                function t(t, e, r) {
                    this._textarea = t,
                    this._compositionView = e,
                    this._terminal = r,
                    this._isComposing = !1,
                    this._isSendingComposition = !1,
                    this._compositionPosition = {
                        start: null,
                        end: null
                    }
                }
                return t.prototype.compositionstart = function() {
                    this._isComposing = !0,
                    this._compositionPosition.start = this._textarea.value.length,
                    this._compositionView.textContent = "",
                    this._compositionView.classList.add("active")
                }
                ,
                t.prototype.compositionupdate = function(t) {
                    var e = this;
                    this._compositionView.textContent = t.data,
                    this.updateCompositionElements(),
                    setTimeout(function() {
                        e._compositionPosition.end = e._textarea.value.length
                    }, 0)
                }
                ,
                t.prototype.compositionend = function() {
                    this._finalizeComposition(!0)
                }
                ,
                t.prototype.keydown = function(t) {
                    if (this._isComposing || this._isSendingComposition) {
                        if (229 === t.keyCode)
                            return !1;
                        if (16 === t.keyCode || 17 === t.keyCode || 18 === t.keyCode)
                            return !1;
                        this._finalizeComposition(!1)
                    }
                    return 229 !== t.keyCode || (this._handleAnyTextareaChanges(),
                    !1)
                }
                ,
                t.prototype._finalizeComposition = function(t) {
                    var e = this;
                    if (this._compositionView.classList.remove("active"),
                    this._isComposing = !1,
                    this._clearTextareaPosition(),
                    t) {
                        var r = {
                            start: this._compositionPosition.start,
                            end: this._compositionPosition.end
                        };
                        this._isSendingComposition = !0,
                        setTimeout(function() {
                            if (e._isSendingComposition) {
                                e._isSendingComposition = !1;
                                var t;
                                t = e._isComposing ? e._textarea.value.substring(r.start, r.end) : e._textarea.value.substring(r.start),
                                e._terminal.handler(t)
                            }
                        }, 0)
                    } else {
                        this._isSendingComposition = !1;
                        var n = this._textarea.value.substring(this._compositionPosition.start, this._compositionPosition.end);
                        this._terminal.handler(n)
                    }
                }
                ,
                t.prototype._handleAnyTextareaChanges = function() {
                    var t = this
                      , e = this._textarea.value;
                    setTimeout(function() {
                        if (!t._isComposing) {
                            var r = t._textarea.value.replace(e, "");
                            0 < r.length && t._terminal.handler(r)
                        }
                    }, 0)
                }
                ,
                t.prototype.updateCompositionElements = function(t) {
                    var e = this;
                    if (this._isComposing) {
                        if (this._terminal.buffer.isCursorInViewport) {
                            var r = Math.ceil(this._terminal.charMeasure.height * this._terminal.options.lineHeight)
                              , n = this._terminal.buffer.y * r
                              , i = this._terminal.buffer.x * this._terminal.charMeasure.width;
                            this._compositionView.style.left = i + "px",
                            this._compositionView.style.top = n + "px",
                            this._compositionView.style.height = r + "px",
                            this._compositionView.style.lineHeight = r + "px";
                            var o = this._compositionView.getBoundingClientRect();
                            this._textarea.style.left = i + "px",
                            this._textarea.style.top = n + "px",
                            this._textarea.style.width = o.width + "px",
                            this._textarea.style.height = o.height + "px",
                            this._textarea.style.lineHeight = o.height + "px"
                        }
                        t || setTimeout(function() {
                            return e.updateCompositionElements(!0)
                        }, 0)
                    }
                }
                ,
                t.prototype._clearTextareaPosition = function() {
                    this._textarea.style.left = "",
                    this._textarea.style.top = ""
                }
                ,
                t
            }();
            r.CompositionHelper = n
        }
        , {}],
        7: [function(t, e, r) {
            "use strict";
            var n, i = this && this.__extends || (n = function(t, e) {
                return (n = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(t, e) {
                    t.__proto__ = e
                }
                || function(t, e) {
                    for (var r in e)
                        e.hasOwnProperty(r) && (t[r] = e[r])
                }
                )(t, e)
            }
            ,
            function(t, e) {
                function r() {
                    this.constructor = t
                }
                n(t, e),
                t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype,
                new r)
            }
            );
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = t("./common/Lifecycle");
            function s(t, e) {
                for (var r = e - t, n = new Array(r); r--; )
                    n[r] = --e;
                return n
            }
            var a = function() {
                function t(t) {
                    this.table = "undefined" == typeof Uint8Array ? new Array(t) : new Uint8Array(t)
                }
                return t.prototype.add = function(t, e, r, n) {
                    this.table[e << 8 | t] = (0 | r) << 4 | (void 0 === n ? e : n)
                }
                ,
                t.prototype.addMany = function(t, e, r, n) {
                    for (var i = 0; i < t.length; i++)
                        this.add(t[i], e, r, n)
                }
                ,
                t
            }();
            r.TransitionTable = a;
            var l = s(32, 127)
              , c = s(0, 24);
            c.push(25),
            c.push.apply(c, s(28, 32)),
            r.VT500_TRANSITION_TABLE = function() {
                var t, e = new a(4095), r = s(0, 14);
                for (t in r)
                    for (var n = 0; n <= 160; ++n)
                        e.add(n, t, 1, 0);
                for (t in e.addMany(l, 0, 2, 0),
                r)
                    e.addMany([24, 26, 153, 154], t, 3, 0),
                    e.addMany(s(128, 144), t, 3, 0),
                    e.addMany(s(144, 152), t, 3, 0),
                    e.add(156, t, 0, 0),
                    e.add(27, t, 11, 1),
                    e.add(157, t, 4, 8),
                    e.addMany([152, 158, 159], t, 0, 7),
                    e.add(155, t, 11, 3),
                    e.add(144, t, 11, 9);
                return e.addMany(c, 0, 3, 0),
                e.addMany(c, 1, 3, 1),
                e.add(127, 1, 0, 1),
                e.addMany(c, 8, 0, 8),
                e.addMany(c, 3, 3, 3),
                e.add(127, 3, 0, 3),
                e.addMany(c, 4, 3, 4),
                e.add(127, 4, 0, 4),
                e.addMany(c, 6, 3, 6),
                e.addMany(c, 5, 3, 5),
                e.add(127, 5, 0, 5),
                e.addMany(c, 2, 3, 2),
                e.add(127, 2, 0, 2),
                e.add(93, 1, 4, 8),
                e.addMany(l, 8, 5, 8),
                e.add(127, 8, 5, 8),
                e.addMany([156, 27, 24, 26, 7], 8, 6, 0),
                e.addMany(s(28, 32), 8, 0, 8),
                e.addMany([88, 94, 95], 1, 0, 7),
                e.addMany(l, 7, 0, 7),
                e.addMany(c, 7, 0, 7),
                e.add(156, 7, 0, 0),
                e.add(91, 1, 11, 3),
                e.addMany(s(64, 127), 3, 7, 0),
                e.addMany(s(48, 58), 3, 8, 4),
                e.add(59, 3, 8, 4),
                e.addMany([60, 61, 62, 63], 3, 9, 4),
                e.addMany(s(48, 58), 4, 8, 4),
                e.add(59, 4, 8, 4),
                e.addMany(s(64, 127), 4, 7, 0),
                e.addMany([58, 60, 61, 62, 63], 4, 0, 6),
                e.addMany(s(32, 64), 6, 0, 6),
                e.add(127, 6, 0, 6),
                e.addMany(s(64, 127), 6, 0, 0),
                e.add(58, 3, 0, 6),
                e.addMany(s(32, 48), 3, 9, 5),
                e.addMany(s(32, 48), 5, 9, 5),
                e.addMany(s(48, 64), 5, 0, 6),
                e.addMany(s(64, 127), 5, 7, 0),
                e.addMany(s(32, 48), 4, 9, 5),
                e.addMany(s(32, 48), 1, 9, 2),
                e.addMany(s(32, 48), 2, 9, 2),
                e.addMany(s(48, 127), 2, 10, 0),
                e.addMany(s(48, 80), 1, 10, 0),
                e.addMany(s(81, 88), 1, 10, 0),
                e.addMany([89, 90, 92], 1, 10, 0),
                e.addMany(s(96, 127), 1, 10, 0),
                e.add(80, 1, 11, 9),
                e.addMany(c, 9, 0, 9),
                e.add(127, 9, 0, 9),
                e.addMany(s(28, 32), 9, 0, 9),
                e.addMany(s(32, 48), 9, 9, 12),
                e.add(58, 9, 0, 11),
                e.addMany(s(48, 58), 9, 8, 10),
                e.add(59, 9, 8, 10),
                e.addMany([60, 61, 62, 63], 9, 9, 10),
                e.addMany(c, 11, 0, 11),
                e.addMany(s(32, 128), 11, 0, 11),
                e.addMany(s(28, 32), 11, 0, 11),
                e.addMany(c, 10, 0, 10),
                e.add(127, 10, 0, 10),
                e.addMany(s(28, 32), 10, 0, 10),
                e.addMany(s(48, 58), 10, 8, 10),
                e.add(59, 10, 8, 10),
                e.addMany([58, 60, 61, 62, 63], 10, 0, 11),
                e.addMany(s(32, 48), 10, 9, 12),
                e.addMany(c, 12, 0, 12),
                e.add(127, 12, 0, 12),
                e.addMany(s(28, 32), 12, 0, 12),
                e.addMany(s(32, 48), 12, 9, 12),
                e.addMany(s(48, 64), 12, 0, 11),
                e.addMany(s(64, 127), 12, 12, 13),
                e.addMany(s(64, 127), 10, 12, 13),
                e.addMany(s(64, 127), 9, 12, 13),
                e.addMany(c, 13, 13, 13),
                e.addMany(l, 13, 13, 13),
                e.add(127, 13, 0, 13),
                e.addMany([27, 156], 13, 14, 0),
                e.add(160, 8, 5, 8),
                e
            }();
            var h = function() {
                function t() {}
                return t.prototype.hook = function(t, e, r) {}
                ,
                t.prototype.put = function(t, e, r) {}
                ,
                t.prototype.unhook = function() {}
                ,
                t
            }()
              , u = function(t) {
                function e(e) {
                    void 0 === e && (e = r.VT500_TRANSITION_TABLE);
                    var n = t.call(this) || this;
                    return n.TRANSITIONS = e,
                    n.initialState = 0,
                    n.currentState = n.initialState,
                    n._osc = "",
                    n._params = [0],
                    n._collect = "",
                    n._printHandlerFb = function(t, e, r) {}
                    ,
                    n._executeHandlerFb = function(t) {}
                    ,
                    n._csiHandlerFb = function(t, e, r) {}
                    ,
                    n._escHandlerFb = function(t, e) {}
                    ,
                    n._oscHandlerFb = function(t, e) {}
                    ,
                    n._dcsHandlerFb = new h,
                    n._errorHandlerFb = function(t) {
                        return t
                    }
                    ,
                    n._printHandler = n._printHandlerFb,
                    n._executeHandlers = Object.create(null),
                    n._csiHandlers = Object.create(null),
                    n._escHandlers = Object.create(null),
                    n._oscHandlers = Object.create(null),
                    n._dcsHandlers = Object.create(null),
                    n._activeDcsHandler = null,
                    n._errorHandler = n._errorHandlerFb,
                    n.setEscHandler("\\", function() {}),
                    n
                }
                return i(e, t),
                e.prototype.dispose = function() {
                    this._printHandlerFb = null,
                    this._executeHandlerFb = null,
                    this._csiHandlerFb = null,
                    this._escHandlerFb = null,
                    this._oscHandlerFb = null,
                    this._dcsHandlerFb = null,
                    this._errorHandlerFb = null,
                    this._printHandler = null,
                    this._executeHandlers = null,
                    this._escHandlers = null,
                    this._csiHandlers = null,
                    this._oscHandlers = null,
                    this._dcsHandlers = null,
                    this._activeDcsHandler = null,
                    this._errorHandler = null
                }
                ,
                e.prototype.setPrintHandler = function(t) {
                    this._printHandler = t
                }
                ,
                e.prototype.clearPrintHandler = function() {
                    this._printHandler = this._printHandlerFb
                }
                ,
                e.prototype.setExecuteHandler = function(t, e) {
                    this._executeHandlers[t.charCodeAt(0)] = e
                }
                ,
                e.prototype.clearExecuteHandler = function(t) {
                    this._executeHandlers[t.charCodeAt(0)] && delete this._executeHandlers[t.charCodeAt(0)]
                }
                ,
                e.prototype.setExecuteHandlerFallback = function(t) {
                    this._executeHandlerFb = t
                }
                ,
                e.prototype.addCsiHandler = function(t, e) {
                    var r = t.charCodeAt(0);
                    void 0 === this._csiHandlers[r] && (this._csiHandlers[r] = []);
                    var n = this._csiHandlers[r];
                    return n.push(e),
                    {
                        dispose: function() {
                            var t = n.indexOf(e);
                            -1 !== t && n.splice(t, 1)
                        }
                    }
                }
                ,
                e.prototype.setCsiHandler = function(t, e) {
                    this._csiHandlers[t.charCodeAt(0)] = [e]
                }
                ,
                e.prototype.clearCsiHandler = function(t) {
                    this._csiHandlers[t.charCodeAt(0)] && delete this._csiHandlers[t.charCodeAt(0)]
                }
                ,
                e.prototype.setCsiHandlerFallback = function(t) {
                    this._csiHandlerFb = t
                }
                ,
                e.prototype.setEscHandler = function(t, e) {
                    this._escHandlers[t] = e
                }
                ,
                e.prototype.clearEscHandler = function(t) {
                    this._escHandlers[t] && delete this._escHandlers[t]
                }
                ,
                e.prototype.setEscHandlerFallback = function(t) {
                    this._escHandlerFb = t
                }
                ,
                e.prototype.addOscHandler = function(t, e) {
                    void 0 === this._oscHandlers[t] && (this._oscHandlers[t] = []);
                    var r = this._oscHandlers[t];
                    return r.push(e),
                    {
                        dispose: function() {
                            var t = r.indexOf(e);
                            -1 !== t && r.splice(t, 1)
                        }
                    }
                }
                ,
                e.prototype.setOscHandler = function(t, e) {
                    this._oscHandlers[t] = [e]
                }
                ,
                e.prototype.clearOscHandler = function(t) {
                    this._oscHandlers[t] && delete this._oscHandlers[t]
                }
                ,
                e.prototype.setOscHandlerFallback = function(t) {
                    this._oscHandlerFb = t
                }
                ,
                e.prototype.setDcsHandler = function(t, e) {
                    this._dcsHandlers[t] = e
                }
                ,
                e.prototype.clearDcsHandler = function(t) {
                    this._dcsHandlers[t] && delete this._dcsHandlers[t]
                }
                ,
                e.prototype.setDcsHandlerFallback = function(t) {
                    this._dcsHandlerFb = t
                }
                ,
                e.prototype.setErrorHandler = function(t) {
                    this._errorHandler = t
                }
                ,
                e.prototype.clearErrorHandler = function() {
                    this._errorHandler = this._errorHandlerFb
                }
                ,
                e.prototype.reset = function() {
                    this.currentState = this.initialState,
                    this._osc = "",
                    this._params = [0],
                    this._collect = "",
                    this._activeDcsHandler = null
                }
                ,
                e.prototype.parse = function(t) {
                    for (var e = 0, r = 0, n = !1, i = this.currentState, o = -1, s = -1, a = this._osc, l = this._collect, c = this._params, h = this.TRANSITIONS.table, u = this._activeDcsHandler, f = null, p = t.length, d = 0; d < p; ++d)
                        if (e = t.charCodeAt(d),
                        0 === i && 31 < e && e < 128) {
                            for (o = ~o ? o : d; ++d < p && 31 < t.charCodeAt(d) && t.charCodeAt(d) < 128; )
                                ;
                            d--
                        } else if (4 === i && 47 < e && e < 57)
                            c[c.length - 1] = 10 * c[c.length - 1] + e - 48;
                        else {
                            switch ((r = h[i << 8 | (e < 160 ? e : 160)]) >> 4) {
                            case 2:
                                o = ~o ? o : d;
                                break;
                            case 3:
                                ~o && (this._printHandler(t, o, d),
                                o = -1),
                                (f = this._executeHandlers[e]) ? f() : this._executeHandlerFb(e);
                                break;
                            case 0:
                                ~o ? (this._printHandler(t, o, d),
                                o = -1) : ~s && (u.put(t, s, d),
                                s = -1);
                                break;
                            case 1:
                                if (159 < e)
                                    switch (i) {
                                    case 0:
                                        o = ~o ? o : d;
                                        break;
                                    case 6:
                                        r |= 6;
                                        break;
                                    case 11:
                                        r |= 11;
                                        break;
                                    case 13:
                                        s = ~s ? s : d,
                                        r |= 13;
                                        break;
                                    default:
                                        n = !0
                                    }
                                else
                                    n = !0;
                                if (n) {
                                    if (this._errorHandler({
                                        position: d,
                                        code: e,
                                        currentState: i,
                                        print: o,
                                        dcs: s,
                                        osc: a,
                                        collect: l,
                                        params: c,
                                        abort: !1
                                    }).abort)
                                        return;
                                    n = !1
                                }
                                break;
                            case 7:
                                for (var _ = this._csiHandlers[e], m = _ ? _.length - 1 : -1; 0 <= m && !_[m](c, l); m--)
                                    ;
                                m < 0 && this._csiHandlerFb(l, c, e);
                                break;
                            case 8:
                                59 === e ? c.push(0) : c[c.length - 1] = 10 * c[c.length - 1] + e - 48;
                                break;
                            case 9:
                                l += String.fromCharCode(e);
                                break;
                            case 10:
                                (f = this._escHandlers[l + String.fromCharCode(e)]) ? f(l, e) : this._escHandlerFb(l, e);
                                break;
                            case 11:
                                ~o && (this._printHandler(t, o, d),
                                o = -1),
                                c = [0],
                                l = a = "",
                                s = -1;
                                break;
                            case 12:
                                (u = this._dcsHandlers[l + String.fromCharCode(e)]) || (u = this._dcsHandlerFb),
                                u.hook(l, c, e);
                                break;
                            case 13:
                                s = ~s ? s : d;
                                break;
                            case 14:
                                u && (~s && u.put(t, s, d),
                                u.unhook(),
                                u = null),
                                27 === e && (r |= 1),
                                c = [0],
                                l = a = "",
                                s = -1;
                                break;
                            case 4:
                                ~o && (this._printHandler(t, o, d),
                                o = -1),
                                a = "";
                                break;
                            case 5:
                                for (var y = d + 1; ; y++)
                                    if (p <= y || (e = t.charCodeAt(y)) < 32 || 127 < e && e <= 159) {
                                        a += t.substring(d, y),
                                        d = y - 1;
                                        break
                                    }
                                break;
                            case 6:
                                if (a && 24 !== e && 26 !== e) {
                                    var g = a.indexOf(";");
                                    if (-1 === g)
                                        this._oscHandlerFb(-1, a);
                                    else {
                                        for (var v = parseInt(a.substring(0, g)), C = a.substring(g + 1), b = this._oscHandlers[v], w = b ? b.length - 1 : -1; 0 <= w && !b[w](C); w--)
                                            ;
                                        w < 0 && this._oscHandlerFb(v, C)
                                    }
                                }
                                27 === e && (r |= 1),
                                c = [0],
                                l = a = "",
                                s = -1
                            }
                            i = 15 & r
                        }
                    0 === i && ~o ? this._printHandler(t, o, t.length) : 13 === i && ~s && u && u.put(t, s, t.length),
                    this._osc = a,
                    this._collect = l,
                    this._params = c,
                    this._activeDcsHandler = u,
                    this.currentState = i
                }
                ,
                e
            }(o.Disposable);
            r.EscapeSequenceParser = u
        }
        , {
            "./common/Lifecycle": 19
        }],
        8: [function(t, e, r) {
            "use strict";
            var n, i = this && this.__extends || (n = function(t, e) {
                return (n = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(t, e) {
                    t.__proto__ = e
                }
                || function(t, e) {
                    for (var r in e)
                        e.hasOwnProperty(r) && (t[r] = e[r])
                }
                )(t, e)
            }
            ,
            function(t, e) {
                function r() {
                    this.constructor = t
                }
                n(t, e),
                t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype,
                new r)
            }
            );
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = t("./common/data/EscapeSequences")
              , s = t("./core/data/Charsets")
              , a = t("./Buffer")
              , l = t("./CharWidth")
              , c = t("./EscapeSequenceParser")
              , h = t("./common/Lifecycle")
              , u = {
                "(": 0,
                ")": 1,
                "*": 2,
                "+": 3,
                "-": 1,
                ".": 2
            }
              , f = function() {
                function t(t) {
                    this._terminal = t
                }
                return t.prototype.hook = function(t, e, r) {
                    this._data = ""
                }
                ,
                t.prototype.put = function(t, e, r) {
                    this._data += t.substring(e, r)
                }
                ,
                t.prototype.unhook = function() {
                    switch (this._data) {
                    case '"q':
                        return this._terminal.handler(o.C0.ESC + 'P1$r0"q' + o.C0.ESC + "\\");
                    case '"p':
                        return this._terminal.handler(o.C0.ESC + 'P1$r61"p' + o.C0.ESC + "\\");
                    case "r":
                        var t = this._terminal.buffer.scrollTop + 1 + ";" + (this._terminal.buffer.scrollBottom + 1) + "r";
                        return this._terminal.handler(o.C0.ESC + "P1$r" + t + o.C0.ESC + "\\");
                    case "m":
                        return this._terminal.handler(o.C0.ESC + "P1$r0m" + o.C0.ESC + "\\");
                    case " q":
                        var e = {
                            block: 2,
                            underline: 4,
                            bar: 6
                        }[this._terminal.getOption("cursorStyle")];
                        return e -= this._terminal.getOption("cursorBlink"),
                        this._terminal.handler(o.C0.ESC + "P1$r" + e + " q" + o.C0.ESC + "\\");
                    default:
                        this._terminal.error("Unknown DCS $q %s", this._data),
                        this._terminal.handler(o.C0.ESC + "P0$r" + o.C0.ESC + "\\")
                    }
                }
                ,
                t
            }()
              , p = function(t) {
                function e(e, r) {
                    void 0 === r && (r = new c.EscapeSequenceParser);
                    var n = t.call(this) || this;
                    n._terminal = e,
                    n._parser = r,
                    n.register(n._parser),
                    n._surrogateFirst = "",
                    n._parser.setCsiHandlerFallback(function(t, e, r) {
                        n._terminal.error("Unknown CSI code: ", {
                            collect: t,
                            params: e,
                            flag: String.fromCharCode(r)
                        })
                    }),
                    n._parser.setEscHandlerFallback(function(t, e) {
                        n._terminal.error("Unknown ESC code: ", {
                            collect: t,
                            flag: String.fromCharCode(e)
                        })
                    }),
                    n._parser.setExecuteHandlerFallback(function(t) {
                        n._terminal.error("Unknown EXECUTE code: ", {
                            code: t
                        })
                    }),
                    n._parser.setOscHandlerFallback(function(t, e) {
                        n._terminal.error("Unknown OSC code: ", {
                            identifier: t,
                            data: e
                        })
                    }),
                    n._parser.setPrintHandler(function(t, e, r) {
                        return n.print(t, e, r)
                    }),
                    n._parser.setCsiHandler("@", function(t, e) {
                        return n.insertChars(t)
                    }),
                    n._parser.setCsiHandler("A", function(t, e) {
                        return n.cursorUp(t)
                    }),
                    n._parser.setCsiHandler("B", function(t, e) {
                        return n.cursorDown(t)
                    }),
                    n._parser.setCsiHandler("C", function(t, e) {
                        return n.cursorForward(t)
                    }),
                    n._parser.setCsiHandler("D", function(t, e) {
                        return n.cursorBackward(t)
                    }),
                    n._parser.setCsiHandler("E", function(t, e) {
                        return n.cursorNextLine(t)
                    }),
                    n._parser.setCsiHandler("F", function(t, e) {
                        return n.cursorPrecedingLine(t)
                    }),
                    n._parser.setCsiHandler("G", function(t, e) {
                        return n.cursorCharAbsolute(t)
                    }),
                    n._parser.setCsiHandler("H", function(t, e) {
                        return n.cursorPosition(t)
                    }),
                    n._parser.setCsiHandler("I", function(t, e) {
                        return n.cursorForwardTab(t)
                    }),
                    n._parser.setCsiHandler("J", function(t, e) {
                        return n.eraseInDisplay(t)
                    }),
                    n._parser.setCsiHandler("K", function(t, e) {
                        return n.eraseInLine(t)
                    }),
                    n._parser.setCsiHandler("L", function(t, e) {
                        return n.insertLines(t)
                    }),
                    n._parser.setCsiHandler("M", function(t, e) {
                        return n.deleteLines(t)
                    }),
                    n._parser.setCsiHandler("P", function(t, e) {
                        return n.deleteChars(t)
                    }),
                    n._parser.setCsiHandler("S", function(t, e) {
                        return n.scrollUp(t)
                    }),
                    n._parser.setCsiHandler("T", function(t, e) {
                        return n.scrollDown(t, e)
                    }),
                    n._parser.setCsiHandler("X", function(t, e) {
                        return n.eraseChars(t)
                    }),
                    n._parser.setCsiHandler("Z", function(t, e) {
                        return n.cursorBackwardTab(t)
                    }),
                    n._parser.setCsiHandler("`", function(t, e) {
                        return n.charPosAbsolute(t)
                    }),
                    n._parser.setCsiHandler("a", function(t, e) {
                        return n.hPositionRelative(t)
                    }),
                    n._parser.setCsiHandler("b", function(t, e) {
                        return n.repeatPrecedingCharacter(t)
                    }),
                    n._parser.setCsiHandler("c", function(t, e) {
                        return n.sendDeviceAttributes(t, e)
                    }),
                    n._parser.setCsiHandler("d", function(t, e) {
                        return n.linePosAbsolute(t)
                    }),
                    n._parser.setCsiHandler("e", function(t, e) {
                        return n.vPositionRelative(t)
                    }),
                    n._parser.setCsiHandler("f", function(t, e) {
                        return n.hVPosition(t)
                    }),
                    n._parser.setCsiHandler("g", function(t, e) {
                        return n.tabClear(t)
                    }),
                    n._parser.setCsiHandler("h", function(t, e) {
                        return n.setMode(t, e)
                    }),
                    n._parser.setCsiHandler("l", function(t, e) {
                        return n.resetMode(t, e)
                    }),
                    n._parser.setCsiHandler("m", function(t, e) {
                        return n.charAttributes(t)
                    }),
                    n._parser.setCsiHandler("n", function(t, e) {
                        return n.deviceStatus(t, e)
                    }),
                    n._parser.setCsiHandler("p", function(t, e) {
                        return n.softReset(t, e)
                    }),
                    n._parser.setCsiHandler("q", function(t, e) {
                        return n.setCursorStyle(t, e)
                    }),
                    n._parser.setCsiHandler("r", function(t, e) {
                        return n.setScrollRegion(t, e)
                    }),
                    n._parser.setCsiHandler("s", function(t, e) {
                        return n.saveCursor(t)
                    }),
                    n._parser.setCsiHandler("u", function(t, e) {
                        return n.restoreCursor(t)
                    }),
                    n._parser.setExecuteHandler(o.C0.BEL, function() {
                        return n.bell()
                    }),
                    n._parser.setExecuteHandler(o.C0.LF, function() {
                        return n.lineFeed()
                    }),
                    n._parser.setExecuteHandler(o.C0.VT, function() {
                        return n.lineFeed()
                    }),
                    n._parser.setExecuteHandler(o.C0.FF, function() {
                        return n.lineFeed()
                    }),
                    n._parser.setExecuteHandler(o.C0.CR, function() {
                        return n.carriageReturn()
                    }),
                    n._parser.setExecuteHandler(o.C0.BS, function() {
                        return n.backspace()
                    }),
                    n._parser.setExecuteHandler(o.C0.HT, function() {
                        return n.tab()
                    }),
                    n._parser.setExecuteHandler(o.C0.SO, function() {
                        return n.shiftOut()
                    }),
                    n._parser.setExecuteHandler(o.C0.SI, function() {
                        return n.shiftIn()
                    }),
                    n._parser.setExecuteHandler(o.C1.IND, function() {
                        return n.index()
                    }),
                    n._parser.setExecuteHandler(o.C1.NEL, function() {
                        return n.nextLine()
                    }),
                    n._parser.setExecuteHandler(o.C1.HTS, function() {
                        return n.tabSet()
                    }),
                    n._parser.setOscHandler(0, function(t) {
                        return n.setTitle(t)
                    }),
                    n._parser.setOscHandler(2, function(t) {
                        return n.setTitle(t)
                    }),
                    n._parser.setEscHandler("7", function() {
                        return n.saveCursor([])
                    }),
                    n._parser.setEscHandler("8", function() {
                        return n.restoreCursor([])
                    }),
                    n._parser.setEscHandler("D", function() {
                        return n.index()
                    }),
                    n._parser.setEscHandler("E", function() {
                        return n.nextLine()
                    }),
                    n._parser.setEscHandler("H", function() {
                        return n.tabSet()
                    }),
                    n._parser.setEscHandler("M", function() {
                        return n.reverseIndex()
                    }),
                    n._parser.setEscHandler("=", function() {
                        return n.keypadApplicationMode()
                    }),
                    n._parser.setEscHandler(">", function() {
                        return n.keypadNumericMode()
                    }),
                    n._parser.setEscHandler("c", function() {
                        return n.reset()
                    }),
                    n._parser.setEscHandler("n", function() {
                        return n.setgLevel(2)
                    }),
                    n._parser.setEscHandler("o", function() {
                        return n.setgLevel(3)
                    }),
                    n._parser.setEscHandler("|", function() {
                        return n.setgLevel(3)
                    }),
                    n._parser.setEscHandler("}", function() {
                        return n.setgLevel(2)
                    }),
                    n._parser.setEscHandler("~", function() {
                        return n.setgLevel(1)
                    }),
                    n._parser.setEscHandler("%@", function() {
                        return n.selectDefaultCharset()
                    }),
                    n._parser.setEscHandler("%G", function() {
                        return n.selectDefaultCharset()
                    });
                    var i = function(t) {
                        a._parser.setEscHandler("(" + t, function() {
                            return n.selectCharset("(" + t)
                        }),
                        a._parser.setEscHandler(")" + t, function() {
                            return n.selectCharset(")" + t)
                        }),
                        a._parser.setEscHandler("*" + t, function() {
                            return n.selectCharset("*" + t)
                        }),
                        a._parser.setEscHandler("+" + t, function() {
                            return n.selectCharset("+" + t)
                        }),
                        a._parser.setEscHandler("-" + t, function() {
                            return n.selectCharset("-" + t)
                        }),
                        a._parser.setEscHandler("." + t, function() {
                            return n.selectCharset("." + t)
                        }),
                        a._parser.setEscHandler("/" + t, function() {
                            return n.selectCharset("/" + t)
                        })
                    }
                      , a = this;
                    for (var l in s.CHARSETS)
                        i(l);
                    return n._parser.setErrorHandler(function(t) {
                        return n._terminal.error("Parsing error: ", t),
                        t
                    }),
                    n._parser.setDcsHandler("$q", new f(n._terminal)),
                    n
                }
                return i(e, t),
                e.prototype.dispose = function() {
                    t.prototype.dispose.call(this),
                    this._terminal = null
                }
                ,
                e.prototype.parse = function(t) {
                    if (this._terminal) {
                        var e = this._terminal.buffer
                          , r = e.x
                          , n = e.y;
                        this._terminal.debug && this._terminal.log("data: " + t),
                        this._surrogateFirst && (t = this._surrogateFirst + t,
                        this._surrogateFirst = ""),
                        this._parser.parse(t),
                        (e = this._terminal.buffer).x === r && e.y === n || this._terminal.emit("cursormove")
                    }
                }
                ,
                e.prototype.print = function(t, e, r) {
                    var n, i, o, s = this._terminal.buffer, c = this._terminal.charset, h = this._terminal.options.screenReaderMode, u = this._terminal.cols, f = this._terminal.wraparoundMode, p = this._terminal.insertMode, d = this._terminal.curAttr, _ = s.lines.get(s.y + s.ybase);
                    this._terminal.updateRange(s.y);
                    for (var m = e; m < r; ++m) {
                        if (n = t.charAt(m),
                        55296 <= (i = t.charCodeAt(m)) && i <= 56319) {
                            if (++m >= r) {
                                this._surrogateFirst = n;
                                continue
                            }
                            var y = t.charCodeAt(m);
                            56320 <= y && y <= 57343 ? (i = 1024 * (i - 55296) + y - 56320 + 65536,
                            n += t.charAt(m)) : m--
                        }
                        if (o = l.wcwidth(i),
                        c && (i = (n = c[n] || n).charCodeAt(0)),
                        h && this._terminal.emit("a11y.char", n),
                        o || !s.x) {
                            if (s.x + o - 1 >= u)
                                if (f)
                                    s.x = 0,
                                    s.y++,
                                    s.y > s.scrollBottom ? (s.y--,
                                    this._terminal.scroll(!0)) : s.lines.get(s.y).isWrapped = !0,
                                    _ = s.lines.get(s.y + s.ybase);
                                else if (2 === o)
                                    continue;
                            if (p)
                                _.insertCells(s.x, o, [d, a.NULL_CELL_CHAR, a.NULL_CELL_WIDTH, a.NULL_CELL_CODE]),
                                2 === _.get(u - 1)[a.CHAR_DATA_WIDTH_INDEX] && _.set(u - 1, [d, a.NULL_CELL_CHAR, a.NULL_CELL_WIDTH, a.NULL_CELL_CODE]);
                            if (_.set(s.x++, [d, n, o, i]),
                            0 < o)
                                for (; --o; )
                                    _.set(s.x++, [d, "", 0, void 0])
                        } else {
                            var g = _.get(s.x - 1);
                            if (g)
                                if (g[a.CHAR_DATA_WIDTH_INDEX])
                                    g[a.CHAR_DATA_CHAR_INDEX] += n,
                                    g[a.CHAR_DATA_CODE_INDEX] = i,
                                    _.set(s.x - 1, g);
                                else {
                                    var v = _.get(s.x - 2);
                                    v && (v[a.CHAR_DATA_CHAR_INDEX] += n,
                                    v[a.CHAR_DATA_CODE_INDEX] = i,
                                    _.set(s.x - 2, v))
                                }
                        }
                    }
                    this._terminal.updateRange(s.y)
                }
                ,
                e.prototype.addCsiHandler = function(t, e) {
                    return this._parser.addCsiHandler(t, e)
                }
                ,
                e.prototype.addOscHandler = function(t, e) {
                    return this._parser.addOscHandler(t, e)
                }
                ,
                e.prototype.bell = function() {
                    this._terminal.bell()
                }
                ,
                e.prototype.lineFeed = function() {
                    var t = this._terminal.buffer;
                    this._terminal.options.convertEol && (t.x = 0),
                    t.y++,
                    t.y > t.scrollBottom && (t.y--,
                    this._terminal.scroll()),
                    t.x >= this._terminal.cols && t.x--,
                    this._terminal.emit("linefeed")
                }
                ,
                e.prototype.carriageReturn = function() {
                    this._terminal.buffer.x = 0
                }
                ,
                e.prototype.backspace = function() {
                    0 < this._terminal.buffer.x && this._terminal.buffer.x--
                }
                ,
                e.prototype.tab = function() {
                    var t = this._terminal.buffer.x;
                    this._terminal.buffer.x = this._terminal.buffer.nextStop(),
                    this._terminal.options.screenReaderMode && this._terminal.emit("a11y.tab", this._terminal.buffer.x - t)
                }
                ,
                e.prototype.shiftOut = function() {
                    this._terminal.setgLevel(1)
                }
                ,
                e.prototype.shiftIn = function() {
                    this._terminal.setgLevel(0)
                }
                ,
                e.prototype.insertChars = function(t) {
                    this._terminal.buffer.lines.get(this._terminal.buffer.y + this._terminal.buffer.ybase).insertCells(this._terminal.buffer.x, t[0] || 1, [this._terminal.eraseAttr(), a.NULL_CELL_CHAR, a.NULL_CELL_WIDTH, a.NULL_CELL_CODE]),
                    this._terminal.updateRange(this._terminal.buffer.y)
                }
                ,
                e.prototype.cursorUp = function(t) {
                    var e = t[0];
                    e < 1 && (e = 1),
                    this._terminal.buffer.y -= e,
                    this._terminal.buffer.y < 0 && (this._terminal.buffer.y = 0)
                }
                ,
                e.prototype.cursorDown = function(t) {
                    var e = t[0];
                    e < 1 && (e = 1),
                    this._terminal.buffer.y += e,
                    this._terminal.buffer.y >= this._terminal.rows && (this._terminal.buffer.y = this._terminal.rows - 1),
                    this._terminal.buffer.x >= this._terminal.cols && this._terminal.buffer.x--
                }
                ,
                e.prototype.cursorForward = function(t) {
                    var e = t[0];
                    e < 1 && (e = 1),
                    this._terminal.buffer.x += e,
                    this._terminal.buffer.x >= this._terminal.cols && (this._terminal.buffer.x = this._terminal.cols - 1)
                }
                ,
                e.prototype.cursorBackward = function(t) {
                    var e = t[0];
                    e < 1 && (e = 1),
                    this._terminal.buffer.x >= this._terminal.cols && this._terminal.buffer.x--,
                    this._terminal.buffer.x -= e,
                    this._terminal.buffer.x < 0 && (this._terminal.buffer.x = 0)
                }
                ,
                e.prototype.cursorNextLine = function(t) {
                    var e = t[0];
                    e < 1 && (e = 1),
                    this._terminal.buffer.y += e,
                    this._terminal.buffer.y >= this._terminal.rows && (this._terminal.buffer.y = this._terminal.rows - 1),
                    this._terminal.buffer.x = 0
                }
                ,
                e.prototype.cursorPrecedingLine = function(t) {
                    var e = t[0];
                    e < 1 && (e = 1),
                    this._terminal.buffer.y -= e,
                    this._terminal.buffer.y < 0 && (this._terminal.buffer.y = 0),
                    this._terminal.buffer.x = 0
                }
                ,
                e.prototype.cursorCharAbsolute = function(t) {
                    var e = t[0];
                    e < 1 && (e = 1),
                    this._terminal.buffer.x = e - 1
                }
                ,
                e.prototype.cursorPosition = function(t) {
                    var e, r = t[0] - 1;
                    e = 2 <= t.length ? t[1] - 1 : 0,
                    r < 0 ? r = 0 : r >= this._terminal.rows && (r = this._terminal.rows - 1),
                    e < 0 ? e = 0 : e >= this._terminal.cols && (e = this._terminal.cols - 1),
                    this._terminal.buffer.x = e,
                    this._terminal.buffer.y = r
                }
                ,
                e.prototype.cursorForwardTab = function(t) {
                    for (var e = t[0] || 1; e--; )
                        this._terminal.buffer.x = this._terminal.buffer.nextStop()
                }
                ,
                e.prototype._eraseInBufferLine = function(t, e, r, n) {
                    void 0 === n && (n = !1);
                    var i = this._terminal.buffer.lines.get(this._terminal.buffer.ybase + t);
                    i.replaceCells(e, r, [this._terminal.eraseAttr(), a.NULL_CELL_CHAR, a.NULL_CELL_WIDTH, a.NULL_CELL_CODE]),
                    n && (i.isWrapped = !1)
                }
                ,
                e.prototype._resetBufferLine = function(t) {
                    this._eraseInBufferLine(t, 0, this._terminal.cols, !0)
                }
                ,
                e.prototype.eraseInDisplay = function(t) {
                    var e;
                    switch (t[0]) {
                    case 0:
                        for (e = this._terminal.buffer.y,
                        this._terminal.updateRange(e),
                        this._eraseInBufferLine(e++, this._terminal.buffer.x, this._terminal.cols, 0 === this._terminal.buffer.x); e < this._terminal.rows; e++)
                            this._resetBufferLine(e);
                        this._terminal.updateRange(e);
                        break;
                    case 1:
                        for (e = this._terminal.buffer.y,
                        this._terminal.updateRange(e),
                        this._eraseInBufferLine(e, 0, this._terminal.buffer.x + 1, !0),
                        this._terminal.buffer.x + 1 >= this._terminal.cols && (this._terminal.buffer.lines.get(e + 1).isWrapped = !1); e--; )
                            this._resetBufferLine(e);
                        this._terminal.updateRange(0);
                        break;
                    case 2:
                        for (e = this._terminal.rows,
                        this._terminal.updateRange(e - 1); e--; )
                            this._resetBufferLine(e);
                        this._terminal.updateRange(0);
                        break;
                    case 3:
                        var r = this._terminal.buffer.lines.length - this._terminal.rows;
                        0 < r && (this._terminal.buffer.lines.trimStart(r),
                        this._terminal.buffer.ybase = Math.max(this._terminal.buffer.ybase - r, 0),
                        this._terminal.buffer.ydisp = Math.max(this._terminal.buffer.ydisp - r, 0),
                        this._terminal.emit("scroll", 0))
                    }
                }
                ,
                e.prototype.eraseInLine = function(t) {
                    switch (t[0]) {
                    case 0:
                        this._eraseInBufferLine(this._terminal.buffer.y, this._terminal.buffer.x, this._terminal.cols);
                        break;
                    case 1:
                        this._eraseInBufferLine(this._terminal.buffer.y, 0, this._terminal.buffer.x + 1);
                        break;
                    case 2:
                        this._eraseInBufferLine(this._terminal.buffer.y, 0, this._terminal.cols)
                    }
                    this._terminal.updateRange(this._terminal.buffer.y)
                }
                ,
                e.prototype.insertLines = function(t) {
                    var e = t[0];
                    e < 1 && (e = 1);
                    for (var r = this._terminal.buffer, n = r.y + r.ybase, i = this._terminal.rows - 1 - r.scrollBottom, o = this._terminal.rows - 1 + r.ybase - i + 1; e--; )
                        r.lines.splice(o - 1, 1),
                        r.lines.splice(n, 0, r.getBlankLine(this._terminal.eraseAttr()));
                    this._terminal.updateRange(r.y),
                    this._terminal.updateRange(r.scrollBottom)
                }
                ,
                e.prototype.deleteLines = function(t) {
                    var e = t[0];
                    e < 1 && (e = 1);
                    var r, n = this._terminal.buffer, i = n.y + n.ybase;
                    for (r = this._terminal.rows - 1 - n.scrollBottom,
                    r = this._terminal.rows - 1 + n.ybase - r; e--; )
                        n.lines.splice(i, 1),
                        n.lines.splice(r, 0, n.getBlankLine(this._terminal.eraseAttr()));
                    this._terminal.updateRange(n.y),
                    this._terminal.updateRange(n.scrollBottom)
                }
                ,
                e.prototype.deleteChars = function(t) {
                    this._terminal.buffer.lines.get(this._terminal.buffer.y + this._terminal.buffer.ybase).deleteCells(this._terminal.buffer.x, t[0] || 1, [this._terminal.eraseAttr(), a.NULL_CELL_CHAR, a.NULL_CELL_WIDTH, a.NULL_CELL_CODE]),
                    this._terminal.updateRange(this._terminal.buffer.y)
                }
                ,
                e.prototype.scrollUp = function(t) {
                    for (var e = t[0] || 1, r = this._terminal.buffer; e--; )
                        r.lines.splice(r.ybase + r.scrollTop, 1),
                        r.lines.splice(r.ybase + r.scrollBottom, 0, r.getBlankLine(a.DEFAULT_ATTR));
                    this._terminal.updateRange(r.scrollTop),
                    this._terminal.updateRange(r.scrollBottom)
                }
                ,
                e.prototype.scrollDown = function(t, e) {
                    if (t.length < 2 && !e) {
                        for (var r = t[0] || 1, n = this._terminal.buffer; r--; )
                            n.lines.splice(n.ybase + n.scrollBottom, 1),
                            n.lines.splice(n.ybase + n.scrollBottom, 0, n.getBlankLine(a.DEFAULT_ATTR));
                        this._terminal.updateRange(n.scrollTop),
                        this._terminal.updateRange(n.scrollBottom)
                    }
                }
                ,
                e.prototype.eraseChars = function(t) {
                    this._terminal.buffer.lines.get(this._terminal.buffer.y + this._terminal.buffer.ybase).replaceCells(this._terminal.buffer.x, this._terminal.buffer.x + (t[0] || 1), [this._terminal.eraseAttr(), a.NULL_CELL_CHAR, a.NULL_CELL_WIDTH, a.NULL_CELL_CODE])
                }
                ,
                e.prototype.cursorBackwardTab = function(t) {
                    for (var e = t[0] || 1, r = this._terminal.buffer; e--; )
                        r.x = r.prevStop()
                }
                ,
                e.prototype.charPosAbsolute = function(t) {
                    var e = t[0];
                    e < 1 && (e = 1),
                    this._terminal.buffer.x = e - 1,
                    this._terminal.buffer.x >= this._terminal.cols && (this._terminal.buffer.x = this._terminal.cols - 1)
                }
                ,
                e.prototype.hPositionRelative = function(t) {
                    var e = t[0];
                    e < 1 && (e = 1),
                    this._terminal.buffer.x += e,
                    this._terminal.buffer.x >= this._terminal.cols && (this._terminal.buffer.x = this._terminal.cols - 1)
                }
                ,
                e.prototype.repeatPrecedingCharacter = function(t) {
                    var e = this._terminal.buffer
                      , r = e.lines.get(e.ybase + e.y);
                    r.replaceCells(e.x, e.x + (t[0] || 1), r.get(e.x - 1) || [a.DEFAULT_ATTR, a.NULL_CELL_CHAR, a.NULL_CELL_WIDTH, a.NULL_CELL_CODE])
                }
                ,
                e.prototype.sendDeviceAttributes = function(t, e) {
                    0 < t[0] || (e ? ">" === e && (this._terminal.is("xterm") ? this._terminal.handler(o.C0.ESC + "[>0;276;0c") : this._terminal.is("rxvt-unicode") ? this._terminal.handler(o.C0.ESC + "[>85;95;0c") : this._terminal.is("linux") ? this._terminal.handler(t[0] + "c") : this._terminal.is("screen") && this._terminal.handler(o.C0.ESC + "[>83;40003;0c")) : this._terminal.is("xterm") || this._terminal.is("rxvt-unicode") || this._terminal.is("screen") ? this._terminal.handler(o.C0.ESC + "[?1;2c") : this._terminal.is("linux") && this._terminal.handler(o.C0.ESC + "[?6c"))
                }
                ,
                e.prototype.linePosAbsolute = function(t) {
                    var e = t[0];
                    e < 1 && (e = 1),
                    this._terminal.buffer.y = e - 1,
                    this._terminal.buffer.y >= this._terminal.rows && (this._terminal.buffer.y = this._terminal.rows - 1)
                }
                ,
                e.prototype.vPositionRelative = function(t) {
                    var e = t[0];
                    e < 1 && (e = 1),
                    this._terminal.buffer.y += e,
                    this._terminal.buffer.y >= this._terminal.rows && (this._terminal.buffer.y = this._terminal.rows - 1),
                    this._terminal.buffer.x >= this._terminal.cols && this._terminal.buffer.x--
                }
                ,
                e.prototype.hVPosition = function(t) {
                    t[0] < 1 && (t[0] = 1),
                    t[1] < 1 && (t[1] = 1),
                    this._terminal.buffer.y = t[0] - 1,
                    this._terminal.buffer.y >= this._terminal.rows && (this._terminal.buffer.y = this._terminal.rows - 1),
                    this._terminal.buffer.x = t[1] - 1,
                    this._terminal.buffer.x >= this._terminal.cols && (this._terminal.buffer.x = this._terminal.cols - 1)
                }
                ,
                e.prototype.tabClear = function(t) {
                    var e = t[0];
                    e <= 0 ? delete this._terminal.buffer.tabs[this._terminal.buffer.x] : 3 === e && (this._terminal.buffer.tabs = {})
                }
                ,
                e.prototype.setMode = function(t, e) {
                    if (1 < t.length)
                        for (var r = 0; r < t.length; r++)
                            this.setMode([t[r]]);
                    else if (e) {
                        if ("?" === e)
                            switch (t[0]) {
                            case 1:
                                this._terminal.applicationCursor = !0;
                                break;
                            case 2:
                                this._terminal.setgCharset(0, s.DEFAULT_CHARSET),
                                this._terminal.setgCharset(1, s.DEFAULT_CHARSET),
                                this._terminal.setgCharset(2, s.DEFAULT_CHARSET),
                                this._terminal.setgCharset(3, s.DEFAULT_CHARSET);
                                break;
                            case 3:
                                this._terminal.savedCols = this._terminal.cols,
                                this._terminal.resize(132, this._terminal.rows);
                                break;
                            case 6:
                                this._terminal.originMode = !0;
                                break;
                            case 7:
                                this._terminal.wraparoundMode = !0;
                                break;
                            case 12:
                                break;
                            case 66:
                                this._terminal.log("Serial port requested application keypad."),
                                this._terminal.applicationKeypad = !0,
                                this._terminal.viewport && this._terminal.viewport.syncScrollArea();
                                break;
                            case 9:
                            case 1e3:
                            case 1002:
                            case 1003:
                                this._terminal.x10Mouse = 9 === t[0],
                                this._terminal.vt200Mouse = 1e3 === t[0],
                                this._terminal.normalMouse = 1e3 < t[0],
                                this._terminal.mouseEvents = !0,
                                this._terminal.element.classList.add("enable-mouse-events"),
                                this._terminal.selectionManager.disable(),
                                this._terminal.log("Binding to mouse events.");
                                break;
                            case 1004:
                                this._terminal.sendFocus = !0;
                                break;
                            case 1005:
                                this._terminal.utfMouse = !0;
                                break;
                            case 1006:
                                this._terminal.sgrMouse = !0;
                                break;
                            case 1015:
                                this._terminal.urxvtMouse = !0;
                                break;
                            case 25:
                                this._terminal.cursorHidden = !1;
                                break;
                            case 1048:
                                this.saveCursor(t);
                                break;
                            case 1049:
                                this.saveCursor(t);
                            case 47:
                            case 1047:
                                this._terminal.buffers.activateAltBuffer(this._terminal.eraseAttr()),
                                this._terminal.refresh(0, this._terminal.rows - 1),
                                this._terminal.viewport && this._terminal.viewport.syncScrollArea(),
                                this._terminal.showCursor();
                                break;
                            case 2004:
                                this._terminal.bracketedPasteMode = !0
                            }
                    } else
                        switch (t[0]) {
                        case 4:
                            this._terminal.insertMode = !0
                        }
                }
                ,
                e.prototype.resetMode = function(t, e) {
                    if (1 < t.length)
                        for (var r = 0; r < t.length; r++)
                            this.resetMode([t[r]]);
                    else if (e) {
                        if ("?" === e)
                            switch (t[0]) {
                            case 1:
                                this._terminal.applicationCursor = !1;
                                break;
                            case 3:
                                132 === this._terminal.cols && this._terminal.savedCols && this._terminal.resize(this._terminal.savedCols, this._terminal.rows),
                                delete this._terminal.savedCols;
                                break;
                            case 6:
                                this._terminal.originMode = !1;
                                break;
                            case 7:
                                this._terminal.wraparoundMode = !1;
                                break;
                            case 12:
                                break;
                            case 66:
                                this._terminal.log("Switching back to normal keypad."),
                                this._terminal.applicationKeypad = !1,
                                this._terminal.viewport && this._terminal.viewport.syncScrollArea();
                                break;
                            case 9:
                            case 1e3:
                            case 1002:
                            case 1003:
                                this._terminal.x10Mouse = !1,
                                this._terminal.vt200Mouse = !1,
                                this._terminal.normalMouse = !1,
                                this._terminal.mouseEvents = !1,
                                this._terminal.element.classList.remove("enable-mouse-events"),
                                this._terminal.selectionManager.enable();
                                break;
                            case 1004:
                                this._terminal.sendFocus = !1;
                                break;
                            case 1005:
                                this._terminal.utfMouse = !1;
                                break;
                            case 1006:
                                this._terminal.sgrMouse = !1;
                                break;
                            case 1015:
                                this._terminal.urxvtMouse = !1;
                                break;
                            case 25:
                                this._terminal.cursorHidden = !0;
                                break;
                            case 1048:
                                this.restoreCursor(t);
                                break;
                            case 1049:
                            case 47:
                            case 1047:
                                this._terminal.buffers.activateNormalBuffer(),
                                1049 === t[0] && this.restoreCursor(t),
                                this._terminal.refresh(0, this._terminal.rows - 1),
                                this._terminal.viewport && this._terminal.viewport.syncScrollArea(),
                                this._terminal.showCursor();
                                break;
                            case 2004:
                                this._terminal.bracketedPasteMode = !1
                            }
                    } else
                        switch (t[0]) {
                        case 4:
                            this._terminal.insertMode = !1
                        }
                }
                ,
                e.prototype.charAttributes = function(t) {
                    if (1 !== t.length || 0 !== t[0]) {
                        for (var e, r = t.length, n = this._terminal.curAttr >> 18, i = this._terminal.curAttr >> 9 & 511, o = 511 & this._terminal.curAttr, s = 0; s < r; s++)
                            30 <= (e = t[s]) && e <= 37 ? i = e - 30 : 40 <= e && e <= 47 ? o = e - 40 : 90 <= e && e <= 97 ? i = (e += 8) - 90 : 100 <= e && e <= 107 ? o = (e += 8) - 100 : 0 === e ? (n = a.DEFAULT_ATTR >> 18,
                            i = a.DEFAULT_ATTR >> 9 & 511,
                            o = 511 & a.DEFAULT_ATTR) : 1 === e ? n |= 1 : 3 === e ? n |= 64 : 4 === e ? n |= 2 : 5 === e ? n |= 4 : 7 === e ? n |= 8 : 8 === e ? n |= 16 : 2 === e ? n |= 32 : 22 === e ? (n &= -2,
                            n &= -33) : 23 === e ? n &= -65 : 24 === e ? n &= -3 : 25 === e ? n &= -5 : 27 === e ? n &= -9 : 28 === e ? n &= -17 : 39 === e ? i = a.DEFAULT_ATTR >> 9 & 511 : 49 === e ? o = 511 & a.DEFAULT_ATTR : 38 === e ? 2 === t[s + 1] ? (s += 2,
                            -1 === (i = this._terminal.matchColor(255 & t[s], 255 & t[s + 1], 255 & t[s + 2])) && (i = 511),
                            s += 2) : 5 === t[s + 1] && (i = e = 255 & t[s += 2]) : 48 === e ? 2 === t[s + 1] ? (s += 2,
                            -1 === (o = this._terminal.matchColor(255 & t[s], 255 & t[s + 1], 255 & t[s + 2])) && (o = 511),
                            s += 2) : 5 === t[s + 1] && (o = e = 255 & t[s += 2]) : 100 === e ? (i = a.DEFAULT_ATTR >> 9 & 511,
                            o = 511 & a.DEFAULT_ATTR) : this._terminal.error("Unknown SGR attribute: %d.", e);
                        this._terminal.curAttr = n << 18 | i << 9 | o
                    } else
                        this._terminal.curAttr = a.DEFAULT_ATTR
                }
                ,
                e.prototype.deviceStatus = function(t, e) {
                    if (e) {
                        if ("?" === e)
                            switch (t[0]) {
                            case 6:
                                var r = this._terminal.buffer.y + 1
                                  , n = this._terminal.buffer.x + 1;
                                this._terminal.emit("data", o.C0.ESC + "[?" + r + ";" + n + "R")
                            }
                    } else
                        switch (t[0]) {
                        case 5:
                            this._terminal.emit("data", o.C0.ESC + "[0n");
                            break;
                        case 6:
                            r = this._terminal.buffer.y + 1,
                            n = this._terminal.buffer.x + 1;
                            this._terminal.emit("data", o.C0.ESC + "[" + r + ";" + n + "R")
                        }
                }
                ,
                e.prototype.softReset = function(t, e) {
                    "!" === e && (this._terminal.cursorHidden = !1,
                    this._terminal.insertMode = !1,
                    this._terminal.originMode = !1,
                    this._terminal.wraparoundMode = !0,
                    this._terminal.applicationKeypad = !1,
                    this._terminal.viewport && this._terminal.viewport.syncScrollArea(),
                    this._terminal.applicationCursor = !1,
                    this._terminal.buffer.scrollTop = 0,
                    this._terminal.buffer.scrollBottom = this._terminal.rows - 1,
                    this._terminal.curAttr = a.DEFAULT_ATTR,
                    this._terminal.buffer.x = this._terminal.buffer.y = 0,
                    this._terminal.charset = null,
                    this._terminal.glevel = 0,
                    this._terminal.charsets = [null])
                }
                ,
                e.prototype.setCursorStyle = function(t, e) {
                    if (" " === e) {
                        var r = t[0] < 1 ? 1 : t[0];
                        switch (r) {
                        case 1:
                        case 2:
                            this._terminal.setOption("cursorStyle", "block");
                            break;
                        case 3:
                        case 4:
                            this._terminal.setOption("cursorStyle", "underline");
                            break;
                        case 5:
                        case 6:
                            this._terminal.setOption("cursorStyle", "bar")
                        }
                        var n = r % 2 == 1;
                        this._terminal.setOption("cursorBlink", n)
                    }
                }
                ,
                e.prototype.setScrollRegion = function(t, e) {
                    e || (this._terminal.buffer.scrollTop = (t[0] || 1) - 1,
                    this._terminal.buffer.scrollBottom = (t[1] && t[1] <= this._terminal.rows ? t[1] : this._terminal.rows) - 1,
                    this._terminal.buffer.x = 0,
                    this._terminal.buffer.y = 0)
                }
                ,
                e.prototype.saveCursor = function(t) {
                    this._terminal.buffer.savedX = this._terminal.buffer.x,
                    this._terminal.buffer.savedY = this._terminal.buffer.y,
                    this._terminal.buffer.savedCurAttr = this._terminal.curAttr
                }
                ,
                e.prototype.restoreCursor = function(t) {
                    this._terminal.buffer.x = this._terminal.buffer.savedX || 0,
                    this._terminal.buffer.y = this._terminal.buffer.savedY || 0,
                    this._terminal.curAttr = this._terminal.buffer.savedCurAttr || a.DEFAULT_ATTR
                }
                ,
                e.prototype.setTitle = function(t) {
                    this._terminal.handleTitle(t)
                }
                ,
                e.prototype.nextLine = function() {
                    this._terminal.buffer.x = 0,
                    this.index()
                }
                ,
                e.prototype.keypadApplicationMode = function() {
                    this._terminal.log("Serial port requested application keypad."),
                    this._terminal.applicationKeypad = !0,
                    this._terminal.viewport && this._terminal.viewport.syncScrollArea()
                }
                ,
                e.prototype.keypadNumericMode = function() {
                    this._terminal.log("Switching back to normal keypad."),
                    this._terminal.applicationKeypad = !1,
                    this._terminal.viewport && this._terminal.viewport.syncScrollArea()
                }
                ,
                e.prototype.selectDefaultCharset = function() {
                    this._terminal.setgLevel(0),
                    this._terminal.setgCharset(0, s.DEFAULT_CHARSET)
                }
                ,
                e.prototype.selectCharset = function(t) {
                    if (2 !== t.length)
                        return this.selectDefaultCharset();
                    "/" !== t[0] && this._terminal.setgCharset(u[t[0]], s.CHARSETS[t[1]] || s.DEFAULT_CHARSET)
                }
                ,
                e.prototype.index = function() {
                    this._terminal.index()
                }
                ,
                e.prototype.tabSet = function() {
                    this._terminal.tabSet()
                }
                ,
                e.prototype.reverseIndex = function() {
                    this._terminal.reverseIndex()
                }
                ,
                e.prototype.reset = function() {
                    this._parser.reset(),
                    this._terminal.reset()
                }
                ,
                e.prototype.setgLevel = function(t) {
                    this._terminal.setgLevel(t)
                }
                ,
                e
            }(h.Disposable);
            r.InputHandler = p
        }
        , {
            "./Buffer": 2,
            "./CharWidth": 5,
            "./EscapeSequenceParser": 7,
            "./common/Lifecycle": 19,
            "./common/data/EscapeSequences": 21,
            "./core/data/Charsets": 23
        }],
        9: [function(t, e, r) {
            "use strict";
            var n, i = this && this.__extends || (n = function(t, e) {
                return (n = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(t, e) {
                    t.__proto__ = e
                }
                || function(t, e) {
                    for (var r in e)
                        e.hasOwnProperty(r) && (t[r] = e[r])
                }
                )(t, e)
            }
            ,
            function(t, e) {
                function r() {
                    this.constructor = t
                }
                n(t, e),
                t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype,
                new r)
            }
            );
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = t("./ui/MouseZoneManager")
              , s = t("./common/EventEmitter")
              , a = t("./Buffer")
              , l = t("./CharWidth")
              , c = function(t) {
                function e(e) {
                    var r = t.call(this) || this;
                    return r._terminal = e,
                    r._linkMatchers = [],
                    r._nextLinkMatcherId = 0,
                    r._rowsToLinkify = {
                        start: null,
                        end: null
                    },
                    r
                }
                return i(e, t),
                e.prototype.attachToDom = function(t) {
                    this._mouseZoneManager = t
                }
                ,
                e.prototype.linkifyRows = function(t, r) {
                    var n = this;
                    this._mouseZoneManager && (null === this._rowsToLinkify.start ? (this._rowsToLinkify.start = t,
                    this._rowsToLinkify.end = r) : (this._rowsToLinkify.start = Math.min(this._rowsToLinkify.start, t),
                    this._rowsToLinkify.end = Math.max(this._rowsToLinkify.end, r)),
                    this._mouseZoneManager.clearAll(t, r),
                    this._rowsTimeoutId && clearTimeout(this._rowsTimeoutId),
                    this._rowsTimeoutId = setTimeout(function() {
                        return n._linkifyRows()
                    }, e.TIME_BEFORE_LINKIFY))
                }
                ,
                e.prototype._linkifyRows = function() {
                    this._rowsTimeoutId = null;
                    var t = this._terminal.buffer
                      , r = t.ydisp + this._rowsToLinkify.start;
                    if (!(r >= t.lines.length)) {
                        for (var n = t.ydisp + Math.min(this._rowsToLinkify.end, this._terminal.rows) + 1, i = Math.ceil(e.OVERSCAN_CHAR_LIMIT / this._terminal.cols), o = this._terminal.buffer.iterator(!1, r, n, i, i); o.hasNext(); )
                            for (var s = o.next(), a = 0; a < this._linkMatchers.length; a++)
                                this._doLinkifyRow(s.range.first, s.content, this._linkMatchers[a]);
                        this._rowsToLinkify.start = null,
                        this._rowsToLinkify.end = null
                    }
                }
                ,
                e.prototype.registerLinkMatcher = function(t, e, r) {
                    if (void 0 === r && (r = {}),
                    !e)
                        throw new Error("handler must be defined");
                    var n = {
                        id: this._nextLinkMatcherId++,
                        regex: t,
                        handler: e,
                        matchIndex: r.matchIndex,
                        validationCallback: r.validationCallback,
                        hoverTooltipCallback: r.tooltipCallback,
                        hoverLeaveCallback: r.leaveCallback,
                        willLinkActivate: r.willLinkActivate,
                        priority: r.priority || 0
                    };
                    return this._addLinkMatcherToList(n),
                    n.id
                }
                ,
                e.prototype._addLinkMatcherToList = function(t) {
                    if (0 !== this._linkMatchers.length) {
                        for (var e = this._linkMatchers.length - 1; 0 <= e; e--)
                            if (t.priority <= this._linkMatchers[e].priority)
                                return void this._linkMatchers.splice(e + 1, 0, t);
                        this._linkMatchers.splice(0, 0, t)
                    } else
                        this._linkMatchers.push(t)
                }
                ,
                e.prototype.deregisterLinkMatcher = function(t) {
                    for (var e = 0; e < this._linkMatchers.length; e++)
                        if (this._linkMatchers[e].id === t)
                            return this._linkMatchers.splice(e, 1),
                            !0;
                    return !1
                }
                ,
                e.prototype._doLinkifyRow = function(t, e, r) {
                    for (var n, i = this, o = new RegExp(r.regex.source,r.regex.flags + "g"), s = -1, l = function() {
                        var l = n["number" != typeof r.matchIndex ? 0 : r.matchIndex];
                        if (!l) {
                            if (c._terminal.debug)
                                throw console.log({
                                    match: n,
                                    matcher: r
                                }),
                                new Error("match found without corresponding matchIndex");
                            return "break"
                        }
                        if (s = e.indexOf(l, s + 1),
                        o.lastIndex = s + l.length,
                        s < 0)
                            return "break";
                        var h = c._terminal.buffer.stringIndexToBufferIndex(t, s);
                        if (h[0] < 0)
                            return "break";
                        var u, f = c._terminal.buffer.lines.get(h[0]).get(h[1]);
                        if (f) {
                            var p = f[a.CHAR_DATA_ATTR_INDEX];
                            u = p >> 9 & 511
                        }
                        r.validationCallback ? r.validationCallback(l, function(t) {
                            i._rowsTimeoutId || t && i._addLink(h[1], h[0] - i._terminal.buffer.ydisp, l, r, u)
                        }) : c._addLink(h[1], h[0] - c._terminal.buffer.ydisp, l, r, u)
                    }, c = this; null !== (n = o.exec(e)); ) {
                        if ("break" === l())
                            break
                    }
                }
                ,
                e.prototype._addLink = function(t, e, r, n, i) {
                    var s = this
                      , a = l.getStringCellWidth(r)
                      , c = t % this._terminal.cols
                      , h = e + Math.floor(t / this._terminal.cols)
                      , u = (c + a) % this._terminal.cols
                      , f = h + Math.floor((c + a) / this._terminal.cols);
                    0 === u && (u = this._terminal.cols,
                    f--),
                    this._mouseZoneManager.add(new o.MouseZone(c + 1,h + 1,u + 1,f + 1,function(t) {
                        if (n.handler)
                            return n.handler(t, r);
                        window.open(r, "_blank")
                    }
                    ,function(t) {
                        s.emit("linkhover", s._createLinkHoverEvent(c, h, u, f, i)),
                        s._terminal.element.classList.add("xterm-cursor-pointer")
                    }
                    ,function(t) {
                        s.emit("linktooltip", s._createLinkHoverEvent(c, h, u, f, i)),
                        n.hoverTooltipCallback && n.hoverTooltipCallback(t, r)
                    }
                    ,function() {
                        s.emit("linkleave", s._createLinkHoverEvent(c, h, u, f, i)),
                        s._terminal.element.classList.remove("xterm-cursor-pointer"),
                        n.hoverLeaveCallback && n.hoverLeaveCallback()
                    }
                    ,function(t) {
                        return !n.willLinkActivate || n.willLinkActivate(t, r)
                    }
                    ))
                }
                ,
                e.prototype._createLinkHoverEvent = function(t, e, r, n, i) {
                    return {
                        x1: t,
                        y1: e,
                        x2: r,
                        y2: n,
                        cols: this._terminal.cols,
                        fg: i
                    }
                }
                ,
                e.TIME_BEFORE_LINKIFY = 200,
                e.OVERSCAN_CHAR_LIMIT = 2e3,
                e
            }(s.EventEmitter);
            r.Linkifier = c
        }
        , {
            "./Buffer": 2,
            "./CharWidth": 5,
            "./common/EventEmitter": 18,
            "./ui/MouseZoneManager": 51
        }],
        10: [function(t, e, r) {
            "use strict";
            var n, i = this && this.__extends || (n = function(t, e) {
                return (n = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(t, e) {
                    t.__proto__ = e
                }
                || function(t, e) {
                    for (var r in e)
                        e.hasOwnProperty(r) && (t[r] = e[r])
                }
                )(t, e)
            }
            ,
            function(t, e) {
                function r() {
                    this.constructor = t
                }
                n(t, e),
                t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype,
                new r)
            }
            );
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = t("./ui/MouseHelper")
              , s = t("./core/Platform")
              , a = t("./common/EventEmitter")
              , l = t("./SelectionModel")
              , c = t("./Buffer")
              , h = t("./handlers/AltClickHandler")
              , u = String.fromCharCode(160)
              , f = new RegExp(u,"g")
              , p = function(t) {
                function e(e, r) {
                    var n = t.call(this) || this;
                    return n._terminal = e,
                    n._charMeasure = r,
                    n._enabled = !0,
                    n._initListeners(),
                    n.enable(),
                    n._model = new l.SelectionModel(e),
                    n._activeSelectionMode = 0,
                    n
                }
                return i(e, t),
                e.prototype.dispose = function() {
                    t.prototype.dispose.call(this),
                    this._removeMouseDownListeners()
                }
                ,
                Object.defineProperty(e.prototype, "_buffer", {
                    get: function() {
                        return this._terminal.buffers.active
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                e.prototype._initListeners = function() {
                    var t = this;
                    this._mouseMoveListener = function(e) {
                        return t._onMouseMove(e)
                    }
                    ,
                    this._mouseUpListener = function(e) {
                        return t._onMouseUp(e)
                    }
                    ,
                    this._trimListener = function(e) {
                        return t._onTrim(e)
                    }
                    ,
                    this.initBuffersListeners()
                }
                ,
                e.prototype.initBuffersListeners = function() {
                    var t = this;
                    this._terminal.buffer.lines.on("trim", this._trimListener),
                    this._terminal.buffers.on("activate", function(e) {
                        return t._onBufferActivate(e)
                    })
                }
                ,
                e.prototype.disable = function() {
                    this.clearSelection(),
                    this._enabled = !1
                }
                ,
                e.prototype.enable = function() {
                    this._enabled = !0
                }
                ,
                Object.defineProperty(e.prototype, "selectionStart", {
                    get: function() {
                        return this._model.finalSelectionStart
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(e.prototype, "selectionEnd", {
                    get: function() {
                        return this._model.finalSelectionEnd
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(e.prototype, "hasSelection", {
                    get: function() {
                        var t = this._model.finalSelectionStart
                          , e = this._model.finalSelectionEnd;
                        return !(!t || !e || t[0] === e[0] && t[1] === e[1])
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(e.prototype, "selectionText", {
                    get: function() {
                        var t = this._model.finalSelectionStart
                          , e = this._model.finalSelectionEnd;
                        if (!t || !e)
                            return "";
                        var r = [];
                        if (3 === this._activeSelectionMode) {
                            if (t[0] === e[0])
                                return "";
                            for (var n = t[1]; n <= e[1]; n++) {
                                var i = this._buffer.translateBufferLineToString(n, !0, t[0], e[0]);
                                r.push(i)
                            }
                        } else {
                            var o = t[1] === e[1] ? e[0] : void 0;
                            r.push(this._buffer.translateBufferLineToString(t[1], !0, t[0], o));
                            for (n = t[1] + 1; n <= e[1] - 1; n++) {
                                var a = this._buffer.lines.get(n);
                                i = this._buffer.translateBufferLineToString(n, !0);
                                a.isWrapped ? r[r.length - 1] += i : r.push(i)
                            }
                            if (t[1] !== e[1]) {
                                a = this._buffer.lines.get(e[1]),
                                i = this._buffer.translateBufferLineToString(e[1], !0, 0, e[0]);
                                a.isWrapped ? r[r.length - 1] += i : r.push(i)
                            }
                        }
                        return r.map(function(t) {
                            return t.replace(f, " ")
                        }).join(s.isMSWindows ? "\r\n" : "\n")
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                e.prototype.clearSelection = function() {
                    this._model.clearSelection(),
                    this._removeMouseDownListeners(),
                    this.refresh()
                }
                ,
                e.prototype.refresh = function(t) {
                    var e = this;
                    (this._refreshAnimationFrame || (this._refreshAnimationFrame = window.requestAnimationFrame(function() {
                        return e._refresh()
                    })),
                    s.isLinux && t) && (this.selectionText.length && this.emit("newselection", this.selectionText))
                }
                ,
                e.prototype._refresh = function() {
                    this._refreshAnimationFrame = null,
                    this.emit("refresh", {
                        start: this._model.finalSelectionStart,
                        end: this._model.finalSelectionEnd,
                        columnSelectMode: 3 === this._activeSelectionMode
                    })
                }
                ,
                e.prototype.isClickInSelection = function(t) {
                    var e = this._getMouseBufferCoords(t)
                      , r = this._model.finalSelectionStart
                      , n = this._model.finalSelectionEnd;
                    return !(!r || !n) && this._areCoordsInSelection(e, r, n)
                }
                ,
                e.prototype._areCoordsInSelection = function(t, e, r) {
                    return t[1] > e[1] && t[1] < r[1] || e[1] === r[1] && t[1] === e[1] && t[0] >= e[0] && t[0] < r[0] || e[1] < r[1] && t[1] === r[1] && t[0] < r[0] || e[1] < r[1] && t[1] === e[1] && t[0] >= e[0]
                }
                ,
                e.prototype.selectWordAtCursor = function(t) {
                    var e = this._getMouseBufferCoords(t);
                    e && (this._selectWordAt(e, !1),
                    this._model.selectionEnd = null,
                    this.refresh(!0))
                }
                ,
                e.prototype.selectAll = function() {
                    this._model.isSelectAllActive = !0,
                    this.refresh(),
                    this._terminal.emit("selection")
                }
                ,
                e.prototype.selectLines = function(t, e) {
                    this._model.clearSelection(),
                    t = Math.max(t, 0),
                    e = Math.min(e, this._terminal.buffer.lines.length - 1),
                    this._model.selectionStart = [0, t],
                    this._model.selectionEnd = [this._terminal.cols, e],
                    this.refresh(),
                    this._terminal.emit("selection")
                }
                ,
                e.prototype._onTrim = function(t) {
                    this._model.onTrim(t) && this.refresh()
                }
                ,
                e.prototype._getMouseBufferCoords = function(t) {
                    var e = this._terminal.mouseHelper.getCoords(t, this._terminal.screenElement, this._charMeasure, this._terminal.cols, this._terminal.rows, !0);
                    return e ? (e[0]--,
                    e[1]--,
                    e[1] += this._terminal.buffer.ydisp,
                    e) : null
                }
                ,
                e.prototype._getMouseEventScrollAmount = function(t) {
                    var e = o.MouseHelper.getCoordsRelativeToElement(t, this._terminal.screenElement)[1]
                      , r = this._terminal.rows * Math.ceil(this._charMeasure.height * this._terminal.options.lineHeight);
                    return 0 <= e && e <= r ? 0 : (r < e && (e -= r),
                    e = Math.min(Math.max(e, -50), 50),
                    (e /= 50) / Math.abs(e) + Math.round(14 * e))
                }
                ,
                e.prototype.shouldForceSelection = function(t) {
                    return s.isMac ? t.altKey && this._terminal.options.macOptionClickForcesSelection : t.shiftKey
                }
                ,
                e.prototype.onMouseDown = function(t) {
                    if (this._mouseDownTimeStamp = t.timeStamp,
                    (2 !== t.button || !this.hasSelection) && 0 === t.button) {
                        if (!this._enabled) {
                            if (!this.shouldForceSelection(t))
                                return;
                            t.stopPropagation()
                        }
                        t.preventDefault(),
                        this._dragScrollAmount = 0,
                        this._enabled && t.shiftKey ? this._onIncrementalClick(t) : 1 === t.detail ? this._onSingleClick(t) : 2 === t.detail ? this._onDoubleClick(t) : 3 === t.detail && this._onTripleClick(t),
                        this._addMouseDownListeners(),
                        this.refresh(!0)
                    }
                }
                ,
                e.prototype._addMouseDownListeners = function() {
                    var t = this;
                    this._terminal.element.ownerDocument.addEventListener("mousemove", this._mouseMoveListener),
                    this._terminal.element.ownerDocument.addEventListener("mouseup", this._mouseUpListener),
                    this._dragScrollIntervalTimer = setInterval(function() {
                        return t._dragScroll()
                    }, 50)
                }
                ,
                e.prototype._removeMouseDownListeners = function() {
                    this._terminal.element.ownerDocument && (this._terminal.element.ownerDocument.removeEventListener("mousemove", this._mouseMoveListener),
                    this._terminal.element.ownerDocument.removeEventListener("mouseup", this._mouseUpListener)),
                    clearInterval(this._dragScrollIntervalTimer),
                    this._dragScrollIntervalTimer = null
                }
                ,
                e.prototype._onIncrementalClick = function(t) {
                    this._model.selectionStart && (this._model.selectionEnd = this._getMouseBufferCoords(t))
                }
                ,
                e.prototype._onSingleClick = function(t) {
                    if (this._model.selectionStartLength = 0,
                    this._model.isSelectAllActive = !1,
                    this._activeSelectionMode = this.shouldColumnSelect(t) ? 3 : 0,
                    this._model.selectionStart = this._getMouseBufferCoords(t),
                    this._model.selectionStart) {
                        this._model.selectionEnd = null;
                        var e = this._buffer.lines.get(this._model.selectionStart[1]);
                        if (e && !(e.length >= this._model.selectionStart[0]))
                            0 === e.get(this._model.selectionStart[0])[c.CHAR_DATA_WIDTH_INDEX] && this._model.selectionStart[0]++
                    }
                }
                ,
                e.prototype._onDoubleClick = function(t) {
                    var e = this._getMouseBufferCoords(t);
                    e && (this._activeSelectionMode = 1,
                    this._selectWordAt(e, !0))
                }
                ,
                e.prototype._onTripleClick = function(t) {
                    var e = this._getMouseBufferCoords(t);
                    e && (this._activeSelectionMode = 2,
                    this._selectLineAt(e[1]))
                }
                ,
                e.prototype.shouldColumnSelect = function(t) {
                    return t.altKey && !(s.isMac && this._terminal.options.macOptionClickForcesSelection)
                }
                ,
                e.prototype._onMouseMove = function(t) {
                    t.stopImmediatePropagation();
                    var e = this._model.selectionEnd ? [this._model.selectionEnd[0], this._model.selectionEnd[1]] : null;
                    if (this._model.selectionEnd = this._getMouseBufferCoords(t),
                    this._model.selectionEnd) {
                        if (2 === this._activeSelectionMode ? this._model.selectionEnd[1] < this._model.selectionStart[1] ? this._model.selectionEnd[0] = 0 : this._model.selectionEnd[0] = this._terminal.cols : 1 === this._activeSelectionMode && this._selectToWordAt(this._model.selectionEnd),
                        this._dragScrollAmount = this._getMouseEventScrollAmount(t),
                        3 !== this._activeSelectionMode && (0 < this._dragScrollAmount ? this._model.selectionEnd[0] = this._terminal.cols : this._dragScrollAmount < 0 && (this._model.selectionEnd[0] = 0)),
                        this._model.selectionEnd[1] < this._buffer.lines.length) {
                            var r = this._buffer.lines.get(this._model.selectionEnd[1]).get(this._model.selectionEnd[0]);
                            r && 0 === r[c.CHAR_DATA_WIDTH_INDEX] && this._model.selectionEnd[0]++
                        }
                        e && e[0] === this._model.selectionEnd[0] && e[1] === this._model.selectionEnd[1] || this.refresh(!0)
                    } else
                        this.refresh(!0)
                }
                ,
                e.prototype._dragScroll = function() {
                    this._dragScrollAmount && (this._terminal.scrollLines(this._dragScrollAmount, !1),
                    0 < this._dragScrollAmount ? (3 !== this._activeSelectionMode && (this._model.selectionEnd[0] = this._terminal.cols),
                    this._model.selectionEnd[1] = Math.min(this._terminal.buffer.ydisp + this._terminal.rows, this._terminal.buffer.lines.length - 1)) : (3 !== this._activeSelectionMode && (this._model.selectionEnd[0] = 0),
                    this._model.selectionEnd[1] = this._terminal.buffer.ydisp),
                    this.refresh())
                }
                ,
                e.prototype._onMouseUp = function(t) {
                    var e = t.timeStamp - this._mouseDownTimeStamp;
                    this._removeMouseDownListeners(),
                    this.selectionText.length <= 1 && e < 500 ? new h.AltClickHandler(t,this._terminal).move() : this.hasSelection && this._terminal.emit("selection")
                }
                ,
                e.prototype._onBufferActivate = function(t) {
                    this.clearSelection(),
                    t.inactiveBuffer.lines.off("trim", this._trimListener),
                    t.activeBuffer.lines.on("trim", this._trimListener)
                }
                ,
                e.prototype._convertViewportColToCharacterIndex = function(t, e) {
                    for (var r = e[0], n = 0; e[0] >= n; n++) {
                        var i = t.get(n);
                        0 === i[c.CHAR_DATA_WIDTH_INDEX] ? r-- : 1 < i[c.CHAR_DATA_CHAR_INDEX].length && e[0] !== n && (r += i[c.CHAR_DATA_CHAR_INDEX].length - 1)
                    }
                    return r
                }
                ,
                e.prototype.setSelection = function(t, e, r) {
                    this._model.clearSelection(),
                    this._removeMouseDownListeners(),
                    this._model.selectionStart = [t, e],
                    this._model.selectionStartLength = r,
                    this.refresh()
                }
                ,
                e.prototype._getWordAt = function(t, e, r, n) {
                    if (void 0 === r && (r = !0),
                    void 0 === n && (n = !0),
                    t[0] >= this._terminal.cols)
                        return null;
                    var i = this._buffer.lines.get(t[1]);
                    if (!i)
                        return null;
                    var o = this._buffer.translateBufferLineToString(t[1], !1)
                      , s = this._convertViewportColToCharacterIndex(i, t)
                      , a = s
                      , l = t[0] - s
                      , h = 0
                      , u = 0
                      , f = 0
                      , p = 0;
                    if (" " === o.charAt(s)) {
                        for (; 0 < s && " " === o.charAt(s - 1); )
                            s--;
                        for (; a < o.length && " " === o.charAt(a + 1); )
                            a++
                    } else {
                        var d = t[0]
                          , _ = t[0];
                        for (0 === i.get(d)[c.CHAR_DATA_WIDTH_INDEX] && (h++,
                        d--),
                        2 === i.get(_)[c.CHAR_DATA_WIDTH_INDEX] && (u++,
                        _++),
                        1 < i.get(_)[c.CHAR_DATA_CHAR_INDEX].length && (p += i.get(_)[c.CHAR_DATA_CHAR_INDEX].length - 1,
                        a += i.get(_)[c.CHAR_DATA_CHAR_INDEX].length - 1); 0 < d && 0 < s && !this._isCharWordSeparator(i.get(d - 1)); ) {
                            0 === (m = i.get(d - 1))[c.CHAR_DATA_WIDTH_INDEX] ? (h++,
                            d--) : 1 < m[c.CHAR_DATA_CHAR_INDEX].length && (f += m[c.CHAR_DATA_CHAR_INDEX].length - 1,
                            s -= m[c.CHAR_DATA_CHAR_INDEX].length - 1),
                            s--,
                            d--
                        }
                        for (; _ < i.length && a + 1 < o.length && !this._isCharWordSeparator(i.get(_ + 1)); ) {
                            var m;
                            2 === (m = i.get(_ + 1))[c.CHAR_DATA_WIDTH_INDEX] ? (u++,
                            _++) : 1 < m[c.CHAR_DATA_CHAR_INDEX].length && (p += m[c.CHAR_DATA_CHAR_INDEX].length - 1,
                            a += m[c.CHAR_DATA_CHAR_INDEX].length - 1),
                            a++,
                            _++
                        }
                    }
                    a++;
                    var y = s + l - h + f
                      , g = Math.min(this._terminal.cols, a - s + h + u - f - p);
                    if (!e && "" === o.slice(s, a).trim())
                        return null;
                    if (r && 0 === y && 32 !== i.get(0)[c.CHAR_DATA_CODE_INDEX]) {
                        var v = this._buffer.lines.get(t[1] - 1);
                        if (v && i.isWrapped && 32 !== v.get(this._terminal.cols - 1)[c.CHAR_DATA_CODE_INDEX]) {
                            var C = this._getWordAt([this._terminal.cols - 1, t[1] - 1], !1, !0, !1);
                            if (C) {
                                var b = this._terminal.cols - C.start;
                                y -= b,
                                g += b
                            }
                        }
                    }
                    if (n && y + g === this._terminal.cols && 32 !== i.get(this._terminal.cols - 1)[c.CHAR_DATA_CODE_INDEX]) {
                        var w = this._buffer.lines.get(t[1] + 1);
                        if (w && w.isWrapped && 32 !== w.get(0)[c.CHAR_DATA_CODE_INDEX]) {
                            var E = this._getWordAt([0, t[1] + 1], !1, !1, !0);
                            E && (g += E.length)
                        }
                    }
                    return {
                        start: y,
                        length: g
                    }
                }
                ,
                e.prototype._selectWordAt = function(t, e) {
                    var r = this._getWordAt(t, e);
                    if (r) {
                        for (; r.start < 0; )
                            r.start += this._terminal.cols,
                            t[1]--;
                        this._model.selectionStart = [r.start, t[1]],
                        this._model.selectionStartLength = r.length
                    }
                }
                ,
                e.prototype._selectToWordAt = function(t) {
                    var e = this._getWordAt(t, !0);
                    if (e) {
                        for (var r = t[1]; e.start < 0; )
                            e.start += this._terminal.cols,
                            r--;
                        if (!this._model.areSelectionValuesReversed())
                            for (; e.start + e.length > this._terminal.cols; )
                                e.length -= this._terminal.cols,
                                r++;
                        this._model.selectionEnd = [this._model.areSelectionValuesReversed() ? e.start : e.start + e.length, r]
                    }
                }
                ,
                e.prototype._isCharWordSeparator = function(t) {
                    return 0 !== t[c.CHAR_DATA_WIDTH_INDEX] && 0 <= " ()[]{}'\"".indexOf(t[c.CHAR_DATA_CHAR_INDEX])
                }
                ,
                e.prototype._selectLineAt = function(t) {
                    var e = this._buffer.getWrappedRangeForLine(t);
                    this._model.selectionStart = [0, e.first],
                    this._model.selectionEnd = [this._terminal.cols, e.last],
                    this._model.selectionStartLength = 0
                }
                ,
                e
            }(a.EventEmitter);
            r.SelectionManager = p
        }
        , {
            "./Buffer": 2,
            "./SelectionModel": 11,
            "./common/EventEmitter": 18,
            "./core/Platform": 22,
            "./handlers/AltClickHandler": 25,
            "./ui/MouseHelper": 50
        }],
        11: [function(t, e, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = function() {
                function t(t) {
                    this._terminal = t,
                    this.clearSelection()
                }
                return t.prototype.clearSelection = function() {
                    this.selectionStart = null,
                    this.selectionEnd = null,
                    this.isSelectAllActive = !1,
                    this.selectionStartLength = 0
                }
                ,
                Object.defineProperty(t.prototype, "finalSelectionStart", {
                    get: function() {
                        return this.isSelectAllActive ? [0, 0] : this.selectionEnd && this.selectionStart && this.areSelectionValuesReversed() ? this.selectionEnd : this.selectionStart
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(t.prototype, "finalSelectionEnd", {
                    get: function() {
                        if (this.isSelectAllActive)
                            return [this._terminal.cols, this._terminal.buffer.ybase + this._terminal.rows - 1];
                        if (!this.selectionStart)
                            return null;
                        if (this.selectionEnd && !this.areSelectionValuesReversed())
                            return this.selectionStartLength && this.selectionEnd[1] === this.selectionStart[1] ? [Math.max(this.selectionStart[0] + this.selectionStartLength, this.selectionEnd[0]), this.selectionEnd[1]] : this.selectionEnd;
                        var t = this.selectionStart[0] + this.selectionStartLength;
                        return t > this._terminal.cols ? [t % this._terminal.cols, this.selectionStart[1] + Math.floor(t / this._terminal.cols)] : [t, this.selectionStart[1]]
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                t.prototype.areSelectionValuesReversed = function() {
                    var t = this.selectionStart
                      , e = this.selectionEnd;
                    return !(!t || !e) && (t[1] > e[1] || t[1] === e[1] && t[0] > e[0])
                }
                ,
                t.prototype.onTrim = function(t) {
                    return this.selectionStart && (this.selectionStart[1] -= t),
                    this.selectionEnd && (this.selectionEnd[1] -= t),
                    this.selectionEnd && this.selectionEnd[1] < 0 ? (this.clearSelection(),
                    !0) : (this.selectionStart && this.selectionStart[1] < 0 && (this.selectionStart[1] = 0),
                    !1)
                }
                ,
                t
            }();
            r.SelectionModel = n
        }
        , {}],
        12: [function(t, e, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            }),
            r.DEFAULT_BELL_SOUND = "data:audio/wav;base64,UklGRigBAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQBAADpAFgCwAMlBZoG/wdmCcoKRAypDQ8PbRDBEQQTOxRtFYcWlBePGIUZXhoiG88bcBz7HHIdzh0WHlMeZx51HmkeUx4WHs8dah0AHXwc3hs9G4saxRnyGBIYGBcQFv8U4RPAEoYRQBACD70NWwwHC6gJOwjWBloF7gOBAhABkf8b/qv8R/ve+Xf4Ife79W/0JfPZ8Z/wde9N7ijtE+wU6xvqM+lb6H7nw+YX5mrlxuQz5Mzje+Ma49fioeKD4nXiYeJy4pHitOL04j/jn+MN5IPkFOWs5U3mDefM55/ogOl36m7rdOyE7abuyu8D8Unyj/Pg9D/2qfcb+Yn6/vuK/Qj/lAAlAg==";
            var n = function() {
                function t(t) {
                    this._terminal = t
                }
                return Object.defineProperty(t, "audioContext", {
                    get: function() {
                        if (!t._audioContext) {
                            var e = window.AudioContext || window.webkitAudioContext;
                            if (!e)
                                return console.warn("Web Audio API is not supported by this browser. Consider upgrading to the latest version"),
                                null;
                            t._audioContext = new e
                        }
                        return t._audioContext
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                t.prototype.playBellSound = function() {
                    var e = t.audioContext;
                    if (e) {
                        var r = e.createBufferSource();
                        e.decodeAudioData(this._base64ToArrayBuffer(this._removeMimeType(this._terminal.options.bellSound)), function(t) {
                            r.buffer = t,
                            r.connect(e.destination),
                            r.start(0)
                        })
                    }
                }
                ,
                t.prototype._base64ToArrayBuffer = function(t) {
                    for (var e = window.atob(t), r = e.length, n = new Uint8Array(r), i = 0; i < r; i++)
                        n[i] = e.charCodeAt(i);
                    return n.buffer
                }
                ,
                t.prototype._removeMimeType = function(t) {
                    return t.split(",")[1]
                }
                ,
                t
            }();
            r.SoundManager = n
        }
        , {}],
        13: [function(t, e, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            }),
            r.blankLine = "Blank line",
            r.promptLabel = "Terminal input",
            r.tooMuchOutput = "Too much output to announce, navigate to rows manually to read"
        }
        , {}],
        14: [function(t, e, r) {
            "use strict";
            var n, i = this && this.__extends || (n = function(t, e) {
                return (n = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(t, e) {
                    t.__proto__ = e
                }
                || function(t, e) {
                    for (var r in e)
                        e.hasOwnProperty(r) && (t[r] = e[r])
                }
                )(t, e)
            }
            ,
            function(t, e) {
                function r() {
                    this.constructor = t
                }
                n(t, e),
                t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype,
                new r)
            }
            );
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = t("./BufferSet")
              , s = t("./Buffer")
              , a = t("./CompositionHelper")
              , l = t("./common/EventEmitter")
              , c = t("./Viewport")
              , h = t("./ui/Clipboard")
              , u = t("./common/data/EscapeSequences")
              , f = t("./InputHandler")
              , p = t("./renderer/Renderer")
              , d = t("./Linkifier")
              , _ = t("./SelectionManager")
              , m = t("./ui/CharMeasure")
              , y = t("./core/Platform")
              , g = t("./ui/Lifecycle")
              , v = t("./Strings")
              , C = t("./ui/MouseHelper")
              , b = t("./SoundManager")
              , w = t("./renderer/ColorManager")
              , E = t("./ui/MouseZoneManager")
              , A = t("./AccessibilityManager")
              , S = t("./ui/ScreenDprMonitor")
              , L = t("./renderer/atlas/CharAtlasCache")
              , x = t("./renderer/dom/DomRenderer")
              , k = t("./core/input/Keyboard")
              , T = t("./common/Clone")
              , R = "undefined" != typeof window ? window.document : null
              , M = ["cols", "rows"]
              , D = {
                cols: 80,
                rows: 24,
                convertEol: !1,
                termName: "xterm",
                cursorBlink: !1,
                cursorStyle: "block",
                bellSound: b.DEFAULT_BELL_SOUND,
                bellStyle: "none",
                drawBoldTextInBrightColors: !0,
                enableBold: !0,
                experimentalCharAtlas: "static",
                fontFamily: "courier-new, courier, monospace",
                fontSize: 15,
                fontWeight: "normal",
                fontWeightBold: "bold",
                lineHeight: 1,
                letterSpacing: 0,
                scrollback: 1e3,
                screenKeys: !1,
                screenReaderMode: !1,
                debug: !1,
                macOptionIsMeta: !1,
                macOptionClickForcesSelection: !1,
                cancelEvents: !1,
                disableStdin: !1,
                useFlowControl: !1,
                allowTransparency: !1,
                tabStopWidth: 8,
                theme: null,
                rightClickSelectsWord: y.isMac,
                rendererType: "canvas",
                experimentalBufferLineImpl: "TypedArray"
            }
              , H = function(t) {
                function e(e) {
                    void 0 === e && (e = {});
                    var r = t.call(this) || this;
                    return r.browser = y,
                    r._blankLine = null,
                    r.options = T.clone(e),
                    r._setup(),
                    r
                }
                return i(e, t),
                e.prototype.dispose = function() {
                    t.prototype.dispose.call(this),
                    this._customKeyEventHandler = null,
                    L.removeTerminalFromCache(this),
                    this.handler = function() {}
                    ,
                    this.write = function() {}
                    ,
                    this.element && this.element.parentNode && this.element.parentNode.removeChild(this.element)
                }
                ,
                e.prototype.destroy = function() {
                    this.dispose()
                }
                ,
                e.prototype._setup = function() {
                    var t = this;
                    Object.keys(D).forEach(function(e) {
                        null !== t.options[e] && void 0 !== t.options[e] || (t.options[e] = D[e])
                    }),
                    this._parent = R ? R.body : null,
                    this.cols = this.options.cols,
                    this.rows = this.options.rows,
                    this.options.handler && this.on("data", this.options.handler),
                    this.cursorState = 0,
                    this.cursorHidden = !1,
                    this._customKeyEventHandler = null,
                    this.applicationKeypad = !1,
                    this.applicationCursor = !1,
                    this.originMode = !1,
                    this.insertMode = !1,
                    this.wraparoundMode = !0,
                    this.bracketedPasteMode = !1,
                    this.charset = null,
                    this.gcharset = null,
                    this.glevel = 0,
                    this.charsets = [null],
                    this.curAttr = s.DEFAULT_ATTR,
                    this.params = [],
                    this.currentParam = 0,
                    this.writeBuffer = [],
                    this._writeInProgress = !1,
                    this._xoffSentToCatchUp = !1,
                    this._userScrolling = !1,
                    this._inputHandler = new f.InputHandler(this),
                    this.register(this._inputHandler),
                    this.renderer = this.renderer || null,
                    this.selectionManager = this.selectionManager || null,
                    this.linkifier = this.linkifier || new d.Linkifier(this),
                    this._mouseZoneManager = this._mouseZoneManager || null,
                    this.soundManager = this.soundManager || new b.SoundManager(this),
                    this.buffers = new o.BufferSet(this),
                    this.selectionManager && (this.selectionManager.clearSelection(),
                    this.selectionManager.initBuffersListeners())
                }
                ,
                Object.defineProperty(e.prototype, "buffer", {
                    get: function() {
                        return this.buffers.active
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                e.prototype.eraseAttr = function() {
                    return -512 & s.DEFAULT_ATTR | 511 & this.curAttr
                }
                ,
                e.prototype.focus = function() {
                    this.textarea && this.textarea.focus()
                }
                ,
                Object.defineProperty(e.prototype, "isFocused", {
                    get: function() {
                        return R.activeElement === this.textarea && R.hasFocus()
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                e.prototype.getOption = function(t) {
                    if (!(t in D))
                        throw new Error('No option with key "' + t + '"');
                    return this.options[t]
                }
                ,
                e.prototype.setOption = function(t, e) {
                    if (!(t in D))
                        throw new Error('No option with key "' + t + '"');
                    if (-1 !== M.indexOf(t) && console.error('Option "' + t + '" can only be set in the constructor'),
                    this.options[t] !== e) {
                        switch (t) {
                        case "bellStyle":
                            e || (e = "none");
                            break;
                        case "cursorStyle":
                            e || (e = "block");
                            break;
                        case "fontWeight":
                            e || (e = "normal");
                            break;
                        case "fontWeightBold":
                            e || (e = "bold");
                            break;
                        case "lineHeight":
                            if (e < 1)
                                return void console.warn(t + " cannot be less than 1, value: " + e);
                        case "rendererType":
                            e || (e = "canvas");
                            break;
                        case "tabStopWidth":
                            if (e < 1)
                                return void console.warn(t + " cannot be less than 1, value: " + e);
                            break;
                        case "theme":
                            if (this.renderer)
                                return void this._setTheme(e);
                            break;
                        case "scrollback":
                            if ((e = Math.min(e, s.MAX_BUFFER_SIZE)) < 0)
                                return void console.warn(t + " cannot be less than 0, value: " + e);
                            if (this.options[t] !== e) {
                                var r = this.rows + e;
                                if (this.buffer.lines.length > r) {
                                    var n = this.buffer.lines.length - r
                                      , i = this.buffer.ydisp - n < 0;
                                    this.buffer.lines.trimStart(n),
                                    this.buffer.ybase = Math.max(this.buffer.ybase - n, 0),
                                    this.buffer.ydisp = Math.max(this.buffer.ydisp - n, 0),
                                    i && this.refresh(0, this.rows - 1)
                                }
                            }
                        }
                        switch (this.options[t] = e,
                        t) {
                        case "fontFamily":
                        case "fontSize":
                            this.renderer && (this.renderer.clear(),
                            this.charMeasure.measure(this.options));
                            break;
                        case "drawBoldTextInBrightColors":
                        case "experimentalCharAtlas":
                        case "enableBold":
                        case "letterSpacing":
                        case "lineHeight":
                        case "fontWeight":
                        case "fontWeightBold":
                            this.renderer && (this.renderer.clear(),
                            this.renderer.onResize(this.cols, this.rows),
                            this.refresh(0, this.rows - 1));
                            break;
                        case "rendererType":
                            this.renderer && (this.unregister(this.renderer),
                            this.renderer.dispose(),
                            this.renderer = null),
                            this._setupRenderer(),
                            this.renderer.onCharSizeChanged(),
                            this._theme && this.renderer.setTheme(this._theme),
                            this.mouseHelper.setRenderer(this.renderer);
                            break;
                        case "scrollback":
                            this.buffers.resize(this.cols, this.rows),
                            this.viewport && this.viewport.syncScrollArea();
                            break;
                        case "screenReaderMode":
                            e ? this._accessibilityManager || (this._accessibilityManager = new A.AccessibilityManager(this)) : this._accessibilityManager && (this._accessibilityManager.dispose(),
                            this._accessibilityManager = null);
                            break;
                        case "tabStopWidth":
                            this.buffers.setupTabStops();
                            break;
                        case "experimentalBufferLineImpl":
                            this.buffers.normal.setBufferLineFactory(e),
                            this.buffers.alt.setBufferLineFactory(e),
                            this._blankLine = null
                        }
                        this.renderer && this.renderer.onOptionsChanged()
                    }
                }
                ,
                e.prototype._onTextAreaFocus = function(t) {
                    this.sendFocus && this.handler(u.C0.ESC + "[I"),
                    this.updateCursorStyle(t),
                    this.element.classList.add("focus"),
                    this.showCursor(),
                    this.emit("focus")
                }
                ,
                e.prototype.blur = function() {
                    return this.textarea.blur()
                }
                ,
                e.prototype._onTextAreaBlur = function() {
                    this.textarea.value = "",
                    this.refresh(this.buffer.y, this.buffer.y),
                    this.sendFocus && this.handler(u.C0.ESC + "[O"),
                    this.element.classList.remove("focus"),
                    this.emit("blur")
                }
                ,
                e.prototype._initGlobal = function() {
                    var t = this;
                    this._bindKeys(),
                    this.register(g.addDisposableDomListener(this.element, "copy", function(e) {
                        t.hasSelection() && h.copyHandler(e, t, t.selectionManager)
                    }));
                    var e = function(e) {
                        return h.pasteHandler(e, t)
                    };
                    this.register(g.addDisposableDomListener(this.textarea, "paste", e)),
                    this.register(g.addDisposableDomListener(this.element, "paste", e)),
                    y.isFirefox ? this.register(g.addDisposableDomListener(this.element, "mousedown", function(e) {
                        2 === e.button && h.rightClickHandler(e, t.textarea, t.selectionManager, t.options.rightClickSelectsWord)
                    })) : this.register(g.addDisposableDomListener(this.element, "contextmenu", function(e) {
                        h.rightClickHandler(e, t.textarea, t.selectionManager, t.options.rightClickSelectsWord)
                    })),
                    y.isLinux && this.register(g.addDisposableDomListener(this.element, "auxclick", function(e) {
                        1 === e.button && h.moveTextAreaUnderMouseCursor(e, t.textarea)
                    }))
                }
                ,
                e.prototype._bindKeys = function() {
                    var t = this
                      , e = this;
                    this.register(g.addDisposableDomListener(this.element, "keydown", function(t) {
                        R.activeElement === this && e._keyDown(t)
                    }, !0)),
                    this.register(g.addDisposableDomListener(this.element, "keypress", function(t) {
                        R.activeElement === this && e._keyPress(t)
                    }, !0)),
                    this.register(g.addDisposableDomListener(this.element, "keyup", function(r) {
                        var n;
                        16 !== (n = r).keyCode && 17 !== n.keyCode && 18 !== n.keyCode && t.focus(),
                        e._keyUp(r)
                    }, !0)),
                    this.register(g.addDisposableDomListener(this.textarea, "keydown", function(e) {
                        return t._keyDown(e)
                    }, !0)),
                    this.register(g.addDisposableDomListener(this.textarea, "keypress", function(e) {
                        return t._keyPress(e)
                    }, !0)),
                    this.register(g.addDisposableDomListener(this.textarea, "compositionstart", function() {
                        return t._compositionHelper.compositionstart()
                    })),
                    this.register(g.addDisposableDomListener(this.textarea, "compositionupdate", function(e) {
                        return t._compositionHelper.compositionupdate(e)
                    })),
                    this.register(g.addDisposableDomListener(this.textarea, "compositionend", function() {
                        return t._compositionHelper.compositionend()
                    })),
                    this.register(this.addDisposableListener("refresh", function() {
                        return t._compositionHelper.updateCompositionElements()
                    })),
                    this.register(this.addDisposableListener("refresh", function(e) {
                        return t._queueLinkification(e.start, e.end)
                    }))
                }
                ,
                e.prototype.open = function(t) {
                    var e = this;
                    if (this._parent = t || this._parent,
                    !this._parent)
                        throw new Error("Terminal requires a parent element.");
                    this._context = this._parent.ownerDocument.defaultView,
                    this._document = this._parent.ownerDocument,
                    this._screenDprMonitor = new S.ScreenDprMonitor,
                    this._screenDprMonitor.setListener(function() {
                        return e.emit("dprchange", window.devicePixelRatio)
                    }),
                    this.register(this._screenDprMonitor),
                    this.element = this._document.createElement("div"),
                    this.element.dir = "ltr",
                    this.element.classList.add("terminal"),
                    this.element.classList.add("xterm"),
                    this.element.setAttribute("tabindex", "0"),
                    this._parent.appendChild(this.element);
                    var r = R.createDocumentFragment();
                    this._viewportElement = R.createElement("div"),
                    this._viewportElement.classList.add("xterm-viewport"),
                    r.appendChild(this._viewportElement),
                    this._viewportScrollArea = R.createElement("div"),
                    this._viewportScrollArea.classList.add("xterm-scroll-area"),
                    this._viewportElement.appendChild(this._viewportScrollArea),
                    this.screenElement = R.createElement("div"),
                    this.screenElement.classList.add("xterm-screen"),
                    this._helperContainer = R.createElement("div"),
                    this._helperContainer.classList.add("xterm-helpers"),
                    this.screenElement.appendChild(this._helperContainer),
                    r.appendChild(this.screenElement),
                    this._mouseZoneManager = new E.MouseZoneManager(this),
                    this.register(this._mouseZoneManager),
                    this.register(this.addDisposableListener("scroll", function() {
                        return e._mouseZoneManager.clearAll()
                    })),
                    this.linkifier.attachToDom(this._mouseZoneManager),
                    this.textarea = R.createElement("textarea"),
                    this.textarea.classList.add("xterm-helper-textarea"),
                    this.textarea.setAttribute("aria-label", v.promptLabel),
                    this.textarea.setAttribute("aria-multiline", "false"),
                    this.textarea.setAttribute("autocorrect", "off"),
                    this.textarea.setAttribute("autocapitalize", "off"),
                    this.textarea.setAttribute("spellcheck", "false"),
                    this.textarea.tabIndex = 0,
                    this.register(g.addDisposableDomListener(this.textarea, "focus", function(t) {
                        return e._onTextAreaFocus(t)
                    })),
                    this.register(g.addDisposableDomListener(this.textarea, "blur", function() {
                        return e._onTextAreaBlur()
                    })),
                    this._helperContainer.appendChild(this.textarea),
                    this._compositionView = R.createElement("div"),
                    this._compositionView.classList.add("composition-view"),
                    this._compositionHelper = new a.CompositionHelper(this.textarea,this._compositionView,this),
                    this._helperContainer.appendChild(this._compositionView),
                    this.charMeasure = new m.CharMeasure(R,this._helperContainer),
                    this.element.appendChild(r),
                    this._setupRenderer(),
                    this._theme = this.options.theme,
                    this.options.theme = null,
                    this.viewport = new c.Viewport(this,this._viewportElement,this._viewportScrollArea,this.charMeasure),
                    this.viewport.onThemeChanged(this.renderer.colorManager.colors),
                    this.register(this.viewport),
                    this.register(this.addDisposableListener("cursormove", function() {
                        return e.renderer.onCursorMove()
                    })),
                    this.register(this.addDisposableListener("resize", function() {
                        return e.renderer.onResize(e.cols, e.rows)
                    })),
                    this.register(this.addDisposableListener("blur", function() {
                        return e.renderer.onBlur()
                    })),
                    this.register(this.addDisposableListener("focus", function() {
                        return e.renderer.onFocus()
                    })),
                    this.register(this.addDisposableListener("dprchange", function() {
                        return e.renderer.onWindowResize(window.devicePixelRatio)
                    })),
                    this.register(g.addDisposableDomListener(window, "resize", function() {
                        return e.renderer.onWindowResize(window.devicePixelRatio)
                    })),
                    this.register(this.charMeasure.addDisposableListener("charsizechanged", function() {
                        return e.renderer.onCharSizeChanged()
                    })),
                    this.register(this.renderer.addDisposableListener("resize", function(t) {
                        return e.viewport.syncScrollArea()
                    })),
                    this.selectionManager = new _.SelectionManager(this,this.charMeasure),
                    this.register(g.addDisposableDomListener(this.element, "mousedown", function(t) {
                        return e.selectionManager.onMouseDown(t)
                    })),
                    this.register(this.selectionManager.addDisposableListener("refresh", function(t) {
                        return e.renderer.onSelectionChanged(t.start, t.end, t.columnSelectMode)
                    })),
                    this.register(this.selectionManager.addDisposableListener("newselection", function(t) {
                        e.textarea.value = t,
                        e.textarea.focus(),
                        e.textarea.select()
                    })),
                    this.register(this.addDisposableListener("scroll", function() {
                        e.viewport.syncScrollArea(),
                        e.selectionManager.refresh()
                    })),
                    this.register(g.addDisposableDomListener(this._viewportElement, "scroll", function() {
                        return e.selectionManager.refresh()
                    })),
                    this.mouseHelper = new C.MouseHelper(this.renderer),
                    this.options.screenReaderMode && (this._accessibilityManager = new A.AccessibilityManager(this)),
                    this.charMeasure.measure(this.options),
                    this.refresh(0, this.rows - 1),
                    this._initGlobal(),
                    this.bindMouse()
                }
                ,
                e.prototype._setupRenderer = function() {
                    switch (this.options.rendererType) {
                    case "canvas":
                        this.renderer = new p.Renderer(this,this.options.theme);
                        break;
                    case "dom":
                        this.renderer = new x.DomRenderer(this,this.options.theme);
                        break;
                    default:
                        throw new Error('Unrecognized rendererType "' + this.options.rendererType + '"')
                    }
                    this.register(this.renderer)
                }
                ,
                e.prototype._setTheme = function(t) {
                    this._theme = t;
                    var e = this.renderer.setTheme(t);
                    this.viewport && this.viewport.onThemeChanged(e)
                }
                ,
                e.prototype.bindMouse = function() {
                    var t = this
                      , e = this.element
                      , r = this
                      , n = 32;
                    function i(t) {
                        var e, i;
                        if (e = function(t) {
                            var e, n, i;
                            switch (t.overrideType || t.type) {
                            case "mousedown":
                                e = null !== t.button && void 0 !== t.button ? +t.button : null !== t.which && void 0 !== t.which ? t.which - 1 : null,
                                y.isMSIE && (e = 1 === e ? 0 : 4 === e ? 1 : e);
                                break;
                            case "mouseup":
                                e = 3;
                                break;
                            case "DOMMouseScroll":
                                e = t.detail < 0 ? 64 : 65;
                                break;
                            case "wheel":
                                e = t.deltaY < 0 ? 64 : 65
                            }
                            return i = (t.shiftKey ? 4 : 0) | (t.metaKey ? 8 : 0) | (n = t.ctrlKey ? 16 : 0),
                            r.vt200Mouse ? i &= n : r.normalMouse || (i = 0),
                            32 + (i << 2) + e
                        }(t),
                        i = r.mouseHelper.getRawByteCoords(t, r.screenElement, r.charMeasure, r.cols, r.rows))
                            switch (s(e, i),
                            t.overrideType || t.type) {
                            case "mousedown":
                                n = e;
                                break;
                            case "mouseup":
                                n = 32
                            }
                    }
                    function o(t, e) {
                        if (r.utfMouse) {
                            if (2047 === e)
                                return void t.push(0);
                            e < 127 ? t.push(e) : (2047 < e && (e = 2047),
                            t.push(192 | e >> 6),
                            t.push(128 | 63 & e))
                        } else {
                            if (255 === e)
                                return void t.push(0);
                            127 < e && (e = 127),
                            t.push(e)
                        }
                    }
                    function s(t, e) {
                        if (r._vt300Mouse) {
                            t &= 3,
                            e.x -= 32,
                            e.y -= 32;
                            var n = u.C0.ESC + "[24";
                            if (0 === t)
                                n += "1";
                            else if (1 === t)
                                n += "3";
                            else if (2 === t)
                                n += "5";
                            else {
                                if (3 === t)
                                    return;
                                n += "0"
                            }
                            return n += "~[" + e.x + "," + e.y + "]\r",
                            void r.handler(n)
                        }
                        if (r._decLocator)
                            return t &= 3,
                            e.x -= 32,
                            e.y -= 32,
                            0 === t ? t = 2 : 1 === t ? t = 4 : 2 === t ? t = 6 : 3 === t && (t = 3),
                            void r.handler(u.C0.ESC + "[" + t + ";" + (3 === t ? 4 : 0) + ";" + e.y + ";" + e.x + ";" + e.page || "0&w");
                        if (r.urxvtMouse)
                            return e.x -= 32,
                            e.y -= 32,
                            e.x++,
                            e.y++,
                            void r.handler(u.C0.ESC + "[" + t + ";" + e.x + ";" + e.y + "M");
                        if (r.sgrMouse)
                            return e.x -= 32,
                            e.y -= 32,
                            void r.handler(u.C0.ESC + "[<" + ((3 == (3 & t) ? -4 & t : t) - 32) + ";" + e.x + ";" + e.y + (3 == (3 & t) ? "m" : "M"));
                        var i = [];
                        o(i, t),
                        o(i, e.x),
                        o(i, e.y),
                        r.handler(u.C0.ESC + "[M" + String.fromCharCode.apply(String, i))
                    }
                    this.register(g.addDisposableDomListener(e, "mousedown", function(e) {
                        if (e.preventDefault(),
                        t.focus(),
                        t.mouseEvents && !t.selectionManager.shouldForceSelection(e)) {
                            if (i(e),
                            t.vt200Mouse)
                                return e.overrideType = "mouseup",
                                i(e),
                                t.cancel(e);
                            var o;
                            t.normalMouse && (o = function(e) {
                                var i, o, a;
                                t.normalMouse && (i = e,
                                o = n,
                                (a = r.mouseHelper.getRawByteCoords(i, r.screenElement, r.charMeasure, r.cols, r.rows)) && s(o += 32, a))
                            }
                            ,
                            t._document.addEventListener("mousemove", o));
                            var a = function(e) {
                                return t.normalMouse && !t.x10Mouse && i(e),
                                o && (t._document.removeEventListener("mousemove", o),
                                o = null),
                                t._document.removeEventListener("mouseup", a),
                                t.cancel(e)
                            };
                            return t._document.addEventListener("mouseup", a),
                            t.cancel(e)
                        }
                    })),
                    this.register(g.addDisposableDomListener(e, "wheel", function(e) {
                        if (t.mouseEvents)
                            t.x10Mouse || t._vt300Mouse || t._decLocator || (i(e),
                            e.preventDefault());
                        else if (!t.buffer.hasScrollback) {
                            var r = t.viewport.getLinesScrolled(e);
                            if (0 === r)
                                return;
                            for (var n = u.C0.ESC + (t.applicationCursor ? "O" : "[") + (e.deltaY < 0 ? "A" : "B"), o = "", s = 0; s < Math.abs(r); s++)
                                o += n;
                            t.handler(o)
                        }
                    })),
                    this.register(g.addDisposableDomListener(e, "wheel", function(e) {
                        if (!t.mouseEvents)
                            return t.viewport.onWheel(e),
                            t.cancel(e)
                    })),
                    this.register(g.addDisposableDomListener(e, "touchstart", function(e) {
                        if (!t.mouseEvents)
                            return t.viewport.onTouchStart(e),
                            t.cancel(e)
                    })),
                    this.register(g.addDisposableDomListener(e, "touchmove", function(e) {
                        if (!t.mouseEvents)
                            return t.viewport.onTouchMove(e),
                            t.cancel(e)
                    }))
                }
                ,
                e.prototype.refresh = function(t, e) {
                    this.renderer && this.renderer.refreshRows(t, e)
                }
                ,
                e.prototype._queueLinkification = function(t, e) {
                    this.linkifier && this.linkifier.linkifyRows(t, e)
                }
                ,
                e.prototype.updateCursorStyle = function(t) {
                    this.selectionManager && this.selectionManager.shouldColumnSelect(t) ? this.element.classList.add("column-select") : this.element.classList.remove("column-select")
                }
                ,
                e.prototype.showCursor = function() {
                    this.cursorState || (this.cursorState = 1,
                    this.refresh(this.buffer.y, this.buffer.y))
                }
                ,
                e.prototype.scroll = function(t) {
                    var e;
                    void 0 === t && (t = !1);
                    var r = "JsArray" !== this.options.experimentalBufferLineImpl;
                    r ? ((e = this._blankLine) && e.length === this.cols && e.get(0)[s.CHAR_DATA_ATTR_INDEX] === this.eraseAttr() || (e = this.buffer.getBlankLine(this.eraseAttr(), t),
                    this._blankLine = e),
                    e.isWrapped = t) : e = this.buffer.getBlankLine(this.eraseAttr(), t);
                    var n = this.buffer.ybase + this.buffer.scrollTop
                      , i = this.buffer.ybase + this.buffer.scrollBottom;
                    if (0 === this.buffer.scrollTop) {
                        var o = this.buffer.lines.isFull;
                        i === this.buffer.lines.length - 1 ? r ? o ? this.buffer.lines.recycle().copyFrom(e) : this.buffer.lines.push(e.clone()) : this.buffer.lines.push(e) : this.buffer.lines.splice(i + 1, 0, r ? e.clone() : e),
                        o ? this._userScrolling && (this.buffer.ydisp = Math.max(this.buffer.ydisp - 1, 0)) : (this.buffer.ybase++,
                        this._userScrolling || this.buffer.ydisp++)
                    } else {
                        var a = i - n + 1;
                        this.buffer.lines.shiftElements(n + 1, a - 1, -1),
                        this.buffer.lines.set(i, r ? e.clone() : e)
                    }
                    this._userScrolling || (this.buffer.ydisp = this.buffer.ybase),
                    this.updateRange(this.buffer.scrollTop),
                    this.updateRange(this.buffer.scrollBottom),
                    this.emit("scroll", this.buffer.ydisp)
                }
                ,
                e.prototype.scrollLines = function(t, e) {
                    if (t < 0) {
                        if (0 === this.buffer.ydisp)
                            return;
                        this._userScrolling = !0
                    } else
                        t + this.buffer.ydisp >= this.buffer.ybase && (this._userScrolling = !1);
                    var r = this.buffer.ydisp;
                    this.buffer.ydisp = Math.max(Math.min(this.buffer.ydisp + t, this.buffer.ybase), 0),
                    r !== this.buffer.ydisp && (e || this.emit("scroll", this.buffer.ydisp),
                    this.refresh(0, this.rows - 1))
                }
                ,
                e.prototype.scrollPages = function(t) {
                    this.scrollLines(t * (this.rows - 1))
                }
                ,
                e.prototype.scrollToTop = function() {
                    this.scrollLines(-this.buffer.ydisp)
                }
                ,
                e.prototype.scrollToBottom = function() {
                    this.scrollLines(this.buffer.ybase - this.buffer.ydisp)
                }
                ,
                e.prototype.scrollToLine = function(t) {
                    var e = t - this.buffer.ydisp;
                    0 !== e && this.scrollLines(e)
                }
                ,
                e.prototype.write = function(t) {
                    var e = this;
                    this._isDisposed || t && (this.writeBuffer.push(t),
                    this.options.useFlowControl && !this._xoffSentToCatchUp && 5 <= this.writeBuffer.length && (this.handler(u.C0.DC3),
                    this._xoffSentToCatchUp = !0),
                    !this._writeInProgress && 0 < this.writeBuffer.length && (this._writeInProgress = !0,
                    setTimeout(function() {
                        e._innerWrite()
                    })))
                }
                ,
                e.prototype._innerWrite = function() {
                    var t = this;
                    this._isDisposed && (this.writeBuffer = []);
                    for (var e = this.writeBuffer.splice(0, 300); 0 < e.length; ) {
                        var r = e.shift();
                        this._xoffSentToCatchUp && 0 === e.length && 0 === this.writeBuffer.length && (this.handler(u.C0.DC1),
                        this._xoffSentToCatchUp = !1),
                        this._refreshStart = this.buffer.y,
                        this._refreshEnd = this.buffer.y,
                        this._inputHandler.parse(r),
                        this.updateRange(this.buffer.y),
                        this.refresh(this._refreshStart, this._refreshEnd)
                    }
                    0 < this.writeBuffer.length ? setTimeout(function() {
                        return t._innerWrite()
                    }, 0) : this._writeInProgress = !1
                }
                ,
                e.prototype.writeln = function(t) {
                    this.write(t + "\r\n")
                }
                ,
                e.prototype.attachCustomKeyEventHandler = function(t) {
                    this._customKeyEventHandler = t
                }
                ,
                e.prototype.addCsiHandler = function(t, e) {
                    return this._inputHandler.addCsiHandler(t, e)
                }
                ,
                e.prototype.addOscHandler = function(t, e) {
                    return this._inputHandler.addOscHandler(t, e)
                }
                ,
                e.prototype.registerLinkMatcher = function(t, e, r) {
                    var n = this.linkifier.registerLinkMatcher(t, e, r);
                    return this.refresh(0, this.rows - 1),
                    n
                }
                ,
                e.prototype.deregisterLinkMatcher = function(t) {
                    this.linkifier.deregisterLinkMatcher(t) && this.refresh(0, this.rows - 1)
                }
                ,
                e.prototype.registerCharacterJoiner = function(t) {
                    var e = this.renderer.registerCharacterJoiner(t);
                    return this.refresh(0, this.rows - 1),
                    e
                }
                ,
                e.prototype.deregisterCharacterJoiner = function(t) {
                    this.renderer.deregisterCharacterJoiner(t) && this.refresh(0, this.rows - 1)
                }
                ,
                Object.defineProperty(e.prototype, "markers", {
                    get: function() {
                        return this.buffer.markers
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                e.prototype.addMarker = function(t) {
                    if (this.buffer === this.buffers.normal)
                        return this.buffer.addMarker(this.buffer.ybase + this.buffer.y + t)
                }
                ,
                e.prototype.hasSelection = function() {
                    return !!this.selectionManager && this.selectionManager.hasSelection
                }
                ,
                e.prototype.getSelection = function() {
                    return this.selectionManager ? this.selectionManager.selectionText : ""
                }
                ,
                e.prototype.clearSelection = function() {
                    this.selectionManager && this.selectionManager.clearSelection()
                }
                ,
                e.prototype.selectAll = function() {
                    this.selectionManager && this.selectionManager.selectAll()
                }
                ,
                e.prototype.selectLines = function(t, e) {
                    this.selectionManager && this.selectionManager.selectLines(t, e)
                }
                ,
                e.prototype._keyDown = function(t) {
                    if (this._customKeyEventHandler && !1 === this._customKeyEventHandler(t))
                        return !1;
                    if (!this._compositionHelper.keydown(t))
                        return this.buffer.ybase !== this.buffer.ydisp && this.scrollToBottom(),
                        !1;
                    var e = k.evaluateKeyboardEvent(t, this.applicationCursor, this.browser.isMac, this.options.macOptionIsMeta);
                    if (this.updateCursorStyle(t),
                    3 !== e.type && 2 !== e.type)
                        return 1 === e.type && this.selectAll(),
                        !!this._isThirdLevelShift(this.browser, t) || (e.cancel && this.cancel(t, !0),
                        !e.key || (this.emit("keydown", t),
                        this.emit("key", e.key, t),
                        this.showCursor(),
                        this.handler(e.key),
                        this.cancel(t, !0)));
                    var r = this.rows - 1;
                    return this.scrollLines(2 === e.type ? -r : r),
                    this.cancel(t, !0)
                }
                ,
                e.prototype._isThirdLevelShift = function(t, e) {
                    var r = t.isMac && !this.options.macOptionIsMeta && e.altKey && !e.ctrlKey && !e.metaKey || t.isMSWindows && e.altKey && e.ctrlKey && !e.metaKey;
                    return "keypress" === e.type ? r : r && (!e.keyCode || 47 < e.keyCode)
                }
                ,
                e.prototype.setgLevel = function(t) {
                    this.glevel = t,
                    this.charset = this.charsets[t]
                }
                ,
                e.prototype.setgCharset = function(t, e) {
                    this.charsets[t] = e,
                    this.glevel === t && (this.charset = e)
                }
                ,
                e.prototype._keyUp = function(t) {
                    this.updateCursorStyle(t)
                }
                ,
                e.prototype._keyPress = function(t) {
                    var e;
                    if (this._customKeyEventHandler && !1 === this._customKeyEventHandler(t))
                        return !1;
                    if (this.cancel(t),
                    t.charCode)
                        e = t.charCode;
                    else if (null === t.which || void 0 === t.which)
                        e = t.keyCode;
                    else {
                        if (0 === t.which || 0 === t.charCode)
                            return !1;
                        e = t.which
                    }
                    return !(!e || (t.altKey || t.ctrlKey || t.metaKey) && !this._isThirdLevelShift(this.browser, t) || (e = String.fromCharCode(e),
                    this.emit("keypress", e, t),
                    this.emit("key", e, t),
                    this.showCursor(),
                    this.handler(e),
                    0))
                }
                ,
                e.prototype.bell = function() {
                    var t = this;
                    this.emit("bell"),
                    this._soundBell() && this.soundManager.playBellSound(),
                    this._visualBell() && (this.element.classList.add("visual-bell-active"),
                    clearTimeout(this._visualBellTimer),
                    this._visualBellTimer = window.setTimeout(function() {
                        t.element.classList.remove("visual-bell-active")
                    }, 200))
                }
                ,
                e.prototype.log = function(t, e) {
                    this.options.debug && this._context.console && this._context.console.log && this._context.console.log(t, e)
                }
                ,
                e.prototype.error = function(t, e) {
                    this.options.debug && this._context.console && this._context.console.error && this._context.console.error(t, e)
                }
                ,
                e.prototype.resize = function(t, e) {
                    isNaN(t) || isNaN(e) || (t !== this.cols || e !== this.rows ? (t < 1 && (t = 1),
                    e < 1 && (e = 1),
                    this.buffers.resize(t, e),
                    this.cols = t,
                    this.rows = e,
                    this.buffers.setupTabStops(this.cols),
                    this.charMeasure && this.charMeasure.measure(this.options),
                    this.refresh(0, this.rows - 1),
                    this.emit("resize", {
                        cols: t,
                        rows: e
                    })) : !this.charMeasure || this.charMeasure.width && this.charMeasure.height || this.charMeasure.measure(this.options))
                }
                ,
                e.prototype.updateRange = function(t) {
                    t < this._refreshStart && (this._refreshStart = t),
                    t > this._refreshEnd && (this._refreshEnd = t)
                }
                ,
                e.prototype.maxRange = function() {
                    this._refreshStart = 0,
                    this._refreshEnd = this.rows - 1
                }
                ,
                e.prototype.clear = function() {
                    if (0 !== this.buffer.ybase || 0 !== this.buffer.y) {
                        this.buffer.lines.set(0, this.buffer.lines.get(this.buffer.ybase + this.buffer.y)),
                        this.buffer.lines.length = 1,
                        this.buffer.ydisp = 0,
                        this.buffer.ybase = 0,
                        this.buffer.y = 0;
                        for (var t = 1; t < this.rows; t++)
                            this.buffer.lines.push(this.buffer.getBlankLine(s.DEFAULT_ATTR));
                        this.refresh(0, this.rows - 1),
                        this.emit("scroll", this.buffer.ydisp)
                    }
                }
                ,
                e.prototype.ch = function(t) {
                    return t ? [this.eraseAttr(), s.NULL_CELL_CHAR, s.NULL_CELL_WIDTH, s.NULL_CELL_CODE] : [s.DEFAULT_ATTR, s.NULL_CELL_CHAR, s.NULL_CELL_WIDTH, s.NULL_CELL_CODE]
                }
                ,
                e.prototype.is = function(t) {
                    return 0 === (this.options.termName + "").indexOf(t)
                }
                ,
                e.prototype.handler = function(t) {
                    this.options.disableStdin || (this.selectionManager && this.selectionManager.hasSelection && this.selectionManager.clearSelection(),
                    this.buffer.ybase !== this.buffer.ydisp && this.scrollToBottom(),
                    this.emit("data", t))
                }
                ,
                e.prototype.handleTitle = function(t) {
                    this.emit("title", t)
                }
                ,
                e.prototype.index = function() {
                    this.buffer.y++,
                    this.buffer.y > this.buffer.scrollBottom && (this.buffer.y--,
                    this.scroll()),
                    this.buffer.x >= this.cols && this.buffer.x--
                }
                ,
                e.prototype.reverseIndex = function() {
                    if (this.buffer.y === this.buffer.scrollTop) {
                        var t = this.buffer.scrollBottom - this.buffer.scrollTop;
                        this.buffer.lines.shiftElements(this.buffer.y + this.buffer.ybase, t, 1),
                        this.buffer.lines.set(this.buffer.y + this.buffer.ybase, this.buffer.getBlankLine(this.eraseAttr())),
                        this.updateRange(this.buffer.scrollTop),
                        this.updateRange(this.buffer.scrollBottom)
                    } else
                        this.buffer.y--
                }
                ,
                e.prototype.reset = function() {
                    this.options.rows = this.rows,
                    this.options.cols = this.cols;
                    var t = this._customKeyEventHandler
                      , e = this._inputHandler
                      , r = this.cursorState;
                    this._setup(),
                    this._customKeyEventHandler = t,
                    this._inputHandler = e,
                    this.cursorState = r,
                    this.refresh(0, this.rows - 1),
                    this.viewport && this.viewport.syncScrollArea()
                }
                ,
                e.prototype.tabSet = function() {
                    this.buffer.tabs[this.buffer.x] = !0
                }
                ,
                e.prototype.cancel = function(t, e) {
                    if (this.options.cancelEvents || e)
                        return t.preventDefault(),
                        t.stopPropagation(),
                        !1
                }
                ,
                e.prototype.matchColor = function(t, e, r) {
                    var n = t << 16 | e << 8 | r;
                    if (null !== O[n] && void 0 !== O[n])
                        return O[n];
                    for (var i, o, s, a, l, c, h, u, f = 1 / 0, p = -1, d = 0; d < w.DEFAULT_ANSI_COLORS.length; d++) {
                        if (s = t,
                        a = e,
                        l = r,
                        c = (i = w.DEFAULT_ANSI_COLORS[d].rgba) >>> 24,
                        h = i >>> 16 & 255,
                        u = i >>> 8 & 255,
                        0 === (o = Math.pow(30 * (s - c), 2) + Math.pow(59 * (a - h), 2) + Math.pow(11 * (l - u), 2))) {
                            p = d;
                            break
                        }
                        o < f && (f = o,
                        p = d)
                    }
                    return O[n] = p
                }
                ,
                e.prototype._visualBell = function() {
                    return !1
                }
                ,
                e.prototype._soundBell = function() {
                    return "sound" === this.options.bellStyle
                }
                ,
                e
            }(l.EventEmitter);
            r.Terminal = H;
            var O = {}
        }
        , {
            "./AccessibilityManager": 1,
            "./Buffer": 2,
            "./BufferSet": 4,
            "./CompositionHelper": 6,
            "./InputHandler": 8,
            "./Linkifier": 9,
            "./SelectionManager": 10,
            "./SoundManager": 12,
            "./Strings": 13,
            "./Viewport": 15,
            "./common/Clone": 17,
            "./common/EventEmitter": 18,
            "./common/data/EscapeSequences": 21,
            "./core/Platform": 22,
            "./core/input/Keyboard": 24,
            "./renderer/ColorManager": 29,
            "./renderer/Renderer": 33,
            "./renderer/atlas/CharAtlasCache": 37,
            "./renderer/dom/DomRenderer": 45,
            "./ui/CharMeasure": 47,
            "./ui/Clipboard": 48,
            "./ui/Lifecycle": 49,
            "./ui/MouseHelper": 50,
            "./ui/MouseZoneManager": 51,
            "./ui/ScreenDprMonitor": 53
        }],
        15: [function(t, e, r) {
            "use strict";
            var n, i = this && this.__extends || (n = function(t, e) {
                return (n = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(t, e) {
                    t.__proto__ = e
                }
                || function(t, e) {
                    for (var r in e)
                        e.hasOwnProperty(r) && (t[r] = e[r])
                }
                )(t, e)
            }
            ,
            function(t, e) {
                function r() {
                    this.constructor = t
                }
                n(t, e),
                t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype,
                new r)
            }
            );
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = t("./common/Lifecycle")
              , s = t("./ui/Lifecycle")
              , a = function(t) {
                function e(e, r, n, i) {
                    var o = t.call(this) || this;
                    return o._terminal = e,
                    o._viewportElement = r,
                    o._scrollArea = n,
                    o._charMeasure = i,
                    o.scrollBarWidth = 0,
                    o._currentRowHeight = 0,
                    o._lastRecordedBufferLength = 0,
                    o._lastRecordedViewportHeight = 0,
                    o._lastRecordedBufferHeight = 0,
                    o._lastScrollTop = 0,
                    o._wheelPartialScroll = 0,
                    o._refreshAnimationFrame = null,
                    o._ignoreNextScrollEvent = !1,
                    o.scrollBarWidth = o._viewportElement.offsetWidth - o._scrollArea.offsetWidth || 15,
                    o.register(s.addDisposableDomListener(o._viewportElement, "scroll", o._onScroll.bind(o))),
                    setTimeout(function() {
                        return o.syncScrollArea()
                    }, 0),
                    o
                }
                return i(e, t),
                e.prototype.onThemeChanged = function(t) {
                    this._viewportElement.style.backgroundColor = t.background.css
                }
                ,
                e.prototype._refresh = function() {
                    var t = this;
                    null === this._refreshAnimationFrame && (this._refreshAnimationFrame = requestAnimationFrame(function() {
                        return t._innerRefresh()
                    }))
                }
                ,
                e.prototype._innerRefresh = function() {
                    if (0 < this._charMeasure.height) {
                        this._currentRowHeight = this._terminal.renderer.dimensions.scaledCellHeight / window.devicePixelRatio,
                        this._lastRecordedViewportHeight = this._viewportElement.offsetHeight;
                        var t = Math.round(this._currentRowHeight * this._lastRecordedBufferLength) + (this._lastRecordedViewportHeight - this._terminal.renderer.dimensions.canvasHeight);
                        this._lastRecordedBufferHeight !== t && (this._lastRecordedBufferHeight = t,
                        this._scrollArea.style.height = this._lastRecordedBufferHeight + "px")
                    }
                    var e = this._terminal.buffer.ydisp * this._currentRowHeight;
                    this._viewportElement.scrollTop !== e && (this._ignoreNextScrollEvent = !0,
                    this._viewportElement.scrollTop = e),
                    this._refreshAnimationFrame = null
                }
                ,
                e.prototype.syncScrollArea = function() {
                    if (this._lastRecordedBufferLength !== this._terminal.buffer.lines.length)
                        return this._lastRecordedBufferLength = this._terminal.buffer.lines.length,
                        void this._refresh();
                    if (this._lastRecordedViewportHeight === this._terminal.renderer.dimensions.canvasHeight) {
                        var t = this._terminal.buffer.ydisp * this._currentRowHeight;
                        this._lastScrollTop === t && this._lastScrollTop === this._viewportElement.scrollTop && this._terminal.renderer.dimensions.scaledCellHeight / window.devicePixelRatio === this._currentRowHeight || this._refresh()
                    } else
                        this._refresh()
                }
                ,
                e.prototype._onScroll = function(t) {
                    if (this._lastScrollTop = this._viewportElement.scrollTop,
                    this._viewportElement.offsetParent)
                        if (this._ignoreNextScrollEvent)
                            this._ignoreNextScrollEvent = !1;
                        else {
                            var e = Math.round(this._lastScrollTop / this._currentRowHeight) - this._terminal.buffer.ydisp;
                            this._terminal.scrollLines(e, !0)
                        }
                }
                ,
                e.prototype.onWheel = function(t) {
                    var e = this._getPixelsScrolled(t);
                    0 !== e && (this._viewportElement.scrollTop += e,
                    t.preventDefault())
                }
                ,
                e.prototype._getPixelsScrolled = function(t) {
                    if (0 === t.deltaY)
                        return 0;
                    var e = t.deltaY;
                    return t.deltaMode === WheelEvent.DOM_DELTA_LINE ? e *= this._currentRowHeight : t.deltaMode === WheelEvent.DOM_DELTA_PAGE && (e *= this._currentRowHeight * this._terminal.rows),
                    e
                }
                ,
                e.prototype.getLinesScrolled = function(t) {
                    if (0 === t.deltaY)
                        return 0;
                    var e = t.deltaY;
                    return t.deltaMode === WheelEvent.DOM_DELTA_PIXEL ? (e /= this._currentRowHeight + 0,
                    this._wheelPartialScroll += e,
                    e = Math.floor(Math.abs(this._wheelPartialScroll)) * (0 < this._wheelPartialScroll ? 1 : -1),
                    this._wheelPartialScroll %= 1) : t.deltaMode === WheelEvent.DOM_DELTA_PAGE && (e *= this._terminal.rows),
                    e
                }
                ,
                e.prototype.onTouchStart = function(t) {
                    this._lastTouchY = t.touches[0].pageY
                }
                ,
                e.prototype.onTouchMove = function(t) {
                    var e = this._lastTouchY - t.touches[0].pageY;
                    this._lastTouchY = t.touches[0].pageY,
                    0 !== e && (this._viewportElement.scrollTop += e,
                    t.preventDefault())
                }
                ,
                e
            }(o.Disposable);
            r.Viewport = a
        }
        , {
            "./common/Lifecycle": 19,
            "./ui/Lifecycle": 49
        }],
        16: [function(t, e, r) {
            "use strict";
            var n, i = this && this.__extends || (n = function(t, e) {
                return (n = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(t, e) {
                    t.__proto__ = e
                }
                || function(t, e) {
                    for (var r in e)
                        e.hasOwnProperty(r) && (t[r] = e[r])
                }
                )(t, e)
            }
            ,
            function(t, e) {
                function r() {
                    this.constructor = t
                }
                n(t, e),
                t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype,
                new r)
            }
            );
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = function(t) {
                function e(e) {
                    var r = t.call(this) || this;
                    return r._maxLength = e,
                    r._array = new Array(r._maxLength),
                    r._startIndex = 0,
                    r._length = 0,
                    r
                }
                return i(e, t),
                Object.defineProperty(e.prototype, "maxLength", {
                    get: function() {
                        return this._maxLength
                    },
                    set: function(t) {
                        if (this._maxLength !== t) {
                            for (var e = new Array(t), r = 0; r < Math.min(t, this.length); r++)
                                e[r] = this._array[this._getCyclicIndex(r)];
                            this._array = e,
                            this._maxLength = t,
                            this._startIndex = 0
                        }
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(e.prototype, "length", {
                    get: function() {
                        return this._length
                    },
                    set: function(t) {
                        if (t > this._length)
                            for (var e = this._length; e < t; e++)
                                this._array[e] = void 0;
                        this._length = t
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                e.prototype.get = function(t) {
                    return this._array[this._getCyclicIndex(t)]
                }
                ,
                e.prototype.set = function(t, e) {
                    this._array[this._getCyclicIndex(t)] = e
                }
                ,
                e.prototype.push = function(t) {
                    this._array[this._getCyclicIndex(this._length)] = t,
                    this._length === this._maxLength ? (this._startIndex = ++this._startIndex % this._maxLength,
                    this.emit("trim", 1)) : this._length++
                }
                ,
                e.prototype.recycle = function() {
                    if (this._length !== this._maxLength)
                        throw new Error("Can only recycle when the buffer is full");
                    return this._startIndex = ++this._startIndex % this._maxLength,
                    this.emit("trim", 1),
                    this._array[this._getCyclicIndex(this._length - 1)]
                }
                ,
                Object.defineProperty(e.prototype, "isFull", {
                    get: function() {
                        return this._length === this._maxLength
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                e.prototype.pop = function() {
                    return this._array[this._getCyclicIndex(this._length-- - 1)]
                }
                ,
                e.prototype.splice = function(t, e) {
                    for (var r = [], n = 2; n < arguments.length; n++)
                        r[n - 2] = arguments[n];
                    if (e) {
                        for (var i = t; i < this._length - e; i++)
                            this._array[this._getCyclicIndex(i)] = this._array[this._getCyclicIndex(i + e)];
                        this._length -= e
                    }
                    if (r && r.length) {
                        for (i = this._length - 1; t <= i; i--)
                            this._array[this._getCyclicIndex(i + r.length)] = this._array[this._getCyclicIndex(i)];
                        for (i = 0; i < r.length; i++)
                            this._array[this._getCyclicIndex(t + i)] = r[i];
                        if (this._length + r.length > this._maxLength) {
                            var o = this._length + r.length - this._maxLength;
                            this._startIndex += o,
                            this._length = this._maxLength,
                            this.emit("trim", o)
                        } else
                            this._length += r.length
                    }
                }
                ,
                e.prototype.trimStart = function(t) {
                    t > this._length && (t = this._length),
                    this._startIndex += t,
                    this._length -= t,
                    this.emit("trim", t)
                }
                ,
                e.prototype.shiftElements = function(t, e, r) {
                    if (!(e <= 0)) {
                        if (t < 0 || t >= this._length)
                            throw new Error("start argument out of range");
                        if (t + r < 0)
                            throw new Error("Cannot shift elements in list beyond index 0");
                        if (0 < r) {
                            for (var n = e - 1; 0 <= n; n--)
                                this.set(t + n + r, this.get(t + n));
                            var i = t + e + r - this._length;
                            if (0 < i)
                                for (this._length += i; this._length > this._maxLength; )
                                    this._length--,
                                    this._startIndex++,
                                    this.emit("trim", 1)
                        } else
                            for (n = 0; n < e; n++)
                                this.set(t + n + r, this.get(t + n))
                    }
                }
                ,
                e.prototype._getCyclicIndex = function(t) {
                    return (this._startIndex + t) % this._maxLength
                }
                ,
                e
            }(t("./EventEmitter").EventEmitter);
            r.CircularList = o
        }
        , {
            "./EventEmitter": 18
        }],
        17: [function(t, e, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            }),
            r.clone = function t(e, r) {
                if (void 0 === r && (r = 5),
                "object" != typeof e)
                    return e;
                if (null === e)
                    return null;
                var n = Array.isArray(e) ? [] : {};
                for (var i in e)
                    n[i] = r <= 1 ? e[i] : t(e[i], r - 1);
                return n
            }
        }
        , {}],
        18: [function(t, e, r) {
            "use strict";
            var n, i = this && this.__extends || (n = function(t, e) {
                return (n = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(t, e) {
                    t.__proto__ = e
                }
                || function(t, e) {
                    for (var r in e)
                        e.hasOwnProperty(r) && (t[r] = e[r])
                }
                )(t, e)
            }
            ,
            function(t, e) {
                function r() {
                    this.constructor = t
                }
                n(t, e),
                t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype,
                new r)
            }
            );
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = function(t) {
                function e() {
                    var e = t.call(this) || this;
                    return e._events = e._events || {},
                    e
                }
                return i(e, t),
                e.prototype.on = function(t, e) {
                    this._events[t] = this._events[t] || [],
                    this._events[t].push(e)
                }
                ,
                e.prototype.addDisposableListener = function(t, e) {
                    var r = this;
                    this.on(t, e);
                    var n = !1;
                    return {
                        dispose: function() {
                            n || (r.off(t, e),
                            n = !0)
                        }
                    }
                }
                ,
                e.prototype.off = function(t, e) {
                    if (this._events[t])
                        for (var r = this._events[t], n = r.length; n--; )
                            if (r[n] === e)
                                return void r.splice(n, 1)
                }
                ,
                e.prototype.removeAllListeners = function(t) {
                    this._events[t] && delete this._events[t]
                }
                ,
                e.prototype.emit = function(t) {
                    for (var e = [], r = 1; r < arguments.length; r++)
                        e[r - 1] = arguments[r];
                    if (this._events[t])
                        for (var n = this._events[t], i = 0; i < n.length; i++)
                            n[i].apply(this, e)
                }
                ,
                e.prototype.listeners = function(t) {
                    return this._events[t] || []
                }
                ,
                e.prototype.dispose = function() {
                    t.prototype.dispose.call(this),
                    this._events = {}
                }
                ,
                e
            }(t("./Lifecycle").Disposable);
            r.EventEmitter = o
        }
        , {
            "./Lifecycle": 19
        }],
        19: [function(t, e, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = function() {
                function t() {
                    this._disposables = [],
                    this._isDisposed = !1
                }
                return t.prototype.dispose = function() {
                    this._isDisposed = !0,
                    this._disposables.forEach(function(t) {
                        return t.dispose()
                    }),
                    this._disposables.length = 0
                }
                ,
                t.prototype.register = function(t) {
                    this._disposables.push(t)
                }
                ,
                t.prototype.unregister = function(t) {
                    var e = this._disposables.indexOf(t);
                    -1 !== e && this._disposables.splice(e, 1)
                }
                ,
                t
            }();
            r.Disposable = n
        }
        , {}],
        20: [function(t, e, r) {
            "use strict";
            function n(t, e, r, n) {
                if (void 0 === r && (r = 0),
                void 0 === n && (n = t.length),
                r >= t.length)
                    return t;
                r = (t.length + r) % t.length,
                n = n >= t.length ? t.length : (t.length + n) % t.length;
                for (var i = r; i < n; ++i)
                    t[i] = e;
                return t
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            }),
            r.fill = function(t, e, r, i) {
                return t.fill ? t.fill(e, r, i) : n(t, e, r, i)
            }
            ,
            r.fillFallback = n
        }
        , {}],
        21: [function(t, e, r) {
            "use strict";
            var n, i;
            Object.defineProperty(r, "__esModule", {
                value: !0
            }),
            (n = r.C0 || (r.C0 = {})).NUL = "\0",
            n.SOH = "",
            n.STX = "",
            n.ETX = "",
            n.EOT = "",
            n.ENQ = "",
            n.ACK = "",
            n.BEL = "",
            n.BS = "\b",
            n.HT = "\t",
            n.LF = "\n",
            n.VT = "\v",
            n.FF = "\f",
            n.CR = "\r",
            n.SO = "",
            n.SI = "",
            n.DLE = "",
            n.DC1 = "",
            n.DC2 = "",
            n.DC3 = "",
            n.DC4 = "",
            n.NAK = "",
            n.SYN = "",
            n.ETB = "",
            n.CAN = "",
            n.EM = "",
            n.SUB = "",
            n.ESC = "",
            n.FS = "",
            n.GS = "",
            n.RS = "",
            n.US = "",
            n.SP = " ",
            n.DEL = "",
            (i = r.C1 || (r.C1 = {})).PAD = "",
            i.HOP = "",
            i.BPH = "",
            i.NBH = "",
            i.IND = "",
            i.NEL = "",
            i.SSA = "",
            i.ESA = "",
            i.HTS = "",
            i.HTJ = "",
            i.VTS = "",
            i.PLD = "",
            i.PLU = "",
            i.RI = "",
            i.SS2 = "",
            i.SS3 = "",
            i.DCS = "",
            i.PU1 = "",
            i.PU2 = "",
            i.STS = "",
            i.CCH = "",
            i.MW = "",
            i.SPA = "",
            i.EPA = "",
            i.SOS = "",
            i.SGCI = "",
            i.SCI = "",
            i.CSI = "",
            i.ST = "",
            i.OSC = "",
            i.PM = "",
            i.APC = ""
        }
        , {}],
        22: [function(t, e, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = "undefined" == typeof navigator
              , i = n ? "node" : navigator.userAgent
              , o = n ? "node" : navigator.platform;
            function s(t, e) {
                return 0 <= t.indexOf(e)
            }
            r.isFirefox = !!~i.indexOf("Firefox"),
            r.isSafari = /^((?!chrome|android).)*safari/i.test(i),
            r.isMSIE = !!~i.indexOf("MSIE") || !!~i.indexOf("Trident"),
            r.isMac = s(["Macintosh", "MacIntel", "MacPPC", "Mac68K"], o),
            r.isIpad = "iPad" === o,
            r.isIphone = "iPhone" === o,
            r.isMSWindows = s(["Windows", "Win16", "Win32", "WinCE"], o),
            r.isLinux = 0 <= o.indexOf("Linux")
        }
        , {}],
        23: [function(t, e, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            }),
            r.CHARSETS = {},
            r.DEFAULT_CHARSET = r.CHARSETS.B,
            r.CHARSETS[0] = {
                "`": "◆",
                a: "▒",
                b: "\t",
                c: "\f",
                d: "\r",
                e: "\n",
                f: "°",
                g: "±",
                h: "␤",
                i: "\v",
                j: "┘",
                k: "┐",
                l: "┌",
                m: "└",
                n: "┼",
                o: "⎺",
                p: "⎻",
                q: "─",
                r: "⎼",
                s: "⎽",
                t: "├",
                u: "┤",
                v: "┴",
                w: "┬",
                x: "│",
                y: "≤",
                z: "≥",
                "{": "π",
                "|": "≠",
                "}": "£",
                "~": "·"
            },
            r.CHARSETS.A = {
                "#": "£"
            },
            r.CHARSETS.B = null,
            r.CHARSETS[4] = {
                "#": "£",
                "@": "¾",
                "[": "ij",
                "\\": "½",
                "]": "|",
                "{": "¨",
                "|": "f",
                "}": "¼",
                "~": "´"
            },
            r.CHARSETS.C = r.CHARSETS[5] = {
                "[": "Ä",
                "\\": "Ö",
                "]": "Å",
                "^": "Ü",
                "`": "é",
                "{": "ä",
                "|": "ö",
                "}": "å",
                "~": "ü"
            },
            r.CHARSETS.R = {
                "#": "£",
                "@": "à",
                "[": "°",
                "\\": "ç",
                "]": "§",
                "{": "é",
                "|": "ù",
                "}": "è",
                "~": "¨"
            },
            r.CHARSETS.Q = {
                "@": "à",
                "[": "â",
                "\\": "ç",
                "]": "ê",
                "^": "î",
                "`": "ô",
                "{": "é",
                "|": "ù",
                "}": "è",
                "~": "û"
            },
            r.CHARSETS.K = {
                "@": "§",
                "[": "Ä",
                "\\": "Ö",
                "]": "Ü",
                "{": "ä",
                "|": "ö",
                "}": "ü",
                "~": "ß"
            },
            r.CHARSETS.Y = {
                "#": "£",
                "@": "§",
                "[": "°",
                "\\": "ç",
                "]": "é",
                "`": "ù",
                "{": "à",
                "|": "ò",
                "}": "è",
                "~": "ì"
            },
            r.CHARSETS.E = r.CHARSETS[6] = {
                "@": "Ä",
                "[": "Æ",
                "\\": "Ø",
                "]": "Å",
                "^": "Ü",
                "`": "ä",
                "{": "æ",
                "|": "ø",
                "}": "å",
                "~": "ü"
            },
            r.CHARSETS.Z = {
                "#": "£",
                "@": "§",
                "[": "¡",
                "\\": "Ñ",
                "]": "¿",
                "{": "°",
                "|": "ñ",
                "}": "ç"
            },
            r.CHARSETS.H = r.CHARSETS[7] = {
                "@": "É",
                "[": "Ä",
                "\\": "Ö",
                "]": "Å",
                "^": "Ü",
                "`": "é",
                "{": "ä",
                "|": "ö",
                "}": "å",
                "~": "ü"
            },
            r.CHARSETS["="] = {
                "#": "ù",
                "@": "à",
                "[": "é",
                "\\": "ç",
                "]": "ê",
                "^": "î",
                _: "è",
                "`": "ô",
                "{": "ä",
                "|": "ö",
                "}": "ü",
                "~": "û"
            }
        }
        , {}],
        24: [function(t, e, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = t("../../common/data/EscapeSequences")
              , i = {
                48: ["0", ")"],
                49: ["1", "!"],
                50: ["2", "@"],
                51: ["3", "#"],
                52: ["4", "$"],
                53: ["5", "%"],
                54: ["6", "^"],
                55: ["7", "&"],
                56: ["8", "*"],
                57: ["9", "("],
                186: [";", ":"],
                187: ["=", "+"],
                188: [",", "<"],
                189: ["-", "_"],
                190: [".", ">"],
                191: ["/", "?"],
                192: ["`", "~"],
                219: ["[", "{"],
                220: ["\\", "|"],
                221: ["]", "}"],
                222: ["'", '"']
            };
            r.evaluateKeyboardEvent = function(t, e, r, o) {
                var s = {
                    type: 0,
                    cancel: !1,
                    key: void 0
                }
                  , a = (t.shiftKey ? 1 : 0) | (t.altKey ? 2 : 0) | (t.ctrlKey ? 4 : 0) | (t.metaKey ? 8 : 0);
                switch (t.keyCode) {
                case 0:
                    "UIKeyInputUpArrow" === t.key ? s.key = e ? n.C0.ESC + "OA" : n.C0.ESC + "[A" : "UIKeyInputLeftArrow" === t.key ? s.key = e ? n.C0.ESC + "OD" : n.C0.ESC + "[D" : "UIKeyInputRightArrow" === t.key ? s.key = e ? n.C0.ESC + "OC" : n.C0.ESC + "[C" : "UIKeyInputDownArrow" === t.key && (s.key = e ? n.C0.ESC + "OB" : n.C0.ESC + "[B");
                    break;
                case 8:
                    if (t.shiftKey) {
                        s.key = n.C0.BS;
                        break
                    }
                    if (t.altKey) {
                        s.key = n.C0.ESC + n.C0.DEL;
                        break
                    }
                    s.key = n.C0.DEL;
                    break;
                case 9:
                    if (t.shiftKey) {
                        s.key = n.C0.ESC + "[Z";
                        break
                    }
                    s.key = n.C0.HT,
                    s.cancel = !0;
                    break;
                case 13:
                    s.key = n.C0.CR,
                    s.cancel = !0;
                    break;
                case 27:
                    s.key = n.C0.ESC,
                    s.cancel = !0;
                    break;
                case 37:
                    a ? (s.key = n.C0.ESC + "[1;" + (a + 1) + "D",
                    s.key === n.C0.ESC + "[1;3D" && (s.key = r ? n.C0.ESC + "b" : n.C0.ESC + "[1;5D")) : s.key = e ? n.C0.ESC + "OD" : n.C0.ESC + "[D";
                    break;
                case 39:
                    a ? (s.key = n.C0.ESC + "[1;" + (a + 1) + "C",
                    s.key === n.C0.ESC + "[1;3C" && (s.key = r ? n.C0.ESC + "f" : n.C0.ESC + "[1;5C")) : s.key = e ? n.C0.ESC + "OC" : n.C0.ESC + "[C";
                    break;
                case 38:
                    a ? (s.key = n.C0.ESC + "[1;" + (a + 1) + "A",
                    s.key === n.C0.ESC + "[1;3A" && (s.key = n.C0.ESC + "[1;5A")) : s.key = e ? n.C0.ESC + "OA" : n.C0.ESC + "[A";
                    break;
                case 40:
                    a ? (s.key = n.C0.ESC + "[1;" + (a + 1) + "B",
                    s.key === n.C0.ESC + "[1;3B" && (s.key = n.C0.ESC + "[1;5B")) : s.key = e ? n.C0.ESC + "OB" : n.C0.ESC + "[B";
                    break;
                case 45:
                    t.shiftKey || t.ctrlKey || (s.key = n.C0.ESC + "[2~");
                    break;
                case 46:
                    s.key = a ? n.C0.ESC + "[3;" + (a + 1) + "~" : n.C0.ESC + "[3~";
                    break;
                case 36:
                    s.key = a ? n.C0.ESC + "[1;" + (a + 1) + "H" : e ? n.C0.ESC + "OH" : n.C0.ESC + "[H";
                    break;
                case 35:
                    s.key = a ? n.C0.ESC + "[1;" + (a + 1) + "F" : e ? n.C0.ESC + "OF" : n.C0.ESC + "[F";
                    break;
                case 33:
                    t.shiftKey ? s.type = 2 : s.key = n.C0.ESC + "[5~";
                    break;
                case 34:
                    t.shiftKey ? s.type = 3 : s.key = n.C0.ESC + "[6~";
                    break;
                case 112:
                    s.key = a ? n.C0.ESC + "[1;" + (a + 1) + "P" : n.C0.ESC + "OP";
                    break;
                case 113:
                    s.key = a ? n.C0.ESC + "[1;" + (a + 1) + "Q" : n.C0.ESC + "OQ";
                    break;
                case 114:
                    s.key = a ? n.C0.ESC + "[1;" + (a + 1) + "R" : n.C0.ESC + "OR";
                    break;
                case 115:
                    s.key = a ? n.C0.ESC + "[1;" + (a + 1) + "S" : n.C0.ESC + "OS";
                    break;
                case 116:
                    s.key = a ? n.C0.ESC + "[15;" + (a + 1) + "~" : n.C0.ESC + "[15~";
                    break;
                case 117:
                    s.key = a ? n.C0.ESC + "[17;" + (a + 1) + "~" : n.C0.ESC + "[17~";
                    break;
                case 118:
                    s.key = a ? n.C0.ESC + "[18;" + (a + 1) + "~" : n.C0.ESC + "[18~";
                    break;
                case 119:
                    s.key = a ? n.C0.ESC + "[19;" + (a + 1) + "~" : n.C0.ESC + "[19~";
                    break;
                case 120:
                    s.key = a ? n.C0.ESC + "[20;" + (a + 1) + "~" : n.C0.ESC + "[20~";
                    break;
                case 121:
                    s.key = a ? n.C0.ESC + "[21;" + (a + 1) + "~" : n.C0.ESC + "[21~";
                    break;
                case 122:
                    s.key = a ? n.C0.ESC + "[23;" + (a + 1) + "~" : n.C0.ESC + "[23~";
                    break;
                case 123:
                    s.key = a ? n.C0.ESC + "[24;" + (a + 1) + "~" : n.C0.ESC + "[24~";
                    break;
                default:
                    if (!t.ctrlKey || t.shiftKey || t.altKey || t.metaKey)
                        if (r && !o || !t.altKey || t.metaKey)
                            r && !t.altKey && !t.ctrlKey && t.metaKey ? 65 === t.keyCode && (s.type = 1) : t.key && !t.ctrlKey && !t.altKey && !t.metaKey && 48 <= t.keyCode && 1 === t.key.length && (s.key = t.key);
                        else {
                            var l = i[t.keyCode]
                              , c = l && l[t.shiftKey ? 1 : 0];
                            if (c)
                                s.key = n.C0.ESC + c;
                            else if (65 <= t.keyCode && t.keyCode <= 90) {
                                var h = t.ctrlKey ? t.keyCode - 64 : t.keyCode + 32;
                                s.key = n.C0.ESC + String.fromCharCode(h)
                            }
                        }
                    else
                        65 <= t.keyCode && t.keyCode <= 90 ? s.key = String.fromCharCode(t.keyCode - 64) : 32 === t.keyCode ? s.key = String.fromCharCode(0) : 51 <= t.keyCode && t.keyCode <= 55 ? s.key = String.fromCharCode(t.keyCode - 51 + 27) : 56 === t.keyCode ? s.key = String.fromCharCode(127) : 219 === t.keyCode ? s.key = String.fromCharCode(27) : 220 === t.keyCode ? s.key = String.fromCharCode(28) : 221 === t.keyCode && (s.key = String.fromCharCode(29))
                }
                return s
            }
        }
        , {
            "../../common/data/EscapeSequences": 21
        }],
        25: [function(t, e, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = t("../common/data/EscapeSequences")
              , i = function() {
                function t(t, e) {
                    var r;
                    this._mouseEvent = t,
                    this._terminal = e,
                    this._lines = this._terminal.buffer.lines,
                    this._startCol = this._terminal.buffer.x,
                    this._startRow = this._terminal.buffer.y;
                    var n = this._terminal.mouseHelper.getCoords(this._mouseEvent, this._terminal.element, this._terminal.charMeasure, this._terminal.cols, this._terminal.rows, !1);
                    n && (r = n.map(function(t) {
                        return t - 1
                    }),
                    this._endCol = r[0],
                    this._endRow = r[1])
                }
                return t.prototype.move = function() {
                    this._mouseEvent.altKey && void 0 !== this._endCol && void 0 !== this._endRow && this._terminal.handler(this._arrowSequences())
                }
                ,
                t.prototype._arrowSequences = function() {
                    return this._terminal.buffer.hasScrollback ? this._moveHorizontallyOnly() : this._resetStartingRow() + this._moveToRequestedRow() + this._moveToRequestedCol()
                }
                ,
                t.prototype._resetStartingRow = function() {
                    return 0 === this._moveToRequestedRow().length ? "" : o(this._bufferLine(this._startCol, this._startRow, this._startCol, this._startRow - this._wrappedRowsForRow(this._startRow), !1).length, this._sequence("D"))
                }
                ,
                t.prototype._moveToRequestedRow = function() {
                    var t = this._startRow - this._wrappedRowsForRow(this._startRow)
                      , e = this._endRow - this._wrappedRowsForRow(this._endRow);
                    return o(Math.abs(t - e) - this._wrappedRowsCount(), this._sequence(this._verticalDirection()))
                }
                ,
                t.prototype._moveToRequestedCol = function() {
                    var t;
                    t = 0 < this._moveToRequestedRow().length ? this._endRow - this._wrappedRowsForRow(this._endRow) : this._startRow;
                    var e = this._endRow
                      , r = this._horizontalDirection();
                    return o(this._bufferLine(this._startCol, t, this._endCol, e, "C" === r).length, this._sequence(r))
                }
                ,
                t.prototype._moveHorizontallyOnly = function() {
                    var t = this._horizontalDirection();
                    return o(Math.abs(this._startCol - this._endCol), this._sequence(t))
                }
                ,
                t.prototype._wrappedRowsCount = function() {
                    for (var t = 0, e = this._startRow - this._wrappedRowsForRow(this._startRow), r = this._endRow - this._wrappedRowsForRow(this._endRow), n = 0; n < Math.abs(e - r); n++) {
                        var i = "A" === this._verticalDirection() ? -1 : 1;
                        this._lines.get(e + i * n).isWrapped && t++
                    }
                    return t
                }
                ,
                t.prototype._wrappedRowsForRow = function(t) {
                    for (var e = 0, r = this._lines.get(t).isWrapped; r && 0 <= t && t < this._terminal.rows; )
                        e++,
                        t--,
                        r = this._lines.get(t).isWrapped;
                    return e
                }
                ,
                t.prototype._horizontalDirection = function() {
                    var t;
                    return t = 0 < this._moveToRequestedRow().length ? this._endRow - this._wrappedRowsForRow(this._endRow) : this._startRow,
                    this._startCol < this._endCol && t <= this._endRow || this._startCol >= this._endCol && t < this._endRow ? "C" : "D"
                }
                ,
                t.prototype._verticalDirection = function() {
                    return this._startRow > this._endRow ? "A" : "B"
                }
                ,
                t.prototype._bufferLine = function(t, e, r, n, i) {
                    for (var o = t, s = e, a = ""; o !== r || s !== n; )
                        o += i ? 1 : -1,
                        i && o > this._terminal.cols - 1 ? (a += this._terminal.buffer.translateBufferLineToString(s, !1, t, o),
                        t = o = 0,
                        s++) : !i && o < 0 && (a += this._terminal.buffer.translateBufferLineToString(s, !1, 0, t + 1),
                        t = o = this._terminal.cols - 1,
                        s--);
                    return a + this._terminal.buffer.translateBufferLineToString(s, !1, t, o)
                }
                ,
                t.prototype._sequence = function(t) {
                    var e = this._terminal.applicationCursor ? "O" : "[";
                    return n.C0.ESC + e + t
                }
                ,
                t
            }();
            function o(t, e) {
                t = Math.floor(t);
                for (var r = "", n = 0; n < t; n++)
                    r += e;
                return r
            }
            r.AltClickHandler = i
        }
        , {
            "../common/data/EscapeSequences": 21
        }],
        26: [function(t, e, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = t("../Terminal")
              , i = t("../Strings")
              , o = function() {
                function t(t) {
                    this._core = new n.Terminal(t)
                }
                return Object.defineProperty(t.prototype, "element", {
                    get: function() {
                        return this._core.element
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(t.prototype, "textarea", {
                    get: function() {
                        return this._core.textarea
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(t.prototype, "rows", {
                    get: function() {
                        return this._core.rows
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(t.prototype, "cols", {
                    get: function() {
                        return this._core.cols
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(t.prototype, "markers", {
                    get: function() {
                        return this._core.markers
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                t.prototype.blur = function() {
                    this._core.blur()
                }
                ,
                t.prototype.focus = function() {
                    this._core.focus()
                }
                ,
                t.prototype.on = function(t, e) {
                    this._core.on(t, e)
                }
                ,
                t.prototype.off = function(t, e) {
                    this._core.off(t, e)
                }
                ,
                t.prototype.emit = function(t, e) {
                    this._core.emit(t, e)
                }
                ,
                t.prototype.addDisposableListener = function(t, e) {
                    return this._core.addDisposableListener(t, e)
                }
                ,
                t.prototype.resize = function(t, e) {
                    this._core.resize(t, e)
                }
                ,
                t.prototype.writeln = function(t) {
                    this._core.writeln(t)
                }
                ,
                t.prototype.open = function(t) {
                    this._core.open(t)
                }
                ,
                t.prototype.attachCustomKeyEventHandler = function(t) {
                    this._core.attachCustomKeyEventHandler(t)
                }
                ,
                t.prototype.addCsiHandler = function(t, e) {
                    return this._core.addCsiHandler(t, e)
                }
                ,
                t.prototype.addOscHandler = function(t, e) {
                    return this._core.addOscHandler(t, e)
                }
                ,
                t.prototype.registerLinkMatcher = function(t, e, r) {
                    return this._core.registerLinkMatcher(t, e, r)
                }
                ,
                t.prototype.deregisterLinkMatcher = function(t) {
                    this._core.deregisterLinkMatcher(t)
                }
                ,
                t.prototype.registerCharacterJoiner = function(t) {
                    return this._core.registerCharacterJoiner(t)
                }
                ,
                t.prototype.deregisterCharacterJoiner = function(t) {
                    this._core.deregisterCharacterJoiner(t)
                }
                ,
                t.prototype.addMarker = function(t) {
                    return this._core.addMarker(t)
                }
                ,
                t.prototype.hasSelection = function() {
                    return this._core.hasSelection()
                }
                ,
                t.prototype.getSelection = function() {
                    return this._core.getSelection()
                }
                ,
                t.prototype.clearSelection = function() {
                    this._core.clearSelection()
                }
                ,
                t.prototype.selectAll = function() {
                    this._core.selectAll()
                }
                ,
                t.prototype.selectLines = function(t, e) {
                    this._core.selectLines(t, e)
                }
                ,
                t.prototype.dispose = function() {
                    this._core.dispose()
                }
                ,
                t.prototype.destroy = function() {
                    this._core.destroy()
                }
                ,
                t.prototype.scrollLines = function(t) {
                    this._core.scrollLines(t)
                }
                ,
                t.prototype.scrollPages = function(t) {
                    this._core.scrollPages(t)
                }
                ,
                t.prototype.scrollToTop = function() {
                    this._core.scrollToTop()
                }
                ,
                t.prototype.scrollToBottom = function() {
                    this._core.scrollToBottom()
                }
                ,
                t.prototype.scrollToLine = function(t) {
                    this._core.scrollToLine(t)
                }
                ,
                t.prototype.clear = function() {
                    this._core.clear()
                }
                ,
                t.prototype.write = function(t) {
                    this._core.write(t)
                }
                ,
                t.prototype.getOption = function(t) {
                    return this._core.getOption(t)
                }
                ,
                t.prototype.setOption = function(t, e) {
                    this._core.setOption(t, e)
                }
                ,
                t.prototype.refresh = function(t, e) {
                    this._core.refresh(t, e)
                }
                ,
                t.prototype.reset = function() {
                    this._core.reset()
                }
                ,
                t.applyAddon = function(e) {
                    e.apply(t)
                }
                ,
                Object.defineProperty(t, "strings", {
                    get: function() {
                        return i
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                t
            }();
            r.Terminal = o
        }
        , {
            "../Strings": 13,
            "../Terminal": 14
        }],
        27: [function(t, e, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = t("./atlas/Types")
              , i = t("./atlas/CharAtlasCache")
              , o = t("../Buffer")
              , s = t("./atlas/CharAtlasUtils")
              , a = function() {
                function t(t, e, r, n, i) {
                    this._container = t,
                    this._alpha = n,
                    this._colors = i,
                    this._scaledCharWidth = 0,
                    this._scaledCharHeight = 0,
                    this._scaledCellWidth = 0,
                    this._scaledCellHeight = 0,
                    this._scaledCharLeft = 0,
                    this._scaledCharTop = 0,
                    this._currentGlyphIdentifier = {
                        chars: "",
                        code: 0,
                        bg: 0,
                        fg: 0,
                        bold: !1,
                        dim: !1,
                        italic: !1
                    },
                    this._canvas = document.createElement("canvas"),
                    this._canvas.classList.add("xterm-" + e + "-layer"),
                    this._canvas.style.zIndex = r.toString(),
                    this._initCanvas(),
                    this._container.appendChild(this._canvas)
                }
                return t.prototype.dispose = function() {
                    this._container.removeChild(this._canvas),
                    this._charAtlas && this._charAtlas.dispose()
                }
                ,
                t.prototype._initCanvas = function() {
                    this._ctx = this._canvas.getContext("2d", {
                        alpha: this._alpha
                    }),
                    this._alpha || this.clearAll()
                }
                ,
                t.prototype.onOptionsChanged = function(t) {}
                ,
                t.prototype.onBlur = function(t) {}
                ,
                t.prototype.onFocus = function(t) {}
                ,
                t.prototype.onCursorMove = function(t) {}
                ,
                t.prototype.onGridChanged = function(t, e, r) {}
                ,
                t.prototype.onSelectionChanged = function(t, e, r, n) {
                    void 0 === n && (n = !1)
                }
                ,
                t.prototype.onThemeChanged = function(t, e) {
                    this._refreshCharAtlas(t, e)
                }
                ,
                t.prototype.setTransparency = function(t, e) {
                    if (e !== this._alpha) {
                        var r = this._canvas;
                        this._alpha = e,
                        this._canvas = this._canvas.cloneNode(),
                        this._initCanvas(),
                        this._container.replaceChild(this._canvas, r),
                        this._refreshCharAtlas(t, this._colors),
                        this.onGridChanged(t, 0, t.rows - 1)
                    }
                }
                ,
                t.prototype._refreshCharAtlas = function(t, e) {
                    this._scaledCharWidth <= 0 && this._scaledCharHeight <= 0 || (this._charAtlas = i.acquireCharAtlas(t, e, this._scaledCharWidth, this._scaledCharHeight),
                    this._charAtlas.warmUp())
                }
                ,
                t.prototype.resize = function(t, e) {
                    this._scaledCellWidth = e.scaledCellWidth,
                    this._scaledCellHeight = e.scaledCellHeight,
                    this._scaledCharWidth = e.scaledCharWidth,
                    this._scaledCharHeight = e.scaledCharHeight,
                    this._scaledCharLeft = e.scaledCharLeft,
                    this._scaledCharTop = e.scaledCharTop,
                    this._canvas.width = e.scaledCanvasWidth,
                    this._canvas.height = e.scaledCanvasHeight,
                    this._canvas.style.width = e.canvasWidth + "px",
                    this._canvas.style.height = e.canvasHeight + "px",
                    this._alpha || this.clearAll(),
                    this._refreshCharAtlas(t, this._colors)
                }
                ,
                t.prototype.fillCells = function(t, e, r, n) {
                    this._ctx.fillRect(t * this._scaledCellWidth, e * this._scaledCellHeight, r * this._scaledCellWidth, n * this._scaledCellHeight)
                }
                ,
                t.prototype.fillBottomLineAtCells = function(t, e, r) {
                    void 0 === r && (r = 1),
                    this._ctx.fillRect(t * this._scaledCellWidth, (e + 1) * this._scaledCellHeight - window.devicePixelRatio - 1, r * this._scaledCellWidth, window.devicePixelRatio)
                }
                ,
                t.prototype.fillLeftLineAtCell = function(t, e) {
                    this._ctx.fillRect(t * this._scaledCellWidth, e * this._scaledCellHeight, window.devicePixelRatio, this._scaledCellHeight)
                }
                ,
                t.prototype.strokeRectAtCell = function(t, e, r, n) {
                    this._ctx.lineWidth = window.devicePixelRatio,
                    this._ctx.strokeRect(t * this._scaledCellWidth + window.devicePixelRatio / 2, e * this._scaledCellHeight + window.devicePixelRatio / 2, r * this._scaledCellWidth - window.devicePixelRatio, n * this._scaledCellHeight - window.devicePixelRatio)
                }
                ,
                t.prototype.clearAll = function() {
                    this._alpha ? this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height) : (this._ctx.fillStyle = this._colors.background.css,
                    this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height))
                }
                ,
                t.prototype.clearCells = function(t, e, r, n) {
                    this._alpha ? this._ctx.clearRect(t * this._scaledCellWidth, e * this._scaledCellHeight, r * this._scaledCellWidth, n * this._scaledCellHeight) : (this._ctx.fillStyle = this._colors.background.css,
                    this._ctx.fillRect(t * this._scaledCellWidth, e * this._scaledCellHeight, r * this._scaledCellWidth, n * this._scaledCellHeight))
                }
                ,
                t.prototype.fillCharTrueColor = function(t, e, r, n) {
                    this._ctx.font = this._getFont(t, !1, !1),
                    this._ctx.textBaseline = "middle",
                    this._clipRow(t, n),
                    this._ctx.fillText(e[o.CHAR_DATA_CHAR_INDEX], r * this._scaledCellWidth + this._scaledCharLeft, (n + .5) * this._scaledCellHeight + this._scaledCharTop)
                }
                ,
                t.prototype.drawChars = function(t, e, r, i, o, s, a, l, c, h, u) {
                    a += t.options.drawBoldTextInBrightColors && c && a < 8 && a !== n.INVERTED_DEFAULT_COLOR ? 8 : 0,
                    this._currentGlyphIdentifier.chars = e,
                    this._currentGlyphIdentifier.code = r,
                    this._currentGlyphIdentifier.bg = l,
                    this._currentGlyphIdentifier.fg = a,
                    this._currentGlyphIdentifier.bold = c && t.options.enableBold,
                    this._currentGlyphIdentifier.dim = h,
                    this._currentGlyphIdentifier.italic = u,
                    this._charAtlas && this._charAtlas.draw(this._ctx, this._currentGlyphIdentifier, o * this._scaledCellWidth + this._scaledCharLeft, s * this._scaledCellHeight + this._scaledCharTop) || this._drawUncachedChars(t, e, i, a, o, s, c && t.options.enableBold, h, u)
                }
                ,
                t.prototype._drawUncachedChars = function(t, e, r, i, o, a, l, c, h) {
                    this._ctx.save(),
                    this._ctx.font = this._getFont(t, l, h),
                    this._ctx.textBaseline = "middle",
                    i === n.INVERTED_DEFAULT_COLOR ? this._ctx.fillStyle = this._colors.background.css : s.is256Color(i) ? this._ctx.fillStyle = this._colors.ansi[i].css : this._ctx.fillStyle = this._colors.foreground.css,
                    this._clipRow(t, a),
                    c && (this._ctx.globalAlpha = n.DIM_OPACITY),
                    this._ctx.fillText(e, o * this._scaledCellWidth + this._scaledCharLeft, (a + .5) * this._scaledCellHeight + this._scaledCharTop),
                    this._ctx.restore()
                }
                ,
                t.prototype._clipRow = function(t, e) {
                    this._ctx.beginPath(),
                    this._ctx.rect(0, e * this._scaledCellHeight, t.cols * this._scaledCellWidth, this._scaledCellHeight),
                    this._ctx.clip()
                }
                ,
                t.prototype._getFont = function(t, e, r) {
                    return (r ? "italic" : "") + " " + (e ? t.options.fontWeightBold : t.options.fontWeight) + " " + t.options.fontSize * window.devicePixelRatio + "px " + t.options.fontFamily
                }
                ,
                t
            }();
            r.BaseRenderLayer = a
        }
        , {
            "../Buffer": 2,
            "./atlas/CharAtlasCache": 37,
            "./atlas/CharAtlasUtils": 39,
            "./atlas/Types": 44
        }],
        28: [function(t, e, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = t("../Buffer")
              , i = function() {
                function t(t) {
                    this._terminal = t,
                    this._characterJoiners = [],
                    this._nextCharacterJoinerId = 0
                }
                return t.prototype.registerCharacterJoiner = function(t) {
                    var e = {
                        id: this._nextCharacterJoinerId++,
                        handler: t
                    };
                    return this._characterJoiners.push(e),
                    e.id
                }
                ,
                t.prototype.deregisterCharacterJoiner = function(t) {
                    for (var e = 0; e < this._characterJoiners.length; e++)
                        if (this._characterJoiners[e].id === t)
                            return this._characterJoiners.splice(e, 1),
                            !0;
                    return !1
                }
                ,
                t.prototype.getJoinedCharacters = function(t) {
                    if (0 === this._characterJoiners.length)
                        return [];
                    var e = this._terminal.buffer.lines.get(t);
                    if (0 === e.length)
                        return [];
                    for (var r = [], i = this._terminal.buffer.translateBufferLineToString(t, !0), o = 0, s = 0, a = 0, l = e.get(0)[n.CHAR_DATA_ATTR_INDEX] >> 9, c = 0; c < this._terminal.cols; c++) {
                        var h = e.get(c)
                          , u = h[n.CHAR_DATA_CHAR_INDEX]
                          , f = h[n.CHAR_DATA_WIDTH_INDEX]
                          , p = h[n.CHAR_DATA_ATTR_INDEX] >> 9;
                        if (0 !== f) {
                            if (p !== l) {
                                if (1 < c - o)
                                    for (var d = this._getJoinedRanges(i, a, s, e, o), _ = 0; _ < d.length; _++)
                                        r.push(d[_]);
                                o = c,
                                a = s,
                                l = p
                            }
                            s += u.length
                        }
                    }
                    if (1 < this._terminal.cols - o)
                        for (d = this._getJoinedRanges(i, a, s, e, o),
                        _ = 0; _ < d.length; _++)
                            r.push(d[_]);
                    return r
                }
                ,
                t.prototype._getJoinedRanges = function(e, r, n, i, o) {
                    for (var s = e.substring(r, n), a = this._characterJoiners[0].handler(s), l = 1; l < this._characterJoiners.length; l++)
                        for (var c = this._characterJoiners[l].handler(s), h = 0; h < c.length; h++)
                            t._mergeRanges(a, c[h]);
                    return this._stringRangesToCellRanges(a, i, o),
                    a
                }
                ,
                t.prototype._stringRangesToCellRanges = function(t, e, r) {
                    var i = 0
                      , o = !1
                      , s = 0
                      , a = t[i];
                    if (a) {
                        for (var l = r; l < this._terminal.cols; l++) {
                            var c = e.get(l)
                              , h = c[n.CHAR_DATA_WIDTH_INDEX]
                              , u = c[n.CHAR_DATA_CHAR_INDEX].length;
                            if (0 !== h) {
                                if (!o && a[0] <= s && (a[0] = l,
                                o = !0),
                                a[1] <= s) {
                                    if (a[1] = l,
                                    !(a = t[++i]))
                                        break;
                                    o = a[0] <= s && (a[0] = l,
                                    !0)
                                }
                                s += u
                            }
                        }
                        a && (a[1] = this._terminal.cols)
                    }
                }
                ,
                t._mergeRanges = function(t, e) {
                    for (var r = !1, n = 0; n < t.length; n++) {
                        var i = t[n];
                        if (r) {
                            if (e[1] <= i[0])
                                return t[n - 1][1] = e[1],
                                t;
                            if (e[1] <= i[1])
                                return t[n - 1][1] = Math.max(e[1], i[1]),
                                t.splice(n, 1),
                                r = !1,
                                t;
                            t.splice(n, 1),
                            n--
                        } else {
                            if (e[1] <= i[0])
                                return t.splice(n, 0, e),
                                t;
                            if (e[1] <= i[1])
                                return i[0] = Math.min(e[0], i[0]),
                                t;
                            e[0] < i[1] && (i[0] = Math.min(e[0], i[0]),
                            r = !0)
                        }
                    }
                    return r ? t[t.length - 1][1] = e[1] : t.push(e),
                    t
                }
                ,
                t
            }();
            r.CharacterJoinerRegistry = i
        }
        , {
            "../Buffer": 2
        }],
        29: [function(t, e, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = l("#ffffff")
              , i = l("#000000")
              , o = l("#ffffff")
              , s = l("#000000")
              , a = {
                css: "rgba(255, 255, 255, 0.3)",
                rgba: 4294967159
            };
            function l(t) {
                return {
                    css: t,
                    rgba: parseInt(t.slice(1), 16) << 8 | 255
                }
            }
            function c(t) {
                var e = t.toString(16);
                return e.length < 2 ? "0" + e : e
            }
            r.DEFAULT_ANSI_COLORS = function() {
                for (var t = [l("#2e3436"), l("#cc0000"), l("#4e9a06"), l("#c4a000"), l("#3465a4"), l("#75507b"), l("#06989a"), l("#d3d7cf"), l("#555753"), l("#ef2929"), l("#8ae234"), l("#fce94f"), l("#729fcf"), l("#ad7fa8"), l("#34e2e2"), l("#eeeeec")], e = [0, 95, 135, 175, 215, 255], r = 0; r < 216; r++) {
                    var n = e[r / 36 % 6 | 0]
                      , i = e[r / 6 % 6 | 0]
                      , o = e[r % 6];
                    t.push({
                        css: "#" + c(n) + c(i) + c(o),
                        rgba: (n << 24 | i << 16 | o << 8 | 255) >>> 0
                    })
                }
                for (r = 0; r < 24; r++) {
                    var s = 8 + 10 * r
                      , a = c(s);
                    t.push({
                        css: "#" + a + a + a,
                        rgba: (s << 24 | s << 16 | s << 8 | 255) >>> 0
                    })
                }
                return t
            }();
            var h = function() {
                function t(t, e) {
                    this.allowTransparency = e;
                    var l = t.createElement("canvas");
                    l.width = 1,
                    l.height = 1,
                    this._ctx = l.getContext("2d"),
                    this._ctx.globalCompositeOperation = "copy",
                    this._litmusColor = this._ctx.createLinearGradient(0, 0, 1, 1),
                    this.colors = {
                        foreground: n,
                        background: i,
                        cursor: o,
                        cursorAccent: s,
                        selection: a,
                        ansi: r.DEFAULT_ANSI_COLORS.slice()
                    }
                }
                return t.prototype.setTheme = function(t) {
                    this.colors.foreground = this._parseColor(t.foreground, n),
                    this.colors.background = this._parseColor(t.background, i),
                    this.colors.cursor = this._parseColor(t.cursor, o, !0),
                    this.colors.cursorAccent = this._parseColor(t.cursorAccent, s, !0),
                    this.colors.selection = this._parseColor(t.selection, a, !0),
                    this.colors.ansi[0] = this._parseColor(t.black, r.DEFAULT_ANSI_COLORS[0]),
                    this.colors.ansi[1] = this._parseColor(t.red, r.DEFAULT_ANSI_COLORS[1]),
                    this.colors.ansi[2] = this._parseColor(t.green, r.DEFAULT_ANSI_COLORS[2]),
                    this.colors.ansi[3] = this._parseColor(t.yellow, r.DEFAULT_ANSI_COLORS[3]),
                    this.colors.ansi[4] = this._parseColor(t.blue, r.DEFAULT_ANSI_COLORS[4]),
                    this.colors.ansi[5] = this._parseColor(t.magenta, r.DEFAULT_ANSI_COLORS[5]),
                    this.colors.ansi[6] = this._parseColor(t.cyan, r.DEFAULT_ANSI_COLORS[6]),
                    this.colors.ansi[7] = this._parseColor(t.white, r.DEFAULT_ANSI_COLORS[7]),
                    this.colors.ansi[8] = this._parseColor(t.brightBlack, r.DEFAULT_ANSI_COLORS[8]),
                    this.colors.ansi[9] = this._parseColor(t.brightRed, r.DEFAULT_ANSI_COLORS[9]),
                    this.colors.ansi[10] = this._parseColor(t.brightGreen, r.DEFAULT_ANSI_COLORS[10]),
                    this.colors.ansi[11] = this._parseColor(t.brightYellow, r.DEFAULT_ANSI_COLORS[11]),
                    this.colors.ansi[12] = this._parseColor(t.brightBlue, r.DEFAULT_ANSI_COLORS[12]),
                    this.colors.ansi[13] = this._parseColor(t.brightMagenta, r.DEFAULT_ANSI_COLORS[13]),
                    this.colors.ansi[14] = this._parseColor(t.brightCyan, r.DEFAULT_ANSI_COLORS[14]),
                    this.colors.ansi[15] = this._parseColor(t.brightWhite, r.DEFAULT_ANSI_COLORS[15])
                }
                ,
                t.prototype._parseColor = function(t, e, r) {
                    if (void 0 === r && (r = this.allowTransparency),
                    !t)
                        return e;
                    if (this._ctx.fillStyle = this._litmusColor,
                    this._ctx.fillStyle = t,
                    "string" != typeof this._ctx.fillStyle)
                        return console.warn("Color: " + t + " is invalid using fallback " + e.css),
                        e;
                    this._ctx.fillRect(0, 0, 1, 1);
                    var n = this._ctx.getImageData(0, 0, 1, 1).data;
                    return r || 255 === n[3] ? {
                        css: t,
                        rgba: (n[0] << 24 | n[1] << 16 | n[2] << 8 | n[3]) >>> 0
                    } : (console.warn("Color: " + t + " is using transparency, but allowTransparency is false. Using fallback " + e.css + "."),
                    e)
                }
                ,
                t
            }();
            r.ColorManager = h
        }
        , {}],
        30: [function(t, e, r) {
            "use strict";
            var n, i = this && this.__extends || (n = function(t, e) {
                return (n = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(t, e) {
                    t.__proto__ = e
                }
                || function(t, e) {
                    for (var r in e)
                        e.hasOwnProperty(r) && (t[r] = e[r])
                }
                )(t, e)
            }
            ,
            function(t, e) {
                function r() {
                    this.constructor = t
                }
                n(t, e),
                t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype,
                new r)
            }
            );
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = t("../Buffer")
              , s = function(t) {
                function e(e, r, n) {
                    var i = t.call(this, e, "cursor", r, !0, n) || this;
                    return i._state = {
                        x: null,
                        y: null,
                        isFocused: null,
                        style: null,
                        width: null
                    },
                    i._cursorRenderers = {
                        bar: i._renderBarCursor.bind(i),
                        block: i._renderBlockCursor.bind(i),
                        underline: i._renderUnderlineCursor.bind(i)
                    },
                    i
                }
                return i(e, t),
                e.prototype.resize = function(e, r) {
                    t.prototype.resize.call(this, e, r),
                    this._state = {
                        x: null,
                        y: null,
                        isFocused: null,
                        style: null,
                        width: null
                    }
                }
                ,
                e.prototype.reset = function(t) {
                    this._clearCursor(),
                    this._cursorBlinkStateManager && (this._cursorBlinkStateManager.dispose(),
                    this._cursorBlinkStateManager = null,
                    this.onOptionsChanged(t))
                }
                ,
                e.prototype.onBlur = function(t) {
                    this._cursorBlinkStateManager && this._cursorBlinkStateManager.pause(),
                    t.refresh(t.buffer.y, t.buffer.y)
                }
                ,
                e.prototype.onFocus = function(t) {
                    this._cursorBlinkStateManager ? this._cursorBlinkStateManager.resume(t) : t.refresh(t.buffer.y, t.buffer.y)
                }
                ,
                e.prototype.onOptionsChanged = function(t) {
                    var e = this;
                    t.options.cursorBlink ? this._cursorBlinkStateManager || (this._cursorBlinkStateManager = new a(t,function() {
                        e._render(t, !0)
                    }
                    )) : (this._cursorBlinkStateManager && (this._cursorBlinkStateManager.dispose(),
                    this._cursorBlinkStateManager = null),
                    t.refresh(t.buffer.y, t.buffer.y))
                }
                ,
                e.prototype.onCursorMove = function(t) {
                    this._cursorBlinkStateManager && this._cursorBlinkStateManager.restartBlinkAnimation(t)
                }
                ,
                e.prototype.onGridChanged = function(t, e, r) {
                    !this._cursorBlinkStateManager || this._cursorBlinkStateManager.isPaused ? this._render(t, !1) : this._cursorBlinkStateManager.restartBlinkAnimation(t)
                }
                ,
                e.prototype._render = function(t, e) {
                    if (t.cursorState && !t.cursorHidden) {
                        var r = t.buffer.ybase + t.buffer.y
                          , n = r - t.buffer.ydisp;
                        if (n < 0 || n >= t.rows)
                            this._clearCursor();
                        else {
                            var i = t.buffer.lines.get(r).get(t.buffer.x);
                            if (i) {
                                if (!t.isFocused)
                                    return this._clearCursor(),
                                    this._ctx.save(),
                                    this._ctx.fillStyle = this._colors.cursor.css,
                                    this._renderBlurCursor(t, t.buffer.x, n, i),
                                    this._ctx.restore(),
                                    this._state.x = t.buffer.x,
                                    this._state.y = n,
                                    this._state.isFocused = !1,
                                    this._state.style = t.options.cursorStyle,
                                    void (this._state.width = i[o.CHAR_DATA_WIDTH_INDEX]);
                                if (!this._cursorBlinkStateManager || this._cursorBlinkStateManager.isCursorVisible) {
                                    if (this._state) {
                                        if (this._state.x === t.buffer.x && this._state.y === n && this._state.isFocused === t.isFocused && this._state.style === t.options.cursorStyle && this._state.width === i[o.CHAR_DATA_WIDTH_INDEX])
                                            return;
                                        this._clearCursor()
                                    }
                                    this._ctx.save(),
                                    this._cursorRenderers[t.options.cursorStyle || "block"](t, t.buffer.x, n, i),
                                    this._ctx.restore(),
                                    this._state.x = t.buffer.x,
                                    this._state.y = n,
                                    this._state.isFocused = !1,
                                    this._state.style = t.options.cursorStyle,
                                    this._state.width = i[o.CHAR_DATA_WIDTH_INDEX]
                                } else
                                    this._clearCursor()
                            }
                        }
                    } else
                        this._clearCursor()
                }
                ,
                e.prototype._clearCursor = function() {
                    this._state && (this.clearCells(this._state.x, this._state.y, this._state.width, 1),
                    this._state = {
                        x: null,
                        y: null,
                        isFocused: null,
                        style: null,
                        width: null
                    })
                }
                ,
                e.prototype._renderBarCursor = function(t, e, r, n) {
                    this._ctx.save(),
                    this._ctx.fillStyle = this._colors.cursor.css,
                    this.fillLeftLineAtCell(e, r),
                    this._ctx.restore()
                }
                ,
                e.prototype._renderBlockCursor = function(t, e, r, n) {
                    this._ctx.save(),
                    this._ctx.fillStyle = this._colors.cursor.css,
                    this.fillCells(e, r, n[o.CHAR_DATA_WIDTH_INDEX], 1),
                    this._ctx.fillStyle = this._colors.cursorAccent.css,
                    this.fillCharTrueColor(t, n, e, r),
                    this._ctx.restore()
                }
                ,
                e.prototype._renderUnderlineCursor = function(t, e, r, n) {
                    this._ctx.save(),
                    this._ctx.fillStyle = this._colors.cursor.css,
                    this.fillBottomLineAtCells(e, r),
                    this._ctx.restore()
                }
                ,
                e.prototype._renderBlurCursor = function(t, e, r, n) {
                    this._ctx.save(),
                    this._ctx.strokeStyle = this._colors.cursor.css,
                    this.strokeRectAtCell(e, r, n[o.CHAR_DATA_WIDTH_INDEX], 1),
                    this._ctx.restore()
                }
                ,
                e
            }(t("./BaseRenderLayer").BaseRenderLayer);
            r.CursorRenderLayer = s;
            var a = function() {
                function t(t, e) {
                    this._renderCallback = e,
                    this.isCursorVisible = !0,
                    t.isFocused && this._restartInterval()
                }
                return Object.defineProperty(t.prototype, "isPaused", {
                    get: function() {
                        return !(this._blinkStartTimeout || this._blinkInterval)
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                t.prototype.dispose = function() {
                    this._blinkInterval && (window.clearInterval(this._blinkInterval),
                    this._blinkInterval = null),
                    this._blinkStartTimeout && (window.clearTimeout(this._blinkStartTimeout),
                    this._blinkStartTimeout = null),
                    this._animationFrame && (window.cancelAnimationFrame(this._animationFrame),
                    this._animationFrame = null)
                }
                ,
                t.prototype.restartBlinkAnimation = function(t) {
                    var e = this;
                    this.isPaused || (this._animationTimeRestarted = Date.now(),
                    this.isCursorVisible = !0,
                    this._animationFrame || (this._animationFrame = window.requestAnimationFrame(function() {
                        e._renderCallback(),
                        e._animationFrame = null
                    })))
                }
                ,
                t.prototype._restartInterval = function(t) {
                    var e = this;
                    void 0 === t && (t = 600),
                    this._blinkInterval && window.clearInterval(this._blinkInterval),
                    this._blinkStartTimeout = setTimeout(function() {
                        if (e._animationTimeRestarted) {
                            var t = 600 - (Date.now() - e._animationTimeRestarted);
                            if (e._animationTimeRestarted = null,
                            0 < t)
                                return void e._restartInterval(t)
                        }
                        e.isCursorVisible = !1,
                        e._animationFrame = window.requestAnimationFrame(function() {
                            e._renderCallback(),
                            e._animationFrame = null
                        }),
                        e._blinkInterval = setInterval(function() {
                            if (e._animationTimeRestarted) {
                                var t = 600 - (Date.now() - e._animationTimeRestarted);
                                return e._animationTimeRestarted = null,
                                void e._restartInterval(t)
                            }
                            e.isCursorVisible = !e.isCursorVisible,
                            e._animationFrame = window.requestAnimationFrame(function() {
                                e._renderCallback(),
                                e._animationFrame = null
                            })
                        }, 600)
                    }, t)
                }
                ,
                t.prototype.pause = function() {
                    this.isCursorVisible = !0,
                    this._blinkInterval && (window.clearInterval(this._blinkInterval),
                    this._blinkInterval = null),
                    this._blinkStartTimeout && (window.clearTimeout(this._blinkStartTimeout),
                    this._blinkStartTimeout = null),
                    this._animationFrame && (window.cancelAnimationFrame(this._animationFrame),
                    this._animationFrame = null)
                }
                ,
                t.prototype.resume = function(t) {
                    this._animationTimeRestarted = null,
                    this._restartInterval(),
                    this.restartBlinkAnimation(t)
                }
                ,
                t
            }()
        }
        , {
            "../Buffer": 2,
            "./BaseRenderLayer": 27
        }],
        31: [function(t, e, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = function() {
                function t() {
                    this.cache = []
                }
                return t.prototype.resize = function(t, e) {
                    for (var r = 0; r < t; r++) {
                        this.cache.length <= r && this.cache.push([]);
                        for (var n = this.cache[r].length; n < e; n++)
                            this.cache[r].push(null);
                        this.cache[r].length = e
                    }
                    this.cache.length = t
                }
                ,
                t.prototype.clear = function() {
                    for (var t = 0; t < this.cache.length; t++)
                        for (var e = 0; e < this.cache[t].length; e++)
                            this.cache[t][e] = null
                }
                ,
                t
            }();
            r.GridCache = n
        }
        , {}],
        32: [function(t, e, r) {
            "use strict";
            var n, i = this && this.__extends || (n = function(t, e) {
                return (n = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(t, e) {
                    t.__proto__ = e
                }
                || function(t, e) {
                    for (var r in e)
                        e.hasOwnProperty(r) && (t[r] = e[r])
                }
                )(t, e)
            }
            ,
            function(t, e) {
                function r() {
                    this.constructor = t
                }
                n(t, e),
                t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype,
                new r)
            }
            );
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = t("./BaseRenderLayer")
              , s = t("./atlas/Types")
              , a = t("./atlas/CharAtlasUtils")
              , l = function(t) {
                function e(e, r, n, i) {
                    var o = t.call(this, e, "link", r, !0, n) || this;
                    return o._state = null,
                    i.linkifier.on("linkhover", function(t) {
                        return o._onLinkHover(t)
                    }),
                    i.linkifier.on("linkleave", function(t) {
                        return o._onLinkLeave(t)
                    }),
                    o
                }
                return i(e, t),
                e.prototype.resize = function(e, r) {
                    t.prototype.resize.call(this, e, r),
                    this._state = null
                }
                ,
                e.prototype.reset = function(t) {
                    this._clearCurrentLink()
                }
                ,
                e.prototype._clearCurrentLink = function() {
                    if (this._state) {
                        this.clearCells(this._state.x1, this._state.y1, this._state.cols - this._state.x1, 1);
                        var t = this._state.y2 - this._state.y1 - 1;
                        0 < t && this.clearCells(0, this._state.y1 + 1, this._state.cols, t),
                        this.clearCells(0, this._state.y2, this._state.x2, 1),
                        this._state = null
                    }
                }
                ,
                e.prototype._onLinkHover = function(t) {
                    if (t.fg === s.INVERTED_DEFAULT_COLOR ? this._ctx.fillStyle = this._colors.background.css : a.is256Color(t.fg) ? this._ctx.fillStyle = this._colors.ansi[t.fg].css : this._ctx.fillStyle = this._colors.foreground.css,
                    t.y1 === t.y2)
                        this.fillBottomLineAtCells(t.x1, t.y1, t.x2 - t.x1);
                    else {
                        this.fillBottomLineAtCells(t.x1, t.y1, t.cols - t.x1);
                        for (var e = t.y1 + 1; e < t.y2; e++)
                            this.fillBottomLineAtCells(0, e, t.cols);
                        this.fillBottomLineAtCells(0, t.y2, t.x2)
                    }
                    this._state = t
                }
                ,
                e.prototype._onLinkLeave = function(t) {
                    this._clearCurrentLink()
                }
                ,
                e
            }(o.BaseRenderLayer);
            r.LinkRenderLayer = l
        }
        , {
            "./BaseRenderLayer": 27,
            "./atlas/CharAtlasUtils": 39,
            "./atlas/Types": 44
        }],
        33: [function(t, e, r) {
            "use strict";
            var n, i = this && this.__extends || (n = function(t, e) {
                return (n = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(t, e) {
                    t.__proto__ = e
                }
                || function(t, e) {
                    for (var r in e)
                        e.hasOwnProperty(r) && (t[r] = e[r])
                }
                )(t, e)
            }
            ,
            function(t, e) {
                function r() {
                    this.constructor = t
                }
                n(t, e),
                t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype,
                new r)
            }
            );
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = t("./TextRenderLayer")
              , s = t("./SelectionRenderLayer")
              , a = t("./CursorRenderLayer")
              , l = t("./ColorManager")
              , c = t("./LinkRenderLayer")
              , h = t("../common/EventEmitter")
              , u = t("../ui/RenderDebouncer")
              , f = t("../ui/ScreenDprMonitor")
              , p = t("../renderer/CharacterJoinerRegistry")
              , d = function(t) {
                function e(e, r) {
                    var n = t.call(this) || this;
                    n._terminal = e,
                    n._isPaused = !1,
                    n._needsFullRefresh = !1;
                    var i = n._terminal.options.allowTransparency;
                    if (n.colorManager = new l.ColorManager(document,i),
                    n._characterJoinerRegistry = new p.CharacterJoinerRegistry(e),
                    r && n.colorManager.setTheme(r),
                    n._renderLayers = [new o.TextRenderLayer(n._terminal.screenElement,0,n.colorManager.colors,n._characterJoinerRegistry,i), new s.SelectionRenderLayer(n._terminal.screenElement,1,n.colorManager.colors), new c.LinkRenderLayer(n._terminal.screenElement,2,n.colorManager.colors,n._terminal), new a.CursorRenderLayer(n._terminal.screenElement,3,n.colorManager.colors)],
                    n.dimensions = {
                        scaledCharWidth: null,
                        scaledCharHeight: null,
                        scaledCellWidth: null,
                        scaledCellHeight: null,
                        scaledCharLeft: null,
                        scaledCharTop: null,
                        scaledCanvasWidth: null,
                        scaledCanvasHeight: null,
                        canvasWidth: null,
                        canvasHeight: null,
                        actualCellWidth: null,
                        actualCellHeight: null
                    },
                    n._devicePixelRatio = window.devicePixelRatio,
                    n._updateDimensions(),
                    n.onOptionsChanged(),
                    n._renderDebouncer = new u.RenderDebouncer(n._terminal,n._renderRows.bind(n)),
                    n._screenDprMonitor = new f.ScreenDprMonitor,
                    n._screenDprMonitor.setListener(function() {
                        return n.onWindowResize(window.devicePixelRatio)
                    }),
                    n.register(n._screenDprMonitor),
                    "IntersectionObserver"in window) {
                        var h = new IntersectionObserver(function(t) {
                            return n.onIntersectionChange(t[0])
                        }
                        ,{
                            threshold: 0
                        });
                        h.observe(n._terminal.element),
                        n.register({
                            dispose: function() {
                                return h.disconnect()
                            }
                        })
                    }
                    return n
                }
                return i(e, t),
                e.prototype.dispose = function() {
                    t.prototype.dispose.call(this),
                    this._renderLayers.forEach(function(t) {
                        return t.dispose()
                    })
                }
                ,
                e.prototype.onIntersectionChange = function(t) {
                    this._isPaused = 0 === t.intersectionRatio,
                    !this._isPaused && this._needsFullRefresh && this._terminal.refresh(0, this._terminal.rows - 1)
                }
                ,
                e.prototype.onWindowResize = function(t) {
                    this._devicePixelRatio !== t && (this._devicePixelRatio = t,
                    this.onResize(this._terminal.cols, this._terminal.rows))
                }
                ,
                e.prototype.setTheme = function(t) {
                    var e = this;
                    return this.colorManager.setTheme(t),
                    this._renderLayers.forEach(function(t) {
                        t.onThemeChanged(e._terminal, e.colorManager.colors),
                        t.reset(e._terminal)
                    }),
                    this._isPaused ? this._needsFullRefresh = !0 : this._terminal.refresh(0, this._terminal.rows - 1),
                    this.colorManager.colors
                }
                ,
                e.prototype.onResize = function(t, e) {
                    var r = this;
                    this._updateDimensions(),
                    this._renderLayers.forEach(function(t) {
                        return t.resize(r._terminal, r.dimensions)
                    }),
                    this._isPaused ? this._needsFullRefresh = !0 : this._terminal.refresh(0, this._terminal.rows - 1),
                    this._terminal.screenElement.style.width = this.dimensions.canvasWidth + "px",
                    this._terminal.screenElement.style.height = this.dimensions.canvasHeight + "px",
                    this.emit("resize", {
                        width: this.dimensions.canvasWidth,
                        height: this.dimensions.canvasHeight
                    })
                }
                ,
                e.prototype.onCharSizeChanged = function() {
                    this.onResize(this._terminal.cols, this._terminal.rows)
                }
                ,
                e.prototype.onBlur = function() {
                    var t = this;
                    this._runOperation(function(e) {
                        return e.onBlur(t._terminal)
                    })
                }
                ,
                e.prototype.onFocus = function() {
                    var t = this;
                    this._runOperation(function(e) {
                        return e.onFocus(t._terminal)
                    })
                }
                ,
                e.prototype.onSelectionChanged = function(t, e, r) {
                    var n = this;
                    void 0 === r && (r = !1),
                    this._runOperation(function(i) {
                        return i.onSelectionChanged(n._terminal, t, e, r)
                    })
                }
                ,
                e.prototype.onCursorMove = function() {
                    var t = this;
                    this._runOperation(function(e) {
                        return e.onCursorMove(t._terminal)
                    })
                }
                ,
                e.prototype.onOptionsChanged = function() {
                    var t = this;
                    this.colorManager.allowTransparency = this._terminal.options.allowTransparency,
                    this._runOperation(function(e) {
                        return e.onOptionsChanged(t._terminal)
                    })
                }
                ,
                e.prototype.clear = function() {
                    var t = this;
                    this._runOperation(function(e) {
                        return e.reset(t._terminal)
                    })
                }
                ,
                e.prototype._runOperation = function(t) {
                    this._isPaused ? this._needsFullRefresh = !0 : this._renderLayers.forEach(function(e) {
                        return t(e)
                    })
                }
                ,
                e.prototype.refreshRows = function(t, e) {
                    this._isPaused ? this._needsFullRefresh = !0 : this._renderDebouncer.refresh(t, e)
                }
                ,
                e.prototype._renderRows = function(t, e) {
                    var r = this;
                    this._renderLayers.forEach(function(n) {
                        return n.onGridChanged(r._terminal, t, e)
                    }),
                    this._terminal.emit("refresh", {
                        start: t,
                        end: e
                    })
                }
                ,
                e.prototype._updateDimensions = function() {
                    this._terminal.charMeasure.width && this._terminal.charMeasure.height && (this.dimensions.scaledCharWidth = Math.floor(this._terminal.charMeasure.width * window.devicePixelRatio),
                    this.dimensions.scaledCharHeight = Math.ceil(this._terminal.charMeasure.height * window.devicePixelRatio),
                    this.dimensions.scaledCellHeight = Math.floor(this.dimensions.scaledCharHeight * this._terminal.options.lineHeight),
                    this.dimensions.scaledCharTop = 1 === this._terminal.options.lineHeight ? 0 : Math.round((this.dimensions.scaledCellHeight - this.dimensions.scaledCharHeight) / 2),
                    this.dimensions.scaledCellWidth = this.dimensions.scaledCharWidth + Math.round(this._terminal.options.letterSpacing),
                    this.dimensions.scaledCharLeft = Math.floor(this._terminal.options.letterSpacing / 2),
                    this.dimensions.scaledCanvasHeight = this._terminal.rows * this.dimensions.scaledCellHeight,
                    this.dimensions.scaledCanvasWidth = this._terminal.cols * this.dimensions.scaledCellWidth,
                    this.dimensions.canvasHeight = Math.round(this.dimensions.scaledCanvasHeight / window.devicePixelRatio),
                    this.dimensions.canvasWidth = Math.round(this.dimensions.scaledCanvasWidth / window.devicePixelRatio),
                    this.dimensions.actualCellHeight = this.dimensions.canvasHeight / this._terminal.rows,
                    this.dimensions.actualCellWidth = this.dimensions.canvasWidth / this._terminal.cols)
                }
                ,
                e.prototype.registerCharacterJoiner = function(t) {
                    return this._characterJoinerRegistry.registerCharacterJoiner(t)
                }
                ,
                e.prototype.deregisterCharacterJoiner = function(t) {
                    return this._characterJoinerRegistry.deregisterCharacterJoiner(t)
                }
                ,
                e
            }(h.EventEmitter);
            r.Renderer = d
        }
        , {
            "../common/EventEmitter": 18,
            "../renderer/CharacterJoinerRegistry": 28,
            "../ui/RenderDebouncer": 52,
            "../ui/ScreenDprMonitor": 53,
            "./ColorManager": 29,
            "./CursorRenderLayer": 30,
            "./LinkRenderLayer": 32,
            "./SelectionRenderLayer": 34,
            "./TextRenderLayer": 35
        }],
        34: [function(t, e, r) {
            "use strict";
            var n, i = this && this.__extends || (n = function(t, e) {
                return (n = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(t, e) {
                    t.__proto__ = e
                }
                || function(t, e) {
                    for (var r in e)
                        e.hasOwnProperty(r) && (t[r] = e[r])
                }
                )(t, e)
            }
            ,
            function(t, e) {
                function r() {
                    this.constructor = t
                }
                n(t, e),
                t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype,
                new r)
            }
            );
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = function(t) {
                function e(e, r, n) {
                    var i = t.call(this, e, "selection", r, !0, n) || this;
                    return i._clearState(),
                    i
                }
                return i(e, t),
                e.prototype._clearState = function() {
                    this._state = {
                        start: null,
                        end: null,
                        columnSelectMode: null,
                        ydisp: null
                    }
                }
                ,
                e.prototype.resize = function(e, r) {
                    t.prototype.resize.call(this, e, r),
                    this._clearState()
                }
                ,
                e.prototype.reset = function(t) {
                    this._state.start && this._state.end && (this._clearState(),
                    this.clearAll())
                }
                ,
                e.prototype.onSelectionChanged = function(t, e, r, n) {
                    if (this._didStateChange(e, r, n, t.buffer.ydisp) && (this.clearAll(),
                    e && r)) {
                        var i = e[1] - t.buffer.ydisp
                          , o = r[1] - t.buffer.ydisp
                          , s = Math.max(i, 0)
                          , a = Math.min(o, t.rows - 1);
                        if (!(s >= t.rows || a < 0)) {
                            if (this._ctx.fillStyle = this._colors.selection.css,
                            n) {
                                var l = e[0]
                                  , c = r[0] - l
                                  , h = a - s + 1;
                                this.fillCells(l, s, c, h)
                            } else {
                                l = i === s ? e[0] : 0;
                                var u = s === a ? r[0] : t.cols;
                                this.fillCells(l, s, u - l, 1);
                                var f = Math.max(a - s - 1, 0);
                                if (this.fillCells(0, s + 1, t.cols, f),
                                s !== a) {
                                    var p = o === a ? r[0] : t.cols;
                                    this.fillCells(0, a, p, 1)
                                }
                            }
                            this._state.start = [e[0], e[1]],
                            this._state.end = [r[0], r[1]],
                            this._state.columnSelectMode = n,
                            this._state.ydisp = t.buffer.ydisp
                        }
                    }
                }
                ,
                e.prototype._didStateChange = function(t, e, r, n) {
                    return !this._areCoordinatesEqual(t, this._state.start) || !this._areCoordinatesEqual(e, this._state.end) || r !== this._state.columnSelectMode || n !== this._state.ydisp
                }
                ,
                e.prototype._areCoordinatesEqual = function(t, e) {
                    return !(!t || !e) && t[0] === e[0] && t[1] === e[1]
                }
                ,
                e
            }(t("./BaseRenderLayer").BaseRenderLayer);
            r.SelectionRenderLayer = o
        }
        , {
            "./BaseRenderLayer": 27
        }],
        35: [function(t, e, r) {
            "use strict";
            var n, i = this && this.__extends || (n = function(t, e) {
                return (n = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(t, e) {
                    t.__proto__ = e
                }
                || function(t, e) {
                    for (var r in e)
                        e.hasOwnProperty(r) && (t[r] = e[r])
                }
                )(t, e)
            }
            ,
            function(t, e) {
                function r() {
                    this.constructor = t
                }
                n(t, e),
                t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype,
                new r)
            }
            );
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = t("../Buffer")
              , s = t("./atlas/Types")
              , a = t("./GridCache")
              , l = t("./BaseRenderLayer")
              , c = t("./atlas/CharAtlasUtils")
              , h = function(t) {
                function e(e, r, n, i, o) {
                    var s = t.call(this, e, "text", r, o, n) || this;
                    return s._characterOverlapCache = {},
                    s._state = new a.GridCache,
                    s._characterJoinerRegistry = i,
                    s
                }
                return i(e, t),
                e.prototype.resize = function(e, r) {
                    t.prototype.resize.call(this, e, r);
                    var n = this._getFont(e, !1, !1);
                    this._characterWidth === r.scaledCharWidth && this._characterFont === n || (this._characterWidth = r.scaledCharWidth,
                    this._characterFont = n,
                    this._characterOverlapCache = {}),
                    this._state.clear(),
                    this._state.resize(e.cols, e.rows)
                }
                ,
                e.prototype.reset = function(t) {
                    this._state.clear(),
                    this.clearAll()
                }
                ,
                e.prototype._forEachCell = function(t, e, r, n, i) {
                    for (var a = e; a <= r; a++)
                        for (var l = a + t.buffer.ydisp, c = t.buffer.lines.get(l), h = n ? n.getJoinedCharacters(l) : [], u = 0; u < t.cols; u++) {
                            var f = c.get(u)
                              , p = f[o.CHAR_DATA_CODE_INDEX] || o.WHITESPACE_CELL_CODE
                              , d = f[o.CHAR_DATA_CHAR_INDEX] || o.WHITESPACE_CELL_CHAR
                              , _ = f[o.CHAR_DATA_ATTR_INDEX]
                              , m = f[o.CHAR_DATA_WIDTH_INDEX]
                              , y = !1
                              , g = u;
                            if (0 !== m) {
                                if (0 < h.length && u === h[0][0]) {
                                    y = !0;
                                    var v = h.shift();
                                    d = t.buffer.translateBufferLineToString(l, !0, v[0], v[1]),
                                    m = v[1] - v[0],
                                    p = 1 / 0,
                                    g = v[1] - 1
                                }
                                !y && this._isOverlapping(f) && g < c.length - 1 && c.get(g + 1)[o.CHAR_DATA_CODE_INDEX] === o.NULL_CELL_CODE && (m = 2);
                                var C = _ >> 18
                                  , b = 511 & _
                                  , w = _ >> 9 & 511;
                                if (8 & C) {
                                    var E = b;
                                    b = w,
                                    (w = E) === s.DEFAULT_COLOR && (w = s.INVERTED_DEFAULT_COLOR),
                                    b === s.DEFAULT_COLOR && (b = s.INVERTED_DEFAULT_COLOR)
                                }
                                i(p, d, m, u, a, w, b, C),
                                u = g
                            }
                        }
                }
                ,
                e.prototype._drawBackground = function(t, e, r) {
                    var n = this
                      , i = this._ctx
                      , o = t.cols
                      , a = 0
                      , l = 0
                      , h = null;
                    i.save(),
                    this._forEachCell(t, e, r, null, function(t, e, r, u, f, p, d, _) {
                        var m = null;
                        d === s.INVERTED_DEFAULT_COLOR ? m = n._colors.foreground.css : c.is256Color(d) && (m = n._colors.ansi[d].css),
                        null === h && (a = u,
                        l = f),
                        f !== l ? (i.fillStyle = h,
                        n.fillCells(a, l, o - a, 1),
                        a = u,
                        l = f) : h !== m && (i.fillStyle = h,
                        n.fillCells(a, l, u - a, 1),
                        a = u,
                        l = f),
                        h = m
                    }),
                    null !== h && (i.fillStyle = h,
                    this.fillCells(a, l, o - a, 1)),
                    i.restore()
                }
                ,
                e.prototype._drawForeground = function(t, e, r) {
                    var n = this;
                    this._forEachCell(t, e, r, this._characterJoinerRegistry, function(e, r, i, o, a, l, h, u) {
                        16 & u || (2 & u && (n._ctx.save(),
                        l === s.INVERTED_DEFAULT_COLOR ? n._ctx.fillStyle = n._colors.background.css : c.is256Color(l) ? n._ctx.fillStyle = n._colors.ansi[l].css : n._ctx.fillStyle = n._colors.foreground.css,
                        n.fillBottomLineAtCells(o, a, i),
                        n._ctx.restore()),
                        n.drawChars(t, r, e, i, o, a, l, h, !!(1 & u), !!(32 & u), !!(64 & u)))
                    })
                }
                ,
                e.prototype.onGridChanged = function(t, e, r) {
                    0 !== this._state.cache.length && (this._charAtlas && this._charAtlas.beginFrame(),
                    this.clearCells(0, e, t.cols, r - e + 1),
                    this._drawBackground(t, e, r),
                    this._drawForeground(t, e, r))
                }
                ,
                e.prototype.onOptionsChanged = function(t) {
                    this.setTransparency(t, t.options.allowTransparency)
                }
                ,
                e.prototype._isOverlapping = function(t) {
                    if (1 !== t[o.CHAR_DATA_WIDTH_INDEX])
                        return !1;
                    if (t[o.CHAR_DATA_CODE_INDEX] < 256)
                        return !1;
                    var e = t[o.CHAR_DATA_CHAR_INDEX];
                    if (this._characterOverlapCache.hasOwnProperty(e))
                        return this._characterOverlapCache[e];
                    this._ctx.save(),
                    this._ctx.font = this._characterFont;
                    var r = Math.floor(this._ctx.measureText(e).width) > this._characterWidth;
                    return this._ctx.restore(),
                    this._characterOverlapCache[e] = r
                }
                ,
                e
            }(l.BaseRenderLayer);
            r.TextRenderLayer = h
        }
        , {
            "../Buffer": 2,
            "./BaseRenderLayer": 27,
            "./GridCache": 31,
            "./atlas/CharAtlasUtils": 39,
            "./atlas/Types": 44
        }],
        36: [function(t, e, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = function() {
                function t() {
                    this._didWarmUp = !1
                }
                return t.prototype.dispose = function() {}
                ,
                t.prototype.warmUp = function() {
                    this._didWarmUp || (this._doWarmUp(),
                    this._didWarmUp = !0)
                }
                ,
                t.prototype._doWarmUp = function() {}
                ,
                t.prototype.beginFrame = function() {}
                ,
                t
            }();
            r.default = n
        }
        , {}],
        37: [function(t, e, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = t("./CharAtlasUtils")
              , i = t("./DynamicCharAtlas")
              , o = t("./NoneCharAtlas")
              , s = t("./StaticCharAtlas")
              , a = {
                none: o.default,
                static: s.default,
                dynamic: i.default
            }
              , l = [];
            r.acquireCharAtlas = function(t, e, r, i) {
                for (var o = n.generateConfig(r, i, t, e), s = 0; s < l.length; s++) {
                    var c = (h = l[s]).ownedBy.indexOf(t);
                    if (0 <= c) {
                        if (n.configEquals(h.config, o))
                            return h.atlas;
                        1 === h.ownedBy.length ? (h.atlas.dispose(),
                        l.splice(s, 1)) : h.ownedBy.splice(c, 1);
                        break
                    }
                }
                for (s = 0; s < l.length; s++) {
                    var h = l[s];
                    if (n.configEquals(h.config, o))
                        return h.ownedBy.push(t),
                        h.atlas
                }
                var u = {
                    atlas: new a[t.options.experimentalCharAtlas](document,o),
                    config: o,
                    ownedBy: [t]
                };
                return l.push(u),
                u.atlas
            }
            ,
            r.removeTerminalFromCache = function(t) {
                for (var e = 0; e < l.length; e++) {
                    var r = l[e].ownedBy.indexOf(t);
                    if (-1 !== r) {
                        1 === l[e].ownedBy.length ? (l[e].atlas.dispose(),
                        l.splice(e, 1)) : l[e].ownedBy.splice(r, 1);
                        break
                    }
                }
            }
        }
        , {
            "./CharAtlasUtils": 39,
            "./DynamicCharAtlas": 40,
            "./NoneCharAtlas": 42,
            "./StaticCharAtlas": 43
        }],
        38: [function(t, e, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = t("../../core/Platform")
              , i = t("./Types");
            function o(t, e) {
                for (var r = !0, n = e.rgba >>> 24, i = e.rgba >>> 16 & 255, o = e.rgba >>> 8 & 255, s = 0; s < t.data.length; s += 4)
                    t.data[s] === n && t.data[s + 1] === i && t.data[s + 2] === o ? t.data[s + 3] = 0 : r = !1;
                return r
            }
            function s(t, e) {
                return t + " " + e.fontSize * e.devicePixelRatio + "px " + e.fontFamily
            }
            r.generateStaticCharAtlasTexture = function(t, e, r) {
                var a = r.scaledCharWidth + i.CHAR_ATLAS_CELL_SPACING
                  , l = r.scaledCharHeight + i.CHAR_ATLAS_CELL_SPACING
                  , c = e(255 * a, 34 * l)
                  , h = c.getContext("2d", {
                    alpha: r.allowTransparency
                });
                h.fillStyle = r.colors.background.css,
                h.fillRect(0, 0, c.width, c.height),
                h.save(),
                h.fillStyle = r.colors.foreground.css,
                h.font = s(r.fontWeight, r),
                h.textBaseline = "middle";
                for (var u = 0; u < 256; u++)
                    h.save(),
                    h.beginPath(),
                    h.rect(u * a, 0, a, l),
                    h.clip(),
                    h.fillText(String.fromCharCode(u), u * a, l / 2),
                    h.restore();
                h.save(),
                h.font = s(r.fontWeightBold, r);
                for (u = 0; u < 256; u++)
                    h.save(),
                    h.beginPath(),
                    h.rect(u * a, l, a, l),
                    h.clip(),
                    h.fillText(String.fromCharCode(u), u * a, 1.5 * l),
                    h.restore();
                h.restore(),
                h.font = s(r.fontWeight, r);
                for (var f = 0; f < 16; f++) {
                    var p = (f + 2) * l;
                    for (u = 0; u < 256; u++)
                        h.save(),
                        h.beginPath(),
                        h.rect(u * a, p, a, l),
                        h.clip(),
                        h.fillStyle = r.colors.ansi[f].css,
                        h.fillText(String.fromCharCode(u), u * a, p + l / 2),
                        h.restore()
                }
                h.font = s(r.fontWeightBold, r);
                for (f = 0; f < 16; f++)
                    for (p = (f + 2 + 16) * l,
                    u = 0; u < 256; u++)
                        h.save(),
                        h.beginPath(),
                        h.rect(u * a, p, a, l),
                        h.clip(),
                        h.fillStyle = r.colors.ansi[f].css,
                        h.fillText(String.fromCharCode(u), u * a, p + l / 2),
                        h.restore();
                if (h.restore(),
                !("createImageBitmap"in t) || n.isFirefox || n.isSafari)
                    return c;
                var d = h.getImageData(0, 0, c.width, c.height);
                return o(d, r.colors.background),
                t.createImageBitmap(d)
            }
            ,
            r.clearColor = o
        }
        , {
            "../../core/Platform": 22,
            "./Types": 44
        }],
        39: [function(t, e, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = t("./Types");
            r.generateConfig = function(t, e, r, n) {
                var i = {
                    foreground: n.foreground,
                    background: n.background,
                    cursor: null,
                    cursorAccent: null,
                    selection: null,
                    ansi: n.ansi.slice(0, 16)
                };
                return {
                    type: r.options.experimentalCharAtlas,
                    devicePixelRatio: window.devicePixelRatio,
                    scaledCharWidth: t,
                    scaledCharHeight: e,
                    fontFamily: r.options.fontFamily,
                    fontSize: r.options.fontSize,
                    fontWeight: r.options.fontWeight,
                    fontWeightBold: r.options.fontWeightBold,
                    allowTransparency: r.options.allowTransparency,
                    colors: i
                }
            }
            ,
            r.configEquals = function(t, e) {
                for (var r = 0; r < t.colors.ansi.length; r++)
                    if (t.colors.ansi[r].rgba !== e.colors.ansi[r].rgba)
                        return !1;
                return t.type === e.type && t.devicePixelRatio === e.devicePixelRatio && t.fontFamily === e.fontFamily && t.fontSize === e.fontSize && t.fontWeight === e.fontWeight && t.fontWeightBold === e.fontWeightBold && t.allowTransparency === e.allowTransparency && t.scaledCharWidth === e.scaledCharWidth && t.scaledCharHeight === e.scaledCharHeight && t.colors.foreground === e.colors.foreground && t.colors.background === e.colors.background
            }
            ,
            r.is256Color = function(t) {
                return t < n.DEFAULT_COLOR
            }
        }
        , {
            "./Types": 44
        }],
        40: [function(t, e, r) {
            "use strict";
            var n, i = this && this.__extends || (n = function(t, e) {
                return (n = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(t, e) {
                    t.__proto__ = e
                }
                || function(t, e) {
                    for (var r in e)
                        e.hasOwnProperty(r) && (t[r] = e[r])
                }
                )(t, e)
            }
            ,
            function(t, e) {
                function r() {
                    this.constructor = t
                }
                n(t, e),
                t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype,
                new r)
            }
            );
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = t("./Types")
              , s = t("./BaseCharAtlas")
              , a = t("../ColorManager")
              , l = t("./CharAtlasGenerator")
              , c = t("./LRUMap")
              , h = t("../../core/Platform")
              , u = {
                css: "rgba(0, 0, 0, 0)",
                rgba: 0
            };
            function f(t) {
                return t.code << 21 | t.bg << 12 | t.fg << 3 | (t.bold ? 0 : 4) + (t.dim ? 0 : 2) + (t.italic ? 0 : 1)
            }
            r.getGlyphCacheKey = f;
            var p = function(t) {
                function e(e, r) {
                    var n = t.call(this) || this;
                    n._config = r,
                    n._drawToCacheCount = 0,
                    n._glyphsWaitingOnBitmap = [],
                    n._bitmapCommitTimeout = null,
                    n._bitmap = null,
                    n._cacheCanvas = e.createElement("canvas"),
                    n._cacheCanvas.width = 1024,
                    n._cacheCanvas.height = 1024,
                    n._cacheCtx = n._cacheCanvas.getContext("2d", {
                        alpha: !0
                    });
                    var i = e.createElement("canvas");
                    i.width = n._config.scaledCharWidth,
                    i.height = n._config.scaledCharHeight,
                    n._tmpCtx = i.getContext("2d", {
                        alpha: n._config.allowTransparency
                    }),
                    n._width = Math.floor(1024 / n._config.scaledCharWidth),
                    n._height = Math.floor(1024 / n._config.scaledCharHeight);
                    var o = n._width * n._height;
                    return n._cacheMap = new c.default(o),
                    n._cacheMap.prealloc(o),
                    n
                }
                return i(e, t),
                e.prototype.dispose = function() {
                    null !== this._bitmapCommitTimeout && (window.clearTimeout(this._bitmapCommitTimeout),
                    this._bitmapCommitTimeout = null)
                }
                ,
                e.prototype.beginFrame = function() {
                    this._drawToCacheCount = 0
                }
                ,
                e.prototype.draw = function(t, e, r, n) {
                    if (32 === e.code)
                        return !0;
                    if (!this._canCache(e))
                        return !1;
                    var i = f(e)
                      , o = this._cacheMap.get(i);
                    if (null != o)
                        return this._drawFromCache(t, o, r, n),
                        !0;
                    if (this._drawToCacheCount < 100) {
                        var s;
                        s = this._cacheMap.size < this._cacheMap.capacity ? this._cacheMap.size : this._cacheMap.peek().index;
                        var a = this._drawToCache(e, s);
                        return this._cacheMap.set(i, a),
                        this._drawFromCache(t, a, r, n),
                        !0
                    }
                    return !1
                }
                ,
                e.prototype._canCache = function(t) {
                    return t.code < 256
                }
                ,
                e.prototype._toCoordinateX = function(t) {
                    return t % this._width * this._config.scaledCharWidth
                }
                ,
                e.prototype._toCoordinateY = function(t) {
                    return Math.floor(t / this._width) * this._config.scaledCharHeight
                }
                ,
                e.prototype._drawFromCache = function(t, e, r, n) {
                    if (!e.isEmpty) {
                        var i = this._toCoordinateX(e.index)
                          , o = this._toCoordinateY(e.index);
                        t.drawImage(e.inBitmap ? this._bitmap : this._cacheCanvas, i, o, this._config.scaledCharWidth, this._config.scaledCharHeight, r, n, this._config.scaledCharWidth, this._config.scaledCharHeight)
                    }
                }
                ,
                e.prototype._getColorFromAnsiIndex = function(t) {
                    return t < this._config.colors.ansi.length ? this._config.colors.ansi[t] : a.DEFAULT_ANSI_COLORS[t]
                }
                ,
                e.prototype._getBackgroundColor = function(t) {
                    return this._config.allowTransparency ? u : t.bg === o.INVERTED_DEFAULT_COLOR ? this._config.colors.foreground : t.bg < 256 ? this._getColorFromAnsiIndex(t.bg) : this._config.colors.background
                }
                ,
                e.prototype._getForegroundColor = function(t) {
                    return t.fg === o.INVERTED_DEFAULT_COLOR ? this._config.colors.background : t.fg < 256 ? this._getColorFromAnsiIndex(t.fg) : this._config.colors.foreground
                }
                ,
                e.prototype._drawToCache = function(t, e) {
                    this._drawToCacheCount++,
                    this._tmpCtx.save();
                    var r = this._getBackgroundColor(t);
                    this._tmpCtx.globalCompositeOperation = "copy",
                    this._tmpCtx.fillStyle = r.css,
                    this._tmpCtx.fillRect(0, 0, this._config.scaledCharWidth, this._config.scaledCharHeight),
                    this._tmpCtx.globalCompositeOperation = "source-over";
                    var n = t.bold ? this._config.fontWeightBold : this._config.fontWeight
                      , i = t.italic ? "italic" : "";
                    this._tmpCtx.font = i + " " + n + " " + this._config.fontSize * this._config.devicePixelRatio + "px " + this._config.fontFamily,
                    this._tmpCtx.textBaseline = "middle",
                    this._tmpCtx.fillStyle = this._getForegroundColor(t).css,
                    t.dim && (this._tmpCtx.globalAlpha = o.DIM_OPACITY),
                    this._tmpCtx.fillText(t.chars, 0, this._config.scaledCharHeight / 2),
                    this._tmpCtx.restore();
                    var s = this._tmpCtx.getImageData(0, 0, this._config.scaledCharWidth, this._config.scaledCharHeight)
                      , a = !1;
                    this._config.allowTransparency || (a = l.clearColor(s, r));
                    var c = this._toCoordinateX(e)
                      , h = this._toCoordinateY(e);
                    this._cacheCtx.putImageData(s, c, h);
                    var u = {
                        index: e,
                        isEmpty: a,
                        inBitmap: !1
                    };
                    return this._addGlyphToBitmap(u),
                    u
                }
                ,
                e.prototype._addGlyphToBitmap = function(t) {
                    var e = this;
                    "createImageBitmap"in window && !h.isFirefox && !h.isSafari && (this._glyphsWaitingOnBitmap.push(t),
                    null === this._bitmapCommitTimeout && (this._bitmapCommitTimeout = window.setTimeout(function() {
                        return e._generateBitmap()
                    }, 100)))
                }
                ,
                e.prototype._generateBitmap = function() {
                    var t = this
                      , e = this._glyphsWaitingOnBitmap;
                    this._glyphsWaitingOnBitmap = [],
                    window.createImageBitmap(this._cacheCanvas).then(function(r) {
                        t._bitmap = r;
                        for (var n = 0; n < e.length; n++) {
                            e[n].inBitmap = !0
                        }
                    }),
                    this._bitmapCommitTimeout = null
                }
                ,
                e
            }(s.default);
            r.default = p
        }
        , {
            "../../core/Platform": 22,
            "../ColorManager": 29,
            "./BaseCharAtlas": 36,
            "./CharAtlasGenerator": 38,
            "./LRUMap": 41,
            "./Types": 44
        }],
        41: [function(t, e, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = function() {
                function t(t) {
                    this.capacity = t,
                    this._map = {},
                    this._head = null,
                    this._tail = null,
                    this._nodePool = [],
                    this.size = 0
                }
                return t.prototype._unlinkNode = function(t) {
                    var e = t.prev
                      , r = t.next;
                    t === this._head && (this._head = r),
                    t === this._tail && (this._tail = e),
                    null !== e && (e.next = r),
                    null !== r && (r.prev = e)
                }
                ,
                t.prototype._appendNode = function(t) {
                    var e = this._tail;
                    null !== e && (e.next = t),
                    t.prev = e,
                    t.next = null,
                    this._tail = t,
                    null === this._head && (this._head = t)
                }
                ,
                t.prototype.prealloc = function(t) {
                    for (var e = this._nodePool, r = 0; r < t; r++)
                        e.push({
                            prev: null,
                            next: null,
                            key: null,
                            value: null
                        })
                }
                ,
                t.prototype.get = function(t) {
                    var e = this._map[t];
                    return void 0 !== e ? (this._unlinkNode(e),
                    this._appendNode(e),
                    e.value) : null
                }
                ,
                t.prototype.peekValue = function(t) {
                    var e = this._map[t];
                    return void 0 !== e ? e.value : null
                }
                ,
                t.prototype.peek = function() {
                    var t = this._head;
                    return null === t ? null : t.value
                }
                ,
                t.prototype.set = function(t, e) {
                    var r = this._map[t];
                    if (void 0 !== r)
                        r = this._map[t],
                        this._unlinkNode(r),
                        r.value = e;
                    else if (this.size >= this.capacity)
                        r = this._head,
                        this._unlinkNode(r),
                        delete this._map[r.key],
                        r.key = t,
                        r.value = e,
                        this._map[t] = r;
                    else {
                        var n = this._nodePool;
                        0 < n.length ? ((r = n.pop()).key = t,
                        r.value = e) : r = {
                            prev: null,
                            next: null,
                            key: t,
                            value: e
                        },
                        this._map[t] = r,
                        this.size++
                    }
                    this._appendNode(r)
                }
                ,
                t
            }();
            r.default = n
        }
        , {}],
        42: [function(t, e, r) {
            "use strict";
            var n, i = this && this.__extends || (n = function(t, e) {
                return (n = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(t, e) {
                    t.__proto__ = e
                }
                || function(t, e) {
                    for (var r in e)
                        e.hasOwnProperty(r) && (t[r] = e[r])
                }
                )(t, e)
            }
            ,
            function(t, e) {
                function r() {
                    this.constructor = t
                }
                n(t, e),
                t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype,
                new r)
            }
            );
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = function(t) {
                function e(e, r) {
                    return t.call(this) || this
                }
                return i(e, t),
                e.prototype.draw = function(t, e, r, n) {
                    return !1
                }
                ,
                e
            }(t("./BaseCharAtlas").default);
            r.default = o
        }
        , {
            "./BaseCharAtlas": 36
        }],
        43: [function(t, e, r) {
            "use strict";
            var n, i = this && this.__extends || (n = function(t, e) {
                return (n = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(t, e) {
                    t.__proto__ = e
                }
                || function(t, e) {
                    for (var r in e)
                        e.hasOwnProperty(r) && (t[r] = e[r])
                }
                )(t, e)
            }
            ,
            function(t, e) {
                function r() {
                    this.constructor = t
                }
                n(t, e),
                t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype,
                new r)
            }
            );
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = t("./Types")
              , s = t("./CharAtlasGenerator")
              , a = t("./BaseCharAtlas")
              , l = t("./CharAtlasUtils")
              , c = function(t) {
                function e(e, r) {
                    var n = t.call(this) || this;
                    return n._document = e,
                    n._config = r,
                    n._canvasFactory = function(t, e) {
                        var r = n._document.createElement("canvas");
                        return r.width = t,
                        r.height = e,
                        r
                    }
                    ,
                    n
                }
                return i(e, t),
                e.prototype._doWarmUp = function() {
                    var t = this
                      , e = s.generateStaticCharAtlasTexture(window, this._canvasFactory, this._config);
                    e instanceof HTMLCanvasElement ? this._texture = e : e.then(function(e) {
                        t._texture = e
                    })
                }
                ,
                e.prototype._isCached = function(t, e) {
                    var r = t.code < 256
                      , n = t.fg < 16
                      , i = t.fg === o.DEFAULT_COLOR
                      , s = t.bg === o.DEFAULT_COLOR;
                    return r && (n || i) && s && !t.italic
                }
                ,
                e.prototype.draw = function(t, e, r, n) {
                    if (null === this._texture || void 0 === this._texture)
                        return !1;
                    var i = 0;
                    if (l.is256Color(e.fg) ? i = 2 + e.fg + (e.bold ? 16 : 0) : e.fg === o.DEFAULT_COLOR && e.bold && (i = 1),
                    !this._isCached(e, i))
                        return !1;
                    t.save();
                    var s = this._config.scaledCharWidth + o.CHAR_ATLAS_CELL_SPACING
                      , a = this._config.scaledCharHeight + o.CHAR_ATLAS_CELL_SPACING;
                    return e.dim && (t.globalAlpha = o.DIM_OPACITY),
                    t.drawImage(this._texture, e.code * s, i * a, s, this._config.scaledCharHeight, r, n, s, this._config.scaledCharHeight),
                    t.restore(),
                    !0
                }
                ,
                e
            }(a.default);
            r.default = c
        }
        , {
            "./BaseCharAtlas": 36,
            "./CharAtlasGenerator": 38,
            "./CharAtlasUtils": 39,
            "./Types": 44
        }],
        44: [function(t, e, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            }),
            r.DEFAULT_COLOR = 256,
            r.INVERTED_DEFAULT_COLOR = 257,
            r.DIM_OPACITY = .5,
            r.CHAR_ATLAS_CELL_SPACING = 1
        }
        , {}],
        45: [function(t, e, r) {
            "use strict";
            var n, i = this && this.__extends || (n = function(t, e) {
                return (n = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(t, e) {
                    t.__proto__ = e
                }
                || function(t, e) {
                    for (var r in e)
                        e.hasOwnProperty(r) && (t[r] = e[r])
                }
                )(t, e)
            }
            ,
            function(t, e) {
                function r() {
                    this.constructor = t
                }
                n(t, e),
                t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype,
                new r)
            }
            );
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = t("../../common/EventEmitter")
              , s = t("../ColorManager")
              , a = t("../../ui/RenderDebouncer")
              , l = t("./DomRendererRowFactory")
              , c = t("../atlas/Types")
              , h = "xterm-dom-renderer-owner-"
              , u = "xterm-rows"
              , f = "xterm-fg-"
              , p = "xterm-bg-"
              , d = "xterm-focus"
              , _ = "xterm-selection"
              , m = 1
              , y = function(t) {
                function e(e, r) {
                    var n = t.call(this) || this;
                    n._terminal = e,
                    n._terminalClass = m++,
                    n._rowElements = [];
                    var i = n._terminal.options.allowTransparency;
                    return n.colorManager = new s.ColorManager(document,i),
                    n.setTheme(r),
                    n._rowContainer = document.createElement("div"),
                    n._rowContainer.classList.add(u),
                    n._rowContainer.style.lineHeight = "normal",
                    n._rowContainer.setAttribute("aria-hidden", "true"),
                    n._refreshRowElements(n._terminal.cols, n._terminal.rows),
                    n._selectionContainer = document.createElement("div"),
                    n._selectionContainer.classList.add(_),
                    n._selectionContainer.setAttribute("aria-hidden", "true"),
                    n.dimensions = {
                        scaledCharWidth: null,
                        scaledCharHeight: null,
                        scaledCellWidth: null,
                        scaledCellHeight: null,
                        scaledCharLeft: null,
                        scaledCharTop: null,
                        scaledCanvasWidth: null,
                        scaledCanvasHeight: null,
                        canvasWidth: null,
                        canvasHeight: null,
                        actualCellWidth: null,
                        actualCellHeight: null
                    },
                    n._updateDimensions(),
                    n._renderDebouncer = new a.RenderDebouncer(n._terminal,n._renderRows.bind(n)),
                    n._rowFactory = new l.DomRendererRowFactory(document),
                    n._terminal.element.classList.add(h + n._terminalClass),
                    n._terminal.screenElement.appendChild(n._rowContainer),
                    n._terminal.screenElement.appendChild(n._selectionContainer),
                    n._terminal.linkifier.on("linkhover", function(t) {
                        return n._onLinkHover(t)
                    }),
                    n._terminal.linkifier.on("linkleave", function(t) {
                        return n._onLinkLeave(t)
                    }),
                    n
                }
                return i(e, t),
                e.prototype.dispose = function() {
                    this._terminal.element.classList.remove(h + this._terminalClass),
                    this._terminal.screenElement.removeChild(this._rowContainer),
                    this._terminal.screenElement.removeChild(this._selectionContainer),
                    this._terminal.screenElement.removeChild(this._themeStyleElement),
                    this._terminal.screenElement.removeChild(this._dimensionsStyleElement),
                    t.prototype.dispose.call(this)
                }
                ,
                e.prototype._updateDimensions = function() {
                    var t = this;
                    this.dimensions.scaledCharWidth = Math.floor(this._terminal.charMeasure.width * window.devicePixelRatio),
                    this.dimensions.scaledCharHeight = Math.ceil(this._terminal.charMeasure.height * window.devicePixelRatio),
                    this.dimensions.scaledCellWidth = this.dimensions.scaledCharWidth + Math.round(this._terminal.options.letterSpacing),
                    this.dimensions.scaledCellHeight = Math.floor(this.dimensions.scaledCharHeight * this._terminal.options.lineHeight),
                    this.dimensions.scaledCharLeft = 0,
                    this.dimensions.scaledCharTop = 0,
                    this.dimensions.scaledCanvasWidth = this.dimensions.scaledCellWidth * this._terminal.cols,
                    this.dimensions.scaledCanvasHeight = this.dimensions.scaledCellHeight * this._terminal.rows,
                    this.dimensions.canvasWidth = Math.round(this.dimensions.scaledCanvasWidth / window.devicePixelRatio),
                    this.dimensions.canvasHeight = Math.round(this.dimensions.scaledCanvasHeight / window.devicePixelRatio),
                    this.dimensions.actualCellWidth = this.dimensions.canvasWidth / this._terminal.cols,
                    this.dimensions.actualCellHeight = this.dimensions.canvasHeight / this._terminal.rows,
                    this._rowElements.forEach(function(e) {
                        e.style.width = t.dimensions.canvasWidth + "px",
                        e.style.height = t.dimensions.actualCellHeight + "px",
                        e.style.lineHeight = t.dimensions.actualCellHeight + "px",
                        e.style.overflow = "hidden"
                    }),
                    this._dimensionsStyleElement || (this._dimensionsStyleElement = document.createElement("style"),
                    this._terminal.screenElement.appendChild(this._dimensionsStyleElement));
                    var e = this._terminalSelector + " ." + u + " span { display: inline-block; height: 100%; vertical-align: top; width: " + this.dimensions.actualCellWidth + "px}";
                    this._dimensionsStyleElement.innerHTML = e,
                    this._selectionContainer.style.height = this._terminal._viewportElement.style.height,
                    this._terminal.screenElement.style.width = this.dimensions.canvasWidth + "px",
                    this._terminal.screenElement.style.height = this.dimensions.canvasHeight + "px"
                }
                ,
                e.prototype.setTheme = function(t) {
                    var e = this;
                    t && this.colorManager.setTheme(t),
                    this._themeStyleElement || (this._themeStyleElement = document.createElement("style"),
                    this._terminal.screenElement.appendChild(this._themeStyleElement));
                    var r = this._terminalSelector + " ." + u + " { color: " + this.colorManager.colors.foreground.css + "; background-color: " + this.colorManager.colors.background.css + "; font-family: " + this._terminal.getOption("fontFamily") + "; font-size: " + this._terminal.getOption("fontSize") + "px;}";
                    return r += this._terminalSelector + " span:not(." + l.BOLD_CLASS + ") { font-weight: " + this._terminal.options.fontWeight + ";}" + this._terminalSelector + " span." + l.BOLD_CLASS + " { font-weight: " + this._terminal.options.fontWeightBold + ";}" + this._terminalSelector + " span." + l.ITALIC_CLASS + " { font-style: italic;}",
                    r += this._terminalSelector + " ." + u + ":not(." + d + ") ." + l.CURSOR_CLASS + " { outline: 1px solid " + this.colorManager.colors.cursor.css + "; outline-offset: -1px;}" + this._terminalSelector + " ." + u + "." + d + " ." + l.CURSOR_CLASS + "." + l.CURSOR_STYLE_BLOCK_CLASS + " { background-color: " + this.colorManager.colors.cursor.css + "; color: " + this.colorManager.colors.cursorAccent.css + ";}" + this._terminalSelector + " ." + u + "." + d + " ." + l.CURSOR_CLASS + "." + l.CURSOR_STYLE_BAR_CLASS + " { box-shadow: 1px 0 0 " + this.colorManager.colors.cursor.css + " inset;}" + this._terminalSelector + " ." + u + "." + d + " ." + l.CURSOR_CLASS + "." + l.CURSOR_STYLE_UNDERLINE_CLASS + " { box-shadow: 0 -1px 0 " + this.colorManager.colors.cursor.css + " inset;}",
                    r += this._terminalSelector + " ." + _ + " { position: absolute; top: 0; left: 0; z-index: 1; pointer-events: none;}" + this._terminalSelector + " ." + _ + " div { position: absolute; background-color: " + this.colorManager.colors.selection.css + ";}",
                    this.colorManager.colors.ansi.forEach(function(t, n) {
                        r += e._terminalSelector + " ." + f + n + " { color: " + t.css + "; }" + e._terminalSelector + " ." + p + n + " { background-color: " + t.css + "; }"
                    }),
                    r += this._terminalSelector + " ." + f + c.INVERTED_DEFAULT_COLOR + " { color: " + this.colorManager.colors.background.css + "; }" + this._terminalSelector + " ." + p + c.INVERTED_DEFAULT_COLOR + " { background-color: " + this.colorManager.colors.foreground.css + "; }",
                    this._themeStyleElement.innerHTML = r,
                    this.colorManager.colors
                }
                ,
                e.prototype.onWindowResize = function(t) {
                    this._updateDimensions()
                }
                ,
                e.prototype._refreshRowElements = function(t, e) {
                    for (var r = this._rowElements.length; r <= e; r++) {
                        var n = document.createElement("div");
                        this._rowContainer.appendChild(n),
                        this._rowElements.push(n)
                    }
                    for (; this._rowElements.length > e; )
                        this._rowContainer.removeChild(this._rowElements.pop())
                }
                ,
                e.prototype.onResize = function(t, e) {
                    this._refreshRowElements(t, e),
                    this._updateDimensions()
                }
                ,
                e.prototype.onCharSizeChanged = function() {
                    this._updateDimensions()
                }
                ,
                e.prototype.onBlur = function() {
                    this._rowContainer.classList.remove(d)
                }
                ,
                e.prototype.onFocus = function() {
                    this._rowContainer.classList.add(d)
                }
                ,
                e.prototype.onSelectionChanged = function(t, e, r) {
                    for (; this._selectionContainer.children.length; )
                        this._selectionContainer.removeChild(this._selectionContainer.children[0]);
                    if (t && e) {
                        var n = t[1] - this._terminal.buffer.ydisp
                          , i = e[1] - this._terminal.buffer.ydisp
                          , o = Math.max(n, 0)
                          , s = Math.min(i, this._terminal.rows - 1);
                        if (!(o >= this._terminal.rows || s < 0)) {
                            var a = document.createDocumentFragment();
                            if (r)
                                a.appendChild(this._createSelectionElement(o, t[0], e[0], s - o + 1));
                            else {
                                var l = n === o ? t[0] : 0
                                  , c = o === s ? e[0] : this._terminal.cols;
                                a.appendChild(this._createSelectionElement(o, l, c));
                                var h = s - o - 1;
                                if (a.appendChild(this._createSelectionElement(o + 1, 0, this._terminal.cols, h)),
                                o !== s) {
                                    var u = i === s ? e[0] : this._terminal.cols;
                                    a.appendChild(this._createSelectionElement(s, 0, u))
                                }
                            }
                            this._selectionContainer.appendChild(a)
                        }
                    }
                }
                ,
                e.prototype._createSelectionElement = function(t, e, r, n) {
                    void 0 === n && (n = 1);
                    var i = document.createElement("div");
                    return i.style.height = n * this.dimensions.actualCellHeight + "px",
                    i.style.top = t * this.dimensions.actualCellHeight + "px",
                    i.style.left = e * this.dimensions.actualCellWidth + "px",
                    i.style.width = this.dimensions.actualCellWidth * (r - e) + "px",
                    i
                }
                ,
                e.prototype.onCursorMove = function() {}
                ,
                e.prototype.onOptionsChanged = function() {
                    this._updateDimensions(),
                    this.setTheme(void 0),
                    this._terminal.refresh(0, this._terminal.rows - 1)
                }
                ,
                e.prototype.clear = function() {
                    this._rowElements.forEach(function(t) {
                        return t.innerHTML = ""
                    })
                }
                ,
                e.prototype.refreshRows = function(t, e) {
                    this._renderDebouncer.refresh(t, e)
                }
                ,
                e.prototype._renderRows = function(t, e) {
                    for (var r = this._terminal, n = r.buffer.ybase + r.buffer.y, i = this._terminal.buffer.x, o = t; o <= e; o++) {
                        var s = this._rowElements[o];
                        s.innerHTML = "";
                        var a = o + r.buffer.ydisp
                          , l = r.buffer.lines.get(a)
                          , c = r.options.cursorStyle;
                        s.appendChild(this._rowFactory.createRow(l, a === n, c, i, this.dimensions.actualCellWidth, r.cols))
                    }
                    this._terminal.emit("refresh", {
                        start: t,
                        end: e
                    })
                }
                ,
                Object.defineProperty(e.prototype, "_terminalSelector", {
                    get: function() {
                        return "." + h + this._terminalClass
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                e.prototype.registerCharacterJoiner = function(t) {
                    return -1
                }
                ,
                e.prototype.deregisterCharacterJoiner = function(t) {
                    return !1
                }
                ,
                e.prototype._onLinkHover = function(t) {
                    this._setCellUnderline(t.x1, t.x2, t.y1, t.y2, t.cols, !0)
                }
                ,
                e.prototype._onLinkLeave = function(t) {
                    this._setCellUnderline(t.x1, t.x2, t.y1, t.y2, t.cols, !1)
                }
                ,
                e.prototype._setCellUnderline = function(t, e, r, n, i, o) {
                    for (; t !== e || r !== n; ) {
                        var s = this._rowElements[r];
                        if (!s)
                            return;
                        var a = s.children[t];
                        a && (a.style.textDecoration = o ? "underline" : "none"),
                        ++t >= i && (t = 0,
                        r++)
                    }
                }
                ,
                e
            }(o.EventEmitter);
            r.DomRenderer = y
        }
        , {
            "../../common/EventEmitter": 18,
            "../../ui/RenderDebouncer": 52,
            "../ColorManager": 29,
            "../atlas/Types": 44,
            "./DomRendererRowFactory": 46
        }],
        46: [function(t, e, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = t("../../Buffer")
              , i = t("../atlas/Types");
            r.BOLD_CLASS = "xterm-bold",
            r.ITALIC_CLASS = "xterm-italic",
            r.CURSOR_CLASS = "xterm-cursor",
            r.CURSOR_STYLE_BLOCK_CLASS = "xterm-cursor-block",
            r.CURSOR_STYLE_BAR_CLASS = "xterm-cursor-bar",
            r.CURSOR_STYLE_UNDERLINE_CLASS = "xterm-cursor-underline";
            var o = function() {
                function t(t) {
                    this._document = t
                }
                return t.prototype.createRow = function(t, e, o, s, a, l) {
                    for (var c = this._document.createDocumentFragment(), h = 0, u = Math.min(t.length, l) - 1; 0 <= u; u--) {
                        if ((f = t.get(u))[n.CHAR_DATA_CODE_INDEX] !== n.NULL_CELL_CODE || e && u === s) {
                            h = u + 1;
                            break
                        }
                    }
                    for (u = 0; u < h; u++) {
                        var f, p = (f = t.get(u))[n.CHAR_DATA_CHAR_INDEX] || n.WHITESPACE_CELL_CHAR, d = f[n.CHAR_DATA_ATTR_INDEX], _ = f[n.CHAR_DATA_WIDTH_INDEX];
                        if (0 !== _) {
                            var m = this._document.createElement("span");
                            1 < _ && (m.style.width = a * _ + "px");
                            var y = d >> 18
                              , g = 511 & d
                              , v = d >> 9 & 511;
                            if (e && u === s)
                                switch (m.classList.add(r.CURSOR_CLASS),
                                o) {
                                case "bar":
                                    m.classList.add(r.CURSOR_STYLE_BAR_CLASS);
                                    break;
                                case "underline":
                                    m.classList.add(r.CURSOR_STYLE_UNDERLINE_CLASS);
                                    break;
                                default:
                                    m.classList.add(r.CURSOR_STYLE_BLOCK_CLASS)
                                }
                            if (8 & y) {
                                var C = g;
                                g = v,
                                (v = C) === i.DEFAULT_COLOR && (v = i.INVERTED_DEFAULT_COLOR),
                                g === i.DEFAULT_COLOR && (g = i.INVERTED_DEFAULT_COLOR)
                            }
                            1 & y && (v < 8 && (v += 8),
                            m.classList.add(r.BOLD_CLASS)),
                            64 & y && m.classList.add(r.ITALIC_CLASS),
                            m.textContent = p,
                            v !== i.DEFAULT_COLOR && m.classList.add("xterm-fg-" + v),
                            g !== i.DEFAULT_COLOR && m.classList.add("xterm-bg-" + g),
                            c.appendChild(m)
                        }
                    }
                    return c
                }
                ,
                t
            }();
            r.DomRendererRowFactory = o
        }
        , {
            "../../Buffer": 2,
            "../atlas/Types": 44
        }],
        47: [function(t, e, r) {
            "use strict";
            var n, i = this && this.__extends || (n = function(t, e) {
                return (n = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(t, e) {
                    t.__proto__ = e
                }
                || function(t, e) {
                    for (var r in e)
                        e.hasOwnProperty(r) && (t[r] = e[r])
                }
                )(t, e)
            }
            ,
            function(t, e) {
                function r() {
                    this.constructor = t
                }
                n(t, e),
                t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype,
                new r)
            }
            );
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = function(t) {
                function e(e, r) {
                    var n = t.call(this) || this;
                    return n._document = e,
                    n._parentElement = r,
                    n._measureElement = n._document.createElement("span"),
                    n._measureElement.classList.add("xterm-char-measure-element"),
                    n._measureElement.textContent = "W",
                    n._measureElement.setAttribute("aria-hidden", "true"),
                    n._parentElement.appendChild(n._measureElement),
                    n
                }
                return i(e, t),
                Object.defineProperty(e.prototype, "width", {
                    get: function() {
                        return this._width
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(e.prototype, "height", {
                    get: function() {
                        return this._height
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                e.prototype.measure = function(t) {
                    this._measureElement.style.fontFamily = t.fontFamily,
                    this._measureElement.style.fontSize = t.fontSize + "px";
                    var e = this._measureElement.getBoundingClientRect();
                    0 !== e.width && 0 !== e.height && (this._width === e.width && this._height === e.height || (this._width = e.width,
                    this._height = Math.ceil(e.height),
                    this.emit("charsizechanged")))
                }
                ,
                e
            }(t("../common/EventEmitter").EventEmitter);
            r.CharMeasure = o
        }
        , {
            "../common/EventEmitter": 18
        }],
        48: [function(t, e, r) {
            "use strict";
            function n(t) {
                return t.replace(/\r?\n/g, "\r")
            }
            function i(t, e) {
                return e ? "[200~" + t + "[201~" : t
            }
            function o(t, e) {
                e.style.position = "fixed",
                e.style.width = "20px",
                e.style.height = "20px",
                e.style.left = t.clientX - 10 + "px",
                e.style.top = t.clientY - 10 + "px",
                e.style.zIndex = "1000",
                e.focus(),
                setTimeout(function() {
                    e.style.position = null,
                    e.style.width = null,
                    e.style.height = null,
                    e.style.left = null,
                    e.style.top = null,
                    e.style.zIndex = null
                }, 200)
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            }),
            r.prepareTextForTerminal = n,
            r.bracketTextForPaste = i,
            r.copyHandler = function(t, e, r) {
                e.browser.isMSIE ? window.clipboardData.setData("Text", r.selectionText) : t.clipboardData.setData("text/plain", r.selectionText),
                t.preventDefault()
            }
            ,
            r.pasteHandler = function(t, e) {
                t.stopPropagation();
                var r = function(r) {
                    r = i(r = n(r), e.bracketedPasteMode),
                    e.handler(r),
                    e.textarea.value = "",
                    e.emit("paste", r),
                    e.cancel(t)
                };
                e.browser.isMSIE ? window.clipboardData && r(window.clipboardData.getData("Text")) : t.clipboardData && r(t.clipboardData.getData("text/plain"))
            }
            ,
            r.moveTextAreaUnderMouseCursor = o,
            r.rightClickHandler = function(t, e, r, n) {
                o(t, e),
                n && !r.isClickInSelection(t) && r.selectWordAtCursor(t),
                e.value = r.selectionText,
                e.select()
            }
        }
        , {}],
        49: [function(t, e, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            }),
            r.addDisposableDomListener = function(t, e, r, n) {
                return t.addEventListener(e, r, n),
                {
                    dispose: function() {
                        r && (t.removeEventListener(e, r, n),
                        r = t = null)
                    }
                }
            }
        }
        , {}],
        50: [function(t, e, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = function() {
                function t(t) {
                    this._renderer = t
                }
                return t.prototype.setRenderer = function(t) {
                    this._renderer = t
                }
                ,
                t.getCoordsRelativeToElement = function(t, e) {
                    var r = e.getBoundingClientRect();
                    return [t.clientX - r.left, t.clientY - r.top]
                }
                ,
                t.prototype.getCoords = function(e, r, n, i, o, s) {
                    if (!n.width || !n.height)
                        return null;
                    var a = t.getCoordsRelativeToElement(e, r);
                    return a ? (a[0] = Math.ceil((a[0] + (s ? this._renderer.dimensions.actualCellWidth / 2 : 0)) / this._renderer.dimensions.actualCellWidth),
                    a[1] = Math.ceil(a[1] / this._renderer.dimensions.actualCellHeight),
                    a[0] = Math.min(Math.max(a[0], 1), i + (s ? 1 : 0)),
                    a[1] = Math.min(Math.max(a[1], 1), o),
                    a) : null
                }
                ,
                t.prototype.getRawByteCoords = function(t, e, r, n, i) {
                    var o = this.getCoords(t, e, r, n, i)
                      , s = o[0]
                      , a = o[1];
                    return {
                        x: s += 32,
                        y: a += 32
                    }
                }
                ,
                t
            }();
            r.MouseHelper = n
        }
        , {}],
        51: [function(t, e, r) {
            "use strict";
            var n, i = this && this.__extends || (n = function(t, e) {
                return (n = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(t, e) {
                    t.__proto__ = e
                }
                || function(t, e) {
                    for (var r in e)
                        e.hasOwnProperty(r) && (t[r] = e[r])
                }
                )(t, e)
            }
            ,
            function(t, e) {
                function r() {
                    this.constructor = t
                }
                n(t, e),
                t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype,
                new r)
            }
            );
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = t("../common/Lifecycle")
              , s = t("./Lifecycle")
              , a = function(t) {
                function e(e) {
                    var r = t.call(this) || this;
                    return r._terminal = e,
                    r._zones = [],
                    r._areZonesActive = !1,
                    r._tooltipTimeout = null,
                    r._currentZone = null,
                    r._lastHoverCoords = [null, null],
                    r.register(s.addDisposableDomListener(r._terminal.element, "mousedown", function(t) {
                        return r._onMouseDown(t)
                    })),
                    r._mouseMoveListener = function(t) {
                        return r._onMouseMove(t)
                    }
                    ,
                    r._clickListener = function(t) {
                        return r._onClick(t)
                    }
                    ,
                    r
                }
                return i(e, t),
                e.prototype.dispose = function() {
                    t.prototype.dispose.call(this),
                    this._deactivate()
                }
                ,
                e.prototype.add = function(t) {
                    this._zones.push(t),
                    1 === this._zones.length && this._activate()
                }
                ,
                e.prototype.clearAll = function(t, e) {
                    if (0 !== this._zones.length) {
                        e || (t = 0,
                        e = this._terminal.rows - 1);
                        for (var r = 0; r < this._zones.length; r++) {
                            var n = this._zones[r];
                            (n.y1 > t && n.y1 <= e + 1 || n.y2 > t && n.y2 <= e + 1 || n.y1 < t && n.y2 > e + 1) && (this._currentZone && this._currentZone === n && (this._currentZone.leaveCallback(),
                            this._currentZone = null),
                            this._zones.splice(r--, 1))
                        }
                        0 === this._zones.length && this._deactivate()
                    }
                }
                ,
                e.prototype._activate = function() {
                    this._areZonesActive || (this._areZonesActive = !0,
                    this._terminal.element.addEventListener("mousemove", this._mouseMoveListener),
                    this._terminal.element.addEventListener("click", this._clickListener))
                }
                ,
                e.prototype._deactivate = function() {
                    this._areZonesActive && (this._areZonesActive = !1,
                    this._terminal.element.removeEventListener("mousemove", this._mouseMoveListener),
                    this._terminal.element.removeEventListener("click", this._clickListener))
                }
                ,
                e.prototype._onMouseMove = function(t) {
                    this._lastHoverCoords[0] === t.pageX && this._lastHoverCoords[1] === t.pageY || (this._onHover(t),
                    this._lastHoverCoords = [t.pageX, t.pageY])
                }
                ,
                e.prototype._onHover = function(t) {
                    var e = this
                      , r = this._findZoneEventAt(t);
                    r !== this._currentZone && (this._currentZone && (this._currentZone.leaveCallback(),
                    this._currentZone = null,
                    this._tooltipTimeout && clearTimeout(this._tooltipTimeout)),
                    r && ((this._currentZone = r).hoverCallback && r.hoverCallback(t),
                    this._tooltipTimeout = setTimeout(function() {
                        return e._onTooltip(t)
                    }, 500)))
                }
                ,
                e.prototype._onTooltip = function(t) {
                    this._tooltipTimeout = null;
                    var e = this._findZoneEventAt(t);
                    e && e.tooltipCallback && e.tooltipCallback(t)
                }
                ,
                e.prototype._onMouseDown = function(t) {
                    if (this._areZonesActive) {
                        var e = this._findZoneEventAt(t);
                        e && e.willLinkActivate(t) && (t.preventDefault(),
                        t.stopImmediatePropagation())
                    }
                }
                ,
                e.prototype._onClick = function(t) {
                    var e = this._findZoneEventAt(t);
                    e && (e.clickCallback(t),
                    t.preventDefault(),
                    t.stopImmediatePropagation())
                }
                ,
                e.prototype._findZoneEventAt = function(t) {
                    var e = this._terminal.mouseHelper.getCoords(t, this._terminal.screenElement, this._terminal.charMeasure, this._terminal.cols, this._terminal.rows);
                    if (!e)
                        return null;
                    for (var r = e[0], n = e[1], i = 0; i < this._zones.length; i++) {
                        var o = this._zones[i];
                        if (o.y1 === o.y2) {
                            if (n === o.y1 && r >= o.x1 && r < o.x2)
                                return o
                        } else if (n === o.y1 && r >= o.x1 || n === o.y2 && r < o.x2 || n > o.y1 && n < o.y2)
                            return o
                    }
                    return null
                }
                ,
                e
            }(o.Disposable);
            r.MouseZoneManager = a;
            r.MouseZone = function(t, e, r, n, i, o, s, a, l) {
                this.x1 = t,
                this.y1 = e,
                this.x2 = r,
                this.y2 = n,
                this.clickCallback = i,
                this.hoverCallback = o,
                this.tooltipCallback = s,
                this.leaveCallback = a,
                this.willLinkActivate = l
            }
        }
        , {
            "../common/Lifecycle": 19,
            "./Lifecycle": 49
        }],
        52: [function(t, e, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = function() {
                function t(t, e) {
                    this._terminal = t,
                    this._callback = e,
                    this._animationFrame = null
                }
                return t.prototype.dispose = function() {
                    this._animationFrame && (window.cancelAnimationFrame(this._animationFrame),
                    this._animationFrame = null)
                }
                ,
                t.prototype.refresh = function(t, e) {
                    var r = this;
                    t = null != t ? t : 0,
                    e = null != e ? e : this._terminal.rows - 1;
                    var n = void 0 !== this._rowStart && null !== this._rowStart
                      , i = void 0 !== this._rowEnd && null !== this._rowEnd;
                    this._rowStart = n ? Math.min(this._rowStart, t) : t,
                    this._rowEnd = i ? Math.max(this._rowEnd, e) : e,
                    this._animationFrame || (this._animationFrame = window.requestAnimationFrame(function() {
                        return r._innerRefresh()
                    }))
                }
                ,
                t.prototype._innerRefresh = function() {
                    this._rowStart = Math.max(this._rowStart, 0),
                    this._rowEnd = Math.min(this._rowEnd, this._terminal.rows - 1),
                    this._callback(this._rowStart, this._rowEnd),
                    this._rowStart = null,
                    this._rowEnd = null,
                    this._animationFrame = null
                }
                ,
                t
            }();
            r.RenderDebouncer = n
        }
        , {}],
        53: [function(t, e, r) {
            "use strict";
            var n, i = this && this.__extends || (n = function(t, e) {
                return (n = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(t, e) {
                    t.__proto__ = e
                }
                || function(t, e) {
                    for (var r in e)
                        e.hasOwnProperty(r) && (t[r] = e[r])
                }
                )(t, e)
            }
            ,
            function(t, e) {
                function r() {
                    this.constructor = t
                }
                n(t, e),
                t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype,
                new r)
            }
            );
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = function(t) {
                function e() {
                    return null !== t && t.apply(this, arguments) || this
                }
                return i(e, t),
                e.prototype.setListener = function(t) {
                    var e = this;
                    this._listener && this.clearListener(),
                    this._listener = t,
                    this._outerListener = function() {
                        e._listener(window.devicePixelRatio, e._currentDevicePixelRatio),
                        e._updateDpr()
                    }
                    ,
                    this._updateDpr()
                }
                ,
                e.prototype.dispose = function() {
                    t.prototype.dispose.call(this),
                    this.clearListener()
                }
                ,
                e.prototype._updateDpr = function() {
                    this._resolutionMediaMatchList && this._resolutionMediaMatchList.removeListener(this._outerListener),
                    this._currentDevicePixelRatio = window.devicePixelRatio,
                    this._resolutionMediaMatchList = window.matchMedia("screen and (resolution: " + window.devicePixelRatio + "dppx)"),
                    this._resolutionMediaMatchList.addListener(this._outerListener)
                }
                ,
                e.prototype.clearListener = function() {
                    this._listener && (this._resolutionMediaMatchList.removeListener(this._outerListener),
                    this._listener = null,
                    this._outerListener = null)
                }
                ,
                e
            }(t("../common/Lifecycle").Disposable);
            r.ScreenDprMonitor = o
        }
        , {
            "../common/Lifecycle": 19
        }],
        54: [function(t, e, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = t("./public/Terminal");
            e.exports = n.Terminal
        }
        , {
            "./public/Terminal": 26
        }]
    }, {}, [54])(54)
}
, function(t, e) {
    var r = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
      , n = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
    t.exports = function(t) {
        var e = t
          , i = t.indexOf("[")
          , o = t.indexOf("]");
        -1 != i && -1 != o && (t = t.substring(0, i) + t.substring(i, o).replace(/:/g, ";") + t.substring(o, t.length));
        for (var s = r.exec(t || ""), a = {}, l = 14; l--; )
            a[n[l]] = s[l] || "";
        return -1 != i && -1 != o && (a.source = e,
        a.host = a.host.substring(1, a.host.length - 1).replace(/;/g, ":"),
        a.authority = a.authority.replace("[", "").replace("]", "").replace(/;/g, ":"),
        a.ipv6uri = !0),
        a
    }
}
, function(t, e, r) {
    (function(e) {
        t.exports = function(t) {
            return r && e.isBuffer(t) || n && (t instanceof ArrayBuffer || i(t))
        }
        ;
        var r = "function" == typeof e && "function" == typeof e.isBuffer
          , n = "function" == typeof ArrayBuffer
          , i = function(t) {
            return "function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(t) : t.buffer instanceof ArrayBuffer
        }
    }
    ).call(this, r(10).Buffer)
}
, function(t, e) {
    var r;
    r = function() {
        return this
    }();
    try {
        r = r || new Function("return this")()
    } catch (t) {
        "object" == typeof window && (r = window)
    }
    t.exports = r
}
, function(t, e, r) {
    var n = r(36)
      , i = r(24)
      , o = r(0)
      , s = r(8)
      , a = r(25)
      , l = r(26)
      , c = r(2)("socket.io-client:manager")
      , h = r(23)
      , u = r(51)
      , f = Object.prototype.hasOwnProperty;
    function p(t, e) {
        if (!(this instanceof p))
            return new p(t,e);
        t && "object" == typeof t && (e = t,
        t = void 0),
        (e = e || {}).path = e.path || "/socket.io",
        this.nsps = {},
        this.subs = [],
        this.opts = e,
        this.reconnection(!1 !== e.reconnection),
        this.reconnectionAttempts(e.reconnectionAttempts || 1 / 0),
        this.reconnectionDelay(e.reconnectionDelay || 1e3),
        this.reconnectionDelayMax(e.reconnectionDelayMax || 5e3),
        this.randomizationFactor(e.randomizationFactor || .5),
        this.backoff = new u({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor()
        }),
        this.timeout(null == e.timeout ? 2e4 : e.timeout),
        this.readyState = "closed",
        this.uri = t,
        this.connecting = [],
        this.lastPing = null,
        this.encoding = !1,
        this.packetBuffer = [];
        var r = e.parser || s;
        this.encoder = new r.Encoder,
        this.decoder = new r.Decoder,
        this.autoConnect = !1 !== e.autoConnect,
        this.autoConnect && this.open()
    }
    (t.exports = p).prototype.emitAll = function() {
        for (var t in this.emit.apply(this, arguments),
        this.nsps)
            f.call(this.nsps, t) && this.nsps[t].emit.apply(this.nsps[t], arguments)
    }
    ,
    p.prototype.updateSocketIds = function() {
        for (var t in this.nsps)
            f.call(this.nsps, t) && (this.nsps[t].id = this.generateId(t))
    }
    ,
    p.prototype.generateId = function(t) {
        return ("/" === t ? "" : t + "#") + this.engine.id
    }
    ,
    o(p.prototype),
    p.prototype.reconnection = function(t) {
        return arguments.length ? (this._reconnection = !!t,
        this) : this._reconnection
    }
    ,
    p.prototype.reconnectionAttempts = function(t) {
        return arguments.length ? (this._reconnectionAttempts = t,
        this) : this._reconnectionAttempts
    }
    ,
    p.prototype.reconnectionDelay = function(t) {
        return arguments.length ? (this._reconnectionDelay = t,
        this.backoff && this.backoff.setMin(t),
        this) : this._reconnectionDelay
    }
    ,
    p.prototype.randomizationFactor = function(t) {
        return arguments.length ? (this._randomizationFactor = t,
        this.backoff && this.backoff.setJitter(t),
        this) : this._randomizationFactor
    }
    ,
    p.prototype.reconnectionDelayMax = function(t) {
        return arguments.length ? (this._reconnectionDelayMax = t,
        this.backoff && this.backoff.setMax(t),
        this) : this._reconnectionDelayMax
    }
    ,
    p.prototype.timeout = function(t) {
        return arguments.length ? (this._timeout = t,
        this) : this._timeout
    }
    ,
    p.prototype.maybeReconnectOnOpen = function() {
        !this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect()
    }
    ,
    p.prototype.open = p.prototype.connect = function(t, e) {
        if (c("readyState %s", this.readyState),
        ~this.readyState.indexOf("open"))
            return this;
        c("opening %s", this.uri),
        this.engine = n(this.uri, this.opts);
        var r = this.engine
          , i = this;
        this.readyState = "opening",
        this.skipReconnect = !1;
        var o = a(r, "open", function() {
            i.onopen(),
            t && t()
        })
          , s = a(r, "error", function(e) {
            if (c("connect_error"),
            i.cleanup(),
            i.readyState = "closed",
            i.emitAll("connect_error", e),
            t) {
                var r = new Error("Connection error");
                r.data = e,
                t(r)
            } else
                i.maybeReconnectOnOpen()
        });
        if (!1 !== this._timeout) {
            var l = this._timeout;
            c("connect attempt will timeout after %d", l);
            var h = setTimeout(function() {
                c("connect attempt timed out after %d", l),
                o.destroy(),
                r.close(),
                r.emit("error", "timeout"),
                i.emitAll("connect_timeout", l)
            }, l);
            this.subs.push({
                destroy: function() {
                    clearTimeout(h)
                }
            })
        }
        return this.subs.push(o),
        this.subs.push(s),
        this
    }
    ,
    p.prototype.onopen = function() {
        c("open"),
        this.cleanup(),
        this.readyState = "open",
        this.emit("open");
        var t = this.engine;
        this.subs.push(a(t, "data", l(this, "ondata"))),
        this.subs.push(a(t, "ping", l(this, "onping"))),
        this.subs.push(a(t, "pong", l(this, "onpong"))),
        this.subs.push(a(t, "error", l(this, "onerror"))),
        this.subs.push(a(t, "close", l(this, "onclose"))),
        this.subs.push(a(this.decoder, "decoded", l(this, "ondecoded")))
    }
    ,
    p.prototype.onping = function() {
        this.lastPing = new Date,
        this.emitAll("ping")
    }
    ,
    p.prototype.onpong = function() {
        this.emitAll("pong", new Date - this.lastPing)
    }
    ,
    p.prototype.ondata = function(t) {
        this.decoder.add(t)
    }
    ,
    p.prototype.ondecoded = function(t) {
        this.emit("packet", t)
    }
    ,
    p.prototype.onerror = function(t) {
        c("error", t),
        this.emitAll("error", t)
    }
    ,
    p.prototype.socket = function(t, e) {
        var r = this.nsps[t];
        if (!r) {
            r = new i(this,t,e),
            this.nsps[t] = r;
            var n = this;
            r.on("connecting", o),
            r.on("connect", function() {
                r.id = n.generateId(t)
            }),
            this.autoConnect && o()
        }
        function o() {
            ~h(n.connecting, r) || n.connecting.push(r)
        }
        return r
    }
    ,
    p.prototype.destroy = function(t) {
        var e = h(this.connecting, t);
        ~e && this.connecting.splice(e, 1),
        this.connecting.length || this.close()
    }
    ,
    p.prototype.packet = function(t) {
        c("writing packet %j", t);
        var e = this;
        t.query && 0 === t.type && (t.nsp += "?" + t.query),
        e.encoding ? e.packetBuffer.push(t) : (e.encoding = !0,
        this.encoder.encode(t, function(r) {
            for (var n = 0; n < r.length; n++)
                e.engine.write(r[n], t.options);
            e.encoding = !1,
            e.processPacketQueue()
        }))
    }
    ,
    p.prototype.processPacketQueue = function() {
        if (0 < this.packetBuffer.length && !this.encoding) {
            var t = this.packetBuffer.shift();
            this.packet(t)
        }
    }
    ,
    p.prototype.cleanup = function() {
        c("cleanup");
        for (var t = this.subs.length, e = 0; e < t; e++)
            this.subs.shift().destroy();
        this.packetBuffer = [],
        this.encoding = !1,
        this.lastPing = null,
        this.decoder.destroy()
    }
    ,
    p.prototype.close = p.prototype.disconnect = function() {
        c("disconnect"),
        this.skipReconnect = !0,
        this.reconnecting = !1,
        "opening" === this.readyState && this.cleanup(),
        this.backoff.reset(),
        this.readyState = "closed",
        this.engine && this.engine.close()
    }
    ,
    p.prototype.onclose = function(t) {
        c("onclose"),
        this.cleanup(),
        this.backoff.reset(),
        this.readyState = "closed",
        this.emit("close", t),
        this._reconnection && !this.skipReconnect && this.reconnect()
    }
    ,
    p.prototype.reconnect = function() {
        if (this.reconnecting || this.skipReconnect)
            return this;
        var t = this;
        if (this.backoff.attempts >= this._reconnectionAttempts)
            c("reconnect failed"),
            this.backoff.reset(),
            this.emitAll("reconnect_failed"),
            this.reconnecting = !1;
        else {
            var e = this.backoff.duration();
            c("will wait %dms before reconnect attempt", e),
            this.reconnecting = !0;
            var r = setTimeout(function() {
                t.skipReconnect || (c("attempting reconnect"),
                t.emitAll("reconnect_attempt", t.backoff.attempts),
                t.emitAll("reconnecting", t.backoff.attempts),
                t.skipReconnect || t.open(function(e) {
                    e ? (c("reconnect attempt error"),
                    t.reconnecting = !1,
                    t.reconnect(),
                    t.emitAll("reconnect_error", e.data)) : (c("reconnect success"),
                    t.onreconnect())
                }))
            }, e);
            this.subs.push({
                destroy: function() {
                    clearTimeout(r)
                }
            })
        }
    }
    ,
    p.prototype.onreconnect = function() {
        var t = this.backoff.attempts;
        this.reconnecting = !1,
        this.backoff.reset(),
        this.updateSocketIds(),
        this.emitAll("reconnect", t)
    }
}
, function(t, e, r) {
    var n = r(11)
      , i = r(39)
      , o = r(47)
      , s = r(48);
    e.polling = function(t) {
        var e = !1
          , r = !1
          , s = !1 !== t.jsonp;
        if ("undefined" != typeof location) {
            var a = "https:" === location.protocol
              , l = location.port;
            l || (l = a ? 443 : 80),
            e = t.hostname !== location.hostname || l !== t.port,
            r = t.secure !== a
        }
        if (t.xdomain = e,
        t.xscheme = r,
        "open"in new n(t) && !t.forceJSONP)
            return new i(t);
        if (!s)
            throw new Error("JSONP disabled");
        return new o(t)
    }
    ,
    e.websocket = s
}
, function(t, e, r) {
    var n = r(12)
      , i = r(3)
      , o = r(1)
      , s = r(4)
      , a = r(22)
      , l = r(5)("engine.io-client:polling");
    t.exports = h;
    var c = null != new (r(11))({
        xdomain: !1
    }).responseType;
    function h(t) {
        var e = t && t.forceBase64;
        c && !e || (this.supportsBinary = !1),
        n.call(this, t)
    }
    s(h, n),
    h.prototype.name = "polling",
    h.prototype.doOpen = function() {
        this.poll()
    }
    ,
    h.prototype.pause = function(t) {
        var e = this;
        function r() {
            l("paused"),
            e.readyState = "paused",
            t()
        }
        if (this.readyState = "pausing",
        this.polling || !this.writable) {
            var n = 0;
            this.polling && (l("we are currently polling - waiting to pause"),
            n++,
            this.once("pollComplete", function() {
                l("pre-pause polling complete"),
                --n || r()
            })),
            this.writable || (l("we are currently writing - waiting to pause"),
            n++,
            this.once("drain", function() {
                l("pre-pause writing complete"),
                --n || r()
            }))
        } else
            r()
    }
    ,
    h.prototype.poll = function() {
        l("polling"),
        this.polling = !0,
        this.doPoll(),
        this.emit("poll")
    }
    ,
    h.prototype.onData = function(t) {
        var e = this;
        l("polling got data %s", t),
        o.decodePayload(t, this.socket.binaryType, function(t, r, n) {
            if ("opening" === e.readyState && e.onOpen(),
            "close" === t.type)
                return e.onClose(),
                !1;
            e.onPacket(t)
        }),
        "closed" !== this.readyState && (this.polling = !1,
        this.emit("pollComplete"),
        "open" === this.readyState ? this.poll() : l('ignoring poll - transport state "%s"', this.readyState))
    }
    ,
    h.prototype.doClose = function() {
        var t = this;
        function e() {
            l("writing close packet"),
            t.write([{
                type: "close"
            }])
        }
        "open" === this.readyState ? (l("transport open - closing"),
        e()) : (l("transport not open - deferring close"),
        this.once("open", e))
    }
    ,
    h.prototype.write = function(t) {
        var e = this;
        this.writable = !1;
        var r = function() {
            e.writable = !0,
            e.emit("drain")
        };
        o.encodePayload(t, this.supportsBinary, function(t) {
            e.doWrite(t, r)
        })
    }
    ,
    h.prototype.uri = function() {
        var t = this.query || {}
          , e = this.secure ? "https" : "http"
          , r = "";
        return !1 !== this.timestampRequests && (t[this.timestampParam] = a()),
        this.supportsBinary || t.sid || (t.b64 = 1),
        t = i.encode(t),
        this.port && ("https" === e && 443 !== Number(this.port) || "http" === e && 80 !== Number(this.port)) && (r = ":" + this.port),
        t.length && (t = "?" + t),
        e + "://" + (-1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]" : this.hostname) + r + this.path + t
    }
}
, function(t, e, r) {
    (function(e) {
        var n = r(9)
          , i = Object.prototype.toString
          , o = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === i.call(Blob)
          , s = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === i.call(File);
        t.exports = function t(r) {
            if (!r || "object" != typeof r)
                return !1;
            if (n(r)) {
                for (var i = 0, a = r.length; i < a; i++)
                    if (t(r[i]))
                        return !0;
                return !1
            }
            if ("function" == typeof e && e.isBuffer && e.isBuffer(r) || "function" == typeof ArrayBuffer && r instanceof ArrayBuffer || o && r instanceof Blob || s && r instanceof File)
                return !0;
            if (r.toJSON && "function" == typeof r.toJSON && 1 === arguments.length)
                return t(r.toJSON(), !0);
            for (var l in r)
                if (Object.prototype.hasOwnProperty.call(r, l) && t(r[l]))
                    return !0;
            return !1
        }
    }
    ).call(this, r(10).Buffer)
}
, function(t, e, r) {
    "use strict";
    var n, i = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), o = 64, s = {}, a = 0, l = 0;
    function c(t) {
        for (var e = ""; e = i[t % o] + e,
        0 < (t = Math.floor(t / o)); )
            ;
        return e
    }
    function h() {
        var t = c(+new Date);
        return t !== n ? (a = 0,
        n = t) : t + "." + c(a++)
    }
    for (; l < o; l++)
        s[i[l]] = l;
    h.encode = c,
    h.decode = function(t) {
        var e = 0;
        for (l = 0; l < t.length; l++)
            e = e * o + s[t.charAt(l)];
        return e
    }
    ,
    t.exports = h
}
, function(t, e) {
    var r = [].indexOf;
    t.exports = function(t, e) {
        if (r)
            return t.indexOf(e);
        for (var n = 0; n < t.length; ++n)
            if (t[n] === e)
                return n;
        return -1
    }
}
, function(t, e, r) {
    var n = r(8)
      , i = r(0)
      , o = r(50)
      , s = r(25)
      , a = r(26)
      , l = r(2)("socket.io-client:socket")
      , c = r(3)
      , h = r(21);
    t.exports = p;
    var u = {
        connect: 1,
        connect_error: 1,
        connect_timeout: 1,
        connecting: 1,
        disconnect: 1,
        error: 1,
        reconnect: 1,
        reconnect_attempt: 1,
        reconnect_failed: 1,
        reconnect_error: 1,
        reconnecting: 1,
        ping: 1,
        pong: 1
    }
      , f = i.prototype.emit;
    function p(t, e, r) {
        this.io = t,
        this.nsp = e,
        (this.json = this).ids = 0,
        this.acks = {},
        this.receiveBuffer = [],
        this.sendBuffer = [],
        this.connected = !1,
        this.disconnected = !0,
        this.flags = {},
        r && r.query && (this.query = r.query),
        this.io.autoConnect && this.open()
    }
    i(p.prototype),
    p.prototype.subEvents = function() {
        if (!this.subs) {
            var t = this.io;
            this.subs = [s(t, "open", a(this, "onopen")), s(t, "packet", a(this, "onpacket")), s(t, "close", a(this, "onclose"))]
        }
    }
    ,
    p.prototype.open = p.prototype.connect = function() {
        return this.connected || (this.subEvents(),
        this.io.open(),
        "open" === this.io.readyState && this.onopen(),
        this.emit("connecting")),
        this
    }
    ,
    p.prototype.send = function() {
        var t = o(arguments);
        return t.unshift("message"),
        this.emit.apply(this, t),
        this
    }
    ,
    p.prototype.emit = function(t) {
        if (u.hasOwnProperty(t))
            return f.apply(this, arguments),
            this;
        var e = o(arguments)
          , r = {
            type: (void 0 !== this.flags.binary ? this.flags.binary : h(e)) ? n.BINARY_EVENT : n.EVENT,
            data: e,
            options: {}
        };
        return r.options.compress = !this.flags || !1 !== this.flags.compress,
        "function" == typeof e[e.length - 1] && (l("emitting packet with ack id %d", this.ids),
        this.acks[this.ids] = e.pop(),
        r.id = this.ids++),
        this.connected ? this.packet(r) : this.sendBuffer.push(r),
        this.flags = {},
        this
    }
    ,
    p.prototype.packet = function(t) {
        t.nsp = this.nsp,
        this.io.packet(t)
    }
    ,
    p.prototype.onopen = function() {
        if (l("transport is open - connecting"),
        "/" !== this.nsp)
            if (this.query) {
                var t = "object" == typeof this.query ? c.encode(this.query) : this.query;
                l("sending connect packet with query %s", t),
                this.packet({
                    type: n.CONNECT,
                    query: t
                })
            } else
                this.packet({
                    type: n.CONNECT
                })
    }
    ,
    p.prototype.onclose = function(t) {
        l("close (%s)", t),
        this.connected = !1,
        this.disconnected = !0,
        delete this.id,
        this.emit("disconnect", t)
    }
    ,
    p.prototype.onpacket = function(t) {
        var e = t.nsp === this.nsp
          , r = t.type === n.ERROR && "/" === t.nsp;
        if (e || r)
            switch (t.type) {
            case n.CONNECT:
                this.onconnect();
                break;
            case n.EVENT:
            case n.BINARY_EVENT:
                this.onevent(t);
                break;
            case n.ACK:
            case n.BINARY_ACK:
                this.onack(t);
                break;
            case n.DISCONNECT:
                this.ondisconnect();
                break;
            case n.ERROR:
                this.emit("error", t.data)
            }
    }
    ,
    p.prototype.onevent = function(t) {
        var e = t.data || [];
        l("emitting event %j", e),
        null != t.id && (l("attaching ack callback to event"),
        e.push(this.ack(t.id))),
        this.connected ? f.apply(this, e) : this.receiveBuffer.push(e)
    }
    ,
    p.prototype.ack = function(t) {
        var e = this
          , r = !1;
        return function() {
            if (!r) {
                r = !0;
                var i = o(arguments);
                l("sending ack %j", i),
                e.packet({
                    type: h(i) ? n.BINARY_ACK : n.ACK,
                    id: t,
                    data: i
                })
            }
        }
    }
    ,
    p.prototype.onack = function(t) {
        var e = this.acks[t.id];
        "function" == typeof e ? (l("calling ack %s with %j", t.id, t.data),
        e.apply(this, t.data),
        delete this.acks[t.id]) : l("bad ack %s", t.id)
    }
    ,
    p.prototype.onconnect = function() {
        this.connected = !0,
        this.disconnected = !1,
        this.emit("connect"),
        this.emitBuffered()
    }
    ,
    p.prototype.emitBuffered = function() {
        var t;
        for (t = 0; t < this.receiveBuffer.length; t++)
            f.apply(this, this.receiveBuffer[t]);
        for (this.receiveBuffer = [],
        t = 0; t < this.sendBuffer.length; t++)
            this.packet(this.sendBuffer[t]);
        this.sendBuffer = []
    }
    ,
    p.prototype.ondisconnect = function() {
        l("server disconnect (%s)", this.nsp),
        this.destroy(),
        this.onclose("io server disconnect")
    }
    ,
    p.prototype.destroy = function() {
        if (this.subs) {
            for (var t = 0; t < this.subs.length; t++)
                this.subs[t].destroy();
            this.subs = null
        }
        this.io.destroy(this)
    }
    ,
    p.prototype.close = p.prototype.disconnect = function() {
        return this.connected && (l("performing disconnect (%s)", this.nsp),
        this.packet({
            type: n.DISCONNECT
        })),
        this.destroy(),
        this.connected && this.onclose("io client disconnect"),
        this
    }
    ,
    p.prototype.compress = function(t) {
        return this.flags.compress = t,
        this
    }
    ,
    p.prototype.binary = function(t) {
        return this.flags.binary = t,
        this
    }
}
, function(t, e) {
    t.exports = function(t, e, r) {
        return t.on(e, r),
        {
            destroy: function() {
                t.removeListener(e, r)
            }
        }
    }
}
, function(t, e) {
    var r = [].slice;
    t.exports = function(t, e) {
        if ("string" == typeof e && (e = t[e]),
        "function" != typeof e)
            throw new Error("bind() requires a function");
        var n = r.call(arguments, 2);
        return function() {
            return e.apply(t, n.concat(r.call(arguments)))
        }
    }
}
, function(t, e, r) {
    t.exports = function t(e, r, n) {
        function i(s, a) {
            if (!r[s]) {
                if (!e[s]) {
                    if (o)
                        return o(s, !0);
                    var l = new Error("Cannot find module '" + s + "'");
                    throw l.code = "MODULE_NOT_FOUND",
                    l
                }
                var c = r[s] = {
                    exports: {}
                };
                e[s][0].call(c.exports, function(t) {
                    return i(e[s][1][t] || t)
                }, c, c.exports, t, e, r, n)
            }
            return r[s].exports
        }
        for (var o = !1, s = 0; s < n.length; s++)
            i(n[s]);
        return i
    }({
        1: [function(t, e, r) {
            "use strict";
            function n(t) {
                if (!t.element.parentElement)
                    return null;
                var e = window.getComputedStyle(t.element.parentElement)
                  , r = parseInt(e.getPropertyValue("height"))
                  , n = Math.max(0, parseInt(e.getPropertyValue("width")))
                  , i = window.getComputedStyle(t.element)
                  , o = r - (parseInt(i.getPropertyValue("padding-top")) + parseInt(i.getPropertyValue("padding-bottom")))
                  , s = n - (parseInt(i.getPropertyValue("padding-right")) + parseInt(i.getPropertyValue("padding-left"))) - t._core.viewport.scrollBarWidth;
                return {
                    cols: Math.floor(s / t._core.renderer.dimensions.actualCellWidth),
                    rows: Math.floor(o / t._core.renderer.dimensions.actualCellHeight)
                }
            }
            function i(t) {
                var e = n(t);
                e && (t.rows === e.rows && t.cols === e.cols || (t._core.renderer.clear(),
                t.resize(e.cols, e.rows)))
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            }),
            r.proposeGeometry = n,
            r.fit = i,
            r.apply = function(t) {
                t.prototype.proposeGeometry = function() {
                    return n(this)
                }
                ,
                t.prototype.fit = function() {
                    i(this)
                }
            }
        }
        , {}]
    }, {}, [1])(1)
}
, function(t, e, r) {
    var n = r(15)
      , i = r(2)("socket.io-client:url");
    t.exports = function(t, e) {
        var r = t;
        e = e || "undefined" != typeof location && location,
        null == t && (t = e.protocol + "//" + e.host),
        "string" == typeof t && ("/" === t.charAt(0) && (t = "/" === t.charAt(1) ? e.protocol + t : e.host + t),
        /^(https?|wss?):\/\//.test(t) || (i("protocol-less url %s", t),
        t = void 0 !== e ? e.protocol + "//" + t : "https://" + t),
        i("parse %s", t),
        r = n(t)),
        r.port || (/^(http|ws)$/.test(r.protocol) ? r.port = "80" : /^(http|ws)s$/.test(r.protocol) && (r.port = "443")),
        r.path = r.path || "/";
        var o = -1 !== r.host.indexOf(":") ? "[" + r.host + "]" : r.host;
        return r.id = r.protocol + "://" + o + ":" + r.port,
        r.href = r.protocol + "://" + o + (e && e.port === r.port ? "" : ":" + r.port),
        r
    }
}
, function(t, e, r) {
    function n(t) {
        var r;
        function n() {
            if (n.enabled) {
                var t = n
                  , i = +new Date
                  , o = i - (r || i);
                t.diff = o,
                t.prev = r,
                t.curr = i,
                r = i;
                for (var s = new Array(arguments.length), a = 0; a < s.length; a++)
                    s[a] = arguments[a];
                s[0] = e.coerce(s[0]),
                "string" != typeof s[0] && s.unshift("%O");
                var l = 0;
                s[0] = s[0].replace(/%([a-zA-Z%])/g, function(r, n) {
                    if ("%%" === r)
                        return r;
                    l++;
                    var i = e.formatters[n];
                    if ("function" == typeof i) {
                        var o = s[l];
                        r = i.call(t, o),
                        s.splice(l, 1),
                        l--
                    }
                    return r
                }),
                e.formatArgs.call(t, s),
                (n.log || e.log || console.log.bind(console)).apply(t, s)
            }
        }
        return n.namespace = t,
        n.enabled = e.enabled(t),
        n.useColors = e.useColors(),
        n.color = function(t) {
            var r, n = 0;
            for (r in t)
                n = (n << 5) - n + t.charCodeAt(r),
                n |= 0;
            return e.colors[Math.abs(n) % e.colors.length]
        }(t),
        n.destroy = i,
        "function" == typeof e.init && e.init(n),
        e.instances.push(n),
        n
    }
    function i() {
        var t = e.instances.indexOf(this);
        return -1 !== t && (e.instances.splice(t, 1),
        !0)
    }
    (e = t.exports = n.debug = n.default = n).coerce = function(t) {
        return t instanceof Error ? t.stack || t.message : t
    }
    ,
    e.disable = function() {
        e.enable("")
    }
    ,
    e.enable = function(t) {
        var r;
        e.save(t),
        e.names = [],
        e.skips = [];
        var n = ("string" == typeof t ? t : "").split(/[\s,]+/)
          , i = n.length;
        for (r = 0; r < i; r++)
            n[r] && ("-" === (t = n[r].replace(/\*/g, ".*?"))[0] ? e.skips.push(new RegExp("^" + t.substr(1) + "$")) : e.names.push(new RegExp("^" + t + "$")));
        for (r = 0; r < e.instances.length; r++) {
            var o = e.instances[r];
            o.enabled = e.enabled(o.namespace)
        }
    }
    ,
    e.enabled = function(t) {
        if ("*" === t[t.length - 1])
            return !0;
        var r, n;
        for (r = 0,
        n = e.skips.length; r < n; r++)
            if (e.skips[r].test(t))
                return !1;
        for (r = 0,
        n = e.names.length; r < n; r++)
            if (e.names[r].test(t))
                return !0;
        return !1
    }
    ,
    e.humanize = r(7),
    e.instances = [],
    e.names = [],
    e.skips = [],
    e.formatters = {}
}
, function(t, e, r) {
    (function(n) {
        function i() {
            var t;
            try {
                t = e.storage.debug
            } catch (t) {}
            return !t && void 0 !== n && "env"in n && (t = n.env.DEBUG),
            t
        }
        (e = t.exports = r(31)).log = function() {
            return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
        }
        ,
        e.formatArgs = function(t) {
            var r = this.useColors;
            if (t[0] = (r ? "%c" : "") + this.namespace + (r ? " %c" : " ") + t[0] + (r ? "%c " : " ") + "+" + e.humanize(this.diff),
            r) {
                var n = "color: " + this.color;
                t.splice(1, 0, n, "color: inherit");
                var i = 0
                  , o = 0;
                t[0].replace(/%[a-zA-Z%]/g, function(t) {
                    "%%" !== t && (i++,
                    "%c" === t && (o = i))
                }),
                t.splice(o, 0, n)
            }
        }
        ,
        e.save = function(t) {
            try {
                null == t ? e.storage.removeItem("debug") : e.storage.debug = t
            } catch (t) {}
        }
        ,
        e.load = i,
        e.useColors = function() {
            return !("undefined" == typeof window || !window.process || "renderer" !== window.process.type) || ("undefined" == typeof navigator || !navigator.userAgent || !navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) && ("undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && 31 <= parseInt(RegExp.$1, 10) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
        }
        ,
        e.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : function() {
            try {
                return window.localStorage
            } catch (t) {}
        }(),
        e.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"],
        e.formatters.j = function(t) {
            try {
                return JSON.stringify(t)
            } catch (t) {
                return "[UnexpectedJSONParseError]: " + t.message
            }
        }
        ,
        e.enable(i())
    }
    ).call(this, r(6))
}
, function(t, e, r) {
    function n(t) {
        var r;
        function n() {
            if (n.enabled) {
                var t = n
                  , i = +new Date
                  , o = i - (r || i);
                t.diff = o,
                t.prev = r,
                t.curr = i,
                r = i;
                for (var s = new Array(arguments.length), a = 0; a < s.length; a++)
                    s[a] = arguments[a];
                s[0] = e.coerce(s[0]),
                "string" != typeof s[0] && s.unshift("%O");
                var l = 0;
                s[0] = s[0].replace(/%([a-zA-Z%])/g, function(r, n) {
                    if ("%%" === r)
                        return r;
                    l++;
                    var i = e.formatters[n];
                    if ("function" == typeof i) {
                        var o = s[l];
                        r = i.call(t, o),
                        s.splice(l, 1),
                        l--
                    }
                    return r
                }),
                e.formatArgs.call(t, s),
                (n.log || e.log || console.log.bind(console)).apply(t, s)
            }
        }
        return n.namespace = t,
        n.enabled = e.enabled(t),
        n.useColors = e.useColors(),
        n.color = function(t) {
            var r, n = 0;
            for (r in t)
                n = (n << 5) - n + t.charCodeAt(r),
                n |= 0;
            return e.colors[Math.abs(n) % e.colors.length]
        }(t),
        n.destroy = i,
        "function" == typeof e.init && e.init(n),
        e.instances.push(n),
        n
    }
    function i() {
        var t = e.instances.indexOf(this);
        return -1 !== t && (e.instances.splice(t, 1),
        !0)
    }
    (e = t.exports = n.debug = n.default = n).coerce = function(t) {
        return t instanceof Error ? t.stack || t.message : t
    }
    ,
    e.disable = function() {
        e.enable("")
    }
    ,
    e.enable = function(t) {
        var r;
        e.save(t),
        e.names = [],
        e.skips = [];
        var n = ("string" == typeof t ? t : "").split(/[\s,]+/)
          , i = n.length;
        for (r = 0; r < i; r++)
            n[r] && ("-" === (t = n[r].replace(/\*/g, ".*?"))[0] ? e.skips.push(new RegExp("^" + t.substr(1) + "$")) : e.names.push(new RegExp("^" + t + "$")));
        for (r = 0; r < e.instances.length; r++) {
            var o = e.instances[r];
            o.enabled = e.enabled(o.namespace)
        }
    }
    ,
    e.enabled = function(t) {
        if ("*" === t[t.length - 1])
            return !0;
        var r, n;
        for (r = 0,
        n = e.skips.length; r < n; r++)
            if (e.skips[r].test(t))
                return !1;
        for (r = 0,
        n = e.names.length; r < n; r++)
            if (e.names[r].test(t))
                return !0;
        return !1
    }
    ,
    e.humanize = r(7),
    e.instances = [],
    e.names = [],
    e.skips = [],
    e.formatters = {}
}
, function(t, e, r) {
    var n = r(9)
      , i = r(16)
      , o = Object.prototype.toString
      , s = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === o.call(Blob)
      , a = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === o.call(File);
    e.deconstructPacket = function(t) {
        var e = []
          , r = t.data
          , o = t;
        return o.data = function t(e, r) {
            if (!e)
                return e;
            if (i(e)) {
                var o = {
                    _placeholder: !0,
                    num: r.length
                };
                return r.push(e),
                o
            }
            if (n(e)) {
                for (var s = new Array(e.length), a = 0; a < e.length; a++)
                    s[a] = t(e[a], r);
                return s
            }
            if ("object" == typeof e && !(e instanceof Date)) {
                s = {};
                for (var l in e)
                    s[l] = t(e[l], r);
                return s
            }
            return e
        }(r, e),
        o.attachments = e.length,
        {
            packet: o,
            buffers: e
        }
    }
    ,
    e.reconstructPacket = function(t, e) {
        return t.data = function t(e, r) {
            if (!e)
                return e;
            if (e && e._placeholder)
                return r[e.num];
            if (n(e))
                for (var i = 0; i < e.length; i++)
                    e[i] = t(e[i], r);
            else if ("object" == typeof e)
                for (var o in e)
                    e[o] = t(e[o], r);
            return e
        }(t.data, e),
        t.attachments = void 0,
        t
    }
    ,
    e.removeBlobs = function(t, e) {
        var r = 0
          , o = t;
        !function t(l, c, h) {
            if (!l)
                return l;
            if (s && l instanceof Blob || a && l instanceof File) {
                r++;
                var u = new FileReader;
                u.onload = function() {
                    h ? h[c] = this.result : o = this.result,
                    --r || e(o)
                }
                ,
                u.readAsArrayBuffer(l)
            } else if (n(l))
                for (var f = 0; f < l.length; f++)
                    t(l[f], f, l);
            else if ("object" == typeof l && !i(l))
                for (var p in l)
                    t(l[p], p, l)
        }(o),
        r || e(o)
    }
}
, function(t, e, r) {
    "use strict";
    e.byteLength = function(t) {
        var e = c(t)
          , r = e[0]
          , n = e[1];
        return 3 * (r + n) / 4 - n
    }
    ,
    e.toByteArray = function(t) {
        for (var e, r = c(t), n = r[0], s = r[1], a = new o(3 * (n + (f = s)) / 4 - f), l = 0, h = 0 < s ? n - 4 : n, u = 0; u < h; u += 4)
            e = i[t.charCodeAt(u)] << 18 | i[t.charCodeAt(u + 1)] << 12 | i[t.charCodeAt(u + 2)] << 6 | i[t.charCodeAt(u + 3)],
            a[l++] = e >> 16 & 255,
            a[l++] = e >> 8 & 255,
            a[l++] = 255 & e;
        var f;
        return 2 === s && (e = i[t.charCodeAt(u)] << 2 | i[t.charCodeAt(u + 1)] >> 4,
        a[l++] = 255 & e),
        1 === s && (e = i[t.charCodeAt(u)] << 10 | i[t.charCodeAt(u + 1)] << 4 | i[t.charCodeAt(u + 2)] >> 2,
        a[l++] = e >> 8 & 255,
        a[l++] = 255 & e),
        a
    }
    ,
    e.fromByteArray = function(t) {
        for (var e, r = t.length, i = r % 3, o = [], s = 0, a = r - i; s < a; s += 16383)
            o.push(h(t, s, a < s + 16383 ? a : s + 16383));
        return 1 === i ? (e = t[r - 1],
        o.push(n[e >> 2] + n[e << 4 & 63] + "==")) : 2 === i && (e = (t[r - 2] << 8) + t[r - 1],
        o.push(n[e >> 10] + n[e >> 4 & 63] + n[e << 2 & 63] + "=")),
        o.join("")
    }
    ;
    for (var n = [], i = [], o = "undefined" != typeof Uint8Array ? Uint8Array : Array, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = 0, l = s.length; a < l; ++a)
        n[a] = s[a],
        i[s.charCodeAt(a)] = a;
    function c(t) {
        var e = t.length;
        if (0 < e % 4)
            throw new Error("Invalid string. Length must be a multiple of 4");
        var r = t.indexOf("=");
        return -1 === r && (r = e),
        [r, r === e ? 0 : 4 - r % 4]
    }
    function h(t, e, r) {
        for (var i, o, s = [], a = e; a < r; a += 3)
            i = (t[a] << 16 & 16711680) + (t[a + 1] << 8 & 65280) + (255 & t[a + 2]),
            s.push(n[(o = i) >> 18 & 63] + n[o >> 12 & 63] + n[o >> 6 & 63] + n[63 & o]);
        return s.join("")
    }
    i["-".charCodeAt(0)] = 62,
    i["_".charCodeAt(0)] = 63
}
, function(t, e) {
    e.read = function(t, e, r, n, i) {
        var o, s, a = 8 * i - n - 1, l = (1 << a) - 1, c = l >> 1, h = -7, u = r ? i - 1 : 0, f = r ? -1 : 1, p = t[e + u];
        for (u += f,
        o = p & (1 << -h) - 1,
        p >>= -h,
        h += a; 0 < h; o = 256 * o + t[e + u],
        u += f,
        h -= 8)
            ;
        for (s = o & (1 << -h) - 1,
        o >>= -h,
        h += n; 0 < h; s = 256 * s + t[e + u],
        u += f,
        h -= 8)
            ;
        if (0 === o)
            o = 1 - c;
        else {
            if (o === l)
                return s ? NaN : 1 / 0 * (p ? -1 : 1);
            s += Math.pow(2, n),
            o -= c
        }
        return (p ? -1 : 1) * s * Math.pow(2, o - n)
    }
    ,
    e.write = function(t, e, r, n, i, o) {
        var s, a, l, c = 8 * o - i - 1, h = (1 << c) - 1, u = h >> 1, f = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0, p = n ? 0 : o - 1, d = n ? 1 : -1, _ = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
        for (e = Math.abs(e),
        isNaN(e) || e === 1 / 0 ? (a = isNaN(e) ? 1 : 0,
        s = h) : (s = Math.floor(Math.log(e) / Math.LN2),
        e * (l = Math.pow(2, -s)) < 1 && (s--,
        l *= 2),
        2 <= (e += 1 <= s + u ? f / l : f * Math.pow(2, 1 - u)) * l && (s++,
        l /= 2),
        h <= s + u ? (a = 0,
        s = h) : 1 <= s + u ? (a = (e * l - 1) * Math.pow(2, i),
        s += u) : (a = e * Math.pow(2, u - 1) * Math.pow(2, i),
        s = 0)); 8 <= i; t[r + p] = 255 & a,
        p += d,
        a /= 256,
        i -= 8)
            ;
        for (s = s << i | a,
        c += i; 0 < c; t[r + p] = 255 & s,
        p += d,
        s /= 256,
        c -= 8)
            ;
        t[r + p - d] |= 128 * _
    }
}
, function(t, e) {
    var r = {}.toString;
    t.exports = Array.isArray || function(t) {
        return "[object Array]" == r.call(t)
    }
}
, function(t, e, r) {
    t.exports = r(37),
    t.exports.parser = r(1)
}
, function(t, e, r) {
    var n = r(19)
      , i = r(0)
      , o = r(5)("engine.io-client:socket")
      , s = r(23)
      , a = r(1)
      , l = r(15)
      , c = r(3);
    function h(t, e) {
        if (!(this instanceof h))
            return new h(t,e);
        e = e || {},
        t && "object" == typeof t && (e = t,
        t = null),
        t ? (t = l(t),
        e.hostname = t.host,
        e.secure = "https" === t.protocol || "wss" === t.protocol,
        e.port = t.port,
        t.query && (e.query = t.query)) : e.host && (e.hostname = l(e.host).host),
        this.secure = null != e.secure ? e.secure : "undefined" != typeof location && "https:" === location.protocol,
        e.hostname && !e.port && (e.port = this.secure ? "443" : "80"),
        this.agent = e.agent || !1,
        this.hostname = e.hostname || ("undefined" != typeof location ? location.hostname : "localhost"),
        this.port = e.port || ("undefined" != typeof location && location.port ? location.port : this.secure ? 443 : 80),
        this.query = e.query || {},
        "string" == typeof this.query && (this.query = c.decode(this.query)),
        this.upgrade = !1 !== e.upgrade,
        this.path = (e.path || "/engine.io").replace(/\/$/, "") + "/",
        this.forceJSONP = !!e.forceJSONP,
        this.jsonp = !1 !== e.jsonp,
        this.forceBase64 = !!e.forceBase64,
        this.enablesXDR = !!e.enablesXDR,
        this.timestampParam = e.timestampParam || "t",
        this.timestampRequests = e.timestampRequests,
        this.transports = e.transports || ["polling", "websocket"],
        this.transportOptions = e.transportOptions || {},
        this.readyState = "",
        this.writeBuffer = [],
        this.prevBufferLen = 0,
        this.policyPort = e.policyPort || 843,
        this.rememberUpgrade = e.rememberUpgrade || !1,
        this.binaryType = null,
        this.onlyBinaryUpgrades = e.onlyBinaryUpgrades,
        this.perMessageDeflate = !1 !== e.perMessageDeflate && (e.perMessageDeflate || {}),
        !0 === this.perMessageDeflate && (this.perMessageDeflate = {}),
        this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024),
        this.pfx = e.pfx || null,
        this.key = e.key || null,
        this.passphrase = e.passphrase || null,
        this.cert = e.cert || null,
        this.ca = e.ca || null,
        this.ciphers = e.ciphers || null,
        this.rejectUnauthorized = void 0 === e.rejectUnauthorized || e.rejectUnauthorized,
        this.forceNode = !!e.forceNode,
        this.isReactNative = "undefined" != typeof navigator && "string" == typeof navigator.product && "reactnative" === navigator.product.toLowerCase(),
        ("undefined" == typeof self || this.isReactNative) && (e.extraHeaders && 0 < Object.keys(e.extraHeaders).length && (this.extraHeaders = e.extraHeaders),
        e.localAddress && (this.localAddress = e.localAddress)),
        this.id = null,
        this.upgrades = null,
        this.pingInterval = null,
        this.pingTimeout = null,
        this.pingIntervalTimer = null,
        this.pingTimeoutTimer = null,
        this.open()
    }
    (t.exports = h).priorWebsocketSuccess = !1,
    i(h.prototype),
    h.protocol = a.protocol,
    (h.Socket = h).Transport = r(12),
    h.transports = r(19),
    h.parser = r(1),
    h.prototype.createTransport = function(t) {
        o('creating transport "%s"', t);
        var e = function(t) {
            var e = {};
            for (var r in t)
                t.hasOwnProperty(r) && (e[r] = t[r]);
            return e
        }(this.query);
        e.EIO = a.protocol,
        e.transport = t;
        var r = this.transportOptions[t] || {};
        return this.id && (e.sid = this.id),
        new n[t]({
            query: e,
            socket: this,
            agent: r.agent || this.agent,
            hostname: r.hostname || this.hostname,
            port: r.port || this.port,
            secure: r.secure || this.secure,
            path: r.path || this.path,
            forceJSONP: r.forceJSONP || this.forceJSONP,
            jsonp: r.jsonp || this.jsonp,
            forceBase64: r.forceBase64 || this.forceBase64,
            enablesXDR: r.enablesXDR || this.enablesXDR,
            timestampRequests: r.timestampRequests || this.timestampRequests,
            timestampParam: r.timestampParam || this.timestampParam,
            policyPort: r.policyPort || this.policyPort,
            pfx: r.pfx || this.pfx,
            key: r.key || this.key,
            passphrase: r.passphrase || this.passphrase,
            cert: r.cert || this.cert,
            ca: r.ca || this.ca,
            ciphers: r.ciphers || this.ciphers,
            rejectUnauthorized: r.rejectUnauthorized || this.rejectUnauthorized,
            perMessageDeflate: r.perMessageDeflate || this.perMessageDeflate,
            extraHeaders: r.extraHeaders || this.extraHeaders,
            forceNode: r.forceNode || this.forceNode,
            localAddress: r.localAddress || this.localAddress,
            requestTimeout: r.requestTimeout || this.requestTimeout,
            protocols: r.protocols || void 0,
            isReactNative: this.isReactNative
        })
    }
    ,
    h.prototype.open = function() {
        var t;
        if (this.rememberUpgrade && h.priorWebsocketSuccess && -1 !== this.transports.indexOf("websocket"))
            t = "websocket";
        else {
            if (0 === this.transports.length) {
                var e = this;
                return void setTimeout(function() {
                    e.emit("error", "No transports available")
                }, 0)
            }
            t = this.transports[0]
        }
        this.readyState = "opening";
        try {
            t = this.createTransport(t)
        } catch (t) {
            return this.transports.shift(),
            void this.open()
        }
        t.open(),
        this.setTransport(t)
    }
    ,
    h.prototype.setTransport = function(t) {
        o("setting transport %s", t.name);
        var e = this;
        this.transport && (o("clearing existing transport %s", this.transport.name),
        this.transport.removeAllListeners()),
        (this.transport = t).on("drain", function() {
            e.onDrain()
        }).on("packet", function(t) {
            e.onPacket(t)
        }).on("error", function(t) {
            e.onError(t)
        }).on("close", function() {
            e.onClose("transport close")
        })
    }
    ,
    h.prototype.probe = function(t) {
        o('probing transport "%s"', t);
        var e = this.createTransport(t, {
            probe: 1
        })
          , r = !1
          , n = this;
        function i() {
            if (n.onlyBinaryUpgrades) {
                var i = !this.supportsBinary && n.transport.supportsBinary;
                r = r || i
            }
            r || (o('probe transport "%s" opened', t),
            e.send([{
                type: "ping",
                data: "probe"
            }]),
            e.once("packet", function(i) {
                if (!r)
                    if ("pong" === i.type && "probe" === i.data) {
                        if (o('probe transport "%s" pong', t),
                        n.upgrading = !0,
                        n.emit("upgrading", e),
                        !e)
                            return;
                        h.priorWebsocketSuccess = "websocket" === e.name,
                        o('pausing current transport "%s"', n.transport.name),
                        n.transport.pause(function() {
                            r || "closed" !== n.readyState && (o("changing transport and sending upgrade packet"),
                            f(),
                            n.setTransport(e),
                            e.send([{
                                type: "upgrade"
                            }]),
                            n.emit("upgrade", e),
                            e = null,
                            n.upgrading = !1,
                            n.flush())
                        })
                    } else {
                        o('probe transport "%s" failed', t);
                        var s = new Error("probe error");
                        s.transport = e.name,
                        n.emit("upgradeError", s)
                    }
            }))
        }
        function s() {
            r || (r = !0,
            f(),
            e.close(),
            e = null)
        }
        function a(r) {
            var i = new Error("probe error: " + r);
            i.transport = e.name,
            s(),
            o('probe transport "%s" failed because of error: %s', t, r),
            n.emit("upgradeError", i)
        }
        function l() {
            a("transport closed")
        }
        function c() {
            a("socket closed")
        }
        function u(t) {
            e && t.name !== e.name && (o('"%s" works - aborting "%s"', t.name, e.name),
            s())
        }
        function f() {
            e.removeListener("open", i),
            e.removeListener("error", a),
            e.removeListener("close", l),
            n.removeListener("close", c),
            n.removeListener("upgrading", u)
        }
        h.priorWebsocketSuccess = !1,
        e.once("open", i),
        e.once("error", a),
        e.once("close", l),
        this.once("close", c),
        this.once("upgrading", u),
        e.open()
    }
    ,
    h.prototype.onOpen = function() {
        if (o("socket open"),
        this.readyState = "open",
        h.priorWebsocketSuccess = "websocket" === this.transport.name,
        this.emit("open"),
        this.flush(),
        "open" === this.readyState && this.upgrade && this.transport.pause) {
            o("starting upgrade probes");
            for (var t = 0, e = this.upgrades.length; t < e; t++)
                this.probe(this.upgrades[t])
        }
    }
    ,
    h.prototype.onPacket = function(t) {
        if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState)
            switch (o('socket receive: type "%s", data "%s"', t.type, t.data),
            this.emit("packet", t),
            this.emit("heartbeat"),
            t.type) {
            case "open":
                this.onHandshake(JSON.parse(t.data));
                break;
            case "pong":
                this.setPing(),
                this.emit("pong");
                break;
            case "error":
                var e = new Error("server error");
                e.code = t.data,
                this.onError(e);
                break;
            case "message":
                this.emit("data", t.data),
                this.emit("message", t.data)
            }
        else
            o('packet received with socket readyState "%s"', this.readyState)
    }
    ,
    h.prototype.onHandshake = function(t) {
        this.emit("handshake", t),
        this.id = t.sid,
        this.transport.query.sid = t.sid,
        this.upgrades = this.filterUpgrades(t.upgrades),
        this.pingInterval = t.pingInterval,
        this.pingTimeout = t.pingTimeout,
        this.onOpen(),
        "closed" !== this.readyState && (this.setPing(),
        this.removeListener("heartbeat", this.onHeartbeat),
        this.on("heartbeat", this.onHeartbeat))
    }
    ,
    h.prototype.onHeartbeat = function(t) {
        clearTimeout(this.pingTimeoutTimer);
        var e = this;
        e.pingTimeoutTimer = setTimeout(function() {
            "closed" !== e.readyState && e.onClose("ping timeout")
        }, t || e.pingInterval + e.pingTimeout)
    }
    ,
    h.prototype.setPing = function() {
        var t = this;
        clearTimeout(t.pingIntervalTimer),
        t.pingIntervalTimer = setTimeout(function() {
            o("writing ping packet - expecting pong within %sms", t.pingTimeout),
            t.ping(),
            t.onHeartbeat(t.pingTimeout)
        }, t.pingInterval)
    }
    ,
    h.prototype.ping = function() {
        var t = this;
        this.sendPacket("ping", function() {
            t.emit("ping")
        })
    }
    ,
    h.prototype.onDrain = function() {
        this.writeBuffer.splice(0, this.prevBufferLen),
        (this.prevBufferLen = 0) === this.writeBuffer.length ? this.emit("drain") : this.flush()
    }
    ,
    h.prototype.flush = function() {
        "closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (o("flushing %d packets in socket", this.writeBuffer.length),
        this.transport.send(this.writeBuffer),
        this.prevBufferLen = this.writeBuffer.length,
        this.emit("flush"))
    }
    ,
    h.prototype.write = h.prototype.send = function(t, e, r) {
        return this.sendPacket("message", t, e, r),
        this
    }
    ,
    h.prototype.sendPacket = function(t, e, r, n) {
        if ("function" == typeof e && (n = e,
        e = void 0),
        "function" == typeof r && (n = r,
        r = null),
        "closing" !== this.readyState && "closed" !== this.readyState) {
            (r = r || {}).compress = !1 !== r.compress;
            var i = {
                type: t,
                data: e,
                options: r
            };
            this.emit("packetCreate", i),
            this.writeBuffer.push(i),
            n && this.once("flush", n),
            this.flush()
        }
    }
    ,
    h.prototype.close = function() {
        if ("opening" === this.readyState || "open" === this.readyState) {
            this.readyState = "closing";
            var t = this;
            this.writeBuffer.length ? this.once("drain", function() {
                this.upgrading ? n() : e()
            }) : this.upgrading ? n() : e()
        }
        function e() {
            t.onClose("forced close"),
            o("socket closing - telling transport to close"),
            t.transport.close()
        }
        function r() {
            t.removeListener("upgrade", r),
            t.removeListener("upgradeError", r),
            e()
        }
        function n() {
            t.once("upgrade", r),
            t.once("upgradeError", r)
        }
        return this
    }
    ,
    h.prototype.onError = function(t) {
        o("socket error %j", t),
        h.priorWebsocketSuccess = !1,
        this.emit("error", t),
        this.onClose("transport error", t)
    }
    ,
    h.prototype.onClose = function(t, e) {
        "opening" !== this.readyState && "open" !== this.readyState && "closing" !== this.readyState || (o('socket close with reason: "%s"', t),
        clearTimeout(this.pingIntervalTimer),
        clearTimeout(this.pingTimeoutTimer),
        this.transport.removeAllListeners("close"),
        this.transport.close(),
        this.transport.removeAllListeners(),
        this.readyState = "closed",
        this.id = null,
        this.emit("close", t, e),
        this.writeBuffer = [],
        this.prevBufferLen = 0)
    }
    ,
    h.prototype.filterUpgrades = function(t) {
        for (var e = [], r = 0, n = t.length; r < n; r++)
            ~s(this.transports, t[r]) && e.push(t[r]);
        return e
    }
}
, function(t, e) {
    try {
        t.exports = "undefined" != typeof XMLHttpRequest && "withCredentials"in new XMLHttpRequest
    } catch (e) {
        t.exports = !1
    }
}
, function(t, e, r) {
    var n = r(11)
      , i = r(20)
      , o = r(0)
      , s = r(4)
      , a = r(5)("engine.io-client:polling-xhr");
    function l() {}
    function c(t) {
        if (i.call(this, t),
        this.requestTimeout = t.requestTimeout,
        this.extraHeaders = t.extraHeaders,
        "undefined" != typeof location) {
            var e = "https:" === location.protocol
              , r = location.port;
            r || (r = e ? 443 : 80),
            this.xd = "undefined" != typeof location && t.hostname !== location.hostname || r !== t.port,
            this.xs = t.secure !== e
        }
    }
    function h(t) {
        this.method = t.method || "GET",
        this.uri = t.uri,
        this.xd = !!t.xd,
        this.xs = !!t.xs,
        this.async = !1 !== t.async,
        this.data = void 0 !== t.data ? t.data : null,
        this.agent = t.agent,
        this.isBinary = t.isBinary,
        this.supportsBinary = t.supportsBinary,
        this.enablesXDR = t.enablesXDR,
        this.requestTimeout = t.requestTimeout,
        this.pfx = t.pfx,
        this.key = t.key,
        this.passphrase = t.passphrase,
        this.cert = t.cert,
        this.ca = t.ca,
        this.ciphers = t.ciphers,
        this.rejectUnauthorized = t.rejectUnauthorized,
        this.extraHeaders = t.extraHeaders,
        this.create()
    }
    if (t.exports = c,
    t.exports.Request = h,
    s(c, i),
    c.prototype.supportsBinary = !0,
    c.prototype.request = function(t) {
        return (t = t || {}).uri = this.uri(),
        t.xd = this.xd,
        t.xs = this.xs,
        t.agent = this.agent || !1,
        t.supportsBinary = this.supportsBinary,
        t.enablesXDR = this.enablesXDR,
        t.pfx = this.pfx,
        t.key = this.key,
        t.passphrase = this.passphrase,
        t.cert = this.cert,
        t.ca = this.ca,
        t.ciphers = this.ciphers,
        t.rejectUnauthorized = this.rejectUnauthorized,
        t.requestTimeout = this.requestTimeout,
        t.extraHeaders = this.extraHeaders,
        new h(t)
    }
    ,
    c.prototype.doWrite = function(t, e) {
        var r = "string" != typeof t && void 0 !== t
          , n = this.request({
            method: "POST",
            data: t,
            isBinary: r
        })
          , i = this;
        n.on("success", e),
        n.on("error", function(t) {
            i.onError("xhr post error", t)
        }),
        this.sendXhr = n
    }
    ,
    c.prototype.doPoll = function() {
        a("xhr poll");
        var t = this.request()
          , e = this;
        t.on("data", function(t) {
            e.onData(t)
        }),
        t.on("error", function(t) {
            e.onError("xhr poll error", t)
        }),
        this.pollXhr = t
    }
    ,
    o(h.prototype),
    h.prototype.create = function() {
        var t = {
            agent: this.agent,
            xdomain: this.xd,
            xscheme: this.xs,
            enablesXDR: this.enablesXDR
        };
        t.pfx = this.pfx,
        t.key = this.key,
        t.passphrase = this.passphrase,
        t.cert = this.cert,
        t.ca = this.ca,
        t.ciphers = this.ciphers,
        t.rejectUnauthorized = this.rejectUnauthorized;
        var e = this.xhr = new n(t)
          , r = this;
        try {
            a("xhr open %s: %s", this.method, this.uri),
            e.open(this.method, this.uri, this.async);
            try {
                if (this.extraHeaders)
                    for (var i in e.setDisableHeaderCheck && e.setDisableHeaderCheck(!0),
                    this.extraHeaders)
                        this.extraHeaders.hasOwnProperty(i) && e.setRequestHeader(i, this.extraHeaders[i])
            } catch (t) {}
            if ("POST" === this.method)
                try {
                    this.isBinary ? e.setRequestHeader("Content-type", "application/octet-stream") : e.setRequestHeader("Content-type", "text/plain;charset=UTF-8")
                } catch (t) {}
            try {
                e.setRequestHeader("Accept", "*/*")
            } catch (t) {}
            "withCredentials"in e && (e.withCredentials = !0),
            this.requestTimeout && (e.timeout = this.requestTimeout),
            this.hasXDR() ? (e.onload = function() {
                r.onLoad()
            }
            ,
            e.onerror = function() {
                r.onError(e.responseText)
            }
            ) : e.onreadystatechange = function() {
                if (2 === e.readyState)
                    try {
                        var t = e.getResponseHeader("Content-Type");
                        r.supportsBinary && "application/octet-stream" === t && (e.responseType = "arraybuffer")
                    } catch (t) {}
                4 === e.readyState && (200 === e.status || 1223 === e.status ? r.onLoad() : setTimeout(function() {
                    r.onError(e.status)
                }, 0))
            }
            ,
            a("xhr data %s", this.data),
            e.send(this.data)
        } catch (t) {
            return void setTimeout(function() {
                r.onError(t)
            }, 0)
        }
        "undefined" != typeof document && (this.index = h.requestsCount++,
        h.requests[this.index] = this)
    }
    ,
    h.prototype.onSuccess = function() {
        this.emit("success"),
        this.cleanup()
    }
    ,
    h.prototype.onData = function(t) {
        this.emit("data", t),
        this.onSuccess()
    }
    ,
    h.prototype.onError = function(t) {
        this.emit("error", t),
        this.cleanup(!0)
    }
    ,
    h.prototype.cleanup = function(t) {
        if (void 0 !== this.xhr && null !== this.xhr) {
            if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = l : this.xhr.onreadystatechange = l,
            t)
                try {
                    this.xhr.abort()
                } catch (t) {}
            "undefined" != typeof document && delete h.requests[this.index],
            this.xhr = null
        }
    }
    ,
    h.prototype.onLoad = function() {
        var t;
        try {
            var e;
            try {
                e = this.xhr.getResponseHeader("Content-Type")
            } catch (t) {}
            t = "application/octet-stream" === e && this.xhr.response || this.xhr.responseText
        } catch (t) {
            this.onError(t)
        }
        null != t && this.onData(t)
    }
    ,
    h.prototype.hasXDR = function() {
        return "undefined" != typeof XDomainRequest && !this.xs && this.enablesXDR
    }
    ,
    h.prototype.abort = function() {
        this.cleanup()
    }
    ,
    h.requestsCount = 0,
    h.requests = {},
    "undefined" != typeof document)
        if ("function" == typeof attachEvent)
            attachEvent("onunload", f);
        else if ("function" == typeof addEventListener) {
            var u = "onpagehide"in self ? "pagehide" : "unload";
            addEventListener(u, f, !1)
        }
    function f() {
        for (var t in h.requests)
            h.requests.hasOwnProperty(t) && h.requests[t].abort()
    }
}
, function(t, e) {
    t.exports = Object.keys || function(t) {
        var e = []
          , r = Object.prototype.hasOwnProperty;
        for (var n in t)
            r.call(t, n) && e.push(n);
        return e
    }
}
, function(t, e) {
    t.exports = function(t, e, r) {
        var n = t.byteLength;
        if (e = e || 0,
        r = r || n,
        t.slice)
            return t.slice(e, r);
        if (e < 0 && (e += n),
        r < 0 && (r += n),
        n < r && (r = n),
        n <= e || r <= e || 0 === n)
            return new ArrayBuffer(0);
        for (var i = new Uint8Array(t), o = new Uint8Array(r - e), s = e, a = 0; s < r; s++,
        a++)
            o[a] = i[s];
        return o.buffer
    }
}
, function(t, e) {
    function r() {}
    t.exports = function(t, e, n) {
        var i = !1;
        return n = n || r,
        0 === (o.count = t) ? e() : o;
        function o(t, r) {
            if (o.count <= 0)
                throw new Error("after called too many times");
            --o.count,
            t ? (i = !0,
            e(t),
            e = n) : 0 !== o.count || i || e(null, r)
        }
    }
}
, function(t, e) {
    var r, n, i, o = String.fromCharCode;
    function s(t) {
        for (var e, r, n = [], i = 0, o = t.length; i < o; )
            55296 <= (e = t.charCodeAt(i++)) && e <= 56319 && i < o ? 56320 == (64512 & (r = t.charCodeAt(i++))) ? n.push(((1023 & e) << 10) + (1023 & r) + 65536) : (n.push(e),
            i--) : n.push(e);
        return n
    }
    function a(t, e) {
        if (55296 <= t && t <= 57343) {
            if (e)
                throw Error("Lone surrogate U+" + t.toString(16).toUpperCase() + " is not a scalar value");
            return !1
        }
        return !0
    }
    function l(t, e) {
        return o(t >> e & 63 | 128)
    }
    function c(t, e) {
        if (0 == (4294967168 & t))
            return o(t);
        var r = "";
        return 0 == (4294965248 & t) ? r = o(t >> 6 & 31 | 192) : 0 == (4294901760 & t) ? (a(t, e) || (t = 65533),
        r = o(t >> 12 & 15 | 224),
        r += l(t, 6)) : 0 == (4292870144 & t) && (r = o(t >> 18 & 7 | 240),
        r += l(t, 12),
        r += l(t, 6)),
        r + o(63 & t | 128)
    }
    function h() {
        if (n <= i)
            throw Error("Invalid byte index");
        var t = 255 & r[i];
        if (i++,
        128 == (192 & t))
            return 63 & t;
        throw Error("Invalid continuation byte")
    }
    function u(t) {
        var e, o;
        if (n < i)
            throw Error("Invalid byte index");
        if (i == n)
            return !1;
        if (e = 255 & r[i],
        i++,
        0 == (128 & e))
            return e;
        if (192 == (224 & e)) {
            if (128 <= (o = (31 & e) << 6 | h()))
                return o;
            throw Error("Invalid continuation byte")
        }
        if (224 == (240 & e)) {
            if (2048 <= (o = (15 & e) << 12 | h() << 6 | h()))
                return a(o, t) ? o : 65533;
            throw Error("Invalid continuation byte")
        }
        if (240 == (248 & e) && 65536 <= (o = (7 & e) << 18 | h() << 12 | h() << 6 | h()) && o <= 1114111)
            return o;
        throw Error("Invalid UTF-8 detected")
    }
    t.exports = {
        version: "2.1.2",
        encode: function(t, e) {
            for (var r = !1 !== (e = e || {}).strict, n = s(t), i = n.length, o = -1, a = ""; ++o < i; )
                a += c(n[o], r);
            return a
        },
        decode: function(t, e) {
            var a = !1 !== (e = e || {}).strict;
            r = s(t),
            n = r.length,
            i = 0;
            for (var l, c = []; !1 !== (l = u(a)); )
                c.push(l);
            return function(t) {
                for (var e, r = t.length, n = -1, i = ""; ++n < r; )
                    65535 < (e = t[n]) && (i += o((e -= 65536) >>> 10 & 1023 | 55296),
                    e = 56320 | 1023 & e),
                    i += o(e);
                return i
            }(c)
        }
    }
}
, function(t, e) {
    !function() {
        "use strict";
        for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", r = new Uint8Array(256), n = 0; n < t.length; n++)
            r[t.charCodeAt(n)] = n;
        e.encode = function(e) {
            var r, n = new Uint8Array(e), i = n.length, o = "";
            for (r = 0; r < i; r += 3)
                o += t[n[r] >> 2],
                o += t[(3 & n[r]) << 4 | n[r + 1] >> 4],
                o += t[(15 & n[r + 1]) << 2 | n[r + 2] >> 6],
                o += t[63 & n[r + 2]];
            return i % 3 == 2 ? o = o.substring(0, o.length - 1) + "=" : i % 3 == 1 && (o = o.substring(0, o.length - 2) + "=="),
            o
        }
        ,
        e.decode = function(t) {
            var e, n, i, o, s, a = .75 * t.length, l = t.length, c = 0;
            "=" === t[t.length - 1] && (a--,
            "=" === t[t.length - 2] && a--);
            var h = new ArrayBuffer(a)
              , u = new Uint8Array(h);
            for (e = 0; e < l; e += 4)
                n = r[t.charCodeAt(e)],
                i = r[t.charCodeAt(e + 1)],
                o = r[t.charCodeAt(e + 2)],
                s = r[t.charCodeAt(e + 3)],
                u[c++] = n << 2 | i >> 4,
                u[c++] = (15 & i) << 4 | o >> 2,
                u[c++] = (3 & o) << 6 | 63 & s;
            return h
        }
    }()
}
, function(t, e) {
    var r = void 0 !== r ? r : "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder : "undefined" != typeof MSBlobBuilder ? MSBlobBuilder : "undefined" != typeof MozBlobBuilder && MozBlobBuilder
      , n = function() {
        try {
            return 2 === new Blob(["hi"]).size
        } catch (t) {
            return !1
        }
    }()
      , i = n && function() {
        try {
            return 2 === new Blob([new Uint8Array([1, 2])]).size
        } catch (t) {
            return !1
        }
    }()
      , o = r && r.prototype.append && r.prototype.getBlob;
    function s(t) {
        return t.map(function(t) {
            if (t.buffer instanceof ArrayBuffer) {
                var e = t.buffer;
                if (t.byteLength !== e.byteLength) {
                    var r = new Uint8Array(t.byteLength);
                    r.set(new Uint8Array(e,t.byteOffset,t.byteLength)),
                    e = r.buffer
                }
                return e
            }
            return t
        })
    }
    function a(t, e) {
        e = e || {};
        var n = new r;
        return s(t).forEach(function(t) {
            n.append(t)
        }),
        e.type ? n.getBlob(e.type) : n.getBlob()
    }
    function l(t, e) {
        return new Blob(s(t),e || {})
    }
    "undefined" != typeof Blob && (a.prototype = Blob.prototype,
    l.prototype = Blob.prototype),
    t.exports = n ? i ? Blob : l : o ? a : void 0
}
, function(t, e, r) {
    function n(t) {
        var r;
        function n() {
            if (n.enabled) {
                var t = n
                  , i = +new Date
                  , o = i - (r || i);
                t.diff = o,
                t.prev = r,
                t.curr = i,
                r = i;
                for (var s = new Array(arguments.length), a = 0; a < s.length; a++)
                    s[a] = arguments[a];
                s[0] = e.coerce(s[0]),
                "string" != typeof s[0] && s.unshift("%O");
                var l = 0;
                s[0] = s[0].replace(/%([a-zA-Z%])/g, function(r, n) {
                    if ("%%" === r)
                        return r;
                    l++;
                    var i = e.formatters[n];
                    if ("function" == typeof i) {
                        var o = s[l];
                        r = i.call(t, o),
                        s.splice(l, 1),
                        l--
                    }
                    return r
                }),
                e.formatArgs.call(t, s),
                (n.log || e.log || console.log.bind(console)).apply(t, s)
            }
        }
        return n.namespace = t,
        n.enabled = e.enabled(t),
        n.useColors = e.useColors(),
        n.color = function(t) {
            var r, n = 0;
            for (r in t)
                n = (n << 5) - n + t.charCodeAt(r),
                n |= 0;
            return e.colors[Math.abs(n) % e.colors.length]
        }(t),
        n.destroy = i,
        "function" == typeof e.init && e.init(n),
        e.instances.push(n),
        n
    }
    function i() {
        var t = e.instances.indexOf(this);
        return -1 !== t && (e.instances.splice(t, 1),
        !0)
    }
    (e = t.exports = n.debug = n.default = n).coerce = function(t) {
        return t instanceof Error ? t.stack || t.message : t
    }
    ,
    e.disable = function() {
        e.enable("")
    }
    ,
    e.enable = function(t) {
        var r;
        e.save(t),
        e.names = [],
        e.skips = [];
        var n = ("string" == typeof t ? t : "").split(/[\s,]+/)
          , i = n.length;
        for (r = 0; r < i; r++)
            n[r] && ("-" === (t = n[r].replace(/\*/g, ".*?"))[0] ? e.skips.push(new RegExp("^" + t.substr(1) + "$")) : e.names.push(new RegExp("^" + t + "$")));
        for (r = 0; r < e.instances.length; r++) {
            var o = e.instances[r];
            o.enabled = e.enabled(o.namespace)
        }
    }
    ,
    e.enabled = function(t) {
        if ("*" === t[t.length - 1])
            return !0;
        var r, n;
        for (r = 0,
        n = e.skips.length; r < n; r++)
            if (e.skips[r].test(t))
                return !1;
        for (r = 0,
        n = e.names.length; r < n; r++)
            if (e.names[r].test(t))
                return !0;
        return !1
    }
    ,
    e.humanize = r(7),
    e.instances = [],
    e.names = [],
    e.skips = [],
    e.formatters = {}
}
, function(t, e, r) {
    (function(e) {
        var n = r(20)
          , i = r(4);
        t.exports = c;
        var o, s = /\n/g, a = /\\n/g;
        function l() {}
        function c(t) {
            if (n.call(this, t),
            this.query = this.query || {},
            !o) {
                var r = "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== e ? e : {};
                o = r.___eio = r.___eio || []
            }
            this.index = o.length;
            var i = this;
            o.push(function(t) {
                i.onData(t)
            }),
            this.query.j = this.index,
            "function" == typeof addEventListener && addEventListener("beforeunload", function() {
                i.script && (i.script.onerror = l)
            }, !1)
        }
        i(c, n),
        c.prototype.supportsBinary = !1,
        c.prototype.doClose = function() {
            this.script && (this.script.parentNode.removeChild(this.script),
            this.script = null),
            this.form && (this.form.parentNode.removeChild(this.form),
            this.form = null,
            this.iframe = null),
            n.prototype.doClose.call(this)
        }
        ,
        c.prototype.doPoll = function() {
            var t = this
              , e = document.createElement("script");
            this.script && (this.script.parentNode.removeChild(this.script),
            this.script = null),
            e.async = !0,
            e.src = this.uri(),
            e.onerror = function(e) {
                t.onError("jsonp poll error", e)
            }
            ;
            var r = document.getElementsByTagName("script")[0];
            r ? r.parentNode.insertBefore(e, r) : (document.head || document.body).appendChild(e),
            this.script = e,
            "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent) && setTimeout(function() {
                var t = document.createElement("iframe");
                document.body.appendChild(t),
                document.body.removeChild(t)
            }, 100)
        }
        ,
        c.prototype.doWrite = function(t, e) {
            var r = this;
            if (!this.form) {
                var n, i = document.createElement("form"), o = document.createElement("textarea"), l = this.iframeId = "eio_iframe_" + this.index;
                i.className = "socketio",
                i.style.position = "absolute",
                i.style.top = "-1000px",
                i.style.left = "-1000px",
                i.target = l,
                i.method = "POST",
                i.setAttribute("accept-charset", "utf-8"),
                o.name = "d",
                i.appendChild(o),
                document.body.appendChild(i),
                this.form = i,
                this.area = o
            }
            function c() {
                h(),
                e()
            }
            function h() {
                if (r.iframe)
                    try {
                        r.form.removeChild(r.iframe)
                    } catch (t) {
                        r.onError("jsonp polling iframe removal error", t)
                    }
                try {
                    var t = '<iframe src="javascript:0" name="' + r.iframeId + '">';
                    n = document.createElement(t)
                } catch (t) {
                    (n = document.createElement("iframe")).name = r.iframeId,
                    n.src = "javascript:0"
                }
                n.id = r.iframeId,
                r.form.appendChild(n),
                r.iframe = n
            }
            this.form.action = this.uri(),
            h(),
            t = t.replace(a, "\\\n"),
            this.area.value = t.replace(s, "\\n");
            try {
                this.form.submit()
            } catch (t) {}
            this.iframe.attachEvent ? this.iframe.onreadystatechange = function() {
                "complete" === r.iframe.readyState && c()
            }
            : this.iframe.onload = c
        }
    }
    ).call(this, r(17))
}
, function(t, e, r) {
    (function(e) {
        var n, i, o = r(12), s = r(1), a = r(3), l = r(4), c = r(22), h = r(5)("engine.io-client:websocket");
        if ("undefined" == typeof self)
            try {
                i = r(49)
            } catch (l) {}
        else
            n = self.WebSocket || self.MozWebSocket;
        var u = n || i;
        function f(t) {
            t && t.forceBase64 && (this.supportsBinary = !1),
            this.perMessageDeflate = t.perMessageDeflate,
            this.usingBrowserWebSocket = n && !t.forceNode,
            this.protocols = t.protocols,
            this.usingBrowserWebSocket || (u = i),
            o.call(this, t)
        }
        l(t.exports = f, o),
        f.prototype.name = "websocket",
        f.prototype.supportsBinary = !0,
        f.prototype.doOpen = function() {
            if (this.check()) {
                var t = this.uri()
                  , e = this.protocols
                  , r = {
                    agent: this.agent,
                    perMessageDeflate: this.perMessageDeflate
                };
                r.pfx = this.pfx,
                r.key = this.key,
                r.passphrase = this.passphrase,
                r.cert = this.cert,
                r.ca = this.ca,
                r.ciphers = this.ciphers,
                r.rejectUnauthorized = this.rejectUnauthorized,
                this.extraHeaders && (r.headers = this.extraHeaders),
                this.localAddress && (r.localAddress = this.localAddress);
                try {
                    this.ws = this.usingBrowserWebSocket && !this.isReactNative ? e ? new u(t,e) : new u(t) : new u(t,e,r)
                } catch (t) {
                    return this.emit("error", t)
                }
                void 0 === this.ws.binaryType && (this.supportsBinary = !1),
                this.ws.supports && this.ws.supports.binary ? (this.supportsBinary = !0,
                this.ws.binaryType = "nodebuffer") : this.ws.binaryType = "arraybuffer",
                this.addEventListeners()
            }
        }
        ,
        f.prototype.addEventListeners = function() {
            var t = this;
            this.ws.onopen = function() {
                t.onOpen()
            }
            ,
            this.ws.onclose = function() {
                t.onClose()
            }
            ,
            this.ws.onmessage = function(e) {
                t.onData(e.data)
            }
            ,
            this.ws.onerror = function(e) {
                t.onError("websocket error", e)
            }
        }
        ,
        f.prototype.write = function(t) {
            var r = this;
            this.writable = !1;
            for (var n = t.length, i = 0, o = n; i < o; i++)
                !function(t) {
                    s.encodePacket(t, r.supportsBinary, function(i) {
                        if (!r.usingBrowserWebSocket) {
                            var o = {};
                            t.options && (o.compress = t.options.compress),
                            r.perMessageDeflate && ("string" == typeof i ? e.byteLength(i) : i.length) < r.perMessageDeflate.threshold && (o.compress = !1)
                        }
                        try {
                            r.usingBrowserWebSocket ? r.ws.send(i) : r.ws.send(i, o)
                        } catch (i) {
                            h("websocket closed before onclose event")
                        }
                        --n || (r.emit("flush"),
                        setTimeout(function() {
                            r.writable = !0,
                            r.emit("drain")
                        }, 0))
                    })
                }(t[i])
        }
        ,
        f.prototype.onClose = function() {
            o.prototype.onClose.call(this)
        }
        ,
        f.prototype.doClose = function() {
            void 0 !== this.ws && this.ws.close()
        }
        ,
        f.prototype.uri = function() {
            var t = this.query || {}
              , e = this.secure ? "wss" : "ws"
              , r = "";
            return this.port && ("wss" === e && 443 !== Number(this.port) || "ws" === e && 80 !== Number(this.port)) && (r = ":" + this.port),
            this.timestampRequests && (t[this.timestampParam] = c()),
            this.supportsBinary || (t.b64 = 1),
            (t = a.encode(t)).length && (t = "?" + t),
            e + "://" + (-1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]" : this.hostname) + r + this.path + t
        }
        ,
        f.prototype.check = function() {
            return !(!u || "__initialize"in u && this.name === f.prototype.name)
        }
    }
    ).call(this, r(10).Buffer)
}
, function(t, e) {}
, function(t, e) {
    t.exports = function(t, e) {
        for (var r = [], n = (e = e || 0) || 0; n < t.length; n++)
            r[n - e] = t[n];
        return r
    }
}
, function(t, e) {
    function r(t) {
        t = t || {},
        this.ms = t.min || 100,
        this.max = t.max || 1e4,
        this.factor = t.factor || 2,
        this.jitter = 0 < t.jitter && t.jitter <= 1 ? t.jitter : 0,
        this.attempts = 0
    }
    (t.exports = r).prototype.duration = function() {
        var t = this.ms * Math.pow(this.factor, this.attempts++);
        if (this.jitter) {
            var e = Math.random()
              , r = Math.floor(e * this.jitter * t);
            t = 0 == (1 & Math.floor(10 * e)) ? t - r : t + r
        }
        return 0 | Math.min(t, this.max)
    }
    ,
    r.prototype.reset = function() {
        this.attempts = 0
    }
    ,
    r.prototype.setMin = function(t) {
        this.ms = t
    }
    ,
    r.prototype.setMax = function(t) {
        this.max = t
    }
    ,
    r.prototype.setJitter = function(t) {
        this.jitter = t
    }
}
, function(t, e, r) {
    "use strict";
    r.r(e);
    var n = r(13)
      , i = r(14)
      , o = r(27);
    function s(t, e) {
        for (var r = 0; r < e.length; r++) {
            var n = e[r];
            n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            "value"in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n)
        }
    }
    function a(t) {
        for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {}
              , n = Object.keys(r);
            "function" == typeof Object.getOwnPropertySymbols && (n = n.concat(Object.getOwnPropertySymbols(r).filter(function(t) {
                return Object.getOwnPropertyDescriptor(r, t).enumerable
            }))),
            n.forEach(function(e) {
                var n, i, o;
                n = t,
                o = r[i = e],
                i in n ? Object.defineProperty(n, i, {
                    value: o,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : n[i] = o
            })
        }
        return t
    }
    var l = function() {}
      , c = {}
      , h = {}
      , u = null
      , f = {
        mark: l,
        measure: l
    };
    try {
        "undefined" != typeof window && (c = window),
        "undefined" != typeof document && (h = document),
        "undefined" != typeof MutationObserver && (u = MutationObserver),
        "undefined" != typeof performance && (f = performance)
    } catch (t) {}
    var p = (c.navigator || {}).userAgent
      , d = void 0 === p ? "" : p
      , _ = c
      , m = h
      , y = u
      , g = f
      , v = (_.document,
    !!m.documentElement && !!m.head && "function" == typeof m.addEventListener && "function" == typeof m.createElement)
      , C = ~d.indexOf("MSIE") || ~d.indexOf("Trident/")
      , b = "___FONT_AWESOME___"
      , w = 16
      , E = "fa"
      , A = "svg-inline--fa"
      , S = "data-fa-i2svg"
      , L = "data-fa-pseudo-element"
      , x = "fontawesome-i2svg"
      , k = ["HTML", "HEAD", "STYLE", "SCRIPT"]
      , T = function() {
        try {
            return !0
        } catch (t) {
            return !1
        }
    }()
      , R = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      , M = R.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20])
      , D = ["class", "data-prefix", "data-icon", "data-fa-transform", "data-fa-mask"]
      , H = ["xs", "sm", "lg", "fw", "ul", "li", "border", "pull-left", "pull-right", "spin", "pulse", "rotate-90", "rotate-180", "rotate-270", "flip-horizontal", "flip-vertical", "stack", "stack-1x", "stack-2x", "inverse", "layers", "layers-text", "layers-counter"].concat(R.map(function(t) {
        return "".concat(t, "x")
    })).concat(M.map(function(t) {
        return "w-".concat(t)
    }))
      , O = _.FontAwesomeConfig || {};
    m && "function" == typeof m.querySelector && [["data-family-prefix", "familyPrefix"], ["data-replacement-class", "replacementClass"], ["data-auto-replace-svg", "autoReplaceSvg"], ["data-auto-add-css", "autoAddCss"], ["data-auto-a11y", "autoA11y"], ["data-search-pseudo-elements", "searchPseudoElements"], ["data-observe-mutations", "observeMutations"], ["data-keep-original-source", "keepOriginalSource"], ["data-measure-performance", "measurePerformance"], ["data-show-missing-icons", "showMissingIcons"]].forEach(function(t) {
        var e, r = function(t, e) {
            return function(t) {
                if (Array.isArray(t))
                    return t
            }(t) || function(t, e) {
                var r = []
                  , n = !0
                  , i = !1
                  , o = void 0;
                try {
                    for (var s, a = t[Symbol.iterator](); !(n = (s = a.next()).done) && (r.push(s.value),
                    !e || r.length !== e); n = !0)
                        ;
                } catch (t) {
                    i = !0,
                    o = t
                } finally {
                    try {
                        n || null == a.return || a.return()
                    } finally {
                        if (i)
                            throw o
                    }
                }
                return r
            }(t, e) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }(t, 2), n = r[0], i = r[1], o = "" === (e = function(t) {
            var e = m.querySelector("script[" + t + "]");
            if (e)
                return e.getAttribute(t)
        }(n)) || "false" !== e && ("true" === e || e);
        null != o && (O[i] = o)
    });
    var B = a({
        familyPrefix: E,
        replacementClass: A,
        autoReplaceSvg: !0,
        autoAddCss: !0,
        autoA11y: !0,
        searchPseudoElements: !1,
        observeMutations: !0,
        keepOriginalSource: !0,
        measurePerformance: !1,
        showMissingIcons: !0
    }, O);
    B.autoReplaceSvg || (B.observeMutations = !1);
    var F = a({}, B);
    _.FontAwesomeConfig = F;
    var I = _ || {};
    I[b] || (I[b] = {}),
    I[b].styles || (I[b].styles = {}),
    I[b].hooks || (I[b].hooks = {}),
    I[b].shims || (I[b].shims = []);
    var P = I[b]
      , N = []
      , U = !1;
    v && ((U = (m.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(m.readyState)) || m.addEventListener("DOMContentLoaded", function t() {
        m.removeEventListener("DOMContentLoaded", t),
        U = 1,
        N.map(function(t) {
            return t()
        })
    }));
    var W = w
      , j = {
        size: 16,
        x: 0,
        y: 0,
        rotate: 0,
        flipX: !1,
        flipY: !1
    };
    function z(t) {
        if (t && v) {
            var e = m.createElement("style");
            e.setAttribute("type", "text/css"),
            e.innerHTML = t;
            for (var r = m.head.childNodes, n = null, i = r.length - 1; -1 < i; i--) {
                var o = r[i]
                  , s = (o.tagName || "").toUpperCase();
                -1 < ["STYLE", "LINK"].indexOf(s) && (n = o)
            }
            return m.head.insertBefore(e, n),
            t
        }
    }
    var q = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    function X() {
        for (var t = 12, e = ""; 0 < t--; )
            e += q[62 * Math.random() | 0];
        return e
    }
    function Y(t) {
        for (var e = [], r = (t || []).length >>> 0; r--; )
            e[r] = t[r];
        return e
    }
    function K(t) {
        return t.classList ? Y(t.classList) : (t.getAttribute("class") || "").split(" ").filter(function(t) {
            return t
        })
    }
    function V(t) {
        return "".concat(t).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    }
    function J(t) {
        return Object.keys(t || {}).reduce(function(e, r) {
            return e + "".concat(r, ": ").concat(t[r], ";")
        }, "")
    }
    function Z(t) {
        return t.size !== j.size || t.x !== j.x || t.y !== j.y || t.rotate !== j.rotate || t.flipX || t.flipY
    }
    function G(t) {
        var e = t.transform
          , r = t.containerWidth
          , n = t.iconWidth
          , i = {
            transform: "translate(".concat(r / 2, " 256)")
        }
          , o = "translate(".concat(32 * e.x, ", ").concat(32 * e.y, ") ")
          , s = "scale(".concat(e.size / 16 * (e.flipX ? -1 : 1), ", ").concat(e.size / 16 * (e.flipY ? -1 : 1), ") ")
          , a = "rotate(".concat(e.rotate, " 0 0)");
        return {
            outer: i,
            inner: {
                transform: "".concat(o, " ").concat(s, " ").concat(a)
            },
            path: {
                transform: "translate(".concat(n / 2 * -1, " -256)")
            }
        }
    }
    var $ = {
        x: 0,
        y: 0,
        width: "100%",
        height: "100%"
    };
    function Q(t) {
        var e = t.icons
          , r = e.main
          , n = e.mask
          , i = t.prefix
          , o = t.iconName
          , s = t.transform
          , l = t.symbol
          , c = t.title
          , h = t.extra
          , u = t.watchable
          , f = void 0 !== u && u
          , p = n.found ? n : r
          , d = p.width
          , _ = p.height
          , m = "fa-w-".concat(Math.ceil(d / _ * 16))
          , y = [F.replacementClass, o ? "".concat(F.familyPrefix, "-").concat(o) : "", m].filter(function(t) {
            return -1 === h.classes.indexOf(t)
        }).concat(h.classes).join(" ")
          , g = {
            children: [],
            attributes: a({}, h.attributes, {
                "data-prefix": i,
                "data-icon": o,
                class: y,
                role: "img",
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 ".concat(d, " ").concat(_)
            })
        };
        f && (g.attributes[S] = ""),
        c && g.children.push({
            tag: "title",
            attributes: {
                id: g.attributes["aria-labelledby"] || "title-".concat(X())
            },
            children: [c]
        });
        var v, C, b, w, E, A, L, x, k, T, R, M, D, H, O, B, I, P, N, U, W, j, z = a({}, g, {
            prefix: i,
            iconName: o,
            main: r,
            mask: n,
            transform: s,
            symbol: l,
            styles: h.styles
        }), q = n.found && r.found ? (C = (v = z).children,
        b = v.attributes,
        w = v.main,
        E = v.mask,
        A = v.transform,
        L = w.width,
        x = w.icon,
        k = E.width,
        T = E.icon,
        R = G({
            transform: A,
            containerWidth: k,
            iconWidth: L
        }),
        M = {
            tag: "rect",
            attributes: a({}, $, {
                fill: "white"
            })
        },
        D = {
            tag: "g",
            attributes: a({}, R.inner),
            children: [{
                tag: "path",
                attributes: a({}, x.attributes, R.path, {
                    fill: "black"
                })
            }]
        },
        H = {
            tag: "g",
            attributes: a({}, R.outer),
            children: [D]
        },
        O = "mask-".concat(X()),
        I = {
            tag: "defs",
            children: [{
                tag: "clipPath",
                attributes: {
                    id: B = "clip-".concat(X())
                },
                children: [T]
            }, {
                tag: "mask",
                attributes: a({}, $, {
                    id: O,
                    maskUnits: "userSpaceOnUse",
                    maskContentUnits: "userSpaceOnUse"
                }),
                children: [M, H]
            }]
        },
        C.push(I, {
            tag: "rect",
            attributes: a({
                fill: "currentColor",
                "clip-path": "url(#".concat(B, ")"),
                mask: "url(#".concat(O, ")")
            }, $)
        }),
        {
            children: C,
            attributes: b
        }) : function(t) {
            var e = t.children
              , r = t.attributes
              , n = t.main
              , i = t.transform
              , o = J(t.styles);
            if (0 < o.length && (r.style = o),
            Z(i)) {
                var s = G({
                    transform: i,
                    containerWidth: n.width,
                    iconWidth: n.width
                });
                e.push({
                    tag: "g",
                    attributes: a({}, s.outer),
                    children: [{
                        tag: "g",
                        attributes: a({}, s.inner),
                        children: [{
                            tag: n.icon.tag,
                            children: n.icon.children,
                            attributes: a({}, n.icon.attributes, s.path)
                        }]
                    }]
                })
            } else
                e.push(n.icon);
            return {
                children: e,
                attributes: r
            }
        }(z), Y = q.children, K = q.attributes;
        return z.children = Y,
        z.attributes = K,
        l ? (N = (P = z).prefix,
        U = P.iconName,
        W = P.children,
        [{
            tag: "svg",
            attributes: {
                style: "display: none;"
            },
            children: [{
                tag: "symbol",
                attributes: a({}, P.attributes, {
                    id: !0 === (j = P.symbol) ? "".concat(N, "-").concat(F.familyPrefix, "-").concat(U) : j
                }),
                children: W
            }]
        }]) : function(t) {
            var e = t.children
              , r = t.main
              , n = t.mask
              , i = t.attributes
              , o = t.styles
              , s = t.transform;
            if (Z(s) && r.found && !n.found) {
                var l = r.width / r.height / 2;
                i.style = J(a({}, o, {
                    "transform-origin": "".concat(l + s.x / 16, "em ").concat(.5 + s.y / 16, "em")
                }))
            }
            return [{
                tag: "svg",
                attributes: i,
                children: e
            }]
        }(z)
    }
    function tt(t) {
        var e = t.content
          , r = t.width
          , n = t.height
          , i = t.transform
          , o = t.title
          , s = t.extra
          , l = t.watchable
          , c = void 0 !== l && l
          , h = a({}, s.attributes, o ? {
            title: o
        } : {}, {
            class: s.classes.join(" ")
        });
        c && (h[S] = "");
        var u, f, p, d, _, m, y, g, v, b = a({}, s.styles);
        Z(i) && (b.transform = (f = (u = {
            transform: i,
            startCentered: !0,
            width: r,
            height: n
        }).transform,
        d = void 0 === (p = u.width) ? w : p,
        m = void 0 === (_ = u.height) ? w : _,
        v = "",
        v += (g = void 0 !== (y = u.startCentered) && y) && C ? "translate(".concat(f.x / W - d / 2, "em, ").concat(f.y / W - m / 2, "em) ") : g ? "translate(calc(-50% + ".concat(f.x / W, "em), calc(-50% + ").concat(f.y / W, "em)) ") : "translate(".concat(f.x / W, "em, ").concat(f.y / W, "em) "),
        v += "scale(".concat(f.size / W * (f.flipX ? -1 : 1), ", ").concat(f.size / W * (f.flipY ? -1 : 1), ") "),
        v += "rotate(".concat(f.rotate, "deg) ")),
        b["-webkit-transform"] = b.transform);
        var E = J(b);
        0 < E.length && (h.style = E);
        var A = [];
        return A.push({
            tag: "span",
            attributes: h,
            children: [e]
        }),
        o && A.push({
            tag: "span",
            attributes: {
                class: "sr-only"
            },
            children: [o]
        }),
        A
    }
    var et = function() {}
      , rt = F.measurePerformance && g && g.mark && g.measure ? g : {
        mark: et,
        measure: et
    }
      , nt = 'FA "5.6.3"'
      , it = function(t) {
        rt.mark("".concat(nt, " ").concat(t, " ends")),
        rt.measure("".concat(nt, " ").concat(t), "".concat(nt, " ").concat(t, " begins"), "".concat(nt, " ").concat(t, " ends"))
    }
      , ot = {
        begin: function(t) {
            return rt.mark("".concat(nt, " ").concat(t, " begins")),
            function() {
                return it(t)
            }
        },
        end: it
    }
      , st = function(t, e, r, n) {
        var i, o, s, a, l, c = Object.keys(t), h = c.length, u = void 0 !== n ? (a = e,
        l = n,
        function(t, e, r, n) {
            return a.call(l, t, e, r, n)
        }
        ) : e;
        for (s = void 0 === r ? (i = 1,
        t[c[0]]) : (i = 0,
        r); i < h; i++)
            s = u(s, t[o = c[i]], o, t);
        return s
    }
      , at = P.styles
      , lt = P.shims
      , ct = {}
      , ht = {}
      , ut = {}
      , ft = function() {
        var t = function(t) {
            return st(at, function(e, r, n) {
                return e[n] = st(r, t, {}),
                e
            }, {})
        };
        ct = t(function(t, e, r) {
            return t[e[3]] = r,
            t
        }),
        ht = t(function(t, e, r) {
            var n = e[2];
            return t[r] = r,
            n.forEach(function(e) {
                t[e] = r
            }),
            t
        });
        var e = "far"in at;
        ut = st(lt, function(t, r) {
            var n = r[0]
              , i = r[1]
              , o = r[2];
            return "far" !== i || e || (i = "fas"),
            t[n] = {
                prefix: i,
                iconName: o
            },
            t
        }, {})
    };
    function pt(t, e) {
        return ct[t][e]
    }
    ft();
    var dt = P.styles
      , _t = function() {
        return {
            prefix: null,
            iconName: null,
            rest: []
        }
    };
    function mt(t) {
        return t.reduce(function(t, e) {
            var r = function(t, e) {
                var r, n = e.split("-"), i = n[0], o = n.slice(1).join("-");
                return i !== t || "" === o || (r = o,
                ~H.indexOf(r)) ? null : o
            }(F.familyPrefix, e);
            if (dt[e])
                t.prefix = e;
            else if (r) {
                var n = "fa" === t.prefix ? ut[r] || {
                    prefix: null,
                    iconName: null
                } : {};
                t.iconName = n.iconName || r,
                t.prefix = n.prefix || t.prefix
            } else
                e !== F.replacementClass && 0 !== e.indexOf("fa-w-") && t.rest.push(e);
            return t
        }, _t())
    }
    function yt(t) {
        var e, r = t.tag, n = t.attributes, i = void 0 === n ? {} : n, o = t.children, s = void 0 === o ? [] : o;
        return "string" == typeof t ? V(t) : "<".concat(r, " ").concat((e = i,
        Object.keys(e || {}).reduce(function(t, r) {
            return t + "".concat(r, '="').concat(V(e[r]), '" ')
        }, "").trim()), ">").concat(s.map(yt).join(""), "</").concat(r, ">")
    }
    var gt = function() {};
    function vt(t) {
        return "string" == typeof (t.getAttribute ? t.getAttribute(S) : null)
    }
    var Ct = {
        replace: function(t) {
            var e = t[0]
              , r = t[1].map(function(t) {
                return yt(t)
            }).join("\n");
            if (e.parentNode && e.outerHTML)
                e.outerHTML = r + (F.keepOriginalSource && "svg" !== e.tagName.toLowerCase() ? "\x3c!-- ".concat(e.outerHTML, " --\x3e") : "");
            else if (e.parentNode) {
                var n = document.createElement("span");
                e.parentNode.replaceChild(n, e),
                n.outerHTML = r
            }
        },
        nest: function(t) {
            var e = t[0]
              , r = t[1];
            if (~K(e).indexOf(F.replacementClass))
                return Ct.replace(t);
            var n = new RegExp("".concat(F.familyPrefix, "-.*"));
            delete r[0].attributes.style;
            var i = r[0].attributes.class.split(" ").reduce(function(t, e) {
                return e === F.replacementClass || e.match(n) ? t.toSvg.push(e) : t.toNode.push(e),
                t
            }, {
                toNode: [],
                toSvg: []
            });
            r[0].attributes.class = i.toSvg.join(" ");
            var o = r.map(function(t) {
                return yt(t)
            }).join("\n");
            e.setAttribute("class", i.toNode.join(" ")),
            e.setAttribute(S, ""),
            e.innerHTML = o
        }
    };
    function bt(t, e) {
        var r = "function" == typeof e ? e : gt;
        0 === t.length ? r() : (_.requestAnimationFrame || function(t) {
            return t()
        }
        )(function() {
            var e = !0 === F.autoReplaceSvg ? Ct.replace : Ct[F.autoReplaceSvg] || Ct.replace
              , n = ot.begin("mutate");
            t.map(e),
            n(),
            r()
        })
    }
    var wt = !1
      , Et = null;
    function At(t) {
        for (var e = "", r = 0; r < t.length; r++)
            e += ("000" + t.charCodeAt(r).toString(16)).slice(-4);
        return e
    }
    var St = function(t) {
        var e = {
            size: 16,
            x: 0,
            y: 0,
            flipX: !1,
            flipY: !1,
            rotate: 0
        };
        return t ? t.toLowerCase().split(" ").reduce(function(t, e) {
            var r = e.toLowerCase().split("-")
              , n = r[0]
              , i = r.slice(1).join("-");
            if (n && "h" === i)
                return t.flipX = !0,
                t;
            if (n && "v" === i)
                return t.flipY = !0,
                t;
            if (i = parseFloat(i),
            isNaN(i))
                return t;
            switch (n) {
            case "grow":
                t.size = t.size + i;
                break;
            case "shrink":
                t.size = t.size - i;
                break;
            case "left":
                t.x = t.x - i;
                break;
            case "right":
                t.x = t.x + i;
                break;
            case "up":
                t.y = t.y - i;
                break;
            case "down":
                t.y = t.y + i;
                break;
            case "rotate":
                t.rotate = t.rotate + i
            }
            return t
        }, e) : e
    }
      , Lt = {
        iconName: null,
        title: null,
        prefix: null,
        transform: j,
        symbol: !1,
        mask: null,
        extra: {
            classes: [],
            styles: {},
            attributes: {}
        }
    };
    function xt(t) {
        var e, r, n, i, o, s, a, l = function(t) {
            var e, r, n = t.getAttribute("data-prefix"), i = t.getAttribute("data-icon"), o = void 0 !== t.innerText ? t.innerText.trim() : "", s = mt(K(t));
            return n && i && (s.prefix = n,
            s.iconName = i),
            s.prefix && 1 < o.length ? s.iconName = (e = s.prefix,
            r = t.innerText,
            ht[e][r]) : s.prefix && 1 === o.length && (s.iconName = pt(s.prefix, At(t.innerText))),
            s
        }(t), c = l.iconName, h = l.prefix, u = l.rest, f = (r = [],
        (e = t.getAttribute("style")) && (r = e.split(";").reduce(function(t, e) {
            var r = e.split(":")
              , n = r[0]
              , i = r.slice(1);
            return n && 0 < i.length && (t[n] = i.join(":").trim()),
            t
        }, {})),
        r), p = St(t.getAttribute("data-fa-transform")), d = null !== (n = t.getAttribute("data-fa-symbol")) && ("" === n || n), _ = (o = Y((i = t).attributes).reduce(function(t, e) {
            return "class" !== t.name && "style" !== t.name && (t[e.name] = e.value),
            t
        }, {}),
        s = i.getAttribute("title"),
        F.autoA11y && (s ? o["aria-labelledby"] = "".concat(F.replacementClass, "-title-").concat(X()) : o["aria-hidden"] = "true"),
        o), m = (a = t.getAttribute("data-fa-mask")) ? mt(a.split(" ").map(function(t) {
            return t.trim()
        })) : _t();
        return {
            iconName: c,
            title: t.getAttribute("title"),
            prefix: h,
            transform: p,
            symbol: d,
            mask: m,
            extra: {
                classes: u,
                styles: f,
                attributes: _
            }
        }
    }
    function kt(t) {
        this.name = "MissingIcon",
        this.message = t || "Icon unavailable",
        this.stack = (new Error).stack
    }
    (kt.prototype = Object.create(Error.prototype)).constructor = kt;
    var Tt = {
        fill: "currentColor"
    }
      , Rt = {
        attributeType: "XML",
        repeatCount: "indefinite",
        dur: "2s"
    }
      , Mt = {
        tag: "path",
        attributes: a({}, Tt, {
            d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"
        })
    }
      , Dt = a({}, Rt, {
        attributeName: "opacity"
    })
      , Ht = {
        tag: "g",
        children: [Mt, {
            tag: "circle",
            attributes: a({}, Tt, {
                cx: "256",
                cy: "364",
                r: "28"
            }),
            children: [{
                tag: "animate",
                attributes: a({}, Rt, {
                    attributeName: "r",
                    values: "28;14;28;28;14;28;"
                })
            }, {
                tag: "animate",
                attributes: a({}, Dt, {
                    values: "1;0;1;1;0;1;"
                })
            }]
        }, {
            tag: "path",
            attributes: a({}, Tt, {
                opacity: "1",
                d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"
            }),
            children: [{
                tag: "animate",
                attributes: a({}, Dt, {
                    values: "1;0;0;0;0;1;"
                })
            }]
        }, {
            tag: "path",
            attributes: a({}, Tt, {
                opacity: "0",
                d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"
            }),
            children: [{
                tag: "animate",
                attributes: a({}, Dt, {
                    values: "0;0;1;1;0;0;"
                })
            }]
        }]
    }
      , Ot = P.styles
      , Bt = "fa-layers-text"
      , Ft = /Font Awesome 5 (Solid|Regular|Light|Brands|Free|Pro)/
      , It = {
        Solid: "fas",
        Regular: "far",
        Light: "fal",
        Brands: "fab"
    }
      , Pt = {
        900: "fas",
        400: "far",
        300: "fal"
    };
    function Nt(t, e) {
        var r = {
            found: !1,
            width: 512,
            height: 512,
            icon: Ht
        };
        if (t && e && Ot[e] && Ot[e][t]) {
            var n = Ot[e][t];
            r = {
                found: !0,
                width: n[0],
                height: n[1],
                icon: {
                    tag: "path",
                    attributes: {
                        fill: "currentColor",
                        d: n.slice(4)[0]
                    }
                }
            }
        } else if (t && e && !F.showMissingIcons)
            throw new kt("Icon is missing for prefix ".concat(e, " with icon name ").concat(t));
        return r
    }
    function Ut(t) {
        var e, r, n, i, o, s, a, l, c, h = xt(t);
        return ~h.extra.classes.indexOf(Bt) ? function(t, e) {
            var r = e.title
              , n = e.transform
              , i = e.extra
              , o = null
              , s = null;
            if (C) {
                var a = parseInt(getComputedStyle(t).fontSize, 10)
                  , l = t.getBoundingClientRect();
                o = l.width / a,
                s = l.height / a
            }
            return F.autoA11y && !r && (i.attributes["aria-hidden"] = "true"),
            [t, tt({
                content: t.innerHTML,
                width: o,
                height: s,
                transform: n,
                title: r,
                extra: i,
                watchable: !0
            })]
        }(t, h) : (e = t,
        n = (r = h).iconName,
        i = r.title,
        o = r.prefix,
        s = r.transform,
        a = r.symbol,
        l = r.mask,
        c = r.extra,
        [e, Q({
            icons: {
                main: Nt(n, o),
                mask: Nt(l.iconName, l.prefix)
            },
            prefix: o,
            iconName: n,
            transform: s,
            symbol: a,
            mask: l,
            title: i,
            extra: c,
            watchable: !0
        })])
    }
    function Wt(t) {
        if (v) {
            var e = ot.begin("searchPseudoElements");
            wt = !0,
            Y(t.querySelectorAll("*")).filter(function(t) {
                return !(t.parentNode === document.head || ~k.indexOf(t.tagName.toUpperCase()) || t.getAttribute(L) || t.parentNode && "svg" === t.parentNode.tagName)
            }).forEach(function(t) {
                [":before", ":after"].forEach(function(e) {
                    var r = Y(t.children).filter(function(t) {
                        return t.getAttribute(L) === e
                    })[0]
                      , n = _.getComputedStyle(t, e)
                      , i = n.getPropertyValue("font-family").match(Ft)
                      , o = n.getPropertyValue("font-weight");
                    if (r && !i)
                        t.removeChild(r);
                    else if (i) {
                        var s = n.getPropertyValue("content")
                          , l = ~["Light", "Regular", "Solid", "Brands"].indexOf(i[1]) ? It[i[1]] : Pt[o]
                          , c = pt(l, At(3 === s.length ? s.substr(1, 1) : s));
                        if (!r || r.getAttribute("data-prefix") !== l || r.getAttribute("data-icon") !== c) {
                            r && t.removeChild(r);
                            var h = Lt.extra;
                            h.attributes[L] = e;
                            var u = Q(a({}, Lt, {
                                icons: {
                                    main: Nt(c, l),
                                    mask: _t()
                                },
                                prefix: l,
                                iconName: c,
                                extra: h,
                                watchable: !0
                            }))
                              , f = m.createElement("svg");
                            ":before" === e ? t.insertBefore(f, t.firstChild) : t.appendChild(f),
                            f.outerHTML = u.map(function(t) {
                                return yt(t)
                            }).join("\n")
                        }
                    }
                })
            }),
            wt = !1,
            e()
        }
    }
    function jt(t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null;
        if (v) {
            var r = m.documentElement.classList
              , n = function(t) {
                return r.add("".concat(x, "-").concat(t))
            }
              , i = function(t) {
                return r.remove("".concat(x, "-").concat(t))
            }
              , o = Object.keys(Ot)
              , s = [".".concat(Bt, ":not([").concat(S, "])")].concat(o.map(function(t) {
                return ".".concat(t, ":not([").concat(S, "])")
            })).join(", ");
            if (0 !== s.length) {
                var a = Y(t.querySelectorAll(s));
                if (0 < a.length) {
                    n("pending"),
                    i("complete");
                    var l = ot.begin("onTree")
                      , c = a.reduce(function(t, e) {
                        try {
                            var r = Ut(e);
                            r && t.push(r)
                        } catch (t) {
                            T || t instanceof kt && console.error(t)
                        }
                        return t
                    }, []);
                    l(),
                    bt(c, function() {
                        n("active"),
                        n("complete"),
                        i("pending"),
                        "function" == typeof e && e()
                    })
                }
            }
        }
    }
    function zt(t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null
          , r = Ut(t);
        r && bt([r], e)
    }
    var qt = 'svg:not(:root).svg-inline--fa {\n  overflow: visible;\n}\n\n.svg-inline--fa {\n  display: inline-block;\n  font-size: inherit;\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.svg-inline--fa.fa-lg {\n  vertical-align: -0.225em;\n}\n.svg-inline--fa.fa-w-1 {\n  width: 0.0625em;\n}\n.svg-inline--fa.fa-w-2 {\n  width: 0.125em;\n}\n.svg-inline--fa.fa-w-3 {\n  width: 0.1875em;\n}\n.svg-inline--fa.fa-w-4 {\n  width: 0.25em;\n}\n.svg-inline--fa.fa-w-5 {\n  width: 0.3125em;\n}\n.svg-inline--fa.fa-w-6 {\n  width: 0.375em;\n}\n.svg-inline--fa.fa-w-7 {\n  width: 0.4375em;\n}\n.svg-inline--fa.fa-w-8 {\n  width: 0.5em;\n}\n.svg-inline--fa.fa-w-9 {\n  width: 0.5625em;\n}\n.svg-inline--fa.fa-w-10 {\n  width: 0.625em;\n}\n.svg-inline--fa.fa-w-11 {\n  width: 0.6875em;\n}\n.svg-inline--fa.fa-w-12 {\n  width: 0.75em;\n}\n.svg-inline--fa.fa-w-13 {\n  width: 0.8125em;\n}\n.svg-inline--fa.fa-w-14 {\n  width: 0.875em;\n}\n.svg-inline--fa.fa-w-15 {\n  width: 0.9375em;\n}\n.svg-inline--fa.fa-w-16 {\n  width: 1em;\n}\n.svg-inline--fa.fa-w-17 {\n  width: 1.0625em;\n}\n.svg-inline--fa.fa-w-18 {\n  width: 1.125em;\n}\n.svg-inline--fa.fa-w-19 {\n  width: 1.1875em;\n}\n.svg-inline--fa.fa-w-20 {\n  width: 1.25em;\n}\n.svg-inline--fa.fa-pull-left {\n  margin-right: 0.3em;\n  width: auto;\n}\n.svg-inline--fa.fa-pull-right {\n  margin-left: 0.3em;\n  width: auto;\n}\n.svg-inline--fa.fa-border {\n  height: 1.5em;\n}\n.svg-inline--fa.fa-li {\n  width: 2em;\n}\n.svg-inline--fa.fa-fw {\n  width: 1.25em;\n}\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -0.125em;\n  width: 1em;\n}\n.fa-layers svg.svg-inline--fa {\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-counter, .fa-layers-text {\n  display: inline-block;\n  position: absolute;\n  text-align: center;\n}\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-counter {\n  background-color: #ff253a;\n  border-radius: 1em;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  color: #fff;\n  height: 1.5em;\n  line-height: 1;\n  max-width: 5em;\n  min-width: 1.5em;\n  overflow: hidden;\n  padding: 0.25em;\n  right: 0;\n  text-overflow: ellipsis;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-bottom-right {\n  bottom: 0;\n  right: 0;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom right;\n          transform-origin: bottom right;\n}\n\n.fa-layers-bottom-left {\n  bottom: 0;\n  left: 0;\n  right: auto;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom left;\n          transform-origin: bottom left;\n}\n\n.fa-layers-top-right {\n  right: 0;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-top-left {\n  left: 0;\n  right: auto;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top left;\n          transform-origin: top left;\n}\n\n.fa-lg {\n  font-size: 1.3333333333em;\n  line-height: 0.75em;\n  vertical-align: -0.0667em;\n}\n\n.fa-xs {\n  font-size: 0.75em;\n}\n\n.fa-sm {\n  font-size: 0.875em;\n}\n\n.fa-1x {\n  font-size: 1em;\n}\n\n.fa-2x {\n  font-size: 2em;\n}\n\n.fa-3x {\n  font-size: 3em;\n}\n\n.fa-4x {\n  font-size: 4em;\n}\n\n.fa-5x {\n  font-size: 5em;\n}\n\n.fa-6x {\n  font-size: 6em;\n}\n\n.fa-7x {\n  font-size: 7em;\n}\n\n.fa-8x {\n  font-size: 8em;\n}\n\n.fa-9x {\n  font-size: 9em;\n}\n\n.fa-10x {\n  font-size: 10em;\n}\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em;\n}\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: 2.5em;\n  padding-left: 0;\n}\n.fa-ul > li {\n  position: relative;\n}\n\n.fa-li {\n  left: -2em;\n  position: absolute;\n  text-align: center;\n  width: 2em;\n  line-height: inherit;\n}\n\n.fa-border {\n  border: solid 0.08em #eee;\n  border-radius: 0.1em;\n  padding: 0.2em 0.25em 0.15em;\n}\n\n.fa-pull-left {\n  float: left;\n}\n\n.fa-pull-right {\n  float: right;\n}\n\n.fa.fa-pull-left,\n.fas.fa-pull-left,\n.far.fa-pull-left,\n.fal.fa-pull-left,\n.fab.fa-pull-left {\n  margin-right: 0.3em;\n}\n.fa.fa-pull-right,\n.fas.fa-pull-right,\n.far.fa-pull-right,\n.fal.fa-pull-right,\n.fab.fa-pull-right {\n  margin-left: 0.3em;\n}\n\n.fa-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n          animation: fa-spin 2s infinite linear;\n}\n\n.fa-pulse {\n  -webkit-animation: fa-spin 1s infinite steps(8);\n          animation: fa-spin 1s infinite steps(8);\n}\n\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n.fa-rotate-90 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=1)";\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg);\n}\n\n.fa-rotate-180 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2)";\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg);\n}\n\n.fa-rotate-270 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=3)";\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg);\n}\n\n.fa-flip-horizontal {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)";\n  -webkit-transform: scale(-1, 1);\n          transform: scale(-1, 1);\n}\n\n.fa-flip-vertical {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";\n  -webkit-transform: scale(1, -1);\n          transform: scale(1, -1);\n}\n\n.fa-flip-horizontal.fa-flip-vertical {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";\n  -webkit-transform: scale(-1, -1);\n          transform: scale(-1, -1);\n}\n\n:root .fa-rotate-90,\n:root .fa-rotate-180,\n:root .fa-rotate-270,\n:root .fa-flip-horizontal,\n:root .fa-flip-vertical {\n  -webkit-filter: none;\n          filter: none;\n}\n\n.fa-stack {\n  display: inline-block;\n  height: 2em;\n  position: relative;\n  width: 2.5em;\n}\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1.25em;\n}\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2.5em;\n}\n\n.fa-inverse {\n  color: #fff;\n}\n\n.sr-only {\n  border: 0;\n  clip: rect(0, 0, 0, 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px;\n}\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  clip: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  position: static;\n  width: auto;\n}';
    function Xt() {
        var t = E
          , e = A
          , r = F.familyPrefix
          , n = F.replacementClass
          , i = qt;
        if (r !== t || n !== e) {
            var o = new RegExp("\\.".concat(t, "\\-"),"g")
              , s = new RegExp("\\.".concat(e),"g");
            i = i.replace(o, ".".concat(r, "-")).replace(s, ".".concat(n))
        }
        return i
    }
    function Yt(t) {
        return {
            found: !0,
            width: t[0],
            height: t[1],
            icon: {
                tag: "path",
                attributes: {
                    fill: "currentColor",
                    d: t.slice(4)[0]
                }
            }
        }
    }
    function Kt() {
        F.autoAddCss && !Zt && (z(Xt()),
        Zt = !0)
    }
    function Vt(t, e) {
        return Object.defineProperty(t, "abstract", {
            get: e
        }),
        Object.defineProperty(t, "html", {
            get: function() {
                return t.abstract.map(function(t) {
                    return yt(t)
                })
            }
        }),
        Object.defineProperty(t, "node", {
            get: function() {
                if (v) {
                    var e = m.createElement("div");
                    return e.innerHTML = t.html,
                    e.children
                }
            }
        }),
        t
    }
    var Jt = new (function() {
        function t() {
            !function(t, e) {
                if (!(t instanceof e))
                    throw new TypeError("Cannot call a class as a function")
            }(this, t),
            this.definitions = {}
        }
        var e, r;
        return e = t,
        (r = [{
            key: "add",
            value: function() {
                for (var t = this, e = arguments.length, r = new Array(e), n = 0; n < e; n++)
                    r[n] = arguments[n];
                var i = r.reduce(this._pullDefinitions, {});
                Object.keys(i).forEach(function(e) {
                    t.definitions[e] = a({}, t.definitions[e] || {}, i[e]),
                    function t(e, r) {
                        var n = Object.keys(r).reduce(function(t, e) {
                            var n = r[e];
                            return n.icon ? t[n.iconName] = n.icon : t[e] = n,
                            t
                        }, {});
                        "function" == typeof P.hooks.addPack ? P.hooks.addPack(e, n) : P.styles[e] = a({}, P.styles[e] || {}, n),
                        "fas" === e && t("fa", r)
                    }(e, i[e]),
                    ft()
                })
            }
        }, {
            key: "reset",
            value: function() {
                this.definitions = {}
            }
        }, {
            key: "_pullDefinitions",
            value: function(t, e) {
                var r = e.prefix && e.iconName && e.icon ? {
                    0: e
                } : e;
                return Object.keys(r).map(function(e) {
                    var n = r[e]
                      , i = n.prefix
                      , o = n.iconName
                      , s = n.icon;
                    t[i] || (t[i] = {}),
                    t[i][o] = s
                }),
                t
            }
        }]) && s(e.prototype, r),
        t
    }())
      , Zt = !1
      , Gt = {
        i2svg: function() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
            if (v) {
                Kt();
                var e = t.node
                  , r = void 0 === e ? m : e
                  , n = t.callback
                  , i = void 0 === n ? function() {}
                : n;
                F.searchPseudoElements && Wt(r),
                jt(r, i)
            }
        },
        css: Xt,
        insertCss: function() {
            Zt || (z(Xt()),
            Zt = !0)
        },
        watch: function() {
            var t, e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, r = e.autoReplaceSvgRoot, n = e.observeMutationsRoot;
            !1 === F.autoReplaceSvg && (F.autoReplaceSvg = !0),
            F.observeMutations = !0,
            t = function() {
                Qt({
                    autoReplaceSvgRoot: r
                }),
                function(t) {
                    if (y && F.observeMutations) {
                        var e = t.treeCallback
                          , r = t.nodeCallback
                          , n = t.pseudoElementsCallback
                          , i = t.observeMutationsRoot
                          , o = void 0 === i ? m.body : i;
                        Et = new y(function(t) {
                            wt || Y(t).forEach(function(t) {
                                if ("childList" === t.type && 0 < t.addedNodes.length && !vt(t.addedNodes[0]) && (F.searchPseudoElements && n(t.target),
                                e(t.target)),
                                "attributes" === t.type && t.target.parentNode && F.searchPseudoElements && n(t.target.parentNode),
                                "attributes" === t.type && vt(t.target) && ~D.indexOf(t.attributeName))
                                    if ("class" === t.attributeName) {
                                        var i = mt(K(t.target))
                                          , o = i.prefix
                                          , s = i.iconName;
                                        o && t.target.setAttribute("data-prefix", o),
                                        s && t.target.setAttribute("data-icon", s)
                                    } else
                                        r(t.target)
                            })
                        }
                        ),
                        v && Et.observe(o, {
                            childList: !0,
                            attributes: !0,
                            characterData: !0,
                            subtree: !0
                        })
                    }
                }({
                    treeCallback: jt,
                    nodeCallback: zt,
                    pseudoElementsCallback: Wt,
                    observeMutationsRoot: n
                })
            }
            ,
            v && (U ? setTimeout(t, 0) : N.push(t))
        }
    }
      , $t = (function(t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}
          , r = e.transform
          , n = void 0 === r ? j : r
          , i = e.symbol
          , o = void 0 !== i && i
          , s = e.mask
          , l = void 0 === s ? null : s
          , c = e.title
          , h = void 0 === c ? null : c
          , u = e.classes
          , f = void 0 === u ? [] : u
          , p = e.attributes
          , d = void 0 === p ? {} : p
          , _ = e.styles
          , m = void 0 === _ ? {} : _;
        if (t) {
            var y = t.prefix
              , g = t.iconName
              , v = t.icon;
            return Vt(a({
                type: "icon"
            }, t), function() {
                return Kt(),
                F.autoA11y && (h ? d["aria-labelledby"] = "".concat(F.replacementClass, "-title-").concat(X()) : d["aria-hidden"] = "true"),
                Q({
                    icons: {
                        main: Yt(v),
                        mask: l ? Yt(l.icon) : {
                            found: !1,
                            width: null,
                            height: null,
                            icon: {}
                        }
                    },
                    prefix: y,
                    iconName: g,
                    transform: a({}, j, n),
                    symbol: o,
                    title: h,
                    extra: {
                        attributes: d,
                        styles: m,
                        classes: f
                    }
                })
            })
        }
    }
    ,
    Gt)
      , Qt = function() {
        var t = (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}).autoReplaceSvgRoot
          , e = void 0 === t ? m : t;
        0 < Object.keys(P.styles).length && v && F.autoReplaceSvg && $t.i2svg({
            node: e
        })
    };
    Jt.add({
        prefix: "fas",
        iconName: "bars",
        icon: [448, 512, [], "f0c9", "M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"]
    }, {
        prefix: "fas",
        iconName: "clipboard",
        icon: [384, 512, [], "f328", "M384 112v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h80c0-35.29 28.71-64 64-64s64 28.71 64 64h80c26.51 0 48 21.49 48 48zM192 40c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24m96 114v-20a6 6 0 0 0-6-6H102a6 6 0 0 0-6 6v20a6 6 0 0 0 6 6h180a6 6 0 0 0 6-6z"]
    }, {
        prefix: "fas",
        iconName: "download",
        icon: [512, 512, [], "f019", "M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"]
    }, {
        prefix: "fas",
        iconName: "key",
        icon: [512, 512, [], "f084", "M512 176.001C512 273.203 433.202 352 336 352c-11.22 0-22.19-1.062-32.827-3.069l-24.012 27.014A23.999 23.999 0 0 1 261.223 384H224v40c0 13.255-10.745 24-24 24h-40v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-78.059c0-6.365 2.529-12.47 7.029-16.971l161.802-161.802C163.108 213.814 160 195.271 160 176 160 78.798 238.797.001 335.999 0 433.488-.001 512 78.511 512 176.001zM336 128c0 26.51 21.49 48 48 48s48-21.49 48-48-21.49-48-48-48-48 21.49-48 48z"]
    }, {
        prefix: "fas",
        iconName: "cog",
        icon: [512, 512, [], "f013", "M444.788 291.1l42.616 24.599c4.867 2.809 7.126 8.618 5.459 13.985-11.07 35.642-29.97 67.842-54.689 94.586a12.016 12.016 0 0 1-14.832 2.254l-42.584-24.595a191.577 191.577 0 0 1-60.759 35.13v49.182a12.01 12.01 0 0 1-9.377 11.718c-34.956 7.85-72.499 8.256-109.219.007-5.49-1.233-9.403-6.096-9.403-11.723v-49.184a191.555 191.555 0 0 1-60.759-35.13l-42.584 24.595a12.016 12.016 0 0 1-14.832-2.254c-24.718-26.744-43.619-58.944-54.689-94.586-1.667-5.366.592-11.175 5.459-13.985L67.212 291.1a193.48 193.48 0 0 1 0-70.199l-42.616-24.599c-4.867-2.809-7.126-8.618-5.459-13.985 11.07-35.642 29.97-67.842 54.689-94.586a12.016 12.016 0 0 1 14.832-2.254l42.584 24.595a191.577 191.577 0 0 1 60.759-35.13V25.759a12.01 12.01 0 0 1 9.377-11.718c34.956-7.85 72.499-8.256 109.219-.007 5.49 1.233 9.403 6.096 9.403 11.723v49.184a191.555 191.555 0 0 1 60.759 35.13l42.584-24.595a12.016 12.016 0 0 1 14.832 2.254c24.718 26.744 43.619 58.944 54.689 94.586 1.667 5.366-.592 11.175-5.459 13.985L444.788 220.9a193.485 193.485 0 0 1 0 70.2zM336 256c0-44.112-35.888-80-80-80s-80 35.888-80 80 35.888 80 80 80 80-35.888 80-80z"]
    }),
    Gt.watch(),
    r(53),
    r(58),
    i.applyAddon(o);
    var te, ee, re, ne, ie, oe, se, ae = !1, le = !1, ce = !1, he = !1, ue = new i, fe = document.getElementById("status"), pe = document.getElementById("header"), de = document.getElementById("dropupContent"), _e = document.getElementById("footer"), me = document.getElementById("terminal-container");
    function ye() {
        ue.fit(),
        se.emit("resize", {
            cols: ue.cols,
            rows: ue.rows
        })
    }
    if (ue.open(me),
    ue.focus(),
    ue.fit(),
    window.addEventListener("resize", ye, !1),
    document.location.pathname) {
        var ge = document.location.pathname.split("/")
          , ve = (ge.slice(0, ge.length - 1).join("/") + "/").substring(1) + "socket.io";
        se = n.connect(null, {
            resource: ve
        })
    } else
        se = n.connect();
    //TODO jiayq JASE.emit("data", t);//term
    if(JASE == null) {
    	console.log("JASE");
    	JASE = se;
    }
    //TODO jiayq JAUE.on("data", function(data) {})//socket
    if(JAUE == null) {
    	console.log("JAUE");
    	JAUE = ue;
    }
    function Ce(t) {
        de.innerHTML = t,
        logBtn.addEventListener("click", Ee),
        he && reauthBtn.addEventListener("click", be),
        ce && credentialsBtn.addEventListener("click", we),
        le && downloadLogBtn.addEventListener("click", Ae)
    }
    function be() {
        return console.log("re-authenticating"),
        !(window.location.href = "/reauth")
    }
    function we() {
        return se.emit("control", "replayCredentials"),
        console.log("replaying credentials"),
        ue.focus(),
        !1
    }
    function Ee() {
        return te = !0 === ae ? (le = !(ae = !1),
        logBtn.innerHTML = '<i class="fas fa-clipboard fa-fw"></i> Start Log',
        console.log("stopping log, " + ae),
        ne = new Date,
        te + "\r\n\r\nLog End for " + ee + ": " + ne.getFullYear() + "/" + (ne.getMonth() + 1) + "/" + ne.getDate() + " @ " + ne.getHours() + ":" + ne.getMinutes() + ":" + ne.getSeconds() + "\r\n") : (le = ae = !0,
        logBtn.innerHTML = '<i class="fas fa-cog fa-spin fa-fw"></i> Stop Log',
        downloadLogBtn.style.color = "#000",
        downloadLogBtn.addEventListener("click", Ae),
        console.log("starting log, " + ae),
        ne = new Date,
        "Log Start for " + ee + ": " + ne.getFullYear() + "/" + (ne.getMonth() + 1) + "/" + ne.getDate() + " @ " + ne.getHours() + ":" + ne.getMinutes() + ":" + ne.getSeconds() + "\r\n\r\n"),
        re = ne,
        ue.focus(),
        !1
    }
    function Ae() {
        if (!0 === le) {
            ie = "WebSSH2-" + re.getFullYear() + (re.getMonth() + 1) + re.getDate() + "_" + re.getHours() + re.getMinutes() + re.getSeconds() + ".log";
            var t = new Blob([te.replace(/[\u001b\u009b][[\]()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><;]/g, "")],{
                type: "text/plain"
            });
            if (window.navigator.msSaveOrOpenBlob)
                window.navigator.msSaveBlob(t, ie);
            else {
                var e = window.document.createElement("a");
                e.href = window.URL.createObjectURL(t),
                e.download = ie,
                document.body.appendChild(e),
                e.click(),
                document.body.removeChild(e)
            }
        }
        ue.focus()
    }
    ue.on("data", function(t) {//term
        se.emit("data", t)//socket
    }),
    se.on("data", function(t) {//socket
        ue.write(t),//term
        ae && (te += t)
    }),
    se.on("play_progress", function(t) {//socket
    	playProgressButton(t);
    }),
    se.on("open_rtsp_url", function(t) {//socket
    	onOpenRtspUrl(t);
    }),
    se.on("connect", function() {
        se.emit("geometry", ue.cols, ue.rows);
    }),
    se.on("setTerminalOpts", function(t) {
        ue.setOption("cursorBlink", t.cursorBlink),
        ue.setOption("scrollback", t.scrollback),
        ue.setOption("tabStopWidth", t.tabStopWidth),
        ue.setOption("bellStyle", t.bellStyle)
    }),
    se.on("title", function(t) {
        document.title = t
    }),
    se.on("menu", function(t) {
        Ce(t)
    }),
    se.on("status", function(t) {
        fe.innerHTML = t
    }),
    se.on("ssherror", function(t) {
        fe.innerHTML = t,
        fe.style.backgroundColor = "red",
        oe = !0
    }),
    se.on("headerBackground", function(t) {
        pe.style.backgroundColor = t
    }),
    se.on("header", function(t) {
        t && (pe.innerHTML = t,
        pe.style.display = "block",
        me.style.height = "calc(100% - 38px)",
        ye())
    }),
    se.on("footer", function(t) {
        ee = t,
        _e.innerHTML = t
    }),
    se.on("statusBackground", function(t) {
        fe.style.backgroundColor = t
    }),
    se.on("allowreplay", function(t) {
        !0 === t ? (console.log("allowreplay: " + t),
        ce = !0,
        Ce(de.innerHTML + '<a id="credentialsBtn"><i class="fas fa-key fa-fw"></i> 证书</a>')) : (ce = !1,
        console.log("allowreplay: " + t))
    }),
    se.on("allowreauth", function(t) {
        !0 === t ? (console.log("allowreauth: " + t),
        he = !0,
        Ce(de.innerHTML + '<a id="reauthBtn"><i class="fas fa-key fa-fw"></i> 切换用户</a>')) : (he = !1,
        console.log("allowreauth: " + t))
    }),
    se.on("disconnect", function(t) {
        oe || (fe.style.backgroundColor = "red",
        fe.innerHTML = "WEBSOCKET服务器已断开连接: " + t),
        se.io.reconnection(!1)
    }),
    se.on("error", function(t) {
        oe || (fe.style.backgroundColor = "red",
        fe.innerHTML = "错误: " + t)
    }),
    se.on("reauth", function() {
        he && be()
    }),
    ue.on("title", function(t) {
        document.title = t
    })
}
, function(t, e) {}
, , , , , function(t, e) {}
]);
