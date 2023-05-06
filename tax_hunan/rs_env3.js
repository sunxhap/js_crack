
Window = function () {
};

num = 0;

// -----------------------------------
global_getTime = 0;

// -----------------------------------

Window.prototype = global;
window = new Window();
window.execScript = undefined;
window.top = window;
window.self = window;
window.name = '';
window.url = '';
window.load = [];


location = {
    "href": "https://hunan.chinatax.gov.cn/index.html",
    "host": "hunan.chinatax.gov.cn",
    "hostname": "hunan.chinatax.gov.cn",
    "origin": "https://hunan.chinatax.gov.cn",
    "protocol": "https:",
    "pathname": "/index.html",
    "search": "",
    "port": "",
    "hash": ""
  }

_replace = function () {
    return 'function _replace() { [native code] }'
}

location.replace = _replace;


addEventListener = function (a, b, c) {
    if (a == 'load') {
        //b()
        window.load.push(b)
    } else {
        window[a] = b;
    }
}
webkitPersistentStorage = {
    toString: function () {
        return '[object DeprecatedStorageQuota]'
    }
}
window.addEventListener = addEventListener
appendChild = function () {
}
removeChild = function () {
}
getAttribute = function (a) {
    if (a == 'r') {
        return 'm'
    }
    if (['selenium', 'webdriver', 'driver', 'onload', 'onsubmit']['indexOf'](a) != -1) {
        return null
    }
}

