# -*- coding: utf-8 -*-
# @Time: 2020/3/10 15:26


import requests
import os

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
from geetest_slide3_demo.img_locate import ImgProcess
from geetest_slide3_demo.util_trance import *


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
        print('get_gt_and_challenge', url)
        headers = {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'User-Agent': user_agent, 'Referer': Referer,
            'X-Requested-With': 'XMLHttpRequest',
            # 'Cookie': 'JSESSIONID=88799D7FEF5817124DD04EE5E2062F41; userCookie=cf2b9f04-84dd-46af-2b56-155ed4ebac1f'
        }
        res = requests.get(url, headers=headers, verify=False, proxies=proxies)
        result = res.json()
        return result
        # if result['success'] == 1:
        #     return result['gt'], result['challenge']
        # else:
        #     print('error result', result)
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
    # for i in range(3):
    try:
        params = {"gt": gt,
                  "callback": "geetest_{}".format(int(time.time() * 1000))
                  }
        get_type_url = "http://api.geetest.com/gettype.php?"
        send_url = get_type_url + urlencode(params)
        headers = {'Host': 'api.geetest.com', 'Connection': 'keep-alive',
                   'User-Agent': user_agent, 'Referer': Referer,
                   'Accept': '*/*', 'Accept-Encoding': 'gzip, deflate',
                   'Accept-Language': 'zh-CN,zh;q=0.9'}
        # res = requests.get(send_url, params=params, headers=headers, verify=False, proxies=proxies)
        res = requests.get(send_url, headers=headers, verify=False, proxies=proxies)
        res_json = json.loads(res.text.replace("{}(".format(params['callback']), "")[:-1])
        return {"cookie": get_requests_cookie(res), "get_type_data": res_json["data"]}
    except:
        print('geetest_get_type failure: ', i)
            # traceback.print_exc()


def geetest_get_params(gt, challenge, cookie, request_w):
    """
        获取下载的图片
        :param gt:
        :param challenge:
        :return:
        """
    url = "http://api.geetest.com/get.php?"
    params = {"gt": gt, "challenge": challenge, "lang": "zh-cn", "pt": "0",
              "w": request_w, "callback": "geetest_{}".format(int(time.time() * 1000) + 5)
              }
    headers = {'Host': 'api.geetest.com',
               # 'Connection': 'keep-alive',
               'User-Agent': user_agent, 'Referer': Referer,
               'Accept': '*/*', 'Accept-Encoding': 'gzip, deflate',
               'Accept-Language': 'zh-CN,zh;q=0.9', 'Cookie': cookie}

    # for i in range(3):
    resp = requests.get(url, params=params, verify=False, headers=headers, proxies=proxies)
    try:
        text = resp.text
        res_json = json.loads(text.replace("{}(".format(params['callback']), "")[:-1])
        return res_json
        # if 'data' in res_json:
        #     # return {"cookie": get_requests_cookie(resp), "get_type_data": text}
        #     return {"cookie": get_requests_cookie(resp), "get_type_data": res_json["data"]}
        # else:
        #     print('initData :', res_json)
    except:
        traceback.print_exc()
        print('geetest_get_params failure', i)
        # time.sleep(random.random())


def geetest_ajax_user_cookie(gt, challenge, cookie, golable_w1):
    url = "https://api.geetest.com/ajax.php?"
    params = {"gt": gt, "challenge": challenge, "lang": "zh-cn", "pt": "0",
              "w": golable_w1, "callback": "geetest_{}".format(int(time.time() * 1000))
              }
    headers = {'Host': 'api.geetest.com',
               # 'Connection': 'keep-alive',
               'User-Agent': user_agent, 'Referer': Referer,
               'Accept': '*/*', 'Accept-Encoding': 'gzip, deflate',
               # 'Accept-Language': 'zh-CN,zh;q=0.9',
               'Cookie': cookie}

    # for i in range(3):
    send_url = url + urlencode(params)
    resp = requests.get(send_url, verify=False, headers=headers, proxies=proxies)
    try:
        res_json = json.loads(resp.text.replace("{}(".format(params['callback']), "")[:-1])
        # if 'data' in res_json:
        return {"r_cookie": get_requests_cookie(resp), "get_type_data": res_json}
        # else:
        #     print('initData :', res_json)
    except:
        # traceback.print_exc()
        print(resp.content)
        print('geetest_get_params failure', i)
        # time.sleep(random.random())


def geetest_get_php(gt, challenge, cookie):
    url = "https://api.geetest.com/get.php?"
    params = {"is_next": "true", "type": "slide3", "gt": gt,
              "challenge": challenge, "lang": "zh-cn",
              "https": "false",             # ????
              "protocol": "https://",
              "offline": "false", "product": "embed", "api_server": "api.geetest.com", "isPC": "true", "width": "100%",
              "callback": "geetest_{}".format(int(time.time() * 1000) + 5)}

    headers = {'Host': 'api.geetest.com',
               # 'Connection': 'keep-alive',
               'User-Agent': user_agent,
               'Accept': '*/*', 'Accept-Encoding': 'gzip, deflate, br',
               # 'Accept-Language': 'zh-CN,zh;q=0.9',
               'Cookie': cookie}

    # for i in range(3):
    send_url = url + urlencode(params)
    # print(send_url)
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
        # time.sleep(random.random())


def downloader_capture(initData):
    """
    下载图片
    :param initData:
    :return:
    """
    img_path = os.path.abspath('./Captcha')
    if not os.path.exists(img_path):
        os.mkdir(img_path)
    open(img_path + '\\' + "fullbg.jpg", "wb").write(
        requests.get("https://static.geetest.com/" + initData["fullbg"], verify=False).content)
    open(img_path + '\\' + "bg.jpg", "wb").write(
        requests.get("https://static.geetest.com/" + initData["bg"], verify=False).content)


