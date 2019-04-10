//定义通用类创建对象
var Class = {
    create: function () {
        return function () {
            return this.initialize.apply(this, arguments); //强制类声明时初始化
        }
    }
};
//对象原型扩展
Object.extend = function (destination, source) {
    for (property in source) {
        destination[property] = source[property];
    }
    return destination;
};
Function.prototype.bind = function () {
    var __method = this, args = $A(arguments), object = args.shift();
    return function () {
        return __method.apply(object, args.concat($A(arguments)));
    }
};
Function.prototype.bindAsEventListener = function (object) {
    var __method = this, args = $A(arguments), object = args.shift();
    return function (event) {
        return __method.apply(object, [(event || window.event)].concat(args).concat($A(arguments)));
    }
};
var $A = Array.from = function (iterable) {
    if (!iterable) return [];
    if (iterable.toArray) {
        return iterable.toArray();
    } else {
        var results = [];
        for (var i = 0, length = iterable.length; i < length; i++) {
            results.push(iterable[i]);
        }
        return results;
    }
};
//3、创建一个超级随机整数字符flg随机数量级
function $Rnd(flg) {
    var d, s = '';
    if (!flg) flg = 100000;
    d = new Date();
    s += d.getHours();
    s += d.getMinutes();
    s += d.getSeconds();
    s += d.getMilliseconds();
    return Math.round(Math.random() * flg).toString() + s.toString();
}
//2、创建一个页面元素tag
function $C(tag) {
    return document.createElement(tag);
}
//获取选定Radio控件的值
function GetRadioValue(name) {
    var radioList = document.getElementsByName(name);
    for (var i = 0; i < radioList.length; i++) {
        if (radioList[i].checked) {
            return radioList[i].value;
        }
    }
}

//8、、扩展：去除字符串空格
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

/*************************************************
* 控件基类，全局文件
*************************************************/
// 控件基类
var ControlBase = Class.create();
Object.extend(ControlBase.prototype, {
    //构造
    initialize: function (documentContainer) {
        try {
            if (documentContainer) {
                this.DocumentContainer = documentContainer;
                this.Body = this.DocumentContainer.createElement('IFRAME');
            }
            else {
                this.DocumentContainer = document;
                this.Body = this.DocumentContainer.createElement('IFRAME');
                this.Body.id = '_iframe' + $Rnd();
            }
            this.Body.frameBorder = '0';
            this.Body.scrolling = "no";
            this.Body.style.overflow = 'hidden';
            this.Body.allowTransparency = 'true';
            this.Body.style.display = 'none';
            this.Body.style.width = this.Width + 'px';
            this.Body.style.height = this.Height + 'px';
            //this.Body.style.filter = 'progid:DXImageTransform.Microsoft.BasicImage(grayscale=1)';
            this.Config = GlobalConfig;     //附加全局Config对象
            this._loadUI();

            //绑定事件
            if (document.all) {
                this.Body.attachEvent("onload", this._loadComplete.bindAsEventListener(this));
            }
            else {
                this.Body.onload = this._loadComplete.bindAsEventListener(this);
            }

        }
        catch (ex) {
            alert('脚本出错' + ex.message);
            _loadError(ex.message);
        }
    },

    //公有方法
    $: function (sID) {
        return this.Body.contentWindow.document.getElementById(sID);
    },
    $C: function (tag) {
        return this.Body.contentWindow.document.createElement(tag);
    },
    LoadUI: function (sControlName) {          //载入UI
        this.Body.src = 'bdt/' + sControlName + '.shtml?rnd=' + $Rnd();
    },
    ResumeLayout: function () {   //重做布局，位置大小
        //        this.Body.style.top = this.Y + 'px';
        //        this.Body.style.left = this.X + 'px';
        this.Body.style.width = this.Width + 'px';
        this.Body.style.height = this.Height + 'px';
    },
    Show: function () {         //显示控件，控件创建完（new）不会显示，需调用Show方法后才会显示
        // .. .. .. 此处可做一些数据加载的逻辑 .. .. .. 
        this.Body.style.display = 'block';
    },
    Hide: function () {         //隐藏控件
        this.Body.style.display = 'none';
    },
    Dispose: function () {      //销毁控件，释放所有占用的资源
        this.parentNode.removeNode(this.Body);
    },
    MoveTo: function (x, y) {   //移动控件到指定位置
        this.Body.style.position = 'absolute';
        this.Body.style.top = y + 'px';
        this.Body.style.left = x + 'px';
    },
    //对外提供的公共事件接口
    onLoadComplete: function (source) {
    },
    onLoadError: function (source, msg) {
    },
    //共同属性
    Body: null,         //IFrame
    ID: 0,               //加载到地图后的ID
    Config: null,
    X: 0,
    Y: 0,
    Width: 303,
    Height: 418,

    //私有接口，子类必须实现，可调用LoadUI方法，或则自己指定this.Body.src
    _loadUI: function () {
    },
    //私有事件
    _loadComplete: function () {
        // .. .. .. 此事可以托管该事件，执行一些附加操作，再将事件抛出 .. .. ..
        this.onLoadComplete(this);
    },
    _loadError: function (msg) {
        // .. .. .. 此事可以托管该事件，执行一些附加操作，再将事件抛出 .. .. .. 
        this.onLoadError(this, msg);
    }
});

