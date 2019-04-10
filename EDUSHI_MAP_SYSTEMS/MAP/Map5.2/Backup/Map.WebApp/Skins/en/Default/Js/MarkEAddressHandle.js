function ShowMarkEAddress(x,y,title,content)
{
    $('divMarkContent').style.display = '';
    $('hx').value = x;
    $('hy').value = y;
    $('divMarkEAddressTitle').innerHTML = title;
    $('divMarkEAddressContent').innerHTML = content;
    if($('divMarkEAddressContent').offsetHeight > 150)
    {
        $('divMarkEAddressContent').style.height = '150px';
    }    
    $('imgSelectPoint').src = '../images/ReMapAc.gif';
    $('imgSelectPoint').alt = '重新取点';
    $('imgSelectPoint').onclick = function(){ReGetPointer()};
    
    parent._MarkEAddress.Hidden();
}
function fnCopyMarkEAddress() {
    if ($('hx').value != '' && $('hy').value != '') {
        parent.fnCopyToClipboard('http://' + parent.GlobalConfig.Domain + '/?x=' + $('hx').value + '&y=' + $('hy').value + '&title=' + escape($('divMarkEAddressTitle').innerHTML) + '&content=' + escape($('divMarkEAddressContent').innerHTML), '复制好了，发给我的QQ/MSN好友分享吧！');
    }
    else {
        alert('请先选择标记位置');
        parent._MarkEAddress.Begin();
    }
}
function fnSaveMarkEAddress() {
    if (parseInt($('hx').value) != '' && parseInt($('hy').value) != '') {
        parent.fnMarkEAddressRegister($('hx').value, $('hy').value, $('divMarkEAddressTitle').innerHTML, $('divMarkEAddressContent').innerHTML)
    }
    else {
        alert('请先选择标记位置');
        parent._MarkEAddress.Begin();
    }
}
function ReGetPointer()
{
    $('divMarkContent').style.display = 'none';
    $('hx').value = '';
    $('hy').value = '';
    $('divMarkEAddressTitle').innerHTML = '';
    $('divMarkEAddressContent').innerHTML = '';
    $('divMarkEAddressContent').style.height = 'auto';    
    parent._MarkEAddress.Begin();
}
function GetPointer()
{
    parent._MarkEAddress.Begin();
}
function fnExit()
{
    parent.vM.HidePointerTip();
    parent._IsBeginMarkEAddress = false;
    parent._MarkEAddress.Hidden();  
}