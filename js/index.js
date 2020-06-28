$(function () {
    islogin();
    // 判断用户是否登录
    function islogin() {
        //获取本地存储有用户名和用户登录
        var username = localStorage.getItem('username');
        var uid = localStorage.getItem('uid');
        // 判断是否登录

        if (username && uid) {
            $("#login").html('<a href="#">' + username + '</a>');
            $("#reg").html('<a href="#" id="loginu">注销</a>');
        } else {
            $('#login').html("<a href='./login.html'>立即登录</a>")
            $("#reg").html('<a href="./register.html">免费注册</a>');
        }


        //事件委派
        $('#reg').on("click", "#loginu", function () {
            if (confirm("你还贷款吗？")) {
                //删除本地存储数据
                localStorage.removeItem("username");
                localStorage.removeItem("uid");
                // 改页面
                $('#login').html("<a href='./login.html'>立即登录</a>")
                $("#reg").html('<a href="./register.html">免费注册</a>');
            }
        });
    }
    var page = 1;//当前页面
    var row = 2;//每页显示的条数
    loadData();
    // 加载数据的函数 ajax
    function loadData() {
        $.ajax({
            url: 'http://127.0.0.1:8848/getborrow.php',
            type: 'GET',
            data: {
                page: page,
                row: row
            },
            dataType: 'json',
            success: function (data) {
                // console.log(data);
                var total = data.total;//总条数

                var totalPage = Math.ceil(total/row)//总页数

                // 分页插件
                $('#page').pagenation({
                    nowPage: page,
                    pageNum: row,
                    callback: function (p) {
                        page=p;
                        loadData();
                    }
                })

                var lists = data.list;//数据

                var resHtml = "";
                // 渲染到页面
                for (var i = 0; i < lists.length; i++) {
                    resHtml += '<tr>'
                    resHtml += '<th scope="row">' + lists[i].userid + '</th>'
                    resHtml += '<td>' + lists[i].title + '</td>'
                    resHtml += '<td> ' + (Number((lists[i].interest)).toFixed(2)) + ' %</td>'
                    resHtml += '<td> ￥' + ((lists[i].borrowmoney * 1).toFixed(2)) + '</td>'
                    resHtml += '<td>' + (lists[i].repaytype == 0 ? '按月分期' : '按月到期') + '</td>'
                    resHtml += '<td>' + (((lists[i].ownmoney / lists[i].borrowmoney) * 100).toFixed(2)) + '%</td>'
                    resHtml += '<td>'
                    resHtml += '<a href="#" data-borrowid=" '+lists[i].id +' "> <button type="button" class="btn btn-danger button_box">查看</button></a>'
                    resHtml += '</td>'
                    resHtml += '</tr>'
                }
                // console.log(resHtml);
                $('#borroWlis').html(resHtml)
            }
        })
    }

    //给查看添加 点击事件委派
    $("#borroWlis").on("click","a", function(){
        // console.log($(this).data('borrowid'));
        // 存储到会话存储
        sessionStorage.setItem('borrowid',$(this).data('borrowid'))
        // 跳转
        location.href="../getborrowinfo.html"
        return false;
    })
})