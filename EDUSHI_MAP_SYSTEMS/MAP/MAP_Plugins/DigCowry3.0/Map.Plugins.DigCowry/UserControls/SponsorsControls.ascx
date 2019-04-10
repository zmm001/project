<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="SponsorsControls.ascx.cs" Inherits="Map.Plugins.DigCowry.UserControls.SponsorsSurvey"%>
<%@ Import namespace="System.Data"%>
<div class="ttbtn"><img src="images/hd_37.gif" /></div>
<div class="zDiv">
    <ul>
        <asp:Repeater ID="rptzzs" runat="server">
            <ItemTemplate>
                 <li>
                    <img src="<%#this.CreateTrophyImageUrl(((DataRowView)Container.DataItem)["pic"].ToString())%>"  width="88" height="33" />   
                 </li>
            </ItemTemplate>             
        </asp:Repeater>
    </ul>
</div>