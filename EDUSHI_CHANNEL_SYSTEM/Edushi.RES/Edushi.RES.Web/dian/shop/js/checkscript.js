
var spsum = 0;
(function($) {
    $.fn.selectAll = function(options) {
        var settings = {
            range: '',
            checkid: ''
        };
        $.extend(settings, options);

        /* $(settings.range + " tr:gt(0)").mouseover(function() { $(this).addClass("over") })
        .mouseout(function() { $(this).removeClass("over") });
        $(settings.range + " tr:gt(0)").click(function() {
        if ($(this).hasClass("down")) {
        $(this).removeClass("down");
        //$(this).find(":checkbox").removeAttr("checked");
        }
        else {
        $(this).addClass("down");
        // $(this).find(":checkbox").attr("checked", true);
        }

        })*/
        //$(settings.range + " tr:even").addClass("alt");
        $(settings.checkid).click(function() {
            var $allid;
            if ($(this).attr("checked") == true) {
                $("input:checkbox:not(#checkAll)").each(function() {
                    $(this).attr("checked", true);
                    $(settings.range + " tr").removeClass("over").addClass("down");
                    spsum = parseFloat(spsum) + parseFloat($("#spsum" + $(this).attr("id")).html());
                    $allid = $(this).parents("tbody").attr("id");
                }
             )
            }
            else {
                $("input:checkbox:not(#checkAll)").each(function() {
                    $(this).attr("checked", false);
                    $(settings.range + " tr").removeClass("down");
                    spsum = parseFloat(spsum) - parseFloat($("#spsum" + $(this).attr("id")).html());
                    $allid = $(this).parents("tbody").attr("id");
                })
            }
            var $allsum = $("#spallsum" + $allid);
            $allsum.html(spsum);
        }
          )

    }

})(jQuery)