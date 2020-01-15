# -*- coding: utf-8 -*-

import collections
import requests
import re
import sys
import urllib.parse

"""
    工商搜索  
    
    问题点 
        1、  cookie 中  UM_distinctid     
        2、  请求data 里面的参数 
                
                geetest_challenge     和 极验反爬相关参数
        3、  请求data 放浏览器搜过的关键词 如“小米” ok ,
                但是请求放“华为” 不行
            
            浏览器搜索的关键词请求ok, 浏览器没搜过的关键词请求不行， 再分析请求
    
"""


def str_to_dict(headerStr):
    rdict = dict()
    if headerStr.strip():
        for headItem in headerStr.split("\n"):
            parm = headItem.split(":", 1)  # 切分2
            if parm[0].strip():
                rdict[parm[0].strip()] = headItem[(headItem.index(parm[0]) + parm[0].__len__() + 1):].strip()
            # rdict[parm[0].strip()] = parm[1].strip()
    return rdict


headers = str_to_dict("""
Host: www.gsxt.gov.cn
Connection: keep-alive
Accept: application/json, text/javascript, */*; q=0.01
X-Requested-With: XMLHttpRequest
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3970.5 Safari/537.36
Referer: http://www.gsxt.gov.cn/corp-query-search-1.html
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: __jsluid_h=2c555711a33c17bfabac0351628c011f; SECTOKEN=7046988750317683614; UM_distinctid=16f5a7c476372-0245007d9056eb-6a547d2e-1fa400-16f5a7c476449a; gsxtBrowseHistory3=%0FS%04%06%1D%04%1D%10SNS%24%26%3B%22%3D%3A71%3A%3B01%3A%219%40%40DDDD%40%40DGDEDDEDEFDEBDAFDEGCG%2CSXS%11%1A%00%1A%15%19%11SNS%E6%B6%85%E5%9D%87%E5%B9%B6%E6%97%84%E8%88%8E%E9%9B%B2%E7%A6%A5%E6%8B%B4%E6%9D%BD%E9%98%A4%E5%84%98%E5%8E%8CSXS%11%1A%00%00%0D%04%11SNEEAEXS%02%1D%07%1D%00%00%1D%19%11SNEACCCCMCBFCDL%09; gsxtBrowseHistory2=%0FS%04%06%1D%04%1D%10SNS%24%26%3B%22%3D%3A71%3A%3B01%3A%219%40%40DDDD5DGEALASXS%11%1A%00%1A%15%19%11SNS%E5%8C%BA%E4%B9%8E%E6%8B%B4%E6%9D%9B%E6%9D%BD%E9%98%A4%E5%84%98%E5%8E%8CSXS%11%1A%00%00%0D%04%11SNEEAFXS%02%1D%07%1D%00%00%1D%19%11SNEACCCL%40LLCF%40D%09; gsxtBrowseHistory4=%0FS%04%06%1D%04%1D%10SNS%24%26%3B%22%3D%3A71%3A%3B01%3A%219GFDDDDGFEDDDDDDDDDD%40FDCMLB%40SXS%11%1A%00%1A%15%19%11SNS%E6%88%98%E5%B6%AA%E5%8C%BA%E4%B9%8E%E6%B0%89%E8%BC%92%E6%8B%A1%E8%B4%B0%E7%AF%95%E7%91%B2%E6%9D%BD%E9%98%A4%E5%84%98%E5%8E%8CSXS%11%1A%00%00%0D%04%11SNEEAFXS%02%1D%07%1D%00%00%1D%19%11SNEACCCCDCAM%40GC%09; __jsl_clearance=1578301053.698|0|PTGtCC8navoWXwWno9F1yRy4Vuc%3D; gsxtBrowseHistory1=%0FS%04%06%1D%04%1D%10SNS%24%26%3B%22%3D%3A71%3A%3B01%3A%219EFDDDDA%12%16C%12MEMAG%11%11L%15G%17DD%10GL%12E%15LLDG%10AFASXS%11%1A%00%1A%15%19%11SNS%E5%8D%A3%E6%97%8D%E5%9A%89%E9%98%B1%E4%BE%95%E6%88%AC%E8%83%95%E4%BA%89%E6%9D%BD%E9%98%A4%E5%84%98%E5%8E%8CSXS%11%1A%00%00%0D%04%11SNEFDDXS%02%1D%07%1D%00%00%1D%19%11SNEACLGDDB%40LBGE%09; gsxtBrowseHistory5=%0FS%04%06%1D%04%1D%10SNS%24%26%3B%22%3D%3A71%3A%3B01%3A%219EFDDDDA%17ALEG%11BAG%11%11L%15FLAGA%16L%12%15%12CDCF%17GCBSXS%11%1A%00%1A%15%19%11SNS%E5%A5%9D%E6%B5%91%E5%9E%BA%E5%BA%8E%E9%9A%B2%E5%9A%96%E6%9D%BD%E9%98%A4%E5%84%98%E5%8E%8C%E6%B6%83%E5%86%A9%E5%9D%AB%E5%84%98%E5%8E%8CSXS%11%1A%00%00%0D%04%11SNFEDDXS%02%1D%07%1D%00%00%1D%19%11SNEACLGDDBMAMBG%09; CNZZDATA1261033118=1472937247-1577768846-http%253A%252F%252Fwww.gsxt.gov.cn%252F%7C1578303482; JSESSIONID=E5923B680498708E24C53D50139DF148-n1:10; tlb_cookie=S172.16.12.69
""")

