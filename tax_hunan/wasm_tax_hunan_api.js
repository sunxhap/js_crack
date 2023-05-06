
const express = require("express");
const bodyParser = require("body-parser");

var daby_debug = require("./daby_debug");

const app_rs = express();
const PORT = 4011;

app_rs.use(bodyParser.json({
    limit: "5000kb"
}));
app_rs.use(bodyParser.raw({
    limit: "5000kb"
}));
app_rs.use(bodyParser.urlencoded({
    extended: false,
    limit: "5000kb"
}));

app_rs.use(bodyParser.text({
    type: "text/plain",
    limit: "5000kb"
}));


app_rs.post("/tax_hunan", (req, resp) => {

    try {

        useragent = req.body.useragent;
        cookie_bWFua2V5 = req.body.cookie_bWFua2V5;

        daby_debug.get_Ym90a2V5_cookie(cookie_bWFua2V5, useragent);

        setTimeout(function () {
            // 这里就是处理的事件
            global_Ym90a2V5 = global.global_Ym90a2V5;
            return resp.json({'Ym90a2V5_cookie': global_Ym90a2V5});

        }, 1000);

    } catch (err) {
        console.error(err);

        resp.json({'code': 500, 'msg': ""});

    } finally {

    }
});

app_rs.get('/', function(req, res) {
    console.log(1111);

    res.send({'ping': true});
})

process.on('uncaughtException', function (err) {
    console.log('uncaughtException---');
    //打印出错误的调用栈方便调试
    console.log(err.stack);
});

app_rs.listen(PORT,()=>{});
