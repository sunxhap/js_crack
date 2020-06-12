
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var function_js = require('./xiniudata-parse');


app.use(bodyParser.urlencoded({
    parameterLimit: 50000,
    limit: '50mb',
    extended: false

}));


app.post('/api/xixiu', function (req, res) {
    var resp = {'status': 1};
    try {
        var data_d = req.body.data_d.toString();

        var data = function_js.parse_js(data_d);
        resp.data = data;

    } catch (err) {
        resp.status = 2;
        resp.message = err.toString();
        console.log(err);
    } finally {
        res.send(JSON.stringify(resp));
    }
});

var server = app.listen(1008, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});