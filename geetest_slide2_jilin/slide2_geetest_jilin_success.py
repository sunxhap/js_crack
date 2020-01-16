# -*- coding: utf-8 -*-
# @Time: 2020/1/13 9:45


import json
import time
import requests
import os
import re
import sys

requests.packages.urllib3.disable_warnings()
import random

from geetest_slide2_jilin import trace
from geetest_slide2_jilin.img_locate import ImgProcess
from geetest_slide2_jilin.encrypt import Encrypter
from geetest_slide2_jilin.slide_route import *
from geetest_slide2_jilin.request_test import *
from geetest_slide2_jilin.trance_moves import *

session = requests.session()


def get_captcha():
    """
    gt 4a28913077af48ca6eadebe01f3be4d2 challenge 33266e4e56a7441b711209e43a5efc42

    获取 gt， challenge
    :return:
    """
    # url = 'https://www.tianyancha.com/verify/geetest.xhtml'
    url = "http://211.141.74.200/api/Common/GetCaptcha?t={}".format(int(time.time() * 1000))
    # referer = 'https://www.tianyancha.com/vipintro/?jsid=SEM-360-PZ-SY-081001'
    headers = {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        # 'Origin': 'https://www.tianyancha.com',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Connection': 'keep-alive',
        # 'Content-Type': 'application/json; charset=UTF-8',
        'Referer': 'http://211.141.74.200/',
        'Host': '211.141.74.200',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3970.5 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest'
    }
    content = session.get(url, headers=headers, verify=False)
    result = content.json()
    # print('result', result)
    if result['success'] == 1:
        print('gt', result['gt'], 'challenge', result['challenge'])
        return result['gt'], result['challenge']
    else:
        print('error result', result)


def geetest_get_type(gt):
    """
    获取网站cookie值
    <RequestsCookieJar[<Cookie GeeTestUser=82e3052d5f5ba3b12a27a0f5d375aa4d for api.geetest.com/>]>
    :param gt:
    :return:
    """
    # get_type_url = "http://api.geetest.com/gettype.php?gt={}&callback=geetest_{}".format(gt, int(time.time() * 1000))
    get_type_url = "http://api.geetest.com/gettype.php?gt={}".format(gt)
    headers = {'Host': 'api.geetest.com', 'Connection': 'keep-alive',
               'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3970.5 Safari/537.36',
               'Accept': '*/*', 'Referer': 'http://211.141.74.200/', 'Accept-Encoding': 'gzip, deflate',
               'Accept-Language': 'zh-CN,zh;q=0.9'}

    result = session.get(get_type_url, headers=headers, verify=False)
    print(result.cookies)


def geetest_get(gt, challenge):
    """
    获取下载的图片
    :param gt:
    :param challenge:
    :return:
    """
    url = "http://api.geetest.com/get.php?"
    params = {"gt": gt,
         "challenge": challenge,
         "product": "popup",
         "offline": "false",
         "protocol": "http://",
         "beeline": "/static/js/beeline.1.0.1.js",
         "voice": "/static/js/voice.1.2.0.js",
         "maze": "/static/js/maze.1.0.1.js",
         "pencil": "/static/js/pencil.1.0.3.js",
         "type": "slide",
         "path": "/static/js/geetest.6.0.9.js",
         "callback": "geetest_{}".format(int(time.time() * 1000))}

    # headers = {'Host': 'api.geetest.com', 'Connection': 'keep-alive',
    #            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3970.5 Safari/537.36',
    #            'Accept': '*/*', 'Referer': 'http://211.141.74.200/', 'Accept-Encoding': 'gzip, deflate',
    #            'Accept-Language': 'zh-CN,zh;q=0.9'}

    num = 0
    while num <= 5:
        resp = session.get(url, params=params, verify=False)
        initData = json.loads(resp.text.replace("{}(".format(params['callback']), "")[:-1])
        if 'fullbg' in initData:
            return initData
        num += 1
        # print('The {} time initialization failed! '.format(num))
        time.sleep(random.random())


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