def get_picture_distance():
    """
    计算距离
    :return:
    """
    img_process = ImgProcess()
    img1 = img_process.get_merge_image(img_path + '\\' + 'fullbg.jpg')
    img2 = img_process.get_merge_image(img_path + '\\' + 'bg.jpg')
    # os.remove(img_path + '\\' + "fullbg.jpg")
    # os.remove(img_path + '\\' + "bg.jpg")
    distance = int(img_process.get_gap(img1, img2) - 7)
    return distance


def get_proxy():
    global proxy_list
    if not proxy_list:
        # proxy_url = 'http://10.0.0.252:8899/api/Values?type=VPS&count=10'
        for i in range(10):
            proxy_url = "http://10.0.0.252:8899/api/Values?type=WD&count=5"
            try:
                proxy_res = requests.get(proxy_url)
                if proxy_res.status_code == 200:
                    proxy_list = proxy_res.text.split("\r\n")
                    break
            except:
                pass

    proxy_one = proxy_list[0]
    proxy_list.remove(proxy_one)
    # {"http": "http://223.244.160.116:3617", "https": "https://223.244.160.116:3617"}
    return {"http": "http://{}".format(proxy_one), "https": "https://{}".format(proxy_one)}
    # return {"http": "http://{}".format(proxy_one)}


proxy_list = list()

all_count = 0
success_count = 0
failure_count = 0
proxy_failure_count = 0
pass_rate = 0

user_agent = "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
# proxies = ""

# while 1:
for i in range(1):
    # proxies = get_proxy()
    proxies = ""
    print('proxies', proxies)

    try:
        # step1
        # register_url = "https://www.geetest.com/demo/gt/register-slide"
        # register_url = "https://www.geetest.com/demo/gt/register-slide-official"
        # Referer = "https://www.geetest.com/Sensebot"
        # register_url = 'https://ss.cods.org.cn/gc/geetest/login'
        # Referer = "https://ss.cods.org.cn/isearch"

        register_url = "https://passport.bilibili.com/web/captcha/combine?plat=6"
        Referer = "https://passport.bilibili.com/login"

        result_login = get_gt_and_challenge(register_url)
        gt = result_login['data']['result']['gt']
        challenge = result_login['data']['result']['challenge']
        print('gt: ', gt, ';challenge: ', challenge)

        # step2
        geetest_user_data = geetest_get_type(gt)  # 获取 GeeTestUser cookie

        golable_cookie = geetest_user_data['cookie']

        # ------------------------------------------------------
        w1_data = json.loads(api_geetest_get_w1(gt, challenge))
        golable_w1 = w1_data['w']
        aeskey = w1_data['aeskey']
        # ------------------------------------------------------

        # step3
        initData = geetest_get_params(gt, challenge, golable_cookie, golable_w1)  # 第一次获取c,s
        # print("w1 initData: ", initData['get_type_data'])

        # ------------------------------------------------------
        param_c = initData['c']
        param_s = initData['s']
        w2_data = json.loads(api_geetest_get_w2(aeskey, gt, challenge, param_c, param_s))
        golable_w2 = w2_data['w']
        # ------------------------------------------------------

        # step4
        ajx_data = geetest_ajax_user_cookie(gt, challenge, golable_cookie, golable_w2)  # GeeTestAjaxUser cookie  验证w2
        # print('w2 ajx_data', ajx_data)
        r_cookie = ajx_data['r_cookie']
        # print(ajx_data)

        golable_cookie += "; " + r_cookie
        # print('golable_cookie', golable_cookie)
        get_data = geetest_get_php(gt, challenge, golable_cookie)
        # print("get_php get_data", get_data['get_type_data'])  # 拿参数

        # -----------------------------------------------------------------
        img_path = os.path.abspath('./Captcha')
        # print(get_data['get_type_data'])
        downloader_capture(get_data['get_type_data'])

        distance = get_picture_distance()
        # print('distance', distance)

        # -----------------------------------------------------------------
        challenge = get_data['get_type_data']['challenge']      # 注意 challenge
        global_c = get_data['get_type_data']['c']
        global_s = get_data['get_type_data']['s']

        # for i in range(3):
        slide_xy = get_moves(distance)
        slide_time = slide_xy[-1][-1]
        # print(slide_xy)
        # print('slide_time', slide_time)
        w3_data = json.loads(api_geetest_get_w3(gt, challenge, global_c, global_s, slide_xy, distance, slide_time))
        golable_w3 = w3_data['w']
        # -----------------------------------------------------------------
        ajx_data = geetest_ajax_user_cookie(gt, challenge, golable_cookie, golable_w3)

        if ajx_data['get_type_data']['success'] == 1:
            with open('trace_slide.txt', 'a+') as f:
                f.write(json.dumps(slide_xy))
                f.write('\n')
                f.write('\n')
            success_count += 1
            # print('success proxies: ', proxies, ' try count: ', 1, ajx_data['get_type_data'])
            print('success proxies: ', proxies, ajx_data['get_type_data'])
            # break
        else:
            print('failure proxies: ', proxies, ' ajx_data: ', ajx_data)
            failure_count += 1

            time.sleep(1)
    except:
        traceback.print_exc()
        print('exception proxies', proxies)
        proxy_failure_count += 1

    all_count += 1
    pass_rate = float(success_count)/(all_count-proxy_failure_count) if success_count else 1
    print("all_count: {}; success_count: {}; failure_count: {}; proxy_failure_count: {}; pass_rate success_count/(all_count-proxy_failure_count): {}".format(all_count, success_count, failure_count, proxy_failure_count, pass_rate))
    print('-'*20 + "华丽分割线" + '-'*20)

    time.sleep(1)
