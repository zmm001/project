
function CheckLogin() {
    var name, pass, code;
    name = document.getElementById('txtUserName');
    pass = document.getElementById('txtPassword');
    code = document.getElementById('txtVerifyCode');
    if (name.value == '') {
        name.focus();
        alert("请输入用户名。");
        return false;
    }
    if (pass.value == '') {
        pass.focus();
        alert("请输入密码。");
        return false;
    }
    if (code.value == '') {
        code.focus();
        alert("请输入验证码。");
        return false;
    }
    return true;
}