function isAttentioned(url, loginUserId, authorId) {
    var code = 0;//1：未关注，-2：已关注
    $.ajax({
        async: false,
        type: "post",
        dataType: "json",
        url: url,
        data: { "loginUserId": loginUserId, "authorId": authorId },
        success: function (data) {
            code = data.code;
        }
    });
    return code;
}

function add_CancelAttention(url, sEId, userId, type) {
    var code = 0;
    $.ajax({
        async: false,
        type: "post",
        dataType: "json",
        url: url,
        data: { "sEId": sEId, "userId": userId, "type": type },
        success: function (data) {
            code = data.ResultCode;
        }
    });
    return code;
}

function add_CancelAttention_ASTT(url, appId, appAttentionId, type) {
    $.ajax({
        type: "post",
        dataType: "json",
        url: url,
        data: { "appId": appId, "appAttentionId": appAttentionId, "type": type },
        success: function (data) {
        }
    });
}

function getEIdByAppId(url, appId) {
    var UserId = 0;
    $.ajax({
        async: false,
        type: "post",
        dataType: "json",
        url: url,
        data: { "appId": appId },
        success: function (data) {
            UserId = data.code;
        }
    });
    return UserId;
}