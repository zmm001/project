 var Search = null;
 var pageSize = 30;
 var pageCount =0; 
 var sum =0 ;
 function getCompany(currentid,cityCode) {
     var loading = '<div style="text-align:right; line-height:200%;font-size=12px;"><img src="new_images/loading.gif"><br />正在加载...</div>';
     this.$('divCompanyL').innerHTML = loading;
     var url = "GetWcfState.aspx?id=" + currentid + "&cityCode=" + cityCode + "&rnd=" + Math.random();
     ENetwork.DownloadScript(url, function() { flagCompany(); });
 };


 function flagCompany() {
     if (typeof SearchTable != 'undefined') {
         Search = SearchTable;
         sum = Search.length;
         if (Search.length > 0) {
             if (sum % pageSize == 0) {
                 pageCount = sum / pageSize;
             }
             else {
                 pageCount = int(sum, pageSize) + 1;
             }
             $('div_company').style.display = 'block';
             CompanyHtml(1, null);
             getPageHtml(pageCount)

         }
         else {
             $('div_company').style.display = 'none';
         }
     }
     else {
         $('div_company').style.display = 'none';
     }

 }
 function int(i, k) {
     return Math.floor((i - 1) / k);
 }
 function CompanyHtml(curr, obj) {
     if (obj != null) {
         obj.style.color = "#EF7E00";
         for (var i = 0; i < pageCount + 2; i++) {
             var objid = obj.id;
             if (objid != 'a_' + i) {
                 this.$('a_' + i).style.color = "#666666";
             }
         }

     }
     var CurrentPage = curr;

     var CompanyHtml = '';
     CompanyHtml += '<li><a href="1-{$companyLink}.shtml" title="{$companyName}" target="_blank">{$companyName}</a><a href="1-{$companyLink}.shtml#jd" title="{$companyName}" class="ty" style="display:{$viewjz}" target="_blank">我要预订</a><a href="1-{$companyLink}.shtml#gz" style="display:{$viewzp}"  class="ty"  style="display:{$viewzp}" title="{$companyName}" target="_blank">正在招聘</a><a href="1-{$companyLink}.shtml#zk"  class="ty"  style="display:{$viewdz}" title="{$companyName}" target="_blank">折扣信息</a></li>';

     var leftCompany = '';
     var rightCompany = '';

     for (var i = (CurrentPage - 1) * 30; i < CurrentPage * 30; i++) {
         if (i > sum - 1) {
             break;
         }
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

         if (i % 2 == 0) {

             leftCompany += strReplace;

         }
         else {
             rightCompany += strReplace;
         }

     }
     this.$('divCompanyL').innerHTML = leftCompany;
     this.$('divCompanyR').innerHTML = rightCompany;
 }

 function getPageHtml(pageCount) {
     var last = pageCount + 1;
     var pageHtml = '<a id ="a_0" onclick="CompanyHtml(1,this);" title="首页" style="font-family: 宋体;cursor:pointer;">首页</a>';
     for (var i = 0; i < pageCount; i++) {
         var s = i + 1;
         pageHtml += '<a id ="a_' + s + '" onclick="CompanyHtml(' + s + ',this)" style="font-family: 宋体;cursor:pointer">[' + s + ']</a>';
     }

     pageHtml += '<a id="a_' + last + '"  onclick="CompanyHtml(' + pageCount + ',this);" title="末页" style="font-family: 宋体;cursor:pointer">末页</a>';
     this.$('divPage').innerHTML = pageHtml;
 }