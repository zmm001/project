function scrollLoad() {
    $(window).bind("scroll", function () {
        //判断页面是否拉到footer底部
        if ($(document).scrollTop() + $(window).height() >= $(document).height()) { //- pHeight
            if (gate) {
                $(".loading").css('display', 'block');
                gate = false;
                pageIndex++;
                if (pageIndex>pageCount) {
                    gate = false;
                    return false;
                }
                var param = getParams();
                if (param) {
                    $.ajax({
                        type: 'POST', //GET
                        url: ConfigData.Page + ConfigData.Url,
                        data: param,
                        success: function (data) {
                            $(".loading").css('display', 'none');
                            $("#datalist").append(data);
                            hover($(".js-oper .share"), ".hid-share");
                            hover($(".js-oper .share .weixin"), ".wx-qr");
                            if ( pageIndex == pageCount) {
                                gate = false;
                                $(".end").show();
                            } else {
                                gate = true;
                            }
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

var pageIndex = ConfigData.PageIndex;
var pageCount = ConfigData.Count;
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
    switch (ConfigData.Type) {
        case 1:
            params = { 'itId': ConfigData.Id, 'pageIndex': pageIndex };
        break;
        case 2:
            params = { 'keyword': ConfigData.keyword, 'pageIndex': pageIndex };
            break;
        case 3:
            params = { 'qId': ConfigData.QId,'itId':ConfigData.ItId, 'pageIndex': pageIndex };
            break;
    }
    return params;
}
