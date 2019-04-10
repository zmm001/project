<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>酒店泡泡控件</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <style type="text/css">
       .ab
        {
            margin: 10px;
        }
        *
        {
            margin: 0;
            padding: 0;
            font-size: 12px;
            list-style: none;
            text-decoration: none;
        }
        a
        {
            color: #2750aa;
        }
        img
        {
            border: none;
        }
        .clear
        {
            clear: both;
        }
        .kk230, .kk140, .kk200,.kk80
        {
            display: block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .kk80
        {
            width:130px;
            float:left;
        }
        .kk230
        {
            width: 230px;
        }
        .kk140
        {
            width: 140px;
        }
        .kk200
        {
            width: 200px;
            }
        .popo1
        {
            width: 318px;
        }
        .popo1 .center
        {
            width: 308px;
            background: url(../images/p_center.jpg) repeat-y 0 0;
            padding: 5px;
            padding-top: 0;
        }
        .p_top
        {
            padding-bottom: 2px;
            margin-bottom: 5px;
            overflow: hidden;
        }
        .p_topone
        {
            margin-bottom: 10px;
        }
        .p_name
        {
            float: left;
            font: bold 14px "宋体";
        }
        .p_detail, .p_close
        {
            float: right;
        }
        .close
        {
            background: url(../images/p_close.jpg) no-repeat 0 -13px;
            width: 13px;
            height: 13px;
            margin-left: 10px;
            display: block;
        }
        .p_center
        {
            border-bottom: dashed 1px #d4d4d4;
            padding-bottom: 5px;
            _padding-bottom: -5px;
            _height: 35px;
        }
        .p_pic, .p_text
        {
            float: left;
        }
        .p_text
        {
            height: 45px;
            width: 200px;
        }
        .p_pic
        {
            width: 88px;
            height: 60px;
            border: solid 1px #cccccc;
            padding: 1px;
            margin-right: 10px;
        }
        .p_pic img
        {
            width: 88px;
            height: 60px;
        }
        .de_dz, .de_rz
        {
            margin-bottom: 10px;
        }
        
        .de_rz span
        {
            font-weight: bold;
            color: #9e1c04;
        }
        .de_jd
        {
            color: #9a9a9a;
            margin-bottom: 0px;
            _height: 15px;
        }
        .de_jd a
        {
            float: left;
            font-weight: lighter;
            color: #9a9a9a;
            cursor: pointer;
            display: inline-block;
        }
        .de_jd a.span_jd2
        {
            color: #db8937;
        }
        .de_btn a
        {
            display: inline-block;
            padding-left: 20px;
            
        }
        .de_btn a.a1
        {
            background: url(../images/p_a1.jpg) no-repeat 0 0;
            padding-top: 3px;
            margin-right: 5px;
        }
        .de_btn a.a2
        {
            background: url(../images/p_a2.jpg) no-repeat 0 0;
        }
        .p_center2
        {
            width: 300px;
            background: #f6f6f6;
            height: 58px;
            margin: 5px 0 0 5px;
        }
        .tab
        {
            border-bottom: solid 1px #d1d1d1;
            border-top: solid 1px #d1d1d1;
            text-align: center;
            padding: 5px 0;
            padding-left: 30px;
            position: relative;
            height: 12px;
            margin-bottom: 10px;
        }
        .tab li
        {
            float: left;
            margin-right: 35px;
            width: 60px;
            height: 27px;
            position: absolute;
        }
        .tab li.li1
        {
            left: 45px;
        }
        .tab li.li2
        {
            left: 115px;
        }
        .tab li.li3
        {
            left: 185px;
        }
        .tab li a
        {
            display: block;
            width: 60px;
            height: 27px;
        }
        .tab li a:hover
        {
            background: url(../images/p_a_icon.jpg) no-repeat 20px 17px;
        }
        .tab li a.current
        {
            background: url(../images/p_a_icon.jpg) no-repeat 20px 17px;
            font-weight: bold;
        }
        .texta1, .texta2, .texta3, .texta4
        {
            width: 71px;
            height: 13px;
            border: solid 1px #cccccc;
            color: #a3a4a5;
            padding: 2px 5px;
            _height:13px;
        }
        .texta2, .texta3
        {
            width: 105px;
        }
        .texta4
        {
            width: 164px;
        }
        .GK_gj
        {
            overflow: hidden;
            margin-left: 5px;
            _margin-left: 1px;
            _height:22px;
        }
        .GK_gj span
        {
            display: block;
            float: left;
        }
        .span5
        {
            margin: 0 5px;
            margin-top: 3px;
        }
        .span6
        {
            margin-left: 5px;
            _margin-left: 3px;
        }
        .GK_zb
        {
            width: 290px;
            height: 20px;
            margin-left: 5px;
            padding: 1px 0px;
            _padding:0px;
            _height:20px;
            overflow:hidden;
        }
        .GK_zb a, .GK_zb span
        {
            display: block;
            float: left;
            _height:12px;
        }
        .GK_zb a
        {
            padding-left: 10px;
            margin-right: 7px;
            margin-top: 3px;
            background: url(../images/p_icon_3.jpg) no-repeat 0 3px;
        }
        .GK_zb span.span1
        {
            width: 80px;
        }
        .GK_zb span.span2
        {
            margin-left: 10px;
            _margin-left: 5px;
        }
        .share
        {
            margin-left: 8px;
            _height:22px;
        }
        .share span
        {
            float: left;
        }
        .span7, .span7_1
        {
            margin-left: 8px;
        }
        .span7
        {
            position: relative;
        }
        .span7 .span1_down
        {
            position: absolute;
            left: 0px;
            top: 18px;
        }
        .span1_down ul
        {
            border: solid 1px #9bc9eb;
            background: #e3efff;
            width: 78px;
            margin: 0;
            padding: 5px 0 0 5px;
            z-index: 99999;
        }
        .span1_down ul li
        {
            margin-bottom: 10px;
            height: 16px;
            _margin-bottom: 0px;
        }
        .span1_down ul li i
        {
            float: left;
            display: inline-block;
            background: url(../images/p_icon_6.png) no-repeat 0 0px;
            width: 20px;
            line-height: 10px;
            height: 16px;
        }
        .span1_down ul li a
        {
            display: inline-block;
            height: 12px;
            float: left;
            height: 16px;
            margin-top: 3px;
        }
        .span1_down ul li i.icon2
        {
            background-position: -22px 0px;
        }
        .span1_down ul li i.icon3
        {
            background-position: -42px 0px;
        }
        .span1_down ul li i.icon4
        {
            background-position: -64px 0px;
        }
        .p_bottom
        {
            text-align: center;
            margin-top: 5px;
            border-top: 1px dashed #D4D4D4;
            padding-top: 5px;
            height: 60px;
        }
        .p_bottom img
        {
            width: 305px;
        }
        
        .hotel_d
        {
            margin-top: 10px;
        }
        .hotel_d span
        {
            padding-right: 10px;
        }
        .hotel_d strong
        {
            color: #9e1c04;
        }
    </style>
</head>
<body>
    <div class="popo1">
        <div class="top"><img src="../images/p_top.png" /></div>
            <div id="divLoading" style="background-color:#fff; position:absolute; z-index:999; width:20px; height:20px;left:155px;  top:60px;"></div>
        <div class="center">
            <div class="p_top">
                <div class="p_topone">
                    <div class="p_name kk210" id="Name_h3">杭州海外海智选假日大酒店</div>
                    <div class="e_icon" id="icon"></div>
                    <div class="p_close"><a href="javascript:;" class="close" id="btnClose" title="关闭窗口"></a>
                    </div>
                    <div class="p_detail"><a id="view_a" href="javascript:;" target="_blank" title="查看详情">详情>></a></div>
                </div>
                <div class="clear">
                </div>
                <div class="hotel_d">
                    <span id="houseType" class="kk80">房型：特惠标准房</span><span>价格：<strong id="housePrice">￥115</strong></span><span><a
                        href="javascript:;" target="_blank" id="moreHotel">更多房型>></a></span>
                </div>
            </div>
            <div class="clear">
            </div>
            <div class="p_center">
                <div class="p_pic">
                    <a id="Img_a" target="_blank"><img id="Img_img" src="../images/p_dian3.png" /></a></div>
                <div class="p_text">
                    <div class="de_dz kk200" id="Address_p">
                        地址：浙江省杭州市下城区武..</div>
                    <div class="de_rz kk200" id="Tel_p">
                        电话：0571-57856245
                    </div>
                    <div class="de_rz de_jd">
                        <a class="span_jd1 kk140" id="HFContent">房间还可以，电脑...</a> <a class="span_jd2" target="_blank" id="HCmtCount">点评：123</a>
                    </div>
                </div>
                <div class="clear">
                </div>
            </div>
            <div class="p_center2">
                <ul class="tab">
                    <li class="li1"><a id="zbsearch" href="javascript:;" class="current">周边搜索</a></li>
                    <li class="li2"><a id="gjsearch" href="javascript:;">公交查询</a></li>
                    <li class="li3"><a id="fxsearch" href="javascript:;">分 享</a></li>
                    <div class="clear"></div>
                </ul>
                <div class="GK_zb" id="zblist">
                    <a href="javascript:;" id="btnHotelSearch">酒店</a> <a href="javascript:;" id="btnNearByBus">公交站</a> <a href="javascript:;" id="btnBankSearch">银行</a> <a href="javascript:;" id="btnDianSearch">店铺</a><span class="span1"><input id="btnRangText" name="text" type="text" class="texta1" onclick="if(this.value == '请输入关键字')this.value='';"  value="请输入关键字" /></span><span class="span2"><img src="../images/p_btn.jpg" id="btnOtherSearch" style="cursor:pointer;" /></span>
                </div>
                <div class="GK_gj" id="gjlist" style="display: none;">
                    <span class="span3"><input name="text2" type="text" id="bustext1" class="texta2" />
                    </span><span class="span5" style="cursor:pointer;">
                        <img src="../images/p_jh.jpg" id="busswitch" /></span> <span class="span4">
                            <input name="text2" id="bustext2" type="text" class="texta3" />
                        </span><span class="span6">
                            <img src="../images/p_btn.jpg" id="busSearch" style="cursor:pointer;" /></span>
                    <div class="clear">
                    </div>
                </div>
                <div class="share" id="fxlist" style="display: none;">
                    <span>
                        <input name="text2" type="text" class="texta4" readonly id="txtUrl" onfocus="this.select()" /></span>
                    <span class="span7_1">
                        <img src="../images/p_fz_Btn.jpg" id="btnCopy" alt="复制给好友" style="cursor:pointer;" /></span>
                    <span class="span7"
                            onmouseover="document.getElementById('fxddllist').style.display='';" onmouseout="document.getElementById('fxddllist').style.display='none';"><img src="../images/p_fx_Btn.jpg" />
                    <div class="span1_down" id="fxddllist" style="display: none;">
                        <ul>
                            <li><i class="icon4"></i><a id="sinaShare"  href="#">新浪微博</a></li>
                            <li><i class="icon3"></i><a id="qqShare" href="javascript:void(0);">腾讯微博</a></li>
                            <li><i class="icon1"></i><a id="renrenShare" href="#">人人网</a></li>
                            <li><i class="icon2"></i><a id="kaixinShare" href="#">开心网</a></li>
                        </ul>
                    </div>
                    </span>
                </div>
            </div>
            <div class="p_bottom" id="RowNav">
            </div>
            <div class="clear">
            </div>
        </div>
        <div class="clear">
        </div>
        <div class="bottom">
            <img src="../images/p_bottom.png" /></div>
    </div>
</body>
</html>
