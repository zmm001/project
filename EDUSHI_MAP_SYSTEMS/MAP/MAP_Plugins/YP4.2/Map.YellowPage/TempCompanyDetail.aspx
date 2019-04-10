<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TempCompanyDetail.aspx.cs" Inherits="Map.YellowPage.TempCompanyDetail" %>
<%@ Register Assembly="AspNetPager" Namespace="Wuqi.Webdiyer" TagPrefix="webdiyer" %>
<%@ Register src="UserControl/EshopDynamicUserContorl.ascx" tagname="EshopDynamic" tagprefix="ed" %>
<%@ Register src="UserControl/BdtControl.ascx" tagname="BdtControl" tagprefix="bdt" %>
<%@ Register Src="UserControl/EshopDataControl.ascx" TagName="EshopControl" TagPrefix="eshop"  %>
<%@ Register Src="UserControl/LivingInfoControl.ascx" TagName="LivingInfo" TagPrefix="lv"  %>
<%@ Register src="UserControl/CouponControl.ascx" tagname="Coupon" tagprefix="cp" %>
<%@ Register src="UserControl/YpFooterControl.ascx" tagname="FooterControl" tagprefix="footer" %>
<%@ Register src="UserControl/YpHeadControl.ascx" tagname="WucYpHead" tagprefix="wucHead" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
 <title><%=CompanyName%>|<%=CityName%>|<%=CompanyType%>|黄页|E都市</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta name="Keywords" content="<%=CompanyType%> <%=CityName%> 地图 电子地图 E都市" />
    <meta name="Description" content="<%=CityName%>最全的生活信息（结婚、装修、旅游、驾校、餐厅美食、娱乐休闲、促销、活动、优惠券等），详尽公司简介，精准定位三维地图，企业交通、公交换乘，地图定位，最全面的企业信息，尽在E都市三维地图。" />
    <link href="css/style.css" rel="stylesheet" type="text/css" />
    <script src ="Js/GeneralLib.js" type="text/javascript" language="javascript"></script>
    <script src="JS/Hotel.js" language="javascript" type="text/javascript"></script>
    <script src="JS/zhaopin.js" language="javascript" type="text/javascript"></script>
    <script src="JS/Tabs.js" language="javascript" type="text/javascript"></script>

</head>
<body>
    <form id="form1" runat="server">
