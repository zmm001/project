/*************************************************
* 拉框搜索控件
* code by lzz ver1.0 update at 07-10-16
*************************************************/

var PaneSearchControl = Class.create();
Object.extend(PaneSearchControl.prototype, MapContrlBase.prototype);
PaneSearchControl.prototype._loadUI = function(){
    this.LoadUI('PaneSearchControl');
};
//显示拉框范围
PaneSearchControl.prototype.ShowPane = function(x1, y1, x2, y2){
    //如果拉框结束点坐标小于起始点坐标，则互换两点
    if (x1 > x2)
    {
        x1 = x1 + x2;
        x2 = x1 - x2;
        x1 = x1 - x2;
    }
    if (y1 > y2)
    {
        y1 = y1 + y2;
        y2 = y1 - y2;
        y1 = y1 - y2;
    }
    this.$('btnSearch').onclick = function(){
        this.onPaneSearch(this.$('Paneltxt').value, x1, y1, x2, y2);
    }.bindAsEventListener(this);
    this.$('divHotKeyWords').innerHTML = '';
    for(var i=0;i<SearchHotKeyWords.length;i++)
    {
        this.$('divHotKeyWords').innerHTML += '<a class="keyword" href="#;" onclick="PaneSearchControl.onPaneSearch(\''+SearchHotKeyWords[i]+'\',' + x1 + ',' + y1 + ',' + x2 + ',' + y2 + ')">'+SearchHotKeyWords[i]+'</a>&nbsp;&nbsp;';
    }
    this.Show();
};

//重载控件加载完毕后的事件
PaneSearchControl.prototype._loadComplete= function()
{
    this.Body.contentWindow.PaneSearchControl = this;
    this.onLoadComplete(this);
};
//重新拉框事件
PaneSearchControl.prototype.onRePane = function(){
};
//拉框结束事件
PaneSearchControl.prototype.onPaneClose = function(){
};
PaneSearchControl.prototype.onPaneSearch = function(keyword,x1,y1,x2,y2){
};

PaneSearchControl.prototype.HotKeywords = '';