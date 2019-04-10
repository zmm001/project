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

	//评论点赞或踩
	if($(".comment-box").length > 0){
		$(".comment-box").on("click",".comment-list li.zan",function(){
		    if ($(this).hasClass("yizan") || $(this).siblings("li.cai").hasClass("yicai")) {
		        _isClick = false;
		    } else {
		        var _this = $(this);
		        var commentId = _this.parent().data("id");
		        $.ajax({
		            type: "post",
		            dataType: "json",
		            url: "/AddCommentUpvoteDownvote.htm?r=" + new Date().getTime(),
		            data: { "commendId": commentId, "action": 1 },
		            success: function (data) {
		                if (data.ResultCode == 1) {
		                    var _number = _this.find("span").text();
		                    _this.addClass("yizan");
		                    _this.find("em").show();
		                    _this.find("span").text(parseInt(_number) + 1);
		                } else if (data.ResultCode == 2) {
		                    var url = 'http://m.edushi.com/user/Login.html?BackUrl=' + window.location.href;
		                    popUp("亲，登录后才能赞哦", 1, url, "去登陆");
		                } else {
		                    popUp(data.Msg);
		                }
		            }
		        });


		    }
		});
		$(".comment-box").on("click",".comment-list li.cai",function(){
		    if ($(this).hasClass("yicai") || $(this).siblings("li.zan").hasClass("yizan")) {
		        _isClick = false;
		    } else {
		        var _this = $(this);

		        var commentId = _this.parent().data("id");
		        $.ajax({
		            type: "post",
		            dataType: "json",
		            url: "/AddCommentUpvoteDownvote.htm?r=" + new Date().getTime(),
		            data: { "commendId": commentId, "action": 2 },
		            success: function (data) {
		                if (data.ResultCode == 1) {
		                    var _number = _this.find("span").text();
		                    _this.addClass("yicai");
		                    _this.find("em").show();
		                    _this.find("span").text(parseInt(_number) + 1);
		                } else if (data.ResultCode == 2) {
		                    var url = 'http://m.edushi.com/user/Login.html?BackUrl=' + window.location.href;
		                    popUp("亲，登录后才能踩哦", 1, url, "去登陆");
		                } else {
		                    popUp(data.Msg);
		                }
		            }
		        });

		    }
		});
	}

	//点击评论框增大
	if($(".post-comment").length > 0){
		$(".comment-area").focus(function(e){
			e.stopPropagation();
	        $(this).parent(".post-comment").addClass("new-area");
	        $(".all-comment, .replay-info-box").css({"padding-bottom":$(".post-comment").outerHeight(true)});
	    }).blur(function() {
		    $(".post-comment").removeClass("new-area");
		});
}
//发布评论
    $(".publish").click(function () {
        var content = $(".comment-area").val().trim();
        if (content == "") {
            popUp("请填写评论内容!");
            return false;
        }
        var obj = {
            "Id": $("#article-id").val(),
            "FatherId": $("#father-id").val(),
            "Content": content
        };
        $.ajax({
            type: "post",
            dataType: "json",
            url: "/PostComment.htm?r=" + new Date().getTime(),
            data: obj,
            success: function (data) {
                if (data.ResultCode == 1) {
                    $(".comment-area").val("");
                    popUp("评论成功,等待管理员审核!");
                } else if (data.ResultCode == 2) {
                    var url = 'http://m.edushi.com/user/Login.html?BackUrl=' + window.location.href;
                    popUp("亲，登录后才能评论哦", 1, url, "去登陆");
                } else {
                    popUp(data.Msg);
                }
            }
        });
    });

    $(".pop-box .cancel").click(function () {
        $(".pop-content").hide();
    });
    $(".pop-box .confirm").click(function () {
        $(".pop-content").hide();
    });

});


function popUp(msg, flag, url, text) {
    $(".pop-content").show();
    $("#msg").text(msg);
    if (flag && flag == 1) {
        $(".pop-content .confirm").text(text).attr("href", url).show();
    } else {
        $(".pop-content .confirm").hide();
    }
} 