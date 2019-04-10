var _SearchType;    //搜索类型
var _Key;           //搜索关键字
var _Address;       //搜索地址

var _PrevElement = null;   //保存上次点击的div

var _Page = 1;
var _PageCount = 1;
var _RecordCount = 0;
var _PageSize = 5;

var _SearchData = {};

 var yudingUrl=""; //预订URL

var _Begin;
var _End;
window.onload = fnOnload;
window.onresize = function() {
    $('TabContent1').style.height = fnGetWindowHeight() - 5 + 'px';
};
function reLoadPageSize(iVouchAdLength) {
    _PageSize = Math.floor((fnGetWindowHeight() - 65 - 20 * iVouchAdLength) / 46);
    if (_PageSize < 5) {
        _PageSize = 5;
    }
}
function fnOnload() {
    if (!window.Config) {
        setTimeout('fnOnload()', 200);
        return;
    }
    $('divContent').innerHTML = window.Config.Loading;
    var sSearchType = fnRequest('type');
    _SearchType = sSearchType;
    var sKeyword1 = fnRequest('keyword1');
    _Key = unescape(sKeyword1);
    var sSearchUrl;
    switch (sSearchType) {
        case '0':        //模糊搜索  
            sSearchUrl = window.Config.EDataCenterUrl + 'Commmap5.0/search.aspx?domain=' + window.Config.Domain + '&l=' + window.Config.Language + '&req=1&kw=' + fnRequest('keyword1') + '&pagenum=1&pagesize=100';
            ENetwork.DownloadScript(sSearchUrl, function() { fnShowData(); });
            break;
        case '1':       //名称搜索
            sSearchUrl = window.Config.EDataCenterUrl + 'Commmap5.0/search.aspx?domain=' + window.Config.Domain + '&l=' + window.Config.Language + '&req=5&kw=' + fnRequest('keyword1') + '&pagenum=1&pagesize=100';
            ENetwork.DownloadScript(sSearchUrl, function() { fnShowData(); });
            break;
        case '2':       //地址搜索
            sSearchUrl = window.Config.EDataCenterUrl + 'Commmap5.0/search.aspx?domain=' + window.Config.Domain + '&l=' + window.Config.Language + '&req=6&kw=' + fnRequest('keyword1') + '&pagenum=1&pagesize=100';
            ENetwork.DownloadScript(sSearchUrl, function() { fnShowData(); });
            break;
        case '3':       //名称+地址
            _Key = unescape(fnRequest('keyword1'));
            _Address = unescape(fnRequest('keyword2'));
            sSearchUrl = window.Config.EDataCenterUrl + 'Commmap5.0/search.aspx?domain=' + window.Config.Domain + '&l=' + window.Config.Language + '&req=7&kw=' + fnRequest('keyword2') + '&address=' + fnRequest('keyword1') + '&pagenum=1&pagesize=100';
            ENetwork.DownloadScript(sSearchUrl, function() { fnShowData(); });
            break;
        case '4':
            _Key = unescape(fnRequest('keyword1'));
            sSearchUrl = window.Config.EDataCenterUrl + 'Commmap5.0/search.aspx?domain=' + window.Config.Domain + '&l=' + window.Config.Language + '&req=3&kw=' + fnRequest('keyword1') + '&x=' + fnRequest('x') + '&y=' + fnRequest('y') + '&len=' + fnRequest('len') + '&pagenum=1&pagesize=100';
            //ENetwork.DownloadScript(sSearchUrl, function() { fnShowData(); });
            ENetwork.DownloadScript(sSearchUrl, function() { fnShowData(); });
            break;
    }
}

