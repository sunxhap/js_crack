# -*- coding: utf-8 -*-
# @Time: 2020/4/17 20:04

import requests
import os
import sys

requests.packages.urllib3.disable_warnings()

from urllib.parse import urlencode
from urllib.parse import quote

uid = "c2e691560a1b4e76b71fd37eed97f46a"                # 建筑市场

cookie = "_gid=GA.7745714950.04605091589938; _ga=GA.1.2c3c12432601c.9ecba3e664ca645696dc"
token = "e5a054973aa144f282bbd5999d8e3ead"

data = """{"d":"","m":"XsJ6UFX2s0h\\zhcOuwSAQp33","p":"UtRUf\\F8ooHhv551GUviiSk4QQqeFwbk\\Rcavi7P8O8ifWzpUb8eCQP5GQzV7dQPF9ZyTJYG4Qx\\Paui9B5UTc33","ext":"us\\bCGtiRhan0F9KEx7wPPGTwfS3"}"""
data = data.replace('\\', '\\\\')  # 单变双

cb = "SAv/cueMK8okR88TsBVSKStn\\KfZG7IJcU\\Pbhv6lV6RY5XZT4ykgswhS\\Z+7YSG"   # 注意转义 , 注意每次替换,
print('cb', cb)

acToken = "9ca17ae2e6ffcda170e2e6ee82e945abe9ac8cb44281b08eb2d14a879f9abab54bf7f1ab99f053a5bab78cfc2af0feaec3b92abc9289b1d55e8feba485d95e938a8ea2c85b8aab9fdaaa6ba9af82aff56dba8fee9e"

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
     "referer": "http://jzsc.mohurd.gov.cn/data/company",
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
