islogin();
// 判断用户是否登录
function islogin() {
    //获取本地存储有用户名和用户登录
    var username = localStorage.getItem('username');
    var uid = localStorage.getItem('uid');
    // 判断是否登录

    if (username && uid) {
        $("#login").html('<a href="#">' + username + '</a>');
        $("#reg").html('<a href="#" id="loginu">注销</a>');
    } else {
        $('#login').html("<a href='./login.html'>立即登录</a>")
        $("#reg").html('<a href="./register.html">免费注册</a>');
    }


    //事件委派
    $('#reg').on("click", "#loginu", function () {
        if (confirm("你还贷款吗？")) {
            //删除本地存储数据
            localStorage.removeItem("username");
            localStorage.removeItem("uid");
            // 改页面
            $('#login').html("<a href='./login.html'>立即登录</a>")
            $("#reg").html('<a href="./register.html">免费注册</a>');
        }
    });
}