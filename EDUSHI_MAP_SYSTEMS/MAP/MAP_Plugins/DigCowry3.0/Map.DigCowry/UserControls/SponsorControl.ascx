<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="SponsorControl.ascx.cs" Inherits="Map.DigCowry.UserControls.SponsorControl" %>
<%@ Import namespace="System.Data"%>
 <td width="775" height="36" align="center" id="FootSponsors" runat="server">
 <div class="spons">
    <ul>
        <asp:Repeater ID="rptSpons" runat="server">
            <ItemTemplate>
               <li><a href="<%#((DataRowView)Container.DataItem)["DC_PADUrl"] %>" target="_blank"><img src="<%#CreateTrophyImageUrl(((DataRowView)Container.DataItem)["pic"].ToString())%>" width="88" height="33" /></a></li>
            </ItemTemplate>
        </asp:Repeater>      
    </ul>
 </div>
</td>