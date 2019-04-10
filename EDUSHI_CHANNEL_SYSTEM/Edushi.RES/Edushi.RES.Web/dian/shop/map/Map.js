var vM = null;
var _ZoomBar;

var _ShopCenterLayer;           //商埔中心
var _ShopPerimeterLayer;        //商埔周遍地图
var _BusStationPopLayer;           //公交站牌泡泡
var _BusTransferLineLayer;
var _BusStationLayer;

var _BusLineCoordList = [];        //公交线路坐标
var _BusLineData = null;           //公交站点数据
var _BusLineType = 0;              //线路正向还是反向

var _TransferLine;
var _StationLayer;
var _ConsultStationLayer;

var _CurrentEndStationTrack = null;
var _CurrentLinesTrack = [];

var _LnkLastStation = null;
var _LnkLastBusLine = null;
function OnBodyLoad() {
    //加载对象
    if (typeof vEdushiMap == 'undefined' || typeof vEdushiMap.NewMapLayer != 'function') {
        setTimeout("OnBodyLoad()", 200);
        return;
    }

    vM = vEdushiMap;

    _ShopCenterLayer = vM.NewMapLayer("_ShopCenterLayer", 298);
    _ShopPerimeterLayer = vM.NewMapLayer("_ShopPerimeterLayer", 297);
    _BusStationPopLayer = vM.NewMapLayer("_BusStationPopLayer", 299);
    _BusTransferLineLayer = vM.NewMapLayer("_BusTransferLineLayer", 300);
    _BusStationLayer = vM.NewMapLayer("_BusStationLayer", 301);
    _TransferLine = vM.NewMapLayer('TransferLine', 302);
    _StationLayer = vM.NewMapLayer('StationLayer', 303);
    _ConsultStationLayer = vM.NewMapLayer('StationLayer', 304);


    if (vM.Property.flgShowSogouMap) {
        vM.LoadPlug('SogouMap');
    }
    vM.ViewPlots(false);

    var MapCss = vEdushiMap.$C('link');
    MapCss.rel = 'stylesheet';
    MapCss.type = 'text/css';
    MapCss.href = 'http://res.edushi.com/dian/shop/map/BusPlatform.css';

    vM.ContentWindow.document.getElementsByTagName('head')[0].appendChild(MapCss);
    var MarkCss = vEdushiMap.$C('link');
    MarkCss.rel = 'stylesheet';
    MarkCss.type = 'text/css';
    MarkCss.href = 'http://res.edushi.com/dian/shop/map/ShopMap.css';
    vM.ContentWindow.document.getElementsByTagName('head')[0].appendChild(MarkCss);

    if (typeof _ShopMapList != 'undefined') {
        appendShopPerimeter("images/left3.png", _ShopMapList);
    }

    if (typeof _StoreCenterY != 'undefined') {
        vEdushiMap.MoveTo(_StoreCenterX * 1, _StoreCenterY * 1, true);
        appendShopCenter("images/left3.png", _StoreName, _StoreCenterX, _StoreCenterY);
    }



    vM.attachEvent(AlaMap.KeyWord.EventName.MapZoomChange, function(z) {

        fnShowBusStationIco(_BusLineData, _BusLineType);

        _TransferLine.innerHTML = '';
        if (_CurrentEndStationTrack != null) {
            DrawLine(_CurrentEndStationTrack.Track, _CurrentEndStationTrack.LineType);
        }
        if (_CurrentLinesTrack.length > 0) {
            for (var i = 0; i < _CurrentLinesTrack.length; i++) {
                if (_CurrentLinesTrack[i].Track.length > 0) {
                    DrawLine(_CurrentLinesTrack[i].Track, _CurrentLinesTrack[i].LineType);
                }
            }
        }
    });
    vM.attachEvent(AlaMap.KeyWord.EventName.MapMoveEnd, function(x, y, flg) {
        if (vM.MapState != 0) {
            fnShowBusStationIco(_BusLineData, _BusLineType);
            _TransferLine.innerHTML = '';
            if (_CurrentEndStationTrack != null) {
                DrawLine(_CurrentEndStationTrack.Track, _CurrentEndStationTrack.LineType);
            }
            if (_CurrentLinesTrack.length > 0) {
                for (var i = 0; i < _CurrentLinesTrack.length; i++) {
                    if (_CurrentLinesTrack[i].Track.length > 0) {
                        DrawLine(_CurrentLinesTrack[i].Track, _CurrentLinesTrack[i].LineType);
                    }
                }
            }
        }

    });
    vM.attachEvent(AlaMap.KeyWord.EventName.Switch3D, function() {
        fnInitDelay();
        document.getElementById("CompassImg").src = "http://res.edushi.com/dian/shop/Images/CompassIco.gif";
    });
    vM.attachEvent(AlaMap.KeyWord.EventName.Switch2D, function() {
        fnInitDelay();
        document.getElementById("CompassImg").src = "http://res.edushi.com/dian/shop/Images/CompassIco1.gif";
    });
    vM.attachEvent(AlaMap.KeyWord.EventName.SwitchWX, function() {
        fnInitDelay();
        document.getElementById("CompassImg").src = "http://res.edushi.com/dian/shop/Images/CompassIco1.gif";
    });
}
function fnInitDelay() {
    if (vM.MapState.Succeed) {//判断google地图是否加载成功
        setTimeout(function() {
//            fnShowBusStationIco(_BusLineData, _BusLineType);
//            _TransferLine.innerHTML = '';
//            if (_CurrentEndStationTrack != null) {
//                DrawLine(_CurrentEndStationTrack.Track, _CurrentEndStationTrack.LineType);
//            }
//            if (_CurrentLinesTrack.length > 0) {
//                for (var i = 0; i < _CurrentLinesTrack.length; i++) {
//                    if (_CurrentLinesTrack[i].Track.length > 0) {
//                        DrawLine(_CurrentLinesTrack[i].Track, _CurrentLinesTrack[i].LineType);
//                    }
//                }
//            }
        vM.MoveTo(vM.CenterX() + 1, vM.CenterY());

        }, 100);
    }
    else {
        setTimeout("fnInitDelay()", 300);
        return;
    }
}
function fnShowPerimeter(x, y)
{
    if(vM != null)
    {
        vM.MoveTo(x*1+150, y*1, true);
    }
}
function fnShowBusStationPop(x,y,stationName,BusLineList)
{
    _BusStationPopLayer.innerHTML = '';
    var sBusLineHtml = ''
    for (var k=0; k<BusLineList.length; k++){
        sBusLineHtml += '<li><a href="javascript:;" onclick="parent.fnShowBusLine('+ BusLineList[k].VehicleID +')">' + BusLineList[k].VehicleName + '</a></li>';
    }    
    if(sBusLineHtml == '')
    {
        sBusLineHtml='<li style="width:100%">很抱歉，该站点公交数据正在完善中</li>';
    }
    var busStationPopHtml = '<div class="BusPlatformNav"><div class="PinIco"></div><div class="PlatformCon"><div class="PlatformConBg"></div><div class="PlatformDetCon"><h3 id="divStationName">'+stationName+'</h3><div class="AutoText"><ul id="divBusList">'+sBusLineHtml+'</ul></div></div><div class="CloseWin" onmouseover="this.className=\'CloseBtnOver\'" onmouseout="this.className=\'CloseBtnOut\'" onclick="_BusStationPopLayer.innerHTML = \'\';" title="关闭窗口"></div></div></div>';
    var oDiv = vM.$C('div');
    oDiv.innerHTML = busStationPopHtml;
    vM.AppendEntity(oDiv, _BusStationPopLayer, false, x, y, 303, 170, 0, 38, false);
}
function fnShowBusLine(id, oThis) {
    if (_LnkLastBusLine != null) {
        _LnkLastBusLine.className = '';
    }
    if (oThis) {
        oThis.className = 'ty12b';
        _LnkLastBusLine = oThis;
    }
    //var sUrl = _EDataCenterUrl + 'CommMap5.0/bus.aspx?domain=' + _Domain + '&l=' + _Language + '&req=4&id=' + id;
    var sUrl = _EDataSearchUrl + 'SearchBusLine/' + _CityCode + '/' + _Language + '/Format/Json/Search?q=' + id;
    ENetwork.DownloadScript(sUrl,function(){
        if(typeof _BusRoute !='undefined'){
            fnShowBusStationIco(_BusRoute, 0);
        }
    }) 
}
//加载完线路显示公交站
function fnShowBusStationIco(arrBusData, type){
    _BusLineType = type;
    _BusLineData = arrBusData;
    _BusTransferLineLayer.innerHTML='';
    _BusStationLayer.innerHTML = '';
    if(_BusLineData!=null)
    {
        var PopHtml = '<span style="cursor:pointer; height:26px; float:left; font-size:12px; color:#000;white-space:nowrap;{$topwidth}"><span style="cursor:pointer; width:24px; height:24px; float:left; background:url(http://res.edushi.com/dian/shop/Images/gongjiao.gif) no-repeat; text-align:center; padding-top:2px;">{$No}</span><span style="cursor:pointer; height:19px;line-height:19px; background:#fff; padding-right:4px; float:left;{$width};" onclick="parent.fnShowBusStation({$X},{$Y},\'{$BusStationName}\',{$StationID})">{$BusStationName}</span></span>';
        if(_BusLineType==1){
            var l=_BusLineData.BusUp.length;         
            for(i=0;i<l;i++){
                var oBusUp = _BusLineData.BusUp[i];
                var vlen = oBusUp.StationName.length*12.1;
                var nd = vM.$C('div');
                nd.id='B_pop'+i;
                nd.innerHTML=PopHtml.replace('{$No}',(i+1)).replaceAll('{$BusStationName}',oBusUp.StationName).replace('{$topwidth}','width:'+(vlen+40)+'px').replace('{$width}','width:'+(vlen+10)+'px').replace('{$StationID}',oBusUp.StationID).replace('{$X}',oBusUp.PositionX).replace('{$Y}',oBusUp.PositionY);
                vM.AppendEntity(nd, _BusTransferLineLayer, false, oBusUp.PositionX,oBusUp.PositionY,vlen+35,26,12,28, false);
            }
            if(_BusLineData.UpCoord.length > 0)
            {
                vM.DrawPolyLine(_BusTransferLineLayer, _BusLineData.UpCoord, 4, '#ffff00', 0.7);
            }
        }else{
            var l=_BusLineData.BusDown.length;
            var coords;            
            for(i=0;i<l;i++){
                var oBusDown = _BusLineData.BusDown[i];
                coords +=  oBusDown.PositionX + ',' + oBusDown.PositionY + ',';
                var vlen = oBusDown.StationName.length*12.1;
                var nd = vM.$C('div');
                nd.id='B_pop'+i;
                nd.innerHTML=PopHtml.replace('{$No}',(i+1)).replaceAll('{$BusStationName}',oBusDown.StationName).replace('{$topwidth}','width:'+(vlen+40)+'px').replace('{$width}','width:'+(vlen+10)+'px').replace('{$StationID}',oBusDown.StationID).replace('{$X}',oBusDown.PositionX).replace('{$Y}',oBusDown.PositionY);
                vM.AppendEntity(nd, _BusTransferLineLayer, false, oBusDown.PositionX,oBusDown.PositionY,vlen+35,26,12,28, false);
            }
            if(_BusLineData.DownCoord.length > 0)
            {
                vM.DrawPolyLine(_BusTransferLineLayer, _BusLineData.DownCoord, 4, '#ffff00', 0.7);
            }          
        }
    }
}
function fnShowBusStation(x,y,stationName,id) {
    if (_LnkLastStation != null) {
        _LnkLastStation.className = 'ty12b';
    }
    var _e = $('lnkStation' + id)
    if(_e!=null){
        _e.className = 'ty12b_on';
    }
    
    _LnkLastStation = $('lnkStation' + id);
    vM.MoveTo(x,y,true);
    var vlen = stationName.length*12.1;
    var PopHtml = '<span style="cursor:pointer; height:26px; float:left; font-size:12px; color:#000;white-space:nowrap;width:' + (vlen + 40) + 'px;"><span style="cursor:pointer; width:24px; height:24px; float:left; background:url(http://res.edushi.com/dian/shop/Images/gongjiao.gif) no-repeat; text-align:center; padding-top:2px;">1</span><span style="cursor:pointer; height:19px;line-height:19px; background:#fff; padding-right:4px; float:left;width:' + (vlen + 10) + 'px;" onclick="parent.fnShowBusStation(' + x + ',' + y + ',\'' + stationName + '\',' + id + ')">' + stationName + '</span></span>';

    //var sUrl = _EDataCenterUrl + 'CommMap5.0/bus.aspx?domain='+_Domain+'&l='+_Language+'&req=8&stationid='+id;
    var sUrl = _EDataSearchUrl + 'SearchBusStation/' + _CityCode + '/' + _Language + '/Format/Json/Search?q=' + id;
    
    ENetwork.DownloadScript(sUrl,function(){
        if(typeof _BusLineList !='undefined'){
            fnShowBusStationPop(x,y,stationName,_BusLineList);
        }
        else
        {
            fnShowBusStationPop(x,y,stationName,[]);
        }
        var nd = vM.$C('div');
        nd.innerHTML=PopHtml
        vM.AppendEntity(nd, _BusStationPopLayer, false, x,y,vlen+35,26,12,28, false);
    })
}
function fnShowRouteLine(ltc_id, lts_id)
{
    _ConsultStationLayer.innerHTML ='';
    _StationLayer.innerHTML ='';
    _TransferLine.innerHTML ='';
    var sUrl = 'Map.aspx?action=getlinetrack&storeID=' + _StoreID + '&ltc_id=' + ltc_id + '&lts_id=' + lts_id + '&rnd=' + ENetwork.GetExecutionID();
    
    ENetwork.DownloadScript(sUrl, function() {
        if (typeof __Consult != 'undefined') {
            AppendConsultStation(__Consult.LTC_StartX, __Consult.LTC_StartY, __Consult.LTC_Start, __Consult.LTC_EndX, __Consult.LTC_EndY, __Consult.LTC_End, 0);
        }
        if (typeof __EndLineTrack != 'undefined') {
            if (__EndLineTrack.Track.length > 0) {
                _CurrentEndStationTrack = __EndLineTrack;
                DrawLine(__EndLineTrack.Track, __EndLineTrack.LineType);
            }
        }
        if (typeof __LinesTrack != 'undefined' && __LinesTrack.length > 0) {
            _CurrentLinesTrack = __LinesTrack;
            for (var i = 0; i < __LinesTrack.length; i++) {
                AppendTransfer(__LinesTrack[i].TransferX, __LinesTrack[i].TransferY, __LinesTrack[i].TransferName);
                if (__LinesTrack[i].Track.length > 0) {
                    DrawLine(__LinesTrack[i].Track, __LinesTrack[i].LineType);
                }
            }
        }
    })
}
function fnGetColor(linetye)
{
    switch(linetye)
    {
        case '':
        case '0':
            return '#00ffff';
        case '1':
            return '#00ff00';
        case '2':
            return '#ff0000';      
        case '3':
            return '#ff6600';              
        default:
            return '#ffff00';                    
    }
}
function DrawLine(coords,type)
{
    vM.DrawPolyLine(_TransferLine, coords, 4, fnGetColor(type), 0.7);
}
function AppendConsultStation(sx,sy,sname,ex,ey,ename,type)
{
    if(type==1)
    {
        vM.MoveTo(ex*1, ey*1, true);
    }
    else
    {
        vM.MoveTo(sx*1, sy*1, true);
    }
    var divStartStation = vM.$C('div');
    divStartStation.className = 'ShopCenter';
    divStartStation.id = '_Station'+sx+sy;   
    divStartStation.innerHTML =  '<div><div class="eshop_mark"><div class="eshop_mark_bg">'+sname+'</div><div class="eshop_mark_bottom"></div></div></div>';
    vM.AppendEntity(divStartStation, _ConsultStationLayer, false, sx, sy, 233, 50, 57, 33, false);
    var divEndStation = vM.$C('div');
    divEndStation.className = 'ShopCenter';
    divEndStation.id = '_Station'+ex+ey;   
    divEndStation.innerHTML =  '<div><div class="eshop_mark"><div class="eshop_mark_bg">'+ename+'</div><div class="eshop_mark_bottom"></div></div></div>';
    vM.AppendEntity(divEndStation, _ConsultStationLayer, false, ex, ey, 233, 50, 57, 33, false);
}
function AppendTransfer(x, y, transferName)
{
    if(!vM.$('_Transfer'+x+y))
    {
        var divTransfer = vEdushiMap.$C('div');
        divTransfer.className = 'ShopMap';
        divTransfer.id = '__Transfer'+x+y;   
        divTransfer.innerHTML =  '<div><div class="side_shop"><span>' + transferName + '</span></div><div class="side_shop_bottom"></div></div>';
        vM.AppendEntity(divTransfer, _StationLayer, false, x, y, 233, 50, 57, 33, true);
    }    
}
function appendShopPerimeter(iconPath, shopPerimeterList)
{
    var shopName = '';
    for (var i=0; i<shopPerimeterList.length; i++)
    {
        var showNearShop = vEdushiMap.$C('div');
        showNearShop.id = '_NearByShop_'+shopPerimeterList[i].ShopMapID;
        var sDiv = '';

        shopName = shopPerimeterList[i].MapTitle;

        sDiv = '<div><div style="float:left;min-width:100px;width:auto;_width:100px;_white-space:nowrap;border:1px solid #75b6fd; background-color:#f6fafd;"><span style="color:#1562ef; font-size:12px; padding:4px 4px 0px 4px;display:block; text-align:center;">' + shopName + '</span></div><div style="clear:both;margin-left:50px;width:14px; height:15px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'http://res.edushi.com/dian/shop/images/side_shop.png\',sizingMethod=\'image\');margin-top:-1px;background-repeat:no-repeat;"><!--[if !IE]><!--><img height="14px" width="15" src="images/side_shop.png"/><!--<![endif]--></div></div>';

        showNearShop.innerHTML = sDiv;
        vEdushiMap.AppendEntity(showNearShop, _ShopPerimeterLayer, false, shopPerimeterList[i].X, shopPerimeterList[i].Y, 233, 50, 57, 33, false);
    }
}
function appendShopCenter(iconPath,shopName, x, y)
{  
    var divShopCenter = vEdushiMap.$C('div');
    divShopCenter.id = '_ShopCenter';
    var sDiv = '<div><div><div style="float:left;min-width:100px;width:auto;_width:100px;_white-space:nowrap;background-image:url(http://res.edushi.com/dian/shop/images/eshop_mark_bg.gif);border-left:solid 1px #ffae69; border-right:solid 1px #ffae69;font-size:12px; color:#FFFFFF; text-align:center; padding:4px 4px 0px 4px;">' + shopName + '</div><div style="clear:both;margin-left:50px;width:12px; height:14px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'http://res.edushi.com/dian/shop/images/eshop_mark_bottom.png\',sizingMethod=\'image\'); margin-top:-1px; background-repeat:no-repeat;"><!--[if !IE]><!--><img height="12px" width="15" src="http://res.edushi.com/dian/shop/images/eshop_mark_bottom.png"/><!--<![endif]--></div></div></div>';
    divShopCenter.innerHTML = sDiv;
    vEdushiMap.AppendEntity(divShopCenter, _ShopCenterLayer, false, x, y, 233, 50, 57, 33, false);
}

