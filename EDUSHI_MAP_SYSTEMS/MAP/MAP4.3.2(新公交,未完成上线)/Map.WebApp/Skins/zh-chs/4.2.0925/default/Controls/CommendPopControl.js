/*************************************************
* 推荐泡泡控件
* code by lzz ver1.0 update at 07-10-26
*************************************************/

var CommendPopControl = Class.create();
Object.extend(CommendPopControl.prototype, MapContrlBase.prototype);
CommendPopControl.prototype._loadUI = function(){
    this.LoadUI('CommendPopControl');
};

//显示推荐泡泡
CommendPopControl.prototype.ShowCommendPop = function(sTitle, sContent)
{
    this.$('tjgg-1').innerHTML = unescape(sTitle);
    this.$('tjgg-4').innerHTML = unescape(sContent).replaceAll('/cityresource2/', this.Config._PicUrl);;
    this.Show();
};

//重载控件加载完毕后的事件
CommendPopControl.prototype._loadComplete= function(){
    this.Body.contentWindow.CommendPopControl = this;
    this.onLoadComplete(this);
};