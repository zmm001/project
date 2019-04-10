/*************************************************
* 查找周边控件
* code by lzz ver1.0 update at 07-10-17
*************************************************/

var PeripheralSearchControl = Class.create();
Object.extend(PeripheralSearchControl.prototype, MapContrlBase.prototype);
PeripheralSearchControl.prototype._loadUI = function(){
    this.LoadUI('PeripheralSearchControl');
};

//显示查找周边窗体
PeripheralSearchControl.prototype.ShowPeripheralSearch = function(x, y){
    this.$('btnSearch').onclick = function(){
        var area = 500;
        if (this.$('maxArea').checked)
        {
            area = 1000;
        }
        this.onPeripheralSearch(this.$('txtPlace').value, x, y, area);
    }.bindAsEventListener(this);
    this.$('divHotKeyWords').innerHTML = '';
    if (typeof SearchHotKeyWords != 'undefined')
    {
        for(var i=0;i<SearchHotKeyWords.length;i++)
        {
            this.$('divHotKeyWords').innerHTML += '<a class="keyword" href="javascript:PeripheralSearchControl._onPeripheralSearch(\''+SearchHotKeyWords[i]+'\',' + x + ',' + y + ');">'+SearchHotKeyWords[i]+'</a>&nbsp;&nbsp;';
        }
    }
    this.Show();
};
PeripheralSearchControl.prototype._onPeripheralSearch = function(keyword, x, y){
    var area = 500;
    this.$('txtPlace').value = keyword;
    if (this.$('maxArea').checked)
    {
        area = 1000;
    }
    this.onPeripheralSearch(keyword, x, y, area);
};

//重载控件加载完毕后的事件
PeripheralSearchControl.prototype._loadComplete= function(){
    this.Body.contentWindow.PeripheralSearchControl = this;
    this.onLoadComplete(this);
};
//周边查找事件
PeripheralSearchControl.prototype.onPeripheralSearch = function(keyword, x, y, area){
};
PeripheralSearchControl.prototype.HotKeywords = '';