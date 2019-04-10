
var keyword = '便利店 超市 银行 景区 医院';
//周边公交
//function GetRimBusInfo(edataurl, x, y, kw, domain, mapUrl, id, state) {
//    
//    var loading = '<div style="text-align:center; line-height:200%;font-size=12px;"><img src="images/loading.gif"><br />正在加载...</div>';

//    this.$('rimBusUL').innerHTML = loading;
//    
//    var desurl = edataurl + 'CommMap5.0/Bus.aspx?domain=' + domain + '&l=zh-chs&req=7&x=' + x + '&y=' + y;
//    ENetwork.DownloadScript(desurl, function() { getinfo(edataurl, x, y, keyword, domain, mapUrl, id, state); });
//};
////周边公交替换数据
//function getinfo(edataurl, x, y, kw, domain, mapUrl, id, state) {
//    var rimBusHTML = '';
//    if (typeof _Station != 'undefined' && _Station != '') {
//        var s = _Station;
//        if (s.length >= 3) {
//            if ($('baseBtnRight') != null) {
//                $('baseBtnRight').style.display = 'block';
//            }
//        }
//        for (var i = 0; i < s.length; i++) {
//            if (typeof s[i].Bus != 'undefined' && s[i].Bus.length > 0) {
//                var objStation = s[i];
//                var stationName = objStation.StationName;
//                var stationID = objStation.StationID;
//                var x = objStation.PositionX;
//                var y = objStation.PositionY;
//                var busArry = s[i].Bus;
//                var bus = '<p>';
//                for (var j = 0; j < busArry.length; j++) {
//                    var gj = busArry[j].VehicleName;
//                    if (bus.indexOf(gj) < 0) {
//                        bus += gj + ', ';
//                    }
//                }
//                if (bus != '' && stationName != '') {
//                    bus = bus.substring(0, bus.length - 2);
//                    rimBusHTML += '<li><h1>【<a href="http://' + domain + '?sid=' + stationID + '&sname=' + escape(stationName) + '&x=' + x + '&y=' + y + '">' + stationName + '</a>】</h1>' + bus + '' + '</p></li> ';
//                }    
//            }
//        }
//    }
//    $('rimBusUL').innerHTML = rimBusHTML;
//};
//周边生活服务信息
//function fnLivingInfo(edataurl, x, y, kw, domain, mapUrl, id, state) {
//    var loading = '<div style="text-align:center; line-height:200%;font-size=12px;"><img src="images/loading.gif"><br />正在加载...</div>';
//    
//    this.$('livingInfoHTML').innerHTML = loading;
//    var zbUrl = edataurl + 'CommMap5.0/search.aspx?domain=' + domain + '&l=zh-chs&req=11&kw=' + escape(keyword) + '&x=' + x + '&y=' + y + '&len=500&pagenum=1&pagesize=100&indexversion=6';    
//    ENetwork.DownloadScript(zbUrl, function() { GetLivInfo(mapUrl, id, state); });

//}
//function GetLivInfo(mapUrl, id, state) {
//    var liviHtml = '';
//    var cs = ' <li><h1>便利店/超市</h1><p>'; //超市/便利店
//    var yh = ' <li><h1>银行/ATM机</h1><p>'; //周边银行
//    var yy = '  <li> <h1>医院</h1><p>'; //周边医院
//    var xx = '<li><h1>学校</h1><p>'; //学校
//    var shbmjf = ''; // 生活便民缴费
// 
//    var cs_link = '';
//    var yh_link = '';
//    var yy_link = '';
//    var xx_link = '';
//    var shbmjf_link = '';
//    var locationUrl = ''; //查看位置Url
//    if (typeof _Search != 'undefined' && _Search != '' && typeof _Search.SearchTable != 'undefined') {
//        var SearchTable = _Search.SearchTable;
//      
//        for (var i = 0; i < SearchTable.length; i++) {
//            var info = SearchTable[i];
//            if (info.MCT_TypeName.indexOf('超市') != -1 || info.MCT_TypeName.indexOf('便利店') != -1 || info.OCName.indexOf('超市') != -1 || info.OCName.indexOf('便利店') != -1 || info.OCName.indexOf('学校') != -1) {
//                if (cs.indexOf(info.OCName) == -1) {
//                    //cs += info.OCName.replace(' ', '') + '  ';
//                    cs += '<a target="_blank" class="jiequ_w_130" title=' + info.OCName.replace(' ', '') + ' href ="' + getLink(info.OwnerID, info.CompanyID) + '"  >' + info.OCName.replace(' ', '') + '</a>' + '  ';

//                }

//            }
//            if (info.MCT_TypeName.indexOf('银行') != -1 || info.OCName.indexOf('银行') != -1) {
//                if (yh.indexOf(info.OCName) == -1) {
//                    //yh += info.OCName.replace(' ', '') + '  ';
//                    yh += '<a target="_blank" class="jiequ_w_130" title=' + info.OCName.replace(' ', '') + ' href ="' + getLink(info.OwnerID, info.CompanyID) + '"  >' + info.OCName.replace(' ', '') + '</a>' + '  ';
//                }
//            }
//            if (info.MCT_TypeName.indexOf('医院') != -1 || info.OCName.indexOf('医院') != -1) {
//                if (yy.indexOf(info.OCName) == -1) {
//                    //yy += info.OCName.replace(' ', '') + '  ';
//                    yy += '<a target="_blank" class="jiequ_w_130" title=' + info.OCName.replace(' ', '') + ' href ="' + getLink(info.OwnerID, info.CompanyID) + '"  >' + info.OCName.replace(' ', '') + '</a>' + '  ';
//                }
//            }
//            if (info.MCT_TypeName.indexOf('学校') != -1 || info.OCName.indexOf('学校') != -1) {
//                if (xx.indexOf(info.OCName) == -1) {
//                    //xx += info.OCName.replace(' ', '') + '  ';
//                    xx += '<a target="_blank"  class="jiequ_w_130"  title=' + info.OCName.replace(' ', '') + ' href ="' + getLink(info.OwnerID, info.CompanyID) + '"  >' + info.OCName.replace(' ', '') + '</a>' + '  ';
//                }
//            }
//        }

