var express = require("express");
var bodyParser = require("body-parser");
const jsdom = require("jsdom");
const {Script} = require("vm");
const virtualConsole = new jsdom.VirtualConsole({omitJSDOMErrors: true});
const cookieJar = new jsdom.CookieJar();
const {JSDOM} = jsdom;
require('events').EventEmitter.defaultMaxListeners = 0;
//默认情况下，如果为特定事件添加了超过 10 个监听器，则 EventEmitter 会打印一个警告
var api = express();
api.use(bodyParser.urlencoded({
    parameterLimit: 50000, //nodejs 里面默认请求参数个数是 1000 个
    limit: '50mb',
    extended: false
    //返回的对象是一个键值对，当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。
}));
// api.get('/api/get', function (req, res) {
//     res.send('hello')
// });
api.post('/api/ruishu_get_js/post', function (req, res) {
    var ht = req.body.html.toString();
    virtualConsole.on("info", (arr) => {
        console.log(arr)
    });
    virtualConsole.on("error", (arr) => {
        console.log(arr)
    });
    var options = {
        referrer: "http://125.35.6.80:8181/ftban/fw.jsp",
        userAgent: "Mozilla/5.0 (X11; OpenBSD i386) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36",
        resources: "usable",
        runScripts: "dangerously",
        url: "http://125.35.6.80:8181/ftban/fw.jsp",
        beforeParse(window) {
            window.js = 'none';
            window.screen = {
                width: 1920,
                availHeight: 1440,
                availLeft: 0,
                availTop: 0,
                availWidth: 1920,
                colorDepth: 16,
                height: 1440,
                pixelDepth: 16,
                orientation: {
                    angle: 0,
                    type: "landscape-primary"
                }
            };
            window.getjs = () => {
                return window.js
            };
        },
        // virtualConsole: new jsdom.VirtualConsole(),
        // cookieJar: new jsdom.CookieJar(),
    };

    const dom = (new JSDOM(ht, options));
    const window = dom.window;
    // console.log(window.document.cookie);
    var flag = true;
    while (flag) {
        if (window.js != 'none') {
            flag = false
        }
    }
    var js = window.js;
    window.close();
    res.send(js)
});

function randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNOPQRSTWXYZabcdefhijkmnoprstwxyz2345678';
    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

