function ResetImage(ImgD) {
    var image = new Image();
    image.src = ImgD.src;
    if (image.width > 0 && image.height > 0) {
        var eimgW = ImgD.width;
        var eimgH = ImgD.height;
        if (200 / eimgW < 100 / eimgH) {
            ImgD.width = 198;
            var _timgH = 200 / eimgW * eimgH;
            ImgD.height = _timgH;
            var topValue = (100 - _timgH) / 2;
            ImgD.style.top = topValue + 'px';
        } else {
            var _eimgW = 100 / eimgH * eimgW;
            ImgD.height = 98;
            ImgD.width = _eimgW;
            var left = (200 - _eimgW) / 2;
            ImgD.style.left = left + 'px';
        }
    }
}
function fnChangeCity() {
    var _display = document.getElementById("CityList").style.display;
    if (_display == 'none') {
        document.getElementById("CityList").style.display = 'block';
    } else {
        document.getElementById("CityList").style.display = 'none';
    }
}
function eShopResetImage(ImgD) {
    var image = new Image();
    image.src = ImgD.src;
    if (image.width > 0 && image.height > 0) {
        var eimgW = ImgD.width;
        var eimgH = ImgD.height;
        if (192 / eimgW < 100 / eimgH) {
            ImgD.width = 190;
            var _timgH = 192 / eimgW * eimgH;
            ImgD.height = _timgH;
            var topValue = (100 - _timgH) / 2;
            ImgD.style.top = topValue + 'px';
        } else {
            var _eimgW = 100 / eimgH * eimgW;
            ImgD.height = 98;
            ImgD.width = _eimgW;
            var left = (192 - _eimgW) / 2;
            ImgD.style.left = left + 'px';
        }
    }
}

function ResetCompanyImage(ImgD) {
    var image = new Image();
    image.src = ImgD.src;
    if (image.width > 0 && image.height > 0) {
        var _eimgW = image.width;
        var _eimgH = image.height;
        if (360 / _eimgW < 270 / _eimgH) {
            ImgD.width = 358;
            var _timgH = 360 / _eimgW * _eimgH;
            ImgD.height = _timgH;
            var topValue = (270 - _timgH) / 2;
            ImgD.style.top = topValue + 'px';
        } else {
            var _eimgW = 270 / _eimgH * _eimgW;
            ImgD.height = 268;
            ImgD.width = _eimgW;

            var leftValue = (360 - _eimgW) / 2;
            ImgD.style.left = leftValue + 'px';
        }
    }
}

function $() {
    var objElements = [];
    for (var i = 0; i < arguments.length; i++) {
        var objEle = arguments[i];
        if (typeof arguments[i] == 'string') {
            objEle = document.getElementById(arguments[i]);
        }
        objElements.push(objEle);
    }
    if (arguments.length == 1) {
        return objEle;
    }
    else {
        return objElements;
    }
}
function GoSearch() {
    if ($("txtKeyword").value == "") {
        alert("请输入你要查找的关键字!");
        $("txtKeyword").focus();
        return;
    }
    if ($("txtKeyword").value.length > 50) {
        alert("查找的关键字过长，请适当删减!");
        $("txtKeyword").focus();
        return;
    }
    if (RiskWord($("txtKeyword").value)) {
        alert("关键字中不能包含<>()'\"+;\?%--等特殊字符");
        $("txtKeyword").focus();
        return;
    }
    var Keyword = escape($("txtKeyword").value);
    window.location.href = 'Search.shtml?q=' + Keyword;
}
function RiskWord(str)  //检测是否包含'<>()'"+;\?%--'字符，有返回true，否则返回false
{
    var Letters = "<>()'\"+;\?%";
    var i;
    var c;
    for (i = 0; i < str.length; i++) {
        c = str.charAt(i);
        if (Letters.indexOf(c) >= 0)
            return true;
    }
    if (str.indexOf("--") >= 0)
        return true;
    return false;
}
//Cookie操作类
function CookieHelper() { }
CookieHelper.prototype.expires = '';
CookieHelper.prototype.path = '';
CookieHelper.prototype.domain = '';
CookieHelper.prototype.secure = '';
//get Cookie value
CookieHelper.prototype.getCookie = function (sCookieName) {
    var sName = sCookieName + "=", ichSt, ichEnd;
    var sCookie = document.cookie;
    if (sCookie.length && (-1 != (ichSt = sCookie.indexOf(sName)))) {
        if (-1 == (ichEnd = sCookie.indexOf(";", ichSt + sName.length))) {
            ichEnd = sCookie.length;
        }
        return unescape(sCookie.substring(ichSt + sName.length, ichEnd));
    }
    return null;
};
//set Cookie value
CookieHelper.prototype.setCookie = function (sCookieName, sCookieValue, dCookieExpires) {
    var argv = this.setCookie.arguments, argc = this.setCookie.arguments.length;
    var sExpDate = (argc > 2) ? "; expires=" + argv[2].toGMTString() : "";
    var sPath = (argc > 3) ? "; path=" + argv[3] : "";
    var sDomain = (argc > 4) ? "; domain=" + argv[4] : "";
    var sSecure = (argc > 5) && argv[5] ? "; secure" : "";
    document.cookie = sCookieName + "=" + escape(sCookieValue, 0) + sExpDate + sPath + sDomain + sSecure + ";";
};

