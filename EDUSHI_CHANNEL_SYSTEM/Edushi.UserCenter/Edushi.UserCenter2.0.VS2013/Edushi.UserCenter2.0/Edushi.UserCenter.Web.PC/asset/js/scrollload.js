function scrollLoad() {
    $(window).bind("scroll", function () {
        //判断页面是否拉到footer底部
        if ($(document).scrollTop() + $(window).height() >= $(document).height() - 200) { //- pHeight
            if (gate) {
                if (pageCount <= 1) {
                    gate = false;
                    return false;
                }
                $(".loading").css('display', 'block');
                gate = false;
                pageIndex++;
                if (pageIndex > pageCount) {
                    gate = false;
                    return false;
                }
                var param = getParams();
                if (param) {
                    $.ajax({
                        type: 'POST', //GET
                        url:  ConfigDataForScroll.Url + ConfigDataForScroll.Page,
                        data: param,
                        success: function (data) {
                            
                            $(".loading").css('display', 'none');
                            $("#datalists").append(data);
                            //hover($(".js-oper .share"), ".hid-share");
                            //hover($(".js-oper .share .weixin"), ".wx-qr");
                            if (pageIndex == pageCount) {
                                gate = false;
                                $(".load-prompt").show();
                            } else {
                                gate = true;
                            }

                            clickAttention(".add-follow");
                            clickAttention(".follow-btn");
                            //                        setHeight();
                            //if ($(".more-btn").length > 0 && pageIndex == pageCount) {
                            //    $(".more-btn").css('display', 'block');
                            //}
                        },
                        error: function (xhr, type) {
                            // showMsg('加载异常，请刷新页面重试！');
                        }
                    });
                }

            }
        }
    });
}

var pageIndex = ConfigDataForScroll.PageIndex;
var pageCount = ConfigDataForScroll.Count;
var gate = true;

//    var pHeight = 0;
//    function setHeight() {
//        pHeight = $(".news-list li:last").prev().height() + $(".news-list li:last").height();
//    }
//    setHeight();



$(function () {
    scrollLoad();
});

function getParams() {
    var params;
    switch (ConfigDataForScroll.Type) {
        case 1:
            params = { 'pageIndex': pageIndex };
            break;
        case 2:
            params = { 'keyword': ConfigData.keyword, 'pageIndex': pageIndex };
            break;
        case 3:
            params = { 'qId': ConfigData.QId, 'itId': ConfigData.ItId, 'pageIndex': pageIndex };
            break;
        case 4:
            params = { 'pageIndex': pageIndex, 'userId': ConfigDataForScroll.UserId };
            break;
        case 5:
            params = { 'userId': ConfigDataForScroll.UserId, 'pageIndex': pageIndex, 'type': ConfigDataForScroll.Type };
            break;
        case 6:
            params = { 'userId': ConfigDataForScroll.UserId, 'pageIndex': pageIndex, 'type': ConfigDataForScroll.Type };
            break;
        case 7:
            params = { 'userId': ConfigDataForScroll.UserId, 'pageIndex': pageIndex, 'type': ConfigDataForScroll.Type };
            break;
    }
    return params;
}
