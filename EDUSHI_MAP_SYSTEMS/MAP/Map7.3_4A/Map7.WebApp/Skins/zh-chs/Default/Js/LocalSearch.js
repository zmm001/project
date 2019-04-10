var _SearchType;    //搜索类型
var _Key;           //搜索关键字
var _Address;       //搜索地址

var _PrevElement = null;   //保存上次点击的div

var _Page = 1;
var _PageCount = 1;
var _RecordCount = 0;
var _PageSize = 10;

var _SearchData = {};
var _Begin;
var _End;
var cVouchAd = '';
window.onload = fnOnload;
function reLoadPageSize(iVouchAdLength) {
    _PageSize = Math.floor((fnGetWindowHeight() - 90 - 20 * iVouchAdLength) / 50);
    if (_PageSize < 8) {
        _PageSize = 8;
    }
}
function fnOnload() {
    if (!window.Config) {
        setTimeout('fnOnload()', 200);
        return;
    }
    $('divContent').innerHTML = window.Config.Loading;
    var sSearchType = fnRequest('type');
    _SearchType = sSearchType;
    var sKeyword1 = fnRequest('keyword1');
    _Key = unescape(sKeyword1);
    var sSearchUrl = '';
    
    switch (sSearchType) {
        case '0':        //模糊搜索
            sSearchUrl = window.Config.DataCetnerSearchDataUrl + 'SearchMapOverall/' + window.Config.CityCode + '/' + window.Config.Language + '/Format/Json/Search/1/410?limit=100&q=' + encodeURIComponent(_Key);
            break;
        case '1':       //名称搜索
            sSearchUrl = window.Config.DataCetnerSearchDataUrl + 'SearchMapByName/' + window.Config.CityCode + '/' + window.Config.Language + '/Format/Json/Search/1/100?q=' + encodeURIComponent(_Key);
            break;
        case '2':       //地址搜索
            sSearchUrl = window.Config.DataCetnerSearchDataUrl + 'SearchMapByAddr/' + window.Config.CityCode + '/' + window.Config.Language + '/Format/Json/Search/1/100?q=' + encodeURIComponent(_Key);
            break;
        case '3':       //名称+地址
            _Address = unescape(fnRequest('keyword1'));
            _Key = unescape(fnRequest('keyword2'));
            sSearchUrl = window.Config.DataCetnerSearchDataUrl + 'SearchMapByNameAddr/' + window.Config.CityCode + '/' + window.Config.Language + '/Format/Json/Search/1/100?q=' + encodeURIComponent(_Key) + '&addr=' + encodeURIComponent(_Address);
            break;
        case '4':
            break;
        case '9':   //道路
            sSearchUrl = window.Config.DataCetnerSearchDataUrl + 'SearchMapByRoad/' + window.Config.CityCode + '/' + window.Config.Language + '/Format/Json/Search/1/100?q=' + encodeURIComponent(_Key);
    }
    if (sSearchUrl != '') {
        //推荐
        var _jurl = '';
        if (window.Config.Is3D == 1) {
            _jurl = window.Config.DataCetnerMapDataUrl + "Map7.0/SearchVouch.aspx?citycode=" + window.Config.CityCode + "&l=" + window.Config.Language + "&key=" + fnRequest('keyword1');

            ENetwork.DownloadScript(_jurl, function() {
                if (typeof VouchAd != 'undefined' && VouchAd.length > 0) {
                    for (var u = 0; u < VouchAd.length; u++) {
                        if (VouchAd[u].BAC_OPenType == 2) {
                            cVouchAd += '<tr><td style=\"width:15px;\"><img src=\"/Images/button4.gif\" /></td><th align="left"><a  style="text-decoration:underline;font-weight:bold;color:red;font-size:12px;" href="javascript:parent.ShowCommendPopByContent(\'' + VouchAd[u].BAC_Title + '\',VouchAd[' + u + '].BAC_Content,' + VouchAd[u].BAC_LogincalX + ',' + VouchAd[u].BAC_LogincalY + ')">' + VouchAd[u].BAC_Title + '</a></th></tr>';
                        }
                        else {
                            var _TempVouchAd = "<tr><td style=\"width:15px;\"><img src=\"/Images/button4.gif\" /></td><th align='left'><a style=\"color:#F60;\" href=\"http://{$LinkUrl}\" target=\"_blank\">{$Title}</a></th></tr>";
                            cVouchAd += _TempVouchAd.replace('{$Title}', VouchAd[u].BAC_Title).replace('{$LinkUrl}', VouchAd[u].BAC_LinkUrl.replace('http://', ''));
                        }
                    }
                    reLoadPageSize(VouchAd.length); //根据是否有推荐关键字计算分页数
                }
                else {
                    reLoadPageSize(0);
                }

                ENetwork.DownloadScript(sSearchUrl, function() {
                    fnShowData();
                });
            });
        }
        else {
            ENetwork.DownloadScript(sSearchUrl, function() {
                fnShowData();
            });
        }
    }
}
//显示搜索到的数据
function fnShowData() {
    if (typeof _Search == 'undefined') {
        _Search = [];
    }
    _SearchData = _Search;
    var ulLocalSearchHtml = '', liLocalSearchHtml = '';
    if (_Search.length > 0) {
        if (_SearchType == 3) {
            $('divResult').innerHTML = '<div class="Sea3DTil">共有<strong>' + _Search.length + '项</strong>符合<strong>在' + _Address + '找' + _Key + '</strong>的查询结果</div>';
        }
        else {
            $('divResult').innerHTML = '<div class="Sea3DTil">共有<strong>' + _Search.length + '项</strong>符合<strong>' + _Key + '</strong>的查询结果</div>';
        }

        ulLocalSearchHtml = "";
        ulLocalSearchHtml += "<table id=\"tbCommend\" border=\"0\" cellpadding=\"1\" cellspacing=\"1\" style=\"line-height:17px;\">{$VouchAD}</table><ul class=\"cenne\">{$ListLi}</ul>";
        ulLocalSearchHtml += "<div class=\"page\">{$Page}</div>";

        liLocalSearchHtml += "<li><span class=\"num\">{$No}.</span><span class=\"{$Class}\"><a href=\"javascript:;\" title=\"{$Title}\" onclick=\"RecordClick({$oid},{$cid},{$lstid},{$X},{$Y},{$DataType},'{$Name}','','{$Telephone}',{$num})\">{$Title}</a></span>&nbsp;&nbsp;{$IsVip}<br><span class=\"dz\">{$Address}</span></li>";
    }
    else {
        if (_SearchType == 3) {
            $('divResult').innerHTML = '<div class="NoResult">很抱歉，没有找到与"<strong>在' + _Address + '找' + _Key + '</strong>"相匹配的信息。</div>';
            //$('divContent').innerHTML = '<div class="Search2D">您可以选择在<a href="javascript:;" onclick="parent.fnGoogleSearch(\'' + _Key + ' ' + _Address + '\')">更大面积范围</a>的地图内搜索您要的结果</div>';
        }
        else {
            $('divResult').innerHTML = '<div class="NoResult">很抱歉，没有找到与"<strong>' + _Key + '</strong>"相匹配的信息。</div>';
            //$('divContent').innerHTML = '<div class="Search2D">您可以选择在<a href="javascript:;" onclick="parent.fnGoogleSearch(\'' + _Key + '\')">更大面积范围</a>的地图内搜索您要的结果</div>';
        }

        fnResize();
        //return;
    }

    var s = '';
    var r = '';

    _RecordCount = _Search.length;
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
    var LiHtml = "";
    r = ulLocalSearchHtml;
    for (i = Begin; i < End; i++) {
        LiHtml = liLocalSearchHtml;

        if (_SearchType == 0 || _SearchType == 4) {//模糊
            var t = _Search[i].OCName;
            var sAddress = _Search[i].Address;
            var arrKeyword = _Key.split(' ');
            for (var n = 0; n < arrKeyword.length; n++) {
                var tarrkey = arrKeyword[n];
                if (tarrkey != '') {
                    t = t.replaceAll(arrKeyword[n], '<span style="color:#ff6400;">' + arrKeyword[n] + '</span>');
                    sAddress = sAddress.replaceAll(arrKeyword[n], '<span style="color:#ff6400">' + arrKeyword[n] + '</span>');
                }
            }
        }
        else if (_SearchType == 1 || _SearchType == 9) {//名称
            var t = _Search[i].OCName;
            var sAddress = _Search[i].Address;
            var arrKeyword = _Key.split(' ');
            for (var n = 0; n < arrKeyword.length; n++) {
                var tarrkey = arrKeyword[n];
                if (tarrkey != '') {
                    t = t.replaceAll(arrKeyword[n], '<span style="color:#ff6400;">' + arrKeyword[n] + '</span>');
                }
            }
        }
        else if (_SearchType == 2) {//地址
            var t = _Search[i].OCName;
            var sAddress = _Search[i].Address;
            var arrKeyword = _Key.split(' ');
            for (var n = 0; n < arrKeyword.length; n++) {
                var tarrkey = arrKeyword[n];
                if (tarrkey != '') {
                    sAddress = sAddress.replaceAll(arrKeyword[n], '<span style="color:#ff6400">' + arrKeyword[n] + '</span>');
                }
            }
        }
        else if (_SearchType == 3) {//名称+地址
            var t = _Search[i].OCName.replaceAll(_Address, '<span style="color:#ff6400;">' + _Address + '</span>');
            var sAddress = _Search[i].Address.replaceAll(_Key, '<span style="color:#ff6400;">' + _Key + '</span>');
        }

        var sTmpHtml = '';
        if (_Search[i].RecordType == 1 || _Search[i].RecordType == 2 || _Search[i].RecordType == 4) {
            sTmpHtml = LiHtml.replace('{$No}', i + 1).replace('{$Title}', _Search[i].OCName).replace('{$Title}', t).replace('{$X}', _Search[i].X).replace('{$Y}', _Search[i].Y).replace('{$oid}', _Search[i].OwnerID).replace('{$cid}', _Search[i].CompanyID).replace('{$lstid}', _Search[i].LST_ID).replace('{$DataType}', _Search[i].RecordType).replace('{$Name}', _Search[i].OCName).replace('{$Telephone}', _Search[i].Telephone).replace('{$Address}', sAddress).replace('{$Class}', 'SanWei').replace('{$num}', i);
        }
        else {
            sTmpHtml = LiHtml.replace('{$No}', i + 1).replace('{$Title}', _Search[i].OCName).replace('{$Title}', t).replace('{$X}', _Search[i].Lx).replace('{$Y}', _Search[i].Ly).replace('{$oid}', _Search[i].OwnerID).replace('{$cid}', _Search[i].CompanyID).replace('{$lstid}', _Search[i].LST_ID).replace('{$DataType}', _Search[i].RecordType).replace('{$Name}', _Search[i].OCName).replace('{$Telephone}', _Search[i].Telephone).replace('{$Address}', sAddress).replace('{$Class}', 'ErWei').replace('{$num}', i);
        }

        //杭州添加E店链接及图标
        var sUrl = '', sVipIcon = '';
        var sJuanIcon = '';
        var sCuIcon = '';
        var sYingIcon = '';
        if (_Search[i].LST_ID * 1 > 0) {
            sUrl = window.Config.DianUrl + _Search[i].CompanyID + '.html';
            if (_Search[i].Vip * 1 > 1) {
                sVipIcon = '<a href="' + sUrl + '" target="_blank"><img src="/Images/VipEdian.gif" alt="Vip E店" /></a>';
                if (_Search[i].LV_ID * 1 > 0) {
                    sJuanIcon = '<img src="../images/Juan.gif" alt="免费下载本店优惠券" />';
                }
                if (_Search[i].LT_ID * 1 > 0) {
                    sCuIcon = '<img src="../images/Cu.gif"alt="本店正在促销打折" />';
                }
                if (_Search[i].LCE_ShopCard * 1 > 0) {
                    sYingIcon = '<img src="../images/Ying.gif" alt="本店已通过营业执照认证" />';
                }
            }
        }
        
        sTmpHtml = sTmpHtml.replace('{$IsVip}', '<span class="IsVipIco">' + sVipIcon + sYingIcon + sJuanIcon + '&nbsp;' + sCuIcon + '</span>');
        s += sTmpHtml;
    }
    var strPage = fnPager(5, _Page, _PageSize, _PageCount, 'window.fnShowByPage');
    r = r.replace('{$ListLi}', s).replace('{$Page}', strPage).replace('{$VouchAD}', cVouchAd);
    var tempr = r;
    if (_SearchType == 3) {
        //r += '<div>您可以在<a href="javascript:;" onclick="parent.fnGoogleSearch(\'' + _Key + ' ' + _Address + '\')">更大面积范围</a>的地图内搜索您要的结果</div>';
    }
    else {
        //r += '<div>您可以在<a href="javascript:;" onclick="parent.fnGoogleSearch(\'' + _Key + '\')">更大面积范围</a>的地图内搜索您要的结果</div>';
    }

    if (tempr != '') {
        $('divContent').innerHTML = r;
    }
    else {
        $('divContent').innerHTML = '<table id=\"tbCommend\" border=\"0\" cellpadding=\"1\" cellspacing=\"1\" style=\"line-height:17px;\">' + cVouchAd + '</table>' + r;
    }

    fnResize();
    parent.onSearchDataLoadComplete(_Search, Begin, End);
}

