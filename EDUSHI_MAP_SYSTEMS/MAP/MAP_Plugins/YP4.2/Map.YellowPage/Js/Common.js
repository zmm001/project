function $(objId) {
    return document.getElementById(objId);
}
String.prototype.Trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
function GetPara(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
//地图POP层
var _PopLayer;
//地图放大和缩小
var _MapSizeState=false;
var CommendState = false;
function ChangeMapSize() {
    var objMap = $("MapBorder");
    var map = $("EdushiMap");
    var objTable = $("divContext");
    if (fnCheckBrowser()) {
        if (!CommendState) {
            if (_MapSizeState) {
                _MapSizeState = false;
                if ($("aControlSize")) {
                    $("aControlSize").title = "最大化";
                }
                $("divChange").style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='images/zuida.png',sizingMethod='image')";
                objMap.style.width = "440px";
                objMap.style.margin = "5px auto auto 460px";
                objTable.style.margin = "-540px auto auto 0px";
                map.style.width = "408px";
                vEdushiMap.MapWidth(408);

            }
            else {
                _MapSizeState = true;
                if ($("aControlSize")) {
                    $("aControlSize").title = "还原";
                }
                $("divChange").style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='images/huanyan.png',sizingMethod='image')";
                objMap.style.width = "900px";
                objMap.style.margin = "5px auto auto 0px";
                objTable.style.margin = "0px auto auto 0px";
                map.style.width = "870px";
                vEdushiMap.MapWidth(868);
            }
        }
        else {
            _MapSizeState = true;
            if ($("aControlSize")) {
                $("aControlSize").title = "还原";
            }
            $("divChange").style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='images/huanyan.png',sizingMethod='image')";
            objMap.style.width = "900px";
            objMap.style.margin = "5px auto auto 0px";
            objTable.style.margin = "0px auto auto 0px";
            map.style.width = "870px";
            vEdushiMap.MapWidth(868);
        }
    }
    else {
        if (!CommendState) {
            if (_MapSizeState) {
                _MapSizeState = false;
                if ($("aControlSize")) {
                    $("aControlSize").title = "最大化";
                }
                $("ImgChange").src = "images/zuida.png";
                objMap.style.width = "432px";
                objMap.style.margin = "5px auto auto 460px";
                objTable.style.margin = "-540px auto auto 0px";
                map.style.width = "408px";
                vEdushiMap.MapWidth(408);

            }
            else {
                _MapSizeState = true;
                if ($("aControlSize")) {
                    $("aControlSize").title = "还原";
                }
                $("ImgChange").src = "images/huanyan.png";
                objMap.style.width = "892px";
                objMap.style.margin = "5px auto auto 0px";
                objTable.style.margin = "0px auto auto 0px";
                map.style.width = "868px";
                vEdushiMap.MapWidth(868);
            }
        }
        else {
            _MapSizeState = true;
            if ($("aControlSize")) {
                $("aControlSize").title = "还原";
            }
            $("ImgChange").src = "images/huanyan.png";
            objMap.style.width = "892px";
            objMap.style.margin = "5px auto auto 0px";
            objTable.style.margin = "0px auto auto 0px";
            map.style.width = "868px";
            vEdushiMap.MapWidth(868);
        }
    }
    CommendState = false;
}
var _vBigZoom = 0;
var _vSmallZoom = 3;
var _vNowZoom = 3;
function fZoomMap(num) {
    if (num == 0) return;
    if (num > 0 && _vSmallZoom <= _vNowZoom) return;
    if (num < 0 && _vBigZoom >= _vNowZoom) return;
    zoomTo(_vNowZoom + num);
}
function fZoomTo(num) {
    zoomTo(num);
}
function fScrollZoomMap() {
    $("dZoom" + _vNowZoom).className = 'Uaction';
    _vNowZoom = getZoom();
    $("dZoom" + _vNowZoom).className = 'Action';
}

