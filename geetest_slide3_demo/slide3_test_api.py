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
# register_url = "https://www.geetest.com/demo/gt/register-slide"
# gt, challenge = get_gt_and_challenge(register_url)
# print('gt: ', gt, ';challenge: ', challenge)
# #
# # # step2
# geetest_user_data = geetest_get_type(gt)  # 获取 GeeTestUser cookie
# print(geetest_user_data)
# sys.exit()

# ------------------------------------------------------
# gt, challenge = '019924a82c70bb123aae90d483087f94', '2cdd110952f2998bfc82cfb5d1d83853'
# golable_cookie = "GeeTestUser=ed1a10455aac78cc4da588377f4a3a6"
# # # 测试第一个w 可用
# golable_w1 = "U)Lc4hrsS8w5O4wV)tvsHRbNr)TjOYEjTG(EfyAlR8VDKuzgkaIkYLjeYCGYsiIThiMVM9l4m7M4zoj0Y8acuj59cpCFfQES)pmpQAr3kxSqcillz1D(hbWc(Rh9u4mV)wWNvr8JNE6WvQdwJFDKKiWcMX3Ep9EvNUbrO8xzM8M1ROkBFCdSN(TdGMiLuCKjZcZh5DrX8ui3Q7y7HG1XPlQP0CKpciGDSi5hJuUTec4wr28KMPYOGuh2jfss0kDOoz7yjiSfWTofM2kERBsXqnHnakLNnMGZa42w59rVpAuG1YrTQdTSH2orcY0CgHmZHvCllLQ)lSJWaQA72Ct4xbZF89etOQce9UhuN6axoYBYJlq5EGlMaSf4rRMVd2QAAKgfeo5NF4YK0IiQzZ8HKxJkfNCPdwCddg)i1RqAgJerz3FuBOHa9d(z)B(4aEGbocY2WfVIRr97mYtxxeH5ASXnjQ4i8yEyt6W56a(pIGkU)gVxaSHenlH5JtWp4JOfQ4v9tmUAcgcEnUyZUIQC1vXV0IXdBejL(UhMI0BfvjTZ57vXIpf5InJK5Raggw0q8xGh5U(L5cHw8SVyh2ATln(2fuA(cTpoWfC9B5ctyL1Zhc5t4xZhrtGAEjb8Qkclb35iM10zs)JDAUL0xTEyzVkpAWO2MBXsglMqRojXXYTYKvCXAq17LpHQ93FeNw6toDoCixkT)i4rZ(fL0(g0J6EHyElWZzJ2U)F8Snx77gSGQfUP5IwpD0k1wNesJiMzNJKJYduIQ8o2W99xWsFayPBVr545f(z3FgKRsfXImhYu5(co(d5hoOVHDFSHRUR8Pvxlp0ov(ghXfKNMhQ8KBnCah2bb41qYh3ukeY0(96)pINedXuVmv9tbidWbOA1CoKhuHKqPl3XmNQQVfSFMHA3WrgYwuCl3U7feV8wQ9JYsNJMWIdQJdKGTqI8azRDGriBEnzRyabhD9cBgQMzfuwdrthY9EISO2RBX8C7K5cDd8WiugucJx809AHq)9VO4cX)7Mt9mk2s0I22xeKtJui(15gq8Xjr0)2DOwKMRDvsn(HNx(S2CdFMfAwxxZySas)4kR8nscT923sde(T4VQEGGCd8i8Gafc8KiZW0TdFICQAW1JtfQi(6ZP(rV4KL8wIyNDuXy8gq)C5Bjbs(EL2fASI(VpB7C9P)ippPOvmoTWxtA8Fd(hOQtV5SLskh0ZVc7DgLBCGi4)QxZh9BXTKaPMrO5ICRjfDZs7(BX88UEhWkho4GIsGUJS3(tx3SS8dgmHXEJD1w)vv78PLdu09EDbT9GfcbADKk9HEJ3gZachqQ(EtLTe9jt(CvIvKv)vzxUrksYESTGYKTLtJW6Q2)YZtNxM2gmCjMZShup6Di6atpzGEcdnm1DddmKBy(1xkwerF4hSI7mG5Q9rfQqaMcEmkoCNLUovIMHtjtShGaJ7TxRQBJaGglstbu1wK(PmrC2sHngUuaDIELZl4(gn6KwX8ojjRmGiKroXolmBcXUTmlgb1EOHRoe8uZ((zqvswI0JMzqtU5lzHPcObbpURnYuJ3ti5zOHtIsloUYIbCrrDMLF2YrObGhIHxrycWJzybmstRB1BH(CDC0Ce7kQuUdORkixJsPN2dcjViY94jzgLAQmm1JHNwMU2NAynpH5dw)6llxiZQ7hty87wjAoYU8fNUTUbKP6ZQQiEyfd(G75ep(XylkVXyMNSHRcDq06GVEWmEDJQ0ge5hPGta5q(EafXuMXEw3V0EVqVtn2nDoc0GwgTCvuVD66XTngkds((FG8mcvMQhLFLH4qvaz6i8MCHwHNhO)0RwsiUqnv69kAXFbGmGKAkh9)jmtBkjbe2A1I)7S0m9Io7V9mrQq2xj8vLoohTP30V(Xx2yO4bn0a)(gyMgW28ohAZU4ek2lPKgY2BRhL9kC0YEKb3JfbZhQFgsfsCN41)Bh7WO9BrhH2DFD004ceQim195U6ebfO6EuWEa)n1VGG4vOMgZdxyoc(IPRhxjhlxXK9xGiW72(CoMDdymnEJ3Ju5RZNV)xffALNPnALiGsGGA7tBBPH)qIuCqivNVObqd41hEq7gzWFRFwTpN5m5WUmVdUEI)mMeVVOxNwuKcjGeRDlGatwC8wMePeIRxOIapm4v((UI4Vh)4fDm98W5Ul4o)chUUfde5YXBYjoZBJLlFXKgIVmnfgc9pYvSP8irVG)i5WExeWE2xuY9Jo8bxd3kpeps4Axo6Z7bFCVrR20ODco0zA)2Uzl)DSU3VQnZKOlXVjzbCap8bGAFlT9qzCK9m0qj8jO6u2eLIpoP7Z)tg6oiHuOXY(QEl58MFVwLixkhkI0RmM6BBlIJpfZZzDuCcmf9Lw99acvSJU8i0T4)2LuhaozlkGBUQpO2GqlloKa4ag(4Ra)yerjvQK(WDlPe3wDq)crg0(MId0KRwe0moj4BY1PgELdmcDX7mC7mKrXP6o0JfvwW0xnAUtSSvNapxGcfQNe8EC(MSMGAyDW7KU29S2(Y0D8D)QC9JHi9SGGoA5lo8.45c2a34b530a936f1e31e62f4d068ae01f0fe866f92f5ca515c240e8eb5636ebd29333d2893cb295cc1f8e054799efbe6301dcd66f4a62669a4883874da21efd30d837f2066f931ea2a5c96755113916c4425ab24645f5fb2833d400a9e94c14128b7d56c27425377609e947e7d0d317944b32ab369d5b7d8fb02e3a6a4c1b6f"
# #
# # # step3
# # golable_cookie = geetest_user_data["cookie"]
# print('golable_cookie', golable_cookie)
# initData = geetest_get_params(gt, challenge, golable_cookie, golable_w1)        # 第一次获取c,s
# print("initData: ", initData)
# sys.exit()

