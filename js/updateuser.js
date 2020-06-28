$(function () {

    var $nickname = $("#nickname");
    var $email = $("#email");
    var $phone = $("#phone");

    // 标杆
    var uFlag = false;
    var pFlag = false;
    var eFlag = false;
    $nickname.blur(function () {
        var nVal = $(this).val();
        // console.log(nVal);
        if (!(/^\s*$/g.test(nVal))) {
            uFlag = true;
        } else {
            $(this).attr('placeholder', '不能为空')
            uFlag = false;
        }
    })
    $email.blur(function () {
        var eVal = $(this).val()
        if (/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(eVal)) {
            pFlag = true;
        } else {
            $(this).attr('placeholder', '邮箱不正确请重新输入')
            alert('邮箱不正确请重新输入')
            pFlag = false;
        }
    })
    $phone.blur(function () {
        var pVal = $(this).val()
        if (/^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/.test(pVal)) {
            eFlag = true;
        } else {
            $(this).attr('placeholder', '请输入正确的手机号码')
            alert('请输入正确的手机号码')
            eFlag = false;
        }
    })


    // console.log('updateuser.html');
    $('#update').click(function () {
        if(!(uFlag&&pFlag&&eFlag)){
            // 没有通过显示报错信息.
            $nickname.trigger('blur');
            $email.trigger('blur')
            $phone.trigger('blur')
            return false;
        }
        var nickname = $('#nickname').val()
        var email = $('#email').val()
        var phone = $("#phone").val()
        var id = localStorage.getItem("uid");
        if (!(nickname && email && phone)) return false;

        // 调用更新用户资料接口
        
        $.ajax({
            url: "http://127.0.0.1:8848/updateuser.php",
            type: "POST",
            data: {
                nickname: nickname,
                email: email,
                phone: phone,
                id: id
            },
            success: function (data) {
                if (data == 'ok') {
                    alert('更新成功')
                    location.href = "#home"
                } else {
                    alert('更新失败，稍等在试一下...')
                }
            }
        })
    })
})