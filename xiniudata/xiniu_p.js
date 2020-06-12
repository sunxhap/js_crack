let function_md5 = require('./util_md5');

var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    , _p = "W5D80NFZHAYB8EUI2T649RT2MNRMVE2O";


function e1(e) {
    if (null == e)
        return null;
    for (var t, n, r, o, i, a, u, c = "", s = 0; s < e.length;)
        o = (t = e.charCodeAt(s++)) >> 2,
            i = (3 & t) << 4 | (n = e.charCodeAt(s++)) >> 4,
            a = (15 & n) << 2 | (r = e.charCodeAt(s++)) >> 6,
            u = 63 & r,
            isNaN(n) ? a = u = 64 : isNaN(r) && (u = 64),
            c = c + _keyStr.charAt(o) + _keyStr.charAt(i) + _keyStr.charAt(a) + _keyStr.charAt(u);
    return c
}

function _u_e(e) {
    if (null == e)
        return null;
    e = e.replace(/\r\n/g, "\n");
    for (var t = "", n = 0; n < e.length; n++) {
        var r = e.charCodeAt(n);
        r < 128 ? t += String.fromCharCode(r) : r > 127 && r < 2048 ? (t += String.fromCharCode(r >> 6 | 192),
            t += String.fromCharCode(63 & r | 128)) : (t += String.fromCharCode(r >> 12 | 224),
            t += String.fromCharCode(r >> 6 & 63 | 128),
            t += String.fromCharCode(63 & r | 128))
    }
    return t
}

function _u_d(e) {
    for (var t = "", n = 0, r = 0, o = 0, i = 0; n < e.length;)
        (r = e.charCodeAt(n)) < 128 ? (t += String.fromCharCode(r),
            n++) : r > 191 && r < 224 ? (o = e.charCodeAt(n + 1),
            t += String.fromCharCode((31 & r) << 6 | 63 & o),
            n += 2) : (o = e.charCodeAt(n + 1),
            i = e.charCodeAt(n + 2),
            t += String.fromCharCode((15 & r) << 12 | (63 & o) << 6 | 63 & i),
            n += 3);
    return t
}

function e2(e) {
    if (null == (e = _u_e(e)))
        return null;
    for (var t = "", n = 0; n < e.length; n++) {
        var r = _p.charCodeAt(n % _p.length);
        t += String.fromCharCode(e.charCodeAt(n) ^ r)
    }
    return t
}

function sig(e) {
    return function_md5.hex_md5(e + _p).toUpperCase()
}

function _u_d(e) {
    for (var t = "", n = 0, r = 0, o = 0, i = 0; n < e.length;)
        (r = e.charCodeAt(n)) < 128 ? (t += String.fromCharCode(r),
            n++) : r > 191 && r < 224 ? (o = e.charCodeAt(n + 1),
            t += String.fromCharCode((31 & r) << 6 | 63 & o),
            n += 2) : (o = e.charCodeAt(n + 1),
            i = e.charCodeAt(n + 2),
            t += String.fromCharCode((15 & r) << 12 | (63 & o) << 6 | 63 & i),
            n += 3);
    return t
}

function d1(e) {
    var t, n, r, o, i, a, u = "", c = 0;
    for (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); c < e.length;)
        t = _keyStr.indexOf(e.charAt(c++)) << 2 | (o = _keyStr.indexOf(e.charAt(c++))) >> 4,
            n = (15 & o) << 4 | (i = _keyStr.indexOf(e.charAt(c++))) >> 2,
            r = (3 & i) << 6 | (a = _keyStr.indexOf(e.charAt(c++))),
            u += String.fromCharCode(t),
        64 != i && (u += String.fromCharCode(n)),
        64 != a && (u += String.fromCharCode(r));
    return u
}

function d2(e) {
    for (var t = "", n = 0; n < e.length; n++) {
        var r = _p.charCodeAt(n % _p.length);
        t += String.fromCharCode(e.charCodeAt(n) ^ r)
    }
    return t = _u_d(t)
}

var parse_data = function (all_data_d) {
    var d = d1(all_data_d)
        , m = d2(d)
        , v = JSON.parse(m);
    return v
}

var get_payload = function (payload) {
    var payload = e1(e2(JSON.stringify(payload)));
    var _sig = sig(payload);
    var _data = {};
    _data.payload = payload;
    _data.sig = _sig;
    return _data


//     var f = Object(u.c)(Object(u.d)(JSON.stringify(l.payload)))
//         , p = Object(u.e)(f);
}


var payload = {"input": "天眼查", "type": "company", "method": 0, "sort": 0, "start": 0, "limit": 10};
var params = get_payload(payload);
console.log(params);

// var data_d = "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";
// var data = parse_data(data_d);
// console.log(data);