var start='',end='';
var _CoordList = [];
var StartStation = [];
var EndStation = [];
var _startIndex = -1;
var _endIndex = -1;
var startName = '';
var endName = '';
var dataCache, dataSource;
var _sindex = 0;

var flgData = true;

var _Page = 1;
var _PageCount = 1;
var _RecordCount = 0;
var _PageSize = 8;
var _Begin;
var _End;
var _phonedata = [];

var LoadHTML = '';

window.onload=fnOnload;
function fnOnload() {
    if (!window.Config) {
        setTimeout('fnOnload()', 200);
        return;
    }
    if (parseInt(fnGetWindowHeight() - 5) > 0) {
        $('TabContent').style.height = fnGetWindowHeight() - 5 + 'px';
    }

    $('TabContent').innerHTML = this.Config.Loading;

    var url;
    url = window.Config.DataCetnerSearchDataUrl + "SearchTankerTwoStationSuggest/" + window.Config.CityCode + "/" + window.Config.Language + "/Format/Json/Search?startquery=" + encodeURIComponent(unescape(fnRequest('s'))) + "&endquery=" + encodeURIComponent(unescape(fnRequest('e')));
    LoadHTML = '';
    ENetwork.DownloadScript(url, function() {
        if (typeof _StartStation == 'undefined' || _StartStation == null) {
            LoadHTML = '<div class="gj_title_01"><div><span></span>起点不存在或尚未登记！请重新输入搜索！</div></div>';
            flgData = false;
        }
        else {
            fnLoadStartList(0);
        }

        if (typeof _EndStation == 'undefined' || _EndStation == null) {
            LoadHTML += '<div class="gj_title"><div><span></span>终点不存在或尚未登记！请重新输入搜索！</div></div>';
            flgData = false;
        }
        else {
            fnLoadEndList(0);
        }

        LoadHTML = '<div class="gj_title_01"><div><span></span>请选择准确的起点和终点：</div></div>' + '<div class="gj_02">'+LoadHTML+'</div>';

        if (flgData && _StartStation.length > 0 && _EndStation.length > 0 && _StartStation[0].Value == unescape(fnRequest('s')) && _EndStation[0].Value == unescape(fnRequest('e'))) {
            fnTransfer(0, 0);
        }
        else {
            $('TabContent').innerHTML = LoadHTML;
            if (flgData && _EndStation.length > 0) {
                $('endul').style.display = "none";
            }
            reLoadPageSize();
        }
    });
}

function a(type, i) {
    if (type == '1') {
        $('startLi' + i).style.display = "";
    }

    if (type == '2') {
        $('endLi' + i).style.display = "";
    }
}

function b(type, i) {
    if (type == '1') {
        $('startLi' + i).style.display = "none";
    }

    if (type == '2') {
        $('endLi' + i).style.display = "none";
    }
}

function inputclick(type, i) {
    if (!flgData)
        return;
    if (type == '1') {
        moveto(StartStation[i].X, StartStation[i].Y, 1);
        $('startLi' + i).style.display = "none";
        $('startul').style.display = "none";
        $('startStationName').innerHTML = StartStation[i].Value;
        _startIndex = i;
        if (_startIndex != -1 && _endIndex != -1) {
            fnTransfer(_startIndex, _endIndex);
        }
        else {
            $('endul').style.display = "";
        }
    }

    if (type == '2') {
        moveto(EndStation[i].X, EndStation[i].Y, 2);
        $('endLi' + i).style.display = "none";
        $('endul').style.display = "none";
        $('endStationName').innerHTML = EndStation[i].Value;
        _endIndex = i;
        if (_startIndex != -1 && _endIndex != -1) {
            fnTransfer(_startIndex, _endIndex);
        }
        else {
            $('startul').style.display = "";
        }
    }
}

function divClick(type) {
    if (!flgData)
        return;
    if (type == '1') {
        $('endul').style.display = "none";
        $('startul').style.display = "";
        _startIndex = -1;
    }

    if (type == '2') {
        $('startul').style.display = "none";
        $('endul').style.display = "";
        _endIndex = -1;
    }
}

