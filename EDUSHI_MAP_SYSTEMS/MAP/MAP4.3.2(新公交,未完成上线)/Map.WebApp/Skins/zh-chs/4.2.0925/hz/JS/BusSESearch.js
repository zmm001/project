var start='',end='';
window.onload=fnOnload;
function fnOnload()
{
    if (!window.Config)
    {
        setTimeout('fnOnload()', 200);
        return;
    }
    document.body.innerHTML=window.Config._Loading;
    var url;        
    if(fnRequest('action')==1){//从这里出发
        url=window.Config._DataCenterUrl + 'CommMap/Bus.aspx?node='+window.Config._Node+'&l='+window.Config._L+'&v=1.0&req=7&x='+fnRequest('x')+'&y='+fnRequest('y')+'&s='+unescape(fnRequest('key'));

    }else if(fnRequest('action')==2){//如何到达这里
        url=window.Config._DataCenterUrl + 'CommMap/Bus.aspx?node='+window.Config._Node+'&l='+window.Config._L+'&v=1.0&req=6&x='+fnRequest('x')+'&y='+fnRequest('y')+'&s='+unescape(fnRequest('key'));

    }else{//起终点
        //url=window.Config._DataCenterUrl + 'CommMap/Bus.aspx?node='+window.Config._Node+'&l='+window.Config._L+'&v=1.0&req=3&s1='+fnRequest('s')+'&s2='+fnRequest('e');
        fnLoadStationList();
        return;
    }
    ENetwork.DownloadScript(url,function(){fnShow();});
}
function fnShow(){
    var s='',e='',sl,el;
    if(typeof sStartAndEndData!='undefind'&&sStartAndEndData!=null){        
        sl=sStartAndEndData.Bus_BS_StartStationName_Js.length;
        el=sStartAndEndData.Bus_BS_EndStationName_Js.length;
        for(i=0;i<sl;i++){
            s+='<option value="'+sStartAndEndData.Bus_BS_StartStationId_Js[i]+'">'+sStartAndEndData.Bus_BS_StartStationName_Js[i]+'</option>';
        }
        for(j=0;j<el;j++){
            e+='<option value="'+sStartAndEndData.Bus_BS_EndStationId_Js[j]+'">'+sStartAndEndData.Bus_BS_EndStationName_Js[j]+'</option>';
        }
        if (sl == 0)
        {
            s = '<option value="">没有匹配到起始站点</option>';
        }
        if (el == 0)
        {
            e = '<option value="">没有匹配到目标站点</option>';
        }
        var _BusSE = '<div class="se"><div>请选择起点站</div>'
                    +'<div><select size="8" id="start">{$ostart}</select></div><div>请选择终点站</div>'
                    +'<div><select size="8" id="end">{$oend}</select></div><div class="btn" onclick="fnLoadInfo();"></div></div>';
        document.body.innerHTML=_BusSE.replace('{$start}',unescape(fnRequest('s'))).replace('{$end}',unescape(fnRequest('e'))).replace('{$ostart}',s).replace('{$oend}',e);
    }else{
        document.body.innerHTML="没有数据！";
    }
}
function fnLoadInfo(){
    for(i=0;i<$('start').options.length;i++){
        if($('start').options[i].selected == true){
	        start=$('start').options[i].innerHTML;
	        }
     }
     for(i=0;i<$('end').options.length;i++){
        if($('end').options[i].selected == true){
	        end=$('end').options[i].innerHTML;
	        }
     }
     if ($('start').value.length < 1)
     {
        alert('很抱歉,您还未指定起始站点,无法进行乘坐方案搜索.\r\n您可以尝试缩短关键字重新进行[两点搜索]');
        return;
     }
     if ($('end').value.length < 1)
     {
        alert('很抱歉,您还未指定目标站点,无法进行乘坐方案搜索.\r\n您可以尝试缩短关键字重新进行[两点搜索]');
        return;
     }
    var url=window.Config._DataCenterUrl + 'CommMap/Bus.aspx?node='+window.Config._Node+'&l='+window.Config._L+'&v=1.0&req=4&s1='+$('start').value+'&s2='+$('end').value;
    document.body.innerHTML=window.Config._Loading;
    ENetwork.DownloadScript(url,function(){fnShowInfo();});

}
function fnShowInfo(){
    var s='';
    if(sChangeRouteData==null){
        document.body.innerHTML='没有查询到相关乘车方案，<a style="cursor:pointer;" onclick="fnShow();">返回上一页</a>';
    }else{
        var l=sChangeRouteData.FirstBusName_Js.length;
        if(sChangeRouteData.Tag==1){
            for(i=0;i<l;i++){
                s+='<div class="xianlu"><div class="left" onclick="parent.ResultControlForm.BusIDSearch('+sChangeRouteData.FirstBusId_Js[i]+',\''+sChangeRouteData.FirstBusName_Js[i]+'\')"><strong>'+sChangeRouteData.FirstBusName_Js[i]+'</strong></div><div class="right">直达线路</div></div>';
            }
        }else{
            for(i=0;i<l;i++){
                s+='<div class="xianlu"><div class="left" style="cursor:default;">方案'+(i+1)+'：</div><div class="right">先乘<span>'+sChangeRouteData.FirstBusName_Js[i]+'</span>到<span>'+sChangeRouteData.Stationname_Js[i]+'</span>下车，再乘<span>'+sChangeRouteData.SecondBusName_Js[i]+'</span></div></div>'
            }
        }
        var _BusSEInfo = '<div class="jie"><div class="title">从<span>{$start}</span>到<span>{$end}</span>,您可以选择以下的乘车方案：</div>'
                        +'<div class="shuomimg"></div>{$info}<a style="cursor:pointer;margin-left:120px;" onclick="fnShow();">返回上一页</a></div>'
        document.body.innerHTML=_BusSEInfo.replace('{$info}',s).replace('{$start}',start).replace('{$end}',end);
    }
}


