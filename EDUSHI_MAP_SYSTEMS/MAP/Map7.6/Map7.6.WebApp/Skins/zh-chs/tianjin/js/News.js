window.onload = fnOnload;

function fnOnload() {
    if (!window.Config) {
        setTimeout('fnOnload()', 200);
        return;
    }
    //LoadTuan();

    //var url = window.Config.DataCetnerAdDataUrl + 'Ad2.0/ads.aspx?citycode=' + window.Config.CityCode + '&l=' + window.Config.Language + '&manyKeys=yeka1,yeka2,yeka3,yeka4,yeka5,yekaliu,yeka-big-ad&callback=showManyAd&key=yeka&domid=div_ad';
    //    var script = this.$C('script');
    //    script.type = 'text/javascript';
    //    script.language = 'javascript';
    //    script.src = this.Config.DataCetnerAdDataUrl + 'Ad2.0/ads.aspx?key=youcelunbo&citycode=' + this.Config.CityCode + '&l=' + this.Config.Language;
    //    $("divAd").appendChild(script);

    var url = window.Config.DataCetnerMapDataUrl + "Map7.0/MapRightTabPanel.aspx?citycode=" + window.Config.CityCode + "&l=" + window.Config.Language+"&top=5";
    ENetwork.DownloadScript(url, function () {
        if (typeof _rightTabData != 'undefined') {
            var bdt = _rightTabData.bdt;
            var bang = _rightTabData.bang;
            var cheng = _rightTabData.cheng;
            var html = "", shtml = "";

            if (bang.length > 0) {
                for (var i = 0; i < bang.length; i++) {
                    html += string.Format('<li><a href="{0}" target="_blank" class="tgr">[{1}]</a> <a href="{2}" target="_blank">{3}</a></li>', bang[i].titleurl, decodeURIComponent(bang[i].title), bang[i].suburl, decodeURIComponent(bang[i].subname));
                }
                shtml = string.Format('<ul>{0}<li class=""><a target="_blank" href="http://{1}.edushi.com/bang/" class="tgr fr">更多热门资讯</a> <a href="http://{2}.edushi.com/bang/post.shtml" class="tyl" target="_blank">我要爆料</a></li></ul>', html, window.Config.CityCode, window.Config.CityCode);
                html = "";
            }

            if (cheng.length > 0) {
                for (var i = 0; i < cheng.length; i++) {
                    html += string.Format('<li><a class="tyl fr">{4}</a><span class="tc"> <a href="{0}" class="tgr" target="_blank">[{1}]</a> <a href="{2}" target="_blank">{3}</a></span></li>', cheng[i].suburl, decodeURIComponent(cheng[i].subname), cheng[i].titleurl, decodeURIComponent(cheng[i].title), fnPrice(cheng[i].price.toString()));
                }
                shtml += string.Format('<ul>{0}<li class=""><a target="_blank" href="http://{1}.edushi.com/cheng/" class="tgr fr">更多供求信息</a> <a href="http://{2}.edushi.com/cheng/post/" class="tyl" target="_blank">发布供求信息</a></li></ul>', html, window.Config.CityCode, window.Config.CityCode);
                html = "";
            }

            if (bdt.length > 0) {
                for (var i = 0; i < bdt.length; i++) {
                    html += string.Format('<li><a href="{0}" target="_blank" class="tgr">[{1}]</a> <a href="{2}" target="_blank">{3}</a></li>', bdt[i].titleurl, decodeURIComponent(bdt[i].title), bdt[i].suburl, decodeURIComponent(bdt[i].subname));
                }
                shtml += string.Format('<ul>{0}<li class=""><a target="_blank" href="http://{1}.edushi.com/bdt/" class="tgr fr">更多精彩问答</a> <a href="http://{2}.edushi.com/bdt/" class="tyl" target="_blank">我要提问</a></li></ul>', html, window.Config.CityCode, window.Config.CityCode);
            }

            $("list").innerHTML = shtml;
        }
    });
    fnResize();
}

function fnPrice(price) {
    if (price.toString() == '') {
        return '';
    }

    if (parseInt(price) === 0) {
        return '';
    }

    if (price.toString().indexOf('面议') > -1) {
        return price.toString();
    }

    if (price.toString().indexOf('元') > -1) {
        return price.toString();
    }

    return price.toString() + '元';
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
            setTimeout(function () { //关闭新功能提示
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
        this.$('TabContent').style.height = (fnGetWindowHeight() - 5) + 'px';
    }
    else {
        this.$('TabContent').style.height = (h - 5) + 'px';
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
