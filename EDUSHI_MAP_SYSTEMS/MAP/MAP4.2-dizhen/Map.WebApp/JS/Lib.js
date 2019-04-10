var Aladdincn;
if (!Aladdincn)
Aladdincn = {};
if (!Aladdincn.Web)
Aladdincn.Web = {};
Aladdincn.Web.Animation = 
{
    "AccelerationFunction": function(cr)
    {
        var self = this;
        var m_nTotal =  - 1;
        var m_nSteps =  - 1;
        var m_pFn = cr;
        this.setSteps = function(er){
            m_nSteps = er;
            hr();
        };
        this.getValue = function(gr){
            return m_pFn(gr) / m_nTotal;
        };
        function hr(){
            m_nTotal = 0;
            for (var i = 0; i < m_nSteps; i++){
                m_nTotal += m_pFn(i / m_nSteps);
            }
        }
    }
    , "Movie": function(jr, kr){
        var self = this;
        this.Repeat = true;
        this.AppendContent = true;
        var m_frames = new Array();
        var m_counter =  - 1;
        var m_intervalId = null;
        this.addFrame = function(lr, mr){
            if (mr == null)
                mr = true;
            var f = {
                "data": lr, "append": mr
            };
            m_frames.push(f);
        };
        this.start = function()
        {
            self.stop();
            self.show();
            self.clear();
            m_counter =  - 1;
            m_intervalId = setInterval(nr, kr);
        };
        this.stop = function()
        {
            if (m_intervalId)
                clearInterval(m_intervalId);
        };
        this.show = function()
        {
            jr.style.visibility = "visible";
        };
        this.hide = function()
        {
            jr.style.visibility = "hidden";
        };
        this.clear = function()
        {
            jr.innerHTML = "";
        };
        function nr()
        {
            m_counter++;
            if (m_counter > m_frames.length - 1)
            {
                m_counter = 0;
                if (!self.Repeat)
                {
                    clearInterval(m_intervalId);
                    return ;
                }
                else
                    self.clear();
            }
            var f = m_frames[m_counter];
            if (f.append)
                jr.innerHTML += f.data;
            else
                jr.innerHTML = f.data;
        }
    }
    , "RollDirection": 
    {
        "TopDown": 0, "RightLeft": 1, "BottomUp": 2, "LeftRight": 3, "Count": 4
    }
    , "RollStyle": 
    {
        "In": 0, "Out": 1
    }
    , "Roller": function(or, pr)
    {
        var self = this;
        var css = Aladdincn.Web.Css;
        var ani = Aladdincn.Web.Animation;
        var m_elem = or;
        var m_pals = null;
        var m_isExpanded = true;
        this.LeaveAmount = typeof pr == "number" ? pr : 10;
        this.AccFunction = null;
        this.Factor = null;
        this.onbeforerollin = null;
        this.onafterrollin = null;
        this.onbeforerollout = null;
        this.onafterrollout = null;
        this.isExpanded = function()
        {
            return m_isExpanded;
        };
        this.associate = function(qr)
        {
            m_pals = qr;
        };
        this.rollIn = function(rr)
        {
            Br(m_elem);
            tr(ani.RollStyle.In, rr);
            m_isExpanded = false;
        };
        this.rollOut = function(sr)
        {
            Fr(m_elem);
            tr(ani.RollStyle.Out, sr);
            m_isExpanded = true;
        };
        function tr(ur, vr)
        {
            if (!self.AccFunction)
                self.AccFunction = AccelerationFunctions.ExponentialAcc;
            if (!self.Factor)
                self.Factor = 15;
            var size;
            if (vr == ani.RollDirection.TopDown || vr ==
                ani.RollDirection.BottomUp)
                size = m_elem.offsetHeight;
            else
                size = m_elem.offsetWidth;
            var rollDistance = size - self.LeaveAmount;
            if (vr == ani.RollDirection.TopDown || vr ==
                ani.RollDirection.LeftRight)
            {
                size = 0;
                if (ur == ani.RollStyle.Out)
                    size = self.LeaveAmount;
            }
            else
            {
                if (ur == ani.RollStyle.Out)
                    size -= self.LeaveAmount;
            }
            var steps = Math.ceil(rollDistance / 10);
            if (steps < 50)
                steps = 50;
            self.AccFunction.setSteps(steps);
            for (var i = 1; i <= steps; i++)
            {
                var percentComplete = i / steps;
                setTimeout(wr(percentComplete), i * self.Factor);
            }
            function wr(xr)
            {
                return function()
                {
                    var fnX = self.AccFunction.getValue(xr) * rollDistance;
                    if (vr == ani.RollDirection.TopDown || vr ==
                        ani.RollDirection.LeftRight)
                        size += fnX;
                    else
                        size -= fnX;
                    var dir = vr;
                    if (ur == ani.RollStyle.Out)
                        dir = (vr + ani.RollDirection.Count / 2) %
                            ani.RollDirection.Count;
                    var clip = yr(dir, size);
                    m_elem.style.clip = clip;
                    if (m_pals)
                    for (var i = 0; i < m_pals.length; i++)
                    {
                        m_pals[i].style.left = size + "px";
                    }
                    if (xr == 1)
                    {
                        if (ur == ani.RollStyle.In)
                            Dr(m_elem);
                        else
                        {

                            m_elem.style.clip = "rect(auto auto auto auto)";
                            Hr(m_elem);
                        }
                    }
                };
            }
        }
        function yr(zr, Ar)
        {
            var topClip;
            var rightClip;
            var bottomClip;
            var leftClip;
            topClip = rightClip = bottomClip = leftClip = css.Units.Auto;
            var sizeClip = parseInt(Math.round(Ar)) + css.Units.Pixels;
            switch (zr)
            {
                case ani.RollDirection.TopDown:
                    topClip = sizeClip;
                    break;
                case ani.RollDirection.RightLeft:
                    rightClip = sizeClip;
                    break;
                case ani.RollDirection.BottomUp:
                    bottomClip = sizeClip;
                    break;
                case ani.RollDirection.LeftRight:
                    leftClip = sizeClip;
                    break;
            }
            var clip = "rect(" + topClip + " " + rightClip + " " + bottomClip +
                " " + leftClip + ")";
            return clip;
        }
        function Br(Cr)
        {
            if (self.onbeforerollin)
                self.onbeforerollin(Cr);
        }
        function Dr(Er)
        {
            if (self.onafterrollin)
                self.onafterrollin(Er);
        }
        function Fr(Gr)
        {
            if (self.onbeforerollout)
                self.onbeforerollout(Gr);
        }
        function Hr(Ir)
        {
            if (self.onafterrollout)
                self.onafterrollout(Ir);
        }
    }
    , "Slider": function(Jr)
    {
        var self = this;
        //var geo = Microsoft.Web.Geometry;
        var m_elem = Jr;
        var m_displacement = 0;
        var m_currentX;
        this.EasingFunction = null;
        this.Factor = null;
        this.slideToPoint = function(Kr)
        {
            if (!self.AccFunction)
                self.AccFunction = AccelerationFunctions.Linear;
            if (!self.Factor)
                self.Factor = 10;
            var startPoint = geo.Functions.getElementPosition(m_elem);
            var currentX = startPoint.x;
            var currentY = startPoint.y;
            var m = geo.Functions.getSlope(startPoint, Kr);
            var b = geo.Functions.getYIntercept(m, Kr);
            var distance = Math.abs(startPoint.x - Kr.x);
            var steps = Math.ceil(distance / 10);
            if (steps < 50)
                steps = 50;
            self.AccFunction.setSteps(steps);
            for (var i = 0; i < steps; i++)
            {
                var percentComplete = i / steps;
                setTimeout(Lr(percentComplete), i * self.Factor);
            }
            function Lr(Mr)
            {
                return function()
                {
                    if (Kr.x > startPoint.x)
                        currentX += self.AccFunction.getValue(Mr) * distance;
                    else
                        currentX -= self.AccFunction.getValue(Mr) * distance;
                    var currentY = m * currentX + b;
                    m_elem.style.left = parseFloat(Math.round(currentX)) + "px";
                    m_elem.style.top = parseFloat(Math.round(currentY)) + "px";
                };
            }
        };
    }
};
//------------------------------------------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------加速度函数--------------------------------------------------------------------------------
var AccelerationFunctions = 
{
    "Linear": new Aladdincn.Web.Animation.AccelerationFunction(function(Nr)
    {
        return 1; 
    }
    ), "ExponentialAcc": new Aladdincn.Web.Animation.AccelerationFunction
        (function(Or)
    {
        var lower = 0; var upper = 1; var range = upper - lower; var x = lower 
            + Or * range; var fnX = Math.pow(x, 2); return fnX; 
    }
    ), "ExponentialDec": new Aladdincn.Web.Animation.AccelerationFunction
        (function(Pr)
    {
        var lower =  - 1; var upper = 0; var range = upper - lower; var x =
            lower + Pr * range; var fnX = Math.pow(x, 2); return fnX; 
    }
    ), "CosineWave": new Aladdincn.Web.Animation.AccelerationFunction(function
        (Qr)
    {
        var lower =  - Math.PI; var upper = Math.PI; var range = upper - lower;
            var x = lower + Qr * range; var fnX = Math.cos(x) + 1; return fnX; 
    }
    ), "CrazyElevator": new Aladdincn.Web.Animation.AccelerationFunction
        (function(Rr)
    {
        var lower =  - 5; var upper = 5; var range = upper - lower; var x =
            lower + Rr * range; var fnX = 2 / (Math.pow(Math.abs(x), 3) + 1);
            return fnX; 
    }
    )
};
//------------------------------------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------Aladdincn.Web.Css----------------------------------------------------------------------
var Aladdincn;
if (!Aladdincn)
Aladdincn = {};
if (!Aladdincn.Web)
Aladdincn.Web = {};
Aladdincn.Web.Css = 
{
    "Style": 
    {
        "Height": 0, "Width": 1, "Top": 2, "Left": 3, "Bottom": 4, "Right": 5, 
            "Position": 6, "Margin": 7, "Padding": 8, "Display": 9, 
            "Visibility": 10
    }
    , "Units": 
    {
        "Auto": "auto", "Pixels": "px", "Points": "pt", "Ems": "em", 
            "Percentage": "%"
    }
    , "Position": 
    {
        "Static": "static", "Relative": "relative", "Absolute": "absolute"
    }
    , "Display": 
    {
        "None": "none", "Block": "block", "Table": "table", "Inline": "inline"
    }
    , "Visibility": 
    {
        "Visible": "visible", "Hidden": "hidden"
    }
    , "Cursors": 
    {
        "Auto": "auto", "Default": "default", "Crosshair": "crosshair", 
            "Pointer": "pointer", "Move": "move", "Wait": "wait", "Text": 
            "text", "Help": "help", "NResize": "n-resize", "NEResize": 
            "ne-resize", "NWResize": "nw-resize", "SResize": "s-resize", 
            "SEResize": "se-resize", "SWResize": "sw-resize", "EResize": 
            "e-resize", "WResize": "w-resize"
    }
};
//------------------------------------------------------------------------------------------------------------------------------------------------------------

