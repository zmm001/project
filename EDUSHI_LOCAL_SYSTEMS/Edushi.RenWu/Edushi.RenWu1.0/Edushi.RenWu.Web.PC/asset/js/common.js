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