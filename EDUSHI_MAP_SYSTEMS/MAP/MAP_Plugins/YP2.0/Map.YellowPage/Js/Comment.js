function EnableUserName()
{
    //alert($("cbHideName").checked);
    if($("cbHideName").checked==true)
    {
        $("txtUserName").value="E都市网友";
        $("txtUserName").disabled="disabled";
    }
    else
    {
        $("txtUserName").value="";
        $("txtUserName").disabled=false;
    }
}
var CommentNum = 0;
var UserName ;
var Content ;
var CID=0;
function InsertComment(flag)
{
    if(CID==0)
    {
        //这个ID是从Url中获取的
        CID ="12345";// GetPara("ID"); 
    }
    if($("txtContent").value=="")
    {
        alert("评论内容不能为空");
        $("txtContent").focus();
        return;
    }
    if(CID==null)
    {
        alert("未知错误，请按正常流程再次提交！");
        //$("txtUserName").focus();
        return;
    }
    if(CommentNum>2)
    {
        alert("感谢你的评论，但请不要恶意提交，谢谢合作");
        return;
    }
      var cc = new CookieHelper();
        var cookieNickNameCookie = cc.getCookie('MemberNickName');
        if (cookieNickNameCookie != null) {
          UserName = cookieNickNameCookie;
       }
       else 
       {
         alert("只有登录了才能评论哦！");
         $("txtContent").value ="";
         return;
       }
       UserName =escape(UserName);
    Content = $("txtContent").value.replace(/\r\n/g,"<br \>");
    if(Content.length>150)
    {
        alert("评论内容不能超过150个字符！");
        return;
    }
    Content = escape(Content);
    $("txtContent").value ="";
    ShowLoading();
    window.location.hash='HEAR';
    
    //return;
    cmXMLHttpReq(0, 'AjaxHandler.aspx?op='+flag+'&UserName='+UserName+'&Content='+Content+'&CID='+CID+'&rd='+ Math.round(Math.random()*10000), "", callBack_InsertComment);
    
}

//function ReplaceStr(inputString)
//{
//	var strResult=inputString;
//	var RegexStr=new RegExp("\\\\r\\n",g");
//	strResult=strResult.replace(RegexStr,"<br>");
//	return strResult;
//}
function callBack_InsertComment(objXMLHTTP)
{
    /*if(objXMLHTTP.responseText=="1")
    {
        var mytimer = new Date();
        var nowyear = mytimer.getYear();
        var nowmonth = mytimer.getMonth()+1;
        var nowday = mytimer.getDate();
        var nowhour = mytimer.getHours();
        var nowminutes = mytimer.getMinutes();
        if (nowminutes < 10) {
        nowminutes = "0" + nowminutes
        }
        var nowseconds = mytimer.getSeconds();
        if (nowseconds < 10) {
        nowseconds = "0" + nowseconds
        }
        var timeValue=nowyear+"-"+nowmonth+"-"+nowday+"&nbsp;"+nowhour+":"+nowminutes+":"+nowseconds;
        $("ULGuestBook").innerHTML = '<li style="width:560"><font>'+$("txtUserName").value+'</font><br />'+unescape(Content)+'<br /><span style="float:right">'+timeValue+'</span></li>'+$("ULGuestBook").innerHTML;
        CommentNum++;
    }
    else
    {
        alert("评论提交失败，请刷新后重试！");
    }
    HideLoading();*/
    
    if(objXMLHTTP.responseText=="1")
    {

        //alert(window.location.href);
        var re=/CommentPageNum=\d/;
        if(re.test(window.location.href))
        {
            //alert(window.location.href.replace(re,'CommentPageNum=1&rd='+ Math.round(Math.random()*10000)));
            window.location.href=window.location.href.replace(re,'&rd='+ Math.round(Math.random()*10000));
        }
        else
        {
            window.location.href=window.location.href.replace('?','?&rd='+ Math.round(Math.random()*10000)+'&');
        }
    }
    else
    {
        //alert(objXMLHTTP.responseText);
        alert("评论提交失败，请刷新后重试！");
        HideLoading();
    }
       $("KeyApril_Submit").style.display = "none";
       $("BG").style.display = "none";
}
function OnBodyLoad()
{
    if(document.getElementById("KeyApril_Submit")==null)
	{
		var sWaiting = "<div id=\"KeyApril_Submit\" style=\"BORDER-RIGHT: #82AAD2; BORDER-TOP: #82AAD2 ; Z-INDEX: 10002; LEFT:";
		sWaiting += "450px; display:none; BORDER-LEFT: #82AAD2 ; WIDTH: 200px; BORDER-BOTTOM: #82AAD2;";
		sWaiting += "POSITION: absolute;top:300px;HEIGHT: 50px; BACKGROUND-COLOR: #ffffff\">";
		sWaiting += "<table width=\"100%\" height=\"100%\" align=\"center\" style=\"text-decoration: none;border:#82AAD2 solid;border-width:1 1 1 1;\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr>";
		sWaiting += "<td align=\"center\" style=\"border:#ffffff solid;border-width:0 1 1 0;text-decoration: none;padding: 2 5 2 5;background-color:F8F9FD;text-align: center;line-height:20px;font-size:12px;font-weight:bold;color: #666666;\">评论提交中，请稍等.....";
		sWaiting += "<marquee id=\"LoadMarquee\" style=\"border:1px solid #82AAD2\" behavior=\"scroll\" direction=\"right\" width=\"180\" scrollamount=\"3\" scrolldelay=\"10\" bgcolor=\"#ffffff\">";
		sWaiting += "<table cellspacing=\"0\" border=\"0\">";
		sWaiting += "<tr height=8><td bgcolor=#D4DDEC width=8></td>";
		sWaiting += "<td></td><td bgcolor=#C1D1E0 width=8></td>";
		sWaiting += "<td></td><td bgcolor=#9AAFD3 width=8></td>";
		sWaiting += "<td></td><td bgcolor=#6F8DC0 width=8></td>";
		sWaiting += "<td></td><td bgcolor=#6F8DC0 width=8></td>";
		sWaiting += "<td></td><td bgcolor=#6F8DC0 width=8></td>";
		sWaiting += "<td></td><td bgcolor=#6F8DC0 width=8></td>";
		sWaiting += "<td></td><td bgcolor=#9AAFD3 width=8></td>";
		sWaiting += "<td></td><td bgcolor=#C1D1E0 width=8></td>";
		sWaiting += "<td></td><td bgcolor=#D4DDEC width=8></td>";
		sWaiting += "<td></td></tr></table></marquee></td></tr>";
		sWaiting += "</table></div>";
		document.body.innerHTML += sWaiting;
	}
}

function ShowLoading()
{
    OnBodyLoad();
   
    $("BG").style.height = document.body.scrollHeight + 'px';
    $("BG").style.width = document.body.scrollWidth + 'px'
    $('BG').style.display='block';
    $("KeyApril_Submit").style.display = "";
    $("KeyApril_Submit").style.left =  document.body.scrollWidth/2 - 100+'px';
    $("LoadMarquee").start();
}
function HideLoading()
{
    $('BG').style.display = "none"; 
    $("KeyApril_Submit").style.display = "none";
}
