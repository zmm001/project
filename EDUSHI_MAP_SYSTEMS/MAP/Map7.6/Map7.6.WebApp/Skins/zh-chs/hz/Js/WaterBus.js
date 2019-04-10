window.onload = fnOnload;
var _StationSearch;
function fnOnload() {
    if (!window.Config) {
        setTimeout('fnOnload()', 200);
        return;
    }

    if (parseInt(fnGetWindowHeight() - 12) > 0) {
        $('TabContent').style.height = (fnGetWindowHeight() - 5) + 'px';
    }
    $('waterBusList').innerHTML = window.Config.Loading;
    var _url = window.Config.DataCetnerSearchDataUrl + 'SearchTankerAllNumber/' + window.Config.CityCode + '/' + window.Config.Language + '/Format/Json/Search';
    var waterBusList = '';
    ENetwork.DownloadScript(_url, function() {
        if (typeof _TankerNumber != 'undefined' && _TankerNumber.length > 0) {
            for (var i = 0; i < _TankerNumber.length; i++) {
                waterBusList += string.Format('<li><div class="dq_name"><span class="icona" style="background:{0};"></span><a href="javascript:;" onclick="parent.fnOnWaterBusClick({4},\'{5}\');">{1}</a></div><div class="clear"></div><div class="dq_zd"><span>起点：{2}</span>   <span>终点：{3}</span></div></li>', _TankerNumber[i].VehicleColor, _TankerNumber[i].VehicleName, _TankerNumber[i].StartStation, _TankerNumber[i].EndStation, _TankerNumber[i].VehicleID, _TankerNumber[i].VehicleName);
            }

            $('waterBusList').innerHTML = waterBusList;
        }
        else {
            $('waterBusList').innerHTML = '暂无水上巴士信息。';
        }
    });
}

function fnExit() {
    
}

////初始化高度
function fnResize(h){
    if (!h) {
        $('TabContent').style.height = (fnGetWindowHeight() - 5) + 'px';
    }
    else {
        $('TabContent').style.height = (h - 5) + 'px';
    }
}

function fnActive() {
    fnResize();
}