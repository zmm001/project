// 判断是否被收藏
function isFavorites(url, id, loginUserId) {
    var code = 0;//1：未收藏，-2：已收藏
    $.ajax({
        async: false,
        type: "post",
        dataType: "json",
        url: url,
        data: { "id": id, "loginUserId": loginUserId },
        success: function (data) {
            code = data.code;
        }
    });
    return code;
}

//type：1：收藏，2：取消收藏
function Add_CancelFavorite(url, sEId, id, type) {
    var code = 0;
    $.ajax({
        async: false,
        type: "post",
        dataType: "json",
        url: url,
        data: { "sEId": sEId, "id": id, "type": type },
        success: function (data) {
            code = data.ResultCode;
        }
    });
    return code;
}