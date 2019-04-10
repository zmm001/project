var isPandN=new Array();
var arrBusData = new Array();
var index = 0;
window.onload = fnOnload;
function fnOnload()
{
    if (!window.Config)
    {
        setTimeout('fnOnload()', 200);
        return;
    }
    if(fnRequest('action')==1){     //action 1:是不是通过线路id查询的数据
        document.body.innerHTML=window.Config._Loading;
        var url=window.Config._DataCenterUrl + 'CommMap/Bus.aspx?node='+window.Config._Node+'&l='+window.Config._L+'&v=1.0&req=5&busId='+unescape(fnRequest('key'));
        ENetwork.DownloadScript(url,function(){arrBusData[0] = sBusNumberData;index=0;fnShowInfo(0);});
    }else{
        document.body.innerHTML=window.Config._Loading;
        var url=window.Config._DataCenterUrl + 'CommMap/Bus.aspx?node='+window.Config._Node+'&l='+window.Config._L+'&v=1.0&req=1&busnum='+unescape(fnRequest('key'));
        ENetwork.DownloadScript(url,function(){fnBusStationShow();});
    }
}
function fnBusStationShow(){
    var _BusNo = '<div class="Bus"><div class="Title">共有<font>{$No}</font>项符合<font>{$Key}路</font>的查询结果</div>{$NoList}</div>';
    var r='';
    if(typeof sBusNumberDataList != 'undefined')
    { 
        var len = sBusNumberDataList.Bus_BN_BusName_Js.length; 
        var Td_Temp = '';
        for(i=0;i<len;i++)
        {
            r+='<div id="NoList'+i+'" class="BusLineNormal" onclick="fnLoadData('+i+','+sBusNumberDataList.Bus_BN_ID_Js[i]+');"><font>'+sBusNumberDataList.Bus_BN_BusName_Js[i]+'</font> &nbsp;&nbsp;&nbsp;'+sBusNumberDataList.Bus_BN_StartBusStation[i]+'-'+sBusNumberDataList.Bus_BN_EndBusStation[i]+'</div><div style="display:none" id="NoInfo'+i+'"></div>';
        }
    }else{
       document.body.innerHTML='没有相关数据';
       return false;
    }        
    document.body.innerHTML=_BusNo.replace('{$No}',sBusNumberDataList.Bus_BN_BusName_Js.length).replace('{$Key}',unescape(fnRequest('key'))).replace('{$NoList}',r);
    r=null;
}
function fnLoadData(i,busid){
    if($('NoInfo'+i).style.display=='block'){
        $('NoInfo'+i).style.display='none';
        $('NoList'+i).className='BusLineNormal';
        parent.ResultControlForm._busDataLoad(null,0);
    }else{
        if($('NoInfo'+i).innerHTML=='')
        {
            $('NoInfo'+i).innerHTML=window.Config._Loading;
            var url=window.Config._DataCenterUrl + 'CommMap/Bus.aspx?node='+window.Config._Node+'&l='+window.Config._L+'&v=1.0&req=5&busId='+busid;
            ENetwork.DownloadScript(url,function(){arrBusData[i] = sBusNumberData; index=i;fnShowInfo(i);});
        }
        else
        {
            parent.ResultControlForm._busDataLoad(arrBusData[i],isPandN[i]);
        }
        $('NoList'+i).className='BusLineActive';
        $('NoInfo'+i).style.display='block';
    }
}
function fnShowInfo(i){
    sBusNumberData = arrBusData[i];
    if(fnRequest('action')==1){
        document.body.innerHTML='<div class="Bus"><div id="NoList0" class="BusLineActive"><font>'+sBusNumberData.Bus_BN_BusName_Js[0]+'</font> &nbsp;&nbsp;&nbsp;'+sBusNumberData.Bus_BN_UpEndStation_Js[0].split('-')[0]+'-'+sBusNumberData.Bus_BN_UpEndStation_Js[0].split('-')[1]+'</div><div id="NoInfo0" style="display:block"></div></div>';
    }
    var _BusNoInfo = '<ul class="Info"><li id="Cost{$i}"><span>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格：</span>{$Cost}</li><li id="Card{$i}"><span>可用IC卡：</span>{$Card}</li><li id="OperatingTime{$i}"><span>服务时间：</span>{$OperatingTime}</li></ul><div class="NameHead">'
                    +'<div id="Tz{$i}" class="ActionLeft" onclick="fnFan({$i},1);"><span title="{$Start}">{$Start}</span><span><img src="'+window.Config._ImgPath+'bus04.gif"></span><span title="{$End}">{$End}</span></div>'
                    +'<div id="Tf{$i}" class="UnActionRight" onclick="fnFan({$i},0);">反向</div></div>'
                    +'<div class="BusShow"><div id="Time{$i}" class="Time">首班：{$Stime}&nbsp;&nbsp; 末班：{$Etime}</div><ul id="lininfo{$i}" class="BusName"></ul></div>'
    $('NoInfo'+i).innerHTML=_BusNoInfo.replaceAll('{$i}',i);
    $('Cost'+i).innerHTML=$('Cost'+i).innerHTML.replace('{$Cost}',sBusNumberData.Bus_BN_Cost_Js[0]);
    $('Card'+i).innerHTML=$('Card'+i).innerHTML.replace('{$Card}',sBusNumberData.Bus_BN_Cards_Js[0]);
    $('OperatingTime'+i).innerHTML=$('OperatingTime'+i).innerHTML.replace('{$OperatingTime}',sBusNumberData.Bus_BN_OperatingTime_Js[0]);
    $('Tz'+i).innerHTML=$('Tz'+i).innerHTML.replaceAll('{$Start}',sBusNumberData.Bus_BN_UpEndStation_Js[0].split("-")[0]).replaceAll('{$End}',sBusNumberData.Bus_BN_UpEndStation_Js[0].split("-")[1]);
    fnFan(i,1);
}
function fnFan(no,k){
    var info='';
    sBusNumberData = arrBusData[no];
    isPandN[index]=k;
    var stime='',etime='',time;        
    if(k==1){
        $('Tz'+no).className='ActionLeft';
        $('Tf'+no).className='UnActionRight';
        for(i=0;i<sBusNumberData.Bus_BN_UP_BS_StationName_Js.length;i++){
            if (sBusNumberData.Bus_Bs_UpX_Js[i] == 0 && sBusNumberData.Bus_Bs_UpY_Js[i] == 0)
            {
                info+= ' <li>'+(i+1)+' <span style="color:#666;">'+sBusNumberData.Bus_BN_UP_BS_StationName_Js[i]+'</span></li>';
            }
            else
            {
                info+= ' <li>'+(i+1)+' <span onclick="parent.ResultControlForm._gotoXY('+sBusNumberData.Bus_Bs_UpX_Js[i]+','+sBusNumberData.Bus_Bs_UpY_Js[i]+');">'+sBusNumberData.Bus_BN_UP_BS_StationName_Js[i]+'</span></li>';
            }
            
        }
        time=sBusNumberData.Bus_BN_UpEndTime_Js[0].split("-");
        stime=time[0];
        etime=time[1];
    }else{
        $('Tz'+no).className='UnActionLeft';
        $('Tf'+no).className='ActionRight';
        for(i=0;i<sBusNumberData.Bus_BN_Down_BS_StationName_Js.length;i++){
            if (sBusNumberData.Bus_Bs_DownX_Js[i] == 0 && sBusNumberData.Bus_Bs_DownY_Js[i] == 0)
            {
                info+= ' <li>'+(i+1)+' <span style="color:#666;">'+sBusNumberData.Bus_BN_Down_BS_StationName_Js[i]+'</span></li>';
            }
            else
            {
                info+= ' <li>'+(i+1)+' <span onclick="parent.ResultControlForm._gotoXY('+sBusNumberData.Bus_Bs_DownX_Js[i]+','+sBusNumberData.Bus_Bs_DownY_Js[i]+');">'+sBusNumberData.Bus_BN_Down_BS_StationName_Js[i]+'</span></li>';
            }
        }
        time=sBusNumberData.Bus_BN_DownEndTime_Js[0].split('-');
        stime=time[0];
        etime=time[1];
    }
    $('lininfo'+no).innerHTML=info;
    $('Time'+no).innerHTML=$('Time'+no).innerHTML.replace('{$Stime}',stime).replace('{$Etime}',etime)
    info=null;
    
    parent.ResultControlForm._busDataLoad(sBusNumberData,isPandN[index]);
}
function fnInit(){
    if(typeof sBusNumberData != 'undefined' && sBusNumberData !=null)
    {
        parent.ResultControlForm._busDataLoad(sBusNumberData,isPandN[index]);
    }
    else
    {
        parent.ResultControlForm._busDataLoad(null,0);
    }
}
function fnExit()
{
    parent.ResultControlForm._busDataLoad(null,0);
}