function fnZoomBar(){}
fnZoomBar.prototype.Init = function() {
    this.zoombar = $('EzoomBar');
    this.zoomBarSign = $('MapSilder');
    vEdushiMap.Body.flgShowPlot = false;
    vEdushiMap.Body.flgContextMenu = false;

    $('Ezoom0').onclick = this.zoomBar_click.bindAsEventListener(this);
    $('Ezoom1').onclick = this.zoomBar_click.bindAsEventListener(this);
    $('Ezoom2').onclick = this.zoomBar_click.bindAsEventListener(this);
    $('Ezoom3').onclick = this.zoomBar_click.bindAsEventListener(this);
    $('EzoomMax').onclick = this.ZoomMax.bindAsEventListener(this);
    $('EzoomMin').onclick = this.ZoomMin.bindAsEventListener(this);
    $('Change2D3D').onclick = this.C23D.bindAsEventListener(this);
    this.ZoomBarSignPos(vEdushiMap.Zoom());
    this.zoombar.onmousedown = this.doc_mousedown.bindAsEventListener(this);
    this.zoombar.onmousemove = this.doc_mousemove.bindAsEventListener(this);
    this.zoombar.onmouseup = this.doc_mouseup.bindAsEventListener(this);

}
fnZoomBar.prototype.C23D = function() {
    if (vEdushiMap.Switch23D())
        $('Change2D3D').innerHTML = $('Change2D3D').innerHTML.replace('/newmap48.gif', '/newmap482d.gif');
    else
        $('Change2D3D').innerHTML = $('Change2D3D').innerHTML.replace('/newmap482d.gif', '/newmap48.gif');
}
fnZoomBar.prototype.doc_mousedown = function(evt) {
    var src = evt.srcElement ? evt.srcElement : evt.target;
    this.ocx = evt.clientX;
    this.ocy = evt.clientY;
    if (src.id == 'MapSilder') {
        this.zoomFlag = true;
        this.bmy = this.ocy - this.zoomBarSign.offsetTop;
        this.bmTop = this.zoomBarSign.offsetTop;
    }
}
fnZoomBar.prototype.doc_mousemove = function(evt) {
    var ex = evt.clientX;
    var ey = evt.clientY;
    if (this.zoomFlag) {
        this.zoomBarSign.style.top = (ey - this.bmy) + 'px';
        //if((this.zoomBarSign.offsetTop >= 50)&&(this.zoomBarSign.offsetTop <= 113))$('EdushiMap').style.zoom=(ey - this.bmy)+'%';

        if (this.zoomBarSign.offsetTop < 50) this.zoomBarSign.style.top = '50px';
        if (this.zoomBarSign.offsetTop > 113) this.zoomBarSign.style.top = '113px';
        var zz = Math.pow(2, -(this.zoomBarSign.offsetTop - this.bmTop) / 18).toFixed(3);
        //this.slowZoom(zz);
    }
}
fnZoomBar.prototype.doc_mouseup = function(evt) {
    var src = evt.srcElement ? evt.srcElement : evt.target;
    if (this.zoomFlag) {
        this.zoomFlag = false;
        var z = Math.round((this.zoomBarSign.offsetTop - 50) / 21);
        vEdushiMap.FlatZoom(z);
        this.ZoomBarSignPos(z);
        return false;
    }
}
fnZoomBar.prototype.ZoomBarSignPos = function(z) {

    this.zoomBarSign.style.top = (50 + 21 * z) + 'px';
}
fnZoomBar.prototype.zoomBar_click = function(e) {
    var src = e.srcElement ? e.srcElement : e.target;
    var z = src.id.replace('Ezoom', '');
    if (z < 0 || z > 3) return;
    this.ZoomBarSignPos(z);
    vEdushiMap.FlatZoom(z);
}
fnZoomBar.prototype.ZoomMax = function() {
    vEdushiMap.FlatZoom(0);
    this.ZoomBarSignPos(0);
}
fnZoomBar.prototype.ZoomMin = function() {
    vEdushiMap.FlatZoom(3);
    this.ZoomBarSignPos(3);
}
//IE浏览器返回true;其它浏览器返回false
function fnCheckBrowser() {
    if (navigator.appName == "Microsoft Internet Explorer") {
        return true;
    } else {
        return false;
    }
}
function ShowYPPop(id, name, citycode, number, x, y, type) {
    if (_PopLayer) {
        _PopLayer.innerHTML = '';
        var _PoPModel;
        //alert(type);
        if (type != -1) {
            _PoPModel = "<div class=\"header\"><div class=\"content\"><a href=\"CompanyDetail.aspx?ID={$id}\" target=\"_blank\">{$Name}</a></div><div class=\"abc\" ></div></div>";
        }
        else {
            _PoPModel = "<div class=\"header\"><div class=\"content\"><a href=\"OwnerDetail.aspx?ID={$id}\" target=\"_blank\">{$Name}</a></div><div class=\"abc\"></div></div>";
        }
        var o = vEdushiMap.$C('div');
        o.id = "objDiv_Pop";
        o.innerHTML = _PoPModel.replace("{$Name}", name).replace("{$id}", id);
        vEdushiMap.appendEntity(o, _PopLayer, false, x, y, 500, 500, 15, 28, false);
        vEdushiMap.MoveTo(x * 1, y * 1, true);
    }
}
function ShowCommendPop(title, content, x, y) {
    CommendState = true;
    ChangeMapSize();
    _PopLayer.innerHTML = '';
    var _CommendHtml = '<div id="wrap"><div id="tjgg"><div id="tjgg-1">{$title}</div><div id="tjgg-2"><div class="box"> <div class="h"></div> <p><img src="images/10.jpg" style="cursor:pointer" onclick=parent.removeMapPop("CommendDiv_Pop") /></p></div> </div></div><div class="left"></div><div id="tjgg-3"><img src="images/11.jpg" /></div><div id="tjgg-4">{$content}</div><div id="tjgg-5"><img src="images/12.jpg" /></div><div id="footer"><img src="images/13.jpg" /></div></div>';
    var o = vEdushiMap.$C('div');
    o.id = "CommendDiv_Pop";
    o.innerHTML = _CommendHtml.replace("{$title}", title).replace("{$content}", content);
    vEdushiMap.appendEntity(o, _PopLayer, false, x, y, 500, 500, 0, 135, false);
    vEdushiMap.MoveTo(x * 1, y * 1, true);
}
function removeMapPop(id) {
    _PopLayer.removeChild(vEdushiMap.$(id));
}
//详细页的定位
function ShowOwnerDetailPop() {
    ShowDetailPop(L_Oi, 'OwnerDetail.aspx', 'Ownerdetail_Pop');
}
function ShowCompanyDetailPop() {
    ShowDetailPop(L_Oi, 'CompanyDetail.aspx', 'Companydetail_Pop');
}
function ShowDetailPop(obj, urlPage, obj_PopID) {
    _PopLayer.innerHTML = '';
    var _PoPModel = "<div class=\"header\"><div class=\"content\">{$Name}</div><div class=\"abc\"></div></div>";
    var o = vEdushiMap.$C('div');
    o.id = obj_PopID;
    o.Class = "Popo";
    o.innerHTML = _PoPModel.replace("{$Name}", obj.OName).replace("{$id}", obj.OID);
    vEdushiMap.appendEntity(o, _PopLayer, false, obj.CenterX, obj.CenterY, 500, 500, 15, 28, false);
    vEdushiMap.MoveTo(obj.CenterX * 1, obj.CenterY * 1, true);
}
var PicIndex = 1;
function ShowPic() {
    if (arrPicName.length <= 1) return;
    if (arrPicName.length <= PicIndex) PicIndex = 0;
    $("detailimg").src = sPicPath + arrPicPath[PicIndex] + '/s' + arrPicName[PicIndex];
    $("detailimga").href = sPicPath + arrPicPath[PicIndex] + '/' + arrPicName[PicIndex];
    PicIndex++;
    setTimeout("ShowPic()", 2000);
}
function GoSearch() {
    if ($("txtKeyword").value == "") {
        alert("请输入你要查找的关键字!");
        $("txtKeyword").focus();
        return;
    }
    if ($("txtKeyword").value.length > 50) {
        alert("查找的关键字过长，请适当删减!");
        $("txtKeyword").focus();
        return;
    }
    if (RiskWord($("txtKeyword").value)) {
        alert("关键字中不能包含<>()'\"+;\?%--等特殊字符");
        $("txtKeyword").focus();
        return;
    }
    var Keyword = escape($("txtKeyword").value);
    window.location.href = 'KeywordSearchList.aspx?Keyword=' + Keyword;
}
function RiskWord(str)  //检测是否包含'<>()'"+;\?%--'字符，有返回true，否则返回false
{
    var Letters = "<>()'\"+;\?%";
    var i;
    var c;
    for (i = 0; i < str.length; i++) {
        c = str.charAt(i);
        if (Letters.indexOf(c) >= 0)
            return true;
    }
    if (str.indexOf("--") >= 0)
        return true;
    return false;
}
function ShowCorrent() {
    $("BG").style.height = document.body.scrollHeight + 'px';
    $("BG").style.width = document.body.scrollWidth + 'px'
    $('BG').style.display = 'block';

    $('Correntiframe').style.display = 'block';
    $('Correntiframe').style.left = (document.body.scrollWidth - $('Correntiframe').offsetWidth) / 2 + 'px';
    $('Correntiframe').style.top = document.body.scrollTop + (document.body.clientHeight - $("Correntiframe").offsetHeight) / 2 + 'px';
}
function HideCorrent() {
    parent.document.getElementById('BG').style.display = 'none';
    parent.document.getElementById('Correntiframe').style.display = 'none';
}