# time.sleep(1)   w2 request
# gt, challenge = '019924a82c70bb123aae90d483087f94', '2cdd110952f2998bfc82cfb5d1d83853'
# golable_cookie = "GeeTestUser=ed1a10455aac78cc4da588377f4a3a6"
#
# step4
# golable_w2 = "sYuepN(PctTiPEENqViMqywah4DScdX1ef46Z)5qc5E1fwBAlFi0G9IJMds8Epedc1Wq8eqV)a4adEGM)sxsMARrEmKGqzFdFi2nJMlh)WQfq)PV6PSvrwxMezFkry2fbkHKz7JyC5EOKJ7nKFA80IaS3EdtfDQ)usfnLNxLLN2aya9jHQbltJaveiAIrvB6AWe0CoiY465qPLZwkU87xV)0AFrkXshXOWCyBAI1l6GlE0BBu267qJBsy8)IK7jshpERSBeUQhbgQHlhzRZk4W1Bo5VolcrDESDtl)1GRhs8SWyXwH8T470d(n7tsl3KL5bOC7t2YVpB80yLxi(4UKftuYgbsdp1enou)bhmtNs2VHcLhvhntoa3rBfqQ4o2xnu(uMZAZkDKGbT2E9i0llp5i0p8RLyFfjiZ3HWPgYDR435ZSE4epf8gRSbj9Su3f(dY01NK0JXXG1DpxsYuVCicz7FQkjqg8B78pNOHL2MTzpHA0hY83pPzqOcKhg6NbJnwALGYZ0gkGQT9XjmaFTAJf8Jl)7lddENfskC1P12Dk(Gr5(hdQEEIh5r9SQOP1zJg7212Ht1Ldh7EbAcAJwp5NggCkarnUuGjvxMar4oPX2QNPNyiVKTRrnU9V4OWLQcmBlBDK)frAmuMqr7FjRC05IlnkvoaoHBPjsGBrscXFU1MXtnoYr2CY9JE1igutZ52TIdrMCww3OHrbt2qPj7GxSonZRUY7oEtX3xQAyn9RyVMR63JrAipn1j94fgJ(wQpLsCSX1bQDeIwoE13dpriv8oXPap8U)vwN9XD3afrcGpKDQLk1rhijtXwO6nspD7lYB39x8FoGHkusRuDuNfrkMZb58YPdaSPzr9Whz7ndm7NUegO8Rtcp2Vfdmbeumd)rqsHOAuU17dE5I50Zbn(W13Cr4r6TX)P5Og3lL6z3vim50OWUj5SBIw7gfxZpmBiAOHr744XF7jnufduOVKLpJOYUQcJYKkaOv7zHYslcIe0svigw052Txhb3zvKFrqGpIOFqo7LnVrbTljckfE0JkuYTqKiyeHIB0SQ6E4F3xCsSu4gz2gowAoPz12ow(bo68u0LDwyzIyVCCu47CovN2bCFIBhlVSFgpZEa7OBvl(CqpYaPDLhCJrmI3WNGVacvJ7zllDCdqJ6zN7rLSJdj2h13xgv6JL0nJHLLRb(cMa(lnr69(BnNwApjMH7mQY076Emxo0Wt5IutRUyYKiVoPcQ748tYH1xa5OGf9PeBdobuKoBP4Bv(FIt6hBzsRUROdj98w5HSfdcQFXqbeMfTwfVW(i0gnAQpQCwU7KjC(4S(knuj4UyoOLeeft7T9XpZq7lfOCYQmlMXlFdcnA00KHd2P3FTvfWS2IhU70hm3K2MLyji(jUeMJoPrjJ"
# ajx_data = geetest_ajax_user_cookie(gt, challenge, golable_cookie, golable_w2)         # GeeTestAjaxUser cookie  验证w2
# print('ajx_data', ajx_data)
# sys.exit()

