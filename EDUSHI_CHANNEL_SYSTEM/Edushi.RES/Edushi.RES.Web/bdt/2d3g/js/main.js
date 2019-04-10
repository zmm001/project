$(function () {
    $("#btnSearch").click(function () {        
        var q = $.trim($("#txtKeyword").val());
        if (q != "" && q != "请输入关键字") {
            window.location.href = searchurl + "?q=" + encodeURIComponent(q);
        } else {
            $("#txtKeyword").val("请输入关键字");
        }
    })
    $("#txtKeyword").focus(function () {
        if ($(this).val() == "请输入关键字") {
            $(this).val("");
        }
    })
})
function getLoginState(citycode) {
    //用JS获取用户的昵称
    var obj = document.getElementById("loginstate");
    var cc = new CookieHelper();
    var cookieNickNameCookie = (cc.getCookie('MemberNickName'));
    var backUrl = escape(window.location.href);
    if (cookieNickNameCookie != null) {
        obj.innerHTML = '<img src="http://res.edushi.com/bdt/3g/images/user_login.png" alt="" width="24" height="24" />';
    } else {
        obj.setAttribute("href", 'http://my.edushi.com/3g/Login.aspx?City=' + citycode + '&BackUrl=' + backUrl);
    }
}
function fnToUsercenter() {

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

if (typeof window.Hp == "undefined") window.Hp = {};
if (typeof window.Hp.FlyPage == "undefined") window.Hp.FlyPage = {
    isInitialized: false,
    isTouch: false,
    flyDiv: null,
    indexDiv: null,
    dotPage: null,
    pageCount: 0,
    flyWidth: 0,
    pageIndex: 0,
    beginx: 0,
    stopx: 0,
    delay: 0,
    processIndexing: function (c) {
        this.indexDiv.find(c).hover(function () {
            $(this).not('.current').addClass('hover')
        },
        function () {
            $(this).not('.current').removeClass('hover')
        })
    },
    processAnimating: function () {
        this.dotPage.find('span').removeClass('hover current').eq(this.pageIndex).addClass('current');
        this.flyDiv.animate({
            left: -(this.flyWidth * this.pageIndex) + 'px'
        },
        this.delay)
    },
    createDotPage: function () {
        var d = [];
        for (var i = 1; i <= this.pageCount; i++) {
            d[d.length] = '<span title="' + i + '"class=""></span>'
        }
        this.dotPage.append(d.join(''));
        this.dotPage.find('span:first').addClass('current').end().find('span').click(function () {
            var e = Hp.FlyPage;
            e.pageIndex = $(this).index();
            e.processAnimating()
        }).hover(function () {
            $(this).not('.current').addClass('hover')
        },
        function () {
            $(this).not('.current').removeClass('hover')
        })
    },
    touchMove: function (et) {
        var e = Hp.FlyPage;
        var s = e.beginx - et.changedTouches[0].pageX;
        e.flyDiv.animate({
            left: -(s + e.flyWidth * e.pageIndex) + 'px'
        },
        0)
    },
    touchStart: function (et) {
        var e = Hp.FlyPage;
        if (et.touches.length > 1) {
            return
        }
        e.beginx = et.touches[0].pageX;
        e.stopx = 0
    },
    touchEnd: function (et) {
        var e = Hp.FlyPage;
        if (et.changedTouches.length > 1) {
            return
        }
        e.stopx = et.changedTouches[0].pageX;
        var s = e.beginx - e.stopx;
        var d = s > 0 ? -1 : 1;
        if ((e.pageIndex - d) < e.pageCount && (e.pageIndex - d) >= 0) {
            e.pageIndex -= d
        }
        e.processAnimating()
    },
    init: function () {
        var e = Hp.FlyPage;
        if (e.isInitialized) return;
        e.isInitialized = true;
        if (typeof window.ontouchstart !== "undefined") {
            e.isTouch = true
        }
        e.flyDiv = $(".hpFP_content");
        e.indexDiv = $(".hpFP_slide");
        e.dotPage = $(".hpFP_dotPaging");
        e.pageCount = $(".hpFP_slide").length;
        e.flyWidth = $(".hpFP_box").width();
        e.flyDiv.css("width", e.pageCount * e.flyWidth);
        e.pageIndex = 0;
        e.beginx = 0;
        e.stopx = 0;
        e.delay = 500;
        e.processIndexing('.hpCmp_indexLink');
        e.createDotPage();
        if (e.isTouch) {
            e.flyDiv.get(0).addEventListener("touchstart", e.touchStart, false);
            e.flyDiv.get(0).addEventListener("touchmove", e.touchMove, false);
            e.flyDiv.get(0).addEventListener("touchend", e.touchEnd, false)
        } else {
            e.flyDiv.draggable({
                axis: 'x',
                handle: 'div',
                start: function (event, ui) {
                    var e = Hp.FlyPage;
                    e.beginx = this.offsetLeft;
                    e.stopx = 0
                },
                stop: function (event, ui) {
                    var e = Hp.FlyPage;
                    e.stopx = this.offsetLeft;
                    var s = e.beginx - e.stopx;
                    var d = s > 0 ? -1 : 1;
                    if ((e.pageIndex - d) < e.pageCount && (e.pageIndex - d) >= 0) {
                        e.pageIndex -= d
                    }
                    e.processAnimating()
                }
            })
        }
    }
};