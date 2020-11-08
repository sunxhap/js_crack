
var h = {}
    , mt = {}
    , c = {
    id: "9bcbda9cbf86757998a2339a0437208e",
    dm: ["match.python-spider.com"],
    js: "tongji.baidu.com/hm-web/js/",
    etrk: [],
    cetrk: [],
    cptrk: [],
    icon: '',
    ctrk: [],
    nv: -1,
    vdur: 1800000,
    age: 31536000000,
    rec: 0,
    rp: [],
    trust: 0,
    vcard: 0,
    qiao: 0,
    lxb: 0,
    kbtrk: 0,
    pt: 0,
    spa: 0,
    oc: 0,
    aet: '',
    hca: 'AFDDD69329BC244F',
    conv: 0,
    med: 0,
    cvcc: '',
    cvcf: [],
    apps: ''
};


var a, b, d, e, f, g;
k.N = s.getData("Hm_lpvt_" + c.id) || 0;
13 === k.N.length && (k.N = Math.round(k.N / 1E3));
b = this.Sb();
a = 4 !== b ? 1 : 0;
if (g = s.getData("Hm_lvt_" + c.id)) {
    e = g.split(",");
    for (f = e.length - 1; 0 <= f; f--)
        13 === e[f].length && (e[f] = "" + Math.round(e[f] / 1E3));
    for (; 2592E3 < k.J - e[0]; )
        e.shift();
    f = 4 > e.length ? 2 : 3;
    for (1 === a && e.push(k.J); 4 < e.length; )
        e.shift();
    g = e.join(",");
    e = e[e.length - 1]
} else
    g = k.J,
        e = "",
        f = 1;
this.fc() ? (s.setData("Hm_lvt_" + c.id, g, c.age),
    s.setData("Hm_lpvt_" + c.id, k.J),
    d = r.hc(this.R(), this.da())) : this.Eb();