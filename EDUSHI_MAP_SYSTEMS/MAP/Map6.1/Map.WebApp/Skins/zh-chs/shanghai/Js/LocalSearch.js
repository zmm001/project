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
var discount ='';//打折信息
var discountdata='';

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
           
          if(tempName.indexOf('酒店')>=0 || tempName.indexOf('宾馆')>=0|| tempName.indexOf('饭店') >=0)
           {            
            webAgData +=tempName+'|DivIsHotel'+i+'|'+ownerID+'|'+companyID+',';
             WebHotelNames += tempName+',';
           }
          discount += tempName+',';
          discountdata += tempName+'|DivIsHotel'+i+'|'+ownerID+'|'+companyID+',';

        }
        else {
            sTmpHtml = LiHtml.replace('{$No}', i + 1).replace('{$Title}', _Search.SearchTable[i].OCName).replace('{$Title}', t).replace('{$EID}', _Search.SearchTable[i].Eaddress).replace('{$AppDomain}', window.Config.Domain).replace('{$X}', _Search.SearchTable[i].Lx).replace('{$Y}', _Search.SearchTable[i].Ly).replace('{$oid}', _Search.SearchTable[i].OwnerID).replace('{$cid}', _Search.SearchTable[i].CompanyID).replace('{$lstid}', _Search.SearchTable[i].LST_ID).replace('{$DataType}', _Search.SearchTable[i].RecordType).replace('{$Name}', _Search.SearchTable[i].OCName).replace('{$Address}', _Search.SearchTable[i].Address).replace('{$Telephone}', _Search.SearchTable[i].Telephone).replace('{$Address}', sAddress).replace('{$Class}', 'ErWei');
        }
        
        if (_Search.SearchTable[i].Vip > 0) {
            sTmpHtml = sTmpHtml.replace('{$IsVip}', '<span class="IsVipIco"><a href="http://' + _Search.SearchTable[i].Eaddress + '.' + window.Config.Domain + '" target="_blank"><img src="/Images/VipMember.gif" border="0" /></a></span>');
        }
        else {
            sTmpHtml = sTmpHtml.replace('{$IsVip}', '');
        }
    

        
        
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
    
   if(WebHotelNames!=null && WebHotelNames.length>2)
    {
      webAgData =  webAgData.substring(0,webAgData.length-1);
      WebHotelNames= WebHotelNames.substring(0,WebHotelNames.length-1);     
      WebAgResult(WebHotelNames,'hotel');  
      
    }   
    
    if (discount !=null && discount.length > 2)
    {
      
      discount = discount.substring(0,discount.length-1);
      discountdata = discountdata.substring(0,discountdata.length-1);
      WebAgResult(WebHotelNames,'discount');
    }
    
    
    
}


////////////////////////////////// tmm

function WebAgResult(agData,type)
{ 
 
 var names ='';
 
 if (type =="hotel")
  {
   names =WebHotelNames;
  }
 if (type =='discount')
  {
   names = discount;
  }
  
  

 var sAgUrl = "http://"+this.Config.Domain+"/ExistHotel.aspx?HotelList="+escape(names)+"&CityCode="+ window.Config.CityCode+"&rnd="+Math.random()*5;
  if (type =='discount')
  {
    sAgUrl =sAgUrl+"&type=1";
 
     if (names!=null && names!='')
     {
       ENetwork.DownloadScript(sAgUrl, function() { fnShowAgData(type); });
    }
  }  
  else 
  {
    if (names!=null && names !='')
   {    
     ENetwork.DownloadScript(sAgUrl, function() { fnShowAgData(type); });
   }
  }
}
function fnShowAgData(type)
{
    if (type=="hotel")
    {
        if (typeof ExistHotel !='undefined')
        {
           getdivinner(ExistHotel,"hotel");

        }
 
         webAgData = '';
         WebHotelNames= ''; 
        
    }
  if(type =="discount")
   {
       if (typeof ExistName !='undefined')
      {
        getdivinner(ExistName,"discount");
      }
      
       discount ='';
       discountdata ='';
  }


}

function getdivinner(content,type)
{
   var returnvalues =content;
   var divcounts = '';
   if (type=="hotel")
   {
    divcounts =webAgData;
   }
   if (type=="discount")
   {
    divcounts = discountdata;
   }  
    var AgDataList= divcounts.split(',');
        
        if(returnvalues.length==AgDataList.length)
        {
           for(var i=0;i<returnvalues.length;i++)
           {
              if(returnvalues[i]=='1')
              {            
                 var OneAgData = AgDataList[i].split('|');
                 
                 ViewHotelImg(OneAgData[0],OneAgData[1],OneAgData[2],OneAgData[3],type);
                 
               }
            }
         }
 
}

function ViewHotelImg (HotelName,divID,OwnerID,CompanyID,type)
{
    var objImg =  document.getElementById(divID);

    if (objImg)
    {
           objImg.style.display='';
           objImg.style.cursor = 'hand';
           
             var HotelLink ="";
           
           if (OwnerID!='0')
           {
               HotelLink = HotelDetailsLink(window.Config.Domain,OwnerID,HotelName,'Owner',type); 
           }
           else 
           {
              HotelLink = HotelDetailsLink(window.Config.Domain,CompanyID,HotelName,'Company',type); 
           }
           
           var objImgValue = objImg.innerHTML;
           
           var imggif = ''
            if (type =="discount")
            {
              imggif ='wydz.gif';
             
            }
           
           if (type=="hotel")
           {           
             imggif ='OrderHotel.gif';
           }
                              
        if (imggif!=''&&objImgValue.indexOf(imggif)<0)
           {
             objImg.innerHTML += '&nbsp;<a  href="'+HotelLink+'" target="_blank"><img src="/Skins/zh-chs/Default/Images/'+imggif+'" border="0"/></a>';
           }
    }    
 
}

function HotelDetailsLink (Domain,ID,HotelName,yp,type) {
     
     
     var Ownerpage = '';
     var Companypage ='';
     
     if (type =="hotel")
     {
         Ownerpage ="HotelOwner.aspx";
         Companypage="HotelCompany.aspx";
     }
     else 
     {
       Ownerpage ="OwnerDetail.aspx";
       Companypage="CompanyDetail.aspx";
     }     
    if (yp =='Owner')
    {
      return 'http://'+Domain+'/yp/'+Ownerpage+'?id='+ID+'';
    }
    else 
    {
      return 'http://'+Domain+'/yp/'+Companypage+'?id='+ID+'';
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
