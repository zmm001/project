function show() {
    for (var i = 0; i < document.getElementById("markTypeList").children.length; i++) {
        var marktypelist = document.getElementById("markTypeList").children[i];
        (function (x) {
            if (x == 0) {
                document.getElementById("markTypeList").children[x].className = 'on';
            }
            //IE8
            //marktypelist.attachEvent("onmouseover", function () { selcolTypeList(x) });
            //Firefox
            marktypelist.onmouseover = function () { selcolTypeList(x); }
        })(i);
    }

    for (var m = 0; m < document.getElementById("markNearest").children.length; m++) {
        var marknearest = document.getElementById("markNearest").children[m];
        if (marknearest.className != 'more') {
            (function (y) {
                //IR8
                //marknearest.attachEvent("onmouseover", function () { selcolNearest(y) });
                //Firefox
                marknearest.onmouseover = function () { selcolNearest(y); }
            })(m);
        }
    }
    //IE8
    //document.getElementById("close").attachEvent("onclick", function () { var div = document.getElementById("kendie"); div.parentNode.removeChild(div); });
    //Firefox
    document.getElementById("close").onclick = function () {
        var div = document.getElementById("kendie");
        div.parentNode.removeChild(div);
    }
}

function selcolTypeList(x) {
    for (var j = 0; j < document.getElementById("markTypeList").children.length; j++) {
        document.getElementById("markTypeList").children[j].className = 'dn';
        document.getElementById("markTypeList").children[x].className = 'on';
    }
}

function selcolNearest(y) {
    for (var n = 0; n < document.getElementById("markNearest").children.length; n++) {
        if (document.getElementById("markNearest").children[n].className != 'more') {
            document.getElementById("markNearest").children[n].className = '';
            document.getElementById("markNearest").children[y].className = 'on';
        }
    }
    if (y == '0') {
        document.getElementById("newestQuestion").style.display = '';
        document.getElementById("nearestAnswer").style.display = 'none';
    } else {
        document.getElementById("newestQuestion").style.display = 'none';
        document.getElementById("nearestAnswer").style.display = '';
    }
}