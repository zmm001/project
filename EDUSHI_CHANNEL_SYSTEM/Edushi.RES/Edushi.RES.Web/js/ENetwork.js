function ENetwork(){}
ENetwork.GetExecutionID = function()
{
    var a = new Date, b = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(),
        a.getHours(), a.getMinutes(), a.getSeconds(), a.getMilliseconds());
    b += Math.round(Math.random() * 1000000);
    return b
};
ENetwork.DownloadScriptCallback = function(a)
{
    if (a)
    a()
};
ENetwork.DownloadScript = function(a, b, c)
{
    try
    {
        if (a == null || a == "undefined" || a.length == 0)
            throw new EException("ENetwork:DownloadScript", "err_noscripturl", l24ht);
        
        var elScript = document.createElement("script");
        elScript.type = "text/javascript";
        elScript.language = "javascript";
        elScript.id = typeof(c) == "undefined" ? ENetwork.GetExecutionID() : c;
        elScript.src = a;
        
        if (navigator.userAgent.indexOf("IE") >= 0)
        elScript.onreadystatechange = function()
        {
            if (elScript && ("loaded" == elScript.readyState || "complete" ==
                elScript.readyState))
            {
                elScript.onreadystatechange = null;
                ENetwork.DownloadScriptCallback(b)
            }
        };
        else
        elScript.onload = function()
        {
            elScript.onload = null;
            ENetwork.DownloadScriptCallback(b)
        };
        if(document.getElementById(c))
            ENetwork.GetAttachTarget().removeChild(document.getElementById(c));
            
        ENetwork.GetAttachTarget().appendChild(elScript);
        return elScript.id
    }
    catch (e)
    {
        //alert('加载失败！'+e.message);
    }
};
ENetwork.GetAttachTarget = function()
{
    if (document.getElementsByTagName("head")[0] != null)
        return document.getElementsByTagName("head")[0];
    else
    throw new EException("ENetwork:cstr", "err_noheadelement", l611ft)
};
function EException(b, c, a)
{
    this.source = b;
    this.name = c;
    this.message = a
}

EException.prototype.Name = this.name;
EException.prototype.Source = this.source;
EException.prototype.Message = this.message;
