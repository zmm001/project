function scrollLoad() {
    $(window).bind("scroll", function () {
        //判断页面是否拉到footer底部
        if ($(document).scrollTop() + $(window).height() >= $(document).height()) { //- pHeight
            if (gate) {
                $(".loading").css('display', 'block');
                gate = false;
                pageIndex++;
                $.ajax({
                    type: 'POST', //GET
                    url: ConfigData.Url + ConfigData.Page+"?r="+new Date().getTime(),
                    data: { 'pageIndex': pageIndex, 'ID': ConfigData.ID },
                    success: function (data) {
                        $(".loading").css('display', 'none');
                        $("#datalist").append(data);
                        gate = pageIndex == pageCount ? false : true;
                        //                        setHeight();
                        if ($(".more-btn").length > 0 && pageIndex == pageCount) {
                            $(".more-btn").css('display', 'block');
                        }
                    },
                    error: function (xhr, type) {
                        alert('加载异常，请刷新页面重试！');
                    }
                });
            }
        }
    });
}

var pageIndex = 0;
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
