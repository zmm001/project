window.onload = fnOnload;
var _StationSearch;
function fnOnload() {
    if (!window.Config) {
        setTimeout('fnOnload()', 200);
        return;
    }
    if (parseInt(fnGetWindowHeight() - 95) > 0) {
        $('TabContent').style.height = fnGetWindowHeight() - 95 + 'px';
    }
    _StationSearch = new StationSearch();
    $('BusSearch_Btn').onclick = _StationSearch.BtnStationSearch.bind(this);

    var _key = unescape(fnRequest('key'));
    if (_key != '') {
        $('textKeyWords').value = _key;
        _StationSearch.BtnStationSearch();
    }
}

function StationSearch() {
    this.BtnStationSearch = function() {
        var _kw = $('textKeyWords').value;
        if (_kw != "") {
            $('TabContent').innerHTML = window.Config.Loading;
            //http://data.edushi.com/searchdata/SearchTankerByStationName/hz/zh-chs/Format/Json/Search?q=%E7%AB%99
            var url = window.Config.DataCetnerSearchDataUrl + 'SearchTankerByStationName/' + window.Config.CityCode + '/' + window.Config.Language + '/Format/Json/Search?q=' + encodeURIComponent(unescape(_kw));
            ENetwork.DownloadScript(url, function() { _StationSearch.fnBusStationShow(_kw); });
        }
    }

    this.fnBusStationShow = function(kw) {
        if (typeof _Station != 'undefined' && _Station.length > 0) {
            var l = _Station.length;
            var s = '';
            for (i = 0; i < l; i++) {
                var _tStation = _Station[i];
                //var _tempName = _Station[i].StationName.replace(kw, "<span>" + kw + "</span>");

                //s += string.Format("<div style=\" width: 270px;\"><div class=\"bus_zhan_top\"></div><div class=\"bus_zhan_mid\"><h2><div style=\"cursor:pointer;\" class=\"bus_zhan_title\" onclick = \"javaccript:fnShowLi({0},{1},{2},'{3}',{4});\">{7}<div><a><img id=\"{5}\" src=\"../images/bus_ico3_1.gif\" border=\"0\"></a></div></div></h2><div id=\"{6}\" style=\"display:none;\"><ul class=\"bus_zhan_con\">{$liLine}</ul></div></div><div class=\"bus_zhan_down\"></div></div>", i, _Station[i].PositionX, _Station[i].PositionY, _Station[i].StationName, _Station[i].StationID, "img" + i, "stationdiv" + i, _tempName);

                var _rangCom = '', _rangBus = '';

                for (var t = 0; t < _tStation.Block.split(' ').length; t++) {
                    _rangCom += '<a href="javascript:;" onclick="parent.fnMapSearchByHotkey(\'' + _tStation.Block.split(' ')[t] + '\');">' + _tStation.Block.split(' ')[t] + '</a>&nbsp;&nbsp;'; //搜索
                }

                for (var m = 0; m < _tStation.BusStations.split(' ').length; m++) {
                    _rangBus += '<a herf="javascript:;" style="cursor:pointer;" onclick="parent.fnAddBusStationSearchTab(\'' + _tStation.BusStations.split(' ')[m] + '\')">' + _tStation.BusStations.split(' ')[m] + '</a>&nbsp;&nbsp;'; //搜索
                }

                var sl = _Station[i].Bus.length;
                var ss = '';
                for (j = 0; j < sl; j++) {
                    ss += string.Format("<li><a href=\"javascript:parent.fnOnWaterBusClick({0},'{1}');\">{2}</a></li>", _tStation.Bus[j].VehicleID, _tStation.Bus[j].VehicleName, _tStation.Bus[j].VehicleName);
                }

                s += string.Format('<div class="gj_a1 gj_a2"><div class="title" onclick = "javaccript:fnShowLi({0},{1},{2},\'{3}\',{4});"><div class="number2" id="number{12}">+</div><div class="T_left">{5}</div></div><div class="xxl_all" style="display: none;" id="stationdiv{6}"><div class="xlxx"><div class="time_bus"><div class="title_S">位 置</div><div class="text_S">{7}</div><div class="clear"></div></div><div class="time_bus"><div class="title_S">周边小区</div><div class="text_S">{8}</div><div class="clear"></div></div><div class="time_bus"><div class="title_S">公交车站分布</div><div class="text_S">{9}</div><div class="clear"></div></div><div class="time_bus time_busa"><div class="title_S">慢行系统分布</div><div class="text_S">{10}</div><div class="clear"></div></div></div><div class="xl"><div class="title_xl title_xl2 ">经过线路</div><ul class="ul_xl2">{11}</ul><div class="clear"></div></div></div><div class="clear"></div></div>', i, _tStation.PositionX, _tStation.PositionY, _tStation.StationName, _tStation.StationID, _tStation.StationName, i, _tStation.Place, _rangCom, _rangBus, _tStation.SlowSystem, ss, i);
            }

            $('resultDiv').innerHTML = '<span></span>共有<i>' + l + '项</i>符合<a>'+kw+'</a>的搜索结果！';
            $('TabContent').innerHTML = '<div class="gj_a">' + s + '</div>';
        }
        else {
            $('resultDiv').innerHTML = '<span></span>没有相关水上巴士数据！';
            $('TabContent').innerHTML = '';
        }
        fnResize();
    }
}

function fnShowLi(i,x,y,sName,sid) {
    if ($('stationdiv' + i).style.display == 'none') {
        $('stationdiv' + i).style.display = 'block';
        $("number" + i).innerHTML = '--';
        
    } else {
        $('stationdiv' + i).style.display = 'none';
        $("number" + i).innerHTML = '+';
    }
    parent.fnGotoBusStation(sid, '' + sName + '', x * 1, y * 1);
}

function fnExit() {
    parent.__IsDrawBusLineState = false;
    parent.fnShowBusStationIco(null, 0);
}

////初始化高度
function fnResize(h){
    if (!h) {
        $('TabContent').style.height = (fnGetWindowHeight() - 95) + 'px';
    }
    else {
        $('TabContent').style.height = (h - 95) + 'px';
    }
}

function fnActive() {
    fnResize();
}