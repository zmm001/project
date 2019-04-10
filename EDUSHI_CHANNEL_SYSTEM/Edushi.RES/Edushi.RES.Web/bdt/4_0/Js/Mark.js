//标记类
function Mark()
{
    this.Index = 0;
    this.AddId = 'AddMark';
    this.ShowId = 'ShowMark';
    var add = '<div class="ttpop2">\
                <div class="ttpop2h1"><span class="fl" title=""><strong>标注</strong></span><span class="fr"><a id="btnEnter_{$index}"><button onclick="parent.fnEnter(\'{$Len}\',\'{$index}\');">确定</button></a>&nbsp;<a id="btnDelete"><button onclick="parent.fnDeletePoint(\'{$Len}\');">删除</button></a></span></div>\
                <div class="ttnav2" id="MarkDiv_{$index}" X="{$X}" Y="{$Y}"> <textarea name="" cols="" rows="" id="txtContent_{$index}"></textarea></div>\
                </div>';
    
    this.AddHTML = add;
    var show = '<div style="position:absolute;">\
                <div class="wke">\
                <div class="wkpop"><p>吩咐我吩咐我吩</p></div>\
                <div class="wkjiao"><img src="http://res.edushi.com/bdt/4_0/images/jiao.png" /></div>\
                </div>\
                </div>';

    this.ShowHTML = show;

    this.Add = function (x, y) {        
        vM.HidePointerTip();
        var id = this.AddId + "_" + this.Index;
        var addmark = vM.$C('div');
        addmark.id = id;
        //addmark.X = x;
        //addmark.Y = y;
        addmark.innerHTML = this.AddHTML.replaceAll("{$Len}", id).replaceAll("{$index}", this.Index).replace("{$X}", x).replace("{$Y}", y);
        vM.AppendEntity(addmark, _MarkLayer, false, x, y, 228, 130, 74, 134, false);
        this.Index++;
        //vM.$('txtContent').value = "";
        //vM.$('btnEnter').onclick = this.Enter.bind(this, id);
        //vM.$('btnDelete').onclick = this.Delete.bind(this, id);

        _IsBeginSelectMark = false;
        vM.detachEvent(AlaMap.KeyWord.EventName.MapClick, fnSelectMarkPoint);
    };
    this.Begin = function()
    {
        if(!_IsBeginSelectMark)
        {
            _IsBeginSelectMark = true;
            vM.ShowPointerTip('<div style="cursor:pointer;"><img style="float:left;" src="http://res.edushi.com/bdt/4_0/images/pen.gif"/><div style="width:100px;height:18px;text-align:center;border:1px solid #ff0000;font-size:12px;background-color:#fff;padding-top:2px;">单击左键选择位置</div></div>', -4, -4);
        }
    };
    this.Hidden = function() {
        vM.$(this.AddId).style.display = "none";
    };
    this.stripscript = function(s) {
        var pattern = new RegExp("[`~!@#$^&*+()=|{}':;',\\[\\].<>/?~！@#￥%……&*（）—|{}【】]");
        var rs = "";
        for (var i = 0; i < s.length; i++) {
            rs = rs + s.substr(i, 1).replace(pattern, '');
        }
        return rs;
    };
}

var _Mark = new Mark();
