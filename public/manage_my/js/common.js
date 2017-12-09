
$(function(){
    //判断用户是否登陆
    $.ajax({
        url: '/employee/checkRootLogin',
        success: function(backData){
            console.log(backData);
            if(backData.error == 400){
                //未登陆,打回登陆页
                window.location.href = 'login.html';
            }
        }
    })

    //点击左边图标显示或隐藏letao_aside
    $('.letao_main a.glyphicon-glass').click(function(){
        $('.letao_aside').toggle();
        $('.letao_main').toggleClass('fullScreen');
    })

    //模态框弹出
    $('.letao_main a.glyphicon-log-out').click(function(){
        // console.log(111);
        $('.modal_myOpen').modal('show');
    })
    //点击确定按钮关闭模态框,调用登出接口
    $('.modal_myOpen .modal-footer button.btn-primary').click(function(){
        $('.modal_myOpen').modal('hide');
        //调用登出接口,回登陆页
        $.get('/employee/employeeLogout',function(){
            window.location.href = 'login.html';
        })
    })

    //点击分类管理显示或隐藏
    $('.letao_aside ul>li:eq(1)>a').click(function(){
        $(this).siblings('ol').slideToggle();
    })
})