function ENetwork() { };
ENetwork.GetExecutionID = function () {
    var a = new Date, b = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds(), a.getMilliseconds());
    b += Math.round(Math.random() * 1000000);
    return b
};
ENetwork.DownloadScriptCallback = function (a) {
    if (a) {
        a();
    }
};
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

function fnRequest(strName) {
    var strHref = window.document.location.href;
    var intPos = strHref.indexOf("?");
    var strRight = strHref.substr(intPos + 1);
    var arrTmp = strRight.split("&");
    for (var i = 0; i < arrTmp.length; i++) {
        var arrTemp = arrTmp[i].split("=");
        if (arrTemp[0].toUpperCase() == strName.toUpperCase()) return arrTemp[1];
    }
    return "";
}

function fnPager(iPageGroupNum, iCurrentPage, iPageSize, iPageCount, fn) {
    if (iPageCount < 1) {
        return '';
    }
    var sPagerHtml = '';
    var iCurrentGroupNum = 0, iCurrentPageStart = 0, iCurrentPageEnd = 0; //当前分组， 当前开始页， 当前结束页
    iCurrentGroupNum = Math.floor((iCurrentPage - 1) / iPageGroupNum);  //计算当前分组
    iCurrentPageStart = iCurrentGroupNum * iPageGroupNum + 1;
    if ((iCurrentGroupNum + 1) * iPageGroupNum > iPageCount) {
        iCurrentPageEnd = iPageCount;
    }
    else {
        iCurrentPageEnd = (iCurrentGroupNum + 1) * iPageGroupNum;
    }
    for (var i = iCurrentPageStart; i <= iCurrentPageEnd; i++) {
        if (i == iCurrentPage) {
            sPagerHtml +=i;
        }
        else {
            sPagerHtml += '<a href="javascript:' + fn + '(' + i + ');" style="font-family:宋体">[' + i + ']</a>';
        }
    }
    if (iCurrentGroupNum >= 1) {
        var iPrevGroupPage = iCurrentPageStart - 1;
        sPagerHtml = '<a href="javascript:' + fn + '(' + iPrevGroupPage + ');" tilte="上一组" style="font-family:宋体">…</a>&nbsp;' + sPagerHtml;
    }
    if (iCurrentPageEnd < iPageCount) {
        var iNextGroupPage = iCurrentPageEnd + 1;
        sPagerHtml = sPagerHtml + '&nbsp;<a href="javascript:' + fn + '(' + iNextGroupPage + ');" title="下一组" style="font-family:宋体">…</a>';
    }
    if (iCurrentPage != 1) {
        var iPrevPage = iCurrentPage - 1;
        sPagerHtml = '<a href="javascript:' + fn + '(' + iPrevPage + ');" title="上一页" style="font-family:宋体">&lt;</a>&nbsp;' + sPagerHtml;
    }
    if (iCurrentPage != iPageCount) {
        var iNextPage = iCurrentPage + 1;
        sPagerHtml = sPagerHtml + '&nbsp;<a href="javascript:' + fn + '(' + iNextPage + ');" title="下一页" style="font-family:宋体">&gt;</a>';
    }
    if (iPageCount != 1) {
        if (iCurrentPage == 1) {
            sPagerHtml = sPagerHtml + '&nbsp;<a href="javascript:' + fn + '(' + iPageCount + ');" title="末页" style="font-family:宋体">&gt;&gt;</a>';
        }
        else if (iCurrentPage == iPageCount) {
            sPagerHtml = '<a href="javascript:' + fn + '(1);" title="首页" style="font-family:宋体">&lt;&lt;</a>&nbsp;' + sPagerHtml;
        }
        else {
            sPagerHtml = '<a href="javascript:' + fn + '(1);" title="首页" style="font-family:宋体">&lt;&lt;</a>&nbsp;' + sPagerHtml + '&nbsp;<a href="javascript:' + fn + '(' + iPageCount + ');" title="末页" style="font-family:宋体">&gt;&gt;</a>';
        }
    }
    var sTotalPage = '&nbsp;共{$PageCount}页';
    sPagerHtml = sPagerHtml + sTotalPage.replace('{$PageCount}', iPageCount);
    return sPagerHtml;
}
function int(i, k) {
    return Math.floor((i - 1) / k);
}
String.Format = function () {
    if (arguments.length < 1) return;
    var s = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        s = s.replace(eval('/\\{' + (i - 1) + '\\}/gi'), arguments[i]);
    }
    return s;
};
function ObjectClone(source) {
    var objClone;
    if (source.constructor == Object) {
        objClone = new source.constructor();
    }
    else if (source.constructor == Array) {
        //对空数组的特殊处理
        if (source.length == 0) {
            objClone = new Array();
            return objClone;
        }
        objClone = new source.constructor(source.valueOf());
    }
    else {
        objClone = new source.constructor(source.valueOf());
    }
    for (var key in source) {
        if (objClone[key] != source[key]) {
            if (typeof (source[key]) == 'object') {
                objClone[key] = ObjectClone(source[key]);
            }
            else {
                objClone[key] = source[key];
            }
        }
    }
    objClone.toString = source.toString;
    objClone.valueOf = source.valueOf;
    return objClone;
}