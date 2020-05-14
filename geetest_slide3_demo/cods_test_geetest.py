 # -*- coding: utf-8 -*-


import requests
import json
import urllib


def strToParms(dic):
    # dic = strToDic(parmStr)
    result = ''
    for key in dic:
        result = result + key + "=" + urllib.parse.quote_plus(str(dic[key])) + "&"

    return result[:-1]


def extractStrBetweenTwoChar(resp_body, strBegin=None, strEnd=None):
    if strEnd is None:
        return resp_body[resp_body.index(strBegin) + strBegin.decode('utf-8').__len__():]
    else:
        if strBegin is not None:
            return resp_body[
                   resp_body.index(strBegin) + strBegin.decode('utf-8').__len__():resp_body.index(strEnd)]
        else:
            return resp_body[0:resp_body.index(strEnd)]


# step1
company_name = '华为'
get_reg_code_url = 'https://www.cods.org.cn/cods/ajax/invoke'
body = '_ZVING_METHOD=search%2Fquery&_ZVING_URL=%252F&_ZVING_DATA=%7B%22type%22%3A%221%22%2C%22keywords%22%3A%22%E5%8D%8E%E4%B8%BA%22%7D&_ZVING_DATA_FORMAT=json'
headers = {"Host": "www.cods.org.cn",
            # "Connection:keep-alive",
            "Origin": "https://www.cods.org.cn",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Accept": "*/*",
            "X-Requested-With": "XMLHttpRequest",
            "Referer": "https://www.cods.org.cn/",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.8"}
res = requests.post(get_reg_code_url, data=body, headers=headers, verify=False, timeout=60)

# step2
url = 'https://ss.cods.org.cn/isearch'
body='jsonString=%257B%2522type%2522%253A%25221%2522%252C%2522keywords%2522%253A%2522%25E5%258D%258E%25E4%25B8%25BA%2522%252C%2522usermobile%2522%253A%2522%2522%252C%2522token%2522%253A%2522%2522%257D&sign=f4ccb80bede72636b9ef6f09e857b6ce'
resp_json = json.loads(res.content)
parmjson = {}
parmjson['sign'] = resp_json['sign']
parmjson['jsonString'] = resp_json['jsonString']
iSearchHeader = headers
res = requests.post(url, data=strToParms(parmjson), headers=headers, verify=False)


# step3
gt_content = extractStrBetweenTwoChar(res.text, "var data = eval('(", " )');").strip()
resp_json = json.loads(gt_content)
print(resp_json)
# cookiestr = response.headers.getlist("Set-Cookie")[0].split(';')[0] + '; ' + \
#             response.headers.getlist("Set-Cookie")[1].split(';')[0]