function ENetwork(){}
ENetwork.GetExecutionID = function()
{
    var a = new Date, b = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(),
        a.getHours(), a.getMinutes(), a.getSeconds(), a.getMilliseconds());
    b += Math.round(Math.random() * 1000000);
    return b
};
ENetwork.DownloadScriptCallback = function(a)
{
    if (a)
    a()
};
ENetwork.DownloadScript = function(a, b, c)
{
    try
    {
        if (a == null || a == "undefined" || a.length == 0)
            throw new EException("ENetwork:DownloadScript", "err_noscripturl",
                l24ht);
        var elScript = document.createElement("script");
        elScript.type = "text/javascript";
        elScript.language = "javascript";
        elScript.id = typeof(c) == "undefined" ? ENetwork.GetExecutionID() : c;
        elScript.src = a;
        if (navigator.userAgent.indexOf("IE") >= 0)
        elScript.onreadystatechange = function()
        {
            if (elScript && ("loaded" == elScript.readyState || "complete" ==
                elScript.readyState))
            {
                elScript.onreadystatechange = null;
                ENetwork.DownloadScriptCallback(b)
            }
        };
        else
        elScript.onload = function()
        {
            elScript.onload = null;
            ENetwork.DownloadScriptCallback(b)
        };
        if(document.getElementById(c))
            ENetwork.GetAttachTarget().removeChild(document.getElementById(c));
            
        ENetwork.GetAttachTarget().appendChild(elScript);
        return elScript.id
    }
    catch (e)
    {
        alert('加载失败！');
    }
};
ENetwork.AttachStyleSheetCallback = function(a)
{
    if (a)
    a()
};
ENetwork.AttachStyleSheet = function(a, b, d, c)
{
    if (a == null || a == "undefined" || a.length == 0)
        throw new EException("ENetwork:AttachStylesheet", "err_nostylesurl", 
            "");
    var elStyle = document.createElement("link");
    if (d == true)
        elStyle.rel = "alternate stylesheet";
    else
        elStyle.rel = "stylesheet";
    if (c)
        elStyle.media = c;
    elStyle.type = "text/css";
    elStyle.rev = "stylesheet";
    elStyle.id = ENetwork.GetExecutionID();
    elStyle.href = a;
    ENetwork.GetAttachTarget().appendChild(elStyle);
    if (navigator.userAgent.indexOf("IE") >= 0)
    elStyle.onreadystatechange = function()
    {
        if (elStyle && ("loaded" == elStyle.readyState || "complete" ==
            elStyle.readyState))
        {
            elStyle.onreadystatechange = null;
            ENetwork.AttachStyleSheetCallback(b)
        }
    };
    else
        ENetwork.AttachStyleSheetCallback(b);
    return 
};
ENetwork.GetAttachTarget = function()
{
    if (document.getElementsByTagName("head")[0] != null)
        return document.getElementsByTagName("head")[0];
    else
    throw new EException("ENetwork:cstr", "err_noheadelement", l611ft)
};

