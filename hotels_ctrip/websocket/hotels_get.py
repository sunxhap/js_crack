import requests
import time
import datetime
import execjs
import os
import json

from ws4py.client.threadedclient import WebSocketClient


class CG_Client(WebSocketClient):
    def opened(self):
        print("连接成功")
        # req = open("../a.js").read()
        self.send("Python")

    def closed(self, code, reason=None):
        print("Closed down:", code, reason)

    def received_message(self, resp):
        print("resp", resp)
        currentDate = time.strftime("%Y-%m-%d")
        today = datetime.datetime.now()  # 今天，如 "2020-05-11"
        last_time = today + datetime.timedelta(hours=-24)
        tomorrow = last_time.strftime("%Y-%m-%d")  # 明天，如 '2020-05-10'
        data = {
            "__VIEWSTATEGENERATOR": "DB1FBB6D",
            "cityName": "%E5%8C%97%E4%BA%AC",
            "StartTime": today,
            "DepTime": tomorrow,
            "RoomGuestCount": "1,1,0",
            "txtkeyword": "",
            "Resource": "",
            "Room": "",
            "Paymentterm": "",
            "BRev": "",
            "Minstate": "",
            "PromoteType": "",
            "PromoteDate": "",
            "operationtype": "NEWHOTELORDER",
            "PromoteStartDate": "",
            "PromoteEndDate": "",
            "OrderID": "",
            "RoomNum": "",
            "IsOnlyAirHotel": "F",
            "cityId": "1",
            "cityPY": "beijing",
            "cityCode": "010",
            "cityLat": "39.9105329229",
            "cityLng": "116.413784021",
            "positionArea": "",
            "positionId": "",
            "hotelposition": "",
            "keyword": "",
            "hotelId": "",
            "htlPageView": "0",
            "hotelType": "F",
            "hasPKGHotel": "F",
            "requestTravelMoney": "F",
            "isusergiftcard": "F",
            "useFG": "F",
            "HotelEquipment": "",
            "priceRange": "-2",
            "hotelBrandId": "",
            "promotion": "F",
            "prepay": "F",
            "IsCanReserve": "F",
            "k1": "",
            "k2": "",
            "CorpPayType": "",
            "viewType": "",
            "checkIn": today,
            "checkOut": tomorrow,
            "DealSale": "",
            "ulogin": "",
            "hidTestLat": "0%7C0",
            "AllHotelIds": "",
            "psid": "",
            "isfromlist": "T",
            "ubt_price_key": "htl_search_noresult_promotion",
            "showwindow": "",
            "defaultcoupon": "",
            "isHuaZhu": "False",
            "hotelPriceLow": "",
            "unBookHotelTraceCode": "",
            "showTipFlg": "",
            "traceAdContextId": "",
            "allianceid": "0",
            "sid": "0",
            "pyramidHotels": "",
            "hotelIds": "",
            "markType": "0",
            "zone": "",
            "location": "",
            "type": "",
            "brand": "",
            "group": "",
            "feature": "",
            "equip": "",
            "bed": "",
            "breakfast": "",
            "other": "",
            "star": "",
            "sl": "",
            "s": "",
            "l": "",
            "price": "",
            "a": "0",
            "keywordLat": "",
            "keywordLon": "",
            "contrast": "0",
            "PaymentType": "",
            "CtripService": "",
            "promotionf": "",
            "allpoint": "",
            "page_id_forlog": "102002",
            "contyped": "0",
            "productcode": "",
            "eleven": resp.data,
            "orderby": "3",
            "ordertype": "0",
            "page": "1",
        }
        headers = {
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
            "referer": "https://hotels.ctrip.com/hotel/shanghai2",

            # 请在此处写入你的cookie,因为携程会检测cookie的ip字段(经过混淆加密)
            "cookie": "magicid=FJX/5ExtyoVkMyAGBGjEvUNe8oBFlbc4tn2hqy08bNHBaLSQv4yIN4/TI76Mhhde; ASP.NET_SessionId=e2nzxt1doszmmcrm4edbt0ku; _abtest_userid=7f2b2614-d4fc-4671-ac06-f8c51581c5b5; librauuid=P5O14kqFUsUh0kT6o9; hoteluuid=A0zFC5pm95q5CHbd; OID_ForOnlineHotel=15925349328313sbhsm1592534932893102032; _RF1=218.4.167.70; _RSG=er4aNwPYi895jgyb8icUAA; _RDG=28fd6c3c4b6355274d32e27a753c156562; _RGUID=922c899e-9790-4d68-a29e-9ac225f2ab45; _ga=GA1.2.148423127.1592534935; MKT_CKID=1592534935351.o7nh4.vlea; MKT_Pagesource=PC; _gid=GA1.2.765654809.1592825835; MKT_CKID_LMT=1592825834972; _bfa=1.1592534932831.3sbhsm.1.1592534932831.1592825831985.2.6; _bfs=1.5; hotelhst=2012709687; _bfi=p1%3D102002%26p2%3D102002%26v1%3D6%26v2%3D5; _jzqco=%7C%7C%7C%7C1592825835044%7C1.1374296378.1592534935348.1592826968402.1592827659098.1592826968402.1592827659098.undefined.0.0.5.5; __zpspc=9.2.1592825834.1592827659.4%234%7C%7C%7C%7C%7C%23; _gat=1; appFloatCnt=5"
        }
        url = "https://hotels.ctrip.com/Domestic/Tool/AjaxHotelList.aspx"
        a = requests.post(url, data=data, headers=headers)
        print(a.text)

        ws.close()


def getTime():
    return str(time.time()).replace(".", "")[0:13]


def getCallbackParam():
    f = open("./callback.js")
    context = execjs.compile(f.read())
    return context.call("getCallback")


def getContent():
    t = getTime()
    callback = getCallbackParam()
    print(callback)
    url = "https://hotels.ctrip.com/domestic/cas/oceanball?callback=%s&_=%s" % (
        callback,
        t,
    )
    headers = {
        "user-agent": "Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/16.2.2",
        "referer": "https://hotels.ctrip.com/hotel/shanghai2",
    }
    r = requests.get(url, headers=headers)

    code = (
            """
            window["%s"] = function (e) {
            var f = e();
            console.log(f);
            ws.send(f);
        };;
        """
            % callback
            + r.text
    )
    # print(code)
    ws.send(code)


# getContent()

ws = None
try:
    ws = CG_Client("ws://127.0.0.1:8014/")
    ws.connect()
    getContent()  # 如果想要多次请求，可在此处再写一个
    ws.run_forever()

except KeyboardInterrupt:
    ws.close()
