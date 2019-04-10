function fnLoadInit()
{
    //加载对象
    if(typeof vEdushiMap =='undefined' || typeof vEdushiMap.Body.NewMapLayer !='function')
    {
        setTimeout("fnLoadInit()",50);
        return;
    }
    vM  = vEdushiMap;
    _MarkLayer = vM.NewMapLayer('Mark', 265, 0);//标记图层
    var MarkCss=vM.$C('link');
    MarkCss.rel='stylesheet';
    MarkCss.type = 'text/css';
    MarkCss.href=GlobalConfig.SkinPath+'Css/Mark.css';
    vM.Body.document.getElementsByTagName('head')[0].appendChild(MarkCss);
    if(recordCount>0)
    {
        var firstData = _LocalMemberMaps[0];
        fnLoadMarkList(currentPage);
        fnShowMarkData(firstData.LMM_ID,firstData.LMM_PositionX,firstData.LMM_PositionY,firstData.LMM_Title,firstData.LMM_Description);
    }
    else
    {
        $('EAddressPoint').innerHTML = '<li><div style="text-align:center; line-height:200%;">用户未创建任何标记</div></li>'
    }
}
function fnLoadMarkList(page)
{
    currentPage = page;
    var intBegin  = (currentPage-1)*pageSize;
    var intEnd    = currentPage*pageSize;
    if(intEnd>recordCount){
        intEnd=recordCount;
    }
    $('EAddressPoint').innerHTML = '';
    for(var i=intBegin;i<intEnd;i++)
    {
        var data = _LocalMemberMaps[i];
        $('EAddressPoint').innerHTML += '<li><a id="a'+data.LMM_ID+'" href="javascript:fnShowMarkData('+data.LMM_ID+','+data.LMM_PositionX+','+data.LMM_PositionY+',_LocalMemberMaps['+i+'].LMM_Title,_LocalMemberMaps['+i+'].LMM_Description)">'+data.LMM_Title +'</a></li>';
    }
    var strPage=fnPager(groupPageNum,currentPage,pageSize,pageCount,'fnLoadMarkList');
    $('EAddressPage').innerHTML  = strPage;
}

function fnShowMarkData(id,x,y,title,content)
{
    if(parentOnID&&$('a'+parentOnID))
    {
        $('a'+parentOnID).className = null;
    }
    $('a'+id).className = 'On';
    parentOnID = id;

    
    var markId = "mark"+id;
    if(!vM.$(markId))
    {
        var showmark = vM.$C('div');
        showmark.id = markId;
        showmark.style.display = 'none';
        showmark.innerHTML='<div class="PinIco" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\''+GlobalConfig.SkinPath+'Images/PinIco.png\',sizingMethod=\'image\') !important;"></div><div class="InTagCon"><div class="InTagConBg" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\''+GlobalConfig.SkinPath+'Images/ViewTagBg.png\',sizingMethod=\'image\') !important;"></div><div class="InTagDetCon"><h3 title="标题"></h3><div class="AutoText" id="MarkContent"></div><div class="WkButton"><img id="btnMarkCopy" style="cursor:pointer" src="Images/ToFriend.gif" alt="复制给好友" /></div></div><div class="CloseWin" id="btnMarkDelete" onmouseover="this.className=\'CloseBtnOver\'" onmouseout="this.className=\'CloseBtnOut\'" title="关闭窗口"></div></div>';
        vM.appendEntity(showmark, _MarkLayer, false, x,y,305,132,0,34, false);
        
        var divList = showmark.getElementsByTagName('DIV');
        for(var i=0;i<divList.length;i++)
        {
            switch(divList[i].id)
            {
                case "btnMarkDelete":
                    divList[i].onclick = function(){ Delete(markId)};
                    break;
                case "MarkContent":
                    divList[i].innerHTML = content;
                    break;
            }
        }
        var h3 = showmark.getElementsByTagName('H3');
        h3[0].innerHTML = title;
        
        
        var imgList = showmark.getElementsByTagName('IMG');
        
        for(var i=0;i<imgList.length;i++)
        {
            switch(imgList[i].id)
            {
                
                case "btnMarkCopy":
                    imgList[i].onclick = function(){ Copy('http://'+GlobalConfig.Domain +'/?x='+x+'&y='+y+'&title='+escape(title)+'&content='+escape(content))};//需要创建标记的Url
                    break;
            }
        }
        showmark.style.display = 'block';
    }
    
    vM.MoveTo(x*1+170,y,true);
}
function Delete(id)
{
    if(vM.$(id))
    {
        vM.$(id).parentNode.removeChild(vM.$(id));
    }
}

function Copy(url)
{
    fnCopyToClipboard(url,"复制好了，发给我的QQ/MSN好友分享吧！");
}