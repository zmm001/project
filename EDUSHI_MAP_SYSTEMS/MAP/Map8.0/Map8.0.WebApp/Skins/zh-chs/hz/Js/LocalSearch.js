﻿var _SearchType;    //搜索类型
var _Key;           //搜索关键字
var _Address;       //搜索地址

var _PrevElement = null;   //保存上次点击的div

var _Page = 1;
var _PageCount = 1;
var _RecordCount = 0;
var _PageSize = 15;

var _SearchData = {};
var _Begin;
var _End;
var cVouchAd = '';
var dianTaoCan = ["", "金牌E店", "", "", "", "钻石E店", "至尊E店", "未认领E店", "已认领E店"];

var local = null;
var BMap_Map_Child = null;
var ResultMode = 'edushi';//结果模式
if (parent.vM.MapState.Map == 0) {
    ResultMode = 'edushi'; //edushi模式
    window.onload = fnOnload;
}
else {
    ResultMode = 'baidu'; //baidu模式
    window.onload = fnShowData_BD();
}

function reLoadPageSize(iVouchAdLength) {
    _PageSize = Math.floor((fnGetWindowHeight() - 10 - 20 * iVouchAdLength) / 50);
    if (_PageSize < 15) {
        _PageSize = 15;
    }
}
function fnOnload() {
    if (!window.Config) {
        setTimeout('fnOnload()', 200);
        return;
    }
    $('divResult').innerHTML = window.Config.Loading;
    var sSearchType = fnRequest('type');
    _SearchType = sSearchType;
    var sKeyword1 = fnRequest('keyword1');
    _Key = unescape(sKeyword1);
    var sSearchUrl = '';
    
    switch (sSearchType) {
        case '0':        //模糊搜索
            sSearchUrl = window.Config.DataCetnerSearchDataUrl + 'SearchMapOverall/' + window.Config.CityCode + '/' + window.Config.Language + '/Format/Json/Search/1/500?limit=100&q=' + encodeURIComponent(_Key);
            break;
        case '1':       //名称搜索
            sSearchUrl = window.Config.DataCetnerSearchDataUrl + 'SearchMapByName/' + window.Config.CityCode + '/' + window.Config.Language + '/Format/Json/Search/1/100?q=' + encodeURIComponent(_Key);
            break;
        case '2':       //地址搜索
            sSearchUrl = window.Config.DataCetnerSearchDataUrl + 'SearchMapByAddr/' + window.Config.CityCode + '/' + window.Config.Language + '/Format/Json/Search/1/100?q=' + encodeURIComponent(_Key);
            break;
        case '3':       //名称+地址
            _Address= unescape(fnRequest('keyword1'));
            _Key = unescape(fnRequest('keyword2'));
            sSearchUrl = window.Config.DataCetnerSearchDataUrl + 'SearchMapByNameAddr/' + window.Config.CityCode + '/' + window.Config.Language + '/Format/Json/Search/1/100?q=' + encodeURIComponent(_Key) + '&addr=' + encodeURIComponent(_Address);
            break;
        case '4':
            
            break;
        case '9':   //道路
            sSearchUrl = window.Config.DataCetnerSearchDataUrl + 'SearchMapByRoad/' + window.Config.CityCode + '/' + window.Config.Language + '/Format/Json/Search/1/100?q=' + encodeURIComponent(_Key);
            break;
        case '8':
            sSearchUrl = window.Config.DataCetnerSearchDataUrl + 'SearchMapHYByRang/' + window.Config.CityCode + '/' + window.Config.Language + '/Format/Json/Search/1/100?q=' + encodeURIComponent(_Key) + '&x=' + fnRequest('x') + '&y=' + fnRequest('y')+'&range=1000';
            break;
    }
    if (sSearchUrl != '') {
        //推荐
        var _jurl = '';
        if (window.Config.Is3D == 1) {
            _jurl = window.Config.DataCetnerMapDataUrl + "Map7.0/SearchVouch.aspx?citycode=" + window.Config.CityCode + "&l=" + window.Config.Language + "&key=" + fnRequest('keyword1');

            ENetwork.DownloadScript(_jurl, function() {
                if (typeof VouchAd != 'undefined' && VouchAd.length > 0) {
                    for (var u = 0; u < VouchAd.length; u++) {
                        if (VouchAd[u].BAC_OPenType == 2) {
                            cVouchAd += '<tr><td style=\"width:15px;\"><img src=\"/Images/button4.gif\" /></td><th align="left"><a  style="text-decoration:underline;font-weight:bold;color:red;font-size:12px;" href="javascript:parent.ShowCommendPopByContent(\'' + VouchAd[u].BAC_Title + '\',VouchAd[' + u + '].BAC_Content,' + VouchAd[u].BAC_LogincalX + ',' + VouchAd[u].BAC_LogincalY + ')">' + VouchAd[u].BAC_Title + '</a></th></tr>';
                        }
                        else {
                            var _TempVouchAd = "<tr><td style=\"width:15px;\"><img src=\"/Images/button4.gif\" /></td><th align='left'><a style=\"color:#F60;\" href=\"http://{$LinkUrl}\" target=\"_blank\">{$Title}</a></th></tr>";
                            cVouchAd += _TempVouchAd.replace('{$Title}', VouchAd[u].BAC_Title).replace('{$LinkUrl}', VouchAd[u].BAC_LinkUrl.replace('http://', ''));
                        }
                    }
                    //reLoadPageSize(VouchAd.length); //根据是否有推荐关键字计算分页数
                }
                else {
                    //reLoadPageSize(0);
                }

                ENetwork.DownloadScript(sSearchUrl, function() {
                    fnShowData();
                });
            });
        }
        else {
            ENetwork.DownloadScript(sSearchUrl, function() {
                fnShowData();
            });
        }        
    }
}
//显示搜索到的数据
function fnShowData() {
    if (typeof _Search == 'undefined') {
        _Search = [];
    }
    _SearchData = _Search;
    if (_Search.length > 0) {
        if (_SearchType == 3) {
            $('divResult').innerHTML = '共有<span>' + _Search.length + '</span>项符合在<span>' + _Key + '</span>找<span>' + _Address + '</span>的搜索结果.';
        }
        else {
            $('divResult').innerHTML = '共有<span>' + _Search.length + '</span>项符合<span>' + _Key + '</span>的搜索结果.';
        }
    }
    else {
        if (_SearchType == 3) {
            $('list').style.display = "none";
            $('nolist').style.display = "block";
            $('noresult').innerHTML = '抱歉，在' + window.Config.CityName + '范围内没有找到与在<span>“' + _Address + '”</span>找<span>“' + _Key + '”</span>有关的相关结果！';            
        }
        else {
            $('list').style.display = "none";
            $('nolist').style.display = "block";
            $('noresult').innerHTML = '抱歉，在' + window.Config.CityName + '范围内没有找到与<span>“' + _Key + '”</span>有关的相关结果！';
            $('searchkey').value = _Key + '在哪里？';
            $('urlhref').innerHTML = '<a target="_blank" href="http://' + window.Config.CityCode + '.edushi.com/cheng/post/fangchan.html" class="tyl">发房产信息</a>          <a target="_blank" href="http://' + window.Config.CityCode + '.edushi.com/cheng/post/tiaozao.html" class="tyl">发二手货信息</a>';
            $('searchkeybdt').onclick = function () {
                window.open('http://' + window.Config.CityCode + '.edushi.com/bdt/?content=' + encodeURIComponent($('searchkey').value));
            };

            var url = window.Config.DataCetnerMapDataUrl + "Map7.0/MapRightTabPanel.aspx?citycode=" + window.Config.CityCode + "&l=" + window.Config.Language + "&top=3";
            ENetwork.DownloadScript(url, function () {
                if (typeof _rightTabData != 'undefined') {
                    var bdt = _rightTabData.bdt;                    
                    var cheng = _rightTabData.cheng;
                    var html = "", shtml = "";                    

                    if (cheng.length > 0) {
                        for (var i = 0; i < 3; i++) {
                            html += string.Format('<li><a href="{0}" target="_blank" class="tgr">[{1}]</a> <a href="{2}" target="_blank">{3}</a></li>', cheng[i].suburl, decodeURIComponent(cheng[i].subname), cheng[i].titleurl, decodeURIComponent(cheng[i].title));
                        }
                        $('chenglist').innerHTML = html;
                    }
                    html = "";
                    if (bdt.length > 0) {
                        for (var i = 0; i < bdt.length; i++) {
                            html += string.Format('<li><a href="{0}" target="_blank" class="tgr">[{1}]</a> <a href="{2}" target="_blank">{3}</a></li>', bdt[i].titleurl, decodeURIComponent(bdt[i].title), bdt[i].suburl, decodeURIComponent(bdt[i].subname));
                        }
                        $("bdtlist").innerHTML = html;
                    }
                }
            });
        }
        fnResize();
        return;
    }

    _RecordCount = _Search.length;
    if ((_RecordCount % _PageSize) == 0) {
        _PageCount = _RecordCount / (_PageSize);
    }
    else {
        _PageCount = int(_RecordCount, _PageSize) + 1;
    }
    var Begin = (_Page - 1) * (_PageSize);
    var End = _Page * _PageSize;
    if (End > _RecordCount) End = _RecordCount;
    _Begin = Begin;
    _End = End;
    var LiHtml = "";
    var _road = 0;
    if (parseInt(_Search[0].RecordType) == 6) {
        $('ckDivContent').style.display = '';
        _road = 1;
    }

    for (i = Begin; i < End; i++) {
        if (_road == 1) {
            var EntityId = _Search[i].EntityId;
            var EntityName = _Search[i].EntityName;
            var OriginalAddress = _Search[i].OriginalAddress;
            var _X = _Search[i].X;
            var _Y = _Search[i].Y;
            var Road = _Search[i].Road;
            var Doorplate = _Search[i].Doorplate;

            LiHtml += string.Format('<li x="{13}" y="{14}" lc="lc_{15}"><div class="MC"><div class="nb"><span class="icon">{0}</span></div>{11}<div class="clear"></div></div><div class="DZ kk260"><a href="javascript:;" onclick="RecordClick({1},{2},{3},{4},{5},{6},\'{7}\',\'\',\'{8}\',{9});" title="{10}">{12}</a></div><div class="clear"></div></li>', i + 1, EntityId, 0, 0, _X, _Y, 1, EntityName, "", i, EntityName, OriginalAddress, EntityName, _X, _Y, i);
        }
        else {
            var RecordType = parseInt(_Search[i].RecordType); //数据类型
            var HRT_LowPrice = _Search[i].HRT_LowPrice; //酒店价格
            var LST_ID = parseInt(_Search[i].LST_ID);   //是否是E店
            var Vip = parseInt(_Search[i].Vip); //收费E店
            var LV_ID = parseInt(_Search[i].LV_ID); //优惠券
            var LT_ID = parseInt(_Search[i].LT_ID); //促销
            var LCE_ShopCard = parseInt(_Search[i].LCE_ShopCard); //执照
            var CompanyID = _Search[i].CompanyID;
            var OwnerID = _Search[i].OwnerID;
            var OCName = _Search[i].OCName.replace("'", "’");
            var TEL = _Search[i].Telephone;
            var Address = _Search[i].Address; //地址
            var HF_Content = _Search[i].HF_Content; //点评
            var HF_ContentUrl = 'http://' + this.Config.Domain + '/jd/Hotel.aspx?id=' + CompanyID + '#comment';
            var HCmtCount = _Search[i].HCmtCount; //点评数
            var LV_Title = _Search[i].LV_Title; //优惠
            var LED_Title = _Search[i].LED_Title; //公告
            var _X = _Search[i].X;
            var _Y = _Search[i].Y;
            var sUrl = '', sVipIcon = '';
            var HotelUrl = '', HotelDian = '';
            //E店修改
            var LET_ID = parseInt(_Search[i].LET_ID); //E店套餐  1：金牌  5：钻石  6：至尊 7：未认领 8：已认领

            if (RecordType == 1) {
                //实体
                LiHtml += string.Format('<li x="{13}" y="{14}" lc="lc_{15}"><div class="MC"><div class="nb"><span class="icon">{0}</span></div><div class="location-r" style="float:left"><a href="javascript:;" onclick="RecordClick({1},{2},{3},{4},{5},{6},\'{7}\',\'\',\'{8}\',{9});" title="{10}">{11}<!-- <em>详情</em>--></a><div class="DZ kk260">地址：{12}</div><!--<p class="mapinfo-tips user-show-ctrl clearfix"><span class="sms-fav"><b></b>收藏</span><span class="sms-share"><b></b>分享</span><span class="sms-jiucuo"><b></b>纠错</span></p>--></div><div class="clear"></div></div></li>', i + 1, OwnerID, CompanyID, LST_ID, _X, _Y, RecordType, OCName, TEL, i, OCName, OCName, Address, _X, _Y, i);
            }
            else if (RecordType == 2) { //企业
                //E店
                if (LST_ID == 1) {
                    sUrl = window.Config.DianUrl + _Search[i].CompanyID + '.html';
                    if (LET_ID > 0) {                        
                        sVipIcon = '<span class="icon_e"><a href="' + sUrl + '" target="_blank"><img src="/Images/dian' + LET_ID + '.gif" title="' + dianTaoCan[LET_ID] + '" /></a></span>';
                    }
                    else {
                        sVipIcon = '<span class="icon_e"><a href="' + sUrl + '" target="_blank"><img src="/Images/dian1.gif" title="' + dianTaoCan[1] + '" /></a></span>';
                    }
                    if (LV_ID * 1 > 0) {
                        sVipIcon += '<span class="icon_e" style="margin-top:3px;"><img src="/images/Juan.gif" title="免费下载本店优惠券" /></span>';
                    }
                    if (LT_ID * 1 > 0) {
                        sVipIcon += '<span class="icon_e" style="margin-top:3px;"><img src="/images/Cu.gif" title="本店正在促销打折" /></span>';
                    }
                    var tempLVTitle = '';
                    if (LV_Title != '' && LV_Title != null) {
                        tempLVTitle = '<div class="YHQ kk260"><a href="#" class="xle18b34 kk230">优惠券：' + LV_Title + '</a></div>';
                    }
                    var tempLEDTitle = '';
                    if (LED_Title != '' && LED_Title != null) {
                        tempLEDTitle = '<div class="GG kk260"><a href="#" class="xl3e3e3e kk230">公告：' + LED_Title + '</a></div>';
                    }

                    LiHtml += string.Format('<li x="{17}" y="{18}" lc="lc_{19}"><div class="MC"><div class="nb"><span class="icon">{0}</span></div><div class="location-r"><a class="kk230" href="javascript:;" onclick="RecordClick({1},{2},{3},{4},{5},{6},\'{7}\',\'\',\'{8}\',{9},{20});" title="{10}">{11}<!-- <em>详情</em>--></a>{12}<div class="DZ kk260" title="{13}">{14}</div>{15}{16}<!--<p class="mapinfo-tips user-show-ctrl clearfix"><span class="sms-fav"><b></b>收藏</span><span class="sms-share"><b></b>分享</span><span class="sms-jiucuo"><b></b>纠错</span></p>--></div><div class="clear"></div></div></li>', i + 1, OwnerID, CompanyID, LST_ID, _X, _Y, RecordType, OCName, TEL, i, OCName, OCName, sVipIcon, Address, Address, tempLVTitle, tempLEDTitle, _X, _Y, i, Vip);
                }
                else {
                    //普通企业
                    LiHtml += string.Format('<li x="{13}" y="{14}" lc="lc_{15}"><div class="MC"><div class="nb"><span class="icon">{0}</span></div><div class="location-r"><a href="javascript:;" class="kk260" onclick="RecordClick({1},{2},{3},{4},{5},{6},\'{7}\',\'\',\'{8}\',{9},{16});" title="{10}">{11}<!-- <em>详情</em>--></a><div class="DZ kk260">{12}</div><!--<p class="mapinfo-tips user-show-ctrl clearfix"><span class="sms-fav"><b></b>收藏</span><span class="sms-share"><b></b>分享</span><span class="sms-jiucuo"><b></b>纠错</span></p>--></div><div class="clear"></div></div></li>', i + 1, OwnerID, CompanyID, LST_ID, _X, _Y, RecordType, OCName, TEL, i, OCName, OCName, Address, _X, _Y, i, Vip);
                }
            }
            else {
                //普通企业
                LiHtml += string.Format('<li x="{13}" y="{14}" lc="lc_{15}"><div class="MC"><div class="nb"><span class="icon">{0}</span></div><div class="location-r"><a href="javascript:;" class="kk260" onclick="RecordClick({1},{2},{3},{4},{5},{6},\'{7}\',\'\',\'{8}\',{9},{16});" title="{10}">{11}<!-- <em>详情</em>--></a><div class="DZ kk260">{12}</div><!--<p class="mapinfo-tips user-show-ctrl clearfix"><span class="sms-fav"><b></b>收藏</span><span class="sms-share"><b></b>分享</span><span class="sms-jiucuo"><b></b>纠错</span></p>--></div><div class="clear"></div></div></li>', i + 1, OwnerID, CompanyID, LST_ID, _X, _Y, RecordType, OCName, TEL, i, OCName, OCName, Address, _X, _Y, i, Vip);
            }
        }
    }
    var strPage = fnPager(5, _Page, _PageSize, _PageCount, 'window.fnShowByPage');
    $('Page').innerHTML = strPage;
    $('divContent').innerHTML = '<table id=\"tbCommend\" border=\"0\" cellpadding=\"1\" cellspacing=\"1\" style=\"line-height:17px;\">' + cVouchAd + '</table>' + LiHtml;

    fnResize();
    parent.onSearchDataLoadComplete(_Search, Begin, End);

    jQuery("li").hover(
        function () {
            jQuery(this).addClass("li_s");
            jQuery(parent.vM.$(jQuery(this).attr("x") + "_" + jQuery(this).attr("y") + "_" + jQuery(this).attr("lc"))).parent().css('z-index', 999999);
        },
        function () {
            jQuery(this).removeClass("li_s");
            jQuery(parent.vM.$(jQuery(this).attr("x") + "_" + jQuery(this).attr("y") + "_" + jQuery(this).attr("lc"))).parent().css('z-index', 1);
        });
}

