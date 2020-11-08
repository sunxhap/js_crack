
## 通过js 注入方式在页面加入js 代码

### cookie钩子
    用于定位cookie中关键参数生成位置
```
    var code = function(){
    var org = document.cookie.__lookupSetter__('cookie');
    document.__defineSetter__("cookie",function(cookie){
        if(cookie.indexOf('TSdc75a61a')>-1){
            debugger;
        }
        org = cookie;
    });
        document.__defineGetter__("cookie",function(){return org;});
    }
    var script = document.createElement('script');
    script.textContent = '(' + code + ')()';
    (document.head||document.documentElement).appendChild(script);
    script.parentNode.removeChild(script);
```

### 请求钩子
    用于定位请求中关键参数生成位置
    
```
var code = function(){
var open = window.XMLHttpRequest.prototype.open;
window.XMLHttpRequest.prototype.open = function (method, url, async){
    if (url.indexOf("MmEwMD")>-1){
        debugger;
    }
    return open.apply(this, arguments);
};
}
var script = document.createElement('script');
script.textContent = '(' + code + ')()';
(document.head||document.documentElement).appendChild(script);
script.parentNode.removeChild(script);
```
    
###     header钩子
    用于定位header中关键参数生成位置

```
var code = function(){
var org = window.XMLHttpRequest.prototype.setRequestHeader;
window.XMLHttpRequest.prototype.setRequestHeader = function(key,value){
    if(key=='Authorization'){
        debugger;
    }
    return org.apply(this,arguments);
}
}
var script = document.createElement('script');
script.textContent = '(' + code + ')()';
(document.head||document.documentElement).appendChild(script);
script.parentNode.removeChild(script);
```
    
###     参考 
    https://www.cnblogs.com/Renyi-Fan/p/12650448.html
    
