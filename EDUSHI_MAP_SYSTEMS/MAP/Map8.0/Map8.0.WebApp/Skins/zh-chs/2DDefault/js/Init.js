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
var TransformDatas_bd = {
    'Lat': { Intercept: 30.3104604235448, Variable1: 1.78433938493313E-06, Variable2: -2.83174234814772E-06 },
    'Lng': { Intercept: 120.047485514252, Variable1: 1.97605553770526E-06, Variable2: 3.09289746061242E-06 },
    'X': { Intercept: -38911321.225491, Variable1: 277495.840445344, Variable2: 254069.332047795 },
    'Y': { Intercept: -13816090.6655824, Variable1: -178269.629816382, Variable2: 160099.829342733 }
};
var ac_map = null;
var ac_bus_s = null;
var ac_bus_e = null;
var ac_drive_s = null;
var ac_drive_e = null;


var busStartPoint = null;
var busEndPoint = null;

var driveStartPoint = null;
var driveEndPoint = null;
var driveWayPoints = [];

var transit = null;
var driving = null;
var routePolicy = [BMAP_TRANSIT_POLICY_LEAST_TIME, BMAP_TRANSIT_POLICY_LEAST_TRANSFER, BMAP_TRANSIT_POLICY_LEAST_WALKING, BMAP_TRANSIT_POLICY_AVOID_SUBWAYS]; //公交换乘策略
var BusPolicyIndex = -1; //公交换乘策略索引

var routePolicy_Drive = [BMAP_DRIVING_POLICY_LEAST_TIME, BMAP_DRIVING_POLICY_LEAST_DISTANCE, BMAP_DRIVING_POLICY_AVOID_HIGHWAYS]; //驾车换乘策略
var DrivePolicyIndex = -1; //驾车换乘策略索引

var localsearchResult = null; //本地搜索结果
var mapCityName = "";

