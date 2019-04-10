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
    Tab: null,
    Entity: null,
    IsMove: false,
    CopyMsg: '复制成功，请贴到你的QQ/MSN上发给你的好友！',
    ShowPop: function(id, ismove) {
        if (ismove) {
            this.IsMove = true;
        }
        else {
            this.IsMove = false;
        }
        this.Show();
        if (this.CID != id) {
            this.$('divLoading').style.display = '';
        }
        else {
            if (this.Entity != null && this.Entity.CompanyID == this.CID) {
                this.$('divLoading').style.display = 'none';
                return;
            }
        }

        this.CID = id;
        var url = this.Config.EDataCenterUrl + 'CommMap5.0/EntityInfo.aspx?domain=' + this.Config.Domain + '&l=' + this.Config.Language + '&req=1&id=' + id + '&indexversion=6';
        ENetwork.DownloadScript(url, this.LoadPopData.bind(this));
    },
    LoadPopData: function() {
        if (typeof _EntityInfo != 'undefined' && _EntityInfo.CompanyInfoDetail[0]) {
            var o = this.Entity = _EntityInfo.CompanyInfoDetail[0];

            //兼容地图初始定位移动
            if (this.IsMove) {
                vM.MoveEntity(this.ID, o.X * 1, o.Y * 1);
                MoveTo(o.X * 1 + vM.GetMapPos(66), o.Y * 1 + vM.GetMapPos(-96), true);
            }
            this.$('Name_h3').innerHTML = '<span class="Til">' + o.OCName + '</span>';
            if (o.CustomDomain > 0) {
                this.$('Img_a').href = 'http://' + o.MCI_Internet.replace('http://', '');
            }
            else {
                this.$('Img_a').href = this.Config.HuangyeUrl + 'ShopView.aspx?id=' + o.CompanyID;
            }
            this.$('Img_a').target = '_blank';
            this.$('Img_img').src = this.Config.ImgUrl + o.ImgPath + '/s' + o.ImgName;
            this.$('Img_img').onerror = this.loadImgErr.bind(this.$('Img_img'), '/Images/nophoto.jpg');


            this.$('Address_p').innerHTML = o.Address;
            this.$('Tel_p').innerHTML = o.Telephone;
            if (o.CustomDomain > 0) {
                this.$('view_a').href = 'http://' + o.MCI_Internet.replace('http://', '');
            }
            else {
                this.$('view_a').href = this.Config.HuangyeUrl + 'ShopView.aspx?id=' + o.CompanyID;
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
            //统计和广告
            parent.parent.fnCompanyGoogleStat(o.OCName);
            if (this.Config.IsBDT == 1) {
                this.onMergeSearch(o.OCName, o.MCT_TypeName, o.Keywords);
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

    },
    onMergeSearch: function(key, type, tags) {
    }
});


