_Page=1;
_Count=0;
_PageSize=4;
_PageCount=1;
var _PrevElement = null;   //保存上次点击的div
var _Property='';
var _SearchData = {};
var _Begin;
var _End;
var _Address = unescape(fnRequest('address'));
var _Key = unescape(fnRequest('name'));
window.onload=fnOnload;
function fnOnload()
{
    if (!window.Config)
    {
        setTimeout('fnOnload()', 200);
        return;
    }
    $('ulRecordList').innerHTML=window.Config.Loading;
    $('Keyword').innerHTML = '在'+unescape(fnRequest('address'))+'找'+unescape(fnRequest('name'));
    var sAddress = fnRequest('address');
    var sName = fnRequest('name');
    
    var sSearchUrl = window.Config.EDataCenterUrl+'CommMap5.0/MapShopSearch.aspx?req=1&domain='+window.Config.Domain+'&l='+window.Config.Language+'&name='+sName+'&address='+sAddress+'&pagenum=1&pagesize=100';    
    ENetwork.DownloadScript(sSearchUrl,function(){fnShowResult();});  
    var sFilterUrl = window.Config.EDataCenterUrl+'CommMap5.0/ShopType.aspx?req=4&type='+fnRequest('name')+'&domain='+window.Config.Domain+'&l='+window.Config.Language;
    ENetwork.DownloadScript(sFilterUrl,function(){
        if(typeof ShopType !='undefined' && ShopType.TradeProperty.length >0)
        {
            var sFilterHtml = '高级筛选：';
            var sProperty = _Property;
            for(var i=0; i< ShopType.TradeProperty.length; i++)
            {
                if(sProperty.indexOf(ShopType.TradeProperty[i].Property)>-1)
                {
                    sFilterHtml+='<input checked="true" name="chkFilter" value="'+ShopType.TradeProperty[i].Property+'" type="checkbox" />'+ShopType.TradeProperty[i].Property;
                }
                else
                {
                    sFilterHtml+='<input name="chkFilter" value="'+ShopType.TradeProperty[i].Property+'" type="checkbox" />'+ShopType.TradeProperty[i].Property;
                }
            }
            sFilterHtml += '<input type="image" onclick="doFilter()" src="'+window.Config.SkinPath+'images/SrFilBtn.gif" alt="确定" />'; 
            $('Filter').innerHTML = sFilterHtml;            
        }
        else
        {
            $('Filter').style.display = 'none';
        }
    });
    DownloadSalesAndVoucher();
    $('TabContent').style.height = fnGetWindowHeight()-10+'px';  //初始化高度 
}

function reLoadPageSize()
{
    _PageSize = Math.floor((fnGetWindowHeight()-30)/80);
    if(_PageSize < 4)
    {
        _PageSize = 4;
    }
}
function doFilter()
{
    var sProperty = GetCheckboxesValue('chkFilter');
    if(sProperty.trim().length < 1)
    {
        return;
    }    
    _Property = sProperty;
    document.body.innerHTML=window.Config.Loading;
    var sSearchUrl = window.Config.EDataCenterUrl+'CommMap5.0/MapShopSearch.aspx?req=1&domain='+window.Config.Domain+'&l='+window.Config.Language+'&name='+fnRequest('name')+'&address='+fnRequest('address')+'&property='+escape(sProperty)+'&pagenum=1&pagesize=100';
    ENetwork.DownloadScript(sSearchUrl,function(){fnShowResult();}); 
}

function GetCheckboxesValue(sName)
{
    var sReturn = '';
    var oCheckboxes = document.getElementsByName(sName);        
    for(var i=0; i<oCheckboxes.length; i++)
    {
        if(oCheckboxes[i].checked)
        {
            sReturn += oCheckboxes[i].value + ' ';
        }
    }
    return sReturn;
}

