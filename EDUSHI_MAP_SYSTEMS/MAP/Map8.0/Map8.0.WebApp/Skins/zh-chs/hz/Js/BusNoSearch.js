var _IsUpOrDown;
var _CurrentIndex = 0;
var _CurrentBusStation = '';
var _IsBusLineFirstPositioned = [];
var _action = 0;
var _BusNumberData = [];
var _Index = 0;

window.onload = fnOnload;
var _BusLineSearch;
var busline = null;
var BMap_Map_Child = null;
var tempResult = null;
var tempIndex = 0;
var BusLineResultMode = 'edushi'; //结果模式
var IsSearch = false;
function fnOnload() {
    if (!window.Config) {
        setTimeout('fnOnload()', 200);
        return;
    }
    if (parseInt(fnGetWindowHeight() - 132) > 0) {
        $('TabContent').style.height = fnGetWindowHeight() - 132 + 'px';
    }
    _BusLineSearch = new BusLineSearch();
    $('BusSearch_Btn').onclick = _BusLineSearch.BtnBusLineSearch.bind(this);

    action = fnRequest('action');

    if (action == 1) {
        $('TabContent').innerHTML = window.Config.Loading;
        if (fnRequest('stationName') != '') {
            _CurrentBusStation = unescape(fnRequest('stationName'));
        }
        IsSearch = true;
        var _url = window.Config.DataCetnerSearchDataUrl + 'SearchBusLine/' + window.Config.CityCode + '/' + window.Config.Language + '/Format/Json/Search?q=' + unescape(fnRequest('key'));
        ENetwork.DownloadScript(_url, function() { if (typeof _BusRoute != 'undefined') { _BusNumberData[0] = _BusRoute; _BusLineSearch.fnShowInfo(0); } });
    }
    else {
        var _key = unescape(fnRequest('key'));
        if (_key != '') {
            $('textKeyWords').value = _key;
            _BusLineSearch.BtnBusLineSearch();
        }
    }

    //广告
//    var script = this.$C('script');
//    script.type = 'text/javascript';
//    script.language = 'javascript';
//    script.src = window.Config.DataCetnerAdDataUrl + 'Ad2.0/ads.aspx?citycode=' + window.Config.CityCode + '&l=' + window.Config.Language + '&key=gongjiaoliebiao&domid=div_ad';
//    document.getElementsByTagName('head')[0].appendChild(script);
}

