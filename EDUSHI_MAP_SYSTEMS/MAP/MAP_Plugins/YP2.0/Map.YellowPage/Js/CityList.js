//-City Change List--------------------------------------
        function $(id){
            return document.getElementById(id);
        }
        function fnShowZiMu(o){
            for(i=1;i<=26;i++){
                $('Z'+i).className='';
            }
            o.className='active';
            fnShowZiMuList(o.innerHTML.toLowerCase());
        }
        function fnShowZiMuList(o){
        if(typeof CityNameList=='undefined'){fnShowZiMuList(o);return false;}
            var strHtml='';
            for(i=0;i<CityNameList.length;i++){
                for(j=0;j<CityNameList[i].length;j++){
                    if(CityPYList[i][j].substring(0,1)==o){
                        if (CityHas3DList[i][j] == '1')
                        {
                            strHtml +='<li><img src="../images/bd.gif"><a href="http://'+CityCodeList[i][j]+'.edushi.com/" target="_blank">'+CityNameList[i][j]+'</a></li>';
                        }
                        else
                        {
                            strHtml +='<li><img src="../images/bd.gif"><a href="http://2d.edushi.com/'+CityCodeList[i][j]+'" target="_blank">'+CityNameList[i][j]+'</a></li>';
                        }
                    }
                }
            }
            $('zimuList').innerHTML=strHtml;
        }
        function fnShowCityListpro(a){
            if(a==1){
                $('ShengFen').style.display='block';
                $('PinYin').style.display='none';
            }else{
                $('ShengFen').style.display='none';
                $('PinYin').style.display='block';
                fnShowZiMuList('a');
                fnShowZiMu($('Z1'));
            }
        }
        function fnCityListHiddn(){
            window.CityListControl.Hide();
            window.CityListControl.onClose();
        }
        function findPosX(obj){
            var curleft = 0;
            if (obj && obj.offsetParent) {
                while (obj.offsetParent) {
	                curleft += obj.offsetLeft;
	                obj = obj.offsetParent;
                }
            } else if (obj && obj.x) curleft += obj.x;
            return curleft;
        }
        function findPosY(obj){
            var curtop = 0;
            if (obj && obj.offsetParent){
                while (obj.offsetParent){
	                curtop += obj.offsetTop;
	                obj = obj.offsetParent;
                }
            } else if (obj && obj.y) curtop += obj.y;
            return curtop;
        }
        var previewFrom = null;
        var previewTimeoutId=null;
        var CityListFlag=0;
        function fnShowCityList(e){
            if (typeof ProvinceList == 'undefined' || ProvinceList == null)
                return;
            MouseIsOver = true;  
            previewFrom = e.target || e.srcElement;
            for(var i=0;i<ProvinceList.length;i++){
                if(ProvinceList[i]==previewFrom.innerHTML){
                    fnPreview(i);
                    return false;
                }
            }        
        }
        function fnPreview(ID){
          if(CityListFlag==0){
                var posX = findPosX(previewFrom)+10;
                var posY = findPosY(previewFrom)+12;			
            }else{			
                var posX = findPosX(previewFrom)+10;
                var posY = findPosY(previewFrom)+12;
            }
            var box=$('CityS');
            box.style.left = posX + 'px';
            box.style.top = posY + 'px';
            box.style.position = 'absolute';
            box.style.display = 'block';
            var i,j;
            var strHtml=new Array();
            var s="";
            for(i=0,j=0;i<CityNameList[ID].length && j<CityCodeList[ID].length;i++,j++){
              if (CityHas3DList[ID][j] == '1')
                {
                    strHtml.push("<a href='http://"+CityCodeList[ID][j]+".edushi.com/'target='_blank'>"+CityNameList[ID][i]+"</a>");
                }
                else
                {
                    strHtml.push("<a href='http://2d.edushi.com/" + CityCodeList[ID][j] + "'target='_blank'>"+CityNameList[ID][i]+"</a>");
                }
            } 
            s=strHtml.join('、');
            $('ShowCity').innerHTML="<table width='250px' ><tr><td>"+s+"</td></tr></table>";
            s=null;
        }
        var  BoxDisplayTime = 1;
        function fnBoxMouseOut(){
            MouseIsOver = false;
            setTimeout(FnHideBox, BoxDisplayTime * 500);
        }
        function fnBoxMouseOver(){
            MouseIsOver = true;
        }
        function FnHideBox(){
            if (!MouseIsOver)
                $('CityS').style.display = 'none';
            else
                setTimeout(FnHideBox, BoxDisplayTime * 500);
        }