/*
//////////////////////////////////////////////////////////////////////
//																	//
//		ver:0.2														//
//		dte:01/19/2007												//
//																	//
//////////////////////////////////////////////////////////////////////
*/

//5、定义通用类创建对象
var Class = {
	create: function() {
			return function() {
				return this.initialize.apply(this, arguments);//强制类声明时初始化
			}
	}
}

//6、对象原型扩展
Object.extend = function(destination, source) {
  for (property in source) {
    destination[property] = source[property];
  }
  return destination;
}

//11、获得浏览器信息
//	在程序的任何地方，使用navigator.B得到浏览器名称，navigator.V得到浏览器主版本
//	B的可能值（字符类型）如下：
//	IE - Internet Explorer
//	FF - FireFox
//	OP - Opear
//	NS - Netscap
//	UN - 未知的浏览器


var sys=new GetBrowserInfo();
Object.extend(navigator,{
	B:sys[0],
	V:sys[1]

});
var sys=null;

function GetBrowserInfo(){
	var uA=navigator.userAgent;
	var BVer=0;
	var SVer=0;
	var sys=new Array();
	if (uA.indexOf('Netscape') != -1) {
		sys[0]='NS';
		BVer=parseFloat(uA.substring(uA.indexOf('Netscape')+9,uA.length));
		sys[1]=BVer;
		return sys;
	}
	else if (uA.indexOf('Opera') != -1) {
	    sys[0]='OP';
	    BVer=parseFloat(uA.substring(uA.indexOf('Opera')+6,uA.length));
	    sys[1]=BVer;
	    return sys;
	}
    else if (uA.indexOf('Firefox') != -1) {
        sys[0]='FF';
        BVer=parseFloat(uA.substring(uA.indexOf('Firefox')+8,uA.length));
        sys[1]=BVer;
        return sys;
    }
    else if (uA.indexOf('MSIE') != -1) {
        sys[0]='IE';
        BVer=parseFloat(uA.substring(uA.indexOf('MSIE')+4,uA.length));
        sys[1]=BVer;
        return sys;
    }
    else {
        sys[0]='UN';
        sys[1]=-1;
        alert(navigator.userAgent);
        return sys;
	}
	return false;
}
//绑定事件监听方法
function $attachEventListener(obj,eventName,oListener){
    if(obj.attachEvent){
        obj.attachEvent(eventName,oListener);
    }
    else if(obj.addEventListener){
        obj.addEventListener(eventName,oListener, false);
    }
    else{
        return false;
    }
}

//删除事件监听方法
function $detachEventListener(obj,eventName,oListener){
    if(obj.detachEvent){
        obj.detachEvent(eventName,oListener);
    }
    else if(obj.removeEventListener){
        obj.removeEventListener(eventName,oListener, true);
    }
    else{
        return false;
    }
}


var $EventName=new function(){
    this.onload   = navigator.B=='IE'?'onload': 'load';
    this.mousemove   = navigator.B=='IE'?'onmousemove': 'mousemove';
    this.mouseover   = navigator.B=='IE'?'onmouseover': 'mouseover';
    this.mouseout    = navigator.B=='IE'?'onmouseout': 'mouseout';
    this.mouseup     = navigator.B=='IE'?'onmouseup': 'mouseup';
    this.mousedown   = navigator.B=='IE'?'onmousedown': 'mousedown';
    this.click       = navigator.B=='IE'?'onclick': 'click';
    this.dblclick    = navigator.B=='IE'?'ondblclick': 'dblclick';
    this.mousewheel  = navigator.B=='IE'?'onmousewheel': 'DOMMouseScroll';
    this.keydown     = navigator.B=='IE'?'onkeydown': 'keydown';
    this.keypress    = navigator.B=='IE'?'onkeypress': 'keypress';
    this.keyup       = navigator.B=='IE'?'onkeyup': 'keyup';
    this.focusin     = navigator.B=='IE'?'onfocusin': 'focusin';
    this.onfocusout  = navigator.B=='IE'?'ononfocusout': 'onfocusout';
    this.onfocus     = navigator.B=='IE'?'ononfocus': 'onfocus';
    this.contextmenu = navigator.B=='IE'?'oncontextmenu': 'contextmenu';
}

//1、通过ID得到文档对象引用，多个ID逗号分割得到文档对象数组。
function $() 
{
	var objElements = new Array();
	var i;
	for (i=0;i< arguments.length;i++)
	{
		var objEle = arguments[i];
		if(typeof arguments[i] == 'string')
		{
			objEle = document.getElementById(arguments[i]);
		}
		objElements.push(objEle);
	}
	if(arguments.length==1)
	{
		return objEle;
	}
	else
	{
		return objElements;
	}
}
var $A = Array.from = function(iterable) {
  if (!iterable) return [];
  if (iterable.toArray) {
    return iterable.toArray();
  } else {
    var results = [];
    for (var i = 0, length = iterable.length; i < length; i++)
      results.push(iterable[i]);
    return results;
  }
}

