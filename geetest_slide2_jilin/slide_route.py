# -*- coding: utf-8 -*-
# @Time: 2020/1/13 15:03

import random


def fun_c(a):
    g = []
    e = []
    f = 0
    for h in range(len(a) - 1):
        b = int(round(a[h + 1][0] - a[h][0]))
        c = int(round(a[h + 1][1] - a[h][1]))
        d = int(round(a[h + 1][2] - a[h][2]))
        g.append([b, c, d])

        if b == c == d == 0:
            pass
        else:
            if b == c == 0:
                f += d
            else:
                e.append([b, c, d + f])
                f = 0
    if f != 0:
        e.append([b, c, f])
    return e


def fun_d(a):
    b = '()*,-./0123456789:?@ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqr'
    c = len(b)
    d = ''
    e = abs(a)
    f = int(e / c)
    if f >= c:
        f = c - 1
    if f > 0:
        d = b[f]
    e %= c
    g = ''
    if a < 0:
        g += '!'
    if d:
        g += '$'
    return g + d + b[e]


def fun_e(item):
    b = [[1, 0], [2, 0], [1, -1], [1, 1], [0, 1], [0, -1], [3, 0], [2, -1], [2, 1]]
    c = 'stuvwxyz~'
    for i, t in enumerate(b):
        if t == item[:2]:
            return c[i]
    return 0


def fun_u(a, v1z, T1z):
    while not v1z or not T1z:
        pass
    else:
        x1z = 0
        c1z = a
        y1z = v1z[0]
        k1z = v1z[2]
        L1z = v1z[4]

        i1z = T1z[x1z:x1z + 2]
        while i1z:
            x1z += 2
            n1z = int(i1z, 16)
            M1z = chr(n1z)
            I1z = (y1z * n1z * n1z + k1z * n1z + L1z) % len(a)
            c1z = c1z[0:I1z] + M1z + c1z[I1z:]  # 插入一个值
            i1z = T1z[x1z:x1z + 2]
        return c1z


def cal_userresponse(a, b):
    d = []
    c = b[32:]
    for e in range(len(c)):
        f = ord(str(c[e]))
        tmp = f - 87 if f > 57 else f - 48
        d.append(tmp)

    c = 36 * d[0] + d[1]
    g = int(round(a)) + c
    b = b[:32]

    i = [[], [], [], [], []]
    j = {}
    k = 0
    e = 0
    for e in range(len(b)):
        h = b[e]
        if h in j:
            pass
        else:
            j[h] = 1
            i[k].append(h)
            k += 1
            k = 0 if (k == 5) else k

    n = g
    o = 4
    p = ""
    q = [1, 2, 5, 10, 50]
    while n > 0:
        if n - q[o] >= 0:
            m = int(random.random() * len(i[o]))
            p += str(i[o][m])
            n -= q[o]
        else:
            del (i[o])
            del (q[o])
            o -= 1
    return p


def get_userresponse_a(initData, track_list):
    # 路径需要自己拟合
    challenge = initData['challenge']
    l = track_list[-1][0]

    a = fun_f(track_list)
    arr = [12, 58, 98, 36, 43, 95, 62, 15, 12]
    # arr = [23, 34, 66, 23, 67, 89, 54, 15, 19, 15, 78, 27, 26]
    s = initData['s']
    a = fun_u(a, arr, s)
    userresponse = cal_userresponse(l, challenge)
    return userresponse, a

def fun_f(track_list):
    skip_list = fun_c(track_list)
    # success_list = [
    #     [23, 21, 0],[1, -1, 196],[4, 0, 17],[6, -1, 17],[3, 0, 33],[3, 0, 15],[1, 0, 51],[1, 0, 18],[3, 0, 16],[2, 0, 33],[2, 0, 16],[0, -1, 16],[1, 0, 17],[3, 0, 17],[1, 0, 16],[2, 0, 17],[7, 0, 16],[1, 0, 17],[7, 0, 17],[4, 0, 16],[2, 0, 17],[3, 0, 16],[1, -2, 16],[2, 0, 18],[1, 0, 23],[1, 0, 48],[1, 0, 10],[2, 0, 51],[1, 0, 16],[1, 0, 33],[1, 0, 26],[1, 0, 24],[1, 0, 16],[2, 0, 18],[2, 0, 30],[1, 0, 20],[1, 0, 16],[1, 0, 16],[1, 0, 17],[1, 0, 259],[1, 0, 72],[1, 0, 17],[1, 0, 17],[2, 0, 16],[1, 0, 17],[1, -1, 16],[2, 0, 37],[2, 0, 120],[1, 0, 64],[1, 0, 24],[1, 0, 8],[1, 0, 16],[1, 0, 80],[0, 0, 560]
    #
    # ]
    # for i in range(1, len(skip_list)):
    #     if skip_list[i] != success_list[i]:
    #         print('Flase' , skip_list[i], success_list[i], i)
    #     break
    # print(len(skip_list), skip_list)
    g, h, i = [], [], []
    for j in range(len(skip_list)):
        b = fun_e(skip_list[j])
        if b:
            h.append(b)
        else:
            g.append(fun_d(skip_list[j][0]))
            h.append(fun_d(skip_list[j][1]))
        i.append(fun_d(skip_list[j][2]))
    # g_cuccess_list =  ["D", "-", "/", "0", "0", "-", ")", "("]
    # for _ in range(0, len(g)):
    #     if g[_] != g_cuccess_list[_]:
    #         print('g, Flase' , g[_], g_cuccess_list[_], _)
    #         break
    # h_success_list = [
    #     "B", "u", "(", "!)", "y", "y", "s", "s", "y", "t", "t", "x", "s", "y", "s", "t", "(", "s", "(", "(", "t", "y",
    #      "!*", "t", "s", "s", "s", "t", "s", "s", "s", "s", "s", "t", "t", "s", "s", "s", "s", "s", "s", "s", "s", "t",
    #      "s", "u", "t", "t", "s", "s", "s", "s", "s", "("
    # ]
    # for _ in range(0, len(g)):
    #     if h[_] != h_success_list[_]:
    #         print('h, Flase' , h[_], h_success_list[_], _)
    #         break
    # i_success_list = [
    #     "(", "$,)", ":", ":", "N", "8", "e", "?", "9", "N", "9", "9", ":", ":", "9", ":", "9", ":", ":", "9", ":", "9",
    #      "9", "?", "D", "b", "3", "e", "9", "N", "G", "E", "9", "?", "K", "A", "9", "9", ":", "$,r", "$)0", ":", ":",
    #      "9", ":", "9", "R", "$)i", "r", "E", "1", "9", "$)8", "$1U"
    # ]
    # for _ in range(0, len(g)):
    #     if i[_] != i_success_list[_]:
    #         print('i, Flase' , i[_], i_success_list[_], _)
    #         break
    return ''.join(g) + '!!' + ''.join(h) + '!!' + ''.join(i)