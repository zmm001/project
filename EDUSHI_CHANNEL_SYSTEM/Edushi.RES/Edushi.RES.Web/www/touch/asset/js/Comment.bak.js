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
    if ($.trim(_content.val()).length > 10000) {
        alert("评论内容超过10000个字符了");
        _content.val("").focus();
        return;
    }
    if ($.trim(_content.val()) != "" && _content.val() != "网友看法，不表明E都市立场。") {
        var url = $("#hidUrl").val();
        var id = $("#hidID").val();
        $.ajax({
            url: url + 'PostComment.htm',
            type: 'POST',
            data: { 'txtContent': encodeURIComponent(_content.val()), ID: id },
            success: function (data) {
                if (data == "OK") {
                    showHtml(_content.val(), '评论成功，等待管理员的审核。');
                    _content.val("");
                } else if (data.indexOf("ERR") > -1) {
                    showHtml(_content.val(), data);
                } else {
                    showHtml(_content.val(), '评论失败，请稍后再试。');
                }
            },
            error: function () {
                showHtml(_content.val(), '很抱歉，评论失败，请稍后再试。');
            }
        });
    }
    else {
        alert("评论内容不能为空");
        _content.val("").focus();
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

function showHtml(text, resultDesc) {
    var _html = "<dl class='clr zoom'><dt><img src='http://res.edushi.com/bang/v3/mobile/asset/images/userhead.jpg'></dt><dd><p class='user-name color'>" + resultDesc + "</p><div class='comments-info'>" + text + "</div></dd></dl>";
    $("#allcomment").append(_html);
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
                $("#allcomment").append(data);
            }
        });
        if (pageIndex == pageCount) {
            $("#divMoreComment").css('display', 'none');
        }
    }
}