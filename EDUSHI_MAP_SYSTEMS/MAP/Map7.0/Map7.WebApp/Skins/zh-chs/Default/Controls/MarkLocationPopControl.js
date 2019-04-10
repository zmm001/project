var MarkLocationPopControl = Class.create();
Object.extend(MarkLocationPopControl.prototype, ControlBase.prototype);  //继承基类
Object.extend(MarkLocationPopControl.prototype, {
    _loadUI: function() {
        this.LoadUI('MarkLocationPopControl');
    },
    Tab: null,
    Rid: 0,
    ShowPop: function(id, x, y, title, content) {
        this.Show();
        this.$('queding').onclick = this.EnterClick.bind(this);
        this.$('cencel').onclick = this.tCencelClick.bind(this);
        this.$('cencel1').onclick = this.tCencelClick.bind(this);
        if (id == 0) {
            this.$('ad').style.display = 'block';
            this.$('cl').style.display = 'none';
            this.$('txtX').value = x;
            this.$('txtY').value = y;
            this.$('txtname').value = '';
            this.$('txtcontent').value = '';

            parent.vM.HidePointerTip();
            parent._IsBeginMarkLocation = false;
        } else {
            this.$('ad').style.display = 'none';
            this.$('cl').style.display = 'block';
            this.$('lname').innerHTML = title;
            this.$('lcontent').innerHTML = content;
            this.$('range').innerHTML = "<a href=\"javascript:;\" onclick=\"parent.parent.fnShowPeripheralBus(" + x + "," + y + ",'公交');\">公交</a>&nbsp;&nbsp;<a href=\"javascript:;\" onclick=\"parent.parent.rangeSearch(" + x + "," + y + ",'银行');\">银行</a>&nbsp;&nbsp;<a href=\"javascript:;\" onclick=\"parent.parent.rangeSearch(" + x + "," + y + ",'医院');\">医院</a>&nbsp;&nbsp;<a href=\"javascript:;\" onclick=\"parent.parent.rangeSearch(" + x + "," + y + ",'学校');\">学校</a>";
        }
    },
    //重载控件加载完毕后的事件
    _loadComplete: function() {
        this.Body.contentWindow.MarkLocationPopControl = this;
        this.onLoadComplete(this);
    },
    EnterClick: function() {
        if (this.$('txtname').value == '' || this.$('txtname').value == '名称不能为空') {
            this.$('txtname').value = '名称不能为空';
            this.$('txtname').focus();
            return;
        }

        if (this.$('txtname').value.length > 15) {
            this.$('ts1').style.display = 'block';
            return;
        }

        if (this.$('txtcontent').value.length > 50) {
            this.$('ts2').style.display = 'block';
            return;
        }

        this.$('lname').innerHTML = this.$('txtname').value;
        this.$('lcontent').innerHTML = this.$('txtcontent').value;

        //this.Hide();
        parent.vM.HidePointerTip();
        parent._IsBeginMarkLocation = false;


        var url = "AjaxData/MarkLocation.aspx?lx=" + this.$('txtX').value + "&ly=" + this.$('txtY').value + "&t=" + this.$('txtname').value.trim() + "&c=" + this.$('txtcontent').value.trim() + "&tp=0";
        ENetwork.DownloadScript(url, function() {
            if (typeof sReturn != 'undefined' && sReturn == '1') {
                if (typeof parent.MyLocationTab.TabBody.contentWindow.fnActive == 'function') {
                    parent.MyLocationTab.TabBody.contentWindow.fnActive();
                }
            }
        });
        this.$('ad').style.display = 'none';
        this.$('cl').style.display = 'block';

        this.$('range').innerHTML = "<a href=\"javascript:;\" onclick=\"parent.parent.fnShowPeripheralBus(" + this.$('txtX').value + "," + this.$('txtY').value + ",'公交');\">公交</a>&nbsp;&nbsp;<a href=\"javascript:;\" onclick=\"parent.parent.rangeSearch(" + this.$('txtX').value + "," + this.$('txtY').value + ",'银行');\">银行</a>&nbsp;&nbsp;<a href=\"javascript:;\" onclick=\"parent.parent.rangeSearch(" + this.$('txtX').value + "," + this.$('txtY').value + ",'医院');\">医院</a>&nbsp;&nbsp;<a href=\"javascript:;\" onclick=\"parent.parent.rangeSearch(" + this.$('txtX').value + "," + this.$('txtY').value + ",'学校');\">学校</a>";
    },
    CencelClick: function() {
        this.Hide();
        parent.vM.HidePointerTip();
        //parent.vM.RemoveEntity(this.Rid);
        parent._IsBeginMarkLocation = false;
    },
    tCencelClick: function() {
        this.Hide();
    },
    tShowMark: function(id, x, y, title, content) {
        parent.fnShowMarkLocation(id, x, y, title, content);
    }
});