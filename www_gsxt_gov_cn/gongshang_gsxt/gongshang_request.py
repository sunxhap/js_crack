# -*- coding: utf-8 -*-

import requests

url = "http://www.gsxt.gov.cn/affiche-query-area-info-paperall.html"
headers = {
    'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36"
}
session = requests.session()


# response = session.get(url, headers=headers)
#
# cookies = requests.utils.dict_from_cookiejar(session.cookies)
# print(cookies)
# print(response.text)

# ---------------------------------------------

cookies = {'__jsl_clearance': '1591958827.257|0|%2BRPFbifdgcoqpXLbC4dvNKgaUCI%3D',
           '__jsluid_h': '9a1aa25ba5e491ae4f62c48fea0b023a'}

querystring = {"noticeType": "21", "areaid": "100000", "noticeTitle": "", "regOrg": "110000"}
payload = "draw=1&start=0&length=10"
res = session.post(url, headers=headers, data=payload, params=querystring, cookies=cookies)
if res.status_code == 200:
    res.encoding = res.apparent_encoding
    print(res.text)

# =--------------------
# session.get(url, headers=headers)
# print(session.cookies)
# cookies = requests.utils.dict_from_cookiejar(session.cookies)
# querystring = {"noticeType": "21", "areaid": "100000", "noticeTitle": "", "regOrg": "110000"}
# payload = "draw=1&start=0&length=10"
# res = session.post(url, headers=headers,data=payload, params=querystring,cookies=cookies)
# if res.status_code == 200:
#     res.encoding = res.apparent_encoding
#     print(res.text)
