$(function(){
	var liW = $(".focus-list li").width();
	var liLength = $(".focus-list li").length;
	var btn = "";
	var mark = 0;
	var timer = null;
	$(".focus-list ul").width(liW*liLength);

	for(var i=0; i<liLength; i++){
		btn += "<span></span>"
	}
	$(".focus-btn").append(btn);
	$(".focus-btn").find("span:first").addClass("on");
	$(".focus-btn span").hover(function(){
		var index = $(this).index();
		mark = index;
		play();
	});
	function play(){
		if(mark === liLength){
			$(".focus-list ul").animate({left: 0},500);
			mark = 0;
		}
		$(".focus-list ul").stop(true,false).animate({left: -liW*mark},500);
		$(".focus-btn span").eq(mark).addClass("on").siblings().removeClass("on");
	}
	timer = setInterval(function(){
		mark ++;
		play();
	},5000);
	$(".focus-list").hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval(function(){
			mark ++;
			play();
		},5000);
	});
});

//
(function(){
imgScroll=function(){};
imgScroll.prototype={
	init:function(option){
		if(typeof option == "undefined"){option = {};};
		this.moveUl=option.moveUl;
		this.moveNum=option.moveNum || 5;
		this.moveTime=option.moveTime || 500;
		this.Prev=option.prev;
		this.Next=option.next;
		this.ulWidth=option.ulWidth;
		this.isAuto=option.isAuto|| false;
		if(this.isAuto){
			this.offSet=option.offSet || 5000;
			this.Timer=null;
			this.AutoDirection=option.AutoDirection || 0;
			this._fnAuto(this.AutoDirection);
		}
		this.nextAllow=true;
		this.prevAllow=true;
		this._fnEvent();	
		this._fnWidth();
	},
	_fnWidth:function(){
		var len=$(this.moveUl).find("li").length;
		$(this.ulWidth).css({"width":$(this.moveUl).find("li:first").outerWidth(true)*len});
	},
	_fnEvent:function(){
		var _this=this;
		if(_this.isAuto){
			$(_this.Prev).bind("mouseenter",function(){clearInterval(_this.Timer);_this.Timer=null;});
			$(_this.Next).bind("mouseenter",function(){clearInterval(_this.Timer);_this.Timer=null;});
			$(_this.Prev).bind("mouseleave",function(){_this._fnAuto(_this.AutoDirection);});
			$(_this.Next).bind("mouseleave",function(){_this._fnAuto(_this.AutoDirection);});
			$(_this.Prev).bind("click",function(){_this.AutoDirection=0;_this._fnPrev();});
			$(_this.Next).bind("click",function(){_this.AutoDirection=1;_this._fnNext();});	
		}else{
			$(_this.Prev).bind("click",function(){_this._fnPrev();});
			$(_this.Next).bind("click",function(){_this._fnNext();});
		}
	},
	_fnAuto:function(direction){
		var _this=this;
		if(direction==0){
			_this.Timer=setInterval(function(){_this._fnPrev();},_this.offSet);
		}
		if(direction==1){
			_this.Timer=setInterval(function(){_this._fnNext();},_this.offSet);
		}
	},
	_fnLength:function(){
		var len=$(this.moveUl).find("li").length;
		return len;
	},
	_fnMoveWidth:function(){
		return $(this.moveUl).find("li:first").outerWidth(true);
	},
	_fnNext:function(){
		var _this=this,
			$ul=$(_this.moveUl),
			_moveWidth=_this._fnMoveWidth()*_this.moveNum,
			$li=$ul.find("li:lt("+_this.moveNum+")");
		if(_this.nextAllow){
			_this.nextAllow=false;
			$li.clone().appendTo($ul);
			$ul.stop(true,false).animate({"left":"-"+_moveWidth+"px"},_this.moveTime,function(){
				$ul.css({"left":0});
				$li.remove();
				_this.nextAllow=true;		
			});
		}
	},
	_fnPrev:function(){
		var _this=this,
			$ul=$(_this.moveUl),
			num=_this._fnLength()-_this.moveNum-1,
			_moveWidth=_this._fnMoveWidth()*_this.moveNum,
			$li=$ul.find("li:gt("+num+"):lt("+_this._fnLength()+")");
		if(_this.Next){
			_this.Next=false;
			$li.clone().prependTo($ul);
			$ul.css({"left":"-"+_moveWidth+"px"});
			$ul.stop(true,false).animate({"left":0},_this.moveTime,function(){
				$ul.css({"left":0});
				$li.remove();
				_this.Next=true;	
			});
		}
	}
};
})(window);