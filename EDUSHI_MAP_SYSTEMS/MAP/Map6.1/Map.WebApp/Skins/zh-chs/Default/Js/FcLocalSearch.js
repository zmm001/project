var _SearchType;    //搜索类型
var _Key;           //搜索关键字

var _RegionCode;
var _HouseKind;

var _PL;
var _PH;

var _Page = 1;
var _PageCount = 1;
var _RecordCount = 0;
var _PageSize = 5;

var _Region = {
    '330110': '余杭区',
    '330109': '萧山区',
    '330108': '滨江区',
    '330106': '西湖区',
    '330105': '拱墅区',
    '330104': '江干区',
    '330103': '下城区',
    '330102': '上城区'
};

window.onload=fnOnload;
function reLoadPageSize()
{
    _PageSize = Math.floor((fnGetWindowHeight())/50);
    if(_PageSize < 5)
    {
        _PageSize = 5;
    }
}
function fnOnload()
{
    if (!window.Config)
    {
        setTimeout('fnOnload()', 200);
        return;
    }
    
    _SearchType = fnRequest('type');
    _Key = unescape(fnRequest('keyword'));

    if (_SearchType != '1') {
        _RegionCode = fnRequest('regionCode');
        _HouseKind = fnRequest('housekind');
        _PL = fnRequest('pl');
        _PH = fnRequest('ph');
    }
    fnShowByPage(1);
 
}
//显示搜索到的数据
function fnShowData() {
    var sSearchHtml = '';

    var hangPrice = 0;
    
 if (typeof _FTMapSearchResult != 'undefined')
  {
    
    switch (_SearchType) {
        case '1':
            _RecordCount = _FTMapSearchResult.PageSetting.RecordCount;
            _PageCount = _FTMapSearchResult.PageSetting.totalPage;
            sSearchHtml = '<div class="Sea3DTil">在房产地图(房价地图)中共有<strong>' + _RecordCount + '项</strong>符合<strong>' + _Key + '</strong>的查询结果</div><ul class="LocalList">';
            for (var i = 0; i < _FTMapSearchResult.Item.length; i++) {
                var item = _FTMapSearchResult.Item[i];
                
                    if (item.AvgPriceType != 0) {
                        if (item.AvgPriceType == 3) {
                            hangPrice = parseInt(item.NewPrice);

                        }
                        else {
                            hangPrice = parseInt(item.HangPrice);
                        }
                    }
                    sSearchHtml += '<li class="PitchOn"><div class="Number Currently"><span>' + ((_Page - 1) * _PageSize + i + 1) + '</span></div><div class="DetailCon"><div class="TitleNav"><span class="HeadLine"><a onclick="parent.fnShowFcPop(' + _SearchType + ',_FTMapSearchResult.Item[' + i + '])"  href="javascript:;">' + item.Name + '</a></span>';
                if (item.AvgPriceType != 0) {
                    sSearchHtml += '<span class="AvPrice">均价<strong>' + hangPrice + '</strong>元/㎡</span>';
                }
                sSearchHtml += '</div><div class="Address">' + item.Address + '</div></div><div class="DottedLine"></div></li>';
            }
            break;
        case '2':
            _RecordCount = _FTNewHouseSearchResult.PageSetting.RecordCount;
            _PageCount = _FTNewHouseSearchResult.PageSetting.totalPage;
            sSearchHtml = '<div class="Sea3DTil">在房产地图(新房)中共有<strong>' + _RecordCount + '项</strong>符合<strong>' + _Key + '</strong>的查询结果</div><ul class="LocalList">';
            for (var i = 0; i < _FTNewHouseSearchResult.Item.length; i++) {
                var item = _FTNewHouseSearchResult.Item[i];
                sSearchHtml += '<li class="PitchOn"><div class="Number Currently"><span>' + ((_Page - 1) * _PageSize + i + 1) + '</span></div><div class="DetailCon"><div class="TitleNav"><span class="ArCov">[' + item.Name + ']</span><span class="HeadLine"><a onclick="parent.fnShowFcPop(' + _SearchType + ',_FTNewHouseSearchResult.Item[' + i + '])" href="javascript:;">' + item.Title + '</a></span></div><div class="OthInfo">面积：<strong>' + item.Acreage + '</strong>㎡<span>单价：<strong>' + item.UnitPrice + '</strong>元/㎡</span></div></div><div class="DottedLine"></div></li>';
            }
            break;
        case '3':
            _RecordCount = _FTSecondHouseSearchResult.PageSetting.RecordCount;
            _PageCount = _FTSecondHouseSearchResult.PageSetting.totalPage;
            sSearchHtml = '<div class="Sea3DTil">在房产地图(二手房)中共有<strong>' + _RecordCount + '项</strong>符合<strong>' + _Key + '</strong>的查询结果</div><ul class="LocalList">';
            for (var i = 0; i < _FTSecondHouseSearchResult.Item.length; i++) {
                var item = _FTSecondHouseSearchResult.Item[i];
                sSearchHtml += '<li class="PitchOn"><div class="Number Currently"><span>' + ((_Page - 1) * _PageSize + i + 1) + '</span></div><div class="DetailCon"><div class="TitleNav"><span class="ArCov">[' + item.Name + ']</span><span class="HeadLine"><a onclick="parent.fnShowFcPop(' + _SearchType + ',_FTSecondHouseSearchResult.Item[' + i + '])" href="javascript:;">' + item.Title + '</a></span></div><div class="OthInfo">面积：<strong>' + item.Acreage + '</strong>㎡<span>单价：<strong>' + item.UnitPrice + '</strong>元/㎡</span></div></div><div class="DottedLine"></div></li>';
            }
            break;
        case '4':
            _RecordCount = _FTLeaseHouseSearchResult.PageSetting.RecordCount;
            _PageCount = _FTLeaseHouseSearchResult.PageSetting.totalPage;
            sSearchHtml = '<div class="Sea3DTil">在房产地图(租房)中共有<strong>' + _RecordCount + '项</strong>符合<strong>' + _Key + '</strong>的查询结果</div><ul class="LocalList">';
            for (var i = 0; i < _FTLeaseHouseSearchResult.Item.length; i++) {
                var item = _FTLeaseHouseSearchResult.Item[i];
                sSearchHtml += '<li class="PitchOn"><div class="Number Currently"><span>' + ((_Page - 1) * _PageSize + i + 1) + '</span></div><div class="DetailCon"><div class="TitleNav"><span class="ArCov">[' + item.Name + ']</span><span class="HeadLine"><a onclick="parent.fnShowFcPop(' + _SearchType + ',_FTLeaseHouseSearchResult.Item[' + i + '])" href="javascript:;">' + item.Title + '</a></span></div><div class="OthInfo">' + item.Room + '室' + item.holl + '厅' + item.loo + '卫' + item.cookroom + '厨' + item.terrace + '阳台<span>';

                if (item.PriceUnit == 353) {
                    sSearchHtml += '租金：<strong>' + item.RefPrice + '</strong>元/月</span>';
                }
                else {
                    sSearchHtml += '租金：<strong>' + item.RefPrice + '</strong>元/月/平米</span>';
                }
                sSearchHtml += '</div></div><div class="DottedLine"></div></li>';
            }
            break;
        case '5':
            _RecordCount = _FTMapSearchResult.PageSetting.RecordCount;
            _PageCount = _FTMapSearchResult.PageSetting.totalPage;
            sSearchHtml = '<div class="Sea3DTil">在房产地图(小区房价)中共有<strong>' + _RecordCount + '项</strong>符合<strong>' + _Key + '</strong>的查询结果</div><ul class="LocalList">';
            for (var i = 0; i < _FTMapSearchResult.Item.length; i++) {
                var item = _FTMapSearchResult.Item[i];
                sSearchHtml += '<li class="PitchOn"><div class="Number Currently"><span>' + ((_Page - 1) * _PageSize + i + 1) + '</span></div><div class="DetailCon"><div class="TitleNav"><span class="ArCov">' + fnGetRegionName(item.regionCode) + '</span><span class="HeadLine"><a onclick="parent.fnShowFcPop(' + _SearchType + ',_FTMapSearchResult.Item[' + i + '])" href="javascript:;">' + item.Name + '</a></span>';
                if (item.AvgPriceType != 0) {
                    if (item.AvgPriceType == 3) {
                        sSearchHtml += '<span class="AvPrice">均价<strong>' + parseInt(item.NewPrice) + '</strong>元/㎡</span>';
                    }
                    else {
                        sSearchHtml += '<span class="AvPrice">均价<strong>' + parseInt(item.HangPrice) + '</strong>元/㎡</span>';
                    }
                    if (item.HangRate != 0) {
                        if (item.HangRate > 0) {
                            sSearchHtml += '<span class="Extent">' + item.HangRate + '%↑</span>';
                        }
                        else {
                            sSearchHtml += '<span class="Extent">' + item.HangRate + '%↓</span>';
                        }
                    }
                }
                sSearchHtml += '</div><div class="OthInfo">出租：<strong>' + item.LeaseNum + '</strong><span>二手：<strong>' + item.SecondNum + '</strong></span><span>新房：' + item.NewNum + '</span></div></div><div class="DottedLine"></div></li>';
            }
            break;
    }
    
    
    sSearchHtml += '</ul>';
    sSearchHtml += '<div class="Paginate">'+fnPager(6, _Page, _PageSize, _PageCount, 'window.fnShowByPage')+'</div>';
    $('divContent').innerHTML = sSearchHtml;
    
    }
    
    else 
    {
      $('divContent').innerHTML='';
     
    }
    
    fnResize();
    
}

