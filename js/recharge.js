$(function () {
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

    var $chargemoney = $('#chargemoney');
    var $show = $('#show');

    var uFlag = false;
    var sFlag = false;

    $chargemoney.blur(function () {
        var sval = $(this).val();
        // console.log(sval);
        if (!(/[\u4E00-\u9FA5]/.test(sval)) && sval != '' && !(sval <= 0)) {
            $(this).removeClass('red');
            $(this).addClass('error');
            uFlag = true;
        } else {
            $(this).removeClass('error');
            $(this).addClass('red').attr('placeholder', '输入框不能为空,不能输入中文')
            uFlag = false;
        }

    })
    $show.blur(function () {
        var sFlagV = $(this).val();
        if(sFlagV != ''){
            $(this).removeClass('red');
            $(this).addClass('error');
            sFlag = true;
        }else{
            $(this).removeClass('error');
            $(this).addClass('red').attr('placeholder', '说明不能为空')
            sFlag = false;
        }
    })

    // console.log('recharge.html');
    $('#chargeBtn').click(function () {
        if(!(uFlag && sFlag)){
            // 没有通过显示报错信息
            $chargemoney.trigger('blur');
            $show.trigger("blur");
            return false;
        }
        // 获取数据
        var bankcode = $('#bankcode').val();
        var chargemoney = $('#chargemoney').val();
        var id = localStorage.getItem('uid');
        if (!(bankcode && chargemoney)) return false;
        $.ajax({
            url: 'http://127.0.0.1:8848/charge.php',
            data: {
                bankcode: bankcode,
                chargemoney: chargemoney,
                id: id
            },
            type: "POST",
            success: function (data) {
                if (data === "ok") {
                    alert('感谢老板的支持。')
                    location.href = './personal.html'
                } else {
                    alert('充值失败，老板银行卡没有钱哟。')
                }
            }
        })
    })
})