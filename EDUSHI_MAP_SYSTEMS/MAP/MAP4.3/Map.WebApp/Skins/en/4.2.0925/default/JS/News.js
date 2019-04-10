window.onload=fnOnload;

function fnOnload()
{
    if (!window.Config)
    {
        setTimeout('fnOnload()', 200);
        return;
    }
    document.body.innerHTML=window.Config._Loading;
    var url=window.Config._DataCenterUrl + 'CommMap/ad.aspx?node='+window.Config._Node+'&l='+window.Config._L+'&v=1.0&req=3&id='+fnRequest('id');
    ENetwork.DownloadScript(url,function(){fnShowInfo();});
}
function fnShowInfo(){
    if (typeof ScrollTextDetail != 'undefined' && ScrollTextDetail)
    {
        document.body.innerHTML='<div style=" text-align:center; height:370px; overflow-y:auto;">'+ScrollTextDetail.Title+'<div><div style=" margin:0px 5px 5px 10px;text-align:left;">'+ScrollTextDetail.Content.replaceAll('/cityresource2/', window.Config._PicUrl);+'</div>';
    }
}
