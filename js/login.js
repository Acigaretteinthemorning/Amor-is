$('#signin').click(function(){
    //获取表单数据 用户名  密码
    var username = $('#inputEmail3').val()
    var pwd = $('#inputPassword3').val()
    var checkbox = $('#checkbox1').prop('checked')
    // 阻止没有输入
    if(!(username)){
        alert('请输入号码') 
        return false;
    }
    if(!(pwd)){
        alert('请输入密码') 
        return false;
    }
    if(!(checkbox)){
        alert('请勾选我已阅读并同意')
        return false;
    }
    //发送ajax
    $.ajax({
        url:"http://127.0.0.1:8848/login.php",
        type:'POST',
        data:{
            username:username,
            pwd:pwd
        },
        success:function(res){
            console.log(res);
            
            if(res==="fail"){
                //失败
                alert('用户名或密码错误');
            }else{
                //成功//把用户名和用户id放到本地存储
                localStorage.setItem('username',username);
                localStorage.setItem('uid',res);
                alert(username+'|欢迎回家');
                location.href='./index.html';
            }
        }
    })
})


$('#checkbox1').change(function(){
    var check = $(this).prop('checked')
    // console.log(check);
})


