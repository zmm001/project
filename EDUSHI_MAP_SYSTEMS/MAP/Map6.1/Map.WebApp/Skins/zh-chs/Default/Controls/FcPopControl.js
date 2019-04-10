/*************************************************
* 房产泡泡控件 v1.0 xb 2009.09.21
*************************************************/
var FcPopControl = Class.create();
Object.extend(FcPopControl.prototype, ControlBase.prototype);

Object.extend(FcPopControl.prototype, {
    _loadUI: function() {
        this.LoadUI('FcPopControl');
    },
    _loadComplete: function() {
        this.$('btnClose').onclick = this.ClosePop.bind(this);
        _script = this.$C('script');
        _script.charset = 'utf-8';
        _script.src = this.Config.EDataCenterUrl + 'ad/ads.aspx?citycode=' + this.Config.CityCode + '&l=' + this.Config.Language + '&key=qiyepaopao&domid=RowNav';
        this.Body.contentWindow.document.getElementsByTagName('head')[0].appendChild(_script);
        this.onLoadComplete();
    },
    /*直接显示Pop内容*/
    ShowPopData: function(type, item) {
        if (type == 6) {
            vM.MoveEntity(this.ID, item.Cx * 1, item.Cy * 1);
            MoveTo(item.Cx * 1 + vM.GetMapPos(66), item.Cy * 1 + vM.GetMapPos(-96), true);
            this.$('Name_h3').innerHTML = '<span class="Til">' + item.Name + '</span>';
            this.$('Name_h3').title = item.Name;
            if (!item.Pic || item.Pic == '') {
                this.$('picUrl_img').src = '/Images/nophoto.jpg';
            }
            else {
                this.$('picUrl_img').src = 'http://imgs.fangtuwang.com' + item.Pic;
                this.$('picUrl_img').onerror = this.loadImgErr.bind(this.$('picUrl_img'), '/Images/nophoto.jpg');
                this.$('picUrl_img').title = 'http://imgs.fangtuwang.com' + item.A;
            }
            this.$('url_a').href = 'http://'+GlobalConfig.CityCode+'.fangtoo.com/building/' + item.BID + '/?f=edushi';
            var sNumHtml = '';
            if (item.TC && parseInt(item.TC) > 0) {
                sNumHtml += '二手房(<a target="_blank"  href="http://'+GlobalConfig.CityCode+'.fangtoo.com/house/trade/?k=' + encodeURI(item.Name) + '&f=edushi">' + item.TC + '</a>套)&nbsp;&nbsp;';
            }

            if (item.LC && parseInt(item.LC) > 0) {
                sNumHtml += '出租(<a target="_blank" href="http://'+GlobalConfig.CityCode+'.fangtoo.com/house/lease/?k=' + encodeURI(item.Name) + '&f=edushi">' + item.LC + '</a>套)';
            }
            this.$('Num_p').innerHTML = sNumHtml;
            var sDes = '<p>';
            if (item.SSP && parseInt(item.SSP) > 0) {
                sDes += '挂牌均价：<span class="OrgSty">' + item.SSP + '</span>元/㎡&nbsp;&nbsp;';
            }
            if (item.SEP && parseInt(item.SEP) > 0) {
                sDes += '成交均价：<span class="OrgSty">' + item.SEP + '</span>元/㎡';
            }
            sDes += '</p>';

            if (item.Exp) {
                sDes += '<p>小区专家：';
                for (var i = 0; i < item.Exp.length; i++) {
                    sDes += '<a target="_blank" href="http://'+GlobalConfig.CityCode+'.fangtoo.com/broker/' + item.Exp[i].ID + '/?f=edushi">' + item.Exp[i].Name + '</a>';
                    if (i < item.Exp.length - 1) {
                        sDes += ',';
                    }
                }
                sDes += '</p>';
            }
            this.$('Des_div').innerHTML = sDes;
            this.$('Address_span').innerHTML = item.A;
            this.$('Address_span').title = item.A;
        }
        else {
            vM.MoveEntity(this.ID, item.X * 1, item.Y * 1);
            MoveTo(item.X * 1 + vM.GetMapPos(66), item.Y * 1 + vM.GetMapPos(-96), true);




            this.$('Name_h3').innerHTML = '<span class="Til">' + item.Name + '</span>';
            this.$('Name_h3').title = item.Name;
            if (!item.Pic || item.Pic == '') {
                this.$('picUrl_img').src = '/Images/nophoto.jpg';
            }
            else {
                this.$('picUrl_img').src = 'http://imgs.fangtuwang.com' + item.Pic;
            }

            this.$('Address_span').innerHTML = item.Address;
            this.$('Address_span').title = item.Address;

            this.$('url_a').href = item.Url + '?f=edushi';
            switch (type) {
                case 1:
                    this.$('Name_h3').innerHTML = '<span class="Til">' + item.Name + '</span>';
                    this.$('Name_h3').title = item.Name;
                    this.$('Num_p').innerHTML = '二手房(<a target="_blank" href="http://'+GlobalConfig.CityCode+'.fangtoo.com/house/trade/?k=' + encodeURI(item.Name) + '&f=edushi">' + item.SecondNum + '</a>套)&nbsp;&nbsp;出租(<a target="_blank" href="http://'+GlobalConfig.CityCode+'.fangtoo.com/house/lease/?k=' + encodeURI(item.Name) + '">' + item.LeaseNum + '</a>套)';
                    this.$('Num_p').style.visibility = 'visible';
                    var hangPrice = 0;
                    if (item.AvgPriceType != 0) {
                        if (item.AvgPriceType == 3) {
                            hangPrice = parseInt(item.NewPrice);

                        }
                        else {
                            hangPrice = parseInt(item.HangPrice);
                        }
                    }
                    this.$('Des_div').innerHTML = '<p>挂牌均价：<span class="OrgSty">' + hangPrice + '</span>元/㎡</p>';

                    break;

                case 2:
                case 3:
                    this.$('Name_h3').innerHTML = '<span class="Til" titel="' + item.Title + '">[' + item.Name + ']' + item.Title + '</span>';
                    this.$('Name_h3').title = item.Title;
                    this.$('Num_p').style.visibility = 'hidden';
                    this.$('Des_div').innerHTML = '<p>面积：<span class="OrgSty">' + item.Acreage + '</span>㎡ 单价：<span class="OrgSty">' + item.UnitPrice + '</span>元/㎡</p><p>户型：<span class="OrgSty">' + item.Room + '室' + item.holl + '厅' + item.loo + '卫' + item.cookroom + '厨' + item.terrace + '阳台</span> 楼层：<span class="OrgSty">' + item.Floor + '</span>/' + item.FloorCount + '</p>';
                    break;
                case 4:
                    this.$('Name_h3').innerHTML = '<span class="Til" titel="' + item.Title + '">[' + item.Name + ']' + item.Title + '</span>';
                    this.$('Name_h3').title = item.Title;
                    this.$('Num_p').style.visibility = 'hidden';
                    var RefPrice = '';
                    if (item.PriceUnit == 353) {
                        RefPrice = item.RefPrice + '元/月';
                    }
                    else {
                        RefPrice = item.RefPrice + '元/月/平米';
                    }
                    this.$('Des_div').innerHTML = '<p>面积：<span class="OrgSty">' + item.Acreage + '</span>㎡ 租金：<span class="OrgSty">' + RefPrice + '</span>\</p><p>户型：<span class="OrgSty">' + item.Room + '室' + item.holl + '厅' + item.loo + '卫' + item.cookroom + '厨' + item.terrace + '阳台</span> 楼层：<span class="OrgSty">' + item.Floor + '</span>/' + item.FloorCount + '</p>';
                    break;
                case 5:
                    this.$('Name_h3').innerHTML = '<span class="Til">' + item.Name + '</span>';
                    this.$('Name_h3').title = item.Title;
                    this.$('Num_p').innerHTML = '二手房(<a target="_blank" href="http://'+GlobalConfig.CityCode+'.fangtoo.com/house/trade/?k=' + encodeURI(item.Name) + '&f=edushi">' + item.SecondNum + '</a>套)&nbsp;&nbsp;出租(<a target="_blank" href="http://'+GlobalConfig.CityCode+'.fangtoo.com/house/lease/?k=' + encodeURI(item.Name) + '&f=edushi">' + item.LeaseNum + '</a>套)';
                    this.$('Num_p').style.visibility = 'visible';
                    var hangPrice = 0;
                    if (item.AvgPriceType != 0) {
                        if (item.AvgPriceType == 3) {
                            hangPrice = parseInt(item.NewPrice);

                        }
                        else {
                            hangPrice = parseInt(item.HangPrice);
                        }
                    }
                    this.$('Des_div').innerHTML = '<p>挂牌均价：<span class="OrgSty">' + hangPrice + '</span>元/㎡</p>';
                    break;
            }

        }
        this.Show();
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
    ShowPopSpotData: function(spot) {
    },
    ClosePop: function() {
        this.Hide();
    }
});
