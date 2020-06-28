$(function(){
    // 调用 某一天借款的数据的详细
    $.ajax({
        url:'http://127.0.0.1:8848/getborrowinfo.php',
        type:'GET',
        data:{
            borrowid:sessionStorage.getItem('borrowid')
        },
        dataType:'json',
        success:function(data){
            // console.log(data);
            for( var key in data){
                $('#' + key).text(data[key])
            }
            
        }
    })
    // 获取input的值
    var $chargemoney =$("#chargemoney");
    var username = localStorage.getItem('username')
    
    // 标杆
    var chaFlag = false;
    
    $chargemoney.blur(function(){
        var uVal = $(this).val()
        if(!(/[\u4E00-\u9FA5]/.test(uVal)) && uVal != '' && !(uVal <= 0)){
            $(this).removeClass("red");
            $(this).addClass("error");
            chaFlag = true;
        }else{
            $(this).removeClass("error");
            $(this).addClass("red");
            if(uVal == ''){
                alert('请输入金额')
            }else if( uVal <= 0 ){
                alert('不能输入0以下的')
            }
            chaFlag = false;
        }

    })
    // 投资按钮点击事件
    $("#chargeBtn").click(function(){
        if(!(chaFlag)){
            $chargemoney.trigger('blur');
            return false;
        }
        var chargemoney = $("#chargemoney").val()
        // 发送ajax
        $.ajax({
            url:'http://127.0.0.1:8848/invest.php',
            type:'POST',
            data:{
                id:localStorage.getItem("uid"),
                borrowid:sessionStorage.getItem('borrowid'),
                chargemoney:chargemoney
            },
            success:function(res){
                if(res=='10001'){
                    alert("老板请你先充值")
                    location.href='/recharge.html'
                }else if(res == 'ok'){
                    alert("恭喜老板，投资成功。")
                    location.href='/personal.html'
                }else{
                    alert("投资失败，稍后在试一下！")
                }
                
            }

        })
    })
})