function BusLineSearch() {
    this.BtnBusLineSearch = function () {
        var _kw = $('textKeyWords').value;
        if (_kw != "") {
            $('TabContent').innerHTML = window.Config.Loading;
            IsSearch = true;
            if (parent.vM.MapState.Map == 0) {
                BusLineResultMode = 'edushi'; //edushi模式
                var url = window.Config.DataCetnerSearchDataUrl + 'SearchBusNumber/' + window.Config.CityCode + '/' + window.Config.Language + '/Format/Json/Search?q=' + encodeURIComponent(_kw);
                action = 0;
                ENetwork.DownloadScript(url, function () { _BusLineSearch.BusLineShow(_kw); });
            }
            else {
                BusLineResultMode = 'baidu'; //baidu模式
                BusLineShow_Bd(_kw);
            }
        }
    }

    this.BusLineShow = function(kw) {
        var r = '';
        if (typeof _Bus != 'undefined' && _Bus.length > 0) {
            var len = _Bus.length;
            var Td_Temp = '';
            for (i = 0; i < len; i++) {
                //r += string.Format("<div style=\"float:left;width: 270px;\"><div class=\"bus_line_top\"></div><div class=\"bus_line_mid\"><h2 style=\"cursor:pointer;\" title=\"{0}-{1}\" id=\"{2}\" onclick=\"javascript:_BusLineSearch.fnLoadData({3},{4});\"><div class=\"mid_sc\"><a><img src=\"../images/bus_ico9.gif\" border=\"0\" /></a></div><div class=\"mid_name\"><span><font style=\"color:#f60; font-weight:bold;\">{5}</font></span>&nbsp;&nbsp;{6}&nbsp;-&nbsp;{7}</div></h2><div id=\"{8}\" style=\"display:none;\"></div></div><div class=\"bus_line_down\"></div></div>", _Bus[i].StartStation, _Bus[i].EndStation, "LineTitle" + i, i, _Bus[i].VehicleID, _Bus[i].VehicleName, _Bus[i].StartStation, _Bus[i].EndStation, "LineInfo" + i);
                r += string.Format("<div style=\"width:312px;\"><div class=\"bus_line_mid\"><h2 title=\"{0}-{1}\" id=\"{2}\" onclick=\"javascript:_BusLineSearch.fnLoadData({3},{4});\"><div class=\"mid_name\"><span>{5}</span>&nbsp;&nbsp;{6}&nbsp;-&nbsp;{7}</div></h2><div id=\"{8}\" style=\"display:none;\"></div></div></div>", _Bus[i].StartStation, _Bus[i].EndStation, "LineTitle" + i, i, _Bus[i].VehicleID, _Bus[i].VehicleName, _Bus[i].StartStation, _Bus[i].EndStation, "LineInfo" + i);
            }
        } else {
            $('TabContent').innerHTML = '<div class="NoInfoClew">没有相关公交数据！</div>';
            return;
        }
        var LineResult = "<h1>共有<b>{$Count}项</b>符合<b>{$key}路车</b>的查询结果</h1>";
        $('TabContent').innerHTML = LineResult.replace("{$Count}", _Bus.length).replace("{$key}", kw) + r;
        fnResize();
        r = null;
    }

    this.fnLoadData = function(i, BusID) {
        if ($('LineInfo' + i).style.display == 'block') {
            $('LineInfo' + i).style.display = 'none';
            parent.fnShowBusStationIco(null, 0);
        } else {
            if ($('LineInfo' + i).innerHTML == '') {
                $('LineInfo' + i).innerHTML = window.Config.Loading;
                var url = window.Config.DataCetnerSearchDataUrl + 'SearchBusLine/' + window.Config.CityCode + '/' + window.Config.Language + '/Format/Json/Search?q=' + BusID;
                ENetwork.DownloadScript(url, function() { _BusNumberData[i] = _BusRoute; _BusLineSearch.fnShowInfo(i); });
            }
            else {
                _CurrentIndex = i;
                parent.fnShowBusStationIco(_BusNumberData[i], _IsUpOrDown);
            }

            $('LineInfo' + i).style.display = 'block';
        }
    }

    this.fnShowInfo = function(i) {
        _CurrentIndex = i;
        if (action == 1) {
            $('textKeyWords').value = _BusNumberData[i].LineInfo.VehicleName;
            $('TabContent').innerHTML = string.Format("<div style=\"width:312px;\"><div class=\"bus_line_mid\"><h2 title=\"{0}-{1}\" id=\"{2}\" onclick=\"javascript:_BusLineSearch.fnLoadData({3},{4});\"><div class=\"mid_name\"><span>{5}</span>&nbsp;&nbsp;{6}&nbsp;-&nbsp;{7}</div></h2><div id=\"{8}\" style=\"display:none;\"></div></div></div>", _BusNumberData[i].LineInfo.StartStation, _BusNumberData[i].LineInfo.EndStation, "LineTitle" + i, i, _BusNumberData[i].LineInfo.VehicleID, _BusNumberData[i].LineInfo.VehicleName, _BusNumberData[i].LineInfo.StartStation, _BusNumberData[i].LineInfo.EndStation, "LineInfo" + i); //<div style=\"float:left;width: 270px;\"><div class=\"bus_line_top\"></div><div class=\"bus_line_mid\"><h2 style=\"cursor:pointer;\" title=\"{0}-{1}\" id=\"{2}\" onclick=\"javascript:_BusLineSearch.fnLoadData({3},{4});\"><div class=\"mid_sc\"><a><img src=\"../images/bus_ico9.gif\" border=\"0\" /></a></div><div class=\"mid_name\"><span><font style=\"color:#f60; font-weight:bold;\">{5}</font></span>&nbsp;&nbsp;{6}&nbsp;-&nbsp;{7}</div></h2><div id=\"{8}\" style=\"display:none;\"></div></div><div class=\"bus_line_down\"></div></div>
            $('LineInfo' + i).style.display = 'block';
            fnResize();
        }

        var sBusNoInfo = '<ul class="Info"><li id="Cost{$i}" class="clearfix"><p>单程最高票价</p><strong>{$Cost}</strong></li><li id="Card{$i}" class="clearfix"><p>可用IC卡</p><strong>{$Card}</strong></li><li id="OperatingTime{$i}" class="clearfix"><p>服务时间</p><strong>{$OperatingTime}</strong></li></ul><p class="bus_line_tips"><a href="javascript:;" onclick="parent.fnCopyToClipboard(\'{$BusLineURL}\',\'复制好了，发给我的QQ/MSN好友分享吧！\');"><span class="a1"></span>复制线路</a><a href="javascript:;" onclick="_BusLineSearch.fnReport(\'{$bid}\',\'{$bName}\')"><span class="a2"></span>我要纠错</a><!--<a href="javascript:_BusLineSearch.ViewCompleteBusLine({$i});"><span class="a3"></span>查看整条线路</a>--></p><div class="NameHead clearfix">'
                        + '<div id="Tz{$i}" class="ActionLeft" onclick="_BusLineSearch.fnReverse({$i},1);">上 行</div>'
                        + '<div id="Tf{$i}" class="UnActionRight" onclick="_BusLineSearch.fnReverse({$i},0);">下 行</div></div>'
                        + '<div class="BusShow"><div id="Time{$i}" class="BusRemark"><p>首班：<span id="StartTime{$i}"></span>&nbsp;&nbsp; 末班：<span id="EndTime{$i}"></span></p><p id="startToEnd{$i}" class="start-end"></p></div><ul id="slininfo{$i}" class="bus_zhanming"></ul></div>';

//        var sBusNoInfo = '<ul class="Info"><li id="Cost{$i}">价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格：<strong>{$Cost}</strong></li><li id="Card{$i}">可用IC卡：<strong>{$Card}</strong></li><li id="OperatingTime{$i}">服务时间：<strong>{$OperatingTime}</strong></li></ul><div class="NameHead">'
//                        + '<div id="Tz{$i}" class="ActionLeft" onclick="_BusLineSearch.fnReverse({$i},1);">上 行</div>'
//                        + '<div id="Tf{$i}" class="UnActionRight" onclick="_BusLineSearch.fnReverse({$i},0);">下 行</div></div>'
//                        + '<div class="BusShow"><div id="Time{$i}" class="BusRemark"><p>首班：<span id="StartTime{$i}"></span>&nbsp;&nbsp; 末班：<span id="EndTime{$i}"></span></p><p id="startToEnd{$i}"></p><p><img src="/images/bus_btn_2.gif" alt="复制公交线路给好友"  onclick="parent.fnCopyToClipboard(\'{$BusLineURL}\',\'复制好了，发给我的QQ/MSN好友分享吧！\');" style="cursor:pointer;" /><a  onclick="_BusLineSearch.fnReport(\'{$bid}\',\'{$bName}\')"><img src="/images/bus_btn_3.gif"/></a><a href="javascript:_BusLineSearch.ViewCompleteBusLine({$i});"><img src="/images/bus_btn_4.gif" /></a></p></div><ul id="slininfo{$i}" class="bus_zhanming"></ul></div>';


        $('LineInfo' + i).innerHTML = sBusNoInfo.replaceAll('{$i}', i).replace('{$BusLineURL}', 'http://' + window.Config.Domain + '/?bname=' + escape(_BusNumberData[i].LineInfo.VehicleName) + '&bid=' + _BusNumberData[i].LineInfo.VehicleID).replace('{$bid}', _BusNumberData[i].LineInfo.VehicleID).replace('{$bName}', _BusNumberData[i].LineInfo.VehicleName);
        $('Cost' + i).innerHTML = $('Cost' + i).innerHTML.replace('{$Cost}', _BusNumberData[i].LineInfo.BusPrice);
        $('Card' + i).innerHTML = $('Card' + i).innerHTML.replace('{$Card}', _BusNumberData[i].LineInfo.BusCards);
        $('OperatingTime' + i).innerHTML = $('OperatingTime' + i).innerHTML.replace('{$OperatingTime}', _BusNumberData[i].LineInfo.OperatingTime);
        _BusLineSearch.fnReverse(i, 1);
    }

    this.fnReverse = function(no, k) {
        _IsUpOrDown = k;
        var info = '';
        var stime = '', etime = '', time;
        if (k == 1) {
            $('Tz' + no).className = 'ActionLeft';
            $('Tf' + no).className = 'UnActionRight';
            for (i = 0; i < _BusNumberData[no].BusUp.length; i++) {
                var oBusUp = _BusNumberData[no].BusUp[i];
                if (i == 0 && !_IsBusLineFirstPositioned[_BusNumberData[no].LineInfo.VehicleID] && _CurrentBusStation == '') {
                    _IsBusLineFirstPositioned[_BusNumberData[no].LineInfo.VehicleID] = true;
                    parent.fnGotoBusStation(oBusUp.StationID, oBusUp.StationName, oBusUp.PositionX, oBusUp.PositionY);
                }
                if (oBusUp.PositionX == 0 && oBusUp.PositionY == 0) {
                    if (_CurrentBusStation == oBusUp.StationName) {
                        info += ' <li>' + (i + 1) + '.<a>' + oBusUp.StationName + '</a></li>';
                    }
                    else {
                        info += ' <li>' + (i + 1) + '.<a>' + oBusUp.StationName + '</a></li>';
                    }
                }
                else {
                    if (_CurrentBusStation == oBusUp.StationName) {
                        info += ' <li>' + (i + 1) + '.<a style=\"cursor:pointer;\" title=\"点击定位公交站\" onclick="parent.fnShowBusLinePop(' + i + ',' + oBusUp.PositionX + ',' + oBusUp.PositionY + ',1);">' + oBusUp.StationName + '</a></li>';
                    }
                    else {
                        info += ' <li>' + (i + 1) + '.<a style=\"cursor:pointer;\" title=\"点击定位公交站\" onclick="parent.fnShowBusLinePop(' + i + ',' + oBusUp.PositionX + ',' + oBusUp.PositionY + ',1);">' + oBusUp.StationName + '</a></li>';
                    }
                }
            }
            stime = _BusNumberData[no].LineInfo.UpStartTime;
            etime = _BusNumberData[no].LineInfo.UpEndTime;
            $('startToEnd' + no).innerHTML = _BusNumberData[no].BusUp[0].StationName + '-' + _BusNumberData[no].BusUp[_BusNumberData[no].BusUp.length - 1].StationName;
        } else {
            $('Tz' + no).className = 'UnActionLeft';
            $('Tf' + no).className = 'ActionRight';
            for (i = 0; i < _BusNumberData[no].BusDown.length; i++) {
                var oBusDown = _BusNumberData[no].BusDown[i];
                if (oBusDown.PositionX == 0 && oBusDown.PositionY == 0) {
                    if (_CurrentBusStation == oBusDown.StationName) {
                        info += ' <li>' + (i + 1) + '.<a>' + oBusDown.StationName + '</a></li>';
                    }
                    else {
                        info += ' <li>' + (i + 1) + '.<a>' + oBusDown.StationName + '</a></li>';
                    }
                }
                else {
                    if (_CurrentBusStation == oBusDown.StationName) {
                        info += ' <li>' + (i + 1) + '.<a style=\"cursor:pointer;\" title=\"点击定位公交站\" onclick="parent.fnShowBusLinePop(' + i + ',' + oBusDown.PositionX + ',' + oBusDown.PositionY + ',0);">' + oBusDown.StationName + '&nbsp;</a></li>';
                    }
                    else {
                        info += ' <li>' + (i + 1) + '.<a style=\"cursor:pointer;\" title=\"点击定位公交站\" onclick="parent.fnShowBusLinePop(' + i + ',' + oBusDown.PositionX + ',' + oBusDown.PositionY + ',0);">' + oBusDown.StationName + '</a></li>';
                    }
                }
            }
            stime = _BusNumberData[no].LineInfo.DownStartTime;
            etime = _BusNumberData[no].LineInfo.DownEndTime;
            $('startToEnd' + no).innerHTML = _BusNumberData[no].BusDown[0].StationName + '-' + _BusNumberData[no].BusDown[_BusNumberData[no].BusDown.length - 1].StationName;
        }
        $('slininfo' + no).innerHTML = info;
        $('StartTime' + no).innerHTML = stime;
        $('EndTime' + no).innerHTML = etime;
        info = null;
        parent.__IsDrawBusLineState = true;
        parent.fnShowBusStationIco(_BusNumberData[no], k);
    }

    this.fnReport = function(id, name) {
        parent.fnReport(0, 0, '4', id, name);
    }

    this.ViewCompleteBusLine = function(i) {
        _Index = i;
        parent.parent.vM.MapSwitch.Switch2D();
        fnDelay();
    }
}

