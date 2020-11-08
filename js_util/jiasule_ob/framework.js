(function () {
    function randomString(len) {
        len = len || 32;
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        var maxPos = $chars.length;
        var pwd = '';
        for (i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }


    var window = new Object();
    window.parseFloat = parseFloat;
    window.parseInt = parseInt;
    window.isNaN = isNaN;
    window.decodeURI = decodeURI;
    window.decodeURIComponent = decodeURIComponent;
    window.encodeURI = encodeURI;
    window.encodeURIComponent = encodeURIComponent;
    window.escape = escape;
    window.unescape = unescape;
    window.eval = eval;
    window.Date = Date;
    window.outerWidth = 1024;
    window.outerHeight = 923;

    document = new Object();
    document.createElement = function (name) {
        return "<" + name + ">" + "</" + name + ">"
    };
    document.createElement.toString = function () {
        return "function createElement() { [native code] }"
    };
    window.document = document;

    var navigator = new Object();
    navigator.appCodeName = "Mozilla";
    navigator.appName = "Netscape";
    navigator.appVersion = "5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36";
    navigator.cookieEnabled = true;
    navigator.connection = {
        'connection': null,
        'effectiveType': "4g",
        'rtt': 50,
        'downlink': 10,
        'saveData': false
    };
    navigator.deviceMemory = 8;
    navigator.hardwareConcurrency;
    navigator.doNotTrack = null;
    navigator.language = "zh-CN";
    navigator.languages = ["zh-CN", "zh"];
    navigator.onLine = true;
    navigator.platform = 'Win32';
    navigator.product = 'Gecko';
    navigator.productSub = '20030107';
    navigator.userAgent = "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36";
    navigator.vendor = "Google Inc.";
    navigator.vendorSub = "";

    plugins = [
        {
            'description': "APlayer III ActiveX hosting plugin for Firefox",
            'filename': "npaplayer.dll",
            'length': 1,
            'name': "APlayer ActiveX hosting plugin"
        },
        {
            'description': "ASUS Update",
            'filename': "npAsusUpdate3.dll",
            'length': 1,
            'name': "ASUS Update"
        }
    ];

    any_plugins = true;

    if (any_plugins) {
        for (var i = 0; i < 10; i++) {
            var p = {
                'description': randomString(parseInt(Math.random() * 20)),
                'filename': randomString(parseInt(Math.random() * 20)) + ".dll",
                'length': 1,
                'name': randomString(parseInt(Math.random() * 10))
            };

            plugins.push(p)
        }
    }

    navigator.plugins = plugins;

    window.navigator = navigator;

    location = new Object();
    location.port = "";
    location.protocol = "http:";

    window.location = location;

    history = new Object();
    history.length = 5;
    history.scrollRestoration = "auto";
    history.state = null;
    window.history = history;

    screen = new Object();
    screen.availHeight = 1040;
    screen.availLeft = 2560;
    screen.availTop = 0;
    screen.availWidth = 1920;
    screen.colorDepth = 24;
    screen.height = 1080;
    screen.pixelDepth = 24;
    screen.width = 1920;
    screen.orientation = {
        angle: 0,
        onchange: null,
        type: "landscape-primary"
    };

    window.getComputedStyle = function () {
        debugger
    };

    window.screen = screen;

    window.parent = window;

    window.top = window;

    window.self = window;
    window.window = window;
    {hash}
    const go = function (_0x2a0eca) {
        var _0x3bbc5e = {};

        _0x3bbc5e["JhnD" + "y"] = function (_0x1855ec, _0x5f4822) {
            return _0x1855ec >> _0x5f4822;
        };

        _0x3bbc5e["mLDV" + "O"] = function (_0x1e9847, _0x127be8) {
            return _0x1e9847 + _0x127be8;
        };

        _0x3bbc5e["RrCF" + "X"] = function (_0x4723d3, _0x1a6468) {
            return _0x4723d3 < _0x1a6468;
        };

        _0x3bbc5e["KXdP" + "m"] = function (_0xa5757c, _0x411c75, _0x2ae4d9) {
            return _0xa5757c(_0x411c75, _0x2ae4d9);
        };

        _0x3bbc5e["SBWc" + "V"] = function (_0x39d6e7, _0x56aebf) {
            return _0x39d6e7 - _0x56aebf;
        };

        _0x3bbc5e["SEwu" + "z"] = "Phan" + "tom";

        _0x3bbc5e["OYpu" + "j"] = function (_0x13f33f, _0x28a395) {
            return _0x13f33f > _0x28a395;
        };

        _0x3bbc5e["mPfv" + "W"] = "rHbR" + "s";

        _0x3bbc5e["eySv" + "c"] = function (_0x3aaabc, _0x21accc) {
            return _0x3aaabc > _0x21accc;
        };

        _0x3bbc5e["JCgD" + "w"] = "\u6B63\u5728\u9A8C\u8BC1" + "\u60A8\u7684\u8BF7\u6C42" + "\uFF0C\u8BF7\u7A0D\u7B49" + "\u3002";

        _0x3bbc5e["OUpF" + "h"] = function (_0x5f3f78, _0x57af92) {
            return _0x5f3f78 == _0x57af92;
        };

        _0x3bbc5e["WJCL" + "U"] = function (_0x54aeb0, _0x489da6) {
            return _0x54aeb0(_0x489da6);
        };

        _0x3bbc5e["xOHR" + "D"] = function (_0x4b8219) {
            return _0x4b8219();
        };

        _0x3bbc5e["ckxB" + "C"] = function (_0x2e1407, _0x595569) {
            return _0x2e1407 + _0x595569;
        };

        _0x3bbc5e["aOMy" + "o"] = function (_0x511a68, _0xff03d2) {
            return _0x511a68 + _0xff03d2;
        };

        var _0x11d033 = _0x3bbc5e;

        const _0x219d49 = function () {
            var _0x47c1b2 = {};
            _0x47c1b2["Suwg" + "l"] = "1|7|" + "8|5|" + "3|2|" + "0|6|" + "4";

            _0x47c1b2["ioWH" + "q"] = function (_0x5798cf, _0x5e7b0e) {
                return _0x5798cf << _0x5e7b0e;
            };

            _0x47c1b2["TbQp" + "s"] = function (_0x4a72c1, _0x3707c8) {
                return _0x11d033["JhnD" + "y"](_0x4a72c1, _0x3707c8);
            };

            _0x47c1b2["ICwO" + "p"] = function (_0x1e9420, _0x3f26d3) {
                return _0x11d033["mLDV" + "O"](_0x1e9420, _0x3f26d3);
            };

            _0x47c1b2["VPnF" + "a"] = function (_0x4240f8, _0x445bc8) {
                return _0x11d033["RrCF" + "X"](_0x4240f8, _0x445bc8);
            };

            _0x47c1b2["CfOF" + "d"] = function (_0x42389e, _0x1a189e, _0x4f9a86) {
                return _0x11d033["KXdP" + "m"](_0x42389e, _0x1a189e, _0x4f9a86);
            };

            _0x47c1b2["htqh" + "s"] = function (_0x5c873e, _0x5153c7, _0x3ecb3e) {
                return _0x5c873e(_0x5153c7, _0x3ecb3e);
            };

            _0x47c1b2["xpDb" + "x"] = function (_0x3da4ed, _0x1f611d) {
                return _0x11d033["SBWc" + "V"](_0x3da4ed, _0x1f611d);
            };

            _0x47c1b2["aIGC" + "I"] = function (_0x1e4e5a, _0x2116f8, _0x1a2cbe) {
                return _0x1e4e5a(_0x2116f8, _0x1a2cbe);
            };

            _0x47c1b2["AEYl" + "L"] = function (_0xaf166a, _0xe3cf6e, _0x23a1f2) {
                return _0xaf166a(_0xe3cf6e, _0x23a1f2);
            };

            _0x47c1b2["iTYP" + "H"] = function (_0x4daa25, _0x1db47, _0x441214, _0xd099b9) {
                return _0x4daa25(_0x1db47, _0x441214, _0xd099b9);
            };

            _0x47c1b2["vPMz" + "p"] = function (_0x31bfcd, _0x134fab, _0x285c62) {
                return _0x31bfcd(_0x134fab, _0x285c62);
            };

            var _0x853132 = _0x47c1b2;
            const _0x154862 = window["navi" + "gato" + "r"]["user" + "Agen" + "t"];
            const _0x387d8e = [_0x11d033["SEwu" + "z"]];

            _0x387d8e["forE" + "ach"](function (_0x536176) {
                if (_0x154862["inde" + "xOf"](_0x536176) != 0x0) {
                    return !![];
                }
            });

            if (window["call" + "Phan" + "tom"] || window["_pha" + "ntom"] || !(_0x11d033["OYpu" + "j"](window["oute" + "rWid" + "th"], 0x0) && window["oute" + "rHei" + "ght"] > 0x0) || window["Head" + "less"] || window["navi" + "gato" + "r"]["webd" + "rive" + "r"] || window["navi" + "gato" + "r"]["__dr" + "iver" + "_eva" + "luat" + "e"] || window["navi" + "gato" + "r"]["__we" + "bdri" + "ver_" + "eval" + "uate"]) {
                if ("wMAC" + "S" === _0x11d033["mPfv" + "W"]) {
                    var _0x406aee = _0x853132["Suwg" + "l"]["spli" + "t"]("|");

                    var _0x260fec = 0x0;

                    while (!![]) {
                        switch (_0x406aee[_0x260fec++]) {
                            case "0":
                                m[_0x853132["ioWH" + "q"](_0x853132["TbQp" + "s"](_0x853132["ICwO" + "p"](l, 0x40), 0x9), 0x4) + 0xf] = l;
                                continue;

                            case "1":
                                var _0x4239fe = new Array(0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0xfc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x6ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2);

                                continue;

                            case "2":
                                m[l >> 0x5] |= _0x853132["ioWH" + "q"](0x80, 0x18 - l % 0x20);
                                continue;

                            case "3":
                                var _0x36f04d, _0x4c9a99;

                                continue;

                            case "4":
                                return _0x9230f8;

                            case "5":
                                var _0x4b6eaa, _0xbf500e, _0x517de7, _0x1a8475, _0x5a5281, _0x1acb63, _0x4c2a35, _0x1be70b,
                                    _0x4fe195, _0x18e658;

                                continue;

                            case "6":
                                for (var _0x4fe195 = 0x0; _0x853132["VPnF" + "a"](_0x4fe195, m["leng" + "th"]); _0x4fe195 += 0x10) {
                                    var _0x2d390d = ("5|9|" + "10|1" + "3|16" + "|3|6" + "|15|" + "8|12" + "|4|1" + "|0|1" + "4|7|" + "11|2")["spli" + "t"]("|");

                                    var _0x5e46dc = 0x0;

                                    while (!![]) {
                                        switch (_0x2d390d[_0x5e46dc++]) {
                                            case "0":
                                                _0x9230f8[0x3] = safe_add(_0x1a8475, _0x9230f8[0x3]);
                                                continue;

                                            case "1":
                                                _0x9230f8[0x2] = _0x853132["CfOF" + "d"](safe_add, _0x517de7, _0x9230f8[0x2]);
                                                continue;

                                            case "2":
                                                _0x9230f8[0x7] = safe_add(_0x1be70b, _0x9230f8[0x7]);
                                                continue;

                                            case "3":
                                                _0x1acb63 = _0x9230f8[0x5];
                                                continue;

                                            case "4":
                                                _0x9230f8[0x1] = safe_add(_0xbf500e, _0x9230f8[0x1]);
                                                continue;

                                            case "5":
                                                _0x4b6eaa = _0x9230f8[0x0];
                                                continue;

                                            case "6":
                                                _0x4c2a35 = _0x9230f8[0x6];
                                                continue;

                                            case "7":
                                                _0x9230f8[0x5] = safe_add(_0x1acb63, _0x9230f8[0x5]);
                                                continue;

                                            case "8":
                                                for (var _0x18e658 = 0x0; _0x18e658 < 0x40; _0x18e658++) {
                                                    if (_0x853132["VPnF" + "a"](_0x18e658, 0x10)) _0x28f486[_0x18e658] = m[_0x853132["ICwO" + "p"](_0x18e658, _0x4fe195)]; else _0x28f486[_0x18e658] = _0x853132["CfOF" + "d"](safe_add, safe_add(_0x853132["htqh" + "s"](safe_add, Gamma1256(_0x28f486[_0x853132["xpDb" + "x"](_0x18e658, 0x2)]), _0x28f486[_0x853132["xpDb" + "x"](_0x18e658, 0x7)]), Gamma0256(_0x28f486[_0x18e658 - 0xf])), _0x28f486[_0x18e658 - 0x10]);
                                                    _0x36f04d = _0x853132["aIGC" + "I"](safe_add, _0x853132["AEYl" + "L"](safe_add, safe_add(safe_add(_0x1be70b, Sigma1256(_0x5a5281)), _0x853132["iTYP" + "H"](Ch, _0x5a5281, _0x1acb63, _0x4c2a35)), _0x4239fe[_0x18e658]), _0x28f486[_0x18e658]);
                                                    _0x4c9a99 = _0x853132["AEYl" + "L"](safe_add, Sigma0256(_0x4b6eaa), _0x853132["iTYP" + "H"](Maj, _0x4b6eaa, _0xbf500e, _0x517de7));
                                                    _0x1be70b = _0x4c2a35;
                                                    _0x4c2a35 = _0x1acb63;
                                                    _0x1acb63 = _0x5a5281;
                                                    _0x5a5281 = safe_add(_0x1a8475, _0x36f04d);
                                                    _0x1a8475 = _0x517de7;
                                                    _0x517de7 = _0xbf500e;
                                                    _0xbf500e = _0x4b6eaa;
                                                    _0x4b6eaa = safe_add(_0x36f04d, _0x4c9a99);
                                                }

                                                continue;

                                            case "9":
                                                _0xbf500e = _0x9230f8[0x1];
                                                continue;

                                            case "10":
                                                _0x517de7 = _0x9230f8[0x2];
                                                continue;

                                            case "11":
                                                _0x9230f8[0x6] = _0x853132["vPMz" + "p"](safe_add, _0x4c2a35, _0x9230f8[0x6]);
                                                continue;

                                            case "12":
                                                _0x9230f8[0x0] = _0x853132["vPMz" + "p"](safe_add, _0x4b6eaa, _0x9230f8[0x0]);
                                                continue;

                                            case "13":
                                                _0x1a8475 = _0x9230f8[0x3];
                                                continue;

                                            case "14":
                                                _0x9230f8[0x4] = safe_add(_0x5a5281, _0x9230f8[0x4]);
                                                continue;

                                            case "15":
                                                _0x1be70b = _0x9230f8[0x7];
                                                continue;

                                            case "16":
                                                _0x5a5281 = _0x9230f8[0x4];
                                                continue;
                                        }

                                        break;
                                    }
                                }

                                continue;

                            case "7":
                                var _0x9230f8 = new Array(0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19);

                                continue;

                            case "8":
                                var _0x28f486 = new Array(0x40);

                                continue;
                        }

                        break;
                    }
                } else {
                    return !![];
                }
            }
        };

        if (_0x11d033["xOHR" + "D"](_0x219d49)) {
            return;
        }

        let _0x474810 = new Date(),
            _0x103f5e = ![];

        const _0x44538a = function (_0x287168, _0x199eeb) {
            l = _0x2a0eca["char" + "s"]["leng" + "th"];

            for (var _0x5bbc14 = 0x0; _0x11d033["RrCF" + "X"](_0x5bbc14, l); _0x5bbc14++) {
                for (var _0x24bd9e = 0x0; _0x24bd9e < l; _0x24bd9e++) {
                    _0x378a68 = _0x11d033["mLDV" + "O"](_0x199eeb[0x0], _0x2a0eca["char" + "s"][_0x5bbc14]) + _0x2a0eca["char" + "s"][_0x24bd9e] + _0x199eeb[0x1];

                    if (!_0x103f5e && _0x11d033["eySv" + "c"](_0x11d033["SBWc" + "V"](new Date(), _0x474810), 0x5dc)) {

                        _0x103f5e = !![];
                    }
                    if (_0x11d033["OUpF" + "h"](_0x11d033["WJCL" + "U"](hash, _0x378a68), _0x287168)) {
                        return _0x378a68;
                    }
                }
            }
        };

        let _0x2e9552 = _0x2a0eca["ct"],
            _0x2ac303 = _0x2a0eca["bts"];

        var _0x378a68 = _0x11d033["KXdP" + "m"](_0x44538a, _0x2e9552, _0x2ac303);

        return _0x378a68
    };
    var obj = {obj}
    function decrypt_api(obj){
        return go(obj)
    }
    return decrypt_api(obj)
})()