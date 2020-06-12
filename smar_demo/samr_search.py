# -*- coding: utf-8 -*-

import requests
import json
import execjs
from urllib.parse import quote
import base64


def get_proxy():
    global proxy_list
    if not proxy_list:
        # proxy_url = 'http://10.0.0.252:8899/api/Values?type=VPS&count=10'
        for i in range(10):
            proxy_url = "http://10.0.0.252:8899/api/Values?type=WD&count=5"
            try:
                proxy_res = requests.get(proxy_url)
                if proxy_res.status_code == 200:
                    proxy_list = proxy_res.text.split("\r\n")
                    break
            except:
                pass

    proxy_one = proxy_list[0]
    proxy_list.remove(proxy_one)
    # {"http": "http://223.244.160.116:3617", "https": "https://223.244.160.116:3617"}
    # return {"http": "http://{}".format(proxy_one), "https": "https://{}".format(proxy_one)}
    return {"http": "http://{}".format(proxy_one)}


def search(search_key):
    # step1
    send_url = "http://cfws.samr.gov.cn/"

    headers = {
        # 'Proxy-Connection': 'keep-alive',
        # 'Pragma': 'no-cache',
        # 'Cache-Control': 'no-cache',
        # 'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        # 'Accept-Language': 'zh-CN,zh;q=0.9',
    }
    res = requests.get(send_url, headers=headers, verify=False, proxies=proxies)
    cookie_dict = requests.utils.dict_from_cookiejar(res.cookies)
    print('cookie_dict', cookie_dict)

    # ----------------------------------------------------------

    cookie_data = 'SHAREJSESSIONID={}; __jsluid_h={}'.format(cookie_dict['SHAREJSESSIONID'], cookie_dict['__jsluid_h'])
    list_headers = {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Origin': 'http://cfws.samr.gov.cn',
        'Referer': 'http://cfws.samr.gov.cn/list.html',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Host': 'cfws.samr.gov.cn',
        'Cookie': cookie_data
    }
    ciphertext = ctx.call('cipher')

    # search_key_escape = execjs.eval("escape('%s')" % search_key).replace('%u', '\\u')
    data = {
        'pageSize': '5',
        'pageNum': '1',
        'queryCondition': '[{"key":"quanwen_2","id":"%s","name":"关键词：%s"}]' % (search_key, search_key),
        'sortFields': '',
        'ciphertext': ciphertext

    }
    res = requests.post('http://cfws.samr.gov.cn/queryDoc', headers=list_headers, data=data,
                             verify=False, proxies=proxies)

    json_data = res.json()
    print(json_data)

    rowkey = json_data['result']['queryResult']['resultList'][0]['rowkey']

    # ----------------------------------------------------------

    detail_headers = {
        'Accept': '*/*',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Origin': 'http://cfws.samr.gov.cn',
        'Referer': 'http://cfws.samr.gov.cn/detail.html?docid=5001122201612010000520',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cookie': cookie_data
    }
    ciphertext = ctx.call('cipher')
    data = {
        'ciphertext': ciphertext,
        'docid': rowkey
    }
    res = requests.post('http://cfws.samr.gov.cn/getDoc', headers=detail_headers, data=data,
                             verify=False, proxies=proxies)
    res_data = res.json()
    if res_data['result']:
        i7 = res_data['result']['i7']

        with open('pdf/test1.pdf', 'wb') as f:
            f.write(base64.b64decode(i7))
        print('success')


proxy_list = list()
proxies = get_proxy()
# proxies = ''
print('proxies', proxies)

# ------------------------------

with open('samr_demo1.js', 'rb') as f:
    samr_js = f.read().decode()

ctx = execjs.compile(samr_js)


search_key = '渝北市监经处字(2020)6号'

search(search_key)
