# -*- coding: utf-8 -*-
# @Time: 2020/4/24 20:09


import requests
import os
import sys

requests.packages.urllib3.disable_warnings()

from urllib.parse import urlencode
from urllib.parse import quote

uid = "07e2387ab53a4d6f930b8d9a9be71bdf"
cookie = "_gid=GA.6735719273.49145162485070; _ga=GA.1.2782e1dcc435d.10709bcb42570e12878e"
token = "5b19a734737b4eec94144ee5901a7acc"

fp = "Z1+ZTRdPKV2+WjqWqgnB7ltrluDKansTDDondrGQC6wx/4oQ36MmLMd6\\lmwu5fer8uy+d\\\\BPI3tzopUAVXbdfLxsMgoHcDqDlndY\\N5l4yVL2TBr4VaduksTyD5UfJSIyYM3HJUIRRaTr8wibwjnP87ZZqR5oX2LZ++5qm\\NacAh5\\:1587730881443"
# fp = ""

cb = "zxrCWjxh1LOc9uSCl/bZ8/gVjqaY\\89oL+vLnFibG/xKkuavl6TjITiwlUpg/66T"  # 注意转义 , 注意每次替换,
print('cb', cb)

android_headers = {'Accept-Language': 'zh-CN,zh;q=0.9', 'Accept-Encoding': 'gzip, deflate, br',
                   'Sec-Fetch-Site': 'cross-site', 'Accept': '*/*',
                   'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
                   'Host': 'c.dun.163yun.com', 'Referer': 'https://dun.163.com/trial/icon-click?force=true',
                   }
# android
params = {
    "id": uid,
    "fp": fp,
    'https': 'true',
    "type": "7",
    "version": "2.13.6",
    "dpr": "3",             # pc    1
    "dev": "2",             # dev	1
    "cb": cb,
    "ipv6": "false",
    "runEnv": "10",
    "group": "",
    "scene": "",
    "width": "320",
    "token": "",
    "callback": "__JSONP_kx8kra0_7",
}

# print(params)
get_type_url = "https://c.dun.163yun.com/api/v2/get?"
send_url = get_type_url + urlencode(params)
print(send_url)

res = requests.get(send_url, headers=android_headers, verify=False)
print(res.content)


# pc
"""
id	07e2387ab53a4d6f930b8d9a9be71bdf
fp	Z1+ZTRdPKV2+WjqWqgnB7ltrluDKansTDDondrGQC6wx/4oQ36MmLMd6\lmwu5fer8uy+d\\BPI3tzopUAVXbdfLxsMgoHcDqDlndY\N5l4yVL2TBr4VaduksTyD5UfJSIyYM3HJUIRRaTr8wibwjnP87ZZqR5oX2LZ++5qm\NacAh5\:1587730881443
https	true
type	7
version	2.13.6
dpr	1
dev	1
cb	rVohmHyLIbzWVRmxH17c8Dxyo5ZHs+YJHeGPT0RdHKo7n\/ZCn4BMkXAIzwT6RaJ
ipv6	false
runEnv	10
group	
scene	
width	320
token	a5b2d81f5b2649ecbfb7f47d5dc9b940
referer	https://dun.163.com/trial/icon-click
callback	__JSONP_1ap1wr6_3
"""
