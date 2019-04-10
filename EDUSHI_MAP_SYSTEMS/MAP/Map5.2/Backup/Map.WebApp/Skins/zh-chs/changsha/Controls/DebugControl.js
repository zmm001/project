/*************************************************
* 纠错控件 v1.1 zxc 2008.10.30
*************************************************/
var DebugControl = Class.create();
Object.extend(DebugControl.prototype, ControlBase.prototype);

Object.extend(DebugControl.prototype,{
    //实体ID
    DebugID : 0,    //纠错ID
    DebugName : '', //纠错名称
    DebugFlag : 0,  //纠错类型0-实体,1企业
    DebugX : 0,     //出错X坐标
    DebugY : 0,     //出错Y坐标
    LoadUI : function(){
        this.Body.src = this.Config.SkinPath + 'Controls/DebugControl.aspx?ID=' + this.DebugID + '&Name=' + escape(this.DebugName) + '&Flag=' + this.DebugFlag + '&x=' +this.DebugX+ '&y='+this.DebugY;
    },
    _loadComplete : function(){
        if (this.DebugName.length > 0){
            this.$('txtContent').value = this.DebugName + '有错：';
        }
        this.Body.contentWindow.DebugControl = this;
        this.onLoadComplete(this);
    },
    Debug : function(id, name, flag, x, y){
        this.DebugID = id;
        this.DebugName = name;
        this.DebugFlag = flag;
        this.DebugX = x;
        this.DebugY = y;
        this.LoadUI();
        this.Show();
    },
    ClosePop : function()
    {
        this.Hide();
    }
});