//function  fnDataAg()
//{
//       if (typeof _Search == 'undefined') {
//        _Search = {};
//        _Search.SearchTable = [];
//    }
//    _SearchData = _Search;
//}
//显示搜索到的数据
function fnShowData() {
    if (typeof _Search == 'undefined') {
        _Search = {};
        _Search.SearchTable = [];
    }
    _SearchData = _Search;
    var sResult = '共有<strong>' + _Search.SearchTable.length + '项</strong>符合<strong>' + _Key + '</strong>的查询结果';
    $('divResult').innerHTML = sResult;
    var sLocalSearchHtml = '<table id="tbCommend" border="0" cellpadding="1" cellspacing="1" style="line-height:17px;"><!--_Tr--><tr><td style="width:15px;">'
                    + '<img src="' + window.Config.SkinPath + 'Images/button4.gif" /></td><th>{$Acontent}</th></tr><!--/_Tr--></table>'
                    + '<ul class="LocalList"><!--_Li--><li style="height:auto;"><div class="Number"><span>{$No}</span></div><div class="DetailCon"><div class="TitleNav" id="{$ImageID}"><span class="HeadLine"><a href="javascript:;" title="{$Title}" onclick="if(_PrevElement != null){_PrevElement.className=\'Number\';};this.parentNode.parentNode.parentNode.previousSibling.className=\'Number Currently\';_PrevElement=this.parentNode.parentNode.parentNode.previousSibling;parent.fnShowSearchPop({$oid},{$cid},{$lstid},{$X},{$Y})">{$Title}</a></span>{$IsVip} {$ydurl} </div><div class="Address">{$Address}</div></div>'
                    + '<div class="DottedLine"></div></li><!--/_Li--></ul><div class="Paginate">{$Page}</div>'
                    + '<!--{$RandomTopicList}-->';
    var TrHtml = fnReadSign('_Tr', sLocalSearchHtml);
    var LiHtml = fnReadSign('_Li', sLocalSearchHtml);

    var r = sLocalSearchHtml.replace(LiHtml, '{$Li}').replace(TrHtml, '{$Tr}');
    var s = '';
    var c = '';

    if (typeof _Search.VouchAd != 'undefined') {
        for (var i = 0; i < _Search.VouchAd.length; i++) {
            if (_Search.VouchAd[i].BAC_OPenType == '2') {
                c += TrHtml.replace('{$Acontent}', '<a  style="text-decoration:underline;font-weight:bold;color:red;font-size:12px;" href="javascript:parent.ShowCommendPopByContent(\'' + _Search.VouchAd[i].BAC_Title + '\',_Search.VouchAd[' + i + '].BAC_Content,' + _Search.VouchAd[i].BAC_LogincalX + ',' + _Search.VouchAd[i].BAC_LogincalY + ')">' + _Search.VouchAd[i].BAC_Title + '</a>');
            }
            else {
                c += TrHtml.replace("{$Acontent}", "<a style=\"color:#F60;\" href=\"http://{$LinkUrl}\" target=\"_blank\">{$Title}</a>").replace('{$Title}', _Search.VouchAd[i].BAC_Title).replace('{$LinkUrl}', _Search.VouchAd[i].BAC_LinkUrl.replace('http://', ''));
            }
        }
        reLoadPageSize(_Search.VouchAd.length); //根据是否有推荐关键字计算分页数
    }
    else {
        reLoadPageSize(0);
    }
    _RecordCount = _Search.SearchTable.length;
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
    
    var agAdStr;
    var webAgData = '';
    for (i = Begin; i < End; i++) {
        if (_SearchType == 0 || _SearchType == 4)   //模糊
        {

            var t = _Search.SearchTable[i].OCName;
            var sAddress = _Search.SearchTable[i].Address;
            var arrKeyword = _Key.split(' ');
            for (var n = 0; n < arrKeyword.length; n++) {
                t = t.replaceAll(arrKeyword[n], '<span style="color:#ff6400;">' + arrKeyword[n] + '</span>');
                sAddress = sAddress.replaceAll(arrKeyword[n], '<span style="color:#ff6400">' + arrKeyword[n] + '</span>');
            }
        }
        else if (_SearchType == 1) //名称
        {
            var t = _Search.SearchTable[i].OCName;
            var sAddress = _Search.SearchTable[i].Address;
            var arrKeyword = _Key.split(' ');
            for (var n = 0; n < arrKeyword.length; n++) {
                t = t.replaceAll(arrKeyword[n], '<span style="color:#ff6400;">' + arrKeyword[n] + '</span>');
            }
        }
        else if (_SearchType == 2)  //地址
        {
            var t = _Search.SearchTable[i].OCName;
            var sAddress = _Search.SearchTable[i].Address;
            var arrKeyword = _Key.split(' ');
            for (var n = 0; n < arrKeyword.length; n++) {
                sAddress = sAddress.replaceAll(arrKeyword[n], '<span style="color:#ff6400">' + arrKeyword[n] + '</span>');
            }
        }
        else if (_SearchType == 3)  //名称+地址
        {
            var t = _Search.SearchTable[i].OCName.replaceAll(_Address, '<span style="color:#ff6400;">' + _Address + '</span>');
            var sAddress = _Search.SearchTable[i].Address.replaceAll(_Key, '<span style="color:#ff6400;">' + _Key + '</span>');
        }

        
        var sTmpHtml = LiHtml.replace('{$No}', i + 1).replace('{$Title}', _Search.SearchTable[i].OCName).replace('{$Title}', t).replace('{$Address}', sAddress).replace('{$EID}', _Search.SearchTable[i].Eaddress).replace('{$ydurl}',yudingUrl).replace('{$AppDomain}', window.Config.Domain).replace('{$X}', _Search.SearchTable[i].X).replace('{$Y}', _Search.SearchTable[i].Y).replace('{$oid}', _Search.SearchTable[i].OwnerID).replace('{$cid}', _Search.SearchTable[i].CompanyID).replace('{$lstid}', _Search.SearchTable[i].LST_ID);
        
       sTmpHtml = sTmpHtml.replace('{$ImageID}','DivIsHotel'+i);   
       var tempName = _Search.SearchTable[i].OCName;
       var ownerID =  _Search.SearchTable[i].OwnerID;
       var companyID  =  _Search.SearchTable[i].CompanyID;
       if(tempName.indexOf('酒店')>=0 || tempName.indexOf('宾馆') >=0)
       {
        
          webAgData +=tempName+'|DivIsHotel'+i+'|'+ownerID+'|'+companyID+',';
       }
        
        if (_Search.SearchTable[i].Vip > 0) {
            sTmpHtml = sTmpHtml.replace('{$IsVip}', '<span class="IsVipIco"><a href="http://' + _Search.SearchTable[i].Eaddress + '.' + window.Config.Domain + '" target="_blank"><img src="' + window.Config.SkinPath + 'Images/VipMember.gif" border="0" /></a></span>');
        }
        else {
            sTmpHtml = sTmpHtml.replace('{$IsVip}', '');
        }
        s += sTmpHtml;
    }
    var strPage = fnPager(6, _Page, _PageSize, _PageCount, 'window.fnShowByPage');
    if (_SearchType == 3) {
        r = r.replace('{$Li}', s).replace('{$Tr}', c).replace('{$Count}', _RecordCount).replace('{$Key}', '在' + _Key + '找' + _Address).replace('{$Page}', strPage);
    }
    else {
        r = r.replace('{$Li}', s).replace('{$Tr}', c).replace('{$Count}', _RecordCount).replace('{$Key}', _Key).replace('{$Page}', strPage);
    }
    $('divContent').innerHTML = r;
    $('TabContent1').style.height = fnGetWindowHeight() - 5 + 'px';  //初始化高度 

    //老的广告
    //$('AD_script').src=this.Config.EDataCenterUrl+'Ad/ImageAd.aspx?domain='+this.Config.Domain+'&l='+this.Config.Language+'&req=SEARCHLIST&domid=Photo';

    parent.onSearchDataLoadComplete(_Search.SearchTable, Begin, End);
    
    if(webAgData!=null || webAgData.length>2)
    {
      webAgData =  webAgData.substring(0,webAgData.length-1);
      WebAgResult(webAgData);
    }
     
}
////////////////////////////////// tmm