function fnShowByPage(iPage) {
    if (iPage) {
        _Page = iPage;
    }
    fnShowData();
}

function RecordClick(oid, cid, lstid, X, Y, DataType, Name, o, Telephone, num, Vip) {    
    parent.fnShowSearchPop(oid, cid, lstid, X, Y, DataType, '', '', '' + Telephone + '', Vip);
}

function fnActive() {
    if (typeof _SearchData != 'undefined' && _SearchData.length > 0) {
        parent.onSearchDataLoadComplete(_SearchData, _Begin, _End);
    }
    else {
        parent.onSearchDataLoadComplete(null, 0, 0);
    }
    fnResize();
}

function fnExit() {
    parent.onSearchDataLoadComplete(null, 0, 0);
    parent._RoadLineLayer.innerHTML = '';
    parent._RoadCoords = [];
}

function fnResize(h) {
    if (!h) {
        this.$('TabContent').style.height = (fnGetWindowHeight()-10) + 'px';
    }
    else {
        this.$('TabContent').style.height = (h-10) + 'px';
    }
}

function fnShowData_BD() {
    if (!window.Config) {
//        window.Config = parent.GlobalConfig;
        setTimeout('fnShowData_BD()', 200);
        return;
    }
    //alert(window.Config);
    //alert(window.Config.Loading);
    $('divResult').innerHTML = window.Config.Loading;
    var sKeyword1 = unescape(fnRequest('keyword1'));
    BMap_Map_Child = parent.vM["BaiduMap"].BMap;
    var LocalSearchOptions = {
        //renderOptions: { map: BMap, selectFirstResult: true },     //设置结果呈现                //map: BMap,panel: "AlaMap$Plug$BaiduMap$Temp"
        pageCapacity: _PageSize,    //设置每页容量
        onSearchComplete: function (results) {  //检索完成后的回调函数
            HtmlOperate(results, _PageSize, sKeyword1);
        }
    };
    local = new parent.vM.ContentWindow.BMap.LocalSearch(BMap_Map_Child, LocalSearchOptions);
    local.search(sKeyword1);
}
function HtmlOperate(results, pageSize, keyword) {
    var CurrPageResultNum = results.getCurrentNumPois(); //获得当前页的结果数
    if (CurrPageResultNum > 0) {
        var totalResult = results.getNumPois(); //获得总结果数
        var pageCount = results.getNumPages(); //获得总页数
        var pageNo = results.getPageIndex(); //获得当前页序号
        //alert(pageNo);
        //var s = [];
        var LiHtml = "";
        for (var i = 0; i < CurrPageResultNum; i++) {
            var poi = results.getPoi(i); //获得单个LocalResultPoi信息
            //s.push(poi.title + ", " + poi.address);
            //普通企业
            var address = "";
            var phone = "";
            if (poi.type == 0) {
                address = poi.address;
            }
            if (poi.phoneNumber != undefined) {
                phone = poi.phoneNumber;
            }
            LiHtml += string.Format('<li><div class="MC"><div class="nb"><span class="icon">{0}</span></div><div class="location-r"><a href="javascript:;" class="kk260" title="{1}" onclick=\"showInfo(\'{4}\',false,\'{5}\',\'{6}\',{7},{8},\'{9}\')\">{2}<!-- <em>详情</em>--></a><div class="DZ kk260">{3}</div><!--<p class="mapinfo-tips user-show-ctrl clearfix"><span class="sms-fav"><b></b>收藏</span><span class="sms-share"><b></b>分享</span><span class="sms-jiucuo"><b></b>纠错</span></p>--></div><div class="clear"></div></div></li>', (pageNo * pageSize) + i + 1, poi.title, poi.title, address, poi.title.replace("'", "\\'"), "", address.replace("'", "\\'"), poi.point.lng, poi.point.lat, phone);
        }

        $('divResult').innerHTML = '共有<span>' + totalResult + '</span>项符合<span>' + keyword + '</span>的搜索结果.';
        var strPage = fnPager(5, pageNo + 1, pageSize, pageCount, 'GoToPage');
        $('Page').innerHTML = strPage;
        $('divContent').innerHTML = LiHtml;

        fnResize();
        jQuery("li").hover(
        function () {
            jQuery(this).addClass("li_s");
            //jQuery(parent.vM.$(jQuery(this).attr("x") + "_" + jQuery(this).attr("y") + "_" + jQuery(this).attr("lc"))).parent().css('z-index', 999999);
        },
        function () {
            jQuery(this).removeClass("li_s");
            //jQuery(parent.vM.$(jQuery(this).attr("x") + "_" + jQuery(this).attr("y") + "_" + jQuery(this).attr("lc"))).parent().css('z-index', 1);
        });
//        jQuery("#r-result").html("").html(s.join("<br/>"));
//        if (pageCount > 0) {
//            jQuery("#pager").html("").html(createHTML(pageNo + 1, pageCount, totalResult, pageSize, "GoToPage"));
//        }
    }
    else {
        $('list').style.display = "none";
        $('nolist').style.display = "block";
        $('noresult').innerHTML = '抱歉，在' + window.Config.CityName + '范围内没有找到与<span>“' + keyword + '”</span>有关的相关结果！';
        $('searchkey').value = keyword + '在哪里？';
        $('urlhref').innerHTML = '<a target="_blank" href="http://' + window.Config.CityCode + '.edushi.com/cheng/post/fangchan.html" class="tyl">发房产信息</a>          <a target="_blank" href="http://' + window.Config.CityCode + '.edushi.com/cheng/post/tiaozao.html" class="tyl">发二手货信息</a>';
        $('searchkeybdt').onclick = function () {
            window.open('http://' + window.Config.CityCode + '.edushi.com/bdt/?content=' + encodeURIComponent($('searchkey').value));
        };

        var url = window.Config.DataCetnerMapDataUrl + "Map7.0/MapRightTabPanel.aspx?citycode=" + window.Config.CityCode + "&l=" + window.Config.Language + "&top=3";
        ENetwork.DownloadScript(url, function () {
            if (typeof _rightTabData != 'undefined') {
                var bdt = _rightTabData.bdt;
                var cheng = _rightTabData.cheng;
                var html = "", shtml = "";

                if (cheng.length > 0) {
                    for (var i = 0; i < 3; i++) {
                        html += string.Format('<li><a href="{0}" target="_blank" class="tgr">[{1}]</a> <a href="{2}" target="_blank">{3}</a></li>', cheng[i].suburl, decodeURIComponent(cheng[i].subname), cheng[i].titleurl, decodeURIComponent(cheng[i].title));
                    }
                    $('chenglist').innerHTML = html;
                }
                html = "";
                if (bdt.length > 0) {
                    for (var i = 0; i < bdt.length; i++) {
                        html += string.Format('<li><a href="{0}" target="_blank" class="tgr">[{1}]</a> <a href="{2}" target="_blank">{3}</a></li>', bdt[i].titleurl, decodeURIComponent(bdt[i].title), bdt[i].suburl, decodeURIComponent(bdt[i].subname));
                    }
                    $("bdtlist").innerHTML = html;
                }
            }
        });
        fnResize();
    }
}
function GoToPage(pageNo) {
    local.gotoPage(pageNo - 1);
}

