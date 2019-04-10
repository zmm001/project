$(function () {    
    TopicRecommend();
    InitAttention();
    InitFavorite();
    InitUpvoteDownvote();
    InitCommentsAttention();
});

//专题推荐
function TopicRecommend() {
    $.ajax({
        url: $("#hidUrl").val() + "GetTopicRecommend.htm",
        type: 'POST',
        data: { 'TID': $("#hidTID").val() },
        success: function (data) {
            $("#divTopicRecommend").html(data);
        }
    });
}
//加载微信二维码
$(".share-box .weixin").click(function (e) {
    var url = $("#hidUrl").val() + "GetWeChatCode.htm";
    var urlstr = $("#hidWebChat").val();
    $.ajax({
        url:url ,
        type: 'POST',
        data: { 'Url':urlstr },
        success: function (response) {
            if (response != null) {
                $(".js-qrcode-wrap").html(response);
            }
        }
    });
    $(".js-qrcode-wrap").show();
    e.stopPropagation();
});
$(".js-close").click(function () {
    $(".js-qrcode-wrap").html("");
    $(".js-qrcode-wrap").hide();
});
//初始化关注
function InitAttention(){
    var IsLogin = getCookie();
    var EditorId = $("#hidUid").val();
    var url = $("#hidUrl").val() + "GetAttention.htm";
    if (IsLogin ="OK") {
        $.ajax({
            url: url,
            type: 'POST',
            data: { 'EditorId': EditorId},
            success: function (response) {
                if (response == "-2") {
                    $("#fansfollow ").attr("class", "followed ");
                    $("#fansfollow").html("已关注");
                }
                else {
                    $("#fansfollow ").attr("class", "eds-follow ");
                    $("#fansfollow").html("关注");
                }
            }
        });
    }
    else {
        $("#fansfollow ").attr("class", "eds-follow ");
        $("#fansfollow").html("关注");
    }
}

