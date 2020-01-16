# -*- coding: utf-8 -*-
# @Time: 2020/1/14 14:08

import requests
import json
import json


def api_geetest_w(body=""):
    nodejs_api_url = "http://localhost:1008/api/geetest_w"
    nodejs_headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3887.7 Safari/537.36', }
    res = requests.post(nodejs_api_url, headers=nodejs_headers, data=body, verify=False, timeout=60)
    r_content = res.content
    return json.loads(r_content)["w"]


def api_geetest_get_params(body=""):
    nodejs_api_url = "http://localhost:1008/api/geetest_w"
    nodejs_headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3887.7 Safari/537.36', }
    res = requests.post(nodejs_api_url, headers=nodejs_headers, data=body, verify=False, timeout=60)
    r_content = res.content
    return r_content

# vob = {
#     "feedback": "",
#     "i18n_labels": {
#         "feedback": "\u5e2e\u52a9\u53cd\u9988",
#         "error": "\u8bf7\u91cd\u8bd5",
#         "tip": "\u8bf7\u5b8c\u6210\u4e0b\u65b9\u9a8c\u8bc1",
#         "logo": "\u7531\u6781\u9a8c\u63d0\u4f9b\u6280\u672f\u652f\u6301",
#         "loading": "\u52a0\u8f7d\u4e2d...",
#         "refresh": "\u5237\u65b0\u9a8c\u8bc1",
#         "close": "\u5173\u95ed\u9a8c\u8bc1",
#         "success": "sec \u79d2\u7684\u901f\u5ea6\u8d85\u8fc7 score% \u7684\u7528\u6237",
#         "read_reversed": false,
#         "voice": "\u89c6\u89c9\u969c\u788d",
#         "slide": "\u62d6\u52a8\u6ed1\u5757\u5b8c\u6210\u62fc\u56fe",
#         "forbidden": "\u602a\u7269\u5403\u4e86\u62fc\u56fe\uff0c\u8bf7\u91cd\u8bd5",
#         "fail": "\u8bf7\u6b63\u786e\u62fc\u5408\u56fe\u50cf",
#         "cancel": "\u53d6\u6d88"
#     },
#     "id": "abc828c3aac6ee757a48c5d2b27d6664c",
#     "gt": "4a28913077af48ca6eadebe01f3be4d2",
#     "c": [12, 58, 98, 36, 43, 95, 62, 15, 12],
#     "bg": "pictures/gt/9f9cff207/bg/553e7d73a.jpg",
#     "theme_version": "3.2.0",
#     "clean": true,
#     "xpos": 0,
#     "benchmark": false,
#     "product": "popup",
#     "https": false,
#     "theme": "golden",
#     "slice": "pictures/gt/9f9cff207/slice/553e7d73a.png",
#     "so": 0,
#     "api_server": "http://api.geetest.com/",
#     "height": 116,
#     "template": "",
#     "link": "",
#     "type": "slide",
#     "logo": true,
#     "hide_delay": 800,
#     "s": "4a715479",
#     "show_delay": 250,
#     "mobile": false,
#     "challenge": "bc828c3aac6ee757a48c5d2b27d6664cm2",
#     "ypos": 48,
#     "fullbg": "pictures/gt/9f9cff207/9f9cff207.jpg",
#     "version": "6.0.9",
#     "fullpage": false,
#     "static_servers": ["static.geetest.com/", "dn-staticdown.qbox.me/"]
# }


# vob = {
#     "feedback": "",
#     "i18n_labels": {
#         "feedback": "\u5e2e\u52a9\u53cd\u9988",
#         "error": "\u8bf7\u91cd\u8bd5",
#         "tip": "\u8bf7\u5b8c\u6210\u4e0b\u65b9\u9a8c\u8bc1",
#         "logo": "\u7531\u6781\u9a8c\u63d0\u4f9b\u6280\u672f\u652f\u6301",
#         "loading": "\u52a0\u8f7d\u4e2d...",
#         "refresh": "\u5237\u65b0\u9a8c\u8bc1",
#         "close": "\u5173\u95ed\u9a8c\u8bc1",
#         "success": "sec \u79d2\u7684\u901f\u5ea6\u8d85\u8fc7 score% \u7684\u7528\u6237",
#         "read_reversed": False,
#         "voice": "\u89c6\u89c9\u969c\u788d",
#         "slide": "\u62d6\u52a8\u6ed1\u5757\u5b8c\u6210\u62fc\u56fe",
#         "forbidden": "\u602a\u7269\u5403\u4e86\u62fc\u56fe\uff0c\u8bf7\u91cd\u8bd5",
#         "fail": "\u8bf7\u6b63\u786e\u62fc\u5408\u56fe\u50cf",
#         "cancel": "\u53d6\u6d88"
#     },
#     "id": "abc828c3aac6ee757a48c5d2b27d6664c",
#     "gt": "4a28913077af48ca6eadebe01f3be4d2",
#     "c": [12, 58, 98, 36, 43, 95, 62, 15, 12],
#     "bg": "pictures/gt/9f9cff207/bg/553e7d73a.jpg",
#     "theme_version": "3.2.0",
#     "clean": True,
#     "xpos": 0,
#     "benchmark": False,
#     "product": "popup",
#     "https": False,
#     "theme": "golden",
#     "slice": "pictures/gt/9f9cff207/slice/553e7d73a.png",
#     "so": 0,
#     "api_server": "http://api.geetest.com/",
#     "height": 116,
#     "template": "",
#     "link": "",
#     "type": "slide",
#     "logo": True,
#     "hide_delay": 800,
#     "s": "4a715479",
#     "show_delay": 250,
#     "mobile": False,
#     "challenge": "bc828c3aac6ee757a48c5d2b27d6664cm2",
#     "ypos": 48,
#     "fullbg": "pictures/gt/9f9cff207/9f9cff207.jpg",
#     "version": "6.0.9",
#     "fullpage": False,
#     "static_servers": ["static.geetest.com/", "dn-staticdown.qbox.me/"]
# }

# gt = '4a28913077af48ca6eadebe01f3be4d2'
# challenge = '487fd7fbe26770948014a477eadbaf176q'
# distance = 100
# track = [[-21, -21, 0], [-17, -21, 0], [-23, -21, 0], [0, 0, 0], [0, 0, 205], [4, -1, 220], [8, -1, 238], [13, -1, 251], [18, -1, 269], [21, -2, 284], [25, -2, 300], [29, -2, 316], [33, -2, 332], [36, -2, 346], [40, -2, 364], [44, -2, 380], [49, -2, 397], [52, -2, 412], [57, -2, 428], [63, -2, 442], [67, -2, 460], [69, -2, 475], [72, -2, 492], [73, -1, 508], [76, -1, 524], [79, -1, 539], [82, -1, 555], [86, -1, 571], [89, -1, 588], [92, -1, 603], [96, 0, 619], [99, 0, 635], [105, 1, 650], [108, 1, 667], [114, 2, 683], [118, 3, 699], [121, 3, 715], [122, 4, 731], [124, 4, 748], [128, 5, 763], [129, 5, 779], [130, 6, 795], [131, 6, 812], [132, 6, 829], [134, 6, 873], [134, 6, 992], [134, 6, 1014], [135, 6, 1067], [135, 6, 1156], [137, 6, 1171], [137, 6, 1196], [138, 6, 1214], [138, 6, 1303], [140, 6, 1333], [140, 6, 1445]]
# track = json.dumps(track)
# vob_params = json.dumps(vob)
# body = {"vob_params": vob_params, 'track': track}
# print(api_geetest_get_params(body))