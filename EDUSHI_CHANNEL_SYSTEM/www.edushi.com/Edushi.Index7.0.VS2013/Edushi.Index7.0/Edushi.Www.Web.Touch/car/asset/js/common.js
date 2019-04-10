window.onresize = window.onorientationchange = function () {
    document.documentElement.style.fontSize = 50 * ((document.documentElement.clientWidth) / 360) + "px";
	landscape();
};

//横屏模式
function landscape(){
	if(window.innerHeight-window.innerWidth < 0){
		$(".top,header,.gototop").addClass("landscape");
	}else{
		$(".top,header,.gototop").removeClass("landscape");
	}
}
landscape();



//导航下拉
$(".more-nav").html($(".main-nav .wrap").html()) ;
$(".nav-btn").bind("click",function(){
	$(".more-nav").slideToggle();
});


//导航滚动至合适位置
function navScroll(n){
	n?n:n=0;
	$(".main-nav .wrap").scrollLeft(  ($(".main-nav .wrap .on").index()-n)* $(".main-nav .wrap a").width() );
};
navScroll();