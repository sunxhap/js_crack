# -*- coding: utf-8 -*-
# @Time: 2020/4/17 20:04

import requests
import os
import sys

requests.packages.urllib3.disable_warnings()

from urllib.parse import urlencode
from urllib.parse import quote

uid = "07e2387ab53a4d6f930b8d9a9be71bdf"
cookie = "_gid=GA.1885717334.38714786389220; _ga=GA.1.2f6504f7efba9.9721d70adefba64ad096"
token = "3902ec26e92a4af0b03414c7b8b180ec"

data = """{"d":"","m":"d8SNKGykSAZjob2l8k8A4p33","p":"rdEhb\\4dyd6wtIUXSP5qWhmfJiiOXWWlNgsQInd/mqHVMm/aBKMLsO+81HI5dK7ZKreYtzBwIy7/WUZkqZqWip33","ext":"M9RETEVv1Zq4oyfFmYFAl/wD0MI3"}"""
data = data.replace('\\', '\\\\')  # 单变双

cb = "TuWNJMn+M2wJwXTbLXAUzOj8yYyfHJIwFPa8Ofc+WZnOTxfD/lm9Gl5SkzdfNS6w"   # 注意转义 , 注意每次替换,
print('cb', cb)

acToken = "9ca17ae2e6ffcda170e2e6ee99ce5c8c91aad1e7528e9e8ab7d55f828e9ebbf55bf7ea8487d03dbc9b8fb0c42af0feaec3b92a82b0a9d0b372b2e9aea2b35e929a9fa3c55a8baf9f91b648a5f08cd9fc5fb5beee9e"

# 可能提示重试过多

# sys.exit()

headers = {'Accept-Language': 'zh-CN,zh;q=0.9', 'Accept-Encoding': 'gzip, deflate, br',
           'Sec-Fetch-Site': 'cross-site',  'Accept': '*/*',
           'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36',
           'Host': 'c.dun.163yun.com', 'Referer': 'https://dun.163.com/trial/icon-click',
           'Cookie': cookie}


android_headers = {'Accept-Language': 'zh-CN,zh;q=0.9', 'Accept-Encoding': 'gzip, deflate, br',
           'Sec-Fetch-Site': 'cross-site',  'Accept': '*/*',
           'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
           'Host': 'c.dun.163yun.com', 'Referer': 'https://dun.163.com/trial/icon-click',
           'Cookie': cookie}
# 注意ua 一致

params = {
     "id": uid,
     "token": token,
     "acToken": acToken,
     "data": data,
     "width": "320",
     "type": "7",
     "version": "2.13.6",
     "cb": cb,
     "extraData": "",
     "runEnv": "10",
     "referer": "https://dun.163.com/trial/icon-click",
     "callback": "__JSONP_o65berq_2"
    }
# print(params)
get_type_url = "https://c.dun.163yun.com/api/v2/check?"
send_url = get_type_url + urlencode(params)
print(send_url)

res = requests.get(send_url, headers=android_headers, verify=False)
print(res.content)


# b'__JSONP_djl0ucf_44({"data":{"result":false,"token":"8fe083538b814a1bb1cd5d9a034d92c5","validate":""},"error":0,"msg":"ok"});'
# __JSONP_o65ijsr_53({"data":{"result":true,"token":"c18076610ca04bb1b6d081c93aa927dd","validate":"8gxMgwjCs36ABQyKiWXApPYj4qmeePZtNacdk+33/pWyyVk9xmp6Fe6etQ75HC/G/p4SqUksSPlt8+SstaDC3Eve43eTujSRtRjRkjwxQHpkZVTLjBDK+PClDhOI6AkpVb0tgEk5OkdDLGXIUUP/Hw+5VIKuSjnLHeL4UmPVX5A="},"error":0,"msg":"ok"});
