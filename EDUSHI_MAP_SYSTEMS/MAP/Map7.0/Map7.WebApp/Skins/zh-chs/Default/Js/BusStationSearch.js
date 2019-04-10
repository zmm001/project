window.onload = fnOnload;
var _StationSearch;
function fnOnload() {
    if (!window.Config) {
        setTimeout('fnOnload()', 200);
        return;
    }
    if (parseInt(fnGetWindowHeight() - 132) > 0) {
        $('TabContent').style.height = fnGetWindowHeight() - 132 + 'px';
    }
    _StationSearch = new StationSearch();
    $('BusSearch_Btn').onclick = _StationSearch.BtnStationSearch.bind(this);

    var _key = unescape(fnRequest('key'));
    if (_key != '') {
        $('textKeyWords').value = _key;
        _StationSearch.BtnStationSearch();
    }

    //广告
    var script = this.$C('script');
    script.type = 'text/javascript';
    script.language = 'javascript';
    script.src = window.Config.DataCetnerAdDataUrl + 'Ad2.0/ads.aspx?citycode=' + window.Config.CityCode + '&l=' + window.Config.Language + '&key=gongjiaoliebiao&domid=div_ad';
    document.getElementsByTagName('head')[0].appendChild(script);
}

function StationSearch() {
    this.BtnStationSearch = function() {
        var _kw = $('textKeyWords').value;
        if (_kw != "") {
            $('TabContent').innerHTML = window.Config.Loading;
            var url = window.Config.EDataCenterUrl + 'CommMap5.0/Bus.aspx?domain=' + window.Config.Domain + '&l=' + window.Config.Language + '&req=2&s=' + unescape(_kw);
            ENetwork.DownloadScript(url, function() { _StationSearch.fnBusStationShow(_kw); });
        }
    }

    this.fnBusStationShow = function(kw) {
        if (typeof _Station != 'undefined' && _Station.length > 0) {
            var l = _Station.length;
            var s = '';

            var HtmlBusStaionList = "";
            HtmlBusStaionList += "<div style=\" width: 270px;\">";
            HtmlBusStaionList += "		    <div class=\"bus_zhan_top\"></div>";
            HtmlBusStaionList += "		    <div class=\"bus_zhan_mid\">";
            HtmlBusStaionList += "			    <h2>";
            HtmlBusStaionList += "				    <div style=\"cursor:pointer;\" class=\"bus_zhan_title\" onclick = \"javaccript:fnShowLi({$ID},{$X},{$Y},'{$stationName1}',{$stationID});\">{$stationName}<div><a><img id=\"{$img}\" src=\"../images/bus_ico3_1.gif\" border=\"0\"></a></div></div>";
            HtmlBusStaionList += "			    </h2>";
            HtmlBusStaionList += "			    <div id=\"{$StationDivID}\" style=\"display:none;\">";
            HtmlBusStaionList += "			        <ul class=\"bus_zhan_con\">{$liLine}</ul>";
            HtmlBusStaionList += "			    </div>";
            HtmlBusStaionList += "		    </div>";
            HtmlBusStaionList += "		    <div class=\"bus_zhan_down\"></div>";
            HtmlBusStaionList += "</div>";

            var HtmlliLineList = "";
            HtmlliLineList = "<li><a href=\"javascript:parent.fnOnBusClick({$LineID},'{$LineName}');\">{$LineName}</a>&nbsp;&nbsp;</li>";

            var _temp = '';
            for (i = 0; i < l; i++) {
                _temp = HtmlBusStaionList;
                var _tempName = _Station[i].StationName.replace(kw, "<span>" + kw + "</span>");

                s += _temp.replace("{$stationName}", _tempName).replace("{$X}", _Station[i].PositionX).replace("{$Y}", _Station[i].PositionY).replace("{$ID}", i).replace("{$stationName1}", _Station[i].StationName).replace("{$stationID}", _Station[i].StationID).replace("{$StationDivID}", "stationdiv" + i).replace("{$img}", "img" + i);

                var sl = _Station[i].Bus.length;
                var ss = '';
                for (j = 0; j < sl; j++) {
                    _temp = HtmlliLineList;
                    ss += _temp.replace("{$LineID}", _Station[i].Bus[j].VehicleID).replaceAll("{$LineName}", _Station[i].Bus[j].VehicleName);
                }
                s = s.replace('{$liLine}', ss);
            }

            var sBusStation = '<h1>共有<b>{$No}</b>项符合<b>{$Key}</b>的查询结果</h1>';
            $('TabContent').innerHTML = sBusStation.replace('{$No}', l).replace('{$Key}', kw) + s;
        }
        else {
            $('TabContent').innerHTML = '<div class="NoInfoClew">没有相关公交数据！</div>';
        }
        fnResize();
    }
}

function fnShowLi(i, x, y, sName, sid) {
    if ($('stationdiv' + i).style.display == 'none') {
        $('stationdiv' + i).style.display = 'block';
        $('img' + i).src = '../images/bus_ico3.gif';
    } else {
        $('stationdiv' + i).style.display = 'none';
        $('img' + i).src = '../images/bus_ico3_1.gif';
    }
    parent.fnGotoBusStation(sid, '' + sName + '', x * 1, y * 1);
}

function fnExit() {
    parent.__IsDrawBusLineState = false;
    parent.fnShowBusStationIco(null, 0);
}

////初始化高度
function fnResize(h) {
    if (!h) {
        $('TabContent').style.height = (fnGetWindowHeight() - 132) + 'px';
    }
    else {
        $('TabContent').style.height = (h - 132) + 'px';
    }
}

function fnActive() {
    fnResize();
}