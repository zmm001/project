$(document).ready(function () {
    var $sKey = $("#searchKey");
    $sKey.focus(function () {
        if ($(this).val() == "请输入关键词，您可以在此直接搜索您想找的问题和答案...") {
            $(this).val("");
        }
    });

    $("#markTypeList dl").hover(function () {
        $(this).attr("class", "on");
    }, function () {
        $(this).attr("class", "dn");
    })
    var tipStyle = { "color": "#888" }, defaultStyle = { "color": "#000" };
    $("input[defaultValue]").css(tipStyle).focus(function () {
        if ($(this).val() == $(this).attr('defaultValue')) {
            $(this).val("").css(defaultStyle);
        }
    }).blur(function () {
        if ($(this).val() == "") {
            $(this).val($(this).attr('defaultValue')).css(tipStyle);
        }
    })

    var defaultTip = "输入你想问的问题…", codeTip = "答案";

    var askContent = $("#askContent"), txtCheckCode = $("#txtCheckCode");
    askContent.focus(function () {
        if ($(this).html() == defaultTip) {
            $(this).html("").css({ "color": "#000" });
        }
    }).blur(function () {
        if ($(this).html() == "") {
            $(this).html(defaultTip).css({ "color": "#888" });
        }
    })
    if (askContent.html() == "") {
        askContent.css({ "color": "#888" }).html(defaultTip);
    }

    $("#btnSubmitAsk").click(function () {
        if (askContent.html() == "") {
            fnTip("请输入你想问的[问题内容]！");
            askContent.focus();
            return;
        }
        if (txtCheckCode.val() == "") {
            fnTip("请输入[验证码]！");
            return;
        }
        if ($("#ddlSubType").val() == "0") {
            fnTip("请选择分类"); return;
        }
        var url = $(this).attr("url");
        $.ajax({
            dataType: "text",
            type: "POST", url: url, data: {
                txtContent: askContent.html(),
                ddlType: $("#ddlType").val(),
                ddlSubType: $("#ddlSubType").val(),
                txtYZM: txtCheckCode.val()
            },
            success: function (data) {
                if (data.indexOf("OK") == 0) {
                    var url = data.split('|')[1];
                    var msg = '您的信息已发布成功。<br>点击查看<a href="' + url + '" target="_blank">' + url + "</a>";

                    if ($("#hfIsAutoChecked").val() == "True") {
                        msg = '您的信息已发布成功，我们将尽快审核您的信息。审核通过后请查看' + url;
                    }

                    if ($.browser.msie) {
                        msg += '<a href="javascript:;" onclick="fnCopyToClipboard(\'' + url + '\',\'问题的网址已经复制好了\')">【复制】</a><a href="javascript:;" onclick="addBookmark(\'' + askContent.html().substring(0, 30) + '\',\'' + url + '\')">【收藏夹】</a>';
                    }
                    fnTip(msg);
                    askContent.html('');
                    txtCheckCode.val('');
                } else {
                    fnTip(data);
                }
            },
            error: function () {
                fnTip("提交失败，请重试…");
            }
        })
    })
});
function fnTip(msg) {
    $("#askbox_tip").html(msg + "<br/><p style='text-align:center;'><a href='javascript:;' onclick='$(\".askbox_tip\").hide();' class='btnTipsure'>确定</a></p>");
    $(".askbox_tip").slideDown();
}

function fnSwichTab(id) {
    $("#newestQuestion").hide();
    $("#nearestAnswer").hide();
    $("#a_newestQuestion").attr("class", "");
    $("#a_nearestAnswer").attr("class", "");
    $("#" + id).show();
    $("#a_" + id).attr("class", "on");
}

//搜索验证
function onSearch() {
    var $sKey = $("#searchKey");
    if ($sKey.val() == "请输入关键词，您可以在此直接搜索您想找的问题和答案..." || $sKey.val().length == 0) {
        alert("请输入搜索关键字");
        $sKey.focus();
        return false;
    }
    return true;
}

//登录验证
function CheckLogin() {
    var $name = $("#txtUserName");
    var $pass = $("#txtPassWord");
    var $code = $("#txtVerifyCode");

    if ($name.val() == '') {
        $name.focus();
        alert("请输入用户名!");
        return false;
    }
    if ($pass.val() == '') {
        $pass.focus();
        alert("请输入密码!");
        return false;
    }
    if ($code.val() == '') {
        $code.focus();
        alert("请输入验证码!");
        return false;
    }
    return true;
}

