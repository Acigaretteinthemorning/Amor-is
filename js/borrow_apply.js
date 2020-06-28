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

    var $borrowmoney = $('#borrowmoney')
    var $interest = $("#interest")
    var $minbid = $("#minbid")
    var $bouns = $("#bouns")
    var $title = $("#title")
    var $info = $("#info")

    // 自定义标杆
    var uFlag = false;
    var pFlag = false;
    var eFlag = false;
    var Bbouns = false;
    var Ttitle = false;
    var Iinfo = false;
    $borrowmoney.blur(function () {
        var moneyVal = $(this).val()
        if (moneyVal != '' && !(moneyVal <= 0)) {
            $(this).removeClass('formred').addClass('formee')
             uFlag = true;
        } else {
            $(this).addClass('formred').attr('placeholder', '输入借款金额')
            $(this).removeClass('formee')
             uFlag = false;
        }
    })

    $interest.blur(function () {
        var interestVal = $(this).val()
        if (interestVal != '' && !(interestVal <= 0) && !(interestVal >= 50)) {
            $(this).removeClass('formred').addClass('formee')
             pFlag = true;
        } else {
            $(this).addClass('formred').attr('placeholder', '输入借款利息')
            $(this).removeClass('formee')
            if (interestVal >= 40) {
                alert('利息不能大于等于40')
            }
             pFlag = false;
        }
    })
    $minbid.blur(function () {
        var minbidVal = $(this).val()
        if (minbidVal != '' && !(minbidVal <= 0)) {
            $(this).removeClass('formred').addClass('formee')
           eFlag = true;
        } else {
            $(this).addClass('formred').attr('placeholder', '输入最少投标')
            $(this).removeClass('formee')
             eFlag = false;
        }
    })
    $bouns.blur(function () {
        var bounsVal = $(this).val()
        if (bounsVal != '' && !(bounsVal <= 0) && !(bounsVal >= 20)) {
            $(this).removeClass('formred').addClass('formee')
            Bbouns = true;
        } else {
            $(this).addClass('formred').attr('placeholder', '输入借款利息')
            $(this).removeClass('formee')
            if (bounsVal >= 20) {
                alert('投标奖金不能太多')
            }
            Bbouns = false;
        }
    })
    $title.blur(function () {
        var titleVal = $(this).val()
        if (!(/^\s*$/g).test(titleVal)) {
            $(this).removeClass('formred').addClass('formee')
            Ttitle = true;
        } else {
            $(this).addClass('formred').attr('placeholder', '请你输入借款标题')
            $(this).removeClass('formee')
            Ttitle = false;
        }
    })
    $info.blur(function () {
        var infoVal = $(this).val()
        if (!(/^\s*$/g).test(infoVal)) {
            $(this).removeClass('formred').addClass('formee')
            Iinfo = true;
        } else {
            $(this).addClass('formred').attr('placeholder', '请你输入借款描述')
            $(this).removeClass('formee')
            Iinfo = false;
        }
    })





    $('#borrowApplybox').click(function () {
        if (!(uFlag && pFlag && eFlag && Bbouns && Ttitle && Iinfo)) {
            $borrowmoney.trigger('blur');
            $interest.trigger('blur');
            $minbid.trigger('blur');
            $bouns.trigger('blur');
            $title.trigger('blur');
            $info.trigger('blur');
            return false;
        }
        var acc = localStorage.getItem("username");
        var borrowmoney = $('#borrowmoney').val();
        var interest = $("#interest").val();
        var borrowtime = $("#borrowtime").val();
        var repaytype = $("input[type='radio']:checked").val()
        var minbid = $("#minbid").val();
        var bouns = $("#bouns").val();
        var days = $("#days").val();
        var title = $("#title").val();
        var info = $("#info").val();

        $.ajax({
            url: "http://127.0.0.1:8848/borrow.php",
            type: 'POST',
            data: {
                acc: acc,
                borrowmoney: borrowmoney,
                interest: interest,
                borrowtime: borrowtime,
                repaytype: repaytype,
                minbid: minbid,
                bouns: bouns,
                days: days,
                title: title,
                info: info
            },
            success: function (data) {
                console.log(data);
                
                if (data == 'ok') {
                    alert("提交成功,等待审查.....")
                    location.href = "./";
                } else {
                    alert("提交失败,请稍等一会在哪提交")
                }
            }
        })
    })
})