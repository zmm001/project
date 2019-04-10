/*************************************************
* 实体泡泡控件 v1.1 xb 2008.10.28
*************************************************/
var EntityPopControl = Class.create();
Object.extend(EntityPopControl.prototype, ControlBase.prototype);  //继承基类


Object.extend(EntityPopControl.prototype,{
    _loadUI : function(){
        this.LoadUI('EntityPopControl');
    },
    _loadComplete : function(){
        this.$('btnClose').onclick = this.ClosePop.bind(this);
        this.$('divLoading').innerHTML = this.Config.Loading;
        this.onLoadComplete();
    },
    //实体ID
    OID : 0,
    IsMove : false,
    CopyMsg : '复制好了，发给我的QQ/MSN好友分享吧！',
    PopAD : [],
    ShowPop : function(id,ismove){
        if(ismove)
        {
            this.IsMove = true;
        }
        else
        {
            this.IsMove = false;
        }
        if(this.OID!=id)
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
        this.OID = id;
        //this.$('GoogleADIframe').src = "GoogleAD.html?rnd=" + $Rnd();
        var url=this.Config.EDataCenterUrl + 'CommMap5.0/EntityInfo.aspx?domain='+this.Config.Domain+'&l='+this.Config.Language+'&req=2&id='+id;
        ENetwork.DownloadScript(url,this.LoadPopData.bind(this));
    },
    LoadPopData : function(){
        if(typeof _EntityInfo != 'undefined' && _EntityInfo.OwnerInfoDetail[0])
        {
            var o = _EntityInfo.OwnerInfoDetail[0];
            //兼容地图初始定位移动
            if(this.IsMove)
            {
                MoveTo(o.X*1 + vM.GetMapPos(170), o.Y*1, true);
                vM.moveEntity(this.ID, o.X*1, o.Y*1);
            }
            this.$('Name_h3').innerHTML = '<span class="Til">' + o.OCName + '</span>';
            
            ///this.$('Img_a').href = this.Config.ImgUrl + o.ImgPath +'/'+ o.ImgName;
            this.$('Img_a').href = 'http://' + this.Config.Domain + '/yp/OwnerDetail.aspx?id=' + o.OwnerID;
            this.$('Img_a').target = '_blank';
            this.$('Img_img').src = this.Config.ImgUrl + o.ImgPath +'/s'+ o.ImgName;
            this.$('Img_img').onerror = this.loadImgErr.bind(this.$('Img_img'),this.Config.SkinPath+'/Images/nophoto.jpg');

            this.$('Address_p').innerHTML = '<span class="Til">' + o.Address + '</span>';
            this.$('CompanyNum_span').innerHTML = o.TotalCompanyCount;
            this.$('LiveIn_a').href = 'http://'+this.Config.Domain +'/LiveIn/Default.aspx?OwnerID=' +o.OwnerID + '&OwnerName=' + escape(o.OCName);
            
            //this.$('view_a').href= this.Config.HuangyeUrl+'OwnerView.aspx?ID='+o.OwnerID; //Map5.0黄页的URL
            this.$('view_a').href='http://'+this.Config.Domain+'/yp/OwnerDetail.aspx?id='+o.OwnerID;
            this.$('btnCavil').onclick = this.onCavil.bind(this,o.X,o.Y,o.OwnerID,o.OCName);
            
            this.$('spanCompanyList').onclick = this.onCompanyList.bind(this,o.OwnerID, o.OCName);
            this.$('btnCompanyList').onclick = this.onCompanyList.bind(this,o.OwnerID, o.OCName);
            this.$('btnBusTransfer').onclick = this.onBusTransfer.bind(this,o.X,o.Y, o.OCName);
            this.$('btnNearBySearch').onclick = this.onNearBySearch.bind(this,o.X,o.Y, o.OCName);
            this.$('btnNearByBus').onclick = this.onNearByBus.bind(this,o.X,o.Y, o.OCName);
            this.$('txtUrl').value =  'http://'+this.Config.Domain +'/?oid='+o.OwnerID;
            this.$('btnCopy').onclick = this.Copy.bind(this,'http://'+this.Config.Domain +'/?oid='+o.OwnerID);
            this.$('divLoading').style.display = 'none';

            if (window.__IsSourceAD) {
                window.__IsSourceAD = false;
                _script = this.$C('script');
                _script.charset = 'utf-8';
                _script.src = this.Config.EDataCenterUrl + 'ad/ads.aspx?citycode=' + this.Config.CityCode + '&l=' + this.Config.Language + '&key=laiyuanpaopao&domid=RowNav';
                this.Body.contentWindow.document.getElementsByTagName('head')[0].appendChild(_script);
            }
            else {
                if (!this.HasLoadAd) {
                    this.HasLoadAd = true;
                    _script = this.$C('script');
                    _script.charset = 'utf-8';
                    _script.src = this.Config.EDataCenterUrl + 'ad/ads.aspx?citycode=' + this.Config.CityCode + '&l=' + this.Config.Language + '&key=dingweipaopao&domid=RowNav';
                    this.Body.contentWindow.document.getElementsByTagName('head')[0].appendChild(_script);
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
//        this.parentNode.href = 'javascript:;';
//        this.parentNode.target = '_self';
    },
    onCavil : function(x,y,id,name)
    {
        
    },
    
    onCompanyList : function(oid, ocname)
    {
        
    },
    onBusTransfer : function(x, y, ocname)
    {
    },
    onNearBySearch : function(x, y, ocname)
    {
        
    },
    onNearByBus : function(x, y, ocname)
    {
    
    }
});


