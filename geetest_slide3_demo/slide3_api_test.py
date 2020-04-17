# -*- coding: utf-8 -*-
# @Time: 2020/3/10 15:26


import requests

requests.packages.urllib3.disable_warnings()
import time
import traceback
import json
import random
import re
import sys
from urllib.parse import urlencode
from datetime import datetime
from geetest_slide3_demo.geetest_request import *


def get_requests_cookie(res):
    cookies = requests.utils.dict_from_cookiejar(res.cookies)
    cookies_str = ""
    for k in cookies:
        cookies_str += ";{}={}".format(k, cookies[k])
    return cookies_str[1: -1]


def str_to_dict(headerStr):
    rdict = dict()
    if headerStr.strip():
        for headItem in headerStr.split("\n"):
            parm = headItem.split(":", 1)  # 切分2
            if parm[0].strip():
                rdict[parm[0].strip()] = headItem[(headItem.index(parm[0]) + parm[0].__len__() + 1):].strip()
    return rdict


def get_gt_and_challenge(register_url):
    try:
        url = register_url + "?t=" + str(int(time.time() * 1000))
        headers = {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'User-Agent': user_agent,
            'X-Requested-With': 'XMLHttpRequest'
        }
        res = requests.get(url, headers=headers, verify=False, proxies=proxies)
        result = res.json()
        if result['success'] == 1:
            return result['gt'], result['challenge']
        else:
            print('error result', result)
    except:
        print('get_gt_and_challenge failure')
        traceback.print_exc()


def geetest_get_type(gt):
    """
    获取网站cookie值
    <RequestsCookieJar[<Cookie GeeTestUser=82e3052d5f5ba3b12a27a0f5d375aa4d for api.geetest.com/>]>
    :param gt:
    :return:
    """
    for i in range(3):
        try:
            params = {"gt": gt,
                      "callback": "geetest_{}".format(int(time.time() * 1000))
                      }
            get_type_url = "http://api.geetest.com/gettype.php?"
            send_url = get_type_url + urlencode(params)
            headers = {'Host': 'api.geetest.com', 'Connection': 'keep-alive',
                       'User-Agent': user_agent,
                       'Accept': '*/*', 'Accept-Encoding': 'gzip, deflate',
                       'Accept-Language': 'zh-CN,zh;q=0.9'}
            # res = requests.get(send_url, params=params, headers=headers, verify=False, proxies=proxies)
            res = requests.get(send_url, headers=headers, verify=False, proxies=proxies)
            res_json = json.loads(res.text.replace("{}(".format(params['callback']), "")[:-1])
            return {"cookie": get_requests_cookie(res), "get_type_data": res_json["data"]}
        except:
            print('geetest_get_type failure: ', i)
            traceback.print_exc()


