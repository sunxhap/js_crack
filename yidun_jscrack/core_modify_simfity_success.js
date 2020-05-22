var windows = this;
var navigator = {};
// var r = {};
// var getWb = function(){console.log('getWb')};
// var getEa = {};
// var getCookie = function () {
//     console.log('getCookie')
// };

// ------------------------------


function S(e) {
    var t = 4294967295;
    if (null != e)
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            t = t >>> 8 ^ w[255 & (t ^ i)]
        }
    return d(4294967295 ^ t, 8)
}

function n(e, t) {
    function n(e, t) {
        return e.charCodeAt(Math.floor(t % e.length))
    }

    function i(e, t) {
        return t.split("").map(function (t, i) {
            return t.charCodeAt(0) ^ n(e, i)
        })
    }

    return t = i(e, t),
        _(t)
}

__toByte = function (e) {
    function t(t) {
        return e.apply(this, arguments)
    }

    return t.toString = function () {
        return e.toString()
    }
        ,
        t
}(function (e) {
    if (e < -128)
        return __toByte(128 - (-128 - e));
    if (e >= -128 && e <= 127)
        return e;
    if (e > 127)
        return __toByte(-129 + e - 127);
    throw new Error("1001")
});
var i = function (e, t) {
        return __toByte(e + t)
    }
    , r = function (e, t) {
        if (null == e)
            return null;
        if (null == t)
            return e;
        for (var n = [], r = t.length, o = 0, a = e.length; o < a; o++)
            n[o] = i(e[o], t[o % r]);
        return n
    }
    , o = function (e, t) {
        return e = __toByte(e),
            t = __toByte(t),
            __toByte(e ^ t)
    }
    , a = function (e, t) {
        if (null == e || null == t || e.length != t.length)
            return e;
        for (var n = [], i = e.length, r = 0, a = i; r < a; r++)
            n[r] = o(e[r], t[r]);
        return n
    }
    , l = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]
    , s = function (e) {
        // console.log('s, e', e);
        var t = [];
        return t.push(l[e >>> 4 & 15]),
            t.push(l[15 & e]),
            t.join("")
    }
    , u = function (e) {
        var t = e.length;
        if (null == e || t < 0)
            return new String("");
        for (var n = [], i = 0; i < t; i++)
            n.push(s(e[i]));
        return n.join("")
    }
    , f = function (e) {
        if (null == e || 0 == e.length)
            return [];
        for (var t = new String(e), n = [], i = t.length / 2, r = 0, o = 0; o < i; o++) {
            var a = parseInt(t.charAt(r++), 16) << 4
                , l = parseInt(t.charAt(r++), 16);
            n[o] = __toByte(a + l)
        }
        return n
    }
    , c = function (e) {
        if (null == e || void 0 == e)
            return e;
        for (var t = encodeURIComponent(e), n = [], i = t.length, r = 0; r < i; r++)
            if ("%" == t.charAt(r)) {
                if (!(r + 2 < i))
                    throw new Error("1009");
                n.push(f(t.charAt(++r) + "" + t.charAt(++r))[0])
            } else
                n.push(t.charCodeAt(r));
        return n
    }
    , j = function (e) {
        var t = [];
        return t[0] = e >>> 24 & 255,
            t[1] = e >>> 16 & 255,
            t[2] = e >>> 8 & 255,
            t[3] = 255 & e,
            t
    }
    , d = function (e) {
        var t = j(e);
        return u(t)
    }
    , h = function (e, t, n) {
        var i = [];
        if (null == e || 0 == e.length)
            return i;
        if (e.length < n)
            throw new Error("1003");
        for (var r = 0; r < n; r++)
            i[r] = e[t + r];
        return i
    }
    , p = function (e, t, n, i, r) {
        if (null == e || 0 == e.length)
            return n;
        if (null == n)
            throw new Error("1004");
        if (e.length < r)
            throw new Error("1003");
        for (var o = 0; o < r; o++)
            n[i + o] = e[t + o];
        return n
    }
    , y = function (e) {
        for (var t = [], n = 0; n < e; n++)
            t[n] = 0;
        return t
    }
    , v = function (e) {
        return null == e || void 0 == e || "" == e
    }
    , g = function () {
        return ["i", "/", "x", "1", "X", "g", "U", "0", "z", "7", "k", "8", "N", "+", "l", "C", "p", "O", "n", "P", "r", "v", "6", "\\", "q", "u", "2", "G", "j", "9", "H", "R", "c", "w", "T", "Y", "Z", "4", "b", "f", "S", "J", "B", "h", "a", "W", "s", "t", "A", "e", "o", "M", "I", "E", "Q", "5", "m", "D", "d", "V", "F", "L", "K", "y"]
    }
    , b = function () {
        return "3"
    }
    , m = function (e, t, n) {
        var i, r, o, a = g(), l = b(), s = [];
        if (1 == n)
            i = e[t],
                r = 0,
                o = 0,
                s.push(a[i >>> 2 & 63]),
                s.push(a[(i << 4 & 48) + (r >>> 4 & 15)]),
                s.push(l),
                s.push(l);
        else if (2 == n)
            i = e[t],
                r = e[t + 1],
                o = 0,
                s.push(a[i >>> 2 & 63]),
                s.push(a[(i << 4 & 48) + (r >>> 4 & 15)]),
                s.push(a[(r << 2 & 60) + (o >>> 6 & 3)]),
                s.push(l);
        else {
            if (3 != n)
                throw new Error("1010");
            i = e[t],
                r = e[t + 1],
                o = e[t + 2],
                s.push(a[i >>> 2 & 63]),
                s.push(a[(i << 4 & 48) + (r >>> 4 & 15)]),
                s.push(a[(r << 2 & 60) + (o >>> 6 & 3)]),
                s.push(a[63 & o])
        }
        return s.join("")
    }
    , _ = function (e) {
        if (null == e || void 0 == e)
            return null;
        if (0 == e.length)
            return "";
        var t = 3;
        try {
            for (var n = [], i = 0; i < e.length;) {
                if (!(i + t <= e.length)) {
                    n.push(m(e, i, e.length - i));
                    break
                }
                n.push(m(e, i, t)),
                    i += t
            }
            return n.join("")
        } catch (r) {
            throw new Error("1010")
        }
    }
    , T = function (e) {
        return _(c(e))
    }
    ,
    w = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918e3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117]
    , S = function (e) {
        var t = 4294967295;
        if (null != e)
            for (var n = 0; n < e.length; n++) {
                var i = e[n];
                t = t >>> 8 ^ w[255 & (t ^ i)]
            }
        return d(4294967295 ^ t, 8)
    }
    , E = function (e) {
        return S(null == e ? [] : c(e))
    }
    ,
    R = [120, 85, -95, -84, 122, 38, -16, -53, -11, 16, 55, 3, 125, -29, 32, -128, -94, 77, 15, 106, -88, -100, -34, 88, 78, 105, -104, -90, -70, 90, -119, -28, -19, -47, -111, 117, -105, -62, -35, 2, -14, -32, 114, 23, -21, 25, -7, -92, 96, -103, 126, 112, -113, -65, -109, -44, 47, 48, 86, 75, 62, -26, 72, -56, -27, 66, -42, 63, 14, 92, 59, -101, 19, -33, 12, -18, -126, -50, -67, 42, 7, -60, -81, -93, -86, 40, -69, -37, 98, -63, -59, 108, 46, -45, 93, 102, 65, -79, 73, -23, -46, 37, -114, -15, 44, -54, 99, -10, 60, -96, 76, 26, 61, -107, 18, -116, -55, -40, 57, -76, -82, 45, 0, -112, -77, 29, 43, -30, 109, -91, -83, 107, 101, 81, -52, -71, 84, 36, -41, 68, 39, -75, -122, -6, 11, -80, -17, -74, -73, 35, 49, -49, -127, 80, 103, 79, -25, 52, -43, 56, 41, -61, -24, 17, -118, 115, -38, 8, -78, 33, -85, -106, 58, -98, -108, 94, 116, -125, -51, -9, 71, 82, 87, -115, 9, 69, -123, 123, -117, 113, -22, -124, -87, 64, 13, 21, -89, -2, -99, -97, 1, -4, 34, 20, 83, 119, 30, -12, -110, -66, 118, -48, 6, -36, 104, -58, -102, 97, 5, -20, 31, -72, 70, -39, 67, -68, -57, 110, 89, 51, 10, -120, 28, 111, 127, 22, -3, 54, 53, -1, 100, 74, 50, 91, 27, -31, -5, -64, 124, -121, 24, -13, 95, 121, -8, 4]
    , C = 4
    , k = 4
    , O = 4
    , X = 4
    , $ = function (e) {
        var t = [];
        if (null == e || void 0 == e || 0 == e.length)
            return y(k);
        if (e.length >= k)
            return h(e, 0, k);
        for (var n = 0; n < k; n++)
            t[n] = e[n % e.length];
        return t
    }
    , I = function (e) {
        if (null == e || void 0 == e || 0 == e.length)
            return y(C);
        var t = e.length
            , n = 0;
        n = t % C <= C - O ? C - t % C - O : 2 * C - t % C - O;
        var i = [];
        p(e, 0, i, 0, t);
        for (var r = 0; r < n; r++)
            i[t + r] = 0;
        var o = j(t);
        return p(o, 0, i, t + n, O),
            i
    }
    , x = function (e) {
        if (null == e || e.length % C != 0)
            throw new Error("1005");
        for (var t = [], n = 0, i = e.length / C, r = 0; r < i; r++) {
            t[r] = [];
            for (var o = 0; o < C; o++)
                t[r][o] = e[n++]
        }
        return t
    }
    , A = function (e) {
        var t = e >>> 4 & 15
            , n = 15 & e
            , i = 16 * t + n;
        return R[i]
    }
    , N = function (e) {
        if (null == e)
            return null;
        for (var t = [], n = 0, i = e.length; n < i; n++)
            t[n] = A(e[n]);
        return t
    }
    , P = function () {
        for (var e = [], t = 0; t < X; t++) {
            var n = 256 * Math.random();
            n = Math.floor(n),
                e[t] = __toByte(n)
        }
        return e
    }
    , M = function (e, t) {
        if (null == e)
            return null;
        for (var n = __toByte(t), i = [], r = e.length, a = 0; a < r; a++)
            i.push(o(e[a], n));
        return i
    }
    , D = function (e, t) {
        if (null == e)
            return null;
        for (var n = __toByte(t), r = [], o = e.length, a = 0; a < o; a++)
            r.push(i(e[a], n));
        return r
    }
    , M = function (e, t) {
        if (null == e)
            return null;
        for (var n = __toByte(t), i = [], r = e.length, a = 0; a < r; a++)
            i.push(o(e[a], n));
        return i
    }
    , L = function (e) {
        var t = M(e, 56)
            , n = D(t, -40)
            , i = M(n, 103);
        return i
    }
    , Y = function (e, t) {
        null == e && (e = []);
        var n = P();            // 随机 数组 4位
        t = $(t),
            t = a(t, $(n)),
            t = $(t);
        var i = t
            , o = I(e)
            , l = x(o)
            , s = [];
        p(n, 0, s, 0, X);
        for (var u = l.length, f = 0; f < u; f++) {
            var c = L(l[f])
                , j = a(c, t)
                , d = r(j, i);
            j = a(d, i);
            var h = N(j);
            h = N(h),
                p(h, 0, s, f * C + X, C),
                i = h
        }
        return s
    }
    , B = function (e) {
        var t = "14731382d816714fC59E47De5dA0C871D3F";
        if (null == t || void 0 == t)
            throw new Error("1008");
        null != e && void 0 != e || (e = "");
        var n = e + E(e)
            , i = c(n)
            , r = c(t)
            , o = Y(i, r);
        return _(o)
    },
    t = {};
