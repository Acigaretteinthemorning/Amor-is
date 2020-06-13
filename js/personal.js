$(function () {
    // $('#main').load("./pages/accountFlow_list.html")
    window.onhashchange = loadp
    loadp()
    // 动态添加 html片段 根据hash
    function loadp() {
        var hash = location.hash;
        // console.log(hash);
        switch (hash) {
            case '':
                $('#main').load("./pages/home.html");
                break
            case '#home':
                $('#main').load("./pages/home.html");
                break
            case '#realAuth':
                $('#main').load("./pages/realAuth.html");
                break
            case '#accountFlow_list':
                $('#main').load("./pages/accountFlow_list.html");
                break
            case '#updateuser':
                $('#main').load("./pages/updateuser.html");
                break
            case '#borrow_apply':
                $('#main').load("./pages/borrow_apply.html");
                break
            default:
                $('#main').load("./pages/123.html");
                break
        }
        activevNav(hash)
    }
    // 激活导航样式
    function activevNav(hash) {
        // console.log(hash);
        // console.log($(".menu_min .menu_ul .list-group-item_1 a[href='"+hash+"']"));

        if (hash === '') hash = '#home'
        // $(".menu_min .menu_ul .list-group-item_1 a[href='"+hash+"']").addClass('activation').parent().siblings().find('a').removeClass('activation');

        $('.menu_min .menu_ul .list-group-item_1 a').removeClass('activation')

        $(".menu_min .menu_ul .list-group-item_1 a[href='" + hash + "']").addClass('activation')
    }
    //获取本地存储有用户名和用户登录
    var username = localStorage.getItem('username');
    var uid = localStorage.getItem('uid')
    // 判断是否登录
    if (username && uid) {
        $('#login').html('<a href="#">' + username + '</a>');
        $('#reg').html('<a href="#" id="song">注销</a>');
    } else {
        $('#login').html('<a href="./login.html">立即登录</a>')
        $('#reg').html("<a href='./register.html'>免费注册 </a>")
    }
    // 事件委派
    $('#reg').on("click", "#song", function () {
        if (confirm('你确定退出吗？')) {
            // 删除本地存储数据
            localStorage.removeItem('username');
            localStorage.removeItem('uid');
            // 改页面
            $('#login').html('<a href="./login.html">立即登录</a>')
            $('#reg').html("<a href='./register.html'>免费注册 </a>")
        }
    })


})