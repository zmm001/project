function newsLoad(callback) {
    pageIndex++;
    if (pageIndex > pageCount) {
        return false;
    }
    //$(".loading").css('display', 'block');
    var param = { 'userId': configData.UserId, 'type': configData.NewsType, "pageIndex": pageIndex };
    
    $.ajax({
        type: 'POST', //GET
        url: configData.Url + configData.Page,
        data: param,
        success: function (data) {
            configData.Contaiter.append(data);
            // 当类型是粉丝或者关注 重新加载js文件
            if (configData.NewsType == 6 || configData.NewsType == 7) {
                //loadJs("..//asset/js/load.js");
                if (callback) callback();
            }
            if (pageIndex >= pageCount) {
                $(".load-btn").remove();
                $(".load-prompt").show();
            }
        },
        error: function (xhr, type) {
            //alert('加载异常，请刷新页面重试！');
        }
    });
}
var pageIndex = configData.PageIndex;
var pageCount = configData.Count;
if (configData.NewsType > 4) {
    configData.Page = "GetUserData.htm";
    configData.Contaiter = $("#datalists");
}
$(function () {
    //点击加载更多
    $(".load-btn").click(function () {
        newsLoad(change);
    });
    clickAttention(".add-follow"); // 加关注
    clickAttention(".follow-btn"); // 相互关注
    
})
function clickAttention(event, tag, isAttention) {
    var isAttention = false;
    $(event).click(function (e) {
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
        if (event.target.title == "1") {
            isAttention = true;
        }
        // 互相关注/已关注
        if (event.target.className == "follow-btn eachother" || event.target.className == "follow-btn follow") {
            return;
        }
        // 记录当前选择的元素
        var _this = $(this);
        attentionAdd_Canel(changeTest, attendId, _this, tag, attention, isAttention);
    })
}
function change(e) {
    clickAttention(".add-follow"); // 加关注
    clickAttention(".follow-btn"); // 互相关注
    clickAttention(".js-follow-btn", true);
}
//  添加/取消关注
function attentionAdd_Canel(callback, attendId, _this, tag, attention, isAttention) {
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
                            $(".follow-tips").hide(); // 隐藏 Ta关注我
                        } else {
                            window.location.reload();
                            if (callback) callback(_this, "", "follow-btn follow followed");// 已关注
                        }
                    }
                    else {
                        _this.addClass("follow");
                        popUp(data.Msg);
                        // 互相关注
                        if (isAttention) {
                            if (callback) callback(_this, "互相关注", "fr follow-btn following");
                            $('.follow-tips').remove();
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
                            if (callback) callback(_this, "", "follow-btn follow followed","1");// 已关注
                        }
                    }
                    else {
                        _this.addClass("follow");
                        popUp(data.Msg);
                        // 互相关注
                        if (isAttention) {
                            if (callback) callback(_this, "互相关注", "fr follow-btn following");
                            $('.follow-tips').remove();
                        } else {
                            if (callback) callback(_this, "已关注", "fr follow-btn followed","1");
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
                        _this.removeClass("follow");
                        popUp(data.Msg);
                        if (isAttention)//互相关注
                        {
                            if (callback) callback(_this, "关注", "fr add-follow", "1");
                        } else {
                            if (callback) callback(_this, "关注", "fr add-follow");
                        }
                    }
                } else if (data.ResultCode == 2) {
                    window.location.href = '/Login.html?BackUrl=' + window.location.href;
                } else {
                    if (tag) {

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
        });
    }
}
// 记录当前元素，更改页面显示文字
function changeTest(currtyElement, text,newclass,name) {
    currtyElement.context.innerText = text;
    currtyElement.context.className = newclass;// 添加样式
    currtyElement.context.title = (name == null) ? "" : name;
    if (name != null) {// 互相关注 取消关注后显示  Ta关注我
        currtyElement.after("<div class=\"follow-tips\">TA关注了我</div>");
    }
}
// 重新加载js文件
function loadJs(file) {
    var head = $("head").remove("script[role='reload']");
    $("<scri" + "pt>" + "</scr" + "ipt>").attr({
        role: 'reload', src: file, type: 'text/javascript'
    }).appendTo(head);
}