var AdUrl = 'http://cedata.edushi.com/ADData/Ad2.0/ads.aspx';
var _IsManyKeys = false;
var _aCityCode = '';
if (typeof EDS_CityCode != 'undefined') {
    _aCityCode = EDS_CityCode;
};
var _EDSl = 'zh-chs';
if (typeof EDS_L != 'undefined') {
    _EDSl = EDS_L;
};
var _aKeys = '';
var _aDomContainer = '';
if (typeof EDS_AdKey != 'undefined') {
    _aKeys = EDS_AdKey;
    if (_aKeys.indexOf(',') > 0) {
        _IsManyKeys = true;
    }
};
if (typeof EDS_AdDom != 'undefined') {
    _aDomContainer = EDS_AdDom;
};

var _gScript = document.getElementsByTagName("script");
for (var i = 0; i < _gScript.length; i++) {
    var _src = _gScript[i].getAttribute('src');
    if (_src) {
        if (_src.toLowerCase().indexOf('ad2.0/jsapi/a.js') > 0) {
            AdUrl = _gScript[i].src.toLowerCase().replace('jsapi/a.js', 'ads.aspx');
            break;
        }
    }
};

function LoadEDSAd() {
    if (_aKeys.length > 0) {
        var _Url = AdUrl + '?CityCode=' + _aCityCode + '&l=' + _EDSl;
        if (_IsManyKeys) {
            var _aKeyArr = _aKeys.split(',');
            var _aDomArr = _aDomContainer.split(',');
            if (_aKeyArr.length == _aDomArr.length) {
                _Url += '&ManyKeys=' + _aKeys + '&AdData=_EDS_AD_Data&callBack=_EdsAdShow';
                _DownloadScript(_Url);
            }
        }
        else {
            _Url += '&key=' + _aKeys;
            if (_aDomContainer.length > 0) {
                _Url += '&domid=' + _aDomContainer;
            }
            _DownloadScript(_Url);
        }

    }
};
function _EdsAdShow(AdData, AdKey) {
    if (_IsManyKeys) {
        if (AdData) {
            var _AdDataKeyArr = AdKey.split(','); //数据对应的Key数组
            var _aAdDataArr = AdData.split(',');
            var _adKeyArr = _aKeys.split(','); //需要获取的广告位Key
            var _aAdHtmlArr = new Array(_adKeyArr.length);
            var _aDomArr = _aDomContainer.split(',');

            for (var i = 0; i < _aAdHtmlArr.length; i++) {
                _aAdHtmlArr[i] = '';
            }
            for (var i = 0; i < _AdDataKeyArr.length; i++) {
                for (var j = 0; j < _adKeyArr.length; j++) {
                    if (_adKeyArr[j].toLowerCase() == _AdDataKeyArr[i].toLowerCase()) {
                        if (_aAdHtmlArr[j].length < 5) {
                            _aAdHtmlArr[j] = _aAdDataArr[i];
                        }
                    }
                }
            }
            for (var i = 0; i < _aDomArr.length; i++) {
                var domObj = document.getElementById(_aDomArr[i]);
                if (domObj) {
                    domObj.innerHTML = _aAdHtmlArr[i];
                }
            }
        }
    }
};

function _GetExecutionID() {
    var a = new Date, b = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds(), a.getMilliseconds());
    b += Math.round(Math.random() * 1000000);
    return b
};

function _DownloadScript(a) {
    try {
        if (a == null || a == "undefined" || a.length == 0) {
            return;
        }
        // alert(a);
        var elID = _GetExecutionID();
        var elScript = document.createElement("script");
        elScript.type = "text/javascript";
        elScript.language = "javascript";
        elScript.id = elID;
        elScript.src = a;
        if (document.getElementById(elID)) {
            _GetAttachTarget.removeChild(document.getElementById(elID));
        }
        _GetAttachTarget().appendChild(elScript);
        return elScript.id;
    }
    catch (e) {
        //alert('加载失败！');
    }
}
function _GetAttachTarget() {
    if (document.getElementsByTagName("head")[0] != null) {
        return document.getElementsByTagName("head")[0];
    }

}
function addOnLoad(fn) {
    if (typeof (fn) != 'function') {
        return false;
    }
    var _onLoad = (window.onload && typeof (window.onload) == 'function') ? window.onload : null;
    window.onload = function() {
        if (_onLoad) {
            _onLoad();
        };
        fn();
    }
};
addOnLoad(LoadEDSAd);