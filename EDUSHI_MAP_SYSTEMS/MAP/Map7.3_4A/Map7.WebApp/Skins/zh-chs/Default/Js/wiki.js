//入住类
//标记类
function Wiki() {
    this.Index = 0;
    this.AddId = 'AddWikiPop';
    
    var add = "";
    add += "<div class=\"TagNav1\">";
    add += "  <div class=\"InTagCon1\"> ";
    add += "   <div class=\"InTagConBg1\" style=\"filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'/Images/WikiPOI.png\',sizingMethod=\'image\') !important;\">";
    add += "   </div>   ";
    add += "   <div class=\"InTagDetCon1\">";
    add += "     <h3>我要入驻</h3>";
    add += "	  <table cellpadding=\"1\" cellspacing=\"0\" border=\"0\">";
    add += "	    <tr>";
    add += "		  <td align=\"center\" height=\"25px\"><div id=\"VikiTitle\" style = \"font-size:14px\">我要入驻到这里</div></td>";
    add += "		</tr>";
    add += "		<tr>";
    add += "		  <td align=\"center\" height=\"35px\"><img id=\"BtnOpen\" style = \"cursor:pointer;\" src=\"/images/btn_1.jpg\"></td>";
    add += "		</tr>";
    add += "		<tr>";
    add += "		  <td align=\"center\"><img id=\"BtnReChoose\" style = \"cursor:pointer;\" src=\"/images/btn_2.jpg\"></td>";
    add += "		</tr>";
    add += "		<tr>";
    add += "		  <td></td>";
    add += "		</tr>";
    add += "	</table>";
    add += "   </div>   ";
    add += "   <div id=\"btnVikiClose\" class=\"CloseWin1\" onmouseover=\"this.className=\'CloseBtnOver1\'\" onmouseout=\"this.className=\'CloseBtnOut1\'\" title=\"关闭\">";
    add += "   </div>   ";
    add += "   </div>   ";
    add += "   </div>";

    this.AddHTML = add;

    this.Add = function(x, y, title) {
        vM.HidePointerTip();
        if (vM.$(this.AddId)) {
            vM.MoveEntity(this.AddId, x * 1, y * 1);
            vM.$(this.AddId).style.display = "block";
        }
        else {
            var addwiki = vM.$C('div');
            addwiki.id = this.AddId;
            addwiki.innerHTML = this.AddHTML;
            vM.AppendEntity(addwiki, _MarkLayer, false, x, y, 201, 168, 70, 170, false);
        }

        vM.$('btnVikiClose').onclick = this.Hidden.bind(this);
        vM.$('BtnOpen').onclick = this.fnEShopAndCompanyJoin.bind(this,0,'我要入驻到这里',x,y);
        vM.$('BtnReChoose').onclick = this.Begin.bind(this);

        _IsBeginSelectWiki = false;
        //vM.MoveTo(x * 1 + vM.GradeWin2EGIS(0), y * 1 + vM.GradeWin2EGIS(0), true);
    };

    this.Delete = function(id) {
        if (vM.$(id)) {
            vM.$(id).parentNode.removeChild(vM.$(id));
        }
    };

    this.Begin = function() {
        if (!_IsBeginSelectWiki) {
            _IsBeginSelectWiki = true;
            var tip = '<div style="height:15px; line-height:15px; border:1px solid #1A70C7; background:#fff; padding:0 4px 0 4px;filter:alpha(opacity=90); opacity:.9; float:left; color:#000; font-size:12px; white-space:nowrap;">点击右键选择入驻位置</div>';
            vM.ShowPointerTip(tip);
        }

        if (typeof vM.$(this.AddId) == 'object') {
            this.Delete(this.AddId);
        }
    };
    this.Hidden = function() {
        vM.$(this.AddId).style.display = "none";
    };
    
    this.fnEShopAndCompanyJoin = function(oid, oname,x,y) {   
        if (!oname) {
            oname = '';
        }
        var url = '/wiki/EshopAndCompanyJoin.aspx?oid=' + oid + '&oname=' + escape(oname) + "&x=" + x + "&y=" + y;
        window.open(url, "我要入驻");
    }
}

var _Wiki = new Wiki();
