//创建一个页面内嵌地图IFRAME
function CreateMapIframe(src) {
    CreatBackground();
    if (!document.getElementById('Map_Loading')) {
        var Map_Loading = document.createElement('div');
        var LoadingLeft = (fnGetWindowWidth() - 200) / 2 + 'px';
        Map_Loading.id = 'Map_Loading';
        if (document.all) {
            Map_Loading.style.cssText = 'border-right: #82aad2; border-top: #82aad2 ; z-index: 10001; left:' + LoadingLeft + '; border-left: #82aad2 ; width: 200px; border-bottom: #82aad2;position: absolute;top:250px;height: 50px; background-color: #ffffff;';
        }
        else {
            Map_Loading.setAttribute('style', 'border-right: #82aad2; border-top: #82aad2 ; z-index: 10001; left:' + LoadingLeft + '; border-left: #82aad2 ; width: 200px; border-bottom: #82aad2;position: absolute;top:250px;height: 50px; background-color: #ffffff');
        }
        document.body.appendChild(Map_Loading);
        var sWaiting = '<table width="100%" height="100%" align="center" style="text-decoration: none;border:#82AAD2 solid;border-width:1 1 1 1;" cellpadding="0" cellspacing="0" border="0"><tr>';
        sWaiting += '<td align="center" style="border:#ffffff solid;border-width:0 1 1 0;text-decoration: none;padding: 2 5 2 5;background-color:F8F9FD;text-align: center;line-height:20px;font-size:12px;font-weight:bold;color: #666666;">所属建筑地图加载中，请稍等.....';
        sWaiting += '<marquee id="LoadMarquee" style="border:1px solid #82AAD2" behavior="scroll" direction="right" width="200" scrollamount="3" scrolldelay="10" bgcolor="#ffffff">';
        sWaiting += '<table cellspacing="0" border="0">';
        sWaiting += '<tr height=8><td bgcolor=#D4DDEC width=8></td>';
        sWaiting += '<td></td><td bgcolor=#C1D1E0 width=8></td>';
        sWaiting += '<td></td><td bgcolor=#9AAFD3 width=8></td>';
        sWaiting += '<td></td><td bgcolor=#6F8DC0 width=8></td>';
        sWaiting += '<td></td><td bgcolor=#6F8DC0 width=8></td>';
        sWaiting += '<td></td><td bgcolor=#6F8DC0 width=8></td>';
        sWaiting += '<td></td><td bgcolor=#6F8DC0 width=8></td>';
        sWaiting += '<td></td><td bgcolor=#9AAFD3 width=8></td>';
        sWaiting += '<td></td><td bgcolor=#C1D1E0 width=8></td>';
        sWaiting += '<td></td><td bgcolor=#D4DDEC width=8></td>';
        sWaiting += '<td></td></tr></table></marquee></td></tr>';
        sWaiting += '</table>';
        Map_Loading.innerHTML = sWaiting;
    }
    else {
        document.getElementById('Map_Loading').style.display = '';
    }

    var id = 'MyEdushiHuiMap';
    realsrc = src; //+'?w='+fnGetWindowWidth()+'&h='+fnGetWindowHeight();
    if (!document.getElementById(id)) {
        //setTimeout("appendMapIframe()",1000);
        appendMapIframe();
    }
    else {
        if (document.getElementById(id).src.indexOf(realsrc) < 0) {
            document.getElementById(id).src = realsrc;
            if (document.all) {
                document.getElementById(id).attachEvent("onload", function () { document.getElementById(id).style.display = ''; });
            }
            else {
                document.getElementById(id).onload = function () { document.getElementById(id).style.display = ''; }
            }
        }
        else {
            document.getElementById(id).style.display = '';
        }
    }

}
function appendMapIframe() {

    var createIframe = document.createElement('iframe');
    createIframe.id = 'MyEdushiHuiMap';
    createIframe.frameBorder = '0';
    createIframe.scrolling = "no";
    createIframe.style.position = 'absolute';
    createIframe.style.overflow = 'hidden';
    createIframe.allowTransparency = 'true';
    createIframe.style.width = fnGetWindowWidth() + 'px';
    createIframe.style.height = fnGetWindowHeight() + 'px';
    createIframe.style.left = (document.body.scrollWidth - fnGetWindowWidth()) / 2 + 'px';
    createIframe.style.top = '50px';
    createIframe.style.zIndex = '10002';
    createIframe.src = realsrc;
    document.body.appendChild(createIframe);
}
//隐藏内嵌的地图IFRAME
function CloseMapIframe() {
    var id = 'MyEdushiHuiMap';
    if (document.getElementById(id)) {
        //alert(1);
        document.getElementById(id).style.display = 'none';
        document.getElementById('Map_Loading').style.display = 'none';
    }
    //alert(2);
    CloseBackground();
}

