
USERID = "a3743a3a";
USERKEY = "05726c8f";

// console.log((0, 111)("" + '' + USERID, USERKEY).toString())

e = "5a65567455425343744b61";
t = Object.keys(e).sort().map(function (t) {
    return "" + t + e[t];
}).join("");

console.log(t);