t.eypt = B,
    t.xor_encode = n,
    t.toByte = __toByte,
    t.str2Bytes = c,
    t.arrayCopy = h,
    t.arrayCopy2 = p,
    t.createEmptyArray = y,
    t.isEmptyString = v,
    t.base64Encode = T,
    t.getStringCRC32 = E,
    t.toByte = __toByte;


function c(e) {
    if (null == e || void 0 == e)
        return e;
    for (var t = encodeURIComponent(e), n = [], i = t.length, r = 0; r < i; r++)
        if ("%" == t.charAt(r)) {
            if (!(r + 2 < i))
                throw new Error("1009");
            n.push(f(t.charAt(++r) + "" + t.charAt(++r))[0])
        } else
            n.push(t.charCodeAt(r));
    return n
}


function E(e) {
    return S(null == e ? [] : c(e))
}

function get_u(e) {
    var t = "14731382d816714fC59E47De5dA0C871D3F";
    if (null == t || void 0 == t)
        throw new Error("1008");
    null != e && void 0 != e || (e = "");
    var n = e + E(e)
        , i = c(n)
        , r = c(t)
        , o = Y(i, r);          // 有随机数
    return _(o)
}

function get_l(e, t) {              // 把所有轨迹 按50个位置缩放 取值
    var n = e.length;
    if (n <= t)
        return e;
    // console.log('n', n);
    for (var i = [], r = 0, o = 0; o < n; o++) {
        if (o >= r * (n - 1) / (t - 1)) {
            // console.log('o', o);
            i.push(e[o]);
            r += 1;
        }
    }
    // o >= r * (n - 1) / (t - 1) && (i.push(e[o]), r += 1);
    // console.log(i);
    return i
}


