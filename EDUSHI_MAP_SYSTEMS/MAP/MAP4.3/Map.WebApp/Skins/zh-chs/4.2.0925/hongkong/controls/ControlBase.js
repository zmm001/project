/*************************************************
* 控件基类，全局文件
* code by lzz ver1.0 update at 07-09-26
*************************************************/



//控件基类参数对象
var MapContrlObj = {ID:null,Parent:null};

// 控件基类
var MapContrlBase = Class.create();
Object.extend(MapContrlBase.prototype, {
    //构造
    initialize : function(obj){
        try
        {
            if(obj)
            {
                
                if(obj.Parent)
                {
                    
                    this.Body = obj.Parent.$C('IFRAME');
                }
                else
                {
                    this.Body = $C('IFRAME');
                }
                if(obj.ID)
                {
                    this.Body.id = obj.ID;
                }
                else
                {
                    this.Body.id = '_iframe'+$Rnd();
                }
            }
            else
            {
                this.Body = $C('IFRAME');
                this.Body.id = '_iframe'+$Rnd();
            }
            this.Body.frameBorder = '0';
            this.Body.scrolling = "no";
            this.Body.style.overflow = 'hidden';
            this.Body.allowTransparency = 'true';
            this.Body.style.display = 'none';
            this.Body.style.width = this.Width + 'px';
            this.Body.style.height = this.Height + 'px';
            this.Config = GlobalConfig;     //附加全局Config对象
            this._loadUI();
            
            //绑定事件
            if (GetBrowserInfo()[0]=='IE'){
                this.Body.attachEvent("onload",this._loadComplete.bindAsEventListener(this));
            }
            else {
                this.Body.onload = this._loadComplete.bindAsEventListener(this);
            }
            
        }
        catch (ex)
        {
            alert('脚本出错' + ex.message);
            _loadError(ex.message);
        }
    },
    
    //公有方法
    $: function(sID){
        return this.Body.contentWindow.document.getElementById(sID);
    },
    LoadUI: function(sControlName){          //载入UI
        this.Body.src = this.Config._ControlsUIPath + sControlName + '.aspx';
    },
    ResumeLayout: function(){   //重做布局，位置大小
//        this.Body.style.top = this.Y + 'px';
//        this.Body.style.left = this.X + 'px';
        this.Body.style.width = this.Width + 'px';
        this.Body.style.height = this.Height + 'px';
    },
    Show: function(){         //显示控件，控件创建完（new）不会显示，需调用Show方法后才会显示
        // .. .. .. 此处可做一些数据加载的逻辑 .. .. .. 
        this.Body.style.display = 'block';
    },
    Hide: function(){         //隐藏控件
        this.Body.style.display = 'none';
    },
    Dispose: function(){      //销毁控件，释放所有占用的资源
        this.parentNode.removeNode(this.Body);
    },
    MoveTo: function(x, y){   //移动控件到指定位置
        this.Body.style.position = 'absolute';
        this.Body.style.top = y + 'px';
        this.Body.style.left = x + 'px';
    },
    
    
    //对外提供的公共事件接口
    onLoadComplete: function(source){
    },
    onLoadError: function(source, msg){
    },
    
    //共同属性
    Body: null,         //IFrame
    Config: null,
    X: 0,
    Y: 0,
    Width: 303,
    Height: 418,
    
    //私有接口，子类必须实现，可调用LoadUI方法，或则自己指定this.Body.src
    _loadUI: function(){
    },
    //私有事件
    _loadComplete: function(){
        // .. .. .. 此事可以托管该事件，执行一些附加操作，再将事件抛出 .. .. .. 
        this.onLoadComplete(this);
    },
    _loadError: function(msg){
        // .. .. .. 此事可以托管该事件，执行一些附加操作，再将事件抛出 .. .. .. 
        this.onLoadError(this, msg);
    }
    
});