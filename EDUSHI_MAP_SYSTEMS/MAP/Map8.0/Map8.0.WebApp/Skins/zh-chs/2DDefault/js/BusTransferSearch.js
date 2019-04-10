var _PageSize = 8;


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
        var polyline_walk = new parent.BMap.Polyline(TempWalk[i], { strokeColor: "green", strokeStyle: "dashed" });//步行
        var polyline_line = new parent.BMap.Polyline(TempLine[i], { strokeColor: "blue", strokeStyle: "solid" });//公交
        BMap_Map_Child.addOverlay(polyline_walk);
        BMap_Map_Child.addOverlay(polyline_line);
        if (TempWalkLast.length > 0) {
            var polyline_walk_last = new parent.BMap.Polyline(TempWalkLast[0], { strokeColor: "green", strokeStyle: "dashed" }); //最后一个步行
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
        if (type == parent.BMAP_LINE_TYPE_BUS) {
            //alert("bus");
            myIcon = new parent.BMap.Icon("/images/bus_print.png", new parent.BMap.Size(21, 21));
        }
        else {
            //alert("way");
            myIcon = new parent.BMap.Icon("/images/subway_print.png", new parent.BMap.Size(21, 21));
        }
        
        var markerOn = new parent.BMap.Marker(poiOn.point, { icon: myIcon });
        var markerOff = new parent.BMap.Marker(poiOff.point, { icon: myIcon });
        BMap_Map_Child.addOverlay(markerOn);
        BMap_Map_Child.addOverlay(markerOff);
    }
}

function reLoadChange_BD() {
    Choose_s = "";
    Choose_e = "";
    $('bus_radio_bd').style.display = 'none';
    $('TabContent').innerHTML = parent.GlobalConfig.Loading;
    $('TabContent').className = "bus_box2";
    $('TabContent').innerHTML = Html;
    if (Result_e.getCurrentNumPois() > 0) {
        $('endul').style.display = "none";
    }
    reLoadPageSize();
    fnResize();
}

function selectBtn_bd(index) {
    var allLi = document.getElementById('bus_radio_bd').getElementsByTagName('li');
    for (var i = 0; i < allLi.length; i++) {
        allLi[i].className = "";
    }
    $('bus_radio_li_bd_' + index).className = "current";

    if (index == 1) {
        policyValue = parent.BMAP_TRANSIT_POLICY_LEAST_TIME;
    }
    if (index == 2) {
        policyValue = parent.BMAP_TRANSIT_POLICY_LEAST_TRANSFER;
    }
    if (index == 3) {
        policyValue = parent.BMAP_TRANSIT_POLICY_LEAST_WALKING;
    }
    if (index == 4) {
        policyValue = parent.BMAP_TRANSIT_POLICY_AVOID_SUBWAYS;
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

//初始化高度
function fnResize(h) {
    if (!h) {
        if ($('bus_radio_bd').style.display == 'none') {
            $('TabContent').style.height = (fnGetWindowHeight() - 80) + 'px';
        }
        else {
            $('TabContent').style.height = (fnGetWindowHeight() - 130) + 'px';
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

    reLoadPageSize();
}

function fnOnload_BD() {
//    if (!window.Config) {
//        //        window.Config = parent.GlobalConfig;
//        setTimeout('fnOnload_BD()', 200);
//        return;
//    }
    if (parseInt(fnGetWindowHeight() - 75) > 0) {
        $('TabContent').style.height = fnGetWindowHeight() - 75 + 'px';
    }

    $('TabContent').innerHTML = parent.GlobalConfig.Loading;

    fnShowStationData_BD();
}

function fnShowStationData_BD() {
    startKey = unescape(fnRequest('s'));
    endKey = unescape(fnRequest('e'));
    BMap_Map_Child = parent.vM;
    LocalSearchOptions_s = {
        //renderOptions: { map: BMap, selectFirstResult: true },     //设置结果呈现                //map: BMap,panel: "AlaMap$Plug$BaiduMap$Temp"
        pageCapacity: _PageSize,    //设置每页容量
        onSearchComplete: function (results) {  //检索完成后的回调函数
            Result_s = results;
            if (!IsPage_S) {
                local_e = new parent.BMap.LocalSearch(BMap_Map_Child, LocalSearchOptions_e);
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
    local_s = new parent.BMap.LocalSearch(BMap_Map_Child, LocalSearchOptions_s);
    local_s.search(startKey);
}

function HtmlOperate() {
    var html_s = getStartHtml(0);
    var html_e = getEndHtml(0);
    Html = "<div id = \"sContent\" style=\"font-size:14px; padding:5px;\">请选择准确的起点和终点：</div>" + html_s + html_e;
    if (Result_s.getCurrentNumPois() > 0 && Result_e.getCurrentNumPois() > 0 && Result_s.getPoi(0).title == startKey && Result_e.getPoi(0).title == endKey) {
        policyValue = parent.BMAP_TRANSIT_POLICY_LEAST_TRANSFER;
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
    transit = new parent.BMap.TransitRoute(BMap_Map_Child, {
        renderOptions: { map: BMap_Map_Child }, //搜索结果的呈现设置
        policy: TransitPolicy, //BMAP_TRANSIT_POLICY_LEAST_TRANSFER 公交导航的策略参数
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
    if (planCount > 0) {//transit.getStatus() == BMAP_STATUS_SUCCESS
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
                    var tempImgSrc = line.type == parent.BMAP_LINE_TYPE_BUS ? "bus_ico4.png" : "bus_ico5.png";
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