function uuid_e_t(e, t) {
    var n = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("")
        , a = []
        , i = void 0;
    if (t = t || n.length,
        e)
        for (i = 0; i < e; i++)
            a[i] = n[0 | Math.random() * t];
    else {
        var r = void 0;
        for (a[8] = a[13] = a[18] = a[23] = "-",
                 a[14] = "4",
                 i = 0; i < 36; i++)
            a[i] || (r = 0 | 16 * Math.random(),
                a[i] = n[19 === i ? 3 & r | 8 : r])
    }
    return a.join("")
}

function f_n(e, t) {
    function n(e, t) {
        return e.charCodeAt(Math.floor(t % e.length))
    }

    function i(e, t) {
        return t.split("").map(function (t, i) {
            return t.charCodeAt(0) ^ n(e, i)
        })
    }

    return t = i(e, t),
        _(t)
}

function l_get_cb() {
    var e = uuid_e_t(32);
    return get_u(e)
}


function get_ext_data() {
    var m_m = get_u(get_l(n_m, h_m).join(":"));         //  get_u no
    // console.log('------------------------------');

    var p_m = get_u(t_m.join(":"));
    // console.log('------------------------------');
    var ext_m = get_u(f_n(token_m, 3 + "," + n_m.length));

    console.log('m_m:', m_m);
    console.log('p_m:', p_m);
    console.log('ext_m:', ext_m);

    var data = JSON.stringify({
        d: "",
        m: m_m,
        p: p_m,
        ext: ext_m
    });
    return data
}


