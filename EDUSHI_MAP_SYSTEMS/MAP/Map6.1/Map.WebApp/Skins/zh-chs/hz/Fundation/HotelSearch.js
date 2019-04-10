var _SearchType;    //搜索类型
var _Key;           //搜索关键字
var _Address;       //搜索地址

var _PrevElement = null;   //保存上次点击的div

var _Page = 1;
var _PageCount = 1;
var _RecordCount = 0;
var _PageSize = 5;
//var _Search =[{'X':'56359','Y':'27741','CompanyID':'583743','OwnerID':'0','Name':' 石库门粤海酒店','Telephone':'86-21-51156377','Address':'逸仙路328号粤海酒店 3F'}];
var _SearchData = {};
var _Begin;
var _End;
var HasLoadAd = false;
window.onload=fnOnload;

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
    
   //tmm 2010-5-5

   var adurl =window.Config.EDataCenterUrl + 'ad/ads.aspx?citycode=' + window.Config.CityCode + '&l=' + window.Config.Language + '&key=hoteladv&domid=hoteladv&isdata=1&rnd=' + ENetwork.GetExecutionID();
  
   ENetwork.DownloadScript(adurl,function(){showadv();});
   //
    $('divContent').innerHTML = window.Config.Loading; 
    var cityCode = fnRequest('cityCode');
    var l = fnRequest('l');
    //var domain = 
    var src = "http://"+window.Config.Domain+"/AgDataList/"+window.Config.CityCode+"_"+window.Config.Language+".js";
    getAgData(src);
}
//tmm
function showadv()
{
     var advcontent='';
      if (typeof _SearchAdv != 'undefined' && _SearchAdv.length > 0)  
      {
         advcontent +='<ul>';
           for (var i =0; i< _SearchAdv.length; i++)
           {
             advcontent += '<li><a href="'+_SearchAdv[i].EA_ResourcesUrl+'" target="'+_SearchAdv[i].EA_Target+'">'+ _SearchAdv[i].EA_Name +'</a></li>';              
           }
         advcontent +='</ul>';
           
      }
     $('hoteladv').innerHTML =advcontent;
}


//动态加载数据
function getAgData(srcUrl)
{
  
   ENetwork.DownloadScript(srcUrl,function(){fnShowData();});
  //ENetwork.DownloadScript(
}
//显示搜索到的数据
function fnShowData() {
    //alert(_Search);
    if (typeof _Search == 'undefined') {
        _Search = {};
     }
    _SearchData = _Search;
    var sLocalSearchHtml = '';
    if (_Search.length > 0) {     
      
       
        $('divResult').innerHTML = '<div class="Sea3DTil">共有<strong>' + _Search.length + '</strong>家酒店可以预订<strong></strong></div>';
     
        sLocalSearchHtml = '<table id="tbCommend" border="0" cellpadding="1" cellspacing="1" style="line-height:17px;"><!--_Tr--><tr><td style="width:15px;">'
                    + '<img src="/Images/button4.gif" /></td><th>{$Acontent}</th></tr><!--/_Tr--></table>'
                    + '<ul class="LocalList"><!--_Li--><li style="height:auto;"><div class="Number"><span>{$No}</span></div><div class="DetailCon"><div class="TitleNav" ><span class="HeadLine {$Class}"><a href="javascript:;" title="{$Title}" onclick="if(_PrevElement != null){_PrevElement.className=\'Number\';};this.parentNode.parentNode.parentNode.previousSibling.className=\'Number Currently\';_PrevElement=this.parentNode.parentNode.parentNode.previousSibling;parent.fnShowSearchPop({$oid},{$cid},0,{$X},{$Y},{$DataType},\'{$Name}\',\'{$Address}\',\'\')">{$Title}</a></span>{$Order}<span><span></div><div class="Address">{$Address}</div></div>'
                    + '<div class="DottedLine"></div></li><!--/_Li--></ul><div class="Paginate">{$Page}</div>';
   

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
    _RecordCount = _Search.length;
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
    
            var t = _Search[i].Name;
            var sAddress = _Search[i].Address;
 
        var sTmpHtml = '';
      
        sTmpHtml = LiHtml.replace('{$No}', i + 1).replace('{$Title}', _Search[i].Name).replace('{$Title}', t).replace('{$EID}', _Search[i].Eaddress).replace('{$AppDomain}', window.Config.Domain).replace('{$X}', _Search[i].X).replace('{$Y}', _Search[i].Y).replace('{$oid}', _Search[i].OwnerID).replace('{$cid}', _Search[i].CompanyID).replace('{$DataType}',getType(_Search[i].OwnerID)).replace('{$Name}', _Search[i].Name).replace('{$Address}', _Search[i].Address).replace('{$Address}', sAddress).replace('{$Class}', 'SanWei');
        
       sTmpHtml = sTmpHtml.replace('{$Order}',GetImg(_Search[i].OwnerID,_Search[i].CompanyID,_Search[i].Name));   
       
       s += sTmpHtml;       
  
    }
    var strPage = fnPager(6, _Page, _PageSize, _PageCount, 'window.fnShowByPage');
    r = r.replace('{$Li}', s).replace('{$Tr}', c).replace('{$Page}', strPage);
    $('divContent').innerHTML = r;
    fnResize();
    parent.onSearchDataLoadComplete(_Search, Begin, End);
    
 }
 else
 {
  $('divContent').innerHTML ='';
  
 }
}

