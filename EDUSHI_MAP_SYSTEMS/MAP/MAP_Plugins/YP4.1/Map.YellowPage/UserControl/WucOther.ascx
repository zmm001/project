<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="WucOther.ascx.cs" Inherits="Map.YellowPage.UserControl.WUCOther" %>
  <div id="rightbd">
   <!--包打听 -->
   <%if (this.IsBDT)
     { %>
   <div class="rbox">
   
     <h4><span>包打听...</span><a href="<%=BdtUrl%>">更多&gt;&gt;</a></h4>
     <ul class="rlist">
     <asp:Repeater runat="server" ID="rpbdt">
        <ItemTemplate>
          <li>
	        <a target="_blank" class="tyellow" href="<%#BdtUrl%>Class.aspx?type=<%#Eval("LTT_ID") %>">[<%#Eval("LTT_TypeName")%>]</a>
	       <a target="_blank" href="<%#BdtUrl%>ListedQu.aspx?ID=<%#Eval("LT_ID") %>" class="jiequ_w_140"><%#strSub(ObjToStr(Eval("LT_Title")),20,"")%></a>
	   	       </li>
    </ItemTemplate>
   </asp:Repeater>
     </ul>
     <p class="btn"><a href="http://<%=CityCode %>.edushi.com/dian/cuxiao/CuXiaoPost.aspx" class="ty">我也来发布</a></p>
     </div>
     <%}
     else
     { %>
     <div class="rAdv">
        <a href="http://hangzhou.edushi.com/dian/" target="_blank" title="地图逛店"><img src="<%=this.HuangyeUrl %>new_images/edian.gif" alt="<%=CityCode %>E店" width="240" height="160" /></a>
     </div>
     <%} %>

   
    <%if (CitySetting.ECC_IsEStore > 0)
       { %>
   <div class="rbox">
     <!--E店动态 -->
    
     <h4><span>E店动态...</span><a href="<%=DianUrl%>/cuxiao/SalesList.aspx">更多&gt;&gt;</a></h4>
     <ul class="Eddt">
     <asp:Repeater ID ="rpedcx" runat="server">
    <ItemTemplate>
     <%#(Container.ItemIndex == 0) ? @"     <li class='toplist'>
        <div><img src='"+GetCompanyPic(Eval("Img")) + @"'width='80' height='53' /></div> 
        <div>
            <p><a href='" + getLink(DianUrl, "?StoreID=" + ObjToStr(Eval("MCI_ID")) + "&newsid=" + ObjToStr(Eval("LT_ID")), "LT_Title", Eval("LST_ID"), Eval("LCE_Level")) + @"' target='_blank'>"+Eval("LT_Title") + @"</a></p>   
            <p>"+Eval("MCI_Tel")+@"</p>
            <p>" + Eval("MCI_Address") + @"</p>                 
        </div>
        </li>" : @"
        <li>
	    <a target='_blank' href='" + getLink(DianUrl, "?StoreID=" + ObjToStr(Eval("MCI_ID")) + "&newsid=" + ObjToStr(Eval("LT_ID")), "LT_Title", Eval("LST_ID"), Eval("LCE_Level")) + @"' class='ListIco'>" + Eval("LT_Title") + @"</a>
	    <span><a href='" + (Eval("TradeInfo").ToString().Split('|').Length == 2 ? DianUrl+"CuXiao/Search.aspx?req=4&tradetypeid=" + Eval("TradeInfo").ToString().Split('|')[0] + "&keyword=" + HttpUtility.UrlEncodeUnicode(Eval("TradeInfo").ToString().Split('|')[1]) : "") + @"'>" + (Eval("TradeInfo").ToString().Split('|').Length == 2 ? Eval("TradeInfo").ToString().Split('|')[1] : "") + @"</a></span>
	  </li>"%>
    </ItemTemplate>
   </asp:Repeater>      
     </ul>
     <p class="btn"><a href="http://<%=CityCode %>.edushi.com/dian/cuxiao/SalesList.aspx" class="ty">我也来发布</a></p>
     </div>
     <%}
       else
       { %>
       <div class="rAdv">
        <a href="http://www.aladdincn.com/zsjm/index.html" target="_blank" title="城市加盟"><img src="<%=this.HuangyeUrl %>new_images/csjm.gif" alt="<%=CityCode %>E店" width="240" height="160" /></a>
        </div>
     <%} %>
    <%if (CitySetting.ECC_IsEStore > 0)
      { %>
   <!--优惠券 -->
   <div class="rbox">
   
     <h4><span>优惠券...</span><a href="<%=DianUrl%>cuxiao/Voucher.aspx">更多&gt;&gt;</a></h4>
     <ul class="rlist">
        <asp:Repeater ID="rpyhq" runat="server">
        <ItemTemplate>
         <%#Container.ItemIndex == 0? @"     
           <li class='toplist'>
	       <div><img src='" + GetCompanyPic(Eval("Img")) + @"'  width='80' height='53'/></div>
	       <div>
              <p><a href='" + getLink(DianUrl, "?id=" + ObjToStr(Eval("LV_ID")) + "&StoreID=" + ObjToStr(Eval("MCI_ID")), "LV_ShowTitle", Eval("LST_ID"), Eval("LCE_Level")) + @"' target='_blank'>" + Eval("LV_ShowTitle") + @"</a></p>
              <p>" + Eval("MCI_Tel") + @"</p>
              <p>" + Eval("MCI_Address") + @"</p>	   
	       </div>
	      </li> ":@"
           <li>
	        <a class='jiequ_w_180' target='_blank' href='" + getLink(DianUrl, "?id=" + ObjToStr(Eval("LV_ID")) + "&StoreID=" + ObjToStr(Eval("MCI_ID")), "LV_ShowTitle", Eval("LST_ID"), Eval("LCE_Level")) + @"'>" + Eval("LV_Title") + @"</a>
	      </li>
        " %>
     </ItemTemplate>
   </asp:Repeater>
     </ul>
      </div>
     <%}
      else
      { %>
        <div class="rAdv">
           <a href="http://www.aladdincn.com/dhdt1.html" target="_blank" title="三维导航仪"><img src="<%=this.HuangyeUrl %>new_images/swdh.gif" alt="<%=CityCode %>E店" width="240" height="120" /></a>
       </div>
     <%} %>
  
  </div>
