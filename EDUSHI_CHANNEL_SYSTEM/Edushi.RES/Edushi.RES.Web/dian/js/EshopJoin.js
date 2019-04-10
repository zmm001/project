//创建一个页面内嵌地图IFRAME
function CreateMapIframe(src) {
    CreatBackground();
    if (!document.getElementById('Map_Loading')) {
        var Map_Loading = document.createElement('div');
        var LoadingLeft = (fnGetWindowWidth() - 200) / 2 + 'px';
        Map_Loading.id = 'Map_Loading';
        if (document.all) {
            Map_Loading.style.cssText = 'border-right: #82aad2; border-top: #82aad2 ; z-index: 10001; left:' + LoadingLeft + '; border-left: #82aad2 ; width: 200px; border-bottom: #82aad2;position: absolute;top:250px;height: 50px; background-color: #ffffff;';
        }
        else {
            Map_Loading.setAttribute('style', 'border-right: #82aad2; border-top: #82aad2 ; z-index: 10001; left:' + LoadingLeft + '; border-left: #82aad2 ; width: 200px; border-bottom: #82aad2;position: absolute;top:250px;height: 50px; background-color: #ffffff');
        }
        document.body.appendChild(Map_Loading);
        var sWaiting = '<table width="100%" height="100%" align="center" style="text-decoration: none;border:#82AAD2 solid;border-width:1 1 1 1;" cellpadding="0" cellspacing="0" border="0"><tr>';
        sWaiting += '<td align="center" style="border:#ffffff solid;border-width:0 1 1 0;text-decoration: none;padding: 2 5 2 5;background-color:F8F9FD;text-align: center;line-height:20px;font-size:12px;font-weight:bold;color: #666666;">所属建筑地图加载中，请稍等.....';
        sWaiting += '<marquee id="LoadMarquee" style="border:1px solid #82AAD2" behavior="scroll" direction="right" width="200" scrollamount="3" scrolldelay="10" bgcolor="#ffffff">';
        sWaiting += '<table cellspacing="0" border="0">';
        sWaiting += '<tr height=8><td bgcolor=#D4DDEC width=8></td>';
        sWaiting += '<td></td><td bgcolor=#C1D1E0 width=8></td>';
        sWaiting += '<td></td><td bgcolor=#9AAFD3 width=8></td>';
        sWaiting += '<td></td><td bgcolor=#6F8DC0 width=8></td>';
        sWaiting += '<td></td><td bgcolor=#6F8DC0 width=8></td>';
        sWaiting += '<td></td><td bgcolor=#6F8DC0 width=8></td>';
        sWaiting += '<td></td><td bgcolor=#6F8DC0 width=8></td>';
        sWaiting += '<td></td><td bgcolor=#9AAFD3 width=8></td>';
        sWaiting += '<td></td><td bgcolor=#C1D1E0 width=8></td>';
        sWaiting += '<td></td><td bgcolor=#D4DDEC width=8></td>';
        sWaiting += '<td></td></tr></table></marquee></td></tr>';
        sWaiting += '</table>';
        Map_Loading.innerHTML = sWaiting;
    }
    else {
        document.getElementById('Map_Loading').style.display = '';
    }

    var id = 'MyEdushiHuiMap';
    realsrc = src; //+'?w='+fnGetWindowWidth()+'&h='+fnGetWindowHeight();
    if (!document.getElementById(id)) {
        //setTimeout("appendMapIframe()",1000);
        appendMapIframe();
    }
    else {
        if (document.getElementById(id).src.indexOf(realsrc) < 0) {
            document.getElementById(id).src = realsrc;
            if (document.all) {
                document.getElementById(id).attachEvent("onload", function() { document.getElementById(id).style.display = ''; });
            }
            else {
                document.getElementById(id).onload = function() { document.getElementById(id).style.display = ''; }
            }
        }
        else {
            document.getElementById(id).style.display = '';
        }
    }
    
}
function appendMapIframe() {

    var createIframe = document.createElement('iframe');
    createIframe.id = 'MyEdushiHuiMap';
    createIframe.frameBorder = '0';
    createIframe.scrolling = "no";
    createIframe.style.position = 'absolute';
    createIframe.style.overflow = 'hidden';
    createIframe.allowTransparency = 'true';
    createIframe.style.width = fnGetWindowWidth() + 'px';
    createIframe.style.height = fnGetWindowHeight() + 'px';
    createIframe.style.left = '0px';
    createIframe.style.top = '0px';
    createIframe.style.zIndex = '10002';
    createIframe.src = realsrc;
    document.body.appendChild(createIframe);
}
//隐藏内嵌的地图IFRAME
function CloseMapIframe() {
    var id = 'MyEdushiHuiMap';
    if (document.getElementById(id)) {
        //alert(1);
        document.getElementById(id).style.display = 'none';
        document.getElementById('Map_Loading').style.display = 'none';
    }
    //alert(2);
    CloseBackground();
}

