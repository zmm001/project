$(function () {
    head();
    //ParentTypeList();
    //TopicRelation();
    TopicRecommend();
    other();
});

//头部
function head() {
    var html = "";
    html += "<div class=\"f-l wap-app\">\r\n";
    html += "   <p><span></span><a href=\"http://apps.edushi.com/news/app.html\" target=\"_blank\">E都市APP</a></p>\r\n";
    html += "   <i><img src=\"http://res.edushi.com/bang/v3/asset/images/qr_code.gif\" /></i>";
    html += "</div>\r\n";
    html += "<ul class=\"f-l top-category\">\r\n";
    html += "   <li class=\"edushi-home\"><a href=\"http://www.edushi.com/\" target=\"_blank\">首页</a></li>\r\n";
    html += "   <li><a href=\"http://www.edushi.com/info/2.html\" target=\"_blank\">头条</a></li>\r\n";
    html += "   <li><a href=\"http://www.edushi.com/info/4.html\" target=\"_blank\">娱乐</a></li>\r\n";
    html += "   <li><a href=\"http://www.edushi.com/info/113.html\" target=\"_blank\">前瞻</a></li>\r\n";
    html += "   <li><a href=\"http://www.edushi.com/info/1.html\" target=\"_blank\">集萃</a></li>\r\n";
    html += "   <li><a href=\"http://www.edushi.com/info/119.html\" target=\"_blank\">奇乐</a></li>\r\n";
    html += "   <li><a href=\"http://www.edushi.com/info/149.html\" target=\"_blank\">历史</a></li>\r\n";
    html += "   <li><a href=\"http://www.edushi.com/info/142.html\" target=\"_blank\">养生</a></li>\r\n";
    html += "   <li><a href=\"http://www.edushi.com/info/3.html\" target=\"_blank\">休闲</a></li>\r\n";
    html += "   <li><a href=\"http://www.edushi.com/info/6.html\" target=\"_blank\">婚嫁</a></li>\r\n";
    html += "   <li><a href=\"http://www.edushi.com/info/19.html\" target=\"_blank\">母婴</a></li>\r\n";
    html += "   <li><a href=\"http://www.edushi.com/info/161.html\" target=\"_blank\">游戏</a></li>\r\n";
    html += "   <li><a href=\"http://www.edushi.com/info/27.html\" target=\"_blank\">生活</a></li>\r\n";
    html += "   <li><a href=\"http://tu.edushi.com/\" target=\"_blank\">图闻</a></li>\r\n";
    html += "   <li><a href=\"http://www.edushi.com/zt/\" target=\"_blank\">专题</a></li>\r\n";
    html += "</ul>\r\n";
    html += "<div class=\"f-r top-tips\">\r\n";
    html += "   <p class=\"map3d\"><a href=\"http://www.edushi.com/mapcity.html\" target=\"_blank\">三维地图</a></p>\r\n";
    html += "   <div class=\"more-item\">\r\n";
    html += "       <p class=\"map3d\"><a href=\"http://www.edushi.com/mapcity.html\" target=\"_blank\">三维地图</a></p>\r\n";
    html += "       <p><a href=\"http://www.edushi.com/bdtcity.html\" target=\"_blank\">包打听</a></p>\r\n";
    html += "       <p><a href=\"http://lvyou.edushi.com/\" target=\"_blank\">旅游景点</a></p>\r\n";
    html += "       <p><a href=\"http://fangtoo.edushi.com/es/\" target=\"_blank\">二手房</a></p>\r\n";
    html += "       <p><a href=\"http://lvyou.edushi.com/Hotel\" target=\"_blank\">酒店预订</a></p>\r\n";
    html += "       <p><a href=\"http://fangtoo.edushi.com/cz/\" target=\"_blank\">租房</a></p>\r\n";
    html += "   </div>\r\n";
    html += "</div>\r\n";


    $("#head_html").html(html);
}

//父分类
function ParentTypeList() {
    $.ajax({
        url: $("#hidUrl").val() + "GetParentTypeList.htm",
        type: 'POST',
        success: function (data) {
            var html = data;
            html += "<li><a href=\"http://tu.edushi.com/\" target=\"_blank\">图闻</a>-</li>\r\n";
            html += "<li><a href=\"http://www.edushi.com/zt/\" target=\"_blank\">专题</a></li>\r\n";
            $("#parentTypeList").html(html);
        }
    });
}

//与文章相关的专题
function TopicRelation() {
    $.ajax({
        url: $("#hidUrl").val() + "GetTopicRelation.htm",
        type: 'POST',
        data: { 'IA_ID': $("#hidID").val() },
        success: function (data) {
            $("#divTopicRelation").html(data);
        }
    });
}

//专题推荐
function TopicRecommend() {
    $.ajax({
        url: $("#hidUrl").val() + "GetTopicRecommend.htm",
        type: 'POST',
        data: { 'TID': $("#hidTID").val() },
        success: function (data) {
            $("#divTopicRecommend").html(data);
        }
    });
}

function other() {
    var footer_nav = ""; //<a href=\"http://aladdin.edushi.com/\" target=\"_blank\">阿拉丁</a>|\r\n
    footer_nav += "<a href=\"http://www.edushi.com/about/\" target=\"_blank\">关于E都市</a>|\r\n";
    //footer_nav += "<a href=\"http://" + JsData.CityCode + ".edushi.com/\" target=\"_blank\">城市地图</a>|\r\n";
    //footer_nav += "<a href=\"http://www.edushi.com/about/GoToMap.htm\" target=\"_blank\">商务合作</a>|\r\n";
    //footer_nav += "<a href=\"http://www.edushi.com/about/MapSign.aspx\" target=\"_blank\">产品中心</a>|\r\n";
    footer_nav += "<a href=\"http://www.edushi.com/about/Declear.htm\" target=\"_blank\">法律声明</a>|\r\n";
    footer_nav += "<a href=\"http://www.edushi.com/about/ContactUs.htm\" target=\"_blank\">联系我们</a>\r\n";

    $("#footer_nav").html(footer_nav);

    var Back = "<p class=\"f-l back-ehome\"><a href=\"http://www.edushi.com/\" target=\"_blank\">E都市首页</a></p>\r\n";
    Back += "<p class=\"f-r\"><a href=\"" + JsData.parentTypeURL + "\" target=\"_blank\">" + JsData.parentTypeName + "首页</a></p>\r\n";
    $("#divBack").html(Back);

    var float_slidebar = "<p class=\"wap-enter\">E都市APP<img src=\"http://res.edushi.com/bang/v3/asset/images/code_img02.png\" /></p>\r\n";
    float_slidebar += "<p><a href=\"http://www.edushi.com/\" target=\"_blank\">E都市首页</a></p>\r\n";
    float_slidebar += "<p><a href=\"" + JsData.parentTypeURL + "\" target=\"_blank\">" + JsData.parentTypeName + "首页</a></p>\r\n";
    float_slidebar += "<p class=\"back-top\">返回顶部</p>\r\n";

    $("#float_slidebar").html(float_slidebar);
}