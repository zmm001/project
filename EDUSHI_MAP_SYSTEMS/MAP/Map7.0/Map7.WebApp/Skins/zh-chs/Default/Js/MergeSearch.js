var _Key = '';
var _LST_ID = '';
var _Domain = '';
var _CompanyID = '';
var _LV_ID = '';
var _LT_ID = '';
var _LCE_ShopCard = '';
var _Vip = '';
var HtmlArray = [];
var iNumber = 0;
var _GoogleSearchResult;
window.onload = OnLoad;
function OnLoad() {
    if (!window.Config) {
        setTimeout('OnLoad()', 100);
        return;
    }
    //$('divLocalData').innerHTML = window.Config.Loading;
    var googleajax = parent.vM.GoogleAjax();
    var websearch = new googleajax.search.WebSearch();
    websearch.setResultSetSize(googleajax.search.Search.LARGE_RESULTSET);
    websearch.execute(unescape(fnRequest('key')));
    websearch.setSearchCompleteCallback(window, function() {
        _GoogleSearchResult = websearch.results;
        fnOnload();
    });
}
//window.onload = fnOnload;
function fnOnload() {
    fnResize();
 //   _Key = fnRequest('key');
//    _LST_ID = fnRequest('lst_id');
//    if (this.Config.IsBDT == 1) {
//        var sUrl = window.Config.EDataCenterUrl + 'Search/MergeSearch.aspx?domain=' + window.Config.Domain + '&l=' + window.Config.Language + '&key=' + _Key;
 //       _Key = unescape(_Key);
//       $('sbi').value = window.Config.CityName + ' ' + _Key;
//        ENetwork.DownloadScript(sUrl, function() {
//            HtmlArray.push('<ul class="LocalList">');
//            if (_LST_ID > 0) {
//                _Domain = fnRequest('domain');
//                _CompanyID = fnRequest('cid');
//                _LV_ID = fnRequest('vid');
//                _LT_ID = fnRequest('tid');
//                _LCE_ShopCard = fnRequest('card');
//                _Vip = fnRequest('vip');

//                //杭州添加E店链接及图标
//                var sUrl = '', sVipIcon = '';
//                if (_LST_ID * 1 > 0) {
//                    if (_Domain != '') {
//                        sUrl = 'http://' + _Domain + '.' + window.Config.Domain;
//                    }
//                    else {
//                        sUrl = window.Config.DianUrl + 'VipStore/' + _LST_ID + '/Index.aspx?StoreID=' + _CompanyID;
//                    }
//                }
//                else {
//                    sUrl = window.Config.HuangyeUrl + 'ShopView.aspx?id=' + _CompanyID;
//                }
//                if (_LST_ID * 1 == 2) {
//                    sVipIcon = '<a href="' + sUrl + '" target="_blank"><img src="/Images/ComMapIco1.gif" alt="商务地图" /></a>';
//                }
//                if (_LST_ID * 1 == 1) {
//                    if (_Vip * 1 > 1) {
//                        sVipIcon = '<a href="' + sUrl + '" target="_blank"><img src="/Images/VipEdian.gif" alt="Vip E店" /></a>';
//                    }
//                    else if (_Vip * 1 > 0) {
//                        sVipIcon = '<a href="' + sUrl + '" target="_blank"><img src="/Images/Edian.gif" alt="E店" /></a>';
//                    }
//                }
//                var sJuanIcon = '';
//                if (_LV_ID * 1 > 0) {
//                    sJuanIcon = '<img src="../images/Juan.gif" alt="免费下载本店优惠券" />';
//                }
//                var sCuIcon = '';
//                if (_LT_ID * 1 > 0) {
//                    sCuIcon = '<img src="../images/Cu.gif"alt="本店正在促销打折" />';
//                }
//                var sYingIcon = '';
//                if (_LCE_ShopCard * 1 > 0) {
//                    sYingIcon = '<img src="../images/Ying.gif" alt="本店已通过营业执照认证" />';
//                }
//                HtmlArray.push('<li style="height:auto;"><div class="DetailCon"><div class="TitleNav"><span class="HeadLine"><a href="javascript:;" title="' + _Key + '">' + _Key + '</a></span><span class="IsVipIco">' + sVipIcon + sYingIcon + sJuanIcon + '&nbsp;' + sCuIcon + '</span></div><div class="Address"></div></div><div class="DottedLine"></div></li>');
//            }
//            var linkUrl = '';
//            if (typeof _SalesData != 'undefined') {
////                if (_BdtData.length < 1) {
////                    iNumber++;
////                    HtmlArray.push('<li style="height:auto;"><div class="Number"><span>' + iNumber + '</span></div><div class="DetailCon"><div class="TitleNav"><a href="http://hangzhou.edushi.com/bdt/" target="_blank" title="关于' + _Key + '的包打听">关于' + _Key + '的包打听</a></div><div class="Explain">有问题就去包打听，有问有答本地人</div><div class="Eaddress">http://hangzhou.edushi.com/bdt/</div></div><div class="DottedLine"></div></li>');
////                }
//                //VoucherData 
//                if (_VoucherData.length > 0) {
//                    iNumber++;
//                    HtmlArray.push('<li style="height:auto;"><div class="Number"><span>' + iNumber + '</span></div><div class="DetailCon">');
//                }
//                for (var i = 0; i < _VoucherData.length; i++) {
//                    linkUrl = window.Config.DianUrl + 'VipStore/' + _VoucherData[i].LST_ID + '/VoucherView.aspx?id=' + _VoucherData[i].ID + '&StoreID=' + _VoucherData[i].MCI_ID;
//                    HtmlArray.push('<div class="TitleNav"><a href="' + linkUrl + '" target="_blank" title="' + _VoucherData[i].Title + '">' + _VoucherData[i].Title.replaceAll(_Key, '<span style="color: #FF6400">' + _Key + '</span>') + '</a></div><div class="Eaddress">' + linkUrl + '</div>');
//                    HtmlArray.push('<div class="AltLine"></div>');
//                }
//                if (_VoucherData.length > 0) {
//                    HtmlArray.push('</div><div class="DottedLine"></div></li>');
//                }
//                //SalesData 
//                if (_SalesData.length > 0) {
//                    iNumber++;
//                    HtmlArray.push('<li style="height:auto;"><div class="Number"><span>' + iNumber + '</span></div><div class="DetailCon">');
//                }
//                for (var i = 0; i < _SalesData.length; i++) {
//                    if (_SalesData[i].LST_ID == 2) {
//                        linkUrl = window.Config.DianUrl + 'VipStore/' + _SalesData[i].LST_ID + '/CoDetailNews.aspx?newsid=' + _SalesData[i].ID + '&StoreID=' + _SalesData[i].MCI_ID;
//                    }
//                    else {
//                        linkUrl = window.Config.DianUrl + 'VipStore/' + _SalesData[i].LST_ID + '/EShopNewsView.aspx?newsid=' + _SalesData[i].ID + '&StoreID=' + _SalesData[i].MCI_ID;
//                    }
//                    var content = _SalesData[i].Content.replace(/<\/?[^>]*>/g, '').replace(/\s/gi, '').replaceAll('&nbsp;', '').replaceAll('\t', '');
//                    var cont = content.length > 40 ? content.substr(0, 40) + '…' : content;
//                    HtmlArray.push('<div class="TitleNav"><a href="' + linkUrl + '" title="' + _SalesData[i].Title + '" target="_blank">' + _SalesData[i].Title.replaceAll(_Key, '<span style="color: #FF6400">' + _Key + '</span>') + '</a></div><div class="Explain" title="' + content + '">' + cont.replaceAll(_Key, '<span style="color: #FF6400">' + _Key + '</span>') + '</div><div class="Eaddress">' + linkUrl + '</div>');
//                    HtmlArray.push('<div class="AltLine"></div>');
//                }
//                if (_SalesData.length > 0) {
//                    HtmlArray.push('</div><div class="DottedLine"></div></li>');
//                }
                //_BdtData
//                if (_BdtData.length > 0) {
//                    iNumber++;
//                    HtmlArray.push('<li style="height:auto;"><div class="Number"><span>' + iNumber + '</span></div><div class="DetailCon">');
//                }
//                for (var i = 0; i < _BdtData.length; i++) {
//                    linkUrl = 'http://' + window.Config.Domain + '/bdt/ListedQu.aspx?ID=' + _BdtData[i].ID;
//                    var content = _BdtData[i].Content.replace(/<\/?[^>]*>/g, '').replace(/\s/gi, '').replaceAll('&nbsp;', '').replaceAll('\t', '');
//                    var cont = content.length > 40 ? content.substr(0, 40) + '…' : content;
//                    HtmlArray.push('<div class="TitleNav"><a href="' + linkUrl + '" title="' + _BdtData[i].Title + '" target="_blank">' + _BdtData[i].Title.replaceAll(_Key, '<span style="color: #FF6400">' + _Key + '</span>') + '</a></div><div class="Explain" title="' + content + '">' + cont.replaceAll(_Key, '<span style="color: #FF6400">' + _Key + '</span>') + '</div><div class="Eaddress">' + linkUrl + '</div>');
//                    HtmlArray.push('<div class="AltLine"></div>');
//                }
//                if (_BdtData.length > 0) {
//                    HtmlArray.push('</div><div class="DottedLine"></div></li>');
//                }
//            }
//            else {
////                iNumber++;
////                HtmlArray.push('<li style="height:auto;"><div class="Number"><span>' + iNumber + '</span></div><div class="DetailCon"><div class="TitleNav"><a href="http://' + window.Config.Domain + '/bdt/" target="_blank" title="关于' + _Key + '的包打听">关于' + _Key + '的包打听</a></div><div class="Explain">有问题就去包打听，有问有答本地人</div><div class="Eaddress">http://' + window.Config.Domain + '/bdt/</div></div><div class="DottedLine"></div></li>');
//            }
//            HtmlArray.push('</ul>');
//            $('divestroe').innerHTML = HtmlArray.join('');

//            LoadGoogleAdData();

//        });
//    }
//    else {
        LoadGoogleAdData();
//    }
}
//初始化高度
function fnResize(h) {
    if (!h) {
        $('TabContent').style.height = fnGetWindowHeight() - 5 + 'px';
    }
    else {
        $('TabContent').style.height = h - 5 + 'px';
    }
}

