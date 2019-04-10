/*************************************************
* 纠错控件
* code by lzz ver1.0 update at 07-10-16
*************************************************/

var DebugControl = Class.create();
Object.extend(DebugControl.prototype, MapContrlBase.prototype);
DebugControl.prototype.LoadUI = function(){
    this.Body.src = this.Config._ControlsUIPath + 'DebugControl.aspx?ID=' + this.DebugID + '&Name=' + escape(this.DebugName) + '&Flag=' + this.DebugFlag + '&x=' +this.DebugX+ '&y='+this.DebugY;
};
//纠错 id:纠错ID name:纠错名称 flag:纠错类型
DebugControl.prototype.Debug = function(id, name, flag, x, y){
    this.DebugID = id;
    this.DebugName = name;
    this.DebugFlag = flag;
    this.DebugX = x;
    this.DebugY = y;
    this.LoadUI();
    this.Show();
};

//重载控件加载完毕后的事件
DebugControl.prototype._loadComplete= function()
{
    if (this.DebugName.length > 0){
        this.$('txtContent').value = this.DebugName + '有错：';
    }
    this.Body.contentWindow.DebugControl = this;
    this.onLoadComplete(this);
};

DebugControl.prototype.DebugID = 0;     //纠错ID
DebugControl.prototype.DebugName = '';  //纠错名称
DebugControl.prototype.DebugFlag = 0;   //纠错类型0-实体,1企业 
DebugControl.prototype.DebugX = 0;     //出错X坐标
DebugControl.prototype.DebugY = 0;      //出错Y坐标