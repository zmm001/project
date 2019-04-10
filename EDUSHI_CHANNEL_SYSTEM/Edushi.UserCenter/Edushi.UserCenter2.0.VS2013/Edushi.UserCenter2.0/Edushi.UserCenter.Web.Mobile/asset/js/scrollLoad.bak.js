
function scrollLoad() {
    $(window).bind("scroll", function () {
        //判断页面是否拉到footer底部
        if ($(document).scrollTop() + $(window).height() >= $(document).height()) { //- pHeight
            if (gate) {
                gate = false;
                pageIndex++;
                if (pageIndex > pageCount) {
                    $(".nomore").show();
                    return false;
                }
                
                $(".loding").css('display', 'block');

                var param = getParam();
                $.ajax({
                    type: 'POST', //GET
                    url: ConfigData.Url + ConfigData.Page,
                    data: param,
                    success: function (data) {
                        $(".loding").css('display', 'none');
                        ConfigData.Contaiter.append(data);
                        if (pageIndex == pageCount) {
                            gate = false;
                            $(".nomore").show();
                        } else {
                            gate = true;
                        }
                        
                        //                        setHeight();
                    },
                    error: function (xhr, type) {
                        //alert('加载异常，请刷新页面重试！');
                    }
                });
            }
        }
    });
}

var pageIndex = ConfigData.PageIndex;
var pageCount = ConfigData.Count;
var gate = true;

//拼接参数Json
function getParam() {
    var param;
    switch (ConfigData.Type) {
        case 1://E都市头条号
            param = { "userId": ConfigData.UserId, "type": ConfigData.NewsType, "pageIndex": pageIndex };
            break;
        case 2://我的收藏
            param = { 'pageIndex': pageIndex, 'ufType': ConfigData.NewsType };
            break;
        case 3://我的关注、我的动态
            param = { 'pageIndex': pageIndex}
            break;
            //case 4://详细页评论
            //    param = { "IA_ID": ConfigData.ID, "userId": GetUserId(0), "pageIndex": pageIndex };
            //    break;
        case 5:// Ta的动态
            param = { "pageIndex": pageIndex, "userId": ConfigData.UserId };
            break;
        case 6:// Ta的关注、粉丝
            param = { "pageIndex": pageIndex, "userId": ConfigData.UserId };
            break;
            //case 6://用户头条
            //    param = { "userId": ConfigData.UserId, "type": ConfigData.NewsType, "pageIndex": pageIndex };
            //    break;
        case 8://我的关注、我的动态
            param = { 'pageIndex': pageIndex, 'userType': 3 }
            break;
    }
    return param;
}

$(function () {
    scrollLoad();
})