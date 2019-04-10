/*************************************************
* 实体泡泡控件
* code by xzx ver1.0 update at 07-09-26
*************************************************/
var EntityPopControl = Class.create();
Object.extend(EntityPopControl.prototype, OptionCardContrlBase.prototype);  //继承基类

//重写基类载入模板方法
EntityPopControl.prototype._loadUI = function(){
    this.LoadUI('EntityPopControl');
};
//重写控件加载完毕后的事件
EntityPopControl.prototype._loadComplete= function()
{
    this.Body.contentWindow.window.PopControlForm = this;
    this.ItemsPanel = new OptionCardContrlBase.ItemsPanel(this.Body,'itemsPanel','cardContent');
    this.onLoadComplete(this);
};
EntityPopControl.prototype.ClearData = function(){
    this.$('Entr_Title').innerHTML=_Lloading[this.Config._L].replace('images/','../images/');
    this.$('Entro_yp').href = 'javascript:;';  
    this.$('Entro_yp').target = '_self'; 
    this.$('Entr_Add').innerHTML=_Ladd[this.Config._L]+_Lloading[this.Config._L].replace('images/','../images/');
    this.$('Entr_Tell').innerHTML=_Ltel[this.Config._L]+_Lloading[this.Config._L].replace('images/','../images/');
    this.$('Entr_Edd').value='loading';
    this.$('Entr_img').src='../images/nophoto.jpg';
    this.$('Entr_img_a').href='javascript:;';
    this.$('Entr_img_a').target = '_self'; 
    //this.$('Entr_close').onclick = function(){};
    this.$('Entro_mark').onclick = function(){};
    this.$('Entro_error').onclick = function(){};
};
//显示实体泡泡方法，o实体对象。
EntityPopControl.prototype.ShowEntityPop = function(oid)
{     
    if(this.OID==oid)
    {
        this.Show();
        return;
    }
    else
    {  
        this.OID = oid;
    }
    
    this.ItemsPanel.clearItem();
    this.ClearData();
    this.Show();
    var url=this.Config._DataCenterUrl + 'CommMap/CompanyInfo.aspx?node='+this.Config._Node+'&l='+this.Config._L+'&v=1.0&req=2&id='+oid;
    ENetwork.DownloadScript(url,this.LoadEntityPopData.bindAsEventListener(this));
    
};

