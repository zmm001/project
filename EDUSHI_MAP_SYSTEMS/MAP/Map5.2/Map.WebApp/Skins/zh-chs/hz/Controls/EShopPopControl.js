/*************************************************
* E店泡泡控件 v1.1 xb 2008.10.28
*************************************************/
var EShopPopControl = Class.create();
Object.extend(EShopPopControl.prototype, ControlBase.prototype);  //继承基类


Object.extend(EShopPopControl.prototype, {
    _loadUI: function() {
        this.LoadUI('EShopPopControl');
    },
    _loadComplete: function() {
        this.$('btnClose').onclick = this.ClosePop.bind(this);
        this.$('divLoading').innerHTML = this.Config.Loading;
        this.onLoadComplete();
    },
    //E店企业ID
    EID: 0,
    IsMove: false,
    CopyMsg: '复制好了，发给我的QQ/MSN好友分享吧！',
    PopAD: [],
    Tab: null,
    ShowPop: function(id, ismove) {
        parent.parent.__IsEShopPopOn = true;
        if (ismove) {
            this.IsMove = true;
        }
        else {
            this.IsMove = false;
        }
        if (this.EID != id) {
            this.$('divLoading').style.display = '';
            this.Show();
        }
        else {
            this.$('divLoading').style.display = 'none';
            this.Show();
            return;
        }
        this.EID = id;
        //this.$('GoogleADIframe').src = "GoogleAD.html?rnd=" + $Rnd();
        var url = this.Config.EDataCenterUrl + 'CommMap5.0/EntityInfo.aspx?domain=' + this.Config.Domain + '&l=' + this.Config.Language + '&req=1&id=' + id;
        ENetwork.DownloadScript(url, this.LoadPopData.bind(this));
    },
    LoadPopData: function() {
        if (typeof _EntityInfo != 'undefined' && _EntityInfo.CompanyInfoDetail[0]) {
            var o = _EntityInfo.CompanyInfoDetail[0];
            if (this.Tab) {
                this.Tab.destroy();
            }
            this.Tab = parent.parent.fnOpenMergeSearch(o.OCName, o.LST_ID, o.Domain, o.CompanyID, o.LV_ID, o.LT_ID, o.LCE_ShopCard, o.Vip, o.MCT_TypeName, o.Keywords, this.Config.CityName);
            //兼容地图初始定位移动
            if (this.IsMove) {
                MoveTo(o.X * 1 + vM.GetMapPos(170), o.Y * 1, true);
                vM.moveEntity(this.ID, o.X * 1, o.Y * 1);
            }
            var Name_h3Html = [];
            Name_h3Html.push('<span class="Til">' + o.OCName + '</span>');
            if (o.LST_ID == 2) {
                Name_h3Html.push('<img src="../Images/ComMapIco1.gif" alt="商务地图" />');
            }
            else if (o.Vip > 1) {
                Name_h3Html.push('<img src="../Images/VipEdian.gif" alt="VIP E店" />');
            }
            else if (o.Vip > 0) {
                Name_h3Html.push('<img src="../Images/Edian.gif" alt="E店" />');
            }
            if (o.LCE_ShopCard * 1 > 0) {
                Name_h3Html.push('<img src="../Images/Ying.gif" alt="本店已通过营业执照认证" />');
            }
            if (o.LV_ID * 1 > 0) {
                Name_h3Html.push('<img src="../Images/Juan.gif" alt="免费下载本店优惠券" />');
            }
            if (o.LT_ID * 1 > 0) {
                Name_h3Html.push('<img src="../Images/Cu.gif" alt="本店正在促销打折" />');
            }
            this.$('Name_h3').innerHTML = Name_h3Html.join('');
            //this.$('Img_a').href = this.Config.ImgUrl + o.ImgPath +'/'+ o.ImgName;
            this.$('Img_a').href = this.Config.DianUrl + 'vipstore/' + o.LST_ID + '/Index.aspx?StoreID=' + o.CompanyID;
            this.$('Img_a').target = '_blank';
            this.$('Img_img').src = this.Config.ImgUrl + o.ImgPath + '/s' + o.ImgName;
            this.$('Img_img').onerror = this.loadImgErr.bind(this.$('Img_img'), this.Config.SkinPath + '/Images/nophoto.jpg');


            this.$('Address_p').innerHTML = o.Address;
            this.$('Tel_p').innerHTML = o.Telephone;

            if (o.CustomDomain > 0) {
                this.$('view_a').href = 'http://' + o.MCI_Internet.replace('http://', '');
            }
            else {
                if (o.Domain.trim().length > 0) {
                    this.$('view_a').href = 'http://' + o.Domain + '.' + this.Config.Domain;
                }
                else {
                    this.$('view_a').href = this.Config.DianUrl + 'vipstore/' + o.LST_ID + '/Index.aspx?StoreID=' + o.CompanyID;
                }
            }
            if (o.LST_ID == 2) {
                this.$('view_a').title = '商务地图';
                this.$('img_src').src = '../Images/ViewComMap.gif';
                this.$('img_src').alt = '商务地图';
            } else {
                this.$('view_a').title = '我要逛店';
                this.$('img_src').src = '../Images/SaileStore.gif';
                this.$('img_src').alt = '我要逛店';
            }

            this.$('btnCavil').onclick = this.onCavil.bind(this, o.X, o.Y, o.CompanyID, o.OCName);
            this.$('btnBusTransfer').onclick = this.onBusTransfer.bind(this, o.X, o.Y, o.OCName);
            this.$('btnNearBySearch').onclick = this.onNearBySearch.bind(this, o.X, o.Y, o.OCName);
            this.$('btnNearByBus').onclick = this.onNearByBus.bind(this, o.X, o.Y, o.OCName);
            this.$('txtUrl').value = 'http://' + this.Config.Domain + '/?eid=' + o.CompanyID;
            this.$('btnCopy').onclick = this.Copy.bind(this, 'http://' + this.Config.Domain + '/?eid=' + o.CompanyID);
            this.$('divLoading').style.display = 'none';
            //this.$('GoogleADIframe').src = "GoogleAD.aspx?title=" + escape(o.OCName);
            //广告
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
    ClosePop: function() {
        parent.parent.__IsEShopPopOn = false;
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
    onBusTransfer: function(x, y, ocname) {
    },
    onNearBySearch: function(x, y, ocname) {

    },
    onNearByBus: function(x, y, ocname) {

    }
});


