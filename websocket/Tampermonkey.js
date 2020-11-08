// ==UserScript==
// @name         WebSocket test
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.baidu.com/*
// @grant        none
// ==/UserScript==

(function() {
    if (window.WebSocket) {
        //这个if判断是可以去掉的。这里为了好看，在if语句外可以随便做你想做的事情，不报错即可。
        window.ws = new WebSocket('ws://127.0.0.1:10512/');
        window.ws.onopen = function(e) {
            console.log("连接服务器成功");
            window.ws.send("Browser");
        };
        window.ws.onclose = function(e) {
            console.log("服务器关闭");
        };
        window.ws.onerror = function() {
            console.log("连接出错");
        };

        window.ws.onmessage = function(e) {
            //发送服务在这里，函数可以随便掉。不报错即可。
            let result = btoa(e.data);

            console.log(result);

            //发送给Python
            window.ws.send(result);
        };
    }
})();