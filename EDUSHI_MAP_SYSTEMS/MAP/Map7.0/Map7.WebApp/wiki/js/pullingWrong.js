
var pwedatacenterurl;
var pwdomain;
var pwcityCode;
var pwuserCenterUrl;
var pwWebRootPath;
var pwGoogleID;
function fnOnload() {
    var oid = fnRequest('oid');
    var oname = fnRequest('oname');
    var x = fnRequest('x');
    var y = fnRequest('y');
    pwedatacenterurl = $('hidEDataCenterUrl').value;
    pwdomain = $('hidDomain').value;
    pwcityCode = $('hidCityCode').value;
    pwuserCenterUrl = $('hidUserCenterUrl').value;
    pwWebRootPath = $('hidWebRootPath').value;
    pwGoogleID = $('hidGoogleID').value;
    //加载对象
    if (typeof vEdushiMap == 'undefined' || typeof vEdushiMap.Body.NewMapLayer != 'function') {
        setTimeout('fnOnload()', 50);
        return;
    }
    $('wrongEnitName').innerHTML = unescape(oname);
    fnCheckUserLoginInit(pwedatacenterurl, pwcityCode); //获取用户信息
    if (oname == '') { oname = '关于这里我要纠错'; }
    InitShowIcoPop(unescape(oname), x, y);
    googleStatInit();
}
function StartGetReportCoords() {
    if (parent.fnStartGetReportCoords()) {
        if ($('strongPlaceSelect').innerHTML == '已选择') {
            $('strongPlaceSelect').innerHTML = '未选择';
        }
        $('imgGetReportCoords').src = $('imgGetReportCoords').src.replace('ReMapAc.gif', 'ToMapRope.gif');
        // $('hidCoords').value = '';
    }
}

function EndGetReportCoords(coords) {
    if ($('strongPlaceSelect').innerHTML == '未选择') {
        $('strongPlaceSelect').innerHTML = '已选择';
    }
    $('imgGetReportCoords').src = $('imgGetReportCoords').src.replace('ToMapRope.gif', 'ReMapAc.gif');
    // $('hidCoords').value = coords;
}

