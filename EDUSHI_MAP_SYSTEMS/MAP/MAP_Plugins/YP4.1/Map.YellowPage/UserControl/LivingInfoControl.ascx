<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="LivingInfoControl.ascx.cs" Inherits="Map.YellowPage.UserControl.LivingInfoControl" %>
<%if (listInfo != null)
  { %>
 <div class="c_left c_right">
	<div class="title">周边生活服务信息</div>
    <ul>
        <%=htmlInfo%>
    </ul>
</div>
<%} %>