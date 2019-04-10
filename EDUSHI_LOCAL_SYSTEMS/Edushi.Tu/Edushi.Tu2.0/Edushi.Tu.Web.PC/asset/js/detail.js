function layout(msg) {
    $(".flag-msg").text(msg);
    $(".flag-msg, .flag-mask").fadeIn(100).delay(1500).fadeOut(100);
}

// Added by xucj @2018-06-27 新增关注或取消关注
function AddAttention(e) {
    var IsLogin = getCookie();
    if (IsLogin != "OK") {
        var backUrl = escape(window.location.href + "?rnd=" + Math.random());
        window.location.href = "http://user.edushi.com/Login.html?BackUrl=" + backUrl;
    } else {
        $.ajax({
            url: "/CommentsAttention.htm",
            type: 'POST',
            data: { 'CommentsUserId': e },
            success: function (response) {
                if (response != null && response != "") {
                    var arr = response.split(",");
                    var flag = arr[0];
                    var message = arr[1];
                    var objElements = $('.id' + e);
                    if (flag == 1) {
                        if (message == "关注成功") {
                            $.each(objElements, function (elementIndex, element) {
                                element.className = 'follow-btn followed id' + e;
                                element.innerText = '已关注';
                            });
                        }
                        else {
                            $.each(objElements, function (elementIndex, element) {
                                element.className = 'follow-btn id' + e;
                                element.innerText = '关注';
                            });
                        }
                    }
                    layout(arr[1]);
                }
            }
        });
    }
};

