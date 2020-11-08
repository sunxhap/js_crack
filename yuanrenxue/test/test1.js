var n;


function o() {
    for (var r = [], t = 0; t < 36; t++) r[t] = "0123456789abcdef".substr(Math.floor(16 * Math.random()), 1);

    // return r[8] = r[13] = r[18] = r[23] = "-", n = r.join("")
    return r[8] = r[13] = r[18] = r[23] = "-", n = r.join("")
}

console.log(o());

code = 'PAJ8PQXH';

e = code;

console.log(o());

// ---------------------------

var i;
n = o(), e = code, a = 'vgtya3413s2131jtw=6b9beb76f8e94fca92c679db9a5bf6be', (i = a).slice(0, i.indexOf("="));

// var r = require("./crypt.js").CryptoApi, t = require("./util.js");
var h = [function (t) {
    return r.hash("md2", t)
}, function (t) {
    return r.hash("md5", t)
}, function (t) {
    var e = r.hash("sha1", t);
    e.length > 32 && (e = e.substr(0, 32));
    return e
}, function (t) {
    var e = r.hash("sha256", t);
    e.length > 32 && (e = e.substr(0, 32));
    return e
}, function (t) {
    var e = r.hash("sha384", t);
    e.length > 32 && (e = e.substr(0, 32));
    return e
}, function (t) {
    var e = r.hash("sha512", t);
    e.length > 32 && (e = e.substr(0, 32));
    return e
}];

console.log('h', h.length);

var c = function (r) {
    console.log('r', r);
    for (var t = 0, e = 0; e < r.length; e++) t += r.charCodeAt(e) << e % 16;
    return t
}(s = i.slice(i.indexOf("=") + 1, i.indexOf(";"))) % 6;

console.log('c', c);
// console.log('n', n);
// console.log('e', e);
// console.log('s', s);
//
// // u = (0, h[c])(n + e + s);
// sign + e + s
// u = (0, h[c])(n + e + s);
//
// // guid = o();
// sign = u;

    // r({guid: n, code: e, sign: u, setCookie: a})
// }))