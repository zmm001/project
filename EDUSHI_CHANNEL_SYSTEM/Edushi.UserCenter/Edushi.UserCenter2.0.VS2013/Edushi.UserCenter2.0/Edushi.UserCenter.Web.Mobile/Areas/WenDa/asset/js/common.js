function zanCai(obj, className) {
    obj.addClass(className);
    obj.find("em").show().delay(1000).hide(200);
    obj.siblings().css({ "cursor": "text" });
}

$(function () {
    //点赞或踩
    $("#datalist").on("click", ".js-votelist .zan", function () {
        if (!$(this).hasClass("yizan") || $(this).siblings(".cai").hasClass("yicai")) {
            var _this = $(this);
            var answerId = _this.parents(".js-oper").data("id");
            $.ajax({
                type: "post",
                dataType: "json",
                url: "/user/wenda/AddAnswerUpvoteDownvote.htm",
                data: { "iaId": answerId, "action": 1 },
                success: function (data) {
                    if (data.ResultCode == 1) {
                        var _number = _this.find("span").text();
                        _this.find("span").text(parseInt(_number) + 1);
                        zanCai(_this, "yizan");
                    } else if (data.ResultCode == 2) {
                        window.location.href = 'http://m.edushi.com/user/Login.html?BackUrl=' + window.location.href;
                    } else {
                        alert(data.Msg);
                    }
                }
            });


        }
    });

    $("#datalist").on("click", ".js-votelist .cai", function () {
        if (!$(this).hasClass("yicai") || $(this).siblings(".zan").hasClass("yizan")) {
            var _this = $(this);
            var answerId = _this.parents(".js-oper").data("id");
            $.ajax({
                type: "post",
                dataType: "json",
                url: "/user/wenda/AddAnswerUpvoteDownvote.htm",
                data: { "iaId": answerId, "action": 2 },
                success: function (data) {
                    if (data.ResultCode == 1) {
                        var _number = _this.find("span").text();
                        _this.find("span").text(parseInt(_number) + 1);
                        zanCai(_this, "yicai");
                    } else if (data.ResultCode == 2) {
                        window.location.href = 'http://m.edushi.com/user/Login.html?BackUrl=' + window.location.href;
                    } else {
                        alert(data.Msg);
                    }
                }
            });


        }
    });

    //分享
    $("#datalist").on("click", ".question-list .share", function () {
        var obj = $(this).parents(".js-votelist").find(".q-tit a");
        var url = obj.attr("href");
        var title = obj.text();

        $.post("/user/wenda/ShareUrl.htm",
            { url: url, title: title },
            function (data) {
                if (data) {
                    $(".qzone").attr("href", data.qzone);
                    $(".weibo").attr("href", data.weibo);
                    $('.share-layout').show();
                    $('.share-box').addClass('show');
                }
            });
    });
})