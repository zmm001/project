$(function () {
    $.ajax({
        type: "post",
        async: false,
        url: $("#hidPro").val(),
        dataType: "json",
        data: { type: $("#hidType").val() },
        success: function (data) {
            $.each(data, function (i, item) {
                $("#ddlProvince").append($("<option value='" + item.EP_ID + "'>" + item.EP_Name + "</option>"));
            });
        }
    });

    $("#ddlProvince").change(function () {
        $("#ddlCity").empty();
        $.ajax({
            type: "post",
            async: false,
            url: $("#hidCity").val(),
            dataType: "json",
            data: { EP_ID: $(this).val(), type: $("#hidType").val() },
            success: function (data) {
                $.each(data, function (i, item) {
                    $("#ddlCity").append($("<option value='" + item.ECC_Code + "'>" + item.ECC_Name + "</option>"));
                });
            }
        });
    });

    $("#ddlProvince").change();
});

