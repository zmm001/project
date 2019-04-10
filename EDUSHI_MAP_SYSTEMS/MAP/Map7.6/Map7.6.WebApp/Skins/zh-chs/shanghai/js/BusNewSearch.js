var _Index = 0;
var _Page = 1;
var _PageCount = 1;
var _RecordCount = 0;
var _PageSize = 28;
var _Begin;
var _End;

var _sIndex = 0;

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
    $('subwaylines').innerHTML = window.Config.Loading;
    $('buslines').innerHTML = window.Config.Loading;

    var subwaylinesURL = window.Config.DataCetnerMapDataUrl + "Map7.0/SubWayInfo.aspx?citycode=" + window.Config.CityCode + "&l=" + window.Config.Language + "&req=1";

    ENetwork.DownloadScript(subwaylinesURL, function() {
        if (typeof _SubWayList != 'undefined' && _SubWayList.length > 0) {
            _SubWayList.sort(function com(a, b) { return parseInt(a.Asid) - parseInt(b.Asid); }); 
            var subwaylines = '';
            for (var i = 0; i < _SubWayList.length; i++) {
                subwaylines += string.Format("<li><span style=\"background:{0};\"></span><a href=\"javascript:;\" onclick=\"parent.fnOnBusClick({1},'{2}','');\" title=\"{4}\">{3}</a></li>", _SubWayList[i].Color, _SubWayList[i].ID, _SubWayList[i].Name, _SubWayList[i].Name, _SubWayList[i].Name);
            }

            $('subwaylines').innerHTML = subwaylines + "<div class=\"clear\"></div>";
        }
        else {
            $('subwaylines').innerHTML = '无法获取数据！';
        }
    });

    BusLineSearchList(1);

    //广告
//    var script = this.$C('script');
//    script.type = 'text/javascript';
//    script.language = 'javascript';
//    script.src = window.Config.DataCetnerAdDataUrl + 'Ad2.0/ads.aspx?citycode=' + window.Config.CityCode + '&l=' + window.Config.Language + '&key=gongjiaoliebiao&domid=div_ad';
//    document.getElementsByTagName('head')[0].appendChild(script);
}

function BusLineSearch() {
    this.BtnBusLineSearch = function() {
        if ($('textKeyWords').value == '输入要搜索的公交或地铁线路名称' || $('textKeyWords').value == '') {
            $('textKeyWords').value = '';
            return;
        }
        var _kw = $('textKeyWords').value;
        if (_kw != "") {
            parent.fnAddBusLineSearchTab(_kw);
        }
    }
}

function BusLineSearchList(index) {
    $('buslines').innerHTML = window.Config.Loading;
    _sIndex = index;
    var buslinesURL = window.Config.DataCetnerMapDataUrl + "Map7.0/BusInfo.aspx?citycode=" + window.Config.CityCode + "&l=" + window.Config.Language + "&req=1&t=" + index;

    ENetwork.DownloadScript(buslinesURL, function() {
        fnShowData();
    });    
}

function fnShowData() {
    if (typeof _LineLists == 'undefined') {
        _LineLists = [];
    }

    if (_LineLists.length > 0) {
        var _tempHTML = "<div class=\"title\"><div class=\"t_l2\">“" + _sIndex + "” 字开头的线路</div><div class=\"t_r2\">{$Page}</div><div class=\"clear\"></div></div><ul class=\"ul_4\">{$list}</ul><div class=\"clear\"></div>";

        _RecordCount = _LineLists.length;
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
            r += string.Format("<li><a href=\"javascript:;\" onclick=\"parent.fnOnBusClick({0},'{1}','');\" {2} title=\"{4}\">{3}</a></li>", _LineLists[i].ID, _LineLists[i].Name, _LineLists[i].IsNight == 1 ? "class='current'" : "", _LineLists[i].Name, _LineLists[i].Name);
        }
        var strPage = fnPager(2, _Page, _PageSize, _PageCount, 'window.fnShowByPage');
        _tempHTML = _tempHTML.replace('{$list}', r + '<div class="clear"></div>').replace('{$Page}', strPage);

        $('buslines').innerHTML = _tempHTML;
    }
    else {
        $('buslines').innerHTML = '无法获取数据！';
    }
}

function fnShowByPage(iPage) {
    if (iPage) {
        _Page = iPage;
    }
    fnShowData();
}

function fnActive() {
   
}

function fnExit() {
    
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