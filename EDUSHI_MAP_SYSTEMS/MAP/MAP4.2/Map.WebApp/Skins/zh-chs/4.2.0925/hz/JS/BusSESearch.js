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
        url=window.Config._DataCenterUrl + 'CommMap/Bus.aspx?node='+window.Config._Node+'&l='+window.Config._L+'&v=1.0&req=3&s1='+fnRequest('s')+'&s2='+fnRequest('e');
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
        var _BusSE = '<div class="se"><div class="title">你输入关键字包含多个可选站点，请在下面选择最确切的站点进行查找</div><div>从<span>{$start}</span></div>'
                    +'<div><select id="start">{$ostart}</select></div><div>到<span>{$end}</span></div>'
                    +'<div><select id="end">{$oend}</select></div><div class="btn" onclick="fnLoadInfo();"></div></div>';
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