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
    var sEntrPopASearch = '<div id="Ex">在<strong>'+unescape(fnRequest('oname'))+'</strong>附近查找周边：<br>想查找这里附近的活动场所么？请确认周边范围和关键字吧！如：<span>银行</span>&nbsp;<span>餐馆</span>&nbsp;<span>医院</span>等</div><div id="NearBySeaNav"><div class="P">查找范围<input name="rdArea" id="minArea" value="500" onclick="ChangeArea(this)" checked="checked" type="radio" />500米&nbsp;&nbsp;<input name="rdArea" id="maxArea" onclick="ChangeArea(this)" value="1000" type="radio" />1000米 </div>'
                        +'<div class="P"><span><input id="txtKeyword" style="color:#999999;" onkeyup="if(this.value != \'输入你要查找的关键字\'){this.style.color=\'#000000\';}" value="输入你要查找的关键字" onfocus="this.value=\'\';" type="text" class="InFieldSty" size="30"  /></span><img src="/Images/SearchBtn.gif" id="btnSearch" onclick="DoSearch($(\'txtKeyword\').value,{$x},{$y});" /></div>'
                        +'<div class="P">推荐关键字：{$seachHotKeyWords}</div></div>';
    var sHotKeyList = '';
 
    if(typeof parent._SearchHotkey != 'undefined' && parent._SearchHotkey.AroundHotKeyWords.length > 0)
    {
        var arrAroundHotkey = parent._SearchHotkey.AroundHotKeyWords;
        for(var i=0;i<arrAroundHotkey.length;i++)
        {
            sHotKeyList += '<a href="javascript:;" style="color:red" onclick="DoSearch(\''+arrAroundHotkey[i].MKW_Name+'\',{$x},{$y})">'+arrAroundHotkey[i].MKW_Name+'</a>&nbsp;&nbsp;'; 
        } 
        sEntrPopASearch = sEntrPopASearch.replaceAll('{$seachHotKeyWords}',sHotKeyList).replaceAll('{$x}',fnRequest('x')).replaceAll('{$y}',fnRequest('y'));    
     
    }
    else 
    {
      sHotKeyList = '<a href="javascript:;" style="color:red" onclick="DoSearch(\'酒店\',{$x},{$y})">酒店</a>&nbsp;&nbsp;'; 
      sEntrPopASearch = sEntrPopASearch.replaceAll('{$seachHotKeyWords}',sHotKeyList).replaceAll('{$x}',fnRequest('x')).replaceAll('{$y}',fnRequest('y')); 
    }
      document.body.innerHTML = sEntrPopASearch;
}
function ChangeArea(obj)
{
    nArea = obj.value;
}
function DoSearch(sKeyword,x,y)
{
    if(sKeyword!='' && sKeyword != '输入你要查找的关键字')
    {
        parent.fnNearbySearch(sKeyword,x,y,nArea);
    }
}