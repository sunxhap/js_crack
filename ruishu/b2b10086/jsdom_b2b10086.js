const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const {Script} = require("vm");
const fs = require("fs");
//
// const { assert } = require("chai");



// const url = "https://www.zhipin.com/job_detail/?query=python&city=101280600&industry=&position=";
// const cookieJar = new jsdom.CookieJar();
// // cookieJar.setCookieSync("OptionsTest=FooBar; expires=Wed, 13-Jan-2051 22:23:01 GMT; path=/TestPath; HttpOnly", url);
// cookieJar.setCookieSync("SecureAliasUrlTest=Baz;", url);
// cookieJar.setCookieSync("22222222222=Baz111111;", url);
// cookieJar.setCookieSync("test1=test1;", url);

var options = {
    // referrer: "",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36",
    resources: "usable",    // 假如你想通过<script src="">来执行外部脚本，你需要确保已经加载了它们。为此，请添加选项resources:"usable"
    runScripts: "dangerously",      //  在默认情况下，所有的 script 并不会运行，如果要运行则需要使用 dangerously 选项
    // url: 'https://www.zhipin.com/',
    url: "https://b2b.10086.cn/b2b/main/listVendorNotice.html?noticeType=2",  // todo 需要和下面的环境一致
    beforeParse(window) {

    },
    // cookieJar: new jsdom.CookieJar(store, options),
    // cookieJar: new jsdom.CookieJar(),
    // cookieJar: cookieJar,
    // pretendToBeVisual: true          // jsdom 没有渲染可视内容的能力，在默认情况下会像无头浏览器一样工作, pretendToBeVisual 选项设置为 true，jsdom 会假装它正在渲染并显示内容
};
// const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`, {runScripts: "dangerously"});

var content = fs.readFileSync('jsdom_index.html', {encoding: 'binary'});
const dom = new JSDOM(content, options);


window = dom.window;

document = window.document;

console.log(window.arguments);



// console.log(dom.window.navigator.connection);
// console.log(dom.window.document.title);
// console.log(dom.window.innerHeight);
// Object.defineProperty(navigator,'language', {get:function(){return 'zh-CN';}});
// 修改游览器的navigator.platform属性
// DEBUG: true