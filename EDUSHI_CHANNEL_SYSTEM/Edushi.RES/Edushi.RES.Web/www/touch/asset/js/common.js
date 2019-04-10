window.onresize=window.onorientationchange=function(){
	document.documentElement.style.fontSize=50*( (document.documentElement.clientWidth)/360 )+"px";
	 landscape();
}

//横屏模式
function landscape(){
	if(window.innerHeight-window.innerWidth < 0){
		$(".top,header,.gototop").addClass("landscape");
	}else{
		$(".top,header,.gototop").removeClass("landscape");
	}
}
landscape();

//返回顶部按钮
$(".gototop").bind("click",function(){
	$('body,html').animate({ scrollTop: 0 }, 300);
});


$(window).bind("scroll",function(){
	if($(window).scrollTop() > $(".top").height()){
		$(".gototop").fadeIn(200);
	}else if($(window).scrollTop() < $(".top").height()){
		$(".gototop").fadeOut(200);
	}
});

//导航悬浮
$(window).bind("scroll",function(){
	if($(window).scrollTop() > $(".top").height()){
		$("header").addClass("fixed");
		$(".content-main").css({"margin-top":$("header").height()});
	}
	else if($(window).scrollTop() < $(".top").height()){
		$("header").removeClass("fixed");
		$(".content-main").css({"margin-top":0});
	}
	
});

//导航下拉
$(".more-nav").html($(".main-nav .wrap").html());
$(".nav-btn").bind("click",function(){
	$(".more-nav").slideToggle();
});