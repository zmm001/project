
function isUpvoteDownvote_Answer(url, answerid, loginUserId) {
    var code = 0;//-2已赞-3已踩1未赞、未踩
    $.ajax({
        async: false,
        type: "post",
        dataType: "json",
        url: url,
        data: { "answerid": answerid, "loginUserId": loginUserId },
        success: function (data) {
            code = data.code;
        }
    });
    return code;
}

function answer_zan_cai(url, sEId, answerid, action) {
    var code = 0;
    $.ajax({
        async: false,
        type: "post",
        dataType: "json",
        url: url,
        data: { "sEId": sEId, "answerid": answerid, "action": action },
        success: function (data) {
            code = data.ResultCode;
        }
    });
    return code;
}