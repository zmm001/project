<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="WebHeaderUserControl.ascx.cs" Inherits="Map.YellowPage.UserControl.WebHeaderUserControl" %>
<table width="930px" border="0" cellpadding="0" cellspacing="0" style="margin-left:30px;">
<tr>
<td style="width:214px;"><img src="Images/HyLogo.gif" alt="E都市www.edushi.com| 城市黄页" usemap="#Map" border="0" />
<map name="Map" id="Map">
                    <area shape="rect" coords="1,1,109,62" href="http://<%=Node%>" target="_blank" alt="E都市" />
                    <area shape="rect" coords="123,24,221,59" href="#" alt="城市黄页" />
                </map></td>
<td width="248px" style="vertical-align:middle;"><div style="margin:3px 0;"><span class="zhitong"><%=CityName%></span><span class="biangeng" style="cursor: pointer;vertical-align:middle;" onclick="LoadCityList()">[变更城市]</span></div>
<div style="margin:3px 0;"><span style="float:left;"><input id="txtKeyword" type="text" onkeydown="javascript:if(event.keyCode==13) GoSearch();" style="width:120px;" /></span><span style="float:left; padding-left:2px;"><img src="Images/fenzhanicon1.gif" onclick="GoSearch();" style="cursor:pointer" /></span></div></td>
<td align="right" style="width:468px; height:60px;">
<%--<%if (!System.Configuration.ConfigurationManager.AppSettings["NotShowADCityCode"].Contains("|" + this.CityCode + "|"))
                      { %>
<script type="text/javascript"><!--
google_ad_client = "pub-6571762537302535";
/* 新黄页头部广告，468x60 */
google_ad_slot = "6992426979";
google_ad_width = 468;
google_ad_height = 60;
//-->
</script>
<script type="text/javascript"
src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
</script>
<%} %>--%>
</td>
</tr>
</table>