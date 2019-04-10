var _SearchType;    //搜索类型
var _Key;           //搜索关键字
var _Address;       //搜索地址

var _PrevElement = null;   //保存上次点击的div

var _Page = 1;
var _PageCount = 1;
var _RecordCount = 0;
var _PageSize = 5;

var _SearchData = {};
var _Begin;
var _End;
window.onload=fnOnload;
function reLoadPageSize(iVouchAdLength)
{
    _PageSize = Math.floor((fnGetWindowHeight()-65-20*iVouchAdLength)/50);
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
    $('TabContent').innerHTML = window.Config.Loading;
    var sSearchType = fnRequest('type');
    _SearchType = sSearchType;
    var sKeyword1 = fnRequest('keyword1');
    _Key = unescape(sKeyword1);
    var sSearchUrl;
    switch (sSearchType)
    {        
        case '0':        //模糊搜索  
            sSearchUrl = window.Config.EDataCenterUrl + 'Commmap5.0/search.aspx?domain='+window.Config.Domain+'&l='+window.Config.Language+'&req=1&kw='+fnRequest('keyword1')+'&pagenum=1&pagesize=100';
            ENetwork.DownloadScript(sSearchUrl,function(){fnShowData();});
            break;
        case '1':       //名称搜索
            sSearchUrl = window.Config.EDataCenterUrl + 'Commmap5.0/search.aspx?domain='+window.Config.Domain+'&l='+window.Config.Language+'&req=5&kw='+fnRequest('keyword1')+'&pagenum=1&pagesize=100';
            ENetwork.DownloadScript(sSearchUrl,function(){fnShowData();});        
            break;
        case '2':       //地址搜索
            sSearchUrl = window.Config.EDataCenterUrl + 'Commmap5.0/search.aspx?domain='+window.Config.Domain+'&l='+window.Config.Language+'&req=6&kw='+fnRequest('keyword1')+'&pagenum=1&pagesize=100';
            ENetwork.DownloadScript(sSearchUrl,function(){fnShowData();});        
            break;
        case '3':       //名称+地址
            _Key = unescape(fnRequest('keyword1'));
            _Address = unescape(fnRequest('keyword2'));
            sSearchUrl = window.Config.EDataCenterUrl + 'Commmap5.0/search.aspx?domain='+window.Config.Domain+'&l='+window.Config.Language+'&req=7&kw='+fnRequest('keyword2')+'&address='+fnRequest('keyword1')+'&pagenum=1&pagesize=100';
            ENetwork.DownloadScript(sSearchUrl,function(){fnShowData();});  
            break;
        case '4':
            _Key = unescape(fnRequest('keyword1'));
            sSearchUrl = window.Config.EDataCenterUrl + 'Commmap5.0/search.aspx?domain='+window.Config.Domain+'&l='+window.Config.Language+'&req=3&kw='+fnRequest('keyword1')+'&x='+fnRequest('x')+'&y='+fnRequest('y')+'&len='+fnRequest('len')+'&pagenum=1&pagesize=100';
            ENetwork.DownloadScript(sSearchUrl,function(){fnShowData();});  
            break;                  
    }
}
//显示搜索到的数据
function fnShowData()
{
    if(typeof _Search =='undefined')
    {
        _Search = {};
        _Search.SearchTable = [];
    }
    _SearchData = _Search;
    var sLocalSearchHtml = '共有<strong>{$Count}项</strong>符合<strong>{$Key}</strong>的查询结果'
                    +'<table id="tbCommend" border="0" cellpadding="1" cellspacing="1" style="line-height:17px;"><!--_Tr--><tr><td style="width:15px;">'
                    +'<img src="'+window.Config.SkinPath+'Images/button4.gif" /></td><th>{$Acontent}</th></tr><!--/_Tr--></table>'
                    +'<ul class="LocalList"><!--_Li--><li style="height:auto;"><div class="Number"><span>{$No}</span></div><div class="DetailCon"><div class="TitleNav"><span class="HeadLine"><a href="javascript:;" title="{$Title}" onclick="if(_PrevElement != null){_PrevElement.className=\'Number\';};this.parentNode.parentNode.parentNode.previousSibling.className=\'Number Currently\';_PrevElement=this.parentNode.parentNode.parentNode.previousSibling;parent.fnShowSearchPop({$oid},{$cid},{$lstid},{$X},{$Y})">{$Title}</a></span>{$IsVip}</div><div class="Address">{$Address}</div></div>'
                    +'<div class="DottedLine"></div></li><!--/_Li--></ul><div class="Paginate">{$Page}</div>'
                    +'<!--{$RandomTopicList}-->';
    var TrHtml=fnReadSign('_Tr',sLocalSearchHtml);
    var LiHtml=fnReadSign('_Li',sLocalSearchHtml);
        
    var r=sLocalSearchHtml.replace(LiHtml,'{$Li}').replace(TrHtml,'{$Tr}'); 
    var s='';
    var c='';  
    
    if(typeof _Search.VouchAd != 'undefined')
    {
        for(var i=0;i<_Search.VouchAd.length;i++)
        {
            if(_Search.VouchAd[i].BAC_OPenType=='2')
            {
                c+=TrHtml.replace('{$Acontent}','<a  style="text-decoration:underline;font-weight:bold;color:red;font-size:12px;" href="javascript:parent.ShowCommendPopByContent(\''+_Search.VouchAd[i].BAC_Title+'\',_Search.VouchAd['+i+'].BAC_Content,'+_Search.VouchAd[i].BAC_LogincalX+','+_Search.VouchAd[i].BAC_LogincalY+')">'+_Search.VouchAd[i].BAC_Title+'</a>');
            }
            else
            {
                c+=TrHtml.replace("{$Acontent}","<a style=\"color:#F60;\" href=\"http://{$LinkUrl}\" target=\"_blank\">{$Title}</a>").replace('{$Title}',_Search.VouchAd[i].BAC_Title).replace('{$LinkUrl}',_Search.VouchAd[i].BAC_LinkUrl.replace('http://',''));
            }
        }
        reLoadPageSize(_Search.VouchAd.length); //根据是否有推荐关键字计算分页数
    }
    else
    {
        reLoadPageSize(0);
    }
    _RecordCount=_Search.SearchTable.length; 
    if((_RecordCount%_PageSize)==0)
    {
        _PageCount=_RecordCount/(_PageSize);
    }
    else
    {
        _PageCount=int(_RecordCount,_PageSize)+1;
    }
    var Begin  = (_Page-1)*(_PageSize);
    var End    = _Page*_PageSize;
    if(End>_RecordCount)End=_RecordCount;
    _Begin = Begin;
    _End = End;
    for(i=Begin;i<End;i++){
        if (_SearchType == 0 || _SearchType == 4)   //模糊
        {           
            
            var t=_Search.SearchTable[i].OCName;
            var sAddress = _Search.SearchTable[i].Address;
            var arrKeyword = _Key.split(' ');
            for (var n=0; n<arrKeyword.length; n++)
            {
                t=t.replaceAll(arrKeyword[n],'<span style="color:#ff6400;">'+arrKeyword[n]+'</span>');
                sAddress = sAddress.replaceAll(arrKeyword[n],'<span style="color:#ff6400">'+arrKeyword[n]+'</span>');
            }        
        }
        else if (_SearchType == 1) //名称
        {
            var t = _Search.SearchTable[i].OCName;
            var sAddress = _Search.SearchTable[i].Address;
            var arrKeyword = _Key.split(' ');
            for (var n=0; n<arrKeyword.length; n++)
            {
                t=t.replaceAll(arrKeyword[n],'<span style="color:#ff6400;">'+arrKeyword[n]+'</span>');
            }            
        }
        else if (_SearchType == 2)  //地址
        {
            var t=_Search.SearchTable[i].OCName;
            var sAddress = _Search.SearchTable[i].Address;  
            var arrKeyword = _Key.split(' ');
            for (var n=0; n<arrKeyword.length; n++)
            {
                sAddress = sAddress.replaceAll(arrKeyword[n],'<span style="color:#ff6400">'+arrKeyword[n]+'</span>');
            }          
        }
        else if(_SearchType == 3)  //名称+地址
        {            
            var t=_Search.SearchTable[i].OCName.replaceAll(_Address,'<span style="color:#ff6400;">'+_Address+'</span>');
            var sAddress = _Search.SearchTable[i].Address.replaceAll(_Key,'<span style="color:#ff6400;">'+_Key+'</span>');
        }
        var sTmpHtml = LiHtml.replace('{$No}',i+1).replace('{$Title}',_Search.SearchTable[i].OCName).replace('{$Title}',t).replace('{$Address}',sAddress).replace('{$EID}',_Search.SearchTable[i].Eaddress).replace('{$AppDomain}',window.Config.Domain).replace('{$X}',_Search.SearchTable[i].X).replace('{$Y}',_Search.SearchTable[i].Y).replace('{$oid}',_Search.SearchTable[i].OwnerID).replace('{$cid}',_Search.SearchTable[i].CompanyID).replace('{$lstid}',_Search.SearchTable[i].LST_ID);
        if (_Search.SearchTable[i].Vip > 0)
        {
            sTmpHtml = sTmpHtml.replace('{$IsVip}', '<span class="IsVipIco"><a href="http://' + _Search.SearchTable[i].Eaddress + '.' + window.Config.Domain + '" target="_blank"><img src="' + window.Config.SkinPath + 'Images/VipMember.gif" border="0" /></a></span>');
        }
        else
        {
            sTmpHtml = sTmpHtml.replace('{$IsVip}', '');
        }
        s+=sTmpHtml;
    }
    var strPage=fnPager(6, _Page, _PageSize, _PageCount, 'window.fnShowByPage');
    if(_SearchType == 3)
    {
        r=r.replace('{$Li}',s).replace('{$Tr}',c).replace('{$Count}',_RecordCount).replace('{$Key}','在'+_Key+'找'+_Address).replace('{$Page}',strPage);
    }
    else
    {
        r=r.replace('{$Li}',s).replace('{$Tr}',c).replace('{$Count}',_RecordCount).replace('{$Key}',_Key).replace('{$Page}',strPage);
    }
    $('TabContent').innerHTML = r;
    $('TabContent').style.height = fnGetWindowHeight() - 5 + 'px';  //初始化高度 
    
    parent.onSearchDataLoadComplete(_Search.SearchTable,Begin,End);
}

function fnShowByPage(iPage)
{
    if(iPage)
    {
        _Page = iPage;
    }
    fnShowData();
}

function fnActive(){
    if(typeof  _SearchData.SearchTable!= 'undefined' && _SearchData.SearchTable.length > 0)
    {
        parent.onSearchDataLoadComplete(_SearchData.SearchTable,_Begin,_End);
    }
    else
    {
        parent.onSearchDataLoadComplete(null,0,0);
    }
}
function fnExit()
{
    parent.onSearchDataLoadComplete(null,0,0);
}