def geetest_get_params_get_w1(get_type_data):
    # return 'Ev2h7oZMwugcLJa6zRX1)3ot1b7hm3ZLXf0GVbMv2mKxf(HjviLx91LFF0CLrdZIarSXfRXI3X4nyqPvnZD1TiOjbqthf2yix2CmNrPawch4dq1L2F4WWxMotlwreDDIXidztK2Qnv3b1scfKDCn2lUrctVbcZ5wSSAB1j0hXts(INM5XAI8x3PnxwbYeh8SXFOiBiD(Zn7W837EMUg75JVpeI9Rp5oyEQeXTAFbQchVppeUXn(QV44Xneck6gWyGUEBFyThvYTeaGjwWJSA(gs4QieNscudpHEdEoVLupGwnpZQI)dxqNu6J5e8u2qtwfA)9E8WbF)JkYGOA0h8YdYX4STIkQrUD1emaSXioU9u87wYD5kPLRo8ddTqfF7mNDp9b(GlP)Tw5cb5fYsXV8WYDlPCLvTl79lf6NkJFa0VtUqYpsVfafRwWGmPuN4XlGu)zsYzo07k4i1S(VB0OHAHFUH(o17d8jSUwcMRqxHFSBTI6AqfMA(t5xVpuNG(McqRXLAQtTZvxa(Sp5u0gphfinqinm)zFhuNx8a2YTBLojLGl3W8oe4DkbYdLZtTGqNg18zmvU9ZujtSRiU3FYY77fourQO)mb2zAlnBqpHTvxZErztLfkOM(vwIwyl9adi0Ch3Vgc(wPOHnwpEawdfRVtqqUEtvVX5aYaT2nsoc)aH8CjXraAY8kUYDLUqDr5gg(b5DHCA6XQoJbUFOqEl6CqPNnzqLreyZgaoO(UOHvoHoHC6l5jep6mUzCP2fzIO)U7UV1l7acmXNNwqhcCOVOOsoSpgfDnR2LAET38EA8WvPpz6OYKe6PTTvuQTnVf3KSv6vdmqqU)JPlkO3AAPuMtKMKSJ)Bx23jXt1Al9yHmLbHEBAfiL66loeV2djMOyfYZe385dtm5kBRGQDirzugNRZmKScCmOta()u1(4uYZZyR7XxuBWa8KltlYZIE)gS7fDVZd4qhwpY)yYAP97H6IiEDeyecc12mKfV5Pmw(WsZ6x(Qao)k7cDqWnVEW)cNZd)DiGNWWBL1OXrzSq)ZS4c2DiOZ0nYry83cJYyr)sno8EGBw9EcqTVwH1ZfgCMlZ3TilqmYJ6zGD2KcMPqebZ)EXrVI6qJ4fso3bYpjY2YCXfidXwKx4rq0cwiZDwEvnQK91KYXakYSQkFN(TPHXU)U(1GOZlvlzpWC64xSjOTd9d9iXbb73ZDwjW)hRChz8L930Hs0HE0)l8AOgkuyzBow)eZvR26ehCFA8Vat2mtxyFv66CZgWdpJ6(FI0iB4Jn(RimfFLlUpi1aKoFkqVbHLuQ4k3tgsNiyJkrYZUKJn9QAbTvEaMFEj7bro0J7WdZQixk)0Qtqe4AF0bh8c0THv7WHQdSJccXud1hTFLCWMsk7HV4gs9LcElnoj2ySK4EbMMM0UYLJZan8ux)RFLSaqgbKLe5xwgur)iW72454lnnZolx(GdjT8eqela041fbb2948e5d696e042c6d854b2717ef95422ae8d4fba8287101f6754f0ac7359abe782d06af5f3b821a1bfa13248dd4ff176f5b3563ab1e432e649712f5f50c1c74c8798590c2c9582769955e2c96c7d95739dfc6e52d4db266cfdd5facf8fc7a52feb3b8e138efb4faa0e939b8caaab87956c21de4b91bd6e0f8b9ebe89b'
    # return 'uGd5VjzNA(rGQRmqUe9bTPZeJIIX4u7aovqQUZ8ovXhgkGyqgDAyT53j9hM8n3QNrkxUndpIOZI7i9pUqBfEV6wAtJsIOgAdGSDhK)wSFLzTfyA(J)Wyfbkb7LH8PwKj8dDl3WoLwaRnZDhe3Nk1iN8vMMkDaKR1iX6PrOzLphxR8XDLD1qMirdwGvmpWnoZpdtJ2(6KBKnFxpN4Kd9eryak2jAaacDWlRNCkXVTf1q1XWZ1E0GK3MZbMv7lbQrNOKGuIHcxGw3PIha47jTcqvhtSMAPdQoh(sG1MvidEEGtHQg1ZsfJ2ZP1QoAz38QbHwJcunUsSKchYK2vzSaG(kqReETpP3(YYr2Ul1lhP0puXD(htadgsbyhuIM2jKbMHA3LLEz50uaXpOeEQ6myDK9vm7lqp0xksqfJ7ClZ0ki2q2yXwrcVx12FpI45BHFvMKryt9(4ciQL51J9a(eWwm4Pq67q)YresqtRUQR2Yc6sker1yV)v)tiE8Z(qoYj8XmUnh16kqwNtqXJQyVcDJLpvz4BXDNrtZTZbW7mACczOZmrbLGYC)TdqCxM0CTMZa2aXXzScTOMtODVXplkhUFisnZyje4dSwwG(z9Lggn91KDqQu7jZnJWtZFkI(0VQwzirSyhrYtGMaFugqJ6FuPY6Om2hFK4V3IzxtRN7rQLP0(R3ufa005jEUCP9Xad4KP8r)GHy1awTJytms(EX4Y5lsgrCqJe2WT9BqhQd6KA.bb31d1acecafaa430e1552a4be264c41a28ce42906cf5c96f690fb745a9e17002f05f327273608fb5bf74998c255e0c2e303b70f54aaf8a8084e2478e89ddb53b1d8c24bdc46073949f9f5e7a94c3a919651bc4bf723173b8d79a17365cb0506e09616ba44c436cd1a85290426f327795f42bb194a340e926cf7e63ff97ac314'
    return golable_w1


