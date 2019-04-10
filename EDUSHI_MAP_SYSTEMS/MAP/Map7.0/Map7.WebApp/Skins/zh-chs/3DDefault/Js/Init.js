﻿var vM = null;                      //地图对象
var vMe = null;                     //鹰眼对象

var _MapWidth = 0;                  //地图宽
var _MapHeight = 0;                 //地图高

var _TabControl;                    //选项卡
var _IconLayer;                     //小图标图层
var _BusTransferLineLayer;          //公交线路图层
var _RoadLineLayer;                 //道路图层
var _BusStationLayer;               //站点图层
var _PopLayer;                      //泡泡图层
var _seIconLayer;                   //公交两点图标图层
var _MarkLayer;                     //标记图层
var _EyeIconLayer;                  //鹰眼图层
var _SubWayLayer;                   //地铁图层

var _EntityPopControl;              //实体泡泡
var _CompanyPopControl;             //企业泡泡
var _EShopPopControl;               //E店Pop
var _BusStationControl;             //公交Pop
var _PoiPopControl;                 //PoiPop
var _CommendPopControl;
var _ThemePopControl;
var _BusLinePopControl;

var _RoadCoords = [];               //画线坐标串
var _BusLineCoordList = [];         //公交线路坐标
var _BusLineData = null;            //公交站点数据
var _BusLineType = 0;               //线路正向还是反向

var _IsBeginSelectMark = false;     //是否开始标记
var __IsDrawBusLineState = false;   //标记当前是公交站点的画线图层还是换乘的画线图层
var _IsBeginSelectWiki = false;     //是否开始地图选点入住
var _MapFullScreenState = false;    //标记地图是否为全屏状态
var __searchtype = 0;
var __SubwayCoords = '';

//用户功能
var _MarkLocationLayer;
var _sMarkLocationLayer;
var _MarkLocationPopControl;
var _MarkPopControl;
var _IsBeginMarkLocation = false;
var _IsBeginMarkPop = false;
var __IsShowMarkLocation = false;

function fnLoadInit() {
    //加载对象
    if (typeof vEdushiMap == 'undefined' || typeof vEdushiMap.Body.NewMapLayer != 'function' || typeof veyeEdushiMap == 'undefined' || typeof veyeEdushiMap.Body.NewMapLayer != 'function' || (vEdushiMap.Body.MapState.Map != 0 && vEdushiMap.Body.GoogleMap == null)) {
        setTimeout("fnLoadInit()", 50);
        return;
    }

    vM = vEdushiMap;
    vMe = veyeEdushiMap;
    //地图图层
    _RoadLineLayer = vM.NewMapLayer('RoadLineLayer', 148, true); //道路线路
    _BusTransferLineLayer = vM.Body.NewMapLayer('BusTransferLine', 149, vM.Body.BoxLayerBottom); //公交线路
    _BusStationLayer = vM.NewMapLayer('BusStation', 260, true);
    _IconLayer = vM.NewMapLayer('Icon', 261, true);
    _EyeIconLayer = vMe.NewMapLayer('Icon', 262, true);
    _MarkLayer = vM.NewMapLayer('Mark', 263, true);
    _PopLayer = vM.NewMapLayer('Pop', 270, true);
    _seIconLayer = vM.NewMapLayer('_seIconLayer', 280, true);
    _SubWayLayer = vM.Body.NewMapLayer('SubWay', 147, vM.Body.BoxLayerBottom); //地铁线路
    _MarkLocationLayer = vM.NewMapLayer('MarkLocationLayer', 265, true);
    _sMarkLocationLayer = vM.NewMapLayer('sMarkLocationLayer', 264, true);

    window.onresize();
    //加载地图相关数据
    fnPageInfoInit();
    //绑定地图事件
    fnMapEventBind();
    //地图URL解析
    fnUrlParse();
}

function fnPageInfoInit() {
    //初始化控件基类和选项卡
    fnInitTabControl();
    // 下载主题地图分类列表
    //fnLoadThemeMapsTypeList();
    //下载热门关键字
    //fnLoadHotKey();
    //加载赞助商广告
    fnAddADTab();
    //初始化加载包打听
    fnLoadBdtList();
    //下载常用位置
    fnLoadCommonGoTo();
    //用户登陆
    fnCheckUserLoginInit();
    //加载酒店预订列表
    LoadHotelList(false);
}

/*×××××××××××××××××地图事件绑定部分×××××××××××××××××*/
function fnMapEventBind() {
    //滑杆样式
    vM.$('ZoomBarControl').style.backgroundImage = "url('" + EGIS.ApplictionRootUrl + "/images/ud.gif')";
    //绑定滑杆
    vM.attachEvent(EGIS.KeyWord.EventName.MapZoomChange, function(z) {
        vMe.Zoom(vM.Zoom());
        if (__IsDrawBusLineState) {
            fnShowBusStationIco(_BusLineData, _BusLineType);
        }
        else {
            fnDrawingBusLine(_BusLineCoordList);
        }
        fnDrawingRoadLine(_RoadCoords);
    });

    //地图鹰眼联动
    vMe.attachEvent(EGIS.KeyWord.EventName.MapMoveEnd, function(x, y, flg) {
        if (vM.MapState().Map != 0) {
            if (__IsDrawBusLineState) {
                fnShowBusStationIco(_BusLineData, _BusLineType);
            }
            else {
                fnDrawingBusLine(_BusLineCoordList);
            }
        }
        if (flg == 0) { vM.MoveTo(x, y, true); }
    });

    //地图移动
    vM.attachEvent(EGIS.KeyWord.EventName.MapMoveEnd, function(x, y, flg) {
        if (flg == 0) { vMe.MoveTo(x, y, true); }
        if (__IsDrawBusLineState) {
            fnShowBusStationIco(_BusLineData, _BusLineType);
        }
        else {
            fnDrawingBusLine(_BusLineCoordList);
        }
    });

    //测距结束
    vM.attachEvent(EGIS.KeyWord.EventName.ScaleEnd, function(dis) {
        fnShowScaleResult(dis);
    });

    //地图双击事件
    vM.attachEvent(EGIS.KeyWord.EventName.MapDblClick, function(e) {
        if (_IsBeginMarkLocation) {
            fnShowMarkLocation(0, vM.PointerX(), vM.PointerY(), '', '');
            return;
        }
        if (_IsBeginMarkPop) {
            fnShowMarkPop(0, vM.PointerX(), vM.PointerY(), '', '');
            return;
        }
        
        if (vM.Zoom() > 0) {
            vM.MoveTo(vM.PointerX(), vM.PointerY());
            vMe.MoveTo(vM.PointerX(), vM.PointerY());
            vM.FlatZoom(0);
        }
        else {
            vM.MoveTo(vM.PointerX(), vM.PointerY(), true);
            vMe.MoveTo(vM.PointerX(), vM.PointerY(), true);
        }
    });

    vM.attachEvent(EGIS.KeyWord.EventName.MapMouseDown, function(x, y, e) {
        __EdushiSuggest.Hide();

        if (_IsBeginSelectWiki && e.button == EGIS.KeyWord.MouseButton.Right) {
            vM.Body.flgContextMenu = false;
            _Wiki.Add(vM.PointerX(), vM.PointerY(), '');
        }
        else {
            vM.Body.flgContextMenu = true;
        }
    });

    vM.attachEvent(EGIS.KeyWord.EventName.MapMouseUp, function(e) {
        if (_IsBeginSelectMark) {
            _Mark.Add(vM.PointerX(), vM.PointerY(), '');
        }
    });

    //取点操作结束
    vM.attachEvent(EGIS.KeyWord.EventName.GetCoordsEnd, function(c, flg) {
        if (flg && c.length > 0) {
            if (_IsBeginSelectReportCoords) {
                _DrawReportCoords = c;
                fnStartDrawReportCroodsToPoly();
                _ReportTab.TabBody.contentWindow.EndGetReportCoords(c.toString());
            }
        }
    });

    vM.attachEvent(EGIS.KeyWord.EventName.Switch3D, function() {
        if (!IsShowRoadLayer) {
            vM.ViewSystemMapLayer(false, 'RoadPicLayer');
        }
        fnInitDelay();
        fnGoogleStat("切换3D图");
        vM.$('ZoomBarControl').style.backgroundImage = "url('" + EGIS.ApplictionRootUrl + "/images/ud.gif')";
        vM.ViewSigns(true, 'park');
        vM.ViewSigns(true, 'unit');
        vM.ViewSpotAreas(true);
        vM.ViewSpotLabels(true);
        vM.ViewPlots(true);
        $('direction').style.background = "url(../images/ico.png) no-repeat -60px -100px";
        $('direction').style.height = '35px';
        $('Auditing').style.display = 'block';
    });

    vM.attachEvent(EGIS.KeyWord.EventName.Switch2D, function() {
        fnInitDelay();
        fnGoogleStat("切换2D图");
        vM.$('ZoomBarControl').style.backgroundImage = "url('" + EGIS.ApplictionRootUrl + "/images/ZoomBarControl.gif')";
        vM.ViewSigns(false, 'park');
        vM.ViewSigns(false, 'unit');
        vM.ViewSpotAreas(false);
        vM.ViewSpotLabels(false);
        vM.ViewPlots(false);
        $('direction').style.background = "url(../images/CompassIco1.gif) no-repeat";
        $('direction').style.height = '65px';
        $('Auditing').style.display = 'none';
    });

    vM.attachEvent(EGIS.KeyWord.EventName.SwitchWX, function() {
        fnInitDelay();
        fnGoogleStat("切换卫星图");
        vM.$('ZoomBarControl').style.backgroundImage = "url('" + EGIS.ApplictionRootUrl + "/images/ZoomBarControl.gif')";
        vM.ViewSigns(false, 'park');
        vM.ViewSigns(false, 'unit');
        vM.ViewSpotAreas(false);
        vM.ViewSpotLabels(false);
        vM.ViewPlots(false);
    });

    //绑定实体点击事件
    vM.attachEvent(EGIS.KeyWord.EventName.SpotClick, function(spot) {
        if (_IsBeginMarkLocation) {
            return;
        }
        if (_IsBeginMarkPop) {
            return;
        }
        if (_IsBeginSelectMark) {
            return;
        }
        
        fnShowEntityPop(spot.ID, spot.Cx * 1, spot.Cy * 1);
        
    });

    vM.attachEvent(EGIS.KeyWord.EventName.SpotLabelClick, function(spot) {
        if (_IsBeginMarkLocation) {
            return;
        }
        if (_IsBeginMarkPop) {
            return;
        }
        if (_IsBeginSelectMark) {
            return;
        }

        fnShowEntityPop(spot.ID, spot.Cx * 1, spot.Cy * 1);
    });

    vM.attachEvent(EGIS.KeyWord.EventName.SignClick, function(sign) {
        switch (sign.Group) {
            case 'bus':
            case 'bus3d':
                fnShowBusStation(sign.ID, sign.Name, vM.PointerX(), vM.PointerY());
                break;
            case 'vir':
                window.open(GlobalConfig.WebRootPath + 'Vir/Vir.aspx?Image=' + escape(sign.Url), 'vir', 'height=400,width=520,top=100,left=100, toolbar=no,menubar=no,scrollbars=no,resizable=yes,location=no,status=no');
                break;
        }
    });

    vM.attachEvent(EGIS.KeyWord.EventName.ContextMenuClick, function(key, wx, wy, mx, my, spot) {
        switch (key) {
            case 'spot':
                if (spot) {
                    fnShowEntityPop(spot.ID, spot.Cx * 1, spot.Cy * 1);
                }
                break;
            case 'center':
                vM.MoveTo(mx, my, true);
                break;
            case 'zoomout':
                vM.FlatZoom(vM.Zoom() + 1);
                break;
            case 'zoomin':
                vM.FlatZoom(vM.Zoom() - 1);
                break;
            case 'start':
                fnGoogleStat('右键：从这里出发');
                if (spot) {
                    fnShowFromHereSearch(spot.Name);
                }
                else {
                    fnShowFromHereSearch('');
                }
                break;
            case 'end':
                fnGoogleStat('右键：如何到这里');
                if (spot) {
                    fnShowToHereSearch(spot.Name);
                }
                else {
                    fnShowToHereSearch('');
                }
                break;
            case 'cirbus':
                fnGoogleStat('右键：周边公交');
                if (spot) {
                    fnShowPeripheralBus(spot.Cx, spot.Cy, spot.Name);
                }
                else {
                    fnShowPeripheralBus(vM.PointerX(), vM.PointerY(), '');
                }
                break;
            case 'cirsearch':
                fnGoogleStat('右键：查找周边');
                if (spot) {
                    fnShowPeripheralSearch(spot.Cx, spot.Cy, spot.Name);
                }
                else {
                    fnShowPeripheralSearch(vM.PointerX(), vM.PointerY(), '');
                }
                break;
            case 'errors':
                fnGoogleStat('右键：我要纠错');
                if (spot) {
                    if (spot.Group == 'build') {
                        fnReport(spot.Cx, spot.Cy, 0, spot.RelationID, spot.Name);
                    }
                    else {
                        fnReport(spot.Cx, spot.Cy, 0, spot.ID, spot.Name);
                    }

                }
                else {
                    fnReport(vM.PointerX(), vM.PointerY(), 2, 0, '');
                }
                break;
            case 'sign':

                break;
            case 'postbdt':
                fnGoogleStat('右键：我要打听');
                if (spot) {
                    var sTitle = escape('关于“' + spot.Name + '”，我想打听。。。。。');
                    window.open(GlobalConfig.WebRootPath + 'bdt/Ask.aspx?from=map&title=' + sTitle + '&x=' + vM.PointerX() + '&y=' + vM.PointerY(), '_blank');
                }
                else {
                    window.open(GlobalConfig.WebRootPath + 'bdt/Ask.aspx?from=map&x=' + vM.PointerX() + '&y=' + vM.PointerY(), '_blank');
                }
                break;
            case 'about':
                fnGoogleStat('右键：关于eCityMap');
                fnShowMessageBox('关于eCityMap…', '阿拉丁信息科技有限公司<br />http://www.edushi.com ');
                break;
        }
    });
}
/*×××××××××××××××××地图时间绑定部分×××××××××××××××××*/

