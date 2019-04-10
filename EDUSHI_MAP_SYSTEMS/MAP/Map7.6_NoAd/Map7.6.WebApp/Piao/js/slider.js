var sid=null;
var ss=0;	//记录移动了多少
var step = 10;	//步长
var timeId=null;
var slider=function(){
	id=$("#scrollText").attr("id");
	sid=id
	var currentH=$("#"+id).height();	//要滚动的层的id
	var parentH=$("#"+id).parent().height();	//滚动层的父id
	var diff=currentH-parentH;	//滚动层与其父id的差值，判断是否大于零而且大于步长
	
	if(0 < diff && diff >= step){
		var top=parseInt($("#"+id).css("top"));	//top是一个负值
		if(top+diff > 0){
			timeId = window.setInterval(doslider, 30);
		} else {
			window.clearInterval(timeId);
			$("#"+id).css("top", 0);
			window.setTimeout(slider, 2000);
		}
	} else {
		$("#"+id).css("top", 0);
	}
}
var doslider=function(){
	if (ss < step) {
		var top=parseInt($("#"+sid).css("top"));
		$("#"+sid).css("top", top-2);
		ss++;
	} else {
		var firstHtml=$("#"+sid).children(":first");
		$("#"+sid).children(":first").remove();
		$("#"+sid).append(firstHtml);
		$("#"+sid).css("top", 0);
		window.clearInterval(timeId);
		ss=0;
		window.setTimeout(slider, 3000);
	}
}

