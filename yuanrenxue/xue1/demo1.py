import requests

from urllib.parse import quote


headers = {

    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'X-Requested-With': 'XMLHttpRequest',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36',
    'Referer': 'http://match.yuanrenxue.com/match/1',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Host': 'match.yuanrenxue.com',
    'Accept-Encoding': 'gzip, deflate',

}

send_url = "http://match.yuanrenxue.com/api/match/1?page=3&m=bc07e35e0eb4c92bf782b864ca5b7e26%E4%B8%A81603281779"

m = "13d1d0c5eed0fbba6693a369cdb033a1丨1603287823"
m_quote = quote(m)
print(m_quote)

send_url = f'http://match.yuanrenxue.com/api/match/1?page=2&m={m_quote}'

response = requests.get(send_url, headers=headers, verify=False, timeout=30)

print(response.text)
# print(response.content)