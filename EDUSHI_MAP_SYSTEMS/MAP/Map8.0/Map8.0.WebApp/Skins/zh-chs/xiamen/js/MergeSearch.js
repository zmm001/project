window.onload = OnLoad;
function OnLoad() {
    if (!window.Config) {
        setTimeout('OnLoad()', 100);
        return;
    }
    var url = window.Config.DataCetnerMapDataUrl + "Map7.0/MapRightTabPanel.aspx?citycode=" + window.Config.CityCode + "&l=" + window.Config.Language + "&top=1";
    ENetwork.DownloadScript(url, function () {
        if (typeof _rightTabData != 'undefined') {
            var bdt = _rightTabData.bdt;
            var bang = _rightTabData.bang;
            var cheng = _rightTabData.cheng;
            var html = "", shtml = "";

            if (bang.length > 0) {
                for (var i = 0; i < bang.length; i++) {
                    html += string.Format('<li><a href="http://{0}.edushi.com/bang/" target="_blank" class="tgr">[生活帮]</a> <a href="{1}" target="_blank" class="info">{2}</a><a href="http://{3}.edushi.com/bang/post.shtml" target="_blank" class="btn">爆料</a></li>', window.Config.CityCode, bang[i].suburl, decodeURIComponent(bang[i].subname), window.Config.CityCode);
                }
            }

            if (cheng.length > 0) {
                html += string.Format('<li><a href="http://{0}.edushi.com/cheng/" target="_blank" class="tgr">[E同城]</a> <a href="{1}" target="_blank" class="info">{2}</a><a href="http://{3}.edushi.com/cheng/post/" target="_blank" class="btn">供求</a></li>', window.Config.CityCode, cheng[0].titleurl, decodeURIComponent(cheng[0].title), window.Config.CityCode);
            }

            if (bdt.length > 0) {
                for (var i = 0; i < bdt.length; i++) {
                    html += string.Format('<li><a href="http://{0}.edushi.com/bdt/" target="_blank" class="tgr">[包打听]</a> <a href="{1}" target="_blank" class="info">{2}</a><a href="http://{3}.edushi.com/bdt/" target="_blank" class="btn">提问</a></li>', window.Config.CityCode, bdt[i].suburl, decodeURIComponent(bdt[i].subname), window.Config.CityCode);
                }
            }

            $("list").innerHTML = html;
        }
    });
    fnResize();
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
