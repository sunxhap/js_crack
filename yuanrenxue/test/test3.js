
/**
 * [js-md2]{@link https://github.com/emn178/js-md2}
 *
 * @namespace md2
 * @version 0.2.2
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
/*jslint bitwise: true */
// (function () {
'use strict';

var root = typeof window === 'object' ? window : {};
var NODE_JS = !root.JS_MD2_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;
if (NODE_JS) {
    root = global;
}
var COMMON_JS = !root.JS_MD2_NO_COMMON_JS && typeof module === 'object' && module.exports;
var AMD = typeof define === 'function' && define.amd;
var HEX_CHARS = '0123456789abcdef'.split('');

var S = [
    0x29, 0x2E, 0x43, 0xC9, 0xA2, 0xD8, 0x7C, 0x01, 0x3D, 0x36, 0x54, 0xA1, 0xEC, 0xF0, 0x06, 0x13,
    0x62, 0xA7, 0x05, 0xF3, 0xC0, 0xC7, 0x73, 0x8C, 0x98, 0x93, 0x2B, 0xD9, 0xBC, 0x4C, 0x82, 0xCA,
    0x1E, 0x9B, 0x57, 0x3C, 0xFD, 0xD4, 0xE0, 0x16, 0x67, 0x42, 0x6F, 0x18, 0x8A, 0x17, 0xE5, 0x12,
    0xBE, 0x4E, 0xC4, 0xD6, 0xDA, 0x9E, 0xDE, 0x49, 0xA0, 0xFB, 0xF5, 0x8E, 0xBB, 0x2F, 0xEE, 0x7A,
    0xA9, 0x68, 0x79, 0x91, 0x15, 0xB2, 0x07, 0x3F, 0x94, 0xC2, 0x10, 0x89, 0x0B, 0x22, 0x5F, 0x21,
    0x80, 0x7F, 0x5D, 0x9A, 0x5A, 0x90, 0x32, 0x27, 0x35, 0x3E, 0xCC, 0xE7, 0xBF, 0xF7, 0x97, 0x03,
    0xFF, 0x19, 0x30, 0xB3, 0x48, 0xA5, 0xB5, 0xD1, 0xD7, 0x5E, 0x92, 0x2A, 0xAC, 0x56, 0xAA, 0xC6,
    0x4F, 0xB8, 0x38, 0xD2, 0x96, 0xA4, 0x7D, 0xB6, 0x76, 0xFC, 0x6B, 0xE2, 0x9C, 0x74, 0x04, 0xF1,
    0x45, 0x9D, 0x70, 0x59, 0x64, 0x71, 0x87, 0x20, 0x86, 0x5B, 0xCF, 0x65, 0xE6, 0x2D, 0xA8, 0x02,
    0x1B, 0x60, 0x25, 0xAD, 0xAE, 0xB0, 0xB9, 0xF6, 0x1C, 0x46, 0x61, 0x69, 0x34, 0x40, 0x7E, 0x0F,
    0x55, 0x47, 0xA3, 0x23, 0xDD, 0x51, 0xAF, 0x3A, 0xC3, 0x5C, 0xF9, 0xCE, 0xBA, 0xC5, 0xEA, 0x26,
    0x2C, 0x53, 0x0D, 0x6E, 0x85, 0x28, 0x84, 0x09, 0xD3, 0xDF, 0xCD, 0xF4, 0x41, 0x81, 0x4D, 0x52,
    0x6A, 0xDC, 0x37, 0xC8, 0x6C, 0xC1, 0xAB, 0xFA, 0x24, 0xE1, 0x7B, 0x08, 0x0C, 0xBD, 0xB1, 0x4A,
    0x78, 0x88, 0x95, 0x8B, 0xE3, 0x63, 0xE8, 0x6D, 0xE9, 0xCB, 0xD5, 0xFE, 0x3B, 0x00, 0x1D, 0x39,
    0xF2, 0xEF, 0xB7, 0x0E, 0x66, 0x58, 0xD0, 0xE4, 0xA6, 0x77, 0x72, 0xF8, 0xEB, 0x75, 0x4B, 0x0A,
    0x31, 0x44, 0x50, 0xB4, 0x8F, 0xED, 0x1F, 0x1A, 0xDB, 0x99, 0x8D, 0x33, 0x9F, 0x11, 0x83, 0x14
];

var M = [], X = [], C = [];

var md2 = function (message) {
    var code, i, j, k, t, L = 0, loop = 1, B,
        index = 0, start = 0, bytes = 0, length = message.length;

    for (i = 0; i < 16; ++i) {
        X[i] = C[i] = 0;
    }

    M[16] = M[17] = M[18] = 0;
    do {
        M[0] = M[16];
        M[1] = M[17];
        M[2] = M[18];
        M[16] = M[17] = M[18] = M[3] =
            M[4] = M[5] = M[6] = M[7] =
                M[8] = M[9] = M[10] = M[11] =
                    M[12] = M[13] = M[14] = M[15] = 0;
        for (i = start; index < length && i < 16; ++index) {
            code = message.charCodeAt(index);
            if (code < 0x80) {
                M[i++] = code;
            } else if (code < 0x800) {
                M[i++] = 0xc0 | (code >> 6);
                M[i++] = 0x80 | (code & 0x3f);
            } else if (code < 0xd800 || code >= 0xe000) {
                M[i++] = 0xe0 | (code >> 12);
                M[i++] = 0x80 | ((code >> 6) & 0x3f);
                M[i++] = 0x80 | (code & 0x3f);
            } else {
                code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
                M[i++] = 0xf0 | (code >> 18);
                M[i++] = 0x80 | ((code >> 12) & 0x3f);
                M[i++] = 0x80 | ((code >> 6) & 0x3f);
                M[i++] = 0x80 | (code & 0x3f);
            }
        }
        bytes += i - start;
        start = i - 16;

        if (index === length && i < 16) {
            loop = 2;
            t = 16 - (bytes & 15);
            for (; i < 16; ++i) {
                M[i] = t;
            }
        }

        for (i = 0; i < 16; ++i) {
            C[i] ^= S[M[i] ^ L];
            L = C[i];
        }

        for (i = 0; i < loop; ++i) {
            B = i === 0 ? M : C;

            X[16] = B[0];
            X[32] = X[16] ^ X[0];
            X[17] = B[1];
            X[33] = X[17] ^ X[1];
            X[18] = B[2];
            X[34] = X[18] ^ X[2];
            X[19] = B[3];
            X[35] = X[19] ^ X[3];
            X[20] = B[4];
            X[36] = X[20] ^ X[4];
            X[21] = B[5];
            X[37] = X[21] ^ X[5];
            X[22] = B[6];
            X[38] = X[22] ^ X[6];
            X[23] = B[7];
            X[39] = X[23] ^ X[7];
            X[24] = B[8];
            X[40] = X[24] ^ X[8];
            X[25] = B[9];
            X[41] = X[25] ^ X[9];
            X[26] = B[10];
            X[42] = X[26] ^ X[10];
            X[27] = B[11];
            X[43] = X[27] ^ X[11];
            X[28] = B[12];
            X[44] = X[28] ^ X[12];
            X[29] = B[13];
            X[45] = X[29] ^ X[13];
            X[30] = B[14];
            X[46] = X[30] ^ X[14];
            X[31] = B[15];
            X[47] = X[31] ^ X[15];

            t = 0;
            for (j = 0; j < 18; ++j) {
                for (k = 0; k < 48; ++k) {
                    X[k] = t = X[k] ^ S[t];
                }
                t = (t + j) & 0xFF;
            }
        }
    } while (loop === 1);

    var hex = '';
    for (i = 0; i < 16; ++i) {
        hex += HEX_CHARS[(X[i] >> 4) & 0x0F] + HEX_CHARS[X[i] & 0x0F];
    }
    return hex;
};

