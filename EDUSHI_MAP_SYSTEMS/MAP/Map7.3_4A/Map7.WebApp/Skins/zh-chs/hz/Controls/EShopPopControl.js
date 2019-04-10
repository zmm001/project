var EShopPopControl = Class.create();
Object.extend(EShopPopControl.prototype, ControlBase.prototype);  //继承基类


Object.extend(EShopPopControl.prototype, {
    _loadUI: function() {
        this.LoadUI('EShopPopControl');
    },
    //E店企业ID
    EID: 0,
    IsMove: false,
    CopyMsg: '复制好了，发给我的QQ/MSN好友分享吧！',
    PopAD: [],
    Tab: null,
    ShowPop: function(id, ismove) {
        parent.parent.__IsEShopPopOn = true;
        if (ismove) {
            this.IsMove = true;
        }
        else {
            this.IsMove = false;
        }
        if (this.EID != id) {
            this.$('divLoading').style.display = '';
            this.Show();
        }
        else {
            this.$('divLoading').style.display = 'none';
            this.Show();
            return;
        }
        this.EID = id;
        
        var url = this.Config.DataCetnerSearchDataUrl + 'SearchMapByCompany/' + this.Config.CityCode + '/' + this.Config.Language + '/Format/Json/Search?q=' + id;
        ENetwork.DownloadScript(url, this.LoadPopData.bind(this));
    },
    LoadPopData: function() {
        if (typeof _EntityInfo != 'undefined' && _EntityInfo.length > 0) {
            var o = _EntityInfo[0];

            //兼容地图初始定位移动
            if (this.IsMove) {
                vM.MoveEntity(this.ID, o.X * 1, o.Y * 1);
                MoveTo(o.X * 1 + vM.GradeWin2EGIS(66), o.Y * 1 + vM.GradeWin2EGIS(-96), true);
            }
            var Name_h3Html = [];
            Name_h3Html.push('<span class="Til">' + o.OCName + '</span>');
            if (o.LST_ID == 2) {
                //Name_h3Html.push('<img src="/Images/ComMapIco1.gif" alt="商务地图" />');
            }
            else if (o.Vip > 1) {
                Name_h3Html.push('<img src="/Images/VipEdian.gif" alt="VIP E店" />');

                if (o.LCE_ShopCard * 1 > 0) {
                    Name_h3Html.push('<img src="/Images/Ying.gif" alt="本店已通过营业执照认证" />');
                }
                if (o.LV_ID * 1 > 0) {
                    Name_h3Html.push('<img src="/Images/Juan.gif" alt="免费下载本店优惠券" />');
                }
                if (o.LT_ID * 1 > 0) {
                    Name_h3Html.push('<img src="/Images/Cu.gif" alt="本店正在促销打折" />');
                }
            }
            else if (o.Vip > 0) {
                //Name_h3Html.push('<img src="/Images/Edian.gif" alt="E店" />');
            }

            this.$('Name_h3').innerHTML = Name_h3Html.join('');
            this.$('Img_a').target = '_blank';
            this.$('Img_img').src = this.Config.ImgUrl + o.ImgPath + '/s' + o.ImgName;
            this.$('Img_img').onerror = this.loadImgErr.bind(this.$('Img_img'), '/Images/nophoto.jpg');


            this.$('Address_p').innerHTML = o.Address;
            this.$('Tel_p').innerHTML = subStr(o.Telephone, 13);

            if (o.MCI_Internet != '') {
                this.$('view_a').href = o.MCI_Internet;
                this.$('Img_a').href = o.MCI_Internet;
            } else {
                this.$('view_a').href = this.Config.DianUrl + o.CompanyID + '.html';
                this.$('Img_a').href = this.Config.DianUrl + o.CompanyID + '.html';
            }

            this.$('btnCavil').onclick = this.onCavil.bind(this, o.X, o.Y, o.CompanyID, o.OCName);
            this.$('btnBusTransfer').onclick = this.onBusTransfer.bind(this, o.X, o.Y, o.OCName);
            //this.$('btnNearBySearch').onclick = this.onNearBySearch.bind(this, o.X, o.Y, o.OCName);
            this.$('btnNearByBus').onclick = this.onNearByBus.bind(this, o.X, o.Y, o.OCName);
            this.$('txtUrl').value = 'http://' + this.Config.Domain + '/e' + o.CompanyID + '.html';
            this.$('btnCopy').onclick = this.Copy.bind(this, 'http://' + this.Config.Domain + '/e' + o.CompanyID + '.html');

            this.$('divLoading').style.display = 'none';

            //广告
            _script = this.$C('script');
            _script.charset = 'utf-8';
            _script.src = this.Config.DataCetnerAdDataUrl + 'Ad2.0/ads.aspx?citycode=' + this.Config.CityCode + '&l=' + this.Config.Language + '&key=qiyepaopao&domid=RowNav';
            this.Body.contentWindow.document.getElementsByTagName('head')[0].appendChild(_script);
            //统计和广告
            parent.parent.fnGoogleStat(o.OCName);

            this.onMergeSearch(o.OCName, o.LST_ID, o.Domain, o.CompanyID, o.LV_ID, o.LT_ID, o.LCE_ShopCard, o.Vip, o.MCT_TypeName, o.Keywords);
        }
    },
    _loadComplete: function() {
        this.Body.contentWindow.EShopPopControl = this;
        this.$('btnClose').onclick = this.ClosePop.bind(this);
        this.$('divLoading').innerHTML = this.Config.Loading;
        this.onLoadComplete(this);
    },
    ClosePop: function() {
        parent.parent.__IsEShopPopOn = false;
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
    onMergeSearch: function(key, lst_id, domain, cid, vid, tid, card, vip, type, tags) {
    }
});

 function subStr(strName,Length)
    {
     var str; 
     if (strName.length > Length)
     {
      str = strName.substring(0,Length);

     }
     else
     {
      str = strName;
     }
     return str;
    }

