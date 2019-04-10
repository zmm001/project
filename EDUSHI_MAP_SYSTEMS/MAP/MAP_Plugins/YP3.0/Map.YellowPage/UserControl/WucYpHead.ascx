<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="WucYpHead.ascx.cs" Inherits="Map.YellowPage.UserControl.WucYpHead" %>
<script src="Js/GeneralLib.js" type="text/javascript" language="javascript"></script>
<script type="text/javascript" language="javascript" >
 function getLoginState ()
 {
        //用JS获取用户的昵称
        var obj =  document.getElementById("UserInfo");
        var cc = new CookieHelper();
        var cookieNickNameCookie = cc.getCookie('MemberNickName');
        var backUrl = escape(window.location.href);
        if (cookieNickNameCookie != null) {
            obj.innerHTML = '欢迎您！<span style="color:#ff6400">' + cookieNickNameCookie + '</span>&nbsp;&nbsp;<span>[<a href="<%=this.UserCenterUrl %>Index.aspx?city=<%=CityCode %>" target="_blank">我的E都市</a>]</span>&nbsp;&nbsp;<span>[<a style="cursor:pointer;" onclick="fnLoginOut(\'<%=CityCode %>\');">退出</a>]</span>';
        }
        else {
            obj.innerHTML = '欢迎您！<span>&nbsp;&nbsp;[<a href="http://my.edushi.com/Register.aspx" target="_blank" title="注册">注册</a>]&nbsp;&nbsp;</span><span>&nbsp;&nbsp;[<a href="http://my.edushi.com/Login.aspx?City=<%=CityCode %>&BackUrl=' + backUrl + '" >登录</a>]&nbsp;&nbsp;</span>';
        }
    }

</script>


<div id="mtop">
  <p><span id="UserInfo"></span><a href="javascript:;" onclick="this.style.behavior='url(#default#homepage)';this.setHomePage(window.location.href);return(false);" title="设为首页">设为首页</a><a href="javascript:;" onclick="window.external.addFavorite(window.location.href,document.title)" title="加入收藏">加入收藏</a></p>
</div>

<!--topmenu-->
<div id="topmenu">
  <div id="logo"><a href="http://www.edushi.com/"></a></div>
  <div id="topright">
    <p><asp:Label ID="lbotherurl" runat="server"></asp:Label></p>
    <p id="div_head_ad"></p>
  </div>
</div>
 <!-- logo over -->