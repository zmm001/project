var vM = null;                                      //地图对象
var _MapFullScreenState = false;       //标记地图是否为全屏状态
var infowindow;
var sRender;
var bRender;
var geo;
var CityList = [];
var curCity = {};
var TransformDatas = {
    'Lat': { Intercept: 13362377.9971125, Variable1: 0.220824303730893, Variable2: 0.347380017847229 },
    'Lng': { Intercept: 3521233.34796444, Variable1: 0.229418717996566, Variable2: -0.361550010304446 },
    'X': { Intercept: -37944851.5189649, Variable1: 2.26584211755299, Variable2: 2.17759535883447 },
    'Y': { Intercept: -14339201.3586578, Variable1: 1.43778962950269, Variable2: -1.38391322360847 }
};

function fnLoadInit() {
    window.onresize();
    curCity = fnGetCityData(GlobalConfig.CityName);
    if (typeof curCity.name == 'undefined') {
        setInterval("fnLoadInit()", 500);
        return;
    }
    if (curCity.bus == 0) {
        jQuery("#BusSearch").hide();
    }
    //var sPoint = EPoint2SPoint(GlobalConfig.CenterX, GlobalConfig.CenterY);
    if (typeof sogou.maps == 'undefined') {
        setInterval("fnLoadInit()", 50);
        return;
    }
    var myLatLng = new sogou.maps.Point(curCity.x, curCity.y);
    var myOptions = {
        zoom: curCity.level,
        center: myLatLng
    };
    var map = new sogou.maps.Map($("Content"), myOptions); //创建地图
    infowindow = new sogou.maps.InfoWindow();
    vM = map;
}

function fnGetCityData(cName) {
    if (typeof CityData != 'undefined') {
        CityList = CityData.province;
        for (var i = 0; i < CityList.length; i++) {
            for (var l = 0; l < CityList[i].citys.length; l++) {
                if (cName == CityList[i].citys[l].name) {
                    return CityList[i].citys[l];
                    break;
                }
            }
        }
    }
    return {};
}

function EPoint2SPoint(X,Y) {
    return {X : TransformDatas.Lat.Variable1 * X + (TransformDatas.Lat.Variable2) * Y + (TransformDatas.Lat.Intercept),
    Y: TransformDatas.Lng.Variable1 * X + TransformDatas.Lng.Variable2 * Y + (TransformDatas.Lng.Intercept)};
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
    fnLoadInit();
    jQuery("#moreid").hover(function () {
        jQuery(".xlmore").slideDown(300);
    }, function () {
        jQuery(".xlmore").slideUp(300);
    });
});

//全屏
function fnFullScreen(obj) {
    if (_MapFullScreenState) {
        _MapFullScreenState = false;
        jQuery("#aFullScrenn").html("全屏");
        jQuery("#aFullScrenn").attr("title", "全屏");
    }
    else {
        _MapFullScreenState = true;
        jQuery("#aFullScrenn").html("还原");
        jQuery("#aFullScrenn").attr("title", "还原");
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
        citylistifrmae.style.zIndex = 99999;
        citylistifrmae.src = 'citySwitching.html';
        document.body.appendChild(citylistifrmae);
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
        jQuery("#Wrapper").css("height", h + "px");
        jQuery("#Content").css("margin-right", "0px");
        jQuery("#toolsleft").css("margin-right", "0px");        
    }
    else {
        jQuery("#Content").show();
        jQuery("#Header").show();
        jQuery("#Navigation").show();
        jQuery("#Content").css("margin-right", "324px");
        jQuery("#toolsleft").css("margin-right", "324px");
        jQuery("#Content").css("height", (h - 122) + "px");       
        jQuery("#BodyContainer").css("height", (h - 131) + 'px');
        jQuery('#Navigation').css("height", (h - 96) + 'px');      
    }
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

function fnKeySearch(fn,evt) {
    evt = window.event ? window.event : evt;
    if (evt.keyCode == 13) {
        eval(fn);
    }
}

function fnMapSearch() {
    sKeyword = $('txtSearchKey').value.trim();
    if (sKeyword == "") return;
    clearReslut();
    $("resultli").innerHTML = '<span title="' + sKeyword + '" style="display: block;">' + sKeyword + '</span>';
    sRender = new sogou.maps.SearchRenderer({ 'panel': $('BodyContainer') });
    var request = {
        'map': vM,
        'what': {
            'keyword': sKeyword
        },
        'range': {
            'boundFlag': 2   //当前视野搜索 
        }
    };
    var search = new sogou.maps.Search(); //创建搜索实例
    search.search(request);
    $('BodyContainer').innerHTML = '';
    $('BodyContainer').innerHTML = '<div style="margin:3px 0;height:5px;width:234px;"></div>';
    search.setRenderer(sRender);
    sogou.maps.event.addListener(sRender, 'getMarker', function (a, b) {
        infowindow.open(vM, a);
        var div = document.createElement('div');
        div.innerHTML = b.innerHTML + '<div style="margin:3px 0;width:234px;height:65px;"></div>';
        div.style.width = '300px';
        div.style.fontSize = '12px';
        infowindow.setContent(div);
    });
}

function clearReslut() {
    if (typeof sRender != 'undefined') {
        sRender.clearResultFeatures();        
    }

    if (typeof bRender != 'undefined') {
        bRender.removeRoute();
    }

    $('BodyContainer').innerHTML = '';
    $('BodyContainer').innerHTML = GlobalConfig.Loading;
}

function fnBusSearch() {
    var txtstart = $('txtBusStart').value.trim();
    var txtend = $('txtBusEnd').value.trim();
    if (txtstart == '' || txtend == '') return;
    clearReslut();
    $("resultli").innerHTML = '<span title="' + txtstart + '--' + txtend + '" style="display: block;">' + txtstart + '--' + txtend + '</span>';
    var _request = {
        'map': vM,        //Map 
        'tactic': 2,
        'maxResultCount': 10,
        'maxDist': 1000
    }
    var start = {
        address: {
            addr: '' + txtstart + '',
            city: '' + GlobalConfig.CityName + ''
        }
    }
    var end = {
        address: {
            addr: '' + txtend + '',
            city: '' + GlobalConfig.CityName + ''
        }
    }

    if (typeof geo == 'undefined') {
        geo = new sogou.maps.Geocoder();
    }

    geo.geocode(start, function (a) {
        if (a.status = 'ok') {
            //设置起点坐标对象
            _request.origin = a.data[0].location;
            //判断终点坐标对象是否已经获取到，获取到就进行公交搜索
            if (_request.destination) { busSearch(_request) }
        }
    });
    geo.geocode(end, function (a) {
        if (a.status = 'ok') {
            //设置终点坐标对象
            _request.destination = a.data[0].location;
            //判断起点坐标对象是否已经获取到，获取到就进行公交搜索
            if (_request.origin) { busSearch(_request) }
        }
    });
}

function busSearch(request) {
    var bus = new sogou.maps.Bus();
    bus.route(request, callback);
}

function callback(a) {
    var option = {
        'map': vM,
        'panel': document.getElementById('BodyContainer'), //div 结果显示区
        'busResult': a
    };
    $('BodyContainer').innerHTML = '';
    $('BodyContainer').innerHTML = '<div style="margin:3px 0;height:60px;width:234px;"></div>';
    bRender = new sogou.maps.BusRenderer(option);
};