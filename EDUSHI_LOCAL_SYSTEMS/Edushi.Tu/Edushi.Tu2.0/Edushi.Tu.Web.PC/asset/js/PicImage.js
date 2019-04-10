var data_temp_image = eval(ImageData);
var pageIndex_Image = 1;
var pageCount_Image = data_temp_image.length / 1;

ImageInit();

function ImageInit() {
    $("#total_page").html(pageCount_Image);
    setCurrent_Page_Html(pageIndex_Image);

    if (pageCount_Image > 1) {
        getPageHtml(pageIndex_Image);
    }
}

function pageing(type) {
    if (type == "next") {
        pageIndex_Image++;
    }
    else if (type == "prev") {
        pageIndex_Image--;
    }

    var picimage = data_temp_image[pageIndex_Image - 1];
    $("#pai_pic").attr("src", picimage.PAI_Pic);
    $(".vieworigin").attr("href", picimage.PAI_Pic);
    $("#pai_desc").html(picimage.PAI_Desc);

    setCurrent_Page_Html(pageIndex_Image);
    getPageHtml(pageIndex_Image);

    setTimeout(function() {
        //跟贴悬浮
        var commentTop = $(".comment-box").offset().top;
        console.log(commentTop);
        $(window).bind("scroll", function () {
            var windowTop = $(window).scrollTop();
            console.log(windowTop);
            if (windowTop >= commentTop) {
                $(".comment-toolbar").addClass("fixed");
            } else {
                $(".comment-toolbar").removeClass("fixed");
            }
            if (windowTop > commentTop + $(".js-tieba").height()) {
                $(".comment-toolbar .fatie").css({ "display": "block" });
            } else {
                $(".comment-toolbar .fatie").hide();
            }
        });
    }, 1000);
   
}

function setCurrent_Page_Html(pageIndex_2) {
    $("#current_page").html(pageIndex_2);
}

function getPageHtml(pageIndex_1) {
    if (pageIndex_1 == 1) {
        $("#div_page").html("<a href=\"javascript:void(0)\" class=\"next-photo\" onclick=\"pageing('next')\"><span></span></a>");
    }
    else if (pageIndex_1 == pageCount_Image) {
        $("#div_page").html("<a href=\"javascript:void(0)\" class=\"prev-photo\" onclick=\"pageing('prev')\"><span></span></a>");
    }
    else {
        $("#div_page").html("<a href=\"javascript:void(0)\" class=\"prev-photo\" onclick=\"pageing('prev')\"><span></span></a><a href=\"javascript:void(0)\" class=\"next-photo\" onclick=\"pageing('next')\"><span></span></a>");
    }
}