function ClassMark(){};
ClassMark.prototype._MarkerView = '<div style="width:200px;filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1)"><div style="height:45px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\''+GlobalConfig._ImgPath+'ding.png\',sizingMethod=\'image\');"><!--[if !IE]><!--><img src="'+GlobalConfig._ImgPath+'ding.png" /><!--<![endif]--></div><div class="dialog">'
                                +'<div class="title"><div><img src="'+GlobalConfig._ImgPath+'newmap10.gif" alt="标记" style="margin-top:3px;" /></div><div style="overflow:hidden; width:140px; height:20px;">{$MarkerTitle}</div><a class="HideMarkerInfo" style="cursor:pointer" onclick="parent._Mark.fnMarkEx(\'{$id}\',this);" ></a></div>'
                                +'<div id="MarkC{$id}" class="content"><div class="textLine" style="padding-left:5px; text-indent:2em; padding-right:5px;white-space:normal; word-break:break-all; overflow:hidden;">{$MarkerContent}'
                                +'</div><div style="border-bottom:solid 1px #666; margin:5px 1px 10px 1px;"></div><input id="MarkAdd{$id}" value="{$Add}" style="width:195px; display:none;"  /><div class="textLine" style="background-color:#ffffff; height:25px;"><div class="DelMarker" onclick="parent._Mark.Del(\'{$id}\',\'{$Clear}\');">删除标记</div><div class="CopyMarker" onclick="parent._Mark.fnCopyCode(MarkAdd{$id},\'复制成功，请贴到你的QQ/MSN上发给你的好友！\')">复制给好友</div></div></div></div></div>';
ClassMark.prototype._MarkerAdd = '<div id="MenuMarkerPop" style="width:300px; position:absolute; z-index:200;filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1)"><div style="height:45px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\''+GlobalConfig._ImgPath+'ding.png\',sizingMethod=\'image\');"><!--[if !IE]><!--><img src="'+GlobalConfig._ImgPath+'ding.png" /><!--<![endif]--></div>'
                                +'<div class="dialog" style="height:195px;"><div class="title"><div><img src="'+GlobalConfig._ImgPath+'newmap10.gif" alt="标记" style="margin-top:3px;" /></div><div style="margin-left:2px;">标记</div><a style="cursor:pointer" onclick="parent._Mark.RemoveMarkPop(\'AddMarkerPop\');"></a></div>'
                                +'<div class="content"><div class="all"><div class="textLine"><div style="float:left;">标题： </div><input id="txtMarkerTitle" value="{$MarkerTitle}" style="width:220px; color:#333; border:solid 1px #666; margin-left:2px;" type="text" /><span class="redText">&nbsp;*</span>'
                                +'</div><div id="divMarkerError" class="redText" style="background:url('+GlobalConfig._ImgPath+'Warning.gif) no-repeat; padding-left:20px; margin-left:38px; display:none;"></div>'
                                +'<div class="textLine"><div style="float:left;">内容：</div><textarea id="txtMarkerContent" style="width:220px; height:70px; border:solid 1px #666;"></textarea>'
                                +'</div><div class="textLine"><div class="btnConfirm" style="margin-left:100px; " onclick="parent._Mark.Save({$x},{$y})"></div></div></div></div></div></div>';
