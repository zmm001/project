/*************************************************
* 推荐泡泡控件 v1.1 xb 2008.10.28
*************************************************/
var CommendPopControl = Class.create();
Object.extend(CommendPopControl.prototype, ControlBase.prototype);

Object.extend(CommendPopControl.prototype,{
    _loadUI : function(){
        this.LoadUI('CommendPopControl');
    },
    _loadComplete : function(){
        this.$('btnClose').onclick = this.ClosePop.bind(this);
        this.$('divLoading').innerHTML = this.Config.Loading;
        this.onLoadComplete();
    },
    CID : 0,
    IsMove : false,
    CopyMsg : '复制好了，发给我的QQ/MSN好友分享吧！',
    ShowPop : function(id,ismove){
        if(ismove){
            this.IsMove = true;
        }else{
            this.IsMove = false;
        }
        if(this.CID!=id){
            this.$('divLoading').style.display='';
            this.Show();
        }else{
            this.$('divLoading').style.display='none';
            this.Show();
            return;
        }
        this.CID = id;
        var url=this.Config.EDataCenterUrl + 'CommMap5.0/ThemeMaps.aspx?domain='+this.Config.Domain+'&l='+this.Config.Language+'&req=4&id='+id;
        ENetwork.DownloadScript(url,this.LoadPopData.bind(this));
    },
    LoadPopData : function(){
        if(_ThemeInfo.ThemeInfoDeatil[0]){
            var o = _ThemeInfo.ThemeInfoDeatil[0];
            
            //兼容地图初始定位移动
            if(this.IsMove){
                MoveTo(o.X*1 + vM.GetMapPos(170), o.Y*1, true);
                vM.moveEntity(this.ID, o.X*1, o.Y*1);
            }
            this.$('Name_h3').innerHTML = o.BCC_CompanyName;//标题
            this.$('divContent').innerHTML = o.BCC_Remark;//内容
            
            this.$('divLoading').style.display='none';
        }
    },
    /*直接显示Pop内容*/
    ShowPopData : function(x,y,title,content){
        this.$('Name_h3').innerHTML = title;
        this.$('divContent').innerHTML = content;
        MoveTo(x*1 + vM.GetMapPos(170), y*1, true);
        vM.moveEntity(this.ID, x*1, y*1);
        this.$('divLoading').style.display='none';
        this.Show();
    },
    ClosePop : function(){
        this.Hide();
    }
});
