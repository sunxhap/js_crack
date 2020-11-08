# -*- coding: UTF-8 -*-
import json
import random
import re
import requests


def get_url_80t(request_http_pool, meta, scripts, templates, typ='etax_ningbo', route='', isdetail=False, f80t=None):
    target_js = scripts
    idx = 0
    if 'ret=' in target_js:
        while True:
            idx = target_js.index("ret=", idx + 1)
            if target_js[idx + 9: idx + 13] == 'call':
                break
        target_js = target_js[0: idx] + "window.js = " + target_js[idx + 19:idx + 23] + \
                    ";ret = true;" + target_js[idx + 25:]
    else:
        replace_str = re.findall(r'\{_\$.{2}\[\'\$_ts\'\]={};', target_js)[0]
        target_js = target_js.replace(replace_str, '{')

        ss = re.findall(ur'_\$.{2}=_\$.{2}\.call\(_\$.{2},_\$.{2}\);', target_js)[0]
        param = re.findall(ur'(_\$.{2})=_\$.{2}\.call\(_\$.{2},_\$.{2}\);', target_js)[0]
        idx = target_js.find(ss)
        target_js = target_js[0: idx] + "window.js = " + target_js[idx + 20:idx + 24] + \
                    ";" + param + " = true;" + target_js[idx + 26:]
    templates = templates.replace('{meta}', meta).replace('{js}', target_js)
    try:
        resp = request_http_pool.post('http://172.16.61.23:5502/api/ruishu_get_js/post', timeout=15, data={'html': templates})
    except Exception as e:
        print e
        return
    js = resp.text
    # index = js.find(',1500));')
    # funcname = js[index - 4: index]
    # js = js[:index - 29] + funcname + "()" + js[index + 8:]

    # index = js.find(',50000));')
    # funcname = js[index - 4: index]
    # js = js[:index - 29] + funcname + "(3);" + funcname + "()" + js[index + 9:]

    # index = js.find(',0x7FF));')
    # funcname = js[index - 4: index]
    # js = js[:index - 29] + funcname + "()" + js[index + 9:]
    # index = js.find(',2000);')
    # funcname = js[index - 4: index]
    # js = js[:index - 19] + funcname + "()" + js[index + 7:]

    # index = js.find('[651];')
    # funcname = js[index - 16: index - 12]
    # js = js[:12] + 'window.clickFunc=' + funcname + ';' + js[12:]

    # index = js.find('(701);')
    # funcname = js[index - 4: index]
    # js = js[:index - 18] + 'window.token=' + funcname + '(701);' + js[index - 18:]

    if typ == 'etax_ningbo':
        index = js.find('(arguments[1])[0];')
        funcname = js[index - 4: index]
        js = js[:12] + 'window.urlFunc=' + funcname + ';' + js[12:]

        arr_name = re.findall(r'_\$(.{2})\[_\$.{2}\+\+ \]=_\$.{2}\(263,', js)[-1]
        cut_name = re.findall(r'=_\$' + arr_name + '\.length>_\$(.{2});', js)[0]
        index = js.find('<286){')
        js = js[:index + 6] + 'var token7=_$' + arr_name + '[7];_$' + arr_name + \
             '=[254,3,6,[0,65,130,237],[1,132,4,4,0,0,0,2],14,1,token7,' + makeFp(20) + \
             ',' + makeFp(20) + ',' + makeFp(20) + ',' + makeFp(20) + \
             ',100,[0,0],0,[4,231],[88,Math.round(Math.random() * 255),80,Math.round(Math.random() * 255),' \
             'Math.round(Math.random() * 255),94,61,Math.round(Math.random() * 255)],0,[4,231],4,null,' \
             'null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,' \
             'null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,' \
             'null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,' \
             'null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,' \
             'null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,' \
             'null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,' \
             'null,null,null,null,null];_$' + cut_name + '=20;' + js[index + 6:]
        route = route or '/nbdzswj-web/api/zdsswfajgbl/search/colval'
        # url_key = 'R5XehxFr'
        url = 'https://etax.ningbo.chinatax.gov.cn'
    elif typ == 'common':
        url = 'https://jiangsu.chinatax.gov.cn/col/col16916/index.html'
    elif typ == 'js_chinatax':
        url = 'https://jiangsu.chinatax.gov.cn/col/col16916/index.html'
    elif typ == 'cd_sthj':
        url = 'http://sthj.chengdu.gov.cn/cdhbj/c110816/list_1.shtml'
        arr_name = re.findall(r'_\$(.{2})\[_\$.{2}\+\+ \]=_\$.{2}\(264,', js)[-1]
        cut_name = re.findall(r'=_\$' + arr_name + '\.length>_\$(.{2});', js)[0]
        index = js.find('=_$' + arr_name + '.length>_$')
        js = js[:index - 4] + 'var token0=_$' + arr_name + '[0];var token1=_$' + arr_name + '[1];_$' + arr_name + \
             '=[token0,token1,1,3,[11,248],[11,248],[230,110,29,16],[244,0,5,62,193,94,1,0],"0",3,[1,133,0,4,0,0,0,2],14,[0,2,0,223],' + makeFp(20) + ',' + makeFp(20) + ',[0,2],[0,Math.round(Math.random() * 255)],[0,1],[0,0],[0,0],[0,0],[0,1],[0,0],[0,Math.round(Math.random() * 255)],[0,0],[0,0],' + makeFp(20) + ',' + makeFp(20) + ',100,[0,0],0,[3,Math.round(Math.random() * 255),0,48,0,4,0,5,0,6,64,0,11,0,39,0,0,0,Math.round(Math.random() * 255),0,0,2,0,0,false],null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];_$' + cut_name + '=32;' + js[index - 4:]
    elif typ == 'cnipa':
        arr_name = re.findall(r'_\$(.{2})\[_\$.{2}\+\+ \]=_\$.{2}\(256,', js)[-1]
        cut_name = re.findall(r'=_\$' + arr_name + '\.length>_\$(.{2});', js)[0]
        index = js.find('=_$' + arr_name + '.length>_$')
        js = js[:index - 4] + 'var token7=_$' + arr_name + '[7];_$' + arr_name + \
             '=[254,3,3,[0,195,130,226],[129,128,0,0,0,0,0,0],14,1,token7,' + makeFp(20) + \
             ',[0,0],[0,32],[0,1],[0,0],[0,0],[0,0],[0,1],[0,0],[0,63],[0,0],[0,0],100,[0,0],0,[1,159],' \
             '[Math.round(Math.random() * 255),Math.round(Math.random() * 255),Math.round(Math.random() * 255),' \
             'Math.round(Math.random() * 255),Math.round(Math.random() * 255),93,33,13],2,' \
             '[1,Math.round(Math.random() * 255)],4,[0,Math.round(Math.random() * 255),0,29,0,2,0,3,0,0,0,' \
             '0,0,0,0,0,0,0,Math.round(Math.random() * 255),0,0,0,0,0,false],9,' \
             '[Math.round(Math.random() * 255),Math.round(Math.random() * 255),99,97,' \
             'Math.round(Math.random() * 255),Math.round(Math.random() * 255),Math.round(Math.random() * 255),' \
             'Math.round(Math.random() * 255),Math.round(Math.random() * 255)],239,null,null,null,null,' \
             'null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,' \
             'null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,' \
             'null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,' \
             'null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,' \
             'null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,' \
             'null,null];_$' + cut_name + '=32;' + js[index - 4:]
        url = 'http://epub.sipo.gov.cn/pam.action'
    elif typ == 'judgement':
        url = 'https://wenshu.court.gov.cn/website/parse/rest.q4w'
        index = js.find('[617];')
        funcname = js[index - 16: index - 12]
        js = js[:12] + 'window.clickFunc=' + funcname + ';' + js[12:]

        index = js.find('(arguments[1]);')
        funcname = js[index - 4: index]
        js = js[:12] + 'window.urlFunc=' + funcname + ';' + js[12:]

        arr_name = re.findall(r'_\$(.{2})\[_\$.{2}\+\+ \]=_\$.{2}\(257,', js)[-1]
        cut_name = re.findall(r'=_\$' + arr_name + '\.length>_\$(.{2});', js)[0]
        index = js.find('<521){')
        js = js[:index + 6] + 'var token7=_$' + arr_name + '[7];_$' + arr_name + \
             '=[254,3,3,[0,66,130,239],[1,132,0,4,0,0,0,2],14,1,token7,' + makeFp(20) + ',' + makeFp(20) + ',[0,1],[0,Math.round(Math.random() * 255)],[0,1],[0,0],[0,0],[0,0],[0,1],[0,63],[0,Math.round(Math.random() * 255)],[0,0],[0,0],' + makeFp(20) + ',' + makeFp(20) + ',100,[0,0],0,[2,Math.round(Math.random() * 255)],[Math.round(Math.random() * 255),Math.round(Math.random() * 255),Math.round(Math.random() * 255),Math.round(Math.random() * 255),Math.round(Math.random() * 255),30,Math.round(Math.random() * 255),0],"0",[2,Math.round(Math.random() * 255)],[5,44,0,Math.round(Math.random() * 255),0,2,0,0,0,0,0,0,0,0,0,0,0,1,Math.round(Math.random() * 255),0,0,1,0,0,false],239,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];_$' + cut_name + '=32;' + js[index + 6:]
    elif typ == 'yaojianju' or typ == 'yaojianju_ftban':
        index = js.find('(arguments[1]);')
        funcname = js[index - 4: index]
        js = js[:12] + 'window.urlFunc=' + funcname + ';' + js[12:]
        if typ == 'yaojianju_ftban':
            url = 'http://ftba.nmpa.gov.cn:8181/ftban/fw.jsp'
        else:
            url = 'http://app1.nmpa.gov.cn/data_nmpa/face3/base.jsp?tableId=40&tableName=TABLE40&title=%D2%BD%C1%C6%C6%F7%D0%B5%B9%E3%B8%E6&bcId=152904606190314452995556113153'

            if isdetail:
                url = 'http://app1.nmpa.gov.cn/data_nmpa/face3/base.jsp?tableId=40&tableName=TABLE40&title=%D2%BD%C1%C6%C6%F7%D0%B5%B9%E3%B8%E6&bcId=152904606190314452995556113153&CbSlDlH0=qAqIqGqjtPLjtPLjtjQGX1W9kIjhCyWrIX8dtOwKht3qqcL'

        index = js.find('[644];')
        funcname = js[index - 16: index - 12]
        js = js[:12] + 'window.clickFunc=' + funcname + ';' + js[12:]

        # index = js.find('<307){')
        # funcname = js[index - 16: index - 12]
        # js = js[:12] + 'window.clickFunc=' + funcname + ';' + js[12:]

        # ff = re.findall(r'_\$.{2}=_\$.{2}\(\[_\$.{2},_\$.{2},_\$.{2},_\$.{2}\]\);', js)[-1]
        # index = js.find(ff)
        # funcname = js[index + 10: index + 31]
        # js = js[:index] + 'window.arr1=' + funcname + ';' + js[index: index + 10] + 'window.arr1' + js[index + 31:]

        # index = js.find('(742,6,true,')
        # oasx = js[index + 22: index + 26]
        # funcname = js[index + 27: index + 31]
        # js = js[:index + 37] + ";console.log(" + funcname + ");" + js[index + 37:]
        # index = js.find('&8192)&&')
        # oasx = js[index + 173:index + 177]
        # js = js[:index + 157] + " " + oasx + ";" + js[index + 198:]

        arr_name = re.findall(r'_\$(.{2})\[_\$.{2}\+\+ \]=_\$.{2}\(269,', js)[-1]

        cut_name = re.findall(r'=_\$' + arr_name + '\.length>_\$(.{2});', js)[0]

        index = js.find('=_$' + arr_name + '.length>_$')
        # console.log(JSON.stringify(_$' + arr_name + '));
        ss = 'var token1=_$' + arr_name + '[1];_$' + arr_name + \
         '=[token0,token1,1,6,[34,102],[34,102],[81,47,138,80],[65,249,253,160,46,95,1,0],"0",3,[1,5,0,0,0,0,0,2],14,[0,2,0,223],' + makeFp(20) + ',' + makeFp(20) + ',[0,1],[0,Math.round(Math.random() * 255)],[0,1],[0,0],[0,0],[0,0],[0,1],[0,Math.round(Math.random() * 255)],[0,Math.round(Math.random() * 255)],[0,0],[0,0],' + makeFp(20) + ',' + makeFp(20) + ',100,[0,0],0,[5,67,0,Math.round(Math.random() * 255),0,6,0,6,0,0,Math.round(Math.random() * 255),0,21,2,Math.round(Math.random() * 255),0,0,1,75,0,0,1,0,0,false],null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];window.arr=_$' + arr_name + ';'
        js = js[:index - 4] + 'var token0=_$' + arr_name + '[0];' + ss + '_$' + cut_name + \
             '=32;' + js[index - 4:]
    else:
        print '未知type, 请联系作者添加'
        return

    templates = templates.replace('<body>', '<body><script>' + js + '</script>')
    try:
        # start_time = int(time.time() * 1000)
        resp = request_http_pool.post('http://172.16.61.23:5502/api/ruishu_get_param/post', timeout=15,
                             data={'html': templates, 'route': route, 'url': url, 'f80t': f80t})
        # end_time = int(time.time() * 1000)
        # print('用时', (end_time - start_time) / 1000)
    except Exception as e:
        print e
        return
    # print(resp.text)
    cookies = resp.json()['cookie']
    url_value = ''
    if route:
        url_value = resp.json()['url']
    neCYtZEjo8Gm80T = cookies.split('; ')[1].split('=')[1]
    return neCYtZEjo8Gm80T, url_value


def makeFp(len=2):
    token8 = []
    for i in range(len):
        token8.append(random.randint(10, 220))
    token8 = json.dumps(token8)
    return token8
