/*************************************************
* 城市列表控件
* code by lzz ver1.0 update at 07-10-10
*************************************************/

var CityListControl = Class.create();
Object.extend(CityListControl.prototype, MapContrlBase.prototype);
CityListControl.prototype._loadUI = function(){
    this.LoadUI('CityListControl');
};

//关闭城市列表事件
CityListControl.prototype.onClose = function(){
};

//重载控件加载完毕后的事件
CityListControl.prototype._loadComplete= function()
{
    this.Body.contentWindow.CityListControl = this;
    this.onLoadComplete(this);
};