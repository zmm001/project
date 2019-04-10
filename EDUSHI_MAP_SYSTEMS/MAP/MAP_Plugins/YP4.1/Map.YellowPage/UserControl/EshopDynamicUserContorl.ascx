<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="EshopDynamicUserContorl.ascx.cs" Inherits="Map.YellowPage.UserControl.EshopDynamicUserContorl" %>

      
<!--E店动态Begin-->      
 <%if (CitySetting.ECC_IsEStore > 0)
       { %>
 <div class="list">
	<div class="title"><a href="<%=DianUrl%>/cuxiao/SalesList.aspx" target="_blank">E店动态...</a></div >
    <ul class="ul_4">
      <asp:Repeater ID ="Repeater1" runat="server">
        <ItemTemplate>
        <%#(Container.ItemIndex == 0) ? @"<li class='li_s2'>
        	<div class='left'>
            	<img src='" + GetCompanyPic(Eval("Img")) + @"'width='56' height='44' />
            </div>
            <div class='right'>
            	<p class='y8'><a href='" + getLink(DianUrl, "?StoreID=" + ObjToStr(Eval("MCI_ID")) + "&newsid=" + ObjToStr(Eval("LT_ID")), "LT_Title", Eval("LST_ID"), Eval("LCE_Level")) + @"' target='_blank'>" + Eval("LT_Title") + @"</a></p>
                <p>" +Eval("MCI_Tel")+@"</p>
                <p class='y8 jiequ_w_110'>" + Eval("MCI_Address") + @"</p>
            </div><div class='clear'></div>
        </li> " : @"
        <li><a target='_blank' href='" + getLink(DianUrl, "?StoreID=" + ObjToStr(Eval("MCI_ID")) + "&newsid=" + ObjToStr(Eval("LT_ID")), "LT_Title", Eval("LST_ID"), Eval("LCE_Level")) + @"' class='ListIco' title='"+Eval("LT_Title")+"'>" + Eval("LT_Title") + @"</a></li>
       "%>
        </ItemTemplate>
    </asp:Repeater>    	
    </ul>
</div>
 <%}
       else
       { %>
       <div class="rAdv">
        <a href="http://www.aladdincn.com/zsjm/index.html" target="_blank" title="城市加盟"><img src="<%=this.HuangyeUrl %>images/csjm.gif" alt="<%=CityCode %>E店" width="240" height="160" /></a>
        </div>
     <%} %>