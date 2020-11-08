import requests, re
from urllib.parse import unquote
# import execjs
from datetime import datetime
from ip_util.ip_util import *
import codecs

import urllib3
urllib3.disable_warnings()


def get_index(url, proxies):
    # 请求列表页，获取seed、js-filename、ts
    headers = {
        'authority': 'www.zhipin.com',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'sec-fetch-site': 'none',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-user': '?1',
        'sec-fetch-dest': 'document',
        'accept-language': 'zh-CN,zh;q=0.9',
    }
    res = requests.get(url, headers=headers, allow_redirects=False, verify=False, proxies=proxies)
    location = res.headers['location']
    seed = unquote(re.findall(r'seed=(.*?)&', location)[0])
    name = re.findall(r'name=(.*?)&', location)[0]
    ts = re.findall(r'ts=(.*?)&', location)[0]
    # print("seed:", seed)
    # print("js-filename:", name)
    # print("ts:", ts)
    return seed, name, ts, location


def get_code(name, proxies):
    # 请求js-filename，获取动态代码
    headers = {
        'authority': 'www.zhipin.com',
        'cache-control': 'max-age=0',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'sec-fetch-site': 'none',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-user': '?1',
        'sec-fetch-dest': 'document',
        'accept-language': 'zh-CN,zh;q=0.9',
        # 'if-modified-since': 'Tue, 26 May 2020 11:27:36 GMT',
    }
    url = 'https://www.zhipin.com/web/common/security-js/%s.js' % name
    response = requests.get(url, headers=headers, verify=False, proxies=proxies)
    # print("code.length:", len(response.text))
    return response.text


def get_cookie(seed, ts, code):
    # 传入seed、ts、code代码，获取zp_stoken
    data = {
        "seed": seed,
        "ts": ts,
        "code": code
    }
    res = requests.post('http://127.0.0.1:8919/get_cookie', data=data, verify=False).json()
    # print(res)
    zp_stoken = res["cookie"]

    # zp_stoken = ctx.call("get_cookie", seed, ts, code)["cookie"]
    # print("zp_stoken：", zp_stoken)
    return zp_stoken


def main(url, proxies):
    seed, name, ts, location = get_index(url, proxies)  #  请求列表页，获取参数
    code = get_code(name, proxies)                  # 获取js代
    with codecs.open('code.js', 'w', encoding='utf-8') as f:
        f.write(code)

    # seed, ts, name = 'vmGOPK0kBAs0sG6easgPu4XvAs+2yZwOwnJ7/+UN1sw=', '1597307814993', '9a324475'
    # with codecs.open('code.js', 'r', encoding='utf-8') as f:
    #     code = f.read()

    print(seed, ts, name)
    zp_stoken = get_cookie(seed, ts, code)      # 获取cookie
    # return

    # 携带cookie重新请求列表页，获取数据
    # zp_stoken = "6dd8aIz8HEgUDUi5JcyUXKRhtZmEpZDk2dXpKYkApAScIblpTex03bRcyMQwZDU1lfl0ZOyVENjt7TTU8BWUsHAZDXnYDfnlEFERrIiNiXj5dOioYKHE%2BZR89Zw9ySXguPGRcRD9sNxg2fkU%3D"
    headers = {
        'authority': 'www.zhipin.com',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-dest': 'document',
        'accept-language': 'zh-CN,zh;q=0.9',
        "cookie": '__zp_stoken__=' + zp_stoken,
        # 'referer': location
    }

    res = requests.get(url, headers=headers, verify=False, proxies=proxies, allow_redirects=False)
    content = res.text

    if res.status_code == 403:
        print('ip 被封 403 ')
    else:
        if res.status_code == 302:
            print('ip 进入行为验证')
        else:
            if '招聘' in content:
                print('zp_stoken success')
                print(res.cookies)
                # print(content)
            else:
                print('zp_stoken failure')
            print(res.status_code)
    print(str(datetime.now()))
    print("--" * 20)


if __name__ == "__main__":
    # 列表页url
    url = 'https://www.zhipin.com/job_detail/?query=python&city=101280600&industry=&position='
    #      https://www.zhipin.com/job_detail/?query=java&city=100010000&industry=&position=

    for index in range(5):
        proxies = get_proxy('WD')
        print(proxies)
        main(url, proxies)

    # proxies = {'http': 'http://117.21.178.6:29659'}
    # print(proxies)
    # main(url, proxies)

    # proxies = ''

    # url = 'http://httpbin.org/ip'
    # print(requests.get(url, proxies=proxies).content)
