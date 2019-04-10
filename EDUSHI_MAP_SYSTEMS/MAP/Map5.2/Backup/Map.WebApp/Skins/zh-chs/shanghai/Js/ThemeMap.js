_Data='';
_Key='';
_Page=1;
_RecordCount=0;
_PageSize=10;
_PageCount=1;
_Result='';

var _ThemeData = {};
var _Begin;
var _End;

window.onload=fnOnload;
function reLoadPageSize(isHasSubType)
{
    if(isHasSubType)
    {
        _PageSize = Math.floor((fnGetWindowHeight()-132)/24);
    }
    else
    {
        _PageSize = Math.floor((fnGetWindowHeight()-113)/24);
    }
    if(_PageSize < 8)
    {
        _PageSize = 8;
    }
}
function fnOnload()
{
    if (!window.Config)
    {
        setTimeout('fnOnload()', 200);
        return;
    }
    document.body.innerHTML=window.Config.Loading;

    _Key=unescape(fnRequest('key'));
    var url =window.Config.EDataCenterUrl + 'CommMap5.0/ThemeMaps.aspx?domain='+window.Config.Domain+'&l='+window.Config.Language+'&req=2&typeid='+fnRequest('classid');
    ENetwork.DownloadScript(url,function(){        
        if(typeof _ThemeMapList != 'undefined'){
            fnShow();
        }else{
            fnOutPut('无分类结果！');
        }
    });
}
function fnOutPut(a)
{
        document.body.innerHTML=a;
        $('TabContent').style.height = fnGetWindowHeight()-50+'px';  //初始化高度
         //获取主题点对应的广告
        var url =window.Config.EDataCenterUrl + 'CommMap5.0/ThemeMaps.aspx?domain='+window.Config.Domain+'&l='+window.Config.Language+'&req=3&typeid='+fnRequest('classid');
        ENetwork.DownloadScript(url,function(){
            if (typeof _ThemeAD !='undefined' && _ThemeAD.ThemeAD.length > 0 && _ThemeAD.ThemeAD[0].BCT_ADImage != '')
            {
                var src=window.Config.PicUrl + 'cn/'+window.Config.CityCode+'/'+window.Config.Language+'/themeImages/AD/' + _ThemeAD.ThemeAD[0].BCT_ADImage;
                var link=_ThemeAD.ThemeAD[0].BCT_ADUrl;
                var AdHtml="<a href="+link+" target='_blank'><img id='ADImage' src='"+src+"' width='276px' height='45px' style='border:0px;display:block'></a>";
                this.$("Photo").innerHTML=AdHtml;
            }
            else
            {
                 $('AD_script').src=this.Config.EDataCenterUrl+'Ad/ImageAd.aspx?domain='+this.Config.Domain+'&l='+this.Config.Language+'&req=SEARCHLIST&domid=Photo';
            }
        });
}
function fnShow(){
    if (typeof _ThemeMapList == 'undefined'){
        return;
    } 
    _ThemeData = _ThemeMapList;
    var sLocalSearch = '<div class="LocalResult" id="TabContent"> '
                            +'<table width="100%" id="tbCommend" border="0" align="center" cellpadding="1" cellspacing="1"><!--_Tr--><tr><td style="width:15px">'
                            +'<img src="'+window.Config.SkinPath+'Images/button4.gif" /></td><td>{$Acontent}</td></tr><!--/_Tr--></table>'
                            +'<ul class="LocalList"><!--_Li--><li style="height:auto"><div style="width:21px; margin-right:3px; float:left; height:21px;background:url({$ThemeImage}) no-repeat left center;"></div><div style="height:21px; line-height:21px; width:230px; overflow:hidden; float:left;">{$No}.<a href="javascript:;" title="{$Title}" onclick="parent.{$fnShow}({$tid},{$X},{$Y});" style="{$Style}">{$Title}</a></div><div class="DottedLine"></div></li><!--/_Li--></ul>'
                            +'<div class="Paginate">{$Page}</div>'
                            +'<div class="ThemeMapCopy"><input value="{$ActiveThemeUrl}" type="text" onfocus="this.select()" /><div><img style="cursor:pointer;" src="'+window.Config.SkinPath+'Images/ToFriend.gif" title="复制给好友" onclick="parent.fnCopyToClipboard(\'{$ActiveThemeUrl}\',\'复制好了，发给我的QQ/MSN好友分享吧！\');"></div></div></div>'
                            +'<div id="Photo" class="Photo"></div></div>';
    var LiHtml=fnReadSign('_Li',sLocalSearch);
    var TrHtml=fnReadSign('_Tr',sLocalSearch);
    var r=sLocalSearch.replace(LiHtml,'{$Li}').replace(TrHtml,'');
    var s='';
    if(_ThemeMapList.SubTypeList.length>0){
        reLoadPageSize(true);
    }
    else
    {
        reLoadPageSize(false);
    }    
    _RecordCount=_ThemeMapList.ThemeList.length;
    if(_RecordCount%(_PageSize)==0){
        _PageCount=_RecordCount/(_PageSize);
    }else{
        _PageCount=int(_RecordCount,_PageSize)+1;
    }
    var Begin  = (_Page-1)*(_PageSize);
    var End    = _Page*_PageSize;
    _Begin = Begin;
    _End = End;
    if(End>_RecordCount)End=_RecordCount;
    for(i=Begin;i<End;i++){
        var oTheme = _ThemeMapList.ThemeList[i];
        if (oTheme.BCC_CompanyICO != '') //判断是否有主题点图片
        {
            var sThemeImage = window.Config.PicUrl + 'cn/'+window.Config.CityCode+'/'+window.Config.Language+'/themeImages/BBLCompany/' + oTheme.BCC_CompanyICO; 
        }
        else
        {
            var sThemeImage = window.Config.PicUrl + 'cn/'+window.Config.CityCode+'/'+window.Config.Language+'/themeImages/' + oTheme.BCT_TypeICO;
        }
        if (oTheme.BCT_ID < 1)
        {
            var sStyle = oTheme.PStyle;
        }
        else
        {
            var sStyle = oTheme.SStyle;
        }
        var t=oTheme.BCC_CompanyName.replace(_Key,'<span style="color:#ff8601;">'+_Key+'</span>');
        if(oTheme.BCC_CompanyID*1 == 0)
        {
            s+=LiHtml.replace('{$No}',i+1).replace('{$Title}',oTheme.BCC_CompanyName).replace('{$Title}',t).replace('{$Address}',oTheme.BCC_Address).replace('{$EID}',oTheme.BCC_Eaddress).replace('{$AppDomain}',window.Config.Domain).replace('{$X}',oTheme.X).replace('{$Y}',oTheme.Y).replace('{$ThemeImage}', sThemeImage).replace('{$tid}',oTheme.BCC_ID).replace('{$Style}', sStyle).replace('{$fnShow}','ShowCommendPopById');
        }
        else
        {
             s+=LiHtml.replace('{$No}',i+1).replace('{$Title}',oTheme.BCC_CompanyName).replace('{$Title}',t).replace('{$Address}',oTheme.BCC_Address).replace('{$EID}',oTheme.BCC_Eaddress).replace('{$AppDomain}',window.Config.Domain).replace('{$X}',oTheme.X).replace('{$Y}',oTheme.Y).replace('{$ThemeImage}', sThemeImage).replace('{$tid}',oTheme.BCC_ID).replace('{$Style}', sStyle).replace('{$fnShow}','fnShowThemePop');
        }
    }
    var t='';
    if(_ThemeMapList.SubTypeList.length>0){         
        for(j=0;j<_ThemeMapList.SubTypeList.length;j++){
            var oSubType = _ThemeMapList.SubTypeList[j];
            t+='<a href="javascript:;" onclick="parent.fnLoadThemeMapListByTypeId('+oSubType.BCT_ID+',\''+oSubType.BCT_TypeName+'\')">'+oSubType.BCT_TypeName+' </a> ';
        }
        s+='<li style="height:auto;">分类：'+t+'</li>';        
    }
    var strPage=fnPager(6, _Page, _PageSize, _PageCount, 'window.ShowByPage');
    r=r.replace('{$Li}',s).replace('{$Count}',_RecordCount).replace('{$Key}',_Key).replace('{$Page}',strPage);
    r=r.replace(/\{\$ActiveThemeUrl\}/gi, 'http://' + window.Config.Domain + '/?tid=' + fnRequest('classid') + '&tname=' + fnRequest('key'));
    
    fnOutPut(r);
    r=null;
    if(_Page == 1)
    {
        parent.onThemeDataLoadComplete(_ThemeMapList.ThemeList);
    }
}
function ShowByPage(iPage)
{
    if(iPage){
        _Page=iPage;
    }
    fnShow();
}
function fnActive(){
    if(typeof  _ThemeMapList != 'undefined' && _ThemeMapList.ThemeList.length > 0)
    {
        parent.onThemeDataLoadComplete(_ThemeData.ThemeList);
    }
    else
    {
        parent.onThemeDataLoadComplete(null);
    }
}
function fnExit()
{
    parent.onThemeDataLoadComplete(null);
}