//加载Google广告的数据

function LoadGoogleAdData() {
    HtmlArray = [];
    HtmlArray.push('<ul class="GoogleList">');
    //Google Data Begin
    if (_GoogleSearchResult.length > 0) {
        //        iNumber++;

        var objLocal = document.getElementById('divLocalData');//如果包打听存在
        if (objLocal) {
            iNumber = 2;
        }
        else {
            iNumber = 1;
        }
        HtmlArray.push('<li style="height: auto" id="liGoogleData"><div class="Number"><span>' + iNumber + '</span></div><div class="DetailCon">');
    }
    for (var i = 0; i < _GoogleSearchResult.length; i++) {
        linkUrl = decodeURIComponent(_GoogleSearchResult[i].url);
        var filterHtmlTitle = _GoogleSearchResult[i].title.replace(/<\/?[^>]*>/g, '').replace(/\s/gi, '').replaceAll('&nbsp;', '').replaceAll('\t', '');
        var title = filterHtmlTitle.length > 16 ? filterHtmlTitle.substr(0, 16) + '…': filterHtmlTitle;
        var filterHtmlContent = _GoogleSearchResult[i].content.replace(/<\/?[^>]*>/g, '');
        var content = filterHtmlContent.length > 40 ? filterHtmlContent.substr(0, 40) + '…' : filterHtmlContent;
        HtmlArray.push('<div class="TitleNav"><a href="' + linkUrl + '" target="_blank" title="' + filterHtmlTitle + '" class="LinkExIco">' + title + '</a></div><div class="Explain"><span title="' + filterHtmlContent + '">' + content.replaceAll(_Key, '<span style="color: #FF6400">' + _Key + '</span>') + '</span></div><div class="Eaddress">' + linkUrl + '</div><div class="AltLine"></div>');
    }
    if (_GoogleSearchResult.length > 0) {
        HtmlArray.push('</div></li>');
    }
    //Google Data End
    $('divGoogleData').innerHTML = HtmlArray.join('');


}