function ShowHideUpload() {
    $("BG").style.height = document.body.scrollHeight + 'px';
    $("BG").style.width = document.body.scrollWidth + 'px'
    $('BG').style.display = 'block';
    $('iframeUpImg').style.display = 'block';
    $('iframeUpImg').style.left = (document.body.scrollWidth - $('iframeUpImg').offsetWidth) / 2 + 'px';
    $('iframeUpImg').style.top = document.body.scrollTop + (document.body.clientHeight - $("iframeUpImg").offsetHeight) / 2 + 'px';
}

function HideUpload() {
    parent.document.getElementById('BG').style.display = 'none';
    parent.document.getElementById('iframeUpImg').style.display = 'none';
}
function InitZoomBar() {
    var mapZB = new fnZoomBar();
    mapZB.Init();
    _PopLayer = vEdushiMap.NewMapLayer('Pop', 269, 0);
    vEdushiMap.onMapZoomChange = function() {
        mapZB.ZoomBarSignPos(vEdushiMap.Zoom());
    }
}
function Scall() {
    //    if($("BG_con"))
    //    {
    //        $("BG_con").style.top=document.body.scrollTop+(document.body.clientHeight-$("BG_con").offsetHeight)/2;
    //    }
    if ($("Correntiframe")) {
        $("Correntiframe").style.top = document.body.scrollTop + (document.body.clientHeight - $("Correntiframe").offsetHeight) / 2;
    }
    if ($("iframeUpImg")) {
        $("iframeUpImg").style.top = document.body.scrollTop + (document.body.clientHeight - $("iframeUpImg").offsetHeight) / 2;
    }
}
window.onscroll=Scall;

