_member = 0;

var _Page = 1;
var _PageCount = 1;
var _RecordCount = 0;
var _PageSize = 10;
var _cindex = 0;
var _data = [];
window.onload = fnOnload;

function fnOnload() {
    if (!window.Config) {
        setTimeout('fnOnload()', 200);
        return;
    }
    $('mnbox').innerHTML = window.Config.Loading;
    $('recentlist').innerHTML = window.Config.Loading;
    fnResize();

    var _mcookie = new CookieHelper();
    _member = _mcookie.getCookie('LmId');
    fnLoadLocationList(_member);
    fuRecentSearch();
}
function reLoadPageSize() {
    _PageSize = Math.floor((fnGetWindowHeight() - 240) / 30);
    if (_PageSize < 10) {
        _PageSize = 10;
    }
}

function fnLoadLocationList(_member) {
    var url = window.Config.DataCetnerMapDataUrl + "Map7.0/UserDataInfo.aspx?citycode=" + window.Config.CityCode + "&l=" + window.Config.Language + "&lmid=" + _member + "&lmltype=0&req=1&nd=" + $Rnd();
    reLoadPageSize();
    ENetwork.DownloadScript(url, function() {
        LoadData();
    });
}

function LoadData() {
    if (typeof _MarkLocationInfo != 'undefined' && _MarkLocationInfo.length > 0) {
        _RecordCount = _MarkLocationInfo.length;
        _data = _MarkLocationInfo;
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

        var tHtml = "";
        for (i = Begin; i < End; i++) {
            tHtml += string.Format("<li onmouseover=\"document.getElementById('d" + (i + 1) + "').style.display='block';\" onmouseout=\"document.getElementById('d" + (i + 1) + "').style.display='none';\"><div style=\"width:250px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;\">{0}.<a href=\"javascript:;\" title=\"{14}\" onclick=\"parent.ShowMark({1},{2},{3},'{4}','{5}',{6},{7});\">{8}</a></div><div id=\"{9}\" class=\"btn\" style=\"display:none;position:absolute;right:15px;padding:2px 5px;background:#fff;\"> [<a href=\"javascript:;\" onclick=\"setStation(1,{10},{11},{12});\">这里出发</a>] [<a href=\"javascript:;\" onclick=\"setStation(2,{13},{14},{15});\">到这里去</a>] [<a href=\"javascript:;\" onclick=\"DeleteInfo({16});\">删除</a>]</div><br /></li>", (i + 1), _MarkLocationInfo[i].LML_ID, _MarkLocationInfo[i].LML_X, _MarkLocationInfo[i].LML_Y, _MarkLocationInfo[i].LML_Title, _MarkLocationInfo[i].LML_Content, _MarkLocationInfo[i].LML_OwnerID, _MarkLocationInfo[i].LML_Type, _MarkLocationInfo[i].LML_Title, "d" + (i + 1), _MarkLocationInfo[i].LML_X, _MarkLocationInfo[i].LML_Y, i, _MarkLocationInfo[i].LML_X, _MarkLocationInfo[i].LML_Y, i, _MarkLocationInfo[i].LML_ID);
        }
        var strPage = fnPager(4, _Page, _PageSize, _PageCount, 'window.fnShowByPage');
        $('mnbox').innerHTML = tHtml + "<p class=\"lxxz\">" + strPage + "</p>";
    }
    else {
        $('mnbox').style.display = 'none';
    }
}

function DeleteInfo(id) {
    if (confirm("确定删除？")) {
        var url = "/AjaxData/MarkLocation.aspx?id=" + id;
        ENetwork.DownloadScript(url, function() {
            if (typeof sReturn != 'undefined' && sReturn == '1') {
                fnLoadLocationList(_member);
            }
        });
    }
}

function fnShowByPage(iPage) {
    if (iPage) {
        _Page = iPage;
    }
    _cindex = 0;
    LoadData();
}
var x1 = 0, y1 = 0, x2 = 0, y2 = 0;
function setStation(t, x, y, index) {
    if (parseInt(t) == 1) {
        createIcon(x, y, 1);
        parent.MoveTo(x, y,true);
        x1 = x;
        y1 = y;
        $('tishi').style.display = 'block';
        $('tishi').innerHTML = '<font color=\'#333333\'>您设置</font>"' + _data[index].LML_Title + '"<font color=\'#333333\'>为</font>起点，<font color=\'#333333\'>请继续设置</font>终点！';
    }

    if (parseInt(t) == 2) {
        createIcon(x, y, 2);
        parent.MoveTo(x, y, true);
        x2 = x;
        y2 = y;
        $('tishi').style.display = 'block';
        $('tishi').innerHTML = '<font color=\'#333333\'>您设置</font>"' + _data[index].LML_Title + '"<font color=\'#333333\'>为</font>终点，<font color=\'#333333\'>请继续设置</font>起点！';
    }

    if (x1 != 0 && y1 != 0 && x2 != 0 && y2 != 0 && x1 != x2 && y1 != y2) {
        parent.fnAddTwoPointSearch(x1, y1, x2, y2);
        x1 = 0, y1 = 0, x2 = 0, y2 = 0;
        $('tishi').style.display = 'none';
    }
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

function fuRecentSearch() {
    var _cookie = new CookieHelper();
    var cookieNickNameCookie = _cookie.getCookie('MemberNickName');
    if (cookieNickNameCookie != null) {
        var _SearchList = _cookie.getCookie(cookieNickNameCookie+window.Config.CityCode);
        if (_SearchList != null) {
            var c = JSON.parse('[' + _SearchList + ']');
            var html = '', len = 0;
            if (c.length > 5) {
                len = 5;
            } else {
                len = c.length;
            }
            for (var i = 0; i < len; i++) {
                switch (parseInt(c[i].type)) {
                    case 10:
                        html += string.Format("<li><div>{0}.<a href=\"javascript:;\" onclick=\"parent.fnBusRecentSearch('{1}','{2}');\">从{3}到{4}</a></div><br /></li>", (i + 1), c[i].key1, c[i].key2, c[i].key1, c[i].key2);
                        break;
                    case 3:
                        html += string.Format("<li><div>{0}.<a href=\"javascript:;\" onclick=\"parent.fnMapRecentSearch('{1}','{2}',{3});\">在{4}找{5}</a></div><br /></li>", (i + 1), c[i].key1, c[i].key2, c[i].type, c[i].key1, c[i].key2);
                        break;
                    default:
                        html += string.Format("<li><div>{0}.<a href=\"javascript:;\" onclick=\"parent.fnMapRecentSearch('{1}','{2}',{3});\">{4}</a></div><br /></li>", (i + 1), c[i].key1, c[i].key2, c[i].type, c[i].key1);
                        break;
                }
            }
            $('recentlist').innerHTML = html;
        }
        else {
            $('recentsearch').style.display = 'none';
        }
    }
}

function fnActive() {
    $('mnbox').innerHTML = window.Config.Loading;
    $('recentlist').innerHTML = window.Config.Loading;
    fuRecentSearch();
    fnLoadLocationList(_member);
}

function fnExit() {
   
}

//初始化高度
function fnResize(h) {
    if (!h) {
        $('TabContent').style.height = (fnGetWindowHeight() - 15) + 'px';
    }
    else {
        $('TabContent').style.height = (h - 15) + 'px';
    }
}