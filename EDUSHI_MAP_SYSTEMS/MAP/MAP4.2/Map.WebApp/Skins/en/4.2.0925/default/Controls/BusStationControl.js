/*************************************************
* 公交站控件
* code by lzz ver1.0 update at 07-10-29
*************************************************/

var BusStationControl = Class.create();
Object.extend(BusStationControl.prototype, MapContrlBase.prototype);
BusStationControl.prototype._loadUI = function(){
    this.LoadUI('BusStationControl');
};
//显示指定站点的公交信息，id：公交站点id
BusStationControl.prototype.ShowBusStation = function(id){
    this.$('divStationName').innerHTML = 'loading...';
    this.$('divBusList').innerHTML = 'loading...';
    var url = this.Config._DataCenterUrl + 'CommMap/bus.aspx?node='+this.Config._Node+'&l=' + this.Config._L + '&req=9&v=1.0&id=' + id; 
    ENetwork.DownloadScript
    (
        url,function()
        {
            if(typeof s =='undefined' || s == null)
            {
                this.$('divStationName').innerHTML = 'no bus station messages';
                this.$('divBusList').innerHTML = '<li style="width:100%">很抱歉，该站点公交数据正在完善中</li>';
                this.Show();
            }
            else
            {
                if(typeof busGroup =='undefined' || busGroup == null)
                {
                    this.$('divStationName').innerHTML = s.StationName;
                    this.$('divBusList').innerHTML = '<li style="width:100%">很抱歉，该站点公交数据正在完善中</li>';
                    this.Show();
                }
                else
                {
                    this.$('divStationName').innerHTML = s.StationName;
                    //append bus list
                    var sHtml = '';
                    for (var k=0; k<busGroup.length; k++)
                    {
                        sHtml += '<li><a href="javascript:;" onclick="window.BusStationControl.onBusClick('+ busGroup[k].BusID +',\''+busGroup[k].BusName+'\')">' + busGroup[k].BusName + '</a></li>';
                    }
                    this.$('divBusList').innerHTML = sHtml;
                    busGroup = null;
                    delete busGroup;
                    this.Show();
                }
            }
            
        }.bindAsEventListener(this)
    );
};
//重载控件加载完毕后的事件
BusStationControl.prototype._loadComplete= function(){
    this.Body.contentWindow.BusStationControl = this;
    this.onLoadComplete(this);
};

BusStationControl.prototype.onDataLoadComplete = function(){
};

//公交线路点击 , busid：公交线路ID, busname：公交线路名
BusStationControl.prototype.onBusClick = function(busid, busname){
};
