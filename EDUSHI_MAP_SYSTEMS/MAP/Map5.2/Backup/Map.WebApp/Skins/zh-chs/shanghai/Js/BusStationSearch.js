window.onload=fnOnload;
function fnOnload()
{
    if (!window.Config)
    {
        setTimeout('fnOnload()', 200);
        return;
    }
    $('Content').innerHTML = window.Config.Loading;
    var url=window.Config.EDataCenterUrl+'CommMap5.0/Bus.aspx?domain='+window.Config.Domain+'&l='+window.Config.Language+'&req=2&s='+unescape(fnRequest('key'));
    ENetwork.DownloadScript(url,function(){fnBusStationShow();}); 
    document.body.style.height = fnGetWindowHeight()-10+'px';
}
function fnBusStationShow(){
    if (typeof _Station != 'undefined' && _Station.length>0) {
         var l=_Station.length;
         var s='';
         for(i=0;i<l;i++){
            s=s+'<div class="action" onclick="fnShow('+i+');"><div class="h" id="h'+i+'"><div class="imgs" id="img'+i+'"></div><a>'+_Station[i].StationName.replace(unescape(fnRequest('key')),'<span style="color:#ff8601">'+unescape(fnRequest('key'))+'</span>')+'</a>&nbsp;<img src="'+window.Config.SkinPath+'Images/GoToIco.gif" alt="定位公交站点" style="cursor:pointer;" onclick="parent.fnGotoBusStation('+_Station[i].StationID+',\''+_Station[i].StationName+'\','+_Station[i].PositionX+','+_Station[i].PositionY+');event.cancelBubble=true;" /></div></div><div id="LinInfo'+i+'" class="info" style="display:none;">{$list}</div>';
            var sl=_Station[i].Bus.length;
            var ss='';
            for(j=0;j<sl;j++){
                ss+='<div onclick="parent.fnOnBusClick('+_Station[i].Bus[j].VehicleID+',\''+_Station[i].Bus[j].VehicleName+'\');">'+_Station[i].Bus[j].VehicleName+'</div>';                
            }
            s=s.replace('{$list}',ss);
         }
         var sBusStation = '共有<strong>{$No}</strong>项符合站名<strong>{$Key}</strong>的查询结果{$Blist}';
         $('Content').innerHTML = sBusStation.replace('{$Blist}', s).replace('{$No}', l).replace('{$Key}', unescape(fnRequest('key')));
         $('Content').style.height = fnGetWindowHeight()-10+'px';  //初始化高度
     }
     else{
         $('Content').innerHTML = '<div class="NoInfoClew">没有相关数据！</div>';
           return false;
    }        
}
function fnShow(i){
    if($('LinInfo'+i).style.display=='none'){
        $('LinInfo'+i).style.display='block';
        $('img'+i).className = 'imgsup';
        $('h'+i).className = 'active';
    }else{
        $('LinInfo'+i).style.display='none';
        $('img'+i).className = 'imgs';
        $('h'+i).className = 'h';
    }
}