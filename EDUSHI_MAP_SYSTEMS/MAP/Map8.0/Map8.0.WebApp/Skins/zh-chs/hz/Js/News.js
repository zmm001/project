window.onload = fnOnload;

function fnOnload() {
    if (!window.Config) {
        setTimeout('fnOnload()', 200);
        return;
    }
    
    fnResize();
}

//初始化高度
function fnResize(h) {
    if (!h) {
        this.$('TabContent').style.height = fnGetWindowHeight() + 'px';
    }
    else {
        this.$('TabContent').style.height = h + 'px';
    }
}

function fnActive() {
    fnResize();
}
