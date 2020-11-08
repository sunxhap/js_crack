if (isAjaxSuccess(data) && isNotBlank(data)) {
    caiGouType = data.caiGouType;
    xiangMuGuid = data.xiangMuGuid;
    xiangMuName = data.xiangMuName;
    if (caiGouType == 4) {
        //竞卖
        if (data.cgglPaiMai.jingJiaEndTime <= getServerLongTime()) {
            $(".jmworks").hide();
            $(".jmworjz").show();
        }
        $("#lhCGR").text("联合竞卖人");
        $(".cg_span").text("竞卖");
    } else if(caiGouType == 5){
        $.ajax({
            type: "post",
            url: getRootUrl() + "/common/nofilter/queryDylyGYS.do?xiangMuGuid=" + guid,
            dataType: 'json',
            async: false,
            success: function (xiangMuYaoQingList) {
                if(isAjaxSuccess(xiangMuYaoQingList)){
                    if(isNotBlank(xiangMuYaoQingList) && xiangMuYaoQingList.length > 0){
                        data.yaoQingGongYingShangGuid = xiangMuYaoQingList[0].gongYingShangGuid;
                        data.yaoQingGongYingShangName = xiangMuYaoQingList[0].userName;
                    }
                } else {
                    dealAjaxError(xiangMuYaoQing);
                }
            }
        });
    }

    getMuBanMingXiHtml(caiGouType, data);//获取模板明细表头和数据html -add by zk

    bindKoData(data);//加载基本数据

    var currentTime = getServerLongTime();

    if (caiGouType == 1 || caiGouType == 3 || caiGouType == 5 || caiGouType == 6 || caiGouType == 9) {
        if (isNotBlank(data.lsBaoJian)) {
            //材料设备添加滚动条
            for (var s = 0; s < data.lsBaoJian.length; s++) {
                var baoJian = data.lsBaoJian[s];
                if (baoJian.lsBJCaiLiaoSheBei.length > 15) {
                    $("[name='divCLSB']:eq(" + s + ")").css('height', '560px');
                    $("[name='divCLSB']:eq(" + s + ")").css('overflow', 'auto');
                }

                var baoJiaIsEnd = false;
                var html="";
                if(caiGouType == 1 || caiGouType == 5 || caiGouType == 6){
                    //询价采购
                    if(baoJian.zuiZhongBaoJiaEndTime < currentTime){
                        baoJiaIsEnd = true;
                    }

                }else if(caiGouType == 3){
                    //竞价
                    if (baoJian.jingJiaEndTime < currentTime) {
                        baoJiaIsEnd = true;
                    }
                }else if(caiGouType == 9){
                    $(".cg_span").text("电子竞价");
                    if (isTrue(baoJian.needZiGeShenCha)) {
                        if (baoJian.zuiZhongBaoJiaEndTime < currentTime) {
                            baoJiaIsEnd = true;
                        }
                    } else {
                        if (baoJian.zuiZhongYuBaoJiaEndTime < currentTime) {
                            baoJiaIsEnd = true;
                        }
                    }
                }

                if(caiGouType == 5) {
                    if(data.gongShiEndTime < currentTime) { // 异议已截止
                        html = '<div class="tb" style="text-align:center"><a style="background: #AAAAAA">异议已截止</a></div>';
                    } else { // 我要异议
                        html = '<div class="tb" style="text-align:center"><a onClick="yiYi('+data.gongShiEndTime+',\''+data.gongShiEndTimeText+'\')" style="display:inline-block">我要异议</a></div>';
                    }
                } else {
                    if(isTrue(baoJiaIsEnd)){
                        html = '<div class="tb" style="text-align:center"><a style="background: #AAAAAA">报价已截止</a></div>';

                    }else{
                        html = '<div class="tb" style="text-align:center"><a onClick="yaoCanYu()" style="display:inline-block">我要参与</a></div>';
                    }
                }

                $(".baoJian").eq(s).append(html);

            }

            //页签
            $(".baoJianInfo").show();
            if (isBlank(data.remark)) {
                $("#remarkTable").hide();
            } else {
                $("#remarkText").html(formatBigText(data.remark));
            }
        }
    }

    if (!userGuid) {
        $(".PMGG_fuJian").html("");
        $(".loginTip").show();
        $(".XJCGGG_fuJian").html("");
    }

    if (isNotBlank(callBackUrl)) {
        $("#gongGaoIfram").attr("src", callBackUrl + "?height=" + (parseInt($('.divMainContent div').get(0).offsetHeight)+100));
    }
}


