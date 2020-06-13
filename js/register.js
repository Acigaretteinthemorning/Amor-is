$(function () {

    // 获取input 里的值
    // 号
    var $name = $('#username');
    // 邮箱
    var $email = $('#email');
    // 外号
    var $nickname = $('#invite-code');
    // 密码
    var $pwd = $('#password');

    // 自定义标杆
    
    var uFlag = false;
    var pFlag = false;
    var eFlag = false;
    var nFlag = false;
    //给用户名失去焦点事件
    $name.blur(function(){
        var uVal = $(this).val();
        var span = $(this).next();
        console.log(span);
        
        //  console.log(span);
        if(/^[a-zA-Z]{1}\w{3,15}$/.test(uVal)){
            //在合法的前提  验证验证用户名是否重复 
            $.ajax({
                url:"http://127.0.0.1:8848/accrepeat.php",
                type:"GET",
                data:'username' + uVal,
                success: function (data_data){
                    if(data_data === 'ok'){
                        //可以注册
                        span.text('').removeClass('error')
                        $name.removeClass('redBorder')
                        uFlag = true;
                    }else{
                        span.text('你的号码已经被注册了').addClass('error')
                        $name.removeClass('redBorder')
                        uFlag = false;
                    }
                }
            })
        }else{
            span.text('你的号码不合法,请重新输入').addClass('error')
            $name.addClass('redBorder')
            uFlag = false;
        }
    })

    $pwd.blur(function(){
        var pwdVal = $(this).val();
        var pwdspan = $(this).next();
        if(/^[a-zA-Z]{1}\w{6,14}$/.test(pwdVal)){
            pwdspan.text('').removeClass('error')
            $(this).removeClass('redBorder')
            pFlag = true;
        }else{
            pwdspan.text('你的密码不合法,请重新输入').addClass('error')
            $(this).addClass('redBorder')
            pFlag = false;
        }
    })

    $email.blur(function(){
        var uVal = $(this).val()
        var span = $(this).next()
        if(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(uVal)){
            span.text('').removeClass('error')
            $(this).removeClass('redBorder')
            eFlag = true;
        }else{
            span.text('你的邮箱不合法,请重新输入').addClass('error')
            $(this).addClass('redBorder')
            eFlag = false;
        }
    })

    $nickname.blur(function(){
        var uVal = $(this).val()
        var span = $(this).next()
        if(uVal != ""){
            span.text("").removeClass("error");
            $(this).removeClass("redBorder");
            nFlag = true;
        }else{
            span.text('请输入').addClass('error')
            $nickname.addClass('redBorder')
            nFlag = false;
        }
    })

    $('#regBtn').click(function(){
        if(!(uFlag&&pFlag&&eFlag&&nFlag)){   
            // 没有通过显示报错信息
            $name.trigger('blur');
            $email.trigger('blur');
            $nickname.trigger('blur')
            $pwd.trigger('blur')
            return false;
        }
        // 获取input的值
        var name = $name.val()
        var email = $email.val()
        var nickname = $nickname.val()
        var pwd = $pwd.val()
        $.ajax({
            url:"http://127.0.0.1:8848/reg.php",
            type:'POST',
            data: {
                username: name,
                pwd: pwd,
                email: email,
                nickname: nickname
            },
            success: function(data){
                if(data === 'ok'){
                    alert('恭喜你!'+name);
                    location.href = "./login.html"
                }else{
                    alert('注册失败,重新输入')
                }
            }
        })
        
        
    })
})
