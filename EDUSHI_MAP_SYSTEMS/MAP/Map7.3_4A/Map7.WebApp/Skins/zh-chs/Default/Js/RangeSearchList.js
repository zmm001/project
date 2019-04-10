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
    
    //http: //edata.edushi.com/searchdata/SearchMapHYByRang/hz/zh-chs/Format/Json/Search/1/10?q=杭州大厦&x=22234&y=24705&range=500
    $('divContent').innerHTML = window.Config.Loading;
    var src = window.Config.DataCetnerSearchDataUrl + "/SearchMapHYByRang/" + window.Config.CityCode + "/" + window.Config.Language + "/Format/Json/Search/1/100?q=" + encodeURIComponent(unescape(fnRequest('key'))) + "&range=1000&x=" + fnRequest('x') + "&y=" + fnRequest('y');
    ENetwork.DownloadScript(src, function() { fnShowData(); });
}
//显示搜索到的数据
function fnShowData() {
    if (typeof _Range == 'undefined') {
        _Range = [];
    }
    _SearchData = _Range;
    if (_Range.length > 0) {
        $('divResult').innerHTML = '<div class="Sea3DTil">共有<strong>' + _Range.length + '</strong>个搜索结果。<strong></strong></div>';
        ulLocalSearchHtml = "";
        ulLocalSearchHtml += "<ul class=\"cenne\">{$ListLi}</ul><div class=\"page\">{$Page}</div>";

        liLocalSearchHtml = "<li><span class=\"num\">{$No}.</span><span class=\"{$Class}\"><a href=\"javascript:;\" title=\"{$Title}\" onclick=\"parent.fnShowSearchPop({$oid},{$cid},0,{$X},{$Y},{$DataType},'{$Name}','{$Address}','')\">{$Title}</a></span>&nbsp;&nbsp;{$Order}<br><span class=\"dz\">{$Address}</span></li>";

        var s = '';
        var r = '';

        reLoadPageSize(0);
        _RecordCount = _Range.length;
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
            var t = _Range[i].OCName;
            //var sAddress = _Range[i].Address;
            var sTmpHtml = '';

            sTmpHtml = LiHtml.replace('{$No}', i + 1).replace('{$Title}', _Range[i].OCName).replace('{$Title}', t).replace('{$AppDomain}', window.Config.Domain).replace('{$X}', _Range[i].X).replace('{$Y}', _Range[i].Y).replace('{$oid}', _Range[i].OwnerID).replace('{$cid}', _Range[i].CompanyID).replace('{$DataType}', getType(_Range[i].OwnerID)).replace('{$Name}', _Range[i].OCName).replace('{$Address}', '').replace('{$Address}', '').replace('{$Class}', 'SanWei');

            sTmpHtml = sTmpHtml.replace('{$Order}', GetImg(_Range[i].OwnerID, _Range[i].CompanyID, _Range[i].OCName));
            s += sTmpHtml;
        }
        var strPage = fnPager(5, _Page, _PageSize, _PageCount, 'window.fnShowByPage');
        r = r.replace('{$ListLi}', s).replace('{$Page}', strPage);
        $('divContent').innerHTML = r;
        fnResize();
        parent.onSearchDataCallBack(_Range, Begin, End);
    }
    else {
        $('divResult').innerHTML = '<div class="Sea3DTil">共有<strong>0</strong>个搜索结果。<strong></strong></div>';
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
        return '<a  href= "http://' + this.Config.Domain + '/yp/2-' + ID + '.shtml"  target="_blank" ></a>';
    }
    else {
        ID = CompanyID;

        return '<a  href= "http://' + this.Config.Domain + '/yp/1-' + ID + '.shtml"  target="_blank" ></a>';

    }
}

function fnShowByPage(iPage) {
    if (iPage) {
        _Page = iPage;
    }
    fnShowData();
}

function fnActive() {
    if (typeof _Range != 'undefined' && _Range.length > 0) {
        parent.onSearchDataCallBack(_Range, _Begin, _End);
    }
    else {
        parent.onSearchDataCallBack(null, 0, 0);
    }
    fnResize();
}
function fnExit() {
    parent.onSearchDataCallBack(null, 0, 0);
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