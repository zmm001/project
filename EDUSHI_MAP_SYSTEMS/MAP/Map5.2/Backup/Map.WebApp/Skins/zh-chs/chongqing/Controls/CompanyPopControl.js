/*************************************************
* 企业泡泡控件 v1.1 xb 2008.10.28
*************************************************/
var CompanyPopControl = Class.create();
Object.extend(CompanyPopControl.prototype, ControlBase.prototype);  //继承基类


Object.extend(CompanyPopControl.prototype, {
    _loadUI: function() {
        this.LoadUI('CompanyPopControl');
    },
    _loadComplete: function() {
        this.$('btnClose').onclick = this.ClosePop.bind(this);
        this.$('divLoading').innerHTML = this.Config.Loading;
        this.onLoadComplete();
    },
    //企业ID
    CID: 0,
    IsMove: false,
    CopyMsg: '复制成功，请贴到你的QQ/MSN上发给你的好友！',
    PopAD: [],
    Tab: null,
    ShowPop: function(id, ismove) {
        if (ismove) {
            this.IsMove = true;
        }
        else {
            this.IsMove = false;
        }
        if (this.CID != id) {
            this.$('divLoading').style.display = '';
            this.Show();
        }
        else {
            this.$('divLoading').style.display = 'none';
            this.Show();
            return;
        }
        this.CID = id;
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
            this.Tab = parent.parent.fnOpenMergeSearch(o.OCName, o.Domain, o.Vip, o.MCT_TypeName, o.Keywords, this.Config.CityName);
            //兼容地图初始定位移动
            if (this.IsMove) {
                MoveTo(o.X * 1 + vM.GetMapPos(170), o.Y * 1, true);
                vM.moveEntity(this.ID, o.X * 1, o.Y * 1);
            }

            this.$('Name_h3').innerHTML = '<span class="Til">' + o.OCName + '</span>';
            //this.$('Img_a').href = this.Config.ImgUrl + o.ImgPath + '/' + o.ImgName;
            this.$('Img_a').href = 'http://' + this.Config.Domain + '/yp/CompanyDetail.aspx?id=' + o.CompanyID;
            this.$('Img_a').target = '_blank';
            this.$('Img_img').src = this.Config.ImgUrl + o.ImgPath + '/s' + o.ImgName;
            this.$('Img_img').onerror = this.loadImgErr.bind(this.$('Img_img'), this.Config.SkinPath + '/Images/nophoto.jpg');


            this.$('Address_p').innerHTML = o.Address;
            this.$('Tel_p').innerHTML = o.Telephone;

            //this.$('view_a').href= this.Config.HuangyeUrl+'ShopView.aspx?ID='+o.CompanyID; //Map5.0黄页的URL
            if (o.CompanyID == 148340) {
                this.$('view_a').href = 'http://www.cqkfxl.cn';
            }
            else {
                this.$('view_a').href = 'http://' + this.Config.Domain + '/yp/CompanyDetail.aspx?id=' + o.CompanyID;
            }
            this.$('btnCavil').onclick = this.onCavil.bind(this, o.X, o.Y, o.CompanyID, o.OCName);


            this.$('btnBusTransfer').onclick = this.onBusTransfer.bind(this, o.X, o.Y, o.OCName);
            this.$('btnNearBySearch').onclick = this.onNearBySearch.bind(this, o.X, o.Y, o.OCName);
            this.$('btnNearByBus').onclick = this.onNearByBus.bind(this, o.X, o.Y, o.OCName);
            this.$('txtUrl').value = 'http://' + this.Config.Domain + '/?cid=' + o.CompanyID;
            this.$('btnCopy').onclick = this.Copy.bind(this, 'http://' + this.Config.Domain + '/?cid=' + o.CompanyID);
            this.$('divLoading').style.display = 'none';
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


