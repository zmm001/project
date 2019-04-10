//延迟副本
function delayCopy(obj, copy, delay){
	for( var i in obj ){
		if( obj[i] == "" ){
			setTimeout(function(){
				copy[i] = obj[i];
			},200)
		}else{
			copy[i] = obj[i];
		}
	}
}
//倒计时
// function countdown( currentTime, timing, interval ){
// 	var t = setInterval(function(){
// 		currentTime = parseInt(new Date().getTime()/1000);
// 		if( timing <= 0 ){
// 			clearInterval(t);
// 		}
// 	},interval);
// }

// function isEmpty( content, msg, name ){
// 	if( content == "" ){
// 		alert(1)
// 		return msg = "name" + "不能为空";
// 	}
// }

