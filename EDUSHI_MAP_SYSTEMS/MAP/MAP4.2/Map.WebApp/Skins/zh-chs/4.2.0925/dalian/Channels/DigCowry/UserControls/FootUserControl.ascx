<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="FootUserControl.ascx.cs" Inherits="Map.WebApp.FootUserControl" %>
<div class="Master_bottom" style="float:left; border-top:1px solid #D3D6DB;"><a href="http://www.aladdincn.com/" target="_blank">关于E都市</a> | 
			<a href="####" target="_blank">产品中心</a> | 
			<a href="http://www.aladdincn.com/cooperation.htm" target="_blank">商务合作</a> | 
			<a href="###" target="_blank">新闻中心</a> | 
			<a href="http://www.edushi.com/guestbook/" target="_blank">访客留言</a> | 
			<a href="http://www.edushi.com/ditu.htm" target="_blank">网站地图</a> | 
			<a href="http://www.edushi.com/mianze.asp" target="_blank">法律声明</a> |<br>
			广告经营许可证号 3301082100176 |  <a href="http://www.miibeian.gov.cn/" target="_blank">浙B2-20050306</a> 版权所有@2004-2008		
  出版号: ISBN:7-900200-28-2 审图号: GS(2006) 1242</div>
<script type="text/javascript" src="http://www.google-analytics.com/urchin.js"></script>
<script type="text/javascript">
    _uacct = '<%=this.CitySetting.GoogleID%>';
    urchinTracker();
</script>

<script language="javascript" type="text/javascript" src="http://count.edushi.com/cf.aspx?user_name=<%=this.CitySetting.CityCode%>"></script>
<script language="javascript" type="text/javascript">
	var cc_oImg = document.getElementsByTagName('a');
	for(var i=0;i<cc_oImg.length;i++)
	{
		if(cc_oImg[i].href.indexOf('count.edushi.com')>0)
		{
			cc_oImg[i].style.display = 'none';
			if(cc_oImg[i+1] && cc_oImg[i+1].href.indexOf('count.edushi.com')>0)
			{
				cc_oImg[i+1].style.display = 'none';
			}
			break;
		}
	}
	cc_oImg = null;
</script>