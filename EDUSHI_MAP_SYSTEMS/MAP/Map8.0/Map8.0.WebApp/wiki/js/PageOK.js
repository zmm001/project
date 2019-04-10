window.onload = fnOnload;
function fnOnload() {
    var oname = fnRequest('oname');
    var x = fnRequest('x');
    var y = fnRequest('y');
    var edatacenterurl = $('hidEDataCenterUrl').value;
    var cityCode = $('hidCityCode').value;

    //加载对象
    if (typeof vEdushiMap == 'undefined') {
        setTimeout('fnOnload()', 50);
        return;
    }
    fnCheckUserLoginInit(edatacenterurl, cityCode); //获取用户信息
    InitShowIcoPop(unescape(oname), x, y);
}
//获取用户信息
function fnCheckUserLoginInit(edatacenterurl, cityCode) {

    if ($('liLoginInfo').innerHTML == '') {
        //用JS获取用户的昵称
        var cc = new CookieHelper();
        var cookieNickNameCookie = cc.getCookie('MemberNickName');
        if (cookieNickNameCookie != null) {
            //$('userCent').style.display = "block";
            $('liLoginInfo').innerHTML = '欢迎您！<span style="color:#ff6400">' + unescape(cookieNickNameCookie) + '</span><span>[<a href="' + edatacenterurl + 'Index.aspx?city=' + cityCode + '" target="_blank">我的E都市</a>]</span>&nbsp;<span>[<a href="javascript:fnLoginOut();">退出</a>]</span>';
        }
        else {
            $('liLoginInfo').innerHTML = '欢迎您！<span>[<a href="http://my.edushi.com/Register.aspx" target="_blank" title="注册">注册</a>]</span><span>[<a href="javascript:;" onclick="fnShowLogin();pageTracker._trackEvent(\'Map5.2\', \'Mater_UI\', \'登录\'); ">登录</a>]</span>';
        }
    }
}
function InitShowIcoPop(name, x, y) {
    vM = vEdushiMap;
    if (x && y && x != '' && y != '') {
        vM.MoveTo(x * 1, y * 1, true);
        appendShopCenter(name, x * 1, y * 1);

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