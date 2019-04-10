var _ShopCenterLayer;           //商埔中心
var _ShopPerimeterLayer;        //商埔周遍地图
function OnBodyLoad() {
    //加载对象
    if (typeof vEdushiMap == 'undefined' || typeof vEdushiMap.NewMapLayer != 'function')
    {
        setTimeout("OnBodyLoad()",200);
        return;
    }
    vEdushiMap.ViewPlots(false);
    
    _ShopCenterLayer = vEdushiMap.NewMapLayer("_ShopCenterLayer",310,0);
    _ShopPerimeterLayer = vEdushiMap.NewMapLayer("_ShopPerimeterLayer",300,0);

    vEdushiMap.Body.flgContextMenu = false;

    
    
    if(typeof _ShopMapList != 'undefined')
    {

        appendShopPerimeter(_DianUrl + "images/left3.png", _ShopMapList);
    }
    if(typeof _StoreCenterY != 'undefined') 
    { 
        vEdushiMap.MoveTo(_StoreCenterX*1, _StoreCenterY*1, true);
        appendShopCenter(_DianUrl + "images/left3.png", _StoreName, _StoreCenterX, _StoreCenterY);
    }
    vEdushiMap.FlatZoom(3);
}

function SelectPerimeter(x,y)
{
    if(typeof vEdushiMap=='undefined'||typeof vEdushiMap.Body.NewMapLayer !='function')
    {
        setTimeout("SelectPerimeter()",200);
        return;
    }
    vEdushiMap.MoveTo(x*1+150, y*1, true);
}
 
function SelectMultipleStore(x,y,name,url)
{
    if(typeof vEdushiMap=='undefined'||typeof vEdushiMap.Body.NewMapLayer !='function')
    {
        setTimeout("SelectPerimeter()",200);
        return;
    }
    AppendMultipleStore(_DianUrl + "images/left3.png", name, x, y, url);  
    vEdushiMap.MoveTo(x*1+150, y*1, true);  
}
function SelectShop()
{
    if(typeof vEdushiMap=='undefined'||typeof vEdushiMap.Body.NewMapLayer !='function')
    {
        setTimeout("SelectShop()",200);
        return;
    }
    if(typeof _ShopMapCenterX != 'undefined')
    {
        vEdushiMap.MoveTo(_ShopMapCenterX*1+150, _ShopMapCenterY*1, true);
    }
}