function fnDelay() {
    if (parent.parent.vM.MapState.Succeed) {
        parent.parent.vM.ZoomBar.ZoomTo(6);
    }
    else {
        setTimeout("fnDelay()", 300);
        return;
    }

    if (_IsUpOrDown == 1) {
        if (_BusNumberData[_Index].BusUp.length > 0) {
            var k = parseInt(_BusNumberData[_Index].BusUp.length / 2);
            parent.parent.vM.MoveTo(_BusNumberData[_Index].BusUp[k].PositionX, _BusNumberData[_Index].BusUp[k].PositionY);
        }
    }
    else if (_IsUpOrDown == 0) {
        if (_BusNumberData[_Index].BusDown.length > 0) {
            var k = parseInt(_BusNumberData[_Index].BusDown.length / 2);
            parent.parent.vM.MoveTo(_BusNumberData[_Index].BusDown[k].PositionX, _BusNumberData[_Index].BusDown[k].PositionY);
        }
    }
}

function fnActive() {
    if (typeof _BusNumberData[_CurrentIndex] != 'undefined') {
        parent.__IsDrawBusLineState = true;
        parent.fnShowBusStationIco(_BusNumberData[_CurrentIndex], _IsUpOrDown);
    }
    else {
        parent.__IsDrawBusLineState = false;
        parent.fnShowBusStationIco(null, 0);
    }
    fnResize();
}

