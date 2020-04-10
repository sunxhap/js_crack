# -*- coding: utf-8 -*-
# @Time: 2020/1/13 9:45


import json
import time
import requests
import os
import re
import sys
from datetime import datetime

requests.packages.urllib3.disable_warnings()
import random
import traceback

from flask import Flask, jsonify, request

from geetest_slide2_jilin import trace
from geetest_slide2_jilin.img_locate import ImgProcess
from geetest_slide2_jilin.encrypt import Encrypter
from geetest_slide2_jilin.slide_route import *
from geetest_slide2_jilin.request_test import *
from geetest_slide2_jilin.trance_moves import *

app = Flask(__name__)

img_path = os.path.abspath('./Captcha')


def get_captcha(url, proxies):
    """
    gt 4a28913077af48ca6eadebe01f3be4d2 challenge 33266e4e56a7441b711209e43a5efc42

    获取 gt， challenge
    :return:
    """
    # url = "http://211.141.74.200/api/Common/GetCaptcha?t={}".format(int(time.time() * 1000))
    for i in range(3):
        try:
            headers = {
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'zh-CN,zh;q=0.9',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3970.5 Safari/537.36',
                'X-Requested-With': 'XMLHttpRequest'
            }
            content = requests.get(url, headers=headers, verify=False, proxies=proxies)
            result = content.json()
            # print('result', result)
            if result['success'] == 1:
                # print('gt', result['gt'], 'challenge', result['challenge'])
                return result['gt'], result['challenge']
            else:
                print('error result', result)
        except:
            traceback.print_exc()
            print('get_captcha failure', i)


def geetest_get_type(gt, proxies):
    """
    获取网站cookie值
    <RequestsCookieJar[<Cookie GeeTestUser=82e3052d5f5ba3b12a27a0f5d375aa4d for api.geetest.com/>]>
    :param gt:
    :return:
    """
    for i in range(3):
        try:
            get_type_url = "http://api.geetest.com/gettype.php?gt={}".format(gt)
            headers = {'Host': 'api.geetest.com', 'Connection': 'keep-alive',
                       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3970.5 Safari/537.36',
                       'Accept': '*/*', 'Accept-Encoding': 'gzip, deflate',
                       'Accept-Language': 'zh-CN,zh;q=0.9'}
            result = requests.get(get_type_url, headers=headers, verify=False, proxies=proxies)
            geetest_user_cookie = result.headers['Set-Cookie']
            # print('cookie', geetest_user_cookie)
            return geetest_user_cookie
        except:
            print('geetest_get_type failure: ', i)


def geetest_get(gt, challenge, geetest_user_cookie, proxies):
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

    headers = {'Host': 'api.geetest.com', 'Connection': 'keep-alive',
               'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3970.5 Safari/537.36',
               'Accept': '*/*', 'Accept-Encoding': 'gzip, deflate',
               'Accept-Language': 'zh-CN,zh;q=0.9', 'cookie': geetest_user_cookie}

    for i in range(3):
        resp = requests.get(url, params=params, verify=False, headers=headers, proxies=proxies)
        try:
            initData = json.loads(resp.text.replace("{}(".format(params['callback']), "")[:-1])
            if 'fullbg' in initData:
                return initData
        except:
            traceback.print_exc()
            print('geetest_get failure', i)
        time.sleep(random.random())


def downloader_capture(initData, proxies):
    """
    下载图片
    :param initData:
    :return:
    """

    if not os.path.exists(img_path):
        os.mkdir(img_path)
    open(img_path + '\\' + "fullbg.jpg", "wb").write(
        requests.get("https://static.geetest.com/" + initData["fullbg"], verify=False, proxies=proxies).content)
    open(img_path + '\\' + "bg.jpg", "wb").write(
        requests.get("https://static.geetest.com/" + initData["bg"], verify=False, proxies=proxies).content)


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


def ajax_php_last(initData, distance, proxies):
    track = get_moves(distance)  # 轨迹
    # print('track', track)

    # params_python = get_params_by_python(initData, track)
    params = get_params_by_api(initData, track)
    # print('params', params)
    response = requests.get("https://api.geetest.com/ajax.php", params=params, proxies=proxies, verify=False)

    json_content = json.loads(response.text.replace('(', '').replace(')', ''))
    # print('ajax_php_last cookies', response.cookies)

    if json_content['message'] == 'success':

        # 成功轨迹写入文件
        with open('trace_slide.txt', 'a+') as f:
            f.write(json.dumps(track))
            f.write('\n')
            f.write('\n')

        json_content["challenge"] = initData['challenge']
        json_content["gt"] = initData['gt']
        return json_content
    else:
        print('failure: ', json_content)
        return False


def str_to_dict(headerStr):
    rdict = dict()
    if headerStr.strip():
        for headItem in headerStr.split("\n"):
            parm = headItem.split(":", 1)  # 切分2
            if parm[0].strip():
                rdict[parm[0].strip()] = headItem[(headItem.index(parm[0]) + parm[0].__len__() + 1):].strip()
    return rdict


def get_validate_by_website(url, proxy):
    # proxies = {"http": "http://" + proxy, "https": "https://" + proxy}
    proxies = {"http": "http://" + proxy}
    gt, challenge = get_captcha(url, proxies)

    geetest_user_cookie = geetest_get_type(gt, proxies)

    initData = geetest_get(gt, challenge, geetest_user_cookie, proxies)
    # print('initData', initData)

    downloader_capture(initData, proxies)

    distance = get_picture_distance()
    # print('distance', distance)

    data = ajax_php_last(initData, distance, proxies)       # forbidden
    # print('ajax_php_last', data)

    return data


@app.route('/geetest_slideV2', methods=["POST"])
def geetest_slideV2():
    message = ""
    data = dict()
    status = 1
    try:
        url = request.form['url']
        proxy = request.form['proxy']
        print('proxy: ', proxy, ' url: ', url, str(datetime.now()))
        data = get_validate_by_website(url, proxy)
        if not data:
            status = 2
            message = "request failure"
    except:
        traceback.print_exc()
        message = str(traceback.format_exc())
        status = 2
    finally:
        return jsonify({'status': status, 'message': message, 'data': data})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6081, threaded=True)  # threaded 多线程
