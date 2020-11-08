

function getRandomString(Q) {
    var P, N = [], O = "abcdefghijklmnopqrstuvwxyz0123456789", M = 35;
    for (P = 0; P < Q; P++) {
        N.push(O.charAt(Math.round(Math.random() * M)))
    }
    return N.join("")
}