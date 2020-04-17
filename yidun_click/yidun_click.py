# -*- coding: utf-8 -*-
# @Time: 2020/4/17 20:04

import requests
import os
import sys

requests.packages.urllib3.disable_warnings()

from urllib.parse import urlencode
from urllib.parse import quote

uid = "07e2387ab53a4d6f930b8d9a9be71bdf"
cookie = "_ga=GA.1.2d7702342ed4a.cc6b34fe7ce68e1340d0; _gid=GA.4215711053.03151330081524"

data = """{"d":"","m":"N1jnhx1o012f+xJtNQsETYCOXzhZ+06ynF/6wknOL8Xqnee2eUwx7d+lt8iFzzEpuO054/T\\4XmYRRaONArOFQWo08ie1w\\Rz7cJk29SBs9BxR\\zxiut6k+L1T8hERjI27gEqi7S89hXjHifUVUta1VXbE/X7\\GOrJHrHiAE0AXMjJza2D0jX4K\\gGwb6T4pdYnNyUHt5AnYXqV2uZWnN0NRA6xdN7+7PbYI2qLemkHhzdKApU2Gr1pq9JOnOuOl1xMVXPCpMR+hx8Sc\\I685Qq76t8B2kvGuAboOdNUTAEbRpmw99\\5luUO9nMj2x5V4\\0crx\\XheHhiuWd4C7xN4zlJONNfBFNNAKJtQsQfVib1b0Rhuc9b/gSJPuBxG8mWA285cwL1BjxERjVLDgEZnv88pSq2lxnYbHtfdsHbApxbfGOe7xrH1IcrpXMjRra2LAJXTu4P8TWG7yLXHCjC6BnsTXw0Stgufw1nu8iAHafZuNML7PI64zIm+izxkF\\KjoGHhj49Zil4DPKjfITCn0GUSHfH\\r5RO4tcZpOmg0B2NIfuAfUtnXcgj7bnQ1PZwy\\eMzA9P+kXxE2e1tcI/sYhejKfJWd07Dxp76pJRVp8WmLzOMdwdH28DFuZ0hPzkREE29eJ6/BUdykWo7dTcwL5wS0EqwdU7X8rx+Swsmljrk2BFnFfEqnYpnSttROnEsrHzOKEpXM0gIa2EJcsx2DcLKWXHsKX6TNKQS7GFcz/w/qS5IUzBRvChXOZRPs1raeNoLSm77iudKRSDkG/+bKfBcz6FInCvspG1+Krz9h4OnY\\EmvwbGBk60B+/1oudLtPxXEa4wbjpaT2kLQ80gVLXCQ+/eVrYOxX2YQt0MDzzEp\\Cux4lFlJrdIyBFON59GFQsSshienmtRziuxCB9e+yWBUL6mznReKQuLsqjWE99fyJgESnv8voqq21KFzXmlsXsQygxefsiYRDx4lVO854iMxXiA2ItvXMgDPGccZYFLJItjpbBnCLSwz1dkuZtVteFREM74N0rP1ZWERzLSmC8DMkKAx/KGrxxtpJPb/dvlHfE7XngyRClfrnBAUPb85oiOphdf21K92cfcGicTm+dYR6kUO9\\\\+ynO9GTE4xIhUgB\\dDS4N91XO0RhRUu4PA33","p":"OBbUPPsJOWuigYh1kAh2H1sdOukTxs20VtidJ8lZ1ptfpw5DRNvNDP4Ym97HXRB0uKm+zHddHs4WCGt2hSUVlc33","ext":"Qi9yGRRygbgmMzPKJPy2JZi01A5jh9qE"}"""
data = data.replace('\\', '\\\\')

# sys.exit()

cb = "Ty00IB2+KYW/8GiIxQVA0FEwwUM04V986Wm7\\4EUNgBODfXytmYxWCRULOALRDHu"  # 注意转义
token = "ad99a9d71f60462491277837605e6aa4"

headers = {'Accept-Language': 'zh-CN,zh;q=0.9', 'Accept-Encoding': 'gzip, deflate, br',
           'Sec-Fetch-Site': 'cross-site',  'Accept': '*/*',
           'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36',
           'Host': 'c.dun.163yun.com', 'Referer': 'https://dun.163.com/trial/icon-click',
           'Cookie': cookie}

params = {
     "id": uid,
     "token": token,
     "acToken": "",
     "data": data,
     "width": "320",
     "type": "7",
     "version": "2.13.6",
     "cb": cb,
     "extraData": "",
     "runEnv": "10",
     "referer": "https://dun.163.com/trial/icon-click",
     "callback": "__JSONP_tkpue1n_64"
    }
print(params)
get_type_url = "https://c.dun.163yun.com/api/v2/check?"
send_url = get_type_url + urlencode(params)
print(send_url)

res = requests.get(send_url, headers=headers, verify=False)
print(res.content)


# b'__JSONP_djl0ucf_44({"data":{"result":false,"token":"8fe083538b814a1bb1cd5d9a034d92c5","validate":""},"error":0,"msg":"ok"});'
# __JSONP_o65ijsr_53({"data":{"result":true,"token":"c18076610ca04bb1b6d081c93aa927dd","validate":"8gxMgwjCs36ABQyKiWXApPYj4qmeePZtNacdk+33/pWyyVk9xmp6Fe6etQ75HC/G/p4SqUksSPlt8+SstaDC3Eve43eTujSRtRjRkjwxQHpkZVTLjBDK+PClDhOI6AkpVb0tgEk5OkdDLGXIUUP/Hw+5VIKuSjnLHeL4UmPVX5A="},"error":0,"msg":"ok"});
