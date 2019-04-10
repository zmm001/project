$(function() {
    $.getScript("http://tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey=3772362590", function () {
        if (WB2.checkLogin() == true) {
            WB2.logout();
            return;
        }

        WB2.anyWhere(function (W) {
            W.widget.connectButton({
                id: "wb_connect_btn",
                type: "3,2",
                callback: {
                    login: function (o) {	//登录后的回调函数
                        fnLogin(o);
                    },
                    logout: function () {	//退出后的回调函数
                        fnLogout('logout');
                    }
                }
            });
        });
    });
    
    var sinaLogin = setInterval(function() {
        if ($("#wb_connect_btn div").width() == 74) {
            $("#wb_connect_btn").show();
            clearInterval(sinaLogin);
        }
        else {
            $("#wb_connect_btn div").css('background-image', 'url(images/sina_login.png)')
            $("#wb_connect_btn div").css({ 'width': '74px', 'height': '24px' });
            $("#wb_connect_btn div").removeClass();
        }
    }, 20);
});

function fnLogin(o) {
    $("#wb_connect_btn").hide();
    if (typeof o != 'undefined') {
        var url = encodeURIComponent(document.getElementById("burl").value);
        top.location.href = "http://my.edushi.com/sinalogin.aspx?type=sina&Ln=" + o.id + "&nn=" + escape(o.screen_name) + "&rnd=" + Math.random()+"&BackUrl=" + url;
    }
}

function fnQQLogin() {
    var url = encodeURIComponent(document.getElementById("burl").value);
    top.location.href="http://my.edushi.com/qqlogin.htm?BackUrl=" + url;
}