# -*- coding: utf-8 -*-
# @Time: 2020/1/22 10:52


import mitmproxy.http
from mitmproxy import ctx


# def request(flow: mitmproxy.http.HTTPFlow):
#     global num
#     num = num + 1
#     ctx.log.info("We've seen %d flows" % num)

# with open('slide.7.7.0_old.js', 'r') as f:
#     slidejs = f.read()

with open('old_core.js', 'r', encoding='utf-8') as f:
    content_js = f.read()

with open('old_watchman.js', 'r', encoding='utf-8') as f:
    watchman_js = f.read()


def response(flow: mitmproxy.http.HTTPFlow):

    # print(flow.request.url)
    # if 'slide.7.7.0' in flow.request.url:
    #     print(flow.request.url)
    #     flow.response.set_text(slidejs)

    if 'cstaticdun.126.net/2.13.6/core.v2.13.6.min.js' in flow.request.url:
        print(flow.request.url)
        flow.response.set_text(content_js)

    if 'watchman.min.js' in flow.request.url:
        print(flow.request.url)
        flow.response.set_text(watchman_js)

    # text = flow.response.text
    # text = text.replace('debugger', 'console.log("debugger")')
    # flow.response.set_text(text)
