function AllCheck(name) {
    var mycheck = document.getElementsByName(name);
    for (var i = 0; i < mycheck.length; i++) {
        mycheck[i].checked = true;
    }
}
//反选所有CheckBox
function ReverseCheck(name) {
    var mycheck = document.getElementsByName(name);
    for (var i = 0; i < mycheck.length; i++) {
        if (mycheck[i].checked) {
            mycheck[i].checked = false;
        }
        else {
            mycheck[i].checked = true;
        }
    }
}
//判断是否有选择的CheckBox
function HasCheck(name) {
    var hascheck = false;
    var mycheck = document.getElementsByName(name);
    for (var i = 0; i < mycheck.length; i++) {
        if (mycheck[i].checked) {
            hascheck = true;
            break;
        }
    }
    if (hascheck) {
        return confirm('确实删除选择项');
    }
    return false;

}

function ShowHiddenMessageContent(id) {
    if (document.getElementById('divSmsView' + id).style.display == 'none') {
        document.getElementById('divSmsView' + id).style.display = '';
    }
    else {
        document.getElementById('divSmsView' + id).style.display = 'none';
    }
}

function ReadMessageContent(id, isread) {
    if (isread == '1') {
        return;
    }
    var readinfo = document.getElementById('spanIsRead' + id);
    readinfo.innerText = '已读';
    readinfo.style.color = '#000';
    $.get("MessageBox.aspx?LSMID=" + id);
}

function CheckMessagePost() {
    if (document.getElementById('txtTitle').value == '') {
        alert('短信标题不能为空');
        document.getElementById('txtTitle').focus();
        return false;
    }
    if (document.getElementById('hdNameIDList').value == '') {
        alert('短信接收人不能为空');
        document.getElementById('txtNameList').focus();
        return false;
    }
    var oEditor = FCKeditorAPI.GetInstance('txtCommentContent');
    var content = oEditor.GetXHTML(true);
    if (content.length < 1) {
        alert('短信内容不能为空');
        return false;
    }
    return true;
}

function ModifyRemark(id) {
    var sRemark = $('txtRemark' + id).value;
    if (sRemark.length < 1) {
        alert('备注内容必须填写');
        return;
    }
    var geturl = 'DataHandle.aspx?action=ModifyRemark&content=' + escape(sRemark) + '&lf_id=' + id;
    ENetwork.DownloadScript(geturl, function () {
        if (typeof _Result != 'undefined') {
            alert(_Result);
        }
        else {
            alert('修改备注失败，请稍候再试');
        }
    }
    );
}

/**********************************************
Ajax类
***********************************************/
function Ajax() {
    var xmlObj = false;
    var CBfunc, ObjSelf;
    ObjSelf = this;
    try { xmlObj = new XMLHttpRequest; }
    catch (e) {
        try { xmlObj = new ActiveXObject("MSXML2.XMLHTTP"); }
        catch (e2) {
            try { xmlObj = new ActiveXObject("Microsoft.XMLHTTP"); }
            catch (e3) { xmlObj = false; }
        }
    }
    if (!xmlObj) { return false; }
    if (arguments[0]) { this.url = arguments[0]; } else { this.url = ""; }
    if (arguments[1]) { this.callback = arguments[1]; } else { this.callback = function (obj) { return }; }
    if (arguments[2]) { this.content = arguments[2]; } else { this.content = ""; }
    if (arguments[3]) { this.method = arguments[3]; } else { this.method = "POST"; }
    if (arguments[4]) { this.async = arguments[4]; } else { this.async = true; }
    this.send = function () {
        var purl, pcbf, pc, pm, pa;
        if (arguments[0]) { purl = arguments[0]; } else { purl = this.url; }
        if (arguments[1]) { pc = arguments[1]; } else { pc = this.content; }
        if (arguments[2]) { pcbf = arguments[2]; } else { pcbf = this.callback; }
        if (arguments[3]) { pm = arguments[3]; } else { pm = this.method; }
        if (arguments[4]) { pa = arguments[4]; } else { pa = this.async; }
        if (!pm || !purl || !pa) { return false; }
        xmlObj.open(pm, purl, pa);
        if (pm == "POST") { xmlObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); }
        xmlObj.onreadystatechange = function () {
            if (xmlObj.readyState == 4) {
                if (xmlObj.status == 200) {
                    pcbf(xmlObj);
                }
                else {
                    pcbf(null);
                }
            }
        };
        if (pm == "POST") {
            xmlObj.send(pc);
        }
        else {
            xmlObj.send("");
        }
    };
    this.get = function () {
        var purl, pcbf;
        if (arguments[0]) { purl = arguments[0]; } else { purl = this.url; }
        if (arguments[1]) { pcbf = arguments[1]; } else { pcbf = this.callback; }
        if (!purl && !pcbf) { return false; }
        this.send(purl, "", pcbf, "GET", true);
    };
    this.post = function () {
        var fo, pcbf, purl, pc, pm;
        if (arguments[0]) { fo = arguments[0]; } else { return false; }
        if (arguments[1]) { pcbf = arguments[1]; } else { pcbf = this.callback; }
        if (arguments[2]) {
            purl = arguments[2];
        }
        else if (fo.action) {
            purl = fo.action;
        }
        else {
            purl = this.url;
        }
        if (arguments[3]) {
            pm = arguments[3];
        }
        else if (fo.method) {
            pm = fo.method.toLowerCase();
        }
        else {
            pm = "post";
        }
        if (!pcbf && !purl) { return false; }
        pc = this.formToStr(fo);
        if (!pc) { return false; }
        if (pm) {
            if (pm == "post") {
                this.send(purl, pc, pcbf, "POST", true);
            }
            else {
                if (purl.indexOf("?") > 0) {
                    this.send(purl + "&" + pc, "", pcbf, "GET", true);
                }
                else {
                    this.send(purl + "?" + pc, "", pcbf, "GET", true);
                }
            }
        }
        else {
            this.send(purl, pc, pcbf, "POST", true);
        }
    };

    this.formToStr = function (fc) {
        var i, query_string = "", and = "";
        for (i = 0; i < fc.length; i++) {
            e = fc[i];
            if (e.name != '') {
                if (e.type == 'select-one') {
                    element_value = e.options[e.selectedIndex].value;
                }
                else if (e.type == 'checkbox' || e.type == 'radio') {
                    if (e.checked == false) {
                        continue;
                    }
                    element_value = e.value;
                }
                else {
                    element_value = e.value;
                }
                element_value = encodeURIComponent(element_value);
                query_string += and + e.name + '=' + element_value;
                and = "&";
            }
        }
        return query_string;
    };
}

function LoadCity(provinceId, subtypeId) {

    var ajax = new Ajax();
    ajax.get('/my/GetDataHandler.aspx?type=citylist&ProvinceId=' + provinceId + "&rnd=" + Math.round(Math.random() * 10000)
        , function (xmlObj) {
            if (xmlObj != null) {
                var count = document.getElementById(subtypeId).options.length;
                for (var i = 0; i < count; i++) {
                    document.getElementById(subtypeId).remove(0);
                }
                var arr = eval(xmlObj.responseText);
                for (var i = 0; i < arr.length; i++) {
                    var option = document.createElement('option');
                    document.getElementById(subtypeId).options.add(option);
                    option.text = arr[i].CityName;
                    option.value = arr[i].CityCode;
                }
            }
            else {
                alert('数据加载失败.');
            }
        }
    );
}