function checkform() {
    var name = $("#txtBIC_CompanyName"),
	big = $("#dplBIC_BigType"),
	small = $("#dplBIC_SmallType"),
	addr = $("#txtBIC_Address"),
	tel = $("#txtBIC_Tel"),
	man=$("#txtBIC_Link"),
	mob=$("#txtBIC_Mob"),
	fax = $("#txtBIC_Fax"),
	post = $("#txtBIC_Post"),
	url = $("#txtBIC_Internet"),
	email = $("#txtBIC_Email"),
	des=$("#txtBIC_Des");
    if (name.val() == '') { alert('企业名称不能为空！'); name.focus(); return false; }
    if (big.val() == '-1' || small.val() == '-1') { alert('分类不能为空！'); small.focus(); return false; }
    if (addr.val() == '') { alert('地址不能为空'); addr.focus(); return false; }
    if (tel.val() == ''&& mob.val()=='') {alert('电话和手机，至少填写一个'); tel.focus(); return false; }
    if (man.val() == '') { alert('联系人不能为空'); man.focus(); return false; }
    if (des.val() == '') { alert('简介不能为空'); des.focus(); return false; }
	if (tel.val() != '') {
        if (!tel.val().match(/^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/)) {
            alert('请输入正确的电话号码'); tel.focus(); return false;
        }
    }
	if (fax.val() != '') {
        if (!fax.val().match(/^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/)) {
            alert('请输入正确的传真'); fax.focus(); return false;
        }
    }
    if (post.val() != '') {
        if (!post.val().match(/^[1-9]{1}(\d+){5}/)) {
            alert('请输入正确的邮编'); post.focus(); return false;
        }
    }
    if (url.val() != '') {
        if (!url.val().match(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/)) {
            alert('请输入正确的网址'); url.focus(); return false;
        }
    }
    if (email.val() != '') {
        if (!email.val().match(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/)) {
            alert('请输入正确的Email地址'); email.focus(); return false;
        }
    }
	if (mob.val() != '') {
        if (!mob.val().match(/^1[3|4|5|8][0-9]\d{8}$/)) {
            alert('请输入正确的手机号'); mob.focus(); return false;
        }
    }
    $("#myform").submit();
}
function getss(id) {
    if (id != -1) {
        var html = "<option selected='selected' value='-1'>=请选择=</option>";
        $.getJSON("getsmall.shtml", { ID: id, tick: Math.random() }, function (data) {
            for (var i = 0; i < data.length; i++) {
                html += "<option value='" + data[i].MCT_ID + "'>" + data[i].MCT_TypeName + "</option>";
            }
            $("#dplBIC_SmallType").html(html);
        })
    }
}