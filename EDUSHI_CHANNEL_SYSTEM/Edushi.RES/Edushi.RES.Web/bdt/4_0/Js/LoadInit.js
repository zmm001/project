var vM = null;                      //地图对象
var vMe = null;                     //鹰眼对象
var _IconLayer, _EyeIconLayer;      //小图标图层
var _BusTransferLineLayer;          //公交线路图层
var _BusStationLayer;               //站点图层
var _seIconLayer;                   //公交两点图标图层
var _MsgLayer;                      //提示层
var _MsgPopControl;                 //提示泡泡
var _ex = 0, _ey = 0;
var _startAddress = '', _endAddress='';
var _eAddress = '', _eTitle = '', _eTel = '';
var _busContent = ''; //当前公交线路文字
var _busIndex = 0;

var _RoadCoords = [];               //画线坐标串
var _BusLineCoordList = [];         //公交线路坐标
var _BusLineData = null;            //公交站点数据


var _MsgLayer;                      //提示层
var _MsgPopControl;                 //提示泡泡

var __IsDrawBusLineState = false;   //标记当前是公交站点的画线图层还是换乘的画线图层

function fnLoadInit() {
    //加载对象
    if (typeof vEdushiMap == 'undefined' || typeof vEdushiMap.Body.NewMapLayer != 'function' || typeof veyeEdushiMap == 'undefined' || typeof veyeEdushiMap.Body.NewMapLayer != 'function' || (vEdushiMap.Body.MapState.Map != 0 && vEdushiMap.Body.GoogleMap == null)) {
        setTimeout("fnLoadInit()", 50);
        return;
    }

    vM = vEdushiMap;
    vMe = veyeEdushiMap;

    _BusTransferLineLayer = vM.Body.NewMapLayer('BusTransferLine', 149, vM.Body.BoxLayerBottom); //公交线路
    _BusStationLayer = vM.NewMapLayer('BusStation', 260, true);
    _IconLayer = vM.NewMapLayer('Icon', 261, true);
    _EyeIconLayer = vMe.NewMapLayer('eyeIcon', 262, true);
    _MsgLayer = vM.NewMapLayer('MsgLayer', 265, true);
    _seIconLayer = vM.NewMapLayer('_seIconLayer', 280, true);

    fnMapEventBind();

    var t = fnRequest("t");
    if (t != '') {
        var p = vM.$C('div');
        p.style.height = '32px';
        p.style.width = '200px';
        p.style.overFlow = 'hiden';
        p.innerHTML = '<div style="border:1px solid #ccc;font-weight:bold; line-height:20px; padding:0 3px; height:20px;white-space:nowrap; background:#fff; float:left; color:#f60; font-size:12px;">'
                + decodeURIComponent(t)
                + '</div><div style="background:url(images/jt_03.png) no-repeat; height:10px; margin-top:-1px;"></div>';
        vM.AppendEntity(p, _IconLayer, false, _CenterX, _CenterY, 21, 28, 10, 28, false);
    }
    startName = decodeURIComponent(fnRequest("b1"));
    endName = decodeURIComponent(fnRequest("b2"));
    _busIndex = fnRequest("index");
    if (startName != '' && endName != '' && _busIndex != '') {
        fnShowBusLine(startName, endName, _busIndex);
    }
}
function fnMapEventBind() {
    //滑杆样式
    vM.$('ZoomBarControl').style.backgroundImage = "url('" + EGIS.ApplictionRootUrl + "/images/ud.gif')";
    //绑定滑杆
    vM.attachEvent(EGIS.KeyWord.EventName.MapZoomChange, function (z) {
        vMe.Zoom(vM.Zoom());
        if (__IsDrawBusLineState) {
            fnShowBusStationIco(_BusLineData, _BusLineType);
        }
        else {
            fnDrawingBusLine(_BusLineCoordList);
        }
    });
    //地图鹰眼联动
    vMe.attachEvent(EGIS.KeyWord.EventName.MapMoveEnd, function (x, y, flg) {
        if (vM.MapState().Map != 0) {
        }
        if (flg == 0) { vM.MoveTo(x, y, true); }
    });
    //地图移动
    vM.attachEvent(EGIS.KeyWord.EventName.MapMoveEnd, function (x, y, flg) {
        if (flg == 0) { vMe.MoveTo(x, y, true); }
        if (__IsDrawBusLineState) {
            fnShowBusStationIco(_BusLineData, _BusLineType);
        }
        else {
            fnDrawingBusLine(_BusLineCoordList);
        }
    });
    //地图双击事件
    vM.attachEvent(EGIS.KeyWord.EventName.MapDblClick, function (e) {
        vM.MoveTo(vM.PointerX(), vM.PointerY(), true);
        vMe.MoveTo(vM.PointerX(), vM.PointerY(), true);
    });
    vM.attachEvent(EGIS.KeyWord.EventName.MapMouseDown, function (x, y, e) {
    });
    vM.attachEvent(EGIS.KeyWord.EventName.MapMouseUp, function (e) {
    });
    vM.attachEvent(EGIS.KeyWord.EventName.Switch3D, function () {
        fnInitDelay();
        vM.ViewSystemMapLayer(false, 'RoadPicLayer');
        vM.$('ZoomBarControl').style.backgroundImage = "url('" + EGIS.ApplictionRootUrl + "/images/ud.gif')";
        vM.ViewSigns(true, 'park');
        vM.ViewSigns(true, 'unit');
        vM.ViewSpotAreas(true);
        vM.ViewSpotLabels(true);
        vM.ViewPlots(true);
        $('#direction').css({ 'background': "url(images/ico.png) no-repeat -60px -100px", 'top': '340px' });
        $('#direction').css('height', '35px');
    });
    vM.attachEvent(EGIS.KeyWord.EventName.Switch2D, function () {
        fnInitDelay();
        vM.$('ZoomBarControl').style.backgroundImage = "url('" + EGIS.ApplictionRootUrl + "/images/ZoomBarControl.gif')";
        vM.ViewSigns(false, 'park');
        vM.ViewSigns(false, 'unit');
        vM.ViewSpotAreas(false);
        vM.ViewSpotLabels(false);
        vM.ViewPlots(false);
        $('#direction').css({ 'background': "url(images/CompassIco1.gif) no-repeat", 'top': '330px' });
        $('#direction').height('65px');
    });
    vM.attachEvent(EGIS.KeyWord.EventName.SwitchWX, function () {
        fnInitDelay();
        vM.$('ZoomBarControl').style.backgroundImage = "url('" + EGIS.ApplictionRootUrl + "/images/ZoomBarControl.gif')";
        vM.ViewSigns(false, 'park');
        vM.ViewSigns(false, 'unit');
        vM.ViewSpotAreas(false);
        vM.ViewSpotLabels(false);
        vM.ViewPlots(false);
    });
    //绑定实体点击事件
    vM.attachEvent(EGIS.KeyWord.EventName.SpotClick, function (spot) {
    });
    vM.attachEvent(EGIS.KeyWord.EventName.SpotLabelClick, function (spot) {
        if (_IsBeginSelectMark) {
        }
        else {
            fnShowEntityPop(spot.ID, spot.Cx * 1, spot.Cy * 1);
        }
    });
    vM.attachEvent(EGIS.KeyWord.EventName.SignClick, function (sign) {
        switch (sign.Group) {
            case 'bus3d':
                fnShowBusStation(sign.ID, sign.Name, vM.PointerX(), vM.PointerY());
                break;
        }
    });
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

        //        if (__SubwayCoords != '') {
        //            _SubWayLayer.innerHTML = '';
        //            vM.DrawPolyLine(_SubWayLayer, vM.ChangeMapCoordsToBox(__SubwayCoords), 4, 'red', 0.7);
        //        }
    }
    else {
        setTimeout("fnInitDelay()", 300);
        return;
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
    vM.$(x + '_' + y).onmouseover = function () {
        if (EGIS.Browser.Name == 'MSIE' && EGIS.Browser.Version < 7) {
            this.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + sImgPath2 + '\',sizingMethod=\'image\')';
        }
        else {
            this.style.backgroundImage = 'url(' + sImgPath2 + ')';
        }
    };
    vM.$(x + '_' + y).onmouseout = function () {
        if (EGIS.Browser.Name == 'MSIE' && EGIS.Browser.Version < 7) {
            this.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + sImgPath + '\',sizingMethod=\'image\')';
        }
        else {
            this.style.backgroundImage = 'url(' + sImgPath + ')';
        }
    };
    vM.$(x + '_' + y).onmouseclick = function () {

    }
    if (isAppendEye) {
        var pe = vMe.$C('div');
        pe.innerHTML = iconHTML;
        vMe.AppendEntity(pe, _EyeIconLayer, false, x, y, w, h, ew, eh, false);
        vMe.$(x + '_' + y).onmouseover = function () {
            if (EGIS.Browser.Name == 'MSIE' && EGIS.Browser.Version < 7) {
                this.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + sImgPath2 + '\',sizingMethod=\'image\')';
            }
            else {
                this.style.backgroundImage = 'url(' + sImgPath2 + ')';
            }
        };
        vMe.$(x + '_' + y).onmouseout = function () {
            if (EGIS.Browser.Name == 'MSIE' && EGIS.Browser.Version < 7) {
                this.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + sImgPath + '\',sizingMethod=\'image\')';
            }
            else {
                this.style.backgroundImage = 'url(' + sImgPath + ')';
            }
        };
    }
}
//地图移动和鹰眼联动
function MoveTo(x, y, flg, fun) {
    vM.MoveTo(x, y, true, fun);
    vMe.MoveTo(x, y, true);
    
}
//--------------公交搜索-----------------------------
function fnGotoBusStation(id, name, x, y) {
    MoveTo(x, y, true);
    var div = vM.$C('div');
    div.id = $Rnd();
    var vlen = name.length * 12.1;
    div.innerHTML = String.Format("<span style=\"cursor:pointer; height:26px; float:left; font-size:12px; color:#000;white-space:nowrap;{0}\"><span style=\"cursor:pointer; width:24px; height:24px; float:left; background:url(../Images/gongjiao.gif) no-repeat; text-align:center; padding-top:2px;\">1</span><span style=\"cursor:pointer; height:19px;line-height:19px; background:#fff; padding-right:4px; float:left;{1};\" onclick=\"parent.fnShowBusStation({2},\'{3}\',{4},{5})\">{6}</span></span>", 'width:' + (vlen + 40) + 'px', 'width:' + (vlen + 10) + 'px', id, name, x, y, name);
    vM.AppendEntity(div, _BusStationLayer, false, x * 1, y * 1, vlen + 35, 26, 12, 28, false);
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
        var PopHtml = '<span style="cursor:pointer; height:26px; float:left; font-size:12px; color:#000;white-space:nowrap;{$topwidth}"><span style="cursor:pointer; width:24px; height:24px; float:left; background:url(../Images/gongjiao.gif) no-repeat; text-align:center; padding-top:2px; color:white;">{$No}</span><span style="cursor:pointer; height:19px;line-height:19px; background:#fff; padding-right:4px; float:left;{$width};" onclick="parent.fnShowBusStation({$StationID},\'{$BusStationName}\',{$X},{$Y})">{$BusStationName}</span></span>';
        if (coord.Color == '#FF9900') {
            PopHtml = '<span style="cursor:pointer; height:26px; float:left; font-size:12px; color:#000;white-space:nowrap;{$topwidth}"><span style="cursor:pointer; width:24px; height:24px; float:left; background:url(../Images/gongjiao2.gif) no-repeat; text-align:center; padding-top:2px; color:white;">{$No}</span><span style="cursor:pointer; height:19px;line-height:19px; background:#fff; padding-right:4px; float:left;{$width};" onclick="parent.fnShowBusStation({$StationID},\'{$BusStationName}\',{$X},{$Y})">{$BusStationName}</span></span>';
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
        if (_BusLineType == 1) {
            var l = _BusLineData.BusUp.length;
            for (i = 0; i < l; i++) {
                var oBusUp = _BusLineData.BusUp[i];
                var vlen = oBusUp.StationName.length * 12.1;
                var nd = vM.$C('div');
                nd.id = 'B_pop' + i;
                nd.innerHTML = String.Format("<span style=\"cursor:pointer; height:26px; float:left; font-size:12px; color:#000;white-space:nowrap;{0}\"><span style=\"cursor:pointer; width:24px; height:24px; float:left; background:url(../Images/gongjiao.gif) no-repeat; text-align:center; padding-top:2px; color:white;\">{1}</span><span style=\"cursor:pointer; height:19px;line-height:19px; background:#fff; padding-right:4px; float:left;{2};\" onclick=\"parent.fnShowBusLinePop({3},{4},{5},'{6}')\">{7}</span></span>", 'width:' + (vlen + 40) + 'px', (i + 1), 'width:' + (vlen + 10) + 'px', i, oBusUp.PositionX, oBusUp.PositionY, type, oBusUp.StationName);
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
                nd.innerHTML = String.Format("<span style=\"cursor:pointer; height:26px; float:left; font-size:12px; color:#000;white-space:nowrap;{0}\"><span style=\"cursor:pointer; width:24px; height:24px; float:left; background:url(../Images/gongjiao.gif) no-repeat; text-align:center; padding-top:2px; color:white;\">{1}</span><span style=\"cursor:pointer; height:19px;line-height:19px; background:#fff; padding-right:4px; float:left;{2};\" onclick=\"parent.fnShowBusLinePop({3},{4},{5},'{6}')\">{7}</span></span>", 'width:' + (vlen + 40) + 'px', (i + 1), 'width:' + (vlen + 10) + 'px', i, oBusDown.PositionX, oBusDown.PositionY, type, oBusDown.StationName);
                vM.AppendEntity(nd, _BusStationLayer, false, oBusDown.PositionX, oBusDown.PositionY, vlen + 35, 26, 12, 28, false);
            }
            if (_BusLineData.DownCoord.length > 0) {
                vM.DrawPolyLine(_BusTransferLineLayer, vM.ChangeMapCoordsToBox(_BusLineData.DownCoord), 4, '#ff3300', 0.7);
            }
        }
    }
}