
function cmCreateXMLHTTP() {
    var objXMLHTTP = null;
    if (window.XMLHttpRequest) {
        objXMLHTTP = new XMLHttpRequest();

    } else if (window.ActiveXObject) {
        objXMLHTTP = new ActiveXObject("Microsoft.XMLHTTP");

    }
    return objXMLHTTP;
}

function cmXMLHttpReq(nReqType, strReqOpenUrl, strReqParam, pResponseFunc) {
    if (nReqType < 0 || nReqType > 1)
        return;
    var objXMLHTTP = cmCreateXMLHTTP();
    if (objXMLHTTP != null) {
        function responseProcess() {
            if (objXMLHTTP.readyState == 4) {
                pResponseFunc(objXMLHTTP);
            }

        }
        objXMLHTTP.onreadystatechange = responseProcess;
        if (nReqType == 0) {
            objXMLHTTP.open("GET", strReqOpenUrl, true);
            objXMLHTTP.send(null);
        }
        else {
            objXMLHTTP.open("POST", strReqOpenUrl, true);
            objXMLHTTP.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            objXMLHTTP.send(strReqParam);
        }
    }
}