function fnLoadStartList(type) {
    var HtmlStartTitle = "";
    if (type == 1) {
        HtmlStartTitle += '<div class="gj_021_01" id = "startDiv">';
        HtmlStartTitle += '<div class="title_01" onclick="divClick(1);" style="cursor:pointer;">';
        HtmlStartTitle += '<div class="T_left_01"><span class="icon_q_01"></span><a id=\"startStationName\">{$StartStation}</a><div class="clear"></div></div>';
        HtmlStartTitle += '<div class="T_right_01"><span class="icon_t_01"></span></div>';
        HtmlStartTitle+='<div class="clear"></div>';
        HtmlStartTitle+='</div>';
        HtmlStartTitle += '<div id="startul"><ul class="xd_ul_01" id="divstartul">{$startStationLi}</ul>';
        HtmlStartTitle += '<div class="number_01">{$Page}</div></div></div>';
    }
    else if (type == 0) {
        HtmlStartTitle += '<div id="StartContent"><div class="gj_021_01" id = "startDiv">';
        HtmlStartTitle += '<div class="title_01" onclick="divClick(1);" style="cursor:pointer;">';
        HtmlStartTitle += '<div class="T_left_01"><span class="icon_q_01"></span><a id=\"startStationName\">{$StartStation}</a><div class="clear"></div></div>';
        HtmlStartTitle += '<div class="T_right_01"><span class="icon_t_01"></span></div>';
        HtmlStartTitle += '<div class="clear"></div>';
        HtmlStartTitle += '</div>';
        HtmlStartTitle += '<div id="startul"><ul class="xd_ul_01" id="divstartul">{$startStationLi}</ul>';
        HtmlStartTitle += '<div class="number_01">{$Page}</div></div></div></div>';
    }

    var HtmlLi = "";
  
    HtmlLi += '     <li onmouseover="a({$type},{$num});" onmouseout = "b({$type},{$num});">';
    HtmlLi += '       <div class="btna_01" style="display:none;" id="{$Li}" onclick = "inputclick({$type},{$num});" title="选择起点"></div>';
    HtmlLi += '   	<div class="zd_name_01">';
    HtmlLi += '       	<div class="iconb_01"><span>{$i}</span></div>';
    HtmlLi += '           	<a href="javascript:;" onclick="moveto({$X},{$Y},1);">{$stationName}</a>';
    HtmlLi+='               <div class="clear"></div>';
    HtmlLi+='      	    </div>';
    HtmlLi += '       <div class="zd_adr_01">{$Address}</div>';
    HtmlLi += '   </li>';
    
    if (typeof _StartStation == 'undefined' || _StartStation == null) {
        LoadHTML = '<div class="gj_title"><div><span></span>起点不存在或尚未登记！请重新输入搜索！</div></div>';
    }
    else {
        var start = '', e = '', item;
        var _temphtml = "";

        if (_StartStation.length > 0) {
            _RecordCount = _StartStation.length;
            if ((_RecordCount % _PageSize) == 0) {
                _PageCount = _RecordCount / (_PageSize);
            }
            else {
                _PageCount = int(_RecordCount, _PageSize) + 1;
            }

            var Begin = (_Page - 1) * (_PageSize);
            var End = _Page * _PageSize;
            if (End > _RecordCount) End = _RecordCount;
            _Begin = Begin;
            _End = End;
            
            StartStation = _StartStation;
            start = HtmlStartTitle.replace("{$StartStation}", unescape(fnRequest('s')));
            var t = 1;
            for (var k = Begin; k < End; k++) {
                _temphtml = HtmlLi;
                item = _StartStation[k];
                e += _temphtml.replace("{$stationName}", item.Value).replaceAll("{$Li}", "startLi" + k).replace("{$i}", t).replaceAll('{$num}', k).replace('{$Address}', item.Address).replace('{$X}', item.X).replace('{$Y}', item.Y);
                t++;
            }
            var strPage = fnPager(5, _Page, _PageSize, _PageCount, 'window.fnShowStartByPage');
            start = start.replace("{$startStationLi}", e).replaceAll('{$type}', 1).replace('{$Page}', strPage);
        }
        else {
            start = '<div class="gj_title"><div><span></span>起点不存在或尚未登记！请重新输入搜索！</div></div>';
        }
        
        if (type == 1) {
            $('StartContent').innerHTML = start;
        }
        else if (type == 0) {
            LoadHTML = start;
        }
    }
}

