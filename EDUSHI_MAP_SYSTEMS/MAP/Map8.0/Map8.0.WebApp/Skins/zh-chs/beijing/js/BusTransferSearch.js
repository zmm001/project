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

var StartAndEndMarker = []; //起终点覆盖物
var tArrayWalk = new Array(); //步行覆盖物
var tArrayLine = new Array(); //公交覆盖物
var tArrayWalkLast = new Array(); //最后一个步行覆盖物
var tArrayBusAndSubWayOn = new Array(); //上车点
var tArrayBusAndSubWayOff = new Array(); //下车点
var tArrayBusAndSubWayType = new Array(); //坐车类型
var local_s = null; //搜索起点对象
var local_e = null; //搜索终点对象
var startKey = ""; //起点
var endKey = ""; //终点
var LocalSearchOptions_s = null; //搜索起点选项
var LocalSearchOptions_e = null; //搜索终点选项
var Result_s = null; //起点结果
var Result_e = null; //终点结果
var Html = "";
var IsPage_S = false; //是否起点分页
var IsPage_E = false; //是否终点分页
var Choose_s = ""; //选择起点的值
var Choose_e = ""; //选择终点的值
var transit = null; //公交导航对象
//var transitrouteresults = null; //公交导航结果
var policyValue = null; //公交导航的策略参数：BMAP_TRANSIT_POLICY_LEAST_TIME（最少时间），BMAP_TRANSIT_POLICY_LEAST_TRANSFER（最少换乘），BMAP_TRANSIT_POLICY_LEAST_WALKING（最少步行），BMAP_TRANSIT_POLICY_AVOID_SUBWAYS（不乘地铁）
var BMap_Map_Child = null;
var ResultMode = 'edushi'; //结果模式
if (parent.vM.MapState.Map == 0) {
    ResultMode = 'edushi'; //edushi模式
    window.onload = fnOnload;
}
else {
    ResultMode = 'baidu'; //baidu模式
    window.onload = fnOnload_BD();
}
function fnOnload() {
    if (!window.Config) {
        setTimeout('fnOnload()', 200);
        return;
    }
    if (parseInt(fnGetWindowHeight() - 75) > 0) {
        $('TabContent').style.height = fnGetWindowHeight() - 75 + 'px';
    }

    $('TabContent').innerHTML = this.Config.Loading;

    var url;
    url = window.Config.DataCetnerSearchDataUrl + "SearchBusTwoStationSuggest/" + window.Config.CityCode + "/" + window.Config.Language + "/Format/Json/Search?startquery=" + encodeURIComponent(unescape(fnRequest('s'))) + "&endquery=" + encodeURIComponent(unescape(fnRequest('e')));
    LoadHTML = '';
    ENetwork.DownloadScript(url, function() {
        if (typeof _StartStation == 'undefined' || _StartStation == null) {
            LoadHTML = "<div id=\"start\" class=\"no-point\">起点：<strong>" + unescape(fnRequest('s')) + "</strong><p>不存在或尚未登记，请输入周边地名或试试该建筑物的名称</p></div>";
            flgData = false;
        }
        else {
            fnLoadStartList(0);
        }

        if (typeof _EndStation == 'undefined' || _EndStation == null) {
            LoadHTML += "<div id=\"end\" class=\"no-point\">终点：<strong>" + unescape(fnRequest('e')) + "</strong><p>不存在或尚未登记，请输入周边地名或试试该建筑物的名称</p></div>";
            flgData = false;
        }
        else {
            fnLoadEndList(0);
        }

        LoadHTML = "<div id = \"sContent\" style=\"font-size:14px; padding:5px;\">请选择准确的起点和终点：</div>" + LoadHTML;

        if (flgData && _StartStation.length > 0 && _EndStation.length > 0 && _StartStation[0].Value == unescape(fnRequest('s')) && _EndStation[0].Value == unescape(fnRequest('e'))) {
            fnTransfer(0, 0);
        }
        else {
            $('TabContent').className = "bus_box2";
            $('TabContent').innerHTML = LoadHTML;
            if (flgData && _EndStation.length > 0) {
                $('endul').style.display = "none";
            }
            reLoadPageSize();
        }
    });

    //广告
//    var script = this.$C('script');
//    script.type = 'text/javascript';
//    script.language = 'javascript';
//    script.src = window.Config.DataCetnerAdDataUrl + 'Ad2.0/ads.aspx?citycode=' + window.Config.CityCode + '&l=' + window.Config.Language + '&key=gongjiaoliebiao&domid=div_ad';
//    document.getElementsByTagName('head')[0].appendChild(script);
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
        $('startDiv').className = "bus_blue";
        $('startul').style.display = "none";
        $('startStationName').innerHTML = StartStation[i].Value;
        _startIndex = i;
        if (_startIndex != -1 && _endIndex != -1) {
            fnTransfer(_startIndex, _endIndex);
        }
        else {
            if ($('endul') != null) {
                $('endul').style.display = "";
            }
        }
    }

    if (type == '2') {
        moveto(EndStation[i].X, EndStation[i].Y, 2);
        $('endLi' + i).style.display = "none";
        $('endDiv').className = "bus_blue";
        $('endul').style.display = "none";
        $('endStationName').innerHTML = EndStation[i].Value;
        _endIndex = i;
        if (_startIndex != -1 && _endIndex != -1) {
            fnTransfer(_startIndex, _endIndex);
        }
        else {
            if ($('startul') != null) {
                $('startul').style.display = "";
            }
        }
    }
}

function inputclick_BD(type, i, StationName) {
    //    if (!flgData)
    //        return;
    if (type == '1') {
        //moveto(StartStation[i].X, StartStation[i].Y, 1);
        $('startLi' + i).style.display = "none";
        $('startDiv').className = "bus_blue";
        $('startul').style.display = "none";
        $('startStationName').innerHTML = StationName; //StartStation[i].Value;
        //_startIndex = i;
        Choose_s = StationName;
        if (Choose_s != "" && Choose_e != "") {
            Transfer_BD(Choose_s, Choose_e, policyValue);
            //fnTransfer(_startIndex, _endIndex);
        }
        else {
            if ($('endul') != null) {
                $('endul').style.display = "";
            }
        }
    }

    if (type == '2') {
        //moveto(EndStation[i].X, EndStation[i].Y, 2);
        $('endLi' + i).style.display = "none";
        $('endDiv').className = "bus_blue";
        $('endul').style.display = "none";
        $('endStationName').innerHTML = StationName; //EndStation[i].Value;
        //_endIndex = i;
        Choose_e = StationName;
        if (Choose_s != "" && Choose_e != "") {
            Transfer_BD(Choose_s, Choose_e, policyValue);
            //fnTransfer(_startIndex, _endIndex);
        }
        else {
            if ($('startul') != null) {
                $('startul').style.display = "";
            }
        }
    }
}

function divClick(type) {
    if (!flgData)
        return;
    if (type == '1') {
        if ($('endul') != null) {
            $('endul').style.display = "none";
        }
        $('startul').style.display = "";
        $('startDiv').className = "bus_red";
        _startIndex = -1;
    }

    if (type == '2') {
        if ($('startul') != null) {
            $('startul').style.display = "none";
        }
        $('endul').style.display = "";
        $('endDiv').className = "bus_red";
        _endIndex = -1;
    }
}

