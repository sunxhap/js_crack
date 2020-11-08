
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


function randomString(len) {
    // 随机固定长度
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


function random_set_params() {
    random_cookie = randomWord(true, 100, 200);

    random_availHeight = randomNum(800, 1020);
    random_availWidth = randomNum(800, 1020);

    random_outerHeight = randomNum(800, 1020);
    random_innerHeight = randomNum(500, 920);
    random_outerWidth = randomNum(250, 1536);
    random_innerWidth = randomNum(0, 900);

    window.document.cookie = random_cookie;
    window.screen.availHeight = random_availHeight;
    window.screen.availWidth = random_availWidth;

    window.outerHeight = random_outerHeight;
    window.innerHeight = random_innerHeight;           // 150, 969
    window.outerWidth = random_outerWidth;            // 1536
    window.innerWidth = random_innerWidth;           // 0

    console.log({
        'random_cookie': random_cookie,
        'random_availHeight': random_availHeight,
        'random_availWidth': random_availWidth,
        'random_outerHeight': random_outerHeight,
        'random_innerHeight': random_innerHeight,
        'random_outerWidth': random_outerWidth,
        'random_innerWidth': random_innerWidth
    })

}


plugins = [
    {
        'description': "APlayer III ActiveX hosting plugin for Firefox",
        'filename': "npaplayer.dll",
        'length': 1,
        'name': "APlayer ActiveX hosting plugin"
    },
    {
        'description': "ASUS Update",
        'filename': "npAsusUpdate3.dll",
        'length': 1,
        'name': "ASUS Update"
    }
];

any_plugins = true;

if (any_plugins) {
    for (var i = 0; i < 10; i++) {
        var p = {
            'description': randomString(parseInt(Math.random() * 20)),
            'filename': randomString(parseInt(Math.random() * 20)) + ".dll",
            'length': 1,
            'name': randomString(parseInt(Math.random() * 10))
        };

        plugins.push(p)
    }
}

window = {
    document: {
        // cookie: '',
        cookie: randomWord(true, 100, 200),
        createElement: function (tag) {
            if (tag == "canvas") {
                return canvas
            } else if (tag == "caption") {
                return {
                    tagName: "CAPTION"
                }
            }

        },
        getElementById: function () {
            return false
        },
        toString: function () {
            "function createElement() { [native code] }"
        },
        title: ""
    },
    moveBy: function () {
    },
    moveTo: function () {
    },
    open: function () {
    },
    dispatchEvent: function () {
        return true
    },
    screen: {
        availHeight: randomNum(800, 1020),      // todo 824  1040
        availWidth: randomNum(350, 1536),        // todo 1536   1920
        // 下未检测
        width: 1920, height: 1080, colorDepth: 24, pixelDepth: 24, availLeft: 0, availTop: 0,
        orientation: {
            angle: 0,
            onchange: null,
            type: "landscape-primary"
        }
    },
    navigator: {
        cookieEnabled: true,
        language: "zh-CN",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36",
        appVersion: "5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36",
        appCodeName: 'Mozilla',

        // 下面未检测
        appName: 'Netscape',
        connection: {
            'connection': null, 'effectiveType': "4g", 'rtt': 50, 'downlink': 10, 'saveData': false
        },
        deviceMemory: 8,
        hardwareConcurrency: 8,
        doNotTrack: null,
        languages: ["zh-CN", "zh"],
        onLine: true,
        platform: 'Win32',
        product: 'Gecko',
        productSub: '20030107',
        vendor: "Google Inc.",
        vendorSub: "",

        plugins: plugins            // todo 插件
    },
    location: {
        hostname: "www.zhipin.com",
        href: "https://www.zhipin.com/"
    },
    OfflineAudioContext: function () {
        this.createOscillator = function () {
            return {
                frequency: {
                    setValueAtTime: function () {
                    }
                },
                connect: function () {
                },
                start: function () {
                },
            }
        },
            this.createDynamicsCompressor = function () {
                return {
                    threshold: {
                        setValueAtTime: function () {
                        },
                    },
                    setValueAtTime: function () {
                    },
                    knee: {
                        setValueAtTime: function () {
                        },
                    },
                    ratio: {
                        setValueAtTime: function () {
                        },
                    },
                    reduction: {
                        setValueAtTime: function () {
                        },
                    },
                    attack: {
                        setValueAtTime: function () {
                        },
                    },
                    release: {
                        setValueAtTime: function () {
                        },
                    },
                    connect: function () {
                    },
                }
            },
            this.startRendering = function () {
            }
    },
    history: {length: randomNum(1, 5), scrollRestoration: "auto", state: null},
    outerHeight: randomNum(800, 1020),          // 824 1040
    innerHeight: randomNum(200, 920),           // 150, 969
    outerWidth: randomNum(150, 1536),            // 1536
    innerWidth: randomNum(0, 900),           // 0
    Math: Math,

    // todo add
    parseFloat: parseFloat,
    parseInt: parseInt,
    isNaN: isNaN,
    decodeURI: decodeURI,
    decodeURIComponent: decodeURIComponent,
    encodeURI: encodeURI,
    encodeURIComponent: encodeURIComponent,
    escape: escape,
    unescape: unescape,
    eval: eval,
    Date: Date,

    getComputedStyle: function () {
        debugger
    },
};
window.open.toString = function () {
    return "function open() { [native code] }"
};


document = window.document;
navigator = window.navigator;
screen = window.screen;
canvas = {
    getContext: function getContext() {
        return CanvasRenderingContext2D
    },
    toDataURL: function toDataURL() {
        // 实际为canvas画布填充了“"k54kk5cA4*"”字样后，转成的图片链接
        // k5454?MOBk
        console.log('toDataURL');
        return 'data:image/png;base64,' + randomWord(true, 100, 300);
        // return "data:image/png;base64,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"
        // return "data:image/png;base64,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"
        // return "data:image/png;base64,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"
    },
};

CanvasRenderingContext2D = {
    fillRect: function () {
    },
    fillText: function () {
    }
};

localStorage = {
    removeItem: function (key) {
        delete this[key]
    },
    getItem: function (key) {
        return this[key] ? this[key] : null;
    },
    setItem: function (key, value) {
        this[key] = "" + value;
    },
};

sessionStorage = {
    removeItem: function (key) {
        delete this[key]
    },
    getItem: function (key) {
        return this[key] ? this[key] : null;
    },
    setItem: function (key, value) {
        this[key] = "" + value;
    },
};
setInterval = window.setInterval = function () {
};
setInterval.toString = function () {
    return "function setInterval() { [native code] }"
};
setTimeout = function () {
};

top = window.top = window;
// global = undefined;
child_process = undefined;
closed = {
    __proto__: (1 >> 3 > 4)["__proto__"]
};




function get_cookie(seed, ts, code) {

    random_set_params();
    // info = random_set_params();
    info = {};

    var Buffer;
    process = undefined;
    function CustomEvent() {}
    eval(code);

    // todo 计算时间差 ABC[Cu[b('0x209')]]['t'] = new Date()[b('0x8f')]() - CH; 防止debugger
    var abc = new ABC();
    // ABC.prototype.t(){
    //     return 10;
    // }
    // ABC['prototype'] = {'t': 1};
    var randomNum_time = randomNum(10, 25);
    info.randomNum_time = randomNum_time;
    abc['prototype'] = {'t': randomNum_time};
    cookie = encodeURIComponent(abc.z(seed, parseInt(ts)+(480+new Date().getTimezoneOffset())*60*1000));
    console.log('t', abc['prototype']['t']);

    // cookie = encodeURIComponent(new ABC().z(seed, parseInt(ts)+(480+new Date().getTimezoneOffset())*60*1000))
    console.log({cookie, cookie});

    info['cookie'] = cookie;
    return info;
}

module.exports = {
    get_cookie
}