function moveto(x, y,type) {
    parent.MoveTo(x * 1, y * 1, true);
    createIcon(x, y, type);
}

function createIcon(x, y, type) {
    if (parseInt(type) == 1) {
        var iconstartDiv = parent.vM.$C('div');
        iconstartDiv.zIndex = 10000;
        iconstartDiv.id = "starticon";
        iconstartDiv.innerHTML = '<img src="images/starticon.png" />';
        if (parent.vM.GetEntityInfo("starticon")) {
            parent.vM.RemoveEntity("starticon");
        }
        parent.vM.AppendEntity(iconstartDiv, parent._seIconLayer, false, x * 1, y * 1, 28, 28, 28, 28, false, false);
    }

    if (parseInt(type) == 2) {
        var iconendDiv = parent.vM.$C('div');
        iconendDiv.zIndex = 10000;
        iconendDiv.id = "endicon";
        iconendDiv.innerHTML = '<img src="images/endicon.png" />';

        if (parent.vM.GetEntityInfo("endicon")) {
            parent.vM.RemoveEntity("endicon");
        }
        parent.vM.AppendEntity(iconendDiv, parent._seIconLayer, false, x * 1, y * 1, 28, 28, 28, 28, false, false);
    }
}

function fnLoadEndList(type) {
    var HtmlEndTitle = "";
    if (type == 1) {
        HtmlEndTitle += '<div class="gj_021_01" id = "endDiv">';
        HtmlEndTitle += '<div class="title_01" onclick="divClick(2);" style="cursor:pointer;">';
        HtmlEndTitle += '<div class="T_left_01"><span class="icon_q2_01"></span><a id=\"endStationName\">{$EndStation}</a><div class="clear"></div></div>';
        HtmlEndTitle += '<div class="T_right_01"><span class="icon_t2_01"></span></div>';
        HtmlEndTitle += '<div class="clear"></div>';
        HtmlEndTitle += '</div>';
        HtmlEndTitle += '<div id="endul"><ul class="xd_ul_01" id="divendul">{$endStationLi}</ul>';
        HtmlEndTitle += '<div class="number_01">{$Page}</div></div></div>';
    }
    else if (type == 0) {
        HtmlEndTitle += '<div id="EndContent"><div class="gj_021_01" id = "endDiv">';
        HtmlEndTitle += '<div class="title_01" onclick="divClick(2);" style="cursor:pointer;">';
        HtmlEndTitle += '<div class="T_left_01"><span class="icon_q2_01"></span><a id=\"endStationName\">{$EndStation}</a><div class="clear"></div></div>';
        HtmlEndTitle += '<div class="T_right_01"><span class="icon_t2_01"></span></div>';
        HtmlEndTitle += '<div class="clear"></div>';
        HtmlEndTitle += '</div>';
        HtmlEndTitle += '<div id="endul"><ul class="xd_ul_01" id="divendul">{$endStationLi}</ul>';
        HtmlEndTitle += '<div class="number_01">{$Page}</div></div></div></div>';
    }
    
    var HtmlLi = "";
    
    HtmlLi += '     <li onmouseover="a({$type},{$num});" onmouseout = "b({$type},{$num});">';
    HtmlLi += '       <div class="btna_01" style="display:none;" id="{$Li}" onclick = "inputclick({$type},{$num});" title="选择终点"></div>';
    HtmlLi += '   	<div class="zd_name_01">';
    HtmlLi += '       	<div class="iconb_01"><span>{$i}</span></div>';
    HtmlLi += '           	<a href="javascript:;" onclick="moveto({$X},{$Y},2);">{$stationName}</a>';
    HtmlLi += '               <div class="clear"></div>';
    HtmlLi += '      	    </div>';
    HtmlLi += '       <div class="zd_adr_01">{$Address}</div>';
    HtmlLi += '   </li>';

    if (typeof _EndStation == 'undefined' || _EndStation == null) {
        LoadHTML += '<div class="gj_title"><div><span></span>终点不存在或尚未登记！请重新输入搜索！</div></div>';
    }
    else {
        var end = '', e = '', item;
        var _temphtml = "";

        if (_EndStation.length > 0) {
            _RecordCount = _EndStation.length;
            if ((_RecordCount % _PageSize) == 0) {
                _PageCount = _RecordCount / (_PageSize);
            }
            else {
                _PageCount = int(_RecordCount, _PageSize) + 1;
            }

            var Begin = (_Page - 1) * (_PageSize);
            var End = _Page * _PageSize;
            if (End > _RecordCount) End = _RecordCount;
            _Begin = Begin;
            _End = End;

            EndStation = _EndStation;
            e = '';
            end = HtmlEndTitle.replace("{$EndStation}", unescape(fnRequest('e')));
            var t = 1;
            for (var j = Begin; j < End; j++) {
                _temphtml = HtmlLi;
                item = _EndStation[j];
                e += _temphtml.replace("{$stationName}", item.Value).replaceAll("{$Li}", "endLi" + j).replace("{$i}", t).replaceAll('{$num}', j).replace('{$Address}', item.Address).replace('{$X}', item.X).replace('{$Y}', item.Y); ;
                t++;
            }
            var strPage = fnPager(5, _Page, _PageSize, _PageCount, 'window.fnShowEndByPage');
            end = end.replace("{$endStationLi}", e).replaceAll('{$type}', 2).replace('{$Page}', strPage);
        }
        else {
            end = '<div class="gj_title"><div><span></span>终点不存在或尚未登记！请重新输入搜索！</div></div>';
        }
        if (type == 1) {
            $('EndContent').innerHTML = end;
        }
        else if (type == 0) {
            LoadHTML += end;
        }
    }
}

