function onToHereSearch()
{
    var key = $('popbusnametxt1').value.trim();
    if(key.length < 1 || key == '请输入起点')
    {
        $('popbusnametxt1').focus();
        return;
    }
    var x = fnRequest('x');
    var y = fnRequest('y');
    parent.fnBusTransferSearch(2, x, y, key);
}