<div class="wrap">
	<div class="header">
    	<!--头部Begin-->
    	<wucHead:WucYpHead ID="eHead" runat="server"/>    	
    	<!--头部End-->
    	<!--当前位置Begin-->
    	<div class="dqwz">
    	    <p><span style="float:left"><asp:Label ID="lbdh" runat="server"></asp:Label></span><span style="float:right">登记时间：<asp:Label ID="lbtime" runat="server"></asp:Label> &nbsp; 浏览量： <span id ="BrowseCount"></span></span></p>
    	 </div>
    	 <!--当前位置End-->
    	 <script>
    	     function ResetImage(ImgD) {
    	         var image = new Image();
    	         image.src = ImgD.src;
    	         if (image.width > 0 && image.height > 0) {
    	             var _eimgW = image.width;
    	             var _eimgH = image.height;
    	             if (360 / _eimgW < 270 / _eimgH) {
    	                 ImgD.width = 358;
    	                 var _timgH = 360 / _eimgW * _eimgH;
    	                 ImgD.height = _timgH;
    	                 var topValue = (270 - _timgH) / 2;
    	                 ImgD.style.top = topValue + 'px';
    	             } else {
    	                 var _eimgW = 270 / _eimgH * _eimgW;
    	                 ImgD.height = 268;
    	                 ImgD.width = _eimgW;

    	                 var leftValue = (360 - _eimgW) / 2;
    	                 ImgD.style.left = leftValue + 'px';
    	             }
    	         }
    	     }
    	 </script>
        <div class="infomation">
        	<div class="i_left">
            	<div class="title"><asp:Label ID="lblCompanyName" runat="server"></asp:Label></div>
            	<div id="f_div" class="text">
		            <!--图片区域-->
		            <div id="banner" class="banner">         
			         <%=strFlashImages%>
		            </div>	
		            <!--数字按钮区域-->
		            <ul id="numbera" class="numbera">
			           <%=liHTML%>
		            </ul>
	            </div>
                <script>
                    var _ImgCount = document.getElementById('banner').getElementsByTagName('img').length;
                    if (_ImgCount > 1) {
                        if (_ImgCount > 4) {
                            document.getElementById('numbera').style.left = 290 - (38 * (_ImgCount - 4));
                        }
                        var ads = new Tabs($id('f_div'), { hdtag: 'UL', hdcn: 'numbera', hdtagcur: 'on', bdcn: 'banner', bdtagcur: 'now', auto: 3000 });
                    }
                    if (_ImgCount == 1) {
                        document.getElementById('banner').getElementsByTagName('a').item().style.display = 'block';
                    }                   
	            </script>
            </div>
          <div class="i_right">
       	    <div class="i_right1">
                	<div class="left">
                    	<div class="title1">基本信息<a href="#" style="display:none">我要纠错</a></div>
                      	<div class="text infomation_B">
                          <ul>
                            <li><strong>名称：</strong><%=CompanyName %></li>
                            <li><strong>电话：</strong><%=tel %></li>
                            <li class="li_1"> <span class="span1"><strong>地址：</strong><%=address %></span><a href="<%=MapUrl%>?cid=<%=CurrentID %>" target="_blank"class="icon1"></a> <%--<span class="icon7"></span>--%>
                              <div class="clear"></div>
                            </li>
                            <li class="li_2"> <strong>简介：</strong> <%=des %></li>
                          </ul>
                          
                      </div>
                    </div>
                    <div class="left left2 left3">
                      <div class="title1">周边公交信息<span></span></div>
                      <div class="text">
                        	<ul class="ul_5">
                        	 <asp:Repeater ID="rptBus" runat="server">
                                    <ItemTemplate>
                                        <li>                    
                	                    <h1>【<a href='<%#GetBusStationUrl(Eval("StationID"),Eval("StationName"),Eval("PositionX"),Eval("PositionY")) %>' target="_blank"><%#Eval("StationName")%></a>】</h1>
                                        <p style="font-size:12px;"><%#GetBusLineName(Eval("Bus"))%></p>
                                    </li>
                                    </ItemTemplate>
                                </asp:Repeater>                              	
                            </ul>
                      </div>
                    </div>
                </div>
          </div>
        </div>
    </div>
    <div class="content">
    	<div class="c_t"></div>
        <div class="c_c">
        	<div class="leftbar">
            <!--E店 Begin-->          
            <eshop:EshopControl ID="EshopControl" runat="server" />
            <!--E店 End-->                                 
            </div>
   	    	<div class="rightbar">
           	  <div class="list" style="display:none">
               	<div class="title">帅男靓女</div>
                  <ul class="ul_1">
                   	  <li>
                       	  <dl>
                           	  <dt><A href="#"><img src="images/aver.jpg" width="83" height="83" /></A></dt>
                              <dd><a href="#">suddenlyilse</a></dd>
                          </dl>
                      </li>
                      <li>
                       	  <dl>
                           	  <dt><A href="#"><img src="images/aver.jpg" width="83" height="83" /></A></dt>
                              <dd><a href="#">suddenlyilse</a></dd>
                          </dl>
                      </li>
                      <li class="current">
                       	  <dl>
                           	  <dt><A href="#"><img src="images/aver.jpg" width="83" height="83" /></A></dt>
                              <dd><a href="#">suddenlyilse</a></dd>
                          </dl>
                      </li>
                      <div class="clear"></div>
                  </ul>
                </div>
                <div class="list" id="gz">
                	<%--<div class="title">招聘...</div>
                    <ul class="ul_2">
                    	<li class="li_title">数字英才网</li>
                    	<li>
                        	<span class="span2 y2"><a href="#" target="_blank">电话销售人员</a></span>
                        	<span class="span3 y3"><a href="#" target="_blank">杭州纳日网络科技有限公司</a> </span>
                        	<span class="span4"> 06.27</span>
                        </li>
                        <li>
                        	<span class="span2"><a href="#" target="_blank">电话销售人员</a></span>
                        	<span class="span3"><a href="#" target="_blank">杭州纳日网络科技有限公司</a> </span>
                        	<span class="span4"> 06.27</span>
                        </li>
                        <li>
                        	<span class="span2"><a href="#" target="_blank">电话销售人员</a></span>
                        	<span class="span3"><a href="#" target="_blank">杭州纳日网络科技有限公司</a> </span>
                        	<span class="span4"> 06.27</span>
                        </li>
                        <li>
                        	<span class="span2"><a href="#" target="_blank">电话销售人员</a></span>
                        	<span class="span3"><a href="#" target="_blank">杭州纳日网络科技有限公司</a> </span>
                        	<span class="span4"> 06.27</span>
                        </li>
                    </ul>
                      <ul class="ul_2">
                    	<li class="li_title">英才网</li>
                    	<li>
                        	<span class="span2 y2"><a href="#" target="_blank">电话销售人员</a></span>
                        	<span class="span3 y3"><a href="#" target="_blank">杭州纳日网络科技有限公司</a> </span>
                        	<span class="span4"> 06.27</span>
                        </li>
                        <li>
                        	<span class="span2"><a href="#" target="_blank">电话销售人员</a></span>
                        	<span class="span3"><a href="#" target="_blank">杭州纳日网络科技有限公司</a> </span>
                        	<span class="span4"> 06.27</span>
                        </li>
                        <li>
                        	<span class="span2"><a href="#" target="_blank">电话销售人员</a></span>
                        	<span class="span3"><a href="#" target="_blank">杭州纳日网络科技有限公司</a> </span>
                        	<span class="span4"> 06.27</span>
                        </li>
                        <li>
                        	<span class="span2"><a href="#" target="_blank">电话销售人员</a></span>
                        	<span class="span3"><a href="#" target="_blank">杭州纳日网络科技有限公司</a> </span>
                        	<span class="span4"> 06.27</span>
                        </li>
                    </ul>--%>
                </div>
              <div class="list" id="jd">
               	<%--<div class="title">预定...</div>
                  <ul class="ul_2">
                   	  <li class="li_title"><a href="#" target="_blank">杭州观湖假日酒店</a></li>
                   	  <li>
                       	  <span class="span5 y5"><a href="#" target="_blank">高级客房 </a></span>
                       	  <span class="span6 y6"><a href="#" target="_blank">携程旅行网 </a> </span>
                          <span class="span7 y5">256元 </span>
                       	  <span class="span8"><a href="#" target="_blank">预定</a> </span>
                      </li>
                      <li>
                       	  <span class="span5"><a href="#" target="_blank">高级客房 </a></span>
                       	  <span class="span6"><a href="#" target="_blank">携程旅行网 </a> </span>
                          <span class="span7">256元 </span>
                       	  <span class="span8"><a href="#" target="_blank">预定</a> </span>
                      </li>
                      <li>
                       	  <span class="span5"><a href="#" target="_blank">高级客房 </a></span>
                       	  <span class="span6"><a href="#" target="_blank">携程旅行网 </a> </span>
                          <span class="span7">256元 </span>
                       	  <span class="span8"><a href="#" target="_blank">预定</a> </span>
                      </li>
                  </ul>--%>
                </div>
                  <!--优惠券Begin-->
                  <cp:Coupon ID="cpon" runat="server" />
                  <!--优惠券End-->
                  
                  <!--E店动态Begin-->
                 <ed:EshopDynamic ID="eshopDyamic" runat="server" />
                 <!--E店动态End-->
                 
                 <!--包打听Begin-->
                 <bdt:BdtControl ID="bdt" runat="server" />
                 <!--包打听End-->
        	</div>
            <div class="clear"></div>
        </div>
