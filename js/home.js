$(function(){
    // 获取id

    // 发送ajax 调用获取用户信息
    $.ajax({
        url:'http://127.0.0.1:8848/getuserinfo.php',
        type:'GET',
        data:{
            id:localStorage.getItem("uid")
        },
        dataType:"json",
        success:function(data){
           for(var key in data){
               $("#"+key).text(data[key])
           }
        }

    })
    
})