//新的公交搜索
function fnLoadStationList()
{
    var url=window.Config._EDataCenterUrl + 'BusTransfer/StationList.aspx?node='+window.Config._Node+'&l='+window.Config._L+'&Start=' + fnRequest('s') + '&End=' + fnRequest('e');
    ENetwork.DownloadScript(url,
        function(){
            var s='',e='';
            for(i=0;i<__StationStation.length;i++){
                var item = __StationStation[i];
                s+='<option id="' + item.ID + '" areaType="' + item.Type + '" x="' + item.PositionX + '" y="' + item.PositionY + '" value="' + item.Value + '" '+ (i == 0 ? 'selected' : '') + '>' + item.Title + '</option>';
            }
            for(j=0;j<__EndStation.length;j++){
                var item = __EndStation[j];
                e+='<option id="' + item.ID + '" areaType="' + item.Type + '" x="' + item.PositionX + '" y="' + item.PositionY + '" value="' + item.Value + '" '+ (j == 0 ? 'selected' : '') + '>' + item.Title + '</option>';
            }
            var _BusSE = '<div class="se"><div>请选择起点站</div>'
                    +'<div><select size="8" id="start">{$ostart}</select></div><div>请选择终点站</div>'
                    +'<div><select size="8" id="end">{$oend}</select></div><div class="btn" onclick="fnTransfer();"></div></div>';
            document.body.innerHTML=_BusSE.replace('{$ostart}',s).replace('{$oend}',e);
        }
     );
}

