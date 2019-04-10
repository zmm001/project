var BusStationControl = Class.create();
Object.extend(BusStationControl.prototype, ControlBase.prototype);
Object.extend(BusStationControl.prototype, {
    Tab: null, //页卡
    _loadUI: function() {
        this.LoadUI('BusStationControl');
    },
    //显示指定站点的公交信息，id：公交站点id
    ShowBusStation: function(id, sStationName, x, y) {
        this.$('divStationName').innerHTML = sStationName;
        this.$('divBusList').innerHTML = 'loading...';
        this.Show();
        var url = this.Config.DataCetnerSearchDataUrl + 'SearchBusStation/' + this.Config.CityCode + '/' + this.Config.Language + '/Format/Json/Search?q=' + id;
        this.$('btnCavil').onclick = this.onCavil.bind(this, id, sStationName, x, y);

        ENetwork.DownloadScript(url, function() {
            if (typeof _BusLineList == 'undefined' || _BusLineList.length < 1) {
                this.$('divStationName').innerHTML = sStationName;
                this.$('divBusList').innerHTML = '<li style="width:100%">很抱歉，该站点数据正在完善中</li>';
            }
            else {
                this.$('divStationName').innerHTML = sStationName;
                //append bus list
                var sHtml = '';
                for (var k = 0; k < _BusLineList.length; k++) {
                    sHtml += '<li><a href="javascript:;" onclick="window.BusStationControl.onBusClick(' + _BusLineList[k].VehicleID + ',\'' + _BusLineList[k].VehicleName + '\',\'' + sStationName + '\')">' + _BusLineList[k].VehicleName + '</a></li>';
                }
                this.$('divBusList').innerHTML = sHtml;
            }
            parent.parent.fnGoogleStat(sStationName); //公交泡泡点击统计
            this.onMergeSearch(sStationName);
        } .bindAsEventListener(this));
    },
    //重载控件加载完毕后的事件
    _loadComplete: function() {
        this.Body.contentWindow.BusStationControl = this;
        var script = this.$C('script');
        script.type = 'text/javascript';
        script.language = 'javascript';
        script.src = this.Config.DataCetnerAdDataUrl + 'Ad2.0/ads.aspx?key=gongjiaopaopao&citycode=' + this.Config.CityCode + '&l=' + this.Config.Language + '&domid=divStationAd';
        this.Body.contentWindow.document.getElementsByTagName('head')[0].appendChild(script);
        this.onLoadComplete(this);
    },
    //公交线路点击 , busid：公交线路ID, busname：公交线路名
    onBusClick: function(busid, busname, stationName) {
    },
    onMergeSearch: function(key) {
    },
    //纠错
    onCavil: function(id, name, x, y) {

    }
});







