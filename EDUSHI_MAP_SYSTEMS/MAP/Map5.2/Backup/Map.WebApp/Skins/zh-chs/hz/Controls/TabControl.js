//选项卡管理器控件
var TabControl;
if(!TabControl){
    TabControl= Class.create();
}
Object.extend(TabControl.prototype,{
    initialize      : function(headContainer,bodyContainer,leftBtn,rightBtn){
        this.HeadContainer = headContainer;//选项卡li容器UL
        this.BodyContainer = bodyContainer;//选项卡iframe容器DIV
        this.LeftBtn = leftBtn; //向左移动选项卡按钮
        this.RightBtn = rightBtn;//向右移动选项卡按钮
        this.TabList = [];//按增加循序的选项卡数组
        this.TabSortList = [];//按激活循序排列的选项卡数组，暂时不支持
        this.CurrentTab = null;//当前激活选项 
        if(this.LeftBtn&&this.RightBtn){
            //绑定左右按钮事件
            this.RightBtn.onclick = this.ToRight.bindAsEventListener(this);
            this.LeftBtn.onclick = this.ToLeft.bindAsEventListener(this);
        }
    },
    ToLeft:function(){
        for(var i=0;i<this.TabList.length;i++){
            if(this.TabList[i]==this.CurrentTab){
                if(this.TabList[i-1]){
                    this.TabList[i-1].active();
                }
                else{
                    this.TabList[this.TabList.length-1].active();
                }
                return;
            }
        }
    },
    ToRight:function(){
        for(var i=0;i<this.TabList.length;i++){
            if(this.TabList[i]==this.CurrentTab){
                if(this.TabList[i+1]){
                    this.TabList[i+1].active();
                }
                else{
                    this.TabList[0].active();
                }
                return;
            }
        }
    },
    AddTab:function(tab){ 
        this.visitedRegister(tab,'add');
    },
    ActiveTab:function(tab){
        this.visitedRegister(tab,'active');
    },
    ResetTab:function(tab){
        tab.TabTitle.className='Normal'; //未激活状态下的样式
        tab.TabBody.style.display = 'none';
    },
    DestroyTab:function(tab){
        this.visitedRegister(tab,'destroy');
    },
    ClearTab:function(){
        this.visitedRegister(null,'clear');
    },
    ExistTab        : function(tab){
        for(var i=0;i<this.TabList.length;i++){
            if(this.TabList[i].Url==tab.Url){
                if(tab.AutoActive){
                    this.TabList[i].active();
                }
                return true;
            }
        }        
        return false;
    },
    visitedRegister:function(tab,type){
        var i=this.TabList.length;
        switch(type)
        {
            case 'add':
            if(!this.ExistTab(tab)){
                tab.TabControl=this;
                this.HeadContainer.appendChild(tab.TabTitle);
                this.BodyContainer.appendChild(tab.TabBody);
                this.TabList[i]=tab;                
                if(tab.AutoActive){
                    tab.active();
                    return;
                }
                else{
                    this.ResetTab(tab);
                }
                this.changeSubPage();
            }
            break;
            case 'active':
                if(this.CurrentTab==tab){
                    return;
                }
                else{
                    if(this.CurrentTab!=null){
                        this.ResetTab(this.CurrentTab);
                    }
                    this.CurrentTab = tab;
                    tab.TabTitle.className = 'Current';//激活状态下的样式
                    tab.TabBody.style.display = '';
                    if(tab.TabBody.src==''){
                        tab.TabBody.src = tab.Url;
                    }
                }    
                 /*选项卡激活时候的页面初始化方法，默认方法，可以在激活的对外事件中自定义方法执行*/ 
                try
                {
                    if(typeof tab.TabBody.contentWindow.fnActive=='function'){
                        tab.TabBody.contentWindow.fnActive();
                    }  
                }
                catch(e)
                {
                }
                this.changeSubPage();
                tab.onActive();
            break;
            case 'destroy':
                /*选项卡关闭页面时候执行的方法,默认方法，可以在销毁的对外事件中自定义方法执行*/
                try
                {
                    if(typeof tab.TabBody.contentWindow.fnExit=='function')
                    {
                        tab.TabBody.contentWindow.fnExit();
                    }
                }
                catch(e)
                {
                }                               
                for(var k=0;k<i;k++)
                {
                    if(this.TabList[k]==tab)
                    {
                        this.TabList.splice(k,1);
                        this.HeadContainer.removeChild(tab.TabTitle);
                        this.BodyContainer.removeChild(tab.TabBody);
                        break;
                    }
                }
                if(tab==this.CurrentTab)
                {
                    if(i-1>0)
                    {
                        this.TabList[i-2].active();
                    }
                    else
                    {
                        this.CurrentTab=null;
                    }    
                }
                tab = null;
                this.changeSubPage();
            break;
            case 'clear':
                for(var k=0;k<this.TabList.length;k++){
                    this.HeadContainer.removeChild(this.TabList[k].TabTitle);
                    this.BodyContainer.removeChild(this.TabList[k].TabBody);
                    this.TabList.splice(k,1);
                    k--;
                }
                this.CurrentTab=null;
                this.changeSubPage();
            break;
        }
    },
    changeSubPage:function(){
        if(this.TabList.length==0){
            this.HeadContainer.style.width='0px';
            this.HeadContainer.style.left='0px';
        }
        else{
            var myWidth = 0;//选项卡容器宽度,如果有偏移量的需要加上
            var parentWidth = 0;//选项卡容器的父节点宽度
            var leftWidth = 0;//激活选项卡左边的总宽度
            for(var i=0;i<this.TabList.length;i++){
                myWidth += this.TabList[i].TabTitleWidth+4;//4像素偏移
            }
            this.HeadContainer.style.width = myWidth + 'px';        
            parentWidth = this.HeadContainer.parentNode.clientWidth;//parseInt(this.HeadContainer.parentNode.style.width.replace('px',''),10);
            if(this.LeftBtn&&this.RightBtn){   
                if(myWidth>parentWidth){
                    var i = 0;
                    var j = 0;
                    for(i;i<this.TabList.length;i++){
                        if(this.TabList[i]==this.CurrentTab){
                            for(j=i;j>=0;j--){
                                leftWidth+=this.TabList[j].TabTitleWidth+4;
                            }
                            if(leftWidth>parentWidth){
                                var lw = 0;
                                for(j=0;j<=i;j++){
                                    lw+=this.TabList[j].TabTitleWidth+4;
                                    if(lw>leftWidth-parentWidth){
                                        this.HeadContainer.style.left=-lw + 'px';
                                        break;
                                    }
                                }
                            }
                            else{
                                this.HeadContainer.style.left='0px';
                            }
	                        break;
	                    }
                    }
                }
                else{
                    this.HeadContainer.style.left='0px';
                }
            }
        }
    }
});
//单个选项卡
TabControl.Tab  = Class.create();
Object.extend(TabControl.Tab.prototype, {
    initialize: function(documentContainer, id, title, url, allowClose, autoActive, titleWidth, iframeCssName) {
        this.DocumentContainer = documentContainer; //承载选项卡的document对象
        this.TabControl = null; //选项卡管理器,在添加到管理器的时候赋值
        this.Id = id + this.$Rnd(); //选项卡ID
        this.Title = title; //选项卡标题
        this.Url = url; //选项卡URL
        this.AllowClose = allowClose; //是否允许关闭选项卡
        this.AutoActive = autoActive; //是否自动激活选项卡        
        this.TabTitle = this.$C('li'); //选项卡标题对象
        this.TabTitleWidth = titleWidth; //选项卡的宽度
        this.TabTitle.style.width = titleWidth + 'px';
        this.TabBody = this.$C('iframe'); //选项卡iframe对象
        this.TabBody.frameBorder = '0';
        this.TabBody.scrolling = 'no';
        this.TabBody.allowTransparency = 'true';
        if (iframeCssName) {
            this.TabBody.className = iframeCssName; //设置IFRAME的样式
        }
        this.TabBody.style.height = '100%';
        if (document.all) {
            this.TabBody.attachEvent("onload", this.loadComplete.bindAsEventListener(this));
        }
        else {
            this.TabBody.onload = this.loadComplete.bindAsEventListener(this);
        }
        this.TabTitle.setAttribute('id', this.Id);
        if (this.AutoActive) {
            this.TabBody.src = this.Url;
        }
        var mirror = this;
        if (this.AllowClose) {
            this.TabTitle.innerHTML = '<nobr style="display:block" title="' + this.Title.replace(/<[^>]+?>/gi, '') + '">' + this.Title + '</nobr><a class="OptionCloseBtn" title="关闭"></a>'; this.addEventListener(this.$ES('nobr')[0], 'click', function() { mirror.active(); });
            this.addEventListener(this.$ES('a')[0], 'click', function() { mirror.destroy(); });
        }
        else {
            this.TabTitle.innerHTML = '<nobr style="display:block" title="' + this.Title.replace(/<[^>]+?>/gi, '') + '">' + this.Title + '</nobr>';
            this.addEventListener(this.$ES('nobr')[0], 'click', function() { mirror.active(); });
        }
    },
    resize: function() {
        if (this.TabBody.contentWindow.document.getElementById('TabContent') != null) {
            this.TabBody.contentWindow.document.getElementById('TabContent').style.height = parseInt(this.TabBody.parentNode.style.height) - 65 + 'px';
        }
    },
    active: function() {
        this.TabControl.ActiveTab(this);
    },
    onActive: function(obj) {
        //对外激活的事件接口
    },
    destroy: function() {
        this.onDestroy(this); //在对象删除前执行
        this.TabControl.DestroyTab(this);
    },
    onDestroy: function(tab) {
        //对外销毁的事件接口
    },
    loadComplete: function() {
        try {
            //统一注册键盘事件
            var oThis = this;
            if (window.addEventListener) {
                this.addEventListener(this.TabBody.contentWindow.document, 'keypress', function(e) { fnKeyup(e); });
            } else {
            this.addEventListener(this.TabBody.contentWindow.document, 'keyup', function() {
                    fnKeyup(oThis.TabBody.contentWindow.event);
                });
            }
            this.TabBody.contentWindow.Config = GlobalConfig;
        } catch (e) {
        }
        this.onLoadComplete(this);
    },
    onLoadComplete: function(tab) {
        //对外加载完毕事件
    },
    addEventListener: function(element, type, handler) {
        if (this.TabTitle.addEventListener) {
            element.addEventListener(type, handler, true);
        }
        else {
            element.attachEvent('on' + type, handler, true);
        }
    },
    $Rnd: function(flg) {
        var d, s = '';
        if (!flg) flg = 100000;
        d = new Date();
        s += d.getHours();
        s += d.getMinutes();
        s += d.getSeconds();
        s += d.getMilliseconds();
        return Math.round(Math.random() * flg).toString() + s.toString();
    },
    $C: function(tag) {
        return this.DocumentContainer.createElement(tag);
    },
    $ES: function(tag) {
        return this.TabTitle.getElementsByTagName(tag);
    }
});
