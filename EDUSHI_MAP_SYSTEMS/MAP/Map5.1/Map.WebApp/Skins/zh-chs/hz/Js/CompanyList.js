﻿_Page=1;
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
    var t='<div class="PjIncomeNav" id="TabContent">本建筑共收录<strong>{$count}</strong>家企业<a href="http://' + window.Config.Domain + '/LiveIn/Default.aspx?OwnerID=' + fnRequest('oid') + '&OwnerName=' + fnRequest('ocname') + '" target="_blank" title="企业入驻"><img src="../Images/ArchitBtn.gif" alt="企业入驻" class="PjIncomeImg" /></a><ul class="ShowList">{$Record}</ul><div class="Paginate">{$PageStr}</div></div>';                 
    var strRecord='<li style="height:auto">&nbsp;{$No}.&nbsp;<a href="{$Url}" style="{$Style}" target="_blank" title="{$CompanyName}">{$CompanyName}{$VipIcon}</a></li>';
    var strVipRecord = '<li style="height:auto"><a href="{$Domain}" style="{$Style}" target="_blank" title="{$CompanyName}">{$CompanyName}</a><a href="{$Domain}" target="_blank"><img src="' + window.Config._ImgPath + 'VipMember.gif" width="18" style="margin-left:5px; margin-bottom:-5px;border:none;" height="20" /></a></li>';
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
            var sUrl,sVipIcon;
            if (_Search.SearchTable[i].LST_ID*1 > 0 && _Search.SearchTable[i].Vip*1 > 0)
            {
                sUrl = window.Config.BendiUrl + 'VipStore/' + _Search.SearchTable[i].LST_ID + '/Index.aspx?City=' + window.Config.CityCode + '&StoreID=' + _Search.SearchTable[i].CompanyID;
                sVipIcon = '<img src="' + window.Config.SkinPath + 'Images/Edian.gif" alt="E店" style="margin:0 0 -7px 3px; border:none" />';
            }
            else
            {
                sUrl = window.Config.BendiUrl +window.Config.CityCode +'/Shop/' + _Search.SearchTable[i].CompanyID + '.shtml';
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
