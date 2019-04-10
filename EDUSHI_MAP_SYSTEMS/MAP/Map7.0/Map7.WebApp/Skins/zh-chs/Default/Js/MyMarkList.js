var _member = 0;
var _Page = 1;
var _PageCount = 1;
var _RecordCount = 0;
var _PageSize = 10;
window.onload = fnOnload;

function fnOnload() {
    if (!window.Config) {
        setTimeout('fnOnload()', 200);
        return;
    }
    $('mnbox').innerHTML = window.Config.Loading;
    fnResize();
    parent.__IsShowMarkLocation = true;
    var _mcookie = new CookieHelper();
    _member = _mcookie.getCookie('LmId');
    fnLoadMarkList(_member);

    if (parent._sMarkLocationLayer.style.display == 'none') {
        parent._sMarkLocationLayer.style.display = 'block';
    }
}
function reLoadPageSize() {
    _PageSize = Math.floor((fnGetWindowHeight() - 40) / 30);
    if (_PageSize < 10) {
        _PageSize = 10;
    }
}

function fnLoadMarkList(_member) {
    var url = window.Config.DataCetnerMapDataUrl + "Map7.0/UserDataInfo.aspx?citycode=" + window.Config.CityCode + "&l=" + window.Config.Language + "&lmid=" + _member + "&lmltype=1&req=1&nd=" + $Rnd();
    reLoadPageSize();
    ENetwork.DownloadScript(url, function() {
        LoadData();
        if (typeof _MarkLocationInfo != 'undefined' && _MarkLocationInfo.length > 0) {
            parent.ShowAllMarkLocation(_MarkLocationInfo);
        }
    });
}

function LoadData() {
    if (typeof _MarkLocationInfo != 'undefined' && _MarkLocationInfo.length > 0) {
        _RecordCount = _MarkLocationInfo.length;
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
            tHtml += string.Format("<li onmouseover=\"document.getElementById('d" + (i + 1) + "').style.display='block';\" onmouseout=\"document.getElementById('d" + (i + 1) + "').style.display='none';\"><div style=\"width:250px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;\">{0}.<a href=\"javascript:;\" onclick=\"parent.MoveTo({1},{2});\">{3}</a></div><div id=\"{4}\" style=\"display:none;position:absolute;right:10px;padding:2px 5px;background:#fff;\" class=\"btn\">[<a href=\"javascript:;\" onclick=\"DeleteInfo({5});\">删除</a>]</div><br /></li>", (i + 1), _MarkLocationInfo[i].LML_X, _MarkLocationInfo[i].LML_Y, StringToDate(_MarkLocationInfo[i].LML_CreateTime.split(' ')[0]) + _MarkLocationInfo[i].LML_Title, "d" + (i + 1), _MarkLocationInfo[i].LML_ID);
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
                fnLoadMarkList(_member);
            }
        });
    }
}

function fnShowByPage(iPage) {
    if (iPage) {
        _Page = iPage;
    }
    LoadData();
}

function StringToDate(DateStr) {
    var arys = DateStr.split('-');
    var myDate = arys[0]+'年'+arys[1]+'月'+arys[2]+'日';
    return myDate;
}

function fnExit() {
    
}

function fnActive() {
    $('mnbox').innerHTML = window.Config.Loading;
    fnLoadMarkList(_member);
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