EntityPopControl.prototype.LoadEntityPopData = function()
{
    if (typeof o == 'undefined' || o == null)
    {
        this.Hide();
        this.OID = '';
        alert('data load failture, please try again later.');
        return;
    }
    if (this.OID != o.ID)
    {
        return;
    }
    this.$('Entr_Title').innerHTML=o.OwnerName;
    //this.$('Entro_yp').href = 'http://' + this.Config._AppDomain + '/yp/OwnerDetail.aspx?ID='+o.ID;  
    //this.$('Entro_yp').target = '_blank'; 
    this.$('Entr_Add').innerHTML=_Ladd[this.Config._L]+o.Oaddress;
    this.$('Entr_Tell').innerHTML=_Ltel[this.Config._L]+o.OPhone;
    this.$('Entr_Edd').value='http://' + this.Config._AppDomain + '/?' + o.ID;
    if(o.OImage!=null&&o.OImage!='')
    {
        this.$('Entr_img').src=this.Config._UpImagesUrl+'/'+this.Config._UpImages+'/'+o.OImagePath+'/s'+o.OImage;    
        this.$('Entr_img').onerror = this._LoadImgErr.bindAsEventListener(this.$('Entr_img'),'../images/nophoto.jpg');
        this.$('Entr_img_a').href=this.Config._UpImagesUrl+'/'+this.Config._UpImages+'/'+o.OImagePath+'/'+o.OImage; 
        this.$('Entr_img_a').target = '_blank'; 
    }
    else
    {
        this.$('Entr_img_a').target ='_self';
    }
    this.$('Entr_close').onclick = this.Close.bindAsEventListener(this);
    this.$('Entro_mark').onclick = this._sign.bindAsEventListener(this,o.CenterX,o.CenterY,o.OwnerName);
    this.$('Entro_error').onclick = this._cavil.bindAsEventListener(this,0,o.ID,o.OwnerName,o.CenterX,o.CenterY);   
    
    //新增POP广告
    if(window._isSourceUrl&&typeof SourceAd!='undefined'&&SourceAd!=null)
    {
        window._isSourceUrl = false;
        this.$('PopADLink').href = 'http://'+SourceAd.Link.replace('http://','');
        this.$('PopADImageSrc').src = this.Config._PicUrl + SourceAd.ImagePath+'/'+SourceAd.ImageName;
        this.$('PopADImageSrc').style.display = 'block';
    }
    else if(typeof POPAd!='undefined'&&POPAd!=null)
    {
        this.$('PopADLink').href = 'http://'+POPAd.Link.replace('http://','');
        this.$('PopADImageSrc').src = this.Config._PicUrl + POPAd.ImagePath+'/'+POPAd.ImageName;
        this.$('PopADImageSrc').style.display = 'block';
    }
    else
    {
        this.$('PopADImageSrc').style.display = 'none';
    }
    
    var companylisturl = '../../../../../Fundation/CompanyList.aspx?oid='+o.ID;
    this.CompanyListItem = new OptionCardContrlBase.Item(this.Body,'companylist','Units',companylisturl,false,false,59);
    this.ItemsPanel.addItem(this.CompanyListItem);
    
    var bustransferurl = '../../../../../Fundation/BusTransfer.aspx?x='+o.CenterX +'&y='+o.CenterY;
    this.BusTransferItem = new OptionCardContrlBase.Item(this.Body,'bustransfer','Bus',bustransferurl,false,false,59);
    this.ItemsPanel.addItem(this.BusTransferItem);
    
    var nearbyurl = '../../../../../Fundation/NearBySearch.aspx?x='+o.CenterX +'&y='+o.CenterY;
    this.NearByItem = new OptionCardContrlBase.Item(this.Body,'nearby','Nearby Search',nearbyurl,false,false,80);
    this.ItemsPanel.addItem(this.NearByItem);
    
    var nearbusurl = '../../../../../Fundation/PeripheralBus.aspx?x='+o.CenterX +'&y='+o.CenterY;
    this.NearBusItem = new OptionCardContrlBase.Item(this.Body,'nearbus','Bus Nearby',nearbusurl,false,false,80);
    this.NearBusItem.cardFrame.scrolling = 'auto';
    this.NearBusItem.cardFrame.style.height = '130px';
    this.ItemsPanel.addItem(this.NearBusItem);
    this.CompanyListItem.activeItem();
    
    this.onHistorySaved(1, o);
}
//显示企业泡泡方法，c企业对象。
EntityPopControl.prototype.ShowComanyPop = function(cid)
{
    if(this.CID==cid)
    {
        this.Show();
        return;
    }
    else
    {  
        this.CID = cid;
    }
    this.ItemsPanel.clearItem();
    this.ClearData();
    this.Show();
    var url=this.Config._DataCenterUrl + 'CommMap/CompanyInfo.aspx?node='+this.Config._Node+'&l='+this.Config._L+'&v=1.0&req=1&id='+cid;
    ENetwork.DownloadScript(url,this.LoadComanyPopData.bindAsEventListener(this));
}