def geetest_get_params(gt, challenge, cookie, request_w):
    """
        获取下载的图片
        :param gt:
        :param challenge:
        :return:
        """
    url = "http://api.geetest.com/get.php?"
    params = {"gt": gt, "challenge": challenge, "lang": "zh-cn", "pt": "0",
              "w": request_w,
              "callback": "geetest_{}".format(int(time.time() * 1000) + 5)
              }
    headers = {'Host': 'api.geetest.com', 'Connection': 'keep-alive',
               'User-Agent': user_agent,
               'Accept': '*/*', 'Accept-Encoding': 'gzip, deflate',
               'Referer': 'https://www.geetest.com/demo/slide-bind.html',
               'Accept-Language': 'zh-CN,zh;q=0.9', 'Cookie': cookie}

    for i in range(3):
        resp = requests.get(url, params=params, verify=False, headers=headers, proxies=proxies)
        try:
            text = resp.text
            res_json = json.loads(text.replace("{}(".format(params['callback']), "")[:-1])
            if 'data' in res_json:
                # return {"cookie": get_requests_cookie(resp), "get_type_data": text}
                return {"cookie": get_requests_cookie(resp), "get_type_data": res_json["data"]}
            else:
                print('initData :', res_json)
        except:
            traceback.print_exc()
            print('geetest_get_params failure', i)
        time.sleep(random.random())