def get_params_by_python(initData, track):
    # track = trace.choice_track(distance)
    # track = get_moves(distance)  # 轨迹
    userresponse, aa = get_userresponse_a(initData, track)
    passtime = track[-1][-1]  # 轨迹滑动事件
    time.sleep(2)
    ep = Encrypter()
    print('initData', initData)
    print('userresponse', userresponse)
    print('passtime', passtime)
    print('aa', aa)

    params = ep.encrypted_request(initData, userresponse, passtime, aa)
    print('params', params)
    return params


def get_params_by_api(initData, track):
    track = json.dumps(track)  # 轨迹
    vob_params = json.dumps(initData)
    body = {"vob_params": vob_params, 'track': track}
    # body = {"gt": initData["gt"], "challenge": initData["challenge"], 'distance': distance, 'track': track}
    content = api_geetest_get_params(body)
    return json.loads(content)["params"]


def ajax_php_last(initData, distance):
    track = get_moves(distance)  # 轨迹
    print('track', track)

    # params_python = get_params_by_python(initData, track)
    params = get_params_by_api(initData, track)
    print('params', params)
    response = session.get("https://api.geetest.com/ajax.php", params=params, verify=False)

    json_content = json.loads(response.text.replace('(', '').replace(')', ''))
    print('ajax_php_last cookies', response.cookies)

    if json_content['message'] == 'success':

        # 成功轨迹写入文件
        with open('trace_slide.txt', 'a+') as f:
            f.write(json.dumps(track))
            f.write('\n')
            f.write('\n')

        return {
            'challenge': initData['challenge'],
            'data': json_content
        }
    elif 'geetest' in response.text:
        # print(response.text)
        text = re.sub("geetest_\d*\(", "", response.text)
        return {
            'challenge': initData['challenge'],
            'data': json.loads(text[:-1])
        }
    else:
        return {
            'challenge': initData['challenge'],
            'data': json.loads(response.text[1:-1])
        }


def str_to_dict(headerStr):
    rdict = dict()
    if headerStr.strip():
        for headItem in headerStr.split("\n"):
            parm = headItem.split(":", 1)  # 切分2
            if parm[0].strip():
                rdict[parm[0].strip()] = headItem[(headItem.index(parm[0]) + parm[0].__len__() + 1):].strip()
            # rdict[parm[0].strip()] = parm[1].strip()
    return rdict


def search_data(search_url):
    s_headers = str_to_dict("""Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
                Accept-Encoding: gzip, deflate
                Accept-Language: zh-CN,zh;q=0.9
                Host: 211.141.74.200
                Proxy-Connection: keep-alive
                Upgrade-Insecure-Requests: 1
                User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3970.5 Safari/537.36""")
    response = session.get(search_url, headers=s_headers, verify=False)
    print('search_data cookies', response.cookies)
    return response.text


Referer = 'http://211.141.74.200/'
gt, challenge = get_captcha()

geetest_get_type(gt)

# challenge = "33266e4e56a7441b711209e43a5efc42"
initData = geetest_get(gt, challenge)
print('initData', initData)

challenge = initData["challenge"]

img_path = os.path.abspath('./Captcha')

downloader_capture(initData)

distance = get_picture_distance()
print('distance', distance)

data = ajax_php_last(initData, distance)
print('ajax_php_last', data)


# 吉林 一个只能搜一次
validate = data["data"]["validate"]
key = 'a'
search_url = "http://211.141.74.200/api/common/Search/{}/undefined/{}/{}/{}%7Cjordan".format(key, challenge, validate, validate)
text = search_data(search_url)
print('content', text)
# http://211.141.74.200/api/common/Search/a/undefined/1d5e2b40c8edbafd855e55fbd609c0bbl0/8bbaf164196232ac87ef1b6e84d41fb9/8bbaf164196232ac87ef1b6e84d41fb9%7Cjordan
