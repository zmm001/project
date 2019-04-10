var _CurrentLableData = [];
window.onload=fnOnload;
function fnOnload()
{
    if (!window.Config)
    {
        setTimeout('fnOnload()', 200);
        return;
    }   
    $('SalesVoucherNews').innerHTML = window.Config.Loading;
    LoadBigType($('BigTradeType'), 1);
    setTimeout(function(){LoadBigType($('BigZoneType'), 2);},1);
    LoadSalseVoucherNews();
    BindCheckBoxEvent('TradeType','ZoneType');
    $('TabContent').style.height = fnGetWindowHeight()+'px';  //初始化高度
}
function BindCheckBoxEvent(sTradeName,sZoneName)
{
    var oTradeCheckboxes = document.getElementsByName(sTradeName);
    var oZoneCheckboxes = document.getElementsByName(sZoneName);
    var OnTradeClick = function()
    {
        CancelAllCheckAndSelect(sTradeName, this, $('BigTradeType'), $('SmallTradeType'));
        var sTrade = GetTypeValue(sTradeName, $('BigTradeType'), $('SmallTradeType'));        
        var sZone = GetTypeValue(sZoneName, $('BigZoneType'), $('SmallZoneType'));
        var CurrentTradeID = GetTypeID(sTradeName, $('BigTradeType'), $('SmallTradeType')); 
        var CurrentZoneID = GetTypeID(sZoneName, $('BigZoneType'), $('SmallZoneType'));     
          
        if(typeof parent.__TradeLabelData[0] != 'undefined')
        {
            if(CurrentTradeID!='')
            {
                ShowLabelLogic(sTrade, sZone, parent.__TradeLabelData, 'Trade' ,CurrentTradeID, CurrentZoneID);
            }
            else if(CurrentTradeID == '' && CurrentZoneID != '')
            {
                ShowLabelLogic(sTrade, sZone, parent.__ZoneLabelData, 'Zone' ,CurrentZoneID, '');
            }
            else
            {
                parent.onSearchEStoreLoadComplete(null, 0, 0);
            }
        }
        else
        {  
            AppendLabelData(sTrade, sZone, parent.__TradeLabelData, CurrentTradeID, CurrentZoneID);
        }
    };    
    var OnZoneClick = function()
    {   
        CancelAllCheckAndSelect(sZoneName, this, $('BigZoneType'), $('SmallZoneType'));  
        var sTrade = GetTypeValue(sTradeName, $('BigTradeType'), $('SmallTradeType'));
        var sZone = GetTypeValue(sZoneName, $('BigZoneType'), $('SmallZoneType'));
        var CurrentTradeID = GetTypeID(sTradeName, $('BigTradeType'), $('SmallTradeType'));
        var CurrentZoneID = GetTypeID(sZoneName, $('BigZoneType'), $('SmallZoneType')); 
                   
        if(typeof parent.__ZoneLabelData[0] != 'undefined')
        {
            if(CurrentZoneID != '')
            {
                ShowLabelLogic(sTrade, sZone, parent.__ZoneLabelData, 'Zone', CurrentZoneID, CurrentTradeID);
            }
            else if(CurrentZoneID== '' && CurrentTradeID != '')
            {
                 ShowLabelLogic(sTrade, sZone, parent.__TradeLabelData, 'Trade', CurrentTradeID, '');               
            }
            else
            {
                parent.onSearchEStoreLoadComplete(null, 0, 0);
            }
        }
        else
        { 
            AppendLabelData(sTrade, sZone, parent.__ZoneLabelData, CurrentZoneID, CurrentTradeID);
        }
    };
    for(var i=0; i<oTradeCheckboxes.length; i++)
    {
        oTradeCheckboxes[i].onclick = OnTradeClick;
    }
    for(var i=0; i<oZoneCheckboxes.length; i++)
    {
        oZoneCheckboxes[i].onclick = OnZoneClick;
    }
    $('btnShowTrade').onclick = OnTradeClick;
    $('btnShowZone').onclick = OnZoneClick;
}