//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}

// console.log('randomNum', randomNum(300, 600));


function get_n_m_slide_v3(n_m_slide) {
    var n_m_list = [];
    for (var i = 0; i < n_m_slide.length; i++) {
        var r = f_n(token_m, [Math.round(n_m_slide[i][0]), Math.round(n_m_slide[i][1]), n_m_slide[i][2]] + "");
        n_m_list.push(r);
    }
    return n_m_list
}



// 取 总轨迹（重要）， 取点坐标

// 轨迹

// 从打第一个点， 和第二个点开始往后取坐标点



var n_m = ["vcNkP4F/ncNXip33", "vcNkP4j7v/mUiAz3", "vcNkP4jkvwmUicj3", "vcNkP4jk\\emUipq3", "vcNkP4j8r/mUipX3", "vcNkP4jNv/mUiiN3", "vcNkP4jN\\wmU1Az3", "vcNkP4j+vOmU1cp3", "vcN8P4j+\\emg/Aq3", "vpp/P4j+\\wmg/ci0", "vppiP4j+remg/cXU", "vpp1P4j+v/mg/cmX", "vpj8P4jNr/mg/cF/", "vpjkP4jNv/mg/pqi", "vpjXP4j8rOmg/pqz", "vpj0P4j8vOmg/ppx", "vpj0P4jk\\emg/ppg", "vpjUP4jkremg/prU", "vpj/P4jkvwmg/pzx", "vpj/P4j7\\wmg/pNi", "vpj/P4j7remg/pN0", "vpjiP4j7vemg/pi0", "vpj1P4jz\\emg/pXx", "vpjxP4jzr/mg/pm/", "vpq8P4jzv/mg/pmz", "vpqkP4jzvemg/pFU", "vpqgP4F/nciX/AN3", "vpqgP4FCnciX/cp3", "vpqXP4FlnciX/pq3", "vpqXP4F+nciX/pm3", "vpqXP4FNnciX/ii3", "vpq0P4FNnciXiAz3", "vpq0P4FknciXicp3", "vpqUP4F7nciXipq3", "vpq/P4FznciXipm3", "vpq/P4minciXiiX3", "vpqiP4minciX1Az3", "vpqiP4mCnciX1cj3", "vpq1P4mCnci1/Aq3", "vpq1P4mlnci1/Am3", "vpq1P4m+nci1/pz3", "vpqxP4m+nci11Aq3", "\\pFH64zrviqlip33", "\\pFH64rrvij0ic33", "\\pmH64rrvijU/c33", "\\pmH64prvijg1A33", "\\pXH64prvijXip33", "\\piH64prvij//A33", "\\pNH64prvijiii33", "\\prH64FrvirCiA33", "\\pjH6EFrvirl/p33", "\\imHrEqlnciC/Aq3", "\\iNHrEjknciC/Am3", "\\ijHrEjlnciC/ci3", "rAFHrEj/nciC/pz3", "rAXHrEp7nciC/ip3", "rANHrEp8nciCiAq3", "rArHrEp8nciCiAm3", "rApHrEp8nciCici3", "rAjHrEp8nciCipr3", "rAjHrEpNnciC1Aq3", "rAqHrEpNncil/ii3", "rcmHrEp7nciliAz3", "rcNHrEjlncilicr3", "rczHrEj+ncilicF3", "rcpHrEjNncilipm3", "rcjHrEjknciliiX3", "rpmHrEjzncil1AN3", "rpNHrEqincil1cj3", "rprHrEqCncX0/Aq3", "rpqHrEq+ncX0/Am3", "riFHrEqNncX0/ci3", "riXHrEq8ncX0/pr3", "riXHrEqkncX0/ip3", "riiHrEqkncX0iAq3", "riNHrEqkncX0iAX3", "rizHrEq7ncXU/cp3", "rirH6EFrvpNg1A33", "ripH6EmrvpN1ip33", "rijH6EmrvpNx/i33", "rijH6EXrvpN//p33", "riqH6EXrvpN/ii33", "riqH6EirvpNiip33", "riqH6ENrvpNl/p33"];
// 固定
var h_m = 50;
// token
var token_m = "e5a054973aa144f282bbd5999d8e3ead";
// 3个点 加密值
this.beginTime = 0;

