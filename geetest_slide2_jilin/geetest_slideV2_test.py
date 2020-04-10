# -*- coding: utf-8 -*-
# @Time: 2020/2/4 14:58


import requests

requests.packages.urllib3.disable_warnings()
import time
import traceback
import json
from datetime import datetime


def test_proxy(proxy):
    # proxies = {"http": "http://" + proxy, "https": "https://" + proxy}
    proxies = {"http": "http://" + proxy}
    baidu_url = "https://www.baidu.com/"
    try:
        requests.get(url=baidu_url, proxies=proxies, verify=False, headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3970.5 Safari/537.36"})
        print(proxy, "ok")
        return True
    except:
        # print(traceback.format_exc())
        print(proxy, "no")
        return False


def str_to_dict(headerStr):
    rdict = dict()
    if headerStr.strip():
        for headItem in headerStr.split("\n"):
            parm = headItem.split(":", 1)  # 切分2
            if parm[0].strip():
                rdict[parm[0].strip()] = headItem[(headItem.index(parm[0]) + parm[0].__len__() + 1):].strip()
    return rdict


def search_data(search_url):
    s_headers = str_to_dict("""Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
                Accept-Encoding: gzip, deflate
                Accept-Language: zh-CN,zh;q=0.9
                Host: 211.141.74.200
                Proxy-Connection: keep-alive
                Upgrade-Insecure-Requests: 1
                User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3970.5 Safari/537.36""")
    response = requests.get(search_url, headers=s_headers, verify=False)
    print('search_data cookies', response.cookies)
    return response.text


success_count = 0
failure_count = 0
for i in range(100):
    r_url = "http://211.141.74.200/api/Common/GetCaptcha?t={}".format(int(time.time() * 1000))

    # proxy_url = "http://10.0.0.252:8899/api/Values?type=LP&count=5"
    proxy_url = 'http://10.0.0.252:8899/api/Values?type=VPS&count=10'
    # proxy_url = "http://10.0.0.252:8899/api/Values?type=WD&count=5"
    proxy_res = requests.get(proxy_url)
    proxy_content = proxy_res.text.split("\r\n")

    for proxy in proxy_content:
        flag = test_proxy(proxy)
        # flag = True
        if flag:
            try:
                data = {'url': r_url, 'proxy': proxy}
                res = requests.post("http://localhost:6081/geetest_slideV2", data=data, timeout=60)
                # print(res.text)

                content = json.loads(res.text)
                # validate = content["data"]["validate"]
                # challenge = content["data"]["challenge"]

                status = content["status"]
                if status == 1:
                    success_count += 1
                    print(str(datetime.now()), 'success_count', success_count)
                else:
                    proxy_flag = test_proxy(proxy)
                    if proxy_flag:
                        failure_count += 1
                        print(str(datetime.now()), 'failure_count', failure_count)
                        print(content)

                # if success_count/10 == 0:
                #     print('success_count', success_count. str(datetime.now()))

                # key = 'a'
                # search_url = "http://211.141.74.200/api/common/Search/{}/undefined/{}/{}/{}%7Cjordan".format(key, challenge,
                #                                                                                              validate,
                #                                                                                              validate)
                # text = search_data(search_url)
                # print('content', text)
                # # http://211.141.74.200/api/common/Search/a/undefined/1d5e2b40c8edbafd855e55fbd609c0bbl0/8bbaf164196232ac87ef1b6e84d41fb9/8bbaf164196232ac87ef1b6e84d41fb9%7Cjordan
            except:
                pass
