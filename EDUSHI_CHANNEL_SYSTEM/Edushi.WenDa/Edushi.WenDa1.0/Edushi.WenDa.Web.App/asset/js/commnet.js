
function isUpvoteDownvote_Comment(url, ucid, loginUserId) {
    var code = 0;//-2、已赞  -3、已踩  1、未赞或未踩
    $.ajax({
        async: false,
        type: "post",
        dataType: "json",
        url: url,
        data: { "ucid": ucid, "loginUserId": loginUserId },
        success: function (data) {
            code = data.code;
        }
    });
    return code;
}

function comment_zan_cai(url, sEId, commendId, action) {
    var code = 0;
    $.ajax({
        async: false,
        type: "post",
        dataType: "json",
        url: url,
        data: { "sEId": sEId, "commendId": commendId, "action": action },
        success: function (data) {
            code = data.ResultCode;
        }
    });
    return code;
}

function AddComment(url, sEId, Id, FatherId, content) {
    var code = 0;
    $.ajax({
        async: false,
        type: "post",
        dataType: "json",
        url: url,
        data: { "sEId": sEId, "Id": Id, "FatherId": FatherId, "Content": content },
        success: function (data) {
            code = data.ResultCode;
        }
    });
    return code;
}

function DelComment(url, id) {
    var code = 0;
    $.ajax({
        async: false,
        type: "post",
        dataType: "json",
        url: url,
        data: { "id": id },
        success: function (data) {
            code = data.ResultCode;
        }
    });
    return code;
}