Cookie = "__jsluid_h=2c555711a33c17bfabac0351628c011f; SECTOKEN=7046988750317683614; __jsl_clearance=1578301053.698|0|PTGtCC8navoWXwWno9F1yRy4Vuc%3D; tlb_cookie=S172.16.12.69; JSESSIONID=E5923B680498708E24C53D50139DF148-n1:5"
# Cookie = "__jsluid_h=2c555711a33c17bfabac0351628c011f; SECTOKEN=7046988750317683614; UM_distinctid=16f5a7c476372-0245007d9056eb-6a547d2e-1fa400-16f5a7c476449a; gsxtBrowseHistory3=%0FS%04%06%1D%04%1D%10SNS%24%26%3B%22%3D%3A71%3A%3B01%3A%219%40%40DDDD%40%40DGDEDDEDEFDEBDAFDEGCG%2CSXS%11%1A%00%1A%15%19%11SNS%E6%B6%85%E5%9D%87%E5%B9%B6%E6%97%84%E8%88%8E%E9%9B%B2%E7%A6%A5%E6%8B%B4%E6%9D%BD%E9%98%A4%E5%84%98%E5%8E%8CSXS%11%1A%00%00%0D%04%11SNEEAEXS%02%1D%07%1D%00%00%1D%19%11SNEACCCCMCBFCDL%09; gsxtBrowseHistory2=%0FS%04%06%1D%04%1D%10SNS%24%26%3B%22%3D%3A71%3A%3B01%3A%219%40%40DDDD5DGEALASXS%11%1A%00%1A%15%19%11SNS%E5%8C%BA%E4%B9%8E%E6%8B%B4%E6%9D%9B%E6%9D%BD%E9%98%A4%E5%84%98%E5%8E%8CSXS%11%1A%00%00%0D%04%11SNEEAFXS%02%1D%07%1D%00%00%1D%19%11SNEACCCL%40LLCF%40D%09; gsxtBrowseHistory4=%0FS%04%06%1D%04%1D%10SNS%24%26%3B%22%3D%3A71%3A%3B01%3A%219GFDDDDGFEDDDDDDDDDD%40FDCMLB%40SXS%11%1A%00%1A%15%19%11SNS%E6%88%98%E5%B6%AA%E5%8C%BA%E4%B9%8E%E6%B0%89%E8%BC%92%E6%8B%A1%E8%B4%B0%E7%AF%95%E7%91%B2%E6%9D%BD%E9%98%A4%E5%84%98%E5%8E%8CSXS%11%1A%00%00%0D%04%11SNEEAFXS%02%1D%07%1D%00%00%1D%19%11SNEACCCCDCAM%40GC%09; __jsl_clearance=1578301053.698|0|PTGtCC8navoWXwWno9F1yRy4Vuc%3D; gsxtBrowseHistory1=%0FS%04%06%1D%04%1D%10SNS%24%26%3B%22%3D%3A71%3A%3B01%3A%219EFDDDDA%12%16C%12MEMAG%11%11L%15G%17DD%10GL%12E%15LLDG%10AFASXS%11%1A%00%1A%15%19%11SNS%E5%8D%A3%E6%97%8D%E5%9A%89%E9%98%B1%E4%BE%95%E6%88%AC%E8%83%95%E4%BA%89%E6%9D%BD%E9%98%A4%E5%84%98%E5%8E%8CSXS%11%1A%00%00%0D%04%11SNEFDDXS%02%1D%07%1D%00%00%1D%19%11SNEACLGDDB%40LBGE%09; gsxtBrowseHistory5=%0FS%04%06%1D%04%1D%10SNS%24%26%3B%22%3D%3A71%3A%3B01%3A%219EFDDDDA%17ALEG%11BAG%11%11L%15FLAGA%16L%12%15%12CDCF%17GCBSXS%11%1A%00%1A%15%19%11SNS%E5%A5%9D%E6%B5%91%E5%9E%BA%E5%BA%8E%E9%9A%B2%E5%9A%96%E6%9D%BD%E9%98%A4%E5%84%98%E5%8E%8C%E6%B6%83%E5%86%A9%E5%9D%AB%E5%84%98%E5%8E%8CSXS%11%1A%00%00%0D%04%11SNFEDDXS%02%1D%07%1D%00%00%1D%19%11SNEACLGDDBMAMBG%09; CNZZDATA1261033118=1472937247-1577768846-http%253A%252F%252Fwww.gsxt.gov.cn%252F%7C1578303482; JSESSIONID=E5923B680498708E24C53D50139DF148-n1:10; tlb_cookie=S172.16.12.69"

