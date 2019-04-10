var ecedatacenterurl;
var ecdomain;
var eccityCode;
var ecuserCenterUrl;
var ecWebRootPath;
var ecGoogleID; 
function JoinTypeSelect(type) {
    switch (type) {
        case 'EShop':
            $('liEShop').className = 'Current';
            $('liCompany').className = '';
            $('tableEShop').style.display = 'block';
            $('tableCompany').style.display = 'none';
            break;
        case 'Company':
            $('liEShop').className = '';
            $('liCompany').className = 'Current';
            $('tableEShop').style.display = 'none';
            $('tableCompany').style.display = 'block';
            break;
    }
}
function FloorBlur() {
    if(parent._CurrentSpot) {
        parent._CurrentSpot.CurrentFloor = parseInt($('txtFloor').value);
        parent.fnDrawFloorBuildUnitToPoly();
    }
                            
}
function StartGetBuild() {
    $('strongBuildSelect').innerHTML = '未选择';
    $('imgGetBuild').src = $('imgGetBuild').src.replace('ReMapAc.gif', 'ToMapRope.gif');
    $('hidOwnerID').value = '';
    $('hidOwnerName').value = '';
    $('hidGSM_BuildingID').value = '';
    $('hidGSM_BuildingKey').value = '';
    parent.fnStartGetBuild();
}

function EndGetBuild(id, name, floor, gsmid, gsmkey) {
    name = unescape(name);
    $('strongBuildSelect').innerHTML = '已选择(' + name + ')';
    $('hidOwnerID').value = id;
    $('hidOwnerName').value = name;
    $('hidGSM_BuildingID').value = gsmid;
    $('hidGSM_BuildingKey').value = gsmkey;
}

function StartGetUnitCoords() {
    if (parent.fnStartGetUnitCoords()) {
        $('strongUnitSelect').innerHTML = '未选择';
        $('imgGetUnitCroods').src = $('imgGetUnitCroods').src.replace('ReMapAc2.gif', 'ToMapRope2.gif');
        $('hidCoords').value = '';
    }
}
function EndGetUnitCoords(coords) {
    $('strongUnitSelect').innerHTML = '已选择';
    $('imgGetUnitCroods').src = $('imgGetUnitCroods').src.replace('ToMapRope2.gif', 'ReMapAc2.gif');
   // $('hidCoords').value = coords;
}
function JoinSuccess() {
    parent.fnShowMessageBox('申请成功', '恭喜您,申请成功！<br />工作人员将在3个工作日内电话联系您。');
    window.close();
}
function fnOnload() {
    var oid = fnRequest('oid');
    var oname = fnRequest('oname');
    var x = fnRequest('x');
    var y = fnRequest('y');
    ecedatacenterurl = $('hidEDataCenterUrl').value;
    eclanguage = $('hidLanguage').value;
    ecdomain = $('hidDomain').value;
    eccityCode = $('hidCityCode').value;
    ecuserCenterUrl = $('hidUserCenterUrl').value;
    ecWebRootPath = $('hidWebRootPath').value;
    ecGoogleID = $('hidGoogleID').value;
    //加载对象
    if (typeof vEdushiMap == 'undefined') {
        setTimeout('fnOnload()', 50);
        return;
    }
    if (oname != "") {
        EndGetBuild(oid, oname, 1);        
        InitShowIcoPop(unescape(oname), x, y);
    }
    loaddata();
    fnCheckUserLoginInit(ecedatacenterurl, eccityCode); //获取用户信息
    googleStatInit();
    vEdushiMap.ViewPlots(false, 'ad');
}
var ComType = [], TradeType = [], FirstZoneType = [], SecondZoneTyp = [];
function loaddata() {
    var url = ecedatacenterurl+"MapData/Map7.0/ALLTypeInfo.aspx?citycode="+eccityCode+"&l="+eclanguage;
    ENetwork.DownloadScript(url, function() {
        if (typeof _ComType != null && _ComType.length > 0) {
            ComType = _ComType;
            for (var i = 0; i < _ComType.length; i++) {
                document.getElementById("dplBIC_BigType").options.add(new Option(_ComType[i].Name, _ComType[i].ID));
            }
        }

        if (typeof _TradeType != null && _TradeType.length > 0) {
            TradeType = _TradeType;
            for (var i = 0; i < _TradeType.length; i++) {
                document.getElementById("ddlBigTradeType").options.add(new Option(_TradeType[i].Name, _TradeType[i].ID));
            }
        }

        if (typeof _FirstZoneType != null && _FirstZoneType.length > 0) {
            FirstZoneType = _FirstZoneType;
            SecondZoneTyp = _SecondZoneType;
            for (var i = 0; i < _FirstZoneType.length; i++) {
                document.getElementById("ddlBigZoneType").options.add(new Option(_FirstZoneType[i].Name, _FirstZoneType[i].ID));
            }
        }
    });
}

