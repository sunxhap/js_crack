
### 网站
    携程eleven参数
    
    北京
    https://hotels.ctrip.com/hotel/beijing1#ctm_ref=hod_hp_sb_lst
    
    上海
    https://hotels.ctrip.com/hotel/shanghai2#ctm_ref=hod_hp_sb_lst
    
    参考 https://www.cnblogs.com/re-is-good/p/12864805.html
    
    eleven 生成
    https://hotels.ctrip.com/domestic/cas/oceanball?callback=CASvZhuTfmqxzGqRMl&_=1592552876624:formatted
    
    列表页请求重发失效， 有参数只能使用一次
    
    websocket 代码的启动顺序
    1. 启动node websocket服务 node_server.js
    2. 添加油猴脚本 hotels_websocket.js 刷新携程网页，F12后查看是否连接上了node websocket服务
        注意油猴脚本  @match    https://hotels.ctrip.com/*
            打开页面匹配的url, 否则无法执行
    3. 启动python代码  hotels_get.py
    
    参数
        data 
            eleven
            
        cookie 
            set_cookie
                magicid=7EpT9cLVBOspX7pX8nvB5nsHYeCB1YWNgECfvpH0nYjBaLSQv4yIN4/TI76Mhhde;
                ASP.NET_SessionId=awhfmtyrcu4zmfk21qeucxxj; 
                _abtest_userid=62921bf6-71dd-48ee-b75d-92303a45da1e;
            
            待看
                librauuid=P5O14kqFUsUh0kT6o9; 
                hoteluuid=A0zFC5pm95q5CHbd; 
                _bfa=1.1592537219374.3bvyda.1.1592537219374.1592537219374.1.1; 
                _bfs=1.1; 
                OID_ForOnlineHotel=15925372193743bvyda1592537219885102032; 
                hotelhst=2012709687
    