function get_point(t, n, time_deal) {
    var coord = f_n(token_m, [Math.round(t), Math.round(n), time_deal] + "");
    return coord
}

// 320 240
// var p1 = {'left': 252.5, 'top': 115};
// var p2 = {'left': 185.5, 'top': 71};
// var p3 = {'left': 42.5, 'top': 115};

var p1 = [108.83331298828125, 63];
var p2 = [166.1666259765625, 77];
var p3 = [261.5, 74.3333740234375];

var time_deal1 = 0;          // 时间减， 最初始时间    // l.now() - this.beginTime
console.log('time_deal', time_deal1);
var coord1 = get_point(p1[0], p1[1], time_deal1);

time_deal2 = 2774;      //  randomNum(1500, 1900);
console.log('time_deal2', time_deal2);
var coord2 = get_point(p2[0], p2[1], time_deal2);

time_deal3 = 4470;      // randomNum(3000, 3600);
console.log('time_deal3', time_deal3);
var coord3 = get_point(p3[0], p3[1], time_deal3);


// clientX 鼠标相对屏幕左边 , clientY 鼠标相对上方 ----点击位置距离当前body可视区域的x，y坐标,  l_now_deal,
// 整体 坐标,  注意图片  鼠标滑入滑出的坐标轨迹
// 轨迹点  大概 6-9 毫秒一个，  从点击第一个点开始计时 ，
// 注意点击第二个点 和之前的轨迹时间跨度 600 （400-700）左右， 前后点都如此，
// 第二个点和第三个点 在轨迹内, 第一个点坐标不在内， 作为开始

