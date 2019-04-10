/*************************************************
* 主题企业泡泡控件 v1.1 xb 2008.10.28
*************************************************/
var ThemePopControl = Class.create();
Object.extend(ThemePopControl.prototype, ControlBase.prototype);  //继承基类


Object.extend(ThemePopControl.prototype, {
    _loadUI: function() {
        this.LoadUI('CompanyPopControl');
    },
    _loadComplete: function() {
        this.$('btnClose').onclick = this.ClosePop.bind(this);
        this.$('divLoading').innerHTML = this.Config.Loading;
        this.onLoadComplete();
    },
    //企业ID
    TID: 0,
    IsMove: false,
    Entity: null,
    CopyMsg: '复制好了，发给我的QQ/MSN好友分享吧！',
    Tab: null,
    ShowPop: function(id, ismove) {
        if (ismove) {
            this.IsMove = true;
        }
        else {
            this.IsMove = false;
        }
        this.Show();
        if (this.TID != id) {
            this.$('divLoading').style.display = '';
        }
        else {
            if (this.Entity != null && this.Entity.BCC_CompanyID == this.TID) {
                this.$('divLoading').style.display = 'none';
                return;
            }
        }
        this.TID = id;
        var url = this.Config.EDataCenterUrl + 'CommMap5.0/ThemeMaps.aspx?domain=' + this.Config.Domain + '&l=' + this.Config.Language + '&req=4&id=' + id; //主题地图数据获取
        ENetwork.DownloadScript(url, this.LoadPopData.bind(this));
    },
    LoadPopData: function() {
        if (_ThemeInfo.ThemeInfoDeatil[0]) {
            var o = this.Entity = _ThemeInfo.ThemeInfoDeatil[0];
            //兼容地图初始定位移动
            if (this.IsMove) {
                vM.MoveEntity(this.ID, o.X * 1, o.Y * 1);
                MoveTo(o.X * 1 + vM.GetMapPos(66), o.Y * 1 + vM.GetMapPos(-96), true);
            }

            this.$('Name_h3').innerHTML = '<span class="Til">' + o.BCC_CompanyName + '</span>';
            this.$('Img_a').href = this.Config.ImgUrl + o.MCP_ImgPath + '/' + o.MCP_ImgName;
            this.$('Img_a').target = '_blank';
            this.$('Img_img').src = this.Config.ImgUrl + o.MCP_ImgPath + '/s' + o.MCP_ImgName;
            this.$('Img_img').onerror = this.loadImgErr.bind(this.$('Img_img'), '/Images/nophoto.jpg');


            this.$('Address_p').innerHTML = o.BCC_Address;
            this.$('Tel_p').innerHTML = o.BCC_Tel;
            if (o.CustomDomain > 0) {
                this.$('view_a').href = 'http://' + o.MCI_Internet.replace('http://', '');
            }
            else {
                this.$('view_a').href = this.Config.HuangyeUrl + 'ShopView.aspx?id=' + o.BCC_CompanyID;
            }
            this.$('btnCavil').onclick = this.onCavil.bind(this, o.X, o.Y, o.BCC_CompanyID, o.BCC_CompanyName);


            this.$('btnBusTransfer').onclick = this.onBusTransfer.bind(this, o.X, o.Y, o.BCC_CompanyName);
            this.$('btnNearBySearch').onclick = this.onNearBySearch.bind(this, o.X, o.Y, o.BCC_CompanyName);
            this.$('btnNearByBus').onclick = this.onNearByBus.bind(this, o.X, o.Y, o.BCC_CompanyName);
            this.$('txtUrl').value = 'http://' + this.Config.Domain + '/?tid=' + this.TID;
            this.$('btnCopy').onclick = this.Copy.bind(this, 'http://' + this.Config.Domain + '/?tid=' + this.TID);
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
            if (this.Config.IsBDT == 1) {
                this.onMergeSearch(o.BCC_CompanyName);
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
        this.parentNode.href = 'javascript:;';
        this.parentNode.target = '_self';
    },
    onCavil: function(x, y, id, name) {

    },
    onBusTransfer: function(x, y, cname) {
    },
    onNearBySearch: function(x, y, cname) {

    },
    onNearByBus: function(x, y, cname) {

    },
    onMergeSearch: function(key) {
    }
});
