
const jsdom = require("jsdom");
const iconv = require('iconv-lite');
const {JSDOM} = jsdom;
const {Script} = require("vm");
const fs = require("fs");


// var content = fs.readFileSync('index_v3.html', {encoding:'binary'});
var content = fs.readFileSync('templates.html', {encoding:'binary'});
var buf = new Buffer.from(content, 'binary');
var colorado_html = iconv.decode(buf, 'utf-8');


const url = "http://www.chinaunicombidding.cn/jsp/cnceb/web/info1/detailNotice.jsp?id=4404703300000008133";
const domain = 'www.chinaunicombidding.cn';
const cookieJar = new jsdom.CookieJar();

var options = {
    // referrer: "",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36",
    resources: "usable",    // 假如你想通过<script src="">来执行外部脚本，你需要确保已经加载了它们。为此，请添加选项resources:"usable"
    runScripts: "dangerously",      //  在默认情况下，所有的 script 并不会运行，如果要运行则需要使用 dangerously 选项
    url: url,  // todo 需要和下面的环境一致
    beforeParse(window) {
        window.navigator.getBattery = () => {
            return {
                'charging': true,
                'chargingTime': 0,
                'dischargingTime': Infinity,
                'level': 1,
            }
        };
        window.navigator.mimeTypes = [{"type": "application/360softmgrplugin"}, {"type": "application/aliedit"}, {"type": "application/asx"}, {"type": "application/bd-npyunwebdetect-plugin"}, {"type": "application/cenroll.cenroll.version.1"}, {"type": "application/futuresplash"}, {"type": "application/futuresplash"}, {"type": "application/futuresplash"}, {"type": "application/futuresplash"}, {"type": "application/hwepass2001.installepass2001"}, {"type": "application/hwpta.itrushwpta"}, {"type": "application/hwwdkey.installwdkey"}, {"type": "application/itrusenroll.certenroll.version.1"}, {"type": "application/mozilla-npqihooquicklogin"}, {"type": "application/npalicdo"}, {"type": "application/npalissologin"}, {"type": "application/npqqwebgame"}, {"type": "application/nptxsso"}, {"type": "application/npxf-qqminidl"}, {"type": "application/npxluser_plugin"}, {"type": "application/pdf"}, {"type": "application/pta.itruspta.version.1"}, {"type": "application/qscall-plugin"}]
        window.navigator.connection = {
            'downlink': 10,
            'effectiveType': '4g',
            'rtt': 50,
            'saveData': false
        };
        window.Infinity = Infinity;
    },
    // cookieJar: new jsdom.CookieJar(),
    cookieJar: cookieJar,
    pretendToBeVisual: true          // jsdom 没有渲染可视内容的能力，在默认情况下会像无头浏览器一样工作,
                                    // pretendToBeVisual 选项设置为 true，jsdom 会假装它正在渲染并显示内容
};
// const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`, {runScripts: "dangerously"});
// const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`, options);
const dom = new JSDOM(colorado_html, options);


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

window = dom.window;

document = window.document;
document.title = '';
// document.cookie = randomWord(true,30, 200);
document.URL = url;
document.documentURI = url;
document.compatMode = 'CSS1Compat';
document.characterSet = "UTF-8";
document.charset = "UTF-8";
document.inputEncoding = "UTF-8";
document.contentType = "text/html";
document.domain = domain;
document.referrer = '';

location = document.location;
location.hostname = domain;
location.href = url;
location.origin = 'http://' + domain;
location.host = domain;
location.port = '';
location.protocol = "http:";
location.toString = function () {
    return url
};

window.outerWidth = 160;
window.outerHeight = 28;
window.innerWidth = 1920;
window.innerHeight = 969;

location = window.location;
location.hostname = domain;
location.href = url;
location.origin = 'http://' + domain;
location.host = domain;
location.port = '';
location.protocol = "http:";
location.hash = '';
location.toString = function () {
    return url
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
window.origin = "http://" + domain;
window.DEBUG = false;
window.isTouch = false;
window.supportsCalcVh = true;
window.explorer = "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36";

window.UA = "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36";


// console.log('WINDOW DEBUG:', dom.window.DEBUG);
// console.log('WINDOW isTouch:', dom.window.isTouch);
// console.log('WINDOW location:', dom.window.history);

// var content2 = fs.readFileSync('ret_tmp.js', {encoding: 'binary'});
// const s2 = new Script(content2);
// dom.runVMScript(s2);

console.log('WINDOW token:', dom.window.token);
