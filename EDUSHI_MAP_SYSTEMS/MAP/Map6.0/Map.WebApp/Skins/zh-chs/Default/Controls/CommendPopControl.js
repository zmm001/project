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
    CopyMsg: '复制好了，发给我的QQ/MSN好友分享吧！',
    Tab: null,
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
            if (this.Tab) {
                this.Tab.destroy();
            }
            this.Tab = parent.parent.fnOpenMergeSearch(o.BCC_CompanyName, 0, '', 0, 0, 0, 0, 0 ,'', '', this.Config.CityName);
            //兼容地图初始定位移动
            if(this.IsMove){
                vM.MoveEntity(this.ID, o.X * 1, o.Y * 1);
                MoveTo(o.X * 1 + vM.GetMapPos(66), o.Y * 1 + vM.GetMapPos(-96), true);
            }
            this.$('Name_h3').innerHTML = '<span class="Til">' + o.BCC_CompanyName + '</span>';//标题
            this.$('divContent').innerHTML = o.BCC_Remark;//内容
            
            this.$('divLoading').style.display='none';
        }
    },
    /*直接显示Pop内容*/
    ShowPopData : function(x,y,title,content){
        this.$('Name_h3').innerHTML = title;
        this.$('divContent').innerHTML = content;
        vM.MoveEntity(this.ID, x * 1, y * 1);
        MoveTo(x*1 + vM.GetMapPos(170), y*1, true);
        this.$('divLoading').style.display='none';
        this.Show();
    },
    ClosePop : function(){
        this.Hide();
    }
});
