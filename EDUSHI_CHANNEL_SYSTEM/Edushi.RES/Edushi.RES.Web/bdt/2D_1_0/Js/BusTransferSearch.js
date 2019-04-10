//公交搜索
var start = '', end = '';
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
function fnShowBusData(url) {
    ENetwork.DownloadScript(url, function () {

        _divLoading.show();
        if (typeof _StartStation == 'undefined' || _StartStation == null) {
            LoadHTML = "<div id=\"start\">起点：<strong>" + _startAddress + "</strong>不存在或尚未登记，请输入周边地名或试试该建筑物的名称</div>";
            flgData = false;
        }
        else {
            fnLoadStartList(0);
        }

        if (typeof _EndStation == 'undefined' || _EndStation == null) {
            LoadHTML += "<div id=\"end\">终点：<strong>" + _endAddress + "</strong>不存在或尚未登记，请输入周边地名或试试该建筑物的名称</div>";
            flgData = false;
        }
        else {
            fnLoadEndList(0);
        }
        LoadHTML = "<div id = \"sContent\" style=\" padding:5px;\">请选择准确的起点和终点：</div>" + LoadHTML;
        if (flgData && _StartStation.length > 0 && _EndStation.length > 0 && _StartStation[0].Value == _startAddress && _EndStation[0].Value == _endAddress) {
            fnTransfer(0, 0);
        }
        else {
            $('#divContent').css("bus_box2");
            $('#divContent').html(LoadHTML);
            if (flgData && _EndStation.length > 0) {
                $('#endul').hide();
            }
        }

        _divLoading.hide();
    });
}

function fnLoadStartList(type) {
    var HtmlStartTitle = "";
    if (type == 1) {
        HtmlStartTitle += "		<div class=\"bus_red\" id = \"startDiv\">";
        HtmlStartTitle += "			<h1 id=\"startStationH1\" onclick=\"divClick(1);\" style=\"cursor:pointer;\">";
        HtmlStartTitle += "				<div class=\"pub_ico\"></div>";
        HtmlStartTitle += "				<div class=\"pub_t\"><span style=\"display:block; float:left;\">起点：</span><span style=\"width:130px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block; float:left;font-weight:bold;\" id=\"startStationName\">{$StartStation}</span>";
        HtmlStartTitle += "					<a href=\"#\"></a>";
        HtmlStartTitle += "				</div>";
        HtmlStartTitle += "			</h1>";
        HtmlStartTitle += "			<div id=\"startul\"><ul class=\"pub_con\" id=\"divstartul\">{$startStationLi}</ul><div class=\"Paginate\" style=\"text-align:center;\">{$Page}</div></div>";
        HtmlStartTitle += "		</div>";
    }
    else if (type == 0) {
        HtmlStartTitle += "		<div class=\"bus_g_r\" id=\"StartContent\"><div class=\"bus_red\" id = \"startDiv\">";
        HtmlStartTitle += "			<h1 id=\"startStationH1\" onclick=\"divClick(1);\" style=\"cursor:pointer;\">";
        HtmlStartTitle += "				<div class=\"pub_ico\"></div>";
        HtmlStartTitle += "				<div class=\"pub_t\"><span style=\"display:block; float:left;\">起点：</span><span style=\"width:130px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block; float:left;font-weight:bold;\" id=\"startStationName\">{$StartStation}</span>";
        HtmlStartTitle += "					<a href=\"#\"></a>";
        HtmlStartTitle += "				</div>";
        HtmlStartTitle += "			</h1>";
        HtmlStartTitle += "			<div id=\"startul\"><ul class=\"pub_con\" id=\"divstartul\">{$startStationLi}</ul><div class=\"Paginate\" style=\"text-align:center;\">{$Page}</div></div>";
        HtmlStartTitle += "		</div></div>";
    }

    var HtmlLi = "";
    HtmlLi += "				<li onmouseover=\"a({$type},{$num});\" onmouseout = \"b({$type},{$num});\">";
    HtmlLi += "					<div class=\"pub_nub_r\" >{$i}</div>";
    HtmlLi += "					<div style=\"float:left;\"><div class=\"pub_place\"><a style=\"cursor:pointer;\" onclick=\"movetobus({$X},{$Y},1);\">{$stationName}</a></div><div style=\"margin:5px 0 0 5px;width:200px;\">{$Address}</div></div>";
    HtmlLi += "					<div style=\"height:20px;float:left;width:100%;padding:0 0 5px 0;text-align:center;\"><input id=\"{$Li}\" onclick = \"inputclick({$type},{$num});\" type=\"button\" class=\"pub_chobtn\" value=\"选择起点\" style=\"display:none;\" /></div>";
    HtmlLi += "				</li>";

    if (typeof _StartStation == 'undefined' || _StartStation == null) {
        LoadHTML = "<div id=\"start\">起点：<strong>" + _startAddress + "</strong>不存在或尚未登记，请输入周边地名或试试该建筑物的名称</div>";
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
            start = HtmlStartTitle.replace("{$StartStation}", _startAddress);
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
            start = "<div id=\"start\">起点：<strong>" + _startAddress + "</strong>不存在或尚未登记，请输入周边地名或试试该建筑物的名称</div>";
        }

        if (type == 1) {
            $('#StartContent').html(start);
        }
        else if (type == 0) {
            LoadHTML = start;
        }
    }
}