ClassMark.prototype.ShowAll = function(){
    var c = new CookieHelper();
    var aMark = c.getCookie('Mark')==null?'':c.getCookie('Mark').split('|');
	for(i=0;i<aMark.length-1;i++){
		if(vM.$('PopMark_'+i))this.RemoveMarkPop('PopMark_'+i);
	}
	for(i=0;i<aMark.length-1;i++){
		var aryTemp = aMark[i].split('^');	
		var nd = vM.$C('div');
        nd.id='PopMark_'+i;
        nd.innerHTML=this._MarkerView.replace('{$MarkerTitle}',aryTemp[3]).replace('{$MarkerContent}',aryTemp[2]).replaceAll('{$id}',i).replace('{$Clear}',aMark[i]+'|');
        vM.appendEntity(nd, _MarkLayer, false, aryTemp[0],aryTemp[1],233,110,0,40, false);
        nd=null;
	}
}
//地图中显示标记
ClassMark.prototype.Show = function(i,x,y,title,content){
    var add='http://'+GlobalConfig._Node+'/?x='+x+'&y='+y+'&title='+escape(title)+'&content='+escape(content);
    var Mark = parseInt(x)+'^'+parseInt(y)+'^'+content+'^'+title+'|';
	if(vM.$('PopMark_'+i))this.RemoveMarkPop('PopMark_'+i);
    var nd = vM.$C('div');
    nd.id='PopMark_'+i;
    nd.innerHTML=this._MarkerView.replace('{$MarkerTitle}',unescape(title)).replace('{$MarkerContent}',unescape(content)).replaceAll('{$id}',i).replace('{$Add}',add).replace('{$Clear}',Mark);;
    vM.appendEntity(nd, _MarkLayer, false, x,y,233,110,0,40, false);
    vM.MoveTo(x*1, y*1, true);
}
//修改标记菜单
ClassMark.prototype.Load = function(){
    var c = new CookieHelper();
    var aMark = c.getCookie('Mark')==null?'':c.getCookie('Mark').split('|');
	var r='';
	$('MarkLi').innerHTML=' <li onclick="if (confirm(\'你确定清除所有标记吗\')){_Mark.Clear()}">清除所有标记</li>';
	for(i=0;i<aMark.length-1;i++){
        var aryTemp = aMark[i].split('^');
        r+='<li onmouseover="OverBackground(this)" onmouseout="OutBackground(this)" onclick="_Mark.Show('+i+','+aryTemp[0]+','+aryTemp[1]+',\''+aryTemp[3]+'\',\''+aryTemp[2]+'\');" >'+aryTemp[3]+'</li>';
	}
	$('MarkLi').innerHTML=r+$('MarkLi').innerHTML;
}
//保存标记
ClassMark.prototype.Save=function(x,y){
    if (vM.$('txtMarkerTitle').value.length < 1){
        vM.$('divMarkerError').innerHTML = '必须填写标题';
        vM.$('divMarkerError').style.display = 'block';
        return;
    }
    if (vM.$('txtMarkerTitle').value.length > 20){
        vM.$('divMarkerError').innerHTML = '标题不能超过20个字符';
        vM.$('divMarkerError').style.display = 'block';
        return;
    }
//    if ($('txtMarkerContent').value.length < 1){
//        $('divMarkerError').innerHTML = '必须填写内容';
//        $('divMarkerError').style.display = 'block';
//        return;
//    }
    if (vM.$('txtMarkerContent').value.length > 100){
        vM.$('divMarkerError').innerHTML = '内容不能超过100个字符';
        vM.$('divMarkerError').style.display = 'block';
        return;
    }
    vM.$('divMarkerError').style.display = 'none';
    var c = new CookieHelper();
	var d = new Date();
	var MarkCookie = c.getCookie('Mark')==null?'':c.getCookie('Mark'); 
	Mark = parseInt(x)+'^'+parseInt(y)+'^'+vM.$('txtMarkerContent').value+'^'+vM.$('txtMarkerTitle').value+'|';
	d.setMonth(d.getMonth()+12)
	c.setCookie('Mark',MarkCookie+Mark,d);
	var i=0;
	var add='http://'+GlobalConfig._Node+'/?x='+x+'&y='+y+'&title='+escape(vM.$('txtMarkerTitle').value)+'&content='+escape(vM.$('txtMarkerContent').value);
	i=c.getCookie('Mark').split('|').length-2;
	var nd = vM.$C('div');
    nd.id='PopMark_'+i;
    nd.innerHTML=this._MarkerView.replace('{$MarkerTitle}',vM.$('txtMarkerTitle').value).replace('{$MarkerContent}',vM.$('txtMarkerContent').value).replaceAll('{$id}',i).replace('{$Add}',add).replace('{$Clear}',Mark);
    vM.appendEntity(nd, _MarkLayer, false, x,y,233,110,0,40, false);
    nd=null;
    $('MarkLi').innerHTML='<li onmouseover="OverBackground(this)" onmouseout="OutBackground(this)" onclick="_Mark.Show('+i+','+x+','+y+',\''+vM.$('txtMarkerTitle').value+'\',\''+vM.$('txtMarkerContent').value+'\');" >'+vM.$('txtMarkerTitle').value+'</li>'+$('MarkLi').innerHTML;
    this.RemoveMarkPop('AddMarkerPop');
}
ClassMark.prototype.Del=function(i,clearContent){
    if(i=='EMark')
    {
        this.RemoveMarkPop('PopMark_'+i);
        return;
    }
    else
    {
        this.RemoveMarkPop('PopMark_'+i);
	    var c = new CookieHelper();
	    var d = new Date();
	    var Mark = c.getCookie('Mark')==null?'':c.getCookie('Mark');
	    Mark = Mark.replace(clearContent,'');
	    d.setHours(d.getHours()+5);
	    c.setCookie('Mark',Mark,d);
	    c=null;
	    this.Load();
	}
}
ClassMark.prototype.Clear=function(){
    var c = new CookieHelper();
    var aMark = c.getCookie('Mark')==null?'':c.getCookie('Mark').split('|');
    if(aMark=="")return false;
	for(i=0;i<aMark.length;i++){
		if(vM.$('PopMark_'+i)) this.RemoveMarkPop('PopMark_'+i);
	}
	var d = new Date();
	d.setHours(d.getHours()+5);
	c.setCookie('Mark','',d);
	$('MarkLi').innerHTML=' <li onclick="if (confirm(\'你确定清除所有标记吗\')){_Mark.Clear()}">清除所有标记</li>';
}
ClassMark.prototype.Hidden=function(){
    var c = new CookieHelper();
    var aMark = c.getCookie('Mark')==null?'':c.getCookie('Mark').split('|');
    if(aMark=="")return false;
	for(i=0;i<aMark.length-1;i++){
		if(vM.$('PopMark_'+i))this.RemoveMarkPop('PopMark_'+i);
	}
}
ClassMark.prototype.RemoveMarkPop=function (id)
{
    if(vM.$(id))
    {
        vM.$(id).parentNode.removeChild(vM.$(id));
    }
}
ClassMark.prototype.Mark = function(x,y,title)
{
    vM.MoveTo(x*1, y*1, true);
    this.RemoveMarkPop('AddMarkerPop');
    vM.HidePointerTip();
    _isBeginSelectMark = false;
    if($('AddMarkerPop')){
        $('AddMarkerPop').style.display = "block";
        $('AddMarkerPop').style.top    = y-40;
        $('AddMarkerPop').style.left   = x;
        $('txtMarkerTitle').value=title;
    }else{
        var nd = vM.$C('div');
        nd.id='AddMarkerPop';
        nd.innerHTML=this._MarkerAdd.replace('{$x}',x).replace('{$y}',y).replace('{$MarkerTitle}',title);                
        vM.appendEntity(nd, _MarkLayer, false, x,y-40,233,110,0,40, false);
        nd=null;
        delete nd;
    }
}