function ENetwork() { };
ENetwork.GetExecutionID = function () {
    var a = new Date, b = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds(), a.getMilliseconds());
    b += Math.round(Math.random() * 1000000);
    return b
};
ENetwork.DownloadScriptCallback = function (a) { if (a) { a(); } };
ENetwork.DownloadScript = function (a, b, c) {
    try {
        if (a == null || a == "undefined" || a.length == 0) {
            throw new ENetworkException("ENetwork:DownloadScript", "err_noscripturl", l24ht);
        }
        var elScript = document.createElement("script");
        elScript.type = "text/javascript";
        elScript.language = "javascript";
        elScript.id = typeof (c) == "undefined" ? ENetwork.GetExecutionID() : c;
        elScript.src = a;
        if (document.getElementById(c)) {
            ENetwork.GetAttachTarget().removeChild(document.getElementById(c));
        }
        ENetwork.GetAttachTarget().appendChild(elScript);
        if (navigator.userAgent.indexOf("IE") >= 0) {
            elScript.onreadystatechange = function () {
                if (elScript && ("loaded" == elScript.readyState || "complete" == elScript.readyState)) {
                    elScript.onreadystatechange = null;
                    ENetwork.DownloadScriptCallback(b);
                }
            }
        }
        else {
            elScript.onload = function () {
                elScript.onload = null;
                ENetwork.DownloadScriptCallback(b);
            }
        }
        return elScript.id;
    }
    catch (e) {
        alert('加载失败！');
    }
};
ENetwork.GetAttachTarget = function () {
    if (document.getElementsByTagName("head")[0] != null) {
        return document.getElementsByTagName("head")[0];
    }
    else {
        throw new ENetworkException("ENetwork:cstr", "err_noheadelement", l611ft);
    }
};
function ENetworkException(b, c, a) {
    this.source = b;
    this.name = c;
    this.message = a;
}
ENetworkException.prototype.Name = this.name;
ENetworkException.prototype.Source = this.source;
ENetworkException.prototype.Message = this.message;

