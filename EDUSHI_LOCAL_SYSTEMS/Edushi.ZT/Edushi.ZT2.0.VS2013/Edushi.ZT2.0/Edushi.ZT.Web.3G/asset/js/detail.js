$(function(){
    //点击qq 微信提示层
    $(".qq, .weixin").click(function(){
        if($(this).hasClass("qq")){
           $(".share-tips span").text("QQ");
        }else{
           $(".share-tips span").text("微信"); 
        }
        $(".share-tips").show();
    });
    $(".share-tips").click(function(){
        $(this).hide();
    });
    $(".main-article p.i").each(function () {
        var aText = $(this).find("a");
        if (aText.text().length > 120) {
            aText.text(aText.text().substring(0, 95));
            aText.html(aText.text() + '......');
        }
    });
    //关注或取消关注
    var _isAttedClick = true; //防止重复点击
    $("#articleIsAtted").click(function () {
        if (_isAttedClick) {
            _isAttedClick = false;
            var userId = $(this).data("id");

            if ($(this).hasClass("look-follow")) {
                $.ajax({
                    type: "post",
                    dataType: "json",
                    url: requestUrl+"CancelAttention.htm",
                    data: { "userId": userId },
                    success: function (data) {
                        _isAttedClick = true;
                        if (data.ResultCode == 1) {
                            $(".look-msg").text("取消关注成功");
                            $(".look-layout").fadeIn(200).delay(1500).fadeOut(200);
                            $("#articleIsAtted").removeClass("look-follow");
                        } else if (data.ResultCode == 2) {
                            var url = 'http://m.edushi.com/user/Login.html?BackUrl=' + window.location.href;
                            popUp("亲，登录后才能关注哦", 1, url, "去登陆");
                        } else {
                            popUp(data.Msg);
                        }
                    }
                });
            } else {
                $.ajax({
                    type: "post",
                    dataType: "json",
                    url: requestUrl+"AddAttention.htm",
                    data: { "userId": userId },
                    success: function (data) {
                        _isAttedClick = true;
                        if (data.ResultCode == 1) {
                            $("#articleIsAtted").addClass("look-follow");
                            $(".look-msg").text("关注成功");
                            $(".look-layout").fadeIn(200).delay(1500).fadeOut(200);
                        } else if (data.ResultCode == 2) {
                            var url = 'http://m.edushi.com/user/Login.html?BackUrl=' + window.location.href;
                            popUp("亲，登录后才能关注哦", 1, url, "去登陆");
                        } else {
                            popUp(data.Msg);
                        }
                    }
                });
            }
        }


    });

    //收藏或取消收藏
    var _isFavClick = true; //防止重复点击
    $("#article-fav").click(function () {
        if (_isFavClick) {
            _isFavClick = false;
            var id = $("#article-id").val();

            if (!$(this).hasClass("collected")) {
                $.ajax({
                    type: "post",
                    dataType: "json",
                    url: requestUrl+"AddFavorite.htm",
                    data: { "id": id },
                    success: function (data) {
                        _isFavClick = true;
                        if (data.ResultCode == 1) {
                            $("#article-fav").addClass("collected");
                            $("#article-fav").text("收藏成功");
                            var url = "http://m.edushi.com/user/my/favorite.html";
                            popUp("您已收藏，请到个人中心查看", 1, url, "去看看");
                        } else if (data.ResultCode == 2) {
                            var url = 'http://m.edushi.com/user/Login.html?BackUrl=' + window.location.href;
                            popUp("亲，登录后才能收藏哦", 1, url, "去登陆");
                        } else {
                            popUp(data.Msg);
                        }
                    }
                });
            }
        }


    });
    //加载更多
    $(".add-more").click(function () {
        newsLoad();
    });
});

function newsLoad() {
    pageIndex++;
    if (pageIndex > pageCount) {
        return false;
    }
    //$(".loading").css('display', 'block');
    var param = { 'pageIndex': pageIndex, 'tId': configData.ID };

    $.ajax({
        type: 'POST', //GET
        url: requestUrl + configData.Page,
        data: param,
        success: function (data) {
            //$(".loading").css('display', 'none');
            $("#datalist").append(data);
            //setCommentHeight();
            if (pageIndex >= pageCount) {
                $(".more-news").remove();
            }
        },
        error: function (xhr, type) {
            //alert('加载异常，请刷新页面重试！');
        }
    });
}
var pageIndex = 0;
var pageCount = configData.Count;
