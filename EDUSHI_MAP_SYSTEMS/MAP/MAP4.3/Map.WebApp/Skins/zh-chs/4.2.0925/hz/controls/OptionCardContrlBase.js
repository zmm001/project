/*
    搜索结果页卡和地图PoP的基类
*/
var OptionCardContrlBase;
if(!OptionCardContrlBase)
    OptionCardContrlBase= Class.create();
    
Object.extend(OptionCardContrlBase.prototype,MapContrlBase.prototype);

/*
初始化选项卡和选项卡对应的Iframe的容器
iframebody：父级容器，ulId：选项卡容器，cardId：Iframe容器
*/
OptionCardContrlBase.ItemsPanel=function(iframebody,ulId,cardId)
{
    this.Piframe = iframebody;
    this.Pelement=iframebody.contentWindow.document.getElementById(ulId);
    if(!this.Pelement)
    {
        //alert(ulId+'不存在');
        return;
    }
    this.elementlist = new Array();
    this.register=new Array();
    this.currentElement=null;
    this.PcardFrame=iframebody.contentWindow.document.getElementById(cardId);
    if(!this.PcardFrame)
    {
        //alert(cardId+'不存在');
        return;
    }
    this.currentCardframe=null;
}
/*
*增加一个选项卡和内容页
*/
OptionCardContrlBase.ItemsPanel.prototype.addItem=function(item)
{
    if(this.validateExist(item.url))
    {
        return;
    }
    item.panel=this;
    this.Pelement.appendChild(item.element);
    this.PcardFrame.appendChild(item.cardFrame);  
    this.visitedRegister(item,'add');
    item.ExpendOut();
}
/*
*删除选项卡和内容页
*/
OptionCardContrlBase.ItemsPanel.prototype.deleteItem=function(item)
{                        
    
    this.visitedRegister(item,'delete');
    if(this.register.length>0)
    {
        this.Pelement.removeChild(item.element);
        this.PcardFrame.removeChild(item.cardFrame);
    }
}
/*
清除所有选项卡和内容页
*/
OptionCardContrlBase.ItemsPanel.prototype.clearItem=function()
{                        
    this.visitedRegister(null,'clear');
}
/*
选项卡更改后执行的页面布局的更改
*/
OptionCardContrlBase.ItemsPanel.prototype.changeSubPage=function()
{
    if(this.register.length==0)
    {
        for(var i=0;i<this.Pelement.childNodes.length;i++)
        {
           this.Pelement.removeChild(this.Pelement.childNodes[i]);
           this.PcardFrame.removeChild(this.PcardFrame.childNodes[i]);
           i--;
        }
        this.Piframe.style.display = 'none'; 
        this.Pelement.style.width='0px';
    }
    else
    {
        var pWidth = 0;
        for(var i=0;i<this.register.length;i++)
        {
            pWidth += this.register[i].elementWidth;
        }
        this.Pelement.style.width = (pWidth+5) + 'px';
    }
    
    if(this.Piframe.contentWindow.document.getElementById('Bar_L')&&this.Piframe.contentWindow.document.getElementById('Bar_R'))
    {   
        if(parseInt(this.Pelement.style.width.replace('px',''),10)>parseInt(this.Pelement.parentNode.style.width.replace('px',''),10))
        {
            var LWidth=0
            var i = 0;
            var j = 0;
            for(i;i<this.elementlist.length;i++)
            {
                if(this.elementlist[i].element==this.currentElement)
                {
                    for(j=i;j>=0;j--)
                    {
                        LWidth+=this.elementlist[j].elementWidth
                    }
                    if(LWidth>parseInt(this.Pelement.parentNode.style.width.replace('px',''),10))
                    {
                        this.Pelement.style.left=-(LWidth-parseInt(this.Pelement.parentNode.style.width.replace('px',''),10)) + 'px';
                    }
                    else
                    {
                        this.Pelement.style.left='0px';
                    }
	                break;
	            }
            }
            if(this.Pelement.style.left=='0px')
            {
                this.Piframe.contentWindow.document.getElementById('Bar_L').style.display = 'none';
            }
            else
            {
                this.Piframe.contentWindow.document.getElementById('Bar_L').style.display = 'block';
            }
            if((parseInt(this.Pelement.style.width.replace('px',''),10)+parseInt(this.Pelement.style.left.replace('px',''),10))>parseInt(this.Pelement.parentNode.style.width.replace('px',''),10)+5)
            {
                this.Piframe.contentWindow.document.getElementById('Bar_R').style.display = 'block';
            }
            else
            {
                this.Piframe.contentWindow.document.getElementById('Bar_R').style.display = 'none';
            }
        }
        else
        {
            this.Pelement.style.left='0px';
            this.Piframe.contentWindow.document.getElementById('Bar_L').style.display = 'none';
            this.Piframe.contentWindow.document.getElementById('Bar_R').style.display = 'none';
        }
    }
}

