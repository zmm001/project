function $(obj) {
    if (typeof (obj) == 'object') {
        return obj;
    }
    else {
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
            boxHtml = '<div class="boxDiv"><h3 id="divDialogTitle"></h3><div id="divDialogMsg"></div><div style="padding:3px 0; text-align:center;"><input type="image" title="登录回答" onclick="location.href=\'' + sLoginUrl + '\'" src="' + _RelativeUrl + 'Images/ClewLoginAsk.gif" />&nbsp;&nbsp;<input type="image" title="匿名回答" src="' + _RelativeUrl + 'Images/ClewAnonAsk.gif" onclick="' + sAnonymous + '"/></div><div id="divClose" onclick="javascript:$(\'divDialogBg\').style.display=\'none\';$(\'divDialog\').style.display=\'none\';" onmouseover="this.style.backgroundPosition=\'left -13px\'"onmouseout="this.style.backgroundPosition=\'left top\'" title="关闭窗口"></div></div>';
        }
        else {
            boxHtml = '<div class="boxDiv"><h3 id="divDialogTitle"></h3><div id="divDialogMsg"></div><div style="padding:3px 0; text-align:center;"><input type="image" title="确定" src="' + _RelativeUrl + 'Images/TagBtn.gif" onclick="$(\'divDialogBg\').style.display=\'none\';$(\'divDialog\').style.display=\'none\';" /></div><div id="divClose" onclick="javascript:$(\'divDialogBg\').style.display=\'none\';$(\'divDialog\').style.display=\'none\';" onmouseover="this.style.backgroundPosition=\'left -13px\'"onmouseout="this.style.backgroundPosition=\'left top\'" title="关闭窗口"></div></div>';
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

function SwichQuestion(type) {
    if (type == 1) {
        $('liNoAnswer').className = 'Current';
        $('divNoAnswerList').style.display = 'block';

        $('liHasAnswer').className = '';
        $('divHasAnswerList').style.display = 'none';
    }
    else if (type == 2) {
        $('liNoAnswer').className = '';
        $('divNoAnswerList').style.display = 'none';

        $('liHasAnswer').className = 'Current';
        $('divHasAnswerList').style.display = 'block';
    }
}
function LoadFck(textBox, rootPath, citycode, initHtml) {
    var oDiv = textBox.parentNode;
    var id = textBox.name;
    var city = citycode ? citycode : '';
    oDiv.innerHTML = '' +
    '<input type="hidden" id="' + id + '" name="' + id + '" value="' + textBox.value + '" /><input type="hidden" id="' + id + '___Config" value="HtmlEncodeOutput=false&FormatSource=true&EdushiCityCode=' + city + '" /><iframe id="' + id + '___Frame" src="' + rootPath + 'fckeditor/editor/fckeditor.html?InstanceName=' + id + '&Toolbar=Basic" width="' + textBox.style.width.replace('px', '') + '" height="' + textBox.style.height.replace('px', '') + '" frameborder="no" scrolling="no"></iframe>';
    if (initHtml) {
        fnInitFCKValue();
    }
}
function fnInitFCKValue() {
    if (typeof FCKeditorAPI == 'undefined') {
        setTimeout("fnInitFCKValue()", 50);
        return;
    }
    var oEditor = FCKeditorAPI.GetInstance('txtEditor');
    setTimeout(function() { oEditor.InsertHtml(_InitContent) }, 200);
}
//验证贴子主题提交
function CheckBDTPost() {

    var content = editor.getSource();
    if ($('dplBDTType').value == '0') {
        alert('请您选择正确的分类，以使您的打听尽快得到解答');
        return false;
    }
    if ($('txtTitle').value.length < 5) {
        alert('提问标题不能少于 5 个字');
        $('txtTitle').focus();
        return false;
    }
    if (content.length < 5) {
        alert('提问详细不能少于 5 个字');
        return false;
    }

    if ($('txtCent') != null) {
        if (!/^\d{1,10}(\.\d{1,2})?$/.test($('txtCent').value)) {
            alert('请您输入最多两位小数的正数值^_^');
            return false;
        }
    }
}
//包打听浏览页面
function doWithBdt(id) {
    var panleID = ['divUpdateBdt', 'divCloseBdt'];
    for (var i = 0; i < panleID.length; i++) {
        if (id == panleID[i]) {
            if ($(id).style.display == '')
                ClosePanel(id)
            else
                $(id).style.display = '';
        }
        else {
            $(panleID[i]).style.display = 'none';
        }
    }
}
function ClosePanel(id) {
    $(id).style.display = 'none';
}
//ShowPanel('<%=this.BdtUrl %>','divAnswerBdt',<%=CurrentLM_ID %>,<%=BdtID %>)
//ShowPanel('<%=this.BdtUrl %>','divAnswerBdt',<%=CurrentLM_ID %>,<%=dv1[j]["LT_ID"]%>,true)
function ShowPanel(bdturl, id, bdt_id, isIndex) {
    //bdturl = encodeURIComponent(bdturl);
    if (CurrentLM_ID > 0) {
        if (isIndex) {
            location = bdturl;
        } else {
            $(id).style.display = '';
        }
    }
    else {
        var sHtmlTip = '<div><a href="' + _UserCenterUrl + 'Login.aspx?BackUrl=' + bdturl + '">登录回答</a>，赢取积分，领取精彩宝贝吧！<br />不登录了，直接<a href="javascript:;" onclick="fnCloseMessageBox();$(\'' + id + '\').style.display = \'\';">匿名回答</a></div>';
        if (isIndex) {
            sHtmlTip = '<div><a href="' + _UserCenterUrl + 'Login.aspx?BackUrl=' + bdturl + '">登录回答</a>，赢取积分，领取精彩宝贝吧！<br />不登录了，直接<a href="' + bdturl + '">匿名回答</a></div>';
            fnShowMessageBox('您还未登录哦！', sHtmlTip, _UserCenterUrl + 'Login.aspx?BackUrl=' + bdturl, 'location.href=\'' + bdturl + '\'');
        }
        else {
            fnShowMessageBox('您还未登录哦！', sHtmlTip, _UserCenterUrl + 'Login.aspx?BackUrl=' + bdturl, 'fnCloseMessageBox();$(\'' + id + '\').style.display = \'\';');
        }
    }
}

function FavariteBdt(bdturl, iLT_ID, citycode) {
    var ajax = new Ajax();
    ajax.get(bdturl + '?ID=' + iLT_ID + '&flag=7&rnd=' + Math.round(Math.random() * 10000)
        , function(xmlObj) {
            if (xmlObj != null) {
                var sReturn = xmlObj.responseText;
                if (sReturn.indexOf("Login:") > -1) {
                    alert(sReturn.substr(6));
                    //var sCurrentUrl = encodeURIComponent(location.href);
                    // location.href = _UserCenterUrl + "Login.aspx?City=" + citycode + "&BackUrl=" + sCurrentUrl;
                }
                else if (sReturn.indexOf("Fail:") > -1) {
                    alert(sReturn.substr(5));
                }
                else {
                    alert(sReturn);
                    window.open(_UserCenterUrl + "BdtFavorite.aspx?City=" + citycode);
                }
            }
            else {
                alert('数据加载失败.');
            }
        }
    );
}
//PostContent($('formUpdateBdt'), '<%=Url.Action("UpdateBdt") %>?id=<%=BdtID%>&fckid=fckPostContent', $('divSupplyBdtContent'), 'fckPostContent', 'divUpdateBdt', 'pnlSupplyBdt')
//回答补充
function PostContent(oForm, url, obj, fckID, updatePanleID, showSupplyPanleID) {
    if (editor.getSource().length < 5) {
        alert("内容详细不能少于 5 个字");
        return;
    }
    var ajax = new Ajax();
    ajax.post(oForm
        , function(xmlObj) {
            if (xmlObj != null) {
                var sReturn = xmlObj.responseText;
                if (sReturn.indexOf("Fail:") > -1) {
                    alert(sReturn.substr(5));
                }
                else {
                    alert("提交成功");
                    obj.innerHTML = '  <div class="zjinfo"><ul><li class="ifo">问题补充 </li><li class="tbd">' + sReturn + '</li></ul></div>';
                    if ($("divSupplyBdtContent1") != undefined)
                        $("divSupplyBdtContent1").style.display = 'none';
                    $(updatePanleID).style.display = 'none';
                    $(showSupplyPanleID).style.display = '';
                }
            }
            else {
                alert('数据提交失败.');
            }
        }, url, 'post', fckID
    );
}
function GetBestAnswer(oForm, url, obj, fckID, getBestPanleID) {
    var ajax = new Ajax();
    ajax.post(oForm
        , function(xmlObj) {
            if (xmlObj != null) {
                var sReturn = xmlObj.responseText;
                if (sReturn.indexOf("失败") > -1) {
                    alert(sReturn);
                }
                else {
                    alert("提交成功");
                    obj.style.display = '';
                    obj.innerHTML = sReturn;
                    $(getBestPanleID).style.display = 'none';
                }
            }
            else {
                alert('数据提交失败.');
            }
        }, url, 'post', fckID
    );
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
/**********************************************
Ajax类
***********************************************/
function Ajax() {
    var xmlObj = false;
    var CBfunc, ObjSelf;
    ObjSelf = this;
    try { xmlObj = new XMLHttpRequest; }
    catch (e) {
        try { xmlObj = new ActiveXObject("MSXML2.XMLHTTP"); }
        catch (e2) {
            try { xmlObj = new ActiveXObject("Microsoft.XMLHTTP"); }
            catch (e3) { xmlObj = false; }
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
                    var content = $(FckEditorID).value;
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
    var name, pass, code;
    name = $('txtUserName');
    pass = $('txtPassword');
    code = $('txtVerifyCode');
    if (name.value == '') {
        name.focus();
        alert("请输入用户名。");
        return false;
    }
    if (pass.value == '') {
        pass.focus();
        alert("请输入密码。");
        return false;
    }
    if (code.value == '') {
        code.focus();
        alert("请输入验证码。");
        return false;
    }
    return true;
}


window.getNewSubmitForm = function() {
    var submitForm = document.createElement("FORM");
    window.document.body.appendChild(submitForm);
    submitForm.method = "POST";
    return submitForm;
}
window.createNewFormElement = function(inputForm, elementName, elementValue) {
    var newElement = document.createElement("<input name='" + elementName + "' type='hidden'>");
    inputForm.appendChild(newElement);
    newElement.value = elementValue;
    return newElement;
}
window.PostRequest = function(actionUrl, paras) {
    var submitForm = getNewSubmitForm();
    for (i in paras) {
        var _propertyName = i.toString();
        var _propertyValue = paras[_propertyName];
        createNewFormElement(submitForm, _propertyName, _propertyValue);
    }
    submitForm.action = actionUrl;
    submitForm.submit();
}