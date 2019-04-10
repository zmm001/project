var CommendPopControl = Class.create();
Object.extend(CommendPopControl.prototype, ControlBase.prototype);

Object.extend(CommendPopControl.prototype, {
    _loadUI: function() {
        this.LoadUI('CommendPopControl');
    },
    CID: 0,
    IsMove: false,
    BTID: 0,
    CopyMsg: '复制好了，发给我的QQ/MSN好友分享吧！',
    Tab: null,
    IsReady: false,
    ShowPop: function(id, btid, ismove) {
        this.BTID = btid;
        if (ismove) {
            this.IsMove = true;
        } else {
            this.IsMove = false;
        }
        if (this.CID != id) {
            this.$('divLoading').style.display = '';
            this.Show();
        } else {
            this.$('divLoading').style.display = 'none';
            this.Show();
            return;
        }
        this.CID = id;
        var url = this.Config.DataCetnerMapDataUrl + 'Map7.0/ThemeMaps.aspx?citycode=' + this.Config.CityCode + '&l=' + this.Config.Language + '&req=4&id=' + id;
        ENetwork.DownloadScript(url, this.LoadPopData.bind(this));
    },
    LoadPopData: function() {
        if (typeof _ThemeInfo != 'undefined' && _ThemeInfo.length > 0) {
            var o = _ThemeInfo[0];
            if (this.Tab) {
                this.Tab.destroy();
            }
            this.Tab = parent.parent.fnOpenMergeSearch(o.BCC_CompanyName, 0, '', 0, 0, 0, 0, 0, '', '', this.Config.CityName);
            //兼容地图初始定位移动
            if (this.IsMove) {
                vM.MoveEntity(this.ID, o.X * 1, o.Y * 1);
                MoveTo(o.X * 1 + vM.GetMapPos(66), o.Y * 1 + vM.GetMapPos(-96), true);
            }
            this.$('Name_h3').innerHTML = '<span class="Til">' + o.BCC_CompanyName + '</span>'; //标题
            this.$('divContent').innerHTML = o.BCC_Remark; //内容
            this.$('divLoading').style.display = 'none';
            this.$('btnBusTransfer').onclick = this.onBusTransfer.bind(this, o.X, o.Y, o.BCC_CompanyName);
            //this.$('btnNearBySearch').onclick = this.onNearBySearch.bind(this, o.X, o.Y, o.BCC_CompanyName);
            this.$('btnNearByBus').onclick = this.onNearByBus.bind(this, o.X, o.Y, o.BCC_CompanyName);
            //this.$('btnCavil').onclick = this.onCavil.bind(this, o.X, o.Y, this.CID, o.BCC_CompanyName); //纠错
            this.$('txtUrl').value = 'http://' + this.Config.Domain + '/?tid=' + this.BTID + '&sid=' + this.CID + '&tname=' + escape(o.BCC_CompanyName);
            this.$('btnCopy').onclick = this.Copy.bind(this, 'http://' + this.Config.Domain + '/?tid=' + this.BTID + '&sid=' + this.CID + '&tname=' + escape(o.BCC_CompanyName));

            //广告
            _script = this.$C('script');
            _script.charset = 'utf-8';
            _script.src = this.Config.DataCetnerAdDataUrl + 'Ad2.0/ads.aspx?citycode=' + this.Config.CityCode + '&l=' + this.Config.Language + '&key=qiyepaopao&domid=RowNav';
            this.Body.contentWindow.document.getElementsByTagName('head')[0].appendChild(_script);
            //统计和广告
            parent.parent.fnGoogleStat(o.BCC_CompanyName);
        }
    },
    _loadComplete: function() {
        this.Body.contentWindow.CommendPopControl = this;
        this.$('btnClose').onclick = this.ClosePop.bind(this);
        this.$('divLoading').innerHTML = this.Config.Loading;
        this.onLoadComplete(this);
    },
    /*直接显示Pop内容*/
    ShowPopData: function(x, y, title, content) {
        this.$('Name_h3').innerHTML = title;
        this.$('divContent').innerHTML = content;
        vM.MoveEntity(this.ID, x * 1, y * 1);
        MoveTo(o.X * 1 + vM.GetMapPos(66), o.Y * 1 + vM.GetMapPos(-96), true);
        this.$('divLoading').style.display = 'none';
        this.Show();
    },
    CheckReady: function() {
        return this.IsReady;
    },
    ClosePop: function() {
        this.Hide();
    },
    onBusTransfer: function(x, y, ocname) {
    },
    Copy: function(url) {
        fnCopyToClipboard(url, this.CopyMsg);
    },
    onNearBySearch: function(x, y, ocname) {

    },
    onNearByBus: function(x, y, ocname) {
    }
});