function changComdata(data) {
    document.getElementById("dplBIC_SmallType").innerHTML = "";
    if (data == -1) {
        document.getElementById("dplBIC_SmallType").options.add(new Option("=请选择=", -1));
        return;
    }
    var temp = [];
    for (var j = 0; j < ComType.length; j++) {
        if (data == ComType[j].ID) {
            temp = ComType[j].Value;
            break;
        }
    }
    document.getElementById("dplBIC_SmallType").options.add(new Option("=请选择=", -1));
    if (temp.length > 0) {
        for (var i = 0; i < temp.length; i++) {
            document.getElementById("dplBIC_SmallType").options.add(new Option(temp[i].Name, temp[i].ID));
        }
    }
}

function changTradedata(data) {
    document.getElementById("ddlSmallTradeType").innerHTML = "";
    if (data == -1) {
        document.getElementById("ddlSmallTradeType").options.add(new Option("=请选择=", -1));
        return;
    }
    var temp = [];
    for (var j = 0; j < TradeType.length; j++) {
        if (data == TradeType[j].ID) {
            temp = TradeType[j].Value;
            break;
        }
    }
    document.getElementById("ddlSmallTradeType").options.add(new Option("=请选择=", -1));
    if (temp.length > 0) {
        for (var i = 0; i < temp.length; i++) {
            document.getElementById("ddlSmallTradeType").options.add(new Option(temp[i].Name, temp[i].ID));
        }
    }
}

function changFristdata(data) {
    document.getElementById("ddlMidZoneType").innerHTML = "";
    if (data == -1) {
        document.getElementById("ddlMidZoneType").options.add(new Option("=请选择=", -1));
    }
    document.getElementById("ddlSmallZoneType").innerHTML = "";
    document.getElementById("ddlSmallZoneType").options.add(new Option("=请选择=", -1));
    var temp = [];
    for (var j = 0; j < FirstZoneType.length; j++) {
        if (data == FirstZoneType[j].ID) {
            temp = FirstZoneType[j].Value;
            break;
        }
    }
    if (temp.length > 0) {
        document.getElementById("ddlMidZoneType").options.add(new Option("=请选择=", -1));
        for (var i = 0; i < temp.length; i++) {
            document.getElementById("ddlMidZoneType").options.add(new Option(temp[i].Name, temp[i].ID));
        }
    }
}

function changSeconddata(data) {
    document.getElementById("ddlSmallZoneType").innerHTML = "";
    if (data == -1) {
        document.getElementById("ddlSmallZoneType").options.add(new Option("=请选择=", -1));
        return;
    }
    var temp = [];
    for (var j = 0; j < SecondZoneTyp.length; j++) {
        if (data == SecondZoneTyp[j].ID) {
            temp = SecondZoneTyp[j].Value;
            break;
        }
    }
    if (temp.length > 0) {
        document.getElementById("ddlSmallZoneType").options.add(new Option("=请选择=", -1));
        for (var i = 0; i < temp.length; i++) {
            document.getElementById("ddlSmallZoneType").options.add(new Option(temp[i].Name, temp[i].ID));
        }
    }
}

function checkEShopData() {

    if ($('hidOwnerID').value == "") {
        alert('请选择入驻建筑');
        return false;
    }
    if ($('txtCompanyName').value == "") {
        alert('E店名称必须填写');
        $('txtCompanyName').focus();
        return false;
    }
    if ($('ddlSmallTradeType').value == -1 || $('ddlSmallTradeType').value == "") {
        alert('必须选择行业');
        $('ddlSmallTradeType').focus();
        return false;
    }
    var regTel = new RegExp("^(\\d{3,4}(-|—)?\\d{7,8}(,|，)?)+$", "ig");
    if (!regTel.test($('txtTel').value)) {
        alert('必须填写正确联系电话!');
        $('txtTel').focus();
        return false;
    }
    var regMobileNum = new RegExp("^\\d{11}$", "ig");
    if (!regMobileNum.test($('txtMobile').value)) {
        alert('请填写正确的手机号码!');
        $('txtMobile').focus();
        return false;
    }
    if ($('txtLinkMan').value == "") {
        alert('联系人必须填写!');
        $('txtLinkMan').focus();
        return false;
    }

    if ($('txtAddress').value == "") {
        alert('地址必须填写!');
        $('txtAddress').focus();
        return false;
    }


        
    return true;
}

