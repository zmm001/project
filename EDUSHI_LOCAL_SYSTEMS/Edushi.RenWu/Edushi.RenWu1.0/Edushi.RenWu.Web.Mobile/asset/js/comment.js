
$(function(){
	
    //评论点赞或踩
    if ($(".comment-box").length > 0) {
        $(".comment-box").on("click",
            ".comment-list li.zan",
            function() {
                if ($(this).hasClass("yizan") || $(this).siblings("li.cai").hasClass("yicai")) {
                    _isClick = false;
                } else {
                    var _this = $(this);
                    var commentId = _this.parent().data("id");
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        url: requestUrl + "AddCommentUpvoteDownvote.htm",
                        data: { "commendId": commentId, "action": 1 },
                        success: function(data) {
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

        $(".comment-box").on("click",
            ".comment-list li.cai",
            function() {
                if ($(this).hasClass("yicai") || $(this).siblings("li.zan").hasClass("yizan")) {
                    _isClick = false;
                } else {
                    var _this = $(this);

                    var commentId = _this.parent().data("id");
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        url: requestUrl + "AddCommentUpvoteDownvote.htm",
                        data: { "commendId": commentId, "action": 2 },
                        success: function(data) {
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
		var marTop = $(".post-comment").outerHeight(true);
		var winH = $(window).height();
	    var docH = $("body").height();
	    //alert(docH)

		$(".comment-area").focus(function(){
			//e.stopPropagation();
	        $(this).parent(".post-comment").addClass("new-area");
	        $(".all-comment, .replay-info-box").css({"padding-bottom":$(".post-comment").outerHeight(true)});
		}).blur(function () {
		    setTimeout(function() {
		        $(".post-comment").removeClass("new-area");
		    },1);
	    	
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
            url: requestUrl + "PostComment.htm",
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

   
});