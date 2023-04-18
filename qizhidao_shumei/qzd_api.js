const express = require("express");
const bodyParser = require("body-parser");

var md5 = require('md5-node');
const zlib = require('zlib');

var qzd_utils = require("./qzd_utils");

const app_demo = express();
const PORT = 30111;

app_demo.use(bodyParser.json({
    limit: "5000kb"
}));
app_demo.use(bodyParser.raw({
    limit: "5000kb"
}));
app_demo.use(bodyParser.urlencoded({
    extended: false,
    limit: "5000kb"
}));

app_demo.use(bodyParser.text({
    type: "text/plain",
    limit: "5000kb"
}));


app_demo.get("/get_qzd_uuid", (req, resp) => {
    try {
        console.time("get_qzd_uuid cost time");
        r_data = {'qzd_uuid': qzd_utils.qizhidao_getLocalsmid_uuid(), 'code': 200};
        resp.json(r_data);

    } catch (err) {
        console.error(err);
        // resp.json(500, {'code': 500, 'msg': ""});
        resp.json({'code': 500, 'msg': ""});
    } finally {
        console.timeEnd("get_qzd_uuid cost time");
    }
});


app_demo.post("/qzd_gzip", (req, resp) => {

    try {
        console.time("qzd_gzip cost time");

        var request_ua = req.body.request_ua;

        time_now = new Date().getTime();
        d_0x1070bd = {
            "protocol": 21,
            "organization": "CSrn3Jcu7Q3n5GGcqTbb",
            "appId": "default",
            "os": "web",
            "version": "3.0.0",
            "sdkver": "3.0.0",
            "box": "",
            "rtype": "all",
            "smid": qzd_utils.getLocalsmid(),
            "subVersion": "1.0.0",
            "time": qzd_utils.randomInt(100, 500),
            "plugins": "ChromePDFViewerPortableDocumentFormatinternal-pdf-viewer2,ChromiumPDFViewerPortableDocumentFormatinternal-pdf-viewer2,MicrosoftEdgePDFViewerPortableDocumentFormatinternal-pdf-viewer2,PDFViewerPortableDocumentFormatinternal-pdf-viewer2,WebKitbuilt-inPDFPortableDocumentFormatinternal-pdf-viewer2",
            "ua": request_ua,
            "canvas": qzd_utils.getRandomString(8),
            "timezone": -480,
            "platform": "Win32",
            // 请求链接
            "url": "https://www.qizhidao.com/check?searchKey=%E6%98%86%E5%B1%B1%E9%BE%99%E8%85%BE%E5%85%89%E7%94%B5%E8%8",
            "referer": "",
            "res": "1920_1080_24_1",
            "clientSize": "0_0_1920_0_1920_1080_1920_1040",
            "status": "0010",
            // "vpw": "caace287-c8f4-44da-8743-ab47e1d6af72",
            "vpw": qzd_utils.qizhidao_getLocalsmid_uuid(),
            // "svm": 1681699228576,
            "svm": time_now,
            "trees": qzd_utils.qizhidao_getLocalsmid_uuid(),
            "pmf": time_now,
            // "ex": "",
        };
        d_0x1070bd['tn'] = md5(qzd_utils.qzd_0x18c848(d_0x1070bd));

        var qzd_text = qzd_utils.qizhidao_jiami(d_0x1070bd);
        qzd_text = JSON.stringify(qzd_text);

        qzd_text_gzip = '';
        zlib.gzip(qzd_text, (err, result) => {
            if (err) {
                console.error(err);
                return;
            }

            qzd_text_gzip = result.toString('base64');
            qzd_text_gzip = qzd_text_gzip.replace('AAACi', 'AAAAy');
            qzd_text_gzip = qzd_text_gzip.replace('AAACp', 'AAAA5');

            r_data = {'qzd_gzip_head': qzd_text_gzip, 'code': 200};

            resp.json(r_data);

        });

    } catch (err) {
        console.error(err);

        resp.json({'code': 500, 'msg': ""});

    } finally {

        console.timeEnd("qzd_gzip cost time");
    }
});

app_demo.get('/', function (req, res) {
    console.log(1111);
    //url.parse(req.url, true)true把参数query属性转对象
    // var data = url.parse(req.url, true);
    res.send({'ping': true});
})

process.on('uncaughtException', function (err) {
    console.log('uncaughtException---');
    //打印出错误的调用栈方便调试
    console.log(err.stack);
});

app_demo.listen(PORT, () => {
});
