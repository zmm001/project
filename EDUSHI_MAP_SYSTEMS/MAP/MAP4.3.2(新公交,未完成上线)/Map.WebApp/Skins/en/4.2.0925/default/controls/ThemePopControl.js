/*************************************************
* 主题泡泡控件
* code by xzx ver1.0 update at 07-09-26
*************************************************/
var ThemePopControl = Class.create();
Object.extend(ThemePopControl.prototype, OptionCardContrlBase.prototype);  //继承基类

//重写基类载入模板方法
ThemePopControl.prototype._loadUI = function(){
    this.LoadUI('ThemePopControl');
};
//重写控件加载完毕后的事件
ThemePopControl.prototype._loadComplete= function()
{
    this.Body.contentWindow.window.PopControlForm = this;
    this.ItemsPanel = new OptionCardContrlBase.ItemsPanel(this.Body,'itemsPanel','cardContent');
    this.onLoadComplete(this);
};
ThemePopControl.prototype.ClearData = function(){
    this.$('Entr_Title').innerHTML=_Lloading[this.Config._L].replace('images/','../images/');
    this.$('Entr_Add').innerHTML=_Ladd[this.Config._L]+_Lloading[this.Config._L].replace('images/','../images/');
    this.$('Entr_Tell').innerHTML=_Ltel[this.Config._L]+_Lloading[this.Config._L].replace('images/','../images/');
   // this.$('Entr_Edd').value='loading';
    this.$('Entr_img').src='../images/nophoto.jpg';
    this.$('Entr_img_a').href='javascript:;';
    this.$('Entr_img_a').target = '_self'; 
    this.$('Entro_mark').onclick = function(){};
    this.$('Entro_error').onclick = function(){};
    this.$('Entro_yp').style.display = 'none';
};

//显示主题泡泡
ThemePopControl.prototype.ShowThemePop = function(tid)
{
    if(this.TID==tid)
    {
        this.Show();
        return;
    }
    else
    {  
        this.TID = tid;
    }
    this.ItemsPanel.clearItem();
    this.ClearData();
    this.Show();
    var url= this.Config._DataCenterUrl + 'CommMap/CompanyInfo.aspx?node='+this.Config._Node+'&l='+this.Config._L+'&v=1.0&req=4&id='+tid;
    ENetwork.DownloadScript(url,this.LoadThemePopData.bindAsEventListener(this));
}

ThemePopControl.prototype.LoadThemePopData = function()
{
    if (typeof c == 'undefined' || c == null)
    {
        this.Hide();
        this.CID = '';
        return;
    }
    this.$('Entr_Title').innerHTML=c.CompanyName; 
    this.$('Entr_Add').innerHTML=_Ladd[this.Config._L]+c.ComAddress;
    this.$('Entr_Tell').innerHTML=_Ltel[this.Config._L]+c.ComPhone;
    this.$('Entr_Edd').value='http://' + this.Config._AppDomain + '/?TPop=' + this.TID + '&x=' + c.ComX + '&y=' + c.ComY;
    if (c.YPage.length > 0)
    {
        this.$('Entro_yp').style.display = 'block';
        this.$('Entro_yp').href = c.YPage;
        this.$('Entro_yp').target = '_blank';
    }
    if(c.ComImage!=null&&c.ComImage!='')
    {
        this.$('Entr_img').src=this.Config._UpImagesUrl+'/'+this.Config._UpImages+'/'+c.ComImagePath+'/s'+c.ComImage; 
        this.$('Entr_img_a').href=this.Config._UpImagesUrl+'/'+this.Config._UpImages+'/'+c.ComImagePath+'/'+c.ComImage;  
        //this.$('Entr_img').onerror = this._LoadImgErr.bindAsEventListener(this.$('Entr_img'),'../images/nophoto.jpg');
        this.$('Entr_img_a').target ='_blank';
    }
    else
    {
        this.$('Entr_img_a').target ='_self';
    }
    this.$('Entr_close').onclick = this.Close.bindAsEventListener(this);
    this.$('Entro_mark').onclick = this._sign.bindAsEventListener(this,c.ComX,c.ComY,c.CompanyName);
    this.$('Entro_error').onclick = this._cavil.bindAsEventListener(this,2,c.ID,c.CompanyName,c.ComX,c.ComY);
    
    var bustransferurl = '../../../../../Fundation/BusTransfer.aspx?x='+c.ComX +'&y='+c.ComY;
    this.BusTransferItem = new OptionCardContrlBase.Item(this.Body,'bustransfer','Bus Transfer',bustransferurl,false,false,59);
    this.ItemsPanel.addItem(this.BusTransferItem);
    var nearbyurl = '../../../../../Fundation/NearBySearch.aspx?x='+c.ComX +'&y='+c.ComY;
    this.NearByItem = new OptionCardContrlBase.Item(this.Body,'nearby','Find a peripheral',nearbyurl,false,false,59);
    this.ItemsPanel.addItem(this.NearByItem);
    var nearbusurl = '../../../../../Fundation/PeripheralBus.aspx?x='+c.ComX +'&y='+c.ComY;
    this.NearBusItem = new OptionCardContrlBase.Item(this.Body,'nearbus','Peripheral bus',nearbusurl,false,false,59);
    this.NearBusItem.cardFrame.scrolling = 'auto';
    this.NearBusItem.cardFrame.style.height = '130px';
    this.ItemsPanel.addItem(this.NearBusItem);
    this.BusTransferItem.activeItem();
    this.onHistorySaved(3, c);
}


