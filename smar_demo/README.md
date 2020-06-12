### 网站
    http://cfws.samr.gov.cn/
    
    访问 返回 response headers cookies
    
    1、  ciphertext          samr_demo1 生成主要和时间相关
    2、  详情页i7参数解析    pdf base64 解密 test1 写pdf
    
### 网站 搜索框 搜索

    搜索结果
    POST http://cfws.samr.gov.cn/queryDoc HTTP/1.1
    Host: cfws.samr.gov.cn
    Connection: keep-alive
    Content-Length: 765
    Accept: application/json, text/javascript, */*; q=0.01
    X-Requested-With: XMLHttpRequest
    User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36
    Content-Type: application/x-www-form-urlencoded; charset=UTF-8
    Origin: http://cfws.samr.gov.cn
    Referer: http://cfws.samr.gov.cn/list.html
    Accept-Encoding: gzip, deflate
    Accept-Language: zh-CN,zh;q=0.9
    Cookie: SHAREJSESSIONID=a05ae9f0-ac36-4af5-acec-f67bdb78265b; __jsluid_h=aae0bd6dc76b5c31a9fa9c105e569c5a
    

    ciphertext	1001101 1000110 110101 1010111 1110111 1111010 1000110 1100111 1110100 1001111 1011000 1100111 1101010 110010 110110 1010010 1100111 1000110 1101110 1010001 1101010 110001 1100101 1100010 110010 110000 110010 110000 110000 110110 110000 111001 1100101 101111 1010101 1110001 110010 1110011 1100110 1110101 1000001 1001111 1101010 1010001 1110101 110101 1101010 1011000 1110101 1110010 1100011 1001111 1010101 1000001 111101 111101
    pageNum	1
    pageSize	5
    queryCondition	[{"key":"quanwen_2","id":"渝北市监经处字(2020)6号","name":"关键词：渝北市监经处字(2020)6号"}]
    sortFields	
    
    结果    
        rowkey=5001122201612010000520
    
###     详情页
    POST http://cfws.samr.gov.cn/getDoc HTTP/1.1
    Host: cfws.samr.gov.cn
    Connection: keep-alive
    Content-Length: 468
    Accept: */*
    X-Requested-With: XMLHttpRequest
    User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36
    Content-Type: application/x-www-form-urlencoded; charset=UTF-8
    Origin: http://cfws.samr.gov.cn
    Referer: http://cfws.samr.gov.cn/detail.html?docid=5001122201612010000520
    Accept-Encoding: gzip, deflate
    Accept-Language: zh-CN,zh;q=0.9
    Cookie: SHAREJSESSIONID=d9cf13f4-880c-48f4-8439-96e7aa61b093; __jsluid_h=125a4444ce316bc267f5cace8d7423d6
    
    ciphertext	1010001 1000011 110101 110011 110110 110001 1100011 1000001 1101000 1101010 1110110 1001000 1111001 1010010 1010000 1010010 1110001 1100011 110101 1010011 1110000 1100111 110001 1101011 110010 110000 110010 110000 110000 110110 110001 110000 1101110 1000010 1000110 1001101 1101111 1101101 1101000 1101011 1100100 1001110 1100100 1010110 1010011 1000110 101111 1000011 110001 110010 1001111 1101000 1001110 1100111 111101 111101
    docid	5001122201612010000520
    
    结果 i7 解密

    
    