var UserCenterUrl;
var SendUrl;
var citycode;
var lang;
function SaveAndBuy(op, id, mciid) {
    $peven = jQuery("#favoriteblk .P:even");
    $podd = jQuery("#favoriteblk .P:odd");
    if (op == "Save") {
        $peven.show();
        $podd.hide();
    }
    else {
        $peven.hide();
        $podd.show();
    }
    jQuery.ajax({
        url: SendUrl,
        type: "GET",
        data: { 'pid': id, 'action': op, 'citycode': citycode, 'l': lang, 'mciid': mciid },
        dataType: "text",
        success: function(data) {
            $addtip = jQuery("#lblAddTip");
            $savestate = jQuery("#lblFavState");
            $cartsum = jQuery("#favoriteblk .P:eq(1)");
            $favoriteblk = jQuery("#favoriteblk");
            var tdata = data;
            tdata = tdata.split("|").length > 1 ? "addok" : tdata;
            switch (tdata) {
                case "login":
                    if (confirm('请您登录后操作，现在登录？')) {
                        window.location = UserCenterUrl + "Login.aspx?BackUrl=" + window.location;
                    }                    
                    break;
                case "Favexist":
                    $addtip.html("收藏夹里已存在！");
                    $savestate.html("添加失败！");
                    $favoriteblk.fadeIn("fast");
                    break;
                case "Favaddok":
                    $addtip.html("已添加到收藏夹！");
                    $savestate.html("添加成功！");
                    $favoriteblk.fadeIn("fast");
                    break;
                case "addok":
                    $cartsum.html("购物车共<span>" + data.split("|")[0] + "件</span>商品！ 合计：<span>" + data.split("|")[1] + "元</span>");
                    $savestate.html("添加成功！");
                    $favoriteblk.fadeIn("fast");
                    break;
                default:
                    $addtip.html("添加失败请稍后再试！");
                    $savestate.html("添加失败！");
                    $favoriteblk.fadeIn("fast");
                    break;

            }
        },
        error: function() { alert("很抱歉，操作失败。请稍后重试"); }
    });
}
function HiddenDiv(divid) {
    jQuery("#" + divid).fadeOut();
}
function Compute(textid, cp) {
    var pricesum, prevsum, spsum, $allsum;
    var pricecount = parseFloat(jQuery("#txtnum" + textid).val());
    if (isNaN(pricecount) || pricecount < 1) {
        pricecount = 1;
    }
    else {
        pricecount = cp == "=" ? pricecount : cp == "+" ? pricecount + 1 : (pricecount - 1) == 0 ? 1 : pricecount - 1;

    }
    prevsum = jQuery("#spsum" + textid).html();
    pricesum = parseFloat(jQuery("#spprice" + textid).html()) * pricecount;
    jQuery("#txtnum" + textid).val(pricecount);
    jQuery("#spsum" + textid).parents("tr").find("input[type='hidden']:eq(1)").val(pricecount);
    jQuery("#spsum" + textid).html(pricesum);
    spsum = parseFloat($("#spsum" + textid));
    $allsum = jQuery("#spallsum" + jQuery("#spsum" + textid).parents("tbody").attr("id"));
    $allsum.html(parseFloat($allsum.html()) - prevsum + pricesum);
}
function UpdComputecount(textid) {
    updProcount("Upd", textid, parseFloat(jQuery("#txtnum" + textid).val()))
}
/*function ComputeSum(docid, perdocid,) {
var spsum = parseFloat($("#spsum" + docid));
var $allsum = $("#spallsum" + perdocid);
$allsum.html();
if (!ckstate)
$allsum.html("0");
ckstate = true;
if ($(this).attr("checked") == true)
$allsum.html(parseFloat($allsum.html()) + spsum);
else
$allsum.html(parseFloat($allsum.html()) - spsum);
}*/
function updProcount(op, id, pcount) {
    jQuery.ajax({ 
        url: SendUrl,
        type: "GET",
        data: { 'pid': id, 'action': op,'pcount':pcount, 'citycode': citycode, 'l': lang },
        dataType: "text",
        success: function(data) {
            switch (data) {
                case "login":
                    if (confirm('请您登录后操作，现在登录？')) {
                        window.location = UserCenterUrl + "Login.aspx?BackUrl=" + window.location;
                    }
                    break;
                default:
                    break;

            }
        },
        error: function() { alert("很抱歉，操作失败。请稍后重试"); }
    });
}
function delProduct(op, id) {
    if (!confirm('确实要删除购物车中的该商品吗？'))
        return;
    jQuery("div").dialog({
        show: "nofull",
        range: ".text"//遮盖对象
    });
    jQuery.ajax({
        url: SendUrl,
        type: "GET",
        data: { 'pid': id, 'action': op, 'citycode': citycode, 'l': lang },
        dataType: "text",
        success: function(data) {
            switch (data) {
                case "login":
                    if (confirm('请您登录后操作，现在登录？')) {
                        window.location = UserCenterUrl + "Login.aspx?BackUrl=" + window.location;
                    }
                    break;
                case "delok":
                    var prevsum = jQuery("#spsum" + id).html();
                    var $allsum = jQuery("#spallsum" + jQuery("#spsum" + id).parents("tbody").attr("id"));
                    $allsum.html(parseFloat($allsum.html()) - prevsum);
                    jQuery("#MaskID").remove();
                    jQuery("#DivDialog").remove();
                    jQuery("#tr" + id).hide().slideUp("slow");
                    break;
                default:
                    jQuery("#MaskID").remove();
                    jQuery("#DivDialog").remove();
                    alert("很抱歉，操作失败。请稍后重试");
                    break;

            }
        },
        error: function() { alert("很抱歉，操作失败。请稍后重试"); }
    });
}
function CheckDeliverGoodsData() {
    var $username, $GoodsTel, $GoodsAddress, $GoodsPost;
    $username = jQuery('#txtSecondDeliverGoodsUserName');
    $GoodsTel = jQuery('#txtSecondDeliverGoodsTel');
    $GoodsAddress = jQuery('#txtSecondDeliverGoodsAddress');
    $GoodsPost = jQuery('#txtSecondDeliverGoodsPost');
    if ($.trim($GoodsAddress.val()) == "") {
        $GoodsAddress.focus();
        jQuery(".ClOrg:eq(0)").html('*<span class="sptip">街道地址必须填写</span>').hide().fadeIn();
        return false;
    }
    if ($.trim($GoodsPost.val()) == "") {
        $GoodsPost.focus();
        jQuery(".ClOrg:eq(1)").html('*<span class="sptip">邮政编码必须填写</span>').hide().fadeIn();
        return false;
    }
    if ($.trim($username.val()) == "") {
        $username.focus();
        jQuery(".ClOrg:eq(2)").html('*<span class="sptip">收 货 人必须填写</span>').hide().fadeIn();
        return false;
    }
    if ($.trim($GoodsTel.val()) == "") {
        $GoodsTel.focus();
        jQuery(".ClOrg:eq(3)").html('*<span class="sptip">电话号码必须填写</span>').hide().fadeIn();
        return false;
    }
    jQuery("#hidArea").val(jQuery("#selprovince").val() + jQuery("#selcity").val() + jQuery("#selcounty").val());
    return true;
}