function fnLoadEndList(type) {
    var HtmlEndTitle = "";
    if (type == 1) {
        HtmlEndTitle += "		<div class=\"bus_red\" id = \"endDiv\" >";
        HtmlEndTitle += "			<h1 id=\"endStationH1\" onclick=\"divClick(2);\" style=\"cursor:pointer;\">";
        HtmlEndTitle += "				<div class=\"pub_ico\"></div>";
        HtmlEndTitle += "				<div class=\"pub_t\"><span style=\"display:block; float:left;\">终点：</span><span style=\"width:130px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block; float:left;font-weight:bold;\" id=\"endStationName\">{$EndStation}</span>";
        HtmlEndTitle += "				<a href=\"#\"></a>";
        HtmlEndTitle += "				</div>";
        HtmlEndTitle += "			</h1>";
        HtmlEndTitle += "			<div id=\"endul\"><ul class=\"pub_con\" id=\"divendul\">{$endStationLi}</ul><div class=\"Paginate\" style=\"text-align:center;\">{$Page}</div></div>";
        HtmlEndTitle += "		</div>";
    }
    else if (type == 0) {
        HtmlEndTitle += "		<div class=\"bus_g_r\" id=\"EndContent\"><div class=\"bus_red\" id = \"endDiv\" >";
        HtmlEndTitle += "			<h1 id=\"endStationH1\" onclick=\"divClick(2);\" style=\"cursor:pointer;\">";
        HtmlEndTitle += "				<div class=\"pub_ico\"></div>";
        HtmlEndTitle += "				<div class=\"pub_t\"><span style=\"display:block; float:left;\">终点：</span><span style=\"width:130px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block; float:left;font-weight:bold;\" id=\"endStationName\">{$EndStation}</span>";
        HtmlEndTitle += "				<a href=\"#\"></a>";
        HtmlEndTitle += "				</div>";
        HtmlEndTitle += "			</h1>";
        HtmlEndTitle += "			<div id=\"endul\"><ul class=\"pub_con\" id=\"divendul\">{$endStationLi}</ul><div class=\"Paginate\" style=\"text-align:center;\">{$Page}</div></div>";
        HtmlEndTitle += "		</div></div>";
    }

    var HtmlLi = "";
    HtmlLi += "				<li onmouseover=\"a({$type},{$num});\" onmouseout = \"b({$type},{$num});\">";
    HtmlLi += "					<div class=\"pub_nub_r\" >{$i}</div>";
    HtmlLi += "					<div style=\"float:left;\"><div class=\"pub_place\"><a style=\"cursor:pointer;\" onclick=\"movetobus({$X},{$Y},2);\">{$stationName}</a></div><div style=\"margin:5px 0 0 5px;width:200px;\">{$Address}</div></div>";
    HtmlLi += "					<div style=\"height:20px;float:left;width:100%;padding:0 0 5px 0;text-align:center;\"><input id=\"{$Li}\" onclick = \"inputclick({$type},{$num});\" type=\"button\" class=\"pub_chobtn\" value=\"选择终点\" style=\"display:none;\" /></div>";
    HtmlLi += "				</li>";

    if (typeof _EndStation == 'undefined' || _EndStation == null) {
        LoadHTML += "<div id=\"end\">终点：<strong>" + _endAddress + "</strong>不存在或尚未登记，请输入周边地名或试试该建筑物的名称</div>";
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
            end = HtmlEndTitle.replace("{$EndStation}", _endAddress);
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
            end = "<div id=\"end\">终点：<strong>" + _endAddress + "</strong>不存在或尚未登记，请输入周边地名或试试该建筑物的名称</div>";
        }
        if (type == 1) {
            $('#EndContent').html(end);
        }
        else if (type == 0) {
            LoadHTML += end;
        }
    }
}
function a(type, i) {
    if (type == '1') {
        $('#startLi' + i).show();
    }
    if (type == '2') {
        $('#endLi' + i).show();
    }
}
function b(type, i) {
    if (type == '1') {
        $('#startLi' + i).hide();
    }
    if (type == '2') {
        $('#endLi' + i).hide();
    }
}
function inputclick(type, i) {
    
    if (!flgData)
        return;
    if (type == '1') {
        movetobus(StartStation[i].X, StartStation[i].Y, 1);
        $('#startLi' + i).hide();
        $('#startDiv').attr("class", "bus_blue");
        $('#startul').hide();
        $('#startStationName').html(StartStation[i].Value);
        _startIndex = i;
        if (_startIndex != -1 && _endIndex != -1) {
            fnTransfer(_startIndex, _endIndex);
        }
        else {
            $('#endul').show();
        }
    }

    if (type == '2') {
        movetobus(EndStation[i].X, EndStation[i].Y, 2);
        $('#endLi' + i).hide();
        $('#endDiv').attr("class", "bus_blue");
        $('#endul').hide();
        $('#endStationName').html(EndStation[i].Value);
        _endIndex = i;
        if (_startIndex != -1 && _endIndex != -1) {
            fnTransfer(_startIndex, _endIndex);
        }
        else {
            $('startul').show();
        }
    }
}

