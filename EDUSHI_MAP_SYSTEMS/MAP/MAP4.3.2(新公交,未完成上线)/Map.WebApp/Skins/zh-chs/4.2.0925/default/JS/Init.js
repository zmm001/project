
//全局变量定义
var cSearchControl;             //搜索面板控件
var cSearchResultControl;       //搜索结果列表控件
var cEntityPopControl;          //泡泡控件
var cThemePopControl;           //主题泡泡
var cCommendPopControl;         //推荐泡泡
var cCityListControl;           //城市列表
var cNavigationControl;         //导航图
var cDebugControl;              //纠错控件
var cPaneSearchControl;         //拉框搜索
var cFromSearchControl;         //从这里出发搜索控件
var cToSearchControl;           //到这里搜索控件
var cPeripheralBusControl;      //周边公交控件
var cBusStationControl;         //公交站点信息控件
var cPeripheralSearchControl;   //周边搜索控件
var cRotaryPictureControl;      //视窗控件

var _PopLayer;
var _PaneLayer;
var _IconLayer;
var _BusLayer; 
var _MarkLayer;     
var _EyeIconLayer;           

var vM =    null;               //地图对象
var vMe =   null;               //鹰眼对象
var _isBeginSelectMark = false;  //是否开始选择标记点位置
var _isBeginScale = false;


