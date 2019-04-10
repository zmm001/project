var MarkPopControl = Class.create();
Object.extend(MarkPopControl.prototype, ControlBase.prototype);  //继承基类
Object.extend(MarkPopControl.prototype, {
    _loadUI: function() {
        this.LoadUI('MarkPopControl');
    },
    Tab: null,
    ShowPop: function(id, x, y, title, content, date) {
        this.Show();
        this.$('queding').onclick = this.EnterClick.bind(this);
        this.$('cencel1').onclick = this.CencelClick.bind(this);
        this.$('cencel').onclick = this.tCencelClick.bind(this);
        if (id == 0) {
            this.$('ad').style.display = 'block';
            this.$('cl').style.display = 'none';
            this.$('txtX').value = x;
            this.$('txtY').value = y;
            this.$('txtname').value = '';
            this.$('txtcontent').value = '';
            this.$('txttime').value = '请输入日期';

            parent.vM.HidePointerTip();
            parent._IsBeginMarkLocation = false;
        } else {
            this.$('ad').style.display = 'none';
            this.$('cl').style.display = 'block';
            this.$('lname').innerHTML = title;
            this.$('lcontent').innerHTML = content;
            this.$('ltime').innerHTML = date;
        }
    },
    //重载控件加载完毕后的事件
    _loadComplete: function() {
        this.Body.contentWindow.MarkPopControl = this;
        this.onLoadComplete(this);
    },
    EnterClick: function() {
        if (this.$('txtname').value == '' || this.$('txtname').value == '名称不能为空') {
            this.$('txtname').value = '名称不能为空';
            this.$('txtname').focus();
            return;
        }

        if (this.$('txttime').value == '' || this.$('txttime').value == '请输入日期') {
            this.$('txttime').value = '请输入日期';
            this.$('txttime').focus();
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

        this.Hide();
        parent.vM.HidePointerTip();
        parent._IsBeginMarkPop = false;

        var x = this.$('txtX').value;
        var y = this.$('txtY').value;
        var name = this.$('txtname').value;
        var time = this.$('txttime').value;
        var c = this.$('txtcontent').value;

        var url = "AjaxData/MarkLocation.aspx?lx=" + this.$('txtX').value + "&ly=" + this.$('txtY').value + "&t=" + encodeURIComponent(this.$('txtname').value) + "&c=" + encodeURIComponent(this.$('txtcontent').value) + "&tp=1&d=" + this.$('txttime').value;
        ENetwork.DownloadScript(url, function() {
            if (typeof sReturn != 'undefined' && sReturn == '1') {
                var _id = $Rnd();
                var html = '<div style="float:left;cursor:pointer;"><div id="' + _id + 'm" style="border:1px solid #fff; background:#0af; padding:3px 5px; font-size:12px; color:#fff;" onclick="parent.fnShowMarkPop(' + _id + ', ' + x + ', ' + y + ', \'' + name + '\', \'' + c + '\', \'' + time + '\');">' + name + '</div><div style="width:10px; height:6px; background:url(../images/jt2.png) no-repeat; margin-top:-1px;"></div></div>';

                var p = vM.$C('div');
                p.id = _id;
                p.innerHTML = html;
                parent.vM.AppendEntity(p, parent._sMarkLocationLayer, false, parseInt(x), parseInt(y), 200, 30, 0, 30, false);

                if (typeof parent.MyMarkTab.TabBody.contentWindow.fnActive == 'function') {
                    parent.MyMarkTab.TabBody.contentWindow.fnActive();
                }
            }
        });
    },
    CencelClick: function() {
        this.Hide();
        parent.vM.HidePointerTip();
        parent._IsBeginMarkPop = false;
    },
    tCencelClick: function() {
        this.Hide();
    }
});