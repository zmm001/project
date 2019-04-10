$(function(){
	//顶部导航展开与关闭
    $(".nav-tips .more").click(function (e) {
        $(this).toggleClass("on");
        $(".sitemap").toggle();
        e.stopPropagation();
    });
    if ($(".sitemap:visible")) {
        $(window).bind("scroll", function () {
            $(".nav-tips .more").removeClass("on");
            $(".sitemap").hide();
        });
        $(document).click(function () {
            $(".nav-tips .more").removeClass("on");
            $(".sitemap").hide();
        });
        $(".sitemap").click(function (e) {
            e.stopPropagation();
        });
    }


	//页面滚动时顶部登录按钮背景变化
	$(window).bind("scroll",function(){
		var _scrollTop = $(window).scrollTop();
		if(_scrollTop > 0){
			$(".nav-tips a.login").addClass("black");
		}else{
			$(".nav-tips a.login").removeClass("black");
		}
	});	
});

//返回顶部
function backTop(contenter,topObj){
	var _windowHeight = $(window).height();
	contenter.css({"right":parseInt(($(window).width() - 1200)/2-contenter.outerWidth(true)-10)});
	$(window).resize(function(){
		contenter.css({"right":parseInt(($(window).width() - 1200)/2-contenter.outerWidth(true)-10)});
	});
	$(window).scroll(function(){
		var _scrollTop = $(window).scrollTop();
		if(_scrollTop >= parseInt(_windowHeight/2)){
			contenter.fadeIn();	
		}else{
			contenter.fadeOut();
		}
	});
	topObj.click(function(){
		$("body, html").animate({scrollTop:0},500);
	});
}
backTop($(".back-top"),$(".back-top span"));

//固定
function toFixed( obj , n ){
	$(window).bind("scroll",function(){
		if($(window).scrollTop() >= n){
			obj.addClass("fixed");
		}else{
			obj.removeClass("fixed");
		}
	});
};

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
//退出登录
function fnLoginOut() {
    var backUrl = escape(window.location.href);
    window.location.href = "http://my.edushi.com/loginout.aspx?BackUrl=" + backUrl;
}