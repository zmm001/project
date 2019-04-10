function slide(obj,slidePrev,slideNext,slideBtn,slideClass){
	var sWidth = obj.width(),
		len = obj.find("ul li").length,
		index = 0,
		picTimer,
		btn = "";
	for(var i=0; i<len; i++){
		btn += "<span></span>";
	}
	slideBtn.append(btn);
	obj.find("ul").css("width",sWidth * len);
	slideBtn.find("span").mouseenter(function(){
		index = $(this).index();
		showPics(index);
	}).eq(0).trigger("mouseenter");
	slidePrev.click(function(){
		index --;
		if(index < 0) { index = len-1;}
		showPics(index);
	});
	slideNext.click(function(){
		index ++;
		if(index > len-1){ index = 0;}
		showPics(index);
	});
	/*obj.hover(function(){
		clearInterval(picTimer);
	},function(){
		picTimer=setInterval(function(){			
			index ++;
			if(index > len-1) {index = 0;}
			showPics(index);
		},5000);
	}).trigger("mouseleave");*/

	function showPics(index){
		var nowLeft = -index*sWidth;
		obj.find("ul").stop(true,false).animate({"left":nowLeft},500);
		slideBtn.find("span").stop(true,false).removeClass(slideClass).eq(index).stop(true,false).addClass(slideClass); 
	}
}