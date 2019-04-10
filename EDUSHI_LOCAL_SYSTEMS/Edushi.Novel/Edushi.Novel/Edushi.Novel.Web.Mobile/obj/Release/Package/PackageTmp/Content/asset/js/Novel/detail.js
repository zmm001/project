
function addBookrack(entity, _this) {
    var isLogin = getCookie();
    if (isLogin == "NO") {
        var backUrl = escape(window.location.href);
        window.location.href = "http://m.edushi.com/user/Login.html?BackUrl=" + backUrl;
    } else {
        var url = $("#hidUrl").val() + "AddBookRack.htm";
        $.ajax({
            url: url,
            type: 'post',
            async: true,
            data: { "BookID": entity.BookID },
            success: function (response) {
                if(response == "false"){
                    popUp('加入失败或已存在！');
                }
                else if (response == "nologin") {
                    popUp(response);
                }
                else if (response == "Exceed") {
                    popUp('你的书架已经满了(50本),请适当清理后再加!');
                }
                else if(response == "true") {
                    popUp('已成功加入书架！');
                    $(_this).attr("class", "in-shelf");
                }
            }
        })
    }
}

function addReadRecord(entity) {
    var url = $("#hidUrl").val() + "AddReadRecord.htm";
    $.ajax({
        url: url,
        type: 'post',
        async: true,
        data: { "BookID": entity.BookID, "ChapterID": entity.ChapterID },
        success: function (response) {
        }
    })
}

function getCookie() {
    var result;
    var url = $("#hidUrl").val() + "GetIsLogin.htm";
    $.ajax({
        url: url,
        type: 'get',
        async: false,
        datatType: "json",
        success: function (response) {
            result = response;
        }
    });
    return result;
};

function popUp(msg, flag, url, text) {
    $(".pop-content").show();
    $("#msg").text(msg);
    if (flag && flag == 1) {
        $(".pop-content .confirm").text(text).attr("href", url).show();
    }
}
$(".pop-box .cancel").click(function () {
    $(".pop-content").hide();
})