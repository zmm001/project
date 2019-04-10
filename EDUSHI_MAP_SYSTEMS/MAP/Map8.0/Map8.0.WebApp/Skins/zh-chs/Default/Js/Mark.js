//标记类
function Mark()
{
    this.Index = 0;
    this.AlertCopyMsg = '复制好了，发给我的QQ/MSN好友分享吧！';
    this.AddId = 'AddMark';
    this.ShowId = 'ShowMark';
    var add = "";
    add += "<div class=\"TagNav\">";
    add += "  <div class=\"InTagCon\">  ";
    add += "   <div class=\"InTagConBg\" style=\"filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'/Images/POI.png\',sizingMethod=\'image\') !important;\">";
    add += "   </div>   ";
    add += "   <div class=\"InTagDetCon\">";
    add += "     <h3>标记</h3>";
    add += "	  <table cellpadding=\"1\" cellspacing=\"0\" border=\"0\">";
    add += "	    <tr>";
    add += "		  <th>标题：</th>";
    add += "		  <td><input id=\"txtMarkTitle\" style=\"width:228px; border:solid 1px #666;width:220px;\" value=\"\" type=\"text\" /></td>";
    add += "		</tr>";
    add += "		<tr>";
    add += "		  <th></th>";
    add += "		  <td class=\"Explain\">(<span>※</span>此项为必填项 控制在20字符以内)</td>";
    add += "		</tr>";
    add += "		<tr>";
    add += "		  <th>内容：</th>";
    add += "		  <td><textarea id=\"txtMarkContent\" style=\" border:solid 1px #666;width:220px;height:60px;\" cols=\"26\"  rows=\"4\"></textarea></td>";
    add += "		</tr>";
    add += "		<tr>";
    add += "		  <td colspan=\"2\" align=\"center\">   <div class=\"WkButton\">";
    add += "   <img id=\"btnMarkConfirm\" style=\"cursor:pointer\" src=\"Images/wybj.gif\" alt=\"我要标记\" />&nbsp;&nbsp;<img id=\"btnMarkCopy\" style=\"cursor:pointer\" src=\"Images/cxxz.gif\" alt=\"重新选择\" />";
    add += "   </div></td>";
    add += "		</tr>";
    add += "	</table>";
    add += "   </div>   ";
    add += "   <div id=\"btnMarkClose\" class=\"CloseWin\" onmouseover=\"this.className=\'CloseBtnOver\'\" onmouseout=\"this.className=\'CloseBtnOut\'\" title=\"关闭\">";
    add += "   </div>   ";
    add += "   </div>   ";
    add += "   </div>";

    this.AddHTML = add;
    var show = "";
    show += "<div class=\"TagNav\">";
    show += "  <div class=\"InTagCon\"> ";
    show += "   <div class=\"InTagConBg\" style=\"filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'/Images/POI.png\',sizingMethod=\'image\') !important;\">";
    show += "   </div>   ";
    show += "   <div class=\"InTagDetCon\">";
    show += "     <h3>标记</h3>";
    show += "	  <table cellpadding=\"1\" cellspacing=\"0\" border=\"0\">";
    show += "	    <tr>";
    show += "		  <th>标题：</th>";
    show += "		  <td><div id=\"MarkTitle\"></div></td>";
    show += "		</tr>";
    show += "		<tr>";
    show += "		  <th>&nbsp;</th>";
    show += "		  <td>&nbsp;</td>";
    show += "		</tr>";
    show += "		<tr>";
    show += "		  <th>内容：</th>";
    show += "		  <td><div id=\"MarkContent\"></div></td>";
    show += "		</tr>";
    show += "		<tr>";
    show += "		  <th>&nbsp;</th>";
    show += "		  <td>&nbsp;</td>";
    show += "		</tr>";
    show += "		<tr>";
    show += "		  <th>地址：</th>";
    show += "		  <td><input id=\"txtAddress\" style=\"width:228px; border:solid 1px #666;width:220px;\" value=\"\" type=\"text\" /></td>";
    show += "		</tr>";
    show += "		<tr>";
    show += "		  <td colspan=\"2\" align=\"center\"><img id=\"btnMarkCopy\" style=\"cursor:pointer;margin:10px 0 0;\" src=\"Images/fsghy.gif\" alt=\"发送给好友\" /></td>";
    show += "		</tr>";
    show += "	</table>";
    show += "   </div>   ";
    show += "   <div id=\"btnMarkDelete\" class=\"CloseWin\" onmouseover=\"this.className=\'CloseBtnOver\'\" onmouseout=\"this.className=\'CloseBtnOut\'\" title=\"关闭\">";
    show += "   </div>   ";
    show += "   </div>   ";
    show += "   </div>";

    this.ShowHTML = show;

    this.Add = function(x, y, title) {
        vM.HidePointerTip();
        if (vM.$(this.AddId)) {
            vM.MoveEntity(this.AddId, x * 1, y * 1);
            vM.$(this.AddId).style.display = "block";
        }
        else {
            var addmark = vM.$C('div');
            addmark.id = this.AddId;
            addmark.innerHTML = this.AddHTML;
            vM.AppendEntity(addmark, _MarkLayer, false, x, y, 305, 214, 90, 260, false);
        }
        vM.$('txtMarkTitle').value = title;
        vM.$('txtMarkContent').value = '';
        vM.$('btnMarkConfirm').onclick = this.Show.bind(this, x, y, '', '');
        vM.$('btnMarkClose').onclick = this.Hidden.bind(this);
        vM.$('btnMarkCopy').onclick = this.Begin.bind(this);

        _IsBeginSelectMark = false;
        vM.MoveTo(x * 1 + vM.GradeWin2EGIS(0), y * 1 + vM.GradeWin2EGIS(-100), true);
    };

    this.Show = function(x, y, title, content) {
        if (vM.$('txtMarkTitle')) {
            if (vM.$('txtMarkTitle').value.length > 20) {
                alert('标题必须控制在20个字符以内');
                vM.$('txtMarkTitle').focus();
                return;
            }
            else if (vM.$('txtMarkTitle').value.length < 1) {
                alert('标题必须填写');
                vM.$('txtMarkTitle').focus();
                return;
            }
        }
        if (title.length < 1) {
            if (vM.$('txtMarkTitle')) {
                title = this.stripscript(vM.$('txtMarkTitle').value);
            }
        }
        if (content.length < 1) {
            if (vM.$('txtMarkContent')) {
                content = this.stripscript(vM.$('txtMarkContent').value);
            }
        }
        if (vM.$(this.AddId)) {
            vM.$(this.AddId).style.display = 'none';
        }
        this.Index++;
        var markId = this.ShowId + this.Index;

        var showmark = vM.$C('div');
        showmark.id = markId;
        showmark.style.display = 'none';
        showmark.innerHTML = this.ShowHTML;

        vM.AppendEntity(showmark, _MarkLayer, false, x, y, 305, 214, 90, 260, false);
        var divList = showmark.getElementsByTagName('DIV');
        for (var i = 0; i < divList.length; i++) {
            switch (divList[i].id) {
                case "MarkContent":
                    divList[i].innerHTML = content;
                    break;
                case "MarkMaxMin":
                    divList[i].onclick = this.MaxMin.bind(divList[i])
            }
        }
        vM.$('MarkTitle').innerHTML = title;
        vM.$('txtAddress').value = 'http://' + GlobalConfig.Domain + '/?x=' + x + '&y=' + y + '&title=' + escape(title) + '&content=' + escape(content);

        var imgList = showmark.getElementsByTagName('IMG');
        var divList = showmark.getElementsByTagName('DIV');
        for (var i = 0; i < divList.length; i++) {
            switch (divList[i].id) {
                case "btnMarkDelete":
                    divList[i].onclick = this.Delete.bind(this, markId);
                    break;
            }
        }
        for (var i = 0; i < imgList.length; i++) {
            switch (imgList[i].id) {
                case "btnMarkCopy":
                    imgList[i].onclick = this.Copy.bind(this, 'http://' + GlobalConfig.Domain + '/?x=' + x + '&y=' + y + '&title=' + escape(title) + '&content=' + escape(content)); //需要创建标记的Url
                    break;
            }
        }
        showmark.style.display = 'block';
    };
    this.Delete = function(id)
    {
        if(vM.$(id))
        {
            vM.$(id).parentNode.removeChild(vM.$(id));
        }
    };
    this.Copy = function(url)
    {
        fnCopyToClipboard(url,this.AlertCopyMsg);
    };
    this.MaxMin = function()
    {
        if(this.parentNode.className=='ViewTagConMax')
        {
            this.parentNode.className = 'ViewTagConMin';
            this.parentNode.childNodes[0].style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'/Images/ShowTagBg.png\',sizingMethod=\'image\')'
        }
        else
        {
            this.parentNode.className='ViewTagConMax';
            this.parentNode.childNodes[0].style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'/Images/ViewTagBg.png\',sizingMethod=\'image\')'
        }
    };
    this.Begin = function()
    {
        if(!_IsBeginSelectMark)
        {
            _IsBeginSelectMark = true;
            var tip = '<div style="height:15px; line-height:15px; border:1px solid #1A70C7; background:#fff; padding:0 4px 0 4px;filter:alpha(opacity=90); opacity:.9; float:left; color:#000; font-size:12px; white-space:nowrap;">单击左键选择标记位置</div>';
            vM.ShowPointerTip(tip); 
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
