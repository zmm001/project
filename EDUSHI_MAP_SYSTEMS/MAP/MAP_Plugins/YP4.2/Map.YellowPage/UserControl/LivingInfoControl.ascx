<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="LivingInfoControl.ascx.cs" Inherits="Map.YellowPage.UserControl.LivingInfoControl" %>

 <div class="c_left c_right">
	<div class="title">周边生活服务信息</div>
    <ul>
     	<li>
    	<h1>【<a href="type-21-2.shtml" target="_blank">超市/便利店</a>】</h1>
        <p>
            <asp:Repeater ID="rptCS" runat="server">
                <ItemTemplate>
                <a href='<%#GetLink(Eval("OwnerID").ToString(),Eval("CompanyID").ToString(),Eval("RecordType").ToString()) %>' title='<%#Eval("OCName") %>' target="_blank"><%#Eval("OCName")%></a>
                </ItemTemplate>
            </asp:Repeater>
             
        </p>
        </li>
        <li>
        	<h1>【<a href="type-143-2.shtml" target="_blank">银行/ATM</a>】</h1>
            <p>
                 <asp:Repeater ID="rptYH" runat="server">
                <ItemTemplate>
               <a href='<%#GetLink(Eval("OwnerID").ToString(),Eval("CompanyID").ToString(),Eval("RecordType").ToString()) %>' title='<%#Eval("OCName") %>' target="_blank"><%#Eval("OCName")%></a>
                </ItemTemplate>
            </asp:Repeater>
            </p>
        </li>
        <li>
        	<h1>【<a href="type-10-1.shtml" target="_blank">医院</a>】</h1>
            <p>
                 <asp:Repeater ID="rptYY" runat="server">
                    <ItemTemplate>
                   <a href='<%#GetLink(Eval("OwnerID").ToString(),Eval("CompanyID").ToString(),Eval("RecordType").ToString()) %>' title='<%#Eval("OCName") %>' target="_blank"><%#Eval("OCName")%></a>
                    </ItemTemplate>
                </asp:Repeater>
            </p>
        </li>
         <li>
        	<h1>【<a href="type-13-1.shtml" target="_blank">学校</a>】</h1>
            <p>
             <asp:Repeater ID="rptXX" runat="server">
                <ItemTemplate>
                <a href='<%#GetLink(Eval("OwnerID").ToString(),Eval("CompanyID").ToString(),Eval("RecordType").ToString()) %>' title='<%#Eval("OCName") %>' target="_blank"><%#Eval("OCName")%></a>
                </ItemTemplate>
            </asp:Repeater>
            </p>
        </li>
    </ul>
</div>
