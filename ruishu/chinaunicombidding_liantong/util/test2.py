# -*- coding: utf-8 -*-


import requests

cookies = {
    'FSSBBIl1UgzbN7NS': '5F7T.4ur495Jw5D7uvDfBTmAOkFzNs7aZuppX8oWD.GfqhZ30WOZ3MMiM6wA8ocAvG0IiTOjxlbs4e5Ru7RtUyq',
    'BIGipServerpool_anquanfanghu': '801252228.17439.0000',
    'PURWW_SESSIONID': 'nntODd1MMzgC2g4ukN33w0d12CA0_TTAvco-ajdRAwjkUhMhnWr2!-1829647070',
    'FSSBBIl1UgzbN7NT': 'FSSBBIl1UgzbN7NT=5U0ij3meHRf3qqqm0EmDYYqKyaNaV1E8sFQQaVDmiKTbrenmvr_TrsxFoIn44RxuirKeQ21pN30ZlJ8uqUWruowUT1cPGFwf7Pofh5xlp40TvhYK0Y6PTCMDbIp4Vkz09JAOM_HWIz_LnwxWTOIcuYGPvsCfVYbBwO4qDGXdDLOHoOg3zUX5PkCjy4KKeoT1O2abqrwjjF30Kl1RS0J_RnLOQRg.Je7q1NJO.cu0cA20G',
}

headers = {
    'Proxy-Connection': 'keep-alive',
    'Pragma': 'no-cache',
    'Cache-Control': 'no-cache',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Accept-Language': 'zh-CN,zh;q=0.9',
}

params = (
    ('id', '4404703300000008133'),
)

response = requests.get('http://www.chinaunicombidding.cn/jsp/cnceb/web/info1/detailNotice.jsp', headers=headers, params=params, cookies=cookies, verify=False)

print(response.text)
print(response.status_code)

#NB. Original query string below. It seems impossible to parse and
#reproduce query strings 100% accurately so the one below is given
#in case the reproduced version is not "correct".
# response = requests.get('http://www.chinaunicombidding.cn/jsp/cnceb/web/info1/detailNotice.jsp?id=4404703300000008133', headers=headers, cookies=cookies, verify=False)
