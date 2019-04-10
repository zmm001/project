

function LoadImgResize(picID, width) { 
    var img=jQuery("#"+picID);
    if (img.width() > width) {
        img.height(img.height() * width / img.width());
        img.width(width);
    }
}
jQuery(function() {
    jQuery("#CONPIC img").each(function() {
        var img = jQuery(this);
        var width = 640;
        if (img.width() > width) {
            img.height(img.height() * width / img.width());
            img.width(width);
        }
    })    
})
function loadImage(url, callback) {
    var img = new Image(); //创建一个Image对象，实现图片的预下载
    img.src = url;

    if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
        callback.call(img);
        return; // 直接返回，不用再处理onload事件
    }

    img.onload = function() { //图片下载完毕时异步调用callback函数。
        callback.call(img); //将回调函数的this替换为Image对象
    };
};
//var _t = 0;
//图片加载事件
function loadImg() {
    var _img = jQuery("#IMG");
    if (jQuery.browser.msie&&_img.attr("complete")) {
        return false;
    }
    //LoadImgResize("IMG", 660);
    _img.show();
    //jQuery("#TMP").text(jQuery("#IMG").height());
    //jQuery("#IMGDIV").stop().animate({ height: jQuery("#IMG").height() }, 1000);
}
function fnGetScrollTop()
{
    var scrollTop=0;
    if(document.documentElement&&document.documentElement.scrollTop)
    {
        scrollTop=document.documentElement.scrollTop;
    }
    else if(document.body)
    {
        scrollTop=document.body.scrollTop;
    }
    return scrollTop;
}
function fnGetScrollHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}

