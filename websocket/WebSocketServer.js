var ws = require("nodejs-websocket");
 
console.log("开始建立连接...");
 
 
var server = ws.createServer(function(conn){
      let cached = {};
       
    conn.on("text", function (msg) {
        if (!msg) return;
        console.log("msg", msg);
 
        var key = conn.key;
        if ((msg === "Browser") || (msg === "Python")){
            // browser或者python第一次连接
            cached[msg] = key;
            console.log("cached",cached);
            return;
        }
        if (Object.values(cached).includes(key)){
            console.log(server.connections.forEach(conn=>conn.key));
            var targetConn = server.connections.filter(function(conn){
                return conn.key !== key;
            });
            console.log("将要发送的实参:",msg);
            targetConn.forEach(conn=>{
                conn.send(msg);
            })
        }
    });
    conn.on("close", function (code, reason) {
        console.log("关闭连接")
    });
    conn.on("error", function (code, reason) {
        console.log("异常关闭")
    });
}).listen(10512);
 
console.log("WebSocket建立完毕");