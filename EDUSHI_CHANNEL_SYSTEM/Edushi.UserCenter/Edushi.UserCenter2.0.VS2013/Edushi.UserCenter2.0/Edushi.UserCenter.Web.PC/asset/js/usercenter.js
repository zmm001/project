$(function () {
    if ($('#edushi').hasClass("on")) {
        $('#putong').removeClass("on")
    }
    if ($('#putong').hasClass("on")) {
        $('#edushi').removeClass("on")
    }
    clickAttention(".add-follow"); // 加关注
    clickAttention(".follow-btn"); // 取消互助
});
function clickAttention(element) {
    $(element).click(function (e) {
        // 每次点击获取当前点击用户的id
        var event = e || window.event;
        var attendId = event.target.id;
        var tag = false;
        var attention = false;//Ta关注我
        if (event.target.className == "js-follow follow-btn") {
            tag = true;
            if (event.target.name == "1") {
                attention = true;
            }
        }
        if (event.target.className == "fr follow-btn following dis-follow") {
            isAttention = true;
        } else {
            isAttention = false;
        }
        if ($("#" + event.target.id).attr('data-title') == "1") {
            isAttention = true;
        }
        var isEdushi = false;
        if ($("#" + event.target.id).attr('data-title') == "edushi") {
            isEdushi = true;
        }
        var isputong = false;
        if ($("#" + event.target.id).attr('data-title') == "putong") {
            isputong = true;
        }
        // 互相关注/已关注
        if (event.target.className == "follow-btn eachother" || event.target.className == "follow-btn follow") {
            return;
        }
        // 记录当前选择的元素
        var _this = $(this);
        attentionAdd_Canel(changeTest, _this, attendId, tag, attention, isAttention,isEdushi,isputong);
    })
}
function attentionAdd_Canel(callback, _this, attendId, tag, attention, isAttention, isEdushi,isputong) {
    if (!_this.hasClass("followed") && !_this.hasClass("following")) { // 添加关注
        $.ajax({
            type: "post",
            dataType: "json",
            url: "/AddAttention.htm",
            data: { "userId": attendId },
            success: function (data) {
                if (data.ResultCode == 1) {
                    if (tag) {
                        popUp(data.Msg);
                        if (attention) {
                            if (callback) callback(_this, "", "follow-btn eachother");// 互相关注
                            //$(".follow-tips").hide(); // 隐藏 Ta关注我
                        } else {
                            window.location.reload();
                            if (callback) callback(_this, "", "follow-btn follow followed");// 已关注
                        }
                    }
                    else {                   
                        popUp(data.Msg);
                        // 互相关注
                        if (isAttention) {
                            if (callback) callback(_this, "互相关注", "fr follow-btn following");
                            //$('.follow-tips').remove();
                        } else {
                            if (callback) callback(_this, "已关注", "fr follow-btn followed");
                        }
                    }
                } else if (data.ResultCode == 2) {
                    window.location.href = '/Login.html?BackUrl=' + window.location.href;
                } else {
                    if (tag) {
                        popUp(data.Msg);
                        if (attention) {
                            if (callback) callback(_this, "", "follow-btn eachother");// 互相关注
                            $(".follow-tips").hide(); // 隐藏 Ta关注我
                        } else {
                            window.location.reload();
                            if (callback) callback(_this, "", "follow-btn follow followed", "1");// 已关注
                        }
                    }
                    else {                  
                        popUp(data.Msg);
                        // 互相关注
                        if (isAttention) {
                            if (callback) callback(_this, "互相关注", "fr follow-btn following");
                            $('.follow-tips').remove();
                        } else {
                            if (callback) callback(_this, "已关注", "fr follow-btn followed", "1");
                        }
                    }
                }
            }
        });
    } else { // 取消关注
        $.ajax({
            type: "post",
            dataType: "json",
            url: "/CancelAttention.htm",
            data: { "userId": attendId },
            success: function (data) {
                if (data.ResultCode == 1) {
                    if (tag) {

                    } else {
                        if (isEdushi || isputong) {// E都市号
                            window.location.reload();
                        } else {
                            _this.removeClass("follow");
                            popUp(data.Msg);
                            if (isAttention)//互相关注
                            {
                                if (callback) callback(_this, "关注", "fr add-follow", "1");
                            } else {
                                if (callback) callback(_this, "关注", "fr add-follow");
                            }
                        }
                    }
                } else if (data.ResultCode == 2) {
                    window.location.href = '/Login.html?BackUrl=' + window.location.href;
                } else {
                    if (tag) {

                    } else {
                        if (isEdushi || isputong) {
                            window.location.reload();
                        } else {
                            _this.removeClass("follow");
                            popUp(data.Msg);
                            if (isAttention) {
                                if (callback) callback(_this, "关注", "fr add-follow", "1");
                            } else {
                                if (callback) callback(_this, "关注", "fr add-follow");
                            }
                        }
                    }
                }
            }
        });
    }
}
// 记录当前元素，更改页面显示文字
function changeTest(currtyElement, text, newclass, name) {
    currtyElement.context.innerText = text;
    currtyElement.context.className = newclass;// 添加样式
    currtyElement.context.dataset.title = (name == null) ? "" : name;
    if (text == '互相关注') {
        currtyElement.next().hide();
    }
    if (name != null) {// 互相关注 取消关注后显示  Ta关注我
        currtyElement.after("<div class=\"follow-tips\">TA关注了我</div>");
    }
}