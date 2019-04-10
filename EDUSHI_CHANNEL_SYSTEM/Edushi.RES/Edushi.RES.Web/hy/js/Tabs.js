/* 
类:Lix Tabs
版本:0.1
作者:十年灯 http://www.cnblogs.com/lixlib/
说明:欢迎使用,欢迎转载,但请勿据为已有
	
*/
var $id = function(id) {
    return (typeof id == "Object") ? id : document.getElementById(id);
};
var $$ = function(tag, elm) {
    return elm.getElementsByTagName(tag);
};
var $C = function(cn, tag, elm) {
    if (!tag) tag = '*';
    var ts = $$(tag, elm);
    var classArr = [];
    var filter = new RegExp("(^|\\s)" + cn + "(\\s|$)");
    for (var i = 0, l = ts.length; i < l; i++) {
        if (filter.test(ts[i].className)) {
            classArr.push(ts[i]);
        }
    }
    return classArr;
}
var cutover = function(arr, cur, c1, c0) {
    for (var i = 0, l = arr.length; i < l; i++) {
        arr[i].className = (i == cur) ? c1 : c0;
    }
}

var Tabs = function(elm) {
    if (elm == null) { return false; }
    var t = this;
    /*开始缓存传入参数*/
    t.hdtag = arguments[1].hdtag || t.items.hdtag;
    t.hdcn = arguments[1].hdcn || t.items.hdcn;
    t.hdtagcur = arguments[1].hdtagcur || t.items.hdtagcur;
    t.hdtagno = arguments[1].hdtagno || t.items.hdtagno;
    t.bdtag = arguments[1].bdtag || t.items.bdtag;
    t.bdcn = arguments[1].bdcn || t.items.bdcn;
    t.bdtagcur = arguments[1].bdtagcur || t.items.bdtagcur;
    t.bdtagno = arguments[1].bdtagno || t.items.bdtagno;
    /*缓存参数完成*/

    t.tabhd = $C(t.hdcn, t.hdtag, elm)[0];
    t.tabtag = t.tabhd.children;
    t.tabbd = $C(t.bdcn, t.bdtag, elm)[0];
    t.tabcon = t.tabbd.children;


    t.now = 0;
    t.time = arguments[1].auto;
    t.sum = t.tabtag.length;
    if (t.sum != t.tabcon.length) {
        alert('Tab标签个数与内容个数不匹配');
        return true;
    }
    (function() {

        for (var i = 0; i < t.sum; i++) {
            t.tabtag[i].to = i;
            t.tabtag[i].onmouseover = function() {
                t.now = this.to;
                t.change();
            }
        }
    })();

    if (t.time) {
        function go() {
            t.change();
            t.now = (t.now == t.sum - 1) ? 0 : t.now + 1;
            t.run = setTimeout(arguments.callee, t.time);
        };
        go();
        elm.onmouseover = function() { clearTimeout(t.run); }
        elm.onmouseout = function() { t.run = setTimeout(go, t.time); }
    }


}

Tabs.prototype = {
    items: {
        hdtag: 'DIV',
        hdcn: 'tabhd',
        hdtagcur: 'cur',
        hdtagno: 'none',
        bdtag: 'DIV',
        bdcn: 'tabbd',
        bdtagcur: 'cur',
        bdtagno: 'none'
    },
    change: function() {
        cutover(this.tabtag, this.now, this.hdtagcur, this.hdtagno);
        cutover(this.tabcon, this.now, this.bdtagcur, this.bdtagno);
    }
};
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	