$(function() {

    $(".share-more").hover(function() {
        if ($(".qrcode-img").length < 1) {
            $.post(requestUrl + "GetWeChatCode.htm",
                { "Url": window.location.href },
                function(data) {
                    if (data) {
                        $(".qrcode-wrap").append(data);
                    }
                });
        }
    });
    var authorId = $("#fansfollow").data("id");
    if (authorId) {
        //是否关注
        $.post("/GetIsAttentioned.htm",
            { "authorId": authorId },
            function(data) {
                if (data == -2) {
                    $("#fansfollow").addClass("followed").find("span").text("已关注");
                } else {
                    $("#fansfollow").addClass("eds-follow").find("span").text("关注");
                }
            });
    }


    //是否点赞
    $.post("/GetIsUpvoteDownvote.htm",
        { "id": $(".article-operation").data("id") },
        function(data) {
            if (data) {
                $(".cai .u-num").text(data.DownvoteCount);
                $(".zan .u-num").text(data.UpvoteCount);
                if (data.IsUpvoteDownvote == -2) {
                    $(".zan").addClass("visited");
                } else if (data.IsUpvoteDownvote == -3) {
                    $(".cai").addClass("visited");
                }
            }
        },
        "json");

    //是否收藏
    $.post("/GetIsFavorites.htm",
        { "id": $(".article-operation").data("id") },
        function(data) {
            if (data == -2) {
                $(".collect").addClass("success").text("已收藏");
            }
        });
    //关注或取消关注
    var _isAttedClick = true; //防止重复点击
    $("#fansfollow").click(function() {
        if (_isAttedClick) {
            _isAttedClick = false;
            var userId = $(this).data("id");

            if ($(this).hasClass("followed")) {
                $.ajax({
                    type: "post",
                    dataType: "json",
                    url: "/CancelAttention.htm",
                    data: { "userId": userId },
                    success: function(data) {
                        _isAttedClick = true;
                        if (data.ResultCode == 1) {
                            layout("取消关注成功");
                            $("#fansfollow").addClass("eds-follow").removeClass("followed");
                        } else if (data.ResultCode == 2) {
                            window.location.href = 'http://user.edushi.com/Login.html?BackUrl=' + window.location.href;

                        } else {
                            layout(data.Msg);
                        }
                    }
                });
            } else {
                $.ajax({
                    type: "post",
                    dataType: "json",
                    url: "/AddAttention.htm",
                    data: { "userId": userId },
                    success: function(data) {
                        _isAttedClick = true;
                        if (data.ResultCode == 1) {
                            $("#fansfollow").addClass("followed").removeClass("eds-follow");
                            layout("关注成功");
                        } else if (data.ResultCode == 2) {
                            window.location.href = 'http://user.edushi.com/Login.html?BackUrl=' + window.location.href;
                        } else {
                            layout(data.Msg);
                        }
                    }
                });
            }
        }


    });

   


        //收藏或取消收藏
    var _isFavClick = true; //防止重复点击
    $(".collect").click(function () {
        if (_isFavClick) {
            _isFavClick = false;
            var id = $(".article-operation").data("id");

            if (!$(this).hasClass("success")) {
                $.ajax({
                    type: "post",
                    dataType: "json",
                    url: "/AddFavorite.htm",
                    data: { "id": id },
                    success: function (data) {
                        _isFavClick = true;
                        if (data.ResultCode == 1) {
                            $(".collect").addClass("success").text("已收藏");
                            layout("收藏成功");
                        } else if (data.ResultCode == 2) {
                            window.location.href = 'http://user.edushi.com/Login.html?BackUrl=' + window.location.href;

                        } else {
                            layout(data.Msg);
                        }
                    }
                });
            }
        }
        
    });


    //分享弹出
	$(".share-more").hover(function(){
		$(this).find(".icon").addClass("hover");
		$(this).find("ul").show();
	},function(){
		$(this).find(".icon").removeClass("hover");
		$(this).find("ul").hide();
	});

    
    //点击展开与关闭回复框
//    $(".tie-hot").on("click", ".tie-list .js-replay-btn", function () {
//        $(this).parents(".tie-list").find(".tie-input-bar").toggle();
//        $(this).parents(".tie-list").siblings().find(".tie-input-bar").hide();
//    });   

    //文章点赞或踩
    var _isClick = true; //防止重复点击
    $(".article-operation .cai").click(function () {
        if (_isClick) {
            _isClick = false;
            if (!$(this).hasClass("visited")&&!$(".article-operation .zan").hasClass("visited")) {
                var _this = $(this);
                var id = $(".article-operation").data("id");
                $.ajax({
                    type: "post",
                    dataType: "json",
                    url: "/AddArticleUpvoteDownvote.htm",
                    data: { "id": id, "action": 2 },
                    success: function (data) {
                        _isClick = true;
                        if (data.ResultCode == 1) {
                            var _number = _this.find(".u-num").text();
                            _this.find("span").text(parseInt(_number) + 1);
                            zanCai(_this, "div", "visited");
                        } else if (data.ResultCode == 2) {
                            window.location.href = 'http://user.edushi.com/Login.html?BackUrl=' + window.location.href;
                        } else {
                            layout(data.Msg);
                        }
                    }
                });
            } 
        }
       
    });

    $(".article-operation .zan").click(function () {
        if (_isClick) {
            _isClick = false;
            if (!$(this).hasClass("visited") && !$(".article-operation .cai").hasClass("visited")) {
                var _this = $(this);
                var id = $(".article-operation").data("id");
                $.ajax({
                    type: "post",
                    dataType: "json",
                    url: "/AddArticleUpvoteDownvote.htm",
                    data: { "id": id, "action": 1 },
                    success: function (data) {
                        _isClick = true;
                        if (data.ResultCode == 1) {
                            var _number = _this.find(".u-num").text();
                            _this.find("span").text(parseInt(_number) + 1);
                            zanCai(_this, "div", "visited");
                        } else if (data.ResultCode == 2) {
                            window.location.href = 'http://user.edushi.com/Login.html?BackUrl=' + window.location.href;
                           
                        } else {
                            layout(data.Msg);
                        }
                    }
                });
            }
        }
    });
   
    
});

$(window).load(function() {
    //跟贴悬浮
    var commentTop = $(".comment-box").offset().top;
    $(window).bind("scroll", function () {
        var windowTop = $(window).scrollTop();
        if (windowTop >= commentTop) {
            $(".comment-toolbar").addClass("fixed");
        } else {
            $(".comment-toolbar").removeClass("fixed");
        }
        if (windowTop > commentTop + $(".js-tieba").height()) {
            $(".comment-toolbar .fatie").css({ "display": "block" });
        } else {
            $(".comment-toolbar .fatie").hide(); 
        }
    });
});
function zanCai(obj,obj2,className){
    obj.addClass(className);
    obj.find("em").addClass("show").delay(1500).hide(200);
    obj.siblings(obj2).css({"cursor":"text"});
}