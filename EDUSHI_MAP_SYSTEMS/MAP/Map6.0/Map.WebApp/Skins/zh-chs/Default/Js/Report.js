window.onload = fnOnload;
function fnOnload() {
    if (!window.Config) {
        setTimeout('fnOnload()', 200);
        return;
    }
    var coords = fnRequest('Croods');
    if (coords != '') {
        EndGetReportCoords(coords);
    }
    else {
        if (fnRequest('x') != '0' || fnRequest('y') != '0') {
            coords = fnRequest('x') + ',' + fnRequest('y');
            EndGetReportCoords(coords);
        }
    }
    fnResize();
}

function StartGetReportCoords() {
    if (parent.fnStartGetReportCoords()) {
        if ($('strongPlaceSelect').innerHTML == '已选择') {
            $('strongPlaceSelect').innerHTML = '未选择';
        }
        $('imgGetReportCoords').src = $('imgGetReportCoords').src.replace('ReMapAc.gif', 'ToMapRope.gif');
        $('hidCoords').value = '';
    }
}

function EndGetReportCoords(coords) {
    if ($('strongPlaceSelect').innerHTML == '未选择') {
        $('strongPlaceSelect').innerHTML = '已选择';
    }
    $('imgGetReportCoords').src = $('imgGetReportCoords').src.replace('ToMapRope.gif', 'ReMapAc.gif');
    $('hidCoords').value = coords;
}


//初始化高度
function fnResize() {
    $('TabContent').style.height = fnGetWindowHeight() + 'px';
}

function checkReportData() {
    if ($('hidCoords').value == '') {
        alert('请选择报料的位置');
        return false;
    }
    if ($('txtTitle').value == '') {
        alert('报料标题不能为空');
        $('txtTitle').focus();
        return false;
    }
    if ($('txtContent').value == '') {
        alert('报料内容不能为空');
        $('txtContent').focus();
        return false;
    }
}