# -*- coding: utf-8 -*-
# @Time: 2020/4/14 15:04

import collections

import urllib
import requests


def strToDic(headerStr):
    dict = collections.OrderedDict()
    if headerStr.strip():
        for headItem in headerStr.split("\n"):
            parm = headItem.split(":")
            dict[parm[0]] = headItem[(headItem.index(parm[0]) + parm[0].__len__() + 1):].strip()
    return dict


# 截取字符串的中间一部分
def extractStrBetweenTwoChar(resp_body, strBegin=None, strEnd=None):
    if strEnd is None:
        return resp_body[resp_body.index(strBegin) + strBegin.decode('utf-8').__len__():]
    else:
        if strBegin is not None:
            return resp_body[
                   resp_body.index(strBegin) + strBegin.decode('utf-8').__len__():resp_body.index(strEnd)]
        else:
            return resp_body[0:resp_body.index(strEnd)]


def strToParms(dic):
    # dic = strToDic(parmStr)
    result = ''
    for key in dic:
        result = result + key + "=" + urllib.quote_plus(str(dic[key])) + "&"

    return result[:-1]


def geetest_get_validate():
    crack_gt_url = 'http://172.16.183.95/gt'

    gt = "c78cc92860d6664d3e95a46084d4eced"
    challenge = "59dcde490b98c88ce2aabb67e9a20b8d"
    proxy = "http://60.169.132.151:766"

    crack_parm = strToDic("gt:\n" +
                          "challenge:\n" +
                          "type:\n" +
                          "proxies:"
                          )
    crack_parm['gt'] = gt
    crack_parm['challenge'] = challenge
    crack_parm['type'] = 'click'
    # crack_parm['type'] = 'slide'
    crack_parm['referer'] = 'www.geetest.com'
    # crack_parm['proxies'] = extractStrBetweenTwoChar(proxy, '//')

    crack_parm['proxies'] = proxy.replace('http://', '')
    print(crack_parm['proxies'])

    crackHeader = strToDic(
        "Accept:*/*\n" +
        "Accept-Encoding:gzip, deflate, br\n" +
        "Accept-Language:zh-CN,zh;q=0.8\n" +
        "Connection:keep-alive\n" +
        "Content-Type:application/x-www-form-urlencoded; charset=UTF-8\n" +
        "User-Agent:Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 SE 2.X MetaSr 1.0\n" +
        "X-Requested-With:XMLHttpRequest"
    )
    body = strToParms(crack_parm)
    print('body', body)
    res = requests.post(crack_gt_url, headers=crackHeader, data=body, verify=False)
    print(res.text)


# search_list_url = 'https://ss.cods.org.cn/latest/searchR?q={0}&t=common&currentPage={page}&searchToken={searchToken}&geetest_challenge={challenge}&geetest_validate={validate}&geetest_seccode={validate}|jordan'

url = "https://ss.cods.org.cn/latest/searchR?q=%E5%B0%8F%E7%B1%B3%E7%A7%91%E6%8A%80&t=common&currentPage=1&searchToken=2c1528d08443247686f20eb6bda30d5f&geetest_challenge=3b92c6f037bd4a2e2488ebe679549bac67&geetest_validate=218bb75654aea3bf08c4f2c148b59fb5&geetest_seccode=218bb75654aea3bf08c4f2c148b59fb5|jordan"
headers = {'Accept-Language': 'zh-CN,zh;q=0.8', 'Accept-Encoding': 'gzip, deflate, sdch, br',
           'Connection': 'keep-alive',
           'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8', 'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
           'Host': 'ss.cods.org.cn', 'Proxy-Authorization': 'Basic Y2RxbGxuOmNkcWxsbjExMQ==',
           'Referer': 'https://ss.cods.org.cn/isearch',
           'Cookie': 'JSESSIONID=B678C67D941167CC55098B76DD2D4334; userCookie=d12b6b53-4316-4349-2bf4-697957496c96',
           'Upgrade-Insecure-Requests': '1'}
requests.get(url, headers=headers, verify=False)

# {"success": 1, "validate": "f97f5749e81945fe91782babb31cddb2", "message": "success", "score": "3", "challenge": "95c474ebb073ac89719ae93ceec08c22"}

# {"success": 1, "validate": "25bf1b557df424656326059fadfd173b", "message": "success", "score": "2", "challenge": "59dcde490b98c88ce2aabb67e9a20b8d"}
