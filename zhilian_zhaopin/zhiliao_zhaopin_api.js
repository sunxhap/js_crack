// const jsdom = require("jsdom");
// const {JSDOM} = jsdom;
// const {Script} = require("vm");
// const fs = require("fs");

var express = require('express');
var app = express();
var bodyParser = require('body-parser');  // 导入请求体解析器
// 调整参数大小限制，否则会提示参数过大。
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

function get_arg2(arg1) {
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
    return arg2
};


app.post('/get_cookie', function (req, res) {
    // 获取请求的真实IP
    var ip = req.headers['x-real-ip'] ? req.headers['x-real-ip'] : req.ip.replace(/::ffff:/, '');
    // 获取请求时间
    var time = new Date().toString().replace(/\+0800.*/, '');
    // 打印请求时间、IP、方法、路由
    console.log('INFO:', time, ip, req.method, req.originalUrl, '200 OK!');
    // 获取POST请求的formdata
    let arg1 = req.body.arg1;

    var infp = {'cookie': get_arg2(arg1)};

    // 设置响应头，如果不设置，通过asyncio_requests请求的res.json()会报错，因为它是根据响应头解析json数据
    // 而requests可以直接使用res.json()解析，因为它是根据响应信息解析
    res.set('Content-Type', 'application/json');
    // 将JSON后的数据返回客户端
    res.send(JSON.stringify(infp));
});

app.listen(8911, () => {
    console.log("开启服务，端口8911", new Date().toString().replace(/\+0800.*/, ''))
});