//通用复制方法
function fnCopyToClipboard(txt, msg) {
    if (window.clipboardData) {
        window.clipboardData.clearData();
        window.clipboardData.setData("Text", txt);
    } else if (navigator.userAgent.indexOf("Opera") != -1) {
        window.location = txt;
    } else if (window.netscape) {
        try {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
        } catch (e) {
            alert("您的浏览器未开启复制功能！\n请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'");
            return false;
        }
        var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
        if (!clip) {
            return;
        }
        var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
        if (!trans) {
            return;
        }
        trans.addDataFlavor('text/unicode');
        var str = new Object();
        var len = new Object();
        var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
        var copytext = txt;
        str.data = copytext;
        trans.setTransferData("text/unicode", str, copytext.length * 2);
        var clipid = Components.interfaces.nsIClipboard;
        if (!clip) {
            return false;
        }
        clip.setData(trans, null, clipid.kGlobalClipboard);
    }
    else {
        alert('您的浏览器不支持拷贝功能。');
        return false;
    }
    if (msg != null && msg != '') {
        alert(msg);
    }
    return true;
}

function addBookmark(title, url) //title:网站的标题，url:网站的域名
{
    if (window.sidebar) {
        window.sidebar.addPanel(title, url, "");
    } else if (document.all) {
        window.external.AddFavorite(url, title); //此句是命令的关键
    } else if (window.opera && window.print) {
        return true;
    }
}

//详细页
function fnGetTopicViewCount(url){
    $.ajax({
        type: "post",
        url: url,
        dataType: "json",
        success:function(item) {
            $("#viewcount").html("浏览："+item)
        }
    });
}

function fnYzmFoucs() {
    var codeimg = $("#imgVerifyCode");
    if (!codeimg.is(":visible")) {
        codeimg.show().click();
    }
}
function getFocus() {
    jQuery("#txtEditor").focus();
}

function SubmitAnwer(id, url, posturl) {
    var editor = jQuery("#txtEditor");

    if (editor.val().length < 5) {
        alert("内容详细不能少于 5 个字！");
        getFocus();
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
                PostAnswer(id, posturl);
            }
        }
    });
}

//提交问题
function PostAnswer(id, url) {
    var editor = jQuery("#txtEditor");
    var chkGuest = false;
    if (jQuery("#chkGuest").is(":checked")) {
        chkGuest = true;
    }
    var type = jQuery("#hidType").val();
    if (type == "Mod") {
        id = jQuery("#hidLtcId").val();
    }
    jQuery.ajax({
        type: "post",
        url: url + "?nLtID=" + id + "&sLtcContent=" + escape(editor.val()) + "&chkGuest=" + chkGuest + "&type=" + type + "&c=" + jQuery("#txtCoords").val() + "&p=" + jQuery("#txtPoint").val(),
        dataType: "json",
        success: function (item) {
            if (item == 1) {
                alert("提交成功，谢谢您的参与");
                editor.val("");
                $("#txtYZM").val("");
                jQuery("#hidType").val("Add");
                jQuery("#hidLtcId").val(0);
                window.location.search = "?r=" + (new Date().getMilliseconds());
            } else if (item == 2) {
                alert("修改提交成功,我们会尽快审核您的修改!");
                editor.val("");
                $("#txtYZM").val("");
                jQuery("#hidType").val("Add");
                jQuery("#hidLtcId").val(0);
            } else {
                alert("提交失败！");
                $("#txtYZM").val("");
                jQuery("#hidType").val("Add");
                jQuery("#hidLtcId").val(0);
            }
        }
    });
}
//修改答案
function ModifyAnswer(id) {
    var conent = jQuery("#" + id + "conent").text();
    jQuery("#hidType").val("Mod");
    jQuery("#hidLtcId").val(id);
    jQuery("#txtEditor").val(conent);
    getFocus();
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
//关注打听
function FavariteBdt(id, url) {
    jQuery.ajax({
        type: "post",
        url: url + "?ltId=" + id + "&flag=7",
        dataType: "json",
        success: function (item) {
            if (item == -1) {
                alert("您还未登录,无法进行收藏操作!");
            } else if (item == 1) {
                alert("已收藏到我的包打听了~~快去看看吧！");
            }
            else {
                alert("收藏失败或您已经收藏过该打听了！");
            }
        }
    });
}