function cmCreateXMLHTTP() {
    var objXMLHTTP = null;
    if (window.XMLHttpRequest) {
        objXMLHTTP = new XMLHttpRequest();

    } else if (window.ActiveXObject) {
        objXMLHTTP = new ActiveXObject("Microsoft.XMLHTTP");

    }
    return objXMLHTTP;
}

function checkCompanyData() {
    if ($('hidOwnerID').value == "") {
        alert('请选择入驻建筑');
        return false;
    }
    if ($('txtBIC_CompanyName').value == "") {
        alert('企业名称必须填写!');
        $('txtBIC_CompanyName').focus();
        return false;
    }
    if ($('dplBIC_SmallType').value == -1 || $('dplBIC_SmallType').value == "") {
        alert('必须选择企业小类!');
        $('dplBIC_SmallType').focus();
        return false;
    }
    //alert($('txtBIC_Tel').value);
    var regTel = new RegExp("^(\\d{3,4}(-|—)?\\d{7,8}(,|，)?)+$", "ig");
    if (!regTel.test($('txtBIC_Tel').value)) {
        alert('必须填写正确联系电话 区号加电话号码（0571-88888888）!');
        $('txtBIC_Tel').focus();
        return false;
    }
    if ($('txtBIC_Address').value == "") {
        alert('通讯地址必须填写!');
        $('txtBIC_Address').focus();
        return false;
    }
    if ($('txtBIC_LinkMan').value == "") {
        alert('企业联系人必须填写!');
        $('txtBIC_LinkMan').focus();
        return false;
    }
    if ($('txtBIC_Fax').value != "") {
        var regFax = new RegExp("^(\\d{3,4}-\\d{7,8})+$", "ig");
        if (!regFax.test($('txtBIC_Fax').value)) {
            alert('请填写正确的传真!');
            $('txtBIC_Fax').focus();
            return false;
        }
    }
    if ($('txtBIC_Post').value != "") {
        var regPost = new RegExp("^\\d{6}$", "ig");
        if (!regPost.test($('txtBIC_Post').value)) {
            alert('请填写正确的邮编!');
            $('txtBIC_Post').focus();
            return false;
        }
    }
    if ($('txtBIC_Internet').value != "") {
        var regInternet = new RegExp("^http(s)?:\/\/([\\w-]+\.)+[\\w-]+(\/[\\w- \.\/\?%&=#]*)?$", "ig");
        if (!regInternet.test($('txtBIC_Internet').value)) {
            alert('请填写正确的网址!');
            $('txtBIC_Internet').focus();
            return false;
        }
    }
    if ($('txtBIC_Email').value != "") {
        var regEmail = new RegExp("^[\\w-]+(\.[\\w-]+)*@[\\w-]+(\.[\\w-]+)+$", "ig");
        if (!regEmail.test($('txtBIC_Email').value)) {
            alert('请填写正确的油箱!');
            $('txtBIC_Email').focus();
            return false;
        }
    }
    if ($('txtBIC_MobileNum').value != "") {
        var regMobileNum = new RegExp("^\\d{11}$", "ig");
        if (!regMobileNum.test($('txtBIC_MobileNum').value)) {
            alert('请填写正确的手机号码!');
            $('txtBIC_MobileNum').focus();
            return false;
        }
    }
    return true;
}
//获取用户信息
function fnCheckUserLoginInit(edatacenterurl, cityCode) {


    //用JS获取用户的昵称
    var cc = new CookieHelper();
    var cookieNickNameCookie = cc.getCookie('MemberNickName');
    if (cookieNickNameCookie != null) {
        $('liLoginInfo').innerHTML = '欢迎您！<span style="color:#ff6400">' + unescape(cookieNickNameCookie) + '</span><span>[<a href="' + ecedatacenterurl + 'Index.aspx?city=' + eccityCode + '" target="_blank">我的E都市</a>]</span>&nbsp;<span>[<a href="javascript:fnLoginOut();">退出</a>]</span>';
    }
    else {
        $('liLoginInfo').innerHTML = '欢迎您！<span>[<a href="http://my.edushi.com/Register.aspx" target="_blank" title="注册">注册</a>]</span><span>[<a href="javascript:;" onclick="fnShowLogin();pageTracker._trackEvent(\'Map5.2\', \'Mater_UI\', \'登录\'); ">登录</a>]</span>';
    }
}
function InitShowIcoPop(name,x,y) {   
    vM = vEdushiMap;
    if (x && y && x != '' && y != '') {
        vM.MoveTo(x * 1, y * 1, true);
        appendShopCenter(name,x * 1, y * 1);        
    }
}
function appendShopCenter(liveinName, x, y) {
    var _ShopCenterLayer = vEdushiMap.NewMapLayer('LiveInIcon', 269, true);
    var divShopCenter = vEdushiMap.$C('div');
    divShopCenter.id = '_mapLiveIn';
    var sDiv = '<div><div><div style="float:left;min-width:100px;width:auto;_width:100px;_white-space:nowrap;background-image:url(images/ecomplay/eshop_mark_bg.gif);border-left:solid 1px #ffae69; border-right:solid 1px #ffae69;font-size:12px; color:#FFFFFF; text-align:center; padding:4px 4px 0px 4px;">' + liveinName + '</div><div style="clear:both;margin-left:50px;width:12px; height:14px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'images/ecomplay/eshop_mark_bottom.png\',sizingMethod=\'image\'); margin-top:-1px; background-repeat:no-repeat;"><!--[if !IE]><!--><img height="12px" width="15" src="images/ecomplay/eshop_mark_bottom.png"/><!--<![endif]--></div></div></div>'; 
    divShopCenter.innerHTML = sDiv;
    vEdushiMap.AppendEntity(divShopCenter, _ShopCenterLayer, false, x, y, 233, 50, 57, 33, false);
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
        var loginHtml = '<div class="LoginNavT"></div><div class="LoginNavD"><h3>用户登录</h3><table border="0" cellpadding="0" cellspacing="0"><tr><th>用户名：</th><td><input class="InFieldSty" onfocus="this.className=\'ThisStyle\';" onblur="this.className=\'InFieldSty\';" style="width:160px;" type="text" id="txtUserName"/></td></tr><tr><th>密码：</th><td><input class="InFieldSty" onfocus="this.className=\'ThisStyle\';" onblur="this.className=\'InFieldSty\';" style="width:160px;" type="password" id="txtPassword"/></td></tr><tr><th>验证码：</th><td><span><input onfocus="this.className=\'ThisStyle\';" onblur="this.className=\'InFieldSty\';" class="InFieldSty" style="width:67px;" type="text" id="txtVerifyCode"/></span><span style="padding-top:1px"><img id="imgVerifyCode" style="cursor:pointer" alt="单击获取新验证码" /></span></td></tr><tr><th>&nbsp;</th><td><span><input id="chkInvalidate" type="checkbox" name="chkInvalidate" /></span><span><label for="chkInvalidate">下次记住密码</label></span></td></tr><tr><th>&nbsp;</th><td><input type="image" src="/Images/LoginBtn1.gif" onclick="fnLogin()" />&nbsp;&nbsp;<img src="/Images/RegBtn1.gif" alt="注册" style="cursor:pointer;" onclick="window.open(\'' + ecuserCenterUrl + 'Register.aspx\',\'_blank\')" /></td></tr></table><div class="LoginClew" id="divLoginResultMsg"></div></div><div style="position:absolute; top:12px; right:8px; cursor:hand; width:13px; height:13px; overflow:hidden;background:url(/Images/CloseBtn.gif) no-repeat left top;" onclick="javascript:$(\'divDialogBg\').style.display=\'none\';$(\'divLoginDialog\').style.display=\'none\';" onmouseover="this.style.backgroundPosition=\'left -13px\'"onmouseout="this.style.backgroundPosition=\'left top\'" title="关闭窗口"></div></div>';
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
                $('imgVerifyCode').src = '/VerifyImage.aspx?rnd=' + $Rnd();
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
    $('liLoginInfo').innerHTML = '欢迎您！<span style="color:#ff6400">' + unescape(memberInfo.LM_NickName) + '</span><span>[<a href="' + ecuserCenterUrl + 'Index.aspx?city=' + eccityCode + '" target="_blank">我的E都市</a>]</span>&nbsp;<span>[<a href="javascript:fnLoginOut();">退出</a>]</span>';
    $('divLoginDialog').style.display = 'none';
    fnShowMessageBox('用户登录', '登录成功！欢迎回来' + memberInfo.LM_NickName);
}
function fnLoginOut() {
    var sLoginUrl = '/Login.aspx?action=loginout&rnd=' + $Rnd();
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
    $('liLoginInfo').innerHTML = '欢迎您！&nbsp;<span>[<a href="' + ecuserCenterUrl + 'Register.aspx" target="_blank">注册</a>]</span>&nbsp;<span>[<a href="javascript:;" onclick="fnShowLogin()">登录</a>]</span>';
    //fnShowMessageBox('退出登录','您已经成功退出');
}

function googleStatInit() {

    ENetwork.DownloadScript('http://www.google-analytics.com/ga.js', function() {
        if (typeof _gat != 'undefined') {
            pageTracker = _gat._getTracker(ecGoogleID);
            pageTracker._initData();
            pageTracker._trackPageview();
        }
    });
}