function fnExit() {
    parent.__IsDrawBusLineState = false;
    parent.fnShowBusStationIco(null, 0);
}

//初始化高度
function fnResize(h) {
    if (!h) {
        $('TabContent').style.height = (fnGetWindowHeight() - 148) + 'px';
    }
    else {
        $('TabContent').style.height = (h - 148) + 'px';
    }
}

BusLineShow_Bd = function (kw) {
    BMap_Map_Child = parent.vM["BaiduMap"].BMap;
    busline = new parent.vM.ContentWindow.BMap.BusLineSearch(BMap_Map_Child, {
        renderOptions: { map: BMap_Map_Child },
        onGetBusListComplete: function (result) {
            if (result) {
                tempResult = result;
                var busCount = result.getNumBusList();
                if (busCount > 0) {
                    var Html = "";
                    for (var i = 0; i < busCount; i++) {
                        var busListItem = result.getBusListItem(i);
                        Html += "<dl style=\"width:312px;\"><dt><img id=\"img" + i + "\" src=\"/images/iw_plus.gif\" style=\"border:none;position:relative;top:2px;*top:0;\" onclick=\"ShowStation(" + i + ")\">&nbsp;&nbsp;<a href=\"javascript:void(0)\" onclick=\"ShowStation(" + i + ")\">" + busListItem.name + "</a></dt><dd id=\"ddBLInfo" + i + "\" style=\"display: none;\"></dd></dl>";
                    }
                    $('TabContent').innerHTML = "<h1>共有<b>" + busCount + "项</b>符合<b>" + kw + "路车</b>的查询结果</h1>" + Html;
                }
                else {
                    $('TabContent').innerHTML = '<div class="NoInfoClew">没有相关公交数据！</div>';
                }
            }
            else {
                $('TabContent').innerHTML = '<div class="NoInfoClew">没有相关公交数据！</div>';
            }
            fnResize();
        },
        onGetBusLineComplete: function (busLine) {
            var tempLi = "<ul class=\"Info\"><li id=\"Cost8\" class=\"clearfix\"><p>首末车时间</p><strong>" + busLine.startTime + "-" + busLine.endTime + "</strong></li></ul>";
            tempLi += "沿线公交车站:";
            tempLi += "<ul id=\"slininfo8\" class=\"bus_zhanming\">";
            var stationCount = busLine.getNumBusStations();
            for (var i = 0; i < stationCount; i++) {
                var station = busLine.getBusStation(i);
                tempLi += "<li>" + (i + 1) + ".<a style=\"cursor:pointer;\" title=\"点击定位公交站\" onclick=\"showInfo('',false,'','" + station.name + "','" + station.position.lng + "', '" + station.position.lat + "','');\">" + station.name + "</a></li>"; //title=\"点击定位公交站\" onclick="parent.fnShowBusLinePop(0,19144,32914,1);"
            }
            tempLi += "</ul>";

            $('ddBLInfo' + tempIndex).innerHTML = tempLi;
        }
    });
    busline.getBusList(kw.replace("k", "").replace("K", ""));
}

