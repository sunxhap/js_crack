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


with open('index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

with open('index_hotels.html', 'r', encoding='utf-8') as f:
    index_hotels_html = f.read()

content = """
<meta content="all" name="robots" />
    <script type="text/javascript">
        var code = function(){
            var org = document.cookie.__lookupSetter__('cookie');
            document.__defineSetter__("cookie",function(cookie){
                if(cookie.indexOf('80T')>-1){
                    debugger;
                }
                org = cookie;
            });
            document.__defineGetter__("cookie",function(){return org;});
        }
        var script = document.createElement('script');
        script.textContent = '(' + code + ')()';
        (document.head||document.documentElement).appendChild(script);
        script.parentNode.removeChild(script);
    </script>
"""


def response(flow: mitmproxy.http.HTTPFlow):

    # print(flow.request.url)
    # if 'slide.7.7.0' in flow.request.url:
    #     print(flow.request.url)
    #     flow.response.set_text(slidejs)

    # if 'cstaticdun.126.net/2.13.6/core.v2.13.6.min.js' in flow.request.url:
    #     print(flow.request.url)
    #     flow.response.set_text(content_js)
    #
    # if 'watchman.min.js' in flow.request.url:
    #     print(flow.request.url)
    #     flow.response.set_text(watchman_js)

    if 'wenshu/181217BMTKHNT2W0/' in flow.request.url:
        # print(flow.request.url)
        # text = flow.response.text
        # text = text.replace('<meta http-equiv="Content-Type" content="text/html; charset=utf-8">', content)
        flow.response.set_text(index_html)

    if '/hotel/beijing1' in flow.request.url:
        print(flow.request.url)
        # text = flow.response.text
        # text = text.replace('<meta content="all" name="robots" />', content)
        flow.response.set_text(index_hotels_html)

    # text = flow.response.text
    # text = text.replace('debugger', 'console.log("debugger")')
    # flow.response.set_text(text)
