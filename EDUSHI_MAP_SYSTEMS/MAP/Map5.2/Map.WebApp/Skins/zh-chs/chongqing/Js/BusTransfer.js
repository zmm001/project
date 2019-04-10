var nArea = 500;
window.onload=fnOnload;

function fnOnload()
{
    if (!window.Config)
    {
        setTimeout('fnOnload()', 200);
        return;
    }
    document.body.innerHTML=window.Config.Loading;
    var sBusTransfer = '<div id="BusTransferNav"><strong>'+unescape(fnRequest('oname'))+'</strong>公交换乘：<div id="SetOut"><span>从这里到</span><input id="busnametxt" name="busnametxt" class="InFieldSty" value="请输入终点"  style="color:#999999;" onkeyup="if(this.value != \'输入你要查找的关键字\'){this.style.color=\'#000000\';}"  onfocus="this.value=\'\';" type="text" size="20" />'
                    +'<img onclick="parent.fnBusTransferSearch(1, fnRequest(\'x\'),fnRequest(\'y\'),$(\'busnametxt\').value);" src="'+window.Config.SkinPath+'Images/SearchBtn.gif" /><div class="HackBox"></div></div>';
                    
    sBusTransfer += '<div id="TurnUp"><span>从</span><input style="color:#999999;" onkeyup="if(this.value != \'输入你要查找的关键字\'){this.style.color=\'#000000\';}" id="busnametxt2" name="busnametxt" class="InFieldSty" value="请输入起点" onfocus="this.value=\'\';" type="text" size="20" /><span>到这里</span>'
                    +'<img onclick="parent.fnBusTransferSearch(2, fnRequest(\'x\'),fnRequest(\'y\'),$(\'busnametxt2\').value);" src="'+window.Config.SkinPath+'Images/SearchBtn.gif" /><div class="HackBox"></div></div>';
    document.body.innerHTML=sBusTransfer;
    
    //Bengin追加都烩贴子,其它城市没有的只要移除本段代码
//     var url=window.Config.EDataCenterUrl + 'Commmap/LocalTopic.aspx?domain='+window.Config.Domain+'&l='+window.Config.Language+'&RndNum=2&MaxNum=20&Rnd=' +  Math.round(Math.random()*10000);
//     ENetwork.DownloadScript(url,
//        function(){
//            var sTopics = '';
//            for (var i=0; i<__RandomTopics.RandomTopics.length; i++)
//            {
//                if (sTopics != '') sTopics += '<br />';
//                sTopics += '<a href="' + window.Config._LocalUrl + 'CityTopic/Type_' + __RandomTopics.RandomTopics[i].LTT_ID + '.shtml" target="_blank"><strong>[' + __RandomTopics.RandomTopics[i].LTT_TypeName + ']</strong></a><a href="' + window.Config._LocalUrl + 'CityTopic/' + __RandomTopics.RandomTopics[i].LT_ID + '.shtml" target="_blank" title="' + __RandomTopics.RandomTopics[i].LT_Title + '">' + __RandomTopics.RandomTopics[i].LT_Title + '</a>';
//            }
//            document.body.innerHTML += '<div style="margin:5px; width:260px; white-space:nowrap; overflow:hidden; clear:both; ">' + sTopics + '</div>';
//        }
//     );
     //End
}