getElementsByTagName = function (a) {
    result = []
    if (a == 'meta') {
        result = [{
            'content': window.meta_content,
            getAttribute: getAttribute,
            parentNode: {
                removeChild: removeChild,
            }
        }, {
            'content': window.meta_content,
            getAttribute: getAttribute,
            parentNode: {
                removeChild: removeChild,
            }
        }]
    }
    if (a == 'script') {
        result = [{
            getAttribute: getAttribute,
            parentElement: {
                removeChild: removeChild
            }
        }, {
            getAttribute: getAttribute,
            parentElement: {
                removeChild: removeChild
            }
        }]
    }
    return result
}
getContext = function () {
    result = {
        canvas: {
            toDataURL: function () {
                return 'data:image/png;base64,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'
            }
        },
        DEPTH_BUFFER_BIT: 256,
        STENCIL_BUFFER_BIT: 1024,
        COLOR_BUFFER_BIT: 16384,
        POINTS: 0,
        LINES: 1,
        LINE_LOOP: 2,
        LINE_STRIP: 3,
        TRIANGLES: 4,
        TRIANGLE_STRIP: 5,
        TRIANGLE_FAN: 6,
        VERTEX_SHADER: 35633,
        FRAGMENT_SHADER: 35632,
        MEDIUM_FLOAT: 36337,
        HIGH_FLOAT: 36338,
        HIGH_INT: 36341,
        LOW_FLOAT: 36336,
        MEDIUM_INT: 36340,
        LOW_INT: 36339,
        textBaseline: '',
        font: '',
        fillStyle: '',
        fillRect: function () {
        },
        fillText: function () {
        },
        createBuffer: function () {
            return {
                itemSize: 0,
                numItems: 0
            }
        },
        bindBuffer: function () {
        },
        bufferData: function () {
        },
        createProgram: function () {
            return {}
        },
        linkProgram: function () {
        },
        useProgram: function () {
        },
        createShader: function () {
        },
        shaderSource: function () {
        },
        compileShader: function () {
        },
        attachShader: function () {
        },
        getAttribLocation: function () {
        },
        getUniformLocation: function () {
        },
        enableVertexAttribArray: function () {
        },
        vertexAttribPointer: function () {
        },
        uniform2f: function () {
        },
        drawArrays: function () {
        },
        getShaderPrecisionFormat: function (a, b) {
            var rangeMin, rangeMax, precision;
            if ([36338, 36337, 36336].indexOf(b) != -1) {
                rangeMin = 127
                rangeMax = 127
                precision = 23
            }
            if ([36341, 36340, 36339].indexOf(b) != -1) {
                rangeMin = 31
                rangeMax = 30
                precision = 0
            }
            return {
                rangeMin: rangeMin,
                rangeMax: rangeMax,
                precision: precision
            }
        },
        getSupportedExtensions: function () {
            return ['ANGLE_instanced_arrays', 'EXT_blend_minmax', 'EXT_color_buffer_half_float', 'EXT_disjoint_timer_query', 'EXT_float_blend', 'EXT_frag_depth', 'EXT_shader_texture_lod', 'EXT_texture_compression_bptc', 'EXT_texture_compression_rgtc', 'EXT_texture_filter_anisotropic', 'WEBKIT_EXT_texture_filter_anisotropic', 'EXT_sRGB', 'KHR_parallel_shader_compile', 'OES_element_index_uint', 'OES_fbo_render_mipmap', 'OES_standard_derivatives', 'OES_texture_float', 'OES_texture_float_linear', 'OES_texture_half_float', 'OES_texture_half_float_linear', 'OES_vertex_array_object', 'WEBGL_color_buffer_float', 'WEBGL_compressed_texture_s3tc', 'WEBKIT_WEBGL_compressed_texture_s3tc', 'WEBGL_compressed_texture_s3tc_srgb', 'WEBGL_debug_renderer_info', 'WEBGL_debug_shaders', 'WEBGL_depth_texture', 'WEBKIT_WEBGL_depth_texture', 'WEBGL_draw_buffers', 'WEBGL_lose_context', 'WEBKIT_WEBGL_lose_context', 'WEBGL_multi_draw']
        },
        getExtension: function (a) {
            return a
        },
        getParameter: function () {
            return null
        }
    }
    return result
}
createElement = function (a) {
    result = {
        getElementsByTagName: getElementsByTagName,
        style: {
            visibility: '',
            // msTextSizeAdjust:""
        },
        innerHTML: '',
        children: [{
            offsetWidth: 1326,
            offsetHeight: 150,
            style: {
                fontFamily: ''
            }
        }],
        width: 0,
        height: 0,
        getContext: getContext,
        toDataURL: function () {
            return 'data:image/png;base64,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'
        }

    }
    for (var i in location) {
        result[i] = location[i]
    }
    Object.defineProperty(result.children[0].style, 'fontFamily', {
        get: function () {
            return value
        },
        set: function (newValue) {
            if (['Verdana', 'Helvetica Neue LT Pro 35 Thin', 'tahoma', 'verdana', 'times new roman', 'Courier New', 'Microsoft Himalaya', 'helvetica', 'LG-FZKaTong-M19-V2.2', 'Georgia', 'georgia', 'courier new', 'Arial', 'arial', 'cursive', 'times', 'fantasy', 'courier', 'serif', 'monospace', 'Times New Roman'].indexOf(newValue) != -1) {
                result.children[0].offsetWidth = 1327
            } else {
                result.children[0].offsetWidth = 1326
            }
            value = newValue
        }
    });
    return result
}
getElementById = function (a) {
    return null
}
exitFullscreen = function () {
}
DOMParser = function () {
}
localStorage = {
    setItem: function (a, b) {
        this[a] = b
    },
    getItem: function (a) {
        return this[a] || null
    },
    removeItem: function (a) {
        delete this[a]
    },
}
sessionStorage = localStorage;

