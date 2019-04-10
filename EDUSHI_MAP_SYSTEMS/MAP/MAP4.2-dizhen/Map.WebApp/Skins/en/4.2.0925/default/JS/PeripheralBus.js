window.onload=fnOnload;

function fnOnload()
{
    if (!window.Config)
    {
        setTimeout('fnOnload()', 200);
        return;
    }
    document.body.innerHTML=window.Config._Loading;
    var url=window.Config._DataCenterUrl + 'CommMap/Bus.aspx?node='+window.Config._Node+'&l='+window.Config._L+'&v=1.0&req=8&x='+ unescape(fnRequest('x')) + '&y=' + unescape(fnRequest('y'));
    ENetwork.DownloadScript(url,function(){fnShowBustList();}); 
}
function fnShowBustList()
{       
    var sHtml = '<div class="Station"></div><div id="divStationList">';
    if(typeof sBusStationData == 'undefined' || sBusStationData==null){document.body.innerHTML='<div class="Station">no buses</div>';return false;}
    for (var i=0; i<sBusStationData.Bus_BS_StationName_Js.length; i++)
    {
        //append station html header
        sHtml +=
            '<div class="Station">' +
                '<div class="NormalInfo" onclick="fnDisplayBus(this);">' +
                    (i+1) + '.<a>' + sBusStationData.Bus_BS_StationName_Js[i] + '</a>' +
                '</div>' +
                '<ul class="BusList">'
                
                //append bus list
                for (var k=0; k<sBusStationData.Bus_BN_BusName_Js[i].length; k++)
                {
                    sHtml += '<li><a href="javascript:;" onclick="parent.PopControlForm._busIdSearch('+sBusStationData.Bus_BN_ID_Js[i][k]+',\''+sBusStationData.Bus_BN_BusName_Js[i][k]+'\')">' + sBusStationData.Bus_BN_BusName_Js[i][k] + '</a></li>'
                }
                
         //append station html footer           
         sHtml += '</ul>' +
                '<div class="DottedLine"></div>'  +
            '</div>';     
    }
   sHtml = sHtml + '</div>';
   document.body.innerHTML = sHtml;
}
function fnDisplayBus(objStation, sStationID)
{
    //hide else
    var arrDiv = objStation.parentNode.parentNode.getElementsByTagName("div");
    for (var i=0; i<arrDiv.length; i++)
    {
        if (arrDiv[i].className == "Station")
        {
            if (arrDiv[i] != objStation.parentNode)
            {
                arrDiv[i].getElementsByTagName('div')[0].className = 'NormalInfo';
                arrDiv[i].getElementsByTagName('ul')[0].style.display = 'none';
            }
        }
    }
    //active current node
    if (objStation.className == 'ActiveInfo')
    {
        objStation.className = 'NormalInfo';
        objStation.parentNode.getElementsByTagName('ul')[0].style.display = 'none';
    }
    else
    {
        objStation.className = 'ActiveInfo';
        objStation.parentNode.getElementsByTagName('ul')[0].style.display = 'block';
    }
}