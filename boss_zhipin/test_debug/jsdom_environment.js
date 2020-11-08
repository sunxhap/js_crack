window = dom.window;
document = window.document;
document.title = '';
document.cookie = '';
// document.cookie = randomWord(true,30, 200);

XMLHttpRequest = window.XMLHttpRequest;
navigator = window.navigator;

screen = new Object();
screen.availHeight = randomNum(940, 1040);         // 1040   返回当前屏幕高度(空白空间)
screen.availWidth = randomNum(1820, 1920);       // 1920    返回当前屏幕宽度(空白空间)
screen.availLeft = 0;               // 返回浏览器可用空间左边距离屏幕（系统桌面）左边界的距离
screen.availTop = 0;
screen.colorDepth = 24;             // 24   颜色深度

screen.height = screen.availHeight + randomNum(0, 40);    //  1080  返回当前屏幕高度(分辨率值)
screen.width = screen.availWidth + randomNum(0, 20);      //  1920  返回当前屏幕宽度(分辨率值)
screen.pixelDepth = randomNum(22, 26);         //  24 颜色分辨率

screen.orientation = {
    angle: 0,
    onchange: null,
    type: "landscape-primary"
};

window.screen = screen;
window.outerHeight = screen.availHeight - randomNum(0, 40);            // 1040  获取整个浏览器窗口的高度
window.innerHeight = screen.availWidth - randomNum(20, 60);              // 获取去除工具条与滚动条的窗口高度与宽度。
window.outerWidth = randomNum(140, 160);            //  160 返回窗口的外部宽度
window.innerHeight = randomNum(869, 969);                       // 969

window.length = 1;

window.location = {
    hostname: "www.zhipin.com",
    href: "https://www.zhipin.com/",
    origin: 'https://www.zhipin.com',
    host: 'www.zhipin.com',
    port: ''
};

window.history = {length: 5, scrollRestoration: "auto", state: null};
window.start_time = +new Date;
window.Date = Date;