function showInfo(title, enableMessage, message, address, lng, lat, phone) {
    var point = new parent.vM.ContentWindow.BMap.Point(lng, lat);
    var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
                    '<!--<img src="../img/baidu.jpg" alt="" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>-->' +
                    '<p style="float:left;width:45px;margin:0;">地址：</p><p style="float:left;width:240px;margin:0;">' + address + '</p><br/><p style="float:left;width:45px;margin:0;">电话：</p><p style="float:left;width:240px;margin:0;">' + phone + '</p><br/><!--简介：百度大厦位于北京市海淀区西二旗地铁站附近，为百度公司综合研发及办公总部。-->' +
                  '</div>';

    //创建检索信息窗口对象
    var searchInfoWindow = new parent.vM.ContentWindow.BMapLib.SearchInfoWindow(BMap_Map_Child, content, {
        title: title,      //标题
        width: 290,             //宽度
        //height: 105,              //高度
        panel: "panel",         //检索结果面板
        enableAutoPan: true,     //自动平移
        enableSendToPhone: false, //是否显示发送到手机按钮
        searchTypes: [
				parent.vM.ContentWindow.BMAPLIB_TAB_SEARCH,   //周边检索
				parent.vM.ContentWindow.BMAPLIB_TAB_TO_HERE,  //到这里去
				parent.vM.ContentWindow.BMAPLIB_TAB_FROM_HERE //从这里出发
			]
    });
    searchInfoWindow.open(point);


 /* 最基本的信息窗口
    var opts = {
        width: 200,     // 信息窗口宽度
        height: 100,     // 信息窗口高度
        title: title, // 信息窗口标题
        enableMessage: enableMessage, //设置允许信息窗发送短息
        message: message
    }
    var infoWindow = new parent.vM.ContentWindow.BMap.InfoWindow("地址：" + address, opts);  // 创建信息窗口对象 
    BMap_Map_Child.openInfoWindow(infoWindow, point); //开启信息窗口
    BMap_Map_Child.centerAndZoom(point, 15);
 */
    //BMap_Map_Child.panTo(point);
}