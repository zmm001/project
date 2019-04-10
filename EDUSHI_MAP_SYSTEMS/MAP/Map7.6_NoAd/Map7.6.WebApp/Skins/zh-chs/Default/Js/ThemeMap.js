_Data = '';
_Key = '';
_Page = 1;
_RecordCount = 0;
_PageSize = 10;
_PageCount = 1;
_Result = '';

var _ThemeData = {};
var _Begin;
var _End;
var btid = 0;
var type = 0;
window.onload = fnOnload;
function reLoadPageSize(isHasSubType) {
    if (isHasSubType) {
        _PageSize = Math.floor((fnGetWindowHeight() - 132) / 24);
    }
    else {
        _PageSize = Math.floor((fnGetWindowHeight() - 113) / 24);
    }
    if (_PageSize < 13) {
        _PageSize = 13;
    }
}
function fnOnload() {
    if (!window.Config) {
        setTimeout('fnOnload()', 200);
        return;
    }
    $('TabContent').innerHTML = window.Config.Loading;
    btid = fnRequest('classid');
    _Key = unescape(fnRequest('key'));
    type = fnRequest('type');
    var url;
    if (type == '1') {
        url = window.Config.DataCetnerMapDataUrl + 'Map7.0/ThemeMaps.aspx?citycode=' + window.Config.CityCode + '&l=' + window.Config.Language + '&req=5&typeid=' + btid;
    }
    else {
        url = window.Config.DataCetnerMapDataUrl + 'Map7.0/ThemeMaps.aspx?citycode=' + window.Config.CityCode + '&l=' + window.Config.Language + '&req=2&typeid=' + btid;
    }
    ENetwork.DownloadScript(url, function() {
        if (typeof _ThemeMapList != 'undefined') {
            fnShow();
        } else {
            fnOutPut('无分类结果！');
        }
    });

    //广告
    var script = this.$C('script');
    script.type = 'text/javascript';
    script.language = 'javascript';
    script.src = window.Config.DataCetnerAdDataUrl + 'Ad2.0/ads.aspx?citycode=' + window.Config.CityCode + '&l=' + window.Config.Language + '&key=zhutidituliebiao&domid=Photo';
    document.getElementsByTagName('head')[0].appendChild(script);
}
function fnOutPut(a) {
    $('TabContent').innerHTML = a;
    $('TabContent').style.height = fnGetWindowHeight() - 65 + 'px';  //初始化高度
}
function fnShow() {
    if (typeof _ThemeMapList == 'undefined') {
        return;
    }
    _ThemeData = _ThemeMapList;
    var sLocalSearch = '<table width="100%" id="tbCommend" border="0" align="center" cellpadding="1" cellspacing="1"><!--_Tr--><tr><td style="width:15px">'
                            + '<img src="/Images/button4.gif" /></td><td>{$Acontent}</td></tr><!--/_Tr--></table>'
                            + '<ul class="LocalList"><!--_Li--><li style="height:auto;white-space:nowrap;"><div style="width:21px; margin-right:3px; float:left; height:21px;background:url({$ThemeImage}) no-repeat left center;"></div><div style="height:21px; line-height:21px; width:255px; overflow:hidden; float:left;"><span style="float:left;display:block;">{$No}.</span><a href="{$url}" title="{$Title}" {$click} style="float:left;display:block;width:{$width};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{$Title}</a>{$yuding}</div><div class="DottedLine"></div></li><!--/_Li--></ul>'
                            + '<div class="Paginate">{$Page}</div>'
                            + '<div class="ThemeMapCopy"><input value="{$ActiveThemeUrl}" type="text" onfocus="this.select()" /><div><img style="cursor:pointer;" src="/Images/ToFriend.gif" title="复制给好友" onclick="parent.fnCopyToClipboard(\'{$ActiveThemeUrl}\',\'复制好了，发给我的QQ/MSN好友分享吧！\');"></div></div>';
    var LiHtml = fnReadSign('_Li', sLocalSearch);
    var TrHtml = fnReadSign('_Tr', sLocalSearch);
    var r = sLocalSearch.replace(LiHtml, '{$Li}').replace(TrHtml, '');
    var s = '';
    if (_ThemeMapList.SubTypeList.length > 0) {
        reLoadPageSize(true);
    }
    else {
        reLoadPageSize(false);
    }
    _RecordCount = _ThemeMapList.ThemeList.length;
    if (_RecordCount % (_PageSize) == 0) {
        _PageCount = _RecordCount / (_PageSize);
    } else {
        _PageCount = int(_RecordCount, _PageSize) + 1;
    }
    var Begin = (_Page - 1) * (_PageSize);
    var End = _Page * _PageSize;
    _Begin = Begin;
    _End = End;
    if (End > _RecordCount) End = _RecordCount;

    //分类主题添加久久票务网合作///////////////////
    var _tPiao = [];
    var _ThemeMapPiaoJson = { 'shanghai': [21, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
        'hz': [413],
        'zhengzhou': [1],
        'fuzhou': [2],
        'guilin': [1],
        'baotou': [2]
    };

    _tPiao = _ThemeMapPiaoJson[window.Config.CityCode];

    var flgMapTemp = false;
    if (typeof _tPiao != 'undefined' && _tPiao.length > 0) {
        for (var h = 0; h < _tPiao.length; h++) {
            if (parseInt(_tPiao[h]) == parseInt(btid)) {
                flgMapTemp = true;
                break;
            }
        }
    }
    else {
        flgMapTemp = false;
    }
    ////////////////////////////////////////////////

    for (i = Begin; i < End; i++) {
        var oTheme = _ThemeMapList.ThemeList[i];
        if (oTheme.BCC_CompanyICO != '') //判断是否有主题点图片
        {
            var sThemeImage = window.Config.PicUrl + 'cn/' + window.Config.CityCode + '/' + window.Config.Language + '/themeImages/BBLCompany/' + oTheme.BCC_CompanyICO;
        }
        else {
            var sThemeImage = window.Config.PicUrl + 'cn/' + window.Config.CityCode + '/' + window.Config.Language + '/themeImages/' + oTheme.BCT_TypeICO;
        }
        if (oTheme.BCT_ID < 1) {
            var sStyle = oTheme.PStyle;
        }
        else {
            var sStyle = oTheme.SStyle;
        }
        var t = oTheme.BCC_CompanyName.replace(_Key, '<span style="color:#ff8601;">' + _Key + '</span>');

        if (oTheme.BCC_CompanyID * 1 == 0) {
            //.replace('{$yuding}', '<span style="float:right;"><a onclick="parent.parent.PiaoList();" href="#">我要预订</a></span>')
            //onclick="parent.fnShowThemePop({$tid},{$X},{$Y},{$cid},{$btid});"
            var tempclick = string.Format("onclick='parent.fnShowThemePop({0},{1},{2},{3},{4});'", oTheme.BCC_ID, oTheme.X, oTheme.Y, 0, btid);
            if (flgMapTemp) {
                s += LiHtml.replace('{$No}', i + 1).replace('{$Title}', oTheme.BCC_CompanyName).replace('{$Title}', t).replace('{$Address}', oTheme.BCC_Address).replace('{$ThemeImage}', sThemeImage).replace('{$yuding}', '<span style="display:block;float:right;background:#f90;color:#fff;padding:0 2px;"><a onclick="parent.parent.PiaoList();" href="#" style="color:#fff;">我要订票</a></span>').replace('{$width}', '185px').replace("{$click}", tempclick).replace("{$url}", 'javascript:;');
            }
            else {
                if (oTheme.BCC_Url == '' || typeof oTheme.BCC_Url == 'undefined') {
                    s += LiHtml.replace('{$No}', i + 1).replace('{$Title}', oTheme.BCC_CompanyName).replace('{$Title}', t).replace('{$Address}', oTheme.BCC_Address).replace('{$ThemeImage}', sThemeImage).replace('{$yuding}', '').replace('{$width}', '230px').replace("{$click}", tempclick).replace("{$url}", 'javascript:;');
                }
                else {
                    s += LiHtml.replace('{$No}', i + 1).replace('{$Title}', oTheme.BCC_CompanyName).replace('{$Title}', t).replace('{$Address}', oTheme.BCC_Address).replace('{$ThemeImage}', sThemeImage).replace('{$yuding}', '').replace('{$width}', '230px').replace("{$click}", 'target="_blank"').replace("{$url}", oTheme.BCC_Url);
                }
            }
        }
        else {
            var tempclick = string.Format("onclick='parent.fnShowThemePop({0},{1},{2},{3},{4});'", oTheme.BCC_ID, oTheme.X, oTheme.Y, oTheme.BCC_CompanyID, btid);
            if (flgMapTemp) {
                s += LiHtml.replace('{$No}', i + 1).replace('{$Title}', oTheme.BCC_CompanyName).replace('{$Title}', t).replace('{$Address}', oTheme.BCC_Address).replace('{$ThemeImage}', sThemeImage).replace('{$yuding}', '<span style="display:block;float:right;background:#f90;padding:0 2px;"><a onclick="parent.parent.PiaoList();" href="#" style="color:#fff;">我要订票</a></span>').replace('{$width}', '185px').replace("{$click}", tempclick).replace("{$url}", 'javascript:;');
            }
            else {
                if (oTheme.BCC_Url == '' || typeof oTheme.BCC_Url == 'undefined') {
                    s += LiHtml.replace('{$No}', i + 1).replace('{$Title}', oTheme.BCC_CompanyName).replace('{$Title}', t).replace('{$Address}', oTheme.BCC_Address).replace('{$ThemeImage}', sThemeImage).replace('{$yuding}', '').replace('{$width}', '230px').replace("{$click}", tempclick).replace("{$url}", 'javascript:;');
                }
                else {
                    s += LiHtml.replace('{$No}', i + 1).replace('{$Title}', oTheme.BCC_CompanyName).replace('{$Title}', t).replace('{$Address}', oTheme.BCC_Address).replace('{$ThemeImage}', sThemeImage).replace('{$yuding}', '').replace('{$width}', '230px').replace("{$click}", 'target="_blank"').replace("{$url}", oTheme.BCC_Url);
                }
            }
        }
    }
    var t = '';
    if (_ThemeMapList.SubTypeList.length > 0) {
        for (j = 0; j < _ThemeMapList.SubTypeList.length; j++) {
            var oSubType = _ThemeMapList.SubTypeList[j];
            t += '<a href="javascript:;" onclick="parent.fnLoadThemeMapListByTypeId(' + oSubType.BCT_ID + ',\'' + oSubType.BCT_TypeName + '\')">' + oSubType.BCT_TypeName + ' </a> ';
        }
        s += '<li style="height:auto; line-height:130%;">分类：' + t + '</li>';
    }
    var strPage = fnPager(5, _Page, _PageSize, _PageCount, 'window.ShowByPage');
    r = r.replace('{$Li}', s).replace('{$Count}', _RecordCount).replace('{$Key}', _Key).replace('{$Page}', strPage);
    r = r.replace(/\{\$ActiveThemeUrl\}/gi, 'http://' + window.Config.Domain + '/?tid=' + fnRequest('classid') + '&tname=' + fnRequest('key'));

    fnOutPut(r);
    r = null;
    if (_Page == 1) {
        parent.onThemeDataLoadComplete(_ThemeMapList.ThemeList, btid);
    }
}
function ShowByPage(iPage) {
    if (iPage) {
        _Page = iPage;
    }
    fnShow();
}
function fnActive() {
    if (typeof _ThemeMapList != 'undefined' && _ThemeMapList.ThemeList.length > 0) {
        parent.onThemeDataLoadComplete(_ThemeData.ThemeList, btid);
    }
    else {
        parent.onThemeDataLoadComplete(null, btid);
    }
    fnResize();
}
function fnExit() {
    parent.onThemeDataLoadComplete(null, btid);
}
function fnResize(h) {
    if (!h) {
        $('TabContent').style.height = (fnGetWindowHeight() - 55) + 'px';
    }
    else {
        $('TabContent').style.height = (h - 55) + 'px';
    }
}