function fnGetWindowWidth() {
    var vw = 0;
    var _dEt = document.documentElement;
    var _dBy = document.body;
    if (typeof window.innerWidth == 'number') vw = window.innerWidth;
    else {
        if (_dEt && _dEt.clientWidth) vw = _dEt.clientWidth;
        else {
            if (_dBy && _dBy.clientWidth) vw = _dBy.clientWidth;
        }
    }
    if (!vw || vw < 100) vw = 100;
    return vw;
}
function fnGetWindowHeight() {
    var vh = 0;
    var _dEt = document.documentElement;
    var _dBy = document.body;
    if (typeof window.innerHeight == 'number') vh = window.innerHeight;
    else {
        if (_dEt && _dEt.clientHeight) vh = _dEt.clientHeight;
        else {
            if (_dBy && _dBy.clientHeight) vh = _dBy.clientHeight;
        }
    }
    if (!vh || vh < 100) vh = 100;
    return vh;
}
var fraCityList;

function LoadCityList() {
    if (!fraCityList) {
        fraCityList = document.createElement('IFRAME');
        fraCityList.id = 'fraCityList';
        fraCityList.frameBorder = '0';
        fraCityList.scrolling = "no";
        fraCityList.style.position = 'absolute';
        fraCityList.style.overflow = 'hidden';
        fraCityList.allowTransparency = 'true';
        fraCityList.style.width = '800px';
        fraCityList.style.height = '620px';
        fraCityList.style.left = (fnGetWindowWidth() - 800) / 2 + 'px';
        fraCityList.style.top = '100px';
        fraCityList.style.zIndex = '10001';
        fraCityList.src = 'CityListControl.aspx';
        document.body.appendChild(fraCityList);
    }
    fraCityList.style.display = 'block';
    $('BG').style.display = 'block';
    $('BG').style.width = fnGetWindowWidth() + 'px';
    $('BG').style.height = fnGetWindowHeight() + 'px';
}

function fnCityListHiddn() {
    fraCityList.style.display = 'none';
    $('BG').style.display = 'none';
}