//2、创建一个页面元素tag
function $C(tag)
{
	return document.createElement(tag);
}

//3、把o添加到p对象中
function $To(o,p)
{
	if(o&&p){
		p.appendChild(o);
		return o;
	}
	else{
		return false;
	}
}

//3、创建一个超级随机整数字符flg随机数量级
function $Rnd(flg)
{
	var d, s = '';
	if(!flg)flg=100000;
	d = new Date();
	s += d.getHours();
	s += d.getMinutes();
	s += d.getSeconds();
	s += d.getMilliseconds();
	return Math.round(Math.random()*flg).toString()+s.toString();
}

//4、数值比较
function $Max()//返回最大的数值
{
	var i;
	var max
	if(arguments.length==0) return false;
	max = arguments[0];
	for (i=0;i< arguments.length;i++)
	{
		max = Math.max(max,arguments[i]);
	}
	return max;
	
}
function $Min()//返回最小的数值
{
	var i;
	var min
	if(arguments.length==0) return false;
	min = arguments[0];
	for (i=0;i< arguments.length;i++)
	{
		min = Math.min(min,arguments[i]);
	}
	return min;
}

//7、给基类添加反射继承
/*
Object.extend(Function.prototype,{
		inherit:function(source){
			var proto;
			for(proto in source.prototype)
			{
				this.prototype[proto]=source.prototype[proto];
			}
			return this;
		}
});
*/

//8、、扩展：去除字符串空格
Object.extend(String.prototype,{
	ltrim:function(){//去除左边空格
		var whitespace = new String(" \t\n\r");
		var s = new String(this);
		if (whitespace.indexOf(s.charAt(0)) != -1)
		{
			var j=0, i = s.length;
			while (j < i && whitespace.indexOf(s.charAt(j)) != -1)
			{
				j++;
			}
			s = s.substring(j, i);
		}
		return s;
	},
	rtrim:function(){//去除右边空格
		var whitespace = new String(" \t\n\r");
		var s = new String(this);
		if (whitespace.indexOf(s.charAt(s.length-1)) != -1)
		{
			var i = s.length - 1;
			while (i >= 0 && whitespace.indexOf(s.charAt(i)) != -1)
			{
				i--;
			}
			s = s.substring(0, i+1);
		}
		return s;
	
	},
	trim:function(){//去除两边空格
		var s = new String(this);
		s = s.ltrim().rtrim();
		return s;
	},
	Int:function(){//转成整数
		return parseInt(this);
	},
	Float:function(){//转成浮点数
		return parseFloat(this);
	}

});

Function.prototype.bind = function() {
  var __method = this, args = $A(arguments), object = args.shift();
  return function() {
    return __method.apply(object, args.concat($A(arguments)));
  }
}

Function.prototype.bindAsEventListener = function(object) {
  var __method = this, args = $A(arguments), object = args.shift();
  return function(event) {
    return __method.apply(object, [( event || window.event)].concat(args).concat($A(arguments)));
  }
}

//9
Object.extend(Number.prototype,{
		Round:function(){
			return Math.round(this);
		},
		Floor:function(){
			return Math.floor(this);
		},
		Abs:function(){
			return Math.abs(this);
		}
});

//10、判断值是不是数字，返回true 表示是否则返回false
function isNumber(v)
{
	if(!v)return false;
	if (isNaN(v))
	{
		return false;
	}
	else
	{
		return true;
	}
}



//创建Flash对象
//IE中有不足，为了让Flash影片正常播放，在New对象的时候Flash对象已经添加到document中，即已经实例化
function alaFlash(src,width,height){
	var flash;
	if(navigator.B=='IE' ||  navigator.B=='OP'){
		flash = document.createElement('object');
		flash.setAttribute('classid', 'clsid:D27CDB6E-AE6D-11CF-96B8-444553540000');
		if(width)flash.setAttribute('width', width);
		if(height)flash.setAttribute('height', height);
		flash.setAttribute('wmode','transparent');
		document.body.appendChild(flash);
		flash.setAttribute('movie',src);
	}
	else if(navigator.B=='FF' || navigator.B=='NS'){
		flash = document.createElement('embed');
		flash.setAttribute('src',src);
		flash.setAttribute('type','application/x-shockwave-flash');
		if(width)flash.setAttribute('width', width);
		if(height)flash.setAttribute('height', height);
		flash.setAttribute('wmode','transparent');
	}
	else{
		flash = null;
	}
	return flash;
}

//释放内存
function alaMemGarbage(){
	if(navigator.B=='IE')CollectGarbage();
}
