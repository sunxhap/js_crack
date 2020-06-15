var iconv = require('iconv-lite');
const jsdom = require("jsdom");
const fs = require("fs");
const {JSDOM} = jsdom;
// const {Script} = require("vm");

var content = fs.readFileSync('gongshang2.html', {encoding: 'binary'});
var buf = new Buffer.from(content, 'binary');
var colorado_html = iconv.decode(buf, 'utf-8');
// console.log(colorado_html);

//  gongshang.html      重写了setTimeout   只执行一次
//  gongshang2.html     原始页面

plugins = [];
var options = {
    // referrer: "",
    userAgent: "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
    resources: "usable",    // 假如你想通过<script src="">来执行外部脚本，你需要确保已经加载了它们。为此，请添加选项resources:"usable"
    runScripts: "dangerously",  //要在页面内启用执行脚本
    url: 'http://www.gsxt.gov.cn/index.html',
    // virtualConsole: new jsdom.VirtualConsole(),
    cookieJar: new jsdom.CookieJar(),
    pretendToBeVisual: true,    //jsdom会假装它正在呈现和显示内容
    beforeParse(window) {
        window.document.addEventListener = (a, b, c) => {      // window 监听事件
            // console.log('a:' + a);
            // console.log('b:' + b);
            // console.log('c:' + c);
            return b()
        };

        window.screen = {
            availWidth: 1920,
            availHeight: 1040,
            width: 1920,
            height: 1080,
            availLeft: 0,
            availTop: 0,
            colorDepth: 24,
            pixelDepth: 24,
            orientation: {
                angle: 0,
                type: "landscape-primary",
                onchange: null
            }
        };
        // window.navigator.languages = ["zh-CN", "zh"];
        // window.navigator.plugins = plugins;
        // window.navigator.getBattery = () => {
        //     return {
        //         'charging': true,
        //         'chargingTime': 0,
        //         'dischargingTime': Infinity,
        //         'level': 1,
        //     }
        // };
        // window.navigator.mimeTypes = [{"type": "application/360softmgrplugin"},
        //     {"type": "application/aliedit"}, {"type": "application/asx"},
        //     {"type": "application/bd-npyunwebdetect-plugin"}, {"type": "application/cenroll.cenroll.version.1"},
        //     {"type": "application/futuresplash"}, {"type": "application/futuresplash"},
        //     {"type": "application/futuresplash"}, {"type": "application/futuresplash"}, {"type": "application/hwepass2001.installepass2001"},
        //     {"type": "application/hwpta.itrushwpta"}, {"type": "application/hwwdkey.installwdkey"}, {"type": "application/itrusenroll.certenroll.version.1"},
        //     {"type": "application/mozilla-npqihooquicklogin"}, {"type": "application/npalicdo"},
        //     {"type": "application/npalissologin"}, {"type": "application/npqqwebgame"},
        //     {"type": "application/nptxsso"}, {"type": "application/npxf-qqminidl"}, {"type": "application/npxluser_plugin"},
        //     {"type": "application/pdf"}, {"type": "application/pta.itruspta.version.1"}, {"type": "application/qscall-plugin"}]
        // window.navigator.connection = {
        //     'downlink': 3.05,
        //     'effectiveType': '4g',
        //     'rtt': 50,
        //     'saveData': false
        // };
        // window.Infinity = Infinity;
    },

};

const dom = (new JSDOM(colorado_html, options));
// const dom = (new JSDOM(colorado_html,  {runScripts: "outside-only" }));
// const window = dom.window;

const window = dom.window;


// window.addEventListener('load', function () {        // 待页面加载完
//     console.log('load:' + window.document.cookie)
// });

console.log('end: ' + window.document.cookie);
//   __jsl_clearance=1578297179.917|0|At%2BVITtfXhuL5y%2BdO%2F6NA3WYMO8%3D