// 所有轨迹点 按比例压缩到 50个点

function compress_coordinate(n, t){     // 压缩
    var n = 67;
    var t = 44;
    for (var i = [], r = 0, o = 0; o < n; o++) {
        if (o >= r * (n - 1) / (t - 1)) {
            // console.log('o', o);
            i.push(o);
            r += 1;
        }
    }
    return i;
}


function get_slide_xy(p1, p2, start, end){
    var x1_diff = Math.abs(p2[0] - p1[0]);      // x坐标 一两个点移动
    var y1_diff = Math.abs(p2[1] - p1[1]);      // y坐标 看情况 一两个点移动 不动
    var time_diff = Math.ceil((end - start)/8);              // 除，可随机
    console.log(x1_diff, y1_diff, time_diff);
    var xy_list = [];
    for(var index=0; index < time_diff; index++){
        // if
        var x = p2[0] + 1
    }

    return
}

function get_n_m_slide(p1, p2, p3, time_deal2, time_deal3) {
    var step1 = randomNum(400, 500);

    var step2 = randomNum(400, 500);

    var step1_xy = get_slide_xy(p1, p2, step1, time_deal2 - step2);

    return
}

// var n_m_slide = get_n_m_slide(p1, p2, p3, time_deal2, time_deal3);

// var n_m_slide = [[68.5, 116, 4336], [143.5, 154, 249120], [141.5, 141, 249128], [137.5, 125, 249135], [134.5, 107, 249143], [131.5, 91, 249151], [126.5, 72, 249160], [122.5, 59, 249168], [119.5, 45, 249176], [116.5, 32, 249183], [114.5, 18, 249192], [114.5, 5, 249200], [204.5, 40, 507], [199.5, 42, 514], [198.5, 43, 520], [196.5, 44, 531], [195.5, 44, 539], [195.5, 45, 547], [195.5, 46, 577], [194.5, 46, 609], [194.5, 47, 624], [193.5, 48, 649], [192.5, 49, 665], [192.5, 50, 672], [191.5, 50, 689], [191.5, 51, 696], [190.5, 51, 721], [190.5, 52, 731], [188.5, 53, 745], [188.5, 54, 753], [187.5, 54, 761], [187.5, 55, 867], [186.5, 55, 890], [186.5, 56, 915], [185.5, 56, 924], [185.5, 57, 929], [184.5, 58, 938], [183.5, 58, 952], [183.5, 59, 961], [182.5, 59, 970], [181.5, 60, 985], [181.5, 61, 1009], [181.5, 62, 1017], [180.5, 62, 1033], [180.5, 63, 1048], [180.5, 64, 1090], [180.5, 65, 1193], [180.5, 66, 1298], [178.5, 66, 2353], [171.5, 67, 2361], [165.5, 68, 2369], [159.5, 69, 2376], [155.5, 72, 2385], [149.5, 75, 2392], [144.5, 78, 2401], [141.5, 80, 2408], [139.5, 82, 2416], [139.5, 83, 2433], [138.5, 83, 2441], [138.5, 84, 2473], [138.5, 85, 2489], [138.5, 86, 2497], [137.5, 87, 2505], [137.5, 89, 2520], [137.5, 90, 2537], [137.5, 91, 2545], [137.5, 92, 2552], [137.5, 93, 2561], [138.5, 94, 2568], [138.5, 95, 2577], [138.5, 96, 2584], [139.5, 96, 2593], [139.5, 97, 2600], [140.5, 98, 2625], [141.5, 98, 2721], [141.5, 99, 2728], [135.5, 94, 3833], [129.5, 87, 3841], [125.5, 82, 3849], [122.5, 81, 3856], [121.5, 80, 3865], [120.5, 79, 3872], [117.5, 77, 3880], [116.5, 76, 3888], [115.5, 75, 3897], [115.5, 74, 3904], [114.5, 74, 3913], [113.5, 74, 3948], [113.5, 73, 3961], [112.5, 72, 3968], [111.5, 70, 3977], [109.5, 67, 3985], [107.5, 66, 3992], [105.5, 64, 4000], [104.5, 62, 4009], [103.5, 61, 4025], [102.5, 61, 4041], [102.5, 60, 4049], [101.5, 59, 4072], [101.5, 58, 4090], [99.5, 58, 4097], [99.5, 57, 4105], [98.5, 56, 4113], [97.5, 55, 4122], [96.5, 55, 4128], [95.5, 54, 4138], [95.5, 53, 4169], [94.5, 53, 4185], [93.5, 53, 4217], [93.5, 52, 4224], [92.5, 52, 4241], [91.5, 51, 4256], [90.5, 51, 4273], [89.5, 50, 4288], [88.5, 50, 4313]];
var n_m_slide = [[167, 136, 30], [170, 150, 60], [169, 144, 90], [161, 149, 120], [162, 139, 150], [163, 146, 180], [167, 134, 210], [166, 137, 240], [169, 140, 270], [161, 147, 300], [169, 149, 330], [166, 141, 360], [168, 144, 390], [161, 147, 420], [170, 134, 450], [163, 144, 480], [168, 134, 510], [164, 142, 540], [161, 135, 570], [169, 138, 600], [163, 137, 630], [170, 135, 660], [168, 142, 690], [161, 148, 720], [170, 146, 750], [167, 137, 780], [167, 145, 810], [165, 135, 840], [169, 144, 870], [170, 143, 900], [161, 140, 930], [169, 141, 960], [162, 149, 990], [162, 141, 1020], [166, 140, 1050], [166, 146, 1080], [163, 136, 1110], [168, 145, 1140], [169, 138, 1170], [165, 149, 1200], [161, 134, 1230], [164, 150, 1260], [162, 147, 1290], [166, 142, 1320], [162, 137, 1350], [168, 135, 1380], [164, 139, 1410], [167, 148, 1440], [165, 149, 1470], [170.0085, 134.6734, 1500], [171, 135, 1530], [170, 138, 1560], [171, 136, 1590], [170, 134, 1620], [174, 135, 1650], [174, 134, 1680], [171, 134, 1710], [171, 135, 1740], [172, 138, 1770], [173, 136, 1800], [170, 138, 1830], [171, 135, 1860], [172, 138, 1890], [172, 138, 1920], [174, 134, 1950], [173, 134, 1980], [174, 137, 2010], [174, 136, 2040], [171, 137, 2070], [174, 135, 2100], [173, 136, 2130], [173, 134, 2160], [173, 139, 2190], [173, 134, 2220], [174, 138, 2250], [174, 137, 2280], [171, 139, 2310], [170, 136, 2340], [174, 139, 2370], [174, 136, 2400], [170, 135, 2430], [171, 135, 2460], [173, 136, 2490], [173, 138, 2520], [173, 138, 2550], [170, 139, 2580], [172, 138, 2610], [170, 139, 2640], [170, 137, 2670], [170, 139, 2700], [171, 137, 2730], [173, 138, 2760], [172, 135, 2790], [172, 138, 2820], [172, 139, 2850], [173, 139, 2880], [172, 137, 2910], [171, 134, 2940], [170, 138, 2970], [174.6754, 139.34029999999998, 3000]];
console.log(n_m_slide.length);