//显示E店标签逻辑
function ShowLabelLogic(sTrade, sZone, parentLabelData, sMapLayerName ,CurrentShowTypeID, CurrentOtherTypeID)
{   
    if(CurrentShowTypeID == '' && CurrentOtherTypeID == '')
    {
        parent.onSearchEStoreLoadComplete(null, 0, 0);
        return;
    }
    var isMoveTo = false;
    var isCurrentDataInHistory = false;

    for(var i=0; i<parentLabelData.length; i++)
    {
        if(typeof parentLabelData[i] != 'undefined' && parentLabelData[i].id == CurrentShowTypeID+'_'+CurrentOtherTypeID)
        {
            isCurrentDataInHistory = true;
            if(CurrentOtherTypeID != '')
            {
                _CurrentLableData = [];
                for(var j=0; j<parentLabelData[i].data.length; j++)
                {                      
                    if(sMapLayerName == 'Trade')
                    {                        
                        if(parentLabelData[i].data[j].SmallTradeTypeID == CurrentShowTypeID && parentLabelData[i].data[j].SmallZoneTypeID == CurrentOtherTypeID)
                        {
                            if(!isMoveTo)
                            {
                                parent.vM.MoveTo(parentLabelData[i].data[j].X, parentLabelData[i].data[j].Y, true);
                                isMoveTo = true;
                            }
                            _CurrentLableData.push(parentLabelData[i].data[j]);
                        }
                    }
                    else
                    {
                        if(parentLabelData[i].data[j].SmallZoneTypeID == CurrentShowTypeID && parentLabelData[i].data[j].SmallTradeTypeID == CurrentOtherTypeID)
                        {
                            if(!isMoveTo)
                            {
                                parent.vM.MoveTo(parentLabelData[i].data[j].X, parentLabelData[i].data[j].Y, true);
                                isMoveTo = true;
                            }                            
                            _CurrentLableData.push(parentLabelData[i].data[j]);
                        }                        
                    }                    
                }
                parent.vM.FlatZoom(3);
                parent.onSearchEStoreLoadComplete(_CurrentLableData, 0, _CurrentLableData.length);
            }
            else
            {                   
                _CurrentLableData = [];
                for(var j=0; j<parentLabelData[i].data.length; j++)
                { 

                    if(sMapLayerName == 'Trade')
                    {
                        if(parentLabelData[i].data[j].SmallTradeTypeID == CurrentShowTypeID)
                        {                            
                            if(!isMoveTo)
                            {
                                parent.vM.MoveTo(parentLabelData[i].data[j].X, parentLabelData[i].data[j].Y, true);
                                isMoveTo = true;
                            } 
                            _CurrentLableData.push(parentLabelData[i].data[j]);
                        }
                    }
                    else
                    {
                        if(parentLabelData[i].data[j].SmallZoneTypeID == CurrentShowTypeID)
                        {                            
                            if(!isMoveTo)
                            {
                                parent.vM.MoveTo(parentLabelData[i].data[j].X, parentLabelData[i].data[j].Y, true);
                                isMoveTo = true;
                            } 
                            _CurrentLableData.push(parentLabelData[i].data[j]);
                        }
                    }
                }
                parent.vM.FlatZoom(3);
                parent.onSearchEStoreLoadComplete(_CurrentLableData, 0, _CurrentLableData.length);
            }
            break;
        }
    }
    if(!isCurrentDataInHistory)
    { 
        AppendLabelData(sTrade, sZone, parentLabelData, CurrentShowTypeID, CurrentOtherTypeID);
    } 
}
//下载E店标签数据
function AppendLabelData(sTrade, sZone, parentLabelData, CurrentShowTypeID, CurrentOtherTypeID)
{   
    if(sTrade == '' && sZone == '')
    {
        return;
    }
    var sUrl = window.Config.EDataCenterUrl+'CommMap5.0/MapShopSearch.aspx?req=2&domain='+window.Config.Domain+'&l='+window.Config.Language+'&name='+escape(sTrade).trim()+'&address='+escape(sZone);
    ENetwork.DownloadScript(sUrl,function(){
        if(typeof MapShopSearch != 'undefined')
        {
            _CurrentLableData = MapShopSearch.SearchTable;            
            var CuurentData = {};
            CuurentData.id = CurrentShowTypeID + '_' + CurrentOtherTypeID;
            CuurentData.data = [];            
            for(var i=0; i<MapShopSearch.SearchTable.length; i++)
            {
                if(i==0)
                {
                    parent.vM.MoveTo(MapShopSearch.SearchTable[i].X, MapShopSearch.SearchTable[i].Y, true);
                }
                CuurentData.data.push(MapShopSearch.SearchTable[i]);           
            }
            parentLabelData.push(CuurentData);
            parent.vM.FlatZoom(3);            
            parent.onSearchEStoreLoadComplete(_CurrentLableData,0,_CurrentLableData.length);
        }            
    });
}

function CancelAllCheckAndSelect(sName, oThis, oBigSelect, oSmallSelect)
{
    CancelCheckAllBoxes(sName, oThis);
    if(GetCheckboxesValue(sName) != '')
    {
        oBigSelect.selectedIndex = 0;
        oSmallSelect.selectedIndex = 0;
    }
}

