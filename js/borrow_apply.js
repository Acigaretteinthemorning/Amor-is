$(function () {
    var type = sessionStorage.getItem('type')
    switch (type) {
        case "1":
            $('#box_type').text('信用贷').addClass('btn-primary');
            break;
        case "2":
            $('#box_type').text('车易贷').addClass('btn-warning text-white');
            break;
        case "3":
            $('#box_type').text('房易贷').addClass('btn-success');
            break;
    }

    $('#borrowApplybox').click(function(){
        var acc = localStorage.getItem("username");
        var borrowmoney = $('#borrowmoney').val();
        var interest =$("#interest").val();
        var borrowtime = $("#borrowtime").val();
        // var repaytype = $("#repaytype").val();
        var repaytype = $("input[type='radio']:checked").val()
        var minbid =$("#minbid").val();
        var bouns = $("#bouns").val();
        var days = $("#days").val();
        var title = $("#title").val();
        var info = $("#info").val();
        // console.log(acc);
        // console.log(borrowmoney);
        // console.log(interest);
        // console.log(borrowtime);
        // console.log(repaytype);
        // console.log(minbid);
        // console.log(bouns);
        // console.log(days);
        // console.log(title);
        // console.log(info);
        
        
        $.ajax({
            url:"http://127.0.0.1:8848/borrow.php",
            type:'POST',
            data:{
                acc:acc,
                borrowmoney:borrowmoney,
                interest:interest,
                borrowtime:borrowtime,
                repaytype:repaytype,
                minbid:minbid,
                bouns:bouns,
                days:days,
                title:title,
                info:info
            },
            success: function(data){
                if(data == 'ok'){
                    alert("提交成功,等待审查.....")
                    location.href="./";
                }else{
                    alert("提交失败,请稍等一会在哪提交")
                }
            }
        })
    })
})