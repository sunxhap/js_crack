# -*- coding: utf-8 -*-
# @Time: 2020/1/14 15:15

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
        待做      轨迹的初始化x  待做成随机      ，有时失败,
        保留成功的滑动轨迹   , 不断通过成功的轨迹拟合
    :param length:  滑动距离
    :return:
    """
    # x = [[-21, -21, 0], [0, 0, 0], [1, 0, 214], [4, -1, 230], [8, -1, 249], [12, -1, 263], [17, -1, 281], [20, -2, 297],
    #      [23, -2, 314], [26, -2, 331], [30, -2, 347], [32, -2, 362], [36, -2, 380], [40, -2, 397], [44, -2, 415],
    #      [47, -2, 431], [51, -2, 447], [57, -2, 462], [60, -2, 480], [62, -2, 496], [65, -2, 514], [66, -1, 530],
    #      [68, -1, 547], [71, -1, 563], [74, -1, 579], [77, -1, 596], [80, -1, 613], [82, -1, 629], [86, 0, 646],
    #      [89, 0, 663], [94, 1, 679], [97, 1, 696], [101, 2, 712], [105, 3, 729], [108, 3, 746], [109, 4, 763],
    #      [111, 4, 780], [114, 5, 796], [115, 5, 813], [116, 6, 830], [117, 6, 847], [118, 6, 865], [119, 6, 911],
    #      [119, 6, 1035], [120, 6, 1058], [121, 6, 1113], [121, 6, 1206], [122, 6, 1221], [122, 6, 1247], [123, 6, 1267],
    #      [123, 6, 1359], [124, 6, 1391], [124, 6, 1506]]

    # x = [[-16, -21, 0], [0, 0, 0], [0, 0, 248], [3, -1, 267], [7, -1, 289], [11, -1, 306], [17, -1, 327],
    #      [21, -2, 345], [23, -2, 365], [26, -2, 385], [31, -2, 403], [33, -2, 422], [38, -2, 443], [42, -2, 462],
    #      [46, -2, 483], [49, -2, 502], [54, -2, 520], [59, -2, 538], [63, -2, 558], [66, -2, 577], [69, -2, 599],
    #      [70, -1, 618], [71, -1, 637], [75, -1, 656], [78, -1, 674], [82, -1, 694], [85, -1, 714], [87, -1, 733],
    #      [91, 0, 753], [94, 0, 773], [99, 1, 791], [103, 1, 811], [107, 2, 829], [111, 3, 849], [115, 3, 869],
    #      [115, 4, 888], [118, 4, 909], [121, 5, 928], [122, 5, 948], [123, 6, 967], [125, 6, 987], [126, 6, 1008],
    #      [126, 6, 1062], [126, 6, 1206], [127, 6, 1233], [129, 6, 1297], [129, 6, 1406], [130, 6, 1423], [130, 6, 1454],
    #      [131, 6, 1477], [131, 6, 1584], [133, 6, 1622], [133, 6, 1757]]

    # x = [[-21, -21, 0], [-28, -21, 0], [0, 0, 0], [1, 0, 255], [5, -1, 274], [10, -1, 296], [16, -1, 313],
    #      [22, -1, 335], [26, -2, 354], [30, -2, 374], [35, -2, 394], [40, -2, 413], [43, -2, 431], [48, -2, 453],
    #      [53, -2, 473], [59, -2, 494], [63, -2, 513], [68, -2, 533], [76, -2, 550], [80, -2, 572], [83, -2, 591],
    #      [87, -2, 612], [88, -1, 632], [91, -1, 652], [95, -1, 671], [99, -1, 690], [103, -1, 710], [107, -1, 731],
    #      [110, -1, 750], [115, 0, 770], [119, 0, 790], [126, 1, 809], [130, 1, 830], [136, 2, 849], [141, 3, 869],
    #      [145, 3, 889], [146, 4, 909], [149, 4, 930], [153, 5, 949], [154, 5, 969], [156, 6, 989], [157, 6, 1010],
    #      [158, 6, 1031], [160, 6, 1086], [160, 6, 1234], [161, 6, 1261], [162, 6, 1327], [162, 6, 1438], [164, 6, 1456],
    #      [164, 6, 1487], [165, 6, 1510], [165, 6, 1620], [167, 6, 1658], [167, 6, 1796]]

    x = [[-21, -21, 0], [-17, -21, 0], [-23, -21, 0], [0, 0, 0], [0, 0, 205], [4, -1, 220], [8, -1, 238], [13, -1, 251],
         [18, -1, 269], [21, -2, 284], [25, -2, 300], [29, -2, 316], [33, -2, 332], [36, -2, 346], [40, -2, 364],
         [44, -2, 380], [49, -2, 397], [52, -2, 412], [57, -2, 428], [63, -2, 442], [67, -2, 460], [69, -2, 475],
         [72, -2, 492], [73, -1, 508], [76, -1, 524], [79, -1, 539], [82, -1, 555], [86, -1, 571], [89, -1, 588],
         [92, -1, 603], [96, 0, 619], [99, 0, 635], [105, 1, 650], [108, 1, 667], [114, 2, 683], [118, 3, 699],
         [121, 3, 715], [122, 4, 731], [124, 4, 748], [128, 5, 763], [129, 5, 779], [130, 6, 795], [131, 6, 812],
         [132, 6, 829], [134, 6, 873], [134, 6, 992], [134, 6, 1014], [135, 6, 1067], [135, 6, 1156], [137, 6, 1171],
         [137, 6, 1196], [138, 6, 1214], [138, 6, 1303], [140, 6, 1333], [140, 6, 1445]]

    # x = get_trace_fast()
    # x = get_trace_by_sigmoid()
    print(len(x))
    print('x', x)
    moves = list()
    x_total_time = x[-1][2]
    x_total_length = x[-1][0]
    time = random.randint(1000, 2000)  # 最大时间随机
    print(x_total_time, x_total_length, time)

    # moves.append([x[0][0], x[0][1], x[0][2]])   # 起始位置
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
# print(get_moves(167))  # 固定
# print(get_trace_fast())
