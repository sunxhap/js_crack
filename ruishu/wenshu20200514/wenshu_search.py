# -*- coding: utf-8 -*-
# @Time: 2020/5/14 20:12

import requests

import execjs

with open('cipher.js', 'rb') as f:
    cipher_js = execjs.compile(f.read().decode())

with open('pageld.js', 'rb') as f:
    pageld_js = execjs.compile(f.read().decode())


def get_cipher():
    return cipher_js.call('cipher')


def get_pageld():
    return pageld_js.call('get_uuid')


# ciphertext 时间相关
ciphertext = get_cipher()
print('ciphertext', ciphertext)

pageId = 'aedb8d8257db4dd51ba997ba9b4298c2'
# pageId = get_pageld()
print('pageId', pageId)

__RequestVerificationToken = 'jtUdmIWWgbSVZJDbNXHcw5aq'

# 待看 隔一段时间 更新
HifJzoc9 = '4QPw6xtcj7deCy_nZUHE3cnW7Tbk2u_1q3Omwg1USEzcSBcbk4a7iGrxGmgJZzqiNESqsekgV_j28MxamfQreHFu15B8DeKNO5wLff2TPZw.SNDCQokb5pM0ZGWMbOuxcnSJZ7QHMMLAIqlpzFKK8JLmy0mrAuRo_SxLIyOUkR5esmBQxgiWxt3qRWalSceCej0zHTORuJKm7fvPKr_vgkK.D3fxq4BnZTC3IFcfqX_khUj.0iW_44nC5B8oFnSlPQg4AyWwqQ628ZAHyThKusGD4Eb6kLTAJ4Gynkh7xrtrQFP9LV5J5lI4zeYuumbZmcbgWVQBBbhswcfgFFyUv5aecj8.q_taORmz_KsOLiDzzikWwBTS1MzHaP5Mjvc81mc0'

# 待看js 加密生成
cookie = 'UM_distinctid=16f56c534f354-035abb06669817-6a547d2e-1fa400-16f56c534f48a9; _gscu_125736681=77934593mx4wb859; Hm_lvt_9e03c161142422698f5b0d82bf699727=1577934595; HM4hUBT0dDOn80S=n2PPUlXrdsHd3SIcrOkGhLypW00khHwcbH7F6b9De.Vp8cLvo90Jym520Fk7OKYC; SESSION=5b32761d-b8ec-46bf-9eb8-30d991c9621f; HM4hUBT0dDOn80T=49WKYS9xEVpCVrVy8Bfk__QoiJEEohVRPGJidqZQsakxsU7zfk8v73BcceKD8YXmhaIhSmzuCclXZOv4vRntI60ganSnxvcVpPHInaEGgHJJMTAKdpPFC.xZFJTWMGxKfW5IY2M8ErMQLwXNm_YzAofBsgXwndrhD85zruZTzkWXxeBc5xA__e_cld3UznFMLWhOwCH5drRMAMwz0.mBffLNEZmfwGSvgKg_W6auj.oB_bJdBPHhNq8zcfip0y.OR0kSiRDddEE0bDXXvuKx6eQTxs8AM.01qjRZAtTdnShVc4PEyUAbxFotk3gZkfUWNEFV'

# cookies = {
#     'HM4hUBT0dDOn80S': 'c4Wf81LFwMG2Zo_YcxWRYYJNos6K2.43VNHAd6cLj1b3Sy3ABS39HDw3PGC7Vzo6',
#     'SESSION': '5dc3c3ac-7a67-49b4-ac35-edb9158e1053',
#     'HM4hUBT0dDOn80T': '4_XmARknXE9CDqt54uQgeyd9ibZ6gueXlE7RyxDAYSEYXau.5Ch69cdwPz1sPSCXl4NZWD1fYf9Axk7tCo.GboP7wyZTpYXkSR1bhnwlRkNR3n6kN0kp7STqicDeethTl3c9bZOn9cWsv72ZHoz6j6la0dsCGEfdC8h679Ib720Ip8f67beRYfEFHb5.Rzy3Ia4mKgxvEg9lt27DcMsIN8redLyt0lpexzyolqIsJYllYaPa57KVKjO8x2KqZjBRZpKafR7juVHHBXcUihwJGPQag96HCyt23hseL0xoQ9jtC0zfpv6W.Sm52mrnxzLk7B8FZSKWF2v0SyQbyYBpXINjLt1qZ3HFfezHkpDhFdv.GoHWWT3Qe42fsV5hQ68wJUa0',
# }