function divClick_BD(type) {
//    if (!flgData)
//        return;
    if (type == '1') {
        if ($('endul') != null) {
            $('endul').style.display = "none";
        }
        $('startul').style.display = "";
        $('startDiv').className = "bus_red";
        //_startIndex = -1;
        Choose_s = "";
    }

    if (type == '2') {
        if ($('startul') != null) {
            $('startul').style.display = "none";
        }
        $('endul').style.display = "";
        $('endDiv').className = "bus_red";
        //_endIndex = -1;
        Choose_e = "";
    }
}

function fnLoadStartList(type) {
    var HtmlStartTitle = "";
    if (type == 1) {
        HtmlStartTitle += "      <div class=\"bus_red\" id = \"startDiv\">";
        HtmlStartTitle += "			<h1 id=\"startStationH1\" onclick=\"divClick(1);\" style=\"cursor:pointer;\">";
        HtmlStartTitle += "				<div class=\"pub_ico\"></div>";
        HtmlStartTitle += "				<div class=\"pub_t\"><p>起点：<strong id=\"startStationName\">{$StartStation}</strong></p>";
        HtmlStartTitle += "					<a href=\"#\"></a>";
        HtmlStartTitle += "				</div>";
        HtmlStartTitle += "			</h1>";
        HtmlStartTitle += "			<div id=\"startul\"><ul class=\"pub_con\" id=\"divstartul\">{$startStationLi}</ul><div class=\"Paginate\">{$Page}</div></div>";
        HtmlStartTitle += "		 </div>";
//        HtmlStartTitle += "		<div class=\"bus_red\" id = \"startDiv\">";
//        HtmlStartTitle += "			<h1 id=\"startStationH1\" onclick=\"divClick(1);\" style=\"cursor:pointer;\">";
//        HtmlStartTitle += "				<div class=\"pub_ico\"></div>";
//        HtmlStartTitle += "				<div class=\"pub_t\"><span style=\"display:block; float:left;\">起点：</span><span style=\"width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block; float:left;font-weight:bold;\" id=\"startStationName\">{$StartStation}</span>";
//        HtmlStartTitle += "					<a href=\"#\"></a>";
//        HtmlStartTitle += "				</div>";
//        HtmlStartTitle += "			</h1>";
//        HtmlStartTitle += "			<div id=\"startul\"><ul class=\"pub_con\" id=\"divstartul\">{$startStationLi}</ul><div class=\"Paginate\" style=\"text-align:center;\">{$Page}</div></div>";
//        HtmlStartTitle += "		</div>";
    }
    else if (type == 0) {
        HtmlStartTitle += "		<div class=\"bus_g_r\" id=\"StartContent\">";
        HtmlStartTitle += "      <div class=\"bus_red\" id = \"startDiv\">";
        HtmlStartTitle += "			<h1 id=\"startStationH1\" onclick=\"divClick(1);\" style=\"cursor:pointer;\">";
        HtmlStartTitle += "				<div class=\"pub_ico\"></div>";
        HtmlStartTitle += "				<div class=\"pub_t\"><p>起点：<strong id=\"startStationName\">{$StartStation}</strong></p>";
        HtmlStartTitle += "					<a href=\"#\"></a>";
        HtmlStartTitle += "				</div>";
        HtmlStartTitle += "			</h1>";
        HtmlStartTitle += "			<div id=\"startul\"><ul class=\"pub_con\" id=\"divstartul\">{$startStationLi}</ul><div class=\"Paginate\">{$Page}</div></div>";
        HtmlStartTitle += "		 </div>";
        HtmlStartTitle += "   </div>";
//        HtmlStartTitle += "		<div class=\"bus_g_r\" id=\"StartContent\"><div class=\"bus_red\" id = \"startDiv\">";
//        HtmlStartTitle += "			<h1 id=\"startStationH1\" onclick=\"divClick(1);\" style=\"cursor:pointer;\">";
//        HtmlStartTitle += "				<div class=\"pub_ico\"></div>";
//        HtmlStartTitle += "				<div class=\"pub_t\"><span style=\"display:block; float:left;\">起点：</span><span style=\"width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block; float:left;font-weight:bold;\" id=\"startStationName\">{$StartStation}</span>";
//        HtmlStartTitle += "					<a href=\"#\"></a>";
//        HtmlStartTitle += "				</div>";
//        HtmlStartTitle += "			</h1>";
//        HtmlStartTitle += "			<div id=\"startul\"><ul class=\"pub_con\" id=\"divstartul\">{$startStationLi}</ul><div class=\"Paginate\" style=\"text-align:center;\">{$Page}</div></div>";
//        HtmlStartTitle += "		</div></div>";

    }

    var HtmlLi = "";
    HtmlLi += "				<li onmouseover=\"a({$type},{$num});\" onmouseout = \"b({$type},{$num});\" class=\"clearfix\">";
    HtmlLi += "					<div class=\"pub_nub_r\" >{$i}</div>";
    HtmlLi += "					<div style=\"float:left;\"><div class=\"pub_place\"><a style=\"cursor:pointer;\" onclick=\"moveto({$X},{$Y},1);\">{$stationName}</a></div><div style=\"width:200px;color:#7a7a7a;\">{$Address}</div></div>";
    HtmlLi += "					<div class=\"setPoint-btn\"><input id=\"{$Li}\" onclick = \"inputclick({$type},{$num});\" type=\"button\" class=\"pub_chobtn\" value=\"选择起点\" style=\"display:none;\" /></div>";
    HtmlLi += "				</li>";
//    HtmlLi += "				<li onmouseover=\"a({$type},{$num});\" onmouseout = \"b({$type},{$num});\">";
//    HtmlLi += "					<div class=\"pub_nub_r\" >{$i}</div>";
//    HtmlLi += "					<div style=\"float:left;\"><div class=\"pub_place\"><a style=\"cursor:pointer;\" onclick=\"moveto({$X},{$Y},1);\">{$stationName}</a></div><div style=\"margin:5px 0 0 5px;width:200px;\">{$Address}</div></div>";
//    HtmlLi += "					<div style=\"height:20px;float:left;width:100%;padding:0 0 5px 0;text-align:center;\"><input id=\"{$Li}\" onclick = \"inputclick({$type},{$num});\" type=\"button\" class=\"pub_chobtn\" value=\"选择起点\" style=\"display:none;\" /></div>";
//    HtmlLi += "				</li>";

    if (typeof _StartStation == 'undefined' || _StartStation == null) {
        LoadHTML = "<div id=\"start\" class=\"no-point\">起点：<strong>" + unescape(fnRequest('s')) + "</strong><p>不存在或尚未登记，请输入周边地名或试试该建筑物的名称</p></div>";
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
            start = "<div id=\"start\" class=\"no-point\">起点：<strong>" + unescape(fnRequest('s')) + "</strong><p>不存在或尚未登记，请输入周边地名或试试该建筑物的名称</p></div>";
        }

        if (type == 1) {
            $('StartContent').innerHTML = start;
        }
        else if (type == 0) {
            LoadHTML = start;
        }
    }
}

