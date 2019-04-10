
var gid = "";
function getReadReward() {
    if (gid == "") {
        return;
    }

    $.ajax({
        type: 'POST', //GET
        url: "/" + "GetReadReward.htm" + "?r=" + new Date().getTime(),
        data: { 'dataid': $("#article-id").val(), 'guid': gid },
        success: function (data) {
            if (data.indexOf(",") > -1) {
                var temp = data.split(",");
                $("#goldCount").html(temp[1]);
                $("#moneyCount").html(temp[0]);
            }
            else {
                console.log(data);
            }
        },
        error: function (xhr, type) {
            //alert('加载异常，请刷新页面重试！');
        }
    });
}

function getGID() {
    $.ajax({
        type: 'POST', //GET
        url: "/" + "GetGID.htm" + "?r=" + new Date().getTime(),
        async: false,
        success: function (data) {
            gid = data;
        },
        error: function (xhr, type) {
            //alert('加载异常，请刷新页面重试！');
        }
    });
}

if ((new CookieHelper().getCookie("MemberNickName")) != null) {
    getGID();
}