//*************美女图片***************
function fnShowGirlPic() {
    ENetwork.DownloadScript("channel/getgirlpic", function () {
        if (typeof SearchData != 'undefined') {
            var picData = SearchData;
            var count = picData.length;
            if (count > 0) {
                //先生出3个不重复的随机数0~9
                var randList = new Array();
                var i = 0;
                while (1) {
                    var rand = parseInt((Math.random() * count));
                    if (randList.length == 3) { break; }
                    if (randList[i] == rand) {
                        continue;
                    } else {
                        randList[i] = rand;
                    }
                    i++;
                }
                var picHTML = '	<div class="title">帅男靓女</div> <ul class="ul_1">';
                var liHTML = '';
                for (var m = 0; m < randList.length; m++) {
                    if (m == 2) {
                        liHTML += '<li class="current"><dl><dt><a href="' + GetLink(picData[randList[m]].pcb_userName) + '" target="_blank"><img src="' + picData[randList[m]].head_big + '" width="83" height="83" /></a></dt><dd><a href="' + GetLink(picData[randList[m]].pcb_userName) + '" target="_blank">' + picData[randList[m]].pcb_nickName + '</a></dd></dl></li>';
                    } else {
                        liHTML += '<li><dl><dt><a href="' + GetLink(picData[randList[m]].pcb_userName) + '" target="_blank"><img src="' + picData[randList[m]].head_big + '" width="83" height="83" /></a></dt><dd><a href="' + GetLink(picData[randList[m]].pcb_userName) + '" target="_blank">' + picData[randList[m]].pcb_nickName + '</a></dd></dl></li>';

                    }

                }
                var showJDTitleHtml = '<div class="clear"></div><div style="margin-top:15px;padding-top:10px;"><p style="margin-bottom:8px;"><a href="http://guangzhou.baicai.com/" target="_blank" style="color:#CD5809" onclick="fnGoogleClick(\'baicai\')">top1.薪资不给力，跳槽还是“卧薪尝胆”</a></p><p><a href="http://ka.edushi.com/" target="_blank" style="color:#CD5809" onclick="fnGoogleClick(\'ka\')">top2.这些年，美女都喜欢用这个…</a></p></div>';
                picHTML += liHTML += '</ul>' + showJDTitleHtml + '</div><div class="clear"></div>';
                $('girlDiv').innerHTML = picHTML;
            }
        }
    });
}
function GetLink(userName) {
    return 'sd-' + userName + '.shtml';
}
function fnGoogleClick(t) {
    pageTracker._trackEvent('Map_jd', 'tg-hy-' + t, "黄页美女标题点击");
}
//*************美女图片*************** 结束

//*************招聘信息***************
var Search = null;
var pageSize = 6;
var pageCountArray = new Array();
var sumArray = new Array();
function getzhaopin(currentid) {
    var loading = '<div style="text-align:center; line-height:200%;font-size=12px;"><img src="http://res.edushi.com/images/loading.gif"><br />正在加载...</div>';
    this.$('gz').innerHTML = loading;
    var url = "channel/getgz/" + currentid;// + "&cityCode=" + EDS_CityCode + "&rnd=" + Math.random();
    ENetwork.DownloadScript(url, function () { flagzhaopinHTML(); });
}
function flagzhaopinHTML() {
    this.$('gz').innerHTML = '';
    if (typeof SearchTable != 'undefined') {
        Search = SearchTable;
        if (Search.length > 0) {
            this.$('gz').innerHTML = '<div class="title">招聘...</div>';
            for (var i = 0; i < SearchTable.length; i++) {
                sumArray.push(SearchTable[i].length);
                if (SearchTable[i].length > 0) {
                    if (sumArray[i] % pageSize == 0) {
                        pageCountArray.push(sumArray[i] / pageSize);
                    }
                    else {
                        pageCountArray.push(int(sumArray[i], pageSize) + 1);
                    }
                    var zhaopin = document.createElement('div');
                    zhaopin.setAttribute('id', 'zhaopin' + i);
                    zhaopin.className = 'Elsebox';
                    $('gz').appendChild(zhaopin);
                    zhaopinHtml(1, i, null, 0);
                    //getPageHtml(i, pageCountArray[i]);
                }
            }
        }
        else {
            $('gz').style.display = 'none';
        }
    }
    else {
        $('gz').style.display = 'none';
    }

}
function int(i, k) {
    return Math.floor((i - 1) / k);
}

