var MarkPopControl = Class.create();
Object.extend(MarkPopControl.prototype, ControlBase.prototype);  //继承基类

Object.extend(MarkPopControl.prototype, {
    _loadUI: function () {
        this.LoadUI('MarkPopControl');
    },
    CopyMsg: '复制好了，发给我的QQ/MSN好友分享吧！',
    ShowPop: function (x, y, title, content) {
        this.Show();
        setTimeout(function () { parent._IsBeginSelectMark = false; vM.Property.flgShowMouseStyle = true; }, 10); //延迟执行。。。避免点击到实体上后显示一并实体泡泡

        this.$('zbsearch').onclick = this.SwicthCase.bind(this, 'zb');
        this.$('gjsearch').onclick = this.SwicthCase.bind(this, 'gj');
        this.$('fxsearch').onclick = this.SwicthCase.bind(this, 'fx');

        this.$('busswitch').onclick = this.BusSwitch.bind(this);
        this.$('busSearch').onclick = this.BusSearch.bind(this);
        this.$('bustext2').value = '';
        this.$('btnRangText').value = '请输入关键字';
        this.$('scbtn').onclick = this.ClosePop.bind(this, x, y);
        this.$('collection').onclick = this.fnCollection.bind(this, x, y);
        this.$('btnClose').onclick = this.ClosePop.bind(this, x, y);
        this.$('btnClose1').onclick = this.ClosePop.bind(this, x, y);

        if (title == '' && content == '') {
            this.$('name').value = '';
            this.$('content').value = '';
            this.$('Tag1').style.display = '';
            this.$('Tag2').style.display = 'none';
            this.$('qdbtn').onclick = this.btnqdEnter.bind(this, x, y);
        }
        else {
            this.$('qdbtn').onclick = this.btnqdEnter.bind(this, x, y, 2);
            this.$('Tag1').style.display = 'none';
            this.$('Tag2').style.display = '';
            this.$('title').innerHTML = '<strong>标题：</strong>' + title;
            this.$('morecontent').innerHTML = '<strong>备注：</strong>' + content;
            this.$('name').value = title;
            this.$('content').value = content;

            this.$('btnNearByBus').onclick = this.onNearByBus.bind(this, x, y, title);
            this.$('btnHotelSearch').onclick = this.BtnRangSearch.bind(this, 'hotel', x, y, title);
            this.$('btnBankSearch').onclick = this.BtnRangSearch.bind(this, 'bank', x, y, title);
            this.$('btnDianSearch').onclick = this.BtnRangSearch.bind(this, 'edian', x, y, title);
            this.$('btnOtherSearch').onclick = this.BtnRangSearch.bind(this, 'other', x, y, title);

            var temptitle = '我的标记【' + this.$('name').value.trim() + '】E都市三维地图|edushi.com';
            var tempUrl = 'http://' + this.Config.Domain + '/?x=' + x + '&y=' + y + '&title=' + escape(this.$('name').value.trim()) + '&content=' + escape(this.$('content').value.trim());
            this.$('txtUrl').value = tempUrl;
            this.$('btnCopy').onclick = this.Copy.bind(this, tempUrl);

            this.$('sinaShare').href = "javascript:void((function(s,d,e){try{}catch(e){}var f='http://v.t.sina.com.cn/share/share.php?',u='" + tempUrl + "',p=['url=',e(u),'&title=',e('" + temptitle + "'),'&appkey=1226626340'].join('');function a(){if(!window.open([f,p].join(''),'mb',['toolbar=0,status=0,resizable=1,width=620,height=450,left=',(s.width-620)/2,',top=',(s.height-450)/2].join('')))u.href=[f,p].join('');};if(/Firefox/.test(navigator.userAgent)){setTimeout(a,0)}else%20a();})(screen,document,encodeURIComponent));";
            this.$('renrenShare').href = "javascript:void((function(s,d,e){if(/xiaonei\.com/.test('" + tempUrl + "'))return;var%20f='http://share.xiaonei.com/share/buttonshare.do?link=',u='" + tempUrl + "',l='" + temptitle + "',p=[e(u),'&title=',e(l)].join('');function%20a(){if(!window.open([f,p].join(''),'xnshare',['toolbar=0,status=0,resizable=1,width=626,height=436,left=',(s.width-626)/2,',top=',(s.height-436)/2].join('')))u.href=[f,p].join('');};if(/Firefox/.test(navigator.userAgent))setTimeout(a,0);else%20a();})(screen,document,encodeURIComponent));";
            this.$('qqShare').onclick = this.BtnShare.bind(this, 'qq', temptitle, tempUrl);
            this.$('kaixinShare').href = "javascript:d=document;t=d.selection?(d.selection.type!='None'?d.selection.createRange().text:''):(d.getSelection?d.getSelection():'');void(kaixin=window.open('http://www.kaixin001.com/~repaste/repaste.php?&rurl='+escape('" + tempUrl + "')+'&rtitle='+escape('" + temptitle + "')+'&rcontent='+escape('" + temptitle + "'),'kaixin'));kaixin.focus();";

            this.$('edit').onclick = this.fnEdit.bind(this, title, content);
            this.$('delete').onclick = this.fnDelete.bind(this, x, y);
        }
    },
    fnCollection: function (x, y) {
        //cookie格式   x,y|title|value$x,y|title|value
        var _domain = this.Config.Domain;
        var _CookieName = this.Config.CityCode + '_Aladdin_Map';
        var _OldCookie = '';
        var t = [];
        var len = 0;
        var flg = false;
        var _CookieValue = '';
        var _cookiekey = x + ',' + y;
        if (jQuery.cookie(_CookieName) != null) {
            _OldCookie = jQuery.cookie(_CookieName);
            t = _OldCookie.split('$');
            if (t.length > 0) {
                for (var i = 0; i < t.length; i++) {
                    if (_cookiekey == t[i].split('|')[0]) {
                        flg = true;
                        break;
                    }
                }
                if (t.length < 10) {
                    if (!flg) {
                        _CookieValue = _OldCookie + '$' + x + ',' + y + '|' + this.$('name').value.trim() + '|' + this.$('content').value.trim();
                        jQuery.cookie(_CookieName, _CookieValue, { expires: 30, path: '/', domain: _domain });
                        jQuery("#divTip").show();
                        jQuery("#divTip").html('成功收藏至常用位置！');
                        setTimeout(function () { jQuery("#divTip").hide(); }, 3000);
                    }
                    else {
                        jQuery("#divTip").show();
                        jQuery("#divTip").html('已经收藏至常用位置！');
                        setTimeout(function () { jQuery("#divTip").hide(); }, 3000);
                    }
                }
                else {
                    //收藏加满　提示删除
                    jQuery("#divTip").show();
                    jQuery("#divTip").html('收藏满10条,请删除后添加！');
                    setTimeout(function () { jQuery("#divTip").hide(); }, 3000);
                }
            }
        }
        else {
            _CookieValue = x + ',' + y + '|' + this.$('name').value.trim() + '|' + this.$('content').value.trim();
            jQuery.cookie(_CookieName, _CookieValue, { expires: 30, path: '/', domain: _domain });
            jQuery("#divTip").show();
            jQuery("#divTip").html('成功收藏至常用位置！');
            setTimeout(function () { jQuery("#divTip").hide(); }, 3000);
        }
    },
    btnqdEnter: function (x, y, type) {
        if (this.$('name').value.trim() == '') {
            this.$('name').focus();
            return;
        }
        if (this.$('content').value.trim() == '') {
            this.$('content').focus();
            return;
        }

        if (this.$('name').value.length > 20) {
            this.$('ts1').style.display = 'block';
            return;
        }

        if (this.$('content').value.length > 80) {
            this.$('ts2').style.display = 'block';
            return;
        }

        this.$('Tag1').style.display = 'none';
        this.$('Tag2').style.display = '';

        this.$('title').innerHTML = '<strong>标题：</strong>' + this.$('name').value.trim();
        this.$('morecontent').innerHTML = '<strong>备注：</strong>' + this.$('content').value.trim();

        this.$('btnNearByBus').onclick = this.onNearByBus.bind(this, x, y, this.$('name').value.trim());
        this.$('btnHotelSearch').onclick = this.BtnRangSearch.bind(this, 'hotel', x, y, this.$('name').value.trim());
        this.$('btnBankSearch').onclick = this.BtnRangSearch.bind(this, 'bank', x, y, this.$('name').value.trim());
        this.$('btnDianSearch').onclick = this.BtnRangSearch.bind(this, 'edian', x, y, this.$('name').value.trim());
        this.$('btnOtherSearch').onclick = this.BtnRangSearch.bind(this, 'other', x, y, this.$('name').value.trim());

        var temptitle = '我的标记【' + this.$('name').value.trim() + '】E都市三维地图|edushi.com';
        var tempUrl = 'http://' + this.Config.Domain + '/?x=' + x + '&y=' + y + '&title=' + escape(this.$('name').value.trim()) + '&content=' + escape(this.$('content').value.trim());
        this.$('txtUrl').value = tempUrl;

        this.$('btnCopy').onclick = this.Copy.bind(this, tempUrl);
        this.$('edit').onclick = this.fnEdit.bind(this);

        this.$('sinaShare').href = "javascript:void((function(s,d,e){try{}catch(e){}var f='http://v.t.sina.com.cn/share/share.php?',u='" + tempUrl + "',p=['url=',e(u),'&title=',e('" + temptitle + "'),'&appkey=1226626340'].join('');function a(){if(!window.open([f,p].join(''),'mb',['toolbar=0,status=0,resizable=1,width=620,height=450,left=',(s.width-620)/2,',top=',(s.height-450)/2].join('')))u.href=[f,p].join('');};if(/Firefox/.test(navigator.userAgent)){setTimeout(a,0)}else%20a();})(screen,document,encodeURIComponent));";
        this.$('renrenShare').href = "javascript:void((function(s,d,e){if(/xiaonei\.com/.test('" + tempUrl + "'))return;var%20f='http://share.xiaonei.com/share/buttonshare.do?link=',u='" + tempUrl + "',l='" + temptitle + "',p=[e(u),'&title=',e(l)].join('');function%20a(){if(!window.open([f,p].join(''),'xnshare',['toolbar=0,status=0,resizable=1,width=626,height=436,left=',(s.width-626)/2,',top=',(s.height-436)/2].join('')))u.href=[f,p].join('');};if(/Firefox/.test(navigator.userAgent))setTimeout(a,0);else%20a();})(screen,document,encodeURIComponent));";
        this.$('qqShare').onclick = this.BtnShare.bind(this, 'qq', temptitle, tempUrl);
        this.$('kaixinShare').href = "javascript:d=document;t=d.selection?(d.selection.type!='None'?d.selection.createRange().text:''):(d.getSelection?d.getSelection():'');void(kaixin=window.open('http://www.kaixin001.com/~repaste/repaste.php?&rurl='+escape('" + tempUrl + "')+'&rtitle='+escape('" + temptitle + "')+'&rcontent='+escape('" + temptitle + "'),'kaixin'));kaixin.focus();";

        if (type == 2) {
            var _domain = this.Config.Domain;
            var _CookieName = this.Config.CityCode + '_Aladdin_Map';
            var _OldCookie = '';
            var t = [];
            var len = -1;
            var flg = false;
            var _CookieValue = '';
            var _cookiekey = x + ',' + y;
            if (jQuery.cookie(_CookieName) != null) {
                _OldCookie = jQuery.cookie(_CookieName);
                t = _OldCookie.split('$');
                if (t.length > 0) {
                    for (var i = 0; i < t.length; i++) {
                        if (_cookiekey == t[i].split('|')[0]) {
                            flg = true;
                            len = i;
                            break;
                        }
                    }
                }

                if (flg && len > -1) {
                    var tempvalue = t[len].split('|');
                    if (tempvalue[1] != this.$('name').value.trim() || tempvalue[2] != this.$('content').value.trim()) {
                        t[len] = x + ',' + y + '|' + this.$('name').value.trim() + '|' + this.$('content').value.trim();
                    }
                    for (var l = 0; l < t.length; l++) {
                        _CookieValue += t[l] + '$';
                    }
                    _CookieValue = _CookieValue.substring(0, _CookieValue.length - 1);
                    jQuery.cookie(_CookieName, _CookieValue, { expires: 30, path: '/', domain: _domain });

                    jQuery("#divTip").show();
                    jQuery("#divTip").html('修改成功！');
                    setTimeout(function () { jQuery("#divTip").hide(); }, 3000);
                }
            }
        }
    },
    LoadPopData: function () {

    },
    fnDelete: function (x, y) {
        this.ClosePop(x, y);
    },
    fnEdit: function (title, content) {
        this.$('Tag1').style.display = '';
        this.$('Tag2').style.display = 'none';

        if (typeof title != 'undefined')
            this.$('name').value = title;
        if (typeof content != 'undefined')
            this.$('content').value = content;
    },
    _loadComplete: function () {
        this.Body.contentWindow.MarkPopControl = this;
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
    ClosePop: function (x, y) {
        this.Hide();
//        var txy = x + '_' + y + '_divmark';
//        if (typeof vM.GetEntityInfo(txy)) {
//            vM.RemoveEntity(txy);
//        }
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
    },
    onBusTransfer: function (x, y, ocname) {
    },
    onNearBySearch: function (x, y, ocname) {
    },
    onNearByBus: function (x, y, ocname) {
    }
});

