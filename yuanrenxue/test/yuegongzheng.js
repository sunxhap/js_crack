var n;


function guid_o() {
    for (var r = [], t = 0; t < 36; t++) r[t] = "0123456789abcdef".substr(Math.floor(16 * Math.random()), 1);

    // return r[8] = r[13] = r[18] = r[23] = "-", n = r.join("")
    console.log('r', r);
    return r[8] = r[13] = r[18] = r[23] = "-", n = r.join("")
}

// console.log(guid_o());

function get_sign_index() {
    code = '{code}';
    cookie = '{cookie}';

    var i;

    n = guid_o(), e = code, a = cookie, (i = a).slice(0, i.indexOf("="));

    var c = function (r) {
        for (var t = 0, e = 0; e < r.length; e++) t += r.charCodeAt(e) << e % 16;
        return t
    }(s = i.slice(i.indexOf("=") + 1, i.indexOf(";"))) % 6;

    return n + "||" + c + "||" + e + "||" + s
}


function get_sign_index_v2(code, cookie) {

    var i;
    n = guid_o(),
    // n = 'd1149fdd-de54-dc77-aae9-852be4a089cc',
        e = code, a = cookie, (i = a).slice(0, i.indexOf("="));

    console.log('a', a);
    console.log('i', i);

    var c = function (r) {
        for (var t = 0, e = 0; e < r.length; e++) t += r.charCodeAt(e) << e % 16;
        return t
    }(s = i.slice(i.indexOf("=") + 1, i.indexOf(";"))) % 6;

    return n + "||" + c + "||" + e + "||" + s
}

// console.log(get_sign_index_v2('R4ZI9VA3', 'vgtya3413s2131jtw=3e2794026bfa41c9b2ffc1ff8ce92e5b; Path=/'));

// 2fc8bed0-accb-ae67-efa7-c0a3f4faaccf||5||R4ZI9VA3||3e2794026bfa41c9b2ffc1ff8ce92e5b


console.log(guid_o());
console.log(guid_o());

