<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="BdtControl.ascx.cs" Inherits="Map.YellowPage.UserControl.BdtControl" %>
<!--包打听Begin-->
<%if (this.IsBDT)
     { %>
  <div class="list">
    <div class="title"><a href="<%=BdtUrl%>" target="_blank">包打听...</a></div>
     <ul class="ul_7">
     <asp:Repeater runat="server" ID="rpbdt">
        <ItemTemplate>
          <li>
	        <a target="_blank"  href="<%#BdtUrl%>Class.aspx?type=<%#Eval("LTT_ID") %>">[<%#Eval("LTT_TypeName")%>]</a>
	      <a target="_blank" href="<%#BdtUrl%>ListedQu.aspx?ID=<%#Eval("LT_ID") %>" class="jiequ_w_110" title='<%#Eval("LT_Title") %>'><%#strSub(ObjToStr(Eval("LT_Title")),20,"")%></a>
	   	       </li>
    </ItemTemplate>
   </asp:Repeater>
     </ul>     
     </div>
     <%}
     else
     { %>
     <div class="rAdv">
        <a href="http://hangzhou.edushi.com/dian/" target="_blank" title="地图逛店"><img src="<%=this.HuangyeUrl %>images/edian.gif" alt="<%=CityCode %>E店" width="240" height="160" /></a>
     </div>
     <%} %>   
