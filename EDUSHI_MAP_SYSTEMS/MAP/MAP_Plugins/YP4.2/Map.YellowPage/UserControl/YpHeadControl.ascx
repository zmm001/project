<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="YpHeadControl.ascx.cs" Inherits="Map.YellowPage.UserControl.WucYpHead" %>
<script type="text/javascript" language="javascript" >
 function getLoginState ()
 {
        //用JS获取用户的昵称
        var obj =  document.getElementById("UserInfo");
        var cc = new CookieHelper();
        var cookieNickNameCookie = cc.getCookie('MemberNickName');
        var backUrl = escape(window.location.href);
        if (cookieNickNameCookie != null) {
            obj.innerHTML = '欢迎您！<span style="color:#ff6400">' + cookieNickNameCookie + '</span><span>[<a href="<%=this.UserCenterUrl %>Index.aspx?city=<%=CityCode %>" target="_blank">我的E都市</a>]</span><span>[<a style="cursor:pointer;" onclick="fnLoginOut(\'<%=CityCode %>\');">退出</a>]</span>';
        }
        else {
            obj.innerHTML = '欢迎您！<span>[<a href="http://my.edushi.com/Register.aspx" target="_blank" title="注册">注册</a>]</span><span>[<a href="http://my.edushi.com/Login.aspx?City=<%=CityCode %>&BackUrl=' + backUrl + '" >登录</a>]</span>';
        }
    }    
</script>

<!--用户信息Begin-->
<div class="top">
    <span id="UserInfo"></span>
    <span><a href="javascript:;" onclick="this.style.behavior='url(#default#homepage)';this.setHomePage(window.location.href);return(false);" title="设为首页">设为首页</a> | <a href="javascript:;" onclick="window.external.addFavorite(window.location.href,document.title)" title="加入收藏">加入收藏</a></span>
</div>

<div class="logo">
	<div class="logo_L"><a href="http://www.edushi.com"><img src="images/logo.jpg" alt="E都市" width="126" height="70" /></a></div>
    <div class="logo_R" id="div_head_ad"> </div>
</div>
<div class="menu" id="lbotherurl" runat="server">	
</div>
