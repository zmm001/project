function doc(obj) {
    if (typeof (obj) == 'object') {
        return obj;
    }
    else {
        return document.getElementById(obj);
    }
}

function CheckBDTPost() {

    //var content = editor.getSource();
    if (doc('dplBDTType').value == '0') {
        alert('请您选择正确的分类，以使您的打听尽快得到解答');
        doc('dplBDTType').focus();
        return false;
    }
    if (doc('txtTitle').value.length < 5) {
        alert('提问标题不能少于 5 个字');
        doc('txtTitle').focus();
        return false;
    }
    //    if (content.length < 5) {
    //        alert('提问详细不能少于 5 个字');
    //        return false;
    //    }
}