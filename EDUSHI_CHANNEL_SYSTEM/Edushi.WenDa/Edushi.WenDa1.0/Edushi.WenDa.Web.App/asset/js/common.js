// 弹出层
var cb = null;
function popUp(msg, callbackFn, flag, url, text) {
    cb = callbackFn;
    $(".pop-content").show();
    $("#msg").text(msg);
    if (flag && flag == 1) {
        $(".pop-content .confirm").text(text).attr("href", url).show();
    }
}
$(document).on('click', '.pop-box .cancel', function () {
    $(".pop-content").hide();
    if (cb != null)
        cb();
})


function checkPlatType() {
    var u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
        //android终端
        return 2;
    }
    else if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        //ios终端
        return 1;
    }
}

var appId = 0;
function getAppId(flag) {   //flag：为0时只取值，为1时表示需要让用户进行LOGIN
    var type = checkPlatType();
    if (type == 2) {
        appId = getAppId_Android(flag);
    }
    else {
        window.webkit.messageHandlers.getInfo.postMessage(flag);
    }
}

function setInfo(info) {
    if (info != null) {
        appId = info.userId;
    }
}

function getAppId_Android(flag) {
    var loginId = 0;
    var info = AldNewsAndroid.getInfo(flag);
    if (info != null) {
        var obj = JSON.parse(info);
        loginId = obj.userId;
    }
    return loginId;
}

//打开URL链接：android和ios已调通
function openPage(url) {
    var type = checkPlatType();
    if (type == 1) {
        var dic = { "url": url };
        window.webkit.messageHandlers.openPage.postMessage(dic);
    }
    else if (type == 2) {
        AldNewsAndroid.openPage(url);
    }
}

//返回：android和ios已调通
function goBack() {
    var type = checkPlatType();
    if (type == 1) {
        window.webkit.messageHandlers.goBack.postMessage("");
    }
    else if (type == 2) {
        AldNewsAndroid.goBack();
    }
}

//跳到个人主页：android和IOS已调通
function openUserIndexPage(appId) {
    var type = checkPlatType();
    if (type == 1) {
        var dic = { "userId": appId };
        window.webkit.messageHandlers.jumpToPersonal.postMessage(dic);
    }
    else if (type == 2) {
        AldNewsAndroid.jumpToPersonal(appId);
    }
}

//分享：android和ios已调通
function Share(title, desc, url, picurl) {
    var dic = JSON.stringify({ "title": title, "desc": desc, "url": url, "picurl": picurl, shareType: 1 });
    var type = checkPlatType();
    if (type == 1) {
        window.webkit.messageHandlers.toShare.postMessage(dic);
    }
    else if (type == 2) {
        AldNewsAndroid.toShare(dic);
    }
}