function fnLoadInit() {
    window.onresize();
//    curCity = fnGetCityData(GlobalConfig.CityName);
//    if (typeof curCity.name == 'undefined') {
//        setInterval("fnLoadInit()", 500);
//        return;
//    }
//    if (curCity.bus == 0) {
//        jQuery("#BusSearch").hide();
//    }
    //var sPoint = EPoint2SPoint(GlobalConfig.CenterX, GlobalConfig.CenterY);
//    if (typeof sogou.maps == 'undefined') {
//        setInterval("fnLoadInit()", 50);
//        return;
    //    }

    //    var myLatLng = new sogou.maps.Point(curCity.x, curCity.y);
    //    var myOptions = {
    //        zoom: curCity.level,
    //        center: myLatLng
    //    };
    //    var map = new sogou.maps.Map($("Content"), myOptions); //创建地图
    //    infowindow = new sogou.maps.InfoWindow();

    switch (GlobalConfig.CityName) {
        case "北海":
        case "儋州":
        case "东方":
        case "黄山":
        case "临沧":
        case "普洱":
        case "潜江":
        case "琼海":
        case "石河子":
        case "双鸭山":
        case "天门":
        case "万宁":
        case "文昌":
        case "五家渠":
        case "五指山":
        case "仙桃":
            mapCityName = GlobalConfig.CityName + "市";
            break;
        case "博尔塔拉":
            mapCityName = GlobalConfig.CityName + "蒙古自治州";
            break;
        case "克孜勒苏柯尔克孜":
        case "伊犁哈萨克":
            mapCityName = GlobalConfig.CityName + "自治州";
            break;
        case "大兴安岭":
        case "海东":
            mapCityName = GlobalConfig.CityName + "地区";
            break;
        case "神农架":
            mapCityName = GlobalConfig.CityName + "林区";
            break;
        default:
            mapCityName = GlobalConfig.CityName;
            break;
    }
    var map = new BMap.Map("Content");    // 创建Map实例
    map.centerAndZoom(mapCityName, 14); //GlobalConfig.CityName curCity.name  EPoint2BLatLng(GlobalConfig.CenterX, GlobalConfig.CenterY), curCity.level// 初始化地图,设置中心点坐标和地图级别（如果center类型为Point时，zoom必须赋值，范围3-19级，若调用高清底图（针对移动端开发）时，zoom可赋值范围为3-18级。如果center类型为字符串时，比如“北京”，zoom可以忽略，地图将自动根据center适配最佳zoom级别。）
    
    var mapType = new BMap.MapTypeControl({ type: BMAP_MAPTYPE_CONTROL_MAP });  //{ mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP] }   { anchor: BMAP_ANCHOR_TOP_LEFT }  { type: BMAP_MAPTYPE_CONTROL_MAP }
    var overView = new BMap.OverviewMapControl();
    var top_left_navigation = new BMap.NavigationControl();
    var stCtrl = new BMap.PanoramaControl(); //构造全景控件
    var mysize = new BMap.Size(12, 70);
    stCtrl.setOffset(mysize); //设置全景控件的初始位置

    map.addControl(mapType);   //添加地图类型控件
    map.addControl(overView);   //添加默认缩放平移控件
    map.addControl(top_left_navigation);   //添加默认缩略地图控件
    map.addControl(stCtrl); //添加全景控件

    //注册地图类型改变事件
    map.addEventListener("maptypechange", function (e) {
        if (e.target.getMapType() == BMAP_HYBRID_MAP) {
            jQuery("div[title='进入全景']").css("top", 100);
        }
        else {
            jQuery("div[title='进入全景']").css("top", 70);
        }
    });

    //map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

    vM = map;

    ac_map = new BMap.Autocomplete(    //建立一个自动完成的对象
		{
            "input": "txtSearchKey", 
            "location": map
        });
     ac_bus_s = new BMap.Autocomplete(    //建立一个自动完成的对象
		{
            "input": "txtBusStart",
		    "location": map
        });
    ac_bus_e = new BMap.Autocomplete(    //建立一个自动完成的对象
		{
            "input": "txtBusEnd",
		    "location": map
        });
    ac_drive_s = new BMap.Autocomplete(    //建立一个自动完成的对象
		{
            "input": "txtDriveStart",
		    "location": map
        });
    ac_drive_e = new BMap.Autocomplete(    //建立一个自动完成的对象
		{
            "input": "txtDriveEnd",
		    "location": map
        });

        var transit_temp = new BMap.TransitRoute(vM, {
            renderOptions: { map: vM, panel: "BodyContainer" },
            onResultsHtmlSet: function (e) {
                var html = getBus_Radio_Html(BusPolicyIndex) + e.outerHTML;
                jQuery("#BodyContainer").html(html);
            }
            ,
            onSearchComplete: function (result) {
                busStartPoint = result.getStart().point;
                busEndPoint = result.getEnd().point;
            }
        });
        transit = transit_temp;

        var driving_temp = new BMap.DrivingRoute(vM, {
            renderOptions: { map: vM, panel: "BodyContainer", autoViewport: true, enableDragging: true },
            onResultsHtmlSet: function (e) {
                var html = getDrive_Radio_Html(DrivePolicyIndex) + e.outerHTML;
                jQuery("#BodyContainer").html(html);
            }
             ,
            onSearchComplete: function (result) {
                driveStartPoint = result.getStart().point;
                driveEndPoint = result.getEnd().point;
            }
            ,
            onMarkersSet: function (arr) {
                driveWayPoints = [];
                for (var i = 0; i < arr.length; i++) {
                    if (i != 0 && i != arr.length - 1) {
                        driveWayPoints.push(arr[i].point);
                    }
                }
            }
        });
        driving = driving_temp;

}

function getBus_Radio_Html(type) {
    var class0 = "";
    var class1 = "";
    var class2 = "";
    var class3 = "";

    var checke0 = "";
    var checke1 = "";
    var checke2 = "";
    var checke3 = "";

    var html = "";
    switch (type) {
        case 0:
            class0 = " class=\"current\"";
            checke0 = " checked=\"checked\"";
            break;
        case 1:
            class1 = " class=\"current\"";
            checke1 = " checked=\"checked\"";
            break;
        case 2:
            class2 = " class=\"current\"";
            checke2 = " checked=\"checked\"";
            break;
        case 3:
            class3 = " class=\"current\"";
            checke3 = " checked=\"checked\"";
            break;
    }
    html += "<ul class=\"bus_radio clearfix\" id=\"bus_radio_bd\">\r\n";
    html += "   <li id=\"bus_radio_li_bd_0\"" + class0 + "><input type=\"radio\" name=\"radio\" onclick=\"selectBtn_bd(0);\"" + checke0 + " />较快捷</li>\r\n";
    html += "   <li id=\"bus_radio_li_bd_1\"" + class1 + "><input type=\"radio\" name=\"radio\" onclick=\"selectBtn_bd(1);\"" + checke1 + " />少换乘</li>\r\n";
    html += "   <li id=\"bus_radio_li_bd_2\"" + class2 + "><input type=\"radio\" name=\"radio\" onclick=\"selectBtn_bd(2);\"" + checke2 + " />少步行</li>\r\n";
    html += "   <li id=\"bus_radio_li_bd_3\"" + class3 + " style=\"border:none;\"><input type=\"radio\" name=\"radio\" onclick=\"selectBtn_bd(3);\"" + checke3 + " />不坐地铁</li>\r\n";
    html += "</ul>\r\n";
    return html;
}

