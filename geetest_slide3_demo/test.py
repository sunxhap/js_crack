# -*- coding: utf-8 -*-
# @Time: 2020/3/18 15:56

import random


def get_s():
    """生成随机16位字符串"""

    def _():
        return str(hex((int((1 + random.random()) * 65536) | 0)))[3:]

    return _() + _() + _() + _()


print(get_s())