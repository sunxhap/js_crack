# -*- coding: utf-8 -*-
# @Time: 2020/4/24 20:09


import requests
import os
import sys

requests.packages.urllib3.disable_warnings()

from urllib.parse import urlencode
from urllib.parse import quote
import re
import json
from chaojiying import Chaojiying_Client

"""
    python3
    pc 和移动版
        1、User-Agent
        2、
    
"""

uid = "07e2387ab53a4d6f930b8d9a9be71bdf"

User_Agent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'


headers = {
    'Host': 'c.dun.163yun.com',
    'User-Agent': User_Agent,
    'Referer': 'https://dun.163.com/trial/icon-click'
}

import execjs

chaojiying = Chaojiying_Client('chaojiying998', 'WENanzhe123', '2004')  # 用户中心>>软件ID 生成一个替换 96001

with open('yidun.js', 'rb') as f:
    yidun_js = f.read().decode()

ctx = execjs.compile(yidun_js)


def get_conf():
    get_conf_url = "https://c.dun.163yun.com/api/v2/getconf?"
    params = {
        "id": uid,
        "ipv6": "false",
        "runEnv": "10",
        "referer": "https://dun.163.com/trial/icon-click",
        "type": "7",
        "callback": "__JSONP_kx8kra0_7",
    }

    send_url = get_conf_url + urlencode(params)
    print(send_url)
    res = requests.get(send_url, headers=headers, verify=False)
    content = res.content
    cookie = requests.utils.dict_from_cookiejar(res.cookies)

    data_json = json.loads(re.findall(r'\((.*?)\);', content.decode('utf-8'))[0])
    # token = data_json['data']['ac']['token']
    # return token, cookie
    return cookie


def get_token(cookie_gid):
    headers = {'Accept-Language': 'zh-CN,zh;q=0.9', 'Accept-Encoding': 'gzip, deflate, br',
               'Sec-Fetch-Site': 'cross-site', 'Accept': '*/*',
               'User-Agent': User_Agent,
               'Host': 'c.dun.163yun.com', 'Referer': 'https://dun.163.com/trial/icon-click?force=true',
               }

    # fp = "3aeC2LWuwn+QKPRhVxV2gfN9\znu7aujA8osNV1HnzVmALChGhqlRhHmY7Hx9qVyZPwyXetxEua\c/yUadJwX/hH31l58OEbbhpUdK55WBAYxIy6uow0\\niOnSpoxTj\\bH\SBy4h3xCVrZbMRj+Jm7EVn9/TktbKhYQGxIHUGG8wbEhD:1588940447749"
    # fp = "ASPcaAM6Xz8WR0vAPvLV\\x8rc7D9YKlkvLTOYD0cDMIVozEsvlEG4rMdNe7Xcv/Bx9ToT+5Mu/xkHSqQJn7pv/DiHSP9f+/hrpgPcz51K3T/w/WXoZylnD4P3EP5eUkeJ/p2Vc1M8kkvyYJr\\CZVPbY5ARWy+H\\6NVHZ5LTs2ldaNmVS:1588945515658"
    fp = ''
    # cb = "Zx5wsFMvkHr8tKoWN9GvPime/HfsHAmuY9WddJKPbd52K9Od74gbTcBvS1\\TbqsT"  # 注意转义 , 注意每次替换,
    cb = ctx.call('l_get_cb')
    print('cb', cb)
    params = {
        "id": uid,
        "fp": fp,
        'https': 'true',
        # "type": "7",        # 点选
        "type": "2",      # 滑动
        "version": "2.13.6",
        "dpr": "3",  # pc    1  mb 3
        "dev": "2",  # dev	1  mb 2
        "cb": cb,
        "ipv6": "false",
        "runEnv": "10",
        "group": "",
        "scene": "",
        "width": "320",
        "token": "",
        "callback": "__JSONP_kx8kra0_9",
        'referer': 'https://dun.163.com/trial/jigsaw'
    }

    get_type_url = "https://c.dun.163yun.com/api/v2/get?"
    send_url = get_type_url + urlencode(params)
    # print(send_url)

    headers['Cookie'] = cookie_gid
    res = requests.get(send_url, headers=headers, verify=False)
    content = res.content
    print(content)

    data_json = json.loads(re.findall(r'\((.*?)\);', content.decode('utf-8'))[0])
    token = data_json['data']['token']

    cookie = requests.utils.dict_from_cookiejar(res.cookies)
    # print('cookie', cookie)
    return token, cookie, data_json['data']['bg'][0]


def downloader_image_identify(image):
    headers = {
        # 'Connection': 'keep-alive',
        # 'Pragma': 'no-cache',
        # 'Cache-Control': 'no-cache',
        'User-Agent': User_Agent,
        'Sec-Fetch-Dest': 'image',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
        # 'Sec-Fetch-Site': 'cross-site',
        # 'Sec-Fetch-Mode': 'no-cors',
        'Referer': 'https://dun.163.com/trial/icon-click',
        'Accept-Language': 'zh-CN,zh;q=0.9',
    }
    res = requests.get(image, headers=headers, verify=False)
    chaojiying_data = chaojiying.PostPic(res.content, 9103)
    return chaojiying_data


