var FTPopControl = Class.create();
Object.extend(FTPopControl.prototype, ControlBase.prototype);  //继承基类

Object.extend(FTPopControl.prototype, {
    _loadUI: function () {
        this.LoadUI('FTPopControl');
    },
    ShowPop: function (index) {
        this.Show();
        this.$('titleinfo').innerHTML = parent.FTHouseData[index].Name;
        if (!parent.FTHouseData[index].Pic || parent.FTHouseData[index].Pic == '') {
            this.$('imagesurl').src = '../Images/tu.jpg';
        }
        else {
            this.$('imagesurl').src = 'http://imgs.fangtuwang.com' + parent.FTHouseData[index].Pic;
        }
        this.$('imagesurl').onerror = this.loadImgErr.bind(this.$('imagesurl'), '../Images/tu.jpg');
        this.$('imgurl').href = 'http://fangtoo.edushi.com/building/' + parent.FTHouseData[index].BID + '/';
        this.$('url_a').href = 'http://fangtoo.edushi.com/building/' + parent.FTHouseData[index].BID + '/';
        this.$('address').innerHTML = parent.FTHouseData[index].A;
        var sNumHtml = '';
        if (parent.FTHouseData[index].TC && parseInt(parent.FTHouseData[index].TC) > 0) {
            sNumHtml += '二手房(<a target="_blank"  href="http://fangtoo.edushi.com/es/ck' + encodeURI(parent.FTHouseData[index].Name) + '/">' + parent.FTHouseData[index].TC + '</a>套)&nbsp;&nbsp;';
        }

        if (parent.FTHouseData[index].LC && parseInt(parent.FTHouseData[index].LC) > 0) {
            sNumHtml += '出租(<a target="_blank" href="http://fangtoo.edushi.com/cz/ck' + encodeURI(parent.FTHouseData[index].Name) + '/">' + parent.FTHouseData[index].LC + '</a>套)';
        }
        this.$('fangchan').innerHTML = sNumHtml;
        var sDes = '';
        if (parent.FTHouseData[index].SSP && parseInt(parent.FTHouseData[index].SSP) > 0) {
            sDes += '挂牌均价：<span class="OrgSty">' + parent.FTHouseData[index].SSP + '</span>元/㎡&nbsp;&nbsp;';
        }
        if (parent.FTHouseData[index].SEP && parseInt(parent.FTHouseData[index].SEP) > 0) {
            sDes += '成交均价：<span class="OrgSty">' + parent.FTHouseData[index].SEP + '</span>元/㎡';
        }
        this.$('fangjia').innerHTML = sDes;
    },
    _loadComplete: function () {
        this.Body.contentWindow.FTPopControl = this;
        this.$('btnClose').onclick = this.ClosePop.bind(this);
        this.onLoadComplete(this);
    },
    ClosePop: function () {
        this.Hide();
    },
    loadImgErr: function (imgpath) {
        if (this.src == imgpath) {
            return;
            //默认图片加载失败则不再触发 , ie7光设置 this.onerror=null; 无效
        }
        this.src = imgpath;
        this.onerror = null;
    }
});