function getType(OwnerID)
{
     if (OwnerID =='0')
     {
      return '1'
     }
     else 
     {
      return '2'
     }
}

function GetImg (OwnerID,CompanyID,Name)
{

       var ID ="";
       
      if (CompanyID ==0)
          {
          
           ID = OwnerID;
           return   '<a  href= "http://'+this.Config.Domain+'/yp/HotelOwner.aspx?id='+ID+'"  target="_blank" ><img src="/Skins/zh-chs/Default/Images/OrderHotel.gif" border="0"  style="cursor:hand"/></a>';
          }
      else 
          {
          ID = CompanyID;
          
          return  '<a  href= "http://'+this.Config.Domain+'/yp/HotelCompany.aspx?id='+ID+'"  target="_blank" ><img src="/Skins/zh-chs/Default/Images/OrderHotel.gif" border="0"  style="cursor:hand" /></a>';
           
          }
  
 
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
    parent.onSearchDataLoadComplete(null, 0, 0);
    parent._RoadLineLayer.innerHTML = '';
    parent._RoadCoords = [];
}
//初始化高度
function fnResize() {
    $('TabContent').style.height = fnGetWindowHeight() - 5 + 'px';
}

//酒店预订搜索
function searchkeyword()
{
    var keyword =  $('txkeyword').value;
    _Page =1;
     if (keyword!="")
     { 
                
        var SearchResurt =[];
        
         if (typeof _Search != 'undefined') 
         {  
              for (var i=0;i<_Search.length;i++)
              {
                    if (_Search[i].Name.indexOf(keyword)>=0)
                    {
                      SearchResurt.push(_Search[i]);
                    }      
              }  
          fnShowSearchData(SearchResurt);
         }
    } 
    else 
    {
    fnShowSearchData(_SearchData);
     
    }   
}

