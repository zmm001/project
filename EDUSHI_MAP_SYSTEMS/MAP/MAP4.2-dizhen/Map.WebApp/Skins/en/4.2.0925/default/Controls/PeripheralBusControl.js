/*************************************************
* 周边公交搜索控件
* code by lzz ver1.0 update at 07-10-17
*************************************************/

var PeripheralBusControl = Class.create();
Object.extend(PeripheralBusControl.prototype, MapContrlBase.prototype);
PeripheralBusControl.prototype._loadUI = function(){
    this.LoadUI('PeripheralBusControl');
};

PeripheralBusControl.prototype.ShowPeripheralBus = function(x, y){
    this.$('fraBus').src = '../../../../../Fundation/PeripheralBus.aspx?x=' + x + '&y=' + y;
    this.Show();
};


PeripheralBusControl.prototype._busIdSearch = function(busid, busname){
    this.onBusClick(busid, busname);
};

//重载控件加载完毕后的事件
PeripheralBusControl.prototype._loadComplete= function(){
    this.Body.contentWindow.PopControlForm = this;
    //绑定事件
    if (GetBrowserInfo()[0]=='IE'){
        this.$('fraBus').attachEvent("onload",this._FraLoad.bindAsEventListener(this));
    }
    else {
        this.$('fraBus').onload = this._FraLoad.bindAsEventListener(this);
    }
    this.onLoadComplete(this);
};
PeripheralBusControl.prototype._FraLoad = function(){
    this.$('fraBus').contentWindow.Config = this.Config;
};

//公交线路点击 , busid：公交线路ID, busname：公交线路名
PeripheralBusControl.prototype.onBusClick = function(busid, busname){
};
