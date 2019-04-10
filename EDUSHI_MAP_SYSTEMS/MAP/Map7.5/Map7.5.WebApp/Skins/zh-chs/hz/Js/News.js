window.onload = fnOnload;

function fnOnload() {
    if (!window.Config) {
        setTimeout('fnOnload()', 200);
        return;
    }
    //LoadTuan();
    
    var url = window.Config.DataCetnerAdDataUrl + 'Ad2.0/ads.aspx?citycode=' + window.Config.CityCode + '&l=' + window.Config.Language + '&manyKeys=yeka1,yeka2,yeka3,yeka4,yeka5,yekaliu,yeka-big-ad&callback=showManyAd&key=yeka&domid=div_ad';
    ENetwork.DownloadScript(url);
    fnResize();
}
function LoadTuan() {
    var str;
    str = "<object classid=clsid:D27CDB6E-AE6D-11cf-96B8-444553540000 codebase=http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,28,0 width=310 height=232>";
    str += "<param name=movie value= /images/tuan.swf>";
    str += "<param name=quality value=high>";
    str += "<param name=wmode value=transparent>";
    str += "<param name=SeamlessTabbing value=1>";
    str += "<embed src=/images/tuan.swf  quality=high pluginspage=http://www.macromedia.com/go/getflashplayer type=application/x-shockwave-flash width=310 height=232 swLiveConnect=true></embed>";
    str += "</object>";

    var h = fnGetWindowHeight();
    var w = fnGetWindowWidth();

    if (!$('divDialogBg')) {
        var div = $C('div');
        div.id = 'divDialogBg';
        div.style.backgroundColor = '#FFF';
        div.style.position = 'absolute';
        //div.style.filter = 'alpha(opacity=50)';
        //div.style.opacity = '.50';
        div.style.zIndex = 100001;
        div.style.left = 0;
        div.style.top = 0;
        div.style.width = w + 'px';
        div.style.height = h + 'px';
        document.body.appendChild(div);

    }
    if (!$('divDialog')) {
        var divBox = $C('div');
        divBox.id = 'divDialog';
        divBox.style.left = '0px';
        divBox.style.top = '0px';
        //        divBox.style.left = "50%";
        //        divBox.style.top = "50%";
        //        divBox.style.marginLeft = "-200px";
        //        divBox.style.marginTop = "-150px";
        //        divBox.style.width = "400px";
        //        divBox.style.height = "300px";

        divBox.style.position = 'absolute';
        divBox.style.zIndex = 100002;
        divBox.style.width = '300px';
        divBox.style.height = '120px';
        var boxHtml = '<div style="left:0px;width:320px; top:10px; height:380px;text-align:left;position:relative;overflow:hidden;"><div id="divDialogMsg"></div><div style="position:absolute; top:8px; right:13px; cursor:hand; width:13px;height:13px; overflow:hidden;background:url(/Images/CloseBtn.gif) no-repeat left top;" onclick="javascript:$(\'divDialogBg\').style.display=\'none\';$(\'divDialog\').style.display=\'none\';" onmouseover="this.style.backgroundPosition=\'left -13px\'"onmouseout="this.style.backgroundPosition=\'left top\'" title="关闭窗口"></div></div>';
        document.body.appendChild(divBox);
        setTimeout(function() { divBox.innerHTML = boxHtml; }, 2);
    }
    setTimeout(function() {
        $('divDialogBg').style.display = 'block';
        $('divDialog').style.display = 'block';
        $('divDialogMsg').innerHTML = str;
    }, 10); //延时解决IE6下图片有时不能加载的BUG

    //关闭广告
    //    setTimeout(function() {
    //        $('divDialogBg').style.display = 'none';
    //        $('divDialog').style.display = 'none';
    //    }, 15000);
}
function closeTuanAd(i) {
    $('divDialogBg').style.display = 'none';
    $('divDialog').style.display = 'none';
}
function fnShowInfo() {
    if (typeof _ScrollAdDetail != 'undefined') {
        document.body.innerHTML = '<div style="text-align:center; height:atuo; overflow-y:auto;">' + _ScrollAdDetail.ScrollAdDeatil[0].MDI_Title + '<div style="margin:5px 0">' + _ScrollAdDetail.ScrollAdDeatil[0].MDI_Content.replaceAll('/cityresource2/', window.Config.PicUrl) + '</div>';
    }
}
function showManyAd(AdData, AdKey) {
    if (AdData) {
        var AdDataArr = AdData.split(',');
        var AdKeyArr = AdKey.split(',');
        var yeka1Html = "";
        var yeka2Html = "";
        var yeka3Html = "";
        var yeka4Html = "";
        var yeka5Html = "";
        var yeka6Html = '';
        var yeka7Html = '';
        if (AdDataArr.length == AdKeyArr.length) {
            for (var i = 0; i < AdKeyArr.length; i++) {
                if (AdKeyArr[i] == "yeka1") {
                    yeka1Html = AdDataArr[i];
                }
                else if (AdKeyArr[i] == "yeka2") {
                    yeka2Html = AdDataArr[i];
                }
                else if (AdKeyArr[i] == "yeka3") {
                    yeka3Html = AdDataArr[i];
                }
                else if (AdKeyArr[i] == "yeka4") {
                    yeka4Html = AdDataArr[i];
                }
                else if (AdKeyArr[i] == "yeka5") {
                    yeka5Html = AdDataArr[i];
                }
                else if (AdKeyArr[i] == "yekaliu") {
                    yeka6Html = AdDataArr[i];
                }
                else if (AdKeyArr[i].toLowerCase() == 'yeka-big-ad') {
                    yeka7Html = AdDataArr[i];
                }
            }

        }
        if (yeka7Html.length > 0) {
            var yeka7Dom = document.getElementById('yeka-big-AD');
            yeka7Dom.innerHTML = yeka7Html;
            setTimeout(function() { //关闭新功能提示
                fnClosePanel('yeka-big-AD');
            }, 7000);
        }
        else {
            $('yeka-big-AD').style.display = 'none';
        }
        if (yeka1Html.length > 0) {
            var yeka1Dom = document.getElementById('yeka1_div');
            yeka1Dom.innerHTML = yeka1Html;
        }
        if (yeka2Html.length > 0) {
            var yeka2Dom = document.getElementById('yeka2_div');
            yeka2Dom.innerHTML = yeka2Html;
        }
        if (yeka3Html.length > 0) {
            var yeka3Dom = document.getElementById('yeka3_div');
            yeka3Dom.innerHTML = yeka3Html;
        }
        if (yeka4Html.length > 0) {
            var yeka4Dom = document.getElementById('yeka4_div');
            yeka4Dom.innerHTML = yeka4Html;
        }
        if (yeka5Html.length > 0) {
            var yeka5Dom = document.getElementById('yeka5_div');
            yeka5Dom.innerHTML = yeka5Html;
        }
        if (yeka6Html.length > 0) {
            var yeka6Dom = document.getElementById('yeka6_div');
            yeka6Dom.innerHTML = yeka6Html;
        }
    }
}
//初始化高度
function fnResize(h) {
    if (!h) {
        document.body.style.height = (fnGetWindowHeight() - 10) + 'px';
    }
    else {
        document.body.style.height = (h - 10) + 'px';
    }
}
function fnClosePanel(id) {
    if ($(id)) {
        $(id).parentNode.removeChild($(id));
    }
}
function fnActive() {
    fnResize();
}
