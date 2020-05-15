# -*- coding: utf-8 -*-
# @Time: 2020/1/17 10:22

from datetime import datetime
from datetime import timedelta
import calendar

import requests

cookies = {
    '_gid': 'GA.3015918059.58898637885144',
    '_ga': 'GA.1.2bc7626fc6705.7e8b6ee11d672559ff89',
}

headers = {
    'Connection': 'keep-alive',
    'Pragma': 'no-cache',
    'Cache-Control': 'no-cache',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36',
    'Sec-Fetch-Dest': 'script',
    'Accept': '*/*',
    'Sec-Fetch-Site': 'cross-site',
    'Sec-Fetch-Mode': 'no-cors',
    'Referer': 'https://dun.163.com/trial/jigsaw',
    'Accept-Language': 'zh-CN,zh;q=0.9',
}

params = (
    ('id', '07e2387ab53a4d6f930b8d9a9be71bdf'),
    ('fp', 'XlhHzWcyocBitJEQv2g9bwuEEXdhKzaMpK+UDQhzJsCpM0vJv+WU3uxmJizUyuz8ML3RfSR5Jl2oQ8OLAV9vq8zaaA8cAqQhkolyTt5exX\\9HlEeqocZy\\HYKt\\8du+QCLovB1Q2lw3vXvymKABchS3qyRsme4Wx5X1u5CmrbomXhPeO:1589537474797'),
    ('https', 'true'),
    ('type', '2'),
    ('version', '2.13.6'),
    ('dpr', '1'),
    ('dev', '1'),
    ('cb', 'iUSxkf6QDiKMqXvO/9Nd\\FR50F57spNGBWor/LBVGtfIw5Z7\\\\1\\KqwcKqu8UsCe'),
    ('ipv6', 'false'),
    ('runEnv', '10'),
    ('group', ''),
    ('scene', ''),
    ('width', '320'),
    ('token', 'dc5c6b2689c04a16bfa61ac26cf2dbd8'),
    ('referer', 'https://dun.163.com/trial/jigsaw'),
    ('callback', '__JSONP_9d3lmqw_2'),
)

response = requests.get('https://c.dun.163yun.com/api/v2/get', headers=headers, params=params, cookies=cookies, verify=False)
print(response.text)
#NB. Original query string below. It seems impossible to parse and
#reproduce query strings 100% accurately so the one below is given
#in case the reproduced version is not "correct".
# response = requests.get('https://c.dun.163yun.com/api/v2/get?id=07e2387ab53a4d6f930b8d9a9be71bdf&fp=XlhHzWcyocBitJEQv2g9bwuEEXdhKzaMpK%2BUDQhzJsCpM0vJv%2BWU3uxmJizUyuz8ML3RfSR5Jl2oQ8OLAV9vq8zaaA8cAqQhkolyTt5exX%5C9HlEeqocZy%5CHYKt%5C8du%2BQCLovB1Q2lw3vXvymKABchS3qyRsme4Wx5X1u5CmrbomXhPeO%3A1589537474797&https=true&type=2&version=2.13.6&dpr=1&dev=1&cb=iUSxkf6QDiKMqXvO%2F9Nd%5CFR50F57spNGBWor%2FLBVGtfIw5Z7%5C%5C1%5CKqwcKqu8UsCe&ipv6=false&runEnv=10&group=&scene=&width=320&token=dc5c6b2689c04a16bfa61ac26cf2dbd8&referer=https%3A%2F%2Fdun.163.com%2Ftrial%2Fjigsaw&callback=__JSONP_9d3lmqw_2', headers=headers, cookies=cookies)
