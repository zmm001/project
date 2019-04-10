//根据地图状态获取结果模式
function fnGetResultModeByMapStatus() {
    if (vM.MapState.Map == 0) {
        return 'edushi'; //edushi模式
    }
    else {
        return 'baidu'; //baidu模式（二维或卫星）
    }
}

//地图切换时，更新焦点tab的src（重新激活Tab）
function fnChangeTabBodySrc(v) {
    if (_TabControl) {
        if (_TabControl.CurrentTab) {
//            alert(vM.MapState.Map);
//            alert(v);
            if (vM.MapState.Map != v) {
                setTimeout(function () { fnChangeTabBodySrc(v); }, 1000);
                return;
            }
            _TabControl.ActiveTab(_TabControl.CurrentTab);
        }
    }
}

function getWeather(cityname) {
    var weather = "";
    jQuery.ajax({
        url: 'http://api.map.baidu.com/telematics/v3/weather?location=' + cityname + '&output=json&ak=KHlTRxGUk0Y3w3hLe1P7rYFT', //&callback=showData（如果有callback参数时，那么必须定义showData函数，同时必须指定jsonp属性）
        dataType: "jsonp",
        //jsonp: "aaaaaa",
        success: function (data) {
            //                alert(data.error);
            //                alert(data.status);
            //                alert(data.date);
            //                alert(data.results.length);
            if (data.status = "success") {
                if (data.results.length == 1) {
                    var myresult = data.results[0];
                    weather = myresult.weather_data[0].weather + " " + myresult.weather_data[0].temperature + " " + getPM(parseInt(myresult.pm25));
                    //alert(weather);
                    jQuery("#lnkSwichCity").after(weather);
                }
            }
        }
    });
}
function showData(data) {
//    alert(data.error);
//    alert(data.status);
//    alert(data.date);
//    alert(data.results.length);
}
function getPM(num) {
    var PM = "";
    if (num >= 0 && num <= 50) {
        PM = "<span class=\"air-quality pm25green\">优</span> " + num + "";
    }
    if (num >= 51 && num <= 100) {
        PM = "<span class=\"air-quality pm25yellow\">良</span> " + num + "";
    }
    if (num >= 101 && num <= 150) {
        PM = "<span class=\"air-quality pm25orange\">轻度污染</span> " + num + "";
    }
    if (num >= 151 && num <= 200) {
        PM = "<span class=\"air-quality pm25red\">中度污染</span> " + num + "";
    }
    if (num >= 201 && num <= 300) {
        PM = "<span class=\"air-quality pm25purple\">重度污染</span> " + num + "";
    }
    if (num > 300) {
        PM = "<span class=\"air-quality pm25balck\">严重污染</span> " + num + "";
    }
    return PM;
}