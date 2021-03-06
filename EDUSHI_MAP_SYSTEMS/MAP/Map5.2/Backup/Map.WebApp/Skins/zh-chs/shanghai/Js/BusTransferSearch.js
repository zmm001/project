﻿var start = '', end = '';
var _CoordList = [];
window.onload = fnOnload;
function fnOnload() {
    if (!window.Config) {
        setTimeout('fnOnload()', 200);
        return;
    }
    $('Content').innerHTML = window.Config.Loading;
    var url;
    if (fnRequest('action') == 1) {//从这里出发
        url = window.Config.EDataCenterUrl + 'CommMap5.0/Bus.aspx?domain=' + window.Config.Domain + '&l=' + window.Config.Language + '&req=6&x=' + fnRequest('x') + '&y=' + fnRequest('y') + '&s=' + unescape(fnRequest('key'));

    } else if (fnRequest('action') == 2) {//如何到达这里
        url = window.Config.EDataCenterUrl + 'CommMap5.0/Bus.aspx?domain=' + window.Config.Domain + '&l=' + window.Config.Language + '&req=5&x=' + fnRequest('x') + '&y=' + fnRequest('y') + '&s=' + unescape(fnRequest('key'));

    }
    else if (fnRequest('action') == 'newTab') {
        var sUrl = decodeURIComponent(fnRequest('url'));
        ENetwork.DownloadScript(sUrl,
            function() {
                if (!_TransferResult) {
                    document.body.innerHTML = "很抱歉，没有符合您要求的乘车路线方案。<br />请重新输入周边地名或公交站搜索";
                }
                else {
                    if (_TransferResult.length < 1) {
                        document.body.innerHTML = "很抱歉，没有符合您要求的乘车路线方案。<br />请重新输入周边地名或公交站搜索";
                    }
                    else {
                        var sHtml = '';
                        for (var i = 0; i < _TransferResult.length; i++) {
                            sHtml += fnShowTransferResult(_TransferResult[i], i + 1);
                        }
                        $('Content').className = 'ulResultList';
                        $('Content').innerHTML = sHtml;
                        if (_TransferResult.length > 0) {
                            fnDisplayResult(_TransferResult[0].ID);
                            parent.fnGotoBusStation(_TransferResult[0].StartStation.StationID, _TransferResult[0].StartStation.StationName, _TransferResult[0].StartStation.PositionX, _TransferResult[0].StartStation.PositionY);
                        }
                        $('Content').style.height = fnGetWindowHeight() - 10 + 'px';  //初始化高度
                    }
                }
            }
         );
        return;
    }
    else {  //起点终点
        url = window.Config.EDataCenterUrl + 'CommMap5.0/Bus.aspx?domain=' + window.Config.Domain + '&req=3&l=' + window.Config.Language + '&Start=' + fnRequest('s') + '&End=' + fnRequest('e');
    }
    fnLoadStationList(url);
}

