window.onresize=window.onorientationchange=function(){
	document.documentElement.style.fontSize=50*( (document.documentElement.clientWidth)/360 )+"px";
};
$(window).bind("scroll", function() {
    if ($(window).scrollTop() > $("header").height()) {
        $(".main-nav-box").addClass("fixed")
    } else {
        $(".main-nav-box").removeClass("fixed")
    }
});



//返回顶部按钮
$(".back-top").bind("click",function(){
	$('body,html').animate({ scrollTop: 0 }, 300);
});

$(window).bind("scroll",function(){
	if($(window).scrollTop() > $(window).height()*2){
		$(".floatbar").fadeIn(200);
	}else{
		$(".floatbar").fadeOut(200);
	}
});





//导航下拉
$(".more-nav").html($(".main-nav .wrap").html()) ;
$(".more-nav a").last().remove();


$(".top-channel").bind("click",function(){
	$(".more-nav").eq(0).slideToggle();
});

$(".nav-btn").bind("click",function(){
	$(".more-nav").eq(1).slideToggle();
	$(".nav-btn i").toggleClass("on");
});

$(".pop-box .cancel").click(function(){
    $(".pop-content").hide();
});
$(".pop-box .confirm").click(function(){
    $(".pop-content").hide();
});

function popUp(msg, flag, url, text) {
    $(".pop-content").show();
    $("#msg").text(msg);
    if (flag && flag == 1) {
        $(".pop-content .confirm").text(text).attr("href", url).show();
    }
}