function divClick(type) {
    if (!flgData)
        return;
    if (type == '1') {
        $('#endul').hide();
        $('#startul').show();
        $('#startDiv').attr("class", "bus_red");
        _startIndex = -1;
    }

    if (type == '2') {
        $('#startul').hide();
        $('#endul').show();
        $('#endDiv').attr("class", "bus_red");
        _endIndex = -1;
    }
}
function movetobus(x, y, type) {
    MoveTo(x * 1, y * 1, true);
    createIcon(x, y, type);
}
function createIcon(x, y, type) {
    if (parseInt(type) == 1) {
        var iconstartDiv = vM.$C('div');
        iconstartDiv.zIndex = 10000;
        iconstartDiv.id = "starticon";
        iconstartDiv.innerHTML = '<img src="images/starticon.png" />';
        if (vM.GetEntityInfo("starticon")) {
            vM.RemoveEntity("starticon");
        }
        vM.AppendEntity(iconstartDiv, _seIconLayer, false, x * 1, y * 1, 28, 28, 28, 28, false, false);
    }

    if (parseInt(type) == 2) {
        var iconendDiv = vM.$C('div');
        iconendDiv.zIndex = 10000;
        iconendDiv.id = "endicon";
        iconendDiv.innerHTML = '<img src="images/endicon.png" />';

        if (vM.GetEntityInfo("endicon")) {
            vM.RemoveEntity("endicon");
        }
        vM.AppendEntity(iconendDiv, _seIconLayer, false, x * 1, y * 1, 28, 28, 28, 28, false, false);
    }
}



