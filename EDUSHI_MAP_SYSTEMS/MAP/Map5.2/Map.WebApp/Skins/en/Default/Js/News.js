window.onload=fnOnload;

function fnOnload()
{
    if (!window.Config)
    {
        setTimeout('fnOnload()', 200);
        return;
    }
    document.body.innerHTML=window.Config.Loading;
    var url=window.Config.EDataCenterUrl + 'CommMap5.0/ad.aspx?domain='+window.Config.Domain+'&l='+window.Config.Language+'&req=3&id='+fnRequest('id');
    ENetwork.DownloadScript(url,function(){fnShowInfo();});
}
function fnShowInfo(){    
    if (typeof _ScrollAdDetail != 'undefined')
    {
        document.body.innerHTML='<div style="text-align:center; height:atuo; overflow-y:auto;">'+_ScrollAdDetail.ScrollAdDeatil[0].MDI_Title+'<div style="margin:5px 0">'+_ScrollAdDetail.ScrollAdDeatil[0].MDI_Content.replaceAll('/cityresource2/', window.Config.PicUrl)+'</div>';
    }
}