function EException(b, c, a)
{
    this.source = b;
    this.name = c;
    this.message = a
}

EException.prototype.Name = this.name;
EException.prototype.Source = this.source;
EException.prototype.Message = this.message;


function fnModelLoad(n,t,f,b,node){ //n:js中的变量名字；t:模板标识；f:模板文件；b回调函数
  try{
    if(typeof(eval(t))=="string") return true;
  }catch(e){
  }
  if(f=="") f="Model.html";
  ENetwork.DownloadScript("Skins.aspx?v="+n+"&s="+t+"&f="+f+"&node="+node,function(){fnExecFunction(b)});
  return false;
}
function fnExecFunction(f){
    try{
      if(typeof(f)=="function"){f();}     
    }catch(e){
      //alert(e)
    }
}
function fnReadSign(strSign,strContent)
{
   var r, re;
   re = new RegExp('<!--' + strSign + '-->.*<!--/' + strSign + '-->','i');
   r = strContent.match(re);
   return(r.toString());
}

Array.prototype.remove=function(dx){
    if(isNaN(dx)||dx>this.length){return false;}
    for(var i=0,n=0;i<this.length;i++)
    {
        if(this[i]!=this[dx])
        {
            this[n++]=this[i]
        }
    }
    this.length-=1
};
String.prototype.replaceAll =function stringReplaceAll(AFindText,ARepText){  
 var raRegExp = new RegExp(AFindText.replace(/([\(\)\[\]\{\}\^\$\+\-\*\?\.\"\'\|\/\\])/g,"\\$1"),"ig");
 return this.replace(raRegExp,ARepText);  
}
function int(i,k){ 
    var ff=0; 
    var j; 
    j=Math.round(i/k)-i/k; 
    if (j>=0) 
    ff=Math.round(i/k)-1; 
    if (j<0) 
    ff=Math.round(i/k); 
    return ff; 
}
function fnPageShow(CurrentPage,pagesize,pagenum,CssStyle,funcName,sPageCountDes){
    var pagestr='';
    if(!pagenum)pagenum = 8;
    if(!CurrentPage)CurrentPage=1;
    if(CurrentPage==0)CurrentPage=1;
    if(pagesize)
    {
        var pagecount = 0,endcount = 0;
        pagecount = int(CurrentPage,pagenum);
        if((pagecount+1)*pagenum>pagesize){
            endcount =pagecount*pagenum+pagesize%pagenum;
        }else{
            endcount = (pagecount+1)*pagenum;
        }
        for(var i=pagecount*pagenum+1;i<=endcount; i++){
            if(i!=CurrentPage)
            pagestr += '<a class="'+CssStyle+'" href="javascript:'+funcName+'('+i+');">['+i+']</a> ';
            else
            pagestr += i+' ';            
        }
        if(pagecount>=1){
            var pre = pagecount*pagenum;
            pagestr= '<a class="'+CssStyle+'" href="javascript:'+funcName+'('+pre+');"> <<</a> '+pagestr;
        }
        if(endcount<pagesize){
            var next = endcount+1; 
            pagestr= pagestr+'<a class="'+CssStyle+'" href="javascript:'+funcName+'('+next +');"> >></a> ';
        }
        if (!sPageCountDes || sPageCountDes.length < 1)
        {
            sPageCountDes = ' 共{$PageCount}页';
        }
        pagestr=pagestr+ sPageCountDes.replace('{$PageCount}', pagesize);
    }
    return pagestr;
}
function fnObj_addEvent(obj, evType, fn)
{
    if (obj.addEventListener)
    {
        obj.addEventListener(evType, fn, false);
        return true;
    }
    else if (obj.attachEvent)
    {
        var r = obj.attachEvent("on"+evType, fn);
        return r;
    }
    else
    {
        return false;
    }
}
function fnGetWindowWidth(){
	var vw = 0;
	var _dEt = document.documentElement;
	var _dBy = document.body;
	if(typeof window.innerWidth=='number')vw = window.innerWidth;
	else{
		if(_dEt&&_dEt.clientWidth)vw = _dEt.clientWidth;
		else{
			if(_dBy&&_dBy.clientWidth)vw = _dBy.clientWidth;
		}
	}
	if(!vw||vw<100)vw = 100;
	return vw;
}
function fnGetWindowHeight(){
	var vh = 0;
	var _dEt = document.documentElement;
	var _dBy = document.body;
	if(typeof window.innerHeight=='number')vh = window.innerHeight;
	else{
		if(_dEt&&_dEt.clientHeight)vh = _dEt.clientHeight;
		else{
			if(_dBy&&_dBy.clientHeight)vh = _dBy.clientHeight;
		}
	}
	if(!vh||vh<100)vh = 100;
	return vh;
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
function $() 
{
	var objElements = new Array();
	var i;
	for (i=0;i< arguments.length;i++)
	{
		var objEle = arguments[i];
		if(typeof arguments[i] == 'string')
		{
			objEle = document.getElementById(arguments[i]);
		}
		objElements.push(objEle);
	}
	if(arguments.length==1)
	{
		return objEle;
	}
	else
	{
		return objElements;
	}
}
/* 废弃的复制功能
function fnCopyCode(strUrl, msg){
	if (navigator.appVersion.match(/\bMSIE\b/)){
		Copied = $(strUrl).createTextRange();
	    Copied.execCommand('Copy');
	    alert(msg);
	}else{
		alert('您的浏览器不支持拷贝功能，请用Ctrl+C复制。');		
		$(strUrl).select();		
	}
}
*/
//通用复制方法
function fnCopyToClipboard(txt,msg) {
     if(window.clipboardData) {
             window.clipboardData.clearData();
             window.clipboardData.setData("Text", txt);
     } else if(navigator.userAgent.indexOf("Opera") != -1) {
          window.location = txt;
     } else if (window.netscape) {
          try {
               netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
          } catch (e) {
               alert("您的浏览器未开启复制功能！\n请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'");
               return false;
          }
          var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
          if (!clip)
               return;
          var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
          if (!trans)
               return;
          trans.addDataFlavor('text/unicode');
          var str = new Object();
          var len = new Object();
          var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
          var copytext = txt;
          str.data = copytext;
          trans.setTransferData("text/unicode",str,copytext.length*2);
          var clipid = Components.interfaces.nsIClipboard;
          if (!clip)
               return false;
          clip.setData(trans,null,clipid.kGlobalClipboard);
     }
     else
     {
        alert('您的浏览器不支持拷贝功能。');
        return false;
     }
     if(msg!=null&&msg!='')
     {
        alert(msg);
     }
     return true;
}
function fnForceWindow ()
{
  this.r = document.body;
  
  this.f = document.createElement("FORM");
  this.f.style.display='none';
  this.f.target = "_blank";
  this.f.method = "post";
  this.r.insertBefore(this.f, this.r.childNodes[0]);
}
fnForceWindow.prototype.open = function (sUrl)
{
  this.f.action = sUrl;
  this.f.submit();
}
//让FIREFOX显示...begin
function initMozTextOverflow(obj,iframebody)
{
	function re_render()
	{
		doMozTextOverflow(obj,iframebody);
	}
	setTimeout(re_render,0);
	
}

function doMozTextOverflow(obj,iframebody)
{
    function _overflow(e)
	{
		var el = e.currentTarget;
		el.style.overflow="hidden";
		for(var i=0;i<el.childNodes.length;i++)
		{
		    if(el.childNodes[i].tagName=="INS")
		    {
		        el.childNodes[i].style.display="block";
		        return;
		    }
		}
		
	}
	function _underflow(e)
	{	
		var el = e.currentTarget;
		el.style.overflow="hidden";
		el.childNodes[1].style.display="none";
	}
	obj.style.overflow="auto";
    obj.addEventListener("overflow", _overflow, false);
	obj.addEventListener("underflow", _underflow, false);
	obj.ins = iframebody.contentWindow.document.createElement("ins");
	obj.ins.innerHTML="&hellip;";
	obj.appendChild(obj.ins);
}
//end
//Cookie
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
        if (-1 == ( ichEnd = sCookie.indexOf(";",ichSt+sName.length)))
            ichEnd = sCookie.length;
        return unescape(sCookie.substring(ichSt+sName.length,ichEnd));
    }
    return null;
}
//set Cookie value
CookieHelper.prototype.setCookie = function(sCookieName,sCookieValue,dCookieExpires){
    var argv = this.setCookie.arguments, argc = this.setCookie.arguments.length;
    var sExpDate = (argc > 2) ? "; expires="+argv[2].toGMTString() : "";
    var sPath = (argc > 3) ? "; path="+argv[3] : "";
    var sDomain = (argc > 4) ? "; domain="+argv[4] : "";
    var sSecure = (argc > 5) && argv[5] ? "; secure" : "";
    document.cookie = sCookieName + "=" + escape(sCookieValue,0) + sExpDate + sPath + sDomain + sSecure + ";";
}
function CBoardExhibition(objStr, targetStr, msgDepth, autoClone, direction, msgScrollDelay, msgScreenDelay)
{
    this.objStr = objStr;
    this.target = document.getElementById(targetStr);
    this.target.style.overflow = "hidden";
    this.CreateNodesPath = CBoardExhibition_CreateNodesPath; 
    this.CleanseInvalidNodes = CBoardExhibition_CleanseInvalidNodes;
    this.CloneMsgData = CBoardExhibition_CloneMsgData;    
    this.msgDepth = msgDepth;
    this.direction = direction.toLowerCase();
    this.CleanseInvalidNodes();
    this.msgCnt = 0;
    if (autoClone){
        this.msgCnt = (eval("this.target" + this.CreateNodesPath(this.msgDepth-1) + ".childNodes.length"));
        this.CloneMsgData();
    }else{
        this.msgCnt = (eval("this.target" + this.CreateNodesPath(this.msgDepth-1) + ".childNodes.length")) / 2;
    }   
    this.msgMinIndex = 0;
    this.msgMaxIndex = 0;
    this.msgIndex = -1;    
    if (this.direction=="up" || this.direction=="left"){
        this.msgMinIndex = 0;
        this.msgMaxIndex = this.msgCnt - 1;
        this.msgIndex = this.msgMinIndex - 1;
    }else if (this.direction=="down" || this.direction=="right"){
        this.msgMinIndex = this.msgCnt;
        this.msgMaxIndex = this.msgCnt*2 - 1;
        this.msgIndex = this.msgMaxIndex + 1;
    }    
    this.msgItemWidth = this.target.offsetWidth;
    this.msgItemHeight = this.target.offsetHeight;
    this.msgScrollDelay = msgScrollDelay;
    this.msgScreenDelay = msgScreenDelay;    
    this.timer = null;
    this.ShowMsg = CBoardExhibition_ShowMsg;
    this.ShowMsgUp = CBoardExhibition_ShowMsgUp;
    this.ShowMsgDown = CBoardExhibition_ShowMsgDown;
    this.ShowMsgLeft = CBoardExhibition_ShowMsgLeft;
    this.ShowMsgRight = CBoardExhibition_ShowMsgRight;
}
function CBoardExhibition_CreateNodesPath(depth){
    var i = 0;
    var str = "";
    for (i=0; i<depth; i++){
        str += ".childNodes[0]";
    }    
    return str;
}
function CBoardExhibition_CleanseInvalidNodes(){
    var i = 0;
    var j = 0;
    var k = 0;
    for (i=0; i<this.msgDepth; i++){
        var strp = this.CreateNodesPath(i);
        var str = strp + ".childNodes";
        for (k=0; k<eval("this.target" + str + ".length"); k++){
            if (eval("this.target" + str + "[k].nodeType") == 3){
                var objp = eval("this.target" + strp);
                objp.removeChild(eval("this.target" + str + "[k]"));
            }
        }
    }
}
function CBoardExhibition_CloneMsgData(){
    var str = this.CreateNodesPath(this.msgDepth-1);    
    for (i=0; i<this.msgCnt; i++){
        eval("this.target"+str+".appendChild(this.target"+str+".childNodes["+i+"].cloneNode(true))");
    }
}
function CBoardExhibition_ShowMsg(){
    if (this.direction == "up"){
        this.target.scrollTop = 0;
        this.ShowMsgUp();
    }else if (this.direction == "down"){
        this.target.scrollTop = this.msgMaxIndex * this.msgItemHeight;
        this.ShowMsgDown();
    }else if (this.direction == "left"){
        this.target.scrollLeft = 0;
        this.ShowMsgLeft();
    }else if (this.direction == "right"){
        this.target.scrollLeft = this.msgMaxIndex * this.msgItemWidth;
        this.ShowMsgRight();
    }
}
function CBoardExhibition_ShowMsgUp(){
    if (this.msgIndex > this.msgMaxIndex){
        this.msgIndex = 0;
        this.target.scrollTop = 0;
    }
    if (this.target.scrollTop < (this.msgIndex+1)*this.msgItemHeight){
        this.target.scrollTop++;
        this.timer = setTimeout(this.objStr+".ShowMsgUp();", this.msgScrollDelay);
    }else{
        this.msgIndex++;
        this.timer = setTimeout(this.objStr+".ShowMsgUp();", this.msgScreenDelay);
    }
}
function CBoardExhibition_ShowMsgDown(){
    if (this.msgIndex < this.msgMinIndex){
        this.msgIndex = this.msgMaxIndex;
        this.target.scrollTop = this.msgMaxIndex*this.msgItemHeight;
    }    
    if (this.target.scrollTop > (this.msgIndex-1)*this.msgItemHeight){
        this.target.scrollTop--;
        this.timer = setTimeout(this.objStr+".ShowMsgDown();", this.msgScrollDelay);
    }else{
        this.msgIndex--;
        this.timer = setTimeout(this.objStr+".ShowMsgDown();", this.msgScreenDelay);
    }
}
function CBoardExhibition_ShowMsgLeft(){
    if (this.msgIndex > this.msgMaxIndex){
        this.msgIndex = 0;
        this.target.scrollLeft = 0;
    }    
    if (this.target.scrollLeft < (this.msgIndex+1)*this.msgItemWidth){
        this.target.scrollLeft++;
        this.timer = setTimeout(this.objStr+".ShowMsgLeft();", this.msgScrollDelay);
    }else{
        this.msgIndex++;
        this.timer = setTimeout(this.objStr+".ShowMsgLeft();", this.msgScreenDelay);
    }
}
function CBoardExhibition_ShowMsgRight(){
    if (this.msgIndex < this.msgMinIndex){
        this.msgIndex = this.msgMaxIndex;
        this.target.scrollLeft = this.msgMaxIndex*this.msgItemWidth;
    }    
    if (this.target.scrollLeft > (this.msgIndex-1)*this.msgItemWidth){
        this.target.scrollLeft--;
        this.timer = setTimeout(this.objStr+".ShowMsgRight();", this.msgScrollDelay);
    }else{
        this.msgIndex--;
        this.timer = setTimeout(this.objStr+".ShowMsgRight();", this.msgScreenDelay);
    }
}