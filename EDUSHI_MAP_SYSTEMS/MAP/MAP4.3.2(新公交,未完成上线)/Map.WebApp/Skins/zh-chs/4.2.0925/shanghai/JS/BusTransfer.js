
var nArea = 500;
window.onload=fnOnload;

function fnOnload()
{
    if (!window.Config)
    {
        setTimeout('fnOnload()', 200);
        return;
    }
    document.body.innerHTML=window.Config._Loading;
    var _BusTransfer = '<ul class="huancheng" style="white-space:nowrap; margin-top:10px; height:30px; clear:both;"><li class="se"><div style="width:80px; padding:1px 5px 0 5px; border:solid 1px #999; color:#1A70C7;">从这里出发到</div></li><li><input id="busnametxt" name="busnametxt" style="padding-top:4px;height:18px;border:solid 1px #999; color:#666;" value="请输入终点" onfocus="this.value=\'\';" type="text"></li><li class="chaxun1">'
                    +'<img style="cursor:pointer;" onclick="parent.PopControlForm._busSEXYSearch(1, fnRequest(\'x\'),fnRequest(\'y\'),$(\'busnametxt\').value);" src="'+window.Config._ImgPath+'14.jpg" /></li></ul>';
                    
    _BusTransfer += '<ul class="huancheng" style="white-space:nowrap; margin-top:0;height:30px; clear:both;"><li class="se"><div style="width:80px; padding:1px 5px 0 5px; border:solid 1px #999; color:#1A70C7;">如何到达这里</div></li><li><input id="busnametxt2" name="busnametxt" style="padding-top:4px;height:18px;border:solid 1px #999; color:#666;" value="请输入起点" onfocus="this.value=\'\';" type="text"></li><li class="chaxun1">'
                    +'<img style="cursor:pointer;" onclick="parent.PopControlForm._busSEXYSearch(2, fnRequest(\'x\'),fnRequest(\'y\'),$(\'busnametxt2\').value);" src="'+window.Config._ImgPath+'14.jpg" /></li></ul>';
    document.body.innerHTML=_BusTransfer;
    
    //Bengin追加都烩贴子,其它城市没有的只要移除本段代码
    /*
     var url=window.Config._EDataCenterUrl + 'Commmap/LocalTopic.aspx?node='+window.Config._Node+'&l='+window.Config._L+'&v=1.0&RndNum=2&MaxNum=20&Rnd=' +  Math.round(Math.random()*10000);
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