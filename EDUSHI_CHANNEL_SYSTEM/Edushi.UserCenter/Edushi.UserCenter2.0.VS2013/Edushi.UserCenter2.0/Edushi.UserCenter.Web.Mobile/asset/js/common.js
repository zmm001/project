window.onresize=window.onorientationchange=function(){
	document.documentElement.style.fontSize=100*( (document.documentElement.clientWidth)/720 )+"px";
};

//在页面被卸载前将滚动条重置（包含点击刷新按钮、在浏览器地址栏直接回车、F5刷新键），防止某些浏览器按F5刷新后，滚动条还保持了上一次状态的位置
window.onunload = unload;
function unload(e) {
    window.scrollTo(0, 0);
}

//返回顶部按钮
$(".back-top").bind("click", function () {
    $('body,html').animate({ scrollTop: 0 }, 300);
});

$(window).bind("scroll", function () {
    if ($(window).scrollTop() > parseInt($(window).height() / 2)) {
        $(".floatbar").fadeIn(200);
    } else if ($(window).scrollTop() < parseInt($(window).height() / 2)) {
        $(".floatbar").fadeOut(200);
    }
    if ($(window).scrollTop() >= $(".newslist").offset().top) {
        $(".tabnav").addClass("fixed");
    } else {
        $(".tabnav").removeClass("fixed");
    }
});


