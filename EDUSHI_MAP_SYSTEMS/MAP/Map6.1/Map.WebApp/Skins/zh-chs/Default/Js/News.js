window.onload=fnOnload;

function fnOnload() {
    if (!window.Config) {
        setTimeout('fnOnload()', 200);
        return;
    }
    if (fnRequest('id') != '') {
        document.body.innerHTML = window.Config.Loading;
        var url = window.Config.EDataCenterUrl + 'CommMap5.0/ad.aspx?domain=' + window.Config.Domain + '&l=' + window.Config.Language + '&req=3&id=' + fnRequest('id');
        ENetwork.DownloadScript(url, function() { fnShowInfo(); });
    }
    else {
        var url = window.Config.EDataCenterUrl + 'ad/ads.aspx?citycode=' + window.Config.CityCode + '&l=' + window.Config.Language + '&manyKeys=yeka1,yeka2,yeka3,yeka3,yeka4,yeka5&callback=showManyAd&key=yeka&domid=div_ad&rnd=' + ENetwork.GetExecutionID();
        ENetwork.DownloadScript(url);
    }
    fnResize();
}

function fnShowInfo(){    
    if (typeof _ScrollAdDetail != 'undefined') {
        
        document.body.innerHTML='<div style="text-align:center; height:atuo; overflow-y:auto;">'+_ScrollAdDetail.ScrollAdDeatil[0].MDI_Title+'<div style="margin:5px 0">'+_ScrollAdDetail.ScrollAdDeatil[0].MDI_Content.replaceAll('/cityresource2/', window.Config.PicUrl)+'</div>';
    }

}
function showManyAd(AdData,AdKey) {
    if (AdData) {
        var AdDataArr = AdData.split(',');
        var AdKeyArr = AdKey.split(',');
        var yeka1Html = "";
        var yeka2Html = "";
        var yeka3Html = "";
        var yeka4Html = "";
        var yeka5Html = "";
        if (AdDataArr.length == AdKeyArr.length) {
            for (var i = 0; i < AdKeyArr.length; i++) {
                if (AdKeyArr[i] == "yeka1") {
                    yeka1Html = AdDataArr[i];
                }
                else if (AdKeyArr[i] == "yeka2"){
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
            }

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

        //alert(AdData);
    }
}
//初始化高度
function fnResize() {
    document.body.style.height = fnGetWindowHeight()-5 + 'px';
}



