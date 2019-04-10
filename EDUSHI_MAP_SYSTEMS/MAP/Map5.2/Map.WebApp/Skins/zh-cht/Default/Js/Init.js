var vM =    null;               //地图对象
var vMe =   null;               //鹰眼对象

var _DebugControl;              //纠错控件

var _ZoomBar = null;            //缩放工具条
var _TabControl;                //选项卡
var _EntityPopControl;          //实体Pop
var _CompanyPopControl;         //企业Pop
var _BusStationControl;         //公交Pop
var _ThemePopControl;           //主题Pop
var _CommendPopControl;         //推荐Pop
var _FromSearchControl;         //这里出发Pop
var _ToSearchControl;           //到达这里Pop

var _MapExpandingState = true;       //标记地图搜索栏收缩状态
var _MapFullScreenState = false;       //标记地图是否为全屏状态
var _IsBeginSelectMark = false;  //是否开始标记
var _IsBeginScale = false;  //是否开始测距
var __IsDrawBusLineState = false; //标记当前是公交站点的画线图层还是换乘的画线图层

var _IconLayer;             //小图标图层
var _EyeIconLayer;           //鹰眼图标图层
var _BusTransferLineLayer;          //公交换乘线图层
var _PopLayer;
var _ShowScaleLayer;        
var _ShowMessageBoxLayer;       
var _BusStationLayer;

var _BusLineCoordList = [];        //公交线路坐标
var _BusLineData = null;           //公交站点数据
var _BusLineType = 0;              //线路正向还是反向

var _EAddressRegTab = null;
var _MarkEAddressTab = null;
var _EAddressManagerTab = null;
var _EAddressStatus = 0; //0：申请，1：管理
var _IsBeginSelectEAddress = false;
var _IsBeginMarkEAddress = false;
var _LoginCallback = null;//登录完成后的回调函数

//创建E地址的全局变量
var __EAddressX = 0;
var __EAddressY = 0;
var __EAddressTitle = '';
var __EAddressContent='';

var _EAddressOperatorType = 0;

