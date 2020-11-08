# -*- coding: utf-8 -*-


import requests

cookies = {
    'JSESSIONID': '7293B7612FDA5CD043C1FD8F6A3C5338.7',
    'neCYtZEjo8GmS': '5oRD.lowDjGkRk60sqOiw2FGgaA8QQnsClpf3oajRx13GiQH4oJhn46owLj0TnPtZv0ea3kHD3.FLP70Fjoa5mA',
    'acw_tc': '707c9fd515990459009082455e181dc816516bbef613bb7e7a381b1f66d264',
    'neCYtZEjo8GmT': '5U05cWmeHGbaqqqm0sNuS7GByoeX8KoiG0stK11lSc6nukYqD9u0XIX.kyI6xC29vKYeNTytnA3PI8oi2Hj.vyYBjM3fe1H.Bdy7QDKgvHQsKEl11w2mNYrk65cDbUDD3_EsI4OUGDahED_KbmHlkSkOdX6BelppTQHkzZP_L1MK6ClwMp28nRrGDBaZNArub.BOsDdDmE3WiojPM1X8tvtcI9qgsTKMEuXAO0VGjjdB4PWZZDyde6rlLDzVyf6sUvBsqwKLntjJINsgMvjRUnZJG_voUJxfmzfow0WK9YjRgEiJbt9v28FbqwThKEfr80',
}

headers = {
    'Connection': 'keep-alive',
    'Pragma': 'no-cache',
    'Cache-Control': 'no-cache',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': '*/*',
    'Origin': 'http://app1.nmpa.gov.cn',
    'Referer': 'http://app1.nmpa.gov.cn/data_nmpa/face3/base.jsp?tableId=136&tableName=TABLE136&title=%D2%BD%C1%C6%C6%F7%D0%B5%BE%AD%D3%AA%C6%F3%D2%B5%A3%A8%D0%ED%BF%C9%A3%A9&bcId=154209512434322144199787151065&CbSlDlH0=qAkEkac4X4X4X4X4X_GGWUY7pbNk4.W4pYvu.CzUaALqqh7',
    'Accept-Language': 'zh-CN,zh;q=0.9',
}

params = (
    ('6SQk6G2z', 'GBK-54qxkShDowVssDyZQFxp5l6RXCbCSoVtvO3hjlNl61.39vo5coB5AEcqoQbjVKWb.9RG1ASvde8zmcotuo5tcrsPLWaaNHkLroKiOQcnRNpIDEApsgh30Jv690S4JWR6hPrR3JUqr40Ucp7fsWC8gfjsQt18.US23lSAmLTdIWOFt3ZKj2gRkcQv0on_uz4AbMMOwk_dIcsrYE9hZ4oFqjDTnlhTtkWOhzouF.n1QafweCFuh1b5ufERWgAbb2haRvoyBFMKA5gWumCEt.4Du5eCCBwlSVleEUWcCS9l4vhTsz1nxOv5PmMZXGuyTp_FZzDPN5uNJfmJvjFkg9f4x6klM.bQC.kuSbW7cU5ppCQV'),
)

data = [
  ('tableId', '136'),
  ('State', '1'),
  ('State', '1'),
  ('State', '1'),
  ('State', '1'),
  ('State', '1'),
  ('State', '1'),
  ('State', '1'),
  ('bcId', '154209512434322144199787151065'),
  ('tableName', 'TABLE136'),
  ('viewtitleName', 'COLUMN1839'),
  ('viewsubTitleName', 'COLUMN1840'),
  ('curstart', '2'),
  ('tableView', '%E5%8C%BB%E7%96%97%E5%99%A8%E6%A2%B0%E7%BB%8F%E8%90%A5%E4%BC%81%E4%B8%9A%EF%BC%88%E8%AE%B8%E5%8F%AF%EF%BC%89'),
]

response = requests.post('http://app1.nmpa.gov.cn/data_nmpa/face3/search.jsp', headers=headers, params=params, cookies=cookies, data=data, verify=False)

#NB. Original query string below. It seems impossible to parse and
#reproduce query strings 100% accurately so the one below is given
#in case the reproduced version is not "correct".
# response = requests.post('http://app1.nmpa.gov.cn/data_nmpa/face3/search.jsp?6SQk6G2z=GBK-54qxkShDowVssDyZQFxp5l6RXCbCSoVtvO3hjlNl61.39vo5coB5AEcqoQbjVKWb.9RG1ASvde8zmcotuo5tcrsPLWaaNHkLroKiOQcnRNpIDEApsgh30Jv690S4JWR6hPrR3JUqr40Ucp7fsWC8gfjsQt18.US23lSAmLTdIWOFt3ZKj2gRkcQv0on_uz4AbMMOwk_dIcsrYE9hZ4oFqjDTnlhTtkWOhzouF.n1QafweCFuh1b5ufERWgAbb2haRvoyBFMKA5gWumCEt.4Du5eCCBwlSVleEUWcCS9l4vhTsz1nxOv5PmMZXGuyTp_FZzDPN5uNJfmJvjFkg9f4x6klM.bQC.kuSbW7cU5ppCQV', headers=headers, cookies=cookies, data=data, verify=False)