function fnShowStartByPage(iPage) {
    if (iPage) {
        _Page = iPage;
    }
    fnLoadStartList(1);
    reLoadPageSize();
}

function fnShowEndByPage(iPage) {
    if (iPage) {
        _Page = iPage;
    }
    fnLoadEndList(1);
    reLoadPageSize();
}

function fnTransfer(sindex, eindex) {
    $('TabContent').innerHTML = this.Config.Loading;
    var sItem = StartStation[sindex];
    var eItem = EndStation[eindex];
    startName = sItem.Value;
    endName = eItem.Value;
    var stempType = '';
    if (sItem.Type == 'BusStation' || sItem.Type == 'Subway') {
        stempType = 1;
    }
    else {
        stempType = 0;
    }

    var etempType = '';
    if (eItem.Type == 'BusStation' || eItem.Type == 'Subway') {
        etempType = 1;
    }
    else {
        etempType = 0;
    }

    var url = window.Config.BusDeuceSearchUrl + '/TankerTransfer.aspx?domain=' + window.Config.Domain + '&l=' + window.Config.Language + '&StartId=' + sItem.ID + '&StartName=' + encodeURIComponent(sItem.Value) + '&StartType=3&StartX=' + sItem.X + '&StartY=' + sItem.Y + '&EndId=' + eItem.ID + '&EndName=' + encodeURIComponent(eItem.Value) + '&EndType=3&EndX=' + eItem.X + '&EndY=' + eItem.Y;

    ENetwork.DownloadScript(url, function() {
        if (typeof _TransferResult == "undefined" || _TransferResult == null) {
            $('TabContent').innerHTML = "<div><span style=\"float:left;display:block;\"><img src=\"../Images/Face.gif\" /></span><span style=\"float:left;display:block;line-height:24px;font-size:14px;padding:10px 0;color:#666;\">抱歉，没有符合您要求的水上公交线路，<br />请重新输入周边地名或水上公交站搜索</span></div>";
        }
        else {
            if (_TransferResult.length < 1) {
                $('TabContent').innerHTML = "<div><span style=\"float:left;display:block;\"><img src=\"../Images/Face.gif\" /></span><span style=\"float:left;display:block;line-height:24px;font-size:14px;padding:10px 0;color:#666;\">抱歉，没有符合您要求的水上公交线路，<br />请重新输入周边地名或水上公交站搜索</span></div>";
            }
            else {
                dataCache = _TransferResult;
                dataSource = ObjectClone(_TransferResult);
                resultShow(_TransferResult);
            }
        }
    });
}

