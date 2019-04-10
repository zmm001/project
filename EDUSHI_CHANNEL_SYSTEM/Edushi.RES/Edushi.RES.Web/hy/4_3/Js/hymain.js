//#region 基本
function ENetwork(){};
ENetwork.GetExecutionID = function()
{
    var a = new Date, b = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(),a.getHours(), a.getMinutes(), a.getSeconds(), a.getMilliseconds());
    b += Math.round(Math.random() * 1000000);
    return b
};
ENetwork.DownloadScriptCallback = function(a)
{
    if (a){
        a();
    }
};
ENetwork.DownloadScript = function(a, b, c)
{
    try{        
        if (a == null || a == "undefined" || a.length == 0){
            throw new ENetworkException("ENetwork:DownloadScript", "err_noscripturl",l24ht);
        }
        var elScript = document.createElement("script");
        elScript.type = "text/javascript";
        elScript.language = "javascript";
        elScript.id = typeof(c) == "undefined" ? ENetwork.GetExecutionID() : c;
        elScript.src = a;        
        if(document.getElementById(c)){
            ENetwork.GetAttachTarget().removeChild(document.getElementById(c));
        }
        ENetwork.GetAttachTarget().appendChild(elScript);
        if (navigator.userAgent.indexOf("IE") >= 0){
            elScript.onreadystatechange = function(){
                if (elScript && ("loaded" == elScript.readyState || "complete" == elScript.readyState)){
                    elScript.onreadystatechange = null;
                    ENetwork.DownloadScriptCallback(b);                    
                }
            }
        }
        else{
            elScript.onload = function(){
                elScript.onload = null;
                ENetwork.DownloadScriptCallback(b);
            }
        }        
        return elScript.id;
    }
    catch (e){
        alert('加载失败！');
    }
};
ENetwork.GetAttachTarget = function()
{
    if (document.getElementsByTagName("head")[0] != null){
        return document.getElementsByTagName("head")[0];
    }
    else{
        throw new ENetworkException("ENetwork:cstr", "err_noheadelement", l611ft);
    }
};
function ENetworkException(b, c, a)
{
    this.source = b;
    this.name = c;
    this.message = a;
}
ENetworkException.prototype.Name = this.name;
ENetworkException.prototype.Source = this.source;
ENetworkException.prototype.Message = this.message;

//Cookie操作类
function CookieHelper() { }
CookieHelper.prototype.expires = '';
CookieHelper.prototype.path = '';
CookieHelper.prototype.domain = '';
CookieHelper.prototype.secure = '';
//get Cookie value
CookieHelper.prototype.getCookie = function(sCookieName) {
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
CookieHelper.prototype.setCookie = function(sCookieName, sCookieValue, dCookieExpires) {
    var argv = this.setCookie.arguments, argc = this.setCookie.arguments.length;
    var sExpDate = (argc > 2) ? "; expires=" + argv[2].toGMTString() : "";
    var sPath = (argc > 3) ? "; path=" + argv[3] : "";
    var sDomain = (argc > 4) ? "; domain=" + argv[4] : "";
    var sSecure = (argc > 5) && argv[5] ? "; secure" : "";
    document.cookie = sCookieName + "=" + escape(sCookieValue, 0) + sExpDate + sPath + sDomain + sSecure + ";";
};
//#endregion

//#region 方法
function $(objId) {
    return document.getElementById(objId);
}
String.prototype.Trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
function GetPara(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
function fnLoginOut(city) {
    var sLoginUrl = 'Login.aspx?action=loginout&rnd=' + $Rnd();
    ENetwork.DownloadScript(sLoginUrl, function() {
        if (typeof __LoginResult != 'undefined') {
            if (__LoginResult == 3) {
                fnLoginOutSuccess(city);
            }
            else {
                alert('退出登录', '退出登录失败' + __LoginResult);
            }
        }
        else {
            alert('退出登录', '退出登录失败');
        }
    });
}
function fnLoginOutSuccess(city) {
    var backUrl = escape(window.location.href);
   document.getElementById("UserInfo").innerHTML = '欢迎您！&nbsp;&nbsp;<span>[<a href="http://my.edushi.com/Register.aspx" target="_blank">注册</a>]</span>&nbsp;&nbsp;<span>[<a href="http://my.edushi.com/Login.aspx?City='+city+'&BackUrl='+backUrl+'" >登录</a>]</span>';
    //fnShowMessageBox('退出登录','您已经成功退出');
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
    window.location.href = 'KeywordSearchList.aspx?Keyword=' + Keyword;
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
function ImgErr(e) {
    e.src = 'http://res.edushi.com/hy/4_3/images/NOPHOTO.png'
}

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

function getLoginState(citycode) {
    if (typeof citycode == 'undefined') {
        citycode = 'hz';
    }
    //用JS获取用户的昵称
    var obj = document.getElementById("UserInfo");
    var cc = new CookieHelper();
    var cookieNickNameCookie = (cc.getCookie('MemberNickName'));
    var backUrl = escape(window.location.href);
    if (cookieNickNameCookie != null) {
        obj.innerHTML = '欢迎您！<span style="color:#ff6400">' + unescape(cookieNickNameCookie) + '</span><span>[<a href="http://my.edushi.com/Index.aspx?city='+citycode+'>" target="_blank">我的E都市</a>]</span><span>[<a style="cursor:pointer;" onclick="fnLoginOut(\''+citycode+'\');">退出</a>]</span>';
    }
    else {
        obj.innerHTML = '欢迎您！<span>[<a href="http://my.edushi.com/Register.aspx" target="_blank" title="注册">注册</a>]</span><span>[<a href="http://my.edushi.com/Login.aspx?City='+citycode+'&BackUrl=' + backUrl + '" >登录</a>]</span>';
    }
}

function fnShowMore() {
    document.getElementById("channelMore").style.display = 'block';
}
function fnHideMore() {
    document.getElementById("channelMore").style.display = 'none';
}
function fnChangeCity() {
    var _display = document.getElementById("CityList").style.display;
    if (_display == 'none') {
        document.getElementById("CityList").style.display = 'block';
    } else {
        document.getElementById("CityList").style.display = 'none';
    }
}
//#endregion

//#region 美女图片
function fnShowGirlPic() {
    ENetwork.DownloadScript("Channel/GirlPic.aspx", function () { SetHyHTML(); });
}
function SetHyHTML() {
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
}

function GetLink(userName) {
    return 'sd-' + userName + '.shtml';
}
function fnGoogleClick(t) {
    pageTracker._trackEvent('Map_jd', 'tg-hy-' + t, "黄页美女标题点击");
}

//内页展示
function ShowGirlPic() {
    ENetwork.DownloadScript("Channel/GirlPic.aspx", function () {
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
        //        else {
        //            setTimeout('ShowGirlPic()', 100);
        //        }
    });
}

function fnMarquery() {
    var MarqueeDiv3Control = new Marquee(["Marquee", "PicList"], 2, 0.1, 775, 220, 20, 3000, 3000)//向左翻屏滚动、缓动及跳过等待时间实例
    document.getElementById("LeftButton").onclick = function () { MarqueeDiv3Control.Run(2) }; //跳过等待时间向左滚动后保持原向运动
    document.getElementById("RightButton").onclick = function () { MarqueeDiv3Control.Run(3) }; //跳过等待时间向右滚动后保持原向运动
}
//#endregion