//对象原型扩展
Object.extend = function(destination, source) {
    for(property in source){
        destination[property] = source[property];
    }
    return destination;
};
Object.extend(String.prototype,{
	ltrim:function(){//去除左边空格
		var whitespace = new String(" \t\n\r");
		var s = new String(this);
		if (whitespace.indexOf(s.charAt(0)) != -1)
		{
			var j=0, i = s.length;
			while (j < i && whitespace.indexOf(s.charAt(j)) != -1)
			{
				j++;
			}
			s = s.substring(j, i);
		}
		return s;
	},
	rtrim:function(){//去除右边空格
		var whitespace = new String(" \t\n\r");
		var s = new String(this);
		if (whitespace.indexOf(s.charAt(s.length-1)) != -1){
			var i = s.length - 1;
			while (i >= 0 && whitespace.indexOf(s.charAt(i)) != -1){
				i--;
			}
			s = s.substring(0, i+1);
		}
		return s;	
	},
	trim:function(){//去除两边空格
		var s = new String(this);
		s = s.ltrim().rtrim();
		return s;
	},
	Int:function(){//转成整数
		return parseInt(this);
	},
	Float:function(){//转成浮点数
		return parseFloat(this);
	},
	replaceAll:function (AFindText,ARepText){  
         var raRegExp = new RegExp(AFindText.replace(/([\(\)\[\]\{\}\^\$\+\-\*\?\.\"\'\|\/\\])/g,"\\$1"),"ig");
         return this.replace(raRegExp,ARepText);  
    }
});