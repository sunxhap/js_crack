# -*- coding: utf-8 -*-

import re
import requests

"""
    关键  FSSBBIl1UgzbN7NT
    
    第一次请求得到
        BIGipServerpool_anquanfanghu=801252228.17439.0000; path=/
        FSSBBIl1UgzbN7NS=5Vp4F4kLPeSRZUJ4.uFIpUTjnCwa2erxz0I27H29DJUY2tuy4ipMOMKUt1G0AvMXQCX1HS9oh66BeAE7FfTeSqq; Path=/; expires=Thu, 22 Aug 2030 12:24:21 GMT; HttpOnly
    第二次请求
        + FSSBBIl1UgzbN7NT (生成)
        
"""

# cookies = {
#     'FSSBBIl1UgzbN7NS': '5Vp4F4kLPeSRZUJ4.uFIpUTjnCwa2erxz0I27H29DJUY2tuy4ipMOMKUt1G0AvMXQCX1HS9oh66BeAE7FfTeSqq',
#     'BIGipServerpool_anquanfanghu': '801252228.17439.0000',
#     'FSSBBIl1UgzbN7NT': '5U08.Lmeo7oqqqqm0hdISvACg.XzKpYt.nKm1f1WouHfc8IBpgvLOK63HsnWjAyoVXGhj54Ob9XJFtR1.vljod3eWi2BeJx_PaHtGg4Skzht8o7Vp02XUrtDodda0lqiNOVpP7XuKASI1_jMQeVoa0cqdojIoTztxxJm41CEq2mSzdmC7Zny3KdfIjJ5LRoYFz2m4C5JNtfV4__Q3gjhPv4sMUHhGdVidirRyOOx0vC97fVsmWzL1_U2L.roBUvwf3_MDHfSLlaVZKeSqACZKVakdQ9YqDtkGIpzKy4v92f2O1nRzis7ebk7JwGCEO2VC.B_2Lz8OHPM3ETgCCqgl8K',
# }

headers = {
    # 'Proxy-Connection': 'keep-alive',
    'Pragma': 'no-cache',
    'Cache-Control': 'no-cache',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Host': 'www.chinaunicombidding.cn',
    'Cookie': 'FSSBBIl1UgzbN7NS=5eEtQwBF9y5Dg3SfdHqxexVeLgzEvfnSkbbaQQ43ai96RmvuqDtjJnQ4N0NXIld6EmTyB7OfWT7gb77542gWFqA; PURWW_SESSIONID=RWYwQO7RjnNpTYk21x7ZkLfF0h1EhPTMOvCMN7G5HxYvJdGlUGWH!1236302673; BIGipServerpool_anquanfanghu=801252228.24091.0000; FSSBBIl1UgzbN7NT=5U08_KTeoBn7qqqm0WkV61aIKBlmyKA890jIzdXXkEkzVJqKwtDWHiuXNfEo_yKO36.531.lZz_vtrok5P6_XIf5zZ0mUvNaTG2Zi1_FbytbW6E8pqKkdipG4tF_KBswSHxj7KAPjuF0DLhMVd7h7L0BcNGTMW3S6DtndUij1glBDpCMA1rAiA0g46BSz5sjXwM2E4arAuIilvYdqaQ5tGYtPAC.aDxI75HtEVsUa_7lltnbjujnnQDCKz4kBl9nGghcnLGDueB.IICUyoW.XtwOcZH37X8AKMR0UFNDmM5auxi6Oq9wCEGYx.JTyEdT.t8evAx2Vi3RoWELaOoTmNh'
}

params = (
    ('id', '4404703300000008133'),
)

# response = requests.get('http://www.chinaunicombidding.cn/jsp/cnceb/web/info1/detailNotice.jsp', headers=headers,
#                         params=params, cookies=cookies, verify=False)

response = requests.get('http://www.chinaunicombidding.cn/jsp/cnceb/web/info1/detailNotice.jsp', headers=headers,
                        params=params, verify=False)

content = response.text

# print(content)
print(response.cookies)
print(response.status_code)

print(re.findall(r'content="(.*?)"', content)[1])

# NB. Original query string below. It seems impossible to parse and
# reproduce query strings 100% accurately so the one below is given
# in case the reproduced version is not "correct".
# response = requests.get('http://www.chinaunicombidding.cn/jsp/cnceb/web/info1/detailNotice.jsp?id=4404703300000008133', headers=headers, cookies=cookies, verify=False)
