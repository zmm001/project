/*************************************************
* 搜索控件
* code by xzx ver1.0 update at 07-09-27
*************************************************/

var SearchControl = Class.create();
Object.extend(SearchControl.prototype, MapContrlBase.prototype);
SearchControl.prototype._loadUI = function(){
    this.LoadUI('SearchControl');
};
SearchControl.prototype.Width = 600;
SearchControl.prototype.Height = 600;

//此事可以托管该事件，执行一些附加操作，再将事件抛出
SearchControl.prototype._loadComplete = function(){
  
   // '本地搜索' 给'btnLocalSearch'帮定事件
   this.$('btnLocalSearch').onclick = this._LocalSearch.bindAsEventListener(this);
   // '黄页搜索' 给'btnYellowSearch'帮定事件
   this.$('btnYellowSearch').onclick = this._onYellowPageSearch.bindAsEventListener(this);
   //'工交搜索' 给'btnBusSearch'帮定事件
   this.$('btnBusSearch').onclick = this._onBusSearch.bindAsEventListener(this);
   this.Body.contentWindow.SearchControl = this;
   this.onLoadComplete(this);
};

/****************本地搜索*****************/
SearchControl.prototype._LocalSearch = function(){
    var sKeyword = this.$('txtKeyword').value;
    sKeyword = sKeyword.replaceAll('\'', '').replaceAll('%', '').replaceAll(';', '');
    if (sKeyword.length > 0 && sKeyword != '请输入关键字，例如：火车站')
    {
        this.onLocalSearch(sKeyword);
    }
};
/****************黄页搜索*****************/
SearchControl.prototype._onYellowPageSearch = function(){
    var YellowKeyword = this.$('txtYellowKeyword').value;
    if (YellowKeyword.length > 0 && YellowKeyword != '请输入关键字，例如：超市')
    {
        this.onYellowPageSearch(YellowKeyword);
    }
}
/****************公交搜索*****************/
SearchControl.prototype._onBusSearch = function(){
    //线路搜索
    if (this.$('line0').checked)
    {
        var Param1 = this.$('txtLineSearch').value;
        if (Param1.length > 0 && Param1 != '请输入要搜索的线路')
        {
            this.onBusSearch(0,Param1,'');
        }        
    }
    //站点搜索
    else if(this.$('line1').checked)
    {
       var Param1 = this.$('txtLineSearch').value; 
       if (Param1.length > 0 && Param1 != '请输入站点名')
       {
            this.onBusSearch(1,Param1,'');
       }
    }
    //两点搜索
    else if(this.$('line2').checked)
    {
        var Param1 = this.$("txtBusstart").value;
        var Param2 = this.$("txtBusend").value; 
        if (Param1.length>0 && Param2.length>0)
        {
            this.onBusSearch(2,Param1,Param2); 
        }
    }
}


//外部调用本地搜索事件
SearchControl.prototype.onLocalSearch = function(sKeyword){
};


//外部调用黄页搜索事件
SearchControl.prototype.onYellowPageSearch = function(YellowKeyword){
};


//外部调用公交搜索事件
SearchControl.prototype.onBusSearch = function(iType,Param1,Param2){
};