//        //0为E店
//        if (state == 0) {
//            locationUrl = mapUrl + '?cid=' + id;

//        } //企业
//        else {
//            locationUrl = mapUrl + '?oid=' + id;
//        }
//    }
//    liviHtml += cs + '</p></li>' + yh + '</p></li>' + yy + '</p></li>' + xx + '</p></li>';
//    this.$('livingInfoHTML').innerHTML = liviHtml;
//}

function getLink(ownerID, companyID) {
    var link = '';
    if (ownerID == '0') {
        link = "1-" + companyID + ".shtml";
    }
    else {
        link = "2-" + ownerID + ".shtml";
    }
    return link;
};
//招聘信息
var Search = null;

var pageSize = 6;
var pageCountArray = new Array();
var sumArray = new Array();
function GetJobInfo(currentid) {
    var loading = '<div style="text-align:center; line-height:200%;font-size=12px;"><img src="images/loading.gif"><br />正在加载...</div>';
    this.$('gz').innerHTML = loading;
    var url = "zhaopin.aspx?id=" + currentid + "&cityCode=" + EDS_CityCode + "&rnd=" + Math.random();
    ENetwork.DownloadScript(url, function() { flagzhaopin(); });
}
function flagzhaopin() {
    if (typeof SearchTable != 'undefined') {
        Search = SearchTable;
        if (Search.length > 0) {
            this.$('gz').innerHTML = '<h4>招聘信息</h4>';
            for (var i = 0; i < SearchTable.length; i++) {
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
                    zhaopin.className = 'pindao';
                    $('gz').appendChild(zhaopin);
                    fnJobInfoHTML(1, i, null, 0);
                    GetJobPageHtml(i, pageCountArray[i]);
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


function GetJobPageHtml(index, pageCount) {
    var pageHtml = '<p class="page">';
    var last = pageCount + 1;
    pageHtml += '<a id ="a_{$index}0" onclick="fnJobInfoHTML(1,{$index},this,1);" title="首页" style="font-family: 宋体;cursor:pointer;">首页</a>';
    pageHtml = pageHtml.replace('{$index}', index).replace('{$index}', index);
    for (var i = 0; i < pageCount; i++) {
        var s = i + 1;
        pageHtml += '<a id ="a_{$index}' + s + '" onclick="fnJobInfoHTML(' + s + ',' + index + ',this,1)" style="font-family: 宋体;cursor:pointer;">[' + s + ']</a>';
        pageHtml = pageHtml.replace('{$index}', index);
    }
    pageHtml += '<a id="a_{$index}' + last + '"  onclick="fnJobInfoHTML(' + pageCount + ',' + index + ',this,1);" title="末页" style="font-family: 宋体;cursor:pointer;">末页</a>';
    pageHtml = pageHtml.replace('{$index}', index);
    pageHtml += '</p>';
    //如果不止1页，则显示分页控件
    if (pageCount > 1) {
        this.$('zhaopin' + index).innerHTML += pageHtml;
    }
}



function fnJobInfoHTML(curr, index, obj, state) {
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
           
            zhaopinHtml += '<table width="100%" border="0" id="subDivZhaopin{$index}"  cellspacing="10" cellpadding="0"><tr><td class="tname">{$sityName}</td><td class="tbd"><table width="100%" border="0" cellspacing="0" cellpadding="0"><thead><tr><td width="24%">职位名称</td><td>公司名称</td><td width="12%">工作地点</td><td width="20%">发布日期</td><td width="12%">详细信息</td></tr></thead><tbody>{$JobsHTML}</tbody></table></td></tr></table>';
            zhaopinHtml = zhaopinHtml.replace('{$sityName}', Search[index][n].siteName).replace('{$index}', index);
        }
        zhaopinlist += '  <tr><td><a href="{$JobUrl}" class="ty14">{$JobName}</a></td><td>{$CName}</td><td>{$Area}</td><td>{$RegDate}</td><td><a href="{$JobUrl}" class="tyellow">查看详情</a></td></tr>'
        zhaopinlist = zhaopinlist.replace("{$JobUrl}", Search[index][n].JobUrl).replace("{$JobUrl}", Search[index][n].JobUrl);
        zhaopinlist = zhaopinlist.replace("{$JobName}", Search[index][n].JobName);
        zhaopinlist = zhaopinlist.replace("{$CName}", Search[index][n].CName);
        zhaopinlist = zhaopinlist.replace("{$Area}", Search[index][n].Area);
        zhaopinlist = zhaopinlist.replace("{$RegDate}", Search[index][n].RegDate.substring(0, 10));
    }

    zhaopinHtml = zhaopinHtml.replace("{$JobsHTML}", zhaopinlist);
    if (state == 0) {
        this.$('zhaopin' + index).innerHTML += zhaopinHtml;
    }
    else {
        this.$('subDivZhaopin' + index).innerHTML = zhaopinHtml;
    }
}

