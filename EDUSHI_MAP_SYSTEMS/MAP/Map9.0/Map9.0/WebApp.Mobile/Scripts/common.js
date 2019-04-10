window.onresize = window.onorientationchange = function () {
    document.documentElement.style.fontSize = 100 * ((document.documentElement.clientWidth) / 750) + "px";
	//landscape();
};

//横屏模式
function landscape() {
    if (window.orientation === 180 || window.orientation === 0) {
        $("body").removeClass("landscape");
    }
    if (window.orientation === 90 || window.orientation === -90) {
        $("body").addClass("landscape");
    }
}
$(function () {
    landscape();
});
//用户变化屏幕方向时调用
$(window).bind('orientationchange', function (e) {
    landscape();
});


function tabClick(obj, tabObj, className) {
    $(obj).click(function () {
        var _index = $(this).index();
        $(this).addClass(className).siblings().removeClass(className);
        $(tabObj).eq(_index).show().siblings(tabObj).hide();
    });
}
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
/**************************************时间格式化处理************************************/
/* var crtTime = new Date(value);
    return top.dateFtt("yyyy-MM-dd hh:mm:ss",crtTime)  */
function dateFtt(fmt, date) {
    var o = {
        "M+": date.getMonth() + 1,               //月份   
        "d+": date.getDate(),                    //日   
        "h+": date.getHours(),                   //小时   
        "m+": date.getMinutes(),                 //分   
        "s+": date.getSeconds(),                 //秒   
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
        "S": date.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
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

function zeroPad(num, len, radix) {
    var str = num.toString(radix || 10);
    while (str.length < len) {
        str = "0" + str;
    }
    return str;
}

// 创建高级窗体dom元素
function createElements(name, types) {
    var imgage = "/images/place_default.jpg";
    var address = "";
    var iphone = "";
    var type = types == null ? "商务住宅;产业园区;产业园区" : types;
    var elements = "<div class='layout-box'>" +
                                "<div class='layout-info clearfix'>" + "<div class='img'>" + "<img src='" + imgage + "'/>" + "</div>" + "<div class='info'><div class='layout-title'>" + name + "<a href='http://hz.edushi.com/' target='_blank'>去这里" + "</a>" + "</div><p class = 'clearfix'>" + "<span>地址:" + "</span>" + address + "</p>" + "<p class = 'clearfix'>" + "<span>电话:" + "</span>" + iphone + "</p>" + "<p class = 'clearfix'>" + "<span>类型:" + "</span>" + type + "</p>" + "</div></div>" +
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
    //// 详情跳转
    //// 驾车
    //$('#end_drive').click(function () {
    //    startToEnd('span.icon-drive', name);
    //})
    //// 公交
    //$('#end_bus').click(function () {
    //    startToEnd('span.icon-bus', name);
    //})
    //// 步行
    //$('#end_walk').click(function () {
    //    startToEnd('span.icon-walk', name);
    //})
    //// 驾车
    //$('#start_drive').click(function () {
    //    endToStart('span.icon-drive', name);
    //})
    //// 公交
    //$('#start_bus').click(function () {
    //    endToStart('span.icon-bus', name);
    //})
    //// 步行
    //$('#start_walk').click(function () {
    //    endToStart('span.icon-walk', name);
    //})
    //// 页面详情查询
    //$(".search-btn").click(function () {
    //    placeSearch.search($('#nearbySearch').val().trim());
    //});
}

// 二维点击弹出窗体                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               水水水水水水水水水
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
    if (poi.photos[0]) {
        url = poi.photos[0].url;
    }

    s.push('<div class="info-title">' + poi.name + '</div>');
    s.push('<div class="info-content">');
    s.push('<div class="img"><img src= ' + url + '></img></div>');

    s.push('<div class="text"><p>地址：' + poi.address + '</p>');
    s.push('<p>电话：' + poi.tel + '</p>');
    s.push('<p>类型：' + poi.type + '</p>');
    s.push('</div>');
    s.push('</div>');

    return s.join("");
}

function getQueryString(name) {
    if (name.length > 0){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
    }

    return null;
}