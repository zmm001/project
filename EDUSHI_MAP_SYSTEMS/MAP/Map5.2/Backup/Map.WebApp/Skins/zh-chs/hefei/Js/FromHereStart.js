function onGoToHereSearch()
{
    var key = $('popbusnametxt1').value.trim();
    if(key.length < 1 || key == '请输入终点')
    {
        $('popbusnametxt1').focus();
        return;
    }    
    var x = fnRequest('x');
    var y = fnRequest('y');
    parent.fnBusTransferSearch(1, x, y, key);  
}