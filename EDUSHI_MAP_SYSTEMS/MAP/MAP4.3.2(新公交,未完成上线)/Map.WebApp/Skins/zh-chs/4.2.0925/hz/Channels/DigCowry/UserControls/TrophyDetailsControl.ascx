<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="TrophyDetailsControl.ascx.cs" Inherits="Map.WebApp.TrophyDetailsControl" %>
<div id="xiangxi-container2"><a href="<%=_sImgUrl%>" target="_blank"><asp:Image ID="imgTrophy" runat="server" Width="115" Height="108" /></a></div>
<div id="xiangxi-container3">
       <span class="text1">�� �� ���ƣ�</span><asp:Label ID="labDC_TName" runat="server"></asp:Label><br />
     <span class="text1">�� �� ��ţ�</span><asp:Label ID="labDC_TID" runat="server"></asp:Label><br />
     <span class="text1">�� �� ��ֵ��</span><asp:Label ID="labDC_TPrice" runat="server"></asp:Label>Ԫ�����
     <br />
     <span class="text1">�����ṩ�̣�</span><asp:Label ID="labDC_PName" runat="server"></asp:Label><br />
     <span class="text1">ʹ �� ˵����<asp:Label ID="labDC_TRemark" runat="server"></asp:Label></span>
</div>