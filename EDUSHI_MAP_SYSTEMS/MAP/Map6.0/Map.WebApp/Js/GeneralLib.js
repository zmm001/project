﻿//1、通过ID得到文档对象引用，多个ID逗号分割得到文档对象数组。
function $() 
{
	var objElements=[];
	for (var i=0;i< arguments.length;i++){
		var objEle = arguments[i];
		if(typeof arguments[i] == 'string'){
			objEle = document.getElementById(arguments[i]);
		}
		objElements.push(objEle);
	}
	if(arguments.length==1){
		return objEle;
	}
	else{
		return objElements;
	}
}
//定义通用类创建对象
var Class = {
	create: function() {
			return function() {
				return this.initialize.apply(this, arguments);//强制类声明时初始化
			}
	}
};
//对象原型扩展
Object.extend = function(destination, source) {
    for(property in source){
        destination[property] = source[property];
    }
    return destination;
};
Function.prototype.bind = function() {
  var __method = this, args = $A(arguments), object = args.shift();
  return function() {
    return __method.apply(object, args.concat($A(arguments)));
  }
};
Function.prototype.bindAsEventListener = function(object) {
  var __method = this, args = $A(arguments), object = args.shift();
  return function(event) {
    return __method.apply(object, [( event || window.event)].concat(args).concat($A(arguments)));
  }
};
var $A = Array.from = function(iterable) {
    if (!iterable) return [];
    if (iterable.toArray) {
        return iterable.toArray();
    }else{
        var results = [];
        for(var i = 0, length = iterable.length; i < length; i++){
            results.push(iterable[i]);
        }
        return results;
    }
};
//3、创建一个超级随机整数字符flg随机数量级
function $Rnd(flg)
{
	var d, s = '';
	if(!flg)flg=100000;
	d = new Date();
	s += d.getHours();
	s += d.getMinutes();
	s += d.getSeconds();
	s += d.getMilliseconds();
	return Math.round(Math.random()*flg).toString()+s.toString();
}
//2、创建一个页面元素tag
function $C(tag)
{
	return document.createElement(tag);
}
//获取选定Radio控件的值
function GetRadioValue(name)
{
    var radioList = document.getElementsByName(name);
    for(var i=0;i<radioList.length;i++){
        if(radioList[i].checked){
            return radioList[i].value;
        }
    }
}

