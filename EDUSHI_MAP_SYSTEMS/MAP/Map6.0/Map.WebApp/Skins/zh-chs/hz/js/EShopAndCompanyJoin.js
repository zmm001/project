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

function EndGetBuild(id, name,floor,gsmid,gsmkey) {
    $('strongBuildSelect').innerHTML = '已选择('+name+')';
    $('imgGetBuild').src = $('imgGetBuild').src.replace('ToMapRope.gif', 'ReMapAc.gif');
    $('hidOwnerID').value = id;
    $('hidOwnerName').value = name;
    $('txtFloor').value = floor;
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
    $('hidCoords').value = coords;
}
function JoinSuccess() {
    parent.fnShowMessageBox('申请成功', '恭喜您,申请成功！<br />工作人员将在3个工作日内电话联系您。');
    parent._EShopAndCompanyJoinTab.destroy();
}
window.onload = fnOnload;
function fnOnload() {
    if (!window.Config) {
        setTimeout('fnOnload()', 200);
        return;
    }
    var oid = fnRequest('oid');
    var oname = fnRequest('oname');
    if (oid != "0" && oname != "") {
        EndGetBuild(oid, oname, 1);
    }
    LoadEShopBigType($('ddlBigTradeType'), 1);
    LoadEShopBigType($('ddlBigZoneType'), 2);
    fnResize();
}
//初始化高度
function fnResize() {
    $('TabContent').style.height = fnGetWindowHeight() + 'px';
}
function LoadEShopBigType(oSelect, type) {
    var sBigTypeUrl = window.Config.EDataCenterUrl + 'ShopType/ShopTypeList.aspx?req=' + (type == 1 ? 'trade' : 'zone') + '&domain=' + window.Config.Domain + '&l=' + window.Config.Language + '&parentid=0';
    ENetwork.DownloadScript(sBigTypeUrl, function() {
        var oType;
        if (type == 1 && typeof _TradeType != 'undefined') {
            oType = _TradeType.TradeType;
        }
        else if (type == 2 && typeof _ZoneType != 'undefined') {
            oType = _ZoneType.ZoneType;
        }
        else {
            return;
        }
        for (var i = 0; i < oType.length; i++) {
            oSelect.options.add(new Option(oType[i].TypeName, oType[i].TypeID));
        }
    });
}
function LoadEShopSmallType(oSelect, type, parentId) {
    oSelect.options.length = 1;
    if (parentId == -1) {
        return;
    }
    var sSmallTypeUrl = window.Config.EDataCenterUrl + 'ShopType/ShopTypeList.aspx?req=' + (type == 1 ? 'trade' : 'zone') + '&domain=' + window.Config.Domain + '&l=' + window.Config.Language + '&parentid=' + parentId;
    ENetwork.DownloadScript(sSmallTypeUrl, function() {
        var oType;
        if (type == 1 && typeof _TradeType != 'undefined') {
            oType = _TradeType.TradeType;
        }
        else if (type == 2 && typeof _ZoneType != 'undefined') {
            oType = _ZoneType.ZoneType;
        }
        else {
            return;
        }
        for (var i = 0; i < oType.length; i++) {
            oSelect.options.add(new Option(oType[i].TypeName, oType[i].TypeID));
        }
    });
}

function checkEShopData() {

    if ($('hidOwnerID').value == "") {
        alert('请选择入驻建筑');
        return false;
    }
    if ($('txtFloor').value == "") {
        alert('请填写入驻的楼层');
        $('txtFloor').focus();
        return false;
    }
    if ($('hidCoords').value == "") {
        alert('请选择户型');
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
    if ($('ddlSmallZoneType').value == -1 || $('ddlSmallZoneType').value == "") {
        alert('必须选择地域');
        $('ddlSmallZoneType').focus();
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

function cmXMLHttpReq(nReqType, strReqOpenUrl, strReqParam, pResponseFunc) {
    if (nReqType < 0 || nReqType > 1)
        return;
    var objXMLHTTP = cmCreateXMLHTTP();
    if (objXMLHTTP != null) {
        function responseProcess() {
            if (objXMLHTTP.readyState == 4) {
                pResponseFunc(objXMLHTTP);
            }

        }
        objXMLHTTP.onreadystatechange = responseProcess;
        if (nReqType == 0) {
            objXMLHTTP.open("GET", strReqOpenUrl, true);
            objXMLHTTP.send(null);
        }
        else {
            objXMLHTTP.open("POST", strReqOpenUrl, true);
            objXMLHTTP.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            objXMLHTTP.send(strReqParam);
        }
    }
}

function LoadCompanySmallType(sBigType) {
    if (sBigType != "-1" && sBigType != "") {
        cmXMLHttpReq(0, 'EShopAndCompanyJoin.aspx?operatortype=0&companybigtypeid=' + sBigType + '&rd=' + Math.round(Math.random() * 10000), "", callBack_LoadSmallType);
    }
    else {
        $("dplBIC_SmallType").length = 0;
        $("dplBIC_SmallType").options.add(new Option("--请选择--", "-1"));
    }
}
function callBack_LoadSmallType(objXMLHTTP) {
    var Nodes = objXMLHTTP.responseXML.documentElement.childNodes;
    if (Nodes.length == 0) {
        $("dplBIC_SmallType").length = 0;
        $("dplBIC_SmallType").options.add(new Option("没有小类", "-1"));
        return;
    }
    else {
        $("dplBIC_SmallType").length = 0;
        $("dplBIC_SmallType").options.add(new Option("--请选择--", "-1"));
        for (var i = 0; i < Nodes.length; i++) {
            var smalltypeid;
            var smalltypename;
            if (document.all) {
                smalltypeid = Nodes[i].childNodes[0].text;
                smalltypename = Nodes[i].childNodes[1].text;
            }
            else {
                smalltypeid = Nodes[i].childNodes[0].textContent;
                smalltypename = Nodes[i].childNodes[1].textContent;
            }
            $("dplBIC_SmallType").options.add(new Option(smalltypename, smalltypeid));
        }
    }
}

function checkCompanyData() {
    if ($('hidOwnerID').value == "") {
        alert('请选择入驻建筑');
        return false;
    }
    if ($('txtFloor').value == "") {
        alert('请填写入驻的楼层');
        $('txtFloor').focus();
        return false;
    }
    if ($('hidCoords').value == "") {
        alert('请选择户型');
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
        alert('必须填写正确联系电话!');
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