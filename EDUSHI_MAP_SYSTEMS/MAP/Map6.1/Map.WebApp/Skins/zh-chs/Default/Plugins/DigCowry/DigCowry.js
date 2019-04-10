
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
var _isDigDouble=false;

/****************
挖宝泡泡类
*****************/
var DigCowryControl = Class.create();
Object.extend(DigCowryControl.prototype, ControlBase.prototype);
DigCowryControl.prototype.LoadUI = function(){
    //this.Body.src = '/DigCowry/DigFailture.aspx';
    //this.Body.src = '/DigCowry/DigFalse.aspx';
};
//挖宝成功泡泡
DigCowryControl.prototype.ShowSuccess = function(){
    //设置COOKIE
//    var c = new CookieHelper();
//	var d = new Date();
//	d.setDate(d.getDate()+1);
//	c.setCookie('IsAllowChoice',1,d);
	//老接口
    //this.Body.src = GlobalConfig.WebRootPath + 'DigCowry/DigSuccess.aspx?rd='+ Math.round(Math.random()*10000);
    //jw 11.30
    this.Body.src = GlobalConfig.WebRootPath + 'DigCowry/DigTrue.aspx?&rd='+ Math.round(Math.random()*10000);
    this.Show();
    fnMakeCell();
};
//挖宝失败泡泡
DigCowryControl.prototype.ShowFailture = function(){
    //设置COOKIE
    var cc = new CookieHelper();
	var dd = new Date();
	dd.setDate(dd.getDate()+1);
	cc.setCookie('IsSubmitCent',1,dd);
    //老接口
    //this.Body.src = GlobalConfig.WebRootPath + 'DigCowry/DigFailture.aspx?DcGlobalADImg=' + escape(_DcGlobalADImg) + '&DcGlobalADImgLink=' + escape(_DcGlobalADImgLink);
    //jw 11.30
    //this.Body.src = GlobalConfig.WebRootPath + 'DigCowry/DigFalse.aspx?DcGlobalADImg=' + escape(_DcGlobalADImg) + '&DcGlobalADImgLink=' + escape(_DcGlobalADImgLink)+'&rd='+ Math.round(Math.random()*10000);
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

/****************************/
//信息提交成功
DigCowryControl.prototype.ShowSubmitOk = function(){
    this.Body.style.display = 'none';
    this.Body.src ='';
    this.Body.src = GlobalConfig.WebRootPath + 'DigCowry/submitOk.aspx?rd='+ Math.round(Math.random()*10000);
    this.Show();
};

//双倍积分UI
DigCowryControl.prototype.ShowCentBoubleUI = function(){
    this.Body.style.display = 'none';
    this.Body.src ='';
    this.Body.src = GlobalConfig.WebRootPath + 'DigCowry/CentBoubleUI.aspx?DcGlobalADImg=' + escape(_DcGlobalADImg) + '&DcGlobalADImgLink=' + escape(_DcGlobalADImgLink)+'&rd='+ Math.round(Math.random()*10000);
    this.Show();
};

//积分UI
DigCowryControl.prototype.ShowCentFiveUI = function(){
    this.Body.style.display = 'none';
    this.Body.src ='';
    this.Body.src = GlobalConfig.WebRootPath + 'DigCowry/CentFiveUI.aspx?DcGlobalADImg=' + escape(_DcGlobalADImg) + '&DcGlobalADImgLink=' + escape(_DcGlobalADImgLink)+'&rd='+ Math.round(Math.random()*10000);
    this.Show();
};

DigCowryControl.prototype.ShowCentFive1UI = function(){
    this.Body.style.display = 'none';
    this.Body.src ='';
    this.Body.src = GlobalConfig.WebRootPath + 'DigCowry/CentFive1UI.aspx?DcGlobalADImg=' + escape(_DcGlobalADImg) + '&DcGlobalADImgLink=' + escape(_DcGlobalADImgLink)+'&rd='+ Math.round(Math.random()*10000);
    this.Show();
};

DigCowryControl.prototype.ShowCentFive2UI = function(){
    this.Body.style.display = 'none';
    this.Body.src ='';
    this.Body.src = GlobalConfig.WebRootPath + 'DigCowry/CentFive2UI.aspx?DcGlobalADImg=' + escape(_DcGlobalADImg) + '&DcGlobalADImgLink=' + escape(_DcGlobalADImgLink)+'&rd='+ Math.round(Math.random()*10000);
    this.Show();
};

DigCowryControl.prototype.ShowCentFive3UI = function(){
    this.Body.style.display = 'none';
    this.Body.src ='';
    this.Body.src = GlobalConfig.WebRootPath + 'DigCowry/CentFive3UI.aspx?DcGlobalADImg=' + escape(_DcGlobalADImg) + '&DcGlobalADImgLink=' + escape(_DcGlobalADImgLink)+'&rd='+ Math.round(Math.random()*10000);
    this.Show();
};

DigCowryControl.prototype.DigMemberSubmit = function(name,num,phonenum,address,tid,divaddress)
{
    this.Body.style.display = 'none';
    this.Body.src ='';
    if(tid == "0")
    {
        alert('非法操作');
        return;
    }
    var _name = encodeURI(name);
    var _num = encodeURI(num);
    var _phonenum = encodeURI(phonenum);
    var _address = encodeURI(address);
    var _divaddress = encodeURI(divaddress);
    
    var sUrl = GlobalConfig.WebRootPath+'DigCowry/DigMemberCert.aspx?tid='+tid+'&name='+_name+'&tag=1&num='+_num+'&tag1=1&pnum='+_phonenum+'&tag2=1&address='+_address+'&tag3=1&daddress='+_divaddress+'&tag4=1&rd='+ Math.round(Math.random()*10000);
    ENetwork.DownloadScript(sUrl, function() {
        if(typeof __submit != 'undefined')
        {
            if(__submit == 1)
            {
                _DcPop.ShowSubmitOk();
            }
            else if (__submit == -1)
            {
                alert('该宝贝被人在同一时间领走了，下次要快哦');
            }
        }
    });
}
/****************************/

/****************
挖宝组件入口类
*****************/
var DigCowry = Class.create();
Object.extend(DigCowry.prototype, {
    initialize: function() {
    },
    Init: function() {
        _DCLayer = vM.NewMapLayer('DCLayer', 333, true);
        _DCLayer2 = vM.NewMapLayer('DCLayer2', 334, true);
        _DCPopLayer = vM.NewMapLayer('DCPopLayer', 335, true);

        //初始化栅格大小,以及冠名商图名广告
        ENetwork.DownloadScript(GlobalConfig.EDataCenterUrl + 'CommMap5.0/Dig.aspx?domain=' + GlobalConfig.Domain + '&req=1&l=' + GlobalConfig.Language + '&v=1.0&datatype=json', function() {
            if (typeof _DCGloableConfig != 'undefined' && _DCGloableConfig.GConfig && _DCGloableConfig.GConfig[0]) {
                var GConfig = _DCGloableConfig.GConfig[0];
                _DcCellSize.w = GConfig.DC_GridWidth * 1;
                _DcCellSize.h = GConfig.DC_GridHeight * 1;
                _DcGlobalADImg = GConfig.DC_PADPic2;
                _DcGlobalADImgLink = GConfig.DC_PADUrl2;
                //初始化一个栅格
                fnMakeCell();
            }
            else {
                alert('挖宝全局配置数据未初始化！');
            }
        });

        //$('MapToolBar').parentNode.style.width = '230px';
        $('MapToolBar').innerHTML = $('MapToolBar').innerHTML + '<li class="ico5"><a href="javascript:fnBeginDig()" title="挖宝"><img id="liDigCowry" src="/DigCowry/Images/DigUpCowry.gif" alt="挖宝" />挖宝</a></li>';
            
            ///////////////////jw////////////////////////////////
        //挖宝提示TipPop
//        var tip = $C('div');
//        tip.style.cursor = 'pointer';
//        tip.style.width = '177px';
//        tip.style.height = '98px';
//        tip.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=scale, src="/DigCowry/images/DigCowryTip.png");';
//        tip.innerHTML = '<!--[if !IE]><!--><img src="/DigCowry/images/DigCowryTip.png" alt="" /><!--<![endif]-->';
//        tip.style.position = 'absolute';
//        tip.style.zIndex = '1003';
//        tip.style.top = getTop($('liDigCowry')) * 1 + 18 + 'px';
//        tip.style.left = getLeft($('liDigCowry')) * 1 - 70 + 'px';
//        tip.onclick = function() {
//            fnBeginDig();
//            tip.style.display = 'none';
//        };
//        document.body.appendChild(tip);
///////////////////jw////////////////////////////////

        //绑定地图点击事件
        vM.attachEvent(EGIS.KeyWord.EventName.MapClick, function(e) {
            if (_DcIsBeginDigCowry) {
                fnStopDig();
                var div = vM.$C('div');
                div.innerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="175" height="165"><param name="movie" value="/DigCowry/image/chutou.swf" /><embed src="/DigCowry/image/chutou.swf" quality="high" wmode="transparent" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="175" height="165"></embed><param name="wmode" value="transparent"></param></object>';
                var x = vM.PointerX();
                var y = vM.PointerY();
                vM.AppendEntity(div, _DCLayer, false, x, y, 175, 165, 80 * 2, 65 * 2, false);
                _DcTimer = setTimeout(function() {
                    //判断点击区域是否在随机栅格中
                    if (_DcZoom == vM.Zoom() && x > _DcCurrentCell.x && x < _DcCurrentCell.x + vM.GetMapPos(_DcCellSize.w)
                        && y > _DcCurrentCell.y && y < _DcCurrentCell.y + vM.GetMapPos(_DcCellSize.h)) {
                        //fnShowDigPop(true, vM.CenterX() - vM.GetMapPos(100), vM.CenterY() - vM.GetMapPos(50));
                        /****************************************/
                        var _sUrl = GlobalConfig.WebRootPath+'DigCowry/dig.aspx?rd='+ Math.round(Math.random()*10000);
                        //设置COOKIE
                        var c = new CookieHelper();
	                    var d = new Date();
	                    d.setDate(d.getDate()+1);
	                    c.setCookie('IsAllowChoice',1,d);
                        ENetwork.DownloadScript(_sUrl,function(){
                            if(typeof __isDig != 'undefined')
                            {
                                if(__isDig == 1)    //表示挖到
                                {
                                    fnShowDigPop(true, vM.CenterX() - vM.GetMapPos(100), vM.CenterY() - vM.GetMapPos(50));
                                }
                                else
                                {
                                    fnShowDigPop(false, vM.CenterX() - vM.GetMapPos(100), vM.CenterY() - vM.GetMapPos(50),'0');
                                }
                            }
                        });
                        /****************************************/
                    }
                    else {
                        /****************************************/
//                        var _sUrl = GlobalConfig.WebRootPath+'DigCowry/DigFalse.aspx?&rd='+ Math.round(Math.random()*10000);
//                        //设置COOKIE
//                        var cc = new CookieHelper();
//	                    var dc = new Date();
//	                    dc.setDate(dc.getDate()+1);
//	                    cc.setCookie('IsAllowChoice1',1,dc);
//                        
//                        ENetwork.DownloadScript(_sUrl,function(){
//                            if(typeof __isDigNum != 'undefined')
//                            {
//                                fnShowDigPop(false, vM.CenterX() - vM.GetMapPos(100), vM.CenterY() - vM.GetMapPos(50),__isDigNum);
//                            }
//                        });
                        /****************************************/
                        
                        fnShowDigPop(false, vM.CenterX() - vM.GetMapPos(100), vM.CenterY() - vM.GetMapPos(50),'0');
                    }
                    fnStopDig();
                }, (Math.floor(Math.random() * 2) + 2) * 1000);
            }
        });

        //绑定地图拖动事件
        setTimeout(function() {
            vM.attachEvent(EGIS.KeyWord.EventName.MapMoveEnd, function(x, y, flg) {
                //产生一个栅格图片
                if (!_DcIsBeginDigCowry) {
                    fnMakeCell();
                }
            });
        }, 3000);

        if (fnRequest('DigCowry').length > 0) {
            fnBeginDig();
        }
///////////////////jw////////////////////////////////
        //5秒后删除挖宝提示
//        setTimeout(function() {
//            if (tip) {
//                tip.style.display = 'none';
//            }
//        }, 5000);
///////////////////////////////////////////////////
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
        vM.AppendEntity(cell, _DCLayer2, false, cx, cy, _DcCellSize.w,_DcCellSize.h,0,0, false);  
    }
    _DcZoom = vM.Zoom();
}  

//开始挖宝
function fnBeginDig(){
    fnGoogleStat("2009挖宝");
    fnMakeCell();
    _isDigDouble = false;
    //判断是否登录
    //用JS获取用户的昵称
    //debugger;
    var cc = new CookieHelper();
    var cookieNickNameCookie = cc.getCookie('MemberNickName');
    if (cookieNickNameCookie != null) {
        fnStopDig();
        if (_DcPop)
            _DcPop.Hide();
            if (EGIS.Browser.Name == 'MSIE' && EGIS.Browser.Version < 7)
            {
                vM.ShowPointerTip('<div style="background:url(/DigCowry/image/m2.png) no-repeat;width:110px;height:129px;position:absolute;filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=noscale,src=\'/DigCowry/image/m2.png\');background-image: none;"></div>', -90, -110);
            }
            else
            {
                vM.ShowPointerTip('<div style="background:url(/DigCowry/image/m2.png) no-repeat;width:110px;height:129px;position:absolute;"></div>', -90, -110);
            }
        _DcIsBeginDigCowry = true;
    }
    else {
        fnShowLogin(fnBeginDig);//显示登录框
        
    }
    
//    fnStopDig();
//    if (_DcPop)
//        _DcPop.Hide();
//    vM.ShowPointerTip('<img src="/DigCowry/images/spade.gif" />', -90, -51);
//    _DcIsBeginDigCowry = true;
}
//
//隐藏挖宝图标
function fnStopDig(){
    clearTimeout(_DcTimer);
    _DCLayer.innerHTML = '';
    vM.HidePointerTip();
    _DcIsBeginDigCowry = false;
}

//显示挖宝Pop
function fnShowDigPop(flag, x, y,nflag){
   if (!_DcPop){
        _DcPop = new DigCowryControl(vM.Body.document);
        //老方法
        //_DcPop.ID = vM.AppendEntity(_DcPop.Body, _DCPopLayer, false, 0, 0, 302,340,0,135, false);
        _DcPop.ID = vM.AppendEntity(_DcPop.Body, _DCPopLayer, false, 0, 0, 388,490,120,160, false);
        _DcPop.MoveTo(0, 0);
   }
   vM.MoveEntity(_DcPop.ID, x, y);
   if(_isDigDouble)
   {
        _isDigDouble = false;
       _DcPop.ShowCentBoubleUI();
   }
   else
   {
       if (flag) {
           _DcPop.ShowSuccess();
       }
       else {
            if(nflag == '0')
            {
                _DcPop.ShowCentFiveUI();
            }
            if(nflag == '1')
            {
                _DcPop.ShowCentFive1UI();
            }
            if(nflag == '2')
            {
                _DcPop.ShowCentFive2UI();
            }
            if(nflag == '3')
            {
                _DcPop.ShowCentFive3UI();
            }
       }
    }
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

/*************************************/

/*************************************/