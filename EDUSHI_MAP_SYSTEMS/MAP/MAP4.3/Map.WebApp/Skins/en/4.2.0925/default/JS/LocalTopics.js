window.onload=fnOnload;
function fnOnload()
{
    if (!window.Config)
    {
        setTimeout('fnOnload()', 200);
        return;
    }
    //Bengin追加都烩贴子,其它城市没有的只要移除本段代码
    /*
     var url=window.Config._EDataCenterUrl + 'Commmap/LocalTopic.aspx?node='+window.Config._Node+'&l='+window.Config._L+'&v=1.0&RndNum=16&MaxNum=30&Rnd=' +  Math.round(Math.random()*10000);
     ENetwork.DownloadScript(url,
        function(){
            var sTopics = '';
            for (var i=0; i<__RandomTopics.RandomTopics.length; i++)
            {
                if (sTopics != '') sTopics += '<br />';
                sTopics += '<a href="' + window.Config._LocalUrl + 'CityTopic/Type_' + __RandomTopics.RandomTopics[i].LTT_ID + '.shtml" target="_blank"><strong>[' + __RandomTopics.RandomTopics[i].LTT_TypeName + ']</strong></a><a href="' + window.Config._LocalUrl + 'CityTopic/' + __RandomTopics.RandomTopics[i].LT_ID + '.shtml" target="_blank" title="' + __RandomTopics.RandomTopics[i].LT_Title + '">' + __RandomTopics.RandomTopics[i].LT_Title + '</a>';
            }
            document.body.innerHTML += '<div style="margin:5px; width:260px; white-space:nowrap; overflow:hidden; clear:both; ">' + sTopics + '</div>';
        }
     );
     */
     //End
}