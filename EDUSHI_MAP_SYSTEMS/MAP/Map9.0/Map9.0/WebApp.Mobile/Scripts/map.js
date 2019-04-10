$(function () {
    var isClick = false;
    var isClickpolygon = false;
    // 图层切换
    var is2DMapType = false;
    var isSatMapType = false;
    var trafficLayer = new AMap.TileLayer.Traffic({
        zIndex: 10
    });
    //高德瓦片图层
    var gaodeMap = new AMap.TileLayer();
    var sateLayer = new AMap.TileLayer.Satellite();
    var marker = new AMap.Marker({});
    // 初始化地图
    var map = new AMap.Map('container', {
        resizeEnable: true,
        zooms: [3, 17],
        zoom: 17,
        isHotspot: true,
        expandZoomRange: true,
        layers: []
    });
    //初始城市
    var currentCity = '杭州市';
    var storage = window.localStorage;

    $('#cityName').text(currentCity.substr(0, currentCity.length - 1));

    // 驾车
    var driving = new AMap.Driving({
        map: map,
        policy: AMap.DrivingPolicy.LEAST_TIME
    });
    // 公交
    var transfer = new AMap.Transfer({
        map: map,
        policy: AMap.TransferPolicy.LEAST_TIME
    });
    // 步行
    var walking = new AMap.Walking({
        map: map
    });
    //  map.setLayers([gaodeMap, cities[currentCity]]);
    $("#content").click(function (e) {
        var name = e.target.innerText;
        $('#keyword').val(name);
    });
    $(".text-ipt").click(function () {
        if (window.localStorage) {
            var history = storage.getItem('history');
            if (history) {
                $('#content li').empty();
                for (var i = history.split(',').length - 1; i >= 0; i--) {
                    var historyHtml = "<li><p>" + history.split(',')[i] + "</p></li>";
                    $('#content').append(historyHtml);
                }
                $(".search-history").show();
            }
        } else {
            // 不支持，不显示历史记录
            $(".search-history").hide();
        }
    });
    $('#line').click(function () {
        $('#city').show();
    });
    $(".clear-history p").click(function () {
        storage.clear();
        $(".search-history").hide();
    });
    $(".clear-history span").click(function () {
        $(".search-history").hide();
    });
    $('#search').click(function () {
        showDetail($('#keyword').val().trim());
    })
    $('.geolocation-con').click(function () {
        getGeolocation();
    })

    $(".travel-tab li").click(function () {
        $(this).addClass("on").siblings().removeClass("on");
        var start = getQueryString('start');
        var end = getQueryString('end');
        if ($(".travel-tab .bus").hasClass("on")) {
            clearMapTravel();
            transfer.search([{ keyword: start, city: currentCity }, { keyword: end, city: currentCity }], function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    sessionStorage.setItem('businfo', JSON.stringify(result));
                    $('#panel').empty();
                    for (var i = 0; i < result.plans.length; i++) { // 循环公交线路
                        var s = "";
                        var data = result.plans[i];
                        var li = (data.distance / 100 / 10).toFixed(2); // 获取公里
                        var minitu = Math.round(data.time / 60); // 获取时间
                        var cost = data.cost; // 获取公交费
                        for (var j = 0; j < data.segments.length; j++) {   //  公交路线详情
                            var results = data.segments[j];
                            if (results.transit_mode == "BUS") {  // 获取公交
                                var linename = results.transit.lines[0].name;
                                s += "<span class='line busline'> <span class='beforespan'></span><span class='afterspan'></span>" + linename + "</span>";
                            }
                        }
                        window.location.href = "/wap/Bus_list?start=" + escape(start) + "&end=" + escape(end) + "&currCity=" + escape(currentCity);
                        //var line = linename.substr(0, linename.indexOf('路') + 1);
                        //$('#panel').append("<div id='busline' class='planTitlebus' index='" + i + "'><h3>" + s + "</h3><p>" + minitu + "分钟(" + li + "公里)|<span class='red'>" + cost + "元</span></p><a id='detail' href='/wap/Line_drive_detail?city=" + escape(currentCity) + "&start=" + escape(start) + "&end=" + escape(end) + "'>路线详情></a></div>");
                        //$('#panel').append("<div class='planTitlebus' id='" + i + "'><h3>" + s + "</h3><p>" + minitu + "分钟(" + li + "公里)|<span class='red'>" + cost + "元</span></p><a id='detail' href='#'>路线详情></a></div>");
                        //$('#panel').append("<div class='planTitlewalk'><h3 class='planTitle_route'>" + linename + "<br/><b>从" + start + "到" + end + "</b></h3><p class='info'>" + minitu + "分钟(" + li + "公里)</p><a id='detail' href='/wap/Line_bus_detail?city=" + escape(currentCity) + "&start=" + escape(start) + "&end=" + escape(end) + "&line=" + escape(line) + "'>点击查看详情</a></div>");
                        break;
                        // 点击公交线路

                    }
                    $('.planTitlebus').on('click', function () {
                        // 获取当前点击的对象index属性
                        var index = $(this).context.id;
                        var data = $.parseJSON(sessionStorage.getItem('businfo'));
                        addBusLine(data.plans[index].path);
                    });
                }
            });
        }
        else if ($(".travel-tab .walk").hasClass("on")) {
            clearMapTravel();
            walking.search([{ keyword: start, city: currentCity }, { keyword: end, city: currentCity }], function (status, result) {
                if (status === 'complete' && result.info === 'ok') {
                    var li = (result.routes[0].distance / 100 / 10).toFixed(2);
                    var minitu = Math.round(result.routes[0].time / 60);
                    $('#panel').empty();
                    $('#panel').append("<div class='planTitlewalk'><h3 class='planTitle_route'><b>从" + start + "到" + end + "</b></h3><p class='info'>" + minitu + "分钟(" + li + "公里)</p><a id='detail' href='/wap/Line_walk_detail?city=" + escape(currentCity) + "&start=" + escape(start) + "&end=" + escape(end) + "'>路线详情></a></div>");
                }
            });
        }
        else {
            clearMapTravel();
            driving.search([{ keyword: start, city: currentCity }, { keyword: end, city: currentCity }], function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    var li = (result.routes[0].distance / 100 / 10).toFixed(2);
                    var minitu = Math.round(result.routes[0].time / 60);
                    $('#panel').empty();
                    $('#panel').append("<div class='planTitledriving'><h3 class='planTitle_route'><b>从" + start + "到" + end + "</b></h3><p class='info'>" + minitu + "分钟(" + li + "公里)</p><a id='detail' href='/wap/Line_drive_detail?city=" + escape(currentCity) + "&start=" + escape(start) + "&end=" + escape(end) + "'>路线详情></a></div>");
                }
            });
        }
    });
    //if (getQueryString('cityId') != null) {
    //    alert(unescape(getQueryString('cityId')));
    //}
    if (getQueryString('action') != null) {
        $('.top-box').hide();
        $('.travel-mode').show();
        $('.line-info-bottom').show();
        var start = getQueryString('start');
        var end = getQueryString('end');
        var minute = getQueryString('minute');
        var distance = getQueryString('distance');
        var index = getQueryString('index');
        if (getIs3D(currentCity)) {
            map.setLayers([gaodeMap, cities[currentCity]]);
        }
        $(".amap-geolocation-con,.map-lbar").addClass("on");
        var linename = getQueryString('linename');
        switch (getQueryString('action')) {
            case '1':// 驾车
                driving.search([{ keyword: start, city: currentCity }, { keyword: end, city: currentCity }], function (status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        var li = (result.routes[0].distance / 100 / 10).toFixed(2);
                        var minitu = Math.round(result.routes[0].time / 60);
                        $('#panel').append("<div class='planTitledriving'><h3 class='planTitle_route'><b>从" + start + "到" + end + "</b></h3><p class='info'>" + minitu + "分钟(" + li + "公里)</p><a id='detail' href='/wap/Line_drive_detail?city=" + escape(currentCity) + "&start=" + escape(start) + "&end=" + escape(end) + "'>路线详情></a></div>");
                    }
                });
                break;
            case '2': // 公交
                $('.bus').addClass("on").siblings().removeClass("on");
                transfer.search([{ keyword: start, city: currentCity }, { keyword: end, city: currentCity }], function (status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        //var html = "";
                        sessionStorage.setItem('businfo', JSON.stringify(result));
                        //        for (var i = 0; i < result.plans.length; i++) { // 循环公交线路
                        //            var s = "";
                        //            var data = result.plans[i];
                        //            var li = (data.distance / 100 / 10).toFixed(2); // 获取公里
                        //            var minitu = Math.round(data.time / 60); // 获取时间
                        //            var cost = data.cost; // 获取公交费
                        //            for (var j = 0; j < data.segments.length; j++) {   //  公交路线详情
                        //                var results = data.segments[j];
                        //                if (results.transit_mode == "BUS") {  // 获取公交
                        //                    var linename2 = results.transit.lines[0].name;
                        //                    s += "<span class='line busline'>" + linename2.substr(0, linename2.indexOf('路') + 1) + "</span>";
                        //                    html += "<div class='planTitlebus' id='" + i + "'><h3>" + s + "</h3><p>" + minitu + "分钟 (" + li + "公里)<em>|</em><span>" + cost + "元</span></p><a id='detail' href='/wap/Line_bus?city=" + escape(currentCity) + "&start=" + escape(start) + "&end=" + escape(end) + "'>路线详情></a></div>";
                        //                }


                        var line = linename.substr(0, linename.indexOf('路') + 1);

                        $('#panel').append("<div class='planTitlewalk'><h3 class='planTitle_route'>" + linename + "<br/><b>从" + start + "到" + end + "</b></h3><p class='info'>" + minute + "分钟(" + distance + "公里)</p><a id='detail' href='/wap/Line_bus_detail?city=" + escape(currentCity) + "&start=" + escape(start) + "&end=" + escape(end) + "&line=" + escape(line) + "'>查看详情</a></div>");
                        //$('.planTitlebus').on('click', function () {
                        //    // 获取当前点击的对象index属性
                        //    //var index = $(this).context.id;
                        //    var data = $.parseJSON(sessionStorage.getItem('businfo'));
                        //    addBusLine(data.plans[index].path);
                        //});
                    }
                    //$('#panel').append("<div id='busline' class='planTitlebus' index='" + i + "'><h3>" + s + "</h3><p>" + minitu + "分钟(" + li + "公里)|<span class='red'>" + cost + "元</span></p><a id='detail' href='/wap/Line_drive_detail?city=" + escape(currentCity) + "&start=" + escape(start) + "&end=" + escape(end) + "'>路线详情></a></div>");
                    //$('#panel').append("<div class='planTitlebus' id='" + i + "'><h3>" + s + "</h3><p>" + minitu + "分钟(" + li + "公里)|<span class='red'>" + cost + "元</span></p><a id='detail' href='/wap/Line_bus?city=" + escape(currentCity) + "&start=" + escape(start) + "&end=" + escape(end) + "'>路线详情></a></div>");
                    // 点击公交线路


                    //$('.planTitlebus').on('click', function () {
                    //    // 获取当前点击的对象index属性
                    //    var index = $(this).context.id;
                    //    var data = $.parseJSON(sessionStorage.getItem('businfo'));
                    //    addBusLine(data.plans[index].path);
                    //});
                });
                break;
            case '3': // 步行
                $('.walk').addClass("on").siblings().removeClass("on");
                walking.search([{ keyword: start, city: currentCity }, { keyword: end, city: currentCity }], function (status, result) {
                    if (status === 'complete' && result.info === 'ok') {
                        var li = (result.routes[0].distance / 100 / 10).toFixed(2);
                        var minitu = Math.round(result.routes[0].time / 60);
                        $('#panel').append("<div class='planTitlewalk'><h3 class='planTitle_route'><b>从" + start + "到" + end + "</b></h3><p class='info'>" + minitu + "分钟(" + li + "公里)</p><a id='detail' href='/wap/Line_walk_detail?city=" + escape(currentCity) + "&start=" + escape(start) + "&end=" + escape(end) + "'>路线详情></a></div>");
                    }
                });
                break;
        }
    }

    var route;
    // 添加公交线路
    function addBusLine(path) {
        map.clearMap();
        var lnglat = [];
        for (var i = 0; i < path.length; i++) {
            lnglat.push([path[i].lng, path[i].lat]);
        }
        if (route) {
            route.destroy();
        }
        map.plugin("AMap.DragRoute", function () {
            route = new AMap.DragRoute(map, lnglat); //构造拖拽导航类
            route.search(); //查询导航路径并开启拖拽导航 
            route.on('complete', function (type, target, data) {
            });
        });
    }

    // 自动输入
    var auto = createAutoComplete('keyword', currentCity);
    AMap.plugin(['AMap.Autocomplete'], function () {
    });
    AMap.event.addListener(auto, "choose", select);
    AMap.event.addListener(auto, "select", select);


    // 精准实时定位
    if (!getQueryString('isLocation')) {
        getGeolocation();
    }
    // 放大缩小
    AMapUI.loadUI(['control/BasicControl'], function (BasicControl) {
        zoomCtrl2 = new BasicControl.Zoom({
            position: 'rb'
        });
        map.addControl(zoomCtrl2);
        if (getQueryString('action') != null) {
            $('.amap-ui-control-position-rb').addClass("on");
        }
    });
    var cId = getQueryString('id');
    var is3d = getQueryString('is3D');
    if (cId) {
        if (cId.split("#").length > 1) {
            var citylnglat = cId.split("#");
            var lnglat = citylnglat[1];
            if (lnglat.split(",").length > 1) {
                map.setZoomAndCenter(17, [lnglat.split(",")[0], lnglat.split(",")[1]]);
                currentCity = getQueryString("cityName");
                $("#currCity").html("<span>" + currentCity.substr(0, currentCity.length - 1) + "</span>");
                if (currentCity) {
                    map.setLayers([gaodeMap, cities[currentCity]]);
                }
                //else {
                //    map.setLayers([gaodeMap, cities["杭州市"]]);
                //}
            }
            else if (cId.split("#").length = 1) {
                map.setCity(cId.split("#")[0]);
            }
        }
        else {
            currentCity = getQueryString("cityName");
            $("#currCity").html("<span>" + currentCity.substr(0, currentCity.length - 1) + "</span>");
            map.setCity(cId);
        }
        if (is3d) {
            $(".map-3d").addClass("on");
            $(".map-2d").removeClass("on");
        } else {
            $(".map-2d").addClass("on");
            $(".map-3d").removeClass("on");
        }
    };
    function getGeolocation() {
        map.plugin('AMap.Geolocation', function () {
            geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                showButton: true,        //显示定位按钮，默认：true
                showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                buttonPosition: 'LB',
                markerOptions: {
                    map: map,
                    Icon: './images/logo.png'
                }
            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition();
            AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
            AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
        });
        if (getQueryString('action')) {
            $(".amap-geolocation-con").addClass("on");
        }
    }
    //解析定位结果
    function onComplete(data) {
        currentCity = data.addressComponent.city;

        if ($('.map-satellite').hasClass('on') || $('.map-2d').hasClass('on')) {
            map.setFeatures(['bg', 'point', 'road', 'building']);
        }
        else {
            map.setLayers([gaodeMap, cities[currentCity]]);
        }

        map.setCenter(data.position);
    }
    //解析定位错误信息
    function onError(data) {
        alert('定位失败');
        map.setCenter([120.162, 30.254]);
    }
    // 清除地图线路
    function clearMapTravel() {
        driving.clear();
        transfer.clear();
        walking.clear();
    }

    // 获取地图热点信息
    function getHotspots(lnglag, currentCity) {
        $.ajax({
            type: "get",
            url: "/Wap/GetMOIList",
            data: {
                "bounds": lnglag,
                "city": currentCity
            },
            dataType: 'json',
            success: function (data) {
                if (data != null) {
                    for (var i = 0; i < data.length; i++) {
                        var polygonArr = [];
                        var coordinates = data[i]['moin_coordinates'].split(';');
                        for (var j = 0; j < coordinates.length - 1; j++) {
                            var x = parseFloat(coordinates[j].split(',')[0]);
                            var y = parseFloat(coordinates[j].split(',')[1]);
                            polygonArr.push([x, y]);
                        }
                        var centerX = parseFloat(data[i]['moin_center_x']);
                        var centerY = parseFloat(data[i]['moin_center_y']);

                        var polygon = new AMap.Polygon({
                            map: map,
                            path: polygonArr,//设置多边形边界路径
                            strokeColor: "transparent", //线颜色
                            strokeOpacity: 0, //线透明度
                            strokeWeight: 0,    //线宽
                            fillColor: "#f7ed46", //填充色
                            fillOpacity: 0.2,//填充透明度
                            extData: { 'moin_name': data[i]['moin_name'], 'moin_center_x': centerX, 'moin_center_y': centerY, 'moit_name': data[i]['moit_name'], 'moit_desc': data[i]['moit_desc'] }
                        });
                        polygon.on('click', function () {
                            map.off('moveend', moveendCallBack);
                            isClickpolygon = true;
                            var name = this.getExtData()['moin_name'];
                            var type = this.getExtData()['moit_desc'];
                            var element = createElements(name, type);
                            infoWindow = new AMap.InfoWindow({
                                autoMove: true,//是否自动调整窗体到视野内
                                closeWhenClickMap: true, // 控制是否在鼠标点击地图后关闭信息窗体
                                content: element,//info.join("<br/>")  //使用默认信息窗体框样式，显示信息内容
                                offset: new AMap.Pixel(30, -41)
                            });
                            marker.setMap(null);//移除当前Marker
                            $('.layout-box').remove();
                            //infoWindow.setPosition(new AMap.LngLat(centerX, centerY));
                            addMarker([this.getExtData()['moin_center_x'], this.getExtData()['moin_center_y']], name, type); // 点击建筑物marker
                            // infoWindow.open(map, [this.getExtData()['moin_center_x'], this.getExtData()['moin_center_y']]);
                            clickDetail(name); // 点击建筑物详情
                        });
                        polygon.on('mouseout', function () {
                            map.on('moveend', moveendCallBack);
                            this.setOptions({ 'strokeColor': 'transparent' });
                        });
                        polygon.on('mouseover', function () {
                            map.on('moveend', moveendCallBack);
                            this.setOptions({ 'strokeColor': '#FF33FF', 'strokeOpacity': 0.5, 'strokeWeight': 2, });
                        });
                    }
                }
            },
            error: function () { alert("数据获取失败！"); }
        });
    }
    function showDetail(name) {
        $.ajax({
            type: "get",
            url: "/Wap/GetLngLat",
            data: {
                "name": name,
                "city": currentCity
            },
            async: false,
            dataType: 'json',
            success: function (data) {
                try {
                    if (data != null && data.length > 0) {
                        var centerX = parseFloat(data[0]['moin_center_x']);
                        var centerY = parseFloat(data[0]['moin_center_y']);
                        var name = data[0]['moin_name'];
                        var type = data[0]['moit_desc'];
                        $('.search-history').hide();
                        addMarker([centerX, centerY], name, type);
                    }
                } catch (e) {
                    console.log(e.name + " " + e.message);
                }
            },
            error: function () { console.log("数据获取失败！"); }
        });
    }
    // 添加点标记
    function addMarker(lnglat, name, type) {
        marker.setIcon("../images/mark.png");
        marker.setPosition(lnglat);
        marker.setMap(map);
        map.setCenter(lnglat);
        createElement(name, '', '', type);
        $(".amap-geolocation-con, .amap-ui-control-container, .map-lbar").addClass("on");
        $('#gohere').click(function () {
            window.location.href = "/wap/Line?endpoint=" + escape(name);
        })
    }
    // 判断是否3d城市
    function getIs3D(currentCity_Temp) {
        var is3D = false;
        for (var cityinfo in cities) {
            if (cityinfo.indexOf(currentCity_Temp) > -1) {
                is3D = true;
            }
        }
        return is3D;
    }
    // 自定窗体
    function createElement(name, adress, tel, type) {
        var image = "../images/place_default.jpg";
        var element = "<section class='layout-box'>" +
            "<div class='layout-info clearfix'>" +
            "<div class='img'>" + "<img src='" + image + "' />" +
            "</div>" +
            "<div class='info'>" +
            "<div class='layout-title'>" + "<span>" + name + "</span>" +
            "<a id='gohere'>去这里" + "</a>" +
            "</div>" +
            "<p class='clearfix'>" +
            "<span>地址:" + "</span>" +
            "<span class='tips'>" + adress + "</span>" +
            "</p>" +
            "<p class='clearfix'>" +
             "<span>电话:" + "</span>" +
             "<span class='tips'>" + tel + "</span>" +
            "</p>" +
            "<p class='clearfix'>" +
            "<span>类型:" + "</span>" +
             "<span class='tips'>" + type + "</span>" +
            "</p>" +
            "</div>" +
            "</div>" +
            "</section>";
        $(document.body).append(element);
    }
    // 鼠标拖动回调
    function moveendCallBack() {
        map.getCity(function (data) {
            if (data['province'] && typeof data['province'] === 'string') {
                if (data['city'] == '') {
                    currentCity = data['province'];
                } else {
                    currentCity = data['city'];
                    $('#cityName').text(currentCity);
                }
                (function () {
                    if (cities[currentCity]) {
                        //if (isVisible && !is2DMapType && !isSatMapType) {
                        //    map.setLayers([gaodeMap, trafficLayer, cities[currentCity]]);
                        //}
                        //else if (is2DMapType && !isVisible) {
                        //    map.setLayers([gaodeMap]);
                        //}
                        //else if (isSatMapType && !isVisible) {
                        //    map.setLayers([sateLayer]);
                        //}
                        //else if (isSatMapType && isVisible) {
                        //    map.setLayers([trafficLayer, sateLayer]);
                        //}
                        //else if (!is2DMapType && !isSatMapType) {
                        //    map.setLayers([gaodeMap, cities[currentCity]]);
                        //}
                    }
                    else
                        return -1;
                })();
                $('.place span').text(currentCity);
                auto.setCity(currentCity);
            } else {
                $('#cityName').text("其他地区");
            }
        });

        if (isClick && map.getFeatures() == 'bg') {
            isClick = false;
        }
        else {
            if (isClickpolygon) {
                isClickpolygon = false;
            } else {
                if (map.getZoom() > 16) {//.toString()
                    if ($('.map-satellite').hasClass('on') || $('.map-2d').hasClass('on')) { return; }
                    $('.layout-box').hide();
                    $(".amap-geolocation-con, .amap-ui-control-container, .map-lbar").removeClass("on");
                    if (getQueryString('action')) {
                        $(".amap-geolocation-con,.map-lbar").addClass("on");
                        $('.amap-ui-control-position-rb').addClass("on");
                        return;
                    } else {
                        map.clearMap();
                        getHotspots(map.getBounds().toString(), currentCity);
                    }
                }
                else {
                    return;
                }
            }
        }
    }

    map.on('touchend', moveendCallBack); // 触摸结束后


    // 自动输入
    function createAutoComplete(inputNameID, city) {
        return new AMap.Autocomplete({ input: inputNameID, city: city, outPutDirAuto: false });
    }
    function select(e) {
        var historyStorage = storage.getItem('history');
        if (historyStorage == null) {
            storage.setItem('history', e.poi.name);
        } else {
            if (historyStorage.split(',').length < 6) {
                if (historyStorage.indexOf(e.poi.name) < 0) {
                    historyStorage += ',' + e.poi.name;
                    storage.setItem('history', historyStorage);
                }
            }
        }

        // storage.setItem('history', history)
        //placeSearch.setCity(e.poi.adcode);
        //placeSearch.search(e.poi.name);
    }

    $(".map-2d").click(function () {
        $('.layout-box').remove();
        $(".amap-geolocation-con, .amap-ui-control-container, .map-lbar").removeClass("on");
        isSatMapType = false;
        is2DMapType = true;
        $(".map-style-control li").removeClass("on");
        $(this).addClass("on");
        map.setLayers([gaodeMap]);
        map.setZoom(map.getZoom());
        if (!isShowStyle()) {
            if (map.getZoom() > 16) {
                map.clearMap();
                map.setFeatures(['bg', 'point', 'road', 'building']);
            }
        }

        //if (getQueryString('action')) {
        //    $(".amap-geolocation-con,.map-lbar").addClass("on");
        //    $('.amap-ui-control-position-rb').addClass("on");
        //}
    });
    $(".map-sat").click(function () {
        $('.layout-box').remove();
        $(".amap-geolocation-con, .amap-ui-control-container, .map-lbar").removeClass("on");
        map.off('moveend', moveendCallBack);
        isSatMapType = true;
        is2DMapType = false;
        $(".map-style-control li").removeClass("on");
        $(this).addClass("on");

        sateLayer.setMap(map);
        map.setZoom(map.getZoom());
        if (!isShowStyle()) {
            if (map.getZoom() > 16) {
                map.clearMap();
                map.setFeatures(['bg', 'point', 'road', 'building']);
            }
        }
    });
    $(".map-3d").click(function () {
        is2DMapType = false;
        isSatMapType = false;
        $(".map-style-control li").removeClass("on");
        $(this).addClass("on");
        map.setLayers([gaodeMap, cities[currentCity]]);
        map.setZoom(map.getZoom());
        map.setFeatures(['bg', 'point', 'road', 'building']);
        if (!isShowStyle()) {
            if (map.getZoom() > 16) {
                map.clearMap();
                map.setFeatures(['bg']);
                getHotspots(map.getBounds().toString(), currentCity);
            }
        }
    });
    function isShowStyle() {
        if (getQueryString('action')) {
            $(".amap-geolocation-con,.map-lbar").addClass("on");
            $('.amap-ui-control-position-rb').addClass("on");
            return true;
        }
    }
    //路况
    var isVisible = false;
    AMap.event.addDomListener(document.getElementById("trafficId"), 'click', function () {
        trafficLayer.setMap(map);
        if (isVisible) {
            trafficLayer.hide();
            isVisible = false;
        } else {
            trafficLayer.show();
            isVisible = true;
        }
        //    //var crtTime = new Date();
        $(this).toggleClass("on");
        //    //$(".traffic-box").toggle();
        //    //$(".traffic-info .week, .traffic-info .time-line").hide();
        //    //$(".traffic-info").find(".time").html('<span class="lbl">更新时间：</span><span class="date">' + dateFtt("yyyy-MM-dd hh:mm:ss", crtTime) + '</span>');

    }, false);
});