function fnTransfer()
{
    if ($('start').selectedIndex > -1 && $('end').selectedIndex > -1)
    {
        var sItem = $('start').options[$('start').selectedIndex];
        var eItem = $('end').options[$('end').selectedIndex];
        var url=window.Config._EDataCenterUrl + 'BusTransfer/Transfer.aspx?node='+window.Config._Node+'&l='+window.Config._L+'&StartId=' + sItem.id + '&StartName=' + escape(sItem.value) + '&StartType=' + sItem.areaType + '&StartX=' + sItem.x + '&StartY=' + sItem.y + '&EndId=' + eItem.id + '&EndName=' + escape(eItem.value) + '&EndType=' + eItem.areaType + '&EndX=' + eItem.x + '&EndY=' + eItem.y;
        ENetwork.DownloadScript(url,
            function(){
                var sHtml = '';
                for (var i=0; i<__TransferResult.length; i++)
                {
                    sHtml += fnShowTransferResult(__TransferResult[i], i+1);
                }
                document.body.innerHTML = '<ul id="ulResultList">' + sHtml + '</ul>';
            }
         );
     }
}
String.Format = function(){
    if (arguments.length < 1) return;
    var s = arguments[0];
    for (var i=1; i<arguments.length; i++)
    {
        s = s.replace(eval('/\\{' + (i-1) + '\\}/gi'), arguments[i]);
    }
    return s;
}

function fnShowTransferResult(result, index)
{
    var iWalkCount = 0;
    var title = "";
    var sa = "方案" + index;
    var sb = '<div id="' + result.ID + '" style="display:none">';
    if (result.FromArea != null && result.FromArea.Type == 'Building')
    {
        sb += String.Format("从<span class=\"Building\" onclick=\"ShowPointer({2}, {3}, true)\">{0}</span>出发，步行至<span class=\"Station\" onclick=\"ShowPointer({4}, {5}, true)\">{1}</span>，"
            , result.FromArea.Value
            , result.StartStation.StationName
            , result.FromArea.PositionX
            , result.FromArea.PositionY
            , result.StartStation.PositionX
            , result.StartStation.PositionY
            );
        iWalkCount++;
    }
    else
    {
        sb += String.Format("从<span class=\"Station\" onclick=\"ShowPointer({1}, {2}, true)\">{0}</span>出发，", result.StartStation.StationName, result.StartStation.PositionX, result.StartStation.PositionY);
    }
    
    for (var i=0; i<result.TransferNodeList.length; i++)
    {
        var node = result.TransferNodeList[i];
        if (node.NodeType == 'WalkTransfer')
        {
                sb += String.Format("步行至", parseInt(node.PassLength));
                if (node.FromStation.StationName == node.ToStation.StationName)
                {
                    sb += "对面街的";
                }
                sb += String.Format("<span class=\"Station\" onclick=\"ShowPointer({1}, {2}, true)\">{0}</span>，", node.ToStation.StationName, node.ToStation.PositionX, node.ToStation.PositionY);
                iWalkCount++;
        }
        else
        {
            if (node.FromStation.StationID != node.ToStation.StationID)
            {
                if (node.FromStation.StationID == result.StartStation.StationID)
                {
                    sb += "坐";
                }
                else
                {
                    sb += "换乘";
                }
                for (var j=0; j<node.PassVehicle.length; j++)
                {
                    var v = node.PassVehicle[j];
                    if (j==0)
                    {
                        title += v.VehicleName;
                    }
                    if (j > 0)
                    {
                        sb += "或";
                    }
                    sb += "<span class=\"Bus\">";
                    sb += v.VehicleName;
                    sb += "路</span>";
                }
                title += "→";
                if (node.NodeType == 'BusTransfer')
                {
                    sb += String.Format("，乘坐{0}站后在", node.PassStationCount);
                    sb += String.Format("<span class=\"Station\" onclick=\"ShowPointer({1}, {2}, true)\">{0}</span>", node.ToStation.StationName, node.ToStation.PositionX, node.ToStation.PositionY);
                    sb += "下车，";
                }
                else
                {
                    sb +="，直达";
                    sb += String.Format("<span class=\"Station\" onclick=\"ShowPointer({1}, {2}, true)\">{0}</span>", node.ToStation.StationName, node.ToStation.PositionX, node.ToStation.PositionY);
                    sb +="下车，";
                }
            }
        }
    }
    if (result.ToArea != null && result.ToArea.Type == 'Building')
    {
        sb += String.Format("步行至目的地<span class=\"Building\" onclick=\"ShowPointer({1}, {2}, true)\">{0}</span>，", result.ToArea.Value, result.ToArea.PositionX, result.ToArea.PositionY);
        iWalkCount++;
    }
    sb = sb.substr(0, sb.length-1);
    sb += "</div>";
    if (result.TransferNodeList.length == 1)
    {
        sa += "(直达):" + title.substr(0, title.length-1);
    }
    else
    {
        sa += "(换乘1次):" + title.substr(0, title.length-1);
    }
    sa = '<span id="title_' + result.ID + '" style="cursor:pointer;" onclick="fnDisplayResult(\'' + result.ID + '\')">' + sa + '</span>';
    return "<li>" + sa + sb + "</li>";
}