/*判断当前URL是否在搜索结果页中打开*/
OptionCardContrlBase.ItemsPanel.prototype.validateExist=function(url)
{
    for(var i=0;i<this.register.length;i++)
    {
        if(this.register[i].url==url)
        {
            this.register[i].activeItem();
            return true;
        }
    }        
    return false;
}
/*
*   选项卡的操作
*   type：add | delete | active | clear
*
*/
OptionCardContrlBase.ItemsPanel.prototype.visitedRegister=function(item,type)
{
    var i=this.register.length;
    if(type=='add')
    {                
        for(var k=0;k<i;k++)
        {
            this.register[k].resetItem();
        }
        this.elementlist[i]=item;
        this.register[i]=item;
        this.currentElement=item.element;
        this.currentElement.className='active';
        this.currentCardframe = item.cardFrame
        this.currentCardframe.className = 'iframevis';
        this.changeSubPage();
    }
    else if(type=='delete')
    {         
        /*选项卡关闭页面时候执行的方法*/
        if(typeof item.cardFrame.contentWindow.fnExit=='function')
        {
            item.cardFrame.contentWindow.fnExit();
        }                                
        for(k=0;k<i;k++)
        {
            if(this.register[k]==item)
            {
                this.register.splice(k,1);
            }
            if(this.elementlist[k]==item)
            {
                this.elementlist.splice(k,1);
            }
        }
        if(item.element==this.currentElement)
        {
            i=this.register.length;
            if(i>0)
            {
                this.currentElement=this.register[i-1].element;
                this.currentCardframe=this.register[i-1].cardFrame;
                this.register[i-1].activeItem();
            }
            else
                this.currentElement=null;
        }
        this.changeSubPage();
    }
    else if(type=='active')
    {
        /*选项卡激活时候的页面初始化方法*/
        if(typeof item.cardFrame.contentWindow.fnInit=='function')
        {
            item.cardFrame.contentWindow.fnInit();
        }   
        if(this.currentElement==item.element)
            return;
        else
        {                                        
            for(k=0;k<i;k++)
            {
                if(this.register[k]==item)
                {
                    this.register.splice(k,1);
                    break;
                }
            }
            i=this.register.length;
            for(k=0;k<i;k++)
            {
                this.register[k].resetItem();
            }
            this.currentElement=item.element;
            this.currentCardframe=item.cardFrame;
            this.register.push(item);
            
        }
        
        this.changeSubPage();
    }
    else if(type=='clear')
    {
        this.register.splice(0,this.register.length);
        this.changeSubPage();
    }
}
/*
*初始化选项卡和内容页
*/
OptionCardContrlBase.Item=function(iframebody,id,title,url,allowclose,autoactive,width)
{      
    this.Piframe = iframebody;  
    this.element=this.$C(iframebody,'li');
    if(width==null)
    {
        this.elementWidth = 80;
    }
    else
    {
        this.element.style.width =width + 'px';
        this.elementWidth = width;
    }
    this.panel={};
    this.id=id+$Rnd();
    this.title=title;
    this.url=url;
    this.autoactive = autoactive;
    this.allowclose=allowclose;
    this.cardFrame = this.$C(iframebody,'iframe');
    this.cardFrame.frameBorder = '0';
    this.cardFrame.scrolling = 'no';
    this.cardFrame.allowTransparency = 'true';
    if (GetBrowserInfo()[0]=='IE'){
        this.cardFrame.attachEvent("onload",this._loadComplete.bindAsEventListener(this.cardFrame));
    }
    else {
        this.cardFrame.onload = this._loadComplete.bindAsEventListener(this.cardFrame);
    }
    this.init();
};
OptionCardContrlBase.Item.prototype._loadComplete = function()
{
    try
    {
        this.contentWindow.Config = GlobalConfig;
    }
    catch(e)
    {}
};
/*
*初始化选项卡和内容页
*/
OptionCardContrlBase.Item.prototype.init=function()
{
    this.element.setAttribute('id',this.id);
    this.element.className='default';   
    this.cardFrame.className = 'iframehid';
    if(this.autoactive)
    {
        this.cardFrame.src = this.url;   
    }          
    var mirror=this;
    if(this.allowclose)
    {
        this.element.innerHTML='<nobr class="title" title="'+this.title.replace(/<[^>]+?>/gi,'')+'">'+this.title+'</nobr><a class="close" title="关闭"></a>';                
        this.addEventListener(this.$ES(this.element,'nobr')[0],'click',function(){mirror.activeItem();});
        this.addEventListener(this.$ES(this.element,'a')[0],'click',function(){mirror.destroyItem();});
    }
    else
    {
        this.element.innerHTML='<nobr class="title" title="'+this.title+'">'+this.title+'</nobr>';        
        this.addEventListener(this.$ES(this.element,'nobr')[0],'click',function(){mirror.activeItem();});
    }
        
}
/*
*选项卡激活
*/
OptionCardContrlBase.Item.prototype.activeItem=function()
{
    if(this.cardFrame.src=='')
    {
        this.cardFrame.src = this.url;
    }
    if(typeof this.panel.visitedRegister =='function')
    {
        this.panel.visitedRegister(this,'active');
        this.element.className='active';  
        this.cardFrame.className='iframevis'; 
    }
    this.ExpendOut();
}
/*选项卡添加和激活时，当搜索结果控件最小化时展开搜索结果控件*/
OptionCardContrlBase.Item.prototype.ExpendOut = function()
{
    
}

/*
*选项卡重置为初始状态
*/
OptionCardContrlBase.Item.prototype.resetItem=function()
{
    this.element.className='default'; 
    this.cardFrame.className = 'iframehid';       
}
/*
*选项卡自身销毁
*/
OptionCardContrlBase.Item.prototype.destroyItem=function()
{
    //this.panel.visitedRegister(this,'delete');
    this.panel.deleteItem(this);
}
/*
*选项卡添加事件
*/
OptionCardContrlBase.Item.prototype.addEventListener=function(element,type,handler)
{
    if(element.addEventListener)
        element.addEventListener(type,handler,true);
    else
        element.attachEvent('on'+type,handler,true);
}
/*
*新建HTML元素
*/
OptionCardContrlBase.Item.prototype.$C=function(iframebody,tag)
{
    if(tag && typeof tag =='string')
        return iframebody.contentWindow.document.createElement(tag);
    else
        return iframebody.contentWindow.document.createElement('li');
}
/*
*根据TagName获取HTML元素
*/
OptionCardContrlBase.Item.prototype.$ES=function(element,tag)
{
    return element.getElementsByTagName(tag);
}
