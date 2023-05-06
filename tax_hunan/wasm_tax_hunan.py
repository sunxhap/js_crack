# _*_ coding: utf-8 _*_
import base64
import copy

import requests
requests.packages.urllib3.disable_warnings()
import traceback
from urllib.parse import urlparse
import re
import time
from urllib.parse import quote, urlencode, unquote
import json
import codecs
from loguru import logger
import random
import string
import os
import sys
from requests.adapters import HTTPAdapter
import hashlib



def deal_generate_random_string(n):
    alphanumeric = string.ascii_letters + string.digits
    return ''.join(random.choice(alphanumeric) for _ in range(n))

def md5encode(str):
    m = hashlib.md5()
    m.update(str.encode())
    return m.hexdigest()



class Demo(object):

    def __init__(self, *args, **kwargs):
        self.global_session = requests.session()

        self.global_useragent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'

        self.web_headers = {
            'Host': 'hunan.chinatax.gov.cn',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': self.global_useragent,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Accept-Encoding': 'gzip, deflate',
        }

        self.timeout = 30

        # self.index_url = "http://hunan.chinatax.gov.cn/taxpayercreditsearch/20190413003983"
        self.index_url = "http://hunan.chinatax.gov.cn/sy/lists/20190719078891"

        self.global_domain = "hunan.chinatax.gov.cn"

    def get_proxy(self):
        try:
            res = requests.get("")
            return res.text
        except Exception as e:
            traceback.print_exc()
            raise Exception("代理异常")

    def get_step1(self):
        res = self.global_session.get(self.index_url, headers=self.web_headers, verify=False, timeout=self.timeout)
        return res

    def get_step2(self):
        'http://hunan.chinatax.gov.cn/sy/lists/20190719078891/2'
        # res = self.global_session.get(self.index_url, headers=self.web_headers, verify=False, timeout=self.timeout)
        res = self.global_session.get('http://hunan.chinatax.gov.cn/sy/lists/20190719078891/2', headers=self.web_headers, verify=False, timeout=self.timeout)
        return res

    def __updateSessionCookie(self, result):
        cookieArr = result.split("; ")
        for cookie in cookieArr:
            index = cookie.index("=")
            cookie_key = cookie[0:index]
            cookie_value = cookie[index + 1:]
            c = requests.cookies.RequestsCookieJar()
            c.set(cookie_key, cookie_value, path='/', domain=self.global_domain)
            self.global_session.cookies.update(c)

    def get_step_js(self, res):
        headers = {
            'Host': 'hunan.chinatax.gov.cn',
            'Origin': 'http://hunan.chinatax.gov.cn',
            'User-Agent': self.global_useragent,
            'Accept': '*/*',
            'Referer': res.url,
            'Accept-Language': 'zh-CN,zh;q=0.9',
        }
        res = self.global_session.get('http://hunan.chinatax.gov.cn/ADFyM3daBY.js', headers=headers, verify=False, timeout=self.timeout)
        return res

    def get_step_wasm(self, res):
        headers = {
            'Host': 'hunan.chinatax.gov.cn',
            'User-Agent': self.global_useragent,
            'Accept': '*/*',
            'Referer': res.url,
            'Accept-Language': 'zh-CN,zh;q=0.9',
        }
        res = self.global_session.get('http://hunan.chinatax.gov.cn/fr6Un8DQah.wasm', headers=headers, verify=False,
                                      timeout=self.timeout)
        return res

    def get_step_ico(self, res):
        headers = {
            'Host': 'hunan.chinatax.gov.cn',
            'User-Agent': self.global_useragent,
            'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
            'Referer': res.url,
            'Accept-Language': 'zh-CN,zh;q=0.9',
        }
        res = self.global_session.get('http://hunan.chinatax.gov.cn/favicon.ico', headers=headers, verify=False,
                                      timeout=self.timeout)
        return res

    """
        # # http://hunan.chinatax.gov.cn/ADFyM3daBY.js    5461909594ad1f7d364250d2bdcf99d0
        # get_step_js_res = self.get_step_js(step1_res)
        # logger.info(f'get_step_js_res: {md5encode(get_step_js_res.text)}')
        #
        # # http://hunan.chinatax.gov.cn/fr6Un8DQah.wasm  50ed37606f1be3955641b25c93c8039c
        # get_step_wasm_res = self.get_step_wasm(step1_res)
        # logger.info(f'get_step_wasm_res: {md5encode(get_step_wasm_res.text)}')

        # http://hunan.chinatax.gov.cn/favicon.ico  182da403727becae27515859b970eba6
        # get_step_ico_res = self.get_step_ico(step1_res)
        # logger.info(f'get_step_ico_res: {md5encode(get_step_ico_res.text)}')
    """

    def get_Ym90a2V5_cookie(self, cookie_dict):
        c_set_cookie = 'bWFua2V5=' + cookie_dict['bWFua2V5']
        headers = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
        data = {
            "useragent": self.global_useragent,
            "cookie_bWFua2V5": c_set_cookie
        }
        url = "http://127.0.0.1:4011/tax_hunan"
        res_json = requests.post(url=url, headers=headers, json=data, timeout=10).json()

        if 'Ym90a2V5_cookie' in res_json:
            result = res_json['Ym90a2V5_cookie']
            logger.info(f'Ym90a2V5_cookie--- {result}')
            self.__updateSessionCookie(result)
            return True
        return False

    def run(self):

        step1_res = self.get_step1()

        cookie_dict = self.global_session.cookies.get_dict()
        logger.info(cookie_dict)

        flag = self.get_Ym90a2V5_cookie(cookie_dict)
        if flag:
            step2_res = self.get_step2()    # 翻页可以

            cookie_dict = self.global_session.cookies.get_dict()
            logger.info(cookie_dict)

            # print(step2_res.text)
            status_code = step2_res.status_code
            if status_code == 200:
                print(status_code, 'success')
            else:
                print(status_code, 'false')
        else:
            logger.info('尚未兼容')


if __name__ == '__main__':
    # for index in range(10):
    demo = Demo()
    demo.run()
    print("***********" * 10)