function fnLoadInit(){
    //加载对象
    if(typeof vEdushiMap =='undefined' || typeof veyeEdushiMap=='undefined' || typeof vEdushiMap.Body.NewMapLayer !='function' || typeof veyeEdushiMap.Body.NewMapLayer !='function' )
    {
        setTimeout("fnLoadInit()",50);
        return;
    }

    vM  = vEdushiMap;
    vMe = veyeEdushiMap;
    
    window.onresize=function(){
        var h = fnGetWindowHeight(),w = fnGetWindowWidth();
	    $('EdushiMap').style.Width = w + 'px';
        $('EdushiMap').style.Height = h + 'px';
        document.body.style.Height = h + 'px';
        vM.MapHeight(h-63);
        vM.MapWidth(w);
        
        $('divThemeMask').style.width = w - 390 + 'px';
        $('divThemeClip').style.clip = 'rect(0 ' + (w - 390)*1 + 'px 22px 0)';
        fnInitThemeList();
    };
    window.onresize();
    
    _PopLayer = vM.NewMapLayer('Pop',269, 0);
    _IconLayer = vM.NewMapLayer('Icon', 268, 0);
    _PaneLayer = vM.NewMapLayer('Pane', 267, 0);
    _BusLayer = vM.NewMapLayer('Bus', 266, 0);
    _MarkLayer = vM.NewMapLayer('Mark', 265, 0);
    
    _EyeIconLayer = vMe.NewMapLayer('Icon', 264, 0);
    
    //绑定鹰眼事件
    var EyeZB = new fnZoomBar();
    EyeZB.Init();
    vM.onMapZoomChange = function(z){
      EyeZB.ZoomBarSignPos(vM.Zoom());
      vMe.FlatZoom(vM.Zoom());
    };
    vM.onPaneEnd = function (x1,y1,x2,y2,flg){
        if(flg==0){
           fnShowPaneSearch(x1,y1,x2,y2);
        }        
    };
    vM.onScaleEnd = function(dis){
        alert('本次测距总长： ' + dis + '。\r\n以上数据仅供参考，请以实际长度为准。');
    };
    vM.onMapMouseUp = function(e){
        if (_isBeginSelectMark){
            _Mark.Mark(vM.PointerX(),vM.PointerY(),'');
        }
    };
    vM.onMapDblClick = function(e){
        if (!_isBeginScale){
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
        _isBeginScale = false; 
    };
    vMe.onMapMoveEnd = function(x,y,flg){
        if(flg==0){vM.MoveTo(x,y,true);}
    };
    //地图移动
    vM.onMapMoveEnd = function(x,y,flg){
        if(flg==0){vMe.MoveTo(x,y,true);}
    };
    fnLoadHotKey();             //热门关键字
    fnLoadPopSearchListAD();    //加载搜索结果、Pop广告
    
    //初始化各种控件
    fnInitSearchResult();
    fnInitPop();
    fnAddMarkCss();     //加载标记控件样式 
    _Mark.Load();
    
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
    setTimeout("fnLoadRotaryPicture()", 3000);  //视窗广告

    ENetwork.DownloadScript('http://www.google-analytics.com/urchin.js',function(){
        _uacct = GlobalConfig._GoogleID;
        urchinTracker();
    });
    //$('BGLoading').style.display = 'none';
    //fnScrollBG(20);
    
    DefaultLoadNavigation();
}

//默认加载导航图
function DefaultLoadNavigation()
{
   if(typeof(GlobalConfig._NavigationCityCode) != 'undefined')
   { 
       if (GlobalConfig._NavigationCityCode.indexOf(GlobalConfig._CityCode) >= 0)
       {
             fnShowNav(); 
       }
   }
}

function fnScrollBG(hp)
{
    var h = $('BG').style.height.replace('px', '') * 1;
    h -= hp;
    if (h > 0)
    {
        $('BG').style.height = h + 'px';
        setTimeout(function(){fnScrollBG(hp);}, 30);
    }
    else
    {
        $('BG').style.display = 'none';
    }
}

function fnAddMarkCss()
{
    var MarkCss=vM.$C('link');
    MarkCss.rel='stylesheet';
    MarkCss.type = 'text/css';
    //MarkCss.href='http://localhost/MAP4.2/skins/zh-chs/4.2.0925/default/css/Mark.css';
    MarkCss.href=GlobalConfig._CssPath+'Mark.css';
    vM.Body.document.getElementsByTagName('head')[0].appendChild(MarkCss);
}
//泡泡控件
function fnInitPop(){
   if (!cEntityPopControl){
        cEntityPopControl = new EntityPopControl({Parent:vM});
        cEntityPopControl.ID = vM.appendEntity(cEntityPopControl.Body, _PopLayer, false, 0, 0, 345,340,0,135, false);
        cEntityPopControl.onLoadComplete  = function()
        {
            //各种定位
            fnEaddGoto('');
            fnOCGoto();
            fnMarkGoto();
            
            //加载快速定位列表
            fnLoadQuickLink();
            
            //绑定实体点击事件
            vM.onSpotClick = function(spot){
                if (!_isBeginSelectMark){
                    fnShowEntityPop(spot.ID, spot.CenterX, spot.CenterY); 
                }
            };
            vM.onSpotLabelClick = function(spot){
                if (!_isBeginSelectMark){
                    fnShowEntityPop(spot.ID, spot.CenterX, spot.CenterY);  
                }
            };
            vM.onSignClick = function(sign){
                switch (sign.SortKey){
                    case 'bus':
                        fnShowBusStation(sign.ID);
                        break;
                    case 'vir':
                        window.open(GlobalConfig._WebRootPath + 'Vir/Vir.aspx?Image=' + escape(sign.Url), 'vir', 'width=520,height=400');
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
                        fnShowFromHereSearch();
                        break;
                    case 'end':
                        fnShowToHereSearch();
                        break;    
                    case 'cirbus':
                        fnShowPeripheralBus();
                        break;  
                    case 'cirsearch':
                        fnShowPeripheralSearch();
                        break;  
                    case 'errors':
                        if (spot){
                            fnShowDebugControl(vM.PointerX(),vM.PointerY(), spot.ID, spot.Title, 0);
                        }
                        else{
                            fnShowDebugControl(vM.PointerX(),vM.PointerY(), 0, '', 0);
                        }    
                        break;    
                    case 'sign':
                        if (spot){
                            _Mark.Mark(vM.PointerX(),vM.PointerY(),spot.Title);
                        }
                        else{
                            _Mark.Mark(vM.PointerX(),vM.PointerY(),'');
                        }
                        break; 
                    case 'about':
                        alert('阿拉丁信息科技有限公司\r\nhttp://www.edushi.com ');
                        break;
                }
            };
        }
        cEntityPopControl.MoveTo(0, 0); 
        //Pop控件对外提供的事件的重写
        cEntityPopControl.onBusIDSearch  = function(nID,sName)
        {
            cSearchResultControl.BusIDSearch(nID,sName);
        };
        cEntityPopControl.onBusSEXYSearch = function(action,x,y,sKeyword)
        {
            cSearchResultControl.BusSEXYSearch(action,x,y,sKeyword);
        };
        cEntityPopControl.onLocalNearBySearch = function(sKeyword,x,y,len)
        {                   
            cSearchResultControl.LocalNearBySearch(sKeyword,x,y,len);
        };
        cEntityPopControl.onHistorySaved = function(type, spot)
        {
            fnSaveHistory(type, spot);
        };
        cEntityPopControl.onSign = function(x, y,sName)
        {
            cEntityPopControl.Hide();
             _Mark.Mark(x, y,sName);
        };
        cEntityPopControl.onCavil = function(type,nID,sName,x, y)
        {
            cEntityPopControl.Hide();
            if (type != 1){
                type = 0;
            }
            fnShowDebugControl(x*1, y*1, nID, sName, type);
        };
    }
    //主题泡泡初始化
    if (!cThemePopControl){
        cThemePopControl = new ThemePopControl({Parent:vM});
        cThemePopControl.ID = vM.appendEntity(cThemePopControl.Body, _PopLayer, false, 0, 0, 345,300,0,135, false);
        cThemePopControl.MoveTo(0, 0); 
        //Pop控件对外提供的事件的重写
        cThemePopControl.onBusIDSearch  = function(nID,sName)
        {
            cSearchResultControl.BusIDSearch(nID,sName);
        };
        cThemePopControl.onBusSEXYSearch = function(action,x,y,sKeyword)
        {
            cSearchResultControl.BusSEXYSearch(action,x,y,sKeyword);
        };
        cThemePopControl.onLocalNearBySearch = function(sKeyword,x,y,len)
        {                   
            cSearchResultControl.LocalNearBySearch(sKeyword,x,y,len);
        };
        cThemePopControl.onHistorySaved = function(type, spot)
        {
            fnSaveHistory(type, spot);
        };
        cThemePopControl.onSign = function(x, y,sName)
        {
            cThemePopControl.Hide();
             _Mark.Mark(x, y,sName);
        };
        cThemePopControl.onCavil = function(type,nID,sName,x, y)
        {
            cThemePopControl.Hide();
            if (type != 1){
                type = 0;
            }
            fnShowDebugControl(x*1, y*1, nID, sName, type);
        };
    }
    //推荐泡泡初始化
    if (!cCommendPopControl){
        cCommendPopControl = new CommendPopControl({Parent:vM});
        cCommendPopControl.ID = vM.appendEntity(cCommendPopControl.Body, _PopLayer, false, 0, 0, 398,300,0,135, false);
        cCommendPopControl.MoveTo(0, 0);
    }
}
//显示实体泡泡
function fnShowEntityPop(id,x,y){
    vM.MoveTo(x*1 + vM.GetMapPos(170), y*1, true);
    vMe.MoveTo(x*1 + vM.GetMapPos(170), y*1, true);
    cEntityPopControl.CID = '';
    if(cEntityPopControl.OID!=id){
        cEntityPopControl.Hide();
        setTimeout(function(){
           vM.moveEntity(cEntityPopControl.ID, x*1, y*1);
            cEntityPopControl.ShowEntityPop(id);   
        }, 100);  
    }
    else{
        
        vM.moveEntity(cEntityPopControl.ID, x*1, y*1);
        cEntityPopControl.Show();
    }
}
//显示企业泡泡
function fnShowCompanyPop(id,x,y){
    vM.MoveTo(x*1 + vM.GetMapPos(170), y*1, true);
    vMe.MoveTo(x*1 + vM.GetMapPos(170), y*1, true);
    cEntityPopControl.OID = '';
    if(cEntityPopControl.CID!=id){
        cEntityPopControl.Hide(); 
        setTimeout(function(){
           vM.moveEntity(cEntityPopControl.ID, x*1, y*1);
            cEntityPopControl.ShowComanyPop(id);   
        }, 100); 
    }
    else{
        vM.moveEntity(cEntityPopControl.ID, x*1, y*1);
        cEntityPopControl.Show();
    }
}
//显示主题泡泡
function fnShowThemePop(id,x,y){
    vM.MoveTo(x*1 + vM.GetMapPos(170), y*1, true);
    vMe.MoveTo(x*1 + vM.GetMapPos(170), y*1, true);
    if(cThemePopControl.TID!=id){
        cThemePopControl.Hide(); 
        setTimeout(function(){
           vM.moveEntity(cThemePopControl.ID, x*1, y*1);
            cThemePopControl.ShowThemePop(id);   
        }, 100); 
    }
    else{
        vM.moveEntity(cThemePopControl.ID, x*1, y*1);
        cThemePopControl.Show();
    }
}
//显示推荐泡泡
function fnShowCommendPop(sTitle, sContent, x, y)
{
    vM.MoveTo(x*1 + vM.GetMapPos(170), y*1, true);
    vMe.MoveTo(x*1 + vM.GetMapPos(170), y*1, true);
    cCommendPopControl.Hide(); 
    setTimeout(function(){
       vM.moveEntity(cCommendPopControl.ID, x*1, y*1);
        cCommendPopControl.ShowCommendPop(sTitle, sContent);   
    }, 100);
}

//搜索面板控件呈现
function fnShowSearchControl(){
    if (!cSearchControl){
        cSearchControl = new SearchControl();
        $('Tool').appendChild(cSearchControl.Body);
        cSearchControl.Width = 303;
        cSearchControl.Height = 117;
        cSearchControl.ResumeLayout();
        
        cSearchControl.onLocalSearch = function(sKeyword, iType, sAddress){
            cSearchResultControl.LocalSearch(sKeyword, iType, sAddress);
        };
        cSearchControl.onBusSearch = function(iType, param1, param2){
            cSearchResultControl.BusSearch(iType, param1, param2);
        };
        //黄页搜索
        cSearchControl.onYellowPageSearch = function(sKeyword){
             window.open('http://' + GlobalConfig._AppDomain + '/yp/KeywordSearchList.aspx?Keyword=' + escape(sKeyword), '_blank', '');
        };
    }
    cSearchControl.Show();
}

//搜索列表控件初始化
function fnInitSearchResult(){
    if (!cSearchResultControl){
        cSearchResultControl = new SearchResultControl();
        $('DragWindow').appendChild(cSearchResultControl.Body);
        cSearchResultControl.Body.style.zIndex = 999;
        cSearchResultControl.Width = 303;
        cSearchResultControl.Height = 418;
        cSearchResultControl.ResumeLayout();
        cSearchResultControl.MoveTo(0, 0);
        cSearchResultControl.onLoadComplete = function(){
            //当搜索列表控件载入完成时载入下面的触发控件
            fnShowSearchControl(); //搜索面板
            fnLoadRandomTopics();   //都市烩随机贴子
            fnLoadNews();   //滚动新闻
            fnLoadEdushiAnnounce(); //全局公告
            fnLoadPro();    //主题面板
            fnDragControl($('DragWindow'), 20, 30);     
            fnDragControl($('Tool'), 20, 30);
            fnUrlGoto();    //与搜索列表面板相关的定位
        };
        //搜索结果页卡对外提供的实体点击
        cSearchResultControl.onEntityClick = function(oid,cid,x,y)
        {
            if(cid==0)
            {
                fnShowEntityPop(oid,x,y);
            }
            else
            {
                fnShowCompanyPop(cid,x,y);
            }
        };
        //主题地图点击
        cSearchResultControl.onThemeClick = function(tid,x,y)
        {
            fnShowThemePop(tid, x, y);
        };
        //推荐泡泡
        cSearchResultControl.onVouchClick = function(title, content, x, y)
        {
            fnShowCommendPop(title, content, x, y);
        };
        //搜索图标
        cSearchResultControl.onLocalDataLoad = function(arrLocalData, nBegin, nEnd){
            _IconLayer.innerHTML = '';
            _EyeIconLayer.innerHTML = '';
            for (var i=nBegin; i<nEnd; i++)
            {
                if (arrLocalData.CompanyID[i] > 0)
                {
                    fnAppendIcon(arrLocalData.x[i], arrLocalData.y[i], i+1, GlobalConfig._ImgPath + '12-22.gif', GlobalConfig._ImgPath + 'iconflash.gif', 'parent.fnShowCompanyPop('+arrLocalData.CompanyID[i]+', ' + arrLocalData.x[i] + ', ' + arrLocalData.y[i] + ');',27,37,13,27);
                }
                else
                {
                    fnAppendIcon(arrLocalData.x[i], arrLocalData.y[i], i+1, GlobalConfig._ImgPath + '12-22.gif', GlobalConfig._ImgPath + 'iconflash.gif', 'parent.fnShowEntityPop('+arrLocalData.OwnerID[i]+', ' + arrLocalData.x[i] + ', ' + arrLocalData.y[i] + ');',27,37,13,27);
                }
            }
        };
        //主题图标
        cSearchResultControl.onClassDataLoad = function(arrClassData,nBegin,nEnd){
            _IconLayer.innerHTML = '';
            _EyeIconLayer.innerHTML = '';
            var sImgUrl = GlobalConfig._PicUrl + GlobalConfig._Country+'/'+GlobalConfig._CityCode+'/'+GlobalConfig._L+'/themeImages/';
            for (var i=nBegin; i<nEnd; i++)
            {
                if (arrClassData.ComIco[i].length > 0)
                {
                    var sThemeImage = sImgUrl + 'BBLCompany/' + arrClassData.ComIco[i]; 
                    var sThemeImage2 = sThemeImage;
                }
                else
                {
                    var sThemeImage = sImgUrl + arrClassData.CommIco[i];
                    var sThemeImage2 = sImgUrl + arrClassData.FocusIco[i];
                }
                fnAppendIcon(arrClassData.x[i], arrClassData.y[i], '', sThemeImage, sThemeImage2, 'parent.fnShowThemePop('+arrClassData.ID[i]+', ' + arrClassData.x[i] + ', ' + arrClassData.y[i] + ');',26,26,13,13);
            }
        };
        //公交图标 type:1-正向 0-反向
        cSearchResultControl.onBusDataLoad = function(arrBusData, type){
            _BusLayer.innerHTML='';
            if(arrBusData!=null)
            {
                var coords = [];
                var PopHtml='<span style="cursor:pointer; height:26px; float:left; font-size:12px; color:#000;white-space:nowrap;{$topwidth}"><span style="cursor:pointer; width:24px; height:24px; float:left; background:url(' + GlobalConfig._ImgPath + 'gongjiao.gif) no-repeat; text-align:center; padding-top:2px;">{$No}</span><span style="cursor:pointer; height:19px;line-height:19px; background:#fff; padding-right:4px; float:left;{$width};">{$BusStationName}</span></span>';
                if(type==1){
                    var l=arrBusData.Bus_BN_UP_BS_StationName_Js.length;
                    for(i=0;i<l;i++){
                        var vlen = arrBusData.Bus_BN_UP_BS_StationName_Js[i].length*12.1;
                        var nd = vM.$C('div');
                        nd.id='B_pop'+i;
                        nd.innerHTML=PopHtml.replace('{$No}',(i+1)).replace('{$BusStationName}',arrBusData.Bus_BN_UP_BS_StationName_Js[i]).replace('{$topwidth}','width:'+(vlen+40)+'px').replace('{$width}','width:'+(vlen+10)+'px');
                        vM.appendEntity(nd, _BusLayer, false, arrBusData.Bus_Bs_UpX_Js[i],arrBusData.Bus_Bs_UpY_Js[i],vlen+35,26,12,28, false);
                        coords.push(vM.GetWinPos(arrBusData.Bus_Bs_UpX_Js[i]));
                        coords.push(vM.GetWinPos(arrBusData.Bus_Bs_UpY_Js[i]));
                    }
                }else{
                    var l=arrBusData.Bus_BN_Down_BS_StationName_Js.length;           
                    for(i=0;i<l;i++){
                        var vlen = arrBusData.Bus_BN_Down_BS_StationName_Js[i].length*12.1;
                        var nd = vM.$C('div');
                        nd.id='B_pop'+i;
                        nd.innerHTML=PopHtml.replace('{$No}',(i+1)).replace('{$BusStationName}',arrBusData.Bus_BN_Down_BS_StationName_Js[i]).replace('{$topwidth}','width:'+(vlen+40)+'px').replace('{$width}','width:'+(vlen+10)+'px');
                        vM.appendEntity(nd, _BusLayer, false, arrBusData.Bus_Bs_DownX_Js[i],arrBusData.Bus_Bs_DownY_Js[i],vlen+35,26,12,28, false);
                        coords.push(vM.GetWinPos(arrBusData.Bus_Bs_DownX_Js[i]));
                        coords.push(vM.GetWinPos(arrBusData.Bus_Bs_DownY_Js[i]));
                    }           
                }
//                if (vM.Zoom() == 3){
//                    vM.DrawPolyLine(_BusLayer, coords.join(','), 1, '#ff0000', 80);
//                }
            }
        };
        //公交站定位
        cSearchResultControl.onGoToXY = function(x, y){
            if (x && y){
                vM.MoveTo(x, y, true);
                vMe.MoveTo(x, y, true);
            }
        };
    }
    else
    {
        cSearchResultControl.Show();
    }
}
//添加小图标至地图与鹰眼中
function fnAppendIcon(x, y, text, sImgPath, sImgPath2, sFn, w, h, ew, eh, sEyeImg){
    if (sImgPath2.length == 0)
    {
        sImgPath2 = sImgPath;
    }
    var p = vM.$C('div');
    p.innerHTML = '<div onmouseover="this.style.backgroundImage=\'url(' + sImgPath2 + ')\';" onmouseout="this.style.backgroundImage=\'url(' + sImgPath + ')\';" style="background-image:url(' + sImgPath + '); background-repeat:no-repeat;width:' + w + 'px; height:' + h + 'px; text-align:center; padding-top:5px; cursor:pointer;" onclick="' + sFn + '"><a >'+ text +'</a></div>';
    vM.appendEntity(p, _IconLayer, false, x, y, w,h,ew,eh, false);
    var pe = vMe.$C('div');
    if (sEyeImg && sEyeImg.length > 0){
        pe.innerHTML = '<div style="background-image:url(' + sEyeImg + '); background-repeat:no-repeat;width:' + w + 'px; height:' + h + 'px; text-align:center; padding-top:5px; cursor:pointer;" onclick="' + sFn + '"><a >'+ text +'</a></div>';
    }
    else{
        pe.innerHTML = p.innerHTML;
    }
    vMe.appendEntity(pe, _EyeIconLayer, false, x, y, w,h,ew,eh, false);
}

//主题面板
var _ClassTypeNum=1;
function fnLoadPro(){
    var url= GlobalConfig._DataCenterUrl + 'CommMap/themeInfo.aspx?node='+GlobalConfig._Node+'&viewxml=&req=1&v=1.0';
    ENetwork.DownloadScript(url,function(){
        if(typeof ThemeMapsList=='undefined'||ThemeMapsList==null)return false;
        var t='';
        for(i=0;i<=ThemeMapsList.ID.length-1;i++){      //杭州主题地图按时间倒序排
            var sCommonIcon = GlobalConfig._PicUrl + GlobalConfig._Country+'/'+GlobalConfig._CityCode+'/'+GlobalConfig._L+'/themeImages/'+ThemeMapsList.CommIco[i];
            var sFocusIcon = GlobalConfig._PicUrl + GlobalConfig._Country+'/'+GlobalConfig._CityCode+'/'+GlobalConfig._L+'/themeImages/'+ThemeMapsList.FocusIco[i];
            t+= '<li style="background:url(' + sCommonIcon + ') left center no-repeat;" onmouseover="this.style.backgroundImage=\'url('+ sFocusIcon + ')\';" onmouseout="this.style.backgroundImage=\'url(' +sCommonIcon + ')\';"><a onfocus="this.blur()" href="javascript:fnLoadProById(' + ThemeMapsList.ID[i] + ', \'' + ThemeMapsList.TypeName[i] + '\');">' + ThemeMapsList.TypeName[i] + '</a></li>';
        }
        $('ulThemeList').innerHTML = t;
        fnInitThemeList();
        
        //主题URL参数定位
        var tid = fnRequest('tid');       
        var tname = fnRequest('tname');
        if (tid != '' & tname != '')
        {
            fnLoadProById(tid, unescape(tname));       
        }
        
        var tpop = fnRequest('tpop');
        if (tpop != '')
        {
            fnShowThemePop(tpop, fnRequest('x')*1, fnRequest('y')*1);
        }
    });
}
//显示某个特定主题分类
function fnLoadProById(Tid,Tname){
    cSearchResultControl.ClassSearch(Tid, Tname);
}
//初始化分类主题滚动效果
function fnInitThemeList()
{
    var ulThemeList = $('ulThemeList');
    var iLen = ulThemeList.childNodes.length;
    var iMaxWidth = 0;
    var iClipWidth = fnGetWindowWidth()-390;
    var iStepWidth = 5;
    var hwScroll;
    for (var i=0; i<iLen; i++)
    {
        if (ulThemeList.childNodes[i].tagName)
        {
            iMaxWidth += ulThemeList.childNodes[i].clientWidth + 4; //4像素是li的margin
        }
    }
    
    if (iMaxWidth <= iClipWidth)    //自适应浏览器分辨率
    {
        $('btnThemeScrollLeft').style.display = 'none';
        $('btnThemeScrollRight').style.display = 'none';
        ulThemeList.parentNode.style.left = '0px';
        return;
    }
    else
    {
        $('btnThemeScrollLeft').style.display = 'block';
        $('btnThemeScrollRight').style.display = 'block';
    }
    
    //alert(iMaxWidth);
    $('btnThemeScrollLeft').onmouseover = function(){
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
    }
    $('btnThemeScrollRight').onmouseover = function(){
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
    }
    $('btnThemeScrollLeft').onmouseout = function(){
        window.clearInterval(hwScroll);
    }
    $('btnThemeScrollRight').onmouseout = function(){
        window.clearInterval(hwScroll);
    }
}
//快速定位
function fnLoadQuickLink(){
     var url=GlobalConfig._EDataCenterUrl + 'Commmap/QuickLink.aspx?node='+GlobalConfig._Node+'&l='+GlobalConfig._L+'&v=1.0';
     ENetwork.DownloadScript(url,
        function(){
            for (var i=0; i<QuickLinkList.length; i++)
            {
                var link = document.createElement('a');
                link.href = 'javascript:;';
                link.DataSource = QuickLinkList[i];
                link.onclick = function(){
                    if (this.DataSource.Flag == 0){
                        vM.MoveTo(this.DataSource.x, this.DataSource.y);
                    }
                    else if (this.DataSource.Flag == 1){
                        fnShowEntityPop(this.DataSource.OwnerID, this.DataSource.x, this.DataSource.y);
                    }
                    else if (this.DataSource.Flag == 2){
                        fnShowCompanyPop(this.DataSource.CompanyID, this.DataSource.x, this.DataSource.y);
                    }
                }
                link.innerHTML = QuickLinkList[i].Title;
                $('ulQickLinkList').appendChild(link);
            }
        }
     );    
}

//城市列表控件
function fnShowCityList(){
    if (!cCityListControl){
        cCityListControl = new CityListControl();
        cCityListControl.onClose = function(){
            $('BG').style.display='none';
        };
        document.body.appendChild(cCityListControl.Body);
    }
    cCityListControl.Width = 800;
    cCityListControl.Height = 620;
    cCityListControl.ResumeLayout();
    
    var h = fnGetWindowHeight(),w = fnGetWindowWidth(); 
    cCityListControl.Body.style.display='block';       
    cCityListControl.Body.style.left=(w-cCityListControl.Body.offsetWidth)/2;
    var t=(h-cCityListControl.Body.offsetHeight)/2;
    if(t<0){
        cCityListControl.Body.style.top='0px';
    }else{
        cCityListControl.Body.style.top=t;
    }
    
    cCityListControl.Body.style.zIndex = 1001;
    cCityListControl.MoveTo((w-cCityListControl.Width)/2, 100);
    cCityListControl.Show();
    
    $('BG').style.display = 'block';
    $('BG').style.height = h + 'px';
}
//显示导航图
function fnShowNav(){
    if (!cNavigationControl){
        cNavigationControl = new NavigationControl();
        cNavigationControl.onClose = function(){
            $('BG').style.display='none';
        };
        cNavigationControl.onNavClick = function(type, id, x, y){
            if (type == 0)
            {
                fnShowEntityPop(id, x, y);
            }
            else
            {
                fnShowCompanyPop(id, x, y);
            }
        };
        document.body.appendChild(cNavigationControl.Body);
    }
    cNavigationControl.Width = 800;
    cNavigationControl.Height = 620;
    cNavigationControl.ResumeLayout();
    
    var h = fnGetWindowHeight(),w = fnGetWindowWidth();     
    cNavigationControl.Body.style.zIndex = 1003;
    cNavigationControl.MoveTo((w-cNavigationControl.Width)/2, (h - cNavigationControl.Height) / 2 );
    cNavigationControl.Show();
    
    $('BG').style.display = 'block';
    $('BG').style.height = h + 'px';
}

//全屏
function fnFullSrc(){
    if($('srcExit').style.display=='none'){
        $('srcExit').style.display='block'
        $('EdushiMenu').style.display = 'none';
        $('Eye').style.top = '5px';
        $('EdushiMap').style.top='0px'; 
    }else{
        $('srcExit').style.display='none';
        $('EdushiMenu').style.display = 'block';
        $('Eye').style.top = '95px';
        $('EdushiMap').style.top='63px';
    }
    var h = fnGetWindowHeight(),w = fnGetWindowWidth();
   	$('EdushiMap').style.Width = w;
    $('EdushiMap').style.Height= h;
    vEdushiMap.MapHeight(h);
    vEdushiMap.MapWidth(w);
}
//拉框搜索
function fnPanel(){
    _PaneLayer.innerHTML = '';
    if (cPaneSearchControl){
        cPaneSearchControl.Hide();
    }
    vM.StopPane();
    vM.StartPane();
}
//拉框结束回调
function fnShowPaneSearch(x1,y1,x2,y2){  
    if (!cPaneSearchControl){
        cPaneSearchControl = new PaneSearchControl({Parent:vM});
        cPaneSearchControl.ID = vM.appendEntity(cPaneSearchControl.Body, _PopLayer, false, 0, 0, 300, 135, 0, 0, true);
        if(typeof SearchHotKeyWords!='undefined'){
            cPaneSearchControl.HotKeywords = SearchHotKeyWords;
        }
        cPaneSearchControl.Height = 135;
        cPaneSearchControl.ResumeLayout();
        cPaneSearchControl.onLoadComplete = function(){
            vM.moveEntity(cPaneSearchControl.ID, vM.CenterX()-150, vM.CenterY()-135);
            cPaneSearchControl.ShowPane(x1, y1, x2, y2);
            fnShowPaneMark(x1, y1, x2, y2);
        };
        cPaneSearchControl.onRePane = fnPanel;
        cPaneSearchControl.onPaneClose = function(){
            _PaneLayer.innerHTML = '';
            cPaneSearchControl.Hide();
        };
        cPaneSearchControl.onPaneSearch = function(keyword, x1, y1, x2, y2){
            cSearchResultControl.LocalXYSearch(keyword, x1, y1, x2, y2);
        };
    }
    else{
        vM.moveEntity(cPaneSearchControl.ID, vM.CenterX()-150, vM.CenterY()-135);
        cPaneSearchControl.ShowPane(x1, y1, x2, y2);
        fnShowPaneMark(x1, y1, x2, y2);
    }
}
function fnShowPaneMark(sx,sy,ex,ey){
    var x1,y1,x2,y2;
    if(sy<ey){y1=sy;y2=ey;}else{y1=ey;y2=sy;}
    if(sx<ex){x1=sx;x2=ex;}else{x1=ex;x2=sx;}
    var nd=vM.$C("div"); 
    nd.id="SelPanel";
    nd.style.cssText="border:solid 2px #a2e3ff; float:right;"; 
    nd.style.top=y1;
    nd.style.left=x1;
    nd.style.width=vM.GetWinPos(x2-x1);
    nd.style.height=vM.GetWinPos(y2-y1);
    nd.innerHTML='<div style="background-color:#a2e3ff;filter:alpha(opacity=50); opacity:.5;  width:100%; height:100%; position: absolute; z-index:-10;"></div>';
    vM.appendEntity(nd, _PaneLayer, true, x1,y1,(x2-x1),(y2-y1),0,0, false);
}

//测距
function fnScale(){
    vM.Body.ScaleLine='#fcff00|2'; 
    vM.StartScale();
    _isBeginScale = true;
}

//显示纠错 flag:0-实体 1-企业
function fnShowDebugControl(x, y, id, name, flag){
    if (!cDebugControl){
        cDebugControl = new DebugControl({Parent:vM});
        cDebugControl.ID = vM.appendEntity(cDebugControl.Body, _PopLayer, false, x, y, 300, 355, 0, 38, false);
        cDebugControl.Width = 300;
        cDebugControl.Height = 355;
        cDebugControl.ResumeLayout();
        cDebugControl.Debug(id, name, flag, x, y);
    }
    else{
        vM.moveEntity(cDebugControl.ID, x, y);
        cDebugControl.Show();
        cDebugControl.Debug(id, name, flag, x, y);
    }
}
//隐藏纠错控件
function fnHideDebugControl(){
    cDebugControl.Hide();
}

//显示从这里出发
function fnShowFromHereSearch(){
    if (!cFromSearchControl){
        cFromSearchControl = new FromSearchControl({Parent:vM});
        cFromSearchControl.ID = vM.appendEntity(cFromSearchControl.Body, _PopLayer, false, vM.PointerX(), vM.PointerY(), 233, 135, 0, 38, false);
        cFromSearchControl.Width = 233;
        cFromSearchControl.Height = 135;
        cFromSearchControl.ResumeLayout();
        cFromSearchControl.onLoadComplete = function(){
            cFromSearchControl.ShowFromHereSearch(vM.PointerX(), vM.PointerY());
        };
        cFromSearchControl.onShowFromHereSearch = function(keyword, x, y){
            cSearchResultControl.BusSEXYSearch(1, x, y, keyword);
        };
    }
    else{
        vM.moveEntity(cFromSearchControl.ID, vM.PointerX(), vM.PointerY());
        cFromSearchControl.ShowFromHereSearch(vM.PointerX(), vM.PointerY());
    }
}
//显示到这里
function fnShowToHereSearch(){
    if (!cToSearchControl){
        cToSearchControl = new ToSearchControl({Parent:vM});
        cToSearchControl.ID = vM.appendEntity(cToSearchControl.Body, _PopLayer, false, vM.PointerX(), vM.PointerY(), 233, 135, 0, 38, false);
        cToSearchControl.Width = 233;
        cToSearchControl.Height = 135;
        cToSearchControl.ResumeLayout();
        cToSearchControl.onLoadComplete = function(){
            cToSearchControl.ShowToHereSearch(vM.PointerX(), vM.PointerY());
        };
        cToSearchControl.onShowToHereSearch = function(keyword, x, y){
            cSearchResultControl.BusSEXYSearch(2, x, y, keyword);
        };
    }
    else{
        vM.moveEntity(cToSearchControl.ID, vM.PointerX(), vM.PointerY());
        cToSearchControl.ShowToHereSearch(vM.PointerX(), vM.PointerY());
    }
}
//周边公交搜索
function fnShowPeripheralBus(){
    if (!cPeripheralBusControl){
        cPeripheralBusControl = new PeripheralBusControl({Parent:vM});
        cPeripheralBusControl.ID = vM.appendEntity(cPeripheralBusControl.Body, _PopLayer, false, vM.PointerX(), vM.PointerY(), 303, 310, 0, 38, false);
        cPeripheralBusControl.Width = 303;
        cPeripheralBusControl.Height = 310;
        
        cPeripheralBusControl.ResumeLayout();
        cPeripheralBusControl.onLoadComplete = function(){
            cPeripheralBusControl.ShowPeripheralBus(vM.PointerX(), vM.PointerY());
        };
        cPeripheralBusControl.onBusClick = function(busid, busname){
            cSearchResultControl.BusIDSearch(busid, busname);
        };
    }
    else{
        vM.moveEntity(cPeripheralBusControl.ID, vM.PointerX(), vM.PointerY());
        cPeripheralBusControl.ShowPeripheralBus(vM.PointerX(), vM.PointerY());
    }
}
//显示公交站信息，id:公交站ID
function fnShowBusStation(id, x, y){
    if (!cBusStationControl){
        if (!x || !y)
        {
            x = vM.PointerX();
            y = vM.PointerY();
        }
        cBusStationControl = new BusStationControl({Parent:vM});
        cBusStationControl.ID = vM.appendEntity(cBusStationControl.Body, _PopLayer, false, x, y, 303, 260, 0, 38, false);
        cBusStationControl.Width = 303;
        cBusStationControl.Height = 260;
        
        cBusStationControl.ResumeLayout();
        cBusStationControl.onLoadComplete = function(){
            cBusStationControl.ShowBusStation(id);
        };
        cBusStationControl.onBusClick = function(busid, busname){
            cSearchResultControl.BusIDSearch(busid, busname);
        };
    }
    else{
        vM.moveEntity(cBusStationControl.ID, vM.PointerX(), vM.PointerY());
        cBusStationControl.ShowBusStation(id);
    }
}
//查找周边
function fnShowPeripheralSearch(){
    if (!cPeripheralSearchControl){
        cPeripheralSearchControl = new PeripheralSearchControl({Parent:vM});
        cPeripheralSearchControl.ID = vM.appendEntity(cPeripheralSearchControl.Body, _PopLayer, false, vM.PointerX(), vM.PointerY(), 303, 185, 0, 38, false);
        cPeripheralSearchControl.Width = 303;
        cPeripheralSearchControl.Height = 185;
        cPeripheralSearchControl.ResumeLayout();
        cPeripheralSearchControl.onLoadComplete = function(){
            cPeripheralSearchControl.ShowPeripheralSearch(vM.PointerX(), vM.PointerY());
        };
        cPeripheralSearchControl.onPeripheralSearch = function(keyword, x, y, area){
            cSearchResultControl.LocalNearBySearch(keyword, x, y, area);
        };
    }
    else{
        vM.moveEntity(cPeripheralSearchControl.ID, vM.PointerX(), vM.PointerY());
        cPeripheralSearchControl.ShowPeripheralSearch(vM.PointerX(), vM.PointerY());
    }
}
//载入都市烩随机贴子
function fnLoadRandomTopics(){
    //如果不是杭州城市,return本函数
    return;
    //cSearchResultControl.LocalTopics(); 
}
//载入新闻
function fnLoadNews(){
    var url=GlobalConfig._DataCenterUrl + 'CommMap/ad.aspx?node='+GlobalConfig._Node+'&l='+GlobalConfig._L+'&v=1.0&req=1';
    ENetwork.DownloadScript(url,function(){
        if(typeof ScrollText=='undefined')return false;
        var t='';
        var d=new ScrollText();
        for(i=0;i<d.ID.length;i++){
            t+='<tr><td onclick="fnLoadNewsById('+d.ID[i]+',\''+d.Title[i]+'\');" style="cursor:pointer">'+d.Title[i]+'</td></tr>';
            //判断是否默认激活的
            if (d.AutoActive[i] == 1)
            {
                fnLoadNewsById(d.ID[i], d.Title[i]);
            }
        }
        $('divNews').innerHTML='<table id="newstr" style="border-collapse:collapse;line-height:20px; color:#fff;" cellpadding="0">'+t+'</table>';
        objup = new CBoardExhibition("objup", "divNews", 3, true, "up", 0, 2000);
        objup.ShowMsg();
        fnUrlGoto();    //与搜索列表面板相关的定位
    });
}
//载入Edushi全局新闻
function fnLoadEdushiAnnounce(){
    var url=GlobalConfig._DataCenterUrl + 'CommMap/Public.aspx?node=www.edushi.com&l='+GlobalConfig._L+'&v=1.0&req=1';
    ENetwork.DownloadScript(url,function(){
        if(typeof EdushiAnnounceList=='undefined' || !EdushiAnnounceList )return false;
        if (EdushiAnnounceList.length > 0)
        {
            var t='';
            for(i=0;i<EdushiAnnounceList.length;i++){
                if (EdushiAnnounceList[i].EnableUrl == 1)
                {
                    t+='<tr><td><a href="' + EdushiAnnounceList[i].Url + '" target="_blank">' + EdushiAnnounceList[i].Title + '</a></td></tr>';
                }
                else
                {
                    t+='<tr><td><span style="cursor:pointer" onclick="cSearchResultControl.EdushiAnnounce(' + EdushiAnnounceList[i].ID + ',\'' + EdushiAnnounceList[i].Title + '\');">' + EdushiAnnounceList[i].Title + '</span>&nbsp; &nbsp; &nbsp;</td></tr>';
                }
            }
            $('EdushiAnnounceText').innerHTML='<table id="newstr" style="border-collapse:collapse;line-height:20px" cellpadding="0">'+t+'</table>';
            $('EdushiAnnounce').style.display = 'block';
            objEdushiAnnounce = new CBoardExhibition("objEdushiAnnounce", "EdushiAnnounceText", 3, true, "up", 0, 2000);
            objEdushiAnnounce.ShowMsg();
        }
    });
}

function fnLoadNewsById(Tid,sTitle){
    cSearchResultControl.NewsSearch(Tid,sTitle);  
}
//保存浏览历史记录
//type: 1:实体泡泡 2:企业泡泡
var _HistoryArray = [];
function fnSaveHistory(type, spot){

    fnFlashFont('txtHistoryFont', 'white', 'red');
    var sFnName;
    if (type == 2)  //company
    {
        spot.ID = spot.ComID;
        spot.OwnerName = spot.CompanyName;      //tip:如果为企业实体数据，扩展“实体名称(OwnerName)”属性，以适应以下的HTML拼接
        spot.OEddress = spot.ComEaddress;
        spot.CenterX = spot.ComX;
        spot.CenterY = spot.ComY;
        sFnName = 'fnShowCompanyPop';
    }
    else if (type == 3)  //theme
    {
        spot.ID = spot.ComID;
        spot.OwnerName = spot.CompanyName;     
        spot.OEddress = spot.ComEaddress;
        spot.CenterX = spot.ComX;
        spot.CenterY = spot.ComY;
        sFnName = 'fnShowThemePop';
    }
    else
    {
        sFnName = 'fnShowEntityPop';
    }
    if (_HistoryArray.length >= 1)
    {
        if (_HistoryArray[_HistoryArray.length-1] == type + '_' + spot.ID)
        {
            return;
        }
    }
    if (_HistoryArray.length >=20 ) //大于20个时,删掉最早的一条历史记录
    {
        var arr = $('divHistoryList').getElementsByTagName('a');
        $('divHistoryList').removeChild(arr[arr.length-1]);
        _HistoryArray.shift();
    }
    _HistoryArray.push(type + '_' + spot.ID);
    $('divHistoryList').innerHTML = '<a href="javascript:;" style="padding-left:5px" title="' + spot.OwnerName + '" onclick="' + sFnName + '(\''+spot.ID+'\', ' + spot.CenterX + ', ' + spot.CenterY + ');">&gt; ' + spot.OwnerName + '</a>' + $('divHistoryList').innerHTML;
}


//需要搜索列表面板支持的定位
function fnUrlGoto(){
    var x = fnRequest('x');
    if (x != '')
    {
        var y = fnRequest('y');
        if (y != '')
        {
            vM.MoveTo(x, y, true);
        }
    }
    var q = fnRequest('q');       //本搜
    if (q != '')
    {
        cSearchResultControl.LocalSearch(unescape(q));
    }
    var nq = fnRequest('nq');
    if (nq != '')
    {
        cSearchResultControl.LocalNearBySearch(unescape(nq),x,y,1000);
    }
    
    var b = fnRequest('b');       //公交搜索
    if (b != '')
    {
        if (/^\w?\d+$/.test(b))
        {
            cSearchResultControl.BusSearch(0, b, '');       //线路搜索
        }
        else
        {
            cSearchResultControl.BusSearch(1, unescape(b), '');       //站名搜索
        }
    }
    var s = fnRequest('s');       //站名搜索
    if (s != '')
    {
        cSearchResultControl.BusSearch(1, unescape(s), '');       //站名搜索
    }
    
    var b1 = fnRequest('b1');
    if (b1 != '')
    {
        var b2 = fnRequest('b2');
        if (b2 != '')
        {
            cSearchResultControl.BusSearch(2, b1, b2);
        }
    }
}

//需要Pop支持的定位
function fnEaddGoto(Ecode){
    if(Ecode=='')Ecode=GlobalConfig._Url.replace(GlobalConfig._Node,'').replace('.','');
    //Ecode='E13134';
    if(Ecode!=''&&Ecode!='localhost'){
        var url= GlobalConfig._DataCenterUrl + 'CommMap/CompanyInfo.aspx?node='+GlobalConfig._Node+'&l='+GlobalConfig._L+'&v=1.0&req=3&e='+Ecode;
        ENetwork.DownloadScript(url,function(){
        if (typeof ocType == 'undefined')
        {
            return;
        }
        if(ocType==1){
                fnShowCompanyPop(c.ComID, c.ComX, c.ComY);
        }else if(ocType==2){
            if(typeof o!='undefined'&&o!=null){
                fnShowEntityPop(o.ID, o.CenterX, o.CenterY);  
            }
        }
        });
     }    
}
function fnOCGoto(){
    var url;
    //企业定位
    var C_ID = fnRequest('cid');
    if (C_ID != '' && C_ID*1 > 0)
    {
        url= GlobalConfig._EDataCenterUrl + 'CommMap/EntityInfo.aspx?node='+GlobalConfig._Node+'&l='+GlobalConfig._L+'&v=1.0&req=1&id='+C_ID;
        ENetwork.DownloadScript(url,function(){
            fnShowCompanyPop(c.ComID, c.ComX ,c.ComY); 
        });
        return;
    }
    
    //实体定位
    var O_ID = fnRequest('oid');
    if (/.+?\?\d+$/gi.test(window.document.location.href))
    {
        O_ID = window.document.location.href.replace(/^.+?\?/gi, '');
    }
    if (O_ID != '' && O_ID*1 > 0)
    {
        url= GlobalConfig._EDataCenterUrl + 'CommMap/EntityInfo.aspx?node='+GlobalConfig._Node+'&l='+GlobalConfig._L+'&v=1.0&req=2&id='+O_ID;
        ENetwork.DownloadScript(url,function(){
            if(typeof o!='undefined'&& o!=null)
            {
                fnShowEntityPop(o.ID, o.CenterX ,o.CenterY);
            }
        });
    }
    
}
//标记定位
function fnMarkGoto(){
    var title = fnRequest('title');
    if(title=="")
    {
        title = fnRequest('tname');
    }
    if(title=="")
    {
        return;
    }
    var content = fnRequest('content');
    var x = fnRequest('x');
    if(x=="")
    {
        x = fnRequest('tx');
    }
    if(x=="")
    {
        return;
    }
    var y = fnRequest('y');
    if (y=="")
    {
        y = fnRequest('ty');
    }
    if(y=="")
    {
        return;
    }
    _Mark.Show('EMark',x,y,title,content);
}

function fnShowLayer(id, status)
{
    $(id).style.display = status;
}

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
function fnShowli(o){
    if(o.className=='action'){
        o.className='unaction';
    }else{
        o.className='action';
    }
}
function fnMarkLi(o){
    if(o.id=="MarkHiddinall"){
        $('MarkShowall').className='unaction';
    }else{
        $('MarkHiddinall').className='unaction';
    }
    if(o.className!='action')o.className='action';
}
//显示工具面板, id:工具控件外围容器ID
function fnDisplayTool(id){
    if ($(id).style.display == 'none')
    {
        $(id).style.display = 'block';
    }
    else
    {
        $(id).style.display = 'none';
    }
}

//下载热门关键字
function fnLoadHotKey(){
    var url= GlobalConfig._DataCenterUrl + 'CommMap/ad.aspx?node='+GlobalConfig._Node+'&l='+GlobalConfig._L+'&v=1.0&req=4'; 
    ENetwork.DownloadScript(url);
}
//视窗广告
function fnLoadRotaryPicture(){
    if (!cRotaryPictureControl){
        cRotaryPictureControl = new RotaryPictureControl();
        cRotaryPictureControl.Body.style.width = '241px';
        cRotaryPictureControl.Body.style.height = '203px';
        cRotaryPictureControl.Body.style.right = '1px';
        cRotaryPictureControl.Body.style.bottom = '-203px';
        cRotaryPictureControl.Body.style.zIndex = '3000';
        cRotaryPictureControl.Body.style.position = 'absolute';
        document.body.appendChild(cRotaryPictureControl.Body);
        cRotaryPictureControl.onDataLoadComplete = function(){
            cRotaryPictureControl.Show();
            fnShowRotaryPicture();
        };
    }
    else{
        cRotaryPictureControl.Body.style.bottom = '-203px';
        cRotaryPictureControl.Show();
    }
}
function fnShowRotaryPicture(){
    var b = cRotaryPictureControl.Body.style.bottom.replace('px', '');
    b = parseInt(b);
    if (b < 0)
    {
        b += 10;
        if (b > 0)
        {
            b = 0;
        }
        cRotaryPictureControl.Body.style.bottom = b + 'px';
        setTimeout("fnShowRotaryPicture()", 50);
    }
}
//搜索列表广告，POP广告,来源POP广告
function fnLoadPopSearchListAD(){
    var popadurl= GlobalConfig._DataCenterUrl + 'CommMap/ad.aspx?node='+GlobalConfig._Node+'&l='+GlobalConfig._L+'&v=1.0&req=6';
    ENetwork.DownloadScript(popadurl,function(){
        if(typeof POPAd=='undefined'|| POPAd==null)
        { 
            return false;
        }
        else
        {
            return true;
        }
        
    });
    var searchlistadurl= GlobalConfig._DataCenterUrl + 'CommMap/ad.aspx?node='+GlobalConfig._Node+'&l='+GlobalConfig._L+'&v=1.0&req=7';
    ENetwork.DownloadScript(searchlistadurl,function(){
        if(typeof SearchListAd =='undefined'|| SearchListAd ==null)
        { 
            return false;
        }
        else
        {
            return true;
        }
    });
    
    //来源Pop广告
    var C_ID = fnRequest('cid');
    var O_ID = fnRequest('oid');
    if (/.+?\?\d+$/gi.test(window.document.location.href))
    {
        O_ID = window.document.location.href.replace(/^.+?\?/gi, '');
    }
    if((C_ID!=''|| O_ID!='')&&(C_ID*1>0||O_ID*1>0))
    {
        if(document.referrer!='')
        {
            window._isSourceUrl = true; //是否是来源定位
            var sourcepopadurl= GlobalConfig._DataCenterUrl + 'CommMap/ad.aspx?node='+GlobalConfig._Node+'&l='+GlobalConfig._L+'&v=1.0&req=8';
            ENetwork.DownloadScript(sourcepopadurl,function(){
            if(typeof SourceAd =='undefined'|| SourceAd ==null)
            { 
                return false;
            }
            else
            {
                return true;
            }
            });
        }
    }
}

//拖动控件 o:控件父容器DIV对象, w, h:供拖动的手柄宽高
function fnDragControl(o,w,h)  
{  
    if (typeof o == "string") o = document.getElementById(o);  
    o.orig_x = parseInt(o.style.left) - document.body.scrollLeft;  
    o.orig_y = parseInt(o.style.top) - document.body.scrollTop;  
    o.orig_index = o.style.zIndex;  
          
    o.onmousedown = function(a)  
    {  
        this.style.cursor = "move";  
        this.style.zIndex = 10000;  
        var d=document;  
        if(!a)a=window.event;  
        var x = a.clientX+d.body.scrollLeft-o.offsetLeft;  
        var y = a.clientY+d.body.scrollTop-o.offsetTop;  
        //author: www.longbill.cn  
        d.ondragstart = "return false;"  
        d.onselectstart = "return false;"  
        d.onselect = "document.selection.empty();"  
        if (a.target)
        {
            fnSetDragFlag(a.target, 1, w, h)
        }
        if(o.setCapture)  
            o.setCapture();  
        else if(window.captureEvents)  
            window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);  

        d.onmousemove = function(a)  
        {  
            if(!a)a=window.event;  
            o.style.left = a.clientX+document.body.scrollLeft-x + 'px';  
            o.style.top = a.clientY+document.body.scrollTop-y + 'px';  
            o.orig_x = parseInt(o.style.left) - document.body.scrollLeft;  
            o.orig_y = parseInt(o.style.top) - document.body.scrollTop;  
        }  

        d.onmouseup = function()  
        {  
            
            if(o.releaseCapture)  
                o.releaseCapture();  
            else if(window.captureEvents)  
                window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);  
            d.onmousemove = null;  
            d.onmouseup = null;  
            d.ondragstart = null;  
            d.onselectstart = null;  
            d.onselect = null;  
            o.style.cursor = "normal";  
            o.style.zIndex = o.orig_index;  
            if (a.target)
            {
                fnSetDragFlag(a.target, 0, w, h)
            }
        }  
    }  
}

function fnSetDragFlag(t, flag, w, h)
{
    if (flag == 1)
    {
        t.style.width = fnGetWindowWidth()*2 + 'px';
        t.style.height = fnGetWindowHeight()*2 + 'px';
        t.style.left = fnGetWindowWidth()*-1 + 'px';;
        t.style.top = fnGetWindowHeight()*-1 + 'px';
    }
    else
    {
        t.style.width = w + 'px';
        t.style.height = h + 'px';
        t.style.left = 0;
        t.style.top = 0;
    }
}

function fnFlashFont(objId, sOldColor, color)
{
    var obj = $(objId);  
    obj.style.color = sOldColor;  
    var iCount = 0;
    var iMaxCount = 5;
    var hwTimer = setInterval(function(){
        if (iCount >= iMaxCount)
        {
            obj.style.color = sOldColor;
            window.clearInterval(hwTimer);
        }
        else
        {
            iCount++;
            obj.style.color == sOldColor ? obj.style.color = color : obj.style.color = sOldColor;
        }
    }, 100);
}