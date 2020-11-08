# -*- coding: utf-8 -*-

import requests
from ip_util.ip_util import *


def get_requests_cookie(res):
    cookies = requests.utils.dict_from_cookiejar(res.cookies)
    cookies_str = ""
    for k in cookies:
        cookies_str += ";{}={}".format(k, cookies[k])
    return cookies_str[1: -1]


class SpiderDemo(object):
    def __init__(self):
        self.proxies = ""
        # self.proxies = get_proxy()
        print('proxies', self.proxies)

    def run(self):
        # headers = {
        #     'authority': 'hotels.ctrip.com',
        #     'pragma': 'no-cache',
        #     'cache-control': 'no-cache',
        #     'upgrade-insecure-requests': '1',
        #     'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36',
        #     'sec-fetch-dest': 'document',
        #     'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        #     'sec-fetch-site': 'none',
        #     'sec-fetch-mode': 'navigate',
        #     'accept-language': 'zh-CN,zh;q=0.9',
        # }
        #
        # res = requests.get('https://hotels.ctrip.com/hotel/beijing1', headers=headers, verify=False, proxies=self.proxies)
        #
        # print(res.cookies.get_dict())

        headers = {
            'authority': 'hotels.ctrip.com',
            'pragma': 'no-cache',
            'cache-control': 'no-cache',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36',
            'sec-fetch-dest': 'document',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'sec-fetch-site': 'none',
            'sec-fetch-mode': 'navigate',
            'accept-language': 'zh-CN,zh;q=0.9',
        }

        response = requests.get('https://hotels.ctrip.com/hotel/shanghai2', headers=headers, verify=False,
                                proxies=self.proxies)
        print(requests.utils.dict_from_cookiejar(response.cookies))
        # print(response.cookies.get_dict())
        # {'_abtest_userid': '116516e0-d67b-415f-8b95-1b0b0cb7629a', 'ASP.NET_SessionId': '0b2zlijh0y0hp4olucp3iqkp',
        #  'magicid': 'n00mHMW3wXqTMCfR5zcHpYBDMrAmk4nRPR9IwGhwTGbBaLSQv4yIN4/TI76Mhhde'}

    def run_list(self):
        # cookies = {'_abtest_userid': '611ca687-afa1-4dcc-92ec-79c528e03c7e',
        #            'ASP.NET_SessionId': '1rmlpywagjfoplelyfpxau4n',
        #            'magicid': 'RmtFDKBU+CbMGGPO7xqJpPDRp0QUiI4fTUcIENxAV53BaLSQv4yIN4/TI76Mhhde',
        #
        #            # 'librauuid': 'P5O14kqFUsUh0kT6o9',
        #            # 'hoteluuid': 'A0zFC5pm95q5CHbd',
        #            # '_bfa': '1.1592537219374.3bvyda.1.1592537219374.1592537219374.1.1',
        #            # '_bfs': '1.1',
        #            # 'OID_ForOnlineHotel': '15925372193743bvyda1592537219885102032',
        #            # 'hotelhst': '2012709687',
        #            }

        headers = {
            'authority': 'hotels.ctrip.com',
            'pragma': 'no-cache',
            'cache-control': 'no-cache',
            'sec-fetch-dest': 'empty',
            'if-modified-since': 'Thu, 01 Jan 1970 00:00:00 GMT',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'accept': '*/*',
            'origin': 'https://hotels.ctrip.com',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'referer': 'https://hotels.ctrip.com/hotel/shanghai2',
            'accept-language': 'zh-CN,zh;q=0.9',
            'cookie': 'magicid=FJX/5ExtyoVkMyAGBGjEvUNe8oBFlbc4tn2hqy08bNHBaLSQv4yIN4/TI76Mhhde; ASP.NET_SessionId=e2nzxt1doszmmcrm4edbt0ku; _abtest_userid=7f2b2614-d4fc-4671-ac06-f8c51581c5b5; librauuid=P5O14kqFUsUh0kT6o9; hoteluuid=A0zFC5pm95q5CHbd; OID_ForOnlineHotel=15925349328313sbhsm1592534932893102032; _RF1=218.4.167.70; _RSG=er4aNwPYi895jgyb8icUAA; _RDG=28fd6c3c4b6355274d32e27a753c156562; _RGUID=922c899e-9790-4d68-a29e-9ac225f2ab45; _ga=GA1.2.148423127.1592534935; MKT_CKID=1592534935351.o7nh4.vlea; MKT_Pagesource=PC; _gid=GA1.2.765654809.1592825835; MKT_CKID_LMT=1592825834972; _bfa=1.1592534932831.3sbhsm.1.1592534932831.1592825831985.2.6; _bfs=1.5; hotelhst=2012709687; _bfi=p1%3D102002%26p2%3D102002%26v1%3D6%26v2%3D5; _jzqco=%7C%7C%7C%7C1592825835044%7C1.1374296378.1592534935348.1592826968402.1592827659098.1592826968402.1592827659098.undefined.0.0.5.5; __zpspc=9.2.1592825834.1592827659.4%234%7C%7C%7C%7C%7C%23; _gat=1; appFloatCnt=5',
        }

        data = {
            '__VIEWSTATEGENERATOR': 'DB1FBB6D',
            'cityName': '%E4%B8%8A%E6%B5%B7',
            'StartTime': '2020-06-19',
            'DepTime': '2020-06-20',
            'RoomGuestCount': '1,1,0',
            'txtkeyword': '',
            'Resource': '',
            'Room': '',
            'Paymentterm': '',
            'BRev': '',
            'Minstate': '',
            'PromoteType': '',
            'PromoteDate': '',
            'operationtype': 'NEWHOTELORDER',
            'PromoteStartDate': '',
            'PromoteEndDate': '',
            'OrderID': '',
            'RoomNum': '',
            'IsOnlyAirHotel': 'F',
            'cityId': '2',
            'cityPY': 'shanghai',
            'cityCode': '021',
            'cityLat': '31.2363508011',
            'cityLng': '121.4802384079',
            'positionArea': '',
            'positionId': '',
            'hotelposition': '',
            'keyword': '',
            'hotelId': '',
            'htlPageView': '0',
            'hotelType': 'F',
            'hasPKGHotel': 'F',
            'requestTravelMoney': 'F',
            'isusergiftcard': 'F',
            'useFG': 'F',
            'HotelEquipment': '',
            'priceRange': '-2',
            'hotelBrandId': '',
            'promotion': 'F',
            'prepay': 'F',
            'IsCanReserve': 'F',
            'OrderBy': '99',
            'OrderType': '',
            'k1': '',
            'k2': '',
            'CorpPayType': '',
            'viewType': '',
            'checkIn': '2020-06-19',
            'checkOut': '2020-06-20',
            'DealSale': '',
            'ulogin': '',
            'hidTestLat': '0%7C0',
            'AllHotelIds': '',
            'psid': '',
            'isfromlist': 'T',
            'ubt_price_key': 'htl_search_noresult_promotion',
            'showwindow': '',
            'defaultcoupon': '',
            'isHuaZhu': 'False',
            'hotelPriceLow': '',
            'unBookHotelTraceCode': '',
            'showTipFlg': '',
            'traceAdContextId': '',
            'allianceid': '0',
            'sid': '0',
            'pyramidHotels': '',
            'hotelIds': '',
            'markType': '0',
            'page': '1',
            'zone': '',
            'location': '',
            'type': '',
            'brand': '',
            'group': '',
            'feature': '',
            'equip': '',
            'bed': '',
            'breakfast': '',
            'other': '',
            'star': '',
            'sl': '',
            's': '',
            'l': '',
            'price': '',
            'a': '0',
            'keywordLat': '',
            'keywordLon': '',
            'contrast': '0',
            'PaymentType': '',
            'CtripService': '',
            'promotionf': '',
            'allpoint': '',
            'page_id_forlog': '102032',
            'contyped': '0',
            'productcode': '',
            'eleven': '473b943375731150b5e9173c7f45da5617ecdf528de0250ef8e98e3b52493b12_3321241469'
        }

        response = requests.post('https://hotels.ctrip.com/Domestic/Tool/AjaxHotelList.aspx', headers=headers,
                                 data=data, verify=False, proxies=self.proxies)
        # , cookies=cookies
        print(response.text)


if __name__ == '__main__':
    spider = SpiderDemo()
    # spider.run()
    spider.run_list()
