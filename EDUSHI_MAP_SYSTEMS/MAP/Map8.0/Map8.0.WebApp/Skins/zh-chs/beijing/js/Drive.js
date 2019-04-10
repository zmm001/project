var _PageSize = 8;

var local_s = null; //搜索起点对象
var local_e = null; //搜索终点对象
var startKey = ""; //起点
//var sVia = "";//途径点
//var viaArr = []; //途径点
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
var drive = null; //驾车导航对象
var policyValue = null; //驾车导航的策略参数：BMAP_DRIVING_POLICY_LEAST_TIME（最少时间），BMAP_DRIVING_POLICY_LEAST_DISTANCE（最短距离），BMAP_DRIVING_POLICY_AVOID_HIGHWAYS（避开高速）
var BMap_Map_Child = null;
var myPolyline = null;
window.onload = fnOnload;



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
        if ($('drive_radio_bd').style.display == 'none') {
            $('TabContent').style.height = (fnGetWindowHeight() - 80) + 'px';
        }
        else {
            $('TabContent').style.height = (fnGetWindowHeight() - 145) + 'px';
        }
    }
    else {
        if ($('drive_radio_bd').style.display == 'none') {
            $('TabContent').style.height = (h - 80) + 'px';
        }
        else {
            $('TabContent').style.height = (h - 145) + 'px';
        }
    }

    reLoadPageSize();
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
            Driving(Choose_s, Choose_e, policyValue);
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
            Driving(Choose_s, Choose_e, policyValue);
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
}

function selectBtn_bd(index) {
    var allLi = document.getElementById('drive_radio_bd').getElementsByTagName('li');
    for (var i = 0; i < allLi.length; i++) {
        allLi[i].className = "";
    }
    $('drive_radio_li_bd_' + index).className = "current";

    if (index == 1) {
        policyValue = parent.vM.ContentWindow.BMAP_DRIVING_POLICY_LEAST_TIME;
    }
    if (index == 2) {
        policyValue = parent.vM.ContentWindow.BMAP_DRIVING_POLICY_LEAST_DISTANCE;
    }
    if (index == 3) {
        policyValue = parent.vM.ContentWindow.BMAP_DRIVING_POLICY_AVOID_HIGHWAYS;
    }
//    if (index == 4) {
//        policyValue = parent.vM.ContentWindow.BMAP_TRANSIT_POLICY_AVOID_SUBWAYS;
//    }
    Driving(Choose_s, Choose_e, policyValue);
}

function reLoadChange_BD() {
    Choose_s = "";
    Choose_e = "";
    $('drive_radio_bd').style.display = 'none';
    $('TabContent').innerHTML = this.Config.Loading;
    $('TabContent').className = "bus_box2";
    $('TabContent').innerHTML = Html;
    if (Result_e.getCurrentNumPois() > 0) {
        $('endul').style.display = "none";
    }
    reLoadPageSize();
    fnResize();
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

    fnShowDriveData();
}

function fnShowDriveData() {
    startKey = unescape(fnRequest('s'));
    endKey = unescape(fnRequest('e'));
    //sVia = unescape(fnRequest('via'));
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
        policyValue = parent.vM.ContentWindow.BMAP_DRIVING_POLICY_LEAST_TIME;
        Choose_s = Result_s.getPoi(0).title;
        Choose_e = Result_e.getPoi(0).title;
        Driving(Choose_s, Choose_e, policyValue);
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

function Driving(sName, eName, DrivingPolicy) {
    if (BMap_Map_Child.getOverlays().length > 0) {
        BMap_Map_Child.clearOverlays();
    }
    drive = new parent.vM.ContentWindow.BMap.DrivingRoute(BMap_Map_Child, {
        renderOptions: { map: BMap_Map_Child, enableDragging: true }, //搜索结果的呈现设置
        policy: DrivingPolicy, //vM.ContentWindow.BMAP_DRIVING_POLICY_LEAST_TIME 驾车导航的策略参数
        //pageCapacity: 20, //返回方案的个数
        onSearchComplete: function (results) {
            //transitrouteresults = result;
            showDrive(results);
        }
    });
    drive.search(sName, eName);
}

function showDrive(results) {
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
        for (i = 0; i < planCount; i++) {
            var UL = "<ul class=\"bus_way1\" id=\"ResultUL_BD" + (i + 1) + "\">{0}{1}</ul>";
            var resulttitle = "";
            var div = "<div id=\"resultDiv" + (i + 1) + "\" class=\"border-div\" style=\"display:none;\">" + start;

            //获取方案
            var plan = results.getPlan(i);
            var routeCount = plan.getNumRoutes();
            //            alert(busCount);
            //            alert(walkCount);
            //var total = busCount + walkCount;

            //-----------------------------获取title开始--------------------------
            var title = "";
//            for (var j = 0; j < busCount; j++) {
//                var line = plan.getLine(j);
//                if (j > 0) {
//                    title += "→";
//                }
//                title += getLine(line.title);
//            }
            //-----------------------------获取title结束--------------------------

            resulttitle += string.Format("<h1 id= \"title_" + (i + 1) + "\" class=\"clearfix\" onclick=\"fnDisplayResult_BD(\'resultDiv" + (i + 1) + "\');\"><div class=\"bus_way1_ico\">" + (i + 1) + "</div><div class=\"bus_way1_title\"><b>{0}</b><p>{1}全程" + plan.getDistance(false) / 1000 + "公里/打车费用" + results.taxiFare.day.totalFare + "元</p></div><div class=\"bus_way1_btn\"><img src=\"../images/bus_ico3.gif\" border=\"0\" /></div></h1>", title, "");

            for (var m = 0; m < routeCount; m++) {
                var route = plan.getRoute(m);
                //alert(route.getPolyline());
                //myPolyline = route.getPolyline();
                //alert(myPolyline);
                var stepCount = route.getNumSteps();
                for (var n = 0; n < stepCount; n++) {
                    var step = route.getStep(n);
                    div += "<li><!--<div class=\"bus_way1_pubico\"><img src=\"../images/bus_ico8.gif\" border=\"0\" /></div>--><div class=\"bus_way1_pubtitle clearfix\"><div class=\"no-1\">" + (n + 1) + ". </div><div class=\"no-2\">" + step.getDescription() + "</div></div></li>"; //onclick=\"ShowPointer({0}, {1}, true)\"
                }
            }

            div += end + "</div>";
            TempHtml += string.Format(UL, resulttitle, div);
        }

        TempHtml += "<a onclick=\"reLoadChange_BD();\" style=\"cursor:pointer;display:block;font-size:14px;float:right;width:120px;margin:5px 20px 0 0;font-weight:bold;text-align:center;color:#36f;\">重新选择起点终点</a>";
        $('TabContent').innerHTML = TempHtml;
        $('TabContent').className = "bus_box";
        $('drive_radio_bd').style.display = '';

        fnDisplayResult_BD("resultDiv1");
        fnResize();
    }
    //    else { 
    //        
    //    }

}
function fnExit() {
    if (BMap_Map_Child.getOverlays().length > 0) {
        BMap_Map_Child.clearOverlays();
    }
}