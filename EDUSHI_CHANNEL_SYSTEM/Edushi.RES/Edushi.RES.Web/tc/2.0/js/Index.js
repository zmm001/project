var string = {};
string.Format = function () {
    var param = Array.prototype.slice.apply(arguments);
    var format = param.shift();
    return format.replace(/\{(\d+)}/g, function (m, i) {
        return param[i];
    });
};

function Rnd(flg) {
    var d, s = '';
    if (!flg) flg = 100000;
    d = new Date();
    s += d.getHours();
    s += d.getMinutes();
    s += d.getSeconds();
    s += d.getMilliseconds();
    return Math.round(Math.random() * flg).toString() + s.toString();
}

Object.extend = function (destination, source) {
    for (property in source) {
        destination[property] = source[property];
    }
    return destination;
};
Object.extend(String.prototype, {
    ltrim: function () {//去除左边空格
        var whitespace = new String(" \t\n\r");
        var s = new String(this);
        if (whitespace.indexOf(s.charAt(0)) != -1) {
            var j = 0, i = s.length;
            while (j < i && whitespace.indexOf(s.charAt(j)) != -1) {
                j++;
            }
            s = s.substring(j, i);
        }
        return s;
    },
    rtrim: function () {//去除右边空格
        var whitespace = new String(" \t\n\r");
        var s = new String(this);
        if (whitespace.indexOf(s.charAt(s.length - 1)) != -1) {
            var i = s.length - 1;
            while (i >= 0 && whitespace.indexOf(s.charAt(i)) != -1) {
                i--;
            }
            s = s.substring(0, i + 1);
        }
        return s;
    },
    trim: function () {//去除两边空格
        var s = new String(this);
        s = s.ltrim().rtrim();
        return s;
    },
    Int: function () {//转成整数
        return parseInt(this);
    },
    Float: function () {//转成浮点数
        return parseFloat(this);
    },
    replaceAll: function (AFindText, ARepText) {
        var raRegExp = new RegExp(AFindText.replace(/([\(\)\[\]\{\}\^\$\+\-\*\?\.\"\'\|\/\\])/g, "\\$1"), "ig");
        return this.replace(raRegExp, ARepText);
    }
});

//Cookie操作类
function CookieHelper() { }
CookieHelper.prototype.expires = '';
CookieHelper.prototype.path = '';
CookieHelper.prototype.domain = '';
CookieHelper.prototype.secure = '';
//get Cookie value
CookieHelper.prototype.getCookie = function (sCookieName) {
    var sName = sCookieName + "=", ichSt, ichEnd;
    var sCookie = document.cookie;
    if (sCookie.length && (-1 != (ichSt = sCookie.indexOf(sName)))) {
        if (-1 == (ichEnd = sCookie.indexOf(";", ichSt + sName.length))) {
            ichEnd = sCookie.length;
        }
        return unescape(sCookie.substring(ichSt + sName.length, ichEnd));
    }
    return null;
};
//set Cookie value
CookieHelper.prototype.setCookie = function (sCookieName, sCookieValue, dCookieExpires) {
    var argv = this.setCookie.arguments, argc = this.setCookie.arguments.length;
    var sExpDate = (argc > 2) ? "; expires=" + argv[2].toGMTString() : "";
    var sPath = (argc > 3) ? "; path=" + argv[3] : "";
    var sDomain = (argc > 4) ? "; domain=" + argv[4] : "";
    var sSecure = (argc > 5) && argv[5] ? "; secure" : "";
    document.cookie = sCookieName + "=" + escape(sCookieValue, 0) + sExpDate + sPath + sDomain + sSecure + ";";
};

function ENetwork() { };
ENetwork.GetExecutionID = function () {
    var a = new Date, b = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds(), a.getMilliseconds());
    b += Math.round(Math.random() * 1000000);
    return b
};
ENetwork.DownloadScriptCallback = function (a) { if (a) { a(); } };
ENetwork.DownloadScript = function (a, b, c) {
    try {
        if (a == null || a == "undefined" || a.length == 0) {
            throw new ENetworkException("ENetwork:DownloadScript", "err_noscripturl", l24ht);
        }
        var elScript = document.createElement("script");
        elScript.type = "text/javascript";
        elScript.language = "javascript";
        elScript.id = typeof (c) == "undefined" ? ENetwork.GetExecutionID() : c;
        elScript.src = a;
        if (document.getElementById(c)) {
            ENetwork.GetAttachTarget().removeChild(document.getElementById(c));
        }
        ENetwork.GetAttachTarget().appendChild(elScript);
        if (navigator.userAgent.indexOf("IE") >= 0) {
            elScript.onreadystatechange = function () {
                if (elScript && ("loaded" == elScript.readyState || "complete" == elScript.readyState)) {
                    elScript.onreadystatechange = null;
                    ENetwork.DownloadScriptCallback(b);
                }
            }
        }
        else {
            elScript.onload = function () {
                elScript.onload = null;
                ENetwork.DownloadScriptCallback(b);
            }
        }
        return elScript.id;
    }
    catch (e) {
        alert('加载失败！');
    }
};
ENetwork.GetAttachTarget = function () {
    if (document.getElementsByTagName("head")[0] != null) {
        return document.getElementsByTagName("head")[0];
    }
    else {
        throw new ENetworkException("ENetwork:cstr", "err_noheadelement", l611ft);
    }
};
function ENetworkException(b, c, a) {
    this.source = b;
    this.name = c;
    this.message = a;
}
ENetworkException.prototype.Name = this.name;
ENetworkException.prototype.Source = this.source;
ENetworkException.prototype.Message = this.message;
