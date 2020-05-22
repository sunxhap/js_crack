# -*- coding: utf-8 -*-
# @Time: 2020/5/15 19:48

import random


# clientX 鼠标相对屏幕左边 , clientY 鼠标相对上方 ----点击位置距离当前body可视区域的x，y坐标,  l_now_deal,
# 整体 坐标,  注意图片  鼠标滑入滑出的坐标轨迹
# 轨迹点  大概 6-9 毫秒一个，  从点击第一个点开始计时 ，
# 注意点击第二个点 和之前的轨迹时间跨度 600 （400-700）左右， 前后点都如此，
# 第二个点和第三个点 在轨迹内, 第一个点坐标不在内， 作为开始

# 所有轨迹点 按比例压缩到 50个点


def get_trace_by_position(position):
    trace_list = list()
    x1 = int(position[0][0])
    y1 = int(position[0][1])

    x2 = int(position[1][0])
    y2 = int(position[1][1])

    x3 = int(position[2][0])
    y3 = int(position[2][1])

    start_time = 0

    for i in range(49):
        step_time = random.randint(8, 10)
        if x1 < x2:
            rx = random.randint(x1, x2)
        else:
            rx = random.randint(x2, x1)

        if y1 < y2:
            ry = random.randint(y1, y2)
        else:
            ry = random.randint(y2, y1)
        start_time += step_time
        trace_list.append([rx, ry, start_time])

    trace_list.append([position[1][0], position[1][1], position[1][2]])
    start_time += step_time

    for i in range(49):
        step_time = random.randint(8, 10)
        if x2 < x3:
            rx = random.randint(x2, x3)
        else:
            rx = random.randint(x3, x2)

        if y2 < y3:
            ry = random.randint(y2, y3)
        else:
            ry = random.randint(y3, y2)

        start_time += step_time
        trace_list.append([rx, ry, start_time])

    trace_list.append([position[2][0], position[2][1], position[2][2]])

    return trace_list


def get_trace_by_position_v2(position):
    trace_list = list()
    point_list = list()

    x1 = int(position[0][0])
    y1 = int(position[0][1])

    x2 = int(position[1][0])
    y2 = int(position[1][1])

    x3 = int(position[2][0])
    y3 = int(position[2][1])

    start_time = 0
    point_list.append([position[0][0], position[0][1], start_time])

    for i in range(49):
        step_time = random.randint(8, 10)
        if x1 < x2:
            rx = random.randint(x1, x2)
        else:
            rx = random.randint(x2, x1)

        if y1 < y2:
            ry = random.randint(y1, y2)
        else:
            ry = random.randint(y2, y1)
        start_time += step_time
        trace_list.append([rx, ry, start_time])

    start_time += step_time
    print([position[1][0], position[1][1], start_time])
    trace_list.append([position[1][0], position[1][1], start_time])

    point_list.append([position[1][0], position[1][1], start_time])

    for i in range(49):
        step_time = random.randint(8, 10)
        if x2 < x3:
            rx = random.randint(x2, x3)
        else:
            rx = random.randint(x3, x2)

        if y2 < y3:
            ry = random.randint(y2, y3)
        else:
            ry = random.randint(y3, y2)

        start_time += step_time
        trace_list.append([rx, ry, start_time])

    start_time += step_time
    trace_list.append([position[2][0], position[2][1], start_time])

    point_list.append([position[1][0], position[1][1], start_time])

    return trace_list, point_list


# position = [[254.0127, 59.336299999999994, 0], [138.0069, 76.67049999999999, 1500], [204.0102, 76.67049999999999, 3000]]

# position = [[254.0127, 59.336299999999994], [138.0069, 76.67049999999999], [204.0102, 76.67049999999999]]
# print(get_trace_by_position_v2(position))

# print(random.randint(138.0069, 254.0127))