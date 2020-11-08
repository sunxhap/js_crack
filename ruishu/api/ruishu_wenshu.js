var express = require("express");
var bodyParser = require("body-parser");
const jsdom = require("jsdom");
const {Script} = require("vm");
const virtualConsole = new jsdom.VirtualConsole({omitJSDOMErrors: true});
const cookieJar = new jsdom.CookieJar();
const {JSDOM} = jsdom;
require('events').EventEmitter.defaultMaxListeners = 0;
var api = express();
api.use(bodyParser.urlencoded({
    parameterLimit: 50000,
    limit: '50mb',
    extended: false
}));
api.get('/api/get', function (req, res) {
    res.send('hello')
});
api.post('/api/trademark_get_js/post', function (req, res) {
    var ht = req.body.html.toString();
    virtualConsole.on("info", (arr) => {
        
    });
    virtualConsole.on("error", (arr) => {
       
    });
    var options = {
        referrer: "http://wenshu.court.gov.cn",
        userAgent: "Mozilla/5.0 (X11; OpenBSD i386) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36",
        resources: "usable",
        runScripts: "dangerously",
        url: "http://wenshu.court.gov.cn",
        beforeParse(window) {
            window.js = 'none';
            window.getjs = () => {
                return window.js
            };
        },
        // virtualConsole: new jsdom.VirtualConsole(),
        // cookieJar: new jsdom.CookieJar(),
    };

    const window = (new JSDOM(ht, options)).window;
   
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
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

api.post('/api/trademark_get_param/post', function (req, res) {
    var ht = req.body.html.toString();
    virtualConsole.on("info", (arr) => {
        
    });
    virtualConsole.on("error", (arr) => {
       
    });
    plugins = []
    for (var i = 0; i < Math.round(Math.random() * 50); i++) {
        plugins.push({'name': randomString(Math.round(Math.random() * 30)) + " plugin"})
    }
    
    var options = {
        referrer: "http://wenshu.court.gov.cn",
        userAgent: "Mozilla/5.0 (X11; OpenBSD i386) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36",
        resources: "usable",
        runScripts: "dangerously",
        url: "http://wenshu.court.gov.cn",
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
            window.qmF = 'none';
            window.zvgigpbz = "none";
            window.zvgigpbz2 = "none";
            window.CpokdF = 'none';
            window.ywtu = 'none';
            window.JQnh = null;
            window.cDro = null;
            window.ck = null;
            window.f0 = null;
            window.f1 = null;
            window.fb = null;
            window.fr = null;
            window.nd = null;
            window.vjtp = null;
            window.vvci = null;
            window.getjs = () => {
                return window.js
            };
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
            window.navigator.mimeTypes = [{"type": "application/asx"}, {"type": "application/arx"},{"type": "application/bd-npyunwebdetect-plugin"}, {"type": "application/cenroll.cenroll.version.1"}, {"type": "application/futuresplash"}, {"type": "application/futuresplash"}, {"type": "application/futuresplash"}, {"type": "application/futuresplash"}, {"type": "application/hwepass2001.installepass2001"}, {"type": "application/hwpta.itrushwpta"}, {"type": "application/hwwdkey.installwdkey"}, {"type": "application/itrusenroll.certenroll.version.1"}, {"type": "application/mozilla-npqihooquicklogin"}, {"type": "application/npalicdo"}, {"type": "application/npalissologin"}, {"type": "application/npqqwebgame"}, {"type": "application/nptxsso"}, {"type": "application/npxf-qqminidl"}, {"type": "application/npxluser_plugin"}, {"type": "application/pdf"}, {"type": "application/pta.itruspta.version.1"}, {"type": "application/qscall-plugin"}]
            window.navigator.connection = {
                'downlink': 10,
                'effectiveType': 'wifi',
                'rtt': 50,
                'saveData': false
            };
            window.Infinity = Infinity
        },
        // virtualConsole: new jsdom.VirtualConsole(),
        cookieJar: new jsdom.CookieJar(),
        pretendToBeVisual: true,
    };

    function cp(val) {
        if (val) {
            // console.log(val);
        }
    }
    const dom = (new JSDOM(ht, options));
    const window = dom.window;
    cookies = window.document.cookie;
    resp = {
        'cookie': cookies,
    };
    window.close();
    res.send(JSON.stringify(resp));
});

var ruishu_wenshu = api.listen(5455, function () {
    var host = '0.0.0.0';
    var port = ruishu_wenshu.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});

