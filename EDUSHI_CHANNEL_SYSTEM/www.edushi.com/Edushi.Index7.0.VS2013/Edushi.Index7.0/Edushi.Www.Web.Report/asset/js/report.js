function Report() {
    var url = $("#hidReferrerURL").val();
    var type = $('input[name="rb_r_type"]:checked').val();
    var Remarks = $("#txtbRemarks").val();
    var phone = $("#txtbPhone").val();
    var ert_name = $("#txtbName").val();

    $.ajax({
        dataType: "json",
        type: "POST",
        url: $("#hidURL").val(),
        data: { url: url, type: type, Remarks: Remarks, phone: phone, ert_name: ert_name },
        success: function (data) {
            if (data.message == "Ok") {
                window.location.href = $("#hidOKURL").val();
            }
            else {
                alert(data.message);
            }
        }
    });
}