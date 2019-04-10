var nArea = 500;
window.onload=fnOnload;

function fnOnload()
{
    if (!window.Config)
    {
        setTimeout('fnOnload()', 200);
        return;
    }
    document.body.innerHTML=window.Config.Loading;
    var sBusTransfer = '<div id="BusTransferNav" style=\"padding-top:10px;\"><strong>' + unescape(fnRequest('oname')) + '</strong>公交换乘：<div id="SetOut"><span>从这里到</span><input id="busnametxt" name="busnametxt" class="InFieldSty" value="请输入终点"  style="color:#999999;" onkeyup="if(this.value != \'输入你要查找的关键字\'){this.style.color=\'#000000\';}"  onfocus="this.value=\'\';" type="text" size="20" />'
                    + '<img onclick="parent.fnBusTransferSearch(\'' + unescape(fnRequest('oname')) + '\',$(\'busnametxt\').value);" src="/Images/SearchBtn.gif" /><div class="HackBox"></div></div>';
                    
    sBusTransfer += '<div id="TurnUp"><span>从</span><input style="color:#999999;" onkeyup="if(this.value != \'输入你要查找的关键字\'){this.style.color=\'#000000\';}" id="busnametxt2" name="busnametxt" class="InFieldSty" value="请输入起点" onfocus="this.value=\'\';" type="text" size="20" /><span>到这里</span>'
                    + '<img onclick="parent.fnBusTransferSearch($(\'busnametxt2\').value,\'' + unescape(fnRequest('oname')) + '\');" src="/Images/SearchBtn.gif" /><div class="HackBox"></div></div>';
    document.body.innerHTML=sBusTransfer;
}