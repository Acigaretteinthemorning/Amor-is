$(function(){
    // console.log('updateuser.html');
    $('#update').click(function(){
        var nickname = $('#nickname').val()
        var email = $('#email').val()
        var phone = $("#phone").val()
        var id = localStorage.getItem("uid");
        if(!(nickname&&email&&phone)) return false;
        // 调用更新用户资料接口
        $.ajax({
            url:"http://127.0.0.1:8848/updateuser.php",
            type:"POST",
            data:{
                nickname:nickname,
                email:email,
                phone:phone,
                id:id
            },
            success:function(data){
                if(data == 'ok'){
                    alert('更新成功')
                    location.href="#home"
                }else{
                    alert('更新失败，稍等在试一下...')
                }
            }
        })
    })
})