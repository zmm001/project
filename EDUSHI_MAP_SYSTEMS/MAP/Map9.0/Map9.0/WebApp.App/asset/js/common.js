

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

var UserLocation = new Array();
function getUserLocation() {
    var type = checkPlatType();
    if (type == 2) {
        UserLocation = getLocation_Android();
    }
    else {
        window.webkit.messageHandlers.getLocation.postMessage(2);
    }
}

function getLocation_Android() {
    var location = new Array();
    var info = AldNewsAndroid.getLocation(2);
    if (info != null) {
        var obj = JSON.parse(info);
        if (obj.x != "" && obj.y != "") {
            location[0] = obj.x;
            location[1] = obj.y;
        }
    }
    return location;
}

function setLocation(info) {
    if (info != null) {
        if (info.x != "" && info.y != "") {
            UserLocation[0] = info.x;
            UserLocation[1] = info.y;
        }
    }
}

// 地址栏根据名称搜索
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}