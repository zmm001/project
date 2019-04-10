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

function fnLoadInit() {
    //加载对象
    if (typeof vEdushiMap == 'undefined') {
        setTimeout("fnLoadInit()", 50);
        return;
    }

    vM = vEdushiMap;
    window.onresize();
    fnMapEventBind();
    //初始化选项卡
    fnInitTabControl();    
    $('maploading').style.display = 'none';
    if (GlobalConfig.Is3D == '0') {
        if (vM.Property.flgShowSogouMap) {
            vM.LoadPlug('SogouMap', function () { vM.MapSwitch.Switch2D(); fnDelay(); });
        }
    }
}
function fnDelay() {
    if (vM.MapState.Succeed) {
        vM.ZoomBar.ZoomTo(6);
    }
    else {
        setTimeout("fnDelay()", 300);
        return;
    }
}
function fnMapEventBind() {
    //滑杆样式
    vM.$('ZoomBarControl').style.backgroundImage = "url('" + AlaMap.GetScriptLocation() + "/images/ud.gif')";
    //绑定滑杆
    vM.attachEvent(AlaMap.KeyWord.EventName.MapZoomChange, function (z) {

    });
    //测距结束
    vM.attachEvent(AlaMap.KeyWord.EventName.ScaleEnd, function (dis, flg, id) {
        
    });

    //取点操作结束
    vM.attachEvent(AlaMap.KeyWord.EventName.GetCoordsEnd, function (c, flg) {
        
    });

    vM.attachEvent(AlaMap.KeyWord.EventName.Switch3D, function () {
        SwitchMapMethod(true);       
    });

    vM.attachEvent(AlaMap.KeyWord.EventName.Switch2D, function () {        
        
        SwitchMapMethod(false);
    });

    vM.attachEvent(AlaMap.KeyWord.EventName.SwitchWX, function () {
        SwitchMapMethod(false);
    });
}
function SwitchMapMethod(flg) {
    vM.ViewSigns(false, 'park');
    vM.ViewSigns(false, 'bus');
    if (flg) {
        vM.$('ZoomBarControl').style.backgroundImage = "url('" + AlaMap.GetScriptLocation() + "images/ud.gif')";
        $('Auditing').style.display = 'block';
    } else {
        vM.$('ZoomBarControl').style.backgroundImage = "url('" + AlaMap.GetScriptLocation() + "images/ZoomBarControl.gif')";
        $('Auditing').style.display = 'none';
    }
}
function fnLoadPlug() {
    //加载google地图
    if (vM.Property.flgShowGoogleMap) {
        vM.LoadPlug('GoogleMap');
    }
    if (vM.Property.flgShowSogouMap) {
        vM.LoadPlug('SogouMap');
    }
}
//键盘事件
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
            MoveTo(iMapCenterX - vM.GradeWin2EGIS(moveStepPixel), iMapCenterY, true);
            break;
        case 38:
            MoveTo(iMapCenterX, iMapCenterY - vM.GradeWin2EGIS(moveStepPixel), true);
            break;
        case 39:
            MoveTo(iMapCenterX + vM.GradeWin2EGIS(moveStepPixel), iMapCenterY, true);
            break;
        case 40:
            MoveTo(iMapCenterX, iMapCenterY + vM.GradeWin2EGIS(moveStepPixel), true);
            break;
    }
}
//工具下拉
function fnToolsShow(toolsName, type) {
    if (type == '1') {
        $(toolsName).style.display = 'block';
    }

    if (type == '2') {
        $(toolsName).style.display = 'none';
    }
}

jQuery(function () {
    jQuery("#moreid").hover(function () {
        jQuery(".xlmore").slideDown(300);
    }, function () {
        jQuery(".xlmore").slideUp(300);
    });

    jQuery("#aFullScrenn").click(function () {
        if (jQuery("#PromptInfo").css("display") == 'none') {
            fnFullScreen(this);
            if (_MapFullScreenState) {
                jQuery("#PromptInfo").html("您已开启全屏功能！");
            }
            else {
                jQuery("#PromptInfo").html("您已关闭全屏功能！");
            }
            jQuery("#PromptInfo").fadeIn(200, function () {
                jQuery("#PromptInfo").fadeOut(2000);
            });
        }
    });
});

//全屏
function fnFullScreen(obj) {
    if (_MapFullScreenState) {
        _MapFullScreenState = false;
        obj.innerHTML = '全屏';
        obj.title = '全屏';
    }
    else {
        _MapFullScreenState = true;
        obj.innerHTML = '还原';
        obj.title = '还原';
    }
    window.onresize();
}

//切换城市
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
        citylistifrmae.style.width = '405px';
        citylistifrmae.style.height = '448px';
        citylistifrmae.style.position = 'absolute';
        citylistifrmae.style.top = '86px';
        citylistifrmae.style.left = '35px';
        citylistifrmae.style.zIndex = 999;
        citylistifrmae.src = 'citySwitching.html';
        document.body.appendChild(citylistifrmae);
    }
}

