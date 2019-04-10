
function AddUserSearchWordHis(url, userId_app, search_content) {
    if (userId_app <= 0)
        return;

    $.ajax({
        //async: true,默认为异步
        type: "post",
        dataType: "json",
        url: url,
        data: { "userId_app": userId_app, "search_content": search_content },
        success: function (data) {
                console.log(data)
        }
    });
}

//type 1：表示根据用户ID来删除，2表示根据记录的唯一ID来删除
function DelUserSearchWordHis(url, type, delValue) {
    $.ajax({
        //async: true,默认为异步
        type: "post",
        dataType: "json",
        url: url,
        data: { "type": type, "delValue": delValue },
        success: function (data) {

        }
    });
}

function getUserSearchWordHisList(url, userId_app) {
    $.ajax({
        //async: true,默认为异步
        type: "post",
        dataType: "json",
        url: url,
        data: { "userId_app": userId_app },
        success: function (data) {

        }
    });
}