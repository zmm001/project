var _SearchType = 2;    //搜索类型  0:地点搜索
var _Key;           //搜索关键字

var _Page = 1;
var _PageCount = 1;
var _RecordCount = 0;
var _PageSize = 10;
var sSearchUrl = "";
var sSearchType = 0; //默认模糊搜索

var _SearchData = {};
var cVouchAd = '';

var _divResult = null;
var _divContent = null;
var _divLoading = null;

function fnKeyupSearch() {
    if (window.event.keyCode == 13 || event.keyCode == 13) {
        fnSearch();
    }
}

function fnSearch() {


    _divResult = $("#divResult");
    _divLoading = $("#loading");
    _divContent = $("#divContent");

    _txtQuery = $("#txtQuery");
    _txtAddress = $("#txtEndAddress");

    _txtQuery.css("backgroundColor", "#fff");
    _txtAddress.css("backgroundColor", "#fff");

    _divLoading.show();
    _divContent.html("");
    _divResult.html("").hide();

    _Page = 1;
    if ($("#rbtBus").attr("checked") == true) {//公交搜索  

        _startAddress = $.trim(_txtQuery.val());
        _endAddress = $.trim(_txtAddress.val());

        if (_startAddress == '') {
            _txtQuery.focus().css("backgroundColor", "#ff7000");
            _divLoading.hide();
            return;
        }
        if (_endAddress == '') {
            _txtAddress.focus().css("backgroundColor", "#ff7000");
            _divLoading.hide();
            return;
        }

        sSearchUrl = GlobalConfig.EDataCenterUrl + 'CommMap5.0/Bus.aspx?domain=' + window.GlobalConfig.Domain + '&req=9&l=' + window.GlobalConfig.Language + '&Start=' + encodeURIComponent(_startAddress) + '&End=' + encodeURIComponent(_endAddress);
        fnShowBusData(sSearchUrl);
    } else {//地点搜索
        _Key = $.trim($("#txtQuery").val());
        if (_Key == '') {
            _txtQuery.focus().css("backgroundColor", "#ff7000");
            _divLoading.hide();
            return;
        }

        sSearchUrl = GlobalConfig.DataCetnerSearchDataUrl + 'SearchMapByAddr/' + window.GlobalConfig.CityCode + '/' + window.GlobalConfig.Language + '/Format/Json/Search/1/100?q=' + encodeURIComponent(_Key);
        if (sSearchUrl != '') {
            //推荐
            var _jurl = '';
            if (window.GlobalConfig.Is3D == 1) {
                _jurl = window.GlobalConfig.DataCetnerMapDataUrl + "Map7.0/SearchVouch.aspx?citycode=" + window.GlobalConfig.CityCode + "&l=" + window.GlobalConfig.Language + "&key=" + fnRequest('keyword1');

                ENetwork.DownloadScript(_jurl, function() {
                    if (typeof VouchAd != 'undefined' && VouchAd.length > 0) {
                        for (var u = 0; u < VouchAd.length; u++) {
                            if (VouchAd[u].BAC_OPenType == 2) {
                                cVouchAd += '<tr><td style=\"width:15px;\"><img src=\"Images/button4.gif\" /></td><th align="left"><a  style="text-decoration:underline;font-weight:bold;color:red;font-size:12px;" href="javascript:parent.ShowCommendPopByContent(\'' + VouchAd[u].BAC_Title + '\',VouchAd[' + u + '].BAC_Content,' + VouchAd[u].BAC_LogincalX + ',' + VouchAd[u].BAC_LogincalY + ')">' + VouchAd[u].BAC_Title + '</a></th></tr>';
                            }
                            else {
                                var _TempVouchAd = "<tr><td style=\"width:15px;\"><img src=\"Images/button4.gif\" /></td><th align='left'><a style=\"color:#F60;\" href=\"http://{$LinkUrl}\" target=\"_blank\">{$Title}</a></th></tr>";
                                cVouchAd += _TempVouchAd.replace('{$Title}', VouchAd[u].BAC_Title).replace('{$LinkUrl}', VouchAd[u].BAC_LinkUrl.replace('http://', ''));
                            }
                        }
                    }
                    ENetwork.DownloadScript(sSearchUrl, function() {
                        fnShowData();
                    });
                });
            }
            else {
                ENetwork.DownloadScript(sSearchUrl, function() {
                    fnShowData();
                });
            }
        }
    }
}


