$(function () {
    //获取本地存储有用户名和用户登录
    var username = localStorage.getItem('username');
    var uid = localStorage.getItem('uid')
    // 判断是否登录
    if (username && uid) {
        $('#login').html('<a href="#" class="fb-invest-now fb-reg-btn">' + username + '</a>' + '<a href="#" id="song">借款人注销</a>');

        $('#reg').html('<ul class="list-group col-sm-4"><li class="list-group-item active ">信用贷</li><li class="list-group-item">可借金额 ¥ 200,000.00</li><li class="list-group-item">仅限成都地区</li><li class="list-group-item">填写基本资料</li><li class="list-group-item"><button type="button" class="btn btn-info" data-text="1">立即申请</button></li></ul>'+'<ul class="list-group col-sm-4"><li class="list-group-item active_1 ">车易贷</li><li class="list-group-item">可借金额 ¥ 200,000.00</li><li class="list-group-item">仅限成都地区</li><li class="list-group-item">填写基本资料</li><li class="list-group-item"><button type="button" class="btn btn-info" data-text="2">立即申请</button></li></ul>'+'<ul class="list-group col-sm-4"><li class="list-group-item active_2 ">房易贷</li><li class="list-group-item">可借金额 ¥ 200,000.00</li><li class="list-group-item">仅限成都地区</li><li class="list-group-item">填写基本资料</li><li class="list-group-item"><button type="button" class="btn btn-info"  data-text="3">立即申请</button></li></ul>');
    } else {
        $('#login').html('<a href="./login.html">立即登录</a>' + ("<a href='./register.html'>免费注册 </a>"));

        $('#reg').html('')
    }
    // $('事件委派')
    $('#login').on('click', "#song", function () {
        if (confirm('你确定退出吗？')) {
            // 删除本地存储数据
            localStorage.removeItem('username');
            localStorage.removeItem('uid');
            // 修改页面内容
            $('#login').html('<a href="./login.html">立即登录</a>' + ("<a href='./register.html'>免费注册 </a>"))
            $('#reg').html('')
        }
    })

    $('#reg').on('click','button' ,function() {
        var type = $(this).data("text");
        // console.log(type);
        sessionStorage.setItem("type",type)

          // 跳转到发布借款表单页面
    location.href="/personal.html#borrow_apply";
    })
  
    
})