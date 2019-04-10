function popUp(msg, callback, flag) {
    if (flag) {
        $(".pop-box .cancel").show();
    } else {
        $(".pop-box .cancel").hide();
    }
    $(".pop-box").show();
    $("#msg").text(msg);

    $(".confirm").unbind("click").click(function () {
        if (flag) {
            callback();
        }
        $(".pop-box").hide();
    });
}


function hover(obj, showObj) {
    obj.hover(function () {
        if (!obj.hasClass("weixin")) {
            $(this).find(showObj).show();
        }
    }, function () {
        $(this).find(showObj).hide();
    });
}
function zanCai(obj, className) {
    obj.addClass(className);
    obj.find("em").addClass("show").delay(1000).hide(200);
    obj.siblings().css({ "cursor": "text" });
}

$(function () {
    $(".pop-box .cancel").click(function () {
        $(".pop-box").hide();
    });
    hover($(".top-box .tips li"), ".logout");
    hover($(".js-oper .share"), ".hid-share");
    hover($(".js-oper .share .weixin"), ".wx-qr");


    $("#datalist").on("click", ".question-cnt .share a:not(.weixin)", function () {
        if (!$(this).hasClass("ok")) {
            var type = $(this).attr("class");
            var obj = $(this).parents(".question-cnt").find(".q-tit a");
            var url = obj.attr("href");
            var title = obj.text();
            var that = $(this);

            $.post("/wenda/ShareUrl.htm",
                { type: type, url: url, title: title },
                function (data) {
                    if (data) {
                        that.addClass("ok");
                        window.location.href = data;
                    }
                });
        }
    });

    //返回顶部
    $(window).scroll(function () {
        if ($(window).scrollTop() >= $(window).height() / 2) {
            $(".floatbar .top").height(50);
        } else {
            $(".floatbar .top").height(0);
        }
    });
    $(".floatbar .top").click(function () {
        $("body, html").animate({ scrollTop: 0 }, 500);
    });
    //刷新
    $(".floatbar .refresh").click(function () {
        window.location.reload();
    });

    $("#datalist").on("click", ".question-cnt .share a.weixin", function () {
        if (!$(this).hasClass("ok")) {
            var obj = $(this).parents(".question-cnt").find(".q-tit a");
            var url = obj.attr("href");
            var that = $(this);
            $.post("/wenda/ShareUrl.htm",
                { type: "weixin", url: url, title: "" },
                function (data) {
                    if (data) {
                        that.addClass("ok");
                        that.find(".wx-qr img").attr("src", data);
                        that.find(".wx-qr").show();
                    }
                });
        } else {
            $(this).find(".wx-qr").show();
        }

    });

    $(".radio-box label").bind("click", function (ev) {
        if (!$(this).find("input").is(":checked")) {
            $(".radio-box label").removeClass("checked");
            $(this).addClass("checked");
        }
    })
    //点击提问弹出框
    var _inLayer = true; //判断鼠标在弹层内还是弹层外，在弹层外点击时关闭弹层
    $("#modal-layer .ask-layer-box").mouseenter(function () {
        _inLayer = true;
    });
    $("#modal-layer .ask-layer-box").mouseleave(function () {
        _inLayer = false;
    });

    //点击提问弹出框
    $(".search-box .ask").click(function () {
        $("#modal-layer").show();
    });
    $("#modal-layer").click(function () {
        if (!_inLayer) {
            $("#modal-layer").hide();
        }
    });
    $("#modal-layer .js-close").click(function () {
        $("#modal-layer").hide();
    });

    $(".main-box").css({ "min-height": $(document).height() - 100 });

    //赞与踩

    $(".js-votelist .yicai").prev(".zan").css({ "cursor": "text" }); //已踩时前面的赞去掉链接手势，已赞在样式中控制

    //赞与踩
    $(".js-votebox").on("click", ".js-votelist .js-oper .zan", function () {
        if (!$(this).hasClass("yizan") && !$(this).siblings(".cai").hasClass("yicai")) {
            var _this = $(this);
            var answerId = _this.parents(".js-oper").data("id");
            $.ajax({
                type: "post",
                dataType: "json",
                url: "/wenda/AddAnswerUpvoteDownvote.htm",
                data: { "iaId": answerId, "action": 1 },
                success: function (data) {
                    if (data.ResultCode == 1) {
                        var _number = _this.find("span").text();
                        _this.find("span").text(parseInt(_number) + 1);
                        zanCai(_this, "yizan");
                    } else if (data.ResultCode == 2) {
                        window.location.href = 'http://user.edushi.com/Login.html?BackUrl=' + window.location.href;
                    } else {
                        alert(data.Msg);
                    }
                }
            });


        }

    });
    $(".js-votebox").on("click", ".js-votelist .js-oper .cai", function () {
        if (!$(this).hasClass("yicai") && !$(this).siblings(".zan").hasClass("yizan")) {
            var _this = $(this);
            var answerId = _this.parents(".js-oper").data("id");
            $.ajax({
                type: "post",
                dataType: "json",
                url: "/wenda/AddAnswerUpvoteDownvote.htm",
                data: { "iaId": answerId, "action": 2 },
                success: function (data) {
                    _isClick = true;
                    if (data.ResultCode == 1) {
                        var _number = _this.find("span").text();
                        _this.find("span").text(parseInt(_number) + 1);
                        zanCai(_this, "yicai");
                    } else if (data.ResultCode == 2) {
                        window.location.href = 'http://user.edushi.com/Login.html?BackUrl=' + window.location.href;

                    } else {
                        alert(data.Msg);
                    }
                }
            });

        }
    });

    $(".best-qa-list").each(function () {
        var obj = $(this).find(".qa-item a");
        if ($.trim(obj.text()).length > 80) {
            obj.text(obj.text().substring(0, 70));
            obj.html(obj.text() + '...<span>全文</span>');
        }
    });

    //图片上传预览
    $("#file").change(function () {
        if ($(".img-item img").length >= 3) {
            showMsg("最多只能上传3张图片");
        } else {
            if ($(this).val().length > 0) {
                subimtForm();

            }
        }
    });

    function subimtForm() {
        var form = $("#addform");
        var options = {
            url: '/wenda/UploadImg.htm',
            type: 'post',
            success: function (data) {
                //var jsondata = eval("(" + data + ")");
                if (data.errno == "0") {
                    var section = $('<div class="img-item">');
                    $("#modal-layer .img-list").prepend(section);
                    var div = $('<div>');
                    div.appendTo(section);
                    var p = $('<p id="imghead">');
                    p.appendTo(div);
                    var img = $('<img>');
                    img.appendTo(p);
                    var close = $('<span class="img-close"></span>');
                    close.appendTo(section);
                    var url = data.data[0];

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
        //$("#fileForm").submit();  
    }
    $(".img-upload").on("click", ".img-close", function () {
        $(this).parent(".img-item").remove();
        $("#file").val("");
        if ($(".img-item img").length < 3) {
            $("#addform").show();
        }
    });

    $(window).bind("resize load", function () {
        if ($(window).height() - 87 < $(".sidebar-box").height()) {;
            $(".sidebar-box").addClass("abs");
        } else {
            $(".sidebar-box").removeClass("abs");
        }
    });
});