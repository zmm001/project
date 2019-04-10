/*************************************************
* 主题企业泡泡控件 v1.1 xb 2008.10.28
*************************************************/
var ThemePopControl = Class.create();
Object.extend(ThemePopControl.prototype, ControlBase.prototype);  //继承基类


Object.extend(ThemePopControl.prototype,{
    _loadUI : function(){
        this.LoadUI('CompanyPopControl');
    },
    _loadComplete : function(){
        this.$('btnClose').onclick = this.ClosePop.bind(this);
        this.$('divLoading').innerHTML = this.Config.Loading;
        this.onLoadComplete();
    },
    //企业ID
    TID : 0,
    IsMove : false,
    PopAD : [],    //泡泡图片广告
    CopyMsg : '复制好了，发给我的QQ/MSN好友分享吧！',
    ShowPop : function(id,ismove){
        if(ismove)
        {
            this.IsMove = true;
        }
        else
        {
            this.IsMove = false;
        }
        if(this.TID!=id)
        {
            this.$('divLoading').style.display='';
            this.Show();
        }
        else
        {
            this.$('divLoading').style.display='none';
            this.Show();
            return;
        }
        this.TID = id;
        var url=this.Config.EDataCenterUrl + 'CommMap5.0/ThemeMaps.aspx?domain='+this.Config.Domain+'&l='+this.Config.Language+'&req=4&id='+id;//主题地图数据获取
        ENetwork.DownloadScript(url,this.LoadPopData.bind(this));
    },
    LoadPopData : function(){
        if(_ThemeInfo.ThemeInfoDeatil[0])
        {
            var o = _ThemeInfo.ThemeInfoDeatil[0];
            
            //兼容地图初始定位移动
            if(this.IsMove)
            {
                MoveTo(o.X*1  + vM.GetMapPos(170), o.Y*1, true);
                vM.moveEntity(this.ID, o.X*1, o.Y*1);
            }
            
            this.$('Name_h3').innerHTML = o.BCC_CompanyName;
            
            this.$('Img_a').href = this.Config.ImgUrl + o.MCP_ImgPath +'/'+ o.MCP_ImgName;
            this.$('Img_a').target = '_blank';
            this.$('Img_img').src = this.Config.ImgUrl + o.MCP_ImgPath +'/s'+ o.MCP_ImgName;
            this.$('Img_img').onerror = this.loadImgErr.bind(this.$('Img_img'),this.Config.SkinPath+'/Images/nophoto.jpg');
            
            
            this.$('Address_p').innerHTML = o.BCC_Address;
            this.$('Tel_p').innerHTML = o.BCC_Tel;
            
           // this.$('view_a').href = this.Config.BendiUrl + 'hz/Shop/'+ o.BCC_CompanyID +'.shtml';
            this.$('view_a').href='http://'+this.Config.Domain+'/yp/CompanyDetail.aspx?id='+o.BCC_CompanyID;
            this.$('btnCavil').onclick = this.onCavil.bind(this,o.X,o.Y,o.BCC_CompanyID,o.BCC_CompanyName);
            
            
            this.$('btnBusTransfer').onclick = this.onBusTransfer.bind(this,o.X,o.Y,o.BCC_CompanyName);
            this.$('btnNearBySearch').onclick = this.onNearBySearch.bind(this,o.X,o.Y,o.BCC_CompanyName);
            this.$('btnNearByBus').onclick = this.onNearByBus.bind(this,o.X,o.Y,o.BCC_CompanyName);
            this.$('txtUrl').value =  'http://'+this.Config.Domain +'/?tid='+this.TID;
            this.$('btnCopy').onclick = this.Copy.bind(this,'http://'+this.Config.Domain +'/?tid='+this.TID);
            this.$('divLoading').style.display='none';
            //广告
            if(window._StaticAd != 'undefined')
            {
                if(window.__IsSourceAD)
                {
                    if(window._StaticAd.SourcePopAd.length > 0)
                    {
                        window.__IsSourceAD = false;
                        this.PopAD = window._StaticAd.SourcePopAd[0];
                        this.$('AD_a').href = 'http://'+this.PopAD.MAI_ImageLink.replace('http://','');
                        this.$('AD_img').src = this.Config.PicUrl + this.PopAD.MAI_ImagePath+'/'+this.PopAD.MAI_ImageName;
                    }                
                }
                else
                {
                    if(window._StaticAd.PopupWindowAd.length > 0)
                    {
                        this.PopAD = window._StaticAd.PopupWindowAd[0];
                        this.$('AD_a').href = 'http://'+this.PopAD.MAI_ImageLink.replace('http://','');
                        this.$('AD_img').src = this.Config.PicUrl + this.PopAD.MAI_ImagePath+'/'+this.PopAD.MAI_ImageName;
                    }
                }
            }
        }
    },
    ClosePop : function()
    {
        this.Hide();
    },
    Copy  : function(url)
    {
        fnCopyToClipboard(url,this.CopyMsg);
    },
    loadImgErr : function(imgpath){
        if (this.src == imgpath)
        {
            return;
             //默认图片加载失败则不再触发 , ie7光设置 this.onerror=null; 无效
        }
        this.src=imgpath;
        this.onerror=null;
        this.parentNode.href = 'javascript:;';
        this.parentNode.target = '_self';
    },
    onCavil : function(x,y,id,name)
    {
        
    },
    onBusTransfer : function(x,y,cname)
    {
    },
    onNearBySearch : function(x,y,cname)
    {
        
    },
    onNearByBus : function(x,y,cname)
    {
    
    }
});
