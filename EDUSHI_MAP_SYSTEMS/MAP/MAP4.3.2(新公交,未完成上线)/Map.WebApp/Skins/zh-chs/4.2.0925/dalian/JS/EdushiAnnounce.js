window.onload=fnOnload;

function fnOnload()
{
    if (typeof parent.parent.EdushiAnnounceList != 'undefined' && parent.parent.EdushiAnnounceList)
    {
        var arr = parent.parent.EdushiAnnounceList;
        for (var i=0; i<arr.length; i++)
        {
            if (arr[i].ID*1 == fnRequest('id')*1)
            {
                document.body.innerHTML='<div style=" text-align:center; height:370px; overflow-y:auto;">'+arr[i].Title+'<div><div style=" margin:0px 5px 5px 10px;text-align:left;">'+arr[i].Content+'</div>';
            }
        }
    }
}