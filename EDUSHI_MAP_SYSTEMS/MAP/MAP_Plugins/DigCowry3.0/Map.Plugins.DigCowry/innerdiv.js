function innerWaBaoDiv(str)
{
    var reval  = "";
    reval += "<div class=\"title\"><img src=\"images/ico_2.gif\" /><strong>挖宝达人</strong></div>";
    reval += "<table width=\"94%\" border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\">";
    reval += "  <tr>";
    reval += "     <td height=\"60\"><strong>人物：应学炜　网名：断支羽　职业：学生时间：12月15日15时23分</strong></td>";
    reval += "  </tr>";
    reval += "  <tr>";
    reval += "     <td><p><img src=\"images/DC_200912140422416339640456185906042970.jpg\" style=\"float:left; margin-right:3px\" />　　12月10日，同学在群里给我发来在E都市挖宝中奖的截图，我就半信半疑的去试了试运气。前面都是积分，10分钟后就出现了挖到农行的6个月的短信卷。好像意义不大，不过感觉来了，觉得今天一定是“RP爆发”的一天，然后又拿起锄头使劲挥，这次是采用“地毯式排雷”横着挖，5分钟左右吧，出现了98的牛排券。鸭蛋之后的惊喜是价值299的好家住房券，我截图发到群里好好炫耀一把。</p></td>";
    reval += "   </tr>";
    reval += "   <tr>";
    reval += "     <td height=\"10\"></td>";
    reval += "   </tr>";
    reval += "</table>";
    
    if(str == "1")
    {
        document.getElementById("innerDiv").innerHTML = reval;
    }
    
    if(str == "2")
    {
        document.getElementById("innerdivad").innerHTML = reval;
    }
}

