<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="TitleSponsor.ascx.cs" Inherits="Map.Plugins.DigCowry.UserControls.TitleSponsor" %>

<%@ Import namespace="System.Data"%>
<div class="ttbtn"><img src="images/gms.gif" /></div>
<div class="tDiv">
    <ul>
        <asp:Repeater ID="RptTitleSponsor" runat="server">
            <ItemTemplate>
                 <li>
                   <a href="<%#Eval("DC_PADUrl") %>" target="_blank"> <img  alt="<%#Eval("DC_PName")%>" src="<%#this.CreateTrophyImageUrl(Eval("DC_PADPic").ToString())%>"  width="340" height="90" />   
                   </a>
                 </li>
            </ItemTemplate>             
        </asp:Repeater>
    </ul>
</div>

