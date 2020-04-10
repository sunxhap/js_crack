# -*- coding: utf-8 -*-
# @Time: 2020/2/4 14:06

import json
import time
import requests
import os
import re
import sys

session = requests.session()

def str_to_dict(headerStr):
    rdict = dict()
    if headerStr.strip():
        for headItem in headerStr.split("\n"):
            parm = headItem.split(":", 1)  # 切分2
            if parm[0].strip():
                rdict[parm[0].strip()] = headItem[(headItem.index(parm[0]) + parm[0].__len__() + 1):].strip()
            # rdict[parm[0].strip()] = parm[1].strip()
    return rdict


def search_data(search_url):
    s_headers = str_to_dict("""Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
                Accept-Encoding: gzip, deflate
                Accept-Language: zh-CN,zh;q=0.9
                Host: 211.141.74.200
                Proxy-Connection: keep-alive
                Upgrade-Insecure-Requests: 1
                User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3970.5 Safari/537.36""")
    response = session.get(search_url, headers=s_headers, verify=False)
    print('search_data cookies', response.cookies)
    return response.text


challenge = 'f71c527cb8af3e630ab7c1f47109fd8bf8'
data = {'validate': '32b5a6d5735c42f72e33f39ddbcdea14', 'message': 'success', 'success': 1, 'score': '3'}
# 吉林 一个只能搜一次
validate = data["validate"]
key = 'a'
search_url = "http://211.141.74.200/api/common/Search/{}/undefined/{}/{}/{}%7Cjordan".format(key, challenge, validate, validate)
text = search_data(search_url)
print('content', text)