function moveto(x, y, type) {
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
        HtmlEndTitle += "        <div class=\"bus_red\" id = \"endDiv\" >";
        HtmlEndTitle += "			<h1 id=\"endStationH1\" onclick=\"divClick(2);\" style=\"cursor:pointer;\">";
        HtmlEndTitle += "				<div class=\"pub_ico\"></div>";
        HtmlEndTitle += "				<div class=\"pub_t\"><p>终点：<strong id=\"endStationName\">{$EndStation}</strong></p>";
        HtmlEndTitle += "				<a href=\"#\"></a>";
        HtmlEndTitle += "				</div>";
        HtmlEndTitle += "			</h1>";
        HtmlEndTitle += "			<div id=\"endul\"><ul class=\"pub_con\" id=\"divendul\">{$endStationLi}</ul><div class=\"Paginate\">{$Page}</div></div>";
        HtmlEndTitle += "		 </div>";
//        HtmlEndTitle += "		<div class=\"bus_red\" id = \"endDiv\" >";
//        HtmlEndTitle += "			<h1 id=\"endStationH1\" onclick=\"divClick(2);\" style=\"cursor:pointer;\">";
//        HtmlEndTitle += "				<div class=\"pub_ico\"></div>";
//        HtmlEndTitle += "				<div class=\"pub_t\"><span style=\"display:block; float:left;\">终点：</span><span style=\"width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block; float:left;font-weight:bold;\" id=\"endStationName\">{$EndStation}</span>";
//        HtmlEndTitle += "				<a href=\"#\"></a>";
//        HtmlEndTitle += "				</div>";
//        HtmlEndTitle += "			</h1>";
//        HtmlEndTitle += "			<div id=\"endul\"><ul class=\"pub_con\" id=\"divendul\">{$endStationLi}</ul><div class=\"Paginate\" style=\"text-align:center;\">{$Page}</div></div>";
//        HtmlEndTitle += "		</div>";
    }
    else if (type == 0) {
        HtmlEndTitle += "		<div class=\"bus_g_r\" id=\"EndContent\">";
        HtmlEndTitle += "        <div class=\"bus_red\" id = \"endDiv\" >";
        HtmlEndTitle += "			<h1 id=\"endStationH1\" onclick=\"divClick(2);\" style=\"cursor:pointer;\">";
        HtmlEndTitle += "				<div class=\"pub_ico\"></div>";
        HtmlEndTitle += "				<div class=\"pub_t\"><p>终点：<strong id=\"endStationName\">{$EndStation}</strong></p>";
        HtmlEndTitle += "				<a href=\"#\"></a>";
        HtmlEndTitle += "				</div>";
        HtmlEndTitle += "			</h1>";
        HtmlEndTitle += "			<div id=\"endul\"><ul class=\"pub_con\" id=\"divendul\">{$endStationLi}</ul><div class=\"Paginate\">{$Page}</div></div>";
        HtmlEndTitle += "		 </div>";
        HtmlEndTitle += "       </div>";
//        HtmlEndTitle += "		<div class=\"bus_g_r\" id=\"EndContent\"><div class=\"bus_red\" id = \"endDiv\" >";
//        HtmlEndTitle += "			<h1 id=\"endStationH1\" onclick=\"divClick(2);\" style=\"cursor:pointer;\">";
//        HtmlEndTitle += "				<div class=\"pub_ico\"></div>";
//        HtmlEndTitle += "				<div class=\"pub_t\"><span style=\"display:block; float:left;\">终点：</span><span style=\"width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block; float:left;font-weight:bold;\" id=\"endStationName\">{$EndStation}</span>";
//        HtmlEndTitle += "				<a href=\"#\"></a>";
//        HtmlEndTitle += "				</div>";
//        HtmlEndTitle += "			</h1>";
//        HtmlEndTitle += "			<div id=\"endul\"><ul class=\"pub_con\" id=\"divendul\">{$endStationLi}</ul><div class=\"Paginate\" style=\"text-align:center;\">{$Page}</div></div>";
//        HtmlEndTitle += "		</div></div>";
    }

    var HtmlLi = "";
    HtmlLi += "				<li onmouseover=\"a({$type},{$num});\" onmouseout = \"b({$type},{$num});\" class=\"clearfix\">";
    HtmlLi += "					<div class=\"pub_nub_r\" >{$i}</div>";
    HtmlLi += "					<div style=\"float:left;\"><div class=\"pub_place\"><a style=\"cursor:pointer;\" onclick=\"moveto({$X},{$Y},2);\">{$stationName}</a></div><div style=\"width:200px;color:#7a7a7a;\">{$Address}</div></div>";
    HtmlLi += "					<div class=\"setPoint-btn\"><input id=\"{$Li}\" onclick = \"inputclick({$type},{$num});\" type=\"button\" class=\"pub_chobtn\" value=\"选择终点\" style=\"display:none;\" /></div>";
    HtmlLi += "				</li>";
