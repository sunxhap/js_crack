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

from rsa_utils import *
from aes_utils import *


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

        self.api_url = "http://127.0.0.1:30111"

        self.global_useragent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36'

        self.fp_it_headers = {
                'Host': 'fp-it.portal101.cn',
                'pragma': 'no-cache',
                'cache-control': 'no-cache',
                'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
                'sec-ch-ua-platform': '"Windows"',
                'sec-ch-ua-mobile': '?0',
                'user-agent': self.global_useragent,
                'content-type': 'application/json;charset=UTF-8',
                'accept': '*/*',
                'origin': 'https://www.qizhidao.com',
                'sec-fetch-site': 'cross-site',
                'sec-fetch-mode': 'cors',
                'sec-fetch-dest': 'empty',
                'referer': 'https://www.qizhidao.com/',
                'accept-language': 'zh-CN,zh;q=0.9',
            }

        self.qizhidao_header = {
                'Host': 'app.qizhidao.com',
                # 'sensorsdistinctid': '1877a1ae656b86-003c1e9f25ff0448-26031851-2073600-1877a1ae657151',
                # 'user-agent-web': 'X/b1f53fefb39aa6faf6becb2c70bd2d48',     # 游客ID 随机
                'user-agent-web': f'X/{deal_generate_random_string(32)}',  # 游客ID 随机
                'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
                'sec-ch-ua-mobile': '?0',
                'h5version': 'v1.0.0',
                'user-agent': self.global_useragent,
                'content-type': 'application/json',
                # 'eagleeye-sessionid': 'bXlb3g8CeRUy0kpjXpqIb2867m5w',
                'accept': 'application/json, text/plain, */*',
                # 'device-id': 'Bic+DbNhiM0HpBYYryF1SVpFAcCJbkaWB2tsoOFRMLBN+2YwxbVUDM5l6CCGY7HH7JgY5ILUis6VSDR7uP0uQKw==',
                'device-id': 'B' + 'Vcp2qAujXufM7YbrPTVFNZqjEhy2/Ynu+iv4BoL1ZT8banduY2jd3f7U4ulXOjgq+BC6tYpyfo7U/6M+p/h8sA==',
                'sec-ch-ua-platform': '"Windows"',
                'origin': 'https://www.qizhidao.com',
                'sec-fetch-site': 'same-site',
                'sec-fetch-mode': 'cors',
                'sec-fetch-dest': 'empty',
                'referer': 'https://www.qizhidao.com/',
                'accept-language': 'zh-CN,zh;q=0.9',
            }

        self.timeout = 30

        self.api_headers = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }

    def get_proxy(self):
        try:
            # 获取代理接口
            res = requests.get("")
            return res.text
        except Exception as e:
            traceback.print_exc()
            raise Exception("代理异常")

    def load_init(self):
        # 代理
        self.global_proxy = self.get_proxy()
        if self.global_proxy and ':' in self.global_proxy:
            self.global_proxies = {'https': 'https://{}'.format(self.global_proxy),
                                   'http': 'http://{}'.format(self.global_proxy)}

            self.global_session.proxies = self.global_proxies
            return True
        else:
            logger.info('proxy error')
        return False

    def get_qzd_uuid(self):
        res = requests.get(self.api_url + '/get_qzd_uuid', headers=self.api_headers)
        self.qzd_uuid = res.json()['qzd_uuid']

    def get_device_id_ep(self):
        rsaObj = RsaUtil()
        public_key = """-----BEGIN PUBLIC KEY-----
                         MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCGwmr39OKRP1KaI4REddlpLDrcuTDh23G+ZdTerHqiN835GR+AjAcvtuLGBfYMf3eqOLHJcJ5oU/UR8ODmOSnYATDwqYpoV42lq4OzqSBgElFQXw0LDAMefo/ITfBnUD1/ZTZ+Lh2JhgP7FxtpQb1cverqhNWiO3u+4KBz69p3SQIDAQAB
                            -----END PUBLIC KEY-----
                         """
        return rsaObj.rsa_encrypt_text2(public_key, self.qzd_uuid)

    def qzd_gzip_head(self):
        data = {
            "request_ua": self.global_useragent,
        }
        res = requests.post(self.api_url + '/qzd_gzip', headers=self.api_headers, json=data, timeout=self.timeout)
        self.qzd_gzip_head = res.json()['qzd_gzip_head']

    def get_device_id_data(self):
        e = Encrypt()

        e.key = md5encode(self.qzd_uuid)[0: 16].encode()
        e.iv = "0102030405060708".encode()

        return e.aes_enc(self.qzd_gzip_head.encode()).hex()

    def get_step1(self):
        self.get_qzd_uuid()

        self.device_id_ep = self.get_device_id_ep()

        self.qzd_gzip_head()

        self.device_id_data = self.get_device_id_data()

        logger.info(f'device_id_ep: {self.device_id_ep}')
        logger.info(f'device_id_data: {self.device_id_data}')

        data = '{"appId":"default","organization":"CSrn3Jcu7Q3n5GGcqTbb","ep":"' + self.device_id_ep + '","data":"' + self.device_id_data + '","os":"web","encode":5,"compress":2}'

        res = self.global_session.post('https://fp-it.portal101.cn/deviceprofile/v4', headers=self.fp_it_headers, data=data,
                                 verify=False, timeout=self.timeout)

        return res

    def get_step2(self):
        headers = copy.deepcopy(self.qizhidao_header)
        headers['device-id'] = 'B' + self.deviceId

        data = '{"platform":0,"searchKey":"华为","type":0}'

        res = requests.post('https://app.qizhidao.com/qzd-bff-app/qzd/v1/qxb/everybody/search', headers=headers,
                                 data=data.encode(), verify=False)
        return res

    def get_step3(self):
        url = 'https://tysf.cponline.cnipa.gov.cn/am/captcha/get'
        headers = {
            'Host': 'tysf.cponline.cnipa.gov.cn',
            'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=UTF-8',
            'sec-ch-ua-mobile': '?0',
            'User-Agent': self.global_useragent,
            'sec-ch-ua-platform': '"Windows"',
            'Origin': 'https://tysf.cponline.cnipa.gov.cn',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Referer': 'https://tysf.cponline.cnipa.gov.cn/am/',
            'Accept-Language': 'zh-CN,zh;q=0.9',
        }
        res = self.global_session.post(url, headers=headers,
                                       data='{"captchaType":"blockPuzzle","clientUid":null,"ts":%s}' % int(time.time() * 1000),
                                       proxies=self.global_proxies, verify=False,
                                      timeout=self.timeout)
        return res

    def get_step4(self, post_body):
        url = 'https://tysf.cponline.cnipa.gov.cn/am/captcha/check'
        res = self.global_session.post(url, headers=self.page_header, proxies=self.global_proxies, verify=False,
                                      timeout=self.timeout, data=post_body)
        return res

    def get_step5(self, post_body):
        url = 'https://tysf.cponline.cnipa.gov.cn/am/login'
        res = self.global_session.post(url, headers=self.page_header, proxies=self.global_proxies, verify=False,
                                      timeout=self.timeout, data=post_body.encode())
        return res

    def run(self):
        self.load_init()

        step1_res = self.get_step1()

        self.deviceId = step1_res.json()['detail']['deviceId']

        step2_res = self.get_step2()
        print(step2_res.text)
        print(step2_res.status_code)


if __name__ == '__main__':
    # for index in range(10):
    demo = Demo()
    demo.run()
    print("***********" * 10)
