# -*- coding: utf-8 -*-
# @Time: 2020/4/14 12:16


"""
GET https://ss.cods.org.cn/latest/searchR?q=%25E5%25B0%258F%25E7%25B1%25B3&t=common&currentPage=1&searchToken=582b3a3369ab4ed49e62bcbaf229eed1&geetest_challenge=166f23b19b480a68649b890026f5f2462v&geetest_validate=919e06700981a2972e09a3cbe4e5f13b&geetest_seccode=919e06700981a2972e09a3cbe4e5f13b|jordan HTTP/1.1
Host: ss.cods.org.cn
Connection: keep-alive
Pragma: no-cache
Cache-Control: no-cache
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36
Sec-Fetch-Dest: document
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Referer: https://ss.cods.org.cn/isearch
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Cookie: Hm_lvt_f4e96f98fa73da7d450a46f37fffbf56=1586837525; Hm_lpvt_f4e96f98fa73da7d450a46f37fffbf56=1586837525; __utma=48894260.675748299.1586837525.1586837525.1586837525.1; __utmc=48894260; __utmz=48894260.1586837525.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utmt=1; __utmb=48894260.1.10.1586837525; _ga=GA1.3.675748299.1586837525; _gid=GA1.3.710815163.1586837526; JSESSIONID=B7B2E4B8E0046178A3F0CC202823D737; userCookie=9d2bef46-e8ba-4ae5-2b56-974a7dfff674

"""

import requests
import json


def str_to_dict(headerStr):
    rdict = dict()
    if headerStr.strip():
        for headItem in headerStr.split("\n"):
            parm = headItem.split(":", 1)  # 切分2
            if parm[0].strip():
                rdict[parm[0].strip()] = headItem[(headItem.index(parm[0]) + parm[0].__len__() + 1):].strip()
            # rdict[parm[0].strip()] = parm[1].strip()
    return rdict


url = "https://ss.cods.org.cn/latest/searchR?q=%25E5%25B0%258F%25E7%25B1%25B3&t=common&currentPage=1&searchToken=582b3a3369ab4ed49e62bcbaf229eed1&geetest_challenge=166f23b19b480a68649b890026f5f2462v&geetest_validate=919e06700981a2972e09a3cbe4e5f13b&geetest_seccode=919e06700981a2972e09a3cbe4e5f13b|jordan"

headers = {
    'Host': 'ss.cods.org.cn',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36',
    'Sec-Fetch-Dest': 'document',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Referer': 'https://ss.cods.org.cn/isearch',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Cookie': 'Hm_lvt_f4e96f98fa73da7d450a46f37fffbf56=1586837525; Hm_lpvt_f4e96f98fa73da7d450a46f37fffbf56=1586837525; __utma=48894260.675748299.1586837525.1586837525.1586837525.1; __utmc=48894260; __utmz=48894260.1586837525.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utmt=1; __utmb=48894260.1.10.1586837525; _ga=GA1.3.675748299.1586837525; _gid=GA1.3.710815163.1586837526; JSESSIONID=B7B2E4B8E0046178A3F0CC202823D737; userCookie=9d2bef46-e8ba-4ae5-2b56-974a7dfff674'
}

print(headers)