function getDrive_Radio_Html(type) {
    var class0 = "";
    var class1 = "";
    var class2 = "";
    var class3 = "";

    var checke0 = "";
    var checke1 = "";
    var checke2 = "";
    var checke3 = "";

    var html = "";
    switch (type) {
        case 0:
            class0 = " class=\"current\"";
            checke0 = " checked=\"checked\"";
            break;
        case 1:
            class1 = " class=\"current\"";
            checke1 = " checked=\"checked\"";
            break;
        case 2:
            class2 = " class=\"current\"";
            checke2 = " checked=\"checked\"";
            break;
        case 3:
            class3 = " class=\"current\"";
            checke3 = " checked=\"checked\"";
            break;
    }
    html += "<ul class=\"bus_radio clearfix\" id=\"drive_radio_bd\">\r\n";
    html += "   <li id=\"drive_radio_li_bd_0\"" + class0 + "><input type=\"radio\" name=\"radio\" onclick=\"selectBtn_bd_drive(0);\"" + checke0 + " />推荐线路</li>\r\n";
    html += "   <li id=\"drive_radio_li_bd_1\"" + class1 + "><input type=\"radio\" name=\"radio\" onclick=\"selectBtn_bd_drive(1);\"" + checke1 + " />最短线路</li>\r\n";
    html += "   <li id=\"drive_radio_li_bd_2\"" + class2 + " style=\"border:none;\"><input type=\"radio\" name=\"radio\" onclick=\"selectBtn_bd_drive(2);\"" + checke2 + " />不上高速</li>\r\n";
    html += "</ul>\r\n";
    return html;
}

function selectBtn_bd(type) {
    BusPolicyIndex = type;
    transit.setPolicy(routePolicy[BusPolicyIndex]);
    transit.search(busStartPoint, busEndPoint);
}
function selectBtn_bd_drive(type) {
    DrivePolicyIndex = type;
    driving.setPolicy(routePolicy_Drive[DrivePolicyIndex]);
    if (driveWayPoints.length > 0) {
        driving.search(driveStartPoint, driveEndPoint, { waypoints: driveWayPoints });
    }
    else {
        driving.search(driveStartPoint, driveEndPoint);
    }
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

function EPoint2BLatLng(X, Y) {
    return new BMap.Point(TransformDatas_bd.Lng.Variable1 * X + (TransformDatas_bd.Lng.Variable2) * Y + (TransformDatas_bd.Lng.Intercept), 
    TransformDatas_bd.Lat.Variable1 * X + (TransformDatas_bd.Lat.Variable2) * Y + (TransformDatas_bd.Lat.Intercept));
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
        citylistifrmae.style.width = '440px';
        citylistifrmae.style.height = '309px';
        citylistifrmae.style.position = 'absolute';
        if (_MapFullScreenState) {
            citylistifrmae.style.top = '32px';
        }
        else {
            citylistifrmae.style.top = '143px';
        }
        citylistifrmae.style.left = '10px';
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
        jQuery("#Content").css("height", (h - 32) + "px");
        jQuery("#Wrapper").css("height", h + "px");
        jQuery("#Content").css("margin-right", "0px");
        jQuery("#toolsleft").css("margin-right", "0px");

        var citylistifrmae = $('iframeCityList');
        if (citylistifrmae) {
            citylistifrmae.style.top = '32px';
        }
    }
    else {
        jQuery("#Content").show();
        jQuery("#Header").show();
        jQuery("#Navigation").show();
        jQuery("#Content").css("margin-right", "350px");
        jQuery("#toolsleft").css("margin-right", "350px");
        jQuery("#Content").css("height", (h - 144) + "px");
        jQuery("#BodyContainer").css("height", (h - 144) + 'px');
        jQuery('#Navigation').css("height", (h - 112) + 'px');
        jQuery('#Wrapper').css("height", (h - 112) + 'px');

        var citylistifrmae = $('iframeCityList');
        if (citylistifrmae) {
            citylistifrmae.style.top = '143px';
        }
    }
    //fnAttachIframeResize();
};
function getEById(id) {
    return document.getElementById(id);
}
function fnAttachIframeResize() {
    var iframe_bus = getEById('BusTransfer');
    //$Id('iframe的ID').contentWindow.$Id('元素的ID')  //这样就得到了要取的对象
    if (iframe_bus) {
        iframe_bus.style.height = iframe_bus.parentNode.style.height;
        if (typeof iframe_bus.contentWindow.fnResize == 'function') {
            iframe_bus.contentWindow.fnResize(parseInt(iframe_bus.parentNode.style.height));
        }
    }
}

