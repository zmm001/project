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
//发送短信验证码倒计时
var countdown=30;
function settime(obj) {
	if (countdown == 0) {
		obj.removeAttribute("disabled");
		obj.value="发送验证码";
		countdown = 30;
		return;
	} else {
		obj.setAttribute("disabled", true);
		obj.value="" + countdown + "s重新发送";
		countdown--;
	}
	setTimeout(function() {settime(obj) },1000);
}

//验证手机号
function isMobileNumber( val, name ){
	var mobilereg = /^[1][3,4,5,7,8][0-9]{9}$/; 
	if( !mobilereg.test(val) ){
		return "请输入正确的" + name;
	}else{
		return 1;
	}
};
//验证为空
function isEmpty( val, name ){
	if( !val ){
		return "请输入" + name;
	}else{
		return 1;
	}
};
//验证输入框
function verify( obj, callback ){
	var result;
	obj.each(function(i){
		//验证是否为空
		result = isEmpty( obj.eq(i).val(), obj.eq(i).data("name") );
		if( result != 1 ){
			$(".login-msg").html( result );
			return false;
		}
		//验证手机号
		if( obj.eq(i).hasClass("mobile") ){
			result =isMobileNumber( obj.eq(i).val(), obj.eq(i).data("name") );
			if(  result != 1 ){
				$(".login-msg").html( result );
				return false;
			}
		}
	});
	if( result == 1 ){
		callback();
	}
};

$(function(){
	$(".main-container").css({"min-height":$(window).height()-$("header").height()-$("footer").outerHeight(true)});
	$(".bookshelf-box .edit").click(function(){
		var text = $(this).text();
		if(text=="编辑"){
			$(this).text("取消");
		}else{
			$(this).text("编辑");
		}
		$(".bookshelf-box").toggleClass("modify");
	});
	//$(".bookshelf-box").on("click",".book-list li .del",function(){
	//	$(this).parents("li").remove();
	//});
});

