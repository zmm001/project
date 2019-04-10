// 普通号通用添加关注功能
$(function () {
    if ($(document).scrollTop() + $(window).height() <= $(document).height())
        $(".loding").css('display', 'none');
})
function attention(callback, element, val) {
    var eachother = false; // 互相关注
    var isAttioned = false; // 加关注
    var cancelEachother = false;
    if (element.className == 'follow-btn eachother') {
        eachother = true;
    }
    if (element.className == 'add-follow eachother') {
        cancelEachother = true;
    }
    if (element.className == 'add-follow' || cancelEachother) {
        $.post("/AddAttention.htm", { "userId": val }, function (data) {//添加关注
            if (data.ResultCode == 1) {
                if (cancelEachother) {
                    isAttioned = false;
                } else {
                    isAttioned = true;
                }
                if (callback) callback(element, isAttioned, eachother, cancelEachother);
            } else if (data.ResultCode == 2) {
                window.location.href = 'http://m.edushi.com/user/Login.html?BackUrl=' + window.location.href;
            } else {
                if (cancelEachother) {
                    isAttioned = false;
                } else {
                    isAttioned = true;
                }
                if (callback) callback(element, isAttioned, eachother, cancelEachother);
            }
        })
    } else {
        $.post("/CancelAttention.htm", { "userId": val }, function (data) {//取消关注
            if (data.ResultCode == 1) {
                if (callback) callback(element, isAttioned, eachother, cancelEachother);
            } else if (data.ResultCode == 2) {
                window.location.href = 'http://m.edushi.com/user/Login.html?BackUrl=' + window.location.href;
            } else {
                alert(data.Msg);
            }
        })
    }
}
/*!
 * 改变页面显示样式
 * _this：当前选择元素
 * isAttention：是否已关注
 * eachother：互相关注
 * cancelEachother：取消互相关注
 */
function changeStyle(_this, isAttention, eachother, cancelEachother) {
    if (isAttention) {// 已关注
        _this.className = "follow-btn followed";
    }
    else if (eachother) { // 互相关注
        _this.className = "add-follow eachother";
        $(_this).after("<div class=\"follow-tips\">TA关注了我</div>");
    } else if (cancelEachother) {
        _this.className = "follow-btn eachother";
        $(_this).next().remove();
    }
    else { // 加关注
        _this.className = "add-follow";
    }
}