# HM4hUBT0dDOn80S=tB_t0AVB9smGZasKFjCEL0bgKyubQHVHmNiSBuEhPSuu_lRv5kwjW9zLNF_VQL2b
# Cookie: HM4hUBT0dDOn80S=tB_t0AVB9smGZasKFjCEL0bgKyubQHVHmNiSBuEhPSuu_lRv5kwjW9zLNF_VQL2b; HM4hUBT0dDOnenable=true;
# HM4hUBT0dDOn80T=4TYfJp9nI9wnFuBeGnKKp7z5tp.1PQQv_a6zs4AymDvtf3e7KbxN5M3Nsksa7KerPfBWC_xqAw_IsPsXhiZyP2ZTnw0I4zdLN0lzLVRotcczTJJXa.7nxhgUxmcXORPILplD7wYJ8bHxflShgAKSmk1RIkXvcucvzuSPBYk8iohOsn3e97DgeWBKqjvKHpDxYYogMN8rTuJgHAlVJjWpk6FMl


headers = {
    'Connection': 'keep-alive',
    'Pragma': 'no-cache',
    'Cache-Control': 'no-cache',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'X-Requested-With': 'XMLHttpRequest',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Origin': 'http://wenshu.court.gov.cn',
    'Referer': 'http://wenshu.court.gov.cn/website/wenshu/181217BMTKHNT2W0/index.html?pageId=2b48eeb21b4a75776d56760e167f2d2e&s21=%E5%A4%A9%E7%9C%BC%E6%9F%A5',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Cookie': cookie
}

params = (
    ('HifJzoc9', HifJzoc9),
)

data = {
    'pageId': pageId,
    's21': '天眼查',  # 天眼查  unicode 编码
    'sortFields': 's50:desc',
    'ciphertext': ciphertext,
    'pageNum': '1',
    'pageSize': '5',
    'queryCondition': '[{"key":"s21","value":"%s"}]' % '天眼查',  # [{"key":"s21","value":"企查查"}]
    'cfg': 'com.lawyee.judge.dc.parse.dto.SearchDataDsoDTO@queryDoc',
    '__RequestVerificationToken': __RequestVerificationToken
}

response = requests.post('http://wenshu.court.gov.cn/website/parse/rest.q4w', headers=headers, params=params,
                         data=data, verify=False)

print(response.content)
print(response.cookies)
print(response.status_code)

# NB. Original query string below. It seems impossible to parse and
# reproduce query strings 100% accurately so the one below is given
# in case the reproduced version is not "correct".
# response = requests.post('http://wenshu.court.gov.cn/website/parse/rest.q4w?HifJzoc9=4VY..6gQYbI3eXSAqwvKDUltTEoRkwDqdbU6cve5XIu4Y8Emm3aRI7luRkNeRIJqdY116LNHXHI5nzU9JNAiwNRcbwQ2yDe05S4TcyYdsnT2ijiNv9zc2WTf1zMC0vfmaJtaGnYz4lNmpR1_Ol_fFHUFs22HpnwCmD4Lg3T6sDm2xlSTBXtYkG7p_ONergt2dF1AMTvoiiMoYLTYV.0gQRDfnvHZ0vWq0sJJoN.3CCvaKuKxhbijAW_C7TK31gpmOWH2z01CNMcx9S.yH0e7rSzpYVGRw1CdpOjBagPOuTQaqPjUbJYYfgMs1EATiLsdiJwrpwWW08T.jOpOW4VSbJ0ceomVXrV76V4qpczPWfw2UBTElTYg1T710PEpf0u50HorEoCsUa8O27OmaPj6Mzn7v', headers=headers, cookies=cookies, data=data, verify=False)
