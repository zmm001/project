function hover(obj,showObj){
    obj.hover(function () {
        if (!obj.hasClass("weixin")) {
            $(this).find(showObj).show();
        }
	},function(){
		$(this).find(showObj).hide();
	});
}
//提示信息
function showMsg(msg, callback) {
    $("body").append('<div class="layer-box"><div class="msg"></div><a href="javascript:;;" class="btn">确定</a></div>');
    $(".layer-box").find(".msg").html(msg);
    $(".layer-box").css({ "top": (window.screen.availHeight - $(".layer-box").innerHeight()) / 2, "left": (window.screen.width - $(".layer-box").innerWidth()) / 2 });
    $(".layer-box .btn").bind("click", function () {
        $(".layer-box .msg").html("");
        $(".layer-box").remove();
        if (callback) callback();
    });
}
function zanCai(obj,className){
	obj.addClass(className);
	obj.find("em").addClass("show").delay(1000).hide(200);
	obj.siblings().css({"cursor":"text"});
}

$(function () {
	hover($(".js-oper .share"),".hid-share");
	hover($(".js-oper .share .weixin"), ".wx-qr");

	$("#datalist").on("click", ".js-votelist .share a:not(.weixin)", function () {
	    if (!$(this).hasClass("ok")) {
	        var type = $(this).attr("class");
	        var obj = $(this).parents(".question-cnt").find(".q-tit a");
	        var url = "http://wenda.edushi.com" + obj.attr("href");
	        var title = obj.text();
	        var that = $(this);

	        $.post("/ShareUrl.htm",
	            { type: type, url: url, title: title },
	            function(data) {
	                if (data) {
	                    that.addClass("ok");
	                    window.location.href = data;
	                }
	            });
	    }
	});

	

	$("#datalist").on("click", ".js-votelist .share a.weixin", function () {
        if (!$(this).hasClass("ok")) {
            var obj = $(this).parents(".question-cnt").find(".q-tit a");
            var url = "http://wenda.edushi.com" + obj.attr("href");
            var that = $(this);
            $.post("/ShareUrl.htm",
                { type: "weixin", url: url, title: "" },
                function (data) {
                    if (data) {
                        that.addClass("ok");
                        that.find(".wx-qr img").attr("src", data);
                        that.find(".wx-qr").show();
                    }
                });
        } else {
            $(this).find(".wx-qr").show();
        }
        
	});

    $(".radio-box label").bind("click", function (ev) {
        if (!$(this).find("input").is(":checked")) {
            $(".radio-box label").removeClass("checked");
            $(this).addClass("checked");
        }
    })


	//导航悬浮
	if($(".main-nav-box").length > 0){
		var offTop = $(".main-nav-box").offset().top;
	}
	
	$(window).scroll(function(){
		if($(window).scrollTop() >= offTop){
			$(".main-nav-box").addClass("fixed");
			$(".main-container").css({"margin-top":110});
		}else{
			$(".main-nav-box").removeClass("fixed");
			$(".main-container").css({"margin-top":0});
		}
		//返回顶部
		if($(window).scrollTop() >= $(window).height()/2){
			$(".floatbar .top").height(50);
		}else{
			$(".floatbar .top").height(0);
		}
	});
	$(".floatbar .top").click(function(){
		$("body, html").animate({scrollTop:0},500);
	});
	//刷新
	$(".floatbar .refresh").click(function(){
		window.location.reload();
	});

    //点击提问弹出框
    var _inLayer = true; //判断鼠标在弹层内还是弹层外，在弹层外点击时关闭弹层
    $("#modal-layer .ask-layer-box").mouseenter(function () {
        _inLayer = true;
    });
    $("#modal-layer .ask-layer-box").mouseleave(function () {
        _inLayer = false;
    });

    //点击提问弹出框
    $(".search-box .ask").click(function () {
        if ($("#user_islogin").val() == 1) {
            $("#modal-layer").show();
        } else {
            var backUrl = escape(window.location.href);
            window.location.href = "http://user.edushi.com/Login.html?BackUrl=" + backUrl;
        }

    });
    $("#modal-layer").click(function () {
        if (!_inLayer) {
            $("#modal-layer").hide();
        }
    });
    $("#modal-layer .js-close").click(function () {
        $("#modal-layer").hide();
    });


	$("#modal-layer .js-close").click(function(){
		$("#modal-layer").hide();
	});

	//赞与踩
	$(".js-votebox").on("click", ".js-votelist .js-oper .zan", function () {
	    if (!$(this).hasClass("yizan") && !$(this).siblings(".cai").hasClass("yicai")) {
	        var _this = $(this);
	        var answerId = _this.parents(".js-oper").data("id");
	            $.ajax({
	                type: "post",
	                dataType: "json",
	                url: "/AddAnswerUpvoteDownvote.htm",
	                data: { "iaId": answerId, "action": 1 },
	                success: function (data) {
	                    if (data.ResultCode == 1) {
	                        var _number = _this.find("span").text();
	                        _this.find("span").text(parseInt(_number) + 1);
	                        zanCai(_this, "yizan");
	                    } else if (data.ResultCode == 2) {
	                        window.location.href = 'http://user.edushi.com/Login.html?BackUrl=' + window.location.href;   
	                    } else {
	                        showMsg(data.Msg);
	                    } 
	                }
	            });
	            
	           
	        }
		
	});
	$(".js-votebox").on("click", ".js-votelist .js-oper .cai", function () {
		if(!$(this).hasClass("yicai") && !$(this).siblings(".zan").hasClass("yizan")){
			var _this = $(this);
			var answerId = _this.parents(".js-oper").data("id");
		    $.ajax({
		        type: "post",
		        dataType: "json",
		        url: "/AddAnswerUpvoteDownvote.htm",
		        data: { "iaId": answerId, "action": 2 },
		        success: function (data) {
		            _isClick = true;
		            if (data.ResultCode == 1) {
		                var _number = _this.find("span").text();
		                _this.find("span").text(parseInt(_number) + 1);
		                zanCai(_this, "yicai");
		            } else if (data.ResultCode == 2) {
		                window.location.href = 'http://user.edushi.com/Login.html?BackUrl=' + window.location.href;
		                
		            } else {
		                showMsg(data.Msg);
		            }
		        }
		    });
			
		}
	});

	$(".best-qa-list").each(function(){
		var obj = $(this).find(".qa-item a");
		if($.trim(obj.text()).length > 80){
			obj.text(obj.text().substring(0,70));
			obj.html(obj.text()+'...<span>全文</span>');
		}
	});

	//图片上传预览
	$("#file").change(function(){
		if($(".img-item img").length >= 3){
			showMsg("最多只能上传3张图片");
		}else{
		    if ($(this).val().length > 0) {
		        subimtForm();
		        //var section = $('<div class="img-item">');
		        //	$("#modal-layer .img-list").prepend(section);
		        //var div = $('<div>');
		        //	div.appendTo(section);
		        //var p = $('<p id="imghead">');
		        //	p.appendTo(div);
		        //var img = $('<img>');
		        //	img.appendTo(p);
		        //var close = $('<span class="img-close"></span>');
		        //	close.appendTo(section);
		        //if (this.files && this.files[0]){
		        //    var file = this.files[0];
		        //    //预览功能 start
		        //    var reader = new FileReader();//创建读取对象
		        //    reader.onloadend = function () {
		        //        img.attr("src", reader.result);//读取加载，将图片编码绑定到元素
		        //    }
		        //    if (file) {//如果对象正确
		        //        reader.readAsDataURL(file);//获取图片编码
		        //    } else {
		        //        img.src = "";//返回空值
		        //    }
		        //    var formData = new FormData();
		        //    formData.append('file', file);
		        //    $.ajax({
		        //        url: "/detail/UploadTest",
		        //        data: formData,
		        //        type: "post",
		        //        contentType: false,
		        //        processData: false,
		        //        mimeType: "multipart/form-data",
		        //        success: function(data) {

		        //        }
		        //    });

		        //}else{ //兼容IE
		        //	$(this).select();
		        //	var imgSrc = document.selection.createRange().text;
		        //	var img = document.getElementById('imghead');
		        //	img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = imgSrc;
		        //}
		    }
		}
	});

    function subimtForm() {
        var form = $("#addform");
        var options = {
            url: '/UploadImg.htm',
            type: 'post',
            success: function (data) {
                //var jsondata = eval("(" + data + ")");
                if (data.errno == "0") {
                    var section = $('<div class="img-item">');
                    $("#modal-layer .img-list").prepend(section);
                    var div = $('<div>');
                    div.appendTo(section);
                    var p = $('<p id="imghead">');
                    p.appendTo(div);
                    var img = $('<img>');
                    img.appendTo(p);
                    var close = $('<span class="img-close"></span>');
                    close.appendTo(section);
                    var url = data.data[0];

                    img.attr("src", url);
                    if ($(".img-item img").length >= 3) {
                        form.hide();
                    }
                } else {
                    showMsg(data.Msg);
                }
            }
        };
        form.ajaxSubmit(options);
        //$("#fileForm").submit();  
    }

	$(".img-upload").on("click",".img-close",function(){
	    $(this).parent(".img-item").remove();
	    $("#file").val("");
	    if ($(".img-item img").length < 3) {
	        $("#addform").show();
	    }
	});
});