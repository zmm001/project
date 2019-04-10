/*************************************************
* 引导图控件
* code by lzz ver1.0 update at 07-10-10
*************************************************/

var NavigationControl = Class.create();
Object.extend(NavigationControl.prototype, MapContrlBase.prototype);
NavigationControl.prototype._loadUI = function(){
    this.Body.src = this.Config._RealCityUIPath + 'Controls/NavigationControl.aspx';
};

//关闭事件
NavigationControl.prototype.onClose = function(){
};
//热点点击事件,type: 0:实体 1:企业
NavigationControl.prototype.onNavClick = function(type, id, x, y){  
};

//重载控件加载完毕后的事件
NavigationControl.prototype._loadComplete= function()
{
    this.Body.contentWindow.NavigationControl = this;
    this.onLoadComplete(this);
};