//公交乘换搜索
function fnLoadStationList(url) {
    ENetwork.DownloadScript(url,
        function() {
            var s = '', e = '', item;
            if (_StartStation.length > 0) {
                s = '<select size="8" id="start">';
                for (i = 0; i < _StartStation.length; i++) {
                    item = _StartStation[i];
                    s += '<option id="' + item.ID + '" areaType="' + item.Type + '" x="' + item.PositionX + '" y="' + item.PositionY + '" value="' + item.Value + '" ' + (i == 0 ? 'selected' : '') + '>' + item.Title + '</option>';
                }
                s += '</select>';
            }
            else {
                s = '<div id="start">起点："<strong>' + unescape(fnRequest('s')) + '</strong>"不存在或尚未登记，请输入周边地名或试试该建筑物的名称</div>'
            }
            if (_EndStation.length > 0) {
                e = '<select size="8" id="end">';
                for (j = 0; j < _EndStation.length; j++) {
                    item = _EndStation[j];
                    e += '<option id="' + item.ID + '" areaType="' + item.Type + '" x="' + item.PositionX + '" y="' + item.PositionY + '" value="' + item.Value + '" ' + (j == 0 ? 'selected' : '') + '>' + item.Title + '</option>';
                }
                e += '</select>';
            }
            else {
                e = '<div id="end">终点："<strong>' + unescape(fnRequest('e')) + '</strong>"不存在或尚未登记，请输入周边地名或试试该建筑物的名称</div>';
            }
            var sBusSE = '<div>从<strong>' + unescape(fnRequest('s')) + '</strong>到<strong>' + unescape(fnRequest('e')) + '</strong>包含多个可选站点，选择站点进行查找：</div>'
                    + '<div class="TitleNav"><Img src="../Images/BugStart.gif" alt="请选择起点站" /></div>'
                    + '<div class="SelectNav">{$ostart}</div>'
                    + '<div class="HackBox"></div>'
                    + '<div class="TitleNav"><Img src="../Images/BusEnd.gif" alt="请选择终点站" /></div>'
                    + '<div class="SelectNav">{$oend}</div>';

            if (_StartStation.length > 0 && _EndStation.length > 0) {
                sBusSE += '<div class="btn" title="搜索" onclick="fnTransfer();"></div>'
            }
            $('Content').innerHTML = sBusSE.replace('{$ostart}', s).replace('{$oend}', e);
            $('Content').style.height = fnGetWindowHeight() - 10 + 'px';  //初始化高度
        }
     );
}
function fnShowSearchResult(url, start, end) {
    parent.fnOpenTab();
    var tab = new parent.TabControl.Tab(parent.document, 'BusSearch', start + '→' + end, parent.GlobalConfig.SkinPath + 'Fundation/BusTransferSearch.html?action=newTab&url=' + encodeURIComponent(url), true, true, 80);
    parent.fnAddTab(tab);
}
function fnTransfer() {
    if ($('start').selectedIndex > -1 && $('end').selectedIndex > -1) {
        var sItem = $('start').options[$('start').selectedIndex];
        var eItem = $('end').options[$('end').selectedIndex];
        var url = window.Config.EDataCenterUrl + 'CommMap5.0/Transfer.aspx?domain=' + window.Config.Domain + '&l=' + window.Config.Language + '&StartId=' + sItem.id + '&StartName=' + escape(sItem.value) + '&StartType=' + sItem.areaType + '&StartX=' + sItem.x + '&StartY=' + sItem.y + '&EndId=' + eItem.id + '&EndName=' + escape(eItem.value) + '&EndType=' + eItem.areaType + '&EndX=' + eItem.x + '&EndY=' + eItem.y;
        if (!sItem.areaType) {
            url = window.Config.EDataCenterUrl + 'CommMap5.0/Transfer.aspx?domain=' + window.Config.Domain + '&l=' + window.Config.Language + '&StartId=' + sItem.id + '&StartName=' + escape(sItem.value) + '&StartType=' + sItem.getAttribute('areaType') + '&StartX=' + sItem.getAttribute('x') + '&StartY=' + sItem.getAttribute('y') + '&EndId=' + eItem.id + '&EndName=' + escape(eItem.value) + '&EndType=' + eItem.getAttribute('areaType') + '&EndX=' + eItem.getAttribute('x') + '&EndY=' + eItem.getAttribute('y');
        }
        fnShowSearchResult(url, sItem.value, eItem.value);
    }
}
String.Format = function() {
    if (arguments.length < 1) return;
    var s = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        s = s.replace(eval('/\\{' + (i - 1) + '\\}/gi'), arguments[i]);
    }
    return s;
};

function fnShowTransferResult(result, index) {
    var iWalkCount = 0;
    var title = "";
    var sa = "方案" + index;
    var sb = '<div class="DetailCir" id="' + result.ID + '" style="display:none;">';
    if (result.FromArea != null && result.FromArea.Type == 'Building') {
        sb += String.Format("从<span class=\"Building\" onclick=\"ShowPointer({2}, {3}, true)\">{0}</span>出发，步行至<span class=\"Station\" onclick=\"ShowPointer({4}, {5}, true)\">{1}</span>，"
            , result.FromArea.Value
            , result.StartStation.StationName
            , result.FromArea.PositionX
            , result.FromArea.PositionY
            , result.StartStation.PositionX
            , result.StartStation.PositionY
            );
        iWalkCount++;
    }
    else {
        sb += String.Format("从<span class=\"Station\" onclick=\"ShowPointer({1}, {2}, true)\">{0}</span>出发，", result.StartStation.StationName, result.StartStation.PositionX, result.StartStation.PositionY);
    }

    for (var i = 0; i < result.TransferNodeList.length; i++) {
        var node = result.TransferNodeList[i];
        if (node.NodeType == 'WalkTransfer') {
            sb += String.Format("步行至", parseInt(node.PassLength));
            if (node.FromStation.StationName == node.ToStation.StationName) {
                sb += "对面街的";
            }
            sb += String.Format("<span class=\"Station\" onclick=\"ShowPointer({1}, {2}, true)\">{0}</span>，", node.ToStation.StationName, node.ToStation.PositionX, node.ToStation.PositionY);
            iWalkCount++;
        }
        else {
            if (node.FromStation.StationID != node.ToStation.StationID) {
                if (node.FromStation.StationID == result.StartStation.StationID) {
                    sb += "坐";
                }
                else {
                    sb += "换乘";
                }
                for (var j = 0; j < node.PassVehicle.length; j++) {
                    var v = node.PassVehicle[j];
                    if (j == 0) {
                        title += v.VehicleName;
                    }
                    if (j > 0) {
                        sb += "或";
                    }
                    sb += "<span class=\"Bus\" onclick=\"parent.fnOnBusClick(" + v.VehicleID + ",'" + v.VehicleName + "')\">";
                    sb += v.VehicleName;
                    sb += "路</span>";
                }
                title += "→";
                if (node.NodeType == 'BusTransfer') {
                    sb += String.Format("，乘坐{0}站后在", node.PassStationCount);
                    sb += String.Format("<span class=\"Station\" onclick=\"ShowPointer({1}, {2}, true)\">{0}</span>", node.ToStation.StationName, node.ToStation.PositionX, node.ToStation.PositionY);
                    sb += "下车，";
                }
                else {
                    sb += "，直达";
                    sb += String.Format("<span class=\"Station\" onclick=\"ShowPointer({1}, {2}, true)\">{0}</span>", node.ToStation.StationName, node.ToStation.PositionX, node.ToStation.PositionY);
                    sb += "下车，";
                }
            }
        }
    }
    if (result.ToArea != null && result.ToArea.Type == 'Building') {
        sb += String.Format("步行至目的地<span class=\"Building\" onclick=\"ShowPointer({1}, {2}, true)\">{0}</span>，", result.ToArea.Value, result.ToArea.PositionX, result.ToArea.PositionY);
        iWalkCount++;
    }
    sb = sb.substr(0, sb.length - 1);
    sb += "</div>";
    if (result.TransferNodeList.length == 1) {
        sa += "<span style='color:green; margin:0 3px;'>[直达]</span>: " + title.substr(0, title.length - 1);
    }
    else {
        sa += "<span style='color:#C30; margin:0 3px;'>[换乘1次]</span>: " + title.substr(0, title.length - 1);
    }
    sa = '<div class=\"NormalInfo\"><span id="title_' + result.ID + '" style="cursor:pointer;" onclick="fnDisplayResult(\'' + result.ID + '\')">' + sa + '</span></div>';
    return "<div class=\"EachRow\">" + sa + sb + "<div class=\"DottedLine\"></div></div>";
}