function fnDisplayResult(id)
{
    var result;
    for (var i=0; i<__TransferResult.length; i++)
    {
        if (__TransferResult[i].ID == id)
        {
            $('title_' + __TransferResult[i].ID).style.color = '#9e5500';
            $('title_' + __TransferResult[i].ID).style.fontWeight = 'bold';
            $(__TransferResult[i].ID).style.display = 'block';
            result = __TransferResult[i];
        }
        else
        {
            $('title_' + __TransferResult[i].ID).style.color = '#333';
            $('title_' + __TransferResult[i].ID).style.fontWeight = 'normal';
            $(__TransferResult[i].ID).style.display = 'none';
        }
    }
    
    var BusTransferColor = ['Blue', 'Red'];
    var iBusTransferIndex = 0;
    var CoordList = [];
    for (var i=0; i<result.TransferNodeList.length; i++)
    {
        var color;
        var coords = '';
        var passStation = [];
        var node = result.TransferNodeList[i];
        if (node.BestTrack.length > 0)
        {
            coords =  node.BestTrack;
        } 
        else
        {
            for (var j=0; j<node.BestVehiclePassStation.length; j++)
            {
                var s = node.BestVehiclePassStation[j];
                coords +=  s.PositionX + ',' + s.PositionY + ',';
            }
            coords = coords.substr(0, coords.length - 1);
        }
        if (node.NodeType == 'WalkTransfer')
        {
            color = 'Green';
        }
        else
        {
            color = BusTransferColor[iBusTransferIndex];
        }
        if (coords.length > 0)
        {
            CoordList[CoordList.length] = {Coords:coords, Color:color, Alpha:0.6, Size:4, PassStation:node.BestVehiclePassStation};
        }
        if (node.NodeType == 'BusTransfer' && node.FromStation.StationID != node.ToStation.StationID)
        {
            iBusTransferIndex++;
        }
    }
    //alert(result.TransferNodeList.length);
    
    if (result.FromArea != null && result.FromArea.Type == 'Building')
    {
        CoordList[CoordList.length] = {Coords:result.FromArea.PositionX + ',' + result.FromArea.PositionY + ',' + result.StartStation.PositionX + ',' + result.StartStation.PositionY, Color:'Yellow', Alpha:0.6, Size:3, PassStation:[]};
    }
    if (result.ToArea != null && result.ToArea.Type == 'Building')
    {
        CoordList[CoordList.length] = {Coords:result.StopStation.PositionX + ',' + result.StopStation.PositionY + ',' + result.ToArea.PositionX + ',' + result.ToArea.PositionY, Color:'Yellow', Alpha:0.6, Size:3, PassStation:[]};
    }
    parent.ResultControlForm.onDrawingBusLine(CoordList);
}

function ShowPointer(x, y)
{
    parent.parent.vM.MoveTo(x, y, true);
}