function checkReportData() {
    if ($('txtTitle').value == '') {
        alert('揪错标题不能为空');
        $('txtTitle').focus();
        return false;
    }
    if ($('txtContent').value == '') {
        alert('揪错内容不能为空');
        $('txtContent').focus();
        return false;
    }
}
//获取用户信息
function fnCheckUserLoginInit(edatacenterUrl,cityCode) {

    if ($('liLoginInfo').innerHTML == '') {
        //用JS获取用户的昵称
        var cc = new CookieHelper();
        var cookieNickNameCookie = cc.getCookie('MemberNickName');
        if (cookieNickNameCookie != null) {
            $('userCent').style.display = "block";
            $('liLoginInfo').innerHTML = '欢迎您！<span style="color:#ff6400">' + cookieNickNameCookie + '</span><span>[<a href="' + pwedatacenterurl + 'Index.aspx?city=' + pwcityCode + '" target="_blank">我的E都市</a>]</span>&nbsp;<span>[<a href="javascript:fnLoginOut();">退出</a>]</span>';
        }
        else {            
            $('liLoginInfo').innerHTML = '欢迎您！<span>[<a href="http://my.edushi.com/Register.aspx" target="_blank" title="注册">注册</a>]</span><span>[<a href="javascript:;" onclick="fnShowLogin();pageTracker._trackEvent(\'Map5.2\', \'Mater_UI\', \'登录\'); ">登录</a>]</span>';
        }
    }
}
function InitShowIcoPop(name, x, y) {
    vM = vEdushiMap;
    if (x && y && x != '' && y != '') {
        if (x != 0 && y != 0) {
            vM.MoveTo(x * 1, y * 1, true);
            appendShopCenter(name, x * 1, y * 1);
        }

    }
}
function appendShopCenter(liveinName, x, y) {
    var _ShopCenterLayer = vEdushiMap.NewMapLayer('LiveInIcon', 269, true);
    var divShopCenter = vEdushiMap.$C('div');
    divShopCenter.id = '_mapLiveIn';
    var sDiv = '<div><div><div style="float:left;min-width:100px;width:auto;_width:100px;_white-space:nowrap;background-image:url(images/ecomplay/eshop_mark_bg.gif);border-left:solid 1px #ffae69; border-right:solid 1px #ffae69;font-size:12px; color:#FFFFFF; text-align:center; padding:4px 4px 0px 4px;">' + liveinName + '</div><div style="clear:both;margin-left:50px;width:12px; height:14px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'images/ecomplay/eshop_mark_bottom.png\',sizingMethod=\'image\'); margin-top:-1px; background-repeat:no-repeat;"><!--[if !IE]><!--><img height="12px" width="15" src="images/ecomplay/eshop_mark_bottom.png"/><!--<![endif]--></div></div></div>';
    divShopCenter.innerHTML = sDiv;
    vEdushiMap.appendEntity(divShopCenter, _ShopCenterLayer, false, x, y, 233, 50, 57, 33, false);
}
/*************登录部分*********************/
function fnShowLogin(logincallback) {
    if (logincallback) {
        _LoginCallback = logincallback;
    }
    else {
        _LoginCallback = null;
    }
    var h = fnGetWindowHeight();
    var w = fnGetWindowWidth();
    if (!$('divDialogBg')) {
        var div = $C('div');
        div.id = 'divDialogBg';
        div.style.backgroundColor = 'black';
        div.style.position = 'absolute';
        div.style.visibility = 'visible';
        div.style.filter = 'alpha(opacity=50)';
        div.style.opacity = '.50';
        div.style.zIndex = 100001;
        div.style.left = 0;
        div.style.top = 0;
        div.style.width = w + 'px';
        div.style.height = h + 'px';
        document.body.appendChild(div);
    }
    if (!$('divLoginDialog')) {
        var divLogin = $C('div');
        divLogin.id = 'divLoginDialog';
        divLogin.style.left = (w / 2 - 150) + 'px';
        divLogin.style.top = (h / 2 - 60) + 'px';
        divLogin.style.position = 'absolute';
        divLogin.style.zIndex = 100002;
        divLogin.style.width = '300px';
        divLogin.style.height = 'auto';
        var loginHtml = '<div class="LoginNavT"></div><div class="LoginNavD"><h3>用户登录</h3><table border="0" cellpadding="0" cellspacing="0"><tr><th>用户名：</th><td><input class="InFieldSty" onfocus="this.className=\'ThisStyle\';" onblur="this.className=\'InFieldSty\';" style="width:160px;" type="text" id="txtUserName"/></td></tr><tr><th>密码：</th><td><input class="InFieldSty" onfocus="this.className=\'ThisStyle\';" onblur="this.className=\'InFieldSty\';" style="width:160px;" type="password" id="txtPassword"/></td></tr><tr><th>验证码：</th><td><span><input onfocus="this.className=\'ThisStyle\';" onblur="this.className=\'InFieldSty\';" class="InFieldSty" style="width:67px;" type="text" id="txtVerifyCode"/></span><span style="padding-top:1px"><img id="imgVerifyCode" style="cursor:pointer" alt="单击获取新验证码" /></span></td></tr><tr><th>&nbsp;</th><td><span><input id="chkInvalidate" type="checkbox" name="chkInvalidate" /></span><span><label for="chkInvalidate">下次记住密码</label></span></td></tr><tr><th>&nbsp;</th><td><input type="image" src="/Images/LoginBtn1.gif" onclick="fnLogin()" />&nbsp;&nbsp;<img src="/Images/RegBtn1.gif" alt="注册" style="cursor:pointer;" onclick="window.open(\'' + pwuserCenterUrl + 'Register.aspx\',\'_blank\')" /></td></tr></table><div class="LoginClew" id="divLoginResultMsg"></div></div><div style="position:absolute; top:12px; right:8px; cursor:hand; width:13px; height:13px; overflow:hidden;background:url(/Images/CloseBtn.gif) no-repeat left top;" onclick="javascript:$(\'divDialogBg\').style.display=\'none\';$(\'divLoginDialog\').style.display=\'none\';" onmouseover="this.style.backgroundPosition=\'left -13px\'"onmouseout="this.style.backgroundPosition=\'left top\'" title="关闭窗口"></div></div>';
        document.body.appendChild(divLogin);
        //IE6的延时加载
        setTimeout(function() { $('divLoginDialog').innerHTML = loginHtml; }, 1);
    }
    setTimeout(function() {
        $('imgVerifyCode').src = '/VerifyImage.aspx?rnd=' + $Rnd();
        $('divLoginResultMsg').style.display = 'none';
        $('divDialogBg').style.display = 'block';
        $('divLoginDialog').style.display = 'block';
        $('imgVerifyCode').onclick = function() { this.src = '/VerifyImage.aspx?rnd=' + $Rnd(); };
        $('txtUserName').focus();
    }, 10);
}
function fnLogin() {
    var sUserName = $('txtUserName').value.trim();
    var sPassword = $('txtPassword').value.trim();
    var sVerifyCode = $('txtVerifyCode').value.trim();
    var isInvalidate = $('chkInvalidate').checked;
    $('txtUserName').value = '';
    $('txtPassword').value = '';
    $('txtVerifyCode').value = '';
    $('chkInvalidate').checked = false;
    if (sUserName.length < 1 || sPassword.length < 1) {
        $('divLoginResultMsg').style.display = 'block';
        $('divLoginResultMsg').innerHTML = '用户名或者密码不能为空！';
        return;
    }
    var sLoginUrl = '/Login.aspx?verifycode=' + sVerifyCode + '&isinvalidate=' + isInvalidate + '&action=login&rnd=' + $Rnd() + '&username=' + sUserName + '&password=' + sPassword;
    ENetwork.DownloadScript(sLoginUrl, function() {
        if (typeof __LoginResult != 'undefined') {
            if (__LoginResult == 1) {
                fnLoginSuccess(__Member);
                if (_LoginCallback) {
                    _LoginCallback();
                    _LoginCallback = null;
                }
            }
            else if (__LoginResult == 0) {
                $('divLoginResultMsg').style.display = 'block';
                $('divLoginResultMsg').innerHTML = '登录失败，用户名或者密码错误！';
                $('imgVerifyCode').src ='/VerifyImage.aspx?rnd=' + $Rnd();
            }
            else if (__LoginResult == -1) {
                $('divLoginResultMsg').style.display = 'block';
                $('divLoginResultMsg').innerHTML = '登录失败，您输入的验证码不正确！';
                $('imgVerifyCode').src = '/VerifyImage.aspx?rnd=' + $Rnd();
            }
        }
        else {
            $('divLoginResultMsg').style.display = 'block';
            $('divLoginResultMsg').innerHTML = '登录失败！';
            $('imgVerifyCode').src = '/VerifyImage.aspx?rnd=' + $Rnd();
        }
    });
}
function fnLoginSuccess(memberInfo) {
    $('liLoginInfo').innerHTML = '欢迎您！<span style="color:#ff6400">' + memberInfo.LM_NickName + '</span><span>[<a href="' + pwuserCenterUrl + 'Index.aspx?city=' + pwcityCode + '" target="_blank">我的E都市</a>]</span>&nbsp;<span>[<a href="javascript:fnLoginOut();">退出</a>]</span>';
    $('divLoginDialog').style.display = 'none';
    fnShowMessageBox('用户登录', '登录成功！欢迎回来' + memberInfo.LM_NickName);
}
function fnLoginOut() {
    var sLoginUrl ='/Login.aspx?action=loginout&rnd=' + $Rnd();
    ENetwork.DownloadScript(sLoginUrl, function() {
        if (typeof __LoginResult != 'undefined') {
            if (__LoginResult == 3) {
                fnLoginOutSuccess();
            }
            else {
                fnShowMessageBox('退出登录', '退出登录失败' + __LoginResult);
            }
        }
        else {
            fnShowMessageBox('退出登录', '退出登录失败');
        }
    });
}
function fnLoginOutSuccess() {
    $('liLoginInfo').innerHTML = '欢迎您！&nbsp;<span>[<a href="' + pwuserCenterUrl + 'Register.aspx" target="_blank">注册</a>]</span>&nbsp;<span>[<a href="javascript:;" onclick="fnShowLogin()">登录</a>]</span>';
    //fnShowMessageBox('退出登录','您已经成功退出');
}

function googleStatInit() {
    ENetwork.DownloadScript('http://www.google-analytics.com/ga.js', function() {
    if (typeof _gat != 'undefined') {
            pageTracker = _gat._getTracker(pwGoogleID);
            pageTracker._initData();
            pageTracker._trackPageview();
        }
    });
}
