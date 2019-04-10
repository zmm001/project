var ask = {
    // 删除图片
    /**
                url ：请求地址
                fileName： 删除的图片名称
    */
    deleteImg: function (url, fileName) {
        $.ajax({
            type: 'post',
            url: url,
            data: { "fileName": fileName },
            success: function (data) {
                console.log(data.Msg)
            },
            error: function () {
            }
        })
    },
    // 提交表单
    /**
                url ：请求地址
                form： 选择需要操作的元素
    */
    submitForm: function (url, form) {
        var options = {
            url: url,
            type: 'post',
            success: function (data) {
                if (data.errno == "0") {
                    var section = $('<div class="img-item">');
                    $(".img-list").append(section);
                    var div = $('<div>');
                    div.appendTo(section);
                    var p = $('<p id="imghead">');
                    p.appendTo(div);
                    var img = $('<img>');
                    img.appendTo(p);
                    var url = data.data[0];
                    var close = $('<span class="img-close"></span>');
                    close.appendTo(section);
                    img.attr("src", url);
                    if ($(".img-item img").length >= 3) {
                        form.hide();
                    }
                } else {
                    popUp(data.Msg);
                }
            }
        };
        form.ajaxSubmit(options);
    },
    // 发布
    /**
                url ：请求地址
                paramObj： 参数对象
                elementObj： 需要操作的元素对象
    */
    submit: function (url, paramObj, elementObj) {
        $.ajax({
            type: 'post',
            dataType: "json",
            url: url,
            data: paramObj,
            success: function (data) {
                if (data.errno == "0") {
                    popUp(data.Msg, goBack);
                }
                else {
                    popUp(data.Msg);
                }
            },
            error: function () {
                popUp("请稍后重试");
            }
        })
    }

}