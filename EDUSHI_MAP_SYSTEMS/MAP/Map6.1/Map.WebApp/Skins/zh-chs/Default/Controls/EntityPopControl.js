/*************************************************
* 实体泡泡控件 v1.1 xb 2008.10.28
*************************************************/
var EntityPopControl = Class.create();
Object.extend(EntityPopControl.prototype, ControlBase.prototype);  //继承基类


Object.extend(EntityPopControl.prototype, {
    _loadUI: function() {
        this.LoadUI('EntityPopControl');
    },
    _loadComplete: function() {
        this.$('btnClose').onclick = this.ClosePop.bind(this);
        this.$('divLoading').innerHTML = this.Config.Loading;
        this.onLoadComplete();
    },
    //实体ID
    OID: 0,
    Tab: null,
    IsMove: false,
    CopyMsg: '复制好了，发给我的QQ/MSN好友分享吧！',
    Entity: null,
    ShowPop: function(id, ismove) {
        parent.parent.__IsEntityPopOn = true;
        if (ismove) {
            this.IsMove = true;
        }
        else {
            this.IsMove = false;
        } 
        this.Show();
        if (this.OID != id) {
            this.$('divLoading').style.display = '';
        }
        else {
            if (this.Entity != null && this.Entity.OwnerID == this.OID) {
                this.$('divLoading').style.display = 'none';
                if (this.Tab == null) {
                        this.onMergeSearch(this.Entity.OCName);
                    }
               
                return;
            }
        }
        this.OID = id;
        var url = this.Config.EDataCenterUrl + 'CommMap5.0/EntityInfo.aspx?domain=' + this.Config.Domain + '&l=' + this.Config.Language + '&req=2&id=' + id + '&indexversion=6';
        ENetwork.DownloadScript(url, this.LoadPopData.bind(this));
    },
    LoadPopData: function() {
        if (typeof _EntityInfo != 'undefined' && _EntityInfo.OwnerInfoDetail[0]) {
            var o = this.Entity = _EntityInfo.OwnerInfoDetail[0];

            //兼容地图初始定位移动
            if (this.IsMove) {
                vM.MoveEntity(this.ID, o.X * 1, o.Y * 1);
                MoveTo(o.X * 1 + vM.GetMapPos(66), o.Y * 1 + vM.GetMapPos(-96), true);
            }
            this.$('Name_h3').innerHTML = '<span class="Til">' + o.OCName + '</span>';
            //Google
            //this.$('sbi').value = o.OCName;
            //this.$('Img_a').href = this.Config.ImgUrl + o.ImgPath +'/'+ o.ImgName;
            this.$('Img_a').href = 'http://'+this.Config.Domain+'/yp/OwnerDetail.aspx?id='+o.OwnerID;
            this.$('Img_a').target = '_blank';
            this.$('Img_img').src = this.Config.ImgUrl + o.ImgPath + '/s' + o.ImgName;
            this.$('Img_img').onerror = this.loadImgErr.bind(this.$('Img_img'), '/Images/nophoto.jpg');


            this.$('Address_p').innerHTML = '<span class="Til">' + o.Address + '</span>';
            this.$('CompanyNum_span').innerHTML = o.TotalCompanyCount;
            this.$('LiveIn_a').onclick = this.onLiveIn.bind(this, o.OwnerID, o.OCName);

            this.$('view_a').href = 'http://'+this.Config.Domain+'/yp/OwnerDetail.aspx?id='+o.OwnerID;
            this.$('btnCavil').onclick = this.onCavil.bind(this, o.X, o.Y, o.OwnerID, o.OCName);

            this.$('spanCompanyList').onclick = this.onCompanyList.bind(this, o.OwnerID, o.OCName);
            this.$('btnCompanyList').onclick = this.onCompanyList.bind(this, o.OwnerID, o.OCName);
            this.$('btnBusTransfer').onclick = this.onBusTransfer.bind(this, o.X, o.Y, o.OCName);
            this.$('btnNearBySearch').onclick = this.onNearBySearch.bind(this, o.X, o.Y, o.OCName);
            this.$('btnNearByBus').onclick = this.onNearByBus.bind(this, o.X, o.Y, o.OCName);
            this.$('txtUrl').value = 'http://' + this.Config.Domain + '/?oid=' + o.OwnerID;
            this.$('btnCopy').onclick = this.Copy.bind(this, 'http://' + this.Config.Domain + '/?oid=' + o.OwnerID);
            this.$('divLoading').style.display = 'none';
            //广告
            if (window.__IsSourceAD) {
                window.__IsSourceAD = false;
                _script = this.$C('script');
                _script.charset = 'utf-8';
                _script.src = this.Config.EDataCenterUrl + 'ad/ads.aspx?citycode=' + this.Config.CityCode + '&l=' + this.Config.Language + '&key=shitipaopao&domid=RowNav';
                this.Body.contentWindow.document.getElementsByTagName('head')[0].appendChild(_script);
            }
            else {
                if (!this.HasLoadAd) {
                    this.HasLoadAd = true;
                    _script = this.$C('script');
                    _script.charset = 'utf-8';
                    _script.src = this.Config.EDataCenterUrl + 'ad/ads.aspx?citycode=' + this.Config.CityCode + '&l=' + this.Config.Language + '&key=shitipaopao&domid=RowNav';
                    this.Body.contentWindow.document.getElementsByTagName('head')[0].appendChild(_script);
                }
            }
            parent.parent.fnEntityGoogleStat(o.OCName);
      
                this.onMergeSearch(o.OCName);
         
            var reg = new RegExp("酒店|宾馆|饭店");
           if (reg.test(o.OCName))
             {               
                    var strurl = "http://"+this.Config.Domain+"/ExistHotel.aspx?HotelList="+escape(o.OCName)+"&CityCode="+this.Config.CityCode;
                    ENetwork.DownloadScript(strurl, this.LoadHotelXML.bind(this));
             }
             else 
             {
                 this.$('HotelXML').innerHTML="查看详情>>";
                 this.$('view_a').Title='查看详情';
             }
            
        }
           
    },
                      ///////////////////tmm 2010.3.1//////////////////////////////
       LoadHotelXML:function(){
                if(typeof ExistHotel!='undefined' &&  typeof this.Entity != 'undefined')
                {
                if ( ExistHotel[0] == '1') {   
                  this.$('HotelXML').innerHTML="<font color='#000000' style='font-weight:bold'>查看详情并预订</font>";
                  this.$('view_a').href='http://'+this.Config.Domain+'/yp/HotelOwner.aspx?id='+this.Entity.OwnerID;
                  }
                }
                else 
                {
                 this.$('HotelXML').innerHTML="查看详情>>";
                 this.$('view_a').Title='查看详情';
              
                }
            },
           
            /////////////////////////////////////////////////
    ClosePop: function() {
        parent.parent.__IsEntityPopOn = false;
        this.Hide();
    },
    Copy: function(url) {
        fnCopyToClipboard(url, this.CopyMsg);
    },
    loadImgErr: function(imgpath) {
        if (this.src == imgpath) {
            return;
            //默认图片加载失败则不再触发 , ie7光设置 this.onerror=null; 无效
        }
        this.src = imgpath;
        this.onerror = null;
        //        this.parentNode.href = 'javascript:;';
        //        this.parentNode.target = '_self';
    },
    onCavil: function(x, y, id, name) {

    },

    onCompanyList: function(oid, ocname) {

    },
    onBusTransfer: function(x, y, ocname) {
    },
    onNearBySearch: function(x, y, ocname) {

    },
    onNearByBus: function(x, y, ocname) {

    },
    onLiveIn: function(id, name) {
    },
    onMergeSearch: function(key) {
    }

});