//搜索切换
function fnSearchChange(type) {
    if (type == 'MapSearch') {
        $('MapSearch').className = 'current';
        $('BusSearch').className = '';
        $('DriveSearch').className = '';
        $('divMapSearch').style.display = 'block';
        $('divBusSearch').style.display = 'none';
        $('divDriveSearch').style.display = 'none';
    }

    if (type == 'BusSearch') {
        $('MapSearch').className = '';
        $('BusSearch').className = 'current';
        $('DriveSearch').className = '';
        $('divMapSearch').style.display = 'none';
        $('divBusSearch').style.display = 'block';
        $('divDriveSearch').style.display = 'none';
    }

    if (type == 'DriveSearch') {
        $('MapSearch').className = '';
        $('BusSearch').className = '';
        $('DriveSearch').className = 'current';
        $('divMapSearch').style.display = 'none';
        $('divBusSearch').style.display = 'none';
        $('divDriveSearch').style.display = 'block';
    }
}

function fnKeySearch(fn,evt) {
    evt = window.event ? window.event : evt;
    if (evt.keyCode == 13) {
        eval(fn);
    }
}

function clearReslut() {
    $('BodyContainer').innerHTML = '';
    $('BodyContainer').innerHTML = GlobalConfig.Loading;
}

function fnMapSearch() {
    vM.clearOverlays();
    sKeyword = $('txtSearchKey').value.trim();
    if (sKeyword == "") return;
    clearReslut();
    $("resultli").innerHTML = '<span title="' + sKeyword + '" style="display: block;">' + sKeyword + '</span>';
    var local = new BMap.LocalSearch(vM, {
        renderOptions: { map: vM, panel: "BodyContainer", selectFirstResult: false }
        ,pageCapacity: 15
        ,
        onResultsHtmlSet: function (e) {
            jQuery("#BodyContainer ol li").each(function (index) {
                jQuery(this).css({ "margin": "8px 0px" });
                //alert(localsearchResult);
                var poi = localsearchResult.getPoi(index); //获得单个LocalResultPoi信息
                var address = "";
                var phone = "";
                if (poi.type == 0) {
                    address = poi.address;
                }
                if (poi.phoneNumber != undefined) {
                    phone = poi.phoneNumber;
                }
                jQuery(this).click(function () {
                    showInfo('' + poi.title.replace("'", "\\'") + '', false, '', '' + address.replace("'", "\\'") + '', poi.point.lng, poi.point.lat, phone);
                });
            });
            //alert("后执行");
            var CurrPageResultNum = localsearchResult.getCurrentNumPois(); //获得当前页的结果数
            if (CurrPageResultNum > 0) {
                for (var i = 0; i < CurrPageResultNum; i++) {
                    var poi = localsearchResult.getPoi(i); //获得单个LocalResultPoi信息
                    jQuery("span[title='" + poi.title + "']").addClass("myMarker");
                }
            }

            jQuery(".myMarker").each(function (index) {
                var poi = localsearchResult.getPoi(index); //获得单个LocalResultPoi信息
                var address = "";
                var phone = "";
                if (poi.type == 0) {
                    address = poi.address;
                }
                if (poi.phoneNumber != undefined) {
                    phone = poi.phoneNumber;
                }
                jQuery(this).click(function () {
                    showInfo('' + poi.title.replace("'", "\\'") + '', false, '', '' + address.replace("'", "\\'") + '', poi.point.lng, poi.point.lat, phone);
                });
            });
        },
        onSearchComplete: function (result) {
            //alert("先执行");
            localsearchResult = result;
        }
    });
    local.search(sKeyword);
}

function fnBusSearch() {
    vM.clearOverlays();
    var txtstart = $('txtBusStart').value.trim();
    var txtend = $('txtBusEnd').value.trim();
    if (txtstart == '' || txtend == '') return;
    if (txtstart == txtend) {
        return;
    }
    clearReslut();
    $("resultli").innerHTML = '<span title="' + txtstart + '--' + txtend + '" style="display: block;">' + txtstart + '--' + txtend + '</span>';
    BusPolicyIndex = 0;
    transit.setPolicy(routePolicy[BusPolicyIndex]);
    transit.search('' + txtstart + '', '' + txtend + '');
  
    /*
        iframe方式
        var url = "/Fundation/BusTransferSearch.html?s=" + escape(txtstart) + "&e=" + escape(txtend) + "";
        var iframe = "<iframe src=\"" + url + "\" frameborder=\"0\" scrolling=\"no\" height=\"100%\" width=\"100%\" name=\"BusTransfer\" id=\"BusTransfer\"></iframe>";
        $('BodyContainer').innerHTML = iframe;

    */
}

