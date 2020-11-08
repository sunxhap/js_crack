

const jsdom = require("jsdom");
const {JSDOM} = jsdom;

var content = '<!DOCTYPE html>\n' +
    '<html lang="en">\n' +
    '<head>\n' +
    '    <meta charset="UTF-8">\n' +
    '    <title>Title</title>\n' +
    '</head>\n' +
    '<body>\n' +
    '\n' +
    '</body>\n' +
    '</html>';
const dom = (new JSDOM(content));

window = dom.window;

// window

document = window.document;
XMLHttpRequest = window.XMLHttpRequest;

var ct = document["createElement"]("canvas");
if (ct["getContext"]) {
    var cu = ct["getContext"]("2d");
    var cv = '1111111111';
    cu["textBaseline"] = "top";
    cu["font"] = "14px 'Arial'";
    cu["textBaseline"] = "tencent";
    cu["fillStyle"] = "#f60";
    cu["fillRect"](125, 1, 62, 20);
    cu["fillStyle"] = "#069";
    cu["fillText"](cv, 2, 15);
    cu["fillStyle"] = "rgba(102, 204, 0, 0.7)";
    cu["fillText"](cv, 4, 17);
    var cw = ct["toDataURL"]()["replace"]("data:image/png;base64,", "");
}