api.post('/api/ruishu_get_param/post', function (req, res) {
    var ht = req.body.html.toString();
    var route = req.body.route.toString();
    var url = req.body.url.toString();
    virtualConsole.on("info", (arr) => {
        console.log(arr)
    });
    virtualConsole.on("error", (arr) => {
        console.log(arr)
    });
    var plugins = []
    for (var i = 0; i < Math.round(Math.random() * 50); i++) {
        plugins.push({'name': randomString(Math.round(Math.random() * 30)) + " plugin"})
    }
    // console.log(plugins)
    var options = {
        referrer: url,
        userAgent: "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36",
        resources: "usable",  //加载子资源
        runScripts: "dangerously",
        //在默认情况下，所有的 script 并不会运行，如果要运行则需要使用 dangerously 选项,
        // 如果从外部执行脚本，而不是让 script 元素执行，那么使用 outside-only 选项
        url: url,
        beforeParse(window) {
            // window.js = 'none';
            window.screen = {
                availHeight: 1040,
                availLeft: 0,
                availTop: 0,
                availWidth: 1920,
                colorDepth: 24,
                height: 1080,
                pixelDepth: 24,
                width: 1920,
                orientation: {  //方向
                    angle: 0,
                    onchange: null,
                    type: "landscape-primary"
                }
            };
            // window.qmF = 'none';
            // window.zvgigpbz = "none";
            // window.zvgigpbz2 = "none";
            // window.CpokdF = 'none';
            // window.ywtu = 'none';
            // window.JQnh = null;
            // window.cDro = null;
            // window.ck = null;
            // window.f0 = null;
            // window.f1 = null;
            // window.fb = null;
            // window.fr = null;
            // window.nd = null;
            // window.vjtp = null;
            // window.vvci = null;
            // window.getjs = () => {
            //     return window.js
            // };
            window.navigator.languages = ["zh-CN", "zh"];
            window.navigator.plugins = plugins;
            window.navigator.getBattery = () => {
                return {
                    'charging': true,
                    'chargingTime': 0,
                    'dischargingTime': Infinity,
                    'level': 1,
                }
            };
            // window.navigator.mimeTypes = [{"type": "application/aliedit"}, {"type": "application/asx"},
            //     {"type": "application/bd-npyunwebdetect-plugin"}, {"type": "application/cenroll.cenroll.version.1"},
            //     {"type": "application/futuresplash"}, {"type": "application/futuresplash"},
            //     {"type": "application/futuresplash"}, {"type": "application/hwepass2001.installepass2001"},
            //     {"type": "application/hwpta.itrushwpta"}, {"type": "application/hwwdkey.installwdkey"},
            //     {"type": "application/itrusenroll.certenroll.version.1"},
            //     {"type": "application/mozilla-3dv-streaming-plugin"}, {"type": "application/npalissologin"},
            //     {"type": "application/npqqwebgame"}, {"type": "application/nptxsso"}, {"type": "application/pdf"},
            //     {"type": "application/pta.itruspta.version.1"}, {"type": "application/qqpcmgr-extensions-mozilla"},
            //     {"type": "application/qscall-plugin"}, {"type": "application/tecent-qzonemusic-plugin"},
            //     {"type": "application/tencent-qqphotodrawex2-plugin"},
            //     {"type": "application/vnd.chromium.remoting-viewer"}, {"type": "application/x-alisecctrl-plugin"},
            //     {"type": "application/x-google-chrome-pdf"}, {"type": "application/x-mplayer2"},
            //     {"type": "application/x-ms-wmp"}, {"type": "application/x-sharepoint"},
            //     {"type": "application/x-sharepoint-uc"}, {"type": "application/x-shockwave-flash"},
            //     {"type": "application/x-shockwave-flash"}, {"type": "application/x-shockwave-flash"},
            //     {"type": "application/x-tencent-qmail"}, {"type": "application/x-tencent-qmail-webkit"},
            //     {"type": "application/x-thunder-aplayer"}, {"type": "application/x-vnd.google.oneclickctrl.9"},
            //     {"type": "application/x-vnd.google.update3webcontrol.3"}, {"type": "application/xfplay-plugin"},
            //     {"type": "audio/x-ms-wax"}, {"type": "audio/x-ms-wma"}, {"type": "image/jps"}, {"type": "image/mpo"},
            //     {"type": "image/pns"}, {"type": "video/x-ms-asf"}, {"type": "video/x-ms-asf-plugin"},
            //     {"type": "video/x-ms-wm"}, {"type": "video/x-ms-wmv"}, {"type": "video/x-ms-wvx"}];
            // window.navigator.connection = {
            //     'downlink': 10,  //网络下行速度
            //     'effectiveType': '4g',  //网络类型
            //     'rtt': 0, //估算的往返时间
            //     'saveData': false,  //打开/请求数据保护模式
            //     'onchange': null //有值代表网络状态变更
            // };
            window.Infinity = Infinity
        },
        // virtualConsole: new jsdom.VirtualConsole(),
        cookieJar: new jsdom.CookieJar(),
        pretendToBeVisual: true,
        // jsdom 没有渲染可视内容的能力，在默认情况下会像无头浏览器一样工作。
        // 当 pretendToBeVisual 选项设置为 true，jsdom 会假装它正在渲染并显示内容。
    };
    const dom = (new JSDOM(ht, options));
    const window = dom.window;
    if(window.clickFunc != null){
        window.clickFunc();
    }
    var urlKey = "";
    // console.log(route);
    if(route !== "") {
        var rr = window.urlFunc(route);
        if(typeof rr === "string")
            urlKey = rr.split('?')[1];
        else if(typeof rr === "object")
            for(var item in rr){
                if(typeof rr[item] === "string" && rr[item].indexOf('http') === 0){
                    urlKey = rr[item].split('?')[1];
                    break
                }
            }
    }
    // console.log("window.token: ",JSON.stringify(window.token))
    cookies = window.document.cookie;
    resp = {
        'cookie': cookies, url: urlKey
    };
    window.close();
    res.send(JSON.stringify(resp));
});

var server = api.listen(5502, function () {
    var host = '0.0.0.0';
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});

