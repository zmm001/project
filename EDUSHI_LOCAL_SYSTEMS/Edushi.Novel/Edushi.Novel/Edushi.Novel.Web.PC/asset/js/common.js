//点赞或踩数字加1
function zanCai(obj,className){
	obj.addClass(className);
	obj.find("em").addClass("show").delay(1000).hide(200);
	obj.siblings().css({"cursor":"text"});
}
function getCookie() {
    var result;
    var url = $("#hidUrl").val() + "GetIsLogin.htm";
    $.ajax({
        url: url,
        type: 'get',
        async: false,
        datatType: "json",
        success: function (response) {
            result = response;
        }
    });
    return result;
};
function addBookRack(entity, _this) {
    var isLogin = getCookie();
    if (isLogin == "NO") {
        var backUrl = escape(window.location.href);
        window.location.href = "http://user.edushi.com/Login.html?BackUrl=" + backUrl;
    } else {
        var url = $("#hidUrl").val() + "AddBookRack.htm";
        $.ajax({
            url: url,
            type: 'post',
            async: true,
            data: { "BookID": entity.BookID },
            success: function (response) {
                if (response == "false") {
                    popUp('加入失败或已存在！');
                }
                else if (response == "nologin") {
                    popUp(response);
                }
                else if (response == "Exceed") {
                    popUp('你的书架已经满了(50本),请适当清理后再加!');
                }
                else if (response == "true") {
                    popUp('已成功加入书架！');
                    $(_this).attr("class", "in-shelf");
                }
            }
        })
    }
}
function addReadRecord(entity) {
    var url = $("#hidUrl").val() + "AddReadRecord.htm";
    $.ajax({
        url: url,
        type: 'post',
        async: true,
        data: { "BookID": entity.BookID, "ChapterID": entity.ChapterID },
        success: function (response) {
        }
    })
}
function getQueryString(name) {
    if (name.length > 0) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
    }
    return null;
}
function createState(name, handle, storage) {
    var _state = states[name]
    Object.defineProperty(states, name, {
        get: function () { return _state },
        set: function (val) {
            storage
            ? _state = window.localStorage['$' + name] = val
            : _state = val
            handle(_state)
        }
    })
    states[name] = window.localStorage['$' + name] ? window.localStorage['$' + name] : _state
}
$(function(){
	if($(".classify-list").length > 0){
		$(".main-nav li.category").addClass("up");
	}
	$(".show-classify").mouseenter(function(){
		$(".classify-list").show();
		$(".main-nav li.category").removeClass("up");
	}).mouseleave(function(){
		$(".classify-list").hide();
		$(".main-nav li.category").addClass("up");
	});


	//点赞或踩
	var _isClick = true; //防止重复点击
	$(".comment-box").on("click",".comment-list .zan",function(){
		if($(this).hasClass("yizan") || $(this).siblings(".cai").hasClass("yicai")){
			_isClick = false;
		}else{
			var _this = $(this);
			var _number = _this.find("span").text();
			_this.find("span").text(parseInt(_number)+1);
			zanCai(_this, "yizan");
		}
	});
	$(".comment-box").on("click",".comment-list .cai",function(){
		if($(this).hasClass("yicai") || $(this).siblings(".zan").hasClass("yizan")){
			_isClick = false;
		}else{
			var _this = $(this);
			var _number = _this.find("span").text();
			_this.find("span").text(parseInt(_number)+1);
			zanCai(_this, "yicai");
		}
	});
})