var _IsUpOrDown;
var _CurrentIndex = 0;
var _CurrentBusStation = '';
var _IsBusLineFirstPositioned = [];
var _action = 0;
var _BusNumberData = [];
var _Index = 0;

window.onload = fnOnload;
var _BusLineSearch;
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
        var _url = window.Config.EDataCenterUrl + 'CommMap5.0/Bus.aspx?domain=' + window.Config.Domain + '&l=' + window.Config.Language + '&req=4&id=' + unescape(fnRequest('key'));
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
    var script = this.$C('script');
    script.type = 'text/javascript';
    script.language = 'javascript';
    script.src = window.Config.DataCetnerAdDataUrl + 'Ad2.0/ads.aspx?citycode=' + window.Config.CityCode + '&l=' + window.Config.Language + '&key=gongjiaoliebiao&domid=div_ad';
    document.getElementsByTagName('head')[0].appendChild(script);
}

function BusLineSearch() {
    this.DivTitle = "<div style=\"float:left;width: 270px;\"><div class=\"bus_line_top\"></div><div class=\"bus_line_mid\"><h2 style=\"cursor:pointer;\" title=\"{$StartStation}-{$EndStation}\" id=\"{$title}\" onclick=\"javascript:_BusLineSearch.fnLoadData({$i},{$BusLineID});\"><div class=\"mid_sc\"><a><img src=\"../images/bus_ico9.gif\" border=\"0\" /></a></div><div class=\"mid_name\"><span><font style=\"color:#f60; font-weight:bold;\">{$BusLineName}</font></span>&nbsp;&nbsp;{$StartStation}&nbsp;-&nbsp;{$EndStation}</div></h2><div id=\"{$LineInfoID}\" style=\"display:none;\"></div></div><div class=\"bus_line_down\"></div></div>";

    this.BtnBusLineSearch = function() {
        var _kw = $('textKeyWords').value;
        if (_kw != "") {
            $('TabContent').innerHTML = window.Config.Loading;
            var url = window.Config.EDataCenterUrl + 'CommMap5.0/Bus.aspx?domain=' + window.Config.Domain + '&l=' + window.Config.Language + '&req=1&busnum=' + unescape(_kw);
            action = 0;
            ENetwork.DownloadScript(url, function() { _BusLineSearch.BusLineShow(_kw); });
        }
    }

    this.BusLineShow = function(kw) {
        var r = '';
        if (typeof _Bus != 'undefined' && _Bus.length > 0) {
            var len = _Bus.length;
            var Td_Temp = '';
            for (i = 0; i < len; i++) {
                var _tempTitle = _BusLineSearch.DivTitle;
                r += _tempTitle.replace("{$title}", "LineTitle" + i).replace("{$i}", i).replace("{$BusLineID}", _Bus[i].VehicleID).replace("{$BusLineName}", _Bus[i].VehicleName).replaceAll("{$StartStation}", _Bus[i].StartStation).replaceAll("{$EndStation}", _Bus[i].EndStation).replace("{$LineInfoID}", "LineInfo" + i);
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
                var url = window.Config.EDataCenterUrl + 'CommMap5.0/Bus.aspx?domain=' + window.Config.Domain + '&l=' + window.Config.Language + '&req=4&id=' + BusID;
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
            $('textKeyWords').value = _BusNumberData[i].LineInfo[0].VehicleName;
            var _temp = _BusLineSearch.DivTitle;
            $('TabContent').innerHTML = _temp.replace("{$i}", i).replace("{$BusLineID}", _BusNumberData[i].LineInfo[0].VehicleID).replace("{$BusLineName}", _BusNumberData[i].LineInfo[0].VehicleName).replaceAll("{$StartStation}", _BusNumberData[i].LineInfo[0].StartStation).replaceAll("{$EndStation}", _BusNumberData[i].LineInfo[0].EndStation).replace("{$LineInfoID}", "LineInfo" + i);
            $('LineInfo' + i).style.display = 'block';
            fnResize();
        }
        var sBusNoInfo = '<ul class="Info"><li id="Cost{$i}">价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格：<strong>{$Cost}</strong></li><li id="Card{$i}">可用IC卡：<strong>{$Card}</strong></li><li id="OperatingTime{$i}">服务时间：<strong>{$OperatingTime}</strong></li></ul><div class="NameHead">'
                        + '<div id="Tz{$i}" class="ActionLeft" onclick="_BusLineSearch.fnReverse({$i},1);">上 行</div>'
                        + '<div id="Tf{$i}" class="UnActionRight" onclick="_BusLineSearch.fnReverse({$i},0);">下 行</div></div>'
                        + '<div class="BusShow"><div id="Time{$i}" class="BusRemark"><p>首班：<span id="StartTime{$i}"></span>&nbsp;&nbsp; 末班：<span id="EndTime{$i}"></span></p><p id="startToEnd{$i}"></p><p><img src="/images/bus_btn_2.gif" alt="复制公交线路给好友"  onclick="parent.fnCopyToClipboard(\'{$BusLineURL}\',\'复制好了，发给我的QQ/MSN好友分享吧！\');" style="cursor:pointer;" /><a  onclick="_BusLineSearch.fnReport(\'{$bid}\',\'{$bName}\')"><img src="/images/bus_btn_3.gif"/></a><a href="javascript:_BusLineSearch.ViewCompleteBusLine({$i});"><img src="/images/bus_btn_4.gif" /></a></p></div><ul id="slininfo{$i}" class="bus_zhanming"></ul></div>';

        $('LineInfo' + i).innerHTML = sBusNoInfo.replaceAll('{$i}', i).replace('{$BusLineURL}', 'http://' + window.Config.Domain + '/?bname=' + escape(_BusNumberData[i].LineInfo[0].VehicleName) + '&bid=' + _BusNumberData[i].LineInfo[0].VehicleID).replace('{$bid}', _BusNumberData[i].LineInfo[0].VehicleID).replace('{$bName}', _BusNumberData[i].LineInfo[0].VehicleName);
        $('Cost' + i).innerHTML = $('Cost' + i).innerHTML.replace('{$Cost}', _BusNumberData[i].LineInfo[0].BusPrice);
        $('Card' + i).innerHTML = $('Card' + i).innerHTML.replace('{$Card}', _BusNumberData[i].LineInfo[0].BusCards);
        $('OperatingTime' + i).innerHTML = $('OperatingTime' + i).innerHTML.replace('{$OperatingTime}', _BusNumberData[i].LineInfo[0].OperatingTime);
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
                if (i == 0 && !_IsBusLineFirstPositioned[_BusNumberData[no].LineInfo[0].VehicleID] && _CurrentBusStation == '') {
                    _IsBusLineFirstPositioned[_BusNumberData[no].LineInfo[0].VehicleID] = true;
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
            stime = _BusNumberData[no].LineInfo[0].UpStartTime;
            etime = _BusNumberData[no].LineInfo[0].UpEndTime;
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
            stime = _BusNumberData[no].LineInfo[0].DownStartTime;
            etime = _BusNumberData[no].LineInfo[0].DownEndTime;
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
        parent.parent.vM.Body.MapSwitch.Switch2D();
        fnDelay();
    }
}

function fnDelay() {
    if (parent.parent.vM.Body.MapState.Succeed) {
        parent.parent.vM.Body.ZoomBar.ZoomTo(6);
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
    if (typeof _BusNumberData[_CurrentIndex] != 'undefined' && _BusNumberData[_CurrentIndex].LineInfo.length > 0) {

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
        $('TabContent').style.height = (fnGetWindowHeight() - 132) + 'px';
    }
    else {
        $('TabContent').style.height = (h - 132) + 'px';
    }
}