/*************************************************
* 到这里搜索控件
* code by lzz ver1.0 update at 07-10-17
*************************************************/
var ToSearchControl = Class.create();
Object.extend(ToSearchControl.prototype, ControlBase.prototype);
ToSearchControl.prototype._loadUI = function(){
    this.LoadUI('ToHereSearch');
};

ToSearchControl.prototype.ShowToHereSearch = function(x, y){
    this.$('btnSearch').onclick = function(){
        this.onShowToHereSearch(this.$('popbusnametxt1').value, x, y);
    }.bindAsEventListener(this);
    this.Show();
};
//重载控件加载完毕后的事件
ToSearchControl.prototype._loadComplete= function(){
    
    this.Body.contentWindow.ToSearchControl = this;
    
    this.onLoadComplete(this);
};
//到这里事件 , keyword：来源地
ToSearchControl.prototype.onShowToHereSearch = function(keyword, x, y){
};