function getPageHtml(index, pageCount) {
    var pageHtml = '<div class="otherpage"><div  class="paginate r"  >';
    var last = pageCount + 1;
    pageHtml += '<a id ="a_{$index}0" onclick="zhaopinHtml(1,{$index},this,1);" title="首页" style="font-family: 宋体;cursor:pointer;">首页</a>';
    pageHtml = pageHtml.replace('{$index}', index).replace('{$index}', index);
    for (var i = 0; i < pageCount; i++) {
        var s = i + 1;
        pageHtml += '<a id ="a_{$index}' + s + '" onclick="zhaopinHtml(' + s + ',' + index + ',this,1)" style="font-family: 宋体;cursor:pointer;">[' + s + ']</a>';
        pageHtml = pageHtml.replace('{$index}', index);
    }
    pageHtml += '<a id="a_{$index}' + last + '"  onclick="zhaopinHtml(' + pageCount + ',' + index + ',this,1);" title="末页" style="font-family: 宋体;cursor:pointer;">末页</a>';
    pageHtml = pageHtml.replace('{$index}', index);
    pageHtml += '</div></div><div class="clear"></div>';
    if (pageCount > 1) {
        this.$('zhaopin' + index).innerHTML += pageHtml;
    }
}
function zhaopinHtml(curr, index, obj, state) {
    if (obj != null) {
        obj.style.color = "#EF7E00";
        for (var i = 0; i < pageCountArray[index] + 2; i++) {
            var objid = obj.id;
            if (objid != 'a_' + index + i) {
                this.$('a_' + index + i).style.color = "#666666";
            }
        }
    }
    var CurrentPage = curr;

    var zhaopinHtml = '';
    var zhaopinlist = '';
    for (var n = (CurrentPage - 1) * pageSize; n < CurrentPage * pageSize; n++) {
        if (n > sumArray[index] - 1) {
            break;
        }
        if (n == (CurrentPage - 1) * pageSize) {
            zhaopinHtml += '<ul class="ul_2" id="subDivZhaopin{$index}"><li class="li_title">{$sityName}</li>{$zhaopinlist}</ul>';
            zhaopinHtml = zhaopinHtml.replace('{$sityName}', Search[index][n].siteName).replace('{$index}', index);
        }
        zhaopinlist += '<li><span class="span2 y2"><a href="{$JobUrl}" target="_blank" title="{$JobName}">{$JobName}</a></span><span class="span3 y3">{$CName}</span><span class="span4"> {$RegDate}</span></li>';
        zhaopinlist = zhaopinlist.replace("{$JobUrl}", Search[index][n].JobUrl);
        zhaopinlist = zhaopinlist.replace("{$JobName}", Search[index][n].JobName).replace("{$JobName}", Search[index][n].JobName);
        zhaopinlist = zhaopinlist.replace("{$CName}", Search[index][n].CName);
        zhaopinlist = zhaopinlist.replace("{$RegDate}", Search[index][n].RegDate.substring(5, 10));
    }

    zhaopinHtml = zhaopinHtml.replace("{$zhaopinlist}", zhaopinlist);
    if (state == 0) {
        this.$('zhaopin' + index).innerHTML += zhaopinHtml;
    }
    else {
        this.$('subDivZhaopin' + index).innerHTML = zhaopinHtml;
    }

}
//*************招聘信息*************** 结束

//*************酒店信息***************
function GetHotels(currentid) {
    var loading = '<div style="text-align:center; line-height:200%;font-size=12px;"><img src="http://res.edushi.com/images/loading.gif"><br />正在加载...</div>';
    this.$('jd').innerHTML = loading;
    var url = "channel/getjd/" + currentid;// + "&rnd=" + Math.random();
    ENetwork.DownloadScript(url, function () { fnGetHotelInfo(); });
}
function fnGetHotelInfo() {
    var hotelHTML = '';
    var hotelList = '';
    this.$('jd').innerHTML = '';
    if (typeof SearchTable != 'undefined') {
        var hotels = SearchTable;
        var htLength = hotels.length;
        if (htLength > 0) {
            $('jd').innerHTML = '<div class="title">预定...</div>';
            hotelHTML = '<ul class="ul_2" id="subDivHotel{$index}"><li class="li_title">{$HotelName}</li>{$hotellist}</ul>';
            for (var i = 0; i < htLength; i++) {
                hotelHTML = hotelHTML.replace('{$HotelName}', hotels[i].HotelName).replace('{$index}', i);

                hotelList += ' <li><span class="span5 y5">高级客房</span> <span class="span6 y6"><a href="{$HotelUrl}" target="_blank">{$sityName} </a> </span><span class="span7 y5">{$price} </span><span class="span8"><a href="{$HotelUrl}" target="_blank">预定</a> </span></li>';
                hotelList = hotelList.replace("{$HotelUrl}", hotels[i].HotelUrl);
                hotelList = hotelList.replace("{$sityName}", hotels[i].SiteName);
                if (hotels[i].Price == '') {
                    hotelList = hotelList.replace("{$price}", '无');
                }
                else {
                    hotelList = hotelList.replace("{$price}", hotels[i].Price + '元');
                }
                hotelList = hotelList.replace("{$HotelUrl}", hotels[i].HotelUrl);
            }
            hotelHTML = hotelHTML.replace("{$hotellist}", hotelList);
            $('jd').innerHTML += hotelHTML;
        }

    }
}
//*************酒店信息*************** 结束

