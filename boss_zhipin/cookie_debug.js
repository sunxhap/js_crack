
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
    Object.defineProperty(window, 'DEBUG', {
        get: function(){
            debugger
        },
        set: function (val) {
            debugger
        }
    });
})();