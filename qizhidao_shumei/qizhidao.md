##### 网址

https://www.qizhidao.com/check?searchKey=%E6%98%86%E5%B1%B1%E9%BE%99%E8%85%BE%E5%85%89%E7%94%B5%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8&tagNum=0&searchModeType=5&pageOrder=1&fromRoutePage=index&businessSourceDzlQuery=

### 请求

```
https://fp-it.portal101.cn/deviceprofile/v4
```

###### 请求ep

```
_0x1d95f0   uuid 随机   8e919698-bd48-4f9f-9f53-c207df1e75c7
publicKey  固定  MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCGwmr39OKRP1KaI4REddlpLDrcuTDh23G+ZdTerHqiN835GR+AjAcvtuLGBfYMf3eqOLHJcJ5oU/UR8ODmOSnYATDwqYpoV42lq4OzqSBgElFQXw0LDAMefo/ITfBnUD1/ZTZ+Lh2JhgP7FxtpQb1cverqhNWiO3u+4KBz69p3SQIDAQAB
ep  rsa  加密 uuid,  publicKey
```

请求data

```
{
    "protocol": 21,	
    "organization": "CSrn3Jcu7Q3n5GGcqTbb",
    "appId": "default",
    "os": "web",
    "version": "3.0.0",
    "sdkver": "3.0.0",
    "box": "JHTYc1SrpTqRzSckJucyUnRW48Yb0rK2qt7r4m+6a8tPMJA3yfUcKfqBJvgj80ywy00hdhcMOf3HLM4ACPFZyQ==",   # https://fp-it.portal101.cn/deviceprofile/v4 返回的 deviceId
    "rtype": "all",
    "smid": "202304132011157425e9428e89b2449bde2bcef9c9c98500613fe80e5f3e320",      # 数美
    "subVersion": "1.0.0",
    "time": 1387157,		# 时间间隔 调小20-50
    "plugins": "ChromePDFViewerPortableDocumentFormatinternal-pdf-viewer2,ChromiumPDFViewerPortableDocumentFormatinternal-pdf-viewer2,MicrosoftEdgePDFViewerPortableDocumentFormatinternal-pdf-viewer2,PDFViewerPortableDocumentFormatinternal-pdf-viewer2,WebKitbuilt-inPDFPortableDocumentFormatinternal-pdf-viewer2",
    "ua": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
    "canvas": "56d39775",           # 画布 随机
    "timezone": -480,				# new Date()['getTimezoneOffset']()
    "platform": "Win32",
    "url": "https://www.qizhidao.com/check?searchKey=%E6%98%86%E5%B1%B1%E9%BE%99%E8%85%BE%E5%85%89%E7%94%B5%E8%8",
    "referer": "",
    "res": "1920_1080_24_1",		# width,height,colorDepth,devicePixelRatio
    "clientSize": "-32000_-32000_1424_0_1920_1080_1920_1040",	# '0_0_1920_0_1920_1080_1920_1040'
    "status": "0010",
    "vpw": "033fac3f-8fbc-4702-aac7-8f879a5c02c8",		# getUid
    "svm": 1681439149424,								# 当前时间戳
    "trees": "9faba4de-f5c1-47c3-9cd2-3ae996d84b3a",	# getUid
    "pmf": 1681439149424								# 当前时间戳
}

https://www.qizhidao.com/lib/smConfig.js

	返回结果有organization， publicKey （RSA加密）可固定

	搜索关键词 aesEncrypt

```

```
gzip 压缩结果 todo _0x307804   *****
Bht6BQAAsmAesData    aesEncrypt   priId  md5(uuid)[0: 16]   f53a316d1d7d2742 
CBC  偏移量 0102030405060708    HEX编码data 
smAesData   _0x307804 
```