function fnShowSearchData(SearchData) {
    //alert(SearchData);
    if (typeof SearchData == 'undefined') {
        SearchData = [];
    }
    var sLocalSearchHtml = '';
    if (SearchData.length > 0) {     
             
        $('divResult').innerHTML = '<div class="Sea3DTil">共有<strong>' + SearchData.length + '</strong>家酒店可以预订<strong></strong></div>';
     
        sLocalSearchHtml = '<table id="tbCommend" border="0" cellpadding="1" cellspacing="1" style="line-height:17px;"><!--_Tr--><tr><td style="width:15px;">'
                    + '<img src="/Images/button4.gif" /></td><th>{$Acontent}</th></tr><!--/_Tr--></table>'
                    + '<ul class="LocalList"><!--_Li--><li style="height:auto;"><div class="Number"><span>{$No}</span></div><div class="DetailCon"><div class="TitleNav" ><span class="HeadLine {$Class}"><a href="javascript:;" title="{$Title}" onclick="if(_PrevElement != null){_PrevElement.className=\'Number\';};this.parentNode.parentNode.parentNode.previousSibling.className=\'Number Currently\';_PrevElement=this.parentNode.parentNode.parentNode.previousSibling;parent.fnShowSearchPop({$oid},{$cid},0,{$X},{$Y},{$DataType},\'{$Name}\',\'{$Address}\',\'\')">{$Title}</a></span>{$Order}<span><span></div><div class="Address">{$Address}</div></div>'
                    + '<div class="DottedLine"></div></li><!--/_Li--></ul><div class="Paginate">{$Page}</div>';
   
    var TrHtml = fnReadSign('_Tr', sLocalSearchHtml);
    var LiHtml = fnReadSign('_Li', sLocalSearchHtml);

    var r = sLocalSearchHtml.replace(LiHtml, '{$Li}').replace(TrHtml, '{$Tr}');
    var s = '';
    var c = '';

    if (typeof SearchData.VouchAd != 'undefined') {
        for (var i = 0; i < SearchData.VouchAd.length; i++) {
            if (SearchData.VouchAd[i].BAC_OPenType == '2') {
                c += TrHtml.replace('{$Acontent}', '<a  style="text-decoration:underline;font-weight:bold;color:red;font-size:12px;" href="javascript:parent.ShowCommendPopByContent(\'' + SearchData.VouchAd[i].BAC_Title + '\',SearchData.VouchAd[' + i + '].BAC_Content,' + SearchData.VouchAd[i].BAC_LogincalX + ',' + SearchData.VouchAd[i].BAC_LogincalY + ')">' + SearchData.VouchAd[i].BAC_Title + '</a>');
            }
            else {
                c += TrHtml.replace("{$Acontent}", "<a style=\"color:#F60;\" href=\"http://{$LinkUrl}\" target=\"_blank\">{$Title}</a>").replace('{$Title}', SearchData.VouchAd[i].BAC_Title).replace('{$LinkUrl}', SearchData.VouchAd[i].BAC_LinkUrl.replace('http://', ''));
            }
        }
        reLoadPageSize(SearchData.VouchAd.length); //根据是否有推荐关键字计算分页数
    }
    else {
        reLoadPageSize(0);
    }
    _RecordCount = SearchData.length;
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
    
            var t = SearchData[i].Name;
            var sAddress = SearchData[i].Address;
 
        var sTmpHtml = '';
      
        sTmpHtml = LiHtml.replace('{$No}', i + 1).replace('{$Title}', SearchData[i].Name).replace('{$Title}', t).replace('{$EID}', SearchData[i].Eaddress).replace('{$AppDomain}', window.Config.Domain).replace('{$X}', SearchData[i].X).replace('{$Y}', SearchData[i].Y).replace('{$oid}', SearchData[i].OwnerID).replace('{$cid}', SearchData[i].CompanyID).replace('{$DataType}',getType(SearchData[i].OwnerID)).replace('{$Name}', SearchData[i].Name).replace('{$Address}', SearchData[i].Address).replace('{$Address}', sAddress).replace('{$Class}', 'SanWei');
        
       sTmpHtml = sTmpHtml.replace('{$Order}',GetImg(SearchData[i].OwnerID,SearchData[i].CompanyID,SearchData[i].Name));   
       
       s += sTmpHtml;       
  
    }
    var strPage = fnPager(6, _Page, _PageSize, _PageCount, 'window.fnShowByPage');
    r = r.replace('{$Li}', s).replace('{$Tr}', c).replace('{$Page}', strPage);
    $('divContent').innerHTML = r;
    fnResize();
    parent.onSearchDataLoadComplete(SearchData, Begin, End);
    
    }
 else
     {
      $('divContent').innerHTML ='';
      
     }

}