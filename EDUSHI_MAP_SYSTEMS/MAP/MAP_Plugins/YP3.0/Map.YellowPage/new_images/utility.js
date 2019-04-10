function $(obj)
{
	if (typeof(obj) == 'object')
	{
		return obj;
	}
	else
	{
		return document.getElementById(obj);
	}
}
//2、创建一个页面元素tag
function $C(tag) {
    return document.createElement(tag);
}
function fnGetWindowWidth() {
    var vw = 0;
    var _dEt = document.documentElement;
    var _dBy = document.body;
    if (typeof window.innerWidth == 'number') {
        vw = window.innerWidth;
    }
    else {
        if (_dEt && _dEt.clientWidth) {
            vw = _dEt.clientWidth;
        }
        else {
            if (_dBy && _dBy.clientWidth) vw = _dBy.clientWidth;
        }
    }
    if (!vw || vw < 100) {
        vw = 100;
    }
    return vw;
}
function fnGetWindowHeight() {
    var vh = 0;
    var _dEt = document.documentElement;
    var _dBy = document.body;
    if (typeof window.innerHeight == 'number') {
        vh = window.innerHeight;
    }
    else {
        if (_dEt && _dEt.clientHeight) {
            vh = _dEt.clientHeight;
        }
        else {
            if (_dBy && _dBy.clientHeight) vh = _dBy.clientHeight;
        }
    }
    if (!vh || vh < 100) {
        vh = 100;
    }
    return vh;
}
//弹窗显示
function fnShowMessageBox(sTitle, sMsg, sLoginUrl, sAnonymous) {
    var h = fnGetWindowHeight();
    var w = fnGetWindowWidth();

    if (!$('divDialogBg')) {
        var div = $C('div');
        div.id = 'divDialogBg';
        div.style.backgroundColor = 'black';
        div.style.position = 'absolute';
        div.style.filter = 'alpha(opacity=50)';
        div.style.opacity = '.50';
        div.style.zIndex = 100001;
        div.style.left = 0;
        div.style.top = document.documentElement.scrollTop;
        div.style.width = w + 'px';
        div.style.height = h + 'px';
        document.body.appendChild(div);
    }
    else {
        $('divDialogBg').style.top = document.documentElement.scrollTop;
    }
    if (!$('divDialog')) {
        var divBox = $C('div');
        divBox.id = 'divDialog';
        divBox.style.left = (w / 2 - 150) + 'px';
        divBox.style.top = document.documentElement.scrollTop + (h / 2 - 60) + 'px';
        divBox.style.position = 'absolute';
        divBox.style.zIndex = 100002;
        divBox.style.width = '300px';
        divBox.style.height = '120px';
        var boxHtml = '';
        if (sLoginUrl) {
            boxHtml = '<div style="background:url(\'Images/ClewBg1.gif\') no-repeat left top;width:280px; height:110px; padding:5px 10px;text-align:left;position:relative;overflow:hidden;"><h3 id="divDialogTitle" style="font-size:14px;font-weight:bold;padding:0 0 0 16px;margin:0 0 3px;height:23px;line-height:23px; background:url(Images/CommonArrow1.gif) no-repeat left 5px;"></h3><div style="padding:5px 15px 5px 20px;line-height:150%;text-align:left;" id="divDialogMsg"></div><div style="padding:3px 0; text-align:center;"><input type="image" title="登录回答" onclick="location.href=\''+sLoginUrl+'\'" src="Images/ClewLoginAsk.gif" />&nbsp;&nbsp;<input type="image" title="匿名回答" src="Images/ClewAnonAsk.gif" onclick="'+sAnonymous+'"/></div><div style="position:absolute; top:8px; right:8px; cursor:hand; width:13px; height:13px; overflow:hidden;background:url(Images/CloseBtn.gif) no-repeat left top;" onclick="javascript:$(\'divDialogBg\').style.display=\'none\';$(\'divDialog\').style.display=\'none\';" onmouseover="this.style.backgroundPosition=\'left -13px\'"onmouseout="this.style.backgroundPosition=\'left top\'" title="关闭窗口"></div></div>';    
        }
        else {
            boxHtml = '<div style="background:url(\'Images/ClewBg1.gif\') no-repeat left top;width:280px; height:110px; padding:5px 10px;text-align:left;position:relative;overflow:hidden;"><h3 id="divDialogTitle" style="font-size:14px;font-weight:bold;padding:0 0 0 16px;margin:0 0 3px;height:23px;line-height:23px; background:url(Images/CommonArrow1.gif) no-repeat left 5px;"></h3><div style="padding:5px 15px 5px 20px;line-height:150%;text-align:left;" id="divDialogMsg"></div><div style="padding:3px 0; text-align:center;"><input type="image" title="确定" src="Images/TagBtn.gif" onclick="$(\'divDialogBg\').style.display=\'none\';$(\'divDialog\').style.display=\'none\';" /></div><div style="position:absolute; top:8px; right:8px; cursor:hand; width:13px; height:13px; overflow:hidden;background:url(Images/CloseBtn.gif) no-repeat left top;" onclick="javascript:$(\'divDialogBg\').style.display=\'none\';$(\'divDialog\').style.display=\'none\';" onmouseover="this.style.backgroundPosition=\'left -13px\'"onmouseout="this.style.backgroundPosition=\'left top\'" title="关闭窗口"></div></div>';    
        }
        document.body.appendChild(divBox);
        setTimeout(function() { divBox.innerHTML = boxHtml; }, 2);
    }
    else {
        $('divDialog').style.top = document.documentElement.scrollTop + (h / 2 - 60) + 'px';
    }
    setTimeout(function() {
        $('divDialogBg').style.display = 'block';
        $('divDialog').style.display = 'block';
        $('divDialogTitle').innerHTML = sTitle;
        $('divDialogMsg').innerHTML = sMsg;
    }, 10); //延时解决IE6下图片有时不能加载的BUG
}
function fnCloseMessageBox() {
    if ($('divDialogBg')) {
        $('divDialogBg').style.display = 'none';
        $('divDialog').style.display = 'none';
    }
}
function doSearch()
{
    var sKeyword = escape($('txtKeyword').value);
    if(sKeyword == escape('请输入您要打听的内容')|| sKeyword.length < 1 )
    {
        alert("请输入搜索关键字");
        $('txtKeyword').focus();
        return;
    }
    window.open('SearchResult.aspx?keyword='+sKeyword,'searchWin');
}
function SwichQuestion(type)
{
    if(type==1)
    {
        $('liNoAnswer').className = 'Current';        
        $('divNoAnswerList').style.display = 'block';
        
        $('liHasAnswer').className = '';
        $('divHasAnswerList').style.display = 'none';
    }
    else if(type == 2)
    {
        $('liNoAnswer').className = '';
        $('divNoAnswerList').style.display = 'none';
        
        $('liHasAnswer').className = 'Current';        
        $('divHasAnswerList').style.display = 'block';
    }
}
function LoadFck(textBox, rootPath, citycode, initHtml)
{
    var oDiv = textBox.parentNode;
    var id = textBox.name;
    var city = citycode ? citycode : '';
    oDiv.innerHTML = '' +
    '<input type="hidden" id="' + id + '" name="' + id + '" value="' + textBox.value + '" /><input type="hidden" id="' + id + '___Config" value="HtmlEncodeOutput=false&FormatSource=true&EdushiCityCode=' + city + '" /><iframe id="' + id + '___Frame" src="' + rootPath + 'fckeditor/editor/fckeditor.html?InstanceName=' + id + '&Toolbar=Basic" width="' + textBox.style.width.replace('px','') + '" height="' + textBox.style.height.replace('px','') + '" frameborder="no" scrolling="no"></iframe>';
    if (initHtml) {
        fnInitFCKValue();
    }
}
function fnInitFCKValue() {
    if (typeof FCKeditorAPI == 'undefined') {
        setTimeout("fnInitFCKValue()", 50);
        return;
    }
    var oEditor = FCKeditorAPI.GetInstance('txtPostContent');
    setTimeout(function(){oEditor.InsertHtml(_InitContent)},200);
}
//验证贴子主题提交
function CheckBDTPost()
{
    if ($('txtTitle').value.length < 5)
    {
        alert('提问标题不能少于 5 个字');
        $('txtTitle').focus();
        return false;
    }
    if (typeof FCKeditorAPI == 'undefined')
        return false;
    var oEditor = FCKeditorAPI.GetInstance('txtPostContent');
    var content = oEditor.GetXHTML(true);
    content = content.replace(/\s/gi,''); 
    if (content.length < 5)
    {
        alert('提问详细不能少于 5 个字');
        return false;
    }
    if($('dplBDTType').value == '')
    {
        alert('请您选择正确的分类，以使您的打听尽快得到解答');
        return false;    
    }
    if($('txtCent')!=null)
    {
        if (!/^\d{1,10}(\.\d{1,2})?$/.test($('txtCent').value))
        {
            alert('请您输入最多两位小数的正数值^_^');
            return false;
        }
    }
    return true;
}
//包打听浏览页面
function doWithBdt(id)
{
    var panleID = ['divUpdateBdt','divAddCent','divCloseBdt'];
    for(var i=0; i<panleID.length; i++)
    {
        if(id == panleID[i])
        {
            $(id).style.display = '';
        }
        else
        {
            $(panleID[i]).style.display = 'none';
        }
    }
}
function ClosePanel(id)
{
    $(id).style.display = 'none';
}
function ShowPanel(bdturl,id,lm_id,bdt_id,isIndex) {
    if (lm_id > 0) {
        if (isIndex) {
            location.href = bdturl + 'ListedQu.aspx?ID=' + bdt_id + '&action=answer';
        } else {
            $(id).style.display = '';
        }
    }
    else {
        var sBackUrl = encodeURIComponent(location.href + '&action=answer');
        var sHtmlTip =  '<div><a href="http://my.edushi.com/Login.aspx?BackUrl=' +sBackUrl+ '">登录回答</a>，赢取积分，领取精彩宝贝吧！<br />不登录了，直接<a href="javascript:;" onclick="fnCloseMessageBox();$(\''+id+'\').style.display = \'\';">匿名回答</a></div>';
        if (isIndex) {
            sBackUrl = encodeURIComponent(bdturl + 'ListedQu.aspx?ID=' + bdt_id + '&action=answer');
            sHtmlTip = '<div><a href="http://my.edushi.com/Login.aspx?BackUrl=' + sBackUrl + '">登录回答</a>，赢取积分，领取精彩宝贝吧！<br />不登录了，直接<a href="' + bdturl + 'ListedQu.aspx?ID=' + bdt_id + '&action=answer">匿名回答</a></div>';
            fnShowMessageBox('您还未登录哦！', sHtmlTip, 'http://my.edushi.com/Login.aspx?BackUrl=' + sBackUrl, 'location.href=\''+bdturl+'ListedQu.aspx?ID=' + bdt_id + '&action=answer\'');
        }
        else {
            fnShowMessageBox('您还未登录哦！', sHtmlTip, 'http://my.edushi.com/Login.aspx?BackUrl=' + sBackUrl,'fnCloseMessageBox();$(\''+id+'\').style.display = \'\';');
        }
    }
}
function FavariteBdt(iLT_ID,citycode)
{
    var ajax = new Ajax();
    ajax.get('GetData.aspx?action=favorites&ID='+iLT_ID+'&flag=7&rnd=' + Math.round(Math.random()*10000)
        ,function(xmlObj){
            if (xmlObj != null)
            {
                var sReturn = xmlObj.responseText;
                if(sReturn.indexOf("Login:")>-1)
                {
                    alert(sReturn.substr(6));
                    var sCurrentUrl = location.href;
                    location.href = "http://my.edushi.com/Login.aspx?City="+citycode+"&BackUrl="+sCurrentUrl;
                }
                else if(sReturn.indexOf("Fail:")>-1)
                {
                    alert(sReturn.substr(5));
                }
                else
                {
                    alert(sReturn);
                    window.open("http://my.edushi.com/BdtFavorite.aspx?City="+citycode);
                }
            }
            else
            {
                alert('数据加载失败.');
            }
        }
    );  
}
function CheckPost(id)
{
    if (typeof FCKeditorAPI == 'undefined')
        return false;
    var oEditor = FCKeditorAPI.GetInstance(id);
    var content = oEditor.GetXHTML(true); 
    content = content.replace(/\s/gi,'');
    if (content.length < 1)
    {
        alert('内容不能为空哦~');
        return false;
    }
    return true;
}
//顶踩 iType：1顶，0踩
function PostUpDown(iType, LTC_ID, obj)
{
    var ajax = new Ajax();
    ajax.get('GetData.aspx?action=comment&commenttype='+iType+'&ltc_id=' + LTC_ID + "&rnd=" + Math.round(Math.random()*10000)
        ,function(xmlObj){
            if (xmlObj != null)
            {
                var sReturn = xmlObj.responseText;
                if(sReturn.indexOf("登录")>-1)
                {
                    alert(sReturn);
                    var sCurrentUrl = location.href;
                    location.href = "http://my.edushi.com/Login.aspx?BackUrl="+sCurrentUrl;
                }
                else if(sReturn.indexOf("失败")>-1)
                {
                    alert("很抱歉，一个帐号每天只能评价5次哦！");
                }
                else
                {                
                    alert("提交成功");
                    obj.innerText = sReturn;
                }
            }
            else
            {
                alert('数据加载失败.');
            }
        }
    );
}
//提高悬赏分
function RaiseCent(iCent, oldCent, iLT_ID, obj, panelID)
{
    if (!/^\d{1,10}(\.\d{1,2})?$/.test(iCent)) {
        alert('请您输入最多两位小数的正数值^_^');
        return false;
    }
    var ajax = new Ajax();
    ajax.get('GetData.aspx?action=raisecent&cent=' + iCent + '&id=' + iLT_ID + "&rnd=" + Math.round(Math.random() * 10000)
        , function(xmlObj) {
            if (xmlObj != null) {
                var sReturn = xmlObj.responseText;
                if (sReturn.indexOf("Fail:") > -1) {
                    alert(sReturn.substr(5));
                }
                else {
                    alert("提高悬赏E币成功");
                    obj.innerText = (iCent * 1 + oldCent * 1);
                    obj.style.display = 'block';
                    $(panelID).style.display = 'none';
                    $('user_spanCent').innerText = sReturn;
                    $('font_spanCent').innerText = sReturn;
                }
            }
            else {
                alert('数据加载失败.');
            }
        }
    );
}
//回答补充
function PostContent(oForm, url, obj, fckID, updatePanleID, showSupplyPanleID)
{
    if(!CheckPost(fckID))
    {
        return;
    }
    var ajax = new Ajax();
    ajax.post(oForm
        ,function(xmlObj){
            if (xmlObj != null)
            {
                var sReturn = xmlObj.responseText;
                if(sReturn.indexOf("Fail:")>-1)
                {
                    alert(sReturn.substr(5));
                }
                else
                {                
                    alert("提交成功");
                    obj.innerHTML = sReturn;
                    $(updatePanleID).style.display = 'none';
                    $(showSupplyPanleID).style.display = '';
                }
            }
            else
            {
                alert('数据提交失败.');
            }
        }, url, 'post', fckID
    );    
}
function GetBestAnswer(oForm,url,obj, fckID, getBestPanleID)
{
    var ajax = new Ajax();
    ajax.post(oForm
        ,function(xmlObj){
            if (xmlObj != null)
            {
                var sReturn = xmlObj.responseText;
                if(sReturn.indexOf("失败")>-1)
                {
                    alert(sReturn);
                }
                else
                {                
                    alert("提交成功");
                    obj.style.display = '';
                    obj.innerHTML = sReturn;
                    $(getBestPanleID).style.display = 'none';
                }
            }
            else
            {
                alert('数据提交失败.');
            }
        }, url, 'post', fckID
    );     
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
        alert(msg);
     }
     return true;
}
/**********************************************
Ajax类
***********************************************/
function Ajax() {
	var xmlObj = false;
	var CBfunc,ObjSelf;
	ObjSelf=this;
	try { xmlObj=new XMLHttpRequest; }
	catch(e) {
		try { xmlObj=new ActiveXObject("MSXML2.XMLHTTP"); }
		catch(e2) {
			try { xmlObj=new ActiveXObject("Microsoft.XMLHTTP"); }
			catch(e3) { xmlObj=false; }
		}
	}
	if (!xmlObj) { return false; }
	if (arguments[0]) { this.url = arguments[0]; } else { this.url = ""; }
	if (arguments[1]) { this.callback = arguments[1]; } else { this.callback = function(obj) { return }; }
	if (arguments[2]) { this.content = arguments[2]; } else { this.content = ""; }
	if (arguments[3]) { this.method = arguments[3]; } else { this.method = "POST"; }
	if (arguments[4]) { this.async = arguments[4]; } else { this.async = true; }
	this.send = function() {
	    var purl, pcbf, pc, pm, pa;
	    if (arguments[0]) { purl = arguments[0]; } else { purl = this.url; }
	    if (arguments[1]) { pc = arguments[1]; } else { pc = this.content; }
	    if (arguments[2]) { pcbf = arguments[2]; } else { pcbf = this.callback; }
	    if (arguments[3]) { pm = arguments[3]; } else { pm = this.method; }
	    if (arguments[4]) { pa = arguments[4]; } else { pa = this.async; }
	    if (!pm || !purl || !pa) { return false; }
	    xmlObj.open(pm, purl, pa);
	    if (pm == "POST") { xmlObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); }
	    xmlObj.onreadystatechange = function() {
	        if (xmlObj.readyState == 4) {
	            if (xmlObj.status == 200) {
	                pcbf(xmlObj);
	            }
	            else {
	                pcbf(null);
	            }
	        }
	    };
	    if (pm == "POST") {
	        xmlObj.send(pc);
	    }
	    else {
	        xmlObj.send("");
	    }
	};
	this.get = function() {
	    var purl, pcbf;
	    if (arguments[0]) { purl = arguments[0]; } else { purl = this.url; }
	    if (arguments[1]) { pcbf = arguments[1]; } else { pcbf = this.callback; }
	    if (!purl && !pcbf) { return false; }
	    this.send(purl, "", pcbf, "GET", true);
	};
	this.post = function() {
	    var fo, pcbf, purl, pc, pm;
	    if (arguments[0]) { fo = arguments[0]; } else { return false; }
	    if (arguments[1]) { pcbf = arguments[1]; } else { pcbf = this.callback; }
	    if (arguments[2]) {
	        purl = arguments[2];
	    }
	    else if (fo.action) {
	        purl = fo.action;
	    }
	    else {
	        purl = this.url;
	    }
	    if (arguments[3]) {
	        pm = arguments[3];
	    }
	    else if (fo.method) {
	        pm = fo.method.toLowerCase();
	    }
	    else {
	        pm = "post";
	    }
	    if (!pcbf && !purl) { return false; }
	    if (arguments[4]) {
	        pc = this.formToStr(fo, arguments[4]);
	    }
	    else {
	        pc = this.formToStr(fo);
	    }
	    if (!pc) { return false; }
	    if (pm) {
	        if (pm == "post") {
	            this.send(purl, pc, pcbf, "POST", true);
	        }
	        else {
	            if (purl.indexOf("?") > 0) {
	                this.send(purl + "&" + pc, "", pcbf, "GET", true);
	            }
	            else {
	                this.send(purl + "?" + pc, "", pcbf, "GET", true);
	            }
	        }
	    }
	    else {
	        this.send(purl, pc, pcbf, "POST", true);
	    }
	};

	this.formToStr = function(fc, FckEditorID) {
	    var i, query_string = "", and = "";
	    for (i = 0; i < fc.length; i++) {
	        e = fc[i];
	        if (e.name != '') {
	            if (e.type == 'select-one') {
	                element_value = e.options[e.selectedIndex].value;
	            }
	            else if (e.type == 'checkbox' || e.type == 'radio') {
	                if (e.checked == false) {
	                    continue;
	                }
	                element_value = e.value;
	            }
	            else if (e.name.indexOf('fck') > -1)   //FCK编辑器带上FCK标识
	            {
	                var oEditor = FCKeditorAPI.GetInstance(FckEditorID);
	                var content = oEditor.GetXHTML(true);
	                element_value = content;
	            }
	            else {
	                element_value = e.value;
	            }
	            element_value = encodeURIComponent(element_value);
	            query_string += and + e.name + '=' + element_value;
	            and = "&";
	        }
	    }
	    return query_string;
	};
}
function CheckLogin() {
    return (document.getElementById('txtUserName').value != '' && document.getElementById('txtPassword').value != '' && document.getElementById('txtVerifyCode').value != '');
}