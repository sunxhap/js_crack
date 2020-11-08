# -*- coding: utf-8 -*-


import requests

import requests

cookies = {
    'sessionid': '0jl3q9owbrh6fifetysd31erkgrr9w9f',
    'Hm_lvt_9bcbda9cbf86757998a2339a0437208e': '1603365132',
    'Hm_lpvt_9bcbda9cbf86757998a2339a0437208e': '1603365132',
}

headers = {
    'Connection': 'keep-alive',
    'Content-Length': '0',
    'Pragma': 'no-cache',
    'Cache-Control': 'no-cache',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36',
    'Accept': '*/*',
    'Origin': 'http://match.yuanrenxue.com',
    'Referer': 'http://match.yuanrenxue.com/match/3',
    'Accept-Language': 'zh-CN,zh;q=0.9',
}

response = requests.post('http://match.yuanrenxue.com/logo', headers=headers, cookies=cookies, verify=False)


cookies = {
    'sessionid': '0jl3q9owbrh6fifetysd31erkgrr9w9f',
    'Hm_lvt_9bcbda9cbf86757998a2339a0437208e': '1603365132',
    'Hm_lpvt_9bcbda9cbf86757998a2339a0437208e': '1603365132',
}

headers = {
    'Connection': 'keep-alive',
    'Pragma': 'no-cache',
    'Cache-Control': 'no-cache',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36',
    'X-Requested-With': 'XMLHttpRequest',
    'Referer': 'http://match.yuanrenxue.com/match/3',
    'Accept-Language': 'zh-CN,zh;q=0.9',
}

# params = (
#     ('page', '3'),
# )
# response = requests.get('http://match.yuanrenxue.com/api/match/3', headers=headers, params=params, cookies=cookies, verify=False)

#NB. Original query string below. It seems impossible to parse and
#reproduce query strings 100% accurately so the one below is given
#in case the reproduced version is not "correct".
response = requests.get('http://match.yuanrenxue.com/api/match/3?page=3', headers=headers, cookies=cookies, verify=False)

print(response.text)

"""
    无js 反爬
         魔改加速乐  出现加速乐，就代表访问不成功  和加速乐没关系
    
    先访问logo 链接
        再访问url 成功
        
"""
