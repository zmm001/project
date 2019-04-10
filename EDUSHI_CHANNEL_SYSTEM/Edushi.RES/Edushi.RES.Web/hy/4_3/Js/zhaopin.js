var Search = null;

 var pageSize = 6;
 var pageCountArray = new Array();
 var sumArray = new Array();
 function getzhaopin(currentid) {
     var loading = '<div style="text-align:center; line-height:200%;font-size=12px;"><img src="http://res.edushi.com/hy/4_3/images/loading.gif"><br />正在加载...</div>';
     this.$('gz').innerHTML = loading;
     var url = "Channel/Jobs.aspx?mid=" + currentid + "&cityCode=" + EDS_CityCode + "&rnd=" + Math.random();
     ENetwork.DownloadScript(url, function() { flagzhaopinHTML(); });
 }
 function flagzhaopinHTML() {
     this.$('gz').innerHTML = '';
     if (typeof SearchTable != 'undefined') {
         Search = SearchTable;
         if (Search.length > 0) {
             this.$('gz').innerHTML = '<div class="title">招聘...</div>';
            for(var i  = 0;i<SearchTable.length;i++)
            {
                 sumArray.push(SearchTable[i].length);
                 if (SearchTable[i].length > 0) {
                     if (sumArray[i] % pageSize == 0) {
                         pageCountArray.push(sumArray[i] / pageSize);
                     }
                     else {
                         pageCountArray.push(int(sumArray[i], pageSize) + 1);
                     }
                     var zhaopin = document.createElement('div');
                     zhaopin.setAttribute('id', 'zhaopin' + i);
                     zhaopin.className = 'Elsebox';
                     $('gz').appendChild(zhaopin);
                     zhaopinHtml(1, i, null,0);
                    //getPageHtml(i, pageCountArray[i]);
                 }
            }
         }
         else {
             $('gz').style.display = 'none';
         }
     }
     else {
         $('gz').style.display = 'none';
     }

 }
  function int(i, k) {
      return Math.floor((i - 1) / k);
  }


  function getPageHtml(index, pageCount) {
      var pageHtml = '<div class="otherpage"><div  class="paginate r"  >';
      var last = pageCount + 1 ;
      pageHtml += '<a id ="a_{$index}0" onclick="zhaopinHtml(1,{$index},this,1);" title="首页" style="font-family: 宋体;cursor:pointer;">首页</a>';
      pageHtml = pageHtml.replace('{$index}', index).replace('{$index}', index);
      for (var i = 0; i < pageCount; i++) {
          var s = i +1;
          pageHtml += '<a id ="a_{$index}' + s + '" onclick="zhaopinHtml(' + s + ',' + index + ',this,1)" style="font-family: 宋体;cursor:pointer;">[' + s + ']</a>';
          pageHtml = pageHtml.replace('{$index}', index);
      }
      pageHtml += '<a id="a_{$index}' + last + '"  onclick="zhaopinHtml(' + pageCount + ',' + index + ',this,1);" title="末页" style="font-family: 宋体;cursor:pointer;">末页</a>';
      pageHtml = pageHtml.replace('{$index}', index);
      pageHtml += '</div></div><div class="clear"></div>';
      if (pageCount > 1) {
          this.$('zhaopin' + index).innerHTML += pageHtml;
      }
  }



  function zhaopinHtml(curr, index, obj, state) {
      if (obj != null) {
          obj.style.color = "#EF7E00";
          for (var i = 0; i < pageCountArray[index] + 2; i++) {
              var objid = obj.id;
              if (objid != 'a_' + index + i) {
                  this.$('a_' + index + i).style.color = "#666666";
              }
          }
      }
      var CurrentPage = curr;

      var zhaopinHtml = '';
      var zhaopinlist = '';
      for (var n = (CurrentPage - 1) * pageSize; n < CurrentPage * pageSize; n++) {
          if (n > sumArray[index] - 1) {
                  break;
              }
              if (n == (CurrentPage - 1) * pageSize) {
                  zhaopinHtml += '<ul class="ul_2" id="subDivZhaopin{$index}"><li class="li_title">{$sityName}</li>{$zhaopinlist}</ul>';
                  zhaopinHtml = zhaopinHtml.replace('{$sityName}', Search[index][n].siteName).replace('{$index}', index);
              }
              zhaopinlist += '<li><span class="span2 y2"><a href="{$JobUrl}" target="_blank" title="{$JobName}">{$JobName}</a></span><span class="span3 y3">{$CName}</span><span class="span4"> {$RegDate}</span></li>';
              zhaopinlist = zhaopinlist.replace("{$JobUrl}", Search[index][n].JobUrl);
              zhaopinlist = zhaopinlist.replace("{$JobName}", Search[index][n].JobName).replace("{$JobName}", Search[index][n].JobName);
              zhaopinlist = zhaopinlist.replace("{$CName}", Search[index][n].CName);
              zhaopinlist = zhaopinlist.replace("{$RegDate}", Search[index][n].RegDate.substring(5, 10));           
          }
       
          zhaopinHtml = zhaopinHtml.replace("{$zhaopinlist}", zhaopinlist);
          if (state == 0) {
              this.$('zhaopin' + index).innerHTML += zhaopinHtml;
          }
          else {
              this.$('subDivZhaopin' + index).innerHTML = zhaopinHtml;
          }
    
  }