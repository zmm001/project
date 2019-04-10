var vouchadList;
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
    }
    LS.Key=unescape(fnRequest('key'));
    //查找周边
    if(fnRequest('action')==1)
    {
        var url =window.Config._DataCenterUrl + 'CommMap/Search.aspx?node='+window.Config._Node+'&l='+window.Config._L+'&v=1.0&req=3&kw='+fnRequest('key')+'&x='+fnRequest('x')+'&y='+fnRequest('y')+'&len='+fnRequest('len');
        ENetwork.DownloadScript(url,function(){LS.Show();});
    }
    //框选搜索
    else if(fnRequest('action')==2)
    {
        var url =window.Config._DataCenterUrl + 'CommMap/Search.aspx?node='+window.Config._Node+'&l='+window.Config._L+'&v=1.0&req=4&kw='+fnRequest('key')+'&x1='+fnRequest('x1')+'&y1='+fnRequest('y1')+'&x2='+fnRequest('x2')+'&y2='+fnRequest('y2')+'&pagenum=1&pagesize=100';
        ENetwork.DownloadScript(url,function(){LS.Show();});
    }
    //本地搜索
    else
    {
        var url=window.Config._DataCenterUrl + 'Commmap/search.aspx?node='+window.Config._Node+'&l='+window.Config._L+'&req=1&v=1.0&kw='+fnRequest('key')+'&pagenum=1&pagesize=100';
        ENetwork.DownloadScript(url,function(){LS.Show();});
    }
}
function LocalSearch(){}
LocalSearch.prototype.Data='';
LocalSearch.prototype.Key='';
LocalSearch.prototype.Page=1;
LocalSearch.prototype.Count=0;
LocalSearch.prototype.PageSize=5;
LocalSearch.prototype.PageCount=1;
LocalSearch.prototype.Result='';
LocalSearch.prototype.FnName='';
LocalSearch.prototype.Show = function()
{
    if(typeof searchData!='undefined' &&searchData!=null)
    {
        if(this.Data=='')
        {
            this.Data=new searchData();
        }
        //以上修正无法分页问题
        var _LocalSearch = '<div class="LocalResult">共有<span>{$Count}</span>项符合<span>{$Key}</span>的查询结果'
                        +'<table width="100%" id="tbCommend" border="0" align="center" cellpadding="0" cellspacing="0"><!--_Tr--><tr><td style="width:40px">'
                        +'<img src="'+window.Config._ImgPath+'button4.gif" width="17" style="margin-left:10px;" height="17" /></td><td>{$Acontent}</td></tr><!--/_Tr--></table>'
                        +'<ul class="LocalList"><!--_Li--><li><div style="height:20px; width:283px; overflow:hidden;">{$No}.<a title="{$Title}" onclick="parent.ResultControlForm._entityClick({$oid},{$cid},{$X},{$Y});">{$Title}</a>{$IsVip}</div>'
                        +'<span style="margin-left:15px; color:#656565;">地址：{$Address}</span><br /></li><!--/_Li--></ul><h2>{$Page}</h2>'
                        +'<div class="Photo"><a href="{$ADLink}" target="_blank"><img src="{$ADImagePath}" width="275px" height="45px" style="border:0px;{$DisPlay}"></a></div></div>';
        var TrHtml=fnReadSign('_Tr',_LocalSearch);
        var LiHtml=fnReadSign('_Li',_LocalSearch);
        
        var r=_LocalSearch.replace(LiHtml,'{$Li}').replace(TrHtml,'{$Tr}'); 
        var s='';
        var c='';
        vouchadList = new VouchAd();
        
        var iCount = vouchadList.Title.length;
        if(iCount>0)
        {
            for(var i=0;i<iCount;i++)
            {
                if(vouchadList.OpenType[i]=='2')
                {
                    c+=TrHtml.replace("{$Acontent}","<a  style=\"text-decoration:underline;font-weight:bold;color:red;font-size:12px;\" href=\"javascript:parent.ResultControlForm._vouchClick('"+escape(vouchadList.Title[i])+"',vouchadList.Content[" + i + "],"+vouchadList.X[i]+","+vouchadList.Y[i]+")\">"+vouchadList.Title[i]+"</a>");
                }
                else
                {
                    c+=TrHtml.replace("{$Acontent}","<a href=\"http://{$LinkUrl}\" target=\"_blank\" style=\"text-decoration:underline;font-weight:bold;color:red;font-size:12px;\">{$Title}</a>").replace('{$Title}',vouchadList.Title[i]).replace('{$LinkUrl}',vouchadList.LinkUrl[i].replace('http://',''));
                }
            }
        }
        if(this.Page==1)
        {
            this.Count=this.Data.OCName.length;
            if(this.Count%(this.PageSize)==0)
            {
                this.PageCount=this.Count/(this.PageSize);
            }
            else
            {
                this.PageCount=int(this.Count,this.PageSize)+1;
            }
        }
        var Begin  = (this.Page-1)*(this.PageSize);
        var End    = this.Page*this.PageSize;
        if(End>this.Count)End=this.Count;
        for(i=Begin;i<End;i++){
            var t=this.Data.OCName[i].replace(this.Key,'<span style="color:#ff8601;">'+this.Key+'</span>');
            var sTmpHtml = LiHtml.replace('{$No}',i+1).replace('{$Title}',this.Data.OCName[i]).replace('{$Title}',t).replace('{$Address}',this.Data.Address[i]).replace('{$EID}',this.Data.Eaddress[i]).replace('{$AppDomain}',window.Config._AppDomain).replace('{$X}',this.Data.x[i]).replace('{$Y}',this.Data.y[i]).replace('{$oid}',this.Data.OwnerID[i]).replace('{$cid}',this.Data.CompanyID[i]);
            if (this.Data.Vip[i]*1 >0)
            {
                sTmpHtml = sTmpHtml.replace('{$IsVip}', '<a href="http://' + this.Data.Domain[i] + '.' + window.Config._AppDomain + '" target="_blank"><img src="' + window.Config._ImgPath + 'VipMember.gif" width="18" style="margin-left:5px; margin-bottom:-5px;border:none;" height="20" /></a>');
            }
            else
            {
                sTmpHtml = sTmpHtml.replace('{$IsVip}', '');
            }
            s+=sTmpHtml;
        }
        var strPage=fnPageShow(this.Page,this.PageCount,this.PageSize,'pageStr',this.FnName);
        r=r.replace('{$Li}',s).replace('{$Tr}',c).replace('{$Count}',this.Count).replace('{$Key}',this.Key).replace('{$Page}',strPage);
        if(typeof parent.parent.SearchListAd!='undefined'&&parent.parent.SearchListAd!=null)
        {
            r=r.replace('{$DisPlay}','display:block').replace('{$ADLink}','http://'+parent.parent.SearchListAd.Link.replace('http://','')).replace('{$ADImagePath}',window.Config._PicUrl + parent.parent.SearchListAd.ImagePath+'/'+parent.parent.SearchListAd.ImageName);
        }
        else
        {
            r=r.replace('{$DisPlay}','display:none');
        }
        this.Result=r;
        this.OutPut(r);
        r=null; 
        //加载显示本地搜索POP事件
        if (parent.ResultControlForm)
        {
            parent.ResultControlForm._localDataLoad(this.Data,Begin,End);
        }
    }
}
LocalSearch.prototype.ShowByPage = function(Cpage)
{
    if(Cpage)
    {
        this.Page=Cpage;
    }
    this.Show();
}
function fnInit()
{
    if(typeof searchData != 'undefined'&&searchData!=null)
    {
        var Begin  = (LS.Page-1)*(LS.PageSize);
        var End    = LS.Page*LS.PageSize;
        if(End>LS.Count)End=LS.Count;
        if(End!=0)
        {
            if (parent.ResultControlForm)
            {
                parent.ResultControlForm._localDataLoad(LS.Data,Begin,End);
            }
        }
        else
        {
            if (parent.ResultControlForm)
            {
                parent.ResultControlForm._localDataLoad(null,0,0);
            }
        }
    }
    else
    {
        if (parent.ResultControlForm)
        {
            parent.ResultControlForm._localDataLoad(null,0,0);
        }
    }
}
function fnExit()
{
    if (parent.ResultControlForm)
    {
        parent.ResultControlForm._localDataLoad(null,0,0);
    }
}