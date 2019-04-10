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
    if (parseInt(fnGetWindowHeight() - 95) > 0) {
        $('TabContent').style.height = fnGetWindowHeight() - 95 + 'px';
    }
    _BusLineSearch = new BusLineSearch();
    $('BusSearch_Btn').onclick = _BusLineSearch.BtnBusLineSearch.bind(this);

    action = fnRequest('action');

    if (action == 1) {
        $('TabContent').innerHTML = window.Config.Loading;
        if (fnRequest('stationName') != '') {
            _CurrentBusStation = unescape(fnRequest('stationName'));
        }
        var _url = window.Config.DataCetnerSearchDataUrl + 'SearchTankerLine/' + window.Config.CityCode + '/' + window.Config.Language + '/Format/Json/Search?q=' + unescape(fnRequest('key'));
        ENetwork.DownloadScript(_url, function() { if (typeof _BusRoute != 'undefined') { _BusNumberData[0] = _BusRoute; _BusLineSearch.fnShowInfo(0); } });
    }
    else {
        var _key = unescape(fnRequest('key'));
        if (_key != '') {
            $('textKeyWords').value = _key;
            _BusLineSearch.BtnBusLineSearch();
        }
    }
}

function BusLineSearch() {
    this.BtnBusLineSearch = function() {
        $('resultDiv').style.display = '';
        var _kw = $('textKeyWords').value;
        if (_kw != "") {
            $('TabContent').innerHTML = window.Config.Loading;
            var url = window.Config.DataCetnerSearchDataUrl + 'SearchTankerNumber/' + window.Config.CityCode + '/' + window.Config.Language + '/Format/Json/Search?q=' + encodeURIComponent(_kw);
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
                r += string.Format('<div class="gj_a1 gj_a2"><div class="title" onclick=\"javascript:_BusLineSearch.fnLoadData({4},{5});\"><div class="number2" id="number{6}">+</div><div class="T_left">{0}</div><div class="T_right"><a>{1}</a> <i>--</i> <a>{2}</a></div></div><div style="display: none;" id="{3}"></div><div class="clear"></div></div>', _Bus[i].VehicleName, _Bus[i].StartStation, _Bus[i].EndStation, "LineInfo" + i, i, _Bus[i].VehicleID,i);
            }
        } else {
            $('resultDiv').innerHTML = '<span></span>没有相关的水上巴士信息！';
            $('TabContent').innerHTML = '';
            return;
        }

        $('resultDiv').innerHTML = '<span></span>共有<i>' + _Bus.length + '项</i>符合<a>' + kw + '</a>的搜索结果！';
        $('TabContent').innerHTML = '<div class="gj_a">' + r + '</div>';
        fnResize();
        r = null;
    }

    this.fnLoadData = function(i, BusID) {
        if ($('LineInfo' + i).style.display == 'block') {
            $('LineInfo' + i).style.display = 'none';
            $("number" + i).innerHTML = '+';
            parent.fnShowBusStationIco(null, 0);
        } else {
            if ($('LineInfo' + i).innerHTML == '') {
                $('LineInfo' + i).innerHTML = window.Config.Loading;
                var url = window.Config.DataCetnerSearchDataUrl + 'SearchTankerLine/' + window.Config.CityCode + '/' + window.Config.Language + '/Format/Json/Search?q=' + BusID;
                ENetwork.DownloadScript(url, function() { _BusNumberData[i] = _BusRoute; _BusLineSearch.fnShowInfo(i); });
            }
            else {
                _CurrentIndex = i;
                parent.fnShowBusStationIco(_BusNumberData[i], _IsUpOrDown);
            }

            $('LineInfo' + i).style.display = 'block';
            $("number" + i).innerHTML = '--';
        }
    }

    this.fnShowInfo = function(i) {
        _CurrentIndex = i;
        if (action == 1) {
            $('textKeyWords').value = _BusNumberData[i].LineInfo.VehicleName;
            $('TabContent').innerHTML = string.Format('<div class="gj_a1 gj_a2" ><div class="title" onclick=\"javascript:_BusLineSearch.fnLoadData({4},{5});\"><div class="number2" id="number{6}">+</div><div class="T_left">{0}</div><div class="T_right"><a>{1}</a> <i>--</i> <a>{2}</a></div></div><div style="display: none;" id="{3}"></div><div class="clear"></div></div>', _BusNumberData[i].LineInfo.VehicleName, _BusNumberData[i].LineInfo.StartStation, _BusNumberData[i].LineInfo.EndStation, "LineInfo" + i, i, _BusNumberData[i].LineInfo.VehicleID,i);
            $('LineInfo' + i).style.display = 'block';
            $('resultDiv').innerHTML = '<span></span>共有<i>' + _BusNumberData.length + '项</i>符合<a>' + _BusNumberData[i].LineInfo.VehicleName + '</a>的搜索结果！';
            fnResize();
        }
        var sBusNoInfo = string.Format('<div class="xlxx"><div class="time_bus"><div class="title_S">首末班时间</div><div class="text_S" id="OperatingTime{0}">首班：6:00 末班：20:00</div><div class="clear"></div></div><div class="time_bus"><div class="title_S">可用IC卡</div><div class="text_S" id="Card{1}">{7}</div><div class="clear"></div></div><div class="time_bus"><div class="title_S">服务时间</div><div class="text_S" id="ServiceTime{2}">{8}</div><div class="clear"></div></div><div class="time_bus time_bus"><div class="title_S">班次信息</div><div class="text_S" id="WaterBusInfo{3}">{9}</div><div class="clear"></div></div><div class="time_bus2"><a href="javascript:;" class="a1" onclick="parent.fnCopyToClipboard(\'{4}\',\'复制好了，发给我的QQ/MSN好友分享吧！\');"></a><a href="javascript:;" class="a2" onclick="_BusLineSearch.fnReport(\'{12}\',\'{13}\')"></a><a href="javascript:_BusLineSearch.ViewCompleteBusLine({5});" class="a3"></a><div class="clear"></div></div><div class="clear"></div></div><div class="xl"><div class="title_xl"><div class="left current" id="Up1" onclick="_BusLineSearch.fnReverse({10},1);">上行线路</div><div class="right" id="down2"  onclick="_BusLineSearch.fnReverse({11},0);">下行线路</div></div><ul id="Tz{6}"></ul><div class="clear"></div></div>', i, i, i, i, 'http://' + window.Config.Domain + '/?bname=' + escape(_BusNumberData[i].LineInfo.VehicleName) + '&bid=' + _BusNumberData[i].LineInfo.VehicleID+'&type=water', i, i, _BusNumberData[i].LineInfo.BusCards, _BusNumberData[i].LineInfo.OperatingTime, _BusNumberData[i].LineInfo.BusFrequency, i, i, _BusNumberData[i].LineInfo.VehicleID, _BusNumberData[i].LineInfo.VehicleName);
        $('LineInfo' + i).innerHTML = sBusNoInfo;

        _BusLineSearch.fnReverse(i, 1);
    }

    this.fnReverse = function(no, k) {
        _IsUpOrDown = k;
        var info = '';
        var stime = '', etime = '', time;
        if (k == 1) {
            $('Up1').className = 'left current';
            $('down2').className = 'right';
            for (i = 0; i < _BusNumberData[no].BusUp.length; i++) {
                var oBusUp = _BusNumberData[no].BusUp[i];
                if (i == 0 && !_IsBusLineFirstPositioned[_BusNumberData[no].LineInfo.VehicleID] && _CurrentBusStation == '') {
                    _IsBusLineFirstPositioned[_BusNumberData[no].LineInfo.VehicleID] = true;
                    parent.fnGotoBusStation(oBusUp.StationID, oBusUp.StationName, oBusUp.PositionX, oBusUp.PositionY);
                }
                if (oBusUp.PositionX == 0 && oBusUp.PositionY == 0) {
                    if (_CurrentBusStation == oBusUp.StationName) {
                        info += ' <li><a>' + (i + 1) + '.' + oBusUp.StationName + '</a></li>';
                    }
                    else {
                        info += ' <li><a>' + (i + 1) + '.' + oBusUp.StationName + '</a></li>';
                    }
                }
                else {
                    if (_CurrentBusStation == oBusUp.StationName) {
                        info += ' <li><a style=\"cursor:pointer;\" title=\"点击定位公交站\" onclick="parent.fnShowBusLinePop(' + i + ',' + oBusUp.PositionX + ',' + oBusUp.PositionY + ',1);">' + (i + 1) + '.' + oBusUp.StationName + '</a></li>';
                    }
                    else {
                        info += ' <li><a style=\"cursor:pointer;\" title=\"点击定位公交站\" onclick="parent.fnShowBusLinePop(' + i + ',' + oBusUp.PositionX + ',' + oBusUp.PositionY + ',1);">' + (i + 1) + '.' + oBusUp.StationName + '</a></li>';
                    }
                }
            }
            stime = _BusNumberData[no].LineInfo.UpStartTime;
            etime = _BusNumberData[no].LineInfo.UpEndTime;
        } else {
            $('Up1').className = 'left';
            $('down2').className = 'right current';
            for (i = 0; i < _BusNumberData[no].BusDown.length; i++) {
                var oBusDown = _BusNumberData[no].BusDown[i];
                if (oBusDown.PositionX == 0 && oBusDown.PositionY == 0) {
                    if (_CurrentBusStation == oBusDown.StationName) {
                        info += ' <li><a>' + (i + 1) + '.' + oBusDown.StationName + '</a></li>';
                    }
                    else {
                        info += ' <li><a>' + (i + 1) + '.' + oBusDown.StationName + '</a></li>';
                    }
                }
                else {
                    if (_CurrentBusStation == oBusDown.StationName) {
                        info += ' <li><a style=\"cursor:pointer;\" title=\"点击定位公交站\" onclick="parent.fnShowBusLinePop(' + i + ',' + oBusDown.PositionX + ',' + oBusDown.PositionY + ',0);">' + (i + 1) + '.' + oBusDown.StationName + '</a></li>';
                    }
                    else {
                        info += ' <li><a style=\"cursor:pointer;\" title=\"点击定位公交站\" onclick="parent.fnShowBusLinePop(' + i + ',' + oBusDown.PositionX + ',' + oBusDown.PositionY + ',0);">' + (i + 1) + '.' + oBusDown.StationName + '</a></li>';
                    }
                }
            }
            stime = _BusNumberData[no].LineInfo.DownStartTime;
            etime = _BusNumberData[no].LineInfo.DownEndTime;
        }
        $('Tz' + no).innerHTML = info;
        $('OperatingTime' + no).innerHTML = '首班：' + stime + '末班：' + etime;

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
        $('TabContent').style.height = (fnGetWindowHeight() - 95) + 'px';
    }
    else {
        $('TabContent').style.height = (h - 95) + 'px';
    }
}