/*×××××××××××××××××地图初始化部分×××××××××××××××××*/
//初始化选项卡
function fnInitTabControl() {
    if (!_TabControl) {
        var HeadContainer = $('HeadContainer');
        var BodyContainer = $('BodyContainer');
        var LeftBtn = $('LeftBtn');
        var RightBtn = $('RightBtn');
        _TabControl = new TabControl(HeadContainer, BodyContainer, LeftBtn, RightBtn);
    }
}

//重写窗口缩放事件
window.onresize = function() {
    var h = fnGetWindowHeight(), w = fnGetWindowWidth();

    if ($('divDialog')) {
        $('divDialog').style.top = (h - 120) / 2 + 'px';
        $('divDialog').style.left = (w - 300) / 2 + 'px';
    }
    if ($('divDialogBg')) {
        $('divDialogBg').style.height = h + 'px';
        $('divDialogBg').style.width = w + 'px';
    }
    if ($('divLoginDialog')) {
        $('divLoginDialog').style.top = (h - 120) / 2 + 'px';
        $('divLoginDialog').style.left = (w - 300) / 2 + 'px';
    }
    if ($('divSendMsg')) {
        $('divSendMsg').style.top = (h / 2 - 130) + 'px';
        $('divSendMsg').style.left = (w / 2 - 240) + 'px';
    }

    if (h < 450 || w < 750) {
        h = 450;
        w = 750;
        document.body.style.width = '750px';
        document.body.style.height = '450px';
    }
    else {
        document.body.style.width = w + 'px';
        document.body.style.height = h + 'px';
    }

    if (_MapFullScreenState) {
        $('Header').style.display = 'none';
        $('Navigation').style.display = 'none';

        $('Content').style.width = w + 'px';
        $('Content').style.height = (h - 26) + 'px';

        $('EdushiMap').style.width = w + 'px';
        $('EdushiMap').style.height = (h - 26) + 'px';

        $('Wrapper').style.height = h + 'px';
        $('toolsleft').style.width = w + 'px';

        _MapWidth = w;
        _MapHeight = h - 25;
        if (vM) {
            vM.MapHeight(_MapHeight);
            vM.MapWidth(_MapWidth);
        }
    }
    else {
        $('Content').style.display = 'block';
        $('Header').style.display = 'block';
        $('Navigation').style.display = 'block';

        if (window.XMLHttpRequest) {
            $('Content').style.height = (h - 122) + 'px';
            $('Content').style.width = (w - 326) + 'px';
            $('EdushiMap').style.width = (w - 324) + 'px';
            $('EdushiMap').style.height = (h - 124) + 'px';
        } else {
            $('Content').style.height = (h - 126) + 'px';
            $('Content').style.width = (w - 328) + 'px';
            $('EdushiMap').style.width = (w - 326) + 'px';
            $('EdushiMap').style.height = (h - 160) + 'px';
        }

        $('ulChannellList').style.width = (w - 312) + 'px';
        $('MapHotKeywords').style.width = (w - 742) + 'px';
        $('divBdtList').style.width = (w - 600) + 'px';
        $('toolsleft').style.width = (w - 324) + 'px';
        $('Wrapper').style.height = (h - 96) + 'px';
        $('BodyContainer').style.height = (h - 131) + 'px';
        $('Navigation').style.height = (h - 96) + 'px';

        _MapWidth = w - 326;
        if (vM) {
            vM.MapWidth(_MapWidth);
        }

        _MapHeight = h - 122;
        if (vM) {
            vM.MapHeight(_MapHeight);
        }
    }

    fnAttachIframeResize();
};

//触发选项卡里的Iframe onresize事件
function fnAttachIframeResize() {
    if (_TabControl) {
        for (var i = 0; i < _TabControl.TabList.length; i++) {
            _TabControl.TabList[i].TabBody.style.height = _TabControl.TabList[i].TabBody.parentNode.style.height;
            _TabControl.TabList[i].resize();
        }
    }
}
/*×××××××××××××××××地图初始化部分×××××××××××××××××*/

/*×××××××××××××××××其他地图函数部分×××××××××××××××××*/
//地图移动和鹰眼联动
function MoveTo(x, y, flg, fun) {
    vM.MoveTo(x, y, true, fun);
    vMe.MoveTo(x, y, true);
}

//键盘事件
function fnKeyup(evt) {
    if (vM == null) {
        return;
    }
    var moveStepPixel = 256;
    var evt = window.event ? window.event : evt;
    var iMapCenterX = vM.CenterX();
    var iMapCenterY = vM.CenterY();
    switch (evt.keyCode) {
        case 37:
            MoveTo(iMapCenterX - vM.GetMapPos(moveStepPixel), iMapCenterY, true);
            break;
        case 38:
            MoveTo(iMapCenterX, iMapCenterY - vM.GetMapPos(moveStepPixel), true);
            break;
        case 39:
            MoveTo(iMapCenterX + vM.GetMapPos(moveStepPixel), iMapCenterY, true);
            break;
        case 40:
            MoveTo(iMapCenterX, iMapCenterY + vM.GetMapPos(moveStepPixel), true);
            break;
    }
}

//地图切换时重绘公交线路
function fnInitDelay() {
    if (vM.MapState().Succeed) {//判断google地图是否加载成功
        if (__IsDrawBusLineState) {
            fnShowBusStationIco(_BusLineData, _BusLineType);
        }
        else {
            fnDrawingBusLine(_BusLineCoordList);
        }
    }
    else {
        setTimeout("fnInitDelay()", 300);
        return;
    }
}
//google统计
function fnGoogleStat(sTrackName) {
    try {
        pageTracker._trackEvent('Map7.0', 'Mater_UI', sTrackName);
    } catch (e) {
    }
}
//添加页卡
function fnAddTab(tab, h) {
    if (!h) {
        tab.TabBody.style.height = '100%';
    }
    else {
        tab.TabBody.style.height = h;
    }
    _TabControl.AddTab(tab);
}

//初始化分类主题滚动效果
function fnInitThemeScroll() {
    var ulThemeList = $('ulThemeList');
    var iLen = ulThemeList.childNodes.length;
    var iMaxWidth = 0;
    var iClipWidth = fnGetWindowWidth() * 0.6 - 100;
    var iStepWidth = 4;
    var hwScroll;
    for (var i = 0; i < iLen; i++) {
        if (ulThemeList.childNodes[i].tagName) {
            iMaxWidth += ulThemeList.childNodes[i].clientWidth + 70; //10像素是li的margin
        }
    }

    $('ImgThemeScrollLeft').onmouseover = function() {
        $('ImgThemeScrollLeft').style.cursor = 'pointer';
        window.clearInterval(hwScroll);
        hwScroll = setInterval(function() {
            var iLeft = ulThemeList.parentNode.style.left.replace('px', '') * 1;
            if (iLeft + iStepWidth > 0) {
                ulThemeList.parentNode.style.left = '0px';
                window.clearInterval(hwScroll);
            }
            else {
                ulThemeList.parentNode.style.left = (iLeft + iStepWidth) + 'px';
            }
        }, 30);
    };
    $('ImgThemeScrollRight').onmouseover = function() {
        $('ImgThemeScrollRight').style.cursor = 'pointer';
        window.clearInterval(hwScroll);
        hwScroll = setInterval(function() {
            var iLeft = ulThemeList.parentNode.style.left.replace('px', '') * 1;
            if ((iLeft * -1 + iClipWidth + iStepWidth) >= iMaxWidth) {
                ulThemeList.parentNode.style.left = (iClipWidth - iMaxWidth) + 'px';
                window.clearInterval(hwScroll);
            }
            else {
                ulThemeList.parentNode.style.left = (iLeft - iStepWidth) + 'px';
            }
        }, 30);
    };
    $('ImgThemeScrollLeft').onmouseout = function() {
        window.clearInterval(hwScroll);
    };
    $('ImgThemeScrollRight').onmouseout = function() {
        window.clearInterval(hwScroll);
    }
}

//道路
function fnDrawingRoadLine(roadCoords) {
    _RoadCoords = roadCoords;
    _RoadLineLayer.innerHTML = '';
    for (var i = 0; i < _RoadCoords.length; i++) {
        var coords = _RoadCoords[i];
        if (coords.length > 0) {
            vM.DrawPolyLine(_RoadLineLayer, vM.ChangeMapCoordsToBox(coords), 4, 'red', 0.7);
        }
    }
}

function fnCreateUrl(oid, type) {
    var urlAdress = 'http://' + GlobalConfig.Domain + '/hy/';
    var id = -1;
    if (type == '1') {
        urlAdress += '1-' + oid + '.shtml';
        return urlAdress;
    }
    else if (type == '2') {
        urlAdress += '2-' + oid + '.shtml';
        return urlAdress;
    }
}

function fnCommonGoToClick(QuickLink) {
    fnToolsShow('divQuickLink', 2);
    fnGoogleStat('常用位置：' + QuickLink.Title);
    if (QuickLink.Flag == 0) {
        vM.MoveTo(QuickLink.x, QuickLink.y);
    }
    else if (QuickLink.Flag == 1) {
        fnShowEntityPop(QuickLink.OwnerID, QuickLink.x, QuickLink.y);
    }
    else if (QuickLink.Flag == 2) {
        fnShowCompanyPop(QuickLink.CompanyID, QuickLink.x, QuickLink.y);
    }
}
//搜索切换
function fnSearchChange(type) {
    if (type == 'MapSearch') {
        $('MapSearch').className = 'tab1';
        $('BusSearch').className = 'tab2';
        $('divMapSearch').style.display = 'block';
        $('divBusSearch').style.display = 'none';
    }

    if (type == 'BusSearch') {
        $('MapSearch').className = 'tab2';
        $('BusSearch').className = 'tab1';
        $('divMapSearch').style.display = 'none';
        $('divBusSearch').style.display = 'block';
    }
}
//站点互换
function KeyWordsChange() {
    if ($('txtBusStart').value.trim() != '' && $('txtBusEnd').value.trim() != '' && $('txtBusStart').value.trim() != '起点' && $('txtBusEnd').value.trim() != '终点') {
        var txtstart = $('txtBusStart').value.trim();
        var txtend = $('txtBusEnd').value.trim();

        $('txtBusStart').value = txtend;
        $('txtBusEnd').value = txtstart;
    }
}
//切换城市
function fnSwichCity() {
    var citylistifrmae = $('iframeCityList');
    if (citylistifrmae) {
        if ($('iframeCityList').style.display != 'none') {
            $('iframeCityList').style.display = 'none';
        }
        else {
            $('iframeCityList').style.display = '';
        }
    }
    else {
        citylistifrmae = document.createElement('IFRAME');
        citylistifrmae.id = 'iframeCityList';
        citylistifrmae.frameBorder = '0';
        citylistifrmae.scrolling = "no";
        citylistifrmae.style.overflow = 'hidden';
        citylistifrmae.allowTransparency = 'true';
        citylistifrmae.style.width = '640px';
        citylistifrmae.style.height = '358px';
        citylistifrmae.style.position = 'absolute';
        citylistifrmae.style.top = '82px';
        citylistifrmae.style.left = '5px';
        citylistifrmae.style.zIndex = 999;
        citylistifrmae.src = 'CityList.html';
        document.body.appendChild(citylistifrmae);
    }
}

function fnShowEyeMap() {
    if ($('eyeMap').style.display == 'none') {
        $('eyeMap').style.display = 'block';
    }
    else {
        $('eyeMap').style.display = 'none';
    }
}

function fnCheckValue(type) {
    switch (type) {
        case '0':
            $('typeListValue').innerHTML = '全站搜索';
            $('AllSearch').style.display = 'block';
            $('nearBySearch').style.display = 'none';
            __searchtype = 0;
            break;
        case '1':
            $('typeListValue').innerHTML = '名称';
            $('AllSearch').style.display = 'block';
            $('nearBySearch').style.display = 'none';
            __searchtype = 1;
            break;
        case '2':
            $('typeListValue').innerHTML = '地址';
            $('AllSearch').style.display = 'block';
            $('nearBySearch').style.display = 'none';
            __searchtype = 2;
            break;
        case '3':
            $('typeListValue').innerHTML = '周边';
            $('AllSearch').style.display = 'none';
            $('nearBySearch').style.display = 'block';
            __searchtype = 3;
            break;
        case '9':
            $('typeListValue').innerHTML = '道路';
            $('AllSearch').style.display = 'block';
            $('nearBySearch').style.display = 'none';
            __searchtype = 9;
            break;
    }
    fnToolsShow('typeList', 2);
}
/*×××××××××××××××××其他地图函数部分×××××××××××××××××*/

