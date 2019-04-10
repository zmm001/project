_Page=1;
_Count=0;
_PageSize=13;
_PageCount=1;
_Owner='';
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
    sSearchUrl = window.Config.EDataCenterUrl + 'Commmap5.0/search.aspx?domain='+window.Config.Domain+'&l='+window.Config.Language+'&req=8&oid='+iOwnerID+'&pagenum=1&pagesize=100'; 
    ENetwork.DownloadScript(sSearchUrl,function(){fnShowData();}); 
}
function reLoadPageSize()
{
    _PageSize = Math.floor((fnGetWindowHeight()-40)/28);
    if(_PageSize < 13)
    {
        _PageSize = 13;
    }
}
function fnShowData(o){
    if(typeof _Search =='undefined')
    {
        _Search = {};
        _Search.SearchTable = [];
    }
    reLoadPageSize();
    var t='<div class="PjIncomeNav" id="TabContent">本建筑共收录<strong>{$count}</strong>家企业<a href="javascript:parent.fnEShopAndCompanyJoin('+fnRequest('oid') + ',\'' + unescape(fnRequest('ocname')) + '\')"  title="企业入驻"><img src="/Images/ArchitBtn.gif" alt="企业入驻" class="PjIncomeImg" /></a><ul class="ShowList">{$Record}</ul><div class="Paginate">{$PageStr}</div></div>';                 
    var strRecord='<li>{$No}.<a href="{$Url}" style="{$Style}" target="_blank" title="{$CompanyName}">{$CompanyName}</a>{$VipIcon}</li>';
    var strVipRecord = '<li><a href="{$Domain}" style="{$Style}" target="_blank" title="{$CompanyName}">{$CompanyName}</a><a href="{$Domain}" target="_blank"><img src="' + window.Config._ImgPath + 'VipMember.gif" /></a></li>';
    var strRecordTemp='';
    if(_Search.SearchTable.length > 0){
        _Count=_Search.SearchTable.length;
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
            //杭州添加E店链接及图标
            var sUrl, sVipIcon;
            if(_Search.SearchTable[i].LST_ID*1 == 2) {
                sUrl = window.Config.DianUrl + 'VipStore/' + _Search.SearchTable[i].LST_ID + '/Index.aspx?StoreID=' + _Search.SearchTable[i].CompanyID;
                sVipIcon = '<img src="/Images/ComMapIco1.gif" alt="商务地图" />';
            }
            else if (_Search.SearchTable[i].LST_ID*1 == 1 && _Search.SearchTable[i].Vip*1 > 1)
            {
                sUrl = window.Config.DianUrl + 'VipStore/' + _Search.SearchTable[i].LST_ID + '/Index.aspx?StoreID=' + _Search.SearchTable[i].CompanyID;
                sVipIcon = '<img src="/Images/VipEdian.gif" alt="Vip E店" />';
            }
            else if (_Search.SearchTable[i].LST_ID*1 == 1 && _Search.SearchTable[i].Vip*1 > 0)
            {
                sUrl = window.Config.DianUrl + 'VipStore/' + _Search.SearchTable[i].LST_ID + '/Index.aspx?StoreID=' + _Search.SearchTable[i].CompanyID;
                sVipIcon = '<img src="/Images/Edian.gif" alt="E店" />';
            }
            else
            {
                sUrl = window.Config.HuangyeUrl + 'ShopView.aspx?id=' + _Search.SearchTable[i].CompanyID;
                sVipIcon = '';
            }
            
            strRecordTemp +=strRecord.replaceAll('{$CompanyName}',_Search.SearchTable[i].OCName).replace('{$CompanyID}',_Search.SearchTable[i].CompanyID).replace('{$No}', (i+1)).replace('{$Url}', sUrl).replace('{$VipIcon}', sVipIcon);
        }
        var strPage=fnPager(6, _Page, _PageSize, _PageCount, 'window.fnShowByPage');
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
