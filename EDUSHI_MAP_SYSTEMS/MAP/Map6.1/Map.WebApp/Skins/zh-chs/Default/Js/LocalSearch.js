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
var HasLoadAd = false;
window.onload=fnOnload;
var webAgData = '';
var WebHotelNames= ''; 

function reLoadPageSize(iVouchAdLength)
{
    _PageSize = Math.floor((fnGetWindowHeight()-65-28-20*iVouchAdLength)/50);
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
    $('divContent').innerHTML = window.Config.Loading;
    var sSearchType = fnRequest('type');
    _SearchType = sSearchType;
    var sKeyword1 = fnRequest('keyword1');
    _Key = unescape(sKeyword1);
    var sSearchUrl = '';
    switch (sSearchType)
    {        
        case '0':        //模糊搜索  
            sSearchUrl = window.Config.EDataCenterUrl + 'Commmap5.0/search.aspx?domain='+window.Config.Domain+'&l='+window.Config.Language+'&req=1&kw='+fnRequest('keyword1')+'&pagenum=1&pagesize=100&indexversion=6';
            break;
        case '1':       //名称搜索
            sSearchUrl = window.Config.EDataCenterUrl + 'Commmap5.0/search.aspx?domain='+window.Config.Domain+'&l='+window.Config.Language+'&req=5&kw='+fnRequest('keyword1')+'&pagenum=1&pagesize=100&indexversion=6';      
            break;
        case '2':       //地址搜索
            sSearchUrl = window.Config.EDataCenterUrl + 'Commmap5.0/search.aspx?domain='+window.Config.Domain+'&l='+window.Config.Language+'&req=6&kw='+fnRequest('keyword1')+'&pagenum=1&pagesize=100&indexversion=6';     
            break;
        case '3':       //名称+地址
            _Key = unescape(fnRequest('keyword1'));
            _Address = unescape(fnRequest('keyword2'));
            sSearchUrl = window.Config.EDataCenterUrl + 'Commmap5.0/search.aspx?domain='+window.Config.Domain+'&l='+window.Config.Language+'&req=7&kw='+fnRequest('keyword2')+'&address='+fnRequest('keyword1')+'&pagenum=1&pagesize=100&indexversion=6';
            break;
        case '4':
            _Key = unescape(fnRequest('keyword1'));
            sSearchUrl = window.Config.EDataCenterUrl + 'Commmap5.0/search.aspx?domain=' + window.Config.Domain + '&l=' + window.Config.Language + '&req=3&kw=' + fnRequest('keyword1') + '&x=' + fnRequest('x') + '&y=' + fnRequest('y') + '&len=' + fnRequest('len') + '&pagenum=1&pagesize=100&indexversion=6';
            break;
        case '9':
            sSearchUrl = window.Config.EDataCenterUrl + 'Commmap5.0/search.aspx?domain='+window.Config.Domain+'&l='+window.Config.Language+'&req=9&kw='+fnRequest('keyword1')+'&pagenum=1&pagesize=100&indexversion=6';
    }
    if (sSearchUrl != '') {
        ENetwork.DownloadScript(sSearchUrl,function(){fnShowData();});
    }
}
//显示搜索到的数据
function fnShowData() {
    if (typeof _Search == 'undefined') {
        _Search = {};
        _Search.SearchTable = [];
    }
    _SearchData = _Search;
    var sLocalSearchHtml = '';
    if (_Search.SearchTable.length > 0) {
        if (_SearchType == 3) {
            $('divResult').innerHTML = '<div class="Sea3DTil">共有<strong>' + _Search.SearchTable.length + '项</strong>符合<strong>在' + _Key + '找' + _Address+'</strong>的查询结果</div>';
        }
        else {
            $('divResult').innerHTML = '<div class="Sea3DTil">共有<strong>' + _Search.SearchTable.length + '项</strong>符合<strong>' + _Key + '</strong>的查询结果</div>';
        }
        sLocalSearchHtml = '<table id="tbCommend" border="0" cellpadding="1" cellspacing="1" style="line-height:17px;"><!--_Tr--><tr><td style="width:15px;">'
                    + '<img src="/Images/button4.gif" /></td><th>{$Acontent}</th></tr><!--/_Tr--></table>'
                    + '<ul class="LocalList"><!--_Li--><li style="height:auto;"><div class="Number"><span>{$No}</span></div><div class="DetailCon"><div class="TitleNav" id="{$ImageID}"><span class="HeadLine {$Class}"><a href="javascript:;" title="{$Title}" onclick="if(_PrevElement != null){_PrevElement.className=\'Number\';};this.parentNode.parentNode.parentNode.previousSibling.className=\'Number Currently\';_PrevElement=this.parentNode.parentNode.parentNode.previousSibling;parent.fnShowSearchPop({$oid},{$cid},{$lstid},{$X},{$Y},{$DataType},\'{$Name}\',\'{$Address}\',\'{$Telephone}\')">{$Title}</a></span>{$IsVip}</div><div class="Address">{$Address}</div></div>'
                    + '<div class="DottedLine"></div></li><!--/_Li--></ul><div class="Paginate">{$Page}</div>';
    }
    else {
        if (_SearchType == 3) {
            $('divResult').innerHTML = '<div class="NoResult">很抱歉，没有找到与"<strong>在' + _Key + '找' + _Address + '</strong>"相匹配的信息。</div>';
            $('divContent').innerHTML = '<div class="Search2D">您可以选择在<a href="javascript:;" onclick="parent.fnGoogleSearch(\'' + _Key + ' ' + _Address + '\')">更大面积范围</a>的地图内搜索您要的结果</div>';
        }
        else {
            $('divResult').innerHTML = '<div class="NoResult">很抱歉，没有找到与"<strong>' + _Key + '</strong>"相匹配的信息。</div>';
            $('divContent').innerHTML = '<div class="Search2D">您可以选择在<a href="javascript:;" onclick="parent.fnGoogleSearch(\'' + _Key + '\')">更大面积范围</a>的地图内搜索您要的结果</div>';
        }
       
        fnResize();
        return;
    }
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
    for (i = Begin; i < End; i++) {
        if (_SearchType == 0 || _SearchType == 4) {//模糊
            var t = _Search.SearchTable[i].OCName;
            var sAddress = _Search.SearchTable[i].Address;
            var arrKeyword = _Key.split(' ');
            for (var n = 0; n < arrKeyword.length; n++) {
                t = t.replaceAll(arrKeyword[n], '<span style="color:#ff6400;">' + arrKeyword[n] + '</span>');
                sAddress = sAddress.replaceAll(arrKeyword[n], '<span style="color:#ff6400">' + arrKeyword[n] + '</span>');
            }
        }
        else if (_SearchType == 1 || _SearchType == 9) {//名称
            var t = _Search.SearchTable[i].OCName;
            var sAddress = _Search.SearchTable[i].Address;
            var arrKeyword = _Key.split(' ');
            for (var n = 0; n < arrKeyword.length; n++) {
                t = t.replaceAll(arrKeyword[n], '<span style="color:#ff6400;">' + arrKeyword[n] + '</span>');
            }
        }
        else if (_SearchType == 2) {//地址
            var t = _Search.SearchTable[i].OCName;
            var sAddress = _Search.SearchTable[i].Address;
            var arrKeyword = _Key.split(' ');
            for (var n = 0; n < arrKeyword.length; n++) {
                sAddress = sAddress.replaceAll(arrKeyword[n], '<span style="color:#ff6400">' + arrKeyword[n] + '</span>');
            }
        }
        else if (_SearchType == 3) {//名称+地址
            var t = _Search.SearchTable[i].OCName.replaceAll(_Address, '<span style="color:#ff6400;">' + _Address + '</span>');
            var sAddress = _Search.SearchTable[i].Address.replaceAll(_Key, '<span style="color:#ff6400;">' + _Key + '</span>');
        }
        var sTmpHtml = '';
        if (_Search.SearchTable[i].RecordType == 1 || _Search.SearchTable[i].RecordType == 2 || _Search.SearchTable[i].RecordType == 4) {
            sTmpHtml = LiHtml.replace('{$No}', i + 1).replace('{$Title}', _Search.SearchTable[i].OCName).replace('{$Title}', t).replace('{$EID}', _Search.SearchTable[i].Eaddress).replace('{$AppDomain}', window.Config.Domain).replace('{$X}', _Search.SearchTable[i].X).replace('{$Y}', _Search.SearchTable[i].Y).replace('{$oid}', _Search.SearchTable[i].OwnerID).replace('{$cid}', _Search.SearchTable[i].CompanyID).replace('{$lstid}', _Search.SearchTable[i].LST_ID).replace('{$DataType}', _Search.SearchTable[i].RecordType).replace('{$Name}', _Search.SearchTable[i].OCName).replace('{$Address}', _Search.SearchTable[i].Address).replace('{$Telephone}', _Search.SearchTable[i].Telephone).replace('{$Address}', sAddress).replace('{$Class}', 'SanWei');
            
               var tempName = _Search.SearchTable[i].OCName;
               var ownerID =  _Search.SearchTable[i].OwnerID;
               var companyID  =  _Search.SearchTable[i].CompanyID;
               if(tempName.indexOf('酒店')>=0 || tempName.indexOf('宾馆') >=0 ||tempName.indexOf('饭店') >=0)
               {
                
                  webAgData +=tempName+'|DivIsHotel'+i+'|'+ownerID+'|'+companyID+',';
                  WebHotelNames += tempName+',';
               }
               
        }
        else {
            sTmpHtml = LiHtml.replace('{$No}', i + 1).replace('{$Title}', _Search.SearchTable[i].OCName).replace('{$Title}', t).replace('{$EID}', _Search.SearchTable[i].Eaddress).replace('{$AppDomain}', window.Config.Domain).replace('{$X}', _Search.SearchTable[i].Lx).replace('{$Y}', _Search.SearchTable[i].Ly).replace('{$oid}', _Search.SearchTable[i].OwnerID).replace('{$cid}', _Search.SearchTable[i].CompanyID).replace('{$lstid}', _Search.SearchTable[i].LST_ID).replace('{$DataType}', _Search.SearchTable[i].RecordType).replace('{$Name}', _Search.SearchTable[i].OCName).replace('{$Address}', _Search.SearchTable[i].Address).replace('{$Telephone}', _Search.SearchTable[i].Telephone).replace('{$Address}', sAddress).replace('{$Class}', 'ErWei');
        }
//        //E店图片链接
//        if (_Search.SearchTable[i].LST_ID * 1 == 1) {
//            if (_Search.SearchTable[i].Vip * 1 > 1) {
//                sTmpHtml = sTmpHtml.replace('{$IsVip}', '<span class="IsVipIco"><a href="http://' + _Search.SearchTable[i].Eaddress + '.' + window.Config.Domain + '" target="_blank"><img src="/Images/VipEdian.gif" border="0" alt="Vip E店" /></a></span>');
//            }
//            else if(_Search.SearchTable[i].Vip * 1 > 0){
//                sTmpHtml = sTmpHtml.replace('{$IsVip}', '<span class="IsVipIco"><a href="http://' + _Search.SearchTable[i].Eaddress + '.' + window.Config.Domain + '" target="_blank"><img src="/Images/Edian.gif" border="0" alt="E店" /></a></span>');
//            }
//        }
//        //商务地图图标
//        if (_Search.SearchTable[i].LST_ID * 1 == 2) {
//            var sUrl = window.Config.DianUrl + 'VipStore/' + _Search.SearchTable[i].LST_ID + '/Index.aspx?StoreID=' + _Search.SearchTable[i].CompanyID;
//            sTmpHtml = sTmpHtml.replace('{$IsVip}', '<span class="IsVipIco"><a href="' + _sUrl + '" target="_blank"><img src="/Images/ComMapIco1.gif" alt="商务地图" border="0" /></a></span>');
//        }
  //杭州添加E店链接及图标
        var sUrl = '', sVipIcon = '';
        if (_Search.SearchTable[i].LST_ID * 1 > 0) {
            if (_Search.SearchTable[i].Domain != '') {
                sUrl = 'http://' + _Search.SearchTable[i].Domain + '.' + window.Config.Domain;
            }
            else {
               
                if (_Search.SearchTable[i].LST_ID* 1==1&& _Search.SearchTable[i].Vip *1==3)
                {
                sUrl = window.Config.DianUrl + 'VipStore/3/Index.aspx?StoreID=' + _Search.SearchTable[i].CompanyID;
                }
                else 
                {
                 sUrl = window.Config.DianUrl + 'VipStore/' + _Search.SearchTable[i].LST_ID + '/Index.aspx?StoreID=' + _Search.SearchTable[i].CompanyID;
                 
                }
            }
        }
        else {
            sUrl = window.Config.HuangyeUrl + 'ShopView.aspx?id=' + _Search.SearchTable[i].CompanyID;
        }
        if (_Search.SearchTable[i].LST_ID * 1 == 2) {
            sVipIcon = '<a href="' + sUrl + '" target="_blank"><img src="/Images/ComMapIco1.gif" alt="商务地图" /></a>';
        }
        if (_Search.SearchTable[i].LST_ID * 1 == 1) {
            if (_Search.SearchTable[i].Vip * 1 > 1) {
                sVipIcon = '<a href="' + sUrl + '" target="_blank"><img src="/Images/VipEdian.gif" alt="Vip E店" /></a>';
            }
            else if (_Search.SearchTable[i].Vip * 1 > 0) {
                sVipIcon = '<a href="' + sUrl + '" target="_blank"><img src="/Images/Edian.gif" alt="E店" /></a>';
            }
        }
        var sJuanIcon = '';
        if (_Search.SearchTable[i].LV_ID * 1 > 0) {
            sJuanIcon = '<img src="../images/Juan.gif" alt="免费下载本店优惠券" />';
        }
        var sCuIcon = '';
        if (_Search.SearchTable[i].LT_ID * 1 > 0) {
            sCuIcon = '<img src="../images/Cu.gif"alt="本店正在促销打折" />';
        }
        var sYingIcon = '';
        if (_Search.SearchTable[i].LCE_ShopCard * 1 > 0) {
            sYingIcon = '<img src="../images/Ying.gif" alt="本店已通过营业执照认证" />';
        }
        sTmpHtml = sTmpHtml.replace('{$IsVip}', '<span class="IsVipIco">' + sVipIcon + sYingIcon + sJuanIcon + '&nbsp;' + sCuIcon + '</span>');           
       sTmpHtml = sTmpHtml.replace('{$ImageID}','DivIsHotel'+i);   
       s += sTmpHtml;  
   }
    var strPage = fnPager(6, _Page, _PageSize, _PageCount, 'window.fnShowByPage');
    r = r.replace('{$Li}', s).replace('{$Tr}', c).replace('{$Page}', strPage);
    if (_SearchType == 3) {
        r += '<div class="Search2D">您可以在<a href="javascript:;" onclick="parent.fnGoogleSearch(\'' + _Key + ' ' + _Address + '\')">更大面积范围</a>的地图内搜索您要的结果</div>';
    }
    else {
        r += '<div class="Search2D">您可以在<a href="javascript:;" onclick="parent.fnGoogleSearch(\'' + _Key + '\')">更大面积范围</a>的地图内搜索您要的结果</div>';
    }
    $('divContent').innerHTML = r;
    fnResize();
    parent.onSearchDataLoadComplete(_Search.SearchTable, Begin, End);
    
    
   if(webAgData!=null || webAgData.length>2)
    {
      webAgData =  webAgData.substring(0,webAgData.length-1);
      WebHotelNames= WebHotelNames.substring(0,WebHotelNames.length-1);
      WebAgResult(WebHotelNames);
    }
}