function ShowStation(i) {
    if ($('ddBLInfo' + i).style.display == 'block') {
        $('ddBLInfo' + i).style.display = 'none';
        $('img' + i).src = "/images/iw_plus.gif";
    }
    else {
        if ($('ddBLInfo' + i).innerHTML == "") {
            var busListItem = tempResult.getBusListItem(i);
            tempIndex = i;
            busline.getBusLine(busListItem);
        }
        $('ddBLInfo' + i).style.display = 'block';
        $('img' + i).src = "/images/iw_minus.gif";
    }
}
function showInfo(title, enableMessage, message, address, lng, lat, phone) {
    var point = new parent.vM.ContentWindow.BMap.Point(lng, lat);
    /* 最基本的信息窗口*/
    var opts = {
    width: 200,     // 信息窗口宽度
    height: 55,     // 信息窗口高度
    title: title, // 信息窗口标题
    enableMessage: enableMessage, //设置允许信息窗发送短息
    message: message
    }
    var infoWindow = new parent.vM.ContentWindow.BMap.InfoWindow(address, opts);  // 创建信息窗口对象 
    BMap_Map_Child.openInfoWindow(infoWindow, point); //开启信息窗口
    //BMap_Map_Child.centerAndZoom(point, 15);
    BMap_Map_Child.panTo(point);
}