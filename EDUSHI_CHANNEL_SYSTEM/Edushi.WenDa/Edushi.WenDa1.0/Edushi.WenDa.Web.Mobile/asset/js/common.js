window.onresize=window.onorientationchange=function(){
	document.documentElement.style.fontSize=100*( (document.documentElement.clientWidth)/750 )+"px";
	landscape();
};

//横屏模式
function landscape(){
	if(window.innerHeight-window.innerWidth < 0){
		$("header, .main-nav-box, .floatbar").addClass("landscape");
	}else{
		$("header, .main-nav-box, .floatbar").removeClass("landscape");
	}
}
landscape();

function zanCai(obj, className) {
    obj.addClass(className);
    obj.find("em").show().delay(1000).hide(200);
    obj.siblings().css({ "cursor": "text" });
}

$(function(){
	//导航悬浮
	$(window).bind("scroll",function(){
		if($(window).scrollTop() > $("header").height()){
			$(".main-nav-box").addClass("fixed");
		}
		else{
			$(".main-nav-box").removeClass("fixed");
		}
	});

	//导航下拉
	$(".more-nav").html($(".main-nav nav").html());
	$(".main-nav .btn").bind("click",function(){
		$(this).toggleClass("on")
		$(".more-nav").slideToggle();
	});
	
	//导航位置
	var left = $(".main-nav nav .on").index()*parseInt($(".main-nav nav a").outerWidth(true))-parseInt($(".main-nav nav a").outerWidth(true));
    $(".main-nav nav").scrollLeft(left);

	//返回顶部按钮
	$(".back-top").bind("click",function(){
		$('body,html').animate({ scrollTop: 0 }, 300);
	});

	$(window).bind("scroll",function(){
		if($(window).scrollTop() > $(window).height()*2){
			$(".floatbar").fadeIn(200);
		}else{
			$(".floatbar").fadeOut(200);
		}
	});

	//刷新
	$(".floatbar .refresh").click(function(){
		window.location.reload();
	});

	//点赞或踩
	$(".js-votebox").on("click", ".js-votelist .zan", function () {
	    if (!$(this).hasClass("yizan")) {
	        var _this = $(this);
	        var answerId = _this.parents(".answer-user").data("id");
	        $.ajax({
	            type: "post",
	            dataType: "json",
	            url: "/wenda/AddAnswerUpvoteDownvote.htm",
	            data: { "iaId": answerId, "action": 1 },
	            success: function (data) {
	                if (data.ResultCode == 1) {
	                    var _number = _this.find("span").text();
	                    _this.find("span").text(parseInt(_number) + 1);
	                    zanCai(_this, "yizan"); 
	                } else if (data.ResultCode == 2) {
	                    window.location.href = 'http://m.edushi.com/user/Login.html?BackUrl=' + window.location.href;
	                } else {
	                    popUp(data.Msg);
	                }
	            }
	        });


	    }
	});
	$(".comment-box").on("click",".comment-list li.cai",function(){
		if($(this).hasClass("yicai") || $(this).siblings("li.zan").hasClass("yizan")){
			_isClick = false;
		}else{
			var _this = $(this);
			var _number = _this.find("span").text();
			_this.addClass("yicai");
			_this.find("em").show();
			_this.find("span").text(parseInt(_number)+1);
		}
	});

});
function popUp(msg){
    $(".pop-content").show();
    $("#msg").text(msg);
}