def geetest_ajax_user_cookie(gt, challenge, cookie, golable_w1):
    url = "https://api.geetest.com/ajax.php?"
    params = {"gt": gt, "challenge": challenge, "lang": "zh-cn", "pt": "0",
              "w": golable_w1, "callback": "geetest_{}".format(int(time.time() * 1000))
              }
    headers = {'Host': 'api.geetest.com', 'Connection': 'keep-alive',
               'User-Agent': user_agent,
               'Accept': '*/*', 'Accept-Encoding': 'gzip, deflate',
               'Referer': 'https://www.geetest.com/demo/slide-bind.html',
               'Accept-Language': 'zh-CN,zh;q=0.9', 'Cookie': cookie}

    for i in range(3):
        send_url = url + urlencode(params)
        # send_url = "https://api.geetest.com/get.php?gt=019924a82c70bb123aae90d483087f94&challenge=961dc1d3622d413a266dc42b976ec740&lang=zh-cn&pt=0&w=2143CtHBWHlTO(beS3q8YgwsH0fyQh9Iw1G9ZX2uPq1xY2V3xRw4pdhEM(W5)O(JT4oMtLEc2IxN3i6tE7wA1q(uVIrts1HqSrdKVeTMC8Fjsn(c99iRJQLIUesH6CehjqWS78ho0c0FhAf0BquNb7J)TECButQyFi1ceyCDjkB48CXvCeIS7VcoSdB(xjeaSl7zHeK6vuicMCBEa8917ZEN8ARG8rK33exU0RQGB(0PGYAePHX)HdoqqqnAm8HQzl94DwqjYP1bATfvaGgOmdJJNb7FoNgawZyymAOj7Nq1F1TkX)103ljWY3Ahgc7xBQa0G81uIBoqNHeY844ux4hLbib1ZtFR(r3)ctwy99oT6aqJJbLXLRaxPRyKOSpEsai(OpgJImadiJhmdvvuhI8EA0teQqqjERUDFfAncSi6yWJ3qVM(SGvyQhjaclBKvsRIhLyd5XlYE5djZV8br813uugUpfFh4UIAa8yLF99dmcfr0EIy1zt9UDYJVZ16lpIev1Jb06zWUd3HbZZvwQAIcXB2R6DaeRx3xQMOWAOy)XWyc3Z)fK5RLiOBY3OdAVa8pZl92lWk8fEsXripfW1xja170epHtCC)NSWkB(XTlyzLNDxa2g)ECtsHtUQnCCUB3Q59DUU0ULbOd8W3Wk1oDabc6(vXeUGB80sJh7JHcugV6TULXDpJkD)VoB)aQwnR0rRkl2AoBpw2Ox(2NvfZp2biJWHwIFF8lIrnKD2g4uIn6ECERwPQPdWADocv6AtMjlOsYpYIxc2cy(wu55hgQkIfP6mvQXoEiDJj21jPuYpQfrKi9WWOiFd053lxxQo2AqdVFH9UU(ukaN9NnwB5CYoQebRSQTtHlqf41(dPL(PXIscN8mixRlZ9)J2it0MZFkMOifaI6ayVlurQa)Lxg4pdNTVBOB6NH2NR4rGPhZY1juXiUOTVM7Q8XAfI4WpWix52QriVH4(TvGOo(DN5bh4DDzqIAx0pinI3gcpdt08jbV(CcXvZikC7b89s2iRTlHele0oZZ3n7Yplukxqm6J8qX27beHXRUR)L3J53pQUMDK0Citn4yz7RUgO5Bj0Nqcn182kWhp0UKNKnA)1U23iCwH6xvQxmVggBGviQBoKNGWY3ucz(LEKQuyvrl9sOQ8iZKQg6XgwjHTEgBAkzlR6I7PgeFsKgnCRt5l)mJsYBiyCj1X)nwciv(OqQUy0XO)yUP0ggSNdKN)nNM0t8FvY8awObNi19yU4T5UACml5OCGF()KlqaMSbGf9kPbCheqIqF5BLD3kjwVf(Jd)kzkIwbUhCPM9oIDqvtYfMxLKtW3N4vL7YZ2eZT7l3UeaGl385FKtHPpXZDAjfZLUQT0ZRdebypeajDBjA1mxZazANVv941ecGKMyPAdb3qTMOM)vR0TDGcbaqTeREhUzL5yUysKe5dWxQhsnJlszFgbz0g0fT5Kdg)S9l9vCwMilcC)0Wty)g89K3g3vYcZ0P)jUEhuszq2gOUvwOKELxAHzo0qKcwXqNgVHjZtZarcb9DlAu93KgkWhW3cx1e6w6)qWQYKIbhlI2Yo0dUneJszDDyY4GjElNcO0y8v3EglWdcRxku8zAneCXfGageF2nIfP6L7YgEjHWEou9MixQRtPWg8E7D6zJNWIJgDD3n9C2K9qRj)V(lYU723LgggYqnLWMl)(r6UQ(GH(QFKek7EuxtkbI1YO4QyJgEhC4yOgFGRVm9EyF2or6jQKom6A1IOnxdGLYYC(B7ahLc3rETmtU0UveZ9ZaroBBctbRqpAqn3SG7ny5ad4m)ltItw1yLHqxZnNCBu9JRjaaiiT6NHSdFvd)JcjYojtB8aCUCZFEm3scggwLDYUp2ka1ovrAjDVS6jhYMmxEsTrgDQ5shKBTHiCcFslbkRx1ug7qXNT1LsIeVJzahcDx1cuMtlhfpQVUrbrzFaF7bk)ID)tTxWMgzNfk9wGO8JpthPlzfq1(DFKxoB9q(zPFM9WsmCiUFbqAavDnPTh4EiLHEJYAeKya(wnYBcwoIKLIhO2vW1oATYQCpq1aatoIr8(bwyGGovQE297hpcibhWw0L4RPQv)jiZ3929KCDNF)9FsEPtydxLLXI3N9eF8cgCQSvgLPDoLOOeWTl29sX)aNQboIuLkYwFcWHz6SMkMLzv0f2(7ah)yD7ZoQscMRiXX1(9YBU(k(lP(U97juYkdFwROit1LD5gZr9MAybBnYJj3JQM0K8u8w68dz3)SbJG6mh2I81LOsbw7pSI2Zc7wdwczWUnx8lDHIwTYxYuyaGPzrqKzxMTkj6diAuxNJNFYVtkI0X0byCz1gZE3)wvxGcIk3q53JK7HCmWrkfJ5oFpGHUXZ2xk4(04HSQQeIjF1qI1lKe5vF4nGJM1YlMkICtr)VWwW2CJ20wWpeEHmlP6r6rdKFFBsr0b03rpZ4jMhc8)fH8X50lOzb9fvwnAOxqa6EQ2)xQyTGxONfeeTaC1sDl2nh)0Qm2Q0gIFCrTmnYuypJEY1mvwrheA(QhN88HtU.09a5d7d1447e7467c130b1a73f85d1d8fd09590b3624fec0570eef31078859537d7bf66ac8c263de9754eff162b2acd8e133537cc20821486ffd9fd845171854f853c1b9b26b760629b958f70d17abbff5914f3ce6d8e1c72a5112b1ac52eed5c3803f0fb165738818fcc6d562c185d95616158688aad00b81f0fa48bf2cfa68&callback=geetest_1584096250784"
        resp = requests.get(send_url, verify=False, headers=headers, proxies=proxies)
        try:
            res_json = json.loads(resp.text.replace("{}(".format(params['callback']), "")[:-1])
            # if 'data' in res_json:
            return {"r_cookie": get_requests_cookie(resp), "get_type_data": res_json}
            # else:
            #     print('initData :', res_json)
        except:
            traceback.print_exc()
            print(resp.content)
            print('geetest_get_params failure', i)
        time.sleep(random.random())


