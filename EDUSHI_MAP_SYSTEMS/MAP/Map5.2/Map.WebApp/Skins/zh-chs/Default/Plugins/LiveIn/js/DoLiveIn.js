function $(objId)
{
    return document.getElementById(objId);
}
function cmCreateXMLHTTP(){
  var objXMLHTTP=null;
  if (window.XMLHttpRequest) {
      objXMLHTTP = new XMLHttpRequest();
     
  } else if (window.ActiveXObject) {
      objXMLHTTP = new ActiveXObject("Microsoft.XMLHTTP");
      
  }
  return objXMLHTTP;
 }

 function cmXMLHttpReq(nReqType,strReqOpenUrl,strReqParam,pResponseFunc)
 {
  if( nReqType<0 || nReqType>1)
   return;
  var objXMLHTTP = cmCreateXMLHTTP();
  if (objXMLHTTP!=null)
  {
   function responseProcess()
    {
    if (objXMLHTTP.readyState==4)
    {
     pResponseFunc(objXMLHTTP);
    }

   }
   objXMLHTTP.onreadystatechange = responseProcess;
   if( nReqType==0)
   {
    objXMLHTTP.open("GET",strReqOpenUrl,true);
    objXMLHTTP.send(null);
   }
   else
   {
    objXMLHTTP.open("POST",strReqOpenUrl,true);
    objXMLHTTP.setRequestHeader("content-type","application/x-www-form-urlencoded");
    objXMLHTTP.send(strReqParam);
   }  
  }
 }
 
function LoadSmallType(sBigType)
{
    if (sBigType!="-1"&&sBigType!="")
    {
       cmXMLHttpReq(0, 'AjaxHandler.aspx?op=loadsmalltype&bigtype='+sBigType+'&rd='+ Math.round(Math.random()*10000), "", callBack_LoadSmallType);
    }
    else
    {
        $("dplBIC_SmallType").length = 0;
        $("dplBIC_SmallType").options.add(new Option("--请选择--","-1"));
    }
}
function callBack_LoadSmallType(objXMLHTTP)
{
    var Nodes = objXMLHTTP.responseXML.documentElement.childNodes;
    if (Nodes.length == 0)
    {
        $("dplBIC_SmallType").length = 0;
        $("dplBIC_SmallType").options.add(new Option("没有小类","-1"));
        return;
    }
    else
    {
        $("dplBIC_SmallType").length = 0;
        $("dplBIC_SmallType").options.add(new Option("--请选择--","-1"));
        for(var i=0;i<Nodes.length;i++)
        {
            var smalltypeid;
            var smalltypename;
            if(document.all)
            {
                smalltypeid = Nodes[i].childNodes[0].text;
                smalltypename = Nodes[i].childNodes[1].text;
            }
            else
            {
                smalltypeid = Nodes[i].childNodes[0].textContent;
                smalltypename = Nodes[i].childNodes[1].textContent;
            }
            $("dplBIC_SmallType").options.add(new Option(smalltypename,smalltypeid));
        }
    }
}

function checkedDate()
{
    if($('txtBIC_CompanyName').value == "")
    {
        alert('企业名称必须填写!');
        $('txtBIC_CompanyName').focus();
        return false;
    }
    if($('dplBIC_SmallType').value == -1 || $('dplBIC_SmallType').value=="")
    {
        alert('必须选择企业小类!');
        $('dplBIC_SmallType').focus();
        return false;
    }
    //alert($('txtBIC_Tel').value);
    var regTel = new RegExp("^(\\d{3,4}(-|—)?\\d{7,8}(,|，)?)+$","ig");
    if(!regTel.test($('txtBIC_Tel').value))
    {
        alert('必须填写正确联系电话!');
        $('txtBIC_Tel').focus();
        return false;
    }
    if($('txtBIC_Address').value == "")
    {
        alert('通讯地址必须填写!');
        $('txtBIC_Address').focus();
        return false;
    }
    if($('txtBIC_OwnerName').value == "")
    {
        alert('所属建筑必须填写!');
        $('txtBIC_OwnerName').focus();
        return false;
    }    
    if($('txtBIC_LinkMan').value == "")
    {
        alert('企业联系人必须填写!');
        $('txtBIC_LinkMan').focus();
        return false;
    }
    if($('txtBIC_Fax').value != "")
    {
        var regFax = new RegExp("^(\\d{3,4}-\\d{7,8})+$", "ig");
        if(!regFax.test($('txtBIC_Fax').value))
        {
            alert('请填写正确的传真!');
            $('txtBIC_Fax').focus();
            return false;
        }
    }
    if($('txtBIC_Post').value != "")
    {
        var regPost = new RegExp("^\\d{6}$","ig");
        if(!regPost.test($('txtBIC_Post').value))
        {
            alert('请填写正确的邮编!');
            $('txtBIC_Post').focus();
            return false;
        }
    }
    if($('txtBIC_Internet').value != "")
    {
        var regInternet = new RegExp("^http(s)?:\/\/([\\w-]+\.)+[\\w-]+(\/[\\w- \.\/\?%&=#]*)?$", "ig");
        if(!regInternet.test($('txtBIC_Internet').value))
        {
            alert('请填写正确的网址!');
            $('txtBIC_Internet').focus();
            return false;
        }
    }
    if($('txtBIC_Email').value != "")
    {
        var regEmail = new RegExp("^[\\w-]+(\.[\\w-]+)*@[\\w-]+(\.[\\w-]+)+$", "ig");
        if(!regEmail.test($('txtBIC_Email').value))
        {
            alert('请填写正确的油箱!');
            $('txtBIC_Email').focus();
            return false;
        }
    }
    if($('txtBIC_MobileNum').value != "")
    {
        var regMobileNum = new RegExp("^\\d{11}$", "ig");
        if(!regMobileNum.test($('txtBIC_MobileNum').value))
        {
            alert('请填写正确的手机号码!');
            $('txtBIC_MobileNum').focus();
            return false;
        }
    }
    $('HiddenSmallTypeID').value = $('dplBIC_SmallType').value;    
    return true;
}