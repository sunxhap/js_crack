# -*- coding: utf-8 -*-
# @Time: 2020/5/14 20:12

import requests

import execjs

from ip_util.ip_util import *

with open('cipher.js', 'rb') as f:
    cipher_js = execjs.compile(f.read().decode())

with open('pageld.js', 'rb') as f:
    pageld_js = execjs.compile(f.read().decode())

with open('RequestVerificationToken.js', 'rb') as f:
    VerificationToken_js = execjs.compile(f.read().decode())


def get_cipher():
    return cipher_js.call('cipher')


def get_pageld():
    return pageld_js.call('get_uuid')


def get_VerificationToken():
    return VerificationToken_js.call('get_random', 24)


class SpiderWenshu(object):

    def __init__(self):
        self.proxies = ""
        # self.proxies = get_proxy()
        print('proxies', self.proxies)

        self.list_headers = {
            'Connection': 'keep-alive',
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Origin': 'http://wenshu.court.gov.cn',
            'Accept-Language': 'zh-CN,zh;q=0.9',
        }

    def start_request(self):
        headers = {
            'Proxy-Connection': 'keep-alive',
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Accept-Language': 'zh-CN,zh;q=0.9',
        }

        res = requests.get('http://wenshu.court.gov.cn/', headers=headers, verify=False, proxies=self.proxies)
        cookie_HM4hUBT0dDOn80S = res.cookies.get_dict()
        print(cookie_HM4hUBT0dDOn80S)
        return cookie_HM4hUBT0dDOn80S

    def run(self, search_key):
        cookie_HM4hUBT0dDOn80S = self.start_request()
        return

        # ciphertext 时间相关
        ciphertext = get_cipher()
        print('ciphertext', ciphertext)

        pageId = 'aedb8d8257db4dd51ba997ba9b4298c2'
        # pageId = get_pageld()
        print('pageId', pageId)

        __RequestVerificationToken = get_VerificationToken()
        # __RequestVerificationToken = 'jtUdmIWWgbSVZJDbNXHcw5aq'
        print('__RequestVerificationToken', __RequestVerificationToken)

        # 待看 隔一段时间 更新, 没太大用， 待看
        HifJzoc9 = '4QPw6xtcj7deCy_nZUHE3cnW7Tbk2u_1q3Omwg1USEzcSBcbk4a7iGrxGmgJZzqiNESqsekgV_j28MxamfQreHFu15B8DeKNO5wLff2TPZw.SNDCQokb5pM0ZGWMbOuxcnSJZ7QHMMLAIqlpzFKK8JLmy0mrAuRo_SxLIyOUkR5esmBQxgiWxt3qRWalSceCej0zHTORuJKm7fvPKr_vgkK.D3fxq4BnZTC3IFcfqX_khUj.0iW_44nC5B8oFnSlPQg4AyWwqQ628ZAHyThKusGD4Eb6kLTAJ4Gynkh7xrtrQFP9LV5J5lI4zeYuumbZmcbgWVQBBbhswcfgFFyUv5aecj8.q_taORmz_KsOLiDzzikWwBTS1MzHaP5Mjvc81mc0'

        # 待看js 加密生成
        # cookie = 'UM_distinctid=16f56c534f354-035abb06669817-6a547d2e-1fa400-16f56c534f48a9; _gscu_125736681=77934593mx4wb859;
        # Hm_lvt_9e03c161142422698f5b0d82bf699727=1577934595; HM4hUBT0dDOn80S=n2PPUlXrdsHd3SIcrOkGhLypW00khHwcbH7F6b9De.Vp8cLvo90Jym520Fk7OKYC;
        # SESSION=5b32761d-b8ec-46bf-9eb8-30d991c9621f; HM4hUBT0dDOn80T=49WKYS9xEVpCVrVy8Bfk__QoiJEEohVRPGJidqZQsakxsU7zfk8v73BcceKD8YXmhaIhSmzuCclXZOv4vRntI60ganSnxvcVpPHInaEGgHJJMTAKdpPFC.xZFJTWMGxKfW5IY2M8ErMQLwXNm_YzAofBsgXwndrhD85zruZTzkWXxeBc5xA__e_cld3UznFMLWhOwCH5drRMAMwz0.mBffLNEZmfwGSvgKg_W6auj.oB_bJdBPHhNq8zcfip0y.OR0kSiRDddEE0bDXXvuKx6eQTxs8AM.01qjRZAtTdnShVc4PEyUAbxFotk3gZkfUWNEFV'

        cookies = {
            'HM4hUBT0dDOn80S': 'OH3tJPtnMkvWVJbrd7SxZxcLCapUM7a8KjMUd8jGHruvF4mjON7hTCpGIN.wPsHT',
            'SESSION': '9a517440-4b5a-431d-8805-d8626fc784a4',
            'HM4hUBT0dDOn80T': '4w298Jl9ewaBA6wj7SecKiziKRnC5QaeAxYpqe8C.qzlxMObnNLWJZHiYzXxvR7yhIHSdibPCX3AGs7cKnsA.fljj_Pp8Pskww6v05brMpw2SqnmrHKJ_pylPmcqn2tcRn21qzX9awlcRKLnPw2Rx1Dzh2Grc.55X3Bk18RiO.jDoCkeungsgwYZhxMq5KNF1.J_58oGTVfy9tGHP6BrQc6SLhrbrYPrstocAoC1toj0Tgs6lJ677j61YuKjDI0zwNJTddmoPylX.wWgVHCSDXPOk4SFMHUnKvqpXQaeC9VNS1QrQQ_ynSumIB67qm.dmzRL',
        }

        self.list_headers['Referer'] = 'http://wenshu.court.gov.cn/website/wenshu/181217BMTKHNT2W0/index.html?pageId={}&s21={}'.format(pageId, quote(search_key))

        params = (
            ('HifJzoc9', HifJzoc9),
        )

        data = {
            'pageId': pageId,
            's21': search_key,  # 天眼查  unicode 编码
            'sortFields': 's50:desc',
            'ciphertext': ciphertext,
            'pageNum': '1',
            'pageSize': '5',
            'queryCondition': '[{"key":"s21","value":"%s"}]' % search_key,  # [{"key":"s21","value":"企查查"}]
            'cfg': 'com.lawyee.judge.dc.parse.dto.SearchDataDsoDTO@queryDoc',
            '__RequestVerificationToken': __RequestVerificationToken
        }

        response = requests.post('http://wenshu.court.gov.cn/website/parse/rest.q4w', headers=self.list_headers, params=params,
                                 data=data, verify=False, proxies=self.proxies, cookies=cookies)

        print(response.content)
        print(response.cookies)
        print(response.status_code)


if __name__ == '__main__':
    spider = SpiderWenshu()

    search_key = "天眼查"
    spider.run(search_key)
