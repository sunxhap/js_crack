# -*- coding: utf-8 -*-

from ip_util.ip_util import *
import codecs
from datetime import datetime
import re

import urllib3
urllib3.disable_warnings()

import requests


def get_cookie(arg1):
    # 传入seed、ts、code代码，获取zp_stoken
    data = {
        "arg1": arg1,
    }
    res = requests.post('http://127.0.0.1:8911/get_cookie', data=data, verify=False).json()
    cookie = res["cookie"]
    print("cookie：", cookie)
    return cookie


def get_content(acw_sc__v2):
    headers = {
        'Connection': 'keep-alive',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36',
        'Sec-Fetch-Dest': 'document',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    }
    if acw_sc__v2:
        headers['Cookie'] = 'acw_sc__v2={}'.format(acw_sc__v2)

    # ript>__INITIAL_STATE
    response = requests.get('https://company.zhaopin.com/CC000001066.htm', headers=headers,  verify=False, proxies=proxies)
    # print(response.cookies)
    return response.text


request_count = 10

success_count = 0
failure_count = 0
for index in range(request_count):
    proxies = get_proxy('WD')
    print('proxies', proxies)

    content = get_content('')
    arg1 = re.findall(re.compile(r"var arg1='(.*?)';", re.S), content)[0]

    cookie = get_cookie(arg1)
    content = get_content(cookie)
    if '智联招聘' in content:
        success_count += 1
        print('success', success_count)
    else:
        failure_count += 1
        print('failure', failure_count)
    print(str(datetime.now()))
    print('-'*40)
