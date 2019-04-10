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
                    url: ConfigData.Url + ConfigData.Page,
                    data: { 'pageIndex': pageIndex, 'Id': ConfigData.ID },
                    success: function (data) {
                        $(".loading").css('display', 'none');
                        $("#datalist").append(data);
                        gate = pageIndex == pageCount ? false : true;
                      
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

$(function () {
    scrollLoad();
});