function fnGetRegionName(code)
{
    if(typeof _Region[code] != 'undefined')
    {
        return  '['+_Region[code]+']';
    }
    else
    {
        return '';
    }
}

function fnShowByPage(iPage)
{
    $('divContent').innerHTML = window.Config.Loading;
    if(iPage)
    {
        _Page = iPage;
    }
    reLoadPageSize();
    var sSearchUrl = '';
    switch (_SearchType) {
        case '1':       
            sSearchUrl = 'http://aip.fangtoo.com/house.aspx?type=jsonbuildinglist&citydomain='+window.Config.CityCode+'&page=' + _Page + '&pagesize=' + _PageSize + '&k=' + escape(_Key);
            break;
        case '2':
            sSearchUrl = 'http://aip.fangtoo.com/NewHouseList.aspx?citydomain='+window.Config.CityCode+'&page=' + _Page + '&pagesize=' + _PageSize + '&regionCode=' + _RegionCode + '&housekind=' + _HouseKind + '&pl=' + _PL + '&ph=' + _PH + '&k=' + escape(_Key);
            break;
        case '3':
            sSearchUrl = 'http://aip.fangtoo.com/TradeHouseList.aspx?citydomain='+window.Config.CityCode+'&page=' + _Page + '&pagesize=' + _PageSize + '&regionCode=' + _RegionCode + '&room=' + _HouseKind + '&pl=' + _PL + '&ph=' + _PH + '&k=' + escape(_Key);
            break;
            case '4':
                sSearchUrl = 'http://aip.fangtoo.com/LeaseHouseList.aspx?citydomain='+window.Config.CityCode+'&page=' + _Page + '&pagesize=' + _PageSize + '&regionCode=' + _RegionCode + '&room=' + _HouseKind + '&pl=' + _PL + '&ph=' + _PH + '&k=' + escape(_Key);
                break;
            case '5':
                sSearchUrl = 'http://aip.fangtoo.com/BuildingList.aspx?citydomain='+window.Config.CityCode+'&page=' + _Page + '&pagesize=' + _PageSize + '&k=' + escape(_Key);
            break;
    }
    if (sSearchUrl != '') {
        ENetwork.DownloadScript(sSearchUrl, function() { fnShowData(); });
    }
}

function fnActive(){
}
function fnExit()
{
}
//初始化高度
function fnResize() {
    $('TabContent').style.height = fnGetWindowHeight() - 5 + 'px';
}
