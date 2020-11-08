


// window = new Proxy(global, {
//     get: function (target, key, receiver) {
//         console.log("window.get", key, target[key]);
//         // if (key=="location"){
//         //     location = new Proxy(target[key], {
//         //         get: function (_target, _key, _receiver) {
//         //             console.log("window.get", key, _key, _target[_key]);
//         //             if (_key=="port"){console.log("关注公众号【妄为写代码】")}
//         //             return _target[_key];
//         //         }
//         //     })
//         // }
//         return target[key];
//     },
//     set: function (target, key, value, receiver) {
//         console.log("window.set", key, value);
//         target[key] = value;
//     }
// });



//  "length", hasOwnProperty
window_keys = ["parent","opener","top", "length", "frames","closed","location","self","window","document","name","customElements","history","locationbar","menubar","personalbar","scrollbars","statusbar","toolbar","status","frameElement","navigator","origin","external","screen","innerWidth","innerHeight","scrollX","pageXOffset","scrollY","pageYOffset","visualViewport","screenX","screenY","outerWidth","outerHeight","devicePixelRatio","clientInformation","screenLeft","screenTop","defaultStatus","defaultstatus","styleMedia","onsearch","onwebkitanimationend","onwebkitanimationiteration","onwebkitanimationstart","onwebkittransitionend","isSecureContext","onabort","onblur","oncancel","oncanplay","oncanplaythrough","onchange","onclick","onclose","oncontextmenu","oncuechange","ondblclick","ondrag","ondragend","ondragenter","ondragleave","ondragover","ondragstart","ondrop","ondurationchange","onemptied","onended","onerror","onfocus","onformdata","oninput","oninvalid","onkeydown","onkeypress","onkeyup","onload","onloadeddata","onloadedmetadata","onloadstart","onmousedown","onmouseenter","onmouseleave","onmousemove","onmouseout","onmouseover","onmouseup","onmousewheel","onpause","onplay","onplaying","onprogress","onratechange","onreset","onresize","onscroll","onseeked","onseeking","onselect","onstalled","onsubmit","onsuspend","ontimeupdate","ontoggle","onvolumechange","onwaiting","onwheel","onauxclick","ongotpointercapture","onlostpointercapture","onpointerdown","onpointermove","onpointerup","onpointercancel","onpointerover","onpointerout","onpointerenter","onpointerleave","onselectstart","onselectionchange","onanimationend","onanimationiteration","onanimationstart","ontransitionend","onafterprint","onbeforeprint","onbeforeunload","onhashchange","onlanguagechange","onmessage","onmessageerror","onoffline","ononline","onpagehide","onpageshow","onpopstate","onrejectionhandled","onstorage","onunhandledrejection","onunload","performance","stop","open","alert","confirm","prompt","print","queueMicrotask","requestAnimationFrame","cancelAnimationFrame","captureEvents","releaseEvents","requestIdleCallback","cancelIdleCallback","getComputedStyle","matchMedia","moveTo","moveBy","resizeTo","resizeBy","scroll","scrollTo","scrollBy","getSelection","find","webkitRequestAnimationFrame","webkitCancelAnimationFrame","fetch","btoa","atob","setTimeout","clearTimeout","setInterval","clearInterval","createImageBitmap","close","focus","blur","postMessage","onappinstalled","onbeforeinstallprompt","crypto","indexedDB","webkitStorageInfo","sessionStorage","localStorage","chrome","onpointerrawupdate","speechSynthesis","webkitRequestFileSystem","webkitResolveLocalFileSystemURL","openDatabase","applicationCache","caches","ondevicemotion","ondeviceorientation","ondeviceorientationabsolute","loadErrors","checkCdnCookie","webpackJsonp","__core-js_shared__","core","global","System","asap","Observable","setImmediate","clearImmediate","regeneratorRuntime","_babelPolyfill","IEVersion","gio","tag","GrLocalStore","MutationSummary","Utils","grSource","_gr_support_circle_pop_out","grSdkInstalled","vds","grBlind","grWaitTime","trackHostUrl","grImpCtrl","gioGlobalArray","_vds"];
// window = {};
_window = window;
window = {
    hasOwnProperty: function () {           // hasOwnProperty  重写
        return true
    },
    Math: Math,

    // todo add
    // parseFloat: parseFloat,
    // parseInt: parseInt,
    // isNaN: isNaN,
    decodeURI: decodeURI,
    decodeURIComponent: decodeURIComponent,
    encodeURI: encodeURI,
    // encodeURIComponent: encodeURIComponent,
    // escape: escape,
    // unescape: unescape,
    eval: eval,
    // Date: Date,

    // getComputedStyle: function () {
    //     debugger
    // },
};

window_keys.forEach(function (item, index, arr) {
    Object.defineProperty(window, item, {
        get: function() {
            if(item == 'window'){
                console.log('Getting ' + item , _window);
                return _window
            }else{
                console.log('Getting ' + item , _window[item]);
                return _window[item];
            }

        },
        set: function(val) {
            console.log('Setting ' + item , val);
            _window[item] = val;
        }
    })
});

// todo window 本身的方法 无法get,set 需自定义 例如 eva, decodeURI
// 监测不够深入，容易漏检测