def res_check_id(token, cookie, data):
    # data = """{"d":"","m":"d8SNKGykSAZjob2l8k8A4p33","p":"rdEhb\\4dyd6wtIUXSP5qWhmfJiiOXWWlNgsQInd/mqHVMm/aBKMLsO+81HI5dK7ZKreYtzBwIy7/WUZkqZqWip33","ext":"M9RETEVv1Zq4oyfFmYFAl/wD0MI3"}"""
    # data = data.replace('\\', '\\\\')  # 单变双

    # cb = "cbe6YqgpSFXUKsMI1TGYNmMJv6q1BBG6/fTKhAX5Cgi0OdLYUhzHgatq6nccqGqY"  # 注意转义 , 注意每次替换,
    # print('cb', cb)
    cb = ctx.call('l_get_cb')
    print('cb', cb)

    # acToken = "9ca17ae2e6ffcda170e2e6ee99ce5c8c91aad1e7528e9e8ab7d55f828e9ebbf55bf7ea8487d03dbc9b8fb0c42af0feaec3b92a82b0a9d0b372b2e9aea2b35e929a9fa3c55a8baf9f91b648a5f08cd9fc5fb5beee9e"

    headers = {'Accept-Language': 'zh-CN,zh;q=0.9', 'Accept-Encoding': 'gzip, deflate, br',
               'Sec-Fetch-Site': 'cross-site', 'Accept': '*/*',
               'User-Agent': User_Agent,
               'Host': 'c.dun.163yun.com', 'Referer': 'https://dun.163.com/trial/icon-click',
               'Cookie': cookie}
    # android_headers = {'Accept-Language': 'zh-CN,zh;q=0.9', 'Accept-Encoding': 'gzip, deflate, br',
    #                    'Sec-Fetch-Site': 'cross-site', 'Accept': '*/*',
    #                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
    #                    'Host': 'c.dun.163yun.com', 'Referer': 'https://dun.163.com/trial/icon-click',
    #                    'Cookie': cookie}
    # 注意ua 一致

    params = {
        "id": uid,
        "token": token,
        # "acToken": acToken,
        "acToken": '',
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

    res = requests.get(send_url, headers=headers, verify=False)
    content = res.content
    return content


# step1
cookie_gid = get_conf()
cookie_gid = "{}={}".format('_gid', cookie_gid['_gid'])  # cookie  _gid
print('cookie_gid', cookie_gid)

print('-' * 50)

# step2
# cookie_gid = '_gid=GA.6055818893.95571934089869'
get_token_data = get_token(cookie_gid)  # cookie  _ga
# print(get_token_data)

token_m = get_token_data[0]
cookie_ga = "{}={}".format('_ga', get_token_data[1]['_ga'])
cookie_h = cookie_gid + ';' + cookie_ga
print('cookie_h', cookie_h)
print('res_check_id token_m', token_m)
print('image', get_token_data[2])
print('-' * 50)

sys.exit()

# step3
chaojiying_data = downloader_image_identify(get_token_data[2])          # 主要打点可能不准
print(chaojiying_data)

# step4   js get data
pic_str = chaojiying_data['pic_str']
point_xy = list()
time_deal = 0
for pic in pic_str.split('|'):
    x = 0.6667 * int(pic.split(',')[0])             # 图片大小缩放       320/480
    y = 0.6667 * int(pic.split(',')[1])
    point_xy.append([x, y, time_deal])
    time_deal += 1500
print(point_xy)

# token_m = '1e99a7c8ceae493e9d7f6df741c56de6'
# point_xy = [['123', '49'], ['56', '91'], ['225', '79']]
data = ctx.call('get_ext_data_v4', token_m, point_xy)
print(data)

# step4

# true
# token_m = '92f8228710a54c7e82d13e05223c9326'
# cookie_h = '_ga=GA.1.20852e4612c48.ed5765f1ad2a881242a2; _gid=GA.6105816338.62877646589900'
# data = """{"d":"","m":"KecPsA4GPgblIXEpKgsPnc33","p":"jTMloZYP\\0gYPTikDKkbraNeZfvZ2tE/0JiL2o/kvnRm0XftPA4M21Bhp0U2Q\\JikA9IXii/OqFm5XDgbt\\yb2WI1oi3","ext":"kBprz0Gnd+aKWaZmPxNgFdu1K2r3"}"""

# token_m = 'da0c82893c034dcda945b8f3d9bc14c9'
# cookie_h = '_gid=GA.7775810105.45432743689117;_ga=GA.1.273fd9ee85fa2.471e5de2a38f4d2e7587'
# data = """{"d":"","m":"2H\\ia7YMiAiXrHqi/c6cHp33","p":"8h+VFLF986vvZZ671gLYz/emqI\\+pfF\\NPeFOzVYeJfER+h7lVak51+f/sE8G28WEjrZzr5D\\o1EwCTJM9kSoi33","ext":"wu8gUj6Bn+jk9cb4TEf\\Fycf1Yc3"}"""

get_token_data = res_check_id(token_m, cookie_h, data)          # cookie  _ga
print(get_token_data)
