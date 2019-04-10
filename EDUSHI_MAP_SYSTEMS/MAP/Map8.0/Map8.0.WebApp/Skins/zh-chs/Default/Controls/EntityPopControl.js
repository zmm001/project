var EntityPopControl = Class.create();
Object.extend(EntityPopControl.prototype, ControlBase.prototype);  //继承基类

Object.extend(EntityPopControl.prototype, {
    _loadUI: function () {
        this.LoadUI('EntityPopControl');
    },
    //实体ID
    OID: 0,
    Tab: null,
    IsMove: false,
    CopyMsg: '复制好了，发给我的QQ/MSN好友分享吧！',
    Entity: null,
    ShowPop: function (id, ismove) {
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
        var url = this.Config.DataCetnerSearchDataUrl + 'SearchMapByOwner/' + this.Config.CityCode + '/' + this.Config.Language + '/Format/Json/Search?q=' + id;
        ENetwork.DownloadScript(url, this.LoadPopData.bind(this));
    },
    LoadPopData: function () {
        if (typeof _EntityInfo != 'undefined' && _EntityInfo.length > 0) {
            var o = this.Entity = _EntityInfo[0];
            //兼容地图初始定位移动
            if (this.IsMove) {
                vM.MoveEntity(this.ID, o.X * 1, o.Y * 1);
                MoveTo(o.X * 1 + vM.GradeWin2EGIS(150), o.Y * 1 + vM.GradeWin2EGIS(-96), true);
            }
            this.$('Name_h3').innerHTML = o.OCName;
            //Google
            this.$('Img_a').href = parent.parent.fnCreateUrl(o.OwnerID, '2');
            this.$('Img_a').target = '_blank';
            this.$('Img_img').src = this.Config.ImgUrl + o.ImgPath + '/s' + o.ImgName;
            this.$('Img_img').onerror = this.loadImgErr.bind(this.$('Img_img'), '/Images/nophoto.jpg');


            this.$('Address_p').innerHTML = '地址：' + o.Address;
            this.$('CompanyNum_span').innerHTML = o.TotalCompanyCount;
            this.$('LiveIn_a').onclick = this.onLiveIn.bind(this, o.OwnerID, o.OCName, o.X, o.Y);

            this.$('view_a').href = parent.parent.fnCreateUrl(o.OwnerID, '2');
            this.$('btnCavil').onclick = this.onCavil.bind(this, o.X, o.Y, o.OwnerID, o.OCName);

            this.$('CompanyNum_span').onclick = this.onCompanyList.bind(this, o.OwnerID, o.OCName, o.X, o.Y);
            
            this.$('zbsearch').onclick = this.SwicthCase.bind(this, 'zb');
            this.$('gotosearch').onclick = this.SwicthCase.bind(this, 'goto');
            this.$('fromsearch').onclick = this.SwicthCase.bind(this, 'from');
            var tempUrl = 'http://' + this.Config.Domain + '/o' + o.OwnerID + '.html';
            this.$('txtUrl').value = tempUrl;
            this.$('btnCopy').onclick = this.Copy.bind(this, tempUrl);
            this.$('hidBusName').value = o.OCName;
            //this.$('busswitch').onclick = this.BusSwitch.bind(this);
            this.$('busSearch1').onclick = this.BusSearch.bind(this, 1);
            this.$('busSearch2').onclick = this.BusSearch.bind(this, 2);
            this.$('driveSearch1').onclick = this.DriveSearch.bind(this, 1);
            this.$('driveSearch2').onclick = this.DriveSearch.bind(this, 2);
            //this.$('bustext_start').value = '';
            this.$('btnRangText').value = '请输入关键字';
            this.$('btnHotelSearch').onclick = this.BtnRangSearch.bind(this, 'hotel', o.X, o.Y, o.OCName);
            this.$('btnFineFoodSearch').onclick = this.BtnRangSearch.bind(this, 'food', o.X, o.Y, o.OCName);
            this.$('btnFeatureSpotSearch').onclick = this.BtnRangSearch.bind(this, 'feature', o.X, o.Y, o.OCName);
            //this.$('btnBankSearch').onclick = this.BtnRangSearch.bind(this, 'bank', o.X, o.Y, o.OCName);
            //this.$('btnDianSearch').onclick = this.BtnRangSearch.bind(this, 'edian', o.X, o.Y, o.OCName);
            //this.$('btnNearByBus').onclick = this.onNearByBus.bind(this, o.X, o.Y, o.OCName);
            this.$('btnOtherSearch').onclick = this.BtnRangSearch.bind(this, 'other', o.X, o.Y, o.OCName);
            var temptitle = "我正在查【" + o.OCName + "-" + o.Address + "】E都市三维地图|edushi.com";
            this.$('sinaShare').href = "javascript:void((function(s,d,e){try{}catch(e){}var f='http://v.t.sina.com.cn/share/share.php?',u='" + tempUrl + "',p=['url=',e(u),'&title=',e('" + temptitle + "'),'&appkey=1226626340'].join('');function a(){if(!window.open([f,p].join(''),'mb',['toolbar=0,status=0,resizable=1,width=620,height=450,left=',(s.width-620)/2,',top=',(s.height-450)/2].join('')))u.href=[f,p].join('');};if(/Firefox/.test(navigator.userAgent)){setTimeout(a,0)}else%20a();})(screen,document,encodeURIComponent));";
            this.$('renrenShare').href = "javascript:void((function(s,d,e){if(/xiaonei\.com/.test('" + tempUrl + "'))return;var%20f='http://share.xiaonei.com/share/buttonshare.do?link=',u='" + tempUrl + "',l='" + temptitle + "',p=[e(u),'&title=',e(l)].join('');function%20a(){if(!window.open([f,p].join(''),'xnshare',['toolbar=0,status=0,resizable=1,width=626,height=436,left=',(s.width-626)/2,',top=',(s.height-436)/2].join('')))u.href=[f,p].join('');};if(/Firefox/.test(navigator.userAgent))setTimeout(a,0);else%20a();})(screen,document,encodeURIComponent));";
            this.$('qqShare').onclick = this.BtnShare.bind(this, 'qq', temptitle, tempUrl);
            this.$('kaixinShare').href = "javascript:d=document;t=d.selection?(d.selection.type!='None'?d.selection.createRange().text:''):(d.getSelection?d.getSelection():'');void(kaixin=window.open('http://www.kaixin001.com/~repaste/repaste.php?&rurl='+escape('" + tempUrl + "')+'&rtitle='+escape('" + temptitle + "')+'&rcontent='+escape('" + temptitle + "'),'kaixin'));kaixin.focus();";
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
    SwicthCase: function (tab) {
        switch (tab) {
            case 'zb':
                this.$('zblist').style.display = '';
                this.$('gotolist').style.display = 'none';
                this.$('fromlist').style.display = 'none';
                this.$('zbsearch').className = this.$('zbsearch').className + ' current';
                this.$('gotosearch').className = 'go-here';
                this.$('fromsearch').className = 'from-here';
                break;
            case 'goto':
                this.$('zblist').style.display = 'none';
                this.$('gotolist').style.display = '';
                this.$('fromlist').style.display = 'none';
                this.$('zbsearch').className = 'nearby-search';
                this.$('gotosearch').className = this.$('gotosearch').className + ' current';
                this.$('fromsearch').className = 'from-here';
                break;
            case 'from':
                this.$('zblist').style.display = 'none';
                this.$('gotolist').style.display = 'none';
                this.$('fromlist').style.display = '';
                this.$('zbsearch').className = 'nearby-search';
                this.$('gotosearch').className = 'go-here';
                this.$('fromsearch').className = this.$('fromsearch').className + ' current';
                break;
        }
    },
    BusSwitch: function () {
        var txtstart = this.$('bustext1').value.trim();
        var txtend = this.$('bustext2').value.trim();

        this.$('bustext1').value = txtend;
        this.$('bustext2').value = txtstart;
    },
    BusSearch: function (type) {
        var sStartStation = "";
        var sEndStation = "";
        if (type == 1) {
            if (this.$('bustext_start').value.trim() == '' || this.$('bustext_start').value.trim() == '请输入起点') {
                this.$('bustext_start').focus();
                return;
            }
            else {
                sStartStation = this.$('bustext_start').value.trim();
                sEndStation = this.$('hidBusName').value.trim();
            }
        }
        else if (type == 2) {
            if (this.$('bustext_end').value.trim() == '' || this.$('bustext_end').value.trim() == '请输入终点') {
                this.$('bustext_end').focus();
                return;
            }
            else {
                sStartStation = this.$('hidBusName').value.trim();
                sEndStation = this.$('bustext_end').value.trim();
            }
        }
        if (sStartStation != '' && sEndStation != '') {
            parent.fnAddBusTransferSearchTab(sStartStation, sEndStation, 0);
        }
    },
    DriveSearch: function (type) {
        var sStartStation = "";
        var sEndStation = "";
        if (type == 1) {
            if (this.$('bustext_start').value.trim() == '' || this.$('bustext_start').value.trim() == '请输入起点') {
                this.$('bustext_start').focus();
                return;
            }
            else {
                sStartStation = this.$('bustext_start').value.trim();
                sEndStation = this.$('hidBusName').value.trim();
            }
        }
        else if (type == 2) {
            if (this.$('bustext_end').value.trim() == '' || this.$('bustext_end').value.trim() == '请输入终点') {
                this.$('bustext_end').focus();
                return;
            }
            else {
                sStartStation = this.$('hidBusName').value.trim();
                sEndStation = this.$('bustext_end').value.trim();
            }
        }
        if (sStartStation != '' && sEndStation != '') {
            if (parent.vM.MapState.Succeed) {
                parent.vM.MapSwitch.Switch2D();
                //vM.SwitchMap(1);
            }
            setTimeout(function () { fnSearchChange('DriveSearch'); }, 1000);
            parent.fnAddDriveTransferSearchTab(sStartStation, sEndStation, "");
        }
    },
    BtnRangSearch: function (key, x, y, oName) {
        switch (key) {
            case 'hotel':
                parent.rangeSearch(x, y, '酒店|宾馆', oName, 'entity', this.OID);
                break;
            case 'food':
                parent.rangeSearch(x, y, '美食', oName, 'entity', this.OID);
                break;
            case 'feature':
                parent.rangeSearch(x, y, '景点', oName, 'entity', this.OID);
                break;
            //            case 'bank':
            //                parent.rangeSearch(x, y, '银行|ATM', oName, 'entity', this.OID);
            //                break;
            //            case 'edian':
            //                parent.rangeDianSearch(x, y, '店铺', oName, 'entity', this.OID);
            //                break;
            case 'other':
                if (this.$('btnRangText').value.trim() != '' && this.$('btnRangText').value.trim() != "请输入关键字") {
                    parent.rangeSearch(x, y, this.$('btnRangText').value.trim(), oName, 'entity', this.OID);
                }
                else {
                    this.$('btnRangText').focus();
                }
                break;
        }
    },
    BtnShare: function (type, title, url) {
        switch (type) {
            case 'sina':
                break;
            case 'qq':
                window.open('http://v.t.qq.com/share/share.php?title=' + encodeURIComponent(title) + '&url=' + encodeURIComponent(url) + '&rcontent=', '_blank', 'scrollbars=no,width=600,height=450,left=75,top=20,status=no,resizable=yes');
                break;
        }
    },
    _loadComplete: function () {
        this.Body.contentWindow.EntityPopControl = this;
        this.$('btnClose').onclick = this.ClosePop.bind(this);
        this.$('divLoading').innerHTML = this.Config.Loading;
        this.onLoadComplete(this);
    },
    ClosePop: function () {
        this.Hide();
    },
    Copy: function (url) {
        fnCopyToClipboard(url, this.CopyMsg);
    },
    loadImgErr: function (imgpath) {
        if (this.src == imgpath) {
            return;
            //默认图片加载失败则不再触发 , ie7光设置 this.onerror=null; 无效
        }
        this.src = imgpath;
        this.onerror = null;
        //        this.parentNode.href = 'javascript:;';
        //        this.parentNode.target = '_self';
    },
    onCavil: function (x, y, id, name) {

    },

    onCompanyList: function (oid, ocname, x, y) {

    },
    onBusTransfer: function (x, y, ocname) {
    },
    onNearBySearch: function (x, y, ocname) {

    },
    onNearByBus: function (x, y, ocname) {

    },
    onLiveIn: function (id, name, x, y) {
    },
    onMergeSearch: function (key) {
    }

});


