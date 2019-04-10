/*
* Field Declare ^-^ 
*/
var SearchResultControl;
if(!SearchResultControl)
    SearchResultControl = Class.create();
        

Object.extend(SearchResultControl.prototype,OptionCardContrlBase.prototype);


SearchResultControl.prototype._loadUI = function(){
    this.LoadUI('SearchResultControl');
};


//重载控件加载完毕后的事件
SearchResultControl.prototype._loadComplete= function()
{
    this.Body.contentWindow.window.ResultControlForm = this;
    
    this.ItemsPanel = new OptionCardContrlBase.ItemsPanel(this.Body,'itemsPanel','cardContent');
    /*--begin MinMax*/
    //window.MContents=this.$('DragWindow');
	window.MContentsRoller=new Aladdincn.Web.Animation.Roller(this.Body,30);
	MContentsRoller.AccFunction=AccelerationFunctions.CrazyElevator;
	MContentsRoller.onafterrollin=function(tm){
		MContentsRoller.LeaveAmount=30;
		tm.contentWindow.document.getElementById('m_h_m').className='m_h_max';
	};
	MContentsRoller.onafterrollout=function(um){
		um.contentWindow.document.getElementById('m_h_m').className='m_h_m';
	};
	this.$('m_h_m').onclick = this.MinMax.bindAsEventListener(this);
	/*----end MinMax----*/
    this.$('m_h_c').onclick = this.Close.bindAsEventListener(this);
    this.$('Bar_L').onclick = this.ToLeft.bindAsEventListener(this.ItemsPanel);
    this.$('Bar_R').onclick = this.ToRight.bindAsEventListener(this.ItemsPanel);
    this.onLoadComplete(this);
    
}
//本地搜索
SearchResultControl.prototype.LocalSearch= function(sKeyWord, iType, sAddress)
{
    if (!sAddress)
        sAddress = '';
    if(sKeyWord!='')
    {
        var url = '../../../../../Fundation/LocalSearch.aspx?key='+escape(sKeyWord) + '&type=' + iType + '&address=' + escape(sAddress);
        this.Item = new OptionCardContrlBase.Item(this.Body,'localsearch' + iType,sAddress + sKeyWord ,url,true,true);
        this.Item.ExpendOut = this.MinMax.bind(this,true);
        this.ItemsPanel.addItem(this.Item);
        this.Show();
    }
}
//周边搜索
SearchResultControl.prototype.LocalNearBySearch= function(sKeyWord,x,y,len)
{
    if(sKeyWord!='')
    {
        var url = '../../../../../Fundation/LocalSearch.aspx?action=1&key='+escape(sKeyWord)+'&x='+x+'&y='+y+'&len='+len;
        this.Item = new OptionCardContrlBase.Item(this.Body,'nearBysearch',sKeyWord,url,true,true);
        this.Item.ExpendOut = this.MinMax.bind(this,true);
        this.ItemsPanel.addItem(this.Item);
        this.Show();
    }
}
//框选搜索
SearchResultControl.prototype.LocalXYSearch= function(sKeyWord,x1,y1,x2,y2)
{
    if(sKeyWord!='')
    {
        var url = '../../../../../Fundation/LocalSearch.aspx?action=2&key='+escape(sKeyWord)+'&x1='+x1+'&y1='+y1+'&x2='+x2+'&y2='+y2;
        this.Item = new OptionCardContrlBase.Item(this.Body,'localsearch',sKeyWord,url,true,true);
        this.Item.ExpendOut = this.MinMax.bind(this,true);
        this.ItemsPanel.addItem(this.Item);
        this.Show();
    }
}
//公交搜索
SearchResultControl.prototype.BusSearch= function(nType,  sParam1,  sParam2)
{
    if(sParam1=='')
    {
        return;
    }
    if(nType=='2'&&sParam2=='')
    {
        return;
    }
    var url = '';
    var title='';
    switch(nType)
    {
        case 0:
        url = '../../../../../Fundation/BusNoSearch.aspx?key='+escape(sParam1);
        title=sParam1;
        break;
        case 1:
        url = '../../../../../Fundation/BusStationSearch.aspx?key='+escape(sParam1);
        title=sParam1;
        break;
        case 2:
        url = '../../../../../Fundation/BusSESearch.aspx?s='+escape(sParam1)+'&e='+escape(sParam2);
        title=sParam1+'--'+sParam2;
        break;
        default:
        break;
    }
    if(title!='')
    {
        this.Item = new OptionCardContrlBase.Item(this.Body,'bussearch',title,url,true,true);
        this.Item.ExpendOut = this.MinMax.bind(this,true);
        this.ItemsPanel.addItem(this.Item);
        this.Show();
    }
}
//对BUSSearch的扩展，根据公交ID，Name查询公交线路
SearchResultControl.prototype.BusIDSearch= function(nID,sName)
{
    if(nID!=''&&sName!='')
    {
        var url =  '../../../../../Fundation/BusNoSearch.aspx?key='+nID+'&action=1';
        this.Item = new OptionCardContrlBase.Item(this.Body,'busnosearch',sName,url,true,true);
        this.Item.ExpendOut = this.MinMax.bind(this,true);
        this.ItemsPanel.addItem(this.Item);
        this.Show();
    }
}
//
//对BUSSearch的扩展，这个方法用在从这么出发，如何到达这里
//action 1从这里出发，2如何到达这里
SearchResultControl.prototype.BusSEXYSearch= function(action,x,y,sName)
{
    if(sName!=''&&sName!=null)
    {
        var url =  '../../../../../Fundation/BusSESearch.aspx?key='+escape(sName)+'&action='+action+'&x='+x+'&y='+y;
        this.Item = new OptionCardContrlBase.Item(this.Body,'bussearch',sName,url,true,true);
        this.Item.ExpendOut = this.MinMax.bind(this,true);
        this.ItemsPanel.addItem(this.Item);
        this.Show();
    }
}
//主题地图搜索
SearchResultControl.prototype.ClassSearch= function(nClassID,sClassName)
{
    if(sClassName==''||sClassName==null)
    {
        sClassName = '主题栏目';
    }
    var url = '../../../../../Fundation/ProMap.aspx?classid='+nClassID + '&classname=' + escape(sClassName);
    this.Item = new OptionCardContrlBase.Item(this.Body,'classsearch',sClassName,url,true,true);
    this.Item.ExpendOut = this.MinMax.bind(this,true);
    this.ItemsPanel.addItem(this.Item);
    this.Show();
}
//新闻显示
SearchResultControl.prototype.NewsSearch= function(nNewsID,sNewsTitle)
{
    if(sNewsTitle==null||sNewsTitle=='')
    {
        sNewsTitle='系统公告';
    }
    var url ='../../../../../Fundation/News.aspx?id='+nNewsID;
    this.Item = new OptionCardContrlBase.Item(this.Body,'new'+nNewsID,sNewsTitle,url,true,true);
    this.Item.ExpendOut = this.MinMax.bind(this,true);
    this.ItemsPanel.addItem(this.Item);
    this.Show();
}