function resultShow(data) {
    var sHtml = '',strHtml='';
    sHtml = '<div class="gj_title"><div class="diva" ><div class="qd"><div class="icon_q"></div><a href="#">' + startName + '</a></div><div class="zd"><div class="icon_q2"></div><a href="#">' + endName + '</a></div><div class="zt"><div class="icon_q3"></div><a href="javascript:;" onclick="ViewCompleteBusLine();">整条线路</a></div></div><div class="clear"></div></div>';

    strHtml = '<div class="z3" id="bus_radio"><span><input type="radio" id="radio1" name="radio" onclick="selectBtn(1);" /><label>最快到达</label></span><span><input type="radio" name="radio" onclick="selectBtn(2);" id="radio2" checked="checked" /><label>最少换行</label></span></div>';
    
    for (var i = 0; i < data.length; i++) {
        strHtml += fnShowTransferResult(data[i], i + 1, startName, endName);
    }
    strHtml += "<div class=\"cxd\"><a href=\"javascript:;\" onclick=\"reLoadChange();\">重新选择起点终点</a></div>";
    strHtml = "<div class=\"gj_03\">" + strHtml + "</div>";
    $('TabContent').innerHTML = sHtml+strHtml;
    if (data.length > 0) {
        fnDisplayResult(data[0].ID);
        parent.fnGotoBusStation(data[0].StartStation.StationID, data[0].StartStation.StationName, data[0].StartStation.PositionX, data[0].StartStation.PositionY);
    }
    fnResize();
}

