var EntityPopControl = Class.create();
Object.extend(EntityPopControl.prototype, ControlBase.prototype);  //继承基类

Object.extend(EntityPopControl.prototype, {
    _loadUI: function() {
        this.LoadUI('EntityPopControl');
    },
    //实体ID
    OID: 0,
    Tab: null,
    IsMove: false,
    CopyMsg: '复制好了，发给我的QQ/MSN好友分享吧！',
    Entity: null,
    ShowPop: function(id, ismove) {
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
        if (this.OID != 0) {            
            this.Body.contentWindow.frames[0].location.href = this.Body.contentWindow.frames[0].location.href;
        }
        this.OID = id;        
        //var url = this.Config.EDataCenterUrl + 'CommMap5.0/EntityInfo.aspx?domain=' + this.Config.Domain + '&l=' + this.Config.Language + '&req=2&id=' + id + '&indexversion=6';
        var url = this.Config.DataCetnerSearchDataUrl + 'SearchMapByOwner/' + this.Config.CityCode + '/' + this.Config.Language + '/Format/Json/Search?q=' + id;
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
            //Google
            this.$('Img_a').href = parent.parent.fnCreateUrl(o.OwnerID, '2');
            this.$('Img_a').target = '_blank';
            this.$('Img_img').src = this.Config.ImgUrl + o.ImgPath + '/s' + o.ImgName;
            this.$('Img_img').onerror = this.loadImgErr.bind(this.$('Img_img'), '/Images/nophoto.jpg');


            this.$('Address_p').innerHTML = '<span class="Til">' + o.Address + '</span>';
            this.$('CompanyNum_span').innerHTML = o.TotalCompanyCount;
            this.$('LiveIn_a').onclick = this.onLiveIn.bind(this, o.OwnerID, o.OCName, o.X, o.Y);

            this.$('view_a').href = parent.parent.fnCreateUrl(o.OwnerID, '2');
            this.$('btnCavil').onclick = this.onCavil.bind(this, o.X, o.Y, o.OwnerID, o.OCName);

            this.$('spanCompanyList').onclick = this.onCompanyList.bind(this, o.OwnerID, o.OCName, o.X, o.Y);
            this.$('btnBusTransfer').onclick = this.onBusTransfer.bind(this, o.X, o.Y, o.OCName);
            this.$('btnNearByBus').onclick = this.onNearByBus.bind(this, o.X, o.Y, o.OCName);
            this.$('txtUrl').value = 'http://' + this.Config.Domain + '/o' + o.OwnerID+'.html';
            this.$('btnCopy').onclick = this.Copy.bind(this, 'http://' + this.Config.Domain + '/o' + o.OwnerID + '.html');
            this.$('divLoading').style.display = 'none';
            //广告      
//            _script = this.$C('script');
//            _script.charset = 'utf-8';
//            _script.src = this.Config.DataCetnerAdDataUrl + 'Ad2.0/ads.aspx?citycode=' + this.Config.CityCode + '&l=' + this.Config.Language + '&key=shitipaopao&domid=RowNav';
//            this.Body.contentWindow.document.getElementsByTagName('head')[0].appendChild(_script);

            parent.parent.fnGoogleStat(o.OCName);
            this.onMergeSearch(o.OCName);
        }

    },
    _loadComplete: function() {
        this.Body.contentWindow.EntityPopControl = this;
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

    onCompanyList: function(oid, ocname,x,y) {

    },
    onBusTransfer: function(x, y, ocname) {
    },
    onNearBySearch: function(x, y, ocname) {

    },
    onNearByBus: function(x, y, ocname) {

    },
    onLiveIn: function(id, name, x, y) {
    },
    onMergeSearch: function(key) {
    }

});