function fnShowStartByPage(iPage) {
    if (iPage) {
        _Page = iPage;
    }
    fnLoadStartList(1);
}

function fnShowEndByPage(iPage) {
    if (iPage) {
        _Page = iPage;
    }
    fnLoadEndList(1);
}
//画公交路线
function fnTransfer(sindex, eindex) {
    _divLoading.show();
    _divContent.html("");

    var sItem = StartStation[sindex];
    var eItem = EndStation[eindex];
    startName = sItem.Value;
    endName = eItem.Value;

    _divResult.html('从 <span style="color:#3e9223">' + startName + '</span> 到 <span style="color:#c44242;">' + endName + '</span>').show();

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

    var url = GlobalConfig.EDataCenterUrl + 'CommMap5.0/Transfer.aspx?domain=' + GlobalConfig.Domain + '&l=' + GlobalConfig.Language + '&StartId=' + sItem.ID + '&StartName=' + escape(sItem.Value) + '&StartType=' + stempType + '&StartX=' + sItem.X + '&StartY=' + sItem.Y + '&EndId=' + eItem.ID + '&EndName=' + escape(eItem.Value) + '&EndType=' + etempType + '&EndX=' + eItem.X + '&EndY=' + eItem.Y + '&rnd=' + $Rnd();
   
    ENetwork.DownloadScript(url, function () {
        if (typeof _TransferResult == "undefined" || _TransferResult == null) {
            $('#divContent').html("<div><span style=\"float:left;display:block;line-height:24px;font-size:14px;padding:10px 0;color:#666;\">抱歉，没有符合您要求的乘车路线，<br />请重新输入周边地名或公交站搜索或</span></div><a onclick=\"reLoadChange();\" style=\"cursor:pointer;display:block;font-size:14px;float:right;width:120px;margin:0px 20px 0 0;font-weight:bold;text-align:center;color:#36f;\">重新选择起点终点</a>");
        }
        else {
            if (_TransferResult.length < 1) {
                $('#divContent').html("<div><span style=\"float:left;display:block;line-height:24px;font-size:14px;padding:10px 0;color:#666;\">抱歉，没有符合您要求的乘车路线，<br />请重新输入周边地名或公交站搜索或</span></div><a onclick=\"reLoadChange();\" style=\"cursor:pointer;display:block;font-size:14px;float:right;width:120px;margin:0px 20px 0 0;font-weight:bold;text-align:center;color:#36f;\">重新选择起点终点</a>");
            }
            else {
                dataCache = _TransferResult;
                dataSource = ObjectClone(_TransferResult);
                resultShow(_TransferResult);
            }
        }
        _divLoading.hide();
    });
}

