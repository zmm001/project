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
        var url = window.Config.EDataCenterUrl + 'ad/ads.aspx?citycode=' + window.Config.CityCode + '&l=' + window.Config.Language + '&key=yeka&domid=div_ad&rnd=' + ENetwork.GetExecutionID();
        ENetwork.DownloadScript(url);
    }
    fnResize();
}

function fnShowInfo(){    
    if (typeof _ScrollAdDetail != 'undefined') {
        
        document.body.innerHTML='<div style="text-align:center; height:atuo; overflow-y:auto;">'+_ScrollAdDetail.ScrollAdDeatil[0].MDI_Title+'<div style="margin:5px 0">'+_ScrollAdDetail.ScrollAdDeatil[0].MDI_Content.replaceAll('/cityresource2/', window.Config.PicUrl)+'</div>';
    }

}
//初始化高度
function fnResize() {
    document.body.style.height = fnGetWindowHeight()-5 + 'px';
}