</div>
</div>
<div class="wrap2">
	<div class="content2">
       <!--周边生活信息Begin-->
        <lv:LivingInfo ID="lvInfo" runat="server" />
        <!--周边生活信息End-->
    </div>
    <div class="clear"></div>
</div>
<div class="wrap3">
	<div class="content3">
    	<div class="left"><%=CityName %>企业：<a href="http://www.edushi.com/index/<%=CityCode %>/city_<%=TopCharCity%>_<%=CityCode %>_A1.html">A</a><a href="http://www.edushi.com/index/<%=CityCode %>/city_<%=TopCharCity%>_<%=CityCode %>_B1.html">B</a><a href="http://www.edushi.com/index/<%=CityCode %>/city_<%=TopCharCity%>_<%=CityCode %>_C1.html">C</a><a href="http://www.edushi.com/index/<%=CityCode %>/city_<%=TopCharCity%>_<%=CityCode %>_D1.html">D</a><a href="http://www.edushi.com/index/<%=CityCode %>/city_<%=TopCharCity%>_<%=CityCode %>_E1.html">E</a><a href="http://www.edushi.com/index/<%=CityCode %>/city_<%=TopCharCity%>_<%=CityCode %>_F1.html">F</a><a href="http://www.edushi.com/index/<%=CityCode %>/city_<%=TopCharCity%>_<%=CityCode %>_G1.html">G</a><a href="http://www.edushi.com/index/<%=CityCode %>/city_<%=TopCharCity%>_<%=CityCode %>_<%=TopCharCity%>1.html">H</a><a href="http://www.edushi.com/index/<%=CityCode %>/city_<%=TopCharCity%>_<%=CityCode %>_I1.html">I</a><a href="http://www.edushi.com/index/<%=CityCode %>/city_<%=TopCharCity%>_<%=CityCode %>_J1.html">J</a><a href="http://www.edushi.com/index/<%=CityCode %>/city_<%=TopCharCity%>_<%=CityCode %>_K1.html">K</a><a href="http://www.edushi.com/index/<%=CityCode %>/city_<%=TopCharCity%>_<%=CityCode %>_L1.html">L</a><a href="http://www.edushi.com/index/<%=CityCode %>/city_<%=TopCharCity%>_<%=CityCode %>_M1.html">M</a><a href="http://www.edushi.com/index/<%=CityCode %>/city_<%=TopCharCity%>_<%=CityCode %>_N1.html">N</a><a href="http://www.edushi.com/index/<%=CityCode %>/city_<%=TopCharCity%>_<%=CityCode %>_O1.html">O</a><a href="http://www.edushi.com/index/<%=CityCode %>/city_<%=TopCharCity%>_<%=CityCode %>_P1.html">P</a><a href="http://www.edushi.com/index/<%=CityCode %>/city_<%=TopCharCity%>_<%=CityCode %>_Q1.html">Q</a><a href="http://www.edushi.com/index/<%=CityCode %>/city_<%=TopCharCity%>_<%=CityCode %>_R1.html">R</a><a href="http://www.edushi.com/index/<%=CityCode %>/city_<%=TopCharCity%>_<%=CityCode %>_S1.html">S</a><a href="http://www.edushi.com/index/<%=CityCode %>/city_<%=TopCharCity%>_<%=CityCode %>_T1.html">T</a><a href="http://www.edushi.com/index/<%=CityCode %>/city_<%=TopCharCity%>_<%=CityCode %>_U1.html">U</a><a href="http://www.edushi.com/index/<%=CityCode %>/city_<%=TopCharCity%>_<%=CityCode %>_V1.html">V</a><a href="http://www.edushi.com/index/<%=CityCode %>/city_<%=TopCharCity%>_<%=CityCode %>_W1.html">W</a><a href="http://www.edushi.com/index/<%=CityCode %>/city_<%=TopCharCity%>_<%=CityCode %>_X1.html">X</a><a href="http://www.edushi.com/index/<%=CityCode %>/city_<%=TopCharCity%>_<%=CityCode %>_Y1.html">Y</a><a href="http://www.edushi.com/index/<%=CityCode %>/city_<%=TopCharCity%>_<%=CityCode %>_Z1.html">Z</a> </div>
        <div class="left">行业导航：<a href="http://www.edushi.com/index/<%=CityCode%>/city_<%=TopCharCity%>_<%=CityCode%>_Type_A.html">A</a><a href="http://www.edushi.com/index/<%=CityCode%>/city_<%=TopCharCity%>_<%=CityCode%>_Type_B.html">B</a><a href="http://www.edushi.com/index/<%=CityCode%>/city_<%=TopCharCity%>_<%=CityCode%>_Type_C.html">C</a><a href="http://www.edushi.com/index/<%=CityCode%>/city_<%=TopCharCity%>_<%=CityCode%>_Type_D.html">D</a><a href="http://www.edushi.com/index/<%=CityCode%>/city_<%=TopCharCity%>_<%=CityCode%>_Type_E.html">E</a><a href="http://www.edushi.com/index/<%=CityCode%>/city_<%=TopCharCity%>_<%=CityCode%>_Type_F.html">F</a><a href="http://www.edushi.com/index/<%=CityCode%>/city_<%=TopCharCity%>_<%=CityCode%>_Type_G.html">G</a><a href="http://www.edushi.com/index/<%=CityCode%>/city_<%=TopCharCity%>_<%=CityCode%>_Type_<%=TopCharCity%>.html">H</a><a href="http://www.edushi.com/index/<%=CityCode%>/city_<%=TopCharCity%>_<%=CityCode%>_Type_I.html">I</a><a href="http://www.edushi.com/index/<%=CityCode%>/city_<%=TopCharCity%>_<%=CityCode%>_Type_J.html">J</a><a href="http://www.edushi.com/index/<%=CityCode%>/city_<%=TopCharCity%>_<%=CityCode%>_Type_K.html">K</a><a href="http://www.edushi.com/index/<%=CityCode%>/city_<%=TopCharCity%>_<%=CityCode%>_Type_L.html">L</a><a href="http://www.edushi.com/index/<%=CityCode%>/city_<%=TopCharCity%>_<%=CityCode%>_Type_M.html">M</a><a href="http://www.edushi.com/index/<%=CityCode%>/city_<%=TopCharCity%>_<%=CityCode%>_Type_N.html">N</a><a href="http://www.edushi.com/index/<%=CityCode%>/city_<%=TopCharCity%>_<%=CityCode%>_Type_O.html">O</a><a href="http://www.edushi.com/index/<%=CityCode%>/city_<%=TopCharCity%>_<%=CityCode%>_Type_P.html">P</a><a href="http://www.edushi.com/index/<%=CityCode%>/city_<%=TopCharCity%>_<%=CityCode%>_Type_Q.html">Q</a><a href="http://www.edushi.com/index/<%=CityCode%>/city_<%=TopCharCity%>_<%=CityCode%>_Type_R.html">R</a><a href="http://www.edushi.com/index/<%=CityCode%>/city_<%=TopCharCity%>_<%=CityCode%>_Type_S.html">S</a><a href="http://www.edushi.com/index/<%=CityCode%>/city_<%=TopCharCity%>_<%=CityCode%>_Type_T.html">T</a><a href="http://www.edushi.com/index/<%=CityCode%>/city_<%=TopCharCity%>_<%=CityCode%>_Type_U.html">U</a><a href="http://www.edushi.com/index/<%=CityCode%>/city_<%=TopCharCity%>_<%=CityCode%>_Type_V.html">V</a><a href="http://www.edushi.com/index/<%=CityCode%>/city_<%=TopCharCity%>_<%=CityCode%>_Type_W.html">W</a><a href="http://www.edushi.com/index/<%=CityCode%>/city_<%=TopCharCity%>_<%=CityCode%>_Type_X.html">X</a><a href="http://www.edushi.com/index/<%=CityCode%>/city_<%=TopCharCity%>_<%=CityCode%>_Type_Y.html">Y</a><a href="http://www.edushi.com/index/<%=CityCode%>/city_<%=TopCharCity%>_<%=CityCode%>_Type_Z.html">Z</a> </div>
         <div class="left">城市导航：<a href="http://www.edushi.com/index/city_A.html">A</a><a href="http://www.edushi.com/index/city_B.html">B</a><a href="http://www.edushi.com/index/city_C.html">C</a><a href="http://www.edushi.com/index/city_D.html">D</a><a href="http://www.edushi.com/index/city_E.html">E</a><a href="http://www.edushi.com/index/city_F.html">F</a><a href="http://www.edushi.com/index/city_G.html">G</a><a href="http://www.edushi.com/index/city_H.html">H</a><a href="http://www.edushi.com/index/city_I.html">I</a><a href="http://www.edushi.com/index/city_J.html">J</a><a href="http://www.edushi.com/index/city_K.html">K</a><a href="http://www.edushi.com/index/city_L.html">L</a><a href="http://www.edushi.com/index/city_M.html">M</a><a href="http://www.edushi.com/index/city_N.html">N</a><a href="http://www.edushi.com/index/city_O.html">O</a><a href="http://www.edushi.com/index/city_P.html">P</a><a href="http://www.edushi.com/index/city_Q.html">Q</a><a href="http://www.edushi.com/index/city_R.html">R</a><a href="http://www.edushi.com/index/city_S.html">S</a><a href="http://www.edushi.com/index/city_T.html">T</a><a href="http://www.edushi.com/index/city_U.html">U</a><a href="http://www.edushi.com/index/city_V.html">V</a><a href="http://www.edushi.com/index/city_W.html">W</a><a href="http://www.edushi.com/index/city_X.html">X</a><a href="http://www.edushi.com/index/city_Y.html">Y</a><a href="http://www.edushi.com/index/city_Z.html">Z</a></div>
        <div class=" clear"></div>
    </div>
</div>
<!--Fotter Begin-->
<footer:FooterControl ID="Footer" runat="server"  />
<!--Fotter End-->
    </form>
    <script type="text/javascript"  language="javascript">

        var EDS_CityCode = '<%=CityCode %>';
        getzhaopin('<%=CurrentID %>');
        GetHotels('<%=CurrentID %>');
        var EDS_AdDom = 'div_head_ad';
        var EDS_AdKey = 'qiyediyitonglan';
        var vCountUrl = 'PageCount.aspx?ID=<%=CurrentID %>&Type=1';
        GetViewCount(vCountUrl);
        getLoginState();
        //企业、实体页面浏览总数
        function GetViewCount(url) {
            ENetwork.DownloadScript(url, function() {
                if (typeof _ViewCount != undefined) {
                    $('BrowseCount').innerHTML = _ViewCount.Count;
                }
            });
        }
</script>
<script src="<%=EDataCenterUrl %>ad/jsapi/a.js" type="text/javascript"></script>
</body>
</html>
