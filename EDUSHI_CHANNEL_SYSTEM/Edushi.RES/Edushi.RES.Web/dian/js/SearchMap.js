//优惠券
if ($("#pnlCouponPic li").size() > 3) {
    $("#CouponLink a").eq(1).show();
}
if ($("#pnlCouponPic li").size() > 6) {
    $("#CouponLink a").eq(2).show();
}
$("#CouponLink a").mouseover(function () {
    $("#CouponLink a").removeClass("on");
    $(this).addClass("on");
    $("#pnlCouponPic").stop().animate({ "marginLeft": -parseInt($(this).attr("n")) * 228 + "px" }, 500);
})
//地图屏幕滚动
$("#mapRoll").attr("checked",! $.cookies.get("movemap") == 1).click(function () {
    $.cookies.set("movemap", $("#mapRoll").is(":checked") ? 0 :1, { domain: 'edushi.com', expiresAt: new Date(2020, 1, 1) });
});

fixT();
function fixT() {
    var elm = document.getElementById('rightBox');
    if (!elm) return;
    var fmt = $(elm).position().top;
    var mapRoll = document.getElementById('mapRoll');
    if (!$.browser.msie || ($.browser.msie && $.browser.version > 6)) {
        fixT_firefox();
    } else {
        fixT_aa();
    }
    //跟随页面滚动事件，针对Firefox,Chrome等现代浏览器
    function fixT_firefox() {
        if (!$.browser.msie || ($.browser.msie && $.browser.version > 6)) {
            $(window).scroll(function () {
                if ($(window).scrollTop() > fmt && mapRoll.checked) {
                    elm.style.position = 'fixed';
                    elm.style.top = '0px';
                    if ($('body').height() - ($(window).scrollTop() + $('#rightBox').height()) < ($('#footer').outerHeight(true)) && mapRoll.checked) {
                        elm.style.position = 'absolute';
                        elm.style.top = $('body').height() - ($('#rightBox').height() + $('#footer').outerHeight(true)) + 'px';
                    }
                }
                else {
                    elm.style.position = '';
                    //                    elm.style.position = 'absolute';
                    //                    elm.style.top = fmt + 'px';
                }
            });
        }
    }
    //跟随页面滚动事件，针对IE6
    function fixT_aa() {
        if (!$.browser.msie || ($.browser.msie && $.browser.version > 6)) return;
        $(window).scroll(function () {
            if ($(window).scrollTop() > fmt && mapRoll.checked) {
                elm.style.position = 'absolute';
                elm.style.top = $(window).scrollTop() + 'px';
                if ($('body').height() - ($(window).scrollTop() + $('#divNav').height()) < ($('#footer').outerHeight(true)) && mapRoll.checked) {
                    elm.style.top = $('body').height() - ($('#divNav').height() + $('#footer').outerHeight(true)) + 'px';
                }
            }
            else {
                elm.style.position = '';
                elm.style.top = fmt + 'px';
            }
        });
    }
}
//----------------------------------
var _ShopCenterLayer;           //商埔中心
var _ShopPerimeterLayer;        //商埔周遍地图

$.ajax({
    url: mapurl, cache: true,
    dataType: 'script',
    success: function () {
        OnBodyLoad();
        $(".shopitem").each(function (i) {
            $(this).mouseover(function () {
                var x = $(this).attr("x");
                var y = $(this).attr("y");
                var name = $(this).attr("name");
                vEdushiMap.MoveTo(x, y, true);
                appendShopCenter(_DianUrl + "images/left3.png", name, x, y);
                $(".shopitem").css("background", "");
                $(this).css("background", "#f1f1f1");
            })
            if (i == 0) {
                var x = $(this).attr("x");
                var y = $(this).attr("y");
                var name = $(this).attr("name");
                $(this).css("background", "#f1f1f1");
                vEdushiMap.MoveTo(x, y, true);
                appendShopCenter(_DianUrl + "images/left3.png", name, x, y);
            }
        })

    }
})

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
    vEdushiMap.FlatZoom(3);

    
}
function appendShopCenter(iconPath,shopName, x, y) {
    _ShopCenterLayer.innerHTML = '';
    var divShopCenter = vEdushiMap.$C('div');
    divShopCenter.id = '_ShopCenter';
    var sDiv = '<div><div><div style="float:left;min-width:100px;width:auto;_width:100px;_white-space:nowrap;background-image:url(http://res.edushi.com/dian/shop/images/eshop_mark_bg.gif);border-left:solid 1px #ffae69; border-right:solid 1px #ffae69;font-size:12px; color:#FFFFFF; text-align:center; padding:4px 4px 0px 4px;">' + shopName + '</div><div style="clear:both;margin-left:50px;width:12px; height:14px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'http://res.edushi.com/dian/shop/images/eshop_mark_bottom.png\',sizingMethod=\'image\'); margin-top:-1px; background-repeat:no-repeat;"><!--[if !IE]><!--><img height="12px" width="15" src="http://res.edushi.com/dian/shop/images/eshop_mark_bottom.png"/><!--<![endif]--></div></div></div>'; //'<div class=\"header\"><div style=\"height:19px;width:10px; padding-top:2px; padding-left:5px; padding-right:5px; white-space:nowrap;border:1px #FC9A1E solid;background-color:#ffffff;color:#1A70C7; font-size:12px;\">' + shopName + '</div><div style=\"float:left; margin-left:10px; font-size:10px; width:13px; height:10px;background-repeat: no-repeat; text-align:center;  position:relative; margin-top:-1px;background:none;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=scale, src=\'' + iconPath + '\');\" ></div></div>';
    divShopCenter.innerHTML = sDiv;
    vEdushiMap.AppendEntity(divShopCenter, _ShopCenterLayer, false, x, y, 233, 50, 57, 33, false);
}