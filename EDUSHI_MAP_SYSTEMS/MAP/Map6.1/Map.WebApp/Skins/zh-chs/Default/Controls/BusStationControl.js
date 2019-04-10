/*************************************************
* 公交站控件
* code by lzz ver1.0 update at 07-10-29
*************************************************/
var BusStationControl = Class.create();
Object.extend(BusStationControl.prototype, ControlBase.prototype);
Object.extend(BusStationControl.prototype, {
    Tab: null, //页卡
    _loadUI: function() {
        this.LoadUI('BusStationControl');
    },
    //显示指定站点的公交信息，id：公交站点id
    ShowBusStation: function(id, sStationName) {
        this.$('divStationName').innerHTML = sStationName;
        this.$('divBusList').innerHTML = 'loading...';
        this.Show();
        var url = this.Config.EDataCenterUrl + 'CommMap5.0/bus.aspx?domain=' + this.Config.Domain + '&l=' + this.Config.Language + '&req=8&stationid=' + id;
        ENetwork.DownloadScript(url, function() {
            if (typeof _BusLineList == 'undefined' || _BusLineList.length < 1) {
                this.$('divStationName').innerHTML = sStationName;
                this.$('divBusList').innerHTML = '<li style="width:100%">很抱歉，该站点公交数据正在完善中</li>';
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
            parent.parent.fnBusPopGoogleStat(sStationName); //公交泡泡点击统计
           // if (this.Config.IsBDT == 1) {  ===不判断城市是否是包打听 直接出google广告 2010-03-22 XJG
                this.onMergeSearch(sStationName);
           // }
        } .bindAsEventListener(this));

    },
    //重载控件加载完毕后的事件
    _loadComplete: function() {
        this.Body.contentWindow.BusStationControl = this;
        var script = this.$C('script');
        script.type = 'text/javascript';
        script.language = 'javascript';
        script.src = 'http://edata.edushi.com/ad/ads.aspx?key=gongjiaopaopao&city=' + this.Config.CityCode + '&l=' + this.Config.Language + '&domid=divStationAd';
        this.Body.contentWindow.document.getElementsByTagName('head')[0].appendChild(script);
        this.onLoadComplete(this);
    },
    onDataLoadComplete: function() {
    },
    //公交线路点击 , busid：公交线路ID, busname：公交线路名
    onBusClick: function(busid, busname, stationName) {
    },
    onMergeSearch: function(key) {
    }
});







