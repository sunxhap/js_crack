/*
1、删无用代码
2、去除无限debuger 代码

3、去除重写的console.log() 代码
    源代码 无法打印

*/

var arg1 = '6852F4E7B236E467BC1CE955419F3A2F2EF38C2E';

var l = function () {

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
  console.log('arg2', arg2);
  // setTimeout("reload(arg2)", 2);
};

var _0x4db1c = function () {
  function _0x355d23(_0x450614) {
    // // todo 删无限debuger 代码
    if (("" + _0x450614 / _0x450614)["length"] !== 1 || _0x450614 % 20 === 0) {
    //   console.log("undefined"[2] + "true"[3] + ([]["entries"]() + "")[2] + "undefined"[0] + ("false0" + String)[20] + ("false0" + String)[20] + "true"[3] + "true"[1]);
    //   // (function () {})["constructor"]("undefined"[2] + "true"[3] + ([]["entries"]() + "")[2] + "undefined"[0] + ("false0" + String)[20] + ("false0" + String)[20] + "true"[3] + "true"[1])();
    // } else {
    //   console.log("undefined"[2] + "true"[3] + ([]["entries"]() + "")[2] + "undefined"[0] + ("false0" + String)[20] + ("false0" + String)[20] + "true"[3] + "true"[1]);
    //   // (function () {})["constructor"]("undefined"[2] + "true"[3] + ([]["entries"]() + "")[2] + "undefined"[0] + ("false0" + String)[20] + ("false0" + String)[20] + "true"[3] + "true"[1])();
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
      var _0x48181e = _0x4c97f0 ? function () {
        if (_0x4db1c) {
          var _0x55f3be = _0x4db1c["apply"](_0x1742fd, arguments);  // todo window

          _0x4db1c = null;
          return _0x55f3be;
        }
      } : function () {};

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
      var _0x1a0f04 = 0;

      if (_0x178627["indexOf"](false)) {
        _0xd79219(_0x178627);
      }
    };

    var _0xd79219 = function (_0x5792f7) {
      var _0x4e08d8 = 3;

      if (_0x5792f7["indexOf"]("true"[3]) !== _0x4e08d8) {
        _0x5afe31(_0x5792f7);
        // return
      }
    };

    if (!_0x55f3be()) {
      if (!_0x1b93ad()) {
        // _0x5afe31("ind\u0435xOf");
        _0x5afe31("indexOf");   // todo
      } else {
        _0x5afe31("indexOf");
      }
    } else {
      // _0x5afe31("ind\u0435xOf");
      _0x5afe31("indexOf");   // todo
    }
  });

  _0x501fd7();

  var _0x3a394d = function () {
    var _0x1ab151 = !![];

    return function (_0x372617, _0x42d229) {
      var _0x3b3503 = _0x1ab151 ? function () {
        if (_0x42d229) {
          var _0x7086d9 = _0x42d229["apply"](_0x372617, arguments);

          _0x42d229 = null;
          return _0x7086d9;
        }
      } : function () {};

      _0x1ab151 = ![];
      return _0x3b3503;
    };
  }();

  var _0x5b6351 = _0x3a394d(this, function () {
    // todo 删复写的 console.log
    // var _0x46cbaa = Function("return (function() {}.constructor(\"return this\")( ));");
    //
    // // var _0x1766ff = function () {};
    //
    // var _0x9b5e29 = _0x46cbaa();
    //
    // _0x9b5e29["console"]["log"] = _0x1766ff;
    // _0x9b5e29["console"]["error"] = _0x1766ff;
    // _0x9b5e29["console"]["warn"] = _0x1766ff;
    // _0x9b5e29["console"]["info"] = _0x1766ff;
  });

  // _0x5b6351();
  return true
}()) {
  // document["addEventListener"]("DOMContentLoaded", l, ![]);
  //
} else {
  // document["attachEvent"]("onreadystatechange", l);
}

_0x4db1c();

l();

