window.onload = function() {
    var sTitle = parent.__EAddressTitle;
    if (sTitle != '' && operatortype == 0) {
        if (parent.__CreateEAddressFromRightMouseDown) {
            ReGetPointer();
            parent.__CreateEAddressFromRightMouseDown = false;
        }
        else {
            ShowEAddressInfo(parent.__EAddressX, parent.__EAddressY, sTitle, parent.__EAddressContent, false);
        }
    }
};
function fnCopyMarkEAddress() {
    if ($('hx').value != '' && $('hy').value != '') {
        var sDomainUrl = Config.SkinPath + 'Fundation/EAddressHandle.aspx?operatortype=5&rnd=' + $Rnd(8);
        var ajax = new Ajax();
        ajax.post($('form1')
            , function(xmlObj) {
                if (xmlObj != null) {
                    var sReturn = xmlObj.responseText;
                    if (sReturn.indexOf("Fail:") > -1) {
                        alert(sReturn.substr(5));
                    }
                    else {
                        parent.fnCopyToClipboard(parent.GlobalConfig.EdizhiUrl + sReturn, '复制好了，发给我的QQ/MSN好友分享吧！');
                        parent._EAddressRegTab.destroy();
                    }
                }
                else {
                    alert('数据提交失败.');
                }
            }, sDomainUrl, 'post'
        );
    }
    else {
        alert('请先选择标记位置');
        parent._EAddress.Begin();
    }
}
function fnSaveMarkEAddress() {
    if ($('hx').value != '' && $('hy').value != '') {
        parent._EAddressOperatorType = 0;
        parent.fnShowLogin(parent.EAddressLoginCallback);
    }
    else {
        alert('请先选择标记位置');
        parent._EAddress.Begin();
    }
}
function GetRndName() {
    $('lnkRndNameTip').innerText = '不喜欢，重新选一个';
    var sDomainUrl = Config.SkinPath + 'Fundation/EAddressHandle.aspx?operatortype=4&rnd=' + $Rnd(8);
    ENetwork.DownloadScript(sDomainUrl, function() {
        if (typeof __RndResult != 'undefined' && __RndResult != '0') {
            $('txtEAddressName').value = __RndResult;
        }
    });
}
function CheckEAddress(id, name) {
    if (!new RegExp('^\s*[.A-Za-z0-9]{4,14}\s*$').test(name)) {
        $('hchecked').value = "0";
        $('divEAddressTip').className = 'ClewInfo2';
        $('divEAddressTip').innerHTML = 'E地址是由4-14位字符(包括英文字母、数字)';
        $('divEAddressTip').style.display = 'block';
        $('txtEAddressName').select();
        $('txtEAddressName').focus();
        return false;
    }
    var sVerifyUrl = Config.SkinPath + 'Fundation/EAddressHandle.aspx?operatortype=2&lmeid=' + id + '&eaddress=' + name;
    ENetwork.DownloadScript(sVerifyUrl, function() {
        if (typeof __VerifyResult != 'undefined') {
            if (__VerifyResult == 1) {
                $('divEAddressTip').className = 'ClewInfo1';
                $('divEAddressTip').innerHTML = '该E地址可以使用';
                $('hchecked').value = "1";
            }
            else if (__VerifyResult == 0) {
                $('divEAddressTip').className = 'ClewInfo2';
                $('divEAddressTip').innerHTML = '该地址名已被人占用，请选用其他地址名';
                $('hchecked').value = "0";
                $('txtEAddressName').select();
                $('txtEAddressName').focus();
            }
            else {
                $('divEAddressTip').className = 'ClewInfo2';
                $('divEAddressTip').innerHTML = 'E地址不能为空';
                $('divEAddressTip').style.display = 'block';
                $('hchecked').value = "0";
                $('txtEAddressName').select();
                $('txtEAddressName').focus();
            }
        }
        else {
            $('divEAddressTip').className = 'ClewInfo2';
            $('divEAddressTip').innerHTML = '验证失败,请提交到后台验证';
            $('hchecked').value = "1";
        }
        $('divEAddressTip').style.display = 'block';
    });
}
function RedirectCity(type, citycode) {
    var sDomainUrl = Config.SkinPath + 'Fundation/EAddressHandle.aspx?operatortype=3&citycode=' + citycode + '&rd=' + Math.round(Math.random() * 10000);
    ENetwork.DownloadScript(sDomainUrl, function() {
        if (typeof __Domain != 'undefined' && __Domain != '') {
            if (type == 0) {
                top.location.href = 'http://' + __Domain + '/?EAddressRegister=1';
            }
            else {
                top.location.href = 'http://' + __Domain + '/?EAddressManager=1';
            }
        }
    });
}
function ReGetPointer() {
    parent.__EAddressX = 0;
    parent.__EAddressY = 0;
    parent.__EAddressTitle = '';
    parent.__EAddressContent = '';
    $('hx').value = '';
    $('hy').value = '';
    $('htitle').value = '';
    $('hcontent').value = '';
    $('divEAddressInfo').innerHTML = '';
    $('divEAddressInfo').style.display = 'none';
    parent._EAddressStatus = operatortype;
    parent._EAddress.Begin();
}
function GetPointer() {
    parent._EAddressStatus = operatortype;
    parent._EAddress.Begin();
}
function StartGetEAddressPoint() {
    if (!parent._IsBeginSelectEAddress) {
        parent._IsBeginSelectEAddress = true;
        var tip = '<div style="height:15px; line-height:15px; border:1px solid #1A70C7; background:#fff; padding:0 4px 0 4px;filter:alpha(opacity=90); opacity:.9; float:left; color:#000; font-size:12px; white-space:nowrap;">单击左键选择E地址位置</div>';
        parent.vM.ShowPointerTip(tip);
    }
}

