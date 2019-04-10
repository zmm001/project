function MoreRelation() {
    var url = $("#hidUrl").val();
    var id = $("#hidID").val();
    var pName = $("#hidP").val();
    var pValue = $("#hidV").val();

    var moreURL = url + "GetRelationMore.htm";
    $.ajax({
        url: moreURL,
        type: 'POST',
        data: { 'iaid': id, PName: pName, PValue: pValue },
        success: function (data) {
            $("#RelationNews").append(data);
        }
    });

    $("#more-btn-relation").css('display', 'none');
}