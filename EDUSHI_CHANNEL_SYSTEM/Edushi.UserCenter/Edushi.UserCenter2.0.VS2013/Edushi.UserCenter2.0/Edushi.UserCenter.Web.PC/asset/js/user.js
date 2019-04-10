$(function () {
    //顶部导航展开与关闭
    //$(".nav-tips .more").click(function (e) {
    //    $(this).toggleClass("on");
    //    $(".sitemap").toggle();
    //    e.stopPropagation();
    //});
    //if ($(".sitemap:visible")) {
    //    $(window).bind("scroll", function () {
    //        $(".nav-tips .more").removeClass("on");
    //        $(".sitemap").hide();
    //    });
    //    $(document).click(function () {
    //        $(".nav-tips .more").removeClass("on");
    //        $(".sitemap").hide();
    //    });
    //    $(".sitemap").click(function (e) {
    //        e.stopPropagation();
    //    });
    //}


    String.prototype.trim = function () {
        return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }
    if ($(".follow-btn").length > 0) {
        $(".follow-box").on("mouseover", ".follow-list .follow-btn", function () {
            $(this).addClass("dis-follow");
            $(".dis-follow").text("取消关注");
        });

        $(".follow-box").on("mouseleave", ".follow-list .follow-btn", function () {
            $(this).removeClass("dis-follow");
            if ($(this).hasClass("followed")) {
                $(this).text("已关注");
            } else {
                $(this).text("互相关注");
            }
        });
    }
    //调整高度
    $(".container > .wrapper, .container > .wrapper .side, .container > .wrapper .main").css("min-height", $(".container").height());
    $(".container.my > .wrapper .main").css("min-height", $(".container").height() - 140);
    //顶部更多显示隐藏
    $(".top-nav .more").bind("mouseenter", function () {
        $(".more-nav").show();
    });
    $(".top-nav").bind("mouseleave", function () {
        $(".more-nav").hide();
    });

    //返回顶部 + 左侧悬浮
    //function backTop(contenter, topObj) {
    //    var _windowHeight = $(window).height();
    //    contenter.css({ "right": parseInt(($(window).width() - 1200) / 2 - contenter.outerWidth(true) - 10) });
    //    $(window).resize(function () {
    //        contenter.css({ "right": parseInt(($(window).width() - 1200) / 2 - contenter.outerWidth(true) - 10) });
    //    });
    //    $(window).scroll(function () {
    //        var _scrollTop = $(window).scrollTop();
    //        if (_scrollTop >= parseInt(_windowHeight / 2)) {
    //            contenter.fadeIn();
    //        } else {
    //            contenter.fadeOut();
    //        }
    //    });
    //    topObj.click(function () {
    //        $("body, html").animate({ scrollTop: 0 }, 500);
    //    });
    //}
    //backTop($(".back-top"), $(".back-top span"));
});

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