function fnLoadInit() {

    var cc = new CookieHelper();
    var cookieNickNameCookie = cc.getCookie('MemberNickName');
    if (cookieNickNameCookie != null) {
        $('liLoginInfo').innerHTML = '欢迎您！<span style="color:#ff6400">' + cookieNickNameCookie + '</span><span>[<a href="' + GlobalConfig.UserCenterUrl + 'Index.aspx" target="_blank">我的E都市</a>]</span>&nbsp;<span>[<a href="javascript:fnLoginOut();">退出</a>]</span>';
    }
    else
    {
        $('liLoginInfo').innerHTML = '欢迎您！<span>[<a href="http://my.edushi.com/Register.aspx" target="_blank" title="注册">注册</a>]</span><span>[<a href="javascript:;" onclick="fnShowLogin();pageTracker._trackEvent(\'Map5.2\', \'Mater_UI\', \'登录\'); ">登录</a>]</span>';
    }
    //加载对象
    if(typeof vEdushiMap =='undefined' || typeof vEdushiMap.Body.NewMapLayer !='function'  || typeof veyeEdushiMap =='undefined' ||  typeof veyeEdushiMap.Body.NewMapLayer !='function')
    {
        setTimeout("fnLoadInit()",50);
        return;
    }
    vM  = vEdushiMap;
    vMe = veyeEdushiMap;
    vM.Body.Body.style.cursor = "url('/Skins/zh-chs/Default/Images/n.cur')";
    vM.Body.CurNormal = "url('/Skins/zh-chs/Default/Images/n.cur')";
    vM.Body.CurDrag = "url('/Skins/zh-chs/Default/Images/d.cur')";
    window.onresize();
    
    _IconLayer = vM.NewMapLayer('Icon',269, 0);
    _EyeIconLayer = vMe.NewMapLayer('Icon', 264, 0);
    _PopLayer = vM.NewMapLayer('Pop',269, 0);
    _MarkLayer = vM.NewMapLayer('Mark', 265, 0);//标记图层
    _BusTransferLineLayer = vM.NewMapLayer('BusTransferLine', 149);//公交线路
    _ShowScaleLayer = vM.NewMapLayer('Scale', 260);//显示测距
    _ShowMessageBoxLayer = vM.NewMapLayer('message', 300);
    _BusStationLayer = vM.NewMapLayer('BusStation', 261);
    fnAddMarkCss();
    
    //初始化广告
    fnInitPicAD();
    //下载主题地图分类列表
    fnLoadThemeMapsTypeList();
    //下载热门关键字
    fnLoadHotKey(); 
    //下载常用位置
    fnLoadCommonGoTo();   
    
    //初始化各种Pop
    fnInitPopControl();
    //初始化选项卡
    fnInitTabControl();
    //初始化滚动新闻列表
    fnLoadNewsList();
    
    //滑竿缩放
    _ZoomBar = new ZoomBarClass();
    _ZoomBar.Init();    
    vM.onMapZoomChange = function(z){
        _ZoomBar.ZoomTo(vM.Zoom());
        vMe.FlatZoom(vM.Zoom());
        if(__IsDrawBusLineState)
        {
            fnShowBusStationIco(_BusLineData, _BusLineType);
        }
        else
        {
            fnDrawingBusLine(_BusLineCoordList);
        }
    };
    vM.onMapMouseDown = function(e) {
        __EdushiSuggest.Hide();
    };    
    //地图鹰眼联动
    vMe.onMapMoveEnd = function(x,y,flg){
        if(vM.MapState()!=0)
        {
            if(__IsDrawBusLineState)
            {
                fnShowBusStationIco(_BusLineData, _BusLineType);
            }
            else
            {
                fnDrawingBusLine(_BusLineCoordList);
            }
        }
        if(flg==0){vM.MoveTo(x,y,true);}
    };
    //地图移动
    vM.onMapMoveEnd = function(x,y,flg){
        if(flg==0){vMe.MoveTo(x,y,true);}
    };   
    //测距结束 
    vM.onScaleEnd = function(dis){
        fnShowScaleResult(dis);
    };
    //地图双击事件
    vM.onMapDblClick = function(e){
        if (!_IsBeginScale){
            if (vM.Zoom() >0){
                vM.MoveTo(vM.PointerX(),vM.PointerY());
                vMe.MoveTo(vM.PointerX(),vM.PointerY());
                vM.FlatZoom(0);
            }
            else{
                vM.MoveTo(vM.PointerX(),vM.PointerY(),true);
                vMe.MoveTo(vM.PointerX(),vM.PointerY(),true);
            }
        }
        _IsBeginScale = false; 
    };
    vM.onMapMouseUp = function(e){
        if (_IsBeginSelectMark){
           _Mark.Add(vM.PointerX(),vM.PointerY(),'');
        }
        if(_IsBeginSelectEAddress){
            _EAddress.Add(vM.PointerX(),vM.PointerY(),'','');
        }
        if(_IsBeginMarkEAddress){
            _MarkEAddress.Add(vM.PointerX(),vM.PointerY(),'','');
        }
    };
    if (window.addEventListener) {
        vM.Body.document.addEventListener('keypress', function(e) { fnKeyup(e); }, true);
    } else {
        vM.Body.document.attachEvent('onkeyup', function() {
            fnKeyup(vM.Body.event);
        }, true);
    }
    //加载扩展插件
    if (typeof _PluginList != 'undefined')
    {
        for (var i=0; i<_PluginList.length; i++)
        {
            if (typeof _PluginList[i].Init == 'function')
            {
                _PluginList[i].Init();
            }
        }
    }

    ENetwork.DownloadScript('http://www.google-analytics.com/ga.js',function(){
        if(typeof _gat != 'undefined'){
            pageTracker = _gat._getTracker(GlobalConfig.GoogleID);
            pageTracker._initData();
            pageTracker._trackPageview();
        }
    });
}
function fnKeyup(evt) {
    if (vM == null) {
        return;
    }
    var moveStepPixel = 256;
    var evt = window.event ? window.event : evt;
    var iMapCenterX = vM.CenterX();
    var iMapCenterY = vM.CenterY();
    switch (evt.keyCode) {
        case 37:
            MoveTo(iMapCenterX - vM.GetMapPos(moveStepPixel), iMapCenterY, true);
            break;
        case 38:
            MoveTo(iMapCenterX, iMapCenterY - vM.GetMapPos(moveStepPixel), true);
            break;
        case 39:
            MoveTo(iMapCenterX + vM.GetMapPos(moveStepPixel), iMapCenterY, true);
            break;
        case 40:
            MoveTo(iMapCenterX, iMapCenterY + vM.GetMapPos(moveStepPixel), true);
            break;
    }
}
function fnShowScaleResult(dis){
    fnShowMessageBox('测距', '<div class="P">本次测距总长：<strong id="distance">'+dis+'</strong>。</div><div class="P">以上数据仅供参考，请以实际长度为准。</div>');
}
//初始化Pop广告和搜索广告
function fnInitPicAD(){
//    var sADUrl = GlobalConfig.EDataCenterUrl + 'Ad/ImageAd.aspx?domain='+GlobalConfig.Domain+'&l='+GlobalConfig.Language;
//    ENetwork.DownloadScript(sADUrl,function(){
//        if(typeof _StaticAd =='undefined'){ 
//            return false;
//        }
//        else{
//            return true;
//        }
//    });
    //判断是否来源Pop广告
    var C_ID = fnRequest('cid');
    var O_ID = fnRequest('oid');
    if (/.+?\?\d+$/gi.test(window.document.location.href)){
        O_ID = window.document.location.href.replace(/^.+?\?/gi, '');
    }
    if((C_ID!=''|| O_ID!='')&&(C_ID*1>0||O_ID*1>0)){
        if(document.referrer!=''){
            window.__IsSourceAD = true; //是否是来源定位
        }
    }
}
//显示纠错 flag:0-实体 1-企业
function fnShowDebugControl(x, y, id, name, flag){
    if (!_DebugControl){
        _DebugControl = new DebugControl(vM.Body.document);
        _DebugControl.ID = vM.appendEntity(_DebugControl.Body, _PopLayer, false, x, y, 300, 240, 0, 38, false);
        _DebugControl.Width = 300;
        _DebugControl.Height = 245;
        _DebugControl.ResumeLayout();
        _DebugControl.Debug(id, name, flag, x, y);
    }
    else{
        vM.moveEntity(_DebugControl.ID, x, y);
        _DebugControl.Show();
        _DebugControl.Debug(id, name, flag, x, y);
    }
}
//隐藏纠错控件
function fnHideDebugControl(){
    _DebugControl.Hide();
}
function fnAddMarkCss()
{
    var MarkCss=vM.$C('link');
    MarkCss.rel='stylesheet';
    MarkCss.type = 'text/css';
    MarkCss.href=GlobalConfig.SkinPath+'Css/Mark.css';
    vM.Body.document.getElementsByTagName('head')[0].appendChild(MarkCss);
}
//初始化选项卡
function fnInitTabControl()
{
    if(!_TabControl)
    {
        var HeadContainer = $('HeadContainer');
        var BodyContainer = $('BodyContainer');
        var LeftBtn = $('LeftBtn');
        var RightBtn = $('RightBtn');
        _TabControl = new TabControl(HeadContainer,BodyContainer,LeftBtn,RightBtn);
    }
}
//初始化Pop
function fnInitPopControl()
{
    //初始化实体Pop
    if(!_EntityPopControl)
    {
        _EntityPopControl = new EntityPopControl(vM.Body.document);
        _EntityPopControl.ID = vM.appendEntity(_EntityPopControl.Body, _PopLayer, false, 0, 0, 352,210,0,121, false);
        _EntityPopControl.onLoadComplete  = function(){
            fnGetPositionByOID();
            //绑定实体点击事件
            vM.onSpotClick = function(spot){
                if (!_IsBeginSelectMark){
                   fnShowEntityPop(spot.ID,spot.CenterX*1,spot.CenterY*1);
                }
            };
            vM.onSpotLabelClick = function(spot){
                if (!_IsBeginSelectMark){
                    fnShowEntityPop(spot.ID,spot.CenterX*1,spot.CenterY*1);
                }
            };
            vM.onSignClick = function(sign){
                switch (sign.SortKey){
                    case 'bus':
                        fnShowBusStation(sign.ID,sign.Title,vM.PointerX(),vM.PointerY());
                        break;
                    case 'vir':
                        window.open(GlobalConfig.WebRootPath + 'Vir/Vir.aspx?Image=' + escape(sign.Url), 'vir', 'width=520,height=400');
                        break;
                }
            };
            vM.onContextMenuClick = function(key,wx,wy,mx,my,spot){
                switch (key){
                    case 'spot':
                        if(spot){
                            fnShowEntityPop(spot.ID, spot.CenterX, spot.CenterY);
                        }
                        break;
                    case 'center':
                        vM.MoveTo(mx,my,true);
                        break;
                    case 'zoomout':
                        vM.FlatZoom(vM.Zoom()+1);
                        break;
                    case 'zoomin':
                        vM.FlatZoom(vM.Zoom()-1);
                        break;
                    case 'start':
                        if (spot){
                            fnShowFromHereSearch(spot.Title);
                        }
                        else{
                            fnShowFromHereSearch('');
                        }
                        break;
                    case 'end':
                        if (spot){
                            fnShowToHereSearch(spot.Title);
                        }
                        else{
                            fnShowToHereSearch('');
                        }
                        break;    
                    case 'cirbus':
                        if (spot){
                            fnShowPeripheralBus(spot.CenterX, spot.CenterY,spot.Title);
                        }
                        else
                        {
                            fnShowPeripheralBus(vM.PointerX(), vM.PointerY(),'');
                        }
                        break;  
                    case 'cirsearch':
                        if (spot){
                            fnShowPeripheralSearch(spot.CenterX, spot.CenterY, spot.Title);
                        }
                        else
                        {
                            fnShowPeripheralSearch(vM.PointerX(), vM.PointerY(),'');
                        }
                        break; 
                    case 'errors':
                        if (spot){
                            fnShowDebugControl(vM.PointerX(),vM.PointerY(), spot.ID, spot.Title, 0);
                        }
                        else{
                            fnShowDebugControl(vM.PointerX(),vM.PointerY(), 0, '', 2);
                        }    
                        break;    
                    case 'sign':
                        fnCreateEAddress();
                        parent.__CreateEAddressFromRightMouseDown = true;
                        if (spot){
                            _EAddress.Add(vM.PointerX(),vM.PointerY(),spot.Title,'');
                        }
                        else{
                            _EAddress.Add(vM.PointerX(),vM.PointerY(),'','');
                        }
                        break; 
                    case 'about':
                        fnShowMessageBox('关于eCityMap…','阿拉丁信息科技有限公司<br />http://www.edushi.com ');
                        break;
                }
            }
        };
        _EntityPopControl.onCavil = function(x,y,id,name){
            //重写纠错事件
            fnShowDebugControl(x*1, y*1, id, name, 0);
        };
        _EntityPopControl.onCompanyList = function(oid, ocname){
            fnOpenTab();
            var tab = new TabControl.Tab(document,'companyList',ocname,GlobalConfig.SkinPath+'Fundation/CompanyList.html?ocname='+escape(ocname)+'&oid='+ oid,true,true,80);
            fnAddTab(tab);            
        };
        _EntityPopControl.onBusTransfer = function(x,y,name){
            fnShowBusTransfer(x, y, name);
        };
        _EntityPopControl.onNearBySearch = function(x,y,oname){
            fnShowPeripheralSearch(x, y, oname);             
        };
        _EntityPopControl.onNearByBus = function(x,y,oname){
            fnShowPeripheralBus(x, y, oname);
        }
    }
    //初始化企业POP
    if(!_CompanyPopControl)
    {
        _CompanyPopControl = new CompanyPopControl(vM.Body.document);
        _CompanyPopControl.ID = vM.appendEntity(_CompanyPopControl.Body, _PopLayer, false, 0, 0, 352,210,0,121, false);
        _CompanyPopControl.onLoadComplete  = function(){
            //加载完调用企业Pop定位方法
           fnGetPositionByCID();
        };
        _CompanyPopControl.onCavil = function(x,y,id,name){
            //重写纠错事件
            fnShowDebugControl(x*1, y*1, id, name, 1);
        };
        _CompanyPopControl.onBusTransfer = function(x,y,oname){
            fnShowBusTransfer(x, y, oname); 
        };
        _CompanyPopControl.onNearBySearch = function(x,y,oname){
            fnShowPeripheralSearch(x, y, oname);
        };
        _CompanyPopControl.onNearByBus = function(x,y,oname){
            fnShowPeripheralBus(x, y, oname);
        }
    }
    if(!_ThemePopControl)
    {
        _ThemePopControl = new ThemePopControl(vM.Body.document);
        _ThemePopControl.ID = vM.appendEntity(_ThemePopControl.Body, _PopLayer, false, 0, 0, 352,210,0,121, false);
        _ThemePopControl.onLoadComplete  = function(){
            fnGetPositionByTID();
        };
        _ThemePopControl.onCavil = function(x,y,id,name){
            fnShowDebugControl(x*1, y*1, id, name,1);
        };
        _ThemePopControl.onBusTransfer = function(x,y,oname){
            fnShowBusTransfer(x, y, oname);           
        };
        _ThemePopControl.onNearBySearch = function(x,y,oname){
            fnShowPeripheralSearch(x, y, oname); 
        };
        _ThemePopControl.onNearByBus = function(x,y,oname){
            fnShowPeripheralBus(x, y, oname);       
        }
    }
    if(!_CommendPopControl){
        _CommendPopControl = new CommendPopControl(vM.Body.document);
        _CommendPopControl.ID = vM.appendEntity(_CommendPopControl.Body, _PopLayer, false, 0, 0, 352,210,0,121, false);
    }
}
function fnOpenTab()
{
    if(_MapFullScreenState){
        fnFullScreen($('aFullScrenn'));
        if(!_MapExpandingState){
            fnExpanding($('imgExpanding'));
        }
    }
    else{
        if(!_MapExpandingState){
            fnExpanding($('imgExpanding'));
        }
    }
}
function fnShowFromHereSearch(oname)
{
    fnOpenTab();
    var tab = new TabControl.Tab(document,'PeripheralBus','从这里出发',GlobalConfig.SkinPath+'Fundation/FromHereStart.html?oname=' + escape(oname) + '&x=' + vM.PointerX() + '&y=' + vM.PointerY(),true,true,80);
    fnAddTab(tab);
}
function fnShowToHereSearch(oname){
    fnOpenTab();
    var tab = new TabControl.Tab(document,'PeripheralBus','如何到达这里',GlobalConfig.SkinPath+'Fundation/ToHereSearch.html?oname=' + escape(oname) + '&x=' + vM.PointerX() + '&y=' + vM.PointerY(),true,true,80);
    fnAddTab(tab);
}
function fnShowBusTransfer(x, y, oname)
{
    fnOpenTab();
    var tab = new TabControl.Tab(document,'busTransferSearch','公交换乘',GlobalConfig.SkinPath+'Fundation/BusTransfer.html?oname=' + escape(oname) + '&x=' + x + '&y=' + y,true,true,80);
    fnAddTab(tab); 
}
function fnShowPeripheralBus(x, y, oname)
{
    fnOpenTab();
    var tab = new TabControl.Tab(document,'PeripheralBus','周边公交',GlobalConfig.SkinPath+'Fundation/PeripheralBus.html?oname=' + escape(oname) + '&x=' + x + '&y=' + y,true,true,80);
    fnAddTab(tab);
}
function fnShowPeripheralSearch(x, y, oname)
{
    fnOpenTab();
    var tab = new TabControl.Tab(document,'nearBySearch','查找周边',GlobalConfig.SkinPath+'Fundation/NearBySearch.html?oname=' + escape(oname) + '&x=' + x + '&y=' + y,true,true,80);
    fnAddTab(tab);     
}
//泡泡周边搜索
function fnNearbySearch(sKeyword,x,y,nArea)
{
    var tab = new TabControl.Tab(document,'FromHereSearch',sKeyword,GlobalConfig.SkinPath+'Fundation/LocalSearch.html?type=4&keyword1='+escape(sKeyword)+'&x='+x+'&y='+y+'&len='+nArea,true,true,80);
    fnAddTab(tab); 
}
//搜索结果点击调用的方法，判断是实体还是企业后调用不同的Pop
function fnShowSearchPop(oid,cid,lstid,x,y)
{
    if(cid*1>0){
        fnShowCompanyPop(cid,x,y);
    }
    else{
        fnShowEntityPop(oid,x,y);
    }
}
//显示实体POP
function fnShowEntityPop(id,x,y)
{
    MoveTo(x*1  + vM.GetMapPos(170), y*1, true);
    vM.moveEntity(_EntityPopControl.ID, x*1, y*1);
    _EntityPopControl.ShowPop(id); 
}
//显示企业Pop
function fnShowCompanyPop(id,x,y)
{
    MoveTo(x*1  + vM.GetMapPos(170), y*1, true);
    vM.moveEntity(_CompanyPopControl.ID, x*1, y*1);
    _CompanyPopControl.ShowPop(id); 
}
//显示主题Pop
function fnShowThemePop(id,x,y)
{
    MoveTo(x*1  + vM.GetMapPos(170), y*1, true);
    vM.moveEntity(_ThemePopControl.ID, x*1, y*1);
    _ThemePopControl.ShowPop(id); 
}
//显示推荐Pop根据主题ID
function ShowCommendPopById(id,x,y)
{
    MoveTo(x*1  + vM.GetMapPos(170), y*1, true);
    vM.moveEntity(_CommendPopControl.ID, x*1, y*1);
    _CommendPopControl.ShowPop(id);
}
//显示推荐Pop根据主题标题和内容
function ShowCommendPopByContent(title,content,x,y)
{
    MoveTo(x*1  + vM.GetMapPos(170), y*1, true);
    vM.moveEntity(_CommendPopControl.ID, x*1, y*1);
    _CommendPopControl.ShowPopData(x,y,title,content);
}
//初始化赞助商(新闻)选项卡
function fnLoadNewsList()
{
    var url = GlobalConfig.EDataCenterUrl + 'CommMap5.0/ad.aspx?domain='+GlobalConfig.Domain+'&l='+GlobalConfig.Language+'&req=1';
    ENetwork.DownloadScript(url,function(){
        if(typeof _News=='undefined') return false;
        var t=''; 
        for(i=0;i<_News.ScrollAd.length;i++){
            t+='<tr><td onclick="fnLoadNewsById('+_News.ScrollAd[i].MDI_ID+',\''+_News.ScrollAd[i].MDI_Title+'\');" style="cursor:pointer">'+_News.ScrollAd[i].MDI_Title+'</td></tr>';
            //判断是否默认激活的
            if (_News.ScrollAd[i].MDI_AutoActive == 1)
            {
                fnLoadNewsById(_News.ScrollAd[i].MDI_ID,_News.ScrollAd[i].MDI_Title);
            }
        }
        //$('divNews').innerHTML='<table id="newstr" style="border-collapse:collapse;line-height:16px; color:#000;" cellpadding="0">'+t+'</table>';
        //objup = new CBoardExhibition("objup", "divNews", 3, true, "up", 0, 2000);
        //objup.ShowMsg();
        fnUrlParse();   //Url定位
    });    
}
function fnLoadNewsById(id, title)
{
    if(!title)
    {
        title = '广告';
    }
    var tab = new TabControl.Tab(document,'news',title,GlobalConfig.SkinPath+'Fundation/News.html?id='+id,true,true,80);
    fnAddTab(tab);
}
//下载常用位置
function fnLoadCommonGoTo()
{
    var url=GlobalConfig.EDataCenterUrl + 'Commmap5.0/QuickLink.aspx?domain='+GlobalConfig.Domain+'&l='+GlobalConfig.Language;
    ENetwork.DownloadScript(url,
        function(){
            if(typeof QuickLinkList == 'undefined') return false;           
            var lastType = -1;
            var sHtml;
            sHtml = '<ul>';             
            for (var i=0; i< QuickLinkList.length; i++)
            {                
                if(lastType != -1 && QuickLinkList[i].Type != lastType)
                { 
                    sHtml += '</ul><div class="Hr"></div><ul><li><a href="javascript:fnCommonGoToClick(QuickLinkList['+i+']);">'+QuickLinkList[i].Title+'</a></li>';
                }
                else
                {
                    sHtml += '<li><a href="javascript:fnCommonGoToClick(QuickLinkList['+i+']);">'+QuickLinkList[i].Title+'</a></li>';
                }
                lastType = QuickLinkList[i].Type;                                 
            }
            sHtml += '</ul>';
            $('divQuickLinkList').innerHTML = sHtml;                  
        }
     );
}
function fnCommonGoToClick(QuickLink)
{
    if (QuickLink.Flag == 0){        
        vM.MoveTo(QuickLink.x, QuickLink.y);
    }
    else if (QuickLink.Flag == 1){
        fnShowEntityPop(QuickLink.OwnerID, QuickLink.x, QuickLink.y);
    }
    else if (QuickLink.Flag == 2){
        fnShowCompanyPop(QuickLink.CompanyID, QuickLink.x, QuickLink.y);
    }
}          
//下载热门关键字
function fnLoadHotKey(){
    var url= GlobalConfig.EDataCenterUrl + 'CommMap5.0/ad.aspx?domain='+GlobalConfig.Domain+'&l='+GlobalConfig.Language+'&req=4';//这里已经同时初始化好了周边搜索关键字
    ENetwork.DownloadScript(url, function()
    {        
        if(typeof _SearchHotkey == 'undefined') return false;
        var sHtml = '';
        var arrHotkey = _SearchHotkey.HotKeyWords;
        for(var i=0; i<arrHotkey.length;i++)
        {
            sHtml+='<a href="javascript:fnMapSearchByHotkey(\''+arrHotkey[i].MKW_Name+'\');">'+arrHotkey[i].MKW_Name+'</a>&nbsp;';
        }
        $('MapHotKeywords').innerHTML = sHtml;
        sHtml = '';
        var arrEShopHotkey = _SearchHotkey.HotKeyWords;
        for(var i=0; i<arrEShopHotkey.length;i++)
        {
            sHtml+='<a href="javascript:fnEShopSearch(\''+arrEShopHotkey[i].MKW_Name+'\');">'+arrEShopHotkey[i].MKW_Name+'</a>&nbsp;';
        }
        $('EShopHotKeyWords').innerHTML = sHtml;
    });
}
//主题面板
var _ClassTypeNum=1;
function fnLoadThemeMapsTypeList(){    
    var url= GlobalConfig.EDataCenterUrl + 'CommMap5.0/ThemeMaps.aspx?domain='+GlobalConfig.Domain+'&l='+GlobalConfig.Language+'&req=1';
    ENetwork.DownloadScript(url,function(){
        if(typeof _ThemeMaps =='undefined'){return false};
        var t='';
        for(i=0;i<=_ThemeMaps.ThemeTypeList.length-1;i++){      //杭州主题地图按时间倒序排
            var sCommonIcon = GlobalConfig.PicUrl + 'cn/'+GlobalConfig.CityCode+'/'+GlobalConfig.Language+'/themeImages/'+_ThemeMaps.ThemeTypeList[i].BCT_TypeICO;
            var sFocusIcon = GlobalConfig.PicUrl + 'cn/'+GlobalConfig.CityCode+'/'+GlobalConfig.Language+'/themeImages/'+_ThemeMaps.ThemeTypeList[i].BCT_TypeNoICO;
            t+= '<li style="background:url(' + sCommonIcon + ') left top no-repeat;" onmouseover="this.style.backgroundImage=\'url('+ sFocusIcon + ')\';" onmouseout="this.style.backgroundImage=\'url(' +sCommonIcon + ')\';"><a onfocus="this.blur()" href="javascript:fnLoadThemeMapListByTypeId(' + _ThemeMaps.ThemeTypeList[i].BCT_ID + ', \'' + _ThemeMaps.ThemeTypeList[i].BCT_TypeName + '\');">' + _ThemeMaps.ThemeTypeList[i].BCT_TypeName + '</a></li>';
        }
        $('ulThemeList').innerHTML = t;
        fnInitThemeScroll();
    });
}
//显示某个特定主题分类
function fnLoadThemeMapListByTypeId(Tid,Tname){
    fnOpenTab();
    tab = new TabControl.Tab(document,'themeMap',Tname,GlobalConfig.SkinPath+'Fundation/ThemeMap.html?classid='+Tid+'&key='+ escape(Tname),true,true,80);
    fnAddTab(tab);
}
//触发选项卡里的Iframe onresize事件
function fnAttachIframeResize()
{
    if(typeof _TabControl != 'undefined')
    {
        for(var i=0; i<_TabControl.TabList.length; i++)
        {
            _TabControl.TabList[i].TabBody.style.height = _TabControl.TabList[i].TabBody.parentNode.style.height;
            _TabControl.TabList[i].resize();
        }
    }
}
//重写窗口缩放事件
window.onresize=function(){    
    var h = fnGetWindowHeight(),w = fnGetWindowWidth(); 
    if($('divDialog'))
    {
        $('divDialog').style.top = (h-120)/2 + 'px';
        $('divDialog').style.left = (w-300)/2 + 'px';
    }    
    if($('divDialogBg'))
    {
        $('divDialogBg').style.height = h + 'px';
        $('divDialogBg').style.width = w + 'px';
    }
    if($('divLoginDialog'))
    {
        $('divLoginDialog').style.top = (h-120)/2 + 'px';
        $('divLoginDialog').style.left = (w-300)/2 + 'px';
    }
    if(h<450||w<750)
    {
        h=450;
        w=750;
        document.body.style.width='750px';
        document.body.style.height = '450px';
    }
    else
    {
        document.body.style.width= w+'px';
        document.body.style.height = h+ 'px';
    }   
    if(_MapFullScreenState)
    {
        $('Header').style.display='none';
        $('Navigation').style.display = 'none';
        $('EdushiMap').style.top='0px';
        $('Content').style.marginRight = '0px';
        $('Content').style.width = w + 'px';        
        $('EdushiMap').style.width = w + 'px';
        $('EdushiMap').style.height= h-25 + 'px';    
        $('DetailMap').style.width = w + 'px';
        $('DetailMap').style.height= h-25 + 'px';
        $('Wrapper').style.width = w + 'px';
        $('Wrapper').style.height= h-25 + 'px';
        vEdushiMap.MapHeight(h-25);
        vEdushiMap.MapWidth(w);
    }
    else
    {        
        $('Header').style.display='block';
        $('Navigation').style.display = 'block';         
        if(_MapExpandingState)
        {
            $('NavContent').style.display = 'block';
            $('Content').style.marginRight = '340px';
            $('Content').style.width = w-340 + 'px';
            $('Navigation').style.marginLeft = '-340px';
            $('Navigation').style.width = '340px';
            $('EdushiMap').style.width = w-342 + 'px';
            $('DetailMap').style.width = w-342 + 'px';
            
            vM.MapWidth(w-342);            
        }
        else
        {
            $('NavContent').style.display = 'none';
            $('Content').style.marginRight = '11px';
            $('Content').style.width = w-11 + 'px';
            $('Navigation').style.marginLeft = '-13px';
            $('Navigation').style.width = '13px';
            $('EdushiMap').style.width = w-13 + 'px';
            $('DetailMap').style.width = w-13 + 'px';
            vM.MapWidth(w-13);  
        }   
        var iShrinkDHHeight = h-51;
        var iShrinkDHPaddingTop = (iShrinkDHHeight - 105)/2;
        $('ShrinkDH').style.paddingTop = iShrinkDHPaddingTop + 'px';
        $('ShrinkDH').style.height = (h-50-iShrinkDHPaddingTop) + 'px';
        $('NavContent').style.height = (h-59) + 'px';
        $('Navigation').style.height = (h - 51) + 'px';  
        $('BodyContainer').style.height = h-203+'px';
        $('EdushiMap').style.height = h-76 + 'px';
        $('DetailMap').style.height = h-76 + 'px';
        $('Wrapper').style.height= h-76 + 'px';
        vM.MapHeight(h-76);        
    }
    //主题列表
    $('divThemeMask').style.width = (w*0.6-100) + 'px';
    $('divThemeClip').style.clip = 'rect(0px ' + (w*0.6-100) + 'px 22px 0px)';
    fnAttachIframeResize();
    fnInitThemeScroll();      
};
//添加小图标至地图与鹰眼中
function fnAppendIcon(title, x, y, text, sImgPath, sImgPath2, sFn, w, h, ew, eh, isAppendEye){
    if (sImgPath2.length == 0){
        sImgPath2 = sImgPath;
    }
    var iconHTML = '<div id="'+x+'_'+y+'" style ="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\''+sImgPath+'\',sizingMethod=\'image\');width:'+w+'px;height:'+h+'px; background-image:url('+sImgPath+')!important;background-image:none;cursor:pointer;" onclick="' + sFn + '" title="'+title+'"><span style="display:block;width:32px;line-height:33px;text-align:center;font-size:12px;font-family:\"宋体\";color:#930;">'+ text +'</span></div>';
    var p = vM.$C('div');
    p.innerHTML =iconHTML;
    vM.appendEntity(p, _IconLayer, false, x, y, w,h,ew,eh, false);
    vM.$(x+'_'+y).onmouseover = function (){
        if(document.all){
            this.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\''+sImgPath2+'\',sizingMethod=\'image\')';  
        }
        else{
            this.style.backgroundImage = null;
            this.style.backgroundImage='url(' + sImgPath2 + ')!important';
        }
    };
    vM.$(x+'_'+y).onmouseout  = function(){
        if(document.all){
            this.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\''+sImgPath+'\',sizingMethod=\'image\')';
        }
        else{  
            this.style.backgroundImage = null;
            this.style.backgroundImage='url(' + sImgPath + ')!important';
        }
    };
    if(isAppendEye){
        var pe = vMe.$C('div');
        pe.innerHTML = iconHTML;    
        vMe.appendEntity(pe, _EyeIconLayer, false, x, y, w,h,ew,eh, false);
        vMe.$(x+'_'+y).onmouseover = function (){
            if(document.all){
                this.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\''+sImgPath2+'\',sizingMethod=\'image\')';
            }
            else{  
                this.style.backgroundImage = null;
                this.style.backgroundImage="url(" + sImgPath2 + ")!important";
            }
        };
        vMe.$(x+'_'+y).onmouseout  = function(){
            if(document.all){
                this.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\''+sImgPath+'\',sizingMethod=\'image\')';  
            }
            else{
                this.style.backgroundImage = null;
                this.style.backgroundImage='url(' + sImgPath + ')!important';
            }
        }   
    } 
}
/*************登录部分*********************/
function fnShowLogin(logincallback)
{    
    if(logincallback)
    {
       _LoginCallback = logincallback; 
    }
    else
    {
        _LoginCallback = null;
    }
    var h=fnGetWindowHeight();
	var w=fnGetWindowWidth();
	if(!$('divDialogBg')){
	    var div = $C('div');
	    div.id = 'divDialogBg';
	    div.style.backgroundColor = 'black';
	    div.style.position = 'absolute';
	    div.style.visibility = 'visible';
	    div.style.filter = 'alpha(opacity=50)';
	    div.style.opacity = '.50';
	    div.style.zIndex = 100001;
	    div.style.left = 0;
	    div.style.top = 0;
	    div.style.width = w+'px';
	    div.style.height= h+'px';
	    document.body.appendChild(div);
	}
	if(!$('divLoginDialog')){
	    var divLogin = $C('div');
	    divLogin.id = 'divLoginDialog';
	    divLogin.style.left = (w/2 -150)+'px';
	    divLogin.style.top = (h/2 -60)+'px';
	    divLogin.style.position = 'absolute';
	    divLogin.style.zIndex = 100002;	
	    divLogin.style.width = '300px';
	    divLogin.style.height= 'auto';
	    var loginHtml = '<div class="LoginNavT"></div><div class="LoginNavD"><h3>用户登录</h3><table border="0" cellpadding="0" cellspacing="0"><tr><th>用户名：</th><td><input class="InFieldSty" onfocus="this.className=\'ThisStyle\';" onblur="this.className=\'InFieldSty\';" style="width:160px;" type="text" id="txtUserName"/></td></tr><tr><th>密码：</th><td><input class="InFieldSty" onfocus="this.className=\'ThisStyle\';" onblur="this.className=\'InFieldSty\';" style="width:160px;" type="password" id="txtPassword"/></td></tr><tr><th>验证码：</th><td><span><input onfocus="this.className=\'ThisStyle\';" onblur="this.className=\'InFieldSty\';" class="InFieldSty" style="width:67px;" type="text" id="txtVerifyCode"/></span><span style="padding-top:1px"><img id="imgVerifyCode" style="cursor:pointer" alt="单击获取新验证码" /></span></td></tr><tr><th>&nbsp;</th><td><span><input id="chkInvalidate" type="checkbox" name="chkInvalidate" /></span><span><label for="chkInvalidate">下次记住密码</label></span></td></tr><tr><th>&nbsp;</th><td><input type="image" src="/Skins/zh-chs/Default/Images/LoginBtn1.gif" onclick="fnLogin()" />&nbsp;&nbsp;<img src="/Skins/zh-chs/Default/Images/RegBtn1.gif" alt="注册" style="cursor:pointer;" onclick="window.open(\''+GlobalConfig.UserCenterUrl+'Register.aspx\',\'_blank\')" /></td></tr></table><div class="LoginClew" id="divLoginResultMsg"></div></div><div style="position:absolute; top:12px; right:8px; cursor:hand; width:13px; height:13px; overflow:hidden;background:url(/Skins/zh-chs/Default/Images/CloseBtn.gif) no-repeat left top;" onclick="javascript:$(\'divDialogBg\').style.display=\'none\';$(\'divLoginDialog\').style.display=\'none\';" onmouseover="this.style.backgroundPosition=\'left -13px\'"onmouseout="this.style.backgroundPosition=\'left top\'" title="关闭窗口"></div></div>';
	    document.body.appendChild(divLogin);
	    //IE6的延时加载
	    setTimeout(function(){$('divLoginDialog').innerHTML=loginHtml;},1);
	}
    setTimeout(function(){
        $('imgVerifyCode').src = GlobalConfig.WebRootPath+'VerifyImage.aspx?rnd='+$Rnd(); 
        $('divLoginResultMsg').style.display = 'none';
        $('divDialogBg').style.display = 'block';
        $('divLoginDialog').style.display = 'block';
        $('imgVerifyCode').onclick = function(){this.src = GlobalConfig.WebRootPath+'VerifyImage.aspx?rnd='+$Rnd();};
        $('txtUserName').focus();
    },10);
}
function fnLogin()
{
    var sUserName = $('txtUserName').value.trim();
    var sPassword = $('txtPassword').value.trim();
    var sVerifyCode = $('txtVerifyCode').value.trim();
    var isInvalidate= $('chkInvalidate').checked;
    $('txtUserName').value = '';
    $('txtPassword').value = '';
    $('txtVerifyCode').value = '';
    $('chkInvalidate').checked = false;
    if(sUserName.length < 1 || sPassword.length < 1){
        $('divLoginResultMsg').style.display = 'block';
        $('divLoginResultMsg').innerHTML = '用户名或者密码不能为空！';
        return;
    }    
    var sLoginUrl = GlobalConfig.WebRootPath + 'Login.aspx?verifycode=' + sVerifyCode + '&isinvalidate=' + isInvalidate + '&action=login&rnd=' + $Rnd() + '&username=' + sUserName + '&password=' + sPassword;
    ENetwork.DownloadScript(sLoginUrl,function(){
        if(typeof __LoginResult != 'undefined'){
            if(__LoginResult == 1){
                fnLoginSuccess(__Member);
                if(_LoginCallback)
                {
                    _LoginCallback();
                    _LoginCallback = null;
                }
            }
            else if(__LoginResult == 0){
                $('divLoginResultMsg').style.display = 'block';
                $('divLoginResultMsg').innerHTML = '登录失败，用户名或者密码错误！';
                $('imgVerifyCode').src = GlobalConfig.WebRootPath+'VerifyImage.aspx?rnd='+$Rnd();
            }
            else if(__LoginResult == -1){
                $('divLoginResultMsg').style.display = 'block';
                $('divLoginResultMsg').innerHTML = '登录失败，您输入的验证码不正确！';
                $('imgVerifyCode').src = GlobalConfig.WebRootPath+'VerifyImage.aspx?rnd='+$Rnd();
            }
        }
        else{
            $('divLoginResultMsg').style.display = 'block';
            $('divLoginResultMsg').innerHTML = '登录失败！';
            $('imgVerifyCode').src = GlobalConfig.WebRootPath+'VerifyImage.aspx?rnd='+$Rnd();
        }                  
    });
}
function fnLoginSuccess(memberInfo)
{
    //xb090210移除用户中心城市$('liLoginInfo').innerHTML = '欢迎您！<span style="color:#ff6400">'+memberInfo.LM_NickName+'</span><span>[<a href="'+GlobalConfig.UserCenterUrl+'Index.aspx?City='+GlobalConfig.CityCode+'" target="_blank">我的E都市</a>]</span>&nbsp;<span>[<a href="javascript:fnLoginOut();">退出</a>]</span>';
    $('liLoginInfo').innerHTML = '欢迎您！<span style="color:#ff6400">'+memberInfo.LM_NickName+'</span><span>[<a href="'+GlobalConfig.UserCenterUrl+'Index.aspx" target="_blank">我的E都市</a>]</span>&nbsp;<span>[<a href="javascript:fnLoginOut();">退出</a>]</span>';
    $('divLoginDialog').style.display = 'none';
    fnShowMessageBox('用户登录', memberInfo.LM_NickName + ',欢迎您回来！<br />E都市推出<a href="http://zhuanti.edushi.com/diaocha/" target="_blank">问卷调查</a>，完成后送100个积分哦！');
    if(memberInfo.LM_EAddress.length > 0){
        $('lnkMyEAddress').href = 'javascript:;';
        $('lnkMyEAddress').setAttribute('onmouseover', 'javascript:fnShowMyEAddress();');
        $('lnkMyEAddress').setAttribute('onmouseout','javascript:fnShowMyEAddress();');
        $('lnkMyEAddress').onmouseover = function(){fnShowMyEAddress();};
        $('lnkMyEAddress').onmouseout = function(){fnShowMyEAddress();};
        $('lnkMyEAddress').target = '_self';
        $('txtMyEAddress').value = 'http://'+GlobalConfig.Domain+'/'+memberInfo.LM_EAddress;
        $('lnkMyEAddress').title = '我的E地址';
    }
    else{
        $('lnkMyEAddress').setAttribute('onmouseover', '');
        $('lnkMyEAddress').setAttribute('onmouseout','');
        $('lnkMyEAddress').target = '_blank';
        $('lnkMyEAddress').href = GlobalConfig.UserCenterUrl+'MyEdushi.aspx?City='+GlobalConfig.CityCode;
        $('lnkMyEAddress').title = '您还没创建过E地址，点击到我的E都市创建吧';
    }
}
function fnLoginOut()
{
    var sLoginUrl = GlobalConfig.WebRootPath + 'Login.aspx?action=loginout&rnd='+$Rnd();
    ENetwork.DownloadScript(sLoginUrl,function(){
        if(typeof __LoginResult != 'undefined'){
            if(__LoginResult == 3){
                fnLoginOutSuccess();
            }
            else{
                fnShowMessageBox('退出登录','退出登录失败'+__LoginResult);
            }
        }
        else{
            fnShowMessageBox('退出登录','退出登录失败');
        }
    });
}
function fnLoginOutSuccess()
{
    $('liLoginInfo').innerHTML = '欢迎您！&nbsp;<span>[<a href="'+GlobalConfig.UserCenterUrl+'Register.aspx" target="_blank">注册</a>]</span>&nbsp;<span>[<a href="javascript:;" onclick="fnShowLogin()">登录</a>]</span>';
    $('lnkMyEAddress').setAttribute('onmouseover', '');
    $('lnkMyEAddress').setAttribute('onmouseout','');
    $('lnkMyEAddress').target = '_blank';
    $('lnkMyEAddress').href = GlobalConfig.UserCenterUrl+'MyEdushi.aspx?City='+GlobalConfig.CityCode;
    $('lnkMyEAddress').title = '我的E地址，登录后显示';
    //fnShowMessageBox('退出登录','您已经成功退出');
}
//公交换乘搜索 type 1:从这里出发，2到这里
function fnBusTransferSearch(type, x, y, keyword)
{
    if(keyword != '请输入终点' && type==1 || keyword !='请输入起点' && type ==2)
    {
        tab = new TabControl.Tab(document,'search',keyword,GlobalConfig.SkinPath+'Fundation/BusTransferSearch.html?action='+type+'&x='+x+'&y='+y+'&key='+ escape(keyword),true,true,80);
        fnAddTab(tab);
    }
}
//搜索选项切换
function fnSearchChange(oThis)
{ 
    __EdushiSuggest.Hide();   
    switch(oThis.id)
    {         
        case 'liMapSearch':
            $('MapSearch').style.display = 'block';
            $('BusSearch').style.display = 'none';
            $('EShopSearch').style.display = 'none';
            $('EAddress').style.display = 'none';
            oThis.className = 'Current';
            $('liBusSearch').className = '';            
            $('liEShopSearch').className = ''; 
            $('liEAddress').className = '';            
            break;
        case 'liBusSearch':
            $('liEShopSearch').className = '';
            $('liMapSearch').className = '';
            oThis.className = 'Current';
            $('liEAddress').className = '';
            $('BusSearch').style.display = 'block';            
            $('MapSearch').style.display = 'none';           
            $('EShopSearch').style.display = 'none';
            $('EAddress').style.display = 'none';
            break;
        case 'liEShopSearch': 
            $('EShopSearch').style.display = 'block';            
            $('MapSearch').style.display = 'none';            
            $('BusSearch').style.display = 'none';
            $('EAddress').style.display = 'none';
            oThis.className = 'Current';
            $('liMapSearch').className = '';
            $('liBusSearch').className = '';
            $('liEAddress').className = '';
            break;
        case 'liEAddress':
            $('liEShopSearch').className = '';
            $('liBusSearch').className = '';
            $('liMapSearch').className = '';
            oThis.className = 'Current';
            $('EAddress').style.display = 'block';            
            $('MapSearch').style.display = 'none';           
            $('EShopSearch').style.display = 'none';
            $('BusSearch').style.display = 'none';
            fnNewEAddressList();
            break;
    }
    oThis.className = 'Current';
}  
//公交搜索切换
function fnBusSearchChange(sValue)
{
    __EdushiSuggest.Hide();
    switch (sValue)
    {        
        case '0':           
            $('BusTransfer').style.display='block';
            $('BusLine').style.display='none';
            $('BusStation').style.display='none';
            break;
        case '1':
            $('BusLine').style.display='block';
            $('BusTransfer').style.display='none';
            $('BusStation').style.display='none';
            break;
        case '2':
            $('BusStation').style.display='block';
            $('BusLine').style.display='none';
            $('BusTransfer').style.display='none';
            break;
    }
}
//地图搜索|公交搜索|E店搜索Suggest
function fnKeySearchSuggest(fn, input, x, y, w, type, reqtype, evt){
    if(input.value.trim().length < 1)
    {
        __EdushiSuggest.Hide();
        input.focus();
        return;
    }
    evt = window.event ? window.event : evt;
    var maptype;//地图|E店搜索类型
    if(reqtype != 0)
    {
        maptype = reqtype;
    }
    else
    {
        var iMapSearchType = GetRadioValue('MapSearchType'); 
        switch(iMapSearchType)
        {
            case '0':
                maptype = 2;    //模糊搜索
                break;
            case '1':
                maptype = 3;    //名称搜索
                break;
            case '2':
                maptype = 4;    //地址搜索
                break;
        }        
    }
    fnKeyInputChanged(input, evt.keyCode, x, y, w, type, maptype);
    if (evt.keyCode == 13 && __EdushiSuggest.SuggestPannel.style.display != 'block'){
        eval(fn);
        __EdushiSuggest.Hide();
    }
    if (evt.stopPropagation) {
        evt.stopPropagation();
    }
    else {
        evt.cancelBubble = true;
    }
}
function fnKeyInputChanged(input, keyCode, x, y, w, type, maptype){
    if (input.value.length > 0 && input.value != __EdushiSuggest.LastKeyword && keyCode != 38 && keyCode != 40 && keyCode != 13)
    {
        if(type == 'eshop')
        {
            var url=GlobalConfig.EDataCenterUrl + 'CommMap5.0/SearchSuggest.aspx?domain='+GlobalConfig.Domain+'&l='+GlobalConfig.Language+'&req=6&address=' + escape(input.value);
            if(maptype == 1)
            {
                url=GlobalConfig.EDataCenterUrl + 'CommMap5.0/SearchSuggest.aspx?domain='+GlobalConfig.Domain+'&l='+GlobalConfig.Language+'&req=6&address='+escape($('txtSearchArea').value)+'&kw=' + escape(input.value);
            }
            ENetwork.DownloadScript(url,function(){
                if(typeof _SuggestData != 'undefined')
                {
                    __EdushiSuggest.Show(_SuggestData, x, y, w); 
                }
                else
                {
                    __EdushiSuggest.Hide();
                }                  
            });
        }
        else if (type == 'bus')
        {
            var url=GlobalConfig.EDataCenterUrl + 'CommMap5.0/StationSuggest.aspx?req=1&domain='+GlobalConfig.Domain+'&l='+GlobalConfig.Language+'&kw=' + escape(input.value);
            if(maptype == 2)
            {
                url = GlobalConfig.EDataCenterUrl + 'CommMap5.0/StationSuggest.aspx?req=2&domain='+GlobalConfig.Domain+'&l='+GlobalConfig.Language+'&kw=' + escape(input.value);
            }
            ENetwork.DownloadScript(url,function(){
                if(typeof _SuggestData != 'undefined')
                {
                    __EdushiSuggest.Show(_SuggestData, x, y, w); 
                }
                else
                {
                    __EdushiSuggest.Hide();
                }                  
            });
         }
         else if(type == 'map')
         {
            var url=GlobalConfig.EDataCenterUrl + 'CommMap5.0/SearchSuggest.aspx?domain='+GlobalConfig.Domain+'&l='+GlobalConfig.Language+'&req='+maptype+'&kw=' + escape(input.value);
            if(maptype == 5)
            {
                url=GlobalConfig.EDataCenterUrl + 'CommMap5.0/SearchSuggest.aspx?domain='+GlobalConfig.Domain+'&l='+GlobalConfig.Language+'&req='+maptype+'&address='+escape($('txtSearchPlace').value)+'&kw=' + escape(input.value);
            }
            ENetwork.DownloadScript(url,function(){
                if(typeof _SuggestData != 'undefined')
                {
                    __EdushiSuggest.Show(_SuggestData, x, y, w);
                } 
                else
                {
                    __EdushiSuggest.Hide();
                }            
            });            
         }
    }
    __EdushiSuggest.KeycodeChange(keyCode);
    __EdushiSuggest.SelectedIndexChanged = function(item){
        input.value = item.Value;
        input.focus();
        if(input.createTextRange)
        {
            var range = input.createTextRange();     
            range.collapse(true);     
            range.moveStart('character',input.value.length);     
            range.select();  
        }
        else
        {
            input.selectionStart = input.value.length;
        }  
    }
}
//地图搜索切换
function fnMapSearchChange(sValue)
{
    __EdushiSuggest.Hide();
    switch (sValue)
    {        
        case '0':            
            $('divSearch').style.display='block';
            $('divAroundSearch').style.display='none';
            break;
        case '1':            
            $('divSearch').style.display='block';
            $('divAroundSearch').style.display='none';
            break;
        case '2':
            $('divSearch').style.display='block';
            $('divAroundSearch').style.display='none';
            break;
        case '3':
            $('divSearch').style.display='none';
            $('divAroundSearch').style.display='block';
            break;
    }
} 
/*******************begin添加选项卡的函数集**********************/
//地图搜索
function fnMapSearchByHotkey(sHotkey)
{
    tab = new TabControl.Tab(document,'search',sHotkey,GlobalConfig.SkinPath+'Fundation/LocalSearch.html?type=0&keyword1='+ escape(sHotkey),true,true,80);
    fnAddTab(tab);
}
function fnMapSearch()
{    
    __EdushiSuggest.Hide();
    var sKeyword1,sKeyword2,iMapSearchType;
    var tab;
    iMapSearchType = GetRadioValue('MapSearchType'); 
    switch (iMapSearchType)
    {        
        case '0':   //模糊搜索
        case '1':   //名称搜索    
        case '2':   //地址搜索
            sKeyword1 = $('txtSearchKey').value.trim();
            if(sKeyword1.length < 1)
            {
                $('txtSearchKey').focus();
                return;
            }                     
            tab = new TabControl.Tab(document,'search',sKeyword1,GlobalConfig.SkinPath+'Fundation/LocalSearch.html?type='+iMapSearchType+'&keyword1='+ escape(sKeyword1),true,true,80);
            break;
        case '3':   //周边搜索  
            sKeyword1 = $('txtSearchPlace').value.trim();
            if(sKeyword1.length < 1){
                $('txtSearchPlace').focus();
                return;
            }
            sKeyword2 = $('txtSearchSomething').value.trim();
            if(sKeyword2.length < 1){
                $('txtSearchSomething').focus();
                return;
            }
            tab = new TabControl.Tab(document,'search',sKeyword1+sKeyword2,GlobalConfig.SkinPath+'Fundation/LocalSearch.html?type='+iMapSearchType+'&keyword1='+ escape(sKeyword1)+'&keyword2='+escape(sKeyword2),true,true,80);
            break;
    }
    fnAddTab(tab);
}
//本地地图搜索结果回调
function onSearchDataLoadComplete(data,begin,end)
{
    _IconLayer.innerHTML = '';
    _EyeIconLayer.innerHTML = '';
    for (var i=begin; i<end; i++)
    {
        fnAppendIcon(data[i].OCName,data[i].X, data[i].Y, i+1, GlobalConfig.SkinPath + 'Images/VesicleBg.png', GlobalConfig.SkinPath + 'Images/AlterVesicle.png', 'if(parent.fnShowSearchPop){parent.fnShowSearchPop('+data[i].OwnerID+', '+data[i].CompanyID+','+data[i].LST_ID+',' + data[i].X + ', ' + data[i].Y + ');}',41,33,13,27,true);
    };
}
//主题数据加载结果回调
function onThemeDataLoadComplete(data)
{
    _IconLayer.innerHTML = '';
    _EyeIconLayer.innerHTML = '';
    if(data != null)
    {
        for (var i=0; i<data.length; i++)
        {
            if (data[i].BCC_CompanyICO != '') //判断是否有主题点图片
            {
                var sThemeImage = GlobalConfig.PicUrl + 'cn/'+GlobalConfig.CityCode+'/'+GlobalConfig.Language+'/themeImages/BBLCompany/' + data[i].BCC_CompanyICO;         
                if (data[i].BCC_CompanyID*1 == 0)
                {
                    fnAppendIcon(data[i].BCC_CompanyName,data[i].X, data[i].Y, i+1, sThemeImage, '', 'if(parent.ShowCommendPopById){parent.ShowCommendPopById('+data[i].BCC_ID+', ' + data[i].X + ', ' + data[i].Y + ');}',41,33,13,27,false);
                }
                else
                {
                    fnAppendIcon(data[i].BCC_CompanyName,data[i].X, data[i].Y, i+1, sThemeImage, '', 'if(parent.fnShowThemePop){('+data[i].BCC_ID+', ' + data[i].X + ', ' + data[i].Y + ');}',41,33,13,27,false);
                }
            }
            else
            {
                var sThemeImage = GlobalConfig.SkinPath + 'Images/ThMapIco.png';
                var sThemeOverImage = GlobalConfig.SkinPath + 'Images/AlterThMapIco.png';
                if (data[i].BCC_CompanyID*1 == 0)
                {
                    fnAppendIcon(data[i].BCC_CompanyName,data[i].X, data[i].Y, i+1, sThemeImage, sThemeOverImage, 'if(parent.ShowCommendPopById){parent.ShowCommendPopById('+data[i].BCC_ID+', ' + data[i].X + ', ' + data[i].Y + ');}',41,33,13,27,false);
                }
                else
                {
                    fnAppendIcon(data[i].BCC_CompanyName,data[i].X, data[i].Y, i+1, sThemeImage, sThemeOverImage, 'if(parent.fnShowThemePop){parent.fnShowThemePop('+data[i].BCC_ID+', ' + data[i].X + ', ' + data[i].Y + ');}',41,33,13,27,false);
                }
            }
        }
    }
}
//公交搜索
function fnBusSearch()
{    
    __EdushiSuggest.Hide();
    var iBusSearchType = GetRadioValue('BusSearchType');
    switch(iBusSearchType)
    {
        case '0':   //公交换乘搜索
            var sStartStation = $('txtBusStart').value.trim();
            if(sStartStation.length < 1)
            {
                $('txtBusStart').focus();
                return;
            }
            var sEndStation = $('txtBusEnd').value.trim();
            if(sEndStation.length < 1)
            {
                $('txtBusEnd').focus();
                return;
            }
            if(sStartStation == '起点' || sEndStation == '终点')
            {
                $('txtBusStart').focus();
                return;
            }
            fnAddBusTransferSearchTab(sStartStation,sEndStation);
            break;
        case '1':   //公交线路搜索
            var sBusNo = $('txtBusLine').value.trim();
            if(sBusNo.length < 1)
            {
                $('txtBusLine').focus();
                return;
            }
            if(sBusNo == '请输入要搜索的线路')
            {
                $('txtBusLine').focus();
                return;                
            }
            fnAddBusLineSearchTab(sBusNo);
            break;
        case '2':   //公交站点搜索
            var sStationName = $('txtBusStation').value.trim();
            if(sStationName.length < 1)
            {
                $('txtBusStation').focus();
                return;
            }
            if(sStartStation == '请输入站点名')
            {
                $('txtBusStation').focus();
                return;                
            }
            fnAddBusStationSearchTab(sStationName);
            break;
    }    
}
function fnAddBusTransferSearchTab(sStartStation, sEndStation)
{
    var tab = new TabControl.Tab(document,'busTransfer',sStartStation+'→'+sEndStation,GlobalConfig.SkinPath+'Fundation/BusTransferSearch.html?s='+ escape(sStartStation)+'&e='+ escape(sEndStation) + '&action=0',true,true,80);
    fnAddTab(tab);
}
function fnAddBusLineSearchTab(sBusNo)
{
    var tab = new TabControl.Tab(document,'BusLineSearch',sBusNo,GlobalConfig.SkinPath+'Fundation/BusNoSearch.html?key='+ escape(sBusNo),true,true,80);
    fnAddTab(tab);
}
function fnAddBusStationSearchTab(sStationName)
{
    var tab = new TabControl.Tab(document,'BusStationSearch',sStationName,GlobalConfig.SkinPath+'Fundation/BusStationSearch.html?key='+ escape(sStationName),true,true,80);  
    fnAddTab(tab);
}
function fnAddTab(tab, height)
{
    if(!height)
    {
        tab.TabBody.style.height = '100%';
    }
    else
    {
        tab.TabBody.style.height = height;
    }
    _TabControl.AddTab(tab);
}
//E店搜索||黄页搜索
function fnEShopSearch(keyword)
{
    __EdushiSuggest.Hide();
    if(keyword)
    {
        var sKeyword = keyword;
    }
    else
    {
        var sKeyword = $('txtSearchEShop').value.trim();
    }
    if(sKeyword.length < 1)
    {
        $('txtSearchEShop').focus();
        return;
    }
    window.open('http://' + GlobalConfig.Domain + '/yp/KeywordSearchList.aspx?Keyword=' + escape(sKeyword), '_blank', '');
}
/*******************end添加选项卡**********************/
//初始化分类主题滚动效果
function fnInitThemeScroll()
{
    var ulThemeList = $('ulThemeList');
    var iLen = ulThemeList.childNodes.length;
    var iMaxWidth = 0;
    var iClipWidth = fnGetWindowWidth()*0.6-100;
    var iStepWidth = 5;
    var hwScroll;
    for (var i=0; i<iLen; i++)
    {
        if (ulThemeList.childNodes[i].tagName)
        {
            iMaxWidth += ulThemeList.childNodes[i].clientWidth + 10; //10像素是li的margin
        }
    }
    
    if (iMaxWidth <= iClipWidth)    //自适应浏览器分辨率
    {
        $('RollArLf').style.display = 'none';
        $('RollArRgt').style.display = 'none';
        ulThemeList.parentNode.style.left = '0px';
        return;
    }
    else
    {
        $('RollArLf').style.display = 'block';
        $('RollArRgt').style.display = 'block';
    }
    
    $('ImgThemeScrollLeft').onmouseover = function(){
        $('ImgThemeScrollLeft').style.cursor = 'pointer';
        window.clearInterval(hwScroll);
        hwScroll = setInterval(function(){
            var iLeft = ulThemeList.parentNode.style.left.replace('px', '')*1;
            if (iLeft + iStepWidth > 0)
            {
                ulThemeList.parentNode.style.left = '0px';
                window.clearInterval(hwScroll);
            }
            else
            {
                ulThemeList.parentNode.style.left = (iLeft + iStepWidth) + 'px';
            }
        }, 20);
    };
    $('ImgThemeScrollRight').onmouseover = function(){
        $('ImgThemeScrollRight').style.cursor = 'pointer';
        window.clearInterval(hwScroll);
        hwScroll = setInterval(function(){
            var iLeft = ulThemeList.parentNode.style.left.replace('px', '')*1;
            if ((iLeft*-1 + iClipWidth + iStepWidth) >= iMaxWidth)
            {
                ulThemeList.parentNode.style.left = (iClipWidth - iMaxWidth) + 'px';
                window.clearInterval(hwScroll);
            }
            else
            {
                ulThemeList.parentNode.style.left = (iLeft - iStepWidth) + 'px';
            }
        }, 20);
    };
    $('ImgThemeScrollLeft').onmouseout = function(){
        window.clearInterval(hwScroll);
    };
    $('ImgThemeScrollRight').onmouseout = function(){
        window.clearInterval(hwScroll);
    }
}