function CancelCheckAllBoxes(sName, oThis)
{
    var oCheckboxes = document.getElementsByName(sName);        
    for(var i=0; i<oCheckboxes.length; i++)
    {
        if(oThis.value != oCheckboxes[i].value)
        {
            oCheckboxes[i].checked = false;
        }
    }
}
function GetTypeID(sCheckBoxName, oBigSelect, oSmallSelect)
{
    var typeId = GetCheckboxesValue(sCheckBoxName);
    if(typeId == '')
    {
        if(oSmallSelect.value == '-1')
        {
            typeId = oBigSelect.value;
            if(typeId == '-1')
            {
                typeId = '';
            }
        }
        else
        {
            typeId = oSmallSelect.value;
        }
    }    
    return typeId;
}
function GetTypeValue(sCheckBoxName, oBigSelect, oSmallSelect)
{
    var typeName = GetCheckboxesText(sCheckBoxName);
    var BigSelectText = '', SmallSelectText = '';
    if(oBigSelect.id == 'BigTradeType')
    {
        BigSelectText = "E店大类";
        SmallSelectText = "E店小类";
    }
    else
    {
        BigSelectText = "地域大类";
        SmallSelectText = "地域小类";
    }
    if(typeName == '')
    {
        if(oSmallSelect.options[oSmallSelect.selectedIndex].text == SmallSelectText)
        {
            typeName = oBigSelect.options[oBigSelect.selectedIndex].text;
            if(typeName == BigSelectText)
            {
                typeName = '';
            }
        }
        else
        {
            typeName = oSmallSelect.options[oSmallSelect.selectedIndex].text;
        }
    }
    return typeName;
}

function GetCheckboxesValue(sName)
{
    var sReturn = '';
    var oCheckboxes = document.getElementsByName(sName);        
    for(var i=0; i<oCheckboxes.length; i++)
    {
        if(oCheckboxes[i].checked)
        {
            return oCheckboxes[i].value;
        }
    }
    return sReturn;
}
function GetCheckboxesText(sName)
{
    var sReturn = '';
    var oCheckboxes = document.getElementsByName(sName);        
    for(var i=0; i<oCheckboxes.length; i++)
    {
        if(oCheckboxes[i].checked)
        {
            return oCheckboxes[i].nextSibling.nodeValue;
        }
    }
    return sReturn;
}
function LoadSalseVoucherNews()
{
    var sUrl = window.Config.EDataCenterUrl+'CommMap5.0/BusinessInfo.aspx?req=1&topcount=3&domain='+window.Config.Domain+'&l='+window.Config.Language;
    ENetwork.DownloadScript(sUrl,function(){
        if(typeof BusinessInfo != 'undefined')
        {
            var sHtml = '<ul>';
            for(var i=0; i<BusinessInfo.Voucher.length; i++)
            {
                sHtml += '<li><a target="_blank" href="'+window.Config.DianUrl+'VipStore/'+BusinessInfo.Voucher[i].LST_ID+'/VoucherView.aspx?id='+BusinessInfo.Voucher[i].LV_ID+'&StoreID='+BusinessInfo.Voucher[i].MCI_ID+'">'+BusinessInfo.Voucher[i].LV_ShowTitle+'</a></li>';
            }
            for(var i=0; i<BusinessInfo.Topic.length; i++)
            {
                sHtml += '<li><a target="_blank" href="'+window.Config.DianUrl+'VipStore/'+BusinessInfo.Topic[i].LST_ID+'/EShopNewsView.aspx?StoreID='+BusinessInfo.Topic[i].MCI_ID+'&newsid='+BusinessInfo.Topic[i].LT_ID+'">'+BusinessInfo.Topic[i].LT_Title+'</a></li>';
            }       
            sHtml += '</ul>';
            $('SalesVoucherNews').innerHTML = sHtml;
        }     
    });
}
function LoadBigType(oSelect, type)
{
    var sBigTypeUrl = window.Config.EDataCenterUrl+'CommMap5.0/ShopType.aspx?req='+type+'&domain='+window.Config.Domain+'&l='+window.Config.Language+'&paraneid=0';
    ENetwork.DownloadScript(sBigTypeUrl,function(){
        if(typeof ShopType != 'undefined')
        {
            var oType;
            if(type == 1)
            {
                oType = ShopType.TradeType;
            }
            else
            {
                oType = ShopType.ZoneType;
            } 
            for(var i=0; i<oType.length; i++)
            {
                oSelect.options.add(new Option(oType[i].TypeName,oType[i].TypeID));
            } 
        }
    });
}
function LoadSmallType(oSelect, type, parentId)
{
    oSelect.options.length = 1;
    if(parentId == -1)
    {
        return;
    }        
    var sSmallTypeUrl = window.Config.EDataCenterUrl+'CommMap5.0/ShopType.aspx?req='+type+'&domain='+window.Config.Domain+'&l='+window.Config.Language+'&paraneid='+parentId; //req=3返回大类的所有小类
    ENetwork.DownloadScript(sSmallTypeUrl,function(){
        if(typeof ShopType != 'undefined')
        {
            var oType;
            if(type == 1)
            {
                oType = ShopType.TradeType;
            }
            else
            {
                oType = ShopType.ZoneType;
            }             
            for(var i=0; i<oType.length; i++)
            {
                oSelect.options.add(new Option(oType[i].TypeName,oType[i].TypeID));
            }
        }
    });
}
function Expanding(id1, id2)
{
    if($(id1).className == 'ActiveInfo')
    {
        $(id1).className = 'NormalInfo';
        $(id2).style.display = 'none';
    }
    else
    {
        $(id1).className = 'ActiveInfo';
        $(id2).style.display = 'block';        
    }
}

function fnExit()
{
    parent.onSearchEStoreLoadComplete(null,0,0);
}