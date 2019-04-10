function attention(_this, id) {
    if ($(_this).hasClass("followed")) {
        $.ajax({
            type: "post",
            dataType: "json",
            async: false,
            url: requestUrl + "CancelAttention.htm",
            data: { "userId": id },
            success: function (data) {
                if (data.ResultCode == 1) {
                    $(".look-msg").text("取消关注成功");
                    $(".look-layout").fadeIn(200).delay(1500).fadeOut(200);
                    var objElements = $('.id' + id);
                    $.each(objElements, function (elementIndex, element) {
                        element.className = 'follow-btn id' + id;
                    });
                } else if (data.ResultCode == 2) {
                    window.location.href = 'http://m.edushi.com/user/Login.html?BackUrl=' + window.location.href;
                } else {
                    popUp(data.Msg);
                }
                window.location.reload();
            }
        });
    } else {
        $.ajax({
            type: "post",
            dataType: "json",
            async: false,
            url: requestUrl + "AddAttention.htm",
            data: { "userId": id },
            success: function (data) {
                if (data.ResultCode == 1) {
                    $(".look-msg").text("关注成功");
                    $(".look-layout").fadeIn(200).delay(1500).fadeOut(200);
                    var objElements = $('.id' + id);
                    $.each(objElements, function (elementIndex, element) {
                        element.className = 'followed id' + id;
                    });
                } else if (data.ResultCode == 2) {
                    window.location.href = 'http://m.edushi.com/user/Login.html?BackUrl=' + window.location.href;
                } else {
                    popUp(data.Msg);
                }
                window.location.reload();
            }
        });
    }
}