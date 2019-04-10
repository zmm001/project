var SubWayControl = Class.create();
Object.extend(SubWayControl.prototype, ControlBase.prototype);
Object.extend(SubWayControl.prototype, {
    Tab: null, //页卡
    _loadUI: function() {
        this.LoadUI('SubWayControl');
    },
    //显示指定站点的公交信息，id：公交站点id
    ShowBusStation: function(data) {
        this.Show();
        var t = '';
        for (var i = 0; i < data.List.length; i++) {
            t += string.Format("<a style=\"background:{0};cursor:pointer;\" onclick=\"window.SubWayControl.onBusClick({2},'{3}','{4}');\">{1}</a>", data.List[i].Color, data.List[i].Name, data.List[i].ID, data.List[i].Name, data.List[i].Name);
        }

        this.$('linelist').innerHTML = t + '<div class="clear"></div>';
        this.$('zdxx').innerHTML = "<span>" + data.Info + "</span>";
        this.$('infotitle').innerHTML = data.Name;
        this.onMergeSearch(data.Name);
    },
    //重载控件加载完毕后的事件
    _loadComplete: function() {
        this.Body.contentWindow.SubWayControl = this;
        //广告      
        _script = this.$C('script');
        _script.charset = 'utf-8';
        _script.src = this.Config.DataCetnerAdDataUrl + 'Ad2.0/ads.aspx?citycode=' + this.Config.CityCode + '&l=' + this.Config.Language + '&key=shitipaopao&domid=RowNav';
        this.Body.contentWindow.document.getElementsByTagName('head')[0].appendChild(_script);
        this.onLoadComplete(this);
    },
    //公交线路点击 , busid：公交线路ID, busname：公交线路名
    onBusClick: function(busid, busname, stationName) {
    },
    onMergeSearch: function(key) {
    }
});







