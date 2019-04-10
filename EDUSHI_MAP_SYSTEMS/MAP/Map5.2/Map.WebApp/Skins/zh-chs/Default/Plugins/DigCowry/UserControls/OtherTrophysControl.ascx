<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="OtherTrophysControl.ascx.cs" Inherits="Map.WebApp.OtherTrophysControl" %>
<ul>     
    <asp:Repeater ID="dlTrophysList" runat="server">
        <ItemTemplate>
            <li style="padding-bottom:10px;"><a href='TrophyDetails.aspx?TrophyID=<%# DataBinder.Eval(Container.DataItem, "DC_TID")%>'><img src="<%=this.OtherTrophysPicUrl%><%# DataBinder.Eval(Container.DataItem, "DC_TMiniPic")%>" width="115" height="108" style="margin-bottom:5px" /></a><br />
	  <%# DataBinder.Eval(Container.DataItem, "DC_TName")%></li>
         </ItemTemplate>
    </asp:Repeater>
</ul>