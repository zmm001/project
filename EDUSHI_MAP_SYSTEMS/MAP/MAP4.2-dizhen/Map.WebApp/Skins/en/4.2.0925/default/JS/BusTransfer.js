
var nArea = 500;
window.onload=fnOnload;

function fnOnload()
{
    if (!window.Config)
    {
        setTimeout('fnOnload()', 200);
        return;
    }
    document.body.innerHTML=window.Config._Loading;
    var _BusTransfer = '<ul class="huancheng" style="white-space:nowrap;"><li class="se"><div style="width:80px; padding:1px 5px 0 5px; border:solid 1px #999; color:#1A70C7;">From Here</div></li><li><input id="busnametxt" name="busnametxt" style="padding-top:4px;height:18px;border:solid 1px #999; color:#666;" value="endpoint" onfocus="this.value=\'\';" type="text"></li><li class="chaxun1">'
                    +'<img style="cursor:pointer;" onclick="parent.PopControlForm._busSEXYSearch(1, fnRequest(\'x\'),fnRequest(\'y\'),$(\'busnametxt\').value);" src="'+window.Config._ImgPath+'14.jpg" /></li></ul>';
                    
    _BusTransfer += '<ul class="huancheng" style="white-space:nowrap; margin-top:-10px;"><li class="se"><div style="width:80px; padding:1px 5px 0 5px; border:solid 1px #999; color:#1A70C7;">To Here</div></li><li><input id="busnametxt2" name="busnametxt" style="padding-top:4px;height:18px;border:solid 1px #999; color:#666;" value="starting point" onfocus="this.value=\'\';" type="text"></li><li class="chaxun1">'
                    +'<img style="cursor:pointer;" onclick="parent.PopControlForm._busSEXYSearch(2, fnRequest(\'x\'),fnRequest(\'y\'),$(\'busnametxt2\').value);" src="'+window.Config._ImgPath+'14.jpg" /></li></ul>';
    document.body.innerHTML=_BusTransfer;
}