import requests
import time
import datetime
import execjs
import os
import json
import requests, re
from urllib.parse import unquote
# import execjs
from datetime import datetime
from ip_util.ip_util import *

import codecs

from ws4py.client.threadedclient import WebSocketClient


with codecs.open('code.js', 'r', encoding='utf-8') as f:
    data_jscode = f.read()


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
    print("code.length:", len(response.text))
    return response.text


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
    # print(res.headers)
    print("seed:", seed)
    print("js-filename:", name)
    print("ts:", ts)
    return seed, name, ts, location


# def get_cookie(seed, ts, code):
#     # 传入seed、ts、code代码，获取zp_stoken
#     data = {
#         "seed": seed,
#         "ts": ts,
#         "code": code
#     }
#     res = requests.post('http://127.0.0.1:8919/get_cookie', data=data, verify=False).json()
#     print(res)
#     zp_stoken = res["cookie"]
#
#     # zp_stoken = ctx.call("get_cookie", seed, ts, code)["cookie"]
#     # print("zp_stoken：", zp_stoken)
#     return zp_stoken


class CG_Client(WebSocketClient):
    def opened(self):
        print("连接成功")
        # req = open("../a.js").read()
        self.send("Python")

    def closed(self, code, reason=None):
        print("Closed down:", code, reason)

    def received_message(self, resp):
        print("resp", resp)

        url = 'https://www.zhipin.com/job_detail/?query=python&city=101280600&industry=&position='

        zp_stoken = resp.data.decode()
        print('zp_stoken', zp_stoken)
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

        res = requests.get(url, headers=headers, verify=False, proxies=proxies)
        content = res.text
        if '招聘' in content:
            print('success')
        else:
            print('failure')

        ws.close()


def getTime():
    return str(time.time()).replace(".", "")[0:13]


def getCallbackParam():
    f = open("./callback.js")
    context = execjs.compile(f.read())
    return context.call("getCallback")


def getContent():
    url = 'https://www.zhipin.com/job_detail/?query=python&city=101280600&industry=&position='

    seed, name, ts, location = get_index(url, proxies)  # 请求列表页，获取参数
    code = get_code(name, proxies)  # 获取js代
    print(seed, ts)
    # code
    js_code = (
            code +
        """
           ;;
            
            window.length = 0;
            var abc_seed = '%s';         
            var abc_ts = %s;
            token = encodeURIComponent(new ABC().z(abc_seed, abc_ts));
            console.log('cookie', token);
            ws.send(token);
            """ % (seed, ts)
    )

    # dX = null;
    # dY = null;
    print('send')

    # js_code = js_code.replace('cw=bk(al)', 'cw="";')        # pass

    # js_code = """
    #             f = 'dasdasjkdkjajksj';
    #             console.log(f);
    #             ws.send(f);
    #             """
    ws.send(js_code)


# getContent()

proxies = get_proxy()
print('proxies', proxies)

ws = None
try:
    ws = CG_Client("ws://127.0.0.1:8014/")
    ws.connect()
    getContent()  # 如果想要多次请求，可在此处再写一个
    ws.run_forever()

except KeyboardInterrupt:
    ws.close()
