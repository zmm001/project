$(function(){
	//顶部导航展开与关闭
	$(".nav-tips .more").click(function(e){
		$(this).toggleClass("on");
		$(".sitemap").toggle();
		e.stopPropagation();
	});
	if($(".sitemap:visible")){
		$(window).bind("scroll",function(){
			$(".nav-tips .more").removeClass("on");
			$(".sitemap").hide();			
		});
		$(document).click(function(){
			$(".nav-tips .more").removeClass("on");
			$(".sitemap").hide();
		});
		$(".sitemap").click(function(e){
			e.stopPropagation();
		});
	}

	//页面滚动时顶部登录按钮背景变化
	$(window).bind("scroll",function(){
		var _scrollTop = $(window).scrollTop();
		if(_scrollTop > 0){
			$(".nav-tips a.login").addClass("black");
		}else{
			$(".nav-tips a.login").removeClass("black");
		}
	});	
});

//返回顶部
function backTop(contenter,topObj){
	var _windowHeight = $(window).height();
	contenter.css({"right":parseInt(($(window).width() - 1200)/2-contenter.outerWidth(true)-10)});
	$(window).resize(function(){
		contenter.css({"right":parseInt(($(window).width() - 1200)/2-contenter.outerWidth(true)-10)});
	});
	$(window).scroll(function(){
		var _scrollTop = $(window).scrollTop();
		if(_scrollTop >= parseInt(_windowHeight/2)){
			contenter.fadeIn();	
		}else{
			contenter.fadeOut();
		}
	});
	topObj.click(function(){
		$("body, html").animate({scrollTop:0},500);
	});
}
backTop($(".back-top"),$(".back-top span"));
