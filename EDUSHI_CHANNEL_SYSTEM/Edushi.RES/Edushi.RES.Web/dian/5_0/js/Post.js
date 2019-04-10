function fnCheckFrom() {
    $('.error').removeClass('error');
    var c = $("#txtTitle");
    if ($.trim(c.val()) == '') {
        c.addClass('error');
        alert('【标题】不能为空');
        return false;
    }

    c = $("#hfRoot")
    if ($.trim(c.val()) == '' || c.val() == "0") {
        c = $("#ddlType");
        c.addClass('error');
        c = $("#ddlSubType");
        c.addClass('error');
        alert('请选择【分类】');
        return false;
    }
    c = $("#hfType")
    if ($.trim(c.val()) == '' || c.val() == "0") {
        c = $("#ddlSubType");
        c.addClass('error');
        alert('请选择【分类】');
        return false;
    }

    c = $("#pubuser");
    var c2 = $("#pubCom");
    if ($.trim(c.val()) == '1' && $.trim(c2.val()) == '') {
        c.addClass('error');
        c2.addClass('error');
        alert('请选择企业');
        return false;
    }
    $("#hfCompanyName").val(c2.find("option:selected").text());
    $("#hfCompanyID").val(c2.val());

    c = $("#txtContent");
    if ($.trim(c.val()) == '') {
        alert('【资讯内容】不能为空');
        return false;
    }
    c = $("#txtCode");
    if ($.trim(c.val()) == '') {
        c.addClass('error');
        alert('【验证码】不能为空');
        return false;
    }
    if ((new Date().getTime()) - (new CookieHelper().getCookie("VerifyTime")) >= 1 * 60 * 1000) {
        alert('验证码过期！请点击图片重新获取');
        return false;
    }
}
$(function () {
    var _ddlType = document.getElementById("ddlType");
    var _o = new Option();
    _o.value = "0";
    _o.text = "请选择..";
    _ddlType.options.add(_o)

    jQuery.each(NodeList, function (i, item) {
        var _o = new Option();
        _o.value = item["ID"];
        _o.text = item["Name"];
        if (item["Name"] == '商家动态') {
            if ($("#pubCom").length>0) {
                _ddlType.options.add(_o);
            }
        }else{
            _ddlType.options.add(_o);
        }
        
    })

    jQuery("#ddlType").change(function () {
        var _ddl = document.getElementById("ddlSubType");
        _ddl.options.length = 0;
        var _o = new Option();
        _o.value = "0";
        _o.text = "请选择..";
        _ddl.options.add(_o)

        var _val = $(this).val();
        $("#hfRoot").val(_val);
        $("#hfType").val('');//重置子分类
        jQuery.each(NodeList, function (i, item) {
            if (item["ID"] == _val) {
                jQuery.each(item["SubNode"], function (i, item) {
                    var _o = new Option();
                    _o.value = item["ID"];
                    _o.text = item["Name"];
                    _ddl.options.add(_o);
                    jQuery.each(item["SubNode"], function (i, item) {
                        var _o = new Option();
                        _o.value = item["ID"];
                        _o.text = "&nbsp; ┗" + item["Name"];
                        _ddl.options.add(_o);
                    })
                })
            }
        })
        if ($(this).find("option:selected").text() == '商家动态') {
            $("#pubuser").val("1");
            $("#pubCom").show();
        }
    })
    jQuery("#ddlSubType").change(function () {
        if ($(this).val() != "0") {
            $("#hfType").val($(this).val());
        }
    })

    var _hfType = $("#hfType").val();

    jQuery("#ddlType").val($("#hfRoot").val())
    if (_hfType != 0) {
        jQuery("#ddlType").change();
        jQuery("#ddlSubType").val(_hfType).change();
    }
    if ($("#pubCom").length>0) {
        var _o = new Option();
        _o.value = 1;
        _o.text = "商家用户";
        document.getElementById("pubuser").options.add(_o);
        if ($("#hfCompanyID").val() != 0)
            $("#pubuser").val(1);
    }
    jQuery("#pubuser").change(function () {
        if ($(this).val() == "1") {
            $("#pubCom").show();
        } else {
            if ($("#ddlType").find("option:selected").text() == '商家动态') {
                $(this).val("1");
                alert('【商家动态】必须以【商家用户】发布');
            } else {
                $("#pubCom").hide();
            }
        }
    })
    jQuery("#pubCom").change(function () {
        $("#hfCompanyName").val($(this).find("option:selected").text());
    })
    $("#imgCode").hide();
})
var first = true;
function LoadCodeFirst() {
    if (first) LoadCode();
    first = false;
}
function LoadCode() {
    $("#imgCode").attr("src", "GetVerify.shtml?rad=" + Math.random()).show();
    new CookieHelper().setCookie("VerifyTime", new Date().getTime());
    
}