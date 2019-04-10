$(function () {
    init();
});

var pageIndex = 1;
var pageCount = 0;

function init() {
    var commentCount = $("#hidCount").val();
    if (commentCount % 10 == 0) {
        pageCount = parseInt(commentCount / 10);
    }
    else {
        pageCount = parseInt(commentCount / 10) + 1;
    }
    if (pageCount > 1) {
        $("#divMoreComment").css('display', 'block');
    }
}

function SubmitGuestBook() {
    var _content = $("#TxtContent");
    var msg = $("#msg");
    if ($.trim(_content.val()).length > 10000) {
        SpanShow(msg);
        msg.text("评论内容超过10000个字符了").css("color", "#f00");
        setTimeout(function () { SpanShow(msg) }, 5000);
        return;
    }
    if ($.trim(_content.val()) != "" && _content.val() != "言你所想，行你所望。") {
        var url = $("#hidUrl").val();
        var id = $("#hidID").val();
        $.ajax({
            url: url + 'PostComment.htm',
            type: 'POST',
            data: { 'txtContent': encodeURIComponent(_content.val()), ID: id },
            success: function (data) {
                if (data == "OK") {
                    _content.val("");
                    SpanShow(msg);
                    msg.text("评论成功，等待管理员的审核。").css("color", "#f60");
                    setTimeout(function () { SpanShow(msg) }, 5000);
                } else if (data.indexOf("ERR") > -1) {
                    SpanShow(msg);
                    msg.text(data).css("color", "#f00");
                    setTimeout(function () { SpanShow(msg) }, 5000);
                } else {
                    SpanShow(msg);
                    msg.text("评论失败，请稍后再试。").css("color", "#f00");
                    setTimeout(function () { SpanShow(msg) }, 5000);
                }
            },
            error: function () {
                SpanShow(msg);
                msg.text("很抱歉，评论失败，请稍后再试。").css("color", "#f00");
                setTimeout(function () { SpanShow(msg) }, 5000);
            }
        });
    }
    else {
        _content.val("").focus();
        SpanShow(msg);
        msg.text("评论内容不能为空。").css("color", "#f00");
        setTimeout(function () { SpanShow(msg) }, 5000);
    }
}

function SpanShow(obj) {
    if (obj.css("display") == "none") {
        obj.css("display", "block");
    }
    else {
        obj.css("display", "none");
    }
}

function MoreComment() {
    var url = $("#hidUrl").val();
    var id = $("#hidID").val();
    pageIndex++;
    if (pageIndex <= pageCount) {
        var moreURL = url + "GetAllComment.htm";
        $.ajax({
            url: moreURL,
            type: 'POST',
            data: { 'iaid': id, pageIndex: pageIndex },
            success: function (data) {
                var mydata = $("#allcomment").html();
                mydata += data;
                $("#allcomment").html(mydata);
            }
        });
        if (pageIndex == pageCount) {
            $("#divMoreComment").css('display', 'none');
        }
    }
}