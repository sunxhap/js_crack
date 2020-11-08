# -*- coding: utf-8 -*-


import requests

cookies = {
    'HM4hUBT0dDOn80S': 'OH3tJPtnMkvWVJbrd7SxZxcLCapUM7a8KjMUd8jGHruvF4mjON7hTCpGIN.wPsHT',
    'HM4hUBT0dDOnenable': 'true',
    'HM4hUBT0dDOn80T': '43lZEE2Z.3p6DnZn_0QFqhWKqQsXLRp2DW0xKgdXemWQI8c597xVMyXKkLHpSQJfwFXNNho_G.yECKJFq6nEe92nZHuqNq9NY8Sm5lYEKMZgWz.VPSUvkNbuKT9LjPHXxAXfHRz10r41_PN2wCiMs0J_thfdw02NhwMtyplZNRZUjY3VRQI34NohcVbvsSD.Ti.2MQoiTN5HBSHaYib2ATits',
}

headers = {
    'Proxy-Connection': 'keep-alive',
    'Pragma': 'no-cache',
    'Cache-Control': 'no-cache',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'X-Requested-With': 'XMLHttpRequest',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Origin': 'http://wenshu.court.gov.cn',
    'Referer': 'http://wenshu.court.gov.cn/',
    'Accept-Language': 'zh-CN,zh;q=0.9',
}

params = (
    ('HifJzoc9', '4EqeE3fe.EYCDPgu_93MqMEUqWUBLxY9DQaEKL4BeYEwIiDd9ZJYMNjUkghASWxGwtjLNMk4G4exCDxMqvCxe0fuZJzhsv1YYBUK5ecJFXzNiAPprnvu2SjjrIkhEz1zdnmUhR3ShK1h2HXdIeAcer.JQSPFmh9b0CKbzdIIrTdx96ByZgsFuxxdPKfs5D6sYGJUF9hZt0c_nKVHQSX.p.ji.iP0.lXLuNFK5Y3FpmpuOaAoQ6hF71zCgzwwbQo8A2YaK88nCacY17JnPfdgdoeTczTk2QnCJ2YVT8fysK7GIgo'),
)

data = {
  'cfg': 'com.lawyee.judge.dc.parse.dto.SearchDataDsoDTO@wsCountSearch',
  '__RequestVerificationToken': 'HGYXP7rwO047xlxsewc6ZfOa'
}

response = requests.post('http://wenshu.court.gov.cn/website/parse/rest.q4w', headers=headers, params=params, cookies=cookies, data=data, verify=False)

# 获取session

#NB. Original query string below. It seems impossible to parse and
#reproduce query strings 100% accurately so the one below is given
#in case the reproduced version is not "correct".
# response = requests.post('http://wenshu.court.gov.cn/website/parse/rest.q4w?HifJzoc9=4EqeE3fe.EYCDPgu_93MqMEUqWUBLxY9DQaEKL4BeYEwIiDd9ZJYMNjUkghASWxGwtjLNMk4G4exCDxMqvCxe0fuZJzhsv1YYBUK5ecJFXzNiAPprnvu2SjjrIkhEz1zdnmUhR3ShK1h2HXdIeAcer.JQSPFmh9b0CKbzdIIrTdx96ByZgsFuxxdPKfs5D6sYGJUF9hZt0c_nKVHQSX.p.ji.iP0.lXLuNFK5Y3FpmpuOaAoQ6hF71zCgzwwbQo8A2YaK88nCacY17JnPfdgdoeTczTk2QnCJ2YVT8fysK7GIgo', headers=headers, cookies=cookies, data=data, verify=False)
