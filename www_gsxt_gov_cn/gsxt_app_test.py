# -*- coding: utf-8 -*-
# @Time: 2019/12/9 15:05

import collections
import requests
import re
import urllib.parse


def str_to_dict(headerStr):
    rdict = dict()
    if headerStr.strip():
        for headItem in headerStr.split("\n"):
            parm = headItem.split(":", 1)  # 切分2
            if parm[0].strip():
                rdict[parm[0].strip()] = headItem[(headItem.index(parm[0]) + parm[0].__len__() + 1):].strip()
            # rdict[parm[0].strip()] = parm[1].strip()
    return rdict


# headers = str_to_dict("""
#     X-Requested-With: XMLHttpRequest
#     Content-Type: application/json;charset=utf-8
#     Accept: application/json
#     User-Agent: Mozilla/5.0 (Linux; Android 5.1.1; vivo x6d Build/LMY48Z; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/52.0.2743.100 Mobile Safari/537.36 Html5Plus/1.0
#     Host: app.gsxt.gov.cn
#     Connection: Keep-Alive
#     Accept-Encoding: gzip
#     Content-Length: 143
#         """)

headers = {'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/json;charset=utf-8',
           'Accept': 'application/json',
           'User-Agent': 'Mozilla/5.0 (Linux; Android 5.1.1; vivo x6d Build/LMY48Z; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/52.0.2743.100 Mobile Safari/537.36 Html5Plus/1.0',
           'Host': 'app.gsxt.gov.cn', 'Connection': 'Keep-Alive', 'Accept-Encoding': 'gzip', 'Content-Length': '143'}

print('headers', headers)

url = "http://app.gsxt.gov.cn/gsxt/cn/gov/saic/web/controller/PrimaryInfoIndexAppController/search?page=1"

data = """{"searchword":"小米","conditions":{"excep_tab":"0","ill_tab":"0","area":"0","cStatus":"0","xzxk":"0","xzcf":"0","dydj":"0"},"sourceType":"A"}"""

# proxies = {"http": "https://" + ip, "https": "https://" + ip}
# , proxies=proxies
# res = requests.post(url, headers=headers, data=data, verify=False, proxies=proxies)

# print(urllib.parse.urlencode(data))
res = requests.post(url, headers=headers, data=data.encode("utf-8"), verify=False)
# print(res.encoding)
print(res.content.decode(res.encoding))
print(res.content)
print(res.status_code)
print(res.cookies)

# 统一社会信用代码  法定代表人   成立日期

