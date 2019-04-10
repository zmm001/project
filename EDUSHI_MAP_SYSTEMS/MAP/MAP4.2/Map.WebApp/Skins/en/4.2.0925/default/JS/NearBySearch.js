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
    var _EntrPopASearch = '<div class="textLine" style="padding:2px; margin-top:10px;">Scope:<input name="rdArea" id="minArea" value="500" onclick="ChangeArea(this)" checked="checked" type="radio" />500m&nbsp;<input name="rdArea" id="maxArea" onclick="ChangeArea(this)" value="1000" type="radio" />1000m </div>'
                        +'<div style="border-top:dotted 1px #999; margin:10px 10px 10px 0"></div><div class="textLine" style="padding:2px 5px 0 5px; ">'
                        +'<div style="width:210px; float:left;">Keywords:<input id="txtKeyword" value="keywords" style="width:145px;color:#333; border:solid 1px #333; margin-right:3px; " onfocus="this.value=\'\';" type="text"  /></div><div id="btnSearch" class="btn" style="background-image:url(../' + window.Config._ImgPath + '14.jpg); " onclick="DoSearch($(\'txtKeyword\').value,{$x},{$y});"></div></div>'
                        +'<div style="border-top:solid 1px #999; margin:10px 10px 3px 0;clear:both;"></div><div class="textLine" style="padding:0 5px">Suggest:{$seachHotKeyWords}</div>';
    var sHotKeyList = '';
    if(typeof parent.parent.parent.SearchHotKeyWords!='undefined')
    {
        var arrSearchHotKeyWords = parent.parent.parent.SearchHotKeyWords;
        for(var i=0;i<arrSearchHotKeyWords.length;i++)
        {
            sHotKeyList += '<a href="javascript:;" onclick="DoSearch(\''+arrSearchHotKeyWords[i]+'\',{$x},{$y})">'+arrSearchHotKeyWords[i]+'</a>&nbsp;&nbsp;';
        }
    }
    document.body.innerHTML=_EntrPopASearch.replaceAll('{$seachHotKeyWords}',sHotKeyList).replaceAll('{$x}',fnRequest('x')).replaceAll('{$y}',fnRequest('y'));
}
function ChangeArea(obj)
{
    nArea = obj.value;
}
function DoSearch(sKeyword,x,y)
{
    if(sKeyword!='')
    {
        parent.PopControlForm._nearbySearch(sKeyword,x,y,nArea);
    }
}