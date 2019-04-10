var MsgPopControl = Class.create();
Object.extend(MsgPopControl.prototype, ControlBase.prototype);

Object.extend(MsgPopControl.prototype, {
    Width: 210, Height: 84,
    CanDrag: true,
    autoremove: false,
    autozoomchangeremove: false,
    _loadUI: function () {
        this.LoadUI("MsgPopControl");
    },
    _loadComplete: function () {
        this.Body.contentWindow.MsgPopControl = this;
        this.onLoadComplete(this);
    },
    onLoadComplete: function (source) {
    },
    showPop: function (id, ismove, Name, Telephone, Address, x, y) {//ismove:是否移动pop
        this.Show();
        this.$("popTitle").innerHTML = this.$("popTitle").title = Name;
        this.$("popAddress").innerHTML =this.$("popAddress").title= Address;
        this.$("popTelephone").innerHTML = this.$("popTelephone").title=Telephone;
        if (ismove) {
            vM.MoveEntity(id, x, y);
        }
        this.$("btnClose").onclick = this.ClosePop.bind(this);
},
    ClosePop: function () {
        this.Hide();
    }
})