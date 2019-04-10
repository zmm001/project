/*************************************************
* 从这里出发搜索控件
* code by lzz ver1.0 update at 07-10-17
*************************************************/

var FromSearchControl = Class.create();
Object.extend(FromSearchControl.prototype, MapContrlBase.prototype);
FromSearchControl.prototype._loadUI = function(){
    this.LoadUI('FromSearchControl');
};

FromSearchControl.prototype.ShowFromHereSearch = function(x, y){
    this.$('btnSearch').onclick = function(){
        this.onShowFromHereSearch(this.$('popbusnametxt1').value, x, y);
    }.bindAsEventListener(this);
    this.Show();
};

//重载控件加载完毕后的事件
FromSearchControl.prototype._loadComplete= function(){
    this.Body.contentWindow.FromSearchControl = this;
    this.onLoadComplete(this);
};

//从这里出发事件 , keyword：目的地
FromSearchControl.prototype.onShowFromHereSearch = function(keyword, x, y){
};
