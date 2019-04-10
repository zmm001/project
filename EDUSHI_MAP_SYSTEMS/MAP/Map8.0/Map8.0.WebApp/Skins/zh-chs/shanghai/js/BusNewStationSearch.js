var _Index = 0;
var _Page = 1;
var _PageCount = 1;
var _RecordCount = 0;
var _PageSize = 20;
var _Begin;
var _End;

var _sIndex = "";

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

    $('stationlists').innerHTML = window.Config.Loading;
    
    BusStationSearchList("a");
    
    //广告
//    var script = this.$C('script');
//    script.type = 'text/javascript';
//    script.language = 'javascript';
//    script.src = window.Config.DataCetnerAdDataUrl + 'Ad2.0/ads.aspx?citycode=' + window.Config.CityCode + '&l=' + window.Config.Language + '&key=gongjiaoliebiao&domid=div_ad';
//    document.getElementsByTagName('head')[0].appendChild(script);
}

function StationSearch() {
    this.BtnStationSearch = function() {
        if ($('textKeyWords').value == '输入要搜索的公交或地铁站点名称' || $('textKeyWords').value == '') {
            $('textKeyWords').value = '';
            return;
        }
        var _kw = $('textKeyWords').value;
        if (_kw != "") {
            parent.fnAddBusStationSearchTab(_kw);
        }
    }
}

function BusStationSearchList(str) {
    $('stationlists').innerHTML = window.Config.Loading;
    _sIndex = str;
    var busstationURL = window.Config.DataCetnerMapDataUrl + "Map7.0/BusInfo.aspx?citycode=" + window.Config.CityCode + "&l=" + window.Config.Language + "&req=2&t=" + str;

    ENetwork.DownloadScript(busstationURL, function() {
        fnShowData();
    });
}

function fnShowData() {
    if (typeof _StationLists == 'undefined') {
        _StationLists = [];
    }

    if (_StationLists.length > 0) {
        var _tempHTML = "<div class=\"title\"><div class=\"t_l2\">“" + _sIndex.toUpperCase() + "” 字开头的站点</div><div class=\"t_r2\">{$Page}</div><div class=\"clear\"></div></div><ul class=\"ul_2\">{$list}</ul><div class=\"clear\"></div>";

        _RecordCount = _StationLists.length;
        if ((_RecordCount % _PageSize) == 0) {
            _PageCount = _RecordCount / (_PageSize);
        }
        else {
            _PageCount = int(_RecordCount, _PageSize) + 1;
        }
        var Begin = (_Page - 1) * (_PageSize);
        var End = _Page * _PageSize;
        if (End > _RecordCount) End = _RecordCount;
        _Begin = Begin;
        _End = End;
        var r = '';
        for (i = Begin; i < End; i++) {
            r += string.Format("<li><a href=\"javascript:;\" onclick=\"parent.fnGotoBusStation({0},'{1}',{2},{3});\" title=\"{6}\">{4}.{5}</a></li>", _StationLists[i].ID, _StationLists[i].Name, _StationLists[i].X, _StationLists[i].Y, (i + 1), _StationLists[i].Name, _StationLists[i].Name);
        }
        var strPage = fnPager(2, _Page, _PageSize, _PageCount, 'window.fnShowByPage');
        _tempHTML = _tempHTML.replace('{$list}', r + '<div class="clear"></div>').replace('{$Page}', strPage);

        $('stationlists').innerHTML = _tempHTML;
    }
    else {
        $('stationlists').innerHTML = '没有相关的站点！';
    }
}

function fnShowByPage(iPage) {
    if (iPage) {
        _Page = iPage;
    }
    fnShowData();
}

function fnExit() {
    
}

////初始化高度
function fnResize(h){
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