function fnShowByPage(iPage) {
    if (iPage) {
        _Page = iPage;
    }
    fnShowData();
}

function RecordClick(oid, cid, lstid, X, Y, DataType, Name, o, Telephone, num) {
    var typename = '';
    switch (parseInt(_SearchType)) {
        case 1:
            typename = '名称';
            break;
        case 2:
            typename = '地址';
            break;
        case 3:
            typename = '周边';
            break;
        case 4:
            typename = '道路';
            break;
        case 0:
            typename = '全站搜索';
            break;
        default:
            typename = '全站搜索';
            break;
    }
    
    var recordurl = window.Config.EDataCenterUrl + "Statis/KeywordClickStatis/" + window.Config.CityCode + "/" + window.Config.Language + "/" + oid.toString() + "/" + cid.toString() + "/" + (num + 1) + "?type=" + encodeURIComponent(typename) + "&name=" + encodeURIComponent(Name) + "&keys=" + encodeURIComponent(_Key);

    ENetwork.DownloadScript(recordurl, function() { });

    parent.fnShowSearchPop(oid, cid, lstid, X, Y, DataType, '' + Name + '', '', '' + Telephone + '');
}

function fnActive() {
    if (typeof _SearchData != 'undefined' && _SearchData.length > 0) {
        parent.onSearchDataLoadComplete(_SearchData, _Begin, _End);
    }
    else {
        parent.onSearchDataLoadComplete(null, 0, 0);
    }
    fnResize();
}

function fnExit() {
    parent.onSearchDataLoadComplete(null, 0, 0);
    parent._RoadLineLayer.innerHTML = '';
    parent._RoadCoords = [];
}

function fnResize(h) {
    if (!h) {
        this.$('TabContent').style.height = (fnGetWindowHeight() - 5) + 'px';
    }
    else {
        this.$('TabContent').style.height = (h - 5) + 'px';
    }
}
