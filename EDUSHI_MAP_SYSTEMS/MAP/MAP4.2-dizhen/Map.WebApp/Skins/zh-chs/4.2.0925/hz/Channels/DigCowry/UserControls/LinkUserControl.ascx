﻿<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="LinkUserControl.ascx.cs" Inherits="Map.WebApp.LinkUserControl" %>
<asp:DataList ID="Linkdatalist" runat="server" RepeatColumns="8" RepeatDirection="Horizontal">
    <ItemTemplate>
        <div style="float:left; width:89px; height:31px; margin:15px 4px 0 0; display:inline;"><a href='<%#Eval("DC_PADUrl") %>' target="_blank"><img border=0 src='<%# CurrentPicPath+ Eval("DC_PADPic")%>' /></a></div>
    </ItemTemplate>
</asp:DataList>