function fnShowTransferResult(result, index, s, e) {
    var phonetemp = "";
    var _s = "";
    if (s.length > 10)
        _s = s.substring(0, 10) + "...";
    else
        _s = s;
    var _e = "";
    if (e.length > 15)
        _e = e.substring(0, 15) + "...";
    else
        _e = e;
    
    var title = "";
    var sa = "";

    var waterHTML = '<div class="gj_a"><div  class="gj_a1">{liebiao}<div class="clear"></div></div></div>';

    var sb = "<div class=\"list_all\" id=" + result.ID + " style=\"display:none;\">{sb}</div>";
    var _sb = '';

    if (result.StartWalkLength == "0") {
        _sb += string.Format('<div class="list"><div class="icon_bx"></div><div class="xx1">在<a href="javascript:;" class="ud" onclick="ShowPointer({0}, {1}, true)">{2}</a>上车</div><div class="clear"></div></div>'
        , result.StartStation.PositionX
        , result.StartStation.PositionY
        , result.StartStation.StationName, result.StartWalkLength);
        phonetemp += "从" + result.StartStation.StationName + "";
    }
    else {
        _sb += string.Format('<div class="list"><div class="icon_bx"></div><div class="xx1">步行到<a href="javascript:;" class="ud" onclick="ShowPointer({0}, {1}, true)">{2}</a>上车</div><div class="lc">[{3}米]</div><div class="clear"></div></div>'
        , result.StartStation.PositionX
        , result.StartStation.PositionY
        , result.StartStation.StationName, result.StartWalkLength);
        phonetemp += "从" + result.StartStation.StationName + "";
    }
    for (var i = 0; i < result.TransferNodeList.length; i++) {
        var node = result.TransferNodeList[i];
        if (node.NodeType == 'WalkTransfer') {
            //sb += string.Format("<li><div class=\"bus_way1_pubico\"><img src=\"../images/bus_ico8.gif\" border=\"0\" /></div><div class=\"bus_way1_pubtitle\">步行至街对面<a style=\"cursor:pointer;\" onclick=\"ShowPointer({0}, {1}, true)\"><u>{2}</u></a><span>{3}米</span></div></li>", node.ToStation.PositionX, node.ToStation.PositionY, node.ToStation.StationName, node.PassLength);
            //phonetemp += "到街对面" + node.ToStation.StationName + "";
        }
        else {
            if (node.FromStation.StationID != node.ToStation.StationID) {
                var temp = '';
                var tempbusline = '';
                phonetemp += ",坐";
                for (var j = 0; j < node.PassVehicle.length; j++) {
                    var v = node.PassVehicle[j];
                    if (j == 0) {
                        title += '<span>' + v.VehicleName + '</span>';
                    }
                    if (j > 0) {
                        tempbusline += "或";
                    }

                    tempbusline += "<a class=\"ud\" href=\"javascript:parent.fnOnBusClick(" + v.VehicleID + ",'" + v.VehicleName + "');\"><strong>" + v.VehicleName + "</strong></a>";
                    phonetemp += v.VehicleName + "或";
                }
                phonetemp = phonetemp.substring(0, (phonetemp.length - 1));
                phonetemp += "在" + node.ToStation.StationName + "下车";

                temp = '<div class="list"><div class="icon_bx icon_bx2"></div><div class="xx1">换乘{$busline}到<a href="javascript:;" class="ud" onclick="ShowPointer({$x}, {$y}, true)">{$tStationName}</a>下</div><div class="lc">[{$num}站]</div><div class="clear"></div></div>';

                title += "→";
                _sb += temp.replace("{$num}", node.PassStationCount).replace("{$x}", node.ToStation.PositionX).replace("{$y}", node.ToStation.PositionY).replace("{$tStationName}", node.ToStation.StationName).replace("{$busline}", tempbusline);
            }
        }
    }
    
    if (result.StopWalkLength == "0") {
        _sb += string.Format('<div class="list"><div class="icon_bx"></div><div class="xx1">到达<a href="javascript:;" class="ud" onclick="ShowPointer({0}, {1}, true)">{2}</a></div><div class="clear"></div></div>',
        result.ToArea.PositionX,
        result.ToArea.PositionY,
        e);
    }
    else {
        _sb += string.Format('<div class="list"><div class="icon_bx"></div><div class="xx1">步行至<a href="javascript:;" class="ud" onclick="ShowPointer({0}, {1}, true)">{2}</a></div><div class="lc">[{3}米]</div><div class="clear"></div></div>',
        result.ToArea.PositionX,
        result.ToArea.PositionY,
        e,
        result.StopWalkLength);
    }
    phonetemp += ".手机地图http://wap.edushi.com/";
    _phonedata[index - 1] = phonetemp.replaceAll('公交', '');
    _sb += "<div class=\"list\"><div class=\"icon_bx icon_bx3\"></div><div class=\"xx1\"><a href=\"javascript:;\" onclick=\"parent.ShowSendHtml(_phonedata[" + (index - 1) + "]);\">发送到手机</a></div><div class=\"lc\">[全程" + result.TransferLength / 1000 + "公里]</div><div class=\"clear\"></div></div>";

    sb = sb.replace('{sb}', _sb);

    var resulttitle = "";
    title = title.substr(0, title.length - 1).replace('→', '<span class="tl_span"></span>');
    if (result.TransferNodeList.length == 1) {
        //resulttitle = string.Format("<div class=\"title\" id= \"title_" + result.ID + "\" onclick=\"fnDisplayResult(\'" + result.ID + "\');\"><div class=\"number1\">" + index + "</div><div class=\"T_left\">{0}</div><div class=\"T_right\"><span>直达</span><span class=\"icon_t2\"></span></div></div>", title);
        resulttitle = "<div class=\"title\" style=\"cursor:pointer;\" id= \"title_" + result.ID + "\" onclick=\"fnDisplayResult(\'" + result.ID + "\');\"><div class=\"number1\">" + index + "</div><div class=\"T_left\">" + title + "</div><div class=\"T_right\"><span>直达</span><span class=\"icon_t2\"></span></div></div>";
    }
    else {
        resulttitle = "<div class=\"title\" style=\"cursor:pointer;\" id= \"title_" + result.ID + "\" onclick=\"fnDisplayResult(\'" + result.ID + "\');\"><div class=\"number1\">" + index + "</div><div class=\"T_left\">" + title + "</div><div class=\"T_right\"><span>转1次</span><span class=\"icon_t2\"></span></div></div>";
    }

    return waterHTML.replace('{liebiao}', resulttitle + sb);
}

