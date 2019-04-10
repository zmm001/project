$(function () {
    head();
    back();
    TopicRecommend();
    ParentTypeList();
    //TopicRelation();
    other();
});

//头部
function head() {
    var html = "";
    html += "<div class=\"top-topic clearfix\">\r\n";
    html += "   <p class=\"logo-3g\"><a href=\"" + JsData.indexUrl + "\"><img src=\"http://m.edushi.com/asset/images/logo.png\" width=\"100%\" /></a></p>\r\n";
    html += "   <div class=\"ur-here\"><a href=\"" + JsData.parentTypeURL + "\" class=\"current\">" + JsData.parentTypeName + "</a><i></i><a href=\"" + JsData.currentLink + "\">" + JsData.TypeName + "</a></div>\r\n";
    html += "   <div class=\"topic-radio\">";
    html += "       <span class=\"zt-icon\"><a href=\"http://m.edushi.com/zt/\">专题</a></span>\r\n";
    html += "       <span class=\"line-icon\"></span>\r\n";
    html += "       <span class=\"show-category\">频道</span>\r\n";
    html += "   </div>";
    html += "</div>\r\n";

    $("#head_html").html(html);
}

//返回
function back() {
    var html = "";
    html += "<p class=\"f-l back-ehome\"><a href=\"" + JsData.indexUrl + "\"><i class=\"home-icon\"></i>E都市首页</a></p>\r\n";
    html += "<p class=\"f-r\"><a href=\"" + JsData.parentTypeURL + "\"><i class=\"channel-icon\"></i>" + JsData.parentTypeName + "首页</a></p>\r\n";

    $("#back_html").html(html);
}

//与文章相关的专题
function TopicRelation() {
    $.ajax({
        url: $("#hidUrl").val() + "GetTopicRelation.htm",
        type: 'POST',
        data: { 'IA_ID': $("#hidID").val(), 'TID': $("#hidTID").val(), 'PName': $("#hidPName").val(), 'PValue': $("#hidPValue").val() },
        success: function (data) {
            $("#divtopic3").html(data.t3);
            $("#divtopic1").html(data.t1);
            $("#divtopic4").html(data.t4);
            var goto_zt = "<a href=\"" + JsData.TopicURL + "\">进入<span>专题</span>频道</a>";
            $("#goto_zt").html(goto_zt);
        }
    });
}

//专题推荐
function TopicRecommend() {
    $.ajax({
        url: $("#hidUrl").val() + "GetTopicRecommend.htm",
        type: 'POST',
        data: { 'TID': $("#hidTID").val(), 'PName': $("#hidPName").val(), 'PValue': $("#hidPValue").val() },
        success: function (data) {
            $("#divTopicRecommend").html(data);
        }
    });
}

//父分类
function ParentTypeList() {
    $.ajax({
        url: $("#hidUrl").val() + "GetParentTypeList.htm",
        type: 'POST',
        data: { 'PName': $("#hidPName").val(), 'PValue': $("#hidPValue").val() },
        success: function (data) {
            var html = data;
            html += "<a href=\"" + JsData.TuWenURL + "\">图闻</a>\r\n";
            html += "<a href=\"" + JsData.TopicURL + "\">专题</a>\r\n";
            //$("#footer-nav_1").html(html);
            $("#footer-nav_2").html(html);
            $(".footer-nav").clone(true).prependTo(".wrapper-cnt").addClass("main-nav"); //appendTo("body")
        }
    });
}

function other() {
    //var ChannelOrder = "<a href=\"" + JsData.parentTypeURL + "\">进入<span>" + JsData.parentTypeName + "</span>频道</a>";
    //$("#ChannelOrder").html(ChannelOrder);

    //var TouTiao_More = "<a href=\"" + JsData.indexUrl + "\">去<span>首页</span>看精彩头条</a>";
    //$("#TouTiao_More").html(TouTiao_More);

    var page_footer = "<nav>\r\n";
    page_footer += "    <a href=\"http://www.edushi.com/\">电脑版</a>|\r\n";
    page_footer += "    <a href=\"" + JsData.indexUrl + "\" style=\"color:#cc2900;\">回首页</a>|\r\n";
    page_footer += "    <a href=\"javascript:;\" class=\"back-top\">回顶部</a>\r\n";
    page_footer += "</nav>\r\n";
    page_footer += "<p>浙B2-20050306&nbsp;&nbsp;&nbsp;E都市@edushi.com</p>\r\n";
    $("#page_footer").html(page_footer);

    var back_index = "<a href=\"" + JsData.indexUrl + "\">返回首页></a>";
    $("#back_index").html(back_index);
}