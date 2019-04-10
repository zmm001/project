window.onload=fnOnload;

function fnOnload()
{
    if (!window.Config)
    {
        setTimeout('fnOnload()', 200);
        return;
    }
    document.body.innerHTML=window.Config._Loading;
    LS=new LocalSearch();
    LS.FnName='LS.ShowByPage';
    LS.OutPut=function(a){
        document.body.innerHTML=a;
         //获取主题点对应的广告
        var url =window.Config._DataCenterUrl + 'CommMap/themeInfo.aspx?node='+window.Config._Node+'&l='+window.Config._L+'&v=1.0&req=3&id='+fnRequest('classid');
        ENetwork.DownloadScript(url,function(){
            if (typeof _ThemeAD !='undefined' && _ThemeAD && _ThemeAD.BCT_ADImage.length > 0)
            {
                this.$('ADImage').src = window.Config._PicUrl + window.Config._Country+'/'+window.Config._CityCode+'/'+window.Config._L+'/themeImages/AD/' + _ThemeAD.BCT_ADImage;
                this.$('ADImage').style.display = 'block';
                this.$('ADImage').parentNode.href = _ThemeAD.BCT_ADUrl;
            }
            else
            {
                if(typeof parent.parent.SearchListAd!='undefined'&&parent.parent.SearchListAd!=null)
                {
                    if (this.$('ADImage'))
                    {
                        this.$('ADImage').src = window.Config._PicUrl + parent.parent.SearchListAd.ImagePath+'/'+parent.parent.SearchListAd.ImageName;
                        this.$('ADImage').style.display = 'block';
                        this.$('ADImage').parentNode.href = 'http://'+parent.parent.SearchListAd.Link.replace('http://','');
                    }
                }
            }
        });
    }
    LS.Key=unescape(fnRequest('key'));
    var url =window.Config._DataCenterUrl + 'CommMap/themeInfo.aspx?node='+window.Config._Node+'&l='+window.Config._L+'&v=1.0&req=2&id='+fnRequest('classid');
    //clipboardData.setData('text', url);
    ENetwork.DownloadScript(url,function(){
        if(ThemeMapsContentList && ThemeMapsContentList!=null){
            LS.Show();
        }else{
            LS.OutPut('无分类结果！');
        }
    });
}
function LocalSearch(){}
LocalSearch.prototype.Data='';
LocalSearch.prototype.Key='';
LocalSearch.prototype.Page=1;
LocalSearch.prototype.Count=0;
LocalSearch.prototype.PageSize=6;       //5个在有小类的时候破坏UI
LocalSearch.prototype.PageCount=1;
LocalSearch.prototype.Result='';
LocalSearch.prototype.FnName='';
LocalSearch.prototype.Show = function(){
    if (typeof ThemeMapsContentList == 'undefined'){
        return;
    }
    if(this.Data=='')this.Data= ThemeMapsContentList;
    
     var _LocalSearch = '<div class="LocalResult"> '
                            +'<table width="100%" id="tbCommend" border="0" align="center" cellpadding="0" cellspacing="0"><!--_Tr--><tr><td style="width:40px">'
                            +'<img src="'+window.Config._ImgPath+'button4.gif" width="17" style="margin-left:10px;" height="17" /></td><td>{$Acontent}</td></tr><!--/_Tr--></table>'
                            +'<ul class="LocalList" style="height:auto"><!--_Li--><li style="height:27px; padding-left:5px;"><div><div style="width:27px; margin-right:3px; float:left; height:27px;background-image:url({$ThemeImage});background-repeat:no-repeat; "></div><div style="height:20px; width:230px; overflow:hidden; float:left;">{$No}.<a title="{$Title}" onclick="parent.ResultControlForm._themeClick({$tid},{$X},{$Y});" style="{$Style}">{$Title}</a></div></div>'
                            +'</li><!--/_Li--><li style="height:27px; padding-left:5px;"><div><div style="height:20px; width:240px; overflow:hidden; float:left;">主题地址:<input style="border:1px solid #666;width:180px;" value="{$ActiveThemeUrl}" type="text" onfocus="this.select()" /></div><div style="width:20px; margin-right:3px; float:left; height:27px;"><img style="cursor:pointer;" src="'+window.Config._ImgPath+'newmap42.gif" title="复制给好友" onclick="clipboardData.setData(\'text\', \'{$ActiveThemeUrl}\');alert(\'复制成功，请贴到你的QQ/MSN上发给你的好友！\');"></div></div></li></ul><h2>{$Page}</h2>'
                            +'<div class="Photo"><a href="{$ADLink}" target="_blank"><img id="ADImage" src="" width="275px" height="45px" style="border:0px;display:none;"></a></div></div>';
    var LiHtml=fnReadSign('_Li',_LocalSearch);
    var TrHtml=fnReadSign('_Tr',_LocalSearch);
    var r=_LocalSearch.replace(LiHtml,'{$Li}').replace(TrHtml,'');
    var s='';
    if(this.Page==1){
        this.Count=this.Data.CompanyName.length;
        if(this.Count%(this.PageSize)==0){
            this.PageCount=this.Count/(this.PageSize);
        }else{
            this.PageCount=int(this.Count,this.PageSize)+1;
        }
    }
    var Begin  = (this.Page-1)*(this.PageSize);
    var End    = this.Page*this.PageSize;
    if(End>this.Count)End=this.Count;
    for(i=Begin;i<End;i++){
        if (this.Data.ComIco[i].length > 0) //判断是否有主题点图片
        {
            var sThemeImage = window.Config._PicUrl + window.Config._Country+'/'+window.Config._CityCode+'/'+window.Config._L+'/themeImages/BBLCompany/' + this.Data.ComIco[i]; 
        }
        else
        {
            var sThemeImage = window.Config._PicUrl + window.Config._Country+'/'+window.Config._CityCode+'/'+window.Config._L+'/themeImages/' + this.Data.FocusIco[i];
        }
        if (this.Data.ComTypeID[i] < 1)
        {
            var sStyle = this.Data.PStyle[i];
        }
        else
        {
            var sStyle = this.Data.SStyle[i];
        }
        var t=this.Data.CompanyName[i].replace(this.Key,'<span style="color:#ff8601;">'+this.Key+'</span>');
        s+=LiHtml.replace('{$No}',i+1).replace('{$Title}',this.Data.CompanyName[i]).replace('{$Title}',t).replace('{$Address}',this.Data.Address[i]).replace('{$EID}',this.Data.Eaddress[i]).replace('{$AppDomain}',window.Config._AppDomain).replace('{$X}',this.Data.x[i]).replace('{$Y}',this.Data.y[i]).replace('{$tid}',this.Data.ID[i]).replace('{$ThemeImage}', sThemeImage).replace('{$Style}', sStyle);
    }
    var t='';
    if(this.Data.TGroup!=null){
        for(j=0;j<this.Data.TGroup.length;j++){
            t+='<a onclick="parent.ResultControlForm.ClassSearch('+this.Data.TGroup[j].ID+',\''+this.Data.TGroup[j].TypeName+'\')">'+this.Data.TGroup[j].TypeName+' </a> ';
        }
        s+='<li style="height:auto;">分类：'+t+'</li>';
    }    
    var strPage=fnPageShow(this.Page,this.PageCount,this.PageSize,'pageStr',this.FnName);
    r=r.replace('{$Li}',s).replace('{$Count}',this.Count).replace('{$Key}',this.Key).replace('{$Page}',strPage);
    r=r.replace(/\{\$ActiveThemeUrl\}/gi, 'http://' + window.Config._AppDomain + '/?tid=' + fnRequest('classid') + '&tname=' + fnRequest('classname'));
    
    this.Result=r;
    this.OutPut(r);
    r=null;
    if (parent.ResultControlForm)
    {
        parent.ResultControlForm._classDataLoad(this.Data,Begin,End);
    }
}
LocalSearch.prototype.ShowByPage = function(Cpage){
    if(Cpage){
        this.Page=Cpage;
    }
    this.Show();
}
function fnInit(){
    if(typeof ThemeMapsContentList != 'undefined' && ThemeMapsContentList!=null)
    {
        var Begin  = (LS.Page-1)*(LS.PageSize);
        var End    = LS.Page*LS.PageSize;
        if(End>LS.Count)End=LS.Count;
        if(End!=0)
        {
            if (parent.ResultControlForm)
            {
                parent.ResultControlForm._classDataLoad(LS.Data,Begin,End);
            }
        }
    }
    else
    {
        if (parent.ResultControlForm)
        {
            parent.ResultControlForm._classDataLoad(null,0,0);
        }
    }
}
function fnExit()
{
    if (parent.ResultControlForm)
    {
        parent.ResultControlForm._classDataLoad(null,0,0);
    }
}