# -*- coding: utf-8 -*-
# @Time: 2020/1/14 14:08

import requests
import json


def api_geetest_w(body=""):
    nodejs_api_url = "http://localhost:1008/api/geetest_w"
    nodejs_headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3887.7 Safari/537.36', }
    res = requests.post(nodejs_api_url, headers=nodejs_headers, data=body, verify=False, timeout=60)
    r_content = res.content
    return json.loads(r_content)["w"]



# body = {"length": 100, "challenge": "33266e4e56a7441b711209e43a5efc42"}
# print(api_geetest_w(body))