Navigator = function () {
};
Navigator.prototype = {
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36',
    appVersion: '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36',
    mimeTypes: [{
        type: 'application/pdf'
    }, {
        type: 'text/pdf'
    }],
    plugins: [{
        name: 'PDF Viewer'
    }, {
        name: 'Chrome PDF Viewer'
    }, {
        name: 'Chromium PDF Viewer'
    }, {
        name: 'Microsoft Edge PDF Viewer'
    }, {
        name: 'WebKit built-in PDF'
    }],
    webkitPersistentStorage: webkitPersistentStorage,
    connection: {
        downlink: 5.9,
        effectiveType: "4g",
        onchange: null,
        rtt: 250,
        saveData: false
    },
    // getBattery: getBattery,
    cookieEnabled: true,
    webdriver: false,
    languages: ['zh-CN'],
    hasOwnProperty: function () {
        return false
    },
    platform: 'Win32',
    maxTouchPoints: 0,
    msMaxTouchPoints: undefined
}
navigator = new Navigator()
clientInformation = navigator;
document = {
    location: location,
    implementation: {},
    URL: location.href,
    documentURI: location.href,
    compatMode: 'BackCompat',
    characterSet: 'UTF-8',
    charset: 'UTF-8',
    inputEncoding: 'UTF-8',
    contentType: 'text/html',
    doctype: null,
    documentElement: {
        style: {},
        getAttribute: getAttribute,
        onresize: function () {
        },
        addEventListener: addEventListener
    },
    xmlEncoding: null,
    xmlVersion: null,
    xmlStandalone: false,
    domain: 'hunan.chinatax.gov.cn',
    referrer: '',
    cookie: '',
    lastModified: '04/19/2022 22:34:37',
    readyState: 'loading',
    title: '国家企业信用信息公示系统',
    dir: '',
    body: {
        tagName: 'BODY',
        firstChild: {
            nodeType: 3,

        },
        getAttribute: getAttribute,
        appendChild: appendChild,
        onmouseenter: function () {
        },
        style: {
            backgroundBlendMode: function () {
            },
            lineBreak: function () {
            },
            minWidth: function () {
            },
            textAlignLast: function () {
            }
        }
    },
    head: {},
    images: {},
    embeds: {},
    plugins: {},
    links: {},
    forms: {},
    scripts: {},
    currentScript: {},
    defaultView: window,
    designMode: 'off',
    onreadystatechange: null,
    anchors: {},
    applets: {},
    fgColor: '',
    linkColor: '',
    vlinkColor: '',
    alinkColor: '',
    bgColor: '',
    all: [{}, {}, {}, {}, {}, {}],
    scrollingElement: null,
    onpointerlockchange: null,
    onpointerlockerror: null,
    hidden: false,
    visibilityState: 'visible',
    wasDiscarded: false,
    featurePolicy: {},
    webkitVisibilityState: 'visible',
    webkitHidden: false,
    onbeforecopy: null,
    onbeforecut: null,
    onbeforepaste: null,
    onfreeze: null,
    onresume: null,
    onsearch: null,
    onvisibilitychange: null,
    fullscreenEnabled: true,
    fullscreen: false,
    onfullscreenchange: false,
    onfullscreenerror: null,
    webkitIsFullScreen: false,
    webkitCurrentFullScreenElement: null,
    webkitFullscreenEnabled: true,
    webkitFullscreenElement: null,
    onwebkitfullscreenchange: null,
    onwebkitfullscreenerror: null,
    rootElement: null,
    onbeforexrselect: null,
    onabort: null,
    onblur: null,
    oncancel: null,
    cookieobj: {},
    webkitPersistentStorage: webkitPersistentStorage,
    getAttribute: getAttribute,
    appendChild: appendChild,
    onmouseenter: function () {
    },
    style: {
        backgroundBlendMode: function () {
        },
        lineBreak: function () {
        },
        minWidth: function () {
        },
        textAlignLast: function () {
        }
    },
    createElement: createElement,
    getElementsByTagName: getElementsByTagName,
    addEventListener: addEventListener,
    exitFullscreen: exitFullscreen,
    getElementById: getElementById,
    onmousemove: function () {
    },
    onselectionchange: function () {
    },
    scrollingElement: {
        style: {
            fontVariantNumeric: function () {
            }
        }
    }
}
Object.defineProperty(document, 'cookie', {
    get: function () {
        return value
    },
    set: function (newValue) {
        // debugger
        var ck = newValue.split('=');
        if (ck.length >= 2) {
            var ckkey = ck[0];
            var ckvalue = ck[1];
            if (ckvalue.indexOf(';') != -1) {
                ckvalue = ck[1].split(';')[0];
            } else {
                ckvalue = ck[1];
            }
            document.cookieobj[ckkey] = ckvalue;

            if (ckkey == 'CXYlUDpRKrs0P') {
                console.log('CXYlUDpRKrs0P---', ckvalue.length, ckvalue);
            }
        }
        value = newValue
    }
});


// hunan
self = window;
Window.navigator = Navigator();

let crypto = require("crypto");
window.crypto = crypto.webcrypto;
