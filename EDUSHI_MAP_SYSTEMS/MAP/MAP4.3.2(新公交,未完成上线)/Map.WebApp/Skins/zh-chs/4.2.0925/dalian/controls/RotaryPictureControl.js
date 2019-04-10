/*************************************************
* 视窗广告控件
* code by lzz ver1.0 update at 07-10-25
*************************************************/

var RotaryPictureControl = Class.create();
Object.extend(RotaryPictureControl.prototype, MapContrlBase.prototype);
RotaryPictureControl.prototype._loadUI = function(){
    this.LoadUI('RotaryPictureControl');
};

//重载控件加载完毕后的事件
RotaryPictureControl.prototype._loadComplete= function(){
    this.Body.contentWindow.RotaryPictureControl = this;
    this.onLoadComplete(this);
};

RotaryPictureControl.prototype.onDataLoadComplete = function(){
};