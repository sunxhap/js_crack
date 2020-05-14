# -*- coding: utf-8 -*-
# @Time: 2020/5/12 20:04


import mitmproxy.http
from mitmproxy import ctx


def response(flow: mitmproxy.http.HTTPFlow):
    # print(flow.request.content.decode())
    flow.response.content = flow.response.content.replace(
        "debugger".encode('utf-8'),
        "".encode('utf-8')
    )

    # for (var i = 1; i < 99999; i++)window.clearInterval(i);