$(function () {
    //高德瓦片图层
    var gaodeMap = new AMap.TileLayer();
    auto = new AMap.Autocomplete({})

    //地图
    map = new AMap.Map('container', {
        //pitch: 75,
        //viewMode: '3D',
        resizeEnable: true,
        zooms: [3, 17],
        zoom: 17,
        //center: [120.162, 30.254],
        //center: [108.068, 38.236],
        isHotspot: true,
        expandZoomRange: true,
        features: ['bg'],
        layers: []
    });

    //我的位置
    //var myPosition;
    //初始城市
    currentCity = '杭州市';

    var cityId = getQueryString("id");
    var is3d = getQueryString('is3D');
    if (cityId) {
        currentCity = getQueryString("cityName");
        $("#currCity").text(currentCity.substr(0, currentCity.length - 1));
        if (cityId.split("#").length > 1) {
            var citylnglat = cityId.split("#");
            var lnglat = citylnglat[1];
            if (lnglat.split(",").length > 1) {
                map.setZoomAndCenter(map.getZoom(), [lnglat.split(",")[0], lnglat.split(",")[1]]);
                if (currentCity) {
                    map.setLayers([gaodeMap, cities[currentCity]]);
                }
            }
        } else {
            map.setCity(cityId);
        }
    }
    queryWeather(currentCity); // 天气预报
    // 天气预报
    function queryWeather(currentCity) {
        AMap.service('AMap.Weather', function () {
            var weather = new AMap.Weather();
            weather.getLive(currentCity, function (err, data) {
                if (!err) {
                    $('.tainqi span').text(data.temperature + "℃");
                } else {
                    $('.tainqi span').text("9/22℃");
                }
            })
        })
    }



    map.plugin('AMap.Geolocation', function () {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition: 'RB'
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
        AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
    });

    // 获取热区信息
    function getHotspots(boundsStr) {
        $.ajax({
            url: '/Shared/getPoiListToMap',
            type: 'POST',
            data: {
                "bounds": boundsStr,
                "cityName": currentCity
            },
            dataType: 'json',
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    var polygonArr = [];
                    var coordinates = data[i]['Coordinates'].split(';');
                    for (var j = 0; j < coordinates.length - 1; j++) {
                        var x = parseFloat(coordinates[j].split(',')[0]);
                        var y = parseFloat(coordinates[j].split(',')[1]);
                        polygonArr.push([x, y]);
                    }
                    var centerX = parseFloat(data[i]['centerX']);
                    var centerY = parseFloat(data[i]['centerY']);
                    var polygon = new AMap.Polygon({
                        map: map,
                        path: polygonArr,//设置多边形边界路径
                        strokeColor: "#3366FF", //线颜色
                        strokeOpacity: 0, //线透明度
                        strokeWeight: 2,    //线宽
                        fillColor: "#f7ed46", //填充色
                        fillOpacity: 0,//填充透明度
                        extData: { 'name': data[i]['name'], 'centerX': centerX, 'centerY': centerY }
                    });
                    polygon.on('click', function () {
                        var name = "<div style=\"padding:0px 0px 0px 4px;\"><b>" + this.getExtData()['name'] + "</b>";
                        //构建信息窗体中显示的内容
                        var info = [];
                        info.push("<div><div><img style=\"float:left;\" src=\" ./Image/logo.png \"/></div> ");
                        info.push(name);
                        info.push("电话 : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   邮编 : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
                        info.push("地址 :&nbsp;&nbsp;&nbsp;&nbsp;</div></div>");
                        infoWindow = new AMap.InfoWindow({
                            content: info.join("<br/>")  //使用默认信息窗体框样式，显示信息内容
                        });
                        infoWindow.open(map, [this.getExtData()['centerX'], this.getExtData()['centerY']]);
                    });
                    polygon.on('mouseout', function () {
                        this.setOptions({ 'strokeColor': '#3366FF' });
                        this.setOptions({ 'strokeOpacity': 0 });
                        this.setOptions({ 'fillOpacity': 0 });
                    });
                    polygon.on('mouseover', function () {
                        this.setOptions({ 'strokeColor': '#FF33FF' });
                        this.setOptions({ 'strokeOpacity': 0.5 });
                        this.setOptions({ 'fillOpacity': 0.2 });
                    });
                }
            },
            error: function () {
                //alert("数据获取失败！");
            }
        });

    }

    //解析定位结果
    function onComplete(data) {
        currentCity = data.addressComponent.city;
        //console.log(data.addressComponent);
        $('.place span').text(currentCity);
        auto.setCity(currentCity);
        map.setCenter(data.position);
    }
    //解析定位错误信息
    function onError(data) {
      //  alert('定位失败');
        map.setCenter([120.162, 30.254]);
    }

    var placeSearch = new AMap.PlaceSearch({
        pageSize: 5,
        pageIndex: 1,
        map: map,
        panel: "panel"
    });  //构造地点查询类

    var content = '<div class="info-title">Alamap</div><div class="info-content">';

    var infoWindow = new AMap.AdvancedInfoWindow({});
    var searchInfoWindow = new AMap.AdvancedInfoWindow({
        content: content
    });

    map.on('hotspotclick', function (result) {
        //根据热区编号来查询相关信息
        placeSearch.getDetails(result.id, function (status, result) {
            //查询结果状态
            if (status === 'complete' && result.info === 'OK') {
                placeSearch_CallBack(result);
            }
        });
    });

    // 地图事件
    map.on('zoomchange', function () {
        if (this.getZoom() > 16) {
            this.setFeatures(['bg']);
        } else {
            this.setFeatures(['bg', 'point', 'road']);
        }
    })

    function moveendCallBack() {
        map.getCity(function (data) {
            //console.log(data);
            if (data['province'] && typeof data['province'] === 'string') {
                if (data['city'] == '') {
                    currentCity = data['province'];
                } else {
                    currentCity = data['city'];
                }
                (function () {
                    if (cities[currentCity])
                        map.setLayers([gaodeMap, cities[currentCity]]);
                    else
                        return -1;
                })();
                $('.place span').text(currentCity);
                auto.setCity(currentCity);
            }
        });
        map.clearMap();
        //if (map.getZoom() > 17) {
        //    getHotspots(map.getBounds().toString());
        //} else {
        //    return;
        //}
    }
    map.on('moveend', moveendCallBack);
    //回调函数
    function placeSearch_CallBack(data) {
        //POI点数组
        var poiArr = data.poiList.pois;
        //第一个点的位置
        var location = poiArr[0].location;
        //为信息窗口设置内容
        infoWindow.setContent(createContent(poiArr[0]));
        //在地图的指定位置打开窗口
        infoWindow.open(map, location);
    }

    //信息窗体内容
    function createContent(poi) {
        var s = [];
        s.push('<div class="info-title">' + poi.name + '</div><div class="info-content">' + "地址：" + poi.address);
        s.push("电话：" + poi.tel);
        s.push("类型：" + poi.type);
        s.push('<div>');
        return s.join("<br>");
    }

    /*map.on('click',function(evt){
    	alert(evt.lnglat);
    });*/

    // 查询
    $('#query').click(function () {
        $('.navigate_icon img').attr('src', './Image/close.png');
        placeSearch.search($('#keyword').val().trim());
    });

    //鼠标右键
    var contextMenu = new AMap.ContextMenu();  //创建右键菜单
    var start = [];
    var end = [];
    var isStart = true;
    var marker;
    var path = new Array(2);
    var route;
    var count = 0;
    var positionX, positionY;

    //设为起点
    contextMenu.addItem("设为起点", function (e) {
        isStart = true;
        path[0] = start;
        if (count == 0) {
            map.off('moveend', moveendCallBack);
            map.clearMap();
        }
        if (marker) {
            marker.setPosition(start);
        } else {
            marker = new AMap.Marker({
                icon: './Image/start.png',
                position: start,
            });
            marker.setMap(map);
        }
        count++;
    }, 0);

    //设为终点
    contextMenu.addItem("设为终点", function () {
        if (route || path[0] == null) {
            return;
        }
        isStart = false;
        path[1] = end;
        map.plugin("AMap.DragRoute", function () {
            marker.setMap(null);
            route = new AMap.DragRoute(map, path, AMap.DrivingPolicy.LEAST_FEE); //构造拖拽导航类
            route.search(); //查询导航路径并开启拖拽导航
        });
    }, 0);

    //周边搜索
    contextMenu.addItem("周边搜索", function () {
        map.off('moveend', moveendCallBack);
        map.clearMap();
        searchInfoWindow.open(map, [positionX, positionY]);
        //    	searchInfoWindow.on('close',function(){
        //    		alert('aa');
        //    		map.on('moveend', moveendCallBack);
        //    	});
    }, 0);

    //清除结果
    contextMenu.addItem("清除结果", function () {
        map.clearMap();
        count = 0;
        marker = null;
        route = null;
        isStart = true;
        map.on('moveend', moveendCallBack);
    }, 0);




    //地图绑定鼠标右击事件——弹出右键菜单
    map.on('rightclick', function (e) {
        contextMenu.open(map, e.lnglat);
        contextMenuPositon = e.lnglat;
        positionX = e.lnglat.getLng();
        positionY = e.lnglat.getLat();
        if (isStart) {
            start = [e.lnglat.getLng(), e.lnglat.getLat()];
        }
        end = [e.lnglat.getLng(), e.lnglat.getLat()];
    });

    // 搜索文本框的事件
    //$('.inputtext').focus(function () {
    //    auto = createAutocomplete('keyword');
    //    auto.setCity(currentCity);
    //    AMap.event.addListener(auto, "select", select);
    //    $('.navigate_icon img').attr('src', './Image/close.png');
    //});

    $('.inputtext').blur(function () {
        if ($('.inputtext').val().length > 0) {
            $('.navigate_icon img').attr('src', './Image/close.png');
        } else {
            $('.navigate_icon img').attr('src', './Image/navigate.png');
        }
    });

    $('.inputtext').keypress(function (event) {
        if (event.keyCode == 13) {
            placeSearch.search($('#keyword').val().trim());
        }
    });

    $('#start_point').focus(function () {
        auto = createAutocomplete('start_point');
        auto.setCity(currentCity);
        AMap.event.removeListener(auto, "select", select);
    });

    $('#end_point').focus(function () {
        auto = createAutocomplete('end_point');
        auto.setCity(currentCity);
        AMap.event.removeListener(auto, "select", select);
    });

    $('.place').click(function () {

        if ($('#lx').css('top') == '0px') {
            $('#lx').css('top', '-9px')
        } else {
            $('#lx').css('top', '0px')
        }
        $('.placeList').toggleClass('dn')
    });

    $('.placeList dd').click(function () {
        $('.place span')[0].innerText = this.innerText;
        $('.placeList').toggleClass('dn')
    });

    var dds = $('.placeList.dn dd');
    for (var i = 0; i < dds.length; ++i) {
        //alert(dds[i]['id']);
        dds[i].addEventListener('click', function () {
            var coor = $(this).attr('coordinate').split(',');
            map.setCenter([parseFloat(coor[0]), parseFloat(coor[1])]);
        });
    }

});
