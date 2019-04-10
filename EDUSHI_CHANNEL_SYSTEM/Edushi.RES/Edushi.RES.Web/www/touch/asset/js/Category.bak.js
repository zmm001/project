function scrollLoad() {
    $(window).bind("scroll", function () {
        //判断页面是否拉到footer底部
        if ($("footer").offset().top - $(window).scrollTop() <= $(window).height()) { //- pHeight
            if (gate) {
                $(".loading").css('display', 'block');
                gate = false;
                pageIndex++;
                $.ajax({
                    type: 'POST', //GET
                    url: ConfigData.Url + ConfigData.Page,
                    data: { 'PName': ConfigData.PName, 'PValue': ConfigData.PValue, 'pageIndex': pageIndex, 'ID': ConfigData.ID },
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

//在页面被卸载前将滚动条重置（包含点击刷新按钮、在浏览器地址栏直接回车、F5刷新键），防止某些浏览器按F5刷新后，滚动条还保持了上一次状态的位置
window.onunload = unload;
function unload(e) {
    window.scrollTo(0, 0);
}

$(function () {
    scrollLoad();
});

function navScroll(n) {
    n = n ? n : 0;
    $(".main-nav .wrap").scrollLeft(($(".main-nav .wrap .on").index() - n) * $(".main-nav .wrap a").width());
}
navScroll(1);