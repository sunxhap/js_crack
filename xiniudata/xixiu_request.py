# -*- coding: utf-8 -*-


import requests
import codecs
from ip_util.ip_util import *
import json
import execjs

with codecs.open('xiniudata-parse.js', 'r', encoding='gbk') as f:
    parse_js = execjs.compile(f.read())


class XiNiu(object):

    def __init__(self):
        self.proxies = get_proxy()
        # proxies = ""
        print('proxies:', self.proxies)

    def get_company_data(self):
        cookies = {
            'btoken': '88507JG1B89IAPVXP8JJ2M0VQZ885AB5',
            'Hm_lvt_42317524c1662a500d12d3784dbea0f8': '1591932917',
            '_ga': 'GA1.2.1358586234.1591932917',
            '_gid': 'GA1.2.656879739.1591932917',
            'home-nav-hint': 'false',
            'utoken': 'P5MNK8T6S1GT0TRTH71IQWIQ5UK15F46',
            'username': 'sss',
            'Hm_lpvt_42317524c1662a500d12d3784dbea0f8': '1591933111',
        }

        headers = {
            'Proxy-Connection': 'keep-alive',
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache',
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36',
            'Content-Type': 'application/json',
            'Origin': 'http://www.xiniudata.com',
            'Referer': 'http://www.xiniudata.com/search2?name=%E5%A4%A9%E7%9C%BC%E6%9F%A5',
            'Accept-Language': 'zh-CN,zh;q=0.9',
        }

        data = '{"payload":"LBcnV1QrNXhyGnsoUSsxIEE8Q15McHgQOSczIy8kXCw/VCdQVWwbJw==","sig":"B0D6D56ADBB5E3416107AC42EE25230E","v":1}'

        response = requests.post(
            'http://www.xiniudata.com/api2/service/x_service/person_company4_list/list_companies4_list_by_codes',
            headers=headers, cookies=cookies, data=data, verify=False, proxies=self.proxies)

        print(response.text)

        data = self.get_data(json.loads(response.text)['d'])
        print(data)

    def get_data(self, data_d):
        nodejs_api_url = "http://localhost:1008/api/xixiu"
        nodejs_headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3887.7 Safari/537.36', }
        body = {'data_d': data_d}
        res = requests.post(nodejs_api_url, headers=nodejs_headers, data=body, verify=False, timeout=60)
        return res.text


if __name__ == '__main__':
    # data = {"code": 0,
    #         "d": "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",
    #         "v": 1}
    # data_js = parse_js.call('parse_data', data['d'])
    # print('-'*50)
    # print(data_js)

    xiniu = XiNiu()
    # print(xiniu.get_data(data['d']))
    xiniu.get_company_data()
