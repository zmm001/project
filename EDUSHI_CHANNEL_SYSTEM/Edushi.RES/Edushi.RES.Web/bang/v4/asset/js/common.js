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

//固定
function toFixed( obj , n ){
	$(window).bind("scroll",function(){
		if($(window).scrollTop() >= n){
			obj.addClass("fixed");
		}else{
			obj.removeClass("fixed");
		}
	});
};

function addCount(obj, obj2) {
    //var count = parseInt(obj.find(".u-num").text());
    //count += 1;
    obj.addClass("visited");
    obj.find("em").addClass("show").delay(3000).hide(200);
    obj.siblings(obj2).css({ "cursor": "text" });
}
function layout(msg) {
    $(".flag-msg").text(msg);
    $(".flag-msg, .flag-mask").fadeIn(100).delay(1500).fadeOut(100);
}
$(function () {

    //文章赞或踩
    //var flag = $("#hidIsUpvote").val();
    //if ($(".js-article-zan").hasClass("visited")) {
    //    $(".js-article-cai").css({ "cursor": "text" });
    //} else {
    //    $(".js-article-cai").bind("click", function () {
    //        if (flag==1) {
    //            addCount($(this), "div");
    //        }
    //    });
    //}
    //if ($(".js-article-cai").hasClass("visited")) {
    //    $(".js-article-zan").css({ "cursor": "text" });
    //} else {
    //    $(".js-article-zan").bind("click", function () {

    //        if (flag==1) {
    //            addCount($(this), "div");
    //        }
    //    });
    //}

    //评论赞或踩
    //$(".tie-list").on("click", ".up-btn", function () {
    //    addCount($(this), "li");
    //    $(this).removeClass("up-btn");
    //    $(this).siblings("li").removeClass("down-btn");
    //});
    //$(".tie-list").on("click", ".down-btn", function () {
    //    addCount($(this), "li");
    //    $(this).removeClass("down-btn");
    //    $(this).siblings("li").removeClass("up-btn");
    //});


    //点击回复弹出评论框
    
    $(".tie-hot").on("click", ".tie-list .js-replay-btn", function () {
        $(this).parents(".tie-list").find(".tie-input-bar").toggle();
        $(this).parents(".tie-list").siblings().find(".tie-input-bar").hide();
    });

});