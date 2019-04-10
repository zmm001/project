$(function(){
	//绝对定位图片
	function waterfall(){
		//图片li的length
		var _len = $(".middle-l .cont-wrap li").length;
		//图片外wrapper的宽度
		var _width = Math.ceil( _len / 9 )*$(".middle-l .cont-wrap").width();
		$(".middle-l .water-wrapper").css("width",_width);
		//图片定位
		for(var i=0; i<=_len; i++){
			var innerPosition = i%9;
			var s=i+1
			var page = Math.ceil( s / 9 );
			//console.log(innerPosition);
			$(".middle-l .cont-wrap li").eq(i).css({
				left:Math.ceil(innerPosition%3)*402+((page-1)*$(".middle-l .cont-wrap").width()),
				top:(parseInt(innerPosition/3) )*270
			});
		}
	}

	var pageIndex = configData.pageIndex;
    var flag = pageIndex + 1;
    var pageNum = parseInt(configData.pageCount); //总页面数，一页9条数据，需修改成实际总页面
	var contW = $(".cont-wrap").width();
	var gate = true;
	//向左滑动
	function prevClick(event){
		pageIndex --;
		if(pageIndex < 0){
			$(".btn-page-left").hide();
			$(".center-tip").stop(true,false).text("第一页").fadeIn(30).delay(600).fadeOut(30);
			pageIndex = 0;
		}else{
			$(".btn-page-right").show();
			animate(pageIndex);
		}
	}
	//向右滑动
	function nextClick(){
		pageIndex ++;
		if(pageIndex > pageNum-1){
			$(".btn-page-right").hide();
			$(".center-tip").stop(true,false).text("最后一页").fadeIn(30).delay(600).fadeOut(30);
			pageIndex = pageNum-1;
		}else{
			$(".btn-page-left").show();
			animate(pageIndex);
		}
	    if (flag > pageIndex) {
	        return false;
	    }
	    flag++;
		if(gate){
		    gate = false;
		    $.ajax({
		        type: "POST",
		        url: configData.Page + configData.Url,
		        data: { "pageIndex": pageIndex, "pId": configData.PId },
		        success: function (data) {
		            $(".water-wrapper ul").append(data); //新增的数据添加到ul里
		            waterfall(); //图片定位
		            if (pageIndex == pageNum - 2) {
		                gate = false;
		            } else {
		                gate = true;
		            }
		        }
		    });
		}
	}
	function animate(pageIndex){
		var nowLeft = -pageIndex*contW;
		$(".water-wrapper").stop(true,false).animate({"left":nowLeft},600);
	}

	$(".btn-page-left").click(function(){
		prevClick();
	});
	$(".btn-page-right").click(function(){
		nextClick();
	});
	//鼠标滚轮事件
	var winW = $(window).width();
	$(".cont-wrap").hover(function(){
		window.onmousewheel=function(){return false};
	},function(){
		window.onmousewheel=function(){return true};
	});

	$(".cont-wrap").off("mousewheel").on("mousewheel", function(event, delta) {
		var $this = $(this),
			timeoutId = $this.data('timeoutId');
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		$this.data('timeoutId', setTimeout(function() {
			//向右滚动
			if(delta == -1){
				nextClick();
			}
			//向左滚动
			if(delta == 1){
				prevClick();
			}
			$this.removeData('timeoutId');
			$this = null;
		}, 100));
		return false;
	});

	$(window).on("load",function(){
		waterfall();
	});
});
