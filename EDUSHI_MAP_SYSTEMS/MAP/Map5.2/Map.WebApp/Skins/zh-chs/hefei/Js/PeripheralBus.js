window.onload=fnOnload;

function fnOnload()
{
    if (!window.Config)
    {
        setTimeout('fnOnload()', 200);
        return;
    }
    document.body.innerHTML=window.Config.Loading;
    var url=window.Config.EDataCenterUrl + 'CommMap5.0/Bus.aspx?domain='+window.Config.Domain+'&l='+window.Config.Language+'&req=7&x='+ unescape(fnRequest('x')) + '&y=' + unescape(fnRequest('y'));
    ENetwork.DownloadScript(url,function(){fnShowBustList();});

}
function fnShowBustList()
{       
    var sHtml = '<div id="TabContent" class="periheralBus"><strong>'+unescape(fnRequest('oname'))+'</strong>周边公交：';
    if(typeof _Station == 'undefined' || _Station.length < 1){document.body.innerHTML='<div class="NoInfoClew">没有相关数据！</div>';return false;}
    for (var i=0; i<_Station.length; i++)
    {
        //append station html header
        sHtml +=
            '<div class="Station">' +
                '<div class="NormalInfo" onclick="fnDisplayBus(this);">' +
                    '<a>' + _Station[i].StationName + '</a>&nbsp;<img src="' + window.Config.SkinPath + 'Images/GoToIco.gif" alt="定位公交站点" style="cursor:pointer;" onclick="parent.fnGotoBusStation(' + _Station[i].StationID + ',\'' + _Station[i].StationName + '\',' + _Station[i].PositionX + ',' + _Station[i].PositionY + ');event.cancelBubble=true;" />' +
                '</div>' +
                '<ul class="BusList">';
                
                //append bus list
                for (var k=0; k<_Station[i].Bus.length; k++)
                {
                    var oBus = _Station[i].Bus[k];
                    sHtml += '<li><a href="javascript:;" onclick="parent.fnOnBusClick('+oBus.VehicleID+',\''+oBus.VehicleName+'\')" title="'+oBus.VehicleName+'">' + oBus.VehicleName+ '</a></li>'
                }
                
         //append station html footer           
         sHtml += '</ul>' +
                '<div class="DottedLine"></div>'  +
            '</div>';     
    }
   sHtml = sHtml + '</div>';
   document.body.innerHTML = sHtml;
    $('TabContent').style.height = fnGetWindowHeight()-10+'px';  //初始化高度
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
        objStation.title = '展开栏目';
        objStation.className = 'NormalInfo';
        objStation.parentNode.getElementsByTagName('ul')[0].style.display = 'none';
    }
    else
    {
        objStation.title = '收缩栏目';
        objStation.className = 'ActiveInfo';
        objStation.parentNode.getElementsByTagName('ul')[0].style.display = 'block';
    }
}