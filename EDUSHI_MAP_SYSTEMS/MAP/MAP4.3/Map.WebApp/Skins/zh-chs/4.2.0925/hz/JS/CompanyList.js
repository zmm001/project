var _EPage=new PageCard();
function PageCard(){}
PageCard.prototype.Page=1;
PageCard.prototype.Count=0;
PageCard.prototype.PageSize=4;
PageCard.prototype.PageCount=1;
PageCard.prototype.Owner='';
PageCard.prototype.OutPut=function(s){};
PageCard.prototype.Init=function(){
    this.Page=1;
    this.PageCount=1;
    this.Count=0;
    this.Owner='';
}
PageCard.prototype.Show=function(o){
    if(typeof o=="object"){this.Owner=o;_COwner=o;}
    var t='<div class="Number"><span>收录{$count}家企业</span><span style="float:right;">[<a href="http://' + window.Config._AppDomain + '/LiveIn/Default.aspx?OwnerID=' + fnRequest('oid') + '&OwnerName=' + fnRequest('oname') + '" target="_blank">企业入驻</a>]</span></div><ul class="ShowList">{$Record}</ul><div class="Fpage">{$PageStr}</div>';                 
    var strRecord='<li style="overflow:hidden;"><a href="{$Url}" style="{$Style}" target="_blank" title="{$CompanyName}">{$CompanyName}{$VipIcon}</a></li>';
    var strVipRecord = '<li style="overflow:hidden;"><a href="{$Domain}" style="{$Style}" target="_blank" title="{$CompanyName}">{$CompanyName}</a><a href="{$Domain}" target="_blank"><img src="' + window.Config._ImgPath + 'VipMember.gif" width="18" style="margin-left:5px; margin-bottom:-5px;border:none;" height="20" /></a></li>';
    var strRecordTemp='';
    if(this.Owner.cGroup){
        if(this.Page==1){
            var recordsize=this.Owner.cGroup.length;
            this.Count=this.Owner.cGroup.length;
            if(recordsize%(this.PageSize)==0){
                this.PageCount=recordsize/(this.PageSize);
            }else{
                this.PageCount=int(recordsize,(this.PageSize))+1;
            }
        }
        var intBegin  = (this.Page-1)*(this.PageSize);
        var intEnd    = this.Page*(this.PageSize);
        if(intEnd>this.Count){
            intEnd=this.Count;
        }
        for(i=intBegin;i<intEnd;i++){
            //杭州添加E店链接及图标
            var sUrl,sVipIcon;
            if (this.Owner.cGroup[i].Vip*1 > 0)
            {
                sUrl = window.Config._BendiUrl + 'VipStore/' + this.Owner.cGroup[i].Vip + '/Index.aspx?City=' + window.Config._CityCode + '&StoreID=' + this.Owner.cGroup[i].ComID;
                sVipIcon = '<img src="' + window.Config._ImgPath + 'Edian.gif" alt="E店" style="margin:0 0 -7px 3px; border:none" />';
            }
            else
            {
                sUrl = window.Config._LocalUrl + 'Shop/' + this.Owner.cGroup[i].ComID + '.shtml';
                sVipIcon = '';
            }
            
            strRecordTemp +=strRecord.replaceAll('{$CompanyName}',this.Owner.cGroup[i].CompanyName).replace('{$CompanyID}',this.Owner.cGroup[i].ComID).replace('{$Style}', this.Owner.cGroup[i].ComStyle).replace('{$Url}', sUrl).replace('{$VipIcon}', sVipIcon);
        }
        var strPage=fnPageShow(this.Page,this.PageCount,this.PageSize,'pageStr','fnEntrInfoByPage');
        t = t.replace('{$PageStr}',strPage);
    }else{
        t = t.replace('{$PageStr}','');
    }
    t = t.replace('{$Record}',strRecordTemp).replace('{$count}',this.Count);
    document.body.innerHTML = t;
}
function fnEntrInfoByPage(c){
    if(c){
        _EPage.Page=c;
    }
    _EPage.Show();
}
function fnOnload()
{
    if (!window.Config)
    {
        setTimeout('fnOnload()', 200);
        return;
    }
    document.body.innerHTML=window.Config._Loading;
    var url=window.Config._EDataCenterUrl + 'CommMap/EntityInfo.aspx?node='+window.Config._Node+'&l='+window.Config._L+'&v=1.0&req=3&id='+fnRequest('oid');
    ENetwork.DownloadScript(url,function(){
        if (typeof o != 'undefined')
        {
            _EPage.Show(o);
        }
    });
}
window.onload=fnOnload;