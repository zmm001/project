var _Key = '';
var _Domain = '';
var _CompanyID = '';
var _Vip = '';
var _GoogleSearchResult;

google.load("search", "1");
google.setOnLoadCallback(OnLoad);
function OnLoad() {
    if (!window.Config) {
        setTimeout('OnLoad()', 100);
        return;
    }
    $('divGoogleData').innerHTML = window.Config.Loading;
    var websearch = new google.search.WebSearch();
    websearch.setResultSetSize(google.search.Search.LARGE_RESULTSET);
    websearch.execute(window.Config.CityName + ' ' + unescape(fnRequest('key')));
    websearch.setSearchCompleteCallback(window, function() {
        _GoogleSearchResult = websearch.results;
        fnOnload();
    });
}
//window.onload = fnOnload;
function fnOnload() {
    _Key = fnRequest('key');
    _Domain = fnRequest('domain');
    _CompanyID = fnRequest('cid');
    _Vip = fnRequest('vip');
    //var sUrl = window.Config.EDataCenterUrl + 'Search/MergeSearch.aspx?domain=' + window.Config.Domain + '&l=' + window.Config.Language + '&key=' + _Key;
    _Key = unescape(_Key);
    $('sbi').value = window.Config.CityName + ' ' + _Key;
    ENetwork.DownloadScript(sUrl, function() {
    var HtmlArray = [];
    HtmlArray.push('<ul class="LocalList">');
    var linkUrl = '';
    var iNumber = 0;
    if (typeof _BdtData != 'undefined') {
    if (_BdtData.length < 1) {
    iNumber++;
    HtmlArray.push('<li style="height:auto;"><div class="Number"><span>' + iNumber + '</span></div><div class="DetailCon"><div class="TitleNav"><a href="' + window.Config.DianUrl.replace('dian', 'bdt') + '" target="_blank" title="关于' + _Key + '的包打听">关于' + _Key + '的包打听</a></div><div class="Explain">有问题就去包打听，有问有答本地人</div><div class="Eaddress">' + window.Config.DianUrl.replace('dian', 'bdt') + '</div></div><div class="DottedLine"></div></li>');
    }
    //_BdtData
    if (_BdtData.length > 0) {
    iNumber++;
    HtmlArray.push('<li style="height:auto;"><div class="Number"><span>' + iNumber + '</span></div><div class="DetailCon">');
    }
    for (var i = 0; i < _BdtData.length; i++) {
    linkUrl = window.Config.WebRootPath+'bdt/ListedQu.aspx?ID=' + _BdtData[i].ID;
    var content = _BdtData[i].Content.replace(/<\/?[^>]*>/g, '').replace(/\s/gi, '').replaceAll('&nbsp;', '').replaceAll('\t', '');
    var cont = content.length > 40 ? content.substr(0, 40) + '…' : content;
    HtmlArray.push('<div class="TitleNav"><a href="' + linkUrl + '" title="' + _BdtData[i].Title + '" target="_blank">' + _BdtData[i].Title.replaceAll(_Key, '<span style="color: #FF6400">' + _Key + '</span>') + '</a></div><div class="Explain" title="' + content + '">' + cont.replaceAll(_Key, '<span style="color: #FF6400">' + _Key + '</span>') + '</div><div class="Eaddress">' + linkUrl + '</div>');
    HtmlArray.push('<div class="AltLine"></div>');
    }
    if (_BdtData.length > 0) {
    HtmlArray.push('</div><div class="DottedLine"></div></li>');
    }
    }
    else {
    iNumber++;
    HtmlArray.push('<li style="height:auto;"><div class="Number"><span>' + iNumber + '</span></div><div class="DetailCon"><div class="TitleNav"><a href="' + window.Config.DianUrl.replace('dian', 'bdt') + '" target="_blank" title="关于' + _Key + '的包打听">关于' + _Key + '的包打听</a></div><div class="Explain">有问题就去包打听，有问有答本地人</div><div class="Eaddress">' + window.Config.DianUrl.replace('dian', 'bdt') + '</div></div><div class="DottedLine"></div></li>');
    }
    HtmlArray.push('</ul>');
    $('divLocalData').innerHTML = HtmlArray.join('');
    
    var iNumber = 0;
    HtmlArray = [];
    HtmlArray.push('<ul class="GoogleList">');
    //Google Data Begin
    if (_GoogleSearchResult.length > 0) {
        iNumber++;
        HtmlArray.push('<li style="height: auto" id="liGoogleData"><div class="Number"><span>' + iNumber + '</span></div><div class="DetailCon">');
    }
    for (var i = 0; i < _GoogleSearchResult.length; i++) {
        linkUrl = decodeURIComponent(_GoogleSearchResult[i].url);
        var filterHtmlTitle = _GoogleSearchResult[i].title.replace(/<\/?[^>]*>/g, '').replace(/\s/gi, '').replaceAll('&nbsp;', '').replaceAll('\t', '');
        var title = filterHtmlTitle.length > 16 ? filterHtmlTitle.substr(0, 16) + '…' : filterHtmlTitle;
        var filterHtmlContent = _GoogleSearchResult[i].content.replace(/<\/?[^>]*>/g, '');
        var content = filterHtmlContent.length > 40 ? filterHtmlContent.substr(0, 40) + '…' : filterHtmlContent;
        HtmlArray.push('<div class="TitleNav"><a href="' + linkUrl + '" target="_blank" title="' + filterHtmlTitle + '" class="LinkExIco">' + title + '</a></div><div class="Explain"><span title="' + filterHtmlContent + '">' + content.replaceAll(_Key, '<span style="color: #FF6400">' + _Key + '</span>') + '</span></div><div class="Eaddress">' + linkUrl + '</div><div class="AltLine"></div>');
    }
    if (_GoogleSearchResult.length > 0) {
        HtmlArray.push('</div></li>');
    }
    //Google Data End
    $('divGoogleData').innerHTML = HtmlArray.join('');
    $('TabContent').style.height = fnGetWindowHeight() + 'px';  //初始化高度
}
