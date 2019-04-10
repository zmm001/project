//顶部导航展开与关闭
$(".nav-tips .more").click(function (e) {
    var that = $(this);
    if ($(".top-nav-box .classilylist").find("li").length <= 0) {
        $.post("http://www.edushi.com/ClassilyList.htm", function (data) {
            if (data) {
                $(".top-nav-box .classilylist").append(data);
                $(".sitemap").toggle();
                that.toggleClass("on");
                e.stopPropagation();
            }
        });
    } else {
        $(".sitemap").toggle();
        $(this).toggleClass("on");
        e.stopPropagation();
    }
});
if ($(".sitemap:visible")) {
    $(window).bind("scroll", function () {
        $(".nav-tips .more").removeClass("on");
        $(".sitemap").hide();
    });
    $(document).click(function () {
        $(".nav-tips .more").removeClass("on");
        $(".sitemap").hide();
    });
    $(".sitemap").click(function (e) {
        e.stopPropagation();
    });
}

//页面滚动时顶部登录按钮背景变化
$(window).bind("scroll", function () {
    var _scrollTop = $(window).scrollTop();
    if (_scrollTop > 0) {
        $(".nav-tips a.login").addClass("black");
    } else {
        $(".nav-tips a.login").removeClass("black");
    }
});

//验证是否登录
$.ajax({
    type: "post",
    url: "http://www.edushi.com/IsLogin.htm",
    dataTpe: "json",
    xhrFields: {
        withCredentials: true
    },
    success: function (data) {
        var $userHtml = "";
        var backUrl = escape(window.location.href + "?rnd=" + Math.random());
        if (data.ResultCode == 1 && data.NickName) {
            $("#submitBtn").val("发布");
            $userHtml = " <a href=\"http://user.edushi.com/xiaoshuo/mybookrack.html\" target='_blank' class='user-nave'>" +
                data.NickName +
                "</a>\r\n" +
                "<a href=\"http://user.edushi.com/exitlogin.htm?BackUrl=" + backUrl + "\" class='logout'>安全退出</a>";

        } else {
            $("#submitBtn").val("登录并发布");
            $userHtml = "<a href=\"javascript:void(0);\" onclick=\"window.location.href = 'http://user.edushi.com/Login.html?BackUrl=" + backUrl + "'\" class=\"login\">登录</a>";
        }
        $("#member").append($userHtml);
    }
});


$(function () {
    //返回顶部
    function backTop(contenter, topObj) {
        var _windowHeight = $(window).height();
        contenter.css({ "right": parseInt(($(window).width() - 1200) / 2 - contenter.outerWidth(true) - 10) });
        $(window).resize(function () {
            contenter.css({ "right": parseInt(($(window).width() - 1200) / 2 - contenter.outerWidth(true) - 10) });
        });
        $(window).scroll(function () {
            var _scrollTop = $(window).scrollTop();
            if (_scrollTop >= parseInt(_windowHeight / 2)) {
                contenter.fadeIn();
            } else {
                contenter.fadeOut();
            }
        });
        topObj.click(function () {
            $("body, html").animate({ scrollTop: 0 }, 500);
        });
    }
    backTop($(".back-top"), $(".back-top span"));
});


