
function CheckNewsPost() {
    var content = editor.getSource();

    if (jQuery("#ddlNewType").val() == "0") {
        alert("请您选择正确的分类!");
        jQuery("#ddlNewType").focus();
        return false;
    }

    if (jQuery("#txtTitle").val().length < 5) {
        alert("资讯标题不能少于 5 个字");
        jQuery("#txtTitle").focus();
        return false;
    }

    if (content.length < 5) {
        alert('提问详细不能少于 5 个字');
        return false;
    }

}