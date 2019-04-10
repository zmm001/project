
var _DcIsBeginDigCowry = false;
var _DCLayer;
var _DCLayer2;
var _DCPopLayer;
var _DcTimer;
var _DcCurrentCell = {x:0, y:0};
var _DcCellSize = {w:128, h:128};
var _DcShowCell = false;
var _DcPop;
var _DcGlobalADImg = '';
var _DcGlobalADImgLink = '';
var _DcZoom;//挖宝的级别，如果在不同的级别切换后挖宝，挖宝无效

/****************
挖宝泡泡类
*****************/
var DigCowryControl = Class.create();
Object.extend(DigCowryControl.prototype, ControlBase.prototype);
DigCowryControl.prototype.LoadUI = function(){
    this.Body.src = '{$ChannelPath}DigFailture.aspx';
};
//挖宝成功泡泡
DigCowryControl.prototype.ShowSuccess = function(){
    //设置COOKIE
    var c = new CookieHelper();
	var d = new Date();
	d.setDate(d.getDate()+1);
	c.setCookie('IsAllowChoice',1,d);
	
    this.Body.src = GlobalConfig.WebRootPath + 'DigCowry/DigSuccess.aspx?rd='+ Math.round(Math.random()*10000);
    this.Show();
    fnMakeCell();
};
//挖宝失败泡泡
DigCowryControl.prototype.ShowFailture = function(){
    this.Body.src = GlobalConfig.WebRootPath + 'DigCowry/DigFailture.aspx?DcGlobalADImg=' + escape(_DcGlobalADImg) + '&DcGlobalADImgLink=' + escape(_DcGlobalADImgLink);
    this.Show();
};
DigCowryControl.prototype.Hide  = function(){
    this.Body.style.display = 'none';
    this.Body.src ='';
};
//重载控件加载完毕后的事件
DigCowryControl.prototype._loadComplete= function()
{
    this.Body.contentWindow.DigCowryControl = this;
    this.onLoadComplete(this);
};
DigCowryControl.prototype.Retry = function()
{
    fnBeginDig(true);
};
DigCowryControl.prototype.Guess = function(cid)
{
    _DcPop.Hide();
    //window.open(GlobalConfig.WebRootPath + 'DigCowry/TrophyVerdict.aspx?TrophyID=' + cid, '_blank');
};

/****************
挖宝组件入口类
*****************/
var DigCowry = Class.create();
Object.extend(DigCowry.prototype,{
    initialize:     function(){
    },
    Init:           function(){
        _DCLayer = vM.NewMapLayer('DCLayer', 333, 0);
        _DCLayer2 = vM.NewMapLayer('DCLayer2', 334, 0);
        _DCPopLayer = vM.NewMapLayer('DCPopLayer', 335, 0);
        
        //初始化栅格大小,以及冠名商图名广告
        ENetwork.DownloadScript(GlobalConfig.EDataCenterUrl + 'CommMap5.0/Dig.aspx?domain='+GlobalConfig.Domain+'&req=1&l=' + GlobalConfig.Language + '&v=1.0&datatype=json',function(){
            if (typeof _DCGloableConfig != 'undefined' && _DCGloableConfig.GConfig && _DCGloableConfig.GConfig[0])
            {
                var GConfig = _DCGloableConfig.GConfig[0];
                _DcCellSize.w = GConfig.DC_GridWidth * 1;
                _DcCellSize.h = GConfig.DC_GridHeight * 1;
                _DcGlobalADImg = GConfig.DC_PADPic2;
                _DcGlobalADImgLink = GConfig.DC_PADUrl2;
                //初始化一个栅格
                fnMakeCell();
            }
            else
            {
                alert('挖宝全局配置数据未初始化！');
            }
        });
        
        //$('MapToolBar').parentNode.style.width = '230px';
        $('MapToolBar').innerHTML = $('MapToolBar').innerHTML+'<li><a href="javascript:fnBeginDig()" title="挖宝"><img id="liDigCowry" src="{$ChannelPath}Images/DigUpCowry.gif" alt="挖宝" /></a></li>';
        
        //挖宝提示TipPop
        var tip = $C('div');
        tip.style.cursor = 'pointer';
        tip.style.width = '177px';
        tip.style.height = '98px';
        tip.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=scale, src="{$ChannelPath}images/DigCowryTip.png");';
        tip.innerHTML = '<!--[if !IE]><!--><img src="{$ChannelPath}images/DigCowryTip.png" alt="" /><!--<![endif]-->';
        tip.style.position = 'absolute';
        tip.style.zIndex = '1003';
        tip.style.top = getTop($('liDigCowry'))*1+18 + 'px';
        tip.style.left = getLeft($('liDigCowry'))*1-70 + 'px';
        tip.onclick = function(){
            fnBeginDig();
            tip.style.display = 'none';
        };
        document.body.appendChild(tip);
        
        //绑定地图点击事件
        vM.onMapClick = function(e){
            if (_DcIsBeginDigCowry)
            {
                fnStopDig();
                var div = vM.$C('div');
                div.innerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="190" height="180"><param name="movie" value="{$ChannelPath}images/spade.swf" /><embed src="{$ChannelPath}images/spade.swf" quality="high" wmode="transparent" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="190" height="180"></embed><param name="wmode" value="transparent"></param></object>';
                var x = vM.PointerX();
                var y = vM.PointerY();
                vM.appendEntity(div, _DCLayer, false, x, y, 190,180,90*2,51*2, false);
                _DcTimer = setTimeout(function(){
                    //判断点击区域是否在随机栅格中
                    if (_DcZoom==vM.Zoom()&&x > _DcCurrentCell.x && x < _DcCurrentCell.x + vM.GetMapPos(_DcCellSize.w)
                        && y > _DcCurrentCell.y && y < _DcCurrentCell.y + vM.GetMapPos(_DcCellSize.h))
                    {
                        fnShowDigPop(true, vM.CenterX() - vM.GetMapPos(100), vM.CenterY() - vM.GetMapPos(50));
                    }
                    else
                    {
                        fnShowDigPop(false, vM.CenterX() - vM.GetMapPos(100), vM.CenterY() - vM.GetMapPos(50));
                    }
                    fnStopDig();
                }, (Math.floor(Math.random()*2) + 2) * 1000);
            }
        };
        
        //绑定地图拖动事件
        setTimeout(function(){
        vM.onMapMoveEnd = function(x,y,flg){
            if(flg==0){vMe.MoveTo(x,y,true);}
            //产生一个栅格图片
            if (!_DcIsBeginDigCowry)
            {
                fnMakeCell();
            }
        };}, 3000);
        
        if (fnRequest('DigCowry').length > 0)
        {
            fnBeginDig();
        }
        
        //5秒后删除挖宝提示
        setTimeout(function(){
            if (tip)
            {
                tip.style.display = 'none';
            }
        }, 5000);
    }      
});