//内部事件
ThemePopControl.prototype.fnCopyCode = function (strUrl, msg){
	var txt = this.$(strUrl).value;
	fnCopyToClipboard(txt,msg);

	
}
//图像加载三次仍然失败则移除
ThemePopControl.prototype._LoadImgErr = function(e,imgpath){
    if(this.c=='undefined'||this.c==null){
        this.c=0;
    }
    else{
        this.c++;
    }
    if(this.c>3){
        if (this.src == imgpath)
        {
            return; //默认图片加载失败则不再触发 , ie7光设置 this.onerror=null; 无效
        }
        this.src=imgpath;
        this.onerror=null;
        this.parentNode.href = 'javascript:;';
        this.parentNode.target = '_self';
    }
    else{
        this.src=this.src;
    }
}
ThemePopControl.prototype.Close=function(e)
{
    this.Hide();
}

//对内接口
//公交ID，Name搜索公交线路的事件
ThemePopControl.prototype._sign = function(e,x,y,sName)
{
    this.onSign(x,y,sName)
};
//纠错事件
ThemePopControl.prototype._cavil = function(e,type,nID,sName,x, y)
{          
    this.onCavil(type,nID,sName,x, y);         
};
ThemePopControl.prototype._busIdSearch = function(nID,sName)
{   
    this.onBusIDSearch(nID,sName);                 
};
//从这里出发，如何到达这里公交搜索,action:1从怎么出发，2如何到达这里
ThemePopControl.prototype._busSEXYSearch = function(action,x,y,sKeyword)
{   
    this.onBusSEXYSearch(action,x,y,sKeyword);                 
};
//周边搜索的事件
ThemePopControl.prototype._nearbySearch = function(sKeyword,x,y,len)
{                   
    this.onLocalNearBySearch(sKeyword,x,y,len);
};
//对外接口
//标记该位置的事件
ThemePopControl.prototype.onSign = function(x,y,sName)
{
    alert('未实现标记方法');            
};
//纠错事件
ThemePopControl.prototype.onCavil = function(type,nID,sName,x, y)
{        
    alert('未实现纠错方法');          
};
//公交ID，Name搜索公交线路的事件
ThemePopControl.prototype.onBusIDSearch = function(nID,sName)
{                    
};
//从这里出发，如何到达这里公交搜索
ThemePopControl.prototype.onBusSEXYSearch = function(action,x,y,sKeyword)
{                    
};
//周边搜索的事件
ThemePopControl.prototype.onLocalNearBySearch = function(sKeyword,x,y,len)
{                   
};

ThemePopControl.prototype.onHistorySaved = function(type,spot){
};
