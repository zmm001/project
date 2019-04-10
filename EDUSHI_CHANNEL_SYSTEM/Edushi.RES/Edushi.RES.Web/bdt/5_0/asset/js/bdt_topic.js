function SubmitAnwer(id, url, posturl) {
    //id：帖子ID，url：验证码地址，posturl：添加回答
    var editor = $("#txtEditor");

    if (editor.val().length < 5 || editor.val() == "我来帮TA回答") {
        alert("内容详细不能少于 5 个字！");
        $("#txtEditor").focus();
        return;
    }

    $.ajax({
        type: "post",
        url: url + "?yzm=" + $("#txtYZM").val(),
        dataType: "json",
        success: function (data) {
            if (data == "0") {
                alert("您的验证码输入有误！");
                $("#txtYZM").val('').focus();
                $("#imgVerifyCode").click();
                return false;
            } else {
            //提交问题
                PostAnswer(id, posturl);
            }
        }
    });
}

//提交问题
function PostAnswer(id, url) {
    var editor = $("#txtEditor").val();
    var txtYZM=$("#txtYZM").val();
    jQuery.ajax({
        type: "post",
        url: url + "?nLtID=" + id + "&sLtcContent=" +escape(editor) + "&txtYZM=" + txtYZM,
        dataType: "json",
        success: function (data) {
            if (data.type == 1) {
                alert(data.message);
                $("#txtEditor").val("");
                $("#txtYZM").val("");
                window.location.search = "?r=" + (new Date().getMilliseconds());
            } 
            else {
                alert(data.message);
                $("#txtYZM").val("");
                
            }
        }
    });
}