/*×××××××××××××××××页面加载数据部分×××××××××××××××××*/
//加载bdt
function fnLoadBdtList() {
    if (GlobalConfig.IsBDT == '1') {
        //var sUrl = GlobalConfig.EDataCenterUrl + 'Bdt/NewBdtList.aspx?citycode=' + GlobalConfig.CityCode + '&l=' + GlobalConfig.Language + '&' + ENetwork.GetExecutionID();
        //新数据中心
        var sUrl = GlobalConfig.DataCetnerMapDataUrl + 'Map7.0/NewBdtList.aspx?citycode=' + GlobalConfig.CityCode + '&l=' + GlobalConfig.Language + '&' + ENetwork.GetExecutionID();
        ENetwork.DownloadScript(sUrl, function() {
            var arrayHtml = [];
            if (typeof (_BdtList) != 'undefined' && _BdtList.length > 0) {
                /*  向上滚动
                for (var i = 0; i < _BdtList.length; i++) {
                arrayHtml.push('<p style=\"height:20px;white-space:nowrap;\"><a style=\"font-weight:bold;filter:alpha(opacity=100);opacity:1;\" href="' + GlobalConfig.UserCenterUrl + 'User/Default.aspx?UserID=' + _BdtList[i].LM_ID + '" target="_blank">' + _BdtList[i].LM_Nickname + '</a>正在打听：<a style=\"font-weight:bold;filter:alpha(opacity=100);opacity:1;\" href="' + GlobalConfig.WebRootPath + 'bdt/ListedQu.aspx?ID=' + _BdtList[i].LT_ID + '" target="_blank">' + _BdtList[i].LT_Title + '</a></p>');
                }
                $('divBdtList').innerHTML = arrayHtml.join('');
                var marquee = new Marquee('divBdtList', 0, 1, null, null, 20, 3000, 500);
                */
                //向左滚动
                for (var i = 0; i < _BdtList.length; i++) {
                    arrayHtml.push('<a style=\"font-weight:bold;filter:alpha(opacity=100);opacity:1;\" href="' + GlobalConfig.UserCenterUrl + 'User/Default.aspx?UserID=' + _BdtList[i].LM_ID + '" target="_blank">' + _BdtList[i].LM_Nickname + '</a>正在打听：<a style=\"font-weight:bold;filter:alpha(opacity=100);opacity:1;\" href="' + GlobalConfig.WebRootPath + 'bdt/detail/' + _BdtList[i].LT_ID + '.shtml" target="_blank">' + _BdtList[i].LT_Title + '</a>&nbsp;&nbsp;');
                }
                $('divBdtList').innerHTML = arrayHtml.join('');
                var marquee = new Marquee('divBdtList', 2, 1, null, null, 20, 0, 0);
            }
            else {
                $('divBdtList').style.display = 'none';
            }
        });
    }
}

function fnThemsDol(type) {
    if (type == 1) {
        $('ulThemeList2').style.display = 'block';
        if ($('ulThemeList2')) {
            $('ulThemeList2').style.left = $('moreThemes').offsetLeft + 'px';
        }
    }

    if (type == 2) {
        $('ulThemeList2').style.display = 'none';
    }
}

//主题数据加载结果回调
function onThemeDataLoadComplete(data, btid) {
    _IconLayer.innerHTML = '';
    _EyeIconLayer.innerHTML = '';
    if (data != null) {
        var sThemeImage = 'Images/ThMapIco.png';
        var sThemeOverImage = 'Images/AlterThMapIco.png';
        for (var i = 0; i < data.length; i++) {
            if (data[i].BCC_CompanyID * 1 == 0) {
                fnAppendIcon(data[i].BCC_CompanyName, data[i].X, data[i].Y, i + 1, sThemeImage, sThemeOverImage, 'if(parent.fnShowThemePop){parent.fnShowThemePop(' + data[i].BCC_ID + ', ' + data[i].X + ', ' + data[i].Y + ',0, ' + btid + ');}', 41, 33, 7, 32, true);
            }
            else {
                fnAppendIcon(data[i].BCC_CompanyName, data[i].X, data[i].Y, i + 1, sThemeImage, sThemeOverImage, 'if(parent.fnShowThemePop){parent.fnShowThemePop(' + data[i].BCC_ID + ', ' + data[i].X + ', ' + data[i].Y + ',0, ' + data[i].BCC_CompanyID + ');}', 41, 33, 7, 32, true);
            }
        }
    }
}

//下载常用位置
function fnLoadCommonGoTo() {
    //var url = GlobalConfig.EDataCenterUrl + 'Commmap5.0/QuickLink.aspx?domain=' + GlobalConfig.Domain + '&l=' + GlobalConfig.Language;
    //新数据中心
    var url = GlobalConfig.DataCetnerMapDataUrl + 'Map7.0/QuickLink.aspx?domain=' + GlobalConfig.Domain + '&l=' + GlobalConfig.Language;
    ENetwork.DownloadScript(url, function() {
        if (typeof QuickLinkList == 'undefined') return false;
        var lastType = -1;
        var sHtml;
        sHtml = '<ul>';
        for (var i = 0; i < QuickLinkList.length; i++) {
            if (lastType != -1 && QuickLinkList[i].Type != lastType) {
                sHtml += '<br /></ul><ul><li><a href="javascript:fnCommonGoToClick(QuickLinkList[' + i + ']);">' + QuickLinkList[i].Title + '</a></li>';
            }
            else {
                sHtml += '<li><a href="javascript:fnCommonGoToClick(QuickLinkList[' + i + ']);">' + QuickLinkList[i].Title + '</a></li>';
            }
            lastType = QuickLinkList[i].Type;
        }
        sHtml += '<br /></ul>';
        $('divQuickLinkList').innerHTML = sHtml;
    }
     );
}

//加载赞助商广告
function fnAddADTab() {
    var tab = new TabControl.Tab(document, 'ads', '赞助商', '/Fundation/News.html', true, true, 80);
    fnAddTab(tab);
};

//加载酒店预订
function LoadHotelList(IsDefaule) {
    if (GlobalConfig.HasHotel == '1') {
        var HotelTab = new TabControl.Tab(document, 'hotellist', '酒店预订', '/Fundation/HotelList.htm', true, IsDefaule, 80);
        fnAddTab(HotelTab);
    }
}

//添加久久票务合作
function PiaoList() {
    var _Tab = new TabControl.Tab(document, 'PiaoList', '火车票预定', '/Piao/index.html', true, true, 80);
    fnAddTab(_Tab);
}
/*×××××××××××××××××页面加载数据部分×××××××××××××××××*/

/*×××××××××××××××××地图页卡及搜索部分×××××××××××××××××*/
//地图搜索
function fnMapSearchByHotkey(sHotkey, isStat) {
    if (isStat) {
        fnGoogleStat('热门关键字：' + sHotkey);
    }
    tab = new TabControl.Tab(document, 'search', sHotkey, '/Fundation/LocalSearch.aspx?type=0&keyword1=' + escape(sHotkey), true, true, 80);
    fnAddTab(tab);
}

//显示某个特定主题分类  type 1:小类 新数据中心
function fnLoadThemeMapListByTypeId(Tid, Tname, type) {
    if (type == '10') {
        vM.FlatZoom(3);
    }
    var tab;
    if (type == '1') { tab = new TabControl.Tab(document, 'themeMap', Tname, '/Fundation/ThemeMap.html?classid=' + Tid + '&type=1', true, true, 80); }
    else {
        tab = new TabControl.Tab(document, 'themeMap', Tname, '/Fundation/ThemeMap.html?classid=' + Tid, true, true, 80);
    }

    fnAddTab(tab);
}

function fnOpenMergeSearch(key, lst_id, domain, cid, vid, tid, card, vip, type, tags, adtype) {
    var tab = new TabControl.Tab(document, 'MergeSearch', key, '/Fundation/MergeSearch.aspx?key=' + escape(key) + '&lst_id=' + lst_id + '&domain=' + domain + '&cid=' + cid + '&vid=' + vid + '&tid=' + tid + '&card=' + card + '&vip=' + vip + '&type=' + type + '&tags=' + tags + '&adtype=' + adtype, true, true, 80);
    fnAddTab(tab);
    return tab;
}

//纠错开始，x，y：报料的坐标点，type：报料类型（0：实体，1：企业，2：地点,3：公交站点 4：线路）
function fnReport(x, y, type, id, name) {
    var url = '/wiki/PullingWrong.aspx?oid=' + id + '&oname=' + escape(name) + '&x=' + x + '&y=' + y + '&type=' + type;
    window.open(url, "我要纠错");
}

//我要入住
function fnEShopAndCompanyJoin(oid, oname, x, y) {
    if (!oid) {
        oid = 0;
    }
    if (!oname) {
        oname = '';
    }
    var url = '/wiki/EshopAndCompanyJoin.aspx?oid=' + oid + '&oname=' + escape(oname) + "&x=" + x + "&y=" + y;
    window.open(url, "我要入驻");
}

//泡泡 公交线路搜索
function fnOnBusClick(busid, busname, stationName) {
    tab = new TabControl.Tab(document, 'search', busname, '/Fundation/BusNoSearch.html?stationName=' + escape(stationName) + '&action=1&key=' + busid, true, true, 80);
    fnAddTab(tab);
}

//泡泡周边公交
function fnShowPeripheralBus(x, y, oname) {
    var tab = new TabControl.Tab(document, 'PeripheralBus', '周边公交', '/Fundation/PeripheralBus.html?oname=' + escape(oname) + '&x=' + x + '&y=' + y, true, true, 80);
    fnAddTab(tab);
}

//泡泡公交换乘
function fnShowBusTransfer(x, y, oname) {
    var tab = new TabControl.Tab(document, 'busTransferSearch', '公交换乘', '/Fundation/BusTransfer.html?oname=' + escape(oname) + '&x=' + x + '&y=' + y, true, true, 80);
    fnAddTab(tab);
}

//页卡公交换乘搜索
function fnBusTransferSearch(start, end) {
    if (start != '请输入终点' || end != '请输入起点') {
        tab = new TabControl.Tab(document, 'search', start + '→' + end, '/Fundation/BusTransferSearch.html?action=1&s=' + escape(start) + '&e=' + escape(end), true, true, 80);
        fnAddTab(tab);
    }
}

function fnAddBusLineSearchTab(sBusNo) {
    var tab = new TabControl.Tab(document, 'BusLineSearch', sBusNo, '/Fundation/BusNoSearch.html?key=' + escape(sBusNo), true, true, 80);
    fnAddTab(tab);
}
function fnAddBusStationSearchTab(sStationName, stype) {
    var tab = new TabControl.Tab(document, 'BusStationSearch', sStationName, '/Fundation/BusStationSearch.html?key=' + escape(sStationName) + '&sType=' + stype, true, true, 80);
    fnAddTab(tab);
}

//GOOGLE 更大范围搜索
function fnGoogleSearch(keyword) {
    tab = new TabControl.Tab(document, 'search', keyword, '/Fundation/GooglePoiSearch.aspx?cityname=' + escape(GlobalConfig.CityName) + '&keyword=' + escape(keyword), true, true, 80);
    fnAddTab(tab);
}

//公交线路搜索
function fnBusSearchByLine() {
    tab = new TabControl.Tab(document, 'buslinesearch', '线路搜索', GlobalConfig.WebRootPath + 'Fundation/BusNoSearch.html', true, true, 80);
    fnAddTab(tab);
}

//公交站点搜索
function fnBusSearchByStation() {
    tab = new TabControl.Tab(document, 'busstationsearch', '站点搜索', GlobalConfig.WebRootPath + 'Fundation/BusStationSearch.html', true, true, 80);
    fnAddTab(tab);
}

function fnAddBusTransferSearchTab(sStartStation, sEndStation, sType) {
    var tab = new TabControl.Tab(document, 'busTransfer', sStartStation + '→' + sEndStation, '/Fundation/BusTransferSearch.html?s=' + escape(sStartStation) + '&e=' + escape(sEndStation) + '&action=0' + '&sType=' + sType, true, true, 80);
    fnAddTab(tab);
}

//地图搜索结果回调
function onSearchDataLoadComplete(data, begin, end) {
    _IconLayer.innerHTML = '';
    _EyeIconLayer.innerHTML = '';
    for (var i = begin; i < end; i++) {
        var x = data[i].X;
        var y = data[i].Y;
        if (data[i].RecordType == 1 || data[i].RecordType == 2 || data[i].RecordType == 4) {
            fnAppendIcon(data[i].OCName, x, y, i + 1, 'Images/VesicleBg.png', 'Images/AlterVesicle.png', 'if(parent.fnShowSearchPop){parent.fnShowSearchPop(' + data[i].OwnerID + ', ' + data[i].CompanyID + ',' + data[i].LST_ID + ',' + x + ', ' + y + ',' + data[i].RecordType + ',\'' + data[i].OCName + '\',\'' + data[i].Address + '\',\'' + data[i].Telephone + '\');}', 41, 33, 7, 32, true);
        }
        else {
            var epoint = vM.GLatLng2EPoint(new EGIS.LatLng(data[i].Lx, data[i].Ly));
            x = epoint.X;
            y = epoint.Y;
            fnAppendIcon(data[i].OCName, x, y, i + 1, 'Images/VesicleBg.png', 'Images/AlterVesicle.png', 'if(parent.fnShowSearchPop){parent.fnShowSearchPop(' + data[i].OwnerID + ', ' + data[i].CompanyID + ',' + data[i].LST_ID + ',' + data[i].Lx + ', ' + data[i].Ly + ',' + data[i].RecordType + ',\'' + data[i].OCName + '\',\'' + data[i].Address + '\',\'' + data[i].Telephone + '\');}', 41, 33, 7, 32, true);
        }
    };
}