//产生随机栅格
function fnMakeCell(){
    if (vM.MapWidth() * vM.MapHeight() < 300000)
    {
        _DcCurrentCell.x = 0;
        _DcCurrentCell.y = 0;
        _DCLayer2.innerHTML = '';
        return;
    }
    _DcIsFirst = false;
    var lx = vM.CenterX() - vM.GetMapPos(vM.MapWidth() / 2);    //左上角x坐标
    var ly = vM.CenterY() - vM.GetMapPos(vM.MapHeight() / 2);   //左上角y坐标
    var cx = Math.floor(Math.random()*vM.GetMapPos(vM.MapWidth() - _DcCellSize.w)) + lx;       //计算随机栅格x坐标
    var cy = Math.floor(Math.random()*vM.GetMapPos(vM.MapHeight() - _DcCellSize.h)) + ly;       //计算随机栅格y坐标
    _DcCurrentCell.x = cx;
    _DcCurrentCell.y = cy;
    _DCLayer2.innerHTML = '';
    if (_DcShowCell)
    {
        var cell = vM.$C('div');
        cell.cssText = '';
        cell.innerHTML = '<div style="background-color:#fff; width:' + _DcCellSize.w + 'px; height:' + _DcCellSize.h + 'px;">宝箱埋藏地</div>';
        vM.appendEntity(cell, _DCLayer2, false, cx, cy, _DcCellSize.w,_DcCellSize.h,0,0, false);  
    }
    _DcZoom = vM.Zoom();
}  

//开始挖宝
function fnBeginDig(){
    fnStopDig();
    if (_DcPop)
        _DcPop.Hide();
    vM.ShowPointerTip('<img src="{$ChannelPath}images/spade.gif" />', -90, -51);
    _DcIsBeginDigCowry = true;
}

//隐藏挖宝图标
function fnStopDig(){
    clearTimeout(_DcTimer);
    _DCLayer.innerHTML = '';
    vM.HidePointerTip();
    _DcIsBeginDigCowry = false;
}

//显示挖宝Pop
function fnShowDigPop(flag, x, y){
   if (!_DcPop){
        _DcPop = new DigCowryControl(vM.Body.document);
        _DcPop.ID = vM.appendEntity(_DcPop.Body, _DCPopLayer, false, 0, 0, 302,340,0,135, false);
        _DcPop.MoveTo(0, 0);
   }
   vM.moveEntity(_DcPop.ID, x, y);
   if (flag)
        _DcPop.ShowSuccess();
   else
        _DcPop.ShowFailture();

}
document.onkeyup = function(e){
    e = window.event ? window.event : e;
    if (e.ctrlKey && e.altKey && e.keyCode==80)
    {
        var c = new CookieHelper();
	    var d = new Date();
	    d.setDate(d.getDate()+1);
	    var e = prompt('moshi:');
	    c.setCookie('ShowMyBaby',e,d);
    }
};


//获取元素的纵坐标 
function getTop(e){ 
var offset=e.offsetTop; 
if(e.offsetParent!=null) offset+=getTop(e.offsetParent); 
return offset; 
} 

//获取元素的横坐标 
function getLeft(e){ 
var offset=e.offsetLeft; 
if(e.offsetParent!=null) offset+=getLeft(e.offsetParent); 
return offset; 
} 