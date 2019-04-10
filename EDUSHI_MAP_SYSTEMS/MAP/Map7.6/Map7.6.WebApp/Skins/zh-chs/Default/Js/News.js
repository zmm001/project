window.onload = fnOnload;

function fnOnload() {
    if (!window.Config) {
        setTimeout('fnOnload()', 200);
        return;
    }

    var url = window.Config.DataCetnerAdDataUrl + 'Ad2.0/ads.aspx?citycode=' + window.Config.CityCode + '&l=' + window.Config.Language + '&manyKeys=yeka1,yeka2,yeka3,yeka4,yeka5,yekaliu,yeka-big-ad&callback=showManyAd&key=yeka&domid=div_ad';
    ENetwork.DownloadScript(url);
    fnResize();
}

function fnShowInfo() {
    if (typeof _ScrollAdDetail != 'undefined') {
        document.body.innerHTML = '<div style="text-align:center; height:atuo; overflow-y:auto;">' + _ScrollAdDetail.ScrollAdDeatil[0].MDI_Title + '<div style="margin:5px 0">' + _ScrollAdDetail.ScrollAdDeatil[0].MDI_Content.replaceAll('/cityresource2/', window.Config.PicUrl) + '</div>';
    }
}
function showManyAd(AdData, AdKey) {
    if (AdData) {
        var AdDataArr = AdData.split(',');
        var AdKeyArr = AdKey.split(',');
        var yeka1Html = "";
        var yeka2Html = "";
        var yeka3Html = "";
        var yeka4Html = "";
        var yeka5Html = "";
        var yeka6Html = '';
        var yeka7Html = '';
        if (AdDataArr.length == AdKeyArr.length) {
            for (var i = 0; i < AdKeyArr.length; i++) {
                if (AdKeyArr[i] == "yeka1") {
                    yeka1Html = AdDataArr[i];
                }
                else if (AdKeyArr[i] == "yeka2") {
                    yeka2Html = AdDataArr[i];
                }
                else if (AdKeyArr[i] == "yeka3") {
                    yeka3Html = AdDataArr[i];
                }
                else if (AdKeyArr[i] == "yeka4") {
                    yeka4Html = AdDataArr[i];
                }
                else if (AdKeyArr[i] == "yeka5") {
                    yeka5Html = AdDataArr[i];
                }
                else if (AdKeyArr[i] == "yekaliu") {
                    yeka6Html = AdDataArr[i];
                }
                else if (AdKeyArr[i].toLowerCase() == 'yeka-big-ad') {
                    yeka7Html = AdDataArr[i];
                }
            }

        }
        if (yeka7Html.length > 0) {
            var yeka7Dom = document.getElementById('yeka-big-AD');
            yeka7Dom.innerHTML = yeka7Html;
            setTimeout(function() { //关闭新功能提示
                fnClosePanel('yeka-big-AD');
            }, 7000);
        }
        else {
            $('yeka-big-AD').style.display = 'none';
        }
        if (yeka1Html.length > 0) {
            var yeka1Dom = document.getElementById('yeka1_div');
            yeka1Dom.innerHTML = yeka1Html;
        }
        if (yeka2Html.length > 0) {
            var yeka2Dom = document.getElementById('yeka2_div');
            yeka2Dom.innerHTML = yeka2Html;
        }
        if (yeka3Html.length > 0) {
            var yeka3Dom = document.getElementById('yeka3_div');
            yeka3Dom.innerHTML = yeka3Html;
        }
        if (yeka4Html.length > 0) {
            var yeka4Dom = document.getElementById('yeka4_div');
            yeka4Dom.innerHTML = yeka4Html;
        }
        if (yeka5Html.length > 0) {
            var yeka5Dom = document.getElementById('yeka5_div');
            yeka5Dom.innerHTML = yeka5Html;
        }
        if (yeka6Html.length > 0) {
            var yeka6Dom = document.getElementById('yeka6_div');
            yeka6Dom.innerHTML = yeka6Html;
        }
    }
}
//初始化高度
function fnResize(h) {
    if (!h) {
        document.body.style.height = (fnGetWindowHeight() - 10) + 'px';
    }
    else {
        document.body.style.height = (h - 10) + 'px';
    }
}
function fnClosePanel(id) {
    if ($(id)) {
        $(id).parentNode.removeChild($(id));
    }
}
function fnActive() {
    fnResize();
}



