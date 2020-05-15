# -*- coding:utf-8 -*-
import requests
import re
from lxml import html


# 抓取详细信息
class OpenLawSpider:
    # 页面初始化
    def __init__(self):
        self.headers = {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "zh-CN,zh;q=0.9",
            "Cache-Control": "max-age=0",
            "Connection": "keep-alive",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36"
        }

    # 获取详细
    def getLawDetail(self):
        url = 'http://openlaw.cn/search/judgement/type?causeId=d8347b89678645e1887045b4200e822f'
        host = {'host': 'openlaw.cn', }
        headers = self.headers.copy()
        headers.update(host, )

        # 第一步，获取js文件内容
        ret_origin = requests.get(url, headers=headers)
        print(ret_origin.text)
        cookies = requests.utils.dict_from_cookiejar(ret_origin.cookies)
        # 第二步，js代码并还原j_token计算过程，正则匹配window.v
        cmp = re.compile('window.v="(.*)";')
        rst = cmp.findall(ret_origin.text)
        v_token = 'abcdefghijklmnopqrstuvwxyz'
        if len(rst):
            v_token = rst[0]
        j_token = v_token[2:4] + 'n' + v_token[0:1] + 'p' + v_token[4:8] + 'e' + v_token[1:2] + v_token[len(
            v_token) - 17:] + v_token[8:16]
        cookies['j_token'] = j_token
        ret_next = requests.get(url, headers=headers, cookies=cookies)
        response = html.fromstring(ret_next.text)
        items = response.cssselect("div[id=primary] .ht-container .entry-title a")
        for item in items:
            title = item.text_content()
            print(title)


spider = OpenLawSpider()
spider.getLawDetail()