def geetest_get_php(gt, challenge, cookie):
    url = "https://api.geetest.com/get.php?"
    params = {"is_next": "true", "type": "slide3", "gt": gt,
              "challenge": challenge, "lang": "zh-cn", "https": "true", "protocol": "https://",
              "offline": "false", "product": "embed", "api_server": "api.geetest.com", "isPC": "true", "width": "100%",
              "callback": "geetest_{}".format(int(time.time() * 1000) + 5)}

    headers = {'Host': 'api.geetest.com', 'Connection': 'keep-alive',
               'User-Agent': user_agent,
               'Accept': '*/*', 'Accept-Encoding': 'gzip, deflate',
               'Referer': 'https://www.geetest.com/demo/slide-bind.html',
               'Accept-Language': 'zh-CN,zh;q=0.9', 'Cookie': cookie}

    for i in range(3):
        send_url = url + urlencode(params)
        print(send_url)
        resp = requests.get(send_url, verify=False, headers=headers, proxies=proxies)
        try:
            res_json = json.loads(resp.text.replace("{}(".format(params['callback']), "")[:-1])
            # if 'data' in res_json:
            return {"cookie": get_requests_cookie(resp), "get_type_data": res_json}
            # else:
            #     print('initData :', res_json)
        except:
            traceback.print_exc()
            print('geetest_get_params failure', i)
        time.sleep(random.random())


user_agent = "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
proxies = ""

# step1
register_url = "https://www.geetest.com/demo/gt/register-slide"
gt, challenge = get_gt_and_challenge(register_url)
print('gt: ', gt, ';challenge: ', challenge)

# step2
geetest_user_data = geetest_get_type(gt)  # 获取 GeeTestUser cookie
print(geetest_user_data)

golable_cookie = geetest_user_data['cookie']

# sys.exit()
# ------------------------------------------------------
w1_data = json.loads(api_geetest_get_w1(gt, challenge))
golable_w1 = w1_data['w']
aeskey = w1_data['aeskey']

