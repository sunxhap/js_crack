const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const {Script} = require("vm");
const fs = require("fs");

const { assert } = require("chai");


function assertCookies(actualCookieStr, expectedCookies) {
    const actualCookies = actualCookieStr.split(/;\s*/);
    assert.deepEqual(actualCookies, expectedCookies);
}


const url = "https://www.zhipin.com/job_detail/?query=python&city=101280600&industry=&position=";
const cookieJar = new jsdom.CookieJar();
// cookieJar.setCookieSync("OptionsTest=FooBar; expires=Wed, 13-Jan-2051 22:23:01 GMT; path=/TestPath; HttpOnly", url);
cookieJar.setCookieSync("SecureAliasUrlTest=Baz;", url);
cookieJar.setCookieSync("22222222222=Baz111111;", url);
cookieJar.setCookieSync("test1=test1;", url);

var options = {
    // referrer: "",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36",
    resources: "usable",    // 假如你想通过<script src="">来执行外部脚本，你需要确保已经加载了它们。为此，请添加选项resources:"usable"
    runScripts: "dangerously",      //  在默认情况下，所有的 script 并不会运行，如果要运行则需要使用 dangerously 选项
    // url: 'https://www.zhipin.com/',
    url: "https://www.zhipin.com/job_detail/?query=python&city=101280600&industry=&position=",  // todo 需要和下面的环境一致
    beforeParse(window) {
    },
    // cookieJar: new jsdom.CookieJar(store, options),
    // cookieJar: new jsdom.CookieJar(),
    cookieJar: cookieJar,
    // pretendToBeVisual: true          // jsdom 没有渲染可视内容的能力，在默认情况下会像无头浏览器一样工作, pretendToBeVisual 选项设置为 true，jsdom 会假装它正在渲染并显示内容
};
// const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`, {runScripts: "dangerously"});
const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`, options);

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


var content = fs.readFileSync('code_0803_old_2.js', {encoding: 'binary'});
// console.log(content);
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

var js_content_tail = "\n var abc_seed = 'Hh0PgWAcHD4lEh4arKAjY2iPWnBhMT2gHfNAAgMUsdc=';      \n" +
    "var abc_ts = \"1596714778254\";\n" +
    "this.token = encodeURIComponent(new ABC().z(abc_seed, abc_ts));\n" ;


// const s = new Script(js_content_header + content + js_content_tail);
const s = new Script(content + js_content_tail);
dom.runVMScript(s);

token = dom.window.token;
console.log('token', token);

console.log('WINDOW DEBUG:', dom.window.DEBUG);
console.log('WINDOW isTouch:', dom.window.isTouch);
console.log('WINDOW location:', dom.window.history);

console.log('WINDOW UA:', dom.window.UA);

// console.log(dom.window.navigator.connection);
// console.log(dom.window.document.title);
// console.log(dom.window.innerHeight);
// Object.defineProperty(navigator,'language', {get:function(){return 'zh-CN';}});
// 修改游览器的navigator.platform属性
// DEBUG: true