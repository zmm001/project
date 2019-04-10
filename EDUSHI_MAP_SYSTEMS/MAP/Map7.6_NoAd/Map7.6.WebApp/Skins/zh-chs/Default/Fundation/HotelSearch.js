var _SearchType;    //搜索类型
var _Key;           //搜索关键字
var _Address;       //搜索地址

var _Page = 1;
var _PageCount = 1;
var _RecordCount = 0;
var _PageSize = 13;
var _SearchData = {};
var _Begin;
var _End;
var HasLoadAd = false;
var ulLocalSearchHtml = '';
var liLocalSearchHtml = '';
window.onload=fnOnload;

function reLoadPageSize()
{
    _PageSize = Math.floor((fnGetWindowHeight() -80)/50);
    if(_PageSize < 8)
    {
        _PageSize = 8;
    }
}
function fnOnload() {
    if (!window.Config) {
        setTimeout('fnOnload()', 200);
        return;
    }

    $('divContent').innerHTML = window.Config.Loading;
    var cityCode = fnRequest('cityCode');
    var l = fnRequest('l');
    var src = "http://" + window.Config.Domain + "/HotelDataList/" + window.Config.CityCode + "_" + window.Config.Language + ".js";
    ENetwork.DownloadScript(src, function() { fnShowData(); });
}
//显示搜索到的数据
function fnShowData() {
    if (typeof _Search == 'undefined') {
        _Search = {};
    }
    _SearchData = _Search;
    if (_Search.length > 0) {
        $('divResult').innerHTML = '<div class="Sea3DTil">共有<strong>' + _Search.length + '</strong>家酒店可以预订<strong></strong></div>';
        ulLocalSearchHtml = "";
        ulLocalSearchHtml += "<ul class=\"cenne\">{$ListLi}</ul><div class=\"page\">{$Page}</div>";

        liLocalSearchHtml = "<li><span class=\"num\">{$No}.</span><span class=\"{$Class}\"><a href=\"javascript:;\" title=\"{$Title}\" onclick=\"parent.fnShowSearchPop({$oid},{$cid},0,{$X},{$Y},{$DataType},'{$Name}','{$Address}','')\">{$Title}</a></span>&nbsp;&nbsp;{$Order}<br><span class=\"dz\">{$Address}</span></li>";

        var s = '';
        var r = '';

        reLoadPageSize(0);
        _RecordCount = _Search.length;
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
        r = ulLocalSearchHtml;
        var LiHtml;
        for (i = Begin; i < End; i++) {
            LiHtml = liLocalSearchHtml;
            var t = _Search[i].Name;
            var sAddress = _Search[i].Address;
            var sTmpHtml = '';

            sTmpHtml = LiHtml.replace('{$No}', i + 1).replace('{$Title}', _Search[i].Name).replace('{$Title}', t).replace('{$AppDomain}', window.Config.Domain).replace('{$X}', _Search[i].X).replace('{$Y}', _Search[i].Y).replace('{$oid}', _Search[i].OwnerID).replace('{$cid}', _Search[i].CompanyID).replace('{$DataType}', getType(_Search[i].OwnerID)).replace('{$Name}', _Search[i].Name).replace('{$Address}', _Search[i].Address).replace('{$Address}', sAddress).replace('{$Class}', 'SanWei');

            sTmpHtml = sTmpHtml.replace('{$Order}', GetImg(_Search[i].OwnerID, _Search[i].CompanyID, _Search[i].Name));
            s += sTmpHtml;
        }
        var strPage = fnPager(5, _Page, _PageSize, _PageCount, 'window.fnShowByPage');
        r = r.replace('{$ListLi}', s).replace('{$Page}', strPage);
        $('divContent').innerHTML = r;
        fnResize();
        parent.onSearchDataLoadComplete(_Search, Begin, End);
    }
    else {
        $('divContent').innerHTML = '';
    }
}

function getType(OwnerID) {
    if (OwnerID == '0') {
        return '1';
    }
    else {
        return '2';
    }
}

function GetImg(OwnerID, CompanyID, Name) {
    var ID = "";
    if (CompanyID == 0) {
        ID = OwnerID;
        return '<a  href= "http://' + this.Config.Domain + '/yp/2-' + ID + '.shtml"  target="_blank" ><img src="/Skins/zh-chs/Default/Images/OrderHotel.gif" border="0"  style="cursor:hand"/></a>';
    }
    else {
        ID = CompanyID;

        return '<a  href= "http://' + this.Config.Domain + '/yp/1-' + ID + '.shtml"  target="_blank" ><img src="/Skins/zh-chs/Default/Images/OrderHotel.gif" border="0"  style="cursor:hand" /></a>';

    }
}

