var BusStationControl = Class.create();
Object.extend(BusStationControl.prototype, ControlBase.prototype);
Object.extend(BusStationControl.prototype, {
    Tab: null, //页卡
    CopyMsg: '复制好了，发给我的QQ/MSN好友分享吧！',
    _loadUI: function () {
        this.LoadUI('BusStationControl');
    },
    //显示指定站点的公交信息，id：公交站点id
    ShowBusStation: function (id, sStationName, x, y) { 
        this.$('divStationName').innerHTML = sStationName;
        this.$('divBusList').innerHTML = 'loading...';
        this.Show();
        var url = this.Config.DataCetnerSearchDataUrl + 'SearchBusStation/' + this.Config.CityCode + '/' + this.Config.Language + '/Format/Json/Search?q=' + id;
        this.$('btnCavil').onclick = this.onCavil.bind(this, id, sStationName, x, y);

        this.$('zbsearch').onclick = this.SwicthCase.bind(this, 'zb');
        this.$('gjsearch').onclick = this.SwicthCase.bind(this, 'gj');
        this.$('fxsearch').onclick = this.SwicthCase.bind(this, 'fx');

        this.$('bustext1').value = sStationName;
        this.$('busswitch').onclick = this.BusSwitch.bind(this);
        this.$('busSearch').onclick = this.BusSearch.bind(this);
        this.$('bustext2').value = '';
        this.$('btnRangText').value = '请输入关键字';
        this.$('btnHotelSearch').onclick = this.BtnRangSearch.bind(this, 'hotel', x, y, sStationName);
        this.$('btnFineFoodSearch').onclick = this.BtnRangSearch.bind(this, 'food', x, y, sStationName);
        this.$('btnFeatureSpotSearch').onclick = this.BtnRangSearch.bind(this, 'feature', x, y, sStationName);
        //this.$('btnBankSearch').onclick = this.BtnRangSearch.bind(this, 'bank', x, y, sStationName);
        //this.$('btnDianSearch').onclick = this.BtnRangSearch.bind(this, 'edian', x, y, sStationName);
        //this.$('btnNearByBus').onclick = this.onNearByBus.bind(this, x, y, sStationName);
        this.$('btnOtherSearch').onclick = this.BtnRangSearch.bind(this, 'other', x, y, sStationName);

        var tempUrl = 'http://' + this.Config.Domain + '/?sid=' + id + '&x=' + x + '&y=' + y + '&sname=' + escape(sStationName)+'&ts=1';
        this.$('txtUrl').value = tempUrl;
        var temptitle = "我正在查【" + sStationName + "】E都市三维地图|edushi.com";
        this.$('btnCopy').onclick = this.Copy.bind(this, tempUrl);
        this.$('sinaShare').href = "javascript:void((function(s,d,e){try{}catch(e){}var f='http://v.t.sina.com.cn/share/share.php?',u='" + tempUrl + "',p=['url=',e(u),'&title=',e('" + temptitle + "'),'&appkey=1226626340'].join('');function a(){if(!window.open([f,p].join(''),'mb',['toolbar=0,status=0,resizable=1,width=620,height=450,left=',(s.width-620)/2,',top=',(s.height-450)/2].join('')))u.href=[f,p].join('');};if(/Firefox/.test(navigator.userAgent)){setTimeout(a,0)}else%20a();})(screen,document,encodeURIComponent));";
        this.$('renrenShare').href = "javascript:void((function(s,d,e){if(/xiaonei\.com/.test('" + tempUrl + "'))return;var%20f='http://share.xiaonei.com/share/buttonshare.do?link=',u='" + tempUrl + "',l='" + temptitle + "',p=[e(u),'&title=',e(l)].join('');function%20a(){if(!window.open([f,p].join(''),'xnshare',['toolbar=0,status=0,resizable=1,width=626,height=436,left=',(s.width-626)/2,',top=',(s.height-436)/2].join('')))u.href=[f,p].join('');};if(/Firefox/.test(navigator.userAgent))setTimeout(a,0);else%20a();})(screen,document,encodeURIComponent));";
        this.$('qqShare').onclick = this.BtnShare.bind(this, 'qq', temptitle, tempUrl);
        this.$('kaixinShare').href = "javascript:d=document;t=d.selection?(d.selection.type!='None'?d.selection.createRange().text:''):(d.getSelection?d.getSelection():'');void(kaixin=window.open('http://www.kaixin001.com/~repaste/repaste.php?&rurl='+escape('" + tempUrl + "')+'&rtitle='+escape('" + temptitle + "')+'&rcontent='+escape('" + temptitle + "'),'kaixin'));kaixin.focus();";

        ENetwork.DownloadScript(url, function () {
            MoveTo(x * 1 + vM.GradeWin2EGIS(66), y * 1 + vM.GradeWin2EGIS(-96), true);
            if (typeof _BusLineList == 'undefined' || _BusLineList.length < 1) {
                this.$('divStationName').innerHTML = sStationName;
                this.$('divBusList').innerHTML = '很抱歉，该站点数据正在完善中';
            }
            else {
                this.$('divStationName').innerHTML = sStationName;
                //append bus list
                var sHtml = '';
                for (var k = 0; k < _BusLineList.length; k++) {
                    sHtml += '<a href="javascript:;" onclick="window.BusStationControl.onBusClick(' + _BusLineList[k].VehicleID + ',\'' + _BusLineList[k].VehicleName + '\',\'' + sStationName + '\')">' + _BusLineList[k].VehicleName + '</a>';
                }
                this.$('divBusList').innerHTML = sHtml;
            }
            parent.parent.fnGoogleStat(sStationName); //公交泡泡点击统计
            this.onMergeSearch(sStationName);
        } .bindAsEventListener(this));
    },
    //重载控件加载完毕后的事件
    _loadComplete: function () {
        this.Body.contentWindow.BusStationControl = this;
        var script = this.$C('script');
        script.type = 'text/javascript';
        script.language = 'javascript';
        script.src = this.Config.DataCetnerAdDataUrl + 'Ad2.0/ads.aspx?key=gongjiaopaopao&citycode=' + this.Config.CityCode + '&l=' + this.Config.Language + '&domid=divStationAd';
        this.Body.contentWindow.document.getElementsByTagName('head')[0].appendChild(script);
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
                parent.rangeSearch(x, y, '酒店|宾馆', oName);
                break;
            case 'food':
                parent.rangeSearch(x, y, '美食', oName);
                break;
            case 'feature':
                parent.rangeSearch(x, y, '景点', oName);
                break;
//            case 'bank':
//                parent.rangeSearch(x, y, '银行|ATM', oName);
//                break;
//            case 'edian':
//                parent.rangeDianSearch(x, y, '店铺', oName);
//                break;
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
    //公交线路点击 , busid：公交线路ID, busname：公交线路名
    onBusClick: function (busid, busname, stationName) {
    },
    onMergeSearch: function (key) {
    },
    //纠错
    onCavil: function (id, name, x, y) {

    },
    onNearByBus: function (x, y, ocname) {
        parent.rangeBusSearch(x, y, ocname);
    },
    Copy: function (url) {
        fnCopyToClipboard(url, this.CopyMsg);
    }
});







