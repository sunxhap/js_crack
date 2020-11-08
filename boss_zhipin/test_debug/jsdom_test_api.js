const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const {Script} = require("vm");
const fs = require("fs");

var express = require('express');
var app = express();
var bodyParser = require('body-parser');  // 导入请求体解析器
// 调整参数大小限制，否则会提示参数过大。
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


function randomNum(minNum,maxNum){
    switch(arguments.length){
        case 1:
            return parseInt(Math.random()*minNum+1,10);
            break;
        case 2:
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
            break;
        default:
            return 0;
            break;
    }
}

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


function randomWord(randomFlag, min, max) {
    /*
    ** randomWord 产生任意长度随机字母数字组合
    ** randomFlag 是否任意长度 min 任意长度最小位[固定位数] max 任意长度最大位
    */
    let str = "",
        range = min,
        arr = [
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
            'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
            'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z','0', '1', '2', '3', '4', '5', '6', '7', '8', '9',];

    if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;// 任意长度
    }
    for (let i = 0; i < range; i++) {
        pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }
    return str;
}


function get_cookie(seed, ts, code){
    // random_set_params();

    var options = {
        // referrer: "",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36",
        resources: "usable",    // 假如你想通过<script src="">来执行外部脚本，你需要确保已经加载了它们。为此，请添加选项resources:"usable"
        runScripts: "dangerously",
        url: 'https://www.zhipin.com/job_detail/?query=python&city=101280600&industry=&position=',
        pretendToBeVisual: true
    };
    const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`, options);

    window = dom.window;

    document = window.document;
    document.title = '';
    document.cookie = randomWord(true,30, 200);
    document.URL = "https://www.zhipin.com/job_detail/?query=python&city=101280600&industry=&position=";
    document.documentURI = "https://www.zhipin.com/job_detail/?query=python&city=101280600&industry=&position=";
    document.compatMode = 'CSS1Compat';
    document.characterSet = "UTF-8";
    document.charset = "UTF-8";
    document.inputEncoding = "UTF-8";
    document.contentType = "text/html";
    document.domain = "www.zhipin.com";
    document.referrer = '';

    location = document.location;
    location.hostname = "www.zhipin.com";
    location.href = "https://www.zhipin.com/job_detail/?query=python&city=101280600&industry=&position=";
    location.origin = 'https://www.zhipin.com';
    location.host = 'www.zhipin.com';
    location.port = '';
    location.protocol = "https:";
    location.toString = function () {
        return "https://www.zhipin.com/job_detail/?query=python&city=101280600&industry=&position="
    };

    window.outerWidth = 160;
    window.outerHeight = 28;
    window.innerWidth = 1920;
    window.innerHeight = 969;

    location = window.location;
    location.hostname = "www.zhipin.com";
    location.href = "https://www.zhipin.com/job_detail/?query=python&city=101280600&industry=&position=";
    location.origin = 'https://www.zhipin.com';
    location.host = 'www.zhipin.com';
    location.port = '';
    location.protocol = "https:";
    location.hash = '';
    location.toString = function () {
        return "https://www.zhipin.com/job_detail/?query=python&city=101280600&industry=&position="
    };


// 可修改  navigator值
    dom.runVMScript(new Script("Object.defineProperty(navigator,'language', {get:function(){return 'zh-CN';}}) "));
    dom.runVMScript(new Script("Object.defineProperty(navigator,'cookieEnabled', {get:function(){return true;}}) "));
    dom.runVMScript(new Script("Object.defineProperty(navigator,'userAgent', {get:function(){return 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36';}}) "));
    dom.runVMScript(new Script("Object.defineProperty(navigator,'appVersion', {get:function(){return '5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36';}}) "));
    dom.runVMScript(new Script("Object.defineProperty(navigator,'appCodeName', {get:function(){return 'Mozilla';}}) "));

// todo add
    dom.runVMScript(new Script("Object.defineProperty(navigator,'vendorSub', {get:function(){return '';}}) "));
    dom.runVMScript(new Script("Object.defineProperty(navigator,'productSub', {get:function(){return '20030107';}}) "));
    dom.runVMScript(new Script("Object.defineProperty(navigator,'hardwareConcurrency', {get:function(){return 8;}}) "));
    dom.runVMScript(new Script("Object.defineProperty(navigator,'onLine', {get:function(){return true;}}) "));

// todo screen
    dom.runVMScript(new Script("Object.defineProperty(screen,'availWidth', {get:function(){return 1920;}}) "));
    dom.runVMScript(new Script("Object.defineProperty(screen,'availHeight', {get:function(){return 1040;}}) "));
    dom.runVMScript(new Script("Object.defineProperty(screen,'availLeft', {get:function(){return 0;}}) "));
    dom.runVMScript(new Script("Object.defineProperty(screen,'availTop', {get:function(){return 0;}}) "));

    dom.runVMScript(new Script("Object.defineProperty(screen,'width', {get:function(){return 1920;}}) "));
    dom.runVMScript(new Script("Object.defineProperty(screen,'height', {get:function(){return 1080;}}) "));
    dom.runVMScript(new Script("Object.defineProperty(screen,'orientation', {get:function(){return {angle: 0, onchange: null, type: \"landscape-primary\"};}}) "));

    // screen = window.screen;
    // screen.colorDepth = 24;      // you
    // screen.pixelDepth = 24;      // you

    // todo
    // dom.runVMScript(new Script("Object.defineProperty(window,'length', {get:function(){return 1;}}) "));
    dom.runVMScript(new Script("Object.defineProperty(window,'history', {get:function(){return {length: 5, scrollRestoration: \"auto\", state: null};}}) "));

    // todo add
    window.origin = "https://www.zhipin.com";
    window.DEBUG = false;
    window.isTouch = false;
    window.supportsCalcVh = true;
    window.explorer = "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36";

    window.UA = "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36";

    // var content = fs.readFileSync('code_0803_old_2.js', {encoding: 'binary'});

    var js_content_header = 'localStorage = {\n' +
        '    removeItem: function (key) {\n' +
        '        delete this[key]\n' +
        '    },\n' +
        '    getItem: function (key) {\n' +
        '        return this[key] ? this[key]: null;\n' +
        '    },\n' +
        '    setItem: function (key, value) {\n' +
        '        this[key] = "" + value;\n' +
        '    },\n' +
        '};\n' +
        'sessionStorage = {};\n' +
        'setInterval = window.setInterval = function (){};\n' +
        'setInterval.toString = function(){return "function setInterval() { [native code] }"};\n' +
        'setTimeout = function (){};\n' +
        'top = window.top = window;\n' +
        'global = undefined;\n' +
        'child_process = undefined;\n' +
        'closed = {\n' +
        '    __proto__: ( 1>>3 >4 )["__proto__"]\n' +
        '};\n';

    var js_content_tail = "\n var abc_seed = '" + seed + "';      \n" +
        "var abc_ts = '" + ts + "';\n" +
        "this.token = encodeURIComponent(new ABC().z(abc_seed, abc_ts));\n" ;

    code = code.replace("'\x20':'7'", "' ': '7'");

    const s = new Script(js_content_header + code + js_content_tail);
    // const s = new Script(code + js_content_tail);
    dom.runVMScript(s);

    token = dom.window.token;
    console.log('token', token);
    return token
}


// 开启get_cookie路由
app.post('/get_cookie', function (req, res) {
    // 获取请求的真实IP
    var ip = req.headers['x-real-ip'] ? req.headers['x-real-ip'] : req.ip.replace(/::ffff:/, '');
    // 获取请求时间
    var time = new Date().toString().replace(/\+0800.*/, '');
    // 打印请求时间、IP、方法、路由
    console.log('INFO:', time, ip, req.method, req.originalUrl, '200 OK!');
    // 获取POST请求的formdata
    let result = req.body;
    let code = result.code;
    let seed = result.seed;
    let ts = result.ts;

    // 调用cook模块中的get_cookie方法，该方法需要提前module.exports导出
    var cooki = get_cookie(seed, ts, code);
    var infp = {'cookie': cooki};

    // 设置响应头，如果不设置，通过asyncio_requests请求的res.json()会报错，因为它是根据响应头解析json数据
    // 而requests可以直接使用res.json()解析，因为它是根据响应信息解析
    res.set('Content-Type', 'application/json');
    // 将JSON后的数据返回客户端
    res.send(JSON.stringify(infp));
});

app.listen(8919, () => {
    console.log("开启服务，端口8919", new Date().toString().replace(/\+0800.*/, ''))
});