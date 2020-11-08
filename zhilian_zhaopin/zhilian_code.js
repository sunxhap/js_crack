// atob函数，后面可能会判断其是否存在，勿删！

var arg1 = 'FC32DDD35282176A12378325335832EE1AF4070E';

!(function () {
  var _0xdf49c6 = Function("return (function () " + "{}.constructor(\"return this\")()" + ");");
  var _0xb8360b = _0xdf49c6();
  var _0x389f44 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  _0xb8360b.atob || (_0xb8360b.atob = function (_0xba82f0) {
    var _0xec6bb4 = String(_0xba82f0).replace(/=+$/, "");
    for (var _0x1a0f04 = 0x0, _0x18c94e, _0x41b2ff, _0xd79219 = 0x0, _0x5792f7 = ""; _0x41b2ff = _0xec6bb4.charAt(_0xd79219++); ~_0x41b2ff && (_0x18c94e = _0x1a0f04 % 0x4 ? _0x18c94e * 0x40 + _0x41b2ff : _0x41b2ff, _0x1a0f04++ % 0x4) ? _0x5792f7 += String.fromCharCode(0xff & _0x18c94e >> (-0x2 * _0x1a0f04 & 0x6)) : 0x0) {
      _0x41b2ff = _0x389f44.indexOf(_0x41b2ff);
    }
    return _0x5792f7;
  });
})();
var arg3 = null;
var arg4 = null;
var arg5 = null;
var arg6 = null;
var arg7 = null;
var arg8 = null;
var arg9 = null;
var arg10 = null;
var l = function () {
  while (window["_phantom"] || window["__phantomas"]) {}
  ;
  var _0x5e8b26 = "3000176000856006061501533003690027800375";
  String["prototype"]["hexXor"] = function (_0x4e08d8) {
    var _0x5a5d3b = "";
    for (var _0xe89588 = 0; _0xe89588 < this["length"] && _0xe89588 < _0x4e08d8["length"]; _0xe89588 += 2) {
      var _0x401af1 = parseInt(this["slice"](_0xe89588, _0xe89588 + 2), 16);
      var _0x105f59 = parseInt(_0x4e08d8["slice"](_0xe89588, _0xe89588 + 2), 16);
      var _0x189e2c = (_0x401af1 ^ _0x105f59)["toString"](16);
      if (_0x189e2c["length"] == 1) {
        _0x189e2c = "0" + _0x189e2c;
      }
      _0x5a5d3b += _0x189e2c;
    }
    return _0x5a5d3b;
  };
  String["prototype"]["unsbox"] = function () {
    var _0x4b082b = [15, 35, 29, 24, 33, 16, 1, 38, 10, 9, 19, 31, 40, 27, 22, 23, 25, 13, 6, 11, 39, 18, 20, 8, 14, 21, 32, 26, 2, 30, 7, 4, 17, 5, 3, 28, 34, 37, 12, 36];
    var _0x4da0dc = [];
    var _0x12605e = "";
    for (var _0x20a7bf = 0; _0x20a7bf < this["length"]; _0x20a7bf++) {
      var _0x385ee3 = this[_0x20a7bf];
      for (var _0x217721 = 0; _0x217721 < _0x4b082b["length"]; _0x217721++) {
        if (_0x4b082b[_0x217721] == _0x20a7bf + 1) {
          _0x4da0dc[_0x217721] = _0x385ee3;
        }
      }
    }
    _0x12605e = _0x4da0dc["join"]("");
    return _0x12605e;
  };
  var _0x23a392 = arg1["unsbox"]();
  arg2 = _0x23a392["hexXor"](_0x5e8b26);
  setTimeout("reload(arg2)", 2);
};
var _0x4db1c = function () {
  function _0x355d23(_0x450614) {
    if (("" + _0x450614 / _0x450614)["length"] !== 1 || _0x450614 % 20 === 0) {
      (function () {})["constructor"]((undefined + "")[2] + (!![] + "")[3] + ([]["entries"]() + "")[2] + (undefined + "")[0] + (![] + [0] + String)[20] + (![] + [0] + String)[20] + (!![] + "")[3] + (!![] + "")[1])();
    } else {
      (function () {})["constructor"]((undefined + "")[2] + (!![] + "")[3] + ([]["entries"]() + "")[2] + (undefined + "")[0] + (![] + [0] + String)[20] + (![] + [0] + String)[20] + (!![] + "")[3] + (!![] + "")[1])();
    }
    _0x355d23(++_0x450614);
  }
  try {
    _0x355d23(0);
  } catch (_0x54c483) {}
};
if (function () {
  var _0x470d8f = function () {
    var _0x4c97f0 = !![];
    return function (_0x1742fd, _0x4db1c) {
      if (_0x4c97f0) {
        var _0x48181e = function () {
          if (_0x4db1c) {
            var _0x55f3be = _0x4db1c["apply"](_0x1742fd, arguments);
            _0x4db1c = null;
            return _0x55f3be;
          }
        };
      } else {
        var _0x48181e = function () {};
      }
      _0x4c97f0 = ![];
      return _0x48181e;
    };
  }();
  var _0x501fd7 = _0x470d8f(this, function () {
    var _0x4c97f0 = function () {
      return "dev";
    },
        _0x1742fd = function () {
      return "window";
    };
    var _0x55f3be = function () {
      var _0x3ad9a1 = new RegExp("\\w+ *\\(\\) *{\\w+ *['|\"].+['|\"];? *}");
      return !_0x3ad9a1["test"](_0x4c97f0["toString"]());
    };
    var _0x1b93ad = function () {
      var _0x20bf34 = new RegExp("(\\\\[x|u](\\w){2,4})+");
      return _0x20bf34["test"](_0x1742fd["toString"]());
    };
    var _0x5afe31 = function (_0x178627) {
      var _0x1a0f04 = ~-1 >> 1 + 255 % 0;
      if (_0x178627["indexOf"]("i" === _0x1a0f04)) {
        _0xd79219(_0x178627);
      }
    };
    var _0xd79219 = function (_0x5792f7) {
      var _0x4e08d8 = ~-4 >> 1 + 255 % 0;
      if (_0x5792f7["indexOf"]((!![] + "")[3]) !== _0x4e08d8) {
        _0x5afe31(_0x5792f7);
      }
    };
    if (!_0x55f3be()) {
      if (!_0x1b93ad()) {
        _0x5afe31("indеxOf");
      } else {
        _0x5afe31("indexOf");
      }
    } else {
      _0x5afe31("indеxOf");
    }
  });
  _0x501fd7();
  var _0x3a394d = function () {
    var _0x1ab151 = !![];
    return function (_0x372617, _0x42d229) {
      if (_0x1ab151) {
        var _0x3b3503 = function () {
          if (_0x42d229) {
            var _0x7086d9 = _0x42d229["apply"](_0x372617, arguments);
            _0x42d229 = null;
            return _0x7086d9;
          }
        };
      } else {
        var _0x3b3503 = function () {};
      }
      _0x1ab151 = ![];
      return _0x3b3503;
    };
  }();
  var _0x5b6351 = _0x3a394d(this, function () {
    var _0x46cbaa = Function("return (function() " + "{}.constructor(\"return this\")( )" + ");");
    var _0x1766ff = function () {};
    var _0x9b5e29 = _0x46cbaa();
    _0x9b5e29["console"]["log"] = _0x1766ff;
    _0x9b5e29["console"]["error"] = _0x1766ff;
    _0x9b5e29["console"]["warn"] = _0x1766ff;
    _0x9b5e29["console"]["info"] = _0x1766ff;
  });
  _0x5b6351();
  try {
    // return !!window["addEventListener"];
  } catch (_0x35538d) {
    return ![];
  }
}()) {
  // document["addEventListener"]("DOMContentLoaded", l, ![]);
} else {
  // document["attachEvent"]("onreadystatechange", l);
}

_0x4db1c();

// l()