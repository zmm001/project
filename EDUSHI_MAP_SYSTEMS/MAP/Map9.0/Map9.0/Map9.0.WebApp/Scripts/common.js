function hover(obj,showObj){
	obj.hover(function(){
		showObj.show();
	},function(){
		showObj.hide();
	});
}
function tabClick(obj,tabObj,className){
	$(obj).click(function(){
		var _index = $(this).index();
		$(this).addClass(className).siblings().removeClass(className);
		$(tabObj).eq(_index).show().siblings(tabObj).hide();
	});
}

$(function(){
	$("#container").height($(window).height());
	//城市切换
	tabClick(".city-tabnav span",".city-list","on");
	$(".city-weather .city").click(function(){
		$(this).toggleClass("on");
		$(".city-box").toggle();
	})
	$(".city-box .close").click(function(){
		$(".city-weather .city").removeClass("on");
		$(".city-box").hide();
	});
    $(".city-letter span").click(function(){
    	var _id = $(this).text();
    	var tgtop = $(this).parents(".city-list").find(".index-"+_id).position().top + $(this).parents(".city-list").find(".slim-scroll-div div").scrollTop();
    	// 取字母标记位置top值 + 当前dl滚动条的top值 = 当前需要的top值
    	$(this).parents(".city-list").find(".slim-scroll-div div").animate({scrollTop:tgtop}, 500);
    });

    tabClick(".layout-box .tab-nav span",".tab-content","on");
});

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

function zeroPad(num, len, radix) {
    var str = num.toString(radix || 10);
    while (str.length < len) {
        str = "0" + str;
    }
    return str;
}