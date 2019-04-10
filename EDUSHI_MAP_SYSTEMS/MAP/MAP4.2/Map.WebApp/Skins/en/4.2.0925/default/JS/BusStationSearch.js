window.onload=fnOnload;
function fnOnload()
{
    if (!window.Config)
    {
        setTimeout('fnOnload()', 200);
        return;
    }
    document.body.innerHTML=window.Config._Loading;
    var url=window.Config._DataCenterUrl + 'CommMap/Bus.aspx?node='+window.Config._Node+'&l='+window.Config._L+'&v=1.0&req=2&s='+unescape(fnRequest('key'));
    ENetwork.DownloadScript(url,function(){fnBusStationShow();}); 
}
function fnBusStationShow(){
   if(sBusStationData!=null){
         var l=sBusStationData.Bus_BS_StationName_Js.length;
         var s='';
         for(i=0;i<l;i++){
            s=s+'<div class="action" onclick="fnShow(\'LinInfo'+i+'\');"><div class="h"><div class="imgs"></div><a>'+sBusStationData.Bus_BS_StationName_Js[i]+'</a></div></div><div id="LinInfo'+i+'" class="info" style="display:none;">{$list}</div>';
            var sl=sBusStationData.Bus_BN_BusName_Js[i].length;
            var ss='';
            for(j=0;j<sl;j++){
                ss+='<div onclick="parent.ResultControlForm.BusIDSearch('+sBusStationData.Bus_BN_ID_Js[i][j]+',\''+sBusStationData.Bus_BN_BusName_Js[i][j]+'\');">'+sBusStationData.Bus_BN_BusName_Js[i][j]+'</div>';
                
            }
            s=s.replace('{$list}',ss);
         }
         var _BusStation = '<div class="busstation"><div class="title">there are <span>{$No}</span> results searched of "<span>{$Key}</span>"</div>{$Blist}</div>';
        document.body.innerHTML=_BusStation.replace('{$Blist}',s).replace('{$No}',l).replace('{$Key}',unescape(fnRequest('key')));
     }
     else{
           document.body.innerHTML='no corresponding datas';
           return false;
    }        
}
function fnShow(o){
    if($(o).style.display=='none'){
        $(o).style.display='block';
    }else{
        $(o).style.display='none';
    }
}