ClassMark.prototype.fnCopyCode = function (strUrl, msg){
//	if (navigator.appVersion.match(/\bMSIE\b/)){
//		Copied = vM.$(strUrl).createTextRange();
//	    Copied.execCommand('Copy');
//	    alert(msg);
//	}else{
//		alert('您的浏览器不支持拷贝功能，请用Ctrl+C复制。');		
//		vM.$(strUrl).select();		
//	}
	var txt = vM.$(strUrl).value;
	fnCopyToClipboard(txt,msg);
}

ClassMark.prototype.fnMarkEx = function (id,o){
    if(vM.$('MarkC'+id).style.display=='none'){
        vM.$('MarkC'+id).style.display='block';
        o.className='HideMarkerInfo';
    }else{
        vM.$('MarkC'+id).style.display='none';
        o.className='ShowMarkerInfo';
    }
}
var _Mark = new ClassMark();

function fnSelectMarkPoint(){
    fnUnMark();
    //fnUnPanel();
    //fnUnScale();
    _isBeginSelectMark = true;
    var tip = '<div style="height:15px; line-height:15px; border:1px solid #1A70C7; background:#fff; padding:0 4px 0 4px;filter:alpha(opacity=90); opacity:.9; float:left; color:#000; font-size:12px; white-space:nowrap;">单击左键选择标记位置</div>';
    vM.ShowPointerTip(tip);     
}

function fnUnMark()
{
    _isBeginSelectMark = false;
    vM.Property.PointerTip = '';
    vM.ShowPointerTip(false);
}
function fnMark(x,y,title){
    cPopControl.Hide()
    $('MenuMarkerPop').style.display = "block";
    $('MenuMarkerPop').style.top  = y-40;
    $('MenuMarkerPop').style.left   = x;
    $('txtMarkerTitle').value=title;
    vM.HidePointerTip();
    _isBeginSelectMark = false;
}

function fnMarkEx(id,o){
    if($('MarkC'+id).style.display=='none'){
        $('MarkC'+id).style.display='block';
        o.className='HideMarkerInfo';
    }else{
        $('MarkC'+id).style.display='none';
        o.className='ShowMarkerInfo';
    }
}