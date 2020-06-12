# -*- coding: utf-8 -*-

import requests


proxy_list = list()


def get_proxy():
    global proxy_list
    if not proxy_list:
        for i in range(10):
            proxy_url = "http://10.0.0.252:8899/api/Values?type=WD&count=1"
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
    # return {"http": "http://{}".format(proxy_one), "https": "https://{}".format(proxy_one)}
    return {"http": "http://{}".format(proxy_one)}