////////////////////////////////// tmm
var ExistHotel = null;
function WebAgResult(agData)
{ 
   ExistHotel = null;
   var sAgUrl = "http://"+this.Config.Domain+"/ExistHotel.aspx?HotelList="+escape(agData)+"&CityCode="+ window.Config.CityCode+"&rnd=Math.random()*5";
   ENetwork.DownloadScript(sAgUrl, function() { fnShowAgData(); });

}
function fnShowAgData()
{
    if (ExistHotel !=null)
    {
        var  HotelNames = ExistHotel;
        var AgDataList= webAgData.split(',');
        if(HotelNames.length==AgDataList.length)
        {
           for(var i=0;i<AgDataList.length;i++)
           {
              if(HotelNames[i]=='1')
              {
                 var OneAgData = AgDataList[i].split('|');
                 ViewHotelImg(OneAgData[0],OneAgData[1],OneAgData[2],OneAgData[3]);
               }
            }
         }

      }

 webAgData = '';
 WebHotelNames= ''; 
}

function ViewHotelImg (HotelName,divID,OwnerID,CompanyID)
{
    var objImg =  document.getElementById(divID);
    
  //  var HotelID= divID.replace('DivIsHotel','');
    
    if (objImg)
    {
           objImg.style.display='';
           objImg.style.cursor = 'hand';
           
             var HotelLink ="";
           
           if (OwnerID!='0')
           {
               HotelLink = HotelDetailsLink(window.Config.Domain,OwnerID,HotelName,'Owner'); 
           }
           else 
           {
              HotelLink = HotelDetailsLink(window.Config.Domain,CompanyID,HotelName,'Company'); 
           }
           
           var objImgValue = objImg.innerHTML;
           
           if (objImgValue.indexOf('OrderHotel.gif')<=0)
           {
             objImg.innerHTML += '<a  href="'+HotelLink+'" target="_blank"><img src="/Skins/zh-chs/Default/Images/OrderHotel.gif" border="0"   /></a>';
           }

    } 
    
 
}

function HotelDetailsLink (Domain,ID,HotelName,type) {
             
            if (type =='Owner')
            {
              return 'http://'+Domain+'/yp/HotelOwner.aspx?id='+ID+'';
            }
            else 
            {
              return 'http://'+Domain+'/yp/HotelCompany.aspx?id='+ID+'';
            }
   };

////////////////////////////////////////////
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
    parent.onSearchDataLoadComplete(null, 0, 0);
    parent._RoadLineLayer.innerHTML = '';
    parent._RoadCoords = [];
}
//初始化高度
function fnResize() {
    $('TabContent').style.height = fnGetWindowHeight() - 5 + 'px';
}
