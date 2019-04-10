function TWReco(tempData) {
    var html = "";
    var temp_css = "";
    var imgUrl = "";
    for (var i = 0; i < tempData.length; i++) {
        var temp_data = tempData[i];
        if (i == 0) {
            temp_css = " class=\"big\"";
            imgUrl = temp_data.img300_165;
        }
        else {
            temp_css = "";
            imgUrl = temp_data.img172_97;
        }
        html += "<li" + temp_css + "><a href=\"" + temp_data.link + "\" target=\"_blank\"><img src=\" " + imgUrl + "\" /><span>" + temp_data.title + "</span></a></li>\r\n";
    }

    if (html != "") {
        $("#TuWen_Reco").html("").html(html);
    }
}

function ArticleReco(tempData, tempData1) {

    var html = "";
    html += getMyHtml(tempData);
    html += getMyHtml(tempData1);

    if (html != "") {
        $("#ArticleReco").html("").html(html);
    }
}

function getMyHtml(tempData) {
    var temphtml = "";
    var temp_css = "";
    var imgHtml = "";
    for (var i = 0; i < tempData.length; i++) {
        var temp_data = tempData[i];
        if (i == 0) {
            temp_css = " class=\"img\"";
            imgHtml = "<img src=\" " + temp_data.img300_165 + "\" />";
        }
        else {
            temp_css = "";
            imgHtml = "";
        }

        temphtml += "<li" + temp_css + "><a href=\"" + temp_data.link + "\" target=\"_blank\">" + imgHtml + "<span>" + temp_data.title + "</span></a></li>\r\n";
    }
    return temphtml;
}

function XinWenJuJi(tempData) {
    var html = "<div class=\"cooperation-news\">\r\n";
    html += "       <div class=\"nav\">新闻聚集</div>\r\n";
    html += "       <ul class=\"clearfix\">\r\n";
    for (var i = 0; i < tempData.length; i++)
    {
        var temp_data = tempData[i];
        html += "           <li><a href=\"" + temp_data.link + "\" target=\"_blank\"><div class=\"imgbox\"><img src=\"" + temp_data.img172_97 + "\"></div><p class=\"text\">" + temp_data.title + "</p></a></li>\r\n";
    }

    html += "       </ul>\r\n";
    html += "</div>\r\n"

    if (html != "") {
        $("#XinWenJuJi").html("").html(html);
    }
}

function getData()
{
    $.ajax({
        type: "get",
        url: cooperationURL,/*url写异域的请求地址*/
        dataType: "json",/*加上datatype*/
        success: cb,
        error: function (ex) {
            alert(ex);
        }
    });
}

function cb(data)
{
    myData = eval(data);

    TWReco(myData.data.twtj_list);
    ArticleReco(myData.data.wztj_list, myData.data.wztj_list_2);
    XinWenJuJi(myData.data.content_list);
}

getData();