//------------------地址搜索------------------------------------------------
//显示搜索到的数据
function fnShowData() {

    _divLoading.hide();
    if (typeof _Search == 'undefined') {
        _Search = [];
    }
    _SearchData = _Search;

    var ulLocalSearchHtml = '', liLocalSearchHtml = '';
    if (_Search.length > 0) {
        if (_SearchType == 2) {
            $('#divResult').html('<div class="Sea3DTil">共有<strong>' + _Search.length + '项</strong>符合<strong>' + _Key + '</strong>的查询结果</div>').show();
        }

        ulLocalSearchHtml = "";
        ulLocalSearchHtml += "<table id=\"tbCommend\" border=\"0\" cellpadding=\"1\" cellspacing=\"1\" style=\"line-height:17px;\">{$VouchAD}</table><ul class=\"cenne\">{$ListLi}</ul>";
        ulLocalSearchHtml += "<div class=\"page\">{$Page}</div>";
        liLocalSearchHtml += "<li><span class=\"num\">{$No}.</span><span class=\"{$Class}\"><a href=\"javascript:;\" title=\"{$Title}\" onclick=\"RecordClick({$oid},{$cid},{$lstid},{$X},{$Y},{$DataType},'{$Name}','','{$Telephone}',{$num},'{$Address}')\">{$Title}</a></span>&nbsp;&nbsp;{$IsVip}<br><span class=\"dz\">{$Address}</span></li>";
    }
    else {
        if (_SearchType == 2) {//地点搜索
            $('#divResult').html('<div class="NoResult">很抱歉，没有找到与"<strong>' + _Key + '</strong>"相匹配的信息。</div>').show();
            $('#divContent').html('<div class="Search2D">您可以选择在<a href="javascript:;" onclick="parent.fnGoogleSearch(\'' + _Key + '\')">更大面积范围</a>的地图内搜索您要的结果</div>');
        }
    }
    var s = '';
    var r = '';

    _RecordCount = _Search.length;
    if ((_RecordCount % _PageSize) == 0) {
        _PageCount = _RecordCount / (_PageSize);
    }
    else {
        _PageCount = int(_RecordCount, _PageSize) + 1;
    }
    var Begin = (_Page - 1) * (_PageSize);
    var End = _Page * _PageSize;
    if (End > _RecordCount) End = _RecordCount;
    _Begin = Begin;
    _End = End;
    var LiHtml = "";
    r = ulLocalSearchHtml;
    for (i = Begin; i < End; i++) {
        LiHtml = liLocalSearchHtml;

        var _tem_sAddress = "";
        if (_SearchType == 2) {//地址
            var t = _Search[i].OCName;
            var sAddress = _tem_sAddress = _Search[i].Address;
            var arrKeyword = _Key.split(' ');
            for (var n = 0; n < arrKeyword.length; n++) {
                sAddress = sAddress.replaceAll(arrKeyword[n], '<span style="color:#ff6400">' + arrKeyword[n] + '</span>');
            }
        }
        var sTmpHtml = '';
        if (_Search[i].RecordType == 1 || _Search[i].RecordType == 2 || _Search[i].RecordType == 4) {
            sTmpHtml = LiHtml.replace('{$No}', i + 1).replace('{$Title}', _Search[i].OCName).replace('{$Title}', t).replace('{$X}', _Search[i].X).replace('{$Y}', _Search[i].Y).replace('{$oid}', _Search[i].OwnerID).replace('{$cid}', _Search[i].CompanyID).replace('{$lstid}', _Search[i].LST_ID).replace('{$DataType}', _Search[i].RecordType).replace('{$Name}', _Search[i].OCName).replace('{$Telephone}', _Search[i].Telephone).replace('{$Address}', _tem_sAddress).replace('{$Address}', sAddress).replace('{$Class}', 'SanWei').replace('{$num}', i);
        }
        else {
            sTmpHtml = LiHtml.replace('{$No}', i + 1).replace('{$Title}', _Search[i].OCName).replace('{$Title}', t).replace('{$X}', _Search[i].Lx).replace('{$Y}', _Search[i].Ly).replace('{$oid}', _Search[i].OwnerID).replace('{$cid}', _Search[i].CompanyID).replace('{$lstid}', _Search[i].LST_ID).replace('{$DataType}', _Search[i].RecordType).replace('{$Name}', _Search[i].OCName).replace('{$Telephone}', _Search[i].Telephone).replace('{$Address}', _tem_sAddress).replace('{$Address}', sAddress).replace('{$Class}', 'ErWei').replace('{$num}', i);
        }

        //杭州添加E店链接及图标
        var sUrl = '', sVipIcon = '';
        var sJuanIcon = '';
        var sCuIcon = '';
        var sYingIcon = '';
        if (_Search[i].LST_ID * 1 > 0) {
            if (_Search[i].LST_ID * 1 == 1 && _Search[i].Vip * 1 == 3) {
                sUrl = window.GlobalConfig.DianUrl + 'VipStore/3/Index.aspx?StoreID=' + _Search[i].CompanyID;
            }
            else {
                sUrl = window.GlobalConfig.DianUrl + 'VipStore/' + _Search[i].LST_ID + '/Index.aspx?StoreID=' + _Search[i].CompanyID;
            }
        }
        else {
            sUrl = window.GlobalConfig.HuangyeUrl + 'ShopView.aspx?id=' + _Search[i].CompanyID;
        }
        ////        if (_Search[i].LST_ID * 1 == 2) {
        ////            sVipIcon = '<a href="' + sUrl + '" target="_blank"><img src="/Images/ComMapIco1.gif" alt="商务地图" /></a>';
        ////        }

        if (_Search[i].LST_ID * 1 == 1) {
            if (_Search[i].Vip * 1 > 1) {
                sVipIcon = '<a href="' + sUrl + '" target="_blank"><img src="/Images/VipEdian.gif" alt="Vip E店" /></a>';

                if (_Search[i].LV_ID * 1 > 0) {
                    sJuanIcon = '<img src="images/Juan.gif" alt="免费下载本店优惠券" />';
                }
                if (_Search[i].LT_ID * 1 > 0) {
                    sCuIcon = '<img src="images/Cu.gif"alt="本店正在促销打折" />';
                }
                if (_Search[i].LCE_ShopCard * 1 > 0) {
                    sYingIcon = '<img src="images/Ying.gif" alt="本店已通过营业执照认证" />';
                }
            }
        }

        sTmpHtml = sTmpHtml.replace('{$IsVip}', '<span class="IsVipIco">' + sVipIcon + sYingIcon + sJuanIcon + '&nbsp;' + sCuIcon + '</span>');
        s += sTmpHtml;
    }
    var strPage = fnPager(5, _Page, _PageSize, _PageCount, 'window.fnShowByPage');
    r = r.replace('{$ListLi}', s).replace('{$Page}', strPage).replace('{$VouchAD}', cVouchAd);
    var tempr = r;

    if (tempr != '') {
        $('#divContent').html(r);
    }
    else {
        $('#divContent').html('<table id=\"tbCommend\" border=\"0\" cellpadding=\"1\" cellspacing=\"1\" style=\"line-height:17px;\">' + cVouchAd + '</table>' + r);
    }
    onSearchDataLoadComplete(_Search, Begin, End);
}
function fnShowByPage(iPage) {
    if (iPage) {
        _Page = iPage;
    }
    fnShowData();
}
function onSearchDataLoadComplete(data, begin, end) {
    _IconLayer.innerHTML = '';
    _EyeIconLayer.innerHTML = '';

    for (var i = begin; i < end; i++) {
        var x = data[i].X;
        var y = data[i].Y;
        if (data[i].RecordType == '3') {
            var epoint = vM.GLatLng2EPoint(new EGIS.LatLng(x, y))
            x = epoint.X;
            y = epoint.Y;
        }


        if (i == begin) {
            MoveTo(x, y, true);
        }
        if (data[i].RecordType == 1 || data[i].RecordType == 2 || data[i].RecordType == 4) {
            fnAppendIcon(data[i].OCName, x, y, i + 1, 'Images/VesicleBg.png', 'Images/AlterVesicle.png', 'if(parent.fnShowSearchPop){parent.fnShowSearchPop(' + data[i].OwnerID + ', ' + data[i].CompanyID + ',' + data[i].LST_ID + ',' + x + ', ' + y + ',' + data[i].RecordType + ',\'' + data[i].OCName + '\',\'' + data[i].Address + '\',\'' + data[i].Telephone + '\');}', 41, 33, 7, 32, true);
        }
        else {
            var epoint = vM.GLatLng2EPoint(new EGIS.LatLng(data[i].Lx, data[i].Ly));
            x = epoint.X;
            y = epoint.Y;
            fnAppendIcon(data[i].OCName, x, y, i + 1, 'Images/VesicleBg.png', 'Images/AlterVesicle.png', 'if(parent.fnShowSearchPop){parent.fnShowSearchPop(' + data[i].OwnerID + ', ' + data[i].CompanyID + ',' + data[i].LST_ID + ',' + data[i].Lx + ', ' + data[i].Ly + ',' + data[i].RecordType + ',\'' + data[i].OCName + '\',\'' + data[i].Address + '\',\'' + data[i].Telephone + '\');}', 41, 33, 7, 32, true);
        }
    };
}