// -----------------------------------------------------------------------------
//获取模板的明细的表格
function getMuBanMingXiHtml(caiGouType, data) {
    if (data.lsBaoJian == undefined) {
        return;
    }
    for (var baoJianIndex = 0; baoJianIndex < data.lsBaoJian.length; baoJianIndex++) {
        if (caiGouType == 1 || caiGouType == 5 || caiGouType == 6 || caiGouType == 9) {//如果是询价采购 单一来源 竞争性谈判
            var currentBaoJian = data.lsBaoJian[baoJianIndex];
            if (currentBaoJian.lsMingXiMuBan == undefined) {
                data.lsBaoJian[baoJianIndex].mingXiHtml = null;
                continue;
            }

            currentBaoJian.isExistMaoYiShuYu = false;
            for (var j = 0; j < currentBaoJian.lsMingXiMuBan.length; j++) {
                if (currentBaoJian.lsMingXiMuBan[j].mingXiValue == "maoYiShuYu") {
                    currentBaoJian.isExistMaoYiShuYu = true;
                    break;
                }
            }

            var htmlHead = "<tr>";//html头
            var htmlData = "";//html数据
            if ((currentBaoJian.muBanLeiXing == MingXiMuBan.ZIDINGYIMUBAN || currentBaoJian.muBanLeiXing == MingXiMuBan.WODEMUBAN) && currentBaoJian.isExistMaoYiShuYu) {//自定义模板包含贸易术语特殊处理
                for (var i = 0; i < currentBaoJian.lsMingXiMuBan.length; i++) {
                    if (currentBaoJian.lsMingXiMuBan[i].mingXiValue == "maoYiShuYu") {
                        htmlHead += '<td style="width:140px;" colspan="2" class="bj text_center">INCOTERMS 2010 国际贸易术语</td>';
                    } else if (currentBaoJian.lsMingXiMuBan[i].mingXiValue != "diQu") {
                        htmlHead += '<td style="align:\'left\';" rowspan="2" class="bj text_center">' + currentBaoJian.lsMingXiMuBan[i].mingXiName + '</td>';
                    }
                }
                htmlHead += '  </tr><tr><td style="width:70px;" class="bj text_center">贸易术语</td> ';
                htmlHead += '  <td style="width:70px;" class="bj text_center">地区</td> ';
            } else {
                for (var i = 0; i < currentBaoJian.lsMingXiMuBan.length; i++) {
                    if (currentBaoJian.muBanLeiXing == MingXiMuBan.TONGYONGMUBAN && currentBaoJian.lsMingXiMuBan[i].isBaoJiaXiang) {//通用模板 而且是报价项的时候不显示，其他都显示
                        //这个时候不显示
                    } else {
                        htmlHead += '<td style="width:30px;" class="bj text_center">' + currentBaoJian.lsMingXiMuBan[i].mingXiName + '</td>'
                    }
                }
            }

            //拼接数据
            for (var i = 0; i < currentBaoJian.lsMingXiData.length; i++) {
                htmlData += "<tr>";
                for (var k = 0; k < currentBaoJian.lsMingXiMuBan.length; k++) {
                    if (currentBaoJian.muBanLeiXing == MingXiMuBan.TONGYONGMUBAN && currentBaoJian.lsMingXiMuBan[k].isBaoJiaXiang) {//通用模板 而且是报价项的时候不显示
                        continue;
                    }
                    var theValue = currentBaoJian.lsMingXiData[i][currentBaoJian.lsMingXiMuBan[k].mingXiValue];
                    if (theValue == undefined) {
                        theValue = "";
                    }
                    htmlData += "<td class=\"bj text_center\">" + theValue + "</td>";
                }
                htmlData += "</tr>";
            }

            htmlHead += '</tr>';
            data.lsBaoJian[baoJianIndex].mingXiHtml = "<table width=\"100%\" border=\"0\"  style=\"margin-bottom: 0px;\">" + htmlHead + htmlData + "</table>";
        }
        else {
            data.lsBaoJian[baoJianIndex].mingXiHtml = null;
        }
    }

}