//自定义显示内容
SearchResultControl.prototype.EdushiAnnounce= function(nID,sTitle)
{
    var url ='../../../../../Fundation/EdushiAnnounce.aspx?id='+nID;
    this.Item = new OptionCardContrlBase.Item(this.Body,'EdushiAnnounce'+nID,sTitle,url,true,true);
    this.Item.ExpendOut = this.MinMax.bind(this,true);
    this.ItemsPanel.addItem(this.Item);
    this.Show();
}

//都市烩随机贴子
SearchResultControl.prototype.LocalTopics= function()
{
    var url ='../../../../../Fundation/LocalTopics.aspx';
    this.Item = new OptionCardContrlBase.Item(this.Body,'LocalTopics','生活资讯',url,true,true);
    this.Item.ExpendOut = this.MinMax.bind(this,true);
    this.ItemsPanel.addItem(this.Item);
    this.Show();
}


/*--------------------------对外事件begin------------------*/
//加载完成公交
SearchResultControl.prototype.onBusDataLoad= function(arrBusData,isPandN)
{
    //alert('还未加载公交事件');
}
//加载完成本地搜索
SearchResultControl.prototype.onLocalDataLoad = function(arrLocalData,nBegin,nEnd)
{
    //alert('还未加载本地搜索事件')
}
//加载完成主题地图搜索
SearchResultControl.prototype.onClassDataLoad = function(arrClassData,nBegin,nEnd)
{
    //alert('还未加载主题地图事件')
}
//定位
SearchResultControl.prototype.onGoToXY= function(x,y)
{
    //alert('还未加载定位事件');
}
//推荐POP
SearchResultControl.prototype.onVouchClick= function(title,content,x,y)
{
    //alert('还未加载推荐POP事件');
}
//点击实体或企业
SearchResultControl.prototype.onEntityClick= function(oid,cid,x,y)
{
    //alert('还未加载实体或企业POP事件');
}
//主题泡泡点击
SearchResultControl.prototype.onThemeClick= function(tid,x,y)
{
    //alert('还未加载实体或企业POP事件');
}
SearchResultControl.prototype.onDrawingBusLine= function(coordList)
{
}
/*--------------------------对外事件end------------------*/


