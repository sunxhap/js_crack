import requests

session = requests.session()

headers = {
    'Connection': 'keep-alive',
    'Content-Length': '0',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36',
    'Accept': '*/*',
    'Origin': 'http://match.yuanrenxue.com',
    'Referer': 'http://match.yuanrenxue.com/match/3',
    'Accept-Language': 'zh-CN,zh;q=0.9',
}
session.headers = headers
all = {}
for i in range(1, 6):
    session.post('http://match.yuanrenxue.com/logo', verify=False)
    if i == 1:
        url = "http://match.yuanrenxue.com/api/match/3"
    else:
        url = "http://match.yuanrenxue.com/api/match/3?page={}".format(i)
    r = session.get(url)
    data = r.json()["data"]
    for dd in data:
        if dd["value"] in all:
            all[dd["value"]] += 1
        else:
            all[dd["value"]] = 1
print(all)