#### 列表页请求
    curl 'https://hotels.ctrip.com/Domestic/Tool/AjaxHotelList.aspx' -H 'authority: hotels.ctrip.com' -H 'pragma: no-cache' -H 'cache-control: no-cache' -H 'sec-fetch-dest: empty' -H 'if-modified-since: Thu, 01 Jan 1970 00:00:00 GMT' -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36' -H 'content-type: application/x-www-form-urlencoded; charset=UTF-8' -H 'accept: */*' -H 'origin: https://hotels.ctrip.com' -H 'sec-fetch-site: same-origin' -H 'sec-fetch-mode: cors' -H 'referer: https://hotels.ctrip.com/hotel/beijing1' -H 'accept-language: zh-CN,zh;q=0.9' -H 'cookie: magicid=hAYUYmXmUjuaHkvXxxmXr32QeOHv9Bto6Md6pTCFvafBaLSQv4yIN4/TI76Mhhde; ASP.NET_SessionId=e54dtc4izx3c2fyjwjrhttfr; _abtest_userid=5ddde24f-9119-48d5-b67f-7506e81db3cf; librauuid=P5O14kqFUsUh0kT6o9; hoteluuid=A0zFC5pm95q5CHbd; _bfa=1.1592536529360.nhi64.1.1592536529360.1592536529360.1.1; _bfs=1.1; OID_ForOnlineHotel=1592536529360nhi641592536529822102032; hotelhst=2012709687' --data '__VIEWSTATEGENERATOR=DB1FBB6D&cityName=%25E5%258C%2597%25E4%25BA%25AC&StartTime=2020-06-19&DepTime=2020-06-20&RoomGuestCount=1%2C1%2C0&txtkeyword=&Resource=&Room=&Paymentterm=&BRev=&Minstate=&PromoteType=&PromoteDate=&operationtype=NEWHOTELORDER&PromoteStartDate=&PromoteEndDate=&OrderID=&RoomNum=&IsOnlyAirHotel=F&cityId=1&cityPY=beijing&cityCode=010&cityLat=39.9105329229&cityLng=116.413784021&positionArea=&positionId=&hotelposition=&keyword=&hotelId=&htlPageView=0&hotelType=F&hasPKGHotel=F&requestTravelMoney=F&isusergiftcard=F&useFG=F&HotelEquipment=&priceRange=-2&hotelBrandId=&promotion=F&prepay=F&IsCanReserve=F&OrderBy=99&OrderType=&k1=&k2=&CorpPayType=&viewType=&checkIn=2020-06-19&checkOut=2020-06-20&DealSale=&ulogin=&hidTestLat=0%257C0&AllHotelIds=&psid=&isfromlist=T&ubt_price_key=htl_search_noresult_promotion&showwindow=&defaultcoupon=&isHuaZhu=False&hotelPriceLow=&unBookHotelTraceCode=&showTipFlg=&traceAdContextId=&allianceid=0&sid=0&pyramidHotels=&hotelIds=&markType=0&page=1&zone=&location=&type=&brand=&group=&feature=&equip=&bed=&breakfast=&other=&star=&sl=&s=&l=&price=&a=0&keywordLat=&keywordLon=&contrast=0&PaymentType=&CtripService=&promotionf=&allpoint=&page_id_forlog=102032&contyped=0&productcode=&eleven=6928f9bd705bc06d5828845fe204cec4971aa8fef0d67122ef0121ac1f973fd0_3321316024' --compressed

    POST https://hotels.ctrip.com/Domestic/Tool/AjaxHotelList.aspx HTTP/1.1
    Host: hotels.ctrip.com
    Connection: keep-alive
    Content-Length: 1311
    Cache-Control: max-age=0
    Sec-Fetch-Dest: empty
    If-Modified-Since: Thu, 01 Jan 1970 00:00:00 GMT
    User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36
    Content-Type: application/x-www-form-urlencoded; charset=UTF-8
    Accept: */*
    Origin: https://hotels.ctrip.com
    Sec-Fetch-Site: same-origin
    Sec-Fetch-Mode: cors
    Referer: https://hotels.ctrip.com/hotel/beijing1
    Accept-Encoding: gzip, deflate, br
    Accept-Language: zh-CN,zh;q=0.9
    Cookie: magicid=hhIcUCJxTedUgt6yJYfuaDc3GlrYeqGgjmpCC4rCEXLBaLSQv4yIN4/TI76Mhhde; ASP.NET_SessionId=kdepavgxcttmg5xe51rfdmxs; _abtest_userid=b2a3dcb9-d491-4ad0-a057-3fe5e02b77fc; librauuid=P5O14kqFUsUh0kT6o9; hoteluuid=A0zFC5pm95q5CHbd; _bfa=1.1592535475794.e1rao.1.1592535475794.1592535475794.1.1; _bfs=1.1; OID_ForOnlineHotel=1592535475794e1rao1592535475835102032; hotelhst=2012709687
    
    __VIEWSTATEGENERATOR=DB1FBB6D&cityName=%25E5%258C%2597%25E4%25BA%25AC&StartTime=2020-06-19&DepTime=2020-06-20&RoomGuestCount=1%2C1%2C0&txtkeyword=&Resource=&Room=&Paymentterm=&BRev=&Minstate=&PromoteType=&PromoteDate=&operationtype=NEWHOTELORDER&PromoteStartDate=&PromoteEndDate=&OrderID=&RoomNum=&IsOnlyAirHotel=F&cityId=1&cityPY=beijing&cityCode=010&cityLat=39.9105329229&cityLng=116.413784021&positionArea=&positionId=&hotelposition=&keyword=&hotelId=&htlPageView=0&hotelType=F&hasPKGHotel=F&requestTravelMoney=F&isusergiftcard=F&useFG=F&HotelEquipment=&priceRange=-2&hotelBrandId=&promotion=F&prepay=F&IsCanReserve=F&OrderBy=99&OrderType=&k1=&k2=&CorpPayType=&viewType=&checkIn=2020-06-19&checkOut=2020-06-20&DealSale=&ulogin=&hidTestLat=0%257C0&AllHotelIds=&psid=&isfromlist=T&ubt_price_key=htl_search_noresult_promotion&showwindow=&defaultcoupon=&isHuaZhu=False&hotelPriceLow=&unBookHotelTraceCode=&showTipFlg=&traceAdContextId=&allianceid=0&sid=0&pyramidHotels=&hotelIds=&markType=0&page=1&zone=&location=&type=&brand=&group=&feature=&equip=&bed=&breakfast=&other=&star=&sl=&s=&l=&price=&a=0&keywordLat=&keywordLon=&contrast=0&PaymentType=&CtripService=&promotionf=&allpoint=&page_id_forlog=102032&contyped=0&productcode=&eleven=e59961a59e5f0214015872c433fd7cadf728521d2d047d9cebc7819e538f85c5_3321276259
   
### 断点

    https://webresource.c-ctrip.com/ResHotelOnline/R9/search/js.merge/showhotellist.js?releaseno=2020-06-19-18-12-16:formatted
     var a = "";
            i = !0;
            try {
                a = e()
            } catch (o) {
                $.ajax("
     
     e() 
     
     cas.js
     return _unknown_fe6dc(i.apply(h._unknown_29349 || _unknown_3188c, g), _unknown_d9bde, _unknown_d9bde, 0),