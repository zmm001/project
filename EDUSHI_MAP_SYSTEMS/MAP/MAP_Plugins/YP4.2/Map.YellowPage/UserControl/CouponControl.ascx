<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="CouponControl.ascx.cs" Inherits="Map.YellowPage.UserControl.CouponControl" %>
<!--优惠券Begin-->
<%if (CitySetting.ECC_IsEStore > 0)
      { %>
<div class="list">
    <div class="title"><a href="<%=DianUrl%>cuxiao/Voucher.aspx" target="_blank">优惠...</a></div >
      <ul class="ul_3">
        <asp:Repeater ID="rpyhq" runat="server">
        <ItemTemplate>
        <li><a class="jiequ_w_130" target="_blank" href='<%#getLink(DianUrl, "?id=" + ObjToStr(Eval("LV_ID")) + "&StoreID=" + ObjToStr(Eval("CompanyID")), "LV_ShowTitle", Eval("LST_ID"), Eval("Vip"))%>' title='<%#Eval("LV_Title") %>'><%#Eval("LV_Title")  %> </a></li>       
     </ItemTemplate>
   </asp:Repeater>
     </ul>
      </div>
     <%}
      else
      { %>
        <div class="rAdv">
           <a href="http://www.aladdincn.com/dhdt1.html" target="_blank" title="三维导航仪"><img src="<%=this.HuangyeUrl %>images/swdh.gif" alt="<%=CityCode %>E店" width="240" height="120" /></a>
       </div>
     <%} %>