# ------------------------------------------------------
# gt, challenge = '019924a82c70bb123aae90d483087f94', '4c4a97c35f964618d303bfdc8c34f0ba'
# golable_cookie = "GeeTestUser=1ed46501589dd57a9eaf9a96ff878fe"
# # 测试第一个w 可用
# golable_w1 = ")c2JQMep41eYgRyn6yYNLTi7b3A(IEFHjYP)4IjMo)aaodcUTk8ERKLI9j5wKviht1AmosX1wMWF)g9k)DfmMz7AW)6an)hMEjh0HP6pavn2PRSk1Zp5AQCoA1zks57g0L5PUL(turzuky29l2im5lfAHD4V1CksGWEaVIeK9AfkK6GI3hKO6ehJfTN6U)wza0fE3zinxJ85PisFTwF7kqO0y6IWqVmG9KGrO4zRD2X76n66)EkojCzk2ryeKx2IWwWlkNXPNE5LzlBJBASx7XXm5bk47UJzp(lrlPyvGmyTHO)66niOkn(D5nsm6ZfHpgfx5)Q2T3S2jNMM(TdJjTi1cKK1NWAXYA9eZE22(jcazJU6yrQ7rBTIM72E4lGejusdE6x)fPB7IChmjPjydNEwNXLNPMjJnW4XFrZ1Jan8tzt(uUqNIEBdZzvH3jU20lmlCR2LGheNVtW90C6kybB2hcTYCqGLWfQVfMyg)K4qktiBH6xBvKuspsC8N41oIq5NS34Y)GTxBuyATrtUPxUI7Jv2qpqleylz31BxPjS9K57bhvcKusMo6d70XA(mVz2VLtocWsP43k)6nrbHme)nGk)I7M4dc5MrFc7MEvxkbUvFQn2fsoqcB(iaIKWY0s0(G)5O1XBgPV6r7trkbvuQkCORA(JMO1el5tWEF)I5YBIvulDA)2WVl4Yedf6dHbqCNEZYId18oO86XDC7T9nOmTtdhU)ITWqqvRRCE)yO5a1kW46qmo81QEP2jPQhOqJ9r17qk9uIJPhD2Y5PanclOZ4onR1kz1FD9VSOQ8unvk1k4zS(iLjQTAz840DWZo8vyQKdkqj43jQ8z(67Xx8NPQUjE3ETR1H8BYgctQahcR31hbhA4jtowUhlRPOf0bMf67q)rwB0eGNt0fSOgS4jtkBqu43NALNevtFSOErRemQ)X1YyoOMRXFTHoVPMkUcPgeNOt)74d0aFMRjvu9gnuncIDYHA(KZFxK7RnjyGgMNmepBnpVdk(SZSF068oJp4cBJANxWio2CpIxG9UI7fvUphW3ToclkKYt325bHVo6aPaMDslzWjDfoBgUeDFXSzF1b343KJ7EDtkzaLlFtUGa)rfMx5gYPoxMs)w)wF8)Ks(N7RYJe4su)ZilnHLbhEeNwDZfbNlqkCTGqe7pT8ON16P4ArNhHo0K4)SL9YOFrOYE7KBHCFHBL4LDmHipdjWhEJo21)5lRAY5WQGYGzYMy5CS6zE23UAu(RImWn8Hw5iuUUME8WCHoEA(m3tRBWthgT5p6Lo(f813Q2pZ3nOkbbTHVJA3lgrsQfNRU41Ag43QiDvZ16BZPolaqjcXCkluAlQWfJdL30pO8VGpPl4BIQgLtxUo(JRWVglnJaSvPoTKqDtwC3sP(Ah2lzZpdCoSwoSIO3PwI85f(TNsHB)zWu81Z7nW(MtSdlCI5OPqXLQMEDbctHCV1mvbP0X56onfrhMNHOWUjnPZ2KrwUyiFg(vBwV0RxmnEAdSCLmN)AsLJrWo(VB3J0)6dGUJRMtV251sytEzFt9(831EB39nvqyq8kMX7R(LRj10PU7q6mDl5aOrotHhcZueilF4COQwaOQygMygUOk5eXckzCEWsZqtJkk7iRR6G)Ir(wus)waB7GHVkO(jkQ7VTbWkZKrOTcYCSxaYh9G5cepMUGb(sQ35lprU(Ow2t6SBXO)aF)b28Fx2I4Dqf3ulq5Gkx7Ntg7(WgtB0DJprxuXx7Jj9Pt)B7vaOGK5UnlaJSju19mdK8CmRGj4TAAn3YDRlhcp3YakeMVhLfJUq9tIgOu5yPMZQtRNYPG1AMD3Z65vAlCvn9eETSUeiGKM9x(6RhI0diF8Acq8Uy5(zkfhEVVgq9NxDGaxMzplZuhBm7k2cJEOYYIO3w)K8YYbyrmVW(gW2C67odeB7oFTGsanzzoykGz55VS0n0zgBDjtXnK82OAk6)EhjOnPONVW0XDcYFet8O(e64ecNfwYAQwsDGsElbMT3RKdz8WXTas3hbJtEjK5fZfJj0OLaDsfjdYQkghYIHLPaYfjF9I4lsqJ5j8BJXdsx74VENC)gQG91wMv6BQ5JQHs0bViqZH88cp4A2a)hlHQHHcMBKIZxoSOFygRDfl0KNGKrxLXirz9HR4FHYYYmpPuU1UWhxFFqEkpC4zRWxdn0pNYW0IMdXnOD4aKtIjNXj06HBL9dmMSCQfBbluLYrf0nNC(rw1yD1vJtMMOOSJDQl6x(BFtwrFPzjMnO5PCf7Zo11O7wonfvwO5mAWIEfLYFCayvShXWhTigUjtlbt02nt6ecQgeAI9DHGFm6q6msn1uZyb)8LVFWCxzVxpqe6QV0mbeAxKVNYTtQlyKP2nLnuw6khAWq31Ju6KHPrpyr893xEu345sUUmUmYEpMr2bKEQSWpfPmsPHM9GkkAaZvw7TOTjeoP7AgJ0hBYW5heHeObg40vACg)W3D0P5iOxgrZWOP3SrSbM9qKLpu0ZFi5XqkRTdi6oKQXOjmMVkna97AXA3MJJak0Q.12702253c47d619084b62d718a99ad4d2bdca0a8bdc3cd973960615ce5886aa4671f73503bbbf1d44a773f1266494f38fa31f07f698e9098e915734bc2f565543cbceb6d61732078afeaa3d77a0ec143f19a3faa2edaeaa4307f9366daf76690595d58184efc0409874263357be33f17a31a1c39b04a150998666c66502f47cc"
#
# # step3
# golable_cookie = geetest_user_data["cookie"]
print('golable_cookie', golable_cookie)
initData = geetest_get_params(gt, challenge, golable_cookie, golable_w1)        # 第一次获取c,s
print("initData: ", initData)
# sys.exit()

