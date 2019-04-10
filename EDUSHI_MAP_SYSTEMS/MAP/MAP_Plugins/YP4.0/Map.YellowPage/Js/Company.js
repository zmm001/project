 var Search = null;
 var pageSize = 30;
 var pageCount =0; 
 var sum =0 ;
 function getCompany(currentid,cityCode) {
     var loading = '<div style="text-align:right; line-height:200%;font-size=12px;"><img src="new_images/loading.gif"><br />正在加载...</div>';
     this.$('divCompanyL').innerHTML = loading;
     var url = "GetWcfState.aspx?id=" + currentid + "&cityCode=" + cityCode + "&rnd=" + Math.random();
     ENetwork.DownloadScript(url, function() { CompanyHtml(); });
 };


 function CompanyHtml() {
     Search = SearchTable;
     var CompanyHtml = '';
     CompanyHtml += '<li><a href="1-{$companyLink}.shtml" title="{$companyName}" target="_blank">{$companyName}</a><a href="1-{$companyLink}.shtml#jd" title="{$companyName}" class="ty" style="display:{$viewjz}" target="_blank">我要预订</a><a href="1-{$companyLink}.shtml#gz" style="display:{$viewzp}"  class="ty"  style="display:{$viewzp}" title="{$companyName}" target="_blank">正在招聘</a><a href="1-{$companyLink}.shtml#zk"  class="ty"  style="display:{$viewdz}" title="{$companyName}" target="_blank">折扣信息</a></li>';

     var companyInfo = '';
     var count = Search.length;
     for (var i = 0; i < count; i++) {
         var strReplace = CompanyHtml;
         if (Search[i].jd_state == '1') {
             strReplace = strReplace.replace("{$viewjz}", 'inline');
         }
         else {
             strReplace = strReplace.replace("{$viewjz}", 'none');
         }
         if (Search[i].dz_state == '1') {
             strReplace = strReplace.replace("{$viewdz}", 'inline');
         }
         else {
             strReplace = strReplace.replace("{$viewdz}", 'none');
         }
         if (Search[i].zp_state == '1') {
             strReplace = strReplace.replace("{$viewzp}", 'inline');
         }
         else {
             strReplace = strReplace.replace("{$viewzp}", 'none');
         }

         strReplace = strReplace.replace("{$companyName}", Search[i].OCName);
         strReplace = strReplace.replace("{$companyName}", Search[i].OCName);
         strReplace = strReplace.replace("{$companyName}", Search[i].OCName);
         strReplace = strReplace.replace("{$companyName}", Search[i].OCName);
         strReplace = strReplace.replace("{$companyName}", Search[i].OCName);

         strReplace = strReplace.replace('{$companyLink}', Search[i].CompanyID);
         strReplace = strReplace.replace('{$companyLink}', Search[i].CompanyID);
         strReplace = strReplace.replace('{$companyLink}', Search[i].CompanyID);
         strReplace = strReplace.replace('{$companyLink}', Search[i].CompanyID);
         companyInfo += strReplace;

     }
     this.$('divCompanyL').innerHTML = companyInfo;   
 }

