function EdushiValidate() {
    //需要验证的对象
    this.inputString = "";

    /*************************************
    ReMarks：判断是否为用户名
    Date：2006/12/17 17:26:29
    Memo ：
    isLoginName()：没有长度限制
    isLoginName(9)：指定长度，一般不使用此方法
    isLoginName(6,12)：长度在6到12个字符之间
    *************************************/
    this.isLoginName = function() {
        for (var i = 0; i < arguments.length; i++)//检查参数是否合法
        {
            if (!this.isIntPositive(arguments[i])) {
                alert("isLoginName参数设置不正确。");
                break;
                return false;
            }
        }
        switch (arguments.length) {
            case 0: //无长度限制
                return (new RegExp('^\s*[.A-Za-z0-9_-][]\s*$').test(this.inputString) || new RegExp(''));
                break;
            case 1: //指定长度
                return new RegExp('^\s*[.A-Za-z0-9_-]{' + arguments[0] + '}\s*$').test(this.inputString);
                break;
            case 2: //两个长度之间
                return new RegExp('^\s*[.A-Za-z0-9_-]{' + arguments[0] + ',' + arguments[1] + '}\s*$').test(this.inputString);
                blnResult = true;
                break;
            default:
                break;
        }
        return false;
    };
    /*************************************
    ReMarks：判断是否为密码
    Memo：使用规则和用户名一样
    *************************************/
    this.isPassword = function() {
        for (var i = 0; i < arguments.length; i++)//检查参数是否合法
        {
            if (!this.isIntPositive(arguments[i])) {
                alert("isPassword参数设置不正确。");
                break;
                return false;
            }
        }
        switch (arguments.length) {
            case 0: //无长度限制
                return new RegExp('^\s*[.A-Za-z0-9_-~@#$\^&\*]\s*$').test(this.inputString);
                break;
            case 1: //指定长度
                return new RegExp('^\s*[.A-Za-z0-9_-~@#$\^&\*]{' + arguments[0] + '}\s*$').test(this.inputString);
                break;
            case 2: //两个长度之间
                return new RegExp('^\s*[.A-Za-z0-9_-~@#$\^&\*]{' + arguments[0] + ',' + arguments[1] + '}\s*$').test(this.inputString);
                break;
            default:
                break;
        }
        return false;
    };
    /*************************************
    ReMarks：自正义正则匹配
    Date：2006/12/25 18:00:17
    Memo ：可以使用CustomReg(/.,/gi),CustomReg(/.,/gi , "teststring")
    *************************************/
    this.CustomReg = function(myReg) {
        return new RegExp(eval(myReg)).test((arguments.length == 2) ? arguments[1] : this.inputString)
    };
    /*************************************
    ReMarks：判断是否为空
    Date：2006/12/17 17:26:29
    Memo ：无
    *************************************/
    this.isEmpty = function() {
        return ((arguments.length == 1) ? arguments[0] == "" : this.inputString == "")
    };
    /************************************
    ReMarks：判断是否为整数
    Date：2006/10/20 15:59:38
    Parameter ：无
    ************************************/
    this.isInt = function() {
        return (new RegExp(/^[+-]?\d+$/).test((arguments.length == 1) ? arguments[0] : this.inputString))
    };
    /*************************************
    ReMarks：判断是否为正整数
    Date：2006/12/17 17:27:12
    Memo ：    Date:2006/12/25 17:07:06 允许指定字符串	
    *************************************/
    this.isIntPositive = function() {
        return (new RegExp(/^([+]?)\d+$/).test((arguments.length == 1) ? arguments[0] : this.inputString))
    };
    /*************************************
    ReMarks：是否为负整数
    Date：2006/12/17 17:28:08
    Memo ：无
    *************************************/
    this.isIntNegative = function() {
        return (new RegExp(/^-\d+$/).test((arguments.length == 1) ? arguments[0] : this.inputString))
    };
    /*************************************
    ReMarks：是否为浮点
    Date：2006/12/17 17:28:54
    Memo ：无
    *************************************/
    this.isFloat = function() {
        return (new RegExp(/^([+-]?)\d*\.\d+$/).test((arguments.length == 1) ? arguments[0] : this.inputString))
    };
    /*************************************
    ReMarks：是否为正浮点
    Date：2006/12/17 17:29:36
    Memo ：无
    *************************************/
    this.isFloatPositive = function() {
        return (new RegExp(/^([+]?)\d*\.\d+$/).test((arguments.length == 1) ? arguments[0] : this.inputString))
    };
    /*************************************
    ReMarks：是否为负浮点
    Date：2006/12/17 17:30:25
    Memo ：无
    *************************************/
    this.isFloatNegative = function() {
        return (new RegExp(/^-\d*\.\d+$/).test((arguments.length == 1) ? arguments[0] : this.inputString))
    };
    /*************************************
    ReMarks：是否数字
    Date：2006/12/17 17:30:25
    Memo ：无
    *************************************/
    this.isNumber = function() {
        return (this.isFloat() || this.isInt());
    };
    /*************************************
    ReMarks：是否正数字
    Date：2006/12/17 17:30:25
    Memo ：无
    *************************************/
    this.isNumberPostive = function() {
        return (this.isFloatPositive() || this.isIntPositive());
    };
    /*************************************
    ReMarks：是否负数字
    Date：2006/12/17 17:30:25
    Memo ：无
    *************************************/
    this.isNumberNegative = function() {
        return (this.isFloatNegative() || this.isIntNegative());
    };
    /************************************
    ReMarks：校验Email是否合法
    Date：2006/10/20 15:59:17
    Parameter ：无
    ************************************/
    this.isEmail = function() {
        return (new RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test((arguments.length == 1) ? arguments[0] : this.inputString))
    };
    /*************************************
    ReMarks：是否为网址
    Date：2006/12/17 17:32:30
    Memo ：无
    *************************************/
    this.isURL = function() {
        return (new RegExp(/^http:\/\/.*/).test((arguments.length == 1) ? arguments[0] : this.inputString))
    };
    /*************************************
    ReMarks：是否为颜色值,十六进制显示
    Date：2006/12/17 17:33:09
    Memo ：无
    *************************************/
    this.isColor = function() {
        return (new RegExp(/^#[a-fA-F0-9]{6}$/).test((arguments.length == 1) ? arguments[0] : this.inputString))
    };
    /*************************************
    ReMarks：是否只为中文
    Date：2006/12/23 16:27:44
    Memo ：无
    *************************************/
    this.isChinese = function() {
        return (new RegExp(/^[\u4e00-\u9fa5]+$/).test((arguments.length == 1) ? arguments[0] : this.inputString))
    };
    /*************************************
    ReMarks：是否为邮政编码
    Date：2006/12/17 17:37:36
    Memo ：无
    *************************************/
    this.isZipCode = function() {
        return (new RegExp(/^\d{6}$/).test((arguments.length == 1) ? arguments[0] : this.inputString))
    };
    /*************************************
    ReMarks：是否为QQ号码
    Date：2006/12/17 17:37:36
    Memo ：无
    *************************************/
    this.isQQ = function() {
        return (new RegExp(/^\d{5,10}$/).test((arguments.length == 1) ? arguments[0] : this.inputString))
    };
    /*************************************
    ReMarks：是否为电话号码
    Date：2006/12/17 17:38:02
    Memo ：无
    *************************************/
    this.isTel = function() {
        return (new RegExp(/^((\((\+|00)?\d{1,3}\))|(\+|00)?\d{1,3})?0?\d{3}-?\d{7,8}$/).test((arguments.length == 1) ? arguments[0] : this.inputString))
    };
    /************************************
    ReMarks：检查合法手机号
    Date：2006/10/20 15:59:56
    Parameter ：无
    ************************************/
    this.isMobile = function() {
        return (new RegExp(/^((\(\d{3}\))|(\d{3}\-))?13\d{9}$/).test((arguments.length == 1) ? arguments[0] : this.inputString));
    };
    /*************************************
    ReMarks：是否为图像文件
    Date：2006/12/17 17:39:46
    Memo ：无
    *************************************/
    this.isImageFile = function() {
        //alert(new RegExp(eval('/(.*)\.(' + arguments[0] + ')$/')));
        return ((arguments.length == 1) ? new RegExp(eval('/(.*)\.(' + arguments[0] + ')$/')).test(this.inputString.toLowerCase()) : new RegExp(/(.*)\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/).test(this.inputString.toLowerCase()));
    };
    /*************************************
    ReMarks：是否为压缩文件
    Date：2006/12/17 17:41:10
    Memo ：无
    *************************************/
    this.isZipFile = function() {
        return ((arguments.length == 1) ? new RegExp(eval('/(.*)\.(' + arguments[0] + ')$/')).test(this.inputString.toLowerCase()) : new RegExp(/(.*)\.(rar|7z|zip|7zip|tgz)$/).test(this.inputString.toLowerCase()));
    };
    /*************************************
    ReMarks：是否为Word文件
    Date：2006/12/17 17:41:10
    Memo ：无
    *************************************/
    this.isWordFile = function() {
        return ((arguments.length == 1) ? new RegExp(eval('/(.*)\.(' + arguments[0] + ')$/')).test(this.inputString.toLowerCase()) : new RegExp(/(.*)\.(doc|docx)$/).test(this.inputString.toLowerCase()));
    };
    /*************************************
    ReMarks：是否为Excel文件
    Date：2006/12/17 17:41:10
    Memo ：无
    *************************************/
    this.isExcelFile = function() {
        return ((arguments.length == 1) ? new RegExp(eval('/(.*)\.(' + arguments[0] + ')$/')).test(this.inputString.toLowerCase()) : new RegExp(/(.*)\.(xls|xlsx)$/).test(this.inputString.toLowerCase()));
    };
    /*************************************
    ReMarks：是否为PDF文件
    Date：2006/12/17 17:41:10
    Memo ：无
    *************************************/
    this.isPDFFile = function() {
        return ((arguments.length == 1) ? new RegExp(eval('/(.*)\.(' + arguments[0] + ')$/')).test(this.inputString.toLowerCase()) : new RegExp(/(.*)\.(pdf)$/).test(this.inputString.toLowerCase()));
    };
    /*************************************
    ReMarks：是否为TXT文件
    Date：2006/12/17 17:41:10
    Memo ：无
    *************************************/
    this.isTXTFile = function() {
        return ((arguments.length == 1) ? new RegExp(eval('/(.*)\.(' + arguments[0] + ')$/')).test(this.inputString.toLowerCase()) : new RegExp(/(.*)\.(txt)$/).test(this.inputString.toLowerCase()));
    };
    this.isExistFile = function() {
        return (new RegExp(eval('/(.*)\.(' + arguments[1] + ')$/')).test(arguments[0]));
    };
    /*************************************
    ReMarks：是否为日期
    Date：2006/12/17
    Memo ：无
    *************************************/
    this.isDate = function() {
        return (new RegExp(/^\d{4}(\-|\/|\.)[0-1]?[0-9]\1[0-3]?[0-9]$/).test((arguments.length == 1) ? arguments[0] : this.inputString));
    };
    /*************************************
    ReMarks：是否为时间
    Date：2006/12/17 17:43:07
    Memo ：无
    *************************************/
    this.isTime = function() {
        return (new RegExp(/^[0-2]?[0-9](\-|:|\.)[0-5]?[0-9]\1[0-5][0-9]$/).test((arguments.length == 1) ? arguments[0] : this.inputString));
    };
    /*************************************
    ReMarks：是否为IP地址
    Date：2006/12/17 17:43:21
    Memo ：无
    *************************************/
    this.isIPAddress = function() {
        return (new RegExp(/^(([0-1]?\d{0,2})|(2[0-5]{0,2}))\.(([0-1]?\d{0,2})|(2[0-5]{0,2}))\.(([0-1]?\d{0,2})|(2[0-5]{0,2}))\.(([0-1]?\d{0,2})|(2[0-5]{0,2}))$/).test((arguments.length == 1) ? arguments[0] : this.inputString));
    };
    /*************************************
    ReMarks：是否全为字母
    Date：2006/12/18 14:53:47
    Memo ：无
    *************************************/
    this.isAlpha = function() {
        return (new RegExp(/^[A-Z]+$/i).test((arguments.length == 1) ? arguments[0] : this.inputString));
    };
    /*************************************
    ReMarks：是否全为大写字母
    Date：2006/12/17 17:44:36
    Memo ：无
    *************************************/
    this.isUppercase = function() {
        return (new RegExp(/^[A-Z]+$/).test((arguments.length == 1) ? arguments[0] : this.inputString));
    };
    /*************************************
    ReMarks：是否为小写字母
    Date：2006/12/17 17:45:06
    Memo ：无
    *************************************/
    this.isLowercase = function() {
        return (new RegExp(/^[a-z]+$/).test((arguments.length == 1) ? arguments[0] : this.inputString));
    };
    /*************************************
    ReMarks：是否为身份证
    Date：2006/12/18 15:06:08
    Memo ：无
    *************************************/
    this.isIdCardNo = function(num) {
        //输入的不是数字以及个数不足！
        if (!new RegExp(/^\d{15}$/).test(num) || !new RegExp(/^\d{18}$/).test(num)) {
            return false;
        }
        var len = num.length, re;
        if (len == 15) {
            re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{3})$/);
        }
        else if (len == 18) {
            re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\d)$/);
        }
        else {
            return false;
        }
        var a = num.match(re);
        if (a != null) {
            if (len == 15) {
                var D = new Date("19" + a[3] + "/" + a[4] + "/" + a[5]);
                var B = D.getYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];
            }
            else {
                var D = new Date(a[3] + "/" + a[4] + "/" + a[5]);
                var B = D.getFullYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];
            }
            //输入的身份证号 "+ a[0] +" 里出生日期不对！
            if (!B) {
                return false;
            }
        }
        return true;
    };
    /*************************************
    ReMarks：是否包含HTML
    Date：2006/12/23 16:37:06
    Memo ：无
    *************************************/
    this.isHTML = function() {
        return new RegExp(/<(.*)>.*<\/\1>/).test((arguments.length == 1) ? arguments[0] : this.inputString);
    };
    /*************************************
    ReMarks：检查字符长度范围
    Date：2006/12/25 16:43:12
    Memo ：无
    LengthRange();无长度限制
    LengthRange(8);限制长度等于8
    LengthRange(0,8);限制长度在0-8之间
    LengthRange(8,0);限制长度>8
    限制长度<8 可使用LengthRange(0,8);
    *************************************/
    this.LengthRange = function() {
        var blnResult = false;
        var thisLength = this.inputString.length;
        for (var i = 0; i < arguments.length; i++)//检查参数是否合法
        {
            if (!this.isIntPositive(arguments[i])) {
                alert("LengthRange参数设置不正确。");
                break;
                return false;
            }
        }
        switch (arguments.length) {
            case 0: //无长度限制
                blnResult = true;
                break;
            case 1: //指定长度
                if (thisLength == arguments[0])
                    blnResult = true;
                break;
            case 2:
                if (arguments[0] < arguments[1]) //限制长度在0-8之间
                {
                    if (thisLength > arguments[0] && thisLength < arguments[1])
                        blnResult = true;
                }
                else if (arguments[0] > arguments[1]) //限制长度>8
                {
                    if (thisLength > arguments[0])
                        blnResult = true;
                }
                break;
            default:
                break;
        }
        return blnResult;
    };
}

