
function newsLoad() {
    pageIndex++;
    if (pageIndex > pageCount) {
        return false;
    }
    //$(".loading").css('display', 'block');
    var param = { 'pageIndex': pageIndex, 'currentId': configData.ID };
    
    $.ajax({
        type: 'POST', //GET
        url: configData.Url + configData.Page,
        data: param,
        success: function (data) {
            //$(".loading").css('display', 'none');
            $("#datalist").append(data);
            if (pageIndex>=pageCount) {
                $(".load-btn").remove();
            }
        },
        error: function (xhr, type) {
            //alert('加载异常，请刷新页面重试！');
        }
    });
}
var pageIndex = 0;
var pageCount = configData.Count;

$(function () {
    //专题悬浮
    var h = $(".left-side-list").offset().top;
    $(window).bind("scroll", function () {
        var _scrollTop = $(window).scrollTop();
        if (_scrollTop >= $(".left-side-list").height() + h && $(document).scrollTop() + $(window).height() <= $(document).height() - 300) {
            $(".left-side-list").addClass("fixed");
            $(".left-side-list").find("ul").addClass("scrollbar");
            $(".white_bg").show();

            var winHeight = $(window).height();
            $(".left-side-list ul.scrollbar").css("height", winHeight - 174);
            $(window).bind("resize", function () {
                winHeight = $(window).height();
                $(".left-side-list ul.scrollbar").css("height", winHeight - 174);
            });
        } else {
            $(".left-side-list").removeClass("fixed");
            $(".left-side-list").find("ul").removeClass("scrollbar");
            $(".white_bg").hide();
            $(".left-side-list ul").css("height", "auto");
        }
        //console.log(_scrollTop);
    });

    $(".left-side-list ul").slimScroll({
        height: '100%', //可滚动区域高度 
        size: '3px',
        color: '#999',
        opacity: 1,
        distance: 0
    });

    //新闻列表没图片时宽度变化
    $(".news-list li").each(function () {
        if ($(this).find("img").length < 1) {
            $(this).addClass("new-width");
        }
    });

    //更多
    var navLen = $(".nav-bar a").length;
    if (navLen < 7) {
        $(".nav-bar .more-nav span").hide();
    }
    $(".nav-bar .more-nav").bind("mouseover", function () {
        $(this).find("span").addClass("on");
        $(".more-nav-list").show();
    });
    $(".nav-bar .more-nav").bind("mouseout", function () {
        $(this).find("span").removeClass("on");
        $(".more-nav-list").hide();
    });
    //加载更多
    $(".load-btn").click(function () {
        newsLoad();
    });
});