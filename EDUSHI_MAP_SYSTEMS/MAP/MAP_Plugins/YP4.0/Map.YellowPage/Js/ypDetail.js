      var isshow = 'true';
      var subStr = 15;
      var content = '<ul class="ul02" ><li id ="div_zbgj"><strong>公交/地铁：</strong>{$gj}</li>   <li><strong>便利店/超市：</strong>{$cs}</li>     <li><strong>银行/ATM机：</strong>{$yh}</li>   <li><strong>医院：</strong>{$yy}</li>  <li><strong>学校：</strong></li> {$shbmjf} </ul> {$more}';
      var contentinfo = '<ul class="kuang-ul01">	 <li><strong>公交/地铁：</strong>{$gj}</li> <li><strong>便利店/超市：</strong>{$cs}</li>	   <li><strong>银行/ATM机：</strong>{$yh}</li>	  <li><strong>医院：</strong>{$yy}</li>  <li><strong>学校：</strong></li>{$shbmjf_link}<a style=" display:block; height:31px;width:119px;margin-left:85%; border:1px solid red"  href="{$locationUrl}" target="_blank" ><img src="new_images/map-d.gif"></a></ul>';
      var keyword = '便利店 超市 银行 景区 医院';


      //liangp:2010-10-08(折扣信息)
      function GetDisCount(edataUrl,dianUrl) {
          var discountUrl = edataUrl + "CommMap5.0/DiscountInfo.aspx?req=7&l=zh-chs&citycode=" + EDS_CityCode;
        ENetwork.DownloadScript(discountUrl,
       function() {
        if (typeof _DiscountInfo != 'undefined' && _DiscountInfo != '') {
            showDiscount(_DiscountInfo, dianUrl);
           }
       }
        );       
     }

     //liangp:2010-10-08(折扣信息)
     function showDiscount(data, dianUrl) {
		        var discountHtml = '<div><h2 class="hh02"><span class="l">最新折扣优惠信息</span><span  class="r"></span></h2><div class="clear"></div><ul class="ul05"><li class="li-01 bor">店铺名称</li><li class="li-02 bor">折扣内容</li><li class="li-03 bor" style="width:412px">店铺地址</li></ul><div class="clear"></div><div id ="zhaopinlist">{$discountContent}</div></div>';
		        var discountContent = "";
		        var url = "";
		        for (var i = 0; i < _DiscountInfo.length; i++) {
		            discountContent += '<ul class="ul06"><li class="li-02" style="width:210px;"><a href="{$href}" target="_blank">{$Name}</a></li><li class="li-02"><a href="{$href}" target="_blank">{$Title}</a></li> <li class="li-03" style="color:black;width:412px;">{$Address}</li></ul><div class="clear"></div>';
		            url = dianUrl +'/VipStore/3/Voucher.aspx?StoreID={$mci_id}';
		            url = url.replace("{$mci_id}", _DiscountInfo[i].MCI_ID);
		            discountContent = discountContent.replace("{$href}", url).replace("{$Name}", _DiscountInfo[i].Name).replace("{$href}", url).replace("{$Title}", _DiscountInfo[i].Title).replace("{$Address}", _DiscountInfo[i].Address);
		        }
		        discountHtml = discountHtml.replace("{$discountContent}", discountContent);
		        $('discount').style.display = 'block';
		        $('discount').innerHTML = discountHtml;
		   }
      
      
      
      
      //mapUrl：当前地图5.0的Url;id:企业ID或实体ID;state:0为企业、1为实体[以前]
      // function Getzbgj(edataurl, x, y, kw, domain)[以前]
      function Getzbgj(edataurl, x, y, kw, domain, mapUrl, id, state) {
          var loading = '<div style="text-align:center; line-height:200%;font-size=12px;"><img src="new_images/loading.gif"><br />正在加载...</div>';

          this.$('div_czzb').innerHTML = loading;

          var desurl = edataurl + 'CommMap5.0/Bus.aspx?domain=' + domain + '&l=zh-chs&req=7&x=' + x + '&y=' + y;


          ENetwork.DownloadScript(desurl, function() { getinfo(edataurl, x, y, keyword, domain,mapUrl,id,state); });

      }

      //mapUrl：当前地图5.0的Url;id:企业ID或实体ID;state:0为企业、1为实体[以前2010-08-13]
    // function Getzbgj(edataurl, x, y, kw, domain)[以前2010-08-13]
    function GetZbInfo(edataurl,x,y,kw,domain,mapUrl,id,state)
    {
      var zbUrl =edataurl+'CommMap5.0/search.aspx?domain='+domain+'&l=zh-chs&req=11&kw='+escape(kw)+'&x='+x+'&y='+y+'&len=500&pagenum=1&pagesize=100&indexversion=6';
      
    //  alert(zbUrl);

      //  ENetwork.DownloadScript(zbUrl,function (){ zbinfo();});
      ENetwork.DownloadScript(zbUrl, function() { zbinfo(mapUrl, id, state); });
      
    }
    function getLink(ownerID, companyID) {
        var link = '';
        if (ownerID == '0') {
            link = "1-" + companyID + ".shtml";
        }
        else {
            link = "2-" + ownerID + ".shtml";
        }
        return link;
    }

    //mapUrl：当前地图5.0的Url;id:企业ID或实体ID;state:0为企业、1为实体[以前2010-08-13]
    // zbinfo()[以前2010-08-13]
    function zbinfo(mapUrl, id, state) {
        var cs = ''; //超市/便利店
        var yh = ''; //周边银行
        var yy = ''; //周边医院
        var shbmjf = '';// 生活便民缴费

        var cs_link = '';
        var yh_link = '';
        var yy_link = '';
        var shbmjf_link = '';
        var locationUrl = '';//查看位置Url

        if (typeof _Search != 'undefined' && _Search != '' && typeof _Search.SearchTable != 'undefined') {
            var SearchTable = _Search.SearchTable;

            for (var i = 0; i < SearchTable.length; i++) {
                var info = SearchTable[i];
                if (info.MCT_TypeName.indexOf('超市') != -1 || info.MCT_TypeName.indexOf('便利店') != -1 || info.OCName.indexOf('超市') != -1 || info.OCName.indexOf('便利店') != -1) {
                    if (cs.indexOf(info.OCName) == -1) {
                        cs += info.OCName.replace(' ', '') + '  ';
                        cs_link += '<a target="_blank" href ="' + getLink(info.OwnerID, info.CompanyID) + '"  >' + info.OCName.replace(' ', '') + '</a>' + '  ';

                    }

                }
                if (info.MCT_TypeName.indexOf('银行') != -1 || info.OCName.indexOf('银行') != -1) {
                    if (yh.indexOf(info.OCName) == -1) {
                        yh += info.OCName.replace(' ', '') + '  ';
                        yh_link += '<a target="_blank" href ="' + getLink(info.OwnerID, info.CompanyID) + '"  >' + info.OCName.replace(' ', '') + '</a>' + '  ';
                    }
                }
                if (info.MCT_TypeName.indexOf('医院') != -1 || info.OCName.indexOf('医院') != -1) {
                    if (yy.indexOf(info.OCName) == -1) {
                        yy += info.OCName.replace(' ', '') + '  ';
                        yy_link += '<a target="_blank" href ="' + getLink(info.OwnerID, info.CompanyID) + '"  >' + info.OCName.replace(' ', '') + '</a>' + '  ';
                    }
                }
            }

            //0为E店
            if (state == 0) {
                locationUrl = mapUrl + '?cid=' + id;

            }//企业
            else {
                locationUrl = mapUrl + '?oid=' + id;
            }


        }

        
        if (isshow == 'true' || cs.length > subStr || cs.length > subStr) {
            isshow = 'true';

            if (EDS_CityCode.indexOf('nanjing') != -1 || EDS_CityCode.indexOf('suzhou') != -1) {
                content = content.replace('{$more}', '<p class="class_more" style="margin:-15px; margin-right:-12px;"><a >更多…</a></p>');
            }
            else {
                content = content.replace('{$more}', '<p class="class_more"><a>更多…</a></p>');
            }
     
        }
        else {
            isshow = 'false';
            content = content.replace('{$more}', '');
        }

        if (EDS_CityCode.indexOf('nanjing') != -1 || EDS_CityCode.indexOf('suzhou') != -1) {
            shbmjf = '<li><strong>生活便民缴费：</strong><a  style="cursor:pointer" target="_blank" href ="http://nanjing.edushi.com/zfb/edushi.html">水电煤网上缴费</a></li>';

            shbmjf_link = '<li><strong>生活便民缴费：</strong><a  style="cursor:pointer" target="_blank" href ="http://nanjing.edushi.com/zfb/edushi.html">水电燃气缴费、通讯费、固定宽带费、信用卡还款</a></li>';


        }
        else {
            shbmjf = '';
            shbmjf_link = '';
        }
        
        
        //content = this.$('div_czzb').innerHTML;
        content = content.replace('{$cs}', getSub(cs, subStr));
        content = content.replace('{$yh}', getSub(yh, subStr));
        content = content.replace('{$yy}', getSub(yy, subStr));
        content = content.replace('{$shbmjf}', shbmjf);
        //liangp  20100811


        this.$('div_czzb').innerHTML = content;
      
        contentinfo = contentinfo.replace('{$cs}', cs_link);
        contentinfo = contentinfo.replace('{$yh}', yh_link);
        contentinfo = contentinfo.replace('{$yy}', yy_link);
        contentinfo = contentinfo.replace('{$shbmjf_link}', shbmjf_link);
        contentinfo = contentinfo.replace('{$locationUrl}', locationUrl);
        this.$('div_czzb_all').innerHTML = contentinfo;
    }


    //mapUrl：当前地图5.0的Url;id:企业ID或实体ID;state:0为企业、1为实体[以前]
    // function Getzbgj(edataurl, x, y, kw, domain)[以前]
    function getinfo(edataurl, x, y, kw, domain,mapUrl,id,state) {

        if (typeof _Station != 'undefined' && _Station != '') {
            var s = _Station;
            var stations = '';
            var s_solid = '';

            for (var i = 0; i < s.length; i++) {
                if (typeof s[i].Bus != 'undefined' && s[i].Bus.length > 0) {
                    var objStation = s[i];
                    var stationName = objStation.StationName;
                    var busArry = s[i].Bus;
                    var bus = '';
                    for (var j = 0; j < busArry.length; j++) {
                        var gj = busArry[j].VehicleName;
                        if (bus.indexOf(gj) < 0) {
                            bus += gj + ', ';
                        }
                    }
                    if (bus != '' && stationName != '' && stations.indexOf(stationName) == -1) {
                        bus = bus.substring(0, bus.length - 2);
                        stations += '<B>' + stationName + '</B>【' + bus + '】' + ' ';
                        s_solid += stationName + '[' + bus + ']' + ' ';
                    }

                }
            }
            s_solid = getSub(s_solid, subStr);
            content = content.replace('{$gj}', s_solid);
            contentinfo = contentinfo.replace('{$gj}', stations);

            if (content.length > subStr) {
                isshow = 'true';
            }
            else {
                isshow = 'false';
            }
        }
        else {
            content = content.replace('{$gj}', '');

            contentinfo = contentinfo.replace('{$gj}', '');
            isshow = 'false';

        }
        GetZbInfo(edataurl, x, y, kw, domain, mapUrl, id, state);
    };
    function getSub(strInfo, subCut) {
        var subS = '';
        if (strInfo.length > subCut) {
            subS = strInfo.substring(0, subCut) + '...';
        }
        else {
            subS = strInfo;
        }
        return subS;

    };
    function divclose(name) {
        var obj = this.$(name);
        if (typeof obj != 'undefined' && obj != null) {
            obj.style.display = "none";

        }
    };

    function _GetEvent(e) {
        if (!e) { e = window.event; }
        if (e.pageX == undefined) { e.pageX = e.clientX + document.body.scrollLeft; }
        if (e.pageY == undefined) { e.pageY = e.clientY + document.body.scrollTop; }
        return e;
    };


    function divShow(e, name) {
        e = _GetEvent(e);
        var obj = this.$(name);
        var div_left = e.pageX;
        var div_top = e.pageY;
        if (typeof obj != 'undefined' && obj != null) {
            if (name == 'div_oc_info') {
                var desc = this.$('lbdesc').innerHTML;
                if (desc.indexOf('……') > 0) {
                    obj.style.top = div_top + 10 + "px";
                    obj.style.left = div_left + 10 + "px";

                    obj.style.display = "block";
                }
            }
            else {
                if (isshow == "true") {
                    obj.style.top = div_top + 10 + "px";
                    obj.style.left = div_left - 688 + "px";
                    obj.style.display = "block";
                }
            }
        }
    }

    //房产价格信息
    //ownerName实体名称
    function fnHouse(ownerName) {
  
        var _tempcitycode ='';
        if (EDS_CityCode == 'hz')
        {
            _tempcitycode = 'hangzhou';
        }
        else
        {
            _tempcitycode = EDS_CityCode;
        }
        var url = "http://aip.fangtoo.com/BuildingList.aspx?citydomain=" + _tempcitycode + "&page=1&pagesize=5&k=" + escape(ownerName);
        ENetwork.DownloadScript(url,
       function() {
           if (typeof _FTMapSearchResult != 'undefined' && _FTMapSearchResult != '') {
               fnHouseDetail(_FTMapSearchResult);
           }
        }
        );
    }
    //拼装放心价格信息
    function fnHouseDetail(data) {
    
        var houseHtml ='';
        for(var i =0;i<data.Item.length;i++)
        {
            var content ='';
            houseHtml += '<div><span style="float:left">该{$Name}所在楼盘房产信息</span><span style="float:right"><a href={$Url}?f=edushi target="_blank">查看详情>></a></span> </div>{$Content}<br /><div style="float:left;margin-top:5px; clear:both"><img src="new_images/OutBtnLinkBg.gif" border="0" complete="complete" usemap="#Map" /><MAP id="Map" name="Map"><AREA title="发布求购" href="http://hangzhou.fangtoo.com/house/trade/req.htm" shape="rect" alt="发布求购" target="_blank" coords="252,3,310,19"><AREA title="发布求购" href="http://hangzhou.fangtoo.com/house/trade/req.htm" shape="rect" alt="发布求购" target="_blank" coords="252,3,310,19"><AREA title="发布出售" href="http://user.fangtoo.com/user/TradeHouse/Edit.htm" shape="rect" alt="发布出售" target="_blank" coords="171,3,229,19"><AREA title="发布求租" href="http://hangzhou.fangtoo.com/house/lease/req.htm" shape="rect" alt="发布求租" target="_blank" coords="90,3,148,19"><AREA title="发布出租" href="http://user.fangtoo.com/user/LeaseHouse/Edit.htm" shape="rect" alt="发布出租" target="_blank" coords="10,3,68,19"></MAP></div>';
            houseHtml = houseHtml.replace("{$Name}", data.Item[i].Name).replace("{$Url}", data.Item[i].Url);

            if (Math.round(data.Item[i].HangPrice) != 0) { 
             content += '<br /><div style="float:left">挂牌均价：<span style="color:#ff6400">{$HangPrice}</span>元/㎡</div>';
             content = content.replace("{$HangPrice}",Math.round(data.Item[i].HangPrice));
             }
             if (data.Item[i].SecondNum == 0) {
                 if (data.Item[i].LeaseNum != 0) { //出租
                 content +='<br /><div style="float:left; margin-top:5px;">出租(<span style="color:Blue">{$LeaseNum}</span>套)</div>';
                 content = content.replace("{$LeaseNum}",data.Item[i].LeaseNum);
                 }
             }
             else {
             content +='<br /><div style="float:left; margin-top:5px;">二手房(<span style="color:Blue">{$SecondNum}</span>套)';
             content = content.replace("{$SecondNum}",data.Item[i].SecondNum);
                 if (data.Item[i].LeaseNum != 0) {   
                   content +='出租(<span style="color:Blue">{$LeaseNum}</span>套)';
                   content = content.replace("{$LeaseNum}",data.Item[i].LeaseNum);
                 }
             content += '</div>';
         }
         houseHtml.replace("{$Content}", content);
         break;
     }
     if (houseHtml != '') {
        // $('div_House').style.display = 'block';
         $('div_House').innerHTML = houseHtml;
     }
    }
    
    
    