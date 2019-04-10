//标记类
function Mark()
{
    this.Index = 0;
    this.AlertCopyMsg = '复制好了，发给我的QQ/MSN好友分享吧！';
    this.AddId = 'AddMark';
    this.ShowId = 'ShowMark';
    this.AddHTML = '<div class="TagNav"><div class="PinIco" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\''+GlobalConfig.SkinPath+'Images/PinIco.png\',sizingMethod=\'image\') !important;"></div><div class="InTagCon"><div class="InTagConBg" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\''+GlobalConfig.SkinPath+'Images/InTagBg.png\',sizingMethod=\'image\') !important;"></div><div class="InTagDetCon"><h3>标记</h3><table cellpadding="1" cellspacing="0" border="0"><tr><th>标题：</th><td><input id="txtMarkTitle" style="width:228px; border:solid 1px #666" value="" type="text" /></td></tr><tr><th></th><td class="Explain">(<span>※</span>此项为必填项 控制在20字符以内)</td></tr><tr><th>内容：</th><td><textarea id="txtMarkContent" style=" border:solid 1px #666" cols="26"  rows="4"></textarea></td></tr><tr><td colspan="2" align="center"><img id="btnMarkConfirm" src="'+GlobalConfig.SkinPath+'Images/TagBtn.gif" style="cursor:pointer" alt="确认" /></td></tr></table></div><div id="btnMarkClose" class="CloseWin" onmouseover="this.className=\'CloseBtnOver\'" onmouseout="this.className=\'CloseBtnOut\'" title="关闭"></div></div></div>';
    
    this.ShowHTML = '<div class="TagNav"><div class="PinIco" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\''+GlobalConfig.SkinPath+'Images/PinIco.png\',sizingMethod=\'image\') !important;"></div><div class="ViewTagConMax"><div class="ViewTagConBg" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\''+GlobalConfig.SkinPath+'Images/ViewTagBg.png\',sizingMethod=\'image\')!important;"></div><div class="ViewTagDetCon"><h3 id="MarkTitle"></h3><div class="AutoText" id="MarkContent"></div><div class="WkButton"><img id="btnMarkDelete" style="cursor:pointer" src="'+GlobalConfig.SkinPath+'Images/DeleteTag.gif" alt="删除标记" />&nbsp;&nbsp;<img id="btnMarkCopy" style="cursor:pointer" src="'+GlobalConfig.SkinPath+'Images/ToFriend.gif" alt="复制给好友" /></div></div><div id="MarkMaxMin" class="SwNavOut" onmouseover="this.className=\'SwNavOver\'" onmouseout="this.className=\'SwNavOut\'" title="收缩/展开"></div></div></div>';
    
    this.Add = function(x,y,title)
    {
        vM.MoveTo(x*1+ vM.GetMapPos(120), y*1 + vM.GetMapPos(120), true);
        vM.HidePointerTip();
        if(vM.$(this.AddId))
        {
            vM.moveEntity(this.AddId, x*1, y*1);
            vM.$(this.AddId).style.display = "block";
        }
        else
        {
            var addmark = vM.$C('div');
            addmark.id=this.AddId;
            addmark.innerHTML=this.AddHTML;                
            vM.appendEntity(addmark, _MarkLayer, false, x,y,305,214,0,34, false);
        }
        vM.$('txtMarkTitle').value = title;
        vM.$('txtMarkContent').value = '';
        vM.$('btnMarkConfirm').onclick = this.Show.bind(this,x,y,'','');
        vM.$('btnMarkClose').onclick = this.Hidden.bind(this);
        _IsBeginSelectMark = false;
    };
    
    this.Show = function(x,y,title,content)
    {   
        if(vM.$('txtMarkTitle'))
        {
            if(vM.$('txtMarkTitle').value.length > 20)
            {
                alert('标题必须控制在20个字符以内');
                vM.$('txtMarkTitle').focus();
                return;
            }
            else if(vM.$('txtMarkTitle').value.length < 1)
            {
                alert('标题必须填写');
                vM.$('txtMarkTitle').focus();
                return;
            }
        }     
        if(title.length<1)
        {   
            if(vM.$('txtMarkTitle'))
            {
                title = vM.$('txtMarkTitle').value;
            }
        }        
        if(content.length<1)
        {
            if(vM.$('txtMarkContent'))
            {
                content = vM.$('txtMarkContent').value.replaceAll('\r\n','<br />');
            }
        }
        if(vM.$(this.AddId)){
            vM.$(this.AddId).style.display = 'none';
        }
        this.Index++;
        var markId = this.ShowId + this.Index;

        var showmark = vM.$C('div');
        showmark.id = markId;
        showmark.style.display = 'none';
        showmark.innerHTML=this.ShowHTML;
        vM.appendEntity(showmark, _MarkLayer, false, x,y,305,132,0,34, false);
        
        var divList = showmark.getElementsByTagName('DIV');
        for(var i=0;i<divList.length;i++)
        {
            switch(divList[i].id)
            {
                case "MarkContent":
                    divList[i].innerHTML = content;
                    break;
                case "MarkMaxMin":
                    divList[i].onclick = this.MaxMin.bind(divList[i])
            }
        }
        var h3 = showmark.getElementsByTagName('H3');
        h3[0].innerHTML = title;
        
        
        var imgList = showmark.getElementsByTagName('IMG');
        
        for(var i=0;i<imgList.length;i++)
        {
            switch(imgList[i].id)
            {
                case "btnMarkDelete":
                    imgList[i].onclick = this.Delete.bind(this,markId);
                    break;
                case "btnMarkCopy":
                    imgList[i].onclick = this.Copy.bind(this,'http://'+GlobalConfig.Domain +'/?x='+x+'&y='+y+'&title='+escape(title)+'&content='+escape(content));//需要创建标记的Url
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
            this.parentNode.childNodes[0].style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\''+GlobalConfig.SkinPath+'Images/ShowTagBg.png\',sizingMethod=\'image\')'
        }
        else
        {
            this.parentNode.className='ViewTagConMax';
            this.parentNode.childNodes[0].style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\''+GlobalConfig.SkinPath+'Images/ViewTagBg.png\',sizingMethod=\'image\')'
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
    this.Hidden = function()
    {
        vM.$(this.AddId).style.display = "none";
    }
}

var _Mark = new Mark();
