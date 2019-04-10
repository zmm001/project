var CompanyPopControl = Class.create();
Object.extend(CompanyPopControl.prototype, ControlBase.prototype);  //继承基类


Object.extend(CompanyPopControl.prototype, {
    _loadUI: function() {
        this.LoadUI('CompanyPopControl');
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
        if (this.CID != 0) {
            this.Body.contentWindow.frames[0].location.href = this.Body.contentWindow.frames[0].location.href;
        }
        this.CID = id;
        this.$("adiframe").contentWindow.location.reload(); 
        //var url = this.Config.EDataCenterUrl + 'CommMap5.0/EntityInfo.aspx?domain=' + this.Config.Domain + '&l=' + this.Config.Language + '&req=1&id=' + id + '&indexversion=6';
        //http://edata.edushi.com/searchdata/SearchMapByOwner /hz/zh-chs/Format/Json/Search?q=7880
        var url = this.Config.DataCetnerSearchDataUrl + 'SearchMapByCompany/' + this.Config.CityCode + '/' + this.Config.Language + '/Format/Json/Search?q=' + id;
        ENetwork.DownloadScript(url, this.LoadPopData.bind(this));
    },
    LoadPopData: function() {
        if (typeof _EntityInfo != 'undefined' && _EntityInfo.length > 0) {
            var o = this.Entity = _EntityInfo[0];

            //兼容地图初始定位移动
            if (this.IsMove) {
                vM.MoveEntity(this.ID, o.X * 1, o.Y * 1);
                MoveTo(o.X * 1 + vM.GradeWin2EGIS(66), o.Y * 1 + vM.GradeWin2EGIS(-96), true);
            }
            this.$('Name_h3').innerHTML = '<span class="Til">' + o.OCName + '</span>';
            this.$('Img_a').href = parent.parent.fnCreateUrl(o.CompanyID, '1');

            this.$('Img_a').target = '_blank';
            this.$('Img_img').src = this.Config.ImgUrl + o.ImgPath + '/s' + o.ImgName;
            this.$('Img_img').onerror = this.loadImgErr.bind(this.$('Img_img'), '/Images/nophoto.jpg');


            this.$('Address_p').innerHTML = o.Address;
            this.$('Tel_p').innerHTML = o.Telephone;
            //            if (o.CustomDomain > 0) {
            //                this.$('view_a').href = 'http://' + o.MCI_Internet.replace('http://', '');
            //            }
            //            else {

            //                this.$('view_a').href = parent.parent.fnCreateUrl(o.CompanyID, '1');
            //            }
            this.$('view_a').href = parent.parent.fnCreateUrl(o.CompanyID, '1');
            this.$('btnCavil').onclick = this.onCavil.bind(this, o.X, o.Y, o.CompanyID, o.OCName);

            this.$('btnBusTransfer').onclick = this.onBusTransfer.bind(this, o.X, o.Y, o.OCName);
            this.$('btnNearByBus').onclick = this.onNearByBus.bind(this, o.X, o.Y, o.OCName);
            this.$('txtUrl').value = 'http://' + this.Config.Domain + '/c' + o.CompanyID+'.html';
            this.$('btnCopy').onclick = this.Copy.bind(this, 'http://' + this.Config.Domain + '/c' + o.CompanyID+'.html');
            this.$('divLoading').style.display = 'none';
            //广告
//            _script = this.$C('script');
//            _script.charset = 'utf-8';
//            _script.src = this.Config.DataCetnerAdDataUrl + 'Ad2.0/ads.aspx?citycode=' + this.Config.CityCode + '&l=' + this.Config.Language + '&key=qiyepaopao&domid=RowNav';
//            this.Body.contentWindow.document.getElementsByTagName('head')[0].appendChild(_script);

            //统计和广告
            parent.parent.fnGoogleStat(o.OCName);
            this.onMergeSearch(o.OCName, o.MCT_TypeName, o.Keywords);
        }
    },
    _loadComplete: function() {
        this.Body.contentWindow.CompanyPopControl = this;
        this.$('btnClose').onclick = this.ClosePop.bind(this);
        this.$('divLoading').innerHTML = this.Config.Loading;
        this.onLoadComplete(this);
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
    onNearByBus: function(x, y, ocname) {

    },
    onMergeSearch: function(key, type, tags) {
    }
});