# ------------------------------------------------------
w2_data = json.loads(api_geetest_get_w2(gt, challenge))
golable_w2 = w2_data['w']
# ------------------------------------------------------
# get w2

# time.sleep(1)   w2 request
# gt, challenge = '019924a82c70bb123aae90d483087f94', '4c4a97c35f964618d303bfdc8c34f0ba'
# golable_cookie = "GeeTestUser=1ed46501589dd57a9eaf9a96ff878fe"

# step4
# golable_w2 = "E93ZTlZsrFY(1a8LlQU)MI3v3orVMqPQiH18UwQCJVMbVuXTtY2Yi)1V)IXbFx3f5xpgN5BpWzlbhH)qHMDXur67S3SY3VEN1YQwW16mEqCemmoa)ohG12jzLqanuEO1YUq0)ObxGDlk96OmakbiiH99nEsg1J4LahUAkcq5FokgOBLvwDIAWtD297wG)QYNuCEubmp9At5J)RtwqeQf(uW(YJ9iIfCL58xxjb8WU26x6xJuap7rip4nzQBxz4QN7cAg1n59kfhGcqZZjTAdkCXRuVuAPN7nMSB53FLTmftjNGFho44pWho336DYdilzKQHB0PCow0Dc(nUzEc1l(2Zs1lXVnYqIZU03AdJckOKY32(VjtbGIbHjRVVAxCpt942(G3RTWayLpkCICM1TWoEFzzgiYEvk0TPlcC1te0EZ)nNGNsnwVA0nyB7pmH92uEWfCJgoHLUvWh7IWAvuP5QJ2Cf5jYicc90DNhzjq1c9TRBbFyYOXCQa(vaR5PYMAQ2vmrutN)bt4AH4227hQrIZyqjFk2b2ozqK6BexXHpthbltrMpl1suODVXKzRE6rAOMIQX98PgbaOABYpIqiujDIZbMD4NvkvIiUT)aq0AReKREehQYVeKojSS0gZaL3KgpnBH8txCFYq97(bvQ3k8r7n9qZGHEj7ZN6SDJ)IDueCBlkjIvuKjiPxTWt5Xj19LQ1IXZrmN)lKzbmDoxOuTj5jhWXHDh8O(gZJGp2THeX0lEBnCHlV83okG7amMU6b)nGHkZWmJagy3gSLKxyoAwn7IahovSPs3cV76(IO1yq4QIv9Ishy0e56Z7fKUQuhmtsibjCF4cYmmdOFju13QBk(jiWjn8qZ()RTGIKkf9r55JM65DAyCtZgXXBLt3MxzuvGqOYIxFPN245AOzWUrd8T3hVJdsiFb9qm4LphS0lJzNmXQsbiVFuP9dDSONogzGYDAQEzNeUCfvabdxm2Z)Za8BAaaz)6)1bHGoJS)co7CPvdRNAfDsEBjk9OF(wglaSc7AEAdyeVDNw5wQAZmylVlHRSXwWIw2YL60uHXnZBag6ESghegcW5D5jojWGZ(zktJBnykfpCAIgpD7hBFdfjhL0JsLiAYKQVhHJNfHPkr3WdFFb5QIauTA5JfXofCDwzdqcRYz27JwfUwhHcTrlVEeuJYrC)qJirYjL4TBmniGZCAbxAswXoatGGJf(VRnEfMsgX2Bu(3ZTkzpaAGVKFgWTqrea2dW)6Anz9Vf6PloTXqbc3TGADwhDhQH2PoQ(xC1TBwHU6fxcJFwdPN5JDNTXTv02VFNmJ5NbYyrhYeilTeO8uj)7MpTyp07paiJCj0oLNuhHzOBr7)2jfxVxQDLcU36yMP3wJDvsBFiUY8k3M1WlggHeZDPtnmk"
ajx_data = geetest_ajax_user_cookie(gt, challenge, golable_cookie, golable_w2)         # GeeTestAjaxUser cookie  验证w2
print('ajx_data', ajx_data)
r_cookie = ajx_data['ajx_data']