//初始化选项卡
function fnInitTabControl() {
    if (!_TabControl) {
        var HeadContainer = $('HeadContainer');
        var BodyContainer = $('BodyContainer');
        var LeftBtn = $('LeftBtn');
        var RightBtn = $('RightBtn');
        var dropDownlistContainer = $('ddlListul');
        _TabControl = new TabControl(HeadContainer, BodyContainer, LeftBtn, RightBtn, dropDownlistContainer);
    }
}

//触发选项卡里的Iframe onresize事件
function fnAttachIframeResize() {
    if (_TabControl) {
        for (var i = 0; i < _TabControl.TabList.length; i++) {
            _TabControl.TabList[i].TabBody.style.height = _TabControl.TabList[i].TabBody.parentNode.style.height;
            _TabControl.TabList[i].resize();
        }
    }
}
function openMainPage() {
    var w = fnGetWindowWidth();
    if (w < 1000) {
        _MapWidth = 674;
        jQuery("#BodyHtml").css("width", "1000px");
    }
    else {
        _MapWidth = w - 326;
        jQuery("#BodyHtml").css("width", w + "px");
    }
}
//重写窗口缩放事件
window.onresize = function () {
    openMainPage();
    var h = fnGetWindowHeight(), w = fnGetWindowWidth();

    if (_MapFullScreenState) {
        jQuery("#Header").hide();
        jQuery("#Navigation").hide();
        jQuery("#Content").css("height", (h - 26) + "px");
        jQuery("#EdushiMap").css("height", (h - 26) + "px");
        jQuery("#Wrapper").css("height", h + "px");
        jQuery("#Content").css("margin-right", "0px");
        jQuery("#toolsleft").css("margin-right", "0px");
        if (w < 1000) {
            _MapWidth = 1000;
        }
        else {
            _MapWidth = w;
        }
        _MapHeight = h - 25;
        if (vM) {
            vM.MapHeight(_MapHeight);
            vM.MapWidth(_MapWidth);
        }
    }
    else {
        jQuery("#Content").show();
        jQuery("#Header").show();
        jQuery("#Navigation").show();
        jQuery("#Content").css("margin-right", "324px");
        jQuery("#toolsleft").css("margin-right", "324px");
        jQuery("#Content").css("height", (h - 122) + "px");
        if (w < 1000) {
            jQuery("#divBdtList").css("width", "400px");
        }
        else {
            jQuery("#divBdtList").css("width", (w - 610) + "px");
        }
        jQuery("#BodyContainer").css("height", (h - 131) + 'px');
        jQuery('#Navigation').css("height", (h - 96) + 'px');
        if (vM) {
            vM.MapWidth(_MapWidth);
        }
        _MapHeight = h - 122;
        if (vM) {
            vM.MapHeight(_MapHeight);
        }
    }

    fnAttachIframeResize();
};

//搜索切换
function fnSearchChange(type) {
    if (type == 'MapSearch') {
        $('MapSearch').className = 'tab1';
        $('BusSearch').className = 'tab2';
        $('divMapSearch').style.display = 'block';
        $('divBusSearch').style.display = 'none';
    }

    if (type == 'BusSearch') {
        $('MapSearch').className = 'tab2';
        $('BusSearch').className = 'tab1';
        $('divMapSearch').style.display = 'none';
        $('divBusSearch').style.display = 'block';
    }
}
//添加页卡
function fnAddTab(tab, h) {
    if (!h) {
        tab.TabBody.style.height = '100%';
    }
    else {
        tab.TabBody.style.height = h;
    }
    _TabControl.AddTab(tab);
}
function fnMapSearch() {
    sKeyword = $('txtSearchKey').value.trim();
    if (sKeyword.length < 1) {
        $('txtSearchKey').focus();
        return;
    }
    tab = new TabControl.Tab(document, 'search', sKeyword, '/Fundation/LocalSearch.aspx?keyword=' +escape(sKeyword), true, true, 80);
    fnAddTab(tab);
}
function fnCheckValue(type) {
    switch (type) {
        case '0':
            $('typeListValue').innerHTML = '全站搜索';
            $('AllSearch').style.display = 'block';
            $('nearBySearch').style.display = 'none';
            __searchtype = 0;
            break;
        case '1':
            $('typeListValue').innerHTML = '名称';
            $('AllSearch').style.display = 'block';
            $('nearBySearch').style.display = 'none';
            __searchtype = 1;
            break;
        case '2':
            $('typeListValue').innerHTML = '地址';
            $('AllSearch').style.display = 'block';
            $('nearBySearch').style.display = 'none';
            __searchtype = 2;
            break;
        case '3':
            $('typeListValue').innerHTML = '周边';
            $('AllSearch').style.display = 'none';
            $('nearBySearch').style.display = 'block';
            __searchtype = 3;
            break;
        case '9':
            $('typeListValue').innerHTML = '道路';
            $('AllSearch').style.display = 'block';
            $('nearBySearch').style.display = 'none';
            __searchtype = 9;
            break;
    }
    fnToolsShow('typeList', 2);
}