//region 页面上固定的按钮的功能
//开始标记
function fnSelectMarkPoint(){
    _Mark.Begin();   
}
function fnCreateEAddress()
{
    fnSearchChange($('liEAddress'));
    fnEAddressRegister();
}
//显示隐藏标签
function fnLabel(){
    if(vM.flgShowLabel){
        vM.flgShowLabel=false;
        vM.ViewLabels(false);
        vM.Show();
    }else{
        vM.flgShowLabel=true;
        vM.ViewLabels(true);
        vM.Show();
    }
}
//测距
function fnScale(){
    vM.Body.ScaleLine='#fcff00|2'; 
    vM.StartScale();
    _IsBeginScale = true;
}
//全屏
function fnFullScreen(obj){
    if(_MapFullScreenState)
    {
        _MapFullScreenState = false;
        obj.innerHTML = '最大化';
        obj.title = '最大化';
        obj.parentNode.className = 'Ico5'
    }
    else
    {   
        _MapFullScreenState = true;
        obj.innerHTML = '还原';
        obj.title = '还原';
        obj.parentNode.className = 'Ico6';
    }
    
    window.onresize();    
}
function fnShowCommonGoTo()
{
    if($('divQuickLink').style.display == 'block')
    {
        $('divQuickLink').style.display = 'none';
    }
    else
    {  
        $('divQuickLink').style.display = 'block';
    }
}
function fnShowMyEAddress()
{
    if($('MyEadNav').style.display == 'block')
    {
        $('MyEadNav').style.display = 'none';
    }
    else
    {  
        $('MyEadNav').style.display = 'block';
    }
}
//地图打印
function fnPrint()
{
    var iMapX = vM.CenterX();
    var iMapY = vM.CenterY();
    var iZoom = vM.Zoom();
    var iWidth = vM.MapWidth();
    var iHeight = vM.MapHeight();
    window.open('http://'+GlobalConfig.Domain+'/Print.aspx?x='+iMapX+'&y='+iMapY+'&z='+iZoom+'&w='+iWidth+'&h='+iHeight,'print');
}
//右侧搜索栏收缩展开
function fnExpanding(obj)
{   
    if(_MapExpandingState)
    {
        _MapExpandingState = false;
        obj.src = GlobalConfig.SkinPath+'Images/Expanding.gif';
    }
    else
    {
        _MapExpandingState = true;
        obj.src = GlobalConfig.SkinPath+'Images/DrawBack.gif';        
    }
    window.onresize();
}
//鹰眼收缩
function fnEyeExpanding(obj)
{
    if($('EagleMapCon').style.display=='none')
    {
        $('EagleMapCon').style.display='block';
        obj.src = GlobalConfig.SkinPath+'Images/DrawBack.gif';
        if($('EyeArrow').className == 'SmallArrow')
        {
            $('EagleMapNav').style.width='196px';
        }
        else
        {
            $('EagleMapNav').style.width = '376px';
        }
    }
    else
    {        
        $('EagleMapCon').style.display='none';
        obj.src = GlobalConfig.SkinPath+'Images/Expanding.gif'; 
        $('EagleMapNav').style.width='10px';
    }
}
//改变鹰眼地图尺寸
function fnEyeResize(obj)
{
    var w = 180;
    var h = 140;
    if(obj.className == 'SmallArrow')
    {
        obj.className = 'BigArrow';
        w = 2*w;   
        h = 2*h;        
        $('EagleMapDH').style.paddingTop = '95px';
        $('EagleMapNav').style.width='376px';
    }
    else
    {
        $('EagleMapDH').style.paddingTop = '20px';
        obj.className = 'SmallArrow';
        $('EagleMapNav').style.width='196px';
    }      
    obj.parentNode.style.width = w+ 'px';
    obj.parentNode.style.height = h + 'px';
    vMe.MapHeight(h);    
    vMe.MapWidth(w);
    vMe.Show(); 
}
//endregion 页面上固定的按钮的功能
/*路牌，地铁等开关显示 ***************************************/
function fnStation(){
    if(vM.Body.SignsVisible['bus']){
        vM.ViewSigns(false, 'bus');
        vM.Show();
    }else{
        vM.ViewSigns(true, 'bus');
        vM.Show();
    }
}
function fnRoad(){
    if(vM.Body.SignsVisible['road']){
        vM.ViewSigns(false, 'road');
        vM.Show();
    }else{
        vM.ViewSigns(true, 'road');
        vM.Show();
    }
}
function fnPack(){
    if(vM.Body.SignsVisible['park']){
        vM.ViewSigns(false, 'park');
        vM.Show();
    }else{
        vM.ViewSigns(true, 'park');
        vM.Show();
    }
}
function fnSubWay(){
    if(vM.Body.SignsVisible['subway']){
        vM.ViewSigns(false, 'subway');
        vM.Show();
    }else{
        vM.ViewSigns(true, 'subway');
        vM.Show();
    }
}
/***************************************/
//缩放条控制类
function ZoomBarClass()
{
    this.beginLevel = 1;
    this.beginTopPixel = 112;
    this.zoomStepPixel = 16;
    this.maxLevel = 4;
    this.moveStepPixel = 256;
    
    this.currentLevel = this.beginLevel;
    this.originalY = 0;
    this.originalTop = 0;
    this.zoomFlag = false;
    this.zoomBar = $('ControlUnit');
    
    //初始化缩放控件
    this.Init = function()
    {
        this.zoomBar.onmousedown = function(evt){
            evt = window.event ? window.event : evt;
            originalY = evt.clientY;
            this.originalTop = this.zoomBar.offsetTop;
            this.zoomFlag = true;
        }.bindAsEventListener(this);
        
        $('EzoomBar').onmousemove = this.zoomBar.onmousemove = function(evt){
            evt = window.event ? window.event : evt;
            var ey = evt.clientY;
            if (this.zoomFlag){
                var iTop = ey - originalY + this.originalTop;
                if (iTop < this.beginTopPixel) iTop = this.beginTopPixel;
                if (iTop > (this.beginTopPixel + this.zoomStepPixel*(this.maxLevel-1))) iTop = this.beginTopPixel + this.zoomStepPixel*(this.maxLevel-1);
                this.zoomBar.style.top = iTop + 'px';
            }
        }.bindAsEventListener(this);  
        
        $('EzoomBar').onmouseup = function(evt){
            if (this.zoomFlag){
                var z = Math.round((this.zoomBar.offsetTop - this.beginTopPixel) / this.zoomStepPixel);
                if (z > this.maxLevel-1) z = this.maxLevel-1;
                if (z < 0) z = 0;
                this.currentLevel = z;
                this.zoomBar.style.top = (this.beginTopPixel + z * this.zoomStepPixel) + 'px';
                this.zoomFlag = false;
                vM.FlatZoom(this.currentLevel);
            }
        }.bindAsEventListener(this);  
    };
    //缩放一定的"步长","步长"可以为负数
    this.ZoomWithStep = function(step){
        this.currentLevel += step;
        if (this.currentLevel > this.maxLevel-1) this.currentLevel = this.maxLevel-1;
        if (this.currentLevel < 0) this.currentLevel = 0;
        this.zoomBar.style.top = (this.beginTopPixel + this.currentLevel * this.zoomStepPixel) + 'px';
        vM.FlatZoom(this.currentLevel);
    };
    //缩放到指定的级别
    this.ZoomTo = function(level){
        this.currentLevel = level;
        this.zoomBar.style.top = (this.beginTopPixel + this.currentLevel * this.zoomStepPixel) + 'px';
        vM.FlatZoom(this.currentLevel);
    };
    this.Move = function(direction)
    {
        var iMapCenterX = vM.CenterX();
        var iMapCenterY = vM.CenterY();
        switch(direction)
        {
            case "up":
                MoveTo(iMapCenterX, iMapCenterY-vM.GetMapPos(this.moveStepPixel), true); 
                break;
            case "down":
                MoveTo(iMapCenterX, iMapCenterY+vM.GetMapPos(this.moveStepPixel), true); 
                break;
            case "left":
                MoveTo(iMapCenterX-vM.GetMapPos(this.moveStepPixel), iMapCenterY, true);  
                break; 
            case "right":
                MoveTo(iMapCenterX+vM.GetMapPos(this.moveStepPixel), iMapCenterY, true);  
                break; 
            case "center":
                MoveTo(vM.Property.CenterX, vM.Property.CenterY);
                break;                                 
        }
    };
    this.Switch3D = function(obj)
    {
        if(vM.MapState()!=0 && !vM.MapLoading())
        {
            vM.ViewSigns(true, 'park');
            vM.ViewPlots(true, 'ad');
            var oDivs = obj.parentNode.parentNode.getElementsByTagName('div');
            oDivs[0].className = 'Wx';
            oDivs[1].className = 'Ew';
            vM.MapState(0);
            obj.className = 'Sw Current';
            $('CompassNav').innerHTML = '<img src="'+GlobalConfig.SkinPath+'Images/CompassIco.gif" alt="指针" />';
            $('CopyrightNav').style.display = '';
            fnEyeExpanding($('imgEyeExpanding'), false);
            $('lnkSwichCity').style.display = '';
            $('lnkVisitOldVersion').style.display = 'none';
        }
    };
    this.Switch2D = function(obj)
    {
        if(vM.MapState()!=1 && !vM.MapLoading())
        {
            vM.ViewSigns(false, 'park');
            vM.ViewPlots(false, 'ad');
            var oDivs = obj.parentNode.parentNode.getElementsByTagName('div');
            oDivs[2].className = 'Sw';
            oDivs[0].className = 'Wx';
            vM.MapState(1);
            obj.className = 'Ew Current';            
            $('CompassNav').innerHTML = '<img src="'+GlobalConfig.SkinPath+'Images/CompassIco1.gif" alt="指针" />';
            $('CopyrightNav').style.display = 'none';
            fnEyeExpanding($('imgEyeExpanding'), true);
            $('lnkSwichCity').style.display = 'none';
            $('lnkVisitOldVersion').style.display = 'none';
        }
    };    
    
    this.SwitchWX = function(obj)
    {
        if(vM.MapState()!=2 && !vM.MapLoading())
        {
            vM.ViewSigns(false, 'park');
            vM.ViewPlots(false, 'ad');
            var oDivs = obj.parentNode.parentNode.getElementsByTagName('div');
            oDivs[1].className = 'Ew';
            oDivs[2].className = 'Sw';            
            vM.MapState(2);
            obj.className = 'Wx Current';
            $('CompassNav').innerHTML = '<img src="'+GlobalConfig.SkinPath+'Images/CompassIco1.gif" alt="指针" />';
            $('CopyrightNav').style.display = 'none';
            fnEyeExpanding($('imgEyeExpanding'), true);   
            $('lnkSwichCity').style.display = 'none';
            $('lnkVisitOldVersion').style.display = 'none';
        }
    } 
}
//地图移动和鹰眼联动
function MoveTo(x,y)
{
    vM.MoveTo(x, y, true); 
    vMe.MoveTo(x, y, true);
}
/******************begin:各种URL支持和定位********************/
function fnGetPositionByCID()//企业Pop定位
{
    var cid = fnRequest('cid');
    if (cid != '' && cid*1 > 0)
    {
        _CompanyPopControl.ShowPop(cid,true); 
    }
}
function fnGetPositionByEID()//E店Pop定位
{
    var eid = fnRequest('eid');
    if (eid != '' && eid*1 > 0)
    {
        _EShopPopControl.ShowPop(eid,true); 
    }
}
function fnGetPositionByTID()//主题Pop定位
{
    var tid = fnRequest('tid');
    var tname = fnRequest('tname');
    if (tid != '' && tid*1 > 0 && tname == '')
    {
        _ThemePopControl.ShowPop(tid,true); 
    }
}
function fnGetPositionByOID()  //实体Pop定位
{
    var oid = fnRequest('oid');
    if (/.+?\?\d+$/gi.test(window.document.location.href))
    {
        oid = window.document.location.href.replace(/^.+?\?/gi, '');
    }
    if (oid != '' && oid*1 > 0)
    {
        _EntityPopControl.ShowPop(oid,true);
    }
}
//URL的解析
function fnUrlParse()
{
    if(fnRequest('searchshop') == 1)
    {
        fnSearchChange($('liEShopSearch'));
    }
    if(fnRequest('EAddressRegister') == 1)
    {
        fnSearchChange($('liEAddress'));
        fnEAddressRegister(fnRequest('EAddressName'));
        
    }
    if(fnRequest('EAddressManager') == 1)
    {
        fnSearchChange($('liEAddress'));
        fnEAddressManager();
        
    }
    var x = fnRequest('x');
    var y = fnRequest('y');
    if (x != ''&&y != '')
    {
        MoveTo(x, y);
    }
    var q = fnRequest('q');       //本搜
    if (q != '')
    {
        fnMapSearchByHotkey(unescape(q));
    }
    var nq = fnRequest('nq');
    if (nq != '')
    {
        fnNearbySearch(unescape(nq),x,y,1000);
    }
    var iBusId = fnRequest('bid');
    if(iBusId != '')
    {
        fnOnBusClick(iBusId, unescape(fnRequest('bname')),'');
    }
    var tid = fnRequest('tid');
    var tname = fnRequest('tname');
    if(tid != '' && tname != '')
    {
        fnLoadThemeMapListByTypeId(tid,unescape(tname));
    }
    var b = fnRequest('b');       //公交搜索
    if (b != '')
    {
        if (/^\w?\d+$/.test(b))
        {
            fnAddBusLineSearchTab(unescape(b)); 
        }
        else
        {
            fnAddBusStationSearchTab(unescape(b));  
        }
    }
    var s = fnRequest('s');       //站名搜索
    if (s != '')
    {
        fnAddBusStationSearchTab(unescape(s)); 
    }
    
    var b1 = fnRequest('b1');//两个站点间的搜索
    if (b1 != '')
    {
        var b2 = fnRequest('b2');
        if (b2 != '')
        {
            fnAddBusTransferSearchTab(unescape(b1), unescape(b2));
        }
    }
    var title = fnRequest('title');
    if(title=="")
    {
        title = fnRequest('tname');
    }
    var content = fnRequest('content');
    if(x=='')
    {
        x = fnRequest('tx');
    }
    if(x=='')
    {
        return;
    }
    if (y=='')
    {
        y = fnRequest('ty');
    }
    if(y=='')
    {
        return;
    }
    if (x != ''&&y != '' && title !='')
    {
        _Mark.Show(x,y,unescape(title),unescape(content));
    }    
}
/******************end:各种定位********************/
/*****begin:地图上显示如公交**********************/
//显示公交站信息，id:公交站ID
//定位到公交站并显示线路信息
function fnGotoBusStation(id, name, x, y)
{
    if(_BusTransferLineLayer.innerHTML=='')
    {
        var PopHtml='<span style="cursor:pointer; height:26px; float:left; font-size:12px; color:#000;white-space:nowrap;{$topwidth}"><span style="cursor:pointer; width:24px; height:24px; float:left; background:url(' + GlobalConfig.SkinPath + 'Images/gongjiao.gif) no-repeat; text-align:center; padding-top:2px;">1</span><span style="cursor:pointer; height:19px;line-height:19px; background:#fff; padding-right:4px; float:left;{$width};" onclick="parent.fnShowBusStation('+id+',\''+name+'\','+x+','+y+')">'+name+'</span></span>';
        _BusStationLayer.innerHTML = '';
        var div = vM.$C('div');
        div.innerHTML = PopHtml;
        var vlen = name.length*12.1;
        vM.appendEntity(div, _BusStationLayer, false, x,y,vlen+35,26,12,28, false);
    }
    MoveTo(x, y);
}
function fnShowBusStation(id, name, x, y){
    if (!_BusStationControl){
        _BusStationControl = new BusStationControl(vM.Body.document);
        _BusStationControl.ID = vM.appendEntity(_BusStationControl.Body, _PopLayer, false, x, y, 303, 170, 0, 38, false);
        _BusStationControl.Width = 303;
        _BusStationControl.Height = 165;
        
        _BusStationControl.ResumeLayout();
        _BusStationControl.onLoadComplete = function(){
            _BusStationControl.ShowBusStation(id,name);
        };
        _BusStationControl.onBusClick = function(busid, busname, stationName){
            fnOnBusClick(busid, busname, stationName);
        };
    }
    else{
        vM.moveEntity(_BusStationControl.ID, x, y);
        _BusStationControl.ShowBusStation(id,name);
    }
}
function fnOnBusClick(busid, busname, stationName)
{
    fnOpenTab();
    tab = new TabControl.Tab(document,'search',busname,GlobalConfig.SkinPath+'Fundation/BusNoSearch.html?stationName='+escape(stationName)+'&action=1&key='+ busid,true,true,80);
    fnAddTab(tab);   
}
//加载完线路显示公交站
function fnShowBusStationIco(arrBusData, type){
    _BusLineType = type;
    _BusLineData = arrBusData;
    _BusTransferLineLayer.innerHTML='';
    _BusStationLayer.innerHTML = '';
    if(_BusLineData!=null)
    {                  
        var PopHtml='<span style="cursor:pointer; height:26px; float:left; font-size:12px; color:#000;white-space:nowrap;{$topwidth}"><span style="cursor:pointer; width:24px; height:24px; float:left; background:url(' + GlobalConfig.SkinPath + 'Images/gongjiao.gif) no-repeat; text-align:center; padding-top:2px;">{$No}</span><span style="cursor:pointer; height:19px;line-height:19px; background:#fff; padding-right:4px; float:left;{$width};" onclick="parent.fnShowBusStation({$StationID},\'{$BusStationName}\',{$X},{$Y})">{$BusStationName}</span></span>';
        if(_BusLineType==1){
            var l=_BusLineData.BusUp.length;         
            for(i=0;i<l;i++){
                var oBusUp = _BusLineData.BusUp[i];
                var vlen = oBusUp.StationName.length*12.1;
                var nd = vM.$C('div');
                nd.id='B_pop'+i;
                nd.innerHTML=PopHtml.replace('{$No}',(i+1)).replaceAll('{$BusStationName}',oBusUp.StationName).replace('{$topwidth}','width:'+(vlen+40)+'px').replace('{$width}','width:'+(vlen+10)+'px').replace('{$StationID}',oBusUp.StationID).replace('{$X}',oBusUp.PositionX).replace('{$Y}',oBusUp.PositionY);
                vM.appendEntity(nd, _BusTransferLineLayer, false, oBusUp.PositionX,oBusUp.PositionY,vlen+35,26,12,28, false);
            }
            if(_BusLineData.UpCoord.length > 0)
            {
                vM.DrawPolyLine(_BusTransferLineLayer, vM.ChangeCoords(_BusLineData.UpCoord, vM.Property.ZoomPer[vM.Zoom()]), 4, '#ffff00', 0.7);
            }
        }else{
            var l=_BusLineData.BusDown.length;
            var coords;            
            for(i=0;i<l;i++){
                var oBusDown = _BusLineData.BusDown[i];
                coords +=  oBusDown.PositionX + ',' + oBusDown.PositionY + ',';
                var vlen = oBusDown.StationName.length*12.1;
                var nd = vM.$C('div');
                nd.id='B_pop'+i;
                nd.innerHTML=PopHtml.replace('{$No}',(i+1)).replaceAll('{$BusStationName}',oBusDown.StationName).replace('{$topwidth}','width:'+(vlen+40)+'px').replace('{$width}','width:'+(vlen+10)+'px').replace('{$StationID}',oBusDown.StationID).replace('{$X}',oBusDown.PositionX).replace('{$Y}',oBusDown.PositionY);
                vM.appendEntity(nd, _BusTransferLineLayer, false, oBusDown.PositionX,oBusDown.PositionY,vlen+35,26,12,28, false);
            }
            if(_BusLineData.DownCoord.length > 0)
            {
                vM.DrawPolyLine(_BusTransferLineLayer, vM.ChangeCoords(_BusLineData.DownCoord, vM.Property.ZoomPer[vM.Zoom()]), 4, '#ffff00', 0.7); 
            }         
        }
    }
}
/********************begin:公交搜索回调********************/
function fnDrawingBusLine(busLineCoordList)
{
    _BusLineCoordList = busLineCoordList;
    _BusTransferLineLayer.innerHTML = '';
    _BusStationLayer.innerHTML = '';
    for (var i=0; i<_BusLineCoordList.length; i++)
    {
        var coord = _BusLineCoordList[i];
        vM.DrawPolyLine(_BusTransferLineLayer, vM.ChangeCoords(coord.Coords, vM.Property.ZoomPer[vM.Zoom()]), coord.Size, coord.Color, coord.Alpha);
        var PopHtml='<span style="cursor:pointer; height:26px; float:left; font-size:12px; color:#000;white-space:nowrap;{$topwidth}"><span style="cursor:pointer; width:24px; height:24px; float:left; background:url(' + GlobalConfig.SkinPath + 'Images/gongjiao.gif) no-repeat; text-align:center; padding-top:2px;">{$No}</span><span style="cursor:pointer; height:19px;line-height:19px; background:#fff; padding-right:4px; float:left;{$width};" onclick="parent.fnShowBusStation({$StationID},\'{$BusStationName}\',{$X},{$Y})">{$BusStationName}</span></span>';
        if(coord.Color == '#00ffff')
        {
            PopHtml='<span style="cursor:pointer; height:26px; float:left; font-size:12px; color:#000;white-space:nowrap;{$topwidth}"><span style="cursor:pointer; width:24px; height:24px; float:left; background:url(' + GlobalConfig.SkinPath + 'Images/gongjiao2.gif) no-repeat; text-align:center; padding-top:2px;">{$No}</span><span style="cursor:pointer; height:19px;line-height:19px; background:#fff; padding-right:4px; float:left;{$width};" onclick="parent.fnShowBusStation({$StationID},\'{$BusStationName}\',{$X},{$Y})">{$BusStationName}</span></span>';            
        }
        for (var j=0; j<coord.PassStation.length; j++)
        {
            var vlen = coord.PassStation[j].StationName.length*12.1;
            var nd = vM.$C('div');
            nd.innerHTML=PopHtml.replace('{$No}',(j+1)).replaceAll('{$BusStationName}',coord.PassStation[j].StationName).replace('{$topwidth}','width:'+(vlen+40)+'px').replace('{$width}','width:'+(vlen+10)+'px').replace('{$StationID}',coord.PassStation[j].StationID).replace('{$X}',coord.PassStation[j].PositionX).replace('{$Y}',coord.PassStation[j].PositionY);
            vM.appendEntity(nd, _BusTransferLineLayer, false, coord.PassStation[j].PositionX, coord.PassStation[j].PositionY,vlen+35,26,12,28, false);
        }
    }
}
/********************end:公交搜索回调**********************/
function fnMarkEAddressRegister(x,y,title,content)
{
    if(_EAddressRegTab)
    {
        _EAddressRegTab.destroy();
        _EAddressRegTab  = null;
    }
    fnOpenTab();
    var tab = new TabControl.Tab(document,'EAddressRegister','创建E地址',GlobalConfig.SkinPath+'Fundation/EAddressHandle.aspx?x='+x+'&y='+y+'&title='+escape(title)+'&content='+escape(content),true,true,80);
    if(!_TabControl.ExistTab(tab))
    {
        _EAddressRegTab = tab;
        fnAddTab(_EAddressRegTab);
    }
}
function fnMarkEAddress()
{
    fnOpenTab();
    var tab =  new TabControl.Tab(document,'MarkEAddress','标记位置',GlobalConfig.SkinPath+'Fundation/MarkPlHandle.aspx',true,true,80);
    if(!_TabControl.ExistTab(tab))
    {
        _MarkEAddressTab =tab;
        fnAddTab(_MarkEAddressTab);
    }    
}
function fnMarkEAddressRegister(x,y,title)
{
    if(_EAddressRegTab)
    {
        _EAddressRegTab.destroy();
        _EAddressRegTab  = null;
    }
    fnOpenTab();
    var tab = new TabControl.Tab(document,'EAddressRegister','创建E地址',GlobalConfig.SkinPath+'Fundation/EAddressHandle.aspx?x='+x+'&y='+y+'&title='+escape(title),true,true,80);
    if(!_TabControl.ExistTab(tab))
    {
        _EAddressRegTab = tab;
        fnAddTab(_EAddressRegTab);
    }
}
function fnEAddressRegister(name)
{
    if(_EAddressRegTab)
    {
        _EAddressRegTab.destroy();
        _EAddressRegTab  = null;
    }
    fnOpenTab();
    if(!name)
    {
        name='';
    }
    var tab = new TabControl.Tab(document,'EAddressRegister','创建E地址',GlobalConfig.SkinPath+'Fundation/EAddressHandle.aspx?eaddress='+name,true,true,80);
    if(!_TabControl.ExistTab(tab))
    {
        _EAddressRegTab = tab;
        fnAddTab(_EAddressRegTab);
    }
};
function fnEAddressManager()
{
    if(_EAddressManagerTab)
    {
        _EAddressManagerTab.destroy();
        _EAddressManagerTab = null;
    }
    fnOpenTab();
    var tab =  new TabControl.Tab(document,'EAddressManager','管理E地址',GlobalConfig.SkinPath+'Fundation/EAddressHandle.aspx?operatortype=1',true,true,80);
    if(!_TabControl.ExistTab(tab))
    {
        _EAddressManagerTab =tab;
        fnAddTab(_EAddressManagerTab);
    }
};

function EAddressLoginCallback()
{
    if(_EAddressManagerTab)
    {
        _EAddressManagerTab.destroy();
    }
    if(_EAddressRegTab)
    {
        _EAddressRegTab.destroy();
    }
    if(_EAddressOperatorType==0)
    {
        fnEAddressRegister();
    }
    else
    {
        fnEAddressManager();
    }
};
function fnNewEAddressList()
{
    fnOpenTab();
    var tab =  new TabControl.Tab(document,'NewEAddressList','最新E地址',GlobalConfig.SkinPath+'Fundation/EAddressList.aspx',true,true,80);
    fnAddTab(tab);
};

function fnEAddressHelper()
{
    fnOpenTab();
    var tab =  new TabControl.Tab(document,'NewEAddressList','E地址助手',GlobalConfig.SkinPath+'Fundation/EAddressHelper.html',true,true,80);
    fnAddTab(tab);
};

function fnOpenEAddressWin(obj)
{
    if(!new RegExp('^\s*[.A-Za-z0-9]{4,14}\s*$').test(obj.value))
    {
        obj.select();
        obj.focus();
        return;
    }
    
    window.open('http://edizhi.edushi.com/'+obj.value);
}