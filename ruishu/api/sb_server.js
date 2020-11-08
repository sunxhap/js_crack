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
    var options = {
        referrer: "http://wcjs.sbj.cnipa.gov.cn/txnS02.do",
        userAgent: "Mozilla/5.0 (X11; OpenBSD i386) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36",
        resources: "usable",
        runScripts: "dangerously",
        url: "http://wcjs.sbj.cnipa.gov.cn/txnS02.do",
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
    var qmF = req.body.qmF.toString();
    var qmF_opt = req.body.qmF_opt.toString();
    var f80t = req.body.f80t.toString();
    plugins = []
    for (var i; i < Math.round(Math.random() * 50); i++) {
        plugins.push({'name': randomString(Math.round(Math.random() * 30)) + " plugin"})
    }
    var options = {
        referrer: "http://wcjs.sbj.cnipa.gov.cn/txnS03.do",
        userAgent: "Mozilla/5.0 (X11; OpenBSD i386) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36",
        resources: "usable",
        runScripts: "dangerously",
        url: "http://wcjs.sbj.cnipa.gov.cn/",
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
            window.addEventListener = (a, b, c) => {
                eval(b)
            };
            window.document.addEventListener = (a, b, c) => {
                eval(b)
            };
            setTimeout = (a, b) => {
                eval(a)
            };

            window.qmF = 'none';
            window.wfAbSsA0 = "none";
            window.wfAbSsA02 = "none";
            window.OaSXc3hM = 'none';
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
            window.cap = null;
            window.getjs = () => {
                return window.js
            };
            window.navigator = {
                appCodeName: "Mozilla",
                appMinorVersion: "0",
                appName: "Netscape",
                appVersion: "5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.3; rv:11.0) like Gecko",
                browserLanguage: "zh-CN",
                cookieEnabled: true,
                cpuClass: "x86",
                language: "zh-CN",
                maxTouchPoints: 0,
                msManipulationViewsEnabled: true,
                msMaxTouchPoints: 0,
                msPointerEnabled: true,
                onLine: true,
                platform: "Win32",
                pointerEnabled: true,
                product: "Gecko",
                systemLanguage: "zh-CN",
                userAgent: "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.3; rv:11.0) like Gecko",
                userLanguage: "zh-CN",
                vendor: "",
                vendorSub: "",
                webdriver: false
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

    if (f80t != "none") {
        options.cookieJar.setCookie(f80t, 'http://wcjs.sbj.cnipa.gov.cn/', cp);
    }
    const dom = (new JSDOM(ht, options));
    const window = dom.window;
//     const s = new Script(`
//   window.document.body.click()
// `);
//     dom.runVMScript(s);
    Flt3WMZ5 = window.qmF;
    cookies = window.document.cookie;
    h = dom.serialize();

    resp = {
        'cookie': cookies,
        'Flt3WMZ5': Flt3WMZ5,
        'wfAbSsA0': window.wfAbSsA0,
        'OaSXc3hM': window.OaSXc3hM,
        'wfAbSsA02': window.wfAbSsA02,
        'cap': window.cap,
        'env': {
            '$_YWTU': window.ywtu,
            '$_JQnh': window.JQnh,
            '$_cDro': window.cDro,
            '$_ck': window.ck,
            '$_f0': window.f0,
            '$_f1': window.f1,
            '$_fb': window.fb,
            '$_fr': window.fr,
            '$_nd': window.nd,
            '$_vJTp': window.vjtp,
            '$_vvCI': window.vvci,
            '$_fh0': window.fh0
        }
    };
    if(dom.serialize().indexOf('request_tlong') > 0){
        resp['tlong'] = window.document.getElementById('request_tlong').value;
        resp['mi'] = window.document.getElementById('request_mi').value
    }
    window.close();
    res.send(JSON.stringify(resp));
});

var server = api.listen(5599, function () {
    var host = '0.0.0.0';
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});

