
function ShowTel(sTel)
{
    if (document.getElementById('divPhone'))
    {
        document.body.removeChild(document.getElementById('divPhone'));
        document.body.removeChild(document.getElementById('divMask'));
    }
            
    var sHtml = '<div class="ClewBlkNav">'+
                    '<h3>电话预订</h3>'+
                    '<img src="images/PhoneCueClose.gif" onclick="RemoveTel()" class="CloseBtn" alt="关闭" />'+
                    '<div class="ClewBlkBg">'+
                        '<div class="L">'+
                            '<img src="images/phoneCue_icon.gif" />'+
                        '</div>'+
                        '<div class="R">'+
                            '<h4>预订电话：<span>'+sTel+'</span></h4>'+
                            '<div class="P">您好，我在E都市看到你们的店铺信息，我想请问…</div>'+
                        '</div>'+
                    '<div class="HackBox"></div></div>'+
                '</div>';
	
    var div = document.createElement('div');
    div.className = 'phoneCue';
    div.innerHTML = sHtml;
    div.id = 'divPhone';
    div.style.zIndex = 9999;
    div.style.position = 'absolute';
    document.body.appendChild(div);
    
    var mask = document.createElement('div');
    mask.id = 'divMask';
    mask.style.width = document.documentElement.scrollWidth + 'px';
    mask.style.height = document.documentElement.scrollHeight + 'px';
    mask.style.backgroundColor = '#000';
    mask.style.filter = 'Alpha(Opacity=55)';
    mask.style.position = 'absolute';
    mask.style.top = 0;
    mask.style.left = 0;
    document.body.appendChild(mask);

    window.onscroll = function() {
        div.style.top = document.documentElement.scrollTop + 280 + 'px';
        div.style.left = document.body.clientWidth / 2 - 280 + 'px';
    };
    window.onscroll();
}

function ShowAboutAlipay()
{
    if (document.getElementById('divPhone'))
    {
        document.body.removeChild(document.getElementById('divPhone'));
        document.body.removeChild(document.getElementById('divMask'));
    }
            
    var sHtml = '<div class="ClewBlkNav">'+
        '<h3>支付宝特约商户</h3>'+
            '<img src="images/PhoneCueClose.gif" onclick="RemoveAlipay()" class="CloseBtn" alt="关闭" />'+
        '<div class="ClewBlkBg">'+
            '<h4>本店支持“支付宝”交易模式</h4>'+
            '<div class="P">'+
                '您挑选好自己需要的产品，进入具体产品页面，点击“立即购买”将产品放入您的购物车，如果您有自己的支付宝账户，就可以轻松享受在线支付的快捷和便利啦！</div>'+
            '<div class="P" style="text-align:right;">'+
                '<a href="http://hangzhou.edushi.com/dian/DianHelp.htm#Cla7" target="_blank" title="了解具体购买流程">'+
                    '了解具体购买流程>></a></div>'+
        '</div>'+
    '</div>';
	
    var div = document.createElement('div');
    //div.className = 'phoneCue';
    div.innerHTML = sHtml;
    div.id = 'divAlipay';
    div.style.zIndex = 9999;
    div.style.position = 'absolute';
    document.body.appendChild(div);
    
    var mask = document.createElement('div');
    mask.id = 'divAlipayMask';
    mask.style.width = document.documentElement.scrollWidth + 'px';
    mask.style.height = document.documentElement.scrollHeight + 'px';
    mask.style.backgroundColor = '#000';
    mask.style.filter = 'Alpha(Opacity=55)';
    mask.style.position = 'absolute';
    mask.style.top = 0;
    mask.style.left = 0;
    document.body.appendChild(mask);

    window.onscroll = function() {
        div.style.top = document.documentElement.scrollTop + 280 + 'px';
        div.style.left = document.body.clientWidth / 2 - 280 + 'px';
    };
    window.onscroll();
}
function RemoveTel()
{
    window.onscroll=null;
    document.body.removeChild(document.getElementById('divPhone'));
    document.body.removeChild(document.getElementById('divMask'));
}
function RemoveAlipay()
{
    window.onscroll=null;
    document.body.removeChild(document.getElementById('divAlipay'));
    document.body.removeChild(document.getElementById('divAlipayMask'));
}
function fnGetWindowWidth(){
    var vh = 0;
    var _dEt = document.documentElement;
    var _dBx = document.body;
    if(typeof window.innerWidth=='number')vh = window.innerWidth;
    else{
      if(_dEt&&_dEt.clientWidth)vh = _dEt.clientWidth;
      else{
           if(_dBx&&_dBx.clientWidth)vh = _dBx.clientWidth;
		    }
       }
    if(!vh||vh<100)vh =100;
     return vh;
}

function fnGetWindowHeight(){
    var vh = 0;
    var _dEt = document.documentElement;
    var _dBy = document.body;
    if(typeof window.innerHeight=='number')vh = window.innerHeight;
    else{
      if(_dEt&&_dEt.clientHeight)vh = _dEt.clientHeight;
      else{
           if(_dBy&&_dBy.clientHeight)vh = _dBy.clientHeight;
		    }
       }
    if(!vh||vh<100)vh =100;
     return vh;
}

function ReSizeimg(ImgD, iwidth, iheight) {
    var image = new Image();
    image.src = ImgD.src;
    if (image.width > 0 && image.height > 0) {
        if (image.width / image.height >= iwidth / iheight) {
            if (image.width > iwidth) {
                ImgD.width = iwidth;
                ImgD.height = (image.height * iwidth) / image.width;
            } else {
                ImgD.width = image.width;
                ImgD.height = image.height;
            }
        }
        else {
            if (image.height > iheight) {
                ImgD.height = iheight;
                ImgD.width = (image.width * iheight) / image.height;

            } else {
                ImgD.width = image.width;
                ImgD.height = image.height;
            }

        }
    }
}