function ChangeMapIframeSize() {
    var _iframe = document.getElementById("MyEdushiHuiMap");    
    if (_iframe) {
        var w = fnGetWindowWidth();
        var h = fnGetWindowHeight();
        _iframe.style.width = w + 'px';
        _iframe.style.height = h + 'px';
        //if (_iframe.contentWindow) {
            _iframe.contentWindow.document.getElementById("Content").style.width = w + 'px';
            _iframe.contentWindow.document.getElementById("Content").style.height = h + 'px';
        //}
        
        if (document.getElementById("MyEdushiHuiMap").contentWindow.vM) {
            var vM = document.getElementById("MyEdushiHuiMap").contentWindow.vM;
            vM.MapHeight(h);
            vM.MapWidth(w);
        }
    }
}
window.onresize = function() {
    ChangeMapIframeSize();
}
function fnGetWindowWidth() {
    var vh = 0;
    var _dEt = document.documentElement;
    var _dBx = document.body;
    if (typeof window.innerWidth == 'number') vh = window.innerWidth;
    else {
        if (_dEt && _dEt.clientWidth) vh = _dEt.clientWidth;
        else {
            if (_dBx && _dBx.clientWidth) vh = _dBx.clientWidth;
        }
    }
    if (!vh || vh < 100) vh = 100;
    return vh;
}

function fnGetWindowHeight() {
    var vh = 0;
    var _dEt = document.documentElement;
    var _dBy = document.body;
    if (typeof window.innerHeight == 'number') vh = window.innerHeight;
    else {
        if (_dEt && _dEt.clientHeight) vh = _dEt.clientHeight;
        else {
            if (_dBy && _dBy.clientHeight) vh = _dBy.clientHeight;
        }
    }
    if (!vh || vh < 100) vh = 100;
    return vh;
}
function ChooseOwner() {
    CreateMapIframe(eshopurl+'Map.aspx?w=' + fnGetWindowWidth() + "&h=" + fnGetWindowHeight());
}
//实体ID选择回调
function GetOwnerID(oid, title) {
    $('#txtOwnerName').val( title);
    $('#HiddenOwnerID').val( oid);
    CloseMapIframe();
}
//创建一个背景
function CreatBackground() {
    if (!document.getElementById('Map_BG')) {
        var BG = document.createElement('div');
        BG.id = 'Map_BG';
        if (document.all) {
            BG.style.cssText = 'top:0px; left:0px; position:absolute; z-index:10000; background-color:#000000;filter:alpha(opacity=60); opacity:.6;';
        }
        else {
            BG.setAttribute('style', 'top:0px; left:0px; position:absolute; z-index:10000; background-color:#000000;filter:alpha(opacity=60); opacity:.6;');
        }
        BG.style.width = document.body.scrollWidth + 'px';
        BG.style.height = document.body.scrollHeight + 'px';
        document.body.appendChild(BG);
    }
    else {
        document.getElementById('Map_BG').style.display = '';
    }
}
//隐藏背景
function CloseBackground() {
    if (document.getElementById('Map_BG')) {
        document.getElementById('Map_BG').style.display = 'none';
    }
}