function ChangeMapIframeSize() {
    var _iframe = document.getElementById("MyEdushiHuiMap");
    if (_iframe) {
        var w = fnGetWindowWidth();
        var h = fnGetWindowHeight();
        _iframe.style.width = w + 'px';
        _iframe.style.height = h + 'px';
        //if (_iframe.contentWindow) {
        _iframe.contentWindow.document.getElementById("Content").style.width = w + 'px';
        _iframe.contentWindow.document.getElementById("Content").style.height = h + 'px';
        //}

        if (document.getElementById("MyEdushiHuiMap").contentWindow.vM) {
            var vM = document.getElementById("MyEdushiHuiMap").contentWindow.vM;
            vM.MapHeight(h);
            vM.MapWidth(w);
        }
    }
}
window.onresize = function () {
    ChangeMapIframeSize();
}
function fnGetWindowWidth() {
    //var vh = 0;
    //var _dEt = document.documentElement;
    //var _dBx = document.body;
    //if (typeof window.innerWidth == 'number') vh = window.innerWidth;
    //else {
    //    if (_dEt && _dEt.clientWidth) vh = _dEt.clientWidth;
    //    else {
    //        if (_dBx && _dBx.clientWidth) vh = _dBx.clientWidth;
    //    }
    //}
    //if (!vh || vh < 100) vh = 100;
    //return vh;
    return 822;
}

function fnGetWindowHeight() {
    //var vh = 0;
    //var _dEt = document.documentElement;
    //var _dBy = document.body;
    //if (typeof window.innerHeight == 'number') vh = window.innerHeight;
    //else {
    //    if (_dEt && _dEt.clientHeight) vh = _dEt.clientHeight;
    //    else {
    //        if (_dBy && _dBy.clientHeight) vh = _dBy.clientHeight;
    //    }
    //}
    //if (!vh || vh < 100) vh = 100;
    //return vh;
    return 522;
}
//为没有实体的企业服务
function ChooseXY() {
    CreateMapIframe('MapPoint2.html?w=' + fnGetWindowWidth() + "&h=" + fnGetWindowHeight());
}
//有实体的
function ChooseOwner() {
    CreateMapIframe('MapPoint.html?w=' + fnGetWindowWidth() + "&h=" + fnGetWindowHeight()); //eshopurl + 
}
//实体ID选择回调
function GetOwnerID(oid, title) {
    $('#txtBuild').val(title);
    $('#txtBuildId').val(oid);
    CloseMapIframe();
    var cookie = new CookieHelper();
    cookie.setCookie($('#txtBuild').attr("id"), escape($('#txtBuild').val()));
    cookie.setCookie($('#txtBuildId').attr("id"), escape($('#txtBuildId').val()));
    $("#loc2").attr('checked', 'checked');
    $("#loc1").removeAttr('checked');
}
function GetXY(x, y) {
    $("#txtX").val(x);
    $("#txtY").val(y);
    CloseMapIframe();
    var cookie = new CookieHelper();
    cookie.setCookie("txtX", escape(x));
    cookie.setCookie("txtY", escape(y));
    $("#loc1").attr('checked', 'checked');
    $("#loc2").removeAttr('checked');
}
//创建一个背景
function CreatBackground() {
    if (!document.getElementById('Map_BG')) {
        var BG = document.createElement('div');
        BG.id = 'Map_BG';
        if (document.all) {
            BG.style.cssText = 'top:0px; left:0px; position:absolute; z-index:10000; background-color:#000000;filter:alpha(opacity=60); opacity:.6;';
        }
        else {
            BG.setAttribute('style', 'top:0px; left:0px; position:absolute; z-index:10000; background-color:#000000;filter:alpha(opacity=60); opacity:.6;');
        }
        BG.style.width = document.body.scrollWidth + 'px';
        BG.style.height = document.body.scrollHeight + 'px';
        document.body.appendChild(BG);
    }
    else {
        document.getElementById('Map_BG').style.display = '';
    }
}
//隐藏背景
function CloseBackground() {
    if (document.getElementById('Map_BG')) {
        document.getElementById('Map_BG').style.display = 'none';
    }
}

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

