//alert('eds_eye.js');
function fnZoomBar(){}
fnZoomBar.prototype.Init=function(){
    this.zoombar = $('EzoomBar');    
    this.zoomBarSign = $('MapSilder');
    fnCreateEyeRoller();
    $('Ezoom0').onclick=this.zoomBar_click.bindAsEventListener(this);
    $('Ezoom1').onclick=this.zoomBar_click.bindAsEventListener(this);
    $('Ezoom2').onclick=this.zoomBar_click.bindAsEventListener(this);
    $('Ezoom3').onclick=this.zoomBar_click.bindAsEventListener(this);
    $('EzoomMax').onclick=this.ZoomMax.bindAsEventListener(this);
    $('EzoomMin').onclick=this.ZoomMin.bindAsEventListener(this);
    $('EbottomMM').onclick=this.EyeMapMM.bindAsEventListener(this);
    $('Eout').onclick=fnEyeEx.bindAsEventListener(this);
    $('Ein').onclick=fnEyeEx.bindAsEventListener(this);
    $('Change2D3D').onclick=this.C23D.bindAsEventListener(this);
    this.ZoomBarSignPos(vM.Zoom());  
    this.zoombar.onmousedown = this.doc_mousedown.bindAsEventListener(this);
    this.zoombar.onmousemove = this.doc_mousemove.bindAsEventListener(this);
    this.zoombar.onmouseup = this.doc_mouseup.bindAsEventListener(this);
}

fnZoomBar.prototype.C23D=function(){
    if(vM.Switch23D())
           $('Change2D3D').innerHTML = $('Change2D3D').innerHTML.replace('/newmap48.gif','/newmap482d.gif');
    else
           $('Change2D3D').innerHTML = $('Change2D3D').innerHTML.replace('/newmap482d.gif','/newmap48.gif');
}
fnZoomBar.prototype.doc_mousedown=function(evt){
        var src = evt.srcElement ? evt.srcElement : evt.target;
        this.ocx = evt.clientX;
        this.ocy = evt.clientY;
        if (src.id == 'MapSilder'){
            this.zoomFlag = true;
            this.bmy = this.ocy - this.zoomBarSign.offsetTop;
            this.bmTop = this.zoomBarSign.offsetTop;
        }
}
fnZoomBar.prototype.doc_mousemove=function(evt){
    var ex = evt.clientX;
    var ey = evt.clientY;
    if (this.zoomFlag){
        this.zoomBarSign.style.top = (ey - this.bmy) + 'px';
        if (this.zoomBarSign.offsetTop < 50)this.zoomBarSign.style.top = '50px';
        if (this.zoomBarSign.offsetTop > 113)this.zoomBarSign.style.top = '113px';
        var zz = Math.pow(2,  - (this.zoomBarSign.offsetTop - this.bmTop) /18).toFixed(3);
    }
}
fnZoomBar.prototype.doc_mouseup=function(evt){
    var src = evt.srcElement ? evt.srcElement : evt.target;
    if (this.zoomFlag){
        this.zoomFlag = false;
        var z = Math.round((this.zoomBarSign.offsetTop - 50) / 21);
        vM.FlatZoom(z);
        this.ZoomBarSignPos(z);
        return false;
    }
}
fnZoomBar.prototype.ZoomBarSignPos=function(z){    
    this.zoomBarSign.style.top = (50+21 * z) + 'px';
}
fnZoomBar.prototype.zoomBar_click=function(e){
    var src = e.srcElement ? e.srcElement : e.target;
    var z=src.id.replace('Ezoom','');
    if (z < 0 || z > 3)return ;
    vM.FlatZoom(z);
    this.ZoomBarSignPos(z);
}
fnZoomBar.prototype.ZoomMax=function(){
    var z=vM.Zoom();
    if(z-1>=0){
        vM.FlatZoom(0);
        this.ZoomBarSignPos(0);
    }
}
fnZoomBar.prototype.ZoomMin=function(){
    var z=vM.Zoom();
    if(z+1<=3){
        vM.FlatZoom(3);
        this.ZoomBarSignPos(3);
    }
}
fnZoomBar.prototype.EyeMapMM=function(){
    if($('EyeMapDiv').className=='Emax'){
        fnEyeMapSetWH(190,145);
        $('Eye').style.width='206px';
        $('eyeEdushiMap').style.width='190px';
        $('EyeMapDiv').style.height='155px';
        $('EyeMapDiv').style.width='200px';
        $('EyeMapDiv').className='Emin';
        $('Eout').style.top='78px';
        $('EbottomMM').className='Edu';
    }else{
        fnEyeMapSetWH(498,405);
        $('Eye').style.width='514px';
        $('eyeEdushiMap').style.width='498px';
        $('EyeMapDiv').style.height='415px';
        $('EyeMapDiv').style.width='508px';
        $('EyeMapDiv').className='Emax';
        $('Eout').style.top='207px';
        $('EbottomMM').className='Eduu';
    }   
}
fnZoomBar.prototype.EyeMapMin=function(){
    $('EyeMapDiv').style.height='155px';
    $('EyeMapDiv').style.width='200px';    
}
function fnEyeMapSetWH(w,h){
    vMe.MapHeight(h);    
    vMe.MapWidth(w);
    vMe.Show();
}

function fnCreateEyeRoller(){
    window.Eyes=$('Eye');
	window.EyeRoller=new Aladdincn.Web.Animation.Roller($('Eye'),26);
	EyeRoller.AccFunction=AccelerationFunctions.CrazyElevator;
	EyeRoller.onafterrollin=function(tm){   
	    $('Ein').style.display='block';
		EyeRoller.LeaveAmount=26;		
	};
	EyeRoller.onafterrollout=function(um){
		$('Ein').style.display='none';
	};
}

function fnEyeEx(){
    var ani=Aladdincn.Web.Animation;
	if(!EyeRoller.isExpanded()){
	    EyeRoller.rollOut(ani.RollDirection.RightLeft);
    }else{
        EyeRoller.rollIn(ani.RollDirection.LeftRight);
    }
};
function fnEyeExd(){
    var ani=Aladdincn.Web.Animation;
    if(Eyes.className=='collapsed'){
        EyeRoller.rollOut(ani.RollDirection.TopDown);
    }
};