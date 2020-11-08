# -*- coding: utf-8 -*-

import requests

import requests
import codecs

cookies = {
    # 'FSSBBIl1UgzbN7NS': '5TS8dD7rybTEfj4_fr4C4NNWcp1rGkckuxYVVF8n2oKGlQGjEt7sT4n15In4q2iBXc0tQX9skxSFgjW0S.UcwTa',
    # 'BIGipServerpool_anquanfanghu': '801252228.17183.0000',
}

headers = {
    'Proxy-Connection': 'keep-alive',
    'Pragma': 'no-cache',
    'Cache-Control': 'no-cache',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36',
    'Accept': '*/*',
    # 'Referer': 'http://www.chinaunicombidding.cn/jsp/cnceb/web/info1/detailNotice.jsp?id=4404703300000008133',
    'Accept-Language': 'zh-CN,zh;q=0.9',
}

response = requests.get('http://app1.nmpa.gov.cn/ZvbYc1RuNkYg/h2XbjSpBo3BD.a670748.js', headers=headers, verify=False)
with codecs.open('param.js', 'w', encoding='utf-8') as f:
    f.write(response.text)
