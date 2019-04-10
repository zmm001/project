//标记类
function EAddress()
{
    this.Index = 0;
    this.AddId = 'AddEAddress';
    this.AddHTML = '<div class="TagNav"><div class="PinIco" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\''+GlobalConfig.SkinPath+'Images/PinIco.png\',sizingMethod=\'image\') !important;"></div><div class="InTagCon"><div class="InTagConBg" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\''+GlobalConfig.SkinPath+'Images/InTagBg2.png\',sizingMethod=\'image\') !important;"></div><div class="InTagDetCon"><h3>我的E地址</h3><table cellpadding="1" cellspacing="0" border="0"><tr><th>标题：</th><td><input id="txtEAddressTitle" style="width:228px; border:solid 1px #666" value="" type="text" /></td></tr><tr><th></th><td class="Explain">(<span>※</span>此项为必填项 控制在20字符以内)</td></tr><tr><th>内容：</th><td><textarea id="txtEAddressContent" style=" border:solid 1px #666" cols="26"  rows="4"></textarea></td></tr><tr><td colspan="2" align="center"><img id="btnEAddressConfirm" src="'+GlobalConfig.SkinPath+'Images/TagBtn.gif" style="cursor:pointer" alt="确认" />&nbsp;&nbsp;<img id="btnEAddressReBegin" src="'+GlobalConfig.SkinPath+'Images/ReMapAc.gif" style="cursor:pointer" alt="重新取点" /></td></tr></table></div><div id="btnEAddressClose" class="CloseWin" onmouseover="this.className=\'CloseBtnOver\'" onmouseout="this.className=\'CloseBtnOut\'" title="关闭"></div></div></div>';
    
    this.Add = function(x,y,title,content)
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
            vM.appendEntity(addmark, _MarkLayer, false, x,y,305,214,-2,34, false);
        }
        vM.$('txtEAddressTitle').value = title;
        vM.$('txtEAddressContent').value = content;
        if(_EAddressStatus==0)
        {
            vM.$('btnEAddressConfirm').onclick = function(){if(vM.$('txtEAddressTitle').value==''||vM.$('txtEAddressTitle').value.length>20)return; _EAddressRegTab.TabBody.contentWindow.ShowEAddressInfo(x,y,vM.$('txtEAddressTitle').value,vM.$('txtEAddressContent').value,false)};
        }
        else
        {
            vM.$('btnEAddressConfirm').onclick = function(){if(vM.$('txtEAddressTitle').value==''||vM.$('txtEAddressTitle').value.length>20)return; _EAddressManagerTab.TabBody.contentWindow.ShowEAddressInfo(x,y,vM.$('txtEAddressTitle').value,vM.$('txtEAddressContent').value,false)};
        }
        vM.$('btnEAddressClose').onclick = this.Hidden.bind(this);
        vM.$('btnEAddressReBegin').onclick = this.Begin.bind(this);
        _IsBeginSelectEAddress = false;
    };
    
    this.Begin = function()
    {
        if(!_IsBeginSelectEAddress)
        {
            _IsBeginSelectEAddress = true;
            var tip = '<div style="height:15px; line-height:15px; border:1px solid #1A70C7; background:#fff; padding:0 4px 0 4px;filter:alpha(opacity=90); opacity:.9; float:left; color:#000; font-size:12px; white-space:nowrap;">单击左键选择E地址位置</div>';
            vM.ShowPointerTip(tip); 
            if(vM.$(this.AddId))
            {
                this.Hidden();
            }
        }
    };
    this.Hidden = function()
    {
        if(vM.$(this.AddId))
        {
            vM.$(this.AddId).style.display = "none";
        }
    }
}

var _EAddress = new EAddress();