//8、、扩展：去除字符串空格
Object.extend(String.prototype,{
	ltrim:function(){//去除左边空格
		var whitespace = new String(" \t\n\r");
		var s = new String(this);
		if (whitespace.indexOf(s.charAt(0)) != -1)
		{
			var j=0, i = s.length;
			while (j < i && whitespace.indexOf(s.charAt(j)) != -1)
			{
				j++;
			}
			s = s.substring(j, i);
		}
		return s;
	},
	rtrim:function(){//去除右边空格
		var whitespace = new String(" \t\n\r");
		var s = new String(this);
		if (whitespace.indexOf(s.charAt(s.length-1)) != -1){
			var i = s.length - 1;
			while (i >= 0 && whitespace.indexOf(s.charAt(i)) != -1){
				i--;
			}
			s = s.substring(0, i+1);
		}
		return s;	
	},
	trim:function(){//去除两边空格
		var s = new String(this);
		s = s.ltrim().rtrim();
		return s;
	},
	Int:function(){//转成整数
		return parseInt(this);
	},
	Float:function(){//转成浮点数
		return parseFloat(this);
	},
	replaceAll:function (AFindText,ARepText){  
         var raRegExp = new RegExp(AFindText.replace(/([\(\)\[\]\{\}\^\$\+\-\*\?\.\"\'\|\/\\])/g,"\\$1"),"ig");
         return this.replace(raRegExp,ARepText);  
    }
});
//弹窗显示
function fnShowMessageBox(sTitle, sMsg)
{
	var h=fnGetWindowHeight();
	var w=fnGetWindowWidth();
	
	if(!$('divDialogBg'))
	{
        var div = $C('div');
        div.id = 'divDialogBg';
        div.style.backgroundColor = 'black';
        div.style.position = 'absolute';
        div.style.filter = 'alpha(opacity=50)';
        div.style.opacity = '.50';
        div.style.zIndex = 100001;
        div.style.left = 0;
        div.style.top = 0;
        div.style.width = w+'px';
        div.style.height= h+'px';
        document.body.appendChild(div);
             
	}
	if(!$('divDialog'))
    {
        var divBox = $C('div');
        divBox.id = 'divDialog';
        divBox.style.left = (w/2 -150)+'px';
        divBox.style.top = (h/2 -60)+'px';
        divBox.style.position = 'absolute';
        divBox.style.zIndex = 100002;	
        divBox.style.width = '300px';
        divBox.style.height= '120px';
        var boxHtml = '<div style="background:url(/Images/ClewBg1.gif) no-repeat left top;width:280px; height:110px; padding:5px 10px;text-align:left;position:relative;overflow:hidden;"><h3 id="divDialogTitle" style="font-size:14px;font-weight:bold;padding:0 0 0 16px;margin:0 0 3px;height:23px;line-height:23px; background:url(/Images/CommonArrow1.gif) no-repeat left 5px;"></h3><div style="padding:5px 15px 5px 20px;line-height:150%;text-align:left;" id="divDialogMsg"></div><div style="padding:3px 0; text-align:center;"><input type="image" title="确定" src="/Images/TagBtn.gif" onclick="$(\'divDialogBg\').style.display=\'none\';$(\'divDialog\').style.display=\'none\';" /></div><div style="position:absolute; top:8px; right:8px; cursor:hand; width:13px;height:13px; overflow:hidden;background:url(/Images/CloseBtn.gif) no-repeat left top;" onclick="javascript:$(\'divDialogBg\').style.display=\'none\';$(\'divDialog\').style.display=\'none\';" onmouseover="this.style.backgroundPosition=\'left -13px\'"onmouseout="this.style.backgroundPosition=\'left top\'" title="关闭窗口"></div></div>';
        document.body.appendChild(divBox);        	
        setTimeout(function(){divBox.innerHTML = boxHtml;}, 2);
    }
    setTimeout(function(){
        $('divDialogBg').style.display = 'block';
        $('divDialog').style.display = 'block';
        $('divDialogTitle').innerHTML = sTitle;
        $('divDialogMsg').innerHTML = sMsg;
    }, 10); //延时解决IE6下图片有时不能加载的BUG    
}
//通用复制方法
function fnCopyToClipboard(txt,msg){
     if(window.clipboardData){
             window.clipboardData.clearData();
             window.clipboardData.setData("Text", txt);
     } else if(navigator.userAgent.indexOf("Opera") != -1) {
          window.location = txt;
     } else if (window.netscape){
          try {
               netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
          } catch (e) {
               alert("您的浏览器未开启复制功能！\n请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'");
               return false;
          }
          var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
          if (!clip){
               return;
          }
          var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
          if (!trans){
               return;
          }
          trans.addDataFlavor('text/unicode');
          var str = new Object();
          var len = new Object();
          var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
          var copytext = txt;
          str.data = copytext;
          trans.setTransferData("text/unicode",str,copytext.length*2);
          var clipid = Components.interfaces.nsIClipboard;
          if (!clip){
               return false;
          }
          clip.setData(trans,null,clipid.kGlobalClipboard);
     }
     else{
        alert('您的浏览器不支持拷贝功能。');
        return false;
     }
     if(msg!=null&&msg!=''){
        fnShowMessageBox('复制到粘贴板',msg);
     }
     return true;
}
function fnRequest(strName){
	var strHref = window.document.location.href;
	var intPos = strHref.indexOf("?");
	var strRight = strHref.substr(intPos + 1);
	var arrTmp = strRight.split("&");
	for(var i = 0; i < arrTmp.length; i++){
		var arrTemp = arrTmp[i].split("=");
		if(arrTemp[0].toUpperCase() == strName.toUpperCase()) return arrTemp[1];
	}
	return "";
}
function fnReadSign(strSign,strContent)
{
   var r, re;
   re = new RegExp('<!--' + strSign + '-->.*<!--/' + strSign + '-->','i');
   r = strContent.match(re);
   return(r.toString());
}
function int(i,k){ 
    return Math.floor((i-1)/k);
}
function fnPager(iPageGroupNum, iCurrentPage, iPageSize, iPageCount, fn){
    if(iPageCount < 1)
    {
        return '';
    }
    var sPagerHtml = '';    
    var iCurrentGroupNum=0, iCurrentPageStart=0, iCurrentPageEnd=0; //当前分组， 当前开始页， 当前结束页
    iCurrentGroupNum = Math.floor((iCurrentPage-1)/iPageGroupNum);  //计算当前分组
    iCurrentPageStart = iCurrentGroupNum*iPageGroupNum+1;
    if((iCurrentGroupNum+1)*iPageGroupNum > iPageCount){
        iCurrentPageEnd = iPageCount;
    }
    else{
        iCurrentPageEnd = (iCurrentGroupNum+1)*iPageGroupNum;
    }
    for(var i=iCurrentPageStart; i<=iCurrentPageEnd; i++){
        if(i == iCurrentPage){
            sPagerHtml += i+' ';
        }
        else{
            sPagerHtml += '<a href="javascript:'+fn+'('+i+');" style="font-family:宋体">['+i+']</a> ';
        }
    }
    if(iCurrentGroupNum >= 1){
        var iPrevGroupPage = iCurrentPageStart-1;
        sPagerHtml = '&nbsp;<a href="javascript:'+fn+'('+iPrevGroupPage+');" tilte="上一组" style="font-family:宋体">…</a>&nbsp;&nbsp;'+ sPagerHtml;
    }
    if(iCurrentPageEnd < iPageCount){
        var iNextGroupPage = iCurrentPageEnd + 1;
        sPagerHtml = sPagerHtml+'&nbsp;<a href="javascript:'+fn+'('+iNextGroupPage +');" title="下一组" style="font-family:宋体">…</a>&nbsp; ';
    }
    if(iCurrentPage != 1){
        var iPrevPage = iCurrentPage - 1;
        sPagerHtml = '&nbsp;<a href="javascript:'+fn+'('+iPrevPage+');" title="上一页" style="font-family:宋体">&lt;</a>&nbsp;'+sPagerHtml;
    }
    if(iCurrentPage != iPageCount){
        var iNextPage = iCurrentPage + 1;
        sPagerHtml = sPagerHtml+'<a href="javascript:'+fn+'('+iNextPage+');" title="下一页" style="font-family:宋体">&gt;</a>&nbsp;';
    }
    if(iPageCount != 1){
        if(iCurrentPage == 1){
            sPagerHtml = sPagerHtml+'&nbsp;<a href="javascript:'+fn+'('+iPageCount+');" title="末页" style="font-family:宋体">&gt;&gt;</a>';
        }
        else if(iCurrentPage == iPageCount){
            sPagerHtml = '<a href="javascript:'+fn+'(1);" title="首页" style="font-family:宋体">&lt;&lt;</a>&nbsp;'+sPagerHtml;
        }
        else{    
            sPagerHtml = '<a href="javascript:'+fn+'(1);" title="首页" style="font-family:宋体">&lt;&lt;</a>&nbsp;'+sPagerHtml+'&nbsp;<a href="javascript:'+fn+'('+iPageCount+');" title="末页" style="font-family:宋体">&gt;&gt;</a>';
        }
    }
    var sTotalPage = '&nbsp;共{$PageCount}页';
    sPagerHtml = sPagerHtml+ sTotalPage.replace('{$PageCount}', iPageCount);
    return sPagerHtml;
}
function fnGetWindowWidth(){
	var vw = 0;
	var _dEt = document.documentElement;
	var _dBy = document.body;
	if(typeof window.innerWidth=='number'){
	    vw = window.innerWidth;
	}
	else{
		if(_dEt&&_dEt.clientWidth){
		    vw = _dEt.clientWidth;
		}
		else{
			if(_dBy&&_dBy.clientWidth)vw = _dBy.clientWidth;
		}
	}
	if(!vw||vw<100){
	    vw = 100;
	}
	return vw;
}
function fnGetWindowHeight(){
	var vh = 0;
	var _dEt = document.documentElement;
	var _dBy = document.body;
	if(typeof window.innerHeight=='number'){
	    vh = window.innerHeight;
	}
	else{
		if(_dEt&&_dEt.clientHeight){
		    vh = _dEt.clientHeight;
		}
		else{
			if(_dBy&&_dBy.clientHeight)vh = _dBy.clientHeight;
		}
	}
	if(!vh||vh<100){
	    vh = 100;
	}
	return vh;
}
function ENetwork(){};
ENetwork.GetExecutionID = function()
{
    var a = new Date, b = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(),a.getHours(), a.getMinutes(), a.getSeconds(), a.getMilliseconds());
    b += Math.round(Math.random() * 1000000);
    return b
};
ENetwork.DownloadScriptCallback = function(a)
{
    if (a){
        a();
    }
};
ENetwork.DownloadScript = function(a, b, c)
{
    try{        
        if (a == null || a == "undefined" || a.length == 0){
            throw new ENetworkException("ENetwork:DownloadScript", "err_noscripturl",l24ht);
        }
        var elScript = document.createElement("script");
        elScript.type = "text/javascript";
        elScript.language = "javascript";
        elScript.id = typeof(c) == "undefined" ? ENetwork.GetExecutionID() : c;
        elScript.src = a;        
        if(document.getElementById(c)){
            ENetwork.GetAttachTarget().removeChild(document.getElementById(c));
        }
        ENetwork.GetAttachTarget().appendChild(elScript);
        if (navigator.userAgent.indexOf("IE") >= 0){
            elScript.onreadystatechange = function(){
                if (elScript && ("loaded" == elScript.readyState || "complete" == elScript.readyState)){
                    elScript.onreadystatechange = null;
                    ENetwork.DownloadScriptCallback(b);                    
                }
            }
        }
        else{
            elScript.onload = function(){
                elScript.onload = null;
                ENetwork.DownloadScriptCallback(b);
            }
        }        
        return elScript.id;
    }
    catch (e){
        alert('加载失败！');
    }
};
ENetwork.GetAttachTarget = function()
{
    if (document.getElementsByTagName("head")[0] != null){
        return document.getElementsByTagName("head")[0];
    }
    else{
        throw new ENetworkException("ENetwork:cstr", "err_noheadelement", l611ft);
    }
};
function ENetworkException(b, c, a)
{
    this.source = b;
    this.name = c;
    this.message = a;
}
ENetworkException.prototype.Name = this.name;
ENetworkException.prototype.Source = this.source;
ENetworkException.prototype.Message = this.message;

//Cookie操作类
function CookieHelper() {}
CookieHelper.prototype.expires ='';
CookieHelper.prototype.path    ='';
CookieHelper.prototype.domain  ='';
CookieHelper.prototype.secure  ='';
//get Cookie value
CookieHelper.prototype.getCookie = function(sCookieName){
    var sName=sCookieName+"=", ichSt, ichEnd;
    var sCookie=document.cookie;
    if ( sCookie.length && ( -1 != (ichSt = sCookie.indexOf(sName)) ) ){
        if (-1 == ( ichEnd = sCookie.indexOf(";",ichSt+sName.length))){
            ichEnd = sCookie.length;
        }
        return unescape(sCookie.substring(ichSt+sName.length,ichEnd));
    }
    return null;
};
//set Cookie value
CookieHelper.prototype.setCookie = function(sCookieName,sCookieValue,dCookieExpires){
    var argv = this.setCookie.arguments, argc = this.setCookie.arguments.length;
    var sExpDate = (argc > 2) ? "; expires="+argv[2].toGMTString() : "";
    var sPath = (argc > 3) ? "; path="+argv[3] : "";
    var sDomain = (argc > 4) ? "; domain="+argv[4] : "";
    var sSecure = (argc > 5) && argv[5] ? "; secure" : "";
    document.cookie = sCookieName + "=" + escape(sCookieValue,0) + sExpDate + sPath + sDomain + sSecure + ";";
};

function Marquee() {
    this.ID = document.getElementById(arguments[0]);
    if (!this.ID) {
        alert("您要设置的\"" + arguments[0] + "\"初始化错误\r\n请检查标签ID设置是否正确!");
        this.ID = -1;
        return;
    }
    this.Direction = this.Width = this.Height = this.DelayTime = this.WaitTime = this.CTL = this.StartID = this.Stop = this.MouseOver = 0;
    this.Step = 1;
    this.Timer = 30;
    this.DirectionArray = { "top": 0, "up": 0, "bottom": 1, "down": 1, "left": 2, "right": 3 };
    if (typeof arguments[1] == "number" || typeof arguments[1] == "string") this.Direction = arguments[1];
    if (typeof arguments[2] == "number") this.Step = arguments[2];
    if (typeof arguments[3] == "number") this.Width = arguments[3];
    if (typeof arguments[4] == "number") this.Height = arguments[4];
    if (typeof arguments[5] == "number") this.Timer = arguments[5];
    if (typeof arguments[6] == "number") this.DelayTime = arguments[6];
    if (typeof arguments[7] == "number") this.WaitTime = arguments[7];
    if (typeof arguments[8] == "number") this.ScrollStep = arguments[8];
    this.ID.style.overflow = this.ID.style.overflowX = this.ID.style.overflowY = "hidden";
    this.ID.noWrap = true;
    this.IsNotOpera = (navigator.userAgent.toLowerCase().indexOf("opera") == -1);
    if (arguments.length >= 7) this.Start();
}

Marquee.prototype.Start = function() {
    if (this.ID == -1) return;
    if (this.WaitTime < 800) this.WaitTime = 800;
    if (this.Timer < 20) this.Timer = 20;
    if (this.Width == 0) this.Width = parseInt(this.ID.style.width);
    if (this.Height == 0) this.Height = parseInt(this.ID.style.height);
    if (typeof this.Direction == "string") this.Direction = this.DirectionArray[this.Direction.toString().toLowerCase()];
    this.HalfWidth = Math.round(this.Width / 2);
    this.HalfHeight = Math.round(this.Height / 2);
    this.BakStep = this.Step;
    this.ID.style.width = this.Width + "px";
    this.ID.style.height = this.Height + "px";
    if (typeof this.ScrollStep != "number") this.ScrollStep = this.Direction > 1 ? this.Width : this.Height;
    var templateLeft = "<table cellspacing='0' cellpadding='0' style='border-collapse:collapse;display:inline;'><tr><td noWrap=true style='white-space: nowrap;word-break:keep-all;'>MSCLASS_TEMP_HTML</td><td noWrap=true style='white-space: nowrap;word-break:keep-all;'>MSCLASS_TEMP_HTML</td></tr></table>";
    var templateTop = "<table cellspacing='0' cellpadding='0' style='border-collapse:collapse;'><tr><td>MSCLASS_TEMP_HTML</td></tr><tr><td>MSCLASS_TEMP_HTML</td></tr></table>";
    var msobj = this;
    msobj.tempHTML = msobj.ID.innerHTML;
    if (msobj.Direction <= 1) {
        msobj.ID.innerHTML = templateTop.replace(/MSCLASS_TEMP_HTML/g, msobj.ID.innerHTML);
    }
    else {
        if (msobj.ScrollStep == 0 && msobj.DelayTime == 0) {
            msobj.ID.innerHTML += msobj.ID.innerHTML;
        }
        else {
            msobj.ID.innerHTML = templateLeft.replace(/MSCLASS_TEMP_HTML/g, msobj.ID.innerHTML);
        }
    }
    var timer = this.Timer;
    var delaytime = this.DelayTime;
    var waittime = this.WaitTime;
    msobj.StartID = function() { msobj.Scroll() };
    msobj.Continue = function() {
        if (msobj.MouseOver == 1) {
            setTimeout(msobj.Continue, delaytime);
        }
        else {
            clearInterval(msobj.TimerID);
            msobj.CTL = msobj.Stop = 0;
            msobj.TimerID = setInterval(msobj.StartID, timer);
        }
    };

    msobj.Pause = function() {
        msobj.Stop = 1;
        clearInterval(msobj.TimerID);
        setTimeout(msobj.Continue, delaytime);
    };

    msobj.Begin = function() {
        msobj.ClientScroll = msobj.Direction > 1 ? msobj.ID.scrollWidth / 2 : msobj.ID.scrollHeight / 2;
        if ((msobj.Direction <= 1 && msobj.ClientScroll <= msobj.Height + msobj.Step) || (msobj.Direction > 1 && msobj.ClientScroll <= msobj.Width + msobj.Step)) {
            msobj.ID.innerHTML = msobj.tempHTML;
            delete (msobj.tempHTML);
            return;
        }
        delete (msobj.tempHTML);
        msobj.TimerID = setInterval(msobj.StartID, timer);
        if (msobj.ScrollStep < 0) return;
        msobj.ID.onmousemove = function(event) {
            if (msobj.ScrollStep == 0 && msobj.Direction > 1) {
                var event = event || window.event;
                if (window.event) {
                    if (msobj.IsNotOpera) {
                        msobj.EventLeft = event.srcElement.id == msobj.ID.id ? event.offsetX - msobj.ID.scrollLeft : event.srcElement.offsetLeft - msobj.ID.scrollLeft + event.offsetX;
                    }
                    else {
                        msobj.ScrollStep = null;
                        return;
                    }
                }
                else {
                    msobj.EventLeft = event.layerX - msobj.ID.scrollLeft;
                }
                msobj.Direction = msobj.EventLeft > msobj.HalfWidth ? 3 : 2;
                msobj.AbsCenter = Math.abs(msobj.HalfWidth - msobj.EventLeft);
                msobj.Step = Math.round(msobj.AbsCenter * (msobj.BakStep * 2) / msobj.HalfWidth);
            }
        };
        msobj.ID.onmouseover = function() {
            if (msobj.ScrollStep == 0) { return; }
            msobj.MouseOver = 1;
            clearInterval(msobj.TimerID);
        };
        msobj.ID.onmouseout = function() {
            if (msobj.ScrollStep == 0) {
                if (msobj.Step == 0) msobj.Step = 1;
                return;
            }
            msobj.MouseOver = 0;
            if (msobj.Stop == 0) {
                clearInterval(msobj.TimerID);
                msobj.TimerID = setInterval(msobj.StartID, timer);
            }
        };
    };
    setTimeout(msobj.Begin, waittime);
};

Marquee.prototype.Scroll = function() {
    switch (this.Direction) {
        case 0:
            this.CTL += this.Step;
            if (this.CTL >= this.ScrollStep && this.DelayTime > 0) {
                this.ID.scrollTop += this.ScrollStep + this.Step - this.CTL;
                this.Pause();
                return;
            }
            else {
                if (this.ID.scrollTop >= this.ClientScroll) {
                    this.ID.scrollTop -= this.ClientScroll;
                }
                this.ID.scrollTop += this.Step;
            }
            break;

        case 1:
            this.CTL += this.Step;
            if (this.CTL >= this.ScrollStep && this.DelayTime > 0) {
                this.ID.scrollTop -= this.ScrollStep + this.Step - this.CTL;
                this.Pause();
                return;
            }
            else {
                if (this.ID.scrollTop <= 0) {
                    this.ID.scrollTop += this.ClientScroll;
                }
                this.ID.scrollTop -= this.Step;
            }
            break;

        case 2:
            this.CTL += this.Step;
            if (this.CTL >= this.ScrollStep && this.DelayTime > 0) {
                this.ID.scrollLeft += this.ScrollStep + this.Step - this.CTL;
                this.Pause();
                return;
            }
            else {
                if (this.ID.scrollLeft >= this.ClientScroll) {
                    this.ID.scrollLeft -= this.ClientScroll;
                }
                this.ID.scrollLeft += this.Step;
            }
            break;

        case 3:
            this.CTL += this.Step;
            if (this.CTL >= this.ScrollStep && this.DelayTime > 0) {
                this.ID.scrollLeft -= this.ScrollStep + this.Step - this.CTL;
                this.Pause();
                return;
            }
            else {
                if (this.ID.scrollLeft <= 0) {
                    this.ID.scrollLeft += this.ClientScroll;
                }
                this.ID.scrollLeft -= this.Step;
            }
            break;
    }
};

function Suggest(x, y, w, c)
{
    //@公有方法
    this.Show = function(wordList, x, y, w)
    {
        this.SelectedIndex  = -1;
        this.WordList = wordList;
        if (wordList.length < 1)
        {
            this.Hide();
            return;
        }
        this.SuggestPannel.style.display = 'block';
        this.SuggestPannel.style.right = x + 'px';
        this.SuggestPannel.style.top = y + 'px';
        this.SuggestPannel.style.width = w + 'px';
        this._loadData();
    };
    this.Hide = function()
    {
        this.SuggestPannel.style.display = 'none';
    };
    this.KeycodeChange = function(keyCode) {
        if (keyCode == 38) //up
        {
            if (this.SelectedIndex > 0) {
                this.SelectedIndex--;
            }
            else {
                this.SelectedIndex = this.WordList.length - 1;
            }
            this._selectItem();
        }
        else if (keyCode == 40) //down
        {
            if (this.SelectedIndex < this.WordList.length - 1) {
                this.SelectedIndex++;
            }
            else {
                this.SelectedIndex = 0;
            }
            this._selectItem();
        }
        else if (keyCode == 9) {
            this.Hide();
        }
        else if (keyCode == 13) {
            if (this.SelectedIndex > -1 && this.WordList.length > 0) {
                this.SelectedIndexChanged(this.WordList[this.SelectedIndex]);
            }
            this.Hide();
        }
    };
    
    //@属性
    this.LastKeyword = '';
    this.SuggestPannel;
    this.SelectedIndex = -1;
    this.WordList = [];
    this.Width = 200;
    
    //@事件
    this.SelectedIndexChanged = function(item){};
        
    //@构造
    (function()
    {
        //创建suggest面板
        this.Width = w;
        this.SuggestPannel = document.createElement('div');
        this.SuggestPannel.style.cssText = 'width:' + w + 'px; height:auto;text-align:left; border:solid 1px #0075B0;overflow:hidden; position:absolute; z-index:99999; top:' + y + 'px; right:' + x + 'px; background-color:#fff;';
        if (typeof c == 'undefined') c = document.body;
        c.appendChild(this.SuggestPannel);    
        
        this.SuggestPannel.CloseButton = document.createElement('div');
        this.SuggestPannel.CloseButton.style.cssText = 'text-align:right; padding:3px; cursor:pointer; color:#369;';
        this.SuggestPannel.CloseButton.innerHTML = '关闭';
        
        this.SuggestPannel.WordList = document.createElement('ul');
        this.SuggestPannel.WordList.style.padding = '0 3px';
        this.SuggestPannel.WordList.style.margin = '0px';
        this.SuggestPannel.WordList.style.listStyleType = 'none';
        this.SuggestPannel.appendChild(this.SuggestPannel.WordList);
        this.SuggestPannel.appendChild(this.SuggestPannel.CloseButton);         
        
        //绑定事件
        var suggest = this;
        this.SuggestPannel.CloseButton.onclick = function()
        {
            suggest.Hide();
        };
        this.Hide();    
    }).call(this);
    
    //@私有方法
    this._selectItem = function()
    {
        if (this.WordList.length > 0)
        {
            for (var i=0; i<this.WordList.length; i++)
            {
                if (i == this.SelectedIndex)
                {
                    this.SuggestPannel.WordList.childNodes[i].style.cssText = 'cursor:default; white-space:nowrap;overflow:hidden; background-color: #3366CC; color:#fff;';
                }
                else
                {
                    this.SuggestPannel.WordList.childNodes[i].style.cssText = 'cursor:default; white-space:nowrap;overflow:hidden;';
                }
            }
            //this.SelectedIndexChanged(this.WordList[this.SelectedIndex]);
        }
    };
    
    this._loadData = function()
    {
        var suggest = this;
        this.SuggestPannel.WordList.innerHTML = '';
        for (var i=0; i<this.WordList.length; i++)
        {
            var li = document.createElement('li');
            li.style.cssText = 'width:100%;cursor:default; white-space:nowrap;overflow:hidden';
            var span = document.createElement('span');
            span.innerHTML = this.WordList[i].Title;
            span.title = this.WordList[i].Title;
            li.appendChild(span);
            li.itemIndex = i;
            li.onmouseover = function(){
                suggest.SelectedIndex = this.itemIndex;
                suggest._selectItem();
            };
            li.onclick = function(){
                suggest.SelectedIndexChanged(suggest.WordList[this.itemIndex]);
                suggest.Hide();
            };
            this.SuggestPannel.WordList.appendChild(li);
        }
    };
}