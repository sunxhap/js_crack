
function d_genId() {
    var id = '', ids = '0123456789abcdef';
    for (var i = 0; i < 32; i++) {
        id += ids.charAt(Math.floor(Math.random() * 16));
    }
    return id;
}


function getCommomFun(){
    var E = {
        "secure": true,
        "mon": "//m6816.talk99.cn/monitor",
        "chat": "//chat7731.talk99.cn/chat",
        "file": "//aux.soperson.com",
        "compId": 20002519,
        "confId": 10074622,
        "workDomain": "",
        "vId": d_genId(),
        "lang": "",
        "fixFlash": 0,
        "fixMobileScale": 0,
        "subComp": 0,
        "_mark": "54ba23e51b7f8585a36790570e5faf1539fb34585a0758b6c883a92fbffde94cb9d411fd90b1ead1"
    };

    var ev = {
        uId: E.vId,
        vId: E.vId,
        counter: 1,
        refer: '',
        p0: "https://www.crccmall.com/static/tendering/index.html#/inquiryTendingList?tabsIsShow=prevenientInfo",
        reseve: ""
    };

    var ci = E.compId;

    var localdb = ev.uId + "_" + ci + ":" + 1;

    ev.mon = "//m6816.talk99.cn/monitor";
    var localtemp = "v:" + ev.vId + ",ref:" + escape(ev.refer) + ",r:" + escape(ev.reseve) + ",mon:" + ev.mon + ",p0:" + escape(ev.p0);

    // return {'looyu_20002519': localtemp, 'looyu_id': localdb}
    return localtemp + '||||' + localdb
}

// console.log(getCommomFun());