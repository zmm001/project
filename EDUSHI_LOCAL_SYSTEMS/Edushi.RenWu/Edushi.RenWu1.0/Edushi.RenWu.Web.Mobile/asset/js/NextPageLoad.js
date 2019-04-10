$(function () {
    //滚动加载事件
    function scrollLoad() {
        //var gate = true;
        $(window).bind("scroll", function () {
            var newsLi = ConfigData.obj.find("li:last");
            var pHeight = newsLi.prev().height() + newsLi.height();
            //判断页面是否拉到footer底部
            if ($("footer").offset().top - $(window).scrollTop() - pHeight <= $(window).height()) {
                //触发事件
                if (gate) {
                    gate = false;
                    if (pageCount <= 1) {
                        return false;
                    }
                    pageListIndex++;
                    if (pageListIndex > pageCount) {
                        return false;
                    }
                    //$(".loading").show();
                    var parameter = ConfigData.Title ? { name: ConfigData.Title, 'pageIndex': pageListIndex, "currentID": currentID} : { 'pageIndex': pageListIndex, "currentID": currentID }
                    $.ajax({
                        type: 'post',
                        url: ConfigData.Url + ConfigData.Page,
                        data: parameter,
                        success: function (data) {
                            //$(".loading").hide();
                            ConfigData.obj.append(data);
                            if (pageListIndex == pageCount) {
                                gate = false;
                                $(".more-link").show();
                                $(".more-btn").show();
                            } else {
                                gate = true;
                            }
                            //gate = pageIndex == pageCount ? false : true;
                        },
                        error: function (xhr, type) {
                            //alert('加载异常，请刷新页面重试！');
                        }

                    });
                }

            }
        });
    };
    var gate = true;
    var pageListIndex = 0;
    var pageCount = ConfigData.Count;
    var currentID = 0;
    if (ConfigData.currentID) {
        currentID = ConfigData.currentID;
    }

    scrollLoad();
});