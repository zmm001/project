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
                    $.ajax({
                        type: 'POST', //GET
                        url: "/Rank/GetMoreBookList",
                        data: { 'pageIndex': pageIndex },
                        success: function (data) {
                            $(".loading").css('display', 'none');
                            $("#datalists").append(data);
                            if (pageIndex == pageCount) {
                                gate = false;
                                $(".load-prompt").show();
                            } else {
                                gate = true;
                            }
                        },
                        error: function (xhr, type) {
                            // showMsg('加载异常，请刷新页面重试！');
                        }
                    });
            }
        }
    });
}

var pageIndex = configData.PageIndex;
var pageCount = configData.Count;
var gate = true;

$(function () {
    scrollLoad();
});

