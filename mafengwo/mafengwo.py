# -*- coding: utf-8 -*-


import requests
import re
import execjs


def changeJsRunTimeCodeAndGetClearance(content):
    # print(content)
    insertJsCode = """
    .replace(/^[\w\W]+__jsl_clearance=/, '')
    .replace(/\+';Expires=[\w\W]+$/, '')
    """
    evalJsCode = content.replace('("_"+y)})', '("_"+y)})' + insertJsCode)
    # 这里本来是要eval下这个js字符串的，但我们这里是返回了这个js字符串
    evalJsCode = evalJsCode.replace("<script>", "").replace(
        "eval(y.replace(/", "return (y.replace(/"
    )
    # print(evalJsCode)
    # # 这里先找到</script>的位置，是为了把</script>后面的字符串全部清除掉
    index = evalJsCode.index("</script>")
    # # 记得要定义一下window对象。
    documentCode = """
        var document = {
        createElement: function(tag){
            var innerHTML;
            return {
                firstChild: {
                    href: "https://www.mafengwo.cn/"
                }
            }
        }
    };
    """
    evalJsCode = (
        "var window = {};"
        + documentCode
        + "function exec(){"
        + evalJsCode[0:index]
        + "}"
    )
    # print(evalJsCode)
    context = execjs.compile(evalJsCode)
    # print(context.call("exec"))
    finalContext = execjs.compile(
        # context.call("exec")是用来调用前面的exec函数的
        "var window={};"
        + documentCode
        + "function final(){ return '"
        + context.call("exec")
        + "}"
    )
    finalVal = finalContext.call("final")
    return finalVal


def getContent(
    url, __jsluid_s="", __jsl_clearance="",
):
    url = "https://www.mafengwo.cn/i/18252205.html"
    headers = {
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/527.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36",
        "referer": "https://www.mafengwo.cn/i/18252205.html",
    }
    if __jsluid_s != "" and __jsl_clearance != "":
        cookie = "__jsluid_s=%s; __jsl_clearance=%s;" % (__jsluid_s, __jsl_clearance)
        headers.update({"cookie": cookie})

    r = requests.get(url, headers=headers)
    print(r.headers)
    # print(r.text)
    print(r.status_code)
    if r.text.startswith("<script>"):
        # cookie错误
        __jsluid_s = r.headers["Set-Cookie"].split(";")[0].split("=")[1]
        print("__jsluid_s", __jsluid_s)
        __jsl_clearance = changeJsRunTimeCodeAndGetClearance(r.text)
        print("__jsl_clearance", __jsl_clearance)
        # # 再请求一遍
        getContent(url, __jsluid_s=__jsluid_s, __jsl_clearance=__jsl_clearance)
    if not r.text.startswith("<script>"):
        print(r.text)
    # content = r.text


getContent("https://www.mafengwo.cn/i/18252206.html")


# '__jsluid_s=9a91972ada0d6431c85c51308d9ca2d6
# changeJsRunTimeCode(content)

# document.createElement('div');
# _4k.innerHTML="<a href=\'/\'>_i</a>";
# _4k=_4k.firstChild.href;