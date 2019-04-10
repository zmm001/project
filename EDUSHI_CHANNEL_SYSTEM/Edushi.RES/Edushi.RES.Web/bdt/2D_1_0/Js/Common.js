$(document).ready(function () {
    var $sKey = $("#searchKey");
    $sKey.focus(function () {
        if ($(this).val() == "请输入关键词，您可以在此直接搜索您想找的问题和答案...") {
            $(this).val("");
        }
    });
});

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