function fnShowByPage(iPage) {
    if (iPage) {
        _Page = iPage;
    }
    fnShowData();
}

function fnActive() {
    if (typeof _SearchData.SearchTable != 'undefined' && _SearchData.SearchTable.length > 0) {
        parent.onSearchDataLoadComplete(_SearchData.SearchTable, _Begin, _End);
    }
    else {
        parent.onSearchDataLoadComplete(null, 0, 0);
    }
    fnResize();
}
function fnExit() {
    parent.onSearchDataLoadComplete(null, 0, 0);
    parent._RoadLineLayer.innerHTML = '';
    parent._RoadCoords = [];
}
//初始化高度
function fnResize(h) {
    if (!h) {
        $('TabContent').style.height = (fnGetWindowHeight() - 5) + 'px';
    }
    else {
        $('TabContent').style.height = (h - 5)+ 'px';
    }
    reLoadPageSize(0);
}

//酒店预订搜索
function searchkeyword() {
    var keyword = $('txkeyword').value;
    _Page = 1;
    if (keyword != "") {
        var SearchResurt = [];

        if (typeof _Search != 'undefined') {
            for (var i = 0; i < _Search.length; i++) {
                if (_Search[i].Name.indexOf(keyword) >= 0) {
                    SearchResurt.push(_Search[i]);
                }
            }
            fnShowSearchData(SearchResurt);
        }
    }
    else {
        fnShowSearchData(_SearchData);
    }
}

function fnShowSearchData(SearchData) {
    if (typeof SearchData == 'undefined') {
        SearchData = [];
    }
    var sLocalSearchHtml = '';
    if (SearchData.length > 0) {
        $('divResult').innerHTML = '<div class="Sea3DTil">共有<strong>' + SearchData.length + '</strong>家酒店可以预订<strong></strong></div>';

        ulLocalSearchHtml = "";
        ulLocalSearchHtml += "<ul class=\"cenne\">{$ListLi}</ul><div class=\"page\">{$Page}</div>";

        liLocalSearchHtml = "<li><span class=\"num\">{$No}.</span><span class=\"{$Class}\"><a href=\"javascript:;\" title=\"{$Title}\" onclick=\"parent.fnShowSearchPop({$oid},{$cid},0,{$X},{$Y},{$DataType},'{$Name}','{$Address}','')\">{$Title}</a></span>&nbsp;&nbsp;{$Order}<br><span class=\"dz\">{$Address}</span></li>";
        
        var s = '';
        var r = '';
        
        reLoadPageSize(0);
        _RecordCount = SearchData.length;
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
        r = ulLocalSearchHtml;
        var LiHtml;
        for (i = Begin; i < End; i++) {
            LiHtml = liLocalSearchHtml;
            var t = SearchData[i].Name;
            var sAddress = SearchData[i].Address;

            var sTmpHtml = '';

            sTmpHtml = LiHtml.replace('{$No}', i + 1).replace('{$Title}', SearchData[i].Name).replace('{$Title}', t).replace('{$AppDomain}', window.Config.Domain).replace('{$X}', SearchData[i].X).replace('{$Y}', SearchData[i].Y).replace('{$oid}', SearchData[i].OwnerID).replace('{$cid}', SearchData[i].CompanyID).replace('{$DataType}', getType(SearchData[i].OwnerID)).replace('{$Name}', SearchData[i].Name).replace('{$Address}', SearchData[i].Address).replace('{$Address}', sAddress).replace('{$Class}', 'SanWei');

            sTmpHtml = sTmpHtml.replace('{$Order}', GetImg(SearchData[i].OwnerID, SearchData[i].CompanyID, SearchData[i].Name));
            s += sTmpHtml;
        }
        var strPage = fnPager(5, _Page, _PageSize, _PageCount, 'window.fnShowByPage');
        r = r.replace('{$ListLi}', s).replace('{$Page}', strPage);
        $('divContent').innerHTML = r;
        fnResize();
        parent.onSearchDataLoadComplete(SearchData, Begin, End);
    }
    else {
        $('divContent').innerHTML = '';
    }
}