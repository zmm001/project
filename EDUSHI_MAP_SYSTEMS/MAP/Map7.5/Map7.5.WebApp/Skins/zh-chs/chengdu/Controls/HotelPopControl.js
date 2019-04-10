var HotelPopControl = Class.create();
Object.extend(HotelPopControl.prototype, ControlBase.prototype);  //继承基类


Object.extend(HotelPopControl.prototype, {
    _loadUI: function () {
        this.LoadUI('HotelPopControl');
    },
    //企业ID
    CID: 0,
    Tab: null,
    Entity: null,
    IsMove: false,
    CopyMsg: '复制成功，请贴到你的QQ/MSN上发给你的好友！',
    ShowPop: function (id, ismove) {
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

        //百度广告刷新
        if (this.CID != 0) {
            this.Body.contentWindow.frames[0].location.href = this.Body.contentWindow.frames[0].location.href;
        }
        this.CID = id;
        var url = this.Config.DataCetnerSearchDataUrl + 'SearchMapByCompany/' + this.Config.CityCode + '/' + this.Config.Language + '/Format/Json/Search?q=' + id;
        ENetwork.DownloadScript(url, this.LoadPopData.bind(this));
    },
    LoadPopData: function () {
        if (typeof _EntityInfo != 'undefined' && _EntityInfo.length > 0) {
            var o = this.Entity = _EntityInfo[0];

            //兼容地图初始定位移动
            if (this.IsMove) {
                vM.MoveEntity(this.ID, o.X * 1, o.Y * 1);
                MoveTo(o.X * 1 + vM.GradeWin2EGIS(66), o.Y * 1 + vM.GradeWin2EGIS(-96), true);
            }
            this.$('Name_h3').innerHTML = o.OCName;
            this.$('Img_a').href = parent.parent.fnCreateUrl(o.CompanyID, '1');

            this.$('Img_a').target = '_blank';
            this.$('Img_img').src = this.Config.ImgUrl + o.ImgPath + '/s' + o.ImgName;
            this.$('Img_img').onerror = this.loadImgErr.bind(this.$('Img_img'), '/Images/nophoto.jpg');

            this.$('Address_p').innerHTML = '地址：' + o.Address;
            this.$('Tel_p').innerHTML = '电话：' + o.Telephone;
            this.$('houseType').innerHTML = '房型：<strong>' + o.HRT_Name + '</strong>';
            this.$('housePrice').innerHTML = o.HRT_LowPrice + '元';
            this.$('HFContent').innerHTML = o.HF_Content;
            this.$('moreHotel').href = 'http://' + this.Config.Domain + '/jd/Hotel.aspx?id=' + o.CompanyID + '#type';
            this.$('HCmtCount').href = 'http://' + this.Config.Domain + '/jd/Hotel.aspx?id=' + o.CompanyID + '#comment';
            //酒店
            var HotelUrl = '';
            if (o.LST_ID == 1 && o.Vip > 0) {
                //链接到E店酒店频道http://hz.edushi.com/dian/hotel/【E店ID】.html
                HotelUrl = this.Config.DianUrl + 'jd/' + o.CompanyID + '.html';
            }
            else {
                //链接到酒店详细页http://hangzhou.edushi.com/jd/Hotel.aspx?id=290835
                HotelUrl = 'http://' + this.Config.Domain + '/jd/Hotel.aspx?id=' + o.CompanyID;
            }
            this.$('view_a').href = HotelUrl;
            this.$('HCmtCount').innerHTML = '点评：' + o.HCmtCount;
            this.$('btnNearByBus').onclick = this.onNearByBus.bind(this, o.X, o.Y, o.OCName);
            var tempUrl = 'http://' + this.Config.Domain + '/c' + o.CompanyID + '.html';
            var temptitle = "我正在查【" + o.OCName + "-" + o.Address + "】E都市三维地图|edushi.com";
            this.$('txtUrl').value = tempUrl;
            this.$('btnCopy').onclick = this.Copy.bind(this, tempUrl);
            this.$('zbsearch').onclick = this.SwicthCase.bind(this, 'zb');
            this.$('gjsearch').onclick = this.SwicthCase.bind(this, 'gj');
            this.$('fxsearch').onclick = this.SwicthCase.bind(this, 'fx');

            this.$('bustext1').value = o.OCName;
            this.$('busswitch').onclick = this.BusSwitch.bind(this);
            this.$('busSearch').onclick = this.BusSearch.bind(this);
            this.$('bustext2').value = '';
            this.$('btnRangText').value = '请输入关键字';
            this.$('btnNearByBus').onclick = this.onNearByBus.bind(this, o.X, o.Y, o.OCName);
            this.$('btnHotelSearch').onclick = this.BtnRangSearch.bind(this, 'hotel', o.X, o.Y, o.OCName);
            this.$('btnBankSearch').onclick = this.BtnRangSearch.bind(this, 'bank', o.X, o.Y, o.OCName);
            this.$('btnDianSearch').onclick = this.BtnRangSearch.bind(this, 'edian', o.X, o.Y, o.OCName);
            this.$('btnOtherSearch').onclick = this.BtnRangSearch.bind(this, 'other', o.X, o.Y, o.OCName);

            this.$('txtUrl').value = tempUrl;
            this.$('btnCopy').onclick = this.Copy.bind(this, tempUrl);
            this.$('sinaShare').href = "javascript:void((function(s,d,e){try{}catch(e){}var f='http://v.t.sina.com.cn/share/share.php?',u='" + tempUrl + "',p=['url=',e(u),'&title=',e('" + temptitle + "'),'&appkey=1226626340'].join('');function a(){if(!window.open([f,p].join(''),'mb',['toolbar=0,status=0,resizable=1,width=620,height=450,left=',(s.width-620)/2,',top=',(s.height-450)/2].join('')))u.href=[f,p].join('');};if(/Firefox/.test(navigator.userAgent)){setTimeout(a,0)}else%20a();})(screen,document,encodeURIComponent));";
            this.$('renrenShare').href = "javascript:void((function(s,d,e){if(/xiaonei\.com/.test('" + tempUrl + "'))return;var%20f='http://share.xiaonei.com/share/buttonshare.do?link=',u='" + tempUrl + "',l='" + temptitle + "',p=[e(u),'&title=',e(l)].join('');function%20a(){if(!window.open([f,p].join(''),'xnshare',['toolbar=0,status=0,resizable=1,width=626,height=436,left=',(s.width-626)/2,',top=',(s.height-436)/2].join('')))u.href=[f,p].join('');};if(/Firefox/.test(navigator.userAgent))setTimeout(a,0);else%20a();})(screen,document,encodeURIComponent));";
            this.$('qqShare').onclick = this.BtnShare.bind(this, 'qq', temptitle, tempUrl);
            this.$('kaixinShare').href = "javascript:d=document;t=d.selection?(d.selection.type!='None'?d.selection.createRange().text:''):(d.getSelection?d.getSelection():'');void(kaixin=window.open('http://www.kaixin001.com/~repaste/repaste.php?&rurl='+escape('" + tempUrl + "')+'&rtitle='+escape('" + temptitle + "')+'&rcontent='+escape('" + temptitle + "'),'kaixin'));kaixin.focus();";

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
    _loadComplete: function () {
        this.Body.contentWindow.HotelPopControl = this;
        this.$('btnClose').onclick = this.ClosePop.bind(this);
        this.$('divLoading').innerHTML = this.Config.Loading;
        this.onLoadComplete(this);
    },
    SwicthCase: function (tab) {
        switch (tab) {
            case 'zb':
                this.$('zblist').style.display = '';
                this.$('gjlist').style.display = 'none';
                this.$('fxlist').style.display = 'none';
                this.$('zbsearch').className = 'current';
                this.$('gjsearch').className = '';
                this.$('fxsearch').className = '';
                break;
            case 'gj':
                this.$('zblist').style.display = 'none';
                this.$('gjlist').style.display = '';
                this.$('fxlist').style.display = 'none';
                this.$('zbsearch').className = '';
                this.$('gjsearch').className = 'current';
                this.$('fxsearch').className = '';
                break;
            case 'fx':
                this.$('zblist').style.display = 'none';
                this.$('gjlist').style.display = 'none';
                this.$('fxlist').style.display = '';
                this.$('zbsearch').className = '';
                this.$('gjsearch').className = '';
                this.$('fxsearch').className = 'current';
                break;
        }
    },
    BusSwitch: function () {
        var txtstart = this.$('bustext1').value.trim();
        var txtend = this.$('bustext2').value.trim();

        this.$('bustext1').value = txtend;
        this.$('bustext2').value = txtstart;
    },
    BusSearch: function () {
        if (this.$('bustext1').value.trim() == '') {
            this.$('bustext1').focus();
            return;
        }
        if (this.$('bustext2').value.trim() == '') {
            this.$('bustext2').focus();
            return;
        }
        if (this.$('bustext1').value.trim() != '' && this.$('bustext2').value.trim() != '') {
            parent.fnAddBusTransferSearchTab(this.$('bustext1').value.trim(), this.$('bustext2').value.trim(), 0);
        }
    },
    BtnRangSearch: function (key, x, y, oName) {
        switch (key) {
            case 'hotel':
                parent.rangeSearch(x, y, '酒店|宾馆', oName, 'eshop', this.OID);
                break;
            case 'bank':
                parent.rangeSearch(x, y, '银行|ATM', oName, 'eshop', this.OID);
                break;
            case 'edian':
                parent.rangeDianSearch(x, y, '店铺', oName, 'eshop', this.OID);
                break;
            case 'other':
                if (this.$('btnRangText').value.trim() != '') {
                    parent.rangeSearch(x, y, this.$('btnRangText').value.trim(), oName);
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
    onBusTransfer: function (x, y, ocname) {
    },
    onNearByBus: function (x, y, ocname) {

    },
    onMergeSearch: function (key, type, tags) {
    }
});