/*--------------------------私有事件begin-------------------*/
SearchResultControl.prototype._busDataLoad= function(arrBusData,isPandN)
{
    this.onBusDataLoad(arrBusData,isPandN);
}
SearchResultControl.prototype._localDataLoad = function(arrLocalData,nBegin,nEnd)
{
    this.onLocalDataLoad(arrLocalData,nBegin,nEnd);
}
SearchResultControl.prototype._classDataLoad = function(arrClassData,nBegin,nEnd)
{
    this.onClassDataLoad(arrClassData,nBegin,nEnd);
}
SearchResultControl.prototype._gotoXY= function(x,y)
{
    this.onGoToXY(x,y);
}
//推荐POP
SearchResultControl.prototype._vouchClick= function(title,content,x,y)
{
    this.onVouchClick(title,content,x,y);
}
//实体POP
SearchResultControl.prototype._entityClick= function(oid,cid,x,y)
{
    this.onEntityClick(oid,cid,x,y);
}
//主题POP
SearchResultControl.prototype._themeClick= function(tid,x,y)
{
    this.onThemeClick(tid,x,y);
}
/*--------------------------私有事件end-------------------*/

/*测试加载选项卡*/
SearchResultControl.prototype.addItem= function(id,title,url,flag)
{
    this.Item = new OptionCardContrlBase.Item(this.Body,id,title,url,flag);
    this.ItemsPanel.addItem(this.Item);
    this.Show();
}

/*------------------------内部绑定事件begin-------------------------*/
/*页卡左移*/
SearchResultControl.prototype.ToLeft = function(e)
{
    for(var i=0;i<this.elementlist.length;i++)
    {
        if(this.elementlist[i].element==this.currentElement)
        {
            this.elementlist[i-1].activeItem();
            return;
        }
    }
}
/*页卡右移*/
SearchResultControl.prototype.ToRight = function(e)
{
    for(var i=0;i<this.elementlist.length;i++)
    {
        if(this.elementlist[i].element==this.currentElement)
        {
            this.elementlist[i+1].activeItem();
            return;
        }
    }
}
/*最大最小
IsActive:选项卡添加和激活时，当搜索结果控件最小化时展开搜索结果控件*/
SearchResultControl.prototype.MinMax=function(IsActive)
{
    var ani=Aladdincn.Web.Animation;
    if(IsActive)
    {
        
        if(!MContentsRoller.isExpanded())
        {
	        MContentsRoller.rollOut(ani.RollDirection.TopDown);
	    }
	}
	else
	{
	    if(!MContentsRoller.isExpanded())
	    {
	        MContentsRoller.rollOut(ani.RollDirection.TopDown);
        }
        else
        {
            MContentsRoller.rollIn(ani.RollDirection.BottomUp);
        }
    }
}
/*隐藏控件*/
SearchResultControl.prototype.Close=function(e)
{
    this.Hide();
    this.onBusDataLoad(null,1);
    this.onLocalDataLoad(null,0,0);
}
/*清除选项卡*/
SearchResultControl.prototype.Clear= function()
{
    this.ItemsPanel.clearItem();
    this.Hide();
}
/*------------------------内部绑定事件end-------------------------*/
