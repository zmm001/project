// 出行路线规划，驾车，公交，步行
$(function () {
    //初始城市
    var currentCity = '杭州';
    var trafficLayer = new AMap.TileLayer.Traffic({
        zIndex: 10
    });
    var is2DMapType = false;
    var isSatMapType = false;

    $('#cityName').text(currentCity);
    //currentCityCallBack(cityShow);
    // 城市切换
    cityClick(".city-box .city-hotlist span");
    cityClick(".city-box .city-list .slim-scroll-div span");
    cityClick(".city-box .city-list city-city-box .slim-scroll-div span");

    // 放大缩小
    AMapUI.loadUI(['control/BasicControl'], function (BasicControl) {
        zoomCtrl2 = new BasicControl.Zoom({
            position: 'rb',
        });
        map.addControl(zoomCtrl2);
    });

    // 精准实时定位
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
            buttonPosition: 'RB',
            markerOptions: {
                map: map,
                icon: './images/location.png'
            }
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
        AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
    });

    var placeSearch = new AMap.PlaceSearch({
        pageSize: 5,
        pageIndex: 1,
        map: map,
        panel: "panel"
    });  //构造地点查询类

    map.on('hotspotclick', function (result) {
        //根据热区编号来查询相关信息
        placeSearch.getDetails(result.id, function (status, result) {
            //查询结果状态
            if (status === 'complete' && result.info === 'OK') {
                placeSearch_CallBack2(result);
            }
        });
    });
    queryWeather(currentCity); // 天气预报

    // 地图事件
    map.on('zoomchange', function () {
        if (map.getZoom() < 18) {
            if (map.getFeatures() == 'bg') {
                map.clearMap();
            }
            this.setFeatures(['bg', 'point', 'road', 'building']);
        } else if (map.getZoom() > 17) {
            if ($('.map-3d').hasClass('on')) {
                map.setFeatures(['bg']);
            } else if ($('.map-2d').hasClass('on')) {
                map.setFeatures(['bg', 'point', 'road', 'building']);
            } else if ($('.map-satellite').hasClass('on')) {
                map.setFeatures(['bg', 'point', 'road', 'building']);
            }
            if (map.getFeatures() == 'bg')
                getHotspots(getHotspots(map.getBounds().toString(), currentCity));
        }

    })

    var isquery = false; // 搜索框查询
    // 查询
    $('#query').click(function () {
        isquery = true;
        $('.navigate_icon img').attr('src', './Image/close.png');
        showDetail($('#keyword').val().trim());
        //if (infoWindow.getIsOpen()) {
        //    clickDetail($('#keyword').val().trim())
        //}
    });
    function showDetail(name) {
        $.ajax({
            type: "get",
            url: "/Home/GetLngLat",
            data: {
                "name": name,
                "city": currentCity
            },
            async: false,
            dataType: 'json',
            success: function (data) {
                if (data != null) {
                    var centerX = parseFloat(data[0]['moin_center_x']);
                    var centerY = parseFloat(data[0]['moin_center_y']);
                    var element = createElements(name);
                    map.setCenter(new AMap.LngLat(centerX, centerY));
                    infoWindow = new AMap.InfoWindow({
                        autoMove: true,//是否自动调整窗体到视野内
                        closeWhenClickMap: true, // 控制是否在鼠标点击地图后关闭信息窗体
                        content: element,//info.join("<br/>")  //使用默认信息窗体框样式，显示信息内容
                        offset: new AMap.Pixel(30, -41)
                    });
                    infoWindow.open(map, map.getCenter());

                    clickDetail(name)
                }
            },
            error: function () { console.log("数据获取失败！"); }
        });
    }


    //高德瓦片图层
    var gaodeMap = new AMap.TileLayer();
    var sateLayer = new AMap.TileLayer.Satellite();
    var infoWindow2 = new AMap.AdvancedInfoWindow({});
    // 驾车
    var driving = new AMap.Driving({
        map: map,
        panel: "panel",
        policy: AMap.DrivingPolicy.LEAST_TIME
    });
    // 公交
    var transfer = new AMap.Transfer({
        map: map,
        panel: "panel",
        policy: AMap.TransferPolicy.LEAST_TIME
    });
    // 步行
    var walking = new AMap.Walking({
        map: map,
        panel: "panel"
    });
    // 出行线路规划
    $(".dir-submit").click(function () {
        map.off('moveend', moveendCallBack);
        map.setFeatures(['bg', 'point', 'road', 'building']);
        var options = $(".dir-submit").text();
        var start = $('.dir-from-ipt').val();
        var end = $('.dir-to-ipt').val();
        clearMapTravel();
        if (start == '') {
            alert('请输入起点')
        } else if (end == '') {
            alert('请输入终点')
        }
        else {
            switch (options) {
                case "开车去":
                    clearMapTravel();
                    driving.search([{ keyword: start, city: currentCity }, { keyword: end, city: currentCity }]);
                    break;
                case "坐公交":
                    clearMapTravel();
                    transfer.search([{ keyword: start, city: currentCity }, { keyword: end, city: currentCity }]);
                    break;
                case "走路去":
                    clearMapTravel();
                    walking.search([{ keyword: start, city: currentCity }, { keyword: end, city: currentCity }]);
                    break;
            }
        }
    });
    // 点击路线弹出
    $(".button-group .navigate-icon").click(function () {
        $(".dir-line-box").show();
    });
    $(".dir-line-box .icon-close").click(function () {
        map.on('moveend', moveendCallBack);
        clearMapTravel();
        $('.dir-from-ipt').val('');
        $('.dir-to-ipt').val('');
        $(".dir-line-box").hide();
        $(".map-lib-driving").hide();
    });
    // 线路切换
    $(".traffic-tab span").click(function () {
        $(this).addClass("on").parents("li").siblings().find("span").removeClass("on");
        if ($(".traffic-tab .icon-car").hasClass("on")) {
            $(".dir-submit").text("开车去");
            clearMapTravel();
        } else if ($(".traffic-tab .icon-bus").hasClass("on")) {
            $(".dir-submit").text("坐公交");
            clearMapTravel();
        } else {
            $(".dir-submit").text("走路去");
            clearMapTravel();
        }
    });
    // 切换起始点
    $('#dir_exchange').click(function () {
        var start = $('.dir-from-ipt').val();
        var end = $('.dir-to-ipt').val();
        $('.dir-from-ipt').val(end);
        $('.dir-to-ipt').val(start);
    })
    // 自动输入
    var auto = createAutoComplete('keyword');

    AMap.plugin(['AMap.Autocomplete'], function () {
        //输入自动提示
        $("#keyword").focus(function () {
            auto = createAutoComplete('keyword');
            auto.setCity(currentCity);
            AMap.event.removeListener(auto, "select", select);
        });
        $('#start_point').focus(function () {
            auto = createAutoComplete('start_point');
            auto.setCity(currentCity);
            AMap.event.removeListener(auto, "select", select);
        });
        $('#end_point').focus(function () {
            auto = createAutoComplete('end_point');
            auto.setCity(currentCity);
            AMap.event.removeListener(auto, "select", select);
        });

    })

    // 放大缩小
    AMapUI.loadUI(['control/BasicControl'], function (BasicControl) {
        zoomCtrl2 = new BasicControl.Zoom({
            position: 'rb',
        });
        map.addControl(zoomCtrl2);
    })

    var isClick = false;
    $('.amap-geolocation-con .amap-geo').click(function () {
        map.off('moveend', moveendCallBack);
        isClick = true;
    })
    var isClickpolygon = false;
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
                        if (isVisible && !is2DMapType && !isSatMapType) {
                            map.setLayers([gaodeMap, trafficLayer, cities[currentCity]]);
                        }
                        else if (is2DMapType && !isVisible) {
                            map.setLayers([gaodeMap]);
                        }
                        else if (isSatMapType && !isVisible) {
                            map.setLayers([sateLayer]);
                        }
                        else if (isSatMapType && isVisible) {
                            map.setLayers([trafficLayer, sateLayer]);
                        }
                        else if (!is2DMapType && !isSatMapType) {
                            map.setLayers([gaodeMap, cities[currentCity]]);
                        }
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
                if (map.getZoom() > 17 && map.getFeatures() == 'bg') {//.toString()
                    if (isquery) {  // 搜索框查询
                        isquery = false;
                        getHotspots(map.getBounds().toString(), currentCity);
                    } else {
                        map.clearMap();
                        getHotspots(map.getBounds().toString(), currentCity);
                    }
                } else {
                    return;
                }
            }
        }

    }

    map.on('moveend', moveendCallBack);

    // 自动获取焦点
    function autoFocus(id) {
        var focus = document.getElementById(id);
        focus.setAttribute("autofocus", true);
    }
    // 自动输入完成
    function createAutoComplete(inputNameID) {
        return new AMap.Autocomplete({ input: inputNameID, city: '' });
    }
    function select(e) {
        placeSearch.setCity(e.poi.adcode);
        placeSearch.search(e.poi.name);
    }
    // 根据起点找终点
    function startToEnd(id, name) {
        $('#start_point').val(name);
        var end = $('#end_point_detail').val();
        $('#end_point').val(end);
        $(id).addClass("on").parents("li").siblings().find("span").removeClass("on");
        if ($(".traffic-tab .icon-car").hasClass("on")) {
            $(".dir-submit").text("开车去");
        } else if ($(".traffic-tab .icon-bus").hasClass("on")) {
            $(".dir-submit").text("坐公交");
        } else {
            $(".dir-submit").text("走路去");
        }
        $(".dir-line-box").show();
        $(".layout-box").hide();
    }
    // 根据终点找起点
    function endToStart(id, name) {
        $('#end_point').val(name);
        var end = $('#start_point_detail').val();
        $('#start_point').val(end);
        $(id).addClass("on").parents("li").siblings().find("span").removeClass("on");
        if ($(".traffic-tab .icon-car").hasClass("on")) {
            $(".dir-submit").text("开车去");
        } else if ($(".traffic-tab .icon-bus").hasClass("on")) {
            $(".dir-submit").text("坐公交");
        } else {
            $(".dir-submit").text("走路去");
        }
        $(".dir-line-box").show();
        $(".layout-box").hide();
    }
    // 查询跳转城市
    function search(citycode) {
        map.setCity(citycode);
    }

    function cityClick(obj) {
        $(obj).click(function () {
            var adcode = $(this).context.id;
            currentCity = this.innerText;
            queryWeather(currentCity);
            $('#cityName').text(currentCity);
            var orignalText = $(".city-current .city").text().trim();
            var currentText = orignalText.replace(orignalText.split("：")[1].replace(orignalText), this.innerText);
            $(".city-current .city").text(currentText);
            if (adcode.split("#").length > 1) {
                if (cities.hasOwnProperty(this.innerText + "市") || cities.hasOwnProperty(this.innerText + "县")) {
                    var coor = adcode.split("#")[1];
                    map.setZoomAndCenter(18, [parseFloat(coor.split(",")[0]), parseFloat(coor.split(",")[1])]);
                }
                else {
                    var layer = new AMap.TileLayer();
                    if (this.innerText == "中山") {
                        map.setCity(this.innerText + "市");
                    }
                    else {
                        map.setCity(this.innerText);
                    }
                    map.setLayers([layer]);
                    map.setZoom(13);

                }
            }
            else {
                var layer = new AMap.TileLayer();
                map.setCity(this.innerText);
                map.setLayers([layer]);
                map.setZoom(13);
            }

            if (getIs3D(currentCity)) {
                map.setFeatures(['bg']);
                add3D();
            } else {
                map.setFeatures(['bg', 'point', 'road', 'building']);
                // 去除二维城市中三维图标
                remove3D();
            }
        })
    };
    // 去除二维城市中三维图标
    function remove3D() {
        $('.map-3d').hide();
        $('.map-2d').addClass('only');
    }
    // 添加三维城市中三维图标
    function add3D() {
        $('.map-3d').show();
        $('.map-2d').removeClass('only');
    }
    // 根据输入框搜索内容
    function placeSearch(id, city) {
        AMap.service(["AMap.PlaceSearch"], function () {
            var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
                pageSize: 5,
                pageIndex: 1,
                city: city,
                map: map,
                panel: "panel"
            });
            //关键字查询
            placeSearch.search($(id).val());
        });
    }
    // 自动获取当前城市信息
    function currentCityCallBack(callback) {
        AMap.service(["AMap.CitySearch"], function () {
            //实例化城市查询类 
            var citysearch = new AMap.CitySearch();
            //自动获取用户IP，返回当前城市 
            citysearch.getLocalCity(function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    if (result && result.city && result.bounds) {
                        if (callback) callback(result);
                    }
                } else {
                    alert("获取城市信息失败,稍后重新尝试！");
                }
            });
        })
    }
    // 显示当前城市
    function cityShow(data) {
        currentCity = data.city;
    }
    // 创建高级窗体dom元素
    function createElements(name, types) {
        var imgage = "../images/place_default.jpg";
        var address = "";
        var iphone = "";
        var type = types == null ? "商务住宅;产业园区;产业园区" : types;
        var elements = "<div class='layout-box'>" +
                                   "<div class='layout-title'>" + name + /*"<a href='http://hz.edushi.com/' target='_blank'>详情" + "</a>" +*/ "</div>" +
                                    "<div class='layout-info clearfix'>" + "<div class='img'>" + "<img src='" + imgage + "'/>" + "</div>" + "<div class='info'>" + "<p>" + "<span>地址:" + "</span>" + address + "</p>" + "<p>" + "<span>电话:" + "</span>" + iphone + "</p>" + "<p>" + "<span>类型:" + "</span>" + type + "</p>" + "</div>" + "</div>" +
                                    "<div class='tab-nav clearfix'>" + "<span class='nearby-search on' >在附近找" + "</span>" + "<span class='from-here'>这里出发" + "</span>" + "<span class='go-here'>到这里去" + "</span>" + "</div>" +
                                    "<div class='tab-content clearfix' style='display: block;' > " + "<input type='text' name=' ' id='nearbySearch' class='ipt search-ipt' placeholder='输入附近要找的地点'/>" + "<span class='search-btn' >" + "</span>" + "</div>" +
                                    "<div class='tab-content clearfix' >" + "<input type='text' name=' ' id='end_point_detail' placeholder='请输入终点'  class='ipt'/>" + "<span class='drive' id='end_drive' >驾车" + "</span>" + "<span class='bus' id='end_bus' >公交" + "</span>" + "<span class='walk' id='end_walk' >步行" + "</span>" + "</div>" +
                                    "<div class='tab-content clearfix' >" + "<input type='text' name=' ' id='start_point_detail' placeholder='请输入起点' class='ipt' />" + "<span class='drive' id='start_drive' >驾车" + "</span>" + "<span class='bus' id='start_bus' >公交" + "</span>" + "<span class='walk' id='start_walk' >步行" + "</span>" + "</div>" +
                                    "</div>";
        return elements;
    }
    // 点击建筑物详情
    function clickDetail(name) {
        tabClick(".layout-box .tab-nav span", ".tab-content", "on"); // 线路切换
        $("#nearbySearch").focus(function () {
            auto = createAutoComplete('nearbySearch');
            auto.setCity(currentCity);
            AMap.event.removeListener(auto, "select", select);
        });
        $('#end_point_detail').focus(function () {
            auto = createAutoComplete('end_point_detail');
            auto.setCity(currentCity);
            AMap.event.removeListener(auto, "select", select);
        });
        $('#start_point_detail').focus(function () {
            auto = createAutoComplete('start_point_detail');
            auto.setCity(currentCity);
            AMap.event.removeListener(auto, "select", select);
        });
        // 详情跳转
        // 驾车
        $('#end_drive').click(function () {
            startToEnd('span.icon-drive', name);
        })
        // 公交
        $('#end_bus').click(function () {
            startToEnd('span.icon-bus', name);
        })
        // 步行
        $('#end_walk').click(function () {
            startToEnd('span.icon-walk', name);
        })
        // 驾车
        $('#start_drive').click(function () {
            endToStart('span.icon-drive', name);
        })
        // 公交
        $('#start_bus').click(function () {
            endToStart('span.icon-bus', name);
        })
        // 步行
        $('#start_walk').click(function () {
            endToStart('span.icon-walk', name);
        })
        // 页面详情查询
        $(".search-btn").click(function () {
            placeSearch.search($('#nearbySearch').val().trim());
        });
    }
    // 清除地图线路
    function clearMapTravel() {
        driving.clear();
        transfer.clear();
        walking.clear();
    }
    // 天气预报
    function queryWeather(currentCity) {
        AMap.service('AMap.Weather', function () {
            var weather = new AMap.Weather();
            weather.getLive(currentCity, function (err, data) {
                if (!err) {
                    $('#weather').text(data.weather);
                    $('#temperature').text(data.temperature + "℃");
                } else {
                    $('#weather').text("晴");
                    $('#temperature').text("9/22℃");
                }
            })
        })
    }
    // 获取地图热点信息
    function getHotspots(lnglag, currentCity) {
        $.ajax({
            type: "get",
            url: "/Home/GetMOIList",
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
                            //infoWindow.setPosition(new AMap.LngLat(centerX, centerY));
                            infoWindow.open(map, [this.getExtData()['moin_center_x'], this.getExtData()['moin_center_y']]);
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

    //获取是否是三维城市
    function getIs3D(currentCity_Temp) {
        var is3D = false;
        for (var cityinfo in cities) {
            if (cityinfo.indexOf(currentCity_Temp) > -1) {
                is3D = true;
            }
        }
        return is3D;
    }

    //解析定位结果
    function onComplete(data) {
        currentCity = data.addressComponent.city;
        $('.place span').text(currentCity);
        auto.setCity(currentCity);
        map.setCenter(data.position);
        if (getIs3D(currentCity)) {
            if ($('.map-3d').hasClass('on')) {
                map.setFeatures(['bg']);
            } else if ($('.map-2d').hasClass('on')) {
                map.setFeatures(['bg', 'point', 'road', 'building']);
            } else if ($('.map-satellite').hasClass('on')) {
                map.setFeatures(['bg', 'point', 'road', 'building']);
            }
            add3D();
        } else {
            map.setFeatures(['bg', 'point', 'road', 'building']);
            remove3D();
        }
    }
    //解析定位错误信息
    function onError(data) {
        alert('定位失败');
        map.setCenter([120.162, 30.254]);
    }

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
        var crtTime = new Date();
        $(this).toggleClass("on");
        $(".traffic-box").toggle();
        $(".traffic-info .week, .traffic-info .time-line").hide();
        $(".traffic-info").find(".time").html('<span class="lbl">更新时间：</span><span class="date">' + dateFtt("yyyy-MM-dd hh:mm:ss", crtTime) + '</span>');

    }, false);

    // 测距
    var ruler2;
    map.plugin(["AMap.RangingTool"], function () {

        var sMarker = {
            icon: new AMap.Icon({
                size: new AMap.Size(19, 31),//图标大小
                image: "../images/pointer.png"
            })
        };
        var eMarker = {
            icon: new AMap.Icon({
                size: new AMap.Size(19, 31),//图标大小
                image: "../images/pointer.png"
            }),
            offset: new AMap.Pixel(-9, -31)
        };
        var lOptions = {
            strokeStyle: "solid",
            strokeColor: "#ff5051",
            strokeOpacity: 1,
            strokeWeight: 2
        };
        var rulerOptions = { startMarkerOptions: sMarker, endMarkerOptions: eMarker, lineOptions: lOptions };
        ruler2 = new AMap.RangingTool(map, rulerOptions);

        AMap.event.addListener(ruler2, "end", function (e) {
            ruler2.turnOff();
            enableRanging = false;
            $(".layerbox .ranging").removeClass("on");
            this.myTitle = "";
            $("#tooltip").remove();
        });
    });

    var enableRanging = false;
    $(".layerbox .ranging").click(function () {
        $(this).toggleClass("on");

        if (enableRanging) {
            enableRanging = false;
            ruler2.turnOff();
            $("#tooltip").remove();
        }
        else {
            enableRanging = true;
            ruler2.turnOn();

            var x = 10;
            var y = 20;
            var myTitle = "单击确定起点";
            var tooltip = "<div id='tooltip'>" + myTitle + "</div>";
            $("body").append(tooltip);
            $(".tooltip").mouseover(function (e) {
                myTitle = "单击继续,双击结束";
                $("#tooltip").css({ "top": (e.pageY + y) + "px", "left": (e.pageX + x) + "px" }).show("fast");
            }).click(function () {
                myTitle = "单击继续,双击结束";
                $("#tooltip").remove();
            }).mousemove(function (e) {
                myTitle = "单击继续,双击结束";
                $("#tooltip").css({ "top": (e.pageY + y) + "px", "left": (e.pageX + x) + "px" });
            }).dblclick(function () {
                $("#tooltip").remove();
            })
        }
    });


    $(".map-2d").click(function () {
        isSatMapType = false;
        is2DMapType = true;
        $(".map-style-control li").removeClass("on");
        $(this).addClass("on");
        map.setLayers([gaodeMap]);
        map.setZoom(map.getZoom());
        if (map.getZoom() > 17) {
            map.clearMap();
            map.setFeatures(['bg', 'point', 'road', 'building']);
        }

    });
    $(".map-sat").click(function () {
        map.off('moveend', moveendCallBack);
        isSatMapType = true;
        is2DMapType = false;
        $(".map-style-control li").removeClass("on");
        $(this).addClass("on");

        sateLayer.setMap(map);
        map.setZoom(map.getZoom());
        if (map.getZoom() > 17) {
            map.clearMap();
            map.setFeatures(['bg', 'point', 'road', 'building']);
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
        if (map.getZoom() > 17) {
            map.clearMap();
            map.setFeatures(['bg']);
            getHotspots(map.getBounds().toString(), currentCity);
        }
    });
    // 自动输入搜索
    function AutoCompleteSearch(name, currtcity) {
        $.ajax({
            type: "get",
            url: "/Home/GetLngLat",
            data: {
                "name": name,
                "city": currtcity
            },
            dataType: 'json',
            success: function (data) {
                if (data != null) {
                    for (var i = 0; i < data.length; i++) {
                        var option = "<span>" + data[i].moin_name + "</span>";
                        $('#showlist').append(option);
                    }
                }
            },
            error: function () { console.log("数据获取失败！"); }
        });
    }

    function placeSearch_CallBack2(data) {
        //POI点数组
        var poiArr = data.poiList.pois;
        //第一个点的位置
        var location = poiArr[0].location;
        //为信息窗口设置内容
        infoWindow2.setContent(createContent2(poiArr[0]));
        //在地图的指定位置打开窗口
        infoWindow2.open(map, location);
    }

    //信息窗体内容
    function createContent2(poi) {
        var s = [];

        var url = "/images/place_default.jpg";
        if (poi.photos[0])
        {
            url = poi.photos[0].url;
        }

        s.push('<div class="info-title">' + poi.name +'</div>');
        s.push('<div class="info-content">');
        s.push('<div class="img"><img src= ' + url + '></img></div>');

        s.push('<div class="text"><p>地址：' + poi.address + '</p>');
        s.push('<p>电话：' + poi.tel + '</p>');
        s.push('<p>类型：' + poi.type + '</p>');
        s.push('</div>');
        s.push('</div>');

        return s.join("");
        //return s.join("<br>");
    }
});