//*************房产信息***************
var SearchHouse = null;
var pageSizeHouse = 6;
var pageCountArray = new Array();
var sumArray = new Array();
function getHouse(currentid) {
    var loading = '<div style="text-align:center; line-height:200%;font-size=12px;"><img src="http://res.edushi.com/images/loading.gif"><br />正在加载...</div>';
    this.$('div_house').innerHTML = loading;
    var url = "channel/getfc/" + currentid;// + "&cityCode=" + EDS_CityCode + "&rnd=" + Math.random();
    ENetwork.DownloadScript(url, function () { flagHouse(); });
}
function flagHouse() {
    if (typeof SearchTable != 'undefined') {
        SearchHouse = SearchTable;
        if (SearchHouse.length > 0) {
            this.$('div_house').innerHTML = '<div class="title">房产...</div>';
            for (var i = 0; i < SearchHouse.length; i++) {
                sumArray.push(SearchHouse[i].length);
                if (SearchHouse[i].length > 0) {
                    if (sumArray[i] % pageSizeHouse == 0) {
                        pageCountArray.push(sumArray[i] / pageSizeHouse);
                    }
                    else {
                        pageCountArray.push(int(sumArray[i], pageSizeHouse) + 1);
                    }
                    var house = document.createElement('div');
                    house.setAttribute('id', 'house' + i);
                    $('div_house').appendChild(house);
                    houseHtml(1, i, null, 0);
                    getHousePageHtml(i, pageCountArray[i]);
                }
            }
        }
        else {
            $('div_house').style.display = 'none';
        }
    }
    else {
        $('div_house').style.display = 'none';
    }

}
function getHousePageHtml(index, pageCount) {
    var pageHtml = ' <p class="page">';
    var last = pageCount + 1;
    pageHtml += '<a id ="a_{$index}0" onclick="houseHtml(1,{$index},this,1);" title="首页" style="font-family: 宋体;cursor:pointer;">首页</a>';
    pageHtml = pageHtml.replace('{$index}', index).replace('{$index}', index);
    for (var i = 0; i < pageCount; i++) {
        var s = i + 1;
        pageHtml += '<a id ="a_{$index}' + s + '" onclick="houseHtml(' + s + ',' + index + ',this,1)" style="font-family: 宋体;cursor:pointer;">[' + s + ']</a>';
        pageHtml = pageHtml.replace('{$index}', index);
    }
    pageHtml += '<a id="a_{$index}' + last + '"  onclick="houseHtml(' + pageCount + ',' + index + ',this,1);" title="末页" style="font-family: 宋体;cursor:pointer;">末页</a>';
    pageHtml = pageHtml.replace('{$index}', index);
    pageHtml += '</p>';
    if (pageCount > 1) {
        this.$('house' + index).innerHTML += pageHtml;
    }
}
function houseHtml(curr, index, obj, state) {
    if (obj != null) {
        obj.style.color = "#EF7E00";
        for (var i = 0; i < pageCountArray[index] + 2; i++) {
            var objid = obj.id;
            if (objid != 'a_' + index + i) {
                this.$('a_' + index + i).style.color = "#666666";
            }
        }
    }
    var CurrentPage = curr;
    var houseHtml = '';
    var houselist = '';
    for (var n = (CurrentPage - 1) * pageSizeHouse; n < CurrentPage * pageSizeHouse; n++) {
        if (n > sumArray[index] - 1) {
            break;
        }
        if (n == (CurrentPage - 1) * pageSizeHouse) {
            houseHtml += ' <ul class="ul_2" id="subDivHouse{$index}"><li class="li_title"><span class="tname">{$SiteName}</span></li>{$houselist}</ul>';
            houseHtml = houseHtml.replace('{$SiteName}', SearchHouse[index][n].SiteName).replace('{$index}', index);
        }
        houselist += '<li><span class="span2 y2"><a href="{$Url}" target="_blank" title="{$Name}">{$Name}</a></span><span class="span9 y9">{$UnitPrice}元/m<sup>2</sup>(本房源信息来自{$SiteName}) </span></li>';

        houselist = houselist.replace("{$Url}", SearchHouse[index][n].Url);
        houselist = houselist.replace("{$Name}", SearchHouse[index][n].Name).replace("{$Name}", SearchHouse[index][n].Name);
        houselist = houselist.replace("{$UnitPrice}", SearchHouse[index][n].UnitPrice);
        houselist = houselist.replace("{$SiteName}", SearchHouse[index][n].SiteName);
    }

    houseHtml = houseHtml.replace("{$houselist}", houselist);
    if (state == 0) {
        this.$('house' + index).innerHTML += houseHtml;
    }
    else {
        this.$('subDivHouse' + index).innerHTML = houseHtml;
    }

}
//*************房产信息*************** 结束