headers_step1 = {'Host': 'www.gsxt.gov.cn', 'Connection': 'keep-alive',
                 'Accept': 'application/json, text/javascript, */*; q=0.01', 'X-Requested-With': 'XMLHttpRequest',
                 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3970.5 Safari/537.36',
                 'Referer': 'http://www.gsxt.gov.cn/corp-query-search-1.html', 'Accept-Encoding': 'gzip, deflate',
                 'Accept-Language': 'zh-CN,zh;q=0.9',
                 'Cookie': Cookie
                 }

# headers = {'Host': 'www.gsxt.gov.cn', 'Connection': 'keep-alive', 'Content-Length': '226', 'Cache-Control': 'max-age=0',
#            'Origin': 'http://www.gsxt.gov.cn', 'Upgrade-Insecure-Requests': '1',
#            'Content-Type': 'application/x-www-form-urlencoded',
#            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3970.5 Safari/537.36',
#            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
#            'Referer': 'http://www.gsxt.gov.cn/index.html',
#            'Accept-Encoding': 'gzip, deflate', 'Accept-Language': 'zh-CN,zh;q=0.9',
#            # 'Cookie': '__jsluid_h=2c555711a33c17bfabac0351628c011f; SECTOKEN=7046988750317683614; UM_distinctid=16f5a7c476372-0245007d9056eb-6a547d2e-1fa400-16f5a7c476449a; gsxtBrowseHistory3=%0FS%04%06%1D%04%1D%10SNS%24%26%3B%22%3D%3A71%3A%3B01%3A%219%40%40DDDD%40%40DGDEDDEDEFDEBDAFDEGCG%2CSXS%11%1A%00%1A%15%19%11SNS%E6%B6%85%E5%9D%87%E5%B9%B6%E6%97%84%E8%88%8E%E9%9B%B2%E7%A6%A5%E6%8B%B4%E6%9D%BD%E9%98%A4%E5%84%98%E5%8E%8CSXS%11%1A%00%00%0D%04%11SNEEAEXS%02%1D%07%1D%00%00%1D%19%11SNEACCCCMCBFCDL%09; gsxtBrowseHistory2=%0FS%04%06%1D%04%1D%10SNS%24%26%3B%22%3D%3A71%3A%3B01%3A%219%40%40DDDD5DGEALASXS%11%1A%00%1A%15%19%11SNS%E5%8C%BA%E4%B9%8E%E6%8B%B4%E6%9D%9B%E6%9D%BD%E9%98%A4%E5%84%98%E5%8E%8CSXS%11%1A%00%00%0D%04%11SNEEAFXS%02%1D%07%1D%00%00%1D%19%11SNEACCCL%40LLCF%40D%09; gsxtBrowseHistory4=%0FS%04%06%1D%04%1D%10SNS%24%26%3B%22%3D%3A71%3A%3B01%3A%219GFDDDDGFEDDDDDDDDDD%40FDCMLB%40SXS%11%1A%00%1A%15%19%11SNS%E6%88%98%E5%B6%AA%E5%8C%BA%E4%B9%8E%E6%B0%89%E8%BC%92%E6%8B%A1%E8%B4%B0%E7%AF%95%E7%91%B2%E6%9D%BD%E9%98%A4%E5%84%98%E5%8E%8CSXS%11%1A%00%00%0D%04%11SNEEAFXS%02%1D%07%1D%00%00%1D%19%11SNEACCCCDCAM%40GC%09; CNZZDATA1261033118=1472937247-1577768846-http%253A%252F%252Fwww.gsxt.gov.cn%252F%7C1578298082; __jsl_clearance=1578301053.698|0|PTGtCC8navoWXwWno9F1yRy4Vuc%3D; tlb_cookie=S172.16.12.69; gsxtBrowseHistory1=%0FS%04%06%1D%04%1D%10SNS%24%26%3B%22%3D%3A71%3A%3B01%3A%219EFDDDDA%12%16C%12MEMAG%11%11L%15G%17DD%10GL%12E%15LLDG%10AFASXS%11%1A%00%1A%15%19%11SNS%E5%8D%A3%E6%97%8D%E5%9A%89%E9%98%B1%E4%BE%95%E6%88%AC%E8%83%95%E4%BA%89%E6%9D%BD%E9%98%A4%E5%84%98%E5%8E%8CSXS%11%1A%00%00%0D%04%11SNEFDDXS%02%1D%07%1D%00%00%1D%19%11SNEACLGDDB%40LBGE%09; gsxtBrowseHistory5=%0FS%04%06%1D%04%1D%10SNS%24%26%3B%22%3D%3A71%3A%3B01%3A%219EFDDDDA%17ALEG%11BAG%11%11L%15FLAGA%16L%12%15%12CDCF%17GCBSXS%11%1A%00%1A%15%19%11SNS%E5%A5%9D%E6%B5%91%E5%9E%BA%E5%BA%8E%E9%9A%B2%E5%9A%96%E6%9D%BD%E9%98%A4%E5%84%98%E5%8E%8C%E6%B6%83%E5%86%A9%E5%9D%AB%E5%84%98%E5%8E%8CSXS%11%1A%00%00%0D%04%11SNFEDDXS%02%1D%07%1D%00%00%1D%19%11SNEACLGDDBMAMBG%09; JSESSIONID=E5923B680498708E24C53D50139DF148-n1:5',
#            # 'Cookie': '__jsluid_h=83c9f1776b55cc55de282f73a5693a9e;__jsl_clearance=1578301869.646|0|mgTdkCj9bPMo0SSMzbsBe5o5EkA%3D;JSESSIONID=7DCFE4C102CFD9E76B3F36E270E8445D-n1:-1; SECTOKEN=7058259673846910264;tlb_cookie=S172.16.12.71'
#            'Cookie': '__jsluid_h=2c555711a33c17bfabac0351628c011f; SECTOKEN=7046988750317683614; __jsl_clearance=1578301053.698|0|PTGtCC8navoWXwWno9F1yRy4Vuc%3D; tlb_cookie=S172.16.12.69; JSESSIONID=E5923B680498708E24C53D50139DF148-n1:5'
#            }
print('headers', headers)
# sys.exit()

url = "http://www.gsxt.gov.cn/corp-query-search-test.html?searchword=%e4%bc%81%e6%9f%a5"

# url = "http://www.gsxt.gov.cn/corp-query-search-1.html"

data = {"province": "100000", "searchword": "华为",
        # "token": "55917194",
        "tab": "",
        # "geetest_challenge": "a950ba00da164ba66f3e9cb53de045687d",
        # "geetest_validate": "a72030b1a4bdace7f1891c66b6514171",
        # "geetest_seccode": "a72030b1a4bdace7f1891c66b6514171|jordan"
        }

# proxies = {"http": "https://" + ip, "https": "https://" + ip}
# , proxies=proxies
# res = requests.post(url, headers=headers, data=data, verify=False, proxies=proxies)

# print(urllib.parse.urlencode(data))

# res = requests.post(url, headers=headers, data=data, verify=False)

res = requests.get(url, headers=headers, verify=False)
print(res.encoding)
print(res.apparent_encoding)
print(res.content.decode('utf-8'))
# print(res.content)
print(res.status_code)
print(res.cookies)