function resultShow(data) {
    var sHtml = '';
    for (var i = 0; i < data.length; i++) {
        sHtml += fnShowTransferResult(data[i], i + 1, startName, endName);
    }
    sHtml += "<a onclick=\"reLoadChange();\" style=\"cursor:pointer;display:block;font-size:14px;float:right;width:120px;margin:5px 20px 0 0;font-weight:bold;text-align:center;color:#36f;\">重新选择起点终点</a>";
    $('#divContent').html(sHtml);
    if (data.length > 0) {
        fnDisplayResult(data[0].ID);
        fnGotoBusStation(data[0].StartStation.StationID, data[0].StartStation.StationName, data[0].StartStation.PositionX, data[0].StartStation.PositionY);
    }
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
    var start = "";
    start += "			<li>";
    start += "				<div class=\"bus_way1_title2\" title=" + s + ">起点：" + _s + "<a style=\"cursor:pointer;\" onclick=\"ViewCompleteBusLine();\">显示整条路线</a></div>";
    start += "			</li>";

    var end = "";
    end += "			<li>";
    end += "				<div class=\"bus_way1_title2\" title=" + e + "><span>终点：" + _e + "</span></div>";
    end += "			</li>";
    end += "			<li class=\"bus_way1_down\">全程" + result.TransferLength / 1000 + "公里</li>";

    var walk = "";
    walk += "			<li>";
    walk += "				<div class=\"bus_way1_pubico\"><img src=\"images/bus_ico8.gif\" border=\"0\" /></div>";
    walk += "				<div class=\"bus_way1_pubtitle\">步行至{$station}<span>100米</span></div>";
    walk += "			</li>";

    var subway = "";
    subway += "			<li>";
    subway += "				<div class=\"bus_way1_pubico\"><img src=\"images/bus_ico5.gif\" border=\"0\" /></div>";
    subway += "				<div class=\"bus_way1_pubtitle\">乘坐<a href=\"#\"><b>地铁一号线</b></a><span>100米</span></div>";
    subway += "			</li>";

    var tempwalk = walk;

    var title = "";
    var sa = "";

    var sb = "<div id=" + result.ID + " style=\"display:none;\">" + start;
    //phonetemp += "" + _s + "-->" + _e + "";
    if (result.StartWalkLength == "0") {
        sb += String.Format("<li><div class=\"bus_way1_pubico\"><img src=\"images/bus_ico8.gif\" border=\"0\" /></div><div class=\"bus_way1_pubtitle\">在<a style=\"cursor:pointer;\" onclick=\"ShowPointer({0}, {1}, true)\"><u>{2}</u></a>上车</div></li>"
        , result.StartStation.PositionX
        , result.StartStation.PositionY
        , result.StartStation.StationName, result.StartWalkLength);
        phonetemp += "从" + result.StartStation.StationName + "";
    }
    else {
        sb += String.Format("<li><div class=\"bus_way1_pubico\"><img src=\"images/bus_ico8.gif\" border=\"0\" /></div><div class=\"bus_way1_pubtitle\">步行至<a style=\"cursor:pointer;\" onclick=\"ShowPointer({0}, {1}, true)\"><u>{2}</u></a><span>{3}米</span></div></li>"
        , result.StartStation.PositionX
        , result.StartStation.PositionY
        , result.StartStation.StationName, result.StartWalkLength);
        phonetemp += "从" + result.StartStation.StationName + "";
    }
    for (var i = 0; i < result.TransferNodeList.length; i++) {
        var node = result.TransferNodeList[i];
        if (node.NodeType == 'WalkTransfer') {
            sb += String.Format("<li><div class=\"bus_way1_pubico\"><img src=\"images/bus_ico8.gif\" border=\"0\" /></div><div class=\"bus_way1_pubtitle\">步行至街对面<a style=\"cursor:pointer;\" onclick=\"ShowPointer({0}, {1}, true)\"><u>{2}</u></a><span>{3}米</span></div></li>", node.ToStation.PositionX, node.ToStation.PositionY, node.ToStation.StationName, node.PassLength);
            phonetemp += "到街对面" + node.ToStation.StationName + "";
        }
        else {
            if (node.FromStation.StationID != node.ToStation.StationID) {
                var temp = '';
                var tempbusline = '';
                phonetemp += ",坐";
                for (var j = 0; j < node.PassVehicle.length; j++) {
                    var v = node.PassVehicle[j];
                    if (j == 0) {
                        title += v.VehicleName;
                    }
                    if (j > 0) {
                        tempbusline += "或";
                    }

                    if (node.PassVehicle.VehicleType == "3") {
                        tempbusline += "<a href=\"javascript:;\">" + v.VehicleName + "</a>";
                    }
                    else {
                        tempbusline += "<a href=\"javascript:;\">" + v.VehicleName + "</a>" + "路";
                    }
                    phonetemp += v.VehicleName + "或";
                }
                phonetemp = phonetemp.substring(0, (phonetemp.length - 1));
                phonetemp += "在" + node.ToStation.StationName + "下车";
                if (node.PassVehicle.VehicleType == "3") {
                    temp = "<li><div class=\"bus_way1_pubico\"><img src=\"images/bus_ico5.gif\" border=\"0\" /></div><div class=\"bus_way1_pubtitle\">乘坐<u>{$busline}</u>,在<a style=\"cursor:pointer;\" onclick=\"ShowPointer({$x}, {$y}, true)\"><u>{$tStationName}</u></a>下车<span>{$num}站</span></div></li>";
                }
                else {
                    temp = "<li><div class=\"bus_way1_pubico\"><img src=\"images/bus_ico4.gif\" border=\"0\" /></div><div class=\"bus_way1_pubtitle\">乘坐<u>{$busline}</u>,在<a style=\"cursor:pointer;\" onclick=\"ShowPointer({$x}, {$y}, true)\"><u>{$tStationName}</u></a>下车<span>{$num}站</span></div></li>";
                }

                title += "→";
                sb += temp.replace("{$num}", node.PassStationCount).replace("{$x}", node.ToStation.PositionX).replace("{$y}", node.ToStation.PositionY).replace("{$tStationName}", node.ToStation.StationName).replace("{$busline}", tempbusline);
            }
        }
    }
    if (result.StopWalkLength == "0") {
        sb += String.Format("<li><div class=\"bus_way1_pubico\"><img src=\"images/bus_ico8.gif\" border=\"0\" /></div><div class=\"bus_way1_pubtitle\">到达<a style=\"cursor:pointer;\" onclick=\"ShowPointer({0}, {1}, true)\"><u>{2}</u></a></div></li>",
        result.ToArea.PositionX,
        result.ToArea.PositionY,
        e);
        //phonetemp += "到达" + e + "";
    }
    else {
        sb += String.Format("<li><div class=\"bus_way1_pubico\"><img src=\"images/bus_ico8.gif\" border=\"0\" /></div><div class=\"bus_way1_pubtitle\">步行至<a style=\"cursor:pointer;\" onclick=\"ShowPointer({0}, {1}, true)\"><u>{2}</u></a><span>{3}米</span></div></li>",
        result.ToArea.PositionX,
        result.ToArea.PositionY,
        e,
        result.StopWalkLength);
        //phonetemp += "步行至" + e + "(" + result.StopWalkLength + "米)";
    }
    //phonetemp += ".手机地图http://wap.edushi.com/。";
    _phonedata[index - 1] = phonetemp.replaceAll('公交', '');
    sb += end + "</div>";

    var resulttitle = "";
    title = title.substr(0, title.length - 1);
    if (result.TransferNodeList.length == 1) {
        resulttitle += String.Format("<h1 id= \"title_" + result.ID + "\" style=\"cursor:pointer;\" onclick=\"fnDisplayResult(\'" + result.ID + "\');\"><div class=\"bus_way1_ico\">" + index + "</div><div class=\"bus_way1_title\"><b style=\"color:#1066b6;\">{0}</b><br />{1}</div><div class=\"bus_way1_btn\"><img src=\"images/bus_ico3.gif\" border=\"0\" /></div></h1>", title, "[直达]");
    }
    else {
        resulttitle += String.Format("<h1 id= \"title_" + result.ID + "\" style=\"cursor:pointer;\" onclick=\"fnDisplayResult(\'" + result.ID + "\');\"><div class=\"bus_way1_ico\">" + index + "</div><div class=\"bus_way1_title\"><b style=\"color:#1066b6;\">{0}</b><br />{1}</div><div class=\"bus_way1_btn\"><img src=\"images/bus_ico3.gif\" border=\"0\" /></div></h1>", title, "[换乘1次]");
    }

    return "<ul class=\"bus_way1\">" + resulttitle + sb + "</ul>";
}