//Google更大范围搜索
function onGoogleSearchDataLoadComplete(data, begin, end, page) {
    _IconLayer.innerHTML = '';
    for (var i = begin; i < end; i++) {
        var epoint = vM.GLatLng2EPoint(new EGIS.LatLng(data[i].lat, data[i].lng));
        var x = epoint.X;
        var y = epoint.Y;
        var phoneNumber = '';
        if (data[i].phoneNumbers && data[i].phoneNumbers.length > 0) {
            phoneNumber = data[i].phoneNumbers[0].number;
        }
        fnAppendIcon(data[i].titleNoFormatting, x, y, i + 1 + (page - 1) * 8, 'Images/VesicleBg.png', 'Images/AlterVesicle.png', 'if(parent.fnShowSearchPop){parent.fnShowSearchPop(0, 0,0,' + data[i].lat + ', ' + data[i].lng + ',' + 3 + ',\'' + data[i].titleNoFormatting + '\',\'' + data[i].streetAddress + '\',\'' + phoneNumber + '\');}', 41, 33, 7, 32, true);

    }
}

//添加小图标至地图与鹰眼中
function fnAppendIcon(title, x, y, text, sImgPath, sImgPath2, sFn, w, h, ew, eh, isAppendEye) {
    if (sImgPath2.length == 0) {
        sImgPath2 = sImgPath;
    }
    var iconHTML = '';
    if (EGIS.Browser.Name == 'MSIE' && EGIS.Browser.Version < 7) {
        iconHTML = '<div id="' + x + '_' + y + '" style ="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + sImgPath + '\',sizingMethod=\'image\');width:' + w + 'px;height:' + h + 'px; cursor:pointer;" onclick="' + sFn + '" title="' + title + '"><span style="display:block;width:32px;line-height:33px;text-align:center;font-size:12px;font-family:\"宋体\";color:#930;">' + text + '</span></div>';
    }
    else {
        iconHTML = '<div id="' + x + '_' + y + '" style ="background-image:url(' + sImgPath + ');width:' + w + 'px;height:' + h + 'px; cursor:pointer;" onclick="' + sFn + '" title="' + title + '"><span style="display:block;width:32px;line-height:33px;text-align:center;font-size:12px;font-family:\"宋体\";color:#930;">' + text + '</span></div>'; ;
    }
    var p = vM.$C('div');
    p.innerHTML = iconHTML;
    vM.AppendEntity(p, _IconLayer, false, x, y, w, h, ew, eh, false);
    vM.$(x + '_' + y).onmouseover = function() {
        if (EGIS.Browser.Name == 'MSIE' && EGIS.Browser.Version < 7) {
            this.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + sImgPath2 + '\',sizingMethod=\'image\')';
        }
        else {
            this.style.backgroundImage = 'url(' + sImgPath2 + ')';
        }
    };
    vM.$(x + '_' + y).onmouseout = function() {
        if (EGIS.Browser.Name == 'MSIE' && EGIS.Browser.Version < 7) {
            this.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + sImgPath + '\',sizingMethod=\'image\')';
        }
        else {
            this.style.backgroundImage = 'url(' + sImgPath + ')';
        }
    };
    if (isAppendEye) {
        var pe = vMe.$C('div');
        pe.innerHTML = iconHTML;
        vMe.AppendEntity(pe, _EyeIconLayer, false, x, y, w, h, ew, eh, false);
        vMe.$(x + '_' + y).onmouseover = function() {
            if (EGIS.Browser.Name == 'MSIE' && EGIS.Browser.Version < 7) {
                this.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + sImgPath2 + '\',sizingMethod=\'image\')';
            }
            else {
                this.style.backgroundImage = 'url(' + sImgPath2 + ')';
            }
        };
        vMe.$(x + '_' + y).onmouseout = function() {
            if (EGIS.Browser.Name == 'MSIE' && EGIS.Browser.Version < 7) {
                this.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + sImgPath + '\',sizingMethod=\'image\')';
            }
            else {
                this.style.backgroundImage = 'url(' + sImgPath + ')';
            }
        };
    }
}

//地图搜索|公交搜索|E店搜索Suggest
function fnKeySearchSuggest(fn, input, x, y, w, type, reqtype, evt) {
    if (input.value.trim().length < 1) {
        __EdushiSuggest.Hide();
        input.focus();
        return;
    }
    evt = window.event ? window.event : evt;
    var maptype; //地图|E店搜索类型
    if (reqtype != 0) {
        maptype = reqtype;
    }
    else {
        switch (__searchtype) {
            case 0:
                maptype = 2;    //全站搜索
                break;
            case 1:
                maptype = 3;    //名称搜索
                break;
            case 2:
                maptype = 4;    //地址搜索
                break;
            case 9:  //是否要判断道路（7）
                maptype = 7;
                break;
        }
    }
    fnKeyInputChanged(input, evt.keyCode, x, y, w, type, maptype);
    if (evt.keyCode == 13 && __EdushiSuggest.SuggestPannel.style.display != 'block') {
        eval(fn);
        __EdushiSuggest.Hide();
    }

    if (evt.stopPropagation) {
        evt.stopPropagation();
    }
    else {
        evt.cancelBubble = true;
    }
}

function fnKeyInputChanged(input, keyCode, x, y, w, type, maptype) {
    if (input.value.length > 0 && input.value != __EdushiSuggest.LastKeyword && keyCode != 38 && keyCode != 40 && keyCode != 13) {
        if (type == 'bus') {
            var url = GlobalConfig.EDataCenterUrl + 'CommMap5.0/StationSuggest.aspx?req=3&domain=' + GlobalConfig.Domain + '&l=' + GlobalConfig.Language + '&kw=' + escape(input.value) + '&indexversion=6';

            if (maptype == 3) {
                url = GlobalConfig.EDataCenterUrl + 'CommMap5.0/StationSuggest.aspx?req=2&domain=' + GlobalConfig.Domain + '&l=' + GlobalConfig.Language + '&kw=' + escape(input.value) + '&indexversion=6';
            }
            ENetwork.DownloadScript(url, function() {
                if (typeof _SuggestData != 'undefined') {
                    __EdushiSuggest.Show(_SuggestData, x, y, w);
                }
                else {
                    __EdushiSuggest.Hide();
                }
            });
        }
        else if (type == 'map') {
            var url = '';
            if (maptype == 5) {
                //url = GlobalConfig.EDataCenterUrl + 'CommMap5.0/SearchSuggest.aspx?domain=' + GlobalConfig.Domain + '&l=' + GlobalConfig.Language + '&req=' + maptype + '&address=' + escape($('txtSearchPlace').value) + '&kw=' + escape(input.value) + '&indexversion=6';
                url = GlobalConfig.DataCetnerSearchDataUrl + 'SearchMapForNameAddrSuggest/' + GlobalConfig.CityCode + '/' + GlobalConfig.Language + '/Format/Json/Search/1/10?q=' + encodeURIComponent(input.value.trim()) + '&addr=' + encodeURIComponent($('txtSearchPlace').value.trim());
            }
            else {
                //url = GlobalConfig.EDataCenterUrl + 'CommMap5.0/SearchSuggest.aspx?domain=' + GlobalConfig.Domain + '&l=' + GlobalConfig.Language + '&req=' + maptype + '&kw=' + escape(input.value) + '&indexversion=6';
                var _type = 'SearchMapForFuzzySuggest';

                switch (maptype) {
                    case 2:
                        _type = 'SearchMapForFuzzySuggest';
                        break;
                    case 3:
                        _type = 'SearchMapForNameSuggest';
                        break;
                    case 4:
                        _type = 'SearchMapForAddrSuggest';
                        break;
                    case 7:
                        _type = 'SearchMapForRoadSuggest';
                        break;
                }

                url = GlobalConfig.DataCetnerSearchDataUrl + _type + '/' + GlobalConfig.CityCode + '/' + GlobalConfig.Language + '/Format/Json/Search/1/10?q=' + encodeURIComponent(input.value.trim());
            }
            ENetwork.DownloadScript(url, function() {
                if (typeof _SuggestData != 'undefined') {
                    __EdushiSuggest.Show(_SuggestData, x, y, w);
                }
                else {
                    __EdushiSuggest.Hide();
                }
            });
        }
    }

    __EdushiSuggest.KeycodeChange(keyCode);
    __EdushiSuggest.SelectedIndexChanged = function(item) {
        input.value = item.Value;
        input.focus();
        if (input.createTextRange) {
            var range = input.createTextRange();
            range.collapse(true);
            range.moveStart('character', input.value.length);
            range.select();
        }
        else {
            input.selectionStart = input.value.length;
        }
    }
}

function fnMapSearch() {
    __EdushiSuggest.Hide();
    var sKeyword1, sKeyword2, iMapSearchType;
    var tab;

    switch (__searchtype) {
        case 0:   //模糊搜索
            fnGoogleStat('模糊搜索');
            break;
        case 1:   //名称搜索
            fnGoogleStat('名称搜索');
            break;
        case 2:   //地址搜索
            fnGoogleStat('地址搜索');
            break;
        case 3:   //周边搜索
            fnGoogleStat('周边搜索');
            break;
        case 9: //道路搜索
            fnGoogleStat('道路搜索');
            break;
    }
    switch (__searchtype) {
        case 0:   //模糊搜索            
        case 1:   //名称搜索
        case 2:   //地址搜索
        case 9: //道路搜索
            fnGoogleStat('地址搜索');
            sKeyword1 = $('txtSearchKey').value.trim();
            if (sKeyword1.length < 1) {
                $('txtSearchKey').focus();
                return;
            }
            tab = new TabControl.Tab(document, 'search', sKeyword1, '/Fundation/LocalSearch.aspx?type=' + __searchtype + '&keyword1=' + escape(sKeyword1), true, true, 80);
            break;
        case 3:   //周边搜索
            fnGoogleStat('周边搜索');
            sKeyword1 = $('txtSearchPlace').value.trim();
            if (sKeyword1.length < 1) {
                $('txtSearchPlace').focus();
                return;
            }
            sKeyword2 = $('txtSearchSomething').value.trim();
            if (sKeyword2.length < 1) {
                $('txtSearchSomething').focus();
                return;
            }
            tab = new TabControl.Tab(document, 'search', sKeyword1 + sKeyword2, '/Fundation/LocalSearch.aspx?type=' + __searchtype + '&keyword1=' + escape(sKeyword1) + '&keyword2=' + escape(sKeyword2), true, true, 80);
            break;
    }
    fnAddTab(tab);
}
/*×××××××××××××××××地图页卡搜索部分×××××××××××××××××*/

/*×××××××××××××××××用户登录部分×××××××××××××××××*/
function fnCheckUserLoginInit() {
    if ($('liLoginInfo').innerHTML == '') {
        //用JS获取用户的昵称
        var cc = new CookieHelper();
        var cookieNickNameCookie = cc.getCookie('MemberNickName');
        if (cookieNickNameCookie != null) {
            $('liLoginInfo').innerHTML = '<span style="color:#ff6400;margin-right:5px;">欢迎您！ ' + cookieNickNameCookie + '</span><a style="cursor:pointer;" onmouseover="$(\'mMenu\').style.display = \'block\';" onmouseout="$(\'mMenu\').style.display = \'none\';">[我的地图]</a><a href="' + GlobalConfig.UserCenterUrl + 'Index.aspx?city=' + GlobalConfig.CityCode + '" target="_blank">[我的E都市]</a><a href="javascript:fnLoginOut();">[退出]</a>';
        }
        else {
            $('liLoginInfo').innerHTML = '<span>欢迎您！</span><a href="' + GlobalConfig.UserCenterUrl + 'Register.aspx" target="_blank" title="注册">[注册]</a><a href="javascript:;" onclick="fnShowLogin();pageTracker._trackEvent(\'Map7.0\', \'Mater_UI\', \'登录\'); ">[登录]</a>';
        }
    }
}

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
        var loginHtml = '<div class="LoginNavT"></div><div class="LoginNavD"><h3>用户登录</h3><table border="0" cellpadding="0" cellspacing="0"><tr><th>用户名：</th><td><input class="InFieldSty" onfocus="this.className=\'ThisStyle\';" onblur="this.className=\'InFieldSty\';" style="width:160px;" type="text" id="txtUserName"/></td></tr><tr><th>密码：</th><td><input class="InFieldSty" onfocus="this.className=\'ThisStyle\';" onblur="this.className=\'InFieldSty\';" style="width:160px;" type="password" id="txtPassword"/></td></tr><tr><th>验证码：</th><td><span><input onfocus="this.className=\'ThisStyle\';" onblur="this.className=\'InFieldSty\';" class="InFieldSty" style="width:67px;" type="text" id="txtVerifyCode"/></span><span style="padding-top:1px"><img id="imgVerifyCode" style="cursor:pointer" alt="单击获取新验证码" /></span></td></tr><tr><th>&nbsp;</th><td><span><input id="chkInvalidate" type="checkbox" name="chkInvalidate" /></span><span><label for="chkInvalidate">下次记住密码</label>&nbsp;&nbsp;&nbsp;&nbsp;<a href="' + GlobalConfig.UserCenterUrl + 'ForPassword.aspx" target="_blank">忘记密码？</a></span></td></tr><tr><th>&nbsp;</th><td><input type="image" src="/Images/LoginBtn1.gif" onclick="fnLogin()" />&nbsp;&nbsp;<img src="/Images/RegBtn1.gif" alt="注册" style="cursor:pointer;" onclick="window.open(\'' + GlobalConfig.UserCenterUrl + 'Register.aspx\',\'_blank\')" /></td></tr></table><div class="LoginClew" id="divLoginResultMsg"></div></div><div style="position:absolute; top:12px; right:8px; cursor:hand; width:13px; height:13px; overflow:hidden;background:url(/Images/CloseBtn.gif) no-repeat left top;" onclick="javascript:$(\'divDialogBg\').style.display=\'none\';$(\'divLoginDialog\').style.display=\'none\';" onmouseover="this.style.backgroundPosition=\'left -13px\'"onmouseout="this.style.backgroundPosition=\'left top\'" title="关闭窗口"></div></div>';
        document.body.appendChild(divLogin);
        //IE6的延时加载
        setTimeout(function() { $('divLoginDialog').innerHTML = loginHtml; }, 1);
    }
    setTimeout(function() {
        $('imgVerifyCode').src = GlobalConfig.WebRootPath + 'VerifyImage.aspx?rnd=' + $Rnd();
        $('divLoginResultMsg').style.display = 'none';
        $('divDialogBg').style.display = 'block';
        $('divLoginDialog').style.display = 'block';
        $('imgVerifyCode').onclick = function() { this.src = GlobalConfig.WebRootPath + 'VerifyImage.aspx?rnd=' + $Rnd(); };
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
    var sLoginUrl = GlobalConfig.WebRootPath + 'Login.aspx?verifycode=' + sVerifyCode + '&isinvalidate=' + isInvalidate + '&action=login&rnd=' + $Rnd() + '&username=' + escape(sUserName) + '&password=' + sPassword;
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
                $('imgVerifyCode').src = GlobalConfig.WebRootPath + 'VerifyImage.aspx?rnd=' + $Rnd();
            }
            else if (__LoginResult == -1) {
                $('divLoginResultMsg').style.display = 'block';
                $('divLoginResultMsg').innerHTML = '登录失败，您输入的验证码不正确！';
                $('imgVerifyCode').src = GlobalConfig.WebRootPath + 'VerifyImage.aspx?rnd=' + $Rnd();
            }
        }
        else {
            $('divLoginResultMsg').style.display = 'block';
            $('divLoginResultMsg').innerHTML = '登录失败！';
            $('imgVerifyCode').src = GlobalConfig.WebRootPath + 'VerifyImage.aspx?rnd=' + $Rnd();
        }
    });
}

