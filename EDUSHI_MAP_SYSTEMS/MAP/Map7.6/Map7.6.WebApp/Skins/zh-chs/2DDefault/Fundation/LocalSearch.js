var _Page = 1;
var _PageCount = 1;
var _RecordCount = 0;
var _PageSize = 15;

var _SearchData = {};
var _Begin;
var _End;

window.onload = fnOnload;

function fnOnload() {
    if (!window.Config) {
        setTimeout('fnOnload()', 200);
        return;
    }
    alert();
    debugger;
    $('divResult').innerHTML = window.Config.Loading;
    var sKeyword = fnRequest('keyword');
    _Key = unescape(sKeyword);
    var map = parent.vM["SogouMap"].SMap.map;
    var sRender = new map.maps.SearchRenderer({ 'panel': $('result') });
    var request = {
        'map': map,
        'what': {
            'keyword': _Key
        }
    };
    var search = new map.maps.Search(); //创建搜索实例
    search.search(request);
    search.setRenderer(sRender);
    fnResize();
}

function fnActive() {
    fnResize();
}

function fnResize(h) {
    if (!h) {
        this.$('TabContent').style.height = (fnGetWindowHeight()-5) + 'px';
    }
    else {
        this.$('TabContent').style.height = (h-5) + 'px';
    }
}