function ShowEAddressInfo(x, y, title, content, isRightDown) {
    if (!isRightDown) {
        parent.__EAddressX = x;
        parent.__EAddressY = y;
        parent.__EAddressTitle = title;
        parent.__EAddressContent = content;
        $('hx').value = x;
        $('hy').value = y;
        $('htitle').value = title;
        $('hcontent').value = content;
        if ($('imgSelectPoint')) {
            $('imgSelectPoint').src = '../images/ReMapAc.gif';
            $('imgSelectPoint').alt = '重新取点';
            $('imgSelectPoint').onclick = function() { ReGetPointer() };
        }
        if ($('divEAddressInfo')) {
            $('divEAddressInfo').innerHTML = '<div class="BtConten"><span>' + title + '</span><img src="../images/MendButton1.gif" style="cursor:pointer" onclick="parent._EAddressStatus = ' + operatortype + ';parent._EAddress.Add($(\'hx\').value,$(\'hy\').value,$(\'htitle\').value,$(\'hcontent\').value)" alt="修改" /></div><div class="HackBox"></div>';

            $('divEAddressInfo').style.display = 'block';
        }
        parent._EAddress.Hidden();
    }
}


function CheckData() {
    //    if($('hchecked').value == "0")
    //    {
    //        parent.fnShowMessageBox('警告信息','E地址未检测或检测不通过');
    //        return false;
    //    }
    if ($('txtEAddressName').value == '') {
        parent.fnShowMessageBox('警告信息', 'E地址不能为空');
        return false;
    }
    if ($('hx').value == '' || $('hy').value == '' || $('htitle').value == '') {
        parent.fnShowMessageBox('警告信息', '还未选择地图上的位置');
        return false;
    }
    var rb = document.getElementsByName('rbPower');
    var power = 0;
    for (var i = 0; i < rb.length; i++) {
        if (rb[i].checked) {
            power = rb[i].value;
            break;
        }
    }
    if (power == 2 && $('hpassword').value == '' && $('txtPassword').value == '') {
        parent.fnShowMessageBox('警告信息', '还没设置访问密码');
        return false;
    }
}

function fnExit() {
    parent.vM.HidePointerTip();
    parent._IsBeginSelectEAddress = false;
    parent._EAddress.Hidden();
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
        pc = this.formToStr(fo);
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
    this.formToStr = function(fc) {
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
                else {
                    element_value = e.value;
                }
                element_value = encodeURIComponent(element_value);
                query_string += and + e.name + '=' + element_value;
                and = "&";
            }
        }
        return query_string;
    }
}