//    HtmlLi += "				<li onmouseover=\"a({$type},{$num});\" onmouseout = \"b({$type},{$num});\">";
//    HtmlLi += "					<div class=\"pub_nub_r\" >{$i}</div>";
//    HtmlLi += "					<div style=\"float:left;\"><div class=\"pub_place\"><a style=\"cursor:pointer;\" onclick=\"moveto({$X},{$Y},2);\">{$stationName}</a></div><div style=\"margin:5px 0 0 5px;width:200px;\">{$Address}</div></div>";
//    HtmlLi += "					<div style=\"height:20px;float:left;width:100%;padding:0 0 5px 0;text-align:center;\"><input id=\"{$Li}\" onclick = \"inputclick({$type},{$num});\" type=\"button\" class=\"pub_chobtn\" value=\"选择终点\" style=\"display:none;\" /></div>";
//    HtmlLi += "				</li>";

    if (typeof _EndStation == 'undefined' || _EndStation == null) {
        LoadHTML += "<div id=\"end\" class=\"no-point\">终点：<strong>" + unescape(fnRequest('e')) + "</strong><p>不存在或尚未登记，请输入周边地名或试试该建筑物的名称</p></div>";
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
            end = "<div id=\"end\" class=\"no-point\">终点：<strong>" + unescape(fnRequest('e')) + "</strong><p>不存在或尚未登记，请输入周边地名或试试该建筑物的名称</p></div>";
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

    var url = window.Config.BusDeuceSearchUrl + '/Transfer.aspx?domain=' + window.Config.Domain + '&l=' + window.Config.Language + '&StartId=' + sItem.ID + '&StartName=' + encodeURIComponent(sItem.Value) + '&StartType=' + stempType + '&StartX=' + sItem.X + '&StartY=' + sItem.Y + '&EndId=' + eItem.ID + '&EndName=' + encodeURIComponent(eItem.Value) + '&EndType=' + etempType + '&EndX=' + eItem.X + '&EndY=' + eItem.Y;

    ENetwork.DownloadScript(url, function() {
        if (typeof _TransferResult == "undefined" || _TransferResult == null) {
            $('TabContent').innerHTML = "<div><span style=\"float:left;display:block;\"><img src=\"../Images/Face.gif\" /></span><span style=\"float:left;display:block;line-height:24px;font-size:14px;padding:10px 0;color:#666;\">抱歉，没有符合您要求的乘车路线，<br />请重新输入周边地名或公交站搜索或</span></div><a onclick=\"reLoadChange();\" style=\"cursor:pointer;display:block;font-size:14px;float:right;width:120px;margin:0px 20px 0 0;font-weight:bold;text-align:center;color:#36f;\">重新选择起点终点</a>";
        }
        else {
            if (_TransferResult.length < 1) {
                $('TabContent').innerHTML = "<div><span style=\"float:left;display:block;\"><img src=\"../Images/Face.gif\" /></span><span style=\"float:left;display:block;line-height:24px;font-size:14px;padding:10px 0;color:#666;\">抱歉，没有符合您要求的乘车路线，<br />请重新输入周边地名或公交站搜索或</span></div><a onclick=\"reLoadChange();\" style=\"cursor:pointer;display:block;font-size:14px;float:right;width:120px;margin:0px 20px 0 0;font-weight:bold;text-align:center;color:#36f;\">重新选择起点终点</a>";
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
    var sHtml = '';
    for (var i = 0; i < data.length; i++) {
        sHtml += fnShowTransferResult(data[i], i + 1, startName, endName);
    }
    sHtml += "<a onclick=\"reLoadChange();\" style=\"cursor:pointer;display:block;font-size:14px;float:right;width:120px;margin:5px 20px 0 0;font-weight:bold;text-align:center;color:#36f;\">重新选择起点终点</a>";
    $('TabContent').innerHTML = sHtml;
    $('TabContent').className = "bus_box";
    $('bus_radio').style.display = '';
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
    var start = "";
    start += "			<li>";
    start += "				<div class=\"bus_way1_title2\" title=" + s + ">起点：" + _s + "<!--<a style=\"cursor:pointer;\" onclick=\"ViewCompleteBusLine();\">显示整条路线</a>--></div>";
    start += "			</li>";

    var end = "";
    end += "			<li>";
    end += "				<div class=\"bus_way1_title2\" title=" + e + "><span>终点：" + _e + "</span></div>";
    end += "			</li>";
    end += "			<li class=\"bus_way1_down\"><span style=\"height:16px;display:block;float:left;\"><img src=\"../images/pcde_170.png\"  style=\"display:none;\" /></span><a style=\"height:16px;display:none;float:left;cursor:pointer;\" onclick=\"parent.ShowSendHtml(_phonedata[" + (index - 1) + "]);\"><b>免费发送到手机</b></a></li>"; //>> 全程" + result.TransferLength / 1000 + "公里 

    var walk = "";
    walk += "			<li>";
    walk += "				<div class=\"bus_way1_pubico\"><img src=\"../images/bus_ico8.png\" border=\"0\" /></div>";
    walk += "				<div class=\"bus_way1_pubtitle\">步行至{$station}<span>100米</span></div>";
    walk += "			</li>";

    var subway = "";
    subway += "			<li>";
    subway += "				<div class=\"bus_way1_pubico\"><img src=\"../images/bus_ico5.png\" border=\"0\" /></div>";
    subway += "				<div class=\"bus_way1_pubtitle\">乘坐<a href=\"#\"><b>地铁一号线</b></a><span>100米</span></div>";
    subway += "			</li>";

    var tempwalk = walk;

    var title = "";
    var sa = "";

    var sb = "<div id=" + result.ID + " class=\"border-div\" style=\"display:none;\">" + start;
    //phonetemp += "" + _s + "-->" + _e + "";
    if (result.StartWalkLength == "0") {
        sb += string.Format("<li><div class=\"bus_way1_pubico\"><img src=\"../images/bus_ico8.png\" border=\"0\" /></div><div class=\"bus_way1_pubtitle\">在<a style=\"cursor:pointer;\" onclick=\"ShowPointer({0}, {1}, true)\"><u>{2}</u></a>上车</div></li>"
        , result.StartStation.PositionX
        , result.StartStation.PositionY
        , result.StartStation.StationName, result.StartWalkLength);
        phonetemp += "从" + result.StartStation.StationName + "";
    }
    else {
        sb += string.Format("<li><div class=\"bus_way1_pubico\"><img src=\"../images/bus_ico8.png\" border=\"0\" /></div><div class=\"bus_way1_pubtitle\">步行至<a style=\"cursor:pointer;\" onclick=\"ShowPointer({0}, {1}, true)\"><u>{2}</u></a><span>{3}米</span></div></li>"
        , result.StartStation.PositionX
        , result.StartStation.PositionY
        , result.StartStation.StationName, result.StartWalkLength);
        phonetemp += "从" + result.StartStation.StationName + "";
    }
    for (var i = 0; i < result.TransferNodeList.length; i++) {
        var node = result.TransferNodeList[i];
        if (node.NodeType == 'WalkTransfer') {
            sb += string.Format("<li><div class=\"bus_way1_pubico\"><img src=\"../images/bus_ico8.png\" border=\"0\" /></div><div class=\"bus_way1_pubtitle\">步行至街对面<a style=\"cursor:pointer;\" onclick=\"ShowPointer({0}, {1}, true)\"><u>{2}</u></a><span>{3}米</span></div></li>", node.ToStation.PositionX, node.ToStation.PositionY, node.ToStation.StationName, node.PassLength);
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
                        tempbusline += "<a href=\"javascript:parent.fnOnBusClick(" + v.VehicleID + ",'" + v.VehicleName + "');\">" + v.VehicleName + "</a>";
                    }
                    else {
                        tempbusline += "<a href=\"javascript:parent.fnOnBusClick(" + v.VehicleID + ",'" + v.VehicleName + "');\">" + v.VehicleName + "</a>" + "路";
                    }
                    phonetemp += v.VehicleName + "或";
                }
                phonetemp = phonetemp.substring(0, (phonetemp.length - 1));
                phonetemp += "在" + node.ToStation.StationName + "下车";
                if (node.PassVehicle.VehicleType == "3") {
                    temp = "<li><div class=\"bus_way1_pubico\"><img src=\"../images/bus_ico5.png\" border=\"0\" /></div><div class=\"bus_way1_pubtitle\">乘坐<u>{$busline}</u>,在<a style=\"cursor:pointer;\" onclick=\"ShowPointer({$x}, {$y}, true)\"><u>{$tStationName}</u></a>下车<span>{$num}站</span></div></li>";
                }
                else {
                    temp = "<li><div class=\"bus_way1_pubico\"><img src=\"../images/bus_ico4.png\" border=\"0\" /></div><div class=\"bus_way1_pubtitle\">乘坐<u>{$busline}</u>,在<a style=\"cursor:pointer;\" onclick=\"ShowPointer({$x}, {$y}, true)\"><u>{$tStationName}</u></a>下车<span>{$num}站</span></div></li>";
                }

                title += "→";
                sb += temp.replace("{$num}", node.PassStationCount).replace("{$x}", node.ToStation.PositionX).replace("{$y}", node.ToStation.PositionY).replace("{$tStationName}", node.ToStation.StationName).replace("{$busline}", tempbusline);
            }
        }
    }
    if (result.StopWalkLength == "0") {
        sb += string.Format("<li><div class=\"bus_way1_pubico\"><img src=\"../images/bus_ico8.png\" border=\"0\" /></div><div class=\"bus_way1_pubtitle\">到达<a style=\"cursor:pointer;\" onclick=\"ShowPointer({0}, {1}, true)\"><u>{2}</u></a></div></li>",
        result.ToArea.PositionX,
        result.ToArea.PositionY,
        e);
        //phonetemp += "到达" + e + "";
    }
    else {
        sb += string.Format("<li><div class=\"bus_way1_pubico\"><img src=\"../images/bus_ico8.png\" border=\"0\" /></div><div class=\"bus_way1_pubtitle\">步行至<a style=\"cursor:pointer;\" onclick=\"ShowPointer({0}, {1}, true)\"><u>{2}</u></a><span>{3}米</span></div></li>",
        result.ToArea.PositionX,
        result.ToArea.PositionY,
        e,
        result.StopWalkLength);
        //phonetemp += "步行至" + e + "(" + result.StopWalkLength + "米)";
    }
    phonetemp += ".e卡包http://ka.edushi.com/。";
    _phonedata[index - 1] = phonetemp.replaceAll('公交', '');
    sb += end + "</div>";

    var resulttitle = "";
    title = title.substr(0, title.length - 1);
    if (result.TransferNodeList.length == 1) {
        //resulttitle += string.Format("<h1 id= \"title_" + result.ID + "\" style=\"cursor:pointer;\" onclick=\"fnDisplayResult(\'" + result.ID + "\');\"><div class=\"bus_way1_ico\">" + index + "</div><div class=\"bus_way1_title\"><b style=\"color:#1066b6;\">{0}</b><br />{1}</div><div class=\"bus_way1_btn\"><img src=\"../images/bus_ico3.gif\" border=\"0\" /></div></h1>", title, "[直达]");
        resulttitle += string.Format("<h1 id= \"title_" + result.ID + "\" class=\"clearfix\" onclick=\"fnDisplayResult(\'" + result.ID + "\');\"><div class=\"bus_way1_ico\">" + index + "</div><div class=\"bus_way1_title\"><b>{0}</b><p>{1}&nbsp;&nbsp;全程" + result.TransferLength / 1000 + "公里</p></div><div class=\"bus_way1_btn\"><img src=\"../images/bus_ico3.gif\" border=\"0\" /></div></h1>", title, "[直达]");
    }
    else {
        //resulttitle += string.Format("<h1 id= \"title_" + result.ID + "\" style=\"cursor:pointer;\" onclick=\"fnDisplayResult(\'" + result.ID + "\');\"><div class=\"bus_way1_ico\">" + index + "</div><div class=\"bus_way1_title\"><b style=\"color:#1066b6;\">{0}</b><br />{1}</div><div class=\"bus_way1_btn\"><img src=\"../images/bus_ico3.gif\" border=\"0\" /></div></h1>", title, "[换乘1次]");
        resulttitle += string.Format("<h1 id= \"title_" + result.ID + "\" class=\"clearfix\" onclick=\"fnDisplayResult(\'" + result.ID + "\');\"><div class=\"bus_way1_ico\">" + index + "</div><div class=\"bus_way1_title\"><b>{0}</b><p>{1}&nbsp;&nbsp;全程" + result.TransferLength / 1000 + "公里</p></div><div class=\"bus_way1_btn\"><img src=\"../images/bus_ico3.gif\" border=\"0\" /></div></h1>", title, "[换乘1次]");
    }

    return "<ul class=\"bus_way1\" id=\"ResultUL" + result.ID + "\">" + resulttitle + sb + "</ul>";
}

function fnDisplayResult(id) {
    var result;
    for (var i = 0; i < _TransferResult.length; i++) {
        if (_TransferResult[i].ID == id) {
            $(_TransferResult[i].ID).style.display = 'block';
            $('ResultUL' + _TransferResult[i].ID).className = $('ResultUL' + _TransferResult[i].ID).className + ' bus-lineHover';
            result = _TransferResult[i];
        }
        else {
            $(_TransferResult[i].ID).style.display = 'none';
            $('ResultUL' + _TransferResult[i].ID).className = 'bus_way1';
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
    parent.fnDrawingBusLine(CoordList);
}

function fnDisplayResult_BD(objId) {
    var index = objId.replace("resultDiv", "");
    var myjq = parent.jQuery;
    var div = myjq(".border-div", document);
    for (var i = 1; i <= div.length; i++) {
        if (index == i) {
            $('resultDiv' + i).style.display = 'block';
            $('ResultUL_BD' + i).className = $('ResultUL_BD' + i).className + ' bus-lineHover';
        }
        else {
            $('resultDiv' + i).style.display = 'none';
            $('ResultUL_BD' + i).className = 'bus_way1';
        }
    }
    BMap_Map_Child.clearOverlays();
    var TempWalk = tArrayWalk[index - 1];
    var TempLine = tArrayLine[index - 1];
    var TempWalkLast = tArrayWalkLast[index - 1];
    for (var i = 0; i < TempWalk.length; i++) {
        //这里walk.getPath()应该返回的直接是Array<Point>应该可以直接用作添加吧？
        //利用Polyline(points:Array<Point>[, opts:PolylineOptions])构造一个Polyline用来显示覆盖物
        var polyline_walk = new parent.vM.ContentWindow.BMap.Polyline(TempWalk[i], { strokeColor: "green", strokeStyle: "dashed" }); //步行
        var polyline_line = new parent.vM.ContentWindow.BMap.Polyline(TempLine[i], { strokeColor: "blue", strokeStyle: "solid" }); //公交
        BMap_Map_Child.addOverlay(polyline_walk);
        BMap_Map_Child.addOverlay(polyline_line);
        if (TempWalkLast.length > 0) {
            var polyline_walk_last = new parent.vM.ContentWindow.BMap.Polyline(TempWalkLast[0], { strokeColor: "green", strokeStyle: "dashed" }); //最后一个步行
            BMap_Map_Child.addOverlay(polyline_walk_last);
        }
    }
    BMap_Map_Child.addOverlay(StartAndEndMarker[0]);
    BMap_Map_Child.addOverlay(StartAndEndMarker[1]);

    var TempOn = tArrayBusAndSubWayOn[index - 1];
    var TempOff = tArrayBusAndSubWayOff[index - 1];
    var TempType = tArrayBusAndSubWayType[index - 1]
    for (var i = 0; i < TempOn.length; i++) {
        var poiOn = TempOn[i];
        var poiOff = TempOff[i];
        var type = TempType[i];
        var myIcon = null;
        if (type == parent.vM.ContentWindow.BMAP_LINE_TYPE_BUS) {
            //alert("bus");
            myIcon = new parent.vM.ContentWindow.BMap.Icon("/images/bus_print.png", new parent.vM.ContentWindow.BMap.Size(21, 21));
        }
        else {
            //alert("way");
            myIcon = new parent.vM.ContentWindow.BMap.Icon("/images/subway_print.png", new parent.vM.ContentWindow.BMap.Size(21, 21));
        }

        var markerOn = new parent.vM.ContentWindow.BMap.Marker(poiOn.point, { icon: myIcon });
        var markerOff = new parent.vM.ContentWindow.BMap.Marker(poiOff.point, { icon: myIcon });
        BMap_Map_Child.addOverlay(markerOn);
        BMap_Map_Child.addOverlay(markerOff);
    }
}

function reLoadChange() {
    _startIndex = -1;
    _endIndex = -1;
    $('bus_radio').style.display = 'none';
    $('TabContent').innerHTML = this.Config.Loading;
    $('TabContent').className = "bus_box2";
    $('TabContent').innerHTML = LoadHTML;
    if (EndStation.length > 0) {
        $('endul').style.display = "none";
    }
    reLoadPageSize();
    fnResize();
}

function reLoadChange_BD() {
    Choose_s = "";
    Choose_e = "";
    $('bus_radio_bd').style.display = 'none';
    $('TabContent').innerHTML = this.Config.Loading;
    $('TabContent').className = "bus_box2";
    $('TabContent').innerHTML = Html;
    if (Result_e.getCurrentNumPois() > 0) {
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
    var allLi = document.getElementById('bus_radio').getElementsByTagName('li');
    for (var i = 0; i < allLi.length; i++) {
        allLi[i].className = "";
    }
    $('bus_radio_li_' + index).className = "current";

    if (index == 2) {
        resultShow(dataSource);
    }

    if (index == 1) {
        dataCache.sort(function com(a, b) { return parseInt(a.TransferLength) - parseInt(b.TransferLength); }); 
        resultShow(dataCache);
    }

    if (index == 3) {
        dataCache.sort(function com(a, b) { return parseInt(a.WalkLength) - parseInt(b.WalkLength); }); 
        resultShow(dataCache);
    }
    
    if (index == 4) {
        dataCache.sort(function com(a, b) { return parseInt(b.IsSubway) - parseInt(a.IsSubway); }); 
        resultShow(dataCache);
    }
}

function selectBtn_bd(index) {
    var allLi = document.getElementById('bus_radio_bd').getElementsByTagName('li');
    for (var i = 0; i < allLi.length; i++) {
        allLi[i].className = "";
    }
    $('bus_radio_li_bd_' + index).className = "current";

    if (index == 1) {
        policyValue = parent.vM.ContentWindow.BMAP_TRANSIT_POLICY_LEAST_TIME;
    }
    if (index == 2) {
        policyValue = parent.vM.ContentWindow.BMAP_TRANSIT_POLICY_LEAST_TRANSFER;
    }
    if (index == 3) {
        policyValue = parent.vM.ContentWindow.BMAP_TRANSIT_POLICY_LEAST_WALKING;
    }
    if (index == 4) {
        policyValue = parent.vM.ContentWindow.BMAP_TRANSIT_POLICY_AVOID_SUBWAYS;
    }
    Transfer_BD(Choose_s, Choose_e, policyValue);
}

function reLoadPageSize() {
    var _height = parseInt(fnGetWindowHeight() - 224);
    if (_height > -1) {
        if ($('divstartul')) {
            $('divstartul').style.height = _height + 'px';
        }
        if ($('divendul')) {
            $('divendul').style.height = _height + 'px';
        }
    }
}

function fnActive() {
    reLoadPageSize();

    if (_CoordList.length > 0) {
        parent.__IsDrawBusLineState = false;
        parent.fnDrawingBusLine(_CoordList);
    }
    else {
        parent.__IsDrawBusLineState = true;
        parent.fnDrawingBusLine([]);
    }
    fnResize();
}

function fnExit() {
    if (parent.vM.MapState.Map == 0) {
        if (parent.vM.GetEntityInfo("starticon")) {
            parent.vM.RemoveEntity("starticon");
        }

        if (parent.vM.GetEntityInfo("endicon")) {
            parent.vM.RemoveEntity("endicon");
        }

        parent.__IsDrawBusLineState = true;
        parent.fnDrawingBusLine([]);
    }
    else {
        if (BMap_Map_Child.getOverlays().length > 0) {
            BMap_Map_Child.clearOverlays();
        }
    }
//    if (parent.parent.vM.MapState.Succeed) {
//        parent.parent.vM.MapSwitch.Switch3D();
//    }
}
//初始化高度
function fnResize(h) {
    if (!h) {
        if (parent.vM.MapState.Map == 0) {
            if ($('bus_radio').style.display == 'none') {
                $('TabContent').style.height = (fnGetWindowHeight() - 80) + 'px';
            }
            else {
                $('TabContent').style.height = (fnGetWindowHeight() - 130) + 'px';
            }
        }
        else {
            if ($('bus_radio_bd').style.display == 'none') {
                $('TabContent').style.height = (fnGetWindowHeight() - 80) + 'px';
            }
            else {
                $('TabContent').style.height = (fnGetWindowHeight() - 130) + 'px';
            }
        }
    }
    else {
        if (parent.vM.MapState.Map == 0) {
            if ($('bus_radio').style.display == 'none') {
                $('TabContent').style.height = (h - 80) + 'px';
            }
            else {
                $('TabContent').style.height = (h - 130) + 'px';
            }
        }
        else {
            if ($('bus_radio_bd').style.display == 'none') {
                $('TabContent').style.height = (h - 80) + 'px';
            }
            else {
                $('TabContent').style.height = (h - 130) + 'px';
            }
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


function fnOnload_BD() {
    if (!window.Config) {
        //        window.Config = parent.GlobalConfig;
        setTimeout('fnOnload_BD()', 200);
        return;
    }
    if (parseInt(fnGetWindowHeight() - 75) > 0) {
        $('TabContent').style.height = fnGetWindowHeight() - 75 + 'px';
    }

    $('TabContent').innerHTML = this.Config.Loading;

    fnShowStationData_BD();
}

function fnShowStationData_BD() {
    startKey = unescape(fnRequest('s'));
    endKey = unescape(fnRequest('e'));
    BMap_Map_Child = parent.vM["BaiduMap"].BMap;
    LocalSearchOptions_s = {
        //renderOptions: { map: BMap, selectFirstResult: true },     //设置结果呈现                //map: BMap,panel: "AlaMap$Plug$BaiduMap$Temp"
        pageCapacity: _PageSize,    //设置每页容量
        onSearchComplete: function (results) {  //检索完成后的回调函数
            Result_s = results;
            if (!IsPage_S) {
                local_e = new parent.vM.ContentWindow.BMap.LocalSearch(BMap_Map_Child, LocalSearchOptions_e);
                local_e.search(endKey);
            }
            else {
                Pager_S();
            }
        }
    };
    LocalSearchOptions_e = {
        //renderOptions: { map: BMap, selectFirstResult: true },     //设置结果呈现                //map: BMap,panel: "AlaMap$Plug$BaiduMap$Temp"
        pageCapacity: _PageSize,    //设置每页容量
        onSearchComplete: function (results) {  //检索完成后的回调函数
            Result_e = results;
            if (!IsPage_E) {
                HtmlOperate();
            }
            else {
                Pager_E();
            }
        }
    };
    local_s = new parent.vM.ContentWindow.BMap.LocalSearch(BMap_Map_Child, LocalSearchOptions_s);
    local_s.search(startKey);
}

function HtmlOperate() {
    var html_s = getStartHtml(0);
    var html_e = getEndHtml(0);
    Html = "<div id = \"sContent\" style=\"font-size:14px; padding:5px;\">请选择准确的起点和终点：</div>" + html_s + html_e;
    if (Result_s.getCurrentNumPois() > 0 && Result_e.getCurrentNumPois() > 0 && Result_s.getPoi(0).title == startKey && Result_e.getPoi(0).title == endKey) {
        policyValue = parent.vM.ContentWindow.BMAP_TRANSIT_POLICY_LEAST_TRANSFER;
        Choose_s = Result_s.getPoi(0).title;
        Choose_e = Result_e.getPoi(0).title;
        Transfer_BD(Choose_s, Choose_e, policyValue);
    }
    else {
        $('TabContent').className = "bus_box2";
        $('TabContent').innerHTML = Html;
        if (Result_e.getCurrentNumPois() > 0) {
            $('endul').style.display = "none";
        }
        reLoadPageSize();
    }
}

function Pager_S() {
    $('StartContent').innerHTML = getStartHtml(1);
    reLoadPageSize();
}
function Pager_E() {
    $('EndContent').innerHTML = getEndHtml(1);
    reLoadPageSize();
}

function getStartHtml(type) {
    var html_s = "";
    var sCurrPageResultNum = Result_s.getCurrentNumPois(); //获得当前页的结果数
    //var stotalResult = Result_s.getNumPois(); //获得总结果数
    var spageNo = Result_s.getPageIndex(); //获得当前页序号
    var spageCount = Result_s.getNumPages(); //获得总页数

    if (sCurrPageResultNum > 0) {
        var tempLis = "";
        if (type == 0) {
            html_s += "		<div class=\"bus_g_r\" id=\"StartContent\">";
            html_s += "      <div class=\"bus_red\" id = \"startDiv\">";
            html_s += "			<h1 id=\"startStationH1\" onclick=\"divClick_BD(1);\" style=\"cursor:pointer;\">";
            html_s += "				<div class=\"pub_ico\"></div>";
            html_s += "				<div class=\"pub_t\"><p>起点：<strong id=\"startStationName\">" + startKey + "</strong></p>";
            html_s += "					<a href=\"#\"></a>";
            html_s += "				</div>";
            html_s += "			</h1>";
            html_s += "			<div id=\"startul\"><ul class=\"pub_con\" id=\"divstartul\">{$startStationLi}</ul><div class=\"Paginate\">{$Page}</div></div>";
            html_s += "		 </div>";
            html_s += "     </div>";
        }
        else {
            html_s += "      <div class=\"bus_red\" id = \"startDiv\">";
            html_s += "			<h1 id=\"startStationH1\" onclick=\"divClick_BD(1);\" style=\"cursor:pointer;\">";
            html_s += "				<div class=\"pub_ico\"></div>";
            html_s += "				<div class=\"pub_t\"><p>起点：<strong id=\"startStationName\">" + startKey + "</strong></p>";
            html_s += "					<a href=\"#\"></a>";
            html_s += "				</div>";
            html_s += "			</h1>";
            html_s += "			<div id=\"startul\"><ul class=\"pub_con\" id=\"divstartul\">{$startStationLi}</ul><div class=\"Paginate\">{$Page}</div></div>";
            html_s += "		 </div>";
        }

        for (var i = 0; i < sCurrPageResultNum; i++) {
            var num = (spageNo * _PageSize) + i + 1;
            var poi = Result_s.getPoi(i); //获得单个LocalResultPoi信息
            var address = "";
            if (poi.type == 0) {
                address = poi.address;
            }

            tempLis += "				<li onmouseover=\"a(1," + num + ");\" onmouseout = \"b(1," + num + ");\" class=\"clearfix\">";
            tempLis += "					<div class=\"pub_nub_r\" >" + (i + 1) + "</div>";
            tempLis += "					<div style=\"float:left;\"><div class=\"pub_place\"><a style=\"cursor:pointer;\">" + poi.title + "</a></div><div style=\"width:200px;color:#7a7a7a;line-height: 17px;\">" + address + "</div></div>"; //onclick=\"moveto({$X},{$Y},1);\"
            tempLis += "					<div class=\"setPoint-btn\"><input id=\"startLi" + num + "\" onclick = \"inputclick_BD(1," + num + ",'" + poi.title + "');\" type=\"button\" class=\"pub_chobtn\" value=\"选择起点\" style=\"display:none;\" /></div>";
            tempLis += "				</li>";
        }
        var strPage = fnPager(5, spageNo + 1, _PageSize, spageCount, 'GoToPage_S');
        html_s = html_s.replace("{$startStationLi}", tempLis).replace('{$Page}', strPage);
    }
    else {
        html_s = "<div id=\"start\" class=\"no-point\">起点：<strong>" + startKey + "</strong><p>不存在或尚未登记，请输入周边地名或试试该建筑物的名称</p></div>";
    }
    return html_s;
}

function getEndHtml(type) {
    var html_e = "";
    var eCurrPageResultNum = Result_e.getCurrentNumPois(); //获得当前页的结果数
    //var etotalResult = Result_e.getNumPois(); //获得总结果数
    var epageNo = Result_e.getPageIndex(); //获得当前页序号
    var epageCount = Result_e.getNumPages(); //获得总页数

    if (eCurrPageResultNum > 0) {
        var tempLis = "";
        if (type == 0) {
            html_e += "		<div class=\"bus_g_r\" id=\"EndContent\">";
            html_e += "        <div class=\"bus_red\" id = \"endDiv\" >";
            html_e += "			<h1 id=\"endStationH1\" onclick=\"divClick_BD(2);\" style=\"cursor:pointer;\">";
            html_e += "				<div class=\"pub_ico\"></div>";
            html_e += "				<div class=\"pub_t\"><p>终点：<strong id=\"endStationName\">" + endKey + "</strong></p>";
            html_e += "				    <a href=\"#\"></a>";
            html_e += "				</div>";
            html_e += "			</h1>";
            html_e += "			<div id=\"endul\"><ul class=\"pub_con\" id=\"divendul\">{$endStationLi}</ul><div class=\"Paginate\">{$Page}</div></div>";
            html_e += "		 </div>";
            html_e += "     </div>";
        }
        else {
            html_e += "        <div class=\"bus_red\" id = \"endDiv\" >";
            html_e += "			<h1 id=\"endStationH1\" onclick=\"divClick_BD(2);\" style=\"cursor:pointer;\">";
            html_e += "				<div class=\"pub_ico\"></div>";
            html_e += "				<div class=\"pub_t\"><p>终点：<strong id=\"endStationName\">" + endKey + "</strong></p>";
            html_e += "				    <a href=\"#\"></a>";
            html_e += "				</div>";
            html_e += "			</h1>";
            html_e += "			<div id=\"endul\"><ul class=\"pub_con\" id=\"divendul\">{$endStationLi}</ul><div class=\"Paginate\">{$Page}</div></div>";
            html_e += "		 </div>";
        }

        for (var i = 0; i < eCurrPageResultNum; i++) {
            var num = (epageNo * _PageSize) + i + 1;
            var poi = Result_e.getPoi(i); //获得单个LocalResultPoi信息
            var address = "";
            if (poi.type == 0) {
                address = poi.address;
            }

            tempLis += "				<li onmouseover=\"a(2," + num + ");\" onmouseout = \"b(2," + num + ");\" class=\"clearfix\">";
            tempLis += "					<div class=\"pub_nub_r\" >" + (i + 1) + "</div>";
            tempLis += "					<div style=\"float:left;\"><div class=\"pub_place\"><a style=\"cursor:pointer;\">" + poi.title + "</a></div><div style=\"width:200px;color:#7a7a7a;line-height: 17px;\">" + address + "</div></div>"; //onclick=\"moveto({$X},{$Y},2);\"
            tempLis += "					<div class=\"setPoint-btn\"><input id=\"endLi" + num + "\" onclick = \"inputclick_BD(2," + num + ",'" + poi.title + "');\" type=\"button\" class=\"pub_chobtn\" value=\"选择终点\" style=\"display:none;\" /></div>";
            tempLis += "				</li>";
        }
        var strPage = fnPager(5, epageNo + 1, _PageSize, epageCount, 'GoToPage_E');
        html_e = html_e.replace("{$endStationLi}", tempLis).replace('{$Page}', strPage);
    }
    else {
        html_e = "<div id=\"end\" class=\"no-point\">终点：<strong>" + endKey + "</strong><p>不存在或尚未登记，请输入周边地名或试试该建筑物的名称</p></div>";
    }
    return html_e;
}

function GoToPage_S(pageNo) {
    IsPage_S = true;
    local_s.gotoPage(pageNo - 1);
}
function GoToPage_E(pageNo) {
    IsPage_E = true;
    local_e.gotoPage(pageNo - 1);
}

function Transfer_BD(sName, eName, TransitPolicy) {
    if (BMap_Map_Child.getOverlays().length > 0) {
        BMap_Map_Child.clearOverlays();
    }
    transit = new parent.vM.ContentWindow.BMap.TransitRoute(BMap_Map_Child, {
        renderOptions: { map: BMap_Map_Child }, //搜索结果的呈现设置
        policy: TransitPolicy, //vM.ContentWindow.BMAP_TRANSIT_POLICY_LEAST_TRANSFER 公交导航的策略参数
        pageCapacity: 20, //返回方案的个数
        onSearchComplete: function (results) {
            //transitrouteresults = result;
            showTransfer(results);
        }
        ,
        onMarkersSet: function (startandend) {
            StartAndEndMarker[0] = startandend[0].marker;
            StartAndEndMarker[1] = startandend[1].marker;
        }
    });
    transit.search(sName, eName);
}

function showTransfer(results) {
    var TempHtml = "";
    var sTempName = results.getStart().title;
    var eTempName = results.getEnd().title;
    var _s = "";
    if (sTempName.length > 10)
        _s = sTempName.substring(0, 10) + "...";
    else
        _s = sTempName;
    var _e = "";
    if (eTempName.length > 10)
        _e = eTempName.substring(0, 10) + "...";
    else
        _e = eTempName;

    var start = "";
    start += "			<li>";
    start += "				<div class=\"bus_way1_title2\" title=" + sTempName + ">起点：" + _s + "<!--<a style=\"cursor:pointer;\" onclick=\"ViewCompleteBusLine();\">显示整条路线</a>--></div>";
    start += "			</li>";

    var end = "";
    end += "			<li>";
    end += "				<div class=\"bus_way1_title2\" title=" + eTempName + "><span>终点：" + _e + "</span></div>";
    end += "			</li>";
    //end += "			<li class=\"bus_way1_down\"><span style=\"height:16px;display:block;float:left;\"><img src=\"../images/pcde_170.png\"  style=\"display:none;\" /></span><a style=\"height:16px;cursor:pointer;\" onclick=\"parent.ShowSendHtml(_phonedata[" + (index - 1) + "]);\"><b>免费发送到手机</b></a></li>"; //>> 全程" + result.TransferLength / 1000 + "公里

    var planCount = results.getNumPlans();
    if (planCount > 0) {//transit.getStatus() == vM.ContentWindow.BMAP_STATUS_SUCCESS
        for (var i = 0; i < planCount; i++) {
            tArrayWalk[i] = new Array();
            tArrayLine[i] = new Array();
            tArrayWalkLast[i] = new Array();
            tArrayBusAndSubWayOn[i] = new Array();
            tArrayBusAndSubWayOff[i] = new Array();
            tArrayBusAndSubWayType[i] = new Array();
            var UL = "<ul class=\"bus_way1\" id=\"ResultUL_BD" + (i + 1) + "\">{0}{1}</ul>";
            var resulttitle = "";
            var div = "<div id=\"resultDiv" + (i + 1) + "\" class=\"border-div\" style=\"display:none;\">" + start;

            //获取方案
            var plan = results.getPlan(i);
            var busCount = plan.getNumLines(); //公交线路段数
            var walkCount = plan.getNumRoutes(); //步行线路段数
            //            alert(busCount);
            //            alert(walkCount);
            //var total = busCount + walkCount;

            //-----------------------------获取title开始--------------------------
            var title = "";
            for (var j = 0; j < busCount; j++) {
                var line = plan.getLine(j);
                if (j > 0) {
                    title += "→";
                }
                title += getLine(line.title);
            }
            //-----------------------------获取title结束--------------------------

            resulttitle += string.Format("<h1 id= \"title_" + (i + 1) + "\" class=\"clearfix\" onclick=\"fnDisplayResult_BD(\'resultDiv" + (i + 1) + "\');\"><div class=\"bus_way1_ico\">" + (i + 1) + "</div><div class=\"bus_way1_title\"><b>{0}</b><p>{1}全程" + plan.getDistance(false) / 1000 + "公里</p></div><div class=\"bus_way1_btn\"><img src=\"../images/bus_ico3.gif\" border=\"0\" /></div></h1>", title, "");

            //正常情况，步行要公交多1
            for (var m = 0; m < walkCount; m++) {
                var walk = plan.getRoute(m);
                var walkDistance = walk.getDistance(false);
                if (m != walkCount - 1) {
                    var line = plan.getLine(m);
                    if (walkDistance > 0) {
                        div += "<li><div class=\"bus_way1_pubico\"><img src=\"../images/bus_ico8.png\" border=\"0\" /></div><div class=\"bus_way1_pubtitle\">步行至<a style=\"cursor:pointer;\"><u>" + line.getGetOnStop().title + "</u></a><span>" + walkDistance + "米</span></div></li>"; //onclick=\"ShowPointer({0}, {1}, true)\"
                    }
                    else {
                        //省略步行
                    }
                    var tempImgSrc = line.type == parent.vM.ContentWindow.BMAP_LINE_TYPE_BUS ? "bus_ico4.png" : "bus_ico5.png";
                    div += "<li><div class=\"bus_way1_pubico\"><img src=\"../images/" + tempImgSrc + "\" border=\"0\" /></div><div class=\"bus_way1_pubtitle\">乘坐<u>" + getLine(line.title) + "</u>,在<a style=\"cursor:pointer;\"><u>" + line.getGetOffStop().title + "</u></a>下车<span>" + line.getNumViaStops() + "站</span></div></li>"; //onclick=\"ShowPointer({$x}, {$y}, true)\"
                    tArrayWalk[i][m] = walk.getPath();
                    tArrayLine[i][m] = line.getPath();
                    tArrayBusAndSubWayOn[i][m] = line.getGetOnStop();
                    tArrayBusAndSubWayOff[i][m] = line.getGetOffStop();
                    tArrayBusAndSubWayType[i][m] = line.type;
                }
                else {
                    //最后一个步行
                    if (walkDistance > 0) {
                        //步行至终点
                        div += "<li><div class=\"bus_way1_pubico\"><img src=\"../images/bus_ico8.png\" border=\"0\" /></div><div class=\"bus_way1_pubtitle\">步行至<a style=\"cursor:pointer;\"><u>" + eTempName + "</u></a><span>" + walkDistance + "米</span></div></li>"; //onclick=\"ShowPointer({0}, {1}, true)\"
                        tArrayWalkLast[i][0] = walk.getPath();
                    }
                }
            }

            div += end + "</div>";
            TempHtml += string.Format(UL, resulttitle, div);
        }

        TempHtml += "<a onclick=\"reLoadChange_BD();\" style=\"cursor:pointer;display:block;font-size:14px;float:right;width:120px;margin:5px 20px 0 0;font-weight:bold;text-align:center;color:#36f;\">重新选择起点终点</a>";
        $('TabContent').innerHTML = TempHtml;
        $('TabContent').className = "bus_box";
        $('bus_radio_bd').style.display = '';

        fnDisplayResult_BD("resultDiv1");
        fnResize();
    }
    //    else { 
    //        
    //    }

}

//获取简写的公交线路：去除“()”中的内容
function getLine(sLine) {
    //333路(三墩-武林门北)
    var index = sLine.indexOf("(");
    if (sLine.length == 0) {
        return sLine;
    }
    if (index > -1) {
        return sLine.substr(0, index);
    }
    else {
        return sLine;
    }
}