EntityPopControl.prototype.LoadComanyPopData = function()
{
    if (typeof c == 'undefined' || c == null)
    {
        this.Hide();
        this.CID = '';
        alert('data load failture, please try again later.');
        return;
    }
    if (this.CID != c.ComID)
    {
        return;
    }
    this.$('Entr_Title').innerHTML=c.CompanyName;  
    //this.$('Entro_yp').href = 'http://' + this.Config._AppDomain + '/yp/CompanyDetail.aspx?ID='+c.ComID;
    //this.$('Entro_yp').target = '_blank'; 
    this.$('Entr_Add').innerHTML='Address:' + c.ComAddress;
    this.$('Entr_Tell').innerHTML='Tel' + c.ComPhone;
    this.$('Entr_Edd').value='http://' + this.Config._AppDomain + '/?cid=' + c.ComID;
    
    if(c.ComImage!=null&&c.ComImage!='')
    {
        this.$('Entr_img').src=this.Config._UpImagesUrl+'/'+this.Config._UpImages+'/'+c.ComImagePath+'/s'+c.ComImage; 
        this.$('Entr_img_a').href=this.Config._UpImagesUrl+'/'+this.Config._UpImages+'/'+c.ComImagePath+'/'+c.ComImage;  
        this.$('Entr_img').onerror = this._LoadImgErr.bindAsEventListener(this.$('Entr_img'),'../images/nophoto.jpg');
        this.$('Entr_img_a').target = '_blank';
    }
    else
    {
        this.$('Entr_img_a').target ='_self';
    }
    this.$('Entr_close').onclick = this.Close.bindAsEventListener(this);
    this.$('Entro_mark').onclick = this._sign.bindAsEventListener(this,c.ComX,c.ComY,c.CompanyName);
    this.$('Entro_error').onclick = this._cavil.bindAsEventListener(this,1,c.ComID,c.CompanyName,c.ComX,c.ComY);
    
    if(window._isSourceUrl&&typeof SourceAd!='undefined'&&SourceAd!=null)
    {
        window._isSourceUrl = false;
        this.$('PopADLink').href = 'http://'+SourceAd.Link.replace('http://','');
        this.$('PopADImageSrc').src = this.Config._PicUrl + SourceAd.ImagePath+'/'+SourceAd.ImageName;
        this.$('PopADImageSrc').style.display = 'block';
    }
    else if(typeof POPAd!='undefined'&&POPAd!=null)
    {
        this.$('PopADLink').href = 'http://'+POPAd.Link.replace('http://','');
        this.$('PopADImageSrc').src = this.Config._PicUrl + POPAd.ImagePath+'/'+POPAd.ImageName;
        this.$('PopADImageSrc').style.display = 'block';
    }
    else
    {
        this.$('PopADImageSrc').style.display = 'none';
    }
    
    var bustransferurl = '../../../../../Fundation/BusTransfer.aspx?x='+c.ComX +'&y='+c.ComY;
    this.BusTransferItem = new OptionCardContrlBase.Item(this.Body,'bustransfer','Bus',bustransferurl,false,false,59);
    this.ItemsPanel.addItem(this.BusTransferItem);
    var nearbyurl = '../../../../../Fundation/NearBySearch.aspx?x='+c.ComX +'&y='+c.ComY;
    this.NearByItem = new OptionCardContrlBase.Item(this.Body,'nearby','Nearby Search',nearbyurl,false,false,80);
    this.ItemsPanel.addItem(this.NearByItem);
    var nearbusurl = '../../../../../Fundation/PeripheralBus.aspx?x='+c.ComX +'&y='+c.ComY;
    this.NearBusItem = new OptionCardContrlBase.Item(this.Body,'nearbus','Bus Nearby',nearbusurl,false,false,80);
    this.NearBusItem.cardFrame.scrolling = 'auto';
    this.NearBusItem.cardFrame.style.height = '130px';
    this.ItemsPanel.addItem(this.NearBusItem);
    this.BusTransferItem.activeItem();
    this.onHistorySaved(2, c);
}


//内部事件
EntityPopControl.prototype.fnCopyCode = function (strUrl, msg)
{
	var txt = this.$(strUrl).value;
	fnCopyToClipboard(txt,msg);
}
//图像加载三次仍然失败则移除
EntityPopControl.prototype._LoadImgErr = function(e,imgpath){
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
EntityPopControl.prototype.Close=function(e)
{
    this.Hide();
}

//对内接口
//公交ID，Name搜索公交线路的事件
EntityPopControl.prototype._sign = function(e,x,y,sName)
{
    this.onSign(x,y,sName)
};
//纠错事件
EntityPopControl.prototype._cavil = function(e,type,nID,sName,x, y)
{          
    this.onCavil(type,nID,sName,x, y);         
};
EntityPopControl.prototype._busIdSearch = function(nID,sName)
{   
    this.onBusIDSearch(nID,sName);                 
};
//从这里出发，如何到达这里公交搜索,action:1从怎么出发，2如何到达这里
EntityPopControl.prototype._busSEXYSearch = function(action,x,y,sKeyword)
{   
    this.onBusSEXYSearch(action,x,y,sKeyword);                 
};
//周边搜索的事件
EntityPopControl.prototype._nearbySearch = function(sKeyword,x,y,len)
{                   
    this.onLocalNearBySearch(sKeyword,x,y,len);
};
//对外接口
//标记该位置的事件
EntityPopControl.prototype.onSign = function(x,y,sName)
{
    alert('未实现标记方法');            
};
//纠错事件
EntityPopControl.prototype.onCavil = function(type,nID,sName,x, y)
{        
    alert('未实现纠错方法');          
};
//公交ID，Name搜索公交线路的事件
EntityPopControl.prototype.onBusIDSearch = function(nID,sName)
{                    
};
//从这里出发，如何到达这里公交搜索
EntityPopControl.prototype.onBusSEXYSearch = function(action,x,y,sKeyword)
{                    
};
//周边搜索的事件
EntityPopControl.prototype.onLocalNearBySearch = function(sKeyword,x,y,len)
{                   
};
//保存历史记录
EntityPopControl.prototype.onHistorySaved = function(type,spot){
};
