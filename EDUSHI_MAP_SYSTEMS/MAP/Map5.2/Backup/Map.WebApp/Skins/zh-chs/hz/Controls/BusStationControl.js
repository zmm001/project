/*************************************************
* 公交站控件
* code by lzz ver1.0 update at 07-10-29
*************************************************/
var BusStationControl = Class.create();
var _BusStationAD;
var _Tab = null;
Object.extend(BusStationControl.prototype, ControlBase.prototype);
BusStationControl.prototype._loadUI = function(){
    this.LoadUI('BusStationControl');
};
//显示指定站点的公交信息，id：公交站点id
BusStationControl.prototype.ShowBusStation = function(id, sStationName) {
    parent.parent.fnBusPopGoogleStat(sStationName); //公交泡泡点击统计
    if (_Tab) {
        _Tab.destroy();
    }
    _Tab = parent.parent.fnOpenMergeSearch(sStationName, 0, '', 0, 0, 0, 0, 0, '', '', this.Config.CityName,1);
    this.$('divStationName').innerHTML = sStationName;
    this.$('divBusList').innerHTML = 'loading...';
    var url = this.Config.EDataCenterUrl + 'CommMap5.0/bus.aspx?domain=' + this.Config.Domain + '&l=' + this.Config.Language + '&req=8&stationid=' + id;
    ENetwork.DownloadScript(url, function() {
        if (typeof _BusLineList == 'undefined' || _BusLineList.length < 1) {
            this.$('divStationName').innerHTML = sStationName;
            this.$('divBusList').innerHTML = '<li style="width:100%">很抱歉，该站点公交数据正在完善中</li>';
            this.Show();
        }
        else {
            this.$('divStationName').innerHTML = sStationName;
            //append bus list
            var sHtml = '';
            for (var k = 0; k < _BusLineList.length; k++) {
                sHtml += '<li><a href="javascript:;" onclick="window.BusStationControl.onBusClick(' + _BusLineList[k].VehicleID + ',\'' + _BusLineList[k].VehicleName + '\',\'' + sStationName + '\')">' + _BusLineList[k].VehicleName + '</a></li>';
            }
            this.$('divBusList').innerHTML = sHtml;
            this.Show();
        }
    } .bindAsEventListener(this));
    if (!_BusStationAD) {
        _BusStationAD = this.$C('script');
        _BusStationAD.type = 'text/javascript';
        _BusStationAD.language = 'javascript';
        _BusStationAD.src = this.Config.EDataCenterUrl + 'ad/ads.aspx?key=gongjiaopaopao&city=' + this.Config.CityCode + '&l=' + this.Config.Language + '&domid=divStationAd';
        this.$('divStationAd').appendChild(_BusStationAD);
    }
};
//重载控件加载完毕后的事件
BusStationControl.prototype._loadComplete= function(){
    this.Body.contentWindow.BusStationControl = this;
    this.onLoadComplete(this);
};

BusStationControl.prototype.onDataLoadComplete = function(){
};

//公交线路点击 , busid：公交线路ID, busname：公交线路名
BusStationControl.prototype.onBusClick = function(busid, busname, stationName){
};
