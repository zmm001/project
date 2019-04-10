//$(function () {
//    init();
//});
//var pageIndex = 1;
//var pageCount = 0;

//function init() {
//    var commentCount = $("#hidCount").val();
//    if (commentCount % 10 == 0) {
//        pageCount = parseInt(commentCount / 10);
//    }
//    else {
//        pageCount = parseInt(commentCount / 10) + 1;
//    }
//    if (pageCount > 1) {
//        $("#divMoreComment").css('display', 'block');
//    }
//}

//function MoreComment(fatherID) {
//    var url = $("#hidUrl").val();
//    var id = $("#hidID").val();
//    pageIndex++;
//    if (pageIndex <= pageCount) {
//        var moreURL = url + "GetAllComment.htm";
//        $.ajax({
//            url: moreURL,
//            type: 'POST',
//            data: { 'iaid': id, pageIndex: pageIndex, FatherID: fatherID },
//            success: function (data) {
//                var mydata = $("#allcomment").html();
//                mydata += data;
//                $("#allcomment").html(mydata);
//                $("#divMoreRepeater").css('display', 'none');//这里强制不再显示加载更多，以后采用分页，可直接删掉
//            }
//        });
       
//        //if (pageIndex == pageCount) {
//        //    $("#divMoreComment").css('display', 'none');
//        //}
//    }
//}
function MoreComment() {
    var url = $("#hidUrl").val();
    var id = $("#hidID").val();
        var moreURL = url + "GetAllComment.htm";
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

        //if (pageIndex == pageCount) {
        //    $("#divMoreComment").css('display', 'none');
        //}
    
}
function MoreRepeater(fatherID) {
    var url = $("#hidUrl").val();
    var id = $("#hidID").val();
    var moreURL = url + "GetAllReplay.htm";
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
                url: url + 'PostComment.htm',
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


function SpanShow(obj) {
    if (obj.css("display") == "none") {
        obj.css("display", "block");
    }
    else {
        obj.css("display", "none");
    }
}

