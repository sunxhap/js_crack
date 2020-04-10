# -*- coding: utf-8 -*-

import random
import numpy as np


# def get_trace_fast(distance):
#     track = [[-random.randint(15, 22), -random.randint(22, 25), 0]]
#     track.append([0, 0, 0])
#     rand_x = 0
#     passtime = 40
#     for i in range(10):
#         rand_x += int(distance * random.randint(1, 2) / 10)
#         passtime += random.randint(10, 50)
#         if rand_x < distance:
#             track.append([rand_x, random.randint(-2, 2), passtime])
#     passtime += random.randint(100, 150)
#     track.append([distance, random.randint(-2, 2), passtime])
#     return track

def get_random(max):
    return True if random.randint(0, max) < 1 else False


def get_trace_fast():
    """
    生成轨迹 重做
    :param distance:
    :return:
    """
    distance = random.randint(120, 160)
    print('get_trace_fast distance', distance)
    track = [[-random.randint(15, 22), -random.randint(22, 25), 0]]
    track.append([0, 0, 0])

    rand_x = 0
    rand_y = 0
    rand_y_max = 6
    passtime = 10
    for i in range(50):
        if get_random(8):
            pass
        else:
            rand_x += int(distance * random.randint(1, 2) / 50)

        if get_random(4) and rand_y < rand_y_max:
            rand_y += 1

        if get_random(2):
            rand_y = random.randint(-5, 5)

        if rand_x < distance / 3:
            passtime += random.randint(10, 20)
        if rand_x < distance / 2:
            passtime += random.randint(30, 50)
        elif rand_x < distance:
            passtime += random.randint(10, 20)

        track.append([rand_x, rand_y, passtime])
    passtime += random.randint(5, 10)
    rand_y = random.randint(-5, 5)
    track.append([distance, rand_y, passtime])
    print(len(track))
    return track


def get_moves(length):
    """
    轨迹生成
    x, y, 时间    [滑动距离, 上下偏移量, 累计时间]
        待做      轨迹的初始化x  待做成随机     ，有时失败,
        保留成功的滑动轨迹   , 不断通过成功的轨迹拟合
    :param length:  滑动距离
    :return:
    """
    x = [[-21, -13, 0], [0, 0, 0], [0, 0, 9], [2, -1, 63], [6, -2, 71], [9, -2, 78], [12, -2, 87], [17, -2, 94],
         [22, -2, 103], [26, -2, 110], [29, -1, 119], [32, -1, 126], [33, -1, 136], [35, -1, 142], [36, -1, 151],
         [37, -1, 158], [38, -1, 169], [39, -1, 190], [40, -1, 231], [41, -1, 241], [42, -1, 246], [45, -1, 256],
         [46, -1, 262], [47, -1, 272], [48, -1, 279], [50, -1, 288], [51, -1, 294], [52, -1, 309], [53, -1, 359],
         [54, -1, 366], [56, -1, 374], [58, -1, 383], [60, -1, 391], [62, -1, 399], [65, -1, 409], [68, -1, 414],
         [70, -1, 423], [71, -1, 430], [73, -1, 442], [74, -1, 446], [76, -1, 456], [77, -1, 462], [79, -1, 472],
         [80, -1, 478], [82, -1, 490], [83, -1, 494], [85, -1, 510], [87, -1, 526], [88, -1, 536], [91, -1, 542],
         [92, -1, 553], [93, -1, 558], [94, -1, 566], [97, -1, 574], [98, -1, 591], [99, -1, 598], [101, -1, 695],
         [102, -1, 710], [102, -1, 856]]

    moves = list()
    x_total_time = x[-1][2]
    x_total_length = x[-1][0]
    time = random.randint(1000, 2000)  # 最大时间随机
    print(x_total_time, x_total_length, time)

    moves.append(x[0])  # 起始位置
    for i in range(len(x)):
        moves.append([
            int(x[i][0] / x_total_length * length),
            x[i][1],
            int(x[i][2] / x_total_time * time),
        ])
    return moves


def sigmoid(x, b=100):
    """
    b偏移量
    :param x:
    :param b:
    :return:
    """
    # return (1 / (1 + np.exp(-x + 4))) * b
    return (1 / (1 + np.exp(-x + 4))) * b


def get_trace_by_sigmoid():
    distance = random.randint(120, 160)
    track = [[-random.randint(10, 18), -random.randint(12, 18), 0]]
    track.append([0, 0, 0])
    b = distance  # 偏移量
    passtime = 5

    x = [(10 / 20) * i for i in range(random.randint(30, 50))]
    # print(x)
    for i in x:
        rand_y = random.randint(-5, 5)
        rand_x = int(sigmoid(i, b))
        print('rand_x', rand_x)
        if rand_x < distance / 2:
            passtime += random.randint(30, 50)
        elif rand_x < distance:
            passtime += random.randint(5, 15)
        track.append([rand_x, rand_y, passtime])
    print(len(track))
    return track

# print(get_trace_by_sigmoid())
# print(get_moves(87))  # 固定
# print(get_trace_fast())