//*************美女列表***************
function ShowGirlPic() {
    ENetwork.DownloadScript("channel/getgirlpic", function () {
        if (typeof SearchData != 'undefined') {
            var picData = SearchData;
            var count = picData.length;
            var _obj = '';

            for (var index = 0; index < count; index++) {
                if (picData[index].pcb_userName == PCB_USER_NAME) {
                    _obj = picData[index];
                }
            }
            //先生出19个不重复的随机数0~count
            var randList = new Array();
            var i = 0;
            while (1) {
                var rand = parseInt((Math.random() * count));
                if (randList.length == 19) { break; }
                if (randList[i] == rand || picData[rand].pcb_userName == PCB_USER_NAME) {
                    continue;
                } else {
                    randList[i] = rand;
                }
                i++;
            }
            var url = 'http://i.sodao.com/';
            var liHTML = '';

            //记住点过来的那个美女用户
            if (_obj != '') {
                liHTML += '<li><a href="' + url + _obj.pcb_userName + '" target="_blank"><img src="' + _obj.head_big + '" /></a><p><a href="' + url + _obj.pcb_userName + '" target="_blank">' + _obj.pcb_nickName + '</a></p></li>';
            }


            for (var m = 0; m < randList.length; m++) {

                liHTML += '<li><a href="' + url + picData[randList[m]].pcb_userName + '" target="_blank"><img src="' + picData[randList[m]].head_big + '" /></a><p><a href="' + url + picData[randList[m]].pcb_userName + '" target="_blank">' + picData[randList[m]].pcb_nickName + '</a></p></li>';
            }
            $('PicList').innerHTML = liHTML;
            fnMarquery();
        }
        else {
            setTimeout('ShowGirlPic()', 100);
        }
    });
}
//*************美女列表*************** 结束
function ShowAD(edataUrl, cityCode, language, keys, domid) {
    var url = edataUrl + 'ADData/Ad2.0/ads.aspx?citycode=' + cityCode + '&l=' + language + '&key=' + keys + '&domid=' + domid;
    ENetwork.DownloadScript(url);
}
function fnMarquery() {
    var MarqueeDiv3Control = new Marquee(["Marquee", "PicList"], 2, 0.1, 775, 220, 20, 3000, 3000)//向左翻屏滚动、缓动及跳过等待时间实例
    document.getElementById("LeftButton").onclick = function () { MarqueeDiv3Control.Run(2) }; //跳过等待时间向左滚动后保持原向运动
    document.getElementById("RightButton").onclick = function () { MarqueeDiv3Control.Run(3) }; //跳过等待时间向右滚动后保持原向运动
}
function GetViewCount(url) {
    ENetwork.DownloadScript(url, function () {
        if (typeof _ViewCount != undefined) {
            $('BrowseCount').innerHTML = _ViewCount.Count;
        }
    });
}