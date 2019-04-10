var _PrevElement = null;   //保存上次点击的div

var _Page = 1;
var _PageCount = 4;
var _RecordCount = 32;
var _PageSize = 8;
var _SearchData = [];
var _Begin = 0;
var _End = 8;
window.onload = OnLoad;
var localsearch = null;
function OnLoad() {
    if (!window.Config) {
        setTimeout('OnLoad()', 100);
        return;
    }
    $('divContent').innerHTML = window.Config.Loading;
    var googleajax = parent.vM.GoogleAjax();
    localsearch = new googleajax.search.LocalSearch();
    localsearch.setResultSetSize(googleajax.search.Search.LARGE_RESULTSET);
    localsearch.execute(window.Config.CityName + ' ' + unescape(fnRequest('keyword')));
    localsearch.setSearchCompleteCallback(window, function() {
        _SearchData = localsearch.results;
        if (_SearchData.length < 1) {
            $('divResult').innerHTML = '<div class="NoResult">很抱歉，没有找到与"<strong">' + unescape(fnRequest('keyword')) + '</strong>"相匹配的信息</div>';
            $('divContent').innerHTML = '<div class="EdushiAd"><p class="Til">E都市建议您：</p>'
                    + '<p>1.请检查输入的关键字/词是否有误；</p>'
                    + '<p>2.缩短或更改关键词(去掉空格或不必要的词)；</p>'
                    + '<p>3.有问题上<a href="http://hangzhou.edushi.com/bdt/" target="_blank" title="包打听-有问有答本地人">包打听</a>，有问有答本地人！</p></div>';
            fnResize();
            return;

        }
        if (localsearch.cursor) {
            _PageCount = localsearch.cursor.pages.length;
        }
        else {
            _PageCount = 1;
        }
        _End = _SearchData.length;
        _RecordCount = (_PageCount - 1) * 8 + _End;
        fnShowData(_SearchData);
    });
}


//显示搜索到的数据
function fnShowData(results) {
    $('divResult').innerHTML = '<div class="Sea2DTil">在更大面积范围内共有<strong>' + _RecordCount + '项</strong>符合<strong>' + unescape(fnRequest('keyword')) + '</strong>的查询结果</div>';
    var sLocalSearchHtml = '<table id="tbCommend" border="0" cellpadding="1" cellspacing="1" style="line-height:17px;"><!--_Tr--><tr><td style="width:15px;">'
                    + '<img src="/Images/button4.gif" /></td><th>{$Acontent}</th></tr><!--/_Tr--></table>'
                    + '<ul class="LocalList"><!--_Li--><li style="height:auto;"><div class="Number"><span>{$No}</span></div><div class="DetailCon"><div class="TitleNav"><span class="HeadLine"><a href="javascript:;" title="{$Title}" onclick="if(_PrevElement != null){_PrevElement.className=\'Number\';};this.parentNode.parentNode.parentNode.previousSibling.className=\'Number Currently\';_PrevElement=this.parentNode.parentNode.parentNode.previousSibling;parent.fnShowSearchPop({$oid},{$cid},{$lstid},{$X},{$Y},{$DataType},\'{$Name}\',\'{$Address}\',\'{$Telephone}\')">{$Title}</a></span></div><div class="Address">{$Address}</div></div>'
                    + '<div class="DottedLine"></div></li><!--/_Li--></ul><div class="Paginate">{$Page}</div>';
    var TrHtml = fnReadSign('_Tr', sLocalSearchHtml);
    var LiHtml = fnReadSign('_Li', sLocalSearchHtml);

    var r = sLocalSearchHtml.replace(LiHtml, '{$Li}').replace(TrHtml, '{$Tr}');
    var s = '';
    var c = '';
    _End = results.length;
    for (i = _Begin; i < _End; i++) {
        var t = results[i].titleNoFormatting;
        var sAddress = results[i].streetAddress;
        var arrKeyword = unescape(fnRequest('keyword')).split(' ');
        for (var n = 0; n < arrKeyword.length; n++) {
            t = t.replaceAll(arrKeyword[n], '<span style="color:#ff6400;">' + arrKeyword[n] + '</span>');
            sAddress = sAddress.replaceAll(arrKeyword[n], '<span style="color:#ff6400">' + arrKeyword[n] + '</span>');
        }

        var sTmpHtml = '';
        var phoneNumber = '';
        if (results[i].phoneNumbers&&results[i].phoneNumbers.length>0) {
            phoneNumber = results[i].phoneNumbers[0].number;
        }
        sTmpHtml = LiHtml.replace('{$No}', i + 1 + ((_Page - 1) * 8)).replace('{$Title}', results[i].titleNoFormatting).replace('{$Title}', t).replace('{$EID}', results[i].Eaddress).replace('{$AppDomain}', window.Config.Domain).replace('{$X}', results[i].lat).replace('{$Y}', results[i].lng).replace('{$oid}', 0).replace('{$cid}', 0).replace('{$lstid}', 0).replace('{$DataType}', 3).replace('{$Name}', results[i].titleNoFormatting).replace('{$Address}', results[i].streetAddress).replace('{$Telephone}', phoneNumber).replace('{$Address}', sAddress);
        s += sTmpHtml;
    }
    var strPage = fnPager(6, _Page, _PageSize, _PageCount, 'window.fnShowByPage');

    r = r.replace('{$Li}', s).replace('{$Tr}', c).replace('{$Count}', _RecordCount).replace('{$Page}', strPage);
    $('divContent').innerHTML = r;
    fnResize();
    parent.onGoogleSearchDataLoadComplete(_SearchData, _Begin, _End,_Page);
}

function fnShowByPage(iPage) {
    if (iPage) {
        _Page = iPage;
    }
    $('divContent').innerHTML = window.Config.Loading;
    localsearch.gotoPage(iPage-1);
}

function fnActive() {
    if (_SearchData.length > 0) {
        parent.onGoogleSearchDataLoadComplete(_SearchData, _Begin, _End, _Page);
    }
    else {
        parent.onGoogleSearchDataLoadComplete(null, 0, 0, 0);
    }
    fnResize();
}
function fnExit() {
    parent.onGoogleSearchDataLoadComplete(null, 0, 0, 0);
}
//初始化高度
function fnResize() {
    $('TabContent').style.height = fnGetWindowHeight() - 5 + 'px';
}