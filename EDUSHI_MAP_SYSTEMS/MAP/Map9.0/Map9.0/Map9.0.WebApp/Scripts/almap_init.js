$(function () {
    $(function () {
        hover($(".button-group .navigate-icon"), $(".navigate-lay"));
        hover($("#query"), $(".search-lay"));
    });

    $(".line-search-ipt input").keydown(function () {
        $(this).next(".del-item").show();
    });
    $(".line-search-ipt input").bind("input propertychange", function () {
        var val = $(this).val();
        if (val == "") {
            $(this).next(".del-item").hide();
        }
    });
    $(".line-search-ipt .del-item").click(function () {
        $(this).prev("input").val("");
        $(this).hide();
    });

    $(".icon-arrow-up").click(function () {
        $(this).toggleClass("down");
        $(this).parents(".plan-title").next(".plan-route").toggle();
    });

    hover($(".maptools .map-controls"), $(".controls-lay"));

    $(".map-style-control").hover(function () {
        $(this).toggleClass("on");
    });
})