//显示路径
function fnDisplayResult(id) {
    _busInde = 0;
    var result;
    for (var i = 0; i < _TransferResult.length; i++) {
        if (_TransferResult[i].ID == id) {
            $("#" + _TransferResult[i].ID).show();
            $("#" + _TransferResult[i].ID).parent().addClass("EBus");
            result = _TransferResult[i];
            _busContent = _phonedata[i]; //当前公交线路文字
            _busIndex = i; //当前线路索引
        }
        else {
            $("#" + _TransferResult[i].ID).hide();
            $("#" + _TransferResult[i].ID).parent().removeClass("EBus");
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
    __IsDrawBusLineState = false;
    fnDrawingBusLine(CoordList);
}

function reLoadChange() {
    _startIndex = -1;
    _endIndex = -1;
    _divLoading.show();
    $('#divContent').html("");
    if (EndStation.length > 0) {
        $('#endul').hide();
    }
    fnSearch();
}

function ViewCompleteBusLine() {
    vM.Body.MapSwitch.Switch2D();
    fnDelay();
}

function fnDelay() {
    if (vM.Body.MapState.Succeed) {
        vM.Body.ZoomBar.ZoomTo(6);
    }
    else {
        setTimeout("fnDelay()", 300);
        return;
    }
}

function ShowPointer(x, y) {
    MoveTo(x, y, true);
}

function selectBtn(index) {
    var len = dataCache.length;

    if (index == 2) {
        resultShow(dataSource);
    }

    if (index == 1) {
        for (var i = 0; i < len; i++) {
            for (var k = i + 1; k < len - 1; k++) {
                if (parseInt(dataCache[k].TransferLength) < parseInt(dataCache[i].TransferLength)) {
                    var j = dataCache[i];
                    dataCache[i] = dataCache[k];
                    dataCache[k] = j;
                }
            }
        }
        resultShow(dataCache);
    }

    if (index == 3) {
        for (var i = 0; i < len; i++) {
            for (var k = i + 1; k < len - 1; k++) {
                if (parseInt(dataCache[k].WalkLength) < parseInt(dataCache[i].WalkLength)) {
                    var j = dataCache[i];
                    dataCache[i] = dataCache[k];
                    dataCache[k] = j;
                }
            }
        }
        resultShow(dataCache);
    }
}
//------map  定位显示公交路线------------------
function fnShowBusLine(b1, b2, _index) {

    var _sbusurl = GlobalConfig.EDataCenterUrl + 'CommMap5.0/Bus.aspx?domain=' + window.GlobalConfig.Domain + '&req=9&l=' + window.GlobalConfig.Language + '&Start=' + encodeURIComponent(startName) + '&End=' + encodeURIComponent(endName) + '&rnd=' + $Rnd();
    ENetwork.DownloadScript(_sbusurl, function () {
        if (typeof _StartStation == 'undefined' || _StartStation == null || typeof _EndStation == 'undefined' || _EndStation == null) {
            flgData = false;
        } else {
            if (flgData && _StartStation.length > 0 && _EndStation.length > 0 && _StartStation[0].Value == startName && _EndStation[0].Value == endName) {

                var sItem = _StartStation[0];
                var eItem = _EndStation[0];
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
                var url = GlobalConfig.EDataCenterUrl + 'CommMap5.0/Transfer.aspx?domain=' + GlobalConfig.Domain + '&l=' + GlobalConfig.Language + '&StartId=' + sItem.ID + '&StartName=' + escape(sItem.Value) + '&StartType=' + stempType + '&StartX=' + sItem.X + '&StartY=' + sItem.Y + '&EndId=' + eItem.ID + '&EndName=' + escape(eItem.Value) + '&EndType=' + etempType + '&EndX=' + eItem.X + '&EndY=' + eItem.Y + '&rnd=' + $Rnd();


                ENetwork.DownloadScript(url, function () {
                    if (typeof _TransferResult != "undefined" && _TransferResult != null && _TransferResult.length > 0) {
                        dataCache = _TransferResult;
                        dataSource = ObjectClone(_TransferResult);
                        var data = _TransferResult;
                        if (data.length > 0 && _busIndex < data.length) {
                            fnDisplayResult(data[_busIndex].ID);
                            fnGotoBusStation(data[_busIndex].StartStation.StationID, data[_busIndex].StartStation.StationName, data[_busIndex].StartStation.PositionX, data[_busIndex].StartStation.PositionY);
                        }
                    }
                });
            }
        }
    });
}