if (COMMON_JS) {
    module.exports = md2;
} else {
    root.md2 = md2;
    if (AMD) {
        define(function() {
            return md2;
        });
    }
}

/*
CryptoJS v3.0.2
code.google.com/p/crypto-js
(c) 2009-2012 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS = CryptoJS || function (o, q) {
    var l = {}, m = l.lib = {}, n = m.Base = function () {
        function a() {
        }

        return {
            extend: function (e) {
                a.prototype = this;
                var c = new a;
                e && c.mixIn(e);
                c.$super = this;
                return c
            }, create: function () {
                var a = this.extend();
                a.init.apply(a, arguments);
                return a
            }, init: function () {
            }, mixIn: function (a) {
                for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]);
                a.hasOwnProperty("toString") && (this.toString = a.toString)
            }, clone: function () {
                return this.$super.extend(this)
            }
        }
    }(), j = m.WordArray = n.extend({
        init: function (a, e) {
            a =
                this.words = a || [];
            this.sigBytes = e != q ? e : 4 * a.length
        }, toString: function (a) {
            return (a || r).stringify(this)
        }, concat: function (a) {
            var e = this.words, c = a.words, d = this.sigBytes, a = a.sigBytes;
            this.clamp();
            if (d % 4) for (var b = 0; b < a; b++) e[d + b >>> 2] |= (c[b >>> 2] >>> 24 - 8 * (b % 4) & 255) << 24 - 8 * ((d + b) % 4); else if (65535 < c.length) for (b = 0; b < a; b += 4) e[d + b >>> 2] = c[b >>> 2]; else e.push.apply(e, c);
            this.sigBytes += a;
            return this
        }, clamp: function () {
            var a = this.words, e = this.sigBytes;
            a[e >>> 2] &= 4294967295 << 32 - 8 * (e % 4);
            a.length = o.ceil(e / 4)
        }, clone: function () {
            var a =
                n.clone.call(this);
            a.words = this.words.slice(0);
            return a
        }, random: function (a) {
            for (var e = [], c = 0; c < a; c += 4) e.push(4294967296 * o.random() | 0);
            return j.create(e, a)
        }
    }), k = l.enc = {}, r = k.Hex = {
        stringify: function (a) {
            for (var e = a.words, a = a.sigBytes, c = [], d = 0; d < a; d++) {
                var b = e[d >>> 2] >>> 24 - 8 * (d % 4) & 255;
                c.push((b >>> 4).toString(16));
                c.push((b & 15).toString(16))
            }
            return c.join("")
        }, parse: function (a) {
            for (var b = a.length, c = [], d = 0; d < b; d += 2) c[d >>> 3] |= parseInt(a.substr(d, 2), 16) << 24 - 4 * (d % 8);
            return j.create(c, b / 2)
        }
    }, p = k.Latin1 = {
        stringify: function (a) {
            for (var b =
                a.words, a = a.sigBytes, c = [], d = 0; d < a; d++) c.push(String.fromCharCode(b[d >>> 2] >>> 24 - 8 * (d % 4) & 255));
            return c.join("")
        }, parse: function (a) {
            for (var b = a.length, c = [], d = 0; d < b; d++) c[d >>> 2] |= (a.charCodeAt(d) & 255) << 24 - 8 * (d % 4);
            return j.create(c, b)
        }
    }, h = k.Utf8 = {
        stringify: function (a) {
            try {
                return decodeURIComponent(escape(p.stringify(a)))
            } catch (b) {
                throw Error("Malformed UTF-8 data");
            }
        }, parse: function (a) {
            return p.parse(unescape(encodeURIComponent(a)))
        }
    }, b = m.BufferedBlockAlgorithm = n.extend({
        reset: function () {
            this._data = j.create();
            this._nDataBytes = 0
        }, _append: function (a) {
            "string" == typeof a && (a = h.parse(a));
            this._data.concat(a);
            this._nDataBytes += a.sigBytes
        }, _process: function (a) {
            var b = this._data, c = b.words, d = b.sigBytes, f = this.blockSize, i = d / (4 * f),
                i = a ? o.ceil(i) : o.max((i | 0) - this._minBufferSize, 0), a = i * f, d = o.min(4 * a, d);
            if (a) {
                for (var h = 0; h < a; h += f) this._doProcessBlock(c, h);
                h = c.splice(0, a);
                b.sigBytes -= d
            }
            return j.create(h, d)
        }, clone: function () {
            var a = n.clone.call(this);
            a._data = this._data.clone();
            return a
        }, _minBufferSize: 0
    });
    m.Hasher = b.extend({
        init: function () {
            this.reset()
        },
        reset: function () {
            b.reset.call(this);
            this._doReset()
        }, update: function (a) {
            this._append(a);
            this._process();
            return this
        }, finalize: function (a) {
            a && this._append(a);
            this._doFinalize();
            return this._hash
        }, clone: function () {
            var a = b.clone.call(this);
            a._hash = this._hash.clone();
            return a
        }, blockSize: 16, _createHelper: function (a) {
            return function (b, c) {
                return a.create(c).finalize(b)
            }
        }, _createHmacHelper: function (a) {
            return function (b, c) {
                return f.HMAC.create(a, c).finalize(b)
            }
        }
    });
    var f = l.algo = {};
    return l
}(Math);
(function (o) {
    function q(b, f, a, e, c, d, g) {
        b = b + (f & a | ~f & e) + c + g;
        return (b << d | b >>> 32 - d) + f
    }

    function l(b, f, a, e, c, d, g) {
        b = b + (f & e | a & ~e) + c + g;
        return (b << d | b >>> 32 - d) + f
    }

    function m(b, f, a, e, c, d, g) {
        b = b + (f ^ a ^ e) + c + g;
        return (b << d | b >>> 32 - d) + f
    }

    function n(b, f, a, e, c, d, g) {
        b = b + (a ^ (f | ~e)) + c + g;
        return (b << d | b >>> 32 - d) + f
    }

    var j = CryptoJS, k = j.lib, r = k.WordArray, k = k.Hasher, p = j.algo, h = [];
    (function () {
        for (var b = 0; 64 > b; b++) h[b] = 4294967296 * o.abs(o.sin(b + 1)) | 0
    })();
    p = p.MD5 = k.extend({
        _doReset: function () {
            this._hash = r.create([1732584193, 4023233417,
                2562383102, 271733878])
        }, _doProcessBlock: function (b, f) {
            for (var a = 0; 16 > a; a++) {
                var e = f + a, c = b[e];
                b[e] = (c << 8 | c >>> 24) & 16711935 | (c << 24 | c >>> 8) & 4278255360
            }
            for (var e = this._hash.words, c = e[0], d = e[1], g = e[2], i = e[3], a = 0; 64 > a; a += 4) 16 > a ? (c = q(c, d, g, i, b[f + a], 7, h[a]), i = q(i, c, d, g, b[f + a + 1], 12, h[a + 1]), g = q(g, i, c, d, b[f + a + 2], 17, h[a + 2]), d = q(d, g, i, c, b[f + a + 3], 22, h[a + 3])) : 32 > a ? (c = l(c, d, g, i, b[f + (a + 1) % 16], 5, h[a]), i = l(i, c, d, g, b[f + (a + 6) % 16], 9, h[a + 1]), g = l(g, i, c, d, b[f + (a + 11) % 16], 14, h[a + 2]), d = l(d, g, i, c, b[f + a % 16], 20, h[a + 3])) : 48 > a ? (c =
                m(c, d, g, i, b[f + (3 * a + 5) % 16], 4, h[a]), i = m(i, c, d, g, b[f + (3 * a + 8) % 16], 11, h[a + 1]), g = m(g, i, c, d, b[f + (3 * a + 11) % 16], 16, h[a + 2]), d = m(d, g, i, c, b[f + (3 * a + 14) % 16], 23, h[a + 3])) : (c = n(c, d, g, i, b[f + 3 * a % 16], 6, h[a]), i = n(i, c, d, g, b[f + (3 * a + 7) % 16], 10, h[a + 1]), g = n(g, i, c, d, b[f + (3 * a + 14) % 16], 15, h[a + 2]), d = n(d, g, i, c, b[f + (3 * a + 5) % 16], 21, h[a + 3]));
            e[0] = e[0] + c | 0;
            e[1] = e[1] + d | 0;
            e[2] = e[2] + g | 0;
            e[3] = e[3] + i | 0
        }, _doFinalize: function () {
            var b = this._data, f = b.words, a = 8 * this._nDataBytes, e = 8 * b.sigBytes;
            f[e >>> 5] |= 128 << 24 - e % 32;
            f[(e + 64 >>> 9 << 4) + 14] = (a << 8 | a >>>
                24) & 16711935 | (a << 24 | a >>> 8) & 4278255360;
            b.sigBytes = 4 * (f.length + 1);
            this._process();
            b = this._hash.words;
            for (f = 0; 4 > f; f++) a = b[f], b[f] = (a << 8 | a >>> 24) & 16711935 | (a << 24 | a >>> 8) & 4278255360
        }
    });
    j.MD5 = k._createHelper(p);
    j.HmacMD5 = k._createHmacHelper(p)
})(Math);


// console.log(CryptoJS.MD5('11111111').toString());

/*
CryptoJS v3.0.2
code.google.com/p/crypto-js
(c) 2009-2012 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS = CryptoJS || function (i, m) {
    var p = {}, h = p.lib = {}, n = h.Base = function () {
        function a() {
        }

        return {
            extend: function (b) {
                a.prototype = this;
                var c = new a;
                b && c.mixIn(b);
                c.$super = this;
                return c
            }, create: function () {
                var a = this.extend();
                a.init.apply(a, arguments);
                return a
            }, init: function () {
            }, mixIn: function (a) {
                for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]);
                a.hasOwnProperty("toString") && (this.toString = a.toString)
            }, clone: function () {
                return this.$super.extend(this)
            }
        }
    }(), o = h.WordArray = n.extend({
        init: function (a, b) {
            a =
                this.words = a || [];
            this.sigBytes = b != m ? b : 4 * a.length
        }, toString: function (a) {
            return (a || e).stringify(this)
        }, concat: function (a) {
            var b = this.words, c = a.words, d = this.sigBytes, a = a.sigBytes;
            this.clamp();
            if (d % 4) for (var f = 0; f < a; f++) b[d + f >>> 2] |= (c[f >>> 2] >>> 24 - 8 * (f % 4) & 255) << 24 - 8 * ((d + f) % 4); else if (65535 < c.length) for (f = 0; f < a; f += 4) b[d + f >>> 2] = c[f >>> 2]; else b.push.apply(b, c);
            this.sigBytes += a;
            return this
        }, clamp: function () {
            var a = this.words, b = this.sigBytes;
            a[b >>> 2] &= 4294967295 << 32 - 8 * (b % 4);
            a.length = i.ceil(b / 4)
        }, clone: function () {
            var a =
                n.clone.call(this);
            a.words = this.words.slice(0);
            return a
        }, random: function (a) {
            for (var b = [], c = 0; c < a; c += 4) b.push(4294967296 * i.random() | 0);
            return o.create(b, a)
        }
    }), q = p.enc = {}, e = q.Hex = {
        stringify: function (a) {
            for (var b = a.words, a = a.sigBytes, c = [], d = 0; d < a; d++) {
                var f = b[d >>> 2] >>> 24 - 8 * (d % 4) & 255;
                c.push((f >>> 4).toString(16));
                c.push((f & 15).toString(16))
            }
            return c.join("")
        }, parse: function (a) {
            for (var b = a.length, c = [], d = 0; d < b; d += 2) c[d >>> 3] |= parseInt(a.substr(d, 2), 16) << 24 - 4 * (d % 8);
            return o.create(c, b / 2)
        }
    }, g = q.Latin1 = {
        stringify: function (a) {
            for (var b =
                a.words, a = a.sigBytes, c = [], d = 0; d < a; d++) c.push(String.fromCharCode(b[d >>> 2] >>> 24 - 8 * (d % 4) & 255));
            return c.join("")
        }, parse: function (a) {
            for (var b = a.length, c = [], d = 0; d < b; d++) c[d >>> 2] |= (a.charCodeAt(d) & 255) << 24 - 8 * (d % 4);
            return o.create(c, b)
        }
    }, j = q.Utf8 = {
        stringify: function (a) {
            try {
                return decodeURIComponent(escape(g.stringify(a)))
            } catch (b) {
                throw Error("Malformed UTF-8 data");
            }
        }, parse: function (a) {
            return g.parse(unescape(encodeURIComponent(a)))
        }
    }, k = h.BufferedBlockAlgorithm = n.extend({
        reset: function () {
            this._data = o.create();
            this._nDataBytes = 0
        }, _append: function (a) {
            "string" == typeof a && (a = j.parse(a));
            this._data.concat(a);
            this._nDataBytes += a.sigBytes
        }, _process: function (a) {
            var b = this._data, c = b.words, d = b.sigBytes, f = this.blockSize, e = d / (4 * f),
                e = a ? i.ceil(e) : i.max((e | 0) - this._minBufferSize, 0), a = e * f, d = i.min(4 * a, d);
            if (a) {
                for (var g = 0; g < a; g += f) this._doProcessBlock(c, g);
                g = c.splice(0, a);
                b.sigBytes -= d
            }
            return o.create(g, d)
        }, clone: function () {
            var a = n.clone.call(this);
            a._data = this._data.clone();
            return a
        }, _minBufferSize: 0
    });
    h.Hasher = k.extend({
        init: function () {
            this.reset()
        },
        reset: function () {
            k.reset.call(this);
            this._doReset()
        }, update: function (a) {
            this._append(a);
            this._process();
            return this
        }, finalize: function (a) {
            a && this._append(a);
            this._doFinalize();
            return this._hash
        }, clone: function () {
            var a = k.clone.call(this);
            a._hash = this._hash.clone();
            return a
        }, blockSize: 16, _createHelper: function (a) {
            return function (b, c) {
                return a.create(c).finalize(b)
            }
        }, _createHmacHelper: function (a) {
            return function (b, c) {
                return l.HMAC.create(a, c).finalize(b)
            }
        }
    });
    var l = p.algo = {};
    return p
}(Math);
(function () {
    var i = CryptoJS, m = i.lib, p = m.WordArray, m = m.Hasher, h = [], n = i.algo.SHA1 = m.extend({
        _doReset: function () {
            this._hash = p.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
        }, _doProcessBlock: function (o, i) {
            for (var e = this._hash.words, g = e[0], j = e[1], k = e[2], l = e[3], a = e[4], b = 0; 80 > b; b++) {
                if (16 > b) h[b] = o[i + b] | 0; else {
                    var c = h[b - 3] ^ h[b - 8] ^ h[b - 14] ^ h[b - 16];
                    h[b] = c << 1 | c >>> 31
                }
                c = (g << 5 | g >>> 27) + a + h[b];
                c = 20 > b ? c + ((j & k | ~j & l) + 1518500249) : 40 > b ? c + ((j ^ k ^ l) + 1859775393) : 60 > b ? c + ((j & k | j & l | k & l) - 1894007588) : c + ((j ^ k ^ l) -
                    899497514);
                a = l;
                l = k;
                k = j << 30 | j >>> 2;
                j = g;
                g = c
            }
            e[0] = e[0] + g | 0;
            e[1] = e[1] + j | 0;
            e[2] = e[2] + k | 0;
            e[3] = e[3] + l | 0;
            e[4] = e[4] + a | 0
        }, _doFinalize: function () {
            var i = this._data, h = i.words, e = 8 * this._nDataBytes, g = 8 * i.sigBytes;
            h[g >>> 5] |= 128 << 24 - g % 32;
            h[(g + 64 >>> 9 << 4) + 15] = e;
            i.sigBytes = 4 * h.length;
            this._process()
        }
    });
    i.SHA1 = m._createHelper(n);
    i.HmacSHA1 = m._createHmacHelper(n)
})();


// console.log(CryptoJS.SHA1("123456").toString());    // 7c4a8d09ca3762af61e59520943dc26494f8941b

/*
CryptoJS v3.0.2
code.google.com/p/crypto-js
(c) 2009-2012 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS = CryptoJS || function (i, p) {
    var f = {}, q = f.lib = {}, j = q.Base = function () {
        function a() {
        }

        return {
            extend: function (h) {
                a.prototype = this;
                var d = new a;
                h && d.mixIn(h);
                d.$super = this;
                return d
            }, create: function () {
                var a = this.extend();
                a.init.apply(a, arguments);
                return a
            }, init: function () {
            }, mixIn: function (a) {
                for (var d in a) a.hasOwnProperty(d) && (this[d] = a[d]);
                a.hasOwnProperty("toString") && (this.toString = a.toString)
            }, clone: function () {
                return this.$super.extend(this)
            }
        }
    }(), k = q.WordArray = j.extend({
        init: function (a, h) {
            a =
                this.words = a || [];
            this.sigBytes = h != p ? h : 4 * a.length
        }, toString: function (a) {
            return (a || m).stringify(this)
        }, concat: function (a) {
            var h = this.words, d = a.words, c = this.sigBytes, a = a.sigBytes;
            this.clamp();
            if (c % 4) for (var b = 0; b < a; b++) h[c + b >>> 2] |= (d[b >>> 2] >>> 24 - 8 * (b % 4) & 255) << 24 - 8 * ((c + b) % 4); else if (65535 < d.length) for (b = 0; b < a; b += 4) h[c + b >>> 2] = d[b >>> 2]; else h.push.apply(h, d);
            this.sigBytes += a;
            return this
        }, clamp: function () {
            var a = this.words, b = this.sigBytes;
            a[b >>> 2] &= 4294967295 << 32 - 8 * (b % 4);
            a.length = i.ceil(b / 4)
        }, clone: function () {
            var a =
                j.clone.call(this);
            a.words = this.words.slice(0);
            return a
        }, random: function (a) {
            for (var b = [], d = 0; d < a; d += 4) b.push(4294967296 * i.random() | 0);
            return k.create(b, a)
        }
    }), r = f.enc = {}, m = r.Hex = {
        stringify: function (a) {
            for (var b = a.words, a = a.sigBytes, d = [], c = 0; c < a; c++) {
                var e = b[c >>> 2] >>> 24 - 8 * (c % 4) & 255;
                d.push((e >>> 4).toString(16));
                d.push((e & 15).toString(16))
            }
            return d.join("")
        }, parse: function (a) {
            for (var b = a.length, d = [], c = 0; c < b; c += 2) d[c >>> 3] |= parseInt(a.substr(c, 2), 16) << 24 - 4 * (c % 8);
            return k.create(d, b / 2)
        }
    }, s = r.Latin1 = {
        stringify: function (a) {
            for (var b =
                a.words, a = a.sigBytes, d = [], c = 0; c < a; c++) d.push(String.fromCharCode(b[c >>> 2] >>> 24 - 8 * (c % 4) & 255));
            return d.join("")
        }, parse: function (a) {
            for (var b = a.length, d = [], c = 0; c < b; c++) d[c >>> 2] |= (a.charCodeAt(c) & 255) << 24 - 8 * (c % 4);
            return k.create(d, b)
        }
    }, g = r.Utf8 = {
        stringify: function (a) {
            try {
                return decodeURIComponent(escape(s.stringify(a)))
            } catch (b) {
                throw Error("Malformed UTF-8 data");
            }
        }, parse: function (a) {
            return s.parse(unescape(encodeURIComponent(a)))
        }
    }, b = q.BufferedBlockAlgorithm = j.extend({
        reset: function () {
            this._data = k.create();
            this._nDataBytes = 0
        }, _append: function (a) {
            "string" == typeof a && (a = g.parse(a));
            this._data.concat(a);
            this._nDataBytes += a.sigBytes
        }, _process: function (a) {
            var b = this._data, d = b.words, c = b.sigBytes, e = this.blockSize, f = c / (4 * e),
                f = a ? i.ceil(f) : i.max((f | 0) - this._minBufferSize, 0), a = f * e, c = i.min(4 * a, c);
            if (a) {
                for (var g = 0; g < a; g += e) this._doProcessBlock(d, g);
                g = d.splice(0, a);
                b.sigBytes -= c
            }
            return k.create(g, c)
        }, clone: function () {
            var a = j.clone.call(this);
            a._data = this._data.clone();
            return a
        }, _minBufferSize: 0
    });
    q.Hasher = b.extend({
        init: function () {
            this.reset()
        },
        reset: function () {
            b.reset.call(this);
            this._doReset()
        }, update: function (a) {
            this._append(a);
            this._process();
            return this
        }, finalize: function (a) {
            a && this._append(a);
            this._doFinalize();
            return this._hash
        }, clone: function () {
            var a = b.clone.call(this);
            a._hash = this._hash.clone();
            return a
        }, blockSize: 16, _createHelper: function (a) {
            return function (b, d) {
                return a.create(d).finalize(b)
            }
        }, _createHmacHelper: function (a) {
            return function (b, d) {
                return e.HMAC.create(a, d).finalize(b)
            }
        }
    });
    var e = f.algo = {};
    return f
}(Math);
(function (i) {
    var p = CryptoJS, f = p.lib, q = f.WordArray, f = f.Hasher, j = p.algo, k = [], r = [];
    (function () {
        function f(a) {
            for (var b = i.sqrt(a), d = 2; d <= b; d++) if (!(a % d)) return !1;
            return !0
        }

        function g(a) {
            return 4294967296 * (a - (a | 0)) | 0
        }

        for (var b = 2, e = 0; 64 > e;) f(b) && (8 > e && (k[e] = g(i.pow(b, 0.5))), r[e] = g(i.pow(b, 1 / 3)), e++), b++
    })();
    var m = [], j = j.SHA256 = f.extend({
        _doReset: function () {
            this._hash = q.create(k.slice(0))
        }, _doProcessBlock: function (f, g) {
            for (var b = this._hash.words, e = b[0], a = b[1], h = b[2], d = b[3], c = b[4], i = b[5], j = b[6], k = b[7], l = 0; 64 >
            l; l++) {
                if (16 > l) m[l] = f[g + l] | 0; else {
                    var n = m[l - 15], o = m[l - 2];
                    m[l] = ((n << 25 | n >>> 7) ^ (n << 14 | n >>> 18) ^ n >>> 3) + m[l - 7] + ((o << 15 | o >>> 17) ^ (o << 13 | o >>> 19) ^ o >>> 10) + m[l - 16]
                }
                n = k + ((c << 26 | c >>> 6) ^ (c << 21 | c >>> 11) ^ (c << 7 | c >>> 25)) + (c & i ^ ~c & j) + r[l] + m[l];
                o = ((e << 30 | e >>> 2) ^ (e << 19 | e >>> 13) ^ (e << 10 | e >>> 22)) + (e & a ^ e & h ^ a & h);
                k = j;
                j = i;
                i = c;
                c = d + n | 0;
                d = h;
                h = a;
                a = e;
                e = n + o | 0
            }
            b[0] = b[0] + e | 0;
            b[1] = b[1] + a | 0;
            b[2] = b[2] + h | 0;
            b[3] = b[3] + d | 0;
            b[4] = b[4] + c | 0;
            b[5] = b[5] + i | 0;
            b[6] = b[6] + j | 0;
            b[7] = b[7] + k | 0
        }, _doFinalize: function () {
            var f = this._data, g = f.words, b = 8 * this._nDataBytes,
                e = 8 * f.sigBytes;
            g[e >>> 5] |= 128 << 24 - e % 32;
            g[(e + 64 >>> 9 << 4) + 15] = b;
            f.sigBytes = 4 * g.length;
            this._process()
        }
    });
    p.SHA256 = f._createHelper(j);
    p.HmacSHA256 = f._createHmacHelper(j)
})(Math);

// console.log(CryptoJS.SHA256('11111111').toString());

/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(a,c){var d={},j=d.lib={},f=function(){},m=j.Base={extend:function(a){f.prototype=this;var b=new f;a&&b.mixIn(a);b.hasOwnProperty("init")||(b.init=function(){b.$super.init.apply(this,arguments)});b.init.prototype=b;b.$super=this;return b},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var b in a)a.hasOwnProperty(b)&&(this[b]=a[b]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
    B=j.WordArray=m.extend({init:function(a,b){a=this.words=a||[];this.sigBytes=b!=c?b:4*a.length},toString:function(a){return(a||y).stringify(this)},concat:function(a){var b=this.words,g=a.words,e=this.sigBytes;a=a.sigBytes;this.clamp();if(e%4)for(var k=0;k<a;k++)b[e+k>>>2]|=(g[k>>>2]>>>24-8*(k%4)&255)<<24-8*((e+k)%4);else if(65535<g.length)for(k=0;k<a;k+=4)b[e+k>>>2]=g[k>>>2];else b.push.apply(b,g);this.sigBytes+=a;return this},clamp:function(){var n=this.words,b=this.sigBytes;n[b>>>2]&=4294967295<<
            32-8*(b%4);n.length=a.ceil(b/4)},clone:function(){var a=m.clone.call(this);a.words=this.words.slice(0);return a},random:function(n){for(var b=[],g=0;g<n;g+=4)b.push(4294967296*a.random()|0);return new B.init(b,n)}}),v=d.enc={},y=v.Hex={stringify:function(a){var b=a.words;a=a.sigBytes;for(var g=[],e=0;e<a;e++){var k=b[e>>>2]>>>24-8*(e%4)&255;g.push((k>>>4).toString(16));g.push((k&15).toString(16))}return g.join("")},parse:function(a){for(var b=a.length,g=[],e=0;e<b;e+=2)g[e>>>3]|=parseInt(a.substr(e,
            2),16)<<24-4*(e%8);return new B.init(g,b/2)}},F=v.Latin1={stringify:function(a){var b=a.words;a=a.sigBytes;for(var g=[],e=0;e<a;e++)g.push(String.fromCharCode(b[e>>>2]>>>24-8*(e%4)&255));return g.join("")},parse:function(a){for(var b=a.length,g=[],e=0;e<b;e++)g[e>>>2]|=(a.charCodeAt(e)&255)<<24-8*(e%4);return new B.init(g,b)}},ha=v.Utf8={stringify:function(a){try{return decodeURIComponent(escape(F.stringify(a)))}catch(b){throw Error("Malformed UTF-8 data");}},parse:function(a){return F.parse(unescape(encodeURIComponent(a)))}},
    Z=j.BufferedBlockAlgorithm=m.extend({reset:function(){this._data=new B.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=ha.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(n){var b=this._data,g=b.words,e=b.sigBytes,k=this.blockSize,m=e/(4*k),m=n?a.ceil(m):a.max((m|0)-this._minBufferSize,0);n=m*k;e=a.min(4*n,e);if(n){for(var c=0;c<n;c+=k)this._doProcessBlock(g,c);c=g.splice(0,n);b.sigBytes-=e}return new B.init(c,e)},clone:function(){var a=m.clone.call(this);
            a._data=this._data.clone();return a},_minBufferSize:0});j.Hasher=Z.extend({cfg:m.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){Z.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,g){return(new a.init(g)).finalize(b)}},_createHmacHelper:function(a){return function(b,g){return(new ia.HMAC.init(a,
        g)).finalize(b)}}});var ia=d.algo={};return d}(Math);
(function(a){var c=CryptoJS,d=c.lib,j=d.Base,f=d.WordArray,c=c.x64={};c.Word=j.extend({init:function(a,c){this.high=a;this.low=c}});c.WordArray=j.extend({init:function(c,d){c=this.words=c||[];this.sigBytes=d!=a?d:8*c.length},toX32:function(){for(var a=this.words,c=a.length,d=[],j=0;j<c;j++){var F=a[j];d.push(F.high);d.push(F.low)}return f.create(d,this.sigBytes)},clone:function(){for(var a=j.clone.call(this),c=a.words=this.words.slice(0),d=c.length,f=0;f<d;f++)c[f]=c[f].clone();return a}})})();
(function(){function a(){return f.create.apply(f,arguments)}for(var c=CryptoJS,d=c.lib.Hasher,j=c.x64,f=j.Word,m=j.WordArray,j=c.algo,B=[a(1116352408,3609767458),a(1899447441,602891725),a(3049323471,3964484399),a(3921009573,2173295548),a(961987163,4081628472),a(1508970993,3053834265),a(2453635748,2937671579),a(2870763221,3664609560),a(3624381080,2734883394),a(310598401,1164996542),a(607225278,1323610764),a(1426881987,3590304994),a(1925078388,4068182383),a(2162078206,991336113),a(2614888103,633803317),
    a(3248222580,3479774868),a(3835390401,2666613458),a(4022224774,944711139),a(264347078,2341262773),a(604807628,2007800933),a(770255983,1495990901),a(1249150122,1856431235),a(1555081692,3175218132),a(1996064986,2198950837),a(2554220882,3999719339),a(2821834349,766784016),a(2952996808,2566594879),a(3210313671,3203337956),a(3336571891,1034457026),a(3584528711,2466948901),a(113926993,3758326383),a(338241895,168717936),a(666307205,1188179964),a(773529912,1546045734),a(1294757372,1522805485),a(1396182291,
        2643833823),a(1695183700,2343527390),a(1986661051,1014477480),a(2177026350,1206759142),a(2456956037,344077627),a(2730485921,1290863460),a(2820302411,3158454273),a(3259730800,3505952657),a(3345764771,106217008),a(3516065817,3606008344),a(3600352804,1432725776),a(4094571909,1467031594),a(275423344,851169720),a(430227734,3100823752),a(506948616,1363258195),a(659060556,3750685593),a(883997877,3785050280),a(958139571,3318307427),a(1322822218,3812723403),a(1537002063,2003034995),a(1747873779,3602036899),
    a(1955562222,1575990012),a(2024104815,1125592928),a(2227730452,2716904306),a(2361852424,442776044),a(2428436474,593698344),a(2756734187,3733110249),a(3204031479,2999351573),a(3329325298,3815920427),a(3391569614,3928383900),a(3515267271,566280711),a(3940187606,3454069534),a(4118630271,4000239992),a(116418474,1914138554),a(174292421,2731055270),a(289380356,3203993006),a(460393269,320620315),a(685471733,587496836),a(852142971,1086792851),a(1017036298,365543100),a(1126000580,2618297676),a(1288033470,
        3409855158),a(1501505948,4234509866),a(1607167915,987167468),a(1816402316,1246189591)],v=[],y=0;80>y;y++)v[y]=a();j=j.SHA512=d.extend({_doReset:function(){this._hash=new m.init([new f.init(1779033703,4089235720),new f.init(3144134277,2227873595),new f.init(1013904242,4271175723),new f.init(2773480762,1595750129),new f.init(1359893119,2917565137),new f.init(2600822924,725511199),new f.init(528734635,4215389547),new f.init(1541459225,327033209)])},_doProcessBlock:function(a,c){for(var d=this._hash.words,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                f=d[0],j=d[1],b=d[2],g=d[3],e=d[4],k=d[5],m=d[6],d=d[7],y=f.high,M=f.low,$=j.high,N=j.low,aa=b.high,O=b.low,ba=g.high,P=g.low,ca=e.high,Q=e.low,da=k.high,R=k.low,ea=m.high,S=m.low,fa=d.high,T=d.low,s=y,p=M,G=$,D=N,H=aa,E=O,W=ba,I=P,t=ca,q=Q,U=da,J=R,V=ea,K=S,X=fa,L=T,u=0;80>u;u++){var z=v[u];if(16>u)var r=z.high=a[c+2*u]|0,h=z.low=a[c+2*u+1]|0;else{var r=v[u-15],h=r.high,w=r.low,r=(h>>>1|w<<31)^(h>>>8|w<<24)^h>>>7,w=(w>>>1|h<<31)^(w>>>8|h<<24)^(w>>>7|h<<25),C=v[u-2],h=C.high,l=C.low,C=(h>>>19|l<<
        13)^(h<<3|l>>>29)^h>>>6,l=(l>>>19|h<<13)^(l<<3|h>>>29)^(l>>>6|h<<26),h=v[u-7],Y=h.high,A=v[u-16],x=A.high,A=A.low,h=w+h.low,r=r+Y+(h>>>0<w>>>0?1:0),h=h+l,r=r+C+(h>>>0<l>>>0?1:0),h=h+A,r=r+x+(h>>>0<A>>>0?1:0);z.high=r;z.low=h}var Y=t&U^~t&V,A=q&J^~q&K,z=s&G^s&H^G&H,ja=p&D^p&E^D&E,w=(s>>>28|p<<4)^(s<<30|p>>>2)^(s<<25|p>>>7),C=(p>>>28|s<<4)^(p<<30|s>>>2)^(p<<25|s>>>7),l=B[u],ka=l.high,ga=l.low,l=L+((q>>>14|t<<18)^(q>>>18|t<<14)^(q<<23|t>>>9)),x=X+((t>>>14|q<<18)^(t>>>18|q<<14)^(t<<23|q>>>9))+(l>>>0<
    L>>>0?1:0),l=l+A,x=x+Y+(l>>>0<A>>>0?1:0),l=l+ga,x=x+ka+(l>>>0<ga>>>0?1:0),l=l+h,x=x+r+(l>>>0<h>>>0?1:0),h=C+ja,z=w+z+(h>>>0<C>>>0?1:0),X=V,L=K,V=U,K=J,U=t,J=q,q=I+l|0,t=W+x+(q>>>0<I>>>0?1:0)|0,W=H,I=E,H=G,E=D,G=s,D=p,p=l+h|0,s=x+z+(p>>>0<l>>>0?1:0)|0}M=f.low=M+p;f.high=y+s+(M>>>0<p>>>0?1:0);N=j.low=N+D;j.high=$+G+(N>>>0<D>>>0?1:0);O=b.low=O+E;b.high=aa+H+(O>>>0<E>>>0?1:0);P=g.low=P+I;g.high=ba+W+(P>>>0<I>>>0?1:0);Q=e.low=Q+q;e.high=ca+t+(Q>>>0<q>>>0?1:0);R=k.low=R+J;k.high=da+U+(R>>>0<J>>>0?1:0);
        S=m.low=S+K;m.high=ea+V+(S>>>0<K>>>0?1:0);T=d.low=T+L;d.high=fa+X+(T>>>0<L>>>0?1:0)},_doFinalize:function(){var a=this._data,c=a.words,d=8*this._nDataBytes,f=8*a.sigBytes;c[f>>>5]|=128<<24-f%32;c[(f+128>>>10<<5)+30]=Math.floor(d/4294967296);c[(f+128>>>10<<5)+31]=d;a.sigBytes=4*c.length;this._process();return this._hash.toX32()},clone:function(){var a=d.clone.call(this);a._hash=this._hash.clone();return a},blockSize:32});c.SHA512=d._createHelper(j);c.HmacSHA512=d._createHmacHelper(j)})();
(function(){var a=CryptoJS,c=a.x64,d=c.Word,j=c.WordArray,c=a.algo,f=c.SHA512,c=c.SHA384=f.extend({_doReset:function(){this._hash=new j.init([new d.init(3418070365,3238371032),new d.init(1654270250,914150663),new d.init(2438529370,812702999),new d.init(355462360,4144912697),new d.init(1731405415,4290775857),new d.init(2394180231,1750603025),new d.init(3675008525,1694076839),new d.init(1203062813,3204075428)])},_doFinalize:function(){var a=f._doFinalize.call(this);a.sigBytes-=16;return a}});a.SHA384=
    f._createHelper(c);a.HmacSHA384=f._createHmacHelper(c)})();


// console.log(CryptoJS.SHA384('11111111').toString());

/*
CryptoJS v3.0.2
code.google.com/p/crypto-js
(c) 2009-2012 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(a,g){var m={},e=m.lib={},q=e.Base=function(){function a(){}return{extend:function(b){a.prototype=this;var d=new a;b&&d.mixIn(b);d.$super=this;return d},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var k in a)a.hasOwnProperty(k)&&(this[k]=a[k]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.$super.extend(this)}}}(),r=e.WordArray=q.extend({init:function(a,b){a=
        this.words=a||[];this.sigBytes=b!=g?b:4*a.length},toString:function(a){return(a||n).stringify(this)},concat:function(a){var b=this.words,d=a.words,c=this.sigBytes,a=a.sigBytes;this.clamp();if(c%4)for(var i=0;i<a;i++)b[c+i>>>2]|=(d[i>>>2]>>>24-8*(i%4)&255)<<24-8*((c+i)%4);else if(65535<d.length)for(i=0;i<a;i+=4)b[c+i>>>2]=d[i>>>2];else b.push.apply(b,d);this.sigBytes+=a;return this},clamp:function(){var k=this.words,b=this.sigBytes;k[b>>>2]&=4294967295<<32-8*(b%4);k.length=a.ceil(b/4)},clone:function(){var a=
        q.clone.call(this);a.words=this.words.slice(0);return a},random:function(k){for(var b=[],d=0;d<k;d+=4)b.push(4294967296*a.random()|0);return r.create(b,k)}}),y=m.enc={},n=y.Hex={stringify:function(a){for(var b=a.words,a=a.sigBytes,d=[],c=0;c<a;c++){var i=b[c>>>2]>>>24-8*(c%4)&255;d.push((i>>>4).toString(16));d.push((i&15).toString(16))}return d.join("")},parse:function(a){for(var b=a.length,d=[],c=0;c<b;c+=2)d[c>>>3]|=parseInt(a.substr(c,2),16)<<24-4*(c%8);return r.create(d,b/2)}},l=y.Latin1={stringify:function(a){for(var b=
        a.words,a=a.sigBytes,d=[],c=0;c<a;c++)d.push(String.fromCharCode(b[c>>>2]>>>24-8*(c%4)&255));return d.join("")},parse:function(a){for(var b=a.length,d=[],c=0;c<b;c++)d[c>>>2]|=(a.charCodeAt(c)&255)<<24-8*(c%4);return r.create(d,b)}},da=y.Utf8={stringify:function(a){try{return decodeURIComponent(escape(l.stringify(a)))}catch(b){throw Error("Malformed UTF-8 data");}},parse:function(a){return l.parse(unescape(encodeURIComponent(a)))}},h=e.BufferedBlockAlgorithm=q.extend({reset:function(){this._data=
        r.create();this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=da.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(k){var b=this._data,d=b.words,c=b.sigBytes,i=this.blockSize,l=c/(4*i),l=k?a.ceil(l):a.max((l|0)-this._minBufferSize,0),k=l*i,c=a.min(4*k,c);if(k){for(var h=0;h<k;h+=i)this._doProcessBlock(d,h);h=d.splice(0,k);b.sigBytes-=c}return r.create(h,c)},clone:function(){var a=q.clone.call(this);a._data=this._data.clone();return a},_minBufferSize:0});e.Hasher=
    h.extend({init:function(){this.reset()},reset:function(){h.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);this._doFinalize();return this._hash},clone:function(){var a=h.clone.call(this);a._hash=this._hash.clone();return a},blockSize:16,_createHelper:function(a){return function(b,d){return a.create(d).finalize(b)}},_createHmacHelper:function(a){return function(b,d){return ea.HMAC.create(a,d).finalize(b)}}});
    var ea=m.algo={};return m}(Math);
(function(a){var g=CryptoJS,m=g.lib,e=m.Base,q=m.WordArray,g=g.x64={};g.Word=e.extend({init:function(a,e){this.high=a;this.low=e}});g.WordArray=e.extend({init:function(e,y){e=this.words=e||[];this.sigBytes=y!=a?y:8*e.length},toX32:function(){for(var a=this.words,e=a.length,n=[],l=0;l<e;l++){var g=a[l];n.push(g.high);n.push(g.low)}return q.create(n,this.sigBytes)},clone:function(){for(var a=e.clone.call(this),g=a.words=this.words.slice(0),n=g.length,l=0;l<n;l++)g[l]=g[l].clone();return a}})})();
(function(){function a(){return q.create.apply(q,arguments)}var g=CryptoJS,m=g.lib.Hasher,e=g.x64,q=e.Word,r=e.WordArray,e=g.algo,y=[a(1116352408,3609767458),a(1899447441,602891725),a(3049323471,3964484399),a(3921009573,2173295548),a(961987163,4081628472),a(1508970993,3053834265),a(2453635748,2937671579),a(2870763221,3664609560),a(3624381080,2734883394),a(310598401,1164996542),a(607225278,1323610764),a(1426881987,3590304994),a(1925078388,4068182383),a(2162078206,991336113),a(2614888103,633803317),
    a(3248222580,3479774868),a(3835390401,2666613458),a(4022224774,944711139),a(264347078,2341262773),a(604807628,2007800933),a(770255983,1495990901),a(1249150122,1856431235),a(1555081692,3175218132),a(1996064986,2198950837),a(2554220882,3999719339),a(2821834349,766784016),a(2952996808,2566594879),a(3210313671,3203337956),a(3336571891,1034457026),a(3584528711,2466948901),a(113926993,3758326383),a(338241895,168717936),a(666307205,1188179964),a(773529912,1546045734),a(1294757372,1522805485),a(1396182291,
        2643833823),a(1695183700,2343527390),a(1986661051,1014477480),a(2177026350,1206759142),a(2456956037,344077627),a(2730485921,1290863460),a(2820302411,3158454273),a(3259730800,3505952657),a(3345764771,106217008),a(3516065817,3606008344),a(3600352804,1432725776),a(4094571909,1467031594),a(275423344,851169720),a(430227734,3100823752),a(506948616,1363258195),a(659060556,3750685593),a(883997877,3785050280),a(958139571,3318307427),a(1322822218,3812723403),a(1537002063,2003034995),a(1747873779,3602036899),
    a(1955562222,1575990012),a(2024104815,1125592928),a(2227730452,2716904306),a(2361852424,442776044),a(2428436474,593698344),a(2756734187,3733110249),a(3204031479,2999351573),a(3329325298,3815920427),a(3391569614,3928383900),a(3515267271,566280711),a(3940187606,3454069534),a(4118630271,4000239992),a(116418474,1914138554),a(174292421,2731055270),a(289380356,3203993006),a(460393269,320620315),a(685471733,587496836),a(852142971,1086792851),a(1017036298,365543100),a(1126000580,2618297676),a(1288033470,
        3409855158),a(1501505948,4234509866),a(1607167915,987167468),a(1816402316,1246189591)],n=[];(function(){for(var l=0;80>l;l++)n[l]=a()})();e=e.SHA512=m.extend({_doReset:function(){this._hash=r.create([a(1779033703,4089235720),a(3144134277,2227873595),a(1013904242,4271175723),a(2773480762,1595750129),a(1359893119,2917565137),a(2600822924,725511199),a(528734635,4215389547),a(1541459225,327033209)])},_doProcessBlock:function(a,e){for(var h=this._hash.words,g=h[0],k=h[1],b=h[2],d=h[3],c=h[4],i=h[5],m=
        h[6],h=h[7],q=g.high,r=g.low,W=k.high,K=k.low,X=b.high,L=b.low,Y=d.high,M=d.low,Z=c.high,N=c.low,$=i.high,O=i.low,aa=m.high,P=m.low,ba=h.high,Q=h.low,t=q,o=r,E=W,C=K,F=X,D=L,T=Y,G=M,u=Z,p=N,R=$,H=O,S=aa,I=P,U=ba,J=Q,v=0;80>v;v++){var z=n[v];if(16>v)var s=z.high=a[e+2*v]|0,f=z.low=a[e+2*v+1]|0;else{var s=n[v-15],f=s.high,w=s.low,s=(w<<31|f>>>1)^(w<<24|f>>>8)^f>>>7,w=(f<<31|w>>>1)^(f<<24|w>>>8)^(f<<25|w>>>7),B=n[v-2],f=B.high,j=B.low,B=(j<<13|f>>>19)^(f<<3|j>>>29)^f>>>6,j=(f<<13|j>>>19)^(j<<3|f>>>29)^
        (f<<26|j>>>6),f=n[v-7],V=f.high,A=n[v-16],x=A.high,A=A.low,f=w+f.low,s=s+V+(f>>>0<w>>>0?1:0),f=f+j,s=s+B+(f>>>0<j>>>0?1:0),f=f+A,s=s+x+(f>>>0<A>>>0?1:0);z.high=s;z.low=f}var V=u&R^~u&S,A=p&H^~p&I,z=t&E^t&F^E&F,fa=o&C^o&D^C&D,w=(o<<4|t>>>28)^(t<<30|o>>>2)^(t<<25|o>>>7),B=(t<<4|o>>>28)^(o<<30|t>>>2)^(o<<25|t>>>7),j=y[v],ga=j.high,ca=j.low,j=J+((u<<18|p>>>14)^(u<<14|p>>>18)^(p<<23|u>>>9)),x=U+((p<<18|u>>>14)^(p<<14|u>>>18)^(u<<23|p>>>9))+(j>>>0<J>>>0?1:0),j=j+A,x=x+V+(j>>>0<A>>>0?1:0),j=j+ca,x=x+ga+
        (j>>>0<ca>>>0?1:0),j=j+f,x=x+s+(j>>>0<f>>>0?1:0),f=B+fa,z=w+z+(f>>>0<B>>>0?1:0),U=S,J=I,S=R,I=H,R=u,H=p,p=G+j|0,u=T+x+(p>>>0<G>>>0?1:0)|0,T=F,G=D,F=E,D=C,E=t,C=o,o=j+f|0,t=x+z+(o>>>0<j>>>0?1:0)|0}r=g.low=r+o|0;g.high=q+t+(r>>>0<o>>>0?1:0)|0;K=k.low=K+C|0;k.high=W+E+(K>>>0<C>>>0?1:0)|0;L=b.low=L+D|0;b.high=X+F+(L>>>0<D>>>0?1:0)|0;M=d.low=M+G|0;d.high=Y+T+(M>>>0<G>>>0?1:0)|0;N=c.low=N+p|0;c.high=Z+u+(N>>>0<p>>>0?1:0)|0;O=i.low=O+H|0;i.high=$+R+(O>>>0<H>>>0?1:0)|0;P=m.low=P+I|0;m.high=aa+S+(P>>>0<I>>>
    0?1:0)|0;Q=h.low=Q+J|0;h.high=ba+U+(Q>>>0<J>>>0?1:0)|0},_doFinalize:function(){var a=this._data,e=a.words,h=8*this._nDataBytes,g=8*a.sigBytes;e[g>>>5]|=128<<24-g%32;e[(g+128>>>10<<5)+31]=h;a.sigBytes=4*e.length;this._process();this._hash=this._hash.toX32()},blockSize:32});g.SHA512=m._createHelper(e);g.HmacSHA512=m._createHmacHelper(e)})();


// console.log(md2('1111111111111'));
// console.log(CryptoJS.MD5('11111111').toString());
// console.log(CryptoJS.SHA256('11111111').toString());
console.log(CryptoJS.SHA384('11111111').toString());
console.log(CryptoJS.SHA512('11111111').toString());
console.log(CryptoJS.SHA512('11111111').toString());