function fnDisplayResult(id) {
    var result;
    for (var i = 0; i < _TransferResult.length; i++) {
        if (_TransferResult[i].ID == id) {
            $(_TransferResult[i].ID).style.display = 'block';
            result = _TransferResult[i];
        }
        else {
            $(_TransferResult[i].ID).style.display = 'none';
        }
    }

    createIcon(result.FromArea.PositionX, result.FromArea.PositionY, 1);
    createIcon(result.ToArea.PositionX, result.ToArea.PositionY, 2);

    var BusTransferColor = ['#FF3300', '#FF9900'];
    var iBusTransferIndex = 0;
    var CoordList = [];

    for (var i = 0; i < result.TransferNodeList.length; i++) {
        var color;
        var coords = '';
        var passStation = [];
        var node = result.TransferNodeList[i];
        var _tempcoords = [];
        if (node.BestTrack.length > 0) {
            coords = node.BestTrack;
            _tempcoords = node.BestTrack.split(',');
        }
        else {
            for (var j = 0; j < node.BestVehiclePassStation.length; j++) {
                var s = node.BestVehiclePassStation[j];
                coords += s.PositionX + ',' + s.PositionY + ',';
            }
            coords = coords.substr(0, coords.length - 1);
        }

        if (node.NodeType == 'WalkTransfer') {
            color = '#FF9900';
        }
        else {
            color = BusTransferColor[iBusTransferIndex];
        }

        if (coords.length > 0) {
            CoordList[CoordList.length] = { Coords: coords, Color: color, Alpha: 0.7, Size: 3, PassStation: node.BestVehiclePassStation };

            if (result.FromArea != null && result.FromArea.PositionX != parseInt(_tempcoords[0]) && result.FromArea.PositionY != parseInt(_tempcoords[1]) && i == 0) {
                CoordList[CoordList.length] = { Coords: result.FromArea.PositionX + ',' + result.FromArea.PositionY + ',' + result.StartStation.PositionX + ',' + result.StartStation.PositionY, Color: '#0099FF', Alpha: 0.7, Size: 3, PassStation: [] };
            }

            if (result.ToArea != null && result.ToArea.PositionX != parseInt(_tempcoords[_tempcoords.length - 2]) && result.ToArea.PositionY != parseInt(_tempcoords[_tempcoords.length - 1]) && result.TransferNodeList.length == 1 || result.TransferNodeList.length == 3 && i == 2) {
                CoordList[CoordList.length] = { Coords: result.StopStation.PositionX + ',' + result.StopStation.PositionY + ',' + result.ToArea.PositionX + ',' + result.ToArea.PositionY, Color: '#0099FF', Alpha: 0.7, Size: 3, PassStation: [] };
            }
        }
        if (node.NodeType == 'BusTransfer' && node.FromStation.StationID != node.ToStation.StationID) {
            iBusTransferIndex++;
        }
    }

    _CoordList = CoordList;
    parent.__IsDrawBusLineState = false;
    parent.fnDrawingBusLine(CoordList,'water');
}

