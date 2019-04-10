
(function($) {
    $.fn.dialog = function(options) {
        var settings = {
            show: 'full',
            range: ''
        };
        var wHeight, wWidth, wTop, wLeft;
        $.extend(settings, options);
        this.MaskDiv = function() {
            if (settings.show == "full") {
                var wnd = $(window), doc = $(document);
                wWidth = doc.width();
                wTop = 0;
                wLeft = 0;
                if (wnd.height() > doc.height()) {  //当高度少于一屏
                    wHeight = wnd.height();
                } else {//当高度大于一屏
                    wHeight = doc.height();
                }
            }
            else {
                wHeight = $(settings.range).height();
                wWidth = $(settings.range).width()
                wTop = 110 + wHeight * ($(settings.range).size() - 1);
                wLeft = 53;
            }
            //创建遮罩背景

            $("body").append("<div ID=MaskID></div>");

            $("body").find("#MaskID").width(wWidth).height(wHeight)

       .css({ position: "absolute", top: wTop + "px", left: wLeft + "px", background: "white", filter: "Alpha(opacity=90);", opacity: "0.3", zIndex: "10000", display: "block" });

        }

        this.sPosition = function(obj) {

            var MyDiv_w = parseInt(obj.width());

            var MyDiv_h = parseInt(obj.height());



            var width = parseInt(wWidth);

            var height = parseInt($(window).height());

            var left = parseInt($(document).scrollLeft());

            var top = parseInt($(document).scrollTop());



            var Div_topposition = top + (height / 2) - (MyDiv_h / 2); //计算上边距

            var Div_leftposition = left + (width / 2) - (MyDiv_w / 2); //计算左边距

            return Array(Div_topposition, Div_leftposition);

        }

        this.MaskDiv();
        $("body").append("<div ID=DivDialog style=\'display:none;\'><img src='images/listloader.gif'/></div>");

        var obj = $("body").find("#DivDialog");

        var cbj = $("body").find("#close");

        obj.width("auto").height("auto");

        cbj.click(function() {

            $("body").find("#MaskID").css({ display: 'none' });

            $("body").find("#DivDialog").css({ display: 'none' });

        })

        PosT = this.sPosition(obj);

        obj.css({ position: "absolute", top: wTop+PosT[0] + "px", left: wLeft+PosT[1] + "px", textAlign: "center", zIndex: "10001" }).show("slow");

        return this;

    }
})(jQuery)