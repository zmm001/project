// JavaScript Document
$(function(){
	//顶部导航展开与关闭
//	$(".more-tips").click(function(){
//		var _Height = $(".top-tips p").height();
//		if(_Height == 15){
//			$(this).addClass("less-tips");
//			$(".top-tips p").css({"height":"auto"});
//		}else{
//			$(this).removeClass("less-tips");
//			$(".top-tips p").css({"height":"15px"});
//		}
//	});
	
	//返回顶部
	$(".back-top").click(function(){
		$("html,body").animate({scrollTop:0},500);
	});
	
	//搜索展开与关闭
	var _topSearch = $(".top-search-icon");
	if(_topSearch.length>0){
		_topSearch.click(function(){
			var _showAsk = $(".show-ask-box");
			if(_showAsk.is(":visible")){
				_showAsk.slideUp();
			}else{
				_showAsk.slideDown();
			}
		});
	}
	
	//分类展开与关闭
	var _getCategory = $(".all-category");
	if(_getCategory.length>0){
		_getCategory.find("dl:odd").after("<p class='clear'></p>");
		_getCategory.find("dl:odd").addClass("odd");
		_getCategory.find("dl dt").click(function(){
			var _this = $(this);
			var _subCategory = _this.next("dd");
			if(_subCategory.is(":visible")){
				_this.removeClass("current");
				_subCategory.stop(true,false).slideUp();
			}else{
				_this.addClass("current").parent("dl").siblings().find("dt").removeClass("current");
				_subCategory.stop(true,false).slideDown().parent("dl").siblings().find("dd").hide();
			}
		});
	}
	
	//城市切换展开与关闭
	if($(".citylist").length>0){
		$(".citylist .t").toggle(function () {
			$(this).next().slideDown(100);
			$(this).find("span").addClass("on");
		}, function () {
			$(this).next().slideUp(100);
			$(this).find("span").removeClass("on");
		});
	}
});

function getLoginState(citycode) {
    //用JS获取用户的昵称
    var obj = document.getElementById("loginstate");
    var cc = new CookieHelper();
    var cookieNickNameCookie = (cc.getCookie('MemberNickName'));
    var backUrl = escape(window.location.href);
    if (cookieNickNameCookie != null) {
        //obj.innerHTML = '<img src="http://res.edushi.com/bdt/3g/images/user_login.png" alt="" width="24" height="24" />';
    } else {
        obj.setAttribute("href", 'http://my.edushi.com/3g/Login.aspx?City=' + citycode + '&BackUrl=' + backUrl);
    }
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

//采纳最佳答案
function bestAnswer(id, cid, url) {
    jQuery.ajax({
        type: "post",
        url: url + "?ltId=" + id + "&ltcId=" + cid,
        dataType: "json",
        success: function (item) {
            if (item == 1) {
                alert("采纳最佳答案成功！");
            } else {
                alert("采纳最佳答案失败！");
            }
        }
    });
}

function SubmitAnwer(id, posturl) {
    //id：帖子ID，url：验证码地址，posturl：添加回答
    var editor = $("#txtEditor");
    var YZM = $("#txtYZM");

    if (editor.val().length < 5 || editor.val() == "我来帮TA回答") {
        alert("内容详细不能少于 5 个字！");
        editor.focus();
        return;
    }
    if (YZM.val() == "" || YZM.val() == "计算结果") {
        alert("验证码不能为空！");
        YZM.focus();
        return;
    }
    PostAnswer(id, posturl, editor.val(), YZM.val());
}

//提交问题
function PostAnswer(id, url, content, yzm) {
    jQuery.ajax({
        type: "post",
        url: url,
        data: { nLtID: id, sLtcContent: content, txtYZM: yzm },
        dataType: "json",
        success: function (data) {
            if (data.message == "提交成功，谢谢您的参与") {
                $("#txtEditor").val("");
            }
            $("#txtYZM").val("").focus();
            $("#imgVerifyCode").click();
            alert(data.message);
            if (data.message == "验证码错误") {
                $("#hids").val(data.code);
                $("#hidu").val(data.yzm);
            }
        }
    });
}