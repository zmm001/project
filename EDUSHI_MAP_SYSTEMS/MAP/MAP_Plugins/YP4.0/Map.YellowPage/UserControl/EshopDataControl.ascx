﻿<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="EshopDataControl.ascx.cs" Inherits="Map.YellowPage.UserControl.EshopDataControl" %>
 <!--E店Begin-->
	<div class="title"><a href="<%=zkUrl %>" target="_blank">查看这里更多E店</a></div>
    <ul id="eshopULid">
     <asp:Repeater ID="rptEshopData" runat="server">
        <ItemTemplate>
            <li>
       	      <div class="li_pic" style=" position:relative"><a href="<%#GetDianUrl(Eval("CustomDomain").ToString(),Eval("Eaddress").ToString(),Eval("inter").ToString(),Eval("MCI_ID").ToString()) %>" title="<%#Eval("cname") %>" target="_blank"><img src="<%#GetLogImgUrl(Eval("LCE_logo"),Eval("MCI_ID")) %>" alt="<%#Eval("cname") %>" /></a></div>
              <div class="li_text">
           	      <h1>[<%#Eval("tname")%>]<span><a href="<%#GetDianUrl(Eval("CustomDomain").ToString(),Eval("Eaddress").ToString(),Eval("inter").ToString(),Eval("MCI_ID").ToString()) %>" title="<%#Eval("cname") %>" target="_blank"><%#Eval("cname")%></a></span><%#CheckIcoShow(Eval("LCE_ShopCard").ToString(),Eval("LT_ID").ToString(),Eval("LV_ID").ToString())%></h1>
                  <h2><%#Eval("LT_Title") %></h2>                  
                  <h3><span>标签：</span><%#GetTags(Eval("LCE_Tags").ToString())%></h3>
                  <p>电话：<%#Eval("tel")%></p>
                  <p>地址：<%#Eval("address")%><a href="<%=MapUrl%>?cid=<%#Eval("MCI_ID") %>" target="_blank"class="icon1"></a></p>
             </div>
            </li>
        </ItemTemplate>
     </asp:Repeater>                  
    </ul>
    <script>
        jQuery(function() {
            var eshopImgCount = jQuery("#eshopULid .li_pic img").length;
           // alert(eshopImgCount);
            jQuery("#eshopULid .li_pic img").each(function() {
                var eimgW = jQuery(this).width();
                var eimgH = jQuery(this).height();
                if (192 / eimgW < 100 / eimgH) {
                    jQuery(this).width(190);
                    var _eimgH = 192 / eimgW * eimgH;
                    jQuery(this).height(_eimgH);
                    var top = (100 - _eimgH) / 2;
                    jQuery(this).css("top", top);

                } else {
                    var _eimgW = 100 / eimgH * eimgW;
                    jQuery(this).height(98);
                    jQuery(this).width(_eimgW);

                    var left = (192 - _eimgW) / 2;
                    jQuery(this).css("left", left);
                }

            })
        });
    </script>