# sys.exit()

# ---------------------------------------------------------
# gt, challenge = '019924a82c70bb123aae90d483087f94', '2cdd110952f2998bfc82cfb5d1d83853'
# golable_cookie = "GeeTestUser=ed1a10455aac78cc4da588377f4a3a6; GeeTestAjaxUser=f6715e8909002b8bc6ded7da79972f6"
golable_cookie += r_cookie
print('golable_cookie', golable_cookie)
get_data = geetest_get_php(gt, challenge, golable_cookie)
print("get_php get_data", get_data)           # 拿参数
sys.exit()

# -----------------------------------------------------------------
golable_w3 = "NnbdXKyqzHIwQUbvgAgUg8y6JjhHiN5ZXRfEr)ebBKkzAKnKeBHOMYCr2Jlb00A3uu7nyfNhoDF986v7PciOIveVzkE8ZGEzehnpkQBYyRCb(xS9qIx1T1iBLBzMYBqvK7pTuOEvGahrraySMWQyStOrWGHcW(Uico7hTsmMXVk5B5wSJ4)N2RA6xJ)F9qEidDma4qhXm7Hh3T2XkGRSpv9PQQ5fqEh32dloZx0q1PNlm8)8Kt28od6i8hkc0DSSm8gYhtDSiqqUsGxgiVueP6H6kyHhPc)((cbz8TcPHvMWqhV7qdouf(YFxcnVS71mDLfkLs3d9R6nISa1cBlsWVr0ZgKEE(vDEOZ552msoUL8kX0G9cO604M703lzRm4tVsjg11p2XPKpQQ78xtKHoo5UWlkNQfwJ8ricb(wF)SCvzCv7YyQCfAUJrb8K5oKgh5yqr5fCupdzPkC(nv)LwuS4NSsa5DN73NbM1x9BVDrQhf2jABMEZBxMrSt25AxNNhOQqIm(wHRDCluZfRX31GoRyC4Tsm6H1m8v(phOnUuMhfHp2kMX5JVfoa(nberktDbC4K59grJfg1)3hfwWRwqPXDbdaOoT2h6uPKKYxcGp)tPQcAxYE6NDDpFPCx0arOpiSopPiiJq1p7aP1aQow5HIkaii5zGG)wo5XgpC25N6VtrK7ly5vIpNqHIdC3TojJ8iQqnGb9H4Kym0PUiXsviGxpIiICp8GXNYHcJTREjkQckIxM8Tr1raZXyIHP1MLmfBQLeMB7fvxw5VJvVZVwqj1)eySd(byAte9AlaQIxthNbTJUY03dybSyjAeosbv3aP3GlbiIz06K3oM4A6QspoaLwQFmvDtGU02N3m)uSb)p05bLS7h57xDnuVQuY61c46e5ca9bae259f8eacb25ee90f20d99c6c375042e0f536126dfed9e3aeee2ad5caf05a172e0e53c703fae28548942edcb23a7167e7902c6b80ec8b6593aeee9843255eeb99be449f32e0dcb3df431449c9c78b9748d0c959f32477dd02d4f532637fbcdb249848507641709276b5e7271e610ea4945d383ced710cad63153"
ajx_data = geetest_ajax_user_cookie(gt, challenge, golable_cookie, golable_w3)         # GeeTestAjaxUser cookie
print('ajx_data', ajx_data)

"""
网站超时的提示     时间
geetest_1584454218931({"error": "not proof", "status": "error", "user_error": "网络不给力", "error_code": "error_21"})
"""