function RecordClick(oid, cid, lstid, X, Y, DataType, Name, o, Telephone, num, Address) {
    var typename = '';
    switch (DataType) {
        case 0:
            typename = '全站搜索';
            break;
        case 1:
            typename = '名称';
            break;
        case 2:
            typename = '地址';
            break;
        case 3:
            typename = '周边';
            break;
        case 9:
            typename = '道路';
            break;
    }
    var temp = Name + "%" + oid.toString() + "%" + cid.toString();

    var recordurl = window.GlobalConfig.EDataCenterUrl + "Statis/KeywordClickStatis/" + window.GlobalConfig.CityCode + "/" + window.GlobalConfig.Language + "/" + encodeURIComponent(typename) + "/" + encodeURIComponent(_Key) + "/" + oid.toString() + "/" + cid.toString() + "/" + encodeURIComponent(Name) + "/" + (num + 1);

    ENetwork.DownloadScript(recordurl, function() { });
    fnShowMsgPop(X, Y, Name, Telephone, Address, DataType);
}
function fnShowMsgPop(x, y, Name, Telephone, Address, DataType) {
    if (DataType == '3') {
        var epoint = vM.GLatLng2EPoint(new EGIS.LatLng(x, y))
        x = epoint.X;
        y = epoint.Y;
    }

    if (!_MsgPopControl) {//没有显示的   TestPop
        //引入 TestPopControl
        ENetwork.DownloadScript('/bdt/js/MsgPopControl.js', function() {
            _MsgPopControl = new MsgPopControl(vM.Body.document);
            _MsgPopControl.ID = vM.AppendEntity(_MsgPopControl.Body, _MsgLayer, false, x, y, _MsgPopControl.Width, _MsgPopControl.Height, 0, 84, _MsgPopControl.CanDrag, _MsgPopControl.autoremove, _MsgPopControl.autozoomchangeremove);
            _MsgPopControl.onLoadComplete = function() {
                _MsgPopControl.showPop(_MsgPopControl.ID, false, Name, Telephone, Address, x, y);
                MoveTo(x + vM.GetMapPos(105), y, true);
                fnSetInfo(Name, Telephone, Address, x, y);

            }
        });
    } else { //已经有了  直接显示
        _MsgPopControl.showPop(_MsgPopControl.ID, true, Name, Telephone, Address, x, y);
        MoveTo(x + vM.GetMapPos(105), y, true);
        fnSetInfo(Name, Telephone, Address, x, y);
    }
}
function fnSetInfo(Name, Telephone, Address, x, y) {
    _ex = x; _ey = y; _eAddress = Address; _eTitle = Name; _eTel = Telephone;
}
//插入地图html
function fnGetMapHtml() {
    if (_ex == 0) { _ex = vM.CenterX(); }
    if (_ey == 0) { _ey = vM.CenterY(); }
    var _sHtml = '';
    if ($("#rbtBus").attr("checked") != true) {//地点
        _sHtml = '<iframe frameborder="0" width="450px" height="380px" src="' + murl + '?city=' + window.GlobalConfig.CityCode + '&x=' + _ex + '&y=' + _ey + '&t=' + encodeURIComponent(_eTitle) + '" style=" padding:0px;"></iframe></br>';
        if (_eTitle != '') {
            _sHtml = '标题：' + _eTitle + '</br>' + '地址：' + _eAddress + '</br>' + '电话：' + _eTel + '</br>' + _sHtml;
        }
    } else { //公交
        _sHtml = '<iframe frameborder="0" width="450px" height="380px" src="' + murl + '?city=' + window.GlobalConfig.CityCode + '&x=' + _ex + '&y=' + _ey + '&b1=' + encodeURIComponent(startName) + '&b2=' + encodeURIComponent(endName) + '&index=' + _busIndex + '" style=" padding:0px;"></iframe></br>';
        if ($("#ckbLine").attr("checked") == true) {
            _sHtml = "从<b>" + startName + "</b>到<b>" + endName + "</b>" + _busContent + "</br>" + _sHtml;
        }
    }
    parent.fnPasteHTML(_sHtml);
}
//切换城市
function fnSwichCity() {
    $('#div_swichcity').toggle();
}
function fnSwichSearch() {
    if ($("#rbtAddress").attr("checked") == true) {
        $("#spanTo").hide();
        $("#txtEndAddress").hide();
        $("#txtQuery").removeClass("tobus");
        $("#ckbLine").attr("disabled", true);
    } else {
        $("#spanTo").show();
        $("#txtEndAddress").show();
        $("#txtQuery").addClass("tobus");
        $("#ckbLine").attr("disabled", false);
    }
}
