<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SubmitSuccess.aspx.cs" Inherits="Map.WebApp.SubmitSuccess" %>

<%@ Register Src="UserControls/LinkUserControl.ascx" TagName="LinkUserControl" TagPrefix="uc1" %>
<%@ Register Src="UserControls/FootUserControl.ascx" TagName="FootUserControl" TagPrefix="uc2" %>
<%@ Register Src="UserControls/ProviderADControl.ascx" TagName="ProviderADControl" TagPrefix="uc4" %>
<%@ Register Src="UserControls/MediumControl.ascx" TagName="MediumControl" TagPrefix="uc5" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>提交成功_E都市</title>
    <link href="css/xunbao.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    <div id="wrap1">
 <div id="xiangxi-head"><div class="text5" style="width:160px; margin:105px 0 0 105px; letter-spacing:0.7px;"><strong>-----[<%=this.CitySetting.ECC_Name%>站]-----</strong></div></div><div id="xiangxi-head1"></div><div id="xiangxi-head2">
 <div style="float:left; width:138px; margin:60px 0 10px 208px; display:inline;"><a href="http://hz.edushi.com"><img src="images/xunbao_r3_a4.jpg" width="138" height="45" border="0" /></a></div>
<div id="xiangbao-menu">
<li><a href="Default.aspx"><img src="images/xunbao_r3_a15.jpg" border="0" /></a></li>
<li><a href="DigHelp.aspx"><img src="images/xunbao_r3_a6.jpg" border="0" /></a></li>
<li><a href="TrophyShow.aspx"><img src="images/xunbao_r3_a7.jpg" border="0" /></a></li>
</div>
 </div>
 <div id="xiangxi-left"><img src="images/#1.jpg" width="1" height="1" /></div>
 <div id="xiangxi-content"><div id="xiangxi-content1"><img src="images/xunbao_r2_a5.jpg" /></div>   <div id="xiangxi-content2"><img src="images/xunbao_r2_a6.jpg" width="5" height="5" /></div>
 <div id="xiangxi-content3">
   <uc4:ProviderADControl id="ProviderADControl1" runat="server">
   </uc4:ProviderADControl>
   <div id="xiangxi-content6" style="height:170px;">
   <div id="xiangxi-container6" style="height:80px;"></div>
   <div id="xiangxi-container3" style=" height:70px;text-align:center; color:#167EDD; margin-left:60px; display:inline;">
        <asp:Literal ID="txtContactInfo" runat="server"></asp:Literal>
   </div>
</div>
   <div id="xiangxi-content5" style=" margin-top:0px;">
     <div style="float:left; width:554px; height:250px; margin-left:120px; display:inline;">
	 <div class="text2" style="text-align:center; height:60px; line-height:30px; margin-top:30px;"><span class="text3">现在,您可以回到E都市三维仿真城市</span><br />
	   <a href="<%=sContinueDig %>"><img src="images/xunbao_r2_a20.jpg" width="106" height="29" border="0" /></a><br />
	 </div>
	 <!--<div class="text2" style="text-align:center;line-height:30px; margin-top:28px;"><span class="text3">也可以参与我们的有奖调查活动赢取丰富奖品</span><br />
	   <a href="QuestionList.aspx"><img src="images/xunbao_r2_a21.jpg" width="132" height="29" border="0" /></a></div>-->
	 </div>
	 <div class="text2" style="float:left; width:700px; height:16px; margin-top:230px; display:inline;">友情赞助</div>
	 <div style="float:left;width:751px; height:100px; border-bottom:1px solid #B4BEC7; border-top:1px solid #B4BEC7;">
         <uc1:LinkUserControl id="LinkUserControl1" runat="server">
         </uc1:LinkUserControl></div>
     <div class="text2" style="float:left; width:700px; height:16px; margin-top:20px; display:inline;">媒体支持</div>
	 <div style="float:left;width:751px; height:auto; border-bottom:1px solid #B4BEC7; border-top:1px solid #B4BEC7;">
	   <uc5:MediumControl id="MediumControl1" runat="server">
         </uc5:MediumControl>
	 </div>
	 <uc2:FootUserControl id="FootUserControl1" runat="server">
         </uc2:FootUserControl>
	 </div>
 </div>
 <div id="xiangxi-content1"><img src="images/xunbao_r2_a14.jpg" width="5" height="5" /></div>
 <div id="xiangxi-content2"><img src="images/xunbao_r2_a15.jpg" /></div>
 </div>
 <div id="xiangxi-right"><img src="images/#1.jpg" width="1" height="1" /></div>
</div>
    </form>
</body>
</html>
