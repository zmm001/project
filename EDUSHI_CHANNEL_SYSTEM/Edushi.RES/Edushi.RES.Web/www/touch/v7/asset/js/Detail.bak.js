$(function () {
    InitCommentsAttention();
    InitCommentsAttention1();
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
                    url: "/CancelAttention.htm?r=" + new Date().getTime(),
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
                    url: "/AddAttention.htm?r=" + new Date().getTime(),
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

            if ($(this).hasClass("collected")) {
                //$.ajax({
                //    type: "post",
                //    dataType: "json",
                //    url: "/CancelFavorite.htm",
                //    data: { "id": id },
                //    success: function (data) {

                //        if (data.ResultCode == 1) {
                //            $("#article-fav").removeClass("collected");
                //        } else if (data.ResultCode == 2) {
                //            window.location.href = 'http://m.edushi.com/user/Login.html?BackUrl=' + window.location.href;
                //        } else {
                //            alert(data.Msg);
                //        }
                //    }
                //});
            } else {
                $.ajax({
                    type: "post",
                    dataType: "json",
                    url: "/AddFavorite.htm?r=" + new Date().getTime(),
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



    function InitCommentsAttention() {
        var currentUserId = $("#currentUserId").val();
        var isLogin = currentUserId > 0 ? "OK" : "";
        var objs = $(".js-follow-btn");
        if (objs.length > 0) {
            for (var i = 0; i < objs.length; i++) {
                //var commentUserId = objs[i].getAttribute("id");
                var obj = $(objs[i]);

                var commentUserId = obj.attr("id");
                if (commentUserId == currentUserId) {
                    //objs[i].className = "";
                    obj.attr("class", "");
                    //objs[i].innerText = "";
                    obj.text("");
                    continue;
                }

                var elementId = "id" + commentUserId;
                var url = $("#hidUrl").val() + "GetCommentsAttention.htm?r=" + new Date().getTime();
                if (isLogin == "OK") {
                    $.ajax({
                        url: url,
                        type: 'POST',
                        async: false,
                        data: { 'commentUserId': commentUserId },
                        success: function (response) {
                            if (response == "-2") {
                                obj.attr("class", "js-follow-btn followed " + elementId);
                                obj.text("已关注");
                            }
                            else {
                                obj.attr("class", "js-follow-btn follow-btn " + elementId);
                                obj.text("关注");
                            }
                        }
                    });
                }
                else {
                    obj.attr("class", "js-follow-btn follow-btn " + elementId);
                    obj.text("关注");
                }
            }
        }
        //var commentUserId = e.slice(1);
    }

    function InitCommentsAttention1() {
        var currentUserId = $("#currentUserId").val();
        var IsLogin = currentUserId > 0 ? "OK" : "";
        var objs = $(".js-follow-btn");
        if (objs.length > 0) {
            for (var i = 0; i < objs.length; i++) {
                var commentUserId = objs[i].getAttribute("id");
                if (commentUserId == currentUserId) {
                    objs[i].className = "";
                    objs[i].innerText = "";
                    continue;
                }

                var elementId = "id" + commentUserId;
                //$(".js-follow-btn").addClass(elementId);
                var url = $("#hidUrl").val() + "GetCommentsAttention1.htm?r=" + new Date().getTime();
                if (IsLogin == "OK") {
                    $.ajax({
                        url: url,
                        type: 'POST',
                        async: false,
                        data: { 'commentUserId': commentUserId },
                        success: function (response) {
                            if (response == "-2") {
                                objs[i].className = "js-follow-btn followed " + elementId;
                                objs[i].innerText = "已关注";
                            }
                            else {
                                objs[i].className = "js-follow-btn follow-btn " + elementId;
                                objs[i].innerText = "关注";
                            }
                        }
                    });
                }
                else {
                    objs[i].className = "js-follow-btn follow-btn " + elementId;
                    objs[i].innerText = "关注";
                }
            }
        }
        //var commentUserId = e.slice(1);
    }
});

function AddAttention1(e) {
    //var IsLogin = getCookie();
    var currentUserId = $("#currentUserId").val();
    var IsLogin = currentUserId > 0 ? "OK" : "";
    if (IsLogin != "OK") {
        var backUrl = escape(window.location.href);
        window.location.href = "http://m.edushi.com/user/Login.html?BackUrl=" + backUrl;
    }
    else {
        var url = $("#hidUrl").val() + "CommentsAttention1.htm";
        $.ajax({
            url: url,
            type: 'POST',
            async: false,
            data: { 'commentUserId': e },
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
                }
                popUp(message);
            }
        });
    }
};

function AddAttention(e) {
    //var IsLogin = getCookie();
    var currentUserId = $("#currentUserId").val();
    var IsLogin = currentUserId > 0 ? "OK" : "";
    if (IsLogin != "OK") {
        var backUrl = escape(window.location.href);
        window.location.href = "http://m.edushi.com/user/Login.html?BackUrl=" + backUrl;
    }
    else {
        var url = $("#hidUrl").val() + "CommentsAttention.htm";
        $.ajax({
            url: url,
            type: 'POST',
            async: false,
            data: { 'commentUserId': e },
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
                    popUp(arr[1]);
                }
            }
        });
    }
};