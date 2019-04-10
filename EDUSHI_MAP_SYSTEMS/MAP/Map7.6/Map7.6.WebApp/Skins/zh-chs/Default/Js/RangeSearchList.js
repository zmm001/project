var _SearchType;    //搜索类型
var _Key;           //搜索关键字
var _Address;       //搜索地址

var _Page = 1;
var _PageCount = 1;
var _RecordCount = 0;
var _PageSize = 15;
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

    var _x = fnRequest('x');
    var _y = fnRequest('y');
    var _key = unescape(fnRequest('key'));
    var _type = fnRequest('type');
    fnLoadRangSearch(_x, _y, _key, _type);
}

function fnLoadRangSearch(x, y, key, type) {
    var src = '';
    if (type == 'dian') {
        src = window.Config.DataCetnerSearchDataUrl + "/SearchMapHYByRang/" + window.Config.CityCode + "/" + window.Config.Language + "/Format/Json/Search/1/100?eshop=1&range=1000&x=" + x + "&y=" + y;
    }
    else {
        src = window.Config.DataCetnerSearchDataUrl + "/SearchMapHYByRang/" + window.Config.CityCode + "/" + window.Config.Language + "/Format/Json/Search/1/100?q=" + encodeURIComponent(key) + "&range=1000&x=" + x + "&y=" + y;
    }
    ENetwork.DownloadScript(src, function () { fnShowData(); });
}

//显示搜索到的数据
function fnShowData() {
    if (typeof _Range == 'undefined') {
        _Range = [];
    }
    _SearchData = _Range;
    if (_Range.length > 0) {
        $('divResult').innerHTML = '共有<span>' + _Range.length + '</span>项符合周边<span>' + unescape(fnRequest('key')) + '</span>的搜索结果.';
        
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
        var LiHtml='';
        for (i = Begin; i < End; i++) {
            var sName = _Range[i].OCName.replace("'","’");
            var sAddress = _Range[i].Address;
            var X = _Range[i].X;
            var Y = _Range[i].Y;
            var OwnerID = _Range[i].OwnerID;
            var CompanyID = _Range[i].CompanyID;
            var RecordType = _Range[i].RecordType;
            var LST_ID = _Range[i].LST_ID;
            var Vip = _Range[i].Vip;
            var sUrl = '', sVipIcon='';
            if (LST_ID == 1 && Vip > 0) {
                //收费E店
                sUrl = window.Config.DianUrl + CompanyID + '.html';
                sVipIcon = '<span class="icon_e"><a href="' + sUrl + '" target="_blank"><img src="/Images/VipEdian.gif" alt="Vip E店" /></a></span>';
            }

            LiHtml += string.Format('<li x="{12}" y="{13}" iN="{14}"><div class="MC"><div class="nb"><span class="icon">{0}</span></div><a href="javascript:;" onclick="parent.fnShowSearchPop({1},{2},{3},{4},{5},{6},\'{7}\',\'{8}\',\'\');" title="{9}">{10}</a>{15}<div class="clear"></div></div><div class="DZ kk260">{11}</div></li>', i + 1, OwnerID, CompanyID, LST_ID, X, Y, RecordType, sName, sAddress, sName, sName, sAddress, X, Y, i, sVipIcon);
        }
        var strPage = fnPager(5, _Page, _PageSize, _PageCount, 'window.fnShowByPage');
        $('Page').innerHTML = strPage;
        $('divContent').innerHTML = LiHtml;
        fnResize();
        parent.onSearchDataCallBack(_Range, Begin, End);

        jQuery("li").hover(
        function () {
            jQuery(this).addClass("li_s");
            jQuery(parent.vM.$(jQuery(this).attr("x") + "_" + jQuery(this).attr("y") + "_" + jQuery(this).attr("iN"))).parent().css('z-index', 999999);
        },
        function () {
            jQuery(this).removeClass("li_s");
            jQuery(parent.vM.$(jQuery(this).attr("x") + "_" + jQuery(this).attr("y") + "_" + jQuery(this).attr("iN"))).parent().css('z-index', 1);
        });
    }
    else {
        $('TabContent').innerHTML = '<div class="JG_w"><div class="title">抱歉，没有找到周边<span>“' + unescape(fnRequest('key')) + '”</span>有关的相关结果！</div></div>';
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
}