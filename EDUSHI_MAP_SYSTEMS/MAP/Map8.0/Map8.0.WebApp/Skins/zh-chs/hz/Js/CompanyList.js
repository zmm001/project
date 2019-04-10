_Page=1;
_Count=0;
_PageSize=13;
_PageCount=1;
_Owner = '';
var SortData = [];
window.onload=fnOnload;
function fnOnload()
{
    if (!window.Config)
    {
        setTimeout('fnOnload()', 200);
        return;
    }
    document.body.innerHTML=window.Config.Loading;

    var iOwnerID = fnRequest('oid');
    //sSearchUrl = window.Config.EDataCenterUrl + 'Commmap5.0/search.aspx?domain=' + window.Config.Domain + '&l=' + window.Config.Language + '&req=8&oid=' + iOwnerID + '&pagenum=1&pagesize=100&indexversion=6';
    //http: //edata.edushi.com/searchdata/SearchMapCompanyByOwner /hz/zh-chs/Format/Json/Search/1/100?q=7880
    sSearchUrl = window.Config.DataCetnerSearchDataUrl + 'SearchMapCompanyByOwner/' + window.Config.CityCode + '/' + window.Config.Language + '/Format/Json/Search/1/1000?q=' + iOwnerID;
    ENetwork.DownloadScript(sSearchUrl,function(){fnShowData();}); 
}
function reLoadPageSize()
{
    _PageSize = Math.floor((fnGetWindowHeight()-40)/28);
    if(_PageSize < 10)
    {
        _PageSize = 10;
    }
}
function fnShowData(o){
    if(typeof _Search =='undefined')
    {
        _Search = [];
    }
    reLoadPageSize();
    SortData = _Search.sort(function com(a, b) { return parseInt(b.MCI_Sort) - parseInt(a.MCI_Sort); });
    var t = '<div class="PjIncomeNav" id="TabContent" style=\"padding-top:10px;\">本建筑共收录<strong>{$count}</strong>家企业<a href="javascript:parent.fnEShopAndCompanyJoin(' + fnRequest('oid') + ',\'' + unescape(fnRequest('ocname')) + '\',' + fnRequest('x') + ',' + fnRequest('y') + ')"  title="企业入驻"><img src="/Images/ArchitBtn.gif" alt="企业入驻" class="PjIncomeImg" /></a><ul class="ShowList">{$Record}</ul><div class="Paginate">{$PageStr}</div></div>';
    var strRecord = '<li>{$No}.<a href="{$Url}" style="{$Style}" target="_blank" title="{$CompanyName}">{$CompanyName}</a>{$VipIcon}</li>';
    var strRecordTemp='';
    if (SortData.length > 0) {
        _Count = SortData.length;
        if(_Count%(_PageSize)==0){
            _PageCount=_Count/(_PageSize);
        }else{
            _PageCount=int(_Count,(_PageSize))+1;
        }
        var intBegin  = (_Page-1)*(_PageSize);
        var intEnd    = _Page*(_PageSize);
        if(intEnd>_Count){
            intEnd=_Count;
        }
        for(i=intBegin;i<intEnd;i++){
            var sUrl, sVipIcon;
            if (SortData[i].Vip * 1 > 0) {
                //sUrl = 'http://' + SortData[i].Eaddress + '.' + window.Config.Domain;
                sVipIcon = '<img src="/Images/VipMember.gif" />';
            }
            else {
                sVipIcon = '';
            }
            if (SortData[i].LST_ID == 1 && SortData[i].Vip * 1 > 0) {
                //sUrl = this.Config.DianUrl + 'vipstore/3/Index.aspx?StoreID=' + SortData[i].CompanyID;
                sUrl = this.Config.DianUrl + SortData[i].CompanyID + ".html";
            } else {
                sUrl = parent.parent.fnCreateUrl(SortData[i].CompanyID, '1');
            }

            strRecordTemp += strRecord.replaceAll('{$CompanyName}', SortData[i].OCName).replace('{$CompanyID}', SortData[i].CompanyID).replace('{$No}', (i + 1)).replace('{$Url}', sUrl).replace('{$VipIcon}', '');
        }
        var strPage=fnPager(5, _Page, _PageSize, _PageCount, 'window.fnShowByPage');
        t = t.replace('{$PageStr}',strPage);
    }else{
        t = t.replace('{$PageStr}','');
    }
    t = t.replace('{$Record}',strRecordTemp).replace('{$count}',_Count);
    document.body.innerHTML = t;
    $('TabContent').style.height = fnGetWindowHeight()-10+'px';  //初始化高度
}
function fnShowByPage(iPage){
    reLoadPageSize();
    if(iPage){
        _Page=iPage;
    }
    fnShowData();
}
function fnResize(h) {
    if (!h) {
        $('TabContent').style.height = (fnGetWindowHeight() - 10) + 'px';
    }
    else {
        $('TabContent').style.height = (h - 10) + 'px';
    }
}

function fnActive() {
    fnResize();
}