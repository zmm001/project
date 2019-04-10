function imgErrorReplace(replace2src, excludeClass) {
    function hasClass(ele, cls) {
        return new RegExp('(\\s¦^)' + cls + '(\\s¦$)').test(ele.className);
    }



    var imgArr1 = document.getElementsByTagName('img'),
		excludeClass = excludeClass ? excludeClass.replace(/\s/g, '') : '';
    if (excludeClass != '') {
        var imgArr2 = [];
        for (k in imgArr1) {
            if (!hasClass(imgArr1[k], excludeClass)) {
                imgArr2.push(imgArr1[k]);
            }
        }
    }
    else {
        var imgArr2 = imgArr1;
    }
    //alert(imgArr2.length);
    for (var i = 0; i < imgArr2.length; i++) {
        listenError(imgArr2[i], replace2src);
    }
}

function listenError(obj, replace2src) {
    //alert(obj.src);
    //alert(obj.addEventListener);
    //alert(obj.attachEvent);
    if (obj.addEventListener) {
        obj.addEventListener('error', function () {
            obj.src = replace2src;
        }, false);
    }
    else if (obj.attachEvent) {
    obj.attachEvent('onerror', function () {
        obj.src = replace2src;
    });
    }
}