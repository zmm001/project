<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="MediumControl.ascx.cs" Inherits="Map.WebApp.MediumControl" %>
<asp:DataList ID="Linkdatalist" runat="server" RepeatColumns="8" RepeatDirection="Horizontal">
    <ItemTemplate>
        <div style="float:left; width:89px; height:31px; margin:15px 4px 0 0; display:inline;"><a href='<%#Eval("DC_MUrl") %>' target="_blank" title='<%#Eval("DC_MName")%>'><img border=0 src='<%# CurrentPicPath+ Eval("DC_MPic")%>' /></a></div>
    </ItemTemplate>
</asp:DataList>