"""
{
	"code": "",
	"data": {
		"result": {
			"draw": 1,
			"recordsTotal": 100,
			"recordsFiltered": 0,
			"perPage": 10,
			"start": 0,
			"data": [{
				"islicense": "0",
				"isPublicPeriod": null,
				"noticeFrom": null,
				"noticeTo": null,
				"simpleCanrea": "",
				"pripid": "A72B81C7A9364835641A5C1B4A346E7D7E9B729B729BF149A049A049A0494A1758417A411CF92D47-1577784458105",
				"entName": "湖北<font color=red>小米</font>长江产业基金合伙企业（有限合伙）",
				"corpStatus": 1,
				"corpStatusString": "存续（在营、开业、在册）",
				"corpStatusDate": null,
				"corpStatusReason": null,
				"regNo": "420100000890978",
				"uniscId": "91420100MA4KX8N35J",
				"legelRep": "湖北小米长江产业投资基金管理有限公司",
				"entType": 4533,
				"entTypeString": "有限合伙企业",
				"entTypeCn": "有限合伙企业",
				"estDate": "2017-12-07",
				"regOrg": "武汉东湖新技术开发区市场监督管理局",
				"regCap": 1161000.0,
				"opFrom": null,
				"opTo": null,
				"busExceptCount": 0,
				"illCount": 0,
				"nodeNum": "420000",
				"historyName": null
			}, {
				"islicense": "0",
				"isPublicPeriod": null,
				"noticeFrom": null,
				"noticeTo": null,
				"simpleCanrea": "",
				"pripid": "8B07ADEB851A641948367037661842513B51B851B851B45D94DBE04B70898AC5C6AC07FEB17891FBF8B7B451B4FB325EBB5E11127E9B-1577784458105",
				"entName": "<font color=red>小米</font>数字科技有限公司",
				"corpStatus": 1,
				"corpStatusString": "开业",
				"corpStatusDate": null,
				"corpStatusReason": null,
				"regNo": "110302016621550",
				"uniscId": "91110302089670122N",
				"legelRep": "洪锋",
				"entType": 1123,
				"entTypeString": "有限责任公司(外商投资企业法人独资)",
				"entTypeCn": "有限责任公司(外商投资企业法人独资)",
				"estDate": "2013-12-26",
				"regOrg": "北京市工商行政管理局北京经济技术开发区分局",
				"regCap": 231363.0,
				"opFrom": null,
				"opTo": null,
				"busExceptCount": 0,
				"illCount": 0,
				"nodeNum": "110000",
				"historyName": null
			}, {
				"islicense": "0",
				"isPublicPeriod": null,
				"noticeFrom": null,
				"noticeTo": null,
				"simpleCanrea": "",
				"pripid": "7DF15B1D73EC92EFBEC086C190EEB4A7CDA74EA74EA742AB622D16BD862D2E96FA03A8B1A8CA23494AF290F2BDF2BD05D1EA52B7DBB1-1577784458105",
				"entName": "北京<font color=red>小米</font>电子软件技术有限公司",
				"corpStatus": 1,
				"corpStatusString": "开业",
				"corpStatusDate": null,
				"corpStatusReason": null,
				"regNo": "110000450261811",
				"uniscId": "91110302097102694H",
				"legelRep": "林斌",
				"entType": 1130,
				"entTypeString": "有限责任公司(自然人投资或控股)",
				"entTypeCn": "有限责任公司(自然人投资或控股)",
				"estDate": "2014-07-01",
				"regOrg": "北京市工商行政管理局北京经济技术开发区分局",
				"regCap": 207100.1956,
				"opFrom": null,
				"opTo": null,
				"busExceptCount": 0,
				"illCount": 0,
				"nodeNum": "110000",
				"historyName": null
			}, {
				"islicense": "0",
				"isPublicPeriod": null,
				"noticeFrom": null,
				"noticeTo": null,
				"simpleCanrea": "",
				"pripid": "CA46ECAAC45B255809773176275903107A10F910F9108EE47A108EE47A9376CE65DD9239201BF2987D6481EB229A046E04AF462C94F8-1577784458105",
				"entName": "<font color=red>小米</font>科技有限责任公司",
				"corpStatus": 1,
				"corpStatusString": "开业",
				"corpStatusDate": null,
				"corpStatusReason": null,
				"regNo": "110108012660422",
				"uniscId": "91110108551385082Q",
				"legelRep": "雷军",
				"entType": 1130,
				"entTypeString": "有限责任公司(自然人投资或控股)",
				"entTypeCn": "有限责任公司(自然人投资或控股)",
				"estDate": "2010-03-03",
				"regOrg": "北京市工商行政管理局海淀分局",
				"regCap": 185000.0,
				"opFrom": null,
				"opTo": null,
				"busExceptCount": 0,
				"illCount": 0,
				"nodeNum": "110000",
				"historyName": null
			}, {
				"islicense": "0",
				"isPublicPeriod": null,
				"noticeFrom": null,
				"noticeTo": null,
				"simpleCanrea": "",
				"pripid": "71FD57117FE09EE3B2CC8ACD9CE2B8ABA8AB42AB42ABA8AB4228C1ABC12842ABC124CDA7739AC7ADB45DB4FB9192-1577784458105",
				"entName": "广东<font color=red>小米</font>科技有限责任公司",
				"corpStatus": 1,
				"corpStatusString": "在营（开业）企业",
				"corpStatusDate": null,
				"corpStatusReason": null,
				"regNo": "440101000376086",
				"uniscId": "91440101MA59A5P606",
				"legelRep": "雷军",
				"entType": 1152,
				"entTypeString": "有限责任公司(法人独资)",
				"entTypeCn": "有限责任公司(法人独资)",
				"estDate": "2015-09-21",
				"regOrg": "广州市市场监督管理局",
				"regCap": 100000.0,
				"opFrom": null,
				"opTo": null,
				"busExceptCount": 0,
				"illCount": 0,
				"nodeNum": "440000",
				"historyName": null
			}, {
				"islicense": "0",
				"isPublicPeriod": null,
				"noticeFrom": null,
				"noticeTo": null,
				"simpleCanrea": "",
				"pripid": "CD41EBADC35C225F0E703671205E04171417FE17FE171417FE947D177D94FE177D98711BA34A17F298719881CE76-1577784458105",
				"entName": "广州<font color=red>小米</font>通讯技术有限公司",
				"corpStatus": 1,
				"corpStatusString": "在营（开业）企业",
				"corpStatusDate": null,
				"corpStatusReason": null,
				"regNo": "440101000464205",
				"uniscId": "91440101MA59F1JU5Q",
				"legelRep": "王川",
				"entType": 1123,
				"entTypeString": "有限责任公司(外商投资企业法人独资)",
				"entTypeCn": "有限责任公司(外商投资企业法人独资)",
				"estDate": "2016-09-22",
				"regOrg": "广州市海珠区市场监督管理局",
				"regCap": 95100.0,
				"opFrom": null,
				"opTo": null,
				"busExceptCount": 0,
				"illCount": 0,
				"nodeNum": "440000",
				"historyName": null
			}, {
				"islicense": "0",
				"isPublicPeriod": null,
				"noticeFrom": null,
				"noticeTo": null,
				"simpleCanrea": "",
				"pripid": "CA46ECAAC45B255809773176275903101310F910F9101310F9B65FB65FB65FB6DC39D0BAE70E53B6EB0201D5D6D5-1577784458105",
				"entName": "深圳<font color=red>小米</font>信息技术有限公司",
				"corpStatus": 1,
				"corpStatusString": "存续（在营、开业、在册）",
				"corpStatusDate": null,
				"corpStatusReason": null,
				"regNo": "440300208185786",
				"uniscId": "91440300MA5FU62M2T",
				"legelRep": "林斌",
				"entType": 1152,
				"entTypeString": "有限责任公司（法人独资）",
				"entTypeCn": "有限责任公司（法人独资）",
				"estDate": "2019-09-29",
				"regOrg": "深圳市市场监督管理局",
				"regCap": 65000.0,
				"opFrom": null,
				"opTo": null,
				"busExceptCount": 0,
				"illCount": 0,
				"nodeNum": "440000",
				"historyName": null
			}, {
				"islicense": "0",
				"isPublicPeriod": null,
				"noticeFrom": null,
				"noticeTo": null,
				"simpleCanrea": "",
				"pripid": "46CA602648D7A9D485FBBDFAABD58F9C48A148A148A1759C7528C1157F9A7319CD24F09AA1CB2248A1B8511E-1577784458105",
				"entName": "重庆市<font color=red>小米</font>小额贷款有限公司",
				"corpStatus": 1,
				"corpStatusString": "存续(在营、开业、在册)",
				"corpStatusDate": null,
				"corpStatusReason": null,
				"regNo": "500000403406380",
				"uniscId": "91500000336398171R",
				"legelRep": "洪锋",
				"entType": 6150,
				"entTypeString": "有限责任公司(台港澳法人独资)",
				"entTypeCn": "有限责任公司(台港澳法人独资)",
				"estDate": "2015-06-12",
				"regOrg": "重庆市市场监督管理局",
				"regCap": 45000.0,
				"opFrom": null,
				"opTo": null,
				"busExceptCount": 0,
				"illCount": 0,
				"nodeNum": "500000",
				"historyName": null
			}, {
				"islicense": "0",
				"isPublicPeriod": null,
				"noticeFrom": null,
				"noticeTo": null,
				"simpleCanrea": "",
				"pripid": "A72B81C7A9364835641A5C1B4A346E7D17F21BF21BF2F1E8829B23499D64B0FF36FFC45A8E67CCD5306D8450CEACE37D7E31D42D866F-1577784458105",
				"entName": "<font color=red>小米</font>商业保理（天津）有限责任公司",
				"corpStatus": 1,
				"corpStatusString": "存续（在营、开业、在册）",
				"corpStatusDate": null,
				"corpStatusReason": null,
				"regNo": "120118400019778",
				"uniscId": "91120118MA06APGQXE",
				"legelRep": "洪锋",
				"entType": 6150,
				"entTypeString": "有限责任公司(台港澳法人独资)    ",
				"entTypeCn": "有限责任公司(台港澳法人独资)    ",
				"estDate": "2018-03-21",
				"regOrg": "天津市自由贸易试验区市场和质量监督管理局",
				"regCap": 38000.0,
				"opFrom": null,
				"opTo": null,
				"busExceptCount": 0,
				"illCount": 0,
				"nodeNum": "120000",
				"historyName": null
			}, {
				"islicense": "0",
				"isPublicPeriod": null,
				"noticeFrom": null,
				"noticeTo": null,
				"simpleCanrea": "",
				"pripid": "921EB4F29C037D00512F692E7F015B482248A148A148AD448DC2F95269C28D94FE1714ED87628BE1AEB752CC91787B171478AC450A68-1577784458105",
				"entName": "北京<font color=red>小米</font>移动软件有限公司",
				"corpStatus": 1,
				"corpStatusString": "开业",
				"corpStatusDate": null,
				"corpStatusReason": null,
				"regNo": "110108014880444",
				"uniscId": "91110108596084056A",
				"legelRep": "王川",
				"entType": 1152,
				"entTypeString": "有限责任公司(法人独资)",
				"entTypeCn": "有限责任公司(法人独资)",
				"estDate": "2012-05-08",
				"regOrg": "北京市工商行政管理局海淀分局",
				"regCap": 28800.0,
				"opFrom": null,
				"opTo": null,
				"busExceptCount": 0,
				"illCount": 0,
				"nodeNum": "110000",
				"historyName": null
			}],
			"error": "",
			"currentPage": 0,
			"totalPage": 10
		},
		"tab": null,
		"elaspedtime": "0.014",
		"searchword": "小米",
		"nickName": null,
		"subsite": "100000"
	},
	"message": "",
	"status": 200
}
b '{"code":"","data":{"result":{"draw":1,"recordsTotal":100,"recordsFiltered":0,"perPage":10,"start":0,"data":[{"islicense":"0","isPublicPeriod":null,"noticeFrom":null,"noticeTo":null,"simpleCanrea":"","pripid":"A72B81C7A9364835641A5C1B4A346E7D7E9B729B729BF149A049A049A0494A1758417A411CF92D47-1577784458105","entName":"\xe6\xb9\x96\xe5\x8c\x97<font color=red>\xe5\xb0\x8f\xe7\xb1\xb3</font>\xe9\x95\xbf\xe6\xb1\x9f\xe4\xba\xa7\xe4\xb8\x9a\xe5\x9f\xba\xe9\x87\x91\xe5\x90\x88\xe4\xbc\x99\xe4\xbc\x81\xe4\xb8\x9a\xef\xbc\x88\xe6\x9c\x89\xe9\x99\x90\xe5\x90\x88\xe4\xbc\x99\xef\xbc\x89","corpStatus":1,"corpStatusString":"\xe5\xad\x98\xe7\xbb\xad\xef\xbc\x88\xe5\x9c\xa8\xe8\x90\xa5\xe3\x80\x81\xe5\xbc\x80\xe4\xb8\x9a\xe3\x80\x81\xe5\x9c\xa8\xe5\x86\x8c\xef\xbc\x89","corpStatusDate":null,"corpStatusReason":null,"regNo":"420100000890978","uniscId":"91420100MA4KX8N35J","legelRep":"\xe6\xb9\x96\xe5\x8c\x97\xe5\xb0\x8f\xe7\xb1\xb3\xe9\x95\xbf\xe6\xb1\x9f\xe4\xba\xa7\xe4\xb8\x9a\xe6\x8a\x95\xe8\xb5\x84\xe5\x9f\xba\xe9\x87\x91\xe7\xae\xa1\xe7\x90\x86\xe6\x9c\x89\xe9\x99\x90\xe5\x85\xac\xe5\x8f\xb8","entType":4533,"entTypeString":"\xe6\x9c\x89\xe9\x99\x90\xe5\x90\x88\xe4\xbc\x99\xe4\xbc\x81\xe4\xb8\x9a","entTypeCn":"\xe6\x9c\x89\xe9\x99\x90\xe5\x90\x88\xe4\xbc\x99\xe4\xbc\x81\xe4\xb8\x9a","estDate":"2017-12-07","regOrg":"\xe6\xad\xa6\xe6\xb1\x89\xe4\xb8\x9c\xe6\xb9\x96\xe6\x96\xb0\xe6\x8a\x80\xe6\x9c\xaf\xe5\xbc\x80\xe5\x8f\x91\xe5\x8c\xba\xe5\xb8\x82\xe5\x9c\xba\xe7\x9b\x91\xe7\x9d\xa3\xe7\xae\xa1\xe7\x90\x86\xe5\xb1\x80","regCap":1161000.0,"opFrom":null,"opTo":null,"busExceptCount":0,"illCount":0,"nodeNum":"420000","historyName":null},{"islicense":"0","isPublicPeriod":null,"noticeFrom":null,"noticeTo":null,"simpleCanrea":"","pripid":"8B07ADEB851A641948367037661842513B51B851B851B45D94DBE04B70898AC5C6AC07FEB17891FBF8B7B451B4FB325EBB5E11127E9B-1577784458105","entName":"<font color=red>\xe5\xb0\x8f\xe7\xb1\xb3</font>\xe6\x95\xb0\xe5\xad\x97\xe7\xa7\x91\xe6\x8a\x80\xe6\x9c\x89\xe9\x99\x90\xe5\x85\xac\xe5\x8f\xb8","corpStatus":1,"corpStatusString":"\xe5\xbc\x80\xe4\xb8\x9a","corpStatusDate":null,"corpStatusReason":null,"regNo":"110302016621550","uniscId":"91110302089670122N","legelRep":"\xe6\xb4\xaa\xe9\x94\x8b","entType":1123,"entTypeString":"\xe6\x9c\x89\xe9\x99\x90\xe8\xb4\xa3\xe4\xbb\xbb\xe5\x85\xac\xe5\x8f\xb8(\xe5\xa4\x96\xe5\x95\x86\xe6\x8a\x95\xe8\xb5\x84\xe4\xbc\x81\xe4\xb8\x9a\xe6\xb3\x95\xe4\xba\xba\xe7\x8b\xac\xe8\xb5\x84)","entTypeCn":"\xe6\x9c\x89\xe9\x99\x90\xe8\xb4\xa3\xe4\xbb\xbb\xe5\x85\xac\xe5\x8f\xb8(\xe5\xa4\x96\xe5\x95\x86\xe6\x8a\x95\xe8\xb5\x84\xe4\xbc\x81\xe4\xb8\x9a\xe6\xb3\x95\xe4\xba\xba\xe7\x8b\xac\xe8\xb5\x84)","estDate":"2013-12-26","regOrg":"\xe5\x8c\x97\xe4\xba\xac\xe5\xb8\x82\xe5\xb7\xa5\xe5\x95\x86\xe8\xa1\x8c\xe6\x94\xbf\xe7\xae\xa1\xe7\x90\x86\xe5\xb1\x80\xe5\x8c\x97\xe4\xba\xac\xe7\xbb\x8f\xe6\xb5\x8e\xe6\x8a\x80\xe6\x9c\xaf\xe5\xbc\x80\xe5\x8f\x91\xe5\x8c\xba\xe5\x88\x86\xe5\xb1\x80","regCap":231363.0,"opFrom":null,"opTo":null,"busExceptCount":0,"illCount":0,"nodeNum":"110000","historyName":null},{"islicense":"0","isPublicPeriod":null,"noticeFrom":null,"noticeTo":null,"simpleCanrea":"","pripid":"7DF15B1D73EC92EFBEC086C190EEB4A7CDA74EA74EA742AB622D16BD862D2E96FA03A8B1A8CA23494AF290F2BDF2BD05D1EA52B7DBB1-1577784458105","entName":"\xe5\x8c\x97\xe4\xba\xac<font color=red>\xe5\xb0\x8f\xe7\xb1\xb3</font>\xe7\x94\xb5\xe5\xad\x90\xe8\xbd\xaf\xe4\xbb\xb6\xe6\x8a\x80\xe6\x9c\xaf\xe6\x9c\x89\xe9\x99\x90\xe5\x85\xac\xe5\x8f\xb8","corpStatus":1,"corpStatusString":"\xe5\xbc\x80\xe4\xb8\x9a","corpStatusDate":null,"corpStatusReason":null,"regNo":"110000450261811","uniscId":"91110302097102694H","legelRep":"\xe6\x9e\x97\xe6\x96\x8c","entType":1130,"entTypeString":"\xe6\x9c\x89\xe9\x99\x90\xe8\xb4\xa3\xe4\xbb\xbb\xe5\x85\xac\xe5\x8f\xb8(\xe8\x87\xaa\xe7\x84\xb6\xe4\xba\xba\xe6\x8a\x95\xe8\xb5\x84\xe6\x88\x96\xe6\x8e\xa7\xe8\x82\xa1)","entTypeCn":"\xe6\x9c\x89\xe9\x99\x90\xe8\xb4\xa3\xe4\xbb\xbb\xe5\x85\xac\xe5\x8f\xb8(\xe8\x87\xaa\xe7\x84\xb6\xe4\xba\xba\xe6\x8a\x95\xe8\xb5\x84\xe6\x88\x96\xe6\x8e\xa7\xe8\x82\xa1)","estDate":"2014-07-01","regOrg":"\xe5\x8c\x97\xe4\xba\xac\xe5\xb8\x82\xe5\xb7\xa5\xe5\x95\x86\xe8\xa1\x8c\xe6\x94\xbf\xe7\xae\xa1\xe7\x90\x86\xe5\xb1\x80\xe5\x8c\x97\xe4\xba\xac\xe7\xbb\x8f\xe6\xb5\x8e\xe6\x8a\x80\xe6\x9c\xaf\xe5\xbc\x80\xe5\x8f\x91\xe5\x8c\xba\xe5\x88\x86\xe5\xb1\x80","regCap":207100.1956,"opFrom":null,"opTo":null,"busExceptCount":0,"illCount":0,"nodeNum":"110000","historyName":null},{"islicense":"0","isPublicPeriod":null,"noticeFrom":null,"noticeTo":null,"simpleCanrea":"","pripid":"CA46ECAAC45B255809773176275903107A10F910F9108EE47A108EE47A9376CE65DD9239201BF2987D6481EB229A046E04AF462C94F8-1577784458105","entName":"<font color=red>\xe5\xb0\x8f\xe7\xb1\xb3</font>\xe7\xa7\x91\xe6\x8a\x80\xe6\x9c\x89\xe9\x99\x90\xe8\xb4\xa3\xe4\xbb\xbb\xe5\x85\xac\xe5\x8f\xb8","corpStatus":1,"corpStatusString":"\xe5\xbc\x80\xe4\xb8\x9a","corpStatusDate":null,"corpStatusReason":null,"regNo":"110108012660422","uniscId":"91110108551385082Q","legelRep":"\xe9\x9b\xb7\xe5\x86\x9b","entType":1130,"entTypeString":"\xe6\x9c\x89\xe9\x99\x90\xe8\xb4\xa3\xe4\xbb\xbb\xe5\x85\xac\xe5\x8f\xb8(\xe8\x87\xaa\xe7\x84\xb6\xe4\xba\xba\xe6\x8a\x95\xe8\xb5\x84\xe6\x88\x96\xe6\x8e\xa7\xe8\x82\xa1)","entTypeCn":"\xe6\x9c\x89\xe9\x99\x90\xe8\xb4\xa3\xe4\xbb\xbb\xe5\x85\xac\xe5\x8f\xb8(\xe8\x87\xaa\xe7\x84\xb6\xe4\xba\xba\xe6\x8a\x95\xe8\xb5\x84\xe6\x88\x96\xe6\x8e\xa7\xe8\x82\xa1)","estDate":"2010-03-03","regOrg":"\xe5\x8c\x97\xe4\xba\xac\xe5\xb8\x82\xe5\xb7\xa5\xe5\x95\x86\xe8\xa1\x8c\xe6\x94\xbf\xe7\xae\xa1\xe7\x90\x86\xe5\xb1\x80\xe6\xb5\xb7\xe6\xb7\x80\xe5\x88\x86\xe5\xb1\x80","regCap":185000.0,"opFrom":null,"opTo":null,"busExceptCount":0,"illCount":0,"nodeNum":"110000","historyName":null},{"islicense":"0","isPublicPeriod":null,"noticeFrom":null,"noticeTo":null,"simpleCanrea":"","pripid":"71FD57117FE09EE3B2CC8ACD9CE2B8ABA8AB42AB42ABA8AB4228C1ABC12842ABC124CDA7739AC7ADB45DB4FB9192-1577784458105","entName":"\xe5\xb9\xbf\xe4\xb8\x9c<font color=red>\xe5\xb0\x8f\xe7\xb1\xb3</font>\xe7\xa7\x91\xe6\x8a\x80\xe6\x9c\x89\xe9\x99\x90\xe8\xb4\xa3\xe4\xbb\xbb\xe5\x85\xac\xe5\x8f\xb8","corpStatus":1,"corpStatusString":"\xe5\x9c\xa8\xe8\x90\xa5\xef\xbc\x88\xe5\xbc\x80\xe4\xb8\x9a\xef\xbc\x89\xe4\xbc\x81\xe4\xb8\x9a","corpStatusDate":null,"corpStatusReason":null,"regNo":"440101000376086","uniscId":"91440101MA59A5P606","legelRep":"\xe9\x9b\xb7\xe5\x86\x9b","entType":1152,"entTypeString":"\xe6\x9c\x89\xe9\x99\x90\xe8\xb4\xa3\xe4\xbb\xbb\xe5\x85\xac\xe5\x8f\xb8(\xe6\xb3\x95\xe4\xba\xba\xe7\x8b\xac\xe8\xb5\x84)","entTypeCn":"\xe6\x9c\x89\xe9\x99\x90\xe8\xb4\xa3\xe4\xbb\xbb\xe5\x85\xac\xe5\x8f\xb8(\xe6\xb3\x95\xe4\xba\xba\xe7\x8b\xac\xe8\xb5\x84)","estDate":"2015-09-21","regOrg":"\xe5\xb9\xbf\xe5\xb7\x9e\xe5\xb8\x82\xe5\xb8\x82\xe5\x9c\xba\xe7\x9b\x91\xe7\x9d\xa3\xe7\xae\xa1\xe7\x90\x86\xe5\xb1\x80","regCap":100000.0,"opFrom":null,"opTo":null,"busExceptCount":0,"illCount":0,"nodeNum":"440000","historyName":null},{"islicense":"0","isPublicPeriod":null,"noticeFrom":null,"noticeTo":null,"simpleCanrea":"","pripid":"CD41EBADC35C225F0E703671205E04171417FE17FE171417FE947D177D94FE177D98711BA34A17F298719881CE76-1577784458105","entName":"\xe5\xb9\xbf\xe5\xb7\x9e<font color=red>\xe5\xb0\x8f\xe7\xb1\xb3</font>\xe9\x80\x9a\xe8\xae\xaf\xe6\x8a\x80\xe6\x9c\xaf\xe6\x9c\x89\xe9\x99\x90\xe5\x85\xac\xe5\x8f\xb8","corpStatus":1,"corpStatusString":"\xe5\x9c\xa8\xe8\x90\xa5\xef\xbc\x88\xe5\xbc\x80\xe4\xb8\x9a\xef\xbc\x89\xe4\xbc\x81\xe4\xb8\x9a","corpStatusDate":null,"corpStatusReason":null,"regNo":"440101000464205","uniscId":"91440101MA59F1JU5Q","legelRep":"\xe7\x8e\x8b\xe5\xb7\x9d","entType":1123,"entTypeString":"\xe6\x9c\x89\xe9\x99\x90\xe8\xb4\xa3\xe4\xbb\xbb\xe5\x85\xac\xe5\x8f\xb8(\xe5\xa4\x96\xe5\x95\x86\xe6\x8a\x95\xe8\xb5\x84\xe4\xbc\x81\xe4\xb8\x9a\xe6\xb3\x95\xe4\xba\xba\xe7\x8b\xac\xe8\xb5\x84)","entTypeCn":"\xe6\x9c\x89\xe9\x99\x90\xe8\xb4\xa3\xe4\xbb\xbb\xe5\x85\xac\xe5\x8f\xb8(\xe5\xa4\x96\xe5\x95\x86\xe6\x8a\x95\xe8\xb5\x84\xe4\xbc\x81\xe4\xb8\x9a\xe6\xb3\x95\xe4\xba\xba\xe7\x8b\xac\xe8\xb5\x84)","estDate":"2016-09-22","regOrg":"\xe5\xb9\xbf\xe5\xb7\x9e\xe5\xb8\x82\xe6\xb5\xb7\xe7\x8f\xa0\xe5\x8c\xba\xe5\xb8\x82\xe5\x9c\xba\xe7\x9b\x91\xe7\x9d\xa3\xe7\xae\xa1\xe7\x90\x86\xe5\xb1\x80","regCap":95100.0,"opFrom":null,"opTo":null,"busExceptCount":0,"illCount":0,"nodeNum":"440000","historyName":null},{"islicense":"0","isPublicPeriod":null,"noticeFrom":null,"noticeTo":null,"simpleCanrea":"","pripid":"CA46ECAAC45B255809773176275903101310F910F9101310F9B65FB65FB65FB6DC39D0BAE70E53B6EB0201D5D6D5-1577784458105","entName":"\xe6\xb7\xb1\xe5\x9c\xb3<font color=red>\xe5\xb0\x8f\xe7\xb1\xb3</font>\xe4\xbf\xa1\xe6\x81\xaf\xe6\x8a\x80\xe6\x9c\xaf\xe6\x9c\x89\xe9\x99\x90\xe5\x85\xac\xe5\x8f\xb8","corpStatus":1,"corpStatusString":"\xe5\xad\x98\xe7\xbb\xad\xef\xbc\x88\xe5\x9c\xa8\xe8\x90\xa5\xe3\x80\x81\xe5\xbc\x80\xe4\xb8\x9a\xe3\x80\x81\xe5\x9c\xa8\xe5\x86\x8c\xef\xbc\x89","corpStatusDate":null,"corpStatusReason":null,"regNo":"440300208185786","uniscId":"91440300MA5FU62M2T","legelRep":"\xe6\x9e\x97\xe6\x96\x8c","entType":1152,"entTypeString":"\xe6\x9c\x89\xe9\x99\x90\xe8\xb4\xa3\xe4\xbb\xbb\xe5\x85\xac\xe5\x8f\xb8\xef\xbc\x88\xe6\xb3\x95\xe4\xba\xba\xe7\x8b\xac\xe8\xb5\x84\xef\xbc\x89","entTypeCn":"\xe6\x9c\x89\xe9\x99\x90\xe8\xb4\xa3\xe4\xbb\xbb\xe5\x85\xac\xe5\x8f\xb8\xef\xbc\x88\xe6\xb3\x95\xe4\xba\xba\xe7\x8b\xac\xe8\xb5\x84\xef\xbc\x89","estDate":"2019-09-29","regOrg":"\xe6\xb7\xb1\xe5\x9c\xb3\xe5\xb8\x82\xe5\xb8\x82\xe5\x9c\xba\xe7\x9b\x91\xe7\x9d\xa3\xe7\xae\xa1\xe7\x90\x86\xe5\xb1\x80","regCap":65000.0,"opFrom":null,"opTo":null,"busExceptCount":0,"illCount":0,"nodeNum":"440000","historyName":null},{"islicense":"0","isPublicPeriod":null,"noticeFrom":null,"noticeTo":null,"simpleCanrea":"","pripid":"46CA602648D7A9D485FBBDFAABD58F9C48A148A148A1759C7528C1157F9A7319CD24F09AA1CB2248A1B8511E-1577784458105","entName":"\xe9\x87\x8d\xe5\xba\x86\xe5\xb8\x82<font color=red>\xe5\xb0\x8f\xe7\xb1\xb3</font>\xe5\xb0\x8f\xe9\xa2\x9d\xe8\xb4\xb7\xe6\xac\xbe\xe6\x9c\x89\xe9\x99\x90\xe5\x85\xac\xe5\x8f\xb8","corpStatus":1,"corpStatusString":"\xe5\xad\x98\xe7\xbb\xad(\xe5\x9c\xa8\xe8\x90\xa5\xe3\x80\x81\xe5\xbc\x80\xe4\xb8\x9a\xe3\x80\x81\xe5\x9c\xa8\xe5\x86\x8c)","corpStatusDate":null,"corpStatusReason":null,"regNo":"500000403406380","uniscId":"91500000336398171R","legelRep":"\xe6\xb4\xaa\xe9\x94\x8b","entType":6150,"entTypeString":"\xe6\x9c\x89\xe9\x99\x90\xe8\xb4\xa3\xe4\xbb\xbb\xe5\x85\xac\xe5\x8f\xb8(\xe5\x8f\xb0\xe6\xb8\xaf\xe6\xbe\xb3\xe6\xb3\x95\xe4\xba\xba\xe7\x8b\xac\xe8\xb5\x84)","entTypeCn":"\xe6\x9c\x89\xe9\x99\x90\xe8\xb4\xa3\xe4\xbb\xbb\xe5\x85\xac\xe5\x8f\xb8(\xe5\x8f\xb0\xe6\xb8\xaf\xe6\xbe\xb3\xe6\xb3\x95\xe4\xba\xba\xe7\x8b\xac\xe8\xb5\x84)","estDate":"2015-06-12","regOrg":"\xe9\x87\x8d\xe5\xba\x86\xe5\xb8\x82\xe5\xb8\x82\xe5\x9c\xba\xe7\x9b\x91\xe7\x9d\xa3\xe7\xae\xa1\xe7\x90\x86\xe5\xb1\x80","regCap":45000.0,"opFrom":null,"opTo":null,"busExceptCount":0,"illCount":0,"nodeNum":"500000","historyName":null},{"islicense":"0","isPublicPeriod":null,"noticeFrom":null,"noticeTo":null,"simpleCanrea":"","pripid":"A72B81C7A9364835641A5C1B4A346E7D17F21BF21BF2F1E8829B23499D64B0FF36FFC45A8E67CCD5306D8450CEACE37D7E31D42D866F-1577784458105","entName":"<font color=red>\xe5\xb0\x8f\xe7\xb1\xb3</font>\xe5\x95\x86\xe4\xb8\x9a\xe4\xbf\x9d\xe7\x90\x86\xef\xbc\x88\xe5\xa4\xa9\xe6\xb4\xa5\xef\xbc\x89\xe6\x9c\x89\xe9\x99\x90\xe8\xb4\xa3\xe4\xbb\xbb\xe5\x85\xac\xe5\x8f\xb8","corpStatus":1,"corpStatusString":"\xe5\xad\x98\xe7\xbb\xad\xef\xbc\x88\xe5\x9c\xa8\xe8\x90\xa5\xe3\x80\x81\xe5\xbc\x80\xe4\xb8\x9a\xe3\x80\x81\xe5\x9c\xa8\xe5\x86\x8c\xef\xbc\x89","corpStatusDate":null,"corpStatusReason":null,"regNo":"120118400019778","uniscId":"91120118MA06APGQXE","legelRep":"\xe6\xb4\xaa\xe9\x94\x8b","entType":6150,"entTypeString":"\xe6\x9c\x89\xe9\x99\x90\xe8\xb4\xa3\xe4\xbb\xbb\xe5\x85\xac\xe5\x8f\xb8(\xe5\x8f\xb0\xe6\xb8\xaf\xe6\xbe\xb3\xe6\xb3\x95\xe4\xba\xba\xe7\x8b\xac\xe8\xb5\x84)    ","entTypeCn":"\xe6\x9c\x89\xe9\x99\x90\xe8\xb4\xa3\xe4\xbb\xbb\xe5\x85\xac\xe5\x8f\xb8(\xe5\x8f\xb0\xe6\xb8\xaf\xe6\xbe\xb3\xe6\xb3\x95\xe4\xba\xba\xe7\x8b\xac\xe8\xb5\x84)    ","estDate":"2018-03-21","regOrg":"\xe5\xa4\xa9\xe6\xb4\xa5\xe5\xb8\x82\xe8\x87\xaa\xe7\x94\xb1\xe8\xb4\xb8\xe6\x98\x93\xe8\xaf\x95\xe9\xaa\x8c\xe5\x8c\xba\xe5\xb8\x82\xe5\x9c\xba\xe5\x92\x8c\xe8\xb4\xa8\xe9\x87\x8f\xe7\x9b\x91\xe7\x9d\xa3\xe7\xae\xa1\xe7\x90\x86\xe5\xb1\x80","regCap":38000.0,"opFrom":null,"opTo":null,"busExceptCount":0,"illCount":0,"nodeNum":"120000","historyName":null},{"islicense":"0","isPublicPeriod":null,"noticeFrom":null,"noticeTo":null,"simpleCanrea":"","pripid":"921EB4F29C037D00512F692E7F015B482248A148A148AD448DC2F95269C28D94FE1714ED87628BE1AEB752CC91787B171478AC450A68-1577784458105","entName":"\xe5\x8c\x97\xe4\xba\xac<font color=red>\xe5\xb0\x8f\xe7\xb1\xb3</font>\xe7\xa7\xbb\xe5\x8a\xa8\xe8\xbd\xaf\xe4\xbb\xb6\xe6\x9c\x89\xe9\x99\x90\xe5\x85\xac\xe5\x8f\xb8","corpStatus":1,"corpStatusString":"\xe5\xbc\x80\xe4\xb8\x9a","corpStatusDate":null,"corpStatusReason":null,"regNo":"110108014880444","uniscId":"91110108596084056A","legelRep":"\xe7\x8e\x8b\xe5\xb7\x9d","entType":1152,"entTypeString":"\xe6\x9c\x89\xe9\x99\x90\xe8\xb4\xa3\xe4\xbb\xbb\xe5\x85\xac\xe5\x8f\xb8(\xe6\xb3\x95\xe4\xba\xba\xe7\x8b\xac\xe8\xb5\x84)","entTypeCn":"\xe6\x9c\x89\xe9\x99\x90\xe8\xb4\xa3\xe4\xbb\xbb\xe5\x85\xac\xe5\x8f\xb8(\xe6\xb3\x95\xe4\xba\xba\xe7\x8b\xac\xe8\xb5\x84)","estDate":"2012-05-08","regOrg":"\xe5\x8c\x97\xe4\xba\xac\xe5\xb8\x82\xe5\xb7\xa5\xe5\x95\x86\xe8\xa1\x8c\xe6\x94\xbf\xe7\xae\xa1\xe7\x90\x86\xe5\xb1\x80\xe6\xb5\xb7\xe6\xb7\x80\xe5\x88\x86\xe5\xb1\x80","regCap":28800.0,"opFrom":null,"opTo":null,"busExceptCount":0,"illCount":0,"nodeNum":"110000","historyName":null}],"error":"","currentPage":0,"totalPage":10},"tab":null,"elaspedtime":"0.014","searchword":"\xe5\xb0\x8f\xe7\xb1\xb3","nickName":null,"subsite":"100000"},"message":"","status":200}'
"""