//初始化评论关注[xcj@20180622 新闻评论]
function InitCommentsAttention() {
    var IsLogin = getCookie();
    var objs = $(".js-follow-btn");
    if (objs.length > 0) {
        var currentUserId = $("#currentUserId").val();
        for (var i = 0; i < objs.length; i++) {
            var commentUserId = objs[i].getAttribute("id");
            if (commentUserId == currentUserId) {
                objs[i].className = "";
                objs[i].innerText = "";
                continue;
            }

            var elementId = "id" + commentUserId;
            //$(".js-follow-btn").addClass(elementId);
            var url = $("#hidUrl").val() + "GetCommentsAttention.htm";
            if (IsLogin = "OK") {
                $.ajax({
                    url: url,
                    type: 'POST',
                    async: false,
                    data: { 'CommentUserId': commentUserId },
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

//初始化评论关注[xucj@20180622 新闻评论]
function AddAttention(e) {
    var IsLogin = getCookie();
    if (IsLogin != "OK") {
        var backUrl = escape(window.location.href);
        window.location.href = "http://user.edushi.com/Login.html?BackUrl=" + backUrl;
    }
    else {
        var url = $("#hidUrl").val() + "CommentsAttention.htm";
        $.ajax({
            url: url,
            type: 'POST',
            async: false,
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

//初始化收藏
function InitFavorite() {
    var IsLogin = getCookie();
    var ID = $("#hidID").val();
    var url = $("#hidUrl").val() + "GetFavorite.htm";
    if (IsLogin = "OK") {
        $.ajax({
            url: url,
            type: 'POST',
            data: { 'ID': ID},
            success: function (response) {
                if (response == "-2") {
                    $("#favorite ").attr("class", "collect success");
                    $("#favorite").html("收藏成功");
                    $("#favorite").css({ "cursor": "text" });
                }
                else {
                    $("#favorite ").attr("class", "collect ");
                    $("#favorite").html("收藏本文");
                }
            }
        });
    }
    else {
        $("#favorite ").attr("class", "collect ");
        $("#favorite").html("收藏本文");
    }
}
//初始化赞和踩
function InitUpvoteDownvote() {
    var IsLogin = getCookie();
    var ID = $("#hidID").val();
    var url = $("#hidUrl").val() + "GetUpvoteDownvote.htm";
    if (IsLogin = "OK") {
        $.ajax({
            url: url,
            type: 'POST',
            data: { 'ID': ID },
            success: function (response) {
                if (response == "-2") {
                    $("#Upvote ").attr("class", "zan visited");
                    $("#Downvote ").attr("class", "cai");
                    $("#Upvote").css({ "cursor": "text" });
                    $("#Downvote").css({ "cursor": "text" });

                }
                else if (response == "-3") {
                    $("#Downvote ").attr("class", "cai visited");
                    $("#Upvote ").attr("class", "zan");
                    $("#Upvote").css({ "cursor": "text" });
                    $("#Downvote").css({ "cursor": "text" });
                }
                else {
                    $("#Upvote ").attr("class", "zan");
                    $("#Downvote ").attr("class", "cai");
                    
                $("#Upvote").click(function (e) {
                    ArticleUpvoteDownvote(1);
                });
                $("#Downvote").click(function (e) {
                    ArticleUpvoteDownvote(2);
                });

                }
            }
        });
    }
    else {
        $("#Upvote ").attr("class", "zan js-article-zan");
        $("#Downvote ").attr("class", "cai js-article-cai");
    }
}

//关注或者取消关注
$("#fansfollow").click(function (e) {
    var IsLogin = getCookie();
    if (IsLogin != "OK") {
        var backUrl = escape(window.location.href);
        window.location.href = "http://user.edushi.com/Login.html?BackUrl=" + backUrl;
    }
    else {
        var url = $("#hidUrl").val() + "Attention.htm";
        var Uid = $("#hidUid").val();
       
        $.ajax({
            url: url,
            type: 'POST',
            data: { 'Uid': Uid },
            success: function (response) {
                if (response != null && response != "") {
                    var arr = response.split(",");
                    var flag = arr[0];
                    var message = arr[1];
                    if (flag == 1)
                    {
                        if (message == "关注成功") {
                            $("#fansfollow ").attr("class", "followed ");
                            $("#fansfollow").html("已关注");
                        }
                        else {

                            $("#fansfollow ").attr("class", "eds-follow ");
                            $("#fansfollow").html("关注");
                        }


                    }
                    layout(arr[1]);
                }
            }
        });
    }

});



//文章点赞或踩
function ArticleUpvoteDownvote(type)
{
    var IsLogin = getCookie();
    if (IsLogin != "OK") {
        var backUrl = escape(window.location.href);
        window.location.href = "http://user.edushi.com/Login.html?BackUrl=" + backUrl;
    }
    else {
        if ($("#Upvote").hasClass("visited") || $("#Downvote").hasClass("visited")) {
        }
        else {
            var url = $("#hidUrl").val() + "ArticleUpvoteDownvote.htm";
            var ID = $("#hidID").val();
            var count = 0;
            if (type == 1) {
                count = $("#UpvoteNum").text();
            }
            else {
                count = $("#DownvoteNum").text();
            }
            $.ajax({
                url: url,
                type: 'POST',
                data: { 'ID': ID, 'type': type },
                success: function (response) {
                    if (response != null && response != "") {
                        var arr = response.split(",");
                        var flag = arr[0];
                        if (flag == 1) {
                            count++;
                            if (type == 1) {
                                $("#UpvoteNum").text(count);
                                addCount($("#Upvote"), "div");

                            }
                            else {
                                $("#DownvoteNum").text(count);
                                addCount($("#Downvote"), "div");

                            }
                        }

                    }
                }
            });
        }
       
    }
}
//收藏
$("#favorite").click(function (e) {
    var IsLogin = getCookie();
    if (IsLogin != "OK") {
            var backUrl = escape(window.location.href);
            window.location.href = "http://user.edushi.com/Login.html?BackUrl=" + backUrl;
        }
        else {
            if ($("#favorite").hasClass("success")) {
                layout("已收藏");
            }
            else {
                var url = $("#hidUrl").val() + "AddFavorites.htm";
                var ID = $("#hidID").val();
                $.ajax({
                    url: url,
                    type: 'POST',
                    data: { 'ID': ID },
                    success: function (response) {
                        if (response != null && response != "") {
                            var arr = response.split(",");
                            var flag = arr[0];
                            if (flag == "1") {
                                $("#favorite").toggleClass(" success ");
                                $("#favorite").html("收藏成功");
                                $("#favorite ").attr("class", "collect success ");
                                $("#favorite").css({ "cursor": "text" });
                            }
                            layout(arr[1]);
                        }
                    }
                });
            }
        }
 
    });

//对回复的点赞
function CommentUpvote(commentid) {
    var IsLogin = getCookie();
    if (IsLogin != "OK") {
        var backUrl = escape(window.location.href);
        window.location.href = "http://user.edushi.com/Login.html?BackUrl=" + backUrl;

    }
    else {
        var url = $("#hidUrl").val() + "CommentUpvoteDownvote.htm";
        var ID = $("#hidID").val();
        var count = $("#zanNum" + commentid).text();
        var obj = $("#zan" + commentid)
        var type = 1;
        $.ajax({
            url: url,
            type: 'POST',
            data: { 'ID': ID, 'type': type, commentid: commentid },
            success: function (response) {
                if (response != null && response != "") {
                    var arr = response.split(",");
                    var flag = arr[0];
                    if (flag == 1) {
                        count++;
                        $("#zanNum" + commentid).text(count);
                        addCount($("#zan" + commentid), "li");
                    }

                }
            }
        });
    }
}
//对回复的踩
function CommentDownvote(commentid) {
    var IsLogin = getCookie();
    if (IsLogin != "OK") {
        var backUrl = escape(window.location.href);
        window.location.href = "http://user.edushi.com/Login.html?BackUrl=" + backUrl;

    }
    else {
        var url = $("#hidUrl").val() + "CommentUpvoteDownvote.htm";
        var ID = $("#hidID").val();
        var count = $("#caiNum" + commentid).text();
        var obj = $("#cai" + commentid)
        var type = 2;
        $.ajax({
            url: url,
            type: 'POST',
            data: { 'ID': ID, 'type': type, commentid: commentid },
            success: function (response) {
                if (response != null && response != "") {
                    var arr = response.split(",");
                    var flag = arr[0];
                    if (flag == 1) {
                        count++;
                        $("#caiNum" + commentid).text(count);
                        //obj.addClass("visited");
                        //obj.find("em").addClass("show").delay(3000).hide(200);
                        //obj.next().css({ "cursor": "text" });
                        addCount($("#cai" + commentid), "li");
                    }

                }
            }
        });
    }
}


function getCookie() {
    var result;
    var url = $("#hidUrl").val() + "GetIsLogin.htm";
     $.ajax({
         url: url,
         type: 'post',
         async: false,
         data: {},
         datatType:"json",
         success: function (response) {
             result = response;
         }
     });
     return result;
};