//------------------------------
function getDefaultOption() {
    var _o = new Option();
    _o.value = "0";
    _o.text = "请选择…";
    return _o;
}
jQuery(function () {
    debugger;
    var cookie = new CookieHelper();
    //记忆输入
    $("input:text").blur(function () {
        cookie.setCookie($(this).attr("id"), escape($(this).val()));
    })
    $("input:radio").blur(function () {
        cookie.setCookie($(this).attr("id"), escape($(this).attr("checked")));
    })
    $("textarea").blur(function () {
        cookie.setCookie($(this).attr("id"), escape($(this).val()));
    })
    //取出记忆
    $("input:text").each(function (i, o) {
        var cVal = cookie.getCookie($(o).attr("id"));
        if (cVal) {
            $(o).val(unescape(cVal));
        }
    })
    $("input:radio").each(function (i, o) {
        var cVal = cookie.getCookie($(o).attr("id"));
        if (cVal) {
            $(o).attr("checked", unescape(cVal));
        }
    })
    $("textarea").each(function (i, o) {
        var cVal = cookie.getCookie($(o).attr("id"));
        if (cVal) {
            $(o).val(unescape(cVal));
        }
    })
    $("input:hidden").each(function (i, o) {
        var cVal = cookie.getCookie($(o).attr("id"));
        if (cVal) {
            $(o).val(unescape(cVal));
        }
    })

    $("#ddlPositionType").change(function () {
        $("#position1").hide();
        $("#position2").hide();
        $("#position" + $(this).val()).show();
        cookie.setCookie($(this).attr("id"), escape($(this).val()));
    });
    var positionTypeVal = cookie.getCookie("ddlPositionType");
    if (positionTypeVal) {
        $("#ddlPositionType").val(positionTypeVal).change();
    }

//#region E店分类
    var _FirstType = document.getElementById("ddlTypeOne");
    if (!_FirstType) return;
    _FirstType.options.length = 0;
    _FirstType.options.add(getDefaultOption());
    
    $.each(NodeList, function (i, item) {
        var _o = new Option();
        _o.value = item["ID"];
        _o.text = item["Name"];
        _FirstType.options.add(_o);
    })
    $("#ddlTypeOne").change(function () {
        var _ddl = document.getElementById("ddlTypeTwo");
        _ddl.options.length = 0;
        _ddl.options.add(getDefaultOption());

        var _ThirdType = document.getElementById("ddlTypeThree");
        _ThirdType.options.length = 0;
        _ThirdType.options.add(getDefaultOption());
        _ThirdType.style.display = 'none';
        var _val = $(this).val();
        cookie.setCookie($(this).attr("id"), escape(_val));//记忆
        _ddl.style.display = _val > 0 ? 'inline' : 'none';
        var subval = cookie.getCookie("ddlTypeTwo");
        $.each(NodeList, function (i, item) {
            if (item["ID"] == _val) {
                $.each(item["SubNode"], function (i, item) {
                    var _o = new Option();
                    _o.value = item["ID"];
                    _o.text = item["Name"];
                    if (subval == item["ID"])
                        _o.selected = "selected";
                    _ddl.options.add(_o);
                })
            }
        });
    })
    $("#ddlTypeTwo").change(function () {
        var _ddl = document.getElementById("ddlTypeThree");
        _ddl.options.length = 0;
        _ddl.options.add(getDefaultOption());   

        var _val = $(this).val();
        _ddl.style.display = _val > 0 ? 'inline' : 'none';
        cookie.setCookie($(this).attr("id"), escape(_val));//记忆
        var subval = cookie.getCookie("ddlTypeThree"), _firstVal = $("#ddlTypeOne").val();

        $.each(NodeList, function (i, item) {
            if (item["ID"] == _firstVal) {
                $.each(item["SubNode"], function (i, item) {
                    if (item["ID"] == _val) {
                        $.each(item["SubNode"], function (i, item) {
                            var _o = new Option();
                            _o.value = item["ID"];
                            _o.text = item["Name"];
                            if (subval == item["ID"])
                                _o.selected = "selected";
                            _ddl.options.add(_o);
                        })
                    }
                })
            }
        });            
    })
    $("#ddlTypeThree").change(function () {
        cookie.setCookie($(this).attr("id"), escape($(this).val()));//记忆
    })
    var _first = cookie.getCookie("ddlTypeOne");
    if (_first > 0) {
        $("#ddlTypeOne").val(_first).change();
        if (cookie.getCookie("ddlTypeTwo") > 0) {
            $("#ddlTypeTwo").change();
        }
    }
//#endregion
   
})
function fnCheckFrom() {
    $('.error').removeClass('error');
    var c = $("#txtName");
    if ($.trim(c.val()) == '') {
        c.addClass('error');
        alert('【企业名称】不能为空');
        return false;
    }
    c = $("#ddlTypeOne")
    if (c.val() == "0") {
        c.addClass('error');
        alert('请选择【分类】');
        return false;
    }
    c = $("#ddlTypeTwo")
    if (c.val() == "0") {
        c.addClass('error');
        alert('请选择【子分类】');
        return false;
    }
    c = $("#ddlTypeThree")
    if (c.val() == "0") {
        c.addClass('error');
        alert('请选择【子分类】');
        return false;
    }
    c = $("#txtAddr");
    if ($.trim(c.val()) == '') {
        c.addClass('error');
        alert('【地址】不能为空');
        return false;
    }
    //位置
    if ($("#ddlPositionType").val() == '2') {
        c = $("#txtX");
        if ($.trim(c.val()) == '') {
            c.addClass('error');
            alert('【X坐标】不能为空');
            return false;
        }
        c = $("#txtY");
        if ($.trim(c.val()) == '') {
            c.addClass('error');
            alert('【Y坐标】不能为空');
            return false;
        }
    }
    if ($("#ddlPositionType").val() == '1') {
        c = $("#txtBuild");
        if ($.trim(c.val()) == '') {
            c.addClass('error');
            alert('【所属建筑】不能为空');
            return false;
        }
    }
    //
    c = $("#txtTel");
    if ($.trim(c.val()) == '') {
        c.addClass('error');
        alert('【企业电话】不能为空');
        return false;
    }
    c = $("#txtMan");
    if ($.trim(c.val()) == '') {
        c.addClass('error');
        alert('【企业联系人】不能为空');
        return false;
    }    
    c = $("#txtDealTrait");
    if ($.trim(c.val()) == '') {
        c.addClass('error');
        alert('【企业简介】不能为空');
        return false;
    }
    //c = $("#txtUname");
    //if ($.trim(c.val()) == '') {
    //    c.addClass('error');
    //    alert('【用户名】不能为空');
    //    return false;
    //}
    c = $("#txtMan2");
    if ($.trim(c.val()) == '') {
        c.addClass('error');
        alert('【联系人】不能为空');
        return false;
    }
    c = $("#txtTel2");
    if ($.trim(c.val()) == '') {
        c.addClass('error');
        alert('【电话】不能为空');
        return false;
    }
    //c = $("#fileLisence");
    //if ($.trim(c.val()) == '') {
    //    c.addClass('error');
    //    alert('请上传【营业执照】');
    //    return false;
    //} 
    //验证格式
    c = $("#txtTel");
    if (!c.val().match(/^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/)) {
        c.addClass('error');
        alert('请输入正确的电话号码');
        return false;
    }
    c = $("#txtFax");
    if ($.trim(c.val()) != '' && !c.val().match(/^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/)) {
        c.addClass('error');
        alert('请输入正确的传真');
        return false;
    }
    c = $("#txtPost");
    if ($.trim(c.val()) != '' && !c.val().match(/^[1-9]{1}(\d+){5}/)) {
        c.addClass('error');
        alert('请输入正确的邮编');
        return false;
    }
    c = $("#txtUrl");
    if ($.trim(c.val()) != '' && !c.val().match(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/)) {
        c.addClass('error');
        alert('请输入正确的网址');
        return false;
    }
    c = $("#txtMobile");
    if ($.trim(c.val()) != '' && !c.val().match(/^1[3|4|5|8][0-9]\d{8}$/)) {
        c.addClass('error');
        alert('请输入正确的手机号');
        return false;
    }
    c = $("#txtEmail");
    if ($.trim(c.val()) != '' && !c.val().match(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/)) {
        c.addClass('error');
        alert('请输入正确的Email地址');
        return false;
    }
}
   