function fnLoginOut() {
    var sLoginUrl = GlobalConfig.WebRootPath + 'Login.aspx?action=loginout&rnd=' + $Rnd();
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

function fnLoginSuccess(memberInfo) {
    $('liLoginInfo').innerHTML = '<span style="color:#ff6400;margin-right:5px;">欢迎您！ ' + memberInfo.LM_NickName + '</span><a style="cursor:pointer;" onmouseover="$(\'mMenu\').style.display = \'block\';" onmouseout="$(\'mMenu\').style.display = \'none\';">[我的地图]</a><a href="' + GlobalConfig.UserCenterUrl + 'Index.aspx?city=' + GlobalConfig.CityCode + '" target="_blank">[我的E都市]</a><a href="javascript:fnLoginOut();">[退出]</a>';
    $('divLoginDialog').style.display = 'none';
    fnShowMessageBox('用户登录', '登录成功！欢迎回来' + memberInfo.LM_NickName);
}

function fnLoginOutSuccess() {
    $('liLoginInfo').innerHTML = '<span>欢迎您！</span><a href="' + GlobalConfig.UserCenterUrl + 'Register.aspx" target="_blank">[注册]</a><a href="javascript:;" onclick="fnShowLogin()">[登录]</a>';
}
/*×××××××××××××××××用户登录部分×××××××××××××××××*/

/*×××××××××××××××××公交相关×××××××××××××××××*/
//定位到公交站并显示线路信息
function fnGotoBusStation(id, name, x, y) {
    MoveTo(x, y, true);
    //if (_BusTransferLineLayer.innerHTML == '') {
    var PopHtml = '<span style="cursor:pointer; height:26px; float:left; font-size:12px; color:#000;white-space:nowrap;{$topwidth}"><span style="cursor:pointer; width:24px; height:24px; float:left; background:url(/Images/gongjiao.gif) no-repeat; text-align:center; padding-top:2px;">1</span><span style="cursor:pointer; height:19px;line-height:19px; background:#fff; padding-right:4px; float:left;{$width};" onclick="parent.fnShowBusStation(' + id + ',\'' + name + '\',' + x + ',' + y + ')">' + name + '</span></span>';
    //_BusStationLayer.innerHTML = '';
    var div = vM.$C('div');
    div.innerHTML = PopHtml;
    div.id = $Rnd();
    var vlen = name.length * 12.1;
    vM.AppendEntity(div, _BusStationLayer, false, x * 1, y * 1, vlen + 35, 26, 12, 28, false);
    //}
}

//公交线路搜索定位泡泡显示
function fnShowBusLineStationPop(index, x, y, type) {
    MoveTo(x, y, true);
    fnShowBusLinePop(index, x, y, type);
}

function fnDrawingBusLine(busLineCoordList) {
    _BusLineCoordList = busLineCoordList;
    _BusTransferLineLayer.innerHTML = '';
    _BusStationLayer.innerHTML = '';
    for (var i = 0; i < _BusLineCoordList.length; i++) {
        var coord = _BusLineCoordList[i];
        vM.DrawPolyLine(_BusTransferLineLayer, vM.ChangeMapCoordsToBox(coord.Coords), coord.Size, coord.Color, coord.Alpha);
        var PopHtml = '<span style="cursor:pointer; height:26px; float:left; font-size:12px; color:#000;white-space:nowrap;{$topwidth}"><span style="cursor:pointer; width:24px; height:24px; float:left; background:url(/Images/gongjiao.gif) no-repeat; text-align:center; padding-top:2px; color:white;">{$No}</span><span style="cursor:pointer; height:19px;line-height:19px; background:#fff; padding-right:4px; float:left;{$width};" onclick="parent.fnShowBusStation({$StationID},\'{$BusStationName}\',{$X},{$Y})">{$BusStationName}</span></span>';
        if (coord.Color == '#FF9900') {
            PopHtml = '<span style="cursor:pointer; height:26px; float:left; font-size:12px; color:#000;white-space:nowrap;{$topwidth}"><span style="cursor:pointer; width:24px; height:24px; float:left; background:url(/Images/gongjiao2.gif) no-repeat; text-align:center; padding-top:2px; color:white;">{$No}</span><span style="cursor:pointer; height:19px;line-height:19px; background:#fff; padding-right:4px; float:left;{$width};" onclick="parent.fnShowBusStation({$StationID},\'{$BusStationName}\',{$X},{$Y})">{$BusStationName}</span></span>';
        }
        for (var j = 0; j < coord.PassStation.length; j++) {
            var vlen = coord.PassStation[j].StationName.length * 12.1;
            var nd = vM.$C('div');
            nd.innerHTML = PopHtml.replace('{$No}', (j + 1)).replaceAll('{$BusStationName}', coord.PassStation[j].StationName).replace('{$topwidth}', 'width:' + (vlen + 40) + 'px').replace('{$width}', 'width:' + (vlen + 10) + 'px').replace('{$StationID}', coord.PassStation[j].StationID).replace('{$X}', coord.PassStation[j].PositionX).replace('{$Y}', coord.PassStation[j].PositionY);
            vM.AppendEntity(nd, _BusStationLayer, false, coord.PassStation[j].PositionX, coord.PassStation[j].PositionY, vlen + 35, 26, 12, 28, false);
        }
    }
}

//加载完线路显示公交站
function fnShowBusStationIco(arrBusData, type) {
    _BusLineType = type;
    _BusLineData = arrBusData;
    _BusTransferLineLayer.innerHTML = '';
    _BusStationLayer.innerHTML = '';
    if (_BusLineData != null) {
        var PopHtml = '<span style="cursor:pointer; height:26px; float:left; font-size:12px; color:#000;white-space:nowrap;{$topwidth}"><span style="cursor:pointer; width:24px; height:24px; float:left; background:url(/Images/gongjiao.gif) no-repeat; text-align:center; padding-top:2px; color:white;">{$No}</span><span style="cursor:pointer; height:19px;line-height:19px; background:#fff; padding-right:4px; float:left;{$width};" onclick="parent.fnShowBusLinePop({$index},{$X},{$Y},\'' + type + '\')">{$BusStationName}</span></span>';
        if (_BusLineType == 1) {
            var l = _BusLineData.BusUp.length;
            for (i = 0; i < l; i++) {
                var oBusUp = _BusLineData.BusUp[i];
                var vlen = oBusUp.StationName.length * 12.1;
                var nd = vM.$C('div');
                nd.id = 'B_pop' + i;
                nd.innerHTML = PopHtml.replace('{$No}', (i + 1)).replace('{$BusStationName}', oBusUp.StationName).replace('{$topwidth}', 'width:' + (vlen + 40) + 'px').replace('{$width}', 'width:' + (vlen + 10) + 'px').replace('{$index}', i).replace('{$X}', oBusUp.PositionX).replace('{$Y}', oBusUp.PositionY);
                vM.AppendEntity(nd, _BusStationLayer, false, oBusUp.PositionX, oBusUp.PositionY, vlen + 35, 26, 12, 28, false);
            }
            if (_BusLineData.UpCoord.length > 0) {
                vM.DrawPolyLine(_BusTransferLineLayer, vM.ChangeMapCoordsToBox(_BusLineData.UpCoord), 4, '#ff3300', 0.7);
            }
        } else {
            var l = _BusLineData.BusDown.length;
            var coords;
            for (i = 0; i < l; i++) {
                var oBusDown = _BusLineData.BusDown[i];
                coords += oBusDown.PositionX + ',' + oBusDown.PositionY + ',';
                var vlen = oBusDown.StationName.length * 12.1;
                var nd = vM.$C('div');
                nd.id = 'B_pop' + i;
                nd.innerHTML = PopHtml.replace('{$No}', (i + 1)).replace('{$BusStationName}', oBusDown.StationName).replace('{$topwidth}', 'width:' + (vlen + 40) + 'px').replace('{$width}', 'width:' + (vlen + 10) + 'px').replace('{$index}', i).replace('{$X}', oBusDown.PositionX).replace('{$Y}', oBusDown.PositionY);
                vM.AppendEntity(nd, _BusStationLayer, false, oBusDown.PositionX, oBusDown.PositionY, vlen + 35, 26, 12, 28, false);
            }
            if (_BusLineData.DownCoord.length > 0) {
                vM.DrawPolyLine(_BusTransferLineLayer, vM.ChangeMapCoordsToBox(_BusLineData.DownCoord), 4, '#ff3300', 0.7);
            }
        }
    }
}

//公交搜索
function fnBusSearch() {
    __EdushiSuggest.Hide();
    var iBusSearchType = '0';
    var subwayType = '0'; //地铁相关类型
    switch (iBusSearchType) {
        case '0':   //公交换乘搜索
            fnGoogleStat('公交换乘搜索');
            var sStartStation = $('txtBusStart').value.trim();
            if (sStartStation.length < 1) {
                $('txtBusStart').focus();
                return;
            }
            var sEndStation = $('txtBusEnd').value.trim();
            if (sEndStation.length < 1) {
                $('txtBusEnd').focus();
                return;
            }
            if (sStartStation == '起点' || sEndStation == '终点') {
                $('txtBusStart').focus();
                return;
            }
            fnAddBusTransferSearchTab(sStartStation, sEndStation, subwayType);
            break;
    }
}
/*×××××××××××××××××公交相关×××××××××××××××××*/

/*×××××××××××××××××地图控件相关×××××××××××××××××*/
//显示实体POP
function fnShowEntityPop(id, x, y) {
    if (id > 0) {
        if (!_EntityPopControl) {
            ENetwork.DownloadScript('/Controls/EntityPopControl.js', function() {
                _EntityPopControl = new EntityPopControl(vM.Body.document);
                //兼容地图定位
                if (x == 0 && y == 0) {
                    _EntityPopControl.ID = vM.AppendEntity(_EntityPopControl.Body, _PopLayer, false, 0, 0, 305, 276, 36, 274, false);
                } else {
                    _EntityPopControl.ID = vM.AppendEntity(_EntityPopControl.Body, _PopLayer, false, x, y, 305, 276, 36, 274, false);
                }

                _EntityPopControl.onLoadComplete = function() {
                    if (x == 0 && y == 0) {
                        _EntityPopControl.ShowPop(id, true);
                    }
                    else {
                        _EntityPopControl.ShowPop(id);
                        MoveTo(x * 1 + vM.GetMapPos(66), y * 1 + vM.GetMapPos(-96), true);
                    }
                };
                _EntityPopControl.onCavil = function(x, y, id, name) {
                    //重写纠错事件
                    fnReport(x * 1, y * 1, 0, id, name);  //0-实体纠错
                };
                _EntityPopControl.onCompanyList = function(oid, ocname) {
                    var tab = new TabControl.Tab(document, 'companyList', ocname, '/Fundation/CompanyList.html?ocname=' + escape(ocname) + '&oid=' + oid, true, true, 80);
                    fnAddTab(tab);
                };
                _EntityPopControl.onBusTransfer = function(x, y, name) {
                    fnShowBusTransfer(x, y, name);
                };
                _EntityPopControl.onNearByBus = function(x, y, oname) {
                    fnShowPeripheralBus(x, y, oname);
                };
                _EntityPopControl.onLiveIn = function(id, name, x, y) {
                    fnEShopAndCompanyJoin(id, name, x, y);
                };
                _EntityPopControl.onMergeSearch = function(key) {
                    if (_EntityPopControl.Tab != null) {
                        _EntityPopControl.Tab.destroy();
                    }
                    _EntityPopControl.Tab = fnOpenMergeSearch(key, 0, '', 0, 0, 0, 0, 0, '', '', 0);
                    _EntityPopControl.Tab.onDestroy = function() {
                        _EntityPopControl.Tab = null;
                    };
                };
            });
        }
        else {
            vM.MoveEntity(_EntityPopControl.ID, x * 1, y * 1);
            MoveTo(x * 1 + vM.GetMapPos(66), y * 1 + vM.GetMapPos(-96), true);
            _EntityPopControl.ShowPop(id);
        }
    }
}

//显示企业Pop
function fnShowCompanyPop(id, x, y) {
    if (id > 0) {
        if (!_CompanyPopControl) {
            ENetwork.DownloadScript('/Controls/CompanyPopControl.js', function() {
                _CompanyPopControl = new CompanyPopControl(vM.Body.document);
                //兼容地图定位
                if (x == 0 && y == 0) {
                    _CompanyPopControl.ID = vM.AppendEntity(_CompanyPopControl.Body, _PopLayer, false, 0, 0, 305, 276, 36, 274, false);
                }
                else {
                    _CompanyPopControl.ID = vM.AppendEntity(_CompanyPopControl.Body, _PopLayer, false, x, y, 305, 276, 36, 274, false);
                }
                _CompanyPopControl.onLoadComplete = function() {
                    if (x == 0 && y == 0) {
                        _CompanyPopControl.ShowPop(id, true);
                    }
                    else {
                        _CompanyPopControl.ShowPop(id);
                        MoveTo(x * 1 + vM.GetMapPos(66), y * 1 + vM.GetMapPos(-96), true);
                    }
                };
                //重写纠错事件
                _CompanyPopControl.onCavil = function(x, y, id, name) {
                    fnReport(x * 1, y * 1, 1, id, name); //1-企业纠错
                };
                _CompanyPopControl.onBusTransfer = function(x, y, oname) {
                    fnShowBusTransfer(x, y, oname);
                };
                _CompanyPopControl.onNearByBus = function(x, y, oname) {
                    fnShowPeripheralBus(x, y, oname);
                };
                _CompanyPopControl.onMergeSearch = function(key, type, tags) {
                    if (_CompanyPopControl.Tab != null) {
                        _CompanyPopControl.Tab.destroy();
                    }
                    _CompanyPopControl.Tab = fnOpenMergeSearch(key, 0, '', 0, 0, 0, 0, 0, type, tags, 0);
                    _CompanyPopControl.Tab.onDestroy = function() {
                        _CompanyPopControl.Tab = null;
                    };
                };
            });
        }
        else {
            vM.MoveEntity(_CompanyPopControl.ID, x * 1, y * 1);
            MoveTo(x * 1 + vM.GetMapPos(66), y * 1 + vM.GetMapPos(-96), true);
            _CompanyPopControl.ShowPop(id);
        }
    }
}

//显示E店Pop  &*&
function fnShowEShopPop(id, x, y) {
    if (id > 0) {
        if (!_EShopPopControl) {
            ENetwork.DownloadScript('/Controls/EShopPopControl.js', function() {
                _EShopPopControl = new EShopPopControl(vM.Body.document);
                //兼容地图定位
                if (x == 0 && y == 0) {
                    _EShopPopControl.ID = vM.AppendEntity(_EShopPopControl.Body, _PopLayer, false, 0, 0, 305, 276, 36, 274, false);
                }
                else {
                    _EShopPopControl.ID = vM.AppendEntity(_EShopPopControl.Body, _PopLayer, false, x, y, 305, 276, 36, 274, false);
                }
                _EShopPopControl.onLoadComplete = function() {
                    if (x == 0 && y == 0) {
                        _EShopPopControl.ShowPop(id, true);
                    }
                    else {
                        _EShopPopControl.ShowPop(id);
                        MoveTo(x * 1 + vM.GetMapPos(66), y * 1 + vM.GetMapPos(-96), true);
                    }
                };
                _EShopPopControl.onCavil = function(x, y, id, name) {
                    fnReport(x * 1, y * 1, 1, id, name); //1-企业纠错
                };
                _EShopPopControl.onBusTransfer = function(x, y, oname) {
                    fnShowBusTransfer(x, y, oname);
                };
                _EShopPopControl.onNearByBus = function(x, y, oname) {
                    fnShowPeripheralBus(x, y, oname);
                };
                _EShopPopControl.onMergeSearch = function(key, lst_id, domain, cid, vid, tid, card, vip, type, tags) {
                    if (_EShopPopControl.Tab != null) {
                        _EShopPopControl.Tab.destroy();
                    }
                    _EShopPopControl.Tab = fnOpenMergeSearch(key, lst_id, domain, cid, vid, tid, card, vip, type, tags, 0);
                    _EShopPopControl.Tab.onDestroy = function() {
                        _EShopPopControl.Tab = null;
                    };
                };
            });
        }
        else {
            vM.MoveEntity(_EShopPopControl.ID, x * 1, y * 1);
            MoveTo(x * 1 + vM.GetMapPos(66), y * 1 + vM.GetMapPos(-96), true);
            _EShopPopControl.ShowPop(id);
        }
    }
}

//显示二维POP
function fnShowEwPoiPop(x, y, name, address, telephone) {
    if (!_PoiPopControl) {
        ENetwork.DownloadScript('/Controls/PoiPopControl.js', function() {
            fnInitPoiPopControl();
            fnShowEwPoiPop(x, y, name, address, telephone);
        });
    }
    else {
        if (vM.MapState().Map != 0 && vM.MapState.Succeed) {
            var epoint = vM.GLatLng2EPoint(new EGIS.LatLng(x, y));
            vM.MoveEntity(_PoiPopControl.ID, epoint.X * 1, epoint.Y * 1);
            MoveTo(epoint.X + 100, epoint.Y - 50, true);
            _PoiPopControl.ShowPop(name, address, telephone, epoint.X * 1, epoint.Y * 1);
        }
        else {
            setTimeout(function() { fnShowEwPoiPop(x, y, name, address, telephone); }, 300);
        }
    }
}

//显示主题Pop
function fnShowThemePop(id, x, y, cid, btid, type) {
//    var url = GlobalConfig.EDataCenterUrl + 'CommMap5.0/EntityInfo.aspx?domain=' + GlobalConfig.Domain + '&l=' + GlobalConfig.Language + '&req=1&id=' + cid + '&indexversion=6';
    var url = GlobalConfig.DataCetnerSearchDataUrl + 'SearchMapByCompany/' + GlobalConfig.CityCode + '/' + GlobalConfig.Language + '/Format/Json/Search?q=' + cid;
    
    if (cid > 0) {
        ENetwork.DownloadScript(url, function() {
        if (typeof _EntityInfo != 'undefined' && _EntityInfo.length > 0) {
                var o = _EntityInfo[0];
                if (o.LST_ID * 1 > 0) {
                    fnShowEShopPop(cid, x, y);
                }
                else {
                    if (x != 0 && y != 0) {
                        fnShowCompanyPop(cid, x, y);
                    }
                    else {
                        fnLoadThemePop(id, 0, 0, btid);
                    }
                }
            }
        });
    }
    else {
        fnLoadThemePop(id, x, y, btid, 1);
    }
}

//显示推荐Pop根据主题标题和内容
function ShowCommendPopByContent(title, content, x, y) {
    fnLoadThemePop(1, x, y, 0, 0, title, content);
}

//加载显示主题泡泡
function fnLoadThemePop(id, x, y, btid, type, title, content) {
    if (id > 0) {
        if (!_ThemePopControl) {
            ENetwork.DownloadScript('/Controls/CommendPopControl.js', function() {
                _ThemePopControl = new CommendPopControl(vM.Body.document);
                if (x == 0 && y == 0) {
                    _ThemePopControl.ID = vM.AppendEntity(_ThemePopControl.Body, _PopLayer, false, 0, 0, 305, 276, 36, 274, false);
                }
                else {
                    _ThemePopControl.ID = vM.AppendEntity(_ThemePopControl.Body, _PopLayer, false, x, y, 305, 276, 36, 274, false);
                }
                _ThemePopControl.onLoadComplete = function() {
                    if (x == 0 && y == 0) {
                        _ThemePopControl.ShowPop(id, btid, true);
                    }
                    else {
                        if (type == 1) {
                            _ThemePopControl.ShowPop(id, btid);
                            MoveTo(x * 1 + vM.GetMapPos(66), y * 1 + vM.GetMapPos(-96), true);
                        }
                        if (type == 0) {
                            _ThemePopControl.ShowPopData(x, y, title, content);
                        }
                    }
                };
                _ThemePopControl.onCavil = function(x, y, id, name) {
                    fnShowDebugControl(x * 1, y * 1, id, name, 1);
                };
                _ThemePopControl.onBusTransfer = function(x, y, oname) {
                    fnShowBusTransfer(x, y, oname);
                };
                _ThemePopControl.onNearByBus = function(x, y, oname) {
                    fnShowPeripheralBus(x, y, oname);
                };
                _ThemePopControl.onMergeSearch = function(key) {
                    if (_ThemePopControl.Tab != null) {
                        _ThemePopControl.Tab.destroy();
                    }
                    _ThemePopControl.Tab = fnOpenMergeSearch(key, 0, '', 0, 0, 0, 0, 0, '', '', 0);
                    _ThemePopControl.Tab.onDestroy = function() {
                        _ThemePopControl.Tab = null;
                    };
                };
            });
        }
        else {
            vM.MoveEntity(_ThemePopControl.ID, x * 1, y * 1);
            MoveTo(x * 1 + vM.GetMapPos(66), y * 1 + vM.GetMapPos(-96), true);
            if (type == 1) {
                _ThemePopControl.ShowPop(id, btid);
            }
            if (type == 0) {
                _ThemePopControl.ShowPopData(x, y, title, content);
            }
        }
    }
}

//初始化二维泡泡
function fnInitPoiPopControl() {
    var flags = false;
    if (!_PoiPopControl) {
        _PoiPopControl = new PoiPopControl(vM.Body.document);
        _PoiPopControl.ID = vM.AppendEntity(_PoiPopControl.Body, _PopLayer, false, 0, 0, 305, 276, 36, 274, false);
        _PoiPopControl.onLoadComplete = function() {
        };
        //重写纠错事件
        _PoiPopControl.onCavil = function(x, y, id, name) {
            fnReport(x * 1, y * 1, 1, id, name);
        };
        _PoiPopControl.onMergeSearch = function(key) {
            if (_PoiPopControl.Tab != null) {
                _PoiPopControl.Tab.destroy();
            }
            _PoiPopControl.Tab = fnOpenMergeSearch(key, 0, '', 0, 0, 0, 0, 0, '', '', 0);
            _PoiPopControl.Tab.onDestroy = function() {
                _PoiPopControl.Tab = null;
            };
        };
        flags = true;
    }
    return flags;
};

//显示公交泡泡
function fnShowBusStation(id, name, x, y) {
    if (!_BusStationControl) {
        ENetwork.DownloadScript('/Controls/BusStationControl.js', function() {
            _BusStationControl = new BusStationControl(vM.Body.document);
            _BusStationControl.ID = vM.AppendEntity(_BusStationControl.Body, _PopLayer, false, x, y, 305, 200, 0, 38, false);
            _BusStationControl.Width = 305;
            _BusStationControl.Height = 200;

            _BusStationControl.ResumeLayout();
            _BusStationControl.onLoadComplete = function() {
                _BusStationControl.ShowBusStation(id, name, x, y);
            };
            _BusStationControl.onBusClick = function(busid, busname, stationName) {
                fnOnBusClick(busid, busname, stationName);
            };
            _BusStationControl.onMergeSearch = function(key) {
                if (_BusStationControl.Tab != null) {
                    _BusStationControl.Tab.destroy();
                }
                _BusStationControl.Tab = fnOpenMergeSearch(key, 0, '', 0, 0, 0, 0, 0, '', '', 1);
                _BusStationControl.Tab.onDestroy = function() {
                    _BusStationControl.Tab = null;
                };
            };
            _BusStationControl.onCavil = function(id, name, x, y) {
                fnReport(x, y, 3, id, name);
            };
        });
    }
    else {
        vM.MoveEntity(_BusStationControl.ID, x, y);
        _BusStationControl.ShowBusStation(id, name, x, y);
    }
}

//搜索结果点击调用的方法，判断是实体还是企业后调用不同的Pop
//datatype数据类型 1是企业，2实体，3二维poi，4道路
function fnShowSearchPop(oid, cid, lstid, x, y, datatype, name, address, telephone) {
    if (datatype == 1 || datatype == 2) {
        if (vM.MapState().Map != 0) {
            vM.SwitchMap(0);
        }
        if (cid * 1 > 0) {
            if (lstid > 0) {
                fnShowEShopPop(cid, x, y);
            }
            else {
                fnShowCompanyPop(cid, x, y);
            }
        }
        else {
            fnShowEntityPop(oid, x, y);
        }
    }
    else if (datatype == 3) {
        vM.SwitchMap(1);
        fnShowEwPoiPop(x, y, name, address, telephone);
    }
    else if (datatype == 4) {
        if (vM.MapState().Map != 0) {
            vM.SwitchMap(0);
        }
        MoveTo(x, y);
        var sUrl = GlobalConfig.EDataCenterUrl + 'CommMap5.0/GetRoadCoords.aspx?domain=' + GlobalConfig.Domain + '&l=' + GlobalConfig.Language + '&road=' + escape(name);
        ENetwork.DownloadScript(sUrl, function() {
            if (typeof __RoadCoords != 'undefined' && __RoadCoords.length > 0) {
                _RoadCoords = __RoadCoords[0].MR_Coords.split(';');
                fnDrawingRoadLine(_RoadCoords);
            }
        });
    }
}

//显示公交泡泡
function fnShowBusLinePop(index, x, y, type) {
    if (!_BusLinePopControl) {
        ENetwork.DownloadScript('/Controls/BusLinePopControl.js', function() {
            _BusLinePopControl = new BusLinePopControl(vM.Body.document);
            _BusLinePopControl.ID = vM.AppendEntity(_BusLinePopControl.Body, _PopLayer, false, x, y, 300, 300, 0, 300, false);
            _BusLinePopControl.Width = 300;
            _BusLinePopControl.Height = 300;
            _BusLinePopControl.ResumeLayout();
            _BusLinePopControl.onLoadComplete = function() {
                _BusLinePopControl.ShowPop(index, _BusLineData, type);
                MoveTo(x * 1 + vM.GetMapPos(136), y * 1 + vM.GetMapPos(-96), true);
            };
        });
    }
    else {
        vM.MoveEntity(_BusLinePopControl.ID, x, y);
        _BusLinePopControl.ShowPop(index, _BusLineData, type);
        MoveTo(x * 1 + vM.GetMapPos(136), y * 1 + vM.GetMapPos(-96), true);
    }
}
/*×××××××××××××××××地图控件相关×××××××××××××××××*/

/*×××××××××××××××××地图定位相关×××××××××××××××××*/
//实体Pop定位
function fnGetPositionByOID() {
    var oid = fnRequest('oid');
    if (/.+?\?\d+$/gi.test(window.document.location.href)) {
        oid = window.document.location.href.replace(/^.+?\?/gi, '');
    }
    if (oid != '' && oid * 1 > 0) {
        fnShowEntityPop(oid, 0, 0);
    }
}

//企业Pop定位
function fnGetPositionByCID() {
    var cid = fnRequest('cid');
    if (cid != '' && cid * 1 > 0) {
        fnShowCompanyPop(cid, 0, 0);
    }
}

//E店Pop定位
function fnGetPositionByEID() {
    var eid = fnRequest('eid');
    if (eid != '' && eid * 1 > 0) {
        fnShowEShopPop(eid, 0, 0);
    }
}

//主题Pop定位
function fnGetPositionByTID() {
    var tid = fnRequest('tid');
    var tname = fnRequest('tname');
    var sid = fnRequest('sid');
    if (tid != '') {
        if (sid != '') {
            fnLoadThemePop(sid, 0, 0, tid);
        }
    }
}

function fnGetPositionBySID() {
    var sid = fnRequest('sid');
    var sname = decodeURIComponent(fnRequest('sname'));
    var x = fnRequest('x');
    var y = fnRequest('y');

    if (x != '' && y != '' && sname != '' && sid != '') {
        MoveTo(x * 1, y * 1);
        fnShowBusStation(sid, sname, x * 1, y * 1);
    }
}

//URL的解析
function fnUrlParse() {
    var x = fnRequest('x');
    var y = fnRequest('y');
    if (x != '' && y != '') {
        MoveTo(x, y);
    }
    var q = fnRequest('q');       //本搜
    if (q != '') {
        fnMapSearchByHotkey(unescape(q));
    }

    var iBusId = fnRequest('bid');
    if (iBusId != '') {
        fnOnBusClick(iBusId, unescape(fnRequest('bname')), '');
    }
    var tid = fnRequest('tid');
    var tname = fnRequest('tname');
    if (tid != '') {
        var sid = fnRequest('sid');
        if (sid != '') {
            fnGetPositionByTID(sid, 0, 0, tid);
        }
        else {
            fnLoadThemeMapListByTypeId(tid, unescape(tname),'10');
        }
    }
    var b = fnRequest('b');       //公交搜索
    if (b != '') {
        //        if (/^\w?\d+$/.test(b)) {
        //            fnAddBusLineSearchTab(unescape(b));
        //        }
        //        else {
        //            fnAddBusStationSearchTab(unescape(b));
        //        }
        fnAddBusLineSearchTab(unescape(b));
    }
    var s = fnRequest('s');       //站名搜索
    if (s != '') {
        fnAddBusStationSearchTab(unescape(s));
    }

    var b1 = fnRequest('b1'); //两个站点间的搜索
    if (b1 != '') {
        var b2 = fnRequest('b2');
        if (b2 != '') {
            fnAddBusTransferSearchTab(unescape(b1), unescape(b2), '');
        }
    }
    fnShowMark();
    fnUrlSearch(); //URL参数化查询；
}

function fnShowMark() {
    var title = fnRequest('title');
    if (title == "") {
        title = fnRequest('tname');
    }
    var content = fnRequest('content');
    var x = fnRequest('x');
    if (x == '') {
        x = fnRequest('tx');
    }
    if (x == '') {
        return;
    }
    var y = fnRequest('y');
    if (y == '') {
        y = fnRequest('ty');
    }
    if (y == '') {
        return;
    }
    if (x != '' && y != '' && title != '') {
        if (typeof _Mark != 'undefined') {
            _MarkLayer.innerHTML = '';
            _Mark.Show(x, y, unescape(title), unescape(content));
        }
        else {
            fnInitMark(fnShowMark);
        }
    }
}

//URL参数查询方法
function fnUrlSearch() {
    fnGetPositionByOID();   //实体ID
    fnGetPositionByCID();   //企业ID
    fnGetPositionByEID();   //E店ID
    fnGetPositionBySID();   //公交泡泡

    fnGetPositionByDWHtml();
    urlParamByLmlID();
}

function fnGetPositionByDWHtml() {
    var vUrl = window.document.location.href;
    var data = vUrl.match(/([O|C|E|o|c|e])(\d+)\.html/);
    if (data != null && typeof data != 'undefined') {
        var id = data[2];
        var sletter = data[1].toLowerCase();
        switch (sletter) {
            case 'c':
                if (id != '' && id * 1 > 0) {
                    fnShowCompanyPop(id, 0, 0);
                }
                break;
            case 'o':
                if (id != '' && id * 1 > 0) {
                    fnShowEntityPop(id, 0, 0);
                }
                break;
            case 'e':
                if (id != '' && id * 1 > 0) {
                    fnShowEShopPop(id, 0, 0);
                }
                break;
        }
    }
}
/*×××××××××××××××××地图定位相关×××××××××××××××××*/

/*×××××××××××××××××地图工具相关×××××××××××××××××*/
var IsShowRoadLayer = false;
function fnShowRoadLayer() {
    fnToolsShow('divToolsLink', 2);
    if (!IsShowRoadLayer) {
        vM.ViewSystemMapLayer(true, 'RoadPicLayer');
    } else {
        vM.ViewSystemMapLayer(false, 'RoadPicLayer');
    }
    IsShowRoadLayer = !IsShowRoadLayer;
}

//工具下拉
function fnToolsShow(toolsName, type) {
    if (type == '1') {
        $(toolsName).style.display = 'block';
    }

    if (type == '2') {
        $(toolsName).style.display = 'none';
    }
}

//开始标记
function fnSelectMarkPoint() {
    fnToolsShow('divToolsLink', 2);
    fnGoogleStat('地图标注');
    if (typeof _Mark != 'undefined') {
        _Mark.Begin();
    }
    else {
        fnInitMark(fnSelectMarkPoint);
    }
}

//开始入住选点
function fnSelectWikiPoint() {
    fnGoogleStat('入住');
    if (typeof _Wiki != 'undefined') {
        _Wiki.Begin();
    }
    else {
        fnInitMark(fnSelectWikiPoint);
    }
}

function fnInitMark(func) {
    fnAddMarkCss();
    ENetwork.DownloadScript('/Js/Mark.js', function() {
        if (func)
            func();
    });
    fnAddWikiCss();
    //添加入驻标记
    ENetwork.DownloadScript('/Js/wiki.js', function() {
        if (func)
            func();
    });
}
function fnAddMarkCss() {
    var MarkCss = vM.$C('link');
    MarkCss.rel = 'stylesheet';
    MarkCss.type = 'text/css';
    MarkCss.href = 'Css/Mark.css';
    vM.Body.document.getElementsByTagName('head')[0].appendChild(MarkCss);
}
function fnAddWikiCss() {
    var MarkCss = vM.$C('link');
    MarkCss.rel = 'stylesheet';
    MarkCss.type = 'text/css';
    MarkCss.href = 'Css/wiki.css';
    vM.Body.document.getElementsByTagName('head')[0].appendChild(MarkCss);
}

//测距
function fnScale() {
    fnToolsShow('divToolsLink', 2);
    fnGoogleStat('测距');
    vM.StartScale();
}

function fnShowScaleResult(_dis) {
    if (_dis > 1000) {
        _dis = _dis / 1000; _dis = _dis * 100; _dis = Math.round(_dis); _dis = _dis / 100; _dis = _dis + 'km';
    }
    else {
        _dis = _dis * 100; _dis = Math.round(_dis); _dis = _dis / 100; _dis = _dis + 'm';
    }
    fnShowMessageBox('测距', '<div class="P">本次测距总长：<strong id="distance">' + _dis + '</strong>。</div><div class="P">以上数据仅供参考，请以实际长度为准。</div>');
}

//显示隐藏热区标签
function fnLabel() {
    fnToolsShow('divToolsLink', 2);
    fnGoogleStat('显示标签');
    if (vM.Body.VisibleSpotLabels['hotarea']) {
        vM.ViewSpotLabels(false, 'hotarea', true);
    } else {
        vM.ViewSpotLabels(true, 'hotarea', true);
    }
}
//显示道路
var IsShowRoadLayer = false;
function fnShowRoadLayer() {
    fnToolsShow('divToolsLink', 2);
    fnGoogleStat('显示道路');
    if (!IsShowRoadLayer) {
        vM.ViewSystemMapLayer(true, 'RoadPicLayer');
    } else {
        vM.ViewSystemMapLayer(false, 'RoadPicLayer');
    }
    IsShowRoadLayer = !IsShowRoadLayer;
}

//显示隐藏地图广告
function fnAdNewDiv() {
    fnToolsShow('divToolsLink', 2);
    fnGoogleStat('显示广告');
    if (vM.Body.VisiblePlots['ad']) {
        vM.ViewPlots(false, 'ad', true);
    } else {
        vM.ViewPlots(true, 'ad', true);
    }
}

//地图打印
function fnPrint() {
    fnGoogleStat('打印');
    var iMapX = vM.CenterX();
    var iMapY = vM.CenterY();
    var iZoom = vM.Zoom();
    var iWidth = vM.MapWidth();
    var iHeight = vM.MapHeight();
    window.open('http://' + GlobalConfig.Domain + '/Print.aspx?x=' + iMapX + '&y=' + iMapY + '&z=' + iZoom + '&w=' + iWidth + '&h=' + iHeight, 'print');
}

//全屏
function fnFullScreen(obj) {
    fnGoogleStat('全屏');
    if (_MapFullScreenState) {
        _MapFullScreenState = false;
        obj.innerHTML = '全屏';
        obj.title = '全屏';
    }
    else {
        _MapFullScreenState = true;
        obj.innerHTML = '还原';
        obj.title = '还原';
    }
    window.onresize();
}

//短信发送
function sendTransferMsg(content) {
    var _phone = $('sendmsgphobe').value.trim();
    var _VerifyCode = $('sendmsgVerifyCode').value.trim();
    var _content = content;
    var regMobileNum = new RegExp("^\\d{11}$", "ig");
    if (!regMobileNum.test(_phone)) {
        //alert('请填写正确的手机号码!');
        $('divResultSendMsg').style.display = 'block';
        $('divResultSendMsg').innerHTML = "请填写正确的手机号码";
        $('sendmsgphobe').focus();
        return false;
    }
    $('btnsendmsg').disabled = 'disabled';
    $('divResultSendMsg').style.display = 'block';
    $('divResultSendMsg').innerHTML = "<div style=\"text-align:center; line-height:200%;\"><img src=\"Images/loading.gif\">正在发送...</div>";
    var url = "http://" + GlobalConfig.Domain + "/SendMsg.aspx?num=" + _phone + "&text=" + escape(_content) + "&VerifyCode=" + _VerifyCode;
    ENetwork.DownloadScript(url, function() {
        //返回参数
        if (typeof _returnstatus != 'undefined') {
            if (_returnstatus == '1') {
                //alert("短信发送成功！");
                $('divSendMsg').style.display = "none";
                fnShowMessageBox('发送到手机', '<span style=\"height:50px;float:left; margin-left:40px;\"><img src=\"images/lian.gif\" /></span><span style=\"height:50px;line-height:40px;float:left;padding-left:10px; width:140px;\">短信发送成功！</span>');
            }
            else if (_returnstatus == '-100') {
                $('divResultSendMsg').style.display = 'block';
                $('divResultSendMsg').innerHTML = "你还没登陆哦!";
            }
            else if (_returnstatus == '-200') {
                $('divResultSendMsg').style.display = 'block';
                $('divResultSendMsg').innerHTML = "验证码输入不正确!";
                $('VerifyCode').src = GlobalConfig.WebRootPath + 'VerifyImage.aspx?rnd=' + $Rnd();
                $('btnsendmsg').disabled = '';
            }
            else {
                $('divResultSendMsg').style.display = 'block';
                $('divResultSendMsg').innerHTML = "不好意思,发送失败了,重新试试!";
            }
        }
    });
}

function ShowSendHtml(content) {
    //用JS获取用户的昵称
    var cc = new CookieHelper();
    var cookieNickNameCookie = cc.getCookie('MemberNickName');
    if (cookieNickNameCookie != null) {
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
        var sendHtml = '<div class="mbox"><h1><span>发送到手机</span><a onclick="javascript:$(\'divDialogBg\').style.display=\'none\';$(\'divSendMsg\').style.display=\'none\';" title="关闭窗口" class="closesend" style="cursor:pointer"><img src="images/sendclose.gif"/></a></h1><div class="sint"><p>手机号码：</p><input id="sendmsgphobe" type="text" class="txtbox" size="20" /><p>验证码：</p><p class="yzm"><span><input id="sendmsgVerifyCode" type="text" class="txtbox" size="10" /></span><span><img id="VerifyCode" style="cursor:pointer" alt="单击获取新验证码" width="70" height="20" /></span></p><p><input id="btnsendmsg" onclick="sendTransferMsg(\'' + content + '[E都市]\');" type="button" style="margin-top:5px; padding-top:3px;" value="免费发送到手机" /></p><p>E都市保证不向任何第三方提供输入的手机号码</p><div style="border:1px solid #E3E197;padding:5px 5px 5px 30px; background:#FFFFDD url(../images/ClewIco1.gif) no-repeat 10px 6px; color:#C30;height:auto;display:none;" id="divResultSendMsg"></div></div><div class="info"><p><strong>短信内容：</strong><br /></p><p class="infobox" id="sendmsgtext">' + content + '【该条公交信息仅供参考，请以当地站牌信息为准。E都市】</p><p align="right" class="tgray">共一条短信 </p></div></div>';
        if (!$('divSendMsg')) {
            var divSend = $C('div');
            divSend.id = 'divSendMsg';
            divSend.style.left = (w / 2 - 230) + 'px';
            divSend.style.top = (h / 2 - 100) + 'px';
            divSend.style.position = 'absolute';
            divSend.style.zIndex = 100003;
            divSend.style.width = '300px';
            divSend.style.height = 'auto';
            document.body.appendChild(divSend);
            //IE6的延时加载
            setTimeout(function() { $('divSendMsg').innerHTML = sendHtml; }, 1);
        }
        setTimeout(function() {
            $('divSendMsg').innerHTML = sendHtml;
            $('VerifyCode').src = GlobalConfig.WebRootPath + 'VerifyImage.aspx?rnd=' + $Rnd();
            $('VerifyCode').onclick = function() { this.src = GlobalConfig.WebRootPath + 'VerifyImage.aspx?rnd=' + $Rnd(); };
            $('divDialogBg').style.display = 'block';
            $('divSendMsg').style.display = 'block';
            $('divResultSendMsg').style.display = 'none';
            $('btnsendmsg').disabled = '';
            $('sendmsgphobe').value = '';
            $('sendmsgVerifyCode').value = '';
        }, 10);
    }
    else {
        fnShowLogin();
    }
}
/*×××××××××××××××××地图工具相关×××××××××××××××××*/

/*×××××××××××××××××常用位置备注×××××××××××××××××*/
//显示标注泡泡
function fnShowMarkLocation(id, x, y, title, content) {
    if (!_MarkLocationPopControl) {
        ENetwork.DownloadScript('/Controls/MarkLocationPopControl.js', function() {
            _MarkLocationPopControl = new MarkLocationPopControl(vM.Body.document);
            _MarkLocationPopControl.ID = vM.AppendEntity(_MarkLocationPopControl.Body, _MarkLocationLayer, false, x, y, 305, 165, 10, 165, false);
            _MarkLocationPopControl.Width = 305;
            _MarkLocationPopControl.Height = 165;

            _MarkLocationPopControl.ResumeLayout();
            _MarkLocationPopControl.onLoadComplete = function() {
                _MarkLocationPopControl.ShowPop(id, x, y, title, content);
            };
        });
    }
    else {
        vM.MoveEntity(_MarkLocationPopControl.ID, x, y);
        _MarkLocationPopControl.ShowPop(id, x, y, title, content);
    }
}

function fnLocationList() {
    tab = new TabControl.Tab(document, 'LocationList', '我的位置', GlobalConfig.WebRootPath + 'Fundation/MyLocationList.html', true, true, 80);
    fnAddTab(tab);
}

function fnMarkList() {
    tab = new TabControl.Tab(document, 'MarkList', '备忘标注', GlobalConfig.WebRootPath + 'Fundation/MyMarkList.html', true, true, 80);
    fnAddTab(tab);
}

function fnSelectMarkLocation() {
    if (!_IsBeginMarkLocation) {
        _IsBeginMarkLocation = true;
        var tip = '<div style="height:15px; line-height:15px; border:1px solid #1A70C7; background:#fff; padding:0 4px 0 4px;filter:alpha(opacity=90); opacity:.9; float:left; color:#000; font-size:12px; white-space:nowrap;">双击地图选择我的位置</div>';
        vM.ShowPointerTip(tip);
    }
}

function ShowMark(id, x, y, title, content,oid,type,date) {
    if (parseInt(oid) != 0) {
        fnShowEntityPop(oid, 0, 0);
    }
    else {
        if (parseInt(type) == 0) {
            fnShowMarkLocation(id, x, y, title, content);
        }
        else {
            fnShowMarkPop(id, x, y, title, content, date);
        }
        MoveTo(x * 1 + vM.GetMapPos(116), y * 1 + vM.GetMapPos(-96), true);
    }
}

function ShowAllMarkLocation(dataList) {
    var data = dataList;

    for (var i = 0; i < data.length; i++) {
        var d = data[i].LML_CreateTime.split(' ')[0];
        var _id = $Rnd();
        var p = vM.$C('div');
        p.id = _id;
        var html = '';
        if (checkDate(d)) {
            html = string.Format('<div style="float:left;cursor:pointer;"><div id="{0}" style="border:1px solid #fff; background:#0af; padding:3px 5px; font-size:12px; color:#fff;" onclick="parent.fnShowMarkPop({1},{2},{3},\'{4}\',\'{5}\',\'{6}\');">{7}</div><div style=" width:10px; height:6px; background:url(../images/jt2.png) no-repeat; margin-top:-1px;"></div></div>', _id + 'mark', data[i].LML_ID, data[i].LML_X, data[i].LML_Y, data[i].LML_Title, data[i].LML_Content, d, data[i].LML_Title);
        }
        else {
            html = string.Format('<div style="float:left;cursor:pointer;"><div id="{0}" style="border:1px solid #fff; background:#aaa; padding:3px 5px; font-size:12px; color:#fff;" onclick="parent.fnShowMarkPop({1},{2},{3},\'{4}\',\'{5}\',\'{6}\');">{7}</div><div style="width:10px; height:6px; background:url(../images/jt.png) no-repeat; margin-top:-1px;"></div></div>', _id + 'mark', data[i].LML_ID, data[i].LML_X, data[i].LML_Y, data[i].LML_Title, data[i].LML_Content, d, data[i].LML_Title);
        }
        p.innerHTML = html;
        vM.AppendEntity(p, _sMarkLocationLayer, false, parseInt(data[i].LML_X), parseInt(data[i].LML_Y), 200, 30, 0, 30, false);
    }

}

function checkDate(date1) {
    var d1 = new Date();
    var newdata = date1 + "|23:59:59";
    var d2 = new Date(Date.parse(newdata.replace("-", "/").replace('|', ' ')));
    if (d1 > d2) {
        return false;
    }
    return true;
}

//显示标注泡泡
function fnShowMarkPop(id, x, y, title, content,date) {
    if (!_MarkPopControl) {
        ENetwork.DownloadScript('/Controls/MarkPopControl.js', function() {
        _MarkPopControl = new MarkPopControl(vM.Body.document);
        _MarkPopControl.ID = vM.AppendEntity(_MarkPopControl.Body, _MarkLocationLayer, false, x, y, 305, 160, 10, 164, false);
        _MarkPopControl.Width = 305;
            _MarkPopControl.Height = 165;

            _MarkPopControl.ResumeLayout();
            _MarkPopControl.onLoadComplete = function() {
            _MarkPopControl.ShowPop(id, x, y, title, content, date);
            };
        });
    }
    else {
        vM.MoveEntity(_MarkPopControl.ID, x, y);
        _MarkPopControl.ShowPop(id, x, y, title, content, date);
    }
}

function fnSelectMarkPop() {
    if (!_IsBeginMarkPop) {
        _IsBeginMarkPop = true;
        var tip = '<div style="height:15px; line-height:15px; border:1px solid #1A70C7; background:#fff; padding:0 4px 0 4px;filter:alpha(opacity=90); opacity:.9; float:left; color:#000; font-size:12px; white-space:nowrap;">双击地图选择位置备注</div>';
        vM.ShowPointerTip(tip);
    }
}

function fnMapRecentSearch(key1, key2, type) {
    var tab;

    switch (type) {
        case 0:   //模糊搜索
            fnGoogleStat('模糊搜索');
            break;
        case 1:   //名称搜索
            fnGoogleStat('名称搜索');
            break;
        case 2:   //地址搜索
            fnGoogleStat('地址搜索');
            break;
        case 3:   //周边搜索
            fnGoogleStat('周边搜索');
            break;
        case 9: //道路搜索
            fnGoogleStat('道路搜索');
            break;
    }
    switch (type) {
        case 0:   //模糊搜索            
        case 1:   //名称搜索
        case 2:   //地址搜索
        case 9: //道路搜索
            fnGoogleStat('地址搜索');
            tab = new TabControl.Tab(document, 'search', key1, '/Fundation/LocalSearch.aspx?type=' + type + '&keyword1=' + escape(key1), true, true, 80);
            break;
        case 3:   //周边搜索
            fnGoogleStat('周边搜索');
            tab = new TabControl.Tab(document, 'search', key1 + key2, '/Fundation/LocalSearch.aspx?type=' + type + '&keyword1=' + escape(key1) + '&keyword2=' + escape(key2), true, true, 80);
            break;
    }
    fnAddTab(tab);
}

//公交搜索
function fnBusRecentSearch(s, e) {
    fnGoogleStat('公交换乘搜索');
    fnAddBusTransferSearchTab(s, e, 0);
}

//周边搜索
function rangeSearch(x,y,key) {
    var tab = new TabControl.Tab(document, 'rangeSearch', key, '/Fundation/RangeSearchList.htm?x=' + x + '&y=' + y + '&key=' + escape(key), true, true, 80);
    fnAddTab(tab);
}

function fnAddTwoPointSearch(x1,y1,x2,y2) {
    var tab = new TabControl.Tab(document, 'TwoPointSearch', '两点搜索', '/Fundation/TwoPointSearch.html?x1=' + x1 + '&y1=' + y1 + '&x2=' + x2+'&y2=' + y2, true, true, 80);
    fnAddTab(tab);
}

//地图搜索结果回调
function onSearchDataCallBack(data, begin, end) {
    _IconLayer.innerHTML = '';
    _EyeIconLayer.innerHTML = '';
    for (var i = begin; i < end; i++) {
        var x = data[i].X;
        var y = data[i].Y;
        if (data[i].RecordType == 1 || data[i].RecordType == 2 || data[i].RecordType == 4) {
            fnAppendIcon(data[i].OCName, x, y, i + 1, 'Images/VesicleBg.png', 'Images/AlterVesicle.png', 'if(parent.fnShowSearchPop){parent.fnShowSearchPop(' + data[i].OwnerID + ', ' + data[i].CompanyID + ',0,' + x + ', ' + y + ',' + data[i].RecordType + ',\'' + data[i].OCName + '\',\'\',\'\');}', 41, 33, 7, 32, true);
        }
        else {
            var epoint = vM.GLatLng2EPoint(new EGIS.LatLng(data[i].Lx, data[i].Ly));
            x = epoint.X;
            y = epoint.Y;
            fnAppendIcon(data[i].OCName, x, y, i + 1, 'Images/VesicleBg.png', 'Images/AlterVesicle.png', 'if(parent.fnShowSearchPop){parent.fnShowSearchPop(' + data[i].OwnerID + ', ' + data[i].CompanyID + ',0,' + data[i].Lx + ', ' + data[i].Ly + ',' + data[i].RecordType + ',\'' + data[i].OCName + '\',\'\',\'\');}', 41, 33, 7, 32, true);
        }
    };
}

function urlParamByLmlID() {
    var id = 0;
    id = fnRequest('d');
    if (parseInt(id) > 0) {
        var url = GlobalConfig.DataCetnerMapDataUrl + "Map7.0/UserDataInfo.aspx?citycode=" + GlobalConfig.CityCode + "&l=" + GlobalConfig.Language + "&req=2&lid=" + id;
        ENetwork.DownloadScript(url, function() {
            if (typeof _MarkLocationInfo != 'undefined' && _MarkLocationInfo.length > 0) {
                if (parseInt(_MarkLocationInfo[0].LML_Type) == 0) {
                    fnLocationList();
                    MoveTo(_MarkLocationInfo[0].LML_X * 1 + vM.GetMapPos(116), _MarkLocationInfo[0].LML_Y * 1 + vM.GetMapPos(-96), true);
                    fnShowMarkLocation(_MarkLocationInfo[0].LML_ID, _MarkLocationInfo[0].LML_X, _MarkLocationInfo[0].LML_Y, _MarkLocationInfo[0].LML_Title, _MarkLocationInfo[0].LML_Content);
                }
                else if (parseInt(_MarkLocationInfo[0].LML_Type) == 1) {
                    fnMarkList();
                    MoveTo(_MarkLocationInfo[0].LML_X * 1 + vM.GetMapPos(116), _MarkLocationInfo[0].LML_Y * 1 + vM.GetMapPos(-96), true);
                    fnShowMarkPop(_MarkLocationInfo[0].LML_ID, _MarkLocationInfo[0].LML_X, _MarkLocationInfo[0].LML_Y, _MarkLocationInfo[0].LML_Title, _MarkLocationInfo[0].LML_Content, _MarkLocationInfo[0].LML_CreateTime.split(' ')[0]);
                }
            }
        });
    }
}
/*×××××××××××××××××常用位置备注×××××××××××××××××*/