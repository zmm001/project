//ios10 以上监听方式禁止缩放
window.onload=function () { 
	document.addEventListener('touchstart',function (event) { 
	  if(event.touches.length>1){ 
	    event.preventDefault(); 
	  } 
	}) 
	var lastTouchEnd=0; 
	document.addEventListener('touchend',function (event) { 
	  var now=(new Date()).getTime(); 
	  if(now-lastTouchEnd<=300){ 
	    event.preventDefault(); 
	  } 
	  lastTouchEnd=now; 
	},false) 
};
function tab(obj,objCnt,className){
	$(obj).click(function(){
		var _index = $(this).index();
		$(this).addClass(className).siblings().removeClass(className);
		$(objCnt).eq(_index).show().siblings(objCnt).hide();
	})
}
$(function(){
	tab(".module .tab-nav span",".module .tab-cnt","on");
	tab(".js-filter div span", ".module  .tab-cnt", "on");//图书列表分类
	tab(".category-sort .nav p", "", "on");//图书列表
	tab(".rank-category-sort .nav p", "", "on");//排行
	$("header .nav").click(function(){
		$(".js-visib").slideToggle(500);
	});

	//悬浮
	if($(".js-filter").length > 0){
		var offTop = $(".js-filter").offset().top - $("header").height();
	}
	$(window).bind("scroll",function(){
		if($(window).scrollTop() >= offTop){
			$(".filter-nav, .filter-month").addClass("fixed");
		}else{
			$(".filter-nav, .filter-month").removeClass("fixed");
		}
		if($(window).scrollTop() >= $(window).height()){
			$(".float-bar").show();
		}else{
			$(".float-bar").hide();
		}
	});
	//返回顶部按钮
	$(".float-bar .back-top").click(function(){
		$("body,html").animate({ scrollTop: 0 }, 500);
	});
	

	//搜索标签随机颜色
	if($(".search-tag").length > 0){
		var radNum=Math.floor(Math.random()*7+1);
		$(".tag-tips a").each(function(){
			$(this).attr("class","color"+Math.floor(Math.random()*7+1));
		});
	}
	if($(".search-box input").val()){
		$(".search-box .del").show();
	}
	$(".search-box input").keydown(function(){
		$(this).next(".del").show();
	});
	$(".search-box input").bind("input propertychange",function(){
		var val = $(this).val();
		if(val==""){
			$(this).next(".del").hide();
		}
	});
	$(".search-box .del").click(function(){
		$(this).prev("input").val("");
		$(this).hide();
	});

	//简介展开与隐藏
	$(".book-desc").click(function(){
		$(this).toggleClass("opened");
	});

	// 评论点赞与踩
	$("body").on("click",".comment-list .zan",function(){
		if (!$(this).hasClass("yizan") && !$(this).siblings(".cai").hasClass("yicai")){
			var _this = $(this);
			var _number = _this.find("span").text();
			_this.addClass("yizan");
			_this.find("em").show();
			_this.find("span").text(parseInt(_number)+1);
		}
	});
	$("body").on("click",".comment-list .cai",function(){
		if (!$(this).hasClass("yicai") && !$(this).siblings(".zan").hasClass("yizan")){
			var _this = $(this);
			var _number = _this.find("span").text();
			_this.addClass("yicai");
			_this.find("em").show();
			_this.find("span").text(parseInt(_number)+1);
		}
	});

	//点击回复弹出回复框
	$("body").on("click",".comment-list .replay",function(){
		$(this).parents(".comment-list").find(".replay-comment").toggle();
	});
})