var vM =    null;               //地图对象
var vMe =   null;               //鹰眼对象

var _MapWidth = 0;
var _MapHeight = 0;

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
var _PoiPopControl;             //PoiPop

var _MapExpandingState = true;       //标记地图搜索栏收缩状态
var _MapFullScreenState = false;       //标记地图是否为全屏状态
var _IsBeginSelectMark = false;  //是否开始标记
var __IsDrawBusLineState = false; //标记当前是公交站点的画线图层还是换乘的画线图层

var _IconLayer;             //小图标图层
var _LabelLayer;    //E店标签图层
var _EyeIconLayer;           //鹰眼图标图层
var _BusTransferLineLayer;          //公交换乘线图层
var _PopLayer;
var _MarkLayer;
var _BusStationLayer;
var _BuildCoordsLayer; //建筑底框图层
var _UnitCoordsLayer; //户型图层
var _ReportCoordsLayer; //报料图层

var _FloorBuildUnitCoordsLayer;//楼层建筑户型图层

var _BusLineCoordList = [];        //公交线路坐标
var _BusLineData = null;           //公交站点数据
var _BusLineType = 0;              //线路正向还是反向

var _RoadCoords = [];   //道路坐标
var _RoadLineLayer;     //显示道路的图层

var __TradeLabelData = [];         //地图找店请求到显示的数据 ID+数据数组
var __ZoneLabelData = [];

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
    if(typeof vEdushiMap =='undefined' || typeof vEdushiMap.Body.NewMapLayer !='function'  || typeof veyeEdushiMap =='undefined' ||  typeof veyeEdushiMap.Body.NewMapLayer !='function'||( vEdushiMap.Body.MapState.Map!=0&&vEdushiMap.Body.GoogleMap==null))
    {
        setTimeout("fnLoadInit()",50);
        return;
    }
    
    
    vM  = vEdushiMap;
    vMe = veyeEdushiMap;
    vM.$('ZoomBarControl').style.backgroundImage = "url('" + EGIS.ApplictionRootUrl + "/images/ud.gif')";

    window.onresize();
    _IconLayer = vM.NewMapLayer('Icon',269, true);
    _LabelLayer = vM.NewMapLayer('EStoreLabel', 268, true);
    _EyeIconLayer = vMe.NewMapLayer('Icon', 264, true);
    _PopLayer = vM.NewMapLayer('Pop', 269, true);
    _MarkLayer = vM.NewMapLayer('Mark', 265, true); //标记图层
    _BusTransferLineLayer = vM.NewMapLayer('BusTransferLine', 149, true); //公交线路
    _RoadLineLayer = vM.NewMapLayer('RoadLineLayer', 149, true); //道路线路
    _BusStationLayer = vM.NewMapLayer('BusStation', 261, true);
    _UnitCoordsLayer = vM.NewMapLayer('UnitCoordsLayer', 149, true);
    _ReportCoordsLayer = vM.NewMapLayer('ReportCoordsLayer', 160, true);
    _FloorBuildUnitCoordsLayer = vM.NewMapLayer('_FloorBuildUnitCoordsLayer', 145, true); 
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
    //初始化加载包打听
    fnLoadBdtList();
 
    //tmm1显示酒店预订提示功能
    ShowOrderDiv();

    vM.attachEvent(EGIS.KeyWord.EventName.MapZoomChange, function(z) {
        vMe.Zoom(vM.Zoom());
        if (__IsDrawBusLineState) {
            fnShowBusStationIco(_BusLineData, _BusLineType);
        }
        else {
            fnDrawingBusLine(_BusLineCoordList);
        }
        fnDrawingRoadLine(_RoadCoords);
    });

    //地图鹰眼联动
    vMe.attachEvent(EGIS.KeyWord.EventName.MapMoveEnd, function(x, y, flg) {
        if (vM.MapState().Map != 0) {
            if (__IsDrawBusLineState) {
                fnShowBusStationIco(_BusLineData, _BusLineType);
            }
            else {
                fnDrawingBusLine(_BusLineCoordList);
            }
        }
        if (flg == 0) { vM.MoveTo(x, y, true); }
    });
    
    //地图移动
    vM.attachEvent(EGIS.KeyWord.EventName.MapMoveEnd, function(x, y, flg) {
        if (flg == 0) { vMe.MoveTo(x, y, true); }
    });   
    //测距结束
    vM.attachEvent(EGIS.KeyWord.EventName.ScaleEnd, function(dis) {
        fnShowScaleResult(dis);
    });

    //地图双击事件
    vM.attachEvent(EGIS.KeyWord.EventName.MapDblClick, function(e) {
            if (vM.Zoom() > 0) {
                vM.MoveTo(vM.PointerX(), vM.PointerY());
                vMe.MoveTo(vM.PointerX(), vM.PointerY());
                vM.FlatZoom(0);
            }
            else {
                vM.MoveTo(vM.PointerX(), vM.PointerY(), true);
                vMe.MoveTo(vM.PointerX(), vM.PointerY(), true);
            }
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
        }
    });
    vM.attachEvent(EGIS.KeyWord.EventName.Switch3D, function() {
        if (!IsShowRoadLayer) {
            vM.ViewSystemMapLayer(false, 'RoadPicLayer');
        }
        vM.$('ZoomBarControl').style.backgroundImage = "url('" + EGIS.ApplictionRootUrl + "/images/ud.gif')";
        $('CompassNav').innerHTML = '<img src="/Images/CompassIco.gif" alt="指针" />';
        $('CopyrightNav').style.display = '';
        $('EagleMapNav').style.display = 'block';
        fnEyeExpanding($('imgEyeExpanding'), false);
        $('lnkSwichCity').style.display = '';
        vM.ViewSigns(true, 'park');
        vM.ViewSigns(true, 'unit');
        vM.ViewSpotAreas(true);
        vM.ViewSpotLabels(true);
        vM.ViewPlots(true);
        fnResizeBDTList(0);
    });
    vM.attachEvent(EGIS.KeyWord.EventName.Switch2D, function() {
        vM.$('ZoomBarControl').style.backgroundImage = "url('" + EGIS.ApplictionRootUrl + "/images/ZoomBarControl.gif')";
        $('CompassNav').innerHTML = '<img src="/Images/CompassIco1.gif" alt="指针" />';
        $('CopyrightNav').style.display = 'none';
        $('EagleMapNav').style.display = 'none';
        fnEyeExpanding($('imgEyeExpanding'), true);
        $('lnkSwichCity').style.display = 'none';
        vM.ViewSigns(false, 'park');
        vM.ViewSigns(false, 'unit');
        vM.ViewSpotAreas(false);
        vM.ViewSpotLabels(false);
        vM.ViewPlots(false);
        fnResizeBDTList(1);
    });
    vM.attachEvent(EGIS.KeyWord.EventName.SwitchWX, function() {
       vM.$('ZoomBarControl').style.backgroundImage = "url('" + EGIS.ApplictionRootUrl + "/images/ZoomBarControl.gif')";
        $('CompassNav').innerHTML = '<img src="/Images/CompassIco1.gif" alt="指针" />';
        $('CopyrightNav').style.display = 'none';
        $('EagleMapNav').style.display = 'none';
        fnEyeExpanding($('imgEyeExpanding'), true);
        $('lnkSwichCity').style.display = 'none';
        vM.ViewSigns(false, 'park');
        vM.ViewSigns(false, 'unit');
        vM.ViewSpotAreas(false);
        vM.ViewSpotLabels(false);
        vM.ViewPlots(false);
        fnResizeBDTList(2);
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
    
 ///tmm2
  setTimeout(function() { //关闭新功能提示
        fnClosePanel('NewHotelImg');
     }, 5000);
 ///-------------------
    
    ENetwork.DownloadScript('http://www.google-analytics.com/ga.js',function(){
        if(typeof _gat != 'undefined'){
            pageTracker = _gat._getTracker(GlobalConfig.GoogleID);
            pageTracker._initData();
            pageTracker._trackPageview();
        }
    });
    
}
///tmm3

function fnClosePanel(id) {
   if ($(id))
   {
     $(id).style.display = 'none';
   }
}
///

function fnLoadBdtList() {
    if (GlobalConfig.IsBDT == '1') {
        var sUrl = GlobalConfig.EDataCenterUrl + 'Bdt/NewBdtList.aspx?citycode=' + GlobalConfig.CityCode + '&l=' + GlobalConfig.Language + '&' + ENetwork.GetExecutionID();
        ENetwork.DownloadScript(sUrl, function() {
            var arrayHtml = [];
            if (typeof (_BdtList) != 'undefined' && _BdtList.length > 0) {
                for (var i = 0; i < _BdtList.length; i++) {
                    arrayHtml.push('<span><a href="' + GlobalConfig.UserCenterUrl + 'User/Default.aspx?UserID=' + _BdtList[i].LM_ID + '" target="_blank" class="Us">' + _BdtList[i].LM_Nickname + '</a>正在打听：<a href="' + GlobalConfig.WebRootPath + 'bdt/ListedQu.aspx?ID=' + _BdtList[i].LT_ID + '" target="_blank">' + _BdtList[i].LT_Title + '</a></span>');
                }
                $('divBdtList').innerHTML = arrayHtml.join('');
                var marquee = new Marquee('divBdtList', 2);
                marquee.Start();
            }
        });
    }
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
function fnSwichCity() {
    var citylistifrmae = $('iframeCityList');
    if (citylistifrmae) {
        if ($('iframeCityList').style.display != 'none') {
            $('iframeCityList').style.display = 'none';
        }
        else {
            $('iframeCityList').style.display = '';
        }
    }
    else {

        citylistifrmae = document.createElement('IFRAME');
        citylistifrmae.id = 'iframeCityList';
        citylistifrmae.frameBorder = '0';
        citylistifrmae.scrolling = "no";
        citylistifrmae.style.overflow = 'hidden';
        citylistifrmae.allowTransparency = 'true';
        //citylistifrmae.style.display = 'none';
        citylistifrmae.style.width = '640px';
        citylistifrmae.style.height = '358px';
        citylistifrmae.style.position = 'absolute';
        citylistifrmae.style.top = '40px';
        citylistifrmae.style.left = '60px';
        citylistifrmae.style.zIndex = 999;
        citylistifrmae.src = 'CityList.html';
        document.body.appendChild(citylistifrmae);
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
//初始化Pop广告和搜索广告
function fnInitPicAD(){
//    var sADUrl = GlobalConfig.EDataCenterUrl + 'Ad/ImageAd.aspx?domain='+GlobalConfig.Domain+'&l='+GlobalConfig.Language;
//    ENetwork.DownloadScript(sADUrl,function(){
//        if(typeof _StaticAd =='undefined'){
//        alert(_StaticAd);
//            return false;
//        }
//        else{
//            return true;
//        }
//    });
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
function fnAddMarkCss() {
    var MarkCss = vM.$C('link');
    MarkCss.rel = 'stylesheet';
    MarkCss.type = 'text/css';
    MarkCss.href = 'Css/Mark.css';
    vM.Body.document.getElementsByTagName('head')[0].appendChild(MarkCss);
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
function fnBusPopGoogleStat(sTrackName) {
    try {
        pageTracker._trackEvent('Map5.2', '公交点击', sTrackName);
    } catch (e) {
    }
}
function fnCompanyGoogleStat(sTrackName) {
    try {
        pageTracker._trackEvent('Map5.2', '企业点击', sTrackName);
    } catch (e) {
    }
}
//初始化Pop
function fnInitPopControl() {
    //初始化实体Pop
    if (!_EntityPopControl) {
        _EntityPopControl = new EntityPopControl(vM.Body.document);
        _EntityPopControl.ID = vM.AppendEntity(_EntityPopControl.Body, _PopLayer, false, 0, 0, 305, 276, 36, 274, false);
        _EntityPopControl.onLoadComplete = function() {
            fnGetPositionByOID();
            //绑定实体点击事件
            vM.attachEvent(EGIS.KeyWord.EventName.SpotClick, function(spot) {
                if (!_IsBeginSelectMark) {
                    if (_IsBeginSelectBuild) {
                        fnEndGetBuild();
                        _EShopAndCompanyJoinTab.TabBody.contentWindow.EndGetBuild(spot.ID, spot.Name);
                    }
                    else {
                        fnShowEntityPop(spot.ID, spot.Cx * 1, spot.Cy * 1);
                    }
                }
            });
            vM.attachEvent(EGIS.KeyWord.EventName.SpotLabelClick, function(spot) {
                if (!_IsBeginSelectMark) {
                    if (_IsBeginSelectBuild) {
                        fnEndGetBuild();
                        _EShopAndCompanyJoinTab.TabBody.contentWindow.EndGetBuild(spot.ID, spot.Name);
                    }
                    else {
                        fnShowEntityPop(spot.ID, spot.Cx * 1, spot.Cy * 1);
                    }
                }
            });
            vM.attachEvent(EGIS.KeyWord.EventName.SignClick, function(sign) {
                switch (sign.Group) {
                    case 'bus':
                    case 'bus3d':
                        fnShowBusStation(sign.ID, sign.Name, vM.PointerX(), vM.PointerY());
                        break;
                    case 'vir':
                        window.open(GlobalConfig.WebRootPath + 'Vir/Vir.aspx?Image=' + escape(sign.Url), 'vir', 'width=520,height=400');
                        break;
                }
            });
            vM.attachEvent(EGIS.KeyWord.EventName.ContextMenuClick, function(key, wx, wy, mx, my, spot) {
                switch (key) {
                    case 'spot':
                        if (spot) {
                            fnShowEntityPop(spot.ID, spot.Cx * 1, spot.Cy * 1);
                        }
                        break;
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
                        fnGoogleStat('右键：关于eCityMap');
                        fnShowMessageBox('关于eCityMap…', '阿拉丁信息科技有限公司<br />http://www.edushi.com ');
                        break;
                }
            });
        };
        _EntityPopControl.onCavil = function(x, y, id, name) {
        //重写纠错事件
            fnReport(x * 1, y * 1, 0, id, name);
        };
        _EntityPopControl.onCompanyList = function(oid, ocname) {
            fnOpenTab();
            var tab = new TabControl.Tab(document, 'companyList', ocname, '/Fundation/CompanyList.html?ocname=' + escape(ocname) + '&oid=' + oid, true, true, 80);
            fnAddTab(tab);
        };
        _EntityPopControl.onBusTransfer = function(x, y, name) {
            fnShowBusTransfer(x, y, name);
        };
        _EntityPopControl.onNearBySearch = function(x, y, oname) {
            fnShowPeripheralSearch(x, y, oname);
        };
        _EntityPopControl.onNearByBus = function(x, y, oname) {
            fnShowPeripheralBus(x, y, oname);
        };
        _EntityPopControl.onLiveIn = function(id, name) {
            fnEShopAndCompanyJoin(id, name);
        };
        _EntityPopControl.onMergeSearch = function(key) {
            if (_EntityPopControl.Tab != null) {
                _EntityPopControl.Tab.destroy();
            }
            _EntityPopControl.Tab = fnOpenMergeSearch(key, 0, '', 0, 0, 0, 0, 0, '', '',0);
            _EntityPopControl.Tab.onDestroy = function() {
                _EntityPopControl.Tab = null;
            };
        };
    }
    //初始化企业POP
    if (!_CompanyPopControl) {
        _CompanyPopControl = new CompanyPopControl(vM.Body.document);
        _CompanyPopControl.ID = vM.AppendEntity(_CompanyPopControl.Body, _PopLayer, false, 0, 0, 305, 276, 36, 274, false);
        _CompanyPopControl.onLoadComplete = function() {
            //加载完调用企业Pop定位方法
            fnGetPositionByCID();
        };
        //重写纠错事件
        _CompanyPopControl.onCavil = function(x, y, id, name) {
        
            fnReport(x * 1, y * 1, 1, id, name);
        };
        _CompanyPopControl.onBusTransfer = function(x, y, oname) {
            fnShowBusTransfer(x, y, oname);
        };
        _CompanyPopControl.onNearBySearch = function(x, y, oname) {
            fnShowPeripheralSearch(x, y, oname);
        };
        _CompanyPopControl.onNearByBus = function(x, y, oname) {
            fnShowPeripheralBus(x, y, oname);
        };
        _CompanyPopControl.onMergeSearch = function(key, type, tags) {
            if (_CompanyPopControl.Tab != null) {
                _CompanyPopControl.Tab.destroy();
            }
            _CompanyPopControl.Tab = fnOpenMergeSearch(key, 0, '', 0, 0, 0, 0, 0, type, tags,0);
            _CompanyPopControl.Tab.onDestroy = function() {
                _CompanyPopControl.Tab = null;
            };
        };
    }
    if (!_ThemePopControl) {
        _ThemePopControl = new ThemePopControl(vM.Body.document);
        _ThemePopControl.ID = vM.AppendEntity(_ThemePopControl.Body, _PopLayer, false, 0, 0, 305, 276, 36, 274, false);
        _ThemePopControl.onLoadComplete = function() {
            fnGetPositionByTID();
        };
        _ThemePopControl.onCavil = function(x, y, id, name) {
            fnShowDebugControl(x * 1, y * 1, id, name, 1);
        };
        _ThemePopControl.onBusTransfer = function(x, y, oname) {
            fnShowBusTransfer(x, y, oname);
        };
        _ThemePopControl.onNearBySearch = function(x, y, oname) {
            fnShowPeripheralSearch(x, y, oname);
        };
        _ThemePopControl.onNearByBus = function(x, y, oname) {
            fnShowPeripheralBus(x, y, oname);
        };
        _ThemePopControl.onMergeSearch = function(key) {
            if (_ThemePopControl.Tab != null) {
                _ThemePopControl.Tab.destroy();
            }
            _ThemePopControl.Tab = fnOpenMergeSearch(key, 0, '', 0, 0, 0, 0, 0, '', '', 0);
            _ThemePopControl.Tab.onDestroy = function() {
                _ThemePopControl.Tab = null;
            };
        };
    }
    if (!_CommendPopControl) {
        _CommendPopControl = new CommendPopControl(vM.Body.document);
        _CommendPopControl.ID = vM.AppendEntity(_CommendPopControl.Body, _PopLayer, false, 0, 0, 305, 276, 36, 274, false);
    }
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
        _PoiPopControl.onMergeSearch = function(key) {
            if (_PoiPopControl.Tab != null) {
                _PoiPopControl.Tab.destroy();
            }
            _PoiPopControl.Tab = fnOpenMergeSearch(key, 0, '', 0, 0, 0, 0, 0, '', '', 0);
            _PoiPopControl.Tab.onDestroy = function() {
                _PoiPopControl.Tab = null;
            };
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
    if (datatype == 1 || datatype == 2) {
        if (vM.MapState().Map != 0) {
            vM.SwitchMap(0);
        }
        if (cid * 1 > 0) {
            fnShowCompanyPop(cid, x, y);
        }
        else {
            fnShowEntityPop(oid, x, y);
        }
    }
    else if (datatype == 3) {
        vM.SwitchMap(1);
        fnShowEwPoiPop(x, y, name, address, telephone);
    }
    else if (datatype == 4) {
        if (vM.MapState().Map != 0) {
            vM.SwitchMap(0);
        }
        MoveTo(x, y);
        var sUrl = GlobalConfig.EDataCenterUrl + 'CommMap5.0/GetRoadCoords.aspx?domain=' + GlobalConfig.Domain + '&l=' + GlobalConfig.Language + '&road=' + escape(name);
        ENetwork.DownloadScript(sUrl, function() {
            if (typeof __RoadCoords != 'undefined' && __RoadCoords.length > 0) {
                _RoadCoords = __RoadCoords[0].MR_Coords.split(';');
                fnDrawingRoadLine(_RoadCoords);
            }
        });
    }
}
//显示二维POP
function fnShowEwPoiPop(x, y, name, address, telephone)
{
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
//显示实体POP
function fnShowEntityPop(id, x, y) {
    if (id > 0) {
        vM.MoveEntity(_EntityPopControl.ID, x * 1, y * 1);
        MoveTo(x * 1 + vM.GetMapPos(66), y * 1 + vM.GetMapPos(-96), true);
        _EntityPopControl.ShowPop(id);
    }
}
//显示企业Pop
function fnShowCompanyPop(id, x, y) {
    if (id > 0) {
        vM.MoveEntity(_CompanyPopControl.ID, x * 1, y * 1);
        MoveTo(x * 1 + vM.GetMapPos(66), y * 1 + vM.GetMapPos(-96), true);
        _CompanyPopControl.ShowPop(id);
    }
}
//显示主题Pop
function fnShowThemePop(id, x, y) {
    vM.MoveEntity(_ThemePopControl.ID, x * 1, y * 1);
    MoveTo(x * 1 + vM.GetMapPos(66), y * 1 + vM.GetMapPos(-96), true);
    _ThemePopControl.ShowPop(id);
}
//显示推荐Pop根据主题ID
function ShowCommendPopById(id, x, y) {
    vM.MoveEntity(_CommendPopControl.ID, x * 1, y * 1);
    MoveTo(x * 1 + vM.GetMapPos(66), y * 1 + vM.GetMapPos(-96), true);
    _CommendPopControl.ShowPop(id);
}
//显示推荐Pop根据主题标题和内容
function ShowCommendPopByContent(title, content, x, y) {
    vM.MoveEntity(_CommendPopControl.ID, x * 1, y * 1);
    MoveTo(x * 1 + vM.GetMapPos(66), y * 1 + vM.GetMapPos(-96), true);
    _CommendPopControl.ShowPopData(x, y, title, content);
}
//初始化赞助商(新闻)选项卡
function fnLoadNewsList() {
    fnAddADTab();
    fnUrlParse();   //Url定位
    
   ///*********tmm4
    fnAddADHotelTab() ;
    ///
}
//tmm显示酒店预订提示图片
function ShowOrderDiv()
{      
    if (GlobalConfig.HotelState=='1')   
    {
      if ( $('NewHotelImg'))
      {
          $('NewHotelImg').style.display='block';
      }
    }
}
//--------tmm浮云点击
function ShowHotelPage()
{     
    HotelStateList(true);

}

function HotelStateList(IsDefaule)
{
     HotelTab = new TabControl.Tab(document, 'hotellist', '酒店预订', '/Fundation/HotelList.htm', true, IsDefaule, 80);
     fnAddTab(HotelTab);
 
}

function fnAddADHotelTab() 
{
    if (GlobalConfig.HotelState=='1')
     {
         HotelStateList(false);
           
     }
}
///--tmm end

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
//下载常用位置
function fnLoadCommonGoTo() {
    var url = GlobalConfig.EDataCenterUrl + 'Commmap5.0/QuickLink.aspx?domain=' + GlobalConfig.Domain + '&l=' + GlobalConfig.Language;
    ENetwork.DownloadScript(url,
        function() {
            if (typeof QuickLinkList == 'undefined') return false;
            var lastType = -1;
            var sHtml;
            sHtml = '<ul>';
            for (var i = 0; i < QuickLinkList.length; i++) {
                if (lastType != -1 && QuickLinkList[i].Type != lastType) {
                    sHtml += '</ul><div class="Hr"></div><ul><li><a href="javascript:fnCommonGoToClick(QuickLinkList[' + i + ']);">' + QuickLinkList[i].Title + '</a></li>';
                }
                else {
                    sHtml += '<li><a href="javascript:fnCommonGoToClick(QuickLinkList[' + i + ']);">' + QuickLinkList[i].Title + '</a></li>';
                }
                lastType = QuickLinkList[i].Type;
            }
            sHtml += '</ul>';
            $('divQuickLinkList').innerHTML = sHtml;
        }
     );
}
function fnCommonGoToClick(QuickLink) {
    fnGoogleStat('常用位置：' + QuickLink.Title);
    if (QuickLink.Flag == 0) {
        vM.MoveTo(QuickLink.x, QuickLink.y);
    }
    else if (QuickLink.Flag == 1) {
        fnShowEntityPop(QuickLink.OwnerID, QuickLink.x, QuickLink.y);
    }
    else if (QuickLink.Flag == 2) {
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
            sHtml+='<a href="javascript:fnMapSearchByHotkey(\''+arrHotkey[i].MKW_Name+'\',true);">'+arrHotkey[i].MKW_Name+'</a>&nbsp;';
        }
        $('MapHotKeywords').innerHTML = sHtml;
        sHtml = '';
        var arrEShopHotkey = _SearchHotkey.EShopHotKeyWords;
        for(var i=0; i<arrEShopHotkey.length;i++)
        {
            sHtml+='<a href="javascript:fnEShopSearch(\''+arrEShopHotkey[i].MKW_Name+'\',true);">'+arrEShopHotkey[i].MKW_Name+'</a>&nbsp;';
        }
        $('EShopHotKeyWords').innerHTML = sHtml;
    });
}
//主题面板
var _ClassTypeNum=1;
function fnLoadThemeMapsTypeList(){    
    var url= GlobalConfig.EDataCenterUrl + 'CommMap5.0/ThemeMaps.aspx?domain='+GlobalConfig.Domain+'&l='+GlobalConfig.Language+'&req=1';
    ENetwork.DownloadScript(url, function() {
        if (typeof _ThemeMaps == 'undefined') { return false; }
        var t = '';
        for (i = _ThemeMaps.ThemeTypeList.length - 1; i >= 0; i--) {      //杭州主题地图按时间倒序排
            var sCommonIcon = GlobalConfig.PicUrl + 'cn/' + GlobalConfig.CityCode + '/' + GlobalConfig.Language + '/themeImages/' + _ThemeMaps.ThemeTypeList[i].BCT_TypeICO;
            var sFocusIcon = GlobalConfig.PicUrl + 'cn/' + GlobalConfig.CityCode + '/' + GlobalConfig.Language + '/themeImages/' + _ThemeMaps.ThemeTypeList[i].BCT_TypeNoICO;
            t += '<li style="background:url(' + sCommonIcon + ') left top no-repeat;" onmouseover="this.style.backgroundImage=\'url(' + sFocusIcon + ')\';" onmouseout="this.style.backgroundImage=\'url(' + sCommonIcon + ')\';"><a onfocus="this.blur()" href="javascript:fnLoadThemeMapListByTypeId(' + _ThemeMaps.ThemeTypeList[i].BCT_ID + ', \'' + _ThemeMaps.ThemeTypeList[i].BCT_TypeName + '\');">' + _ThemeMaps.ThemeTypeList[i].BCT_TypeName + '</a></li>';
        }
        $('ulThemeList').innerHTML = t;
        fnInitThemeScroll();
    });
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

    if (vM) {
        if (typeof vEdushiMap.Body.GoogleMap != 'undefined' && vEdushiMap.Body.GoogleMap != null) {
            if (vM.MapState().Map != 0) {
                vM.ResizeGoogleMap();
            }
        }
    }
    //选项卡
    fnAttachIframeResize();
    //主题列表
    fnInitThemeScroll();
    fnResizeBDTList();
};
//设置包打听列表宽度
//地图状态
function fnResizeBDTList(state) {
    if (GlobalConfig.IsBDT == '1') {
        if (state == undefined) {
            if (vM) {
                state = vM.MapState().Map;
            }
            else {
                state = 0;
            }
        }
        switch (state) {
            case 0:
                $('BdtScrollBox').style.left = '130px';
                $('BdtScrollBox').style.bottom = '5px';
                $('BdtScrollBoxBg').style.width = _MapWidth - 350 + 'px';
                $('divBdtList').style.width = _MapWidth - 360 + 'px';
                break;
            case 1:
                $('BdtScrollBox').style.left = '80px';
                $('BdtScrollBox').style.bottom = '5px';
                $('BdtScrollBoxBg').style.width = _MapWidth - 400 + 'px';
                $('divBdtList').style.width = _MapWidth - 410 + 'px';
                break;
            case 2:
                $('BdtScrollBox').style.left = '80px';
                $('BdtScrollBox').style.bottom = '25px';
                $('BdtScrollBoxBg').style.width = _MapWidth - 160 + 'px';
                $('divBdtList').style.width = _MapWidth - 170 + 'px';
                break;
        }
    }
}
//添加小图标至地图与鹰眼中
function fnAppendIcon(title, x, y, text, sImgPath, sImgPath2, sFn, w, h, ew, eh, isAppendEye) {
    if (sImgPath2.length == 0) {
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
    if (isAppendEye) {
        var pe = vMe.$C('div');
        pe.innerHTML = iconHTML;
        vMe.AppendEntity(pe, _EyeIconLayer, false, x, y, w, h, ew, eh, false);
        vMe.$(x + '_' + y).onmouseover = function() {
            if (EGIS.Browser.Name == 'MSIE' && EGIS.Browser.Version < 7) {
                this.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + sImgPath2 + '\',sizingMethod=\'image\')';
            }
            else {
                this.style.backgroundImage = 'url(' + sImgPath2 + ')';
            }
        };
        vMe.$(x + '_' + y).onmouseout = function() {
            if (EGIS.Browser.Name == 'MSIE' && EGIS.Browser.Version < 7) {
                this.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + sImgPath + '\',sizingMethod=\'image\')';
            }
            else {
                this.style.backgroundImage = 'url(' + sImgPath + ')';
            }
        };
    }
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
//公交换乘搜索 type 1:从这里出发，2到这里
function fnBusTransferSearch(type, x, y, keyword) {
    if (keyword != '请输入终点' && type == 1 || keyword != '请输入起点' && type == 2) {
        tab = new TabControl.Tab(document, 'search', keyword, '/Fundation/BusTransferSearch.html?action=' + type + '&x=' + x + '&y=' + y + '&key=' + escape(keyword), true, true, 80);
        fnAddTab(tab);
    }
}
//搜索选项切换
function fnSearchChange(oThis) {
    __EdushiSuggest.Hide();
    switch (oThis.id) {
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
function fnBusSearchChange(sValue) {
    __EdushiSuggest.Hide();
    switch (sValue) {
        case '0':
            $('BusTransfer').style.display = 'block';
            $('BusLine').style.display = 'none';
            $('BusStation').style.display = 'none';
            break;
        case '1':
            $('BusLine').style.display = 'block';
            $('BusTransfer').style.display = 'none';
            $('BusStation').style.display = 'none';
            break;
        case '2':
            $('BusStation').style.display = 'block';
            $('BusLine').style.display = 'none';
            $('BusTransfer').style.display = 'none';
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
            case '9':  //是否要判断道路（7）
                maptype = 7;
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
    if (input.value.length > 0 && input.value != __EdushiSuggest.LastKeyword && keyCode != 38 && keyCode != 40 && keyCode != 13)
    {
        if(type == 'eshop')
        {
            var url = GlobalConfig.EDataCenterUrl + 'CommMap5.0/SearchSuggest.aspx?domain=' + GlobalConfig.Domain + '&l=' + GlobalConfig.Language + '&req=6&address=' + escape(input.value) + '&indexversion=6';
            if(maptype == 1)
            {
                url = GlobalConfig.EDataCenterUrl + 'CommMap5.0/SearchSuggest.aspx?domain=' + GlobalConfig.Domain + '&l=' + GlobalConfig.Language + '&req=6&address=' + escape($('txtSearchArea').value) + '&kw=' + escape(input.value) + '&indexversion=6';
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
            var url = GlobalConfig.EDataCenterUrl + 'CommMap5.0/StationSuggest.aspx?req=1&domain=' + GlobalConfig.Domain + '&l=' + GlobalConfig.Language + '&kw=' + escape(input.value) + '&indexversion=6';
            if(maptype == 2)
            {
                url = GlobalConfig.EDataCenterUrl + 'CommMap5.0/StationSuggest.aspx?req=2&domain=' + GlobalConfig.Domain + '&l=' + GlobalConfig.Language + '&kw=' + escape(input.value) + '&indexversion=6';
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
             var url = '';
             if (maptype == 5) {
                 url = GlobalConfig.EDataCenterUrl + 'CommMap5.0/SearchSuggest.aspx?domain=' + GlobalConfig.Domain + '&l=' + GlobalConfig.Language + '&req=' + maptype + '&address=' + escape($('txtSearchPlace').value) + '&kw=' + escape(input.value) + '&indexversion=6';
             }
             else {
                 url = GlobalConfig.EDataCenterUrl + 'CommMap5.0/SearchSuggest.aspx?domain=' + GlobalConfig.Domain + '&l=' + GlobalConfig.Language + '&req=' + maptype + '&kw=' + escape(input.value) + '&indexversion=6';
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
function fnMapSearchChange(sValue) {
    __EdushiSuggest.Hide();
    switch (sValue) {
        case '0':
        case '1':
        case '2':
        case '9':
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
        case '9': //道路搜索
            fnGoogleStat('道路搜索');
            break;
    }
    switch (iMapSearchType) {
        case '0':   //模糊搜索
        case '1':   //名称搜索
        case '2':   //地址搜索
        case '9': //道路搜索
            fnGoogleStat('地址搜索');
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
    _EyeIconLayer.innerHTML = '';
    for (var i = begin; i < end; i++) {
        var x = data[i].X;
        var y = data[i].Y;
        if (data[i].RecordType == 1 || data[i].RecordType == 2 || data[i].RecordType == 4) {
            fnAppendIcon(data[i].OCName, x, y, i + 1, 'Images/VesicleBg.png', 'Images/AlterVesicle.png', 'if(parent.fnShowSearchPop){parent.fnShowSearchPop(' + data[i].OwnerID + ', ' + data[i].CompanyID + ',' + data[i].LST_ID + ',' + x + ', ' + y + ',' + data[i].RecordType + ',\'' + data[i].OCName + '\',\'' + data[i].Address + '\',\'' + data[i].Telephone + '\');}', 41, 33, 7, 32, true);
        }
        else {
            var epoint = vM.GLatLng2EPoint(new EGIS.LatLng(data[i].Lx, data[i].Ly));
            x = epoint.X;
            y = epoint.Y;
            fnAppendIcon(data[i].OCName, x, y, i + 1, 'Images/VesicleBg.png', 'Images/AlterVesicle.png', 'if(parent.fnShowSearchPop){parent.fnShowSearchPop(' + data[i].OwnerID + ', ' + data[i].CompanyID + ',' + data[i].LST_ID + ',' + data[i].Lx + ', ' + data[i].Ly + ',' + data[i].RecordType + ',\'' + data[i].OCName + '\',\'' + data[i].Address + '\',\'' + data[i].Telephone + '\');}', 41, 33, 7, 32, true);
        }
        
    };
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
        fnAppendIcon(data[i].titleNoFormatting, x, y, i + 1 + (page - 1) * 8, 'Images/VesicleBg.png', 'Images/AlterVesicle.png', 'if(parent.fnShowSearchPop){parent.fnShowSearchPop(0, 0,0,' + data[i].lat + ', ' + data[i].lng + ',' + 3 + ',\'' + data[i].titleNoFormatting + '\',\'' + data[i].streetAddress + '\',\'' + phoneNumber + '\');}', 41, 33, 7, 32, true);

    }
}
//主题数据加载结果回调
function onThemeDataLoadComplete(data) {
    _IconLayer.innerHTML = '';
    _EyeIconLayer.innerHTML = '';
    if (data != null) {
        var sThemeImage = 'Images/ThMapIco.png';
        var sThemeOverImage = 'Images/AlterThMapIco.png';
        for (var i = 0; i < data.length; i++) {
            if (data[i].BCC_CompanyID * 1 == 0) {
                fnAppendIcon(data[i].BCC_CompanyName, data[i].X, data[i].Y, i + 1, sThemeImage, sThemeOverImage, 'if(parent.ShowCommendPopById){parent.ShowCommendPopById(' + data[i].BCC_ID + ', ' + data[i].X + ', ' + data[i].Y + ');}', 41, 33, 7, 32, true);
            }
            else {
                fnAppendIcon(data[i].BCC_CompanyName, data[i].X, data[i].Y, i + 1, sThemeImage, sThemeOverImage, 'if(parent.fnShowThemePop){parent.fnShowThemePop(' + data[i].BCC_ID + ', ' + data[i].X + ', ' + data[i].Y + ');}', 41, 33, 7, 32, true);
            }
        }
    }
}
//公交搜索
function fnBusSearch() {
    __EdushiSuggest.Hide();
    var iBusSearchType = GetRadioValue('BusSearchType');
    switch (iBusSearchType) {
        case '0':   //公交换乘搜索
            fnGoogleStat('公交换乘搜索');
            var sStartStation = $('txtBusStart').value.trim();
            if (sStartStation.length < 1) {
                $('txtBusStart').focus();
                return;
            }
            var sEndStation = $('txtBusEnd').value.trim();
            if (sEndStation.length < 1) {
                $('txtBusEnd').focus();
                return;
            }
            if (sStartStation == '起点' || sEndStation == '终点') {
                $('txtBusStart').focus();
                return;
            }
            fnAddBusTransferSearchTab(sStartStation, sEndStation);
            break;
        case '1':   //公交线路搜索
            fnGoogleStat('公交线路搜索');
            var sBusNo = $('txtBusLine').value.trim();
            if (sBusNo.length < 1) {
                $('txtBusLine').focus();
                return;
            }
            if (sBusNo == '请输入要搜索的线路') {
                $('txtBusLine').focus();
                return;
            }
            fnAddBusLineSearchTab(sBusNo);
            break;
        case '2':   //公交站点搜索
            fnGoogleStat('公交站点搜索');
            var sStationName = $('txtBusStation').value.trim();
            if (sStationName.length < 1) {
                $('txtBusStation').focus();
                return;
            }
            if (sStartStation == '请输入站点名') {
                $('txtBusStation').focus();
                return;
            }
            fnAddBusStationSearchTab(sStationName);
            break;
    }
}
function fnAddBusTransferSearchTab(sStartStation, sEndStation) {
    var tab = new TabControl.Tab(document, 'busTransfer', sStartStation + '→' + sEndStation, '/Fundation/BusTransferSearch.html?s=' + escape(sStartStation) + '&e=' + escape(sEndStation) + '&action=0', true, true, 80);
    fnAddTab(tab);
}
function fnAddBusLineSearchTab(sBusNo) {
    var tab = new TabControl.Tab(document, 'BusLineSearch', sBusNo, '/Fundation/BusNoSearch.html?key=' + escape(sBusNo), true, true, 80);
    fnAddTab(tab);
}
function fnAddBusStationSearchTab(sStationName) {
    var tab = new TabControl.Tab(document, 'BusStationSearch', sStationName, '/Fundation/BusStationSearch.html?key=' + escape(sStationName), true, true, 80);
    fnAddTab(tab);
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
//E店搜索
function fnEShopSearch(keyword, isStat) {
    if (isStat) {
        fnGoogleStat('E店搜索');
    }
    __EdushiSuggest.Hide();
    var sThing = '';
    var sAddress = '';
    if (keyword) {
        sThing = keyword;
    }
    else {
        sThing = $('txtSearchThing').value.trim();
        sAddress = $('txtSearchArea').value.trim();
    }
    if (sAddress.length < 1 && sThing.length < 1) {
        $('txtSearchArea').focus();
        return;
    }
    var tab = new TabControl.Tab(document, 'EStoreSearch', sAddress + ' ' + sThing, '/Fundation/FindEstoreResult.html?address=' + escape(sAddress) + '&name=' + escape(sThing), true, true, 80);
    fnAddTab(tab);
}
//黄页搜索
function fnYellowPageSearch() {
    if (typeof keyword =='object') {
        var sKeyword = keyword;
    }
    else {
        var sKeyword = $('txtSearchEShop').value.trim();
    }
    if (sKeyword.length < 1) {
        $('txtSearchEShop').focus();
        return;
    }
    window.open('http://' + GlobalConfig.Domain + '/yp/KeywordSearchList.aspx?Keyword=' + escape(sKeyword), '_blank', '');
}
/*******************end添加选项卡**********************/

//初始化分类主题滚动效果
function fnInitThemeScroll() {
    var w = fnGetWindowWidth();
    var iClipWidth = w * 0.6 - 100;
    $('divThemeMask').style.width = (iClipWidth) + 'px';
    $('divThemeClip').style.clip = 'rect(0px ' + (iClipWidth) + 'px 22px 0px)';
    var ulThemeList = $('ulThemeList');
    var iLen = ulThemeList.childNodes.length;
    var iMaxWidth = 0;
    
    var iStepWidth = 5;
    var hwScroll;
    for (var i = 0; i < iLen; i++) {
        if (ulThemeList.childNodes[i].tagName) {
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
    else {
        $('RollArLf').style.display = 'block';
        $('RollArRgt').style.display = 'block';
    }

    $('ImgThemeScrollLeft').onmouseover = function() {
        $('ImgThemeScrollLeft').style.cursor = 'pointer';
        window.clearInterval(hwScroll);
        hwScroll = setInterval(function() {
            var iLeft = ulThemeList.parentNode.style.left.replace('px', '') * 1;
            if (iLeft + iStepWidth > 0) {
                ulThemeList.parentNode.style.left = '0px';
                window.clearInterval(hwScroll);
            }
            else {
                ulThemeList.parentNode.style.left = (iLeft + iStepWidth) + 'px';
            }
        }, 20);
    };
    $('ImgThemeScrollRight').onmouseover = function() {
        $('ImgThemeScrollRight').style.cursor = 'pointer';
        window.clearInterval(hwScroll);
        hwScroll = setInterval(function() {
            var iLeft = ulThemeList.parentNode.style.left.replace('px', '') * 1;
            if ((iLeft * -1 + iClipWidth + iStepWidth) >= iMaxWidth) {
                ulThemeList.parentNode.style.left = (iClipWidth - iMaxWidth) + 'px';
                window.clearInterval(hwScroll);
            }
            else {
                ulThemeList.parentNode.style.left = (iLeft - iStepWidth) + 'px';
            }
        }, 20);
    };
    $('ImgThemeScrollLeft').onmouseout = function() {
        window.clearInterval(hwScroll);
    };
    $('ImgThemeScrollRight').onmouseout = function() {
        window.clearInterval(hwScroll);
    }
}

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
var IsShowRoadLayer = false;
function fnShowRoadLayer() {
    if (!IsShowRoadLayer) {
        vM.ViewSystemMapLayer(true, 'RoadPicLayer');
    } else {
        vM.ViewSystemMapLayer(false, 'RoadPicLayer');
    }
    IsShowRoadLayer = !IsShowRoadLayer;
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
//鹰眼收缩
function fnEyeExpanding(obj, state) {
    if ($('EagleMapCon').style.display == 'none' && !state) {
        $('EagleMapCon').style.display = 'block';
        obj.src = 'Images/DrawBack.gif';
        if ($('EyeArrow').className == 'SmallArrow') {
            $('EagleMapNav').style.width = '196px';
        }
        else {
            $('EagleMapNav').style.width = '376px';
        }
    }
    else {
        $('EagleMapCon').style.display = 'none';
        obj.src = 'Images/Expanding.gif';
        $('EagleMapNav').style.width = '10px';
    }
}
//改变鹰眼地图尺寸
function fnEyeResize(obj) {
    var w = 180;
    var h = 140;
    if (obj.className == 'SmallArrow') {
        obj.className = 'BigArrow';
        w = 2 * w;
        h = 2 * h;
        $('EagleMapDH').style.paddingTop = '95px';
        $('EagleMapNav').style.width = '376px';
    }
    else {
        $('EagleMapDH').style.paddingTop = '20px';
        obj.className = 'SmallArrow';
        $('EagleMapNav').style.width = '196px';
    }
    obj.parentNode.style.width = w + 'px';
    obj.parentNode.style.height = h + 'px';
    vMe.MapHeight(h);
    vMe.MapWidth(w);
    vMe.Show();
}
//#endregion 页面上固定的按钮的功能
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
//地图移动和鹰眼联动
function MoveTo(x, y,flg,fun) {
    vM.MoveTo(x, y, true,fun);
    vMe.MoveTo(x, y, true);
}
/******************begin:各种URL支持和定位********************/
//企业Pop定位
function fnGetPositionByCID() {
    var cid = fnRequest('cid');
    if (cid != '' && cid * 1 > 0) {
        _CompanyPopControl.ShowPop(cid, true);
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
/*****begin:地图上显示如公交**********************/
//显示公交站信息，id:公交站ID
//定位到公交站并显示线路信息
function fnGotoBusStation(id, name, x, y) {
    if (_BusTransferLineLayer.innerHTML == '') {
        var PopHtml = '<span style="cursor:pointer; height:26px; float:left; font-size:12px; color:#000;white-space:nowrap;{$topwidth}"><span style="cursor:pointer; width:24px; height:24px; float:left; background:url(/Images/gongjiao.gif) no-repeat; text-align:center; padding-top:2px;">1</span><span style="cursor:pointer; height:19px;line-height:19px; background:#fff; padding-right:4px; float:left;{$width};" onclick="parent.fnShowBusStation(' + id + ',\'' + name + '\',' + x + ',' + y + ')">' + name + '</span></span>';
        _BusStationLayer.innerHTML = '';
        var div = vM.$C('div');
        div.innerHTML = PopHtml;
        var vlen = name.length * 12.1;
        vM.AppendEntity(div, _BusStationLayer, false, x, y, vlen + 35, 26, 12, 28, false);
    }
    MoveTo(x, y);
}
function fnShowBusStation(id, name, x, y){
    if (!_BusStationControl){
        _BusStationControl = new BusStationControl(vM.Body.document);
        _BusStationControl.ID = vM.AppendEntity(_BusStationControl.Body, _PopLayer, false, x, y, 305, 200, 0, 38, false);
        _BusStationControl.Width = 305;
        _BusStationControl.Height = 200;
        
        _BusStationControl.ResumeLayout();
        _BusStationControl.onLoadComplete = function(){ 
            _BusStationControl.ShowBusStation(id,name);
        };
        _BusStationControl.onBusClick = function(busid, busname, stationName){
            fnOnBusClick(busid, busname, stationName);
        };
        _BusStationControl.onMergeSearch = function(key) {
        if (_BusStationControl.Tab != null) {
            _BusStationControl.Tab.destroy();
            }
            _BusStationControl.Tab = fnOpenMergeSearch(key, 0, '', 0, 0, 0, 0, 0, '', '', 1);
            _BusStationControl.Tab.onDestroy = function() {
            _BusStationControl.Tab = null;
            };
        };
    }
    else{
        vM.MoveEntity(_BusStationControl.ID, x, y);
        _BusStationControl.ShowBusStation(id,name);
    }
}
function fnOnBusClick(busid, busname, stationName) {
    fnOpenTab();
    tab = new TabControl.Tab(document, 'search', busname, '/Fundation/BusNoSearch.html?stationName=' + escape(stationName) + '&action=1&key=' + busid, true, true, 80);
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
        var PopHtml='<span style="cursor:pointer; height:26px; float:left; font-size:12px; color:#000;white-space:nowrap;{$topwidth}"><span style="cursor:pointer; width:24px; height:24px; float:left; background:url(/Images/gongjiao.gif) no-repeat; text-align:center; padding-top:2px; color:white;">{$No}</span><span style="cursor:pointer; height:19px;line-height:19px; background:#fff; padding-right:4px; float:left;{$width};" onclick="parent.fnShowBusStation({$StationID},\'{$BusStationName}\',{$X},{$Y})">{$BusStationName}</span></span>';
        if(_BusLineType==1){
            var l=_BusLineData.BusUp.length;         
            for(i=0;i<l;i++){
                var oBusUp = _BusLineData.BusUp[i];
                var vlen = oBusUp.StationName.length*12.1;
                var nd = vM.$C('div');
                nd.id='B_pop'+i;
                nd.innerHTML=PopHtml.replace('{$No}',(i+1)).replaceAll('{$BusStationName}',oBusUp.StationName).replace('{$topwidth}','width:'+(vlen+40)+'px').replace('{$width}','width:'+(vlen+10)+'px').replace('{$StationID}',oBusUp.StationID).replace('{$X}',oBusUp.PositionX).replace('{$Y}',oBusUp.PositionY);
                vM.AppendEntity(nd, _BusTransferLineLayer, false, oBusUp.PositionX,oBusUp.PositionY,vlen+35,26,12,28, false);
            }
            if(_BusLineData.UpCoord.length > 0)
            {
                vM.DrawPolyLine(_BusTransferLineLayer, vM.ChangeMapCoordsToBox(_BusLineData.UpCoord), 4, '#ff3300', 0.7);
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
                vM.AppendEntity(nd, _BusTransferLineLayer, false, oBusDown.PositionX,oBusDown.PositionY,vlen+35,26,12,28, false);
            }
            if(_BusLineData.DownCoord.length > 0)
            {
                vM.DrawPolyLine(_BusTransferLineLayer, vM.ChangeMapCoordsToBox(_BusLineData.DownCoord), 4, '#ff3300', 0.7);
            }          
        }
    }
}
function fnDrawingRoadLine(roadCoords) {
    _RoadCoords = roadCoords;
    _RoadLineLayer.innerHTML = '';
    for (var i = 0; i < _RoadCoords.length; i++) {
        var coords = _RoadCoords[i];
        if (coords.length > 0) {
            vM.DrawPolyLine(_RoadLineLayer, vM.ChangeMapCoordsToBox(coords), 4, 'red', 0.7);
        }
    } 
}
/********************begin:公交搜索回调********************/
function fnDrawingBusLine(busLineCoordList) {
    _BusLineCoordList = busLineCoordList;
    _BusTransferLineLayer.innerHTML = '';
    _BusStationLayer.innerHTML = '';
    for (var i = 0; i < _BusLineCoordList.length; i++) {
        var coord = _BusLineCoordList[i];
        vM.DrawPolyLine(_BusTransferLineLayer, vM.ChangeMapCoordsToBox(coord.Coords), coord.Size, coord.Color, coord.Alpha);
        var PopHtml = '<span style="cursor:pointer; height:26px; float:left; font-size:12px; color:#000;white-space:nowrap;{$topwidth}"><span style="cursor:pointer; width:24px; height:24px; float:left; background:url(/Images/gongjiao.gif) no-repeat; text-align:center; padding-top:2px; color:white;">{$No}</span><span style="cursor:pointer; height:19px;line-height:19px; background:#fff; padding-right:4px; float:left;{$width};" onclick="parent.fnShowBusStation({$StationID},\'{$BusStationName}\',{$X},{$Y})">{$BusStationName}</span></span>';
        if (coord.Color == '#FF9900') {
            PopHtml = '<span style="cursor:pointer; height:26px; float:left; font-size:12px; color:#000;white-space:nowrap;{$topwidth}"><span style="cursor:pointer; width:24px; height:24px; float:left; background:url(/Images/gongjiao2.gif) no-repeat; text-align:center; padding-top:2px; color:white;">{$No}</span><span style="cursor:pointer; height:19px;line-height:19px; background:#fff; padding-right:4px; float:left;{$width};" onclick="parent.fnShowBusStation({$StationID},\'{$BusStationName}\',{$X},{$Y})">{$BusStationName}</span></span>';
        }
        for (var j = 0; j < coord.PassStation.length; j++) {
            var vlen = coord.PassStation[j].StationName.length * 12.1;
            var nd = vM.$C('div');
            nd.innerHTML = PopHtml.replace('{$No}', (j + 1)).replaceAll('{$BusStationName}', coord.PassStation[j].StationName).replace('{$topwidth}', 'width:' + (vlen + 40) + 'px').replace('{$width}', 'width:' + (vlen + 10) + 'px').replace('{$StationID}', coord.PassStation[j].StationID).replace('{$X}', coord.PassStation[j].PositionX).replace('{$Y}', coord.PassStation[j].PositionY);
            vM.AppendEntity(nd, _BusTransferLineLayer, false, coord.PassStation[j].PositionX, coord.PassStation[j].PositionY, vlen + 35, 26, 12, 28, false);
        }
    }
}
/********************end:公交搜索回调**********************/
function fnOpenMergeSearch(key, lst_id, domain, cid, vid, tid, card, vip,type,tags,adtype) {
    fnOpenTab();
    var tab = new TabControl.Tab(document, 'MergeSearch', key, '/Fundation/MergeSearch.aspx?key=' + escape(key) + '&lst_id=' + lst_id + '&domain=' + domain + '&cid=' + cid + '&vid=' + vid + '&tid=' + tid + '&card=' + card + '&vip=' + vip + '&type=' + type + '&tags=' + tags + '&adtype=' + adtype, true, true, 80);
    fnAddTab(tab);
    return tab;
}
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
var _IsBeginSelectBuild = false;
var _EShopAndCompanyJoinTab = null;
//开始入驻
function fnEShopAndCompanyJoin(oid,oname) {
    fnOpenTab();
    if (!oid) {
        oid = 0;
    }
    if (!oname) {
        oname = '';
    }
    var url = '/Fundation/Company3DJoin.aspx?oid=' + oid + '&oname=' + oname;
    if (!_TabControl.ExistTab(url)) {
        _EShopAndCompanyJoinTab = new TabControl.Tab(document, 'Company3DJoin', '我要入驻', url, true, true, 80);
        fnAddTab(_EShopAndCompanyJoinTab);
        _EShopAndCompanyJoinTab.onDestroy = function() {
            _EShopAndCompanyJoinTab = null;
            fnEndGetBuild();
        };
    }
}

//开始获取入驻建筑
function fnStartGetBuild() {
    fnEndGetBuild();
    _IsBeginSelectBuild = true;
    vM.ShowPointerTip('<div style="font-size:12px;height:16px;white-space: nowrap; position: absolute; border: 1px solid #333333; padding: 2px; background-color: #ffffcc">单击你要入驻的实体建筑</div>',1,15);
}
//画建筑底框结束
function fnEndGetBuild() {
    _IsBeginSelectBuild = false;
    vM.HidePointerTip();
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

//开始画户型
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