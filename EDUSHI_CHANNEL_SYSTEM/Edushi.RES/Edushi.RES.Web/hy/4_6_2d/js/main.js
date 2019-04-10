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

function fnSearchFocus() {
    var k = $("#txtKeyword");
    if(k.val()=='请输入搜索关键字'){
        k.val("").css("color","#666");
    }
}
function fnSearch() {
    var k = $("#txtKeyword");
    var v = $.trim(k.val());
    if (v == '请输入搜索关键字' || v == "") {
        alert("请输入搜索关键字");
        k.focus();
    }
    else {
        window.location = k.attr("href") + "?q=" + encodeURIComponent(v);
    }
}
function fnLoginOut(city) {
    var backUrl = escape(window.location.href);
    $.get("logout.shtml", { BackUrl: backUrl, rnd: Math.random() }, function (data, state) {
        if (data == 3) getLoginState();
        else alert('退出登录', '退出登录失败' + data);
    });
    //或者退出直接链接到http://my.edushi.com/loginout.aspx?BackUrl=backUrl
}