
console.log('iiiii');
(function(D) {
    debugger;
        var E = D.env, doc = document, docurl = doc.location.href, share = null, lookup = [], ci = E.compId, loaded = false, oms = ci >= 20000000, ua = navigator.userAgent.toLowerCase(), id_s = "looyu_id", id_l = "looyu_" + ci, localdb, localtemp, homepage = oms && "http://www.looyuoms.com" || "http://www.talk99.cn", isBaidu = /baiduboxapp/i.test(ua), dct = [], sametime = 120, fpath = E.file + "/default/", conhtml, site = E.subComp || 0, winopt = "height=450,width=650,directories=no,location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=no,top=100,left=200", winH = window.innerHeight, htmlEle = document.getElementsByTagName("html")[0], supportFlash = (function() {
                var version = 0
                    , plug = navigator.plugins;
                if (plug && plug.length > 0 && plug["Shockwave Flash"]) {
                    var words = plug["Shockwave Flash"].description.split(" ");
                    for (var i = 0; i < words.length; i++) {
                        if (isNaN(parseInt(words[i]))) {
                            continue
                        }
                        version = words[i]
                    }
                } else {
                    try {
                        version = parseInt(new ActiveXObject("ShockwaveFlash.ShockwaveFlash").FlashVersion()) >>> 16
                    } catch (e) {}
                }
                return version >= 9
            }
        )();
        var getDomain = function(url) {
            url = url.replace(/^\w+:\/\//, "");
            var p = url.indexOf("/");
            if (p != -1) {
                url = url.substring(0, p)
            }
            var da = url.split(".")
                , len = da.length
                , start = 0;
            if (len > 2) {
                start = len - 2;
                var l2 = da[start];
                if (/org|com|net|jx|edu|xyz/.test(l2)) {
                    start = len - 3
                }
            }
            var rtn = "";
            while (start < len) {
                rtn += "." + da[start];
                start++
            }
            return rtn
        };
        var domain = getDomain(docurl);
        var $ = function(id) {
            return doc.getElementById(id)
        }
            , browser = {
            strict: doc.compatMode == "CSS1Compat",
            webkit: /webkit/i.test(ua),
            msie: /msie/i.test(ua) && !/opera/i.test(ua),
            gecko: !/webkit/i.test(ua) && /gecko/i.test(ua),
            safari: /safari/i.test(ua) && !/maxthon/i.test(ua),
            cacheswf: /theworld|se\s\d+|greenbrowser/i.test(ua),
            android: ua.indexOf("android") > -1,
            iPhone: ua.indexOf("iphone") > -1,
            winPhone: ua.indexOf("windows phone") > -1,
            iPad: ua.indexOf("ipad") > -1
        };
        $.mobile = browser.android || browser.iPhone || browser.winPhone;
        var securityPath = function(p) {
            return p
        };
        browser.ie6 = browser.msie && !/msie [789]/i.test(ua);
        browser.fix = !browser.msie || (!browser.ie6 && browser.strict);
        browser.ie6 && doc.execCommand("BackgroundImageCache", false, true);
        var blk = function(s) {
            s = s || "";
            return !(trim(s))
        }
            , trim = function(s) {
            return (s || "").replace(/^\s+|\s+$/, "")
        }
            , getCookie = function(name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            arr = (doc.cookie || "").match(reg);
            return arr ? unescape(arr[2]) : null
        }
            , setCookie = function(name, value, t) {
            var expStr = "";
            if (t != 0) {
                if (t == -1) {
                    t = 120 * 30 * 24 * 60 * 60
                }
                t = t * 1000;
                var exp = new Date();
                exp.setTime(exp.getTime() + t);
                expStr = exp.toGMTString()
            }
            doc.cookie = name + "=" + escape(value) + ";expires=" + expStr + ";domain=" + domain + ";path=/"
        }
            , delCookie = function(name) {
            setCookie(name, "", -3600)
        }
            , setShare = function(name, value, sec) {
            setCookie(name, value, sec)
        }
            , tpl = function(s, obj) {
            return s.replace(/\$?\{([a-zA-z0-9]*)\}/ig, function($1, $2) {
                return obj[$2]
            })
        }
            , cterPos = function(w, h) {
            return {
                top: (getBody().clientHeight - h) / 2,
                left: (getBody().clientWidth - w) / 2
            }
        }
            , stayPos = function(p, w, h) {
            return !p && cterPos(w, h) || p == 1 && {
                left: 5,
                bottom: 5
            } || p == 2 && {
                right: 5,
                bottom: 5
            }
        }
            , addClass = function(el, clz) {
            if (!el) {
                return
            }
            var nowClz = el.className;
            if (nowClz.indexOf(clz) == -1) {
                el.className = nowClz + " " + clz
            }
        }
            , removeClass = function(el, clz) {
            if (!el) {
                return
            }
            clz = " " + clz;
            var nowClz = el.className;
            if (nowClz.indexOf(clz) != -1) {
                el.className = nowClz.replace(clz, "")
            }
        };
        var have = doc.compareDocumentPosition ? function(a, b) {
                return a.compareDocumentPosition(b) & 16
            }
            : function(a, b) {
                return a !== b && (a.contains ? a.contains(b) : true)
            }
            , inB = (function() {
                var el = $("doyoo_panel") || $("doyoo_monitor");
                if (!doc.body) {
                    return false
                }
                if (!el) {
                    return true
                }
                var fms = doc.forms;
                for (var i = 0; i < fms.length; i++) {
                    if (have(fms[i], el)) {
                        return false
                    }
                }
                return true
            }
        )()
            , loadSWF = function(id, name) {
            var sharediv = $("doyoo_share");
            if (!sharediv) {
                ready(function() {
                    loadSWF(id, name)
                });
                return true
            }
            var path = fpath + "swf/" + name
                , str = ' <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="1" height="1" id="{id}"><param name="movie" value="{path}"/><param name="allowScriptAccess" value="always"/><embed src="{path}" allowScriptAccess="always" width="1" height="1" name="{id}" type="application/x-shockwave-flash"></embed></object> ';
            if (browser.cacheswf) {
                path += "?_t=" + +new Date()
            }
            var os = tpl(str, {
                path: path,
                id: id
            });
            sharediv.innerHTML = '<iframe src="about:blank" id="shareWrapper"></iframe>';
            show(sharediv);
            try {
                var h = '<html><head><script type="text/javascript">var domReady=false,doyoo={};doyoo.probe=function(){return parent.doyoo.probe();};doyoo.init=function(o){return parent.doyoo.init(o);};doyoo.domReady=function(){return domReady;};doyoo.shareReady=function(){parent.doyoo.shareReady();};window.onload=function(){domReady=true};window.findSWF=function(id,ie){return ie?window[id]:document[id];};<\/script></head><body><script type="text/javascript">document.write(\'' + os + "')<\/script></body></html>";
                var indoc = $("shareWrapper").contentWindow.document;
                indoc.open();
                indoc.write(h);
                indoc.close()
            } catch (e) {
                return false
            }
            return true
        }
            , findSWF = function(id) {
            var indoc = $("shareWrapper").contentWindow;
            return indoc.findSWF(id, browser.msie)
        }
            , jsonRequest = function(url, cb) {
            D.resp = null;
            var u = url + "&x=" + (+new Date())
                , h = doc.getElementsByTagName("head")[0]
                , s = createEle("script", {
                type: "text/javascript",
                src: u
            }, h);
            var callback = function(o) {
                var rst = D.resp;
                remove(o);
                cb && cb(rst)
            };
            if (s.addEventListener) {
                s.addEventListener("load", function() {
                    callback(this)
                }, false)
            } else {
                if (s.readyState) {
                    s.onreadystatechange = function() {
                        if (this.readyState == "loaded") {
                            callback(this)
                        }
                    }
                } else {
                    s.onload = function() {
                        callback(this)
                    }
                }
            }
        }
            , currentStyle = function(el) {
            return el.currentStyle || doc.defaultView.getComputedStyle(el, null)
        }
            , show = function(v) {
            if (typeof v == "string") {
                v = $(v)
            }
            if (v) {
                v.style.display = v.doyoo_old || "";
                if (currentStyle(v).display === "none") {
                    v.style.display = "block"
                }
            }
        }
            , hide = function(v) {
            if (typeof v == "string") {
                v = $(v)
            }
            if (v) {
                v.doyoo_old = v.style.display;
                v.style.display = "none"
            }
        }
            , remove = function(nd) {
            nd && nd.parentNode && nd.parentNode.removeChild(nd)
        }
            , attachE = function(t, e, f) {
            if (!t) {
                return
            }
            var re = /[a-z]+/ig, attr;
            while ((attr = re.exec(e)) != null) {
                var at = attr[0];
                if (t.addEventListener) {
                    t.addEventListener(at, f, false)
                } else {
                    if (t.attachEvent) {
                        t.attachEvent("on" + at, f)
                    } else {
                        t["on" + at] = f
                    }
                }
            }
        }
            , detachE = function(t, e, f) {
            if (t.removeEventListener) {
                t.removeEventListener(e, f, false)
            } else {
                if (t.detachEvent) {
                    t.detachEvent("on" + e, f)
                } else {
                    t["on" + e] = null
                }
            }
        }
            , obj2str = function(obj) {
            var a = [];
            each(obj, function(l, v) {
                a.push(l + "=" + encodeURIComponent(v) || "")
            });
            return a.join("&")
        }
            , guessR = function() {
            var re = /looyu_ext(\d)=(\w+)(?:&|$)/ig;
            var rst = [], mt;
            while ((mt = re.exec(docurl)) != null) {
                rst.push("ext" + mt[1], mt[2])
            }
            return rst.length ? ("#params:" + rst.join(",")) : ""
        }
            , each = function(obj, func) {
            if (obj) {
                for (var v in obj) {
                    if (typeof obj[v] != "function" && obj.hasOwnProperty(v)) {
                        func(v, obj[v])
                    }
                }
            }
        }
            , getBody = function() {
            return !browser.strict ? doc.body : doc.documentElement
        }
            , sTop = function() {
            return getBody().scrollTop || doc.body.scrollTop
        }
            , sLeft = function() {
            return getBody().scrollLeft || doc.body.scrollLeft
        }
            , fixTop = function() {
            return browser.fix ? 0 : sTop()
        }
            , upDenied = function() {
            setCookie(denyKey, monDenied, sametime)
        }
            , upvid = function() {
            getCookie(id_s) != localdb && setCookie(id_s, localdb, -1);
            setCookie(id_l, getCookie(id_l) || localtemp, sametime);
            setTimeout(upvid, 60000)
        }
            , sameSite = function(loc) {
            return getDomain(loc) == getDomain(docurl)
        }
            , parseUrl = function(url) {
            var urlRegexp = /^(https?\:)?\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?([^#]*|))(#.*|)$/;
            var match = (url || "").match(urlRegexp), info;
            if (match) {
                info = {
                    domain: match[3],
                    port: match[4] || 80,
                    path: match[5],
                    query: match[6]
                };
                var params = (info.query || "").split("&")
                    , pairs = {};
                for (var i = 0; i < params.length; i++) {
                    var a = params[i].split("=", 2);
                    pairs[a[0]] = a[1] || ""
                }
                info.param = pairs
            }
            return info
        }
            , ignoreLongParam = function(url, max) {
            var urlArray = url.split("?", 2);
            if (urlArray.length == 2) {
                var rtn = []
                    , info = parseUrl(url);
                for (var j in info.param) {
                    var value = info.param[j] || "";
                    if (info.param.hasOwnProperty(j)) {
                        if (j.length > max || value.length > max) {
                            continue
                        }
                        rtn.push(j + "=" + value)
                    }
                }
                url = urlArray[0] + "?" + rtn.join("&")
            }
            return url
        }
            , shortURL = function(l) {
            if (!l || l.indexOf("http") !== 0) {
                return ""
            }
            return l
        }
            , createEle = function(tag, opt, tar) {
            var d = doc.createElement(tag);
            (tar || doc.body).appendChild(d);
            if (typeof opt === "string") {
                opt = {
                    id: opt
                }
            }
            each(opt || {}, function(l, v) {
                v && d.setAttribute(l, v)
            });
            return d
        }
            , commonURL = function() {
            var obj = {
                c: ci,
                v: E.vId,
                u: E.uId,
                f: E.confId,
                site: site,
                p0: E.p0
            };
            if (E.counter) {
                obj.ct = E.counter
            }
            if (E.lang) {
                obj.lang = E.lang
            }
            if (E.keyword) {
                obj.keyword = E.keyword
            }
            extend(obj, {
                refer: shortURL(E.refer),
                loc: shortURL(docurl)
            });
            E.reseve = window.reseveKey;
            if (!E.reseve || E.reseve == "" || E.reseve == "null") {
                E.reseve = getCookie("_DOYOO_RESEVE_KEY")
            }
            if (E.reseve && E.reseve != "null") {
                obj.r = E.reseve
            }
            obj._d = +new Date();
            return obj2str(obj)
        }
            , chatURL = function(ch) {
            if (!E.uId) {
                return "#"
            }
            var url = E.chat + "/chat/p.do?";
            var md = 1
                , ot = [];
            if (!ch || typeof ch == "object") {
                if (ch && ch.type) {
                    ot.push("cId=" + ch.m)
                }
                if (ch && (ch.sId || ch.g)) {
                    ot.push("command=" + (ch.force && "forceChat" || ch.sId && "applyChat" || "inviteChat"));
                    ot.push("t=" + ch.type);
                    ot.push(ch.sId ? ("n=" + ch.sId) : ("g=" + ch.g));
                    md = ch.g && 7 || ch.m && 3 || ch.force && 6 || 1
                } else {
                    var cg = D.monParam && D.monParam.group;
                    if (cg && cg != "0") {
                        ot.push("g=" + cg)
                    }
                    md = 5
                }
            } else {
                if (typeof ch == "string" && ch) {
                    ot.push(ch);
                    md = 2
                }
            }
            ot.push("md=" + md);
            return url + ot.join("&") + "&" + commonURL()
        }
            , openChat = function(ch, ur, link) {
            if (link && typeof doyooClickExtend == "function") {
                var rtn = doyooClickExtend(link);
                if (rtn) {
                    E.reseve = rtn
                }
            }
            if ($.mobile || D.chat.priorMiniChat) {
                m.force(ch, 0, 1);
                return false
            }
            var url = ur || ch && chatURL(ch) || m && m.talk || chatURL("g=");
            try {
                var cw = window.open(url, "chat_" + (+new Date()), winopt);
                cw.focus()
            } catch (e) {
                if (ch.force || $.mobile) {
                    window.location = url
                }
            }
            return false
        }
            , extend = function(o, ch) {
            o && arguments[2] && extend(o, arguments[2]);
            if (o && ch && typeof ch == "object") {
                for (var v in ch) {
                    ch.hasOwnProperty(v) && (o[v] = ch[v])
                }
            }
            return o
        }
            , fly = function(v, g, w, h, pos) {
            pos = pos || cterPos(200, 75);
            v = (typeof v == "string") ? $(v) : v;
            if (!v) {
                return
            }
            var f = new flier(v,g,w,h,pos);
            ready(f.start.doyoodg(f));
            return f
        }
            , fade = function(o) {
            var opcity = function() {
                var args = arguments
                    , obj = args[0]
                    , f = obj.style.filter;
                if (args.length == 2) {
                    var v = args[1];
                    browser.msie && (obj.style.filter = "alpha(opacity=" + v + ")") || (obj.style.opacity = v / 100)
                } else {
                    if (browser.msie) {
                        return f && f.indexOf("opacity=") >= 0 ? (parseInt(f.match(/opacity=([^)]*)/)[1])) : 100
                    } else {
                        return obj.style.opacity * 100
                    }
                }
            };
            opcity(o, 0);
            show(o);
            var doFade = function() {
                var op = opcity(o);
                if (op < 100) {
                    opcity(o, op + 5);
                    setTimeout(doFade, 100)
                } else {
                    o.style.filter = "";
                    o.style.backgroundColor = "transparent"
                }
            };
            o.style.backgroundColor = "#FFF";
            doFade()
        }
            , slide = function(o, pos, tar) {
            show(o);
            var w = parseInt(o.offsetWidth || 500)
                , h = parseInt(o.offsetHeight || 300)
                , pw = getBody().clientWidth
                , ph = getBody().clientHeight
                , sp = [0 - h + fixTop(), sLeft() + pw, ph + fixTop(), 0 - w + sLeft()]
                , rp = ["top", "left"];
            var sv = sp[pos]
                , d = pos % 2
                , tv = d ? (tar.left || (pw - tar.right - w)) : (tar.top || (ph - tar.bottom - h))
                , td = d ? "left" : "top";
            var setP = function(v) {
                o.style[td] = v + "px"
            };
            setP(sv);
            var doSlide = function() {
                var stv = tv + (d ? sLeft() : fixTop());
                if (Math.abs(stv - sv) > 4) {
                    sv += (stv > sv ? 4 : -4);
                    setP(sv);
                    setTimeout(doSlide, 1)
                } else {
                    setP(stv)
                }
            };
            doSlide()
        }
            , ready = (function() {
                var func = []
                    , domCheck = false;
                var exec = function() {
                    if (loaded) {
                        return
                    }
                    loaded = true;
                    for (var i = 0; i < func.length; i++) {
                        func[i]()
                    }
                };
                var domLoaded;
                if (doc.addEventListener) {
                    domLoaded = function() {
                        doc.removeEventListener("DOMContentLoaded", domLoaded, false);
                        exec()
                    }
                } else {
                    if (doc.attachEvent) {
                        domLoaded = function() {
                            if (doc.readyState === "complete") {
                                doc.detachEvent("onreadystatechange", domLoaded);
                                exec()
                            }
                        }
                    }
                }
                var scrollCheck = function() {
                    if (loaded) {
                        return
                    }
                    try {
                        doc.documentElement.doScroll("left")
                    } catch (e) {
                        setTimeout(scrollCheck, 1);
                        return
                    }
                    exec()
                };
                return function(fn) {
                    if (loaded || !!E.ready) {
                        fn()
                    } else {
                        func.push(fn);
                        if (!domCheck) {
                            domCheck = true;
                            if (/complete|interactive|loaded/.test(doc.readyState)) {
                                return exec()
                            }
                            if (doc.addEventListener) {
                                doc.addEventListener("DOMContentLoaded", domLoaded, false);
                                window.addEventListener("load", exec, false)
                            } else {
                                if (doc.attachEvent) {
                                    doc.attachEvent("onreadystatechange", domLoaded);
                                    window.attachEvent("onload", exec);
                                    var toplevel = false;
                                    try {
                                        toplevel = window.frameElement == null
                                    } catch (e) {}
                                    if (document.documentElement.doScroll && toplevel) {
                                        scrollCheck()
                                    }
                                }
                            }
                        }
                    }
                }
            }
        )()
            , onloaded = function(fn) {
            if (!!E.ready) {
                fn()
            } else {
                attachE(window, "load", fn)
            }
        }
            , genID = function() {
            var id = 0;
            return function() {
                return "looyu_dom_" + id++
            }
        }()
            , monitorObj = function(o) {
            o = o || {};
            var h = o.t || doc.title
                , u = o.u || docurl;
            if (h.length > 100) {
                h = h.substring(0, 100)
            }
            var obj = {
                c: "a",
                i: ci,
                v: E.vId,
                u: E.uId,
                p: E.pId || "",
                ref: E.refer,
                site: site,
                h: h,
                w: u,
                scn: (screen.width + "*" + screen.height),
                t: this.type || "",
                ct: E.counter,
                r: E.reseve || "",
                p0: E.p0 || docurl
            };
            if (E.keyword) {
                obj.keyword = E.keyword
            }
            return obj
        }
            , triggerEvent = function(evtName, target) {
            var event;
            if (document.createEvent) {
                event = document.createEvent("HTMLEvents");
                event.initEvent(evtName, true, true)
            } else {
                event = document.createEventObject();
                event.eventType = evtName
            }
            event.eventName = evtName;
            if (document.createEvent) {
                target.dispatchEvent(event)
            } else {
                target.fireEvent("on" + event.eventType, event)
            }
        }
            , onpopstate = function(e) {
            if (e.state && typeof e.state.chatOpen !== "undefined") {
                doc.history.go(e.state.chatOpen ? -2 : 2)
            }
        }
            , switchScroll = (function() {
                var lastOverflow = undefined
                    , lastScroll = 0;
                return function(on) {
                    if (lastOverflow === undefined) {
                        lastOverflow = currentStyle(doc.body).overflow || ""
                    }
                    doc.body.style.overflow = on ? "hidden" : (lastOverflow || "");
                    if (on) {
                        lastScroll = doc.body.scrollTop;
                        doc.body.scrollTop = 0
                    } else {
                        doc.body.scrollTop = lastScroll
                    }
                }
            }
        )();
        attachE(window, "popstate", onpopstate);
        D.util = {
            openChat: openChat,
            chatURL: chatURL,
            fly: fly,
            openPhone: function(pm) {
                var url = m && m.talk || chatURL(pm)
                    , found = false;
                url = url.replace(/command=[^&$]*/, function() {
                    found = true;
                    return "command=freePhone"
                });
                found || (url = url + "&command=freePhone");
                window.open(url, "_looyu_phone", winopt)
            },
            msgSuccess: function(o) {
                msgp & msgp.success()
            }
        };
        extend(Function.prototype, {
            doyoodg: function(obj, args) {
                var method = this;
                return function() {
                    var callArgs = args || arguments;
                    return method.apply(obj || window, callArgs)
                }
            }
        });
        Function.prototype.delegate || (Function.prototype.delegate = Function.prototype.doyoodg);
        var timer = function() {
            this.id = 0;
            this.tasks = [];
            this.exec = this.execute.doyoodg(this)
        };
        extend(timer.prototype, {
            addTask: function(f) {
                if (typeof f == "function") {
                    this.tasks.push(f)
                }
            },
            delTask: function(f) {
                for (var i = 0; i < this.tasks.length; i++) {
                    if (this.tasks[i] == f) {
                        this.tasks.splice(i);
                        break
                    }
                }
            },
            execute: function() {
                for (var v = 0; v < this.tasks.length; v++) {
                    !this.tasks[v] || this.tasks[v]()
                }
            },
            start: function(t) {
                if (this.id != 0) {
                    this.stop()
                }
                this.id = setInterval(this.exec, t)
            },
            stop: function() {
                if (this.id != 0) {
                    clearInterval(this.id)
                }
                this.id = 0
            },
            started: function() {
                return this.id != 0
            }
        });
        var dtimer = new timer();
        var flier = function(v, g, w, h, pos) {
            extend(this, {
                obj: v,
                handle: !g ? null : (typeof g === "string") ? $(g) : g,
                width: w || v.offsetWidth,
                height: h || v.offsetHeight,
                onmousemove: this.drag.doyoodg(this),
                onmouseup: this.drop.doyoodg(this),
                ontouchmove: this.drag.doyoodg(this),
                ontouchend: this.drop.doyoodg(this),
                pos: pos
            });
            if (this.handle) {
                this.handle.style.cursor = "move";
                attachE(this.handle, "touchstart mousedown", this.beginDrag.doyoodg(this))
            }
        };
        extend(flier.prototype, {
            beginDrag: function(e) {
                e = e || event;
                e.preventDefault();
                this.startTime = +new Date;
                this.offs = {};
                if (e.touches) {
                    var parent = e.target;
                    e = e.touches[0];
                    this.offs.x = e.pageX - this.obj.offsetLeft;
                    this.offs.y = e.pageY - this.obj.offsetTop - doc.body.scrollTop
                } else {
                    this.offs = {
                        x: e.offsetX || e.layerX,
                        y: e.offsetY || e.layerY
                    }
                }
                attachE(doc, "mousemove", this.onmousemove);
                attachE(doc, "mouseup", this.onmouseup);
                attachE(doc, "touchmove", this.onmousemove);
                attachE(doc, "touchend", this.onmouseup);
                doc.onselectstart = function() {
                    return false
                }
            },
            isMoved: function(newX, newY) {
                var b = getBody();
                return {
                    x: newX > 0 && newX < b.clientWidth - this.width + sLeft(),
                    y: newY > 0 && newY < b.clientHeight - this.height + sTop()
                }
            },
            drag: function(e) {
                e = e || event;
                if (e.touches) {
                    e = e.touches[0]
                }
                var o = this.obj;
                var mv = this.isMoved(e.clientX - this.offs.x + sLeft(), e.clientY - this.offs.y + sTop());
                if (mv.x) {
                    o.style.left = e.clientX - this.offs.x + "px";
                    o.style.right = "auto"
                }
                if (mv.y) {
                    o.style.top = e.clientY - this.offs.y + "px";
                    o.style.bottom = "auto"
                }
            },
            drop: function(e) {
                detachE(doc, "mousemove", this.onmousemove);
                detachE(doc, "mouseup", this.onmouseup);
                detachE(doc, "touchmove", this.onmousemove);
                detachE(doc, "touchend", this.onmouseup);
                doc.onselectstart = null;
                var spend = (+new Date) - this.startTime;
                if (spend < 500) {
                    triggerEvent("click", this.obj)
                }
            },
            reset: function(o) {
                extend(this, o);
                delete this.lastLeft
            },
            showDiv: function() {
                var st = this.obj.style;
                if (typeof this.lastLeft == "undefined") {
                    this.lastLeft = sLeft();
                    this.lastTop = sTop();
                    var pb = (this.pos.bottom ? (getBody().clientHeight - this.pos.bottom - this.height) : this.pos.top);
                    st.top = sTop() + pb + "px";
                    return
                }
                if (st.visibility != "visible") {
                    st.visibility = "visible"
                }
                var nleft = sLeft()
                    , ntop = sTop();
                var dx = nleft - this.lastLeft
                    , dy = ntop - this.lastTop;
                if (dx != 0) {
                    var sig = (st.left ? "left" : "right")
                        , stv = 0;
                    try {
                        stv = parseInt(st[sig] || 0)
                    } catch (e) {}
                    st[sig] = stv + dx + "px";
                    this.lastLeft = nleft
                }
                if (dy != 0) {
                    if (st.top) {
                        st.top = parseInt(st.top) + dy + "px"
                    }
                    this.lastTop = ntop
                }
            },
            start: function() {
                var me = this
                    , checkPos = function(o) {
                    var pn = o.parentNode
                        , tag = function(el) {
                        return el.tagName.toLowerCase()
                    };
                    return (pn && tag(pn) == "body")
                };
                if (!checkPos(this.obj)) {
                    onloaded(function() {
                        remove(me.obj);
                        doc.body.appendChild(me.obj);
                        me.start()
                    });
                    return
                }
                if (!browser.fix) {
                    this.func = this.showDiv.doyoodg(this);
                    dtimer.addTask(this.func);
                    dtimer.start(250)
                } else {
                    this.obj.style.position = "fixed"
                }
            },
            stop: function() {
                dtimer.delTask(this.func)
            }
        });
        var showMobileChatHint = function(me, flag) {
            (flag && show || hide)(mobileChatHint);
            if (D.chat.mobileChatHintMode == 1) {
                me.processBottom(flag ? D.chat.mobileChatHintSize || 40 : 0)
            }
        };
        var mobileChatHint;
        var onlineHint = {
            sc: "\u5728\u7EBF\u5BA2\u670D",
            en: "Online Chat",
            tc: "\u5728\u7DAB\u5BA2\u670D",
            ru: "Online Chat"
        };
        var createMobileChatHint = function(me) {
            mobileChatHint = $("doyoo_mobile_chat_hint");
            if (mobileChatHint) {
                showMobileChatHint(me, true);
                return
            }
            mobileChatHint = createEle("div", {
                id: "doyoo_mobile_chat_hint"
            });
            var mode = D.chat.mobileChatHintMode || 0;
            var size = 30;
            if (mode === 0) {
                var bottom = D.chat.mobileChatHintBottom || 130;
                mobileChatHint.style.bottom = bottom + "px";
                size = (D.chat.mobileChatHintSize || 30) * 2;
                fly(mobileChatHint, mobileChatHint, size, size, {
                    bottom: bottom,
                    right: 10
                })
            } else {
                mobileChatHint.innerHTML = '<div id="doyoo_mobile_chat_hint_closer">&nbsp;</div><div id="doyoo_mobile_chat_hint_icon">&nbsp;</div><div id="doyoo_mobile_chat_hint_count">&nbsp;</div><div id="doyoo_mobile_chat_hint_msg">' + (onlineHint[E.lang] || onlineHint.sc) + "</div>";
                attachE($("doyoo_mobile_chat_hint_closer"), "click dblclick touch", function() {
                    showMobileChatHint(me, false)
                });
                addClass(mobileChatHint, "doyoo_chat_hint_mode_bottom");
                size = D.chat.mobileChatHintSize || 40
            }
            var sizePx = size + "px";
            if (mode === 0) {
                extend(mobileChatHint.style, {
                    width: sizePx,
                    height: sizePx,
                    lineHeight: sizePx,
                    bottom: D.chat.mobileChatHintBottom || 220
                })
            } else {
                extend(mobileChatHint.style, {
                    width: "100%",
                    height: sizePx,
                    lineHeight: sizePx,
                    borderRadius: 0,
                    bottom: 0,
                    right: 0
                })
            }
            mobileChatHint.style.backgroundColor = (D.chat.mobileChatHintColor || D.chat.mobileColor || "#1D8CE0");
            attachE(mode == 0 ? mobileChatHint : $("doyoo_mobile_chat_hint_msg"), "click touch", function() {
                me.minForce()
            });
            showMobileChatHint(me, true)
        };
        var M = function(cfg) {
            this.obj = $("doyoo_monitor");
            if (!this.obj) {
                this.obj = createEle("div", {
                    id: "doyoo_monitor"
                })
            }
            extend(this, cfg, {
                width: 412,
                height: 158
            })
        };
        var P = function(cfg) {
            this.obj = $("doyoo_panel");
            if (!this.obj) {
                this.obj = createEle("div", {
                    id: "doyoo_panel"
                })
            }
            extend(this, cfg)
        };
        var Mask = function() {};
        extend(Mask.prototype, {
            showDiv: function() {
                this.obj = $("doyoo_mon_mask");
                if (!this.obj) {
                    this.obj = createEle("div", {
                        id: "doyoo_mon_mask"
                    });
                    var b = getBody();
                    this.obj.style.width = Math.max(b.scrollWidth, b.clientWidth) + "px";
                    this.obj.style.height = Math.max(b.scrollHeight, b.clientHeight) + "px"
                }
                show(this.obj)
            },
            hideDiv: function() {
                hide(this.obj)
            }
        });
        var mask = new Mask();
        var DP = function() {
            this.defUI()
        };
        extend(DP.prototype, {
            defUI: function() {
                this.obj = createEle("div", {
                    id: "looyu_p"
                });
                this.obj.innerHTML = '<div class="looyu_p_tl looyu_p_t"><div class="looyu_p_tr looyu_p_t"><div class="looyu_p_tc looyu_p_t"><div id="looyu_p_h">X</div>&nbsp;</div></div></div><div class="looyu_p_ml looyu_p_m"><div class="looyu_p_mr  looyu_p_m"><div class="looyu_p_mc"><div id="looyu_p_c"></div></div></div></div><div class="looyu_p_bl  looyu_p_b"><div class="looyu_p_br  looyu_p_b"><div class="looyu_p_bc  looyu_p_b">&nbsp;</div></div></div>';
                attachE($("looyu_p_h"), "click dblclick", this.hideDiv.doyoodg(this))
            },
            opt: function(w, h, u, b, p, f) {
                extend(this, {
                    w: +w + 26,
                    h: +h + 26,
                    u: u,
                    b: b,
                    p: p,
                    f: f
                });
                var o = $("looyu_p_c");
                extend(o.style, {
                    width: w + "px",
                    height: h + "px"
                });
                extend(this.obj.style, {
                    width: this.w + "px",
                    height: this.h + "px"
                });
                this.obj.className = "looyu_p_" + b;
                o.innerHTML = '<iframe id="looyu_p_f" frameborder="0" width="100%" height="100%" src="' + u + '"></iframe>';
                fly(this.obj, null, this.w, this.h, stayPos(p, this.w, this.h))
            },
            showDiv: function() {
                mask.showDiv();
                var ps = stayPos(this.p, this.w, this.h);
                if (!this.p) {
                    ps.top += fixTop();
                    ps.left += sLeft()
                }
                each(ps, function(v) {
                    ps[v] = ps[v] + "px"
                });
                extend(this.obj.style, ps);
                !this.f && show(this.obj);
                this.f && (this.f == 1 ? fade(this.obj) : slide(this.obj, this.f - 2, stayPos(this.p, this.w, this.h)))
            },
            hideDiv: function() {
                mask.hideDiv();
                hide(this.obj)
            }
        });
        var dp = null;
        P.chatParam = function(et, tar) {
            var p = "";
            if (et == "c") {
                p = "n=" + tar
            } else {
                if (et == "g") {
                    p = "g=" + (tar && +tar || "")
                }
            }
            return p
        }
        ;
        extend(M.prototype, {
            defUI: function(mark) {
                var fp = function(s, idx) {
                    return fpath + "images/monitor/" + s + "_" + idx + ".gif?131127"
                };
                var cu = function(s, idx) {
                    return "url(" + fp(s, idx) + ")"
                };
                var i = this.index, bi = i, o = this.obj, inh, inh2, defp;
                var lang = E.lang || "sc";
                var accs = {
                    tc: "\u5f00\u59cb\u4ea4\u8c08",
                    en: "Chat",
                    sc: "\u5f00\u59cb\u4ea4\u8c08"
                }
                    , denys = {
                    tc: "\u7a0d\u540e\u518d\u8bf4",
                    en: "Deny",
                    sc: "\u7a0d\u540e\u518d\u8bf4"
                };
                if ($.mobile && !this.preferConfig) {
                    o.className += " doyoo_mon_mobile";
                    inh = '<div id="doyoo_mon_innner" style="position:relative;width:100%;height:100%;-webkit-transform: translateZ(0px)"><div id="doyoo_mon_main"></div><a id="doyoo_mon_accept" class="doyoo_mon_btn" href="javascript:;" >' + (accs[lang] || "CHAT") + '</a><div id="doyoo_mon_closer"></div></div>';
                    extend(this, {
                        width: 200,
                        height: 120
                    });
                    o.innerHTML = inh
                } else {
                    if (i <= 8 && i > 0 || i > 100) {
                        try {
                            inh = '<div id="doyoo_mon_innner" style="position:relative;width:100%;height:100%;-webkit-transform: translateZ(0px)"><div id="doyoo_mon_head"></div><div id="doyoo_mon_main"></div><div id="doyoo_mon_foot"><a id="doyoo_mon_accept" class="doyoo_mon_btn" href="javascript:;" ></a><a id="doyoo_mon_phone" class="doyoo_mon_btn"  href="javascript:;" ></a><div id="doyoo_mon_refuse" class="doyoo_mon_btn"></div></div></div><div id="doyoo_mon_closer"></div></div></div>';
                            o.innerHTML = inh
                        } catch (e) {}
                        o.style.background = cu("m_bg", i) + " no-repeat";
                        $("doyoo_mon_accept").style.backgroundImage = cu("acc", lang);
                        $("doyoo_mon_refuse").style.backgroundImage = cu("dn", lang);
                        $("doyoo_mon_phone").style.backgroundImage = cu("phone", lang);
                        extend(this, {
                            width: 429,
                            height: 196
                        })
                    } else {
                        inh = '<div id="doyoo_mon_inner" style="position:relative;width:100%;height:100%;-webkit-transform: translateZ(0px)"><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{mw}" height="{mh}"><param name="movie" value="{mbg}"/><param name="wmode" value="transparent"/><embed src="{mbg}"  width="{mw}" height="{mh}" type="application/x-shockwave-flash" wmode="transparent"></embed></object><div id="doyoo_mon_head" class="doyoo_mon_head" style="position:absolute;left:{mtl}px;top:{mtt}px;width:{mtw}px;height:{mth}px"></div><a id="doyoo_mon_accept" href="javascript:;" style="position:absolute;margin-left:5px;display:block;left:{mbal}px;bottom:{mbab}px;width:{mbaw}px;height:{mbah}px;background:url({mbabg}) no-repeat;text-align:center"></a><a id="doyoo_mon_phone" href="javascript:;"   style="position:absolute;display:block;margin:0;left:{mbpl}px;bottom:{mbpb}px;width:{mbpw}px;height:{mbph}px;background:url({mbpbg}) no-repeat;text-align:center"></a><div id="doyoo_mon_refuse"  style="position:absolute;display:block;left:{mbdl}px;bottom:{mbdb}px;width:{mbdw}px;height:{mbdh}px;background:url({mbdbg}) no-repeat;text-align:center;top:auto;right:auto;cursor:pointer"></div><div id="doyoo_mon_main" class="doyoo_mon_main"  style="position:absolute;left:{mml}px;top:{mmt}px;width:{mmw}px;height:{mmh}px"></div></div>';
                        inh2 = '<div id="doyoo_mon_inner" style="position:relative;width:100%;height:100%;background-image:url({mbg});-webkit-transform: translateZ(0px)"><div id="doyoo_mon_head" class="doyoo_mon_head"  style="position:absolute;left:{mtl}px;top:{mtt}px;width:{mtw}px;height:{mth}px"  ></div><a id="doyoo_mon_accept" href="javascript:;"  style="position:absolute;margin-left:5px;display:block;left:{mbal}px;bottom:{mbab}px;width:{mbaw}px;height:{mbah}px;background:url({mbabg}) no-repeat"></a><a id="doyoo_mon_phone" href="javascript:;"   style="position:absolute;margin:0;display:block;left:{mbpl}px;bottom:{mbpb}px;width:{mbpw}px;height:{mbph}px;background:url({mbpbg}) no-repeat"></a><div id="doyoo_mon_refuse" href="javascript:;" style="position:absolute;display:block;left:{mbdl}px;bottom:{mbdb}px;width:{mbdw}px;height:{mbdh}px;background:url({mbdbg}) no-repeat;top:auto;right:auto;cursor:pointer"></div><div id="doyoo_mon_main" class="doyoo_mon_main"   style="position:absolute;left:{mml}px;top:{mmt}px;width:{mmw}px;height:{mmh}px"></div></div>';
                        if (i > 0) {
                            var acc = fp("acc", lang)
                                , deny = fp("dn", lang)
                                , phone = fp("phone", lang);
                            defp = {
                                mw: 500,
                                mh: 200,
                                mbg: fpath + "swf/" + i + ".swf?0831",
                                mtl: 40,
                                mtt: 8,
                                mtw: 240,
                                mth: 30,
                                mbal: 50,
                                mbab: 20,
                                mbaw: 78,
                                mbah: 25,
                                mbdl: 263,
                                mbdb: 20,
                                mbdw: 78,
                                mbdh: 25,
                                mml: 42,
                                mmt: 40,
                                mmw: 270,
                                mmh: 80,
                                mbabg: acc,
                                mbdbg: deny,
                                mbpbg: phone,
                                mbpw: 95,
                                mbph: 30,
                                mbpl: 148,
                                mbpb: 17
                            }
                        } else {
                            defp = this.style;
                            var tp = defp.elepos.split(" ")
                                , seq = ["mtl", "mtt", "mtw", "mth", "mml", "mmt", "mmw", "mmh", "mbal", "mbab", "mbaw", "mbah", "mbdl", "mbdb", "mbdw", "mbdh", "mbpl", "mbpb", "mbpw", "mbph"];
                            for (var j = 0; j < seq.length; j++) {
                                defp[seq[j]] = parseInt(tp[j])
                            }
                            defp.mbpw = defp.mbpw || 0;
                            defp.mbph = defp.mbph || 0
                        }
                        o.innerHTML = tpl(/^.*\.swf($|\?.*)/.test(defp.mbg) ? inh : inh2, defp);
                        extend(this, {
                            width: defp.mw,
                            height: defp.mh
                        })
                    }
                }
                this.main = $("doyoo_mon_main");
                this.head = $("doyoo_mon_head");
                this.accLink = $("doyoo_mon_accept");
                this.denyLink = $("doyoo_mon_refuse");
                this.closer = $("doyoo_mon_closer");
                this.head = $("doyoo_mon_head");
                mark && (this._defui = true);
                var phoneLink = $("doyoo_mon_phone");
                if (!this.showPhone && phoneLink) {
                    hide(phoneLink)
                }
                this.accLink && attachE(this.accLink, "click", function() {
                    doyoo.util.openChat();
                    doyoo.util.accept();
                    return false
                });
                phoneLink && attachE(phoneLink, "click", function() {
                    doyoo.util.openPhone();
                    doyoo.util.accept();
                    return false
                })
            },
            getPos: function() {
                return stayPos(this.pos, this.width, this.height)
            },
            buildMain: function(txt) {
                txt = txt || this.text;
                this.main.innerHTML = /^https?:\/\/.*/.test(txt) ? ('<iframe frameborder="0" width="100%" height="100%" src="' + txt + '"></iframe>') : txt
            },
            builder: function() {
                var o = this.obj;
                if (typeof beforeLooyuMonitorBuilder == "function") {
                    beforeLooyuMonitorBuilder.apply(this)
                } else {
                    this.defUI(true)
                }
                this.head && (this.head.innerHTML = this.title);
                this._defui || (this.accLink.onclick = this.accept.doyoodg(this));
                this.denyLink && (this.denyLink.onclick = this.deny.doyoodg(this));
                this.closer && (this.closer.onclick = this.deny.doyoodg(this));
                extend(o.style, {
                    width: this.width + "px",
                    height: this.height + "px"
                });
                this.flier = fly(o, this.head, this.width, this.height, this.getPos())
            },
            autoShow: function() {
                if (this.auto >= 0 && !this.autoTimer && (this.offShow || this.status)) {
                    var now = new Date();
                    var nh = now.getHours()
                        , nm = now.getMinutes();
                    function tonum(s) {
                        var s1 = s.replace(/:/g, "");
                        while (s1.charAt(0) == "0" && s1.length > 1) {
                            s1 = s1.substring(1)
                        }
                        return parseInt(s1)
                    }
                    var h1 = tonum(this.start)
                        , h2 = tonum(this.end);
                    var n = tonum(nh + ":" + ((nm < 10) ? ("0" + nm) : nm));
                    if (h1 <= n && h2 >= n) {
                        this.autoTimer = setTimeout(this.showDiv.doyoodg(this, [true]), this.auto * 1000)
                    }
                }
            },
            leave: function() {
                var img = new Image();
                img.src = E.mon + "/s?" + this.leaveUrl();
                var leaveF = $("looyu_leave");
                leaveF && (leaveF.src = "about:block");
                if (this.timer) {
                    clearInterval(this.timer);
                    this.timer = 0
                }
            },
            refresh: function(o) {
                this.leave();
                this.record(o)
            },
            destory: function() {
                this.leave();
                remove(this.obj);
                clearTimeout(this.autoTimer);
                this.flier.stop()
            },
            bindLeave: function() {
                attachE(window, "unload", this.leave.doyoodg(this))
            },
            leaveUrl: function() {
                return "c=l&i=" + ci + "&v=" + E.vId + "&p=" + E.pId + "&_t=" + +new Date()
            },
            pump: function(r) {
                if (r == null) {
                    return
                }
                switch (r.c) {
                    case "a":
                        var rp = r.p.split("|");
                        E.pId = rp[0];
                        this.bindLeave();
                        this.text = tpl(this.text, {
                            area: (r.area || "")
                        });
                        this.buildMain();
                        this.autoShow();
                        parent && parent.doyoo && (parent.doyoo.env.pId = rp[0]);
                        if (rp.length > 1) {
                            E.mId = rp[1]
                        }
                        var t = r.t && (+r.t) || 0;
                        if (t !== 50) {
                            t = (t === 9 ? 18 : 500)
                        } else {
                            t = 500
                        }
                        if (t && !this.timer) {
                            this.timer = window.setInterval(this.driver.doyoodg(this), t * 1000)
                        }
                        r.e && this.doEvent(r.e);
                        if (r.status == 2) {
                            if ($.mobile || this.chatFollow) {
                                m.force(null, 1, 0, 1)
                            }
                        } else {
                            if (t < 505 && this.autoDirectChat > -1 && this.status) {
                                setTimeout(function() {
                                    m.force(null, 1)
                                }, this.autoDirectChat * 1000)
                            }
                        }
                        break;
                    case "e":
                        var es = r.es;
                        for (var v in es) {
                            (es.hasOwnProperty(v) && typeof es[v] == "object" && es.hasOwnProperty(v)) && this.doEvent(es[v])
                        }
                        break;
                    case "ac":
                    case "de":
                        break
                }
            },
            driver: function() {
                if (this.isChating) {
                    return
                }
                var url = E.mon + "/s?c=e&i=" + ci + "&v=" + E.vId + "&p=" + E.pId;
                jsonRequest(url, this.pump.doyoodg(this))
            },
            force: (function() {
                    var buildOldPage = function(mon, t) {
                        var nurl = docurl + (docurl.indexOf("?") == -1 ? "?" : "&") + +new Date();
                        var curF = createEle("iframe", {
                            id: "doyoo_f_frame",
                            src: (t == 1 ? "about:blank" : nurl),
                            frameborder: "0"
                        });
                        curF.className = "doyoo_f_frame";
                        if (mon.mini == 1) {
                            var s = (function() {
                                    curF.style.display = "none";
                                    var html = []
                                        , fc = doc.firstChild
                                        , hn = doc.getElementsByTagName("html")[0]
                                        , ns = hn.getAttribute("xmlns");
                                    if (browser.msie) {
                                        browser.strict && html.push(fc.text || "")
                                    } else {
                                        html.push('<!DOCTYPE html PUBLIC "', fc.publicId, '" "', fc.systemId, '">')
                                    }
                                    html.push("<html ", ns ? ('xmlns="' + ns + '"') : "", ">");
                                    html.push(conhtml, "</html>");
                                    curF.style.display = "block";
                                    return html.join("")
                                }
                            )();
                            var frameDoc = curF.contentWindow.document;
                            frameDoc.writeln(s)
                        }
                        doc.getElementsByTagName("html")[0].className += " doyoo_f_original";
                        doc.body.scroll = "no";
                        return curF
                    };
                    var buildForceUrl = function(me, param) {
                        var talkUrl = chatURL(param || me.chat);
                        var found = false;
                        talkUrl = talkUrl.replace(/command=[^&$]*/, function() {
                            found = true;
                            return "command=forceChat"
                        });
                        found || (talkUrl = talkUrl + "&command=forceChat");
                        return talkUrl
                    };
                    var openOrReplace = function(mon, talkUrl) {
                        mon.chat.force = false;
                        var cwin;
                        try {
                            cwin = window.open(talkUrl, "c" + (+new Date()), winopt);
                            if (!cwin) {
                                doc.location.href = talkUrl;
                                return
                            }
                            cwin.focus()
                        } catch (e) {
                            if (!cwin) {
                                doc.location.href = talkUrl
                            }
                        }
                    };
                    var showEarlyMessage = function(msg, me) {
                        if (!msg.msg) {
                            return
                        }
                        var earlyPanel = $("doyoo_early");
                        if (!earlyPanel) {
                            earlyPanel = createEle("div", {
                                id: "doyoo_early"
                            });
                            earlyPanel.innerHTML = '<div class="doyoo_early_wrap"><div class="doyoo_early_head"><div class="doyoo_early_photo">&nbsp;</div> <a href="javascript:;" id="doyoo_early_closer">&nbsp;</a> </div><div id="doyoo_early_from"></div><div class="doyoo_early_msg"><div id="doyoo_early_detail"></div></div><div class="doyoo_early_arrow"></div><div class="doyoo_early_arrow_inner"></div></div> ';
                            earlyPanel.style.width = Math.min(me.miniWidth, document.body.clientWidth - 20) + "px";
                            attachE(earlyPanel, "click", me.minForce.doyoodg(me));
                            attachE($("doyoo_early_closer"), "click", function(e) {
                                e = e || window.event;
                                e.stopPropagation();
                                hide(earlyPanel)
                            })
                        }
                        $("doyoo_early_from").innerHTML = msg.fromName;
                        $("doyoo_early_detail").innerHTML = msg.msg;
                        var bottom;
                        if ($.mobile) {
                            var hintHeight = D.chat.mobileChatHintMode == 0 ? (D.chat.mobileChatHintSize || 30) * 2 : D.chat.mobileChatHintSize;
                            bottom = parseInt($("doyoo_mobile_chat_hint").style.bottom) + hintHeight + 10
                        } else {
                            bottom = parseInt($("doyoo_f_chat").style.bottom) + 60
                        }
                        earlyPanel.style.bottom = bottom + "px";
                        show(earlyPanel)
                    };
                    var showMessageNumber = function(msg) {
                        if (!mobileChatHint) {
                            return
                        }
                        (msg.count && addClass || removeClass)(mobileChatHint, "has_number");
                        (D.chat.mobileChatHintMode == 0 ? mobileChatHint : $("doyoo_mobile_chat_hint_count")).innerHTML = msg.count || "&nbsp;"
                    };
                    var showPhoneButton = function(phone) {
                        var btn = $("doyoo_f_phone_btn");
                        if (!btn) {
                            return
                        }
                        btn.setAttribute("href", "tel:" + phone);
                        btn.style.display = "block";
                        attachE(btn, "click,touch,dblclick", function(e) {
                            e.stopImmediatePropagation()
                        })
                    };
                    var createChatFrame = function(me, follow) {
                        var fChat = createEle("div", {
                            id: "doyoo_f_chat"
                        });
                        var chatClz = "doyoo_f_chat";
                        if ($.mobile) {
                            chatClz += " doyoo_f_chat_mobile"
                        }
                        fChat.className = chatClz;
                        var head = '<div id="doyoo_f_head"><div id="doyoo_f_close"></div><div id="doyoo_f_min"></div><div id="doyoo_f_title">&nbsp;</div></div><div  id="doyoo_f_main"></div>';
                        if ($.mobile) {
                            head = '<div id="doyoo_f_top"></div><div id="doyoo_f_head"><a id="doyoo_f_phone_btn" style="width:40px;height:40px;display:none;float:right;margin-right:50px"></a></div><div  id="doyoo_f_main"></div>'
                        }
                        fChat.innerHTML = head;
                        var closeForce = function() {
                            var f = $("doyoo_f_work");
                            var contentWin = f.contentWindow;
                            if (contentWin.postMessage) {
                                contentWin.postMessage("closeChat", "*")
                            } else {
                                f.src = "about:blank"
                            }
                            hide(fChat)
                        };
                        var minChatForce = function() {
                            if (me.minimize) {
                                fChat.style[$.mobile ? "left" : "right"] = "-100000px";
                                if ($.mobile) {
                                    me.processBottom(0)
                                }
                            } else {
                                me.minForce()
                            }
                        };
                        if ($.mobile) {
                            attachE($("doyoo_f_head"), "click,dblclick,touch", minChatForce);
                            attachE($("doyoo_f_top"), "click,dblclick,touch", minChatForce)
                        } else {
                            attachE($("doyoo_f_close"), "click,dblclick", minChatForce);
                            attachE($("doyoo_f_min"), "click,dblclick", me.minForce.doyoodg(me))
                        }
                        attachE(window, "message", function(evt) {
                            var msg = eval("(" + evt.data + ")");
                            if (msg) {
                                if (msg.type == "msg") {
                                    if (me.minBallon) {
                                        showEarlyMessage(msg.data, me);
                                        showMobileChatHint(me, true)
                                    } else {
                                        fChat.style[$.mobile ? "left" : "right"] = "0";
                                        me.minimize && me.minForce()
                                    }
                                } else {
                                    if (msg.type == "chatBegin") {
                                        me.isChating = true;
                                        if (D.chat.mobileChatHintMode == 1 && msg.data.title) {
                                            var hintMsg = $("doyoo_mobile_chat_hint_msg");
                                            if (hintMsg) {
                                                hintMsg.innerHTML = msg.data.title
                                            }
                                        }
                                        if (msg.data.phone) {
                                            showPhoneButton(msg.data.phone)
                                        }
                                        if (typeof looyuChatBegin == "function") {
                                            looyuChatBegin({
                                                userId: msg.data.userId,
                                                phone: msg.data.phone
                                            })
                                        } else {
                                            if (!follow) {
                                                me.minimize && me.minForce()
                                            }
                                        }
                                    } else {
                                        if (msg.type == "chatEnd") {
                                            me.isChating = false
                                        } else {
                                            if (msg.type == "chatBlur") {
                                                if (browser.iPhone && isBaidu) {
                                                    window.scroll(0, 0)
                                                }
                                            } else {
                                                if (msg.type == "chatMinimize") {
                                                    me.minForce()
                                                } else {
                                                    if (msg.type == "chatClose") {
                                                        fChat.style[$.mobile ? "left" : "right"] = "-100000px"
                                                    } else {
                                                        if (msg.type == "msgFresh") {
                                                            showMessageNumber(msg.data)
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        });
                        return fChat
                    };
                    return function(ch, auto, mobileClick, follow) {
                        msgp && msgp.minimize();
                        if (auto && $("doyoo_f_chat")) {
                            return
                        }
                        if (this.isChating) {
                            if (this.minimize) {
                                this.minForce()
                            }
                            return
                        }
                        setCookie("_t99_chat", 1, 0);
                        ch && !auto && !mobileClick && jsonRequest(E.mon + "/s?c=ac&i=" + ci + "&v=" + E.vId, null);
                        var t = this.mini
                            , talkUrl = buildForceUrl(this, ch);
                        if (auto) {
                            talkUrl += "&autoChat=1"
                        }
                        if (follow) {
                            talkUrl += "&follow=1"
                        }
                        (auto || mobileClick) && (t = 4);
                        ch && (ch.sId = null);
                        if (t == 3 && !$.mobile) {
                            openOrReplace(this, talkUrl);
                            return
                        }
                        var curF = $("doyoo_f_frame");
                        if (t != 4 && !curF && !$.mobile) {
                            curF = buildOldPage(this, t)
                        }
                        curF && (curF.style.top = sTop() + "px");
                        var fChat = $("doyoo_f_chat") || createChatFrame(this, follow);
                        var fMain = $("doyoo_f_main")
                            , fHead = $("doyoo_f_head");
                        this.minimize = $.mobile && !mobileClick;
                        if (isBaidu) {
                            D.chat.mobileHeight = 50
                        }
                        var mobileHeight = D.chat.mobileHeight + "%";
                        if ($.mobile) {
                            extend(fChat.style, {
                                left: "0px",
                                bottom: "0px",
                                top: "auto",
                                height: "100%",
                                position: "fixed",
                                width: "100%"
                            });
                            fMain.style.height = mobileHeight;
                            fHead.style.top = fMain.style.top = (100 - D.chat.mobileHeight) + "%";
                            extend($("doyoo_f_top").style, {
                                height: "auto",
                                top: 0,
                                bottom: mobileHeight
                            });
                            if (!mobileClick) {
                                fChat.style.left = "-3000px"
                            }
                            createMobileChatHint(this)
                        } else {
                            fChat.style.width = (+this.miniWidth + 2) + "px";
                            fChat.style.height = this.miniHeight + "px";
                            fMain.style.height = this.miniHeight + "px"
                        }
                        show(fChat);
                        fMain.innerHTML = '<div id="doyoo_f_work_wrapper"><iframe frameborder="0" id="doyoo_f_work" width="100%" height="100%" src="' + talkUrl + '"/></div>';
                        var frame = $("doyoo_f_work");
                        if ($.mobile) {
                            if (mobileClick) {
                                switchScroll(1)
                            }
                            if (browser.iPhone && mobileClick) {
                                addClass(doc.body, "doyoo_body_mobile");
                                addClass(htmlEle, "doyoo_html_mobile")
                            }
                            try {
                                var pixelRatio = document.body.offsetWidth / screen.availWidth;
                                if (pixelRatio > 1) {
                                    extend(frame.style, {
                                        width: frame.offsetWidth / pixelRatio + "px",
                                        height: frame.offsetHeight / pixelRatio + "px",
                                        transformOrigin: "0 0",
                                        transform: "scale(" + pixelRatio + ")"
                                    })
                                }
                            } catch (e) {}
                        } else {
                            frame.style.height = this.miniHeight + "px"
                        }
                        show(fMain);
                        if (!$.mobile) {
                            var pos = {
                                right: 10,
                                bottom: 10
                            };
                            fly(fChat, "doyoo_f_title", this.miniWidth || 200, this.miniHeight || 400, pos);
                            if (follow) {
                                var cf = this.chatFollow
                                    , mf = +(getCookie("_t99_chat_mini") || 1);
                                if (cf === 2) {
                                    this.minForce()
                                } else {
                                    if (cf === 1 && mf === 0) {
                                        this.minForce()
                                    }
                                }
                            }
                        }
                    }
                }
            )(),
            processBottom: function(h) {
                var bottomEle = doc.querySelectorAll(".doyoo-bottom-place");
                if (bottomEle.length) {
                    for (var i = 0; i < bottomEle.length; i++) {
                        bottomEle[i].style.bottom = h + "px"
                    }
                }
            },
            minForce: function() {
                var me = this;
                var fChat = $("doyoo_f_chat")
                    , fMain = $("doyoo_f_main");
                var f = $("doyoo_f_work");
                if (!fChat) {
                    me.force();
                    fChat = $("doyoo_f_chat")
                }
                try {
                    var contentWin = f.contentWindow;
                    contentWin.postMessage && contentWin.postMessage(!me.minimize ? "min" : "restore", "*")
                } catch (e) {}
                if (!$.mobile) {
                    var top = parseInt(fChat.style.top)
                        , alpha = me.miniHeight - 40;
                    if (!isNaN(top)) {
                        fChat.style.top = top + alpha * (!me.minimize ? 1 : -1) + "px"
                    }
                    fChat.style.height = fMain.style.height = me.minimize ? (me.miniHeight + "px") : "40px";
                    var fMin = $("doyoo_f_min");
                    fMin.style.backgroundImage = "url(" + fpath + "/images/white-" + (!me.minimize ? "restore" : "min") + ".png?1)";
                    fMin.style.width = (m.minimize ? "20" : (me.miniWidth - 50)) + "px"
                } else {
                    switchScroll(!!m.minimize);
                    if (browser.iPhone) {
                        if (m.minimize) {
                            addClass(doc.body, "doyoo_body_mobile");
                            addClass(htmlEle, "doyoo_html_mobile")
                        } else {
                            removeClass(doc.body, "doyoo_body_mobile");
                            removeClass(htmlEle, "doyoo_html_mobile")
                        }
                    }
                    fChat.style.left = (!me.minimize && -3000 || 0) + "px";
                    if (me.minimize && !me.boundHistory) {
                        me.boundHistory = true;
                        window.history.pushState({
                            chatOpen: 0
                        }, doc.title, doc.location.href);
                        window.history.pushState({
                            chatOpen: 1
                        }, doc.title, doc.location.href);
                        detachE(window, "popstate", onpopstate);
                        attachE(window, "popstate", function(e) {
                            if (e.state) {
                                if (e.state.chatOpen && me.minimize || !e.state.chatOpen && !me.minimize) {
                                    me.minForce()
                                }
                                return
                            }
                        })
                    }
                }
                me.minimize = !me.minimize;
                setCookie("_t99_chat_mini", me.minimize && "0" || "1", 0);
                if (!me.minimize) {
                    hide($("doyoo_early"));
                    fChat.style[$.mobile ? "left" : "right"] = "0"
                } else {
                    window.focus()
                }
            },
            doEvent: function(et) {
                var build = function(e) {
                    var fc = (e.m && e.m.indexOf("<FORCE>") != -1) || e.e == "s1";
                    return {
                        type: (e.e == "11" ? 1 : 0),
                        force: fc,
                        cId: e.c,
                        sId: e.s,
                        dId: e.d,
                        m: fc ? 0 : e.m,
                        g: e.g
                    }
                }
                    , me = this;
                this.chat = build(et);
                switch (et.e) {
                    case "11":
                    case "1":
                    case "s1":
                        if (this.chat.force && this.mini) {
                            setTimeout(function() {
                                me.force(me.chat)
                            }, (et.d || 0) * 1000);
                            return
                        }
                        this.buildMain();
                        this.showDiv();
                        break;
                    case "8":
                    case "9":
                        et.m && this.buildMain(et.m);
                        this.showDiv();
                        break;
                    case "s0":
                        this.buildMain(et.t);
                        setTimeout(function() {
                            me.showDiv()
                        }, (et.d || 0) * 1000);
                        break;
                    case "s2":
                        dp || (dp = new DP());
                        dp.opt(et.w, et.h, et.url, et.b || 0, et.p || 0, et.f || 0);
                        setTimeout(function() {
                            dp.showDiv()
                        }, (et.d || 0) * 1000);
                        break;
                    case "nm":
                        if (this.minimize && !$.mobile) {}
                        break
                }
            },
            hideDiv: function(auto) {
                mask.hideDiv();
                hide(this.obj);
                p && !p.hidden && show(p.obj);
                if (this.hideTimer) {
                    clearTimeout(this.hideTimer);
                    this.hideTimer = 0
                }
                this.mayLoop(auto);
                this.visible = false
            },
            accept: function() {
                this.saveStatus(0);
                this.hideDiv();
                var ch = this.chat;
                ch && (ch.force = false);
                ch && jsonRequest(E.mon + "/s?c=ac&i=" + ci + "&v=" + E.vId, null);
                this._defui || openChat(ch, this.talk);
                ch && (ch.sId = null)
            },
            deny: function() {
                this.saveStatus(1);
                this.hideDiv();
                var ch = this.chat;
                ch && jsonRequest(E.mon + "/s?c=de&i=" + ci + "&v=" + E.vId + "&n=" + ch.sId, null)
            },
            mayLoop: function(auto) {
                this.loop && (this.loopTimer = setTimeout(this.showDiv.doyoodg(this, [auto, 1]), this.loop * 1000))
            },
            showDiv: function(auto, loop) {
                if (this.isChating || isBaidu) {
                    return
                }
                if (auto) {
                    var monShow = this.monShowOnly;
                    if (monShow) {
                        var urls = monShow.split(/[\s;]+/)
                            , found = 0;
                        for (var v = 0; v < urls.length; v++) {
                            if (docurl == urls[v]) {
                                found = 1;
                                break
                            }
                        }
                        if (!found) {
                            return
                        }
                    }
                }
                if (auto || loop) {
                    var status = this.readStatus();
                    var monS = this.monHideStatus;
                    for (var s = 0; s < monS.length; s++) {
                        if (monS[s] && status[s] >= monS[s]) {
                            return
                        }
                    }
                }
                this.saveStatus(2);
                auto && !this.visible && (this.chat = null);
                this.talk = chatURL(this.chat);
                this.hidePanel && p && p.close();
                var ps = this.getPos();
                if (!this.pos) {
                    ps.top += fixTop();
                    ps.left += sLeft()
                }
                each(ps, function(v) {
                    ps[v] = ps[v] + "px"
                });
                extend(this.obj.style, ps);
                this.mask && mask.showDiv();
                !this.fx && show(this.obj);
                this.fx && (this.fx == 1 ? fade(this.obj) : slide(this.obj, this.fx - 2, this.getPos()));
                this.visible = true;
                window.focus();
                if (this.autoTimer) {
                    clearTimeout(this.autoTimer)
                }
                if (this.loopTimer) {
                    clearTimeout(this.loopTimer);
                    this.loopTimer = 0
                }
                if (this.autoHide) {
                    this.hideTimer = setTimeout(this.hideDiv.doyoodg(this, [auto]), 1000 * this.autoHide)
                }
            },
            readStatus: function() {
                var status = [0, 0, 0];
                var saved = getCookie("_99_mon");
                if (saved) {
                    status = eval(saved)
                }
                return status
            },
            saveStatus: function(index) {
                var strTpl = "[{0},{1},{2}]";
                var status = this.readStatus();
                if (index != -1) {
                    status[index]++
                }
                setCookie("_99_mon", tpl(strTpl, status), sametime)
            },
            record: function(o) {
                var simpling = (Math.random() * 1000).toFixed(0) % 6;
                if (simpling <= 2 && this.ratio === 0) {
                    return
                }
                if (!this.updateStatusTimer) {
                    this.updateStatusTimer = setInterval(this.saveStatus.doyoodg(this, [-1]), 60000)
                }
                var url = E.mon + "/s?" + obj2str(monitorObj(o));
                jsonRequest(url, this.pump.doyoodg(this))
            }
        });
        extend(P.prototype, {
            defUI: function() {
                if (isBaidu) {
                    setTimeout(function() {
                        createMobileChatHint(D.monitor);
                        showMobileChatHint(D.monitor, 1)
                    }, 200);
                    return
                }
                this[($.mobile && !this.preferConfig && "mobile" || this.category) + "Builder"]()
            },
            builder: function() {
                var o = this.obj, pos, me = this;
                if (this.position != -1) {
                    var lr = (this.position == 0) ? "left" : "right";
                    pos = {
                        top: this.vertical
                    };
                    pos[lr] = this.horizon;
                    var p = {
                        position: "absolute",
                        top: pos.top + fixTop() + "px"
                    };
                    p[lr] = this.horizon + "px";
                    extend(o.style, p)
                }
                if (typeof beforeLooyuPanelBuilder == "function") {
                    beforeLooyuPanelBuilder.apply(this)
                } else {
                    this.defUI()
                }
                if (this.position != -1) {
                    this.flier = fly(this.obj, this.handler, this.width, this.height, pos)
                }
                show(o);
                this.closer && attachE(this.closer, "click dblclick", function(e) {
                    me.close(e);
                    me.hidden = true
                })
            },
            destory: function() {
                remove(this.obj);
                this.flier.stop()
            },
            mobileBuilder: function() {
                var o = this.obj;
                o.className += " doyoo_panel_mobile";
                if (this.mobileIcon) {
                    o.style.backgroundImage = "url(" + this.mobileIcon + ")";
                    o.style.width = (this.mobileIconWidth + "px");
                    o.style.height = (this.mobileIconHeight + "px")
                }
                var mode, tar, cat = this.category;
                if (cat == "icon" || cat == "text") {
                    mode = this.mode;
                    tar = this.target
                } else {
                    var groups = this.customers.groups
                        , m = this.customers.mode;
                    if (m) {
                        mode = 1;
                        tar = groups[0].id
                    } else {
                        mode = 0;
                        tar = groups[0].customers[0].id
                    }
                }
                o.onclick = openChat.doyoodg(this, [P.chatParam(mode == 0 ? "c" : "g", tar)])
            },
            winBuilder: function() {
                var o = this.obj;
                if (this.mode == 2) {
                    extend(o.style, {
                        width: (this.width + "px"),
                        height: (this.height + "px"),
                        background: ("url(" + this.panelBG + ") no-repeat")
                    });
                    var hcont = ['<div id="doyoo_panel_main">']
                        , groups = this.customers.groups
                        , celltpl = '<a class="doyoo_panel_cell" style="width:100%;display:block;height:{height}px;line-height:{height}px;background:url({cellbk}) no-repeat left center;{cellMargin}" href="javascript:;" onclick="doyoo.util.openChat(\'g={group}\');return false"><span style="{textStyle};height:{height}px;line-height:{height}px;{textMargin}">{groupName}</span></a>';
                    for (var i = 0; i < groups.length; i++) {
                        var gp = groups[i];
                        hcont.push(tpl(celltpl, {
                            height: this.cellHeight,
                            cellbk: (gp.active ? this.cellOnline : this.cellOffline),
                            group: gp.id,
                            groupName: gp.name,
                            cellMargin: this.cellMargin,
                            textStyle: gp.active && this.onlineText || this.offlineText,
                            textMargin: this.textMargin
                        }))
                    }
                    hcont.push("</div>");
                    o.innerHTML = hcont.join("");
                    var mp = $("doyoo_panel_main")
                        , stys = this.panelMain.split(" ");
                    extend(mp.style, {
                        left: stys[0] + "px",
                        top: stys[1] + "px",
                        width: stys[2] + "px",
                        height: stys[3] + "px"
                    });
                    return
                }
                if (this.mode == 1) {
                    o.innerHTML = '<div id="ohead"><div id="ocls" ></div><div id="omin" onclick=""></div><div id="otitle"></div><div id="oentrance"></div></div><div id="ocontent"></div><div id="ofoot"><div onclick=javascript:window.open("' + homepage + '")></div></div>';
                    $("otitle").innerHTML = this.title;
                    var cu = function(i, t) {
                        return "url(" + fpath + "images/floatwin/" + t + "_" + i + ".gif?131127)"
                    };
                    $("ohead").style.background = cu(this.index, "head") + " no-repeat";
                    $("ocontent").style.background = cu(this.index, "back") + " repeat-y";
                    $("ofoot").style.background = cu(this.index, "foot") + " no-repeat"
                } else {
                    if (this.mode == 0) {
                        this.width += 8;
                        var h = '<div id="nhead"><div id="ncls">X</div><div id="ntitle"></div></div><div id="ncontent" ></div>';
                        var phones = {
                            sc: "\u7535\u8bdd\uff1a",
                            en: "Number:",
                            tc: "\u96fb\u8a71\uff1a"
                        };
                        if (!blk(this.phone)) {
                            var l = (blk(E.lang) || "tc,sc,en,ru,".indexOf(E.lang) == -1) ? "sc" : E.lang;
                            h += '<div id="nphone">' + phones[l] + "<div>" + this.phone + "</div></div>"
                        }
                        h += '<div id="nfoot" onclick=javascript:window.open("' + homepage + '")><div></div></div>';
                        o.innerHTML += h;
                        o.className = "doyoo_pan_flat " + (oms ? " looyu_oms" : "");
                        try {
                            $("nhead").style.backgroundColor = this.headBgClr
                        } catch (e) {}
                        try {
                            $("nhead").style.color = this.headClr
                        } catch (e) {}
                        try {
                            $("ntitle").innerHTML = this.title
                        } catch (e) {}
                        try {
                            extend(o.style, {
                                borderColor: this.borderClr
                            })
                        } catch (e) {}
                    }
                }
                o.style.width = (this.width ? this.width : 144) + "px";
                var main = $((this.mode == 1) ? "ocontent" : "ncontent");
                main.innerHTML = '<div id="allcontent">' + this.buildList() + "</div>";
                (this.mode == 0) || (main.style.height = this.height + "px");
                this.handler = (this.mode == 1) ? "ohead" : "nhead";
                this.closer = $(this.mode == 1 ? "ocls" : "ncls");
                if (this.mode == 0) {
                    if (this.cols > 20) {
                        extend(main.style, {
                            height: 350 + "px",
                            overflowY: "auto"
                        });
                        o.style.width = this.width + 20 + "px"
                    }
                }
            },
            buildList: function() {
                var html = ""
                    , custs = this.customers
                    , depts = custs.groups
                    , m = custs.mode
                    , cols = 0;
                var ele = function(et, sn, tar, st, of) {
                    var mo = this.mode
                        , sc = ["doyoo_offline", "doyoo_online", "doyoo_offline", "doyoo_offline", "doyoo_offline", "doyoo_other", "doyoo_other", "doyoo_other"]
                        , sofft = {
                        sc: ["\u7559\u8a00", "\u81ea\u52a9", "\u7535\u8bdd", "\u7559\u8a00"],
                        en: ["MSG", "AUTO", "CALL", "MSG"],
                        tc: ["\u7559\u8a00", "\u81ea\u52a9", "\u96fb\u8a71", "\u7559\u8a00"],
                        ru: ["MSG", "AUTO", "CALL", "MSG"]
                    }
                        , sont = {
                        sc: ["\u5728\u7ebf", "\u5fd9\u788c", "\u79bb\u5f00"],
                        en: ["CHAT", "BUSY", "AWAY"],
                        tc: ["\u5728\u7dda", "\u5fd9\u788c", "\u96e2\u958b"],
                        ru: ["CHAT", "BUSY", "AWAY"]
                    }
                        , ln = E.lang && (sont[E.lang] && E.lang) || "sc"
                        , clk = (et != "gw" && et != "d")
                        , h = '<div class="' + (et == "c" ? "group_content" : "group_title") + '" ';
                    h += ">";
                    if (clk) {
                        h += '<a  href="javascript:;" class="doyoo_link ' + (st && sc[st] || sc[of + 4]) + '" onclick=javascript:doyoo.util.openChat("' + P.chatParam(et, tar) + '")>';
                        h += '<div class="doyoo_status">' + (st == 0 ? sofft[ln][of] : sont[ln][st - 1]) + "</div>"
                    }
                    h += '<span class="doyoo_group_name">';
                    h += ((mo == 1 && et != "c") ? "<span>&gt;&nbsp;</span>" : "") + sn + "</span>";
                    if (clk) {
                        h += " </a>"
                    }
                    h += "</div>";
                    return h
                };
                for (var v = 0; v < depts.length; v++) {
                    var dept = depts[v]
                        , t = m && ((dept.mode == 2) && "g" || "gw") || "d"
                        , stat = m && (dept.active && 1 || dept.online && 2)
                        , off = (t == "g") && (dept.phone && 2 || dept.sms && 3);
                    cols++;
                    html += ele(t, dept.name, dept.id, stat, off);
                    if (t == "d" || t == "gw") {
                        var cts = dept.customers;
                        for (var v1 = 0; v1 < cts.length; v1++) {
                            var cst = cts[v1];
                            cols++;
                            html += ele("c", cst.name || cst.id, cst.id, cst.status, cst.offline)
                        }
                    }
                }
                this.cols = cols;
                return html
            },
            close: function(evt) {
                hide(this.obj);
                var e = evt || window.event;
                window.event && (e.cancelBubble = true) || e && e.stopPropagation()
            },
            iconBuilder: function() {
                var pan = this.obj;
                pan.className = "doyoo_pan_icon";
                var w = this.collapse && this.collapsed && this.collapseW || this.collapse && !this.collapsed && (this.width + this.collapseW) || this.width;
                this.collapseFloat = this.position == 1 && "right" || "left";
                var innerW = this.width;
                if (this.collapse && this.collapsed) {
                    innerW = 0
                }
                extend(pan.style, {
                    width: w + "px",
                    height: this.height + "px"
                });
                var id = genID()
                    , id_link = genID();
                var innerTpl = '<div class="doyoo_pan_icon_inner" id="{id}" style="width:{innerW}px;float:{floatPos}"><a href="javascript:;" id="{linkId}" style="display:block;width:100%;height:100%;">&nbsp;</a>';
                var html = tpl(innerTpl, {
                    id: id,
                    innerW: innerW,
                    linkId: id_link,
                    floatPos: this.collapseFloat
                });
                var blankImage = fpath + "images/s.gif";
                for (var i = 0; i < this.regions.length; i++) {
                    var rgs = this.regions[i];
                    if (blk(rgs.bk)) {
                        rgs.bk = blankImage
                    }
                    var regionTpl = '<a href="javascript:;" class="talk99_region" style="left:{l}px;top:{t}px;width:{w}px;height:{h}px;background-image: url({bk})" onclick="{act};return false;">&nbsp;</a>';
                    switch (+rgs.type) {
                        case 0:
                            rgs.act = "window.open('http://wpa.qq.com/msgrd?V=1&uin=" + rgs.v + "')";
                            break;
                        case 1:
                            rgs.act = "window.open('msnim:chat?contact=" + rgs.v + "')";
                            break;
                        case 2:
                            rgs.act = "doyoo.util.openChat('g=" + rgs.v + "')";
                            break;
                        case 3:
                            rgs.act = "doyoo.util.openPhone('g=" + rgs.v + "')";
                            break;
                        case 4:
                            rgs.act = "window.open('" + rgs.v + "')";
                            break
                    }
                    html += tpl(regionTpl, rgs)
                }
                html += "</div>";
                if (this.collapse) {
                    this.collapseImage = this.collapsed && this.expandIcon || this.collapseIcon;
                    this.collapseId = genID();
                    var collapseTpl = '<a href="javascript:;" class="talk99_collapse" id="{collapseId}" style="width:{collapseW}px;height:{collapseH}px;margin-top:{collapseT}px;float:{collapseFloat};background-image:url({collapseImage})"  collapsed="{collapsed}">&nbsp;</a> ';
                    html += tpl(collapseTpl, this)
                }
                pan.innerHTML = html;
                var innerDom = $(id);
                this.online = securityPath(this.online);
                this.offline = securityPath(this.offline);
                innerDom.style.backgroundImage = "url(" + (this.status && this.online || this.offline) + ")";
                var fn = openChat.doyoodg(this, [P.chatParam(this.mode == 0 ? "c" : "g", this.target)]);
                attachE($(id_link), "click touch dblclick", fn);
                if (this.closable) {
                    var closer = createEle("div", {}, $(id));
                    closer.className = "doyoo_pan_close";
                    this.closer = closer
                }
                if (this.collapse) {
                    var collapse = $(this.collapseId);
                    var me = this;
                    attachE(collapse, "click dblclick", function(e) {
                        e && e.preventDefault && e.preventDefault();
                        var collapsed = +collapse.getAttribute("collapsed");
                        pan.style.width = (collapsed ? (me.width + me.collapseW) : me.collapseW) + "px";
                        innerDom.style.width = (collapsed ? me.width : 0) + "px";
                        collapse.setAttribute("collapsed", collapsed ? 0 : 1);
                        collapse.style.backgroundImage = "url(" + (collapsed ? me.collapseIcon : me.expandIcon) + ")";
                        return false
                    })
                }
            },
            textBuilder: function() {
                var pan = this.obj;
                extend(pan.style, {
                    color: this.color,
                    fontSize: this.size + "px"
                });
                pan.innerHTML += this.content;
                pan.onclick = openChat.doyoodg(this, [P.chatParam(this.mode == 0 ? "c" : "g", this.target)])
            }
        });
        var MsgPanel = function(opt) {
            this.obj = $("talk99_message");
            if (!this.obj) {
                this.obj = createEle("div", "talk99_message")
            }
            extend(this, opt)
        };
        extend(MsgPanel.prototype, (function() {
                var curl = E.lang || "sc";
                var lang_tip = {
                    sc: "\u8f93\u5165\u60a8\u7684\u7559\u8a00\u4fe1\u606f\uff0c\u6211\u4eec\u4f1a\u5c3d\u5feb\u8054\u7cfb\u60a8\uff01",
                    tc: "\u8f38\u5165\u60a8\u7684\u7559\u8a00\u4fe1\u606f\uff0c\u6211\u5011\u6703\u5118\u5feb\u806f\u7e6b\u60a8\uff01",
                    en: "We will contact you!",
                    ru: ""
                }
                    , lang_name = {
                    sc: "\u59d3\u540d\uff1a",
                    tc: "\u59d3\u540d\uff1a",
                    en: "name",
                    ru: "\u0444.\u0438.\u043e"
                }
                    , lang_phone = {
                    sc: "\u7535\u8bdd\uff1a",
                    tc: "\u96fb\u8a71\uff1a",
                    en: "phone",
                    ru: "\u2116.\u00a0\u0442\u0435\u043b"
                }
                    , lang_email = {
                    sc: "\u90ae\u7bb1\uff1a",
                    tc: "\u90f5\u7bb1\uff1a",
                    en: "email",
                    ru: "\u044d\u043b.\u043f\u043e\u0447\u0442\u0430"
                }
                    , lang_qq = {
                    sc: "Q&nbsp;&nbsp;Q\uff1a",
                    tc: "Q&nbsp;&nbsp;Q\uff1a",
                    en: "Q&nbsp;&nbsp;Q:",
                    ru: "Q&nbsp;&nbsp;Q:"
                }
                    , lang_submit = {
                    sc: "\u63d0\u4ea4",
                    tc: "\u63d0\u4ea4",
                    en: "submit",
                    ru: "\u0441\u043f\u0430\u0441\u0430\u0442\u044c"
                }
                    , lang_freePhone = {
                    sc: "\u514D\u8D39\u901A\u8BDD",
                    tc: "\u514D\u8CBB\u901A\u8A71",
                    en: "FreePhone",
                    ru: "\u0431\u0435\u0441\u043f.\u0437\u0432\u043e\u043d\u043e\u043a"
                };
                var msg_error = {
                    sc: "\u7559\u8A00\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A",
                    tc: "\u7559\u8A00\u5167\u5BB9\u4E0D\u80FD\u70BA\u7A7A",
                    en: "Message cannot be blank.",
                    ru: "\u043f\u0443\u0441\u0442\u043e\u0439\u00a0\u043a\u043e\u043c\u043c\u0435\u043d\u0442"
                };
                var con_error = {
                    sc: "\u7535\u8BDD\u548C\u90AE\u7BB1\u81F3\u5C11\u8981\u63D0\u4F9B\u4E00\u9879\u4EE5\u65B9\u4FBF\u6211\u4EEC\u8054\u7CFB\u60A8\uFF01",
                    tc: "\u96FB\u8A71\u548C\u90F5\u7BB1\u81F3\u5C11\u8981\u63D0\u4F9B\u4E00\u9805\u4EE5\u4FBF\u6211\u5011\u806F\u7E6B\u60A8\21",
                    en: "phone and email cannot be all blank!",
                    ru: "\u043d\u043e\u043c\u0435\u0440\u00a0\u0442\u0435\u043b.\u0438\u00a0\u044d\u043b.\u043f\u043e\u0447\u0442\u0430\u0000\u0437\u0430\u043f\u043e\u043b\u043d\u044f\u0442\u044c\u00a0\u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e"
                };
                var phone_error = {
                    sc: "\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u7535\u8BDD\u53F7\u7801",
                    tc: "\u8ACB\u8F38\u5165\u6B63\u78BA\u7684\u96FB\u8A71\u865F\u78BC",
                    en: "the number is invalid",
                    ru: "\u043d\u0435\u0440\u043f.\u043d\u043e\u043c\u0435\u0440"
                };
                var email_error = {
                    sc: "\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u90AE\u4EF6\u5730\u5740",
                    tc: "\u8ACB\u8F38\u5165\u6B63\u78BA\u7684\u90F5\u4EF6\u5730\u5740",
                    en: "the email is invalid",
                    ru: "\u043d\u0435\u0440\u043f.\u044d\u043b.\u043f\u043e\u0447\u0442\u0430"
                };
                var qq_error = {
                    sc: "\u8BF7\u8F93\u5165\u6B63\u786E\u7684qq\u53F7\u7801",
                    tc: "\u8ACB\u8F38\u5165\u6B63\u78BA\u7684qq\u865F\u78BC",
                    en: "the qq number is invalid",
                    ru: "\u043d\u0435\u0440\u043f qq"
                };
                var validPhone = function(v) {
                    return !blk(v)
                };
                var validEmail = function(v) {
                    return /^([\w]+)(.[\w]+)*@([\w-]+\.){1,5}([A-Za-z]){2,4}$/.test(v)
                };
                var validQq = function(v) {
                    return /^\d{5,20}$/.test(v)
                };
                var fp = function(v, i) {
                    return "url(" + fpath + "images/message/" + v + "_" + i + ".gif?131127)"
                };
                return {
                    builder: function() {
                        this.defUI();
                        var me = this;
                        me.mini = false;
                        this.miner && attachE(this.miner, "click dblclick", function() {
                            me.mini ? me.maximize() : me.minimize()
                        });
                        this.submiter && attachE(this.submiter, "click dblclick", function() {
                            me.submit()
                        });
                        return this
                    },
                    minimize: function() {
                        this.obj.style.height = "34px";
                        var tar = this.initPos();
                        this.mini = true;
                        this.miner.style.backgroundImage = fp("m_open", this.index);
                        this.flier.reset({
                            height: 34
                        });
                        return this
                    },
                    maximize: function() {
                        this.obj.style.height = "241px";
                        this.obj.style.top = "auto";
                        this.mini = false;
                        this.miner.style.backgroundImage = fp("m_close", this.index);
                        this.flier.reset({
                            height: 241
                        });
                        return this
                    },
                    submit: function() {
                        var url = E.chat + "/leaveWord.do?c=" + E.compId + "&command=token&callback=doyoo.util.submitMessage";
                        jsonRequest(url)
                    },
                    doSubmit: function(obj) {
                        var param = {
                            c: E.compId,
                            command: "leaveMessage",
                            g: this.group || "",
                            u: E.uId,
                            v: E.vId,
                            ct: E.counter,
                            site: site,
                            category: 0,
                            _mark: E._mark,
                            token: obj.token
                        };
                        var objm = $("t99_msg_content")
                            , objp = $("t99_msg_phone")
                            , obje = $("t99_msg_email")
                            , objq = $("t99_msg_qq");
                        param.name = $("t99_msg_name").value;
                        param.phone = objp.value;
                        param.email = obje.value;
                        param.message = objm.value;
                        param.qq = objq.value;
                        param.callback = "doyoo.util.msgSuccess";
                        param.subject = param.message.substring(0, 10);
                        if (blk(param.message) || param.message == lang_tip[curl]) {
                            alert(msg_error[curl]);
                            objm.focus();
                            return
                        }
                        if (blk(param.phone) && blk(param.email)) {
                            alert(con_error[curl]);
                            objp.focus();
                            return
                        }
                        if (!blk(param.phone) && !validPhone(param.phone)) {
                            alert(phone_error[curl]);
                            objp.focus();
                            return
                        }
                        if (!blk(param.email) && !validPhone(param.email)) {
                            alert(email_error[curl]);
                            objp.focus();
                            return
                        }
                        if (!blk(param.qq) && !validQq(param.qq)) {
                            alert(qq_error[curl]);
                            objq.focus();
                            return
                        }
                        var requrl = E.chat + "/leaveWord.do?" + obj2str(param);
                        jsonRequest(requrl);
                        doyoo.util.msgSuccess()
                    },
                    defUI: function() {
                        var h = '<div class="t99_mpanel_inner"><div class="t99_mpanel_title" id="t99_mpanel_title">{title}</div><div id="t99_mpanel_miner"></div><div class="t99_mpanel_main"><div class="t99_mpanel_content"><textarea id="t99_msg_content">{txtTip}</textarea></div><div class="t99_mpanel_info"><span class="t99_mpanel_name">{txtName}</span><input type="text" id="t99_msg_name"></div><div class="t99_mpanel_info"><span class="t99_mpanel_phone">{txtPhone}</span><input type="text" id="t99_msg_phone"></div><div class="t99_mpanel_info"><span class="t99_mpanel_email">{txtEmail}</span><input type="text" id="t99_msg_email"></div><div class="t99_mpanel_info"><span class="t99_mpanel_qq">{txtQQ}</span><input type="text" id="t99_msg_qq"></div></div><div id="t99_mpanel_submit" >{txtSubmit}</div><a id="t99_mpanel_freePhone" href="javascript:;" onclick="doyoo.util.openPhone();return false;">{txtFreePhone}</a></div>';
                        var idx = this.index;
                        this.obj.innerHTML = tpl(h, {
                            cId: E.compId,
                            gId: this.group,
                            txtTip: lang_tip[curl],
                            txtName: lang_name[curl],
                            txtPhone: lang_phone[curl],
                            txtEmail: lang_email[curl],
                            txtQQ: lang_qq[curl],
                            txtSubmit: lang_submit[curl],
                            title: this.title,
                            txtFreePhone: lang_freePhone[curl]
                        });
                        this.obj.style.backgroundImage = fp("m_b", idx);
                        this.head = $("t99_mpanel_title");
                        var msgContent = $("t99_msg_content");
                        msgContent.onfocus = function() {
                            if (this.value == lang_tip[curl]) {
                                this.value = ""
                            }
                        }
                        ;
                        msgContent.onblur = function() {
                            if (this.value == "") {
                                this.value = lang_tip[curl]
                            }
                        }
                        ;
                        this.miner = $("t99_mpanel_miner");
                        this.submiter = $("t99_mpanel_submit");
                        this.freePhone = $("t99_mpanel_freePhone");
                        this.miner.style.backgroundImage = fp("m_close", idx);
                        this.submiter.style.backgroundImage = fp("m_btn", idx);
                        this.freePhone.style.backgroundImage = fp("m_p", idx);
                        if (this.hidePhone) {
                            this.freePhone.style.display = "none"
                        }
                        var me = this;
                        return this
                    },
                    initPos: function() {
                        var tar = {
                            bottom: 5
                        };
                        var lr = this.pos && "left" || "right";
                        tar[lr] = 5;
                        extend(this.obj.style, {
                            bottom: "5px",
                            top: "auto"
                        });
                        this.obj.style[lr] = "5px";
                        return tar
                    },
                    start: function() {
                        var me = this;
                        var tar = me.initPos();
                        setTimeout(function() {
                            show(me.obj);
                            slide(me.obj, 2, tar)
                        }, (this.delay < 0 ? 0 : this.delay) * 1000);
                        this.flier = fly(me.obj, me.head, 213, 241, tar)
                    },
                    success: function() {
                        this.minimize()
                    }
                }
            }
        )());
        var fixScale = function() {
            if ($.mobile && E.fixMobileScale) {
                var metaTag = document.createElement("meta");
                metaTag.name = "viewport";
                metaTag.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0";
                document.getElementsByTagName("head")[0].appendChild(metaTag)
            }
        };
        var parseEnv = function(o) {
            o = o || {};
            localdb = getCookie(id_s) || "";
            var refer = doc.referrer
                , lid = getCookie(id_l) || ""
                , re = new RegExp("_" + ci + ":(\\d+)")
                , cts = localdb.match(re);
            var getl = function(key) {
                var re1 = new RegExp(key + ":([^,]*)","i");
                var v = lid.match(re1);
                return unescape(v && v.length > 1 && v[1] || "")
            };
            var parsev = function() {
                var rtn, now = +new Date();
                if ((rtn = /^([^_]+)_([\d]+)/i.exec(o.vid)) != null && Number(rtn[2]) > now) {
                    return rtn[1]
                }
                return null
            };
            var ct = o.ct || cts && cts.length > 1 && cts[1] || 0;
            var ev = {
                uId: o.id || localdb.match(/^([^_]+)/) || E.vId,
                vId: o.vid && parsev() || getl("v") || ++ct && E.vId,
                counter: ct,
                refer: (!refer || sameSite(refer)) ? getl("ref") : refer,
                p0: getl("p0") || docurl,
                reseve: (typeof reseveKey == "undefined" ? (getl("r") || guessR()) : reseveKey)
            };
            ev.uId != "undefined" || (ev.uId = E.vId);
            ev.uId = /[^\w\d]*([\w\d]+)[^\w\d]*/.exec(ev.uId)[1];
            if (ev.uId.length < 30) {
                ev.uId += +new Date()
            }
            localdb = ev.uId + "_" + ci + ":" + ct;
            var sm = getl("mon");
            if (sm) {
                if (sm.indexOf("m7828") != -1) {
                    sm = null
                }
            }
            ev.mon = sm || E.mon;
            localtemp = "v:" + ev.vId + ",ref:" + escape(ev.refer) + ",r:" + escape(ev.reseve) + ",mon:" + ev.mon + ",p0:" + escape(ev.p0);
            return ev
        };
        var m, p, msgp, inited = false;
        var fixFlash = function() {
            var fs = doc.getElementsByTagName("object")
                , ems = doc.getElementsByTagName("embed");
            var i = 0;
            for (i = 0; i < fs.length; i++) {
                var wc = doc.createElement("param");
                wc.name = "wmode";
                wc.value = "transparent";
                fs[i].appendChild(wc)
            }
            for (i = 0; i < ems.length; i++) {
                ems[i].setAttribute("wmode", "transparent")
            }
        };
        attachE(window, "load", function() {
            E.ready = true;
            E.fixFlash && fixFlash()
        });
        D.shareReady = function(mod) {
            share = findSWF("looyuShare")
        }
        ;
        D.probe = function() {
            return {
                c: ci,
                id: "",
                vid: "",
                ct: "",
                site: site
            }
        }
        ;
        D.init = function(o) {
            if (inited) {
                return
            }
            try {
                inited = true;
                if (E.workDomain) {
                    var domains = E.workDomain.split(/,|;|\s+/ig);
                    var found = false;
                    var domain = document.domain;
                    for (var i = 0; i < domains.length; i++) {
                        if (domain.indexOf(domains[i]) >= 0) {
                            found = true;
                            break
                        }
                    }
                    if (!found) {
                        return
                    }
                }
                ready(fixScale);
                extend(E, parseEnv(o));
                inB ? D.start() : ready(D.start.doyoodg(D))
            } catch (e) {
                if (typeof console != "undefined") {
                    console.log && console.log(e)
                }
            }
            return {
                c: ci,
                id: E.uId,
                vid: E.vId,
                ct: E.counter,
                site: site
            }
        }
        ;
        D.start = function() {
            conhtml = doc.getElementsByTagName("html")[0].innerHTML;
            conhtml = conhtml.replace(/<script[^<>]+doyoo\.net\/(?!j\.jsp)[^<>]+><\/script>|<link[^<>]+doyoo\.net[^<>]+>|<object((?!<\/object>).)*looyuShare((?!<\/object>).)*file\.doyoo\.net((?!<\/object>).)*<\/object>/ig, "");
            conhtml = conhtml.replace(/<div\s+id=['|"]doyoo_[^><]+['|"]\s*>\s*<\/div>/ig, "");
            D.panelParam && (p = new P(D.panelParam)) && p.builder();
            !$.mobile && D.msgParam && (msgp = new MsgPanel(D.msgParam)) && msgp.builder().start();
            msgp && (doyoo.util.submitMessage = msgp.doSubmit.doyoodg(msgp));
            var topd = window
                , findm = false
                , maxloop = 10;
            while (topd != top && (--maxloop)) {
                topd = topd.parent;
                if (topd.doyoo && topd.doyoo.monitor) {
                    findm = true;
                    break
                }
            }
            if (topd == window || !findm) {
                m = new M(D.monParam);
                D.monParam && (D.monitor = m) && m.builder();
                D.monParam && (doyoo.util.accept = m.accept.doyoodg(m));
                ready(function() {
                    var r = E.refer
                        , info = parseUrl(r) || {};
                    if ((info.domain || "").indexOf("baidu.com") >= 0 && (info.param || {})["xst"]) {
                        var url = "//va07cwx.looyu.com/mon/enter/" + ci + "?ref=" + encodeURIComponent(r) + "&u=" + E.uId + "&w=" + encodeURIComponent(docurl);
                        jsonRequest(url, function() {
                            E.keyword = doyoo.resp.query || "";
                            D.monParam && m.record()
                        })
                    } else {
                        D.monParam && m.record()
                    }
                })
            } else {
                topd.doyoo.monitor.refresh({
                    t: doc.title,
                    u: docurl
                })
            }
            if (!D.monParam) {
                var sharediv = $("doyoo_share");
                if (!sharediv) {
                    sharediv = createEle("div", "doyoo_share")
                }
                if (sharediv) {
                    var obj = monitorObj();
                    obj.c = "oc";
                    createEle("iframe", {
                        src: E.mon + "/s?" + obj2str(obj)
                    }, sharediv)
                }
            }
            upvid()
        }
        ;
        ready(function() {
            loaded = true;
            var snf = D.sniffer
                , idg = {};
            if (snf) {
                var ids = snf.ids.split(",")
                    , lb = "looyu_bound"
                    , gids = snf.gids.split(",")
                    , regStr = snf.ids.replace(/([\.\-\[\]\{\}\?\(\)\|])/ig, function($0, $1) {
                    return "\\" + $1
                })
                    , reg = new RegExp(regStr.replace(/\s*,\s*/ig, "|"),"ig");
                for (var i = 0; i < ids.length; i++) {
                    idg[ids[i]] = gids[i]
                }
                var ebound = function(nd, op) {
                    if (nd.nodeType == 3) {
                        return op.getAttribute(lb)
                    }
                    return nd.getAttribute(lb)
                };
                var ebind = function(nd, op) {
                    (nd.nodeType == 3 && op || nd)["setAttribute"](lb, 1)
                };
                var snifferNode = function(nd) {
                    var o_p = nd.parentNode;
                    if (ebound(nd, o_p)) {
                        return
                    }
                    if (nd.nodeType == 3 && o_p.nodeName != "A") {
                        if (nd.data.search(reg) == -1) {
                            return
                        }
                        var span = doc.createElement("span");
                        span.innerHTML = nd.data.replace(reg, function($0) {
                            return '<a href="javascript:;" onclick="doyoo.util.openChat(\'g=' + idg[$0] + "');return false\">" + $0 + "</a>"
                        });
                        o_p.replaceChild(span, nd)
                    } else {
                        if (nd.nodeType == 1) {
                            var rst = reg.exec(nd.id) || reg.exec(nd.className) || nd.nodeName == "IMG" && reg.exec(nd.src);
                            if (!rst) {
                                return
                            }
                            attachE(nd, "click dblclick", doyoo.util.openChat.doyoodg(null, ["g=" + idg[rst[0]]]));
                            nd.style.cursor = "pointer"
                        }
                    }
                    ebind(nd, o_p)
                };
                var count = 0;
                var processNode = function(nd) {
                    var o = nd.childNodes
                        , nn = (nd.nodeName || "").toLowerCase();
                    if ("script" == nn || "style" == nn || "link" == nn) {
                        return
                    }
                    count++;
                    try {
                        snifferNode(nd)
                    } catch (e) {}
                    if (o && o.length > 0) {
                        for (var i = 0; i < o.length; i++) {
                            processNode(o[i])
                        }
                    }
                };
                if (ids.length) {
                    processNode(doc.body)
                }
            }
        });
        D.init();
        setTimeout(function() {
            D.init()
        }, 3000)
    }
)(doyoo);