// console.log(f_n(token_m, [Math.round(1069 - 947.5), Math.round(668 - 597), 88] + ""));

n_m = get_n_m_slide_v3(n_m_slide);
n_m = [];                                   //移动端测试
console.log(JSON.stringify(n_m));

// var t_m = [coord1, coord2, coord3];
var t_m = ["vAv60ipg1eaU","\\pe+/Ajq1pjXrc33","vAuO0iNxgpzir4j3"];
console.log(t_m);

data = get_ext_data();
console.log('data', data);

param_l_get_cb = l_get_cb();
console.log('cb', param_l_get_cb);


// this.onVerifyCaptcha({
//     data: JSON.stringify({
//         d: "",
//         m: u(l.sample(n, h).join(":")),
//         p: u(t.join(":")),
//         ext: u(f(this.$store.state.token, this.clickCounts + "," + n.length))
//     })

// var data_json = JSON.stringify({
//     d: "",
//     m: "mTUpHI5xJXmf6CtkK9dwiY/rABl56o8kZgLEz+s56UVXojBhqOiucpkvO\\wtLMuZdpn0A9gIsUO4ZjB6Q8vxG+v5+sREeDYsnf1wcn+rUbQh6MKdHMYpnCFezb8Fp0vy0RLq1CrKqy/jumJZY/MXrqtb+bn+TmRWztnm7zKpcDudSp9akRjQocP0b7BNjNJa1gn2WPDG9I1TZDlW9ESXPrlSYek+ydb1MjbXSeSpUWPWRjPeLfjQugVGwF0HWGwZYN5k4SseSUe+M6RkeEHPbZEA+epfvgsTKvsxE0jmSRMyNvTJBIxteS5y/cBDoOhZIO1kV\\FseNGviMGrbDZnVn8iXop+MVQ6P1XiGzeLuIit7Dl2Px4YgxNuUZkhkHXMmWvAS59AzQnNfnJBvf9ccut5C2NTdLBH/MtXrL/6+WnvvzRCU6smcvpVwHb1/7KfPPooqcjNnSO+Ql0W7dUPCCfpr\\zADpQWWme\\zZeoZic9N/B\\M2uhJwBdiuDXZIvPyvcQECtiwAGO98YrnJXomSlpc/g+7VdaeFslGZI+mPNfq/hcKRQ8jpL5HBICYxNTb5zBRDaAq0D+oPQ\\Uw12fW\\Jeg+tF1GrKDx0/tehs+PgSQ8TGLZhX6KFi2MsrpEsAc5T\\T+cwgHhyqtrHDAyyCyV/8oN\\myJh8HJ7107wgJjX/BHvctXr5C8+Wp8PqjUPvHmEN9FelkquGiOEpbqhC\\hQUDkjzU/zEnJ4kWGQxgVllbYyMg\\hkWiZlxyyqSZvYdJqtWfVJVRGmLP59HJXQvywZTVqGwZQYb14S+oRTgEl1KS4EETwXI7sgZfq0SdY1YlCvDtNCRyYieaof8vm8H52oOXutPfblW1fYaV14+sHMIyYM1PfZQpXVt0ddRjb7AQXytzpwt2MyKaEpBmlbCsHTj7AaVkbHvxz+oN9/\\Qj4JxLEBnaCMnqa+VMrlHV\\ilrLE5CP+4QVxH8dgmsKVpe+oKxrzP/xdrCul5UbE+kjJR7e4\\9ku96\\hex9JlWo4hcrCuKI8F\\jBAy+zuGR\\+Q4+kQNPjGPZTXTLOs+n+DlfWHJXyrGdlSUprYBPfO7YdVSMqmOXNS\\OIYlMlHtFeceyy4RO1vZ/2Cm6CA+K+CTkVE7/kSbe5NxPtWIgCLVRoXc33",
//     p: "JM6DWhlfdaCA6bpc1UMzkld92w7cIkEsqENwYfkc7J8MuTU9jauD\\Qcnu/XMzMvankHZhaYPOSgT1w4Kta2auc33",
//     ext: "hmUxiW7rG7hblyaRCESaTzux75j2nm4O"
// });
//
// console.log(data_json);

