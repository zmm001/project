var vM =    null;               //地图对象

var _MapWidth = 0;
var _MapHeight = 0;



var _ZoomBar = null;            //缩放工具条
var _TabControl;                //选项卡
var _PoiPopControl;             //PoiPop


var _MapExpandingState = true;       //标记地图搜索栏收缩状态
var _MapFullScreenState = false;       //标记地图是否为全屏状态
var _IsBeginSelectMark = false;  //是否开始标记
var __IsDrawBusLineState = false; //标记当前是公交站点的画线图层还是换乘的画线图层

var _IconLayer;             //小图标图层
var _MarkLayer;
var _PopLayer;
var _UnitCoordsLayer; //入驻位置图层
var _ReportCoordsLayer; //报料图层



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
    if ($('liLoginInfo').innerHTML == '') {
        //用JS获取用户的昵称
        var cc = new CookieHelper();
        var cookieNickNameCookie = cc.getCookie('MemberNickName');
        if (cookieNickNameCookie != null) {
            $('liLoginInfo').innerHTML = '欢迎您！<span style="color:#ff6400">' + cookieNickNameCookie + '</span><span>[<a href="' + GlobalConfig.UserCenterUrl + 'Index.aspx?city=' + GlobalConfig.CityCode + '" target="_blank">我的E都市</a>]</span>&nbsp;<span>[<a href="javascript:fnLoginOut();">退出</a>]</span>';
        }
        else {
            $('liLoginInfo').innerHTML = '欢迎您！<span>[<a href="http://my.edushi.com/Register.aspx" target="_blank" title="注册">注册</a>]</span><span>[<a href="javascript:;" onclick="fnShowLogin();pageTracker._trackEvent(\'Map5.2\', \'Mater_UI\', \'登录\'); ">登录</a>]</span>';
        }
    }
    //加载对象
    if(typeof vEdushiMap =='undefined' || typeof vEdushiMap.Body.NewMapLayer !='function' ||(vEdushiMap.Body.MapState.Map!=0&&vEdushiMap.Body.GoogleMap==null))
    {
        setTimeout("fnLoadInit()",50);
        return;
    }
    
    
    vM  = vEdushiMap;
    window.onresize();
    _IconLayer = vM.NewMapLayer('Icon',269, true);
    _PopLayer = vM.NewMapLayer('Pop', 269, true);
    _MarkLayer = vM.NewMapLayer('Mark', 265, true); //标记图层
    _ReportCoordsLayer = vM.NewMapLayer('ReportCoordsLayer', 160, true);
    _UnitCoordsLayer = vM.NewMapLayer('UnitCoordsLayer', 149, true);
    //初始化广告
    fnInitPicAD();
    fnAddMarkCss();
    //初始化各种Pop
    fnInitPopControl();
    //初始化选项卡
    fnInitTabControl();
    //初始化滚动新闻列表
    fnLoadNewsList();

    vM.attachEvent(EGIS.KeyWord.EventName.MapZoomChange, function(z) {
        
    });

     
    //测距结束
    vM.attachEvent(EGIS.KeyWord.EventName.ScaleEnd, function(dis) {
        fnShowScaleResult(dis);
    });
    vM.attachEvent(EGIS.KeyWord.EventName.MapMouseDown, function(e) {
        __EdushiSuggest.Hide();
    });
    vM.attachEvent(EGIS.KeyWord.EventName.MapMouseUp, function(e) {
        if (_IsBeginSelectMark) {
            _Mark.Add(vM.PointerX(), vM.PointerY(), '');
        }
        if (_IsBeginSelectEAddress) {
            _EAddress.Add(vM.PointerX(), vM.PointerY(), '', '');
        }
        if (_IsBeginMarkEAddress) {
            _MarkEAddress.Add(vM.PointerX(), vM.PointerY(), '', '');
        }
    });

    vM.attachEvent(EGIS.KeyWord.EventName.GetCoordsEnd, function(c, flg) {
        if (flg&&c.length>0) {
            if (_IsBeginSelectReportCoords) {
                _DrawReportCoords = c;
                fnStartDrawReportCroodsToPoly();
                _ReportTab.TabBody.contentWindow.EndGetReportCoords(c.toString());
            }
            else if (_IsBeginSelectUnitCoords) {
                _DrawUnitCoords = c;
                fnStartDrawUnitCroodsToPoly();
                _EShopAndCompanyJoinTab.TabBody.contentWindow.EndGetUnitCoords(c.toString());
            }
        }
    });
    vM.attachEvent(EGIS.KeyWord.EventName.ContextMenuClick, function(key, wx, wy, mx, my, spot) {
        switch (key) {
            case 'center':
                vM.MoveTo(mx, my, true);
                break;
            case 'zoomout':
                vM.FlatZoom(vM.Zoom() + 1);
                break;
            case 'zoomin':
                vM.FlatZoom(vM.Zoom() - 1);
                break;
            case 'start':
                fnGoogleStat('右键：从这里出发');
                if (spot) {
                    fnShowFromHereSearch(spot.Name);
                }
                else {
                    fnShowFromHereSearch('');
                }
                break;
            case 'end':
                fnGoogleStat('右键：如何到这里');
                if (spot) {
                    fnShowToHereSearch(spot.Name);
                }
                else {
                    fnShowToHereSearch('');
                }
                break;
            case 'cirbus':
                fnGoogleStat('右键：周边公交');
                if (spot) {
                    fnShowPeripheralBus(spot.Cx, spot.Cy, spot.Name);
                }
                else {
                    fnShowPeripheralBus(vM.PointerX(), vM.PointerY(), '');
                }
                break;
            case 'cirsearch':
                fnGoogleStat('右键：查找周边');
                if (spot) {
                    fnShowPeripheralSearch(spot.Cx, spot.Cy, spot.Name);
                }
                else {
                    fnShowPeripheralSearch(vM.PointerX(), vM.PointerY(), '');
                }
                break;
            case 'errors':
                fnGoogleStat('右键：我要报料');
                if (spot) {
                    if (spot.Group == 'build') {
                        fnReport(spot.Cx, spot.Cy, 0, spot.RelationID, spot.Name);
                    }
                    else {
                        fnReport(spot.Cx, spot.Cy, 0, spot.ID, spot.Name);
                    }

                }
                else {
                    fnReport(vM.PointerX(), vM.PointerY(), 2, 0, '');
                }
                break;
            case 'sign':
                fnGoogleStat('右键：创建E地址');
                parent.__CreateEAddressFromRightMouseDown = true;
                fnCreateEAddress();
                if (spot) {
                    _EAddress.Add(vM.PointerX(), vM.PointerY(), spot.Name, '');
                }
                else {
                    _EAddress.Add(vM.PointerX(), vM.PointerY(), '', '');
                }
                break;
            case 'postbdt':
                fnGoogleStat('右键：我要打听');
                if (spot) {
                    var sTitle = escape('关于“' + spot.Name + '”，我想打听。。。。。');
                    window.open(GlobalConfig.WebRootPath + 'bdt/Ask.aspx?from=map&title=' + sTitle + '&x=' + vM.PointerX() + '&y=' + vM.PointerY(), '_blank');
                }
                else {
                    window.open(GlobalConfig.WebRootPath + 'bdt/Ask.aspx?from=map&x=' + vM.PointerX() + '&y=' + vM.PointerY(), '_blank');
                }
                break;
            case 'about':
                fnGoogleStat('右键：关于eEdushiMap');
                fnShowMessageBox('关于eEdushiMap…', '阿拉丁信息科技有限公司<br />http://www.edushi.com ');
                break;
        }
    });
    vM.attachEvent(EGIS.KeyWord.EventName.Switch2D, function() {
        vM.ViewSigns(false, 'park');
        vM.ViewSigns(false, 'unit');
        vM.ViewSpotAreas(false);
        vM.ViewSpotLabels(false);
        vM.ViewPlots(false);
    });
    vM.attachEvent(EGIS.KeyWord.EventName.SwitchWX, function() {
        vM.ViewSigns(false, 'park');
        vM.ViewSigns(false, 'unit');
        vM.ViewSpotAreas(false);
        vM.ViewSpotLabels(false);
        vM.ViewPlots(false);
    });
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
    switch(evt.keyCode)
    {
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
function fnShowScaleResult(_dis) {
    if (_dis > 1000) {
        _dis = _dis / 1000; _dis = _dis * 100; _dis = Math.round(_dis); _dis = _dis / 100; _dis = _dis + 'km';
    }
    else {
        _dis = _dis * 100; _dis = Math.round(_dis); _dis = _dis / 100; _dis = _dis + 'm';
    }
    fnShowMessageBox('测距', '<div class="P">本次测距总长：<strong id="distance">'+_dis+'</strong>。</div><div class="P">以上数据仅供参考，请以实际长度为准。</div>');
}
function fnAddMarkCss() {
    var MarkCss = vM.$C('link');
    MarkCss.rel = 'stylesheet';
    MarkCss.type = 'text/css';
    MarkCss.href = 'Css/Mark.css';
    vM.Body.document.getElementsByTagName('head')[0].appendChild(MarkCss);
}
//初始化Pop广告和搜索广告
function fnInitPicAD(){
    //判断是否来源Pop广告
    var C_ID = fnRequest('cid');
    var E_ID = fnRequest('eid');
    var O_ID = fnRequest('oid');
    if (/.+?\?\d+$/gi.test(window.document.location.href)){
        O_ID = window.document.location.href.replace(/^.+?\?/gi, '');
    }
    if ((C_ID != '' || O_ID != '' || E_ID != '') && (C_ID * 1 > 0 || E_ID * 1 > 0 || O_ID * 1 > 0)) {
        if (document.referrer != '') {           
            window.__IsSourceAD = true; //是否是来源定位
        }
    }
}
//初始化选项卡
function fnInitTabControl() {
    if (!_TabControl) {
        var HeadContainer = $('HeadContainer');
        var BodyContainer = $('BodyContainer');
        var LeftBtn = $('LeftBtn');
        var RightBtn = $('RightBtn');
        _TabControl = new TabControl(HeadContainer, BodyContainer, LeftBtn, RightBtn);
    }
}
function fnGoogleStat(sTrackName) {
    try {
        pageTracker._trackEvent('Map5.2', 'Mater_UI', sTrackName);
    } catch (e) {
    }
}
function fnEntityGoogleStat(sTrackName) {
    try {
        pageTracker._trackEvent('Map5.2', '实体点击', sTrackName);
    } catch (e) {
    }
}
function fnCompanyGoogleStat(sTrackName) {
    try {
        pageTracker._trackEvent('Map5.2', '企业点击', sTrackName);
    } catch (e) {
    }
}
function fnBusPopGoogleStat(sTrackName) {
    try {
        pageTracker._trackEvent('Map5.2', '公交点击', sTrackName);
    } catch (e) {
    }
}
//初始化Pop
function fnInitPopControl() {

    //初始化PoiPOP
    if (!_PoiPopControl) {
        _PoiPopControl = new PoiPopControl(vM.Body.document);
        _PoiPopControl.ID = vM.AppendEntity(_PoiPopControl.Body, _PopLayer, false, 0, 0, 305, 206, 36, 204, false);
        _PoiPopControl.onLoadComplete = function() {
        };
        //重写纠错事件
        _PoiPopControl.onCavil = function(x, y, id, name) {
            fnReport(x * 1, y * 1, 1, id, name);
        };
    }

}
function fnOpenTab() {
    if (_MapFullScreenState) {
        fnFullScreen($('aFullScrenn'));
        if (!_MapExpandingState) {
            fnExpanding($('imgExpanding'));
        }
    }
    else {
        if (!_MapExpandingState) {
            fnExpanding($('imgExpanding'));
        }
    }
}
function fnShowFromHereSearch(oname) {
    fnOpenTab();
    var tab = new TabControl.Tab(document, 'PeripheralBus', '从这里出发', '/Fundation/FromHereStart.html?oname=' + escape(oname) + '&x=' + vM.PointerX() + '&y=' + vM.PointerY(), true, true, 80);
    fnAddTab(tab);
}
function fnShowToHereSearch(oname){
    fnOpenTab();
    var tab = new TabControl.Tab(document,'PeripheralBus','如何到达这里','/Fundation/ToHereSearch.html?oname=' + escape(oname) + '&x=' + vM.PointerX() + '&y=' + vM.PointerY(),true,true,80);
    fnAddTab(tab);
}
function fnShowBusTransfer(x, y, oname) {
    fnOpenTab();
    var tab = new TabControl.Tab(document, 'busTransferSearch', '公交换乘', '/Fundation/BusTransfer.html?oname=' + escape(oname) + '&x=' + x + '&y=' + y, true, true, 80);
    fnAddTab(tab);
}
function fnShowPeripheralBus(x, y, oname) {
    fnOpenTab();
    var tab = new TabControl.Tab(document, 'PeripheralBus', '周边公交', '/Fundation/PeripheralBus.html?oname=' + escape(oname) + '&x=' + x + '&y=' + y, true, true, 80);
    fnAddTab(tab);
}
function fnShowPeripheralSearch(x, y, oname) {
    fnOpenTab();
    var tab = new TabControl.Tab(document, 'nearBySearch', '查找周边', '/Fundation/NearBySearch.html?oname=' + escape(oname) + '&x=' + x + '&y=' + y, true, true, 80);
    fnAddTab(tab);
}
//泡泡周边搜索
function fnNearbySearch(sKeyword, x, y, nArea) {
    var tab = new TabControl.Tab(document, 'FromHereSearch', sKeyword, '/Fundation/LocalSearch.aspx?cityname=' + escape(GlobalConfig.CityName) + '&type=4&keyword1=' + escape(sKeyword) + '&x=' + x + '&y=' + y + '&len=' + nArea, true, true, 80);
    fnAddTab(tab);
}
//搜索结果点击调用的方法，判断是实体还是企业后调用不同的Pop
//datatype数据类型 1是企业，2实体，3二维poi，4道路
function fnShowSearchPop(oid, cid, lstid, x, y, datatype, name, address, telephone) {
    if (datatype == 3) {
        fnShowEwPoiPop(x, y, name, address, telephone);
    }
    else if (datatype == 4) {
        fnShowEwRoad(x, y);
    }
}
//显示二维道路
function fnShowEwRoad(x, y) {
    if (vM.MapState().Map != 0) {
        var epoint = vM.GLatLng2EPoint(new EGIS.LatLng(x, y));
        MoveTo(epoint.X, epoint.Y);
    }
    else {
        setTimeout(function() { fnShowEwRoad(x, y); }, 300);
    }
}
//显示二维POP
function fnShowEwPoiPop(x, y, name, address, telephone) {
    if (vM.MapState().Map != 0) {
        var epoint = vM.GLatLng2EPoint(new EGIS.LatLng(x, y));
        vM.MoveEntity(_PoiPopControl.ID, epoint.X * 1, epoint.Y * 1);
        MoveTo(epoint.X, epoint.Y);
        _PoiPopControl.ShowPop(name, address, telephone, epoint.X * 1, epoint.Y * 1);
    }
    else {
        setTimeout(function() { fnShowEwPoiPop(x, y, name, address, telephone); }, 300);
    }
}
//初始化赞助商(新闻)选项卡
function fnLoadNewsList() {
    //fnAddADTab();
    fnUrlParse();   //Url定位
}
function fnLoadNewsById(id, title) {
    if (!title) {
        title = '广告';
    }
    var tab = new TabControl.Tab(document, 'news', title, '/Fundation/News.html?id=' + id, true, true, 80);
    fnAddTab(tab);
}

function fnAddADTab() {
    var tab = new TabControl.Tab(document,'ads','赞助商','/Fundation/News.html',true,true,80);
    fnAddTab(tab);
}
   
//显示某个特定主题分类
function fnLoadThemeMapListByTypeId(Tid,Tname){
    fnOpenTab();
    tab = new TabControl.Tab(document,'themeMap',Tname,'/Fundation/ThemeMap.html?classid='+Tid+'&key='+ escape(Tname),true,true,80);
    fnAddTab(tab);
}
//触发选项卡里的Iframe onresize事件
function fnAttachIframeResize() {
    if (_TabControl) {
        for (var i = 0; i < _TabControl.TabList.length; i++) {
            _TabControl.TabList[i].TabBody.style.height = _TabControl.TabList[i].TabBody.parentNode.style.height; ;
            _TabControl.TabList[i].resize();
        }
    }
}
//重写窗口缩放事件
window.onresize = function() {
    var h = fnGetWindowHeight(), w = fnGetWindowWidth();
    if ($('divDialog')) {
        $('divDialog').style.top = (h - 120) / 2 + 'px';
        $('divDialog').style.left = (w - 300) / 2 + 'px';
    }
    if ($('divDialogBg')) {
        $('divDialogBg').style.height = h + 'px';
        $('divDialogBg').style.width = w + 'px';
    }
    if ($('divLoginDialog')) {
        $('divLoginDialog').style.top = (h - 120) / 2 + 'px';
        $('divLoginDialog').style.left = (w - 300) / 2 + 'px';
    }
    if (h < 450 || w < 750) {
        h = 450;
        w = 750;
        document.body.style.width = '750px';
        document.body.style.height = '450px';
    }
    else {
        document.body.style.width = w + 'px';
        document.body.style.height = h + 'px';
    }
    if (_MapFullScreenState) {
        $('Header').style.display = 'none';
        $('Navigation').style.display = 'none';
        $('EdushiMap').style.top = '0px';
        $('Content').style.marginRight = '0px';
        $('Content').style.width = w + 'px';
        $('EdushiMap').style.width = w + 'px';
        $('EdushiMap').style.height = h - 25 + 'px';
        $('DetailMap').style.width = w + 'px';
        $('DetailMap').style.height = h - 25 + 'px';
        $('Wrapper').style.width = w + 'px';
        $('Wrapper').style.height = h + 'px';
        _MapWidth = w;
        _MapHeight = h - 25;
        if (vM) {
            vM.MapHeight(_MapHeight);
            vM.MapWidth(_MapWidth);
        }
    }
    else {
        $('Header').style.display = 'block';
        $('Navigation').style.display = 'block';
        if (_MapExpandingState) {
            $('NavContent').style.display = 'block';
            $('Content').style.marginRight = '340px';
            $('Content').style.width = w - 340 + 'px';
            $('Navigation').style.marginLeft = '-340px';
            $('Navigation').style.width = '340px';
            $('EdushiMap').style.width = w - 342 + 'px';
            $('DetailMap').style.width = w - 342 + 'px';
            _MapWidth = w - 342;
            if (vM) {
                vM.MapWidth(_MapWidth);
            }
        }
        else {
            $('NavContent').style.display = 'none';
            $('Content').style.marginRight = '11px';
            $('Content').style.width = w - 11 + 'px';
            $('Navigation').style.marginLeft = '-13px';
            $('Navigation').style.width = '13px';
            $('EdushiMap').style.width = w - 13 + 'px';
            $('DetailMap').style.width = w - 13 + 'px';
            _MapWidth = w - 13;
            if (vM) {
                vM.MapWidth(_MapWidth);
            }
        }
        var iShrinkDHHeight = h - 51;
        var iShrinkDHPaddingTop = (iShrinkDHHeight - 105) / 2;
        $('ShrinkDH').style.paddingTop = iShrinkDHPaddingTop + 'px';
        $('ShrinkDH').style.height = (h - 50 - iShrinkDHPaddingTop) + 'px';
        $('NavContent').style.height = (h - 59) + 'px';
        $('Navigation').style.height = (h - 51) + 'px';
        $('BodyContainer').style.height = h - 203 + 'px';
        $('EdushiMap').style.height = h - 76 + 'px';
        $('DetailMap').style.height = h - 76 + 'px';
        $('Wrapper').style.height = h - 76 + 'px';
        _MapHeight = h - 76;
        if (vM) {
            vM.MapHeight(_MapHeight);
        }
    }
    //主题列表
    if (vM) {
        if (typeof vEdushiMap.Body.GoogleMap != 'undefined' && vEdushiMap.Body.GoogleMap!=null) {
            if (vM.MapState().Map != 0) {
                vM.ResizeGoogleMap();
            }
        }
    }
    fnAttachIframeResize();
};

//添加小图标至地图与鹰眼中
function fnAppendIcon(title, x, y, text, sImgPath, sImgPath2, sFn, w, h, ew, eh, isAppendEye){
    if (sImgPath2.length == 0){
        sImgPath2 = sImgPath;
    }
    var iconHTML = '';
    if (EGIS.Browser.Name == 'MSIE' && EGIS.Browser.Version < 7) {
        iconHTML = '<div id="' + x + '_' + y + '" style ="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + sImgPath + '\',sizingMethod=\'image\');width:' + w + 'px;height:' + h + 'px; cursor:pointer;" onclick="' + sFn + '" title="' + title + '"><span style="display:block;width:32px;line-height:33px;text-align:center;font-size:12px;font-family:\"宋体\";color:#930;">' + text + '</span></div>';
    }
    else {
        iconHTML = '<div id="' + x + '_' + y + '" style ="background-image:url(' + sImgPath + ');width:' + w + 'px;height:' + h + 'px; cursor:pointer;" onclick="' + sFn + '" title="' + title + '"><span style="display:block;width:32px;line-height:33px;text-align:center;font-size:12px;font-family:\"宋体\";color:#930;">' + text + '</span></div>'; ;
    }
    var p = vM.$C('div');
    p.innerHTML = iconHTML;
    vM.AppendEntity(p, _IconLayer, false, x, y, w, h, ew, eh, false);
    vM.$(x + '_' + y).onmouseover = function() {
        if (EGIS.Browser.Name == 'MSIE' && EGIS.Browser.Version < 7) {
            this.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + sImgPath2 + '\',sizingMethod=\'image\')';
        }
        else {
            this.style.backgroundImage = 'url(' + sImgPath2 + ')';
        }
    };
    vM.$(x + '_' + y).onmouseout = function() {
        if (EGIS.Browser.Name == 'MSIE' && EGIS.Browser.Version < 7) {
            this.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + sImgPath + '\',sizingMethod=\'image\')';
        }
        else {
            this.style.backgroundImage = 'url(' + sImgPath + ')';
        }
    };
}
/*************登录部分*********************/
function fnShowLogin(logincallback) {
    if (logincallback) {
        _LoginCallback = logincallback;
    }
    else {
        _LoginCallback = null;
    }
    var h = fnGetWindowHeight();
    var w = fnGetWindowWidth();
    if (!$('divDialogBg')) {
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
        div.style.width = w + 'px';
        div.style.height = h + 'px';
        document.body.appendChild(div);
    }
    if (!$('divLoginDialog')) {
        var divLogin = $C('div');
        divLogin.id = 'divLoginDialog';
        divLogin.style.left = (w / 2 - 150) + 'px';
        divLogin.style.top = (h / 2 - 60) + 'px';
        divLogin.style.position = 'absolute';
        divLogin.style.zIndex = 100002;
        divLogin.style.width = '300px';
        divLogin.style.height = 'auto';
        var loginHtml = '<div class="LoginNavT"></div><div class="LoginNavD"><h3>用户登录</h3><table border="0" cellpadding="0" cellspacing="0"><tr><th>用户名：</th><td><input class="InFieldSty" onfocus="this.className=\'ThisStyle\';" onblur="this.className=\'InFieldSty\';" style="width:160px;" type="text" id="txtUserName"/></td></tr><tr><th>密码：</th><td><input class="InFieldSty" onfocus="this.className=\'ThisStyle\';" onblur="this.className=\'InFieldSty\';" style="width:160px;" type="password" id="txtPassword"/></td></tr><tr><th>验证码：</th><td><span><input onfocus="this.className=\'ThisStyle\';" onblur="this.className=\'InFieldSty\';" class="InFieldSty" style="width:67px;" type="text" id="txtVerifyCode"/></span><span style="padding-top:1px"><img id="imgVerifyCode" style="cursor:pointer" alt="单击获取新验证码" /></span></td></tr><tr><th>&nbsp;</th><td><span><input id="chkInvalidate" type="checkbox" name="chkInvalidate" /></span><span><label for="chkInvalidate">下次记住密码</label></span></td></tr><tr><th>&nbsp;</th><td><input type="image" src="/Images/LoginBtn1.gif" onclick="fnLogin()" />&nbsp;&nbsp;<img src="/Images/RegBtn1.gif" alt="注册" style="cursor:pointer;" onclick="window.open(\'' + GlobalConfig.UserCenterUrl + 'Register.aspx\',\'_blank\')" /></td></tr></table><div class="LoginClew" id="divLoginResultMsg"></div></div><div style="position:absolute; top:12px; right:8px; cursor:hand; width:13px; height:13px; overflow:hidden;background:url(/Images/CloseBtn.gif) no-repeat left top;" onclick="javascript:$(\'divDialogBg\').style.display=\'none\';$(\'divLoginDialog\').style.display=\'none\';" onmouseover="this.style.backgroundPosition=\'left -13px\'"onmouseout="this.style.backgroundPosition=\'left top\'" title="关闭窗口"></div></div>';
        document.body.appendChild(divLogin);
        //IE6的延时加载
        setTimeout(function() { $('divLoginDialog').innerHTML = loginHtml; }, 1);
    }
    setTimeout(function() {
        $('imgVerifyCode').src = GlobalConfig.WebRootPath + 'VerifyImage.aspx?rnd=' + $Rnd();
        $('divLoginResultMsg').style.display = 'none';
        $('divDialogBg').style.display = 'block';
        $('divLoginDialog').style.display = 'block';
        $('imgVerifyCode').onclick = function() { this.src = GlobalConfig.WebRootPath + 'VerifyImage.aspx?rnd=' + $Rnd(); };
        $('txtUserName').focus();
    }, 10);
}
function fnLogin() {
    var sUserName = $('txtUserName').value.trim();
    var sPassword = $('txtPassword').value.trim();
    var sVerifyCode = $('txtVerifyCode').value.trim();
    var isInvalidate = $('chkInvalidate').checked;
    $('txtUserName').value = '';
    $('txtPassword').value = '';
    $('txtVerifyCode').value = '';
    $('chkInvalidate').checked = false;
    if (sUserName.length < 1 || sPassword.length < 1) {
        $('divLoginResultMsg').style.display = 'block';
        $('divLoginResultMsg').innerHTML = '用户名或者密码不能为空！';
        return;
    }
    var sLoginUrl = GlobalConfig.WebRootPath + 'Login.aspx?verifycode=' + sVerifyCode + '&isinvalidate=' + isInvalidate + '&action=login&rnd=' + $Rnd() + '&username=' + sUserName + '&password=' + sPassword;
    ENetwork.DownloadScript(sLoginUrl, function() {
        if (typeof __LoginResult != 'undefined') {
            if (__LoginResult == 1) {
                fnLoginSuccess(__Member);
                if (_LoginCallback) {
                    _LoginCallback();
                    _LoginCallback = null;
                }
            }
            else if (__LoginResult == 0) {
                $('divLoginResultMsg').style.display = 'block';
                $('divLoginResultMsg').innerHTML = '登录失败，用户名或者密码错误！';
                $('imgVerifyCode').src = GlobalConfig.WebRootPath + 'VerifyImage.aspx?rnd=' + $Rnd();
            }
            else if (__LoginResult == -1) {
                $('divLoginResultMsg').style.display = 'block';
                $('divLoginResultMsg').innerHTML = '登录失败，您输入的验证码不正确！';
                $('imgVerifyCode').src = GlobalConfig.WebRootPath + 'VerifyImage.aspx?rnd=' + $Rnd();
            }
        }
        else {
            $('divLoginResultMsg').style.display = 'block';
            $('divLoginResultMsg').innerHTML = '登录失败！';
            $('imgVerifyCode').src = GlobalConfig.WebRootPath + 'VerifyImage.aspx?rnd=' + $Rnd();
        }
    });
}
function fnLoginSuccess(memberInfo) {
    $('liLoginInfo').innerHTML = '欢迎您！<span style="color:#ff6400">' + memberInfo.LM_NickName + '</span><span>[<a href="' + GlobalConfig.UserCenterUrl + 'Index.aspx?city=' + GlobalConfig.CityCode + '" target="_blank">我的E都市</a>]</span>&nbsp;<span>[<a href="javascript:fnLoginOut();">退出</a>]</span>';
    $('divLoginDialog').style.display = 'none';
    fnShowMessageBox('用户登录', '登录成功！欢迎回来' + memberInfo.LM_NickName);
}
function fnLoginOut() {
    var sLoginUrl = GlobalConfig.WebRootPath + 'Login.aspx?action=loginout&rnd=' + $Rnd();
    ENetwork.DownloadScript(sLoginUrl, function() {
        if (typeof __LoginResult != 'undefined') {
            if (__LoginResult == 3) {
                fnLoginOutSuccess();
            }
            else {
                fnShowMessageBox('退出登录', '退出登录失败' + __LoginResult);
            }
        }
        else {
            fnShowMessageBox('退出登录', '退出登录失败');
        }
    });
}
function fnLoginOutSuccess() {
    $('liLoginInfo').innerHTML = '欢迎您！&nbsp;<span>[<a href="' + GlobalConfig.UserCenterUrl + 'Register.aspx" target="_blank">注册</a>]</span>&nbsp;<span>[<a href="javascript:;" onclick="fnShowLogin()">登录</a>]</span>';
    //fnShowMessageBox('退出登录','您已经成功退出');
}
//搜索选项切换
function fnSearchChange(oThis) {
    __EdushiSuggest.Hide();
    switch (oThis.id) {
        case 'liMapSearch':
            $('MapSearch').style.display = 'block';
            $('EAddress').style.display = 'none';
            oThis.className = 'Current';
            $('liEAddress').className = '';
            break;
        case 'liEAddress':
            $('liMapSearch').className = '';
            oThis.className = 'Current';
            $('EAddress').style.display = 'block';
            $('MapSearch').style.display = 'none';
            fnNewEAddressList();
            break;
    }
}
//地图搜索|公交搜索|E店搜索Suggest
function fnKeySearchSuggest(fn, input, x, y, w, type, reqtype, evt) {
    if (input.value.trim().length < 1) {
        __EdushiSuggest.Hide();
        input.focus();
        return;
    }
    evt = window.event ? window.event : evt;
    var maptype; //地图|E店搜索类型
    if (reqtype != 0) {
        maptype = reqtype;
    }
    else {
        var iMapSearchType = GetRadioValue('MapSearchType');
        switch (iMapSearchType) {
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
    if (evt.keyCode == 13 && __EdushiSuggest.SuggestPannel.style.display != 'block') {
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
    if (input.value.length > 0 && input.value != __EdushiSuggest.LastKeyword && keyCode != 38 && keyCode != 40 && keyCode != 13) {
        var url = '';
        if (maptype == 5) {
            url = GlobalConfig.EDataCenterUrl + 'CommMap5.0/SearchSuggest.aspx?domain=' + GlobalConfig.Domain + '&l=' + GlobalConfig.Language + '&req=' + maptype + '&address=' + escape($('txtSearchPlace').value) + '&kw=' + escape(input.value) + '&indexversion=6';
        }
        else {
            url = GlobalConfig.EDataCenterUrl + 'CommMap5.0/SearchSuggest.aspx?domain=' + GlobalConfig.Domain + '&l=' + GlobalConfig.Language + '&req=' + maptype + '&kw=' + escape(input.value) + '&indexversion=6';
        }
        ENetwork.DownloadScript(url, function() {
            if (typeof _SuggestData != 'undefined') {
                __EdushiSuggest.Show(_SuggestData, x, y, w);
            }
            else {
                __EdushiSuggest.Hide();
            }
        });

//        var googleajax = vM.GoogleAjax();
//        localsearch = new googleajax.search.LocalSearch();
//        localsearch.setResultSetSize(googleajax.search.Search.LARGE_RESULTSET);
//        localsearch.execute(GlobalConfig.CityName + ' ' + input.value);
//        localsearch.setSearchCompleteCallback(window, function() {
//            _SearchData = localsearch.results;
//            if (_SearchData.length < 1) {
//                __EdushiSuggest.Hide();
//            }
//            else {
//                _SuggestData = [];
//                for (var i = 0; i < _SearchData.length; i++) {
//                    _SuggestData[i] = {};
//                    _SuggestData[i].Title = _SearchData[i].titleNoFormatting;
//                    _SuggestData[i].Value = _SearchData[i].titleNoFormatting;
//                    _SuggestData[i].Type = '2';
//                }
//                __EdushiSuggest.Show(_SuggestData, x, y, w);
//            }
//        });
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
function fnMapSearchChange(sValue) {
    __EdushiSuggest.Hide();
    switch (sValue) {
        case '0':
        case '1':
        case '2':
            $('divSearch').style.display = 'block';
            $('divAroundSearch').style.display = 'none';
            break;
        case '3':
            $('divSearch').style.display = 'none';
            $('divAroundSearch').style.display = 'block';
            break;
    }
}
/*******************begin添加选项卡的函数集**********************/
//地图搜索
function fnMapSearchByHotkey(sHotkey, isStat) {
    if (isStat) {
        fnGoogleStat('热门关键字：' + sHotkey);
    }
    
//    gtab = new TabControl.Tab(document, 'gsearch', sHotkey, '/Fundation/GooglePoiSearch.aspx?cityname=' + escape(GlobalConfig.CityName) + '&type=0&keyword1=' + escape(sHotkey), true, true, 80);
//    fnAddTab(gtab);
    
    tab = new TabControl.Tab(document, 'search', sHotkey, '/Fundation/LocalSearch.aspx?cityname=' + escape(GlobalConfig.CityName) + '&type=0&keyword1=' + escape(sHotkey), true, true, 80);
    fnAddTab(tab);
}
function fnMapSearch() {
    __EdushiSuggest.Hide();
    var sKeyword1, sKeyword2, iMapSearchType;
    var tab;
    iMapSearchType = GetRadioValue('MapSearchType');
    switch (iMapSearchType) {
        case '0':   //模糊搜索
            fnGoogleStat('模糊搜索');
            break;
        case '1':   //名称搜索
            fnGoogleStat('名称搜索');
            break;
        case '2':   //地址搜索
            fnGoogleStat('地址搜索');
            break;
        case '3':   //周边搜索
            fnGoogleStat('周边搜索');
            break;
    }
    switch (iMapSearchType) {
        case '0':   //模糊搜索
        case '1':   //名称搜索 
        case '2':   //地址搜索
            sKeyword1 = $('txtSearchKey').value.trim();
            if (sKeyword1.length < 1) {
                $('txtSearchKey').focus();
                return;
            }
            tab = new TabControl.Tab(document, 'search', sKeyword1, '/Fundation/LocalSearch.aspx?cityname=' + escape(GlobalConfig.CityName) + '&type=' + iMapSearchType + '&keyword1=' + escape(sKeyword1), true, true, 80);
            
            break;
        case '3':   //周边搜索
            fnGoogleStat('周边搜索');
            sKeyword1 = $('txtSearchPlace').value.trim();
            if (sKeyword1.length < 1) {
                $('txtSearchPlace').focus();
                return;
            }
            sKeyword2 = $('txtSearchSomething').value.trim();
            if (sKeyword2.length < 1) {
                $('txtSearchSomething').focus();
                return;
            }
            tab = new TabControl.Tab(document, 'search', sKeyword1 + sKeyword2, '/Fundation/LocalSearch.aspx?cityname=' + escape(GlobalConfig.CityName) + '&type=' + iMapSearchType + '&keyword1=' + escape(sKeyword1) + '&keyword2=' + escape(sKeyword2), true, true, 80);
            break;
    }
    fnAddTab(tab);
}
//GOOGLE POI搜索
function fnGoogleSearch(keyword) {
    tab = new TabControl.Tab(document, 'search', keyword, '/Fundation/GooglePoiSearch.aspx?cityname=' + escape(GlobalConfig.CityName) + '&keyword=' + escape(keyword), true, true, 80);
    fnAddTab(tab);
}
//本地地图搜索结果回调
function onSearchDataLoadComplete(data, begin, end) {
    _IconLayer.innerHTML = '';
    for (var i = begin; i < end; i++) {
        var epoint = vM.GLatLng2EPoint(new EGIS.LatLng(data[i].Lx, data[i].Ly));
        var x = epoint.X;
        var y = epoint.Y;
        fnAppendIcon(data[i].OCName, x, y, i + 1, 'Images/VesicleBg.png', 'Images/AlterVesicle.png', 'if(parent.fnShowSearchPop){parent.fnShowSearchPop(' + data[i].OwnerID + ', ' + data[i].CompanyID + ',' + data[i].LST_ID + ',' + data[i].Lx + ', ' + data[i].Ly + ',' + data[i].RecordType + ',\'' + data[i].OCName + '\',\'' + data[i].Address + '\',\'' + data[i].Telephone + '\');}', 41, 33, 7, 32, true);

    }
}
//Google搜索结果回调
function onGoogleSearchDataLoadComplete(data, begin, end, page) {
    _IconLayer.innerHTML = '';
    for (var i = begin; i < end; i++) {
        var epoint = vM.GLatLng2EPoint(new EGIS.LatLng(data[i].lat, data[i].lng));
        var x = epoint.X;
        var y = epoint.Y;
        var phoneNumber = '';
        if (data[i].phoneNumbers && data[i].phoneNumbers.length > 0) {
            phoneNumber = data[i].phoneNumbers[0].number;
        }
        fnAppendIcon(data[i].titleNoFormatting, x, y, i + 1 + (page-1)*8, 'Images/VesicleBg.png', 'Images/AlterVesicle.png', 'if(parent.fnShowSearchPop){parent.fnShowSearchPop(0, 0,0,' + data[i].lat + ', ' + data[i].lng + ',' + 3 + ',\'' + data[i].titleNoFormatting + '\',\'' + data[i].streetAddress + '\',\'' + phoneNumber + '\');}', 41, 33, 7, 32, true);

    }
}
function fnAddTab(tab, height) {
    if (!height) {
        tab.TabBody.style.height = '100%';
    }
    else {
        tab.TabBody.style.height = height;
    }
    _TabControl.AddTab(tab);
}
/*******************end添加选项卡**********************/

//#region 页面上固定的按钮的功能
//开始标记
function fnSelectMarkPoint(){
    _Mark.Begin();   
}
function fnCreateEAddress() {
    fnGoogleStat('E地址');
    fnSearchChange($('liEAddress'));
    fnEAddressRegister();
}
//显示隐藏热区标签
function fnLabel() {
    if (vM.Body.VisibleSpotLabels['hotarea']) {
        vM.ViewSpotLabels(false, 'hotarea', true);
    } else {
    vM.ViewSpotLabels(true, 'hotarea', true);
    }
}
//测距
function fnScale() {
    vM.StartScale();
}
//全屏
function fnFullScreen(obj) {
    if (_MapFullScreenState) {
        _MapFullScreenState = false;
        obj.innerHTML = '最大化';
        obj.title = '最大化';
        obj.parentNode.className = 'Ico5'
    }
    else {
        _MapFullScreenState = true;
        obj.innerHTML = '还原';
        obj.title = '还原';
        obj.parentNode.className = 'Ico6';
    }

    window.onresize();
}
function fnShowCommonGoTo() {
    if ($('divQuickLink').style.display == 'block') {
        $('divQuickLink').style.display = 'none';
    }
    else {
        $('divQuickLink').style.display = 'block';
    }
}

//地图打印
function fnPrint() {
    var iMapX = vM.CenterX();
    var iMapY = vM.CenterY();
    var iZoom = vM.Zoom();
    var iWidth = vM.MapWidth();
    var iHeight = vM.MapHeight();
    window.open('http://' + GlobalConfig.Domain + '/Print.aspx?x=' + iMapX + '&y=' + iMapY + '&z=' + iZoom + '&w=' + iWidth + '&h=' + iHeight, 'print');
}
//右侧搜索栏收缩展开
function fnExpanding(obj) {
    if (_MapExpandingState) {
        _MapExpandingState = false;
        obj.src = 'Images/Expanding.gif';
    }
    else {
        _MapExpandingState = true;
        obj.src = 'Images/DrawBack.gif';
    }
    window.onresize();
}

//#endregion 页面上固定的按钮的功能
/***************************************/
//缩放条控制类
function ZoomBarClass() {
    this.beginLevel = 4;
    this.beginTopPixel = 89;
    this.zoomStepPixel = 14;
    this.maxLevel = 10;
    this.moveStepPixel = 256;

    this.currentLevel = this.beginLevel;
    this.originalY = 0;
    this.originalTop = 0;
    this.zoomFlag = false;
    this.zoomBar = $('ControlUnit');
    this.switchState = false;
    this.switchLevel = 6;
    this.mouseoutTimer = null;
    //初始化缩放控件
    this.Init = function() {
        //初始位置
        this.zoomBar.style.top = (this.beginTopPixel + vM.Zoom() * this.zoomStepPixel) + 'px';
        this.zoomBar.onmousedown = function(evt) {
            evt = window.event ? window.event : evt;
            originalY = evt.clientY;
            this.originalTop = this.zoomBar.offsetTop;
            this.zoomFlag = true;
            //
        } .bindAsEventListener(this);
        $('EzoomBar').onmouseout = function() {
            if (this.zoomFlag) {
                this.mouseoutTimer = setTimeout(function() { this.ZoomWithMouseEvent() } .bind(this), 1000);
            }
        } .bindAsEventListener(this);
        $('EzoomBar').onmousemove = this.zoomBar.onmousemove = function(evt) {
            
            if (this.zoomFlag) {
                if (this.mouseoutTimer != null) {
                    clearTimeout(this.mouseoutTimer);
                    this.mouseoutTimer = null;
                }
                evt = window.event ? window.event : evt;
                var ey = evt.clientY;
                var iTop = ey - originalY + this.originalTop;
                if (iTop < this.beginTopPixel) iTop = this.beginTopPixel;
                if (iTop > (this.beginTopPixel + this.zoomStepPixel * (this.maxLevel - 1))) iTop = this.beginTopPixel + this.zoomStepPixel * (this.maxLevel - 1);
                this.zoomBar.style.top = iTop + 'px';
            }
        } .bindAsEventListener(this);

        $('EzoomBar').onmouseup = function(evt) {
            if (this.zoomFlag) {
                this.ZoomWithMouseEvent();
            }
        } .bindAsEventListener(this);
    };
    this.ZoomWithMouseEvent = function() {
        var z = Math.round((this.zoomBar.offsetTop - this.beginTopPixel) / this.zoomStepPixel);
        if (z > this.maxLevel - 1) z = this.maxLevel - 1;
        if (z < 0) z = 0;
        this.currentLevel = z;
        this.zoomBar.style.top = (this.beginTopPixel + z * this.zoomStepPixel) + 'px';
        this.zoomFlag = false;
        vM.FlatZoom(this.currentLevel);
    };
    //缩放一定的"步长","步长"可以为负数
    this.ZoomWithStep = function(step) {
        this.currentLevel += step;
        if (this.currentLevel > this.maxLevel - 1) this.currentLevel = this.maxLevel - 1;
        if (this.currentLevel < 0) this.currentLevel = 0;
        this.zoomBar.style.top = (this.beginTopPixel + this.currentLevel * this.zoomStepPixel) + 'px';
        vM.Zoom(this.currentLevel);
    };
    //缩放到指定的级别
    this.ZoomTo = function(level, flg) {
        this.currentLevel = level;
        this.zoomBar.style.top = (this.beginTopPixel + this.currentLevel * this.zoomStepPixel) + 'px';

        if (flg) {
            vM.Zoom(this.currentLevel);
        }
    };
    this.Move = function(direction) {
        var iMapCenterX = vM.CenterX();
        var iMapCenterY = vM.CenterY();
        switch (direction) {
            case "up":
                MoveTo(iMapCenterX, iMapCenterY - vM.GetMapPos(this.moveStepPixel), true);
                break;
            case "down":
                MoveTo(iMapCenterX, iMapCenterY + vM.GetMapPos(this.moveStepPixel), true);
                break;
            case "left":
                MoveTo(iMapCenterX - vM.GetMapPos(this.moveStepPixel), iMapCenterY, true);
                break;
            case "right":
                MoveTo(iMapCenterX + vM.GetMapPos(this.moveStepPixel), iMapCenterY, true);
                break;
            case "center":
                MoveTo(vMapProperty.CenterX, vMapProperty.CenterY);
                break;
        }
    };
    this.Switch2D = function(obj) {
        if (vM.MapState().Map != 1 && vM.MapSucceed()) {
            var oDivs = obj.parentNode.parentNode.getElementsByTagName('div');
            oDivs[0].className = 'Wx';
            vM.SwitchMap(1);
            obj.className = 'Ew Current';
            vM.ViewSigns(false, 'park');
            vM.ViewSigns(false, 'unit');
            vM.ViewSpotAreas(false);
            vM.ViewSpotLabels(false);
            vM.ViewPlots(false);
        }
    };
    this.SwitchWX = function(obj) {
        if (vM.MapState().Map != 2 && vM.MapSucceed()) {
            var oDivs = obj.parentNode.parentNode.getElementsByTagName('div');
            oDivs[1].className = 'Ew';
            vM.SwitchMap(2);
            obj.className = 'Wx Current';
            vM.ViewSigns(false, 'park');
            vM.ViewSigns(false, 'unit');
            vM.ViewSpotAreas(false);
            vM.ViewSpotLabels(false);
            vM.ViewPlots(false);
        }
    }
}
//地图移动和鹰眼联动
function MoveTo(x, y, flg, fun) {
    vM.MoveTo(x, y, false,fun);
}
/******************begin:各种URL支持和定位********************/
//企业Pop定位
function fnGetPositionByCID() {
    var cid = fnRequest('cid');
    if (cid != '' && cid * 1 > 0) {
        _CompanyPopControl.ShowPop(cid, true);
    }
}
//E店Pop定位
function fnGetPositionByEID() {
    var eid = fnRequest('eid');
    if (eid != '' && eid * 1 > 0) {
        _EShopPopControl.ShowPop(eid, true);
    }
}
//主题Pop定位
function fnGetPositionByTID() {
    var tid = fnRequest('tid');
    var tname = fnRequest('tname');
    if (tid != '' && tid * 1 > 0 && tname == '') {
        _ThemePopControl.ShowPop(tid, true);
    }
}
//实体Pop定位
function fnGetPositionByOID() {
    var oid = fnRequest('oid');
    if (/.+?\?\d+$/gi.test(window.document.location.href)) {
        oid = window.document.location.href.replace(/^.+?\?/gi, '');
    }
    if (oid != '' && oid * 1 > 0) {
        _EntityPopControl.ShowPop(oid, true);
    }
}
//URL的解析
function fnUrlParse() {
    if (fnRequest('searchshop') == 1) {
        fnSearchChange($('liEShopSearch'));
    }
    if (fnRequest('EAddressRegister') == 1) {
        fnSearchChange($('liEAddress'));
        fnEAddressRegister(fnRequest('EAddressName'));
    }
    if (fnRequest('EAddressManager') == 1) {
        fnSearchChange($('liEAddress'));
        fnEAddressManager();
    }
    var x = fnRequest('x');
    var y = fnRequest('y');
    if (x != '' && y != '') {
        MoveTo(x, y);
    }
    var q = fnRequest('q');       //本搜
    if (q != '') {
        fnMapSearchByHotkey(unescape(q));
    }
    var nq = fnRequest('nq');
    if (nq != '') {
        fnNearbySearch(unescape(nq), x, y, 1000);
    }
    var iBusId = fnRequest('bid');
    if (iBusId != '') {
        fnOnBusClick(iBusId, unescape(fnRequest('bname')), '');
    }
    var tid = fnRequest('tid');
    var tname = fnRequest('tname');
    if (tid != '' && tname != '') {
        fnLoadThemeMapListByTypeId(tid, unescape(tname));
    }
    var b = fnRequest('b');       //公交搜索
    if (b != '') {
        if (/^\w?\d+$/.test(b)) {
            fnAddBusLineSearchTab(unescape(b));
        }
        else {
            fnAddBusStationSearchTab(unescape(b));
        }
    }
    var s = fnRequest('s');       //站名搜索
    if (s != '') {
        fnAddBusStationSearchTab(unescape(s));
    }

    var b1 = fnRequest('b1'); //两个站点间的搜索
    if (b1 != '') {
        var b2 = fnRequest('b2');
        if (b2 != '') {
            fnAddBusTransferSearchTab(unescape(b1), unescape(b2));
        }
    }
    var title = fnRequest('title');
    if (title == "") {
        title = fnRequest('tname');
    }
    var content = fnRequest('content');
    if (x == '') {
        x = fnRequest('tx');
    }
    if (x == '') {
        return;
    }
    if (y == '') {
        y = fnRequest('ty');
    }
    if (y == '') {
        return;
    }
    if (x != '' && y != '' && title != '') {
        _Mark.Show(x, y, unescape(title), unescape(content));
    }
}
/******************end:各种定位********************/
/*function fnOpenMergeSearch(key) {
    fnOpenTab();
    var tab = new TabControl.Tab(document, 'MergeSearch', key, '/Fundation/MergeSearch.aspx?key=' + escape(key) + '&lst_id=' + lst_id + '&domain=' + domain + '&cid=' + cid + '&vid=' + vid + '&tid=' + tid + '&card=' + card + '&vip=' + vip + '&type=' + type + '&tags=' + tags + '&cityname=' + cityname, true, true, 80);
    fnAddTab(tab);
    return tab;
}*/
function fnMarkEAddressRegister(x, y, title, content) {
    if (_EAddressRegTab) {
        _EAddressRegTab.destroy();
        _EAddressRegTab = null;
    }
    fnOpenTab();
    var tab = new TabControl.Tab(document, 'EAddressRegister', '申请E地址', '/Fundation/EAddressHandle.aspx?x=' + x + '&y=' + y + '&title=' + escape(title) + '&content=' + escape(content), true, true, 80);
    if (!_TabControl.ExistTab(tab)) {
        _EAddressRegTab = tab;
        fnAddTab(_EAddressRegTab);
    }
}
function fnMarkEAddress() {
    fnOpenTab();
    var tab = new TabControl.Tab(document, 'MarkEAddress', '标记位置', '/Fundation/MarkPlHandle.aspx', true, true, 80);
    if (!_TabControl.ExistTab(tab)) {
        _MarkEAddressTab = tab;
        fnAddTab(_MarkEAddressTab);
    }
}
function fnEAddressRegister(name) {
    if (_EAddressRegTab) {
        _EAddressRegTab.destroy();
        _EAddressRegTab = null;
    }
    fnOpenTab();
    if (!name) {
        name = '';
    }
    var tab = new TabControl.Tab(document, 'EAddressRegister', '申请E地址', '/Fundation/EAddressHandle.aspx?eaddress=' + name, true, true, 80);
    if (!_TabControl.ExistTab(tab)) {
        _EAddressRegTab = tab;
        fnAddTab(_EAddressRegTab);
    }
}
function fnEAddressManager() {
    if (_EAddressManagerTab) {
        _EAddressManagerTab.destroy();
        _EAddressManagerTab = null;
    }
    fnOpenTab();
    var tab = new TabControl.Tab(document, 'EAddressManager', '管理E地址', '/Fundation/EAddressHandle.aspx?operatortype=1', true, true, 80);
    if (!_TabControl.ExistTab(tab)) {
        _EAddressManagerTab = tab;
        fnAddTab(_EAddressManagerTab);
    }
}

function EAddressLoginCallback() {
    if (_EAddressManagerTab) {
        _EAddressManagerTab.destroy();
    }
    if (_EAddressRegTab) {
        _EAddressRegTab.destroy();
    }
    if (_EAddressOperatorType == 0) {
        fnEAddressRegister();
    }
    else {
        fnEAddressManager();
    }
}
function fnNewEAddressList() {
    fnOpenTab();
    var tab = new TabControl.Tab(document, 'NewEAddressList', '最新E地址', '/Fundation/EAddressList.aspx', true, true, 80);
    fnAddTab(tab);
}

function fnEAddressHelper() {
    fnOpenTab();
    var tab = new TabControl.Tab(document, 'NewEAddressList', 'E地址助手', '/Fundation/EAddressHelper.html', true, true, 80);
    fnAddTab(tab);
}

function fnOpenEAddressWin(obj) {
    if (!new RegExp('^\s*[.A-Za-z0-9]{4,14}\s*$').test(obj.value)) {
        obj.select();
        obj.focus();
        return;
    }
    window.open('http://edizhi.edushi.com/' + obj.value);
}


/*************入住功能开始**************/
var _IsBeginSelectUnitCoords = false;
var _EShopAndCompanyJoinTab = null;
var _DrawUnitCoords;
//开始入驻
function fnEShopAndCompanyJoin() {
    fnOpenTab();
    var url = '/Fundation/Company2DJoin.aspx';
    if (!_TabControl.ExistTab(url)) {
        _EShopAndCompanyJoinTab = new TabControl.Tab(document, 'Company2DJoin', '我要入驻', url, true, true, 80);
        fnAddTab(_EShopAndCompanyJoinTab);
        _EShopAndCompanyJoinTab.onDestroy = function() {
            _EShopAndCompanyJoinTab = null;
            fnEndGetUnitCroods();
        };
    }
}
//开始画入驻的位置
function fnStartGetUnitCoords() {
    if (vM.MapState().GetCoords) {
        //return
        return false;
    }
    fnEndGetUnitCroods();
    _IsBeginSelectUnitCoords = true;
    vM.StartGetCoords('请描点连成您要入驻的位置，左键取点，右键撤销，双击结束。');
    return true;
}
function fnEndGetUnitCroods() {
    _IsBeginSelectUnitCoords = false;
    _UnitCoordsLayer.innerHTML = '';
    vM.detachEvent(EGIS.KeyWord.EventName.MapZoomChange, fnStartDrawUnitCroodsToPoly);
}

//画入驻的位置开始
function fnStartDrawUnitCroodsToPoly() {
    _UnitCoordsLayer.innerHTML = '';
    _IsBeginSelectUnitCoords = false;
    vM.DrawPolyLine(_UnitCoordsLayer, vM.GetLayerCoords(_DrawUnitCoords.toString()), 2, 'red', 0.7);
    vM.detachEvent(EGIS.KeyWord.EventName.MapZoomChange, fnStartDrawUnitCroodsToPoly);
    vM.attachEvent(EGIS.KeyWord.EventName.MapZoomChange, fnStartDrawUnitCroodsToPoly);
}



/*************入住功能结束**************/


/*************报料功能开始**************/

var _ReportTab = null;
var _IsBeginSelectReportCoords = false;
var _DrawReportCoords;
//报料开始，x，y：报料的坐标点，type：报料类型（0：实体报料，1：企业报料，2：地点报料）
function fnReport(x, y, type, id, name,coords) {
    fnOpenTab();
    if (!coords) {
        coords = '';
    }
    if (_ReportTab) {
        _ReportTab.destroy();
    }
    var url = '/Fundation/Report.aspx?x=' + x + '&y=' + y + '&type=' + type + '&id=' + id + '&name=' + escape(name)+'&coords='+coords;
    if (!_TabControl.ExistTab(url)) {
        _ReportTab = new TabControl.Tab(document, 'Report', '我要报料', url, true, true, 80);
        fnAddTab(_ReportTab);
        _ReportTab.onDestroy = function() {
            _ReportTab = null;
            fnEndGetReportCroods();
        };
    }
}

//开始报料取点
function fnStartGetReportCoords() {
    if (vM.MapState().GetCoords) {
        return false;
    }
    fnEndGetReportCroods();
    _IsBeginSelectReportCoords = true;
    vM.StartGetCoords('请描点连成您要报料的位置，左键取点，右键撤销，双击结束。');
    return true;
}
//画报料结束
function fnEndGetReportCroods() {
    _IsBeginSelectReportCoords = false;
    _ReportCoordsLayer.innerHTML = '';
    vM.detachEvent(EGIS.KeyWord.EventName.MapZoomChange, fnStartDrawReportCroodsToPoly);
}
//画报料开始
function fnStartDrawReportCroodsToPoly() {
    _ReportCoordsLayer.innerHTML = '';
    _IsBeginSelectReportCoords = false;

    vM.DrawPoly(_ReportCoordsLayer, vM.GetLayerCoords(_DrawReportCoords.toString()), 1, 'yellow', 'black', 0.7);
    vM.detachEvent(EGIS.KeyWord.EventName.MapZoomChange, fnStartDrawReportCroodsToPoly);
    vM.attachEvent(EGIS.KeyWord.EventName.MapZoomChange, fnStartDrawReportCroodsToPoly);
}
function fnReportSuccess(isLogin) {
    if (isLogin) {
        fnShowMessageBox('报料完成', '你的报料已提交，感谢你的参与<br /><a href="http://my.edushi.com/MyNewsFeed.aspx?city=' + GlobalConfig.CityCode + '" target="_blank">查看我的报料记录</a>');
    }
    else {
        fnShowMessageBox('报料完成', '你的报料已提交，感谢你的参与<br /><a href="http://' + GlobalConfig.Domain + '/newsfeed/" target="_blank">快来看看网友的更多报料</a>');
    }
    _ReportTab.destroy();
}

/*************报料功能结束**************/