function WebAgResult(agData)
{
   var sAgUrl = "http://"+this.Config.Domain+"/ExistHotel.aspx?HotleList="+escape( agData)+"&HotelAddre="+escape('')+"&CityCode="+ window.Config.CityCode+"&rnd=Math.random()*5+1";
   ENetwork.DownloadScript(sAgUrl, function() { fnShowAgData(); });
  
}
function fnShowAgData()
{
   if( ExistHotel!='false')
   {
      for(var i=0;i<ExistHotel.length;i++)
      {
         var imgId = ExistHotel[i].ImageID;
         var objImg = document.getElementById(imgId);

         if(objImg)
         {
           objImg.style.display='';
           objImg.style.cursor = 'hand';
           
           var HotelLink ="";
           
           if (ExistHotel[i].OwnerID!='0')
           {
               HotelLink = HotelDetailsLink(window.Config.Domain,ExistHotel[i].OwnerID,ExistHotel[i].HotelID,ExistHotel[i].SiteCode,window.Config.CityCode,'Owner'); 
           }
           else 
           {
              HotelLink = HotelDetailsLink(window.Config.Domain,ExistHotel[i].CompanyID,ExistHotel[i].HotelID,ExistHotel[i].SiteCode,window.Config.CityCode,'Company'); 
           }
           objImg.innerHTML += '<a  href="'+HotelLink+'" target="_blank"><img src="'+ window.Config.SkinPath + 'Images/OrderHotel.gif" border="0"   /></a>';
  
         }
      }
   }
}

function HotelDetailsLink (Domain,ID,HotelID,SiteCode,CityCode,type) {
             
            if (type =='Owner')
            {
              return 'http://'+Domain+'/yp/HotelOwner.aspx?id='+ID+'&SiteID='+HotelID+'&SiteCode='+SiteCode+'&CityCode='+CityCode+'';
            }
            else 
            {
              return 'http://'+Domain+'/yp/HotelCompany.aspx?id='+ID+'&SiteID='+HotelID+'&SiteCode='+SiteCode+'&CityCode='+CityCode+'';
            }
   };

////////////////////////////////////////////
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
}
function fnExit() {
    parent.onSearchDataLoadComplete(null, 0, 0);
}