function fnShowLabel(oThis)
{
    parent.vM.FlatZoom(3);
    parent._LabelLayer.style.display = '';
    parent.onSearchEStoreLoadComplete(_SearchData.SearchTable,0,_SearchData.SearchTable.length);
}
function fnShowResult()
{
    if(typeof MapShopSearch == 'undefined')
    {
        MapShopSearch = [];
        MapShopSearch.SearchTable = {};
    }
    _SearchData = MapShopSearch;                  
    var recordHtml = '<li><div class="Number"><span>{$No}</span></div><div class="DetailCon"><div class="TitleNav"><span class="HeadLine" style="cursor:pointer" onclick="if(_PrevElement != null){_PrevElement.className=\'Number\';};this.parentNode.parentNode.previousSibling.className=\'Number Currently\';_PrevElement=this.parentNode.parentNode.previousSibling;parent.fnShowEShopPop({$CompanyID},{$X},{$Y})">{$title}</span><span class="IsVipIco">{$VipIcon}{$YingIcon}{$JuanIcon}&nbsp;{$CuIcon}</span></div><div class="Phone">电&nbsp;&nbsp;话：{$Tel}</div><div class="Address">地&nbsp;&nbsp;址：{$Address}</div><div class="Eaddress">E店址：{$EAddress}</div></div><div class="DottedLine"></div></li>';
    
    var strRecordTemp='';
    if(MapShopSearch.SearchTable.length > 0){
        _Count = MapShopSearch.SearchTable.length;
        if(_Count%(_PageSize)==0){
            _PageCount=_Count/(_PageSize);
        }else{
            _PageCount=int(_Count,(_PageSize))+1;
        }
        var intBegin  = (_Page-1)*(_PageSize);
        var intEnd    = _Page*(_PageSize);
        if(intEnd>_Count){
            intEnd=_Count;
        }
        _Begin = intBegin;
        _End = intEnd;
        for(i=intBegin;i<intEnd;i++){
            var sTitle = MapShopSearch.SearchTable[i].CompanyName.replaceAll(_Key,'<span style="color:#ff6400;">'+_Key+'</span>');
            var sAddress = MapShopSearch.SearchTable[i].Address.replaceAll(_Address,'<span style="color:#ff6400;">'+_Address+'</span>');
            //杭州添加E店链接及图标
            var sUrl='',sVipIcon='';            
            if(MapShopSearch.SearchTable[i].LST_ID*1 > 0)
            {
                if(MapShopSearch.SearchTable[i].Domain != '')
                {
                    sUrl = 'http://'+ MapShopSearch.SearchTable[i].Domain + '.' + window.Config.Domain;
                }
                else
                {
                    sUrl = window.Config.DianUrl + 'VipStore/' + MapShopSearch.SearchTable[i].LST_ID + '/Index.aspx?StoreID=' + MapShopSearch.SearchTable[i].CompanyID;
                }            
            }
            else
            {
                sUrl= window.Config.HuangyeUrl + 'ShopView.aspx?id='+ MapShopSearch.SearchTable[i].CompanyID;
            }
            if (MapShopSearch.SearchTable[i].VIP*1 > 1)
            {
                sVipIcon = '<a href="'+sUrl+'" target="_blank"><img src="'+window.Config.SkinPath+'Images/VipEdian.gif" alt="Vip E店" /></a>';
            }
            else if(MapShopSearch.SearchTable[i].VIP*1 > 0)
            {
                sVipIcon = '<a href="'+sUrl+'" target="_blank"><img src="'+window.Config.SkinPath+'Images/Edian.gif" alt="E店" /></a>';               
            }
            var sJuanIcon='';
            if(MapShopSearch.SearchTable[i].LV_ID*1 > 0)
            {
                sJuanIcon = '<img src="'+window.Config.SkinPath+'images/Juan.gif" alt="免费下载本店优惠券" />';
            }
            var sCuIcon = '';
            if(MapShopSearch.SearchTable[i].LT_ID*1 > 0)
            {
                sCuIcon = '<img src="'+window.Config.SkinPath+'images/Cu.gif"alt="本店正在促销打折" />';
            }
            var sYingIcon = '';
            if(MapShopSearch.SearchTable[i].LCE_ShopCard*1 > 0)
            {
                sYingIcon = '<img src="'+window.Config.SkinPath+'images/Ying.gif" alt="本店已通过营业执照认证" />';
            }                       
            
            strRecordTemp +=recordHtml.replaceAll('{$Title}',sTitle).replace('{$CompanyID}',MapShopSearch.SearchTable[i].CompanyID).replace('{$No}', (i+1)).replace('{$X}', MapShopSearch.SearchTable[i].X).replace('{$Y}', MapShopSearch.SearchTable[i].Y).replace('{$VipIcon}', sVipIcon).replace('{$JuanIcon}', sJuanIcon).replace('{$CuIcon}', sCuIcon).replace('{$YingIcon}', sYingIcon).replace('{$Tel}', MapShopSearch.SearchTable[i].Telephone).replace('{$Address}', sAddress).replace('{$EAddress}', '<a href="'+sUrl+'" target="_blank">'+sUrl+'</a>');
        }
        var strPage=fnPager(6, _Page, _PageSize, _PageCount, 'window.fnShowByPage');
        $('Page').innerHTML = strPage;
    }
    if(strRecordTemp.trim().length < 1)
    {
        strRecordTemp = '暂无您需要的信息，请输入其他关键字或信息进行查询';
    }
    $('ulRecordList').innerHTML = strRecordTemp;
    $('Count').innerHTML = _Count;
    parent.onSearchEStoreLoadComplete(_SearchData.SearchTable,_Begin,_End);  
}
function fnShowByPage(iPage){
    //reLoadPageSize();
    if(iPage){
        _Page=iPage;
    }
    fnShowResult();
}
function ScrollText(boxId)
{
    this.ScrollBox = $(boxId);
    this.ShowHeight = 21;   //文字可视高度
    this.ShowStopTime = 0;
    this.IsStoped = false;
    this.PrevScrollTop = 0;
    this.CurrentScrollTop = 0;
    
    this.ScrollTo = function()
    {
        if(this.IsStoped){
            return;
        }
        this.CurrentScrollTop ++;                
        if(this.CurrentScrollTop == this.ShowHeight) {
            this.ShowStopTime ++; 
            this.CurrentScrollTop --; 
            if(this.ShowStopTime == 250) { 
                this.CurrentScrollTop = 0; 
                this.ShowStopTime = 0; 
            } 
        }else{ 
            this.PrevScrollTop = this.ScrollBox.scrollTop; 
            this.ScrollBox.scrollTop ++; 
            if(this.PrevScrollTop == this.ScrollBox.scrollTop){ 
                this.ScrollBox.scrollTop = 0; 
                this.ScrollBox.scrollTop ++; 
            } 
        } 
    };
    
    //构造
    (function ()
    {
        var oThis = this;
        this.ScrollBox.onmouseover = function()
        {
            oThis.IsStoped = true;
        };
        this.ScrollBox.onmouseout = function()
        {
            oThis.IsStoped = false;
        };
        setInterval(function(){
            oThis.ScrollTo();
        }, 15);                
    }).call(this); 
}
function DownloadSalesAndVoucher()
{
    var sAddrss = fnRequest('address');
    var sName = fnRequest('name');
    var sUrl = window.Config.EDataCenterUrl + 'CommMap5.0/BusinessInfo.aspx?req=2&topcount=5&name='+sName+'&address='+sAddrss+'&domain='+window.Config.Domain+'&l='+window.Config.Language;
    ENetwork.DownloadScript(sUrl, function(){
        if(typeof BusinessInfo != 'undefined' && typeof BusinessInfo.Topic != 'undefined')
        {
            var flag1 = false, flag2=false;
            var iCellCount = 1; //一行1条
            var iRowCount = 0;
            var iRowHeight = 20;
            if(BusinessInfo.Topic.length > 0)
            {
                flag1 = true;
                $('ScrollSales').innerHTML = '<ul><li style="visibility:hidden;"></li></ul>';
                iRowCount = Math.ceil(BusinessInfo.Topic.length / iCellCount);
                var oTopic;
                var iTopicBound = 0;
                var sHtml = '';
                for(var i=0; i<iRowCount; i++)
                {
                    sHtml += '<ul style="margin-top:'+(i+1)*iRowHeight+'px">';
                    for(var j=0; j<iCellCount; j++)
                    {                                
                        oTopic = BusinessInfo.Topic[iTopicBound];
                        if(iTopicBound < BusinessInfo.Topic.length)
                        {
                            iTopicBound++;
                        }
                        else
                        {
                            break;
                        }
                        sHtml += '<li><a target="_blank" href="'+window.Config.DianUrl+'VipStore/'+oTopic.LST_ID+'/EShopNewsView.aspx?StoreID='+oTopic.MCI_ID+'&newsid=' + oTopic.LT_ID + '">'+oTopic.LT_Title.substr(0,16)+'</a><img src="'+window.Config.SkinPath+'images/Cu.gif" alt="本店正在促销打折" /></li>';
                    }
                    sHtml += '</ul>';
                }
                $('ScrollSales').innerHTML += sHtml;
                var ScrollSales = new ScrollText('ScrollSales');//开始滚动
            }
            if(BusinessInfo.Voucher.length > 0)
            {
                flag2 = true;
                $('ScrollVoucher').innerHTML = '<ul><li style="visibility:hidden;"></li></ul>';
                iRowCount = Math.ceil(BusinessInfo.Voucher.length / iCellCount);                        
                var oVoucher;
                var iVoucherBound = 0;
                var sHtml = '';
                for(var i=0; i<iRowCount; i++)
                {
                    sHtml += '<ul style="margin-top:'+(i+1)*iRowHeight+'px">';
                    for(var j=0; j<iCellCount; j++)
                    {                                
                        oVoucher = BusinessInfo.Voucher[iVoucherBound];
                        if(iVoucherBound < BusinessInfo.Voucher.length)
                        {
                            iVoucherBound++;
                        }
                        else
                        {
                            break;
                        }
                        sHtml += '<li><a target="_blank" href="'+window.Config.DianUrl+'VipStore/'+oVoucher.LST_ID+'/VoucherView.aspx?id='+oVoucher.LV_ID+'&StoreID=' + oVoucher.MCI_ID +'">'+oTopic.LT_Title.substr(0,16)+'</a><img src="'+window.Config.SkinPath+'images/Juan.gif" alt="免费下载本店优惠券" /></li>';
                    }
                    sHtml += '</ul>';
                }
                $('ScrollVoucher').innerHTML += sHtml;
                var ScrollVoucher = new ScrollText('ScrollVoucher');//开始滚动
            }
            if(!flag1 && !flag2)
            {                        
                $('ScrollBoxNav').style.display = 'none';
            }
        }
        else
        {
            $('ScrollBoxNav').style.display = 'none';
        }
    })
} 

function fnActive(){
    if(typeof  _SearchData.SearchTable!= 'undefined' && _SearchData.SearchTable.length > 0)
    {
        parent.onSearchEStoreLoadComplete(_SearchData.SearchTable,_Begin,_End);
    }
    else
    {
        parent.onSearchEStoreLoadComplete(null,0,0);
    }
}
function fnExit()
{
    parent.onSearchEStoreLoadComplete(null,0,0);
}