function reLoadChange() {
    _startIndex = -1;
    _endIndex = -1;
    //$('bus_radio').style.display = 'none';
    $('TabContent').innerHTML = this.Config.Loading;
    $('TabContent').className = "bus_box2";
    $('TabContent').innerHTML = LoadHTML;
    if (EndStation.length > 0) {
        $('endul').style.display = "none";
    }
    reLoadPageSize();
    fnResize();
}

function ViewCompleteBusLine() {
    parent.parent.vM.MapSwitch.Switch2D();
    fnDelay();
}

function fnDelay() {
    if (parent.parent.vM.MapState.Succeed) {
        parent.parent.vM.ZoomBar.ZoomTo(6);
    }
    else {
        setTimeout("fnDelay()", 300);
        return;
    }
}

function ShowPointer(x, y) {
    parent.vM.MoveTo(x, y, true);
}

function selectBtn(index) {
    var len = dataCache.length;

    if (index == 2) {
        resultShow(dataSource);
        $('radio2').checked = true;
    }

    if (index == 1) {
        dataCache.sort(function com(a, b) { return parseInt(a.TransferLength) - parseInt(b.TransferLength); });
        resultShow(dataCache);

        $('radio1').checked = true;
    }
    
    if (index == 3) {
        dataCache.sort(function com(a, b) { return parseInt(a.WalkLength) - parseInt(b.WalkLength); });
        resultShow(dataCache);
        $('radio3').checked = true;
    }

    if (index == 4) {
        dataCache.sort(function com(a, b) { return parseInt(b.IsSubway) - parseInt(a.IsSubway); });
        resultShow(dataCache);
    }
}

function reLoadPageSize() {
    var _height = parseInt(fnGetWindowHeight() - 200);
    if (_height > -1) {
        if ($('divstartul')) {
            $('divstartul').style.height = _height + 'px';
        }
        if ($('divendul')) {
            $('divendul').style.height = _height + 'px';
        }
    }
}

function fnActive(){
    reLoadPageSize();

    if (_CoordList.length > 0) {
        parent.__IsDrawBusLineState = false;
        parent.fnDrawingBusLine(_CoordList,'water');
    }
    else {
        parent.__IsDrawBusLineState = true;
        parent.fnDrawingBusLine([],'');
    }
    fnResize();
}

function fnExit() {
    if (parent.vM.GetEntityInfo("starticon")) {
        parent.vM.RemoveEntity("starticon");
    }

    if (parent.vM.GetEntityInfo("endicon")) {
        parent.vM.RemoveEntity("endicon");
    }

    parent.__IsDrawBusLineState = true;
    parent.fnDrawingBusLine([],'');
    if (parent.parent.vM.MapState.Succeed) {
        parent.parent.vM.MapSwitch.Switch3D();
    }
}
//初始化高度
function fnResize(h) {
    if (!h) {
        if ($('bus_radio')) {
            $('TabContent').style.height = (fnGetWindowHeight() - 5) + 'px';
        }
        else {
            $('TabContent').style.height = (fnGetWindowHeight() - 5) + 'px';
        }
    }
    else {
        if ($('bus_radio')) {
            $('TabContent').style.height = (h - 5) + 'px';
        }
        else {
            $('TabContent').style.height = (h - 5) + 'px';
        }
    }

    reLoadPageSize();
}

function ObjectClone(source) {
    var objClone;
    if (source.constructor == Object) {
        objClone = new source.constructor();
    }
    else if (source.constructor == Array) {
        //对空数组的特殊处理
        if (source.length == 0) {
            objClone = new Array();
            return objClone;
        }
        objClone = new source.constructor(source.valueOf());
    }
    else {
        objClone = new source.constructor(source.valueOf());
    }
    for (var key in source) {
        if (objClone[key] != source[key]) {
            if (typeof (source[key]) == 'object') {
                objClone[key] = ObjectClone(source[key]);
            }
            else {
                objClone[key] = source[key];
            }
        }
    }
    objClone.toString = source.toString;
    objClone.valueOf = source.valueOf;
    return objClone;
}