# ---------------------------------------------------------
gt, challenge = '019924a82c70bb123aae90d483087f94', '2cdd110952f2998bfc82cfb5d1d83853'
golable_cookie = "GeeTestUser=ed1a10455aac78cc4da588377f4a3a6; GeeTestAjaxUser=f6715e8909002b8bc6ded7da79972f6"
# print('golable_cookie', golable_cookie)
# get_data = geetest_get_php(gt, challenge, golable_cookie)
# print("get_php get_data", get_data)           # 拿参数
# sys.exit()

# -----------------------------------------------------------------
golable_w3 = "NnbdXKyqzHIwQUbvgAgUg8y6JjhHiN5ZXRfEr)ebBKkzAKnKeBHOMYCr2Jlb00A3uu7nyfNhoDF986v7PciOIveVzkE8ZGEzehnpkQBYyRCb(xS9qIx1T1iBLBzMYBqvK7pTuOEvGahrraySMWQyStOrWGHcW(Uico7hTsmMXVk5B5wSJ4)N2RA6xJ)F9qEidDma4qhXm7Hh3T2XkGRSpv9PQQ5fqEh32dloZx0q1PNlm8)8Kt28od6i8hkc0DSSm8gYhtDSiqqUsGxgiVueP6H6kyHhPc)((cbz8TcPHvMWqhV7qdouf(YFxcnVS71mDLfkLs3d9R6nISa1cBlsWVr0ZgKEE(vDEOZ552msoUL8kX0G9cO604M703lzRm4tVsjg11p2XPKpQQ78xtKHoo5UWlkNQfwJ8ricb(wF)SCvzCv7YyQCfAUJrb8K5oKgh5yqr5fCupdzPkC(nv)LwuS4NSsa5DN73NbM1x9BVDrQhf2jABMEZBxMrSt25AxNNhOQqIm(wHRDCluZfRX31GoRyC4Tsm6H1m8v(phOnUuMhfHp2kMX5JVfoa(nberktDbC4K59grJfg1)3hfwWRwqPXDbdaOoT2h6uPKKYxcGp)tPQcAxYE6NDDpFPCx0arOpiSopPiiJq1p7aP1aQow5HIkaii5zGG)wo5XgpC25N6VtrK7ly5vIpNqHIdC3TojJ8iQqnGb9H4Kym0PUiXsviGxpIiICp8GXNYHcJTREjkQckIxM8Tr1raZXyIHP1MLmfBQLeMB7fvxw5VJvVZVwqj1)eySd(byAte9AlaQIxthNbTJUY03dybSyjAeosbv3aP3GlbiIz06K3oM4A6QspoaLwQFmvDtGU02N3m)uSb)p05bLS7h57xDnuVQuY61c46e5ca9bae259f8eacb25ee90f20d99c6c375042e0f536126dfed9e3aeee2ad5caf05a172e0e53c703fae28548942edcb23a7167e7902c6b80ec8b6593aeee9843255eeb99be449f32e0dcb3df431449c9c78b9748d0c959f32477dd02d4f532637fbcdb249848507641709276b5e7271e610ea4945d383ced710cad63153"
ajx_data = geetest_ajax_user_cookie(gt, challenge, golable_cookie, golable_w3)         # GeeTestAjaxUser cookie
print('ajx_data', ajx_data)

"""
网站超时的提示     时间
geetest_1584454218931({"error": "not proof", "status": "error", "user_error": "网络不给力", "error_code": "error_21"})
"""