function fnBusSearchForDialog(start, end) {
    vM.clearOverlays();
    if (start == '' || end == '') return;
    if (start == end) {
        return;
    }
    clearReslut();
    $("resultli").innerHTML = '<span title="' + start + '--' + end + '" style="display: block;">' + start + '--' + end + '</span>';
    BusPolicyIndex = 0;
    transit.setPolicy(routePolicy[BusPolicyIndex]);
    transit.search('' + start + '', '' + end + '');
}

function fnDriveSearch() {
    vM.clearOverlays();
    var txtstart = $('txtDriveStart').value.trim();
    var txtend = $('txtDriveEnd').value.trim();
    if (txtstart == '' || txtend == '') return;
    if (txtstart == txtend) {
        return;
    }
    clearReslut();
    $("resultli").innerHTML = '<span title="' + txtstart + '--' + txtend + '" style="display: block;">' + txtstart + '--' + txtend + '</span>';

    var drivewaypoints = new Array();
    if ($('navReturnIcon').style.display == "none") {
        var inputs = jQuery("input[data='mydata']");
        if (inputs.length > 0) {
            for (var i = 0; i < inputs.length; i++) {
                var via = $('txt_via_' + (i + 1)).value.trim();
                if (via != "") {
                    drivewaypoints[i] = '' + via + '';
                }
            }
        }
    }

    DrivePolicyIndex = 0;
    driving.setPolicy(routePolicy_Drive[DrivePolicyIndex]);
    if (drivewaypoints.length > 0) {
        driving.search('' + txtstart + '', '' + txtend + '', { waypoints: drivewaypoints }); //['温州动物园']
    }
    else {
        driving.search('' + txtstart + '', '' + txtend + '');
    }
}

function fnDriveSearchForDialog(start, end) {
    vM.clearOverlays();
    if (start == '' || end == '') return;
    if (start == end) {
        return;
    }
    clearReslut();
    $("resultli").innerHTML = '<span title="' + start + '--' + end + '" style="display: block;">' + start + '--' + end + '</span>';
    DrivePolicyIndex = 0;
    driving.setPolicy(routePolicy_Drive[DrivePolicyIndex]);
    driving.search('' + start + '', '' + end + '');
}

//站点互换
function KeyWordsChange() {
    if ($('txtBusStart').value.trim() != '' && $('txtBusEnd').value.trim() != '' && $('txtBusStart').value.trim() != '起点' && $('txtBusEnd').value.trim() != '终点') {
        var txtstart = $('txtBusStart').value.trim();
        var txtend = $('txtBusEnd').value.trim();

        $('txtBusStart').value = txtend;
        $('txtBusEnd').value = txtstart;
    }
}

//站点互换---驾车
function KeyWordsChange_Drive() {
    if ($('txtDriveStart').value.trim() != '' && $('txtDriveEnd').value.trim() != '' && $('txtDriveStart').value.trim() != '起点' && $('txtDriveEnd').value.trim() != '终点') {
        var txtstart = $('txtDriveStart').value.trim();
        var txtend = $('txtDriveEnd').value.trim();

        $('txtDriveStart').value = txtend;
        $('txtDriveEnd').value = txtstart;
    }
}

function showInfo(title, enableMessage, message, address, lng, lat, phone) {
    var point = new BMap.Point(lng, lat);
    var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
                    '<!--<img src="../img/baidu.jpg" alt="" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>-->' +
                    '<p style="float:left;width:45px;margin:0;">地址：</p><p style="float:left;width:230px;margin:0;">' + address + '</p><br/><p style="float:left;width:45px;margin:0;">电话：</p><p style="float:left;width:230px;margin:0;">' + phone + '</p><br/><!--简介：百度大厦位于北京市海淀区西二旗地铁站附近，为百度公司综合研发及办公总部。-->' +
                  '</div>';

    //创建检索信息窗口对象
    var searchInfoWindow = new BMapLib.SearchInfoWindow(vM, content, {
        title: title,      //标题
        width: 290,             //宽度
        //height: 105,              //高度
        panel: "panel",         //检索结果面板
        enableAutoPan: true,     //自动平移
        enableSendToPhone: false, //是否显示发送到手机按钮
        searchTypes: [
				BMAPLIB_TAB_SEARCH,   //周边检索
				BMAPLIB_TAB_TO_HERE,  //到这里去
				BMAPLIB_TAB_FROM_HERE //从这里出发
			]
    });
    searchInfoWindow.open(point);
}