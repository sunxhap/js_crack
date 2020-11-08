
// ==UserScript==
// @name         boss_cookie hook
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include      *
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var cookie_cache = document.cookie;
    Object.defineProperty(document, 'cookie', {
        get: function(){
            return cookie_cache;
        },
        set: function (val) {
            console.log('Setting cookie', val);
            if(val.indexOf('__zp_stoken__') != -1){
                debugger;
            }
            var cookie = val.split(";")[0];
            var ncookie = cookie.split("-");
            var flag = false;
            var cache = cookie_cache.split(";");
            cache = cache.map(function(a){
                if (a.split("=")[0] === ncookie[0]){
                    flag = true;
                    return cookie;
                }
            });
            cookie_cache = cache.join(";");
            if(!flag){
                cookie_cache += cookie + ";";
            }
            console.log('cookie_cache', val);
            return cookie_cache;
        }
    });
    // Your code here...
})();