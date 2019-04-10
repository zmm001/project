$(function () {
    // 头部城市切换
    $(".J-changeCity").click(function () {
        $(".J-cityList").toggle();
    });

    //头部是否登陆判断
    $.ajax({
        type: "post",
        url: $("#hidIsLoginUrl").val(),
        dataType: "json",
        success: function (item) {
            if (item.IsLogin) {
                //                    $("#divLogin").hide();
                //                    $("#divUserInfo").show();
                //                    $("#userName").text(item.NickName);
                //                    $("#topic").text("(" + item.Topic + ")");
                //                    $("#comment").text("(" + item.Comment + ")");
                $("#userinfo").html("");
                var info = "<a href=\"http://my.edushi.com/Index.aspx?City=" + $("#hidCity").val() + "\" class=\"welcome\">" + item.NickName + "</a>"; //欢迎您，用户中心<a href='http://my.edushi.com/my/MessageBox.aspx' class='mail'>
                //                    if(item.MsgCount>0){
                //                   info+='<div class="pp">您有'+item.MsgCount+'条未读消息</div>';
                //                    }
                info += "&nbsp;&nbsp;<a href=\"http://my.edushi.com/LoginOut.aspx?City=" + $("#hidCity").val() + "&BackUrl=" + $("#hidBackUrl").val() + "\">退出</a>"; // <span>"+item.MsgCount+"</span></a><a href=\"@(Model.Base.BdtUrl)BdtHelp.htm\">帮助</a>

                $("#userinfo").html(info);
            }
        }
    });

    /* 顶部更多显示与隐藏 */
    var _moreBtn = $(".show-more");
    _moreBtn.bind("mouseover", function () {
        $(this).find(".more-item").show();
    });
    _moreBtn.bind("mouseout", function () {
        $(this).find(".more-item").hide();
    });

    /* 返回顶部 */
    var _windowHeight = $(window).height();
    var _getBackTop = $(".float-slidebar");
    _getBackTop.css({ "right": parseInt(($(window).width() - 1000) / 2 - 113) });
    $(window).resize(function () {
        _getBackTop.css({ "right": parseInt(($(window).width() - 1000) / 2 - 113) });
    });

    $(window).scroll(function () {
        var _scrollTop = $(window).scrollTop();
        if (_scrollTop >= parseInt(_windowHeight / 2 - 300)) {
            _getBackTop.fadeIn();
        } else {
            _getBackTop.fadeOut();
        }
    });
    _getBackTop.find(".back-top").click(function () {
        $("body, html").animate({ scrollTop: 0 }, 500);
    });

    //头部包打听分类
    $(".main-nav li:last").addClass("last");

    //首页问题分类
    var _getCategroyLi = $(".categroy-item");
    if (_getCategroyLi.length > 0) {
        var _showSubLi = $("ul.category-li");
        _getCategroyLi.hover(function () {
            var _this = $(this);
            _this.addClass("hover").find(_showSubLi).show();
        }, function () {
            var _this = $(this);
            _this.removeClass("hover").find(_showSubLi).hide();
        });
    }

    //详细页其他回答
    if ($(".answer-list").length > 0) {
        $(".answer-list:last").css({ "border-bottom": "0" }); //其他回答最后一条去掉下边框
    }

    /* 问题列表鼠标移上去表格变色 */
    if ($(".ask-sub-table").length > 0) {
        $(".ask-sub-table tr").hover(function () {
            $(this).find("td").addClass("hover");
        }, function () {
            $(this).find("td").removeClass("hover");
        });
    }
});

//设为首页
function SetHome(obj, url) {
    try {
        obj.style.behavior = 'url(#default#homepage)';
        obj.setHomePage(url);
    } catch (e) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            } catch (e) {
                alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入'about:config'并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
            }
        } else {
            alert("抱歉，您的浏览器不支持自动设置首页，请使用浏览器菜单手动设置！");
        }
    }
}

function fnSwichTab(id) {

    switch (id) {
        case "WaitingToResolve":
            $("#liWaitingToResolve").attr("class", "current");
            $("#liNewestQuestion").attr("class", "");
            $("#liNearestAnswer").attr("class", "last");
            break;
        case "NewestQuestion":
            $("#liWaitingToResolve").attr("class", "");
            $("#liNewestQuestion").attr("class", "current");
            $("#liNearestAnswer").attr("class", "last");
            break;
        case "NearestAnswer":
            $("#liWaitingToResolve").attr("class", "");
            $("#liNewestQuestion").attr("class", "");
            $("#liNearestAnswer").attr("class", "last current");
            break;
    }

    $("#WaitingToResolve").hide();
    $("#NewestQuestion").hide();
    $("#NearestAnswer").hide();
    $("#" + id).show();
}
//采纳最佳答案
function bestAnswer(id, cid, url) {
    jQuery.ajax({
        type: "post",
        url: url + "?ltId=" + id + "&ltcId=" + cid,
        dataType: "json",
        success: function (item) {
            if (item == 1) {
                alert("采纳最佳答案成功！");
                window.location.search = "?r=" + (new Date().getMilliseconds());
            } else {
                alert("采纳最佳答案失败！");
            }
        }
    });
}

//加入收藏
function AddFavorite(title, url) {
    try {
        window.external.addFavorite(url, title);
    }
    catch (e) {
        try {
            window.sidebar.addPanel(title, url, "");
        }
        catch (e) {
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}