function fnDisplayResult(id) {
    var result;
    for (var i = 0; i < _TransferResult.length; i++) {
        if (_TransferResult[i].ID == id) {
            $('title_' + _TransferResult[i].ID).parentNode.className = 'ActiveInfo';
            $('title_' + _TransferResult[i].ID).style.color = '#FF6600';
            $('title_' + _TransferResult[i].ID).style.fontWeight = 'bold';
            $(_TransferResult[i].ID).style.display = 'block';
            result = _TransferResult[i];
        }
        else {
            $('title_' + _TransferResult[i].ID).parentNode.className = 'NormalInfo';
            $('title_' + _TransferResult[i].ID).style.color = '#333';
            $('title_' + _TransferResult[i].ID).style.fontWeight = 'normal';
            $(_TransferResult[i].ID).style.display = 'none';
        }
    }

    var BusTransferColor = ['#FF3300', '#FF9900'];
    var iBusTransferIndex = 0;
    var CoordList = [];
    for (var i = 0; i < result.TransferNodeList.length; i++) {
        var color;
        var coords = '';
        var passStation = [];
        var node = result.TransferNodeList[i];
        if (node.BestTrack.length > 0) {
            coords = node.BestTrack;
        }
        else {
            for (var j = 0; j < node.BestVehiclePassStation.length; j++) {
                var s = node.BestVehiclePassStation[j];
                coords += s.PositionX + ',' + s.PositionY + ',';
            }
            coords = coords.substr(0, coords.length - 1);
        }
        if (node.NodeType == 'WalkTransfer') {
            color = '#FF9900';
        }
        else {
            color = BusTransferColor[iBusTransferIndex];
        }
        if (coords.length > 0) {
            CoordList[CoordList.length] = { Coords: coords, Color: color, Alpha: 0.7, Size: 4, PassStation: node.BestVehiclePassStation };
        }
        if (node.NodeType == 'BusTransfer' && node.FromStation.StationID != node.ToStation.StationID) {
            iBusTransferIndex++;
        }
    }
    //alert(result.TransferNodeList.length);

    if (result.FromArea != null && result.FromArea.Type == 'Building') {
        CoordList[CoordList.length] = { Coords: result.FromArea.PositionX + ',' + result.FromArea.PositionY + ',' + result.StartStation.PositionX + ',' + result.StartStation.PositionY, Color: '#0099FF', Alpha: 0.7, Size: 3, PassStation: [] };
    }
    if (result.ToArea != null && result.ToArea.Type == 'Building') {
        CoordList[CoordList.length] = { Coords: result.StopStation.PositionX + ',' + result.StopStation.PositionY + ',' + result.ToArea.PositionX + ',' + result.ToArea.PositionY, Color: '#0099FF', Alpha: 0.7, Size: 3, PassStation: [] };
    }
    _CoordList = CoordList;
    parent.__IsDrawBusLineState = false;
    parent.fnDrawingBusLine(CoordList);
}

function ShowPointer(x, y) {
    parent.vM.MoveTo(x, y, true);
}

function fnActive() {
    if (_CoordList.length > 0) {
        parent.__IsDrawBusLineState = false;
        parent.fnDrawingBusLine(_CoordList);
    }
    else {
        parent.__IsDrawBusLineState = true;
        parent.fnDrawingBusLine([]);
    }
}
function fnExit() {
    parent.__IsDrawBusLineState = true;
    parent.fnDrawingBusLine([]);
}