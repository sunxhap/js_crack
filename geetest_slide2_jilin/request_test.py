# -*- coding: utf-8 -*-
# @Time: 2020/1/14 14:08

import requests
import json
import json


def api_geetest_get_params(body=""):
    nodejs_api_url = "http://localhost:1008/api/geetest_slideV2"
    # geetest_slideV2
    nodejs_headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3887.7 Safari/537.36', }
    res = requests.post(nodejs_api_url, headers=nodejs_headers, data=body, verify=False, timeout=60)
    r_content = res.content
    return r_content


# gt = '4a28913077af48ca6eadebe01f3be4d2'
# challenge = '487fd7fbe26770948014a477eadbaf176q'
# distance = 100
# track = [[-21, -21, 0], [-17, -21, 0], [-23, -21, 0], [0, 0, 0], [0, 0, 205], [4, -1, 220], [8, -1, 238], [13, -1, 251], [18, -1, 269], [21, -2, 284], [25, -2, 300], [29, -2, 316], [33, -2, 332], [36, -2, 346], [40, -2, 364], [44, -2, 380], [49, -2, 397], [52, -2, 412], [57, -2, 428], [63, -2, 442], [67, -2, 460], [69, -2, 475], [72, -2, 492], [73, -1, 508], [76, -1, 524], [79, -1, 539], [82, -1, 555], [86, -1, 571], [89, -1, 588], [92, -1, 603], [96, 0, 619], [99, 0, 635], [105, 1, 650], [108, 1, 667], [114, 2, 683], [118, 3, 699], [121, 3, 715], [122, 4, 731], [124, 4, 748], [128, 5, 763], [129, 5, 779], [130, 6, 795], [131, 6, 812], [132, 6, 829], [134, 6, 873], [134, 6, 992], [134, 6, 1014], [135, 6, 1067], [135, 6, 1156], [137, 6, 1171], [137, 6, 1196], [138, 6, 1214], [138, 6, 1303], [140, 6, 1333], [140, 6, 1445]]
# track = json.dumps(track)
# vob_params = json.dumps(vob)
# body = {"vob_params": vob_params, 'track': track}
# print(api_geetest_get_params(body))