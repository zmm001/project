
var SearchHouse = null;

var pageSizeHouse = 6;
var pageCountArray = new Array();
var sumArray = new Array();
function getHouse(currentid) {
    var loading = '<div style="text-align:center; line-height:200%;font-size=12px;"><img src="http://res.edushi.com/hy/4_3/images/loading.gif"><br />正在加载...</div>';
    this.$('div_house').innerHTML = loading;
    var url = "Channel/House.aspx?oid=" + currentid + "&cityCode=" + EDS_CityCode + "&rnd=" + Math.random();
    ENetwork.DownloadScript(url, function() { flagHouse(); });
}
function flagHouse() {
    if (typeof SearchTable != 'undefined') {
        SearchHouse = SearchTable;
        if (SearchHouse.length > 0) {
            this.$('div_house').innerHTML = '<div class="title">房产...</div>';
            for (var i = 0; i < SearchHouse.length; i++) {
                sumArray.push(SearchHouse[i].length);
                if (SearchHouse[i].length > 0) {
                    if (sumArray[i] % pageSizeHouse == 0) {
                        pageCountArray.push(sumArray[i] / pageSizeHouse);
                    }
                    else {
                        pageCountArray.push(int(sumArray[i], pageSizeHouse) + 1);
                    }
                    var house = document.createElement('div');
                    house.setAttribute('id', 'house' + i);
                    $('div_house').appendChild(house);
                    houseHtml(1, i, null, 0);
                    getHousePageHtml(i, pageCountArray[i]);
                }
            }
        }
        else {
            $('div_house').style.display = 'none';
        }
    }
    else {
        $('div_house').style.display = 'none';
    }

}
function int(i, k) {
    return Math.floor((i - 1) / k);
}


function getHousePageHtml(index, pageCount) {
    var pageHtml = ' <p class="page">';
    var last = pageCount + 1;
    pageHtml += '<a id ="a_{$index}0" onclick="houseHtml(1,{$index},this,1);" title="首页" style="font-family: 宋体;cursor:pointer;">首页</a>';
    pageHtml = pageHtml.replace('{$index}', index).replace('{$index}', index);
    for (var i = 0; i < pageCount; i++) {
        var s = i + 1;
        pageHtml += '<a id ="a_{$index}' + s + '" onclick="houseHtml(' + s + ',' + index + ',this,1)" style="font-family: 宋体;cursor:pointer;">[' + s + ']</a>';
        pageHtml = pageHtml.replace('{$index}', index);
    }
    pageHtml += '<a id="a_{$index}' + last + '"  onclick="houseHtml(' + pageCount + ',' + index + ',this,1);" title="末页" style="font-family: 宋体;cursor:pointer;">末页</a>';
    pageHtml = pageHtml.replace('{$index}', index);
    pageHtml += '</p>';
    if (pageCount > 1) {
        this.$('house' + index).innerHTML += pageHtml;
    }
}



function houseHtml(curr, index, obj, state) {
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
    var houseHtml = '';
    var houselist = '';
    for (var n = (CurrentPage - 1) * pageSizeHouse; n < CurrentPage * pageSizeHouse; n++) {
        if (n > sumArray[index] - 1) {
            break;
        }
        if (n == (CurrentPage - 1) * pageSizeHouse) {
            houseHtml += ' <ul class="ul_2" id="subDivHouse{$index}"><li class="li_title"><span class="tname">{$SiteName}</span></li>{$houselist}</ul>';          
            houseHtml = houseHtml.replace('{$SiteName}', SearchHouse[index][n].SiteName).replace('{$index}', index);
        }
        houselist += '<li><span class="span2 y2"><a href="{$Url}" target="_blank" title="{$Name}">{$Name}</a></span><span class="span9 y9">{$UnitPrice}元/m<sup>2</sup>(本房源信息来自{$SiteName}) </span></li>';
       
        houselist = houselist.replace("{$Url}", SearchHouse[index][n].Url);
        houselist = houselist.replace("{$Name}", SearchHouse[index][n].Name).replace("{$Name}", SearchHouse[index][n].Name);
        houselist = houselist.replace("{$UnitPrice}", SearchHouse[index][n].UnitPrice);
        houselist = houselist.replace("{$SiteName}", SearchHouse[index][n].SiteName);
    }

    houseHtml = houseHtml.replace("{$houselist}", houselist);
    if (state == 0) {
        this.$('house' + index).innerHTML += houseHtml;
    }
    else {
        this.$('subDivHouse' + index).innerHTML = houseHtml;
    }

}