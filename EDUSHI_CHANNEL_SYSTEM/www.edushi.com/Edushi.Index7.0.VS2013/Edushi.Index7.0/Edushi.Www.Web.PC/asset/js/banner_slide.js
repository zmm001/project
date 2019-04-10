$(function(){
	var Timer = null;
	var index = 0;
	var sWidth = $(".yl-slide-box").width();
	var btn = "";
	var clone = $(".yl-slide-box ul li").eq(0).clone();
	$(".yl-slide-box ul").append(clone);
	
	var len = $(".yl-slide-box ul li").length;
	$(".yl-slide-box ul").css({"width":sWidth*len});

	for(var i=0; i<len-1; i++){
		btn += "<span></span>";
	}
	$(".yl-slide-btn").append(btn);
	$(".yl-slide-btn").find("span").eq(0).addClass("on");
	$(".left-mask .lm-t").css({ "background": "url(" + $(".yl-slide-box ul li").eq(len - 2).find(".bigimg img").attr("src") + ") center top" });
	$(".left-mask .lm-lb").css({ "background": "url(" + $(".yl-slide-box ul li").eq(len - 2).find(".smallimg .pic:first img").attr("src") + ") center top" });
	$(".left-mask .lm-rb").css({ "background": "url(" + $(".yl-slide-box ul li").eq(len - 2).find(".smallimg .pic:last img").attr("src") + ") center top" });
	$(".right-mask .rm-t").css({ "background": "url(" + $(".yl-slide-box ul li").eq(index + 1).find(".bigimg img").attr("src") + ") center top" });
	$(".right-mask .rm-lb").css({ "background": "url(" + $(".yl-slide-box ul li").eq(index + 1).find(".smallimg .pic:first img").attr("src") + ") center top" });
	$(".right-mask .rm-rb").css({ "background": "url(" + $(".yl-slide-box ul li").eq(index + 1).find(".smallimg .pic:last img").attr("src") + ") center top" });

	if(!Timer){
		Timer = setInterval(function(){
			index ++;
			autoPlay();
		},5000);
	}

	$(".yl-slide").hover(function(){
		clearInterval(Timer);
	},function(){
		Timer = setInterval(function(){
			index ++;
			autoPlay();
		},5000);
	});

	$(".slide-prev").click(function(){
		index --;
		if(index == -1){
			$(".box").css({"left":-(len-1)*sWidth});
			index=len-2;
		}
		autoPlay();
	});
	$(".slide-next").click(function(){
		index ++;
		autoPlay();
	})
	$(".yl-slide-btn span").hover(function(){
		var _index = $(this).index();
			index=_index;
		autoPlay();		
	});
	
	function autoPlay(){
		if(index == len){
			$(".yl-slide-box ul").css({"left":0});
			index=1;
		}
		if(index == len-1){
			$(".yl-slide-btn span").eq(0).addClass("on").siblings().removeClass("on");
		}else{
			$(".yl-slide-btn span").eq(index).addClass("on").siblings().removeClass("on");
		}
		$(".yl-slide-box ul").stop().animate({"left":-sWidth*index},500);
		
		var lmtBgcolor = "",
		    lmlbBgColor = "",
		    lmrbBgColor = "";
		var rmtBgcolor = "",
			rmlbBgcolor = "",
			rmrbBgcolor = "";
		if(index == 0){
			lmtBgcolor = $(".yl-slide-box ul li").eq(len-2).find(".bigimg img").attr("src");
			lmlbBgColor = $(".yl-slide-box ul li").eq(len-2).find(".smallimg .pic:first img").attr("src");
			lmrbBgColor = $(".yl-slide-box ul li").eq(len-2).find(".smallimg .pic:last img").attr("src");
		}else{
			lmtBgcolor = $(".yl-slide-box ul li").eq(index-1).find(".bigimg img").attr("src");
			lmlbBgColor = $(".yl-slide-box ul li").eq(index-1).find(".smallimg .pic:first img").attr("src");
			lmrbBgColor = $(".yl-slide-box ul li").eq(index-1).find(".smallimg .pic:last img").attr("src");
		}
		if(index == len-1){
			rmtBgcolor = $(".yl-slide-box ul li").eq(1).find(".bigimg img").attr("src");
			rmlbBgcolor = $(".yl-slide-box ul li").eq(1).find(".smallimg .pic:first img").attr("src");
			rmrbBgcolor = $(".yl-slide-box ul li").eq(1).find(".smallimg .pic:last img").attr("src");
		}else {
			rmtBgcolor = $(".yl-slide-box ul li").eq(index+1).find(".bigimg img").attr("src");
			rmlbBgcolor = $(".yl-slide-box ul li").eq(index+1).find(".smallimg .pic:first img").attr("src");
			rmrbBgcolor = $(".yl-slide-box ul li").eq(index+1).find(".smallimg .pic:last img").attr("src");
		}
		$(".left-mask .lm-t").css({ "background": "url(" + lmtBgcolor + ") center top" });
		$(".left-mask .lm-lb").css({ "background": "url(" + lmlbBgColor + ") center top" });
		$(".left-mask .lm-rb").css({ "background": "url(" + lmrbBgColor + ") center top" });
		$(".right-mask .rm-t").css({ "background": "url(" + rmtBgcolor + ") center top" });
		$(".right-mask .rm-lb").css({ "background": "url(" + rmlbBgcolor + ") center top" });
		$(".right-mask .rm-rb").css({ "background": "url(" + rmrbBgcolor + ") center top" });
	}
});