function appendShopPerimeter(iconPath, shopPerimeterList)
{
    var shopName = '';
    for (var i=0; i<shopPerimeterList.length; i++)
    {
        var showNearShop = vEdushiMap.$C('div');
        showNearShop.id = '_NearByShop_'+shopPerimeterList[i].ShopMapID;
        var sDiv = '';

        shopName = shopPerimeterList[i].MapTitle;

        sDiv = '<div><div style="float:left;min-width:100px;width:auto;_width:100px;_white-space:nowrap;border:1px solid #75b6fd; background-color:#f6fafd;"><span style="color:#1562ef; font-size:12px; padding:4px 4px 0px 4px;display:block; text-align:center;">' + shopName + '</span></div><div style="clear:both;margin-left:50px;width:14px; height:15px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + _DianUrl  +'images/side_shop.png\',sizingMethod=\'image\');margin-top:-1px;background-repeat:no-repeat;"><!--[if !IE]><!--><img height="14px" width="15" src="' + _DianUrl +'images/side_shop.png"/><!--<![endif]--></div></div>'; //'<div class=\"header\"><div style=\"height:19px;width:10px; padding-top:2px; padding-left:5px; padding-right:5px; white-space:nowrap;border:1px #FC9A1E solid;background-color:#ffffff;color:#1A70C7; font-size:12px;\">' + shopName + '</div><div style=\"float:left; margin-left:10px; font-size:10px; width:13px; height:10px;background-repeat: no-repeat; text-align:center;  position:relative; margin-top:-1px;background:none;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=scale, src=\'' + iconPath + '\');\" ></div></div>';

        showNearShop.innerHTML = sDiv;
        vEdushiMap.AppendEntity(showNearShop, _ShopPerimeterLayer, false, shopPerimeterList[i].X, shopPerimeterList[i].Y, 233, 50, 57, 33, false);
    }
}
function appendShopCenter(iconPath,shopName, x, y)
{  
    var divShopCenter = vEdushiMap.$C('div');
    divShopCenter.id = '_ShopCenter';
    var sDiv = '<div><div><div style="float:left;min-width:100px;width:auto;_width:100px;_white-space:nowrap;background-image:url(http://res.edushi.com/dian/shop/images/eshop_mark_bg.gif);border-left:solid 1px #ffae69; border-right:solid 1px #ffae69;font-size:12px; color:#FFFFFF; text-align:center; padding:4px 4px 0px 4px;">' + shopName + '</div><div style="clear:both;margin-left:50px;width:12px; height:14px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'http://res.edushi.com/dian/shop/images/eshop_mark_bottom.png\',sizingMethod=\'image\'); margin-top:-1px; background-repeat:no-repeat;"><!--[if !IE]><!--><img height="12px" width="15" src="http://res.edushi.com/dian/shop/images/eshop_mark_bottom.png"/><!--<![endif]--></div></div></div>'; //'<div class=\"header\"><div style=\"height:19px;width:10px; padding-top:2px; padding-left:5px; padding-right:5px; white-space:nowrap;border:1px #FC9A1E solid;background-color:#ffffff;color:#1A70C7; font-size:12px;\">' + shopName + '</div><div style=\"float:left; margin-left:10px; font-size:10px; width:13px; height:10px;background-repeat: no-repeat; text-align:center;  position:relative; margin-top:-1px;background:none;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=scale, src=\'' + iconPath + '\');\" ></div></div>';
    divShopCenter.innerHTML = sDiv;
    vEdushiMap.AppendEntity(divShopCenter, _ShopCenterLayer, false, x, y, 233, 50, 57, 33, false);
}
function AppendMultipleStore(iconPath,shopName, x, y, url)
{  
    var divShopCenter = vEdushiMap.$C('div');
    divShopCenter.id = '_ShopCenter';
    var sDiv = '<div><div style="float:left;min-width:100px;width:auto;_width:100px;_white-space:nowrap; background-color:#FFFFFF; border:1px solid #ed6d00;"><span style="color:#FF0000; font-size:12px; padding:4px 4px 0px 4px;display:block; text-align:center;"><a title="去该连锁E店" target="_blank" href="' + url + '" style="color:red;text-decoration:none">' + shopName + '</a></span></div><div style="clear:both;margin-left:50px;width:14px; height:14px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + _DianUrl  +'images/eshop_mark_other.png\',sizingMethod=\'image\'); margin-top:-1px; background-repeat:no-repeat;"><!--[if !IE]><!--><img height="14px" width="15" src="' + _DianUrl  +'images/eshop_mark_other.png"/><!--<![endif]--></div></div>'; //'<div class=\"header\"><div style=\"height:19px;width:10px; padding-top:2px; padding-left:5px; padding-right:5px; white-space:nowrap;border:1px #FC9A1E solid;background-color:#ffffff;color:#1A70C7; font-size:12px;\"><a target="_blank" href="'+url+'">' + shopName + '</a></div><div style=\"float:left; margin-left:10px; font-size:10px; width:13px; height:10px;background-repeat: no-repeat; text-align:center;  position:relative; margin-top:-1px;background:none;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=scale, src=\'' + iconPath + '\');\" ></div></div>';
    divShopCenter.innerHTML = sDiv;
    vEdushiMap.AppendEntity(divShopCenter, _ShopCenterLayer, false, x, y, 233, 50, 57, 33, false);
}