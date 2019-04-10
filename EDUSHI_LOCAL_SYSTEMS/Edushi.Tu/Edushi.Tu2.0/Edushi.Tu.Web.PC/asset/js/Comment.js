//加载更多评论
function MoreComment() {
    var url = $("#hidUrl").val();
    var id = $("#hidID").val();
    var moreURL = url + "Detail/GetAllComment";
        $.ajax({
            url: moreURL,
            type: 'POST',
            data: { 'iaid': id},
            success: function (data) {
                var mydata = $("#allcomment").html();
                mydata += data;
                $("#allcomment").html(mydata);
                $("#divMoreComment").css('display', 'none');//这里强制不再显示加载更多，以后采用分页，可直接删掉
            }
        });
}
//加载更多回复
function MoreRepeater(fatherID) {
    var url = $("#hidUrl").val();
    var id = $("#hidID").val();
    var moreURL = url + "Detail/GetAllReplay";
    $.ajax({
        url: moreURL,
        type: 'POST',
        data: { 'iaid': id, FatherID: fatherID },
        success: function (data) {
            var mydata = $("#allreplay"+fatherID).html();
            mydata += data;
            $("#allreplay" + fatherID).html(mydata);
            $("#divMoreRepeater"+fatherID).css('display', 'none');
        }
    });   
}
//提交用户评论
function SubmitGuestBook(fatherID) {
    var commentid = "comment"+fatherID;
    var _content = $("#"+commentid);
    var msg = $("#msg"+fatherID);
    if ($.trim(_content.val()).length > 10000) {
        SpanShow(msg);
        msg.text("评论内容超过10000个字符了").css("color", "#ef4e4e");
        setTimeout(function () { SpanShow(msg) }, 5000);
        return;
    }
    //2018-1-12 sx修改
    var IsLogin = getCookie();
    if (IsLogin != "OK") {
        var backUrl = escape(window.location.href);
        window.location.href = "http://user.edushi.com/Login.html?BackUrl=" + backUrl;
    }
    else {

        if ($.trim(_content.val()) != "") {
            var url = $("#hidUrl").val();
            var id = $("#hidID").val();
           
            $.ajax({
                url: url + "Detail/PostComment",
                type: 'POST',
                data: { 'txtContent': encodeURIComponent(_content.val()), ID: id,FatherID:fatherID },
                success: function (data) {
                    if (data == "OK") {
                        _content.val("");
                        SpanShow(msg);
                        msg.text("评论成功，等待管理员的审核。").css("color", "#ef4e4e");
                        setTimeout(function () { SpanShow(msg) }, 5000);
                    } else if (data.indexOf("ERR") > -1) {
                        SpanShow(msg);
                        msg.text(data).css("color", "#f00");
                        setTimeout(function () { SpanShow(msg) }, 5000);
                    } else {
                        SpanShow(msg);
                        msg.text("评论失败，请稍后再试。").css("color", "#ef4e4e");
                        setTimeout(function () { SpanShow(msg) }, 5000);
                    }
                },
                error: function () {
                    SpanShow(msg);
                    msg.text("很抱歉，评论失败，请稍后再试。").css("color", "#ef4e4e");
                    setTimeout(function () { SpanShow(msg) }, 5000);
                }
            });
        }
        else {
            _content.val("").focus();
            SpanShow(msg);
            msg.text("评论内容不能为空。").css("color", "#ef4e4e");
            setTimeout(function () { SpanShow(msg) }, 5000);
        }
    }
    //$("#tieinputbar" + fatherID).css("display", "none");
    setTimeout(function () { $("#tieinputbar" + fatherID).css("display", "none"); }, 5000);
        
}
//对评论的点赞
function CommentUpvote(commentid) {
    var IsLogin = getCookie();
    if (IsLogin != "OK") {
        var backUrl = escape(window.location.href);
        window.location.href = "http://user.edushi.com/Login.html?BackUrl=" + backUrl;

    }
    else {
        var url = $("#hidUrl").val() + "Detail/CommentUpvoteDownvote";
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
                        $("#zanNum" + commentid).text(count+1);
                        addCount(obj, "li","yizan");
                    }

                }
            }
        });
    }
}
//对评论的踩
function CommentDownvote(commentid) {
    var IsLogin = getCookie();
    if (IsLogin != "OK") {
        var backUrl = escape(window.location.href);
        window.location.href = "http://user.edushi.com/Login.html?BackUrl=" + backUrl;

    }
    else {
        var url = $("#hidUrl").val() + "Detail/CommentUpvoteDownvote";
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
                        $("#caiNum" + commentid).text(count+1);
                        addCount(obj, "li","yicai");
                    }

                }
            }
        });
    }
}

//获取Cookie
function getCookie() {
    var result;
    var url = $("#hidUrl").val();
    $.ajax({
        url: url+"Detail/GetIsLogin",
        type: 'POST',
        async: false,
        data: {},
        datatType: "json",
        success: function (response) {
            result = response;
        }
    });
    return result;
};

//计数功能
function addCount(obj, obj2,className) {
    obj.addClass("className");
    obj.find("em").addClass("show").delay(3000).hide(200);
    obj.siblings(obj2).css({ "cursor": "text" });
}
$(function () {
    //点击回复弹出评论框
    $(".tie-hot").on("click", ".tie-list .js-replay-btn", function () {
        $(this).parents(".tie-list").find(".tie-input-bar").toggle();
        $(this).parents(".tie-list").siblings().find(".tie-input-bar").hide();
    });
});
function SpanShow(obj) {
    if (obj.css("display") == "none") {
        obj.css("display", "block");
    }
    else {
        obj.css("display", "none");
    }
}

