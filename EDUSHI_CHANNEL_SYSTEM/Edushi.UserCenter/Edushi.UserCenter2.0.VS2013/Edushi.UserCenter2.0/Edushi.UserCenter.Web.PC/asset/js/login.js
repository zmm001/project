//发送验证码事件
function sendEvent(){
	//console.log("发送验证码~~")
}
//倒计时器
function countdown(btn,sec,className){
	var _sec = sec;
	var timer = setInterval(function(){
		sec--;
		btn.find(".number").text(sec);
		if(sec < 1){
			clearInterval( timer );
			btn.removeClass( className );
			btn.find(".number").text(_sec);
			clearInterval( timer );
		}
	},1000);
}
//按钮绑定验证码倒计时功能
function btnTiming(btn,sec,className,event){
    if ( btn.hasClass(className) ) {
			return false;
		}else{
			
			var phone = $("#mobileNo").val();
			var code = $("#v_code").val();
			$.ajax({
			    type: "post",
			    dataType: "json",
			    url: "/SendMobileCode.htm",
			    data: { "phone": phone, "code": code },
			    success: function (data) {
                    if (data.ResultCode==1) {
                        event();
                        btn.addClass(className);
                        countdown(btn, sec, className);
                    } else {
                        $(".login-box .warn").html(data.Msg).addClass("show");
                    }
                }
			});
    }
}


//验证手机号
function isMobileNumber( val, name ){
	var mobilereg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
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
			obj.eq(i).addClass("warn");
			$(".login-box .warn").html( result ).addClass("show");
			return false;
		}
		//验证手机号
		if( obj.eq(i).hasClass("mobile") ){
			result =isMobileNumber( obj.eq(i).val(), obj.eq(i).data("name") );
			if(  result != 1 ){
				obj.eq(i).addClass("warn");
				$(".login-box .warn").html( result ).addClass("show");
				return false;
			}
		}
	})
	if( result == 1 ){
		callback();
	}
};

