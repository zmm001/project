var _BusNumberData = []; //单条线路的数据 数组的数组
var _IsUpOrDown;
var _CurrentIndex = 0;
var _CurrentBusStation = '';
var _IsBusLineFirstPositioned = [];     //标记公交线路是否被定位过
window.onload = fnOnload;
function fnOnload()
{
    if (!window.Config)
    {
        setTimeout('fnOnload()', 200);
        return;
    }
    $('TabContent').innerHTML = window.Config.Loading;
    if(fnRequest('action')==1){     //action 1:是不是通过线路id查询的数据
        
        if(fnRequest('stationName')!='')
        {
            _CurrentBusStation = unescape(fnRequest('stationName'));
        }
        var url=window.Config.EDataCenterUrl + 'CommMap5.0/Bus.aspx?domain='+window.Config.Domain+'&l='+window.Config.Language+'&req=4&id='+unescape(fnRequest('key'));
        ENetwork.DownloadScript(url,function(){if(typeof _BusRoute != 'undefined'){_BusNumberData[0] = _BusRoute;fnShowInfo(0);}});
    }else{
        var url=window.Config.EDataCenterUrl + 'CommMap5.0/Bus.aspx?domain='+window.Config.Domain+'&l='+window.Config.Language+'&req=1&busnum='+unescape(fnRequest('key'));
        ENetwork.DownloadScript(url,function(){fnBusStationShow();});
    }
}
function fnBusStationShow(){
    var sBusNo = '共有<strong>{$No}</strong>项符合<strong>{$Key}路</strong>的查询结果{$NoList}';
    var r='';
    if(typeof _Bus != 'undefined')
    { 
        var len = _Bus.length; 
        var Td_Temp = '';
        for(i=0;i<len;i++)
        {
            r+='<div id="NoList'+i+'" class="EachRow" onclick="fnLoadData('+i+','+_Bus[i].VehicleID+');"><div id="BusLineName'+i+'" class="BusLineNormal"><strong>'+_Bus[i].VehicleName+'</strong> &nbsp;&nbsp;'+_Bus[i].StartStation+'-'+_Bus[i].EndStation+'</div><div class="DottedLine"></div></div><div style="display:none" id="NoInfo'+i+'"></div>';
        }
    }else{
        $('TabContent').innerHTML = '没有相关数据';
       return false;
    }
    $('TabContent').innerHTML = sBusNo.replace('{$No}', _Bus.length).replace('{$Key}', unescape(fnRequest('key'))).replace('{$NoList}', r);
    fnResize();
    r=null;
}
function fnLoadData(i,busid){
    if($('NoInfo'+i).style.display=='block'){
        $('NoInfo'+i).style.display='none';
        $('BusLineName'+i).className='BusLineNormal';
        parent.fnShowBusStationIco(null,0);        
    }else{
        if($('NoInfo'+i).innerHTML=='')
        {
            $('NoInfo'+i).innerHTML=window.Config.Loading;
            var url=window.Config.EDataCenterUrl + 'CommMap5.0/Bus.aspx?domain='+window.Config.Domain+'&l='+window.Config.Language+'&req=4&id='+busid;
            ENetwork.DownloadScript(url,function(){_BusNumberData[i] = _BusRoute; fnShowInfo(i);});
        }
        else
        {
            _CurrentIndex = i;
            parent.fnShowBusStationIco(_BusNumberData[i],_IsUpOrDown);
        }        
        $('BusLineName'+i).className='BusLineActive';
        $('NoInfo'+i).style.display='block';        
    }
}
function fnShowInfo(i){
    _CurrentIndex = i;
    if(fnRequest('action')==1){
        $('TabContent').innerHTML = '<div id="NoList0" class="EachRow"><div class="BusLineActive"><strong>' + _BusNumberData[i].LineInfo[0].VehicleName + '</strong> &nbsp;&nbsp;' + _BusNumberData[i].LineInfo[0].StartStation + '-' + _BusNumberData[i].LineInfo[0].EndStation + '</div><div class="DottedLine"></div></div><div id="NoInfo0" style="display:block"></div>';
        fnResize();
    }
    var sBusNoInfo = '<ul class="Info"><li id="Cost{$i}">价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格：<strong>{$Cost}</strong></li><li id="Card{$i}">可用IC卡：<strong>{$Card}</strong></li><li id="OperatingTime{$i}">服务时间：<strong>{$OperatingTime}</strong></li></ul><div class="NameHead">'
                    +'<div id="Tz{$i}" class="ActionLeft" onclick="fnReverse({$i},1);">上 行</div>'
                    +'<div id="Tf{$i}" class="UnActionRight" onclick="fnReverse({$i},0);">下 行</div></div>'
                    +'<div class="BusShow"><div id="Time{$i}" class="BusRemark"><p>首班：<span id="StartTime{$i}"></span>&nbsp;&nbsp; 末班：<span id="EndTime{$i}"></span></p><p id="startToEnd{$i}"></p><p><img src="/Images/CopyBusLineToFri.gif" alt="复制公交线路给好友"  onclick="parent.fnCopyToClipboard(\'{$BusLineURL}\',\'复制好了，发给我的QQ/MSN好友分享吧！\');" style="cursor:pointer;" /></p></div><ul id="lininfo{$i}" class="BusName"></ul></div>';
    $('NoInfo'+i).innerHTML=sBusNoInfo.replaceAll('{$i}',i).replace('{$BusLineURL}','http://' + window.Config.Domain + '/?bname='+escape(_BusNumberData[i].LineInfo[0].VehicleName)+'&bid='+_BusNumberData[i].LineInfo[0].VehicleID);
    $('Cost'+i).innerHTML=$('Cost'+i).innerHTML.replace('{$Cost}',_BusNumberData[i].LineInfo[0].BusPrice);
    $('Card'+i).innerHTML=$('Card'+i).innerHTML.replace('{$Card}',_BusNumberData[i].LineInfo[0].BusCards);
    $('OperatingTime'+i).innerHTML=$('OperatingTime'+i).innerHTML.replace('{$OperatingTime}',_BusNumberData[i].LineInfo[0].OperatingTime);
    fnReverse(i,1);
}
function fnReverse(no,k){
    _IsUpOrDown = k;
    var info='';
    var stime='',etime='',time;        
    if(k==1){
        $('Tz'+no).className='ActionLeft';
        $('Tf'+no).className='UnActionRight';
        for(i=0;i<_BusNumberData[no].BusUp.length;i++){
            var oBusUp = _BusNumberData[no].BusUp[i];
            if(i == 0 && !_IsBusLineFirstPositioned[_BusNumberData[no].LineInfo[0].VehicleID] && _CurrentBusStation == '')
            {
                _IsBusLineFirstPositioned[_BusNumberData[no].LineInfo[0].VehicleID] = true;
                parent.fnGotoBusStation(oBusUp.StationID,oBusUp.StationName,oBusUp.PositionX,oBusUp.PositionY); 
            }
            if (oBusUp.PositionX == 0 && oBusUp.PositionY == 0)
            {
                if(_CurrentBusStation == oBusUp.StationName)
                {                    
                    info+= ' <li style="background-color:#f6f6f6">'+(i+1)+'.<span>'+oBusUp.StationName+'</span></li>';
                }
                else
                {
                    info+= ' <li>'+(i+1)+'.<span>'+oBusUp.StationName+'</span></li>';
                }
            }
            else
            {
                if(_CurrentBusStation == oBusUp.StationName)
                { 
                    info+= ' <li style="background-color:#f6f6f6; color:#FF6400">'+(i+1)+'.<span style="color:#FF6400" onclick="parent.fnGotoBusStation('+oBusUp.StationID+',\''+oBusUp.StationName+'\','+oBusUp.PositionX+','+oBusUp.PositionY+');">'+oBusUp.StationName+'&nbsp;<img src="/Images/GoToIco.gif" alt="定位公交站点" style="cursor:pointer;" onclick="parent.fnGotoBusStation('+oBusUp.StationID+',\''+oBusUp.StationName+'\','+oBusUp.PositionX+','+oBusUp.PositionY+');" /></span></li>';
                }
                else
                {
                    info+= ' <li>'+(i+1)+'.<span onclick="parent.fnGotoBusStation('+oBusUp.StationID+',\''+oBusUp.StationName+'\','+oBusUp.PositionX+','+oBusUp.PositionY+');">'+oBusUp.StationName+'&nbsp;<img src="/Images/GoToIco.gif" alt="定位公交站点" style="cursor:pointer;" onclick="parent.fnGotoBusStation('+oBusUp.StationID+',\''+oBusUp.StationName+'\','+oBusUp.PositionX+','+oBusUp.PositionY+');" /></span></li>';
                }
            }
            
        }
        stime=_BusNumberData[no].LineInfo[0].UpStartTime;
        etime=_BusNumberData[no].LineInfo[0].UpEndTime;
        $('startToEnd'+no).innerHTML = _BusNumberData[no].BusUp[0].StationName+'-'+_BusNumberData[no].BusUp[_BusNumberData[no].BusUp.length-1].StationName;
    }else{
        $('Tz'+no).className='UnActionLeft';
        $('Tf'+no).className='ActionRight';
        for(i=0;i<_BusNumberData[no].BusDown.length;i++){
            var oBusDown = _BusNumberData[no].BusDown[i];
            if (oBusDown.PositionX == 0 && oBusDown.PositionY == 0)
            {
                if(_CurrentBusStation == oBusDown.StationName)
                {                    
                    info+= ' <li style="background-color:#f6f6f6">'+(i+1)+'.<span>'+oBusDown.StationName+'</span></li>';
                }
                else
                {
                    info+= ' <li>'+(i+1)+'.<span>'+oBusDown.StationName+'</span></li>';
                }
            }
            else
            {
                if(_CurrentBusStation == oBusDown.StationName)
                {
                    info+= ' <li style="background-color:#f6f6f6;color:#FF6400">'+(i+1)+'.<span style="color:#FF6400" onclick="parent.fnGotoBusStation('+oBusDown.StationID+',\''+oBusDown.StationName+'\','+oBusDown.PositionX+','+oBusDown.PositionY+');">'+oBusDown.StationName+'&nbsp;<img src="/Images/GoToIco.gif" alt="定位公交站点" style="cursor:pointer;" onclick="parent.fnGotoBusStation('+oBusDown.StationID+',\''+oBusDown.StationName+'\','+oBusDown.PositionX+','+oBusDown.PositionY+');" /></span></li>';
                }
                else
                {
                    info+= ' <li>'+(i+1)+'.<span onclick="parent.fnGotoBusStation('+oBusDown.StationID+',\''+oBusDown.StationName+'\','+oBusDown.PositionX+','+oBusDown.PositionY+');">'+oBusDown.StationName+'&nbsp;<img src="/Images/GoToIco.gif" alt="定位公交站点" style="cursor:pointer;" onclick="parent.fnGotoBusStation('+oBusDown.StationID+',\''+oBusDown.StationName+'\','+oBusDown.PositionX+','+oBusDown.PositionY+');" /></span></li>';
                }
            }
        }
        stime=_BusNumberData[no].LineInfo[0].DownStartTime;
        etime=_BusNumberData[no].LineInfo[0].DownEndTime;
        $('startToEnd'+no).innerHTML = _BusNumberData[no].BusDown[0].StationName+'-'+_BusNumberData[no].BusDown[_BusNumberData[no].BusDown.length-1].StationName;
    }
    $('lininfo'+no).innerHTML=info;
    $('StartTime'+no).innerHTML=stime;
    $('EndTime'+no).innerHTML = etime;   
    info=null;
    parent.__IsDrawBusLineState = true;
    parent.fnShowBusStationIco(_BusNumberData[no], k);
}
function fnActive(){  
    if(typeof _BusNumberData[_CurrentIndex] != 'undefined' && _BusNumberData[_CurrentIndex].LineInfo.length > 0)
    {
        
        parent.__IsDrawBusLineState = true;
        parent.fnShowBusStationIco(_BusNumberData[_CurrentIndex],_IsUpOrDown);
    }
    else
    {
        parent.__IsDrawBusLineState = false;
        parent.fnShowBusStationIco(null,0);
    }
}
function fnExit()
{
    parent.__IsDrawBusLineState = false;
    parent.fnShowBusStationIco(null,0);
}

//初始化高度
function fnResize() {
    $('TabContent').style.height = fnGetWindowHeight() - 3 + 'px';
}
