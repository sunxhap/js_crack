// var val = 'helloword';
// console.log('明文：', val);
// var key = "f7205fffe445408a84wqesadasdasdf"; //密钥







function get_authorization(e){
    var USERID = "a3743a3a";
    var USERKEY = "05726c8f";
    var t = Object.keys(e).sort().map(function (t) {
        return "" + t + e[t];
    }).join("");

    var sha1 = require('./sha1.js');
    var sha1Pw = sha1.HmacSHA1("" + t + USERID, USERKEY);
    return sha1Pw.toString()
}
e = {
    'pid': '5a65567455425343744b61',
    'pindex': '1',
    'typestr': '1',
    'userid': 'a3743a3a'
};
console.log('sha1加密:', get_authorization(e));

// f3e16a2d84df572dd0cf7fb29fc29c5755ceb13f success