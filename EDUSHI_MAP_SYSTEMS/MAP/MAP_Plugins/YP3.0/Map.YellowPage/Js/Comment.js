function EnableUserName()
{
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
function InsertComment(flag, ocid, OCName) {
    if (CID == 0) {
        CID = ocid;
    }
    if ($("txtContent").value == "") {
        erroe_message("评论内容不能为空");
        $("txtContent").focus();
        return;
    }
    if (CID == null) {
        erroe_message("未知错误，请按正常流程再次提交！");
        return;
    }
    if (CommentNum > 2) {
        erroe_message("感谢你的评论，但请不要恶意提交，谢谢合作");
        return;
    }
    var cc = new CookieHelper();
    var cookieNickNameCookie = cc.getCookie('MemberNickName');
    if (cookieNickNameCookie != null) {
        UserName = cookieNickNameCookie;
    }
    else {
        erroe_message("只有登录了才能评论哦！");
        $("txtContent").value = "";
        return;
    }
    UserName = escape(UserName);
    Content = $("txtContent").value.replace(/\r\n/g, "<br \>");
    if (Content.length > 150) {
        erroe_message("评论内容不能超过150个字符！");
        return;
    }
    erroe_message('');
    Content = escape(Content);
    $("txtContent").value = "";
    ShowLoading();
    window.location.hash = 'HEAR';
    cmXMLHttpReq(0, 'AjaxHandler.aspx?op=' + flag + '&UserName=' + UserName + '&Content=' + Content + '&CID=' + CID + '&OCName=' + escape(OCName) + '&rd=' + Math.round(Math.random() * 10000), "", callBack_InsertComment);

}
function erroe_message(message) {

    if (message != '') {

        $('div_error').innerHTML ='* '+ message;
        $('div_error').style.display = 'block';

    }
    else {
        $('div_error').style.display = 'none';
    }
 
}
function callBack_InsertComment(objXMLHTTP)
{   
    var strHtml ='';
    
    if(objXMLHTTP.responseText=="1")
    {    
    strHtml ='<span style="float:right; padding-right:5px;cursor:pointer; width:90%; text-align:right" onclick="CloseBG();">X</span>';
	strHtml +=	'<span style ="float:left; margin-left:22px;font-size:12px;font-weight:bold;color: #666666;  ">评论成功，正在审核中…</span> ';
	 strHtml +=  ' <span style ="float:left; margin-left:80px;font-size:12px;font-weight:bold;color: #f48722;  "><span style=" line-height:160%; cursor:pointer;" onclick="CloseBG();" > 确定</span></span> ';   
     }
    else
    {
     strHtml ='<span style="float:right; padding-right:5px;cursor:pointer; width:90%; text-align:right" onclick="CloseBG();">X</span>';
	 strHtml +=	'<span style ="float:left; margin-left:22px;font-size:12px;font-weight:bold;color: #666666;  ">评论提交失败，请刷新后重试！</span> ';
	 strHtml +=  ' <span style ="float:left; margin-left:80px;font-size:12px;font-weight:bold;color: #f48722;  "><span style=" line-height:160%; cursor:pointer;" onclick="CloseBG();" > 确定</span></span> '; 
    }
     $("KeyApril_Submit").innerHTML = strHtml;

}

function CloseBG()
{
     var strHtml ='<table width="100%" height="50px" align="center" style="text-decoration: none;" cellpadding="0" cellspacing="0" border="0">';
     strHtml +='<tr>';
	 strHtml +='	<td align="center" style="border:#ffffff solid;border-width:0 1 1 0;text-decoration: none;padding: 2 5 2 5;background-color:#F8F9FD;text-align: center;line-height:20px;font-size:12px;font-weight:bold;color: #666666;">';
	 strHtml +=' 评论提交中，请稍等.....';   
	 strHtml +='	<marquee id="LoadMarquee" style="border:1px solid #82AAD2" behavior="scroll" direction="right" width="180" scrollamount="3" scrolldelay="10" bgcolor="#ffffff">        <table cellspacing="0" border="0" height=8>  ';
	 strHtml +='	<tr >  ';
	 strHtml +='	<td bgcolor=#D4DDEC width=8></td>  ';
     strHtml +='	<td></td>  ';
	 strHtml +='	<td bgcolor=#C1D1E0 width=8></td>  ';
	 strHtml +='	<td></td>  ';
	 strHtml +='	<td bgcolor=#9AAFD3 width=8></td><td></td><td bgcolor=#6F8DC0 width=8></td>  ';
	 strHtml +='	<td></td>  ';
	 strHtml +='	<td bgcolor=#6F8DC0 width=8></td>  ';
	 strHtml +='	<td></td>  ';
	 strHtml +='	<td bgcolor=#6F8DC0 width=8></td>  ';
	 strHtml +='	<td></td>  ';
	 strHtml +='	<td bgcolor=#6F8DC0 width=8></td>  ';
	 strHtml +='	<td></td>  ';
	 strHtml +='	<td bgcolor=#9AAFD3 width=8></td>  ';
	 strHtml +='	<td></td>  ';
	 strHtml +='	<td bgcolor=#C1D1E0 width=8></td>  ';
	 strHtml +='	<td></td>  ';
	 strHtml +='	<td bgcolor=#D4DDEC width=8></td>  ';
	 strHtml +='	<td></td>  ';
	 strHtml +='	</tr></table></marquee>  ';
	 strHtml +='	</td>  ';
	 strHtml +='	</tr>  ';
	 strHtml +='</table>  ';
                
  $("KeyApril_Submit").innerHTML = strHtml;
  $("KeyApril_Submit").style.display = "none";
  $("BG").style.display = "none";
}
function ShowLoading()
{  
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
